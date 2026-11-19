# Case Drill & Case Pool — Bố cục Medium/Hard "Compare exhibits" và bỏ Next Steps (19/11/2026)

## 1. Kết quả tóm tắt

- Toàn bộ thay đổi đã được lưu vào **Draft** của workspace. **Chưa publish**: workspace đang tắt auto-publish nên lệnh publish bị từ chối; founder cần bấm **Publish to Live** (hoặc nhờ Otto publish).
- Thứ tự đọc mới trên màn hình giải Medium/Hard: Tiêu đề case → THE QUESTION (nút "Tóm tắt đề bằng tiếng Việt" ở góc phải, đóng mặc định) → Client objective → Context (đặt cạnh câu hỏi trên laptop) → **Compare exhibits** → thanh **Your answer / Go to answer** → vùng trả lời (có nút **Back to exhibits**).
- Next Steps / Recommended Action đã bị bỏ khỏi form trả lời Charts Medium/Hard; Business Implication là trường cuối. Câu hỏi, hướng dẫn, rubric, grader, validation và 147 bản tóm tắt tiếng Việt đã được sửa cho khớp.

## 2. Inventory (dùng nhãn độ khó hiện có của sản phẩm)

Quy ước nhãn: Charts/Structures hiển thị 3 mức (stored hard → **Medium**, stored expert → **Hard**); Calculations/Market Sizing hiển thị đúng nhãn đã lưu; Creativity **không có nhãn độ khó theo thiết kế**. Case Pool: full case được xếp loại theo kỹ năng chính (skill_focus đầu tiên).

| App | Loại bài | Trong phạm vi (M/H) | Đã cập nhật | Đã xác minh (render thật, 1366×768 + 390px) | Đã publish | Cần quyết định |
|---|---|---|---|---|---|---|
| Case Drill | Charts | 107 (74 M / 33 H) | 107 | 107 | 0 | 0 |
| Case Drill | Structures | 80 (34 M / 46 H) | 80 | 80 | 0 | 0 |
| Case Drill | Calculations | 45 (33 M / 12 H) | 33 (12 H CM-CALC không có exhibit, đã đúng bố cục, không đổi) | 0 (chỉ review code) | 0 | 12 nhãn "Expert" |
| Case Drill | Market Sizing | 68 (50 M / 18 H) | 68 | 0 (chỉ review code) | 0 | 10 nhãn "Expert" |
| Case Drill | Creativity | 0 | – | – | – | 40 không có nhãn độ khó |
| Case Pool | Calculations | 42 (30 M full case / 12 H CM-CALC) | 42 | 30 | 0 | 12 nhãn "Expert" |
| Case Pool | Structures | 32 (20 M / 12 H full case) | 32 | 32 | 0 | 0 |
| Case Pool | Market Sizing | 34 (17 M / 17 H) | 34 | 0 (chỉ review code) | 0 | 9 nhãn "Expert" + 3 Case Journey nhãn "Expert" |
| Case Pool | Charts | 0 (Charts trong Case Pool đều là Easy) | – | – | – | 0 |
| Case Pool | Creativity | 0 | – | – | – | 40 không có nhãn độ khó |
| **Tổng** | | **408** (Case Drill 300, Case Pool 108) | **396** | **249** | **0** | **126** |

Ghi chú: 81 câu Hard cũ (48 Charts, 33 Structures) được hệ thống "restore" thành dạng structured và người học vẫn mở được, nên đã được tính và sửa. Case Room (case do AI sinh theo yêu cầu) không phải ngân hàng cố định nên không nằm trong inventory; mỗi case chỉ có 1 exhibit và phần "Recommendation" là kết luận của full case, không phải trường Next Steps.

Bố cục theo số exhibit: Charts 104 câu có 2 exhibit + 3 câu có 3 exhibit; Structures 64 câu có 2 + 16 câu có 3+; Case Pool full case 62 câu có 2 exhibit; Calculations/Market Sizing 0–1 exhibit.

## 3. Thay đổi bố cục (component dùng chung)

- `components/CompareExhibits.tsx` (mới): khung "Compare exhibits" + chip số exhibit + nút **Case context** + **Reading notes**.
  - 2 exhibit: đặt cạnh nhau khi vùng exhibit rộng ≥ 880px (laptop 1366px); hẹp hơn thì xếp dọc. Tiêu đề hai thẻ được căn bằng chiều cao để vùng biểu đồ thẳng hàng.
  - 3+ exhibit: hai ô chọn độc lập **Left / Right** (giữ một exhibit cố định, đổi exhibit còn lại); mọi exhibit vẫn chọn được.
  - Mobile: xếp dọc toàn bộ exhibit, có nút nhảy nhanh tới từng exhibit và tới **Your answer**; không cuộn ngang toàn trang.
  - Mỗi thẻ: nhãn EXHIBIT, tiêu đề, phụ đề, đơn vị/kỳ, legend, nút **Expand** (mở bản lớn), **View data table** (mở/đóng, chọn được, có nút **Copy table** dán vào Excel).
- `ExhibitRenderer.tsx`, `CaseExhibits.tsx`: dùng khung trên cho mọi màn hình có ≥2 exhibit (Easy giữ nguyên bố cục cũ). Biểu đồ trong chế độ so sánh thấp hơn (250–280px) để vừa màn hình; nhãn trục dài không còn bị cắt (in ngang phía trên trục), nhãn dạng "Cost-to-serve" được xuống dòng sau dấu gạch nối.
- `CaseReadingGuide.tsx`: thêm bố cục "split" (Câu hỏi + Client objective bên trái, Context bên phải trên laptop), dòng **Client objective**, và hàng tiêu đề có nút tiếng Việt.
- Áp dụng vào: `ExpertDrillExperience.tsx` (Charts M/H), `StructuresWorkspace.tsx`, `QuestionLibrary.tsx` (Calculations/Market Sizing M/H), `CasePoolLibrary.tsx` (Case Pool M/H). Mở rộng biểu đồ, đổi cặp so sánh, nhảy tới/lui vùng trả lời đều không làm mất câu trả lời đang gõ (đã kiểm thử).

## 4. Bỏ Next Steps

- Form Charts Medium/Hard: bỏ trường "4. Recommended Next Step / Recommended Action". Trường cuối: **3. Business Implication** — "Explain what your findings mean for the client's objective or business decision. A next step or action plan is not required." Dòng guardrail ghi rõ không cần next step và không bị trừ điểm.
- Câu hỏi/hướng dẫn/objective đã bỏ yêu cầu hành động: 30 Charts + 30 Structures Hard (mẫu sinh tự động, gồm Northern Atlas), 81 câu Hard được restore (bỏ "what should management do next"), và `charts-hard-insight-401`, `charts-legacy-novabrew-401`, `charts-legacy-lotushome-201`, `charts-expert-201`, `charts-journey-701`, `charts-journey-706`.
  - Northern Atlas (`charts-expert-300`): "What is the most important conclusion for Northern Atlas Retail, what evidence across both exhibits supports it, and what does it imply for the client objective?" — hướng dẫn: "Synthesize both exhibits. Distinguish observation from insight and explain the business implication for the client objective." — objective bỏ "define the next management action".
- Chấm điểm (giữ thang 0–10, giữ rubric id cũ để lịch sử không đổi): tiêu chí "Implication for the decision" ghi rõ không yêu cầu next step; grader Charts được dặn không yêu cầu, không trừ điểm và không gợi ý thêm next step; đáp án mẫu/tham chiếu cho grader không còn dòng "Recommended Action / Next Step". Rubric dữ liệu (Hard 25/35/30/10, Expert 35/30/25/10) và validation đã bỏ tiêu chí next step.
- 147 tóm tắt tiếng Việt (drill-charts-01, drill-charts-04, drill-restored-01/02, drill-structures-03) đã sửa cho khớp; bỏ thuật ngữ "decision gate" khỏi 60 bảng thuật ngữ liên quan.
- Bài cũ: lượt làm cũ có next step vẫn mở được, hiển thị nguyên văn câu trả lời và điểm cũ (đã kiểm thử).
- Không thêm trường diễn giải cho bài chưa có. Structures (cây vấn đề), Calculations, Market Sizing, Creativity không có trường Next Steps riêng nên không đổi form. Case Pool dùng một ô trả lời tự do (không có trường Next Steps riêng).

## 5. Cách xác minh

Render các component thật (bản đã sửa) với dữ liệu thật của ngân hàng câu hỏi, ở 1366×768 và 390×844:
- 107 Charts + 80 Structures (StructuresWorkspace thật) + 62 Case Pool full case = 249 câu × 2 kích thước: 0 lỗi (không có trường next step, câu hỏi không còn yêu cầu hành động, đúng chế độ so sánh, đủ exhibit trên mobile, không cuộn ngang, có Go to answer).
- Luồng Charts: gõ trả lời → đổi cặp exhibit → Expand → View data table → Go to answer → Back to exhibits (câu trả lời giữ nguyên) → Submit → hiện feedback → tải lại → mở lại lượt đã lưu. Bước chấm AI dùng bản giả lập (không gọi OpenAI thật).
- Northern Atlas 1366×768, zoom 100% (render có thanh tiêu đề ứng dụng mô phỏng): câu hỏi đầy đủ + hai biểu đồ (kể cả nhãn trục) nằm trọn trong màn hình đầu tiên. Cần xác nhận lại trên live sau khi publish.
- Chưa xác minh trên giao diện thật: Calculations/Market Sizing Medium-Hard và Calculations CM-CALC (Case Drill + Case Pool) — chỉ review code (0–1 exhibit, thay đổi nhỏ). Chưa kiểm tra trang live vì chưa publish.

Ảnh/clip (đính kèm trong lần chạy này): `northern_atlas_before_1366x768.png`, `northern_atlas_after_1366x768.png`, `norimart_3_exhibits_before_1366x768.png`, `norimart_3_exhibits_after_1366x768.png`, `northern_atlas_after_mobile_390_top.png`, `northern_atlas_after_mobile_390_exhibits.png`, `case_pool_case-002_after_1366x768.png`, `compare_exhibits_walkthrough_1366x768.webm`.

## 6. Cần founder quyết định (không tự đoán)

- Creativity không có nhãn độ khó theo thiết kế: Case Drill 40 câu (CM-CRE-AR01…, CM-CRE-BI01…, CM-CRE-IM01…, CM-CRE-PD01…), Case Pool 40 case (case-cm-cre-…). Không có exhibit và không có trường Next Steps.
- Nhãn "Expert" (không phải Medium/Hard): Case Drill CM-CALC-E01…E12, market-sizing-bank-e02…e08, market-sizing-cycle3-a11, market-sizing-cycle3-b01, market-sizing-expert-201; Case Pool case-cm-calc-e01…e12, case-cm-ms-a11, case-cm-ms-b01, case-cm-ms-e02…e08, case-jrn-12, case-jrn-16, case-jrn-21. Bố cục dùng chung vẫn áp dụng cho các màn hình này.

## 7. Publish

- Trạng thái: **Draft, chưa live** (auto-publish tắt). Live hiện tại là bản publish lúc 09:15 UTC 19/11.
- Khi bấm Publish sẽ đẩy lên live cả các draft khác đang chờ: Aptitude Test "Smart Practice Picks" (Task #167209: `lib/aptitudeSmartPicks.ts`, `components/SmartPracticePicks.tsx`, `lib/aptitudeProgress.ts`, `components/AptitudeLibrary.tsx`, `apps/AptitudeTest/App.tsx`) và My Roadmap "Today's Focus" (Task #167221: `lib/skillFocus.ts`, `apps/MyRoadmap/skillFocusData.ts`, `TodaysFocus.tsx`, `App.tsx`, `RecommendedForTarget.tsx`).
- Link live (đúng bố cục mới sau khi publish): Case Drill https://app.casemateaud.com/?app=case-drill&screen=app — Case Pool https://app.casemateaud.com/?app=case-drill-log&screen=app. Câu mẫu theo loại: Charts `charts-expert-300` (Northern Atlas); Structures `structures-journey-703`; Calculations `CM-CALC-H01`; Market Sizing `market-sizing-hard-insight-401`; Creativity `CM-CRE-PD01` (không có nhãn độ khó).
