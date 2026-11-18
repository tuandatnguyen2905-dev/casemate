import type { ChapterVisual } from './chapterVisualText';

/** Chapter-specific Learning Visuals for E-commerce & Online Marketplaces Module 04, keyed by visualKind. */
export const ECOM_M4_VISUALS: Record<string, ChapterVisual> = {
  'ecom-m4-11-structure': {
    heading: 'Rivals that meet at different points of one purchase',
    intro: 'A marketplace, a store and a creator can all compete for the same shopper without looking alike. Sort the arenas by what each one competes for.',
    spec: {
      layout: 'taxonomy', title: 'Market Structure and Types of Competition', kicker: '',
      root: 'E-commerce competitive arenas', rootDetail: 'Scope the geography, category, customer and transaction stage before comparing',
      groups: [
        { label: 'Platform competition', detail: 'For buyers and merchant participation', items: ['General marketplaces', 'Breadth of selection'] },
        { label: 'Retail competition', detail: 'For spending', items: ['Online retailers', 'D2C brands'] },
        { label: 'Channel competition', detail: 'Alternative routes for the same spending', items: ['Physical stores', 'Omnichannel retailers'] },
        { label: 'Category competition', detail: 'Verticals competing on expertise', items: ['Vertical specialists'] },
        { label: 'Attention competition', detail: 'For discovery and purchase intent', items: ['Social platforms', 'Creators'] },
      ],
      note: 'A Vietnamese shopper may discover through social content, compare on a marketplace and buy from a brand store, so all three compete for one journey.',
      takeaway: 'A business can look dominant in a narrow dataset while facing strong substitution elsewhere, so define the relevant market first.',
    },
  },
  'ecom-m4-12-entry': {
    heading: 'Opening an online store is easy; earning scale is not',
    intro: 'Hosted software removes the technical barrier, but not the need for customers, trust and workable economics. Compare what each side of the gap requires.',
    spec: {
      layout: 'compare', title: 'Competitive Intensity, Market Concentration and Entry Barriers', kicker: '',
      leftTitle: 'Launching a basic store', rightTitle: 'Competing at scale',
      rows: [
        { label: 'Technology', a: 'Hosted storefront tools are widely available', b: 'Technology, transaction data and logistics density' },
        { label: 'Customers', a: 'Traffic must be acquired', b: 'An established customer base and brand' },
        { label: 'Operations and money', a: 'Third-party services can cover the basics', b: 'Capital, compliance and reliable execution' },
        { label: 'Realistic position', a: 'An underserved niche or category', b: 'Network effects that reinforce incumbents' },
      ],
      note: 'A Vietnamese entrant may compete on local expertise or service depth instead of matching established marketplaces on promotions and breadth.',
      takeaway: 'The sustainable barrier is the coordinated system that customers and sellers choose repeatedly, not the storefront itself.',
    },
  },
  'ecom-m4-13-dynamics': {
    heading: 'Answering a rival’s vouchers without another discount',
    intro: 'A discount can be copied tomorrow; a better service or ecosystem cannot. Follow how each kind of response trades value against cost.',
    spec: {
      layout: 'decision', title: 'Competitive Dynamics and Strategic Responses', kicker: '',
      root: { label: 'A rival launches vouchers', detail: 'Competitors adjust prices, promotions, assortment, advertising, delivery and features in response cycles' },
      question: 'Which response builds a relationship the business can afford repeatedly?',
      branches: [
        { condition: 'Match the discount', outcome: 'Traffic now, weaker economics', detail: 'Quick to copy and can reset customer expectations without building capability', tone: 'negative' },
        { condition: 'Improve service or relevance', outcome: 'Defensible if affordable', detail: 'Faster returns or better recommendations raise the total proposition', tone: 'positive' },
        { condition: 'Extend the ecosystem or partner', outcome: 'Deeper ties, more complexity', detail: 'Payments, fulfillment, ads, membership or creator partnerships add execution and cost exposure', tone: 'caution' },
      ],
      note: 'Vietnamese platforms combine promotion, seller support, livestreams and logistics options as marketplace search competes with content discovery.',
      takeaway: 'A response must protect differentiation, quality and profit, not trade all three for share.',
    },
  },
  'ecom-m4-21-global': {
    heading: 'Each global leader benchmarks a different capability',
    intro: 'Global leaders win through different configurations, not one ranking. Read each as a benchmark for a capability, then ask whether it transfers locally.',
    spec: {
      layout: 'table', title: 'Global E-Commerce Platforms and Retail Leaders', kicker: '',
      headers: ['Player', 'What it combines', 'Benchmark for'],
      rows: [
        { label: 'Amazon', a: 'Retail with ecosystem services', b: 'Integrated ecosystem' },
        { label: 'Alibaba', a: 'A span of commerce services', b: 'Platform breadth' },
        { label: 'JD', a: 'Retail with logistics', b: 'Supply-chain control' },
        { label: 'Walmart', a: 'Stores with digital', b: 'Omnichannel assets' },
        { label: 'eBay', a: 'Varied marketplace transactions', b: 'Transaction community' },
      ],
      note: 'Local preference, regulation, logistics and payments shape outcomes; these are benchmarks, not evidence that a global player leads Vietnam or any category.',
      takeaway: 'Judge position by volume, profit, loyalty, sellers and service within a market, not by global size alone.',
    },
  },
  'ecom-m4-22-vietnam': {
    heading: 'Inside Metric’s four-marketplace GMV denominator',
    intro: 'Metric’s 2025 shares only add up within four named marketplaces. See how the included GMV splits between search-led and content-led platforms.',
    spec: {
      layout: 'driverTree', title: 'Southeast Asian and Vietnamese E-Commerce Platforms', kicker: '',
      root: { label: 'Four-platform GMV, 2025', detail: 'VND429.7T, up 34.75% (Metric commercial estimate)' },
      formula: 'Included GMV = Shopee + TikTok Shop + Lazada + Tiki',
      drivers: [
        { label: 'Shopee', detail: '56.04% of included GMV; broad marketplace search', op: '+' },
        { label: 'TikTok Shop', detail: '41.31%, up from 29% in 2024; video, livestream and creators', op: '+' },
        { label: 'Lazada and Tiki', detail: 'Approximately 3% combined; regional and brand commerce plus a domestic platform', op: '+' },
      ],
      note: 'Metric data cover 1 Jan–31 Dec 2025 on four marketplaces only; they exclude brand-owned stores and other social sellers and must not be mixed with MOIT or VECOM totals.',
      takeaway: 'Marketplace search and content-led discovery are now two distinct competitive strengths, so sellers should test which converts their category.',
    },
  },
  'ecom-m4-23-alternatives': {
    heading: 'Substitutes that pull shoppers and sellers off marketplaces',
    intro: 'The most dangerous rival may solve the same customer need through a different channel. See what each substitute offers and what it redirects.',
    spec: {
      layout: 'ecosystem', title: 'Specialized Competitors and Alternative Commerce Channels', kicker: '',
      center: { label: 'General marketplace', detail: 'Competes on breadth for attention, spending and seller participation' },
      actors: [
        { label: 'Vertical specialists', relation: 'Win on expertise, specific assortment and product authentication', flows: ['product', 'money'] },
        { label: 'Brand-owned stores', relation: 'Own the customer relationship directly', flows: ['money', 'information'] },
        { label: 'Omnichannel retailers', relation: 'Use stores for pickup and immediate access', flows: ['product', 'service'] },
        { label: 'Social and messaging sellers', relation: 'Convert community trust, content and direct interaction', flows: ['information', 'money'] },
        { label: 'Cross-border platforms', relation: 'Connect buyers with international supply', flows: ['product'] },
      ],
      note: 'Vietnamese sellers can reduce dependence on one marketplace by combining channels, but each adds technology, marketing, inventory and service coordination.',
      takeaway: 'Customers switch by the job they need done, so substitute channels belong in any competitive analysis.',
    },
  },
  'ecom-m4-31-framework': {
    heading: 'Align the scope before stacking competitor indicators',
    intro: 'A long table is not a benchmark if every column measures something different. Fix the comparability rules first, then read the six layers.',
    spec: {
      layout: 'pathway', title: 'Benchmarking Framework and Performance Indicators', kicker: '',
      trunk: [
        { label: 'Set comparability rules', detail: 'Same definition, period, geography and business-model boundary', kind: 'stage' },
      ],
      optionsLabel: 'Six benchmark layers',
      options: [
        { label: 'Market scale', detail: 'Share and GMV' },
        { label: 'Customer demand', detail: 'Conversion and repeat behavior' },
        { label: 'Seller supply', detail: 'Seller retention' },
        { label: 'Execution', detail: 'Delivery performance' },
        { label: 'Economics', detail: 'Recognized revenue and contribution' },
        { label: 'Innovation capability', detail: 'Ability to build future advantage' },
      ],
      afterLabel: 'Interpretation',
      after: [
        { label: 'Locate the source of advantage', detail: 'Scale, experience, execution, monetization or innovation', kind: 'outcome' },
      ],
      note: 'GMV and revenue are never interchangeable; Metric’s four-platform shares cannot be combined with national revenue or differently scoped datasets.',
      takeaway: 'A smaller set of indicators with common definitions beats a long table of false precision.',
    },
  },
  'ecom-m4-32-positioning': {
    heading: 'Which capability solves which shopper or seller problem',
    intro: 'No platform leads every dimension. Link each capability to the outcome it produces and the type of model that may lead on it.',
    spec: {
      layout: 'table', title: 'Comparative Positioning of Major Platforms', kicker: '',
      headers: ['Dimension', 'Outcome it produces', 'Model that may lead it'],
      rows: [
        { label: 'Assortment and search', a: 'Shoppers find and compare products', b: 'General marketplace' },
        { label: 'Content and discovery', a: 'Creator depth improves discovery', b: 'Social platform' },
        { label: 'Trust and authenticity', a: 'Verification improves trust', b: 'Specialist' },
        { label: 'Logistics', a: 'Logistics density improves delivery', b: 'Retailer with pickup' },
        { label: 'Seller value', a: 'Economic and operating benefit for merchants', b: 'Needs current comparable evidence' },
        { label: 'Monetization', a: 'Revenue that participants can keep supporting', b: 'Needs current comparable evidence' },
      ],
      note: 'Metric’s 2025 dataset shows Shopee’s continued scale and TikTok Shop’s rapid content-led expansion within one four-platform scope.',
      takeaway: 'Labels like innovative or premium are weak unless the chain from capability to valued outcome is visible.',
    },
  },
  'ecom-m4-33-matrix': {
    heading: 'From a comparison set to prioritized capability gaps',
    intro: 'A red-yellow-green table only helps when everyone knows which evidence earned each color. Follow the order that keeps facts and judgment apart.',
    spec: {
      layout: 'flow', title: 'Competitive Benchmarking Matrix', kicker: '',
      steps: [
        { label: 'Define the comparison set', detail: 'Direct rivals and substitutes in one market', kind: 'stage' },
        { label: 'Standardize criteria', detail: 'One scoring rule for model, assortment, logistics, trust and monetization', kind: 'stage' },
        { label: 'Record facts separately', detail: 'Verified measurements apart from analytical judgments', kind: 'stage' },
        { label: 'Identify capability gaps', detail: 'Important abilities trailing the requirement or a competitor', kind: 'decision' },
        { label: 'Prioritize action', detail: 'Rank by importance, feasibility, cost and fit', kind: 'outcome' },
      ],
      note: 'A Vietnam matrix can use verified Metric facts for included GMV shares, but service or trust ratings need explicit evidence and criteria.',
      takeaway: 'Judgment is not the defect; judgment presented as fact or applied inconsistently is.',
    },
  },
  'ecom-m4-41-customer': {
    heading: 'Turning rented traffic into repeat buyers',
    intro: 'Shoppers cannot inspect products physically and are expensive to reacquire. Follow where each stage can lose them before they buy again.',
    spec: {
      layout: 'flow', title: 'Customer Acquisition, Trust and Retention', kicker: '',
      steps: [
        { label: 'Acquire relevant visitors', detail: 'Search, ads, creators, referrals and promotions', kind: 'stage' },
        { label: 'Convert the visit', detail: 'Product pages, clear prices, secure checkout and payment', kind: 'stage' },
        { label: 'Reduce perceived risk', detail: 'Accurate information and credible reviews', kind: 'stage' },
        { label: 'Fulfill the promise', detail: 'Reliable delivery and fair returns', kind: 'stage' },
        { label: 'Earn the repeat purchase', detail: 'Retention and long-term customer contribution', kind: 'outcome' },
      ],
      loop: 'Analytics link the stages: CAC only makes sense beside conversion, repeat, retention and LTV.',
      note: 'A Vietnamese seller can compare creator or marketplace acquisition with repeat contribution after delivery and service outcomes.',
      takeaway: 'Reliable experiences reduce dependence on repeated promotional acquisition, so trust affects both revenue and cost.',
    },
  },
  'ecom-m4-42-operations': {
    heading: 'Operations that keep the delivery promise and cut avoidable cost',
    intro: 'One corrected failure point often pays off several times. See which operating capabilities make up reliable execution and what each prevents.',
    spec: {
      layout: 'driverTree', title: 'Operational Excellence, Logistics and Seller Enablement', kicker: '',
      root: { label: 'Operational reliability', detail: 'A better customer experience and a cost advantage at once' },
      drivers: [
        { label: 'Inventory accuracy', detail: 'Accurate stock prevents cancellations and the support work that follows' },
        { label: 'Delivery and tracking', detail: 'Prevents delay and failed orders' },
        { label: 'Simple eligible returns', detail: 'Limits refund cost and negative reviews' },
        { label: 'Seller enablement', detail: 'Listings, training, analytics, inventory and operations tools' },
        { label: 'Service standards', detail: 'Monitor late dispatch, cancellation and complaints' },
        { label: 'Resilience', detail: 'Alternative partners, backup systems and contingency procedures' },
      ],
      note: 'Failures surface in customer behavior: cancellation, delay, refunds, negative reviews and lost customers.',
      takeaway: 'The winning promise is the one operations can keep repeatedly, not the one marketing can make once.',
    },
  },
  'ecom-m4-43-technology': {
    heading: 'When search, forecasting and fraud models become hard-to-copy advantage',
    intro: 'Advanced technology is not automatically an advantage. Test a capability against the data, integration and oversight it depends on.',
    spec: {
      layout: 'decision', title: 'Technology, Data and Innovation Capabilities', kicker: '',
      root: { label: 'A technology capability', detail: 'Recommendations, demand forecasts, fraud models, ad technology or service automation' },
      question: 'Does it run on good data, fit into work and have privacy controls and human oversight?',
      branches: [
        { condition: 'Yes, and rivals cannot easily copy it', outcome: 'Competitive advantage', detail: 'Improves relevance, efficiency, risk management or seller performance', tone: 'positive' },
        { condition: 'Yes, but easy to replicate', outcome: 'Necessary, not distinctive', detail: 'Supports the business without separating it from competitors', tone: 'caution' },
        { condition: 'No', outcome: 'Expected value can reverse', detail: 'Poor data, integration, privacy controls or oversight reduce performance', tone: 'negative' },
      ],
      note: 'Vietnamese platforms can automate local-language search and seller operations while keeping data safeguards and human review.',
      takeaway: 'The complete capability is the organizational system of data, monitoring and people around the model.',
    },
  },
  'ecom-m4-51-swot': {
    heading: 'Each e-commerce opportunity carries a weakness it can magnify',
    intro: 'Digital scale creates opportunity and pressure at the same time. Pair each opportunity with the weakness or threat that could stop it creating value.',
    spec: {
      layout: 'compare', title: 'SWOT Analysis of the E-Commerce Industry', kicker: '',
      leftTitle: 'Strength or opportunity', rightTitle: 'Weakness or threat it amplifies',
      rows: [
        { label: 'Digital reach', a: 'Reach, convenience and scale', b: 'Competition and acquisition cost' },
        { label: 'AI personalization', a: 'Better discovery', b: 'Data and automation risk' },
        { label: 'Cross-border reach', a: 'Additional demand', b: 'Compliance complexity' },
        { label: 'Social and vertical commerce', a: 'New routes and focused assortments', b: 'Network complexity and product-quality risk' },
        { label: 'Mobile and digital payments', a: 'Adoption supports Vietnamese platforms', b: 'Seller-quality, logistics, regulation and concentration pressure' },
      ],
      note: 'Each SWOT observation should produce a response, an owner and a measure rather than remain a list.',
      takeaway: 'The useful question is not whether AI is an opportunity, but which weakness could prevent it from creating value.',
    },
  },
  'ecom-m4-52-challenges': {
    heading: 'Hitting one metric can push cost or risk elsewhere',
    intro: 'Every e-commerce decision moves several outcomes at once. Read what each common move can improve and what it can quietly weaken.',
    spec: {
      layout: 'table', title: 'Strategic Challenges Facing E-Commerce Businesses', kicker: '',
      headers: ['Decision', 'What it can improve', 'What it can weaken'],
      rows: [
        { label: 'More promotion', a: 'Demand and traffic', b: 'Margin' },
        { label: 'Free shipping', a: 'Demand growth', b: 'Contribution' },
        { label: 'Stricter seller controls', a: 'Trust and authenticity', b: 'Onboarding speed and supply' },
        { label: 'Faster delivery', a: 'Reliability for customers', b: 'Cost' },
        { label: 'More personalization', a: 'Conversion', b: 'Data risk' },
      ],
      note: 'Shared measures such as contribution, retention, service quality and compliance help marketing, operations, technology and finance see trade-offs early.',
      takeaway: 'Growth, profit, trust, reliability and compliance must be balanced together, because optimizing one alone undermines the rest.',
    },
  },
  'ecom-m4-53-priorities': {
    heading: 'Priorities that must reinforce a chosen e-commerce position',
    intro: 'There is no universal winning playbook. Start from a differentiated position, then keep only the priorities that strengthen it and can be measured.',
    spec: {
      layout: 'pathway', title: 'Strategic Responses and Future Competitive Priorities', kicker: '',
      trunk: [
        { label: 'Differentiate', detail: 'A distinctive benefit through expertise, trust, curation or specialized experience', kind: 'stage' },
      ],
      optionsLabel: 'Priorities that reinforce it',
      options: [
        { label: 'Optimize operations', detail: 'Lower avoidable cost and improve reliability' },
        { label: 'Develop relationships', detail: 'Repeat purchase through relevant value and service' },
        { label: 'Diversify channels', detail: 'Marketplace reach plus owned, social and offline routes' },
        { label: 'Innovate responsibly', detail: 'Technology adoption with safeguards for data and outcomes' },
      ],
      afterLabel: 'Keep it honest',
      after: [
        { label: 'Manage balanced performance', detail: 'Retention, contribution, seller performance, quality and compliance', kind: 'outcome' },
      ],
      note: 'A large platform may automate logistics and ads; a specialist may invest in curation, trust and direct relationships.',
      takeaway: 'Declining initiatives that do not reinforce the chosen position protects execution quality and investment discipline.',
    },
  },
};
