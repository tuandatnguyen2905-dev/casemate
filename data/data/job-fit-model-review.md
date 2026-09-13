# Chọn mô hình Job-Fit (Person–Job Matching) phù hợp nhất cho thị trường Việt Nam

*Bản rà soát 6 tài liệu nghiên cứu (VN + quốc tế) — lập cho Casemate, tháng 8/2026. Đọc cùng bản `data/corporate-fit-model-review.md` (corporate-fit) để có đủ hai nửa của bài toán fit.*

---

## 1. Kết luận nhanh (TL;DR)

Với điều kiện thị trường Việt Nam hiện tại — **không có kho dữ liệu tương tác tuyển dụng lớn, tiếng Việt là ngôn ngữ tài nguyên thấp, và danh mục vị trí cần match nhỏ nhưng cần giải thích được** — mô hình hợp lý nhất là:

**Job-fit bằng suy luận LLM trên khung tiêu chí được chuẩn hoá (rubric) cho từng vị trí, trong đó mỗi vị trí được mã hoá thành một “hồ sơ ứng viên lý tưởng” (hypothetical reference resume — kỹ thuật của CONFIT v2) kết hợp taxonomy kỹ năng kiểu ontology (theo hướng nghiên cứu VNU-HCM) do con người xác minh, và kết quả match luôn kèm bằng chứng trích từ CV.**

Nói cách khác: KHÔNG chọn các mạng deep-learning huấn luyện trên log tuyển dụng (không có dữ liệu đó ở VN cho phân khúc MT/consulting), KHÔNG chọn thuần embedding-retrieval (bài toán của Casemate không phải lọc hàng triệu tin đăng mà là đánh giá sâu ~20 chương trình đã xác minh), mà lấy ưu điểm của từng trường phái ghép vào pipeline LLM đang có.

**Ý nghĩa thực tế cho Casemate:** kiến trúc hiện tại (LLM đọc CV → câu hỏi bù thông tin → match % kèm bằng chứng CV cho 20 chương trình founder-verified) đã đi đúng trường phái được khuyến nghị. Nâng cấp đáng giá nhất: **chuẩn hoá mỗi chương trình thành một rubric “ứng viên lý tưởng” có cấu trúc** (tiêu chí → trọng số → mức đạt) thay vì để LLM tự định nghĩa tiêu chí mỗi lần chạy — giúp điểm match ổn định giữa các lần đánh giá, so sánh được giữa ứng viên, và founder kiểm soát được “thế nào là hợp”.

---

## 2. Sáu tài liệu — mô hình nào, dùng được gì, loại vì sao

| # | Tài liệu | Mô hình | Dữ liệu cần | Dùng được gì cho VN | Vì sao KHÔNG chọn làm lõi |
|---|---|---|---|---|---|
| 1 | Nguyen et al. 2024, PeerJ CS (VNU-HCM / UIT — **nghiên cứu Việt Nam**) | Ontology kỹ năng để match CV–JD + ontology luật lao động; so khớp ngữ nghĩa có trọng số trên đồ thị kỹ năng | Ontology xây và bảo trì thủ công | Tư duy đúng cho VN: taxonomy kỹ năng có kiểm soát + match giải thích được; đã chứng minh hoạt động với CV/JD tiếng Việt | Chi phí bảo trì ontology đầy đủ rất cao; với 20 chương trình thì cần bản “ontology-lite” (rubric tiêu chí) là đủ |
| 2 | VietJobs 2026 (VinUniversity) | Bộ dữ liệu 48.092 tin tuyển dụng tiếng Việt (34 tỉnh thành, 16 nhóm ngành) + benchmark LLM (phân loại nghề, ước lượng lương) | — (dataset công khai) | Hai bài học: (a) LLM tổng quát chỉ đạt tốt khi có few-shot/tinh chỉnh cho tiếng Việt → prompt matching phải kèm ví dụ và dữ liệu nội địa; (b) nguồn chuẩn để lấy mặt bằng kỹ năng/lương theo ngành cho nội dung Industry Knowledge | Là dataset + benchmark, không phải mô hình matching |
| 3 | Bian et al. 2020 (CIKM, BOSS Zhipin) | Multi-View Co-Teaching Network: 2 nhánh (text + quan hệ) dạy lẫn nhau để chịu được dữ liệu tương tác thưa và nhiễu | Log ứng tuyển/phỏng vấn quy mô nền tảng tuyển dụng lớn | Ý tưởng “nhiều góc nhìn kiểm chéo nhau” — Casemate đã làm bằng CV + câu hỏi bù + ambition check | Không có (và không bao giờ có ở quy mô này) log tương tác cho MT/consulting VN |
| 4 | Wang et al. 2022 (PJFCANN) | Co-attention + graph neural network dùng LỊCH SỬ tuyển thành công để làm giàu đặc trưng | Hồ sơ trúng tuyển lịch sử theo từng vị trí | Ý tưởng đáng giữ: “người đã đậu trông như thế nào” là tín hiệu mạnh nhất — có thể tái tạo thủ công bằng hồ sơ điển hình của người đã đậu từng chương trình (founder xác minh) | Cần dữ liệu lịch sử trúng tuyển số lượng lớn — VN không công khai dữ liệu này |
| 5 | Wang, Jiang & Peng 2021 (Complexity) | BERT sentence vectors + đồ thị từ chủ đề, mô hình end-to-end trên dữ liệu tuyển dụng Trung Quốc | Corpus tuyển dụng lớn để huấn luyện | Xác nhận hướng “ngữ nghĩa câu + từ khoá chủ đề” hơn hẳn so khớp từ khoá thô — củng cố việc dùng LLM thay vì keyword matching | Mô hình huấn luyện riêng, tiếng Trung; không chuyển giao trực tiếp sang tiếng Việt |
| 6 | CONFIT v2 2025 (Columbia + Intellipro) | Encoder tương phản (contrastive) với 2 kỹ thuật: **LLM sinh “hồ sơ tham chiếu giả định” cho mỗi JD** (HyRe) + đào hard-negative; thắng cả OpenAI text-embedding (+13,8% recall) | Cặp CV–JD có nhãn (vẫn cần để train encoder) | **Kỹ thuật đắt giá nhất để mượn**: biến mỗi vị trí thành “hồ sơ ứng viên lý tưởng” rồi so CV thật với hồ sơ đó — áp dụng được ngay ở tầng suy luận LLM, không cần huấn luyện | Bản đầy đủ cần dữ liệu nhãn để train và phục vụ bài toán xếp hạng kho ứng viên/tin đăng khổng lồ — không phải bài toán của Casemate |

---

## 3. Tiêu chí lọc cho thị trường Việt Nam

1. **Khởi động nguội (cold start):** không có log ứng tuyển/trúng tuyển quy mô lớn → loại các mô hình học từ tương tác (#3, #4) và encoder cần nhãn (#6 bản đầy đủ).
2. **Tiếng Việt là ngôn ngữ tài nguyên thấp:** VietJobs (#2) cho thấy LLM cần few-shot/dữ liệu nội địa mới đạt độ tin cậy → mọi tầng LLM phải được neo vào dữ liệu chương trình founder-verified và ví dụ song ngữ, không thả nổi.
3. **Quy mô bài toán:** Casemate đánh giá sâu ~20 chương trình, không xếp hạng hàng triệu tin → không cần retrieval embedding; đủ ngân sách tính toán để LLM đọc kỹ từng cặp CV–chương trình.
4. **Phải giải thích được cho ứng viên trẻ:** match % phải kèm bằng chứng từ CV và “con đường để đạt” → loại mọi mô hình hộp đen thuần vector.

---

## 4. Mô hình khuyến nghị cho Casemate

**Tên gọi:** LLM person–job fit có rubric — mỗi chương trình là một “hồ sơ ứng viên lý tưởng” founder-verified.

### 4.1. Ba thành phần

1. **Rubric “ứng viên lý tưởng” cho từng chương trình** (mượn HyRe của CONFIT v2 + tinh thần ontology của nghiên cứu VNU-HCM): mỗi chương trình MT/consulting được mô tả bằng 6–8 tiêu chí có cấu trúc (ví dụ: GPA/học vấn, ngoại ngữ, hoạt động ngoại khoá/lãnh đạo, kinh nghiệm thực tập đúng ngành, kỹ năng phân tích/case, giải thưởng–cuộc thi, yếu tố văn hoá-đặc thù), mỗi tiêu chí có trọng số và mô tả 3 mức đạt (chưa đạt / đạt / nổi bật) kèm 1 ví dụ hồ sơ điển hình đã đậu (nếu founder có). Founder xác minh và khoá rubric — đây là moat, giống cơ chế industry_brief_overrides.
2. **LLM đối chiếu CV với rubric** (pipeline analyze-cv hiện tại): chấm từng tiêu chí, bắt buộc trích bằng chứng nguyên văn từ CV cho mỗi điểm, tổng hợp theo trọng số thành match %. Câu hỏi bù (gap questions) chỉ hỏi đúng những tiêu chí CV chưa có dữ liệu — rubric làm câu hỏi bù có định hướng hơn.
3. **Neo dữ liệu nội địa:** mặt bằng kỹ năng/lương theo ngành lấy từ nguồn VN (dạng VietJobs/TopCV) để lời khuyên “con đường để đạt” sát thực tế; prompt song ngữ Việt–Anh vì CV ứng viên VN trộn hai ngôn ngữ.

### 4.2. Vì sao đây là lựa chọn đúng cho VN (thay vì các mô hình trong tài liệu)

- **So với deep matching (#3, #4, #5):** các mô hình này cần hàng trăm nghìn tương tác để học; ở VN dữ liệu đó nằm kín trong các nền tảng tuyển dụng và không tồn tại cho phân khúc MT program. LLM + rubric đạt được cùng mục tiêu (hiểu ngữ nghĩa sâu) mà không cần dữ liệu huấn luyện.
- **So với embedding retrieval (#6):** với 20 chương trình, xếp hạng bằng embedding vừa thừa vừa mất khả năng giải thích; nhưng kỹ thuật “hồ sơ tham chiếu giả định” của nó là cách mã hoá vị trí tốt nhất hiện có — đưa vào tầng rubric.
- **So với ontology đầy đủ (#1):** đúng tinh thần (có kiểm soát, giải thích được, hợp tiếng Việt) nhưng quy mô 20 chương trình chỉ cần rubric-per-program, rẻ hơn nhiều lần để bảo trì.
- **Tính nhất quán:** rubric cố định + bắt buộc bằng chứng làm điểm match ổn định giữa các lần chạy và giữa các ứng viên — điểm yếu cố hữu của LLM tự do mà cả 6 tài liệu đều giải quyết bằng cấu trúc hoá.

### 4.3. Những điều KHÔNG nên làm

- Không tự huấn luyện mạng matching riêng (thiếu dữ liệu, chi phí cao, không giải thích được).
- Không dùng điểm embedding tương đồng CV–JD làm match % hiển thị cho người dùng (không có bằng chứng, không có “con đường để đạt”).
- Không để LLM tự sinh tiêu chí mỗi phiên — rubric phải là dữ liệu được lưu và founder xác minh, LLM chỉ chấm theo rubric.
- Không bỏ qua yếu tố song ngữ: benchmark VietJobs cho thấy mô hình đa ngữ vẫn hụt đặc thù tiếng Việt nếu không được neo ví dụ.

---

## 5. Ghép với bản corporate-fit

Hai bản rà soát hợp thành một kiến trúc fit hoàn chỉnh cho Casemate:
- **Job-fit (bản này):** “Bạn có đủ năng lực/hồ sơ cho chương trình này không?” → LLM + rubric ứng viên lý tưởng, kèm bằng chứng CV.
- **Corporate-fit (`data/corporate-fit-model-review.md`):** “Bạn có hợp văn hoá/cách làm việc của công ty đó không?” → P–O fit vector OCP mở rộng.
Thứ tự hiển thị cho ứng viên VN: khả năng đậu (job-fit) + đãi ngộ/lộ trình trước, culture-fit % là lớp bổ trợ.

---

## 6. Nguồn

1. Nguyen, H., Pham, V., Ngo, H.Q., Huynh, A., Nguyen, B., Machado, J. (2024). *Intelligent search system for resume and labor law.* PeerJ Computer Science 10:e1786.
2. Pham Dinh, H., Nguyen Huy, H., El-Haj, M. (2026). *VietJobs: A Vietnamese Job Advertisement Dataset.* VinUniversity (arXiv:2603.05262).
3. Bian, S. et al. (2020). *Learning to Match Jobs with Resumes from Sparse Interaction Data using Multi-View Co-Teaching Network.* CIKM (arXiv:2009.13299).
4. Wang, Z., Wei, W., Xu, C., Xu, J., Mao, X.-L. (2022). *Person-job fit estimation from candidate profile and related recruitment history with Co-Attention Neural Networks (PJFCANN).* arXiv:2206.09116.
5. Wang, X., Jiang, Z., Peng, L. (2021). *A Deep-Learning-Inspired Person-Job Matching Model Based on Sentence Vectors and Subject-Term Graphs.* Complexity.
6. Yu, X., Xu, R., Xue, C., Zhang, J., Ma, X., Yu, Z. (2025). *CONFIT v2: Improving Resume-Job Matching using Hypothetical Resume Embedding and Runner-Up Hard-Negative Mining.* arXiv:2502.12361.
