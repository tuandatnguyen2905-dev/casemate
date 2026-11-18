import type { ViVisualSpec } from '../visualLocalization';

// Vietnamese Learning Visual text for Commercial Banking Module 02 (Value Chain), keyed by visualKind
// (commercialBankingM02VisualSpecs.ts). Text only: layout, kinds, tones and every number come from the English spec; each
// number in an English string appears in its Vietnamese counterpart (see visualLocalization.ts). Terminology follows
// viTerminology.ts. Not translated yet: cb-m2-21-02-actors (its `flows` ids are used as keys) and the held kinds.

export const CB_VI_VISUALS_M02: Record<string, ViVisualSpec> = {
  'cb-m2-21-01-chain': {
    enTitle: 'How the Commercial Banking Value Chain Works',
    spec: {
      title: 'Chuỗi giá trị ngân hàng thương mại vận hành như thế nào',
      steps: [
        { label: 'Huy động vốn', detail: 'Tiền gửi, nợ phải trả bán buôn và vốn là nguyên liệu đầu vào' },
        { label: 'Phân bổ và thẩm định', detail: 'Chọn tài sản, người vay, giá và hạn mức; quyết định chấp nhận loại rủi ro nào' },
        { label: 'Giải ngân và phục vụ', detail: 'Cung cấp tín dụng, tài khoản, thanh toán và hỗ trợ qua các kênh' },
        { label: 'Tạo thu nhập và quản lý', detail: 'Thu chênh lệch lãi suất và phí; quản lý chi phí hoạt động và tổn thất' },
        { label: 'Tái tuần hoàn và bảo vệ', detail: 'Tiền trả nợ đưa nguồn vốn trở lại; vốn và thanh khoản bảo vệ tính liên tục' },
      ],
      loop: 'Tiền trả nợ được tái đầu tư vào các khoản cho vay mới, và một khâu yếu sẽ lan sang các khâu khác: nguồn vốn huy động không ổn định làm hạn chế cho vay còn thẩm định yếu làm tăng tổn thất.',
      note: 'Quản trị rủi ro, tuân thủ, tài chính, dữ liệu và quy định vận hành xuyên suốt mọi khâu. Tài sản ngân hàng Việt Nam đạt khoảng 196% GDP vào cuối tháng 9/2024, theo ước tính về độ sâu hệ thống của Ngân hàng Thế giới.',
      takeaway: 'Giá trị của ngân hàng đến từ việc phối hợp nguồn vốn, chọn lọc rủi ro, dịch vụ và khả năng chống chịu, chứ không chỉ từ quy mô dư nợ cho vay.',
    },
  },
  'cb-m2-21-03-flows': {
    enTitle: 'How Money, Information, and Risk Flow',
    spec: {
      title: 'Dòng tiền, thông tin và rủi ro chảy như thế nào',
      headers: ['Góc nhìn', 'Điều được chuyển hoặc ghi nhận', 'Đừng nhầm với'],
      rows: [
        { label: 'Dòng tiền', a: 'Tiền từ người gửi đến người vay, rồi quay lại qua việc trả nợ', b: 'Doanh thu' },
        { label: 'Dòng thông tin', a: 'KYC, dữ liệu tín dụng và tín hiệu giao dịch', b: 'Sự di chuyển của tiền mặt' },
        { label: 'Dòng rủi ro', a: 'Nghĩa vụ thanh khoản đối với người gửi tiền; rủi ro tín dụng phát sinh khi có cho vay', b: 'Một khoản lỗ đã ghi sổ' },
        { label: 'Góc nhìn kế toán', a: 'Nợ phải trả tiền gửi và tài sản là khoản vay; thu nhập lãi thuần và phí phát sinh dần theo thời gian', b: 'Lợi nhuận bằng đúng số tiền cho vay' },
      ],
      note: 'Tín dụng toàn hệ thống của Việt Nam đạt khoảng 133% GDP vào cuối tháng 9/2024 (tỷ lệ số dư) và tăng 15,08% trong năm 2024 (thay đổi của số dư tín dụng); cả hai đều không phải giải ngân hay doanh thu của ngân hàng.',
      takeaway: 'Hãy gọi tên từng dòng và tác động kế toán của nó một cách riêng biệt, nếu không phân tích sẽ bị tính trùng.',
    },
  },
  'cb-m2-22-01-funding': {
    enTitle: 'Where Do Commercial Banks Get Their Funding?',
    spec: {
      title: 'Các ngân hàng thương mại huy động vốn từ đâu?',
      headers: ['Tầng nguồn vốn', 'Chi phí và mức độ ổn định', 'Dùng để làm gì'],
      rows: [
        { label: 'Tiền gửi CASA', a: 'Số dư tài khoản thanh toán và tiết kiệm chi phí thấp; có thể ổn định và đa dạng', b: 'Nguồn vốn quan hệ chi phí thấp' },
        { label: 'Tiền gửi có kỳ hạn', a: 'Tiền của khách hàng hưởng lãi, cam kết gửi theo một kỳ hạn', b: 'Nguồn vốn ổn định hơn để tài trợ tài sản' },
        { label: 'Vay liên ngân hàng', a: 'Lấp khoảng trống nhanh chóng nhưng có thể được định giá lại hoặc rút đi nhanh hơn', b: 'Quản lý thanh khoản ngắn hạn' },
        { label: 'Nợ phát hành và nguồn vốn bán buôn', a: 'Nhạy cảm với thị trường; nhà đầu tư đòi hỏi lợi suất thị trường', b: 'Nguồn vốn linh hoạt; nợ thứ cấp (Tier 2) đủ điều kiện có thể được tính là vốn' },
        { label: 'Vốn chủ sở hữu và vốn điều lệ', a: 'Chủ sở hữu đòi hỏi lợi suất thị trường; không phải tiền gửi của khách hàng', b: 'Hấp thụ tổn thất và hỗ trợ năng lực vốn theo quy định' },
      ],
      note: 'Vốn điều lệ của 29 ngân hàng đạt khoảng VND879,35 nghìn tỷ vào cuối tháng 6/2025, tăng 6,6% so với cuối năm 2024; năm ngân hàng lớn nhất nắm giữ 41% (theo VOV dẫn số liệu NHNN/VNA). Đây không phải tiền gửi hay cơ cấu nguồn vốn.',
      takeaway: 'Thanh khoản hỏi liệu các nghĩa vụ có được đáp ứng đúng hạn hay không; vốn hỏi liệu tổn thất có được hấp thụ hay không, nên vốn chủ sở hữu không chỉ là một dạng tiền gửi khác.',
    },
  },
  'cb-m2-22-02-casa': {
    enTitle: 'Understanding Cost of Funds and CASA',
    spec: {
      title: 'Hiểu về chi phí vốn và CASA',
      root: { label: 'Chi phí vốn bình quân gia quyền', detail: '3,35% cho cơ cấu nguồn vốn 40/45/15 GIẢ ĐỊNH, không phải kết quả của bất kỳ ngân hàng nào' },
      formula: 'Chi phí vốn = chi phí lãi trên toàn bộ nguồn vốn ÷ tổng nguồn vốn',
      drivers: [
        { label: 'Số dư CASA', detail: '40% nguồn vốn; các số dư có lãi suất bằng không hoặc thấp kéo mức bình quân xuống', op: '+' },
        { label: 'Tiền gửi có kỳ hạn', detail: '45% nguồn vốn; tiền gửi của khách hàng có hưởng lãi', op: '+' },
        { label: 'Nguồn vốn bán buôn', detail: '15% nguồn vốn; vay từ các tổ chức hoặc thị trường', op: '+' },
      ],
      note: 'Techcombank báo cáo tỷ lệ CASA 40,9% và số dư CASA VND230,9 nghìn tỷ vào cuối năm 2024, tăng 27,2% (theo số liệu do ngân hàng công bố, thông cáo kết quả FY2024). Tổng tiền gửi của khách hàng là VND565,1 nghìn tỷ.',
      takeaway: 'CASA cao hơn làm giảm chi phí vốn bình quân gia quyền, nhưng lợi nhuận vẫn phụ thuộc vào lợi suất tài sản, chi phí hoạt động, dự phòng và vốn.',
    },
  },
  'cb-m2-23-01-lifecycle': {
    enTitle: 'How Banks Evaluate and Approve Loans',
    spec: {
      title: 'Ngân hàng thẩm định và phê duyệt khoản vay như thế nào',
      trunk: [
        { label: 'Thiết kế và khởi tạo', detail: 'Xác định khách hàng, sản phẩm và giá; tiếp nhận hồ sơ và hoàn tất KYC' },
      ],
      optionsLabel: 'Cách thẩm định theo nhóm khách hàng',
      options: [
        { label: 'Bán lẻ', detail: 'Dữ liệu chuẩn hóa và thẻ điểm áp dụng cho nhiều khoản dư nợ nhỏ hơn' },
        { label: 'SME', detail: 'Báo cáo tài chính kết hợp với thông tin từ quan hệ khách hàng' },
        { label: 'Doanh nghiệp lớn', detail: 'Thiết kế riêng và dựa trên các điều khoản ràng buộc; các khoản cấp tín dụng lớn có thể được đồng tài trợ' },
      ],
      afterLabel: 'Sau quyết định tín dụng',
      after: [
        { label: 'Phê duyệt và lập hồ sơ', detail: 'Đặt hạn mức, kỳ hạn, các điều khoản ràng buộc và điều kiện' },
        { label: 'Giải ngân và giám sát', detail: 'Giải ngân và theo dõi các tín hiệu cảnh báo sớm' },
        { label: 'Thu nợ, thu hồi hoặc tất toán', detail: 'Nhận tiền trả nợ hoặc xử lý nợ quá hạn và thu hồi nợ' },
      ],
      note: 'Giá cần bù đắp chi phí vốn, chi phí hoạt động, tổn thất kỳ vọng và vốn hoặc lợi suất. Dòng tiền của người vay là nguồn trả nợ chính; tài sản bảo đảm là nguồn thứ yếu.',
      takeaway: 'Tín dụng là rủi ro được định giá và tạo ra trong suốt vòng đời khoản vay, chứ không phải khối lượng được phê duyệt trong một cuộc họp.',
    },
  },
  'cb-m2-24-01-delivery': {
    enTitle: 'How Banks Deliver Financial Services',
    spec: {
      title: 'Ngân hàng cung cấp dịch vụ tài chính như thế nào',
      root: { label: 'Nhu cầu của khách hàng', detail: 'Đăng ký mở tài khoản, giao dịch, hỗ trợ, tư vấn hoặc khiếu nại' },
      question: 'Nhu cầu này cần loại hỗ trợ nào?',
      branches: [
        { condition: 'Thường lệ và diễn ra thường xuyên', outcome: 'Di động, internet hoặc tự phục vụ', detail: 'Thanh toán, số dư và các tác vụ đơn giản với chi phí phục vụ thấp hơn' },
        { condition: 'Tiền mặt hoặc hỗ trợ mở tài khoản trực tiếp', outcome: 'Chi nhánh', detail: 'Dịch vụ tiền mặt, khả năng tiếp cận và lòng tin' },
        { condition: 'Nhu cầu phức tạp của SME hoặc doanh nghiệp', outcome: 'Chuyên viên quan hệ khách hàng', detail: 'Tư vấn và điều phối giữa các sản phẩm' },
        { condition: 'Có sự cố xảy ra', outcome: 'Trung tâm liên hệ khách hàng', detail: 'Hỗ trợ, khiếu nại và khắc phục dịch vụ' },
      ],
      note: 'Khoảng 87% người trưởng thành tại Việt Nam có tài khoản thanh toán vào năm 2024 (nguồn thứ cấp trích dẫn NHNN); đây là thước đo mức sở hữu, không phải mức sử dụng số thường xuyên hay tỷ trọng giao dịch.',
      takeaway: 'Hãy đánh giá việc phân phối theo tổng kết quả cho khách hàng và chi phí phục vụ, chứ không theo số chi nhánh, đồng thời giữ một mối quan hệ nhất quán.',
    },
  },
  'cb-m2-24-02-relationships': {
    enTitle: 'Retail, SME, and Corporate Banking Relationships',
    spec: {
      title: 'Quan hệ ngân hàng bán lẻ, SME và doanh nghiệp',
      headers: ['Phân khúc', 'Mối quan hệ phục vụ điều gì', 'Điều ngân hàng phải theo dõi'],
      rows: [
        { label: 'Bán lẻ', a: 'Nhu cầu cá nhân với khối lượng lớn thông qua các sản phẩm chuẩn hóa', b: 'Kích hoạt, khả năng chi trả và bán chéo phù hợp' },
        { label: 'SME', a: 'Dòng tiền của chủ doanh nghiệp và của doanh nghiệp xét cùng nhau', b: 'Khả năng nhìn thấy dòng tiền và mức độ phụ thuộc vào chủ doanh nghiệp' },
        { label: 'Doanh nghiệp lớn', a: 'Các khoản cấp tín dụng phức tạp, quản lý dòng tiền và dịch vụ giao dịch', b: 'Thị phần ví tiền (wallet share), mức độ tập trung và các điều khoản ràng buộc' },
        { label: 'Mọi phân khúc', a: 'Chiều sâu hữu ích trên nguồn vốn, tín dụng và giao dịch', b: 'Giá trị vòng đời điều chỉnh theo rủi ro, chứ không phải số lượng sản phẩm' },
      ],
      note: 'Techcombank báo cáo 13,4 triệu khách hàng vào cuối năm 2023 sau khi bổ sung 2,6 triệu trong một năm: số liệu của ngân hàng từ bài viết tài trợ, không phải chuẩn so sánh của hệ thống.',
      takeaway: 'Bán chéo chỉ tạo ra giá trị khi sản phẩm hữu ích, phù hợp và có lãi sau khi tính rủi ro.',
    },
  },
  'cb-m2-24-03-journey': {
    enTitle: 'Digital Banking and Customer Experience',
    spec: {
      title: 'Ngân hàng số và trải nghiệm khách hàng',
      steps: [
        { label: 'Khám phá và bắt đầu', detail: 'Khách hàng hiểu đề xuất giá trị và bắt đầu' },
        { label: 'Xác minh và mở tài khoản', detail: 'Hoàn tất kiểm tra danh tính và điều kiện; đo số tài khoản được mở sau khi xác minh' },
        { label: 'Nạp tiền và kích hoạt', detail: 'Đo giao dịch có tiền đầu tiên' },
        { label: 'Sử dụng và đào sâu', detail: 'Thanh toán hoặc tiết kiệm trở thành thói quen; đo mức sử dụng tích cực trong 30 ngày' },
        { label: 'Xử lý ngoại lệ', detail: 'Lỗi, gian lận và tranh chấp được xử lý rõ ràng; đo mức độ giải quyết yêu cầu hỗ trợ' },
      ],
      loop: 'Quy mô số làm khuếch đại các tỷ lệ lỗi nhỏ, nên khắc phục dịch vụ tốt là điều giữ khách hàng quay lại.',
      note: 'Khoảng 87% người trưởng thành tại Việt Nam có tài khoản thanh toán vào năm 2024, và Techcombank báo cáo 13,4 triệu khách hàng vào cuối năm 2023; cả hai đều không chứng minh chất lượng hành trình.',
      takeaway: 'Trải nghiệm số là việc hoàn tất đáng tin cậy các tác vụ tài chính, được theo dõi cùng với gian lận và khiếu nại, chứ không phải lượt tải.',
    },
  },
  'cb-m2-25-01-inputs': {
    enTitle: 'Understanding Banking Inputs and Outputs',
    spec: {
      title: 'Hiểu về đầu vào và đầu ra của ngân hàng',
      root: 'Động cơ kinh tế của ngân hàng',
      rootDetail: 'Đầu vào được chuyển hóa thành đầu ra; giá trị chỉ được ghi nhận sau khi trừ mọi chi phí',
      groups: [
        { label: 'Đầu vào tài chính', detail: 'Nguồn vốn ngân hàng phải hoàn trả, cùng khả năng hấp thụ tổn thất', items: ['Tiền gửi', 'Vay mượn', 'Vốn'] },
        { label: 'Đầu vào vận hành', detail: 'Năng lực thực thi và phục vụ', items: ['Nhân sự', 'Quy trình', 'Công nghệ', 'Mạng lưới phân phối'] },
        { label: 'Đầu vào thông tin', detail: 'Chất lượng của quyết định và kiểm soát', items: ['Dữ liệu định danh', 'Dữ liệu tài chính', 'Dữ liệu giao dịch'] },
        { label: 'Đầu ra', detail: 'Giá trị cho khách hàng và mức độ phơi nhiễm rủi ro', items: ['Khoản vay', 'Tài khoản và thanh toán', 'Dịch vụ tài trợ thương mại và ngân quỹ'] },
      ],
      note: 'Giá trị thu được là thu nhập lãi thuần và phí còn lại sau chi phí vốn, chi phí hoạt động, tổn thất tín dụng và chi phí vốn hoặc thuế; khối lượng tăng thêm được định giá thấp hơn các chi phí đó sẽ làm suy yếu lợi nhuận kinh tế.',
      takeaway: 'Gọi tiền gửi là doanh thu hay khoản vay là lợi nhuận sẽ che giấu khoản nợ phải trả và rủi ro mà mỗi giao dịch tạo ra.',
    },
  },
  'cb-m2-25-02-nim': {
    enTitle: 'How Banks Generate Net Interest Income and NIM',
    spec: {
      title: 'Ngân hàng tạo ra thu nhập lãi thuần và NIM như thế nào',
      leftTitle: 'Trước (GIẢ ĐỊNH)',
      rightTitle: 'Sau khi chi phí vốn giảm 0,5 điểm phần trăm (GIẢ ĐỊNH)',
      rows: [
        { label: 'Tài sản sinh lãi bình quân', a: 'VND1.000', b: 'VND1.000, không đổi' },
        { label: 'Lợi suất tài sản và cho vay', a: 'Cố định', b: 'Cố định; không cho vay thêm' },
        { label: 'Thu nhập lãi thuần', a: 'VND40', b: 'VND45, tăng 12,5%' },
        { label: 'Biên lãi ròng (NIM)', a: '4,0%', b: '4,5%, tăng 0,5 điểm phần trăm' },
      ],
      note: 'NIM = thu nhập lãi thuần ÷ tài sản sinh lãi bình quân; hãy quy đổi NIM giữa kỳ về cả năm trước khi so sánh với số liệu cả năm. Mọi số liệu đều là GIẢ ĐỊNH lấy từ phụ lục nghiên cứu, không phải kết quả của Techcombank, Vietcombank hay của ngành.',
      takeaway: 'Chi phí vốn có thể làm thay đổi thu nhập lãi thuần và NIM trên cùng một cơ sở tài sản, nên NIM rộng hơn một mức chênh lệch lãi suất đơn thuần.',
    },
  },
  'cb-m2-25-03-waterfall': {
    enTitle: 'How Costs and Credit Risks Affect Profitability',
    spec: {
      title: 'Chi phí và rủi ro tín dụng ảnh hưởng đến khả năng sinh lời như thế nào',
      root: { label: 'Lợi nhuận ròng, rồi ROA và ROE', detail: 'Đọc trong tương quan với tài sản, vốn chủ sở hữu và vốn đã sử dụng' },
      formula: 'Lợi nhuận ròng = thu nhập lãi thuần + thu nhập ngoài lãi − chi phí hoạt động − dự phòng − thuế',
      drivers: [
        { label: 'Thu nhập lãi thuần', detail: 'Lợi suất tài sản trừ chi phí vốn', op: '+' },
        { label: 'Thu nhập ngoài lãi', detail: 'Phí; cùng với thu nhập lãi thuần tạo thành tổng thu nhập hoạt động', op: '+' },
        { label: 'Chi phí hoạt động', detail: 'Chi phí phục vụ; chia cho thu nhập hoạt động ra tỷ lệ chi phí trên thu nhập (CIR)', op: '−' },
        { label: 'Dự phòng', detail: 'Chi phí tín dụng; so với dư nợ cho vay bình quân ra chi phí tín dụng trên dư nợ (Cost of Risk)', op: '−' },
        { label: 'Thuế', detail: 'Được trừ trước khi ra lợi nhuận ròng', op: '−' },
      ],
      note: 'Vietcombank báo cáo lợi nhuận ròng hợp nhất VND16.699 tỷ cho H1-2024 (nửa đầu năm 2024; kết quả của ngân hàng, theo The Investor): đây chỉ là lợi nhuận ròng của một nữa năm, không phải doanh thu hay thước đo của cả năm.',
      takeaway: 'Quy mô nằm ở đầu; chi phí vốn, chi phí hoạt động và chi phí tín dụng quyết định phần lợi nhuận còn lại.',
    },
  },
  'cb-m2-26-01-global-model': {
    enTitle: 'How Global Commercial Banking Operations Work',
    spec: {
      title: 'Hoạt động ngân hàng thương mại toàn cầu vận hành như thế nào',
      root: 'Tập đoàn ngân hàng toàn cầu',
      rootDetail: 'Các nền tảng chung và dịch vụ xuyên biên giới vận hành thông qua các pháp nhân địa phương',
      groups: [
        { label: 'Dùng chung ở cấp tập đoàn', items: ['Mạng lưới giao dịch toàn cầu', 'Ngân quỹ tập đoàn', 'Chuẩn mực rủi ro của tập đoàn', 'Công nghệ và vận hành dùng chung'] },
        { label: 'Do từng pháp nhân địa phương nắm giữ', items: ['Nhóm khách hàng và giấy phép', 'Vốn và thanh khoản tại địa phương', 'Quy tắc ứng xử và quy định an toàn tại địa phương'] },
        { label: 'Ràng buộc xuyên biên giới', items: ['Pháp lý hoặc quy định', 'Tiền tệ hoặc nguồn vốn', 'Dữ liệu hoặc vận hành'] },
      ],
      note: 'Cơ quan giám sát địa phương có thể yêu cầu vốn và thanh khoản phải ở lại pháp nhân địa phương khi căng thẳng. Tại Việt Nam, các ngân hàng và chi nhánh có vốn nước ngoài phục vụ khách hàng đa quốc gia, thương mại và khách hàng thịnh vượng theo giấy phép trong nước.',
      takeaway: 'Quy mô toàn cầu vận hành thông qua các bảng cân đối chịu quản lý tại địa phương, chứ không đứng trên chúng.',
    },
  },
  'cb-m2-26-02-vietnam-model': {
    enTitle: "Vietnam's Commercial Banking Value Chain",
    spec: {
      title: 'Chuỗi giá trị ngân hàng thương mại tại Việt Nam',
      leftTitle: 'Xu hướng ở thị trường phát triển',
      rightTitle: 'Mô hình ở Việt Nam',
      rows: [
        { label: 'Tài trợ cho hệ thống', a: 'Nhiều thu nhập từ phí và thị trường vốn hơn', b: 'Do ngân hàng chi phối; tài sản khoảng 196% GDP vào cuối tháng 9/2024' },
        { label: 'Ràng buộc tăng trưởng', a: 'Nhu cầu, vốn, thanh khoản và khẩu vị rủi ro', b: 'Các yếu tố đó cộng với room tín dụng của NHNN; tín dụng tăng 15,08% trong năm 2024' },
        { label: 'Cạnh tranh về nguồn vốn', a: 'Tiền gửi cộng với nguồn vốn thị trường rộng rãi', b: 'Cạnh tranh gay gắt để giành CASA' },
        { label: 'Phân phối', a: 'Các kênh số đã trưởng thành', b: 'Di động và QR cho truy cập thường ngày; khoảng 87% người trưởng thành có tài khoản thanh toán' },
        { label: 'Trọng tâm rủi ro', a: 'Các chế độ Basel III đã trưởng thành', b: 'Rủi ro bất động sản, trái phiếu và người vay; khuôn khổ về vốn và nợ xấu vẫn đang hoàn thiện' },
      ],
      note: 'Ba số liệu của Việt Nam dùng mẫu số và kỳ khác nhau: một ước tính của Ngân hàng Thế giới, một số liệu của NHNN qua nguồn thứ cấp và một chỉ số về tài chính toàn diện. Chúng không phải một điểm số tổng hợp.',
      takeaway: 'Hãy địa phương hóa các giả định về nguồn vốn, tăng trưởng, phân phối và rủi ro trước khi sao chép chiến lược của thị trường phát triển.',
    },
  },
};
