import type { ViVisualSpec } from '../visualLocalization';

// Vietnamese Learning Visual text for Commercial Banking Module 04 (Competitive Landscape), keyed by visualKind
// (commercialBankingM04VisualSpecs.ts). Text only: layout, kinds, tones and every number come from the English spec; each
// number in an English string appears in its Vietnamese counterpart (see visualLocalization.ts). Terminology follows
// viTerminology.ts. Not translated yet: cb-m4-41-02-five-forces (its `flows` ids are used as keys) and the held kinds.

export const CB_VI_VISUALS_M04: Record<string, ViVisualSpec> = {
  'cb-m4-41-01-arenas': {
    enTitle: 'Where banks actually compete',
    spec: {
      title: 'Các ngân hàng thực sự cạnh tranh ở đâu',
      headers: ['Đấu trường', 'Cách ngân hàng cạnh tranh', 'Chiến thắng mang lại điều gì'],
      rows: [
        { label: 'Tiền gửi và nguồn vốn', a: 'Thu hút số dư lương, số dư hoạt động và tiết kiệm ổn định, chi phí thấp', b: 'Hỗ trợ biên lãi và thanh khoản' },
        { label: 'Cho vay', a: 'Định giá, phê duyệt và cấu trúc tín dụng trong khẩu vị rủi ro và room tín dụng', b: 'Tiêu tốn thanh khoản và vốn' },
        { label: 'Giao dịch hằng ngày', a: 'Ứng dụng, chi nhánh, đội ngũ quan hệ khách hàng và hệ sinh thái giành vị thế ngân hàng giao dịch chính', b: 'Làm sâu thêm dữ liệu và khả năng giữ chân khách hàng' },
      ],
      note: 'Thị phần của Big 4 giữ nguyên phạm vi riêng: 47,57% tài sản (30 ngân hàng báo cáo, ngày 30/6/2025); 41,9% dư nợ cho vay và khoảng 50% tiền gửi (cuối năm 2023, Viet Nam News dẫn số liệu NHNN). Không gộp các số liệu này.',
      takeaway: 'Các ngân hàng cùng lúc cạnh tranh về số dư, năng lực chấp nhận rủi ro và vị thế quan hệ chính, nên thị phần khách hàng luôn gắn ngược lại với bảng cân đối.',
    },
  },
  'cb-m4-41-03-moat': {
    enTitle: 'Why bank advantages resist imitation',
    spec: {
      title: 'Vì sao lợi thế của ngân hàng khó bị sao chép',
      steps: [
        { label: 'Lòng tin và giấy phép', detail: 'Được phép và được tin tưởng để nắm giữ tiền của khách hàng' },
        { label: 'Số dư ổn định', detail: 'Lòng tin thu hút số dư, giúp giảm áp lực nguồn vốn' },
        { label: 'Quan hệ khách hàng và dữ liệu rủi ro', detail: 'Hoạt động lặp lại giúp cải thiện dịch vụ và quyết định rủi ro' },
        { label: 'Vận hành đáng tin cậy', detail: 'Hạ tầng thanh toán và công nghệ ổn định làm sâu thêm hoạt động' },
        { label: 'Vốn và khả năng chống chịu', detail: 'Lợi nhuận giữ lại và vốn hấp thụ tổn thất, hỗ trợ tăng trưởng thận trọng' },
      ],
      loop: 'Hệ thống phụ thuộc vào lộ trình: một cú sốc niềm tin có thể làm cạn lợi thế nguồn vốn, và mở rộng quy mô quá nhanh có thể vượt quá năng lực kiểm soát.',
      note: 'Tài sản US$6,303 nghìn tỷ của ICBC (Ngân hàng Công thương Trung Quốc), theo bảng xếp hạng năm 2024, chỉ minh họa quy mô, không phải khả năng sinh lời hay mức độ an toàn; vị thế G-SIB cũng kéo theo kỳ vọng cao hơn về khả năng hấp thụ tổn thất.',
      takeaway: 'Hào lũy cạnh tranh là hệ thống vận hành gắn kết phía sau sản phẩm, không phải một tính năng riêng lẻ.',
    },
  },
  'cb-m4-42-01-global-profiles': {
    enTitle: 'Read global players by model—not fame',
    spec: {
      title: 'Đánh giá các ngân hàng toàn cầu theo mô hình, không theo danh tiếng',
      headers: ['Lăng kính', 'Cần xem xét điều gì', 'Vì sao quan trọng'],
      rows: [
        { label: 'Quy mô', a: 'Tài sản, dư nợ cho vay, tiền gửi và phạm vi địa lý', b: 'Năng lực, tự nó không phải chất lượng' },
        { label: 'Mô hình kinh doanh', a: 'Phân khúc khách hàng và các mảng kinh doanh ngoài lãi', b: 'Những động cơ doanh thu và rủi ro nào đang vận hành' },
        { label: 'Nguồn vốn', a: 'Cơ cấu tiền gửi và các nguồn vốn khác', b: 'Chi phí và mức độ ổn định của nguồn vốn' },
        { label: 'Chất lượng tài sản', a: 'Hiệu quả của các khoản vay và khoản đầu tư', b: 'Khả năng chống chịu của lợi nhuận' },
        { label: 'Vốn', a: 'Năng lực vốn theo quy định và các bộ đệm vốn', b: 'Khả năng hấp thụ tổn thất và giới hạn tăng trưởng' },
        { label: 'Hiệu quả và lợi nhuận', a: 'Định nghĩa các tỷ số và xu hướng theo thời gian', b: 'Giá trị tạo ra sau khi trừ nguồn lực đã sử dụng' },
      ],
      note: 'ICBC (Ngân hàng Công thương Trung Quốc; khoảng US$6,303 nghìn tỷ), Ngân hàng Nông nghiệp Trung Quốc, Ngân hàng Xây dựng Trung Quốc và Ngân hàng Trung Quốc dẫn đầu bảng xếp hạng tài sản năm 2024 của S&P được trích dẫn; JPMorgan là ngân hàng lớn nhất của Mỹ trong nguồn này. Chỉ phản ánh quy mô, không phải xếp hạng lợi nhuận hay mức độ an toàn.',
      takeaway: 'Một hồ sơ cho thấy liệu quy mô có chuyển thành lợi nhuận điều chỉnh theo rủi ro hay không, khi tiền tệ, thời điểm và chuẩn mực kế toán đã được đưa về cùng cơ sở so sánh.',
    },
  },
  'cb-m4-42-03-position': {
    enTitle: 'What market position really means',
    spec: {
      title: 'Vị thế thị trường thực sự có nghĩa là gì',
      trunk: [
        { label: 'Xác định thị trường và mẫu', detail: 'Địa bàn, phân khúc, sản phẩm và nhóm đối thủ' },
        { label: 'Tính thị phần tại cùng thời điểm', detail: 'Dùng mẫu số có thể so sánh cho cùng thời điểm và cùng cơ sở' },
      ],
      optionsLabel: 'Các lăng kính về vị thế',
      options: [
        { label: 'Quy mô', detail: 'Tổng tài sản, dư nợ cho vay khách hàng và tiền gửi' },
        { label: 'Cơ cấu nguồn vốn', detail: 'Liệu số dư có mang lại lợi thế nguồn vốn lâu dài hay không' },
        { label: 'Đa dạng hóa doanh thu', detail: 'Kiểm tra mức độ phân tán của thu nhập; chỉ riêng danh mục sản phẩm rộng chứng minh được rất ít' },
        { label: 'Chất lượng tài sản và vốn', detail: 'Rủi ro phải gánh để giữ vị thế' },
        { label: 'Khả năng sinh lời', detail: 'Lợi nhuận là dòng chảy (flow); hãy tách nó khỏi các số dư (stock) như tài sản' },
        { label: 'Hoạt động và phân phối', detail: 'Mức độ hoạt động giao dịch và sức mạnh phân phối' },
      ],
      afterLabel: 'Kết luận',
      after: [
        { label: 'Giải thích lợi thế kinh tế', detail: 'Vị thế này có tạo ra lợi thế bền vững về khách hàng hoặc nguồn vốn không?' },
      ],
      note: 'Tài sản VND10,11 triệu tỷ của Big 4 bằng 47,57% của mẫu 30 ngân hàng tại ngày 30/6/2025, không phải thị phần chung của toàn hệ thống; con số VND1,049 triệu tỷ của VPBank (30/6/2025) không thể đưa vào bảng FY2024.',
      takeaway: 'Vị thế của một ngân hàng chỉ có ý nghĩa khi phạm vi có thể so sánh và vị thế đó gắn với lợi nhuận và rủi ro mà nó tạo ra.',
    },
  },
  'cb-m4-44-01-funding-quality': {
    enTitle: 'Funding strength and asset quality',
    spec: {
      title: 'Sức mạnh nguồn vốn và chất lượng tài sản',
      leftTitle: 'Nền tảng nguồn vốn',
      rightTitle: 'Nền tảng tín dụng',
      rows: [
        { label: 'Thu hút', a: 'Huy động CASA và tiền gửi có kỳ hạn', b: 'Thẩm định khách hàng trong khẩu vị rủi ro' },
        { label: 'Theo dõi', a: 'Mức độ tập trung, kỳ hạn và thanh khoản', b: 'Chỉ báo cảnh báo sớm và đa dạng hóa danh mục' },
        { label: 'Bảo vệ', a: 'Nguồn vốn dự phòng và tài sản thanh khoản', b: 'Tài sản bảo đảm, dự phòng và thu hồi nợ' },
        { label: 'Kiểu thất bại', a: 'Nợ phải trả không ổn định gây căng thẳng thanh khoản', b: 'Chất lượng tín dụng kém phá hủy vốn dù NIM cao' },
        { label: 'Kết quả', a: 'Nguồn vốn ổn định, chi phí thấp hơn hỗ trợ NIM', b: 'Chi phí rủi ro ở mức hạn chế biến biên lãi thành lợi nhuận' },
      ],
      note: 'Tỷ lệ CASA 40,9% của Techcombank (cuối năm 2024, theo số liệu do ngân hàng công bố trong thông cáo kết quả FY2024) thể hiện lăng kính nguồn vốn; tỷ lệ nợ xấu hợp nhất 1,0% của Vietcombank vào cuối năm 2024 (trích đoạn của Fitch) thể hiện lăng kính chất lượng tài sản. Đây không phải một bảng xếp hạng.',
      takeaway: 'NIM chỉ bền vững khi kỷ luật nguồn vốn và kỷ luật tín dụng củng cố lẫn nhau trong điều kiện căng thẳng.',
    },
  },
  'cb-m4-44-02-capacity': {
    enTitle: 'Capital, efficiency and distribution',
    spec: {
      title: 'Vốn, hiệu quả và phân phối',
      root: { label: 'Năng lực tăng trưởng thận trọng', detail: 'Lợi nhuận và khả năng chống chịu khi khối lượng tăng lên' },
      drivers: [
        { label: 'Vốn', detail: 'Hấp thụ tổn thất và giới hạn RWA', op: '+', children: [
          { label: 'Bộ đệm hấp thụ tổn thất', detail: 'Vốn mỏng hạn chế tăng trưởng' },
          { label: 'Phân bổ điều chỉnh theo rủi ro', detail: 'Hướng vốn vào các cơ hội đã điều chỉnh theo rủi ro' },
        ] },
        { label: 'Hiệu quả hoạt động', detail: 'CIR = OPEX ÷ thu nhập hoạt động', op: '+', children: [
          { label: 'Tự động hóa', detail: 'Tự động hóa các quy trình lặp lại và thiết kế lại để giảm nhu cầu phát sinh từ lỗi' },
          { label: 'Bối cảnh đầu tư', detail: 'Đầu tư không đủ có thể tạm thời làm CIR trông tốt hơn' },
        ] },
        { label: 'Phân phối', detail: 'Chi nhánh, kênh số, chuyên viên quan hệ khách hàng (RM) và đối tác', op: '+', children: [
          { label: 'Kích hoạt', detail: 'Độ phủ không kèm kích hoạt làm tăng chi phí' },
          { label: 'Giữ chân', detail: 'Số dư tại ngân hàng chính biến độ phủ thành giá trị nền tảng kinh doanh' },
        ] },
      ],
      note: 'Mức tổng vốn tối thiểu 8% của Basel là sàn tham chiếu toàn cầu, không giống nhau với mọi ngân hàng Việt Nam; ≈87% người trưởng thành có tài khoản thanh toán (số liệu báo cáo năm 2024) đo độ phủ, không phải mức sử dụng thực tế.',
      takeaway: 'Các năng lực bổ trợ cho nhau: tăng trưởng ở một năng lực sẽ thành sự mong manh hoặc chi phí lãng phí khi năng lực khác tụt lại.',
    },
  },
  'cb-m4-44-03-ksf': {
    enTitle: 'Innovation, trust and sustainable advantage',
    spec: {
      title: 'Đổi mới, lòng tin và lợi thế bền vững',
      root: { label: 'Hành trình số mới', detail: 'Xây dựng quanh một nhu cầu khách hàng nhiều trở ngại, với kiểm soát được tích hợp ngay trong thiết kế' },
      question: 'Hành trình có đưa khách hàng từ việc dùng tính năng đến hoàn tất nhu cầu và hành vi coi đây là ngân hàng chính không?',
      branches: [
        { condition: 'Có, một cách ổn định', outcome: 'Quan hệ chính được làm sâu thêm', detail: 'Số dư, hoạt động, dữ liệu và bán chéo củng cố nguồn vốn và phí định kỳ' },
        { condition: 'Chỉ có lượt đăng nhập', outcome: 'Tính năng trở nên phổ thông', detail: 'Việc sử dụng không kèm số dư, giao dịch hay giữ chân khách hàng không củng cố nền tảng kinh doanh' },
        { condition: 'Thất bại khi vận hành dịch vụ', outcome: 'Lòng tin bị xói mòn', detail: 'Sự cố về khả năng chống chịu có thể xóa sạch nhiều năm xây dựng lòng tin' },
      ],
      note: 'Đo bốn giai đoạn: sử dụng tính năng, hoàn tất nhu cầu, hành vi quan hệ và kết quả tài chính. Lượt tải hay số tài khoản đăng ký là chưa đủ, và không ngân hàng cụ thể nào được khẳng định là dẫn đầu về phí hay kênh số.',
      takeaway: 'Đổi mới chỉ tạo ra lợi thế khi việc thực thi đáng tin cậy biến nó thành các mối quan hệ được tin tưởng và có số dư.',
    },
  },
  'cb-m4-45-01-swot': {
    enTitle: 'A disciplined banking SWOT',
    spec: {
      title: 'Phân tích SWOT ngân hàng có kỷ luật',
      root: 'Hệ thống ngân hàng Việt Nam',
      rootDetail: 'Góc nhìn cấp hệ thống; một ngân hàng cụ thể cần bằng chứng riêng về danh mục, nguồn vốn và vốn',
      groups: [
        { label: 'Điểm mạnh (nội tại)', items: ['Độ sâu của hệ thống ngân hàng', 'Độ phủ tài khoản rộng', 'Nhóm ngân hàng cốt lõi tập trung và có lãi', 'Khả năng tiếp cận số ngày càng mở rộng'] },
        { label: 'Giả thuyết điểm yếu (nội tại)', items: ['Mức độ tập trung', 'Hạn chế về vốn ở một số tổ chức', 'Cạnh tranh về nguồn vốn', 'Quản trị không đồng đều'] },
        { label: 'Cơ hội (bên ngoài)', items: ['Tài chính toàn diện', 'Dịch vụ cho SME', 'Thu nhập phí', 'Tài chính nhúng và tài chính xanh'] },
        { label: 'Thách thức (bên ngoài)', items: ['Chu kỳ tín dụng', 'Cú sốc nguồn vốn', 'Rủi ro an ninh mạng', 'Sự thay thế'] },
      ],
      note: 'Tài sản ngân hàng gần 196% và tín dụng gần 133% GDP (cuối tháng 9/2024, ước tính của Ngân hàng Thế giới được xác minh qua trích đoạn) cho thấy độ sâu; tăng trưởng dư nợ tín dụng 15,08% trong năm 2024 (nghiên cứu thứ cấp trích dẫn NHNN) không phải giải ngân hay lợi nhuận.',
      takeaway: 'Một cơ hội bên ngoài chỉ tạo ra giá trị nếu ngân hàng có năng lực và vốn để nắm bắt nó.',
    },
  },
  'cb-m4-45-02-risk-map': {
    enTitle: 'Strategic risks and their transmission',
    spec: {
      title: 'Rủi ro chiến lược và cách chúng lan truyền',
      steps: [
        { label: 'Suy thoái ngành', detail: 'Tác nhân kích hoạt: suy thoái bất động sản làm suy yếu người vay' },
        { label: 'Nợ xấu và dự phòng tăng', detail: 'Rủi ro bậc một tác động đến chất lượng tín dụng và thu nhập' },
        { label: 'Áp lực vốn', detail: 'Tổn thất và dự phòng làm giảm năng lực cho vay' },
        { label: 'Căng thẳng nguồn vốn', detail: 'Tin tức về tổn thất làm xói mòn niềm tin và khiến tiền gửi bị rút ra' },
        { label: 'NIM bị thu hẹp', detail: 'Thanh khoản khẩn cấp tốn kém: một tác động bậc hai' },
      ],
      note: 'Chạy lại lộ trình ở nhiều mức độ nghiêm trọng và bổ sung kiểm tra sức chịu đựng ngược; rủi ro lãi suất, an ninh mạng và quy định đi theo những lộ trình riêng. Khuôn khổ này mang tính khái niệm và không nêu số liệu rủi ro nào của Việt Nam.',
      takeaway: 'Hãy theo dõi rủi ro xuyên suốt các báo cáo tài chính và hành vi; đừng dừng lại ở dòng tài chính đầu tiên mà nó chạm tới.',
    },
  },
  'cb-m4-45-03-response-map': {
    enTitle: 'Strategic responses that change economics',
    spec: {
      title: 'Các phản ứng chiến lược làm thay đổi hiệu quả kinh tế',
      headers: ['Phản ứng', 'Thước đo tiến độ', 'Giới hạn an toàn'],
      rows: [
        { label: 'Tối ưu hóa nguồn vốn', a: 'Chi phí vốn và mức độ ổn định của số dư', b: 'Không chạy theo CASA bằng ưu đãi phi kinh tế hoặc số dư không ổn định' },
        { label: 'Đa dạng hóa thu nhập', a: 'Phí thuần định kỳ', b: 'Tách giá trị dịch vụ khỏi các khoản lãi một lần; theo dõi rủi ro ứng xử' },
        { label: 'Thiết kế lại hành trình', a: 'Số hành trình số được hoàn tất', b: 'Giảm các lần mở tài khoản thất bại trước khi tuyên bố cải thiện CAC' },
        { label: 'Củng cố tín dụng', a: 'Phạm vi cảnh báo sớm và dự phòng', b: 'Cải thiện cảnh báo sớm trước khi đẩy nhanh cho vay các ngành mục tiêu' },
        { label: 'Hoạch định vốn', a: 'RWA, bộ đệm vốn và lợi nhuận', b: 'Tăng trưởng và phân phối lợi nhuận cạnh tranh nhau về vốn; tăng vốn làm pha loãng chủ sở hữu' },
      ],
      note: 'Đặt số liệu cơ sở, mục tiêu, người chịu trách nhiệm và chỉ báo dẫn dắt cho từng phản ứng và rà soát các tương tác hằng quý. Đây là khuôn khổ năng lực, không phải tuyên bố rằng một ngân hàng cụ thể đã hoàn thành chúng.',
      takeaway: 'Một phản ứng chỉ đáng tin khi nó nêu rõ thước đo và giới hạn an toàn ngăn một KPI được cải thiện bằng cái giá của KPI khác.',
    },
  },
};
