import { useEffect, useState, type ReactNode } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  BrainCircuit,
  BriefcaseBusiness,
  ChevronDown,
  LibraryBig,
  Menu,
  Target,
  Zap,
} from 'lucide-react';
import CasePoolLibrary, { type LibraryGradeResult } from './CasePoolLibrary';
import QuestionLibrary from './QuestionLibrary';
import IndustryKnowledge from '../apps/IndustryKnowledge/App';
import AptitudeTest from '../apps/AptitudeTest/App';

type ProductRoute =
  | '/product'
  | '/product/case-solver'
  | '/product/case-drill'
  | '/product/domain-knowledge'
  | '/product/aptitude-test';

interface ProductPagesProps {
  initialRoute: string;
  onSignUp: () => void;
}

const FEATURES = [
  {
    route: '/product/case-solver' as ProductRoute,
    name: 'Case Solver',
    subtitle: 'Thực hành case theo ngành với lời giải có cấu trúc.',
    description: 'Work through complete business cases, analyze exhibits, submit a structured answer, and compare your thinking with a model solution.',
    icon: BriefcaseBusiness,
    metric: '100 industry cases',
  },
  {
    route: '/product/case-drill' as ProductRoute,
    name: 'Case Drill',
    subtitle: 'Luyện phản xạ nhanh qua các micro-drill thực tế.',
    description: 'Build speed across structures, charts, calculations, market sizing, and creativity with focused interview drills.',
    icon: Zap,
    metric: '500+ focused drills',
  },
  {
    route: '/product/domain-knowledge' as ProductRoute,
    name: 'Domain Knowledge',
    subtitle: 'Nắm kiến thức ngành và KPI cốt lõi.',
    description: 'Learn how Vietnam’s key industries make money, which KPIs matter, and what interviewers expect you to understand.',
    icon: LibraryBig,
    metric: '9 industry tracks',
  },
  {
    route: '/product/aptitude-test' as ProductRoute,
    name: 'Aptitude Test',
    subtitle: 'Rèn Numerical, Logical và Pattern cho vòng test.',
    description: 'Practice timed numerical, logical, and pattern questions, then review your score and worked explanations.',
    icon: BrainCircuit,
    metric: 'Timed test simulation',
  },
] as const;

function normalizeRoute(path: string): ProductRoute {
  const clean = path.replace(/\/+$/, '') || '/product';
  return FEATURES.some((feature) => feature.route === clean)
    ? clean as ProductRoute
    : '/product';
}

function ProductHeader({ route, onNavigate, onSignUp }: {
  route: ProductRoute;
  onNavigate: (route: ProductRoute) => void;
  onSignUp: () => void;
}) {
  return (
    <header className="sticky top-0 z-[90] border-b border-white/10 bg-[#090b10]/95 text-white shadow-lg backdrop-blur-xl">
      <div className="mx-auto flex min-h-16 w-full max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
        <a href="/" className="flex shrink-0 items-center gap-2.5" aria-label="Casemate home">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#DC2626] shadow-[0_8px_28px_rgba(220,38,38,0.35)]">
            <Target className="h-5 w-5" />
          </span>
          <span className="text-lg font-black tracking-tight">Casemate</span>
        </a>

        <nav className="ml-auto hidden items-center gap-6 md:flex" aria-label="Product navigation">
          <a href="/" className="text-sm font-semibold text-white/70 transition hover:text-white">Home</a>
          <div className="group relative">
            <button type="button" className="flex items-center gap-1 text-sm font-semibold text-white">
              Product <ChevronDown className="h-4 w-4" />
            </button>
            <div className="invisible absolute left-1/2 top-full w-72 -translate-x-1/2 pt-3 opacity-0 transition group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
              <div className="rounded-xl border border-slate-200 bg-white p-2 text-slate-950 shadow-2xl">
                <a href="/product" onClick={(event) => { event.preventDefault(); onNavigate('/product'); }} className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-extrabold hover:bg-red-50">
                  <Menu className="h-4 w-4 text-[#DC2626]" /> Overview
                </a>
                <div className="my-1 border-t border-slate-100" />
                {FEATURES.map((feature) => {
                  const Icon = feature.icon;
                  return (
                    <a key={feature.route} href={feature.route} onClick={(event) => { event.preventDefault(); onNavigate(feature.route); }} className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-bold hover:bg-red-50 ${route === feature.route ? 'bg-red-50 text-[#B91C1C]' : ''}`}>
                      <Icon className="h-4 w-4 text-[#DC2626]" /> {feature.name}
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </nav>

        <details className="group relative ml-auto md:hidden">
          <summary className="flex h-10 w-10 cursor-pointer list-none items-center justify-center rounded-lg border border-white/20 text-white" aria-label="Open product menu">
            <Menu className="h-5 w-5" />
          </summary>
          <div className="absolute right-0 top-full mt-3 w-64 rounded-xl border border-slate-200 bg-white p-2 text-slate-950 shadow-2xl">
            <a href="/product" onClick={(event) => { event.preventDefault(); onNavigate('/product'); }} className="block rounded-lg px-3 py-2.5 text-sm font-extrabold hover:bg-red-50">Overview</a>
            {FEATURES.map((feature) => (
              <a key={feature.route} href={feature.route} onClick={(event) => { event.preventDefault(); onNavigate(feature.route); }} className={`block rounded-lg px-3 py-2.5 text-sm font-bold hover:bg-red-50 ${route === feature.route ? 'bg-red-50 text-[#B91C1C]' : ''}`}>{feature.name}</a>
            ))}
          </div>
        </details>

        <button type="button" onClick={onSignUp} className="rounded-lg bg-[#DC2626] px-3 py-2.5 text-xs font-extrabold text-white shadow-sm transition hover:bg-[#B91C1C] sm:px-4 sm:text-sm md:ml-2">
          Sign up free
        </button>
      </div>
    </header>
  );
}

function Overview({ onNavigate, onSignUp }: { onNavigate: (route: ProductRoute) => void; onSignUp: () => void }) {
  return (
    <main className="min-h-screen bg-[#090b10] text-white">
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(220,38,38,0.24),transparent_34%),radial-gradient(circle_at_85%_20%,rgba(220,38,38,0.12),transparent_28%)]" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <p className="text-xs font-black uppercase tracking-[0.24em] text-red-400">The Casemate practice system</p>
          <h1 className="mt-5 max-w-4xl text-4xl font-black leading-[1.06] tracking-tight sm:text-6xl lg:text-7xl">Everything you need to break into MT &amp; consulting.</h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">Từ hiểu ngành, luyện case đến aptitude test — một hệ thống luyện tập có cấu trúc để bạn cạnh tranh bằng năng lực thật.</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <button type="button" onClick={() => onNavigate('/product/case-solver')} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#DC2626] px-6 text-sm font-black transition hover:bg-[#B91C1C]">
              Start practicing <ArrowRight className="h-4 w-4" />
            </button>
            <button type="button" onClick={onSignUp} className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/20 px-6 text-sm font-bold text-white transition hover:border-white/40 hover:bg-white/5">Create a free account</button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-red-400">Four competitive edges</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">Train the complete interview stack.</h2>
          <p className="mt-3 leading-7 text-slate-400">Each tool is available below as a working demo. Choose the skill you need and start practicing immediately.</p>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {FEATURES.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <article key={feature.route} className="group rounded-2xl border border-white/10 bg-white/[0.045] p-6 transition hover:-translate-y-1 hover:border-red-500/50 hover:bg-white/[0.07] sm:p-7">
                <div className="flex items-start justify-between gap-4">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-600/15 text-red-400"><Icon className="h-6 w-6" /></span>
                  <span className="font-mono text-xs text-slate-600">0{index + 1}</span>
                </div>
                <h3 className="mt-7 text-2xl font-black">{feature.name}</h3>
                <p className="mt-2 text-sm font-semibold italic text-red-300">{feature.subtitle}</p>
                <p className="mt-4 text-sm leading-6 text-slate-400">{feature.description}</p>
                <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-5">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">{feature.metric}</span>
                  <button type="button" onClick={() => onNavigate(feature.route)} className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-black text-slate-950 transition group-hover:bg-[#DC2626] group-hover:text-white">
                    Try it <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}

function FeatureShell({ route, onNavigate, children }: {
  route: ProductRoute;
  onNavigate: (route: ProductRoute) => void;
  children: ReactNode;
}) {
  const feature = FEATURES.find((item) => item.route === route) || FEATURES[0];
  const Icon = feature.icon;
  return (
    <main className="min-h-screen bg-[var(--space-surface-page,#f8fafc)] text-[var(--space-text-primary,#111827)]">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
          <button type="button" onClick={() => onNavigate('/product')} className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 transition hover:text-[#DC2626]">
            <ArrowLeft className="h-4 w-4" /> Back to all features
          </button>
          <div className="mt-5 flex items-start gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-50 text-[#DC2626]"><Icon className="h-6 w-6" /></span>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">{feature.name}</h1>
                <span className="rounded-full bg-red-50 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-[#B91C1C]">Free demo</span>
              </div>
              <p className="mt-1 text-sm font-semibold italic text-[#B91C1C]">{feature.subtitle}</p>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">{feature.description}</p>
            </div>
          </div>
        </div>
      </section>
      <div className="mx-auto w-full max-w-7xl px-3 py-5 sm:px-6 sm:py-7 lg:px-8">{children}</div>
    </main>
  );
}

function CaseSolverDemo() {
  const [results, setResults] = useState<Record<string, LibraryGradeResult>>({});
  const gradeCase = async (item: any, answer: string): Promise<LibraryGradeResult> => {
    const normalized = answer.toLowerCase();
    const hints = Array.isArray(item.framework_hints) ? item.framework_hints.map((value: string) => value.toLowerCase()) : [];
    const matched = hints.filter((hint: string) => normalized.includes(hint.split(/\s+/)[0]));
    const wordCount = answer.trim().split(/\s+/).filter(Boolean).length;
    const structureScore = Math.min(5, 1.5 + wordCount / 55);
    const evidenceScore = Math.min(5, 1.5 + matched.length * 0.75 + (normalized.match(/\d/g)?.length || 0) / 8);
    const recommendationScore = Math.min(5, normalized.includes('recommend') || normalized.includes('nên') ? 4.5 : 2.8);
    const overall = Math.round(((structureScore + evidenceScore + recommendationScore + Math.min(5, 2 + wordCount / 80)) / 4) * 10) / 10;
    const grade: LibraryGradeResult = {
      score: overall,
      summary: overall >= 4 ? 'Strong, decision-oriented response. Tighten the prioritization and quantify the impact where possible.' : 'A solid start. Make the logic more explicit, use the exhibits as evidence, and close with a clear recommendation.',
      answer,
      breakdown: [
        { key: 'structure', label: 'Structure', score: Math.round(structureScore * 10) / 10, evidence: wordCount >= 120 ? 'Your response develops a multi-step argument.' : 'The response is concise but needs a clearer issue tree.', nextStep: 'State your hypothesis, workstream logic, and synthesis explicitly.' },
        { key: 'evidence', label: 'Evidence', score: Math.round(evidenceScore * 10) / 10, evidence: matched.length ? `You referenced ${matched.length} relevant case theme${matched.length === 1 ? '' : 's'}.` : 'Few explicit links to the case data were detected.', nextStep: 'Quote the exhibit figures and explain what each number implies.' },
        { key: 'recommendation', label: 'Recommendation', score: Math.round(recommendationScore * 10) / 10, evidence: recommendationScore > 4 ? 'A recommendation is clearly signposted.' : 'The final decision is not yet explicit.', nextStep: 'Finish with one decision, two reasons, the main risk, and a next step.' },
        { key: 'communication', label: 'Communication', score: Math.min(5, Math.round((2 + wordCount / 80) * 10) / 10), evidence: `${wordCount} words submitted in the demo response.`, nextStep: 'Use short headings and lead each paragraph with the takeaway.' },
      ],
      matched: matched.length ? matched : ['A complete written attempt was submitted'],
      missing: matched.length < 2 ? hints.slice(0, 3) : ['Quantified risk and implementation milestones'],
      recommendations: [
        { action: 'Re-read the exhibits', why: 'Strong case answers turn every important number into a business implication.' },
        { action: 'Deliver a 30-second synthesis', why: 'A concise recommendation is the final test of structured thinking.' },
      ],
    };
    setResults((current) => ({ ...current, [item.id]: grade }));
    return grade;
  };

  return <CasePoolLibrary sessionId="public-demo" results={results} onGrade={gradeCase} />;
}

export default function ProductPages({ initialRoute, onSignUp }: ProductPagesProps) {
  const [route, setRoute] = useState<ProductRoute>(() => normalizeRoute(initialRoute));

  useEffect(() => {
    const onPopState = () => setRoute(normalizeRoute(window.location.pathname));
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const navigate = (next: ProductRoute) => {
    if (window.location.pathname !== next) window.history.pushState({}, '', next);
    setRoute(next);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  let content: ReactNode;
  if (route === '/product') content = <Overview onNavigate={navigate} onSignUp={onSignUp} />;
  else if (route === '/product/case-solver') content = <FeatureShell route={route} onNavigate={navigate}><CaseSolverDemo /></FeatureShell>;
  else if (route === '/product/case-drill') content = <FeatureShell route={route} onNavigate={navigate}><QuestionLibrary /></FeatureShell>;
  else if (route === '/product/domain-knowledge') content = <FeatureShell route={route} onNavigate={navigate}><IndustryKnowledge demo /></FeatureShell>;
  else content = <FeatureShell route={route} onNavigate={navigate}><AptitudeTest demo /></FeatureShell>;

  return (
    <div className="min-h-screen bg-[#090b10] font-sans" data-testid="public-product-pages">
      <ProductHeader route={route} onNavigate={navigate} onSignUp={onSignUp} />
      {content}
    </div>
  );
}
