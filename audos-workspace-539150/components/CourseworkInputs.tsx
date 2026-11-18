import { useEffect, useRef, useState } from 'react';

export const COURSEWORK_COUNT = 3;

function splitCourses(raw: unknown): string[] {
  return String(raw || '').split(/[,\n]+/).map((item) => item.trim()).filter(Boolean);
}

function toSlots(raw: unknown): string[] {
  const courses = splitCourses(raw).slice(0, COURSEWORK_COUNT);
  return Array.from({ length: COURSEWORK_COUNT }, (_, index) => courses[index] || '');
}

function joinSlots(slots: string[]): string {
  return slots.map((item) => item.trim()).filter(Boolean).join(', ');
}

export function courseworkComplete(raw: unknown): boolean {
  return splitCourses(raw).length >= COURSEWORK_COUNT;
}

type CourseworkInputsProps = {
  id: string;
  value: string;
  onChange: (value: string) => void;
};

// Coursework is stored as the same comma-joined string the scoring engine
// reads, so commas typed inside one course are turned into spaces.
export default function CourseworkInputs({ id, value, onChange }: CourseworkInputsProps) {
  const [slots, setSlots] = useState<string[]>(() => toSlots(value));
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  useEffect(() => {
    const courses = splitCourses(value);
    if (courses.length > COURSEWORK_COUNT) {
      onChangeRef.current(courses.slice(0, COURSEWORK_COUNT).join(', '));
      return;
    }
    setSlots((current) => joinSlots(current) === courses.join(', ') ? current : toSlots(value));
  }, [value]);

  const filled = slots.filter((item) => item.trim()).length;
  const update = (index: number, text: string) => {
    const next = slots.map((item, itemIndex) => itemIndex === index ? text.replace(/[,\n]+/g, ' ') : item);
    setSlots(next);
    onChange(joinSlots(next));
  };

  return (
    <fieldset className="block text-xs font-bold text-[var(--space-text-secondary)]">
      <legend>Relevant Coursework <span className="text-[var(--space-semantic-danger)]">*</span> <span className="font-normal text-[var(--space-text-muted)]">— your {COURSEWORK_COUNT} most relevant courses</span></legend>
      <div className="mt-1.5 grid gap-2 sm:grid-cols-3">
        {slots.map((course, index) => (
          <input key={index} id={`${id}-${index}`} value={course} required aria-required="true" aria-label={`Relevant course ${index + 1}`} aria-invalid={!course.trim() || undefined} onChange={(event) => update(index, event.target.value)} placeholder={['e.g. Marketing Management', 'e.g. Financial Accounting', 'e.g. Data Analytics'][index]} className={`w-full rounded-xl border bg-[var(--space-surface-card)] px-3 py-2.5 text-sm font-normal text-[var(--space-text-primary)] outline-none focus:border-[var(--space-brand-primary)] ${course.trim() ? 'border-[var(--space-border-default)]' : 'border-[var(--space-semantic-danger)] bg-[color-mix(in_srgb,var(--space-semantic-danger)_4%,var(--space-surface-card))]'}`} />
        ))}
      </div>
      {filled < COURSEWORK_COUNT && <span className="mt-1 block text-[11px] font-semibold text-[var(--space-semantic-danger)]">Please add {COURSEWORK_COUNT - filled} more {COURSEWORK_COUNT - filled === 1 ? 'course' : 'courses'} ({filled}/{COURSEWORK_COUNT}).</span>}
    </fieldset>
  );
}
