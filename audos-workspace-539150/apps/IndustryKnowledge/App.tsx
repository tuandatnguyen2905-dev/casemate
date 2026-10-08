import { useCallback, useEffect, useRef, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  BookOpen,
  Briefcase,
  Building2,
  Cpu,
  HeartPulse,
  Landmark,
  Milk,
  ShieldCheck,
  ShoppingCart,
  Store,
  Truck,
  Users,
  X,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useSpaceRuntime } from '../../SpaceRuntimeContext';
import PaywallGate from '../../components/PaywallGate';

interface IndustryCategory {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  subcategories?: IndustryCategory[];
}

type KnowledgeKind = 'Industry' | 'Company';

interface KnowledgeCard {
  title: string;
  description: string;
}

interface KnowledgeSection {
  kind: KnowledgeKind;
  title: string;
  subtitle: string;
  cards: KnowledgeCard[];
}

interface OpenCard {
  kind: KnowledgeKind;
  card: KnowledgeCard;
}

const INDUSTRY_CATEGORIES: IndustryCategory[] = [
  {
    id: 'fmcg',
    name: 'FMCG',
    description: 'High-velocity consumer goods, route to market, and brand economics.',
    icon: ShoppingCart,
    subcategories: [
      {
        id: 'dairy',
        name: 'Dairy',
        description: 'Cold-chain operations, category economics, consumer demand, and brand growth.',
        icon: Milk,
      },
    ],
  },
  {
    id: 'retail',
    name: 'Retail',
    description: 'Store economics, category management, merchandising, and omnichannel execution.',
    icon: Store,
  },
  {
    id: 'banking',
    name: 'Banking & Financial Services',
    description: 'Balance-sheet economics, risk, payments, and digital financial services.',
    icon: Landmark,
  },
  {
    id: 'technology',
    name: 'Technology & Digital',
    description: 'Products, platforms, data, growth, and digital business models.',
    icon: Cpu,
  },
  {
    id: 'manufacturing',
    name: 'Industrial & Manufacturing',
    description: 'Factory operations, resilient supply networks, productivity, and quality.',
    icon: Building2,
  },
  {
    id: 'consulting',
    name: 'Consulting',
    description: 'Structured problem solving, transformation delivery, and trusted advice.',
    icon: Briefcase,
  },
  {
    id: 'logistics',
    name: 'Logistics & Supply Chain',
    description: 'Freight, fulfillment, warehousing, and the networks behind trade.',
    icon: Truck,
  },
  {
    id: 'insurance',
    name: 'Insurance',
    description: 'Protection products, distribution, pricing, and long-duration risk.',
    icon: ShieldCheck,
  },
  {
    id: 'tobacco',
    name: 'Tobacco & Next-Generation Products',
    description: 'A mature regulated category shaped by excise, compliance, and public health.',
    icon: HeartPulse,
  },
];

const KNOWLEDGE_SECTIONS: KnowledgeSection[] = [
  {
    kind: 'Industry',
    title: 'Industry Knowledge',
    subtitle: 'Understand how the industry works before you step into it.',
    cards: [
      { title: 'Value Chain', description: 'See where value is created from inputs to the end customer.' },
      { title: 'Business Model', description: 'Understand how companies in this industry make money.' },
      { title: 'Key Drivers & Trends', description: 'Explore the forces shaping growth and change.' },
      { title: 'Competitive Landscape', description: 'Learn who is winning, where they compete, and why.' },
      { title: 'Risks', description: 'Review the operational, financial, and market risks that matter.' },
    ],
  },
  {
    kind: 'Company',
    title: 'Company Knowledge',
    subtitle: 'Build a practical view of the companies you want to join.',
    cards: [
      { title: 'Company Profile', description: 'Learn the company’s identity, scale, ownership, and market position.' },
      { title: 'Revenue & Financials', description: 'Understand where revenue comes from and how the business performs.' },
      { title: 'Product / Service Portfolio', description: 'Review what the company sells and who it serves.' },
      { title: 'Value Chain Footprint', description: 'See which activities the company owns, partners on, or outsources.' },
      { title: 'Competitive Edge', description: 'Identify the capabilities that help the company win against rivals.' },
    ],
  },
];

function CategoryCard({ category, onOpen }: { category: IndustryCategory; onOpen: () => void }) {
  const Icon = category.icon;

  return (
    <button
      type="button"
      onClick={onOpen}
      className="group flex min-h-44 flex-col rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-5 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:border-[var(--space-brand-primary-300)] hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--space-brand-primary-600)]"
      data-testid={`industry-category-${category.id}`}
    >
      <div className="flex items-start justify-between gap-4">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--space-surface-accent-soft)] text-[var(--space-text-brand)]">
          <Icon className="h-5 w-5" />
        </span>
        <ArrowRight className="h-5 w-5 text-[var(--space-brand-primary-600)] transition-transform group-hover:translate-x-1" />
      </div>
      <h2 className="mt-4 text-base font-black text-[var(--space-text-primary)]">{category.name}</h2>
      <p className="mt-2 text-xs leading-5 text-[var(--space-text-muted)]">{category.description}</p>
      <span className="mt-auto pt-4 text-[11px] font-extrabold uppercase tracking-[0.12em] text-[var(--space-text-brand)]">
        Explore knowledge
      </span>
    </button>
  );
}

function KnowledgeCardItem({
  kind,
  card,
  onOpen,
}: {
  kind: KnowledgeKind;
  card: KnowledgeCard;
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="group relative flex h-[210px] w-[260px] shrink-0 snap-start flex-col overflow-hidden rounded-2xl border border-[var(--space-brand-primary-200)] bg-[var(--space-surface-card)] px-5 pb-5 pt-6 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:border-[var(--space-brand-primary-400)] hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--space-brand-primary-600)]"
      aria-label={`Open ${card.title}`}
    >
      <span className="absolute inset-x-0 top-0 h-1 bg-[var(--space-brand-primary-600)]" aria-hidden />
      <span className="w-fit rounded-full bg-[var(--space-brand-primary-600)] px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.14em] text-[var(--space-text-on-primary)]">
        {kind}
      </span>
      <h3 className="mt-4 text-base font-black leading-tight text-[var(--space-text-primary)]">{card.title}</h3>
      <p className="mt-2 text-xs leading-5 text-[var(--space-text-secondary)]">{card.description}</p>
      <span className="mt-auto flex items-center justify-between gap-3 pt-3 text-[11px] font-bold text-[var(--space-text-brand)]">
        Open content
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--space-brand-primary-600)] text-[var(--space-text-on-primary)] shadow-sm transition-transform group-hover:translate-x-1">
          <ArrowRight className="h-4 w-4" />
        </span>
      </span>
    </button>
  );
}

function KnowledgeSectionBlock({
  section,
  industryName,
  openCard,
  onOpenCard,
  onCloseCard,
}: {
  section: KnowledgeSection;
  industryName: string;
  openCard: OpenCard | null;
  onOpenCard: (card: KnowledgeCard) => void;
  onCloseCard: () => void;
}) {
  const Icon = section.kind === 'Industry' ? BarChart3 : Users;
  const selectedCard = openCard?.kind === section.kind ? openCard.card : null;

  return (
    <section aria-labelledby={`${section.kind.toLowerCase()}-knowledge-heading`}>
      <header
        className="flex min-h-32 items-center justify-between gap-5 rounded-2xl px-5 py-6 text-white shadow-sm sm:px-8"
        style={{
          background: section.kind === 'Industry'
            ? 'linear-gradient(135deg, var(--space-brand-primary-600), var(--space-brand-primary-800))'
            : 'linear-gradient(135deg, var(--space-brand-primary-800), var(--space-neutral-900))',
        }}
      >
        <div>
          <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-white">{industryName}</p>
          <h2 id={`${section.kind.toLowerCase()}-knowledge-heading`} className="mt-2 text-2xl font-black tracking-tight sm:text-3xl">
            {section.title}
          </h2>
          <p className="mt-1 text-sm font-semibold text-white">{section.subtitle}</p>
        </div>
        <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white bg-white text-[var(--space-text-brand)] sm:h-16 sm:w-16" aria-hidden>
          <Icon className="h-7 w-7 sm:h-8 sm:w-8" />
        </span>
      </header>

      <div className="mt-4 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-3" data-testid={`${section.kind.toLowerCase()}-knowledge-cards`}>
        {section.cards.map((card) => (
          <KnowledgeCardItem
            key={card.title}
            kind={section.kind}
            card={card}
            onOpen={() => onOpenCard(card)}
          />
        ))}
      </div>

      {selectedCard && (
        <div className="mt-2 rounded-2xl border border-[var(--space-brand-primary-200)] bg-[var(--space-surface-card)] p-5 shadow-sm" role="region" aria-live="polite">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-[var(--space-text-brand)]">
                {industryName} · {section.title}
              </p>
              <h3 className="mt-2 text-lg font-black text-[var(--space-text-primary)]">{selectedCard.title}</h3>
              <p className="mt-2 text-sm leading-6 text-[var(--space-text-secondary)]">{selectedCard.description}</p>
              <p className="mt-3 text-xs leading-5 text-[var(--space-text-muted)]">
                Detailed content for this knowledge pillar is coming soon.
              </p>
            </div>
            <button
              type="button"
              onClick={onCloseCard}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[var(--space-brand-primary-200)] text-[var(--space-text-brand)] hover:bg-[var(--space-surface-accent-soft)]"
              aria-label="Close content preview"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

function CategoryList({ onSelect }: { onSelect: (category: IndustryCategory) => void }) {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-7 sm:py-8 lg:px-10">
      <header className="max-w-3xl">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--space-surface-accent-soft)] text-[var(--space-text-brand)]">
            <BookOpen className="h-5 w-5" />
          </span>
          <div>
            <h1 className="text-xl font-black text-[var(--space-text-primary)] sm:text-2xl">Domain Knowledge</h1>
            <p className="mt-0.5 text-xs font-semibold text-[var(--space-text-brand)]">Learn the business. Speak like an insider.</p>
          </div>
        </div>
        <p className="mt-4 text-sm leading-6 text-[var(--space-text-secondary)]">
          Choose an industry to understand its economics, competitive landscape, risks, and leading companies.
        </p>
      </header>

      <div className="mt-7">
        <h2 className="text-base font-black text-[var(--space-text-primary)]">Choose an industry</h2>
        <p className="mt-1 text-xs text-[var(--space-text-muted)]">Select a category to open its industry and company knowledge library.</p>
      </div>
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {INDUSTRY_CATEGORIES.map((category) => (
          <CategoryCard key={category.id} category={category} onOpen={() => onSelect(category)} />
        ))}
      </div>
    </main>
  );
}

function SubcategoryList({
  category,
  onSelect,
  onBack,
}: {
  category: IndustryCategory;
  onSelect: (subcategory: IndustryCategory) => void;
  onBack: () => void;
}) {
  const Icon = category.icon;
  const subcategories = category.subcategories || [];

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-7 sm:py-8 lg:px-10">
      <nav className="flex flex-wrap items-center gap-2 text-xs font-bold text-[var(--space-text-muted)]" aria-label="Breadcrumb">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] px-3 py-2 text-[var(--space-text-secondary)] hover:border-[var(--space-brand-primary-300)] hover:text-[var(--space-text-brand)]"
        >
          <ArrowLeft className="h-4 w-4" />
          All industries
        </button>
        <span aria-hidden>/</span>
        <span className="text-[var(--space-text-primary)]">{category.name}</span>
      </nav>

      <header className="mt-5 flex items-center gap-4">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[var(--space-surface-accent-soft)] text-[var(--space-text-brand)]">
          <Icon className="h-6 w-6" />
        </span>
        <div>
          <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[var(--space-text-brand)]">Domain Knowledge</p>
          <h1 className="mt-1 text-xl font-black text-[var(--space-text-primary)] sm:text-3xl">{category.name}</h1>
          <p className="mt-1 text-sm text-[var(--space-text-muted)]">{category.description}</p>
        </div>
      </header>

      <div className="mt-7">
        <h2 className="text-base font-black text-[var(--space-text-primary)]">Choose an FMCG category</h2>
        <p className="mt-1 text-xs text-[var(--space-text-muted)]">Select a category to open its industry and company knowledge library.</p>
      </div>
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {subcategories.map((subcategory) => (
          <CategoryCard key={subcategory.id} category={subcategory} onOpen={() => onSelect(subcategory)} />
        ))}
      </div>
    </main>
  );
}

function CategoryDetail({
  category,
  onBack,
  backLabel = 'All industries',
}: {
  category: IndustryCategory;
  onBack: () => void;
  backLabel?: string;
}) {
  const [openCard, setOpenCard] = useState<OpenCard | null>(null);
  const Icon = category.icon;

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-7 sm:py-8 lg:px-10">
      <nav className="flex flex-wrap items-center gap-2 text-xs font-bold text-[var(--space-text-muted)]" aria-label="Breadcrumb">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] px-3 py-2 text-[var(--space-text-secondary)] hover:border-[var(--space-brand-primary-300)] hover:text-[var(--space-text-brand)]"
        >
          <ArrowLeft className="h-4 w-4" />
          {backLabel}
        </button>
        <span aria-hidden>/</span>
        <span className="text-[var(--space-text-primary)]">{category.name}</span>
      </nav>

      <header className="mt-5 flex items-center gap-4">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[var(--space-surface-accent-soft)] text-[var(--space-text-brand)]">
          <Icon className="h-6 w-6" />
        </span>
        <div>
          <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[var(--space-text-brand)]">Domain Knowledge</p>
          <h1 className="mt-1 text-xl font-black text-[var(--space-text-primary)] sm:text-3xl">{category.name}</h1>
          <p className="mt-1 text-sm text-[var(--space-text-muted)]">{category.description}</p>
        </div>
      </header>

      <div className="mt-7 space-y-10">
        {KNOWLEDGE_SECTIONS.map((section) => (
          <KnowledgeSectionBlock
            key={section.kind}
            section={section}
            industryName={category.name}
            openCard={openCard}
            onOpenCard={(card) => setOpenCard({ kind: section.kind, card })}
            onCloseCard={() => setOpenCard(null)}
          />
        ))}
      </div>
    </main>
  );
}

function DomainKnowledgeScreen() {
  const { trackEvent } = useSpaceRuntime();
  const openedRef = useRef(false);
  const [selectedCategory, setSelectedCategory] = useState<IndustryCategory | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<IndustryCategory | null>(null);

  useEffect(() => {
    if (openedRef.current) return;
    openedRef.current = true;
    try {
      void Promise.resolve(trackEvent('domain_opened', {
        event_role: 'open',
        feature_name: 'domain',
        source_kind: 'live',
      })).catch((error) => console.warn('[Domain Knowledge] analytics mirror failed:', error));
    } catch (error) {
      console.warn('[Domain Knowledge] analytics mirror failed:', error);
    }
  }, [trackEvent]);

  const returnToIndustryList = () => {
    setSelectedSubcategory(null);
    setSelectedCategory(null);
  };

  const selectCategory = (category: IndustryCategory) => {
    setSelectedSubcategory(null);
    setSelectedCategory(category);
  };

  return (
    <div className="h-full overflow-y-auto bg-[var(--space-surface-page)]">
      {selectedSubcategory ? (
        <CategoryDetail
          category={selectedSubcategory}
          onBack={() => setSelectedSubcategory(null)}
          backLabel={`All ${selectedCategory?.name || 'FMCG'} categories`}
        />
      ) : selectedCategory?.subcategories?.length ? (
        <SubcategoryList
          category={selectedCategory}
          onSelect={setSelectedSubcategory}
          onBack={returnToIndustryList}
        />
      ) : selectedCategory ? (
        <CategoryDetail category={selectedCategory} onBack={returnToIndustryList} />
      ) : (
        <CategoryList onSelect={selectCategory} />
      )}
    </div>
  );
}

export default function IndustryKnowledge({ demo = false }: { demo?: boolean }) {
  const { trackEvent } = useSpaceRuntime();

  const handlePaywallBlocked = useCallback((reason: 'trial_ended') => {
    try {
      void Promise.resolve(trackEvent('domain_paywall_blocked', {
        reason,
        event_role: 'diagnostic',
        feature_name: 'domain',
        source_kind: 'live',
      })).catch((error) => console.warn('[Domain Knowledge] analytics mirror failed:', error));
    } catch (error) {
      console.warn('[Domain Knowledge] analytics mirror failed:', error);
    }
  }, [trackEvent]);

  if (demo) return <DomainKnowledgeScreen />;

  return (
    <PaywallGate appId="industry-knowledge" appName="Domain Knowledge" onBlocked={handlePaywallBlocked}>
      <DomainKnowledgeScreen />
    </PaywallGate>
  );
}
