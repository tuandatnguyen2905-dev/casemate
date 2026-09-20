import { ArrowLeft, CheckCircle2, ExternalLink, Mail, ShieldCheck, UsersRound } from 'lucide-react';

type InfoPage = 'about' | 'contact' | 'privacy';

type Props = {
  page: InfoPage;
  onClose: () => void;
  onNavigate: (page: InfoPage) => void;
};

function PlatformIcon({ platform }: { platform: 'facebook' | 'group' | 'threads' | 'producthunt' | 'linkedin' | 'email' }) {
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

export function SocialIconLinks() {
  return <div className="flex flex-wrap gap-3">{socialLinks.map((link) => <a key={link.label} href={link.href} target={link.href.startsWith('mailto:') ? undefined : '_blank'} rel={link.href.startsWith('mailto:') ? undefined : 'noreferrer'} aria-label={link.label} title={link.label} className="flex h-11 w-11 items-center justify-center rounded-full border border-[#e5e7eb] bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md" style={{ color: link.color }}><PlatformIcon platform={link.platform} /></a>)}</div>;
}

export default function LandingInfoPage({ page, onClose, onNavigate }: Props) {
  const title = page === 'about' ? 'About Casemate' : page === 'contact' ? 'Contact Us' : 'Privacy Policy';
  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto bg-[#f8fafc] text-[#111827]" role="dialog" aria-modal="true" aria-labelledby="landing-info-page-title">
      <header className="sticky top-0 z-10 border-b border-[#e5e7eb] bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <button type="button" onClick={onClose} className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-bold text-[#374151] hover:bg-[#f3f4f6]"><ArrowLeft className="h-4 w-4" />Back to Casemate</button>
          <div className="flex items-center gap-2"><span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#cc0000] text-sm font-black text-white">C</span><span className="font-extrabold">Casemate</span></div>
        </div>
      </header>

      <main>
        <section className="border-b border-[#e5e7eb] bg-[#0f172a] text-white">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24"><p className="text-xs font-extrabold uppercase tracking-[0.24em] text-[#fca5a5]">Direction first. Prep second.</p><h1 id="landing-info-page-title" className="mt-4 max-w-3xl text-4xl font-extrabold tracking-tight sm:text-6xl">{title}</h1>{page === 'about' && <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">Casemate helps you figure out where you fit — before you start preparing.</p>}{page === 'contact' && <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">Questions, feedback, partnerships, or press — reach the Casemate team directly.</p>}{page === 'privacy' && <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">A clear summary of what Casemate collects, why we use it, and the choices you have.</p>}</div>
        </section>

        {page === 'about' && <section className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:py-24"><div className="space-y-10"><div><h2 className="text-2xl font-extrabold">Built from firsthand experience</h2><p className="mt-4 text-base leading-8 text-[#4b5563]">Casemate helps MT and consulting candidates figure out where they should be pointing — which industry, which function, which programs — and what to do to their profile before any prep begins. Built by someone who actually went through it and landed a Management Associate role at Central Retail Vietnam, the largest FDI retailer in Vietnam. Direction first. Prep second.</p></div><div><h2 className="text-2xl font-extrabold">Our mission</h2><p className="mt-4 text-base leading-8 text-[#4b5563]">Direction first. Prep second. We help candidates understand their strengths, working style, target functions, and best-fit programs before they invest in cases, drills, tests, and interviews.</p></div><div><h2 className="text-2xl font-extrabold">Who Casemate is for</h2><div className="mt-4 grid gap-3 sm:grid-cols-2">{['Students preparing for MT programs','Candidates targeting consulting roles','Early-career professionals choosing a function','Applicants who need a structured preparation roadmap'].map((item) => <p key={item} className="flex gap-2 rounded-2xl border border-[#e5e7eb] bg-white p-4 text-sm font-semibold"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#cc0000]" />{item}</p>)}</div></div></div><aside className="space-y-5"><div className="rounded-3xl bg-[#cc0000] p-7 text-white"><p className="text-5xl font-black">225+</p><p className="mt-2 text-sm font-bold uppercase tracking-wider text-red-100">Students activated</p></div><div className="rounded-3xl border border-[#e5e7eb] bg-white p-7"><p className="text-xs font-extrabold uppercase tracking-wider text-[#cc0000]">What we build</p><p className="mt-3 leading-7 text-[#4b5563]">Fit assessment, program intelligence, case practice, targeted drills, domain knowledge, aptitude preparation, and personalized roadmaps — one connected candidate journey.</p></div><div className="rounded-3xl border border-[#e5e7eb] bg-white p-7"><p className="mb-4 text-sm font-extrabold">Follow Casemate</p><SocialIconLinks /></div></aside></section>}

        {page === 'contact' && <section className="mx-auto grid max-w-6xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24"><div className="rounded-3xl border border-[#e5e7eb] bg-white p-7 sm:p-9"><Mail className="h-8 w-8 text-[#cc0000]" /><h2 className="mt-5 text-2xl font-extrabold">Email the team</h2><a href="mailto:support@casemateaud.com" className="mt-3 block text-lg font-bold text-[#cc0000] hover:underline">support@casemateaud.com</a><p className="mt-3 leading-7 text-[#6b7280]">We typically respond within 24–48 hours.</p><div className="mt-7"><p className="mb-3 text-sm font-extrabold">Connect with us</p><SocialIconLinks /></div></div><form action="mailto:support@casemateaud.com" method="post" encType="text/plain" className="rounded-3xl border border-[#e5e7eb] bg-white p-7 sm:p-9"><h2 className="text-2xl font-extrabold">Send a message</h2><div className="mt-6 space-y-5"><label className="block text-sm font-bold text-[#374151]">Name<input name="Name" required autoComplete="name" className="mt-2 min-h-12 w-full rounded-xl border border-[#d1d5db] px-4 font-normal outline-none focus:border-[#cc0000] focus:ring-2 focus:ring-red-100" /></label><label className="block text-sm font-bold text-[#374151]">Email<input name="Email" type="email" required autoComplete="email" className="mt-2 min-h-12 w-full rounded-xl border border-[#d1d5db] px-4 font-normal outline-none focus:border-[#cc0000] focus:ring-2 focus:ring-red-100" /></label><label className="block text-sm font-bold text-[#374151]">Message<textarea name="Message" required rows={6} className="mt-2 w-full rounded-xl border border-[#d1d5db] px-4 py-3 font-normal outline-none focus:border-[#cc0000] focus:ring-2 focus:ring-red-100" /></label></div><button type="submit" className="mt-6 min-h-12 w-full rounded-xl bg-[#cc0000] px-5 py-3 font-extrabold text-white hover:bg-[#b91c1c]">Send message</button></form></section>}

        {page === 'privacy' && <section className="mx-auto max-w-4xl space-y-10 px-4 py-16 sm:px-6 lg:py-24"><div className="rounded-3xl border border-[#e5e7eb] bg-white p-7 sm:p-10"><p className="text-sm text-[#6b7280]">Last reviewed: September 2026</p><p className="mt-4 leading-8 text-[#4b5563]">This page summarizes Casemate’s privacy practices. You can also read the complete policy at <a href="/privacy-policy" target="_blank" rel="noreferrer" className="font-bold text-[#cc0000] hover:underline">casemateaud.com/privacy-policy <ExternalLink className="inline h-4 w-4" /></a>.</p></div>{[{title:'Information we collect',body:'Your account email and name, CV content you choose to upload or paste, assessment and questionnaire responses, practice activity, generated results, and technical information needed to keep the service secure and reliable.'},{title:'How we use it',body:'To authenticate your account, analyze your profile, match you with relevant programs, personalize recommendations and preparation roadmaps, save your progress, provide support, and improve Casemate.'},{title:'How information is shared',body:'Casemate does not sell your personal information or share it with third parties for advertising. Limited service providers may process data only when needed to operate authentication, storage, payments, communications, and AI-assisted features.'},{title:'Retention and security',body:'Information is retained only for as long as needed to provide the service, meet legal obligations, and protect the platform. We use access controls and secure service providers to reduce unauthorized access.'},{title:'Your choices and rights',body:'You may request access, correction, or deletion of your personal information. Email support@casemateaud.com from the address connected to your account so we can verify and process the request.'}].map((item) => <article key={item.title} className="rounded-3xl border border-[#e5e7eb] bg-white p-7 sm:p-9"><div className="flex items-start gap-4"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-50 text-[#cc0000]"><ShieldCheck className="h-5 w-5" /></span><div><h2 className="text-xl font-extrabold">{item.title}</h2><p className="mt-3 leading-8 text-[#4b5563]">{item.body}</p></div></div></article>)}</section>}
      </main>

      <footer className="bg-black text-white"><div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-12 sm:px-6 lg:flex-row lg:items-center lg:justify-between"><div><p className="font-extrabold">Casemate</p><p className="mt-1 text-sm text-white/55">Direction first. Prep second.</p></div><nav className="flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold">{([['about','About Us'],['contact','Contact Us'],['privacy','Privacy Policy']] as const).map(([id,label]) => <button key={id} type="button" onClick={() => onNavigate(id)} className={page === id ? 'text-white' : 'text-white/65 hover:text-white'}>{label}</button>)}</nav>{page !== 'privacy' && <SocialIconLinks />}</div></footer>
    </div>
  );
}
