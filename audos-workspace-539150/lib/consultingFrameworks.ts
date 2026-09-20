/**
 * consultingFrameworks.ts — Consulting Toolkit: the full 43-framework library
 * for MT and consulting interviews, written in English for 3rd/final-year students.
 *
 * SOURCE: the 43-framework list on fourweekmba.com/consulting-frameworks/ was
 * used only to CHOOSE which frameworks belong in this set. All explanations,
 * application steps, worked examples, and common mistakes are written fresh for
 * the Vietnamese business context — no wording copied from any source.
 *
 * The library holds exactly 43 frameworks: the 15 interview classics that were
 * already here (Profitability, MECE, Issue Tree, Porter 5 Forces, BCG, 4Cs,
 * 4Ps, SWOT, McKinsey 7-S, Value Chain, Market Sizing, Market Entry, Ansoff,
 * Cost-Benefit/NPV, Pricing Strategies) plus 28 added from the FourWeekMBA
 * list. Source rows that share a URL or concept are folded into ONE entry
 * rather than duplicated: Speed-vs-Reversibility lives inside Asymmetric
 * Betting, Problem-Solution Fit inside Product-Market Fit, Revenue Modeling
 * inside the Revenue Streams Matrix, and the Business Modeling / Web3
 * templates inside the Tech Business Model Template; Market Expansion is
 * covered jointly by Market Entry and Business Scaling.
 *
 * Each framework's diagram is described as DATA (see FrameworkDiagram) and
 * drawn by components/ConsultingToolkit.tsx with SVG/CSS — no static images,
 * so diagrams stay sharp and follow the space theme automatically.
 */

export type FrameworkDiagram =
  /** Branching tree: root → level-1 branches → level-2 children. */
  | { kind: 'tree'; root: string; branches: Array<{ label: string; children: string[] }> }
  /** 2×2 matrix. Four cells in order: top-left, top-right, bottom-left, bottom-right. */
  | {
      kind: 'matrix';
      xLabel: string;
      yLabel: string;
      xLow: string;
      xHigh: string;
      yLow: string;
      yHigh: string;
      cells: Array<{ label: string; note: string }>;
    }
  /** Hub and spokes: one centre with nodes radiating around it. */
  | { kind: 'hub'; center: string; nodes: Array<{ label: string; note: string }> }
  /** Chevron chain of primary activities, with a support-activity band above. */
  | { kind: 'chevrons'; support: string[]; primary: string[] }
  /** A whole split exhaustively into non-overlapping parts. */
  | { kind: 'partition'; whole: string; parts: string[] }
  /** Two funnels side by side (top-down and bottom-up). */
  | { kind: 'funnels'; left: { title: string; steps: string[] }; right: { title: string; steps: string[] } }
  /** Pillars standing side by side. */
  | { kind: 'pillars'; pillars: Array<{ label: string; note: string }> }
  /** Numbered sequential steps. */
  | { kind: 'stages'; stages: Array<{ label: string; note: string }> }
  /** Cash flow by year: positive/negative bars around the zero axis. */
  | { kind: 'cashflow'; periods: Array<{ label: string; value: number }>; note: string };

export interface FrameworkExample {
  title: string;
  paragraphs: string[];
}

export interface ConsultingFramework {
  id: string;
  /** Display name shown on the card. */
  name: string;
  /** Canonical English name — the exact name students meet in the interview room. */
  nameEn: string;
  /** Category for quick filtering. */
  category: string;
  /** One-line summary. */
  summary: string;
  /** When to use it: which interview question types trigger this framework. */
  whenToUse: string;
  /** Sample interviewer questions — also serve as search keywords. */
  triggers: string[];
  /** 3–5 application steps, numbered when displayed. */
  steps: string[];
  example: FrameworkExample;
  mistakes: string[];
  diagram: FrameworkDiagram;
  tags: string[];
}

export const FRAMEWORK_CATEGORIES: Array<{ id: string; label: string }> = [
  { id: 'all', label: 'All' },
  { id: 'structuring', label: 'Problem structuring' },
  { id: 'profitability', label: 'Profitability' },
  { id: 'market', label: 'Market' },
  { id: 'competition', label: 'Competition' },
  { id: 'strategy', label: 'Strategy' },
  { id: 'growth', label: 'Growth' },
  { id: 'bizmodel', label: 'Business models' },
  { id: 'innovation', label: 'Product & Innovation' },
  { id: 'operations', label: 'Operations' },
  { id: 'organization', label: 'Organization' },
  { id: 'pricing', label: 'Pricing & Investment' },
];

export const CONSULTING_FRAMEWORKS: ConsultingFramework[] = [
  {
    id: 'profitability-tree',
    name: 'Profitability Framework (revenue tree – cost tree)',
    nameEn: 'Profitability Framework',
    category: 'profitability',
    summary:
      'Split profit into a revenue branch and a cost branch, then drill down until you reach the exact number causing the problem.',
    whenToUse:
      'Whenever the prompt says profit is falling, margins are thinning, or the business wants to raise profit. This is the first framework to reach for when you hear the word “profit”.',
    triggers: [
      'Our client’s profit fell 20% in two years — why?',
      'Revenue is growing but profit isn’t — what is going on?',
      'How do we raise profit by 15% within 12 months?',
    ],
    steps: [
      'Write the root equation: Profit = Revenue − Costs. Don’t guess at causes before the equation is on the page.',
      'Split revenue into Price × Volume, then split volume again by product line, channel, region, or customer segment.',
      'Split costs into fixed and variable, then track each as a SHARE of revenue year by year — not in absolute terms, since costs naturally rise when revenue rises.',
      'Compare each branch over time or against competitors to find the one moving abnormally. That is where the problem lives.',
      'Quantify the gap: if that branch returned to its old level, how much profit comes back? That number is the size of the opportunity.',
    ],
    example: {
      title: 'A Ho Chi Minh City coffee chain loses its margin',
      paragraphs: [
        'A 120-store coffee chain grew revenue from 780 to 1,020 billion VND in two years, yet operating profit fell from 109 to 71 billion VND. Since the revenue branch is clearly rising, we park it and focus on the cost tree.',
        'Tracking costs as a share of revenue shows COGS steady around 34%, but rent climbing from 18% to 24% and staff costs from 21% to 24%. One layer deeper: every store opened in the past two years sits on a prime-location lease costing nearly twice as much, while per-store revenue is only about 15% higher.',
        'The conclusion: the problem isn’t operations but site-selection criteria. If the new stores hit the old cohort’s 18% rent-to-revenue ratio, profit would rise by roughly 61 billion VND — enough to restore the previous margin.',
      ],
    },
    mistakes: [
      'Jumping straight to a hypothesis (“must be input prices”) before the tree is built — the interviewer grades structure, not luck.',
      'Comparing costs in absolute terms instead of as a share of revenue, which makes every cost line look like it is rising.',
      'Digging both branches equally deep. When the data already shows revenue growing well, say explicitly that you are parking that branch and why.',
      'Stopping at naming the problem branch without quantifying the gap in money.',
    ],
    diagram: {
      kind: 'tree',
      root: 'Profit',
      branches: [
        { label: 'Revenue', children: ['Price', 'Volume', 'Product mix', 'Channel mix'] },
        { label: 'Costs', children: ['Variable costs', 'Fixed costs', 'Selling costs', 'Overheads'] },
      ],
    },
    tags: ['profit', 'margin', 'costs', 'revenue', 'profitability'],
  },
  {
    id: 'mece',
    name: 'MECE Principle',
    nameEn: 'MECE Principle',
    category: 'structuring',
    summary:
      'Split a problem into groups that don’t overlap and that together cover everything — nothing extra, nothing missing.',
    whenToUse:
      'Applies to EVERY structure you say out loud in the interview room. MECE isn’t a standalone framework for answering a question — it is the quality bar for every other framework.',
    triggers: [
      'Structure this problem for me.',
      'What are the ways to grow revenue?',
      'Which factors would you consider?',
    ],
    steps: [
      'Pick ONE segmentation criterion per layer (by geography, by channel, by customer, by time...). Mixing criteria within one layer is the number-one cause of overlaps.',
      'Check mutual exclusivity: could any data point fall into two groups at once? If so, your criteria are mixed.',
      'Check collective exhaustiveness: does any data point belong to no group? If so, add a group or a clearly defined “other” bucket.',
      'Keep each layer to 2–4 branches. More and the listener can’t follow; fewer usually means you haven’t split enough.',
      'Say the segmentation criterion out loud before listing the branches — the fastest way to show the interviewer you have real structure.',
    ],
    example: {
      title: 'Segmenting Vietnam’s drinking-milk market for a growth question',
      paragraphs: [
        'A candidate is asked how Vinamilk should grow its drinking-milk business and answers: grow in supermarkets, among young consumers, in the North, and through plant-based milk. It sounds comprehensive but isn’t MECE: a young Hanoian buying plant-based milk in a supermarket belongs to all four groups at once.',
        'The fix is one criterion for the first layer. Choosing “source of growth” gives three non-overlapping branches: sell more to current customers, win customers from competitors, and reach people not yet using the product. Together they cover every possible way to grow volume.',
        'Only at the second layer do you switch criteria. Inside the win-from-competitors branch, for example, split geographically into North, Central, and South — still a single criterion within that layer. This two-layer structure is far tighter than the original list of four, and takes under twenty seconds to say.',
      ],
    },
    mistakes: [
      'Mixing several segmentation criteria in one layer — the most common mistake, and interviewers spot it instantly.',
      'Listing a long string of disconnected points and calling it a structure. A list is not a structure.',
      'Forcing everything into perfect MECE at the cost of time. MECE is a tool for thinking clearly, not a formal-logic exam.',
      'Forgetting to state the segmentation criterion, so the listener can’t see the logic behind the branches.',
    ],
    diagram: {
      kind: 'partition',
      whole: 'Total incremental volume available',
      parts: ['Sell more to current customers', 'Win customers from competitors', 'Reach people not yet using the product'],
    },
    tags: ['MECE', 'structure', 'logic', 'segmentation', 'structuring'],
  },
  {
    id: 'issue-tree',
    name: 'Issue Tree / Logic Tree',
    nameEn: 'Issue Tree / Logic Tree',
    category: 'structuring',
    summary:
      'Break a big question into smaller, data-testable questions until every branch can be answered with a single calculation.',
    whenToUse:
      'When the prompt is vague or too big to answer directly and you need an analysis roadmap. This is the core tool for the opening of every case.',
    triggers: [
      'Why are our sales falling?',
      'Should we invest in this project?',
      'What is the root cause of this problem?',
    ],
    steps: [
      'Write the core question at the root of the tree, as a yes/no question or a very specific “why” question.',
      'Split into 2–4 MECE branches. For a diagnostic question use a cause tree; for a decision question use a criteria tree.',
      'Keep digging until every leaf becomes a question answerable with one number or one specific fact.',
      'Flag which branch to dig first — the one most likely to hold the problem and the easiest to test. Say why it gets priority.',
      'As data arrives, prune eliminated branches and say so out loud, so the interviewer sees you narrowing rather than wandering.',
    ],
    example: {
      title: 'Why are orders falling at an e-commerce marketplace?',
      paragraphs: [
        'A Vietnamese e-commerce marketplace sees orders down 18% year on year. The root question at the top of the tree: why are orders down 18%? The first layer splits on a simple identity: Orders = Buyers × Orders per buyer. That single split already halves the problem space.',
        'Digging the buyers branch gives three children: fewer new users, existing users churning, or existing users pausing. Digging orders-per-buyer gives two: lower purchase frequency, or fewer product categories bought per person.',
        'The data shows new users are steady while repeat customers’ frequency fell from 2.4 to 1.8 orders a month. The tree eliminated three branches within a minute and pointed exactly where to dig next: what changed for existing customers — delivery fees, delivery times, or promotions?',
      ],
    },
    mistakes: [
      'Building the tree too deep up front and getting lost in twigs, instead of going broad first and then choosing where to go deep.',
      'Creating branches with no way to test them with data — every leaf must be answerable with a number.',
      'Digging every branch equally. A good consultant says which branch they are skipping, and why.',
      'Not updating the tree as new data lands, so the rest of the case drifts away from the structure you presented.',
    ],
    diagram: {
      kind: 'tree',
      root: 'Why are orders down 18%?',
      branches: [
        {
          label: 'Fewer buyers',
          children: ['Fewer new users', 'Existing users churned', 'Existing users paused'],
        },
        { label: 'Fewer orders per buyer', children: ['Lower purchase frequency', 'Fewer categories bought'] },
      ],
    },
    tags: ['issue tree', 'logic tree', 'structure', 'diagnosis', 'root cause'],
  },
  {
    id: 'porter-5-forces',
    name: 'Porter’s Five Forces',
    nameEn: 'Porter’s 5 Forces',
    category: 'competition',
    summary:
      'Gauge the long-run attractiveness of an industry through the five forces that decide who keeps the profit in the value chain.',
    whenToUse:
      'When the question is whether to enter a new industry, why the whole industry earns thin margins, or whether the company’s long-term competitive position is durable.',
    triggers: [
      'Is this industry attractive to invest in?',
      'Why are margins low across the whole industry?',
      'Is our position sustainable over the next 5 years?',
    ],
    steps: [
      'Define the industry boundary precisely before analyzing — “beverages” and “bottled tea” produce completely different conclusions.',
      'Rate each force high / medium / low, and — more importantly — give EVIDENCE for every rating.',
      'Find the strongest force — it sets the industry’s profit ceiling; the others are secondary.',
      'Ask the reverse question: what could the company do to weaken that strongest force?',
      'Conclude on industry attractiveness first, then talk about the company’s own position within it.',
    ],
    example: {
      title: 'App-based food delivery in Vietnam',
      paragraphs: [
        'Running the five forces on Vietnam’s app-based food-delivery industry explains why almost no platform makes money. Buyer power is very high: customers keep three or four apps on their phone and switch for free, so whoever discounts wins them.',
        'Supplier power is high on both sides too. Restaurants list on several platforms at once, and drivers take orders from whoever pays more within the same shift. The substitute threat is medium — customers can still walk in or phone the restaurant directly. The entry barrier isn’t technology but subsidy capital, so any deep-pocketed player can get in.',
        'The strongest force is clearly zero switching costs on all three sides: customers, restaurants, and drivers. So the sensible play is not buying share with promotions, but making leaving expensive — a genuinely valuable membership program, exclusive deals with beloved restaurants, and tenure-based driver retention bonuses.',
      ],
    },
    mistakes: [
      'Listing all five forces without saying which is strongest — so the conclusion leads to no action.',
      'Defining the industry too broadly, making every force “medium” and the analysis meaningless.',
      'Confusing industry analysis with company analysis. The five forces describe industry attractiveness, not whether you would win in it.',
      'Using the framework for a short-term profit question when it is designed for long-run industry structure.',
    ],
    diagram: {
      kind: 'hub',
      center: 'Intensity of industry rivalry',
      nodes: [
        { label: 'Threat of new entrants', note: 'Are entry barriers high or low?' },
        { label: 'Supplier power', note: 'Few suppliers, hard to substitute?' },
        { label: 'Buyer power', note: 'Do customers switch easily, price-sensitive?' },
        { label: 'Substitutes', note: 'Another way to meet the same need?' },
        { label: 'Existing rivalry', note: 'Many equal rivals, slow-growing industry?' },
      ],
    },
    tags: ['Porter', 'competition', 'industry', 'entry barriers', '5 forces'],
  },
  {
    id: 'bcg-matrix',
    name: 'BCG Growth–Share Matrix',
    nameEn: 'BCG Growth-Share Matrix',
    category: 'strategy',
    summary:
      'Plot business units on market growth and relative share to decide where to pour capital in and where to pull it out.',
    whenToUse:
      'When a company has several business units or product lines and the question is capital allocation, or a keep-vs-divest decision on one unit.',
    triggers: [
      'Which business should we invest in over the next three years?',
      'Should we sell this business unit?',
      'Is our product portfolio balanced?',
    ],
    steps: [
      'For each unit, get two numbers: the MARKET’s growth rate (not the unit’s own) and relative market share versus the largest competitor.',
      'Set the cut lines: the relative-share axis splits at 1.0 (above 1.0 means you lead); the growth axis splits at the parent industry’s overall growth rate.',
      'Place the four boxes: Stars (high growth, leading), Cash Cows (low growth, leading), Question Marks (high growth, weak), Dogs (low growth, weak).',
      'Draw the cash flows: cows generate cash, stars fund themselves, question marks burn cash, dogs should be divested to free capital.',
      'For every question mark, choose decisively — either fund it fully to make it a star, or exit. Half-hearted investment is the surest way to lose money.',
    ],
    example: {
      title: 'A Vietnamese retail group’s portfolio',
      paragraphs: [
        'A retail group has four businesses. The traditional supermarket chain holds a relative share of 1.6 in a market growing only 3% a year — a cash cow generating 78% of group profit. The convenience-store chain has a 1.3 relative share in a market growing 14% a year: a star.',
        'The e-commerce arm grows 26% a year but its relative share is only 0.3 and it is losing about 210 billion VND — the textbook question mark. The last business is a consumer-electronics chain in a near-saturated market growing 2% with a 0.4 relative share: a classic dog.',
        'The play: divest electronics to free capital and management attention, keep milking the cow while investing enough to defend it, and — most importantly — decide firmly on e-commerce. If the group won’t commit enough capital over three years to push relative share past 1.0, better to sell that business now, while buyers still want it.',
      ],
    },
    mistakes: [
      'Using the unit’s own revenue growth instead of the market’s growth — the two numbers say completely different things.',
      'Using absolute market share instead of relative share versus the largest competitor, which drains the x-axis of meaning.',
      'Labelling the four boxes and stopping. The framework’s value is in the capital-allocation decision, not the labels.',
      'Forgetting that cash cows still need maintenance investment. Milking one dry too early cuts the funding for everything else.',
    ],
    diagram: {
      kind: 'matrix',
      xLabel: 'Relative market share',
      yLabel: 'Market growth',
      xLow: 'Low (below 1.0)',
      xHigh: 'High (above 1.0)',
      yLow: 'Low',
      yHigh: 'High',
      cells: [
        { label: 'Question Mark', note: 'Fast-growing market but weak position — choose: fund fully or exit.' },
        { label: 'Star', note: 'Fast growth and leading — feed it to hold position; it becomes the next cow.' },
        { label: 'Dog', note: 'Slow growth and weak — divest to free capital and focus.' },
        { label: 'Cash Cow', note: 'Leader in a mature market — milk it to fund stars and question marks.' },
      ],
    },
    tags: ['BCG', 'portfolio', 'capital allocation', 'matrix', 'growth-share'],
  },
  {
    id: '4cs',
    name: 'The 4Cs Framework',
    nameEn: '4Cs (Customer, Company, Competition, Context)',
    category: 'market',
    summary:
      'The four angles you must sweep before concluding any strategic question: the customer, your own company, the competition, and the context.',
    whenToUse:
      'When the prompt is a broad strategic decision and you need a fast scan that misses no angle — especially good for market-entry and product-launch questions.',
    triggers: [
      'Should we launch this product?',
      'Should we expand into a new market?',
      'Why is our competitor beating us?',
    ],
    steps: [
      'Customer: who are they, what do they need, how much will they pay, which segment is big and growing fastest?',
      'Company: what capabilities do we genuinely have (brand, channels, cost, technology), and what are we missing to win?',
      'Competition: who serves these customers today, where are they strong or weak, and how will they react when we move?',
      'Context: which regulations, infrastructure, consumer trends, or macro shifts are changing the game?',
      'Synthesize: go only when all four Cs support the move. If one C is a blocker, state exactly what condition must be met to clear it.',
    ],
    example: {
      title: 'A Vietnamese fashion brand weighs an activewear line',
      paragraphs: [
        'On Customer: urban Vietnamese gym-goers and runners are growing fast, spend about 2.4 million VND a year on sportswear, and care intensely about moisture-wicking fabric — a very specific, serviceable need.',
        'On Company: the brand already has 68 stores, a strong design team, and good factory relationships. But it has never worked with technical fabrics, and that is a real capability gap, not a detail. On Competition: international brands own the premium segment while no-name goods flood the low end on the marketplaces — the middle is the open space.',
        'On Context: running clubs and urban marathons are booming, creating a genuine demand wave. Conclusion: do it, but aim at the middle at roughly 40% of international prices — and the precondition is securing a technical-fabric supplier before committing any marketing budget. The Company C is the knot to untie first.',
      ],
    },
    mistakes: [
      'Presenting the four Cs as four disconnected sections without synthesizing them into one conclusion.',
      'Spending all the time on the Customer C because it is easiest to talk about, then ignoring the competitor’s reaction.',
      'Skipping the Company C — many candidates prove the market is attractive but forget to ask whether this company can actually win it.',
      'Using 4Cs for a profit-diagnosis question, where the profitability tree is a far sharper tool.',
    ],
    diagram: {
      kind: 'pillars',
      pillars: [
        { label: 'Customer', note: 'Who are they, what do they need, what will they pay?' },
        { label: 'Company', note: 'What capabilities do we have — and lack — to win?' },
        { label: 'Competition', note: 'Who serves them today, and how will they react?' },
        { label: 'Context', note: 'Which regulations, infrastructure, trends are shifting?' },
      ],
    },
    tags: ['4C', 'customer', 'competition', 'context', 'market entry'],
  },
  {
    id: '4ps',
    name: '4Ps Marketing Mix',
    nameEn: '4Ps / Marketing Mix',
    category: 'market',
    summary:
      'The four commercial levers you can adjust to take a product to market: product, price, place, and promotion.',
    whenToUse:
      'Once you have decided WHAT to do and the question shifts to HOW — a launch plan, winning back lost share, or repositioning a product line.',
    triggers: [
      'What should our new product launch plan look like?',
      'How do we win back the share we lost?',
      'The product is good but isn’t selling — why?',
    ],
    steps: [
      'Product: which need does it solve, how does it differ from what customers use today, and which format or packaging fits the usage occasion?',
      'Price: anchored on cost, on competitors, or on perceived value? Is that price consistent with the brand positioning?',
      'Place: where do customers actually buy, and are we present exactly there? Every channel has its own economics — don’t lump them together.',
      'Promotion: what message, through which channels, and how is the budget split between brand-building and sales activation?',
      'Check consistency: the four Ps must tell one story. A premium price sold at wholesale markets is a self-defeating contradiction.',
    ],
    example: {
      title: 'Launching a premium instant coffee for office workers',
      paragraphs: [
        'A Vietnamese coffee company wants a premium instant line aimed at office workers in Hanoi and Ho Chi Minh City. On Product: single-origin Cau Dat arabica in 16g sticks, leading with growing-region provenance and the roasting process — the differentiation has to sit in something customers can verify, not just ad copy.',
        'On Price: 12,000 VND per stick — three times ordinary instant coffee but only a quarter of a café cup. The anchor matters: customers shouldn’t compare it to supermarket sachets but to the café cup they already buy every morning.',
        'On Place: instead of spreading thin across traditional trade, concentrate on convenience stores within walking distance of office towers, B2B sales, and the e-commerce platforms — exactly where this group actually buys. On Promotion: pour the budget into sampling in office-building lobbies, because for a taste-driven product one sip persuades better than ten ads.',
      ],
    },
    mistakes: [
      'Using 4Ps for a should-we-do-it question — 4Ps answers execution questions, not decision questions.',
      'Letting the four Ps contradict each other, e.g. premium positioning with saturation distribution and constant promotions.',
      'Talking about Promotion generically (“run social ads”) without tying it to how the target group actually buys.',
      'Ignoring the economics of each channel inside the Place P — discount structures and cost-to-serve differ enormously by channel.',
    ],
    diagram: {
      kind: 'pillars',
      pillars: [
        { label: 'Product', note: 'Which need does it solve, how is it different?' },
        { label: 'Price', note: 'Anchored on cost, competitors, or value?' },
        { label: 'Place', note: 'Where do customers buy, which channel earns?' },
        { label: 'Promotion', note: 'What message, which channels, what budget?' },
      ],
    },
    tags: ['4P', 'marketing mix', 'product launch', 'distribution', 'promotion'],
  },
  {
    id: 'swot',
    name: 'SWOT Analysis',
    nameEn: 'SWOT Analysis',
    category: 'strategy',
    summary:
      'Set internal strengths and weaknesses against external opportunities and threats to find the sensible move.',
    whenToUse:
      'When you need a quick snapshot of a company’s position before diving deeper, or when the question is overall strategic direction. In MT interviews, SWOT often shows up in group rounds and presentations.',
    triggers: [
      'Assess this company’s current position.',
      'Where should we focus next year?',
      'What is our biggest risk?',
    ],
    steps: [
      'Separate internal from external cleanly: Strengths and Weaknesses are things the company controls; Opportunities and Threats come from outside.',
      'Keep only the 2–3 most important points per box, each backed by specific evidence rather than generic adjectives.',
      'Check relativity: a strong brand is only a strength if it is stronger THAN competitors’ in the eyes of the same customers.',
      'Cross-match to get actions: which strength captures which opportunity, and which weakness leaves us exposed to which threat.',
      'Finish with 2–3 concrete moves drawn from the cross-matched pairs — never stop at the four-box table.',
    ],
    example: {
      title: 'A mid-sized Vietnamese bank facing the digital-banking wave',
      paragraphs: [
        'The bank’s strengths are a loyal SME customer base built over many years and a 180-branch network covering the provinces. Its weaknesses: a mobile app rated 3.2 out of 5 on the app stores, and a cost-to-serve per account double that of the digital-only banks.',
        'The opportunity comes from payment digitization spreading fast into the provinces — exactly where its branch network already sits. The threat: digital banks are pulling in the under-30 segment hard with better experiences and near-zero fees.',
        'Cross-matching yields a clear move: use the provincial network strength to capture the provincial digitization opportunity — turn branches into onboarding points that help customers open digital accounts, not pure transaction counters. The most dangerous pair is the weak app meeting the digital-bank wave, so the app upgrade is not a technology project but next year’s survival priority.',
      ],
    },
    mistakes: [
      'Listing generic adjectives like “passionate team” with no evidence or competitor comparison.',
      'Misfiling boxes: treating a market trend as a strength, or an internal weakness as an external threat.',
      'Stopping at the four-box table without cross-matching into actions — the reason SWOT gets called shallow.',
      'Using SWOT as the main framework for a quantitative case, where the profitability tree or market sizing is the right tool.',
    ],
    diagram: {
      kind: 'matrix',
      xLabel: 'Impact',
      yLabel: 'Origin',
      xLow: 'Helpful',
      xHigh: 'Harmful',
      yLow: 'External',
      yHigh: 'Internal',
      cells: [
        { label: 'Strengths', note: 'Internal, helpful: capabilities where you beat competitors.' },
        { label: 'Weaknesses', note: 'Internal, harmful: where you lose — and can control.' },
        { label: 'Opportunities', note: 'External, helpful: trends you can ride.' },
        { label: 'Threats', note: 'External, harmful: what could hurt you.' },
      ],
    },
    tags: ['SWOT', 'strengths', 'weaknesses', 'opportunities', 'threats'],
  },
  {
    id: 'mckinsey-7s',
    name: 'McKinsey 7-S Framework',
    nameEn: 'McKinsey 7-S Framework',
    category: 'organization',
    summary:
      'Seven internal elements that must fit together for a company to run well — even a brilliant strategy breaks if the other six don’t follow.',
    whenToUse:
      'When the question is about execution: why a strategy isn’t landing, why two units with the same model deliver different results, or post-merger integration.',
    triggers: [
      'The strategy is right — why is execution failing?',
      'After the merger, how do we make two organizations run as one?',
      'Why does this branch outperform that one so clearly?',
    ],
    steps: [
      'Start from Shared Values — the core values at the centre, because the other six elements revolve around them.',
      'The three hard elements are easy to see: Strategy, Structure (org design), Systems (processes and tools).',
      'The three soft elements are harder to see but usually the real cause: Style (leadership behaviour), Staff (people), Skills (capabilities).',
      'Find the misalignments: which element contradicts which? E.g. the strategy demands speed but approvals run through five layers.',
      'Fix the biggest misalignment first, and remember that changing one element always forces changes in the others.',
    ],
    example: {
      title: 'A retail chain pushes omnichannel — and it stalls',
      paragraphs: [
        'A Vietnamese retail chain announces an omnichannel strategy: order online, pick up in store. A year on, only 4% of orders use the flow even though the technology budget is nearly spent. A 7-S scan shows the problem isn’t the strategy or the systems build.',
        'On Systems, the bonus scheme still credits stores only for counter transactions, so an online order picked up in store counts for no one. On Structure, the e-commerce team reports into a separate division, cut off from store operations, so the two sides have no incentive to cooperate.',
        'On Skills and Staff, store staff were never trained to handle online orders and treat them as a burden outside their real job. Conclusion: the strategy is entirely right but four other elements are pulling against it. Fixing the sales-credit mechanism so stores get credit for fulfilling online orders is the cheapest, most powerful lever — and it should come before any further technology spend.',
      ],
    },
    mistakes: [
      'Analyzing only the three hard elements because they are easy to talk about, when the real cause usually sits in the three soft ones.',
      'Describing the seven elements separately without showing where they are misaligned — the framework’s value is in the fit.',
      'Using 7-S for a market or profit question, when it is a framework about the inside of an organization.',
      'Proposing a change to one element without naming the other elements that must change with it.',
    ],
    diagram: {
      kind: 'hub',
      center: 'Shared Values',
      nodes: [
        { label: 'Strategy', note: 'The plan for winning competitive advantage' },
        { label: 'Structure', note: 'Who reports to whom, where decisions sit' },
        { label: 'Systems', note: 'Processes, tools, measurement and reward mechanisms' },
        { label: 'Style', note: 'How leaders actually behave day to day' },
        { label: 'Staff', note: 'People: how they are hired, kept, developed' },
        { label: 'Skills', note: 'What the organization can genuinely do' },
      ],
    },
    tags: ['7S', 'McKinsey', 'organization', 'execution', 'culture'],
  },
  {
    id: 'value-chain',
    name: 'Value Chain Analysis',
    nameEn: 'Value Chain Analysis',
    category: 'profitability',
    summary:
      'Lay the company’s entire operation out as a chain to see where value is created and where cost is incurred.',
    whenToUse:
      'When you need to find the source of a cost advantage, decide make-vs-outsource, or find margin improvements that never touch the selling price.',
    triggers: [
      'Where are our costs higher than competitors’?',
      'Should we produce this step ourselves or outsource it?',
      'At which step do we create differentiated value?',
    ],
    steps: [
      'List the primary activities in flow order: inbound, production, outbound, sales & marketing, after-sales service.',
      'List the cross-cutting support activities: firm infrastructure, HR, technology, procurement.',
      'Assign cost to each step as a share of total cost, so the steps worth attention stand out.',
      'Compare each step against competitors or industry benchmarks: where do we spend more, where are we clearly better?',
      'Draw two conclusions: which steps to cut or outsource, and which step is the genuine source of differentiation worth more investment.',
    ],
    example: {
      title: 'A seafood exporter looks for margin improvement',
      paragraphs: [
        'A seafood exporter in Can Tho runs about 5 percentage points below its industry peers on margin. Laying out the value chain shows raw-material procurement at 58% of total cost, processing 19%, cold storage and logistics 14%, and sales & admin 9%.',
        'Against the industry benchmark, its processing step is actually better than average. The gap sits in two places: procurement prices about 6% higher because it buys through middlemen instead of contracting directly with farming areas, and cold-storage costs 20% higher because the warehouse runs at only 62% utilization.',
        'Two moves emerge clearly. First, build direct off-take contracts with the farming households to cut out the middle layer — the biggest prize, since it acts on 58% of cost. Second, take in storage business from neighbouring companies to fill the idle capacity, turning a fixed cost into a revenue line. Notably, neither move touches the selling price.',
      ],
    },
    mistakes: [
      'Listing the steps without attaching a cost number to each — with no numbers there is no way to prioritize.',
      'Skipping the support activities, when admin and technology costs are often where the quiet bloat hides.',
      'Only hunting for cuts and forgetting to hunt for differentiation. The value chain serves both low-cost and differentiation strategies.',
      'Proposing to outsource a step without checking whether that step is the source of competitive advantage.',
    ],
    diagram: {
      kind: 'chevrons',
      support: ['Firm infrastructure', 'Human resources', 'Technology development', 'Procurement'],
      primary: ['Inbound', 'Production', 'Outbound', 'Sales & Marketing', 'After-sales service'],
    },
    tags: ['value chain', 'costs', 'outsourcing', 'differentiation', 'Porter'],
  },
  {
    id: 'market-sizing',
    name: 'Market Sizing',
    nameEn: 'Market Sizing (top-down & bottom-up)',
    category: 'market',
    summary:
      'Estimate the size of a market from a few anchor numbers, using two opposite paths to cross-check the result.',
    whenToUse:
      'When the interviewer asks how big a market is, or any estimation question. This is the single most common question type in the first round of MT programs.',
    triggers: [
      'How big is Vietnam’s instant-coffee market?',
      'How many ride-hailing trips happen in Ho Chi Minh City each day?',
      'What is this product’s potential revenue?',
    ],
    steps: [
      'Clarify the definition before calculating: which market, which region, revenue or volume, over what period.',
      'Choose the path. Top-down: start from population and filter through ratios. Bottom-up: start from one small unit — a store, a customer — and multiply up.',
      'Say every assumption out loud with the reason for the number. Interviewers grade how you reason about assumptions, not whether you memorized statistics.',
      'Round the numbers for easy mental math. Awkward precise figures just bog you down in arithmetic.',
      'Cross-check with the other path or a known number, then give the sensitivity: which assumption, if off, moves the result the most?',
    ],
    example: {
      title: 'Sizing the kids’ boxed fresh-milk market in urban Vietnam',
      paragraphs: [
        'Top-down: Vietnam has roughly 100 million people, about 40% urban, giving 40 million. Children aged 3–12 are about 13% of the population, so roughly 5.2 million urban kids. Assume 70% drink boxed milk regularly: 3.6 million children.',
        'Each child drinks on average 1 box a day — about 365 boxes a year — at a retail price around 8,000 VND per box. Multiply up: 3.6 million × 365 × 8,000 ≈ 10,500 billion VND a year.',
        'Cross-check bottom-up: a mid-sized supermarket sells about 400 boxes a day; the country has roughly 1,200 supermarkets, plus 2,500 convenience stores selling about 120 a day. That totals about 780,000 boxes a day — roughly 2,280 billion VND a year, only about a quarter of the first result. The gap isn’t an error but a finding: traditional trade, mom-and-pop shops, and schools carry the bulk of the market — and that is exactly the thing worth saying to the interviewer.',
      ],
    },
    mistakes: [
      'Starting to calculate before clarifying the market definition, and answering the wrong question.',
      'Using awkwardly precise numbers and getting bogged down in multiplication — slow and error-prone.',
      'Giving a final number without a sanity check — if the result is 80% of GDP, something is definitely wrong.',
      'Going silent while calculating. The interviewer needs to hear your reasoning, not just the result.',
    ],
    diagram: {
      kind: 'funnels',
      left: {
        title: 'Top-down',
        steps: ['Total population', '× urban share', '× share in age range', '× share who use it', '× average spend'],
      },
      right: {
        title: 'Bottom-up',
        steps: ['Units sold per outlet', '× outlets of each type', '× days per year', '× selling price', '= market size'],
      },
    },
    tags: ['market sizing', 'estimation', 'top-down', 'bottom-up', 'guesstimate'],
  },
  {
    id: 'market-entry',
    name: 'Market Entry Framework',
    nameEn: 'Market Entry Framework',
    category: 'market',
    summary:
      'Answer two separate questions: is this market worth entering, and if so, how should we enter it.',
    whenToUse:
      'When the prompt is expanding into a new country, province, category, or customer segment. A very common case type in the final rounds of MT programs.',
    triggers: [
      'Should we expand into Thailand?',
      'Should we open branches in the central provinces?',
      'Build, joint-venture, or acquire?',
    ],
    steps: [
      'Assess market attractiveness: size, growth rate, industry profitability, and legal or tariff barriers.',
      'Assess your own position in that market: does the product fit, does the cost advantage survive the move, do the brand and distribution channels transfer?',
      'Estimate the prize: at a realistic 3-year market share, what are the revenue and profit? Put that next to the capital required.',
      'Choose the entry mode: build (slow, high control), joint venture (faster, shared upside), or M&A (fastest, priciest, integration risk).',
      'State the stop conditions: which milestones and metrics would make you pull out? A recommendation without stop conditions is an incomplete recommendation.',
    ],
    example: {
      title: 'A Vietnamese condiments company weighs entering the Philippines',
      paragraphs: [
        'On attractiveness: the Philippines has 117 million people spending about 36 USD per person per year on condiments — an industry of roughly 4.2 billion USD, bigger than Vietnam’s. Bold flavours and home-cooking habits also sit close to the existing product. But the market already has 12 large players and an 8% import tariff.',
        'On our position: the company has a genuine production-cost advantage, but add the 8% tariff and shipping and that advantage nearly vanishes on the shelf. More importantly, it has no relationships with local distribution — and in condiments, the shelf is everything.',
        'Winning just 3% share equals 126 million USD of revenue — attractive enough to pursue. But since both barriers sit in tariffs and distribution rather than the product, the sensible mode is a joint venture or acquiring a local player that already owns shelf space, with local packaging to sidestep the tariff. Stop condition: after 12 months, if the cost of winning one share point runs 30% over budget, stop and pivot to another market.',
      ],
    },
    mistakes: [
      'Answering only whether the market is attractive and forgetting whether YOU can win there — a big market doesn’t mean you’ll win it.',
      'Skipping the entry mode. “We should enter” is not enough; the interviewer wants how, and why that way.',
      'Forgetting incumbents’ reactions. They will not stand still while you take share.',
      'Giving no stop conditions or checkpoints, which makes the recommendation sound like a one-way bet.',
    ],
    diagram: {
      kind: 'stages',
      stages: [
        { label: 'Is the market attractive?', note: 'Size, growth, profitability, legal barriers' },
        { label: 'Can we win?', note: 'Product fit, cost advantage, brand, distribution' },
        { label: 'How big is the prize?', note: 'Feasible share × market size, next to the capital required' },
        { label: 'How do we enter?', note: 'Build · Joint venture · M&A — pick by the biggest barrier' },
        { label: 'When do we stop?', note: 'The milestones and metrics that trigger a pull-out' },
      ],
    },
    tags: ['market entry', 'expansion', 'M&A', 'joint venture', 'growth'],
  },
  {
    id: 'ansoff-matrix',
    name: 'Ansoff Matrix',
    nameEn: 'Ansoff Matrix',
    category: 'strategy',
    summary: 'Four growth directions ranked by risk, based on whether the product and the market are existing or new.',
    whenToUse:
      'When the question is how to grow and you need to enumerate the possible directions completely, with the risk comparison between them.',
    triggers: [
      'How do we double in three years?',
      'Which direction should we grow in?',
      'Should we diversify into a new industry?',
    ],
    steps: [
      'Market penetration (existing product, existing customers): sell more to current customers or take competitors’ customers. Lowest risk — always consider it first.',
      'Product development (new product, existing customers): sell something new to the customer base you already have. Leverages existing relationships.',
      'Market development (existing product, new customers): take the current product to a new region or segment. Leverages the product capability.',
      'Diversification (new product, new customers): highest risk because nothing carries over. Only with a genuinely strong strategic reason.',
      'Rank by rising risk and by how much existing capability each direction reuses, then pick one main direction instead of doing all four.',
    ],
    example: {
      title: 'A pharmacy chain wants to double revenue in three years',
      paragraphs: [
        'In the penetration box, the chain can raise basket value by counselling supplements alongside prescriptions, and build a membership program to lift visit frequency. This is the cheapest, fastest direction because all the infrastructure already exists.',
        'In product development, it can add blood-pressure checks, vaccinations, and nutrition consulting right in the pharmacy — new services sold to the very customers already walking through the door. In market development, it opens pharmacies in provinces it hasn’t reached, or sells online with home delivery to people who never visit a store.',
        'Diversification would be opening a private clinic chain — new product for new customers, needing new licences, new medical capabilities, and a completely different business model. For a three-year goal, the sensible order is to pour effort into the first two boxes (fastest results per dong of capital), expand territory selectively, and shelve diversification for now.',
      ],
    },
    mistakes: [
      'Jumping straight to diversification because it sounds exciting, when the penetration box usually still holds plenty of untapped room.',
      'Listing all four boxes and recommending all of them. Resources are finite — you must choose.',
      'Not attaching an estimated number to each box, which makes the comparison between directions purely gut feel.',
      'Forgetting each box demands different capabilities — the lowest-risk direction is the one reusing the most of what you already have.',
    ],
    diagram: {
      kind: 'matrix',
      xLabel: 'Product',
      yLabel: 'Market',
      xLow: 'Existing',
      xHigh: 'New',
      yLow: 'Existing',
      yHigh: 'New',
      cells: [
        { label: 'Market development', note: 'Existing product, new customers — new territory or segment.' },
        { label: 'Diversification', note: 'New product, new customers — highest risk, needs a very strong reason.' },
        { label: 'Market penetration', note: 'Existing product, existing customers — lowest risk, consider first.' },
        { label: 'Product development', note: 'New product, existing customers — leverages existing relationships.' },
      ],
    },
    tags: ['Ansoff', 'growth', 'diversification', 'matrix', 'expansion'],
  },
  {
    id: 'cost-benefit-npv',
    name: 'Cost–Benefit Analysis & NPV',
    nameEn: 'Cost-Benefit Analysis / NPV',
    category: 'pricing',
    summary:
      'Bring every outflow and inflow of a decision to the same point in time to know whether it creates or destroys value.',
    whenToUse:
      'When the question is whether to invest, which of several options to pick, or how long until payback.',
    triggers: [
      'Should we invest in the new factory?',
      'How long until this project pays back?',
      'Which of these three options should we choose?',
    ],
    steps: [
      'List every cash outflow and inflow year by year, including the easy-to-forget items like working capital and maintenance.',
      'Count only the INCREMENTAL cash flows this decision creates. Money already spent in the past does not count.',
      'Compute payback time for a quick feel for risk, then compute NPV by discounting future cash flows to the present.',
      'A positive NPV means the project creates value; when comparing options, pick the highest NPV — not the fastest payback.',
      'Test sensitivity: which assumption, off by 10%, flips the NPV’s sign? Name the most fragile assumption in the recommendation.',
    ],
    example: {
      title: 'A logistics company weighs a cold-storage investment',
      paragraphs: [
        'A logistics company in Long An considers building a cold-storage warehouse for 120 billion VND. Expected net cash flow is 18 billion in year one, rising to 26, 32, 36, and 38 billion over the next four years as capacity fills.',
        'Cumulative cash flow reaches only 112 billion by the end of year four, putting the payback point around the middle of year five. At a 12% cost of capital, discounting the five cash flows to the present gives roughly 101 billion — an NPV of about minus 19 billion if the analysis stops at a five-year life.',
        'But a cold-storage facility lives about 20 years, so cutting the analysis at year five is wrong in principle. Adding a steady 38 billion a year for the later years turns the NPV clearly positive. The lesson: the analysis horizon must match the asset’s life — and the most fragile assumption isn’t the cost of capital but the capacity fill rate, because it shapes the entire early cash-flow curve.',
      ],
    },
    mistakes: [
      'Counting money already spent in the past toward today’s decision — sunk cost never comes back and should not sway the choice.',
      'Cutting the analysis horizon far shorter than the asset’s life, making a good project look like a bad one.',
      'Picking the fastest-payback option instead of the highest-value option. The two criteria often give different answers.',
      'Skipping the sensitivity analysis, which makes the recommendation sound far more certain than it is.',
    ],
    diagram: {
      kind: 'cashflow',
      periods: [
        { label: 'Year 0', value: -120 },
        { label: 'Year 1', value: 18 },
        { label: 'Year 2', value: 26 },
        { label: 'Year 3', value: 32 },
        { label: 'Year 4', value: 36 },
        { label: 'Year 5', value: 38 },
      ],
      note: 'Net cash flow by year (billion VND). Payback lands mid-year 5; NPV must discount to the present and cover the asset’s full life.',
    },
    tags: ['NPV', 'payback', 'investment', 'cost-benefit', 'discounting'],
  },
  {
    id: 'pricing-strategies',
    name: 'Three Approaches to Pricing',
    nameEn: 'Pricing Strategies',
    category: 'pricing',
    summary:
      'Three anchors for setting a price — cost, competitors, and perceived value — and how to choose the right anchor for the situation.',
    whenToUse:
      'When the question is pricing a new product, responding to a competitor’s price cut, or passing rising input costs on to customers.',
    triggers: [
      'How should we price this new product?',
      'Our competitor just cut prices 15% — what should we do?',
      'Input costs are up — should we raise prices?',
    ],
    steps: [
      'Cost-based: unit cost plus the desired margin. Simple and safe, but completely ignores what customers are willing to pay.',
      'Competitor-based: anchor to the market price. Fits when the product is barely differentiated, but invites a race to the bottom.',
      'Value-based: work out how much the product saves or earns for the customer, then take a share of that value. Highest margins, but demands deep customer understanding.',
      'Estimate demand elasticity: when price rises 1%, how many percent does volume fall? If less than 1%, a price rise grows profit.',
      'Always check with contribution profit, not revenue: profit equals price minus variable cost, times volume.',
    ],
    example: {
      title: 'A retail-management software company prices a new plan',
      paragraphs: [
        'A Vietnamese software company builds a sales-management plan for small shop owners. Cost-based: serving each customer costs about 60,000 VND a month; adding a 50% margin gives 90,000 VND. Competitor-anchored: similar plans sell around 149,000 VND a month.',
        'But the value path paints a different picture. Customer interviews show the software saves a shop about 8 hours of bookkeeping a month and cuts inventory shrinkage by roughly 1.2 million VND a month. The real value delivered is about 1.5 million VND a month.',
        'At 199,000 VND, the customer pays only about 13% of the value received — an easy pitch — while the company earns a 70% gross margin. The condition for holding that price is proving the savings number during the sales process, so the value calculator must become part of the sales toolkit, not an internal argument.',
      ],
    },
    mistakes: [
      'Defaulting to cost-based pricing because it is easy to compute, and leaving most of the capturable value on the table.',
      'Matching a competitor’s price cut without counting that it destroys margin on ALL volume, not just the contested part.',
      'Optimizing for revenue instead of contribution profit — the two optimal prices almost never coincide.',
      'Forgetting contract constraints and big customers’ reactions when changing prices.',
    ],
    diagram: {
      kind: 'pillars',
      pillars: [
        { label: 'Cost-based', note: 'Unit cost plus desired margin. Safe but ignores the customer.' },
        { label: 'Competitor-based', note: 'Anchor to market price. Fits low-differentiation products.' },
        { label: 'Value-based', note: 'Take a share of the value delivered. Highest margins.' },
      ],
    },
    tags: ['pricing', 'elasticity', 'value-based', 'price war', 'margin'],
  },
  {
    id: 'adkar',
    name: 'ADKAR Change Model',
    nameEn: 'ADKAR Model',
    category: 'organization',
    summary:
      'A change-management model holding that change only sticks when each PERSON moves through five states: Awareness, Desire, Knowledge, Ability, Reinforcement. Its power is diagnostic — it tells you exactly which state a stalled change program is stuck in.',
    whenToUse:
      'When a case involves a transformation that is technically ready but people are not adopting it — a new system, a new process, a restructure, or post-merger ways of working. Use it to locate the human blocker, group by group.',
    triggers: [
      'We rolled out the new system but staff still use the old spreadsheets — why?',
      'How do we get 2,000 employees to adopt the new process?',
      'Six months after the reorganization, why has behaviour not changed?',
    ],
    steps: [
      'Awareness: does each affected group understand WHY the change is happening — the business reason, not just the announcement?',
      'Desire: do they personally want it to succeed? Map who gains and who loses status, income, or convenience from the change.',
      'Knowledge: do they know HOW to work the new way — training, documentation, someone to ask?',
      'Ability: can they actually do it in practice? Knowledge without practice time, tools, or manageable workload does not become ability.',
      'Reinforcement: what keeps the change from sliding back — KPIs, incentives, leaders visibly working the new way? Score each state per group and fix the FIRST broken one; later states cannot compensate for an earlier gap.',
    ],
    example: {
      title: 'A garment factory’s digital production tracking nobody uses',
      paragraphs: [
        'A garment manufacturer near Hai Phong spends 9 billion VND on tablets and software to replace paper production tracking. Three months in, line leaders still keep the paper books and type the numbers into the tablets at the end of the shift — the worst of both worlds.',
        'An ADKAR scan by group shows Awareness is fine (everyone can recite the reason) but Desire is broken for line leaders: the paper book was their private buffer for smoothing over hourly shortfalls, and the tablet exposes every dip to management in real time. For sewing workers the blocker is Ability — the data-entry screen takes 40 seconds per bundle with wet fingers on a small screen.',
        'The fix is not more training. For Desire, management changes the rule so hourly dips trigger help from a support team rather than penalties — the transparency now works FOR line leaders. For Ability, entry is cut to one barcode scan. Adoption passes 90% in six weeks. The lesson for the case: name the stuck state per group, then fix that state specifically.',
      ],
    },
    mistakes: [
      'Treating change as one announcement plus one training session — that covers Awareness and Knowledge but ignores Desire, Ability, and Reinforcement.',
      'Scoring the organization as a whole. Different groups are stuck in different states, and each needs a different intervention.',
      'Trying to fix a later state when an earlier one is broken — more training never repairs a Desire problem.',
      'Skipping Reinforcement, so behaviour quietly reverts once management attention moves on.',
    ],
    diagram: {
      kind: 'stages',
      stages: [
        { label: 'Awareness', note: 'They understand why the change is needed' },
        { label: 'Desire', note: 'They personally want it to succeed' },
        { label: 'Knowledge', note: 'They know how to work the new way' },
        { label: 'Ability', note: 'They can actually do it in daily practice' },
        { label: 'Reinforcement', note: 'Incentives and habits keep it from sliding back' },
      ],
    },
    tags: ['ADKAR', 'change management', 'adoption', 'transformation', 'organization'],
  },
  {
    id: 'lean-startup-canvas',
    name: 'Lean Startup Canvas',
    nameEn: 'Lean Startup Canvas',
    category: 'innovation',
    summary:
      'A one-page adaptation of the business model canvas for early-stage ideas, re-centred on the problem: problem, customer segments, unique value proposition, solution, key metrics, channels, unfair advantage, costs, and revenue. It forces you to master the problem before falling in love with the solution.',
    whenToUse:
      'When a case asks you to assess or design a startup or a new venture inside a company, and you need a fast, complete snapshot of the idea’s riskiest assumptions.',
    triggers: [
      'Evaluate this startup idea for me.',
      'What are the riskiest assumptions in this new business?',
      'How should this corporate venture team structure its first quarter?',
    ],
    steps: [
      'Write the top 3 problems the target customer has, and how they solve them today. If the “today” column is empty, the problem may not be real.',
      'Define the customer segment narrowly — the early adopters who feel the problem most painfully, not the total market.',
      'Write the unique value proposition as a single sentence a customer would repeat, then sketch only enough solution to deliver it.',
      'Fill in channels, key metrics (the one number that shows the engine works), cost structure, and revenue streams.',
      'Rank the boxes by risk and design the cheapest test for the riskiest one. The canvas is a to-test list, not a business plan.',
    ],
    example: {
      title: 'A student team’s tutoring marketplace idea in Ho Chi Minh City',
      paragraphs: [
        'A student team wants to build an app matching university tutors with high-school students. Filling the canvas, the problem box says parents “can’t find good tutors” — but the today-column research shows most parents find tutors within days through teacher referrals and parent groups on Zalo. The stated problem is weak.',
        'The interviews reveal the sharper problem: parents can’t VERIFY quality and drop tutors after 2–3 sessions, restarting the search. The canvas is rewritten — the segment becomes parents who have churned a tutor in the past 6 months, the value proposition becomes a guaranteed-fit trial period with structured progress reports, and the key metric becomes the share of trials converting to month-two retention.',
        'The riskiest assumption is now whether tutors will follow the structured reporting format for a 15% commission. That is testable in two weeks with ten tutors and a shared form — before writing any code. The canvas turned a vague app idea into one measurable experiment.',
      ],
    },
    mistakes: [
      'Filling the solution box first and bending every other box to justify it — the canvas is meant to start from the problem.',
      'Defining the customer segment as “everyone who studies” — early adopters must be narrow enough to find and interview this week.',
      'Treating a completed canvas as validation. A full canvas is a list of guesses until each risky box has evidence.',
      'Choosing vanity metrics (downloads, followers) as key metrics instead of one number that proves the engine works.',
    ],
    diagram: {
      kind: 'hub',
      center: 'Unique value proposition',
      nodes: [
        { label: 'Problem', note: 'Top 3 problems and how they are solved today' },
        { label: 'Customer segments', note: 'Narrow early adopters who feel the pain most' },
        { label: 'Solution', note: 'Just enough product to deliver the promise' },
        { label: 'Key metrics', note: 'The one number that shows the engine works' },
        { label: 'Channels', note: 'The path to reach the early adopters' },
        { label: 'Unfair advantage', note: 'What cannot be easily copied or bought' },
        { label: 'Cost structure', note: 'What it costs to run the engine' },
        { label: 'Revenue streams', note: 'Who pays, how much, how often' },
      ],
    },
    tags: ['lean startup', 'canvas', 'startup', 'validation', 'assumptions'],
  },
  {
    id: 'blue-ocean-strategy',
    name: 'Blue Ocean Strategy',
    nameEn: 'Blue Ocean Strategy',
    category: 'strategy',
    summary:
      'Instead of fighting rivals for the same customers (a red ocean), redraw the market’s boundaries so competition becomes irrelevant. The engine is value innovation — raising buyer value while cutting cost at the same time, breaking the classic trade-off.',
    whenToUse:
      'When a case describes a saturated, price-war industry and asks how to grow anyway, or when the client wants a genuinely new positioning rather than a better version of the same offer.',
    triggers: [
      'The industry is a price war — how do we escape it?',
      'Every competitor offers the same thing. Where is the new space?',
      'How do we attract people who don’t buy from this category at all?',
    ],
    steps: [
      'Draw the strategy canvas: list the factors the industry competes on, and plot how every player scores on each. Red oceans show near-identical curves.',
      'Study non-customers — the people the industry has priced out, bored, or over-served — to learn which factors they actually care about.',
      'Apply the ERRC grid: which factors can be Eliminated entirely, Reduced well below the standard, Raised well above it, and Created that the industry never offered?',
      'Check value innovation: the moves must simultaneously cut cost (eliminate/reduce) and lift buyer value (raise/create). Doing only one side is ordinary repositioning.',
      'Redraw your value curve; it should diverge clearly from every rival’s, with a tagline a customer can repeat.',
    ],
    example: {
      title: 'A gym chain escapes the full-service fitness price war',
      paragraphs: [
        'Full-service gyms in Ho Chi Minh City compete on the same factors: pool, sauna, group classes, personal-training sales teams — with memberships around 1.2–1.8 million VND a month and heavy discounting. Meanwhile the biggest non-customer group is office workers who find the clubs expensive, crowded at 6pm, and intimidating.',
        'The ERRC grid: Eliminate the pool, sauna, and commissioned PT sales floor (the biggest cost blocks). Reduce floor size by half. Raise equipment quality and opening hours to 24/7. Create app-based coaching programs and a strict quiet-gym etiquette that removes the intimidation factor.',
        'The result is a 24/7 compact gym at 390,000 VND a month that is profitable at 60% of the member count a full-service club needs, and pulls in first-time gym-goers rather than stealing members from rivals. On the strategy canvas its curve crosses the incumbents’ almost nowhere — the definition of a blue ocean.',
      ],
    },
    mistakes: [
      'Only adding factors (raise/create) without eliminating any — that raises cost and is differentiation, not value innovation.',
      'Studying existing customers only. The clues to new demand sit with non-customers, who never appear in the industry’s surveys.',
      'Declaring a blue ocean without checking whether the new curve is defensible — if it can be copied in a quarter, it is a temporary promotion.',
      'Using it for a short-term profitability case; blue ocean is a repositioning strategy that takes real investment and time.',
    ],
    diagram: {
      kind: 'pillars',
      pillars: [
        { label: 'Eliminate', note: 'Which industry-standard factors can go entirely?' },
        { label: 'Reduce', note: 'Which factors can drop well below the standard?' },
        { label: 'Raise', note: 'Which factors should rise well above the standard?' },
        { label: 'Create', note: 'Which factors has the industry never offered?' },
      ],
    },
    tags: ['blue ocean', 'value innovation', 'ERRC', 'differentiation', 'non-customers'],
  },
  {
    id: 'business-analysis',
    name: 'Business Analysis Framework',
    nameEn: 'Business Analysis Framework',
    category: 'operations',
    summary:
      'A structured discipline for finding what actually drives value inside an organization: map the processes, measure where value is created or lost, and turn the gaps into a prioritized change agenda. It bridges “something is wrong” and a concrete improvement plan.',
    whenToUse:
      'When a case gives you a messy operational symptom — slow delivery, unhappy customers, ballooning admin cost — and you must locate the root process problem before recommending anything.',
    triggers: [
      'Orders take three weeks to fulfil — where does the time go?',
      'Which of our processes should we fix first?',
      'Customers complain about service but every department says it is fine.',
    ],
    steps: [
      'Frame the need: what business outcome is under-performing, measured how, versus what target? Anchor everything to that number.',
      'Map the current state: walk the actual end-to-end process (not the org chart’s version), recording time, cost, and error rate at each step.',
      'Identify the value drivers and the gaps: which steps create what the customer pays for, and which steps add delay, rework, or cost without value?',
      'Design the future state and size each change: expected impact on the anchor metric, cost, and difficulty.',
      'Prioritize into a roadmap — quick wins first to fund credibility, structural fixes second — and define who owns each metric afterwards.',
    ],
    example: {
      title: 'A building-materials distributor’s slow order-to-cash cycle',
      paragraphs: [
        'A distributor in Dong Nai takes 21 days on average from customer order to cash collected, while competitors quote 10. Walking the process shows the physical flow is fine: picking and delivery take 3 days. The anchor metric — days from order to cash — is bleeding elsewhere.',
        'The map reveals two silent steps: credit approval waits an average 4 days because every order above 50 million VND needs the finance director’s personal sign-off, and invoicing waits 6 more because invoices are batched weekly. Neither step appears on any org chart as a “process”, which is why every department could honestly say it was fine.',
        'The future state sets a pre-approved credit line per customer, reviewed quarterly (approval drops to minutes for 85% of orders), and invoice-on-delivery via e-invoice. Order-to-cash falls to 11 days, releasing roughly 38 billion VND of working capital. The case lesson: analyze the process the work actually follows, not the one the org chart implies.',
      ],
    },
    mistakes: [
      'Starting from departments instead of the end-to-end flow — the worst delays usually hide in the handoffs between departments.',
      'Collecting opinions instead of walking the process with timestamps; every team honestly believes its own step is fast.',
      'Producing a findings report without sizing each fix against the anchor metric, so nothing gets prioritized.',
      'Fixing everything at once. Quick wins first buy the credibility and cash to fund the structural changes.',
    ],
    diagram: {
      kind: 'stages',
      stages: [
        { label: 'Frame the need', note: 'Which outcome, measured how, versus what target?' },
        { label: 'Map current state', note: 'Walk the real process: time, cost, errors per step' },
        { label: 'Find value & gaps', note: 'Value-creating steps vs delay, rework, waste' },
        { label: 'Design future state', note: 'Size each change against the anchor metric' },
        { label: 'Prioritize & own', note: 'Quick wins first; assign a metric owner' },
      ],
    },
    tags: ['business analysis', 'process', 'operations', 'value drivers', 'diagnosis'],
  },
  {
    id: 'business-engineering',
    name: 'Business Engineering Framework',
    nameEn: 'Business Engineering Framework',
    category: 'bizmodel',
    summary:
      'A hybrid operating lens combining the entrepreneur’s speed of experimentation, the strategist’s market understanding, and the engineer’s systems view of business models. It treats a business model as something to be designed, tested, and scaled deliberately — not discovered by accident.',
    whenToUse:
      'When a case asks you to assess a company end-to-end — model, customers, technology, and scaling path together — rather than through one functional lens, especially for tech-driven businesses.',
    triggers: [
      'Assess this company’s whole business, not just its P&L.',
      'Why does this competitor move so much faster than us?',
      'How should we redesign the business model as the market shifts?',
    ],
    steps: [
      'Start customer-obsessed: define the job the customer hires the product for, and map how well the current model serves it versus alternatives.',
      'Deconstruct the business model into value, technology, distribution, and financial layers — and note which layer the company’s real advantage sits in.',
      'Identify the experiments: which model assumptions are unproven, and what is the cheapest test for each? Speed of learning is the core capability.',
      'Check the scaling logic: does the model strengthen as it grows (network effects, data, fixed-cost leverage) or does it grow linearly with headcount?',
      'Design the transition path: which niche to win first, what the model looks like at 10x, and which capabilities must be built between here and there.',
    ],
    example: {
      title: 'Diagnosing why a legacy distributor loses to a tech-first rival',
      paragraphs: [
        'A pharmaceutical distributor with 30 years of relationships watches a five-year-old rival win pharmacy customers. A functional review finds nothing broken: sales hit quota, logistics run on time, margins hold. The business-engineering lens looks instead at the layers where the rival plays a different game.',
        'The rival’s app gives pharmacies real-time stock, pricing, and next-day delivery promises — its advantage sits in the technology and distribution layers, and every order makes its demand-forecasting data (and thus its purchasing terms) better. The incumbent’s advantage sits only in the relationship layer, which erodes one retirement at a time and does not compound.',
        'The recommendation is not “build an app” but a re-engineered model: keep the relationship layer for the 200 hospital accounts where it matters, move the 4,000 small pharmacies to a self-serve digital channel within 18 months, and start capturing order data now because the forecasting advantage compounds with time. The framework’s value is seeing the business as designed layers, not as departments.',
      ],
    },
    mistakes: [
      'Reviewing the company function by function and missing that the competitor wins at the model level, not the execution level.',
      'Treating technology as an IT-department topic instead of a layer of the business model that can compound advantage.',
      'Scaling before the niche is truly won — the framework’s sequence is test, win the niche, then expand.',
      'Confusing motion with learning: many experiments, no explicit assumptions, nothing proven.',
    ],
    diagram: {
      kind: 'pillars',
      pillars: [
        { label: 'Customer obsession', note: 'The job the customer hires the product for' },
        { label: 'Business model design', note: 'Value, technology, distribution, financial layers' },
        { label: 'Fast experimentation', note: 'Cheapest test per unproven assumption' },
        { label: 'Scaling logic', note: 'Does the model compound as it grows?' },
      ],
    },
    tags: ['business engineering', 'business model', 'experimentation', 'scaling', 'tech'],
  },
  {
    id: 'asymmetric-betting',
    name: 'Asymmetric Betting (Impact × Reversibility)',
    nameEn: 'Asymmetric Bets / Speed-vs-Reversibility Matrix',
    category: 'strategy',
    summary:
      'A decision matrix that sorts initiatives by two questions: how big is the upside if it works, and how easily can we undo it if it fails? High-impact, easy-to-reverse bets are jackpots to pursue all-in and fast; hard-to-reverse moves deserve slow, staged commitment.',
    whenToUse:
      'When a case asks how to prioritize a portfolio of initiatives, or how boldly and quickly to move on one specific decision. It replaces a flat cost-benefit ranking with a risk-shaped one.',
    triggers: [
      'We have five initiatives and budget for two — which ones?',
      'Should we commit fully now or run a pilot first?',
      'Which decisions can the team make fast without escalation?',
    ],
    steps: [
      'For each initiative, estimate the impact if it works — revenue, cost, or strategic position — in rough orders of magnitude, not decimals.',
      'Assess reversibility honestly: what would it cost, in money and reputation, to unwind this in six months? Contracts, capex, layoffs, and brand moves reverse badly.',
      'Place each initiative in the 2×2: high impact + easy reverse = jackpot (go all-in, fast); high impact + hard reverse = staged bet (buy information first); low impact + easy reverse = cheap experiments; low impact + hard reverse = avoid.',
      'Match decision SPEED to the quadrant: reversible decisions should be made quickly at low levels; only irreversible ones deserve slow, senior deliberation.',
      'For staged bets, define the tranches: what small commitment buys the information that de-risks the next, larger one?',
    ],
    example: {
      title: 'An FMCG company sorts its growth initiatives for next year',
      paragraphs: [
        'A Vietnamese snack company has four proposals: launch on TikTok Shop, build a second factory (280 billion VND), rebrand the flagship product, and test a spicy flavour variant. The CFO’s spreadsheet ranks them by NPV, which puts the factory first — but the matrix tells a different story.',
        'TikTok Shop is high-impact and almost fully reversible (stop posting, close the store) — a jackpot: commit the team now, decide in weeks not quarters. The flavour variant is low-impact but reversible — a cheap experiment to run in two provinces. The rebrand is hard to reverse (shelf recognition, printed packaging) with uncertain impact — park it. The factory is high-impact and nearly irreversible.',
        'So the factory becomes a staged bet: first outsource production to a co-packer for a year (small, reversible commitment) to verify that demand actually outgrows current capacity — that information is worth far more than a faster build. The portfolio decision took one meeting because the matrix told everyone which decisions deserved speed and which deserved caution.',
      ],
    },
    mistakes: [
      'Ranking initiatives purely by expected value, ignoring that a reversible bet with the same NPV is strictly better than an irreversible one.',
      'Treating every decision as equally momentous, so small reversible calls queue for months behind executive review.',
      'Underestimating reversal cost — contracts, morale, and brand perception make many “pilots” harder to unwind than they look.',
      'Going all-in on a hard-to-reverse bet without asking what small commitment could buy the de-risking information first.',
    ],
    diagram: {
      kind: 'matrix',
      xLabel: 'Reversibility',
      yLabel: 'Impact if it works',
      xLow: 'Hard to reverse',
      xHigh: 'Easy to reverse',
      yLow: 'Low',
      yHigh: 'High',
      cells: [
        { label: 'Staged bet', note: 'Commit in tranches — buy information before scale.' },
        { label: 'Jackpot — all-in', note: 'Big upside, easy undo: move fast and commit.' },
        { label: 'Avoid', note: 'Little upside and hard to unwind — walk away.' },
        { label: 'Cheap experiments', note: 'Run many, learn fast, keep what works.' },
      ],
    },
    tags: ['asymmetric bets', 'reversibility', 'prioritization', 'risk', 'decision speed'],
  },
  {
    id: 'design-strategy',
    name: 'Design Strategy Framework',
    nameEn: 'Design Strategy',
    category: 'innovation',
    summary:
      'Applies the discipline of business strategy to what gets designed and why: every product decision must sit at the intersection of user desirability, business viability, and technical feasibility. It keeps design work pointed at business outcomes instead of aesthetics.',
    whenToUse:
      'When a case involves deciding WHAT product or service to build, redesigning an experience to hit a business metric, or arbitrating between what users want and what the business needs.',
    triggers: [
      'Our product is well built but users don’t engage — what should we change?',
      'How do we decide which features make the roadmap?',
      'Design a service that serves both the user and the P&L.',
    ],
    steps: [
      'Anchor on the business goal: which metric must move (revenue, retention, cost-to-serve), by how much, for whom?',
      'Research the user’s actual context and needs — what they are trying to accomplish, and where the current experience fails them.',
      'Generate concepts at the intersection: desirable to users, viable for the business, feasible with current technology. Discard concepts that satisfy only one or two.',
      'Prototype the strongest concept cheaply and test it with real users against the business metric, not against opinions.',
      'Scale what works and codify the principles, so later design decisions inherit the strategy instead of restarting the debate.',
    ],
    example: {
      title: 'A bank designs a savings feature for first-jobbers',
      paragraphs: [
        'A Vietnamese bank wants deposit growth from customers aged 22–27, who open accounts for salary but keep balances near zero. The business goal is concrete: lift average balance in this segment by 30%. User research shows they WANT to save but experience saving as a monthly willpower test they keep failing — the existing fixed-term deposit products demand exactly the discipline they lack.',
        'Concept generation at the intersection: a round-up feature (each card payment rounds up to the nearest 10,000 VND, difference moved to a savings pocket) is desirable (saving becomes automatic and invisible), viable (deposits grow, engagement rises), and feasible (the core banking system already supports sub-accounts). A gamified savings “streak” scores high on desirability but low on viability — streaks break and users churn embarrassed.',
        'A prototype with 500 users lifts average balance 22% in three months, with the surprise finding that users who name their pocket (“Da Lat trip”) save 60% more — so goal-naming becomes part of the default flow. Design strategy turned “make saving nicer” into a measurable business lever.',
      ],
    },
    mistakes: [
      'Starting from what is technically easy or visually impressive instead of from the business metric and the user need.',
      'Treating user research as a satisfaction survey rather than observation of what users actually do and fail to do.',
      'Shipping concepts that users love but the business cannot sustain — desirability alone is a hobby, not a strategy.',
      'Testing prototypes against stakeholder opinions instead of against the metric the project was chartered to move.',
    ],
    diagram: {
      kind: 'pillars',
      pillars: [
        { label: 'Desirable', note: 'Users genuinely want it — it solves a real need' },
        { label: 'Viable', note: 'It moves a business metric sustainably' },
        { label: 'Feasible', note: 'It can be built with current capabilities' },
      ],
    },
    tags: ['design strategy', 'product design', 'desirability', 'viability', 'feasibility'],
  },
  {
    id: 'minimum-viable-product',
    name: 'Minimum Viable Product (MVP)',
    nameEn: 'Minimum Viable Product',
    category: 'innovation',
    summary:
      'The smallest version of a product that lets the team collect the maximum validated learning about customers with the least effort, powering the build–measure–learn loop. The point is not a cheap product — it is a cheap answer to the riskiest question.',
    whenToUse:
      'When a case involves launching something new under uncertainty and you must recommend how to test demand before committing capital — a new product, service, channel, or business line.',
    triggers: [
      'How do we know whether customers will actually buy this?',
      'What should version one contain?',
      'How can we test this idea without building the whole platform?',
    ],
    steps: [
      'Name the riskiest assumption — usually “customers will pay for this”, not “we can build this”.',
      'Design the smallest experiment that produces real behavioural evidence on that assumption: a landing page with a pre-order button, a concierge service run by hand, a single-SKU pilot.',
      'Define the success metric BEFORE launching — what conversion, repeat, or willingness-to-pay number counts as validated?',
      'Run the loop: build, measure, learn. Each cycle should be days or weeks, not quarters.',
      'Decide explicitly after each loop: persevere (evidence supports the model), pivot (change a core assumption), or stop. Drifting on without deciding burns the runway.',
    ],
    example: {
      title: 'Testing a healthy lunch subscription without a kitchen',
      paragraphs: [
        'Two founders in Ho Chi Minh City want to build a healthy-lunch subscription app for office workers, budgeted at 1.2 billion VND for app plus central kitchen. The riskiest assumption is not the app — it is whether office workers will PREPAY for a week of lunches and stick with it.',
        'The MVP: a simple order form, a menu photographed from a rented home kitchen, delivery by motorbike within one office tower, capacity 40 meals a day. Total setup cost: under 30 million VND. Success metric set in advance: 30% of week-one customers renew for week two at full price.',
        'Three loops later the learning is sharp: renewal is 12% at the tested price but jumps to 41% when the menu rotates and delivery hits a fixed 11:45 window — punctuality matters more than variety or price. Only now does building a kitchen make sense, with the operating spec written by customer behaviour rather than guesswork.',
      ],
    },
    mistakes: [
      'Building a small version of the full product instead of an experiment aimed at one assumption — an MVP is a question, not a product.',
      'Measuring compliments instead of behaviour. Only prepayment, repeat use, and referrals count as evidence.',
      'Setting no success threshold in advance, so any result can be argued as encouraging.',
      'Running the loop but never making the persevere/pivot/stop decision — the loop exists to force that choice.',
    ],
    diagram: {
      kind: 'stages',
      stages: [
        { label: 'Riskiest assumption', note: 'Usually “will they pay?”, not “can we build it?”' },
        { label: 'Build', note: 'The smallest experiment that tests it' },
        { label: 'Measure', note: 'Behavioural evidence against a preset threshold' },
        { label: 'Learn & decide', note: 'Persevere, pivot, or stop — explicitly' },
      ],
    },
    tags: ['MVP', 'lean startup', 'validation', 'build measure learn', 'experiment'],
  },
  {
    id: 'six-forces',
    name: 'Six Forces Model',
    nameEn: 'Six Forces Model',
    category: 'competition',
    summary:
      'An extension of Porter’s Five Forces that adds a sixth force: complementary products — goods and services whose success amplifies (or whose absence throttles) your own. Widely used in tech, where today’s complement can become tomorrow’s substitute.',
    whenToUse:
      'When analyzing tech or platform industries where the ecosystem matters — hardware needing apps, wallets needing merchants — and Five Forces alone misses how the ecosystem shifts value.',
    triggers: [
      'How does the ecosystem around this product change its prospects?',
      'Our partner is becoming our competitor — how do we read this industry?',
      'Is this platform’s position durable as complements evolve?',
    ],
    steps: [
      'Run the classic five: entry barriers, supplier power, buyer power, substitutes, and rivalry — each rated with evidence.',
      'Map the complements: which products or services increase your product’s value when they thrive (apps for a phone, merchants for a wallet, chargers for an EV)?',
      'Assess complement health and power: are complements abundant and competitive, or concentrated enough to extract your margin?',
      'Watch the complement-to-competitor path: a strong complement that owns the customer relationship can integrate into your business — today’s partner, tomorrow’s rival.',
      'Conclude on industry attractiveness including the ecosystem: sometimes the right move is investing in the complements, not the core product.',
    ],
    example: {
      title: 'Reading Vietnam’s e-wallet industry through six forces',
      paragraphs: [
        'The classic five forces already look harsh for Vietnamese e-wallets: buyers switch apps freely, merchants demand subsidies, and banks’ own apps are substitutes. But the sixth force explains the actual battlefield: the complement network of QR-accepting merchants, which makes every wallet more useful as it grows.',
        'The complement analysis shows why a shared QR standard changed everything: once any bank app could pay any QR code, the merchant-acceptance network stopped being a private complement that wallets had spent billions building and became public infrastructure — wiping out the moat those subsidies had bought.',
        'The six-forces conclusion: the durable positions belong to players whose complements CANNOT be standardized away — super-apps whose wallet rides on ride-hailing and food delivery they own outright. For a pure wallet, the recommendation is to stop subsidizing acceptance (a commoditized complement) and build owned use cases instead. Five forces alone would have missed the entire dynamic.',
      ],
    },
    mistakes: [
      'Treating complements as mere partners rather than a force that can capture or destroy your margin.',
      'Missing the complement-to-substitute transition — the model’s signature insight in tech markets.',
      'Counting the same player twice (as buyer and complement) without noting the roles carry different power.',
      'Using six forces for a stable, non-ecosystem industry where the classic five are sharper and faster.',
    ],
    diagram: {
      kind: 'hub',
      center: 'Industry attractiveness',
      nodes: [
        { label: 'New entrants', note: 'How high are the entry barriers?' },
        { label: 'Supplier power', note: 'Few suppliers, hard to substitute?' },
        { label: 'Buyer power', note: 'Do customers switch easily?' },
        { label: 'Substitutes', note: 'Other ways to meet the same need' },
        { label: 'Rivalry', note: 'Intensity among existing players' },
        { label: 'Complements', note: 'Products that amplify yours — or absorb it' },
      ],
    },
    tags: ['six forces', 'complements', 'ecosystem', 'platform', 'competition'],
  },
  {
    id: 'porters-generic-strategies',
    name: 'Porter’s Generic Strategies',
    nameEn: 'Porter’s Generic Strategies',
    category: 'strategy',
    summary:
      'Porter’s answer to “how do we win”: compete on cost leadership, on differentiation, or focus either one on a narrow segment. Trying to be everything at once leaves a company “stuck in the middle” with no durable advantage.',
    whenToUse:
      'When a case asks how a company should position against competitors, or when a company’s poor performance traces back to an incoherent position — mid-priced, mid-quality, mid-everything.',
    triggers: [
      'How should we compete against the market leader?',
      'Should we cut prices or invest in the brand?',
      'Why do both the cheap player and the premium player out-earn us?',
    ],
    steps: [
      'Choose the source of advantage: lower cost than anyone (won through scale, process, or structural cost drivers) or differentiation customers verifiably pay a premium for.',
      'Choose the scope: the broad market, or a narrow segment whose needs mainstream players serve badly (focus).',
      'Check the economics: cost leadership only works if you are THE cost leader — second-cheapest earns no prize; differentiation only works if the price premium exceeds the cost of being different.',
      'Align every function behind the choice: R&D, operations, channels, and pay systems must all serve the same strategy.',
      'Audit for stuck-in-the-middle: if you can’t say in one sentence why a customer picks you over the cheapest and over the best, the position is incoherent.',
    ],
    example: {
      title: 'Three coffee players, three coherent positions — and one stuck',
      paragraphs: [
        'In Vietnam’s packaged-coffee market, the cost leader runs enormous roasting scale, plain packaging, and traditional-trade distribution, profitably selling sachets at prices rivals cannot match. A differentiated specialty brand sells single-origin beans with traceable farms at triple the price — and its customers happily pay it. A focus player serves only offices with machine rental plus bean subscriptions, owning a niche the giants ignore.',
        'The struggling client sits between all three: costs 20% above the leader (no scale), a brand nobody would call special (no premium), and no niche it owns. Every promotion buys temporary volume that vanishes when the discount ends — the textbook stuck-in-the-middle pattern.',
        'The recommendation forces a choice. Its genuine asset is a network of relationships with mid-sized restaurants and cafés — so the coherent play is differentiation focus: become the supply partner for independent cafés, with barista training, custom blends, and equipment service bundled in. Cost leadership is unreachable (scale gap), broad differentiation is unaffordable (brand gap), but the niche is winnable.',
      ],
    },
    mistakes: [
      'Pursuing cost leadership while ranking third on cost — only the actual leader wins that game; everyone else just shrinks margins.',
      'Claiming differentiation that customers won’t pay for. A price premium sustained in the market is the only proof.',
      'Mixing strategies by department — marketing selling premium while operations optimizes for cheapness produces incoherence, not balance.',
      'Confusing focus with being small. Focus means serving a niche BETTER because of its distinct needs, not merely selling less.',
    ],
    diagram: {
      kind: 'matrix',
      xLabel: 'Source of advantage',
      yLabel: 'Competitive scope',
      xLow: 'Lower cost',
      xHigh: 'Differentiation',
      yLow: 'Narrow segment',
      yHigh: 'Broad market',
      cells: [
        { label: 'Cost leadership', note: 'Cheapest at scale — only one company can win this.' },
        { label: 'Differentiation', note: 'A premium customers verifiably pay for.' },
        { label: 'Cost focus', note: 'Cheapest way to serve one specific niche.' },
        { label: 'Differentiation focus', note: 'Serve a niche’s distinct needs better than anyone.' },
      ],
    },
    tags: ['generic strategies', 'cost leadership', 'differentiation', 'focus', 'positioning'],
  },
  {
    id: 'ge-mckinsey-matrix',
    name: 'GE McKinsey Nine-Box Matrix',
    nameEn: 'GE McKinsey Matrix',
    category: 'strategy',
    summary:
      'A portfolio tool that scores each business unit on industry attractiveness and competitive strength — composite scores built from several weighted factors — then maps them to invest, protect, harvest, or divest decisions. It is the multi-factor upgrade of the BCG matrix.',
    whenToUse:
      'When allocating capital across business units in industries where growth rate and market share alone mislead — the two BCG axes — and factors like margin structure, regulation, or capability fit must enter the scoring.',
    triggers: [
      'Which of our seven business units deserve investment next year?',
      'Market share data is misleading here — how else do we compare units?',
      'Which businesses should we exit over the next three years?',
    ],
    steps: [
      'Score industry attractiveness per unit: market size and growth, margin structure, competitive intensity, regulatory risk — factors weighted by what matters in your context.',
      'Score competitive strength per unit: relative share, brand, cost position, technology, channel access — again weighted, and scored against the best competitor.',
      'Place each unit on the grid (classically 3×3; a 2×2 works for interviews), sizing each bubble by revenue or capital employed.',
      'Apply the zone logic: high-high = invest and grow; strong on one axis = be selective, fix the weak axis or milk carefully; low-low = harvest or divest.',
      'Stress-test the scores: the matrix is only as honest as its weights, so ask which single factor flips a unit’s zone if re-weighted.',
    ],
    example: {
      title: 'A family conglomerate rationalizes seven business units',
      paragraphs: [
        'A Vietnamese family group spans seven units from plastics to private schooling. BCG placement misleads: the plastics unit holds high market share (a “cow”) but its industry suffers raw-material volatility and thinning margins; the schooling unit has tiny “share” of a fragmented market, which BCG would call a dog.',
        'The nine-box scoring reverses both calls. Plastics: industry attractiveness scores low (margin compression, import competition) despite the strong share — zone: harvest, stop reinvesting. Schooling: attractiveness scores high (demographics, willingness to pay, pricing power) and competitive strength scores mid-high once brand and licences are weighed — zone: invest and grow.',
        'The output is a capital-allocation table the family can actually act on: two units get growth capital, three get maintenance only, plastics gets harvested over five years, and one logistics unit — weak on both axes — is sold while consolidators are still paying well. The matrix’s value over BCG was letting attractiveness mean more than growth, and strength mean more than share.',
      ],
    },
    mistakes: [
      'Letting scores be negotiated politically — every unit head will argue their industry is attractive; anchor factors to external data.',
      'Using absolute strength instead of strength relative to the best competitor in each industry.',
      'Treating the middle boxes as “do nothing” — selectivity means an explicit decision about which axis to fix or exploit.',
      'Scoring once and filing it away; attractiveness shifts with regulation and technology, so the grid needs an annual refresh.',
    ],
    diagram: {
      kind: 'matrix',
      xLabel: 'Competitive strength of the unit',
      yLabel: 'Industry attractiveness',
      xLow: 'Weak',
      xHigh: 'Strong',
      yLow: 'Low',
      yHigh: 'High',
      cells: [
        { label: 'Selective bet', note: 'Attractive industry, weak position — fix strength or exit.' },
        { label: 'Invest & grow', note: 'Attractive industry, strong position — fund fully.' },
        { label: 'Harvest / divest', note: 'Weak on both — free the capital.' },
        { label: 'Protect & milk', note: 'Strong position, fading industry — defend, don’t overfeed.' },
      ],
    },
    tags: ['GE McKinsey', 'nine box', 'portfolio', 'capital allocation', 'attractiveness'],
  },
  {
    id: 'mckinsey-three-horizons',
    name: 'McKinsey Three Horizons of Growth',
    nameEn: 'McKinsey Horizon Model',
    category: 'growth',
    summary:
      'A portfolio view of growth over time: Horizon 1 defends and extends the core business, Horizon 2 scales emerging businesses, Horizon 3 plants options on future ones. Managing all three at once is what keeps a company from being profitable today and obsolete tomorrow.',
    whenToUse:
      'When a case involves long-term growth planning, innovation budgeting, or a company whose core earns well today but faces disruption — and you must balance short-term delivery with future bets.',
    triggers: [
      'Where will our growth come from in five to ten years?',
      'How much should we spend on innovation versus the core business?',
      'Our core is profitable but maturing — what is the plan beyond it?',
    ],
    steps: [
      'Sort every current initiative into a horizon: H1 = core businesses that pay today’s bills; H2 = ventures with revenue traction that could become the next core in 2–5 years; H3 = experiments and options for years 5+.',
      'Check the balance: an empty H2 means a growth gap is already locked in for three years out, however healthy H1 looks now.',
      'Fund each horizon differently: H1 on margin and efficiency metrics, H2 on growth and unit economics, H3 on cheap experiments and learning milestones.',
      'Manage them differently too: H2/H3 ventures die when run under H1 rules — separate teams, separate KPIs, separate risk tolerance.',
      'Review migration annually: which H3 options graduate to H2, which H2 ventures join the core, and which get killed to free resources.',
    ],
    example: {
      title: 'A regional bank plans beyond branch lending',
      paragraphs: [
        'A Vietnamese bank earns 85% of profit from H1: branch-based lending and deposits — healthy today, but customer acquisition under 30 is collapsing. Sorting its initiatives finds a crowded H1 (twelve efficiency programs), a nearly empty H2, and an H3 that exists only as slideware.',
        'The rebalanced portfolio: H1 keeps ten programs and funds the rest of the plan. H2 gets two real ventures with existing traction — digital SME lending using transaction-data scoring, and a payroll-advance product distributed through employers — each with growth KPIs and a leader pulled out of the branch hierarchy. H3 plants three cheap options: embedded-finance partnerships with e-commerce platforms, an agent-banking pilot for rural districts, and a data partnership with a retail chain.',
        'Spending lands near 70/20/10 across H1/H2/H3. The governing insight for the case: the bank’s five-year growth gap cannot be closed by starting in year four — H2 ventures need three years of runway, so the portfolio must be seeded NOW while H1 still generates the cash to pay for it.',
      ],
    },
    mistakes: [
      'Running H2 ventures on H1 metrics — demanding core-business margins from a two-year-old venture kills it on schedule.',
      'Treating the horizons as a sequence (“first fix the core, then innovate”) instead of a portfolio managed simultaneously.',
      'Letting H3 become a lab with no graduation criteria — options exist to be exercised or killed, not maintained.',
      'Starving H2 in good years and panic-funding it in bad ones; the horizon that becomes the next core needs steady runway.',
    ],
    diagram: {
      kind: 'stages',
      stages: [
        { label: 'Horizon 1 — core', note: 'Defend and extend today’s profit engine' },
        { label: 'Horizon 2 — emerging', note: 'Scale ventures that become the next core in 2–5 years' },
        { label: 'Horizon 3 — options', note: 'Cheap experiments on futures 5+ years out' },
      ],
    },
    tags: ['three horizons', 'McKinsey', 'innovation', 'growth planning', 'portfolio'],
  },
  {
    id: 'mckinsey-seven-degrees',
    name: 'McKinsey Seven Degrees of Freedom for Growth',
    nameEn: 'Seven Degrees of Freedom',
    category: 'growth',
    summary:
      'A checklist of the seven distinct directions a business can grow in, from selling more to existing customers all the way to entirely new competitive arenas. Its job is to stop teams from debating two obvious options while five others go unexamined.',
    whenToUse:
      'When a case asks “where can growth come from?” and you need an exhaustive enumeration before prioritizing — especially for a mature business that believes its market is tapped out.',
    triggers: [
      'List every way this company could grow.',
      'We think our market is saturated — what are we missing?',
      'Which growth opportunities should we prioritize?',
    ],
    steps: [
      'Walk all seven degrees in order, forcing at least one concrete idea per degree: (1) sell more existing products to existing customers; (2) win new customers in existing markets; (3) create new products and services; (4) improve the delivery approach or channels; (5) expand to new geographies; (6) change the industry structure via M&A or partnerships; (7) enter entirely new competitive arenas.',
      'Quantify each idea roughly — revenue potential, investment, and time to impact — so degrees can be compared, not just listed.',
      'Score against capabilities: earlier degrees reuse more of what the company already has and are usually faster and safer.',
      'Pick 2–3 degrees to pursue seriously; seven directions at once means zero directions done well.',
      'Sequence them: capability built in one degree (say, a new channel) often unlocks a later one (a new geography) more cheaply.',
    ],
    example: {
      title: 'A dairy company that “ran out of growth” finds seven doors',
      paragraphs: [
        'A dairy company with a leading fresh-milk share believes its market is saturated. Walking the seven degrees produces: (1) lift per-capita consumption via family-size packs and school programs; (2) win the 30% of households buying rival brands in the Mekong Delta; (3) launch yogurt drinks and cheese for children; (4) build direct-to-home subscription delivery in major cities; (5) export UHT milk to Cambodia; (6) acquire a struggling regional dairy for its herd and cold chain; (7) enter plant-based beverages, competing in a new arena.',
        'Quick sizing shows the school-programs idea in degree 1 alone is worth roughly 6% volume growth — the “saturated” belief dies in the first hour. Degrees 3 and 4 score highest on the capability check: both reuse the cold chain and brand trust the company already owns.',
        'The chosen portfolio: double down on degrees 1, 3, and 4 now; hold degree 6 as an opportunistic option if the regional player’s price drops; park degree 7 — plant-based needs marketing muscle currently committed elsewhere. The framework’s contribution was not any single idea but forcing all seven doors open before choosing.',
      ],
    },
    mistakes: [
      'Debating the two obvious degrees (new products, new geographies) without walking all seven — the whole point is exhaustiveness.',
      'Listing ideas without rough sizing, which makes prioritization a matter of who argues loudest.',
      'Ignoring the capability gradient: degree 7 sounds exciting but reuses almost nothing the company owns.',
      'Pursuing five degrees simultaneously with the resources for two.',
    ],
    diagram: {
      kind: 'hub',
      center: 'Growth',
      nodes: [
        { label: 'Existing customers', note: 'Sell more of current products to them' },
        { label: 'New customers', note: 'Win non-buyers in existing markets' },
        { label: 'New offerings', note: 'Create new products and services' },
        { label: 'New delivery', note: 'Improve channels and delivery approaches' },
        { label: 'New geographies', note: 'Take the model to new regions' },
        { label: 'New structure', note: 'Reshape the industry via M&A, alliances' },
        { label: 'New arenas', note: 'Compete in entirely new spaces' },
      ],
    },
    tags: ['seven degrees', 'growth options', 'McKinsey', 'enumeration', 'prioritization'],
  },
  {
    id: 'new-product-development',
    name: 'New Product Development (NPD) Process',
    nameEn: 'New Product Development',
    category: 'innovation',
    summary:
      'The stage-gate pipeline that takes a product from raw idea to market: idea generation, screening, concept testing, business analysis, development, test marketing, commercialization, and post-launch review. Each gate exists to kill weak ideas cheaply before they become expensive.',
    whenToUse:
      'When a case involves launching a new product and asks how to structure the path to market, why a launch failed, or how to improve a company’s poor hit rate on new products.',
    triggers: [
      'Design the launch process for this new product.',
      'Why did our last three product launches fail?',
      'How should we decide which product ideas get funded?',
    ],
    steps: [
      'Generate and screen: collect ideas from customers, sales, and R&D, then screen against strategy fit and rough market size — most ideas should die here, at near-zero cost.',
      'Test the concept: put a description, mock-up, or prototype in front of real target customers and measure purchase intent BEFORE building anything.',
      'Run the business case: projected volume, price, cost, cannibalization of existing products, and required investment — with explicit kill thresholds.',
      'Develop and test-market: build the product, then sell it for real in a limited region or channel; measure trial AND repeat rate, because repeat is what predicts survival.',
      'Commercialize with a full launch plan (channel fill, pricing, promotion timing), then hold a post-launch review comparing actuals to the business case — the learning loop that improves the next launch.',
    ],
    example: {
      title: 'A snack company gates a seaweed-flavoured cracker to market',
      paragraphs: [
        'An FMCG company harvests 60 product ideas in a quarter. Screening against strategy (salty snacks, existing production lines) and market size kills 52 in one workshop. Concept boards for the surviving 8 go in front of 300 target consumers; a seaweed cracker and a chili-lime peanut score highest on purchase intent.',
        'Business analysis kills the peanut: projected volume is fine, but it would cannibalize an existing peanut line for a thinner margin. The cracker passes with a kill threshold set in advance: the test market must show at least 25% repeat purchase within eight weeks.',
        'The test market in Da Nang and two Mekong provinces delivers 61% awareness, 34% trial — and 19% repeat, below the threshold. Diagnosis: the flavour delights but the pack size feels expensive per gram. Rather than a national launch that would have burned roughly 40 billion VND on a doomed SKU, the company re-tests with a smaller pack at a lower entry price, hits 31% repeat, and only then commercializes. The gates did their job: cheap kills early, expensive commitment only after evidence.',
      ],
    },
    mistakes: [
      'Letting pet projects skip gates — the process only protects capital if the kill thresholds apply to everyone’s ideas.',
      'Measuring test markets on trial alone; trial buys curiosity, repeat rate predicts survival.',
      'Setting kill criteria after seeing the results, when every number can be rationalized.',
      'Skipping the post-launch review, which throws away the learning that would raise the next launch’s odds.',
    ],
    diagram: {
      kind: 'stages',
      stages: [
        { label: 'Idea generation & screening', note: 'Many ideas in, most killed cheaply' },
        { label: 'Concept testing', note: 'Purchase intent from real target customers' },
        { label: 'Business analysis', note: 'Volume, price, cost, cannibalization, kill thresholds' },
        { label: 'Development & test market', note: 'Real sales in a limited region; watch repeat rate' },
        { label: 'Commercialization & review', note: 'Full launch, then actuals vs the business case' },
      ],
    },
    tags: ['NPD', 'product launch', 'stage gate', 'test market', 'innovation'],
  },
  {
    id: 'user-experience-design',
    name: 'User Experience (UX) Design Process',
    nameEn: 'User Experience Design',
    category: 'innovation',
    summary:
      'A process discipline for making products useful and usable across the WHOLE journey — from first discovery through purchase, use, support, and repeat. Its founding idea: no product is an island; customers judge the integrated set of experiences, not the feature list.',
    whenToUse:
      'When a case shows a product that is functionally competitive but losing on adoption, conversion, or satisfaction — the gap sits in the experience, not the spec sheet.',
    triggers: [
      'Our app has more features than the rival’s but worse retention — why?',
      'Where in the funnel are we losing customers, and how do we fix it?',
      'Design the end-to-end experience for this new service.',
    ],
    steps: [
      'Research: observe real users pursuing real goals — where they hesitate, work around, or abandon. Behaviour outranks opinion.',
      'Define: map the full journey (discover → evaluate → buy → use → get help → return) and mark the moments of friction and delight with data.',
      'Ideate: redesign the worst friction points first — the journey’s lowest point drags the whole experience down more than any new feature lifts it.',
      'Prototype and test with users against task-completion metrics: time to done, error rate, drop-off.',
      'Ship, measure, iterate — and keep the journey map alive as the shared artifact every team plans against.',
    ],
    example: {
      title: 'An e-commerce checkout bleeding cash-on-delivery customers',
      paragraphs: [
        'A Vietnamese e-commerce site has strong traffic and competitive prices, yet checkout conversion is 38% against an industry norm near 55%. Feature comparison shows nothing missing. Session recordings tell the real story: the funnel collapses at the address form.',
        'Research with 20 users shows why: provincial addresses don’t fit the rigid street/ward/district dropdowns — rural customers describe addresses (“near the market, opposite the primary school”) — and COD customers, 70% of orders, are forced through the same long form as card payers even though the courier will phone them anyway.',
        'The redesign: a free-text address line with map-pin confirmation, dropdowns auto-filled from the pin, and a COD fast path — name, phone, pin, done in three fields. Checkout conversion rises to 51% with zero new features. The case lesson: the spec sheet was fine; the experience was the product, and the address form was where the product actually lived.',
      ],
    },
    mistakes: [
      'Equating UX with visual polish — a beautiful interface over a broken journey is lipstick on a funnel.',
      'Designing from stakeholder opinions or personal taste instead of observed user behaviour.',
      'Optimizing one screen at a time while the journey between screens (email → app → delivery → support) stays broken.',
      'Testing with colleagues who already know the product; they cannot experience a first-time user’s confusion.',
    ],
    diagram: {
      kind: 'stages',
      stages: [
        { label: 'Research', note: 'Observe real users; behaviour over opinion' },
        { label: 'Define', note: 'Map the full journey; mark friction with data' },
        { label: 'Ideate', note: 'Fix the worst friction point first' },
        { label: 'Prototype & test', note: 'Task completion, errors, drop-off' },
        { label: 'Ship & iterate', note: 'Measure, learn, keep the map alive' },
      ],
    },
    tags: ['UX', 'user experience', 'journey', 'usability', 'conversion'],
  },
  {
    id: 'empathy-mapping',
    name: 'Empathy Map',
    nameEn: 'Empathy Mapping',
    category: 'innovation',
    summary:
      'A one-page visual capturing what a target user Says, Thinks, Does, and Feels — plus their pains and gains. Its power is exposing the contradictions between what people say and what they do, which is where the real insight lives.',
    whenToUse:
      'When a case requires genuine customer understanding before designing anything — especially when survey answers and actual behaviour do not match, or when a team is designing for a customer it has never met.',
    triggers: [
      'Customers say they want it, but nobody buys — what is happening?',
      'What does this segment actually need from us?',
      'Why does this product resonate in surveys and die in the market?',
    ],
    steps: [
      'Define the scope: one specific user type in one specific situation — an empathy map of “all customers” captures nobody.',
      'Fill Says and Does from direct evidence — interview quotes and observed behaviour — one sticky note per data point.',
      'Infer Thinks and Feels carefully: what worries, hopes, and social pressures explain the observed behaviour?',
      'Hunt the contradictions: every gap between Says and Does is a design insight — people say what sounds right and do what feels safe.',
      'Summarize into pains (obstacles, fears, frustrations) and gains (wants, measures of success), and let those drive the design or the pitch.',
    ],
    example: {
      title: 'Why rural customers praise the bank and keep cash at home',
      paragraphs: [
        'A bank wants rural households to move savings from cash at home into deposit accounts. Surveys are encouraging: 78% say they trust banks. Yet accounts sit empty. An empathy map of one persona — a 45-year-old fruit farmer’s wife who manages the family money — explains the gap.',
        'Says: “Banks are safe, the staff are polite.” Does: keeps gold and cash in a locked cabinet; visits the bank branch only to receive remittances from her son; asks the neighbour, not the bank, when she needs a bridging loan before harvest. Thinks: “If the money is in the bank and my husband’s brother needs help on Sunday night, I can’t get it.” Feels: proud of managing money well; embarrassed at the branch counter when forms use words she doesn’t know.',
        'The contradiction is the insight: trust isn’t the barrier — ACCESS and DIGNITY are. Money must be reachable on a Sunday night, and banking must not make her feel unschooled. The design answer: agent banking at the commune general store (open evenings, run by someone she knows), passbook language stripped of jargon, and instant withdrawal by phone. Deposits in pilot communes triple — without spending a dong on more “trust” advertising.',
      ],
    },
    mistakes: [
      'Filling the map from the team’s imagination in a conference room — that documents assumptions, not customers.',
      'Mapping a demographic average instead of one vivid, specific persona in a specific situation.',
      'Treating Says as truth and skipping Does — the method’s entire value is the gap between them.',
      'Stopping at a completed map without extracting pains, gains, and design implications.',
    ],
    diagram: {
      kind: 'hub',
      center: 'The user',
      nodes: [
        { label: 'Says', note: 'Direct quotes from interviews' },
        { label: 'Does', note: 'Observed behaviour — what they actually do' },
        { label: 'Thinks', note: 'Beliefs and worries behind the behaviour' },
        { label: 'Feels', note: 'Emotions: pride, fear, embarrassment' },
        { label: 'Pains', note: 'Obstacles, frustrations, risks' },
        { label: 'Gains', note: 'Wants, needs, measures of success' },
      ],
    },
    tags: ['empathy map', 'customer insight', 'persona', 'user research', 'says does thinks feels'],
  },
  {
    id: 'product-market-fit',
    name: 'Product-Market Fit (and Problem-Solution Fit)',
    nameEn: 'Product-Market Fit',
    category: 'market',
    summary:
      'The staged validation of a venture: first problem-solution fit (evidence the problem is real and your solution relieves it), then product-market fit — being in a good market with a product that satisfies it, felt as demand starting to pull the product out of your hands.',
    whenToUse:
      'When a case asks whether a young product is ready to scale, why growth spend is not converting, or how to sequence validation — the answer differs sharply on each side of PMF.',
    triggers: [
      'Should this startup raise money and scale now?',
      'We doubled marketing spend and retention got worse — why?',
      'How do we know when we’ve reached product-market fit?',
    ],
    steps: [
      'Establish problem-solution fit first: interviews and prototypes proving the target customer has the problem, feels it painfully, and finds your solution meaningfully better than their current workaround.',
      'Define the PMF evidence you will trust: retention curves that flatten (not decay to zero), organic/referral growth, and the Sean Ellis test — 40%+ of users saying they would be “very disappointed” if the product disappeared.',
      'Instrument the product to measure those signals by cohort, not in aggregate — averages hide the truth.',
      'Before PMF: iterate on product and segment with minimal spend. Scaling marketing before fit buys churn, not growth.',
      'After PMF: shift the bottleneck question to growth — channels, capacity, unit economics — and defend the fit as the market evolves.',
    ],
    example: {
      title: 'A pharmacy-management SaaS decides whether to scale',
      paragraphs: [
        'A startup sells inventory software to independent pharmacies. Problem-solution fit came from 40 interviews: expiry-date write-offs cost a typical pharmacy 4–6 million VND a month, and a prototype that flags near-expiry stock cut the loss visibly within one month for pilot users.',
        'Eighteen months in, the founders want to scale sales. The PMF check says wait: month-6 retention by cohort is 58% and still sliding (the curve hasn’t flattened), only 22% of surveyed users would be “very disappointed” to lose the product, and nearly all growth is paid, not referred. The product is liked, not needed.',
        'Cohort analysis finds the exception: pharmacies with two or more staff retain at 85%+, because the owner uses the software to supervise inventory they no longer handle personally. Single-owner shops churn — they trust their own memory. The move: narrow the target to multi-staff pharmacies, rebuild onboarding around the supervision use case, and delay the sales hire. Two quarters later the flagship cohort holds 88% and referrals start arriving — the pull that marks real PMF, in a narrower market than the founders first imagined.',
      ],
    },
    mistakes: [
      'Scaling spend before fit — the money buys users who churn, and the churn data drowns the signal of what to fix.',
      'Reading aggregate metrics when fit usually exists in one segment and not others; cohorts reveal it, averages bury it.',
      'Mistaking problem-solution fit (they like the demo) for product-market fit (they can’t work without it).',
      'Treating PMF as permanent — markets shift, competitors copy, and fit must be re-verified as conditions change.',
    ],
    diagram: {
      kind: 'stages',
      stages: [
        { label: 'Problem-solution fit', note: 'The problem is real; your solution relieves it' },
        { label: 'Build & measure', note: 'Cohort retention, referrals, very-disappointed %' },
        { label: 'Product-market fit', note: 'Retention flattens; demand starts pulling' },
        { label: 'Scale', note: 'Only now: pour fuel on channels and capacity' },
      ],
    },
    tags: ['product-market fit', 'problem-solution fit', 'PMF', 'retention', 'validation'],
  },
  {
    id: 'perceptual-mapping',
    name: 'Perceptual Mapping',
    nameEn: 'Perceptual Mapping',
    category: 'market',
    summary:
      'A visual plot of how CUSTOMERS perceive competing brands on the two attributes they care most about — not how companies describe themselves. It reveals crowded positions, open spaces, and the gap between intended and actual positioning.',
    whenToUse:
      'When a case involves positioning a brand or product: entering a crowded category, repositioning a tired brand, or explaining why a “better” product loses to a better-positioned one.',
    triggers: [
      'Where should we position this new brand?',
      'Customers see us as cheap but we sell on quality — what happened?',
      'Is there an unserved position in this market?',
    ],
    steps: [
      'Identify the two attributes that actually drive choice in the category — from customer research, not the boardroom’s favourite words.',
      'Survey customers to score every relevant brand (including yours) on both attributes; perception is the only data that counts here.',
      'Plot the map: each brand a point, sized by market share if data allows. Clusters mean commoditized positions; empty space means either opportunity or absence of demand.',
      'Test any empty space before moving into it: is it vacant because nobody serves it, or because nobody wants it?',
      'Compare your intended position with your perceived one; a large gap means the marketing spend is buying the wrong picture in customers’ heads.',
    ],
    example: {
      title: 'A bottled-tea brand finds the open corner',
      paragraphs: [
        'A beverage company wants to launch a bottled tea into a market with nine brands. Customer research says the two choice-driving attributes are perceived naturalness (real-brewed vs. syrupy) and price. Mapping the nine incumbents shows a dense cluster: seven brands sit in the low-price, moderate-naturalness middle, fighting on promotions.',
        'Two positions are empty: premium-price/high-naturalness, and low-price/high-naturalness. Testing the first: urban consumers already pay for fresh tea at chains, and concept tests show willingness to pay 40% above the cluster for cold-brewed bottled tea with a visible leaf grade — the space is vacant because brewing real tea at scale is operationally hard, not because demand is absent. The second empty space fails the test: real brewing cannot hit the cluster’s price point profitably; it is empty for a reason.',
        'The launch takes the premium-natural corner with packaging and messaging built solely around brewing (“we brew, we don’t mix”). Follow-up mapping a year later shows the new brand alone in its quadrant — and two incumbents trying to walk their positions upward, validating the read.',
      ],
    },
    mistakes: [
      'Choosing axes the company cares about instead of the attributes that actually drive customer choice.',
      'Plotting official positioning statements rather than surveyed customer perception — the map must show heads, not decks.',
      'Rushing into any empty space without testing whether demand exists there.',
      'Making the map once; perceptions drift with every competitor campaign, so the map needs periodic refresh.',
    ],
    diagram: {
      kind: 'matrix',
      xLabel: 'Price (as perceived)',
      yLabel: 'Perceived quality / naturalness',
      xLow: 'Low',
      xHigh: 'High',
      yLow: 'Low',
      yHigh: 'High',
      cells: [
        { label: 'Value champion', note: 'High perceived quality at a low price — hard to sustain.' },
        { label: 'Premium', note: 'High quality, high price — must keep proving the premium.' },
        { label: 'Economy', note: 'Basic offer at a basic price — volume game.' },
        { label: 'Overpriced', note: 'High price, low perceived quality — share donor.' },
      ],
    },
    tags: ['perceptual map', 'positioning', 'brand', 'perception', 'white space'],
  },
  {
    id: 'value-stream-mapping',
    name: 'Value Stream Mapping (VSM)',
    nameEn: 'Value Stream Mapping',
    category: 'operations',
    summary:
      'A lean flowchart of every step — and every wait — between customer order and delivery, with a timeline separating value-adding time from waiting time. In most processes the shock is the ratio: days of waiting wrapped around minutes of actual work.',
    whenToUse:
      'When a case involves long lead times, late deliveries, or bloated work-in-progress, and you must show where time and inventory actually sit — manufacturing, services, and back-office flows alike.',
    triggers: [
      'Why does an order take six weeks when the work takes two days?',
      'Where is our working capital tied up in the process?',
      'Which process step should the improvement team attack first?',
    ],
    steps: [
      'Pick ONE product family and walk its flow physically from customer order back to raw material — the real path, not the standard operating procedure.',
      'Record per step: cycle time, changeover time, batch size, error/rework rate, and the inventory or queue sitting before it.',
      'Draw the timeline under the map: value-adding time on one line, waiting time on the other. Compute the ratio — it is usually under 5% and that number mobilizes management better than any slide.',
      'Find the constraints: where do queues pile up, why do batches wait (approvals, changeovers, transport, batching policy)?',
      'Design the future-state map — target flow, smaller batches, fewer handoffs — and convert the delta into money: lead time, working capital, and capacity released.',
    ],
    example: {
      title: 'A furniture exporter’s 45-day lead time hides 6 days of work',
      paragraphs: [
        'A wooden-furniture exporter in Binh Duong quotes 45-day lead times while Malaysian competitors quote 25, and it is losing US buyers. Mapping one dining-table family end to end finds total processing time — cutting, assembly, finishing, packing — of just 6 working days. The other 39 days are waiting.',
        'The timeline shows where: 9 days in the order-entry-to-production-plan loop (orders batched weekly for planning), 12 days as work-in-progress between cutting and assembly (cutting runs big batches to avoid changeovers), 8 days waiting for the finishing line (one bottleneck spray booth), and 10 days of finished goods waiting for consolidated container shipping.',
        'The future state attacks waits, not work: daily production planning (−8 days), halved cutting batches with quick-change tooling (−7 days), a second spray shift instead of a new booth (−5 days), and bi-weekly container consolidation with a partner factory (−5 days). Lead time lands at 20 days with zero new machines — and roughly 60 billion VND less capital sitting on the floor as WIP.',
      ],
    },
    mistakes: [
      'Mapping the official process from the SOP instead of walking the actual flow with a stopwatch and a clipboard.',
      'Improving the value-adding steps (already a rounding error) while ignoring the waits where 95% of the time lives.',
      'Mapping every product at once — one representative family keeps the map readable and the lessons transferable.',
      'Stopping at the current-state map; the deliverable is the future state with the delta converted to money.',
    ],
    diagram: {
      kind: 'stages',
      stages: [
        { label: 'Walk one product family', note: 'Order to delivery, the real path' },
        { label: 'Record steps & queues', note: 'Cycle times, batches, inventory at each step' },
        { label: 'Draw the timeline', note: 'Value-adding vs waiting — compute the ratio' },
        { label: 'Find the constraints', note: 'Where and why queues pile up' },
        { label: 'Design future state', note: 'Attack waits; convert the delta to money' },
      ],
    },
    tags: ['value stream', 'lean', 'lead time', 'waste', 'process flow'],
  },
  {
    id: 'bullseye-framework',
    name: 'Bullseye Framework (Traction Channels)',
    nameEn: 'Bullseye Framework',
    category: 'market',
    summary:
      'A disciplined method for finding the marketing channel that actually moves the needle: brainstorm across ALL channels, cheaply test the promising few, then concentrate on the one or two that hit the bullseye. Focus beats spreading budget across everything.',
    whenToUse:
      'When a case asks how a product should acquire customers with a limited budget, or why marketing spend across many channels is producing little traction anywhere.',
    triggers: [
      'We have 500 million VND for marketing — where should it go?',
      'We are active on every channel and growing on none. What now?',
      'Which acquisition channel fits this product?',
    ],
    steps: [
      'Outer ring — what’s possible: brainstorm honestly across the full channel list (search, social, content, PR, events, partnerships, referrals, communities, direct sales, offline ads…), writing one concrete idea per channel instead of dismissing any on reflex.',
      'Middle ring — what’s probable: pick the 3–4 channels whose logic best fits the product’s economics (customer value, purchase trigger, where the audience already gathers).',
      'Run cheap parallel tests: a few weeks and a small fixed budget per channel, each with a preset metric — cost per acquired customer and rough scalability.',
      'Bullseye — what works: concentrate spend and talent on the ONE channel (rarely two) that clearly outperformed. Depth in one channel compounds; breadth across six doesn’t.',
      'Re-run the cycle when the channel saturates — every channel fatigues eventually, and the next bullseye must be found with the same discipline.',
    ],
    example: {
      title: 'An accounting SaaS for small firms finds its channel',
      paragraphs: [
        'A startup selling accounting software to small Vietnamese businesses spreads 80 million VND a month across search ads, TikTok, Facebook ads, and a blog — acquiring customers at 2.1 million VND each against a first-year value of 3 million. The bullseye exercise starts by forcing the outer ring: nineteen channels brainstormed, including three the team had never considered seriously — accountant communities, integration partnerships with invoice providers, and tax-deadline webinars.',
        'The middle ring picks three testable fits: freelance-accountant referrals (accountants advise dozens of small firms each), webinars timed to quarterly tax deadlines (the purchase trigger), and Zalo communities where owners already ask tax questions. Each gets 15 million VND and three weeks.',
        'Results: webinars acquire at 900,000 VND per customer; communities at 1.4 million; but accountant referrals land at 400,000 VND per customer with better retention — the accountant keeps using the software across clients. That is the bullseye: the team builds a proper accountant-partner program (revenue share, training, priority support) and moves 70% of the budget there. Six months later, cost per customer sits at a third of the old blended rate — from one channel done deeply instead of four done thinly.',
      ],
    },
    mistakes: [
      'Skipping the outer ring and testing only the fashionable channels every competitor is also bidding on.',
      'Running tests without preset metrics, so every channel looks vaguely promising and nothing gets cut.',
      'Spreading budget evenly forever — the framework’s entire point is concentration after the test.',
      'Abandoning a winning channel at the first plateau instead of doubling depth (better creative, better targeting) before moving on.',
    ],
    diagram: {
      kind: 'partition',
      whole: 'All possible traction channels',
      parts: ['Outer ring: brainstorm all 19', 'Middle ring: cheaply test 3–4', 'Bullseye: focus on the 1 that works'],
    },
    tags: ['bullseye', 'traction', 'channels', 'customer acquisition', 'marketing'],
  },
  {
    id: 'tech-business-model',
    name: 'Tech Business Model Template',
    nameEn: 'Tech Business Model Template (FourWeekMBA)',
    category: 'bizmodel',
    summary:
      'A four-block template for modeling any tech-driven business: the value model (propositions, mission), technological model (R&D and core technology), distribution model (how sales and marketing scale), and financial model (revenue, costs, cash). A business is only as strong as its weakest block.',
    whenToUse:
      'When a case asks you to analyze or design a tech company end to end — including Web3/blockchain variants, where the same logic applies with a protocol/ecosystem layer in place of the technological block.',
    triggers: [
      'Break down how this tech company actually works.',
      'Which part of this startup’s model is the weak link?',
      'Design the business model for this new platform.',
    ],
    steps: [
      'Value model: who are the key customers, what value proposition does each get, and what mission holds it together? Multi-sided platforms have one per side.',
      'Technological model: what does the technology actually do better, and does R&D spending compound into an advantage (data, algorithms, infrastructure) or just maintain parity?',
      'Distribution model: how do customers arrive — sales teams, virality, platforms, partnerships — and does the cost of acquiring them fall or rise as the company grows?',
      'Financial model: how the revenue model captures value (subscriptions, commissions, advertising), the cost structure, and whether cash generation funds the other three blocks.',
      'Stress the links: strategy usually fails BETWEEN blocks — great technology with no distribution, or great distribution monetized so aggressively it erodes the value model. (For a Web3 business, swap in: value → blockchain/protocol → distribution/community → economic model — same discipline.)',
    ],
    example: {
      title: 'Dissecting a grocery-delivery super-app candidate',
      paragraphs: [
        'An investor asks whether a Vietnamese grocery-delivery startup is fundable. The four-block dissection: Value model — shoppers get one-hour delivery from wet markets (unique vs. supermarket apps); market vendors get digital demand without learning e-commerce. Two sides, both propositions verified by retention data.',
        'Technological model — the routing and inventory-prediction engine is real: it learns each vendor’s stock patterns, and its prediction accuracy (and thus delivery reliability) improves with every order. This block compounds. Distribution model — the weak link: acquisition leans 90% on discount vouchers, cost per retained customer is rising, and there is no organic loop; when subsidies pause, orders drop 60%.',
        'Financial model — commission take-rate is capped by vendors’ thin margins, so profitability depends on order density per district. Verdict: fund only against a distribution fix — the technology moat is real but sits behind a rented audience. The recommended test: build the vendor-driven referral loop (vendors nudging their regulars onto the app) in two districts and re-measure organic share. The template’s value: it located the weak block instead of averaging the story into “promising”.',
      ],
    },
    mistakes: [
      'Analyzing the four blocks in isolation and missing that failures live in the links between them.',
      'Crediting “tech” as an advantage when R&D merely maintains parity — the test is whether the technology block compounds.',
      'Ignoring distribution economics: a rising cost of acquisition as the company scales reverses the whole investment story.',
      'Copying a template answer across industries — the same block can be a moat in one market and a commodity in the next.',
    ],
    diagram: {
      kind: 'pillars',
      pillars: [
        { label: 'Value model', note: 'Propositions per key customer; the mission' },
        { label: 'Technological model', note: 'Does R&D compound into advantage?' },
        { label: 'Distribution model', note: 'How customers arrive; does CAC fall with scale?' },
        { label: 'Financial model', note: 'Revenue capture, costs, cash generation' },
      ],
    },
    tags: ['tech business model', 'four blocks', 'platform', 'web3', 'business model'],
  },
  {
    id: 'asymmetric-business-models',
    name: 'Asymmetric Business Models',
    nameEn: 'Asymmetric Business Models',
    category: 'bizmodel',
    summary:
      'A model where the user of the product is not the one who pays: users get value (often free), their usage builds an asset — usually data — and a different key customer pays for access to that asset. Google’s search users and advertisers are the canonical pair.',
    whenToUse:
      'When a case involves a free product with real costs and asks “who pays, and why is this viable?” — or when designing monetization for a product whose users won’t or can’t pay directly.',
    triggers: [
      'How does this free app make money?',
      'Our users love the product but refuse to pay — what model works?',
      'Is monetizing our data a real business or a slide-deck fantasy?',
    ],
    steps: [
      'Map the two sides precisely: the USER (gets the product, contributes usage/data) and the KEY CUSTOMER (pays, gets access to the asset the usage builds).',
      'Define the core asset: what exactly accumulates from usage — attention, intent data, behavioural patterns, a network — and verify it compounds with scale.',
      'Check the value equation for the payer: the asset must let the key customer do something (target, decide, price risk) measurably better than alternatives.',
      'Guard the balance: monetization pressure that degrades the user experience erodes the very usage that builds the asset — the model’s classic death spiral.',
      'Mind consent and regulation: data-driven asymmetric models live or die on lawful, transparent data use; a model that only works without user knowledge is a liability, not a strategy.',
    ],
    example: {
      title: 'A free personal-finance app monetizes through banks, not users',
      paragraphs: [
        'A Vietnamese startup offers a free expense-tracking app; 800,000 monthly users, zero revenue, and investor patience running out. Charging users was tested: under 1% would pay 20,000 VND a month — direct monetization is dead. The asymmetric redesign asks instead: what asset does usage build, and who would pay for it?',
        'The asset: with user consent, the app sees real income and spending patterns — exactly the data banks lack when scoring thin-file borrowers who have no credit history. The key customer: consumer-lending banks, which pay per qualified referral. A user who opts in gets pre-qualified loan offers with better rates than walk-in applicants; the bank gets applicants whose repayment capacity is visible; the app earns 300,000–500,000 VND per disbursed loan.',
        'The balance rules: offers appear only in a dedicated tab (never interrupting tracking), opt-in is explicit, and declined users see nothing again for months. Revenue reaches break-even at about 2% referral conversion — while the tracking experience that generates the data stays untouched. The case answer: the users were never the customers; they were the source of the asset.',
      ],
    },
    mistakes: [
      'Calling any free product “asymmetric” — without a compounding asset and a paying key customer, free is just unpriced.',
      'Degrading the user experience to serve the payer, which shrinks usage and starves the asset.',
      'Assuming data has buyers without validating the key customer’s value equation as rigorously as any product’s.',
      'Building on data practices users would reject if stated plainly — regulatory and trust collapse is a when, not an if.',
    ],
    diagram: {
      kind: 'stages',
      stages: [
        { label: 'Users get value free', note: 'The product serves them well — usage grows' },
        { label: 'Usage builds the asset', note: 'Data / attention / network compounds with scale' },
        { label: 'Key customer pays', note: 'A different party pays for access to the asset' },
        { label: 'Reinvest, protect balance', note: 'Monetization must never degrade the usage' },
      ],
    },
    tags: ['asymmetric', 'free', 'data monetization', 'two-sided', 'key customer'],
  },
  {
    id: 'business-competition',
    name: 'Business Competition Analysis (Overlap Lens)',
    nameEn: 'Business Competition',
    category: 'competition',
    summary:
      'A tech-era competition lens: instead of listing same-industry rivals, map who overlaps you on four dimensions — customers, technology, distribution, and financial model — and watch for industries converging on your space. Your next competitor rarely looks like you today.',
    whenToUse:
      'When a case asks “who do we actually compete with?” in a fluid, tech-driven market — or when a client is losing share to players its industry reports don’t even track.',
    triggers: [
      'Who are our real competitors, beyond the obvious ones?',
      'A company from a different industry just entered our space — how do we see the next one coming?',
      'Why is our share shrinking when no direct rival is growing?',
    ],
    steps: [
      'Customer overlap: who else is winning the same customer’s time, money, or decision — regardless of industry label? Budget and attention are the scarce resources.',
      'Technology overlap: who owns capabilities (data, platforms, algorithms) that could serve your customers’ need with a different product shape?',
      'Distribution overlap: who already owns a channel or relationship into your customer base that your offer could ride — or theirs could?',
      'Financial-model overlap: who can serve your customer at a different cost structure — subsidized, bundled, or free — that your P&L cannot follow?',
      'Project the intersections: which adjacent players overlap on two or more dimensions today? Those are the likely entrants — decide whether to partner, pre-empt, or defend.',
    ],
    example: {
      title: 'A convenience-store chain maps its real rivals',
      paragraphs: [
        'A Vietnamese convenience chain benchmarks itself against other convenience chains and finds itself winning — yet basket counts fall every quarter. The overlap lens redraws the field. Customer overlap: the same young urban customer now orders late-night snacks through delivery super-apps without leaving home; the chain competes with a logistics network, not another store format.',
        'Technology overlap: the super-apps’ order data lets them predict demand block by block and stock dark stores accordingly. Distribution overlap: the chain’s 600 storefronts are, seen differently, a fulfilment network the apps lack. Financial-model overlap is the alarming one: the apps monetize through commissions and advertising, so they can price delivery below cost in a way store economics cannot match.',
        'The response follows from the map: stop out-discounting (a financial-model fight the chain loses), and instead trade its distribution asset — become the apps’ pickup and 15-minute-fulfilment partner while building its own app only for loyalty, not delivery. Eighteen months later, the partnered stores’ revenue is up 23%, with the apps funding the demand generation. The insight came from mapping overlaps, not industry codes.',
      ],
    },
    mistakes: [
      'Defining competitors by industry classification, which is exactly how convergence blindsides incumbents.',
      'Tracking only product substitutes and missing financial-model competition (free, bundled, subsidized).',
      'Treating every overlap as a threat — overlaps in distribution or technology are often the best partnership candidates.',
      'Doing the exercise once; overlap maps age quickly in tech-driven markets and need a scheduled refresh.',
    ],
    diagram: {
      kind: 'hub',
      center: 'Who really competes?',
      nodes: [
        { label: 'Customer overlap', note: 'Same time, money, decision — any industry' },
        { label: 'Technology overlap', note: 'Capabilities that could serve your customer' },
        { label: 'Distribution overlap', note: 'Who owns a channel into your base' },
        { label: 'Financial overlap', note: 'Different cost structure, same customer' },
        { label: 'Future intersections', note: 'Adjacent players converging on your space' },
      ],
    },
    tags: ['competition', 'convergence', 'overlaps', 'disruption', 'competitive analysis'],
  },
  {
    id: 'technological-modeling',
    name: 'Technological Modeling (Barbell Innovation)',
    nameEn: 'Technological Modeling',
    category: 'innovation',
    summary:
      'A discipline for structuring innovation like a barbell: most resources sustain continuous, incremental improvement of the core product, while a deliberate minority funds breakthrough bets that could redefine the business. It prevents both stagnation and reckless moonshotting.',
    whenToUse:
      'When a case involves R&D budget allocation, a company whose product is being commoditized, or a client debating “optimize what we have” versus “bet on the next thing” — the answer is a structured both.',
    triggers: [
      'How should we split the R&D budget between core and new bets?',
      'Our product improves every year, yet the category is commoditizing — what now?',
      'Should we chase this breakthrough technology or keep improving the core?',
    ],
    steps: [
      'Anchor the core side: which incremental improvements (cost, quality, speed) keep the current product competitively fresh, funded as a steady pipeline with near-term ROI metrics?',
      'Ring-fence the bet side: a fixed minority share (often ~10–20%) for technologies that could obsolete or leapfrog the core — protected from quarterly raids.',
      'Manage the two sides on different metrics: the core on margin contribution and cycle time; the bets on learning milestones and option value, never on this year’s revenue.',
      'Set graduation and kill rules for bets: what evidence promotes a bet toward the core roadmap, and what kills it? Zombie projects are the barbell’s failure mode.',
      'Revisit the split as the industry clock speeds up: the faster the category’s technology shifts, the heavier the bet side must become.',
    ],
    example: {
      title: 'An ERP software firm balances core upgrades against an AI bet',
      paragraphs: [
        'A Vietnamese ERP vendor serving manufacturers spends 100% of engineering on customer-requested features. Revenue is stable, but two signals worry the CEO: deal sizes are shrinking, and prospects keep asking whether the product “has AI”. All-incremental innovation has kept the product fresh and the company strategically frozen.',
        'The barbell restructure: 85% of engineering stays on the core — the feature pipeline plus performance work that protects renewals. 15% is ring-fenced for one breakthrough bet: an AI agent that reads a factory’s ERP data and answers operational questions in plain language (“why did line 2’s cost per unit jump last week?”). The bet team is exempt from feature requests and measured on learning milestones: accuracy on real customer data, then willingness-to-pay in pilots.',
        'Two quarters in, milestone two produces the decisive learning: customers won’t pay for the agent alone — but pilots renew the underlying ERP at twice the normal upgrade rate, because the agent makes the old system feel new. The bet graduates into the core roadmap as a retention weapon rather than a standalone product. The barbell’s value: the company found this out with 15% of its capacity, while 85% kept the cash engine running.',
      ],
    },
    mistakes: [
      'Spending 100% on incremental work — competitively fresh, strategically frozen — until a platform shift arrives.',
      'Judging breakthrough bets on this year’s revenue, which guarantees they are killed exactly when they need patience.',
      'Letting the bet side swell into unfocused moonshots while the core product decays and funds nothing.',
      'Keeping zombie bets alive without graduation/kill criteria — the discipline is in the rules, not the ratio.',
    ],
    diagram: {
      kind: 'partition',
      whole: 'R&D / innovation capacity',
      parts: ['~85% — continuous improvement of the core', '~15% — protected breakthrough bets'],
    },
    tags: ['technological modeling', 'barbell', 'R&D allocation', 'breakthrough', 'incremental'],
  },
  {
    id: 'transitional-business-models',
    name: 'Transitional Business Models',
    nameEn: 'Transitional Business Models',
    category: 'bizmodel',
    summary:
      'A deliberately temporary model used to enter a market: win a narrow niche first to prove the idea, generate cash, and learn — while explicitly designing the transition to the scalable long-term model. The niche is the bridge, not the destination.',
    whenToUse:
      'When a case involves entering a market too early or too expensively for the end-state model to work yet — and you must design what to monetize FIRST and how that funds and de-risks the real ambition.',
    triggers: [
      'The long-term market isn’t ready — how do we survive until it is?',
      'How do we fund the big vision without raising huge capital now?',
      'Which beachhead should we take first, and how do we get from there to scale?',
    ],
    steps: [
      'Define the end-state model honestly: who the mass customer is, what you sell them, and why that model doesn’t work TODAY (cost, infrastructure, behaviour, regulation).',
      'Choose a transitional niche where a version of the product is viable now: customers with acute need, willingness to pay, and low acquisition cost.',
      'Design the bridge explicitly: what the niche phase must produce — cash flow, proof points, data, capabilities, brand — that the end-state model will need.',
      'Set the transition triggers: which observable conditions (cost curves, adoption rates, regulation) signal it is time to shift, and what gets rebuilt versus reused.',
      'Protect against niche capture: comfortable niche profits tempt companies to stay forever — keep the end-state model on the board agenda with dated checkpoints.',
    ],
    example: {
      title: 'An EV-charging startup earns its way to the consumer network',
      paragraphs: [
        'A startup’s vision is a nationwide consumer EV-charging network — but today’s consumer EV base is too thin to pay for one. The end-state model fails now on utilization: a public charger needs sessions it cannot yet get. The transitional niche: electric delivery and taxi fleets, which charge predictably, at depots, every day — utilization guaranteed by contract.',
        'The bridge design: fleet-depot contracts produce (1) cash flow that funds hardware iteration, (2) reliability data across thousands of charge cycles — exactly what mall landlords and banks will demand later, (3) a hardened operations team, and (4) negotiating credibility. None of this is a detour; each item is a required input to the consumer network.',
        'Transition triggers set in advance: when consumer EVs pass a defined registration threshold in the top four cities AND average public-charger utilization at pilot sites exceeds 25%, the company shifts investment from depots to public locations — reusing the hardware platform and operations playbook, replacing the sales motion. Three years later the consumer network launches profitably against undercapitalized rivals who had waited for the market — funded by the niche they had dismissed as small.',
      ],
    },
    mistakes: [
      'Treating the niche as the whole strategy and never designing the bridge — transitional means the transition is planned.',
      'Picking a convenient niche that produces cash but none of the proof, data, or capabilities the end-state needs.',
      'Leaving the transition timing to instinct instead of preset observable triggers.',
      'Getting captured by comfortable niche profits until a bolder competitor jumps straight to the end-state model.',
    ],
    diagram: {
      kind: 'stages',
      stages: [
        { label: 'Define the end state', note: 'The scalable model — and why it fails today' },
        { label: 'Win a viable niche', note: 'Acute need, willing to pay, cheap to reach' },
        { label: 'Build the bridge', note: 'Cash, proof, data, capabilities the end state needs' },
        { label: 'Hit the triggers', note: 'Preset conditions that start the transition' },
        { label: 'Transition & scale', note: 'Reuse the platform, replace what the niche outgrew' },
      ],
    },
    tags: ['transitional model', 'beachhead', 'niche', 'market entry', 'scaling path'],
  },
  {
    id: 'business-scaling',
    name: 'Business Scaling (& Market Expansion)',
    nameEn: 'Business Scaling Framework',
    category: 'growth',
    summary:
      'The process of transforming a niche-validated product into a business serving wider and wider segments — keeping product, business model, and organizational design aligned at every stage of expansion. Most scaling failures are alignment failures, not demand failures.',
    whenToUse:
      'When a case involves a business that works beautifully small and must grow — multi-city expansion, franchising, moving from early adopters to the mainstream — and you must find what breaks at the next size.',
    triggers: [
      'It works in one city — how do we take it national?',
      'Growth stalled right after our expansion — what broke?',
      'What must change about the company itself as we scale?',
    ],
    steps: [
      'Verify the foundation: is the niche truly won — retention, unit economics, and demand pull — or is expansion about to photocopy an unproven model?',
      'Decide the expansion vector (the market-expansion question): adjacent geographies, adjacent segments, or adjacent products — ranked by how much of the proven model each reuses.',
      'Re-test the model per new segment: mainstream customers need more convenience and reassurance than early adopters; price, product, and message rarely transfer unchanged.',
      'Align the organization to the new scale: what ran on the founder’s presence must become process, training, and delegated authority — decide what is standardized versus locally adapted.',
      'Scale in waves, not leaps: each wave (3 cities, then 10) must prove the playbook and the management layer before the next — growth that outruns organizational capacity destroys the quality that created the demand.',
    ],
    example: {
      title: 'A Da Nang milk-tea brand goes national without dying of success',
      paragraphs: [
        'A milk-tea brand with three cult-favourite stores in Da Nang wants 100 stores nationally. The foundation check passes: 40% of customers visit weekly, store-level margin is 22%, and queues form without advertising. But the scaling audit finds the model is founder-dependent — the owner personally trains every barista and tastes every batch of syrup.',
        'The alignment work before expansion: the syrup recipes move to a central kitchen (standardized), the training becomes a 3-week certification program with a mystery-shopper QA loop (process replaces presence), and the menu is cut from 42 drinks to 18 — the long tail added complexity that only the founder’s supervision had held together. Expansion vector: company-owned stores in Hue and Quy Nhon first (similar customers, close logistics), franchising only after the playbook survives cities without the founder.',
        'The first wave exposes what the audit missed — delivery platforms are 45% of orders in new cities versus 15% in Da Nang, so packaging and drink stability get re-engineered before wave two. By store 60, the founder’s job has changed from making tea to running a system that makes tea — which is the actual product being scaled.',
      ],
    },
    mistakes: [
      'Scaling before the niche is truly won, which multiplies an unproven model across expensive new markets.',
      'Assuming early-adopter love transfers to the mainstream — each new segment re-tests the product.',
      'Growing the footprint faster than the management layer, so quality collapses exactly where new customers meet the brand.',
      'Standardizing everything or localizing everything — scaling is deciding which is which, explicitly.',
    ],
    diagram: {
      kind: 'stages',
      stages: [
        { label: 'Win the niche', note: 'Retention, unit economics, demand pull proven' },
        { label: 'Pick the vector', note: 'Geography, segment, or product — by model reuse' },
        { label: 'Re-test per segment', note: 'Mainstream ≠ early adopters' },
        { label: 'Align the organization', note: 'Process replaces founder presence' },
        { label: 'Scale in waves', note: 'Prove each wave before funding the next' },
      ],
    },
    tags: ['scaling', 'expansion', 'franchise', 'alignment', 'growth stages'],
  },
  {
    id: 'growth-matrix',
    name: 'Growth Matrix (Gain · Expand · Extend · Reinvent)',
    nameEn: 'FourWeekMBA Growth Matrix',
    category: 'growth',
    summary:
      'A 2×2 that generates growth options by crossing customers (existing vs new) with PROBLEMS solved (existing vs new): Gain, Expand, Extend, Reinvent. Framing growth around problems rather than products surfaces options the Ansoff matrix tends to miss.',
    whenToUse:
      'When a case asks where growth should come from and you want a fast, problem-centric enumeration — especially for services and digital products where “new problem for the same customer” is the richest quadrant.',
    triggers: [
      'Map our growth options for the next three years.',
      'What else could we solve for the customers we already have?',
      'Should we go deeper with current customers or wider to new ones?',
    ],
    steps: [
      'Gain (existing problems, existing customers): win more of the job you already do — share of wallet, usage frequency, win-back of churned users. Cheapest growth; audit it first.',
      'Expand (existing problems, new customers): take the proven solution to people who have the same problem but aren’t served yet — new segments, regions, or price tiers.',
      'Extend (new problems, existing customers): use earned trust and data to solve the customer’s neighbouring problems — usually the highest-margin quadrant because acquisition is already paid for.',
      'Reinvent (new problems, new customers): a genuinely new business — highest risk, justified only by a strong strategic reason or a dying core.',
      'Size all four before choosing, and sequence them: Gain funds Expand; Extend deepens the moat that makes Reinvent survivable.',
    ],
    example: {
      title: 'An accounting firm maps growth beyond bookkeeping',
      paragraphs: [
        'A 40-person accounting firm serving 300 small businesses in Hanoi wants to double revenue. The matrix walk: Gain — 120 of its clients buy only year-end services; moving half of them to monthly bookkeeping is 25% revenue growth with zero acquisition cost. Expand — the same bookkeeping offer fits e-commerce sellers, an underserved segment two hours of tailoring away.',
        'Extend is the eye-opener: clients already trust the firm with their most sensitive numbers, and their neighbouring problems are visible in those numbers — cash-flow forecasting, loan-application preparation, payroll compliance. Priced as add-ons, these carry 60%+ margins because the relationship and the data are already in place. Reinvent — building accounting software — is parked: no strategic pressure forces it, and the firm lacks the capability.',
        'The sequenced plan: Gain now (a conversion campaign for annual-only clients), Expand in quarter two (e-commerce package), Extend through the year (forecasting first, since loan season creates natural demand). Projected growth: 85% over two years, three quarters of it from customers the firm already had — the matrix’s recurring lesson.',
      ],
    },
    mistakes: [
      'Jumping to Reinvent because it sounds visionary while the Gain quadrant still holds cheap, unclaimed growth.',
      'Thinking in products instead of problems — the matrix’s power is asking what else the customer struggles with.',
      'Treating the quadrants as equal bets: risk and cost of acquisition rise sharply toward Reinvent.',
      'Choosing quadrants without sizing them, which turns strategy into a vote for the most exciting-sounding word.',
    ],
    diagram: {
      kind: 'matrix',
      xLabel: 'Problems solved',
      yLabel: 'Customers',
      xLow: 'Existing problems',
      xHigh: 'New problems',
      yLow: 'Existing customers',
      yHigh: 'New customers',
      cells: [
        { label: 'Expand', note: 'Proven solution, new customers — segments, regions, tiers.' },
        { label: 'Reinvent', note: 'New problems, new customers — a new business; highest risk.' },
        { label: 'Gain', note: 'More of the job you already do — cheapest growth, audit first.' },
        { label: 'Extend', note: 'Solve neighbouring problems for customers who trust you.' },
      ],
    },
    tags: ['growth matrix', 'gain expand extend reinvent', 'growth options', 'problems', 'segments'],
  },
  {
    id: 'revenue-streams-matrix',
    name: 'Revenue Streams Matrix (& Revenue Modeling)',
    nameEn: 'Revenue Streams Matrix',
    category: 'bizmodel',
    summary:
      'A revenue-modeling tool that classifies each revenue stream on two dimensions: how FREQUENTLY the customer transacts (one-off vs recurring) and how much you OWN the customer relationship (direct vs mediated by a platform). Recurring, owned revenue is the most valuable and most defensible kind.',
    whenToUse:
      'When a case involves redesigning how a business earns — lumpy or unpredictable revenue, dangerous dependence on a platform or single buyer, or a valuation question where revenue QUALITY matters as much as quantity.',
    triggers: [
      'Our revenue is lumpy and unpredictable — how do we fix the model?',
      'Most of our sales come through one marketplace — how risky is that?',
      'Which revenue streams should we build to raise the company’s value?',
    ],
    steps: [
      'Inventory every revenue stream and place it on the matrix: frequency of transaction (one-off → recurring) versus ownership of the customer interaction (platform-mediated → direct).',
      'Score the quality gradient: recurring + owned (subscriptions, retainers) is most valuable; one-off + mediated (marketplace transactions) is least — lowest predictability, highest dependency.',
      'Quantify the risk concentrations: what share of revenue sits in mediated cells, and what happens to it if the platform changes its fees or algorithm?',
      'Design migration paths: convert one-off buyers into recurring relationships (contracts, subscriptions, memberships), and mediated customers into owned ones (capture the relationship legally and gently).',
      'Reprice as you migrate — recurring revenue is worth more per dong to a buyer or investor, and the pricing model (retainer vs project, subscription vs unit) should reflect the value of predictability.',
    ],
    example: {
      title: 'A design agency escapes the project-revenue treadmill',
      paragraphs: [
        'A 15-person branding agency in Ho Chi Minh City earns 90% of revenue from one-off projects, a third of them won through a freelancing marketplace that takes 15% and owns the client relationship. Every January the revenue counter resets to zero, hiring is impossible to plan, and a marketplace algorithm change once halved inbound leads overnight.',
        'The matrix placement makes the problem visible: almost everything sits in the worst cells — one-off, and partly mediated. The migration design: (1) every completed branding project gets a proposed “brand guardianship” retainer — monthly design support, asset management, campaign adaptation — moving clients from one-off/owned to recurring/owned; (2) marketplace clients are served impeccably and then offered direct engagement on renewal, converting mediated to owned.',
        'Eighteen months later: 14 retainer clients cover 65% of fixed costs before the year begins, marketplace dependence is down to 10% of revenue, and the agency’s owner can decline bad-fit projects for the first time. Same craft, same team — the revenue MODEL, not the revenue amount, changed the business. That distinction is the whole point of revenue modeling.',
      ],
    },
    mistakes: [
      'Optimizing revenue volume while ignoring revenue quality — 100 units recurring and owned is worth far more than 120 lumpy and mediated.',
      'Treating platform-mediated revenue as “ours” when the platform owns the customer, the data, and the terms.',
      'Bolting on a subscription nobody asked for — recurring models must package genuinely recurring value.',
      'Migrating so aggressively off a platform that you violate its terms before the direct channel can stand on its own.',
    ],
    diagram: {
      kind: 'matrix',
      xLabel: 'Ownership of the customer interaction',
      yLabel: 'Frequency of transactions',
      xLow: 'Platform-mediated',
      xHigh: 'Direct / owned',
      yLow: 'One-off',
      yHigh: 'Recurring',
      cells: [
        { label: 'Rented recurring', note: 'Repeat sales on someone else’s platform — steady but dependent.' },
        { label: 'Owned recurring', note: 'Subscriptions, retainers — the most valuable revenue there is.' },
        { label: 'Rented one-off', note: 'Marketplace transactions — least predictable, most fragile.' },
        { label: 'Owned one-off', note: 'Direct project sales — good margins, resets every year.' },
      ],
    },
    tags: ['revenue streams', 'revenue model', 'recurring', 'platform dependency', 'monetization'],
  },
];

/** Strip Vietnamese diacritics so accent-free queries still match (typing 'loi nhuan' finds 'lợi nhuận'). */
function normalize(value: string): string {
  const lowered = String(value || '').toLowerCase().normalize('NFD');
  let out = '';
  for (const ch of lowered) {
    const code = ch.codePointAt(0) || 0;
    // Drop all tone and accent marks (the Combining Diacritical Marks block).
    if (code >= 0x0300 && code <= 0x036f) continue;
    out += ch === 'đ' ? 'd' : ch;
  }
  return out.trim();
}

/**
 * Filter the framework set by keyword and category. Keywords are matched
 * against the names, summary, when-to-use, trigger questions, and tags — so
 * typing 'price cut' or 'market entry' both land on the right framework.
 */
export function searchFrameworks(query: string, category = 'all'): ConsultingFramework[] {
  const q = normalize(query);
  const tokens = q.split(' ').filter(Boolean);
  return CONSULTING_FRAMEWORKS.filter((framework) => {
    if (category !== 'all' && framework.category !== category) return false;
    if (tokens.length === 0) return true;
    const haystack = normalize(
      [
        framework.name,
        framework.nameEn,
        framework.summary,
        framework.whenToUse,
        framework.triggers.join(' '),
        framework.tags.join(' '),
      ].join(' '),
    );
    return tokens.every((token) => haystack.includes(token));
  });
}

export function frameworkById(id: string): ConsultingFramework | null {
  return CONSULTING_FRAMEWORKS.find((framework) => framework.id === id) || null;
}

/** Suggest the frameworks that fit a case type (links the Toolkit to Case Pool). */
export function frameworksForCaseType(caseType: string): ConsultingFramework[] {
  const map: Record<string, string[]> = {
    profitability: ['profitability-tree', 'issue-tree', 'value-chain', 'value-stream-mapping'],
    growth: ['market-entry', 'ansoff-matrix', '4cs', 'market-sizing', 'growth-matrix', 'mckinsey-seven-degrees'],
    operations: ['value-chain', 'issue-tree', 'mece', 'business-analysis', 'value-stream-mapping'],
    strategy: ['porter-5-forces', 'bcg-matrix', 'swot', 'porters-generic-strategies', 'blue-ocean-strategy'],
    mna: ['cost-benefit-npv', 'mckinsey-7s', 'value-chain', 'ge-mckinsey-matrix'],
    other: ['pricing-strategies', 'mckinsey-7s', 'revenue-streams-matrix'],
  };
  const ids = map[caseType] || ['mece', 'issue-tree'];
  return ids.map((id) => frameworkById(id)).filter((item): item is ConsultingFramework => item !== null);
}
