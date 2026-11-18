import type { HotelChapterVisual } from './hospitalityHotelsVisualSpecs';

/** Chapter-specific Learning Visuals for Hotels & Resorts Module 03, keyed by visualKind. */
export const HOTELS_M3_VISUALS: Record<string, HotelChapterVisual> = {
  'hospitality-hotels-m3-1': {
    heading: 'One entity, two returns: from hotel revenue to owner cash',
    intro: 'An owner-operator funds and runs the property, but its money still passes through an operating layer and an owner layer. Read left to right to see where gross operating profit stops and owner cash begins.',
    spec: {
      layout: 'flow', title: 'Owner-Operated and Independent Hotels', kicker: '',
      steps: [
        { label: 'Hotel revenue', detail: 'Rooms and other departments the owner-operator runs', owner: 'Operating role' },
        { label: 'Operating costs', detail: 'Staff, brand, service and running costs', owner: 'Operating role' },
        { label: 'Gross operating profit', detail: 'Hotel-level operating result', owner: 'Operating role' },
        { label: 'Financing', detail: 'Cost of the capital used to fund the asset', owner: 'Owner role' },
        { label: 'Capital expenditure', detail: 'Reinvestment in the property', owner: 'Owner role' },
        { label: 'Owner net cash', kind: 'outcome', owner: 'Owner role' },
      ],
      note: 'Hotel GOP is still not owner net cash after financing and capex — separate operating and owner returns even when one entity holds both roles.',
      takeaway: 'Owner-operators combine asset and hotel operating economics.',
    },
  },
  'hospitality-hotels-m3-2': {
    heading: 'Who runs the hotel under each agreement',
    intro: 'Management contracts and franchises are alternative ways to bring in a brand company. Compare each row to see how operating control and fees are allocated.',
    spec: {
      layout: 'compare', title: 'Management Contracts and Franchising', kicker: 'Alternative models, not stages', leftTitle: 'Management contract', rightTitle: 'Franchise',
      rows: [
        { label: 'Who runs the hotel', a: 'The manager operates it for the owner', b: 'The owner or its chosen operator' },
        { label: 'Brand company provides', a: 'Management of the property', b: 'A license to use the brand and systems' },
        { label: 'Brand company earns', a: 'Management fees under the agreement', b: 'Franchise fees under the agreement' },
        { label: 'Controls', a: 'Defined fees, standards and performance terms', b: 'Brand standards and contractual controls' },
        { label: 'Owner keeps', a: 'The asset and the property economics', b: 'The asset, property economics and operating choice' },
      ],
      note: 'Brand fee revenue differs from guest-facing property revenue. Read the actual agreement terms rather than assuming a standard deal.',
      takeaway: 'Management and franchise models allocate operating control differently.',
    },
  },
  'hospitality-hotels-m3-3': {
    heading: 'Scaling systems versus operating a complex place',
    intro: 'Two different ways to build a hotel business, plus a reminder about individual properties. Read across each row to see how each earns and what it has to manage.',
    spec: {
      layout: 'table', title: 'Asset-Light Groups and Integrated Resorts', kicker: 'Alternative models, not stages', headers: ['Model', 'How it earns', 'What it must manage'],
      rows: [
        { label: 'Asset-light hotel group', a: 'Management, franchise and licensing fees', b: 'Brand, platform and system scale' },
        { label: 'Integrated resort', a: 'Rooms plus F&B, leisure and events', b: 'A complex physical experience and ancillary operations' },
        { label: 'A property in a group system', a: 'Guest-facing property revenue', b: 'Owner and operator vary; the brand alone does not show them' },
      ],
      note: 'Marriott reported owning or leasing less than 1% of its system (company 10-K). Do not infer every property owner or operator from the brand.',
      takeaway: 'Asset-light groups scale systems while integrated resorts operate complex physical experiences.',
    },
  },
  'hospitality-hotels-m3-4': {
    heading: 'What goes into a sellable room category',
    intro: 'Each room category combines physical attributes with a service promise. The groups are building blocks used together, not steps.',
    spec: {
      layout: 'taxonomy', title: 'Accommodation and Room Products', kicker: '',
      root: 'Room category', rootDetail: 'Building blocks combined into each room type — not a sequence',
      groups: [
        { label: 'Physical attributes', items: ['Room size', 'Location and view', 'Bed configuration', 'Occupancy'] },
        { label: 'Service promise', items: ['Amenities', 'Privileges', 'Service level'] },
      ],
      note: 'Upselling raises ADR only when guests value the difference. Every extra category adds inventory and housekeeping complexity, so align the two.',
      takeaway: 'Room categories combine physical attributes and service promises.',
    },
  },
  'hospitality-hotels-m3-5': {
    heading: 'F&B and MICE revenue has to cover its own costs',
    intro: 'Departmental contribution is revenue from outlets and events less the food, labor and setup cost of delivering them. Plus signs add revenue; minus signs are costs.',
    spec: {
      layout: 'driverTree', title: 'Food, Beverage and MICE', kicker: '',
      root: { label: 'Departmental contribution', detail: 'Measured for F&B and MICE separately from rooms' },
      formula: 'Departmental revenue − food, labor and setup cost',
      drivers: [
        { label: 'Outlet revenue', op: '+', detail: 'Hotel guests and local customers', children: [{ label: 'Restaurant' }, { label: 'Bar' }] },
        { label: 'Banquet and event revenue', op: '+', detail: 'Groups and corporate clients', children: [{ label: 'Banquet' }, { label: 'Meeting' }, { label: 'Event' }] },
        { label: 'Food cost', op: '−', detail: 'Ingredients and beverages consumed' },
        { label: 'Labor', op: '−', detail: 'Kitchen, service and event staff' },
        { label: 'Setup cost', op: '−', detail: 'Preparing function space for each event' },
      ],
      note: 'Banquet revenue carries food, labor and setup cost, so measure departmental contribution rather than revenue alone.',
      takeaway: 'Ancillary departments diversify revenue and operating complexity.',
    },
  },
  'hospitality-hotels-m3-6': {
    heading: 'Add an experience only where guests and seasons support it',
    intro: 'Before adding a spa, activity or long-stay offer, ask whether the target guest wants it across the year. Each branch shows the likely result.',
    spec: {
      layout: 'decision', title: 'Resort, Wellness and Extended Experiences', kicker: '',
      root: { label: 'Proposed experience product', detail: 'Spa, recreation, wellness, family or long-stay offer' },
      question: 'Does target-guest demand support it across the seasons?',
      branches: [
        { condition: 'Demand in most seasons', outcome: 'Differentiates the destination and extends spend', tone: 'positive' },
        { condition: 'Demand mainly in peak season', outcome: 'Plan low-season use before building', detail: 'More facilities can create idle capacity in low season', tone: 'caution' },
        { condition: 'No clear target guest', outcome: 'Idle capacity and cost without differentiation', tone: 'negative' },
      ],
      note: 'Resorts combine accommodation with wellness, activities, transport and local experiences; match the offer to guest and season.',
      takeaway: 'Experience products can differentiate destinations and extend spend.',
    },
  },
  'hospitality-hotels-m3-7': {
    heading: 'What the traveler wants and what the account negotiates',
    intro: 'Business demand has two sides: the person staying and the company contracting the rooms. The groups are considered together, not in sequence.',
    spec: {
      layout: 'taxonomy', title: 'Business and Corporate Travelers', kicker: '',
      root: 'Business and corporate demand', rootDetail: 'Guest needs and account terms judged together',
      groups: [
        { label: 'Traveler priorities', items: ['Location and access', 'Reliability', 'Workspace', 'Speed of service'] },
        { label: 'Account terms negotiated', items: ['Rate', 'Availability', 'Billing', 'Cancellation'] },
        { label: 'How the hotel judges it', detail: 'Account contribution, not the contracted rate alone' },
      ],
      note: 'A contracted rate can trade ADR for base demand, so measure what each account contributes.',
      takeaway: 'Business guests prioritize access, consistency and efficient service.',
    },
  },
  'hospitality-hotels-m3-8': {
    heading: 'Why a long stay is priced and serviced differently',
    intro: 'Leisure segments differ by party, occasion and stay pattern. This directional comparison contrasts a shorter leisure stay with a long stay.',
    spec: {
      layout: 'compare', title: 'Leisure, Families and Long-Stay Guests', kicker: 'Directional comparison', leftTitle: 'Shorter leisure stay', rightTitle: 'Long stay',
      rows: [
        { label: 'What guests value', a: 'Experience, occasion and value', b: 'Space, flexibility and value' },
        { label: 'Nightly rate', a: 'Priced for each night', b: 'Longer stays can carry a lower rate' },
        { label: 'Housekeeping', a: 'Regular service frequency', b: 'Frequency can be reduced' },
        { label: 'Economics to model', a: 'Rate, dining and activity spend per stay', b: 'Total stay revenue against reduced service cost' },
      ],
      note: 'Couples, families, groups and long-stay guests value different rooms, dining and activities; use length-of-stay economics.',
      takeaway: 'Leisure segments differ by party, occasion and stay pattern.',
    },
  },
  'hospitality-hotels-m3-9': {
    heading: 'Will a group fill the hotel or displace better business?',
    intro: 'A group or MICE request should be judged against what the same dates would earn without it. Each branch shows the likely answer.',
    spec: {
      layout: 'decision', title: 'MICE, Groups and International Guests', kicker: '',
      root: { label: 'Group or MICE request', detail: 'Room block, function space, catering and transport under contract' },
      question: 'What would the same dates earn without the group?',
      branches: [
        { condition: 'Dates would otherwise sell weakly', outcome: 'Group adds rooms, F&B and event revenue', tone: 'positive' },
        { condition: 'Forecast is uncertain', outcome: 'Model total contribution by date first', tone: 'caution' },
        { condition: 'Higher-rated transient demand expected', outcome: 'Group may displace better-paying guests', tone: 'negative' },
      ],
      note: 'International groups add language and transport requirements to the contract and to service delivery.',
      takeaway: 'Group demand coordinates rooms with events and logistics.',
    },
  },
  'hospitality-hotels-m3-10': {
    heading: 'Three room metrics from the same month',
    intro: 'Move the sliders to change rooms sold and room revenue for a hypothetical 100-room hotel. Occupancy, ADR and RevPAR each answer a different question.',
    spec: {
      layout: 'scenario', title: 'Occupancy, ADR and RevPAR', kicker: 'Hypothetical figures from the chapter example',
      inputs: [
        { key: 'sold', label: 'Rooms sold in the month', min: 1500, max: 3000, step: 50, value: 2250, unit: 'room nights' },
        { key: 'revenue', label: 'Room revenue', min: 150000, max: 360000, step: 5000, value: 270000, unit: 'USD' },
      ],
      outputs: [
        { label: 'Occupancy (rooms sold ÷ available)', unit: '%', digits: 1, compute: (v) => (v.sold / 3000) * 100 },
        { label: 'ADR (room revenue ÷ rooms sold)', unit: 'USD', digits: 0, compute: (v) => v.revenue / v.sold },
        { label: 'RevPAR (room revenue ÷ available)', unit: 'USD', digits: 0, compute: (v) => v.revenue / 3000 },
      ],
      assumption: 'Hypothetical 100-room hotel over 30 days, so 3,000 room nights are available. Not a benchmark.',
      note: 'At the defaults: 2,250 ÷ 3,000 = 75% occupancy; USD270,000 ÷ 2,250 = USD120 ADR; USD270,000 ÷ 3,000 = USD90 RevPAR. RevPAR is not total profit.',
      takeaway: 'Core room metrics answer different questions and require aligned definitions.',
    },
  },
  'hospitality-hotels-m3-11': {
    heading: 'Same gross booking, different net revenue by channel',
    intro: 'Revenue management forecasts and prices first, then allocates rooms to alternative channels and manages booking risk. The hypothetical figures show why net, not gross, is the target.',
    spec: {
      layout: 'pathway', title: 'Channel and Revenue Management Economics', kicker: 'Hypothetical channel figures from the chapter example',
      trunk: [
        { label: 'Forecast demand', detail: 'By date, booking window and length of stay' },
        { label: 'Price rooms', detail: 'Set rates against the forecast' },
      ],
      optionsLabel: 'Allocate inventory across channels',
      options: [
        { label: 'OTA', detail: 'Hypothetical: USD20k gross − 18% commission = USD16.4k net' },
        { label: 'Direct', detail: 'Hypothetical: USD20k gross − USD1.4k acquisition/payment = USD18.6k net' },
      ],
      afterLabel: 'Then manage booking risk',
      after: [
        { label: 'Booking window and stay length', detail: 'Control when and how long guests book' },
        { label: 'Cancellation and overbooking', detail: 'Protect the forecast from lost rooms' },
        { label: 'Net contribution', kind: 'outcome' },
      ],
      note: 'The comparison is incomplete until service and cancellation effects are included.',
      takeaway: 'Revenue management should optimize net contribution, not gross bookings alone.',
    },
  },
  'hospitality-hotels-m3-12': {
    heading: 'From room revenue to gross operating profit',
    intro: 'A hypothetical month at 60% occupancy. Grey bars add revenue, red bars subtract costs, and dark bars are running totals.',
    spec: {
      layout: 'waterfall', title: 'Total Revenue, GOP and Hotel KPIs', kicker: 'Hypothetical figures from the chapter example',
      unit: 'USD thousands', basis: 'Hypothetical month: 3,000 available room nights, 1,800 occupied',
      items: [
        { label: 'Rooms revenue', value: 180, kind: 'start' },
        { label: 'Ancillary revenue', value: 45, kind: 'add' },
        { label: 'Total revenue', value: 225, kind: 'total' },
        { label: 'Variable cost', value: 54, kind: 'subtract' },
        { label: 'Fixed operating cost', value: 120, kind: 'subtract' },
        { label: 'GOP', value: 51, kind: 'total' },
      ],
      note: 'GOPPAR = USD51,000 ÷ 3,000 available room nights = USD17. GOP is before owner-level items, so state those exclusions.',
      takeaway: 'Hotel profitability combines room, ancillary, departmental and undistributed costs.',
    },
  },
  'hospitality-hotels-m3-13': {
    heading: 'Direct bookings still carry a cost',
    intro: 'The value of direct channels is booking revenue and repeat guests, less the cost of acquiring the booking and running the technology. Plus signs add value; minus signs are costs.',
    spec: {
      layout: 'driverTree', title: 'Direct Website and Brand Channels', kicker: '',
      root: { label: 'Net value of direct bookings', detail: 'After acquisition and technology cost' },
      drivers: [
        { label: 'Direct booking revenue', op: '+', detail: 'Driven by conversion of eligible visits and calls', children: [{ label: 'Website' }, { label: 'App' }, { label: 'Call center' }, { label: 'Email' }] },
        { label: 'Repeat stays', op: '+', detail: 'Loyalty and the customer relationship bring guests back', children: [{ label: 'Loyalty' }] },
        { label: 'Acquisition cost', op: '−', detail: 'Marketing and servicing cost to win the booking' },
        { label: 'Technology cost', op: '−', detail: 'Running the website, app and booking systems' },
      ],
      note: 'Direct is not automatically cheaper for every booking. Measure net cost and repeat behavior.',
      takeaway: 'Direct channels improve customer relationship but still incur acquisition and technology cost.',
    },
  },
  'hospitality-hotels-m3-14': {
    heading: 'The intermediaries between the hotel and its demand',
    intro: 'Intermediaries give the hotel reach under commercial terms. Tags show what each relationship mainly carries.',
    spec: {
      layout: 'ecosystem', title: 'OTAs, GDS and Travel Trade', kicker: '',
      center: { label: 'Hotel', detail: 'Sets inventory, rate and commission terms' },
      actors: [
        { label: 'OTAs', relation: 'Market and sell rooms online for a commission', flows: ['product', 'money'] },
        { label: 'GDS', relation: 'Carries rates and availability to travel sellers', flows: ['information'] },
        { label: 'Travel agencies', relation: 'Book for leisure and corporate travelers', flows: ['product', 'money'] },
        { label: 'Tour operators', relation: 'Combine rooms into leisure and group offers', flows: ['product', 'money'] },
        { label: 'Travelers', relation: 'Leisure, corporate and group demand reached via intermediaries', flows: ['service'] },
      ],
      note: 'OTA gross booking value is not hotel net revenue. Manage inventory, rate and commission for each intermediary.',
      takeaway: 'Intermediaries provide reach under commercial terms and customer-control trade-offs.',
    },
  },
  'hospitality-hotels-m3-15': {
    heading: 'Three contracted channels and what makes them pay',
    intro: 'Corporate accounts, group blocks and loyalty are alternative ways to secure committed demand. Read across to see what is agreed and what decides its value.',
    spec: {
      layout: 'table', title: 'Corporate, Group and Loyalty Distribution', kicker: 'Alternative channels, not stages', headers: ['Channel', 'What is agreed', 'What decides its value'],
      rows: [
        { label: 'Corporate accounts', a: 'Negotiated account rate and terms', b: 'Total account contribution, not rate alone' },
        { label: 'Groups and MICE', a: 'Room blocks and events', b: 'Block wash and cancellation against the forecast' },
        { label: 'Loyalty members', a: 'Member benefits that encourage return', b: 'Repeat stays the programme actually generates' },
      ],
      note: 'Room block wash and cancellation affect the forecast, so track each account by its total contribution.',
      takeaway: 'Contracted and loyalty channels balance base demand with rate and commitment.',
    },
  },
  'hospitality-hotels-m3-16': {
    heading: 'Separate roles around one hotel asset',
    intro: 'Each party plays a different economic role around the same property. Tags show what each relationship mainly carries.',
    spec: {
      layout: 'ecosystem', title: 'Owners, Operators, Brands and Developers', kicker: '',
      center: { label: 'Hotel property', detail: 'One asset, several separable roles' },
      actors: [
        { label: 'Owner', relation: 'Funds the asset', flows: ['money'] },
        { label: 'Developer', relation: 'Delivers the asset', flows: ['product'] },
        { label: 'Operator / manager', relation: 'Runs the hotel', flows: ['service'] },
        { label: 'Brand / franchisor', relation: 'Licenses brand and systems', flows: ['information'] },
        { label: 'Investor', relation: 'Bears capital risk', flows: ['money', 'risk'] },
      ],
      note: 'One party may hold multiple roles, but the economics remain separable — map the contracts and cash flows.',
      takeaway: 'Hotel systems separate real estate capital from operating and brand roles.',
    },
  },
  'hospitality-hotels-m3-17': {
    heading: 'Booker, payer and guest can be different parties',
    intro: 'One reservation can involve several buyers and intermediaries. The groups are roles to track separately, not steps.',
    spec: {
      layout: 'taxonomy', title: 'Guests, Intermediaries and Corporate Clients', kicker: '',
      root: 'One reservation', rootDetail: 'Track each role separately',
      groups: [
        { label: 'Booker', detail: 'Chooses the channel and terms', items: ['Guest', 'OTA', 'Travel agent', 'Company', 'Organizer'] },
        { label: 'Payer', detail: 'Settles the bill under agreed terms', items: ['Guest', 'Company', 'Organizer', 'Intermediary'] },
        { label: 'Staying guest', detail: 'Receives the service; may not have booked or paid' },
      ],
      note: 'The booking channel may differ from the staying guest, and each party can influence rate, terms and service.',
      takeaway: 'Demand reaches hotels through diverse buyers and intermediaries.',
    },
  },
  'hospitality-hotels-m3-18': {
    heading: 'Partners support the service; the hotel stays accountable',
    intro: 'Suppliers, technology and authorities surround daily hotel operations. Tags show what each relationship mainly carries.',
    spec: {
      layout: 'ecosystem', title: 'Suppliers, Technology and Regulators', kicker: '',
      center: { label: 'Hotel', detail: 'Remains accountable for service and compliance' },
      actors: [
        { label: 'PMS and RMS', relation: 'Reservation, inventory, billing and pricing systems', flows: ['information'] },
        { label: 'Food and linen vendors', relation: 'Supply what service consumes', flows: ['product', 'money'] },
        { label: 'Maintenance and security', relation: 'Keep the property working and safe', flows: ['service'] },
        { label: 'Utilities', relation: 'Essential supply services', flows: ['service', 'money'] },
        { label: 'Labor', relation: 'People who deliver the service', flows: ['service'] },
        { label: 'Authorities', relation: 'Accommodation categories and minimum conditions', flows: ['oversight'] },
      ],
      note: 'Outsourcing does not remove hotel accountability. Verify current Vietnam requirements: Decree No. 168/2017/ND-CP plus amendments and fire, security, labor, food and building rules.',
      takeaway: 'Hotels rely on operational partners and current legal compliance.',
    },
  },
};
