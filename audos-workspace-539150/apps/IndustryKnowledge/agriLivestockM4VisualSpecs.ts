import type { AgriLivestockChapterVisual } from './agriLivestockVisualSpecs';

/** Chapter-specific Learning Visuals for Livestock & Animal Feed Module 04, keyed by visualKind. */
export const AGRI_LIVESTOCK_M4_VISUALS: Record<string, AgriLivestockChapterVisual> = {
  'agri-livestock-m4-1': {
    heading: 'Livestock competition happens in separate arenas along the chain',
    intro: 'Multinational, domestic, regional, independent and integrated participants compete across different chain stages. Competition looks different in feed, breeding, integration and species niches.',
    spec: {
      layout: 'taxonomy', title: '01 How Competitive Is the Livestock Industry?', kicker: '',
      root: 'Where livestock businesses compete', rootDetail: 'Separate arenas; rivalry varies by species, region and scale',
      groups: [
        { label: 'Feed manufacturing', detail: 'Mills competing for farm customers' },
        { label: 'Breeding', detail: 'Suppliers of animals and genetics' },
        { label: 'Integration', detail: 'Groups linking feed and livestock' },
        { label: 'Species specialization', detail: 'Players focused on poultry or swine farms' },
        { label: 'Participant types', items: ['Multinational', 'Domestic', 'Regional', 'Independent', 'Integrated'] },
      ],
      note: 'Define product, species, region, customer and chain role before comparing share or capacity.',
      takeaway: 'Competition varies by species, region, scale and integration between feed and livestock.',
    },
  },
  'agri-livestock-m4-2': {
    heading: 'Check that two competitors share the same arena before comparing their strength',
    intro: 'A national feed group and a regional specialist compete differently for poultry and swine farms. Comparing them only makes sense where their farms, nutrition offer and coverage overlap.',
    spec: {
      layout: 'decision', title: '02 How Do Porter’s Five Forces Apply to Livestock Farming?', kicker: '',
      root: { label: 'Two competitors to compare', detail: 'e.g. a national feed group and a regional specialist' },
      question: 'Do they serve the same livestock farming segment, nutrition need and geographic coverage?',
      branches: [
        { condition: 'Same species, product and region', outcome: 'Compare share and capacity directly', tone: 'positive' },
        { condition: 'Same species, different region', outcome: 'Compare only where coverage overlaps', detail: 'Geographic coverage changes the rivalry', tone: 'caution' },
        { condition: 'Different farms or chain role', outcome: 'Do not compare as rivals', detail: 'They compete in different arenas', tone: 'negative' },
      ],
      note: 'Define product, species, region, customer and chain role before comparing share or capacity.',
      takeaway: 'Competition varies by species, region, scale and integration between feed and livestock.',
    },
  },
  'agri-livestock-m4-3': {
    heading: 'Entry barriers go well beyond building a feed mill',
    intro: 'A new mill needs formulation, procurement, quality, dealer coverage and farm evidence beyond equipment. Capital, technical, regulatory, distribution and relationship barriers protect established participants.',
    spec: {
      layout: 'taxonomy', title: '03 What Creates Competitive Advantages Among Livestock Producers?', kicker: '',
      root: 'Barriers that protect established participants', rootDetail: 'Capacity is only one of them',
      groups: [
        { label: 'Capital', items: ['Feed mill capital', 'Farm infrastructure'] },
        { label: 'Technical', items: ['Laboratory', 'Technical talent'] },
        { label: 'Regulatory compliance', detail: 'Meeting applicable feed and farm requirements' },
        { label: 'Distribution access', detail: 'Dealer coverage that reaches farms' },
        { label: 'Customer trust', detail: 'Farm evidence and lasting relationships' },
      ],
      note: 'Verify capacity utilization, ingredient access, quality controls, credit, service and customer retention.',
      takeaway: 'Effective competition requires consistent quality, expertise, relationships and price-risk management, not capacity alone.',
    },
  },
  'agri-livestock-m4-4': {
    heading: 'Feed and nutrition leaders combine plant scale with formulation, reach and species focus',
    intro: 'Domestic and multinational feed businesses compete by portfolio, plants, reach and farm outcomes. Leadership comes from combining several capabilities, not one.',
    spec: {
      layout: 'driverTree', title: '04 Who Are the Major Global Livestock Participants?', kicker: '',
      root: { label: 'Position in feed and nutrition', detail: 'Judged within a species, region and product' },
      drivers: [
        { label: 'Plant scale', detail: 'Manufacturing efficiency' },
        { label: 'Formulation', detail: 'Nutrition expertise in the portfolio' },
        { label: 'Distribution', detail: 'Reach to farms and dealers' },
        { label: 'Species focus', detail: 'Depth in chosen species' },
        { label: 'Ingredient procurement', detail: 'Buying capability for raw materials' },
      ],
      note: 'Compare companies within the relevant species, region, product and service, not universal rankings.',
      takeaway: 'Leaders combine manufacturing efficiency, support and ingredient procurement capability.',
    },
  },
  'agri-livestock-m4-5': {
    heading: 'A scale player and a species specialist win farms in different ways',
    intro: 'A premium nutrition specialist can compete with a scale player through species expertise and service. Procurement, product quality and technical service show where each one is stronger.',
    spec: {
      layout: 'compare', title: '05 How Do Integrated Producers and Independent Farms Compete Differently?', kicker: '',
      leftTitle: 'Scale player', rightTitle: 'Premium nutrition specialist',
      rows: [
        { label: 'Procurement', a: 'Buys ingredients at volume', b: 'Sources for specific species formulas' },
        { label: 'Product quality', a: 'Consistency across large output', b: 'Precision for one species or stage' },
        { label: 'Technical service', a: 'Broad coverage of many farms', b: 'Deep species expertise on farm' },
      ],
      note: 'Compare companies within the relevant species, region, product and service, not universal rankings.',
      takeaway: 'Leaders combine manufacturing efficiency, support and ingredient procurement capability.',
    },
  },
  'agri-livestock-m4-6': {
    heading: 'Assess an integrated operator by what each stage delivers, not by herd count',
    intro: 'An integrated pork group coordinates breeding, feed, farms, slaughter and sales. Each capability needs its own evidence before the whole operator can be judged.',
    spec: {
      layout: 'table', title: '06 Who Are the Key Livestock Participants in Vietnam?', kicker: '',
      headers: ['Capability', 'What to assess', 'Why it matters'],
      rows: [
        { label: 'Genetics', a: 'Biological results', b: 'Standardized production starts here' },
        { label: 'Farm scale', a: 'Capacity actually used', b: 'Herd count alone misleads' },
        { label: 'Feed sourcing', a: 'Feed supply to own and contract farms', b: 'Drives cost and consistency' },
        { label: 'Biosecurity', a: 'Disease control across sites', b: 'Protects the whole chain' },
        { label: 'Processing and market access', a: 'Processing utilization and product market', b: 'Downstream access earns the margin' },
        { label: 'Contract network', a: 'Contract growers and their results', b: 'Extends capacity without owning farms' },
      ],
      note: 'Assess biological results, capacity, contract growers, processing utilization, product market and capital, not herd count alone.',
      takeaway: 'Integrated operators gain coordination advantages through standardized production and downstream access.',
    },
  },
  'agri-livestock-m4-7': {
    heading: 'Meat, egg and milk systems use different efficiency measures that cannot share one ranking',
    intro: 'A broiler FCR, eggs per hen and milk yield per cow answer different questions and cannot form one ranking. Producers are comparable only on the same species, stage and basis.',
    spec: {
      layout: 'table', title: '07 How Should Livestock Producers Be Compared?', kicker: '',
      headers: ['Production system', 'Efficiency measure', 'Question it answers'],
      rows: [
        { label: 'Broiler (meat)', a: 'FCR', b: 'How much feed per unit of liveweight gain?' },
        { label: 'Layer (eggs)', a: 'Eggs per hen', b: 'How much output per bird?' },
        { label: 'Dairy (milk)', a: 'Milk yield per cow', b: 'How much milk per animal?' },
        { label: 'Any system', a: 'Mortality, cost per unit, farm profit', b: 'Does efficiency turn into profit?' },
      ],
      note: 'Benchmark only on the same species, genetics, stage, housing, health, feed basis, period and output, and state the biosecurity and measurement basis.',
      takeaway: 'Benchmarking requires the same species, genetics, stage, housing, health, feed basis, period and output; FCR cannot be compared universally across meat, egg and milk systems.',
    },
  },
  'agri-livestock-m4-8': {
    heading: 'The cheapest feed on paper can be the costliest per kilogram of output',
    intro: 'Two feeds are compared on cost per kilogram of saleable output rather than nominal price. Nutrient specification, availability and growth decide which one is really cheaper.',
    spec: {
      layout: 'compare', title: '08 How Do Productivity, Costs, and Production Models Differ?', kicker: '',
      leftTitle: 'Judged on nominal price', rightTitle: 'Judged on cost per kg of saleable output',
      rows: [
        { label: 'Nutrient specification', a: 'Assumed equal across feeds', b: 'Checked for the species and stage' },
        { label: 'Availability', a: 'Not counted', b: 'Supply gaps counted as cost' },
        { label: 'Growth', a: 'Not measured', b: 'Measured in matched cohorts' },
        { label: 'Downstream cost', a: 'Hidden', b: 'Included in the comparison' },
      ],
      note: 'Use controlled farm evidence and state species, stage, genetics, cohort, period and measurement basis.',
      takeaway: 'Lowest feed price or production cost can underperform when results are inconsistent or downstream cost rises.',
    },
  },
  'agri-livestock-m4-9': {
    heading: 'Reach, reliability, service and financial discipline let a supplier keep farms at a higher price',
    intro: 'A supplier with a higher price retains farms through reliable results, delivery and rapid technical response. Commercial reach, service, supply reliability and financial discipline all contribute.',
    spec: {
      layout: 'driverTree', title: '09 Which Capabilities Explain Competitive Advantage?', kicker: '',
      root: { label: 'Customer retention in a price-sensitive market', detail: 'Defending position without the lowest price' },
      drivers: [
        { label: 'Commercial reach', children: [{ label: 'Coverage' }, { label: 'Dealer relationship' }] },
        { label: 'Supply reliability', children: [{ label: 'Lead time' }] },
        { label: 'Service', children: [{ label: 'Farm advice' }, { label: 'Complaint handling' }] },
        { label: 'Financial discipline', children: [{ label: 'Gross margin' }, { label: 'Working capital' }] },
      ],
      note: 'Normalize revenue mix, pass-through price, utilization, credit, inventory, collections and service cost before comparing.',
      takeaway: 'Customer relationships and efficient distribution can defend position in price-sensitive markets.',
    },
  },
  'agri-livestock-m4-10': {
    heading: 'Operating capability runs from ingredient sourcing to results on the farm',
    intro: 'Procurement and production link to farm and customer outcomes. Specification, process, farm result, complaint and corrective action are tracked together.',
    spec: {
      layout: 'flow', title: '10 Why Do Genetics, Nutrition, and Animal Health Matter?', kicker: '',
      steps: [
        { label: 'Ingredient sourcing', detail: 'Controls ingredient cost and variability', owner: 'Procurement' },
        { label: 'Quality control', detail: 'Specification and process checked', owner: 'Feed mill' },
        { label: 'Farm result', detail: 'Feed conversion and reproduction measured', owner: 'Farm' },
        { label: 'Customer outcome', detail: 'Reliable supply and animal performance', kind: 'outcome' },
      ],
      loop: 'Complaints trigger corrective action back at sourcing and quality control.',
      note: 'Track specification, process, farm result, complaint and corrective action together.',
      takeaway: 'Competitiveness balances cost with nutrition, health, biosecurity and reliable supply.',
    },
  },
  'agri-livestock-m4-11': {
    heading: 'A formula change should pass on nutrient targets, growth and mortality before adoption',
    intro: 'Formula optimization protects nutrient targets while controlling ingredient cost and variability. A cheaper formula only creates advantage if growth and mortality hold.',
    spec: {
      layout: 'decision', title: '11 How Do Farm Efficiency and Biosecurity Create Advantage?', kicker: '',
      root: { label: 'Proposed formulation change', detail: 'Lower or steadier ingredient cost' },
      question: 'Does it keep nutrient targets without hurting growth or mortality?',
      branches: [
        { condition: 'Targets kept, farm results stable', outcome: 'Adopt the new formula', tone: 'positive' },
        { condition: 'Targets kept, farm results unclear', outcome: 'Trial and track before scaling', detail: 'Follow specification to farm result', tone: 'caution' },
        { condition: 'Targets missed or mortality rises', outcome: 'Reject the change', tone: 'negative' },
      ],
      note: 'Track specification, process, farm result, complaint and corrective action together.',
      takeaway: 'Competitiveness balances cost with nutrition, health, biosecurity and reliable supply.',
    },
  },
  'agri-livestock-m4-12': {
    heading: 'Match each shock to the capability that keeps supply and farm performance going',
    intro: 'A feed company diversifies ingredients and uses technical teams to maintain farm performance through disruption. Stress-testing shows which capability absorbs which shock.',
    spec: {
      layout: 'table', title: '12 How Do Scale, Integration, and Market Access Support Long-Term Success?', kicker: '',
      headers: ['Shock to stress-test', 'Capability that absorbs it', 'What it protects'],
      rows: [
        { label: 'Supplier or port disruption', a: 'Procurement partnership', b: 'Ingredient continuity' },
        { label: 'FX and ingredient price', a: 'Diversified origin', b: 'Feed cost' },
        { label: 'Disease', a: 'Technical team and digital monitoring', b: 'Farm performance' },
        { label: 'Credit and customer concentration', a: 'Dealer network and farm relationship', b: 'Sales base' },
        { label: 'Energy disruption', a: 'Continuity plan', b: 'Mill operation' },
      ],
      note: 'Stress-test supplier, port, FX, disease, energy, credit and customer concentration and maintain contingency actions.',
      takeaway: 'Efficient operations plus trusted support and resilient sourcing withstand price and disease shocks.',
    },
  },
  'agri-livestock-m4-13': {
    heading: 'One strength, weakness, opportunity and threat shape the industry picture',
    intro: 'Strengths, weaknesses, opportunities and threats vary by species, region and business model. Essential demand and integration sit beside fragmentation and disease.',
    spec: {
      layout: 'taxonomy', title: '13 What Are the Livestock Industry’s Main Strengths and Weaknesses?', kicker: '',
      root: 'Livestock industry SWOT', rootDetail: 'Score separately by species, system and region',
      groups: [
        { label: 'Strength', items: ['Essential demand'] },
        { label: 'Weakness', items: ['Fragmentation'] },
        { label: 'Opportunity', items: ['Integration opportunity'] },
        { label: 'Threat', items: ['Disease threat'] },
      ],
      note: 'Score SWOT by species, system, region and participant instead of one industry average.',
      takeaway: 'Growth opportunities coexist with commodity, disease, environmental and demand vulnerabilities.',
    },
  },
  'agri-livestock-m4-14': {
    heading: 'Precision nutrition is an opportunity only where farms can implement and measure it',
    intro: 'Precision nutrition creates value only when farms can implement and measure the change. Without that, feed-cost exposure stays a threat.',
    spec: {
      layout: 'decision', title: '14 What Opportunities and Threats Shape Livestock Competition?', kicker: '',
      root: { label: 'Precision nutrition offer', detail: 'Response to feed-cost exposure' },
      question: 'Can the farm implement and measure the change?',
      branches: [
        { condition: 'Farming expertise and measurement in place', outcome: 'Capture the opportunity', tone: 'positive' },
        { condition: 'Can implement, cannot yet measure', outcome: 'Pilot with a baseline first', tone: 'caution' },
        { condition: 'Cannot implement', outcome: 'Feed-cost exposure remains a threat', tone: 'negative' },
      ],
      note: 'Score SWOT by species, system, region and participant instead of one industry average.',
      takeaway: 'Growth opportunities coexist with commodity, disease, environmental and demand vulnerabilities.',
    },
  },
  'agri-livestock-m4-15': {
    heading: 'Address resilience constraints in parallel before expanding capacity',
    intro: 'A producer strengthens biosecurity and manure management before expanding capacity. Input, biological, environmental, welfare and supply constraints each need measurable action first.',
    spec: {
      layout: 'pathway', title: '15 What Strategic Choices Must Livestock Businesses Make?', kicker: '',
      trunk: [{ label: 'Diagnose constraints', detail: 'Input, biological, environment, welfare and supply' }],
      optionsLabel: 'Workstreams to run in parallel — not steps',
      options: [
        { label: 'Sourcing', items: ['Imported input', 'Commodity volatility'] },
        { label: 'Disease response', items: ['Disease', 'Biosecurity'] },
        { label: 'Environment', items: ['Waste', 'Manure management'] },
        { label: 'Animal welfare', detail: 'Welfare standards on farm' },
        { label: 'Smallholder coordination', items: ['Fragmented supply', 'Traceability'] },
      ],
      afterLabel: 'Then',
      after: [{ label: 'Expand capacity', detail: 'With capital discipline', kind: 'outcome' }],
      note: 'Set measurable actions for sourcing, disease response, traceability, environment, smallholder coordination and capital discipline.',
      takeaway: 'Long-term growth depends on resilience and productivity rather than volume alone.',
    },
  },
};
