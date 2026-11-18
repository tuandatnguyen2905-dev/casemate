import type { VisualSpec } from './fashionVisualKit';
import type { GamingChapterVisual } from './gamingM1VisualSpecs';

/** Chapter-specific Learning Visuals for Gaming Module 04, keyed by visualKind. */
export const GAMING_M4_VISUALS: Record<string, GamingChapterVisual> = {
  'gaming-m4-11-structure': {
    heading: 'Concentrated at the top, crowded everywhere else',
    intro: 'The same industry contains arenas where a few platforms and franchises hold power and arenas where entry is broad. Read each column as a different competitive arena, not a ranking.',
    spec: {
      layout: 'compare', title: 'Market Concentration and Competitive Dynamics', kicker: '', leftTitle: 'More concentrated arenas', rightTitle: 'Broad-entry arenas',
      rows: [
        { label: 'Where it applies', a: 'Console ecosystems and established live games', b: 'Mobile and PC' },
        { label: 'Typical competitors', a: 'Large publishers and platforms', b: 'Thousands of independent studios' },
        { label: 'Source of power', a: 'Franchise IP, retained players, control of distribution', b: 'Focused genres, a distinctive niche, cost-efficient iteration' },
        { label: 'Chapter example', a: 'A publisher leverages a franchise and global marketing', b: 'An indie competes through a distinctive niche' },
      ],
      note: 'Vietnamese studios often compete internationally through mobile production and focused genres. Define the arena before drawing market-share or entry-barrier conclusions.',
      takeaway: 'Market power depends on segment, IP, player retention and control of distribution.',
    },
  },
  'gaming-m4-12-pressure': {
    heading: 'What a game competes for beyond direct rivals',
    intro: 'A game competes for players’ time and spending, and also for the access, visibility and production inputs it needs. Each box is a separate arena of competition.',
    spec: {
      layout: 'taxonomy', title: 'Types of Competition and Sources of Competitive Pressure', kicker: '',
      root: 'Sources of competitive pressure', rootDetail: 'Direct and indirect — categories, not a sequence',
      groups: [
        { label: 'Player time and spend', items: ['Direct rivals: similar titles', 'Substitutes: streaming and social media', 'Other access models: subscription, F2P, premium'] },
        { label: 'Access and visibility', items: ['Platform ecosystems', 'Marketing visibility', 'Ad inventory and creators'] },
        { label: 'Production inputs', items: ['Specialist talent', 'IP licenses'] },
      ],
      note: 'A casual mobile game competes with other games and short-form video for short sessions; Vietnamese studios acquiring globally compete for ad inventory, creators and talent beyond local rivals.',
      takeaway: 'Games compete with direct rivals and alternative entertainment for limited time and spending.',
    },
  },
  'gaming-m4-13-barriers': {
    heading: 'Launching is easy; sustainable traction is the barrier',
    intro: 'Each stage after launch raises a different commercial barrier. Technical barriers have fallen, while discovery, retention and scale remain hard.',
    spec: {
      layout: 'flow', title: 'Barriers to Entry and Industry Mobility', kicker: '',
      steps: [
        { label: 'Build and ship', detail: 'Engines and stores lower technical barriers' },
        { label: 'Get noticed', detail: 'Crowded discovery and acquisition cost' },
        { label: 'Retain players', detail: 'Retention, community and live operations' },
        { label: 'Scale', detail: 'Analytics, localization, marketing and capital' },
        { label: 'Sustainable traction', detail: 'Profitable, retained international players', kind: 'outcome' },
      ],
      note: 'Skill, capital, brand and regulation apply throughout. Vietnamese entrants can begin in focused genres, then build publishing and lifecycle capabilities rather than enter direct scale contests.',
      takeaway: 'The key barrier is often sustainable commercial traction rather than launch capability.',
    },
  },
  'gaming-m4-21-publishers': {
    heading: 'What publisher scale buys — and what it puts at risk',
    intro: 'Each advantage of a large publisher comes with a matching exposure. Tencent, Sony, Microsoft, Nintendo, EA, Take-Two and NetEase combine these differently.',
    spec: {
      layout: 'compare', title: 'Global Publishers and Intellectual Property Owners', kicker: '', leftTitle: 'Advantage of scale', rightTitle: 'Matching risk to manage',
      rows: [
        { label: 'Intellectual property', a: 'Recognizable IP supports sequel demand and adjacent value', b: 'Franchise concentration' },
        { label: 'Capital', a: 'Funds ambitious products', b: 'High budgets make each major miss expensive' },
        { label: 'Production', a: 'Experience across releases', b: 'Long cycles concentrate release risk' },
        { label: 'Distribution', a: 'Global distribution and platforms', b: 'Platform exposure' },
        { label: 'Innovation', a: 'New products beside the portfolio', b: 'Must complement existing franchises' },
      ],
      note: 'Nintendo differentiates hardware and proprietary IP; EA emphasizes sports and recurring communities; Take-Two relies on major premium franchises. These are benchmarks, not a ranking.',
      takeaway: 'Large publishers gain from IP portfolios, capital, distribution and experience while managing franchise and production risk.',
    },
  },
  'gaming-m4-22-platforms': {
    heading: 'Platforms sit between players and developers',
    intro: 'A platform competes for both sides at once: player scale attracts games and catalog depth attracts players. Tags show what flows across each relationship.',
    spec: {
      layout: 'ecosystem', title: 'Platforms, Storefronts and Gaming Ecosystems', kicker: '',
      center: { label: 'Platform / storefront', detail: 'Controls distribution, discovery, transactions and standards' },
      actors: [
        { label: 'Players', relation: 'Installed audience drawn by catalog depth', flows: ['product', 'money'] },
        { label: 'Third-party developers', relation: 'Follow player scale; accept fees, certification and terms', flows: ['product', 'money', 'oversight'] },
        { label: 'First-party studios', relation: 'Own content that differentiates the ecosystem', flows: ['product'] },
        { label: 'Subscription services', relation: 'Catalog access offered as a service', flows: ['service', 'money'] },
        { label: 'Developer tools', relation: 'Standards and tools for building games', flows: ['service', 'information'] },
      ],
      note: 'PlayStation, Xbox and Nintendo combine hardware and services; Steam/Epic serve PC; app stores serve mobile. Rules and storefront visibility create developer dependence.',
      takeaway: 'Control over distribution, discovery, transactions and standards influences developer economics and strategy.',
    },
  },
  'gaming-m4-23-specialists': {
    heading: 'Focused positions open to smaller competitors',
    intro: 'Smaller firms choose a position rather than outspend large publishers. The last box lists constraints every focused competitor shares.',
    spec: {
      layout: 'taxonomy', title: 'Independent Studios, Mobile Publishers and Specialized Competitors', kicker: '',
      root: 'Specialized competitors', rootDetail: 'Positions, not a size ranking',
      groups: [
        { label: 'PC indies', detail: 'Reach players through stores and creators' },
        { label: 'Mobile publishers', detail: 'Rapid experimentation, UA, ads, IAP and portfolio management' },
        { label: 'Co-development studios', detail: 'Export specialized production services' },
        { label: 'Technology specialists', detail: 'Serve focused segments and global audiences' },
        { label: 'Shared constraints', items: ['Discoverability', 'Finance', 'Talent retention', 'Reliance on individual releases'] },
      ],
      note: 'Amanotes, Sky Mavis and Hiker Games illustrate different Vietnam-founded or local positions. Benchmark release frequency, cost, concentration, IP ownership and paid-acquisition dependence.',
      takeaway: 'Smaller companies compete through specialization, production efficiency and differentiated products.',
    },
  },
  'gaming-m4-31-framework': {
    heading: 'Seven benchmark layers in three lenses',
    intro: 'Compare only relevant competitors, using the same definitions, across every layer. The groups show which layers answer strategic, commercial or operational questions.',
    spec: {
      layout: 'taxonomy', title: 'Benchmarking Framework and Evaluation Criteria', kicker: '',
      root: 'Competitor benchmark', rootDetail: 'Same business model, platform, genre and scale; consistent definitions',
      groups: [
        { label: 'Strategic lens', items: ['Market position', 'Portfolio', 'Innovation'] },
        { label: 'Player and commercial lens', items: ['Players', 'Commercial results'] },
        { label: 'Operational lens', items: ['Marketing', 'Operations'] },
      ],
      note: 'A mobile studio compares retention and LTV with similar titles rather than with a premium console publisher, because premium, F2P and platform businesses create value differently.',
      takeaway: 'Relevant competitors and consistent definitions create a more reliable benchmark than one universal ranking.',
    },
  },
  'gaming-m4-32-global': {
    heading: 'Strength comes from alignment, not one winning model',
    intro: 'Each global competitor combines the same five elements differently. Read the chips as examples of configurations, not scores.',
    spec: {
      layout: 'driverTree', title: 'Comparative Benchmarking of Major Global Competitors', kicker: 'Qualitative patterns — not audited scores',
      root: { label: 'Competitive strength', detail: 'Alignment among the five elements' },
      drivers: [
        { label: 'Capabilities', detail: 'What the company can repeatedly execute', children: [{ label: 'Ecosystem integration' }, { label: 'Niche agility' }] },
        { label: 'IP', detail: 'Franchises that carry demand', children: [{ label: 'Franchises' }, { label: 'Proprietary IP' }] },
        { label: 'Access', detail: 'How players reach the games', children: [{ label: 'Hardware' }, { label: 'PC' }, { label: 'Subscriptions' }] },
        { label: 'Audience', detail: 'Who the configuration is built for', children: [{ label: 'Mobile portfolios' }, { label: 'Focused niches' }] },
        { label: 'Monetization', detail: 'How value is captured from that audience' },
      ],
      note: 'Nintendo emphasizes differentiated hardware and IP; Microsoft spans Xbox, PC and subscription; indies emphasize focus and agility. State evidence, scope and uncertainty behind every comparison.',
      takeaway: 'Competitive strength depends on alignment among capabilities, IP, access, audience and monetization.',
    },
  },
  'gaming-m4-33-vietnam': {
    heading: 'Vietnam’s reach versus the value it captures',
    intro: 'The left column is verified reach data; the right column lists what a fuller benchmark must add. Downloads alone do not show profitability.',
    spec: {
      layout: 'compare', title: 'Benchmarking Vietnam’s Gaming Industry', kicker: '', leftTitle: 'Reach data (GameGeek, 2025)', rightTitle: 'Value-capture benchmark',
      rows: [
        { label: 'Scale', a: '4.9B downloads within its scope', b: 'International revenue exposure' },
        { label: 'Studios', a: '210 active studios within its scope', b: 'Portfolio diversity by studio' },
        { label: 'Players', a: 'Installs', b: 'Retention and revenue per player' },
        { label: 'Business model', a: 'Shift toward IAP/hybrid models', b: 'Long-lived titles' },
        { label: 'Ownership', a: 'Mobile production strength', b: 'Original IP' },
      ],
      note: 'VNGGames, Amanotes, Sky Mavis and mobile-first studios hold different positions and risk profiles. A smaller retained, monetizing cohort can be stronger than high short-lived downloads.',
      takeaway: 'Vietnam’s strength in mobile production needs stronger monetization, retention, original IP and global publishing to capture more value.',
    },
  },
  'gaming-m4-41-product': {
    heading: 'What builds a durable product advantage',
    intro: 'Gameplay quality is the foundation; differentiation and IP only add value on top of it. Each driver shows what the studio controls.',
    spec: {
      layout: 'driverTree', title: 'Product Quality, Differentiation and Intellectual Property', kicker: '',
      root: { label: 'Durable product advantage', detail: 'Audience fit plus execution' },
      drivers: [
        { label: 'Core gameplay quality', detail: 'Foundational: controls, stability and value', children: [{ label: 'Controls' }, { label: 'Stability' }, { label: 'QA' }] },
        { label: 'Differentiation', detail: 'A reason to choose this game', children: [{ label: 'Distinctive art' }, { label: 'Originality' }] },
        { label: 'Intellectual property', detail: 'Difficult-to-copy value that can extend', children: [{ label: 'Original IP' }, { label: 'Franchise familiarity' }] },
        { label: 'Audience fit', detail: 'Guides execution', children: [{ label: 'Player research' }, { label: 'Content planning' }] },
      ],
      note: 'A Vietnamese studio can combine folklore and distinctive art with globally familiar genre mechanics — but originality cannot compensate for poor controls, stability or value.',
      takeaway: 'Sustainable advantage emerges when product quality and differentiation are supported by clear audience fit and execution.',
    },
  },
  'gaming-m4-42-acquisition': {
    heading: 'From audience definition to retained players',
    intro: 'Acquisition starts with who the game is for and ends with measured cohort quality, which then redirects spend.',
    spec: {
      layout: 'flow', title: 'Distribution, Marketing and Player Acquisition', kicker: '',
      steps: [
        { label: 'Define the audience', detail: 'Positioning and targeting come first' },
        { label: 'Choose channels', detail: 'Stores, ads, creators, communities, PR' },
        { label: 'Creative and localization', detail: 'Test creative; localize by market' },
        { label: 'Retained contribution?', detail: 'Compare retention and revenue by channel and market', kind: 'decision' },
        { label: 'Better cohorts', detail: 'Optimize for player quality, not installs', kind: 'outcome' },
      ],
      loop: 'A mobile publisher shifts spend from cheap low-retention installs to better cohorts.',
      note: 'Organic discovery and trust complement paid reach as acquisition costs rise.',
      takeaway: 'Strong acquisition combines positioning, channel selection, creative marketing and performance measurement.',
    },
  },
  'gaming-m4-43-operations': {
    heading: 'Short-term spending push versus durable live operation',
    intro: 'Short-term spending cannot indefinitely make up for poor retention or expensive operations. Compare the two approaches across the same dimensions.',
    spec: {
      layout: 'compare', title: 'Monetization, Retention and Operational Excellence', kicker: '', leftTitle: 'Short-term spending push', rightTitle: 'Durable live operation',
      rows: [
        { label: 'Main lever', a: 'Escalating promotions', b: 'Meaningful updates and reliability' },
        { label: 'Monetization', a: 'Spending prioritized over fit', b: 'Transparent design that fits the experience' },
        { label: 'Retention', a: 'Weak retention offset by spend', b: 'Retention supports the economics' },
        { label: 'Costs', a: 'Expensive operations left unchecked', b: 'Budgets, acquisition, platform fees, service cost tracked' },
        { label: 'Measured against', a: 'Short-term spending', b: 'Economics alongside player satisfaction' },
      ],
      note: 'Live games need servers, content, support and communities; premium titles need production and launch discipline. Studios can use analytics and hybrid monetization while protecting trust.',
      takeaway: 'Monetization, retention and operating efficiency must work together for durable performance.',
    },
  },
  'gaming-m4-51-swot': {
    heading: 'Industry-level SWOT for gaming',
    intro: 'Four groups summarize the industry as a whole. Each factor still needs an owner, a response and a measure for a specific studio.',
    spec: {
      layout: 'taxonomy', title: 'Industry SWOT Analysis', kicker: '',
      root: 'Gaming industry SWOT', rootDetail: 'Industry level — not equal for every studio',
      groups: [
        { label: 'Strengths', items: ['Global audiences', 'Platforms and distribution', 'Monetization', 'IP and communities'] },
        { label: 'Weaknesses', items: ['Hit-driven risk', 'Cost', 'Platform dependence'] },
        { label: 'Opportunities', items: ['Global reach', 'Cross-platform', 'Emerging markets', 'Tools'] },
        { label: 'Threats', items: ['UA cost', 'Regulation', 'Disputes', 'Fatigue'] },
      ],
      note: 'Vietnam combines international mobile reach with uneven studio maturity, financing, IP and publishing capability.',
      takeaway: 'The central challenge is converting audience scale and creative potential into sustainable commercial value.',
    },
  },
  'gaming-m4-52-challenges': {
    heading: 'Eight connected pressures and the responses that build resilience',
    intro: 'The pressures are grouped by where they hit the operating model. Because they interact, the last group lists responses that work across all of them.',
    spec: {
      layout: 'taxonomy', title: 'Major Strategic Challenges and Emerging Pressures', kicker: '',
      root: 'Strategic pressures', rootDetail: 'Interconnected — respond as a system, not one at a time',
      groups: [
        { label: 'Production and content', items: ['Production risk', 'Live-service fatigue'] },
        { label: 'Acquisition and access', items: ['UA cost', 'Platform dependency'] },
        { label: 'Technology and rules', items: ['AI governance', 'Regulation', 'Security'] },
        { label: 'People', items: ['Talent gaps'] },
        { label: 'Integrated responses', items: ['Financial discipline', 'Reliability', 'Market knowledge', 'Responsible operations'] },
      ],
      note: 'A studio facing higher UA cost improves onboarding, community discovery and market testing before scaling spend. A fix for one metric can add cost, trust or compliance risk elsewhere.',
      takeaway: 'Major pressures are interconnected and require integrated rather than isolated responses.',
    },
  },
  'gaming-m4-53-priorities': {
    heading: 'Which strategic initiatives deserve scarce capital and talent',
    intro: 'Every priority competes for the same capital and talent. Test each candidate against fit, economics, capability gaps and measurable long-term contribution.',
    spec: {
      layout: 'decision', title: 'Strategic Priorities for Global and Vietnamese Gaming Businesses', kicker: '',
      root: { label: 'Candidate initiative', detail: 'Portfolio discipline, original IP, global publishing, retention, data/operations, partnerships or responsible innovation' },
      question: 'Does it fit our position and economics, close a real capability gap and add measurable long-term value?',
      branches: [
        { condition: 'Clear fit and gap', outcome: 'Prioritize and resource it', detail: 'Builds repeatable capability, owned IP or player lifetime value', tone: 'positive' },
        { condition: 'Gap we cannot close alone', outcome: 'Close it through a partnership', detail: 'Partnerships should close real gaps', tone: 'caution' },
        { condition: 'Only adds more output', outcome: 'Do not prioritize', detail: 'Producing more games is not the strategy', tone: 'negative' },
      ],
      note: 'A Vietnamese studio combines efficient mobile production, global partners, owned IP and retention analytics to turn download reach into retained revenue and long-lived products.',
      takeaway: 'Strong strategy builds repeatable capabilities, player lifetime value and IP that supports future growth.',
    },
  },
};
