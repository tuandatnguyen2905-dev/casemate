import React, { useId } from 'react';
import type { RecallRating as Rating } from '../models';
import { RECALL_RATINGS } from '../models';
import { formatInterval } from '../scheduler';
import { uiInterval, uiRatingAria, uiText } from '../../../IndustryKnowledge/localization/uiText';

export const RATING_LABEL: Record<Rating, string> = { again: 'Again', hard: 'Hard', good: 'Good', easy: 'Easy' };

export interface RecallRatingProps {
  onRate: (rating: Rating) => void;
  /** Interval each rating would schedule, in days (from previewIntervals). */
  intervals?: Record<Rating, number>;
  disabled?: boolean;
}

/** Shown only after the answer is revealed. Keys 1–4 map to Again, Hard, Good, Easy. */
export default function RecallRating({ onRate, intervals, disabled = false }: RecallRatingProps) {
  const labelId = useId();
  return (
    <div className="cmfc-rating" role="group" aria-labelledby={labelId} data-testid="recall-rating">
      <p id={labelId} className="cmfc-rating-label">{uiText('How well did you recall it?')}</p>
      <div className="cmfc-rating-grid">
        {RECALL_RATINGS.map((rating, index) => {
          const next = intervals ? uiInterval(formatInterval(intervals[rating])) : null;
          const label = uiText(RATING_LABEL[rating]);
          return (
            <button
              key={rating}
              type="button"
              className={`cmfc-btn cmfc-rate cmfc-rate--${rating}`}
              disabled={disabled}
              onClick={() => onRate(rating)}
              aria-keyshortcuts={String(index + 1)}
              aria-label={uiRatingAria(label, next)}
              data-rating={rating}
            >
              <span className="cmfc-rate-name">{label}</span>
              <span className="cmfc-rate-meta" aria-hidden="true">
                {index + 1}{next ? ` · ${next}` : ''}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
