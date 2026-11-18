import type { VisualSpec } from './fashionVisualKit';

export interface SocialChapterVisual { heading: string; intro: string; spec: VisualSpec }

/** Chapter-specific Learning Visuals for Social & Communication Platforms Module 04 (Competitive Landscape), keyed by visualKind. */
export const SOCIAL_M4_VISUALS: Record<string, SocialChapterVisual> = {
  'social-m4-1': {
    heading: 'Define the job first; the competitor set follows from it',
    intro: 'Social networks, messaging, video and professional networks each compete for a different user job. Feature convergence pulls adjacent services into competition, and people multi-home across them.',
    spec: { layout: 'pathway', title: 'Competition Across Platform Categories', kicker: '',
      trunk: [
        { label: 'Define the job', detail: 'Which user need or commercial function?' },
        { label: 'Set the scope', detail: 'Participant, geography and objective' },
      ],
      optionsLabel: 'Competitive arenas — alternatives, not steps',
      options: [
        { label: 'Social networking', detail: 'Relationships and communities, e.g. Facebook groups' },
        { label: 'Messaging', detail: 'Direct coordination, e.g. Zalo everyday messages' },
        { label: 'Video and content', detail: 'Discovery, viewing, creators, e.g. YouTube, TikTok' },
        { label: 'Professional networking', detail: 'Identity and careers, e.g. LinkedIn' },
      ],
      note: 'Cross-category competition grows as features converge, and multi-homing is normal because different products satisfy different jobs. Vietnam is a multi-platform market where global content ecosystems coexist with Zalo’s domestic communication utility.',
      takeaway: 'The relevant competitor set depends on the user need or commercial function being analyzed.' } },

  'social-m4-2': {
    heading: 'Network effects and scale raise entry barriers, but specialization opens a wedge',
    intro: 'Large platforms benefit from contact networks, creators, advertiser demand and infrastructure. A technically viable entrant still has to move networks, attract supply or build demand — unless it serves one need better.',
    spec: { layout: 'table', title: 'Market Concentration, Network Effects, and Barriers to Entry', kicker: '',
      headers: ['Force', 'How it works', 'What an entrant faces'],
      rows: [
        { label: 'Direct network effect', a: 'Utility grows as relevant contacts join', b: 'A messaging app must move contact networks' },
        { label: 'Indirect network effect', a: 'One side’s growth attracts another group', b: 'A content service needs audience and supply' },
        { label: 'Economies of scale', a: 'Infrastructure, AI, security, distribution', b: 'An ad platform needs demand, tools and measurement' },
        { label: 'Switching cost', a: 'Data, relationships, habits lost on moving', b: 'Users resist recreating their workflow' },
        { label: 'Entry through specialization', a: 'Serve a workflow, privacy need or language better', b: 'Avoids head-on replication' },
      ],
      note: 'Platform expansion lets incumbents move into adjacent needs. In Vietnam, domestic relevance and established communication habits can create defensible utility beside much larger global platforms.',
      takeaway: 'Network effects and ecosystem scale reinforce concentration, but focused local or specialist propositions can still enter.' } },

  'social-m4-3': {
    heading: 'Competitive position is built from contested attention, supply, demand and trust',
    intro: 'Platforms compete for viewing and communication time, creator content, advertiser budgets, business workflows and trust. Recommendation, search, targeting and measurement shape relevance but depend on responsible data practice.',
    spec: { layout: 'driverTree', title: 'Competition for Attention, Data, and Commercial Demand', kicker: '',
      root: { label: 'Competitive position', detail: 'Valuable participation and sustained outcomes' },
      drivers: [
        { label: 'Attention competition', detail: 'Viewing and communication time', children: [{ label: 'Retention' }, { label: 'Content quality' }] },
        { label: 'Creator competition', detail: 'Creators compare discovery and economics', children: [{ label: 'Creator health' }, { label: 'Discovery reach' }] },
        { label: 'Advertiser competition', detail: 'Budgets follow relevant reach and outcomes', children: [{ label: 'Cost and measurement' }, { label: 'Brand suitability' }] },
        { label: 'Technology and data', detail: 'Recommendation, search, moderation, targeting', children: [{ label: 'Technical quality' }, { label: 'Data governance' }] },
      ],
      note: 'Businesses in Vietnam should allocate across platforms by audience fit and measured outcomes, not treat national social identities as guaranteed active users on one platform.',
      takeaway: 'Competitive currency is valuable participation and sustained outcomes, not user count alone.' } },

  'social-m4-4': {
    heading: 'Global operators lead through differentiated products, not one dominant platform',
    intro: 'Each parent company’s products serve different use cases, from social networking to short-form video to professional relationships. Analysis should compare specific products, not corporate labels.',
    spec: { layout: 'taxonomy', title: 'Major Global Platform Operators', kicker: '',
      root: 'Global platform operators', rootDetail: 'Grouped by parent company and product role — not a ranking',
      groups: [
        { label: 'Meta', detail: 'Social networking, visual content, messaging', items: ['Facebook', 'Instagram', 'WhatsApp', 'Messenger'] },
        { label: 'Google and YouTube', detail: 'Video, search-like discovery, creators, ads' },
        { label: 'ByteDance and TikTok', detail: 'Short-form recommendation' },
        { label: 'Microsoft and LinkedIn', detail: 'Professional relationships' },
        { label: 'Telegram', detail: 'Channels and messaging' },
        { label: 'Snap', detail: 'Snapchat visual communication' },
      ],
      note: 'Rankings change depending on whether identities, active users, app activity, time, reach or commercial outcomes are measured. Global leadership does not displace local communication context.',
      takeaway: 'Leadership is distributed across differentiated products rather than one universally dominant platform.' } },

  'social-m4-5': {
    heading: 'Vietnam’s main platforms play different roles and are measured in different ways',
    intro: 'Zalo provides domestic messaging and business utility while global services bring social, video and creator ecosystems. The reported audience figures use different definitions, so they cannot be ranked against each other.',
    spec: { layout: 'table', title: 'Vietnam\'s Major Platform Players', kicker: '',
      headers: ['Platform', 'Functional role', 'Reported audience measure'],
      rows: [
        { label: 'Zalo', a: 'Domestic messaging and business utility', b: 'Company-reported monthly active users' },
        { label: 'Facebook', a: 'Social networks, pages and groups', b: 'Advertising audience' },
        { label: 'YouTube', a: 'Long-form and educational video', b: 'Advertising reach' },
        { label: 'TikTok', a: 'Short-form discovery and livestreams', b: 'Adult users in ad resources' },
        { label: 'Messenger', a: 'Direct communication', b: 'No figure cited here' },
        { label: 'Instagram', a: 'Visual and creator content', b: 'No figure cited here' },
      ],
      note: 'DataReportal’s figures use different definitions, age bases, periods and source systems: context, not a comparable active-user ranking. Participants commonly use several of these services.',
      takeaway: 'Competitive importance in Vietnam depends on use case, behavior, and commercial function—not one headline audience figure.' } },

  'social-m4-6': {
    heading: 'Specialists compete on community depth and a distinct interaction model',
    intro: 'Discord, Reddit, LinkedIn and Telegram each organize a specific kind of interaction. AI features may change expectations, but feature presence alone is not durable advantage.',
    spec: { layout: 'taxonomy', title: 'Specialist Competitors and Emerging Areas of Competition', kicker: '',
      root: 'Specialist competition', rootDetail: 'Relevance and community depth, not mass-market scale',
      groups: [
        { label: 'Discord', detail: 'Organized real-time communities' },
        { label: 'Reddit', detail: 'Topic discussion' },
        { label: 'LinkedIn', detail: 'Professional identity' },
        { label: 'Telegram', detail: 'Channels and messaging' },
        { label: 'Specialized communities', items: ['Education', 'Gaming', 'Creators', 'Interest groups'] },
        { label: 'AI-enabled features', detail: 'Emerging area, not advantage by itself', items: ['Translation', 'Summarization', 'Assistance', 'Search'] },
      ],
      note: 'A tightly organized professional or gaming community can offer more useful interaction than a larger general network. In Vietnam, local-language quality, moderation and fit with existing routines affect specialist adoption.',
      takeaway: 'Specialists can compete through relevance and community depth without matching mass-market scale.' } },

  'social-m4-7': {
    heading: 'A credible benchmark records definitions first and never merges incompatible measures',
    intro: 'Benchmarks compare reach, retention, capabilities, monetization and trust. A large potential ad audience does not prove daily use, so every audience number needs its definition recorded.',
    spec: { layout: 'flow', title: 'Benchmarking Framework and Evaluation Criteria', kicker: '',
      steps: [
        { label: 'Define audience measures', detail: 'Source, period, geography, age, entity, construct' },
        { label: 'Apply common indicators', detail: 'Engagement, functionality, monetization, trust' },
        { label: 'Add category criteria', detail: 'Watch time, message reliability, credibility' },
        { label: 'Separate evidence from judgment', detail: 'Measured data versus qualitative view', kind: 'decision' },
        { label: 'Compare without composite ranking', detail: 'Incompatible inputs stay separate', kind: 'outcome' },
      ],
      note: 'Video watch time and creator economics suit YouTube; message reliability and contact utility suit Zalo or WhatsApp; professional credibility suits LinkedIn. Note whether each number is an identity, active-user, ad-reach or other measure.',
      takeaway: 'Useful benchmarks combine common indicators with category-specific criteria.' } },

  'social-m4-8': {
    heading: 'Major platforms side by side: core position and the brand use it suits',
    intro: 'Each platform’s proposition trades off discovery, public versus private interaction, content cost and business tooling. This is a qualitative positioning map, not a measured scorecard.',
    spec: { layout: 'table', title: 'Comparative Positioning of Major Platforms', kicker: '',
      headers: ['Platform', 'Core positioning', 'Example brand use'],
      rows: [
        { label: 'Facebook', a: 'Social and community', b: 'Groups' },
        { label: 'Instagram', a: 'Visual creators', b: 'Not in the chapter’s example' },
        { label: 'YouTube', a: 'Broad video and search', b: 'Considered video' },
        { label: 'TikTok', a: 'Short-form discovery', b: 'Discovery' },
        { label: 'Zalo', a: 'Domestic messaging', b: 'Communication' },
        { label: 'WhatsApp', a: 'Private and group messaging', b: 'Not in the chapter’s example' },
        { label: 'LinkedIn', a: 'Professional networks', b: 'Recruitment' },
        { label: 'Telegram', a: 'Channels and communities', b: 'Not in the chapter’s example' },
      ],
      note: 'Capabilities and monetization availability vary by market and change over time, so check current products in Vietnam alongside any positioning view.',
      takeaway: 'No platform leads every dimension; qualitative positioning should not be mistaken for a measured scorecard.' } },

  'social-m4-9': {
    heading: 'A differentiator is strategic only if it improves outcomes and is hard to copy',
    intro: 'Advantage can come from networks, communities, content, recommendations, language, workflows or trust. Features can be copied; accumulated relationships, habits and credibility are harder to reproduce.',
    spec: { layout: 'decision', title: 'Competitive Differentiation and Strategic Positioning', kicker: '',
      root: { label: 'Candidate differentiator', detail: 'Network, content, technology, local, commercial or trust' },
      question: 'Does it improve acquisition, retention, monetization, utility or trust — and can rivals copy it easily?',
      branches: [
        { condition: 'Improves outcomes, hard to copy', outcome: 'Build positioning on it', detail: 'Relationships, content, habits, credibility', tone: 'positive' },
        { condition: 'Improves outcomes, easy to copy', outcome: 'Temporary edge — keep renewing', detail: 'Feature parity arrives quickly', tone: 'caution' },
        { condition: 'No evidence of customer value', outcome: 'Not strategic differentiation', detail: 'Do not invest by name alone', tone: 'negative' },
      ],
      note: 'A local platform can defend relevance through domestic communication habits, language, small-business needs and support rather than matching every global content feature.',
      takeaway: 'Differentiation is strategic only when it improves acquisition, retention, monetization, utility, or trust.' } },

  'social-m4-10': {
    heading: 'Scale only becomes durable when new participants activate and keep returning',
    intro: 'Platforms connect users with relevant people and content, then sustain utility through activation, reliability and reasons to return. Creators, businesses and advertisers also need to stay.',
    spec: { layout: 'flow', title: 'Audience Scale, Network Effects, and Retention', kicker: '',
      steps: [
        { label: 'Network development', detail: 'Relevant contacts, communities, content' },
        { label: 'User activation', detail: 'Early experience of real utility' },
        { label: 'Recurring reasons to return', detail: 'Reliability, discovery, community quality' },
        { label: 'Retained participation', detail: 'Meaningful, returning use', kind: 'outcome' },
      ],
      loop: 'Cross-side growth: retained users keep creators, businesses and advertisers, whose activity attracts more users.',
      note: 'A large registration base with weak returning use or departing creators is less defensible than headline scale implies. Treat Vietnam’s national social identities as context, not proof of retention.',
      takeaway: 'Scale creates potential; active, relevant, retained participation makes the network durable.' } },

  'social-m4-11': {
    heading: 'Technology and content supply each fail without the other',
    intro: 'Reliable messaging, recommendations and AI assistance work together with creator and community supply. Advanced technology cannot fix irrelevant content, and strong content cannot overcome poor discovery.',
    spec: { layout: 'compare', title: 'Technology, Content, and Product Innovation', kicker: '',
      leftTitle: 'Technology capability', rightTitle: 'Content and community supply',
      rows: [
        { label: 'What it includes', a: 'Reliability, search, recommendations, AI assistance', b: 'Creator publishing, analytics, community content' },
        { label: 'Limit on its own', a: 'Cannot compensate for irrelevant content', b: 'Cannot overcome poor discovery or safety' },
        { label: 'What to test', a: 'Privacy, security, bias, compute cost', b: 'Creator distribution, diversity, retention' },
        { label: 'Vietnam factor', a: 'Local-language data, device performance', b: 'Creator support, context-aware moderation' },
      ],
      note: 'Evaluate a recommendation change on relevance, diversity, retention, creator distribution, safety, compute cost and user control together.',
      takeaway: 'Technology is advantage when it strengthens a distinctive experience or operating capability.' } },

  'social-m4-12': {
    heading: 'Every revenue lever needs a matching trust safeguard',
    intro: 'Advertising, subscriptions, creator programs and business services all rely on predictable policies, security, privacy and appeals. Short-term ad load or fee gains can weaken participants.',
    spec: { layout: 'table', title: 'Monetization, Trust, and Regulatory Adaptability', kicker: '',
      headers: ['Revenue lever', 'What it requires', 'Trust safeguard'],
      rows: [
        { label: 'Creator program', a: 'Clear eligibility rules', b: 'Appeals process' },
        { label: 'Ad product', a: 'Suitable environments', b: 'Credible measurement' },
        { label: 'Data use', a: 'Defined purpose', b: 'Privacy controls' },
        { label: 'Subscriptions and services', a: 'Pricing and product support', b: 'Account security and reporting' },
      ],
      note: 'Data, content, cybersecurity, advertising and consumer requirements can change design and operations; platforms in Vietnam must adapt to applicable data requirements. Integrate legal, privacy and safety decisions before scaling a lever.',
      takeaway: 'Durable strength requires monetization that preserves trust and can adapt to regulatory change.' } },

  'social-m4-13': {
    heading: 'Connecting people at scale is the industry’s main strength and its main governance risk',
    intro: 'Networks, rapid distribution and content ecosystems are strengths; engagement dependence and moderation costs are weaknesses. A useful SWOT names its entity and timeframe and links each factor to action.',
    spec: { layout: 'taxonomy', title: 'Industry SWOT Analysis', kicker: '',
      root: 'Social platform industry SWOT', rootDetail: 'Four quadrants for a defined entity and timeframe',
      groups: [
        { label: 'Strengths', items: ['Networks', 'Rapid distribution', 'Content ecosystems', 'Monetization'] },
        { label: 'Weaknesses', items: ['Engagement dependence', 'Moderation costs', 'Uneven creator economics', 'Participant dependency'] },
        { label: 'Opportunities', items: ['AI', 'Business communication', 'Localization', 'Specialized experiences'] },
        { label: 'Threats', items: ['Security', 'Regulation', 'Misinformation', 'Advertiser pressure'] },
      ],
      note: 'A messaging SWOT should stress reliability and privacy; a content-platform SWOT recommendations, creators and content cost. In Vietnam, local relevance is an opportunity, while global-platform reliance and language-specific safety need active management.',
      takeaway: 'The ability to connect participants at scale creates both industry strength and governance risk.' } },

  'social-m4-14': {
    heading: 'Each strategic challenge comes from optimizing one goal at another’s expense',
    intro: 'Challenges range from wellbeing and scams to moderation errors, ad economics and AI misuse. Pushing one objective — more notifications, more automation, more ads — can damage another.',
    spec: { layout: 'table', title: 'Major Strategic Challenges', kicker: '',
      headers: ['Challenge', 'Tradeoff that creates it', 'Response'],
      rows: [
        { label: 'Competition for attention', a: 'More notifications can cut satisfaction', b: 'Balance engagement with wellbeing' },
        { label: 'Content integrity', a: 'Automation can miss context', b: 'Local-language review and appeals' },
        { label: 'Monetization pressure', a: 'Ad saturation can hurt retention', b: 'Protect ad and creator economics' },
        { label: 'Ecosystem dependency', a: 'Abrupt policy changes unsettle partners', b: 'Predictable change and notice' },
        { label: 'Privacy and security', a: 'Breaches and account compromise', b: 'Security and privacy controls' },
        { label: 'AI governance', a: 'Coverage gains versus false decisions', b: 'Human review and monitoring' },
      ],
      note: 'Divergent rules add regulatory complexity. In Vietnam, local language, creator and SME dependency, and data and content obligations shape the response, which must coordinate product, legal, safety and operations.',
      takeaway: 'Growth, monetization, innovation, and trust must be managed as one system.' } },

  'social-m4-15': {
    heading: 'Strategic responses share one discipline: invest for outcomes and prepare before disruption',
    intro: 'Priorities include useful AI, transparent creator economics, business tools, local fit, security and diversified revenue. Participants stay when products remain useful and governance stays trustworthy.',
    spec: { layout: 'pathway', title: 'Strategic Priorities and Future Competitive Responses', kicker: '',
      trunk: [
        { label: 'Set outcome-based investments' },
        { label: 'Monitor behavior and competition' },
      ],
      optionsLabel: 'Strategic priorities — combined, not sequenced',
      options: [
        { label: 'AI-enabled differentiation', detail: 'AI-assisted communication with safeguards' },
        { label: 'Creator ecosystem development', detail: 'Transparent economics and support' },
        { label: 'Business-service expansion', detail: 'Messaging and customer-service tools' },
        { label: 'Localized competition', detail: 'Language and domestic routines' },
        { label: 'Trust-led strategy', detail: 'Security, privacy, moderation' },
        { label: 'Revenue resilience', detail: 'Diversified revenue' },
      ],
      afterLabel: 'Operational adaptability',
      after: [
        { label: 'Prepare responses before disruption', detail: 'Continuity planning, diversified dependencies', kind: 'outcome' },
      ],
      note: 'In Vietnam, language relevance, domestic communication routines, SME tools, local support and responsible data practice can create defensible advantage.',
      takeaway: 'Future position will depend on ecosystem quality and adaptability as much as scale.' } },
};
