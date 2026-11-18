import type { ReactNode } from 'react';

const NAVY = '#0b1f44';
const RED = '#dc2626';

type Mode = 'flow' | 'map' | 'timeline' | 'compare' | 'pestle';
interface VisualNode { label: string; detail: string; accent?: boolean; metric?: string }
interface VisualSpec { title: string; subtitle: string; takeaway: string; mode: Mode; nodes: VisualNode[]; note?: string }

function NodeCard({ node, index }: { node: VisualNode; index: number }) {
  return (
    <div className={`min-w-0 rounded-xl border p-3 ${node.accent ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}`}>
      <div className="flex items-start justify-between gap-2">
        <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[10px] font-black ${node.accent ? 'bg-red-600 text-white' : 'bg-slate-100 text-slate-600'}`}>{String(index + 1).padStart(2, '0')}</span>
        {node.metric ? <span className="text-sm font-black text-red-600">{node.metric}</span> : null}
      </div>
      <p className="mt-3 text-sm font-black leading-5" style={{ color: NAVY }}>{node.label}</p>
      <p className="mt-1 text-xs leading-5 text-slate-500">{node.detail}</p>
    </div>
  );
}

function LearningVisual({ spec }: { spec: VisualSpec }) {
  const grid = spec.mode === 'timeline' ? 'sm:grid-cols-2 lg:grid-cols-4' : spec.mode === 'pestle' ? 'sm:grid-cols-2 lg:grid-cols-3' : 'sm:grid-cols-2 lg:grid-cols-3';
  return (
    <div className="w-full rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-sm sm:p-6">
      <header className="border-b border-slate-200 pb-4">
        <p className="text-[10px] font-black uppercase tracking-[0.16em] text-red-600">Casemate · Packaged Food &amp; Confectionery</p>
        <h4 className="mt-2 text-xl font-black tracking-tight" style={{ color: NAVY }}>{spec.title}</h4>
        <p className="mt-1 text-sm leading-6 text-slate-500">{spec.subtitle}</p>
      </header>
      {spec.mode === 'flow' ? (
        <div className="mt-5 flex min-w-0 flex-col gap-2 lg:flex-row lg:items-stretch">
          {spec.nodes.map((node, index) => (
            <div key={node.label} className="contents">
              <div className="min-w-0 flex-1"><NodeCard node={node} index={index} /></div>
              {index < spec.nodes.length - 1 ? <div className="flex items-center justify-center text-lg font-black text-red-400"><span className="rotate-90 lg:rotate-0">→</span></div> : null}
            </div>
          ))}
        </div>
      ) : spec.mode === 'compare' ? (
        <div className="mt-5 overflow-x-auto">
          <div className="grid min-w-[620px] grid-cols-2 gap-3 lg:grid-cols-4">{spec.nodes.map((node, index) => <NodeCard key={node.label} node={node} index={index} />)}</div>
        </div>
      ) : (
        <div className={`mt-5 grid gap-3 ${grid}`}>{spec.nodes.map((node, index) => <NodeCard key={node.label} node={node} index={index} />)}</div>
      )}
      <p className="mt-5 rounded-xl bg-red-600 px-4 py-3 text-sm font-semibold leading-6 text-white"><span className="font-black">Key takeaway: </span>{spec.takeaway}</p>
      {spec.note ? <p className="mt-3 text-[11px] leading-5 text-slate-500"><span className="font-bold text-slate-700">Evidence note: </span>{spec.note}</p> : null}
    </div>
  );
}

const SPECS: Record<string, VisualSpec> = {
  'packaged-food-m1-11-1-industry': {
    mode: 'flow', title: 'From agricultural input to branded pack', subtitle: 'The system that converts perishable food into standardised, distributable products.',
    nodes: [
      { label: 'Ingredients', detail: 'Cocoa, sugar, flour, oils, dairy inputs and flavours.' },
      { label: 'Processing', detail: 'Heat, mixing, forming and preservation create consistent products.', accent: true },
      { label: 'Packaging', detail: 'Sealed packs protect safety, shelf life and brand information.' },
      { label: 'Route to market', detail: 'Distributors, retailers, e-commerce and foodservice reach buyers.' },
      { label: 'Consumption', detail: 'Frequent use, snacks, meals, treats and gifts.' },
    ], takeaway: 'Packaging and processing turn variable agricultural inputs into repeatable FMCG products.'
  },
  'packaged-food-m1-11-2-traits': {
    mode: 'map', title: 'Seven traits that shape competition', subtitle: 'Why packaged food behaves differently from fresh food and durable goods.',
    nodes: [
      { label: 'Shelf life', detail: 'Preservation extends selling time and geographic reach.', accent: true },
      { label: 'Food safety', detail: 'Every batch must meet composition, hygiene and labelling rules.' },
      { label: 'Convenience', detail: 'Ready formats save preparation time.' },
      { label: 'Consistency', detail: 'Consumers expect the same taste and texture every purchase.' },
      { label: 'Frequency', detail: 'Low unit prices support repeat buying.' },
      { label: 'Brand and scale', detail: 'Trust, distribution and large runs create the moat.' },
    ], takeaway: 'The product must be safe and consistent; the business must be available, trusted and efficient.'
  },
  'packaged-food-m1-11-3-boundaries': {
    mode: 'compare', title: 'Draw the boundary before sizing the market', subtitle: 'Core packaged food on one side; adjacent categories kept separate on the other.',
    nodes: [
      { label: 'Core packaged foods', detail: 'Shelf-stable branded foods, biscuits, confectionery and savoury snacks.', accent: true },
      { label: 'Fresh and loose food', detail: 'Unpackaged produce, fresh meat and home-prepared meals sit outside.' },
      { label: 'Usually separate', detail: 'Dairy, beverages, instant noodles and bakery may appear in broad vendor totals but need separate labels.' },
      { label: 'Foodservice boundary', detail: 'Packaged products sold to restaurants are in; meals prepared by restaurants are not the same market.' },
    ], takeaway: 'A broad packaged-food total cannot be compared directly with a narrow confectionery or snack estimate.'
  },
  'packaged-food-m1-11-4-categories': {
    mode: 'map', title: 'A category map with non-interchangeable branches', subtitle: 'Trade classification helps prevent chocolate, candy, biscuits and snacks from being double-counted.',
    nodes: [
      { label: 'Chocolate confectionery', detail: 'Cocoa-containing bars, pralines and other preparations; HS 1806.', accent: true },
      { label: 'Sugar confectionery', detail: 'Non-cocoa sweets, gums, jellies, toffees and caramels; HS 1704.' },
      { label: 'Biscuits and cookies', detail: 'Cereal and bakery preparations; HS 1905.' },
      { label: 'Savoury snacks', detail: 'Chips, crackers and extruded snacks; a distinct commercial family.' },
      { label: 'Other packaged foods', detail: 'Ready meals, sauces, frozen foods and processed meats.' },
    ], takeaway: 'Category definitions overlap across commercial reports, so keep each estimate attached to its own boundary.', note: 'HS labels are from a third-party reference reflecting standard WCO nomenclature, not an official WCO publication.'
  },
  'packaged-food-m1-11-5-customers': {
    mode: 'flow', title: 'Five customers, one purchase system', subtitle: 'The consumer eats the product, but several business customers decide whether it reaches the shelf.',
    nodes: [
      { label: 'Manufacturer', detail: 'Builds the product, pack, brand and commercial plan.' },
      { label: 'Wholesaler / distributor', detail: 'Carries stock, breaks bulk and extends reach.' },
      { label: 'Retail buyer', detail: 'Chooses assortment, shelf position and promotions.', accent: true },
      { label: 'Shopper', detail: 'Pays and chooses for a household or occasion.' },
      { label: 'Consumer', detail: 'Uses the product; may not be the shopper.' },
    ], takeaway: 'Winning requires a product consumers want and a proposition the trade is willing to stock.'
  },
  'packaged-food-m1-12-1-preservation': {
    mode: 'timeline', title: 'Preservation came before the package', subtitle: 'Long before brands, people learned to slow spoilage.',
    nodes: [
      { label: 'Ancient methods', detail: 'Drying, salting, smoking, fermenting and sugaring preserved seasonal food.' },
      { label: '1804–1810', detail: 'Appert developed heat preservation in sealed containers and opened a cannery.', accent: true },
      { label: '1810', detail: 'Durand patented the tin can, supporting industrial canning.' },
      { label: '1860s', detail: 'Pasteur linked microbes and heat treatment, strengthening food-safety science.' },
    ], takeaway: 'Preservation lowered spoilage; sealed packaging made the result movable and saleable.', note: 'The PubMed source supports Appert. Durand and Pasteur dates are corroborating secondary history.'
  },
  'packaged-food-m1-12-2-industrialisation': {
    mode: 'timeline', title: 'How confectionery became industrial', subtitle: 'Process inventions created smoother products and repeatable mass brands.',
    nodes: [
      { label: '1875', detail: 'Daniel Peter and Nestlé commercialised milk chocolate.' },
      { label: '1879', detail: 'Rodolphe Lindt developed conching for smoother chocolate.', accent: true },
      { label: 'Early 1900s', detail: 'Cadbury, Fry, Hershey and Mars scaled branded confectionery.' },
      { label: '1920s–1929', detail: 'Birdseye flash-freezing opened a modern frozen-food category.' },
    ], takeaway: 'Industrial processes changed texture, consistency, capacity and the distance food could travel.', note: 'Milk-chocolate, conching and Birdseye dates are corroborating secondary history within the research record.'
  },
  'packaged-food-m1-12-3-packaging': {
    mode: 'timeline', title: 'Packaging innovations that expanded the market', subtitle: 'Each format solved a different shelf-life or logistics problem.',
    nodes: [
      { label: '1950s–60s', detail: 'Retort pouches enabled shelf-stable prepared meals.' },
      { label: '1951 onward', detail: 'Tetra Pak and aseptic systems expanded ambient distribution.', accent: true },
      { label: '1970s–80s', detail: 'Modified-atmosphere packaging scaled for chilled and snack foods.' },
      { label: 'Today', detail: 'Barrier films, resealability and recyclability shape pack design.' },
    ], takeaway: 'Packaging is part of the product: it determines protection, convenience, information and logistics.', note: 'The exact first commercial year for Tetra Brik Aseptic remains unresolved in the research; the 1960s is used as the supported range.'
  },
  'packaged-food-m1-12-4-vietnam': {
    mode: 'timeline', title: "Vietnam's path from traditional sweets to scale", subtitle: 'Policy reform, domestic entrepreneurship and multinational capital reshaped the market.',
    nodes: [
      { label: 'Before 1986', detail: 'Traditional mứt, bánh kẹo and mooncakes coexisted with state-owned makers.' },
      { label: '1986', detail: 'Đổi Mới opened the economy to private growth and foreign investment.', accent: true },
      { label: '1993–2005', detail: 'Kinh Do, Bibica and Orion Food Vina expanded modern branded production.' },
      { label: '2014–2015', detail: 'Mondelez bought 80% of Kinh Do confectionery; Mondelez Kinh Do followed.' },
    ], takeaway: 'Vietnam moved from local tradition and state production to domestic scale and multinational ownership.'
  },
  'packaged-food-m1-13-1-global': {
    mode: 'map', title: 'One broad market, many nested categories', subtitle: 'A hierarchy for reading global market estimates without mixing definitions.',
    nodes: [
      { label: 'Broad packaged food', detail: 'Commercial estimate: ~US$3,730bn in 2025.', metric: '$3,730bn', accent: true },
      { label: 'Confectionery + snacks', detail: 'Broad overlapping aggregate: ~US$586.3bn in 2024.', metric: '$586.3bn' },
      { label: 'Chocolate confectionery', detail: 'Narrow 2025 estimate ~US$140.15bn; broader boundary ~US$173.20bn.', metric: '$140–173bn' },
      { label: 'Sugar confectionery', detail: 'Commercial 2025 estimate ~US$58bn.', metric: '$58bn' },
    ], takeaway: 'These values are commercial estimates with different boundaries; they are not parts of one clean additive total.', note: 'No official FAO or UN global packaged-food market-value series was verified.'
  },
  'packaged-food-m1-13-2-size': {
    mode: 'compare', title: 'Scale and growth: read the denominator', subtitle: 'The broad packaged-food estimate and narrower category estimates answer different questions.',
    nodes: [
      { label: '2025 broad base', detail: 'Packaged food across many categories.', metric: '~US$3,730bn', accent: true },
      { label: '2032 broad forecast', detail: 'Same vendor scope projected forward.', metric: '~US$5,080bn' },
      { label: '2025–2032 CAGR', detail: 'Vendor forecast for the broad category.', metric: '~4.5%' },
      { label: 'Evidence quality', detail: 'Paid/commercial market research, not official statistics.', metric: 'Commercial' },
    ], takeaway: 'A growth rate is meaningful only when the category definition, geography and period stay constant.'
  },
  'packaged-food-m1-13-3-patterns': {
    mode: 'map', title: 'How category and occasion shape consumption', subtitle: 'A practical segmentation framework, not a market-share chart.',
    nodes: [
      { label: 'Everyday fuel', detail: 'Biscuits, crackers and convenient foods compete on value and availability.' },
      { label: 'Treat and indulgence', detail: 'Chocolate and candy compete on taste, brand and impulse.', accent: true },
      { label: 'Social and gifting', detail: 'Premium packs and seasonal confectionery carry symbolic value.' },
      { label: 'Health-managed snacking', detail: 'Portion control, lower sugar and ingredient claims reshape choice.' },
      { label: 'Local taste', detail: 'Flavours, textures and pack sizes adapt by market.' },
    ], takeaway: 'Consumption patterns differ by need state, not simply by product label.'
  },
  'packaged-food-m1-13-4-markets': {
    mode: 'compare', title: 'Mature value pools and emerging growth engines', subtitle: 'Where production and consumption strength come from.',
    nodes: [
      { label: 'North America', detail: 'Large mature value pool; premiumisation and health repositioning support growth.' },
      { label: 'Europe', detail: 'Established brands, manufacturing and high per-capita consumption.' },
      { label: 'Asia-Pacific', detail: 'Fastest-growing region in the research, supported by urbanisation and income.', accent: true },
      { label: 'Emerging markets', detail: 'Volume growth comes with price sensitivity and local route-to-market complexity.' },
    ], takeaway: 'Mature markets defend value; Asia-Pacific supplies much of the volume-growth story.'
  },
  'packaged-food-m1-13-5-trade': {
    mode: 'flow', title: 'The trade system behind a chocolate bar', subtitle: 'Commodity inputs move under different HS chapters before becoming finished products.',
    nodes: [
      { label: 'Cocoa origin', detail: 'Beans and cocoa inputs enter global commodity trade.' },
      { label: 'Ingredient conversion', detail: 'Cocoa, sugar, dairy and oils are processed and priced.' },
      { label: 'Manufacturing', detail: 'Recipes, quality control and packaging create branded SKUs.', accent: true },
      { label: 'Customs classification', detail: 'HS 17 sugar confectionery; HS 18 cocoa/chocolate; HS 19 bakery.' },
      { label: 'Market sale', detail: 'Duties, freight, currency and retail execution shape the shelf price.' },
    ], takeaway: 'Commodity shocks travel through cost, price, pack size and margin decisions.'
  },
  'packaged-food-m1-14-1-glance': {
    mode: 'compare', title: "Vietnam's confectionery market at a glance", subtitle: 'A source-specific 2025 forecast, clearly separated from broader packaged food.',
    nodes: [
      { label: 'Market value', detail: 'Nielsen forecast reported by VnExpress.', metric: '~VND66tn', accent: true },
      { label: 'Growth period', detail: 'Commercial forecast for 2020–2025.', metric: '~7% p.a.' },
      { label: 'Per capita', detail: '2022 confectionery consumption in Vietnam.', metric: '~2kg' },
      { label: 'Global comparison', detail: 'Comparable global average reported by the same source.', metric: '~3kg' },
    ], takeaway: 'The figures suggest headroom, but remain commercial/industry estimates rather than GSO statistics.', note: 'No official Vietnam GSO or Customs packaged-food/confectionery market-size series was verified.'
  },
  'packaged-food-m1-14-2-demand': {
    mode: 'map', title: 'What moves demand in Vietnam', subtitle: 'Demand follows income, convenience, culture and occasion.',
    nodes: [
      { label: 'Young consumers', detail: 'Snacking and on-the-go formats fit changing routines.' },
      { label: 'Rising income', detail: 'Supports branded, premium and gifting purchases.' },
      { label: 'Tết', detail: 'Gift boxes concentrate demand into a short selling window.', accent: true },
      { label: 'Mid-Autumn', detail: 'Mooncakes create another major seasonal production and retail peak.' },
      { label: 'Price sensitivity', detail: 'Value packs and local taste remain decisive outside premium occasions.' },
    ], takeaway: 'Annual demand planning must treat Tết and Mid-Autumn as operational events, not just marketing moments.'
  },
  'packaged-food-m1-14-3-production': {
    mode: 'flow', title: 'How Vietnam manufactures packaged food', subtitle: 'Local production combines imported commodities, domestic labour and dense distribution.',
    nodes: [
      { label: 'Ingredients', detail: 'Sugar, flour, cocoa, oils and dairy inputs; some exposed to world prices.' },
      { label: 'Factories', detail: 'Mixing, baking, forming, cooling and packaging at scale.', accent: true },
      { label: 'Quality gate', detail: 'Food safety, batch control and labelling before release.' },
      { label: 'Warehousing', detail: 'Ambient storage supports national reach; freshness still matters.' },
      { label: 'Channels', detail: 'Traditional trade, modern trade and e-commerce.' },
    ], takeaway: 'Local manufacturing lowers distance to market, but imported-input exposure still links margins to global commodities.'
  },
  'packaged-food-m1-14-4-companies': {
    mode: 'compare', title: 'Four competitive positions in Vietnam', subtitle: 'Scale, heritage and category focus differ by company.',
    nodes: [
      { label: 'Orion Food Vina', detail: '>US$400m revenue in 2022; ChocoPie ~66% of the pie segment.', metric: '>US$400m', accent: true },
      { label: 'Mondelez Kinh Do', detail: 'MNC-owned heritage platform spanning biscuits, chocolate and seasonal products.' },
      { label: 'Bibica', detail: 'Domestic confectioner; about VND1.6tn revenue in 2022.', metric: '~VND1.6tn' },
      { label: 'Hai Ha', detail: 'Domestic confectioner; about VND1.5tn revenue in 2022.', metric: '~VND1.5tn' },
    ], takeaway: 'Players win through different combinations of scale, distribution, brand heritage, local taste and price.'
  },
  'packaged-food-m1-14-5-distribution': {
    mode: 'flow', title: "Vietnam's route-to-market ecosystem", subtitle: 'A pack may pass through several hands before reaching the shopper.',
    nodes: [
      { label: 'Manufacturer', detail: 'Plans production, pricing, packs and seasonal inventory.' },
      { label: 'Distributor', detail: 'Extends coverage and credit into fragmented outlets.' },
      { label: 'Traditional trade', detail: 'Neighbourhood stores remain essential for reach.', accent: true },
      { label: 'Modern and online', detail: 'Chains and e-commerce grow visibility, data and convenience.' },
      { label: 'Shopper occasion', detail: 'Impulse, household stock-up, gifting or foodservice.' },
    ], takeaway: 'Distribution breadth and seasonal execution are strategic capabilities in Vietnam.'
  },
  'packaged-food-m1-15-1-economic': {
    mode: 'pestle', title: 'Economic drivers and margin pressure', subtitle: 'Demand and cost can move in opposite directions.',
    nodes: [
      { label: 'Income and urbanisation', detail: 'Expand branded-food demand and convenience occasions.', accent: true },
      { label: 'Inflation', detail: 'Forces trade-down, smaller packs and promotion sensitivity.' },
      { label: 'Cocoa', detail: 'Record 2024 inflation pressured chocolate margins.' },
      { label: 'Other commodities', detail: 'Sugar, dairy, edible oils and wheat affect different categories.' },
      { label: 'Currency and freight', detail: 'Imported inputs translate global shocks into local cost.' },
    ], takeaway: 'Growth depends on household demand; profitability depends on managing volatile input costs.'
  },
  'packaged-food-m1-15-2-regulation': {
    mode: 'flow', title: 'From standard to compliant pack', subtitle: 'Food safety and labelling work as a chain of controls.',
    nodes: [
      { label: 'Codex reference', detail: 'International standards protect health and support fair food trade.' },
      { label: 'Vietnam law', detail: 'Food Safety Law 2010 and MOH/VFA establish the domestic compliance floor.', accent: true },
      { label: 'Factory controls', detail: 'Specifications, hygiene, testing and traceability.' },
      { label: 'Pack information', detail: 'Composition, allergens, nutrition and claims must be accurate.' },
      { label: 'Market surveillance', detail: 'Authorities and customers respond to failures and recalls.' },
    ], takeaway: 'Compliance is designed into product and process; it cannot be added after production.'
  },
  'packaged-food-m1-15-3-social': {
    mode: 'compare', title: 'Four social forces pulling the portfolio', subtitle: 'Health concerns and indulgence coexist rather than replacing each other.',
    nodes: [
      { label: 'Health and wellness', detail: 'Lower sugar, portion control and clearer ingredients shape reformulation.' },
      { label: 'Convenient snacking', detail: 'Portable, ready formats fit urban routines.', accent: true },
      { label: 'Premiumisation', detail: 'Consumers trade up for quality, origin, gifting and experience.' },
      { label: 'Cultural occasions', detail: 'Tết and Mid-Autumn sustain gifting and seasonal ranges.' },
    ], takeaway: 'A resilient portfolio serves both everyday value and controlled indulgence.'
  },
  'packaged-food-m1-15-4-technology': {
    mode: 'flow', title: 'Where technology changes the economics', subtitle: 'Technology links formulation, factory control, packaging and demand planning.',
    nodes: [
      { label: 'Product R&D', detail: 'Reformulation balances taste, texture, sugar and shelf life.' },
      { label: 'Automation', detail: 'High-speed lines improve consistency and throughput.', accent: true },
      { label: 'Quality systems', detail: 'Sensors and batch records help detect variation earlier.' },
      { label: 'Packaging', detail: 'Barrier performance, portioning and resealability extend usability.' },
      { label: 'Digital demand', detail: 'Forecasting and e-commerce data improve assortment and inventory.' },
    ], takeaway: 'Technology creates value when it improves safety, consistency, speed or a real consumer need.'
  },
  'packaged-food-m1-15-5-sustainability': {
    mode: 'pestle', title: 'The sustainability pressure map', subtitle: 'Packaging and cocoa sourcing put environmental issues inside the operating model.',
    nodes: [
      { label: 'Packaging waste', detail: 'Less material, recyclability and collection systems shape design.', accent: true },
      { label: 'Cocoa deforestation', detail: 'Traceability and due diligence raise sourcing requirements.' },
      { label: 'Energy and emissions', detail: 'Factories face efficiency and decarbonisation targets.' },
      { label: 'Water', detail: 'Processing and cleaning require responsible use and treatment.' },
      { label: 'Supplier livelihoods', detail: 'Long-term cocoa resilience depends on farmer economics.' },
      { label: 'Measured response', detail: 'Mondelez reported ~90% Cocoa Life cocoa, ~96% recyclable packaging and ~38% manufacturing-emissions reduction vs 2018 in 2024.' },
    ], takeaway: 'Sustainability is now a sourcing, packaging, compliance and cost question—not a separate communications topic.'
  },
};

export function renderPackagedFoodM1Visual(kind: string): ReactNode {
  const spec = SPECS[kind];
  return spec ? <LearningVisual spec={spec} /> : null;
}
