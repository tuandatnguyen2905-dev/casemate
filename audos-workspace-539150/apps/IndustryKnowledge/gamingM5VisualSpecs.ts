import type { VisualSpec } from './fashionVisualKit';
import type { GamingChapterVisual } from './gamingM1VisualSpecs';

/** Chapter-specific Learning Visuals for Gaming Module 05, keyed by visualKind. */
export const GAMING_M5_VISUALS: Record<string, GamingChapterVisual> = {
  'gaming-m5-11-player': {
    heading: 'Five player expectations and the design that answers each',
    intro: 'Each row pairs an expectation with what players are looking for and a design feature from the chapter. Players differ in which rows matter most.',
    spec: {
      layout: 'table', title: 'Changing Player Expectations and Consumption Behavior', kicker: '', headers: ['Expectation', 'What players seek', 'Design example from the chapter'],
      rows: [
        { label: 'Social play', a: 'Social connection', b: 'Guilds support social bonds' },
        { label: 'Short sessions', a: 'Convenience', b: 'Short mobile sessions' },
        { label: 'Competition', a: 'Mastery', b: 'Ranked play' },
        { label: 'Identity', a: 'Expression and story', b: 'Cosmetics support identity' },
        { label: 'Quality', a: 'High technical quality', b: 'Service expectations raised by streaming, creators and communities' },
      ],
      note: 'Vietnamese products should define target motives and device contexts rather than assume one national player profile.',
      takeaway: 'Retention depends on the whole experience and continuing reasons to return while respecting time and spending limits.',
    },
  },
  'gaming-m5-12-community': {
    heading: 'The community around a game markets it and informs it',
    intro: 'Each group around the game either drives discovery or feeds product intelligence back to the studio, and some do both.',
    spec: {
      layout: 'ecosystem', title: 'Creator Culture, Communities and Player-Led Discovery', kicker: '',
      center: { label: 'The game and its studio', detail: 'Sets creator, moderation, IP and feedback rules' },
      actors: [
        { label: 'Creators', relation: 'Livestreams and short videos demonstrate play', flows: ['information'] },
        { label: 'UGC makers & modders', relation: 'Mods and maps extend lifespan', flows: ['product'] },
        { label: 'Micro-communities', relation: 'Language- and genre-specific cohorts', flows: ['information'] },
        { label: 'Testers & issue reporters', relation: 'Public test servers and issue trackers give feedback', flows: ['information'] },
        { label: 'Wider player community', relation: 'Reactions amplify satisfaction or frustration', flows: ['risk'] },
      ],
      note: 'Memorable mechanics can spread through creators before players search. Authentic participation needs clear rules.',
      takeaway: 'The player community is both a marketing channel and a source of product intelligence.',
    },
  },
  'gaming-m5-13-spending': {
    heading: 'Spending that builds trust versus spending that erodes it',
    intro: 'The left column keeps spending optional, understandable and fair. The right column may lift short-term revenue while damaging retention.',
    spec: {
      layout: 'compare', title: 'Spending Behavior, Value Perception and Trust', kicker: '', leftTitle: 'Builds long-term trust', rightTitle: 'Short-term revenue, retention risk',
      rows: [
        { label: 'Competitive balance', a: 'Cosmetics preserve balance', b: 'Pay-to-win' },
        { label: 'Progression', a: 'Battle passes with manageable progression', b: 'Grinding' },
        { label: 'Purchase prompts', a: 'Optional spending proportionate to value', b: 'Aggressive prompts' },
        { label: 'Rewards & terms', a: 'Transparent terms', b: 'Unclear rewards' },
        { label: 'What to track', a: 'Sentiment, payer conversion and retained contribution', b: 'Revenue alone' },
      ],
      note: 'Purchases, subscriptions, ads, passes and virtual goods serve different segments; judge revenue growth beside retention, sentiment and potential harm.',
      takeaway: 'Long-term monetization is strongest when spending is optional, understandable and proportionate to value.',
    },
  },
  'gaming-m5-21-ai': {
    heading: 'How an AI-assisted task stays under human control',
    intro: 'AI speeds up a targeted task, but people still approve the output and check rights before anyone counts the gain.',
    spec: {
      layout: 'flow', title: 'Artificial Intelligence and Data-Driven Game Development', kicker: '',
      steps: [
        { label: 'Target a repetitive task', detail: 'Concepts, assets, localization, QA, analytics or support' },
        { label: 'AI assists', detail: 'Drafts prototypes or detects bug patterns' },
        { label: 'Human review', detail: 'Approve for quality and consistency; creative direction stays human', kind: 'decision' },
        { label: 'Provenance & rights check', detail: 'Copyright, bias and disclosure risks' },
        { label: 'Measure the result', detail: 'Productivity, quality and player outcomes', kind: 'outcome' },
      ],
      note: 'Governance defines data access, rights, human review and acceptable use. Adopt AI workflows where cost and quality benefits are measurable.',
      takeaway: 'AI’s strongest near-term value lies in development efficiency and decision-making while distinctive creative direction remains essential.',
    },
  },
  'gaming-m5-22-connected': {
    heading: 'When connecting devices helps players',
    intro: 'Cross-play, cross-progression and cloud access only reduce friction when the network, the licensing and platform policy all allow it.',
    spec: {
      layout: 'decision', title: 'Cloud Gaming, Cross-Platform Play and Connected Ecosystems', kicker: '',
      root: { label: 'Connected capability', detail: 'Cross-play, cross-progression, cloud streaming, unified accounts or shared social' },
      question: 'Do latency, capacity, licensing and platform policy support it for this title?',
      branches: [
        { condition: 'Technology and rights align', outcome: 'Connect identities across devices', detail: 'Progress and friends persist across PC and console', tone: 'positive' },
        { condition: 'Network quality varies', outcome: 'Offer cloud as a complement', detail: 'Native mobile, PC and console play remain important', tone: 'caution' },
        { condition: 'Licensing or policy blocks it', outcome: 'Do not promise interoperability', detail: 'Coordinate commercial models first', tone: 'negative' },
      ],
      note: 'Connected ecosystems may expand device access in Vietnam where networks and service availability are suitable.',
      takeaway: 'Interoperability can increase reach and reduce friction, but benefits depend on reliable technology and coordinated models.',
    },
  },
  'gaming-m5-23-immersive': {
    heading: 'Emerging technologies grouped by the player benefit they offer',
    intro: 'Groups are kinds of benefit, not a roadmap. Each technology earns a place only if it changes play in a meaningful way.',
    spec: {
      layout: 'taxonomy', title: 'Immersive Experiences, Real-Time Graphics and New Interaction Models', kicker: '',
      root: 'Emerging experience technologies', rootDetail: 'Choose by player benefit, accessibility and economics — not novelty',
      groups: [
        { label: 'Real-time graphics', detail: 'Scalable graphics broaden device support', items: ['Rendering', 'Simulation'] },
        { label: 'Extended content', detail: 'Creator tools extend content', items: ['UGC platforms', 'Procedural systems'] },
        { label: 'New interaction models', detail: 'Adoption depends on hardware, comfort, cost and content', items: ['VR/AR', 'Spatial input'] },
        { label: 'Wider participation', detail: 'Accessibility options widen who can play', items: ['Accessibility'] },
      ],
      note: 'Select technologies that fit target devices and production capacity, and balance ambition with demand and maintainability.',
      takeaway: 'Technology becomes advantage when it creates meaningful player benefit rather than production complexity.',
    },
  },
  'gaming-m5-31-market': {
    heading: 'Newzoo’s 2026 forecast by platform',
    intro: 'Each platform’s forecast revenue sits beside how the chapter describes its growth. All figures are forecasts, not reported results.',
    spec: {
      layout: 'table', title: 'Platform Growth, Market Maturity and Regional Expansion', kicker: 'Newzoo forecast for 2026 — not reported results', headers: ['Platform', 'Newzoo 2026 forecast', 'How growth is described'],
      rows: [
        { label: 'Mobile', a: 'US$121.1B — the largest platform', b: 'Spending deepens even as downloads soften' },
        { label: 'Console', a: 'US$46.9B', b: 'Relies on premium and live-service mixes' },
        { label: 'PC', a: 'US$45.9B', b: 'Relies on premium and live-service mixes' },
        { label: 'Global total', a: 'US$213.9B (+6.1%) and 3.7B players', b: 'Player growth slowing; retention and monetization gain weight' },
      ],
      note: 'Platform cycles, release schedules, spending, subscriptions and regional purchasing power vary. Vietnam can serve emerging-market and global cohorts with localization and suitable payments.',
      takeaway: 'Growth is shifting from reach alone toward sustainable value from existing players and underserved markets.',
    },
  },
  'gaming-m5-32-channels': {
    heading: 'Storefront reach versus a direct player relationship',
    intro: 'Direct channels add to the storefront rather than replace it. Each brings different control and different duties.',
    spec: {
      layout: 'compare', title: 'Distribution, Direct-to-Consumer Channels and Platform Diversification', kicker: '', leftTitle: 'Platform storefront', rightTitle: 'Direct-to-consumer channel',
      rows: [
        { label: 'Role', a: 'Remains central for audience access', b: 'Diversifies alongside stores' },
        { label: 'Player relationship', a: 'Mediated by the platform', b: 'Direct communication through owned communities' },
        { label: 'Offers', a: 'Platform rules apply', b: 'Promotional flexibility for eligible offers' },
        { label: 'Added duties', a: 'Platform dependence', b: 'Payment, security, support and trust' },
        { label: 'What to measure', a: 'Conversion, repeat purchase and retention by source', b: 'Conversion, repeat purchase and retention by source' },
      ],
      note: 'Multi-store publishing and partnerships also diversify channels. Vietnamese publishers can diversify where platform rules and local law permit.',
      takeaway: 'Distribution strategy balances reach, platform access, margin and ownership of the player relationship.',
    },
  },
  'gaming-m5-33-lifecycle': {
    heading: 'Extending a game’s life only where the audience supports it',
    intro: 'After launch, evidence of a sustained audience decides which extensions to try. The options can be combined, and each one still needs a roadmap and a plan for ending service.',
    spec: {
      layout: 'pathway', title: 'Live-Service Operations, Subscriptions and Cross-Media Distribution', kicker: '',
      trunk: [
        { label: 'Launch', detail: 'Lifecycle management begins' },
        { label: 'Sustained audience?', detail: 'Community demand, rights and operating capability', kind: 'decision' },
      ],
      optionsLabel: 'Lifecycle extensions — chosen by evidence, not all at once',
      options: [
        { label: 'Seasons & live service', detail: 'Recurring GaaS content' },
        { label: 'Subscription access', detail: 'Ongoing access to the game' },
        { label: 'Franchise media', detail: 'Merchandise or animation built on the IP' },
        { label: 'Esports & events', detail: 'Tournaments around the community' },
      ],
      afterLabel: 'Every extension then needs',
      after: [
        { label: 'Content roadmap', detail: 'Content capacity, monetization and coordination' },
        { label: 'Sunset decision', detail: 'Plan for end of service', kind: 'outcome' },
      ],
      note: 'Without enough players, recurring content can become a costly obligation. Vietnamese studios can extend culturally distinctive IP when rights, audience and capability support it.',
      takeaway: 'Commercial lifespan increasingly depends on coordinated content, community and distribution after launch.',
    },
  },
  'gaming-m5-41-regulation': {
    heading: 'Building compliance into market-entry planning',
    intro: 'Read left to right: legal review comes before release, so obligations can shape design, timeline and partners.',
    spec: {
      layout: 'flow', title: 'Regulation, Licensing and Market Access', kicker: '',
      steps: [
        { label: 'Pick the target market', detail: 'A game ready for one market may need different approvals' },
        { label: 'Early legal review', detail: 'Official text guides product-specific obligations' },
        { label: 'Assess market obligations', detail: 'Approval, age/content, accounts, advertising and monetization', kind: 'decision' },
        { label: 'Adapt product & partners', detail: 'Design, timeline, monetization, community and local operations' },
        { label: 'Release', detail: 'Scalable distribution with fewer delays and unexpected costs', kind: 'outcome' },
      ],
      note: 'Vietnam: Decree 147/2024/ND-CP took effect 25 December 2024 and governs internet services and online information, including online games.',
      takeaway: 'Regulatory readiness is a prerequisite for scalable distribution.',
    },
  },
  'gaming-m5-42-protection': {
    heading: 'What player trust is built from',
    intro: 'Player trust rests on five capabilities, each backed by the controls the chapter names. Each must be designed in from the start.',
    spec: {
      layout: 'driverTree', title: 'Player Protection, Data Privacy and Responsible Monetization', kicker: '',
      root: { label: 'Player trust', detail: 'Easier to preserve by design than to rebuild after harm' },
      drivers: [
        { label: 'Youth safeguards', detail: 'Matched to the intended audience', children: [{ label: 'Parental controls' }] },
        { label: 'Privacy', detail: 'Account, behaviour, device and payment data collected with a purpose', children: [{ label: 'Privacy by design' }] },
        { label: 'Purchase transparency', detail: 'Repeated commercial prompts stay understandable', children: [{ label: 'Clear prices' }] },
        { label: 'Security', detail: 'Protect accounts and detect risk', children: [{ label: 'Account recovery' }, { label: 'Risk monitoring' }] },
        { label: 'Responsible engagement', detail: 'People and communication alongside technical controls', children: [{ label: 'Human moderation' }, { label: 'Regular review' }] },
      ],
      note: 'Vietnamese operators should align safeguards with the intended audience and applicable rules.',
      takeaway: 'Player protection and responsible monetization should be built in from the beginning.',
    },
  },
  'gaming-m5-43-environment': {
    heading: 'Where gaming’s environmental impact occurs and what reduces it',
    intro: 'Digital games still depend on devices, data centers, networks and energy. Each row links an impact area to a lever from the chapter.',
    spec: {
      layout: 'table', title: 'Environmental Impact and Sustainable Industry Operations', kicker: '', headers: ['Impact area', 'Where impact occurs', 'Lever from the chapter'],
      rows: [
        { label: 'Devices & hardware', a: 'Manufacturing and replacement', b: 'Repair and reuse across the hardware lifecycle' },
        { label: 'Data centers & cloud', a: 'Remote infrastructure and electricity', b: 'Efficient servers' },
        { label: 'Play on devices', a: 'Electricity during play', b: 'Scalable graphics and performance design' },
        { label: 'Digital delivery', a: 'Networks', b: 'Optimized builds' },
        { label: 'Production & merchandise', a: 'Studio workflows and physical goods', b: 'More efficient production workflows' },
      ],
      note: 'Cloud can reduce local hardware needs while increasing remote infrastructure demand. Define boundaries and metrics before making environmental claims.',
      takeaway: 'Sustainability is actionable when integrated into infrastructure, production, procurement and hardware lifecycle decisions.',
    },
  },
  'gaming-m5-51-global': {
    heading: 'What drives growth as audience expansion slows',
    intro: 'Next-phase growth breaks down into five drivers from the chapter. The forecast sets the context, and execution decides the value.',
    spec: {
      layout: 'driverTree', title: 'Global Market Outlook and Growth Drivers', kicker: '',
      root: { label: 'Next-phase growth', detail: 'Reach combined with retention, differentiated IP and disciplined investment' },
      drivers: [
        { label: 'Long-life games', detail: 'Titles that keep players over time' },
        { label: 'Portfolio diversity', detail: 'Spread across models, platforms and markets' },
        { label: 'Retention work', detail: 'Player value matters more than raw expansion' },
        { label: 'Emerging markets', detail: 'Underserved audiences' },
        { label: 'Investment discipline', detail: 'Staged investment with milestone review' },
      ],
      note: 'Newzoo forecasts US$213.9B revenue and 3.7B players in 2026, with mobile largest; forecasts are directional. Acquisition cost, production risk and attention competition remain high.',
      takeaway: 'The next growth phase rewards audience reach combined with retention, differentiated IP and disciplined investment.',
    },
  },
  'gaming-m5-52-vietnam': {
    heading: 'From production reach to value captured per product',
    intro: 'The left column is what GameGeek’s mobile report shows today. The right column lists the capabilities that turn that reach into retained value.',
    spec: {
      layout: 'compare', title: 'Vietnam’s Growth Potential and International Expansion', kicker: 'GameGeek figures are scoped to its 2025 mobile report', leftTitle: 'Production reach (reported)', rightTitle: 'Higher-value capture (next step)',
      rows: [
        { label: 'Output', a: '27,388 games and 210 active studios', b: 'Original IP rather than more releases alone' },
        { label: 'Distribution', a: '4.9B downloads', b: 'Global publishing and localization' },
        { label: 'Monetization', a: '83% IAP growth', b: 'Hybrid monetization and long-term live operations' },
        { label: 'Portfolio', a: 'Reported strengths in Simulation, Puzzle and Arcade', b: 'Choices led by player and financial evidence' },
        { label: 'Foundations', a: 'Efficient production', b: 'Talent, analytics and compliance' },
      ],
      note: 'Scale demonstrates capability; product quality, IP, publishing, retention and monetization determine captured value.',
      takeaway: 'Vietnam can convert mobile production capability into durable IP and higher-value revenue streams.',
    },
  },
  'gaming-m5-53-priorities': {
    heading: 'Priorities differ by market position',
    intro: 'Each position has its own priority. Every one must still meet demand, capability and a credible revenue path.',
    spec: {
      layout: 'taxonomy', title: 'Strategic Opportunities and Priority Actions', kicker: '',
      root: 'Opportunity priorities by position', rootDetail: 'Positions, not a sequence — each tests demand, capability and revenue path',
      groups: [
        { label: 'Independent studios', detail: 'Validate a focused concept' },
        { label: 'Publishers', detail: 'Manage IP portfolios' },
        { label: 'Vietnamese developers', detail: 'Add publishing, localization, analytics and brand to efficient production' },
        { label: 'Technology providers', detail: 'Solve measurable production problems' },
        { label: 'Platforms', detail: 'Operate safe platforms' },
        { label: 'Investors', detail: 'Check IP rights, retention, revenue quality, development and regulatory risk' },
      ],
      note: 'AI, cloud, immersive technology, esports and cross-media involve different investment and uncertainty; popular technology is not automatic value.',
      takeaway: 'The strongest opportunities emerge where market demand, internal capability and a credible revenue path intersect.',
    },
  },
};
