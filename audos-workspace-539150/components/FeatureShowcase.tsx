import { ArrowRight, Eye, LockKeyhole } from 'lucide-react';

type ShowcaseVariant = 'case-solver' | 'case-drill' | 'domain-knowledge' | 'aptitude-test';

interface ShowcaseItem {
  title: string;
  tags: string[];
  difficulty?: 'Easy' | 'Medium' | 'Hard';
  teaser?: string;
  answerPlaceholder?: string;
}

interface ShowcaseSpec {
  items: ShowcaseItem[];
  cta: string;
  lockCopy: string;
}

const SHOWCASES: Record<ShowcaseVariant, ShowcaseSpec> = {
  'case-solver': {
    items: [
      {
        title: "Tăng thị phần của L'Oréal Paris trong phân khúc skincare tại Việt Nam",
        tags: ['FMCG', 'Marketing'],
        difficulty: 'Hard',
      },
      {
        title: 'Chiến lược mở rộng kênh phân phối của Techcombank tại các tỉnh tier-2',
        tags: ['Banking', 'Strategy'],
        difficulty: 'Medium',
      },
      {
        title: 'Tối ưu chuỗi cung ứng cho Central Retail Vietnam trong mùa Tết',
        tags: ['Retail', 'Supply Chain'],
        difficulty: 'Hard',
      },
    ],
    cta: 'Mở khóa toàn bộ Case Pool',
    lockCopy: 'Đăng ký $15/tháng để mở khóa',
  },
  'case-drill': {
    items: [
      {
        title: 'Nếu một công ty FMCG muốn tăng 20% doanh thu trong Q3, bạn sẽ bắt đầu phân tích từ đâu?',
        tags: ['Framework: Profitability'],
      },
      {
        title: 'Unilever đang mất thị phần cho đối thủ ở kênh MT. Liệt kê 5 nguyên nhân có thể.',
        tags: ['Framework: Market Analysis'],
      },
      {
        title: 'Tính market size của ngành nước giải khát có ga tại Việt Nam.',
        tags: ['Framework: Market Sizing'],
      },
    ],
    cta: 'Luyện tập đầy đủ',
    lockCopy: 'Mở khóa bài luyện tập',
  },
  'domain-knowledge': {
    items: [
      {
        title: 'FMCG Value Chain — Từ nhà máy đến kệ siêu thị',
        tags: ['FMCG', 'Operations'],
        teaser: 'Theo dõi dòng hàng từ sản xuất, phân phối đến điểm bán và hiểu nơi giá trị được tạo ra trong chuỗi.',
      },
      {
        title: 'Cấu trúc P&L của một ngân hàng bán lẻ Việt Nam',
        tags: ['Banking', 'Finance'],
        teaser: 'Giải mã thu nhập lãi, thu nhập phí, chi phí vốn và các đòn bẩy lợi nhuận quan trọng.',
      },
      {
        title: 'Retail KPIs: SSS, SSSG, GMV và những chỉ số cần biết',
        tags: ['Retail', 'Analytics'],
        teaser: 'Phân biệt các KPI cốt lõi và cách dùng chúng để đọc hiệu quả tăng trưởng của doanh nghiệp bán lẻ.',
      },
    ],
    cta: 'Xem toàn bộ kiến thức',
    lockCopy: 'Mở khóa nội dung chuyên sâu',
  },
  'aptitude-test': {
    items: [
      {
        title: 'Nếu A hoàn thành công việc trong 6 ngày, B trong 4 ngày. Cùng làm bao nhiêu ngày xong?',
        tags: ['Numerical'],
        difficulty: 'Easy',
        answerPlaceholder: 'Nhập đáp án của bạn',
      },
      {
        title: 'Tìm số tiếp theo trong dãy: 2, 6, 18, 54, ___',
        tags: ['Pattern'],
        difficulty: 'Medium',
        answerPlaceholder: 'Số tiếp theo là…',
      },
      {
        title: 'Trong 5 ứng viên, nếu A không thể làm cùng B, và C phải cùng với D...',
        tags: ['Logical'],
        difficulty: 'Hard',
        answerPlaceholder: 'Chọn phương án đúng',
      },
    ],
    cta: 'Bắt đầu luyện thi',
    lockCopy: 'Mở khóa câu hỏi và đáp án',
  },
};

const DIFFICULTY_TONE: Record<NonNullable<ShowcaseItem['difficulty']>, string> = {
  Easy: 'bg-[color-mix(in_srgb,var(--space-semantic-success-500)_12%,transparent)] text-[var(--space-semantic-success-700)]',
  Medium: 'bg-[color-mix(in_srgb,var(--space-semantic-warning-500)_14%,transparent)] text-[var(--space-semantic-warning-700)]',
  Hard: 'bg-[color-mix(in_srgb,var(--space-semantic-danger-500)_12%,transparent)] text-[var(--space-semantic-danger-700)]',
};

export default function FeatureShowcase({ variant }: { variant: ShowcaseVariant }) {
  const spec = SHOWCASES[variant];
  const openPlans = () => {
    window.dispatchEvent(new CustomEvent('openApp', { detail: { appId: 'settings' } }));
  };

  return (
    <section className="border-b border-[var(--space-border-default)] bg-[var(--space-surface-page)]" data-testid={`showcase-${variant}`}>
      <div className="mx-auto w-full max-w-7xl px-3 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="flex items-center gap-2.5">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--space-surface-accent-soft)] text-[var(--space-text-brand)]">
            <Eye className="h-5 w-5" />
          </span>
          <div>
            <h2 className="text-lg font-extrabold text-[var(--space-text-primary)] sm:text-xl">Xem thử trước khi đăng ký</h2>
            <p className="mt-0.5 text-xs text-[var(--space-text-muted)]">Khám phá trải nghiệm thực tế với các ví dụ dành cho ứng viên MT tại Việt Nam.</p>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-3">
          {spec.items.map((item, index) => (
            <article
              key={item.title}
              className="relative min-h-[240px] overflow-hidden rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-5 shadow-sm"
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-[var(--space-surface-accent-soft)] px-2.5 py-1 text-[10px] font-bold text-[var(--space-text-brand)]">
                  {variant === 'aptitude-test' ? `Q${index + 1}` : variant === 'case-drill' ? `Drill ${index + 1}` : `0${index + 1}`}
                </span>
                {item.tags.map((tag) => (
                  <span key={tag} className="rounded-full border border-[color-mix(in_srgb,var(--space-brand-primary-500)_28%,var(--space-border-default))] px-2.5 py-1 text-[10px] font-semibold text-[var(--space-text-brand)]">
                    {tag}
                  </span>
                ))}
                {item.difficulty && (
                  <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${DIFFICULTY_TONE[item.difficulty]}`}>
                    {item.difficulty}
                  </span>
                )}
              </div>
              <h3 className="mt-4 text-sm font-extrabold leading-6 text-[var(--space-text-primary)] sm:text-base">{item.title}</h3>
              {item.teaser && <p className="mt-2 text-xs leading-5 text-[var(--space-text-secondary)]">{item.teaser}</p>}
              {item.answerPlaceholder && (
                <input
                  disabled
                  aria-label={`Đáp án khóa cho câu ${index + 1}`}
                  placeholder={item.answerPlaceholder}
                  className="mt-4 w-full rounded-lg border border-[var(--space-border-default)] bg-[var(--space-surface-muted)] px-3 py-2.5 text-xs text-[var(--space-text-muted)]"
                />
              )}

              <button
                type="button"
                onClick={openPlans}
                className="absolute inset-x-0 bottom-0 flex min-h-[92px] flex-col items-center justify-center gap-2 bg-[rgba(0,0,0,0.6)] px-4 text-center text-white transition-colors hover:bg-[rgba(0,0,0,0.68)]"
                aria-label={`${spec.lockCopy}: ${item.title}`}
              >
                <LockKeyhole className="h-6 w-6" />
                <span className="text-xs font-bold">{spec.lockCopy}</span>
              </button>
            </article>
          ))}
        </div>

        <div className="mt-6 flex justify-center">
          <button
            type="button"
            onClick={openPlans}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[var(--space-brand-primary)] px-5 py-3 text-sm font-bold text-[var(--space-text-on-primary)] shadow-sm transition hover:-translate-y-0.5 hover:bg-[var(--space-brand-primary-600)] hover:shadow-md"
          >
            {spec.cta} <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-8 border-t border-[var(--space-border-default)]" />
      </div>
    </section>
  );
}
