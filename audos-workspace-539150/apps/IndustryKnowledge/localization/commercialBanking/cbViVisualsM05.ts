import type { ViVisualSpec } from '../visualLocalization';

// Vietnamese Learning Visual text for Commercial Banking Module 05 (Trends & Outlook), keyed by visualKind
// (commercialBankingM05VisualSpecs.ts). Text only: layout, kinds, tones and every number come from the English spec; each
// number in an English string appears in its Vietnamese counterpart (see visualLocalization.ts). Terminology follows
// viTerminology.ts. Not translated yet: cb-m5-53-03-vietnam-map (its `flows` ids are used as keys), the held kinds
// (CB_M5_HELD_KINDS) and lesson 5.4, which is under review hold REV-P0-12.

export const CB_VI_VISUALS_M05: Record<string, ViVisualSpec> = {
  'cb-m5-51-01-customer-evolution': {
    enTitle: 'How Banking Customers Are Changing',
    spec: {
      title: 'Khách hàng ngân hàng đang thay đổi như thế nào',
      root: { label: 'Mối quan hệ khách hàng bền vững', detail: 'Số dư duy trì đều đặn, mức độ gắn kết và khả năng giữ chân khách hàng lớn hơn chi phí thu hút và phục vụ' },
      drivers: [
        { label: 'Sự tiện lợi', detail: 'Truy cập tức thì, mở tài khoản nhanh và dịch vụ ít trở ngại nâng mức kỳ vọng cơ bản' },
        { label: 'Quyền kiểm soát và minh bạch', detail: 'Trạng thái, cảnh báo, chi phí và lựa chọn cấp quyền rõ ràng' },
        { label: 'Lòng tin và bảo mật', detail: 'Bảo mật, đối xử công bằng và hỗ trợ khắc phục là điều kiện để khách hàng chấp nhận sử dụng' },
        { label: 'Hỗ trợ kết hợp', detail: 'Con người hỗ trợ các quyết định hệ trọng bên cạnh kênh số tự phục vụ' },
        { label: 'Phù hợp với phân khúc', detail: 'Nhu cầu của hộ gia đình, SME và doanh nghiệp lớn, địa bàn, mức độ tự tin, khả năng tiếp cận và độ phức tạp' },
      ],
      note: 'Khoảng 87% người trưởng thành tại Việt Nam có tài khoản thanh toán vào năm 2024 (nguồn thứ cấp trích dẫn NHNN); con số này cho thấy khả năng tiếp cận rộng, không phải mức sử dụng thực tế hay sự tự tin khi dùng kênh số.',
      takeaway: 'Một sự cố về lòng tin có thể nhanh chóng đảo ngược vị thế được xây dựng nhờ sự tiện lợi, vì vậy tốc độ và sự bảo vệ phải được thiết kế cùng nhau.',
    },
  },
  'cb-m5-51-02-journey': {
    enTitle: 'Digital Banking and Customer Expectations',
    spec: {
      title: 'Ngân hàng số và kỳ vọng của khách hàng',
      steps: [
        { label: 'Mở tài khoản từ xa', detail: 'eKYC và sự đồng ý của khách hàng mở rộng phễu thu hút khách hàng nhờ giảm trở ngại khi mở tài khoản' },
        { label: 'Xác thực an toàn', detail: 'Xác minh khách hàng mà không chặn truy cập hợp lệ' },
        { label: 'Thanh toán và giao dịch', detail: 'Thanh toán QR và di động tạo ra hoạt động lặp lại và dữ liệu vận hành' },
        { label: 'Giải quyết sự cố', detail: 'Tự phục vụ kèm chuyển lên nhân viên hỗ trợ, xử lý gian lận và khắc phục' },
        { label: 'Quan hệ ngân hàng chính', detail: 'Sử dụng lặp lại, số dư sâu hơn và giữ chân khách hàng' },
      ],
      loop: 'Theo dõi tỷ lệ hoàn tất, thất bại, bỏ dở, khiếu nại và khắc phục ở từng giai đoạn; chỉ riêng lượt tải hay lượt đăng ký không chứng minh mức độ gắn kết.',
      note: 'Giao dịch không dùng tiền mặt tại Việt Nam tăng 56,57% về số lượng và 31,35% về giá trị trong năm 2024, còn thanh toán QR tăng 172% trong năm 2023 (báo cáo thứ cấp về dữ liệu của NHNN và hệ thống thanh toán); đây là chỉ báo tăng trưởng của kênh, không phải tỷ lệ chấp nhận sử dụng.',
      takeaway: 'Sự tiện lợi chỉ chuyển thành giá trị quan hệ khi toàn bộ hành trình đáng tin cậy, an toàn, dễ hiểu và đáng để lặp lại.',
    },
  },
  'cb-m5-51-03-segments': {
    enTitle: 'Emerging Customer Needs in Vietnam',
    spec: {
      title: 'Nhu cầu mới nổi của khách hàng tại Việt Nam',
      root: 'Khách hàng ngân hàng tại Việt Nam',
      rootDetail: 'Tài chính toàn diện, lòng tin và khả năng tiếp cận số quan trọng với mọi nhóm; nhu cầu tài chính cần đáp ứng và mô hình rủi ro thì khác nhau',
      groups: [
        { label: 'Hộ gia đình', detail: 'Dịch vụ phải luôn đơn giản, an toàn và dễ hiểu', items: ['Thanh toán an toàn', 'Tiết kiệm dự phòng khẩn cấp', 'Tín dụng có trách nhiệm', 'Hướng dẫn'] },
        { label: 'SME', detail: 'Dữ liệu dòng tiền có ích, nhưng tính thời vụ và tính phi chính thức cần đến đánh giá của con người', items: ['Khả năng nhìn thấy dòng tiền', 'Thanh toán và thu hộ', 'Vốn lưu động', 'Thẩm định thực tế'] },
        { label: 'Doanh nghiệp lớn', detail: 'Độ phức tạp duy trì vai trò của đội ngũ chuyên gia và đội ngũ quan hệ khách hàng', items: ['Thanh khoản', 'Ngân hàng giao dịch', 'Thương mại và ngoại hối', 'Dịch vụ quản lý rủi ro'] },
      ],
      note: 'Khoảng 87% người trưởng thành có tài khoản thanh toán vào năm 2024, một chỉ báo về khả năng tiếp cận rộng; nghiên cứu không đưa ra số liệu về khoảng thiếu hụt vốn của SME hay mức độ thâm nhập của cho vay bán lẻ.',
      takeaway: 'Hãy phân khúc theo nhu cầu tài chính, ràng buộc và rủi ro, vì sở hữu tài khoản mà không có giá trị sử dụng hay lòng tin chỉ là tài chính toàn diện hời hợt.',
    },
  },
  'cb-m5-52-01-operating-model': {
    enTitle: 'How Technology Is Transforming Banking',
    spec: {
      title: 'Công nghệ đang chuyển đổi ngân hàng như thế nào',
      trunk: [
        { label: 'Vấn đề có số liệu cơ sở', detail: 'Thời gian xử lý, lỗi, thao tác thủ công, chi phí, mức độ sẵn sàng của hệ thống, khiếu nại hoặc tổn thất' },
        { label: 'Nền tảng giao diện khách hàng', detail: 'Mở tài khoản số, eKYC, ứng dụng di động và thanh toán thời gian thực' },
      ],
      optionsLabel: 'Các cách hiện đại hóa hệ thống lõi',
      options: [
        { label: 'Thay thế', detail: 'Thay hệ thống lõi cũ bằng một nền tảng hiện đại' },
        { label: 'Chuyển đổi dần', detail: 'Chuyển sản phẩm và dữ liệu sang theo từng giai đoạn có kiểm soát' },
        { label: 'Các lớp mô-đun', detail: 'Xây dựng các dịch vụ mô-đun bao quanh hệ thống lõi cũ' },
      ],
      afterLabel: 'Điều mọi lộ trình phải quản lý',
      after: [
        { label: 'Rủi ro chuyển đổi', detail: 'Chuyển đổi hệ thống, vận hành song song, chuyển đổi dữ liệu, phụ thuộc nhà cung cấp, kiểm thử an ninh mạng và phương án dự phòng' },
        { label: 'Vận hành xử lý thẳng', detail: 'Ít khâu chuyển giao hơn, tự động hóa có kiểm soát ngoại lệ, chi phí đơn vị thấp hơn' },
      ],
      note: 'Điện toán đám mây có thể tăng tính linh hoạt nhưng đặt ra câu hỏi về mức độ tập trung, bảo mật và khả năng chống chịu; nghiên cứu không đưa ra tỷ lệ áp dụng điện toán đám mây, tự động hóa hay chuyển đổi hệ thống lõi tại Việt Nam.',
      takeaway: 'Một trạng thái ổn định ít tốn kém hơn có thể đòi hỏi khoản đầu tư chuyển đổi đáng kể, và không có kiến trúc nào tốt nhất cho mọi trường hợp.',
    },
  },
  'cb-m5-52-02-ai-value-chain': {
    enTitle: 'AI, Data Analytics, and Banking Innovation',
    spec: {
      title: 'AI, phân tích dữ liệu và đổi mới ngân hàng',
      steps: [
        { label: 'Quyết định và người chịu trách nhiệm', detail: 'Xác định quyết định được hỗ trợ và ai chịu trách nhiệm về quyết định đó' },
        { label: 'Dữ liệu', detail: 'Chất lượng, quyền truy cập hợp pháp và quyền riêng tư giới hạn những gì mô hình có thể làm' },
        { label: 'Kết quả của mô hình', detail: 'Mẫu hình hoặc nội dung được tạo ra cho tín dụng, gian lận, điều phối dịch vụ hoặc tài liệu' },
        { label: 'Quy tắc, ngưỡng và con người', detail: 'Mức độ tự động bị giới hạn theo hậu quả và mức độ bất định, có con người rà soát' },
        { label: 'Hành động với khách hàng và quyền yêu cầu xem xét lại', detail: 'Kết quả có thể giải thích, kèm phương án dự phòng an toàn và kênh yêu cầu xem xét lại' },
      ],
      loop: 'Giám sát độ chính xác, độ trôi của mô hình, cảnh báo sai, thiên lệch, các lần can thiệp thủ công và khiếu nại, rồi điều chỉnh mô hình hoặc giới hạn của nó.',
      note: 'Phân tích gian lận là một hạng mục đã định hình; AI tạo sinh vẫn chưa đồng đều. Năng lực dữ liệu và AI được ghi nhận của Techcombank không chứng minh việc triển khai trên toàn ngành.',
      takeaway: 'Hỗ trợ soạn thảo và phê duyệt tín dụng là hai bài toán kiểm soát khác nhau, nên mức độ tự động phải giảm khi hậu quả tăng lên.',
    },
  },
  'cb-m5-53-01-channel-evolution': {
    enTitle: 'The Evolution of Banking Distribution',
    spec: {
      title: 'Sự phát triển của kênh phân phối ngân hàng',
      root: { label: 'Một hành trình khách hàng cần điều phối', detail: 'Đánh giá tần suất, độ phức tạp, giá trị, mức độ hệ trọng về cảm xúc, nhu cầu xác minh danh tính và hậu quả khi thất bại' },
      question: 'Nhu cầu này thường lệ và ít rủi ro, hay phức tạp và đòi hỏi nhiều lòng tin?',
      branches: [
        { condition: 'Thường lệ và diễn ra thường xuyên', outcome: 'Kênh số tự phục vụ', detail: 'Tra cứu số dư, chuyển khoản và thanh toán QR chuyển sang các kênh di động chi phí thấp hơn' },
        { condition: 'Phức tạp hoặc hệ trọng', outcome: 'Chuyên viên quan hệ khách hàng hoặc chi nhánh', detail: 'Các khoản cấp tín dụng phức tạp, nhu cầu của SME, tái cơ cấu và giải quyết sự cố vẫn cần chuyên gia hỗ trợ' },
        { condition: 'Bắt đầu đơn giản, có thể phải chuyển cấp', outcome: 'Hành trình kết hợp', detail: 'Bối cảnh đi theo khách hàng từ ứng dụng đến chuyên gia mà không phải bắt đầu lại' },
      ],
      note: 'Số lượng giao dịch không dùng tiền mặt tại Việt Nam tăng 56,57% trong năm 2024 và thanh toán QR tăng 172% trong năm 2023; nghiên cứu không có số liệu đã xác minh về việc cắt giảm chi nhánh hay tỷ trọng kênh.',
      takeaway: 'Đóng một chi nhánh mà không thay thế chức năng tạo lòng tin của nó có thể làm giảm giá trị, vì vậy hãy tái định vị các kênh thay vì xóa bỏ chúng.',
    },
  },
  'cb-m5-53-02-revenue-models': {
    enTitle: 'How Banking Business Models Are Evolving',
    spec: {
      title: 'Mô hình kinh doanh ngân hàng đang thay đổi như thế nào',
      root: { label: 'Mức đóng góp của mối quan hệ (CLV)', detail: 'Giá trị sau khi tính nguồn vốn, doanh thu, rủi ro, chi phí phục vụ và khả năng giữ chân theo thời gian' },
      formula: 'Mức đóng góp = thu nhập + giá trị nguồn vốn − chi phí thu hút − chi phí phục vụ − tổn thất tín dụng kỳ vọng − gian lận − chi phí đối tác − chi phí vốn',
      drivers: [
        { label: 'Giá trị nguồn vốn', detail: 'Dòng tiền lương và hoạt động định kỳ làm tăng CASA chi phí thấp', op: '+' },
        { label: 'Thu nhập', detail: 'Chênh lệch lãi cho vay cộng phí giao dịch, thẻ, quản lý tài sản và tư vấn', op: '+' },
        { label: 'Chi phí thu hút khách hàng (CAC)', detail: 'Độ phủ qua đối tác có thể giảm CAC nhưng phát sinh phí và sự phụ thuộc', op: '−' },
        { label: 'Chi phí phục vụ', detail: 'Tự phục vụ chỉ giảm chi phí biên sau khi khách hàng chấp nhận sử dụng và quy trình cũ được loại bỏ', op: '−' },
        { label: 'Chi phí rủi ro và vốn', detail: 'Tổn thất tín dụng kỳ vọng, gian lận và vốn; bán chéo không phù hợp làm xói mòn lòng tin', op: '−' },
      ],
      note: 'Kênh số có thể làm CIR xấu đi trong giai đoạn đầu tư và cải thiện sau khi được chấp nhận sử dụng; nghiên cứu không định lượng CAC, CLV hay doanh thu tài chính nhúng ở cấp ngân hàng.',
      takeaway: 'Khối lượng bán chéo thiếu sự phù hợp hoặc kỷ luật rủi ro không phải là giá trị vòng đời khách hàng chất lượng cao.',
    },
  },
  'cb-m5-55-01-outlook': {
    enTitle: 'Where Is Commercial Banking Heading?',
    spec: {
      title: 'Ngân hàng thương mại đang hướng tới đâu?',
      headers: ['Số liệu', 'Đo lường điều gì', 'Nguồn và tình trạng'],
      rows: [
        { label: '15,08% (2024)', a: 'Tăng trưởng dư nợ tín dụng toàn hệ thống trong năm', b: 'Số liệu thực tế báo cáo từ dữ liệu của NHNN' },
        { label: '≈19% (tháng 6/2025)', a: 'Tăng trưởng tín dụng so với cùng kỳ năm trước tại thời điểm giữa năm', b: 'Báo cáo tham vấn Điều IV của nhân viên IMF; số liệu quan sát, không phải dự báo' },
        { label: '15% (2026)', a: 'Mục tiêu tăng trưởng tín dụng của NHNN', b: 'Mục tiêu chính sách, không phải số liệu thực tế hay quyền được hưởng của từng ngân hàng' },
        { label: '≈16% (2025–2026)', a: 'Ước tính tăng trưởng tín dụng toàn hệ thống', b: 'Fitch, mang tính dự phóng, kèm cảnh báo về đòn bẩy và chất lượng tài sản' },
      ],
      note: 'Tăng trưởng cho vay làm tăng RWA và nhu cầu nguồn vốn, và NIM phải được đọc sau rủi ro tín dụng và chi phí. Đừng bao giờ lấy trung bình các số liệu này hay biến mục tiêu của hệ thống thành mức tăng trưởng của một ngân hàng.',
      takeaway: 'Nhu cầu tạo ra cơ hội, nhưng nguồn vốn, chất lượng tài sản và vốn quyết định liệu tăng trưởng có trở thành lợi nhuận bền vững hay không.',
    },
  },
  'cb-m5-55-02-opportunity': {
    enTitle: 'Emerging Growth Opportunities for Banks',
    spec: {
      title: 'Các cơ hội tăng trưởng mới nổi cho ngân hàng',
      root: { label: 'Cơ hội tăng trưởng tiềm năng', detail: 'Ngân hàng số, bán lẻ và SME, dịch vụ giao dịch, phí, tài chính toàn diện, tài chính bền vững hoặc quan hệ đối tác hệ sinh thái' },
      question: 'Nhu cầu khách hàng, khả năng giành chiến thắng, hiệu quả kinh tế điều chỉnh theo rủi ro và năng lực đáp ứng quy định có cùng phù hợp không?',
      branches: [
        { condition: 'Tất cả đều phù hợp', outcome: 'Thử nghiệm, rồi mở rộng dựa trên bằng chứng', detail: 'Chạy thử nghiệm rẻ nhất có thể bác bỏ giả thuyết; mở rộng khi hành vi khách hàng và rủi ro đứng vững' },
        { condition: 'Hứa hẹn nhưng chưa chắc chắn', outcome: 'Giữ giá trị quyền chọn', detail: 'Dùng thí điểm, năng lực mô-đun hoặc quan hệ đối tác trong khi mức độ chấp nhận, chi tiết pháp lý hoặc kết quả rủi ro dần ổn định' },
        { condition: 'Một ràng buộc không đạt', outcome: 'Chưa mở rộng', detail: 'Chi phí thu hút khách hàng, tổn thất tín dụng, rủi ro ứng xử, sự phụ thuộc vào đối tác hoặc mức sử dụng vốn lớn hơn mức tăng trưởng bề ngoài' },
      ],
      note: 'Nghiên cứu không định lượng mọi quy mô thị trường, nên đây là công cụ ưu tiên hóa, không phải tuyên bố về quy mô thị trường; tài chính bền vững vẫn phụ thuộc vào bằng chứng và rủi ro.',
      takeaway: 'Đừng mở rộng chỉ vì một xu hướng đang thịnh hành; hãy mở rộng những gì vượt qua được các phép thử về nguồn vốn, rủi ro, vốn và ứng xử.',
    },
  },
  'cb-m5-55-03-strategy': {
    enTitle: 'Strategic Choices for the Banks of Tomorrow',
    spec: {
      title: 'Lựa chọn chiến lược cho ngân hàng tương lai',
      leftTitle: 'Lộ trình bền vững',
      rightTitle: 'Lối tắt làm suy yếu ngân hàng',
      rows: [
        { label: 'NIM cao hơn', a: 'Tăng CASA ổn định, định giá theo rủi ro và vốn, cải thiện cơ cấu', b: 'Khởi tạo các khoản vay lợi suất cao nhưng rủi ro hơn' },
        { label: 'Tăng trưởng cho vay nhanh hơn', a: 'Tăng trưởng ở nơi mức đóng góp vẫn giữ được sau chi phí tín dụng và vốn', b: 'Khối lượng cần nguồn vốn đắt đỏ, làm tăng RWA và dự phòng trong tương lai' },
        { label: 'CIR thấp hơn', a: 'Chuyển hoạt động định kỳ sang kênh có tổng chi phí thấp hơn và loại bỏ quy trình cũ', b: 'Đầu tư không đủ, hoặc vận hành song song các kênh có mức sử dụng thấp' },
        { label: 'ROE cao hơn', a: 'Đánh giá lợi nhuận so với CAR, thanh khoản và kết quả kiểm tra sức chịu đựng', b: 'Tăng đòn bẩy và thu hẹp dư địa vốn' },
        { label: 'Thêm thu nhập phí', a: 'Dịch vụ phù hợp, đáng tin cậy mà khách hàng coi trọng', b: 'Sản phẩm phức tạp làm tăng rủi ro ứng xử' },
        { label: 'Nợ xấu gia tăng', a: 'Siết chặt hoặc định giá lại rủi ro, tăng cường thu hồi nợ, bảo vệ thanh khoản', b: 'Chạy theo khối lượng để tăng trưởng vượt qua vấn đề' },
      ],
      note: 'Mọi công cụ điều hành đều đi qua bảng cân đối và báo cáo kết quả kinh doanh (P&L); năm tình huống tương tác của chương là kịch bản giảng dạy giả định, không phải dữ liệu hay mục tiêu thật của ngân hàng.',
      takeaway: 'Tối ưu hóa một tỷ số có thể làm suy yếu ngân hàng, nên mọi công cụ thúc đẩy tăng trưởng hay lợi nhuận đều cần giới hạn an toàn về tín dụng, nguồn vốn, vốn và lòng tin.',
    },
  },
};
