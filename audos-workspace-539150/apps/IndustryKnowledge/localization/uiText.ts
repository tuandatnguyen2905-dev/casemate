import { readLearningLanguage, useLearningLanguage } from './learningLanguage';

// Vietnamese labels for the Learning Hub reader, Knowledge Check, takeaways and Practice & Review screens.
// Callers pass the exact English label; anything without an entry stays English. Reader components re-render
// through the lesson's language subscription (useLocalizedDeck); components outside it call useUiLanguage().
// Labels are display-only: no id, answer key, progress record or test id ever depends on them.
const VI: Record<string, string> = {
  Back: 'Quay lại',
  Swipe: 'Vuốt',
  'Learning journey': 'Lộ trình học',
  read: 'đã đọc',
  'Learning objective:': 'Mục tiêu bài học:',
  'Key insight': 'Ý chính',
  'Concept breakdown': 'Phân tích khái niệm',
  'What it is → how it works → example → why it matters': 'Khái niệm → cơ chế vận hành → ví dụ → vì sao quan trọng',
  'What it is': 'Khái niệm',
  'How it works': 'Cơ chế vận hành',
  'Why it matters': 'Vì sao quan trọng',
  'Global example': 'Ví dụ toàn cầu',
  'Vietnam example': 'Ví dụ tại Việt Nam',
  'Learning visual': 'Sơ đồ học tập',
  'Click the visual to enlarge': 'Nhấn vào sơ đồ để phóng to',
  'Dive deeper': 'Tìm hiểu sâu',
  'Full explanation': 'Giải thích đầy đủ',
  Sources: 'Nguồn',
  Previous: 'Trước',
  'Key terms': 'Thuật ngữ chính',
  'Chapter recap': 'Tóm tắt chương',
  'What to remember': 'Điều cần ghi nhớ',
  'Back to lessons': 'Quay lại danh sách bài học',
  'View Knowledge Check status': 'Xem trạng thái Kiểm tra kiến thức',
  'Start Knowledge Check': 'Bắt đầu Kiểm tra kiến thức',
  'Continue to next chapter': 'Tiếp tục chương sau',
  'View Lesson Takeaways': 'Xem điểm chính của bài học',
  'Knowledge Check': 'Kiểm tra kiến thức',
  'Knowledge Checks': 'Kiểm tra kiến thức',
  'Chapters read': 'Chương đã đọc',
  Lesson: 'Bài học',
  Completed: 'Đã hoàn thành',
  'No checks available': 'Chưa có bài kiểm tra',
  'Back to chapter': 'Quay lại chương',
  Submit: 'Nộp bài',
  Next: 'Tiếp',
  Correct: 'Đúng',
  Incorrect: 'Chưa đúng',
  'Your answer:': 'Câu trả lời của bạn:',
  'Correct answer:': 'Đáp án đúng:',
  'Not answered': 'Chưa trả lời',
  'Answer recorded.': 'Đã ghi nhận câu trả lời.',
  'Answer recorded. You can change it before you submit.': 'Đã ghi nhận câu trả lời. Bạn có thể đổi đáp án trước khi nộp bài.',
  'Knowledge Check progress': 'Tiến độ Kiểm tra kiến thức',
  'Knowledge Check submitted': 'Đã nộp bài Kiểm tra kiến thức',
  'Submitted earlier': 'Đã nộp trước đó',
  'Retake check': 'Làm lại bài kiểm tra',
  'Continue to Next Chapter': 'Tiếp tục chương sau',
  'All chapter checks are complete. Your lesson takeaways are ready.': 'Bạn đã hoàn thành mọi bài kiểm tra của các chương. Điểm chính của bài học đã sẵn sàng.',
  'The next chapter': 'Chương tiếp theo',
  'Back to chapters': 'Quay lại các chương',
  'Final lesson takeaways': 'Điểm chính cuối bài học',
  'Key takeaways': 'Điểm chính',
  'Business implications': 'Hàm ý kinh doanh',
  'Continue to Next Lesson': 'Tiếp tục bài học sau',
  'Evidence note: ': 'Ghi chú bằng chứng: ',
  min: 'phút',

  // Module overview
  Module: 'Học phần',
  'Your Learning Path': 'Lộ trình học của bạn',

  // Practice & Review: dialog, hub and mode cards
  'Return to Lesson': 'Quay lại bài học',
  'Practice & Review': 'Luyện tập & Ôn tập',
  'Practice & Review · Optional': 'Luyện tập & Ôn tập · Không bắt buộc',
  'Practice and review': 'Luyện tập và ôn tập',
  'Optional revision, one chapter at a time. Results stay separate from Knowledge Checks and never change chapter access, scores or lesson completion.':
    'Ôn tập không bắt buộc, từng chương một. Kết quả được tách riêng khỏi Kiểm tra kiến thức và không bao giờ thay đổi quyền mở chương, điểm số hay trạng thái hoàn thành bài học.',
  'Practice progress is saved in this browser for your account.': 'Tiến độ luyện tập được lưu trên trình duyệt này cho tài khoản của bạn.',
  'You are not signed in, so practice progress is kept only until you leave this page.': 'Bạn chưa đăng nhập nên tiến độ luyện tập chỉ được giữ đến khi bạn rời trang này.',
  'Practice never changes your Knowledge Check scores.': 'Luyện tập không bao giờ thay đổi điểm Kiểm tra kiến thức của bạn.',
  'Choose another learning mode': 'Chọn cách học khác',
  'Not available for this chapter yet': 'Chương này chưa có cách học này',
  'Opens as you complete chapters': 'Mở khi bạn hoàn thành các chương',
  'Review due cards': 'Ôn các thẻ đến hạn',
  'Practice again': 'Luyện tập lại',
  'Practise again': 'Luyện tập lại',
  'Continue practice': 'Tiếp tục luyện tập',
  'Start practice': 'Bắt đầu luyện tập',
  Flashcards: 'Thẻ ghi nhớ',
  'Recall important concepts and strengthen long-term retention.': 'Gợi nhớ các khái niệm quan trọng và củng cố trí nhớ dài hạn.',
  'Active recall': 'Chủ động gợi nhớ',
  'Concept review': 'Ôn tập khái niệm',
  'Spaced repetition': 'Lặp lại ngắt quãng',
  'Match & Sort': 'Ghép & Phân loại',
  'Connect, classify and organize knowledge through interactive activities.': 'Kết nối, phân loại và sắp xếp kiến thức qua các hoạt động tương tác.',
  'Concept Matching': 'Ghép khái niệm',
  'Category Sorting': 'Phân loại theo nhóm',
  'Sequence Builder': 'Sắp xếp trình tự',
  'Back to Flashcards overview': 'Quay lại tổng quan Thẻ ghi nhớ',
  'Back to deck overview': 'Quay lại tổng quan bộ thẻ',
  'No cards open yet': 'Chưa có thẻ nào được mở',
  'No activities open yet': 'Chưa có hoạt động nào được mở',

  // Flashcards
  Question: 'Câu hỏi',
  Answer: 'Đáp án',
  Explanation: 'Giải thích',
  'Practical example': 'Ví dụ thực tế',
  Source: 'Nguồn',
  'Tap the card or press Space to reveal the answer': 'Chạm vào thẻ hoặc nhấn Space để xem đáp án',
  'Tap the card or press Space to see the question again': 'Chạm vào thẻ hoặc nhấn Space để xem lại câu hỏi',
  'Multiple choice': 'Trắc nghiệm',
  'Fill in the blank': 'Điền vào chỗ trống',
  'Correct answer': 'Đáp án đúng',
  'Your answer': 'Câu trả lời của bạn',
  blank: 'chỗ trống',
  'Check answer': 'Kiểm tra đáp án',
  'Show answer': 'Xem đáp án',
  'Reveal answer': 'Lật thẻ xem đáp án',
  'Try again': 'Thử lại',
  'Correct.': 'Chính xác.',
  'Not quite. That is not the answer the chapter gives. Try again, or show the answer.': 'Chưa đúng. Đây không phải đáp án mà chương học đưa ra. Hãy thử lại hoặc xem đáp án.',
  'Not quite. Here is the answer the chapter gives.': 'Chưa đúng. Đây là đáp án mà chương học đưa ra.',
  'Here is the answer the chapter gives.': 'Đây là đáp án mà chương học đưa ra.',
  'Also accepted: ': 'Cũng được chấp nhận: ',
  'How well did you recall it?': 'Bạn nhớ thẻ này tốt đến đâu?',
  Again: 'Học lại',
  Hard: 'Khó',
  Good: 'Tốt',
  Easy: 'Dễ',
  'No cards to show': 'Không có thẻ nào để hiển thị',
  'This session has no cards.': 'Phiên học này không có thẻ nào.',
  'Shown again this session': 'Được hiển thị lại trong phiên này',
  'Forgotten last time': 'Lần trước bạn đã quên',
  'Difficult card': 'Thẻ khó',
  'Due for review': 'Đến hạn ôn tập',
  'Weak concept': 'Khái niệm chưa vững',
  'Checking an answer is not a rating. Rate your recall only if you want this card scheduled for review; Next moves on without it.':
    'Kiểm tra đáp án không phải là đánh giá. Chỉ đánh giá mức độ ghi nhớ nếu bạn muốn thẻ này được lên lịch ôn tập; nút Tiếp sẽ chuyển sang thẻ sau mà không đánh giá.',
  'Rating is optional. Use Next to move on without rating this card.': 'Việc đánh giá là không bắt buộc. Nhấn Tiếp để chuyển sang thẻ sau mà không đánh giá thẻ này.',
  'Card navigation': 'Điều hướng thẻ',
  'Finish session': 'Kết thúc phiên học',
  Skip: 'Bỏ qua',
  flip: 'lật thẻ',
  move: 'chuyển thẻ',
  'rate after the answer shows (optional)': 'đánh giá sau khi đáp án hiện (không bắt buộc)',
  'rate (optional)': 'đánh giá (không bắt buộc)',
  'Session progress': 'Tiến độ phiên học',

  // Match & Sort
  'Concept matching': 'Ghép khái niệm',
  'Category sorting': 'Phân loại theo nhóm',
  'Sequence builder': 'Sắp xếp trình tự',
  'Objective: ': 'Mục tiêu: ',
  'Check answers': 'Kiểm tra câu trả lời',
  'Show answers': 'Xem đáp án',
  'Next activity': 'Hoạt động tiếp theo',
  Reset: 'Đặt lại',
  'Chapter links and sources': 'Liên kết chương và nguồn',
  'What each chapter says about these answers appears here once the activity is complete.': 'Nội dung từng chương nói về các đáp án này sẽ hiện ở đây khi bạn hoàn thành hoạt động.',
  'Why this is a sequence: ': 'Vì sao đây là một trình tự: ',
  'Practice only. Results here do not change Knowledge Check scores, chapter access or lesson completion.':
    'Chỉ để luyện tập. Kết quả ở đây không thay đổi điểm Kiểm tra kiến thức, quyền mở chương hay trạng thái hoàn thành bài học.',
  'Read each explanation, then reset to try the activity again from memory.': 'Hãy đọc từng lời giải thích, sau đó đặt lại để làm lại hoạt động bằng trí nhớ.',
  'Correct answers stay in place. Use the hints to rethink the others, then try again.': 'Các câu trả lời đúng được giữ nguyên. Hãy dùng gợi ý để suy nghĩ lại những câu còn lại rồi thử lại.',
  'Correct: ': 'Đúng: ',
  'Not yet: ': 'Chưa đúng: ',
  'Answers revealed': 'Đã hiện đáp án',
  'All correct': 'Tất cả đều đúng',
  'that group': 'nhóm đó',
  'Answers shown': 'Đã xem đáp án',
  'In progress': 'Đang làm',
  Continue: 'Tiếp tục',
  'Not started': 'Chưa bắt đầu',
  Start: 'Bắt đầu',
  'Activities completed': 'Hoạt động đã hoàn thành',
  'Every activity in this chapter is completed.': 'Bạn đã hoàn thành mọi hoạt động trong chương này.',
  ' Practise again any time; your Knowledge Check results stay as they are.': ' Bạn có thể luyện tập lại bất cứ lúc nào; kết quả Kiểm tra kiến thức vẫn được giữ nguyên.',
  'No Match & Sort activities are open here yet.': 'Chưa có hoạt động Ghép & Phân loại nào được mở ở đây.',
  'Match & Sort activities': 'Các hoạt động Ghép & Phân loại',
};

export const uiVocabularySize = () => Object.keys(VI).length;

export function uiText(english: string): string {
  return readLearningLanguage() === 'vi' ? VI[english] ?? english : english;
}

export function uiIsVietnamese(): boolean {
  return readLearningLanguage() === 'vi';
}

/** Re-renders the calling component when the learner switches EN | VI (for components outside the reader). */
export function useUiLanguage() {
  return useLearningLanguage()[0];
}

const vi = () => readLearningLanguage() === 'vi';

export const uiChapterOf = (number: number, total: number) => (vi() ? `Chương ${number}/${total}` : `Chapter ${number} of ${total}`);
export const uiKnowledgeCheckNumber = (number: number) => (vi() ? `Kiểm tra kiến thức ${number}` : `Knowledge Check ${number}`);
export const uiCountOf = (value: number, total: number) => (vi() ? `${value}/${total}` : `${value} of ${total}`);
export const uiChecksToGo = (remaining: number) => (vi() ? `Còn ${remaining} bài kiểm tra` : `${remaining} ${remaining === 1 ? 'check' : 'checks'} to go`);
export const uiQuestionPosition = (number: number, total: number, answered: number) => (vi() ? `Câu ${number}/${total} · đã trả lời ${answered}` : `Question ${number} of ${total} · ${answered} answered`);
export const uiAnswerAll = (total: number) => (vi() ? `Hãy trả lời cả ${total} câu để nộp bài.` : `Answer all ${total} questions to submit.`);
export const uiMovingToQuestion = (number: number, total: number) => (vi() ? `Đã ghi nhận câu trả lời. Đang chuyển sang câu ${number}/${total}…` : `Answer recorded. Moving to question ${number} of ${total}…`);
export const uiGoToQuestion = (number: number) => (vi() ? `Đến câu ${number}` : `Go to question ${number}`);
export const uiQuestionDot = (number: number, answered: boolean) => (vi() ? `Câu ${number}, ${answered ? 'đã trả lời' : 'chưa trả lời'}` : `Question ${number}${answered ? ', answered' : ', not answered'}`);
export const uiReviewQuestion = (number: number, correct: boolean) => (vi() ? `Câu ${number} · ${correct ? 'Đúng' : 'Chưa đúng'}` : `Question ${number} · ${correct ? 'Correct' : 'Incorrect'}`);
export const uiScoreLine = (correct: number, total: number) => (vi() ? `${correct}/${total} câu đúng` : `${correct} of ${total} correct`);
export const uiEarlierAttempt = (accuracy: number) => (vi() ? `${accuracy}% ở lần làm trước` : `${accuracy}% on an earlier attempt`);
export const uiUnlocked = (label: string) => (vi() ? `${label} đã được mở khóa.` : `${label} is now unlocked.`);
export const uiLessonCount = (count: number) => (vi() ? `${count} bài học` : `${count} ${count === 1 ? 'lesson' : 'lessons'}`);
export const uiNextTitle = (title: string) => (vi() ? `Tiếp theo: ${title}` : `Next: ${title}`);

// Practice & Review --------------------------------------------------------------------------------------

export const uiChapterLabel = (number: number, title: string) => (vi() ? `Chương ${number}: ${title}` : `Chapter ${number}: ${title}`);
/** scheduler.formatInterval output ("5 min", "2 hr", "3 days", "2 mo"). */
export const uiInterval = (text: string) => (vi()
  ? text.replace(/^(\d+) min$/, '$1 phút').replace(/^(\d+) hr$/, '$1 giờ').replace(/^(\d+) days?$/, '$1 ngày').replace(/^(\d+) mo$/, '$1 tháng')
  : text);
export const uiCardAria = (flipped: boolean, text: string) => {
  if (vi()) return flipped ? `Đáp án: ${text}. Chọn thẻ để xem lại câu hỏi.` : `Câu hỏi: ${text}. Chọn thẻ để xem đáp án.`;
  return flipped ? `Answer: ${text}. Select the card to see the question again.` : `Question: ${text}. Select the card to see the answer.`;
};
export const uiAcceptedSynonym = (synonym: string, term: string) => (vi()
  ? ` \u201c${synonym}\u201d được chấp nhận; thuật ngữ trong chương là \u201c${term}\u201d.`
  : ` \u201c${synonym}\u201d is accepted; the chapter\u2019s term is \u201c${term}\u201d.`);
export const uiRatingAria = (label: string, next: string | null) => {
  if (!next) return label;
  return vi() ? `${label}, lần ôn tiếp theo sau ${next}` : `${label}, next review in ${next}`;
};
export const uiRatedNote = (label: string) => (vi() ? `Đã đánh giá \u201c${label}\u201d trong phiên này.` : `Rated ${label} in this session.`);
export const uiRatedAnnouncement = (label: string, timing: string, shownAgain: boolean) => (vi()
  ? `Đã đánh giá ${label}.${timing ? ` Lần ôn tiếp theo sau ${timing}.` : ''}${shownAgain ? ' Thẻ này sẽ xuất hiện lại sau trong phiên này.' : ''}`
  : `Rated ${label}.${timing ? ` Next review in ${timing}.` : ''}${shownAgain ? ' This card will come back later in this session.' : ''}`);
export const uiCardPosition = (position: number, total: number) => (vi() ? `Thẻ ${position}/${total}` : `Card ${position} of ${total}`);
export const uiCardsViewedRated = (viewed: number | undefined, rated: number) => (vi()
  ? `${viewed !== undefined ? `đã xem ${viewed} · ` : ''}đã đánh giá ${rated}`
  : `${viewed !== undefined ? `${viewed} viewed · ` : ''}${rated} rated`);
export const uiCardsRated = (rated: number, total: number, inChapter: boolean, due: number, industryTotal: number | null, industryLabel: string) => {
  if (vi()) return `Đã đánh giá ${rated}/${total} thẻ${inChapter ? ' trong chương này' : ''}${due ? ` · ${due} thẻ cần ôn` : ''}${industryTotal === null ? '' : ` · tổng ${industryTotal} thẻ trong ${industryLabel}`}`;
  return `${rated} of ${total} cards rated${inChapter ? ' in this chapter' : ''}${due ? ` · ${due} due for review` : ''}${industryTotal === null ? '' : ` · ${industryTotal} across ${industryLabel}`}`;
};
export const uiCardsLocked = (count: number) => (vi()
  ? `Còn ${count} thẻ sẽ mở khi bạn hoàn thành các chương trước trong bài học này.`
  : `${count} more ${count === 1 ? 'card opens' : 'cards open'} as you complete earlier chapters in this lesson.`);
export const uiActivitiesCompleted = (completed: number, total: number, inChapter = false) => (vi()
  ? `Đã hoàn thành ${completed}/${total} hoạt động${inChapter ? ' trong chương này' : ''}`
  : `${completed} of ${total} ${total === 1 ? 'activity' : 'activities'} completed${inChapter ? ' in this chapter' : ''}`);
export const uiActivitiesLocked = (count: number, chapterOnly?: boolean) => (vi()
  ? `Còn ${count} hoạt động sẽ mở khi bạn hoàn thành các chương trước trong ${chapterOnly ? 'bài học' : 'học phần'} này.`
  : `${count} more ${count === 1 ? 'activity opens' : 'activities open'} as you complete earlier chapters in this ${chapterOnly ? 'lesson' : 'module'}.`);
export const uiDueSubtitle = (due: number) => (vi() ? `Không bắt buộc · ${due} thẻ đến hạn` : `Optional · ${due} ${due === 1 ? 'card' : 'cards'} due`);
export const uiOptionalSubtitle = (modes: string) => (vi() ? `Không bắt buộc · ${modes}` : `Optional · ${modes}`);
export const uiLearningModes = (count: number) => (vi() ? `${count} cách học` : `${count} learning modes`);
export const uiModeUnavailable = (mode: string, chapter: string) => (vi()
  ? `${mode} chưa có nội dung mở cho ${chapter}. Hãy chọn chương khác trong Lộ trình học, hoặc chọn cách học khác cho chương này.`
  : `${mode} has nothing open for ${chapter} right now. Pick another chapter in the Learning Journey, or choose another way to learn this chapter.`);
export const uiActivityProgress = (title: string) => (vi() ? `Tiến độ: ${title}` : `${title} progress`);
export const uiCheckNumber = (attempt: number) => (vi() ? `Lần kiểm tra ${attempt}` : `Check ${attempt}`);

// Match & Sort feedback (engine.buildFeedback / progressOf) ---------------------------------------------

export const uiCorrectCount = (correct: number, total: number) => (vi() ? `${correct}/${total} đúng` : `${correct} of ${total} correct`);
export const uiPairedCount = (done: number, total: number) => (vi() ? `Đã ghép ${done}/${total}` : `${done} of ${total} paired`);
export const uiPlacedCount = (done: number, total: number) => (vi() ? `Đã xếp ${done}/${total}` : `${done} of ${total} placed`);
export const uiStepsArranged = (total: number) => (vi() ? `Đã sắp xếp ${total} bước` : `${total} steps arranged`);
export const uiNotMatched = (prompt: string, chosen: string) => (vi() ? `${prompt} không ghép với ${chosen}` : `${prompt} is not matched to ${chosen}`);
export const uiNotInGroup = (item: string, group: string) => (vi() ? `${item} không thuộc nhóm ${group}` : `${item} does not belong in ${group}`);
export const uiOutOfPlace = (position: number, step: string) => (vi() ? `Vị trí ${position}: ${step} chưa đúng chỗ` : `Position ${position}: ${step} is out of place`);
