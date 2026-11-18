import { readLearningLanguage } from '../learningLanguage';

// Vietnamese navigation copy for Commercial Banking: module cards, lesson cards and the reader's lesson
// heading. Lesson codes and English titles stay the keys of decks, quizzes, notes and progress; this file
// only supplies display text, and each entry names the English title it translates so a renamed lesson
// falls back to English instead of showing an outdated label.

interface ViLessonCopy {
  en: string;
  title: string;
  subtitle: string;
  description: string;
}

export const CB_VI_LESSONS: Record<string, ViLessonCopy> = {
  '1.1': { en: 'Industry Definition & Scope', title: 'Định nghĩa & phạm vi ngành', subtitle: 'Ngân hàng thương mại làm gì', description: 'Hiểu về trung gian tài chính, sản phẩm ngân hàng, ranh giới ngành và những khách hàng mà ngân hàng phục vụ.' },
  '1.2': { en: 'Industry History & Development', title: 'Lịch sử & quá trình phát triển ngành', subtitle: 'Từ ngân hàng truyền thống đến ngân hàng số', description: 'Khám phá các định chế ngân hàng, quy định tài chính và công nghệ số đã định hình ngân hàng hiện đại như thế nào.' },
  '1.3': { en: 'Global Market Overview', title: 'Tổng quan thị trường toàn cầu', subtitle: 'Quy mô, hiệu quả hoạt động và ổn định tài chính', description: 'Khám phá các thị trường ngân hàng lớn, chỉ số tài chính, các định chế toàn cầu và rủi ro hệ thống.' },
  '1.4': { en: 'Vietnam Market Overview', title: 'Tổng quan thị trường Việt Nam', subtitle: 'Hệ thống ngân hàng Việt Nam và các bên chủ chốt', description: 'Hiểu cấu trúc ngân hàng Việt Nam, các định chế lớn, thị trường tín dụng và quá trình chuyển đổi số.' },
  '1.5': { en: 'Industry Drivers & External Factors', title: 'Động lực ngành & yếu tố bên ngoài', subtitle: 'Những lực lượng định hình ngành ngân hàng', description: 'Khám phá điều kiện kinh tế, quy định, công nghệ và hành vi khách hàng tác động đến ngân hàng như thế nào.' },
  '2.1': { en: 'Value Chain Overview', title: 'Tổng quan chuỗi giá trị', subtitle: 'Dòng tiền và rủi ro chảy qua ngân hàng như thế nào', description: 'Theo dõi dòng vốn huy động, cho vay, dịch vụ tài chính và rủi ro trong hệ thống ngân hàng thương mại.' },
  '2.2': { en: 'Upstream Activities', title: 'Hoạt động thượng nguồn', subtitle: 'Tiền gửi, CASA và chi phí vốn', description: 'Hiểu cách ngân hàng huy động vốn, quản lý chi phí tiền gửi và duy trì thanh khoản.' },
  '2.3': { en: 'Midstream Activities', title: 'Hoạt động trung nguồn', subtitle: 'Cho vay, rủi ro tín dụng và chất lượng khoản vay', description: 'Khám phá thẩm định cho vay, năm nhóm nợ tại Việt Nam, nợ xấu, trích lập dự phòng và thu hồi nợ.' },
  '2.4': { en: 'Downstream Activities', title: 'Hoạt động hạ nguồn', subtitle: 'Kênh ngân hàng và quan hệ khách hàng', description: 'Tìm hiểu cách ngân hàng cung cấp dịch vụ qua chi nhánh, chuyên viên quan hệ khách hàng và kênh số.' },
  '2.5': { en: 'Inputs, Outputs & Value Creation', title: 'Đầu vào, đầu ra & tạo lập giá trị', subtitle: 'NIM, kinh tế học ngân hàng và khả năng sinh lời', description: 'Hiểu cách thu nhập lãi, chi phí vốn, chi phí hoạt động và rủi ro tín dụng quyết định khả năng sinh lời của ngân hàng.' },
  '2.6': { en: 'Global vs. Local Value Chain', title: 'Chuỗi giá trị toàn cầu và trong nước', subtitle: 'Ngân hàng toàn cầu và mô hình vận hành tại Việt Nam', description: 'So sánh hoạt động, quy định, cơ cấu nguồn vốn và ổn định tài chính của ngân hàng toàn cầu và ngân hàng Việt Nam.' },
  '3.1': { en: 'Industry Business Models', title: 'Mô hình kinh doanh của ngành', subtitle: 'Mô hình dựa vào tín dụng và mô hình dựa vào phí', description: 'Tách bạch cỗ máy dựa vào tín dụng và cỗ máy dựa vào phí; so sánh các mô hình bán lẻ, doanh nghiệp, đa năng, chuyên biệt và ưu tiên số.' },
  '3.2': { en: 'Products, Services & Segmentation', title: 'Sản phẩm, dịch vụ & phân khúc', subtitle: 'Sản phẩm, nhu cầu khách hàng và lợi nhuận theo phân khúc', description: 'Gắn sản phẩm với nhu cầu khách hàng, phân loại đúng thu nhập và xây dựng khả năng sinh lời theo phân khúc và sản phẩm.' },
  '3.3': { en: 'Customer Segments & Needs', title: 'Phân khúc & nhu cầu khách hàng', subtitle: 'Nhu cầu khách hàng, mô hình phục vụ và giá trị vòng đời', description: 'Hiểu các nhóm khách hàng, nhu cầu, mô hình phục vụ và kinh tế học của mối quan hệ trong suốt vòng đời.' },
  '3.4': { en: 'Revenue Streams & Cost Structure', title: 'Nguồn doanh thu & cơ cấu chi phí', subtitle: 'NII, NIM và báo cáo kết quả kinh doanh của ngân hàng', description: 'Tính NII và NIM, theo dõi thác lợi nhuận trên báo cáo kết quả kinh doanh và đọc đúng báo cáo tài chính ngân hàng.' },
  '3.5': { en: 'Distribution & Sales Channels', title: 'Kênh phân phối & bán hàng', subtitle: 'Hành trình đa kênh và chi phí phục vụ', description: 'Thiết kế hành trình đa kênh và đánh giá chi phí thu hút khách hàng (CAC), chi phí phục vụ, tỷ lệ giữ chân và giá trị mối quan hệ.' },
  '3.6': { en: 'Industry Ecosystem & Stakeholders', title: 'Hệ sinh thái & các bên liên quan', subtitle: 'Ổn định tài chính và bảo hiểm tiền gửi', description: 'Phác họa hệ sinh thái, các tương tác về ổn định tài chính và ranh giới đã được kiểm chứng của bảo hiểm tiền gửi.' },
  '4.1': { en: 'Industry Competition Structure', title: 'Cấu trúc cạnh tranh của ngành', subtitle: 'Cạnh tranh, Năm áp lực và lợi thế bền vững của ngân hàng', description: 'Phác họa sự cạnh tranh giữa các ngân hàng, áp dụng mô hình Năm áp lực cạnh tranh và hiểu vì sao niềm tin, nguồn vốn và vốn chủ sở hữu khó sao chép.' },
  '4.2': { en: 'Key Industry Players', title: 'Các đối thủ chính trong ngành', subtitle: 'So sánh ngân hàng toàn cầu và Việt Nam', description: 'Phân tích ngân hàng toàn cầu và Việt Nam theo mô hình, phạm vi và bằng chứng mà không đưa ra bảng xếp hạng thiếu căn cứ.' },
  '4.3': { en: 'Competitor Benchmarking', title: 'So sánh đối chuẩn đối thủ', subtitle: 'Đối chuẩn ngân hàng theo mười bốn chỉ số', description: 'Xây dựng bộ đối chuẩn mười bốn chỉ số, giữ nguyên các trường Chưa kiểm chứng dữ liệu và diễn giải các đánh đổi.' },
  '4.4': { en: 'Key Success Factors', title: 'Yếu tố thành công then chốt', subtitle: 'Những năng lực quyết định kết quả của ngân hàng', description: 'Liên kết nguồn vốn, chất lượng tài sản, vốn, hiệu quả, kênh phân phối, đổi mới và niềm tin với kết quả kinh doanh.' },
  '4.5': { en: 'SWOT & Strategic Challenges', title: 'SWOT & thách thức chiến lược', subtitle: 'SWOT dựa trên bằng chứng và ứng phó rủi ro', description: 'Xây dựng SWOT dựa trên bằng chứng, theo dõi các rủi ro cộng hưởng và thiết kế biện pháp ứng phó kèm ngưỡng kiểm soát KPI.' },
  '5.1': { en: 'Consumer Trends', title: 'Xu hướng khách hàng', subtitle: 'Hành vi ưu tiên số, niềm tin và nhu cầu mới', description: 'Xem kỳ vọng thay đổi của hộ gia đình, SME và doanh nghiệp định hình lại sản phẩm, hành trình và kinh tế học ngân hàng như thế nào.' },
  '5.2': { en: 'Technology & Innovation Trends', title: 'Xu hướng công nghệ & đổi mới', subtitle: 'Mô hình vận hành, AI được quản trị và hệ sinh thái mở', description: 'Liên kết các lựa chọn công nghệ với trải nghiệm khách hàng, chi phí, khả năng mở rộng, rủi ro và trách nhiệm giải trình.' },
  '5.3': { en: 'Market & Channel Trends', title: 'Xu hướng thị trường & kênh phân phối', subtitle: 'Phân phối qua di động, kênh kết hợp và hệ sinh thái', description: 'Hiểu các kênh phân phối và kinh tế học quan hệ khách hàng đang thay đổi thế nào trên thế giới và tại Việt Nam.' },
  '5.4': { en: 'Regulatory & Sustainability Trends', title: 'Xu hướng pháp lý & phát triển bền vững', subtitle: 'Quy định an toàn, bảo vệ người gửi tiền và tài chính bền vững', description: 'Đang được rà soát — các chi tiết pháp lý và quy định trong bài học này đang được kiểm chứng với văn bản gốc.' },
  '5.5': { en: 'Growth Outlook & Strategic Opportunities', title: 'Triển vọng tăng trưởng & cơ hội chiến lược', subtitle: 'Triển vọng điều chỉnh theo rủi ro và lựa chọn chiến lược', description: 'Diễn giải bằng chứng về triển vọng và thực hành các quyết định gắn kết giữa tăng trưởng, nguồn vốn, rủi ro, hiệu quả và vốn.' },
};

export const CB_VI_MODULES: Record<string, { primaryTitle: string; subtitle: string; description: string; learningPath: (count: number) => string }> = {
  '01': {
    primaryTitle: 'Bối cảnh ngành', subtitle: 'Ngành vận hành như thế nào',
    description: 'Hiểu ngân hàng thương mại bao gồm những gì, đã phát triển ra sao và những lực lượng nào đang định hình các ngân hàng hiện nay.',
    learningPath: (count) => `Khám phá ${count} bài học để xây dựng hiểu biết toàn diện về nền tảng của ngân hàng thương mại.`,
  },
  '02': {
    primaryTitle: 'Chuỗi giá trị', subtitle: 'Giá trị dịch chuyển trong ngành như thế nào',
    description: 'Hiểu cách ngân hàng huy động vốn, cấp tín dụng, cung cấp dịch vụ tài chính và quản trị rủi ro để tạo ra giá trị.',
    learningPath: (count) => `Khám phá ${count} bài học để theo dõi dòng tiền và rủi ro dịch chuyển trong ngân hàng thương mại, từ tiền gửi và nguồn vốn đến cho vay, cung cấp dịch vụ và khả năng sinh lời.`,
  },
  '03': {
    primaryTitle: 'Mô hình kinh doanh & kinh tế học', subtitle: 'Doanh nghiệp kiếm tiền như thế nào',
    description: 'Khám phá cách ngân hàng tạo ra thu nhập lãi và thu nhập phí, phục vụ các phân khúc khách hàng và chuyển doanh thu thành lợi nhuận sau chi phí và rủi ro tín dụng.',
    learningPath: (count) => `Khám phá ${count} bài học về mô hình kinh doanh, nguồn doanh thu và cơ cấu chi phí đằng sau khả năng sinh lời của ngân hàng thương mại.`,
  },
  '04': {
    primaryTitle: 'Bối cảnh cạnh tranh', subtitle: 'Ai cạnh tranh và vì sao họ thắng',
    description: 'Hiểu ai cạnh tranh để giành tiền gửi, khoản vay và quan hệ khách hàng, cùng những năng lực giúp ngân hàng chiến thắng.',
    learningPath: (count) => `Khám phá ${count} bài học về cấu trúc cạnh tranh, các ngân hàng chủ chốt, đối chuẩn, yếu tố thành công và thách thức chiến lược trong ngân hàng thương mại.`,
  },
  '05': {
    primaryTitle: 'Xu hướng & triển vọng', subtitle: 'Điều gì đang thay đổi tiếp theo',
    description: 'Khám phá những thay đổi về khách hàng, công nghệ, kênh phân phối, quy định, phát triển bền vững, cơ hội tăng trưởng và các đánh đổi chiến lược đang định hình ngân hàng thương mại.',
    learningPath: (count) => `Khám phá ${count} bài học về các xu hướng khách hàng, công nghệ, kênh phân phối, pháp lý và tăng trưởng đang định hình ngân hàng thương mại.`,
  },
};

const LESSON_CODE = /^(\d+\.\d+)\s+(.*)$/;

/** Vietnamese card copy for a Commercial Banking lesson title such as "1.1 Industry Definition & Scope", or undefined in English or when the title no longer matches. */
export function cbViLessonCopy(lessonTitle: string | undefined): ViLessonCopy | undefined {
  if (readLearningLanguage() !== 'vi' || !lessonTitle) return undefined;
  const match = lessonTitle.match(LESSON_CODE);
  const copy = match ? CB_VI_LESSONS[match[1]] : undefined;
  return copy && copy.en === match?.[2] ? copy : undefined;
}

/** "1.2 Industry History & Development" → "1.2 Lịch sử & quá trình phát triển ngành" in Vietnamese; unchanged otherwise. */
export function cbViLessonLabel(lessonTitle: string): string {
  const copy = cbViLessonCopy(lessonTitle);
  const code = lessonTitle.match(LESSON_CODE)?.[1];
  return copy && code ? `${code} ${copy.title}` : lessonTitle;
}

export function cbViModuleCopy(industryId: string | undefined, moduleNumber: string | undefined) {
  if (industryId !== 'banking-commercial' || readLearningLanguage() !== 'vi' || !moduleNumber) return undefined;
  return CB_VI_MODULES[moduleNumber];
}
