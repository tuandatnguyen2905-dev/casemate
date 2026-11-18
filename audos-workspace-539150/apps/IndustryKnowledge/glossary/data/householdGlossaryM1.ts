// Household & Personal Care Essential Terms, Module 1: lessons 1.1-1.5 (How the Industry Works). Source chapters: fmcgHouseholdM1.ts.
// A term is defined in the first lesson that uses it and referenced by id afterwards, so each concept stays one
// entry reused across lessons. Verification status follows the V / R / N convention in householdGlossaryKit.ts.
import type { GlossaryLessonDef, GlossaryTermDef } from '../glossaryTypes';
import { N, R, V } from './householdGlossaryKit';

export const HH_M1_TERMS: GlossaryTermDef[] = [
  // ---- 1.1 What the Industry Includes
  N('hh.home-care', 'Home care', 'products-services', 'Products for cleaning and maintaining the home, such as laundry, dishwashing and surface cleaners.', 'Chăm sóc nhà cửa (home care): sản phẩm làm sạch và giữ gìn ngôi nhà, như giặt giũ, rửa chén và chất tẩy rửa bề mặt.'),
  N('hh.personal-hygiene', 'Personal hygiene', 'products-services', 'Everyday products for body cleanliness, such as toothpaste, soap and deodorant.', 'Vệ sinh cá nhân: sản phẩm dùng hằng ngày để giữ sạch cơ thể, như kem đánh răng, xà phòng và lăn khử mùi.'),
  N('hh.absorbent-hygiene', 'Absorbent hygiene', 'products-services', 'Products that absorb fluids and protect, such as diapers and sanitary pads.', 'Sản phẩm vệ sinh thấm hút: sản phẩm thấm hút chất lỏng và bảo vệ, như tã em bé và băng vệ sinh.'),
  N('hh.cost-per-use', 'Cost per use', 'financial-metrics', 'The price of a product divided by the number of uses or doses it provides.', 'Chi phí mỗi lần dùng: giá sản phẩm chia cho số lần dùng hoặc số liều mà sản phẩm cung cấp.'),
  N('hh.functional-purchase', 'Functional purchase', 'essential-concepts', 'A purchase driven mainly by the practical job a product does.', 'Mua theo chức năng: việc mua chủ yếu do công việc thực tế mà sản phẩm đảm nhiệm.'),
  N('hh.boundary-category', 'Boundary category', 'products-services', 'A category that can be positioned as everyday hygiene or as beauty.', 'Danh mục ranh giới: danh mục có thể được định vị là vệ sinh hằng ngày hoặc là làm đẹp.', { aliases: ['Boundary categories'] }),
  N('hh.germ-protection-claim', 'Germ protection claim', 'regulatory', 'A claim that a product reduces or kills microorganisms, which needs supporting tests.', 'Công bố bảo vệ khỏi vi khuẩn: tuyên bố sản phẩm làm giảm hoặc tiêu diệt vi sinh vật, cần có thử nghiệm chứng minh.', { aliases: ['Germ protection claims'] }),
  R('hh.hazard-label', 'Hazard label', 'regulatory', 'Label information warning users about chemical hazards and safe handling.', 'Nhãn cảnh báo nguy hiểm: thông tin trên nhãn cảnh báo người dùng về mối nguy hóa chất và cách xử lý an toàn.', ['hh-eu-clp'],
    'Regulation (EC) No 1272/2008 (CLP) defines the elements of hazard communication, including hazard pictograms, signal words and hazard statements (Art. 2), but the curriculum term "hazard label" is not defined in the text; the register source for the Vietnamese rule on household chemical labels was not read.', { aliases: ['Hazard labels'] }),
  V('hh.disinfectant-preparation', 'Disinfectant preparation', 'regulatory', 'A product that contains an insecticidal or bactericidal active substance, has its own trade name and is used directly to kill insects or bacteria for household and medical use (Decree 91/2016/ND-CP Art. 2(3), "chế phẩm diệt côn trùng, diệt khuẩn").', 'Chế phẩm diệt khuẩn: sản phẩm chứa hoạt chất diệt côn trùng, diệt khuẩn, có tên thương mại riêng và được dùng trực tiếp để diệt côn trùng, diệt khuẩn trong lĩnh vực gia dụng và y tế (khoản 3 Điều 2 Nghị định 91/2016/NĐ-CP).', ['hh-vn-dec91'],
    { aliases: ['disinfectant preparations'] }),
  N('hh.household-penetration', 'Household penetration', 'financial-metrics', 'The share of households that buy a category or brand at least once in a period.', 'Độ thâm nhập hộ gia đình: tỷ lệ hộ gia đình mua một danh mục hoặc thương hiệu ít nhất một lần trong một kỳ.'),
  N('hh.purchase-frequency', 'Purchase frequency', 'financial-metrics', 'The average number of purchases per buying household in a period.', 'Tần suất mua: số lần mua trung bình của mỗi hộ có mua trong một kỳ.'),
  N('hh.household-panel', 'Household panel', 'business-processes', 'A sample of households whose purchases are tracked over time.', 'Panel hộ gia đình: nhóm hộ mẫu có việc mua sắm được theo dõi theo thời gian.'),

  // ---- 1.2 How the Industry Evolved
  V('hh.surfactant', 'Surfactant', 'products-services', 'Any organic substance and/or preparation used in detergents that has surface-active properties and is capable of reducing the surface tension of water, so that water can lift dirt and oil (Regulation (EC) No 648/2004 Art. 2(6)).', 'Chất hoạt động bề mặt (surfactant): chất hữu cơ dùng trong chất tẩy rửa có tính hoạt động bề mặt, làm giảm sức căng bề mặt của nước để nhấc chất bẩn và dầu mỡ.', ['hh-eu-det'],
    { aliases: ['surfactants'] }),
  R('hh.synthetic-detergent', 'Synthetic detergent', 'products-services', 'synthetic detergents', 'Chất tẩy rửa tổng hợp: sản phẩm làm sạch dựa trên chất hoạt động bề mặt được sản xuất, thay vì xà phòng truyền thống.', ['hh-eu-det'],
    'Regulation (EC) No 648/2004 Art. 2(1) defines "detergent" as any substance or preparation containing soaps and/or other surfactants for washing and cleaning, so soap-based and surfactant-based products both count; the phrase "synthetic detergent" is not defined there.', { aliases: ['Synthetic detergents'] }),
  N('hh.concentrate', 'Concentrate', 'products-services', 'A product with more active ingredient per dose, so less is needed per use.', 'Sản phẩm cô đặc: sản phẩm có nhiều hoạt chất hơn trên mỗi liều nên mỗi lần dùng cần ít hơn.'),
  N('hh.unit-dose', 'Unit dose', 'products-services', 'A pre-measured single portion, such as a laundry capsule.', 'Liều đơn vị: một phần định lượng sẵn, ví dụ viên nang giặt.'),
  N('hh.price-per-kilogram', 'Price per kilogram', 'financial-metrics', 'Product price divided by weight, which can mislead when concentration differs.', 'Giá trên mỗi ki-lô-gam: giá sản phẩm chia cho khối lượng, có thể gây hiểu lầm khi độ cô đặc khác nhau.'),
  N('hh.superabsorbent-polymer', 'Superabsorbent polymer', 'products-services', 'A material that absorbs and holds many times its weight in liquid.', 'Polymer siêu thấm: vật liệu thấm và giữ lượng chất lỏng gấp nhiều lần khối lượng của nó.'),
  N('hh.single-use-product', 'Single-use product', 'products-services', 'A product designed to be used once and thrown away.', 'Sản phẩm dùng một lần: sản phẩm được thiết kế để dùng một lần rồi bỏ.', { aliases: ['Single-use products'] }),
  N('hh.bulk-pack', 'Bulk pack', 'products-services', 'A large pack offering lower cost per use.', 'Gói lớn (bulk pack): gói lượng lớn có chi phí mỗi lần dùng thấp hơn.', { aliases: ['Bulk packs'] }),
  N('hh.general-trade', 'General trade', 'business-models', 'Small independent shops and markets reached through distributors.', 'Kênh truyền thống (general trade): cửa hàng nhỏ lẻ độc lập và chợ, được phục vụ qua nhà phân phối.'),
  N('hh.format-upgrade', 'Format upgrade', 'essential-concepts', 'Shoppers moving to more convenient or advanced product formats.', 'Nâng cấp định dạng: người mua chuyển sang các định dạng sản phẩm tiện lợi hoặc hiện đại hơn.'),
  N('hh.local-champion', 'Local champion', 'institutions', 'A domestic company that competes strongly in its home market.', 'Doanh nghiệp nội địa dẫn đầu: công ty trong nước cạnh tranh mạnh tại thị trường nhà.'),

  // ---- 1.3 How the Global Market Is Structured
  N('hh.value-density', 'Value density', 'financial-metrics', 'The value of a product per unit of weight or volume.', 'Mật độ giá trị: giá trị của sản phẩm trên mỗi đơn vị khối lượng hoặc thể tích.'),
  N('hh.capital-intensity', 'Capital intensity', 'financial-metrics', 'How much investment in equipment a business needs to produce.', 'Cường độ vốn: mức đầu tư thiết bị mà một doanh nghiệp cần để sản xuất.'),
  N('hh.commodity-input', 'Commodity input', 'products-services', 'A widely traded raw material whose price is set by markets.', 'Nguyên liệu hàng hóa: nguyên liệu thô được giao dịch rộng rãi, có giá do thị trường quyết định.'),
  N('hh.category-specialist', 'Category specialist', 'institutions', 'A company that focuses on one or a few categories.', 'Doanh nghiệp chuyên một danh mục: công ty tập trung vào một hoặc vài danh mục.', { aliases: ['Category specialists'] }),
  N('hh.private-label', 'Private label', 'products-services', 'Products sold under a retailer’s own brand.', 'Nhãn riêng (private label): sản phẩm bán dưới thương hiệu riêng của nhà bán lẻ.', { aliases: ['Private labels'] }),
  N('hh.economies-of-scale', 'Economies of scale', 'strategic', 'Lower average cost per unit as volume rises.', 'Lợi thế quy mô: chi phí trung bình trên mỗi đơn vị giảm khi sản lượng tăng.'),
  N('hh.capacity-utilisation', 'Capacity utilisation', 'financial-metrics', 'The share of a factory’s capacity that is used.', 'Hiệu suất sử dụng công suất: tỷ lệ công suất nhà máy được sử dụng.', { aliases: ['capacity utilization'] }),
  N('hh.fixed-cost-absorption', 'Fixed cost absorption', 'financial-metrics', 'Spreading fixed costs across more units to lower cost per unit.', 'Hấp thụ chi phí cố định: dàn chi phí cố định trên nhiều đơn vị hơn để giảm chi phí mỗi đơn vị.'),
  N('hh.sachet', 'Sachet', 'products-services', 'A small single-use pack that lowers the price per purchase.', 'Gói nhỏ (sachet): gói dùng một lần cỡ nhỏ giúp giảm số tiền phải trả mỗi lần mua.', { aliases: ['sachets'] }),
  N('hh.affordability-per-purchase', 'Affordability per purchase', 'financial-metrics', 'How easily a shopper can pay for one purchase, regardless of cost per use.', 'Khả năng chi trả mỗi lần mua: mức độ người mua dễ dàng trả cho một lần mua, bất kể chi phí mỗi lần dùng.'),
  N('hh.retail-audit', 'Retail audit', 'business-processes', 'Measurement of sales, prices and availability in a sample of stores.', 'Kiểm tra bán lẻ (retail audit): đo lường doanh số, giá và mức sẵn có trong một mẫu cửa hàng.'),
  N('hh.like-for-like-comparison', 'Like-for-like comparison', 'business-processes', 'Comparing data with the same definitions, units and periods.', 'So sánh tương đương (like-for-like): so sánh dữ liệu có cùng định nghĩa, đơn vị và kỳ.'),

  // ---- 1.4 How the Vietnam Market Works
  N('hh.pack-ladder', 'Pack ladder', 'strategic', 'A range of pack sizes at different price points.', 'Bậc thang quy cách: dải kích cỡ gói ở các mức giá khác nhau.'),
  N('hh.drop-size', 'Drop size', 'financial-metrics', 'The value of an order delivered to one outlet in one visit.', 'Giá trị mỗi lần giao (drop size): giá trị đơn hàng giao cho một điểm bán trong một lượt ghé.'),
  N('hh.distributor', 'Distributor', 'institutions', 'A company that buys, stores and resells products to retailers in a territory.', 'Nhà phân phối: công ty mua, lưu kho và bán lại sản phẩm cho các nhà bán lẻ trong một khu vực.', { aliases: ['distributors'] }),
  N('hh.positioning', 'Positioning', 'strategic', 'The place a brand aims to hold in shoppers’ minds relative to rivals.', 'Định vị: vị trí thương hiệu muốn chiếm trong tâm trí người mua so với đối thủ.'),
  N('hh.price-fighter', 'Price fighter', 'strategic', 'A brand or product designed to compete on low price.', 'Sản phẩm cạnh tranh bằng giá (price fighter): thương hiệu hoặc sản phẩm được thiết kế để cạnh tranh bằng giá thấp.'),
  V('hh.extended-producer-responsibility', 'Extended producer responsibility', 'regulatory', 'A rule that makes producers and importers responsible for recycling their products or packaging. In Vietnam, Law 72/2020/QH14 Art. 54 and Decree 08/2022/ND-CP Art. 77 require producers and importers of listed products and packaging, including packaging of cosmetics and of detergents and household preparations, to recycle at mandatory rates or contribute to the Vietnam Environment Protection Fund, with packaging covered from 1 January 2024.', 'Trách nhiệm mở rộng của nhà sản xuất (EPR): quy định buộc nhà sản xuất, nhập khẩu sản phẩm, bao bì thuộc danh mục phải tái chế theo tỷ lệ và quy cách bắt buộc, hoặc đóng góp tài chính vào Quỹ Bảo vệ môi trường Việt Nam; bao bì của mỹ phẩm và của chất tẩy rửa, chế phẩm dùng trong gia dụng thuộc diện áp dụng, với bao bì áp dụng từ ngày 1/1/2024 (Điều 54 Luật 72/2020/QH14; Điều 77 Nghị định 08/2022/NĐ-CP).', ['hh-vn-law72', 'hh-vn-dec08'],
    { aliases: ['EPR'] }),
  V('hh.notification-receipt-number', 'Notification receipt number', 'regulatory', 'The number the competent authority issues when it accepts a cosmetic notification dossier; the product may be circulated only after it is issued, and it does not certify that the product is safe or effective (Circular 06/2011/TT-BYT Art. 2(4) and Art. 3(1)).', 'Số tiếp nhận Phiếu công bố: số do cơ quan quản lý cấp khi tiếp nhận hồ sơ công bố sản phẩm mỹ phẩm, bắt buộc có trước khi lưu hành; số này không chứng nhận sản phẩm an toàn, hiệu quả (khoản 4 Điều 2 và khoản 1 Điều 3 Thông tư 06/2011/TT-BYT).', ['hh-vn06'],
    { aliases: ['notification receipt numbers'] }),
  N('hh.compliance-cost', 'Compliance cost', 'financial-metrics', 'The cost of meeting legal requirements; for household products this includes approvals, labels and packaging responsibility.', 'Chi phí tuân thủ: chi phí để đáp ứng các yêu cầu pháp lý.', { aliases: ['compliance costs'] }),
  N('hh.trade-promotion', 'Trade promotion', 'business-processes', 'An incentive given to retailers or distributors to stock or push a product.', 'Khuyến mại thương mại: ưu đãi dành cho nhà bán lẻ hoặc nhà phân phối để họ nhập hoặc đẩy sản phẩm.', { aliases: ['trade promotions'] }),
  N('hh.consumer-promotion', 'Consumer promotion', 'business-processes', 'An incentive offered directly to shoppers, such as a discount or gift.', 'Khuyến mại tiêu dùng: ưu đãi trao trực tiếp cho người mua, như giảm giá hoặc quà tặng.', { aliases: ['consumer promotions'] }),
  N('hh.bonus-pack', 'Bonus pack', 'products-services', 'A pack offering extra product for the same price.', 'Gói tặng thêm (bonus pack): gói có thêm sản phẩm với cùng mức giá.', { aliases: ['bonus packs'] }),

  // ---- 1.5 What Drives Industry Change
  N('hh.demand-spike', 'Demand spike', 'essential-concepts', 'A sudden, temporary increase in demand.', 'Cú tăng cầu đột biến: mức tăng cầu đột ngột và tạm thời.'),
  N('hh.pantry-loading', 'Pantry loading', 'essential-concepts', 'Shoppers buying extra stock to keep at home.', 'Tích trữ tại nhà (pantry loading): người mua mua thêm hàng để dự trữ ở nhà.'),
  N('hh.specialist-cleaner', 'Specialist cleaner', 'products-services', 'A product for one cleaning task, such as a bathroom or kitchen cleaner.', 'Chất tẩy chuyên dụng: sản phẩm cho một việc làm sạch, như tẩy nhà tắm hoặc nhà bếp.', { aliases: ['specialist cleaners'] }),
  N('hh.input-cost-inflation', 'Input cost inflation', 'financial-metrics', 'Rising prices of raw materials and packaging.', 'Lạm phát chi phí đầu vào: giá nguyên liệu và bao bì tăng.'),
  N('hh.pricing-lag', 'Pricing lag', 'financial-metrics', 'The delay between cost increases and price increases.', 'Độ trễ giá: khoảng chậm giữa thời điểm chi phí tăng và thời điểm giá bán tăng.'),
  N('hh.pass-through', 'Pass-through', 'financial-metrics', 'The share of a cost change passed on to customers through prices.', 'Mức chuyển chi phí sang giá (pass-through): tỷ lệ thay đổi chi phí được chuyển sang khách hàng qua giá bán.'),
  R('hh.biodegradability', 'Biodegradability', 'essential-concepts', 'The ability of a substance to be broken down by microorganisms.', 'Khả năng phân hủy sinh học: khả năng một chất bị vi sinh vật phân hủy.', ['hh-eu-det'],
    'Regulation (EC) No 648/2004 Art. 2(7)-(8) defines primary biodegradation and ultimate aerobic biodegradation of surfactants and Annexes II-III set the test methods; the general term "biodegradability" is not defined as such.'),
  N('hh.refill-pouch', 'Refill pouch', 'products-services', 'A lighter pack used to refill a durable container.', 'Túi nạp lại (refill pouch): bao bì nhẹ hơn để nạp vào bình đựng bền dùng lại.', { aliases: ['refill pouches'] }),
  N('hh.multilayer-sachet', 'Multilayer sachet', 'products-services', 'A small pack made of bonded layers that is hard to recycle.', 'Gói nhỏ nhiều lớp: gói nhỏ làm từ các lớp dán chồng khó tái chế.'),
  N('hh.b2b-ordering-app', 'B2B ordering app', 'products-services', 'A digital platform that lets retailers order stock from suppliers.', 'Ứng dụng đặt hàng B2B: nền tảng số cho phép nhà bán lẻ đặt hàng từ nhà cung cấp.'),
  N('hh.subscription', 'Subscription', 'business-models', 'Regular repeat delivery of products for a recurring payment.', 'Đăng ký giao định kỳ (subscription): giao hàng lặp lại thường xuyên để đổi lấy khoản thanh toán định kỳ.'),
];

export const HH_M1_LESSONS: GlossaryLessonDef[] = [
    {
      key: '1.1', title: 'What the Industry Includes', module: 'How the Industry Works',
      chapters: {
        0: ['hh.home-care', 'hh.personal-hygiene', 'hh.absorbent-hygiene'],
        1: ['hh.cost-per-use', 'hh.functional-purchase', 'hh.boundary-category'],
        2: ['hh.germ-protection-claim'],
        3: ['hh.hazard-label', 'hh.disinfectant-preparation'],
        4: ['hh.household-penetration', 'hh.purchase-frequency', 'hh.household-panel'],
      },
      essential: ['hh.home-care', 'hh.personal-hygiene', 'hh.absorbent-hygiene', 'hh.disinfectant-preparation', 'hh.cost-per-use', 'hh.functional-purchase', 'hh.boundary-category', 'hh.germ-protection-claim', 'hh.hazard-label', 'hh.household-penetration', 'hh.purchase-frequency', 'hh.household-panel'],
    },
    {
      key: '1.2', title: 'How the Industry Evolved', module: 'How the Industry Works',
      chapters: {
        0: ['hh.surfactant', 'hh.synthetic-detergent'],
        1: ['hh.concentrate', 'hh.unit-dose', 'hh.price-per-kilogram'],
        2: ['hh.superabsorbent-polymer', 'hh.single-use-product'],
        3: ['fmcg.modern-trade', 'hh.bulk-pack'],
        4: ['hh.general-trade', 'hh.format-upgrade', 'hh.local-champion'],
      },
      essential: ['hh.surfactant', 'hh.concentrate', 'hh.unit-dose', 'hh.general-trade', 'hh.synthetic-detergent', 'hh.price-per-kilogram', 'hh.superabsorbent-polymer', 'hh.single-use-product', 'fmcg.modern-trade', 'hh.bulk-pack', 'hh.format-upgrade', 'hh.local-champion'],
    },
    {
      key: '1.3', title: 'How the Global Market Is Structured', module: 'How the Industry Works',
      chapters: {
        0: ['hh.value-density', 'hh.capital-intensity', 'hh.commodity-input'],
        1: ['hh.category-specialist', 'hh.private-label'],
        2: ['hh.economies-of-scale', 'hh.capacity-utilisation', 'hh.fixed-cost-absorption'],
        3: ['hh.sachet', 'hh.format-upgrade', 'hh.affordability-per-purchase'],
        4: ['hh.retail-audit', 'hh.like-for-like-comparison'],
      },
      essential: ['hh.value-density', 'hh.economies-of-scale', 'hh.sachet', 'hh.private-label', 'hh.capital-intensity', 'hh.commodity-input', 'hh.category-specialist', 'hh.capacity-utilisation', 'hh.fixed-cost-absorption', 'hh.format-upgrade', 'hh.affordability-per-purchase', 'hh.retail-audit', 'hh.like-for-like-comparison'],
    },
    {
      key: '1.4', title: 'How the Vietnam Market Works', module: 'How the Industry Works',
      chapters: {
        0: ['fmcg.value-seeking', 'hh.pack-ladder'],
        1: ['hh.drop-size', 'hh.distributor'],
        2: ['hh.positioning', 'hh.price-fighter'],
        3: ['hh.extended-producer-responsibility', 'hh.notification-receipt-number', 'hh.compliance-cost'],
        4: ['hh.trade-promotion', 'hh.consumer-promotion', 'hh.bonus-pack'],
      },
      essential: ['hh.extended-producer-responsibility', 'hh.notification-receipt-number', 'hh.pack-ladder', 'hh.drop-size', 'fmcg.value-seeking', 'hh.distributor', 'hh.positioning', 'hh.price-fighter', 'hh.compliance-cost', 'hh.trade-promotion', 'hh.consumer-promotion', 'hh.bonus-pack'],
    },
    {
      key: '1.5', title: 'What Drives Industry Change', module: 'How the Industry Works',
      chapters: {
        0: ['hh.demand-spike', 'hh.pantry-loading'],
        1: ['fmcg.premiumisation', 'hh.specialist-cleaner'],
        2: ['hh.input-cost-inflation', 'hh.pricing-lag', 'hh.pass-through'],
        3: ['hh.biodegradability', 'hh.refill-pouch', 'hh.multilayer-sachet'],
        4: ['hh.b2b-ordering-app', 'hh.subscription'],
      },
      essential: ['hh.input-cost-inflation', 'hh.pass-through', 'hh.biodegradability', 'fmcg.premiumisation', 'hh.demand-spike', 'hh.pantry-loading', 'hh.specialist-cleaner', 'hh.pricing-lag', 'hh.refill-pouch', 'hh.multilayer-sachet', 'hh.b2b-ordering-app', 'hh.subscription'],
    },
];
