import type { HealthcareProductsChapterVisual } from './healthcareProductsVisualSpecs';

/** Chapter-specific Learning Visuals for Healthcare Products & Nutrition Module 01, keyed by visualKind. */
export const HEALTHCARE_PRODUCTS_M1_VISUALS: Record<string, HealthcareProductsChapterVisual> = {
  'healthcare-products-m1-1': {
    heading: 'Intended use sorts health products into distinct families',
    intro: 'The industry spans products for health maintenance, disease prevention, nutritional adequacy, recovery or defined needs. Each family is classified by its composition, intended use and claims.',
    spec: {
      layout: 'taxonomy', title: '01 What Is the Healthcare Products & Nutrition Industry?', kicker: '',
      root: 'Health need and intended use', rootDetail: 'Decide the product family before strategy',
      groups: [
        { label: 'Therapeutic support', detail: 'Supports disease prevention or recovery', items: ['Medicines', 'Devices'] },
        { label: 'Supplements', detail: 'Health maintenance alongside the diet', items: ['Vitamin and mineral supplements'] },
        { label: 'Fortified food', detail: 'Everyday foods aimed at nutritional adequacy' },
        { label: 'Specialized nutrition', detail: 'Formulated for defined needs' },
      ],
      note: 'Codex CXG 55-2005 applies to vitamin and mineral supplements regulated as foods and does not cover foods for special dietary uses.',
      takeaway: 'Commercial strategy must begin with the target health need and legal product category, because related products face very different evidence, claim, quality and channel requirements.',
    },
  },
  'healthcare-products-m1-2': {
    heading: 'A dietary supplement and a medical nutrition product follow different rules',
    intro: 'Both are nutrition products, but product classification gives them different purposes, users and use conditions. The legal category is what makes a health product unique.',
    spec: {
      layout: 'compare', title: '02 What Makes Healthcare and Nutrition Products Unique?', kicker: '',
      leftTitle: 'Dietary supplement', rightTitle: 'Medical nutrition',
      rows: [
        { label: 'Purpose', a: 'Supplements the everyday diet', b: 'Dietary management of defined medical needs' },
        { label: 'Intended user', a: 'General consumers', b: 'People with a defined medical need' },
        { label: 'Use conditions', a: 'As labelled for its food category', b: 'Under its classification and use conditions' },
        { label: 'Reference point', a: 'Codex guidance where regulated as food', b: 'Its own applicable classification rules' },
      ],
      note: 'Product classification is assigned from intended use, composition, claims and other factors, so similar ingredients can sit in different categories.',
      takeaway: 'Start from the health need and legal category: related products can face very different evidence, claim, quality and channel requirements.',
    },
  },
  'healthcare-products-m1-3': {
    heading: 'What the curriculum covers and where it stops',
    intro: 'The curriculum covers healthcare-related consumer products and nutrition within their actual classifications. Prescription medicines, medical devices, clinical treatment and healthcare delivery appear only to explain a boundary.',
    spec: {
      layout: 'taxonomy', title: '03 Where Does the Industry Begin and End?', kicker: '',
      root: 'Industry boundary', rootDetail: 'Set by each product’s actual classification',
      groups: [
        { label: 'Core: consumer products', items: ['Dietary supplement', 'Functional food', 'Fortified food', 'Consumer health'] },
        { label: 'Core: defined medical needs', items: ['Medical nutrition'] },
        { label: 'Boundary reference only', detail: 'Used to explain where the scope ends', items: ['Prescription medicine', 'Medical device', 'Clinical treatment', 'Healthcare delivery'] },
      ],
      note: 'A vitamin supplement, fortified food and medical-nutrition product can address related needs while following different evidence, labeling and use conditions. In Vietnam, classify under current Vietnamese rules rather than importing another jurisdiction’s category.',
      takeaway: 'Dietary supplements and functional foods are not medicines, and general nutrition is not medical nutrition; classification, evidence, claims and channels differ by product and jurisdiction.',
    },
  },
  'healthcare-products-m1-4': {
    heading: 'What decides a product’s legal category and claim type',
    intro: 'Classification depends on intended use, composition, presentation, claims and jurisdiction. Nutrient content, health and disease claims carry different evidence and legal implications.',
    spec: {
      layout: 'driverTree', title: '04 Understanding Product Categories and Regulatory Classifications', kicker: '',
      root: { label: 'Product classification', detail: 'The legal category under applicable rules' },
      drivers: [
        { label: 'Intended use', detail: 'Purpose the product is designed and represented for' },
        { label: 'Composition', detail: 'Ingredients and amounts in the finished product' },
        { label: 'Presentation and claims', detail: 'Each claim type has different evidence needs', children: [{ label: 'Nutrient content claim' }, { label: 'Health claim' }, { label: 'Disease claim' }] },
        { label: 'Target population', detail: 'Who the product is meant for' },
        { label: 'Jurisdiction', detail: 'The country whose rules apply' },
      ],
      note: 'Evidence about an ingredient does not automatically substantiate the finished product, formulation, serving, population or claimed outcome.',
      takeaway: 'Registration or notification is not clinical proof of efficacy, safety is not guaranteed benefit, and a marketing statement is not scientific evidence.',
    },
  },
  'healthcare-products-m1-5': {
    heading: 'Who stands between a health need and a purchase',
    intro: 'Consumers are segmented by need, age or population, supervision, occasion and channel. Professionals and channels shape what is bought, and every claim made along the way must be substantiated.',
    spec: {
      layout: 'ecosystem', title: '05 Who Are the Industry\'s Consumers, Buyers and Stakeholders?', kicker: '',
      center: { label: 'User with a health need', detail: 'Preventive, recovery or defined-need occasion' },
      actors: [
        { label: 'Hospitals and clinics', relation: 'Professional supervision for defined needs', flows: ['service', 'information'] },
        { label: 'Pharmacies', relation: 'Advise and sell where the category permits', flows: ['product', 'information'] },
        { label: 'Retailers and e-commerce', relation: 'Reach households for everyday needs', flows: ['product', 'money'] },
        { label: 'Direct channels', relation: 'Communicate only permitted messages', flows: ['information', 'money'] },
        { label: 'Product owner', relation: 'Substantiates each claim to its category rules', flows: ['product', 'risk'] },
      ],
      note: 'A general vitamin supplement, infant formula and disease-related nutrition product may reach overlapping households but are not interchangeable products or regulatory pathways.',
      takeaway: 'Health need drives demand, while classification and purchase context determine evidence, professional involvement, communication and route to market.',
    },
  },
  'healthcare-products-m1-6': {
    heading: 'From traditional practice to evidence-led development',
    intro: 'The industry progressed from traditional remedies and basic supplementation toward modern nutritional science, quality systems and regulated information. Historical use still informs research but no longer substitutes for evidence.',
    spec: {
      layout: 'compare', title: '06 How Did Nutritional Science and Standardized Products Develop?', kicker: '',
      leftTitle: 'Traditional practice', rightTitle: 'Evidence-led development',
      rows: [
        { label: 'Starting point', a: 'Traditional remedies', b: 'Modern nutritional science' },
        { label: 'Product form', a: 'Basic supplementation', b: 'Standardized, targeted formulations' },
        { label: 'Quality basis', a: 'Before formal quality systems', b: 'Quality systems such as WHO GMP guidance' },
        { label: 'Role today', a: 'Can guide research', b: 'Required for market entry and communication' },
      ],
      note: 'WHO GMP guidance formalizes quality management, personnel, hygiene, validation and complaint handling for medical-product manufacturing.',
      takeaway: 'Products have become more standardized, specialized and evidence-led, while consumer demand still favors simple, convenient health propositions.',
    },
  },
  'healthcare-products-m1-7': {
    heading: 'How supplements moved from nutrient discovery to digital shelves',
    intro: 'Supplements grew out of nutrient discovery and basic supplementation, then became more targeted. Digital commerce now widens access, while demand still favors simple, convenient propositions.',
    spec: {
      layout: 'timeline', title: '07 How Did Supplements and Specialized Nutrition Evolve?', kicker: '',
      events: [
        { period: 'Early', label: 'Nutrient discovery', detail: 'Nutritional science identifies nutrient needs', status: 'historical' },
        { period: 'Next', label: 'Basic supplementation', detail: 'Simple vitamin and mineral products', status: 'historical' },
        { period: 'Later', label: 'Targeted formulations', detail: 'Specialized nutrition for defined needs', status: 'historical' },
        { period: 'Now', label: 'Digital commerce', detail: 'Online access to simple, convenient propositions', status: 'current' },
      ],
      note: 'Periods describe the direction of change, not dated milestones. Each stage still needs current classification, evidence and quality before market entry.',
      takeaway: 'The industry has moved toward standardized, specialized and evidence-led products, while consumers still favor simple, convenient health propositions.',
    },
  },
  'healthcare-products-m1-8': {
    heading: 'One quality foundation, applied by product type',
    intro: 'Manufacturing and safety systems became formalized through quality management, hygiene, validation and complaint handling. Which standard applies to fortified or targeted nutrition products depends on their classification.',
    spec: {
      layout: 'pathway', title: '08 How Did Consumer Health Manufacturing and Safety Systems Develop?', kicker: '',
      trunk: [
        { label: 'Formalized quality systems', detail: 'Quality management, personnel, hygiene, validation' },
        { label: 'Complaint handling', detail: 'Problems are recorded and acted on' },
      ],
      optionsLabel: 'Standard applied depends on classification — alternatives, not steps',
      options: [
        { label: 'Fortification', detail: 'Fortified foods follow their food-category rules' },
        { label: 'Targeted nutrition', detail: 'Specialized formulations follow their own category' },
        { label: 'Medical products', detail: 'Pharmaceutical and medical-product GMP guidance' },
      ],
      note: 'WHO GMP guidance covers medical-product manufacturing; the applicable standard depends on product classification and jurisdiction.',
      takeaway: 'Standardized manufacturing and safety systems underpin specialized, evidence-led products, even where demand favors simple propositions.',
    },
  },
  'healthcare-products-m1-9': {
    heading: 'In Vietnam, historical use guides research but not market entry',
    intro: 'Historical use can guide research. Market entry and communication still require current classification, evidence, standard manufacturing quality and any applicable authorization.',
    spec: {
      layout: 'decision', title: '09 How Has Vietnam\'s Healthcare Products and Nutrition Industry Developed?', kicker: '',
      root: { label: 'Product with historical use', detail: 'Traditional remedy or long-used formulation' },
      question: 'Does it meet current classification, evidence, quality and authorization requirements?',
      branches: [
        { condition: 'All requirements met', outcome: 'Proceed to market entry', detail: 'Standard manufacturing and current authorization in place', tone: 'positive' },
        { condition: 'Evidence or quality gaps', outcome: 'Use history to guide research', detail: 'Build evidence and quality before launch', tone: 'caution' },
        { condition: 'Category unclear', outcome: 'Do not launch or communicate yet', detail: 'Classify under current rules first', tone: 'negative' },
      ],
      note: 'Law on Pharmacy No. 105/2016/QH13 (effective 1 January 2017) covers registration, quality and advertising for medicines; verify current amendments and implementing rules.',
      takeaway: 'Development has moved toward standardized, evidence-led products, so history alone cannot carry a product to market.',
    },
  },
  'healthcare-products-m1-10': {
    heading: 'Each global segment answers to a different framework',
    intro: 'The global market is a set of distinct segments shaped by disease burden, healthcare financing, wellness spending, clinical practice, regulation, access and supply chains. Medicines and supplements are governed by different reference frameworks.',
    spec: {
      layout: 'table', title: '10 How Is the Global Healthcare Products and Nutrition Market Structured?', kicker: '',
      headers: ['Segment', 'Global reference', 'Healthcare access shaped by'],
      rows: [
        { label: 'Medicines', a: 'WHO medical-product regulatory guidance', b: 'Healthcare financing and clinical practice' },
        { label: 'Vitamin and mineral supplements', a: 'Codex guidance, where regulated as foods', b: 'Wellness spending and retail access' },
        { label: 'Specialized nutrition', a: 'National classification and use conditions', b: 'Disease burden and clinical practice' },
      ],
      note: 'Codex supplement guidance applies only where vitamin and mineral supplements are regulated as foods.',
      takeaway: 'A single headline market figure is misleading unless included products, geography, period, channel and revenue basis are explicit.',
    },
  },
  'healthcare-products-m1-11': {
    heading: 'Market metrics that must not be read as one another',
    intro: 'Market estimates can include different products, channels, prescription status, geographies and revenue bases. Supplement, nutrition, OTC and pharmaceutical estimates are not additive.',
    spec: {
      layout: 'compare', title: '11 How Are Healthcare and Nutrition Markets Measured?', kicker: '',
      leftTitle: 'What the figure measures', rightTitle: 'What it does not show',
      rows: [
        { label: 'Revenue', a: 'Market revenue', b: 'Manufacturer profit' },
        { label: 'Sales basis', a: 'Retail sales', b: 'Manufacturer revenue' },
        { label: 'Approval', a: 'Product registration', b: 'Actual use' },
        { label: 'Awareness', a: 'Consumer awareness', b: 'Efficacy' },
        { label: 'Reach', a: 'Patient reach', b: 'Clinical outcome' },
      ],
      note: 'A retail supplement estimate and a hospital medical-nutrition estimate can overlap or use different channels; state category, jurisdiction, channel, period, currency and revenue basis before comparing.',
      takeaway: 'Market revenue is not manufacturer profit, registration is not use, awareness is not efficacy and patient reach is not clinical outcome.',
    },
  },
  'healthcare-products-m1-12': {
    heading: 'Global supplement demand is context until local tests pass',
    intro: 'Supplement demand differs by segment and region. Use global segment evidence as context, then test local classification, affordability, professional practice, channel maturity and supply feasibility.',
    spec: {
      layout: 'decision', title: '12 Which Product Segments and Regions Drive Demand?', kicker: '',
      root: { label: 'Global supplement segment evidence', detail: 'Products, region, period and revenue basis stated' },
      question: 'Does the demand hold under local conditions?',
      branches: [
        { condition: 'Local tests pass', outcome: 'Treat as a local demand signal', detail: 'Classification, affordability and supply confirmed', tone: 'positive' },
        { condition: 'Channel or price gaps', outcome: 'Adapt before planning volume', detail: 'Channel maturity or affordability differs', tone: 'caution' },
        { condition: 'Category differs locally', outcome: 'Do not transfer the figure', detail: 'Reclassify under local rules first', tone: 'negative' },
      ],
      note: 'Global segments are shaped by disease burden, healthcare financing, aging, wellness spending, clinical practice, regulation, access and supply chains.',
      takeaway: 'A headline supplement figure misleads unless included products, geography, period, channel and revenue basis are explicit.',
    },
  },
  'healthcare-products-m1-13': {
    heading: 'The participant roles behind specialized nutrition worldwide',
    intro: 'Specialized nutrition reaches users through several types of participant, each shaped by clinical practice, healthcare financing, regulation and supply chains. Identify the role before comparing participants or market figures.',
    spec: {
      layout: 'taxonomy', title: '13 Who Are the Major Global Participant Types?', kicker: '',
      root: 'Specialized nutrition participants', rootDetail: 'Role types — one organization may hold several',
      groups: [
        { label: 'Product makers', detail: 'Formulate and manufacture to category standards' },
        { label: 'Clinical practice', detail: 'Professionals who recommend or supervise use' },
        { label: 'Healthcare financing', detail: 'Payment that affects access' },
        { label: 'Regulators', detail: 'Classify products and oversee requirements' },
        { label: 'Supply chains', detail: 'Move products to institutions and users' },
      ],
      note: 'Codex supplement guidance excludes foods for special dietary uses, so specialized nutrition participants follow their own category rules.',
      takeaway: 'Participant and market figures mislead unless included products, geography, period, channel and revenue basis are explicit.',
    },
  },
  'healthcare-products-m1-14': {
    heading: 'Need, access and evidence jointly set medical nutrition demand',
    intro: 'Demand for medical nutrition depends on more than the number of people with a need. Disease burden, healthcare financing, clinical practice, regulation and supply chains all shape it.',
    spec: {
      layout: 'driverTree', title: '14 How Do Health Needs, Access and Evidence Shape Demand?', kicker: '',
      root: { label: 'Medical nutrition demand', detail: 'Dietary management of defined medical needs' },
      drivers: [
        { label: 'Health need', detail: 'Who has a defined medical need', children: [{ label: 'Disease burden' }, { label: 'Aging' }] },
        { label: 'Access', detail: 'Whether users can obtain the product', children: [{ label: 'Healthcare financing' }, { label: 'Supply chains' }] },
        { label: 'Evidence and practice', detail: 'Whether professionals support its use', children: [{ label: 'Clinical practice' }, { label: 'Use conditions' }] },
        { label: 'Regulation', detail: 'Classification decides the permitted pathway' },
      ],
      note: 'A hospital medical-nutrition estimate can overlap with or differ from retail supplement estimates; keep the scope explicit.',
      takeaway: 'A single headline demand figure is misleading unless included products, geography, period, channel and revenue basis are explicit.',
    },
  },
  'healthcare-products-m1-15': {
    heading: 'Vietnam’s healthcare product ecosystem around the consumer',
    intro: 'Vietnam’s market combines public and private care providers, pharmacies, retail, digital commerce, domestic manufacturing and imports. Different laws govern medicines and food categories.',
    spec: {
      layout: 'ecosystem', title: '15 What Does Vietnam\'s Healthcare Products and Nutrition Ecosystem Look Like?', kicker: '',
      center: { label: 'Vietnamese patients and consumers', detail: 'Across many product categories' },
      actors: [
        { label: 'Public and private care', relation: 'Providers that treat, advise and supervise', flows: ['service', 'information'] },
        { label: 'Pharmacies', relation: 'Dispense medicines and sell health products', flows: ['product', 'money'] },
        { label: 'Retail and digital commerce', relation: 'Sell permitted categories to households', flows: ['product', 'money'] },
        { label: 'Domestic manufacturing', relation: 'Produces products locally', flows: ['product'] },
        { label: 'Importers', relation: 'Bring in products made abroad', flows: ['product', 'risk'] },
        { label: 'Regulators', relation: 'Pharmacy Law and food-safety rules', flows: ['oversight'] },
      ],
      note: 'Pharmacy Law 105/2016/QH13 (effective 01 Jan 2017) covers medicines and pharmacy activity; the consolidated Food Safety Law (15 Aug 2025) and Decree 15/2018 govern relevant food categories.',
      takeaway: 'Vietnam opportunities require trusted, compliant and accessible products; brand awareness cannot substitute for authenticity, evidence, quality or regulatory readiness.',
    },
  },
  'healthcare-products-m1-16': {
    heading: 'Each Vietnamese product category has its own legal frame',
    intro: 'Demand in Vietnam flows through the pharmacy network and imports, but what can be sold depends on the category. Confirm registration or declaration, labeling and advertising duties per category before launch.',
    spec: {
      layout: 'table', title: '16 Which Product Categories and Consumer Needs Drive Demand?', kicker: '',
      headers: ['Category', 'Governing frame', 'Confirm before launch'],
      rows: [
        { label: 'Medicines', a: 'Pharmacy Law 105/2016/QH13', b: 'Registration, pharmacy business, advertising' },
        { label: 'Food categories incl. supplements', a: 'Food Safety Law and Decree 15/2018', b: 'Declaration, labeling, advertising' },
        { label: 'Imported foods', a: 'Decree 15/2018 import rules', b: 'Certificates and import inspection' },
      ],
      note: 'Pharmacy Law effective 01 Jan 2017; Food Safety Law consolidated 15 Aug 2025. Verify current amendments and category-specific duties.',
      takeaway: 'Vietnam opportunities need trusted, compliant and accessible products; brand awareness cannot replace authenticity, evidence, quality or regulatory readiness.',
    },
  },
  'healthcare-products-m1-17': {
    heading: 'Domestic and imported products pass the same trust test',
    intro: 'Vietnam’s market mixes domestic production and imports reaching users through hospitals, pharmacies, retail and digital commerce. Consumer trust depends on authenticity, evidence and quality, not origin or brand awareness.',
    spec: {
      layout: 'compare', title: '17 Who Are the Domestic and International Participants?', kicker: '',
      leftTitle: 'Domestic participants', rightTitle: 'International participants',
      rows: [
        { label: 'Supply source', a: 'Domestic production', b: 'Imports' },
        { label: 'Market entry', a: 'Current registration or declaration', b: 'Same, plus import documentation' },
        { label: 'Hospital channel', a: 'Category-permitted distribution', b: 'Category-permitted distribution via importer' },
        { label: 'Consumer trust', a: 'Earned by authenticity, evidence, quality', b: 'Same test; brand awareness is no substitute' },
      ],
      note: 'Decree 15/2018 covers declarations, certificates and import inspection for relevant food categories; Pharmacy Law 105/2016/QH13 covers medicines.',
      takeaway: 'Vietnam opportunities need trusted, compliant and accessible products; brand awareness alone cannot substitute for authenticity, evidence, quality or regulatory readiness.',
    },
  },
  'healthcare-products-m1-18': {
    heading: 'Access depends on every step from source to shelf',
    intro: 'Whether a product is made locally or imported, it reaches consumers only after market-access, labeling and distribution duties are met. Modern retail and digital channels are the last link, not a shortcut.',
    spec: {
      layout: 'flow', title: '18 How Do Manufacturing, Imports and Distribution Shape Access?', kicker: '',
      steps: [
        { label: 'Source the product', detail: 'Domestic production or import', owner: 'Manufacturer or importer' },
        { label: 'Register or declare', detail: 'Route set by the product category' },
        { label: 'Label and document', detail: 'Category-specific labeling and records' },
        { label: 'Distribute', detail: 'Pharmacies, modern retail and digital commerce', owner: 'Distributors and sellers' },
        { label: 'Post-market duties', detail: 'Traceability, complaints and privacy', kind: 'outcome' },
      ],
      note: 'Decree 15/2018 covers declarations, import inspection, labeling, advertising and traceability for relevant foods; the Food Safety Law was consolidated 15 Aug 2025.',
      takeaway: 'Access requires trusted, compliant products at every step; brand awareness alone cannot substitute for authenticity, evidence, quality or regulatory readiness.',
    },
  },
  'healthcare-products-m1-19': {
    heading: 'Legal milestones an e-commerce seller in Vietnam must track',
    intro: 'Selling health products online in Vietnam combines product, consumer-rights and personal-data duties. Each law has its own effective date and implementing rules.',
    spec: {
      layout: 'timeline', title: '19 What Regulatory and Commercial Constraints Shape Vietnam\'s Market?', kicker: '',
      events: [
        { period: '01 Jan 2017', label: 'Pharmacy Law effective', detail: 'Law 105/2016/QH13: registration, quality, advertising', status: 'historical' },
        { period: '1 July 2024', label: 'Consumer Rights Law effective', detail: 'Law 19/2023/QH15: product and transaction duties', status: 'historical' },
        { period: '15 Aug 2025', label: 'Food Safety Law consolidated', detail: '61/VBHN-VPQH; current decrees decide applicability', status: 'historical' },
        { period: '01 Jan 2026', label: 'Personal Data Law effective', detail: 'Law 91/2025/QH15: duties depend on processing role', status: 'current' },
      ],
      note: 'For e-commerce, confirm registration or declaration, labeling, advertising, privacy and post-market duties for each category before launch, and verify current amendments.',
      takeaway: 'Vietnam opportunities require trusted, compliant and accessible products; brand awareness cannot substitute for authenticity, evidence, quality or regulatory readiness.',
    },
  },
  'healthcare-products-m1-20': {
    heading: 'Demographic change drives demand; oversight shapes what can meet it',
    intro: 'Aging, changing health patterns and nutrition awareness raise demand. Professional recommendation and regulatory oversight determine which products can serve which target users.',
    spec: {
      layout: 'driverTree', title: '20 How Do Demographics and Nutrition Needs Affect Demand?', kicker: '',
      root: { label: 'Demand from demographics and nutrition needs', detail: 'Need plus the conditions to act on it' },
      drivers: [
        { label: 'Demographic change', detail: 'Who needs what', children: [{ label: 'Aging' }, { label: 'Changing health patterns' }] },
        { label: 'Nutrition awareness', detail: 'Whether people recognize the need' },
        { label: 'Professional recommendation', detail: 'Whether use is guided' },
        { label: 'Regulatory oversight', detail: 'Product eligibility for target users', children: [{ label: 'Quality and safety' }, { label: 'Rational use information' }] },
      ],
      note: 'WHO notes that effective regulatory systems support product quality, safety, efficacy, rational use information and action on safety or quality issues.',
      takeaway: 'Growth reflects the interaction of health need, purchasing capacity, access, evidence and trust — not consumer interest alone.',
    },
  },
  'healthcare-products-m1-21': {
    heading: 'Need becomes adoption only when users can afford and reach the product',
    intro: 'Disease burden creates need, but insurance, out-of-pocket spending and access decide whether people adopt a product. Scenario planning should test price sensitivity and professional or retail access.',
    spec: {
      layout: 'decision', title: '21 How Do Income, Affordability and Access Shape Adoption?', kicker: '',
      root: { label: 'Product for a disease-burden need', detail: 'Eligible for its target users' },
      question: 'Can target users afford it and reach it through a suitable channel?',
      branches: [
        { condition: 'Affordable and accessible', outcome: 'Adoption is possible', detail: 'Insurance or out-of-pocket budget covers it', tone: 'positive' },
        { condition: 'Need high, price too high', outcome: 'Affordability barrier', detail: 'Test price sensitivity in scenarios', tone: 'caution' },
        { condition: 'No professional or retail access', outcome: 'Access barrier', detail: 'Need stays unmet regardless of interest', tone: 'negative' },
      ],
      note: 'Scenario planning should also test supply reliability, information quality and regulatory change.',
      takeaway: 'Growth reflects the interaction of health need, purchasing capacity, access, evidence and trust — not consumer interest alone.',
    },
  },
  'healthcare-products-m1-22': {
    heading: 'Information quality decides whether innovation builds trust',
    intro: 'Scientific progress and new diet and lifestyle patterns drive product innovation. Whether it creates lasting demand depends on accurate information rather than misinformation.',
    spec: {
      layout: 'compare', title: '22 How Are Science and Product Innovation Changing the Industry?', kicker: '',
      leftTitle: 'High information quality', rightTitle: 'Misinformation',
      rows: [
        { label: 'Source', a: 'Scientific progress and evidence', b: 'Unsupported health propositions' },
        { label: 'Diet and lifestyle', a: 'Choices guided by evidence', b: 'Choices driven by trends alone' },
        { label: 'Use', a: 'Rational use information', b: 'Inappropriate or unsafe use' },
        { label: 'Trust', a: 'Builds durable trust', b: 'Erodes trust when claims fail' },
      ],
      note: 'WHO emphasizes that effective regulatory systems support rational use information and action on safety or quality issues.',
      takeaway: 'Growth reflects the interaction of health need, purchasing capacity, access, evidence and trust — not consumer interest alone.',
    },
  },
  'healthcare-products-m1-23': {
    heading: 'What effective regulatory systems protect for patients',
    intro: 'WHO emphasizes that effective regulatory systems support product quality, safety, efficacy, rational use information and action on problems. These standards make healthcare access trustworthy.',
    spec: {
      layout: 'taxonomy', title: '23 Why Do Regulation, Safety and Evidence Standards Matter?', kicker: '',
      root: 'Effective regulatory system', rootDetail: 'Protections that make access trustworthy',
      groups: [
        { label: 'Product quality', detail: 'Consistent, conforming products' },
        { label: 'Safety', detail: 'Risks identified and managed' },
        { label: 'Efficacy', detail: 'Benefit supported by evidence' },
        { label: 'Rational use information', detail: 'Users know how to use products' },
        { label: 'Action on issues', detail: 'Response to safety or quality problems' },
      ],
      note: 'Pharmacy Law 105/2016/QH13 and the consolidated Food Safety Law govern different categories in Vietnam; check which applies.',
      takeaway: 'Growth reflects the interaction of health need, purchasing capacity, access, evidence and trust — not consumer interest alone.',
    },
  },
  'healthcare-products-m1-24': {
    heading: 'What to test for trust, information and supply risk',
    intro: 'Science and technology help manage trust and supply risk but do not replace regulation, surveillance and response. Scenario planning should test information quality, supply reliability, safety and regulatory change.',
    spec: {
      layout: 'table', title: '24 How Do Trust, Information Quality and Supply Risk Shape the Industry?', kicker: '',
      headers: ['Risk area', 'What to test', 'Reference'],
      rows: [
        { label: 'Information quality', a: 'Accurate, rational use information', b: 'WHO Regulatory Systems Strengthening' },
        { label: 'Supply risk', a: 'Supply reliability and traceability', b: 'WHO traceability policy paper' },
        { label: 'Safety', a: 'Adverse effects detected and assessed', b: 'WHO Pharmacovigilance' },
        { label: 'Regulatory change', a: 'Product eligibility under current rules', b: 'Pharmacy Law and Food Safety Law' },
      ],
      note: 'Traceability technology complements rather than replaces regulation, surveillance and response; not every food or supplement follows the same safety-reporting system.',
      takeaway: 'Growth reflects the interaction of health need, purchasing capacity, access, evidence and trust — not consumer interest alone.',
    },
  },
};
