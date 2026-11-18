import type { VisualSpec } from './fashionVisualKit';

export interface SocialChapterVisual { heading: string; intro: string; spec: VisualSpec }

/** Chapter-specific Learning Visuals for Social & Communication Platforms Module 03 (Business Models), keyed by visualKind. */
export const SOCIAL_M3_VISUALS: Record<string, SocialChapterVisual> = {
  'social-m3-1': {
    heading: 'Advertising revenue depends on more than engagement',
    intro: 'Users get free or partly free services while advertisers buy access to their attention. Revenue depends on audiences, inventory, advertiser demand, measurement and trust together.',
    spec: { layout: 'driverTree', title: 'Advertising-Supported and Attention-Based Models', kicker: '',
      root: { label: 'Advertising revenue', detail: 'Attention connected to advertiser demand' },
      drivers: [
        { label: 'Active audiences', detail: 'Who is present and engaged', children: [{ label: 'Time and context' }, { label: 'Audience value' }] },
        { label: 'Ad inventory', detail: 'Sponsored posts, video, display, search', children: [{ label: 'Ad load', detail: 'Balanced against user experience' }, { label: 'Creator-led promotion' }] },
        { label: 'Advertiser demand', detail: 'Bought through automated auctions', children: [{ label: 'Audience targeting' }, { label: 'Predicted outcomes' }] },
        { label: 'Measurement and trust', detail: 'Proof that ads work in safe settings', children: [{ label: 'Performance measurement' }, { label: 'Brand safety and privacy' }] },
      ],
      note: 'Meta sells placements across Facebook and Instagram; YouTube pairs creator video with Google advertising infrastructure; TikTok offers brand and performance formats. In Vietnam, reported user identities are not unique people and are not ad inventory or guaranteed reach.',
      takeaway: 'Advertising-supported platforms monetize the connection between audience attention and advertiser demand.' } },

  'social-m3-2': {
    heading: 'Free access lowers friction; paid tiers must keep earning renewal',
    intro: 'A free core attracts users, and paid plans add features, content, tools or fewer ads. Conversion and retention depend on repeated benefits, good onboarding and fair renewal and cancellation.',
    spec: { layout: 'pathway', title: 'Subscription, Freemium, and Premium Service Models', kicker: '',
      trunk: [
        { label: 'Free core utility', detail: 'Reduces adoption friction' },
        { label: 'Onboarding and repeated benefit', detail: 'Users experience what paid adds' },
      ],
      optionsLabel: 'Paid offers — alternatives, not steps',
      options: [
        { label: 'Individual subscriptions', detail: 'Enhanced features, customization, lower advertising' },
        { label: 'Professional plans', detail: 'Professional tools and administration' },
        { label: 'Community memberships', detail: 'Paid creator memberships and communities' },
        { label: 'Tiered pricing', detail: 'Tiers matched to distinct needs' },
      ],
      afterLabel: 'Keeping paid users',
      after: [
        { label: 'Retention management', detail: 'Cohorts, churn reasons, disciplined renewal and cancellation', kind: 'outcome' },
      ],
      note: 'Vietnam-facing platforms must localize value, language, payment, support and pricing rather than assume global willingness to pay. Track trial-to-paid conversion and lifetime contribution, not subscriber counts alone.',
      takeaway: 'Subscriptions monetize recurring utility and work when paid value is clearly distinguishable from free alternatives.' } },

  'social-m3-3': {
    heading: 'The platform’s role in a transaction decides its revenue and its responsibilities',
    intro: 'A platform may process a payment, facilitate discovery, provide communication infrastructure or send a customer elsewhere. Each role brings different economics and duties.',
    spec: { layout: 'table', title: 'Transaction-Based, Creator-Led, and Business-Service Models', kicker: '',
      headers: ['Platform role', 'Revenue it can capture', 'What it must manage'],
      rows: [
        { label: 'Processes the transaction', a: 'Transaction fees, virtual goods, gifts', b: 'Payments, fraud risk and support' },
        { label: 'Supports creators', a: 'Tips, creator subscriptions, paid communities', b: 'Attractive participant economics' },
        { label: 'Facilitates discovery', a: 'Affiliate commissions, promoted listings', b: 'Relevance and disclosure to users' },
        { label: 'Provides communication', a: 'Official accounts, messaging APIs, automation', b: 'Reliable service for businesses' },
        { label: 'Directs customers externally', a: 'Referral or affiliate value only', b: 'Clear handoff of responsibility' },
      ],
      note: 'One livestream can combine creator gifts, a brand partnership, product discovery, business messages and an external or in-platform purchase. In Vietnam, availability, eligibility, payment, fees and legal duties vary by product and market.',
      takeaway: 'Platforms can capture value at several points in interactions among users, creators, and businesses.' } },

  'social-m3-4': {
    heading: 'Products are grouped by the job users repeatedly need done',
    intro: 'Social products emphasise discovery and audience growth; communication products emphasise direct interaction and timely exchange. Features overlap, but primary user needs separate the categories.',
    spec: { layout: 'taxonomy', title: 'Core Product Categories and Functional Segmentation', kicker: '',
      root: 'Social and communication products', rootDetail: 'Segment by primary user need, not feature count',
      groups: [
        { label: 'Social networking', detail: 'Profiles, feeds, audience growth', items: ['Facebook', 'Instagram'] },
        { label: 'Instant messaging', detail: 'Private and group messaging, calls', items: ['Zalo', 'WhatsApp'] },
        { label: 'Video and content sharing', detail: 'Media and livestream discovery', items: ['YouTube', 'TikTok'] },
        { label: 'Professional networking', detail: 'Professional identity and relationships', items: ['LinkedIn'] },
        { label: 'Community platforms', detail: 'Forums and interest communities' },
        { label: 'Integrated platforms', detail: 'Communication plus commerce-related services' },
      ],
      note: 'Zalo’s reported active-user figure is a company-defined measure and should not be compared directly with identity or advertising-reach figures.',
      takeaway: 'Products overlap, but primary user needs remain a better segmentation basis than feature count.' } },

  'social-m3-5': {
    heading: 'Service layers give each participant group its own tools around one core product',
    intro: 'Recommendations, creator tools, ad systems, official accounts and safety controls extend a core product. Each participant group needs different interfaces, and layers help retention only when usable and trustworthy.',
    spec: { layout: 'ecosystem', title: 'Service Layers and Differentiation', kicker: '',
      center: { label: 'Core product', detail: 'Extended by integrated service layers' },
      actors: [
        { label: 'Users', relation: 'Personalized feed, search and discovery', flows: ['product', 'information'] },
        { label: 'Creators', relation: 'Publishing tools and analytics', flows: ['product', 'information'] },
        { label: 'Advertisers', relation: 'Campaign tools and ad systems', flows: ['money', 'information'] },
        { label: 'Businesses', relation: 'Official accounts, APIs and integrations', flows: ['service', 'money'] },
        { label: 'Premium subscribers', relation: 'Paid premium functionality', flows: ['money', 'product'] },
        { label: 'Safety and privacy', relation: 'Moderation, verification, privacy controls', flows: ['oversight', 'risk'] },
      ],
      note: 'In Vietnam, language quality, local discovery, support, reliability and culturally relevant safety operations can be material differentiators.',
      takeaway: 'Differentiation comes from the combined experience, not the number of features.' } },

  'social-m3-6': {
    heading: 'Each platform position is judged on different qualities and expands differently',
    intro: 'Users judge messaging by reliability and contact coverage, video by content and recommendations, and professional networks by credibility. Adjacent expansion works only where the platform has a credible advantage.',
    spec: { layout: 'table', title: 'Market Segmentation by Use Case and Platform Positioning', kicker: '',
      headers: ['Platform position', 'Users judge it by', 'Typical adjacent move'],
      rows: [
        { label: 'Communication utility', a: 'Reliability and contact coverage', b: 'Adds business tools' },
        { label: 'Entertainment destination', a: 'Content and recommendations', b: 'Adds shopping and livestreams' },
        { label: 'Relationship network', a: 'Relevant people and communities', b: 'Adds video discovery' },
        { label: 'Professional environment', a: 'Credibility and opportunity', b: 'Extends professional communication' },
        { label: 'Customer channel', a: 'Responsive customer engagement', b: 'Deepens business workflows' },
        { label: 'Multi-purpose service', a: 'Convenience across routines', b: 'Risks product complexity' },
      ],
      note: 'Vietnamese users commonly combine local and global services, so ask which routine each service owns rather than declaring one universal winner.',
      takeaway: 'A clear core purpose creates retention; adjacent expansion works only where the platform has credible advantage.' } },

  'social-m3-7': {
    heading: 'Individual users bring several distinct needs, often met by different services',
    intro: 'People communicate, discover, express identity and join communities. Motivations vary by age, lifestyle, occupation and context, so users combine services.',
    spec: { layout: 'taxonomy', title: 'Individual Users and Digital Communities', kicker: '',
      root: 'Individual user needs', rootDetail: 'Segment by need and behavior — one person can hold several',
      groups: [
        { label: 'Relationship maintenance', detail: 'Private groups for family and friends' },
        { label: 'Content consumption', detail: 'Short video and entertainment' },
        { label: 'Self-expression', detail: 'Expressing identity, building audiences' },
        { label: 'Community participation', items: ['Local', 'Interest', 'Fandom', 'Educational', 'Professional'] },
        { label: 'Information access', detail: 'Forums for advice and information' },
        { label: 'Convenience and control', detail: 'Privacy, safety, accessibility, relevance' },
      ],
      note: 'In Vietnam, broad digital adoption creates diverse needs; identity counts describe platform availability, not one uniform audience.',
      takeaway: 'Engagement depends on recurring personal or social utility, and users are not one homogeneous audience.' } },

  'social-m3-8': {
    heading: 'Creators, publishers and community administrators need different things from a platform',
    intro: 'Creators seek discovery and sustainable income, publishers seek reach and credibility, and administrators need moderation tools. Ranking, monetization and eligibility changes can alter reach and income for all three.',
    spec: { layout: 'table', title: 'Creators, Publishers, and Community Administrators', kicker: '',
      headers: ['Participant', 'What they seek', 'What they do to stay resilient'],
      rows: [
        { label: 'Creators', a: 'Discovery, analytics, sustainable income', b: 'Adapt formats across services, keep an owned channel' },
        { label: 'Publishers', a: 'Reach, traffic, subscriptions, credibility', b: 'Distribute across platforms despite complexity' },
        { label: 'Community administrators', a: 'Moderation and member-management tools', b: 'Manage comments and community rules' },
      ],
      note: 'A video creator monitors watch time and retention and combines sponsorships with memberships. Vietnamese creators need clear rights, monetization eligibility, local-language tools and appeal processes.',
      takeaway: 'Creators and community operators are ecosystem partners whose participation depends on tools, access, incentives, and governance.' } },

  'social-m3-9': {
    heading: 'The business objective decides which platform evidence matters',
    intro: 'Businesses and institutions use platforms for awareness, leads, sales, support, recruitment and public information. Needs vary by size, budget and objective, so outcomes come before channel choice.',
    spec: { layout: 'decision', title: 'Advertisers, Businesses, and Institutional Customers', kicker: '',
      root: { label: 'Business or institutional customer', detail: 'Brand, performance, SME, enterprise, publisher or institution' },
      question: 'What outcome must the channel deliver?',
      branches: [
        { condition: 'Reach and awareness', outcome: 'Plan with defined reach measures', detail: 'Ad reach is a planning measure, not unique people', tone: 'positive' },
        { condition: 'Direct response or sales', outcome: 'Test outcomes within attribution limits', detail: 'Page, messages, livestream demos, follow-up', tone: 'positive' },
        { condition: 'Service efficiency', outcome: 'Check integration and controls first', detail: 'Enterprises may need APIs and reporting', tone: 'caution' },
        { condition: 'Audience size only', outcome: 'Not enough to choose a channel', detail: 'Needs objective-specific evidence', tone: 'negative' },
      ],
      note: 'YouTube’s reported advertising reach in Vietnam is an ad-planning measure, not active users or unique population.',
      takeaway: 'Businesses value achievable outcomes, not audience size in isolation.' } },

  'social-m3-10': {
    heading: 'Revenue streams a platform can combine around its core proposition',
    intro: 'Platforms combine advertising, subscriptions, creator, business-service and commerce revenue. Each added stream needs product, billing, support and fraud controls and can conflict with user expectations.',
    spec: { layout: 'taxonomy', title: 'Revenue Streams and Monetization Mix', kicker: '',
      root: 'Revenue mix', rootDetail: 'Proportional contribution of distinct streams',
      groups: [
        { label: 'Advertising revenue', detail: 'Placements sold against attention' },
        { label: 'Subscription revenue', items: ['Premium plans', 'Verification-related features'] },
        { label: 'Creator-related revenue', items: ['Gifts', 'Memberships'] },
        { label: 'Business-service revenue', items: ['Business accounts', 'Messaging or API fees'] },
        { label: 'Commerce-related revenue', items: ['Affiliate commissions', 'Transaction fees', 'Listings'] },
      ],
      note: 'Meta’s reported revenue shows its own concentration in advertising, not an industry-wide ratio. A Vietnam-facing platform may choose a different mix based on use case, payment behavior and business demand.',
      takeaway: 'Revenue diversity may improve resilience, but the best mix must fit the core value proposition.' } },

  'social-m3-11': {
    heading: 'Where platform costs sit and what makes each one grow',
    intro: 'Costs span infrastructure, engineering and AI, moderation, sales, creator incentives, rights, legal and privacy. Video and AI intensify compute, and ecosystem scale expands fraud, safety and support demands.',
    spec: { layout: 'table', title: 'Cost Structure and Major Operating Expenses', kicker: '',
      headers: ['Cost area', 'Examples', 'What pushes it up'],
      rows: [
        { label: 'Infrastructure and hosting', a: 'Compute, storage, networks, video delivery', b: 'Video and AI intensify compute' },
        { label: 'Research and development', a: 'Engineering, AI, compensation', b: 'Continuous product innovation' },
        { label: 'Trust and safety', a: 'Moderation, cybersecurity, fraud controls', b: 'Ecosystem scale expands risk' },
        { label: 'Sales and marketing', a: 'Advertiser sales, customer support', b: 'New revenue products add service' },
        { label: 'Content and partner costs', a: 'Creator incentives, rights, payments', b: 'Livestream and creator programs' },
        { label: 'Corporate and compliance', a: 'Legal, privacy, administration', b: 'Local data and content obligations' },
      ],
      note: 'A livestream service bears encoding, CDN, moderation, creator support, payments and fraud costs on top of engineering. Model fixed, variable, step and ecosystem costs separately.',
      takeaway: 'Scale can lower average cost but does not remove continuous investment in quality, innovation, safety, and trust.' } },

  'social-m3-12': {
    heading: 'Financial sustainability breaks down into acquisition cost, lifetime contribution and trust',
    intro: 'Advertising, subscription and business-service models each have their own unit metrics. More ads or aggressive acquisition can lift a short-term metric while weakening retention.',
    spec: { layout: 'driverTree', title: 'Unit Economics and Financial Sustainability', kicker: '',
      root: { label: 'Financial sustainability', detail: 'Durable relationships and contribution' },
      formula: 'Contribution-based LTV compared with cohort CAC and payback',
      drivers: [
        { label: 'CAC', detail: 'Acquisition cost under a defined method and period', children: [{ label: 'Cohort-based cost' }, { label: 'Payback period' }] },
        { label: 'LTV', detail: 'Expected contribution over the relationship', children: [{ label: 'ARPU', detail: 'Defined revenue and user denominator' }, { label: 'Retention and churn' }, { label: 'Contribution margin' }] },
        { label: 'Advertising efficiency', detail: 'Yield, impressions, pricing', children: [{ label: 'Advertiser retention' }, { label: 'Advertiser outcomes' }] },
        { label: 'Revenue quality and trust', detail: 'Guards against short-term gains', children: [{ label: 'Marginal service cost' }, { label: 'Trust indicators' }] },
      ],
      note: 'ARPU can rise from price, mix, ad load or denominator changes. Do not derive monetization from identity, active-user or ad-reach figures unless revenue and users share entity, period, geography and method.',
      takeaway: 'Sustainability depends on durable relationships and contribution, not raw user or interaction volume.' } },

  'social-m3-13': {
    heading: 'Many entry channels, one activation path to lasting participation',
    intro: 'Users arrive through stores, web, search, shared links, invites, creators and paid campaigns. Network effects turn invitations into acquisition, but activation needs onboarding and an early value moment.',
    spec: { layout: 'pathway', title: 'Digital Distribution and User Acquisition Channels', kicker: '',
      trunk: [
        { label: 'Reason to join', detail: 'A group invite, shared link or recommendation' },
      ],
      optionsLabel: 'Entry channels — alternatives, not steps',
      options: [
        { label: 'App stores and websites', detail: 'Direct install or sign-up' },
        { label: 'Referral acquisition', detail: 'Contact invites, groups, shared content' },
        { label: 'Search and discovery', detail: 'Search, creators, recommendations' },
        { label: 'Paid acquisition', detail: 'Paid campaigns' },
        { label: 'Device integrations', detail: 'Device or service integrations' },
      ],
      afterLabel: 'Onboarding and activation',
      after: [
        { label: 'Register and onboard' },
        { label: 'Find contacts or interests' },
        { label: 'Early value moment', detail: 'Participation that sustains utility', kind: 'outcome' },
      ],
      note: 'In Vietnam, localization, device diversity, contact coverage, creators and community relevance affect adoption. Judge channels by activation and retention, not installs alone.',
      takeaway: 'The strongest distribution attracts participants who experience value and sustain platform utility.' } },

  'social-m3-14': {
    heading: 'Self-service tools scale; enterprise and partner channels handle complexity',
    intro: 'Small businesses need accessible tools, while large organizations may need planning, brand controls, reporting and integration. Platforms combine dashboards with direct sales, agencies and technology partners.',
    spec: { layout: 'compare', title: 'Advertising Sales and Business-to-Business Channels', kicker: '',
      leftTitle: 'Self-service advertiser', rightTitle: 'Enterprise and partner-led customer',
      rows: [
        { label: 'How they buy', a: 'Dashboard: choose objective and budget', b: 'Platform sales team with agencies' },
        { label: 'What they need', a: 'Accessible, simple tools', b: 'Planning, brand controls, reporting, procurement' },
        { label: 'Integration', a: 'Business accounts', b: 'APIs and approved technology providers' },
        { label: 'Ongoing support', a: 'Onboarding and training', b: 'Account management and customer success' },
        { label: 'Main tradeoff', a: 'Scale at low sales cost', b: 'Higher cost, longer implementation' },
      ],
      note: 'In Vietnam, local agencies and solution providers translate platform capabilities into market-specific creative, onboarding, operations and support.',
      takeaway: 'Self-service creates scale; direct teams and partners address complexity and adoption.' } },

  'social-m3-15': {
    heading: 'Social reach starts the journey; messaging, CRM and owned channels carry it forward',
    intro: 'Businesses and creators combine social, messaging, websites, email and CRM to manage inquiries, follow-up and retention. Spreading across channels reduces dependence on one algorithm but needs coordinated data and permissions.',
    spec: { layout: 'flow', title: 'Cross-Platform Distribution and Customer Relationship Management', kicker: '',
      steps: [
        { label: 'Public post', detail: 'Creates discovery and awareness', owner: 'Social platform' },
        { label: 'Messaging conversation', detail: 'Handles questions and inquiries', owner: 'Messaging channel' },
        { label: 'Permitted CRM record', detail: 'Lawful record of leads and follow-up', owner: 'CRM workflow' },
        { label: 'Repeat service', detail: 'Continuity and retention', kind: 'outcome', owner: 'Owned channel' },
      ],
      loop: 'Satisfied customers return through owned channels, reducing dependence on any single algorithm or ad system.',
      note: 'Organizations must apply relevant privacy and data-processing obligations when connecting platform interactions with customer workflows.',
      takeaway: 'Social reach supports discovery; owned channels and sound CRM processes support continuity.' } },

  'social-m3-16': {
    heading: 'Who supplies what to a platform — and what each participant wants back',
    intro: 'Operators build products and govern distribution, users supply activity, creators supply content, businesses fund commercial use and authorities enforce rules. Their incentives can reinforce or conflict.',
    spec: { layout: 'ecosystem', title: 'Core Ecosystem Participants and Their Roles', kicker: '',
      center: { label: 'Platform operators', detail: 'Build products and govern distribution' },
      actors: [
        { label: 'Users and communities', relation: 'Supply demand and activity; want privacy and control', flows: ['information'] },
        { label: 'Creators and publishers', relation: 'Supply content; want access and economics', flows: ['product', 'money'] },
        { label: 'Advertisers and businesses', relation: 'Fund commercial use; want safety', flows: ['money'] },
        { label: 'Technology suppliers', relation: 'Telecom and cloud infrastructure; want revenue', flows: ['service', 'money'] },
        { label: 'Agencies and partners', relation: 'Implement campaigns and services', flows: ['service'] },
        { label: 'Regulators', relation: 'Enforce rules for public-interest outcomes', flows: ['oversight'] },
      ],
      note: 'In Vietnam, global platforms, Zalo and other local services, creators, businesses, telecom and cloud suppliers, agencies and public institutions form the local ecosystem.',
      takeaway: 'Competitiveness depends on aligning interdependent participants, not platform ownership alone.' } },

  'social-m3-17': {
    heading: 'Each complementor adds capability — and a dependency to govern',
    intro: 'Developers, payment and software providers, agencies, creators, cloud and security firms add capabilities or reach. Policy, API, fee, security or partner changes can disrupt the products that depend on them.',
    spec: { layout: 'table', title: 'Partnerships, Complementors, and Ecosystem Development', kicker: '',
      headers: ['Complementor', 'Value it adds', 'Dependency risk'],
      rows: [
        { label: 'Developer ecosystems', a: 'Apps and integrations on platform APIs', b: 'API or policy changes' },
        { label: 'Advertising partnerships', a: 'Agencies and ad technology reach', b: 'Fee and policy changes' },
        { label: 'Creator partnerships', a: 'Content owners and creators add supply', b: 'Shifting eligibility and economics' },
        { label: 'Business integrations', a: 'Messaging APIs connected to CRM', b: 'Shared security and support duties' },
        { label: 'Infrastructure partnerships', a: 'Cloud, network, payments, cybersecurity', b: 'Partner or security changes' },
      ],
      note: 'Partner governance sets standards, permissions, certification, service levels, security review, change notice, portability and exit options. Local partners add language, payments, content and support capabilities.',
      takeaway: 'Complementors expand value, while transparent standards and governance contain dependency and coordination risk.' } },

  'social-m3-18': {
    heading: 'Accountable governance turns a platform decision into a reviewable process',
    intro: 'Large operators control ranking, account access, monetization and data access, and participants may have little influence over changes. A policy update can remove monetization eligibility, so sound governance gives notice, reasons and appeal.',
    spec: { layout: 'flow', title: 'Governance, Power Relationships, and Stakeholder Risks', kicker: '',
      steps: [
        { label: 'Platform change', detail: 'Algorithm, policy, fee, account or API', owner: 'Platform operator' },
        { label: 'Notice and reasons', detail: 'Affected participants are told why', owner: 'Platform operator' },
        { label: 'Review and appeal', detail: 'Content and account appeals', kind: 'decision', owner: 'Participant and platform' },
        { label: 'Remediation', detail: 'Correct errors and restore access', owner: 'Platform operator' },
        { label: 'Predictable enforcement', detail: 'Transparency and accountability', kind: 'outcome' },
      ],
      note: 'Participants should diversify critical channels, keep permitted customer relationships and test continuity, and also meet applicable data, content, consumer, advertising and cybersecurity obligations.',
      takeaway: 'Platform power creates coordination efficiencies and dependency risks that require accountable governance and alternatives.' } },
};
