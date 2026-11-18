import { resetTermClaims } from '../glossary/TermPopover';
import { useLearningLanguage } from './learningLanguage';
import type { LearningLanguage } from './localizationTypes';
import { useLessonLocale } from './lessonLocalization';

const OPTIONS: ReadonlyArray<{ id: LearningLanguage; label: string; title: string }> = [
  { id: 'en', label: 'EN', title: 'English' },
  { id: 'vi', label: 'VI', title: 'Tiếng Việt' },
];

/** Compact EN | VI switch for the lesson reader. Changing it never moves the learner or resets progress. */
export function LearningLanguageSwitch({ className = '' }: { className?: string }) {
  const [language, setLanguage] = useLearningLanguage();
  const choose = (next: LearningLanguage) => {
    if (next === language) return;
    // Inline glossary annotations are claimed per paragraph; release them so the new text is annotated afresh.
    resetTermClaims();
    setLanguage(next);
  };
  return (
    <div
      role="group"
      aria-label="Ngôn ngữ bài học · Lesson language"
      className={`inline-flex shrink-0 items-center gap-0.5 rounded-full border border-slate-200 bg-white p-0.5 normal-case tracking-normal shadow-sm ${className}`}
      data-testid="learning-language-switch"
    >
      {OPTIONS.map((option) => {
        const active = option.id === language;
        return (
          <button
            key={option.id}
            type="button"
            lang={option.id}
            aria-pressed={active}
            title={option.title}
            onClick={() => choose(option.id)}
            className={`min-h-7 min-w-9 rounded-full px-2 text-[11px] font-bold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-1 ${active ? 'bg-red-600 text-white' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'}`}
            data-testid={`learning-language-${option.id}`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

const NOTICE: Record<string, string> = {
  loading: 'Đang tải bản tiếng Việt…',
  missing: 'Chương này chưa có bản tiếng Việt nên đang hiển thị bằng tiếng Anh. Tiến độ và vị trí đọc của bạn vẫn được giữ nguyên.',
  stale: 'Nội dung tiếng Anh của chương này vừa được cập nhật, nên bản tiếng Việt cũ tạm thời được ẩn và chương hiển thị bằng tiếng Anh.',
  partial: 'Một số phần của chương này đang hiển thị bằng tiếng Anh vì chưa có bản dịch đã được đối chiếu.',
  caseStale: 'Tình huống thực tế trong chương này hiển thị bằng tiếng Anh vì nguồn vừa được kiểm chứng lại sau khi dịch.',
};

/** Tells the learner when the selected Vietnamese is not (fully) available for the open chapter. */
export function LearningLanguageNotice({ chapterIndex }: { chapterIndex: number }) {
  const locale = useLessonLocale();
  if (locale.language !== 'vi') return null;
  const chapter = locale.chapters[chapterIndex];
  const status = locale.status === 'loading' ? 'loading' : chapter?.status ?? locale.status;
  let message: string | undefined;
  if (status === 'loading' || status === 'missing' || status === 'stale') message = NOTICE[status];
  else if (status === 'partial') message = NOTICE.partial;
  else if (chapter?.caseStudy === 'stale') message = NOTICE.caseStale;
  if (!message) return null;
  return (
    <p role="status" lang="vi" className="mt-3 max-w-3xl rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs leading-5 text-slate-600" data-testid="learning-language-notice" data-status={status}>
      {message}
    </p>
  );
}
