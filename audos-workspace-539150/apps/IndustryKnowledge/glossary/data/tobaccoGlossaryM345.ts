// Tobacco & Next-Generation Products Essential Terms for Modules 3-5 (lessons 3.1-5.5). Merged into
// FMCG_TOBACCO_GLOSSARY by tobaccoGlossary.ts. Every mapped term is a Key Term (or alias of one) rendered in the
// mapped chapter of fmcgTobaccoM3.ts / M4.ts / M5.ts. Structure and verification are separate: a term is 'verified'
// only when an official text actually fetched states or defines it (see TOB_M345_SOURCES); a fetched text that is only
// related is 'needs-review'; wording with no traceable text is 'needs-source'.
import type { DefinitionBasis, GlossaryCategory, GlossaryLessonDef, GlossarySource, GlossaryTermDef } from '../glossaryTypes';

const LAW = 'tob-law09';
const TPD = 'tob-eu-tpd';
const WHO = 'tob-who-fact';
const FCTC = 'tob-fctc';
const EX66 = 'tob-law66';
const R173 = 'tob-res173';
const D1665 = 'tob-dec1665';

export const TOB_M345_SOURCES: GlossarySource[] = [
  { id: FCTC, title: 'WHO Framework Convention on Tobacco Control (treaty text)', url: 'https://iris.who.int/server/api/core/bitstreams/264104b3-241a-4e48-88f9-aa7120779ffc/content', publisher: 'World Health Organization', note: 'Same treaty as registry source whoFctc. The full English text linked from the WHO tobacco fact sheet was fetched on 18 Nov 2026; Articles 5, 6, 12, 15 and 16 were read.' },
  { id: EX66, title: 'Law on Special Consumption (Excise) Tax No. 66/2025/QH15', url: 'https://congbao.chinhphu.vn/van-ban/luat-so-66-2025-qh15-45587.htm', publisher: 'Official Gazette of Vietnam (congbao.chinhphu.vn)', note: 'Same instrument as registry source vnExcise66. The Gazette page returned metadata only, so the signed Gazette PDF it links (issues 973 + 974, 25 Jul 2025) was downloaded and read by OCR on 18 Nov 2026: Articles 1, 2, 4, 5, 6, 8 and 11 and the tobacco rows of the tax schedule (75% rate; specific amount per pack of 20 from VND 2,000 on 1 Jan 2027 to VND 10,000 on 1 Jan 2031). OCR can misread characters, so figures were cross-checked against the schedule rows.' },
  { id: R173, title: 'Resolution 173/2024/QH15 of the National Assembly', url: 'https://chinhphu.vn/?docid=211987&pageid=27160', publisher: 'Government of Vietnam (chinhphu.vn)', note: 'Same instrument as registry source vnRes173. The portal page held metadata only, so the linked signed PDF was downloaded and read by OCR on 18 Nov 2026. It bans the production, trade, import, storage (chứa chấp), transport and use of e-cigarettes and heated tobacco products from 2025 and calls for communication on their harm, especially to young people.' },
  { id: D1665, title: 'Decision 1665/QD-TTg on the plan to implement the e-cigarette and heated tobacco ban', url: 'https://chinhphu.vn/?docid=214810&pageid=27160', publisher: 'Government of Vietnam (chinhphu.vn)', note: 'Same instrument as registry source vnDec1665. The portal page held metadata only, so the linked signed PDF was downloaded and read by OCR on 18 Nov 2026 (sections 1 and 2: objectives, communication and training, legal review, enforcement). The task appendix table was only skimmed.' },
];

type Extra = { aliases?: string[]; acronym?: string; fullForm?: string; annotate?: false; ctxEn?: string; ctxVi?: string; basis?: DefinitionBasis };

const base = (id: string, term: string, category: GlossaryCategory, en: string, vi: string, extra: Extra) => ({
  id, term, category,
  ...(extra.acronym ? { acronym: extra.acronym } : {}),
  ...(extra.fullForm ? { fullForm: extra.fullForm } : {}),
  ...(extra.aliases ? { aliases: extra.aliases } : {}),
  ...(extra.annotate === false ? { annotate: false } : {}),
  definitionEn: en, definitionVi: vi,
  ...(extra.ctxEn ? { businessContextEn: extra.ctxEn } : {}),
  ...(extra.ctxVi ? { businessContextVi: extra.ctxVi } : {}),
});

/** Verified: an official text fetched in this sprint states or defines the term. */
const V = (id: string, term: string, category: GlossaryCategory, en: string, vi: string, sourceIds: string[], extra: Extra = {}): GlossaryTermDef => ({
  ...base(id, term, category, en, vi, extra), sourceIds, basis: extra.basis ?? 'paraphrase', verificationStatus: 'verified',
});

/** Needs review: a fetched official text is related to the term but does not define it. */
const R = (id: string, term: string, category: GlossaryCategory, en: string, vi: string, sourceIds: string[], reviewNote: string, extra: Extra = {}): GlossaryTermDef => ({
  ...base(id, term, category, en, vi, extra), sourceIds, basis: extra.basis ?? 'curriculum', verificationStatus: 'needs-review', reviewNote,
});

const NOTE_KEY = 'Chapter Key Term in the Tobacco curriculum, adapted here. No registry source and no text fetched in this sprint defines it, so the wording is not verified.';
/** Needs source: curriculum Key Term wording with no traceable source for the definition yet. */
const N = (id: string, term: string, category: GlossaryCategory, en: string, vi: string, extra: Extra = {}, reviewNote = NOTE_KEY): GlossaryTermDef => ({
  ...base(id, term, category, en, vi, extra), sourceIds: [], basis: extra.basis ?? 'curriculum', verificationStatus: 'needs-source', reviewNote,
});

const NOTE_ANALYSIS = 'Analytical or accounting concept taught in the curriculum; no official text defines it, so the wording is not verified.';

export const TOB_M345_TERMS: GlossaryTermDef[] = [
  // ---- 3.1 Industry Business Models
  N('tob.revenue-net-excise', 'Revenue net of excise', 'financial-metrics', 'Sales revenue after deducting excise tax, which shows what the company earns apart from tax collected for government.', 'Doanh thu ròng sau thuế tiêu thụ đặc biệt: doanh thu bán hàng sau khi trừ thuế tiêu thụ đặc biệt, phản ánh phần doanh nghiệp thực sự thu được ngoài thuế nộp cho nhà nước.', {}, NOTE_ANALYSIS),
  N('tob.soe', 'State-owned enterprise', 'institutions', 'A company owned and controlled by the state.', 'Doanh nghiệp nhà nước: công ty do nhà nước sở hữu và kiểm soát.', { aliases: ['state-owned enterprises', 'state-owned tobacco enterprises'] }),
  N('tob.trade-margin', 'Trade margin', 'financial-metrics', 'The difference between the price a distributor or retailer pays and the price it sells at.', 'Biên lợi nhuận thương mại: chênh lệch giữa giá mua vào và giá bán ra của nhà phân phối hoặc nhà bán lẻ.', {}, NOTE_ANALYSIS),
  N('tob.net-price', 'Net price', 'financial-metrics', 'The price a manufacturer receives per unit after taxes are taken out.', 'Giá ròng: mức giá nhà sản xuất nhận được trên mỗi đơn vị sau khi trừ thuế.', {}, NOTE_ANALYSIS),
  N('tob.unit-cost', 'Unit cost', 'financial-metrics', 'The cost to produce and deliver one unit, such as one pack.', 'Chi phí đơn vị: chi phí để sản xuất và giao một đơn vị sản phẩm, ví dụ một bao thuốc.', { annotate: false }, NOTE_ANALYSIS),
  N('tob.inelastic-demand', 'Price-inelastic demand', 'financial-metrics', 'Demand that changes proportionally less than the price changes.', 'Cầu ít co giãn theo giá: lượng cầu thay đổi theo tỷ lệ nhỏ hơn mức thay đổi của giá.', { aliases: ['inelastic demand'] }, NOTE_ANALYSIS),
  R('tob.vested-interest', 'Vested interest', 'essential-concepts', 'A personal or organisational stake in an outcome; the WHO FCTC refers to the commercial and other vested interests of the tobacco industry.', 'Lợi ích có sẵn: lợi ích cá nhân hoặc của tổ chức gắn với một kết quả; Công ước khung nhắc đến lợi ích thương mại và các lợi ích có sẵn khác của ngành thuốc lá.', [FCTC],
    'FCTC Article 5.3 (fetched) uses the phrase \"commercial and other vested interests of the tobacco industry\" but does not define it.', { aliases: ['vested interests'], annotate: false }),
  V('tob.policy-protection', 'Policy protection', 'regulatory', 'Action by a government to protect its tobacco-control policies from the commercial and other vested interests of the tobacco industry, as FCTC Article 5.3 requires of Parties.', 'Bảo vệ chính sách: việc chính phủ bảo vệ chính sách kiểm soát thuốc lá khỏi các lợi ích thương mại và lợi ích có sẵn khác của ngành thuốc lá, theo Điều 5.3 Công ước khung.', [FCTC]),
  N('tob.device-consumable', 'Device-and-consumable model', 'business-models', 'A business model that sells a device and then earns recurring revenue from the consumables used with it.', 'Mô hình thiết bị và vật tư tiêu hao: bán thiết bị rồi thu doanh thu lặp lại từ vật tư tiêu hao dùng kèm.', { ctxEn: 'Resolution 173/2024/QH15 bans e-cigarettes and heated tobacco products from 2025, so this model has no legal market in Vietnam.', ctxVi: 'Nghị quyết 173/2024/QH15 cấm thuốc lá điện tử và thuốc lá nung nóng từ năm 2025 nên mô hình này không có thị trường hợp pháp tại Việt Nam.' }, 'Business-model label from the curriculum. Resolution 173/2024/QH15 (read by OCR) confirms the ban, but no text defines the model itself.'),
  N('tob.installed-base', 'Installed base', 'financial-metrics', 'The number of devices in use.', 'Cơ sở thiết bị đang dùng: số lượng thiết bị đang được sử dụng.', {}, NOTE_ANALYSIS),
  N('tob.attach-rate', 'Consumable attach rate', 'financial-metrics', 'The number of consumables bought per device in a period.', 'Tỷ lệ mua vật tư kèm thiết bị: số vật tư tiêu hao được mua trên mỗi thiết bị trong một kỳ.', {}, NOTE_ANALYSIS),
  N('tob.processing-margin', 'Processing margin', 'financial-metrics', 'The difference between the cost of buying leaf and the price of selling it once processed.', 'Biên lợi nhuận chế biến: chênh lệch giữa chi phí mua lá thuốc và giá bán sau khi đã chế biến.', {}, NOTE_ANALYSIS),
  N('tob.credit-terms', 'Credit terms', 'financial-metrics', 'The time a customer is allowed to pay after receiving goods.', 'Điều khoản tín dụng: thời gian khách hàng được phép thanh toán sau khi nhận hàng.', { annotate: false }, NOTE_ANALYSIS),

  // ---- 3.2 Products, Services & Segmentation
  N('tob.trading-down', 'Trading down', 'strategic', 'Consumers moving to cheaper products, for example after a price rise.', 'Chuyển xuống phân khúc rẻ hơn: người tiêu dùng chuyển sang sản phẩm giá thấp hơn, ví dụ sau khi giá tăng.', {}, NOTE_ANALYSIS),
  N('tob.category-mix', 'Category mix', 'financial-metrics', 'The share of sales across product tiers or categories.', 'Cơ cấu nhóm sản phẩm: tỷ trọng doanh số giữa các phân khúc hoặc nhóm sản phẩm.', {}, NOTE_ANALYSIS),
  N('tob.plain-packaging', 'Plain packaging', 'regulatory', 'A rule that tobacco packs are standardised, without logos or brand imagery, apart from required warnings.', 'Bao bì trơn: quy định bao thuốc lá được chuẩn hóa, không có logo hay hình ảnh thương hiệu, ngoài các cảnh báo bắt buộc.', {},
    'The Australian Act in the source register (auPlain) was not fetched in this sprint, and the WHO fact sheet only links a plain-packaging guide, so the definition is not verified.'),
  V('tob.descriptor-ban', 'Descriptor ban', 'regulatory', 'A ban on words or phrases on tobacco packs that make readers think tobacco is less harmful or misunderstand its harm; Vietnamese law prohibits them.', 'Cấm từ ngữ mô tả gây hiểu lầm: cấm dùng từ, cụm từ trên bao thuốc lá khiến người đọc hiểu thuốc lá ít có hại hoặc hiểu sai về tác hại; pháp luật Việt Nam nghiêm cấm.', [LAW]),
  N('tob.regulatory-status', 'Regulatory status', 'regulatory', 'Whether a product is legal, restricted or banned in a given market.', 'Tình trạng pháp lý: sản phẩm được phép, bị hạn chế hay bị cấm tại một thị trường.', {}, NOTE_ANALYSIS),
  N('tob.attributed-position', 'Attributed position', 'essential-concepts', 'A statement that is linked to a named authority or document.', 'Quan điểm có nguồn quy kết: nhận định gắn với một cơ quan hoặc văn bản cụ thể.', { annotate: false }, NOTE_ANALYSIS),
  V('tob.min-pack-size', 'Minimum pack size', 'regulatory', 'The smallest number of cigarettes a pack may legally contain; Vietnam requires at least 20 per pack (except cigars and export cigarettes) and the EU requires at least 20 per unit packet.', 'Số điếu tối thiểu trong bao: số điếu ít nhất mà một bao thuốc được phép chứa; Việt Nam yêu cầu không ít hơn 20 điếu (trừ xì gà và thuốc xuất khẩu), EU cũng yêu cầu tối thiểu 20 điếu mỗi bao.', [LAW, TPD], { aliases: ['minimum pack sizes'] }),
  V('tob.unit-packet', 'Unit packet', 'products-services', 'The smallest individual packaging of a tobacco or related product that is placed on the market.', 'Bao đơn vị: bao bì nhỏ nhất của một sản phẩm thuốc lá hoặc sản phẩm liên quan được đưa ra thị trường.', [TPD], { aliases: ['unit packets'], basis: 'official' }),
  N('tob.standardised-comparison', 'Standardised comparison', 'financial-metrics', 'Comparing prices or taxes on the same pack size so that figures are like for like.', 'So sánh chuẩn hóa: so sánh giá hoặc thuế trên cùng một quy cách bao để số liệu tương đương.', {}, NOTE_ANALYSIS),
  V('tob.mixed-tax', 'Mixed tax structure', 'regulatory', 'A tax system that combines a percentage rate with a fixed amount per unit; Vietnam taxes cigarettes at a 75% rate plus a specific amount per pack of 20 from 2027.', 'Cơ cấu thuế hỗn hợp: hệ thống thuế kết hợp thuế suất phần trăm với mức thuế tuyệt đối trên mỗi đơn vị; Việt Nam áp thuế thuốc lá điếu 75% cộng mức thuế tuyệt đối trên bao 20 điếu từ năm 2027.', [EX66]),
  N('tob.tier-gap', 'Tier gap', 'financial-metrics', 'The price difference between product tiers.', 'Chênh lệch giữa các phân khúc: khác biệt về giá giữa các phân khúc sản phẩm.', {}, NOTE_ANALYSIS),

  // ---- 3.3 Customer Segments & Needs
  R('tob.adult-prevalence', 'Adult tobacco use prevalence', 'financial-metrics', 'The share of adults who currently use tobacco.', 'Tỷ lệ người trưởng thành sử dụng thuốc lá: phần trăm người trưởng thành hiện đang dùng thuốc lá.', [WHO],
    'The WHO fact sheet (fetched) discusses tobacco use prevalence trends but does not define the term.'),
  N('tob.sampling', 'Sampling', 'essential-concepts', 'Selecting a representative group of people for a survey.', 'Chọn mẫu: chọn một nhóm đại diện để khảo sát.', { annotate: false }, NOTE_ANALYSIS),
  V('tob.min-legal-age', 'Minimum legal age', 'regulatory', 'The age below which buying, selling or using tobacco is prohibited; Vietnam bans use, purchase and sale by people under 18 and bans selling or supplying tobacco to them.', 'Độ tuổi tối thiểu theo luật: độ tuổi mà người dưới mức đó bị cấm mua, bán hoặc sử dụng thuốc lá; Việt Nam cấm người chưa đủ 18 tuổi sử dụng, mua, bán thuốc lá và cấm bán, cung cấp thuốc lá cho họ.', [LAW]),
  R('tob.youth-initiation', 'Youth initiation', 'essential-concepts', 'Young people starting to use tobacco or nicotine products.', 'Giới trẻ bắt đầu sử dụng: thanh thiếu niên bắt đầu dùng thuốc lá hoặc sản phẩm chứa nicotine.', [WHO],
    'The WHO fact sheet (fetched) says early nicotine use can lead to long-term dependence, but does not define \"youth initiation\".'),
  V('tob.age-verification', 'Age verification', 'business-processes', 'Checking a buyer’s age before a sale, for example by asking for evidence that the buyer has reached the legal age, as FCTC Article 16 describes.', 'Xác minh độ tuổi: kiểm tra tuổi người mua trước khi bán, ví dụ yêu cầu bằng chứng đã đủ tuổi theo luật, như Điều 16 Công ước khung mô tả.', [FCTC]),
  R('tob.affordability', 'Affordability', 'financial-metrics', 'How easily people can buy a product relative to their income.', 'Khả năng chi trả: mức độ người dân có thể mua một sản phẩm so với thu nhập.', [FCTC],
    'FCTC Article 16.3 (fetched) refers to measures that increase the affordability of cigarettes to minors, but no fetched text defines affordability.', { annotate: false }),
  N('tob.price-responsiveness', 'Price responsiveness', 'financial-metrics', 'How much demand changes when the price changes.', 'Độ nhạy theo giá: mức thay đổi của nhu cầu khi giá thay đổi.', { annotate: false }, NOTE_ANALYSIS),
  R('tob.addiction', 'Addiction', 'essential-concepts', 'Compulsive use despite harm; nicotine is highly addictive, which is why tobacco demand responds only weakly to price.', 'Nghiện: sử dụng cưỡng bách dù biết có hại; nicotine gây nghiện rất mạnh nên cầu thuốc lá phản ứng yếu với giá.', [WHO, FCTC],
    'The WHO fact sheet states that nicotine is highly addictive and FCTC Article 5.2 refers to nicotine addiction, but neither fetched text defines addiction.', { annotate: false }),
  N('tob.quit-attempt', 'Quit attempt', 'essential-concepts', 'An effort by a tobacco user to stop using tobacco.', 'Lần cố gắng bỏ thuốc: nỗ lực của người dùng thuốc lá nhằm ngừng sử dụng.', { aliases: ['quit attempts'] }),
  R('tob.cessation-medicine', 'Cessation medicine', 'products-services', 'A medicine that helps people stop tobacco use; counselling and medication can more than double a user’s chance of quitting successfully.', 'Thuốc hỗ trợ cai thuốc: thuốc giúp người dùng ngừng sử dụng thuốc lá; tư vấn và thuốc có thể làm tăng hơn gấp đôi cơ hội bỏ thuốc thành công.', [WHO],
    'The WHO fact sheet (fetched) says counselling and medication can more than double the chance of quitting but does not define the term.'),
  N('tob.trade-customer', 'Trade customer', 'institutions', 'A business that buys products to resell, such as a wholesaler or retailer.', 'Khách hàng thương mại: doanh nghiệp mua hàng để bán lại, như nhà bán buôn hoặc bán lẻ.', { aliases: ['trade customers'] }),
  N('tob.compliance-record', 'Compliance record', 'business-processes', 'A history of a business’s inspections and violations.', 'Hồ sơ tuân thủ: lịch sử kiểm tra và vi phạm của một doanh nghiệp.', { annotate: false }),

  // ---- 3.4 Revenue Streams & Cost Structure
  V('tob.export-processing', 'Export processing contract', 'business-models', 'An agreement to manufacture or process tobacco for export; in Vietnam it does not count toward permitted domestic output and may only be done at a licensed producer with the Minister of Industry and Trade’s written approval.', 'Hợp đồng gia công xuất khẩu: thỏa thuận sản xuất, gia công thuốc lá để xuất khẩu; ở Việt Nam hợp đồng này không tính vào sản lượng được phép tiêu thụ trong nước và chỉ được thực hiện tại doanh nghiệp có giấy phép sản xuất sau khi Bộ trưởng Bộ Công Thương đồng ý bằng văn bản.', [LAW], { aliases: ['export processing contracts'] }),
  N('tob.over-shifting', 'Over-shifting', 'financial-metrics', 'Prices rising by more than the amount of a tax increase.', 'Chuyển thuế vượt mức: giá tăng nhiều hơn mức tăng của thuế.', {}, NOTE_ANALYSIS),
  N('tob.under-shifting', 'Under-shifting', 'financial-metrics', 'Prices rising by less than the amount of a tax increase.', 'Chuyển thuế thấp hơn mức tăng: giá tăng ít hơn mức tăng của thuế.', {}, NOTE_ANALYSIS),
  N('tob.price-effect', 'Price effect', 'financial-metrics', 'The part of a revenue change that comes from changes in price.', 'Tác động của giá: phần thay đổi doanh thu do giá thay đổi.', {}, NOTE_ANALYSIS),
  N('tob.volume-effect', 'Volume effect', 'financial-metrics', 'The part of a revenue change that comes from selling more or fewer units.', 'Tác động của sản lượng: phần thay đổi doanh thu do bán nhiều hoặc ít đơn vị hơn.', {}, NOTE_ANALYSIS),
  N('tob.mix-effect', 'Mix effect', 'financial-metrics', 'The part of a revenue change that comes from shifts in sales between tiers or categories.', 'Tác động của cơ cấu: phần thay đổi doanh thu do doanh số chuyển giữa các phân khúc hoặc nhóm sản phẩm.', {}, NOTE_ANALYSIS),
  N('tob.fixed-cost', 'Fixed cost', 'financial-metrics', 'A cost that does not change with production volume in the short term.', 'Chi phí cố định: chi phí không thay đổi theo sản lượng trong ngắn hạn.', { aliases: ['fixed costs'], annotate: false }, NOTE_ANALYSIS),
  N('tob.operating-leverage', 'Operating leverage', 'financial-metrics', 'How much profit changes by more than volume because fixed costs stay the same.', 'Đòn bẩy hoạt động: mức lợi nhuận thay đổi nhiều hơn sản lượng do chi phí cố định không đổi.', {}, NOTE_ANALYSIS),
  R('tob.illicit-indicator', 'Illicit market indicator', 'financial-metrics', 'A measure used to estimate illegal trade, such as the share of untaxed packs found in surveys, which should be used only with a stated method.', 'Chỉ báo thị trường bất hợp pháp: thước đo dùng để ước tính buôn bán trái phép, ví dụ tỷ lệ bao thuốc không nộp thuế trong khảo sát; chỉ nên dùng khi nêu rõ phương pháp.', [WHO],
    'The WHO fact sheet (fetched) gives an estimate that 1 in 10 cigarettes consumed globally is illicit, but does not define an \"indicator\" or give a method.', { aliases: ['illicit market indicators'] }),
  N('tob.legal-volume', 'Legal market volume', 'financial-metrics', 'Tobacco sold through legal, taxed channels.', 'Sản lượng thị trường hợp pháp: lượng thuốc lá bán qua các kênh hợp pháp và đã nộp thuế.', {}, NOTE_ANALYSIS),

  // ---- 3.5 Distribution & Sales Channels
  V('tob.sales-licence', 'Sales licence', 'regulatory', 'Official permission to sell tobacco; in Vietnam enterprises, wholesale agents and retail agents must hold a tobacco sales licence under Government rules.', 'Giấy phép bán thuốc lá: sự cho phép chính thức để bán thuốc lá; ở Việt Nam doanh nghiệp, đại lý bán buôn và đại lý bán lẻ phải có giấy phép bán thuốc lá theo quy định của Chính phủ.', [LAW], { aliases: ['sales licences'] }),
  V('tob.licence-conditions', 'Licence conditions', 'regulatory', 'Requirements a business must meet to obtain or keep a licence; Vietnamese law treats tobacco as a conditional business line that needs a licence from the competent authority.', 'Điều kiện cấp phép: các yêu cầu doanh nghiệp phải đáp ứng để được cấp hoặc giữ giấy phép; pháp luật Việt Nam coi kinh doanh thuốc lá là ngành, nghề kinh doanh có điều kiện và cần giấy phép của cơ quan có thẩm quyền.', [LAW]),
  N('tob.point-of-sale', 'Point of sale', 'business-processes', 'The place where a sale is made, such as a shop counter.', 'Điểm bán: nơi diễn ra giao dịch bán hàng, ví dụ quầy của cửa hàng.', { aliases: ['points of sale'], annotate: false }),
  R('tob.product-visibility', 'Product visibility', 'business-processes', 'How easily products can be seen in a shop; Vietnam limits retail displays to one pack, carton or box per brand.', 'Mức độ hiển thị sản phẩm: sản phẩm dễ nhìn thấy đến đâu trong cửa hàng; Việt Nam giới hạn trưng bày tối đa một bao, một tút hoặc một hộp mỗi nhãn hiệu.', [LAW],
    'Law 09/2012/QH13 Art. 25(1)(b) limits displays but does not define product visibility.', { annotate: false }),
  N('tob.online-listing', 'Online listing', 'business-processes', 'A product offer posted on a website or platform.', 'Tin đăng bán trực tuyến: chào bán sản phẩm được đăng trên website hoặc nền tảng.', { aliases: ['online listings'] }),
  N('tob.customs-control', 'Customs control', 'regulatory', 'Border checks on goods entering or leaving a country.', 'Kiểm soát hải quan: kiểm tra hàng hóa tại biên giới khi nhập hoặc xuất khẩu.', {}),
  V('tob.banned-product', 'Banned product', 'regulatory', 'A product that the law prohibits; Resolution 173/2024/QH15 bans producing, trading, importing, storing, transporting and using e-cigarettes and heated tobacco products in Vietnam from 2025.', 'Sản phẩm bị cấm: sản phẩm mà pháp luật nghiêm cấm; Nghị quyết 173/2024/QH15 cấm sản xuất, kinh doanh, nhập khẩu, chứa chấp, vận chuyển và sử dụng thuốc lá điện tử, thuốc lá nung nóng tại Việt Nam từ năm 2025.', [R173], { aliases: ['banned products'] }),
  N('tob.partner-verification', 'Partner verification', 'business-processes', 'Checking that customers and suppliers hold the licences they need.', 'Xác minh đối tác: kiểm tra khách hàng và nhà cung cấp có đủ giấy phép cần thiết hay không.', {}),
  N('tob.stock-audit', 'Stock audit', 'business-processes', 'Checking inventory for compliance, for example for valid tax marks.', 'Kiểm kê tồn kho tuân thủ: kiểm tra hàng tồn để bảo đảm tuân thủ, ví dụ tem hoặc mã thuế hợp lệ.', { aliases: ['stock audits'] }),
  N('tob.record-keeping', 'Record keeping', 'business-processes', 'Keeping documents of transactions and product movements.', 'Lưu trữ hồ sơ: lưu giữ chứng từ về giao dịch và sự di chuyển của sản phẩm.', { annotate: false }),
  R('tob.display-ban', 'Display ban', 'regulatory', 'A prohibition on showing tobacco products at the point of sale; Vietnam instead limits displays to one item per brand.', 'Cấm trưng bày: lệnh cấm bày sản phẩm thuốc lá tại điểm bán; Việt Nam hiện giới hạn trưng bày một sản phẩm mỗi nhãn hiệu.', [LAW, FCTC],
    'Law 09/2012/QH13 Art. 25(1)(b) sets a display limit, and FCTC Art. 16(1)(b) mentions banning sales in a way that makes products directly accessible; neither fetched text defines a display ban.', { aliases: ['display bans'] }),
  R('tob.distance-sale', 'Distance sale', 'business-processes', 'A sale where buyer and seller are not physically together, such as an online order.', 'Bán hàng từ xa: giao dịch mà người mua và người bán không gặp trực tiếp, ví dụ đặt hàng trực tuyến.', [TPD],
    'Directive 2014/40/EU Art. 2 (fetched) defines \"cross-border distance sales\" and Art. 18 lets Member States prohibit them, but the text read does not define \"distance sale\" itself.', { aliases: ['distance sales', 'cross-border distance sales'] }),
  V('tob.retailer-licensing', 'Retailer licensing', 'regulatory', 'Requiring shops to hold a licence before they sell tobacco; in Vietnam retail agents need a tobacco sales licence.', 'Cấp phép cho nhà bán lẻ: yêu cầu cửa hàng có giấy phép trước khi bán thuốc lá; ở Việt Nam đại lý bán lẻ phải có giấy phép bán thuốc lá.', [LAW]),

  // ---- 3.6 Industry Ecosystem & Stakeholders
  R('tob.civil-society', 'Civil society', 'institutions', 'Non-governmental organisations and citizen groups; the FCTC says the participation of civil society is essential to achieving the treaty’s objective.', 'Xã hội dân sự: các tổ chức phi chính phủ và nhóm công dân; Công ước khung nêu sự tham gia của xã hội dân sự là thiết yếu để đạt mục tiêu của Công ước.', [FCTC],
    'FCTC Article 4 (fetched) says civil-society participation is essential but does not define the term.', { annotate: false }),
  N('tob.enforcement-agency', 'Enforcement agency', 'institutions', 'A government body that makes sure laws are followed.', 'Cơ quan thực thi: cơ quan nhà nước bảo đảm pháp luật được thi hành.', { aliases: ['enforcement agencies'], annotate: false }),
  N('tob.policy-recommendation', 'Policy recommendation', 'strategic', 'Advice on what a government should do.', 'Khuyến nghị chính sách: đề xuất về việc chính phủ nên làm gì.', { aliases: ['policy recommendations'] }),
  R('tob.monitoring', 'Monitoring', 'business-processes', 'Tracking tobacco use and whether policies are implemented; WHO’s MPOWER package starts with monitoring tobacco use and prevention policies.', 'Giám sát: theo dõi tình hình sử dụng thuốc lá và việc thực hiện chính sách; gói MPOWER của WHO bắt đầu bằng giám sát việc sử dụng thuốc lá và các chính sách phòng chống.', [WHO],
    'The WHO fact sheet (fetched) lists monitoring as the first MPOWER measure but does not define the term.', { annotate: false }),
  N('tob.advocacy', 'Advocacy', 'strategic', 'Efforts to influence policy decisions.', 'Vận động chính sách: nỗ lực tác động đến các quyết định chính sách.', { annotate: false }),
  V('tob.policy-safeguard', 'Policy safeguard', 'regulatory', 'A rule that protects decision-making from undue influence; under FCTC Article 5.3 Parties protect tobacco-control policies from the commercial and other vested interests of the tobacco industry.', 'Cơ chế bảo vệ chính sách: quy định bảo vệ quá trình ra quyết định khỏi tác động không phù hợp; theo Điều 5.3 Công ước khung, các Bên bảo vệ chính sách kiểm soát thuốc lá khỏi lợi ích thương mại và lợi ích có sẵn khác của ngành thuốc lá.', [FCTC], { aliases: ['policy safeguards'] }),
  R('tob.conflict-of-interest', 'Conflict of interest', 'essential-concepts', 'A situation where private interests could affect public decisions; WHO describes a fundamental conflict between tobacco industry interests and public-health interests.', 'Xung đột lợi ích: tình huống lợi ích riêng có thể ảnh hưởng đến quyết định công; WHO mô tả mâu thuẫn cơ bản giữa lợi ích của ngành thuốc lá và lợi ích sức khỏe cộng đồng.', [WHO, FCTC],
    'The WHO fact sheet (fetched) describes a conflict between industry and public-health interests, but neither it nor FCTC Art. 5.3 defines \"conflict of interest\".', { aliases: ['conflicts of interest'], annotate: false }),
  V('tob.health-communication', 'Health communication', 'business-processes', 'Information, education and communication about tobacco harm; Vietnamese law requires it to be public, scientific, accurate and objective, with content and channels suited to each audience.', 'Truyền thông sức khỏe: thông tin, giáo dục, truyền thông về tác hại của thuốc lá; pháp luật Việt Nam yêu cầu công khai, khoa học, chính xác, khách quan và có nội dung, kênh phù hợp với từng đối tượng.', [LAW, FCTC]),
  V('tob.objective-information', 'Objective information', 'essential-concepts', 'Information presented accurately and without bias; Vietnamese law requires tobacco-harm information to be public, scientific, accurate and objective.', 'Thông tin khách quan: thông tin được trình bày chính xác, không thiên lệch; pháp luật Việt Nam yêu cầu thông tin về tác hại thuốc lá phải công khai, khoa học, chính xác, khách quan.', [LAW], { annotate: false }),
  N('tob.source-sponsor', 'Source sponsor', 'essential-concepts', 'The organisation that funded or commissioned a study or figure.', 'Đơn vị tài trợ nguồn tin: tổ chức đã tài trợ hoặc đặt hàng một nghiên cứu hoặc số liệu.', { aliases: ['source sponsors'] }),
  N('tob.method-transparency', 'Method transparency', 'essential-concepts', 'Clear disclosure of how a figure was produced.', 'Minh bạch phương pháp: công khai rõ một con số được tạo ra như thế nào.', {}),
  N('tob.independent-review', 'Independent review', 'business-processes', 'Assessment of evidence by parties who have no stake in the result.', 'Thẩm định độc lập: việc đánh giá bằng chứng bởi bên không có lợi ích liên quan đến kết quả.', {}),

  // ---- 4.1 Industry Competition Structure
  N('tob.five-forces', 'Five forces', 'strategic', 'A framework that analyses competitive pressure through rivalry, new entrants, buyer power, supplier power and substitutes.', 'Năm lực lượng cạnh tranh: khung phân tích áp lực cạnh tranh qua đối thủ hiện hữu, đối thủ mới, quyền lực người mua, quyền lực nhà cung cấp và sản phẩm thay thế.', { aliases: ['five forces analysis'] }),
  N('tob.threat-substitutes', 'Threat of substitutes', 'strategic', 'The risk that other products or behaviours replace the product.', 'Nguy cơ sản phẩm thay thế: rủi ro các sản phẩm hoặc hành vi khác thay thế sản phẩm.', {}),
  N('tob.regulatory-force', 'Regulatory force', 'strategic', 'The effect that laws and rules have on competition in an industry.', 'Lực lượng pháp lý: tác động của luật và quy định lên cạnh tranh trong một ngành.', {}),
  N('tob.entry-barrier', 'Entry barrier', 'strategic', 'A factor that makes it hard for new firms to enter a market.', 'Rào cản gia nhập: yếu tố khiến doanh nghiệp mới khó tham gia thị trường.', { aliases: ['entry barriers'] }, NOTE_ANALYSIS),
  V('tob.production-licence', 'Production licence', 'regulatory', 'Permission from the competent state authority that a business must hold to produce tobacco; in Vietnam tobacco production is a conditional business that needs a licence.', 'Giấy phép sản xuất: sự cho phép của cơ quan nhà nước có thẩm quyền mà doanh nghiệp phải có để sản xuất thuốc lá; ở Việt Nam sản xuất thuốc lá là ngành, nghề kinh doanh có điều kiện và cần giấy phép.', [LAW], { aliases: ['production licences'] }),
  V('tob.machinery-control', 'Specialised machinery control', 'regulatory', 'Legal management of the capacity of specialised tobacco machines and equipment, one of the measures Vietnam uses to control domestic output.', 'Kiểm soát máy móc chuyên ngành: quản lý năng lực máy, thiết bị chuyên ngành thuốc lá, một trong các biện pháp Việt Nam dùng để kiểm soát sản lượng tiêu thụ trong nước.', [LAW]),
  N('tob.legal-competition', 'Legal competition', 'strategic', 'Competing with methods that the law permits.', 'Cạnh tranh hợp pháp: cạnh tranh bằng các phương thức pháp luật cho phép.', {}),
  N('tob.price-competition', 'Price competition', 'strategic', 'Competing on price within tax and legal limits.', 'Cạnh tranh về giá: cạnh tranh bằng giá trong giới hạn của thuế và pháp luật.', { annotate: false }),
  V('tob.tracking-tracing', 'Tracking and tracing', 'business-processes', 'A system that records a product’s movement through the supply chain so authorities can follow it and detect diversion; FCTC Article 15 asks Parties to consider a tracking and tracing regime.', 'Truy vết và theo dõi: hệ thống ghi lại sự di chuyển của sản phẩm trong chuỗi cung ứng để cơ quan chức năng theo dõi và phát hiện chuyển lậu; Điều 15 Công ước khung yêu cầu các Bên xem xét xây dựng cơ chế này.', [FCTC, TPD]),

  // ---- 4.2 Key Industry Players
  V('tob.joint-venture', 'Joint venture', 'business-models', 'A company or project jointly owned by two or more partners; in Vietnam a foreign-invested tobacco production project must be a joint venture or cooperation with a licensed producer.', 'Liên doanh: công ty hoặc dự án do hai hay nhiều bên cùng sở hữu; ở Việt Nam dự án sản xuất thuốc lá có vốn nước ngoài phải liên doanh, hợp tác với doanh nghiệp đã có giấy phép sản xuất.', [LAW]),
  V('tob.controlling-share', 'Controlling share', 'business-models', 'An ownership stake large enough to control decisions; Vietnamese law requires the State to hold a controlling share of the charter capital of a foreign-invested tobacco producer.', 'Tỷ lệ chi phối: phần sở hữu đủ lớn để chi phối quyết định; pháp luật Việt Nam yêu cầu Nhà nước chiếm tỷ lệ chi phối trong vốn điều lệ của doanh nghiệp sản xuất thuốc lá có vốn nước ngoài.', [LAW]),
  R('tob.charter-capital', 'Charter capital', 'financial-metrics', 'The capital registered by the owners of a company.', 'Vốn điều lệ: vốn do các chủ sở hữu đăng ký khi thành lập công ty.', [LAW],
    'Law 09/2012/QH13 Art. 21(3)(b) refers to charter capital (vốn điều lệ) but does not define it.'),
  V('tob.brand-licensing', 'Brand licensing', 'business-models', 'Allowing another company to produce and sell a brand for a fee; in Vietnam, tobacco industrial-property contracts may only be performed at licensed producers after the Prime Minister’s written approval.', 'Cấp phép nhãn hiệu: cho phép công ty khác sản xuất, bán nhãn hiệu để thu phí; ở Việt Nam hợp đồng về sở hữu công nghiệp trong sản xuất thuốc lá chỉ được thực hiện tại doanh nghiệp có giấy phép sản xuất sau khi Thủ tướng Chính phủ đồng ý bằng văn bản.', [LAW]),
  R('tob.industrial-property', 'Industrial property', 'essential-concepts', 'Intellectual property such as trademarks that is used in industry and trade.', 'Sở hữu công nghiệp: tài sản trí tuệ như nhãn hiệu được dùng trong sản xuất và thương mại.', [LAW],
    'Law 09/2012/QH13 Art. 21(4) regulates industrial-property contracts for tobacco production but does not define industrial property.', { annotate: false }),
  N('tob.competitor-profile', 'Competitor profile', 'strategic', 'A structured summary of a competitor’s ownership, licences, portfolio, compliance record and exposure.', 'Hồ sơ đối thủ: bản tóm tắt có cấu trúc về sở hữu, giấy phép, danh mục, hồ sơ tuân thủ và mức độ chịu tác động của một đối thủ.', { aliases: ['competitor profiles'] }),
  N('tob.segment-reporting', 'Segment reporting', 'financial-metrics', 'Reporting results by business unit, region or product category.', 'Báo cáo theo bộ phận: báo cáo kết quả theo đơn vị kinh doanh, khu vực hoặc nhóm sản phẩm.', {}, NOTE_ANALYSIS),
  N('tob.audited-figures', 'Audited figures', 'financial-metrics', 'Financial figures that an independent auditor has checked.', 'Số liệu đã kiểm toán: số liệu tài chính đã được kiểm toán viên độc lập kiểm tra.', {}, NOTE_ANALYSIS),
  N('tob.supplier-power', 'Supplier power', 'strategic', 'Suppliers’ ability to influence prices and terms.', 'Quyền lực nhà cung cấp: khả năng của nhà cung cấp tác động đến giá và điều khoản.', {}),
  V('tob.material-control', 'Material control', 'regulatory', 'Rules that restrict who can trade key inputs; in Vietnam buying, processing and importing tobacco raw materials need a licence, and tobacco raw materials and cigarette paper are managed.', 'Kiểm soát nguyên liệu: quy định hạn chế ai được kinh doanh các đầu vào then chốt; ở Việt Nam mua bán, chế biến, nhập khẩu nguyên liệu thuốc lá cần giấy phép, đồng thời nguyên liệu thuốc lá và giấy cuốn điếu thuốc được quản lý.', [LAW]),

  // ---- 4.3 Competitor Benchmarking
  N('tob.benchmark', 'Benchmark', 'strategic', 'A standard used for comparison.', 'Chuẩn so sánh: mức làm chuẩn để đối chiếu.', { aliases: ['benchmarks'] }, NOTE_ANALYSIS),
  N('tob.consistent-definitions', 'Consistent definitions', 'essential-concepts', 'Using the same meaning for a metric across companies and periods.', 'Định nghĩa nhất quán: dùng cùng một cách hiểu cho một chỉ tiêu ở mọi công ty và kỳ báo cáo.', { annotate: false }),
  N('tob.gross-revenue', 'Gross revenue', 'financial-metrics', 'Revenue including excise taxes.', 'Doanh thu gộp: doanh thu bao gồm cả thuế tiêu thụ đặc biệt.', {}, NOTE_ANALYSIS),
  N('tob.net-operating-margin', 'Net operating margin', 'financial-metrics', 'Operating profit divided by revenue net of excise.', 'Biên lợi nhuận hoạt động ròng: lợi nhuận hoạt động chia cho doanh thu sau khi trừ thuế tiêu thụ đặc biệt.', {}, NOTE_ANALYSIS),
  N('tob.tax-distortion', 'Tax distortion', 'financial-metrics', 'The effect of taxes on how financial ratios appear.', 'Méo mó do thuế: ảnh hưởng của thuế làm các tỷ số tài chính trông khác đi.', {}, NOTE_ANALYSIS),
  R('tob.benchmark-gap', 'Benchmark gap', 'financial-metrics', 'The difference between a current value and a benchmark, such as a country’s tax share against WHO’s recommended 75% of the retail price.', 'Khoảng cách so với chuẩn: chênh lệch giữa giá trị hiện tại và chuẩn, ví dụ tỷ lệ thuế của một nước so với mức 75% giá bán lẻ WHO khuyến nghị.', [WHO],
    'The WHO fact sheet (fetched) states the 75% benchmark but does not define \"benchmark gap\".'),
  N('tob.regulatory-violation', 'Regulatory violation', 'regulatory', 'A breach of a law or regulation.', 'Vi phạm quy định: hành vi trái với luật hoặc quy định.', { aliases: ['regulatory violations'] }),
  N('tob.reputational-risk', 'Reputational risk', 'strategic', 'The risk of damage to how stakeholders view a company.', 'Rủi ro danh tiếng: nguy cơ làm tổn hại hình ảnh của công ty trong mắt các bên liên quan.', {}),
  N('tob.regulatory-exposure', 'Regulatory exposure', 'strategic', 'The degree to which revenue depends on rules that may change.', 'Mức chịu tác động quy định: mức độ doanh thu phụ thuộc vào các quy định có thể thay đổi.', {}, NOTE_ANALYSIS),
  R('tob.scheduled-change', 'Scheduled change', 'regulatory', 'A rule change already set in law with a date, such as the specific excise amounts that Vietnam’s Law 66/2025/QH15 adds to cigarettes from 2027.', 'Thay đổi đã có lộ trình: thay đổi quy định đã được luật hóa kèm mốc thời gian, ví dụ mức thuế tuyệt đối Luật 66/2025/QH15 bổ sung cho thuốc lá điếu từ năm 2027.', [EX66],
    'Law 66/2025/QH15 (read by OCR) sets the dated tobacco schedule, but \"scheduled change\" is the curriculum’s general label.'),
  N('tob.exposure-map', 'Exposure map', 'strategic', 'A view of revenue by market and the rule changes pending in each.', 'Bản đồ mức chịu tác động: bức tranh doanh thu theo thị trường kèm các thay đổi quy định đang chờ ở mỗi nơi.', {}),

  // ---- 4.4 Key Success Factors
  N('tob.compliance-system', 'Compliance system', 'business-processes', 'The processes that make sure a business follows the law.', 'Hệ thống tuân thủ: các quy trình bảo đảm doanh nghiệp tuân thủ pháp luật.', {}),
  N('tob.capacity-utilisation', 'Capacity utilisation', 'financial-metrics', 'Output as a share of permitted capacity.', 'Mức sử dụng công suất: sản lượng tính theo tỷ lệ công suất được phép.', {}, NOTE_ANALYSIS),
  N('tob.line-efficiency', 'Line efficiency', 'business-processes', 'How effectively a production line turns inputs into good output.', 'Hiệu suất dây chuyền: mức độ dây chuyền sản xuất biến đầu vào thành sản phẩm đạt chuẩn.', {}, NOTE_ANALYSIS),
  V('tob.tax-schedule', 'Tax schedule', 'regulatory', 'A planned sequence of tax changes over time; Law 66/2025/QH15 sets cigarettes at a 75% rate plus a specific amount per pack of 20 that rises from VND 2,000 (1 Jan 2027) to VND 10,000 (1 Jan 2031).', 'Lộ trình thuế: chuỗi thay đổi thuế được định trước theo thời gian; Luật 66/2025/QH15 quy định thuốc lá điếu chịu thuế suất 75% cộng mức thuế tuyệt đối trên bao 20 điếu tăng từ 2.000 đồng (1/1/2027) lên 10.000 đồng (1/1/2031).', [EX66]),
  N('tob.pricing-scenario', 'Pricing scenario', 'strategic', 'A model of outcomes under one pricing assumption.', 'Kịch bản giá: mô hình kết quả theo một giả định về giá.', { aliases: ['pricing scenarios'] }, NOTE_ANALYSIS),
  N('tob.volume-elasticity', 'Volume elasticity', 'financial-metrics', 'The percentage change in sales volume for a one percent change in price.', 'Độ co giãn của sản lượng: phần trăm thay đổi sản lượng khi giá thay đổi một phần trăm.', {}, NOTE_ANALYSIS),
  R('tob.diversion', 'Diversion', 'business-processes', 'Moving legal products into illegal channels; FCTC Article 15 asks Parties to help determine the point of diversion.', 'Chuyển lậu: đưa sản phẩm hợp pháp vào kênh bất hợp pháp; Điều 15 Công ước khung yêu cầu các Bên hỗ trợ xác định điểm chuyển lậu.', [FCTC],
    'FCTC Art. 15.2 (fetched) refers to the point of diversion but does not define diversion.'),
  N('tob.supply-chain-integrity', 'Supply-chain integrity', 'business-processes', 'Keeping products in legal, controlled channels from factory to retailer.', 'Toàn vẹn chuỗi cung ứng: giữ sản phẩm trong các kênh hợp pháp, được kiểm soát từ nhà máy đến nhà bán lẻ.', {}),
  R('tob.unsupported-claim', 'Unsupported claim', 'regulatory', 'A statement not backed by evidence or authorisation; on tobacco packs, wording that suggests lower harm is banned in Vietnam.', 'Tuyên bố thiếu căn cứ: nhận định không có bằng chứng hoặc không được cho phép; trên bao thuốc lá, từ ngữ gợi ý ít có hại bị cấm tại Việt Nam.', [LAW],
    'Law 09/2012/QH13 Art. 15(2)(d) bans wording that suggests lower harm, a related rule; the general term \"unsupported claim\" is the curriculum’s.', { aliases: ['unsupported claims'], annotate: false }),
  N('tob.responsible-conduct', 'Responsible conduct', 'strategic', 'Acting within the law and ethical standards.', 'Hành xử có trách nhiệm: hoạt động trong khuôn khổ pháp luật và chuẩn mực đạo đức.', { annotate: false }),

  // ---- 4.5 Industry SWOT & Strategic Challenges
  N('tob.evidence-swot', 'Evidence-based SWOT', 'strategic', 'A SWOT analysis in which every point is supported by data or a named source.', 'SWOT dựa trên bằng chứng: phân tích SWOT trong đó mỗi nhận định đều có dữ liệu hoặc nguồn được nêu tên.', { acronym: 'SWOT', fullForm: 'Strengths, Weaknesses, Opportunities, Threats' }),
  N('tob.orderly-adjustment', 'Orderly adjustment', 'strategic', 'Managing a decline in a planned way.', 'Điều chỉnh có trật tự: quản lý sự suy giảm theo kế hoạch.', {}),
  N('tob.elasticity-assumption', 'Elasticity assumption', 'financial-metrics', 'An assumed responsiveness of demand to price used in a model.', 'Giả định về độ co giãn: mức độ nhạy cảm của cầu theo giá được giả định trong mô hình.', {}, NOTE_ANALYSIS),
  N('tob.base-case', 'Base case', 'strategic', 'The scenario considered most likely given the known facts.', 'Kịch bản cơ sở: kịch bản được xem là khả dĩ nhất dựa trên các sự kiện đã biết.', {}, NOTE_ANALYSIS),
  N('tob.objective-conflict', 'Objective conflict', 'strategic', 'A situation where reaching one goal makes another harder.', 'Xung đột mục tiêu: tình huống đạt được mục tiêu này làm mục tiêu khác khó hơn.', {}),
  N('tob.balanced-analysis', 'Balanced analysis', 'strategic', 'An analysis that represents all relevant facts and objectives fairly.', 'Phân tích cân bằng: phân tích phản ánh công bằng mọi sự kiện và mục tiêu liên quan.', {}),
  N('tob.legal-test', 'Legal test', 'regulatory', 'Checking that a recommendation complies with the law.', 'Kiểm tra pháp lý: xác nhận một đề xuất tuân thủ pháp luật.', {}),
  N('tob.jurisdiction', 'Jurisdiction', 'regulatory', 'The country or area whose laws apply.', 'Phạm vi pháp luật áp dụng: quốc gia hoặc khu vực có luật được áp dụng.', { annotate: false }),
  N('tob.lawful-option', 'Lawful option', 'strategic', 'A strategic choice that complies with the law.', 'Phương án hợp pháp: lựa chọn chiến lược tuân thủ pháp luật.', { aliases: ['lawful options'] }),
  N('tob.case-structure', 'Case structure', 'strategic', 'An organised approach to answering a business question.', 'Cấu trúc bài case: cách tiếp cận có tổ chức để trả lời một câu hỏi kinh doanh.', {}),

  // ---- 5.1 Consumer Trends
  N('tob.prevalence-trend', 'Prevalence trend', 'financial-metrics', 'The direction of change in the share of people who use tobacco.', 'Xu hướng tỷ lệ sử dụng: chiều hướng thay đổi của tỷ lệ người dùng thuốc lá.', {}, NOTE_ANALYSIS),
  N('tob.absolute-number', 'Absolute number', 'financial-metrics', 'The total count of users rather than a share of the population.', 'Số tuyệt đối: tổng số người dùng, không phải tỷ lệ trên dân số.', { annotate: false }, NOTE_ANALYSIS),
  R('tob.youth-uptake', 'Youth uptake', 'essential-concepts', 'Young people starting to use a product, such as e-cigarettes.', 'Mức giới trẻ bắt đầu dùng: tình trạng thanh thiếu niên bắt đầu sử dụng một sản phẩm, ví dụ thuốc lá điện tử.', [WHO, R173],
    'The WHO fact sheet (fetched) cites growing evidence of e-cigarette use by children and adolescents, and Resolution 173/2024/QH15 (read by OCR) stresses education of young people; neither defines \"youth uptake\".'),
  N('tob.regulatory-response', 'Regulatory response', 'regulatory', 'Government action taken because of a concern.', 'Phản ứng quản lý: hành động của chính phủ nhằm giải quyết một mối lo ngại.', {}),
  N('tob.precautionary-approach', 'Precautionary approach', 'regulatory', 'Acting to prevent possible harm before full evidence is available.', 'Tiếp cận phòng ngừa: hành động để ngăn tác hại có thể xảy ra khi chưa có đầy đủ bằng chứng.', {}),
  N('tob.quitline', 'Quitline', 'business-processes', 'A telephone service that helps people quit tobacco.', 'Đường dây hỗ trợ cai thuốc: dịch vụ điện thoại giúp người dùng bỏ thuốc lá.', { aliases: ['quitlines'] }),
  R('tob.cessation-access', 'Cessation access', 'business-processes', 'How easily people can get help to quit; WHO notes that comprehensive national cessation services with full or partial cost coverage exist in only 31 countries.', 'Khả năng tiếp cận cai thuốc: mức độ dễ dàng để người dân nhận được hỗ trợ bỏ thuốc; WHO ghi nhận chỉ 31 quốc gia có dịch vụ cai thuốc toàn diện được chi trả toàn phần hoặc một phần.', [WHO],
    'The WHO fact sheet (fetched) reports how many countries offer cessation services but does not define cessation access.'),
  N('tob.affordability-index', 'Affordability index', 'financial-metrics', 'A measure that compares product prices with incomes.', 'Chỉ số khả năng chi trả: thước đo so sánh giá sản phẩm với thu nhập.', { aliases: ['affordability indices'] }, 'WHO country profiles (whoVn2023, not fetched in this sprint) define the measure as the share of GDP per capita needed to buy 100 packs of the most-sold brand; the wording here is the curriculum’s.'),
  N('tob.gdp-per-capita', 'GDP per capita', 'financial-metrics', 'Gross domestic product divided by population, a rough measure of average income.', 'GDP bình quân đầu người: tổng sản phẩm quốc nội chia cho dân số, thước đo gần đúng thu nhập bình quân.', { acronym: 'GDP', fullForm: 'Gross domestic product' }, NOTE_ANALYSIS),
  N('tob.real-price', 'Real price', 'financial-metrics', 'A price adjusted for inflation.', 'Giá thực: mức giá đã điều chỉnh theo lạm phát.', {}, NOTE_ANALYSIS),

  // ---- 5.2 Technology & Innovation Trends
  R('tob.aerosol', 'Aerosol', 'essential-concepts', 'Tiny particles or droplets suspended in air; heated tobacco products and e-cigarettes produce aerosols that the user inhales.', 'Sol khí: các hạt hoặc giọt rất nhỏ lơ lửng trong không khí; thuốc lá nung nóng và thuốc lá điện tử tạo ra sol khí để người dùng hít vào.', [WHO],
    'The WHO fact sheet (fetched) says heated tobacco products produce aerosols containing nicotine and toxic chemicals, but does not define aerosol.', { aliases: ['aerosols'], annotate: false }),
  N('tob.public-health-position', 'Public-health position', 'regulatory', 'An official view held by a health body.', 'Quan điểm y tế công cộng: quan điểm chính thức của một cơ quan y tế.', { aliases: ['public-health positions'] }),
  V('tob.unique-identifier', 'Unique identifier', 'regulatory', 'A code on each unit packet that identifies that packet and records details such as when, where and on which machine it was made, so it can be tracked and traced; required in the EU by Directive 2014/40/EU.', 'Mã định danh duy nhất: mã trên từng bao thuốc xác định riêng bao đó và ghi các thông tin như thời gian, nơi và máy sản xuất để có thể truy vết; được Chỉ thị 2014/40/EU của EU yêu cầu.', [TPD]),
  V('tob.security-feature', 'Security feature', 'regulatory', 'A mark on a tobacco pack that helps verify the product is authentic; the EU requires security features on unit packets.', 'Yếu tố an ninh: dấu hiệu trên bao thuốc giúp xác minh sản phẩm là thật; EU yêu cầu yếu tố an ninh trên bao đơn vị.', [TPD], { aliases: ['security features'] }),
  V('tob.system-independence', 'System independence', 'regulatory', 'Keeping tracking data separate from the tobacco industry; the EU requires manufacturers and importers to use an independent third party to host tracking data.', 'Tính độc lập của hệ thống: dữ liệu truy vết được tách khỏi ngành thuốc lá; EU yêu cầu nhà sản xuất, nhập khẩu ký hợp đồng lưu trữ dữ liệu với bên thứ ba độc lập.', [TPD]),
  N('tob.automation', 'Automation', 'business-processes', 'Using machines to perform tasks with little human input.', 'Tự động hóa: dùng máy móc thực hiện công việc với ít sự can thiệp của con người.', { annotate: false }),
  V('tob.workforce-transition', 'Workforce transition', 'strategic', 'Moving workers to new roles or sectors; Vietnamese law plans a gradual conversion of occupations for tobacco growers and production workers.', 'Chuyển đổi lực lượng lao động: giúp người lao động chuyển sang vai trò hoặc ngành mới; pháp luật Việt Nam quy định từng bước chuyển đổi ngành, nghề cho người trồng cây thuốc lá, công nhân sản xuất thuốc lá.', [LAW]),
  V('tob.emission-level', 'Emission level', 'regulatory', 'The amount of a substance released when a product is used as intended; the EU limits cigarettes to 10 mg of tar, 1 mg of nicotine and 10 mg of carbon monoxide.', 'Mức khí thải: lượng chất thoát ra khi sử dụng sản phẩm đúng cách; EU giới hạn mỗi điếu thuốc ở 10 mg hắc ín, 1 mg nicotine và 10 mg carbon monoxide.', [TPD], { aliases: ['emission levels', 'maximum emission levels'] }),

  // ---- 5.3 Market & Channel Trends
  N('tob.consumption-per-user', 'Consumption per user', 'financial-metrics', 'The average amount used by each user in a period.', 'Mức tiêu dùng bình quân mỗi người: lượng trung bình mỗi người dùng sử dụng trong một kỳ.', {}, NOTE_ANALYSIS),
  N('tob.illicit-consumption', 'Illicit consumption', 'financial-metrics', 'Use of illegal tobacco products.', 'Tiêu dùng bất hợp pháp: việc sử dụng sản phẩm thuốc lá trái phép.', {}, NOTE_ANALYSIS),
  N('tob.volume-driver', 'Volume driver', 'financial-metrics', 'A factor that changes sales volume.', 'Yếu tố tác động sản lượng: nhân tố làm thay đổi lượng bán.', { aliases: ['volume drivers'] }, NOTE_ANALYSIS),
  V('tob.implementation-plan', 'Implementation plan', 'regulatory', 'A government document that assigns tasks and deadlines to put a law into effect; Decision 1665/QD-TTg is the plan to implement the e-cigarette and heated tobacco ban.', 'Kế hoạch triển khai: văn bản của chính phủ phân công nhiệm vụ và thời hạn để đưa một quy định vào thực hiện; Quyết định 1665/QĐ-TTg là kế hoạch triển khai lệnh cấm thuốc lá điện tử, thuốc lá nung nóng.', [D1665], { aliases: ['implementation plans'] }),
  R('tob.inspection-campaign', 'Inspection campaign', 'business-processes', 'A focused period of enforcement checks; Decision 1665/QD-TTg calls for stronger inspection, checking and supervision of the ban.', 'Đợt thanh tra, kiểm tra: giai đoạn tập trung kiểm tra thực thi; Quyết định 1665/QĐ-TTg yêu cầu tăng cường thanh tra, kiểm tra, giám sát việc thi hành lệnh cấm.', [D1665],
    'Decision 1665/QD-TTg (read by OCR) assigns inspection and supervision tasks but does not use or define the term \"inspection campaign\".', { aliases: ['inspection campaigns'] }),
  N('tob.authorisation', 'Authorisation', 'regulatory', 'Formal permission to sell a product.', 'Cấp phép lưu hành: sự cho phép chính thức để bán một sản phẩm.', { annotate: false }),
  N('tob.outlet-density', 'Outlet density', 'financial-metrics', 'The number of tobacco sellers in an area.', 'Mật độ điểm bán: số điểm bán thuốc lá trong một khu vực.', {}),
  N('tob.retail-tightening', 'Retail tightening', 'regulatory', 'Stronger rules on where and how tobacco is sold.', 'Siết chặt bán lẻ: các quy định chặt hơn về nơi và cách bán thuốc lá.', {}),
  V('tob.access-restriction', 'Access restriction', 'regulatory', 'A rule that limits who may buy tobacco, such as the ban on sales to people under 18 in Vietnam and FCTC Article 16 on sales to and by minors.', 'Hạn chế tiếp cận: quy định giới hạn ai được mua thuốc lá, ví dụ lệnh cấm bán cho người chưa đủ 18 tuổi ở Việt Nam và Điều 16 Công ước khung về bán cho và bởi trẻ vị thành niên.', [LAW, FCTC], { aliases: ['access restrictions'] }),
  N('tob.diversification', 'Diversification', 'strategic', 'Expanding into new products or businesses.', 'Đa dạng hóa: mở rộng sang sản phẩm hoặc lĩnh vực kinh doanh mới.', {}),
  N('tob.category-split', 'Category split', 'financial-metrics', 'Revenue divided by product category.', 'Cơ cấu doanh thu theo nhóm: doanh thu được chia theo nhóm sản phẩm.', {}, NOTE_ANALYSIS),
  N('tob.non-combustible', 'Non-combustible product', 'products-services', 'A product that does not burn tobacco.', 'Sản phẩm không đốt: sản phẩm không đốt cháy thuốc lá.', { aliases: ['non-combustible products'] }),

  // ---- 5.4 Regulatory & Sustainability Trends
  V('tob.special-consumption-tax', 'Special Consumption Tax', 'regulatory', 'Vietnam’s excise tax on specified goods and services, including tobacco; Law 66/2025/QH15 governs it from 1 January 2026.', 'Thuế tiêu thụ đặc biệt: thuế của Việt Nam đánh vào một số hàng hóa, dịch vụ trong đó có thuốc lá; Luật 66/2025/QH15 điều chỉnh từ ngày 1/1/2026.', [EX66]),
  V('tob.phased-increase', 'Phased increase', 'regulatory', 'A tax that rises in steps over time; the specific excise on cigarettes rises each year from VND 2,000 per pack of 20 on 1 Jan 2027 to VND 10,000 on 1 Jan 2031.', 'Tăng theo lộ trình: thuế tăng từng bước theo thời gian; thuế tuyệt đối với thuốc lá điếu tăng mỗi năm từ 2.000 đồng/bao 20 điếu (1/1/2027) lên 10.000 đồng/bao (1/1/2031).', [EX66]),
  V('tob.effective-date', 'Effective date', 'regulatory', 'The date a law starts to apply; Law 66/2025/QH15 takes effect on 1 January 2026.', 'Ngày có hiệu lực: ngày một luật bắt đầu được áp dụng; Luật 66/2025/QH15 có hiệu lực từ ngày 1/1/2026.', [EX66], { annotate: false }),
  R('tob.handling-violations', 'Handling of violations', 'regulatory', 'Applying penalties for breaches of the law; Decision 1665/QD-TTg refers to administrative penalties and criminal handling for violating the ban.', 'Xử lý vi phạm: áp dụng chế tài đối với hành vi vi phạm pháp luật; Quyết định 1665/QĐ-TTg nêu chế tài xử phạt hành chính, xử lý hình sự đối với hành vi vi phạm lệnh cấm.', [D1665],
    'Decision 1665/QD-TTg (read by OCR) mentions penalties but the appendix assigning handling tasks was only skimmed.'),
  V('tob.communication-campaign', 'Communication campaign', 'business-processes', 'Public information about a new rule; Decision 1665/QD-TTg has the Ministry of Health prepare materials and organise communication and training on the harm of e-cigarettes and heated tobacco.', 'Chiến dịch truyền thông: hoạt động thông tin cho công chúng về một quy định mới; Quyết định 1665/QĐ-TTg giao Bộ Y tế biên soạn tài liệu, tổ chức tuyên truyền, phổ biến, tập huấn về tác hại của thuốc lá điện tử, thuốc lá nung nóng.', [D1665], { annotate: false }),
  V('tob.assigned-task', 'Assigned task', 'business-processes', 'A responsibility given to a named agency; Decision 1665/QD-TTg assigns tasks and deadlines to ministries, localities and other bodies.', 'Nhiệm vụ được phân công: trách nhiệm giao cho một cơ quan cụ thể; Quyết định 1665/QĐ-TTg phân công nhiệm vụ và thời hạn cho các bộ, địa phương và cơ quan khác.', [D1665], { aliases: ['assigned tasks'], annotate: false }),
  R('tob.pack-surface', 'Pack surface', 'products-services', 'An outside face of a pack; Vietnam requires health warnings to cover at least 50% of each main front and back surface.', 'Mặt bao: một mặt bên ngoài của bao thuốc; Việt Nam yêu cầu cảnh báo sức khỏe chiếm ít nhất 50% diện tích mỗi mặt chính trước và sau.', [LAW],
    'Law 09/2012/QH13 Art. 15(4) sets the 50% coverage of the main front and back surfaces but does not define pack surface.', { aliases: ['pack surfaces'], annotate: false }),
  N('tob.cigarette-butt', 'Cigarette butt', 'products-services', 'The remaining end of a smoked cigarette, including the filter.', 'Tàn thuốc lá: phần còn lại của điếu thuốc đã hút, gồm cả đầu lọc.', { aliases: ['cigarette butts'] }),
  N('tob.producer-responsibility', 'Producer responsibility', 'regulatory', 'Making producers accountable for the waste their products create.', 'Trách nhiệm của nhà sản xuất: bắt nhà sản xuất chịu trách nhiệm đối với chất thải từ sản phẩm của mình.', {},
    'The source register cites Law 72/2020/QH14 Art. 55 and a government agency summary (cemEpr); neither text was fetched in this sprint.'),
  R('tob.official-gazette', 'Official gazette', 'institutions', 'The government publication where laws are officially published; Law 66/2025/QH15 appears in the Official Gazette issues 973 + 974 of 25 July 2025.', 'Công báo: ấn phẩm của chính phủ nơi văn bản pháp luật được đăng chính thức; Luật 66/2025/QH15 được đăng trên Công báo số 973 + 974 ngày 25/7/2025.', [EX66],
    'The Gazette copy of Law 66/2025/QH15 (read by OCR) carries the Gazette issue header, but no fetched text defines what a gazette is.', { annotate: false }),
  N('tob.regulatory-register', 'Regulatory register', 'business-processes', 'A list that tracks laws, their effective dates, status and sources.', 'Sổ đăng ký quy định: danh mục theo dõi các văn bản luật, ngày hiệu lực, tình trạng và nguồn.', {}),

  // ---- 5.5 Growth Outlook & Strategic Opportunities
  N('tob.false-precision', 'False precision', 'essential-concepts', 'Presenting uncertain estimates as if they were exact.', 'Độ chính xác giả tạo: trình bày các ước tính không chắc chắn như thể chính xác tuyệt đối.', {}),
  N('tob.known-rule', 'Known rule', 'regulatory', 'A rule that is already set in law.', 'Quy định đã biết: quy định đã được ban hành trong luật.', { aliases: ['known rules'] }),
  N('tob.tax-revenue', 'Tax revenue', 'financial-metrics', 'Tax per unit multiplied by the units sold.', 'Số thu thuế: mức thuế trên mỗi đơn vị nhân với số đơn vị bán ra.', { annotate: false }, NOTE_ANALYSIS),
  N('tob.elasticity', 'Elasticity', 'financial-metrics', 'The percentage change in quantity demanded for a one percent change in price.', 'Độ co giãn: phần trăm thay đổi của lượng cầu khi giá thay đổi một phần trăm.', { annotate: false }, NOTE_ANALYSIS),
  N('tob.model-assumption', 'Model assumption', 'essential-concepts', 'An input chosen for a model rather than measured.', 'Giả định mô hình: đầu vào được chọn cho mô hình chứ không phải số đo thực tế.', { aliases: ['model assumptions'] }),
  N('tob.trade-off', 'Trade-off', 'strategic', 'Giving up one benefit to gain another.', 'Đánh đổi: từ bỏ lợi ích này để có được lợi ích khác.', { aliases: ['trade-offs'], annotate: false }),
  N('tob.adjacent-sector', 'Adjacent sector', 'strategic', 'An industry linked to tobacco but separate from it.', 'Ngành liền kề: ngành có liên hệ nhưng tách biệt với thuốc lá.', { aliases: ['adjacent sectors'] }),
  N('tob.tax-administration', 'Tax administration', 'institutions', 'The systems used to collect and enforce taxes.', 'Quản lý thuế: các hệ thống dùng để thu và thực thi thuế.', {}),
  R('tob.retraining', 'Retraining', 'strategic', 'Teaching workers new skills; in Vietnam the Tobacco Harm Prevention Fund can support the conversion of tobacco growers’ and workers’ occupations.', 'Đào tạo lại: dạy cho người lao động kỹ năng mới; ở Việt Nam Quỹ Phòng, chống tác hại của thuốc lá có thể hỗ trợ chuyển đổi ngành, nghề cho người trồng cây thuốc lá và công nhân.', [LAW],
    'Law 09/2012/QH13 Art. 29(2) and Art. 20(1) refer to conversion of occupations, but \"retraining\" is the curriculum’s general term.', { annotate: false }),
  N('tob.attributed-data', 'Attributed data', 'essential-concepts', 'Data linked to a named source.', 'Dữ liệu có nguồn: số liệu gắn với một nguồn cụ thể.', {}),
];

export const TOB_M345_LESSONS: GlossaryLessonDef[] = [
  {
    key: '3.1', title: 'Industry Business Models', module: 'How Companies Make Money',
    chapters: {
      0: ['tob.revenue-net-excise', 'tob.soe', 'tob.trade-margin'],
      1: ['tob.net-price', 'tob.unit-cost', 'tob.inelastic-demand'],
      2: ['tob.vested-interest', 'tob.policy-protection'],
      3: ['tob.device-consumable', 'tob.installed-base', 'tob.attach-rate'],
      4: ['tob.processing-margin', 'tob.credit-terms'],
    },
    essential: ['tob.revenue-net-excise', 'tob.device-consumable', 'tob.policy-protection', 'tob.soe', 'tob.net-price', 'tob.trade-margin', 'tob.inelastic-demand', 'tob.installed-base', 'tob.attach-rate', 'tob.processing-margin', 'tob.vested-interest', 'tob.unit-cost', 'tob.credit-terms'],
  },
  {
    key: '3.2', title: 'Products, Services & Segmentation', module: 'How Companies Make Money',
    chapters: {
      0: ['tob.price-tier', 'tob.trading-down', 'tob.category-mix'],
      1: ['tob.plain-packaging', 'tob.descriptor-ban'],
      2: ['tob.regulatory-status', 'tob.attributed-position'],
      3: ['tob.min-pack-size', 'tob.unit-packet', 'tob.standardised-comparison'],
      4: ['tob.mixed-tax', 'tob.price-floor', 'tob.tier-gap'],
    },
    essential: ['tob.mixed-tax', 'tob.price-tier', 'tob.trading-down', 'tob.min-pack-size', 'tob.descriptor-ban', 'tob.price-floor', 'tob.category-mix', 'tob.plain-packaging', 'tob.unit-packet', 'tob.tier-gap', 'tob.regulatory-status', 'tob.standardised-comparison', 'tob.attributed-position'],
  },
  {
    key: '3.3', title: 'Customer Segments & Needs', module: 'How Companies Make Money',
    chapters: {
      0: ['tob.adult-prevalence', 'tob.sampling'],
      1: ['tob.min-legal-age', 'tob.youth-initiation', 'tob.age-verification'],
      2: ['tob.affordability', 'tob.price-responsiveness', 'tob.addiction'],
      3: ['tob.quit-attempt', 'tob.cessation-medicine'],
      4: ['tob.trade-customer', 'tob.compliance-record'],
    },
    essential: ['tob.adult-prevalence', 'tob.min-legal-age', 'tob.affordability', 'tob.addiction', 'tob.age-verification', 'tob.price-responsiveness', 'tob.youth-initiation', 'tob.cessation-medicine', 'tob.quit-attempt', 'tob.trade-customer', 'tob.compliance-record', 'tob.sampling'],
  },
  {
    key: '3.4', title: 'Revenue Streams & Cost Structure', module: 'How Companies Make Money',
    chapters: {
      0: ['tob.permitted-output', 'tob.export-processing'],
      1: ['tob.pass-through', 'tob.over-shifting', 'tob.under-shifting'],
      2: ['tob.price-effect', 'tob.volume-effect', 'tob.mix-effect'],
      3: ['tob.fixed-cost', 'tob.operating-leverage'],
      4: ['tob.excise-contribution', 'tob.illicit-indicator', 'tob.legal-volume'],
    },
    essential: ['tob.pass-through', 'tob.permitted-output', 'tob.export-processing', 'tob.excise-contribution', 'tob.legal-volume', 'tob.operating-leverage', 'tob.price-effect', 'tob.volume-effect', 'tob.mix-effect', 'tob.illicit-indicator', 'tob.over-shifting', 'tob.under-shifting', 'tob.fixed-cost'],
  },
  {
    key: '3.5', title: 'Distribution & Sales Channels', module: 'How Companies Make Money',
    chapters: {
      0: ['tob.sales-licence', 'tob.licence-conditions'],
      1: ['tob.point-of-sale', 'tob.product-visibility'],
      2: ['tob.online-listing', 'tob.customs-control', 'tob.banned-product'],
      3: ['tob.partner-verification', 'tob.stock-audit', 'tob.record-keeping'],
      4: ['tob.display-ban', 'tob.distance-sale', 'tob.retailer-licensing'],
    },
    essential: ['tob.sales-licence', 'tob.banned-product', 'tob.licence-conditions', 'tob.retailer-licensing', 'tob.display-ban', 'tob.distance-sale', 'tob.partner-verification', 'tob.stock-audit', 'tob.customs-control', 'tob.product-visibility', 'tob.online-listing', 'tob.point-of-sale', 'tob.record-keeping'],
  },
  {
    key: '3.6', title: 'Industry Ecosystem & Stakeholders', module: 'How Companies Make Money',
    chapters: {
      0: ['tob.civil-society', 'tob.enforcement-agency'],
      1: ['tob.policy-recommendation', 'tob.monitoring', 'tob.advocacy'],
      2: ['tob.policy-safeguard', 'tob.conflict-of-interest'],
      3: ['tob.health-communication', 'tob.objective-information'],
      4: ['tob.source-sponsor', 'tob.method-transparency', 'tob.independent-review'],
    },
    essential: ['tob.policy-safeguard', 'tob.conflict-of-interest', 'tob.health-communication', 'tob.civil-society', 'tob.source-sponsor', 'tob.method-transparency', 'tob.independent-review', 'tob.monitoring', 'tob.policy-recommendation', 'tob.objective-information', 'tob.enforcement-agency', 'tob.advocacy'],
  },
  {
    key: '4.1', title: 'Industry Competition Structure', module: 'Who Competes—and Why They Win',
    chapters: {
      0: ['tob.market-concentration', 'tob.scale-economies', 'tob.capacity-restriction'],
      1: ['tob.five-forces', 'tob.threat-substitutes', 'tob.regulatory-force'],
      2: ['tob.entry-barrier', 'tob.production-licence', 'tob.machinery-control'],
      3: ['tob.legal-competition', 'tob.price-competition'],
      4: ['tob.illicit-tobacco', 'tob.counterfeit', 'tob.tracking-tracing'],
    },
    essential: ['tob.five-forces', 'tob.entry-barrier', 'tob.production-licence', 'tob.machinery-control', 'tob.illicit-tobacco', 'tob.tracking-tracing', 'tob.market-concentration', 'tob.regulatory-force', 'tob.capacity-restriction', 'tob.scale-economies', 'tob.threat-substitutes', 'tob.legal-competition', 'tob.counterfeit', 'tob.price-competition'],
  },
  {
    key: '4.2', title: 'Key Industry Players', module: 'Who Competes—and Why They Win',
    chapters: {
      0: ['tob.joint-venture', 'tob.controlling-share', 'tob.charter-capital'],
      1: ['tob.brand-licensing', 'tob.industrial-property'],
      2: ['tob.competitor-profile'],
      3: ['tob.segment-reporting', 'tob.audited-figures'],
      4: ['tob.leaf-merchant', 'tob.supplier-power', 'tob.material-control'],
    },
    essential: ['tob.joint-venture', 'tob.controlling-share', 'tob.brand-licensing', 'tob.competitor-profile', 'tob.material-control', 'tob.segment-reporting', 'tob.leaf-merchant', 'tob.supplier-power', 'tob.charter-capital', 'tob.industrial-property', 'tob.audited-figures'],
  },
  {
    key: '4.3', title: 'Competitor Benchmarking', module: 'Who Competes—and Why They Win',
    chapters: {
      0: ['tob.benchmark', 'tob.consistent-definitions'],
      1: ['tob.gross-revenue', 'tob.net-operating-margin', 'tob.tax-distortion'],
      2: ['tob.most-sold-brand', 'tob.benchmark-gap'],
      3: ['tob.regulatory-violation', 'tob.reputational-risk'],
      4: ['tob.regulatory-exposure', 'tob.scheduled-change', 'tob.exposure-map'],
    },
    essential: ['tob.net-operating-margin', 'tob.gross-revenue', 'tob.regulatory-exposure', 'tob.scheduled-change', 'tob.benchmark-gap', 'tob.most-sold-brand', 'tob.tax-distortion', 'tob.exposure-map', 'tob.benchmark', 'tob.regulatory-violation', 'tob.reputational-risk', 'tob.consistent-definitions'],
  },
  {
    key: '4.4', title: 'Key Success Factors', module: 'Who Competes—and Why They Win',
    chapters: {
      0: ['tob.compliance-system', 'tob.licence-to-operate'],
      1: ['tob.capacity-utilisation', 'tob.line-efficiency'],
      2: ['tob.tax-schedule', 'tob.pricing-scenario', 'tob.volume-elasticity'],
      3: ['tob.diversion', 'tob.traceability', 'tob.supply-chain-integrity'],
      4: ['tob.unsupported-claim', 'tob.responsible-conduct'],
    },
    essential: ['tob.tax-schedule', 'tob.compliance-system', 'tob.licence-to-operate', 'tob.supply-chain-integrity', 'tob.traceability', 'tob.diversion', 'tob.pricing-scenario', 'tob.volume-elasticity', 'tob.capacity-utilisation', 'tob.unsupported-claim', 'tob.line-efficiency', 'tob.responsible-conduct'],
  },
  {
    key: '4.5', title: 'Industry SWOT & Strategic Challenges', module: 'Who Competes—and Why They Win',
    chapters: {
      0: ['tob.evidence-swot'],
      1: ['tob.orderly-adjustment'],
      2: ['tob.scenario-analysis', 'tob.elasticity-assumption', 'tob.base-case'],
      3: ['tob.objective-conflict', 'tob.balanced-analysis', 'tob.legal-test'],
      4: ['tob.jurisdiction', 'tob.lawful-option', 'tob.case-structure'],
    },
    essential: ['tob.evidence-swot', 'tob.scenario-analysis', 'tob.base-case', 'tob.balanced-analysis', 'tob.lawful-option', 'tob.legal-test', 'tob.objective-conflict', 'tob.orderly-adjustment', 'tob.elasticity-assumption', 'tob.jurisdiction', 'tob.case-structure'],
  },
  {
    key: '5.1', title: 'Consumer Trends', module: 'What Is Changing Next',
    chapters: {
      0: ['tob.prevalence-trend', 'tob.absolute-number'],
      1: ['tob.youth-uptake', 'tob.regulatory-response', 'tob.precautionary-approach'],
      2: ['tob.quitline', 'tob.cessation-access'],
      3: ['tob.second-hand-smoke', 'tob.smoke-free-place', 'tob.social-norm'],
      4: ['tob.affordability-index', 'tob.gdp-per-capita', 'tob.real-price'],
    },
    essential: ['tob.prevalence-trend', 'tob.youth-uptake', 'tob.affordability-index', 'tob.cessation-access', 'tob.smoke-free-place', 'tob.second-hand-smoke', 'tob.gdp-per-capita', 'tob.real-price', 'tob.precautionary-approach', 'tob.regulatory-response', 'tob.quitline', 'tob.social-norm', 'tob.absolute-number'],
  },
  {
    key: '5.2', title: 'Technology & Innovation Trends', module: 'What Is Changing Next',
    chapters: {
      0: ['tob.aerosol', 'tob.heated-tobacco', 'tob.nicotine-pouch'],
      1: ['tob.premarket-review', 'tob.public-health-position', 'tob.attribution'],
      2: ['tob.unique-identifier', 'tob.security-feature', 'tob.system-independence'],
      3: ['tob.automation', 'tob.workforce-transition'],
      4: ['tob.emission-level', 'tob.ingredient-reporting'],
    },
    essential: ['tob.heated-tobacco', 'tob.premarket-review', 'tob.unique-identifier', 'tob.security-feature', 'tob.emission-level', 'tob.nicotine-pouch', 'tob.system-independence', 'tob.public-health-position', 'tob.ingredient-reporting', 'tob.workforce-transition', 'tob.aerosol', 'tob.attribution', 'tob.automation'],
  },
  {
    key: '5.3', title: 'Market & Channel Trends', module: 'What Is Changing Next',
    chapters: {
      0: ['tob.consumption-per-user', 'tob.illicit-consumption', 'tob.volume-driver'],
      1: ['tob.implementation-plan', 'tob.inspection-campaign'],
      2: ['tob.regulatory-divergence', 'tob.authorisation', 'tob.enforcement-capacity'],
      3: ['tob.outlet-density', 'tob.retail-tightening', 'tob.access-restriction'],
      4: ['tob.diversification', 'tob.category-split', 'tob.non-combustible'],
    },
    essential: ['tob.regulatory-divergence', 'tob.implementation-plan', 'tob.access-restriction', 'tob.illicit-consumption', 'tob.volume-driver', 'tob.enforcement-capacity', 'tob.retail-tightening', 'tob.diversification', 'tob.non-combustible', 'tob.consumption-per-user', 'tob.inspection-campaign', 'tob.authorisation', 'tob.category-split', 'tob.outlet-density'],
  },
  {
    key: '5.4', title: 'Regulatory & Sustainability Trends', module: 'What Is Changing Next',
    chapters: {
      0: ['tob.special-consumption-tax', 'tob.phased-increase', 'tob.effective-date'],
      1: ['tob.handling-violations', 'tob.communication-campaign', 'tob.assigned-task'],
      2: ['tob.combined-warning', 'tob.warning-rotation', 'tob.pack-surface'],
      3: ['tob.collection-treatment', 'tob.cigarette-butt', 'tob.producer-responsibility'],
      4: ['tob.official-gazette', 'tob.regulatory-register'],
    },
    essential: ['tob.special-consumption-tax', 'tob.phased-increase', 'tob.combined-warning', 'tob.collection-treatment', 'tob.producer-responsibility', 'tob.effective-date', 'tob.warning-rotation', 'tob.handling-violations', 'tob.communication-campaign', 'tob.official-gazette', 'tob.regulatory-register', 'tob.assigned-task', 'tob.pack-surface', 'tob.cigarette-butt'],
  },
  {
    key: '5.5', title: 'Growth Outlook & Strategic Opportunities', module: 'What Is Changing Next',
    chapters: {
      0: ['tob.false-precision', 'tob.known-rule'],
      1: ['tob.tax-revenue', 'tob.elasticity', 'tob.model-assumption'],
      2: ['tob.lawful-option', 'tob.orderly-adjustment', 'tob.trade-off'],
      3: ['tob.adjacent-sector', 'tob.tax-administration', 'tob.retraining'],
      4: ['tob.balanced-analysis', 'tob.attributed-data'],
    },
    essential: ['tob.known-rule', 'tob.lawful-option', 'tob.false-precision', 'tob.model-assumption', 'tob.orderly-adjustment', 'tob.balanced-analysis', 'tob.elasticity', 'tob.tax-revenue', 'tob.adjacent-sector', 'tob.tax-administration', 'tob.retraining', 'tob.attributed-data', 'tob.trade-off'],
  },
];
