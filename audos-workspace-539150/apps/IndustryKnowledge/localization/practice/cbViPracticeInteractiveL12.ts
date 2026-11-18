import type { ViFlashcard } from './cbViPracticeTypes';
import { CB_VI_FLASHCARDS_L12 } from './cbViPracticeFlashcardsL12';

// Interactive cards reuse the practical example and key terms of the authored card they restate.
const basedOn = (id: string) => ({ example: CB_VI_FLASHCARDS_L12[id].example, terms: CB_VI_FLASHCARDS_L12[id].terms });

// Vietnamese text for the Commercial Banking lesson 1.2 interactive cards
// (apps/InteractiveLearning/flashcards/decks/interactiveCommercialBanking.ts), keyed by card id.
// Multiple choice keeps the English option ids and correct id. Fill in the blank has an authored Vietnamese
// answer and an explicit synonym list (including the unaccented spelling a learner may type); there is no
// fuzzy matching, and no prompt contains its answer.

export const CB_VI_INTERACTIVE_L12: Record<string, ViFlashcard> = {
  'cb12-mcq-commercial-bank-role': {
    ...basedOn('cb12-central-vs-commercial-bank'),
    en: 'In the chapter’s distinction between the two institutions, which role belongs to a commercial bank rather than a central bank?',
    front: 'Theo cách chương học phân biệt hai loại định chế, vai trò nào thuộc về ngân hàng thương mại chứ không phải ngân hàng trung ương?',
    back: 'Phục vụ khách hàng và chấp nhận rủi ro tín dụng thương mại',
    explanation: 'Ngân hàng trung ương hỗ trợ tiền tệ, chính sách và ổn định hệ thống, và có thể đóng vai trò người cho vay cuối cùng. Ngân hàng thương mại phục vụ khách hàng và chấp nhận rủi ro tín dụng thương mại: ngân hàng quyết định có cho một người vay vay hay không và với mức giá nào.',
    options: {
      a: 'Hỗ trợ tiền tệ, chính sách và ổn định hệ thống',
      b: 'Phục vụ khách hàng và chấp nhận rủi ro tín dụng thương mại',
      c: 'Cung cấp thanh khoản khẩn cấp cho các tổ chức đủ điều kiện',
    },
  },
  'cb12-fill-lender-of-last-resort': {
    ...basedOn('cb12-lender-of-last-resort'),
    en: 'When a central bank provides emergency liquidity to eligible institutions under defined conditions, it is acting as the ____.',
    front: 'Khi ngân hàng trung ương cung cấp thanh khoản khẩn cấp cho các tổ chức đủ điều kiện theo những điều kiện xác định, ngân hàng trung ương đang đóng vai trò ____.',
    back: 'Khi ngân hàng trung ương cung cấp thanh khoản khẩn cấp cho các tổ chức đủ điều kiện theo những điều kiện xác định, ngân hàng trung ương đang đóng vai trò người cho vay cuối cùng.',
    explanation: 'Vai trò người cho vay cuối cùng hình thành vì quy mô khiến ngân hàng mang tính hệ thống hơn: một sự đổ vỡ có thể lan sang người gửi tiền, hoạt động thanh toán và tín dụng trên toàn hệ thống.',
    answer: 'người cho vay cuối cùng',
    acceptedAnswers: ['nguoi cho vay cuoi cung', 'người cho vay sau cùng', 'nguoi cho vay sau cung', 'LOLR', 'lender of last resort'],
  },
  'cb12-mcq-insolvent-bank': {
    ...basedOn('cb12-liquidity-vs-solvency'),
    en: 'A bank’s loan losses have grown larger than its capital. According to the chapter, why will emergency liquidity lending not fix the problem?',
    front: 'Tổn thất cho vay của một ngân hàng đã lớn hơn vốn của ngân hàng đó. Theo chương học, vì sao cho vay thanh khoản khẩn cấp sẽ không giải quyết được vấn đề?',
    back: 'Cho ngân hàng vay thêm không xóa được những tổn thất đã vượt quá vốn của nó',
    explanation: 'Hỗ trợ thanh khoản phù hợp với một ngân hàng còn khả năng thanh toán đang đối mặt với làn sóng rút tiền tạm thời. Một ngân hàng mất khả năng thanh toán có tổn thất lớn hơn vốn của mình, vì vậy biện pháp ứng phó phải là tái cấp vốn, tái cơ cấu hoặc xử lý đổ vỡ.',
    options: {
      a: 'Cho ngân hàng vay thêm không xóa được những tổn thất đã vượt quá vốn của nó',
      b: 'Vấn đề của ngân hàng là làn sóng rút tiền tạm thời, thứ chỉ vốn mới mới đáp ứng được',
      c: 'Hoạt động giám sát, chứ không phải vốn, là biện pháp bảo vệ hấp thụ tổn thất',
      d: 'Hỗ trợ thanh khoản chỉ dành cho những ngân hàng đã được xử lý đổ vỡ',
    },
  },
  'cb12-fill-capital-absorbs-losses': {
    ...basedOn('cb12-safeguard-failure-channels'),
    en: 'In the chapter’s map of safeguards, ____ absorbs losses, while liquid assets meet stressed outflows.',
    front: 'Trong bản đồ các biện pháp bảo vệ của chương, ____ hấp thụ tổn thất, còn tài sản thanh khoản đáp ứng dòng tiền rút ra trong điều kiện căng thẳng.',
    back: 'Trong bản đồ các biện pháp bảo vệ của chương, vốn hấp thụ tổn thất, còn tài sản thanh khoản đáp ứng dòng tiền rút ra trong điều kiện căng thẳng.',
    explanation: 'Mỗi biện pháp bảo vệ xử lý một kênh đổ vỡ khác nhau: vốn hấp thụ tổn thất, tài sản thanh khoản đáp ứng dòng tiền rút ra trong điều kiện căng thẳng, giám sát phát hiện sự suy giảm và kế hoạch xử lý đổ vỡ duy trì các chức năng thiết yếu.',
    answer: 'vốn',
    acceptedAnswers: ['von', 'vốn ngân hàng', 'von ngan hang', 'vốn theo quy định', 'von theo quy dinh', 'capital'],
  },
  'cb12-mcq-digital-advantage': {
    ...basedOn('cb12-digital-competitive-shift'),
    en: 'According to the chapter, where does digital banking shift a bank’s competitive advantage?',
    front: 'Theo chương học, ngân hàng số chuyển lợi thế cạnh tranh của ngân hàng sang đâu?',
    back: 'Sang dữ liệu, độ tin cậy, an ninh mạng và khả năng phối hợp xuyên biên giới',
    explanation: 'Phân phối số giảm chi phí và mở rộng phạm vi tiếp cận, nên ngân hàng được đánh giá qua dữ liệu, độ tin cậy, an ninh mạng và khả năng phối hợp vận hành xuyên biên giới. Nó không loại bỏ kinh tế học về nguồn vốn, vốn chủ sở hữu và rủi ro tín dụng của hoạt động cho vay.',
    options: {
      a: 'Sang mạng lưới chi nhánh dày đặc hơn và giờ mở cửa dài hơn cho khách hàng',
      b: 'Sang nhu cầu vốn thấp hơn cho các khoản vay chỉ được cung cấp qua kênh số',
      c: 'Sang dữ liệu, độ tin cậy, an ninh mạng và khả năng phối hợp xuyên biên giới',
      d: 'Sang những bảng cân đối không còn ràng buộc về nguồn vốn và rủi ro tín dụng',
    },
  },
  'cb12-fill-correspondent-banking': {
    ...basedOn('cb12-correspondent-banking'),
    en: '____ is a relationship through which one bank provides cross-border or currency services for another.',
    front: '____ là quan hệ trong đó một ngân hàng cung cấp dịch vụ xuyên biên giới hoặc dịch vụ ngoại tệ cho một ngân hàng khác.',
    back: 'Ngân hàng đại lý là quan hệ trong đó một ngân hàng cung cấp dịch vụ xuyên biên giới hoặc dịch vụ ngoại tệ cho một ngân hàng khác.',
    explanation: 'Các ngân hàng quốc tế kết hợp giấy phép tại từng nước với mạng lưới ngân quỹ, ngân hàng đại lý và tài trợ thương mại toàn cầu, nhờ đó một ngân hàng có thể quyết toán một khoản thanh toán xuyên biên giới mà không cần chi nhánh riêng ở nước ngoài.',
    answer: 'Ngân hàng đại lý',
    acceptedAnswers: ['ngan hang dai ly', 'quan hệ ngân hàng đại lý', 'quan he ngan hang dai ly', 'correspondent banking'],
  },
  'cb12-mcq-two-tier-reform': {
    ...basedOn('cb12-mono-vs-two-tier'),
    en: 'What did Vietnam’s move from a mono-tier to a two-tier banking system change?',
    front: 'Việc Việt Nam chuyển từ hệ thống ngân hàng một cấp sang hai cấp đã thay đổi điều gì?',
    back: 'Tách chức năng chính sách và giám sát của ngân hàng trung ương khỏi hoạt động ngân hàng thương mại',
    explanation: 'Trong hệ thống một cấp, NHNN đảm nhận cả chức năng ngân hàng trung ương lẫn ngân hàng thương mại. Cải cách hai cấp đã tách chính sách và giám sát khỏi hoạt động ngân hàng thương mại, nhờ đó ngân hàng có vốn nhà nước chi phối và ngân hàng TMCP có thể xây dựng mảng kinh doanh khách hàng riêng.',
    options: {
      a: 'Gộp vai trò chính sách của NHNN với hoạt động cho vay khách hàng vào cùng một định chế',
      b: 'Loại hoàn toàn các ngân hàng có vốn nhà nước chi phối khỏi hệ thống ngân hàng',
      c: 'Chấm dứt việc ngân hàng trung ương giám sát các ngân hàng TMCP',
      d: 'Tách chức năng chính sách và giám sát của ngân hàng trung ương khỏi hoạt động ngân hàng thương mại',
    },
  },
  'cb12-fill-joint-stock-category': {
    ...basedOn('cb12-vietnam-bank-categories'),
    en: 'The official SBV taxonomy of commercial banks includes state-owned, ____, wholly foreign-owned and joint-venture banks.',
    front: 'Phân loại chính thức của NHNN về ngân hàng thương mại gồm ngân hàng thương mại nhà nước, ngân hàng thương mại ____, ngân hàng 100% vốn nước ngoài và ngân hàng liên doanh.',
    back: 'Phân loại chính thức của NHNN về ngân hàng thương mại gồm ngân hàng thương mại nhà nước, ngân hàng thương mại cổ phần, ngân hàng 100% vốn nước ngoài và ngân hàng liên doanh.',
    explanation: 'Bốn loại hình mô tả hình thức sở hữu và tổ chức. Ngân hàng TMCP được tổ chức dưới hình thức công ty cổ phần và thường cạnh tranh quyết liệt ở mảng bán lẻ, ngân hàng số và dịch vụ thu phí.',
    answer: 'cổ phần',
    acceptedAnswers: ['co phan', 'TMCP', 'joint-stock'],
  },
};
