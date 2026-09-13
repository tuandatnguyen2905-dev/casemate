import type { CSSProperties } from 'react';
import { BRAND_MARK_PATH_D, BRAND_MARK_VIEW_BOX } from '../lib/brandMark';

interface BrandLogoMarkProps {
  size?: number;
  // Any CSS colour, including a theme token such as var(--space-brand-primary).
  // Defaults to currentColor so the mark inherits the ink of whatever it sits in.
  color?: string;
  title?: string;
  className?: string;
  style?: CSSProperties;
}

// The Casemate mark on its own: no chip, no plate, no rounded square behind it.
// Whatever is underneath shows through everywhere except the mark itself.
export default function BrandLogoMark({
  size = 32,
  color = 'currentColor',
  title,
  className,
  style,
}: BrandLogoMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox={BRAND_MARK_VIEW_BOX}
      className={className}
      style={{ display: 'block', flexShrink: 0, ...style }}
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      {title ? <title>{title}</title> : null}
      <path d={BRAND_MARK_PATH_D} fill={color} fillRule="evenodd" />
    </svg>
  );
}
