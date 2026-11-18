// Payments & Fintech Essential Terms (initial lessons only). Verified definitions follow the
// curriculum's sourced definitions table in paymentsFintechCore.tsx; institution entries cite the
// official sites already in the curriculum source registry.
import type { CurriculumGlossaryData, GlossarySource, GlossaryTermDef } from '../glossaryTypes';
import { collectSources, sharedTerms } from './financeSharedTerms';

const DT = 'fin-pf-key-terms';

const PF_SOURCES: GlossarySource[] = [
  { id: 'pf-pfmi', title: 'Principles for Financial Market Infrastructures', url: 'https://www.bis.org/cpmi/publ/d101a.htm', publisher: 'BIS CPMI / IOSCO' },
  { id: 'pf-vn-payments', title: 'Decree No. 52/2024/ND-CP on Non-cash Payments', url: 'https://vanban.chinhphu.vn/?docid=210262&pageid=27160', publisher: 'Government of Vietnam', note: 'URL corrected in Sprint 04F: the earlier docid=210315 resolves to Decree 58/2024/ND-CP (forestry). Art. 3 defines payment-intermediary organisations, e-wallet, payment-gateway, financial-switching and electronic-clearing services.' },
  { id: 'pf-fsb-fintech', title: 'Financial Innovation (FinTech working definition)', url: 'https://www.fsb.org/work-of-the-fsb/financial-innovation-and-structural-change/financial-innovation/', publisher: 'Financial Stability Board' },
  { id: 'pf-cpmi-fast', title: 'Fast payments — Enhancing the speed and availability of retail payments', url: 'https://www.bis.org/publications/fast-payments-enhancing-speed-and-availability-retail-payments.pdf', publisher: 'BIS CPMI' },
  { id: 'pf-pci', title: 'Payment Card Industry Data Security Standard', url: 'https://www.pcisecuritystandards.org/standards/pci-dss/', publisher: 'PCI Security Standards Council' },
  { id: 'pf-vnpay', title: 'VNPAY official information', url: 'https://vnpay.vn/', publisher: 'VNPAY' },
  { id: 'pf-momo', title: 'MoMo official information', url: 'https://www.momo.vn/', publisher: 'MoMo' },
  { id: 'pf-zalopay', title: 'ZaloPay official information', url: 'https://zalopay.vn/', publisher: 'ZaloPay' },
];

const PF_TERMS: GlossaryTermDef[] = [
  {
    id: 'pf.fintech', term: 'Fintech', aliases: ['fintechs', 'financial technology'], category: 'essential-concepts', annotate: false,
    definitionEn: 'Technology-enabled innovation in financial services that can create new business models, applications, processes or products with a material effect on financial markets, institutions and the provision of financial services.',
    definitionVi: 'Fintech (công nghệ tài chính): đổi mới sáng tạo dựa trên công nghệ trong dịch vụ tài chính, có thể tạo ra mô hình kinh doanh, ứng dụng, quy trình hoặc sản phẩm mới và tác động đáng kể đến thị trường tài chính, các định chế và việc cung cấp dịch vụ tài chính.',
    businessContextEn: 'Fintech can come from start-ups, technology platforms or incumbent banks, and it touches many areas of financial services, payments included.',
    businessContextVi: 'Fintech có thể đến từ công ty khởi nghiệp, nền tảng công nghệ hoặc chính các ngân hàng, và tác động đến nhiều lĩnh vực dịch vụ tài chính, trong đó có thanh toán.',
    sourceIds: ['pf-fsb-fintech'], basis: 'official', verificationStatus: 'verified',
    reviewNote: 'Wording follows the FSB working definition of FinTech (fetched Sprint 04F). The earlier remark that payments is the largest Vietnamese fintech segment was removed because no source supports it.',
  },
  {
    id: 'pf.payment-intermediary', term: 'Payment intermediary', aliases: ['intermediary payment services', 'payment intermediaries', 'payment service provider', 'PSP'], category: 'institutions',
    definitionEn: 'A licensed non-bank provider of intermediary payment services—such as e-wallets, payment gateways or switching—under Vietnam’s non-cash payment rules.',
    definitionVi: 'Tổ chức trung gian thanh toán: tổ chức không phải ngân hàng được cấp phép cung ứng dịch vụ trung gian thanh toán – như ví điện tử, cổng thanh toán hoặc chuyển mạch – theo quy định về thanh toán không dùng tiền mặt của Việt Nam.',
    businessContextEn: 'These licences let fintechs move money without being banks, but they still depend on bank partners for accounts and settlement.',
    businessContextVi: 'Giấy phép này cho phép fintech chuyển tiền mà không phải là ngân hàng, nhưng vẫn phụ thuộc ngân hàng đối tác về tài khoản và quyết toán.',
    sourceIds: ['pf-vn-payments'], basis: 'paraphrase', verificationStatus: 'verified',
  },
  {
    id: 'pf.acquirer', term: 'Acquirer', aliases: ['acquirers', 'acquiring bank', 'merchant acquiring', 'acquiring'], category: 'institutions',
    definitionEn: 'The institution or provider that enables merchants to accept supported payments and receive settlement.',
    definitionVi: 'Đơn vị chấp nhận thanh toán (acquirer): tổ chức hoặc nhà cung cấp giúp người bán chấp nhận các phương thức thanh toán và nhận tiền quyết toán.',
    businessContextEn: 'Acquirers earn from the merchant fee after paying interchange and scheme fees.',
    businessContextVi: 'Acquirer có thu nhập từ phí người bán sau khi trả phí trao đổi và phí tổ chức thẻ.',
    sourceIds: [DT, 'pf-pfmi'], basis: 'curriculum', verificationStatus: 'verified',
  },
  {
    id: 'pf.issuer', term: 'Issuer', aliases: ['issuers', 'issuing bank', 'card issuer'], category: 'institutions',
    definitionEn: 'The institution that provides the customer’s payment account or instrument, such as a card, and authorises its use.',
    definitionVi: 'Tổ chức phát hành (issuer): tổ chức cung cấp tài khoản hoặc phương tiện thanh toán (như thẻ) cho khách hàng và cấp phép sử dụng.',
    businessContextEn: 'The issuer decides whether to approve each transaction and carries the cardholder relationship.',
    businessContextVi: 'Tổ chức phát hành quyết định chấp thuận từng giao dịch và nắm giữ quan hệ với chủ thẻ.',
    sourceIds: [DT, 'pf-pfmi'], basis: 'curriculum', verificationStatus: 'verified',
  },
  {
    id: 'pf.payment-gateway', term: 'Payment gateway', aliases: ['payment gateways', 'gateway', 'gateways'], category: 'products-services',
    definitionEn: 'Technology that connects a merchant’s checkout to processors or acquiring infrastructure.',
    definitionVi: 'Cổng thanh toán: công nghệ kết nối trang thanh toán của người bán với đơn vị xử lý hoặc hạ tầng chấp nhận thanh toán.',
    businessContextEn: 'Gateways compete on conversion, uptime and the range of payment methods they connect.',
    businessContextVi: 'Các cổng thanh toán cạnh tranh về tỷ lệ chuyển đổi, độ ổn định và số phương thức thanh toán kết nối được.',
    sourceIds: [DT, 'pf-vn-payments'], basis: 'curriculum', verificationStatus: 'verified',
  },
  {
    id: 'pf.payment-initiation', term: 'Payment initiation', category: 'business-processes',
    definitionEn: 'Creating and submitting a payment instruction by an authorised user or service.',
    definitionVi: 'Khởi tạo thanh toán: tạo và gửi lệnh thanh toán bởi người dùng hoặc dịch vụ được ủy quyền.',
    businessContextEn: 'Initiation is the first step of every payment and the main fraud entry point.',
    businessContextVi: 'Khởi tạo là bước đầu tiên của mọi giao dịch và là cửa ngõ chính của gian lận.',
    sourceIds: [DT, 'pf-pfmi'], basis: 'curriculum', verificationStatus: 'verified',
  },
  {
    id: 'pf.authentication', term: 'Authentication', category: 'business-processes',
    definitionEn: 'Verifying that a person, device or credential is permitted to initiate or approve an action, for example with an OTP or biometrics.',
    definitionVi: 'Xác thực: kiểm tra một người, thiết bị hoặc thông tin định danh có được phép khởi tạo hoặc phê duyệt giao dịch hay không, ví dụ bằng OTP hoặc sinh trắc học.',
    businessContextEn: 'Stronger authentication cuts fraud but can add friction and lower conversion.',
    businessContextVi: 'Xác thực mạnh hơn giúp giảm gian lận nhưng có thể làm thao tác phức tạp hơn và giảm tỷ lệ chuyển đổi.',
    sourceIds: [DT, 'pf-pci'], basis: 'curriculum', verificationStatus: 'verified',
  },
  {
    id: 'pf.authorisation', term: 'Authorisation', aliases: ['authorization', 'authorisation request'], category: 'business-processes',
    definitionEn: 'The issuer’s or system’s decision to approve or decline a transaction request.',
    definitionVi: 'Cấp phép giao dịch (authorisation): quyết định của tổ chức phát hành hoặc hệ thống về việc chấp thuận hay từ chối một yêu cầu giao dịch.',
    businessContextEn: 'Unnecessary declines lose sales, so authorisation rate is a key merchant KPI.',
    businessContextVi: 'Từ chối không cần thiết làm mất doanh số, nên tỷ lệ cấp phép là chỉ số quan trọng với người bán.',
    sourceIds: [DT], basis: 'curriculum', verificationStatus: 'verified',
  },
  {
    id: 'pf.clearing', term: 'Clearing', category: 'business-processes',
    definitionEn: 'Transmitting, validating and calculating payment obligations between participants before settlement.',
    definitionVi: 'Bù trừ (clearing): truyền, kiểm tra và tính toán nghĩa vụ thanh toán giữa các bên tham gia trước khi quyết toán.',
    businessContextEn: 'Clearing tells each bank how much it owes or is owed; settlement actually moves the money.',
    businessContextVi: 'Bù trừ cho mỗi ngân hàng biết mình phải trả hay được nhận bao nhiêu; quyết toán mới thực sự chuyển tiền.',
    sourceIds: [DT, 'pf-pfmi'], basis: 'curriculum', verificationStatus: 'verified',
  },
  {
    id: 'pf.settlement', term: 'Settlement', category: 'business-processes', annotate: false,
    definitionEn: 'The final transfer of funds or discharge of obligations under the relevant system’s rules.',
    definitionVi: 'Quyết toán (settlement): việc chuyển tiền cuối cùng hoặc hoàn tất nghĩa vụ thanh toán theo quy tắc của hệ thống liên quan.',
    businessContextEn: 'Merchants care about settlement speed because it affects their cash flow.',
    businessContextVi: 'Người bán quan tâm tốc độ quyết toán vì nó ảnh hưởng tới dòng tiền của họ.',
    sourceIds: [DT, 'pf-pfmi'], basis: 'curriculum', verificationStatus: 'verified',
  },
  {
    id: 'pf.reconciliation', term: 'Reconciliation', category: 'business-processes',
    definitionEn: 'Matching transaction, fee, refund and settlement records across systems and parties.',
    definitionVi: 'Đối soát: khớp dữ liệu giao dịch, phí, hoàn tiền và quyết toán giữa các hệ thống và các bên.',
    businessContextEn: 'Poor reconciliation creates disputes and hidden losses for merchants and providers.',
    businessContextVi: 'Đối soát kém gây tranh chấp và tổn thất ngầm cho người bán và nhà cung cấp dịch vụ.',
    sourceIds: [DT], basis: 'curriculum', verificationStatus: 'verified',
  },
  {
    id: 'pf.card-network', term: 'Card network', aliases: ['card networks', 'card scheme', 'card schemes'], category: 'institutions',
    definitionEn: 'A card (payment card) scheme: a single set of rules, practices and standards for executing card-based payments, run by a body accountable for the scheme. In a four-party scheme the payment passes through the scheme, an issuer on the payer’s side and an acquirer on the payee’s side.',
    definitionVi: 'Tổ chức thẻ (mạng lưới thẻ): bộ quy tắc, thực tiễn và tiêu chuẩn thống nhất để thực hiện giao dịch thanh toán bằng thẻ, do một đơn vị chịu trách nhiệm về việc vận hành. Ở mô hình bốn bên, giao dịch đi qua tổ chức thẻ, ngân hàng phát hành ở phía người trả và ngân hàng thanh toán ở phía người nhận.',
    businessContextEn: 'Visa and Mastercard are the best-known international schemes; NAPAS runs the domestic switching network (see its own entry). Schemes charge scheme fees and their rules shape interchange.',
    businessContextVi: 'Visa và Mastercard là hai tổ chức thẻ quốc tế nổi tiếng nhất; NAPAS vận hành mạng chuyển mạch trong nước (xem mục riêng). Tổ chức thẻ thu phí tổ chức thẻ và quy tắc của họ ảnh hưởng đến phí trao đổi.',
    sourceIds: ['fin-eu-ifr'], basis: 'official', verificationStatus: 'verified',
    reviewNote: 'Definition follows Regulation (EU) 2015/751 Art. 2(16)-(17) (EUR-Lex, fetched Sprint 04F), an international reference rather than a Vietnamese rule. The named examples (Visa, Mastercard) are common knowledge and are not stated in the Regulation; the NAPAS role is covered by the fin.napas entry.',
  },
  {
    id: 'pf.a2a', term: 'Account-to-account payment', aliases: ['account-to-account', 'A2A'], category: 'products-services',
    definitionEn: 'A payment that moves money directly from the payer’s bank account to the payee’s account, without a card network.',
    definitionVi: 'Thanh toán tài khoản đến tài khoản (A2A): giao dịch chuyển tiền trực tiếp từ tài khoản ngân hàng của người trả tới tài khoản người nhận, không qua tổ chức thẻ.',
    businessContextEn: 'Instant A2A transfers and QR have made card-free payments mainstream in Vietnam.',
    businessContextVi: 'Chuyển khoản A2A tức thời và QR đã đưa thanh toán không dùng thẻ trở nên phổ biến tại Việt Nam.',
    sourceIds: ['pf-vn-payments'], basis: 'paraphrase', verificationStatus: 'needs-review',
    reviewNote: 'Sprint 04F: Decree 52/2024 Art. 3(2) defines payment services through a customer payment account (credit transfers, payment orders), which is the underlying concept, but neither it nor the BIS fast-payments report defines "account-to-account" as a term, and the "without a card network" part is not stated in either. Needs an authoritative A2A definition before it can be verified.',
  },
  {
    id: 'pf.instant-payment', term: 'Instant payment', aliases: ['instant payments', 'real-time payment', 'real-time payments', 'instant transfer'], category: 'products-services',
    definitionEn: 'A payment in which the payment message is transmitted and final funds become available to the payee in real time or near real time, on as near to a 24-hour, 7-day basis as possible (also called a fast payment).',
    definitionVi: 'Thanh toán tức thời (thanh toán nhanh): giao dịch trong đó lệnh thanh toán được truyền đi và người nhận có sẵn tiền cuối cùng theo thời gian thực hoặc gần thời gian thực, vào bất kỳ giờ nào, mỗi ngày trong tuần ở mức cao nhất có thể.',
    businessContextEn: 'Instant rails raise customer expectations and compress the value of slower payment methods.',
    businessContextVi: 'Hạ tầng thanh toán tức thời nâng kỳ vọng của khách hàng và làm giảm giá trị của các phương thức chậm hơn.',
    sourceIds: ['pf-cpmi-fast'], basis: 'official', verificationStatus: 'verified',
    reviewNote: 'Definition follows the BIS CPMI definition of fast payments (fetched Sprint 04F). The business-context sentence is an analyst remark, not a sourced claim.',
  },
  {
    id: 'pf.tpv', term: 'Total payment volume', acronym: 'TPV', fullForm: 'Total Payment Volume', aliases: ['payment volume'], category: 'financial-metrics',
    definitionEn: 'The gross value of defined payment transactions processed in a period—not the provider’s revenue.',
    definitionVi: 'Tổng giá trị thanh toán (TPV): tổng giá trị các giao dịch thanh toán được xử lý trong kỳ – không phải doanh thu của nhà cung cấp.',
    businessContextEn: 'Headline TPV can be huge while revenue is small; multiply by the take rate to see the money.',
    businessContextVi: 'TPV có thể rất lớn trong khi doanh thu nhỏ; nhân với tỷ lệ thu phí (take rate) mới thấy được doanh thu.',
    sourceIds: [DT], basis: 'curriculum', verificationStatus: 'verified',
  },
  {
    id: 'pf.take-rate', term: 'Take rate', aliases: ['take-rate'], category: 'financial-metrics',
    definitionEn: 'Revenue captured relative to total payment value, under a stated numerator, denominator and period.',
    definitionVi: 'Tỷ lệ thu phí (take rate): doanh thu thu được so với tổng giá trị thanh toán, theo tử số, mẫu số và kỳ được nêu rõ.',
    businessContextEn: 'Take rates fall as competition and free transfers spread, so providers look for value-added services.',
    businessContextVi: 'Take rate giảm khi cạnh tranh và chuyển khoản miễn phí lan rộng, buộc nhà cung cấp tìm dịch vụ giá trị gia tăng.',
    sourceIds: [DT], basis: 'curriculum', verificationStatus: 'verified',
  },
  {
    id: 'pf.mdr', term: 'Merchant discount rate', acronym: 'MDR', fullForm: 'Merchant Discount Rate', category: 'financial-metrics',
    definitionEn: 'The total fee a merchant pays to accept a payment under its agreement. It can include pass-through costs such as interchange, so it is not the processor’s profit margin.',
    definitionVi: 'Phí chiết khấu thương mại (MDR): tổng phí người bán trả để chấp nhận thanh toán theo hợp đồng. MDR có thể gồm các khoản chuyển tiếp như phí trao đổi, nên không phải biên lợi nhuận của đơn vị xử lý.',
    businessContextEn: 'MDR is a key driver of merchant adoption; QR’s lower acceptance cost helped it spread among small merchants.',
    businessContextVi: 'MDR ảnh hưởng mạnh tới quyết định chấp nhận thanh toán của người bán; chi phí thấp của QR giúp phương thức này lan rộng ở tiểu thương.',
    sourceIds: [DT], basis: 'curriculum', verificationStatus: 'verified',
  },
  {
    id: 'pf.scheme-fee', term: 'Scheme fee', aliases: ['scheme fees', 'network fee'], category: 'financial-metrics',
    definitionEn: 'A fee charged by the card network to issuers and acquirers for using its network and services.',
    definitionVi: 'Phí tổ chức thẻ (scheme fee): khoản phí tổ chức thẻ thu từ ngân hàng phát hành và đơn vị chấp nhận thanh toán khi sử dụng mạng lưới và dịch vụ của mình.',
    businessContextEn: 'Scheme fees and interchange are pass-through costs inside the merchant’s MDR.',
    businessContextVi: 'Phí tổ chức thẻ và phí trao đổi là các chi phí chuyển tiếp nằm trong MDR của người bán.',
    sourceIds: ['fin-eu-ifr'], basis: 'paraphrase', verificationStatus: 'needs-review',
    reviewNote: 'Sprint 04F: Regulation (EU) 2015/751 Art. 9(2) distinguishes merchant service charges, interchange fees and scheme fees but does not define "scheme fee". The definition (a fee charged by the scheme to issuers and acquirers) is the standard industry reading and still needs a scheme-rule or regulator source.',
  },
  {
    id: 'pf.vnpay', term: 'VNPAY', category: 'institutions',
    definitionEn: 'A Vietnamese payment technology company offering QR payment, payment gateway and related services to banks and merchants.',
    definitionVi: 'VNPAY: công ty công nghệ thanh toán của Việt Nam, cung cấp dịch vụ thanh toán QR, cổng thanh toán và các dịch vụ liên quan cho ngân hàng và người bán.',
    businessContextEn: 'VNPAY works largely through bank partners rather than as a stand-alone consumer wallet.',
    businessContextVi: 'VNPAY hoạt động chủ yếu thông qua ngân hàng đối tác thay vì là một ví tiêu dùng độc lập.',
    sourceIds: ['pf-vnpay'], basis: 'paraphrase', verificationStatus: 'verified',
    reviewNote: 'Identity checked against the official site in the curriculum registry; the business-context remark is an analyst summary.',
  },
  {
    id: 'pf.momo', term: 'MoMo', category: 'institutions',
    definitionEn: 'A Vietnamese e-wallet and payment app used for transfers, bill payments and merchant payments.',
    definitionVi: 'MoMo: ví điện tử và ứng dụng thanh toán của Việt Nam, dùng để chuyển tiền, thanh toán hóa đơn và thanh toán tại người bán.',
    businessContextEn: 'Large wallets like MoMo use payments as a gateway to cross-sell other financial products.',
    businessContextVi: 'Các ví lớn như MoMo dùng thanh toán làm cửa ngõ để bán chéo các sản phẩm tài chính khác.',
    sourceIds: ['pf-momo'], basis: 'paraphrase', verificationStatus: 'verified',
  },
  {
    id: 'pf.zalopay', term: 'ZaloPay', category: 'institutions',
    definitionEn: 'A Vietnamese e-wallet and payment app connected to the Zalo messaging ecosystem.',
    definitionVi: 'ZaloPay: ví điện tử và ứng dụng thanh toán của Việt Nam, gắn với hệ sinh thái nhắn tin Zalo.',
    businessContextEn: 'Being inside a messaging app lowers acquisition cost—an example of ecosystem distribution.',
    businessContextVi: 'Nằm trong ứng dụng nhắn tin giúp giảm chi phí thu hút khách hàng – ví dụ về phân phối dựa trên hệ sinh thái.',
    sourceIds: ['pf-zalopay'], basis: 'paraphrase', verificationStatus: 'verified',
  },
  // Sprint 04F: terms for the remaining lessons. Entries marked DT are verified against the curriculum definitions
  // table (paymentsFintechCore.tsx); payment switching is verified against Decree 52/2024 Art. 3(13); the rest are
  // plain-language explanations of chapter dimensions and stay unverified.
  {
    id: 'pf.payment-switch', term: 'Payment switching', aliases: ['payment switch', 'domestic switch', 'switching', 'switch', 'financial switching'], category: 'business-processes',
    definitionEn: 'Financial switching: supplying the technical infrastructure that connects, transmits and processes the electronic data of domestic payment transactions between payment-service providers, credit-card-issuing finance companies and payment-intermediary organisations.',
    definitionVi: 'Chuyển mạch tài chính: cung ứng hạ tầng kỹ thuật kết nối, truyền dẫn và xử lý dữ liệu điện tử các giao dịch thanh toán trong nước giữa các tổ chức cung ứng dịch vụ thanh toán, công ty tài chính được phép phát hành thẻ tín dụng và tổ chức cung ứng dịch vụ trung gian thanh toán.',
    businessContextEn: 'A shared switch is why a customer of one bank can pay a merchant at another; NAPAS is the national example.',
    businessContextVi: 'Hạ tầng chuyển mạch dùng chung giúp khách hàng ngân hàng này thanh toán cho điểm bán ở ngân hàng khác; NAPAS là ví dụ cấp quốc gia.',
    sourceIds: ['pf-vn-payments'], basis: 'official', verificationStatus: 'verified',
    reviewNote: 'Sprint 04F: wording follows Decree 52/2024/ND-CP Art. 3(13) (dich vu chuyen mach tai chinh), fetched from the official PDF.',
  },
  {
    id: 'pf.payment-processor', term: 'Payment processor', aliases: ['payment processors', 'payment processing', 'processor', 'processors'], category: 'institutions',
    definitionEn: 'A provider that transmits and processes payment messages among the relevant parties.',
    definitionVi: 'Đơn vị xử lý thanh toán: nhà cung cấp truyền và xử lý các thông điệp thanh toán giữa các bên liên quan.',
    businessContextEn: 'Processors sit between merchants, acquirers and networks, so their uptime directly affects merchants’ sales.',
    businessContextVi: 'Đơn vị xử lý nằm giữa người bán, ngân hàng thanh toán và tổ chức thẻ, nên độ ổn định của họ ảnh hưởng trực tiếp đến doanh số của người bán.',
    sourceIds: [DT], basis: 'curriculum', verificationStatus: 'verified',
  },
  {
    id: 'pf.chargeback', term: 'Chargeback', aliases: ['chargebacks'], category: 'business-processes',
    definitionEn: 'A reversal process for eligible disputed card transactions under network and contractual rules.',
    definitionVi: 'Chargeback (hoàn trả giao dịch tranh chấp): quy trình đảo ngược các giao dịch thẻ đủ điều kiện bị tranh chấp theo quy tắc của tổ chức thẻ và hợp đồng.',
    businessContextEn: 'Merchants bear chargeback cost and effort, so dispute workflows are part of their unit economics.',
    businessContextVi: 'Người bán chịu chi phí và công sức xử lý chargeback, nên quy trình xử lý tranh chấp là một phần hiệu quả kinh tế của họ.',
    sourceIds: [DT], basis: 'curriculum', verificationStatus: 'verified',
  },
  {
    id: 'pf.interoperability', term: 'Interoperability', category: 'essential-concepts',
    definitionEn: 'The ability of different systems and participants to exchange and use payment information reliably.',
    definitionVi: 'Khả năng tương thích liên thông: khả năng các hệ thống và đơn vị tham gia khác nhau trao đổi và sử dụng thông tin thanh toán một cách tin cậy.',
    businessContextEn: 'Interoperability decides whether a payer at one provider can reach a merchant at another.',
    businessContextVi: 'Tương thích liên thông quyết định người trả ở nhà cung cấp này có thanh toán được cho người bán ở nhà cung cấp khác hay không.',
    sourceIds: [DT], basis: 'curriculum', verificationStatus: 'verified',
  },
  {
    id: 'pf.tokenisation', term: 'Tokenisation', aliases: ['tokenization'], category: 'business-processes',
    definitionEn: 'Replacing sensitive payment data with a controlled surrogate value.',
    definitionVi: 'Mã hóa thành token (tokenisation): thay dữ liệu thanh toán nhạy cảm bằng một giá trị thay thế được kiểm soát.',
    businessContextEn: 'Tokens let merchants store a reference instead of card numbers, reducing the damage of a data breach.',
    businessContextVi: 'Token cho phép người bán lưu mã tham chiếu thay vì số thẻ, giảm thiệt hại khi rò rỉ dữ liệu.',
    sourceIds: [DT], basis: 'curriculum', verificationStatus: 'verified',
  },
  {
    id: 'pf.payment-orchestration', term: 'Payment orchestration', aliases: ['orchestration'], category: 'products-services',
    definitionEn: 'Software that coordinates multiple payment methods, providers, routing rules and transaction data.',
    definitionVi: 'Điều phối thanh toán (payment orchestration): phần mềm phối hợp nhiều phương thức thanh toán, nhà cung cấp, quy tắc định tuyến và dữ liệu giao dịch.',
    businessContextEn: 'Routing a payment to the provider most likely to approve it can lift success rates without changing the customer journey.',
    businessContextVi: 'Định tuyến giao dịch tới nhà cung cấp có khả năng chấp thuận cao nhất có thể nâng tỷ lệ thành công mà không đổi trải nghiệm khách hàng.',
    sourceIds: [DT], basis: 'curriculum', verificationStatus: 'verified',
  },
  {
    id: 'pf.authorisation-rate', term: 'Authorisation rate', aliases: ['authorization rate'], category: 'financial-metrics',
    definitionEn: 'Approved authorisation requests divided by eligible requests, under a stated stage and denominator.',
    definitionVi: 'Tỷ lệ cấp phép giao dịch: số yêu cầu cấp phép được chấp thuận chia cho số yêu cầu đủ điều kiện, theo giai đoạn và mẫu số được nêu rõ.',
    businessContextEn: 'Each unnecessary decline is a lost sale, so merchants track this rate closely.',
    businessContextVi: 'Mỗi lần từ chối không cần thiết là một đơn hàng bị mất, nên người bán theo dõi sát tỷ lệ này.',
    sourceIds: [DT], basis: 'curriculum', verificationStatus: 'verified',
  },
  {
    id: 'pf.payment-success-rate', term: 'Payment success rate', aliases: ['success rate'], category: 'financial-metrics',
    definitionEn: 'Successful transactions divided by eligible transaction attempts at a defined stage and period.',
    definitionVi: 'Tỷ lệ giao dịch thành công: số giao dịch thành công chia cho số lần thử đủ điều kiện tại một giai đoạn và kỳ xác định.',
    businessContextEn: 'Small gains in success rate are worth a lot at scale, and outages damage trust quickly.',
    businessContextVi: 'Mức tăng nhỏ về tỷ lệ thành công có giá trị lớn khi quy mô lớn, và sự cố làm mất niềm tin rất nhanh.',
    sourceIds: [DT], basis: 'curriculum', verificationStatus: 'verified',
  },
  {
    id: 'pf.fraud-loss-rate', term: 'Fraud loss rate', aliases: ['fraud loss', 'fraud losses'], category: 'financial-metrics',
    definitionEn: 'Fraud losses divided by a stated transaction value, revenue or exposure denominator and period.',
    definitionVi: 'Tỷ lệ tổn thất do gian lận: tổn thất gian lận chia cho một mẫu số nêu rõ (giá trị giao dịch, doanh thu hoặc dư nợ rủi ro) và kỳ xác định.',
    businessContextEn: 'Fraud loss is a direct cost that can erase a thin take rate.',
    businessContextVi: 'Tổn thất gian lận là chi phí trực tiếp có thể xóa sạch biên phí mỏng.',
    sourceIds: [DT], basis: 'curriculum', verificationStatus: 'verified',
  },
  {
    id: 'pf.cost-per-transaction', term: 'Cost per transaction', category: 'financial-metrics',
    definitionEn: 'A defined payment operating cost divided by a consistent transaction count.',
    definitionVi: 'Chi phí trên mỗi giao dịch: chi phí vận hành thanh toán được xác định chia cho số lượng giao dịch nhất quán.',
    businessContextEn: 'Falling cost per transaction is how scale turns into operating leverage.',
    businessContextVi: 'Chi phí trên mỗi giao dịch giảm là cách quy mô chuyển thành đòn bẩy hoạt động.',
    sourceIds: [DT], basis: 'curriculum', verificationStatus: 'verified',
  },
  {
    id: 'pf.contribution-margin', term: 'Transaction contribution margin', aliases: ['contribution margin'], category: 'financial-metrics',
    definitionEn: 'Provider-recognised transaction revenue less directly attributable transaction costs, under a stated scope.',
    definitionVi: 'Biên đóng góp giao dịch: doanh thu giao dịch nhà cung cấp ghi nhận trừ các chi phí giao dịch liên quan trực tiếp, theo phạm vi nêu rõ.',
    businessContextEn: 'High TPV does not guarantee a positive contribution once incentives and fraud are counted.',
    businessContextVi: 'TPV cao chưa chắc đảm bảo biên đóng góp dương khi tính đến khuyến mãi và gian lận.',
    sourceIds: [DT], basis: 'curriculum', verificationStatus: 'verified',
  },
  {
    id: 'pf.avg-revenue-per-transaction', term: 'Average revenue per transaction', aliases: ['revenue per transaction'], category: 'financial-metrics',
    definitionEn: 'Provider-recognised revenue divided by the defined transaction count for the same scope and period.',
    definitionVi: 'Doanh thu bình quân mỗi giao dịch: doanh thu nhà cung cấp ghi nhận chia cho số giao dịch được xác định trong cùng phạm vi và kỳ.',
    businessContextEn: 'It shows how much of each payment the provider actually keeps.',
    businessContextVi: 'Chỉ số này cho thấy nhà cung cấp thực sự giữ lại bao nhiêu trên mỗi giao dịch.',
    sourceIds: [DT], basis: 'curriculum', verificationStatus: 'verified',
  },
  {
    id: 'pf.settlement-finality', term: 'Settlement finality', aliases: ['finality'], category: 'business-processes',
    definitionEn: 'The point at which a transfer becomes final under the applicable system rules.',
    definitionVi: 'Tính chất cuối cùng của quyết toán: thời điểm khoản chuyển trở nên không thể hủy theo quy tắc của hệ thống áp dụng.',
    businessContextEn: 'Merchants should ship goods against final funds, not merely an approval message.',
    businessContextVi: 'Người bán nên giao hàng khi tiền đã quyết toán cuối cùng, không chỉ dựa vào thông báo chấp thuận.',
    sourceIds: [DT, 'pf-pfmi'], basis: 'curriculum', verificationStatus: 'verified',
  },
  {
    id: 'pf.payment-facilitator', term: 'Payment facilitator', aliases: ['payment facilitation', 'payment facilitators'], category: 'institutions',
    definitionEn: 'A provider that onboards many smaller merchants under its own merchant account with an acquirer and settles to them.',
    definitionVi: 'Trung gian hỗ trợ thanh toán (payment facilitator): nhà cung cấp tiếp nhận nhiều người bán nhỏ dưới tài khoản đơn vị chấp nhận của mình tại ngân hàng thanh toán và quyết toán cho họ.',
    businessContextEn: 'Facilitators make acceptance easy for small merchants but take on onboarding, fraud and settlement duties.',
    businessContextVi: 'Trung gian này giúp tiểu thương chấp nhận thanh toán dễ dàng nhưng phải gánh trách nhiệm tiếp nhận, gian lận và quyết toán.',
    sourceIds: [], basis: 'paraphrase', verificationStatus: 'needs-source',
    reviewNote: 'Sprint 04F: plain-language explanation of a chapter dimension; the term is not used in Decree 52/2024 and needs a scheme-rule or regulator source.',
  },
  {
    id: 'pf.embedded-payment', term: 'Embedded payment', aliases: ['embedded payments'], category: 'business-models',
    definitionEn: 'A payment function built into a non-financial app or software workflow, so the customer pays without leaving it.',
    definitionVi: 'Thanh toán nhúng: chức năng thanh toán được tích hợp trong ứng dụng hoặc quy trình phần mềm phi tài chính, khách hàng thanh toán mà không phải rời khỏi ứng dụng đó.',
    businessContextEn: 'The platform owns the customer experience while a licensed provider carries the payment role.',
    businessContextVi: 'Nền tảng nắm trải nghiệm khách hàng còn nhà cung cấp được cấp phép đảm nhận vai trò thanh toán.',
    sourceIds: [], basis: 'paraphrase', verificationStatus: 'needs-source',
    reviewNote: 'Sprint 04F: plain-language explanation of a chapter dimension; no source matched yet.',
  },
  {
    id: 'pf.cross-border-payment', term: 'Cross-border payment', aliases: ['cross-border payments', 'cross-border'], category: 'products-services',
    definitionEn: 'A payment where the payer and payee, or their providers, are in different countries, usually involving foreign exchange and extra compliance checks.',
    definitionVi: 'Thanh toán xuyên biên giới: giao dịch mà người trả và người nhận, hoặc nhà cung cấp của họ, ở các quốc gia khác nhau, thường liên quan đổi ngoại tệ và kiểm tra tuân thủ bổ sung.',
    businessContextEn: 'Cross-border flows are slower and costlier than domestic ones, which is why G20 roadmaps target them.',
    businessContextVi: 'Dòng tiền xuyên biên giới chậm và đắt hơn trong nước, đây là lý do lộ trình của G20 nhắm vào mảng này.',
    sourceIds: [], basis: 'paraphrase', verificationStatus: 'needs-source',
    reviewNote: 'Sprint 04F: plain-language explanation of a chapter dimension; the G20 roadmap named in the curriculum registry was not fetched.',
  },
  {
    id: 'pf.remittance', term: 'Remittance', aliases: ['remittances'], category: 'products-services',
    definitionEn: 'A transfer of money by a person, usually to family in another place or country.',
    definitionVi: 'Kiều hối/chuyển tiền: khoản tiền một cá nhân gửi, thường cho gia đình ở nơi khác hoặc quốc gia khác.',
    businessContextEn: 'Remittance is a classic fintech use case because fees and speed vary widely between providers.',
    businessContextVi: 'Chuyển tiền là bài toán fintech kinh điển vì phí và tốc độ khác nhau nhiều giữa các nhà cung cấp.',
    sourceIds: [], basis: 'paraphrase', verificationStatus: 'needs-source',
    reviewNote: 'Sprint 04F: plain-language explanation of a chapter dimension; no source matched yet.',
  },
  {
    id: 'pf.iso-20022', term: 'ISO 20022', fullForm: 'ISO 20022 financial messaging standard', category: 'regulatory',
    definitionEn: 'An international standard for the structure of financial messages exchanged between institutions.',
    definitionVi: 'ISO 20022: tiêu chuẩn quốc tế về cấu trúc thông điệp tài chính trao đổi giữa các định chế.',
    businessContextEn: 'Common message formats make routing, reconciliation and cross-border processing easier.',
    businessContextVi: 'Thông điệp thống nhất giúp định tuyến, đối soát và xử lý xuyên biên giới dễ hơn.',
    sourceIds: [], basis: 'paraphrase', verificationStatus: 'needs-source',
    reviewNote: 'Sprint 04F: the ISO 20022 site returned 403 to the fetch tool, so this wording could not be checked against it.',
  },
];

const SHARED = sharedTerms(['fin.e-wallet', 'fin.qr-payment', 'fin.napas', 'fin.open-banking', 'fin.api', 'fin.interchange', 'fin.cac', 'fin.aml', 'fin.kyc']);
const TERMS = [...PF_TERMS, ...SHARED];

const M1 = 'How the Industry Works';
const M2 = 'How Value Moves Through the Industry';
const M3 = 'How Companies Make Money';
const M4 = 'Who Competes—and Why They Win';
const M5 = 'What Is Changing Next';

export const PAYMENTS_FINTECH_GLOSSARY: CurriculumGlossaryData = {
  curriculumId: 'payments-fintech',
  industry: 'Banking & Financial Services',
  subIndustry: 'Payments & Fintech',
  terms: TERMS,
  sources: collectSources(TERMS, PF_SOURCES),
  lessons: [
    {
      key: '1.1', module: M1, title: 'Industry Definition & Scope',
      chapters: {
        0: ['pf.fintech', 'fin.e-wallet'],
        1: ['fin.e-wallet'],
        3: ['fin.e-wallet', 'pf.acquirer', 'fin.api', 'pf.remittance', 'pf.authorisation', 'pf.clearing', 'pf.settlement'],
        4: ['pf.payment-gateway', 'fin.open-banking', 'fin.api', 'pf.acquirer', 'pf.payment-processor'],
      },
      essential: ['pf.fintech', 'fin.e-wallet', 'pf.payment-gateway', 'pf.acquirer', 'fin.open-banking', 'fin.api', 'pf.payment-processor', 'pf.remittance', 'pf.authorisation', 'pf.clearing', 'pf.settlement'],
    },
    {
      key: '1.3', module: M1, title: 'Global Market Overview',
      chapters: {
        0: ['pf.tpv', 'pf.take-rate', 'pf.instant-payment'],
        1: ['pf.tpv', 'pf.take-rate', 'pf.cross-border-payment'],
        2: ['pf.tpv', 'pf.take-rate'],
        3: ['pf.card-network', 'fin.e-wallet', 'fin.qr-payment', 'pf.payment-processor', 'pf.payment-switch', 'pf.settlement'],
        4: ['pf.a2a', 'pf.payment-processor', 'fin.qr-payment', 'pf.payment-switch'],
      },
      essential: ['pf.tpv', 'pf.take-rate', 'pf.card-network', 'fin.e-wallet', 'fin.qr-payment', 'pf.a2a', 'pf.instant-payment', 'pf.cross-border-payment', 'pf.payment-processor', 'pf.payment-switch', 'pf.settlement'],
    },
    {
      key: '1.4', module: M1, title: 'Vietnam Market Overview',
      chapters: {
        0: ['fin.qr-payment'],
        1: ['fin.napas', 'pf.vnpay', 'pf.momo', 'pf.zalopay', 'pf.payment-gateway', 'pf.payment-switch'],
        2: ['fin.qr-payment'],
        3: ['pf.fintech', 'pf.payment-processor', 'pf.settlement', 'pf.payment-gateway'],
        4: ['pf.payment-intermediary', 'pf.payment-gateway', 'pf.settlement'],
      },
      essential: ['fin.napas', 'fin.qr-payment', 'pf.payment-intermediary', 'pf.vnpay', 'pf.momo', 'pf.zalopay', 'pf.payment-gateway', 'pf.payment-switch', 'pf.fintech', 'pf.payment-processor', 'pf.settlement'],
    },
    {
      key: '2.1', module: M2, title: 'Value Chain Overview',
      chapters: {
        0: ['pf.payment-initiation', 'pf.clearing', 'pf.reconciliation', 'pf.acquirer', 'pf.issuer', 'pf.settlement', 'pf.authentication', 'pf.authorisation', 'pf.payment-processor', 'pf.payment-switch'],
        1: ['pf.authentication', 'pf.authorisation', 'pf.settlement', 'pf.clearing', 'pf.issuer', 'pf.acquirer', 'pf.payment-processor', 'pf.payment-switch'],
        2: ['pf.issuer', 'pf.acquirer', 'pf.payment-processor'],
      },
      essential: ['pf.issuer', 'pf.acquirer', 'pf.payment-initiation', 'pf.authentication', 'pf.authorisation', 'pf.clearing', 'pf.settlement', 'pf.reconciliation'],
    },
    {
      key: '3.4', module: M3, title: 'Revenue Streams & Cost Structure',
      chapters: {
        0: ['pf.mdr', 'pf.acquirer', 'pf.issuer', 'pf.cross-border-payment'],
        1: ['fin.interchange', 'pf.scheme-fee'],
        2: ['pf.tpv', 'pf.take-rate', 'fin.cac', 'pf.payment-success-rate', 'pf.contribution-margin', 'pf.avg-revenue-per-transaction', 'pf.cost-per-transaction', 'pf.fraud-loss-rate'],
      },
      essential: ['pf.mdr', 'fin.interchange', 'pf.scheme-fee', 'pf.tpv', 'pf.take-rate', 'pf.acquirer', 'pf.issuer', 'fin.cac', 'pf.contribution-margin', 'pf.avg-revenue-per-transaction', 'pf.cost-per-transaction', 'pf.payment-success-rate', 'pf.fraud-loss-rate'],
    },
    {
      key: '1.2', module: M1, title: 'Industry History & Development',
      chapters: {
        0: ['pf.card-network', 'pf.instant-payment'],
        1: ['pf.card-network', 'pf.clearing'],
        2: ['fin.api', 'fin.qr-payment'],
        3: ['fin.e-wallet', 'pf.embedded-payment', 'fin.api'],
      },
      essential: ['pf.card-network', 'pf.clearing', 'pf.instant-payment', 'fin.e-wallet', 'fin.qr-payment', 'fin.api', 'pf.embedded-payment'],
    },
    {
      key: '1.5', module: M1, title: 'Industry Drivers & External Factors',
      chapters: {
        1: ['pf.cross-border-payment'],
        2: ['fin.api'],
        3: ['fin.aml', 'pf.authentication'],
        4: ['fin.aml', 'pf.authentication'],
      },
      essential: ['fin.aml', 'pf.authentication', 'fin.api', 'pf.cross-border-payment'],
    },
    {
      key: '2.2', module: M2, title: 'Upstream Activities',
      chapters: {
        0: ['pf.payment-switch', 'pf.interoperability', 'pf.clearing', 'pf.settlement', 'fin.liquidity'],
        1: ['pf.card-network', 'pf.clearing', 'fin.liquidity', 'pf.settlement'],
        2: ['fin.api', 'pf.tokenisation'],
      },
      essential: ['pf.payment-switch', 'pf.card-network', 'pf.interoperability', 'pf.clearing', 'pf.settlement', 'fin.liquidity', 'fin.api', 'pf.tokenisation'],
    },
    {
      key: '2.3', module: M2, title: 'Midstream Activities',
      chapters: {
        0: ['pf.payment-initiation', 'pf.authentication', 'pf.authorisation', 'pf.issuer', 'pf.clearing', 'pf.settlement'],
        1: ['pf.clearing', 'pf.settlement', 'pf.settlement-finality', 'pf.reconciliation', 'pf.card-network', 'pf.acquirer'],
        2: ['fin.kyc', 'fin.api', 'pf.settlement'],
      },
      essential: ['pf.payment-initiation', 'pf.authentication', 'pf.authorisation', 'pf.issuer', 'pf.acquirer', 'pf.card-network', 'pf.clearing', 'pf.settlement', 'pf.settlement-finality', 'pf.reconciliation', 'fin.kyc', 'fin.api'],
    },
    {
      key: '2.4', module: M2, title: 'Downstream Activities',
      chapters: {
        0: ['pf.settlement', 'pf.chargeback'],
        1: ['pf.reconciliation', 'pf.settlement', 'pf.chargeback'],
        2: ['pf.chargeback', 'fin.aml'],
      },
      essential: ['pf.reconciliation', 'pf.settlement', 'pf.chargeback', 'fin.aml'],
    },
    {
      key: '2.5', module: M2, title: 'Inputs, Outputs & Value Creation',
      chapters: {
        0: ['pf.settlement'],
        1: ['pf.settlement'],
        2: ['pf.tpv', 'pf.take-rate', 'fin.cac', 'pf.payment-success-rate', 'pf.fraud-loss-rate'],
      },
      essential: ['pf.tpv', 'pf.take-rate', 'pf.payment-success-rate', 'fin.cac', 'pf.fraud-loss-rate', 'pf.settlement'],
    },
    {
      key: '2.6', module: M2, title: 'Global vs. Local Value Chain',
      chapters: {
        0: ['pf.card-network', 'pf.payment-processor', 'pf.cross-border-payment', 'fin.aml', 'pf.settlement'],
        1: ['pf.iso-20022', 'pf.cross-border-payment', 'fin.aml', 'pf.settlement'],
        2: ['pf.payment-switch', 'pf.instant-payment', 'fin.qr-payment', 'pf.settlement'],
      },
      essential: ['pf.card-network', 'pf.cross-border-payment', 'pf.iso-20022', 'pf.payment-switch', 'pf.instant-payment', 'fin.qr-payment', 'fin.aml', 'pf.payment-processor', 'pf.settlement'],
    },
    {
      key: '3.1', module: M3, title: 'Industry Business Models',
      chapters: {
        0: ['pf.acquirer', 'pf.payment-gateway', 'pf.settlement'],
        1: ['pf.payment-processor', 'pf.payment-facilitator', 'pf.acquirer', 'pf.settlement'],
        2: ['fin.e-wallet', 'pf.payment-orchestration', 'pf.embedded-payment', 'fin.api'],
      },
      essential: ['pf.acquirer', 'pf.payment-gateway', 'pf.payment-processor', 'pf.payment-facilitator', 'fin.e-wallet', 'pf.payment-orchestration', 'pf.embedded-payment', 'fin.api', 'pf.settlement'],
    },
    {
      key: '3.2', module: M3, title: 'Products, Services & Segmentation',
      chapters: {
        0: ['fin.e-wallet', 'fin.qr-payment', 'pf.payment-gateway', 'pf.cross-border-payment', 'pf.authorisation', 'pf.settlement'],
        1: ['pf.acquirer', 'pf.authorisation', 'pf.settlement'],
        2: ['fin.qr-payment', 'pf.settlement', 'pf.reconciliation'],
      },
      essential: ['fin.e-wallet', 'fin.qr-payment', 'pf.payment-gateway', 'pf.acquirer', 'pf.cross-border-payment', 'pf.authorisation', 'pf.settlement', 'pf.reconciliation'],
    },
    {
      key: '3.3', module: M3, title: 'Customer Segments & Needs',
      chapters: {
        0: ['fin.qr-payment'],
        1: ['pf.settlement', 'fin.qr-payment'],
        2: ['fin.api', 'pf.cross-border-payment', 'pf.reconciliation', 'pf.settlement'],
      },
      essential: ['fin.qr-payment', 'pf.settlement', 'fin.api', 'pf.cross-border-payment', 'pf.reconciliation'],
    },
    {
      key: '3.5', module: M3, title: 'Distribution & Sales Channels',
      chapters: {
        0: ['fin.cac'],
        1: ['fin.cac'],
        2: ['fin.api', 'pf.settlement'],
      },
      essential: ['fin.cac', 'fin.api', 'pf.settlement'],
    },
    {
      key: '3.6', module: M3, title: 'Industry Ecosystem & Stakeholders',
      chapters: {
        0: ['pf.issuer', 'pf.payment-gateway', 'pf.payment-facilitator'],
        1: ['pf.acquirer', 'pf.payment-processor'],
        2: ['fin.aml', 'pf.settlement'],
      },
      essential: ['pf.issuer', 'pf.acquirer', 'pf.payment-gateway', 'pf.payment-processor', 'pf.payment-facilitator', 'fin.aml', 'pf.settlement'],
    },
    {
      key: '4.1', module: M4, title: 'Industry Competition Structure',
      chapters: {
        0: ['fin.api'],
        1: ['pf.tpv'],
        2: ['pf.settlement'],
      },
      essential: ['pf.tpv', 'fin.api', 'pf.settlement'],
    },
    {
      key: '4.2', module: M4, title: 'Key Industry Players',
      chapters: {
        0: ['pf.card-network', 'pf.acquirer', 'pf.cross-border-payment', 'pf.payment-processor', 'pf.settlement'],
        1: ['pf.issuer', 'pf.payment-processor', 'pf.acquirer', 'pf.settlement'],
        2: ['pf.payment-gateway', 'pf.payment-orchestration', 'pf.embedded-payment', 'fin.api'],
      },
      essential: ['pf.card-network', 'pf.issuer', 'pf.acquirer', 'pf.payment-processor', 'pf.payment-gateway', 'pf.payment-orchestration', 'pf.embedded-payment', 'pf.cross-border-payment', 'fin.api'],
    },
    {
      key: '4.3', module: M4, title: 'Competitor Benchmarking',
      chapters: {
        0: ['pf.card-network', 'pf.payment-gateway', 'pf.acquirer', 'pf.payment-processor', 'pf.tpv'],
        1: ['pf.settlement'],
        2: ['pf.authorisation-rate', 'pf.authorisation', 'pf.fraud-loss-rate', 'fin.api'],
      },
      essential: ['pf.tpv', 'pf.card-network', 'pf.acquirer', 'pf.payment-gateway', 'pf.payment-processor', 'pf.authorisation-rate', 'pf.authorisation', 'pf.fraud-loss-rate', 'fin.api', 'pf.settlement'],
    },
    {
      key: '4.4', module: M4, title: 'Key Success Factors',
      chapters: {
        0: ['pf.payment-success-rate', 'fin.api', 'pf.authentication', 'pf.reconciliation'],
        1: ['pf.interoperability', 'pf.reconciliation'],
      },
      essential: ['pf.payment-success-rate', 'pf.interoperability', 'pf.authentication', 'pf.reconciliation', 'fin.api'],
    },
    {
      key: '5.1', module: M5, title: 'Consumer Trends',
      chapters: {
        0: ['fin.e-wallet', 'fin.qr-payment'],
        1: ['fin.qr-payment', 'pf.instant-payment'],
      },
      essential: ['fin.qr-payment', 'fin.e-wallet', 'pf.instant-payment'],
    },
    {
      key: '5.2', module: M5, title: 'Technology & Innovation Trends',
      chapters: {
        0: ['pf.instant-payment', 'pf.authentication'],
        1: ['fin.api'],
        2: ['pf.instant-payment', 'pf.a2a', 'fin.api', 'pf.payment-orchestration', 'pf.reconciliation', 'pf.interoperability', 'pf.authentication', 'pf.settlement-finality'],
      },
      essential: ['pf.instant-payment', 'pf.a2a', 'fin.api', 'pf.authentication', 'pf.payment-orchestration', 'pf.reconciliation', 'pf.interoperability', 'pf.settlement-finality'],
    },
    {
      key: '5.3', module: M5, title: 'Market & Channel Trends',
      chapters: {
        0: ['pf.reconciliation', 'pf.settlement'],
        1: ['pf.payment-orchestration', 'pf.settlement', 'pf.embedded-payment'],
        2: ['fin.api', 'pf.settlement', 'pf.embedded-payment'],
      },
      essential: ['pf.embedded-payment', 'pf.payment-orchestration', 'fin.api', 'pf.reconciliation', 'pf.settlement'],
    },
    {
      key: '5.4', module: M5, title: 'Regulatory & Sustainability Trends',
      chapters: {
        0: ['fin.aml'],
        1: ['fin.aml'],
        2: ['pf.settlement'],
      },
      essential: ['fin.aml', 'pf.settlement'],
    },
    {
      key: '5.5', module: M5, title: 'Growth Outlook & Strategic Opportunities',
      chapters: {
        0: ['fin.embedded-finance', 'pf.instant-payment', 'pf.cross-border-payment', 'pf.reconciliation'],
        1: ['pf.cross-border-payment', 'pf.instant-payment', 'pf.reconciliation'],
        2: ['pf.interoperability'],
      },
      essential: ['fin.embedded-finance', 'pf.instant-payment', 'pf.cross-border-payment', 'pf.reconciliation', 'pf.interoperability'],
    },
  ],
  excludedLessons: [
    { key: '4.5', reason: 'Industry SWOT & Strategic Challenges: the chapter text uses almost no terms a beginner needs defined (only “fraud loss”), so no Essential Terms step is shown.' },
  ],
  flaggedAcronyms: [
    { acronym: 'LTV', status: 'ambiguous', note: 'In payments and fintech LTV usually means customer lifetime value; lending curricula use it for loan-to-value. Not annotated; CLV is the canonical entry.' },
    { acronym: 'KYB', status: 'not-yet-authored', note: 'Know-your-business appears in the scope text of lesson 2.3 chapter 3 and is not yet authored; KYC is mapped there.' },
    { acronym: 'B2B', status: 'not-yet-authored', note: 'Generic business abbreviation.' },
  ],
};
