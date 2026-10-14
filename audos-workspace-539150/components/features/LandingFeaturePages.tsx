import { useState } from 'react';
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  BrainCircuit,
  CheckCircle2,
  Clock3,
  FileText,
  Menu,
  Sparkles,
  Target,
  Trophy,
  Upload,
  X,
  Zap,
} from 'lucide-react';
import BrandLogoMark from '../BrandLogoMark';

export type LandingFeaturePage = 'fit-assessment' | 'practice-tool' | 'case-arena';

type Props = {
  page: LandingFeaturePage;
  brandName: string;
  headingFontStack: string;
  bodyFontStack: string;
  onNavigate: (page: LandingFeaturePage) => void;
  onHome: (section?: 'cv-drop' | 'programs-open' | 'pricing') => void;
  onSignUp: () => void;
};

const featureLinks: { page: LandingFeaturePage; label: string }[] = [
  { page: 'fit-assessment', label: 'Fit Assessment' },
  { page: 'practice-tool', label: 'Practice Tool' },
  { page: 'case-arena', label: 'Case Arena' },
];

function FeatureNav({ page, brandName, onNavigate, onHome, onSignUp }: Pick<Props, 'page' | 'brandName' | 'onNavigate' | 'onHome' | 'onSignUp'>) {
  const [menuOpen, setMenuOpen] = useState(false);
  const close = () => setMenuOpen(false);
  return (
    <header className="sticky top-0 z-[90] border-b border-[#e5e7eb] bg-white/95 shadow-sm backdrop-blur-xl">
      <div className="mx-auto flex min-h-16 max-w-7xl items-center gap-3 px-4 sm:px-6 lg:px-8">
        <button type="button" onClick={() => onHome()} className="flex shrink-0 items-center gap-2.5" aria-label={`${brandName} home`}>
          <BrandLogoMark size={30} style={{ color: '#cc0000' }} />
          <span className="hidden text-base font-extrabold tracking-tight text-[#111827] sm:inline">{brandName}</span>
        </button>

        <nav className="ml-auto hidden items-center gap-5 lg:flex" aria-label="Public navigation">
          <button type="button" onClick={() => onHome('cv-drop')} className="text-sm font-semibold text-[#374151] transition hover:text-[#cc0000]">Try Now</button>
          <button type="button" onClick={() => onHome('programs-open')} className="text-sm font-semibold text-[#374151] transition hover:text-[#cc0000]">Programs Open</button>
          {featureLinks.map((item) => (
            <button key={item.page} type="button" onClick={() => onNavigate(item.page)} className={`relative py-5 text-sm font-semibold transition ${page === item.page ? 'text-[#cc0000]' : 'text-[#374151] hover:text-[#cc0000]'}`} aria-current={page === item.page ? 'page' : undefined}>
              {item.label}
              {page === item.page && <span className="absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-[#cc0000]" />}
            </button>
          ))}
          <button type="button" onClick={() => onHome('pricing')} className="text-sm font-semibold text-[#374151] transition hover:text-[#cc0000]">Pricing</button>
        </nav>

        <div className="relative ml-auto lg:hidden">
          <button type="button" onClick={() => setMenuOpen((value) => !value)} className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#e5e7eb] text-[#111827]" aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={menuOpen}>
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
          {menuOpen && (
            <nav className="absolute right-0 top-12 w-72 rounded-2xl border border-[#e5e7eb] bg-white p-2 shadow-2xl" aria-label="Mobile public navigation">
              <button type="button" onClick={() => { close(); onHome('cv-drop'); }} className="block w-full rounded-xl px-3 py-2.5 text-left text-sm font-bold text-[#374151] hover:bg-[#fff5f5]">Try Now</button>
              <button type="button" onClick={() => { close(); onHome('programs-open'); }} className="block w-full rounded-xl px-3 py-2.5 text-left text-sm font-bold text-[#374151] hover:bg-[#fff5f5]">Programs Open</button>
              {featureLinks.map((item) => (
                <button key={item.page} type="button" onClick={() => { close(); onNavigate(item.page); }} className={`block w-full rounded-xl px-3 py-2.5 text-left text-sm font-bold ${page === item.page ? 'bg-[#fee2e2] text-[#b91c1c]' : 'text-[#374151] hover:bg-[#fff5f5]'}`} aria-current={page === item.page ? 'page' : undefined}>{item.label}</button>
              ))}
              <button type="button" onClick={() => { close(); onHome('pricing'); }} className="block w-full rounded-xl px-3 py-2.5 text-left text-sm font-bold text-[#374151] hover:bg-[#fff5f5]">Pricing</button>
            </nav>
          )}
        </div>

        <button type="button" onClick={onSignUp} className="shrink-0 rounded-full bg-[#cc0000] px-4 py-2.5 text-xs font-extrabold text-white transition hover:-translate-y-0.5 hover:bg-[#b91c1c] sm:px-5 sm:text-sm">Start free</button>
      </div>
    </header>
  );
}

function Hero({ eyebrow, title, description, onSignUp }: { eyebrow: string; title: string; description: string; onSignUp: () => void }) {
  return (
    <section className="border-b border-[#e5e7eb] bg-[radial-gradient(circle_at_85%_10%,rgba(204,0,0,0.12),transparent_30%),linear-gradient(180deg,#ffffff_0%,#fff7f7_100%)]">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <p className="text-xs font-black uppercase tracking-[0.22em] text-[#cc0000]">{eyebrow}</p>
        <h1 className="mt-5 max-w-4xl text-4xl font-black leading-[1.08] tracking-tight text-[#111827] sm:text-6xl">{title}</h1>
        <p className="mt-6 max-w-3xl text-base leading-8 text-[#4b5563] sm:text-lg">{description}</p>
        <button type="button" onClick={onSignUp} className="mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#cc0000] px-6 text-sm font-extrabold text-white shadow-[0_18px_40px_-18px_rgba(204,0,0,0.65)] transition hover:-translate-y-0.5 hover:bg-[#b91c1c]">Start free <ArrowRight className="h-4 w-4" /></button>
      </div>
    </section>
  );
}

function FitAssessmentPage({ onSignUp }: { onSignUp: () => void }) {
  const bars = [
    { label: 'FMCG', value: 92 },
    { label: 'Technology', value: 76 },
    { label: 'Financial Services', value: 64 },
  ];
  return (
    <>
      <Hero eyebrow="Fit Assessment" title="Find the right direction before you start preparing" description="Upload CV, answer a few questions, get your industry fit, function fit, matched MT/consulting programs, and a personal prep plan — all in minutes." onSignUp={onSignUp} />
      <main className="bg-[#f9fafb] px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <section className="rounded-3xl border border-[#e5e7eb] bg-white p-6 shadow-sm sm:p-8">
            <div className="flex items-center justify-between"><div><p className="text-xs font-black uppercase tracking-wider text-[#cc0000]">Step 01</p><h2 className="mt-2 text-2xl font-black text-[#111827]">Upload your CV</h2></div><Upload className="h-7 w-7 text-[#cc0000]" /></div>
            <div className="mt-7 flex min-h-52 flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#fecaca] bg-[#fffafa] px-5 text-center">
              <FileText className="h-10 w-10 text-[#cc0000]" />
              <p className="mt-4 font-extrabold text-[#111827]">Nguyen-Minh-Anh-CV.pdf</p>
              <p className="mt-1 text-sm text-[#6b7280]">Sample file · no upload required</p>
              <span className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#dcfce7] px-3 py-1 text-xs font-bold text-[#166534]"><CheckCircle2 className="h-3.5 w-3.5" /> Ready to analyse</span>
            </div>
            <div className="mt-5 rounded-2xl bg-[#f3f4f6] p-4"><p className="text-xs font-black uppercase tracking-wider text-[#6b7280]">Quick questions</p><p className="mt-2 text-sm font-bold text-[#111827]">Preferred work: customer growth · fast-moving teams · commercial ownership</p></div>
          </section>

          <section className="rounded-3xl border border-[#e5e7eb] bg-white p-6 shadow-sm sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3"><div><p className="text-xs font-black uppercase tracking-wider text-[#cc0000]">Sample result</p><h2 className="mt-2 text-2xl font-black text-[#111827]">Your fit snapshot</h2></div><Sparkles className="h-7 w-7 text-[#cc0000]" /></div>
            <div className="mt-7 grid gap-6 sm:grid-cols-2">
              <div className="rounded-2xl border border-[#fee2e2] p-5"><p className="text-xs font-black uppercase tracking-wider text-[#cc0000]">Industry fit</p><div className="mt-5 space-y-4">{bars.map((bar) => <div key={bar.label}><div className="mb-1.5 flex justify-between text-sm font-bold text-[#374151]"><span>{bar.label}</span><span>{bar.value}%</span></div><div className="h-2 rounded-full bg-[#f3f4f6]"><div className="h-2 rounded-full bg-[#cc0000]" style={{ width: `${bar.value}%` }} /></div></div>)}</div></div>
              <div className="rounded-2xl border border-[#fee2e2] p-5"><p className="text-xs font-black uppercase tracking-wider text-[#cc0000]">Function fit</p><div className="mt-5 space-y-4">{[{ label: 'Marketing & Sales', value: 87 }, { label: 'Strategy', value: 79 }, { label: 'Operations', value: 68 }].map((bar) => <div key={bar.label}><div className="mb-1.5 flex justify-between text-sm font-bold text-[#374151]"><span>{bar.label}</span><span>{bar.value}%</span></div><div className="h-2 rounded-full bg-[#f3f4f6]"><div className="h-2 rounded-full bg-[#cc0000]" style={{ width: `${bar.value}%` }} /></div></div>)}</div></div>
            </div>
            <div className="mt-6"><p className="text-xs font-black uppercase tracking-wider text-[#6b7280]">Matched programs</p><div className="mt-3 grid gap-3 sm:grid-cols-2"><article className="rounded-2xl border border-[#e5e7eb] p-4"><p className="font-extrabold text-[#111827]">Unilever MT</p><p className="mt-1 text-sm text-[#6b7280]">FMCG · Marketing</p><p className="mt-4 text-2xl font-black text-[#cc0000]">88%</p></article><article className="rounded-2xl border border-[#e5e7eb] p-4"><p className="font-extrabold text-[#111827]">Personal prep plan</p><p className="mt-1 text-sm leading-6 text-[#6b7280]">4 focused steps from CV gaps to interview readiness.</p><Target className="mt-4 h-6 w-6 text-[#cc0000]" /></article></div></div>
          </section>
        </div>
      </main>
    </>
  );
}

function PracticeToolPage({ onSignUp }: { onSignUp: () => void }) {
  return (
    <>
      <Hero eyebrow="Practice Tool" title="Build real-world skills with an all-in-one practice toolkit" description="Three tools in one — Aptitude Test (numerical & logical reasoning), Case Pool (full business cases), Case Drill (structured micro-drills by skill)." onSignUp={onSignUp} />
      <main className="bg-[#f9fafb] px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-3">
          <article className="rounded-3xl border border-[#e5e7eb] bg-white p-6 shadow-sm"><div className="flex items-center justify-between"><span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#fee2e2] text-[#cc0000]"><BrainCircuit className="h-5 w-5" /></span><span className="text-xs font-black uppercase tracking-wider text-[#cc0000]">Aptitude Test</span></div><h2 className="mt-6 text-xl font-black text-[#111827]">Numerical reasoning</h2><p className="mt-3 text-sm leading-6 text-[#4b5563]">Revenue rises from 80 to 92. What is the percentage increase?</p><div className="mt-5 grid grid-cols-2 gap-2">{['10%', '12%', '15%', '18%'].map((answer) => <button key={answer} type="button" className={`rounded-xl border px-3 py-3 text-sm font-bold ${answer === '15%' ? 'border-[#cc0000] bg-[#fff5f5] text-[#cc0000]' : 'border-[#e5e7eb] text-[#374151]'}`}>{answer}</button>)}</div></article>
          <article className="rounded-3xl border border-[#e5e7eb] bg-white p-6 shadow-sm"><div className="flex items-center justify-between"><span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#fee2e2] text-[#cc0000]"><BookOpen className="h-5 w-5" /></span><span className="text-xs font-black uppercase tracking-wider text-[#cc0000]">Case Pool</span></div><div className="mt-6 rounded-2xl bg-[#111827] p-5 text-white"><span className="rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider">Intermediate</span><h2 className="mt-5 text-xl font-black">UrbanCart Profitability</h2><p className="mt-2 text-sm text-white/65">Retail · Growth strategy</p><div className="mt-7 flex items-center justify-between text-xs font-bold text-white/70"><span>Full business case</span><ArrowRight className="h-4 w-4" /></div></div></article>
          <article className="rounded-3xl border border-[#e5e7eb] bg-white p-6 shadow-sm"><div className="flex items-center justify-between"><span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#fee2e2] text-[#cc0000]"><Zap className="h-5 w-5" /></span><span className="text-xs font-black uppercase tracking-wider text-[#cc0000]">Case Drill</span></div><div className="mt-6 rounded-2xl border border-[#fee2e2] bg-[#fffafa] p-5"><div className="flex items-center justify-between"><span className="rounded-full bg-[#fee2e2] px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-[#b91c1c]">Market sizing</span><span className="inline-flex items-center gap-1 text-xs font-bold text-[#6b7280]"><Clock3 className="h-3.5 w-3.5" /> 04:28</span></div><h2 className="mt-5 text-xl font-black text-[#111827]">Estimate Hanoi’s daily coffee orders.</h2><p className="mt-3 text-sm leading-6 text-[#4b5563]">Build a clean issue tree, state assumptions, then calculate.</p><div className="mt-6 h-2 overflow-hidden rounded-full bg-[#e5e7eb]"><div className="h-full w-2/3 rounded-full bg-[#cc0000]" /></div></div></article>
        </div>
        <div className="mx-auto mt-10 max-w-7xl text-center"><button type="button" onClick={onSignUp} className="inline-flex min-h-12 items-center gap-2 rounded-full bg-[#cc0000] px-6 text-sm font-extrabold text-white hover:bg-[#b91c1c]">Start free <ArrowRight className="h-4 w-4" /></button></div>
      </main>
    </>
  );
}

function CaseArenaPage({ onSignUp }: { onSignUp: () => void }) {
  const teams = [['North Star', '92.4'], ['Red Thread', '88.7'], ['Market Makers', '84.9'], ['Growth Lab', '81.2']];
  return (
    <>
      <Hero eyebrow="Case Arena" title="Compete in case challenges and test your skills" description="Coming soon — compete in timed case challenges and see where you rank." onSignUp={onSignUp} />
      <main className="bg-[#f9fafb] px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <div className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl border border-[#e5e7eb] bg-white p-6 shadow-xl sm:p-10">
          <div className="blur-[3px]" aria-hidden="true"><div className="flex items-center justify-between"><div><p className="text-xs font-black uppercase tracking-wider text-[#cc0000]">Live leaderboard</p><h2 className="mt-2 text-3xl font-black text-[#111827]">Case Arena rankings</h2></div><Trophy className="h-10 w-10 text-[#cc0000]" /></div><div className="mt-8 overflow-hidden rounded-2xl border border-[#e5e7eb]">{teams.map(([team, score], index) => <div key={team} className="grid grid-cols-[3rem_1fr_auto] items-center gap-3 border-b border-[#e5e7eb] px-5 py-4 last:border-0"><span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#fee2e2] text-sm font-black text-[#cc0000]">{index + 1}</span><div><p className="font-black text-[#111827]">{team}</p><p className="text-xs text-[#6b7280]">Timed strategy challenge</p></div><span className="text-xl font-black text-[#cc0000]">{score}</span></div>)}</div><div className="mt-6 grid gap-3 sm:grid-cols-3">{['Analysis', 'Communication', 'Recommendation'].map((label, index) => <div key={label} className="rounded-2xl bg-[#f3f4f6] p-4"><BarChart3 className="h-5 w-5 text-[#cc0000]" /><p className="mt-3 text-sm font-black text-[#111827]">{label}</p><p className="mt-1 text-2xl font-black text-[#cc0000]">{[91, 86, 89][index]}%</p></div>)}</div></div>
          <div className="absolute inset-0 flex items-center justify-center bg-white/45 p-6 backdrop-blur-[2px]"><div className="max-w-md rounded-3xl border border-[#fecaca] bg-white p-7 text-center shadow-2xl"><span className="inline-flex items-center gap-2 rounded-full bg-[#fee2e2] px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-[#b91c1c]"><Trophy className="h-4 w-4" /> Coming soon</span><h3 className="mt-5 text-2xl font-black text-[#111827]">The arena is getting ready.</h3><p className="mt-3 text-sm leading-6 text-[#4b5563]">Create your free account now and be ready for the first timed challenge.</p><button type="button" onClick={onSignUp} className="mt-6 inline-flex min-h-12 items-center gap-2 rounded-full bg-[#cc0000] px-6 text-sm font-extrabold text-white hover:bg-[#b91c1c]">Start free <ArrowRight className="h-4 w-4" /></button></div></div>
        </div>
      </main>
    </>
  );
}

export default function LandingFeaturePages(props: Props) {
  return (
    <div className="min-h-screen bg-[#f9fafb] text-[#111827]" style={{ fontFamily: props.bodyFontStack }}>
      <style>{`h1, h2, h3 { font-family: ${props.headingFontStack}; }`}</style>
      <FeatureNav page={props.page} brandName={props.brandName} onNavigate={props.onNavigate} onHome={props.onHome} onSignUp={props.onSignUp} />
      {props.page === 'fit-assessment' && <FitAssessmentPage onSignUp={props.onSignUp} />}
      {props.page === 'practice-tool' && <PracticeToolPage onSignUp={props.onSignUp} />}
      {props.page === 'case-arena' && <CaseArenaPage onSignUp={props.onSignUp} />}
    </div>
  );
}
