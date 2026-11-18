import { ShieldCheck } from 'lucide-react';
import { openFitDataUsePolicy } from '../lib/fitDataUsePolicy';

type CvPeerDataConsentLineProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  id?: string;
};

/** Optional consent shown at CV confirmation; ticking or unticking it updates the account's choice on Next. */
export default function CvPeerDataConsentLine({ checked, onChange, disabled = false, id = 'cv-peer-data-consent' }: CvPeerDataConsentLineProps) {
  return (
    <div className="mt-6 rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-muted)] p-4">
      <p className="flex items-center gap-2 text-sm font-extrabold text-[var(--space-text-primary)]">
        <ShieldCheck className="h-4 w-4 text-[var(--space-text-brand)]" />
        Help Casemate get more accurate
      </p>
      <label
        htmlFor={id}
        className={`mt-3 flex cursor-pointer items-start gap-2.5 text-sm leading-snug text-[var(--space-text-secondary)] ${disabled ? 'cursor-default opacity-70' : ''}`}
      >
        <input
          id={id}
          type="checkbox"
          className="mt-0.5 h-4 w-4 shrink-0 rounded border-[var(--space-border-strong)]"
          checked={checked}
          disabled={disabled}
          onChange={(event) => onChange(event.target.checked)}
        />
        <span>
          <span className="font-bold text-[var(--space-text-primary)]">I agree that Casemate may use my confirmed CV to improve the accuracy of its fit model.</span>{' '}
          Only anonymized signals (education, skills, certifications, experience and fit scores) are used, to calibrate scoring and peer benchmarks for future candidates. We never share your name, email, raw CV or target company.
        </span>
      </label>
      <p className="mt-2 pl-6 text-xs text-[var(--space-text-muted)]">
        Optional — your assessment works the same either way, and you can change this whenever you confirm your CV.{' '}
        <button
          type="button"
          onClick={(event) => { event.preventDefault(); event.stopPropagation(); openFitDataUsePolicy(); }}
          className="font-bold text-[var(--space-text-brand)] underline underline-offset-2"
        >
          How we use your data
        </button>
      </p>
    </div>
  );
}
