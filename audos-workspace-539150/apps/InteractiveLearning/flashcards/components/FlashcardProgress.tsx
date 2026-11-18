import React from 'react';
import { uiCardPosition, uiCardsViewedRated, uiText } from '../../../IndustryKnowledge/localization/uiText';

export interface FlashcardProgressProps {
  /** 1-based position of the card on screen. */
  current: number;
  total: number;
  /** Unique cards rated this session. */
  rated: number;
  /** Unique cards viewed this session. */
  viewed?: number;
}

/** Small session indicator: where the learner is in the deck, plus what was viewed and rated. Rating is optional. */
export default function FlashcardProgress({ current, total, rated, viewed }: FlashcardProgressProps) {
  const position = Math.min(current, total);
  const percent = total ? Math.min(100, Math.round((position / total) * 100)) : 0;
  const detail = uiCardsViewedRated(viewed, rated);
  const cardLabel = uiCardPosition(position, total);
  return (
    <div className="cmfc-progress" data-testid="session-progress">
      <div className="cmfc-meter-label">
        <span>{cardLabel}</span>
        <span>{detail}</span>
      </div>
      <div
        className="cmfc-meter-track"
        role="progressbar"
        aria-label={uiText('Session progress')}
        aria-valuemin={0}
        aria-valuemax={total}
        aria-valuenow={position}
        aria-valuetext={`${cardLabel}, ${detail}`}
      >
        <div className="cmfc-meter-fill" style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}

export interface MasteryMeterProps {
  percent: number;
  label?: string;
  detail?: string;
}

export function MasteryMeter({ percent, label = 'Mastery', detail }: MasteryMeterProps) {
  const value = Math.max(0, Math.min(100, Math.round(percent)));
  return (
    <div className="cmfc-meter">
      <div className="cmfc-meter-label">
        <span>{label}</span>
        <span>{detail ?? `${value}%`}</span>
      </div>
      <div
        className="cmfc-meter-track"
        role="progressbar"
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={value}
        aria-valuetext={detail ? `${value}% · ${detail}` : `${value}%`}
      >
        <div className="cmfc-meter-fill cmfc-meter-fill--ink" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}
