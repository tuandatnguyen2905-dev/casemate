# Case Drill → Charts: Audio Mode — kiểm kê & báo cáo narration

Ngày tạo: 2026-11-21 · Phạm vi: chỉ Case Drill → Charts · Trạng thái: bản nháp (Draft), **chưa publish**.

## 1. Tóm tắt

- Tổng số bài Charts học viên truy cập được (mọi độ khó, mọi dạng trả lời): **226**.
- Script narration đã tạo: **226** (Context + Question, theo question ID và phiên bản nội dung). Script vượt kiểm tra trước khi tạo audio: **226/226**.
- Audio đã tạo và lưu sẵn: **226/226** bài (352 file MP3, tổng ~180 phút).
- Đã kiểm chứng (phiên âm ngược từng file và so với script): **226/226** bài; độ khớp từ ngữ thấp nhất 0.81, trung bình 0.98; không thiếu con số nào.
- ID bị chặn: **0**.
- Rà soát thủ công: charts-103 (Bếp Việt Foods) và charts-113 (Tâm Việt Bank) — giọng tiếng Anh đọc tên riêng tiếng Việt theo cách gần đúng ("Bep Viet", "Tam/Tom Viet"); hai bộ phiên âm (Whisper, Deepgram) cho kết quả giống nhau, toàn bộ số liệu và câu chữ còn lại khớp, nên vẫn dùng.
- Giọng đọc: ElevenLabs `eleven_v3`, giọng "Matilda" (nữ, chuyên nghiệp, phong cách người phỏng vấn), đồng nhất cho mọi bài. Tổng 158,604 ký tự script (~13 USD phí tạo giọng + ~1.2 USD phí phiên âm kiểm chứng).

## 2. Cơ cấu kho bài

| Nhóm | Số bài |
|---|---|
| Độ khó (dữ liệu gốc): easy | 85 |
| Độ khó (dữ liệu gốc): medium | 34 |
| Độ khó (dữ liệu gốc): hard | 74 |
| Độ khó (dữ liệu gốc): expert | 33 |
| Dạng trả lời: MCQ | 118 |
| Dạng trả lời: structured (4-field) | 107 |
| Dạng trả lời: open text | 1 |
| Số exhibit: 1 | 113 |
| Số exhibit: 2 | 110 |
| Số exhibit: 3 | 3 |
| Có Context riêng (có tab Context) | 126 |
| Không có Context riêng (chỉ tab Question) | 100 |
| Câu hỏi nhiều vế (≥2 yêu cầu) | 206 |
| Thuộc Case Journey | 25 |

## 3. Template dùng chung

| Họ bài | Số bài | Cách hiển thị / narration |
|---|---|---|
| charts-NNN (Easy/Medium/Hard bank) | 115 | Phần lớn không có Context riêng (bối cảnh được hiển thị như ghi chú đọc exhibit) → chỉ có tab Question; Medium/Hard dạng 2 exhibit, trả lời có cấu trúc. |
| E-CH (Easy chart bank) | 51 | MCQ 1 exhibit. Context = tên bài + bối cảnh công ty; Question = câu hỏi + ghi chú đọc exhibit. |
| charts-expert (Expert, structured) | 31 | 2–3 exhibit liên kết, trả lời 4 ô (quan sát/insight/bằng chứng/hàm ý). Context gồm client objective. |
| charts-journey (Case Journeys) | 25 | 2 exhibit, trả lời có cấu trúc. Context gồm Case Journey: vai trò, quyết định, khung thời gian (đúng như khung hiển thị). |
| Standalone (legacy / hard insight) | 4 | Bài lẻ, 2 exhibit, trả lời có cấu trúc. |

## 4. Ngoại lệ

- **3 exhibit**: charts-journey-706, charts-legacy-lotushome-201, charts-expert-201 — dùng điều hướng so sánh exhibit có sẵn ở cột trái.
- **Không có Context riêng**: 100 bài (họ charts-NNN) — bỏ tab/đoạn Context, không tự bịa bối cảnh; câu dẫn exhibit được đọc trong đoạn Question.
- **Dạng trả lời khác MCQ/có cấu trúc**: charts-carecircle-retention-route-v1 (open text).
- **Câu hỏi nhiều vế**: đọc đầy đủ từng vế theo đúng thứ tự (kiểm tra tự động: số dấu "?" và mọi con số/đơn vị/tham chiếu exhibit phải còn nguyên).
- Ghi chú: 48 bản ghi Hard có trạng thái "Archived" trong dữ liệu gốc nhưng được thư viện khôi phục và hiển thị cho học viên, nên đã nằm trong 226 bài trên.

## 5. Quy tắc script & phiên bản

- Nguồn duy nhất là bản ghi câu hỏi hiện tại, qua đúng hàm trình bày mà học viên nhìn thấy (`presentLibraryQuestion`, làm rõ đơn vị). Không dùng đáp án, giải thích, worked answer, gợi ý; không đọc giá trị trong biểu đồ; lựa chọn MCQ chỉ hiển thị trong ô trả lời.
- Context: tên bài, bối cảnh, client objective / Case Journey / key terms nếu bài đang hiển thị. Question: câu hỏi đầy đủ + hướng dẫn bắt buộc + ghi chú đọc exhibit + định dạng trả lời, giữ nguyên thứ tự.
- Chuẩn hoá để đọc (không đổi nghĩa): VND → "Vietnamese dong", FY2026 → "fiscal year 2026", % → "percent", → → "then", SKU/ARR/NOPBT/CAGR/P&L… được đọc đầy đủ.
- Kiểm tra trước khi tạo audio: con số, dấu âm, đơn vị (%, tỷ/triệu/nghìn, VND/USD), tham chiếu Exhibit, kỳ (Q1, FY), viết tắt, tên riêng, số vế câu hỏi, độ dài, không lộ đáp án.
- Mỗi bài lưu: phiên bản script (`charts-narration-v1`), hash nguồn (question ID + nội dung hiển thị) và hash script từng đoạn. Khi mở bài, ứng dụng tính lại từ nội dung hiện tại; lệch bất kỳ hash nào → không phát audio cũ, hiện transcript + "Switch to text". Khi sửa nội dung, chạy lại quy trình tạo script + audio cho các ID bị lệch.
- Audio được tạo trước và lưu ở kho file công khai của workspace; mở bài không bao giờ gọi tạo giọng.

## 6. ID bị chặn & phương án dự phòng

Không có ID nào bị chặn. Dự phòng chung (cho nội dung sửa sau này hoặc lỗi phát): transcript luôn mở được, nút "Switch to text" luôn hiển thị, kèm ghi chú rõ ràng.

## 7. Kiểm thử

- 29/29 kiểm tra tự động đạt trên desktop (1440×900) và mobile (390×844): chooser chỉ có 2 nút trực tiếp, không có "Continue to Charts"; Audio Mode mở đúng bài đầu tiên theo thứ tự thư viện (E-CH-001); không tự phát; Play/Pause, Replay, tua, tốc độ (1.0x → 1.25x → 1.5x → 2x → 0.75x), tab Context/Question, transcript 2 phần có nhãn; câu hỏi nằm cạnh biểu đồ và hiện trong màn hình đầu trên laptop; mobile xếp player → exhibit → câu trả lời.
- Chuyển chế độ giữa chừng: giữ nguyên câu hỏi, giữ đáp án đã chọn/đã gõ (MCQ và bài 4 ô), không tạo attempt mới; chuyển sang Text Mode hoặc rời bài thì audio dừng ngay.
- Lỗi phát (chặn file audio): hiện thông báo, mở transcript, nút "Switch to text" hiện ngay. Nội dung bị sửa (giả lập): không phát audio cũ, chuyển sang transcript.
- Nộp bài ở Audio Mode: đúng 1 lần ghi attempt với đúng question ID, phần chấm điểm/feedback dùng nguyên luồng cũ (logic chấm không thay đổi).
- Giới hạn: Draft Preview yêu cầu đăng nhập founder nên không mở được từ môi trường build. Các kiểm tra trên chạy trong harness dựng từ chính bundle đang live (cùng React, ExhibitRenderer, CaseQuestionFirst, CaseResultView…) cộng với code mới; `ExpertDrillExperience` (107 bài có cấu trúc) chạy đúng code mới, còn bố cục MCQ của Question Library được kiểm bằng bản dựng lại trong harness và rà soát code. Founder nên mở Draft Preview → Case Drill → Charts để xác nhận lần cuối trước khi publish.

## 8. Kiểm kê đầy đủ theo question ID

| # | ID | Tiêu đề | Độ khó | Dạng trả lời | Exhibit | Context | Nhiều vế | Journey | Phiên bản nội dung (hash) | Audio | Kiểm chứng |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | charts-journey-701 | Arctis - Reading a Decline Inside a Growing Category | hard | structured (4-field) | 2 (combo/waterfall) | có | có | jrn-01 | `1ef7fe7c62589a` | 92s | 0.98 |
| 2 | charts-journey-704 | Velta - Revenue Up, Gross Profit Down | hard | structured (4-field) | 2 (grouped-bar/combo) | có | có | jrn-02 | `16a03c78b3a4da` | 72s | 0.98 |
| 3 | charts-journey-706 | Velta - Setting the FY2027 Channel Plan | expert | structured (4-field) | 3 (multi-line/line/waterfall) | có | có | jrn-02 | `0b7b42882deebb` | 80s | 0.97 |
| 4 | charts-journey-707 | Solara - Awareness Rose, Purchase Fell | hard | structured (4-field) | 2 (multi-line/donut) | có | có | jrn-03 | `0b12c3f72bb0c5` | 65s | 1.00 |
| 5 | charts-journey-711 | Verdant Foods - Which Inventory Is the Problem | hard | structured (4-field) | 2 (vertical-bar/scatter) | có | có | jrn-04 | `1abb50469e0875` | 78s | 0.95 |
| 6 | charts-journey-713 | Anvil Components - Finding the Constraint | hard | structured (4-field) | 2 (vertical-bar/line) | có | có | jrn-05 | `00d7ebfe52f8ce` | 62s | 0.95 |
| 7 | charts-journey-717 | Kaya Foods - Who Already Owns This Market | hard | structured (4-field) | 2 (pie/grouped-bar) | có | không | jrn-06 | `0a715f4dcf2b1a` | 56s | 0.99 |
| 8 | charts-journey-719 | Orbita - Where the Base Is Moving | hard | structured (4-field) | 2 (vertical-bar/grouped-bar) | có | có | jrn-07 | `099850056ad9a9` | 67s | 0.98 |
| 9 | charts-journey-722 | Lotus Court - Revenue per Store Is the Wrong Measure | hard | structured (4-field) | 2 (grouped-bar/horizontal-bar) | có | có | jrn-08 | `145c9af36712d5` | 65s | 0.98 |
| 10 | charts-journey-726 | Tutorloop - Free Trial or Paid Trial | hard | structured (4-field) | 2 (multi-line/stacked-100) | có | có | jrn-09 | `0c78e79aaed0da` | 59s | 0.98 |
| 11 | charts-journey-728 | Swiftline - Where the Service Gap Lives | hard | structured (4-field) | 2 (combo/pie) | có | có | jrn-10 | `0b32552f7b221a` | 62s | 0.96 |
| 12 | charts-journey-731 | Corvex Cloud - What the 18% Growth Is Hiding | hard | structured (4-field) | 2 (waterfall/kpi-scorecard) | có | không | jrn-11 | `1b48dc8eba5052` | 70s | 0.99 |
| 13 | charts-journey-735 | Harborlight Clinics - The Week Inside the Average | hard | structured (4-field) | 2 (combo/vertical-bar) | có | có | jrn-12 | `16cb1afb41e346` | 57s | 0.95 |
| 14 | charts-journey-737 | VitaFlow - Which Moment Is Actually Unowned | hard | structured (4-field) | 2 (bubble/stacked-bar) | có | có | jrn-13 | `020f3853329a58` | 82s | 0.96 |
| 15 | charts-journey-740 | SweetVale - Leading the Part That Stopped Growing | hard | structured (4-field) | 2 (bubble/treemap) | có | có | jrn-14 | `0ae422fcf69c5c` | 76s | 0.96 |
| 16 | charts-journey-743 | CleanCo - Growing Units, Losing Value | hard | structured (4-field) | 2 (stacked-100/combo) | có | có | jrn-15 | `115a1ccb833fcf` | 91s | 0.96 |
| 17 | charts-journey-746 | ActiveShield - Which Skin Benefit to Own | hard | structured (4-field) | 2 (bubble/multi-line) | có | có | jrn-16 | `1879d847ea61c3` | 81s | 0.99 |
| 18 | charts-journey-749 | PacificBev - Flat Revenue, Better Profit | hard | structured (4-field) | 2 (combo/financial-table) | có | không | jrn-17 | `0e728ace2284b5` | 72s | 0.91 |
| 19 | charts-journey-752 | PacificBev - The Year After the Peak | hard | structured (4-field) | 2 (combo/financial-table) | có | có | jrn-18 | `1445024617bca0` | 78s | 0.95 |
| 20 | charts-journey-755 | FrostyBite - Losing Share Without Losing Volume | hard | structured (4-field) | 2 (combo/financial-table) | có | có | jrn-19 | `052e0f971961aa` | 70s | 0.92 |
| 21 | charts-journey-758 | BakePure - Known but No Longer Wanted | hard | structured (4-field) | 2 (stacked-100/multi-line) | có | không | jrn-20 | `02407390c07f4a` | 73s | 0.96 |
| 22 | charts-journey-761 | DairyPeak - The Channel That Grew and Then Closed | hard | structured (4-field) | 2 (combo/multi-line) | có | không | jrn-21 | `0ae5dd19fb5ebe` | 69s | 0.95 |
| 23 | charts-journey-764 | PawJoy - Revenue Up, Profit Down | hard | structured (4-field) | 2 (combo/treemap) | có | không | jrn-22 | `1b9bae07c3904e` | 69s | 0.97 |
| 24 | charts-journey-767 | Summit Gear - The Division That Peaked | hard | structured (4-field) | 2 (grouped-bar/multi-line) | có | có | jrn-23 | `1328390980002b` | 79s | 0.99 |
| 25 | charts-journey-770 | TangyTaste - Awareness or Conversion | hard | structured (4-field) | 2 (heatmap/scatter) | có | không | jrn-24 | `03cc10ec3d5a0e` | 84s | 0.92 |
| 26 | charts-legacy-novabrew-401 | NovaBrew - Growth Quality and Margin Risk | hard | structured (4-field) | 2 (financial-table/waterfall) | có | có | - | `17c295f3b17979` | 53s | 0.99 |
| 27 | charts-hard-insight-401 | Lantern Retail - Online Growth Quality | hard | structured (4-field) | 2 (grouped-bar/line) | có | có | - | `071d69c5a64e62` | 48s | 0.99 |
| 28 | E-CH-001 | Outpatient Care Quarterly Visits Trend | easy | MCQ | 1 (line) | có | có | - | `1e68ecd33016a4` | 36s | 0.91 |
| 29 | E-CH-002 | Recycled Packaging Gross Profit By Line | easy | MCQ | 2 (grouped-bar/grouped-bar) | có | có | - | `14fac79094d4ba` | 46s | 1.00 |
| 30 | E-CH-003 | Inland Freight Channel Share Shift | easy | MCQ | 1 (grouped-bar) | có | có | - | `195d4118351af4` | 45s | 0.88 |
| 31 | E-CH-004 | Frozen Meals Contribution Bridge | easy | MCQ | 1 (waterfall) | có | có | - | `12cc0fbad646ee` | 42s | 0.96 |
| 32 | E-CH-005 | Rooftop Energy Demand And Contribution | easy | MCQ | 1 (scatter) | có | có | - | `073b4eb9c2ea8d` | 47s | 0.98 |
| 33 | E-CH-006 | Specialty Beverages Region-Month Score Heatmap | easy | MCQ | 1 (heatmap) | có | có | - | `0d7dba7da707ff` | 47s | 0.94 |
| 34 | E-CH-007 | Telehealth Site Target Shortfall | easy | MCQ | 1 (bullet) | có | có | - | `17bd68e7377f7b` | 40s | 1.00 |
| 35 | E-CH-008 | Textiles Regional Share Slope | easy | MCQ | 1 (slope) | có | có | - | `1f7bacf08b2d73` | 41s | 0.96 |
| 36 | E-CH-009 | Electric Buses Monthly Demand Swing | easy | MCQ | 1 (area) | có | có | - | `1fe6077cbe701a` | 33s | 0.98 |
| 37 | E-CH-010 | Digital Payments Application Funnel | easy | MCQ | 1 (funnel) | có | có | - | `0f080d2ed5a566` | 40s | 0.98 |
| 38 | E-CH-011 | Online Education Segment Concentration | easy | MCQ | 1 (donut) | có | có | - | `0b87d9d315608a` | 49s | 1.00 |
| 39 | E-CH-012 | Container Terminals Volume And Order Value | easy | MCQ | 1 (combo) | có | có | - | `0638aa7e715e66` | 32s | 0.94 |
| 40 | E-CH-013 | Fresh Produce Quarterly Units Trend | easy | MCQ | 1 (line) | có | có | - | `1ae45a426fdb60` | 33s | 0.98 |
| 41 | E-CH-014 | Generic Medicines Gross Profit By Line | easy | MCQ | 2 (grouped-bar/grouped-bar) | có | có | - | `1133cf0de69898` | 44s | 0.94 |
| 42 | E-CH-015 | Hospitality Channel Share Shift | easy | MCQ | 1 (grouped-bar) | có | có | - | `037fed3b0373b5` | 47s | 0.99 |
| 43 | E-CH-016 | Mobile Connectivity Contribution Bridge | easy | MCQ | 1 (waterfall) | có | có | - | `0959c13b0f5c0d` | 44s | 1.00 |
| 44 | E-CH-017 | Industrial Metals Demand And Contribution | easy | MCQ | 1 (scatter) | có | có | - | `1914664acb8ca2` | 46s | 0.98 |
| 45 | E-CH-018 | Skincare Retail Region-Month Score Heatmap | easy | MCQ | 1 (heatmap) | có | có | - | `01f5ee0cd792e3` | 46s | 0.92 |
| 46 | E-CH-019 | Last-Mile Delivery Site Target Shortfall | easy | MCQ | 1 (bullet) | có | có | - | `034a1352c3b556` | 42s | 1.00 |
| 47 | E-CH-020 | Quick-Service Dining Regional Share Slope | easy | MCQ | 1 (slope) | có | có | - | `139b32fcb35799` | 42s | 0.94 |
| 48 | E-CH-021 | Rental Housing Monthly Demand Swing | easy | MCQ | 1 (area) | có | có | - | `073c2dcbf688ff` | 32s | 0.94 |
| 49 | E-CH-022 | Municipal Utilities Application Funnel | easy | MCQ | 1 (funnel) | có | có | - | `07325e403ce978` | 42s | 0.91 |
| 50 | E-CH-023 | SME Lending Segment Concentration | easy | MCQ | 1 (donut) | có | có | - | `0d553dcbed73b0` | 55s | 0.97 |
| 51 | E-CH-024 | Chilled Dairy Volume And Order Value | easy | MCQ | 1 (combo) | có | có | - | `0c64c233100b88` | 31s | 0.90 |
| 52 | E-CH-025 | Seafood Exports Quarterly Shipments Trend | easy | MCQ | 1 (line) | có | có | - | `1d6f7c5cdacf30` | 35s | 0.99 |
| 53 | E-CH-026 | Power Tools Gross Profit By Line | easy | MCQ | 2 (grouped-bar/grouped-bar) | có | có | - | `1f7d7958d62df3` | 43s | 0.86 |
| 54 | E-CH-044 | Battery Storage Regional Share Slope | easy | MCQ | 1 (slope) | có | có | - | `00edb1a5e0202c` | 41s | 0.99 |
| 55 | E-CH-045 | Industrial Chemicals Monthly Demand Swing | easy | MCQ | 1 (area) | có | có | - | `049431cd6702d5` | 32s | 1.00 |
| 56 | E-CH-046 | Fitness Clubs Application Funnel | easy | MCQ | 1 (funnel) | có | có | - | `021f3c4ebde7b7` | 43s | 0.98 |
| 57 | E-CH-047 | Online Travel Segment Concentration | easy | MCQ | 1 (donut) | có | có | - | `146e5986eee86e` | 50s | 1.00 |
| 58 | E-CH-048 | Grocery E-Commerce Volume And Order Value | easy | MCQ | 1 (combo) | có | có | - | `1e9a64ab519247` | 32s | 1.00 |
| 59 | E-CH-049 | Medical Labs Quarterly Visits Trend | easy | MCQ | 1 (line) | có | có | - | `088b04a542ec68` | 34s | 0.92 |
| 60 | E-CH-050 | Aquaculture Gross Profit By Line | easy | MCQ | 2 (grouped-bar/grouped-bar) | có | không | - | `1a377bddbeaee3` | 51s | 0.98 |
| 61 | E-CH-051 | Packaged Snacks Channel Share Shift | easy | MCQ | 1 (grouped-bar) | có | có | - | `17ac0548429cc3` | 46s | 0.86 |
| 62 | E-CH-052 | Passenger Rail Contribution Bridge | easy | MCQ | 1 (waterfall) | có | có | - | `0bedc996d0c31e` | 43s | 0.99 |
| 63 | E-CH-053 | Elder Care Demand And Contribution | easy | MCQ | 1 (scatter) | có | có | - | `12fe7d954064bd` | 46s | 0.94 |
| 64 | E-CH-054 | Critical Minerals Region-Month Score Heatmap | easy | MCQ | 1 (heatmap) | có | có | - | `0632464fa29def` | 45s | 0.94 |
| 65 | E-CH-055 | Apparel Retail Site Target Shortfall | easy | MCQ | 1 (bullet) | có | có | - | `0b404686de3d0a` | 41s | 0.91 |
| 66 | E-CH-056 | Paper Packaging Regional Share Slope | easy | MCQ | 1 (slope) | có | có | - | `1803ae7db8517b` | 41s | 1.00 |
| 67 | E-CH-057 | Cybersecurity Monthly Demand Swing | easy | MCQ | 1 (area) | có | có | - | `1a0d92022e5dfc` | 32s | 1.00 |
| 68 | E-CH-058 | Fleet Leasing Application Funnel | easy | MCQ | 1 (funnel) | có | có | - | `19676e9b4f163c` | 42s | 0.94 |
| 69 | E-CH-059 | Artisan Bakery Segment Concentration | easy | MCQ | 1 (donut) | có | có | - | `1fc54a8eb3990e` | 48s | 0.95 |
| 70 | E-CH-060 | Warehouse Automation Volume And Order Value | easy | MCQ | 1 (combo) | có | có | - | `1e8bd2eb4bc2c6` | 34s | 0.98 |
| 71 | E-CH-061 | Ready-To-Drink Tea Quarterly Units Trend | easy | MCQ | 1 (line) | có | có | - | `05737094b89392` | 35s | 0.95 |
| 72 | E-CH-062 | Children's Apparel Gross Profit By Line | easy | MCQ | 2 (grouped-bar/grouped-bar) | có | có | - | `1eb3a47d0bec84` | 44s | 1.00 |
| 73 | E-CH-063 | Island Transport Channel Share Shift | easy | MCQ | 1 (grouped-bar) | có | có | - | `0e322f131ee950` | 46s | 0.99 |
| 74 | E-CH-064 | Solar Retail Contribution Bridge | easy | MCQ | 1 (waterfall) | có | có | - | `124e241bfac321` | 42s | 0.99 |
| 75 | E-CH-065 | Cloud Infrastructure Demand And Contribution | easy | MCQ | 1 (scatter) | có | có | - | `1683d165c8bb50` | 46s | 0.98 |
| 76 | E-CH-066 | Dental Care Region-Month Score Heatmap | easy | MCQ | 1 (heatmap) | có | có | - | `0c58a72e99f8cd` | 44s | 0.94 |
| 77 | E-CH-067 | Plant-Based Food Site Target Shortfall | easy | MCQ | 1 (bullet) | có | có | - | `0d3840614163ca` | 40s | 0.97 |
| 78 | E-CH-068 | Fiber Broadband Regional Share Slope | easy | MCQ | 1 (slope) | có | có | - | `1582d9e47e2937` | 41s | 1.00 |
| 79 | charts-carecircle-retention-route-v1 | CareCircle retention evidence | medium | open text | 2 (treemap/grouped-bar) | có | có | - | `175e6557e68652` | 28s | 0.89 |
| 80 | charts-001 | Retail Channels Performance Comparison | easy | MCQ | 1 (bar) | không | có | - | `1db57dd6016f5f` | 29s | 1.00 |
| 81 | charts-002 | Retail Channels Four-Year Trend | medium | MCQ | 1 (line) | không | có | - | `13a25da1be421c` | 22s | 1.00 |
| 82 | charts-003 | Retail Channels Mix Analysis | hard | structured (4-field) | 2 (pie/grouped-bar) | không | có | - | `1d0017b39d6506` | 48s | 1.00 |
| 83 | charts-004 | Retail Channels Profitability Table | easy | MCQ | 1 (table) | không | có | - | `0921f7744f0242` | 32s | 1.00 |
| 84 | charts-005 | Product Segments Performance Comparison | medium | MCQ | 1 (bar) | không | có | - | `012366c58558ac` | 28s | 1.00 |
| 85 | charts-006 | Product Segments Four-Year Trend | hard | structured (4-field) | 2 (line/grouped-bar) | không | có | - | `08cb08465edaf4` | 39s | 1.00 |
| 86 | charts-007 | Product Segments Mix Analysis | easy | MCQ | 1 (pie) | không | có | - | `1825e35c9db2c0` | 30s | 0.99 |
| 87 | charts-008 | Product Segments Profitability Table | medium | MCQ | 1 (table) | không | có | - | `128559dd2f3066` | 32s | 1.00 |
| 88 | charts-009 | Customer Cohorts Performance Comparison | hard | structured (4-field) | 2 (bar/grouped-bar) | không | có | - | `147ca46ad01bcb` | 47s | 1.00 |
| 89 | charts-010 | Customer Cohorts Four-Year Trend | easy | MCQ | 1 (line) | không | có | - | `09d8f3610c3058` | 23s | 1.00 |
| 90 | charts-011 | Customer Cohorts Mix Analysis | medium | MCQ | 1 (pie) | không | có | - | `194a43ba0ee1b0` | 32s | 1.00 |
| 91 | charts-012 | Customer Cohorts Profitability Table | hard | structured (4-field) | 2 (table/grouped-bar) | không | có | - | `17328ad3291433` | 50s | 1.00 |
| 92 | charts-013 | Vietnamese Regions Performance Comparison | easy | MCQ | 1 (bar) | không | có | - | `0a9d2f663a00c3` | 29s | 0.98 |
| 93 | charts-014 | Vietnamese Regions Four-Year Trend | medium | MCQ | 1 (line) | không | có | - | `0c2b8db763f6d7` | 23s | 1.00 |
| 94 | charts-015 | Vietnamese Regions Mix Analysis | hard | structured (4-field) | 2 (pie/grouped-bar) | không | có | - | `01657715bd0960` | 50s | 1.00 |
| 95 | charts-016 | Vietnamese Regions Profitability Table | easy | MCQ | 1 (table) | không | có | - | `04db9f6f3abe5e` | 33s | 1.00 |
| 96 | charts-017 | Store Formats Performance Comparison | medium | MCQ | 1 (bar) | không | có | - | `010d867ec6e941` | 28s | 0.98 |
| 97 | charts-018 | Store Formats Four-Year Trend | hard | structured (4-field) | 2 (line/grouped-bar) | không | có | - | `1c859b46dcc22b` | 39s | 0.99 |
| 98 | charts-019 | Store Formats Mix Analysis | easy | MCQ | 1 (pie) | không | có | - | `18d22736ec6859` | 30s | 1.00 |
| 99 | charts-020 | Store Formats Profitability Table | medium | MCQ | 1 (table) | không | có | - | `0bb1857305791e` | 31s | 0.99 |
| 100 | charts-021 | Digital Products Performance Comparison | hard | structured (4-field) | 2 (bar/grouped-bar) | không | có | - | `1bd00e7869a1af` | 46s | 1.00 |
| 101 | charts-022 | Digital Products Four-Year Trend | easy | MCQ | 1 (line) | không | có | - | `1af27236c0e52d` | 22s | 1.00 |
| 102 | charts-023 | Digital Products Mix Analysis | medium | MCQ | 1 (pie) | không | có | - | `10ba8a02df2862` | 31s | 1.00 |
| 103 | charts-024 | Digital Products Profitability Table | hard | structured (4-field) | 2 (table/grouped-bar) | không | có | - | `0104064cad9ab9` | 50s | 0.99 |
| 104 | charts-025 | Delivery Routes Performance Comparison | easy | MCQ | 1 (bar) | không | có | - | `07a8cfe82baa0d` | 27s | 1.00 |
| 105 | charts-026 | Delivery Routes Four-Year Trend | medium | MCQ | 1 (line) | không | có | - | `0bb325f21dd409` | 22s | 0.99 |
| 106 | charts-027 | Delivery Routes Mix Analysis | hard | structured (4-field) | 2 (pie/grouped-bar) | không | có | - | `18b43a7f472d20` | 47s | 1.00 |
| 107 | charts-028 | Delivery Routes Profitability Table | easy | MCQ | 1 (table) | không | có | - | `114fe3dd673713` | 31s | 1.00 |
| 108 | charts-029 | Hotel Markets Performance Comparison | medium | MCQ | 1 (bar) | không | có | - | `1fe521d1a7d2ff` | 28s | 1.00 |
| 109 | charts-030 | Hotel Markets Four-Year Trend | hard | structured (4-field) | 2 (line/grouped-bar) | không | có | - | `0ce0e74a4dc703` | 39s | 1.00 |
| 110 | charts-031 | Hotel Markets Mix Analysis | easy | MCQ | 1 (pie) | không | có | - | `12e91c006c716b` | 29s | 1.00 |
| 111 | charts-032 | Hotel Markets Profitability Table | medium | MCQ | 1 (table) | không | có | - | `09de654df4ff19` | 31s | 1.00 |
| 112 | charts-033 | Banking Products Performance Comparison | hard | structured (4-field) | 2 (bar/grouped-bar) | không | có | - | `11c5d2290796bd` | 47s | 1.00 |
| 113 | charts-034 | Banking Products Four-Year Trend | easy | MCQ | 1 (line) | không | có | - | `10522787a0407f` | 21s | 1.00 |
| 114 | charts-035 | Banking Products Mix Analysis | medium | MCQ | 1 (pie) | không | có | - | `179fabe8eff249` | 31s | 0.99 |
| 115 | charts-036 | Banking Products Profitability Table | hard | structured (4-field) | 2 (table/grouped-bar) | không | có | - | `1ab47e09ecfac4` | 49s | 1.00 |
| 116 | charts-037 | Clinic Services Performance Comparison | easy | MCQ | 1 (bar) | không | có | - | `0fcfe2bde9ea75` | 28s | 1.00 |
| 117 | charts-038 | Clinic Services Four-Year Trend | medium | MCQ | 1 (line) | không | có | - | `024050b62b5733` | 22s | 0.99 |
| 118 | charts-039 | Clinic Services Mix Analysis | hard | structured (4-field) | 2 (pie/grouped-bar) | không | có | - | `1a8295fc14480c` | 47s | 1.00 |
| 119 | charts-040 | Clinic Services Profitability Table | easy | MCQ | 1 (table) | không | có | - | `14eee67df5698c` | 32s | 0.99 |
| 120 | charts-041 | Mobility Modes Performance Comparison | medium | MCQ | 1 (bar) | không | có | - | `1ecf43fa41c06c` | 28s | 1.00 |
| 121 | charts-042 | Mobility Modes Four-Year Trend | hard | structured (4-field) | 2 (line/grouped-bar) | không | có | - | `1dbce77ba97b6f` | 38s | 0.99 |
| 122 | charts-043 | Mobility Modes Mix Analysis | easy | MCQ | 1 (pie) | không | có | - | `1a0b6a2f99fb8a` | 30s | 1.00 |
| 123 | charts-044 | Mobility Modes Profitability Table | medium | MCQ | 1 (table) | không | có | - | `08dc36c27e756c` | 32s | 1.00 |
| 124 | charts-045 | Software Plans Performance Comparison | hard | structured (4-field) | 2 (bar/grouped-bar) | không | có | - | `05bc92a7c421b0` | 46s | 1.00 |
| 125 | charts-046 | Software Plans Four-Year Trend | easy | MCQ | 1 (line) | không | có | - | `12d6165275d7a8` | 23s | 1.00 |
| 126 | charts-047 | Software Plans Mix Analysis | medium | MCQ | 1 (pie) | không | có | - | `026e03c7d0afd0` | 29s | 1.00 |
| 127 | charts-048 | Software Plans Profitability Table | hard | structured (4-field) | 2 (table/grouped-bar) | không | có | - | `153cc5be21b491` | 49s | 1.00 |
| 128 | charts-049 | Food Categories Performance Comparison | easy | MCQ | 1 (bar) | không | có | - | `1ce37c9aadffb0` | 28s | 1.00 |
| 129 | charts-050 | Food Categories Four-Year Trend | medium | MCQ | 1 (line) | không | có | - | `0e0b714f4ef4ea` | 23s | 1.00 |
| 130 | charts-051 | Food Categories Mix Analysis | hard | structured (4-field) | 2 (pie/grouped-bar) | không | có | - | `155fed6b6d157f` | 47s | 1.00 |
| 131 | charts-052 | Food Categories Profitability Table | easy | MCQ | 1 (table) | không | có | - | `0c530643e0bf3b` | 32s | 1.00 |
| 132 | charts-053 | Telecom Packages Performance Comparison | medium | MCQ | 1 (bar) | không | có | - | `0c135c49d4c660` | 30s | 1.00 |
| 133 | charts-054 | Telecom Packages Four-Year Trend | hard | structured (4-field) | 2 (line/grouped-bar) | không | có | - | `0cc8f5c2b20725` | 39s | 1.00 |
| 134 | charts-055 | Telecom Packages Mix Analysis | easy | MCQ | 1 (pie) | không | có | - | `1d1cbde86eedbc` | 31s | 1.00 |
| 135 | charts-056 | Telecom Packages Profitability Table | medium | MCQ | 1 (table) | không | có | - | `0e816a1fb0fff5` | 32s | 1.00 |
| 136 | charts-057 | Pharmacy Categories Performance Comparison | hard | structured (4-field) | 2 (bar/grouped-bar) | không | có | - | `177a87a72e5fed` | 47s | 1.00 |
| 137 | charts-058 | Pharmacy Categories Four-Year Trend | easy | MCQ | 1 (line) | không | có | - | `1b20b3e472561d` | 23s | 1.00 |
| 138 | charts-059 | Pharmacy Categories Mix Analysis | medium | MCQ | 1 (pie) | không | có | - | `1bab9820a35d29` | 33s | 1.00 |
| 139 | charts-060 | Pharmacy Categories Profitability Table | hard | structured (4-field) | 2 (table/grouped-bar) | không | có | - | `13ef6b5d1fbe6d` | 52s | 1.00 |
| 140 | charts-061 | Payment Methods Performance Comparison | easy | MCQ | 1 (bar) | không | có | - | `0db87bbf15f41f` | 28s | 1.00 |
| 141 | charts-062 | Payment Methods Four-Year Trend | medium | MCQ | 1 (line) | không | có | - | `0a9594d567fbab` | 22s | 1.00 |
| 142 | charts-063 | Payment Methods Mix Analysis | hard | structured (4-field) | 2 (pie/grouped-bar) | không | có | - | `132ec88fb56557` | 47s | 1.00 |
| 143 | charts-064 | Payment Methods Profitability Table | easy | MCQ | 1 (table) | không | có | - | `1ccb9134fa20af` | 32s | 1.00 |
| 144 | charts-065 | Grocery Missions Performance Comparison | medium | MCQ | 1 (bar) | không | có | - | `140457c9bc8733` | 28s | 0.99 |
| 145 | charts-066 | Grocery Missions Four-Year Trend | hard | structured (4-field) | 2 (line/grouped-bar) | không | có | - | `1dec3797541e48` | 39s | 1.00 |
| 146 | charts-067 | Grocery Missions Mix Analysis | easy | MCQ | 1 (pie) | không | có | - | `02502abe6d13f7` | 30s | 1.00 |
| 147 | charts-068 | Grocery Missions Profitability Table | medium | MCQ | 1 (table) | không | có | - | `0767a11de954d3` | 33s | 1.00 |
| 148 | charts-069 | Building Materials Performance Comparison | hard | structured (4-field) | 2 (bar/grouped-bar) | không | có | - | `0039b44032048c` | 45s | 1.00 |
| 149 | charts-070 | Building Materials Four-Year Trend | easy | MCQ | 1 (line) | không | có | - | `067d978203b47d` | 22s | 0.98 |
| 150 | charts-071 | Building Materials Mix Analysis | medium | MCQ | 1 (pie) | không | có | - | `0ecbceb256fbbe` | 31s | 1.00 |
| 151 | charts-072 | Building Materials Profitability Table | hard | structured (4-field) | 2 (table/grouped-bar) | không | có | - | `03bbb668a20723` | 50s | 1.00 |
| 152 | charts-073 | Airline Routes Performance Comparison | easy | MCQ | 1 (bar) | không | có | - | `0c70b9eedda671` | 27s | 0.99 |
| 153 | charts-074 | Airline Routes Four-Year Trend | medium | MCQ | 1 (line) | không | có | - | `129527ec9a0f58` | 22s | 1.00 |
| 154 | charts-075 | Airline Routes Mix Analysis | hard | structured (4-field) | 2 (pie/grouped-bar) | không | có | - | `05169df7b8a902` | 47s | 1.00 |
| 155 | charts-076 | Airline Routes Profitability Table | easy | MCQ | 1 (table) | không | có | - | `09bfd9213b57a1` | 32s | 1.00 |
| 156 | charts-077 | Packaging Materials Performance Comparison | medium | MCQ | 1 (bar) | không | có | - | `0c4dab5df14f9e` | 29s | 1.00 |
| 157 | charts-078 | Packaging Materials Four-Year Trend | hard | structured (4-field) | 2 (line/grouped-bar) | không | có | - | `17328a0618c1f2` | 40s | 1.00 |
| 158 | charts-079 | Packaging Materials Mix Analysis | easy | MCQ | 1 (pie) | không | có | - | `1150942ec6986d` | 32s | 0.99 |
| 159 | charts-080 | Packaging Materials Profitability Table | medium | MCQ | 1 (table) | không | có | - | `19c45536981301` | 34s | 1.00 |
| 160 | charts-081 | Sales Territories Performance Comparison | hard | structured (4-field) | 2 (bar/grouped-bar) | không | có | - | `17ce7aac9a1f92` | 47s | 0.98 |
| 161 | charts-082 | Sales Territories Four-Year Trend | easy | MCQ | 1 (line) | không | có | - | `02311994111075` | 23s | 1.00 |
| 162 | charts-083 | Sales Territories Mix Analysis | medium | MCQ | 1 (pie) | không | có | - | `1e949c3e157d90` | 32s | 0.99 |
| 163 | charts-084 | Sales Territories Profitability Table | hard | structured (4-field) | 2 (table/grouped-bar) | không | có | - | `1aacfa7deab670` | 49s | 0.99 |
| 164 | charts-085 | Factory Lines Performance Comparison | easy | MCQ | 1 (bar) | không | có | - | `18d9a8d00e2534` | 28s | 1.00 |
| 165 | charts-086 | Factory Lines Four-Year Trend | medium | MCQ | 1 (line) | không | có | - | `1d244febb12c7e` | 22s | 1.00 |
| 166 | charts-087 | Factory Lines Mix Analysis | hard | structured (4-field) | 2 (pie/grouped-bar) | không | có | - | `12247c93c416a1` | 48s | 1.00 |
| 167 | charts-088 | Factory Lines Profitability Table | easy | MCQ | 1 (table) | không | có | - | `0819637284b582` | 33s | 1.00 |
| 168 | charts-089 | Restaurant Dayparts Performance Comparison | medium | MCQ | 1 (bar) | không | có | - | `1add1a7eb4da7a` | 30s | 0.86 |
| 169 | charts-090 | Restaurant Dayparts Four-Year Trend | hard | structured (4-field) | 2 (line/grouped-bar) | không | có | - | `00b9c6229b64f0` | 39s | 0.96 |
| 170 | charts-091 | Restaurant Dayparts Mix Analysis | easy | MCQ | 1 (pie) | không | có | - | `0d126f019978b7` | 31s | 0.85 |
| 171 | charts-092 | Restaurant Dayparts Profitability Table | medium | MCQ | 1 (table) | không | có | - | `025eb813f07fb3` | 33s | 0.88 |
| 172 | charts-093 | Education Courses Performance Comparison | hard | structured (4-field) | 2 (bar/grouped-bar) | không | có | - | `1ad26b39754fbf` | 48s | 0.99 |
| 173 | charts-094 | Education Courses Four-Year Trend | easy | MCQ | 1 (line) | không | có | - | `1ecf710390ff11` | 23s | 1.00 |
| 174 | charts-095 | Education Courses Mix Analysis | medium | MCQ | 1 (pie) | không | có | - | `07e4ad072edec9` | 30s | 0.99 |
| 175 | charts-096 | Education Courses Profitability Table | hard | structured (4-field) | 2 (table/grouped-bar) | không | có | - | `1cdb525c67c55c` | 49s | 0.99 |
| 176 | charts-097 | Energy Sources Performance Comparison | easy | MCQ | 1 (bar) | không | có | - | `10c4da36a83f5b` | 29s | 1.00 |
| 177 | charts-098 | Energy Sources Four-Year Trend | medium | MCQ | 1 (line) | không | có | - | `177e1ed1cda6a9` | 22s | 1.00 |
| 178 | charts-099 | Energy Sources Mix Analysis | hard | structured (4-field) | 2 (pie/grouped-bar) | không | có | - | `117b5b7f4645d6` | 49s | 1.00 |
| 179 | charts-100 | Energy Sources Profitability Table | easy | MCQ | 1 (table) | không | có | - | `015047b7d74a1b` | 32s | 1.00 |
| 180 | charts-101 | An Phú Distribution - Regional Profit Gap | hard | structured (4-field) | 2 (horizontal-bar/grouped-bar) | có | không | - | `00ce0e6f8a4f25` | 46s | 0.86 |
| 181 | charts-102 | LumiCare - Channel Growth Quality | hard | structured (4-field) | 2 (grouped-bar/multi-line) | có | có | - | `11250dfcee1d3d` | 40s | 0.99 |
| 182 | charts-103 | Bếp Việt Foods - Product Contribution Mix | hard | structured (4-field) | 2 (stacked-bar/grouped-bar) | có | không | - | `033c1e77c118d3` | 49s | 0.82 |
| 183 | charts-104 | Mây Cloud - Customer Mix Migration | hard | structured (4-field) | 2 (stacked-100/grouped-bar) | có | không | - | `01e4d20c6f5ec4` | 55s | 0.91 |
| 184 | charts-105 | GoShip Express - Peak Capacity Plan | hard | structured (4-field) | 2 (area/kpi-scorecard) | có | không | - | `07087a9752d904` | 45s | 1.00 |
| 185 | charts-106 | Sông Xanh Energy - Portfolio Transition | hard | structured (4-field) | 2 (stacked-area/grouped-bar) | có | không | - | `0d6dc2415fe2db` | 56s | 0.90 |
| 186 | charts-107 | Nắng Foods - Growth and Margin Expansion | hard | structured (4-field) | 2 (combo/grouped-bar) | có | không | - | `0651938137c99b` | 38s | 0.89 |
| 187 | charts-108 | Viễn Đông Mobile - Scale and Retention | hard | structured (4-field) | 2 (dual-axis/grouped-bar) | có | không | - | `0667a7f65291a0` | 38s | 0.87 |
| 188 | charts-109 | Đại Nam Manufacturing - Profit Bridge | hard | structured (4-field) | 2 (waterfall/financial-table) | có | có | - | `0e1fd8f3486c87` | 41s | 0.87 |
| 189 | charts-110 | Mộc Café - Marketing Saturation | hard | structured (4-field) | 2 (scatter/grouped-bar) | có | không | - | `001559d25df2b1` | 47s | 0.93 |
| 190 | charts-111 | Horizon Health - Market Prioritisation | hard | structured (4-field) | 2 (bubble/market-sizing-table) | có | không | - | `1e62c2eaf97a35` | 56s | 0.94 |
| 191 | charts-112 | FastLane Logistics - Delay Distribution | hard | structured (4-field) | 2 (histogram/grouped-bar) | có | không | - | `0a6c91927f5ff8` | 39s | 0.90 |
| 192 | charts-113 | Tâm Việt Bank - Margin Heatmap | hard | structured (4-field) | 2 (heatmap/grouped-bar) | có | có | - | `1a5ec5f0e48c21` | 44s | 0.81 |
| 193 | charts-114 | VietHouse Consumer - Portfolio Concentration | hard | structured (4-field) | 2 (treemap/grouped-bar) | có | không | - | `1a2c80bee191f8` | 38s | 0.92 |
| 194 | charts-115 | Aster Electronics - Pricing Under Uncertainty | hard | structured (4-field) | 2 (multi-line/sensitivity-table) | có | không | - | `13976344bdffff` | 41s | 0.95 |
| 195 | charts-legacy-lotushome-201 | LotusHome - Growth Without Profitable Economics | expert | structured (4-field) | 3 (financial-table/financial-table/kpi-scorecard) | có | có | - | `10353ab576e4b0` | 53s | 0.94 |
| 196 | charts-expert-201 | NoriMart - Growth Without Value Creation | expert | structured (4-field) | 3 (combo/financial-table/kpi-scorecard) | có | có | - | `0e4c5dbc011399` | 48s | 1.00 |
| 197 | charts-expert-300 | Northern Atlas Retail - Performance Diagnosis | expert | structured (4-field) | 2 (waterfall/grouped-bar) | có | có | - | `0c95fe7c8986c2` | 86s | 0.98 |
| 198 | charts-expert-301 | Central Atlas Retail - Performance Diagnosis | expert | structured (4-field) | 2 (scatter/multi-line) | có | có | - | `0b755583684261` | 91s | 0.96 |
| 199 | charts-expert-302 | Southern Atlas Retail - Performance Diagnosis | expert | structured (4-field) | 2 (heatmap/stacked-100) | có | có | - | `1cf59dd8eb1477` | 84s | 0.95 |
| 200 | charts-expert-303 | Mekong Atlas Retail - Performance Diagnosis | expert | structured (4-field) | 2 (combo/histogram) | có | có | - | `10e388d17153b5` | 91s | 0.96 |
| 201 | charts-expert-304 | Coastal Atlas Retail - Performance Diagnosis | expert | structured (4-field) | 2 (treemap/scatter) | có | có | - | `02accb4e458793` | 85s | 0.98 |
| 202 | charts-expert-305 | Northern Beacon Foods - Growth vs Profitability | expert | structured (4-field) | 2 (waterfall/grouped-bar) | có | có | - | `18d7c62d5574f2` | 82s | 0.99 |
| 203 | charts-expert-306 | Central Beacon Foods - Growth vs Profitability | expert | structured (4-field) | 2 (scatter/multi-line) | có | có | - | `08337658867185` | 89s | 0.99 |
| 204 | charts-expert-307 | Southern Beacon Foods - Growth vs Profitability | expert | structured (4-field) | 2 (heatmap/stacked-100) | có | có | - | `15a3bc297c4a77` | 80s | 1.00 |
| 205 | charts-expert-308 | Mekong Beacon Foods - Growth vs Profitability | expert | structured (4-field) | 2 (combo/histogram) | có | có | - | `1b5cbe8bed8fea` | 89s | 0.99 |
| 206 | charts-expert-309 | Coastal Beacon Foods - Growth vs Profitability | expert | structured (4-field) | 2 (treemap/scatter) | có | có | - | `1c79022000c882` | 82s | 1.00 |
| 207 | charts-expert-310 | Northern Cedar Finance - Mix-Shift Analysis | expert | structured (4-field) | 2 (waterfall/grouped-bar) | có | có | - | `1c019ebd7dc4b4` | 85s | 1.00 |
| 208 | charts-expert-311 | Central Cedar Finance - Mix-Shift Analysis | expert | structured (4-field) | 2 (scatter/multi-line) | có | có | - | `1e478fe280dc25` | 89s | 1.00 |
| 209 | charts-expert-312 | Southern Cedar Finance - Mix-Shift Analysis | expert | structured (4-field) | 2 (heatmap/stacked-100) | có | có | - | `195e2d77546348` | 85s | 0.98 |
| 210 | charts-expert-313 | Mekong Cedar Finance - Mix-Shift Analysis | expert | structured (4-field) | 2 (combo/histogram) | có | có | - | `002da27a63bb7a` | 89s | 0.99 |
| 211 | charts-expert-314 | Coastal Cedar Finance - Mix-Shift Analysis | expert | structured (4-field) | 2 (treemap/scatter) | có | có | - | `0ab045a1058abd` | 83s | 0.99 |
| 212 | charts-expert-315 | Northern Delta Logistics - Root-Cause Analysis | expert | structured (4-field) | 2 (waterfall/grouped-bar) | có | có | - | `0dfb3329264e1d` | 87s | 1.00 |
| 213 | charts-expert-316 | Central Delta Logistics - Root-Cause Analysis | expert | structured (4-field) | 2 (scatter/multi-line) | có | có | - | `013da2ac1a9d40` | 91s | 0.99 |
| 214 | charts-expert-317 | Southern Delta Logistics - Root-Cause Analysis | expert | structured (4-field) | 2 (heatmap/stacked-100) | có | có | - | `018d62705ea808` | 82s | 1.00 |
| 215 | charts-expert-318 | Mekong Delta Logistics - Root-Cause Analysis | expert | structured (4-field) | 2 (combo/histogram) | có | có | - | `16057dc595fc19` | 89s | 0.99 |
| 216 | charts-expert-319 | Coastal Delta Logistics - Root-Cause Analysis | expert | structured (4-field) | 2 (treemap/scatter) | có | có | - | `0b6fab6e3732e9` | 83s | 1.00 |
| 217 | charts-expert-320 | Northern Elm Health - Benchmark and Performance Gap | expert | structured (4-field) | 2 (waterfall/grouped-bar) | có | có | - | `016b1da5023dff` | 85s | 0.96 |
| 218 | charts-expert-321 | Central Elm Health - Benchmark and Performance Gap | expert | structured (4-field) | 2 (scatter/multi-line) | có | có | - | `1ea01f95b7d451` | 90s | 0.96 |
| 219 | charts-expert-322 | Southern Elm Health - Benchmark and Performance Gap | expert | structured (4-field) | 2 (heatmap/stacked-100) | có | có | - | `1c71a65aec10e9` | 82s | 0.96 |
| 220 | charts-expert-323 | Mekong Elm Health - Benchmark and Performance Gap | expert | structured (4-field) | 2 (combo/histogram) | có | có | - | `1d05bd3bb79ce2` | 89s | 0.96 |
| 221 | charts-expert-324 | Coastal Elm Health - Benchmark and Performance Gap | expert | structured (4-field) | 2 (treemap/scatter) | có | có | - | `10072bcf59be95` | 83s | 0.98 |
| 222 | charts-expert-325 | Northern Fjord Energy - Scenario and Decision Analysis | expert | structured (4-field) | 2 (waterfall/grouped-bar) | có | có | - | `0a79ae05d60fab` | 86s | 0.98 |
| 223 | charts-expert-326 | Central Fjord Energy - Scenario and Decision Analysis | expert | structured (4-field) | 2 (scatter/multi-line) | có | có | - | `1eef007c35e294` | 90s | 1.00 |
| 224 | charts-expert-327 | Southern Fjord Energy - Scenario and Decision Analysis | expert | structured (4-field) | 2 (heatmap/stacked-100) | có | có | - | `1a09914527a181` | 82s | 1.00 |
| 225 | charts-expert-328 | Mekong Fjord Energy - Scenario and Decision Analysis | expert | structured (4-field) | 2 (combo/histogram) | có | có | - | `00572b09b952d0` | 88s | 0.99 |
| 226 | charts-expert-329 | Coastal Fjord Energy - Scenario and Decision Analysis | expert | structured (4-field) | 2 (treemap/scatter) | có | có | - | `0bd98cdce5164c` | 82s | 1.00 |
