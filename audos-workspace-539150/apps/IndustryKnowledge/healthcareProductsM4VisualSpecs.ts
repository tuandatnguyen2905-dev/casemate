import type { HealthcareProductsChapterVisual } from './healthcareProductsVisualSpecs';

/** Chapter-specific Learning Visuals for Healthcare Products & Nutrition Module 04, keyed by visualKind. */
export const HEALTHCARE_PRODUCTS_M4_VISUALS: Record<string, HealthcareProductsChapterVisual> = {
  'healthcare-products-m4-1': {
    heading: 'Map competitors on product class, need, evidence, price, channel and professional role before comparing size',
    intro: 'Multinational healthcare companies and consumer health brands compete within or next to defined product categories. Competitive intensity only makes sense once the category is defined.',
    spec: {
      layout: 'table', title: '01 How Competitive Is Healthcare Products & Nutrition?', kicker: '',
      headers: ['Mapping lens', 'What to compare', 'Why it matters'],
      rows: [
        { label: 'Product class', a: 'The actual legal and product category', b: 'Advantage is category-specific' },
        { label: 'Intended need', a: 'The health or nutrition need served', b: 'Shows who really competes for the user' },
        { label: 'Evidence', a: 'Support behind each product', b: 'Wellness strength does not prove clinical capability' },
        { label: 'Price tier', a: 'Where each product is priced', b: 'Separates rivals from adjacent offers' },
        { label: 'Channel', a: 'Where the product is sold', b: 'Shared shelves can hide different capabilities' },
        { label: 'Professional involvement', a: 'Role of advice in selection', b: 'Changes the basis of competition' },
      ],
      note: 'Map competitors by these lenses before comparing scale or share.',
      takeaway: 'Competitive advantage is category-specific; strength in general wellness does not prove capability in clinical, pharmaceutical or specialized nutrition markets.',
    },
  },
  'healthcare-products-m4-2': {
    heading: 'The five forces act inside a defined category, so private label and specialized nutrition face different pressures',
    intro: 'Companies compete within or adjacent to defined product categories with different science, quality, regulatory, manufacturing, brand, channel and capital profiles. Apply each force to one category at a time.',
    spec: {
      layout: 'taxonomy', title: "02 How Do Porter's Five Forces Apply to These Products?", kicker: '',
      root: 'Five forces, applied per product category',
      rootDetail: 'Forces act together — not a sequence',
      groups: [
        { label: 'Rivalry', detail: 'Among companies in the same defined category' },
        { label: 'New entrants', detail: 'Slowed by science, quality, regulatory and capital profiles' },
        { label: 'Substitutes', detail: 'Products from adjacent categories meeting the same need' },
        { label: 'Buyer power', detail: 'Retailers reached by private label and specialists alike' },
        { label: 'Supplier power', detail: 'Manufacturing capability the brand depends on' },
      ],
      note: 'A private-label manufacturer and a medical-nutrition specialist may reach similar retailers but compete on very different capabilities.',
      takeaway: 'Competitive pressure is category-specific; the same forces bear differently on private label and specialized nutrition.',
    },
  },
  'healthcare-products-m4-3': {
    heading: 'Entry barriers come from four sources, whatever kind of company is entering',
    intro: 'A domestic manufacturer and a digital-first brand start from different science, quality, regulatory, manufacturing, brand and channel profiles. Each must still clear the same category barriers.',
    spec: {
      layout: 'driverTree', title: '03 What Creates Evidence, Regulation, Quality and Trust Barriers?', kicker: '',
      root: { label: 'Barrier to competing in a category', detail: 'Set by the product class, not by health interest' },
      drivers: [
        { label: 'Evidence', detail: 'Science that supports the product', children: [{ label: 'Science profile' }] },
        { label: 'Regulation', detail: 'Category-specific requirements', children: [{ label: 'Regulatory profile' }] },
        { label: 'Quality', detail: 'Consistent production', children: [{ label: 'Manufacturing profile' }, { label: 'Quality profile' }] },
        { label: 'Trust', detail: 'Reason for users and channels to choose', children: [{ label: 'Brand profile' }, { label: 'Channel profile' }] },
      ],
      note: 'A domestic manufacturer may start strong on manufacturing, a digital-first brand on channel; neither profile alone clears every barrier.',
      takeaway: 'Barriers are category-specific; strength in general wellness does not prove capability in clinical, pharmaceutical or specialized nutrition markets.',
    },
  },
  'healthcare-products-m4-4': {
    heading: 'In Vietnam, every participant type clears the same readiness checks before local execution decides demand',
    intro: 'Domestic and international companies, distributors and sellers all compete in Vietnam. Regulatory readiness comes first; local execution then decides whether quality and brand awareness become sustained demand.',
    spec: {
      layout: 'pathway', title: '04 Who Are the Major Global Participant Types?', kicker: '',
      trunk: [
        { label: 'Classification and documentation', detail: 'Confirm the product’s category and papers' },
        { label: 'Labeling and claims', detail: 'Regulatory readiness for the local market' },
      ],
      optionsLabel: 'Participant types competing locally — alternatives, not steps',
      options: [
        { label: 'Domestic business', detail: 'May compete on affordability, local insight and channel relationships' },
        { label: 'International brand', detail: 'May bring specialized technology' },
        { label: 'Distributor', detail: 'Provides channel access and supply' },
        { label: 'Online seller', detail: 'Must show authenticity' },
      ],
      afterLabel: 'Then local execution',
      after: [
        { label: 'Price architecture and channel access', detail: 'Validated before committing to scale' },
        { label: 'Sustained demand', detail: 'Quality and awareness turn into repeat demand', kind: 'outcome' },
      ],
      takeaway: 'Local execution determines whether quality and brand awareness become sustained demand in Vietnam.',
    },
  },
  'healthcare-products-m4-5': {
    heading: 'Branded, contract, ingredient and channel participants bring different strengths and face different checks',
    intro: 'International brands may bring specialized technology, while domestic companies may compete on affordability, local insight and channel relationships. Pharmacy-oriented businesses control a key route to buyers.',
    spec: {
      layout: 'table', title: '05 How Do Branded, Contract, Ingredient and Channel Participants Differ?', kicker: '',
      headers: ['Participant', 'Typical strength', 'What must be validated locally'],
      rows: [
        { label: 'International brand', a: 'Specialized technology and awareness', b: 'Classification, labeling and claims' },
        { label: 'Domestic brand', a: 'Affordability and local insight', b: 'Documentation and price architecture' },
        { label: 'Contract manufacturer', a: 'Production for others’ brands', b: 'Supply reliability' },
        { label: 'Ingredient participant', a: 'Inputs to formulations', b: 'Documentation behind each input' },
        { label: 'Pharmacy channel', a: 'Pharmacy-oriented access to buyers', b: 'Authenticity and channel access' },
      ],
      note: 'Validate classification, documentation, labeling, claims, authenticity, price architecture, channel access and supply before committing to scale.',
      takeaway: 'Local execution, not an international brand or pharmacy presence alone, determines whether quality and awareness become sustained demand in Vietnam.',
    },
  },
  'healthcare-products-m4-6': {
    heading: 'Products reach Vietnamese buyers through importers, distributors, pharmacies, retailers and online sellers',
    intro: 'Vietnam’s market is shaped by domestic and international companies, manufacturers, importers, distributors, pharmacy-oriented businesses, retailers and online sellers across distinct categories.',
    spec: {
      layout: 'ecosystem', title: "06 Which Manufacturers, Distributors and Retailers Shape Vietnam's Market?", kicker: '',
      center: { label: 'Buyer in Vietnam', detail: 'Choosing within one product category' },
      actors: [
        { label: 'Manufacturers', relation: 'Domestic or international source of the product', flows: ['product'] },
        { label: 'Importers', relation: 'Bring products in with documentation', flows: ['product', 'oversight'] },
        { label: 'Distributors', relation: 'Hold stock and supply sellers', flows: ['product', 'money'] },
        { label: 'Pharmacy-oriented businesses', relation: 'Sell with advice at the counter', flows: ['product', 'service'] },
        { label: 'Retailers', relation: 'Offer shelf access and price points', flows: ['product', 'money'] },
        { label: 'Online sellers', relation: 'Offer reach, with authenticity to prove', flows: ['product', 'risk'] },
      ],
      note: 'Validate classification, documentation, labeling, claims, authenticity, price architecture, channel access and supply before committing to scale.',
      takeaway: 'Local execution by importers and online sellers determines whether quality and brand awareness become sustained demand in Vietnam.',
    },
  },
  'healthcare-products-m4-7': {
    heading: 'A fair benchmark compares seven dimensions and refuses to treat price or placement as health value',
    intro: 'Companies compete through formulation, evidence, quality, price, pack, reputation, access, professional engagement, usability and service. Benchmark only permitted claims and category-relevant evidence.',
    spec: {
      layout: 'table', title: '07 How Should Healthcare Product Companies Be Compared?', kicker: '',
      headers: ['Benchmark dimension', 'Compare', 'Do not mistake for'],
      rows: [
        { label: 'Product differentiation', a: 'Formulation, pack and usability', b: 'Novelty for its own sake' },
        { label: 'Evidence', a: 'Category-relevant evidence for permitted claims', b: 'Scientific-sounding language' },
        { label: 'Affordability', a: 'Price against the benefit delivered', b: 'A low price as proof of value' },
        { label: 'Brand trust', a: 'Reputation built on quality', b: 'Awareness alone' },
        { label: 'Distribution', a: 'Reliable availability', b: 'Broad placement as health value' },
        { label: 'Professional relationship', a: 'Depth of professional engagement', b: 'Endorsement of every claim' },
        { label: 'Customer experience', a: 'Service and ease of use', b: 'Evidence of efficacy' },
      ],
      note: 'Scientific language does not make a claim credible; evidence must fit the product, claim, population and jurisdiction.',
      takeaway: 'The strongest position combines a meaningful benefit, credible substantiation, reliable availability and sustainable economics.',
    },
  },
  'healthcare-products-m4-8': {
    heading: 'Pharmacy, retail and trade spending create advantage only through four results',
    intro: 'Companies compete for pharmacy, provider, institutional, retail and digital access through terms, placement, information, inventory and authorized sellers. Reach matters only for what it produces.',
    spec: {
      layout: 'driverTree', title: '08 How Do Evidence, Quality, Portfolio, Price and Access Differ?', kicker: '',
      root: { label: 'Advantage from distribution reach', detail: 'Not the same as the number of outlets' },
      drivers: [
        { label: 'Appropriate availability', detail: 'In stock where the right user buys', children: [{ label: 'Pharmacy access' }, { label: 'Retail partnership' }] },
        { label: 'Product integrity', detail: 'Genuine and properly stored', children: [{ label: 'Authorized sellers' }, { label: 'Inventory handling' }] },
        { label: 'Sell-through visibility', detail: 'Information on what actually sells', children: [{ label: 'Partner information' }] },
        { label: 'Sustainable contribution', detail: 'Access that pays back', children: [{ label: 'Trade investment' }, { label: 'Channel terms' }] },
      ],
      note: 'Marketplace reach can improve discovery while increasing price transparency, unauthorized-seller and misleading-listing risk.',
      takeaway: 'Distribution reach creates advantage only when it produces appropriate availability, product integrity, sell-through visibility and sustainable contribution.',
    },
  },
  'healthcare-products-m4-9': {
    heading: 'Sustainable channel advantage rests on what a company tracks after the product leaves its hands',
    intro: 'Institutional access, online governance and sell-through analytics turn reach into durable advantage. Track downstream inventory, expiry, sell-through, listing accuracy, seller authorization, custody and contribution.',
    spec: {
      layout: 'taxonomy', title: '09 Which Trust, Supply and Economic Capabilities Create Sustainable Advantage?', kicker: '',
      root: 'What to track downstream',
      rootDetail: 'Capabilities run together, not in sequence',
      groups: [
        { label: 'Sell-through analytics', items: ['Downstream inventory', 'Actual sell-through', 'Expiry'] },
        { label: 'Online governance', items: ['Listing accuracy', 'Seller authorization'] },
        { label: 'Supply integrity', items: ['Product custody'] },
        { label: 'Economics', items: ['Channel contribution'] },
        { label: 'Institutional access', detail: 'Provider and institutional routes tracked as their own channel' },
      ],
      note: 'Marketplace reach can improve discovery while increasing price transparency, unauthorized-seller and misleading-listing risk.',
      takeaway: 'Distribution reach becomes sustainable advantage only with the trust, supply and economic visibility to confirm availability, integrity, sell-through and contribution.',
    },
  },
  'healthcare-products-m4-10': {
    heading: 'Quality, safety and evidence decide which products keep their place in the portfolio',
    intro: 'Portfolio choices span categories, populations, formats, price tiers and lifecycle stages. A core product must stay clear in use and evidence, and products that blur it are candidates for rationalization.',
    spec: {
      layout: 'decision', title: '10 Why Do Product Quality, Safety and Evidence Matter?', kicker: '',
      root: { label: 'A product in the portfolio', detail: 'Core product or later addition' },
      question: 'Does it share real capability or meet a complementary need without blurring intended use or evidence?',
      branches: [
        { condition: 'Core product with clear use and evidence', outcome: 'Keep and protect', detail: 'Its quality and evidence anchor the brand', tone: 'positive' },
        { condition: 'Adds complexity without a clear need', outcome: 'Rationalize', detail: 'Remove or merge to cut operational complexity', tone: 'caution' },
        { condition: 'Blurs use or evidence of other products', outcome: 'Separate or withdraw', detail: 'Keep distinctions in use, evidence and professional involvement', tone: 'negative' },
      ],
      note: 'A company selling wellness supplements and specialized nutrition should preserve clear distinctions in use, evidence and professional involvement.',
      takeaway: 'Portfolio expansion creates value only when products share meaningful capability or solve complementary needs without blurring intended use or evidence.',
    },
  },
  'healthcare-products-m4-11': {
    heading: 'Manufacturing, compliance and supply capability can extend into adjacent categories only under brand governance',
    intro: 'A shared capability can serve new categories, populations or formats. Brand governance keeps each product’s use and evidence distinct as the portfolio grows.',
    spec: {
      layout: 'pathway', title: '11 How Do Manufacturing, Compliance and Supply Reliability Create Advantage?', kicker: '',
      trunk: [
        { label: 'Reliable manufacturing', detail: 'Consistent production the brand depends on' },
        { label: 'Compliance and supply', detail: 'Capability already proven in the core category' },
      ],
      optionsLabel: 'Where that capability could extend — alternatives, not steps',
      options: [
        { label: 'Adjacent category', detail: 'For example from wellness supplements to specialized nutrition' },
        { label: 'New population', detail: 'Same category for a different user group' },
        { label: 'New format', detail: 'Same need in a different delivery format' },
      ],
      afterLabel: 'Whichever is chosen',
      after: [
        { label: 'Brand governance', detail: 'Preserves distinctions in use, evidence and professional involvement' },
        { label: 'Lasting advantage', detail: 'Capability shared without blurring intended use', kind: 'outcome' },
      ],
      takeaway: 'Expansion into adjacent categories creates value only when products share meaningful capability without blurring intended use or evidence.',
    },
  },
  'healthcare-products-m4-12': {
    heading: 'Launch priority combines need, feasibility, access and economics',
    intro: 'Price tier and innovation priority decide where growth comes from. Prioritize launches by unmet need, legal pathway, evidence, technical feasibility, channel access, affordability, contribution and strategic fit.',
    spec: {
      layout: 'driverTree', title: '12 How Do Distribution, Trust and Portfolio Economics Support Growth?', kicker: '',
      root: { label: 'Innovation priority', detail: 'Which launch to fund first' },
      drivers: [
        { label: 'Need', detail: 'Why the launch matters', children: [{ label: 'Unmet need' }, { label: 'Strategic fit' }] },
        { label: 'Feasibility', detail: 'Whether it can be done', children: [{ label: 'Legal pathway' }, { label: 'Evidence' }, { label: 'Technical feasibility' }] },
        { label: 'Access', detail: 'Whether users can reach it', children: [{ label: 'Channel access' }, { label: 'Affordability' }] },
        { label: 'Economics', detail: 'Whether it pays back', children: [{ label: 'Contribution' }, { label: 'Price tier' }] },
      ],
      note: 'A company selling wellness supplements and specialized nutrition should preserve clear distinctions in use, evidence and professional involvement.',
      takeaway: 'Portfolio growth creates value only when new price tiers and innovations meet complementary needs without blurring intended use or evidence.',
    },
  },
  'healthcare-products-m4-13': {
    heading: 'Each industry strength has a matching weakness when it fails',
    intro: 'Product, compliance, supply, channel, financial and reputational vulnerabilities can weaken competitive resilience. Quality failure, channel dependence and portfolio concentration are the other side of common strengths.',
    spec: {
      layout: 'compare', title: "13 What Are the Industry's Main Strengths and Weaknesses?", kicker: '',
      leftTitle: 'Strength', rightTitle: 'Weakness it can turn into',
      rows: [
        { label: 'Trust', a: 'A moat built by years of brand investment', b: 'Damaged by one significant failure' },
        { label: 'Quality', a: 'Consistent, controlled products', b: 'Quality failure' },
        { label: 'Channel', a: 'Reliable access to buyers', b: 'Channel dependence' },
        { label: 'Portfolio', a: 'Focused core products', b: 'Portfolio concentration' },
      ],
      note: 'WHO states traceability can support earlier detection and recall but cannot fully block falsified products without strong regulation and response.',
      takeaway: 'Trust is both a moat and a downside risk because one significant quality, safety or communication failure can damage years of brand investment.',
    },
  },
  'healthcare-products-m4-14': {
    heading: 'Each threat to reputation has a safeguard, and some safeguards have limits',
    intro: 'Regulatory risk and reputation are linked: a quality, safety or communication failure can damage years of brand investment. Companies maintain specific safeguards against each threat.',
    spec: {
      layout: 'table', title: '14 What Opportunities and Threats Shape Healthcare Products?', kicker: '',
      headers: ['Threat', 'Safeguard', 'Limit to remember'],
      rows: [
        { label: 'Falsified products', a: 'Authentication and traceability', b: 'Cannot fully block falsification without strong regulation and response' },
        { label: 'Quality or safety complaint', a: 'Complaint investigation and recall readiness', b: 'Only as fast as detection' },
        { label: 'Misleading communication', a: 'Accurate claims', b: 'Applies to sellers as well as the brand' },
        { label: 'Regulatory change', a: 'Current regulatory review', b: 'Must be repeated, not done once' },
        { label: 'Channel problems', a: 'Channel monitoring', b: 'Depends on partner information' },
      ],
      note: 'WHO states traceability can support earlier detection and recall but cannot fully block falsified products without strong regulation and response.',
      takeaway: 'Reputation is both a moat and a regulatory risk because one significant quality, safety or communication failure can damage years of brand investment.',
    },
  },
  'healthcare-products-m4-15': {
    heading: 'When margins erode, cutting trust safeguards is the wrong lever to pull',
    intro: 'Supply concentration and margin erosion force strategic choices. Some responses build resilience; others save cost by weakening the safeguards that protect trust.',
    spec: {
      layout: 'decision', title: '15 What Strategic Choices Must Companies Make?', kicker: '',
      root: { label: 'Margin erosion or supply concentration', detail: 'Pressure to change how the business runs' },
      question: 'Does the response strengthen resilience or weaken trust safeguards?',
      branches: [
        { condition: 'Add qualified supplier alternatives', outcome: 'Pursue', detail: 'Reduces supply concentration', tone: 'positive' },
        { condition: 'Save cost in steps that do not touch quality', outcome: 'Pursue with monitoring', detail: 'Keep complaint and recall readiness intact', tone: 'caution' },
        { condition: 'Cut quality, complaint handling or claims review', outcome: 'Reject', detail: 'One failure can cost years of brand investment', tone: 'negative' },
      ],
      note: 'Maintain complaint investigation, authentication, supplier alternatives, recall readiness, channel monitoring, accurate claims and current regulatory review.',
      takeaway: 'Trust is both a moat and a downside risk, so choices on supply and margin must not trade away quality, safety or communication safeguards.',
    },
  },
};
