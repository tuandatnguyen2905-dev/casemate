import type { HotelChapterVisual } from './hospitalityHotelsVisualSpecs';

/** Chapter-specific Learning Visuals for Hotels & Resorts Module 04, keyed by visualKind. */
export const HOTELS_M4_VISUALS: Record<string, HotelChapterVisual> = {
  'hospitality-hotels-m4-1': {
    heading: 'Five forces that set how hard hotels compete',
    intro: 'Each branch is one force acting on the same property. Assess every force for a specific destination, segment and date rather than for “hotels” in general.',
    spec: {
      layout: 'driverTree', title: 'Five Forces in Hotels', kicker: '',
      root: { label: 'Competitive pressure on a hotel', detail: 'Local and date-specific' },
      drivers: [
        { label: 'Guest power', detail: 'Guests compare prices and reviews before booking', children: [{ label: 'Price comparison' }, { label: 'Review comparison' }] },
        { label: 'OTA power', detail: 'Online travel agencies aggregate demand', children: [{ label: 'Demand aggregation' }, { label: 'Distribution dependence' }] },
        { label: 'Supplier power', detail: 'Bargaining power of those providing the inputs a property relies on' },
        { label: 'Threat of entry', detail: 'New supply requires high capital and operating commitments', children: [{ label: 'Capital commitment' }, { label: 'Operating commitment' }] },
        { label: 'Rivalry', detail: 'Nearby properties competing for the same guests on the same dates', children: [{ label: 'Fixed capacity' }, { label: 'Perishable room nights' }] },
      ],
      note: 'A room unsold tonight cannot be sold tomorrow, so fixed, perishable capacity sharpens rivalry on weak dates.',
      takeaway: 'Hotel rivalry is local, date-specific and shaped by distribution power and fixed capacity.',
    },
  },
  'hospitality-hotels-m4-2': {
    heading: 'From the guest promise to the review it earns',
    intro: 'Follow one guest’s journey. Location and brand win the booking; local execution decides the stay; the review carries the result to the next guest.',
    spec: {
      layout: 'flow', title: 'Location, Brand and Service Competition', kicker: '',
      steps: [
        { label: 'Guest compares options', detail: 'Access, brand and reviews of nearby properties', owner: 'Guest' },
        { label: 'Books on trust', detail: 'Brand systems and loyalty support trust in the promise', owner: 'Guest' },
        { label: 'Stays at the property', detail: 'Local execution and asset quality deliver the experience', owner: 'Property team' },
        { label: 'Reviews the stay', detail: 'Records whether promise and delivery matched', kind: 'outcome', owner: 'Guest' },
      ],
      loop: 'Reviews feed back into how the next guest compares properties.',
      note: 'A premium flag cannot overcome poor maintenance: benchmark the guest promise against actual delivery.',
      takeaway: 'Properties compete through location and a coherent service proposition that local execution actually delivers.',
    },
  },
  'hospitality-hotels-m4-3': {
    heading: 'Locked-in capital, footloose guests',
    intro: 'The same dimensions look very different from each side. Owners, operators and brands carry long commitments, while guests can move to an alternative for the next stay.',
    spec: {
      layout: 'compare', title: 'Capital Intensity and Switching Costs', kicker: '', leftTitle: 'Owners, operators and brands', rightTitle: 'Guests',
      rows: [
        { label: 'Asset', a: 'Long-lived capital committed to one property', b: 'No asset tied to any one hotel' },
        { label: 'Renovation', a: 'Refurbishment may be required to hold positioning', b: 'Compare condition across alternatives' },
        { label: 'Contract', a: 'Operator and brand contracts can run for long periods', b: 'Choose stay by stay' },
        { label: 'Loyalty', a: 'Programmes try to bring guests back', b: 'Can still compare alternatives' },
        { label: 'Channel', a: 'Pays to reach demand through channels', b: 'Compares options across channels' },
      ],
      note: 'Model owner and operator incentives separately: they carry different commitments over the asset’s life.',
      takeaway: 'Hotel assets are capital intensive while guests can often switch easily.',
    },
  },
  'hospitality-hotels-m4-4': {
    heading: 'How a multi-brand hotel group relates to owners and guests',
    intro: 'The group sits at the centre of a system of owners, brands, loyalty members and distribution. Marriott and Accor are the chapter’s examples, not a ranking.',
    spec: {
      layout: 'ecosystem', title: 'Global Hotel Groups', kicker: '',
      center: { label: 'Global hotel group', detail: 'Multi-brand system, e.g. Marriott or Accor' },
      actors: [
        { label: 'Franchisee owners', relation: 'Operate under the group’s brand and pay fees', flows: ['money', 'service'] },
        { label: 'Owners of managed hotels', relation: 'Appoint the group to manage the property for a fee', flows: ['money', 'service'] },
        { label: 'Brand portfolio', relation: 'Several brands within one system', flows: ['product'] },
        { label: 'Loyalty members', relation: 'Guests linked to the group’s programme', flows: ['information'] },
        { label: 'Distribution platforms', relation: 'Channel demand to affiliated hotels', flows: ['information', 'service'] },
      ],
      note: 'Group fee revenue is not property-level hotel revenue; compare groups only with matched business models.',
      takeaway: 'Global groups often scale through asset-light management and franchising.',
    },
  },
  'hospitality-hotels-m4-5': {
    heading: 'Competing on distinct experience rather than scale',
    intro: 'These are competitor types, not stages. Each competes through a different mix of service, destination and local character.',
    spec: {
      layout: 'taxonomy', title: 'Luxury Specialists and Independent Hotels', kicker: '',
      root: 'Specialist and independent competitors', rootDetail: 'Types of competitor — not a ranking',
      groups: [
        { label: 'Luxury specialists', detail: 'Emphasize service and destination' },
        { label: 'Boutique hotels', detail: 'Distinct experience and local character' },
        { label: 'Independent hotels', detail: 'Retain flexibility and local character' },
        { label: 'What they compete on', items: ['Distinct experience', 'Service', 'Destination', 'Local character'] },
      ],
      note: 'Small inventory does not imply weak positioning or economics; normalize segment and property before comparing.',
      takeaway: 'Specialists and independents compete through distinct experience and local character.',
    },
  },
  'hospitality-hotels-m4-6': {
    heading: 'Who supplies Vietnam’s rooms — and what to verify',
    intro: 'Vietnam supply mixes operator types and property types. The brand on the door does not tell you who owns or manages the hotel.',
    spec: {
      layout: 'taxonomy', title: 'Vietnam Operators and Branded Properties', kicker: '',
      root: 'Vietnam hotel and resort supply', rootDetail: 'Categories, not a ranking of companies',
      groups: [
        { label: 'Operator type', items: ['Domestic operators', 'International brands', 'Independent properties'] },
        { label: 'Property type', items: ['Urban hotels', 'Resorts', 'Integrated properties'] },
        { label: 'Roles to verify', items: ['Owner', 'Manager', 'Franchise', 'Operating status'] },
      ],
      note: 'Brand presence does not identify the property owner or its returns; verify each role and operating status.',
      takeaway: 'Vietnam supply includes local operators, international brands and independent properties that vary by ownership, management, franchise and destination.',
    },
  },
  'hospitality-hotels-m4-7': {
    heading: 'Does this property belong in the comp set?',
    intro: 'Benchmarking starts by testing whether a competitor is genuinely comparable. Run each candidate through the same question before comparing any results.',
    spec: {
      layout: 'decision', title: 'Property and Market Position', kicker: '',
      root: { label: 'Candidate competitor', detail: 'Segment, location, rooms, facilities, renovation and season' },
      question: 'Does it match the property’s service level, location, capacity, facilities and demand calendar?',
      branches: [
        { condition: 'Matches on all dimensions', outcome: 'Include in the comp set', tone: 'positive' },
        { condition: 'Differs on one dimension', outcome: 'Include with care', detail: 'For example, renovation status or season; note the difference', tone: 'caution' },
        { condition: 'Different property and market', outcome: 'Exclude from the comp set', detail: 'A 100-room city hotel is unlike a 500-room island resort', tone: 'negative' },
      ],
      note: 'Use comp sets carefully: a poorly matched set makes every later metric comparison misleading.',
      takeaway: 'Benchmarking starts with comparable property and market context.',
    },
  },
  'hospitality-hotels-m4-8': {
    heading: 'What RevPAR is made of — and what it leaves out',
    intro: 'RevPAR combines occupancy and ADR. Total revenue and channel mix sit alongside it, and every metric needs the same room basis, period and currency.',
    spec: {
      layout: 'driverTree', title: 'Occupancy, ADR and Revenue Performance', kicker: '',
      root: { label: 'RevPAR', detail: 'Room revenue divided by rooms available' },
      formula: 'RevPAR = Occupancy × ADR',
      drivers: [
        { label: 'Occupancy', detail: 'Rooms sold divided by rooms available', children: [{ label: 'Rooms sold' }, { label: 'Rooms available' }] },
        { label: 'ADR', op: '×', detail: 'Room revenue divided by rooms sold', children: [{ label: 'Room revenue' }, { label: 'Rooms sold' }] },
        { label: 'Beyond RevPAR', op: '+', detail: 'Compared alongside, not part of the formula', children: [{ label: 'TRevPAR (total revenue)' }, { label: 'Channel mix' }] },
      ],
      note: 'Higher ADR can accompany lower occupancy and vice versa. Do not infer GOP from RevPAR.',
      takeaway: 'Performance metrics require matching room basis, period and currency across aligned properties.',
    },
  },
  'hospitality-hotels-m4-9': {
    heading: 'Measures that explain operating quality',
    intro: 'Each measure links a commercial outcome to service or cost. Read the right-hand column before comparing any figure across hotels or companies.',
    spec: {
      layout: 'table', title: 'Profit, Service and Distribution Quality', kicker: '', headers: ['Measure', 'What it explains', 'Scope check'],
      rows: [
        { label: 'GOPPAR', a: 'Gross operating profit per available room', b: 'State the profit definition and entity' },
        { label: 'Labor productivity', a: 'Cost of delivering the service', b: 'Match service level and property type' },
        { label: 'Guest satisfaction', a: 'Whether service meets the promise', b: 'Compare like-for-like segments' },
        { label: 'Repeat rate', a: 'Loyalty earned by the stay', b: 'Define who counts as a repeat guest' },
        { label: 'Direct share', a: 'Channel cost of acquiring each stay', b: 'Use the same channel definitions' },
      ],
      note: 'Hotel revenue should not be compared with brand fee revenue.',
      takeaway: 'Strong benchmarking links commercial outcomes to service and cost.',
    },
  },
  'hospitality-hotels-m4-10': {
    heading: 'When a location feature becomes an advantage',
    intro: 'A location feature only matters if it reaches the demand the hotel targets. Test it against the target segment before treating it as a strength.',
    spec: {
      layout: 'decision', title: 'Location and Positioning', kicker: '',
      root: { label: 'Location feature', detail: 'For example, beach access' },
      question: 'Do target demand and connectivity support it?',
      branches: [
        { condition: 'Relevant demand and good access', outcome: 'Advantage supports the proposition', detail: 'Align facilities, service and price with travel purpose', tone: 'positive' },
        { condition: 'Demand exists but access is weak', outcome: 'Advantage only partly usable', detail: 'Connectivity limits who can reach the property', tone: 'caution' },
        { condition: 'No relevant demand generator', outcome: 'Feature adds little', detail: 'It does not match the target segment’s travel purpose', tone: 'negative' },
      ],
      note: 'Use segment-specific evidence rather than assuming a scenic location attracts every guest.',
      takeaway: 'Location works through relevant demand and a clear guest proposition.',
    },
  },
  'hospitality-hotels-m4-11': {
    heading: 'The revenue management cycle',
    intro: 'Revenue management runs as a repeating cycle. Success is measured in net room revenue, not occupancy or rate alone.',
    spec: {
      layout: 'flow', title: 'Revenue Management and Distribution', kicker: '',
      steps: [
        { label: 'Forecast demand', detail: 'Expected demand by date and segment' },
        { label: 'Set rate', detail: 'Dynamic pricing against the forecast', kind: 'decision' },
        { label: 'Control inventory', detail: 'Stay controls decide which bookings to accept', kind: 'decision' },
        { label: 'Allocate channels', detail: 'Weigh each channel’s cost against its demand' },
        { label: 'Net room revenue', detail: 'Contribution after channel cost', kind: 'outcome' },
      ],
      loop: 'Measured net revenue informs the next forecast and pricing decision.',
      note: 'Discounting can increase occupancy while reducing GOP.',
      takeaway: 'Commercial discipline balances rate, occupancy and channel cost to support net contribution.',
    },
  },
  'hospitality-hotels-m4-12': {
    heading: 'People and assets behind guest satisfaction',
    intro: 'Satisfaction rests on two foundations, capable people and reliable assets, plus the cost control that keeps both sustainable.',
    spec: {
      layout: 'driverTree', title: 'Service, Talent and Asset Upkeep', kicker: '',
      root: { label: 'Guest satisfaction', detail: 'Earned on every stay' },
      drivers: [
        { label: 'Capable people', detail: 'Service culture and adequate staffing', children: [{ label: 'Training' }, { label: 'Consistency' }, { label: 'Service recovery' }] },
        { label: 'Reliable assets', detail: 'Preventive maintenance over the asset’s life', children: [{ label: 'Maintenance' }, { label: 'Lifecycle condition' }] },
        { label: 'Cost control', detail: 'Keeps service and upkeep sustainable', children: [{ label: 'Productivity' }] },
      ],
      note: 'Deferred maintenance can damage reviews and rate; protect lifecycle condition.',
      takeaway: 'Guest satisfaction depends on capable people and reliable assets.',
    },
  },
  'hospitality-hotels-m4-13': {
    heading: 'Internal strengths and weaknesses of the hotel model',
    intro: 'The SWOT’s internal half. The same physical product that supports pricing also creates fixed cost and perishable inventory.',
    spec: {
      layout: 'taxonomy', title: 'Strengths and Weaknesses', kicker: '',
      root: 'Hotel industry: internal factors', rootDetail: 'Strengths and weaknesses of the operating model',
      groups: [
        { label: 'Strengths', items: ['Differentiated experiences', 'Location', 'Rooms and facilities support pricing'] },
        { label: 'Weaknesses', items: ['High fixed cost', 'Perishable capacity', 'Continuous staffing and maintenance'] },
      ],
      note: 'Low season exposes the fixed-cost burden: plan cash and flexible operations.',
      takeaway: 'Hotels can build differentiated experiences but carry high fixed cost and perishable inventory.',
    },
  },
  'hospitality-hotels-m4-14': {
    heading: 'External opportunities and threats',
    intro: 'The SWOT’s external half. Growth and disruption arrive together, and their effect differs by destination.',
    spec: {
      layout: 'taxonomy', title: 'Opportunities and Threats', kicker: '',
      root: 'Hotel industry: external factors', rootDetail: 'Assess per destination, not nationally',
      groups: [
        { label: 'Opportunities', items: ['Domestic travel', 'MICE', 'Wellness', 'New experiences'] },
        { label: 'Threats', items: ['Economic events', 'Health events', 'Climate events', 'Competitive supply'] },
        { label: 'Test per destination', detail: 'Build destination scenarios for both sides' },
      ],
      note: 'Arrival growth may not reach every destination.',
      takeaway: 'Demand growth and new experiences coexist with shocks and competitive supply.',
    },
  },
  'hospitality-hotels-m4-15': {
    heading: 'Choosing a strategic path for a hotel asset',
    intro: 'Strategy starts with the guest and the property, then picks among alternative paths that can be combined. Investment follows evidence in stages.',
    spec: {
      layout: 'pathway', title: 'Strategic Differentiation', kicker: '',
      trunk: [
        { label: 'Choose the target guest' },
        { label: 'Define the property', detail: 'Hotel or resort, and its current position' },
      ],
      optionsLabel: 'Strategic paths for owners — alternatives, can be combined',
      options: [
        { label: 'Affiliate with a brand', detail: 'Join a brand system' },
        { label: 'Stay independent', detail: 'Keep flexibility and local character' },
        { label: 'Appoint an operator', detail: 'Hand day-to-day operation to a manager' },
        { label: 'Reposition', detail: 'Change segment or guest proposition' },
        { label: 'Diversify revenue', detail: 'Add revenue beyond rooms' },
        { label: 'Improve direct distribution', detail: 'Win more bookings through direct channels' },
      ],
      afterLabel: 'Investment path',
      after: [
        { label: 'Test demand evidence' },
        { label: 'Stage capex', kind: 'decision' },
        { label: 'Returns protected', kind: 'outcome' },
      ],
      note: 'More facilities without demand can lower returns; stage capex against evidence.',
      takeaway: 'Strategy chooses guest, property, operating model and investment path.',
    },
  },
};
