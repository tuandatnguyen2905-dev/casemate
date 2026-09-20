// Casemate Domain Knowledge — beginner-first, chaptered curriculum.
// Basic Economics plus eight industries and six FMCG specialist decks. Cards remain deterministic so progress survives content seeding.

import { FMCG_SUBINDUSTRY_SEEDS } from './fmcgSubindustryDecks';
import { depthCardsFor } from './industryDepthCards';
import { expansionCardsFor } from './industryExpansionCards';
import { topicGroupOrder } from './topicGroups';
import type { TopicGroupId } from './topicGroups';
import { BASIC_ECONOMICS_CARD_SEEDS, BASIC_ECONOMICS_INDUSTRY } from './basicEconomicsCards';

export type LearningCardType = 'fact' | 'concept' | 'quiz' | 'case' | 'role';

export interface LearningCard {
  id: string;
  industrySlug: string;
  order: number;
  module: number;
  /** Chapter the card is filed under when the deck is browsed by topic. */
  topic: TopicGroupId;
  /** Card-specific emoji shown on the card front. */
  emoji: string;
  type: LearningCardType;
  title: string;
  front: string;
  back: string[];
  diagram?: string[];
  /** Responsive visual rows rendered as cards, badges and progress bars. */
  visual?: string[];
  options?: string[];
  answer?: number;
}

// The twenty base cards are generated from the seed in a fixed order, so each position always
// belongs to the same chapter. Depth packs carry their own topic and emoji per card and override
// this plan through `extras`.
const BASE_CARD_PLAN: Array<{ topic: TopicGroupId; emoji: string }> = [
  { topic: 'overview', emoji: '🧭' },        // 1  what the industry sells
  { topic: 'supply-chain', emoji: '⚙️' },     // 2  the core process
  { topic: 'overview', emoji: '❓' },          // 3  basics check
  { topic: 'supply-chain', emoji: '🔧' },     // 4  how operations really work
  { topic: 'supply-chain', emoji: '🔗' },     // 5  value chain
  { topic: 'supply-chain', emoji: '❓' },      // 6  operations check
  { topic: 'finance', emoji: '💰' },          // 7  how it makes money
  { topic: 'finance', emoji: '📐' },          // 8  five metrics
  { topic: 'finance', emoji: '❓' },           // 9  metrics check
  { topic: 'finance', emoji: '❓' },           // 10 economics check
  { topic: 'people-career', emoji: '👤' },    // 11 role
  { topic: 'people-career', emoji: '👥' },    // 12 role
  { topic: 'people-career', emoji: '🧑‍💼' },  // 13 role
  { topic: 'people-career', emoji: '🧑‍🔬' },  // 14 role
  { topic: 'people-career', emoji: '❓' },     // 15 role reality check
  { topic: 'overview', emoji: '🏢' },         // 16 company case
  { topic: 'overview', emoji: '🏬' },         // 17 company case
  { topic: 'overview', emoji: '🏭' },         // 18 company case
];

interface QuizSeed { question: string; options: string[]; answer: number; explanation: string }
interface RoleSeed { name: string; intro: string; bullets: string[] }
interface CaseSeed { company: string; title: string; front: string; story: string[]; question: string }
interface IndustrySeed {
  slug: string; label: string; shortLabel: string; badge: string; tagline: string; icon: string; accent: string;
  parentSlug?: string;
  basics: { front: string; back: string[] };
  process: { title: string; flow: string[]; bullets: string[] };
  operations: { front: string; back: string[] };
  valueChain: { flow: string[]; bullets: string[] };
  economics: { front: string; back: string[] };
  metrics: string[];
  quizzes: QuizSeed[];
  roles: RoleSeed[];
  cases: CaseSeed[];
  interview: { front: string; back: string[] };
  synthesis: { flow: string[]; bullets: string[] };
}

const BASE_INDUSTRY_SEEDS: IndustrySeed[] = [
  {
    slug: 'fmcg', label: 'FMCG', shortLabel: 'FMCG', badge: 'FMCG Expert', icon: 'ShoppingCart', accent: 'var(--space-brand-primary-600)',
    tagline: 'Brands, factories and the route to millions of Vietnamese baskets.',
    basics: {
      front: 'FMCG is defined by velocity, not by whether a product is “consumer”. A refrigerator is a consumer good; shampoo is fast-moving because it is low-ticket, replenished often and sold at huge volume.',
      back: [
        'The core categories are food, beverages, personal care, home care and over-the-counter staples. Products usually carry thin unit margins, so profit comes from repeat purchase, manufacturing scale and wide availability.',
        'Shelf life and purchase frequency shape the operating model: milk requires a cold chain, beer ties up tanks during fermentation, while detergent is shelf-stable but promotion-sensitive.',
        'In an interview, connect the product’s physical characteristics to route-to-market, working capital and brand strategy instead of saying only that FMCG is “fast-paced”.',
      ],
    },
    process: {
      title: 'How beer becomes a packaged FMCG product',
      flow: ['Malt barley', 'Mash & extract sugars', 'Boil with hops', 'Ferment with yeast', 'Condition & filter', 'Can / bottle / keg'],
      bullets: ['Brewing takes days or weeks, so demand planning must protect tank capacity.', 'Packaging format changes price point, occasion and logistics cost.', 'Quality is controlled through temperature, sanitation and batch consistency.'],
    },
    operations: {
      front: 'Vietnam FMCG is a two-channel game: general trade gives reach; modern trade and e-commerce give data, visibility and new shopper missions.',
      back: [
        'General trade includes wet markets and independent mom-and-pop stores supplied through layered distributors and sales representatives. It remains critical outside major urban centers and for low-value, high-frequency purchases.',
        'Modern trade includes supermarkets, minimarts and convenience chains where retailers negotiate listing fees, promotions and shelf placement centrally. E-commerce adds search ranking, ratings and fulfillment economics.',
        'Winning requires different pack sizes, promotions and service levels by channel rather than one national plan copied everywhere.',
      ],
    },
    valueChain: {
      flow: ['Ingredients & packaging', 'Factory conversion', 'Warehouse', 'Distributor', 'Retail outlet', 'Shopper'],
      bullets: ['Factories seek high utilization and low waste; sales seeks availability even when demand is volatile.', 'Distributors fund inventory and local delivery, so their economics matter as much as the manufacturer’s.', 'Margin is often protected through mix, premium packs and trade-spend discipline rather than list-price increases alone.'],
    },
    economics: {
      front: 'An FMCG brand can grow shipments while losing consumer momentum. Sell-in measures what the company sends to trade; sell-out measures what shoppers actually buy.',
      back: ['Revenue is price × volume, but mix, discounts and trade spend determine net revenue.', 'Key costs include ingredients, packaging, factory conversion, freight, distributor margin, retailer terms and advertising.', 'Unilever reports underlying sales growth through price and volume; candidates should ask whether growth is real consumption, channel inventory or premium mix.'],
    },
    metrics: ['Market share — the brand’s value or volume share of category sales', 'Numeric distribution — % of outlets carrying the SKU', 'Weighted distribution — % of category sales represented by outlets carrying it', 'Rate of sale — units sold per outlet per period', 'Gross margin — net sales less product cost, as a % of sales'],
    quizzes: [
      { question: 'What makes a product “fast-moving”?', options: ['It is shipped by air', 'It sells frequently at high volume with rapid replenishment', 'It is always perishable', 'It is sold only in convenience stores'], answer: 1, explanation: 'Velocity and replenishment define FMCG. A product may be shelf-stable and still fast-moving.' },
      { question: 'Why can high sell-in be misleading?', options: ['It excludes tax', 'It may be inventory pushed into distributors before shoppers buy it', 'It counts only e-commerce', 'It ignores packaging'], answer: 1, explanation: 'A shipment spike can load the channel. Sustainable growth needs sell-out and healthy inventory days.' },
      { question: 'Which metric best captures quality of distribution?', options: ['Numeric distribution only', 'Weighted distribution', 'Headcount', 'Factory depreciation'], answer: 1, explanation: 'Weighted distribution gives more importance to outlets that account for more category sales.' },
      { question: 'What is the most direct gross-margin lever?', options: ['More meetings', 'Price/mix or lower product cost', 'Longer payment terms to staff', 'More SKUs regardless of demand'], answer: 1, explanation: 'Gross margin improves when realized price or mix rises, or cost of goods falls.' },
      { question: 'Who typically owns the S&OP demand consensus?', options: ['Supply chain with commercial and finance input', 'Only the ad agency', 'Only legal', 'The retailer alone'], answer: 0, explanation: 'S&OP aligns sales, marketing, finance and operations around one demand and supply plan.' },
    ],
    roles: [
      { name: 'Marketing MT', intro: 'You will turn consumer insight into a brand plan, not just make social posts.', bullets: ['You will read brand-health, household-panel and campaign data.', 'You will brief creative and media agencies.', 'You will manage ATL, digital and activation budgets.', 'You will shape innovation, pack and price choices.', 'You will explain why a campaign should move penetration or frequency.'] },
      { name: 'Sales / Trade Marketing MT', intro: 'You will translate the brand strategy into outlet-level execution.', bullets: ['You will review distributor sell-in, sell-out and stock days.', 'You will ride with sales reps and audit availability.', 'You will design channel promotions and planograms.', 'You will negotiate execution with key accounts.', 'You will separate real consumption from stock loading.'] },
      { name: 'Supply Chain MT', intro: 'You will balance service, inventory and factory constraints every week.', bullets: ['You will build and challenge demand forecasts.', 'You will support S&OP and production scheduling.', 'You will monitor service level, waste and forecast error.', 'You will coordinate suppliers, plants and 3PL partners.', 'You will respond when a promotion exceeds plan.'] },
      { name: 'Finance MT', intro: 'You will be the commercial team’s economic conscience.', bullets: ['You will close monthly performance and explain variances.', 'You will evaluate promotion and innovation business cases.', 'You will track gross margin and trade-spend ROI.', 'You will challenge volume plans with cash and profit impacts.', 'You will turn brand choices into a P&L story.'] },
    ],
    cases: [
      { company: 'Vinamilk', title: 'Building beyond the home market', front: 'Vinamilk reached dominance in Vietnamese dairy, then sought growth abroad. It invested in overseas assets, exports and localized distribution. The challenge was transferring trust without assuming Vietnamese brand strength travelled automatically.', story: ['Problem: domestic leadership did not guarantee the same shelf power abroad.', 'Action: Vinamilk combined exports with local subsidiaries and production investments, including Driftwood in the US and Angkormilk in Cambodia.', 'Execution: it adapted routes to market and portfolios to local regulation and consumption habits.', 'Result: overseas business diversified revenue, while proving expansion requires patient local capability.', 'Lesson: international growth is a distribution-and-trust problem, not merely spare factory capacity.'], question: 'How would you choose the next Southeast Asian market and entry mode for Vinamilk?' },
      { company: 'Masan Consumer', title: 'Assembling a consumer platform', front: 'Masan built scale through brands such as Chin-su and Omachi and expanded through acquisition. It used distribution breadth and adjacent categories to increase share of wallet. The strategic risk was complexity and overestimating cross-selling.', story: ['Problem: category growth alone could cap the company’s ambition.', 'Action: Masan invested in brands, acquired capabilities and linked consumer products with a broad retail ecosystem.', 'Execution: shared distribution and shopper access created potential scale economies.', 'Result: the group gained a larger consumer platform but also a more complex capital-allocation challenge.', 'Lesson: synergies are real only when they lower cost, improve availability or lift shopper conversion.'], question: 'Which synergies between consumer brands and retail would you quantify first?' },
      { company: 'Unilever Vietnam', title: 'Winning fragmented trade', front: 'Unilever grew in Vietnam while the retail landscape remained highly fragmented. It built deep distributor and outlet coverage before modern trade became dominant. The model now has to add digital ordering without losing local execution.', story: ['Problem: tens of thousands of small outlets make availability expensive and hard to observe.', 'Action: Unilever developed distributor territories, field sales routines and channel-specific packs.', 'Execution: frequent outlet visits turned national brand demand into physical shelf presence.', 'Result: route-to-market became a defensible capability, not a back-office activity.', 'Lesson: in fragmented markets, distribution reach can be as important as advertising reach.'], question: 'How should Unilever digitize general trade without weakening distributor incentives?' },
    ],
    interview: { front: 'Strong FMCG answers move from shopper → channel → operations → P&L. Weak answers stop at “brand awareness”.', back: ['Name the purchase occasion and decision maker.', 'Explain where the product must be available and in which pack.', 'Connect the plan to sell-out, distribution and margin.', 'Acknowledge the supply or working-capital constraint.'] },
    synthesis: { flow: ['Consumer occasion', 'Brand proposition', 'Pack & price', 'Channel execution', 'Repeat purchase'], bullets: ['Use this chain to structure growth cases.', 'A break at any step can make media spend unproductive.', 'Finish with one metric at each step.'] },
  },
  {
    slug: 'banking', label: 'Banking & Finance', shortLabel: 'Banking', badge: 'Banking Insider', icon: 'Landmark', accent: 'var(--space-brand-primary-700)',
    tagline: 'Balance sheets, risk and the economics behind every loan.',
    basics: {
      front: 'A bank sells trust and balance-sheet capacity. Deposits are funding, loans are earning assets, and the spread between them must absorb credit losses and operating cost.',
      back: ['Retail banking serves individuals; corporate banking serves businesses; investment banking advises and raises capital. Banks may also earn fees from cards, payments, insurance distribution and wealth products.', 'A loan price starts with funding cost, then adds expected credit loss, capital charge, operating cost and target return.', 'A bank P&L therefore differs from a normal manufacturer: interest income and expense dominate, while provisions can erase apparently strong operating profit.'],
    },
    process: { title: 'How a loan reaches the balance sheet', flow: ['Acquire customer', 'KYC & data', 'Underwrite risk', 'Approve & price', 'Disburse', 'Monitor & collect'], bullets: ['Underwriting predicts ability and willingness to repay.', 'Collateral reduces loss severity but does not create cash flow.', 'Monitoring catches deterioration before a loan becomes non-performing.'] },
    operations: { front: 'Banking operations turn regulation into repeatable controls: know the customer, move money safely, reconcile every transaction and escalate suspicious activity.', back: ['Front office originates business; risk sets boundaries; operations executes; compliance ensures legal conduct.', 'Digital onboarding lowers acquisition cost but raises fraud, identity and cybersecurity demands.', 'In Vietnam, branch relationships still matter for complex needs while mobile apps handle a growing share of routine transactions.'] },
    valueChain: { flow: ['Funding', 'Customer acquisition', 'Underwriting', 'Disbursement', 'Servicing', 'Collections / recovery'], bullets: ['Cheap, stable current-account deposits improve funding economics.', 'Pricing and risk selection create value before disbursement.', 'Late collections destroy value through provisions, legal cost and lost capital capacity.'] },
    economics: { front: 'Bank growth is constrained by risk and capital, not only customer demand. A fast-growing loan book can look profitable before its future defaults appear.', back: ['Net interest income equals interest earned minus interest paid; fee income diversifies revenue.', 'Key costs are funding, people and technology, credit provisions and regulatory capital.', 'Techcombank’s performance story is often discussed through strong fee franchises, CASA funding and disciplined asset quality—not loan growth alone.'] },
    metrics: ['NIM — net interest income divided by average earning assets', 'NPL ratio — non-performing loans divided by total loans', 'CASA ratio — current and savings accounts divided by deposits', 'CAR — regulatory capital divided by risk-weighted assets', 'Cost-to-income — operating expense divided by operating income'],
    quizzes: [
      { question: 'What does NIM measure?', options: ['Marketing efficiency', 'Net interest income relative to earning assets', 'Loan approval speed', 'Branch count'], answer: 1, explanation: 'NIM captures the yield spread after funding cost, scaled to earning assets.' },
      { question: 'Why is collateral not a substitute for underwriting?', options: ['Collateral has no value', 'Repayment should come from cash flow; recovery is slow and uncertain', 'Regulators ban collateral', 'It raises CASA'], answer: 1, explanation: 'Collateral is a secondary repayment source. Sound lending begins with sustainable borrower cash flow.' },
      { question: 'Which funding mix usually supports a higher margin?', options: ['More expensive term deposits only', 'More low-cost CASA deposits', 'More bad debt', 'Higher cost-to-income'], answer: 1, explanation: 'CASA can lower average funding cost, although banks must still retain customers with service and ecosystem value.' },
      { question: 'What does CAR protect against?', options: ['Advertising mistakes', 'Unexpected losses relative to risk-weighted assets', 'Long queues only', 'Low app ratings'], answer: 1, explanation: 'Capital absorbs unexpected losses and limits how much risk a bank can add.' },
      { question: 'Who challenges a relationship manager’s loan proposal?', options: ['Independent credit risk', 'The borrower’s agency', 'Only HR', 'The card network'], answer: 0, explanation: 'Independent risk review prevents sales incentives from dominating credit quality.' },
    ],
    roles: [
      { name: 'Retail / Corporate Banking MT', intro: 'You will learn to grow relationships without giving away price or risk.', bullets: ['You will prepare client reviews and product proposals.', 'You will analyze cash flow and wallet potential.', 'You will coordinate credit, operations and product teams.', 'You will track pipeline, utilization and return.', 'You will explain why this client belongs in the portfolio.'] },
      { name: 'Credit Risk MT', intro: 'You will decide which growth is worth funding.', bullets: ['You will spread financial statements and stress cash flow.', 'You will assess industry, management and collateral risks.', 'You will write or challenge credit memos.', 'You will monitor limits and early-warning signals.', 'You will separate default probability from loss severity.'] },
      { name: 'Digital Product MT', intro: 'You will treat the mobile bank as a product and a controlled transaction system.', bullets: ['You will map onboarding and payment funnels.', 'You will prioritize features with engineering and compliance.', 'You will track activation, frequency and failure rates.', 'You will investigate fraud and customer-service pain points.', 'You will balance convenience against control.'] },
      { name: 'Finance / Treasury MT', intro: 'You will manage the bank’s own economics, liquidity and performance.', bullets: ['You will analyze NIM, funding mix and interest-rate gaps.', 'You will monitor liquidity and balance-sheet limits.', 'You will plan budgets and explain business-unit returns.', 'You will price transfer funding between units.', 'You will connect growth plans to capital consumption.'] },
    ],
    cases: [
      { company: 'Techcombank', title: 'From volume to high-return banking', front: 'Techcombank shifted toward fee-rich ecosystems and low-cost funding. It developed strong relationships in property, wealth and transaction banking. Concentration and cycle exposure remained the strategic counterweight.', story: ['Problem: pure loan growth can consume capital and compress returns.', 'Action: Techcombank emphasized CASA, fees, digital service and selected customer ecosystems.', 'Execution: transaction relationships helped bring deposits and cross-sell products.', 'Result: the bank became one of Vietnam’s strongest profitability stories.', 'Lesson: banking advantage comes from the whole relationship—funding, fees and risk—not loan yield alone.'], question: 'How would you defend Techcombank’s profitability through a property downturn?' },
      { company: 'MoMo', title: 'Thirty million users—and the monetization question', front: 'MoMo used payments, promotions and a broad service ecosystem to build massive reach. User growth attracted merchants and partners. The threat was that payments alone have thin margins while acquisition incentives are expensive.', story: ['Problem: cash-heavy Vietnam offered a large adoption opportunity but weak standalone payment economics.', 'Action: MoMo expanded from wallet transfers into bills, merchants, financial-service distribution and mini-apps.', 'Execution: frequent use cases increased app habit and partner value.', 'Result: scale became a strategic asset, but sustainable revenue per active user remained essential.', 'Lesson: a platform must convert reach into repeated, defensible monetization before subsidies become a trap.'], question: 'Which three metrics would prove MoMo’s growth is economically healthy?' },
      { company: 'VPBank / FE Credit', title: 'Growth meets the credit cycle', front: 'Consumer finance expanded access to unsecured credit for underbanked customers. High yields compensated for high expected losses—until economic stress and collections disruption exposed the model. The case shows why growth and vintage quality must be read together.', story: ['Problem: thin-file borrowers need credit but are harder and costlier to underwrite.', 'Action: FE Credit scaled distribution, risk models and high-yield unsecured products.', 'Execution: rapid origination created scale while requiring industrial collections capability.', 'Result: downturn pressure showed how quickly provisions can overwhelm revenue.', 'Lesson: in lending, early growth cohorts can hide later losses; vintage curves are the truth test.'], question: 'How would you restart consumer-finance growth without repeating past losses?' },
    ],
    interview: { front: 'Never recommend “more lending” without naming funding, risk, capital and collections.', back: ['Define the target borrower and use case.', 'Estimate yield after funding and expected loss.', 'Show the CAR and liquidity implication.', 'Name an early-warning metric after disbursement.'] },
    synthesis: { flow: ['Funding cost', 'Risk selection', 'Loan / fee pricing', 'Service & monitoring', 'Risk-adjusted return'], bullets: ['Use risk-adjusted return, not headline revenue.', 'Growth quality emerges over time through vintages.', 'Trust and compliance are part of the product.'] },
  },
  {
    slug: 'tech', label: 'Tech & Digital', shortLabel: 'Tech', badge: 'Digital Builder', icon: 'Cpu', accent: 'var(--space-brand-primary-500)',
    tagline: 'Products, platforms and the loops that turn usage into value.',
    basics: { front: 'Tech is not one business model. SaaS sells recurring software, marketplaces match two sides, e-commerce sells transactions, and ad platforms monetize attention.', back: ['The product may be software, access, matching, data or infrastructure rather than a physical object.', 'Classification matters because it determines the customer, unit of revenue and scaling constraint.', 'A strong candidate names the model before discussing growth: monthly recurring revenue for SaaS is different from gross merchandise value for a marketplace.'] },
    process: { title: 'The digital product loop', flow: ['Discover problem', 'Prototype', 'Build', 'Acquire users', 'Measure behavior', 'Iterate'], bullets: ['Discovery tests whether the pain is real before engineering scales it.', 'Instrumentation turns user actions into evidence.', 'Iteration should improve retention or willingness to pay, not just release more features.'] },
    operations: { front: 'Digital businesses still have operations: content moderation, seller onboarding, fraud review, customer support, cloud reliability and last-mile fulfillment can determine the experience.', back: ['Automation lowers marginal cost only after the exception process is designed.', 'Vietnam’s mobile-first users expect low-friction onboarding but remain price-sensitive and promotion-aware.', 'For marketplaces, supply quality and fulfillment reliability are as important as app interface quality.'] },
    valueChain: { flow: ['User need', 'Product interface', 'Software & data', 'Partner / seller supply', 'Transaction or subscription', 'Support & retention'], bullets: ['Network effects appear only when each new participant improves value for others.', 'Cloud and engineering are not free; serving, support and incentive costs matter.', 'The most valuable point is often the controlled customer relationship and data feedback loop.'] },
    economics: { front: 'A startup can grow GMV and still destroy cash. Unit economics asks whether one more customer or order creates contribution after variable costs and incentives.', back: ['Revenue models include subscription, commission, advertising, transaction fees and usage charges.', 'Common cost drivers are engineering, cloud, sales, support, payment fees, logistics and promotions.', 'Shopee’s regional reports are read through GMV, take rate, adjusted EBITDA and logistics/marketing efficiency—not downloads alone.'] },
    metrics: ['Activation — users reaching the first value moment', 'Retention — cohort share returning after a period', 'CAC — acquisition spend per new paying/active customer', 'LTV — expected contribution from a customer relationship', 'Take rate / ARR — platform revenue as % of GMV, or annual recurring subscription revenue'],
    quizzes: [
      { question: 'What is product-market fit?', options: ['A polished logo', 'Strong evidence a defined market repeatedly values the product', 'A large engineering team', 'Any paid campaign'], answer: 1, explanation: 'Product-market fit shows in pull, retention and willingness to pay—not presentation polish.' },
      { question: 'Which marketplace side should be grown first?', options: ['Always buyers', 'Always sellers', 'The constrained side that unlocks liquidity, while maintaining balance', 'Neither'], answer: 2, explanation: 'Marketplaces solve a chicken-and-egg problem; the scarce side varies by category and geography.' },
      { question: 'Which metric best tests lasting user value?', options: ['Downloads', 'Retention by cohort', 'Press mentions', 'Features shipped'], answer: 1, explanation: 'Cohort retention shows whether users continue receiving value after acquisition effects fade.' },
      { question: 'LTV:CAC is useful because it compares…', options: ['Servers with offices', 'Expected customer contribution with acquisition cost', 'Code lines with bugs', 'GMV with headcount'], answer: 1, explanation: 'The ratio tests whether customer economics can repay acquisition cost with room for overhead and risk.' },
      { question: 'Who owns a product roadmap day to day?', options: ['Product with engineering, design and business input', 'Only finance', 'Only the CEO’s friends', 'The cloud vendor'], answer: 0, explanation: 'Product management synthesizes user, business and technical evidence; delivery is cross-functional.' },
    ],
    roles: [
      { name: 'Product MT', intro: 'You will convert ambiguous user pain into measurable product bets.', bullets: ['You will interview users and inspect funnel data.', 'You will write problem statements and acceptance criteria.', 'You will prioritize with engineering and design.', 'You will run experiments and post-launch reviews.', 'You will say no to features without a clear outcome.'] },
      { name: 'Growth / Marketing MT', intro: 'You will build repeatable acquisition and retention loops.', bullets: ['You will manage channel and referral experiments.', 'You will track CAC, activation and cohort retention.', 'You will design lifecycle messaging and promotions.', 'You will separate incrementality from attributed clicks.', 'You will scale only channels with credible payback.'] },
      { name: 'Business Operations MT', intro: 'You will make the digital promise work in the messy real world.', bullets: ['You will improve seller or partner onboarding.', 'You will diagnose service, fraud and fulfillment exceptions.', 'You will build dashboards and operating routines.', 'You will coordinate product fixes with frontline changes.', 'You will reduce cost without degrading trust.'] },
      { name: 'Data / Strategy MT', intro: 'You will turn event data into decisions, not decorative dashboards.', bullets: ['You will define metrics and clean logic.', 'You will analyze cohorts, funnels and experiments.', 'You will size markets and business cases.', 'You will challenge causal claims.', 'You will communicate one decision from many charts.'] },
    ],
    cases: [
      { company: 'VNG', title: 'From games to a digital ecosystem', front: 'VNG built a strong base in online games, then expanded into messaging, payments and cloud services. Shared technology and user reach created optionality. Each adjacent business still needed its own reason to win.', story: ['Problem: dependence on one hit-driven category creates volatility.', 'Action: VNG reinvested gaming capabilities into Zalo, payments and enterprise technology.', 'Execution: local language, relationships and infrastructure supported expansion.', 'Result: VNG became a rare Vietnamese multi-product technology group.', 'Lesson: adjacency works when capabilities transfer; a broad portfolio alone is not a moat.'], question: 'Which VNG adjacency has the strongest right to win, and why?' },
      { company: 'Shopee Vietnam', title: 'Buying liquidity, then improving economics', front: 'Shopee used free shipping, vouchers and seller acquisition to accelerate marketplace liquidity. Scale improved selection and habit. The strategic transition was from subsidized growth to monetization and operating discipline.', story: ['Problem: buyers will not come without sellers, and sellers will not come without demand.', 'Action: Shopee subsidized both sides while localizing categories, payments and logistics.', 'Execution: campaigns concentrated traffic and trained shopping behavior.', 'Result: marketplace leadership created monetization opportunities through commissions, ads and services.', 'Lesson: subsidies can ignite a network, but defensibility requires retention and improving contribution margin.'], question: 'Which subsidy would you cut first without damaging marketplace liquidity?' },
      { company: 'FPT', title: 'Moving up the software value chain', front: 'FPT expanded from domestic IT services into global software delivery and digital transformation. Labor scale opened doors, but higher-value work required domain expertise and client trust. Acquisitions and local presence helped it move closer to customers.', story: ['Problem: pure offshore coding competes heavily on cost.', 'Action: FPT invested in overseas sales, vertical expertise, cloud and transformation capabilities.', 'Execution: delivery centers in Vietnam combined with client-facing teams abroad.', 'Result: the company won larger and more strategic engagements.', 'Lesson: service firms escape commoditization by owning more of the problem, not only adding engineers.'], question: 'How should FPT measure progress from staff augmentation to transformation partner?' },
    ],
    interview: { front: 'Tech answers should distinguish growth, engagement and economics. “More users” is not a complete objective.', back: ['Name the user and value moment.', 'Choose a retention cohort and one north-star metric.', 'Map the variable cost and monetization event.', 'Identify the trust, fraud or operational constraint.'] },
    synthesis: { flow: ['Painful problem', 'First value', 'Habit / retention', 'Monetization', 'Scalable unit economics'], bullets: ['Acquisition cannot repair weak retention.', 'A network effect must improve user value, not just company size.', 'Every growth plan needs an experiment and guardrail metric.'] },
  },
  {
    slug: 'retail', label: 'Retail', shortLabel: 'Retail', badge: 'Retail Operator', icon: 'Store', accent: 'var(--space-semantic-warning-600)',
    tagline: 'Assortment, stores and the daily economics of a shopping basket.',
    basics: { front: 'Retail buys or hosts an assortment, makes it discoverable and earns a margin on shopper transactions. Formats include supermarkets, minimarts, convenience, specialty, department stores and marketplaces.', back: ['Each format serves a mission: a hypermarket supports planned stock-up trips; convenience stores trade higher prices for proximity and speed.', 'Retailers sell shelf space and shopper access as well as merchandise, creating supplier-funded income and media opportunities.', 'Category management balances choice, inventory turns and negotiating power rather than maximizing SKU count.'] },
    process: { title: 'How a retail assortment reaches the shelf', flow: ['Category strategy', 'Supplier negotiation', 'Range & price', 'Replenishment', 'Shelf / app execution', 'Checkout & loyalty data'], bullets: ['The range must fit the local mission and store size.', 'Replenishment protects availability without trapping cash.', 'Point-of-sale data closes the loop into forecasting and negotiation.'] },
    operations: { front: 'A store is a small operating system: labor, shelf availability, shrink, queues, freshness and local demand must work together every day.', back: ['Store managers translate central plans into rosters, receiving, replenishment and service.', 'Vietnam’s retail mix still includes traditional markets and independent shops, so modern chains compete on trust, fresh food, convenience and price perception.', 'Omnichannel adds picking, substitutions and last-mile costs that can make an apparently incremental order unprofitable.'] },
    valueChain: { flow: ['Supplier', 'Distribution center', 'Store / dark store', 'Shelf or picking', 'Checkout', 'Returns / loyalty'], bullets: ['Retailer power rises with traffic and data, but suppliers retain power in must-have brands.', 'Fresh categories bring frequency but also waste and handling cost.', 'Private label can improve margin and differentiation if quality earns trust.'] },
    economics: { front: 'Retail lives on small margins multiplied by inventory turns. A store can grow sales and still lose money if markdowns, shrink or labor rise faster.', back: ['Revenue comes from merchandise margin, supplier income, memberships, ads and services.', 'Major costs include merchandise, rent, labor, logistics, utilities, shrink and markdowns.', 'Central Retail and global peers discuss same-store sales, gross margin, selling space and store expansion because opening more stores can hide weak existing-store performance.'] },
    metrics: ['Like-for-like sales — sales growth from comparable existing stores', 'Gross margin — sales less merchandise cost', 'Inventory turn — annual cost of goods divided by average inventory', 'Basket size — average transaction value or items', 'Shrink — inventory lost through damage, error or theft'],
    quizzes: [
      { question: 'Why use like-for-like sales?', options: ['To exclude VAT only', 'To separate existing-store performance from new-store openings', 'To measure staff age', 'To count suppliers'], answer: 1, explanation: 'Comparable-store growth reveals whether the established estate is actually improving.' },
      { question: 'What is the main cost of too much assortment?', options: ['More colors', 'Fragmented demand, lower turns and trapped working capital', 'Lower rent', 'Fewer suppliers'], answer: 1, explanation: 'Extra SKUs consume shelf and cash while often adding little incremental demand.' },
      { question: 'Which metric links stock to sales velocity?', options: ['Inventory turn', 'Brand awareness', 'NIM', 'Claim ratio'], answer: 0, explanation: 'Inventory turn shows how many times stock is sold and replaced over a period.' },
      { question: 'Why can online grocery orders dilute profit?', options: ['No customers', 'Picking, substitution and delivery costs may exceed the margin', 'Products have no price', 'Apps cannot take payment'], answer: 1, explanation: 'Store economics do not automatically cover the extra fulfillment cost of an online order.' },
      { question: 'Who decides shelf assortment by mission and economics?', options: ['Category management', 'Only security', 'Only landlord', 'The payment gateway'], answer: 0, explanation: 'Category managers combine shopper demand, supplier terms, space and inventory productivity.' },
    ],
    roles: [
      { name: 'Category Management MT', intro: 'You will run a category like a mini business.', bullets: ['You will analyze sales, margin and basket data.', 'You will set range, price and promotion architecture.', 'You will negotiate terms with suppliers.', 'You will review space and private-label opportunities.', 'You will remove SKUs that do not earn their shelf.'] },
      { name: 'Store Operations MT', intro: 'You will make central strategy survive the shop floor.', bullets: ['You will schedule labor and lead daily huddles.', 'You will monitor availability, queues and shrink.', 'You will fix receiving and replenishment gaps.', 'You will coach service and safety standards.', 'You will own a store-level P&L.'] },
      { name: 'Supply Chain MT', intro: 'You will keep thousands of SKUs available with limited cash and space.', bullets: ['You will forecast by store and SKU.', 'You will set replenishment parameters.', 'You will manage DC and transport performance.', 'You will reduce waste and stock-outs together.', 'You will plan peaks such as Tet.'] },
      { name: 'Omnichannel / CRM MT', intro: 'You will connect store, app and loyalty behavior.', bullets: ['You will map search-to-delivery conversion.', 'You will design loyalty segments and offers.', 'You will track picking and delivery economics.', 'You will coordinate substitutions and returns.', 'You will test whether campaigns are incremental.'] },
    ],
    cases: [
      { company: 'WinCommerce', title: 'From rapid expansion to store economics', front: 'WinCommerce assembled a nationwide grocery network through acquisition and expansion. Scale created purchasing and distribution potential. It then had to improve store format, assortment and profitability rather than celebrate footprint alone.', story: ['Problem: a large network can magnify weak unit economics.', 'Action: WinCommerce rationalized stores, refined WinMart+ formats and connected them with Masan’s consumer ecosystem.', 'Execution: denser local coverage supported frequent shopping and shared distribution.', 'Result: the strategic focus shifted toward sustainable like-for-like sales and store EBITDA.', 'Lesson: rollout is valuable only after the repeatable store model is proven.'], question: 'Which store-level metrics would determine whether WinCommerce should open the next 500 locations?' },
      { company: 'Mobile World', title: 'Replicating an operating system', front: 'Mobile World scaled disciplined electronics retail, then tested the model in grocery with Bach Hoa Xanh. Grocery brought higher frequency but harder freshness and supply-chain economics. Expansion pauses became part of learning the format.', story: ['Problem: electronics retail capabilities do not transfer perfectly to fresh grocery.', 'Action: the group built a new assortment, DC and neighborhood-store model.', 'Execution: rapid experimentation exposed issues in waste, labor and availability.', 'Result: management refocused on store economics before renewed expansion.', 'Lesson: a great retailer transfers operating discipline, but must relearn category physics.'], question: 'What capabilities transfer from electronics to grocery, and which do not?' },
      { company: 'Central Retail Vietnam', title: 'A portfolio of shopping missions', front: 'Central Retail operates hypermarkets, supermarkets, malls and specialty formats in Vietnam. The portfolio reaches different missions and cities. Complexity requires clear positioning and shared capabilities without making every format identical.', story: ['Problem: one retail format cannot serve every Vietnamese shopping mission.', 'Action: Central Retail developed multiple banners and invested in sourcing, stores and omnichannel services.', 'Execution: local food supply and mall ecosystems increased relevance.', 'Result: the company gained broad reach across grocery and discretionary categories.', 'Lesson: multi-format scale works when each banner has a distinct job and shared back-end advantage.'], question: 'How would you decide which format should enter a tier-two Vietnamese city?' },
    ],
    interview: { front: 'Start retail cases at the store or order level. National market growth cannot rescue a bad unit.', back: ['Build sales from traffic × conversion × basket.', 'Deduct product margin, labor, rent and shrink.', 'Check inventory turns and cash.', 'Then decide whether the model is repeatable.'] },
    synthesis: { flow: ['Shopping mission', 'Assortment', 'Availability', 'Basket', 'Store contribution'], bullets: ['Every format begins with a mission.', 'Shelf space is capital allocation.', 'Expansion comes after stable unit economics.'] },
  },
  {
    slug: 'industrial-manufacturing', label: 'Industrial & Manufacturing', shortLabel: 'Manufacturing', badge: 'Factory Strategist', icon: 'Building2', accent: 'var(--space-neutral-700)',
    tagline: 'Factories, quality and the systems that turn inputs into reliable output.',
    basics: { front: 'Manufacturing converts materials and components into standardized output through a controlled process. Industries differ by process: discrete assembly, batch production and continuous flow have different bottlenecks.', back: ['Electronics assembly manages components, lines and yields; cement and chemicals run continuous assets; food and pharmaceuticals add hygiene and traceability.', 'Product architecture determines make-or-buy choices, equipment and supplier risk.', 'Candidates sound credible when they connect demand variety to setup time, capacity, quality and inventory.'] },
    process: { title: 'A controlled production cycle', flow: ['Design / BOM', 'Source inputs', 'Plan capacity', 'Produce', 'Inspect & test', 'Ship & improve'], bullets: ['The bill of materials links every unit to required components.', 'Quality must be built into the process, not inspected only at the end.', 'Root-cause improvement removes recurring loss instead of firefighting symptoms.'] },
    operations: { front: 'Vietnam manufacturing combines export-oriented FDI factories with growing local suppliers. The operating challenge is to deliver global quality while localizing skills and inputs.', back: ['Factories synchronize materials, labor, maintenance and changeovers to customer schedules.', 'Industrial parks and ports support exports, while imported components expose firms to lead-time and currency risk.', 'Lean methods reduce motion, waiting, defects and excess inventory; they are management systems, not cost-cutting slogans.'] },
    valueChain: { flow: ['Design & engineering', 'Tier-2 materials', 'Tier-1 components', 'Plant assembly', 'Quality / export', 'Customer service'], bullets: ['High-value design and intellectual property may sit outside Vietnam even when assembly is local.', 'Supplier development raises localization and resilience.', 'Bottlenecks, yield and downtime concentrate operational value inside the plant.'] },
    economics: { front: 'Factories do not maximize utilization at any cost. Running the wrong product creates inventory, hides defects and consumes cash.', back: ['Revenue often comes from contracted units, engineered projects or long-term supply agreements.', 'Costs include materials, direct labor, energy, depreciation, maintenance, scrap and logistics.', 'Samsung’s Vietnam footprint illustrates scale and export importance, while performance still depends on product cycles, yield and supply-chain coordination.'] },
    metrics: ['OEE — availability × performance × quality', 'First-pass yield — % produced correctly without rework', 'Cycle time — time for one unit or process step', 'On-time in-full — orders delivered complete and on schedule', 'Scrap / conversion cost — loss and processing cost per good unit'],
    quizzes: [
      { question: 'What does OEE combine?', options: ['Price, tax and margin', 'Availability, performance and quality', 'Hiring, training and pay', 'Sales, ads and distribution'], answer: 1, explanation: 'OEE exposes whether an asset loses output through downtime, slow speed or defects.' },
      { question: 'Why is end-of-line inspection insufficient?', options: ['Inspectors are unnecessary', 'It detects defects after value and time have already been added', 'Quality never matters', 'It increases demand'], answer: 1, explanation: 'Process controls prevent defects at source and reduce rework, scrap and escaped failures.' },
      { question: 'Which metric shows right-first-time production?', options: ['First-pass yield', 'Market share', 'CASA', 'Basket size'], answer: 0, explanation: 'First-pass yield excludes units requiring rework, making process quality visible.' },
      { question: 'Why can 100% utilization be harmful?', options: ['Machines dislike work', 'It removes buffer for mix changes and can create excess inventory', 'It guarantees defects', 'It lowers depreciation'], answer: 1, explanation: 'Utilization is valuable only when output matches real demand and the system can absorb variability.' },
      { question: 'Who balances demand, inventory and plant capacity?', options: ['Planning / supply chain', 'Only reception', 'Only PR', 'The customs broker alone'], answer: 0, explanation: 'Planning connects customer demand with material and capacity constraints.' },
    ],
    roles: [
      { name: 'Operations MT', intro: 'You will learn the process from the floor, one loss at a time.', bullets: ['You will review safety, output and quality at shift start.', 'You will map bottlenecks and standard work.', 'You will lead root-cause problem solving.', 'You will coordinate supervisors and engineers.', 'You will quantify each improvement in good units and cost.'] },
      { name: 'Supply Chain / Procurement MT', intro: 'You will keep the line supplied without turning the warehouse into a buffer for every uncertainty.', bullets: ['You will plan materials from BOM and demand.', 'You will evaluate supplier quality and lead time.', 'You will negotiate total cost, not piece price only.', 'You will manage shortages and alternate sources.', 'You will develop local suppliers.'] },
      { name: 'Quality MT', intro: 'You will protect the customer by controlling the process.', bullets: ['You will analyze defects and control charts.', 'You will run audits and corrective actions.', 'You will validate suppliers and changes.', 'You will manage traceability and customer complaints.', 'You will distinguish containment from permanent correction.'] },
      { name: 'Engineering / Maintenance MT', intro: 'You will improve reliability, capability and safe automation.', bullets: ['You will plan preventive maintenance.', 'You will analyze downtime and failure modes.', 'You will support tooling and line changes.', 'You will justify automation with capacity and quality gains.', 'You will design out recurring hazards.'] },
    ],
    cases: [
      { company: 'Samsung Vietnam', title: 'Building an export manufacturing hub', front: 'Samsung made Vietnam a major global electronics production base. Investment brought scale, supplier demand and export capability. The next challenge is deepening local value rather than remaining primarily an assembly location.', story: ['Problem: global electronics needs cost, quality, scale and geopolitical resilience.', 'Action: Samsung invested heavily in large Vietnamese production and R&D facilities.', 'Execution: supplier programs and workforce development supported the ecosystem.', 'Result: Vietnam became central to Samsung’s global device supply chain.', 'Lesson: FDI creates the most durable advantage when local engineering and supplier capability rise with output.'], question: 'How could Vietnam capture more value from Samsung’s manufacturing ecosystem?' },
      { company: 'VinFast', title: 'Compressing the automotive learning curve', front: 'VinFast built a domestic automotive base and pivoted aggressively into electric vehicles. Speed created attention and industrial capability. It also magnified capital, quality, service-network and global-demand risks.', story: ['Problem: entering automotive requires enormous scale, engineering and trust.', 'Action: VinFast invested in an integrated plant, external technology partnerships and an EV-focused portfolio.', 'Execution: rapid launches shortened traditional development cycles.', 'Result: the company established a Vietnamese auto brand while taking on a difficult global ramp.', 'Lesson: speed is strategic only when quality feedback, cash and service capability scale with it.'], question: 'Which bottleneck should VinFast solve before accelerating global volume?' },
      { company: 'Intel Products Vietnam', title: 'High-tech assembly and test at scale', front: 'Intel placed a major assembly and test facility in Ho Chi Minh City. The site handles precision processes within a global semiconductor network. Reliability and talent depth matter more than low labor cost alone.', story: ['Problem: semiconductor back-end operations demand exacting yield, traceability and continuity.', 'Action: Intel invested in a large Vietnamese assembly-and-test operation.', 'Execution: standardized systems and technical workforce development integrated the site globally.', 'Result: Vietnam gained a significant role in a critical technology value chain.', 'Lesson: advanced manufacturing locations win through process capability and reliability, not wages alone.'], question: 'What would make Vietnam attractive for higher-value semiconductor stages?' },
    ],
    interview: { front: 'Walk manufacturing cases through flow, bottleneck, quality and economics—never jump directly to “buy more machines”.', back: ['Map the process and takt/cycle times.', 'Locate the true constraint.', 'Check yield and downtime losses.', 'Compare debottlenecking with capex.'] },
    synthesis: { flow: ['Customer demand', 'Material plan', 'Constraint', 'Good output', 'Learning loop'], bullets: ['The constraint sets system throughput.', 'Quality loss consumes hidden capacity.', 'Inventory is often a symptom of variability.'] },
  },
  {
    slug: 'consulting', label: 'Consulting', shortLabel: 'Consulting', badge: 'Case Cracker', icon: 'Briefcase', accent: 'var(--space-brand-primary-900)',
    tagline: 'Structured problem solving, client change and project economics.',
    basics: { front: 'Consulting sells temporary teams of expertise and problem-solving capacity. Strategy, operations, technology, deals, risk, tax and audit solve different client problems and carry different delivery models.', back: ['Strategy projects frame choices for senior leaders; implementation work changes processes and systems; professional services also provide assurance and regulatory expertise.', 'The product is a defensible answer plus the client alignment required to act on it.', 'Firms compete on brand, expertise, relationships, talent leverage and repeatable intellectual property.'] },
    process: { title: 'From vague question to client decision', flow: ['Align problem', 'Structure hypotheses', 'Build workplan', 'Gather & analyze', 'Synthesize', 'Recommend & mobilize'], bullets: ['A good issue tree directs work; it is not a decorative slide.', 'Synthesis answers “so what” before listing analyses.', 'Implementation needs owners, milestones and behavior change.'] },
    operations: { front: 'A project is staffed as a pyramid: partners steer relationships, managers integrate work, and junior teams build analysis. Leverage drives economics but requires coaching and quality control.', back: ['Teams run interviews, data requests, models, workshops and storylines in parallel.', 'Vietnam projects often mix local market knowledge with regional or global experts.', 'Utilization matters, but overloading teams can damage quality, retention and long-term client trust.'] },
    valueChain: { flow: ['Reputation & relationships', 'Proposal', 'Staffing', 'Analysis', 'Client alignment', 'Follow-on impact'], bullets: ['Winning work depends on credibility before delivery starts.', 'Margin is created through pricing, leverage and controlled scope.', 'Repeat work and referrals convert good delivery into franchise value.'] },
    economics: { front: 'Consulting revenue is people time priced above delivery cost. Scope creep and poor staffing can destroy margin even when the client pays a high fee.', back: ['Models include fixed fee, time and materials, retainers and success-linked fees.', 'Major costs are compensation, travel, subcontractors, knowledge tools and unstaffed bench time.', 'Big Four firms discuss revenue by service line and geography; interview candidates should understand that audit, tax, deals and consulting have distinct regulation and economics.'] },
    metrics: ['Utilization — billable time divided by available time', 'Project margin — fee less direct delivery cost', 'Leverage — junior staff relative to senior staff', 'Pipeline / win rate — qualified proposals and conversion', 'Client impact / repeat rate — value realized and relationship renewal'],
    quizzes: [
      { question: 'What is the purpose of an issue tree?', options: ['To decorate slides', 'To break a problem into testable, collectively complete branches', 'To list every fact', 'To replace analysis'], answer: 1, explanation: 'A useful structure guides hypotheses, data and ownership while avoiding overlap.' },
      { question: 'Why does scope creep hurt a fixed-fee project?', options: ['The fee rises automatically', 'More work is delivered without equivalent revenue', 'It increases utilization perfectly', 'Clients disappear'], answer: 1, explanation: 'Uncontrolled extra work consumes hours and margin unless scope or fee is reset.' },
      { question: 'What does utilization miss?', options: ['All billable time', 'Quality, price, leverage and client impact', 'Calendar days', 'Employee names'], answer: 1, explanation: 'High utilization can coexist with low margin or poor outcomes.' },
      { question: 'Which statement is synthesis?', options: ['We made 14 charts', 'Profit fell because premium mix declined; restore it before cutting price', 'Here are the data sources', 'The meeting lasted one hour'], answer: 1, explanation: 'Synthesis combines evidence into an answer and implication.' },
      { question: 'What will an entry-level consultant do most often?', options: ['Only give speeches', 'Research, analyze, interview, build slides and manage workstreams', 'Approve firm strategy alone', 'Avoid clients'], answer: 1, explanation: 'Junior consultants own rigorous modules of work and contribute to team synthesis.' },
    ],
    roles: [
      { name: 'Strategy / Management Consulting Analyst', intro: 'You will own a piece of an ambiguous executive problem.', bullets: ['You will structure hypotheses and data needs.', 'You will research markets and interview stakeholders.', 'You will build models and clean exhibits.', 'You will synthesize findings into a storyline.', 'You will defend assumptions in team reviews.'] },
      { name: 'Technology Consulting MT', intro: 'You will connect business requirements to systems and change.', bullets: ['You will map processes and pain points.', 'You will define requirements and test scenarios.', 'You will coordinate client and technical teams.', 'You will track adoption and delivery risks.', 'You will translate technical trade-offs plainly.'] },
      { name: 'Deals / Transaction Advisory MT', intro: 'You will test the commercial and financial logic of a transaction.', bullets: ['You will analyze quality of earnings or market attractiveness.', 'You will build data books and interview management.', 'You will identify diligence red flags.', 'You will size synergies and integration risks.', 'You will distinguish facts from deal enthusiasm.'] },
      { name: 'Audit / Risk MT', intro: 'You will provide evidence-based assurance under professional standards.', bullets: ['You will understand processes and controls.', 'You will test transactions and balances.', 'You will document evidence precisely.', 'You will escalate exceptions and fraud risks.', 'You will manage deadlines across client teams.'] },
    ],
    cases: [
      { company: 'McKinsey & Company', title: 'From strategy deck to implementation', front: 'Strategy firms historically advised senior leaders on major choices. Clients increasingly demanded measurable implementation, digital and capability building. McKinsey expanded beyond recommendations while protecting senior-level trust.', story: ['Problem: advice without execution can fail to create impact.', 'Action: McKinsey grew implementation, analytics, design and capability-building offerings.', 'Execution: specialist teams worked alongside traditional generalist consultants.', 'Result: engagements could cover a longer part of the change journey.', 'Lesson: service firms must extend scope without diluting the distinctive value that earned access.'], question: 'How should a strategy firm decide which implementation capabilities to build?' },
      { company: 'Deloitte', title: 'A multidisciplinary client model', front: 'Deloitte combined audit roots with tax, consulting, risk and deals capabilities. Clients gained access to broad expertise. Independence rules and organizational complexity constrained cross-selling.', story: ['Problem: complex clients face interconnected regulatory, technology and operating issues.', 'Action: Deloitte developed large specialist practices under one global brand.', 'Execution: multidisciplinary teams addressed broader transformations.', 'Result: breadth created scale and account depth.', 'Lesson: a broad platform wins only when collaboration, quality and conflict rules are managed deliberately.'], question: 'When does breadth create client value, and when does it create conflicts?' },
      { company: 'BCG', title: 'Building digital capability inside a strategy firm', front: 'BCG invested in digital ventures, data science and technology build capabilities. This answered client demand for working products, not only strategic plans. Integration between generalists and specialists became the management challenge.', story: ['Problem: digital strategy is weak without technical feasibility and delivery.', 'Action: BCG built units such as BCG X and expanded analytics talent.', 'Execution: mixed teams combined industry context, product design and engineering.', 'Result: the firm competed for end-to-end digital transformation work.', 'Lesson: new capability matters only when it changes the client outcome and works with the core.'], question: 'How would you staff and price a strategy-plus-build engagement?' },
    ],
    interview: { front: 'Consulting interviews reward the quality of your thinking process, not memorized frameworks.', back: ['Clarify the decision and objective.', 'Build a tailored, prioritized structure.', 'State hypotheses and calculate cleanly.', 'Synthesize after every major analysis.'] },
    synthesis: { flow: ['Decision', 'Hypotheses', 'Evidence', 'Insight', 'Action & owner'], bullets: ['Structure follows the decision.', 'Analysis without synthesis is unfinished.', 'A recommendation needs implementation and risk.'] },
  },
  {
    slug: 'logistics', label: 'Logistics & Supply Chain', shortLabel: 'Logistics', badge: 'Network Navigator', icon: 'Truck', accent: 'var(--space-semantic-success-700)',
    tagline: 'Freight, warehouses and the networks behind every promise.',
    basics: { front: 'Logistics moves, stores and coordinates goods. Freight forwarding buys and orchestrates transport; carriers own capacity; 3PLs run outsourced logistics; parcel firms manage last-mile networks.', back: ['Modes trade speed, cost and reliability: ocean is economical for scale, air is fast, road is flexible and rail can serve dense corridors.', 'Contract logistics adds warehousing, fulfillment and value-added services.', 'Supply-chain management is broader: it plans materials, inventory and partners from supplier to customer.'] },
    process: { title: 'An international shipment', flow: ['Book capacity', 'Collect cargo', 'Export customs', 'Main transport', 'Import customs', 'Deliver & prove receipt'], bullets: ['Documents and customs are part of the physical flow.', 'Consolidation improves capacity use but adds handling and timing dependencies.', 'Visibility lets customers manage exceptions before delivery failure.'] },
    operations: { front: 'Vietnam logistics is shaped by export manufacturing, congested gateways, fragmented trucking and explosive parcel expectations.', back: ['Operators plan routes, line-haul, hubs, warehouses and delivery density as one network.', 'Ports near Ho Chi Minh City and Hai Phong connect industrial clusters to global trade.', 'Last mile is expensive because every failed delivery, remote stop and cash-on-delivery exception consumes rider time.'] },
    valueChain: { flow: ['Shipper demand', 'Forwarder / booking', 'Carrier capacity', 'Port / hub / warehouse', 'Last mile', 'Consignee'], bullets: ['Asset-light forwarders earn through procurement, orchestration and service.', 'Asset owners need utilization to cover fixed cost.', 'Dense routes and standardized handling create margin; exceptions destroy it.'] },
    economics: { front: 'Logistics margin comes from network density, capacity utilization and exception control. Revenue growth bought with empty return legs is fragile.', back: ['Revenue may be per shipment, kilogram, container, pallet, stop or contracted service.', 'Costs include purchased freight, vehicles, fuel, labor, facilities, technology, claims and failed deliveries.', 'Maersk reports ocean volumes and rates alongside logistics revenue; candidates should separate cyclical freight prices from durable integrated-service growth.'] },
    metrics: ['On-time in-full — complete orders delivered by promise date', 'Load factor / utilization — used capacity divided by available capacity', 'Cost per stop or shipment — network cost per completed unit', 'Inventory days / dwell time — time goods wait in stock or nodes', 'Perfect order / damage rate — error-free delivery quality'],
    quizzes: [
      { question: 'What does a freight forwarder primarily do?', options: ['Manufacture goods', 'Arrange and manage transport across carriers and borders', 'Set customs law', 'Own every ship'], answer: 1, explanation: 'Forwarders orchestrate capacity, documents and exceptions; many are asset-light.' },
      { question: 'Why does route density improve last-mile economics?', options: ['Fuel becomes free', 'More deliveries share rider time and distance', 'Packages get lighter', 'Customers stop caring'], answer: 1, explanation: 'Stops close together raise deliveries per route hour and spread fixed route cost.' },
      { question: 'Which metric captures customer delivery promise?', options: ['OTIF', 'NIM', 'OEE only', 'Market share only'], answer: 0, explanation: 'OTIF measures whether the complete order arrived within the agreed window.' },
      { question: 'Why are empty return legs damaging?', options: ['They raise revenue', 'The asset incurs time and fuel without paying cargo', 'They improve utilization', 'They reduce emissions'], answer: 1, explanation: 'Backhaul planning monetizes capacity that otherwise returns empty.' },
      { question: 'Who coordinates forecast, inventory and transport across functions?', options: ['Supply chain planning', 'Only the driver', 'Only customs', 'Only marketing'], answer: 0, explanation: 'Integrated planning prevents local transport or inventory decisions from hurting end-to-end service.' },
    ],
    roles: [
      { name: 'Operations MT', intro: 'You will run a live network where yesterday’s exception cannot wait.', bullets: ['You will review service, backlog and capacity.', 'You will allocate labor and routes.', 'You will resolve missed connections and claims.', 'You will improve standard work at hubs.', 'You will balance speed, cost and safety.'] },
      { name: 'Commercial / Key Account MT', intro: 'You will sell a service the network can actually deliver profitably.', bullets: ['You will map customer lanes and requirements.', 'You will build rates and tenders.', 'You will coordinate operations and procurement.', 'You will review service and margin by account.', 'You will prevent custom promises from becoming hidden cost.'] },
      { name: 'Supply Chain Solutions MT', intro: 'You will design the flow before operations runs it.', bullets: ['You will model warehouse and transport networks.', 'You will size capacity and inventory policies.', 'You will design layouts and processes.', 'You will simulate service-cost trade-offs.', 'You will present a solution with assumptions and risks.'] },
      { name: 'Procurement / Carrier Management MT', intro: 'You will secure reliable capacity at the right total cost.', bullets: ['You will source carriers and negotiate lanes.', 'You will track tender acceptance and quality.', 'You will develop backup capacity.', 'You will manage fuel and peak surcharges.', 'You will distinguish low rates from low landed cost.'] },
    ],
    cases: [
      { company: 'Maersk', title: 'From ocean carrier to integrator', front: 'Maersk used ocean shipping as its core, then acquired and built logistics services. The promise was one partner across transport and fulfillment. Integration complexity and freight cycles tested the strategy.', story: ['Problem: container shipping earnings are cyclical and customer supply chains are fragmented.', 'Action: Maersk invested in warehousing, air freight, forwarding and technology.', 'Execution: it aimed to connect bookings, inventory and inland delivery.', 'Result: logistics became a larger strategic pillar alongside ocean.', 'Lesson: integration creates value only when customers see better reliability or lower total cost.'], question: 'Which customer segments value an integrated Maersk offer most?' },
      { company: 'Gemadept', title: 'Ports plus logistics in Vietnam', front: 'Gemadept built positions in ports and logistics serving Vietnam’s trade growth. Port assets benefit from volume and location. Capital intensity makes capacity timing and utilization decisive.', story: ['Problem: export growth needs efficient gateways and inland connections.', 'Action: Gemadept invested in port capacity and related logistics services.', 'Execution: terminal operations connected industrial demand to shipping networks.', 'Result: the company gained exposure to long-term trade flows.', 'Lesson: infrastructure value depends on location, throughput and disciplined expansion.'], question: 'How would you evaluate a new port-capacity investment in Vietnam?' },
      { company: 'GHN', title: 'Engineering parcel density', front: 'GHN scaled with Vietnam’s e-commerce sellers and consumers. Fast service required hubs, technology and a large courier network. Failed delivery and rural density remained core economic challenges.', story: ['Problem: millions of small parcels create complex, low-ticket delivery work.', 'Action: GHN built sorting hubs, route technology and merchant integrations.', 'Execution: shipment volume improved network density and data.', 'Result: the company became a major e-commerce logistics player.', 'Lesson: last-mile winners industrialize exceptions while keeping the merchant experience simple.'], question: 'How should GHN improve rural service without doubling cost per parcel?' },
    ],
    interview: { front: 'Logistics cases are network cases. Optimize the whole flow, not one cheap lane.', back: ['Map nodes, volume and service promise.', 'Find capacity and exception bottlenecks.', 'Calculate cost per completed unit.', 'Test peak and disruption scenarios.'] },
    synthesis: { flow: ['Demand', 'Network design', 'Capacity plan', 'Execution', 'Visibility & recovery'], bullets: ['Density creates economics.', 'Reliability is designed through buffers and alternatives.', 'Exceptions deserve their own process and metric.'] },
  },
  {
    slug: 'insurance', label: 'Insurance', shortLabel: 'Insurance', badge: 'Risk Underwriter', icon: 'ShieldCheck', accent: 'var(--space-semantic-success-600)',
    tagline: 'Pricing uncertainty, earning trust and paying claims over time.',
    basics: { front: 'Insurance pools uncertain losses. Life, health and general insurance differ in event, duration and claim pattern; insurers price today for costs that may emerge years later.', back: ['Life products cover mortality, longevity or savings needs; non-life covers property, motor, liability and short-duration risks.', 'Premium is not immediately profit because part must fund expected claims, expenses and reserves.', 'Underwriting selects and prices risk; actuarial work models frequency, severity and long-term liabilities.'] },
    process: { title: 'The insurance promise', flow: ['Identify risk', 'Underwrite', 'Price & issue', 'Collect premium', 'Reserve & invest', 'Assess and pay claim'], bullets: ['Exclusions and disclosure define what is covered.', 'Reserves recognize future obligations before cash is paid.', 'Claims service is the moment the intangible product becomes real.'] },
    operations: { front: 'Insurance distribution is an operating model: agents, bancassurance, brokers and digital channels create different economics and conduct risks.', back: ['Vietnam life insurance has relied heavily on agency and bank distribution, making advice quality and trust central.', 'Policies must persist for acquisition costs to be recovered; early lapse is economically damaging.', 'Claims teams investigate validity without turning legitimate customers into adversaries.'] },
    valueChain: { flow: ['Product & actuarial', 'Distribution', 'Underwriting', 'Policy service', 'Investment & reserves', 'Claims'], bullets: ['Distribution often consumes substantial first-year economics.', 'Underwriting and pricing protect the pool from adverse selection.', 'Investment income supports returns but cannot compensate indefinitely for poor underwriting.'] },
    economics: { front: 'Insurance can collect cash before recognizing the full cost. That timing makes combined ratio, reserves and persistency more informative than premium growth alone.', back: ['Revenue economics include earned premium, fees and investment income.', 'Costs include claims, commissions, operations, reinsurance and reserve changes.', 'Prudential and listed insurers discuss annual premium equivalent, new business profit and persistency because the quality and duration of sales matter.'] },
    metrics: ['Loss ratio — claims incurred divided by earned premium', 'Combined ratio — loss ratio plus expense ratio for non-life', 'Persistency — policies still active after a stated period', 'New business value — present value of profit from new life policies', 'Solvency ratio — available capital relative to required capital'],
    quizzes: [
      { question: 'Why is written premium not equal to profit?', options: ['Premium is imaginary', 'Future claims, expenses and reserves must be recognized', 'Insurers pay no claims', 'All premium is tax'], answer: 1, explanation: 'Insurance economics unfold over time; premium funds expected losses and operating costs.' },
      { question: 'A combined ratio below 100% usually means…', options: ['Underwriting profit before investment income', 'No customers', 'Claims exceed all premium', 'The company is insolvent'], answer: 0, explanation: 'For non-life, loss plus expense ratios below 100% indicate an underwriting surplus.' },
      { question: 'Why does persistency matter?', options: ['Longer policies help recover acquisition cost and sustain value', 'It measures office rent', 'It raises every claim', 'It replaces solvency'], answer: 0, explanation: 'Early lapse can destroy expected lifetime economics and signal unsuitable selling.' },
      { question: 'What does reinsurance do?', options: ['Eliminates all risk', 'Transfers part of risk to another insurer for a price', 'Sells phones', 'Replaces underwriting'], answer: 1, explanation: 'Reinsurance manages volatility and capacity, but the primary insurer keeps obligations to policyholders.' },
      { question: 'Who turns mortality and claim assumptions into product pricing?', options: ['Actuarial / pricing', 'Only reception', 'Only media', 'The bank teller alone'], answer: 0, explanation: 'Actuaries model probabilities, cash flows, reserves and capital under regulation.' },
    ],
    roles: [
      { name: 'Product / Actuarial MT', intro: 'You will design a promise that remains affordable and solvent.', bullets: ['You will analyze claims and lapse assumptions.', 'You will support pricing and product filing.', 'You will test profitability and capital sensitivity.', 'You will monitor experience against assumptions.', 'You will explain technical trade-offs simply.'] },
      { name: 'Distribution / Bancassurance MT', intro: 'You will grow sales while protecting suitability and trust.', bullets: ['You will train and support channel partners.', 'You will track conversion, mix and persistency.', 'You will audit advice and customer outcomes.', 'You will design incentives that avoid mis-selling.', 'You will improve lead and renewal journeys.'] },
      { name: 'Underwriting / Risk MT', intro: 'You will decide which risks enter the pool and on what terms.', bullets: ['You will assess applications and evidence.', 'You will apply limits, exclusions or pricing adjustments.', 'You will monitor concentration and fraud indicators.', 'You will work with claims and actuarial teams.', 'You will document fair, consistent decisions.'] },
      { name: 'Claims / Operations MT', intro: 'You will deliver the promise at the customer’s hardest moment.', bullets: ['You will validate coverage and documents.', 'You will investigate complex or suspicious claims.', 'You will shorten turnaround without weakening controls.', 'You will identify recurring product issues.', 'You will communicate decisions with empathy and precision.'] },
    ],
    cases: [
      { company: 'Prudential Vietnam', title: 'Rebuilding trust through quality growth', front: 'Vietnam’s life-insurance sector faced scrutiny over advice and bancassurance practices. Prudential had to protect long-term customer trust while sustaining distribution. Sales quality and policy persistency became strategic, not merely compliance metrics.', story: ['Problem: rapid distribution growth can produce unsuitable sales and early lapses.', 'Action: insurers including Prudential strengthened advice controls, training and customer confirmation.', 'Execution: quality monitoring shifted attention from issuance to durable customer outcomes.', 'Result: the sector’s growth conversation moved toward trust and persistency.', 'Lesson: in long-duration products, conduct quality is part of economic quality.'], question: 'How would you redesign sales incentives to improve both growth and persistency?' },
      { company: 'Bao Viet', title: 'Using reach across life and non-life', front: 'Bao Viet combines a trusted domestic brand with broad insurance operations. Reach and heritage support distribution. The challenge is modernizing service and data while competing with focused private players.', story: ['Problem: legacy scale can become complexity and slow customer experience.', 'Action: Bao Viet developed life and general insurance through a nationwide network.', 'Execution: brand familiarity and institutional relationships supported reach.', 'Result: it remained a major Vietnamese insurer across segments.', 'Lesson: incumbency is an advantage only when converted into faster, clearer service and better risk data.'], question: 'Which customer journey should Bao Viet digitize first?' },
      { company: 'Manulife Vietnam', title: 'Bancassurance growth and its limits', front: 'Manulife expanded in Vietnam partly through bank partnerships. Banks provided trusted access and customer flow. Industry controversy showed that distribution scale without clear advice can damage both brands.', story: ['Problem: insurance is complex, while bank conversations can feel transactional.', 'Action: insurers built exclusive and non-exclusive bancassurance partnerships.', 'Execution: branch referrals and relationship managers accelerated acquisition.', 'Result: sales grew, but complaints elevated suitability and cancellation concerns.', 'Lesson: channel power must be matched by transparent explanation, consent and post-sale service.'], question: 'How would you measure a high-quality bancassurance partnership?' },
    ],
    interview: { front: 'Insurance answers must separate growth from risk quality and customer suitability.', back: ['Define the insured event and pool.', 'Explain pricing, reserve and capital.', 'Name the distribution conduct risk.', 'Finish with claims and persistency outcomes.'] },
    synthesis: { flow: ['Risk pool', 'Price & select', 'Distribute fairly', 'Reserve & invest', 'Pay claims & retain trust'], bullets: ['The product is a future promise.', 'Sales quality appears later in persistency and claims.', 'Capital protects against uncertainty beyond expectation.'] },
  },
  {
    slug: 'tobacco', label: 'Tobacco & NGP', shortLabel: 'Tobacco', badge: 'Regulated-Market Analyst', icon: 'HeartPulse', accent: 'var(--space-semantic-danger-700)',
    tagline: 'A mature, regulated category where compliance shapes every choice.',
    basics: { front: 'Tobacco is a nicotine category with combustible cigarettes at its historical core. Product, tax and route-to-market decisions operate under strict public-health regulation and material harm.', back: ['Cigarettes combine processed tobacco, paper, filter and additives; leaf is cured, blended, made into rods and packaged under controlled specifications.', 'Categories globally include combustible, heated-tobacco and other nicotine formats, but legal status varies sharply.', 'Vietnam banned e-cigarettes and heated-tobacco products from 2025, making regulatory literacy essential and ruling out casual “innovation” recommendations.'] },
    process: { title: 'How a cigarette is manufactured', flow: ['Grow & harvest leaf', 'Cure', 'Grade & blend', 'Cut and condition', 'Make cigarette rods', 'Pack, stamp & distribute'], bullets: ['Leaf blend and curing shape product consistency.', 'Excise stamps and traceability are operating requirements.', 'Quality includes specifications and legal compliance, not only consumer preference.'] },
    operations: { front: 'Tobacco operations combine agricultural sourcing, high-speed manufacturing, licensed distribution, excise control and anti-illicit-trade work.', back: ['Vinataba and international players operate within a heavily controlled market and advertising restrictions.', 'Traditional retail remains important for legal products, while illicit trade bypasses tax and age controls.', 'Commercial decisions must begin with public-health law, responsible conduct and the limits on promotion.'] },
    valueChain: { flow: ['Leaf farming', 'Processing & blending', 'Manufacturing', 'Tax / stamp', 'Licensed wholesale', 'Retail & enforcement'], bullets: ['Government captures substantial value through excise.', 'Illicit trade competes through tax avoidance, not superior efficiency.', 'Regulation can reshape legal demand, channel behavior and enforcement needs.'] },
    economics: { front: 'Tobacco combines high brand economics with high external cost and regulation. Excise can be a large part of retail price, so tax design affects revenue, consumption and illicit-trade incentives.', back: ['Legal revenue comes from taxed product sales; cost drivers include leaf, manufacturing, distribution, tax and compliance.', 'Volume can decline while price/mix supports revenue, but regulation constrains normal marketing levers.', 'BAT and JTI discuss volume, price/mix and reduced-risk categories globally; Vietnam-specific strategy must respect the 2025 ban on new nicotine-device categories.'] },
    metrics: ['Legal-market volume and share — taxed units sold through lawful channels', 'Price/mix — revenue change from pricing and portfolio composition', 'Excise incidence — tax as a share of price or tax base', 'Illicit-trade share — consumption outside lawful taxed channels', 'Manufacturing yield / compliance incidents — output efficiency and control quality'],
    quizzes: [
      { question: 'What changed in Vietnam from 2025?', options: ['All tobacco taxes ended', 'E-cigarettes and heated-tobacco products were banned', 'Cigarettes became unregulated', 'Advertising became unrestricted'], answer: 1, explanation: 'Vietnam prohibited e-cigarettes and heated-tobacco products; recommendations must start from that legal boundary.' },
      { question: 'Why can a sharp excise increase affect illicit trade?', options: ['It removes price gaps', 'It may widen the legal-illegal price incentive if enforcement lags', 'It ends all demand instantly', 'It lowers tax'], answer: 1, explanation: 'Public-health tax design and enforcement need to work together; this is not an argument against taxation.' },
      { question: 'Which step creates tobacco leaf stability and character after harvest?', options: ['Curing', 'Checkout', 'Underwriting', 'Coding'], answer: 0, explanation: 'Curing controls moisture and chemical changes before grading and blending.' },
      { question: 'What does price/mix mean in a declining-volume category?', options: ['Only factory speed', 'Revenue effect of pricing and portfolio composition', 'Employee mix', 'Tax evasion'], answer: 1, explanation: 'Price/mix can offset volume decline financially, subject to regulation and affordability effects.' },
      { question: 'What is the first screen for any tobacco commercial idea?', options: ['Virality', 'Legality, public-health regulation and responsible conduct', 'Celebrity reach', 'Number of colors'], answer: 1, explanation: 'This is a regulated harmful-product category; compliance and harm context precede commercial optimization.' },
    ],
    roles: [
      { name: 'Commercial Planning MT', intro: 'You will plan within unusually tight legal and ethical boundaries.', bullets: ['You will analyze legal-market volume and channel mix.', 'You will support pricing and portfolio scenarios.', 'You will check every execution against regulation.', 'You will monitor illicit-trade and competitor signals.', 'You will avoid recommendations that target minors or evade controls.'] },
      { name: 'Operations / Manufacturing MT', intro: 'You will run a high-speed, traceable and controlled process.', bullets: ['You will monitor safety, yield and quality.', 'You will manage blends, materials and changeovers.', 'You will control stamps and traceability.', 'You will reduce waste and downtime.', 'You will document deviations precisely.'] },
      { name: 'Leaf / Supply Chain MT', intro: 'You will connect agricultural variability to consistent finished product.', bullets: ['You will plan leaf grades and blends.', 'You will work with farmers and processors.', 'You will manage quality and storage conditions.', 'You will forecast materials under regulation.', 'You will strengthen traceable lawful sourcing.'] },
      { name: 'Regulatory / Corporate Affairs MT', intro: 'You will interpret policy without confusing advocacy with permission.', bullets: ['You will monitor tax and product rules.', 'You will prepare evidence and compliance guidance.', 'You will coordinate legal, operations and communications.', 'You will support anti-illicit-trade cooperation.', 'You will communicate public-health constraints accurately.'] },
    ],
    cases: [
      { company: 'Vinataba', title: 'A state incumbent in a changing policy environment', front: 'Vinataba has long held a central role in Vietnam’s legal tobacco market. It balances domestic manufacturing, agricultural links and state policy obligations. Health regulation and illicit trade constrain conventional growth logic.', story: ['Problem: the legal market operates alongside public-health goals and illicit competition.', 'Action: Vinataba maintained domestic production and distribution under state oversight.', 'Execution: tax stamps, channel control and product quality support lawful supply.', 'Result: scale persists, but policy—not only consumer competition—defines the future.', 'Lesson: regulated-market strategy must optimize lawful execution while accepting the social objective of lower harm.'], question: 'How should Vinataba improve legal-market control without stimulating consumption?' },
      { company: 'British American Tobacco Vietnam', title: 'Operating under advertising restrictions', front: 'BAT participates in Vietnam through legal manufacturing and distribution arrangements. Traditional brand-building tools are heavily restricted. Compliance, pricing and channel control therefore carry unusual weight.', story: ['Problem: mature demand and strict promotion rules limit commercial levers.', 'Action: BAT relied on portfolio, pricing, manufacturing partnerships and controlled trade execution.', 'Execution: governance is required across distributors and retail touchpoints.', 'Result: the business competes in a legal category under increasing scrutiny.', 'Lesson: in restricted categories, control failures can destroy more value than a weak campaign.'], question: 'Which non-promotional capabilities create advantage in a tightly restricted category?' },
      { company: 'JTI', title: 'Global alternatives meet local prohibition', front: 'JTI and peers invested globally in new nicotine technologies as cigarette volumes faced pressure. Vietnam chose to ban e-cigarettes and heated products from 2025. A global portfolio strategy therefore cannot simply be imported locally.', story: ['Problem: global category transition differs by national law and evidence standards.', 'Action: international firms developed alternative products in markets that permit them.', 'Execution: regulatory engagement and scientific claims became central globally.', 'Result: Vietnam’s prohibition closed that route in the local legal market.', 'Lesson: local regulation is not a rollout obstacle to work around; it defines the feasible strategy set.'], question: 'How should a global tobacco company allocate resources in a market that bans its growth category?' },
    ],
    interview: { front: 'A strong tobacco answer acknowledges harm and regulation explicitly. Treating it like ordinary FMCG is a credibility failure.', back: ['State the legal boundary first.', 'Separate public-health objectives from company economics.', 'Use lawful-market, tax and illicit-trade metrics.', 'Reject youth targeting and circumvention.'] },
    synthesis: { flow: ['Public-health objective', 'Legal framework', 'Lawful supply', 'Tax & enforcement', 'Responsible compliance'], bullets: ['Regulation defines the strategy space.', 'Illicit trade is an enforcement and tax-policy issue.', 'Commercial analysis does not erase harm.'] },
  },
];

export const INDUSTRY_SEEDS: IndustrySeed[] = [...BASE_INDUSTRY_SEEDS, ...FMCG_SUBINDUSTRY_SEEDS];

function card(seed: IndustrySeed, order: number, module: number, type: LearningCardType, title: string, front: string, back: string[], extras: Partial<LearningCard> = {}): LearningCard {
  const plan = BASE_CARD_PLAN[order - 1] || { topic: 'overview' as TopicGroupId, emoji: '📌' };
  return { id: `${seed.slug}-${String(order).padStart(2, '0')}`, industrySlug: seed.slug, order, module, topic: plan.topic, emoji: plan.emoji, type, title, front, back, ...extras };
}

const FORMULA_RULES: Array<[RegExp, string]> = [
  [/gross margin|biên lợi nhuận gộp/i, 'Gross Margin = (Revenue − COGS) / Revenue × 100%'],
  [/contribution margin|phần đóng góp/i, 'Contribution Margin = Revenue − Variable Costs'],
  [/ebitda/i, 'EBITDA = Net Income + Interest + Tax + Depreciation + Amortization'],
  [/working capital|vốn lưu động/i, 'Working Capital = Current Assets − Current Liabilities'],
  [/break-even|hòa vốn/i, 'Break-even Units = Fixed Costs / (Price per Unit − Variable Cost per Unit)'],
  [/net interest margin|\bnim\b/i, 'NIM = Net Interest Income / Average Earning Assets × 100%'],
  [/non-performing|\bnpl\b/i, 'NPL Ratio = Non-performing Loans / Total Loans × 100%'],
  [/\bcasa\b/i, 'CASA Ratio = Current & Savings Deposits / Total Deposits × 100%'],
  [/capital adequacy|\bcar\b/i, 'CAR = Regulatory Capital / Risk-weighted Assets × 100%'],
  [/cost.to.income/i, 'Cost-to-Income = Operating Expenses / Operating Income × 100%'],
  [/market share|thị phần/i, 'Market Share = Company Sales / Total Market Sales × 100%'],
  [/numeric distribution/i, 'Numeric Distribution = Outlets Carrying the SKU / Total Outlets × 100%'],
  [/weighted distribution/i, 'Weighted Distribution = Category Sales of Carrying Outlets / Total Category Sales × 100%'],
  [/rate of sale/i, 'Rate of Sale = Units Sold / Number of Outlets / Time Period'],
  [/\boee\b/i, 'OEE = Availability × Performance × Quality'],
  [/first.pass yield|yield/i, 'First-pass Yield = Good Units Without Rework / Total Units × 100%'],
  [/cycle time/i, 'Cycle Time = Total Production Time / Completed Units'],
  [/scrap/i, 'Scrap Rate = Scrapped Units or Material / Total Input × 100%'],
  [/defect rate/i, 'Defect Rate = Defective Units / Total Units × 100%'],
  [/on.time in.full|\botif\b/i, 'OTIF = Complete On-time Orders / Total Orders × 100%'],
  [/like.for.like|same.store/i, 'Like-for-like Sales Growth = (Current Comparable-store Sales − Prior Comparable-store Sales) / Prior Comparable-store Sales × 100%'],
  [/inventory turn/i, 'Inventory Turn = Annual COGS / Average Inventory'],
  [/basket size/i, 'Average Basket Size = Sales Revenue / Number of Transactions'],
  [/shrink/i, 'Shrink Rate = Inventory Loss / Recorded Inventory × 100%'],
  [/activation/i, 'Activation Rate = Activated Users / New Users × 100%'],
  [/retention/i, 'Retention Rate = Returning Cohort Users / Starting Cohort Users × 100%'],
  [/\bcac\b|acquisition cost/i, 'CAC = Sales & Marketing Spend / New Customers'],
  [/\bltv\b|lifetime value/i, 'LTV = Average Contribution per Period × Average Customer Lifetime'],
  [/take rate/i, 'Take Rate = Platform Revenue / GMV × 100%'],
  [/annual recurring|\barr\b/i, 'ARR = Monthly Recurring Revenue × 12'],
  [/utilization|load factor/i, 'Utilization = Used Capacity / Available Capacity × 100%'],
  [/project margin/i, 'Project Margin = (Project Fee − Direct Delivery Cost) / Project Fee × 100%'],
  [/win rate/i, 'Win Rate = Won Proposals / Total Qualified Proposals × 100%'],
  [/leverage/i, 'Team Leverage = Junior Delivery Staff / Senior Staff'],
  [/repeat rate/i, 'Repeat Rate = Returning Clients / Total Clients × 100%'],
  [/cost per stop|cost per shipment/i, 'Cost per Completed Unit = Total Network Cost / Completed Units'],
  [/inventory days|dwell time/i, 'Inventory Days = Average Inventory / COGS × Number of Days'],
  [/perfect order/i, 'Perfect Order Rate = Error-free, On-time, Complete Orders / Total Orders × 100%'],
  [/damage rate/i, 'Damage Rate = Damaged Shipments / Total Shipments × 100%'],
  [/loss ratio/i, 'Loss Ratio = Claims Incurred / Earned Premium × 100%'],
  [/combined ratio/i, 'Combined Ratio = Loss Ratio + Expense Ratio'],
  [/persistency/i, 'Persistency = Active Policies After Period / Policies Issued at Start × 100%'],
  [/new business value/i, 'New Business Value = Present Value of Future New-policy Profits − Cost of Required Capital'],
  [/solvency ratio/i, 'Solvency Ratio = Available Capital / Required Capital × 100%'],
  [/price.mix/i, 'Price/Mix Effect = Revenue Change Attributable to Price and Portfolio Mix'],
  [/legal.market volume|legal.market share/i, 'Legal-market Share = Taxed Legal Units / Estimated Total Consumption × 100%'],
  [/illicit.trade share/i, 'Illicit-trade Share = Estimated Illicit Units / Estimated Total Consumption × 100%'],
  [/excise incidence/i, 'Excise Incidence = Excise Tax / Retail Price or Tax Base × 100%'],
  [/conversion rate/i, 'Conversion Rate = Completed Actions / Eligible Visitors × 100%'],
  [/forecast error/i, 'Forecast Error = (Actual Demand − Forecast Demand) / Actual Demand × 100%'],
  [/service level|fill rate/i, 'Service Level = Demand Fulfilled On Time / Total Demand × 100%'],
  [/return on assets|\broa\b/i, 'ROA = Net Income / Average Total Assets × 100%'],
  [/return on equity|\broe\b/i, 'ROE = Net Income / Average Shareholders’ Equity × 100%'],
  [/return on investment|\broi\b/i, 'ROI = (Gain − Investment Cost) / Investment Cost × 100%'],
];

function withMetricFormulas(item: LearningCard): LearningCard {
  if (item.type === 'quiz') return item;
  const haystack = [item.title, item.front, ...item.back].join(' ');
  const existing = item.back.join(' ').toLowerCase();
  const formulas = FORMULA_RULES
    .filter(([pattern, formula]) => pattern.test(haystack) && !existing.includes(formula.toLowerCase()))
    .map(([, formula]) => `Formula: ${formula}`);
  return formulas.length ? { ...item, back: [...item.back, ...formulas] } : item;
}

const BEGINNER_DEFINITIONS: Array<[RegExp, string]> = [
  [/\bGMV\b/, 'Quick explanation: GMV is the total value of goods transacted on a platform, not the platform’s revenue.'],
  [/\bSKU\b/, 'Quick explanation: An SKU is a specific product code; for example, the same drink in two sizes represents two SKUs.'],
  [/\bS&OP\b/, 'Quick explanation: S&OP aligns sales, operations, and finance around a single supply-and-demand plan.'],
  [/\bP&L\b/, 'Quick explanation: A P&L is a profit-and-loss statement showing how much profit remains after costs are deducted from revenue.'],
  [/\bFDI\b/, 'Quick explanation: FDI is direct investment by a foreign company or investor.'],
  [/\bCAGR\b/, 'Quick explanation: CAGR is the average annual growth rate over multiple years.'],
  [/\b3PL\b/, 'Quick explanation: A 3PL is an external company that handles warehousing, transportation, or order fulfillment for a client.'],
  [/\bSaaS\b/, 'Quick explanation: SaaS is software customers pay a recurring fee to use over the internet.'],
  [/\bAPI\b/, 'Quick explanation: An API lets two software systems exchange data and requests.'],
  [/\bERP\b/, 'Quick explanation: An ERP system connects processes such as finance, procurement, inventory, and manufacturing.'],
  [/\bcapex\b/i, 'Quick explanation: Capex is money invested in long-lived assets such as factories, vehicles, or machinery.'],
  [/\bopex\b/i, 'Quick explanation: Opex covers recurring operating costs such as salaries, rent, and utilities.'],
  [/\bcohort\b/i, 'Quick explanation: A cohort is a group of customers who started at the same time or share characteristics, allowing their behavior to be tracked over time.'],
  [/underwriting/i, 'Quick explanation: Underwriting evaluates risk before a bank lends or an insurer provides coverage.'],
  [/provision/i, 'Quick explanation: A provision is an expense recognized in advance for a potential loss.'],
  [/reserve/i, 'Quick explanation: A reserve is money or a liability set aside for future payments.'],
  [/route.to.market/i, 'Quick explanation: Route-to-market is the path a product takes from the company through sales channels to the end customer.'],
  [/sell.in/i, 'Quick explanation: Sell-in is product sold to distributors or stores; sell-out is product actually purchased by end customers.'],
  [/working capital/i, 'Quick explanation: Working capital is cash tied up in inventory and receivables after accounting for payables.'],
  [/unit economics/i, 'Quick explanation: Unit economics tests whether a customer, order, or store generates sufficient contribution after variable costs.'],
];

function withBeginnerDefinitions(item: LearningCard): LearningCard {
  if (item.type === 'quiz') return item;
  const haystack = [item.title, item.front, ...item.back].join(' ');
  const definitions = BEGINNER_DEFINITIONS
    .filter(([pattern, definition]) => pattern.test(haystack) && !haystack.includes(definition))
    .slice(0, 2)
    .map(([, definition]) => definition);
  return definitions.length ? { ...item, back: [...item.back, ...definitions] } : item;
}

function wordCount(value: string): number {
  return value.trim() ? value.trim().split(/\s+/).length : 0;
}

function industrySubcategory(seed: IndustrySeed, item: LearningCard): LearningCard {
  if (item.topic === 'glossary' || CANONICAL_TOPIC_SET.has(item.topic)) return item;
  const text = [item.title, item.front, ...item.back].join(' ').toLowerCase();
  if (seed.slug === 'banking') {
    if (item.topic === 'banking-insurance' || /insurance|bancassurance|policyholder|premium/.test(text)) return { ...item, topic: 'banking-insurance' };
    if (item.topic === 'banking-investment' || item.topic === 'banking-capital-markets' || /investment bank|capital market|securities|brokerage|underwriting|deal|m&a/.test(text)) return { ...item, topic: 'banking-investment' };
    if (/fintech|digital|mobile|wallet|payment|qr|platform|app|fraud|cyber/.test(text)) return { ...item, topic: 'banking-fintech' };
    if (item.topic === 'banking-microfinance' || /retail|consumer|individual|card|mortgage|branch|personal|microfinance|small.ticket/.test(text)) return { ...item, topic: 'banking-retail' };
    return { ...item, topic: 'banking-commercial' };
  }
  if (seed.slug === 'tech') {
    if (item.topic === 'tech-fintech' || /fintech|payment|wallet|lending/.test(text)) return { ...item, topic: 'tech-fintech' };
    if (item.topic === 'tech-ecommerce' || /e.commerce|marketplace|seller|merchant|gmv|fulfil/.test(text)) return { ...item, topic: 'tech-ecommerce' };
    if (item.topic === 'tech-telecom' || /telecom|network|spectrum|subscriber|5g/.test(text)) return { ...item, topic: 'tech-telecom' };
    if (item.topic === 'tech-semiconductor' || /semiconductor|chip|wafer|assembly and test/.test(text)) return { ...item, topic: 'tech-semiconductor' };
    if (item.topic === 'tech-blockchain' || /blockchain|web3|distributed ledger/.test(text)) return { ...item, topic: 'tech-blockchain' };
    return { ...item, topic: 'tech-ai-ml' };
  }
  if (seed.slug === 'retail') {
    if (item.topic === 'retail-ecommerce' || /e.commerce|online|omnichannel|app|delivery|digital/.test(text)) return { ...item, topic: 'retail-ecommerce' };
    if (item.topic === 'retail-convenience' || /convenience|minimart|small.box|neighborhood/.test(text)) return { ...item, topic: 'retail-convenience' };
    if (item.topic === 'retail-department-stores' || /department|mall|concession|specialty/.test(text)) return { ...item, topic: 'retail-department-stores' };
    return { ...item, topic: 'retail-traditional-modern' };
  }
  if (seed.slug === 'industrial-manufacturing') {
    if (item.topic === 'manufacturing-automotive' || /automotive|vehicle|car|ev |vinfast/.test(text)) return { ...item, topic: 'manufacturing-automotive' };
    if (item.topic === 'manufacturing-electronics' || /electronics|semiconductor|chip|samsung|intel/.test(text)) return { ...item, topic: 'manufacturing-electronics' };
    if (item.topic === 'manufacturing-steel-materials' || /steel|metal|material|furnace|rolling/.test(text)) return { ...item, topic: 'manufacturing-steel-materials' };
    if (item.topic === 'manufacturing-chemicals' || /chemical|feedstock|batch|process safety/.test(text)) return { ...item, topic: 'manufacturing-chemicals' };
    return { ...item, topic: 'manufacturing-construction-materials' };
  }
  if (seed.slug === 'logistics') {
    if (/last.mile|parcel|rider|delivery|drop density|failed delivery/.test(text)) return { ...item, topic: 'logistics-last-mile' };
    if (/warehouse|fulfil|inventory|storage|pallet|pick|hub/.test(text)) return { ...item, topic: 'logistics-warehousing' };
    if (/freight|carrier|customs|ocean|air cargo|port|shipment|incoterm/.test(text)) return { ...item, topic: 'logistics-freight' };
    return { ...item, topic: 'logistics-planning' };
  }
  if (seed.slug === 'insurance') {
    if (/life insurance|life polic|mortality|persistency|lapse|long.duration/.test(text)) return { ...item, topic: 'insurance-life' };
    if (/non.life|health|motor|property|claim|combined ratio|loss ratio/.test(text)) return { ...item, topic: 'insurance-general' };
    if (/agent|bancassurance|distribution|customer|sales|broker|advice/.test(text)) return { ...item, topic: 'insurance-distribution' };
    return { ...item, topic: 'insurance-risk' };
  }
  if (seed.slug === 'tobacco') {
    if (/manufactur|factory|leaf|blend|yield|supply|material|pack|traceability/.test(text)) return { ...item, topic: 'tobacco-operations' };
    if (/price|portfolio|brand|volume|channel|commercial|market share|revenue/.test(text)) return { ...item, topic: 'tobacco-commercial' };
    return { ...item, topic: 'tobacco-regulation' };
  }
  return item;
}

const CANONICAL_TOPIC_IDS: TopicGroupId[] = [
  'supply-chain',
  'rnd-product',
  'finance',
  'marketing-sales',
  'people-career',
  'surprising',
];
const CANONICAL_TOPIC_SET = new Set<TopicGroupId>(CANONICAL_TOPIC_IDS);

function canonicalizeTopic(item: LearningCard): LearningCard {
  if (item.topic === 'glossary' || CANONICAL_TOPIC_SET.has(item.topic)) return item;
  const map: Partial<Record<TopicGroupId, TopicGroupId>> = {
    'economics-micro': 'marketing-sales',
    'economics-macro': 'finance',
    'economics-toolkits': 'people-career',
    'banking-retail': 'marketing-sales',
    'banking-commercial': 'marketing-sales',
    'banking-investment': 'finance',
    'banking-fintech': 'rnd-product',
    'banking-insurance': 'finance',
    'banking-capital-markets': 'finance',
    'banking-microfinance': 'marketing-sales',
    'tech-telecom': 'rnd-product',
    'tech-blockchain': 'rnd-product',
    'tech-ai-ml': 'rnd-product',
    'tech-semiconductor': 'rnd-product',
    'tech-ecommerce': 'marketing-sales',
    'tech-fintech': 'marketing-sales',
    'retail-traditional-modern': 'marketing-sales',
    'retail-ecommerce': 'marketing-sales',
    'retail-convenience': 'marketing-sales',
    'retail-department-stores': 'marketing-sales',
    'manufacturing-automotive': 'rnd-product',
    'manufacturing-electronics': 'rnd-product',
    'manufacturing-steel-materials': 'rnd-product',
    'manufacturing-chemicals': 'rnd-product',
    'manufacturing-construction-materials': 'rnd-product',
    'consulting-strategy': 'people-career',
    'consulting-management': 'people-career',
    'consulting-it': 'people-career',
    'consulting-big4': 'people-career',
    'logistics-freight': 'supply-chain',
    'logistics-warehousing': 'supply-chain',
    'logistics-last-mile': 'supply-chain',
    'logistics-planning': 'supply-chain',
    'insurance-life': 'rnd-product',
    'insurance-general': 'rnd-product',
    'insurance-distribution': 'marketing-sales',
    'insurance-risk': 'finance',
    'tobacco-operations': 'supply-chain',
    'tobacco-commercial': 'marketing-sales',
    'tobacco-regulation': 'surprising',
  };
  const topic = map[item.topic] || (item.type === 'role' ? 'people-career' : item.type === 'fact' ? 'surprising' : 'supply-chain');
  return { ...item, topic };
}

function splitLongCard(item: LearningCard): LearningCard[] {
  if (item.type === 'quiz' || wordCount([item.front, ...item.back].join(' ')) <= 190 || item.back.length < 2) return [item];
  const target = Math.ceil(item.back.reduce((sum, point) => sum + wordCount(point), 0) / 2);
  let running = 0;
  let splitAt = 1;
  for (let index = 0; index < item.back.length - 1; index += 1) {
    running += wordCount(item.back[index]);
    splitAt = index + 1;
    if (running >= target) break;
  }
  const first = item.back.slice(0, splitAt);
  const second = item.back.slice(splitAt);
  if (!second.length) return [item];
  return [
    { ...item, title: `${item.title} · Foundation`, back: first },
    {
      ...item,
      id: `${item.id}-part-2`,
      title: `${item.title} · Application`,
      front: 'The next section focuses on applying this idea in practice.',
      back: second,
    },
  ];
}

const SECTION_LABELS: Partial<Record<TopicGroupId, string>> = {
  'supply-chain': 'Supply Chain & Operations',
  'rnd-product': 'R&D & Product',
  finance: 'Finance & Investment',
  'marketing-sales': 'Marketing & Sales',
  'people-career': 'People & Career',
  surprising: 'Surprising Insights',
};

function simpleSentence(value: string, maximumWords = 28): string {
  const firstSentence = (value.match(/[^.!?]+[.!?]?/)?.[0] || value).trim();
  const words = firstSentence.split(/\s+/).filter(Boolean).slice(0, maximumWords);
  const result = words.join(' ');
  if (!result) return 'Review this practical detail.';
  return /[.!?]$/.test(result) ? result : `${result}.`;
}

function ensureSectionMinimum(seed: IndustrySeed, cards: LearningCard[], minimum = 10): LearningCard[] {
  const additions: LearningCard[] = [];
  for (const topic of CANONICAL_TOPIC_IDS) {
    const sectionCards = cards.filter((item) => item.topic === topic);
    const missing = Math.max(0, minimum - sectionCards.length);
    if (!missing) continue;
    const candidates = sectionCards.flatMap((source) => source.back
      .filter((point) => !/^(sources?|formula|công thức|giải thích nhanh):/i.test(point.trim()))
      .map((point) => ({ source, point })));
    if (!candidates.length) continue;
    for (let index = 0; index < missing; index += 1) {
      const { source, point } = candidates[index % candidates.length];
      const label = SECTION_LABELS[topic] || topic;
      additions.push({
        id: `${seed.slug}-section-min-${topic}-${String(index + 1).padStart(2, '0')}`,
        industrySlug: seed.slug,
        order: 0,
        module: source.module,
        topic,
        emoji: source.emoji,
        type: 'concept',
        title: `${source.title} · ${label} focus ${index + 1}`,
        front: simpleSentence(point),
        back: [
          simpleSentence(source.front),
          `Use this detail when making a ${label.toLowerCase()} decision in ${seed.shortLabel}.`,
        ],
      });
    }
  }
  return additions.length ? [...cards, ...additions] : cards;
}

function buildDeck(seed: IndustrySeed): LearningCard[] {
  const q = seed.quizzes;
  const base: LearningCard[] = [
    card(seed, 1, 1, 'fact', 'What this industry actually sells', seed.basics.front, seed.basics.back),
    card(seed, 2, 1, 'concept', seed.process.title, 'Follow the process from input to finished offer.', seed.process.bullets, { diagram: seed.process.flow }),
    card(seed, 3, 1, 'quiz', 'Basics check', q[0].question, [q[0].explanation], { options: q[0].options, answer: q[0].answer }),
    card(seed, 4, 2, 'fact', 'How operations really work', seed.operations.front, seed.operations.back),
    card(seed, 5, 2, 'concept', 'Value chain & where work happens', 'Trace the hand-offs where service, cost and margin are won or lost.', seed.valueChain.bullets, { diagram: seed.valueChain.flow }),
    card(seed, 6, 2, 'quiz', 'Operations check', q[1].question, [q[1].explanation], { options: q[1].options, answer: q[1].answer }),
    card(seed, 7, 3, 'fact', 'How the business makes money', seed.economics.front, seed.economics.back),
    card(seed, 8, 3, 'concept', 'Five metrics interviewers expect', 'Learn the operating language before you recommend a strategy.', seed.metrics),
    card(seed, 9, 3, 'quiz', 'Metrics check', q[2].question, [q[2].explanation], { options: q[2].options, answer: q[2].answer }),
    card(seed, 10, 3, 'quiz', 'Economics check', q[3].question, [q[3].explanation], { options: q[3].options, answer: q[3].answer }),
    ...seed.roles.map((role, index) => card(seed, 11 + index, 4, 'role', role.name, role.intro, role.bullets)),
    card(seed, 15, 4, 'quiz', 'Role reality check', q[4].question, [q[4].explanation], { options: q[4].options, answer: q[4].answer }),
    ...seed.cases.map((item, index) => card(seed, 16 + index, 5, 'case', `${item.company}: ${item.title}`, item.front, [...item.story.filter((point) => !point.startsWith('Interview question this unlocks:')), `Interview question this unlocks: ${item.question}`])),
  ];

  // Preserve the original depth-card IDs (21+) so existing learner progress remains valid.
  const depth = depthCardsFor(seed.slug).map((extra, index) => card(
    seed,
    21 + index,
    extra.module,
    extra.type,
    extra.title,
    extra.front,
    extra.back,
    {
      topic: extra.topic,
      emoji: extra.emoji,
      ...(extra.diagram ? { diagram: extra.diagram } : {}),
      ...(extra.visual && extra.type !== 'fact' ? { visual: extra.visual } : {}),
      ...(extra.options ? { options: extra.options } : {}),
      ...(extra.answer == null ? {} : { answer: extra.answer }),
    },
  ));

  const expansion = expansionCardsFor(seed.slug).map((extra) => ({
    id: `${seed.slug}-${extra.key}`,
    industrySlug: seed.slug,
    order: 0,
    module: extra.module,
    topic: extra.topic,
    emoji: extra.emoji,
    type: extra.type,
    title: extra.title,
    front: extra.front,
    back: extra.back,
  }));

  // Glossary and sub-sector chapters follow canonical topic order. Existing cards retain their IDs,
  // while display order is recalculated so every deck starts with its glossary.
  const prepared = [...base, ...depth, ...expansion]
    .filter((item) => {
      const title = item.title.toLowerCase();
      const coachingTemplate = /answer pattern|mental model|interview.ready|sounds credible|credible answer|how to answer|interview answer/.test(title);
      const overviewCard = item.topic === 'overview' || item.id.endsWith('-overview') || /: market overview$/i.test(item.title);
      return !overviewCard && !coachingTemplate;
    })
    .map((item) => ({
      ...item,
      back: item.back.filter((point) => !/^sources?:/i.test(point.trim())),
    }))
    .map(withMetricFormulas)
    .map(withBeginnerDefinitions)
    .map((item) => industrySubcategory(seed, item))
    .map(canonicalizeTopic)
    .flatMap(splitLongCard);

  return ensureSectionMinimum(seed, prepared)
    .map((item, sourceIndex) => ({ item, sourceIndex }))
    .sort((a, b) => (topicGroupOrder(a.item.topic) - topicGroupOrder(b.item.topic)) || (a.sourceIndex - b.sourceIndex))
    .map(({ item }, index) => ({ ...item, order: index + 1 }));
}

const BASIC_ECONOMICS_DECK = {
  industry: BASIC_ECONOMICS_INDUSTRY,
  cards: BASIC_ECONOMICS_CARD_SEEDS
    .map((seed, index): LearningCard => ({
      id: `basic-economics-${String(index + 1).padStart(2, '0')}`,
      industrySlug: BASIC_ECONOMICS_INDUSTRY.slug,
      order: index + 1,
      module: seed.topic === 'economics-micro' ? 1 : seed.topic === 'economics-macro' ? 2 : 3,
      topic: seed.topic as TopicGroupId,
      emoji: '',
      type: 'concept',
      title: seed.title,
      front: seed.front,
      back: seed.back,
      ...(seed.diagram ? { diagram: seed.diagram } : {}),
    }))
    .map(canonicalizeTopic)
    .flatMap(splitLongCard)
    .map((item, index) => ({ ...item, order: index + 1 })),
};

export const INDUSTRY_DECKS = [
  ...INDUSTRY_SEEDS.filter((industry) => industry.slug !== 'consulting').map((industry) => ({ industry, cards: buildDeck(industry) })),
  BASIC_ECONOMICS_DECK,
];
export const ALL_LEARNING_CARDS = INDUSTRY_DECKS.flatMap((deck) => deck.cards);

export function deckFor(slug: string) {
  return INDUSTRY_DECKS.find((deck) => deck.industry.slug === slug) || null;
}

export interface TopicSection {
  topic: TopicGroupId;
  cards: LearningCard[];
}

// A deck is never shown as one flat list: it is chaptered into topic groups in canonical order,
// and groups with no cards are dropped rather than rendered empty.
export function topicSectionsFor(slug: string): TopicSection[] {
  const deck = deckFor(slug);
  if (!deck) return [];
  const byTopic = new Map<TopicGroupId, LearningCard[]>();
  for (const item of deck.cards) {
    const bucket = byTopic.get(item.topic);
    if (bucket) bucket.push(item);
    else byTopic.set(item.topic, [item]);
  }
  const visibleTopics: TopicGroupId[] = ['glossary', ...CANONICAL_TOPIC_IDS];
  return visibleTopics.filter((topic) => (byTopic.get(topic)?.length || 0) > 0).map((topic) => ({ topic, cards: byTopic.get(topic)! }));
}
