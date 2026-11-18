import { Mail, UsersRound } from 'lucide-react';

type SocialPlatform = 'facebook' | 'group' | 'threads' | 'producthunt' | 'linkedin' | 'email';

function PlatformIcon({ platform }: { platform: SocialPlatform }) {
  if (platform === 'group') return <UsersRound className="h-5 w-5" />;
  if (platform === 'email') return <Mail className="h-5 w-5" />;
  const paths = {
    facebook: 'M9.1 23.7v-8H6.6V12h2.5v-1.6c0-4.1 1.8-6 5.9-6 .4 0 1 .1 1.5.1.4.1.8.1 1.1.2v3.3c-.2 0-.4 0-.7-.1h-.7c-.7 0-1.3.1-1.7.3-.3.2-.5.4-.7.7-.3.4-.4 1-.4 1.8V12h3.9l-.7 3.7h-3.2V24A12 12 0 1 0 9.1 23.7Z',
    threads: 'M18.3 11.1c0-3.5-1.9-5.6-5.1-5.6-2.1 0-3.9 1-4.9 2.5l2.1 1.4c.5-.8 1.3-1.5 2.6-1.5 1.5 0 2.3.9 2.5 2.4-.7-.1-1.5-.2-2.2-.2-4.1 0-6.1 1.9-6.1 4.4s1.9 4 4.8 4c3.1 0 5-2.1 5.8-4.7.8.4 1.3 1.2 1.3 2.5 0 3.4-3.9 5.2-7.2 5.2-4.9 0-8.1-3.2-8.1-8.4 0-6.4 4.2-10.5 9.9-10.5 3.8 0 5.7 1.7 7 3.9L22.8 5C21.4 2.1 18.3 0 13.7 0 6.2 0 1.2 5.3 1.2 12.9 1.2 19.9 6.1 24 12 24c4.9 0 9.8-2.8 9.8-7.7 0-2.5-1.5-4.2-3.5-5.2Zm-6.4 4.9c-1.1 0-2-.5-2-1.5 0-1.5 1.8-1.9 3.6-1.9.7 0 1.3 0 1.9.2-.4 1.9-1.7 3.2-3.5 3.2Z',
    producthunt: 'M13.6 8.4h-3.4V12h3.4a1.8 1.8 0 1 0 0-3.6ZM12 0a12 12 0 1 0 0 24 12 12 0 0 0 0-24Zm1.6 14.4h-3.4V18H7.8V6h5.8a4.2 4.2 0 1 1 0 8.4Z',
    linkedin: 'M4.9 3.3A2.5 2.5 0 1 1 0 3.3a2.5 2.5 0 0 1 4.9 0ZM.4 7.2h4.1V24H.4V7.2Zm6.8 0h3.9v2.3h.1c.6-1 1.9-2.8 4.8-2.8 5.2 0 6.1 3.4 6.1 7.8V24H18v-8.4c0-2 0-4.6-2.8-4.6s-3.2 2.2-3.2 4.5V24H7.2V7.2Z',
  } as const;
  return <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true"><path d={paths[platform]} /></svg>;
}

const socialLinks = [
  { platform: 'facebook' as const, label: 'Facebook Page', href: 'https://www.facebook.com/profile.php?id=61592671910026', color: '#0866ff' },
  { platform: 'group' as const, label: 'Facebook Group', href: 'https://www.facebook.com/share/g/1HxJ7wwDBK/', color: '#0866ff' },
  { platform: 'threads' as const, label: 'Threads', href: 'https://www.threads.com/@casemate.aud', color: '#111111' },
  { platform: 'producthunt' as const, label: 'Product Hunt', href: 'https://www.producthunt.com/products/casemate', color: '#da552f' },
  { platform: 'linkedin' as const, label: 'LinkedIn', href: 'https://www.linkedin.com/company/casemate-aud', color: '#0a66c2' },
  { platform: 'email' as const, label: 'Email', href: 'mailto:support@casemateaud.com', color: '#cc0000' },
];

export default function SocialIconLinks() {
  return <div className="flex flex-wrap gap-3">{socialLinks.map((link) => <a key={link.label} href={link.href} target={link.href.startsWith('mailto:') ? undefined : '_blank'} rel={link.href.startsWith('mailto:') ? undefined : 'noreferrer'} aria-label={link.label} title={link.label} className="flex h-11 w-11 items-center justify-center rounded-full border border-[#e5e7eb] bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md" style={{ color: link.color }}><PlatformIcon platform={link.platform} /></a>)}</div>;
}
