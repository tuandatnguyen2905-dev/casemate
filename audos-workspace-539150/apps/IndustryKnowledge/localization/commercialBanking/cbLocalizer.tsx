import { cloneElement, isValidElement } from 'react';
import type { ReactElement, ReactNode } from 'react';
import { BankingCaseStudyBlock } from '../../commercialBankingCore';
import type { BankingCardData, BankingCaseStudy } from '../../commercialBankingCore';
import { CB_CASES } from '../../commercialBankingCases';
import { F2DeepDive } from '../../fashionM2Core';
import { HELD_VISUAL_TEXT } from '../../chapterVisualText';
import type { ChapterLocale, LessonLocale, ViCaseStudy, ViChapter, ViLesson } from '../localizationTypes';
import type { LessonLocalizer, LocalizableQuestion, LocalizeInput, LocalizeOutput } from '../lessonLocalization';
import { keepsNumbers } from '../numberCheck';
import { CB_VI_CASES } from './cbViCases';
import { CB_VI_LESSONS } from './cbViNav';

// Content-aware overlay for Commercial Banking decks. Every Vietnamese string replaces the English field it
// was translated from, matched by lesson code, chapter index and field name. A field falls back to English
// when the English chapter title changed (stale translation) or when any number in the current English text
// is missing from the Vietnamese text, so an edited figure, period or legal reference can never be shown in
// an outdated translation. The chapter body is rebuilt from structured parts (deep dive, restriction, case
// study), never by string replacement on rendered markup.

export { keepsNumbers, numberTokens } from '../numberCheck';

const CHAPTER_NUMBER = /^\d{2}\s+(?=\S)/;
const stripNumber = (title: string | undefined) => String(title ?? '').replace(CHAPTER_NUMBER, '');

export const CB_RESTRICTION_VI = 'Cần xác minh — Không xuất bản';
const NARRATIVE_FIELDS = { 'What it is': 'what', 'How it works': 'how', 'Why it matters': 'why', 'Global example': 'global', 'Vietnam example': 'vietnam' } as const;

/** Vietnamese for the generic distractors bankingQuiz adds (commercialBankingCore.tsx). */
export const CB_GENERIC_WRONG_VI: Record<string, string> = {
  'It removes the need for capital, liquidity and risk controls': 'Nó loại bỏ nhu cầu về vốn, thanh khoản và kiểm soát rủi ro',
  'It means every balance-sheet item is revenue': 'Nó có nghĩa là mọi khoản mục trên bảng cân đối kế toán đều là doanh thu',
  'It guarantees profit regardless of credit losses': 'Nó bảo đảm có lợi nhuận bất kể tổn thất tín dụng',
  'It applies only to investment banks': 'Nó chỉ áp dụng cho ngân hàng đầu tư',
};

function ViDeepDive({ paragraphs, evidence }: { paragraphs: string[]; evidence?: string }) {
  return (
    <div className="space-y-4" lang="vi">
      {paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      {evidence ? (
        <p className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs leading-6 text-slate-600">
          <strong className="text-slate-800">Ghi chú bằng chứng: </strong>{evidence}
        </p>
      ) : null}
    </div>
  );
}

export function ViCaseStudyBlock({ study, vi }: { study: BankingCaseStudy; vi: ViCaseStudy }) {
  const rows: Array<[string, string]> = [
    ['Ngân hàng & bối cảnh', vi.context],
    ['Vấn đề kinh doanh', vi.problem],
    ['Hành động chiến lược', vi.action],
    ['Cơ chế kinh doanh', vi.mechanism],
    ['Kết quả được ghi nhận', vi.outcome],
  ];
  return (
    <section className="rounded-xl border border-slate-200 bg-slate-50 p-4" aria-label={`Tình huống thực tế: ${vi.bank}`} data-testid="cb-case-study" data-locale="vi" lang="vi">
      <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500">Tình huống thực tế · {vi.bank}</p>
      <h4 className="mt-1 text-sm font-semibold leading-6 text-slate-900">{vi.title}</h4>
      <dl className="mt-3 space-y-2.5">
        {rows.map(([label, text]) => (
          <div key={label}>
            <dt className="text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-500">{label}</dt>
            <dd className="mt-0.5 text-sm leading-6 text-slate-700">{text}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-3 rounded-lg border border-dashed border-slate-300 bg-white p-3">
        <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-500">Bài học cho management trainee · phân tích, không phải số liệu được công bố</p>
        <p className="mt-0.5 text-sm leading-6 text-slate-700">{vi.takeaway}</p>
      </div>
      <p className="mt-3 text-xs leading-5 text-slate-500">
        Nguồn (giữ nguyên tên gốc):{' '}
        {study.sources.map((item, index) => (
          <span key={item.href}>
            {index ? '; ' : ''}
            <a href={item.href} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2" lang="en">{item.publisher}, {item.title}</a>
          </span>
        ))}
        . Kiểm tra ngày {vi.verifiedAtVi}.
      </p>
    </section>
  );
}

const CASE_FIELDS = ['context', 'problem', 'action', 'mechanism', 'outcome', 'takeaway'] as const;

export function caseIdOf(study: unknown): string | undefined {
  const cases = CB_CASES as Record<string, BankingCaseStudy>;
  return Object.keys(cases).find((key) => cases[key] === study);
}

/** Vietnamese for a case only while it still matches the English version it was translated from. */
export function freshCaseTranslation(study: BankingCaseStudy): { id?: string; vi?: ViCaseStudy; state: 'translated' | 'stale' | 'missing' } {
  const id = caseIdOf(study);
  const vi = id ? CB_VI_CASES[id] : undefined;
  if (!id || !vi) return { id, state: 'missing' };
  const current = vi.enTitle === study.title && vi.sourceVerifiedAt === study.verifiedAt && CASE_FIELDS.every((field) => keepsNumbers(study[field], vi[field]));
  return current ? { id, vi, state: 'translated' } : { id, state: 'stale' };
}

const asList = (children: ReactNode): ReactNode[] => (Array.isArray(children) ? children : [children]);

interface BodyParts {
  root: ReactElement<{ children?: ReactNode }>;
  kids: ReactNode[];
  deepDive?: ReactElement<{ paragraphs: string[]; evidence?: string }>;
  caseStudy?: ReactElement<{ study: BankingCaseStudy }>;
  restriction?: { element: ReactElement; text: string };
}

function readBody(body: ReactNode): BodyParts | null {
  if (!isValidElement(body)) return null;
  const root = body as ReactElement<{ children?: ReactNode }>;
  const kids = asList(root.props.children);
  const parts: BodyParts = { root, kids };
  kids.forEach((kid) => {
    if (!isValidElement(kid)) return;
    if (kid.type === F2DeepDive) parts.deepDive = kid as ReactElement<{ paragraphs: string[]; evidence?: string }>;
    else if (kid.type === BankingCaseStudyBlock) parts.caseStudy = kid as ReactElement<{ study: BankingCaseStudy }>;
    else if (kid.type === 'div') {
      const inner = asList((kid.props as { children?: ReactNode }).children);
      const text = inner.find((item): item is string => typeof item === 'string');
      if (text !== undefined) parts.restriction = { element: kid, text };
    }
  });
  return parts;
}

function caseNode(element: ReactElement<{ study: BankingCaseStudy }> | undefined): { node: ReactNode; state?: ChapterLocale['caseStudy'] } {
  if (!element) return { node: null };
  const fresh = freshCaseTranslation(element.props.study);
  return fresh.vi
    ? { node: <ViCaseStudyBlock study={element.props.study} vi={fresh.vi} />, state: 'translated' }
    : { node: element, state: fresh.state };
}

interface ChapterResult {
  card: BankingCardData;
  locale: ChapterLocale;
  /** English → Vietnamese for the fields bankingQuiz builds options and explanations from. */
  texts: Array<[string, string]>;
  title?: string;
  terms: Map<string, string>;
}

/** Swap only the case study inside an otherwise English chapter body. */
function caseOnlyChapter(card: BankingCardData, status: ChapterLocale['status']): ChapterResult {
  const parts = readBody(card.body);
  const swapped = caseNode(parts?.caseStudy);
  if (!parts || !parts.caseStudy || swapped.state !== 'translated') {
    return { card, locale: { status, fallbackFields: [], caseStudy: swapped.state }, texts: [], terms: new Map() };
  }
  const body = cloneElement(parts.root, undefined, ...parts.kids.map((kid) => (kid === parts.caseStudy ? swapped.node : kid)));
  return { card: { ...card, body }, locale: { status: 'partial', fallbackFields: ['chapter'], caseStudy: 'translated' }, texts: [], terms: new Map() };
}

export function localizeBankingChapter(card: BankingCardData, vi: ViChapter | undefined): ChapterResult {
  // Chapters held for review keep their English placeholder; the reader already explains the hold.
  if ((card as { reviewStatus?: string }).reviewStatus === 'Under Review') return { card, locale: { status: 'source', fallbackFields: [] }, texts: [], terms: new Map() };
  if (!vi) return caseOnlyChapter(card, 'missing');
  if (stripNumber(card.title) !== vi.en) return caseOnlyChapter(card, 'stale');
  const sameShape = vi.statTiles.length === (card.statTiles ?? []).length
    && vi.keyTerms.length === (card.keyTerms ?? []).length
    && vi.recap.length === (card.recap ?? []).length;
  if (!sameShape) return caseOnlyChapter(card, 'stale');

  const fallback: string[] = [];
  const texts: Array<[string, string]> = [];
  const pick = (path: string, english: string | undefined, vietnamese: string | undefined): string | undefined => {
    if (english === undefined) return english;
    if (keepsNumbers(english, vietnamese)) return vietnamese as string;
    fallback.push(path);
    return english;
  };
  // Acronyms such as "G-SIB" or "eKYC" are identical in both languages, so "translated" means the
  // Vietnamese field passed its checks, not that the text differs.
  const pickQuiz = (path: string, english: string, vietnamese: string | undefined) => {
    const accepted = keepsNumbers(english, vietnamese);
    const chosen = pick(path, english, vietnamese) as string;
    if (accepted) texts.push([english, chosen]);
    return chosen;
  };

  const title = pick('title', card.title, vi.title) as string;
  const heldVisual = card.visualHeading === HELD_VISUAL_TEXT.heading;
  const narrative = (card.narrative ?? []).map((item) => {
    const field = NARRATIVE_FIELDS[item.label as keyof typeof NARRATIVE_FIELDS];
    return field ? { ...item, text: pick(`narrative.${field}`, item.text, vi[field]) as string } : item;
  });
  const terms = new Map<string, string>();
  const keyTerms = card.keyTerms.map((item, index) => {
    const termAccepted = keepsNumbers(item.term, vi.keyTerms[index]?.term);
    const term = pick(`keyTerms.${index}.term`, item.term, vi.keyTerms[index]?.term) as string;
    const definition = pickQuiz(`keyTerms.${index}.definition`, item.definition, vi.keyTerms[index]?.definition);
    if (termAccepted) terms.set(item.term, term);
    return { term, definition };
  });

  const parts = readBody(card.body);
  let body: ReactNode = card.body;
  let caseState: ChapterLocale['caseStudy'];
  const enDeep = parts?.deepDive?.props;
  const deepFits = Boolean(enDeep)
    && vi.deepDive.length === enDeep!.paragraphs.length
    && enDeep!.paragraphs.every((paragraph, index) => keepsNumbers(paragraph, vi.deepDive[index]))
    && keepsNumbers(enDeep!.evidence, vi.evidence)
    && Boolean(parts!.restriction) === Boolean(vi.restriction)
    && (!parts!.restriction || keepsNumbers(parts!.restriction.text, vi.restriction));
  if (parts && deepFits) {
    const swapped = caseNode(parts.caseStudy);
    caseState = swapped.state;
    body = (
      <div className="space-y-4" data-locale="vi">
        {vi.restriction ? (
          <div className="rounded-xl border border-amber-300 bg-amber-50 p-3 text-xs leading-6 text-amber-900">
            <strong>{CB_RESTRICTION_VI}: </strong>{vi.restriction}
          </div>
        ) : null}
        <ViDeepDive paragraphs={vi.deepDive} evidence={vi.evidence || enDeep?.evidence} />
        {swapped.node}
      </div>
    );
  } else {
    fallback.push('body');
    if (parts?.caseStudy) {
      const swapped = caseNode(parts.caseStudy);
      caseState = swapped.state;
      if (swapped.state === 'translated') body = cloneElement(parts.root, undefined, ...parts.kids.map((kid) => (kid === parts.caseStudy ? swapped.node : kid)));
    }
  }

  const localized: BankingCardData = {
    ...card,
    title,
    objective: pick('objective', card.objective, vi.objective) as string,
    mateIntro: pick('mateIntro', card.mateIntro, vi.mateIntro) as string,
    keyInsight: pickQuiz('keyInsight', card.keyInsight, vi.keyInsight),
    narrative,
    visualHeading: heldVisual || vi.visualHeading === undefined ? card.visualHeading : pick('visualHeading', card.visualHeading, vi.visualHeading) as string,
    visualIntro: heldVisual || vi.visualIntro === undefined ? card.visualIntro : pick('visualIntro', card.visualIntro, vi.visualIntro) as string,
    imageAlt: pick('imageAlt', card.imageAlt, vi.imageAlt) as string,
    statTiles: card.statTiles.map((tile, index) => ({
      ...tile,
      label: pick(`statTiles.${index}.label`, tile.label, vi.statTiles[index]?.label) as string,
      subtitle: pick(`statTiles.${index}.subtitle`, tile.subtitle, vi.statTiles[index]?.subtitle),
      description: pick(`statTiles.${index}.description`, tile.description, vi.statTiles[index]?.description) as string,
    })),
    statsNote: pick('statsNote', card.statsNote, vi.statsNote) as string,
    keyTerms,
    recap: card.recap.map((item, index) => pickQuiz(`recap.${index}`, item, vi.recap[index])),
    chapterRecap: pickQuiz('chapterRecap', card.chapterRecap, vi.chapterRecap),
    deepDiveTitle: pick('deepDiveTitle', card.deepDiveTitle, vi.deepDiveTitle) as string,
    body,
  };
  return {
    card: localized,
    locale: { status: fallback.length ? 'partial' : 'translated', fallbackFields: fallback, caseStudy: caseState },
    texts,
    title: keepsNumbers(card.title, vi.title) ? title : undefined,
    terms,
  };
}

const Q_CAPTURES = /^Which statement best captures Chapter (\d+), “(.+)”\?$/;
const Q_TERM = /^What does “(.+)” mean in this lesson\?$/;
const Q_TAKEAWAY = /^Which (additional )?takeaway belongs to Chapter (\d+), “(.+)”\?$/;
const A_PRINCIPLE = /^A teammate is applying Chapter (\d+)\. Which principle should guide the analysis\?$/;
const A_TERM = /^A banking case uses the term “(.+)”\. Which definition is correct\?$/;
const A_SAFEST = /^Which statement would be safest to use when applying Chapter (\d+)\?$/;
const EXPLANATION = /^([\s\S]*) Review Chapter (\d+)\.$/;

interface QuizContext {
  enTitles: string[];
  viTitles: Array<string | undefined>;
  terms: Array<Map<string, string>>;
  texts: Map<string, string>;
}

function translateQuestionText(question: string, context: QuizContext): string | undefined {
  const titleFor = (number: string, english: string) => {
    const index = Number(number) - 1;
    return context.enTitles[index] === english ? context.viTitles[index] : undefined;
  };
  let match = question.match(Q_CAPTURES);
  if (match) {
    const title = titleFor(match[1], match[2]);
    return title && `Nhận định nào nắm bắt đúng nhất nội dung Chương ${match[1]}, “${title}”?`;
  }
  match = question.match(Q_TAKEAWAY);
  if (match) {
    const title = titleFor(match[2], match[3]);
    return title && `Ý ghi nhớ${match[1] ? ' bổ sung' : ''} nào thuộc về Chương ${match[2]}, “${title}”?`;
  }
  match = question.match(Q_TERM) ?? question.match(A_TERM);
  if (match) {
    const term = context.terms.map((map) => map.get(match![1])).find(Boolean);
    if (!term) return undefined;
    return question.startsWith('What does') ? `Trong bài học này, “${term}” có nghĩa là gì?` : `Một tình huống ngân hàng sử dụng thuật ngữ “${term}”. Định nghĩa nào là đúng?`;
  }
  match = question.match(A_PRINCIPLE);
  if (match) return `Một đồng nghiệp đang vận dụng Chương ${match[1]}. Nguyên tắc nào nên định hướng phân tích?`;
  match = question.match(A_SAFEST);
  if (match) return `Nhận định nào an toàn nhất khi vận dụng Chương ${match[1]}?`;
  return undefined;
}

function translateExplanation(explanation: string, context: QuizContext): string | undefined {
  const match = explanation.match(EXPLANATION);
  if (!match) return undefined;
  const [, text, chapter] = match;
  const direct = context.texts.get(text);
  if (direct) return `${direct} Ôn lại Chương ${chapter}.`;
  const terms = context.terms[Number(chapter) - 1];
  for (const [english, vietnamese] of terms ?? []) {
    const prefix = `${english}: `;
    if (!text.startsWith(prefix)) continue;
    const definition = context.texts.get(text.slice(prefix.length));
    if (definition) return `${vietnamese}: ${definition} Ôn lại Chương ${chapter}.`;
  }
  return undefined;
}

function translateObjective(objective: string | undefined, context: QuizContext): string | undefined {
  if (!objective) return objective;
  let match = objective.match(/^Apply the core insight from Chapter (\d+)$/);
  if (match) return `Vận dụng ý chính của Chương ${match[1]}`;
  match = objective.match(/^Use a Chapter (\d+) takeaway$/);
  if (match) return `Vận dụng một ý ghi nhớ của Chương ${match[1]}`;
  match = objective.match(/^Define (.+)$/);
  const term = match ? context.terms.map((map) => map.get(match![1])).find(Boolean) : undefined;
  return term ? `Định nghĩa “${term}”` : objective;
}

/**
 * Overlays Vietnamese onto the English Knowledge Check without rebuilding it: question and option ids,
 * option order and correctOptionId are untouched. A question is translated only when its text, every option
 * and its explanation map to a verified translated chapter field; otherwise it stays English.
 */
export function localizeBankingQuiz(questions: LocalizableQuestion[] | undefined, context: QuizContext): { questions?: LocalizableQuestion[]; fallbackIds: string[] } {
  if (!questions) return { questions, fallbackIds: [] };
  const fallbackIds: string[] = [];
  const localized = questions.map((question) => {
    const text = translateQuestionText(question.question, context);
    const options = question.options.map((option) => {
      const vietnamese = context.texts.get(option.text) ?? CB_GENERIC_WRONG_VI[option.text];
      return vietnamese ? { ...option, text: vietnamese } : undefined;
    });
    const explanation = translateExplanation(question.explanation, context);
    if (!text || !explanation || options.some((option) => !option)) {
      fallbackIds.push(question.id);
      return question;
    }
    return { ...question, question: text, options: options as Array<{ id: string; text: string }>, explanation, objective: translateObjective(question.objective, context) };
  });
  return { questions: localized, fallbackIds };
}

interface TakeawaysLike { learned?: string; keyTakeaways?: string[]; businessImplications?: string; remember?: string; nextLesson?: string }

function nextLessonLabel(title: string | undefined): string | undefined {
  const match = String(title ?? '').match(/^(\d+\.\d+)\s+(.*)$/);
  const copy = match ? CB_VI_LESSONS[match[1]] : undefined;
  return copy && match && copy.en === match[2] ? `${match[1]} ${copy.title}` : title;
}

function localizeTakeaways(takeaways: unknown, vi: ViLesson | undefined): { value: unknown; state: LessonLocale['takeaways'] } {
  if (!takeaways || typeof takeaways !== 'object') return { value: takeaways, state: 'none' };
  const english = takeaways as TakeawaysLike;
  const translated = vi?.takeaways;
  const fits = translated
    && (english.keyTakeaways ?? []).length === translated.keyTakeaways.length
    && keepsNumbers(english.learned, translated.learned)
    && keepsNumbers(english.businessImplications, translated.businessImplications)
    && keepsNumbers(english.remember, translated.remember)
    && (english.keyTakeaways ?? []).every((item, index) => keepsNumbers(item, translated.keyTakeaways[index]));
  if (!fits || !translated) return { value: { ...english, nextLesson: nextLessonLabel(english.nextLesson) }, state: 'english' };
  return {
    value: {
      ...english,
      learned: english.learned === undefined ? undefined : translated.learned,
      keyTakeaways: translated.keyTakeaways,
      businessImplications: english.businessImplications === undefined ? undefined : translated.businessImplications,
      remember: english.remember === undefined ? undefined : translated.remember,
      nextLesson: nextLessonLabel(english.nextLesson),
    },
    state: 'translated',
  };
}

export function createCbLocalizer(lessons: Record<string, ViLesson>): LessonLocalizer {
  const localize = ({ lessonTitle, cards, quizQuestions, finalTakeaways }: LocalizeInput): LocalizeOutput => {
    const code = lessonTitle.match(/^(\d+\.\d+)\s/)?.[1];
    const candidate = code ? lessons[code] : undefined;
    const vi = candidate && candidate.enTitle === lessonTitle ? candidate : undefined;
    const results = (cards as BankingCardData[]).map((card, index) => localizeBankingChapter(card, vi?.chapters[index]));
    const chapters = results.map((result) => result.locale);
    const translatedCount = chapters.filter((chapter) => chapter.status === 'translated').length;
    const anyTranslated = chapters.some((chapter) => chapter.status === 'translated' || chapter.status === 'partial');

    const texts = new Map<string, string>();
    const conflicts = new Set<string>();
    results.forEach((result) => result.texts.forEach(([english, vietnamese]) => {
      if (texts.has(english) && texts.get(english) !== vietnamese) conflicts.add(english);
      texts.set(english, vietnamese);
    }));
    conflicts.forEach((english) => texts.delete(english));
    const quiz = vi
      ? localizeBankingQuiz(quizQuestions, {
        enTitles: (cards as BankingCardData[]).map((card) => card.title),
        viTitles: results.map((result) => result.title),
        terms: results.map((result) => result.terms),
        texts,
      })
      : { questions: quizQuestions, fallbackIds: (quizQuestions ?? []).map((question) => question.id) };
    const quizState: LessonLocale['quiz'] = !quizQuestions?.length ? 'none' : !quiz.fallbackIds.length ? 'translated' : quiz.fallbackIds.length < quizQuestions.length ? 'partial' : 'english';
    const takeaways = localizeTakeaways(finalTakeaways, vi);

    return {
      cards: results.map((result) => result.card),
      quizQuestions: quiz.questions,
      finalTakeaways: takeaways.value,
      locale: {
        language: 'vi',
        status: translatedCount === cards.length && cards.length > 0 ? 'translated' : anyTranslated ? 'partial' : 'missing',
        chapters,
        quiz: quizState,
        quizFallbackIds: quiz.fallbackIds,
        takeaways: takeaways.state,
      },
    };
  };
  return { localize };
}
