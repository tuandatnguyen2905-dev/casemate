import type { MfgBuildingChapterVisual } from './mfgBuildingVisualSpecs';

/** Chapter-specific Learning Visuals for Building Materials & Coatings Module 02, keyed by visualKind. */
export const MFG_BUILDING_M2_VISUALS: Record<string, MfgBuildingChapterVisual> = {
  'mfg-building-m2-1': {
    heading: 'The value chain runs from resource supply through plants, dealers and specification to installed buildings',
    intro: 'The chain links minerals, metals, chemicals and energy to material plants, formulators, warehouses, dealers, projects, installers and building owners.',
    spec: {
      layout: 'flow', title: '01 How Does the Building-Materials Value Chain Work?', kicker: '',
      steps: [
        { label: 'Resource supply', detail: 'Minerals, metals, chemicals and energy' },
        { label: 'Production', detail: 'Material plants and formulators' },
        { label: 'Warehousing and dealers', detail: 'Stock kept close to buyers' },
        { label: 'Specification', detail: 'Projects select products and systems', kind: 'decision' },
        { label: 'Installation', detail: 'Installers apply products on site' },
        { label: 'Building in use', detail: 'Owners rely on lifecycle performance', kind: 'outcome' },
      ],
      note: 'Cement leans on quarries, kilns and regional bulk logistics; coatings lean more on formulation, packaging, brand, dealer stock and application support.',
      takeaway: 'Value is created across resources, production, logistics, product selection, installation and lifecycle support.',
    },
  },
  'mfg-building-m2-2': {
    heading: 'Five groups of participants stand between raw resources and an installed product',
    intro: 'Participants differ by category: map the ones that matter for each product instead of imposing one value-chain model on all of them.',
    spec: {
      layout: 'taxonomy', title: '02 Who Participates From Resources to Installed Product?', kicker: '',
      root: 'Value-chain participants', rootDetail: 'Roles — one firm may hold several',
      groups: [
        { label: 'Resource suppliers', items: ['Minerals', 'Metals', 'Chemicals', 'Energy'] },
        { label: 'Manufacturing', detail: 'Turns inputs into products', items: ['Material plants', 'Formulators'] },
        { label: 'Distribution', items: ['Warehouses', 'Dealers'] },
        { label: 'Application', detail: 'Turns products into installed results', items: ['Projects', 'Installers'] },
        { label: 'End users', items: ['Building owners'] },
      ],
      note: 'Map category-specific participants and bottlenecks; cement and coatings chains look very different.',
      takeaway: 'Value is created across resources, production, logistics, product selection, installation and lifecycle support.',
    },
  },
  'mfg-building-m2-3': {
    heading: 'Products move toward the building while money flows back and information and maintenance service flow both ways',
    intro: 'Around each manufacturer, physical products, payments, technical information and maintenance support move between different partners.',
    spec: {
      layout: 'ecosystem', title: '03 How Do Materials, Products, Information and Money Flow?', kicker: '',
      center: { label: 'Material plant or formulator', detail: 'Converts inputs into products' },
      actors: [
        { label: 'Resource suppliers', relation: 'Deliver minerals, metals, chemicals, energy; get paid', flows: ['product', 'money'] },
        { label: 'Warehouses and dealers', relation: 'Distribute stock; pay for product', flows: ['product', 'money'] },
        { label: 'Projects', relation: 'Specify and buy; receive technical data', flows: ['information', 'money'] },
        { label: 'Installers', relation: 'Apply products with manufacturer support', flows: ['service', 'information'] },
        { label: 'Building owners', relation: 'Maintain the installed result', flows: ['service', 'risk'] },
      ],
      takeaway: 'Value is created across resources, production, logistics, product selection, installation and lifecycle support, including distribution and maintenance.',
    },
  },
  'mfg-building-m2-4': {
    heading: 'Production draws on minerals, metals, chemical feedstocks, packaging, utilities and equipment',
    intro: 'Inputs range from limestone, clay and sand to resins, pigments and additives, plus packaging, utilities and production equipment.',
    spec: {
      layout: 'taxonomy', title: '04 What Raw Materials and Chemical Feedstocks Are Required?', kicker: '',
      root: 'Inputs to building-material production', rootDetail: 'Input groups, sourced locally or imported',
      groups: [
        { label: 'Minerals', items: ['Limestone', 'Clay', 'Gypsum', 'Sand', 'Aggregates'] },
        { label: 'Metals and glass inputs', items: ['Metals', 'Glass inputs'] },
        { label: 'Chemical feedstocks', items: ['Resins', 'Pigments', 'Solvents', 'Additives'] },
        { label: 'Energy and water', detail: 'Utilities for plants' },
        { label: 'Packaging and equipment', items: ['Packaging', 'Production equipment'] },
      ],
      note: 'Balance local resources and imported specialty inputs through specifications, testing, supplier audits, alternatives and inventory policy.',
      takeaway: 'Input sourcing controls cost, consistency, compliance and environmental exposure.',
    },
  },
  'mfg-building-m2-5': {
    heading: 'Supplier quality is managed through specifications, qualification, testing, alternatives and inventory policy',
    intro: 'Manufacturers balance local resources and imported specialty inputs, including metals and recycled inputs, through a disciplined sourcing routine.',
    spec: {
      layout: 'flow', title: '05 How Are Extraction, Procurement and Supplier Quality Managed?', kicker: '',
      steps: [
        { label: 'Set input specifications', detail: 'Define what each input must achieve' },
        { label: 'Qualify suppliers', detail: 'Audit local and imported sources' },
        { label: 'Test incoming inputs', detail: 'Check consistency before use' },
        { label: 'Approve alternatives', detail: 'Second sources for critical inputs', kind: 'decision' },
        { label: 'Set inventory policy', detail: 'Buffer against supply gaps', kind: 'outcome' },
      ],
      loop: 'Test results and supplier audits feed back into specifications and supplier approval.',
      takeaway: 'Input sourcing controls cost, consistency, compliance and environmental exposure.',
    },
  },
  'mfg-building-m2-6': {
    heading: 'Input-cost risk combines energy, water and specialty-input prices with the hidden cost of inconsistent quality',
    intro: 'A low-cost pigment or resin can raise hidden cost if colour, weatherability, adhesion or compliance becomes inconsistent.',
    spec: {
      layout: 'driverTree', title: '06 How Do Energy, Water and Input-Cost Risks Affect Production?', kicker: '',
      root: { label: 'Input-cost risk in production', detail: 'Price paid plus cost of inconsistency' },
      drivers: [
        { label: 'Energy', detail: 'Utility cost and availability' },
        { label: 'Water', detail: 'Utility input for plants', op: '+' },
        { label: 'Resins and pigments', detail: 'Specialty inputs, often imported', op: '+', children: [{ label: 'Purchase price' }, { label: 'Supply continuity' }] },
        { label: 'Hidden quality cost', detail: 'When cheap inputs perform inconsistently', op: '+', children: [{ label: 'Colour' }, { label: 'Weatherability' }, { label: 'Adhesion' }, { label: 'Compliance' }] },
      ],
      note: 'Procurement resilience comes from specifications, testing, supplier audits, alternatives and inventory policy.',
      takeaway: 'Input sourcing controls cost, consistency, compliance and environmental exposure.',
    },
  },
  'mfg-building-m2-7': {
    heading: 'Quarried minerals become clinker, then cement, which becomes one input into concrete',
    intro: 'Cement production converts mineral feedstocks through clinker and grinding. Concrete batching combines cement, aggregates, water and admixtures; aggregates are extracted and processed separately.',
    spec: {
      layout: 'flow', title: '07 How Are Cement, Clinker, Concrete and Aggregates Produced?', kicker: '',
      steps: [
        { label: 'Quarry', detail: 'Extract mineral feedstocks' },
        { label: 'Raw meal', detail: 'Prepare the kiln feed' },
        { label: 'Kiln and clinker', detail: 'Clinker can also be sold as is' },
        { label: 'Cement grinding', detail: 'Clinker ground with other constituents' },
        { label: 'Concrete batching', detail: 'Cement, aggregates, water and admixtures', kind: 'outcome' },
      ],
      loop: 'Quality control and product-specific tests apply at each stage.',
      note: 'Aggregate processing runs as a separate extraction chain that feeds concrete batching.',
      takeaway: 'These related products do not share one universal process, unit or cost structure.',
    },
  },
  'mfg-building-m2-8': {
    heading: 'Ceramics and glass share raw-material preparation, then split into firing or rolling and tempering',
    intro: 'High-temperature production covers crushing, grinding, kilns, casting, rolling, firing and tempering, followed by performance testing and packaging.',
    spec: {
      layout: 'pathway', title: '08 How Are Ceramics and Construction Glass Manufactured?', kicker: '',
      trunk: [
        { label: 'Crushing and grinding', detail: 'Prepare raw materials' },
      ],
      optionsLabel: 'High-temperature routes — by product',
      options: [
        { label: 'Ceramics', detail: 'Casting, then firing in kilns' },
        { label: 'Construction glass', detail: 'Rolling, then tempering' },
      ],
      afterLabel: 'Then, for both',
      after: [
        { label: 'Performance testing', detail: 'Laboratories and batch traceability' },
        { label: 'Packaging', detail: 'Reliable output ready to ship', kind: 'outcome' },
      ],
      note: 'Process optimisation (automation, preventive maintenance and energy management) converts capacity into reliable output.',
      takeaway: 'Scale lowers unit cost only when process control, quality and utilization remain disciplined.',
    },
  },
  'mfg-building-m2-9': {
    heading: 'A coating is formulated and batch-tested in the factory, but its performance is completed on site',
    intro: 'Coatings and chemicals are formulated systems. Their performance depends on ingredients, dispersion and batch control, and also on substrate, preparation and application.',
    spec: {
      layout: 'flow', title: '09 How Are Paints, Protective Coatings and Construction Chemicals Formulated?', kicker: '',
      steps: [
        { label: 'Ingredients', detail: 'Resin or binder, pigment, solvent or water, additives', owner: 'Formulator' },
        { label: 'Dispersion and mixing', owner: 'Factory' },
        { label: 'Batch test', owner: 'Factory' },
        { label: 'Packaging', owner: 'Factory' },
        { label: 'Surface preparation', detail: 'Substrate condition matters', owner: 'Site' },
        { label: 'Application and curing', detail: 'Film thickness and curing decide the result', kind: 'outcome', owner: 'Applicator' },
      ],
      note: 'A protective coating can fail despite correct factory formulation when surface preparation, film thickness or curing is unsuitable.',
      takeaway: 'Factory conformance or certification does not guarantee installed performance under every surface and environment.',
    },
  },
  'mfg-building-m2-10': {
    heading: 'Factory output reaches buyers by bulk logistics, packaged wholesale or specification selling',
    intro: 'Distribution spans bulk and packaged logistics, depots, dealers and showrooms. Some products must also be specified into project requirements before purchasing.',
    spec: {
      layout: 'pathway', title: '10 How Are Bulk and Packaged Materials Distributed?', kicker: '',
      trunk: [
        { label: 'Factory output', detail: 'Bulk or packaged product' },
      ],
      optionsLabel: 'Routes to the buyer — alternatives, not steps',
      options: [
        { label: 'Bulk logistics', detail: 'Via depots to project sites' },
        { label: 'Packaged wholesale', detail: 'Via dealers and showrooms' },
        { label: 'Specification selling', detail: 'Selected in project requirements before purchasing' },
      ],
      afterLabel: 'Buyers',
      after: [
        { label: 'Contractors, developers, industrial customers', kind: 'outcome' },
      ],
      note: 'A protective coating may need surface assessment, samples, system specification and contractor training before a sale.',
      takeaway: 'Market access combines physical availability, credit, technical support and influence before procurement.',
    },
  },
  'mfg-building-m2-11': {
    heading: 'Dealer sales and project procurement are won and controlled in different ways',
    intro: 'Manufacturers develop dealer stock and project relationships while controlling credit, genuine products, delivery and application quality.',
    spec: {
      layout: 'compare', title: '11 How Do Dealers, Project Procurement and Site Delivery Work?', kicker: '',
      leftTitle: 'Retail and dealer channel', rightTitle: 'Project procurement and site delivery',
      rows: [
        { label: 'Main buyers', a: 'Contractors buying via dealers and showrooms', b: 'Developers, architects and consultants' },
        { label: 'What wins the sale', a: 'Dealer stock and availability', b: 'Influence before procurement' },
        { label: 'Key control', a: 'Credit and genuine products', b: 'Delivery to site' },
        { label: 'Application support', a: 'Guidance through the dealer', b: 'Direct support on the project' },
      ],
      takeaway: 'Market access combines physical availability, credit, technical support and influence before procurement.',
    },
  },
  'mfg-building-m2-12': {
    heading: 'Technical support runs from surface assessment to contractor training, with feedback improving the next project',
    intro: 'A protective coating may need surface assessment, samples, system specification and contractor training before a sale, and application quality must be controlled afterwards.',
    spec: {
      layout: 'flow', title: '12 How Do Application, Technical Support and After-Sales Interfaces Work?', kicker: '',
      steps: [
        { label: 'Surface assessment', detail: 'Check substrate and conditions' },
        { label: 'Samples', detail: 'Prove the product on site' },
        { label: 'System specification', detail: 'Define the full system', kind: 'decision' },
        { label: 'Contractor training', detail: 'Prepare the applicators' },
        { label: 'Application quality', detail: 'Control the installed result', kind: 'outcome' },
      ],
      loop: 'Customer feedback from direct projects informs the next assessment and specification.',
      takeaway: 'Market access combines physical availability, credit, technical support and influence before procurement.',
    },
  },
  'mfg-building-m2-13': {
    heading: 'Materials, energy, labor, equipment and capital are converted into commodities, finishes and technical systems',
    intro: 'Manufacturing converts materials, energy, labor, equipment and capital into products that deliver building outcomes. Raw-material efficiency and durability decide how much value survives conversion.',
    spec: {
      layout: 'pathway', title: '13 What Resources Are Required to Manufacture Building Materials?', kicker: '',
      trunk: [
        { label: 'Inputs', detail: 'Materials, energy, labor, equipment, capital' },
        { label: 'Conversion', detail: 'Raw-material efficiency sets yield' },
      ],
      optionsLabel: 'Output types — alternatives, not steps',
      options: [
        { label: 'Commodities', detail: 'Bulk heavy materials' },
        { label: 'Finishes', detail: 'Surfaces and decoration' },
        { label: 'Technical systems', detail: 'e.g. waterproofing, anti-corrosion' },
      ],
      afterLabel: 'Result',
      after: [
        { label: 'Building outcomes', detail: 'Durability decides lasting value', kind: 'outcome' },
      ],
      takeaway: 'The best economic choice may not be the lowest cost per tonne, litre or square metre.',
    },
  },
  'mfg-building-m2-14': {
    heading: 'Yield, maintenance, quality, site and delay risks each add cost beyond the product price',
    intro: 'Cost is generated at the plant, in quality, on site and in project timing. Quantify each instead of judging on package price alone.',
    spec: {
      layout: 'table', title: '14 Where Are Yield Loss, Quality, Cost and Logistics Risks Generated?', kicker: '',
      headers: ['Risk point', 'Where it arises', 'Cost it creates'],
      rows: [
        { label: 'Energy and yield', a: 'Converting materials and energy at the plant', b: 'Higher cost per tonne, litre or m²' },
        { label: 'Equipment maintenance', a: 'Plant equipment and capital', b: 'Lost output and repair cost' },
        { label: 'Product quality', a: 'Inconsistent inputs or batches', b: 'Rework and failure risk' },
        { label: 'Preparation and waste', a: 'Application on site', b: 'Labor and wasted material' },
        { label: 'Logistics and delay', a: 'Late or failed delivery', b: 'Project-delay cost' },
      ],
      takeaway: 'The best economic choice may not be the lowest cost per tonne, litre or square metre.',
    },
  },
  'mfg-building-m2-15': {
    heading: 'Total installed cost, not package price, shows which product creates lifecycle advantage',
    intro: 'Total installed cost adds labor, equipment, preparation, waste and project delay to the product price. A durable system can win despite a higher initial product cost.',
    spec: {
      layout: 'driverTree', title: '15 How Do Product Performance and Lifecycle Value Create Advantage?', kicker: '',
      root: { label: 'Total installed cost', detail: 'Cost to achieve the installed result' },
      formula: 'Product + labor + equipment + preparation + waste + project delay',
      drivers: [
        { label: 'Product', detail: 'Purchase price of the material' },
        { label: 'Labor', detail: 'Application labor', op: '+' },
        { label: 'Equipment', detail: 'Tools and machinery on site', op: '+' },
        { label: 'Preparation', detail: 'Surface or substrate work', op: '+' },
        { label: 'Waste', detail: 'Material lost in application', op: '+' },
        { label: 'Project delay', detail: 'Cost of slower or repeated work', op: '+' },
      ],
      note: 'Also quantify expected life, maintenance, failure risk and compliance: a durable waterproofing or anti-corrosion system can reduce rework and maintenance.',
      takeaway: 'The best economic choice may not be the lowest cost per tonne, litre or square metre.',
    },
  },
  'mfg-building-m2-16': {
    heading: 'Heavy materials localise near demand while specialty inputs and know-how move across borders',
    intro: 'Global networks combine localised cement, steel, tiles, glass and paints with imported resins, pigments, additives, equipment or know-how where needed.',
    spec: {
      layout: 'compare', title: '16 How Do Global Building-Materials Networks Operate?', kicker: '',
      leftTitle: 'Localised near demand', rightTitle: 'Moves internationally',
      rows: [
        { label: 'Typical items', a: 'Cement, steel, tiles, glass, paints', b: 'Resins, pigments, additives, equipment, know-how' },
        { label: 'Why', a: 'Heavy materials tend to stay near demand', b: 'High-value formulation inputs' },
        { label: 'Competitive edge', a: 'Domestic scale', b: 'Access to specialised technology' },
        { label: 'Export compliance', a: 'Documentation for export markets', b: 'Documentation for imported inputs' },
      ],
      note: 'The revised EU construction-products framework includes digital product information, which affects documentation for exports to that market.',
      takeaway: 'Competitive local value chains combine domestic scale with reliable access to specialised global inputs and technology.',
    },
  },
  'mfg-building-m2-17': {
    heading: "Vietnam's value chain combines domestic scale, imported specialty inputs, technology upgrading and export access",
    intro: 'Vietnam produces cement, steel, tiles, glass and paints locally while importing specialty resins, pigments, additives, equipment or know-how. Upgrading strengthens the whole chain.',
    spec: {
      layout: 'driverTree', title: "17 How Does Vietnam's Building-Materials Value Chain Work?", kicker: '',
      root: { label: 'Vietnamese value-chain competitiveness', detail: 'Scale plus specialised access' },
      drivers: [
        { label: 'Domestic scale', detail: 'Local heavy materials and finishes', children: [{ label: 'Cement and steel' }, { label: 'Tiles and glass' }, { label: 'Paints' }] },
        { label: 'Imported specialty inputs', detail: 'Where local supply is limited', children: [{ label: 'Resins and pigments' }, { label: 'Additives' }, { label: 'Equipment and know-how' }] },
        { label: 'Technology upgrading', detail: 'Plant and lab capability', children: [{ label: 'Laboratories' }, { label: 'Automation' }, { label: 'Energy efficiency' }, { label: 'Formulation' }] },
        { label: 'Export access', detail: 'Preserve market entry', children: [{ label: 'Documentation' }, { label: 'Supplier diversity' }] },
      ],
      takeaway: 'Competitive local value chains combine domestic scale with reliable access to specialised global inputs and technology.',
    },
  },
  'mfg-building-m2-18': {
    heading: 'Whether to localise or import depends on how heavy the material is and how concentrated its supply is',
    intro: 'Heavy materials tend to localise near demand while high-value formulation inputs can move internationally. Regional distribution and supply resilience shape the right choice.',
    spec: {
      layout: 'decision', title: '18 How Do Localization, Specialty Imports and Logistics Constraints Interact?', kicker: '',
      root: { label: 'An input or product needed in Vietnam', detail: 'Material, specialty input or equipment' },
      question: 'Is it a heavy material sold near demand, or a high-value specialty input?',
      branches: [
        { condition: 'Heavy material', outcome: 'Localise production and regional distribution', detail: 'Freight favours supply close to projects', tone: 'positive' },
        { condition: 'Specialty input, several suppliers', outcome: 'Import with qualified alternatives', detail: 'Supplier diversity protects continuity', tone: 'caution' },
        { condition: 'Specialty input, single source', outcome: 'Build resilience before relying on it', detail: 'Add alternatives and inventory buffers', tone: 'negative' },
      ],
      takeaway: 'Competitive local value chains combine domestic scale with reliable access to specialised global inputs and technology.',
    },
  },
};
