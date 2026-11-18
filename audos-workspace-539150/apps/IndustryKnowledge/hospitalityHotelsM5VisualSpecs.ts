import type { HotelChapterVisual } from './hospitalityHotelsVisualSpecs';

/** Chapter-specific Learning Visuals for Hotels & Resorts Module 05, keyed by visualKind. */
export const HOTELS_M5_VISUALS: Record<string, HotelChapterVisual> = {
  'hospitality-hotels-m5-1': {
    heading: 'Personalization only works on data guests trust',
    intro: 'Follow a consented preference from the guest to a more relevant stay. The check in the middle is where personalization most often fails.',
    spec: {
      layout: 'flow', title: 'Experience-Led and Personalized Travel', kicker: '',
      steps: [
        { label: 'Guest shares preferences', detail: 'With consent, not inferred intrusively', owner: 'Guest' },
        { label: 'Accurate and welcome?', detail: 'Inaccurate or intrusive data breaks personalization', kind: 'decision', owner: 'Hotel' },
        { label: 'Tailor service and dining', detail: 'Service, activities and dining matched to the preference', owner: 'Hotel' },
        { label: 'Anchor in local culture', detail: 'Connect experiences to local identity' },
        { label: 'Relevant whole stay', detail: 'Guest judges the stay and destination together', kind: 'outcome' },
      ],
      loop: 'Respectful use of data builds trust, which keeps guests willing to share preferences next time.',
      note: 'Personalization fails when data is inaccurate or intrusive.',
      takeaway: 'Guests increasingly evaluate the whole stay and destination experience.',
    },
  },
  'hospitality-hotels-m5-2': {
    heading: 'Different segments want different combinations',
    intro: 'Each row is a separate target segment, not a stage. Read across to see what the segment values and the question the property must answer before investing.',
    spec: {
      layout: 'table', title: 'Wellness, Families and Premium Demand', kicker: 'Segments are alternatives, not a sequence', headers: ['Segment', 'Combination sought', 'Design question'],
      rows: [
        { label: 'Wellness guests', a: 'Wellbeing', b: 'Which wellness, food and recreation fit the occasion?' },
        { label: 'Families', a: 'Convenience and space', b: 'Do rooms, food and recreation work for the whole group?' },
        { label: 'Luxury / premium', a: 'Premium service and space', b: 'Is willingness to pay enough for premium facilities?' },
      ],
      note: 'Space and value matter in every segment. Premium facilities need sufficient willingness to pay; use segment and seasonal evidence.',
      takeaway: 'Travel segments seek different combinations of wellbeing, convenience and premium service.',
    },
  },
  'hospitality-hotels-m5-3': {
    heading: 'Two demand patterns that reshape dates and length of stay',
    intro: 'Bleisure and domestic leisure both change when guests stay and for how long, but in different ways. Compare them before reading either as room-night demand.',
    spec: {
      layout: 'compare', title: 'Bleisure and Domestic Travel', kicker: '', leftTitle: 'Bleisure (extended business trip)', rightTitle: 'Domestic leisure trip',
      rows: [
        { label: 'What triggers it', a: 'A business trip extended for leisure', b: 'Travel within the country' },
        { label: 'Date pattern', a: 'Business days stretching into a weekend', b: 'Clustered around holidays and events' },
        { label: 'Length of stay', a: 'Business nights plus added leisure nights', b: 'Varies with the holiday or event' },
        { label: 'Product needs', a: 'Work and leisure use of one stay', b: 'Leisure and event-related needs' },
        { label: 'What to track', a: 'Source market and stay pattern', b: 'Source market and stay pattern' },
      ],
      note: 'Trip count is not hotel room-night demand.',
      takeaway: 'Blended trips and domestic demand reshape dates and product needs.',
    },
  },
  'hospitality-hotels-m5-4': {
    heading: 'Three systems, one set of records',
    intro: 'Each system has its own job around shared inventory and guest data. Coordination improves only when the systems of record and the rules connecting them are clear.',
    spec: {
      layout: 'ecosystem', title: 'PMS, RMS and CRM Integration', kicker: '',
      center: { label: 'Shared inventory and guest data', detail: 'Aligned by systems of record and rules' },
      actors: [
        { label: 'PMS', relation: 'Manages stay operations and room inventory', flows: ['information', 'service'] },
        { label: 'RMS', relation: 'Supports pricing from inventory and demand data', flows: ['information'] },
        { label: 'CRM', relation: 'Supports guest relationships', flows: ['information'] },
        { label: 'Guest', relation: 'Experiences the coordinated stay', flows: ['service'] },
        { label: 'Data controls owner', relation: 'Sets systems of record and controls', flows: ['oversight'] },
      ],
      note: 'Integration does not guarantee an accurate forecast or good service.',
      takeaway: 'Connected systems improve coordination when data and rules align.',
    },
  },
  'hospitality-hotels-m5-5': {
    heading: 'Digital options at the front, controls and people throughout',
    intro: 'Guests can start check-in through different channels. Whichever they choose, the same identity, key and service steps follow.',
    spec: {
      layout: 'pathway', title: 'Digital Check-In and Guest Automation', kicker: '',
      trunk: [
        { label: 'Guest ready to check in', detail: 'Before or on arrival' },
      ],
      optionsLabel: 'Registration channels — alternatives the guest chooses',
      options: [
        { label: 'Mobile registration', detail: 'Self-service on the guest’s device' },
        { label: 'Kiosk', detail: 'Self-service on property' },
        { label: 'Staff-assisted desk', detail: 'Human support, including for accessibility needs' },
      ],
      afterLabel: 'Shared steps for every channel',
      after: [
        { label: 'Identity and operational checks', kind: 'decision', owner: 'Hotel' },
        { label: 'Key issued', detail: 'Digital or physical key' },
        { label: 'Messaging during the stay', detail: 'Secure data, with a person reachable' },
        { label: 'Less friction, hospitality kept', kind: 'outcome' },
      ],
      note: 'A digital check-in still requires identity and operational controls. Offer human support and secure data.',
      takeaway: 'Automation should reduce friction without removing hospitality or accessibility.',
    },
  },
  'hospitality-hotels-m5-6': {
    heading: 'From potential savings to measured results',
    intro: 'AI forecasts and smart-room controls only count as improvements once they are measured against a baseline. Read the loop as the ongoing oversight cycle.',
    spec: {
      layout: 'flow', title: 'AI Forecasting and Smart Rooms', kicker: '',
      steps: [
        { label: 'Set a baseline', detail: 'Current forecast accuracy and room energy use' },
        { label: 'Is the data reliable?', detail: 'Models and sensors are only as good as their inputs', kind: 'decision' },
        { label: 'Run models and controls', detail: 'Forecasts and recommendations; sensors and room controls' },
        { label: 'Human oversight and privacy', detail: 'Review decisions and protect guest data', owner: 'Hotel' },
        { label: 'Measured outcome', detail: 'Realized result compared with the baseline', kind: 'outcome' },
      ],
      loop: 'Keep monitoring against the baseline and adjust models and controls as results come in.',
      note: 'Potential savings are not guaranteed realized outcomes.',
      takeaway: 'AI and connected rooms can improve decisions with reliable data and oversight.',
    },
  },
  'hospitality-hotels-m5-7': {
    heading: 'Judge channels by net contribution, not by label',
    intro: 'Both direct and OTA bookings bring revenue and carry costs. The drivers show what to weigh when balancing the channel mix.',
    spec: {
      layout: 'driverTree', title: 'Direct Booking and OTA Balance', kicker: '',
      root: { label: 'Net contribution by channel', detail: 'What the hotel keeps after channel cost' },
      formula: 'Net contribution = booking revenue − channel cost',
      drivers: [
        { label: 'Demand reach', detail: 'Where bookings come from', children: [{ label: 'OTA demand and comparison' }, { label: 'Direct relationships' }] },
        { label: 'Channel cost', detail: 'Neither channel is free', children: [{ label: 'OTA commission' }, { label: 'Direct marketing' }, { label: 'Payment and technology' }] },
        { label: 'Repeat value', detail: 'Relationships that bring guests back', children: [{ label: 'Loyalty' }, { label: 'Guest data and contact' }] },
      ],
      note: 'Direct still has marketing, payment and technology cost; optimize net contribution.',
      takeaway: 'Hotels need channel reach and customer economics, not a single-channel ideology.',
    },
  },
  'hospitality-hotels-m5-8': {
    heading: 'Brand growth and owner return are different measures',
    intro: 'Under franchise and management models, the brand company and the hotel owner hold different things and carry different obligations. Compare the two sides row by row.',
    spec: {
      layout: 'compare', title: 'Brand Expansion and Asset-Light Models', kicker: '', leftTitle: 'Brand company', rightTitle: 'Hotel owner',
      rows: [
        { label: 'Real estate', a: 'Expands without owning most of it', b: 'Holds the property' },
        { label: 'Provides or receives', a: 'Provides systems, loyalty and standards', b: 'Receives access to systems, loyalty and standards' },
        { label: 'Money flow', a: 'Earns fees', b: 'Pays fees' },
        { label: 'Obligations', a: 'Maintains the brand and its standards', b: 'Meets standards and funds capex' },
        { label: 'Growth means', a: 'Group growth', b: 'Owner return' },
      ],
      note: 'Asset-light group growth is not owner return growth; model fee and capex obligations.',
      takeaway: 'Brands can expand without owning most real estate.',
    },
  },
  'hospitality-hotels-m5-9': {
    heading: 'Investment routes differ; announcement is not supply',
    intro: 'Owners choose among several investment routes. Every route then passes through the same stages, which should be tracked separately.',
    spec: {
      layout: 'pathway', title: 'Hospitality Investment and Destination Development', kicker: '',
      trunk: [
        { label: 'Destination demand and access', detail: 'Is it sustainable for new supply?', kind: 'decision' },
      ],
      optionsLabel: 'Investment routes — alternatives, not steps',
      options: [
        { label: 'Development', detail: 'New hotel or resort' },
        { label: 'Acquisition', detail: 'Buy an existing property' },
        { label: 'Repositioning', detail: 'Change an existing asset’s offer' },
        { label: 'Mixed-use hospitality', detail: 'Hotel combined with other uses' },
      ],
      afterLabel: 'Track each stage separately',
      after: [
        { label: 'Announced investment' },
        { label: 'Pipeline', detail: 'Under way, not yet open' },
        { label: 'Opening', detail: 'Completed room supply' },
        { label: 'Operating results', kind: 'outcome' },
      ],
      note: 'Announced investment is not completed room supply. Separate pipeline, opening and operating results.',
      takeaway: 'New supply should follow sustainable destination demand and access.',
    },
  },
  'hospitality-hotels-m5-10': {
    heading: 'The kinds of rules a property must check',
    intro: 'These are separate groups of obligations, not steps. Which ones apply depends on the property type, its location and the law in force now.',
    spec: {
      layout: 'taxonomy', title: 'Accommodation, Classification and Consumer Rules', kicker: '',
      root: 'Hotel obligations', rootDetail: 'Depend on property type, location and current law',
      groups: [
        { label: 'Accommodation category', detail: 'Which type of accommodation the property is' },
        { label: 'Minimum conditions', detail: 'Conditions the category must meet' },
        { label: 'Classification', detail: 'Class or rating rules where they apply' },
        { label: 'Guest and consumer rules', detail: 'Duties owed to guests as consumers' },
        { label: 'Contract and transaction rules', detail: 'Terms of booking, payment and stay' },
      ],
      note: 'A provider claim does not prove legal compliance. Verify current amendments, property class and locality.',
      takeaway: 'Hotel obligations depend on property type, location and current law.',
    },
  },
  'hospitality-hotels-m5-11': {
    heading: 'Duties stay with the operator and owner',
    intro: 'The operator and owner sit at the centre of several duties. Contractors can deliver services, but the duties around them do not move.',
    spec: {
      layout: 'ecosystem', title: 'Safety, Labor and Guest Data', kicker: '',
      center: { label: 'Operator and owner', detail: 'Hold safety, employment and data duties' },
      actors: [
        { label: 'Guests', relation: 'Rely on fire, building, food and security safety', flows: ['service', 'risk'] },
        { label: 'Guest information', relation: 'Personal data the property must protect', flows: ['information', 'risk'] },
        { label: 'Workforce', relation: 'Employment duties owed to staff', flows: ['service', 'money'] },
        { label: 'Outsourced providers', relation: 'Deliver services; duties are not transferred', flows: ['service', 'risk'] },
        { label: 'Official authorities', relation: 'Set the current rules to verify', flows: ['oversight'] },
      ],
      note: 'Outsourcing does not remove operator or owner duties. Verify current official rules.',
      takeaway: 'Hotel operations combine multiple safety, employment and data duties.',
    },
  },
  'hospitality-hotels-m5-12': {
    heading: 'Sustainability evidence is built asset by asset',
    intro: 'Each resource area connects to operating activities in the property. Evidence comes from measuring those areas against the asset’s own baseline.',
    spec: {
      layout: 'driverTree', title: 'Energy, Water, Waste and Resilience', kicker: '',
      root: { label: 'Asset-level sustainability evidence', detail: 'Measured outcomes, not stated targets' },
      formula: 'Evidence = measured outcome compared with the baseline',
      drivers: [
        { label: 'Energy', detail: 'Building systems and controls', children: [{ label: 'Systems' }, { label: 'Laundry' }] },
        { label: 'Water', detail: 'Daily operating use', children: [{ label: 'Housekeeping' }] },
        { label: 'Waste', detail: 'What comes in and what is thrown out', children: [{ label: 'Kitchens' }, { label: 'Procurement' }] },
        { label: 'Climate resilience', detail: 'How the asset withstands climate risk', children: [{ label: 'Asset exposure' }] },
      ],
      note: 'EDGE thresholds are baseline-based, not guaranteed profit or savings. Measure asset-level outcomes.',
      takeaway: 'Sustainability should connect asset and operating evidence.',
    },
  },
  'hospitality-hotels-m5-13': {
    heading: 'From visitor arrivals to hotel results',
    intro: 'Tourism demand has to convert several times before it reaches a hotel’s occupancy. Each step differs by destination and segment.',
    spec: {
      layout: 'flow', title: 'Vietnam Tourism and Accommodation Demand', kicker: '',
      steps: [
        { label: 'Visitor arrivals', detail: 'International and domestic guest sources' },
        { label: 'Reach the destination', detail: 'Depends on connectivity' },
        { label: 'Choose a hotel stay', detail: 'Product fit against competing supply', kind: 'decision' },
        { label: 'Room nights by season', detail: 'Stay length and seasonal timing' },
        { label: 'Occupancy and revenue', detail: 'Property-level result', kind: 'outcome' },
      ],
      note: 'Arrivals are not occupancy or hotel revenue. Use destination-level conversion evidence.',
      takeaway: 'Vietnam tourism supports opportunity unevenly across destinations and segments.',
    },
  },
  'hospitality-hotels-m5-14': {
    heading: 'Add an offer only if contribution rises',
    intro: 'Each candidate offer or repositioning gets the same test. Revenue alone does not decide it, because ancillary revenue can come with high incremental cost.',
    spec: {
      layout: 'decision', title: 'Revenue Diversification and Repositioning', kicker: '',
      root: { label: 'Candidate offer or repositioning', detail: 'F&B, MICE, wellness, long stay, renovation or room mix' },
      question: 'Against demand evidence and capex, does department contribution rise?',
      branches: [
        { condition: 'Demand evidenced, contribution rises', outcome: 'Proceed and track the department', tone: 'positive' },
        { condition: 'Revenue rises, cost unclear', outcome: 'Model department contribution first', detail: 'Include incremental cost and capex', tone: 'caution' },
        { condition: 'Weak demand or cost outweighs revenue', outcome: 'Do not add the offer', tone: 'negative' },
      ],
      note: 'Ancillary revenue can carry high incremental cost.',
      takeaway: 'Hotels can expand contribution through relevant ancillary offers and asset repositioning.',
    },
  },
  'hospitality-hotels-m5-15': {
    heading: 'Each investment needs its own proof of return',
    intro: 'Each row is a separate investment area. Read across to see the lever it pulls and the evidence needed before calling it a return.',
    spec: {
      layout: 'table', title: 'Productivity, Technology and Sustainable Investment', kicker: '', headers: ['Investment area', 'Lever', 'Evidence before scaling'],
      rows: [
        { label: 'Systems and automation', a: 'Automation of selected tasks', b: 'Pilot result against a baseline' },
        { label: 'Training', a: 'Labor and service productivity', b: 'Service and productivity versus baseline' },
        { label: 'Controls', a: 'Consistent operations', b: 'Monitored results, not adoption' },
        { label: 'Direct channels', a: 'Distribution', b: 'Net contribution after channel cost' },
        { label: 'Resource efficiency', a: 'Energy', b: 'Measured use against the baseline' },
      ],
      note: 'Technology adoption alone does not prove financial return. Use pilots, baselines and scenario-tested payback.',
      takeaway: 'Future competitiveness combines service productivity with disciplined capital.',
    },
  },
};
