import { useLayoutEffect, useRef, type InputHTMLAttributes } from 'react';
import {
  caretIndexAfterSignificant,
  countSignificantChars,
  formatNumericEntry,
  normalizeNumericEntry,
} from '../lib/numberDisplay';

type FormattedNumberInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'type'> & {
  /** Plain value as stored ("1000000"). Commas are display-only. */
  value: string;
  /** Receives the plain value with thousands commas removed ("1,000,000" -> "1000000"). */
  onValueChange: (next: string) => void;
  /** Set false for percent entries, which are never grouped. */
  group?: boolean;
};

/**
 * Text input that shows thousands separators while typing / after paste, keeps the
 * caret next to the digit being edited, and hands the parent an un-grouped value.
 */
export default function FormattedNumberInput({ value, onValueChange, group = true, ...rest }: FormattedNumberInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const caretRef = useRef<number | null>(null);
  const shown = formatNumericEntry(value, { group });

  useLayoutEffect(() => {
    const input = inputRef.current;
    const significantBefore = caretRef.current;
    caretRef.current = null;
    if (!input || significantBefore === null || typeof document === 'undefined' || document.activeElement !== input) return;
    const position = caretIndexAfterSignificant(input.value, significantBefore);
    input.setSelectionRange(position, position);
  });

  return (
    <input
      {...rest}
      ref={inputRef}
      type="text"
      value={shown}
      onChange={(event) => {
        const raw = event.target.value;
        const position = event.target.selectionStart ?? raw.length;
        caretRef.current = countSignificantChars(raw.slice(0, position));
        onValueChange(normalizeNumericEntry(raw));
      }}
    />
  );
}
