const LEGAL_LINKS = [
  { label: 'Terms of Service', href: 'https://www.casemateaud.com/terms' },
  { label: 'Acceptable Use Policy', href: 'https://www.casemateaud.com/acceptable-use' },
  { label: 'Privacy Policy', href: 'https://www.casemateaud.com/privacy-policy' },
] as const;

type LegalLinksProps = {
  lead?: string;
  className?: string;
};

export default function LegalLinks({ lead = 'By continuing you agree to our', className = '' }: LegalLinksProps) {
  const linkClass = 'font-semibold text-[var(--space-text-brand)] underline underline-offset-2';
  return (
    <p className={`text-xs leading-5 text-[var(--space-text-muted)] ${className}`} data-testid="legal-links">
      {lead}{' '}
      <a href={LEGAL_LINKS[0].href} target="_blank" rel="noopener noreferrer" className={linkClass}>{LEGAL_LINKS[0].label}</a>,{' '}
      <a href={LEGAL_LINKS[1].href} target="_blank" rel="noopener noreferrer" className={linkClass}>{LEGAL_LINKS[1].label}</a>{' '}and{' '}
      <a href={LEGAL_LINKS[2].href} target="_blank" rel="noopener noreferrer" className={linkClass}>{LEGAL_LINKS[2].label}</a>.
    </p>
  );
}
