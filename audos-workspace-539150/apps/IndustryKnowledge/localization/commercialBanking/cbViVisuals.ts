import type { ViVisualSpec } from '../visualLocalization';
import { CB_VI_VISUALS_M02 } from './cbViVisualsM02';
import { CB_VI_VISUALS_M04 } from './cbViVisualsM04';
import { CB_VI_VISUALS_M05 } from './cbViVisualsM05';

// Vietnamese Learning Visual text for Commercial Banking, keyed by visualKind (commercialBankingM0xVisualSpecs.ts).
// Text only: layout, kinds, tones and numbers come from the English spec (see visualLocalization.ts). Terminology
// follows viTerminology.ts. A kind without an entry here keeps its English diagram.

const CB_VI_VISUALS_M01: Record<string, ViVisualSpec> = {
  'cb-m1-11-01-core': {
    enTitle: 'What Is Commercial Banking?',
    spec: {
      title: 'Ngân hàng thương mại là gì?',
      steps: [
        { label: 'Người gửi tiền cấp vốn cho ngân hàng', detail: 'Hộ gia đình và doanh nghiệp nắm giữ tiền gửi thanh toán, tiết kiệm và có kỳ hạn; đây là các khoản nợ phải trả của ngân hàng' },
        { label: 'Ngân hàng gom vốn và thẩm định', detail: 'Người gửi tiền không cần tự đánh giá từng người vay; ngân hàng gánh và định giá rủi ro đó' },
        { label: 'Khoản vay và tiền gửi được tạo ra cùng lúc', detail: 'Khi phê duyệt, nghĩa vụ của người vay được ghi nhận là tài sản và ngân hàng ghi có một khoản tiền gửi tương ứng' },
        { label: 'Tiền luân chuyển qua thanh toán', detail: 'Người vay chi tiêu và đầu tư; khách hàng giao dịch chuyển tiền trên hạ tầng của ngân hàng' },
        { label: 'Chỉ có lợi nhuận khi thu nhập bù đắp chi phí', detail: 'Thu nhập lãi và phí phải vượt chi phí vốn, chi phí hoạt động và tổn thất tín dụng' },
      ],
      note: 'Vốn, các quy định về thanh khoản và chính sách của ngân hàng trung ương ràng buộc mọi bước. Khoảng 87% người trưởng thành Việt Nam có tài khoản thanh toán vào năm 2024 (nguồn thứ cấp trích dẫn NHNN); đây là chỉ số về độ phủ, không phải thước đo khả năng sinh lời.',
      takeaway: 'Ngân hàng thương mại chuyển tiền gửi thành tín dụng và dịch vụ thanh toán trên cùng một bảng cân đối được quản lý, đồng thời gánh rủi ro giữa người gửi tiền và người vay.',
    },
  },
  'cb-m1-11-02-unique': {
    enTitle: 'What Makes Commercial Banking Unique?',
    spec: {
      title: 'Điều gì làm ngân hàng thương mại khác biệt?',
      leftTitle: 'Chuyển hóa trên bảng cân đối',
      rightTitle: 'Biện pháp bảo vệ phải đi kèm',
      rows: [
        { label: 'Chuyển hóa thanh khoản', a: 'Tiền gửi vẫn có thể rút bất cứ lúc nào trong khi khoản vay không thể chuyển ngay thành tiền mặt', b: 'Tài sản thanh khoản đủ đáp ứng dòng tiền ra' },
        { label: 'Chuyển hóa kỳ hạn', a: 'Nguồn vốn ngắn hạn tài trợ cho các khoản vay dài hạn hơn', b: 'Yêu cầu thanh khoản trong kịch bản căng thẳng và giám sát hoạt động chấp nhận rủi ro' },
        { label: 'Đòn bẩy', a: 'Tài sản được tài trợ chủ yếu bằng tiền gửi và vốn vay, vốn chủ sở hữu nằm bên dưới', b: 'Vốn hấp thụ tổn thất; tỷ lệ tổng vốn tối thiểu theo Basel là 8% tài sản có rủi ro' },
        { label: 'Niềm tin của người gửi tiền', a: 'Một cú sốc niềm tin có thể kích hoạt làn sóng rút tiền nhanh hơn tốc độ thu hồi nợ vay', b: 'Cấp phép và giám sát an toàn, chẳng hạn như của NHNN tại Việt Nam' },
      ],
      note: 'Mức 8% là sàn pháp lý trước các bộ đệm vốn, không phải vốn chủ sở hữu kế toán chia cho tổng tài sản. Quy định trong nước của Việt Nam khác với toàn bộ khuôn khổ Basel III.',
      takeaway: 'Khả năng huy động vốn và khả năng thanh toán là hai câu hỏi riêng biệt: ngân hàng có thể dồi dào tiền gửi nhưng vẫn thiếu vốn để cho vay thêm các khoản rủi ro.',
    },
  },
  'cb-m1-11-03-boundaries': {
    enTitle: 'Where Does Commercial Banking Begin and End?',
    spec: {
      title: 'Ngân hàng thương mại bắt đầu và kết thúc ở đâu?',
      root: { label: 'Một doanh nghiệp cung cấp dịch vụ thanh toán hoặc tín dụng', detail: 'Phân loại tổ chức trước, sản phẩm sau' },
      question: 'Tổ chức này có được cấp phép nhận tiền gửi của công chúng và cho vay từ cùng một bảng cân đối được quản lý không?',
      branches: [
        { condition: 'Có', outcome: 'Ngân hàng thương mại', detail: 'Tiền gửi, cho vay và dịch vụ giao dịch, như tại Vietcombank' },
        { condition: 'Không: thu phí tư vấn và bảo lãnh phát hành', outcome: 'Ngân hàng đầu tư', detail: 'Tư vấn, bảo lãnh phát hành chứng khoán và hoạt động thị trường' },
        { condition: 'Không: cho vay bằng vốn chủ sở hữu và vốn bán buôn', outcome: 'Công ty tài chính tiêu dùng', detail: 'Cho vay mà không nhận tiền gửi của công chúng, như FE Credit' },
        { condition: 'Không: gộp rủi ro thông qua phí bảo hiểm', outcome: 'Doanh nghiệp bảo hiểm', detail: 'Rủi ro dài hạn với cấu trúc nợ phải trả và quy định khác biệt' },
        { condition: 'Không: phát hành tiền và giám sát', outcome: 'Ngân hàng trung ương', detail: 'Điều hành chính sách tiền tệ và giám sát hệ thống ngân hàng' },
        { condition: 'Không: khởi tạo thanh toán trên hạ tầng ngân hàng', outcome: 'Nền tảng thanh toán hoặc fintech', detail: 'Giao diện như MoMo và ZaloPay, thay vì tiền gửi được bảo hiểm' },
      ],
      note: 'Ba câu hỏi ranh giới: ai được cấp phép, ai cấp vốn cho hoạt động và ai gánh rủi ro.',
      takeaway: 'Sản phẩm trùng nhau không làm cho giấy phép hay bảng cân đối trở nên tương đương, vì vậy việc ước tính quy mô thị trường và so sánh với đối thủ phải bắt đầu từ giấy phép.',
    },
  },
  'cb-m1-11-04-products': {
    enTitle: 'Understanding Banking Products and Services',
    spec: {
      title: 'Hiểu về sản phẩm và dịch vụ ngân hàng',
      root: 'Một mối quan hệ ngân hàng',
      rootDetail: 'Cùng một khách hàng có thể vừa cung cấp vốn, vừa sử dụng tín dụng và thực hiện giao dịch',
      groups: [
        { label: 'Tiền gửi', detail: 'Nguồn vốn ổn định và thanh khoản cho khách hàng', items: ['Tài khoản thanh toán', 'Tài khoản tiết kiệm', 'Tiền gửi có kỳ hạn'] },
        { label: 'Cho vay', detail: 'Thu nhập lãi từ bảng cân đối', items: ['Cho vay mua nhà', 'Thẻ và thấu chi', 'Cho vay bán lẻ, SME và doanh nghiệp'] },
        { label: 'Thanh toán', detail: 'Giao dịch thường xuyên và thu nhập phí', items: ['Chuyển tiền', 'Chi lương', 'Thu hộ'] },
        { label: 'Tài trợ thương mại', detail: 'Giảm rủi ro thanh toán và thực hiện hợp đồng trong thương mại', items: ['Thư tín dụng', 'Bảo lãnh'] },
        { label: 'Dịch vụ ngân quỹ', detail: 'Kiểm soát tiền mặt và ngoại tệ', items: ['Quản lý dòng tiền', 'Ngoại hối'] },
      ],
      note: 'Kết quả là hai nguồn doanh thu: thu nhập lãi thuần và thu nhập phí ngoài lãi. Định nghĩa sản phẩm khác nhau tùy tổ chức và khu vực pháp lý.',
      takeaway: 'Quan hệ sâu một cách có trách nhiệm, chứ không phải ép bán chéo, mang lại số dư chi phí thấp, thu nhập phí và thông tin tín dụng tốt hơn từ cùng một khách hàng.',
    },
  },
  'cb-m1-11-05-customers': {
    enTitle: 'Who Are Commercial Banks\' Customers?',
    spec: {
      title: 'Khách hàng của ngân hàng thương mại là ai?',
      headers: ['Phân khúc', 'Nhu cầu điển hình', 'Cách ngân hàng phục vụ và thẩm định'],
      rows: [
        { label: 'Bán lẻ', a: 'Tài khoản, thẻ, cho vay mua nhà và tài chính cá nhân cho cá nhân và hộ gia đình', b: 'Sản phẩm chuẩn hóa, số lượng lớn' },
        { label: 'SME', a: 'Cần quyết định vốn lưu động nhanh; thường phụ thuộc vào chủ doanh nghiệp và báo cáo kém chính thức hơn', b: 'Kết hợp dữ liệu tài chính với đánh giá dựa trên quan hệ' },
        { label: 'Doanh nghiệp lớn và định chế', a: 'Cho vay, quản lý tiền mặt, tài trợ thương mại và ngân quỹ được thiết kế riêng cho nhiều pháp nhân', b: 'Cấu trúc, điều khoản ràng buộc và đội ngũ chuyên trách được thiết kế riêng' },
      ],
      note: 'Mọi phân khúc đều có thể là người gửi tiền, người vay và khách hàng giao dịch. Khoảng 87% người trưởng thành Việt Nam có tài khoản thanh toán vào năm 2024; đây là thước đo độ phủ từ một nguồn thứ cấp trích dẫn NHNN.',
      takeaway: 'Áp dụng một quy trình cho mọi phân khúc sẽ hoặc đẩy chi phí phục vụ SME lên cao, hoặc đánh giá thấp độ phức tạp của doanh nghiệp lớn.',
    },
  },
};

export const CB_VI_VISUALS: Record<string, ViVisualSpec> = { ...CB_VI_VISUALS_M01, ...CB_VI_VISUALS_M02, ...CB_VI_VISUALS_M04, ...CB_VI_VISUALS_M05 };
