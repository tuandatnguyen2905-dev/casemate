import type { FlashcardContent } from '../../../InteractiveLearning/flashcards/models';
import type { MatchSortActivity } from '../../../InteractiveLearning/matchSort/types';
import { lessonTargetOf, loadLessonLocalizer, peekLessonLocalizer } from '../lessonLocalization';
import { keepsNumbers } from '../numberCheck';

// Vietnamese display text for practice built at runtime from chapter text (practiceReview/chapterCards.ts and
// matchSort/generator.ts). Their ids, answer keys and chapter references come from the English chapter and never
// change. A generated card or activity is shown in Vietnamese only when every text it displays is a whole English
// chapter field (Key insight, a Key terms entry, a Concept breakdown section, a tile) whose Vietnamese counterpart
// the reader already shows for the same chapter, position and field, with every number intact. Anything else,
// including answers trimmed to part of a field, stays entirely English rather than mixing languages.

export interface PracticeSourceLesson {
  identity: string;
  persistenceKey?: string;
  /** The reader's English chapters for the open lesson. */
  cards: object[];
}

interface ChapterFields {
  title?: unknown;
  keyInsight?: unknown;
  objective?: unknown;
  chapterRecap?: unknown;
  recap?: unknown[];
  narrative?: Array<{ label?: unknown; text?: unknown }>;
  keyTerms?: Array<{ term?: unknown; definition?: unknown }>;
  statTiles?: Array<{ label?: unknown; description?: unknown }>;
}

export interface ChapterPairs {
  /** Vietnamese chapter title without its number. */
  title: string;
  /** Whole English field → Vietnamese field. */
  text: Map<string, string>;
  /** English key term → Vietnamese key term. */
  terms: Map<string, string>;
}

const clean = (value: unknown) => (typeof value === 'string' || typeof value === 'number' ? String(value).replace(/\s+/g, ' ').trim() : '');
const capitalise = (text: string) => text.charAt(0).toUpperCase() + text.slice(1);
const stripNumber = (title: string) => title.replace(/^\d{1,2}\s+(?=\S)/, '');
const q = (text: string) => `\u201c${text}\u201d`;

export function chapterPairs(englishChapter: object, vietnameseChapter: object): ChapterPairs | null {
  const en = englishChapter as ChapterFields;
  const vi = vietnameseChapter as ChapterFields;
  const title = stripNumber(clean(vi.title));
  if (!title || title === stripNumber(clean(en.title))) return null;
  const text = new Map<string, string>();
  const terms = new Map<string, string>();
  const add = (english: unknown, vietnamese: unknown) => {
    const from = clean(english);
    const to = clean(vietnamese);
    if (!from || !to || from === to || !keepsNumbers(from, to)) return;
    text.set(from, to);
    text.set(capitalise(from), capitalise(to));
  };
  add(en.keyInsight, vi.keyInsight);
  add(en.objective, vi.objective);
  add(en.chapterRecap, vi.chapterRecap);
  (en.recap ?? []).forEach((item, index) => add(item, vi.recap?.[index]));
  (en.narrative ?? []).forEach((item, index) => {
    const match = vi.narrative?.[index];
    if (match && clean(match.label) === clean(item.label)) add(item.text, match.text);
  });
  (en.keyTerms ?? []).forEach((item, index) => {
    const match = vi.keyTerms?.[index];
    if (!match) return;
    add(item.definition, match.definition);
    const term = clean(item.term);
    const viTerm = clean(match.term);
    if (term && viTerm && keepsNumbers(term, viTerm)) terms.set(term, viTerm);
  });
  (en.statTiles ?? []).forEach((item, index) => add(item.description, vi.statTiles?.[index]?.description));
  return { title, text, terms };
}

const pairsCache = new WeakMap<object[], { localizer: object; pairs: Array<ChapterPairs | null> }>();

/** Per-chapter English → Vietnamese text of the open lesson, or null until the reader's localizer is loaded. */
export function lessonPairs(lesson: PracticeSourceLesson | null | undefined): Array<ChapterPairs | null> | null {
  if (!lesson?.persistenceKey || !Array.isArray(lesson.cards)) return null;
  const target = lessonTargetOf(lesson.persistenceKey);
  if (!target) return null;
  const localizer = peekLessonLocalizer(target.packKey);
  if (!localizer) {
    loadLessonLocalizer(target.packKey).catch(() => undefined);
    return null;
  }
  const cached = pairsCache.get(lesson.cards);
  if (cached && cached.localizer === localizer) return cached.pairs;
  let pairs: Array<ChapterPairs | null>;
  try {
    const output = localizer.localize({ lessonTitle: target.lessonTitle, cards: lesson.cards });
    pairs = lesson.cards.map((english, index) => {
      const status = output.locale.chapters[index]?.status;
      const vietnamese = output.cards[index];
      return (status === 'translated' || status === 'partial') && vietnamese && vietnamese !== english ? chapterPairs(english, vietnamese) : null;
    });
  } catch {
    pairs = lesson.cards.map(() => null);
  }
  pairsCache.set(lesson.cards, { localizer, pairs });
  return pairs;
}

// Flashcards (chapterCards.ts slots, keyed by card id prefix) ------------------------------------------

const FRONT_VI: Record<string, (title: string, extra: string) => string> = {
  wi: (title) => `Ý tưởng cốt lõi của ${q(title)} là gì?`,
  ki: (title) => `Ý chính của ${q(title)} là gì?`,
  kt: (_title, term) => `${q(term)} nghĩa là gì?`,
  hw: (title) => `Cơ chế đằng sau ${q(title)} vận hành như thế nào?`,
  dr: (title) => `Điều gì đang thúc đẩy những diễn biến đằng sau ${q(title)}?`,
  wc: (title) => `Điều gì đang thay đổi trong ${q(title)}?`,
  ex: (title, kind) => (kind === 'Vietnam' ? `Hãy nêu một ví dụ tại Việt Nam cho ${q(title)}.` : `Hãy nêu một ví dụ thực tế cho ${q(title)}.`),
  ap: (title) => `Bạn sẽ áp dụng ${q(title)} vào thực tế như thế nào?`,
  va: (title) => `${q(title)} được áp dụng thế nào tại thị trường Việt Nam?`,
  kp: (title) => `Cần theo dõi những KPI nào cho ${q(title)}?`,
  rk: (title) => `Rủi ro chính cần theo dõi trong ${q(title)} là gì?`,
  bi: (title) => `Tác động kinh doanh của ${q(title)} là gì?`,
  wm: (title) => `Vì sao ${q(title)} quan trọng về mặt thương mại?`,
};

type GeneratedCardFields = FlashcardContent & { origin?: string; sourceSection?: string; learningObjective?: string };

export function localizeGeneratedCard(card: FlashcardContent, pairs: ChapterPairs | null | undefined): FlashcardContent | null {
  const source = card as GeneratedCardFields;
  if (!pairs || source.origin !== 'generated' || card.interaction) return null;
  const prefix = card.cardId.split('-')[0];
  const front = FRONT_VI[prefix];
  const back = pairs.text.get(clean(card.back));
  if (!front || !back || !keepsNumbers(card.back, back)) return null;
  let extra = '';
  if (prefix === 'kt') {
    extra = pairs.terms.get(clean(card.keyTerms[0])) ?? '';
    if (!extra) return null;
  } else if (prefix === 'ex') {
    extra = /vietnam/i.test(source.sourceSection ?? '') ? 'Vietnam' : 'real-world';
  }
  const objective = source.learningObjective ? pairs.text.get(clean(source.learningObjective)) : undefined;
  return {
    ...card,
    front: front(pairs.title, extra),
    back,
    explanation: pairs.text.get(clean(card.explanation)) ?? `Trình bày trong chương ${q(pairs.title)}.`,
    keyTerms: prefix === 'kt' ? [extra] : card.keyTerms.map((term) => pairs.terms.get(clean(term)) ?? term),
    ...(objective ? { learningObjective: objective } : {}),
  } as FlashcardContent;
}

// Match & Sort (generator.ts key-terms and concept-roles activities) ----------------------------------

const ROLE_VI: Record<string, { label: string; explanation: string; hint: string }> = {};
const role = (labels: string[], label: string | null, explanation: string, hint: string) => labels.forEach((english) => { ROLE_VI[english.toLowerCase()] = { label: label ?? '', explanation, hint }; });
role(['What it is'], 'Khái niệm', 'Câu này định nghĩa chủ đề: chủ đề là gì và bao gồm những gì.', 'Hãy tìm câu nói chủ đề là gì, không phải vì sao nó quan trọng hay một ví dụ của nó.');
role(['Why it is happening', 'Why it is changing', 'What is changing'], null, 'Câu này nêu nguyên nhân: vì sao chủ đề ngày càng quan trọng hoặc đang thay đổi.', 'Hãy tìm câu giải thích một nguyên nhân hoặc xu hướng đằng sau chủ đề.');
role(['How it works'], 'Cơ chế vận hành', 'Câu này giải thích cơ chế vận hành: các bước hoặc mối quan hệ đằng sau chủ đề.', 'Hãy tìm câu mô tả cách các phần kết nối hoặc vận hành.');
role(['Why it matters', 'Why it matters commercially', 'Business impact', 'How it affects businesses'], null, 'Câu này nêu hệ quả đối với doanh nghiệp và người ra quyết định.', 'Hãy tìm câu nói về hệ quả đối với doanh nghiệp.');
role(['How to apply it', 'Vietnam application'], null, 'Câu này cho thấy cách đưa ý tưởng vào thực tế.', 'Hãy tìm câu cho bạn biết nên làm gì với ý tưởng này.');
role(['Global example', 'Vietnam example', 'Real-world example', 'Example'], null, 'Câu này là một trường hợp cụ thể minh họa cho ý tưởng.', 'Hãy tìm câu mô tả một trường hợp cụ thể.');
ROLE_VI['why it matters'].label = 'Vì sao quan trọng';
ROLE_VI['global example'].label = 'Ví dụ toàn cầu';
ROLE_VI['vietnam example'].label = 'Ví dụ tại Việt Nam';

type ConceptMatching = Extract<MatchSortActivity, { type: 'concept-matching' }>;

export function localizeGeneratedActivity(activity: MatchSortActivity, lesson: Array<ChapterPairs | null> | null | undefined): MatchSortActivity | null {
  const generated = activity as MatchSortActivity & { origin?: string; objectiveKey?: string };
  if (!lesson || generated.origin !== 'generated' || activity.type !== 'concept-matching') return null;
  const pairs = lesson[activity.sourceRefs[0]?.chapterIndex ?? -1];
  if (!pairs) return null;
  const label = pairs.title;
  const summary = pairs.text.get(clean(activity.summary));
  if (generated.objectiveKey === 'key-terms' && activity.title.startsWith('Match the key terms: ')) {
    const prompts = activity.items.prompts.map((item) => ({ ...item, text: pairs.terms.get(clean(item.text)) ?? '' }));
    const answers = activity.items.answers.map((item) => ({ ...item, text: pairs.text.get(clean(item.text)) ?? '' }));
    if ([...prompts, ...answers].some((item) => !item.text)) return null;
    const termOf = new Map(prompts.map((item) => [item.id, item.text]));
    return {
      ...activity,
      title: `Ghép thuật ngữ chính: ${label}`,
      learningObjective: `Nối mỗi thuật ngữ chính trong ${q(label)} với nghĩa mà chương đưa ra.`,
      instructions: 'Chọn một thuật ngữ, sau đó chọn nghĩa phù hợp với thuật ngữ đó. Kiểm tra câu trả lời khi bạn đã ghép xong tất cả.',
      summary: summary ?? `Giờ bạn có thể giải thích các ý cốt lõi của ${q(label)} bằng chính cách diễn đạt của chương.`,
      promptLabel: 'Thuật ngữ chính',
      answerLabel: 'Nghĩa',
      items: { prompts, answers },
      pairs: activity.pairs.map((pair) => ({
        ...pair,
        explanation: `${q(label)} định nghĩa ${q(termOf.get(pair.promptId) ?? '')} như vậy trong phần Thuật ngữ chính.`,
        hint: `Hãy đọc lại cách ${q(label)} dùng ${q(termOf.get(pair.promptId) ?? '')}, rồi chọn nghĩa phù hợp.`,
      })),
    } as ConceptMatching;
  }
  if (generated.objectiveKey === 'concept-roles') {
    const roles = new Map(activity.items.prompts.map((item) => [item.id, ROLE_VI[clean(item.text).toLowerCase()]]));
    const prompts = activity.items.prompts.map((item) => ({ ...item, text: roles.get(item.id)?.label ?? '' }));
    const answers = activity.items.answers.map((item) => ({ ...item, text: pairs.text.get(clean(item.text)) ?? '' }));
    if ([...prompts, ...answers].some((item) => !item.text)) return null;
    return {
      ...activity,
      title: `Các phần của lời giải thích: ${label}`,
      learningObjective: `Phân biệt ${q(label)} là gì, điều gì thúc đẩy nó, nó diễn ra thế nào và điều gì minh họa cho nó.`,
      instructions: 'Chọn một phần của lời giải thích, sau đó chọn câu trong chương thể hiện phần đó. Kiểm tra câu trả lời khi bạn đã ghép xong tất cả.',
      summary: summary ?? `Giờ bạn có thể tách bạch định nghĩa, nguyên nhân, hệ quả và ví dụ trong ${q(label)}.`,
      promptLabel: 'Phần của lời giải thích',
      answerLabel: 'Câu trong chương',
      items: { prompts, answers },
      pairs: activity.pairs.map((pair) => {
        const copy = roles.get(pair.promptId)!;
        return { ...pair, explanation: `${copy.explanation} Chương trình bày nội dung này trong mục ${q(copy.label)}.`, hint: copy.hint };
      }),
    } as ConceptMatching;
  }
  return null;
}
