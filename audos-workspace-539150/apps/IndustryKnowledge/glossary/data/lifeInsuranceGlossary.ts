// Life Insurance Essential Terms (initial lessons only). Verified definitions follow the curriculum's
// sourced definitions table in lifeInsuranceCore.tsx. Insurance "underwriting" and "ALM" are defined
// here in their insurance sense; they are separate entries from the credit/banking meanings.
import type { CurriculumGlossaryData, GlossarySource, GlossaryTermDef } from '../glossaryTypes';
import { collectSources, sharedTerms } from './financeSharedTerms';

const DT = 'li-key-terms';

const LI_SOURCES: GlossarySource[] = [
  { id: DT, title: 'Life Insurance curriculum — definitions table (sourced)', note: 'lifeInsuranceCore.tsx definitions table.' },
  { id: 'li-vn-insurance-law', title: 'Law on Insurance Business No. 08/2022/QH15', url: 'https://vanban.chinhphu.vn/?docid=206242&pageid=27160', publisher: 'National Assembly of Vietnam', note: 'URL corrected in Sprint 04F: the earlier congbao ...-37543 address resolves to Circular 13/2022/TT-BLDTBXH, not this Law. Checked articles: 4(13), 4(24)-(28), 26-27, 30-31, 97, 110, 124-125.' },
  { id: 'li-decree-46-2023', title: 'Decree No. 46/2023/ND-CP detailing the Law on Insurance Business', url: 'https://vanban.chinhphu.vn/?classid=1&docid=208166&pageid=27160&typegroupid=4', publisher: 'Government of Vietnam', note: 'Art. 3 lists the life-insurance business lines (whole life, endowment-for-survival, term, mixed, annuity, investment-linked, pension); Arts. 101-105 cover unit-linked and universal-linked contracts and their refund value.' },
  { id: 'li-iais-protection-gap', title: 'The role of insurance supervisors in multi-stakeholder approaches to address pandemic protection gaps', url: 'https://www.iais.org/uploads/2022/09/220929-The-role-of-insurance-supervisors-in-multi-stakeholder-approaches-to-address-pandemic-protection-gaps.pdf', publisher: 'IAIS', note: 'Defines the insurance protection gap; the IAIS notes that definitions differ.' },
  { id: 'li-iais', title: 'Insurance Core Principles and Common Framework', url: 'https://www.iaisweb.org/activities-topics/standard-setting/icps-and-comframe/', publisher: 'IAIS' },
  { id: 'li-ifrs17', title: 'IFRS 17 Insurance Contracts', url: 'https://www.ifrs.org/issued-standards/list-of-standards/ifrs-17-insurance-contracts/', publisher: 'IFRS Foundation' },
  { id: 'li-iaa', title: 'International Standards of Actuarial Practice', url: 'https://www.actuaries.org/iaa/IAA/Publications/ISAPs/IAA/Publications/ISAPs.aspx', publisher: 'International Actuarial Association' },
];

const LI_TERMS: GlossaryTermDef[] = [
  {
    id: 'li.policyholder', term: 'Policyholder', aliases: ['policyholders', 'policy owner'], category: 'essential-concepts',
    definitionEn: 'The person or entity that owns the policy and holds its contractual rights and obligations, such as paying premiums.',
    definitionVi: 'Bên mua bảo hiểm: cá nhân hoặc tổ chức sở hữu hợp đồng bảo hiểm, có các quyền và nghĩa vụ theo hợp đồng như đóng phí.',
    businessContextEn: 'The policyholder, insured person and beneficiary can be three different people.',
    businessContextVi: 'Bên mua bảo hiểm, người được bảo hiểm và người thụ hưởng có thể là ba người khác nhau.',
    sourceIds: [DT, 'li-vn-insurance-law'], basis: 'curriculum', verificationStatus: 'verified',
  },
  {
    id: 'li.insured-person', term: 'Insured person', aliases: ['life insured', 'insured'], category: 'essential-concepts', annotate: false,
    definitionEn: 'The person whose life or specified event is covered under the policy.',
    definitionVi: 'Người được bảo hiểm: người có tính mạng hoặc sự kiện được bảo hiểm theo hợp đồng.',
    businessContextEn: 'Underwriting assesses the insured person’s risk, not the policyholder’s.',
    businessContextVi: 'Thẩm định rủi ro đánh giá người được bảo hiểm, không phải bên mua bảo hiểm.',
    sourceIds: [DT, 'li-vn-insurance-law'], basis: 'curriculum', verificationStatus: 'verified',
  },
  {
    id: 'li.beneficiary', term: 'Beneficiary', aliases: ['beneficiaries'], category: 'essential-concepts',
    definitionEn: 'The person or entity designated to receive an eligible benefit under the policy.',
    definitionVi: 'Người thụ hưởng: cá nhân hoặc tổ chức được chỉ định nhận quyền lợi bảo hiểm khi đủ điều kiện theo hợp đồng.',
    businessContextEn: 'Clear beneficiary records speed up claims and avoid disputes.',
    businessContextVi: 'Thông tin người thụ hưởng rõ ràng giúp giải quyết quyền lợi nhanh hơn và tránh tranh chấp.',
    sourceIds: [DT, 'li-vn-insurance-law'], basis: 'curriculum', verificationStatus: 'verified',
  },
  {
    id: 'li.premium', term: 'Premium', aliases: ['premiums', 'insurance premium'], category: 'essential-concepts', annotate: false,
    definitionEn: 'The amount due under the policy to keep the stated coverage in force.',
    definitionVi: 'Phí bảo hiểm: số tiền bên mua bảo hiểm phải đóng theo hợp đồng để duy trì quyền lợi bảo hiểm.',
    businessContextEn: 'Premium collected is cash, not profit: much of it is set aside as reserves for future benefits.',
    businessContextVi: 'Phí bảo hiểm thu được là dòng tiền, không phải lợi nhuận: phần lớn được trích lập dự phòng cho quyền lợi tương lai.',
    sourceIds: [DT], basis: 'curriculum', verificationStatus: 'verified',
  },
  {
    id: 'li.claim', term: 'Claim', aliases: ['claims', 'insurance claim'], category: 'business-processes', annotate: false,
    definitionEn: 'A request for payment of a benefit after an insured event, such as death or illness, assessed against the policy terms.',
    definitionVi: 'Yêu cầu bồi thường/chi trả quyền lợi: đề nghị chi trả quyền lợi sau khi xảy ra sự kiện bảo hiểm (như tử vong, bệnh tật), được xem xét theo điều khoản hợp đồng.',
    businessContextEn: 'Fast, fair claims handling is the moment that builds or destroys trust in an insurer.',
    businessContextVi: 'Giải quyết quyền lợi nhanh và công bằng là thời điểm tạo dựng hoặc phá hủy niềm tin vào doanh nghiệp bảo hiểm.',
    sourceIds: ['li-vn-insurance-law'], basis: 'paraphrase', verificationStatus: 'verified',
    reviewNote: 'Sprint 04F: consistent with the Law on Insurance Business Art. 4(27) (insured event), Art. 30 (claim filing period of one year) and Art. 31 (payment deadline). The Law does not define "claim" as a stand-alone term; the wording summarises these articles.',
  },
  {
    id: 'li.term-life', term: 'Term life insurance', aliases: ['term life'], category: 'products-services',
    definitionEn: 'Pure protection that pays a death benefit only if the insured person dies within a set term; it usually has no savings value.',
    definitionVi: 'Bảo hiểm tử kỳ: sản phẩm bảo vệ thuần túy, chỉ chi trả quyền lợi tử vong nếu người được bảo hiểm qua đời trong thời hạn hợp đồng; thường không có giá trị tích lũy.',
    businessContextEn: 'Term life offers the most protection per premium, but sellers often prefer savings products with higher commission.',
    businessContextVi: 'Bảo hiểm tử kỳ mang lại mức bảo vệ cao nhất trên mỗi đồng phí, nhưng người bán thường ưu tiên sản phẩm tích lũy có hoa hồng cao hơn.',
    sourceIds: ['li-decree-46-2023'], basis: 'paraphrase', verificationStatus: 'needs-review',
    reviewNote: 'Sprint 04F: Decree 46/2023 Art. 3 confirms term insurance (bao hiem tu ky) as an official life-insurance business line but does not define it. The wording (death benefit only within the term, usually no savings value) is the standard industry reading and still needs a regulator or professional-standard definition. The commission remark in the business context is an analyst comment, not sourced.',
  },
  {
    id: 'li.endowment', term: 'Endowment insurance', aliases: ['endowment'], category: 'products-services',
    definitionEn: 'A policy that pays a benefit on death during the term or on survival to the end of the term, combining protection and savings.',
    definitionVi: 'Bảo hiểm hỗn hợp (endowment): hợp đồng chi trả quyền lợi khi người được bảo hiểm tử vong trong thời hạn hoặc còn sống đến hết thời hạn, kết hợp bảo vệ và tiết kiệm.',
    businessContextEn: 'Savings-style products dominated early Vietnamese life-insurance sales.',
    businessContextVi: 'Các sản phẩm thiên về tiết kiệm từng chiếm ưu thế trong doanh số bảo hiểm nhân thọ giai đoạn đầu tại Việt Nam.',
    sourceIds: ['li-decree-46-2023'], basis: 'paraphrase', verificationStatus: 'needs-review',
    reviewNote: 'Sprint 04F: Decree 46/2023 Art. 3 lists mixed insurance (bao hiem hon hop) and survival insurance (bao hiem sinh ky) as official business lines without defining them; the combined death-or-survival wording is the standard reading and is not quoted from the decree. The market-history remark in the business context is still unsourced.',
  },
  {
    id: 'li.participating-policy', term: 'Participating policy', aliases: ['participating policies', 'with-profits policy'], category: 'products-services',
    definitionEn: 'A policy eligible for non-guaranteed bonuses or dividends that depend on stated terms and the insurer’s performance.',
    definitionVi: 'Hợp đồng có chia lãi: hợp đồng được hưởng lãi chia hoặc cổ tức không đảm bảo, tùy theo điều khoản và kết quả hoạt động của doanh nghiệp bảo hiểm.',
    businessContextEn: 'Customers must understand that illustrated bonuses are not guaranteed.',
    businessContextVi: 'Khách hàng cần hiểu rằng mức lãi chia minh họa không được đảm bảo.',
    sourceIds: [DT], basis: 'curriculum', verificationStatus: 'verified',
  },
  {
    id: 'li.investment-linked', term: 'Investment-linked insurance', aliases: ['unit-linked', 'unit-linked insurance', 'investment-linked'], category: 'products-services',
    definitionEn: 'A policy combining insurance protection with investment exposure whose value and risk depend on the chosen funds and terms.',
    definitionVi: 'Bảo hiểm liên kết đầu tư (unit-linked): hợp đồng kết hợp bảo vệ với đầu tư, giá trị và rủi ro phụ thuộc vào quỹ được chọn và điều khoản.',
    businessContextEn: 'Mis-selling of investment-linked products has been a major source of complaints and regulatory tightening.',
    businessContextVi: 'Việc bán sai sản phẩm liên kết đầu tư là nguồn khiếu nại lớn và là lý do siết chặt quản lý.',
    sourceIds: [DT, 'li-vn-insurance-law'], basis: 'curriculum', verificationStatus: 'verified',
    reviewNote: 'The definition is sourced; the mis-selling context is a widely reported market issue that is not tied to a specific cited source here.',
  },
  {
    id: 'li.surrender', term: 'Surrender value', aliases: ['surrender', 'cash surrender value'], category: 'products-services',
    definitionEn: 'The refund value paid to a policyholder who ends a life policy early; for unit-linked contracts it is the account value less the early-termination charge.',
    definitionVi: 'Giá trị hoàn lại: số tiền doanh nghiệp bảo hiểm trả cho bên mua bảo hiểm khi hợp đồng nhân thọ có giá trị hoàn lại bị chấm dứt trước hạn; với hợp đồng liên kết đầu tư, đó là giá trị tài khoản trừ đi phí chấm dứt hợp đồng trước hạn.',
    businessContextEn: 'Early surrender often returns less than premiums paid, a common source of customer disappointment.',
    businessContextVi: 'Hủy hợp đồng sớm thường nhận lại ít hơn số phí đã đóng – nguyên nhân phổ biến khiến khách hàng thất vọng.',
    sourceIds: ['li-vn-insurance-law', 'li-decree-46-2023'], basis: 'paraphrase', verificationStatus: 'verified',
    reviewNote: 'Sprint 04F: Law on Insurance Business Art. 27(3) requires the insurer to pay the refund value (gia tri hoan lai) of a life contract that has one when it is terminated for non-payment of premium; Decree 46/2023 Arts. 103-105 define refund value of unit-linked contracts as account value minus the early-termination fee. The Law says "refund value"; "surrender value" is the standard English term. The statement that early surrender often returns less than premiums paid is an analyst remark, not sourced.',
  },
  {
    id: 'li.lapse', term: 'Lapse', aliases: ['policy lapse', 'lapses', 'lapsed'], category: 'business-processes',
    definitionEn: 'When a policy is terminated because the required premium was not paid by the due date or within the grace period; events that occurred before termination are still payable under a life policy.',
    definitionVi: 'Mất hiệu lực hợp đồng: hợp đồng bị chấm dứt do bên mua bảo hiểm không đóng phí đầy đủ theo hạn thỏa thuận hoặc sau thời gian gia hạn đóng phí; với hợp đồng nhân thọ, sự kiện xảy ra trước thời điểm chấm dứt vẫn được chi trả.',
    businessContextEn: 'High lapse rates hurt both customers, who lose cover, and insurers, who lose future margins.',
    businessContextVi: 'Tỷ lệ mất hiệu lực cao gây thiệt hại cho cả khách hàng (mất quyền lợi bảo vệ) và doanh nghiệp (mất lợi nhuận tương lai).',
    sourceIds: ['li-vn-insurance-law'], basis: 'paraphrase', verificationStatus: 'verified',
    reviewNote: 'Sprint 04F: follows Law on Insurance Business Art. 26(1) (right to terminate when premium is unpaid by the deadline or after the grace period) and Art. 27(1)(b) (life insurer still pays for events before termination). The Law does not use the word "lapse"; reinstatement and automatic premium loans depend on product terms and were not checked.',
  },
  {
    id: 'li.persistency', term: 'Persistency', aliases: ['persistency rate', 'persistency ratio'], category: 'financial-metrics',
    definitionEn: 'The proportion of policies still in force at a stated duration, such as 13 or 25 months, under a stated method.',
    definitionVi: 'Tỷ lệ duy trì hợp đồng: tỷ lệ hợp đồng còn hiệu lực tại một mốc thời gian xác định (ví dụ 13 hoặc 25 tháng) theo phương pháp nêu rõ.',
    businessContextEn: 'Persistency is the clearest test of whether a channel sold the right products to the right customers.',
    businessContextVi: 'Tỷ lệ duy trì là phép thử rõ ràng nhất cho việc một kênh có bán đúng sản phẩm cho đúng khách hàng hay không.',
    sourceIds: [DT], basis: 'curriculum', verificationStatus: 'verified',
  },
  {
    id: 'li.protection-gap', term: 'Protection gap', aliases: ['protection gaps'], category: 'strategic',
    definitionEn: 'The difference between the amount of insurance that would be economically beneficial to both insured and insurer and the cover actually purchased or offered. Other measures use the uninsured share of economic losses.',
    definitionVi: 'Khoảng trống bảo vệ bảo hiểm: chênh lệch giữa mức bảo hiểm có lợi về kinh tế cho cả người được bảo hiểm lẫn doanh nghiệp bảo hiểm và mức bảo hiểm thực tế đã mua hoặc được cung cấp. Một số cách đo khác dùng phần tổn thất kinh tế không được bảo hiểm.',
    businessContextEn: 'A large protection gap signals growth potential but also low trust or affordability barriers.',
    businessContextVi: 'Khoảng trống bảo vệ lớn cho thấy tiềm năng tăng trưởng nhưng cũng phản ánh rào cản về niềm tin hoặc khả năng chi trả.',
    sourceIds: ['li-iais-protection-gap'], basis: 'official', verificationStatus: 'verified',
    reviewNote: 'Sprint 04F: definition follows the IAIS (2022) paper on pandemic protection gaps, which also notes that the protection gap is often measured as the uninsured share of economic losses. The business-context remark about trust and affordability barriers is an analyst comment, not sourced. The IAIS text concerns insurance generally, not Vietnamese life insurance specifically.',
  },
  {
    id: 'li.insurance-revenue', term: 'Insurance revenue', category: 'financial-metrics',
    definitionEn: 'The IFRS 17 measure of insurance services provided in the period—not the premium cash collected.',
    definitionVi: 'Doanh thu bảo hiểm (theo IFRS 17): giá trị dịch vụ bảo hiểm đã cung cấp trong kỳ – không phải số tiền phí bảo hiểm thu được.',
    businessContextEn: 'Under IFRS 17, fast premium growth no longer shows up immediately as revenue.',
    businessContextVi: 'Theo IFRS 17, phí bảo hiểm tăng nhanh không còn được ghi nhận ngay thành doanh thu.',
    sourceIds: [DT, 'li-ifrs17'], basis: 'curriculum', verificationStatus: 'verified',
  },
  {
    id: 'li.insurance-service-result', term: 'Insurance service result', category: 'financial-metrics',
    definitionEn: 'IFRS 17 insurance revenue less insurance service expenses and relevant reinsurance effects.',
    definitionVi: 'Kết quả dịch vụ bảo hiểm: doanh thu bảo hiểm theo IFRS 17 trừ chi phí dịch vụ bảo hiểm và ảnh hưởng của tái bảo hiểm liên quan.',
    businessContextEn: 'It separates underwriting performance from investment performance.',
    businessContextVi: 'Chỉ tiêu này tách hiệu quả kinh doanh bảo hiểm khỏi hiệu quả đầu tư.',
    sourceIds: [DT, 'li-ifrs17'], basis: 'curriculum', verificationStatus: 'verified',
  },
  {
    id: 'li.ifrs17', term: 'IFRS 17', fullForm: 'IFRS 17 Insurance Contracts', category: 'regulatory',
    definitionEn: 'The international accounting standard for insurance contracts, which recognises profit as insurance services are delivered over the contract life.',
    definitionVi: 'IFRS 17: chuẩn mực kế toán quốc tế về hợp đồng bảo hiểm, ghi nhận lợi nhuận dần theo dịch vụ bảo hiểm được cung cấp trong suốt thời hạn hợp đồng.',
    businessContextEn: 'IFRS 17 changes how insurers’ revenue and profit look, so old and new figures are not directly comparable.',
    businessContextVi: 'IFRS 17 thay đổi cách trình bày doanh thu và lợi nhuận của doanh nghiệp bảo hiểm, nên số liệu cũ và mới không so sánh trực tiếp được.',
    sourceIds: ['li-ifrs17'], basis: 'official', verificationStatus: 'verified',
  },
  {
    id: 'li.ape', term: 'Annual Premium Equivalent', acronym: 'APE', fullForm: 'Annual Premium Equivalent', category: 'financial-metrics',
    definitionEn: 'A new-business sales measure—typically regular premiums plus a fraction of single premiums—calculated under the reporting company’s stated method; it is not revenue or profit.',
    definitionVi: 'Phí bảo hiểm quy năm (APE): thước đo doanh số khai thác mới – thường gồm phí định kỳ cộng một phần phí đóng một lần – tính theo phương pháp doanh nghiệp công bố; không phải doanh thu hay lợi nhuận.',
    businessContextEn: 'APE lets analysts compare sales between insurers selling regular-premium and single-premium products.',
    businessContextVi: 'APE giúp so sánh doanh số giữa các doanh nghiệp bán sản phẩm đóng phí định kỳ và đóng phí một lần.',
    sourceIds: [DT], basis: 'curriculum', verificationStatus: 'verified',
    reviewNote: 'The “regular plus a fraction of single premiums” illustration is common practice; the curriculum defines APE only by the reporting entity’s method.',
  },
  {
    id: 'li.vnb', term: 'Value of new business', acronym: 'VNB', fullForm: 'Value of New Business', aliases: ['new business value'], category: 'financial-metrics',
    definitionEn: 'An actuarial estimate of the value created by new policies sold in a period, under stated assumptions and methods—not cash profit.',
    definitionVi: 'Giá trị hợp đồng mới (VNB): ước tính định phí về giá trị tạo ra từ các hợp đồng mới bán trong kỳ, theo giả định và phương pháp nêu rõ – không phải lợi nhuận bằng tiền.',
    businessContextEn: 'VNB margin (VNB ÷ APE) shows whether sales growth is profitable growth.',
    businessContextVi: 'Biên VNB (VNB ÷ APE) cho biết tăng trưởng doanh số có phải là tăng trưởng có lãi hay không.',
    sourceIds: [DT, 'li-iaa'], basis: 'curriculum', verificationStatus: 'verified',
  },
  {
    id: 'li.embedded-value', term: 'Embedded value', acronym: 'EV', fullForm: 'Embedded Value', category: 'financial-metrics',
    definitionEn: 'An actuarial estimate of adjusted net assets plus the value of future profits from in-force business, under stated assumptions.',
    definitionVi: 'Giá trị nội tại (EV): ước tính định phí bằng tài sản ròng điều chỉnh cộng giá trị lợi nhuận tương lai từ các hợp đồng đang có hiệu lực, theo giả định nêu rõ.',
    businessContextEn: 'Investors often value life insurers relative to embedded value rather than book value.',
    businessContextVi: 'Nhà đầu tư thường định giá doanh nghiệp bảo hiểm nhân thọ dựa trên giá trị nội tại thay vì giá trị sổ sách.',
    sourceIds: [DT, 'li-iaa'], basis: 'curriculum', verificationStatus: 'verified',
  },
  {
    id: 'li.agency', term: 'Agency channel', aliases: ['agency', 'agency distribution', 'tied agent', 'tied agents', 'agents'], category: 'business-models', annotate: false,
    definitionEn: 'Distribution through individuals or organisations authorised by an insurer under an agency contract; individual agents must hold an insurance-agent certificate.',
    definitionVi: 'Kênh đại lý: phân phối thông qua tổ chức, cá nhân được doanh nghiệp bảo hiểm ủy quyền trên cơ sở hợp đồng đại lý bảo hiểm; cá nhân làm đại lý phải có chứng chỉ đại lý bảo hiểm.',
    businessContextEn: 'Agents are usually paid commission and often work for one insurer. Agency builds long relationships but needs strong training and conduct controls.',
    businessContextVi: 'Đại lý thường hưởng hoa hồng và hay làm cho một doanh nghiệp bảo hiểm. Kênh đại lý xây dựng quan hệ lâu dài nhưng đòi hỏi đào tạo và kiểm soát hành vi bán hàng chặt chẽ.',
    sourceIds: ['li-vn-insurance-law'], basis: 'official', verificationStatus: 'verified',
    reviewNote: 'Sprint 04F: definition follows Law on Insurance Business Art. 124 (agent authorised by an insurer under an agency contract) and Art. 125(1)(c) (individual agents need a certificate). Commission and tied-agent remarks are in the business context and are analyst comments, not sourced.',
  },
  {
    id: 'li.underwriting', term: 'Insurance underwriting', aliases: ['underwriting'], category: 'business-processes',
    definitionEn: 'Assessing an applicant’s insurable risk, eligibility and terms using permitted information and professional judgement.',
    definitionVi: 'Thẩm định bảo hiểm: đánh giá rủi ro được bảo hiểm, điều kiện tham gia và điều khoản của người yêu cầu bảo hiểm dựa trên thông tin được phép sử dụng và chuyên môn.',
    businessContextEn: 'Not the same as credit underwriting: the question is the chance of a claim, not of repayment.',
    businessContextVi: 'Khác với thẩm định tín dụng: câu hỏi ở đây là khả năng phát sinh quyền lợi bảo hiểm, không phải khả năng trả nợ.',
    sourceIds: [DT, 'li-iais'], basis: 'curriculum', verificationStatus: 'verified',
  },
  {
    id: 'li.mortality-table', term: 'Mortality table', aliases: ['mortality tables', 'mortality assumption'], category: 'business-processes',
    definitionEn: 'A statistical table of death rates by age and other factors for a defined population and period, used in pricing and reserving.',
    definitionVi: 'Bảng tỷ lệ tử vong: bảng thống kê tỷ lệ tử vong theo độ tuổi và các yếu tố khác của một nhóm dân số và giai đoạn xác định, dùng để định phí và trích lập dự phòng.',
    businessContextEn: 'Pricing on the wrong mortality table can make a whole product line unprofitable for decades.',
    businessContextVi: 'Định phí theo bảng tử vong không phù hợp có thể khiến cả dòng sản phẩm thua lỗ trong nhiều thập kỷ.',
    sourceIds: [DT, 'li-iaa'], basis: 'curriculum', verificationStatus: 'verified',
  },
  {
    id: 'li.reserve', term: 'Technical reserve', aliases: ['reserve', 'reserves', 'policy reserve'], category: 'regulatory', annotate: false,
    definitionEn: 'A liability set up for future policy obligations under the applicable actuarial and accounting basis.',
    definitionVi: 'Dự phòng nghiệp vụ: khoản nợ phải trả được trích lập cho nghĩa vụ hợp đồng trong tương lai theo cơ sở định phí và kế toán áp dụng.',
    businessContextEn: 'Reserves explain why premium cash is not free money for the insurer.',
    businessContextVi: 'Dự phòng nghiệp vụ giải thích vì sao tiền phí thu được không phải tiền “tự do” của doanh nghiệp bảo hiểm.',
    sourceIds: [DT, 'li-vn-insurance-law'], basis: 'curriculum', verificationStatus: 'verified',
  },
  {
    id: 'li.reinsurance', term: 'Reinsurance', aliases: ['reinsurer', 'reinsurers'], category: 'business-models',
    definitionEn: 'A contract under which an insurer transfers a defined portion of its insurance risk to another insurer.',
    definitionVi: 'Tái bảo hiểm: hợp đồng theo đó doanh nghiệp bảo hiểm chuyển một phần rủi ro bảo hiểm xác định cho doanh nghiệp bảo hiểm khác.',
    businessContextEn: 'Reinsurance protects capital and lets smaller insurers write larger policies.',
    businessContextVi: 'Tái bảo hiểm bảo vệ vốn và giúp doanh nghiệp nhỏ nhận bảo hiểm cho hợp đồng lớn hơn.',
    sourceIds: [DT, 'li-iais'], basis: 'curriculum', verificationStatus: 'verified',
  },
  {
    id: 'li.solvency', term: 'Solvency', aliases: ['solvency margin', 'solvency ratio'], category: 'regulatory',
    definitionEn: 'An insurer’s financial capacity to meet its obligations under defined regulatory requirements.',
    definitionVi: 'Khả năng thanh toán (biên khả năng thanh toán): năng lực tài chính của doanh nghiệp bảo hiểm để đáp ứng nghĩa vụ theo yêu cầu quản lý.',
    businessContextEn: 'Solvency rules play the role for insurers that capital adequacy plays for banks.',
    businessContextVi: 'Quy định về khả năng thanh toán đóng vai trò với doanh nghiệp bảo hiểm tương tự an toàn vốn với ngân hàng.',
    sourceIds: [DT, 'li-vn-insurance-law', 'li-iais'], basis: 'curriculum', verificationStatus: 'verified',
  },
  {
    id: 'li.alm', term: 'Asset-liability management', acronym: 'ALM', fullForm: 'Asset-Liability Management', category: 'business-processes',
    definitionEn: 'Coordinating an insurer’s investments with its long-dated policy liabilities across timing, cash flow, risk and capital.',
    definitionVi: 'Quản lý tài sản – nợ (ALM): phối hợp danh mục đầu tư của doanh nghiệp bảo hiểm với nghĩa vụ hợp đồng dài hạn về thời điểm, dòng tiền, rủi ro và vốn.',
    businessContextEn: 'For life insurers, ALM is about decades-long promises, unlike a bank’s short-term funding focus.',
    businessContextVi: 'Với bảo hiểm nhân thọ, ALM xoay quanh các cam kết kéo dài hàng chục năm, khác với trọng tâm vốn ngắn hạn của ngân hàng.',
    sourceIds: [DT, 'li-iaa'], basis: 'curriculum', verificationStatus: 'verified',
  },
  {
    id: 'li.duration-matching', term: 'Duration matching', category: 'business-processes',
    definitionEn: 'Managing the timing and interest-rate sensitivity of assets relative to the duration of insurance liabilities.',
    definitionVi: 'Khớp kỳ hạn (duration matching): quản lý thời điểm dòng tiền và độ nhạy lãi suất của tài sản so với kỳ hạn của nợ bảo hiểm.',
    businessContextEn: 'Long-dated guarantees with short-dated assets leave insurers exposed when interest rates fall.',
    businessContextVi: 'Cam kết dài hạn nhưng nắm giữ tài sản ngắn hạn khiến doanh nghiệp bảo hiểm gặp rủi ro khi lãi suất giảm.',
    sourceIds: [DT], basis: 'curriculum', verificationStatus: 'verified',
  },
  // Sprint 04F: terms for the remaining 22 lessons. Sum assured is verified against the curriculum definitions
  // table; the others are plain-language explanations of chapter dimensions and stay unverified.
  {
    id: 'li.sum-assured', term: 'Sum assured', aliases: ['sums assured', 'sum insured'], category: 'essential-concepts',
    definitionEn: 'The contractually defined coverage amount used to determine eligible benefits under stated conditions.',
    definitionVi: 'Số tiền bảo hiểm: mức bảo hiểm được xác định trong hợp đồng, dùng để tính quyền lợi chi trả khi đủ điều kiện theo các điều khoản nêu rõ.',
    businessContextEn: 'Two policies with similar premiums can have very different sums assured, so compare cover before price.',
    businessContextVi: 'Hai hợp đồng có phí tương đương có thể có số tiền bảo hiểm rất khác nhau, nên cần so sánh quyền lợi trước khi so sánh phí.',
    sourceIds: [DT], basis: 'curriculum', verificationStatus: 'verified',
  },
  {
    id: 'li.rider', term: 'Rider', aliases: ['riders'], category: 'products-services',
    definitionEn: 'An optional add-on benefit attached to a base policy, such as accident or critical-illness cover, usually for an extra premium.',
    definitionVi: 'Sản phẩm bổ trợ (rider): quyền lợi bổ sung tùy chọn gắn với hợp đồng chính, ví dụ bảo hiểm tai nạn hoặc bệnh hiểm nghèo, thường tăng thêm phí bảo hiểm.',
    businessContextEn: 'Riders widen cover but add cost and conditions, so they belong in any policy comparison.',
    businessContextVi: 'Sản phẩm bổ trợ mở rộng quyền lợi nhưng thêm chi phí và điều kiện, nên cần đưa vào mọi phép so sánh hợp đồng.',
    sourceIds: [], basis: 'paraphrase', verificationStatus: 'needs-source',
    reviewNote: 'Sprint 04F: plain-language explanation of a chapter dimension; no source matched yet.',
  },
  {
    id: 'li.exclusion', term: 'Exclusion', aliases: ['exclusions'], category: 'essential-concepts', annotate: false,
    definitionEn: 'A situation, cause or risk that the policy does not cover, as stated in its terms.',
    definitionVi: 'Loại trừ bảo hiểm: tình huống, nguyên nhân hoặc rủi ro mà hợp đồng không chi trả, được nêu trong điều khoản.',
    businessContextEn: 'Clear exclusions reduce misunderstanding and claim disputes.',
    businessContextVi: 'Loại trừ được nêu rõ giúp giảm hiểu lầm và tranh chấp khi yêu cầu quyền lợi.',
    sourceIds: [], basis: 'paraphrase', verificationStatus: 'needs-source',
    reviewNote: 'Sprint 04F: plain-language explanation of a chapter dimension; no source matched yet.',
  },
  {
    id: 'li.whole-life', term: 'Whole life insurance', aliases: ['whole life'], category: 'products-services',
    definitionEn: 'A policy that provides cover for the insured person’s whole life as long as premiums are paid, usually with a savings or cash-value element.',
    definitionVi: 'Bảo hiểm trọn đời: hợp đồng bảo hiểm cho cả cuộc đời người được bảo hiểm khi còn đóng phí, thường có yếu tố tích lũy hoặc giá trị hoàn lại.',
    businessContextEn: 'It costs more per year than term cover because the insurer is committed for life.',
    businessContextVi: 'Chi phí mỗi năm cao hơn bảo hiểm tử kỳ vì doanh nghiệp bảo hiểm cam kết suốt đời.',
    sourceIds: ['li-decree-46-2023'], basis: 'paraphrase', verificationStatus: 'needs-review',
    reviewNote: 'Sprint 04F: Decree 46/2023 Art. 3 lists whole-life insurance (bao hiem tron doi) as an official life-insurance business line without defining it; the cash-value and cost remarks are standard industry reading, not quoted.',
  },
  {
    id: 'li.universal-life', term: 'Universal life', aliases: ['universal-linked'], category: 'products-services',
    definitionEn: 'A flexible life policy in which the policyholder can vary premium and sum assured within limits and a policy account builds up value.',
    definitionVi: 'Bảo hiểm liên kết chung (universal life): hợp đồng nhân thọ linh hoạt, bên mua bảo hiểm có thể điều chỉnh phí và số tiền bảo hiểm trong giới hạn và tài khoản hợp đồng tích lũy giá trị.',
    businessContextEn: 'Flexibility helps affordability but customers must understand charges and the non-guaranteed account value.',
    businessContextVi: 'Tính linh hoạt hỗ trợ khả năng chi trả nhưng khách hàng cần hiểu các loại phí và giá trị tài khoản không được đảm bảo.',
    sourceIds: ['li-decree-46-2023'], basis: 'paraphrase', verificationStatus: 'needs-review',
    reviewNote: 'Sprint 04F: Decree 46/2023 Art. 101(2)(d) gives policyholders flexibility in premium and sum insured for investment-linked lines, and Art. 103 covers universal-linked (lien ket chung) contracts and their account value. Treating "universal life" as the same product is an inference that still needs a regulator or professional-standard source.',
  },
  {
    id: 'li.risk-pooling', term: 'Risk pooling', category: 'essential-concepts',
    definitionEn: 'Collecting premiums from many policyholders into a common pool so that the losses of the few who claim are shared by all.',
    definitionVi: 'Chia sẻ rủi ro (risk pooling): thu phí bảo hiểm từ nhiều bên mua bảo hiểm vào một quỹ chung để tổn thất của một số ít người được nhiều người cùng san sẻ.',
    businessContextEn: 'Pooling only works when risks are priced and selected well; that is what underwriting and actuarial pricing do.',
    businessContextVi: 'Chia sẻ rủi ro chỉ hiệu quả khi rủi ro được định phí và chọn lọc tốt; đây là vai trò của thẩm định và định phí bảo hiểm.',
    sourceIds: [], basis: 'paraphrase', verificationStatus: 'needs-source',
    reviewNote: 'Sprint 04F: plain-language explanation of a chapter dimension; no source matched yet.',
  },
  {
    id: 'li.expense-ratio', term: 'Expense ratio', category: 'financial-metrics',
    definitionEn: 'Operating and acquisition expenses divided by a stated base, such as premiums, under the insurer’s disclosed method.',
    definitionVi: 'Tỷ lệ chi phí: chi phí hoạt động và chi phí khai thác chia cho một cơ sở nêu rõ (ví dụ phí bảo hiểm) theo phương pháp doanh nghiệp công bố.',
    businessContextEn: 'Compare expense ratios only when numerator, denominator and period match.',
    businessContextVi: 'Chỉ so sánh tỷ lệ chi phí khi tử số, mẫu số và kỳ báo cáo thống nhất.',
    sourceIds: [], basis: 'paraphrase', verificationStatus: 'needs-source',
    reviewNote: 'Sprint 04F: plain-language explanation of a chapter dimension; insurers define the ratio differently.',
  },
];

const SHARED = sharedTerms(['fin.bancassurance', 'fin.liquidity', 'fin.cac']);
const TERMS = [...LI_TERMS, ...SHARED];

const M1 = 'How the Industry Works';
const M2 = 'How Value Moves Through the Industry';
const M3 = 'How Companies Make Money';
const M4 = 'Who Competes—and Why They Win';
const M5 = 'What Is Changing Next';

const BANCASSURANCE_NOTE = {
  en: 'From the insurer’s side, bancassurance is a distribution channel: the bank earns commission while the insurer carries the risk and records the premium.',
  vi: 'Từ phía doanh nghiệp bảo hiểm, bancassurance là một kênh phân phối: ngân hàng nhận hoa hồng còn doanh nghiệp bảo hiểm chịu rủi ro và ghi nhận phí.',
};

export const LIFE_INSURANCE_GLOSSARY: CurriculumGlossaryData = {
  curriculumId: 'life-insurance',
  industry: 'Banking & Financial Services',
  subIndustry: 'Life Insurance',
  terms: TERMS,
  sources: collectSources(TERMS, LI_SOURCES),
  lessons: [
    {
      key: '1.1', module: M1, title: 'Industry Definition & Scope',
      chapters: {
        0: ['li.policyholder', 'li.premium', 'li.claim'],
        1: ['li.insured-person'],
        2: ['li.beneficiary'],
        3: ['li.term-life', 'li.endowment', 'li.participating-policy', 'li.surrender'],
        4: ['li.investment-linked', 'li.surrender'],
      },
      essential: ['li.policyholder', 'li.insured-person', 'li.beneficiary', 'li.premium', 'li.claim', 'li.term-life', 'li.endowment', 'li.participating-policy', 'li.investment-linked', 'li.surrender'],
    },
    {
      key: '1.3', module: M1, title: 'Global Market Overview',
      chapters: {
        0: ['li.premium', 'li.protection-gap'],
        1: ['li.insurance-revenue', 'li.ape', 'li.vnb'],
        3: ['li.agency', 'fin.bancassurance'],
        4: ['fin.bancassurance'],
      },
      essential: ['li.protection-gap', 'li.ape', 'li.vnb', 'li.insurance-revenue', 'li.agency', 'fin.bancassurance', 'li.premium'],
      contextNotes: { 'fin.bancassurance': BANCASSURANCE_NOTE },
    },
    {
      key: '2.2', module: M2, title: 'Upstream Activities',
      chapters: {
        0: ['li.reserve', 'li.reinsurance', 'li.solvency', 'li.policyholder'],
        1: ['li.premium', 'li.solvency', 'li.alm', 'li.policyholder'],
        2: ['li.mortality-table', 'li.underwriting', 'li.lapse', 'li.claim', 'li.premium'],
      },
      essential: ['li.reserve', 'li.reinsurance', 'li.solvency', 'li.alm', 'li.mortality-table', 'li.underwriting', 'li.lapse', 'li.premium', 'li.policyholder'],
    },
    {
      key: '3.4', module: M3, title: 'Revenue Streams & Cost Structure',
      chapters: {
        0: ['li.premium', 'li.claim', 'li.persistency', 'li.mortality-table'],
        1: ['li.alm', 'li.duration-matching', 'fin.liquidity'],
        2: ['li.ifrs17', 'li.insurance-revenue', 'li.insurance-service-result', 'li.lapse', 'li.persistency'],
      },
      essential: ['li.premium', 'li.insurance-revenue', 'li.ifrs17', 'li.insurance-service-result', 'li.persistency', 'li.alm', 'li.duration-matching', 'li.lapse'],
    },
    {
      key: '4.3', module: M4, title: 'Competitor Benchmarking',
      chapters: {
        0: ['li.ape', 'li.premium', 'li.surrender'],
        1: ['li.persistency', 'li.vnb', 'li.embedded-value', 'li.solvency'],
        2: ['li.solvency', 'li.persistency', 'li.claim', 'li.underwriting', 'li.expense-ratio'],
      },
      essential: ['li.ape', 'li.vnb', 'li.persistency', 'li.embedded-value', 'li.solvency', 'li.premium', 'li.surrender', 'li.claim', 'li.expense-ratio'],
    },
    {
      key: '1.2', module: M1, title: 'Industry History & Development',
      chapters: {
        0: ['li.risk-pooling', 'li.mortality-table', 'li.participating-policy', 'li.premium'],
        1: ['li.underwriting', 'li.agency', 'li.participating-policy'],
        2: ['li.underwriting'],
        3: ['li.claim'],
      },
      essential: ['li.risk-pooling', 'li.mortality-table', 'li.underwriting', 'li.participating-policy', 'li.premium', 'li.agency', 'li.claim'],
    },
    {
      key: '1.4', module: M1, title: 'Vietnam Market Overview',
      chapters: {
        0: ['li.premium'],
        1: ['li.protection-gap', 'li.premium'],
        2: ['li.premium'],
        3: ['li.agency', 'fin.bancassurance', 'li.claim'],
        4: ['li.agency', 'fin.bancassurance'],
      },
      essential: ['li.protection-gap', 'fin.bancassurance', 'li.agency', 'li.premium', 'li.claim'],
      contextNotes: { 'fin.bancassurance': BANCASSURANCE_NOTE },
    },
    {
      key: '1.5', module: M1, title: 'Industry Drivers & External Factors',
      chapters: {
        0: ['li.lapse', 'li.persistency', 'li.premium'],
        2: ['li.premium'],
        3: ['li.claim', 'li.solvency', 'li.surrender'],
        4: ['li.solvency', 'li.surrender', 'li.claim'],
      },
      essential: ['li.persistency', 'li.lapse', 'li.premium', 'li.solvency', 'li.surrender', 'li.claim'],
    },
    {
      key: '2.1', module: M2, title: 'Value Chain Overview',
      chapters: {
        0: ['li.premium', 'li.claim'],
        1: ['li.underwriting', 'li.premium'],
        2: ['li.policyholder', 'li.reinsurance'],
      },
      essential: ['li.policyholder', 'li.underwriting', 'li.premium', 'li.claim', 'li.reinsurance'],
    },
    {
      key: '2.3', module: M2, title: 'Midstream Activities',
      chapters: {
        0: ['li.premium', 'li.underwriting', 'li.sum-assured', 'li.exclusion'],
        1: ['li.premium', 'li.underwriting', 'li.sum-assured', 'li.rider', 'li.surrender'],
        2: ['li.underwriting'],
      },
      essential: ['li.underwriting', 'li.premium', 'li.sum-assured', 'li.exclusion', 'li.rider', 'li.surrender'],
    },
    {
      key: '2.4', module: M2, title: 'Downstream Activities',
      chapters: {
        0: ['li.claim', 'li.premium', 'li.persistency', 'li.beneficiary'],
        1: ['li.persistency', 'li.premium', 'li.beneficiary'],
        2: ['li.surrender', 'li.lapse', 'li.claim', 'li.beneficiary'],
      },
      essential: ['li.claim', 'li.beneficiary', 'li.premium', 'li.persistency', 'li.surrender', 'li.lapse'],
    },
    {
      key: '2.5', module: M2, title: 'Inputs, Outputs & Value Creation',
      chapters: {
        0: ['li.premium', 'li.claim'],
        1: ['li.premium'],
        2: ['li.vnb', 'li.solvency', 'li.persistency', 'li.premium', 'li.claim', 'li.policyholder', 'li.expense-ratio'],
      },
      essential: ['li.premium', 'li.claim', 'li.vnb', 'li.solvency', 'li.persistency', 'li.expense-ratio', 'li.policyholder'],
    },
    {
      key: '2.6', module: M2, title: 'Global vs. Local Value Chain',
      chapters: {
        1: ['li.reinsurance'],
        2: ['li.reinsurance', 'li.claim', 'li.premium'],
      },
      essential: ['li.reinsurance', 'li.claim', 'li.premium'],
    },
    {
      key: '3.1', module: M3, title: 'Industry Business Models',
      chapters: {
        0: ['li.underwriting', 'li.claim', 'li.premium', 'li.risk-pooling', 'li.whole-life'],
        1: ['li.term-life', 'li.premium', 'li.reinsurance', 'li.investment-linked', 'li.claim'],
        2: ['li.endowment', 'li.participating-policy', 'li.universal-life', 'li.investment-linked', 'fin.bancassurance', 'li.agency'],
      },
      essential: ['li.risk-pooling', 'li.term-life', 'li.whole-life', 'li.endowment', 'li.universal-life', 'li.participating-policy', 'li.investment-linked', 'fin.bancassurance', 'li.agency', 'li.reinsurance', 'li.underwriting', 'li.premium', 'li.claim'],
    },
    {
      key: '3.2', module: M3, title: 'Products, Services & Segmentation',
      chapters: {
        0: ['li.term-life', 'li.endowment', 'li.universal-life', 'li.rider', 'li.sum-assured', 'li.premium', 'li.underwriting', 'li.surrender', 'li.investment-linked'],
        1: ['li.whole-life', 'li.participating-policy', 'li.investment-linked', 'li.term-life', 'li.surrender', 'li.premium'],
        2: ['li.protection-gap'],
      },
      essential: ['li.term-life', 'li.whole-life', 'li.endowment', 'li.universal-life', 'li.participating-policy', 'li.investment-linked', 'li.rider', 'li.sum-assured', 'li.premium', 'li.surrender', 'li.underwriting', 'li.protection-gap'],
    },
    {
      key: '3.3', module: M3, title: 'Customer Segments & Needs',
      chapters: {
        0: ['li.premium', 'li.insured-person'],
        1: ['li.premium', 'li.insured-person'],
        2: ['li.underwriting'],
      },
      essential: ['li.premium', 'li.insured-person', 'li.underwriting'],
    },
    {
      key: '3.5', module: M3, title: 'Distribution & Sales Channels',
      chapters: {
        0: ['li.agency', 'li.premium'],
        1: ['fin.bancassurance', 'li.premium'],
      },
      essential: ['li.agency', 'fin.bancassurance', 'li.premium'],
      contextNotes: { 'fin.bancassurance': BANCASSURANCE_NOTE },
    },
    {
      key: '3.6', module: M3, title: 'Industry Ecosystem & Stakeholders',
      chapters: {
        0: ['li.policyholder', 'li.beneficiary', 'li.reinsurance'],
        1: ['li.reinsurance', 'li.agency'],
        2: ['li.solvency', 'li.policyholder'],
      },
      essential: ['li.policyholder', 'li.beneficiary', 'li.reinsurance', 'li.agency', 'li.solvency'],
    },
    {
      key: '4.1', module: M4, title: 'Industry Competition Structure',
      chapters: {
        0: ['li.premium', 'li.persistency', 'li.claim', 'li.investment-linked'],
        1: ['li.premium', 'li.persistency', 'li.claim'],
        2: ['li.reinsurance', 'li.claim'],
      },
      essential: ['li.premium', 'li.persistency', 'li.claim', 'li.investment-linked', 'li.reinsurance'],
    },
    {
      key: '4.2', module: M4, title: 'Key Industry Players',
      chapters: {
        0: ['li.agency', 'li.premium'],
        1: ['fin.bancassurance', 'li.premium'],
      },
      essential: ['li.agency', 'fin.bancassurance', 'li.premium'],
      contextNotes: { 'fin.bancassurance': BANCASSURANCE_NOTE },
    },
    {
      key: '4.4', module: M4, title: 'Key Success Factors',
      chapters: {
        0: ['li.underwriting', 'li.lapse', 'li.persistency', 'li.claim'],
        1: ['li.underwriting', 'li.lapse', 'li.persistency', 'li.claim'],
        2: ['li.alm', 'fin.liquidity', 'li.persistency', 'li.claim'],
      },
      essential: ['li.underwriting', 'li.persistency', 'li.lapse', 'li.claim', 'li.alm', 'fin.liquidity'],
    },
    {
      key: '4.5', module: M4, title: 'Industry SWOT & Strategic Challenges',
      chapters: {
        0: ['li.risk-pooling', 'li.protection-gap', 'fin.cac'],
        2: ['li.lapse', 'li.claim'],
      },
      essential: ['li.protection-gap', 'li.risk-pooling', 'fin.cac', 'li.lapse', 'li.claim'],
    },
    {
      key: '5.1', module: M5, title: 'Consumer Trends',
      chapters: {
        0: ['li.premium'],
        1: ['li.premium'],
        2: ['li.claim', 'li.investment-linked', 'li.surrender'],
      },
      essential: ['li.premium', 'li.claim', 'li.investment-linked', 'li.surrender'],
    },
    {
      key: '5.2', module: M5, title: 'Technology & Innovation Trends',
      chapters: {
        0: ['li.underwriting', 'li.claim'],
        1: ['li.underwriting', 'li.claim'],
        2: ['li.claim', 'li.premium'],
      },
      essential: ['li.underwriting', 'li.claim', 'li.premium'],
    },
    {
      key: '5.3', module: M5, title: 'Market & Channel Trends',
      chapters: {
        0: ['li.agency'],
        1: ['fin.bancassurance'],
      },
      essential: ['li.agency', 'fin.bancassurance'],
      contextNotes: { 'fin.bancassurance': BANCASSURANCE_NOTE },
    },
    {
      key: '5.4', module: M5, title: 'Regulatory & Sustainability Trends',
      chapters: {
        0: ['li.solvency', 'li.underwriting', 'li.policyholder', 'li.claim'],
        1: ['li.underwriting', 'li.claim'],
        2: ['li.premium', 'li.claim'],
      },
      essential: ['li.solvency', 'li.policyholder', 'li.underwriting', 'li.claim', 'li.premium'],
    },
    {
      key: '5.5', module: M5, title: 'Growth Outlook & Strategic Opportunities',
      chapters: {
        0: ['li.protection-gap', 'li.persistency', 'li.underwriting', 'li.claim'],
        1: ['li.persistency', 'li.underwriting', 'li.claim'],
        2: ['li.persistency', 'li.claim'],
      },
      essential: ['li.protection-gap', 'li.persistency', 'li.underwriting', 'li.claim'],
    },
  ],
  flaggedAcronyms: [
    { acronym: 'CSM', status: 'not-yet-authored', note: 'IFRS 17 contractual service margin appears in Module 3; chapter placement not yet confirmed, so it is not mapped.' },
    { acronym: 'CAR', status: 'ambiguous', note: 'Lesson 4.3 mentions “capital adequacy” for insurers; insurers use solvency measures, so the banking CAR entry is deliberately not reused.' },
  ],
};
