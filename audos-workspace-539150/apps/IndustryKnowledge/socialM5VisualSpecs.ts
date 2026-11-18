import type { VisualSpec } from './fashionVisualKit';

export interface SocialChapterVisual { heading: string; intro: string; spec: VisualSpec }

/** Chapter-specific Learning Visuals for Social & Communication Platforms Module 05 (Trends & Outlook), keyed by visualKind. */
export const SOCIAL_M5_VISUALS: Record<string, SocialChapterVisual> = {
  'social-m5-1': {
    heading: 'Once adoption matures, the question shifts from reach to repeated utility',
    intro: 'Users combine services for messaging, entertainment, discovery and communities, and expect relevance, reliability and control. Excessive alerts and repetitive recommendations can weaken satisfaction.',
    spec: { layout: 'compare', title: 'From Broad Platform Adoption to Purpose-Driven Engagement', kicker: '',
      leftTitle: 'Broad platform adoption', rightTitle: 'Purpose-driven engagement',
      rows: [
        { label: 'Central question', a: 'How many people have joined?', b: 'Which job does it do in daily routines?' },
        { label: 'User behavior', a: 'Registration on many services', b: 'Moving between services by purpose' },
        { label: 'Success measure', a: 'Registration and reach', b: 'Satisfaction, quality, frequency, retention' },
        { label: 'Main risk', a: 'Treating sign-ups as advantage', b: 'Overload, repetitive recommendations, alerts' },
      ],
      note: 'Decision Lab Q2 2025 Vietnam online-panel research reports Facebook 93%, Zalo 90% and YouTube 89% leading across cohorts, TikTok 77% in Gen Z’s must-have set, and an average of 3 must-have platforms — survey findings, not population adoption rates.',
      takeaway: 'Competitive advantage increasingly depends on relevant engagement and a distinctive role in daily routines—not registration alone.' } },

  'social-m5-2': {
    heading: 'Creator influence rests on credibility and community, not follower counts',
    intro: 'Creators and communities mediate discovery through tutorials, reviews, demonstrations, livestreams and discussion. Abundant content competes for limited attention, rewarding distinctive voices and credible relationships.',
    spec: { layout: 'driverTree', title: 'The Rise of Creators, Communities, and More Selective Attention', kicker: '',
      root: { label: 'Durable creator influence', detail: 'Relevance and trust under selective attention' },
      drivers: [
        { label: 'Creator-led discovery', detail: 'Tutorials, reviews, demonstrations', children: [{ label: 'Short-form entertainment' }, { label: 'Livestream answers' }] },
        { label: 'Credibility', detail: 'Distinctive, trusted voice', children: [{ label: 'Audience loyalty' }, { label: 'Repeat engagement' }] },
        { label: 'Micro-communities', detail: 'Interest-based groups sustain trust', children: [{ label: 'Community health' }, { label: 'Consistent participation' }] },
        { label: 'Community-based commerce', detail: 'Consideration built through relationships', children: [{ label: 'Conversion quality' }, { label: 'Creator economics' }] },
      ],
      note: 'A January 2026 VietnamPlus report cited research that 89% of Vietnamese online consumers followed at least one influencer — a survey-scoped finding, not a universal creator-engagement rate or proof of purchase influence.',
      takeaway: 'Trust, community relevance, and creator credibility matter more than follower counts alone.' } },

  'social-m5-3': {
    heading: 'AI now runs through ranking, creation, conversation, moderation and ads',
    intro: 'AI supports ranking, search, moderation, generation, translation, customer support and conversational interfaces. Broad deployment also raises risks of inaccuracy, bias, impersonation and misuse.',
    spec: { layout: 'taxonomy', title: 'Artificial Intelligence and the Evolution of Platform Experiences', kicker: '',
      root: 'AI as platform capability', rootDetail: 'Capability areas, each with its own risks',
      groups: [
        { label: 'AI-powered recommendations', items: ['Ranking', 'Search'] },
        { label: 'Generative content tools', items: ['Generation', 'Translation', 'Summaries', 'Writing assistance'] },
        { label: 'Conversational AI', items: ['Customer support', 'Conversational interfaces'] },
        { label: 'AI-assisted moderation', items: ['Moderation', 'Spam detection'] },
        { label: 'Advertising optimization', detail: 'Ad creative and delivery support' },
        { label: 'Risks to manage', items: ['Inaccuracy', 'Bias', 'Impersonation', 'Opaque decisions'] },
      ],
      note: 'A DataReportal / Manochi estimate puts standalone GenAI tool users at 2.42B (April 2026), equivalent to 29.2% of global population, with 141% estimated annual growth — identities that may not be unique people, and not a platform adoption rate.',
      takeaway: 'AI is becoming underlying platform capability; value depends on experience, efficiency, reliability, safety, and trust.' } },

  'social-m5-4': {
    heading: 'What each connected format adds to a journey, and what it depends on',
    intro: 'Video, livestreams, messaging, AI drafting and interactive previews combine communication, entertainment, service and commerce. Users discover, ask, join and act across connected touchpoints.',
    spec: { layout: 'table', title: 'Video Innovation, Messaging Integration, and Immersive Experiences', kicker: '',
      headers: ['Format', 'What it adds', 'What adoption depends on'],
      rows: [
        { label: 'Vertical video', a: 'Short-form and serialized discovery', b: 'Device capability and bandwidth' },
        { label: 'Livestreaming', a: 'Live interaction and demonstrations', b: 'Creator and merchant operations' },
        { label: 'Messaging integration', a: 'Questions and seller conversations', b: 'Service quality' },
        { label: 'AI-assisted communication', a: 'Translation, drafting, summaries', b: 'Useful localization, human escalation' },
        { label: 'Immersive and interactive media', a: 'Augmented-reality previews', b: 'Device capability and trust' },
      ],
      note: 'A viewer sees a product demonstration, messages a seller, gets an AI-assisted answer with human escalation, joins a community and uses an appropriate purchase path. Payment and integration availability also shape adoption in Vietnam.',
      takeaway: 'Connected experiences can create more value than isolated features when discovery moves smoothly into conversation and action.' } },

  'social-m5-5': {
    heading: 'Social video now carries shoppers from discovery to a measured purchase',
    intro: 'Short videos, livestreams, creator recommendations, messaging and checkout connect awareness with consideration and purchase. Brands coordinate content, creators, service and commerce instead of treating social only as awareness media.',
    spec: { layout: 'flow', title: 'The Shift Toward Video-First Discovery and Social Commerce', kicker: '',
      steps: [
        { label: 'Video-led discovery', detail: 'Tracked creator video shows the product', owner: 'Creator or affiliate' },
        { label: 'Livestream Q&A', detail: 'Live answers address objections', owner: 'Creator or brand' },
        { label: 'Messaging service', detail: 'Questions and support before purchase', owner: 'Seller' },
        { label: 'Integrated purchase path', detail: 'External or in-platform checkout records sales', owner: 'Commerce system' },
        { label: 'Incrementality test', detail: 'Experiment against a credible counterfactual', kind: 'outcome', owner: 'Brand measurement' },
      ],
      note: 'VietnamPlus highlighted short video, livestream selling, creator partnerships, messaging and links to e-commerce systems as trends. Brands must also coordinate inventory, creator terms, fraud controls, returns and data governance.',
      takeaway: 'Platforms are becoming discovery-to-purchase channels whose value depends on content, trust, product information, service, and transaction infrastructure.' } },

  'social-m5-6': {
    heading: 'Automate routine customer messages, escalate the rest to people with full history',
    intro: 'Chat now handles questions, recommendations, order updates and support across touchpoints. Automation can scale routine service but needs accuracy, transparency and a clear path to a person.',
    spec: { layout: 'decision', title: 'The Expansion of Messaging, Customer Service, and Omnichannel Communication', kicker: '',
      root: { label: 'Customer message', detail: 'Question, order update or support request' },
      question: 'Can a permitted automated answer resolve it accurately?',
      branches: [
        { condition: 'Routine and permitted', outcome: 'Automated response', detail: 'Logged in the shared service history', tone: 'positive' },
        { condition: 'Complex issue', outcome: 'Escalate to a person', detail: 'Responsible team sees the full history', tone: 'caution' },
        { condition: 'Accuracy or consent in doubt', outcome: 'Do not automate', detail: 'Human handling with transparency', tone: 'negative' },
      ],
      note: 'VietnamPlus reported cited research that 89% of Vietnamese online consumers message businesses at least weekly — a survey-scoped signal, not a universal frequency. Measure resolution and satisfaction, not message volume.',
      takeaway: 'Messaging is becoming customer-relationship infrastructure, not only a communication utility.' } },

  'social-m5-7': {
    heading: 'Two dated legal milestones turn privacy and AI disclosure into product requirements',
    intro: 'Requirements increasingly cover consent, user requests, AI disclosure, advertising, moderation and cross-border operations. Multi-market platforms may need market-specific procedures and controls.',
    spec: { layout: 'timeline', title: 'Data Protection, AI Transparency, and Platform Accountability', kicker: '',
      events: [
        { period: '1 Jan 2026', label: 'Vietnam Law 91/2025/QH15 in effect', detail: 'Personal-data obligations by entity, processing, rights and scope', status: 'current' },
        { period: '2 Aug 2026', label: 'EU AI Act Article 50 applies', detail: 'Transparency for specified systems, interactions and content', status: 'current' },
        { period: 'Ongoing', label: 'Accountability built into delivery', detail: 'User requests, AI and sponsorship disclosure, records, appeals', status: 'current' },
      ],
      note: 'EU AI Act Article 50 has scope, exceptions and transitional provisions. Map applicable roles and products before assuming an obligation applies.',
      takeaway: 'Privacy, transparency, and accountability are core product and operating capabilities.' } },

  'social-m5-8': {
    heading: 'Responsible design matches each integrity risk with its own safeguards',
    intro: 'Platforms face scams, impersonation, misinformation, excessive engagement and synthetic media risks alongside creative benefits. Detection, labels, reporting, review and user controls work as one system.',
    spec: { layout: 'taxonomy', title: 'Digital Wellbeing, Information Integrity, and Responsible Platform Design', kicker: '',
      root: 'Responsible platform design', rootDetail: 'Risk areas and the safeguards that address them',
      groups: [
        { label: 'Scam and impersonation prevention', items: ['Detection', 'Reporting'] },
        { label: 'Misinformation management', items: ['Provenance signals', 'Labels where required', 'Distribution controls'] },
        { label: 'Digital wellbeing controls', items: ['Usage reminders', 'Feed controls'] },
        { label: 'Child and vulnerable-user protection', items: ['Youth safeguards', 'Accessible reporting'] },
        { label: 'Responsible AI governance', items: ['Human review', 'Appeals'] },
      ],
      note: 'In Vietnam, local-language and cultural context, fraud patterns, younger users and community education shape responsible design. Add false-positive and appeal measures to scorecards, not time spent alone.',
      takeaway: 'Sustainable growth requires safety, information quality, user control, and healthy participation—not time spent alone.' } },

  'social-m5-9': {
    heading: 'A new revenue stream is worth adding only when it creates measurable participant value',
    intro: 'Opportunities include AI business services, creator memberships, business messaging, social commerce, premium communication and SME tools. Advertising remains important, but its exposure to demand and privacy change encourages complementary streams.',
    spec: { layout: 'decision', title: 'Emerging Growth Opportunities and Monetization Models', kicker: '',
      root: { label: 'New monetization opportunity', detail: 'AI services, creators, commerce, premium, SME tools' },
      question: 'Does it create measurable value for participants while keeping a useful free core?',
      branches: [
        { condition: 'Validated value and incremental revenue', outcome: 'Scale it', detail: 'Service cost and retention hold up', tone: 'positive' },
        { condition: 'Plausible but unproven', outcome: 'Pilot and validate', detail: 'Willingness to pay, capability, rules', tone: 'caution' },
        { condition: 'More exposure, no added value', outcome: 'Do not launch', detail: 'Fraud, support burden, worse experience', tone: 'negative' },
      ],
      note: 'IAB’s September 2026 forecast of 16.5% U.S. social-media ad-spend growth for 2026 versus 2025 is a U.S. buyer outlook, not a global, Vietnam or confirmed result.',
      takeaway: 'Growth is more sustainable when additional monetization creates measurable participant value.' } },

  'social-m5-10': {
    heading: 'Long-term competitiveness balances local relevance, relationships, AI and trust',
    intro: 'Established platforms bring networks and infrastructure, while specialists can win through focused communities, language, service and trust. Opportunities are real but not guaranteed.',
    spec: { layout: 'driverTree', title: 'Strategic Priorities and the Long-Term Competitive Outlook', kicker: '',
      root: { label: 'Long-term competitiveness', detail: 'Scale, innovation, monetization, local relevance, trust' },
      drivers: [
        { label: 'Localized product development', detail: 'Language and moderation', children: [{ label: 'Messaging and SME workflows' }] },
        { label: 'First-party relationship', detail: 'Consent-based direct customer relationships' },
        { label: 'Creator and community investment', detail: 'Support creators and focused communities' },
        { label: 'AI-enabled differentiation', detail: 'AI applied with controls' },
        { label: 'Integrated ecosystems', detail: 'Products, commerce, service and data connected' },
        { label: 'Trust as an asset', detail: 'Governance and resilience' },
      ],
      note: 'Messaging-led commerce, creator ecosystems, video discovery and SME tools in Vietnam are opportunity areas, not guaranteed growth. Use scenarios, leading indicators and staged investment rather than extrapolating audience scale into revenue.',
      takeaway: 'Long-term competitiveness requires balance among scale, innovation, monetization, local relevance, and trust.' } },
};
