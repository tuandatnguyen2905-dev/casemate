// Tobacco & Next-Generation Products Essential Terms (Modules 1-5: all 27 lessons; Modules 3-5 are authored in
// tobaccoGlossaryM345.ts and merged below). Every term is a Key Term (or an alias of one) rendered in the mapped
// chapter of fmcgTobaccoM1.ts to fmcgTobaccoM5.ts, so the
// whole-word match in that chapter is by construction. Verification is separate from structure: a term is
// 'verified' only when an official text fetched in this sprint states or defines it (see TOB_SOURCES);
// everything else is 'needs-review' (a fetched text is related but does not define it) or 'needs-source'.
import type { CurriculumGlossaryData, DefinitionBasis, GlossaryCategory, GlossarySource, GlossaryTermDef } from '../glossaryTypes';
import { TOB_M345_LESSONS, TOB_M345_SOURCES, TOB_M345_TERMS } from './tobaccoGlossaryM345';

const LAW = 'tob-law09';
const TPD = 'tob-eu-tpd';
const WHO = 'tob-who-fact';

const TOB_SOURCES: GlossarySource[] = [
  { id: LAW, title: 'Law on Prevention and Control of Tobacco Harms No. 09/2012/QH13', url: 'https://vanban.chinhphu.vn/default.aspx?docid=163544&pageid=27160', publisher: 'Government legal database (vanban.chinhphu.vn)', note: 'Same instrument as registry source vnLaw09 (fmcgTobaccoCurriculum.ts). Vietnamese text fetched on 18 Nov 2026; Articles 1, 2, 9, 11, 15, 16, 17, 21, 22, 23, 24, 25, 26, 27, 28, 29 and 30 were read. Consolidated amendments after 2012 were not checked.' },
  { id: TPD, title: 'Directive 2014/40/EU on tobacco and related products', url: 'https://eur-lex.europa.eu/eli/dir/2014/40/oj', publisher: 'EUR-Lex, European Union', note: 'Same instrument as registry source euTpd. English text fetched on 18 Nov 2026; the Article 2 definitions were read. An EU instrument used as an international reference; it is not Vietnamese law.' },
  { id: WHO, title: 'Tobacco fact sheet', url: 'https://www.who.int/news-room/fact-sheets/detail/tobacco', publisher: 'World Health Organization', note: 'Same page as registry source whoFact. Fetched on 18 Nov 2026. States that the WHO FCTC was adopted in 2003 and entered into force in 2005, describes the MPOWER demand-reduction measures, the 75% tax benchmark, heated tobacco products, e-cigarettes and nicotine pouches. WHO updates figures periodically.' },
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

const TOB_TERMS: GlossaryTermDef[] = [
  // ---- 1.1 What the Industry Includes
  R('tob.combustible', 'Combustible tobacco', 'products-services', 'Tobacco products that are burned when used, such as cigarettes and cigars.', 'Thuốc lá đốt: các sản phẩm thuốc lá được đốt khi sử dụng, ví dụ thuốc lá điếu và xì gà.', [TPD, WHO],
    'Directive 2014/40/EU Art. 2(10)-(11) defines cigarette and cigar as rolls of tobacco consumed via combustion, and the WHO fact sheet lists them among tobacco products; no fetched source defines "combustible tobacco" as a category.'),
  V('tob.heated-tobacco', 'Heated tobacco product', 'products-services', 'A tobacco product that produces an aerosol containing nicotine and toxic chemicals when the tobacco is heated, or when a device containing the tobacco is activated.', 'Sản phẩm thuốc lá làm nóng: sản phẩm thuốc lá tạo ra sol khí chứa nicotine và các hóa chất độc hại khi thuốc lá được làm nóng hoặc khi thiết bị chứa thuốc lá được kích hoạt.', [WHO],
    { aliases: ['heated tobacco products', 'heated tobacco'], ctxEn: 'The curriculum teaches that Vietnam bans these products from 2025 under Resolution 173/2024/QH15 (source register vnRes173; the signed resolution text was read by OCR in this sprint and confirms the ban).', ctxVi: 'Chương trình nêu rằng Việt Nam cấm các sản phẩm này từ năm 2025 theo Nghị quyết 173/2024/QH15 (nguồn trong danh mục vnRes173; văn bản nghị quyết có chữ ký đã được đọc bằng OCR trong đợt này và xác nhận lệnh cấm).' }),
  V('tob.nicotine-pouch', 'Nicotine pouch', 'products-services', 'A pre-portioned pouch of nicotine designed to be placed between the gum and lip; often promoted as "tobacco-free", although the nicotine may have been extracted from tobacco.', 'Túi nicotine: túi chứa nicotine chia sẵn liều, đặt giữa nướu và môi; thường được quảng bá là “không thuốc lá” dù nicotine có thể được chiết xuất từ thuốc lá.', [WHO],
    { aliases: ['nicotine pouches'] }),
  R('tob.legal-classification', 'Legal classification', 'regulatory', 'The legal category a product falls into, which decides the rules that apply to it, for example tobacco product, novel tobacco product or electronic cigarette in EU law.', 'Phân loại pháp lý: nhóm pháp lý mà một sản phẩm thuộc về, quyết định các quy định áp dụng – ví dụ sản phẩm thuốc lá, sản phẩm thuốc lá mới hoặc thuốc lá điện tử theo luật EU.', [TPD],
    'Directive 2014/40/EU Art. 2 (fetched) defines categories such as tobacco products, novel tobacco product and electronic cigarette, which illustrate classification; no fetched source defines "legal classification" itself.'),
  N('tob.premarket-review', 'Premarket review', 'regulatory', 'A regulator’s assessment of a product before it may be sold.', 'Thẩm định trước khi lưu hành: việc cơ quan quản lý đánh giá một sản phẩm trước khi cho phép bán.', {},
    'The U.S. FDA page in the source register (fdaTobacco) returned 404 when fetched in this sprint, so the U.S. premarket-review rule is not verified.'),
  V('tob.who-fctc', 'WHO Framework Convention on Tobacco Control', 'regulatory', 'The international tobacco-control treaty adopted by WHO Member States in 2003 and in force since 2005; Parties commit to measures that reduce tobacco demand and supply.', 'Công ước khung của WHO về kiểm soát thuốc lá (WHO FCTC): điều ước quốc tế do các nước thành viên WHO thông qua năm 2003, có hiệu lực từ năm 2005; các Bên cam kết thực hiện biện pháp giảm cầu và kiểm soát cung thuốc lá.', [WHO],
    { acronym: 'WHO FCTC', aliases: ['FCTC', 'Framework Convention on Tobacco Control'] }),
  V('tob.demand-reduction', 'Demand reduction', 'regulatory', 'Policies that lower the demand for tobacco, such as higher taxes, health warnings, smoke-free places, help to quit and advertising bans.', 'Giảm cầu: các chính sách làm giảm nhu cầu sử dụng thuốc lá như tăng thuế, cảnh báo sức khỏe, nơi không khói thuốc, hỗ trợ cai thuốc và cấm quảng cáo.', [WHO, LAW]),
  V('tob.supply-control', 'Supply control', 'regulatory', 'Policies that limit how tobacco is produced, imported and sold, such as planning, output limits, licensing, tax stamps and action against illicit trade.', 'Kiểm soát nguồn cung: chính sách hạn chế việc sản xuất, nhập khẩu và bán thuốc lá như quy hoạch, giới hạn sản lượng, cấp phép, tem hoặc mã và chống buôn bán bất hợp pháp.', [LAW, WHO]),
  N('tob.legal-boundary', 'Legal boundary', 'regulatory', 'The line between activities the law allows, restricts or bans.', 'Ranh giới pháp lý: ranh giới giữa các hoạt động pháp luật cho phép, hạn chế hoặc cấm.'),
  V('tob.licensed-seller', 'Licensed seller', 'business-processes', 'A business that holds the tobacco sales licence the law requires before it may sell tobacco.', 'Cơ sở bán có giấy phép: doanh nghiệp hoặc đại lý có giấy phép bán thuốc lá theo quy định mới được phép bán thuốc lá.', [LAW]),
  N('tob.tax-paid-volume', 'Tax-paid volume', 'financial-metrics', 'The quantity of tobacco products on which excise tax has been paid, used as a measure of the legal market.', 'Sản lượng đã nộp thuế: lượng sản phẩm thuốc lá đã nộp thuế tiêu thụ đặc biệt, dùng để đo thị trường hợp pháp.'),
  N('tob.prevalence', 'Prevalence', 'financial-metrics', 'The share of a population that uses a product, such as the share of adults who currently smoke.', 'Tỷ lệ sử dụng: phần trăm dân số sử dụng một sản phẩm, ví dụ tỷ lệ người trưởng thành đang hút thuốc.', { annotate: false }),

  // ---- 1.2 How the Industry Evolved
  N('tob.scale-economies', 'Scale economies', 'strategic', 'Lower cost per unit as production volume rises.', 'Lợi thế quy mô: chi phí trên mỗi đơn vị giảm khi sản lượng tăng.', { aliases: ['economies of scale'] }),
  N('tob.market-concentration', 'Market concentration', 'strategic', 'How much of a market is held by the largest companies.', 'Mức độ tập trung thị trường: phần thị trường nằm trong tay các doanh nghiệp lớn nhất.'),
  R('tob.second-hand-smoke', 'Second-hand smoke', 'essential-concepts', 'Smoke inhaled by people near someone who is smoking; WHO states there is no safe level of exposure.', 'Khói thuốc thụ động: khói mà người ở gần người đang hút thuốc hít phải; WHO nêu rằng không có mức phơi nhiễm an toàn.', [WHO],
    'The WHO fact sheet (fetched) describes the harm and says there is no safe level of exposure, but does not define the term; the curriculum Key Term wording is kept.', { aliases: ['second-hand tobacco smoke'] }),
  N('tob.attribution', 'Attribution', 'business-processes', 'Naming the source of a claim so readers can check it.', 'Trích dẫn nguồn: nêu rõ nguồn của một nhận định để người đọc có thể kiểm chứng.', { annotate: false }),
  V('tob.tax-price-policy', 'Tax and price policy', 'regulatory', 'Using tobacco taxes to raise prices and reduce use; WHO calls taxes the most cost-effective way to reduce tobacco use.', 'Chính sách thuế và giá: dùng thuế thuốc lá để nâng giá và giảm sử dụng; WHO coi thuế là cách tiết kiệm chi phí nhất để giảm sử dụng thuốc lá.', [WHO]),
  V('tob.cessation', 'Cessation support', 'business-processes', 'Help for people who want to stop using tobacco, such as counselling and medication; in Vietnam cessation is voluntary and organisations may offer counselling and cessation services.', 'Hỗ trợ cai thuốc: giúp người muốn bỏ thuốc lá, như tư vấn và thuốc hỗ trợ; ở Việt Nam việc cai thuốc là tự nguyện và các tổ chức được cung cấp dịch vụ tư vấn, cai thuốc.', [WHO, LAW],
    { aliases: ['Cessation service', 'Cessation services', 'Cessation'] }),
  R('tob.next-gen', 'Next-generation product', 'products-services', 'A newer nicotine product such as an e-cigarette, heated tobacco product or nicotine pouch.', 'Sản phẩm thế hệ mới: sản phẩm nicotine mới như thuốc lá điện tử, thuốc lá làm nóng hoặc túi nicotine.', [WHO],
    'The WHO fact sheet groups heated tobacco products, e-cigarettes and nicotine pouches as "newer tobacco and nicotine products"; "next-generation product" is the curriculum and industry label.', { aliases: ['next-generation products'] }),
  N('tob.product-authorisation', 'Product authorisation', 'regulatory', 'Official permission to sell a specific product.', 'Cấp phép sản phẩm: sự cho phép chính thức để bán một sản phẩm cụ thể.', { aliases: ['product authorisations'] }),
  N('tob.regulatory-divergence', 'Regulatory divergence', 'regulatory', 'Different countries adopting different rules for the same product.', 'Phân kỳ quy định: các quốc gia áp dụng quy định khác nhau cho cùng một sản phẩm.'),
  V('tob.excise-tax', 'Excise tax', 'regulatory', 'A tax on specific goods such as tobacco; in Vietnam the Special Consumption Tax Law 66/2025/QH15 taxes tobacco goods and applies from 1 January 2026.', 'Thuế tiêu thụ đặc biệt: thuế đánh vào một số hàng hóa như thuốc lá; ở Việt Nam Luật Thuế tiêu thụ đặc biệt 66/2025/QH15 đánh thuế thuốc lá và áp dụng từ ngày 1/1/2026.', ['tob-law66']),
  V('tob.specific-tax', 'Specific tax', 'regulatory', 'A fixed tax amount per unit, such as per pack; Law 66/2025/QH15 calls this the absolute-amount method and sets it for cigarettes per pack of 20.', 'Thuế tuyệt đối: mức thuế cố định trên mỗi đơn vị, ví dụ mỗi bao; Luật 66/2025/QH15 gọi đây là phương pháp tính thuế tuyệt đối và quy định mức thuế này cho thuốc lá điếu trên bao 20 điếu.', ['tob-law66']),
  V('tob.ad-valorem', 'Ad valorem tax', 'regulatory', 'A tax calculated as a percentage of value; Law 66/2025/QH15 computes it as the taxable price multiplied by the rate, which is 75% for cigarettes.', 'Thuế theo giá trị (ad valorem): thuế tính theo tỷ lệ phần trăm trên giá trị; Luật 66/2025/QH15 tính bằng giá tính thuế nhân với thuế suất, thuế suất với thuốc lá điếu là 75%.', ['tob-law66'], { aliases: ['ad valorem'] }),

  // ---- 1.3 How the Global Market Is Structured
  N('tob.state-monopoly', 'State monopoly', 'business-models', 'A market where a state-owned entity is the only legal supplier.', 'Độc quyền nhà nước: thị trường mà một đơn vị thuộc sở hữu nhà nước là nhà cung cấp hợp pháp duy nhất.'),
  N('tob.mixed-market', 'Mixed market', 'business-models', 'A market with both state-owned and private companies.', 'Thị trường hỗn hợp: thị trường có cả doanh nghiệp nhà nước và doanh nghiệp tư nhân.'),
  N('tob.multinational', 'Multinational company', 'institutions', 'A company that operates in many countries.', 'Công ty đa quốc gia: công ty hoạt động tại nhiều quốc gia.', { aliases: ['multinational companies', 'multinational', 'multinationals'] }),
  N('tob.leaf-merchant', 'Leaf merchant', 'institutions', 'A company that buys, processes and sells tobacco leaf to manufacturers.', 'Thương nhân lá thuốc: công ty mua, sơ chế và bán lá thuốc lá cho các nhà sản xuất.', { aliases: ['leaf merchants'] }),
  N('tob.consumable', 'Consumable', 'products-services', 'A replaceable product used with a device, such as a tobacco stick.', 'Vật tư tiêu hao: sản phẩm thay thế được dùng với thiết bị, ví dụ thanh thuốc lá.', { annotate: false }),
  V('tob.health-warning', 'Health warning', 'regulatory', 'A warning, in text and pictures, about the harmful effects of tobacco use on health, printed on tobacco packaging.', 'Cảnh báo sức khỏe: thông tin bằng chữ và hình ảnh mô tả hoặc giải thích tác hại của việc sử dụng thuốc lá đối với sức khỏe, in trên bao bì thuốc lá.', [LAW, TPD],
    { aliases: ['health warnings'], basis: 'official' }),
  V('tob.combined-warning', 'Combined warning', 'regulatory', 'A health warning that combines a text warning with a corresponding photograph or illustration.', 'Cảnh báo kết hợp: cảnh báo sức khỏe gồm thông điệp bằng chữ kèm ảnh chụp hoặc hình minh họa tương ứng.', [TPD],
    { aliases: ['combined health warning', 'combined health warnings', 'combined warnings'], basis: 'official' }),
  N('tob.product-portfolio', 'Product portfolio', 'strategic', 'The set of products a company sells.', 'Danh mục sản phẩm: tập hợp các sản phẩm mà một công ty bán.'),
  N('tob.revenue-mix', 'Revenue mix', 'financial-metrics', 'The share of revenue from each product category or market.', 'Cơ cấu doanh thu: tỷ trọng doanh thu từ từng nhóm sản phẩm hoặc từng thị trường.'),
  N('tob.market-access', 'Market access', 'strategic', 'The legal ability to sell a product in a market.', 'Khả năng tiếp cận thị trường: khả năng được bán sản phẩm hợp pháp trong một thị trường.'),
  N('tob.official-statistics', 'Official statistics', 'essential-concepts', 'Data produced by government agencies using published methods.', 'Thống kê chính thức: dữ liệu do cơ quan nhà nước tạo ra theo phương pháp được công bố.'),
  N('tob.conflicting-estimates', 'Conflicting estimates', 'essential-concepts', 'Different figures for the same quantity from different sources.', 'Ước tính mâu thuẫn: các con số khác nhau cho cùng một đại lượng từ các nguồn khác nhau.'),

  // ---- 1.4 How the Vietnam Market Works
  N('tob.current-smoking', 'Current smoking', 'essential-concepts', 'Smoking at the time of a survey, whether daily or less than daily.', 'Hút thuốc hiện tại: đang hút thuốc tại thời điểm khảo sát, hằng ngày hoặc không hằng ngày.'),
  R('tob.gats', 'Global Adult Tobacco Survey', 'institutions', 'A standard household survey of tobacco use among adults, used to compare countries.', 'Điều tra Thuốc lá ở người trưởng thành toàn cầu (GATS): khảo sát hộ gia đình chuẩn về việc sử dụng thuốc lá ở người trưởng thành, dùng để so sánh giữa các quốc gia.', [WHO],
    'The WHO fact sheet (fetched) cites results from countries where the survey has been conducted but does not describe it; the WHO Viet Nam country profile was not read as text.'),
  V('tob.permitted-output', 'Permitted output', 'regulatory', 'The quantity of tobacco an enterprise is allowed to produce and import for domestic consumption, published by the Minister of Industry and Trade.', 'Sản lượng được phép: lượng thuốc lá mà doanh nghiệp được phép sản xuất và nhập khẩu để tiêu thụ trong nước, do Bộ trưởng Bộ Công Thương công bố.', [LAW]),
  R('tob.tax-stamp', 'Tax stamp', 'regulatory', 'A stamp or printed code (number or barcode) on a tobacco pack that lets authorities identify legal, taxed products.', 'Tem thuế: tem hoặc mã số, mã vạch in trên bao thuốc lá giúp cơ quan chức năng nhận biết sản phẩm hợp pháp, đã nộp thuế.', [LAW],
    'Law 09/2012/QH13 Art. 15(2)(b) and 22(1)(b) require a stamp or printed number or barcode on packs; the fetched text does not say the mark proves tax payment, which is the curriculum wording.', { aliases: ['Tax marking', 'tax marks', 'tax mark', 'tax stamps'] }),
  V('tob.capacity-restriction', 'Capacity restriction', 'regulatory', 'A legal limit on building or expanding production capacity; in Vietnam, new or expanded capacity for domestic consumption may not exceed the industry’s total permitted output from before the law took effect, and specialised machinery capacity is managed.', 'Hạn chế năng lực sản xuất: giới hạn pháp lý về xây dựng hoặc mở rộng năng lực sản xuất; ở Việt Nam, đầu tư mới hoặc mở rộng cho tiêu thụ trong nước không được vượt tổng sản lượng được phép sản xuất của toàn ngành trước khi Luật có hiệu lực, và năng lực máy móc chuyên ngành được quản lý.', [LAW],
    { aliases: ['Capacity control'] }),
  V('tob.retail-agent', 'Retail agent', 'institutions', 'A business that sells tobacco at retail and must hold a tobacco sales licence; its sales point must display a notice that tobacco is not sold to under-18s.', 'Đại lý bán lẻ: cơ sở bán lẻ thuốc lá phải có giấy phép bán thuốc lá; điểm bán phải treo biển thông báo không bán thuốc lá cho người chưa đủ 18 tuổi.', [LAW],
    { aliases: ['retail agents'] }),
  V('tob.foreign-invested-project', 'Foreign-invested project', 'regulatory', 'A tobacco production project with foreign capital; in Vietnam it must be a joint venture or cooperation with a licensed producer, with the State holding the controlling share of charter capital, and meet Government conditions.', 'Dự án có vốn đầu tư nước ngoài: dự án sản xuất thuốc lá có vốn nước ngoài; ở Việt Nam phải liên doanh, hợp tác với doanh nghiệp đã có giấy phép sản xuất, Nhà nước giữ tỷ lệ chi phối trong vốn điều lệ và đáp ứng điều kiện do Chính phủ quy định.', [LAW],
    { aliases: ['foreign-invested projects'] }),
  R('tob.direct-marketing', 'Direct marketing', 'regulatory', 'Marketing aimed directly at individual consumers, which Vietnamese law prohibits for tobacco.', 'Tiếp thị trực tiếp: hoạt động tiếp thị nhắm trực tiếp tới từng người tiêu dùng, bị pháp luật Việt Nam cấm đối với thuốc lá.', [LAW],
    'Law 09/2012/QH13 Art. 9(2) prohibits marketing tobacco directly to consumers "in any form" but does not define the term.'),
  V('tob.smoke-free-place', 'Smoke-free place', 'regulatory', 'A place where smoking is prohibited by law; in Vietnam, Law 09/2012/QH13 Art. 11 bans smoking completely in health facilities, schools, workplaces, indoor public places and public transport, with limited exceptions in Art. 12.', 'Nơi không khói thuốc: nơi pháp luật cấm hút thuốc; ở Việt Nam, Điều 11 Luật 09/2012/QH13 cấm hút thuốc hoàn toàn tại cơ sở y tế, cơ sở giáo dục, nơi làm việc, địa điểm công cộng trong nhà và phương tiện giao thông công cộng, với một số ngoại lệ hạn chế tại Điều 12.', [LAW, WHO],
    { aliases: ['smoke-free places', 'smoke-free environment', 'smoke-free environments'] }),
  V('tob.display-limit', 'Display limit', 'regulatory', 'A legal cap on how many tobacco products a retailer may display; in Vietnam, no more than one pack, carton or box of each brand.', 'Giới hạn trưng bày: mức trần pháp lý về số sản phẩm thuốc lá mà điểm bán được trưng bày; ở Việt Nam là không quá một bao, một tút hoặc một hộp của mỗi nhãn hiệu.', [LAW]),
  V('tob.fund', 'Tobacco Harm Prevention Fund', 'institutions', 'Vietnam’s national fund, under the Ministry of Health, that is non-profit and mobilises, provides and coordinates financial resources for tobacco-harm prevention activities nationwide.', 'Quỹ Phòng, chống tác hại của thuốc lá: quỹ quốc gia trực thuộc Bộ Y tế, hoạt động không vì lợi nhuận, huy động, cung cấp và điều phối nguồn lực tài chính cho các hoạt động phòng, chống tác hại của thuốc lá trên phạm vi toàn quốc.', [LAW]),
  V('tob.mandatory-contribution', 'Mandatory contribution', 'regulatory', 'A payment required by law; for tobacco producers and importers, the contribution to the Tobacco Harm Prevention Fund is a percentage of the excise tax base (1.0% from 1 May 2013, 1.5% from 1 May 2016, 2.0% from 1 May 2019), declared and paid with the excise tax.', 'Khoản đóng góp bắt buộc: khoản thanh toán do luật yêu cầu; với cơ sở sản xuất, nhập khẩu thuốc lá, khoản đóng góp cho Quỹ tính theo tỷ lệ phần trăm trên giá tính thuế tiêu thụ đặc biệt (1,0% từ 1/5/2013, 1,5% từ 1/5/2016, 2,0% từ 1/5/2019), khai và nộp cùng thuế tiêu thụ đặc biệt.', [LAW]),
  V('tob.excise-base', 'Excise tax base', 'financial-metrics', 'The taxable price on which excise tax is calculated: the selling price before excise tax, environmental protection tax and value-added tax (Law 66/2025/QH15 Art. 6), and the basis of the Fund contribution under Law 09/2012/QH13.', 'Giá tính thuế tiêu thụ đặc biệt: giá bán ra chưa có thuế tiêu thụ đặc biệt, thuế bảo vệ môi trường và thuế giá trị gia tăng, làm căn cứ để tính thuế (Điều 6 Luật 66/2025/QH15) và là cơ sở tính khoản đóng góp cho Quỹ theo Luật 09/2012/QH13.', ['tob-law66', LAW]),

  // ---- 1.5 What Drives Industry Change
  N('tob.price-elasticity', 'Price elasticity of demand', 'financial-metrics', 'The percentage change in the quantity demanded for a one percent change in price.', 'Độ co giãn của cầu theo giá: phần trăm thay đổi của lượng cầu khi giá thay đổi một phần trăm.', {},
    'General economics definition used in the curriculum; no tobacco source in the register defines it, so it is not verified.'),
  N('tob.pass-through', 'Pass-through', 'financial-metrics', 'The share of a tax increase that is passed on to consumers in prices.', 'Mức chuyển phần thuế sang giá: tỷ lệ tăng thuế được chuyển sang người tiêu dùng qua giá bán.', { annotate: false }),
  N('tob.price-floor', 'Price floor', 'financial-metrics', 'The lowest price at which products are sold.', 'Giá sàn: mức giá thấp nhất mà sản phẩm được bán.', {}),
  N('tob.initiation', 'Initiation', 'essential-concepts', 'Starting to use tobacco.', 'Bắt đầu sử dụng: thời điểm một người bắt đầu dùng thuốc lá.', { annotate: false }),
  N('tob.product-ban', 'Product ban', 'regulatory', 'A legal prohibition on selling a whole category of products.', 'Cấm sản phẩm: lệnh cấm pháp lý đối với việc bán cả một nhóm sản phẩm.', { aliases: ['product bans'] }),
  V('tob.characterising-flavour', 'Characterising flavour', 'regulatory', 'A clearly noticeable smell or taste other than tobacco, resulting from an additive or a combination of additives (for example fruit, spice, herbs, alcohol, candy, menthol or vanilla), noticeable before or during consumption.', 'Hương vị đặc trưng: mùi hoặc vị dễ nhận biết khác với mùi, vị thuốc lá, do một hoặc nhiều chất phụ gia tạo ra (ví dụ trái cây, gia vị, thảo mộc, rượu, kẹo, bạc hà hoặc vani), cảm nhận được trước hoặc trong khi sử dụng.', [TPD],
    { aliases: ['characterising flavours'], basis: 'official' }),
  N('tob.enforcement-capacity', 'Enforcement capacity', 'strategic', 'The resources available to enforce rules.', 'Năng lực thực thi: nguồn lực sẵn có để bảo đảm các quy định được thi hành.'),
  R('tob.illicit-tobacco', 'Illicit tobacco', 'regulatory', 'Tobacco products traded illegally, including smuggled and counterfeit products.', 'Thuốc lá bất hợp pháp: sản phẩm thuốc lá được buôn bán trái phép, gồm thuốc lá nhập lậu và thuốc lá giả.', [LAW, WHO],
    'Law 09/2012/QH13 Art. 9(1) and 26 refer to smuggled and counterfeit tobacco, and the WHO fact sheet describes illicit trade, but neither fetched text defines "illicit tobacco".'),
  R('tob.counterfeit', 'Counterfeit', 'regulatory', 'A fake product that imitates a legitimate brand; Vietnamese law prohibits counterfeit tobacco.', 'Hàng giả: sản phẩm giả mạo nhãn hiệu hợp pháp; pháp luật Việt Nam cấm thuốc lá giả.', [LAW],
    'Law 09/2012/QH13 Art. 9(1) prohibits counterfeit tobacco and Art. 26 provides for confiscating and destroying it, but the text does not define counterfeit.', { annotate: false }),
  N('tob.social-norm', 'Social norm', 'essential-concepts', 'A shared expectation about acceptable behaviour.', 'Chuẩn mực xã hội: kỳ vọng chung về hành vi được chấp nhận.', { aliases: ['social norms'], annotate: false }),
  N('tob.initiation-prevention', 'Initiation prevention', 'regulatory', 'Policies that stop people starting tobacco use.', 'Ngăn chặn bắt đầu sử dụng: các chính sách ngăn người dân bắt đầu dùng thuốc lá.'),

  // ---- 2.1 Value Chain Overview
  N('tob.curing', 'Curing', 'business-processes', 'Drying harvested tobacco leaf under controlled conditions.', 'Sấy/ủ lá thuốc: làm khô lá thuốc lá sau thu hoạch trong điều kiện kiểm soát.'),
  N('tob.leaf-processing', 'Leaf processing', 'business-processes', 'Grading, threshing and blending tobacco leaf to prepare it for manufacturing.', 'Chế biến lá thuốc: phân loại, tách cọng và phối trộn lá thuốc lá để chuẩn bị cho sản xuất.'),
  V('tob.tax-ratio', 'Tax-to-retail-price ratio', 'financial-metrics', 'Total taxes as a share of the retail price; WHO’s recommended benchmark is that taxes make up at least 75% of the retail price.', 'Tỷ lệ thuế trên giá bán lẻ: tổng thuế tính theo tỷ lệ phần trăm của giá bán lẻ; mức khuyến nghị của WHO là thuế chiếm ít nhất 75% giá bán lẻ.', [WHO],
    { aliases: ['Tax share'] }),
  N('tob.most-sold-brand', 'Most-sold brand', 'financial-metrics', 'The brand with the highest sales, used by WHO to compare prices and taxes across countries.', 'Nhãn hiệu bán chạy nhất: nhãn hiệu có doanh số cao nhất, được WHO dùng để so sánh giá và thuế giữa các quốc gia.'),
  N('tob.industry-trade-share', 'Industry and trade share', 'financial-metrics', 'The part of the retail price kept by manufacturers, distributors and retailers.', 'Phần của ngành và thương mại: phần giá bán lẻ do nhà sản xuất, nhà phân phối và nhà bán lẻ giữ lại.'),
  N('tob.tax-flow', 'Tax flow', 'business-processes', 'The movement of tax payments from businesses to the government.', 'Dòng thuế: việc chuyển các khoản thuế từ doanh nghiệp đến nhà nước.'),
  N('tob.compliance-responsibility', 'Compliance responsibility', 'regulatory', 'The legal duties a participant must meet.', 'Trách nhiệm tuân thủ: các nghĩa vụ pháp lý mà một chủ thể phải thực hiện.'),
  V('tob.national-technical-regulation', 'National technical regulation', 'regulatory', 'A national technical regulation that tobacco made or imported for sale in Vietnam must comply with; the Minister of Health issues the regulation for cigarettes, and producers must also meet their own declared base standard.', 'Quy chuẩn kỹ thuật quốc gia: quy chuẩn mà thuốc lá sản xuất, nhập khẩu để tiêu thụ tại Việt Nam phải tuân thủ; Bộ trưởng Bộ Y tế ban hành quy chuẩn đối với thuốc lá điếu, và nhà sản xuất còn phải đáp ứng tiêu chuẩn cơ sở do mình công bố.', [LAW]),
  N('tob.multi-agency', 'Multi-agency oversight', 'regulatory', 'Shared supervision by several government bodies.', 'Giám sát liên ngành: việc giám sát do nhiều cơ quan nhà nước cùng thực hiện.'),
  R('tob.e-liquid', 'E-liquid', 'products-services', 'The nicotine-containing liquid used in an electronic cigarette; EU law defines the refill container that holds it.', 'Dung dịch nicotine (e-liquid): chất lỏng chứa nicotine dùng trong thuốc lá điện tử; luật EU định nghĩa bình chứa dùng để nạp lại.', [TPD],
    'Directive 2014/40/EU Art. 2(17) defines a "refill container" holding nicotine-containing liquid; it does not use the term "e-liquid".', { aliases: ['e-liquids'] }),
  N('tob.battery-safety', 'Battery safety', 'regulatory', 'Rules and design measures to prevent battery hazards in electronic devices.', 'An toàn pin: quy định và biện pháp thiết kế nhằm ngăn ngừa nguy cơ từ pin trong thiết bị điện tử.'),

  // ---- 2.2 Upstream Activities
  N('tob.flue-curing', 'Flue-curing', 'business-processes', 'Drying leaf with indirect heat in barns.', 'Sấy ống khói: làm khô lá thuốc bằng nhiệt gián tiếp trong lò sấy.'),
  N('tob.air-curing', 'Air-curing', 'business-processes', 'Drying leaf naturally in ventilated barns.', 'Phơi gió: làm khô lá thuốc tự nhiên trong kho thông thoáng.'),
  V('tob.approved-planning', 'Approved planning', 'regulatory', 'Official plans that govern where and how much an activity can expand; in Vietnam, investment in tobacco growing, leaf processing and production must fit plans approved by the competent state authority.', 'Quy hoạch được phê duyệt: các quy hoạch chính thức quy định hoạt động được mở rộng ở đâu và đến mức nào; ở Việt Nam, đầu tư trồng cây thuốc lá, chế biến nguyên liệu và sản xuất thuốc lá phải phù hợp với quy hoạch do cơ quan nhà nước có thẩm quyền phê duyệt.', [LAW]),
  N('tob.threshing', 'Threshing', 'business-processes', 'Separating the leaf from its stem.', 'Tách cọng: tách phiến lá khỏi cọng.'),
  N('tob.redrying', 'Redrying', 'business-processes', 'Drying processed leaf to a stable moisture level for storage.', 'Sấy lại: làm khô lá đã chế biến đến độ ẩm ổn định để lưu kho.'),
  N('tob.leaf-blend', 'Leaf blend', 'products-services', 'A mix of leaf grades used to achieve a product’s characteristics.', 'Phối trộn lá thuốc: hỗn hợp các cấp lá được dùng để tạo đặc tính cho sản phẩm.', { aliases: ['leaf blends'] }),
  R('tob.cigarette-paper', 'Cigarette paper', 'products-services', 'The thin paper used to wrap tobacco in a cigarette; Vietnam manages cigarette paper as part of supply control.', 'Giấy cuốn điếu thuốc: loại giấy mỏng dùng để cuốn thuốc thành điếu; Việt Nam quản lý giấy cuốn điếu thuốc lá như một biện pháp kiểm soát nguồn cung.', [LAW],
    'Law 09/2012/QH13 Art. 22(1)(d) lists management of tobacco raw materials and cigarette paper, but does not describe the paper itself.'),
  V('tob.additive', 'Additive', 'products-services', 'A substance, other than tobacco, that is added to a tobacco product, a unit packet or any outside packaging.', 'Phụ gia: chất khác thuốc lá được thêm vào sản phẩm thuốc lá, bao đơn vị hoặc bao bì bên ngoài.', [TPD], { aliases: ['additives'], basis: 'official' }),
  R('tob.alternative-livelihood', 'Alternative livelihood', 'strategic', 'Another way for people to earn a living; in Vietnam the Fund can support career change for tobacco growers, processors and producers.', 'Sinh kế thay thế: cách kiếm sống khác cho người dân; ở Việt Nam Quỹ có thể hỗ trợ chuyển đổi ngành, nghề cho người trồng, chế biến nguyên liệu và sản xuất thuốc lá.', [LAW],
    'Law 09/2012/QH13 Art. 29(2)(i) names support for converting the occupations of growers, leaf processors and producers; the general term is not defined.'),
  N('tob.crop-transition', 'Crop transition', 'strategic', 'Switching farmland from one crop to another.', 'Chuyển đổi cây trồng: chuyển đất canh tác từ cây này sang cây khác.'),
  N('tob.just-transition', 'Just transition', 'strategic', 'Managing change so that affected workers are supported.', 'Chuyển đổi công bằng: quản lý thay đổi sao cho người lao động bị ảnh hưởng được hỗ trợ.'),
  N('tob.leaf-inventory', 'Leaf inventory', 'business-processes', 'Stocks of processed leaf held for future production.', 'Tồn kho lá thuốc: lượng lá đã chế biến được giữ lại cho sản xuất sau này.'),
  N('tob.blend-flexibility', 'Blend flexibility', 'strategic', 'The ability to adjust leaf mixes while keeping product characteristics.', 'Linh hoạt phối trộn: khả năng điều chỉnh hỗn hợp lá mà vẫn giữ đặc tính sản phẩm.'),
  N('tob.currency-exposure', 'Currency exposure', 'financial-metrics', 'The risk that exchange-rate changes affect costs.', 'Rủi ro tỷ giá: nguy cơ thay đổi tỷ giá làm ảnh hưởng đến chi phí.'),

  // ---- 2.3 Midstream Activities
  N('tob.primary-processing', 'Primary processing', 'business-processes', 'Preparing leaf into cut tobacco for cigarette making.', 'Chế biến sơ cấp: chuẩn bị lá thành thuốc sợi để làm điếu thuốc.'),
  N('tob.making-machine', 'Making machine', 'business-processes', 'Equipment that forms cigarettes and attaches filters.', 'Máy cuốn điếu: thiết bị tạo điếu thuốc và gắn đầu lọc.'),
  V('tob.output-cap', 'Output cap', 'regulatory', 'A legal limit on how much can be produced; in Vietnam, permitted output is managed and published, and new capacity is capped by the industry’s pre-law permitted output.', 'Trần sản lượng: giới hạn pháp lý về lượng được sản xuất; ở Việt Nam, sản lượng được phép được quản lý và công bố, đồng thời năng lực mới bị giới hạn bởi sản lượng được phép của toàn ngành trước khi Luật có hiệu lực.', [LAW]),
  N('tob.output-utilisation', 'Permitted output utilisation', 'financial-metrics', 'The share of its permitted output that a producer actually makes.', 'Mức sử dụng sản lượng được phép: tỷ lệ sản lượng được phép mà nhà sản xuất thực sự sản xuất.'),
  V('tob.base-standard', 'Base standard', 'regulatory', 'A standard that a manufacturer or importer declares for its own tobacco products and must then ensure the products meet.', 'Tiêu chuẩn cơ sở: tiêu chuẩn do nhà sản xuất, nhập khẩu tự công bố cho sản phẩm thuốc lá của mình và phải bảo đảm sản phẩm phù hợp.', [LAW]),
  R('tob.emission-testing', 'Emission testing', 'business-processes', 'Measuring the substances released when a tobacco product is used as intended.', 'Thử nghiệm khí thải: đo các chất thoát ra khi sử dụng sản phẩm thuốc lá đúng cách.', [TPD],
    'Directive 2014/40/EU Art. 2(21) defines "emissions" as substances released when a product is consumed as intended; the measurement and reporting duties in later Articles were not read.'),
  R('tob.ingredient-reporting', 'Ingredient reporting', 'regulatory', 'Telling regulators which ingredients a tobacco product contains; in the EU, manufacturers must report ingredients and emissions.', 'Báo cáo thành phần: cung cấp cho cơ quan quản lý thông tin về các thành phần của sản phẩm thuốc lá; ở EU, nhà sản xuất phải báo cáo thành phần và khí thải.', [TPD],
    'Directive 2014/40/EU Art. 2(18) defines "ingredient"; the reporting duty itself (a later Article) was not read in this sprint.'),
  V('tob.picture-warning', 'Picture warning', 'regulatory', 'A health warning that includes an image showing the harms of tobacco; in Vietnam, text and picture warnings must cover at least 50% of each main front and back surface of a pack.', 'Cảnh báo bằng hình ảnh: cảnh báo sức khỏe có hình ảnh mô tả tác hại của thuốc lá; ở Việt Nam, cảnh báo bằng chữ và hình ảnh phải chiếm ít nhất 50% diện tích mỗi mặt chính trước và sau của bao thuốc.', [LAW, WHO],
    { aliases: ['picture warnings', 'pictorial health warnings'] }),
  V('tob.warning-rotation', 'Warning rotation', 'regulatory', 'Changing the content of pack health warnings at set intervals; in Vietnam the content must change every two years.', 'Luân phiên cảnh báo: thay đổi nội dung cảnh báo sức khỏe trên bao bì theo chu kỳ; ở Việt Nam nội dung phải thay đổi định kỳ hai năm một lần.', [LAW]),
  V('tob.misleading-descriptor', 'Misleading descriptor', 'regulatory', 'Wording that makes people think a tobacco product is less harmful; Vietnamese law bans such words and phrases on packs.', 'Từ ngữ gây hiểu lầm: từ, cụm từ khiến người đọc hiểu thuốc lá ít có hại; pháp luật Việt Nam cấm sử dụng trên bao bì.', [LAW],
    { aliases: ['misleading descriptors'] }),
  N('tob.compliance-cost', 'Compliance cost', 'financial-metrics', 'The cost of meeting legal requirements.', 'Chi phí tuân thủ: chi phí để đáp ứng các yêu cầu pháp lý.', { aliases: ['compliance costs'] }),
  N('tob.volume-linked-cost', 'Volume-linked cost', 'financial-metrics', 'A cost that rises with production or sales volume.', 'Chi phí theo sản lượng: chi phí tăng theo sản lượng sản xuất hoặc bán.'),
  N('tob.collection-treatment', 'Collection-and-treatment contribution', 'regulatory', 'A payment that supports the collection and treatment of waste from listed products, including tobacco.', 'Đóng góp thu gom, xử lý: khoản đóng góp hỗ trợ việc thu gom và xử lý chất thải từ các sản phẩm thuộc danh mục, trong đó có thuốc lá.', {},
    'The source register cites Law 72/2020/QH14 Art. 55 and a government agency summary (cemEpr); neither text was fetched in this sprint.'),

  // ---- 2.4 Downstream Activities
  V('tob.wholesale-agent', 'Wholesale agent', 'institutions', 'A business that sells tobacco wholesale and must hold a tobacco sales licence.', 'Đại lý bán buôn: cơ sở bán buôn thuốc lá phải có giấy phép bán thuốc lá.', [LAW], { aliases: ['wholesale agents'] }),
  N('tob.controlled-channel', 'Controlled channel', 'business-models', 'A distribution route limited to licensed participants.', 'Kênh phân phối có kiểm soát: tuyến phân phối chỉ gồm các chủ thể có giấy phép.'),
  R('tob.traceability', 'Traceability', 'business-processes', 'The ability to follow products through the chain; Vietnam manages the origin, movement and legality of tobacco.', 'Truy xuất nguồn gốc: khả năng theo dõi sản phẩm qua chuỗi cung ứng; Việt Nam quản lý nguồn gốc, sự di chuyển và tính hợp pháp của thuốc lá.', [LAW],
    'Law 09/2012/QH13 Art. 22(1)(đ) requires management of origin, movement and legality; the Law does not define traceability.'),
  V('tob.age-notice', 'Age notice', 'regulatory', 'A sign that a tobacco sales point must display saying tobacco is not sold to people under 18.', 'Biển thông báo độ tuổi: biển mà điểm bán thuốc lá phải treo, thông báo không bán thuốc lá cho người chưa đủ 18 tuổi.', [LAW]),
  V('tob.vending-machine-ban', 'Vending machine ban', 'regulatory', 'A prohibition on selling tobacco through automatic vending machines; Vietnamese law bans it.', 'Cấm máy bán tự động: lệnh cấm bán thuốc lá bằng máy bán hàng tự động; pháp luật Việt Nam nghiêm cấm.', [LAW]),
  N('tob.retail-inspection', 'Retail inspection', 'business-processes', 'An official check of a shop’s compliance.', 'Kiểm tra điểm bán: việc cơ quan chức năng kiểm tra mức độ tuân thủ của cửa hàng.', { aliases: ['retail inspections'] }),
  R('tob.origin-record', 'Origin record', 'business-processes', 'Documentation of where a product was made and how it moved.', 'Hồ sơ nguồn gốc: tài liệu ghi nhận nơi sản xuất và đường di chuyển của sản phẩm.', [LAW],
    'Law 09/2012/QH13 Art. 22(1)(đ) requires management of origin and movement; the term "origin record" is the curriculum’s.'),
  V('tob.confiscation', 'Confiscation', 'regulatory', 'Legal seizure of illegal goods or equipment; Vietnamese law provides for confiscating and destroying counterfeit tobacco and the machinery used to make it.', 'Tịch thu: việc tước giữ hợp pháp hàng hóa hoặc thiết bị vi phạm; pháp luật Việt Nam quy định tịch thu, tiêu hủy thuốc lá giả và máy móc dùng để sản xuất thuốc lá giả.', [LAW],
    { aliases: ['Seizure', 'seizures'] }),
  R('tob.peoples-committee', 'People’s Committee', 'institutions', 'The executive body of local government in Vietnam; Law 09/2012/QH13 makes People’s Committees responsible for leading and coordinating action against smuggled and counterfeit tobacco locally.', 'Ủy ban nhân dân: cơ quan hành chính nhà nước ở địa phương của Việt Nam; Luật 09/2012/QH13 giao Ủy ban nhân dân các cấp chủ trì, phối hợp phòng, chống thuốc lá nhập lậu, thuốc lá giả tại địa phương.', [LAW],
    'Law 09/2012/QH13 Art. 27(2) assigns the anti-smuggling role; the general description of a People’s Committee comes from the curriculum Key Term, not from a fetched text.', { aliases: ['People’s Committees'] }),
  R('tob.counselling', 'Counselling', 'business-processes', 'Professional support to help a person change behaviour, such as quitting tobacco.', 'Tư vấn: hỗ trợ chuyên môn giúp một người thay đổi hành vi, ví dụ bỏ thuốc lá.', [WHO],
    'The WHO fact sheet says counselling and medication can more than double a tobacco user’s chance of quitting but does not define counselling.', { annotate: false }),
  N('tob.nrt', 'Nicotine replacement therapy', 'products-services', 'Medicines that provide nicotine to ease quitting, regulated as medicines in many countries.', 'Liệu pháp thay thế nicotine: thuốc cung cấp nicotine để giảm khó chịu khi cai thuốc, được quản lý như thuốc ở nhiều quốc gia.', { acronym: 'NRT' }),

  // ---- 2.5 Inputs, Outputs & Value Creation
  N('tob.regulatory-input', 'Regulatory input', 'regulatory', 'A licence, permit or allocation needed to operate legally.', 'Đầu vào pháp lý: giấy phép, chấp thuận hoặc hạn ngạch cần có để hoạt động hợp pháp.', { aliases: ['regulatory inputs'] }),
  N('tob.licence-to-operate', 'Licence to operate', 'regulatory', 'The legal permission to carry on a business.', 'Giấy phép hoạt động: sự cho phép pháp lý để kinh doanh.', { annotate: false }),
  N('tob.price-tier', 'Price tier', 'strategic', 'A band of prices within which products compete.', 'Phân khúc giá: dải giá mà trong đó các sản phẩm cạnh tranh.', { aliases: ['price tiers'] }),
  N('tob.product-consistency', 'Product consistency', 'strategic', 'Delivering the same product characteristics every time.', 'Tính nhất quán của sản phẩm: cung cấp đặc tính sản phẩm giống nhau ở mọi lần.', { annotate: false }),
  V('tob.marketing-ban', 'Marketing ban', 'regulatory', 'A legal prohibition on advertising, promotion and direct marketing; Vietnam bans tobacco advertising, promotion and direct marketing to consumers in any form.', 'Cấm tiếp thị: lệnh cấm pháp lý đối với quảng cáo, khuyến mại và tiếp thị trực tiếp; Việt Nam cấm quảng cáo, khuyến mại thuốc lá và tiếp thị thuốc lá trực tiếp tới người tiêu dùng dưới mọi hình thức.', [LAW, WHO],
    { aliases: ['marketing bans'] }),
  N('tob.excise-contribution', 'Excise contribution', 'financial-metrics', 'The amount of excise tax collected from tobacco.', 'Số thu thuế tiêu thụ đặc biệt: số tiền thuế tiêu thụ đặc biệt thu được từ thuốc lá.', {}),
  N('tob.vat', 'VAT', 'financial-metrics', 'Value-added tax charged on sales.', 'Thuế giá trị gia tăng (VAT): thuế tính trên giá trị tăng thêm của hàng hóa, dịch vụ khi bán.', { acronym: 'VAT', fullForm: 'Value-added tax' }),
  N('tob.external-cost', 'External cost', 'essential-concepts', 'A cost borne by people other than the buyer or seller.', 'Chi phí ngoại tác: chi phí do người khác ngoài bên mua và bên bán gánh chịu.', { aliases: ['external costs'] }),
  R('tob.productivity-loss', 'Productivity loss', 'financial-metrics', 'Lost output due to illness or premature death.', 'Thiệt hại năng suất: sản lượng bị mất do bệnh tật hoặc tử vong sớm.', [WHO],
    'The WHO fact sheet names "lost human capital" from tobacco-attributable illness and death among the economic costs; the term "productivity loss" is the curriculum’s.'),
  N('tob.social-cost', 'Social cost', 'essential-concepts', 'The total cost of an activity to society, including external costs.', 'Chi phí xã hội: tổng chi phí của một hoạt động đối với xã hội, kể cả chi phí ngoại tác.', { aliases: ['social costs'] }),
  N('tob.policy-risk', 'Policy risk', 'strategic', 'The risk that rule changes reduce a business’s value.', 'Rủi ro chính sách: nguy cơ thay đổi quy định làm giảm giá trị doanh nghiệp.', { annotate: false }),
  N('tob.stranded-asset', 'Stranded asset', 'strategic', 'An asset that loses value early because of external changes.', 'Tài sản bị mắc kẹt: tài sản mất giá sớm do thay đổi từ bên ngoài.', { aliases: ['stranded assets'] }),
  N('tob.scenario-analysis', 'Scenario analysis', 'strategic', 'Comparing outcomes under different assumptions.', 'Phân tích kịch bản: so sánh kết quả theo các giả định khác nhau.', { annotate: false }),

  // ---- 2.6 Global vs. Local Value Chain
  N('tob.regional-factory', 'Regional factory', 'business-models', 'A plant supplying several nearby markets where allowed.', 'Nhà máy khu vực: nhà máy cung cấp cho nhiều thị trường lân cận khi được phép.'),
  N('tob.country-specific-pack', 'Country-specific pack', 'business-processes', 'Packaging designed to meet one country’s rules.', 'Bao bì riêng theo quốc gia: bao bì thiết kế để đáp ứng quy định của một quốc gia.', { aliases: ['country-specific packs'] }),
  N('tob.global-sourcing', 'Global sourcing', 'business-processes', 'Buying inputs from many countries.', 'Mua sắm toàn cầu: mua nguyên liệu, đầu vào từ nhiều quốc gia.'),
  N('tob.controlled-system', 'Controlled system', 'business-models', 'A market where the state manages key aspects of supply and sales.', 'Hệ thống có kiểm soát: thị trường mà nhà nước quản lý các khía cạnh chính của cung và bán hàng.'),
  V('tob.permitted-import', 'Permitted import', 'regulatory', 'The volume of tobacco an enterprise is allowed to import for domestic consumption, published by the Minister of Industry and Trade together with permitted output.', 'Sản lượng nhập khẩu được phép: lượng thuốc lá mà doanh nghiệp được phép nhập khẩu để tiêu thụ trong nước, do Bộ trưởng Bộ Công Thương công bố cùng với sản lượng được phép sản xuất.', [LAW]),
  N('tob.state-planning', 'State planning', 'regulatory', 'Government plans that shape where and how much an industry can operate.', 'Quy hoạch nhà nước: các kế hoạch của chính phủ định hình nơi và quy mô mà một ngành được hoạt động.', {}),
  N('tob.import-control', 'Import control', 'regulatory', 'Rules that limit or condition imports.', 'Kiểm soát nhập khẩu: các quy định hạn chế hoặc đặt điều kiện cho hoạt động nhập khẩu.', { aliases: ['import controls'] }),
  V('tob.destination-labelling', 'Destination labelling', 'regulatory', 'Labelling that meets the importing country’s rules; in Vietnam, labelling on exported tobacco packs follows the importing country’s requirements.', 'Ghi nhãn theo nước đến: ghi nhãn đáp ứng quy định của nước nhập khẩu; ở Việt Nam, nhãn trên bao thuốc lá xuất khẩu được thực hiện theo yêu cầu của nước nhập khẩu.', [LAW]),
  N('tob.customs-enforcement', 'Customs enforcement', 'regulatory', 'Border checks to apply trade rules.', 'Thực thi hải quan: kiểm tra tại biên giới để áp dụng các quy định thương mại.'),
  N('tob.treaty-obligation', 'Treaty obligation', 'regulatory', 'A duty a country accepts by joining a treaty.', 'Nghĩa vụ theo điều ước: nghĩa vụ mà một quốc gia chấp nhận khi tham gia điều ước quốc tế.', { aliases: ['treaty obligations'] }),
  N('tob.implementation-report', 'Implementation report', 'regulatory', 'A country’s report on how it applies a treaty.', 'Báo cáo thực hiện: báo cáo của một quốc gia về việc áp dụng điều ước.', { aliases: ['implementation reports'] }),
  N('tob.price-gap', 'Price gap', 'financial-metrics', 'The difference in price for similar products between markets.', 'Chênh lệch giá: khác biệt về giá của sản phẩm tương tự giữa các thị trường.'),
  N('tob.smuggling-incentive', 'Smuggling incentive', 'essential-concepts', 'The profit available from moving goods illegally across borders.', 'Động cơ buôn lậu: lợi nhuận có được từ việc đưa hàng hóa qua biên giới trái phép.'),
  V('tob.international-cooperation', 'International cooperation', 'regulatory', 'Countries working together on enforcement; Vietnamese law provides for provincial and national coordination with neighbouring and other relevant countries against smuggled and counterfeit tobacco.', 'Hợp tác quốc tế: các quốc gia phối hợp thực thi; pháp luật Việt Nam quy định phối hợp ở cấp tỉnh, cấp quốc gia với các nước có chung đường biên giới và các nước liên quan trong phòng, chống thuốc lá nhập lậu, thuốc lá giả.', [LAW], { annotate: false }),
];

export const FMCG_TOBACCO_GLOSSARY: CurriculumGlossaryData = {
  curriculumId: 'fmcg-tobacco',
  industry: 'FMCG',
  subIndustry: 'Tobacco & Next-Generation Products',
  terms: [...TOB_TERMS, ...TOB_M345_TERMS],
  sources: [...TOB_SOURCES, ...TOB_M345_SOURCES],
  lessons: [
    {
      key: '1.1', title: 'What the Industry Includes', module: 'How the Industry Works',
      chapters: {
        0: ['tob.combustible', 'tob.heated-tobacco', 'tob.nicotine-pouch'],
        1: ['tob.legal-classification', 'tob.premarket-review'],
        2: ['tob.who-fctc', 'tob.demand-reduction', 'tob.supply-control'],
        3: ['tob.legal-boundary', 'tob.licensed-seller'],
        4: ['tob.tax-paid-volume', 'tob.prevalence'],
      },
      essential: ['tob.who-fctc', 'tob.combustible', 'tob.heated-tobacco', 'tob.legal-classification', 'tob.tax-paid-volume', 'tob.nicotine-pouch', 'tob.premarket-review', 'tob.demand-reduction', 'tob.supply-control', 'tob.legal-boundary', 'tob.licensed-seller', 'tob.prevalence'],
    },
    {
      key: '1.2', title: 'How the Industry Evolved', module: 'How the Industry Works',
      chapters: {
        0: ['tob.scale-economies', 'tob.market-concentration'],
        1: ['tob.second-hand-smoke', 'tob.attribution'],
        2: ['tob.tax-price-policy', 'tob.cessation'],
        3: ['tob.next-gen', 'tob.product-authorisation', 'tob.regulatory-divergence'],
        4: ['tob.excise-tax', 'tob.specific-tax', 'tob.ad-valorem'],
      },
      essential: ['tob.excise-tax', 'tob.next-gen', 'tob.tax-price-policy', 'tob.second-hand-smoke', 'tob.cessation', 'tob.specific-tax', 'tob.ad-valorem', 'tob.product-authorisation', 'tob.regulatory-divergence', 'tob.market-concentration', 'tob.scale-economies', 'tob.attribution'],
    },
    {
      key: '1.3', title: 'How the Global Market Is Structured', module: 'How the Industry Works',
      chapters: {
        0: ['tob.state-monopoly', 'tob.mixed-market', 'tob.multinational'],
        1: ['tob.leaf-merchant', 'tob.consumable'],
        2: ['tob.health-warning', 'tob.combined-warning'],
        3: ['tob.product-portfolio', 'tob.revenue-mix', 'tob.market-access'],
        4: ['tob.official-statistics', 'tob.conflicting-estimates'],
      },
      essential: ['tob.state-monopoly', 'tob.health-warning', 'tob.combined-warning', 'tob.product-portfolio', 'tob.market-access', 'tob.mixed-market', 'tob.multinational', 'tob.leaf-merchant', 'tob.consumable', 'tob.revenue-mix', 'tob.official-statistics', 'tob.conflicting-estimates'],
    },
    {
      key: '1.4', title: 'How the Vietnam Market Works', module: 'How the Industry Works',
      chapters: {
        0: ['tob.current-smoking', 'tob.gats'],
        1: ['tob.permitted-output', 'tob.tax-stamp', 'tob.capacity-restriction'],
        2: ['tob.retail-agent', 'tob.foreign-invested-project'],
        3: ['tob.direct-marketing', 'tob.smoke-free-place', 'tob.display-limit'],
        4: ['tob.fund', 'tob.mandatory-contribution', 'tob.excise-base'],
      },
      essential: ['tob.fund', 'tob.permitted-output', 'tob.mandatory-contribution', 'tob.display-limit', 'tob.smoke-free-place', 'tob.capacity-restriction', 'tob.tax-stamp', 'tob.retail-agent', 'tob.foreign-invested-project', 'tob.direct-marketing', 'tob.excise-base', 'tob.current-smoking', 'tob.gats'],
    },
    {
      key: '1.5', title: 'What Drives Industry Change', module: 'How the Industry Works',
      chapters: {
        0: ['tob.price-elasticity', 'tob.pass-through', 'tob.price-floor'],
        1: ['tob.initiation', 'tob.cessation'],
        2: ['tob.product-ban', 'tob.characterising-flavour', 'tob.enforcement-capacity'],
        3: ['tob.illicit-tobacco', 'tob.counterfeit'],
        4: ['tob.social-norm', 'tob.initiation-prevention'],
      },
      essential: ['tob.price-elasticity', 'tob.pass-through', 'tob.product-ban', 'tob.characterising-flavour', 'tob.illicit-tobacco', 'tob.price-floor', 'tob.cessation', 'tob.enforcement-capacity', 'tob.counterfeit', 'tob.initiation-prevention', 'tob.social-norm', 'tob.initiation'],
    },
    {
      key: '2.1', title: 'Value Chain Overview', module: 'How Value Moves Through the Industry',
      chapters: {
        0: ['tob.curing', 'tob.leaf-processing'],
        1: ['tob.tax-ratio', 'tob.most-sold-brand', 'tob.industry-trade-share'],
        2: ['tob.tax-flow', 'tob.tax-stamp'],
        3: ['tob.compliance-responsibility', 'tob.national-technical-regulation', 'tob.multi-agency'],
        4: ['tob.e-liquid', 'tob.battery-safety'],
      },
      essential: ['tob.tax-ratio', 'tob.industry-trade-share', 'tob.tax-stamp', 'tob.national-technical-regulation', 'tob.curing', 'tob.leaf-processing', 'tob.most-sold-brand', 'tob.tax-flow', 'tob.compliance-responsibility', 'tob.multi-agency', 'tob.e-liquid', 'tob.battery-safety'],
    },
    {
      key: '2.2', title: 'Upstream Activities', module: 'How Value Moves Through the Industry',
      chapters: {
        0: ['tob.flue-curing', 'tob.air-curing', 'tob.approved-planning'],
        1: ['tob.threshing', 'tob.redrying', 'tob.leaf-blend'],
        2: ['tob.cigarette-paper', 'tob.additive'],
        3: ['tob.alternative-livelihood', 'tob.crop-transition', 'tob.just-transition'],
        4: ['tob.leaf-inventory', 'tob.blend-flexibility', 'tob.currency-exposure'],
      },
      essential: ['tob.approved-planning', 'tob.leaf-blend', 'tob.additive', 'tob.cigarette-paper', 'tob.just-transition', 'tob.flue-curing', 'tob.air-curing', 'tob.threshing', 'tob.redrying', 'tob.alternative-livelihood', 'tob.crop-transition', 'tob.leaf-inventory', 'tob.blend-flexibility', 'tob.currency-exposure'],
    },
    {
      key: '2.3', title: 'Midstream Activities', module: 'How Value Moves Through the Industry',
      chapters: {
        0: ['tob.primary-processing', 'tob.making-machine'],
        1: ['tob.output-cap', 'tob.capacity-restriction', 'tob.output-utilisation'],
        2: ['tob.base-standard', 'tob.emission-testing', 'tob.ingredient-reporting'],
        3: ['tob.picture-warning', 'tob.warning-rotation', 'tob.misleading-descriptor'],
        4: ['tob.compliance-cost', 'tob.volume-linked-cost', 'tob.collection-treatment'],
      },
      essential: ['tob.output-cap', 'tob.capacity-restriction', 'tob.picture-warning', 'tob.warning-rotation', 'tob.compliance-cost', 'tob.base-standard', 'tob.misleading-descriptor', 'tob.output-utilisation', 'tob.emission-testing', 'tob.ingredient-reporting', 'tob.volume-linked-cost', 'tob.collection-treatment', 'tob.primary-processing', 'tob.making-machine'],
    },
    {
      key: '2.4', title: 'Downstream Activities', module: 'How Value Moves Through the Industry',
      chapters: {
        0: ['tob.wholesale-agent', 'tob.controlled-channel', 'tob.traceability'],
        1: ['tob.age-notice', 'tob.vending-machine-ban', 'tob.retail-inspection'],
        2: ['tob.tax-stamp', 'tob.origin-record', 'tob.confiscation'],
        3: ['tob.confiscation', 'tob.peoples-committee'],
        4: ['tob.cessation', 'tob.counselling', 'tob.nrt'],
      },
      essential: ['tob.traceability', 'tob.wholesale-agent', 'tob.tax-stamp', 'tob.age-notice', 'tob.vending-machine-ban', 'tob.controlled-channel', 'tob.retail-inspection', 'tob.origin-record', 'tob.confiscation', 'tob.peoples-committee', 'tob.cessation', 'tob.counselling', 'tob.nrt'],
    },
    {
      key: '2.5', title: 'Inputs, Outputs & Value Creation', module: 'How Value Moves Through the Industry',
      chapters: {
        0: ['tob.regulatory-input', 'tob.licence-to-operate'],
        1: ['tob.price-tier', 'tob.product-consistency', 'tob.marketing-ban'],
        2: ['tob.excise-contribution', 'tob.vat', 'tob.tax-ratio'],
        3: ['tob.external-cost', 'tob.productivity-loss', 'tob.social-cost'],
        4: ['tob.policy-risk', 'tob.stranded-asset', 'tob.scenario-analysis'],
      },
      essential: ['tob.regulatory-input', 'tob.marketing-ban', 'tob.excise-contribution', 'tob.tax-ratio', 'tob.social-cost', 'tob.price-tier', 'tob.vat', 'tob.external-cost', 'tob.productivity-loss', 'tob.stranded-asset', 'tob.policy-risk', 'tob.scenario-analysis', 'tob.product-consistency', 'tob.licence-to-operate'],
    },
    {
      key: '2.6', title: 'Global vs. Local Value Chain', module: 'How Value Moves Through the Industry',
      chapters: {
        0: ['tob.regional-factory', 'tob.country-specific-pack', 'tob.global-sourcing'],
        1: ['tob.controlled-system', 'tob.permitted-import', 'tob.state-planning'],
        2: ['tob.import-control', 'tob.destination-labelling', 'tob.customs-enforcement'],
        3: ['tob.treaty-obligation', 'tob.implementation-report'],
        4: ['tob.price-gap', 'tob.smuggling-incentive', 'tob.international-cooperation'],
      },
      essential: ['tob.controlled-system', 'tob.permitted-import', 'tob.destination-labelling', 'tob.treaty-obligation', 'tob.smuggling-incentive', 'tob.country-specific-pack', 'tob.global-sourcing', 'tob.import-control', 'tob.customs-enforcement', 'tob.price-gap', 'tob.international-cooperation', 'tob.implementation-report', 'tob.regional-factory', 'tob.state-planning'],
    },
    ...TOB_M345_LESSONS,
  ],
  flaggedAcronyms: [
    { acronym: 'GATS', status: 'ambiguous', note: 'Also the General Agreement on Trade in Services. In the Tobacco chapters it means the Global Adult Tobacco Survey, so it is not auto-annotated.' },
    { acronym: 'WHO', status: 'not-yet-authored', note: 'World Health Organization; used throughout the Tobacco chapters and not yet an entry.' },
    { acronym: 'VND', status: 'not-yet-authored', note: 'Vietnamese dong; currency code used in the Tobacco price chapters.' },
    { acronym: 'FDA', status: 'not-yet-authored', note: 'U.S. Food and Drug Administration; named in the classification chapters.' },
  ],
};
