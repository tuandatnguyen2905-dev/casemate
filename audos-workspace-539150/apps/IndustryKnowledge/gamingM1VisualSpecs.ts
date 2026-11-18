import type { VisualSpec } from './fashionVisualKit';

export interface GamingChapterVisual { heading: string; intro: string; spec: VisualSpec }

/** Chapter-specific Learning Visuals for Gaming Module 01, keyed by visualKind. */
export const GAMING_M1_VISUALS: Record<string, GamingChapterVisual> = {
  'gaming-m1-1': {
    heading: 'Who does what between an idea and a player community',
    intro: 'Each role adds something different to the same game. One company can hold several roles, or they can be separate firms.',
    spec: {
      layout: 'flow', title: 'What Is the Gaming & Digital Entertainment Industry?', kicker: '',
      steps: [
        { label: 'Concept & development', detail: 'Designs and builds the interactive experience', owner: 'Developer' },
        { label: 'Publishing & launch', detail: 'May finance, commercialize and coordinate release', owner: 'Publisher' },
        { label: 'Access & transactions', detail: 'Distributes the game and its updates', owner: 'Platform / storefront' },
        { label: 'Play & participation', detail: 'Attention, feedback, social activity and spending', kind: 'outcome', owner: 'Players' },
      ],
      loop: 'Player communities sustain demand and their feedback shapes the next update.',
      note: 'Roles can be integrated in one company or held by separate firms.',
      takeaway: 'Begin analysis by defining the player experience, participant roles, platform and revenue boundary rather than treating every digital activity as gaming.',
    },
  },
  'gaming-m1-2': {
    heading: 'Why a game is not watched once and finished',
    intro: 'The chapter contrasts one-viewing entertainment with games that players learn, return to and discuss for months or years.',
    spec: {
      layout: 'compare', title: 'What Makes Gaming & Digital Entertainment Unique?', kicker: '', leftTitle: 'One-viewing entertainment (e.g. a film)', rightTitle: 'Game with a persistent player relationship',
      rows: [
        { label: 'Audience role', a: 'Watches the story', b: 'Acts: choices change progression and outcomes' },
        { label: 'After release', a: 'Can succeed after one viewing', b: 'Digital distribution and live operations extend the experience' },
        { label: 'Social layer', a: 'Discussion around the work', b: 'Players compete, collaborate, create content and form communities' },
        { label: 'Recurring value', a: 'Not required to succeed', b: 'Retention creates repeat opportunities for content and spending' },
        { label: 'What to measure', a: '—', b: 'Experience quality, return behaviour, community health, lifetime economics' },
      ],
      note: 'Network effects only help while the experience remains fair, safe and reliable.',
      takeaway: 'Gaming is distinguished by active participation and persistent relationships: product quality, player behaviour, communities and operating capability jointly determine value.',
    },
  },
  'gaming-m1-3': {
    heading: 'Core gaming, enablers, adjacent markets — and what is excluded',
    intro: 'Connected activities are not one market total. Each group has its own economics and must be measured separately.',
    spec: {
      layout: 'taxonomy', title: 'Where Does the Gaming Industry Begin and End?', kicker: '',
      root: 'Activities around a game', rootDetail: 'Categories — keep them separate unless a source explicitly combines them',
      groups: [
        { label: 'Core gaming', items: ['Game software', 'Publishing', 'Distribution', 'Operations'] },
        { label: 'Enablers', items: ['Engines and developer tools', 'Cloud', 'Payments', 'Hardware'] },
        { label: 'Related audience ecosystems', items: ['Esports', 'Streaming'] },
        { label: 'Adjacent media', items: ['Film', 'Music', 'Merchandise', 'Social platforms'] },
        { label: 'Excluded: real-money gambling', detail: 'Governed and measured separately; never added to video-game revenue' },
      ],
      note: 'A console maker can sell hardware, games and subscriptions; an esports organizer sells event rights and sponsorship. Neither makes those revenues interchangeable.',
      takeaway: 'Gaming boundaries follow the product, participant role and revenue definition; clear boundaries prevent double counting.',
    },
  },
  'gaming-m1-4': {
    heading: 'Access models decide when revenue is earned',
    intro: 'Games compete for the same leisure time with very different access prices and revenue timing. No one model fits every experience.',
    spec: {
      layout: 'table', title: 'Understanding Gaming Products and Services', kicker: '', headers: ['Access model', 'Where revenue concentrates', 'What it depends on'],
      rows: [
        { label: 'Premium', a: 'Near purchase, then expansions', b: 'Upfront value the player is willing to pay for' },
        { label: 'Free-to-play', a: 'Optional purchases or ads after free access', b: 'Retention and trusted optional monetization' },
        { label: 'Subscription', a: 'Recurring payments', b: 'Continuing catalog or service value' },
        { label: 'Live service', a: 'Across a long post-launch life', b: 'Continuing infrastructure and content cadence' },
      ],
      note: 'Each model runs on mobile, PC or console. Detailed unit economics are covered in Module 03.',
      takeaway: 'Gaming products differ by device, access price, social design, content cadence and transaction model; match monetization to the intended experience and player trust.',
    },
  },
  'gaming-m1-5': {
    heading: 'The relationships around players',
    intro: 'Players are both the audience and participants. Each stakeholder contributes a capability and receives different information or economics.',
    spec: {
      layout: 'ecosystem', title: "Who Are the Gaming Industry's Customers and Stakeholders?", kicker: '',
      center: { label: 'Players', detail: 'From casual to highly engaged audiences' },
      actors: [
        { label: 'Developers', relation: 'Build the game', flows: ['product'] },
        { label: 'Publishers', relation: 'Finance and commercialize', flows: ['money', 'service'] },
        { label: 'Platforms / storefronts', relation: 'Distribute and process transactions', flows: ['product', 'money'] },
        { label: 'Advertisers', relation: 'Fund attention-based models', flows: ['money'] },
        { label: 'Creators & esports', relation: 'Influence discovery and organize competition', flows: ['information', 'service'] },
        { label: 'Technology & payment partners', relation: 'Enable delivery', flows: ['service'] },
      ],
      note: 'Platform rules, publishing contracts, IP ownership, revenue shares and community trust determine who captures value.',
      takeaway: 'Value is co-created across players and stakeholders, while control of IP, distribution, data and player relationships shapes bargaining power.',
    },
  },
  'gaming-m1-6': {
    heading: 'How the early industry took shape',
    intro: 'Before online services, games earned money through arcade machines, dedicated hardware and physical software.',
    spec: {
      layout: 'flow', title: 'How Did the Gaming Industry Begin?', kicker: '',
      steps: [
        { label: 'Computer experiments', detail: 'Early electronic games' },
        { label: 'Coin-operated arcades', detail: 'Access sold per play' },
        { label: 'Home consoles & PCs', detail: 'Dedicated hardware enters homes' },
        { label: 'Retail & specialist studios', detail: 'Physical software, organized production' },
        { label: 'Recurring franchises', detail: 'Recognizable IP across generations', kind: 'outcome' },
      ],
      note: 'Enabled by advances in processors, displays, controls, storage and manufacturing. Nintendo’s proprietary franchises show hardware, software and IP reinforcing one another.',
      takeaway: 'The early industry established three durable foundations: specialized hardware, commercial software and recognizable intellectual property.',
    },
  },
  'gaming-m1-7': {
    heading: 'From a boxed release to a connected service',
    intro: 'Broadband and digital storefronts changed what a game is after launch — and what it costs to keep running.',
    spec: {
      layout: 'compare', title: 'How Did PC, Console, and Online Gaming Evolve?', kicker: '', leftTitle: 'Boxed release', rightTitle: 'Connected game',
      rows: [
        { label: 'Distribution', a: 'Physical retail', b: 'Direct digital delivery through storefronts' },
        { label: 'After launch', a: 'Largely fixed', b: 'Updates and downloadable content' },
        { label: 'Play', a: 'Mostly single-device', b: 'Multiplayer, persistent worlds and online communities' },
        { label: 'Operating needs', a: 'Production and retail reach', b: 'Servers, security, moderation, support and content management' },
        { label: 'Where value sits', a: 'One-time production', b: 'Continuing infrastructure, content and community relationships' },
      ],
      note: 'Steam illustrates PC distribution and community services; console ecosystems coordinate hardware, accounts, stores, online play and subscriptions.',
      takeaway: 'Online access increased reach and recurring value while adding operating cost, platform dependence, cybersecurity and community responsibilities.',
    },
  },
  'gaming-m1-8': {
    heading: 'What smartphones and app stores opened up',
    intro: 'Mobile distribution lowered the barrier to trying a game. The new formats are alternatives a game can combine, not stages it must pass through.',
    spec: {
      layout: 'pathway', title: 'How Did Mobile Gaming and New Business Models Transform the Industry?', kicker: '',
      trunk: [
        { label: 'Smartphones', detail: 'A game-capable device in billions of pockets' },
        { label: 'App stores', detail: 'Simplified global distribution' },
      ],
      optionsLabel: 'New access and monetization formats — alternatives, not steps',
      options: [
        { label: 'Free-to-play', detail: 'No upfront price; try before spending' },
        { label: 'In-game purchases & ads', detail: 'Diversified monetization' },
        { label: 'Seasons & live service', detail: 'Updates sustain engagement' },
        { label: 'Esports, streaming, subscriptions & cloud', detail: 'New access and audience formats' },
      ],
      note: 'Every recurring model needs content cadence, analytics, infrastructure, customer support and trusted monetization. Not every game benefits from live service.',
      takeaway: 'Mobile broadened reach and accelerated recurring models, but sustainable performance still depends on retention, fair value and operating quality.',
    },
  },
  'gaming-m1-9': {
    heading: 'How Vietnam’s gaming industry developed',
    intro: 'Vietnam grew both as a domestic service market and as a production base whose games reach players abroad.',
    spec: {
      layout: 'timeline', title: "How Has Vietnam's Gaming Industry Developed?", kicker: '',
      events: [
        { period: 'Early', label: 'PC & online communities', detail: 'Internet access and gaming cafés', status: 'historical' },
        { period: 'Growth', label: 'Local publishing', detail: 'Publishers operate and localize titles', status: 'historical' },
        { period: 'Mobile', label: 'Smartphone expansion', detail: 'Mobile play reaches a broad audience', status: 'historical' },
        { period: 'Studios', label: 'Local development', detail: 'Games for domestic and international distribution', status: 'historical' },
        { period: 'Now', label: 'Wider ecosystem', detail: 'Creators, esports and events; original IP ambitions', status: 'current' },
      ],
      note: 'The Ministry reports a US$1.66B domestic market estimate for 2025 and billions of international downloads; these measures describe different activities.',
      takeaway: 'The next stage depends on stronger original IP, publishing, retention, monetization, talent, rights protection and compliant operations — not download reach alone.',
    },
  },
  'gaming-m1-10': {
    heading: 'Three platform arenas with different economics',
    intro: 'Many studios share a market reached through a smaller number of distribution and hardware ecosystems.',
    spec: {
      layout: 'table', title: 'How Is the Global Gaming Market Structured?', kicker: '', headers: ['Platform', 'How it reaches players', 'Chapter example'],
      rows: [
        { label: 'Mobile', a: 'Broad device reach through app stores', b: 'Mobile studios distributing to global audiences' },
        { label: 'PC', a: 'Flexible hardware, storefronts and modding', b: 'Steam provides PC distribution' },
        { label: 'Console', a: 'Dedicated devices, first-party content, stores and subscriptions', b: 'Nintendo combines hardware and proprietary IP' },
      ],
      note: 'Developers create, publishers finance and commercialize, and technology and hardware providers enable production and play; one company can integrate several roles.',
      takeaway: 'Define the platform, geography, software scope and participant role before comparing market size or company performance.',
    },
  },
  'gaming-m1-11': {
    heading: 'Different measures, different questions',
    intro: 'A single purchase can appear as gross consumer spending while the platform and publisher divide the proceeds. These measures are not added together.',
    spec: {
      layout: 'taxonomy', title: 'How Are Gaming Market Size and Growth Measured?', kicker: '',
      root: 'Gaming market measures', rootDetail: 'Separate types — never add or rank them as if identical',
      groups: [
        { label: 'Player spending', items: ['Consumer spending', 'Gross transactions before commissions and refunds', 'In-game purchases'] },
        { label: 'Company revenue', items: ['Net receipts after deductions and revenue shares', 'Publisher software revenue', 'Subscription and advertising revenue'] },
        { label: 'Separate markets', items: ['Hardware sales', 'Esports revenue', 'Streaming revenue'] },
        { label: 'Reach, not revenue', items: ['Players', 'Downloads'] },
      ],
      note: 'Newzoo’s updated 2025 estimate of US$201.6B covers mobile, PC and console under its own model; its US$234.4B for 2028 is a forecast. Record source, date, geography, currency, platform, gross/net treatment and forecast status.',
      takeaway: 'Market size depends on the transaction and revenue boundary; incompatible estimates should never be added or ranked as if identical.',
    },
  },
  'gaming-m1-12': {
    heading: 'Regional patterns and what to localize',
    intro: 'Regions reach the same global total through very different platform preferences and player journeys.',
    spec: {
      layout: 'taxonomy', title: 'Which Regions Drive the Global Gaming Industry?', kicker: '',
      root: 'Regional gaming markets', rootDetail: 'Patterns described in the chapter — not a ranking',
      groups: [
        { label: 'Asia-Pacific', detail: 'Large player and mobile markets' },
        { label: 'North America & Europe', detail: 'Mature PC and console ecosystems alongside mobile' },
        { label: 'Other and emerging regions', detail: 'Can expand through smartphone access and localized digital distribution' },
        { label: 'Localize in every region', items: ['Product and content', 'Pricing and payments', 'Support and compliance', 'Acquisition economics'] },
      ],
      note: 'Platform preference, payment methods, genres, language, broadband, device affordability and regulation shape acquisition and monetization.',
      takeaway: 'Regional opportunity depends on device access, infrastructure, purchasing power, local content, regulation and established platform ecosystems.',
    },
  },
  'gaming-m1-13': {
    heading: 'Major participants grouped by role, not ranked',
    intro: 'The largest participant depends on the role being measured. These are examples from the chapter, not a league table.',
    spec: {
      layout: 'taxonomy', title: 'Who Are the Major Global Gaming Participants?', kicker: '',
      root: 'Global gaming participants', rootDetail: 'Compare like-for-like roles only',
      groups: [
        { label: 'Console ecosystems', items: ['Nintendo', 'Sony', 'Microsoft'] },
        { label: 'Publishers & game groups', items: ['Tencent', 'Electronic Arts', 'Take-Two', 'Ubisoft', 'NetEase'] },
        { label: 'PC distribution', items: ['Steam'] },
        { label: 'Mobile', items: ['Mobile studios', 'App-store ecosystems'] },
      ],
      note: 'Company revenue can include hardware, software, subscriptions, advertising, services or other segments, so a mixed league table misleads.',
      takeaway: 'Major firms compete through different combinations of IP, platforms, portfolios, services, technology and player relationships; no universal ranking fits every role.',
    },
  },
  'gaming-m1-14': {
    heading: 'The value loop of a game',
    intro: 'A great concept creates no value until it is produced, distributed, discovered, enjoyed, supported and monetized — and weakness at one stage can erase the others.',
    spec: {
      layout: 'flow', title: 'How Does the Global Gaming Ecosystem Create Value?', kicker: '',
      steps: [
        { label: 'Concept & IP', detail: 'Guides development' },
        { label: 'Production', detail: 'Reliable development' },
        { label: 'Publishing & funding', detail: 'Investment and commercialization' },
        { label: 'Distribution & discovery', detail: 'Platforms, marketing and creators' },
        { label: 'Engagement & community', detail: 'Gameplay drives return visits', kind: 'decision' },
        { label: 'Monetization', detail: 'Funds content and operations', kind: 'outcome' },
      ],
      loop: 'Player feedback and revenue are reinvested in the next update or release.',
      note: 'Poor discoverability can hide quality, poor retention wastes acquisition spend, and unfair monetization damages community trust.',
      takeaway: 'Gaming value comes from a feedback loop linking creative IP, reliable production, access, player experience, community and commercial reinvestment.',
    },
  },
  'gaming-m1-15': {
    heading: 'Two connected sides of Vietnam gaming',
    intro: 'Local spending and overseas downloads answer different questions. Keep each figure with its own scope.',
    spec: {
      layout: 'compare', title: "What Does Vietnam's Gaming Industry Look Like?", kicker: '', leftTitle: 'Serving local players', rightTitle: 'Building for international audiences',
      rows: [
        { label: 'Reported figure', a: 'US$1.66B domestic market estimate, 2025 (Ministry)', b: '5.7B international downloads of Made-in-Vietnam apps and games, 2024–2025 (Ministry)' },
        { label: 'What it measures', a: 'Domestic market value', b: 'Distribution reach' },
        { label: 'What it does not prove', a: 'Downloads or publisher revenue', b: 'Revenue, active users or profit' },
        { label: 'Main participants', a: 'Local publishers, platforms and payment partners', b: 'Studios distributing through global storefronts' },
      ],
      note: 'Domestic spending, downloads, active players, retained cohorts, studio revenue and profit must remain separate.',
      takeaway: 'Vietnam’s opportunity has two connected dimensions: serving local players and developing products for international audiences.',
    },
  },
  'gaming-m1-16': {
    heading: 'Strategic roles in Vietnam’s gaming ecosystem',
    intro: 'Publishing locally, developing original IP, distributing through a platform and organizing esports are different businesses, even when one company does several.',
    spec: {
      layout: 'taxonomy', title: "Who Are the Key Players in Vietnam's Gaming Ecosystem?", kicker: '',
      root: 'Vietnam gaming ecosystem', rootDetail: 'Roles, not a company hierarchy',
      groups: [
        { label: 'Domestic publishers', detail: 'Operate and localize titles' },
        { label: 'Game developers', detail: 'Create original or commissioned games' },
        { label: 'International operators', detail: 'Serve Vietnam through local arrangements' },
        { label: 'Distribution platforms', detail: 'Global app and PC stores' },
        { label: 'Creators & esports', detail: 'Build audiences' },
        { label: 'Technology & payment partners', detail: 'Enable operations' },
      ],
      note: 'A publisher is not automatically the developer, and a platform is not automatically the publisher. Verify each company’s current entity, role, rights and status.',
      takeaway: 'Vietnam’s ecosystem includes multiple strategic roles; company names should be attached only to verified current activities.',
    },
  },
  'gaming-m1-17': {
    heading: 'What shapes how players engage and spend',
    intro: 'Vietnam’s audience is varied. Engagement follows device, motive, social context and perceived value — not age or city alone.',
    spec: {
      layout: 'driverTree', title: 'How Do Vietnamese Consumers Engage With Games?', kicker: '',
      root: { label: 'Engagement and spending', detail: 'Segment by observed behaviour' },
      drivers: [
        { label: 'Device access', detail: 'Mobile supports accessible play; PC and console support different controls and depth', children: [{ label: 'Mobile sessions' }, { label: 'PC / console play' }] },
        { label: 'Motive & occasion', detail: 'Short breaks or competitive play', children: [{ label: 'Casual' }, { label: 'Competitive' }] },
        { label: 'Social influence', detail: 'Friends and creators influence discovery', children: [{ label: 'Communities' }, { label: 'Creators / streaming' }, { label: 'Esports' }] },
        { label: 'Perceived value', detail: 'Trustworthy monetization, suitable payment options and support', children: [{ label: 'Localization' }, { label: 'Payment options' }, { label: 'Responsive support' }] },
      ],
      note: 'Example: one player uses an ad-supported puzzle during short breaks; another buys premium PC games or joins a competitive online community.',
      takeaway: 'Vietnam’s gaming audience is heterogeneous; device access, motive, genre, social context and value perception shape engagement and spending.',
    },
  },
  'gaming-m1-18': {
    heading: 'The rights and operating chain behind a Vietnamese-made game',
    intro: 'One product can involve a global engine, an overseas storefront, a foreign publisher, a local operations team and international players.',
    spec: {
      layout: 'flow', title: 'How Do Game Development, Publishing, and Distribution Work in Vietnam?', kicker: '',
      steps: [
        { label: 'Create code, art, design & IP', owner: 'Developer' },
        { label: 'Fund, market & localize', detail: 'Or the studio self-publishes', kind: 'decision', owner: 'Publisher' },
        { label: 'Distribute & process transactions', owner: 'Platform' },
        { label: 'Support players & live content', owner: 'Operations team' },
        { label: 'Cloud, payments, analytics & promotion', kind: 'outcome', owner: 'Service partners' },
      ],
      note: 'Contracts allocate IP, approvals, milestones, territories, revenue shares, data, support and compliance. Decree 147/2024/ND-CP covers online game services; specific duties need product- and role-specific legal review.',
      takeaway: 'Vietnam gaming depends on coordinated rights and responsibilities across developers, publishers, platforms, service partners and regulators.',
    },
  },
  'gaming-m1-19': {
    heading: 'Each opportunity comes with a constraint to manage',
    intro: 'Global storefronts give fast reach, but discoverability, retention, rights, talent, finance and operations decide whether reach becomes durable value.',
    spec: {
      layout: 'compare', title: "What Opportunities and Constraints Shape Vietnam's Gaming Market?", kicker: '', leftTitle: 'Opportunity', rightTitle: 'Constraint to manage',
      rows: [
        { label: 'Distribution', a: 'Global platform access', b: 'Crowded discovery and dependence on platform rules, fees, data and algorithms' },
        { label: 'Production', a: 'Efficient mobile production and co-development', b: 'Finance and talent depth' },
        { label: 'Product', a: 'Culturally distinctive original IP', b: 'IP protection and intense competition' },
        { label: 'Operations', a: 'Localization and service exports', b: 'Live-operations and monetization capability' },
        { label: 'Ecosystem', a: 'Esports and creator ecosystems', b: 'Consumer protection and compliance' },
      ],
      note: 'Downloads can scale faster than revenue; official reach figures do not prove equal profitability across studios.',
      takeaway: 'Vietnam’s strongest opportunity is converting efficient production and international distribution into owned IP, retained players and repeatable publishing capability.',
    },
  },
  'gaming-m1-20': {
    heading: 'How economic pressure reaches each business model',
    intro: 'A premium game asks for an upfront purchase; a free-to-play game asks for continued attention and optional spending. Pressure lands differently on each.',
    spec: {
      layout: 'compare', title: 'How Do Economic Conditions Affect the Gaming Industry?', kicker: '', leftTitle: 'Premium release', rightTitle: 'Free-to-play title',
      rows: [
        { label: 'Effect on demand', a: 'Purchases delayed or traded down', b: 'Access stays broad; payer conversion or ad yield changes' },
        { label: 'Cost pressure', a: 'Labour, cloud and marketing costs', b: 'Labour, cloud and marketing costs' },
        { label: 'Chapter response', a: 'Price tiers and portfolio timing', b: 'Tighter acquisition payback; prioritize retained cohorts' },
        { label: 'International exposure', a: 'Revenue and costs in different currencies', b: 'Revenue and costs in different currencies' },
      ],
      note: 'Export-oriented studios should analyze revenue, platform fees, cloud, advertising and labour by currency and market rather than rely on download totals.',
      takeaway: 'Build scenarios linking reach, conversion, player value, cost and cash rather than assuming gaming is uniformly recession-proof.',
    },
  },
  'gaming-m1-21': {
    heading: 'Binding law, intellectual property and platform policy',
    intro: 'A game’s content, purchases, accounts and community create duties from before launch through live operations. Store rules matter, but they are not law.',
    spec: {
      layout: 'taxonomy', title: 'Why Do Regulation and Intellectual Property Matter in Gaming?', kicker: '',
      root: 'Rules and rights around a game', rootDetail: 'Separate sources of obligation',
      groups: [
        { label: 'Law and regulation', items: ['Licensing or approval', 'Content and age suitability', 'Consumer terms, payments and advertising', 'Personal data and cybersecurity'] },
        { label: 'Intellectual property', items: ['Copyright in code, art and music', 'Characters and brands', 'Contracts and licences'] },
        { label: 'Platform policy', detail: 'Storefront rules — important, but not legislation' },
      ],
      note: 'Vietnam: Decree 147/2024/ND-CP was issued 9 November 2024 and took effect 25 December 2024; it governs internet services and online information including online game services. Check the official text for the specific service.',
      takeaway: 'Regulation and IP determine market access, player protection and ownership of creative value; platform policy is not the same as binding law.',
    },
  },
  'gaming-m1-22': {
    heading: 'Adopt a technology for a problem, not for its name',
    intro: 'A new tool creates value only when it improves development or play without adding more cost and risk than it removes.',
    spec: {
      layout: 'decision', title: 'How Is Technology Transforming Gaming?', kicker: '',
      root: { label: 'Candidate technology', detail: 'Engine, cloud, cross-platform, AI-assisted tooling, graphics or VR/AR' },
      question: 'Does it reliably solve a player or production problem at acceptable cost and risk?',
      branches: [
        { condition: 'Proven workflow', outcome: 'Adopt with quality control', detail: 'For example, AI-assisted QA under human review', tone: 'positive' },
        { condition: 'Emerging or market-specific', outcome: 'Pilot and validate first', detail: 'Quality, productivity, reliability and player value', tone: 'caution' },
        { condition: 'No clear problem solved', outcome: 'Do not adopt by name', detail: 'Cost and risk outweigh the benefit', tone: 'negative' },
      ],
      note: 'Adoption depends on infrastructure, devices, latency, workflow fit, rights, data, security, maintainability and player demand.',
      takeaway: 'Technology advantage comes from reliable application to a player or production problem — not from adopting tools by name.',
    },
  },
  'gaming-m1-23': {
    heading: 'What strengthens a community and what drives players away',
    intro: 'Players learn, discuss, invite friends, create content and decide whether a community is worth returning to.',
    spec: {
      layout: 'compare', title: 'How Do Player Behavior and Communities Shape the Industry?', kicker: '', leftTitle: 'Strengthens community value', rightTitle: 'Accelerates churn',
      rows: [
        { label: 'Fair play', a: 'Matchmaking, anti-cheat and balance updates', b: 'Cheating' },
        { label: 'Safety', a: 'Moderation', b: 'Toxicity and unsafe interactions' },
        { label: 'Monetization', a: 'Value players trust', b: 'Intrusive monetization' },
        { label: 'Feedback', a: 'Regular player communication', b: 'Ignored feedback' },
        { label: 'Discovery', a: 'Creator coverage, tournaments and invitations', b: 'Damaged trust spreads through the same channels' },
      ],
      note: 'Measure engagement, retention, sentiment, safety, service and contribution together.',
      takeaway: 'Player behaviour and community health influence discovery, retention, monetization, design priorities and franchise durability.',
    },
  },
  'gaming-m1-24': {
    heading: 'Staged investment with stop-or-scale gates',
    intro: 'Global reach also means intense competition and platform dependence, so investment is released step by step against evidence.',
    spec: {
      layout: 'flow', title: 'What External Risks and Opportunities Will Shape Gaming?', kicker: '',
      steps: [
        { label: 'Prototype', detail: 'Test the core experience' },
        { label: 'Regional test', detail: 'Measure cohorts in a limited market' },
        { label: 'Secure the foundations', detail: 'Clear IP rights, diversified discovery, secured accounts' },
        { label: 'Durable contribution?', detail: 'Leading indicators against agreed limits', kind: 'decision' },
        { label: 'Scale those cohorts', detail: 'Stop or rework where evidence is weak', kind: 'outcome' },
      ],
      note: 'Forces interact: higher acquisition costs raise the value of retention, platform dependency affects economics and data, and regulation changes design and operations.',
      takeaway: 'Future winners combine distinctive IP and player value with disciplined production, resilient distribution, responsible operations and evidence-led investment.',
    },
  },
};
