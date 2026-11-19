// Small "i" button with an explanation popover. Opens on hover, on keyboard
// focus and on tap/click (a tap pins it open until a second tap, Escape or a
// tap outside), so the same details work with a mouse, a keyboard and touch.

import { useCallback, useEffect, useId, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { Info } from 'lucide-react';

export default function InfoPopover({
  label,
  children,
  testId,
  align = 'right',
}: {
  /** Accessible name of the button, e.g. "Why this is recommended". */
  label: string;
  children: ReactNode;
  testId?: string;
  /** Edge of the button the popover lines up with. */
  align?: 'left' | 'right';
}) {
  const tipId = useId();
  const wrapRef = useRef<HTMLSpanElement>(null);
  const [hover, setHover] = useState(false);
  const [focused, setFocused] = useState(false);
  const [pinned, setPinned] = useState(false);
  const open = hover || focused || pinned;

  const close = useCallback(() => {
    setHover(false);
    setFocused(false);
    setPinned(false);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close();
    };
    const onPointer = (event: PointerEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(event.target as Node)) close();
    };
    window.addEventListener('keydown', onKey);
    window.addEventListener('pointerdown', onPointer);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('pointerdown', onPointer);
    };
  }, [open, close]);

  return (
    <span
      ref={wrapRef}
      className="mr-info"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <button
        type="button"
        className="mr-info-btn"
        aria-label={label}
        aria-expanded={open}
        aria-describedby={open ? tipId : undefined}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onClick={(event) => {
          if (open && pinned) {
            close();
            event.currentTarget.blur();
          } else {
            setPinned(true);
          }
        }}
        data-testid={testId}
      >
        <Info />
      </button>
      {open && (
        <span role="tooltip" id={tipId} className={`mr-info-pop is-${align}`} data-testid={testId ? `${testId}-popover` : undefined}>
          {children}
        </span>
      )}
    </span>
  );
}
