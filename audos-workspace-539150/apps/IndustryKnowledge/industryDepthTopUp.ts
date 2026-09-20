// Phase 2 balance pack — top-up cards so that every topic group inside every industry deck
// renders with at least three cards. Without these, chapters such as Surprising Insights would
// open with a single card in some decks, which reads as an unfinished section rather than a chapter.

import type { DepthCard } from './industryDepthTypes';

export const TECH_TOPUP_CARDS: DepthCard[] = [
  {
    module: 9, topic: 'surprising', emoji: '💬', type: 'fact',
    title: 'Vietnam is a Zalo country, not a WhatsApp country',
    front: 'Almost every global assumption about Vietnamese consumer behaviour breaks on messaging. Getting this right immediately signals local knowledge.',
    back: [
      'Zalo, built by VNG, is the default messaging surface for everyday Vietnamese communication — which is why brands, banks, government services and shops all run customer contact through it rather than through global messengers.',
      'That has a direct commercial consequence: an app-only strategy that ignores Zalo as a distribution and support channel is starting a lap behind.',
      'The same pattern repeats elsewhere: local platforms hold habits that global brands assume they own, which is why VNG could extend from games and messaging into payments and cloud.',
      'The interview point to make: in Vietnam, distribution is frequently local even when the technology is global. Check where the habit already lives before designing an acquisition plan.',
    ],
  },
  {
    module: 9, topic: 'surprising', emoji: '🧩', type: 'fact',
    title: 'Most “tech jobs” in Vietnam are not at tech companies',
    front: 'Candidates fixate on Shopee, MoMo and VNG. The larger share of technology work sits inside banks, manufacturers, retailers and services firms.',
    back: [
      'Banks are among the largest technology employers: Techcombank Future Gen runs dedicated Technology and Data & AI streams, and VPBank Young Talents targeted IT, computer science, data science and AI/ML graduates specifically.',
      'IT services is the volume employer. FPT alone generated VND35,382 billion of global IT revenue in FY2025, delivered by engineers working on overseas clients’ systems rather than on a consumer product.',
      'Manufacturing runs serious technical work too: Samsung’s Vietnamese R&D centre employs roughly 2,400 engineers, and semiconductor back-end plants need process, test and data engineers.',
      'Practical implication: apply across sectors with one portfolio. The technical bar is often comparable while competition per seat is far lower outside the famous consumer platforms.',
    ],
  },
];

export const RETAIL_TOPUP_CARDS: DepthCard[] = [
  {
    module: 9, topic: 'surprising', emoji: '🌊', type: 'fact',
    title: 'The wet market is still the real competitor',
    front: 'Modern-trade strategy decks usually benchmark against other chains. The share that is actually being fought over sits in traditional markets and street vendors.',
    back: [
      'Vietnam still has more than 8,300 markets and roughly 1.4 million small stores, and modern trade is only around 30% of retail sales — so the incumbent is informal, not corporate.',
      'Wet markets win on freshness perception, price, proximity and the ability to buy a single portion. Modern trade cannot beat that on price, so it competes on hygiene, consistency, traceability, comfort and convenience.',
      'This is why fresh food is the strategic battleground in Vietnamese grocery: whoever wins the daily fresh trip wins the frequency, and frequency is what makes a minimart viable.',
      'The case discipline: when sizing a modern-trade opportunity, model conversion from traditional trade explicitly rather than assuming market growth will do the work.',
    ],
  },
];

export const MANUFACTURING_TOPUP_CARDS: DepthCard[] = [
  {
    module: 8, topic: 'marketing-sales', emoji: '🔎', type: 'concept',
    title: 'Key account management in an industrial business',
    front: 'A factory often has a handful of customers who each represent a large share of revenue. Managing that concentration is a commercial discipline of its own.',
    back: [
      'Concentration is the defining risk: losing one anchor customer can idle a line, so account management is about protecting utilisation as much as growing revenue.',
      'The relationship is technical, not transactional. Quality engineers, planners and account managers all talk to their counterparts, so a problem escalates through several channels at once.',
      'Annual price-down clauses are standard, so the account plan must include a matching cost-reduction pipeline — yield, material substitution, automation — agreed before the negotiation, not after.',
      'Growth usually comes from share of wallet rather than new logos: more parts for the same customer, a second plant location, or moving up from component to sub-assembly.',
      'The metric that matters: contribution margin by customer after freight, quality cost and inventory carried on their behalf — not headline revenue.',
    ],
  },
  {
    module: 9, topic: 'surprising', emoji: '⚡', type: 'fact',
    title: 'Power, not wages, is the constraint people miss',
    front: 'Candidates discuss labour cost. Plant managers and investors discuss electricity, and it is a more decisive variable for the next wave of Vietnamese industry.',
    back: [
      'Semiconductor back-end plants, data centres and modern electronics lines need large, uninterrupted and increasingly clean power — a very different requirement from a garment factory.',
      'This is why announced AI data-centre investment exceeding USD7 billion and the semiconductor build-out are as much energy stories as technology stories.',
      'Corporate customers increasingly want renewable supply specifically, through rooftop solar and power-purchase arrangements, because their own emissions reporting depends on it.',
      'The interview line: Vietnam’s move up the value chain is gated by engineering talent depth and power reliability, not by wage competitiveness — which is a more informed answer than the usual one.',
    ],
  },
  {
    module: 9, topic: 'surprising', emoji: '🔌', type: 'fact',
    title: 'The supplier tier below tier one is where the gap is',
    front: 'Vietnam has thousands of factories and comparatively few Vietnamese-owned suppliers deep in a global value chain. Understanding that gap is the whole localisation debate.',
    back: [
      'Tier one suppliers to an anchor customer such as Samsung are often themselves foreign-invested, following their client into the market rather than being developed locally.',
      'Below that, tier two and tier three — precision components, specialty materials, chemicals, tooling — remain thin, so much of what a Vietnamese plant converts is imported.',
      'That is the mechanism behind high gross exports and thinner domestic value added: USD106 billion of electronics exports in 2025 does not mean USD106 billion of Vietnamese value.',
      'Where a graduate can genuinely contribute: supplier development programmes that qualify domestic vendors against quality, cost and delivery standards — unglamorous work with real national consequence.',
    ],
  },
];

export const CONSULTING_TOPUP_CARDS: DepthCard[] = [
  {
    module: 9, topic: 'surprising', emoji: '🚪', type: 'fact',
    title: 'The exit is the product, and everyone knows it',
    front: 'Consulting firms hire knowing most juniors will leave, and that is not a failure of the model — it is the model. Understanding this changes how you should choose a firm.',
    back: [
      'The pyramid requires attrition. There are far more analyst seats than partner seats, so a firm that retained everyone would break its own leverage economics within a few years.',
      'Firms therefore compete on where you go next: alumni networks, exit placement into corporate strategy, private equity, startups and in-house transformation teams are part of the offer.',
      'For a Vietnamese candidate this is unusually valuable, because the alumni network reaches into banks, conglomerates and funds that hire almost entirely through relationships.',
      'The question to ask in interview, which almost nobody does: where did the last three people at my level go, and did the firm help them get there?',
    ],
  },
];

export const LOGISTICS_TOPUP_CARDS: DepthCard[] = [
  {
    module: 9, topic: 'surprising', emoji: '💵', type: 'fact',
    title: 'Cash on delivery makes Vietnamese last mile a banking problem',
    front: 'A large share of Vietnamese e-commerce orders are still paid in cash when the parcel arrives, and that single habit reshapes the whole delivery economics.',
    back: [
      'The rider becomes a cash collector: money must be counted, reconciled and remitted, which adds handling cost, float, and a genuine fraud and loss risk that a card-paid market never has.',
      'Refusal risk rises sharply. A buyer who has not paid can simply decline the parcel at the door, so failed first-attempt deliveries and returns are structurally higher — and each failure duplicates the entire delivery cost.',
      'Returns are therefore a major cost line rather than an edge case, which is why carriers invest so heavily in returns handling and why merchants push prepayment incentives.',
      'The strategic link worth naming: the shift toward digital payments is not only a fintech story. Every point of prepayment adoption directly improves last-mile cost per parcel.',
    ],
  },
  {
    module: 9, topic: 'surprising', emoji: '🗺️', type: 'fact',
    title: 'Vietnam’s shape is a logistics cost, not a map fact',
    front: 'The country is long and narrow with economic weight at both ends. That geography explains a surprising amount of the national logistics cost problem.',
    back: [
      'The two demand centres, Hanoi in the north and Ho Chi Minh City in the south, are separated by well over 1,500 kilometres of road, so domestic trunk haulage is long-distance by default.',
      'That creates the empty-backhaul problem: freight flows are unbalanced, so a truck loaded in one direction frequently returns with nothing while still burning fuel, driver hours and depreciation.',
      'It is also why coastal shipping and inland waterways matter more here than in a compact market — barge and coastal routes are cheaper per tonne-kilometre than road for the long north-south leg.',
      'Put together with congestion around gateway ports, this is a large part of why logistics costs run at 16-20% of GDP against a global average near 10%.',
    ],
  },
];

export const TOBACCO_TOPUP_CARDS: DepthCard[] = [
  {
    module: 7, topic: 'rnd-product', emoji: '🌿', type: 'concept',
    title: 'Leaf science: the agricultural R&D nobody mentions',
    front: 'Because the consumer-facing side of this category is closed, the genuine technical work sits upstream in agronomy — and it is a real scientific discipline.',
    back: [
      'Variety selection and seed programmes determine leaf chemistry, disease resistance and yield, and are matched to specific growing regions such as Tay Ninh, Gia Lai, Cao Bang and Lang Son.',
      'Agronomy support to contract farmers covers soil management, fertiliser regimes, pest control and harvest timing — all of which change the chemistry of the leaf that arrives at the plant.',
      'Curing method and control is the decisive post-harvest step: temperature and humidity profiles set colour, sugar and nitrogen content, and a poorly cured crop cannot be rescued downstream.',
      'Residue and contaminant testing is mandatory, so agricultural chemical use is specified and audited rather than left to the farmer.',
      'The transferable point: this is identical in structure to coffee, cocoa, tea and rice value chains, where agricultural R&D and farmer development decide product consistency.',
    ],
  },
  {
    module: 8, topic: 'rnd-product', emoji: '🏷️', type: 'fact',
    title: 'Traceability and anti-counterfeit technology',
    front: 'In a category where roughly one in seven cigarettes is untaxed, the most active technical development is not in the product — it is in proving which product is legitimate.',
    back: [
      'Tax stamps are the primary control, and their security features, serialisation and reconciliation are a genuine engineering and finance discipline rather than a printing task.',
      'Track-and-trace systems assign identifiers at production and follow product through licensed wholesale, so an inspector in a shop can establish whether a pack entered the market lawfully.',
      'The enforcement case for this is strong and geographically targeted: illicit product has been measured at roughly 13.7% of consumption with more than 84% concentrated in southern provinces bordering Cambodia.',
      'The same technology stack appears across regulated categories — alcohol, pharmaceuticals and food safety all use serialisation and traceability for exactly the same reason.',
      'Interview relevance: if asked how to respond to illicit competition, traceability plus enforcement cooperation is the lawful answer. Matching an untaxed competitor on price is not available to you.',
    ],
  },
];
