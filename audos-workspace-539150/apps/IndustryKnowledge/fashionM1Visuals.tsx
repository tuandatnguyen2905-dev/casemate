import type { FashionModule01VisualKind } from './fashionM1Core';
import { VisualView, restyleRows } from './fashionVisualKit';
import type { RowsStyle } from './fashionVisualKit';

interface VisualRow { label: string; a: string; b: string }
interface VisualSpec {
  title: string;
  kicker: string;
  headers: [string, string, string];
  rows: VisualRow[];
  takeaway: string;
}

const VISUALS: Record<string, VisualSpec> = {
  'fashion-m1-11-segments': {
    title: 'Three segments, three buying logics',
    kicker: 'Industry scope and boundaries',
    headers: ['Segment', 'Core products', 'What the buyer weighs'],
    rows: [
      { label: 'Fashion', a: 'Clothing, footwear, handbags, accessories', b: 'Design, fit, quality, price, brand image, trend fit' },
      { label: 'Sports', a: 'Sportswear, running and athletic footwear, training and outdoor gear', b: 'Performance, durability, comfort, functionality' },
      { label: 'Lifestyle', a: 'Travel accessories, personal-use items, active-living products', b: 'Design, portability, practicality, fit with daily routine' },
      { label: 'Convergence', a: 'Athleisure and sports-inspired everyday apparel', b: 'One product serving both athletic and everyday use' },
    ],
    takeaway: 'The three segments share channels and customers but differ in purchase motivation, product requirements and competitive dynamics.',
  },
  'fashion-m1-12-channels': {
    title: 'Customers and the channels that reach them',
    kicker: 'Segmentation meets route to market',
    headers: ['Channel', 'What the retailer controls', 'Where it earns its place'],
    rows: [
      { label: 'Brand-owned stores', a: 'Product presentation, service, full shopping experience', b: 'Brand expression and first-party customer relationship' },
      { label: 'Multi-brand & specialty', a: 'Assortment breadth or category depth', b: 'Choice across labels, or expertise in footwear, sportswear, outdoor' },
      { label: 'E-commerce & social', a: 'Listings, content, livestream and marketplace presence', b: 'Accessibility, discovery and digital engagement' },
      { label: 'Omnichannel', a: 'Shared inventory, pricing, information and service', b: 'Consistency across however the customer chooses to shop' },
    ],
    takeaway: 'Channel choice follows the customer: who buys, what motivates them, and where they prefer to discover, evaluate and purchase.',
  },
  'fashion-m1-21-eras': {
    title: 'From local craft to global brands',
    kicker: 'Four development eras',
    headers: ['Era', 'How product was made and sold', 'What competition rewarded'],
    rows: [
      { label: 'Traditional retail', a: 'Local artisans and small makers, sold through markets and local shops', b: 'Durability, price and practical functionality' },
      { label: 'Industrialisation', a: 'Mass production into specialty stores, department stores and malls', b: 'Availability plus a recognisable brand identity' },
      { label: 'Globalisation', a: 'International sourcing and distributed manufacturing networks', b: 'Larger addressable markets and managed production cost' },
      { label: 'Fast fashion', a: 'Short development cycles, frequent launches, broad assortments', b: 'Speed of response to changing trends' },
    ],
    takeaway: 'Scale and sourcing efficiency raised the floor; brand differentiation became the way retailers competed above it.',
  },
  'fashion-m1-22-digital': {
    title: 'The connected retail model',
    kicker: 'Digital and physical as one system',
    headers: ['Capability', 'What it changes', 'What it depends on'],
    rows: [
      { label: 'E-commerce', a: 'Consumers compare product, price, reviews and brands without a store visit', b: 'Listing quality, fulfilment and returns handling' },
      { label: 'Social commerce', a: 'KOLs, KOCs, livestreams and user content drive discovery and purchase', b: 'Credible creators and consistent price and stock data' },
      { label: 'Omnichannel', a: 'Inventory, promotions, payment and service coordinated across channels', b: 'Accurate shared stock and customer records' },
      { label: 'AI & personalisation', a: 'Recommendations, demand forecasting, segmentation, inventory planning', b: 'Data quality, implementation and customer acceptance' },
    ],
    takeaway: 'Digital widened access and made data central, but physical stores still carry product trial and service.',
  },
  'fashion-m1-31-market': {
    title: 'Apparel and sportswear: two estimates, one caution',
    kicker: 'Supplied research estimates',
    headers: ['Measure', 'Supplied estimate', 'How to read it'],
    rows: [
      { label: 'Global apparel, 2025', a: 'About USD 1,749.7 billion', b: 'Fortune Business Insights estimate; check the category definition' },
      { label: 'Global apparel, 2034', a: 'Potentially USD 2,307 billion, 3.52% CAGR', b: 'A projection, not a committed outcome' },
      { label: 'Global sportswear, 2025', a: 'About USD 399.4 billion, 10.7% CAGR to 2033', b: 'Grand View Research estimate on a different methodology' },
      { label: 'Comparison rule', a: 'Do not add sportswear to apparel', b: 'Sportswear may already sit inside the apparel total' },
    ],
    takeaway: 'Sportswear is projected to grow faster than apparel overall, but the two estimates are not on a consistent, consolidated basis.',
  },
  'fashion-m1-32-global': {
    title: 'Where the industry makes and where it sells',
    kicker: 'Global supply and demand map',
    headers: ['Layer', 'Who', 'What it means for competitiveness'],
    rows: [
      { label: 'Consumer regions', a: 'North America, Europe, Asia-Pacific', b: 'Relative weight shifts by category, spending and measurement method' },
      { label: 'Manufacturing hubs', a: 'China, Bangladesh, Vietnam, India, Türkiye', b: 'Access to capability and cost, with lead-time and trade exposure' },
      { label: 'International brands', a: 'Nike, Adidas, Inditex/Zara, H&M, Uniqlo, Lululemon', b: 'Different mixes of design, price, performance and speed' },
      { label: 'Supply chain', a: 'Sourcing partners, logistics, trade conditions', b: 'Flexibility against freight cost, supplier and lead-time risk' },
    ],
    takeaway: 'Winning globally means balancing sourcing efficiency, brand differentiation and local market responsiveness at the same time.',
  },
  'fashion-m1-41-vietnam': {
    title: 'Vietnam: separate the totals before you use them',
    kicker: 'Market size and demand',
    headers: ['Measure', 'Supplied estimate', 'What it does and does not cover'],
    rows: [
      { label: 'Total retail, 2025', a: 'About USD 269 billion, up roughly 9–10% on 2024', b: 'All goods and consumer services, not fashion and sports alone' },
      { label: 'Apparel, 2025', a: 'About USD 7.52 billion', b: 'Ken Research definition; not an official national statistic' },
      { label: 'Apparel, 2031', a: 'Potentially USD 11.14 billion, 6.8% CAGR', b: 'A projection dependent on the report methodology' },
      { label: 'Scope rule', a: 'Never read total retail as category demand', b: 'The gap between the two figures is roughly 36 times' },
    ],
    takeaway: 'Vietnam supports both mass-market and higher-value positioning, but category demand must be sized separately from total retail spend.',
  },
  'fashion-m1-42-channels': {
    title: 'Vietnam channels, cities and supply base',
    kicker: 'Distribution and production',
    headers: ['Element', 'Position', 'Analytical caution'],
    rows: [
      { label: 'Channel mix', a: 'Traditional stores, specialty retail, malls, brand sites, marketplaces', b: 'Weight varies by segment, positioning and category' },
      { label: 'E-commerce', a: 'About USD 32 billion in 2025, near 12% of total retail', b: 'Definition and measurement scope need verification' },
      { label: 'Consumption centres', a: 'Hanoi and Ho Chi Minh City, then Da Nang and Hai Phong', b: 'Industrial areas and secondary cities favour everyday value' },
      { label: 'Manufacturing base', a: 'Substantial textile, garment and footwear capacity for export', b: 'Export output is not domestic retail sales' },
    ],
    takeaway: 'Vietnam is both a production base and a consumer market; treating the two as one overstates the size of domestic retail.',
  },
  'fashion-m1-51-forces': {
    title: 'Four external forces on retail performance',
    kicker: 'Economic, political, social, competitive',
    headers: ['Force', 'What moves', 'Where it lands commercially'],
    rows: [
      { label: 'Economic', a: 'Disposable income, inflation, exchange rates, rent, logistics', b: 'Demand on one side, operating margin on the other' },
      { label: 'Political & legal', a: 'Tariffs, rules of origin, IP, advertising, e-commerce rules', b: 'Sourcing cost, market entry and what may be sold or claimed' },
      { label: 'Social', a: 'Identity, social trends, convenience, health and fitness', b: 'Assortment and positioning, tempered by price sensitivity' },
      { label: 'Competitive', a: 'Global brands, local labels, fast fashion, unbranded and counterfeit goods', b: 'Promotional depth and the limit on realised price' },
    ],
    takeaway: 'Retailers face demand-side change and cost-side pressure together; pricing, assortment and sourcing must answer both.',
  },
  'fashion-m1-52-tech': {
    title: 'Technology and sustainability: value depends on delivery',
    kicker: 'Opportunity against its precondition',
    headers: ['Initiative', 'Opportunity', 'Condition for real value'],
    rows: [
      { label: 'AI & forecasting', a: 'Demand forecasting, assortment planning, inventory allocation', b: 'Clean sales history and acted-upon output' },
      { label: 'Personalisation', a: 'Recommendations, segmentation, campaign measurement', b: 'Consent, privacy and appropriate data handling' },
      { label: 'Sustainability', a: 'Material choice, waste reduction, longer product life', b: 'Measurable results rather than marketing language' },
      { label: 'Circular models', a: 'Repair, resale, reuse and take-back programmes', b: 'Collection systems, operating cost and customer participation' },
    ],
    takeaway: 'Both technology and sustainability need investment, skills, supplier coordination and measurement before they create advantage.',
  },
};

function DataTable({ spec }: { spec: VisualSpec }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
      <p className="text-[10px] font-black uppercase tracking-[0.16em] text-red-600">Casemate · Industry Knowledge</p>
      <h3 className="mt-2 text-lg font-black leading-snug text-slate-900 sm:text-xl">{spec.title}</h3>
      <p className="mt-1 text-xs font-semibold text-slate-500">{spec.kicker}</p>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse text-left">
          <thead>
            <tr className="bg-red-600 text-white">
              {spec.headers.map((heading) => (
                <th key={heading} className="px-3 py-2.5 text-[11px] font-black uppercase tracking-[0.08em] first:rounded-l-lg last:rounded-r-lg">
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {spec.rows.map((row, index) => (
              <tr key={row.label} className={index % 2 === 1 ? 'bg-slate-50' : 'bg-white'}>
                <td className="border-b border-slate-100 px-3 py-3 align-top text-xs font-black text-slate-900">{row.label}</td>
                <td className="border-b border-slate-100 px-3 py-3 align-top text-xs leading-5 text-slate-600">{row.a}</td>
                <td className="border-b border-slate-100 px-3 py-3 align-top text-xs font-semibold leading-5 text-red-600">{row.b}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 rounded-xl bg-red-600 px-4 py-3 text-xs font-semibold leading-5 text-white">
        <span className="font-black">Key takeaway: </span>{spec.takeaway}
      </div>
    </div>
  );
}

const STYLES: Record<string, RowsStyle> = {
  'fashion-m1-11-segments': { layout: 'mindmap', center: 'Fashion, sports & lifestyle', centerSub: 'Three segments, one convergence' },
  'fashion-m1-12-channels': { layout: 'cards' },
  'fashion-m1-21-eras': { layout: 'steps', note: 'Scale and sourcing raised the floor; brand differentiation became the way to compete above it.' },
  'fashion-m1-22-digital': { layout: 'mindmap', center: 'Connected retail', centerSub: 'Digital and physical as one system' },
  'fashion-m1-32-global': { layout: 'cards' },
  'fashion-m1-41-vietnam': { layout: 'cards' },
  'fashion-m1-42-channels': { layout: 'mindmap', center: 'Vietnam retail', centerSub: 'Consumer market and production base' },
  'fashion-m1-51-forces': { layout: 'mindmap', center: 'External forces', centerSub: 'Demand and cost together' },
  'fashion-m1-52-tech': { layout: 'compare' },
};

export function renderFashionModule01Visual(kind: FashionModule01VisualKind) {
  const spec = VISUALS[kind];
  if (!spec) return null;
  const style = STYLES[kind];
  return style ? <VisualView spec={restyleRows(spec, style)} /> : <DataTable spec={spec} />;
}
