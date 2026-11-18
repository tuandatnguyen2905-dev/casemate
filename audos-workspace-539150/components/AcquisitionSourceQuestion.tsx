import { useState } from 'react';
import {
  ACQUISITION_SOURCES,
  hasAnsweredAcquisitionSource,
  reportAcquisitionSource,
  type AcquisitionSource,
} from '../lib/engagementTracking';

const SOURCE_LABELS: Record<AcquisitionSource, string> = {
  facebook: 'Facebook',
  tiktok: 'TikTok',
  friends: 'Bạn bè',
  school_club: 'Trường / CLB',
  google: 'Google',
  other: 'Khác',
};

type AcquisitionSourceQuestionProps = {
  textPrimary: string;
  textMuted: string;
  borderColor: string;
  primaryColor: string;
  onPrimary: string;
  sectionBackground: string;
  disabled?: boolean;
};

/**
 * Optional sign-up question. The answer is stored on the device and sent as
 * acq_source_reported once the session exists; a device that already answered
 * never sees it again.
 */
export default function AcquisitionSourceQuestion({
  textPrimary,
  textMuted,
  borderColor,
  primaryColor,
  onPrimary,
  sectionBackground,
  disabled = false,
}: AcquisitionSourceQuestionProps) {
  const [alreadyAnswered] = useState(() => hasAnsweredAcquisitionSource());
  const [selected, setSelected] = useState<AcquisitionSource | null>(null);
  if (alreadyAnswered) return null;

  return (
    <fieldset className="mt-4" data-testid="acq-source-question">
      <legend className="text-xs font-semibold" style={{ color: textPrimary }}>
        Bạn biết Casemate từ đâu?{' '}
        <span className="font-normal" style={{ color: textMuted }}>(không bắt buộc)</span>
      </legend>
      <div className="mt-2 flex flex-wrap gap-1.5">
        {ACQUISITION_SOURCES.map((source) => {
          const active = selected === source;
          return (
            <button
              key={source}
              type="button"
              aria-pressed={active}
              disabled={disabled}
              onClick={() => {
                setSelected(source);
                reportAcquisitionSource(source);
              }}
              className="rounded-full px-3 py-1.5 text-xs font-semibold transition-colors"
              style={{
                border: `1.5px solid ${active ? primaryColor : borderColor}`,
                backgroundColor: active ? primaryColor : sectionBackground,
                color: active ? onPrimary : textPrimary,
                cursor: disabled ? 'not-allowed' : 'pointer',
              }}
              data-testid={`acq-source-${source}`}
            >
              {SOURCE_LABELS[source]}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
