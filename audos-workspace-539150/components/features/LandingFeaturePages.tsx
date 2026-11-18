import { useState } from 'react';
import {
  ArrowRight,
  BookOpen,
  BrainCircuit,
  Calculator,
  CheckCircle2,
  FileText,
  Layers3,
  Lightbulb,
  Menu,
  Route,
  Target,
  Timer,
  Upload,
  X,
} from 'lucide-react';
import BrandLogoMark from '../BrandLogoMark';

export type LandingFeaturePage = 'fit-assessment' | 'practice-tool' | 'domain-knowledge' | 'aptitude-test' | 'about';

type Props = {
  page: LandingFeaturePage;
  brandName: string;
  headingFontStack: string;
  bodyFontStack: string;
  onNavigate: (page: LandingFeaturePage) => void;
  onHome: (section?: 'cv-drop' | 'programs-open' | 'pricing') => void;
  onSignUp: () => void;
  onOpenLegal?: (target: 'terms' | 'acceptable-use' | 'privacy') => void;
};

const legalLinks = [
  { target: 'terms', label: 'Terms of Service', href: '/terms' },
  { target: 'acceptable-use', label: 'Acceptable Use Policy', href: '/acceptable-use' },
  { target: 'privacy', label: 'Privacy Policy', href: '/privacy-policy' },
] as const;

const featureLinks: { page: LandingFeaturePage; label: string; href: string; description: string }[] = [
  { page: 'fit-assessment', label: 'Fit Assessment', href: '/fit-assessment', description: 'Find your best-fit industry, function and program path.' },
  { page: 'practice-tool', label: 'Case Drill', href: '/practice-tool', description: 'Build structure, calculation and problem-solving speed.' },
  { page: 'domain-knowledge', label: 'Domain Knowledge', href: '/domain-knowledge', description: 'Learn industry models, key terms and commercial context.' },
  { page: 'aptitude-test', label: 'Aptitude Test', href: '/aptitude-test', description: 'Practise numerical, logical and verbal screening questions.' },
  { page: 'about', label: 'About Us', href: '/about', description: 'Meet Casemate and the mission behind the platform.' },
];
const practiceToolLinks = featureLinks.filter((item) => item.page !== 'about');
const aboutLink = featureLinks.find((item) => item.page === 'about')!;

function PublicLink({ item, page, onNavigate, className }: {
  item: (typeof featureLinks)[number];
  page: LandingFeaturePage;
  onNavigate: Props['onNavigate'];
  className: string;
}) {
  return (
    <a
      href={item.href}
      onClick={(event) => { event.preventDefault(); onNavigate(item.page); }}
      className={className}
      aria-current={page === item.page ? 'page' : undefined}
    >
      {item.label}
    </a>
  );
}

function FeatureNav({ page, brandName, onNavigate, onHome, onSignUp }: Pick<Props, 'page' | 'brandName' | 'onNavigate' | 'onHome' | 'onSignUp'>) {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header className="sticky top-0 z-[90] border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur-xl">
      <div className="mx-auto flex min-h-16 max-w-7xl items-center gap-3 px-4 sm:px-6 lg:px-8">
        <a href="/" onClick={(event) => { event.preventDefault(); onHome(); }} className="flex shrink-0 items-center gap-2.5" aria-label={`${brandName} home`}>
          <BrandLogoMark size={30} style={{ color: '#dc2626' }} />
          <span className="hidden text-base font-extrabold tracking-tight text-slate-950 sm:inline">{brandName}</span>
        </a>

        <nav className="ml-auto hidden items-center gap-4 lg:flex" aria-label="Public navigation">
          <a href="/" onClick={(event) => { event.preventDefault(); onHome(); }} className="text-sm font-semibold text-slate-600 transition hover:text-red-600">Home</a>
          {practiceToolLinks.map((item) => (
            <PublicLink key={item.page} item={item} page={page} onNavigate={onNavigate} className={`relative whitespace-nowrap py-5 text-sm font-semibold transition ${page === item.page ? 'text-red-600 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:rounded-full after:bg-red-600' : 'text-slate-600 hover:text-red-600'}`} />
          ))}
          <PublicLink item={aboutLink} page={page} onNavigate={onNavigate} className={`relative whitespace-nowrap py-5 text-sm font-semibold transition ${page === 'about' ? 'text-red-600 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:rounded-full after:bg-red-600' : 'text-slate-600 hover:text-red-600'}`} />
        </nav>

        <div className="relative ml-auto lg:hidden">
          <button type="button" onClick={() => setMenuOpen((value) => !value)} className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-950" aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={menuOpen}>
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
          {menuOpen && (
            <nav className="absolute right-0 top-12 w-72 rounded-2xl border border-slate-200 bg-white p-2 shadow-2xl" aria-label="Mobile public navigation">
              <a href="/" onClick={(event) => { event.preventDefault(); setMenuOpen(false); onHome(); }} className="block rounded-xl px-3 py-2.5 text-sm font-bold text-slate-600 hover:bg-red-50">Home</a>
              <p className="px-3 pb-1 pt-3 text-[10px] font-black uppercase tracking-[0.16em] text-red-600">Practice Tool</p>
              {practiceToolLinks.map((item) => (
                <PublicLink key={item.page} item={item} page={page} onNavigate={(next) => { setMenuOpen(false); onNavigate(next); }} className={`block rounded-xl px-3 py-2.5 pl-5 text-sm font-bold ${page === item.page ? 'bg-red-50 text-red-700' : 'text-slate-600 hover:bg-red-50'}`} />
              ))}
              <div className="my-2 border-t border-slate-100" />
              <PublicLink item={aboutLink} page={page} onNavigate={(next) => { setMenuOpen(false); onNavigate(next); }} className={`block rounded-xl px-3 py-2.5 text-sm font-bold ${page === 'about' ? 'bg-red-50 text-red-700' : 'text-slate-600 hover:bg-red-50'}`} />
            </nav>
          )}
        </div>

        <button type="button" onClick={onSignUp} className="shrink-0 rounded-full bg-red-600 px-4 py-2.5 text-xs font-extrabold text-white transition hover:-translate-y-0.5 hover:bg-red-700 sm:px-5 sm:text-sm">Try it</button>
      </div>
    </header>
  );
}

function Hero({ eyebrow, title, description, onSignUp }: { eyebrow: string; title: string; description: string; onSignUp: () => void }) {
  return (
    <section className="border-b border-slate-200 bg-[radial-gradient(circle_at_85%_10%,rgba(220,38,38,0.13),transparent_30%),linear-gradient(180deg,#ffffff_0%,#fff7f7_100%)]">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <p className="text-xs font-black uppercase tracking-[0.22em] text-red-600">{eyebrow}</p>
        <h1 className="mt-5 max-w-4xl text-4xl font-black leading-[1.08] tracking-tight text-slate-950 sm:text-6xl">{title}</h1>
        <p className="mt-6 max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">{description}</p>
        <button type="button" onClick={onSignUp} className="mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-red-600 px-6 text-sm font-extrabold text-white shadow-[0_18px_40px_-18px_rgba(220,38,38,0.65)] transition hover:-translate-y-0.5 hover:bg-red-700">Try it <ArrowRight className="h-4 w-4" /></button>
      </div>
    </section>
  );
}

function Steps({ items }: { items: Array<{ icon: typeof Target; title: string; text: string }> }) {
  return (
    <div className="grid gap-5 md:grid-cols-3">
      {items.map((item, index) => {
        const Icon = item.icon;
        return (
          <article key={item.title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between"><span className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-red-600"><Icon className="h-5 w-5" /></span><span className="text-xs font-black text-red-600">0{index + 1}</span></div>
            <h2 className="mt-6 text-xl font-black text-slate-950">{item.title}</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">{item.text}</p>
          </article>
        );
      })}
    </div>
  );
}

function FitAssessmentPage({ onSignUp }: { onSignUp: () => void }) {
  return (
    <>
      <Hero eyebrow="Fit Assessment" title="Find where you fit — and what to do next" description="Upload your CV and combine your experience, motivation and work style into a clearer industry, function and program direction, plus a personal preparation plan." onSignUp={onSignUp} />
      <main className="bg-slate-50 px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Steps items={[
            { icon: Upload, title: 'Share your profile', text: 'Upload your CV and answer focused questions about your goals, motivation and preferred way of working.' },
            { icon: Target, title: 'See your direction', text: 'Understand the evidence behind your industry and function fit across relevant Management Trainee, Graduate Program, Internship Program and Rotational Program paths.' },
            { icon: Route, title: 'Follow a prep plan', text: 'Turn the gaps between your profile and your target into a practical, personalized preparation roadmap.' },
          ]} />
          <Callout title="Direction before preparation" text="Use the assessment to choose a stronger target, then move into the Casemate tools that match the skills you need to build." onSignUp={onSignUp} />
        </div>
      </main>
    </>
  );
}

function PracticeToolPage({ onSignUp }: { onSignUp: () => void }) {
  return (
    <>
      <Hero eyebrow="Case Drill" title="Build sharper problem-solving habits, one focused drill at a time" description="Practice structuring, calculation, market sizing, chart interpretation and creative problem solving in short, timed drills designed for interview preparation." onSignUp={onSignUp} />
      <main className="bg-slate-50 px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Steps items={[
            { icon: Layers3, title: 'Structure clearly', text: 'Break an unfamiliar business question into logical branches before you start solving.' },
            { icon: Calculator, title: 'Calculate confidently', text: 'Work through interview-style arithmetic and market-sizing assumptions with a clear, checkable approach.' },
            { icon: Timer, title: 'Practice under time', text: 'Build speed and discipline with focused prompts suited to Management Trainee and Rotational Program interviews.' },
          ]} />
          <Callout title="From first approach to stronger answer" text="Use each drill to practise one skill deliberately, review the explanation, and repeat until the method feels natural." onSignUp={onSignUp} />
        </div>
      </main>
    </>
  );
}

const industries = ['FMCG', 'Banking & Financial Services', 'Technology & Digital', 'Retail', 'Industrial & Manufacturing', 'Consulting', 'Basic Economics', 'Logistics & Supply Chain', 'Insurance', 'Tobacco & NGP'];

function DomainKnowledgePage({ onSignUp }: { onSignUp: () => void }) {
  return (
    <>
      <Hero eyebrow="Domain Knowledge" title="Understand how industries work before the interview begins" description="Learn the business models, value chains, economics, key terms and current forces shaping the sectors you want to enter." onSignUp={onSignUp} />
      <main className="bg-slate-50 px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <section className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div><p className="text-xs font-black uppercase tracking-[0.2em] text-red-600">Industry coverage</p><h2 className="mt-3 text-3xl font-black text-slate-950">Build context for the sector you are targeting.</h2><p className="mt-4 leading-8 text-slate-600">Current tracks cover the sectors already available in Casemate. Retail also includes focused sector learning for fashion, grocery, pharmacy and coffee.</p></div>
            <div className="grid gap-3 sm:grid-cols-2">{industries.map((industry) => <p key={industry} className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 text-sm font-bold text-slate-700"><CheckCircle2 className="h-4 w-4 shrink-0 text-red-600" />{industry}</p>)}</div>
          </section>
          <div className="mt-12"><Steps items={[
            { icon: BookOpen, title: 'Learn in focused lessons', text: 'Move through industry structure, value chains, business models, competition and the forces changing each sector.' },
            { icon: FileText, title: 'Master key terms', text: 'Use term sheets and plain-English definitions to understand the language, metrics and concepts used inside each industry.' },
            { icon: Lightbulb, title: 'Check your knowledge', text: 'Reinforce concepts through flashcards, guided learn mode, matching activities and available topic quizzes.' },
          ]} /></div>
          <Callout title="Useful for every early-career path" text="Build the commercial context needed to discuss an industry in Management Trainee, Graduate Program, Internship Program and Rotational Program applications." onSignUp={onSignUp} />
        </div>
      </main>
    </>
  );
}

function AptitudeTestPage({ onSignUp }: { onSignUp: () => void }) {
  return (
    <>
      <Hero eyebrow="Aptitude Test" title="Turn screening-test pressure into a repeatable routine" description="Practice the numerical, logical and verbal question types used in early-career screening, with hints and full explanations to help you learn from every attempt." onSignUp={onSignUp} />
      <main className="bg-slate-50 px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Steps items={[
            { icon: Calculator, title: 'Numerical reasoning', text: 'Interpret figures, percentages and tables accurately while keeping an eye on time.' },
            { icon: BrainCircuit, title: 'Logical reasoning', text: 'Spot rules, evaluate statements and work through unfamiliar patterns methodically.' },
            { icon: FileText, title: 'Verbal reasoning', text: 'Read carefully, separate evidence from assumptions and choose the best-supported conclusion.' },
          ]} />
          <Callout title="Prepare for the first screening hurdle" text="Use practice, hints and worked explanations to build accuracy for Management Trainee and Graduate Program tests before adding more time pressure." onSignUp={onSignUp} />
        </div>
      </main>
    </>
  );
}

function AboutPage({ onSignUp }: { onSignUp: () => void }) {
  return (
    <main className="bg-white">
      <section className="border-b border-slate-200 bg-slate-50 px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-red-600">About Casemate</p>
          <h1 className="mt-5 max-w-5xl text-4xl font-black leading-[1.08] tracking-tight text-slate-950 sm:text-6xl">MEET CASEMATE: YOUR AI-POWERED CAREER PREPARATION PARTNER</h1>
          <p className="mt-6 max-w-3xl text-xl font-extrabold text-red-600">Start to Become Future Leaders</p>
        </div>
      </section>
      <section className="px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <article className="space-y-6 text-base leading-8 text-slate-700">
            <p>We are CaseMate, an AI-powered career preparation platform built to help students understand where they fit and how they can prepare for what comes next.</p>
            <p>We started CaseMate from a simple observation: during the Management Trainee season, many students struggle to identify which programs or functions suit them best, while also finding it difficult to know what they should improve and practice to move forward.</p>
            <div><p>CaseMate aims to bridge that gap by helping students:</p><ul className="mt-3 space-y-2"><li>• Discover programs and functions that fit their profile</li><li>• Practice relevant cases through AI-powered Case Drills</li><li>• Build a clearer and more personalized career preparation roadmap</li></ul></div>
            <p>Our vision goes beyond Management Trainee programs. We are building a career ecosystem where students can discover, practice, and grow with the right guidance and tools.</p>
            <p>Welcome to CaseMate, where your career journey meets the right preparation.</p>
            <button type="button" onClick={onSignUp} className="inline-flex min-h-12 items-center gap-2 rounded-full bg-red-600 px-6 text-sm font-extrabold text-white hover:bg-red-700">Try it <ArrowRight className="h-4 w-4" /></button>
          </article>
          <figure className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg">
            <picture>
              <source srcSet="https://res.cloudinary.com/asfzhhej/image/fetch/f_webp,q_auto:good,w_1200/https://storage.googleapis.com/audos-images/attachments/c6ce26d1-7466-4b72-962d-b7bf7a471c88/7f2f4e99-8856-4ac6-9b60-e56883d4bebe.png" type="image/webp" />
              <img src="https://storage.googleapis.com/audos-images/attachments/c6ce26d1-7466-4b72-962d-b7bf7a471c88/7f2f4e99-8856-4ac6-9b60-e56883d4bebe.png" alt="Casemate banner reading Start to Be Future Leaders over a faint pink Casemate logo" width={1200} height={675} className="h-auto w-full object-cover" loading="lazy" decoding="async" />
            </picture>
          </figure>
        </div>
      </section>
    </main>
  );
}

function Callout({ title, text, onSignUp }: { title: string; text: string; onSignUp: () => void }) {
  return (
    <section className="mt-12 overflow-hidden rounded-3xl bg-slate-950 p-7 text-white sm:p-10">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between"><div><p className="text-xs font-black uppercase tracking-[0.18em] text-red-400">Start to Become Future Leaders</p><h2 className="mt-3 text-2xl font-black">{title}</h2><p className="mt-2 max-w-2xl text-sm leading-7 text-slate-300">{text}</p></div><button type="button" onClick={onSignUp} className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-red-600 px-6 text-sm font-extrabold text-white hover:bg-red-700">Try it <ArrowRight className="h-4 w-4" /></button></div>
    </section>
  );
}

function PublicFooter({ page, onNavigate, onHome, onOpenLegal }: Pick<Props, 'page' | 'onNavigate' | 'onHome' | 'onOpenLegal'>) {
  return (
    <footer className="bg-black text-white"><div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8"><a href="/" onClick={(event) => { event.preventDefault(); onHome(); }} className="inline-flex items-center gap-2 font-extrabold"><BrandLogoMark size={26} style={{ color: '#ffffff' }} />Casemate</a><nav className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold" aria-label="Public pages">{featureLinks.map((item) => <PublicLink key={item.page} item={item} page={page} onNavigate={onNavigate} className={page === item.page ? 'text-white' : 'text-white/65 hover:text-white'} />)}{legalLinks.map((link) => <a key={link.target} href={link.href} onClick={(event) => { if (onOpenLegal) { event.preventDefault(); onOpenLegal(link.target); } }} className="text-white/65 hover:text-white">{link.label}</a>)}</nav><p className="mt-8 text-xs text-white/45">© 2026 Casemate. Start to Become Future Leaders.</p></div></footer>
  );
}

export default function LandingFeaturePages(props: Props) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-950" style={{ fontFamily: props.bodyFontStack }}>
      <style>{`h1, h2, h3 { font-family: ${props.headingFontStack}; }`}</style>
      <FeatureNav page={props.page} brandName={props.brandName} onNavigate={props.onNavigate} onHome={props.onHome} onSignUp={props.onSignUp} />
      {props.page === 'fit-assessment' && <FitAssessmentPage onSignUp={props.onSignUp} />}
      {props.page === 'practice-tool' && <PracticeToolPage onSignUp={props.onSignUp} />}
      {props.page === 'domain-knowledge' && <DomainKnowledgePage onSignUp={props.onSignUp} />}
      {props.page === 'aptitude-test' && <AptitudeTestPage onSignUp={props.onSignUp} />}
      {props.page === 'about' && <AboutPage onSignUp={props.onSignUp} />}
      <PublicFooter page={props.page} onNavigate={props.onNavigate} onHome={props.onHome} onOpenLegal={props.onOpenLegal} />
    </div>
  );
}
