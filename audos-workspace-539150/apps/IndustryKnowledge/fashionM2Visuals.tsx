import type { FashionModule02VisualKind } from './fashionM2Core';
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
  'fashion-m2-11-participants': {
    title: 'Who does what in the chain',
    kicker: 'Value chain structure and participants',
    headers: ['Participant', 'What they contribute', 'What they control'],
    rows: [
      { label: 'Raw material suppliers', a: 'Cotton, polyester, leather, rubber, recycled fibres, textiles, packaging', b: 'Input availability, price and material quality' },
      { label: 'Designers & developers', a: 'Market insight turned into designs, specifications, prototypes, collections', b: 'What the product is and what it costs to make' },
      { label: 'Manufacturers', a: 'Conversion of materials into finished apparel, footwear, accessories, equipment', b: 'Production capacity, efficiency and build quality' },
      { label: 'Brand owners', a: 'Positioning, merchandising, standards, pricing, marketing, supplier relationships', b: 'Brand meaning and the margin it supports' },
      { label: 'Logistics providers', a: 'Transport, warehousing, inventory handling, order fulfilment, delivery', b: 'Availability, delivery reliability and landed cost' },
      { label: 'Retailers & platforms', a: 'Owned stores, multi-brand retail, malls, marketplaces, social commerce', b: 'Customer access and the realised price' },
      { label: 'End consumers', a: 'Demand, reviews, returns and repeat purchase', b: 'Which products survive into the next season' },
    ],
    takeaway: 'Value creation is distributed across every stage, so advantage comes from coordinating the chain rather than owning any single link.',
  },
  'fashion-m2-12-flows': {
    title: 'Four flows moving through one chain',
    kicker: 'Product, information, financial and service flows',
    headers: ['Flow', 'Direction of travel', 'What breaks when it fails'],
    rows: [
      { label: 'Physical product', a: 'Materials to factories, finished goods to warehouses, then stores and customers', b: 'Shortages in one location and excess stock in another' },
      { label: 'Information', a: 'Demand, specifications, inventory, orders and feedback, in every direction', b: 'Forecasts drift and allocation goes to the wrong doors' },
      { label: 'Financial', a: 'Payments between retailers, distributors, brands, manufacturers and suppliers', b: 'Supplier capacity is withheld and lead times stretch' },
      { label: 'Service', a: 'Design support, inspection, transport, merchandising, service and repair', b: 'Product arrives correct but the experience around it does not' },
      { label: 'Demand feedback', a: 'Sales reports, reviews, social engagement, return reasons, enquiries', b: 'The next buy repeats the mistakes of the last one' },
      { label: 'Digital integration', a: 'ERP, PLM, WMS and OMS connecting the operational stages', b: 'Each function optimises locally and the chain loses visibility' },
    ],
    takeaway: 'Product movement and information exchange have to stay in step: poor visibility is what produces excess inventory and stockouts at the same time.',
  },
  'fashion-m2-21-materials': {
    title: 'What the chain consumes before anything is made',
    kicker: 'Raw materials, components and supplier networks',
    headers: ['Input group', 'Typical materials', 'What it determines'],
    rows: [
      { label: 'Fibre & textile', a: 'Cotton, polyester, nylon, wool, recycled fibres, yarns, fabrics, dyes, trims', b: 'Hand-feel, durability and a large share of apparel cost' },
      { label: 'Footwear components', a: 'Rubber outsoles, foam cushioning, synthetic uppers, leather, adhesives, textiles', b: 'Performance, durability and comfort' },
      { label: 'Sports & outdoor', a: 'Technical fabrics, moisture management, insulation, water-resistant coatings, impact absorption', b: 'Whether a performance claim can be made at all' },
      { label: 'Accessory & lifestyle', a: 'Zippers, buttons, buckles, bags, travel accessories, packaging', b: 'Functionality, presentation and perceived quality' },
      { label: 'Supplier qualification', a: 'Capacity, quality, delivery reliability, compliance, cost, environmental and social standards', b: 'Which suppliers may be used before price is discussed' },
      { label: 'Sustainable sourcing', a: 'Recycled polyester, responsibly sourced natural fibres, lower-impact alternatives', b: 'Credibility of a claim, subject to real traceability' },
    ],
    takeaway: 'Upstream choices set product quality, manufacturing cost and supply risk before a single garment is cut.',
  },
  'fashion-m2-22-sourcing': {
    title: 'Every sourcing decision buys something and exposes something',
    kicker: 'Sourcing strategy, technology and supply risk',
    headers: ['Decision', 'What it buys', 'What it exposes'],
    rows: [
      { label: 'Global sourcing', a: 'Specialised capability, competitive cost, established production networks', b: 'Freight cost, longer lead times and trade conditions' },
      { label: 'Supplier diversification', a: 'Alternatives to a single supplier or production location', b: 'Higher coordination cost and volume split across partners' },
      { label: 'Cost management', a: 'Lower material prices and better payment terms', b: 'Minimum order quantities and exchange-rate movement' },
      { label: 'Digital procurement', a: 'Order tracking, supplier evaluation, documents, communication', b: 'Dependence on data suppliers must actually maintain' },
      { label: 'Material traceability', a: 'Evidence behind origin and compliance claims', b: 'Certification effort and continuous record-keeping' },
      { label: 'Nearshoring', a: 'Shorter lead times and lower transport risk', b: 'Not always the lowest cost or the required technical capability' },
    ],
    takeaway: 'The right strategy balances cost against quality, responsiveness and continuity; concentration in few suppliers or countries is the main avoidable risk.',
  },
  'fashion-m2-31-manufacturing': {
    title: 'From concept to finished unit',
    kicker: 'Design, development and manufacturing',
    headers: ['Stage', 'What happens', 'What it decides'],
    rows: [
      { label: 'Product design', a: 'Collections, footwear models, bags and accessories for a target customer and season', b: 'Whether the product answers a real demand' },
      { label: 'Development & prototyping', a: 'Samples, fit and function evaluation, material tests, specification refinement', b: 'Cost, quality and manufacturability before volume' },
      { label: 'Technical engineering', a: 'Performance testing, ergonomic design, durability evaluation, material engineering', b: 'Whether a sports claim holds under real use' },
      { label: 'Cutting & assembly', a: 'Fabric cutting, sewing and finishing; component preparation, bonding and finishing', b: 'Consistency across thousands of units' },
      { label: 'Production planning', a: 'Machinery, labour, materials and capacity against order volume and lead time', b: 'Whether the season lands on time' },
      { label: 'OEM & ODM models', a: 'Buyer-specified production, or supplier-contributed design and development', b: 'How much product knowledge sits inside the brand' },
      { label: 'Batch strategy', a: 'Large batches for unit cost, smaller batches to test demand', b: 'The size of the markdown risk carried' },
    ],
    takeaway: 'Manufacturing efficiency alone is not advantage: design, performance, quality, flexibility and speed to market have to be coordinated together.',
  },
  'fashion-m2-32-logistics': {
    title: 'Turning finished goods into sellable inventory',
    kicker: 'Quality, packaging, warehousing and logistics',
    headers: ['Activity', 'What it checks or moves', 'Cost of getting it wrong'],
    rows: [
      { label: 'Quality inspection', a: 'Dimensions, stitching, material defects, colour consistency, finishing, durability', b: 'Returns, rework and damage to brand reputation' },
      { label: 'Category testing', a: 'Cushioning and durability for running shoes; weather resistance for outdoor apparel', b: 'A performance claim that fails in the customer\u2019s hands' },
      { label: 'Packaging & labelling', a: 'Protection, labels, size information, barcodes, regulatory documentation', b: 'Transit damage and compliance refusals' },
      { label: 'Warehouse management', a: 'Receiving, recording, storing, picking, packing and dispatch', b: 'Inaccurate stock records and availability that cannot be sold' },
      { label: 'Transport & freight', a: 'Road, sea, air or multimodal against cost, urgency and destination', b: 'Late seasons and margin lost to emergency air freight' },
      { label: 'Inventory allocation', a: 'Split across stores, regional warehouses and online fulfilment centres', b: 'Stock in the wrong place while demand goes unserved' },
      { label: 'Reverse logistics', a: 'Inspect, restock, repair, discount or recycle by product condition', b: 'Hidden cost that quietly erases the original margin' },
    ],
    takeaway: 'Reliable quality and logistics reduce defects, improve stock visibility and support consistent availability; every failure here lands in margin.',
  },
  'fashion-m2-41-channels': {
    title: 'Reach on one side, control on the other',
    kicker: 'Distribution and retail channels',
    headers: ['Channel', 'How it reaches the customer', 'What the retailer trades away'],
    rows: [
      { label: 'Wholesale', a: 'Sells to distributors, department stores and specialty retailers', b: 'Control of price, presentation and customer data' },
      { label: 'Brand-owned retail', a: 'Dedicated stores controlling merchandising, store design and service', b: 'Rent, staffing and inventory investment' },
      { label: 'Multi-brand retail', a: 'Consumers compare across labels, price points and categories', b: 'Being shown directly beside substitutes' },
      { label: 'E-commerce', a: 'Brand sites and marketplaces for discovery, comparison, ordering and payment', b: 'Marketplace commission and the cost of returns' },
      { label: 'Social commerce', a: 'Creator content, livestreaming and purchase inside the platform', b: 'Dependence on creators and on platform rules' },
      { label: 'Channel mix', a: 'Several channels covering different customer segments', b: 'Coordination complexity and the risk of channel conflict' },
    ],
    takeaway: 'Wider distribution buys reach; more direct channels buy control over pricing, presentation and the customer relationship.',
  },
  'fashion-m2-42-economics': {
    title: 'What decides whether a channel actually pays',
    kicker: 'Merchandising, acquisition and channel economics',
    headers: ['Lever', 'What it controls', 'How it shows up in the P&L'],
    rows: [
      { label: 'Assortment planning', a: 'Range, sizes, colours, price points and seasonal allocation', b: 'Sell-through rate and the stock left at the end' },
      { label: 'Promotional priority', a: 'What is discounted, when and how deeply', b: 'Realised price rather than ticket price' },
      { label: 'Marketing & acquisition', a: 'Advertising, PR, influencer partnerships, loyalty programmes, campaigns', b: 'Customer acquisition cost per order' },
      { label: 'Partner margin', a: 'The commission or retailer margin taken by whoever makes the sale', b: 'Gross margin by channel, not by product' },
      { label: 'Fulfilment cost', a: 'Picking, packing, delivery and the return journey', b: 'Contribution on a small basket, sometimes negative' },
      { label: 'Return rate', a: 'The proportion of orders sent back', b: 'Revenue reversed plus the cost of handling it twice' },
    ],
    takeaway: 'Channel profitability is judged after commission, fulfilment, acquisition cost and returns \u2014 never at the moment the order is placed.',
  },
  'fashion-m2-51-omnichannel': {
    title: 'One journey, however the customer enters it',
    kicker: 'Omnichannel retail and order fulfilment',
    headers: ['Capability', 'What the customer gets', 'What it requires behind the scenes'],
    rows: [
      { label: 'Omnichannel journey', a: 'Browse online, inspect in store, buy in the app, collect or have it delivered', b: 'One shared view of stock, price and the order' },
      { label: 'Personalised shopping', a: 'Relevant products, sizes, promotions and styling suggestions', b: 'Customer data plus consent and appropriate handling' },
      { label: 'Order fulfilment', a: 'Confirmation, availability, picking, packing, shipping and notifications', b: 'Accurate inventory and a reliable delivery partner' },
      { label: 'Product information', a: 'Consistent specification, sizing and availability wherever it is read', b: 'A single source of truth for product data' },
    ],
    takeaway: 'Consistency is the whole point, and the integration only becomes visible to the customer at the moment it fails.',
  },
  'fashion-m2-52-aftersales': {
    title: 'Where similar products separate',
    kicker: 'Returns, after-sales service and loyalty',
    headers: ['Service', 'What it resolves', 'Commercial consequence'],
    rows: [
      { label: 'Returns & exchanges', a: 'Wrong size, wrong expectation, or a change of mind', b: 'Less friction, but high return rates carry real logistics cost' },
      { label: 'After-sales support', a: 'Sizing advice, product care, warranty claims, repairs, footwear issues', b: 'Trust that supports the next purchase' },
      { label: 'Loyalty & retention', a: 'Membership, purchase history, personalised communication, relevant rewards', b: 'Repeat purchase at lower acquisition cost' },
      { label: 'Customer feedback', a: 'Reviews, complaints, return reasons and service interactions', b: 'Input to product design, quality and the next buy' },
      { label: 'CRM systems', a: 'Organised customer records and coordinated communication', b: 'Useful only with data protection and access control in place' },
    ],
    takeaway: 'Post-purchase service is where products at similar prices and specifications compete on convenience, reliability and trust.',
  },
  'fashion-m2-61-inputs': {
    title: 'Each stage consumes the one before it',
    kicker: 'Inputs and outputs across the chain',
    headers: ['Stage', 'Inputs consumed', 'Outputs produced'],
    rows: [
      { label: 'Upstream', a: 'Fibres, fabrics, leather, rubber, components, packaging, supplier capacity', b: 'Qualified materials and documented supplier specifications' },
      { label: 'Product development', a: 'Consumer insight, trend information, concepts, samples, technical expertise, cost targets', b: 'Designs, prototypes, bills of materials, production specifications' },
      { label: 'Manufacturing', a: 'Approved materials, labour, machinery, production plans, quality standards', b: 'Finished apparel, footwear, accessories and lifestyle products' },
      { label: 'Quality & logistics', a: 'Finished goods, packaging, inspection criteria, warehouse capacity, transport', b: 'Inspected, packaged, stored and retail-ready product' },
      { label: 'Retail', a: 'Inventory, merchandising plans, staff, marketing budget, platforms, customer data', b: 'Retail sales, fulfilled orders, service experiences and feedback' },
      { label: 'After-sales', a: 'Customer requests, warranty conditions, return information, care requirements', b: 'Resolved cases, processed returns, repairs and actionable feedback' },
      { label: 'Information', a: 'Sales trends, inventory performance, product reviews, return data', b: 'Input back into planning and the next product cycle' },
    ],
    takeaway: 'Because every stage consumes the previous stage\u2019s output, a bottleneck anywhere constrains the performance of the whole chain.',
  },
  'fashion-m2-62-value': {
    title: 'Cost sits everywhere; value capture does not',
    kicker: 'Cost structure, profitability and advantage',
    headers: ['Element', 'Where money goes or comes from', 'Effect on profitability'],
    rows: [
      { label: 'Product & material cost', a: 'Fibres, fabrics, components, labour, manufacturing overhead, packaging', b: 'The floor under any retail price' },
      { label: 'Sourcing & logistics', a: 'Supplier management, freight, customs where applicable, warehousing, distribution', b: 'Landed cost, which moves with freight and currency' },
      { label: 'Retail operating cost', a: 'Store rent, wages, platform fees, payment fees, marketing, fulfilment, service', b: 'Operating margin on a sale already made' },
      { label: 'Brand & design value', a: 'Recognisable identity, distinctive design, innovation, product performance', b: 'Premium positioning, but only where customers value it' },
      { label: 'Markdown risk', a: 'Forecast error, unsold seasonal product, broken size curves, obsolescence', b: 'Discounting that reduces realised margin' },
      { label: 'Direct-to-consumer', a: 'Control of pricing and first-party customer data', b: 'Requires investment in retail, technology, fulfilment and acquisition' },
      { label: 'Manufacturing advantage', a: 'Production scale, technical expertise, quality consistency, resource utilisation', b: 'Real value created without owning the customer' },
      { label: 'Circular services', a: 'Repair, resale and take-back offers', b: 'Extra revenue or engagement, subject to operational feasibility' },
    ],
    takeaway: 'The stages carrying the highest physical production cost are not necessarily the stages that capture the most commercial value.',
  },
  'fashion-m2-63-global': {
    title: 'Specialisation across borders',
    kicker: 'The global value chain and international trade',
    headers: ['Element', 'How it is distributed', 'What it exposes'],
    rows: [
      { label: 'International sourcing', a: 'Materials and components bought where quality, price or capability fit', b: 'Currency, freight and supplier concentration' },
      { label: 'Cross-border manufacturing', a: 'Production stages completed in several countries before finishing', b: 'Rules of origin and cumulative lead time' },
      { label: 'Brand ownership', a: 'Concepts, specifications, IP, marketing and retail strategy held by the brand', b: 'Little factory cost exposure, heavy demand exposure' },
      { label: 'International logistics', a: 'Freight forwarders, shipping lines, customs brokers, distribution partners', b: 'Port congestion, documentation and freight-rate swings' },
      { label: 'Global distribution', a: 'Regional warehouses, wholesale partners, branded stores, online fulfilment', b: 'Inventory stranded in the wrong region' },
      { label: 'Trade & regulation', a: 'Tariffs, rules of origin, product standards, customs, labour and environmental rules', b: 'Cost and market access that change by policy decision' },
      { label: 'Value capture', a: 'Follows brand ownership, design capability, technology and customer access', b: 'Manufacturing-only participation captures the thinnest slice' },
    ],
    takeaway: 'Global chains let firms specialise instead of doing everything domestically, but commercial value follows capability and access to the final customer.',
  },
  'fashion-m2-64-vietnam': {
    title: 'Vietnam across the chain, not only in the factory',
    kicker: 'Vietnam\u2019s position and localisation opportunities',
    headers: ['Role', 'What Vietnamese businesses do today', 'What moving up the chain requires'],
    rows: [
      { label: 'Export manufacturing', a: 'Apparel, footwear and related goods produced for international buyers', b: 'Quality, efficiency, compliance, delivery reliability, complex-product capability' },
      { label: 'Domestic material supply', a: 'Certain textiles, components, packaging and production services', b: 'Material development and consistent specification at volume' },
      { label: 'Imported inputs', a: 'Dependence on imported fabrics, fibres, components, machinery and technology', b: 'Managing exchange rates, freight, lead times and disruption' },
      { label: 'Local brand development', a: 'Consumer research, design, differentiation, pricing and retail experience', b: 'Design talent, brand investment and customer acquisition' },
      { label: 'Domestic retail', a: 'Brand stores, malls, multi-brand retail, e-commerce and social commerce', b: 'Inventory systems, analytics and integrated fulfilment' },
      { label: 'Localisation', a: 'Domestic suppliers, local development, regional networks, closer production\u2013retail links', b: 'Meeting cost, quality and delivery requirements at the same time' },
      { label: 'Measurement discipline', a: 'Export revenue and domestic retail spend measured separately', b: 'Never reading export value as domestic market size' },
    ],
    takeaway: 'Vietnam\u2019s opportunity extends past production volume: design, materials, technology, brand ownership and customer access decide how much value is retained.',
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
  'fashion-m2-11-participants': { layout: 'mindmap', center: 'Fashion value chain', centerSub: 'Value is created at every stage' },
  'fashion-m2-12-flows': { layout: 'cards' },
  'fashion-m2-21-materials': { layout: 'mindmap', center: 'Inputs & suppliers', centerSub: 'Set before anything is made' },
  'fashion-m2-22-sourcing': { layout: 'compare' },
  'fashion-m2-31-manufacturing': { layout: 'cards' },
  'fashion-m2-32-logistics': { layout: 'cards' },
  'fashion-m2-41-channels': { layout: 'compare' },
  'fashion-m2-42-economics': { layout: 'mindmap', center: 'Channel profit', centerSub: 'Judged after all costs' },
  'fashion-m2-51-omnichannel': { layout: 'cards' },
  'fashion-m2-52-aftersales': { layout: 'mindmap', center: 'After-sales', centerSub: 'Where similar products separate' },
  'fashion-m2-61-inputs': { layout: 'steps', note: 'A bottleneck at any stage constrains the performance of the whole chain.' },
  'fashion-m2-62-value': { layout: 'compare' },
  'fashion-m2-63-global': { layout: 'mindmap', center: 'Global value chain', centerSub: 'Specialisation across borders' },
  'fashion-m2-64-vietnam': { layout: 'cards' },
};

export function renderFashionModule02Visual(kind: FashionModule02VisualKind) {
  const spec = VISUALS[kind];
  if (!spec) return null;
  const style = STYLES[kind];
  return style ? <VisualView spec={restyleRows(spec, style)} /> : <DataTable spec={spec} />;
}
