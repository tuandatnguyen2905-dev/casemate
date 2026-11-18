import type { ReactNode } from 'react';
import { selectLessonQuestions } from './dairyQuizCore';
import { VisualView } from './fashionVisualKit';
import { applyChapterVisualText } from './chapterVisualText';
import { NAB_M3_VISUALS } from './nabM3VisualSpecs';

export interface NabModule03Source {
  title: string;
  href: string;
  publisher: string;
}

export interface NabModule03Narrative {
  label: 'What it is' | 'How it works' | 'Real-world example' | 'Why it matters';
  text: string;
}

export interface NabModule03CardData {
  title: string;
  chapterTitle: string;
  readingTime: string;
  objective: string;
  mateIntro: string;
  keyInsight: string;
  concepts: [];
  narrative: NabModule03Narrative[];
  visualKind: NabModule03VisualKind;
  visualHeading: string;
  visualIntro: string;
  statTiles?: Array<{ value?: string; label: string; subtitle?: string; description: string }>;
  keyTerms: Array<{ term: string; definition: string }>;
  recap: string[];
  chapterRecap: string;
  deepDiveTitle: string;
  body: ReactNode;
  sources: NabModule03Source[];
}

export interface NabModule03Question {
  id: string;
  question: string;
  options: Array<{ id: string; text: string }>;
  correctOptionId: string;
  explanation: string;
  moduleId: string;
  objective: string;
}

export interface NabModule03Takeaways {
  learned: string;
  keyTakeaways: string[];
  businessImplications: string;
  remember: string;
  nextLesson: string;
}

const SOURCES = {
  cokeSystem: { title: 'The Coca-Cola System', href: 'https://www.coca-colacompany.com/about-us/coca-cola-system', publisher: 'The Coca-Cola Company' },
  cokeResults: { title: 'Coca-Cola Reports Fourth Quarter and Full Year 2024 Results', href: 'https://investors.coca-colacompany.com/news-events/press-releases/detail/1128/coca-cola-reports-fourth-quarter-and-full-year-2024-results', publisher: 'The Coca-Cola Company' },
  coke10k: { title: '2024 Annual Report (Form 10-K)', href: 'https://investors.coca-colacompany.com/filings-reports/all-sec-filings/content/0000021344-25-000011/ko-20241231.htm', publisher: 'The Coca-Cola Company' },
  pepsiSuntory: { title: 'PepsiCo and Suntory Agree to Form Strategic Beverage Alliance in Vietnam', href: 'https://www.pepsico.com/newsroom/press-releases/2012/pepsico-and-suntory-agree-to-form-strategic-beverage-alliance-in-vietnam', publisher: 'PepsiCo' },
  thp: { title: 'Tan Hiep Phat — 30 years of perseverance and breakthroughs', href: 'https://vir.com.vn/', publisher: 'Vietnam Investment Review' },
  pwcSst: { title: 'New Special Sales Tax Law', href: 'https://www.pwc.com/vn/en/publications/2025/250701-new-sst-law.pdf', publisher: 'PwC Vietnam' },
  retail: { title: 'Retail Industry in Vietnam — Size, Share & Analysis', href: 'https://www.mordorintelligence.com/industry-reports/retail-industry-in-vietnam', publisher: 'Mordor Intelligence' },
  research: { title: 'Module 03 research record (row 14, module03-research-v1)', href: 'https://audos.com/', publisher: 'Casemate WorkspaceDB' },
} satisfies Record<string, NabModule03Source>;

function DeepDive({ paragraphs }: { paragraphs: string[] }) {
  return <div className="space-y-4">{paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>;
}

function chapter(input: Omit<NabModule03CardData, 'concepts'>): NabModule03CardData {
  return { ...input, concepts: [] };
}

export const NAB_MODULE03_LESSONS = [
  { title: 'Industry Business Models', description: 'Compare who owns the brand, who makes the drink, and who reaches the outlet.', takeaways: ['Business models divide control and risk differently.', 'Asset intensity changes how each participant earns.', 'A brand owner and a bottler should not be judged by the same margin lens.'] },
  { title: 'Products, Services & Segmentation', description: 'See how portfolio, positioning, pack, price, and occasion fit together.', takeaways: ['A beverage portfolio covers needs and occasions.', 'Segmentation determines where and how a product competes.', 'Price-pack architecture connects positioning with affordability.'] },
  { title: 'Customer Segments & Needs', description: 'Understand the buyer, the consumer, the occasion, and the purchase trigger.', takeaways: ['The buyer is not always the consumer.', 'Occasion often predicts the chosen format.', 'Availability can decide an impulse purchase.'] },
  { title: 'Revenue Streams & Cost Structure', description: 'Trace revenue, costs, margins, unit economics, and profitability levers.', takeaways: ['Revenue depends on the role a company plays.', 'Gross, operating, contribution, and net margin answer different questions.', 'Scale helps only when demand and route economics remain healthy.'] },
  { title: 'Distribution & Sales Channels', description: 'Compare general trade, modern trade, key accounts, foodservice, and digital routes.', takeaways: ['Each channel requires a different service model.', 'Channel cost is more than a stated margin.', 'Availability depends on relationships and execution.'] },
  { title: 'Industry Ecosystem & Stakeholders', description: 'Map the partners, regulators, and relationships surrounding every beverage company.', takeaways: ['No beverage company wins alone.', 'Stakeholders exchange products, money, data, standards, and trust.', 'Partnership quality can become a competitive capability.'] },
];

const lesson31 = [
  chapter({
    title: 'Who Actually Makes and Sells Beverages?', chapterTitle: 'Industry Business Models', readingTime: '5 min',
    objective: 'Identify the distinct roles of brand owners, concentrate producers, bottlers, distributors, and retailers.',
    mateIntro: 'Pick up a cold drink in Ho Chi Minh City. The logo is obvious; the companies behind the formula, bottle, route, cooler, and checkout are not.',
    keyInsight: 'A beverage brand is often a coordinated system of businesses, not one company doing everything.',
    narrative: [
      { label: 'What it is', text: 'The operating system behind a drink assigns brand ownership, formulation, manufacturing, distribution, and retail access to one company or several partners.' },
      { label: 'How it works', text: 'Brand owners create demand and standards. Concentrate producers protect formulas. Bottlers make finished drinks. Distributors position inventory. Retailers provide the final point of access.' },
      { label: 'Real-world example', text: 'The Coca-Cola system says the company supplies concentrates, beverage bases, and syrups while local bottling partners mix, package, and move finished beverages to market.' },
      { label: 'Why it matters', text: 'When a shelf is empty or a launch fails, the cause may sit with forecasting, production, distribution, or retail execution—not with the brand idea itself.' },
    ],
    visualKind: 'nab-m3-31-1-role-map', visualHeading: 'From brand promise to final purchase', visualIntro: 'Follow the ownership and execution hand-offs behind one finished drink.',
    keyTerms: [{ term: 'Brand owner', definition: 'The company controlling trademarks, positioning, and brand standards.' }, { term: 'Bottler', definition: 'The operator that makes, packages, and often distributes finished beverages.' }, { term: 'Route to market', definition: 'The system used to move products from production to customers and outlets.' }],
    recap: ['Different firms may own the brand, make the liquid, deliver the case, and sell the unit.', 'Each role creates a different source of value and risk.', 'Diagnose performance by locating the responsible role.'],
    chapterRecap: 'Map the role before judging the economics: the same branded bottle can contain the work of several businesses.',
    deepDiveTitle: 'Where responsibility changes hands',
    body: <DeepDive paragraphs={['A useful map separates ownership from execution. A company can own a formula without owning the local filling line, and it can own a plant without serving every small outlet directly.', 'Look for the hand-off points: concentrate to bottler, finished cases to distributor, mixed orders to outlets, and consumer payment back through the channel. These interfaces are where incentives, service levels, and information quality matter most.']} />,
    sources: [SOURCES.cokeSystem, SOURCES.research],
  }),
  chapter({
    title: 'Understanding Beverage Business Models', chapterTitle: 'Industry Business Models', readingTime: '6 min',
    objective: 'Compare vertically integrated, specialised, franchise bottling, contract manufacturing, B2B, B2C, and B2B2C models.',
    mateIntro: 'Two drinks can sit side by side at the same price while the companies behind them carry completely different factories, contracts, and risks.',
    keyInsight: 'A business model is a choice about what to own, what to partner for, and which customer pays the company directly.',
    narrative: [
      { label: 'What it is', text: 'A beverage business model combines an operating boundary with a customer path: integrated or specialised; in-house or contracted; B2B, B2C, or B2B2C.' },
      { label: 'How it works', text: 'Integrated players keep more stages under one roof. Franchise systems divide brand and concentrate from local bottling. Co-packing lets a brand rent production capacity. Most packaged beverages reach consumers through a B2B2C chain.' },
      { label: 'Real-world example', text: 'PepsiCo and Suntory formed a Vietnam alliance in which Suntory acquired 51% and PepsiCo retained 49%; the venture would bottle for both while PepsiCo retained marketing and innovation responsibilities for its brands.' },
      { label: 'Why it matters', text: 'The model determines capital needs, speed, control, partner dependence, and the kind of capability management must build.' },
    ],
    visualKind: 'nab-m3-31-2-model-compare', visualHeading: 'Four operating models compared', visualIntro: 'Compare who owns the brand, plant, and route to market.',
    keyTerms: [{ term: 'Vertical integration', definition: 'Ownership or control of multiple adjacent stages in the value chain.' }, { term: 'Franchise bottling', definition: 'A brand or concentrate owner authorises a partner to make and sell finished beverages in a territory.' }, { term: 'Co-packer', definition: 'A contract manufacturer that produces and packages drinks for another brand.' }, { term: 'B2B2C', definition: 'A company sells through another business that ultimately serves the consumer.' }],
    recap: ['Integration trades capital intensity for control.', 'Specialisation can scale expertise but increases coordination needs.', 'B2B2C is the dominant path for packaged beverages.', 'Joint ventures can combine brand, market, and operating capabilities.'],
    chapterRecap: 'There is no universally best model; the right boundary depends on capabilities, capital, control, and market access.',
    deepDiveTitle: 'Choosing the operating boundary',
    body: <DeepDive paragraphs={['Build-versus-partner decisions should be made stage by stage. Formula ownership may be strategically sensitive, while local delivery may benefit from a partner with dense routes.', 'Contract manufacturing reduces initial plant investment, but the brand still owns demand risk and must govern quality, capacity, confidentiality, and continuity through contracts and operating routines.']} />,
    sources: [SOURCES.pepsiSuntory, SOURCES.cokeSystem, SOURCES.thp],
  }),
  chapter({
    title: 'Why Different Business Models Make Money Differently', chapterTitle: 'Industry Business Models', readingTime: '6 min',
    objective: 'Explain how asset intensity, intangible ownership, volume, and channel responsibility shape beverage economics.',
    mateIntro: 'A concentrate owner can grow without adding a filling line in every market; a bottler cannot ship one more case without production and delivery capacity.',
    keyInsight: 'Profit follows the role: ownership of brands and formulas creates different economics from ownership of plants, inventory, and delivery routes.',
    narrative: [
      { label: 'What it is', text: 'A profit pool is the economic value captured by a role after accounting for the assets, costs, and risks required to perform it.' },
      { label: 'How it works', text: 'Intangible-heavy models can spread brand and formula investment across large systems. Finished-product operators carry packaging, factories, working capital, and local service. Retailers monetize shopper access and convenience.' },
      { label: 'Real-world example', text: 'Coca-Cola reported 2024 net revenue of $47.1 billion and a 21.2% GAAP operating margin at the consolidated group level. These are group figures—not a bottler benchmark—and the company separately disclosed effects from refranchising and comparability items.' },
      { label: 'Why it matters', text: 'Comparing companies without adjusting for their role can produce false conclusions about efficiency or attractiveness.' },
    ],
    visualKind: 'nab-m3-31-3-profit-pools', visualHeading: 'How value and burden shift by role', visualIntro: 'This qualitative map compares economic drivers without inventing participant margins.',
    statTiles: [{ value: '$47.1B', label: '2024 net revenue', description: 'The Coca-Cola Company, consolidated group.' }, { value: '21.2%', label: '2024 GAAP operating margin', description: 'Consolidated group; not a bottler margin.' }],
    keyTerms: [{ term: 'Asset intensity', definition: 'The amount of physical and working capital needed to operate.' }, { term: 'Profit pool', definition: 'The share of industry economic profit captured by a role or activity.' }, { term: 'Refranchising', definition: 'Transferring company-run bottling operations to franchise partners.' }],
    recap: ['Brand and formula ownership can scale across operating partners.', 'Bottlers exchange heavier assets for local manufacturing and commercial control.', 'Retail economics depend on access, traffic, and execution.', 'Never apply a concentrate-owner margin to a bottler.'],
    chapterRecap: 'Compare like with like: role, geography, accounting definition, and year must match before margins become meaningful.',
    deepDiveTitle: 'A disciplined margin comparison',
    body: <DeepDive paragraphs={['Start with the income statement definition. Gross margin sits after cost of goods sold; operating margin also absorbs operating expenses; net margin includes interest, tax, and other items. A contribution margin can be defined differently by each company.', 'Then inspect the operating perimeter. A consolidated brand owner may include some finished-goods operations, investments, and corporate costs. Use segment disclosure where available and label non-GAAP measures clearly.']} />,
    sources: [SOURCES.cokeResults, SOURCES.coke10k, SOURCES.cokeSystem],
  }),
];

const lesson32 = [
  chapter({
    title: 'Understanding Beverage Product Portfolios', chapterTitle: 'Products, Services & Segmentation', readingTime: '5 min',
    objective: 'Explain how beverage companies assemble portfolios across categories, price tiers, formats, and occasions.',
    mateIntro: 'A company does not need one drink to win every moment; it needs a portfolio where each product has a job.',
    keyInsight: 'Portfolio strategy allocates brands and formats to distinct needs rather than asking every SKU to serve everyone.',
    narrative: [
      { label: 'What it is', text: 'A beverage portfolio is the collection of categories, brands, flavours, pack sizes, and price points managed as one system.' },
      { label: 'How it works', text: 'Companies balance broad coverage with focus. Water, tea, coffee, carbonated drinks, energy, sports, juice, and functional products can address different occasions and growth priorities.' },
      { label: 'Real-world example', text: 'The Vietnam alliance announcement listed Pepsi-Cola, 7-UP, Sting, Mirinda, Tropicana Twister, Lipton, and Aquafina—multiple categories managed through one local operating platform.' },
      { label: 'Why it matters', text: 'Portfolio choices determine factory complexity, shelf competition, marketing allocation, and exposure to changing consumer needs.' },
    ],
    visualKind: 'nab-m3-32-1-portfolio-map', visualHeading: 'One portfolio, several jobs', visualIntro: 'Map products by category, occasion, and strategic role.',
    keyTerms: [{ term: 'Portfolio breadth', definition: 'The range of categories, brands, and formats a company offers.' }, { term: 'Hero product', definition: 'A priority product receiving disproportionate investment and attention.' }, { term: 'Cannibalisation', definition: 'Sales gained by one company product partly at the expense of another.' }],
    recap: ['Categories address different needs and occasions.', 'Breadth can diversify demand but adds complexity.', 'Each SKU should have a clear role.', 'Portfolio review includes growth, profit, fit, and operational burden.'],
    chapterRecap: 'A strong portfolio is a set of deliberate roles, not a collection of labels.',
    deepDiveTitle: 'Breadth, focus, and complexity',
    body: <DeepDive paragraphs={['Adding a product can reach a new occasion, defend shelf space, or create a premium tier. It can also split media, increase changeovers, add inventory, and confuse shoppers.', 'Portfolio management therefore considers incremental demand: does the new SKU recruit new consumers or occasions, or merely move existing buyers within the same company?']} />,
    sources: [SOURCES.pepsiSuntory, SOURCES.research],
  }),
  chapter({
    title: 'How Beverage Companies Segment Their Markets', chapterTitle: 'Products, Services & Segmentation', readingTime: '5 min',
    objective: 'Segment beverage demand by consumer, occasion, need, geography, channel, and price tier.',
    mateIntro: '“Young consumers” is not a usable segment until you know when they buy, what job the drink performs, and where they can reach it.',
    keyInsight: 'Useful segmentation changes a business decision: product, price, pack, message, or channel.',
    narrative: [
      { label: 'What it is', text: 'Segmentation divides a broad market into groups with meaningfully different needs, behaviour, willingness to pay, or routes to purchase.' },
      { label: 'How it works', text: 'Teams combine demographic, need-state, occasion, behavioural, geographic, channel, and price-tier lenses. The best lens depends on the decision being made.' },
      { label: 'Real-world example', text: 'A single student may buy an affordable energy drink near campus for late study, a large bottle for a family meal, and a premium functional drink after exercise.' },
      { label: 'Why it matters', text: 'Segmentation prevents a company from treating all demand as identical and makes resource allocation more precise.' },
    ],
    visualKind: 'nab-m3-32-2-segmentation-matrix', visualHeading: 'From broad audience to actionable segment', visualIntro: 'Connect who, why, when, where, and how much.',
    keyTerms: [{ term: 'Need state', definition: 'The functional or emotional job a consumer wants a product to perform.' }, { term: 'Occasion', definition: 'The context in which a beverage is chosen and consumed.' }, { term: 'Actionable segment', definition: 'A group that is identifiable, reachable, and meaningfully different for a business decision.' }],
    recap: ['Demographics alone rarely explain the full purchase.', 'Occasion and need often reveal the product job.', 'Channel and geography affect reach and format.', 'A segment is useful only if the company can act on it.'],
    chapterRecap: 'Segment for a decision, not for a decorative persona.',
    deepDiveTitle: 'Testing segment quality',
    body: <DeepDive paragraphs={['Ask four questions: Is the segment distinct? Can it be measured? Can the company reach it? Will a different offer improve results? If not, the segmentation may be descriptive but not actionable.', 'Avoid assuming that one person belongs permanently to one segment. Beverage choice changes with time, companions, budget, temperature, activity, and outlet.']} />,
    sources: [SOURCES.research, SOURCES.retail],
  }),
  chapter({
    title: 'Product Positioning, Differentiation, and Pricing', chapterTitle: 'Products, Services & Segmentation', readingTime: '6 min',
    objective: 'Connect positioning, differentiation, price tier, and price-pack architecture to a chosen segment.',
    mateIntro: 'A smaller bottle can look more expensive per litre yet be the most affordable way to buy right now.',
    keyInsight: 'Positioning defines the promise; differentiation supports it; price and pack make it accessible in a real purchase occasion.',
    narrative: [
      { label: 'What it is', text: 'Positioning is the place a product aims to occupy in the buyer’s mind relative to alternatives. Differentiation is the credible reason to choose it.' },
      { label: 'How it works', text: 'Companies combine taste, function, identity, convenience, provenance, package, and price. Price-pack architecture offers different out-of-pocket prices and usage formats without relying on one pack for every channel.' },
      { label: 'Real-world example', text: 'A small chilled can can target immediate refreshment, while a larger PET bottle from the same brand targets sharing at home. The products solve different occasions and face different channel economics.' },
      { label: 'Why it matters', text: 'Clear architecture reduces internal overlap and helps sales teams place the right product in the right outlet.' },
    ],
    visualKind: 'nab-m3-32-3-positioning-matrix', visualHeading: 'Positioning and price-pack architecture', visualIntro: 'Compare four offers using benefit and occasion rather than invented market scores.',
    keyTerms: [{ term: 'Positioning', definition: 'The intended meaning of a product relative to alternatives.' }, { term: 'Differentiation', definition: 'A relevant and credible reason a target customer should choose the product.' }, { term: 'Price-pack architecture', definition: 'A structured set of pack sizes and prices for different occasions, channels, and affordability needs.' }],
    recap: ['Positioning begins with a target and a frame of reference.', 'Differentiation must be relevant and supportable.', 'Pack size changes affordability, convenience, and channel fit.', 'Pricing architecture should reduce, not create, portfolio confusion.'],
    chapterRecap: 'The right product is a coordinated promise, pack, price, and place—not a slogan alone.',
    deepDiveTitle: 'Avoiding false differentiation',
    body: <DeepDive paragraphs={['A claim is not differentiation simply because it is written on the label. It must matter to the target, be credibly delivered, and stand apart from available alternatives.', 'Pricing should be read at several levels: shelf price, price per unit, out-of-pocket affordability, promotional price, and the value of the occasion solved.']} />,
    sources: [SOURCES.research],
  }),
];

const lesson33 = [
  chapter({
    title: 'Who Buys and Consumes Beverages?', chapterTitle: 'Customer Segments & Needs', readingTime: '5 min',
    objective: 'Distinguish shopper, payer, consumer, outlet customer, and consumption occasion.',
    mateIntro: 'A parent pays, a child consumes, a supermarket chooses the assortment, and a distributor delivers the case. Which one is the customer?',
    keyInsight: 'Beverage demand has multiple customers: the channel buys access and inventory; the shopper buys the product; the consumer experiences it.',
    narrative: [
      { label: 'What it is', text: 'Customer mapping separates the economic buyer, the person choosing, the person consuming, and the business customer serving the transaction.' },
      { label: 'How it works', text: 'Companies sell to distributors, retailers, foodservice accounts, and sometimes consumers directly. Household and individual roles can also differ.' },
      { label: 'Real-world example', text: 'A convenience chain may negotiate listings, a franchisee may order stock, a student may choose the brand, and a friend may consume it.' },
      { label: 'Why it matters', text: 'Each participant needs a different value proposition: margin and service for trade partners; relevance, affordability, and experience for consumers.' },
    ],
    visualKind: 'nab-m3-33-1-customer-map', visualHeading: 'The many customers behind one purchase', visualIntro: 'Separate channel decisions from shopper and consumer decisions.',
    keyTerms: [{ term: 'Shopper', definition: 'The person making the purchase decision at the point of sale.' }, { term: 'Consumer', definition: 'The person who uses or drinks the product.' }, { term: 'Trade customer', definition: 'A distributor, retailer, or foodservice account buying from the beverage company.' }],
    recap: ['Buyer and consumer may be different people.', 'Trade customers evaluate service and commercial value.', 'Consumers evaluate the drinking experience.', 'A complete strategy serves both channel and consumer needs.'],
    chapterRecap: 'Ask “customer for which decision?” before designing the offer.',
    deepDiveTitle: 'Two linked value propositions',
    body: <DeepDive paragraphs={['A product can be attractive to consumers but difficult for retailers if it turns slowly, requires special handling, or creates excessive assortment complexity.', 'The reverse is also true: a trade promotion can secure shelf space, but repeat sales require a consumer proposition that survives after the promotion ends.']} />,
    sources: [SOURCES.research, SOURCES.retail],
  }),
  chapter({
    title: 'What Drives Beverage Purchasing Decisions?', chapterTitle: 'Customer Segments & Needs', readingTime: '5 min',
    objective: 'Explain how taste, trust, price, health perception, convenience, availability, temperature, and occasion shape choice.',
    mateIntro: 'The preferred brand can lose when the competing bottle is colder, closer, or easier to afford.',
    keyInsight: 'Beverage choice is a fast trade-off between desire and immediate purchase conditions.',
    narrative: [
      { label: 'What it is', text: 'Purchase drivers are the functional, emotional, economic, and situational factors that move a person from preference to transaction.' },
      { label: 'How it works', text: 'Taste and brand create preference; price and pack shape affordability; availability and temperature enable action; health cues and occasion change the choice set.' },
      { label: 'Real-world example', text: 'An office worker may prefer one coffee brand but buy another because it is chilled in the nearest convenience store before a meeting.' },
      { label: 'Why it matters', text: 'Marketing cannot convert demand when the product is absent, warm, poorly displayed, or in the wrong format.' },
    ],
    visualKind: 'nab-m3-33-2-motivation-framework', visualHeading: 'Preference meets purchase reality', visualIntro: 'See how product, person, and place combine at the decision moment.',
    keyTerms: [{ term: 'Availability', definition: 'Whether the desired product can be bought in the relevant place and moment.' }, { term: 'Purchase trigger', definition: 'The immediate event or condition that prompts a transaction.' }, { term: 'Perceived value', definition: 'The buyer’s judgement of benefits relative to money, effort, and alternatives.' }],
    recap: ['Preference is necessary but not sufficient.', 'Cold availability can be part of the product experience.', 'Price matters through affordability and perceived value.', 'The occasion changes which driver leads.'],
    chapterRecap: 'Choice happens where brand meaning meets shelf reality.',
    deepDiveTitle: 'A practical decision funnel',
    body: <DeepDive paragraphs={['First, the product must enter the consideration set. Second, it must be available in the right format. Third, its value must beat the alternatives in that moment. Finally, the experience must support repeat purchase.', 'This sequence helps diagnose whether a problem is awareness, relevance, distribution, conversion, or repeat.']} />,
    sources: [SOURCES.research],
  }),
  chapter({
    title: 'Understanding Beverage Consumers in Vietnam', chapterTitle: 'Customer Segments & Needs', readingTime: '6 min',
    objective: 'Apply consumer and occasion thinking to Vietnam without treating the market as one homogeneous segment.',
    mateIntro: 'A campus kiosk, a rural family shop, and a central-city convenience store may sell the same category through three different purchase logics.',
    keyInsight: 'Vietnam is not one beverage consumer; income, city tier, channel access, age, and occasion create distinct demand patterns.',
    narrative: [
      { label: 'What it is', text: 'Vietnam consumer analysis connects local demographics and channel structure with affordability, health interest, social occasions, and convenience.' },
      { label: 'How it works', text: 'Young urban consumers may discover products digitally and buy from convenience channels, while broad reach still depends on fragmented traditional outlets. Households and individuals need different packs.' },
      { label: 'Real-world example', text: 'A student may choose an energy or ready-to-drink coffee format for study, while a household purchase may emphasise sharing, value, and trust.' },
      { label: 'Why it matters', text: 'A national strategy needs local pack, channel, and message choices rather than one assumed “Vietnam consumer.”' },
    ],
    visualKind: 'nab-m3-33-3-vietnam-segments', visualHeading: 'Vietnam consumer occasions', visualIntro: 'A qualitative framework—no invented segment sizes or shares.',
    keyTerms: [{ term: 'Premiumisation', definition: 'A shift toward products with higher perceived value and often a higher price.' }, { term: 'City tier', definition: 'A grouping of cities by size, development, and commercial characteristics.' }, { term: 'General trade', definition: 'Traditional, fragmented retail such as independent shops and market outlets.' }],
    recap: ['Consumer behaviour varies within Vietnam.', 'Urban convenience and broad traditional reach coexist.', 'Pack and price should match the outlet and occasion.', 'Use local evidence before sizing a segment.'],
    chapterRecap: 'Local relevance comes from specific consumers, occasions, and channels—not national stereotypes.',
    deepDiveTitle: 'Keeping Vietnam examples disciplined',
    body: <DeepDive paragraphs={['Use qualitative hypotheses when robust local numbers are unavailable, then validate them with company sell-out data, retailer evidence, and consumer research.', 'Do not convert an international benchmark into a Vietnam fact. Always label geography, year, category, and source before using a number in a recommendation.']} />,
    sources: [SOURCES.research, SOURCES.retail],
  }),
];

const lesson34 = [
  chapter({
    title: 'How Beverage Companies Generate Revenue', chapterTitle: 'Revenue Streams & Cost Structure', readingTime: '5 min',
    objective: 'Map product, concentrate, licensing, foodservice, vending, and contract-manufacturing revenue to the responsible business model.',
    mateIntro: 'A consumer buys one bottle, but the companies behind it may record concentrate revenue, finished-goods revenue, service revenue, or none of the retail sale.',
    keyInsight: 'Revenue recognition depends on what the company actually sells and to whom—not on the final shelf price alone.',
    narrative: [
      { label: 'What it is', text: 'A revenue stream is a recurring way a company receives consideration for products, rights, or services.' },
      { label: 'How it works', text: 'Integrated operators sell finished beverages. Brand systems may sell concentrate or syrup and license rights. Other streams include fountain supply, vending, foodservice, and co-packing.' },
      { label: 'Real-world example', text: 'The Coca-Cola system describes the company selling concentrates, beverage bases, and syrups to bottling partners, which then produce and sell finished beverages locally.' },
      { label: 'Why it matters', text: 'Revenue mix affects reported growth, gross margin, working capital, and exposure to volume or partner performance.' },
    ],
    visualKind: 'nab-m3-34-1-revenue-flow', visualHeading: 'Revenue flows through the system', visualIntro: 'Separate the consumer payment from each company’s recorded revenue.',
    keyTerms: [{ term: 'Revenue stream', definition: 'A distinct recurring source of sales or fees.' }, { term: 'Concentrate revenue', definition: 'Sales of flavour bases or syrups to authorised bottlers or customers.' }, { term: 'Co-packing revenue', definition: 'Fees earned for manufacturing and packaging another company’s products.' }],
    recap: ['Different roles record different revenue.', 'Retail sales value is not automatically brand-owner revenue.', 'Licensing and concentrate models monetize intangibles.', 'Revenue mix changes the risk and cost profile.'],
    chapterRecap: 'Follow the invoice: identify the seller, customer, product or right, and timing.',
    deepDiveTitle: 'Why system sales and company revenue differ',
    body: <DeepDive paragraphs={['A brand can influence a large amount of consumer spending while reporting only the portion earned from concentrate, syrup, finished products, or other arrangements.', 'For analysis, distinguish consumer retail value, bottler sales, and brand-owner revenue. They answer different questions and should never be added without eliminating overlaps.']} />,
    sources: [SOURCES.cokeSystem, SOURCES.coke10k],
  }),
  chapter({
    title: 'Understanding the Cost of Making and Selling Beverages', chapterTitle: 'Revenue Streams & Cost Structure', readingTime: '6 min',
    objective: 'Classify ingredient, packaging, conversion, logistics, selling, marketing, and overhead costs without inventing universal percentages.',
    mateIntro: 'The liquid may be simple, but the commercial product includes a package, a factory slot, a warehouse position, a delivery stop, a cooler, and a reason to choose it.',
    keyInsight: 'Cost structure is a system: product, package, plant, route, and demand creation all contribute to the economics.',
    narrative: [
      { label: 'What it is', text: 'A cost structure groups the resources consumed to make, move, sell, and support a beverage.' },
      { label: 'How it works', text: 'Ingredients and packaging enter cost of goods sold; conversion uses labour, utilities, maintenance, and depreciation; logistics and selling serve channels; marketing and overhead support demand and the organisation.' },
      { label: 'Real-world example', text: 'A shift from one bottle format to another can change packaging cost, line speed, changeovers, pallet density, transport, shelf presence, and consumer willingness to pay at the same time.' },
      { label: 'Why it matters', text: 'Reducing one cost can increase another, so teams should optimise total delivered economics rather than a single input price.' },
    ],
    visualKind: 'nab-m3-34-2-cost-stack', visualHeading: 'The beverage cost stack', visualIntro: 'A schematic stack, intentionally shown without unsupported percentage ranges.',
    keyTerms: [{ term: 'COGS', definition: 'Costs directly associated with producing goods sold, as defined by the company’s accounting policy.' }, { term: 'Conversion cost', definition: 'The cost of turning inputs into finished products.' }, { term: 'Cost to serve', definition: 'The resources required to sell and deliver to a customer, outlet, or channel.' }],
    recap: ['Packaging, product, conversion, and route costs interact.', 'Cost classification depends on accounting policy.', 'Channel complexity can raise cost to serve.', 'Optimise the delivered system, not one line item.'],
    chapterRecap: 'The cheapest component does not always create the lowest total cost.',
    deepDiveTitle: 'Fixed, variable, and step costs',
    body: <DeepDive paragraphs={['Ingredients and some packaging tend to move with units. Plant depreciation and salaried teams are less responsive in the short run. Delivery routes, shifts, and warehouse space can behave like step costs: stable until capacity forces another block of resources.', 'This matters for forecasts. A small volume increase may have little fixed-cost impact, while crossing a capacity threshold can require a new shift, vehicle, line, or facility.']} />,
    sources: [SOURCES.coke10k, SOURCES.research],
  }),
  chapter({
    title: 'What Determines Beverage Company Profitability?', chapterTitle: 'Revenue Streams & Cost Structure', readingTime: '7 min',
    objective: 'Distinguish gross, operating, contribution, and net margin and connect unit economics, scale, mix, price, and cost to profitability.',
    mateIntro: 'A product can have a positive contribution per case and still fail to cover the organisation built around it.',
    keyInsight: 'Profitability depends on the margin definition, the unit, the product mix, and the operating model—not one headline percentage.',
    narrative: [
      { label: 'What it is', text: 'Margins express profit at different levels. Unit economics asks what one additional unit, order, outlet, or route contributes after the relevant costs.' },
      { label: 'How it works', text: 'Price, mix, volume, input cost, productivity, marketing, and route efficiency move profit. Scale can spread fixed cost, but only if demand and complexity do not destroy the gain.' },
      { label: 'Real-world example', text: 'Coca-Cola’s 2024 results reported a 21.2% GAAP operating margin and a 30.0% comparable operating margin. The gap shows why analysts must name the measure and adjustments; neither figure should be copied onto a local bottler.' },
      { label: 'Why it matters', text: 'A clear profit bridge turns a vague “margin problem” into testable commercial and operating drivers.' },
    ],
    visualKind: 'nab-m3-34-3-profitability-waterfall', visualHeading: 'From revenue to profit', visualIntro: 'An illustrative logic waterfall with no fabricated company values.',
    statTiles: [{ value: '21.2%', label: '2024 GAAP operating margin', description: 'The Coca-Cola Company, consolidated.' }, { value: '30.0%', label: '2024 comparable operating margin', description: 'Non-GAAP; The Coca-Cola Company, consolidated.' }],
    keyTerms: [{ term: 'Gross margin', definition: 'Revenue less cost of goods sold, divided by revenue.' }, { term: 'Operating margin', definition: 'Operating income divided by revenue.' }, { term: 'Contribution margin', definition: 'Revenue less a stated set of variable or attributable costs; the exact definition must be specified.' }, { term: 'Net margin', definition: 'Net income divided by revenue.' }, { term: 'Unit economics', definition: 'Revenue and relevant costs measured for a defined unit of activity.' }],
    recap: ['Name the margin before using it.', 'Contribution margin needs an explicit cost definition.', 'Scale can spread fixed costs but can also add complexity.', 'Mix, price, and route efficiency matter alongside volume.'],
    chapterRecap: 'A useful profitability analysis reconciles metric, perimeter, geography, year, and business model.',
    deepDiveTitle: 'Building a profitability bridge',
    body: <DeepDive paragraphs={['Start with net revenue and bridge to gross profit through product and packaging costs. Then bridge to operating profit through selling, distribution, marketing, and overhead. Continue to net income only after financing, tax, and other items.', 'For a decision, define the unit: per case, per litre, per order, per outlet, or per route. Include only costs that truly change or are attributable, and label excluded fixed costs so the analysis cannot be mistaken for full profitability.']} />,
    sources: [SOURCES.cokeResults, SOURCES.coke10k],
  }),
];

const lesson35 = [
  chapter({
    title: 'General Trade vs. Modern Trade', chapterTitle: 'Distribution & Sales Channels', readingTime: '6 min',
    objective: 'Compare outlet structure, selling model, data, assortment, promotions, and service requirements in general and modern trade.',
    mateIntro: 'One supermarket agreement can cover many stores; one traditional route may require hundreds of individual outlet relationships.',
    keyInsight: 'General and modern trade are not merely store types—they require different commercial systems.',
    narrative: [
      { label: 'What it is', text: 'General trade consists of fragmented independent outlets; modern trade includes organised chains such as supermarkets and convenience stores.' },
      { label: 'How it works', text: 'General trade relies on route coverage, distributor execution, credit discipline, and frequent service. Modern trade relies more on central negotiation, listings, planograms, promotions, data, and account management.' },
      { label: 'Real-world example', text: 'A neighbourhood shop may order mixed cases from a distributor representative, while a convenience chain may negotiate assortment and promotion centrally, then replenish through its network.' },
      { label: 'Why it matters', text: 'A strategy copied from one channel can fail in the other because decision rights, order sizes, economics, and execution differ.' },
    ],
    visualKind: 'nab-m3-35-1-gt-mt-compare', visualHeading: 'General trade and modern trade', visualIntro: 'A side-by-side operating comparison without unsupported market shares.',
    keyTerms: [{ term: 'General trade', definition: 'Fragmented independent retail outlets served directly or through distributors.' }, { term: 'Modern trade', definition: 'Organised retail chains with structured procurement and store operations.' }, { term: 'Key account', definition: 'A strategically important customer managed through a coordinated commercial relationship.' }],
    recap: ['GT prioritises reach and route execution.', 'MT prioritises account planning and structured execution.', 'Data availability and negotiation differ.', 'Channel plans need different packs, promotions, and service.'],
    chapterRecap: 'Treat GT and MT as distinct operating models, not one sales channel with different signs.',
    deepDiveTitle: 'What a channel comparison should include',
    body: <DeepDive paragraphs={['Compare who decides the listing, who holds inventory, order frequency, delivery unit, payment terms, data visibility, promotional mechanism, merchandising standard, and return policy.', 'Use sourced channel shares only when the category, geography, year, and measurement basis match the decision. Broad retail estimates should not be presented as beverage volume facts.']} />,
    sources: [SOURCES.retail, SOURCES.research],
  }),
  chapter({
    title: 'B2B, Key Accounts, D2C, and E-Commerce', chapterTitle: 'Distribution & Sales Channels', readingTime: '6 min',
    objective: 'Explain when foodservice, key-account, direct-to-consumer, marketplace, and quick-commerce channels fit beverage economics.',
    mateIntro: 'Selling one bottle online can cost more to fulfil than the drink itself; selling a case, subscription, or premium bundle changes the equation.',
    keyInsight: 'A channel is attractive only when its consumer value and fulfilment economics work together.',
    narrative: [
      { label: 'What it is', text: 'Beyond broad retail, beverage companies serve foodservice and institutional buyers, manage large accounts, and reach consumers through marketplaces, quick commerce, or direct propositions.' },
      { label: 'How it works', text: 'B2B customers buy for resale or service. Key accounts coordinate volume and execution across sites. Digital channels add discovery and convenience but create picking, delivery, and platform costs.' },
      { label: 'Real-world example', text: 'A restaurant fountain agreement, a campus vending contract, a supermarket key account, and a marketplace multipack can carry the same brand through different economics.' },
      { label: 'Why it matters', text: 'Heavy, low-value single units are hard to deliver profitably; bundles, premium offers, subscriptions, or nearby inventory can improve the model.' },
    ],
    visualKind: 'nab-m3-35-2-channel-map', visualHeading: 'Routes to market beyond the shelf', visualIntro: 'Compare customer, fulfilment unit, and strategic role.',
    keyTerms: [{ term: 'D2C', definition: 'A model in which the brand sells directly to the consumer.' }, { term: 'Quick commerce', definition: 'Fast digital ordering fulfilled from inventory positioned near the customer.' }, { term: 'HoReCa', definition: 'Hotels, restaurants, and cafés as a foodservice customer group.' }],
    recap: ['B2B channels sell to organisations for service or resale.', 'Key accounts coordinate scale and standards.', 'Digital discovery does not remove physical fulfilment.', 'Bundles and premium value can improve D2C economics.'],
    chapterRecap: 'Choose channels by role and economics, not by trend alone.',
    deepDiveTitle: 'Avoiding double counting in omnichannel',
    body: <DeepDive paragraphs={['A marketplace order fulfilled by a supermarket can appear in digital demand data and the retailer’s sales. Analysts must define the channel by order origin, fulfilment, or seller of record before comparing totals.', 'Omnichannel design also needs conflict rules: assortment, price, territory, and promotion choices can strengthen or upset existing distributors and retailers.']} />,
    sources: [SOURCES.research, SOURCES.retail],
  }),
  chapter({
    title: 'Understanding Beverage Distribution Economics', chapterTitle: 'Distribution & Sales Channels', readingTime: '7 min',
    objective: 'Explain cost to serve, distributor relationships, trade promotions, working capital, and the economics of availability.',
    mateIntro: 'A route can grow revenue and still lose money if stops are sparse, orders are small, returns are high, and cash arrives late.',
    keyInsight: 'Distribution economics depend on service work and route productivity—not an assumed distributor or retailer margin.',
    narrative: [
      { label: 'What it is', text: 'Distribution economics measures the revenue, cost, cash, and service outcome of reaching customers and outlets.' },
      { label: 'How it works', text: 'Order size, drop density, distance, delivery frequency, credit, inventory, returns, cooler service, merchandising, and promotions shape cost to serve and partner returns.' },
      { label: 'Real-world example', text: 'Two outlets with equal monthly sales can have different economics if one receives full cases on a dense route and the other requires urgent small deliveries far from the depot.' },
      { label: 'Why it matters', text: 'Availability is valuable, but unprofitable service design can erode the growth it creates.' },
    ],
    visualKind: 'nab-m3-35-3-distribution-economics', visualHeading: 'The route economics equation', visualIntro: 'A qualitative driver map—no fabricated channel margin ranges.',
    keyTerms: [{ term: 'Drop size', definition: 'The quantity delivered at one customer stop.' }, { term: 'Route density', definition: 'The amount of productive demand served within a route area.' }, { term: 'Trade promotion', definition: 'A commercial incentive or activity designed to support channel stocking or consumer sales.' }, { term: 'Working capital', definition: 'Cash tied up in inventory, receivables, and payables during operations.' }],
    recap: ['Cost to serve varies by outlet and route.', 'Partner economics influence service quality.', 'Promotions need incremental sell-out, not only sell-in.', 'Availability and cash discipline must be managed together.'],
    chapterRecap: 'Distribution is economically healthy when service, partner incentive, availability, and cash reinforce one another.',
    deepDiveTitle: 'Testing a trade promotion',
    body: <DeepDive paragraphs={['Separate baseline sales from incremental sales, then account for discount, display, fees, execution cost, and post-promotion effects. A large sell-in shipment is not proof of consumer demand if inventory remains in the channel.', 'Review the relationship as well as the event: territory clarity, service levels, data sharing, payment discipline, and fair issue resolution determine whether both parties invest for the long term.']} />,
    sources: [SOURCES.research],
  }),
];

const lesson36 = [
  chapter({
    title: 'Mapping the Beverage Industry Ecosystem', chapterTitle: 'Industry Ecosystem & Stakeholders', readingTime: '6 min',
    objective: 'Map upstream suppliers, brand owners, manufacturers, channel partners, regulators, associations, and civil-society stakeholders.',
    mateIntro: 'A package redesign can involve resin or aluminium suppliers, converters, filling lines, logistics partners, retailers, recyclers, regulators, and consumers.',
    keyInsight: 'The beverage ecosystem extends beyond the value chain to every actor that supplies, enables, governs, influences, or recovers the product.',
    narrative: [
      { label: 'What it is', text: 'An ecosystem map includes commercial participants plus institutions and communities that shape permission, standards, resources, and reputation.' },
      { label: 'How it works', text: 'Suppliers provide ingredients, packaging, equipment, utilities, and services. Partners make and move products. Regulators set food, tax, trade, and environmental rules. Associations and civil society coordinate or challenge industry action.' },
      { label: 'Real-world example', text: 'A sugary-drink reformulation can connect product teams, sweetener suppliers, quality, packaging, finance, retailers, health authorities, and consumers.' },
      { label: 'Why it matters', text: 'Strategy can fail when it optimises the company while ignoring a critical external dependency or stakeholder response.' },
    ],
    visualKind: 'nab-m3-36-1-ecosystem-map', visualHeading: 'The beverage ecosystem', visualIntro: 'Place the company at the centre of commercial, institutional, and societal relationships.',
    keyTerms: [{ term: 'Ecosystem', definition: 'A network of organisations and stakeholders whose actions jointly shape an industry outcome.' }, { term: 'Industry association', definition: 'A body representing shared interests of participating companies.' }, { term: 'EPR', definition: 'Extended Producer Responsibility: policy that assigns producers responsibility for defined post-consumer product or packaging obligations.' }],
    recap: ['The ecosystem is wider than the supply chain.', 'Commercial and non-commercial actors both matter.', 'Dependencies can be physical, legal, financial, or reputational.', 'A stakeholder map should show influence and exchange.'],
    chapterRecap: 'Map everyone who can enable, constrain, or be affected by the business.',
    deepDiveTitle: 'Building a useful stakeholder map',
    body: <DeepDive paragraphs={['List stakeholders, then classify their interest, influence, dependence, and current relationship. Add the exchange: product, payment, data, licence, standard, resource, or trust.', 'Prioritisation should be issue-specific. A packaging project and a food-safety incident will produce different high-priority stakeholders even for the same company.']} />,
    sources: [SOURCES.pwcSst, SOURCES.research],
  }),
  chapter({
    title: 'How Industry Stakeholders Work Together', chapterTitle: 'Industry Ecosystem & Stakeholders', readingTime: '6 min',
    objective: 'Explain the contracts, standards, forecasts, incentives, data, audits, and forums that coordinate beverage stakeholders.',
    mateIntro: 'A contract can assign responsibility, but it cannot by itself make a forecast accurate, a quality culture strong, or a route collaborative.',
    keyInsight: 'Ecosystems work through formal agreements and repeated operating routines.',
    narrative: [
      { label: 'What it is', text: 'Stakeholder coordination is the set of governance mechanisms that aligns separate organisations around quality, supply, sales, compliance, and shared outcomes.' },
      { label: 'How it works', text: 'Contracts define rights; specifications define outputs; forecasts guide capacity; service levels define performance; audits test controls; data and review forums support correction.' },
      { label: 'Real-world example', text: 'A franchise bottling system coordinates formula and brand standards with local manufacturing and market execution while each company remains a separate operator.' },
      { label: 'Why it matters', text: 'Weak coordination creates stockouts, excess inventory, quality failures, disputes, and slow responses even when each participant is locally competent.' },
    ],
    visualKind: 'nab-m3-36-2-relationship-map', visualHeading: 'Five coordination mechanisms', visualIntro: 'See what each mechanism contributes—and what it cannot solve alone.',
    keyTerms: [{ term: 'Service-level agreement', definition: 'A documented performance expectation between parties.' }, { term: 'Specification', definition: 'A defined requirement for an input, process, product, or service.' }, { term: 'Governance', definition: 'The structures and routines used to direct, monitor, and resolve a relationship.' }],
    recap: ['Contracts allocate rights and obligations.', 'Standards and audits protect consistency.', 'Forecasts and data coordinate operations.', 'Review forums resolve issues and improve the relationship.'],
    chapterRecap: 'Good partnerships combine clear rules with strong day-to-day operating routines.',
    deepDiveTitle: 'Designing relationship governance',
    body: <DeepDive paragraphs={['Use different cadences for different decisions: daily exception handling, weekly supply reviews, monthly commercial reviews, and periodic strategic planning. Define data ownership and escalation paths before a crisis.', 'Metrics should be balanced. A distributor evaluated only on sell-in may overstock the channel; one evaluated only on inventory may under-serve growth. Include availability, sell-out, service, cash, and compliance.']} />,
    sources: [SOURCES.cokeSystem, SOURCES.pepsiSuntory],
  }),
  chapter({
    title: 'Why Partnerships and Ecosystem Relationships Matter', chapterTitle: 'Industry Ecosystem & Stakeholders', readingTime: '7 min',
    objective: 'Evaluate how partnerships improve reach, capability, resilience, compliance, and legitimacy while creating dependency and governance risk.',
    mateIntro: 'The fastest route into a market may be a partner’s route; the biggest future risk may be depending on that same partner without alternatives or shared incentives.',
    keyInsight: 'Partnerships create advantage when complementary capabilities and incentives are stronger together than apart.',
    narrative: [
      { label: 'What it is', text: 'A strategic partnership combines capabilities or access that would be slower, riskier, or less effective to build independently.' },
      { label: 'How it works', text: 'Partners can contribute brands, local knowledge, production, distribution, technology, recycling capacity, or stakeholder trust. Governance manages the resulting dependence.' },
      { label: 'Real-world example', text: 'The Suntory–PepsiCo Vietnam alliance combined shared management and local bottling with PepsiCo’s retained marketing and innovation responsibility for its brand portfolio.' },
      { label: 'Why it matters', text: 'Partnership quality affects speed, resilience, innovation, compliance, and access—capabilities that can become a competitive moat.' },
    ],
    visualKind: 'nab-m3-36-3-partnership-value', visualHeading: 'Partnership value and risk', visualIntro: 'Balance complementary capability against dependency and governance needs.',
    statTiles: [{ value: '8%', label: 'Sugary-drink SST from 1 Jan 2027', description: 'Qualifying beverages above 5g sugar per 100ml; regulated exclusions apply.' }, { value: '10%', label: 'Sugary-drink SST from 1 Jan 2028', description: 'Vietnam’s enacted roadmap, as summarised by PwC Vietnam.' }],
    keyTerms: [{ term: 'Complementary capability', definition: 'A strength one party contributes that improves the combined system.' }, { term: 'Dependency risk', definition: 'Exposure created when a critical outcome relies on another party.' }, { term: 'Legitimacy', definition: 'Stakeholder acceptance that a company’s actions are appropriate and trustworthy.' }],
    recap: ['Partnerships can accelerate access and capability.', 'Dependency needs alternatives and governance.', 'Policy change requires cross-functional and ecosystem response.', 'Trust is an operating asset, not only a reputation message.'],
    chapterRecap: 'Partnership advantage comes from complementary strengths, aligned incentives, and disciplined governance.',
    deepDiveTitle: 'A partnership evaluation checklist',
    body: <DeepDive paragraphs={['Define the shared outcome, each party’s contribution, decision rights, investment, data, performance metrics, issue escalation, and exit conditions. Then test whether incentives remain aligned under stress.', 'Vietnam’s sugary-drink tax roadmap illustrates ecosystem interdependence. Companies need product, finance, legal, supplier, channel, and consumer coordination; the 8% and 10% rates apply only to the qualifying scope and should not be generalised to all beverages.']} />,
    sources: [SOURCES.pepsiSuntory, SOURCES.pwcSst],
  }),
];

export const NAB_MODULE03_DECKS: Record<string, NabModule03CardData[]> = {
  'Industry Business Models': lesson31,
  'Products, Services & Segmentation': lesson32,
  'Customer Segments & Needs': lesson33,
  'Revenue Streams & Cost Structure': lesson34,
  'Distribution & Sales Channels': lesson35,
  'Industry Ecosystem & Stakeholders': lesson36,
};

applyChapterVisualText(NAB_MODULE03_DECKS, NAB_M3_VISUALS);

type VisualMode = 'flow' | 'compare' | 'table' | 'network' | 'waterfall';
interface VisualData {
  title: string;
  subtitle: string;
  mode: VisualMode;
  headers?: string[];
  rows: Array<{ label: string; detail: string; value?: string }>;
  takeaway: string;
}

const VISUALS = {
  'nab-m3-31-1-role-map': { title: 'Who Does What?', subtitle: 'A typical multi-company beverage system', mode: 'flow', rows: [{ label: 'Brand & formula', detail: 'Positioning, trademarks, standards, concentrate' }, { label: 'Bottling', detail: 'Blend, fill, package, quality release' }, { label: 'Distribution', detail: 'Inventory, routes, outlet service' }, { label: 'Retail & foodservice', detail: 'Availability, presentation, transaction' }], takeaway: 'The consumer sees one brand; the operating system may include several businesses.' },
  'nab-m3-31-2-model-compare': { title: 'Business Model Comparison', subtitle: 'Ownership and operating boundaries', mode: 'table', headers: ['Model', 'Usually owned', 'Core trade-off'], rows: [{ label: 'Vertically integrated', detail: 'Brand, plant, often route', value: 'More control; more capital' }, { label: 'Franchise bottling', detail: 'Brand/formula separated from local bottling', value: 'Scale; coordination' }, { label: 'Co-packing', detail: 'Brand owned; production contracted', value: 'Speed; partner dependence' }, { label: 'Specialist supplier', detail: 'One capability or input', value: 'Expertise; narrower value pool' }], takeaway: 'What a company owns determines what it must fund, govern, and execute.' },
  'nab-m3-31-3-profit-pools': { title: 'Economic Drivers by Role', subtitle: 'Qualitative comparison—not margin estimates', mode: 'table', headers: ['Role', 'Value driver', 'Main burden'], rows: [{ label: 'Brand/concentrate owner', detail: 'IP, demand, system scale', value: 'Brand and innovation investment' }, { label: 'Bottler', detail: 'Local production and sales', value: 'Plant, packaging, working capital' }, { label: 'Distributor', detail: 'Reach and service density', value: 'Inventory, credit, route execution' }, { label: 'Retailer', detail: 'Access and shopping convenience', value: 'Space, labour, stock risk' }], takeaway: 'Do not compare profitability without matching the participant role.' },
  'nab-m3-32-1-portfolio-map': { title: 'Portfolio Jobs', subtitle: 'Different products serve different strategic roles', mode: 'network', rows: [{ label: 'Recruit', detail: 'Bring new consumers or occasions' }, { label: 'Scale', detail: 'Drive broad volume and reach' }, { label: 'Premiumise', detail: 'Offer higher perceived value' }, { label: 'Defend', detail: 'Protect a category or channel position' }, { label: 'Experiment', detail: 'Test an emerging need' }], takeaway: 'Every SKU should have a clear consumer and business job.' },
  'nab-m3-32-2-segmentation-matrix': { title: 'Actionable Segmentation', subtitle: 'Five questions turn an audience into a decision', mode: 'table', headers: ['Lens', 'Question', 'Decision changed'], rows: [{ label: 'Who', detail: 'Which person or household?', value: 'Message and offer' }, { label: 'Why', detail: 'Which need state?', value: 'Benefit' }, { label: 'When', detail: 'Which occasion?', value: 'Format' }, { label: 'Where', detail: 'Which channel and geography?', value: 'Route' }, { label: 'How much', detail: 'Which affordability or price tier?', value: 'Pack and price' }], takeaway: 'A segment is useful when it changes action.' },
  'nab-m3-32-3-positioning-matrix': { title: 'Positioning Architecture', subtitle: 'Illustrative offers by benefit and occasion', mode: 'table', headers: ['Offer', 'Primary promise', 'Typical occasion'], rows: [{ label: 'Everyday refreshment', detail: 'Familiar taste and access', value: 'Meal or impulse' }, { label: 'Hydration', detail: 'Simple functional job', value: 'Daily or active' }, { label: 'Energy/focus', detail: 'Immediate functional benefit', value: 'Study or work' }, { label: 'Premium/functional', detail: 'Distinctive experience or claim', value: 'Treat or targeted need' }], takeaway: 'Position, pack, price, and place should tell one coherent story.' },
  'nab-m3-33-1-customer-map': { title: 'One Purchase, Several Customers', subtitle: 'The roles surrounding the transaction', mode: 'flow', rows: [{ label: 'Brand customer', detail: 'Distributor, retailer, or foodservice account' }, { label: 'Shopper', detail: 'Chooses and pays at the point of sale' }, { label: 'Consumer', detail: 'Experiences the drink' }, { label: 'Influencer', detail: 'Shapes the choice without buying' }], takeaway: 'Define whose decision you are trying to influence.' },
  'nab-m3-33-2-motivation-framework': { title: 'Purchase Motivation Framework', subtitle: 'Preference must survive the purchase moment', mode: 'network', rows: [{ label: 'Desire', detail: 'Taste, brand, identity, health perception' }, { label: 'Affordability', detail: 'Price, pack, promotion, budget' }, { label: 'Access', detail: 'Nearby, visible, in stock, cold' }, { label: 'Occasion', detail: 'Meal, work, exercise, social, home' }], takeaway: 'The winning choice combines relevance with immediate feasibility.' },
  'nab-m3-33-3-vietnam-segments': { title: 'Vietnam Occasion Map', subtitle: 'Qualitative hypotheses to validate locally', mode: 'table', headers: ['Context', 'Likely need', 'Commercial implication'], rows: [{ label: 'Campus / study', detail: 'Affordable energy or refreshment', value: 'Single serve; nearby access' }, { label: 'Urban commute', detail: 'Convenience and portability', value: 'Chilled availability' }, { label: 'Household meal', detail: 'Sharing and value', value: 'Larger or multipack formats' }, { label: 'Active occasion', detail: 'Hydration or recovery', value: 'Functional clarity' }, { label: 'Social / gifting', detail: 'Presentation and shared experience', value: 'Pack design and seasonality' }], takeaway: 'Validate the consumer, occasion, and channel before sizing any opportunity.' },
  'nab-m3-34-1-revenue-flow': { title: 'Who Records Which Revenue?', subtitle: 'A simplified transaction chain', mode: 'flow', rows: [{ label: 'Brand/concentrate owner', detail: 'Concentrate, syrup, licensing, selected finished goods' }, { label: 'Bottler', detail: 'Finished beverages sold into local channels' }, { label: 'Distributor', detail: 'Resale and service to outlets' }, { label: 'Retailer', detail: 'Final transaction with shopper' }], takeaway: 'Consumer spending and one company’s reported revenue are not the same measure.' },
  'nab-m3-34-2-cost-stack': { title: 'Cost Structure Map', subtitle: 'Schematic categories, not universal percentages', mode: 'table', headers: ['Cost block', 'Typical contents', 'Key driver'], rows: [{ label: 'Product & package', detail: 'Ingredients, container, closure, label', value: 'Formula and format' }, { label: 'Conversion', detail: 'Labour, utilities, maintenance, depreciation', value: 'Scale and line efficiency' }, { label: 'Logistics', detail: 'Warehouse, transport, handling', value: 'Distance and density' }, { label: 'Commercial', detail: 'Sales, merchandising, trade activity', value: 'Channel model' }, { label: 'Brand & overhead', detail: 'Marketing, people, systems, governance', value: 'Strategy and organisation' }], takeaway: 'A package or channel decision can move several cost blocks at once.' },
  'nab-m3-34-3-profitability-waterfall': { title: 'Illustrative Profitability Waterfall', subtitle: 'Logic only—no fabricated values', mode: 'waterfall', rows: [{ label: 'Net revenue', detail: 'Price × volume, net of defined deductions' }, { label: 'Less: product & package', detail: 'Direct product costs' }, { label: 'Equals: gross profit', detail: 'Before operating expenses' }, { label: 'Less: route, selling, marketing, overhead', detail: 'Operating resources' }, { label: 'Equals: operating profit', detail: 'Before financing and tax' }, { label: 'Then: interest, tax, other items', detail: 'Bridge toward net income' }], takeaway: 'Always label the profit level and the costs included.' },
  'nab-m3-35-1-gt-mt-compare': { title: 'GT vs. MT Operating Models', subtitle: 'How the commercial work differs', mode: 'table', headers: ['Dimension', 'General trade', 'Modern trade'], rows: [{ label: 'Outlet structure', detail: 'Many independent stores', value: 'Organised chains' }, { label: 'Selling', detail: 'Route and distributor led', value: 'Central account plus stores' }, { label: 'Orders', detail: 'Smaller and frequent', value: 'Structured replenishment' }, { label: 'Data', detail: 'Often less standardised', value: 'More centralised' }, { label: 'Execution', detail: 'Coverage and relationship', value: 'Listing, planogram, promotion' }], takeaway: 'Each channel needs its own service, data, and commercial model.' },
  'nab-m3-35-2-channel-map': { title: 'Channel Map', subtitle: 'Different routes solve different jobs', mode: 'table', headers: ['Route', 'Customer', 'Best-fit role'], rows: [{ label: 'Foodservice / B2B', detail: 'Restaurant, hotel, institution', value: 'Occasion access and contracts' }, { label: 'Key account', detail: 'Large organised customer', value: 'Scale and coordinated execution' }, { label: 'Marketplace', detail: 'Digital shopper via platform', value: 'Discovery and assortment' }, { label: 'Quick commerce', detail: 'Digital shopper, nearby fulfilment', value: 'Speed and convenience' }, { label: 'D2C', detail: 'Consumer buys from brand', value: 'Data, premium or bundle' }], takeaway: 'Channel fit depends on the value proposition and fulfilment unit.' },
  'nab-m3-35-3-distribution-economics': { title: 'Distribution Economics', subtitle: 'Drivers of a healthy route', mode: 'network', rows: [{ label: 'Revenue quality', detail: 'Repeat sell-out, mix, price, returns' }, { label: 'Route productivity', detail: 'Drop size, density, distance, frequency' }, { label: 'Partner return', detail: 'Fair reward for capital and service' }, { label: 'Cash', detail: 'Inventory, receivables, payment discipline' }, { label: 'Availability', detail: 'In-stock, cold, visible, correctly priced' }], takeaway: 'Growth is durable when route, partner, cash, and shopper economics all work.' },
  'nab-m3-36-1-ecosystem-map': { title: 'Stakeholder Ecosystem', subtitle: 'Actors that enable, govern, or influence the business', mode: 'network', rows: [{ label: 'Suppliers', detail: 'Ingredients, packaging, equipment, utilities' }, { label: 'Operating partners', detail: 'Bottlers, co-packers, logistics, distributors' }, { label: 'Customers', detail: 'Retail, foodservice, institutions, consumers' }, { label: 'Government', detail: 'Food safety, tax, trade, environment' }, { label: 'Associations & society', detail: 'Industry coordination, community, NGOs' }, { label: 'Recovery system', detail: 'Collectors, recyclers, EPR partners' }], takeaway: 'The company depends on relationships beyond its legal boundary.' },
  'nab-m3-36-2-relationship-map': { title: 'How Stakeholders Coordinate', subtitle: 'Five mechanisms for one operating system', mode: 'table', headers: ['Mechanism', 'What it aligns', 'Failure if weak'], rows: [{ label: 'Contracts', detail: 'Rights and obligations', value: 'Disputes and ambiguity' }, { label: 'Specifications', detail: 'Required output', value: 'Quality inconsistency' }, { label: 'Forecasts & data', detail: 'Capacity and inventory', value: 'Stockouts or excess' }, { label: 'Incentives & metrics', detail: 'Effort and priorities', value: 'Local optimisation' }, { label: 'Reviews & escalation', detail: 'Learning and correction', value: 'Slow unresolved issues' }], takeaway: 'Formal rules and operating routines must reinforce each other.' },
  'nab-m3-36-3-partnership-value': { title: 'Partnership Value vs. Risk', subtitle: 'A balanced relationship test', mode: 'compare', rows: [{ label: 'Value created', detail: 'Reach, capability, speed, resilience, legitimacy' }, { label: 'Risk introduced', detail: 'Dependency, conflict, data exposure, uneven investment' }, { label: 'Governance needed', detail: 'Decision rights, metrics, escalation, exit rules' }, { label: 'Evidence of health', detail: 'Shared outcomes, fair economics, reliable execution' }], takeaway: 'Complementary capability becomes advantage only when incentives and governance hold.' },
} satisfies Record<string, VisualData>;

export type NabModule03VisualKind = keyof typeof VISUALS;

function VisualTable({ data }: { data: VisualData }) {
  const headers = data.headers ?? ['Topic', 'Explanation', 'Implication'];
  return <div className="overflow-x-auto rounded-xl border border-slate-200"><table className="w-full min-w-[620px] border-collapse text-left"><thead className="bg-red-600 text-white"><tr>{headers.map((header) => <th key={header} className="px-4 py-3 text-xs font-black">{header}</th>)}</tr></thead><tbody>{data.rows.map((row, index) => <tr key={row.label} className={index % 2 ? 'bg-slate-50' : 'bg-white'}><th className="px-4 py-3 text-xs font-black text-slate-900">{row.label}</th><td className="px-4 py-3 text-xs leading-5 text-slate-600">{row.detail}</td><td className="px-4 py-3 text-xs font-bold leading-5 text-red-600">{row.value ?? '—'}</td></tr>)}</tbody></table></div>;
}

function VisualFlow({ data }: { data: VisualData }) {
  return <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{data.rows.map((row, index) => <div key={row.label} className="relative rounded-xl border border-slate-200 bg-white p-4"><span className="text-[10px] font-black uppercase tracking-[0.14em] text-red-600">Step {index + 1}</span><p className="mt-2 text-sm font-black text-slate-900">{row.label}</p><p className="mt-1 text-xs leading-5 text-slate-500">{row.detail}</p>{index < data.rows.length - 1 ? <span className="absolute -right-2 top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-red-600 px-1.5 py-0.5 text-xs font-black text-white lg:block">→</span> : null}</div>)}</div>;
}

function VisualNetwork({ data }: { data: VisualData }) {
  return <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{data.rows.map((row, index) => <div key={row.label} className={`rounded-xl border p-4 ${index === 0 ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}`}><p className="text-sm font-black text-slate-900">{row.label}</p><p className="mt-1 text-xs leading-5 text-slate-500">{row.detail}</p></div>)}</div>;
}

function VisualWaterfall({ data }: { data: VisualData }) {
  return <div className="space-y-2">{data.rows.map((row, index) => <div key={row.label} className={`rounded-xl border px-4 py-3 ${row.label.startsWith('Equals') ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}`} style={{ marginLeft: `${Math.min(index, 4) * 3}%`, marginRight: `${Math.min(index, 4) * 3}%` }}><p className="text-xs font-black text-slate-900">{row.label}</p><p className="mt-1 text-[11px] leading-4 text-slate-500">{row.detail}</p></div>)}</div>;
}

export function renderNabModule03Visual(kind: NabModule03VisualKind): ReactNode {
  const visual = NAB_M3_VISUALS[kind];
  return visual ? <VisualView spec={visual.spec} /> : null;
}

interface QuizSeed { chapter: '1' | '2' | '3'; objective: string; question: string; application: string; correct: string; wrong: [string, string, string]; explanation: string }
const optionIds = ['a', 'b', 'c', 'd'];
function pairedQuiz(prefix: string, seeds: QuizSeed[]): NabModule03Question[] {
  const pairs = seeds.map((seed, seedIndex) => [seed.question, seed.application].map((question, pairIndex) => {
    const rotation = (seedIndex + pairIndex) % 4;
    const raw = [seed.correct, ...seed.wrong];
    const rotated = raw.slice(rotation).concat(raw.slice(0, rotation));
    return { id: `${prefix}-${seedIndex + 1}${pairIndex ? 'b' : 'a'}`, question, options: rotated.map((text, index) => ({ id: optionIds[index], text })), correctOptionId: optionIds[rotated.indexOf(seed.correct)], explanation: seed.explanation, moduleId: seed.chapter, objective: seed.objective };
  }) as [NabModule03Question, NabModule03Question]);
  return selectLessonQuestions(pairs, seeds.map((seed) => seed.chapter));
}

const q31 = pairedQuiz('nab-31', [
  { chapter: '1', objective: 'Identify beverage-system roles', question: 'Which participant commonly turns concentrate into packaged finished beverages?', application: 'A company mixes approved base with local inputs, fills bottles, and releases cases. Which role is it?', correct: 'Bottler', wrong: ['Retailer', 'Industry association', 'Media agency'], explanation: 'The bottler manufactures and packages the finished drink and may also distribute it.' },
  { chapter: '1', objective: 'Identify beverage-system roles', question: 'What value does a retailer add at the final stage?', application: 'A cold bottle is visible beside a checkout when a shopper wants it. Which role created this access?', correct: 'Proximity, presentation, and transaction access', wrong: ['Concentrate formulation', 'Primary packaging manufacture', 'Food-safety legislation'], explanation: 'Retailers create final availability and access to the transaction.' },
  { chapter: '1', objective: 'Diagnose responsibility', question: 'Why should an analyst map roles before diagnosing a stockout?', application: 'Brand demand is strong but shelves are empty. What should the team identify first?', correct: 'Which hand-off or participant failed', wrong: ['Only the logo colour', 'Only the formula owner', 'Only the consumer segment'], explanation: 'Forecasting, production, allocation, delivery, and shelf execution may sit with different participants.' },
  { chapter: '2', objective: 'Compare operating models', question: 'What best describes vertical integration?', application: 'A producer owns the recipe, plant, filling lines, and local distribution. Which model fits?', correct: 'Control of multiple adjacent value-chain stages', wrong: ['Retail-only specialisation', 'Consumer subscription only', 'Independent regulation'], explanation: 'Vertical integration places several adjacent stages under one organisation or control system.' },
  { chapter: '2', objective: 'Compare operating models', question: 'What does a co-packer provide?', application: 'A new brand wants production without building a factory. Which partner should it seek?', correct: 'Contract manufacturing and packaging capacity', wrong: ['National tax authority', 'Final consumer demand', 'Trademark registration only'], explanation: 'A co-packer makes and packages products for another brand under agreed specifications.' },
  { chapter: '2', objective: 'Distinguish customer paths', question: 'What does B2B2C mean in packaged beverages?', application: 'A brand sells through a distributor and retailer before reaching the drinker. Which path is this?', correct: 'Business to business to consumer', wrong: ['Brand to bottler only', 'Buyer to buyer only', 'Bottler to government only'], explanation: 'The brand serves the consumer through one or more business intermediaries.' },
  { chapter: '2', objective: 'Evaluate partnership structures', question: 'What did the PepsiCo–Suntory Vietnam alliance combine?', application: 'One partner retained brand marketing and innovation while the venture bottled locally. What is this an example of?', correct: 'Complementary brand and operating capabilities', wrong: ['A consumer-only subscription', 'A retailer merger', 'A packaging tax'], explanation: 'The structure joined shared local bottling management with PepsiCo brand responsibilities.' },
  { chapter: '3', objective: 'Explain model economics', question: 'Why can a concentrate-owner model be less asset intensive?', application: 'A company owns brand and formula while partners own many local plants. Which burden is shifted?', correct: 'Much of local finished-product manufacturing and distribution', wrong: ['All brand investment', 'All quality governance', 'All consumer demand risk'], explanation: 'Partners carry local plant, inventory, and route assets, although the brand owner retains important responsibilities.' },
  { chapter: '3', objective: 'Compare like with like', question: 'Why should Coca-Cola group margin not be applied to a local bottler?', application: 'A candidate uses a consolidated brand-owner percentage as a bottler benchmark. What is wrong?', correct: 'The roles, assets, and reporting perimeter differ', wrong: ['Margins can never be compared', 'Bottlers record no revenue', 'Annual reports have no operating data'], explanation: 'A valid comparison must match business model, perimeter, geography, year, and metric.' },
  { chapter: '3', objective: 'Interpret profitability measures', question: 'What must be stated with any margin figure?', application: 'A slide says “margin 21.2%” with no label. What information is missing first?', correct: 'The margin definition, company perimeter, geography, and year', wrong: ['The bottle colour only', 'The founder’s preference', 'The number of social posts'], explanation: 'Margin meaning depends on its accounting level and the entity and period measured.' },
]);

const q32 = pairedQuiz('nab-32', [
  { chapter: '1', objective: 'Explain portfolio strategy', question: 'What makes a beverage portfolio strategically coherent?', application: 'A company reviews many SKUs. Which test best identifies whether each belongs?', correct: 'Each product has a clear consumer and business role', wrong: ['Every SKU uses the same pack', 'Every product has the same price', 'Every product targets everyone'], explanation: 'A portfolio is coherent when products have deliberate roles across needs, occasions, and economics.' },
  { chapter: '1', objective: 'Explain portfolio trade-offs', question: 'What is a risk of excessive portfolio breadth?', application: 'A plant adds many slow SKUs with frequent line switches. What problem may result?', correct: 'Operational complexity and diluted investment', wrong: ['Automatic consumer loyalty', 'Elimination of inventory', 'Guaranteed premium pricing'], explanation: 'Breadth can split marketing, increase changeovers, and raise inventory complexity.' },
  { chapter: '1', objective: 'Assess incremental demand', question: 'What is cannibalisation?', application: 'A new flavour mostly takes buyers from the company’s old flavour. What occurred?', correct: 'One company product displaced another', wrong: ['A supplier raised price', 'A retailer opened a store', 'A regulator changed tax'], explanation: 'Cannibalisation occurs when one offer gains partly at the expense of another from the same company.' },
  { chapter: '2', objective: 'Build actionable segments', question: 'When is a market segment actionable?', application: 'A team names a group but cannot reach it differently. What is missing?', correct: 'A meaningful decision the company can change', wrong: ['A longer segment name', 'A national stereotype', 'A universal product'], explanation: 'An actionable segment is identifiable, reachable, and linked to a different offer or action.' },
  { chapter: '2', objective: 'Use occasion segmentation', question: 'Why can one person belong to several beverage segments?', application: 'A student buys water after exercise and coffee while studying. What explains the shift?', correct: 'Needs and occasions change', wrong: ['Demographics changed overnight', 'The retailer owns the consumer', 'Segmentation is impossible'], explanation: 'Occasion and need state can change even when the person does not.' },
  { chapter: '2', objective: 'Select segmentation lenses', question: 'Which lens is most direct when choosing a pack for a family meal?', application: 'The team needs a sharing format. Which segmentation input should lead?', correct: 'Consumption occasion and household need', wrong: ['Factory age only', 'Corporate tax only', 'Supplier nationality only'], explanation: 'The occasion and group need directly inform format and quantity.' },
  { chapter: '2', objective: 'Avoid weak segmentation', question: 'Why is “young people” often insufficient as a segment?', application: 'A brief targets all Gen Z with one drink. What should the team add?', correct: 'Need, occasion, behaviour, channel, and affordability', wrong: ['Only more adjectives', 'Only factory capacity', 'Only national GDP'], explanation: 'Age alone rarely specifies the job, route, or offer.' },
  { chapter: '3', objective: 'Connect positioning and differentiation', question: 'What is the purpose of product positioning?', application: 'A team defines the meaning it wants a product to hold versus alternatives. What is it doing?', correct: 'Choosing a distinct place in the target customer’s mind', wrong: ['Setting only factory speed', 'Selecting only tax treatment', 'Replacing distribution'], explanation: 'Positioning defines the intended comparative meaning of the offer.' },
  { chapter: '3', objective: 'Explain price-pack architecture', question: 'What does price-pack architecture coordinate?', application: 'A brand offers a small impulse can and a larger sharing bottle. Which capability is this?', correct: 'Pack size, out-of-pocket price, occasion, and channel', wrong: ['One price for every use', 'Only ingredient sourcing', 'Only advertising frequency'], explanation: 'PPA aligns formats and price points with affordability and occasion.' },
  { chapter: '3', objective: 'Evaluate differentiation', question: 'When is a claimed benefit credible differentiation?', application: 'A label makes a promise that buyers value and the product can prove. What does that create?', correct: 'A relevant, supportable reason to choose', wrong: ['Automatic market leadership', 'Guaranteed retailer listing', 'No need for availability'], explanation: 'Differentiation must matter to the target and be credibly delivered.' },
]);

const q33 = pairedQuiz('nab-33', [
  { chapter: '1', objective: 'Distinguish customer roles', question: 'Who is the consumer?', application: 'A parent buys a multipack and a child drinks one unit. Who is the consumer?', correct: 'The person who uses or drinks the product', wrong: ['Always the person who pays', 'Always the retailer', 'Always the distributor'], explanation: 'The consumer experiences the product, while shopper and payer may be different.' },
  { chapter: '1', objective: 'Distinguish customer roles', question: 'What does a trade customer typically value?', application: 'A retailer evaluates whether to list a new beverage. Which concern is most relevant?', correct: 'Consumer demand plus service, stock, and commercial value', wrong: ['Formula secrecy alone', 'Only the founder story', 'Only global market size'], explanation: 'Trade partners need an offer that sells and can be served economically.' },
  { chapter: '1', objective: 'Connect channel and consumer value', question: 'Why must a beverage strategy serve both trade and consumers?', application: 'Consumers like a drink but stores find it slow and difficult to handle. What is the risk?', correct: 'The product may lose availability despite consumer appeal', wrong: ['The formula becomes illegal', 'All shoppers become distributors', 'Marketing expense disappears'], explanation: 'Sustained access requires value for the channel as well as the consumer.' },
  { chapter: '2', objective: 'Explain purchase drivers', question: 'Which factor converts preference into an immediate impulse purchase?', application: 'A student likes a brand but it is not chilled or stocked nearby. What failed?', correct: 'Availability in the right condition', wrong: ['Annual-report length', 'Plant ownership alone', 'Industry-association membership'], explanation: 'Preference cannot convert if the product is absent or unsuitable for the occasion.' },
  { chapter: '2', objective: 'Explain purchase drivers', question: 'What does perceived value compare?', application: 'A shopper weighs benefit against price, effort, and alternatives. What is this judgement?', correct: 'Expected benefits relative to total sacrifice', wrong: ['Only the production cost', 'Only the shelf label colour', 'Only distributor inventory'], explanation: 'Perceived value is a buyer judgement, not a cost-accounting figure.' },
  { chapter: '2', objective: 'Diagnose the purchase funnel', question: 'What should be checked after awareness but before repeat?', application: 'Many consumers know a product but few buy it. Which stage deserves investigation?', correct: 'Relevance, availability, affordability, and conversion', wrong: ['Only post-purchase loyalty', 'Only supplier audits', 'Only tax filing'], explanation: 'Awareness must pass through consideration and purchase conditions before repeat can occur.' },
  { chapter: '2', objective: 'Connect occasion to choice', question: 'Why can the same consumer choose different drinks in one day?', application: 'Water follows exercise; coffee follows lunch. What changed?', correct: 'The occasion and desired job', wrong: ['The consumer’s age', 'The legal definition of revenue', 'The bottler’s accounting year'], explanation: 'Different occasions activate different needs and choice criteria.' },
  { chapter: '3', objective: 'Apply Vietnam consumer thinking', question: 'Why should analysts avoid describing one “Vietnam consumer”?', application: 'A national plan assumes identical income, channel access, and occasions. What is the flaw?', correct: 'Consumer contexts vary by geography, income, age, and channel', wrong: ['Vietnam has no beverage demand', 'All consumers buy online', 'All retailers are supermarkets'], explanation: 'The market contains multiple contexts requiring specific evidence and choices.' },
  { chapter: '3', objective: 'Apply Vietnam channel context', question: 'What can coexist in Vietnam’s beverage market?', application: 'A team sees urban convenience growth and broad independent retail. Which conclusion is best?', correct: 'Modern convenience and traditional reach can both matter', wrong: ['One must make the other disappear immediately', 'Only D2C matters', 'Channel choice never affects packs'], explanation: 'Different channels serve different geographies, occasions, and consumers.' },
  { chapter: '3', objective: 'Use evidence responsibly', question: 'What should accompany any consumer statistic used for Vietnam?', application: 'A global number is placed on a Vietnam slide. What must the analyst verify?', correct: 'Geography, year, category, method, and source', wrong: ['Only font size', 'Only brand colour', 'Only the presenter’s confidence'], explanation: 'International benchmarks are not Vietnam facts without matching scope and evidence.' },
]);

const q34 = pairedQuiz('nab-34', [
  { chapter: '1', objective: 'Map revenue streams', question: 'What does a concentrate owner commonly sell to bottlers?', application: 'A partner receives flavour base and authorised system inputs. What revenue stream is involved?', correct: 'Concentrate, beverage base, or syrup', wrong: ['Retail shelf space', 'Consumer wages', 'Government licences'], explanation: 'Brand systems can earn by supplying controlled concentrate, bases, or syrups.' },
  { chapter: '1', objective: 'Distinguish system sales and company revenue', question: 'Why is retail sales value not automatically brand-owner revenue?', application: 'A shopper pays a store for a bottle. Can the full payment be assigned to the concentrate owner?', correct: 'Several channel participants sell the product and record different amounts', wrong: ['The brand owner receives the full shelf price of every unit', 'Retailers pass all of their sales revenue back to the brand owner', 'Excise tax is the only difference between the two figures'], explanation: 'Retail value, bottler sales, distributor sales, and brand-owner revenue are different measures.' },
  { chapter: '1', objective: 'Identify alternative revenue streams', question: 'What is co-packing revenue?', application: 'A plant makes another company’s drink using spare capacity. What does it earn?', correct: 'Manufacturing and packaging fees', wrong: ['Consumer tax receipts', 'Retail rent only', 'Trademark ownership automatically'], explanation: 'A co-packer earns for producing and packaging another brand’s products.' },
  { chapter: '2', objective: 'Classify beverage costs', question: 'Which cost block includes containers, closures, and labels?', application: 'A team redesigns PET, cap, and label specifications. Which block changes first?', correct: 'Packaging cost', wrong: ['Interest expense only', 'Consumer income', 'Corporate tax only'], explanation: 'Containers, closures, and labels are packaging inputs.' },
  { chapter: '2', objective: 'Evaluate total cost', question: 'Why can the cheapest package fail to create the lowest total cost?', application: 'A container is cheaper but slows the line and reduces pallet density. What should the team compare?', correct: 'Total delivered system cost', wrong: ['Purchase price only', 'Advertising reach only', 'Tax rate only'], explanation: 'Package choice can affect conversion, logistics, waste, and consumer value.' },
  { chapter: '2', objective: 'Understand cost behaviour', question: 'What is a step cost?', application: 'Volume crosses a threshold and requires another shift and vehicle. What cost behaviour is this?', correct: 'Cost stays stable within a range then jumps', wrong: ['Cost falls to zero', 'Cost always tracks every unit exactly', 'Cost is unrelated to operations'], explanation: 'Step costs increase in blocks when capacity thresholds are crossed.' },
  { chapter: '2', objective: 'Explain cost to serve', question: 'What most directly raises channel cost to serve?', application: 'A customer needs tiny urgent deliveries far from the depot. What happens?', correct: 'Service resources per unit increase', wrong: ['Formula ownership increases', 'The consumer becomes the bottler', 'Gross margin definition changes'], explanation: 'Small drops, distance, frequency, and complexity can raise service cost per unit.' },
  { chapter: '3', objective: 'Distinguish margins', question: 'What does operating margin measure?', application: 'An analyst divides operating income by revenue. Which metric is this?', correct: 'Operating margin', wrong: ['Gross margin', 'Net margin', 'Market share'], explanation: 'Operating margin is operating income divided by revenue.' },
  { chapter: '3', objective: 'Distinguish margins', question: 'Why must contribution margin be defined explicitly?', application: 'Two teams report different contribution margins for one SKU. What likely differs?', correct: 'Which variable or attributable costs they included', wrong: ['The product name only', 'The legal drinking age', 'The number of retailers nationally'], explanation: 'Contribution margin is not meaningful until included and excluded costs are stated.' },
  { chapter: '3', objective: 'Explain scale economics', question: 'When can more volume fail to improve profit?', application: 'Sales grow through distant low-drop routes and many slow SKUs. What may offset scale?', correct: 'Complexity and cost to serve', wrong: ['All fixed costs disappear', 'Brand value becomes irrelevant', 'Revenue is never recorded'], explanation: 'Scale helps when fixed resources spread faster than complexity and service costs grow.' },
]);

const q35 = pairedQuiz('nab-35', [
  { chapter: '1', objective: 'Compare GT and MT', question: 'What most distinguishes general trade?', application: 'A route serves many independent neighborhood stores. Which channel is this?', correct: 'Fragmented outlets and route-based execution', wrong: ['One national buyer only', 'Consumer subscription only', 'Factory procurement only'], explanation: 'General trade consists of many independent outlets requiring coverage and local relationships.' },
  { chapter: '1', objective: 'Compare GT and MT', question: 'What most distinguishes modern trade?', application: 'A chain negotiates listings centrally and shares structured store data. Which channel is this?', correct: 'Organised accounts with structured procurement and execution', wrong: ['Ingredient farming', 'Contract filling only', 'Government regulation'], explanation: 'Modern trade uses coordinated buying and store systems.' },
  { chapter: '1', objective: 'Adapt channel plans', question: 'Why should promotions differ between GT and MT?', application: 'A team copies a chain-wide planogram promotion into independent stores. What did it ignore?', correct: 'Different decision rights, execution, and service models', wrong: ['All drinks use water', 'Every outlet has identical data', 'Channels never influence execution'], explanation: 'Channel mechanics determine how a promotion is sold, placed, and measured.' },
  { chapter: '2', objective: 'Compare alternative channels', question: 'What is a key-account model?', application: 'One commercial team coordinates assortment and promotion across a large chain. Which model fits?', correct: 'Dedicated management of a strategically important customer', wrong: ['Direct ingredient sourcing only', 'Consumer taxation', 'Factory maintenance'], explanation: 'Key accounts coordinate a high-value customer relationship across sites and functions.' },
  { chapter: '2', objective: 'Assess D2C fit', question: 'Why can single-unit beverage D2C be difficult?', application: 'One low-priced bottle requires picking and last-mile delivery. What is the challenge?', correct: 'Fulfilment cost can exceed the available value pool', wrong: ['The drink cannot be packaged', 'Consumers cannot buy online', 'Brands cannot own websites'], explanation: 'Heavy low-value units can be uneconomic without bundles, premium value, or efficient fulfilment.' },
  { chapter: '2', objective: 'Understand digital fulfilment', question: 'What distinguishes quick commerce?', application: 'A digital order is fulfilled rapidly from nearby inventory. Which model is this?', correct: 'Fast local fulfilment of digitally placed demand', wrong: ['Ocean freight', 'Concentrate licensing', 'National tax collection'], explanation: 'Quick commerce combines digital ordering with proximate inventory and fast delivery.' },
  { chapter: '2', objective: 'Avoid omnichannel double counting', question: 'Why must channel definitions specify order origin or seller of record?', application: 'An online order fulfilled by a supermarket appears in two datasets. What is the risk?', correct: 'Double counting the same transaction', wrong: ['Understating factory capacity only', 'Changing the formula', 'Eliminating consumer demand'], explanation: 'The same sale can be classified by digital origin and physical retailer unless the basis is clear.' },
  { chapter: '3', objective: 'Explain route economics', question: 'What is route density?', application: 'A truck serves many productive stops in a compact area. Which advantage is this?', correct: 'More useful demand served within the route area', wrong: ['Higher concentrate strength', 'More national regulation', 'Longer payment terms automatically'], explanation: 'Density can improve vehicle and labour productivity.' },
  { chapter: '3', objective: 'Evaluate trade promotions', question: 'What is the strongest evidence that a trade promotion worked?', application: 'A distributor bought extra stock, but stores have not sold it. What is still missing?', correct: 'Incremental consumer sell-out after full promotion cost', wrong: ['Sell-in volume alone', 'A larger warehouse only', 'A new invoice format'], explanation: 'A promotion creates value when incremental sell-out and economics exceed its full cost.' },
  { chapter: '3', objective: 'Manage partner economics', question: 'Why do distributor relationships affect availability?', application: 'A partner receives unclear territory rules and weak service economics. What may happen?', correct: 'Investment and service quality may decline', wrong: ['The beverage formula changes automatically', 'Consumer income rises', 'Packaging becomes weightless'], explanation: 'Partners invest in inventory, people, credit, and routes when incentives and governance support them.' },
]);

const q36 = pairedQuiz('nab-36', [
  { chapter: '1', objective: 'Map ecosystem actors', question: 'How is an ecosystem broader than a value chain?', application: 'A map adds regulators, recyclers, associations, and communities to suppliers and channels. What is it mapping?', correct: 'All actors that enable, govern, influence, or are affected', wrong: ['Only physical product movement', 'Only company employees', 'Only retail prices'], explanation: 'An ecosystem includes commercial and non-commercial stakeholders.' },
  { chapter: '1', objective: 'Map ecosystem exchanges', question: 'What should a stakeholder map show besides names?', application: 'A diagram lists organisations but no connections. What should be added?', correct: 'Influence, dependence, and what each party exchanges', wrong: ['Only logo size', 'Only founding year', 'Only office location'], explanation: 'The useful insight is the relationship: product, money, data, licence, standard, resource, or trust.' },
  { chapter: '1', objective: 'Understand EPR', question: 'What is Extended Producer Responsibility?', application: 'A producer must address defined post-consumer packaging obligations. Which policy concept applies?', correct: 'Producer responsibility for specified end-of-life outcomes', wrong: ['Retail price control', 'Consumer subscription', 'Bottling franchise only'], explanation: 'EPR assigns producers defined responsibility for post-consumer products or packaging.' },
  { chapter: '2', objective: 'Explain coordination mechanisms', question: 'What do specifications primarily align?', application: 'A supplier and bottler agree measurable material requirements. Which mechanism is this?', correct: 'The required characteristics of an output', wrong: ['Consumer age only', 'National market size', 'Retail traffic only'], explanation: 'Specifications define what an input, process, product, or service must meet.' },
  { chapter: '2', objective: 'Explain coordination mechanisms', question: 'Why are forecasts shared with partners?', application: 'A bottler needs suppliers and distributors to plan capacity and stock. What supports this?', correct: 'Demand and supply coordination', wrong: ['Trademark ownership', 'Tax collection only', 'Consumer segmentation only'], explanation: 'Forecasts help separate organisations plan capacity, materials, inventory, and service.' },
  { chapter: '2', objective: 'Design balanced governance', question: 'What is a risk of evaluating a distributor only on sell-in?', application: 'A partner maximises shipments into the channel regardless of store sales. What may result?', correct: 'Excess inventory and weak sell-out quality', wrong: ['Perfect consumer demand', 'No working capital', 'Automatic product innovation'], explanation: 'Metrics can drive local optimisation unless balanced with availability, sell-out, cash, and compliance.' },
  { chapter: '2', objective: 'Use escalation effectively', question: 'What is the purpose of an escalation path?', application: 'An operational issue cannot be resolved at the working level. What should governance provide?', correct: 'A defined route to timely higher-level resolution', wrong: ['A new consumer segment', 'A replacement for all contracts', 'A way to hide data'], explanation: 'Escalation prevents critical issues from remaining unresolved.' },
  { chapter: '3', objective: 'Evaluate partnerships', question: 'When does a partnership create strategic value?', application: 'One party has a brand and another has trusted local distribution. Why combine?', correct: 'Their complementary capabilities improve the joint outcome', wrong: ['They remove all governance needs', 'They guarantee identical incentives', 'They eliminate market risk'], explanation: 'Partnerships create value when complementary strengths outperform separate action.' },
  { chapter: '3', objective: 'Manage dependency risk', question: 'What reduces dependency risk in a critical partnership?', application: 'A company relies on one partner for a vital input. What should it establish?', correct: 'Governance, contingency options, and clear exit or recovery plans', wrong: ['Less information', 'No performance metrics', 'One verbal promise only'], explanation: 'Critical dependencies need visibility, alternatives, and agreed responses.' },
  { chapter: '3', objective: 'Interpret Vietnam tax scope', question: 'Which statement correctly describes Vietnam’s sugary-drink SST roadmap?', application: 'A slide applies the rate to all beverages. How should it be corrected?', correct: '8% from 2027 and 10% from 2028 for qualifying drinks above 5g sugar per 100ml, with exclusions', wrong: ['10% immediately for every beverage', '8% only for bottled water', 'No enacted scope or roadmap'], explanation: 'PwC summarises the enacted rates and qualifying sugar threshold, with regulated exclusions.' },
]);

export const NAB_MODULE03_QUIZZES: Record<string, NabModule03Question[]> = {
  'Industry Business Models': q31,
  'Products, Services & Segmentation': q32,
  'Customer Segments & Needs': q33,
  'Revenue Streams & Cost Structure': q34,
  'Distribution & Sales Channels': q35,
  'Industry Ecosystem & Stakeholders': q36,
};

export const NAB_MODULE03_TAKEAWAYS: Record<string, NabModule03Takeaways> = {
  'Industry Business Models': { learned: 'You can identify beverage-system roles, compare operating models, and explain why their economics differ.', keyTakeaways: ['One brand can coordinate several separate businesses.', 'Integration, franchising, and co-packing trade control against capital and dependence.', 'B2B2C is the dominant packaged-beverage path.', 'Margin comparisons must match the participant role.'], businessImplications: 'Companies should own stages where control or distinctive capability matters and govern partners where local scale or expertise is stronger.', remember: 'Map the role before judging the return.', nextLesson: 'Products, Services & Segmentation' },
  'Products, Services & Segmentation': { learned: 'You can connect portfolio roles, market segments, positioning, and price-pack architecture.', keyTakeaways: ['Every SKU needs a consumer and business job.', 'Actionable segments change a decision.', 'Occasion and need can be more useful than age alone.', 'Position, pack, price, and place must align.'], businessImplications: 'Portfolio growth should add incremental demand or strategic coverage without creating avoidable complexity.', remember: 'Segment for action; build the offer as one coherent system.', nextLesson: 'Customer Segments & Needs' },
  'Customer Segments & Needs': { learned: 'You can separate customer roles, explain purchase drivers, and apply the framework to varied Vietnam contexts.', keyTakeaways: ['Shopper, payer, consumer, and trade customer may differ.', 'Preference converts only when access and affordability work.', 'Occasion changes the choice criteria.', 'Vietnam examples require locally scoped evidence.'], businessImplications: 'Winning plans serve both channel partners and end consumers at a specific purchase moment.', remember: 'Choice happens where brand meaning meets shelf reality.', nextLesson: 'Revenue Streams & Cost Structure' },
  'Revenue Streams & Cost Structure': { learned: 'You can trace revenue, classify costs, distinguish margins, and build a disciplined profitability bridge.', keyTakeaways: ['Follow the invoice to identify revenue.', 'Optimise total delivered cost, not one component.', 'Name the margin and included costs.', 'Scale works only when mix and service economics remain healthy.'], businessImplications: 'Decision quality improves when revenue, cost, unit, and operating perimeter are explicitly defined.', remember: 'Metric, perimeter, geography, year, and model must match.', nextLesson: 'Distribution & Sales Channels' },
  'Distribution & Sales Channels': { learned: 'You can compare channel operating models and explain route, promotion, partner, and working-capital economics.', keyTakeaways: ['GT and MT require different systems.', 'Digital demand still needs physical fulfilment.', 'Trade promotions should be judged on incremental sell-out.', 'Healthy distribution balances availability, route productivity, partner return, and cash.'], businessImplications: 'Channel strategy should assign a clear role and service model to each route rather than chasing reach at any cost.', remember: 'Availability is an operating and economic outcome.', nextLesson: 'Industry Ecosystem & Stakeholders' },
  'Industry Ecosystem & Stakeholders': { learned: 'You can map ecosystem actors, explain coordination mechanisms, and evaluate partnership value and risk.', keyTakeaways: ['The ecosystem is wider than the value chain.', 'Contracts, standards, data, incentives, and reviews coordinate separate firms.', 'Partnerships combine complementary capabilities.', 'Dependency requires governance and contingency planning.'], businessImplications: 'Relationship design can become a durable capability in reach, resilience, compliance, and innovation.', remember: 'Complementary strengths create value only when incentives and governance hold.', nextLesson: 'Back to Module 03 lesson list' },
};
