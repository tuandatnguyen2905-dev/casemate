import React, { useEffect, useId, useRef, useState } from 'react';
import type { FillBlankInteraction, FlashcardContent, McqInteraction } from '../models';
import { BLANK_TOKEN, checkFillBlank, checkMcq } from '../interactive';
import { uiAcceptedSynonym, uiText } from '../../../IndustryKnowledge/localization/uiText';

export interface AnswerAttempt {
  /** The checked answer was right. */
  correct: boolean;
  /** The learner asked to see the answer instead of checking one. */
  shown: boolean;
}

export interface InteractiveFlashcardProps {
  card: FlashcardContent;
  sourceLabel?: string;
  /** The answer is now on screen: checked correctly, or shown on request. Never a recall rating. */
  onReveal: () => void;
  /** Every Check answer and Show answer, for the session summary only. */
  onAttempt?: (attempt: AnswerAttempt) => void;
}

type Result = { status: 'correct'; matched?: string } | { status: 'incorrect' } | null;

const TYPE_LABEL = { mcq: 'Multiple choice', fill_blank: 'Fill in the blank' } as const;

/**
 * An MCQ or fill-in-the-blank card. Unlike a classic card it never flips: it is a plain region holding
 * its own form controls, so choosing an option or typing never turns it over. The answer, explanation and
 * correct option stay out of the DOM until the learner checks a correct answer or asks to see it.
 */
export default function InteractiveFlashcard({ card, sourceLabel, onReveal, onAttempt }: InteractiveFlashcardProps) {
  const interaction = card.interaction as McqInteraction | FillBlankInteraction;
  const promptId = useId();
  const inputId = useId();
  const feedbackId = useId();
  const groupName = useId();
  const [selected, setSelected] = useState<string | null>(null);
  const [typed, setTyped] = useState('');
  const [result, setResult] = useState<Result>(null);
  const [revealed, setRevealed] = useState(false);
  const feedbackRef = useRef<HTMLDivElement>(null);
  const firstControlRef = useRef<HTMLInputElement>(null);
  const focusAfter = useRef<'feedback' | 'control' | null>(null);
  const locked = result !== null || revealed;

  useEffect(() => {
    if (focusAfter.current === 'feedback') feedbackRef.current?.focus({ preventScroll: true });
    if (focusAfter.current === 'control') firstControlRef.current?.focus({ preventScroll: true });
    focusAfter.current = null;
  }, [result, revealed]);

  const reveal = () => {
    setRevealed(true);
    onReveal();
  };

  const check = (event: React.FormEvent) => {
    event.preventDefault();
    if (locked) return;
    let outcome: Result;
    if (interaction.type === 'mcq') {
      if (!selected) return;
      outcome = checkMcq(interaction, selected) ? { status: 'correct' } : { status: 'incorrect' };
    } else {
      const checked = checkFillBlank(interaction, typed);
      if (checked.empty) return;
      outcome = checked.correct ? { status: 'correct', matched: checked.matched } : { status: 'incorrect' };
    }
    setResult(outcome);
    focusAfter.current = 'feedback';
    onAttempt?.({ correct: outcome.status === 'correct', shown: false });
    if (outcome.status === 'correct') reveal();
  };

  const tryAgain = () => {
    setResult(null);
    setSelected(null);
    setTyped('');
    focusAfter.current = 'control';
  };

  const showAnswer = () => {
    focusAfter.current = 'feedback';
    onAttempt?.({ correct: false, shown: true });
    reveal();
  };

  const statement = interaction.type === 'fill_blank' ? card.front.split(BLANK_TOKEN) : null;
  const synonyms = interaction.type === 'fill_blank' && result?.status === 'correct' && result.matched && result.matched !== interaction.answer ? result.matched : null;

  return (
    <section
      className="cmfc-card cmfc-card--interactive"
      aria-labelledby={promptId}
      data-testid="interactive-card"
      data-card-id={card.cardId}
      data-card-type={interaction.type}
      data-revealed={revealed ? 'true' : 'false'}
    >
      <p className="cmfc-face-label">{uiText(TYPE_LABEL[interaction.type])}</p>
      <form className="cmfc-interaction" onSubmit={check} noValidate>
        {interaction.type === 'mcq' ? (
          <fieldset className="cmfc-options" disabled={locked} aria-describedby={result ? feedbackId : undefined}>
            <legend id={promptId} className="cmfc-prompt cmfc-prompt--interactive">{card.front}</legend>
            {interaction.options.map((option, index) => {
              const isCorrect = revealed && option.id === interaction.correctOptionId;
              const isWrongPick = result?.status === 'incorrect' && option.id === selected;
              return (
                <label
                  key={option.id}
                  className={`cmfc-option${selected === option.id ? ' cmfc-option--selected' : ''}${isCorrect ? ' cmfc-option--correct' : ''}${isWrongPick ? ' cmfc-option--incorrect' : ''}`}
                  data-testid="mcq-option"
                  data-option-id={option.id}
                >
                  <input
                    ref={index === 0 ? firstControlRef : undefined}
                    type="radio"
                    name={groupName}
                    value={option.id}
                    checked={selected === option.id}
                    onChange={() => setSelected(option.id)}
                  />
                  <span className="cmfc-option-text">{option.text}</span>
                  {isCorrect ? <span className="cmfc-option-tag">{uiText('Correct answer')}</span> : null}
                  {isWrongPick ? <span className="cmfc-option-tag">{uiText('Your answer')}</span> : null}
                </label>
              );
            })}
          </fieldset>
        ) : (
          <div className="cmfc-fill">
            <p id={promptId} className="cmfc-prompt cmfc-prompt--interactive">
              {statement?.map((part, index) => (
                <React.Fragment key={index}>
                  {index > 0 ? (
                    <>
                      <span className="cmfc-blank" aria-hidden="true">{revealed ? interaction.answer : '\u00a0'}</span>
                      <span className="cmfc-visually-hidden">{revealed ? interaction.answer : uiText('blank')}</span>
                    </>
                  ) : null}
                  {part}
                </React.Fragment>
              ))}
            </p>
            <label htmlFor={inputId} className="cmfc-input-label">{uiText('Your answer')}</label>
            <input
              ref={firstControlRef}
              id={inputId}
              className="cmfc-input"
              type="text"
              value={typed}
              onChange={(event) => setTyped(event.target.value)}
              disabled={locked}
              autoComplete="off"
              autoCapitalize="none"
              autoCorrect="off"
              spellCheck={false}
              enterKeyHint="done"
              aria-describedby={result ? feedbackId : undefined}
              data-testid="fill-input"
            />
          </div>
        )}
        {!locked ? (
          <div className="cmfc-interaction-actions">
            <button
              type="submit"
              className="cmfc-btn cmfc-btn-primary"
              disabled={interaction.type === 'mcq' ? !selected : !typed.trim()}
              data-testid="check-answer"
            >
              {uiText('Check answer')}
            </button>
            <button type="button" className="cmfc-btn cmfc-btn-ghost" onClick={showAnswer} data-testid="show-answer">{uiText('Show answer')}</button>
          </div>
        ) : null}
      </form>
      {result || revealed ? (
        <div
          ref={feedbackRef}
          id={feedbackId}
          tabIndex={-1}
          role="status"
          className={`cmfc-feedback cmfc-feedback--${result?.status ?? 'shown'}`}
          data-testid="answer-feedback"
          data-result={result?.status ?? 'shown'}
        >
          {result?.status === 'correct' ? (
            <p className="cmfc-feedback-title">
              {uiText('Correct.')}
              {synonyms && interaction.type === 'fill_blank' ? uiAcceptedSynonym(synonyms, interaction.answer) : ''}
            </p>
          ) : result?.status === 'incorrect' && !revealed ? (
            <p className="cmfc-feedback-title">{uiText('Not quite. That is not the answer the chapter gives. Try again, or show the answer.')}</p>
          ) : (
            <p className="cmfc-feedback-title">{uiText(result?.status === 'incorrect' ? 'Not quite. Here is the answer the chapter gives.' : 'Here is the answer the chapter gives.')}</p>
          )}
          {result?.status === 'incorrect' && !revealed ? (
            <div className="cmfc-interaction-actions">
              <button type="button" className="cmfc-btn" onClick={tryAgain} data-testid="try-again">{uiText('Try again')}</button>
              <button type="button" className="cmfc-btn cmfc-btn-ghost" onClick={showAnswer} data-testid="show-answer">{uiText('Show answer')}</button>
            </div>
          ) : null}
        </div>
      ) : null}
      {revealed ? (
        <div className="cmfc-interaction-answer" data-testid="interactive-explanation">
          <div className="cmfc-detail">
            <p className="cmfc-detail-label">{uiText('Answer')}</p>
            <p className="cmfc-detail-text cmfc-answer-text">{card.back}</p>
            {interaction.type === 'fill_blank' && interaction.acceptedAnswers?.length ? (
              <p className="cmfc-source">{uiText('Also accepted: ')}{interaction.acceptedAnswers.join(' · ')}</p>
            ) : null}
          </div>
          <div className="cmfc-detail">
            <p className="cmfc-detail-label">{uiText('Explanation')}</p>
            <p className="cmfc-detail-text">{card.explanation}</p>
          </div>
          {card.keyTerms.length > 0 && <p className="cmfc-source">{uiText('Key terms')}: {card.keyTerms.join(' · ')}</p>}
          {sourceLabel && <p className="cmfc-source">{uiText('Source')}: {sourceLabel}</p>}
        </div>
      ) : null}
    </section>
  );
}
