import type { AgriCropChapterVisual } from './agriCropVisualSpecs';

const H = 'HYPOTHETICAL — FOR LEARNING PURPOSES';

/** Chapter-specific Learning Visuals for Crop Production & Agricultural Processing Module 03, keyed by visualKind. */
export const AGRI_CROP_M3_VISUALS: Record<string, AgriCropChapterVisual> = {
  'agri-crop-m3-1': {
    heading: 'Three farm models earn from crops while securing different resources',
    intro: 'Family farms, producer groups and structured operations all earn from crops, but each allocates land, capital, labor, production risk and market access differently.',
    spec: {
      layout: 'table', title: 'How Do Crop Producers Generate Income?', kicker: '',
      headers: ['Farm model', 'How it earns from crops', 'What it must secure'],
      rows: [
        { label: 'Smallholder', a: 'Family farm selling its own harvest', b: 'Land, labor and a reliable buyer' },
        { label: 'Cooperative', a: 'Producer group coordinating inputs and aggregation', b: 'Members who keep production responsibility' },
        { label: 'Specialized farm', a: 'Structured operation focused on chosen crops', b: 'Capital, local services and market access' },
      ],
      note: 'Model fit depends on crop, land, capital, buyer reliability and local services.',
      takeaway: 'Farming models allocate land, capital, labor, production risk and market access differently.',
    },
  },
  'agri-crop-m3-2': {
    heading: 'A commercial farm carries its own risk; contract farming shares it with a buyer',
    intro: 'Larger structured operations and contracted production both earn from crops, but they split land, capital, production risk and market access in different ways.',
    spec: {
      layout: 'compare', title: 'How Do Smallholder, Cooperative, and Commercial Farm Models Differ?', kicker: '',
      leftTitle: 'Commercial farm', rightTitle: 'Contract farming',
      rows: [
        { label: 'Structure', a: 'Larger structured operation', b: 'Producers and buyers bound by an agreement' },
        { label: 'Land and capital', a: 'Owned and financed by the operation', b: 'Producer keeps the land; buyer terms shape production' },
        { label: 'Production risk', a: 'Carried by the operation', b: 'Split by defined production responsibilities' },
        { label: 'Market access', a: 'Operation finds and serves its own buyers', b: 'Purchase responsibilities agreed in advance' },
      ],
      note: 'Contract farming is an arrangement defining production and purchase responsibilities between producers and buyers.',
      takeaway: 'Commercial farms and contract farming allocate land, capital, labor, production risk and market access differently.',
    },
  },
  'agri-crop-m3-3': {
    heading: 'Processing models range from fee processing to owning the whole chain',
    intro: 'Processing businesses run from fee processors to integrated farm, collection, factory and distribution networks. They differ in who owns the raw material, the assets and the customer.',
    spec: {
      layout: 'table', title: 'How Do Contract Farming and Integrated Production Models Work?', kicker: '',
      headers: ['Processing model', 'Raw-material ownership and assets', 'Customer responsibility'],
      rows: [
        { label: 'Toll processing', a: 'Processes others’ crop for a fee', b: 'Stays with the crop owner' },
        { label: 'Contract processing', a: 'Processes to agreed contract terms', b: 'Set by the contract' },
        { label: 'Independent processor', a: 'Buys the raw material', b: 'Sells its own product' },
        { label: 'Farm-to-factory', a: 'Links farm supply directly to the plant', b: 'Coordinates supply with plant needs' },
        { label: 'Integrated agribusiness', a: 'Owns farm, collection, factory and distribution', b: 'Carries it end to end' },
      ],
      note: 'Integration improves coordination only when supply and utilization justify the complexity.',
      takeaway: 'Processing models differ in raw-material ownership, assets and customer responsibility.',
    },
  },
  'agri-crop-m3-4': {
    heading: 'Crop products split into staples, plantation crops and industrial crops',
    intro: 'Crops are segmented by crop, end use, perishability, transformation and value. Each segment needs its own harvest, handling and inventory system.',
    spec: {
      layout: 'taxonomy', title: 'How Are Crop Products Segmented?', kicker: '',
      root: 'Crop products', rootDetail: 'Segment by crop, end use, perishability, transformation and value',
      groups: [
        { label: 'Staples', detail: 'Food crops such as dry grain' },
        { label: 'Plantation crops', detail: 'Perennial tree and bush crops' },
        { label: 'Industrial crops', detail: 'Grown as raw material for processing' },
      ],
      note: 'Assess rice, coffee, cashew, fruit, vegetables and rubber separately: dry grain and fresh fruit need different systems.',
      takeaway: 'Crop characteristics determine agronomy, perishability, processing, storage and channel economics.',
    },
  },
  'agri-crop-m3-5': {
    heading: 'Oilseeds and horticulture lose value in different ways after harvest',
    intro: 'A dry, storable crop and a fresh, perishable one need different harvest, handling and inventory systems, so quality and value are protected differently.',
    spec: {
      layout: 'compare', title: 'How Do Crop Quality and Variety Affect Commercial Value?', kicker: '',
      leftTitle: 'Oilseeds (dry crop)', rightTitle: 'Horticulture (fresh produce)',
      rows: [
        { label: 'Perishability', a: 'Lower once properly dried', b: 'High: quality falls quickly' },
        { label: 'Harvest and handling', a: 'Dry-crop harvest and drying', b: 'Fast, careful fresh handling' },
        { label: 'Storage and inventory', a: 'Can be kept as inventory', b: 'Short storage window' },
        { label: 'Where value is set', a: 'Quality fit for processing', b: 'Freshness and grade on arrival' },
      ],
      note: 'Assess each crop and variety separately rather than as one average product.',
      takeaway: 'Crop characteristics determine agronomy, perishability, processing, storage and channel economics.',
    },
  },
  'agri-crop-m3-6': {
    heading: 'After primary processing, value-added routes branch by customer need',
    intro: 'Cleaning, grading and milling prepare the crop; preservation, ingredients, customization and by-product use then add value only when customers pay for it.',
    spec: {
      layout: 'pathway', title: 'How Do Different Crop Types Create Different Economics?', kicker: '',
      trunk: [
        { label: 'Harvested crop', detail: 'Raw material with a defined specification' },
        { label: 'Primary processing', detail: 'Cleaning, grading, milling or crushing' },
      ],
      optionsLabel: 'Value-added routes — alternatives, not steps',
      options: [
        { label: 'Preservation', detail: 'Freezing and packaging, e.g. frozen fruit' },
        { label: 'Ingredients', detail: 'Extraction and ingredient production' },
        { label: 'Customization', detail: 'E.g. a starch made for one manufacturer' },
        { label: 'By-product use', detail: 'Value from what primary processing leaves' },
      ],
      afterLabel: 'Test before adding products',
      after: [{ label: 'Customer value covers added cost', detail: 'Validate supply, capability, demand and margin', kind: 'outcome' }],
      takeaway: 'Value-added processing works when functionality or convenience creates enough customer value to cover added cost.',
    },
  },
  'agri-crop-m3-7': {
    heading: 'Producers rely on buyers and suppliers for inputs, collection and settlement',
    intro: 'Producers need inputs, knowledge, buyers, collection and predictable settlement. Reliable raw material starts when those relationships benefit both sides.',
    spec: {
      layout: 'ecosystem', title: 'Who Buys Crops From Farmers?', kicker: '',
      center: { label: 'Crop producer', detail: 'Needs inputs, knowledge, a buyer and predictable settlement' },
      actors: [
        { label: 'Input supplier', relation: 'Input access: seed, nutrients and crop protection', flows: ['product', 'money'] },
        { label: 'Collector / aggregator', relation: 'Aggregation: collects the harvest and pays for it', flows: ['product', 'money'] },
        { label: 'Processor', relation: 'Shares variety and quality needs before planting', flows: ['information', 'money'] },
        { label: 'Producer development', relation: 'Knowledge that lifts quality and reliability', flows: ['service', 'information'] },
      ],
      note: 'Producer support must fit local crop economics and avoid unfunded obligations.',
      takeaway: 'Reliable raw material begins with transparent terms and producer relationships that benefit both sides.',
    },
  },
  'agri-crop-m3-8': {
    heading: 'Buyer requirements are set before planting, supported in season and settled at delivery',
    intro: 'A processor shares variety and quality requirements before planting, not after harvest. Purchase terms and technical support then carry those requirements through the season.',
    spec: {
      layout: 'flow', title: 'What Determines Buyer Quality and Volume Requirements?', kicker: '',
      steps: [
        { label: 'Share requirements', detail: 'Variety, quality and volume needed', owner: 'Processor' },
        { label: 'Agree purchase terms', detail: 'Transparent quality, volume and settlement terms', owner: 'Processor and producer' },
        { label: 'Technical support', detail: 'Guidance through the growing season', owner: 'Buyer field team' },
        { label: 'Deliver and assess', detail: 'Harvest checked against the agreed requirement', owner: 'Producer' },
        { label: 'Predictable settlement', detail: 'Payment on the agreed terms', kind: 'outcome', owner: 'Processor' },
      ],
      loop: 'Terms that benefit both sides keep the producer supplying next season.',
      note: 'Producer support must fit local crop economics and avoid unfunded obligations.',
      takeaway: 'Reliable raw material begins with transparent purchase terms and technical support that benefit both sides.',
    },
  },
  'agri-crop-m3-9': {
    heading: 'Winning business buyers depends on specification, coordination and supplier performance',
    intro: 'Business buyers require moisture, grade, functionality, safety records and delivery reliability. An ingredient buyer may set the specification annually and schedule delivery monthly.',
    spec: {
      layout: 'driverTree', title: 'How Do Pricing, Contracts, and Reliability Influence Farm Sales?', kicker: '',
      root: { label: 'B2B competitiveness', detail: 'Consistent specification and supply at attractive total cost' },
      drivers: [
        { label: 'Raw material', detail: 'Supply that can meet the specification' },
        { label: 'Specification', detail: 'What the buyer requires', children: [{ label: 'Moisture' }, { label: 'Grade' }, { label: 'Functionality' }, { label: 'Safety records' }] },
        { label: 'Production coordination', detail: 'Plans matched to the buyer', children: [{ label: 'Annual specification' }, { label: 'Monthly delivery' }] },
        { label: 'Technical collaboration', detail: 'Buyer and processor solve problems together' },
        { label: 'Supplier performance', detail: 'Tracked by account', children: [{ label: 'Quality complaints' }, { label: 'Fill rate' }, { label: 'Contribution' }] },
      ],
      takeaway: 'B2B competitiveness means consistent specification and supply at attractive total cost.',
    },
  },
  'agri-crop-m3-10': {
    heading: 'Revenue counts only marketed tonnes, and profit is what remains after costs',
    intro: 'Farm revenue equals marketable sales volume times realized farmgate price, plus or minus quality adjustments. Move the sliders to see why harvested output, marketed output, revenue and profit differ.',
    spec: {
      layout: 'scenario', title: 'How Do Crop Farmers Generate Revenue?', kicker: H,
      inputs: [
        { key: 'harvest', label: 'Harvested production', min: 10, max: 30, step: 1, value: 20, unit: 't' },
        { key: 'unsold', label: 'Harvest not marketed', min: 0, max: 6, step: 1, value: 2, unit: 't' },
        { key: 'price', label: 'Realized farmgate price', min: 300, max: 700, step: 25, value: 500, unit: 'per t' },
        { key: 'quality', label: 'Quality premium (+) or discount (−)', min: -50, max: 50, step: 10, value: 0, unit: 'per t' },
        { key: 'variable', label: 'Variable costs', min: 3000, max: 7000, step: 250, value: 5000, unit: 'units' },
        { key: 'other', label: 'Land, depreciation, finance, overhead', min: 500, max: 3000, step: 100, value: 1500, unit: 'units' },
      ],
      outputs: [
        { label: 'Sales volume', unit: 't', digits: 0, compute: (v) => v.harvest - v.unsold },
        { label: 'Crop revenue', unit: 'units', digits: 0, compute: (v) => (v.harvest - v.unsold) * (v.price + v.quality) },
        { label: 'Gross margin', unit: 'units', digits: 0, compute: (v) => (v.harvest - v.unsold) * (v.price + v.quality) - v.variable },
        { label: 'Net profit', unit: 'units', digits: 0, compute: (v) => (v.harvest - v.unsold) * (v.price + v.quality) - v.variable - v.other },
      ],
      assumption: `${H}. Defaults follow Hypothetical 1: 20 t harvested, 18 t marketed at 500 per tonne gives 9,000 revenue, 4,000 gross margin and 2,500 net profit. Illustrative currency units, not market data.`,
      note: 'Report physical production and realized product margin alongside revenue.',
      takeaway: 'Farm revenue equals marketable sales volume times realized farmgate price plus or minus quality adjustments; harvested output, marketed output and revenue are not interchangeable.',
    },
  },
  'agri-crop-m3-11': {
    heading: 'Farm cost is variable inputs and labor plus land, machinery and overhead',
    intro: 'Crop cost covers seed, nutrients, crop protection, water, labor, land, machinery, fuel, finance, depreciation and fixed overhead, measured on a stated area and season.',
    spec: {
      layout: 'driverTree', title: 'What Determines Crop Production Costs?', kicker: '',
      root: { label: 'Farm production cost', detail: 'Per stated area and season' },
      formula: 'Cost = variable inputs + labor + land, machinery, depreciation, finance and overhead',
      drivers: [
        { label: 'Variable inputs', op: '+', children: [{ label: 'Seed' }, { label: 'Fertilizer' }, { label: 'Crop protection' }, { label: 'Irrigation' }] },
        { label: 'Labor', op: '+', detail: 'Hired and family labor, treatment stated' },
        { label: 'Land cost', op: '+', detail: 'Rent or the cost of owned land' },
        { label: 'Machinery and fuel', op: '+', detail: 'Field operations, harvest and initial handling' },
        { label: 'Depreciation, finance, overhead', op: '+', detail: 'Accounting expense that may not be cash' },
      ],
      note: 'Hypothetical 2: yield rises from 5 to 6 tonnes per hectare, yet input cost inflation and a lower farmgate price cut gross margin and net profit.',
      takeaway: 'Farm cost includes variable inputs and labor plus relevant land, machinery, depreciation, finance and overhead; cash expense and accounting expense are not identical.',
    },
  },
  'agri-crop-m3-12': {
    heading: 'Break-even price and yield move whenever cost, output or price change',
    intro: 'Break-even price is relevant cost divided by expected output; break-even yield is relevant cost divided by selling price. Move the sliders to see both thresholds shift.',
    spec: {
      layout: 'scenario', title: 'Which KPIs Drive Farm Productivity and Profitability?', kicker: H,
      inputs: [
        { key: 'cost', label: 'Relevant cost', min: 3000, max: 9000, step: 500, value: 6000, unit: 'units' },
        { key: 'output', label: 'Expected output', min: 6, max: 20, step: 1, value: 12, unit: 't' },
        { key: 'price', label: 'Assumed selling price', min: 300, max: 900, step: 50, value: 600, unit: 'per t' },
        { key: 'area', label: 'Cultivated area', min: 1, max: 4, step: 0.5, value: 2, unit: 'ha' },
      ],
      outputs: [
        { label: 'Break-even price (cost per tonne)', unit: 'per t', digits: 0, compute: (v) => v.cost / v.output },
        { label: 'Break-even yield', unit: 't', digits: 1, compute: (v) => v.cost / v.price },
        { label: 'Yield per hectare', unit: 't/ha', digits: 1, compute: (v) => v.output / v.area },
        { label: 'Net profit at expected output', unit: 'units', digits: 0, compute: (v) => v.output * v.price - v.cost },
      ],
      assumption: `${H}. Defaults follow Hypothetical 3: 6,000 cost and 12 t output give a 500 per tonne break-even price; at 600 per tonne break-even yield is 10 t. The area input is illustrative.`,
      note: 'State family labor, land and depreciation treatment, and track post-harvest loss rate alongside these KPIs.',
      takeaway: 'Productivity and profitability require aligned crop, area, season, output, price and cost definitions; higher yield does not guarantee higher profit.',
    },
  },
  'agri-crop-m3-13': {
    heading: 'From the farm gate, crops take one of three domestic sales routes',
    intro: 'Crops move from farms through collection and storage to processors, manufacturers and domestic buyers. Each route trades visibility against collection effort.',
    spec: {
      layout: 'pathway', title: 'How Do Farmers Sell Their Crops?', kicker: '',
      trunk: [{ label: 'Harvest at the farm', detail: 'Graded lot ready for sale' }],
      optionsLabel: 'Sales routes — alternatives, not steps',
      options: [
        { label: 'Direct farm sale', detail: 'More buyer visibility; buyer handles collection and field management' },
        { label: 'Collector', detail: 'Aggregates many lots for onward sale' },
        { label: 'Domestic wholesale', detail: 'Bulk trade to domestic buyers' },
      ],
      afterLabel: 'Where the crop ends up',
      after: [{ label: 'Processors and domestic buyers', detail: 'Including manufacturers', kind: 'outcome' }],
      note: 'Balance aggregation efficiency with transparent testing and payment.',
      takeaway: 'Channel design affects supply cost, quality, traceability and producer value capture.',
    },
  },
  'agri-crop-m3-14': {
    heading: 'Cooperatives pool producers; regional warehouses pool storage',
    intro: 'Both channels aggregate crops on the way to buyers. Each affects supply cost, quality, traceability and how much value the producer keeps.',
    spec: {
      layout: 'compare', title: 'How Do Cooperatives, Contracts, and Traders Support Market Access?', kicker: '',
      leftTitle: 'Cooperative', rightTitle: 'Regional warehouse',
      rows: [
        { label: 'What it aggregates', a: 'Members’ production', b: 'Stored crop near producing areas' },
        { label: 'Supply cost', a: 'Shared collection lowers cost', b: 'Consolidated storage and dispatch' },
        { label: 'Quality', a: 'Common standards across members', b: 'Storage conditions protect quality' },
        { label: 'Traceability', a: 'Lots linked to member farms', b: 'Relies on records at intake' },
        { label: 'Producer value capture', a: 'Collective sale on agreed terms', b: 'Depends on transparent testing and payment' },
      ],
      note: 'Balance aggregation efficiency with transparent testing and payment.',
      takeaway: 'Channel design affects supply cost, quality, traceability and producer value capture.',
    },
  },
  'agri-crop-m3-15': {
    heading: 'Choosing an export route depends on quality, documents and delivery capability',
    intro: 'Exporters, merchants, importers, brokers and direct overseas customers are all routes abroad. Which one fits depends on whether the product, documents and delivery can satisfy a verified buyer.',
    spec: {
      layout: 'decision', title: 'How Do Quality, Logistics, and Timing Affect Farm Sales?', kicker: '',
      root: { label: 'Export opportunity', detail: 'A destination buyer with defined requirements' },
      question: 'Can we meet the buyer’s quality, compliance and delivery needs ourselves?',
      branches: [
        { condition: 'Yes: product adapted, documents ready', outcome: 'Direct export', detail: 'Adapt grade and packaging to the verified buyer', tone: 'positive' },
        { condition: 'Product fits, market reach is thin', outcome: 'Sell through a trading partner', detail: 'Exporters, merchants, importers or brokers', tone: 'caution' },
        { condition: 'Competitive in more than one market', outcome: 'Build market diversity', detail: 'Only where product and execution compete', tone: 'positive' },
        { condition: 'Quality or documentation gaps', outcome: 'Fix the product before expanding', detail: 'Access claims alone do not win sales', tone: 'negative' },
      ],
      takeaway: 'Export growth requires quality, compliance and delivery—not access claims alone.',
    },
  },
  'agri-crop-m3-16': {
    heading: 'Suppliers, producer groups, logistics and processors surround the crop producer',
    intro: 'Participants support inputs, irrigation, mechanization, collection, preservation and testing. How well they coordinate decides reliability and loss from farm to factory.',
    spec: {
      layout: 'ecosystem', title: 'Who Participates in the Crop Production Ecosystem?', kicker: '',
      center: { label: 'Crop producers', detail: 'Grow the raw material the chain depends on' },
      actors: [
        { label: 'Input supplier', relation: 'Supplies inputs, irrigation and mechanization', flows: ['product', 'money'] },
        { label: 'Producer organization', relation: 'Organizes collection and shared services', flows: ['service', 'information'] },
        { label: 'Storage and logistics', relation: 'Dries, stores and moves the harvest', flows: ['product', 'risk'] },
        { label: 'Testing', relation: 'Checks quality before transformation', flows: ['information', 'oversight'] },
        { label: 'Processing plant', relation: 'Transforms supply; utilization depends on upstream timing', flows: ['money', 'product'] },
      ],
      note: 'Clarify capacity, data and contingency responsibilities among partners.',
      takeaway: 'Ecosystem coordination determines reliability and loss across farm-to-factory operations.',
    },
  },
  'agri-crop-m3-17': {
    heading: 'A late harvest or poor drying passes quality and utilization losses down the chain',
    intro: 'Service providers, producers, inspection and processors hand the crop along one chain. Late harvest or insufficient drying can reduce plant utilization and quality together.',
    spec: {
      layout: 'flow', title: 'How Do Input Suppliers, Banks, Buyers, and Cooperatives Collaborate?', kicker: '',
      steps: [
        { label: 'Field services', detail: 'Irrigation and mechanization on time', owner: 'Service provider' },
        { label: 'Timely harvest', detail: 'Picked at the agreed maturity', owner: 'Producer' },
        { label: 'Drying and collection', detail: 'Enough drying before storage', owner: 'Service provider' },
        { label: 'Inspection', detail: 'Quality tested at intake', owner: 'Inspection' },
        { label: 'Plant utilization', detail: 'Quality raw material keeps the line running', kind: 'outcome', owner: 'Processor' },
      ],
      loop: 'Shared capacity, data and contingency plans let partners correct the next harvest.',
      takeaway: 'Ecosystem coordination among service providers, processors and inspection determines reliability and loss across farm-to-factory operations.',
    },
  },
  'agri-crop-m3-18': {
    heading: 'Each institution influences production through a distinct role',
    intro: 'Public and private bodies support varieties, training, capital, standards, irrigation and roads. Research develops a variety while extension supports its practical adoption.',
    spec: {
      layout: 'table', title: 'How Do Agricultural Institutions and Support Services Affect Production?', kicker: '',
      headers: ['Institution', 'What it provides', 'What it influences'],
      rows: [
        { label: 'Research', a: 'New varieties and evidence', b: 'Productivity' },
        { label: 'Extension', a: 'Training for practical adoption', b: 'Knowledge on the farm' },
        { label: 'Finance and insurance', a: 'Capital and risk cover', b: 'Investment' },
        { label: 'Standards and testing', a: 'Standards and test results', b: 'Market access' },
        { label: 'Public infrastructure', a: 'Irrigation and roads', b: 'Productivity and market access' },
      ],
      note: 'Separate policy targets, research evidence and commercial outcomes.',
      takeaway: 'Institutions influence productivity, investment, knowledge and market access through distinct roles.',
    },
  },
};
