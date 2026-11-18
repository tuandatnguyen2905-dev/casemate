import type { PackagedFoodCardData } from "./packagedFoodM3Core";
import {
  chapter,
  citePfM3,
  EvidenceNote,
  pairedQuiz,
} from "./packagedFoodM3Core";

const S = {
  masanAndWinCommerce: citePfM3("pf-m03-s07"),
  modernGrocery: citePfM3("pf-m03-s08"),
} as const;

export const PACKAGED_FOOD_M3_LESSON5 = {
  id: "pf-m03-l05",
  moduleId: "pf-m03",
  lessonNumber: "3.5",
  title:
    "Distribution & Sales Channels—(1) Understanding General Trade and Modern Trade (2) Wholesale, Convenience Stores, and Digital Channels (3) Distribution Economics and Commercial Execution",
  shortTitle: "Distribution & Sales Channels",
  objective:
    "Compare general trade, modern trade, wholesale, convenience, and digital routes, then explain how channel economics shape route-to-market and execution in Vietnam.",
  sources: ["pf-m03-s07", "pf-m03-s08"],
  chapters: [
    chapter({
      id: "pf-m03-l05-c01",
      number: "3.5.1",
      title: "Understanding General Trade and Modern Trade",
      hook: "For an impulse snack, a brand that is not within reach at the moment of choice effectively does not exist.",
      objective:
        "Distinguish general trade from modern trade by outlet structure, service model, commercial terms, data, and buyer power.",
      narrative: [
        {
          label: "Core idea",
          text: "General or traditional trade consists of fragmented independent outlets such as mom-and-pop shops and wet-market sellers. Modern trade consists of organized supermarkets, hypermarkets, minimarts, and convenience chains.",
        },
        {
          label: "How it works",
          text: "General trade is usually reached through distributors and wholesalers that hold inventory, break bulk, extend credit, and service many small outlets. Modern trade is typically managed through key accounts with negotiated listings, trade terms, promotions, and shared planning.",
        },
        {
          label: "Global example",
          text: "The operating pattern is transferable across packaged-food markets: fragmented independents reward distribution breadth, while organized retail rewards key-account capability and coordinated promotion. Row 25 does not provide a quantified global GT/MT split.",
          citations: [S.modernGrocery],
        },
        {
          label: "Vietnam example",
          text: "Vietnam’s traditional channels still dominate overall according to the sector research, while modern grocery is consolidating. The top seven modern-grocery players held nearly 90% of modern-channel value in 2024; this is not 90% of total grocery.",
          citations: [S.modernGrocery],
        },
        {
          label: "MT lens",
          text: "A commercial MT should ask two different questions: “How many relevant outlets can we reach?” and “How well do we sell through once listed?” GT emphasizes productive coverage; MT emphasizes account economics and execution.",
        },
      ],
      visualKind: "packaged-food-m3-35-1",
      visual: {
        title: "Two routes to the same shopper",
        subtitle:
          "General trade and modern trade require different capabilities",
        ariaLabel:
          "Side-by-side comparison of general trade through distributors and modern trade through key accounts",
        type: "channel-compare",
        columns: [
          {
            id: "gt",
            label: "General / traditional trade",
            outletStructure: "Many fragmented independent outlets",
            route: "Manufacturer → distributor/wholesaler → outlet",
            advantages: ["breadth", "local proximity", "impulse availability"],
            frictions: [
              "service complexity",
              "inventory visibility",
              "credit risk",
            ],
            commercialOwner: "Territory sales & distributor management",
          },
          {
            id: "mt",
            label: "Modern trade",
            outletStructure: "Organized chains and concentrated accounts",
            route: "Manufacturer/key account → chain distribution → stores",
            advantages: ["scale", "data", "coordinated activation"],
            frictions: ["listing/slotting fees", "trade terms", "buyer power"],
            commercialOwner: "Key account & trade marketing",
          },
        ],
        sourceIds: ["pf-m03-s08"],
        caveat:
          "The source quantifies concentration inside modern grocery, not the total-market GT/MT value split.",
      },
      globalExample: {
        title: "A transferable channel architecture",
        body: "Across packaged food, independent outlets are commonly serviced through intermediaries, while organized chains are managed as key accounts. Row 25 provides no global channel-share statistic, so the example remains qualitative.",
        sourceIds: ["pf-m03-s08"],
      },
      vietnamExample: {
        title: "Modern grocery is concentrated, not universal",
        body: "The top seven players held nearly 90% of Vietnam modern-channel value in 2024. Traditional trade still dominated overall; the research does not quantify the overall split.",
        sourceIds: ["pf-m03-s08"],
      },
      keyTerms: [
        {
          term: "General trade (GT)",
          definition:
            "Fragmented independent retail, commonly reached through distributors and wholesalers.",
        },
        {
          term: "Modern trade (MT)",
          definition:
            "Organized retail chains such as supermarkets, hypermarkets, minimarts, and convenience stores.",
        },
        {
          term: "Key account",
          definition:
            "A major customer managed through negotiated terms, joint plans, and coordinated execution.",
        },
        {
          term: "Distribution breadth",
          definition:
            "The extent to which a product is available across relevant outlets.",
        },
      ],
      recap: [
        "GT and MT are outlet systems, not simply large versus small stores.",
        "GT depends on distributor breadth; MT depends on key-account execution.",
        "Nearly 90% refers to concentration within Vietnam modern-channel value, not all grocery.",
      ],
      deepDive: {
        title: "Why availability is an economic moat",
        body: "Packaged snacks are often low-ticket and impulse-led. A rival can win without changing preference if it is colder, closer, more visible, or simply in stock when the shopper decides.",
      },
      body: (
        <>
          <p>
            Channel strategy starts with outlet structure. A fragmented outlet
            universe needs repeatable distributor service; a concentrated chain
            needs account-level negotiation and coordinated execution.
          </p>
          <EvidenceNote sourceIds={["pf-m03-s08"]}>
            Row 25 explicitly identifies the overall Vietnam GT/MT value split
            as a research gap. Do not infer it from modern-channel
            concentration.
          </EvidenceNote>
        </>
      ),
    }),
    chapter({
      id: "pf-m03-l05-c02",
      number: "3.5.2",
      title: "Wholesale, Convenience Stores, and Digital Channels",
      hook: "The same biscuit may move by the carton through wholesale, by the unit through convenience, and by the basket through an app.",
      objective:
        "Explain the role of wholesalers, minimarts and convenience chains, e-commerce, quick-commerce, and B2B/foodservice without assuming identical economics.",
      narrative: [
        {
          label: "Core idea",
          text: "Channels perform different jobs. Wholesalers aggregate demand and break bulk; convenience and minimart formats trade on proximity and frequent missions; digital channels add searchable assortment and delivery; B2B/foodservice serves business use cases.",
        },
        {
          label: "How it works",
          text: "A manufacturer chooses channel roles by shopper mission, basket, service cost, freshness, promotional mechanics, and data needs. Omnichannel does not mean one price or one pack everywhere; pack and promotion should fit the mission.",
        },
        {
          label: "Global example",
          text: "E-commerce and quick-commerce can supplement physical distribution for packaged food, while B2B/foodservice reaches bakeries, cafés, and caterers. Row 25 identifies these channels qualitatively but provides no global or Vietnam e-commerce share.",
          citations: [S.modernGrocery],
        },
        {
          label: "Vietnam example",
          text: "WinCommerce operated 3,733 stores as of September 2024 across urban WIN and WinMart+ Rural formats. Vietcap’s report identifies minimarts as a major growth format and names WinCommerce and Bach Hoa Xanh as leading operators.",
          citations: [S.masanAndWinCommerce, S.modernGrocery],
        },
        {
          label: "MT lens",
          text: "Avoid calling every non-supermarket channel “digital.” Separate ownership of inventory, order capture, fulfillment, last mile, and shopper data. Those activities determine both economics and accountability.",
        },
      ],
      visualKind: "packaged-food-m3-35-2",
      visual: {
        title: "Channel roles by shopping mission",
        subtitle: "One portfolio, multiple service models",
        ariaLabel:
          "Matrix comparing wholesale, convenience and minimarts, digital commerce, and foodservice",
        type: "channel-matrix",
        axes: {
          columns: ["Role", "Typical mission", "Manufacturer requirement"],
          rows: [
            {
              id: "wholesale",
              label: "Wholesale",
              values: [
                "Break bulk and aggregate",
                "Retailer replenishment",
                "Distributor terms and inventory discipline",
              ],
            },
            {
              id: "convenience",
              label: "Convenience / minimart",
              values: [
                "Proximity and availability",
                "Immediate or top-up purchase",
                "Key-account, assortment, shelf, and promotion",
              ],
            },
            {
              id: "digital",
              label: "E-commerce / quick-commerce",
              values: [
                "Search, basket, and delivery",
                "Planned or urgent delivered purchase",
                "Digital content, availability, fulfillment",
              ],
            },
            {
              id: "foodservice",
              label: "B2B / foodservice",
              values: [
                "Business supply",
                "Production or menu input",
                "Specification, pack, service reliability",
              ],
            },
          ],
        },
        callout: {
          label: "WinCommerce",
          value: "3,733 stores, September 2024",
          sourceId: "pf-m03-s07",
          scope: "Corporate/Vietnam store count",
        },
        sourceIds: ["pf-m03-s07", "pf-m03-s08"],
      },
      globalExample: {
        title: "Digital is an additional route, not a free route",
        body: "E-commerce and quick-commerce can add access and data, but require content, availability, fulfillment, and last-mile choices. Row 25 does not quantify share or profitability.",
        sourceIds: ["pf-m03-s08"],
      },
      vietnamExample: {
        title: "WinCommerce’s physical network",
        body: "The reported 3,733-store footprint as of September 2024 demonstrates the scale one modern account can offer. It is a company store count, not the size of Vietnam modern trade.",
        sourceIds: ["pf-m03-s07"],
      },
      keyTerms: [
        {
          term: "Wholesaler",
          definition:
            "An intermediary that buys in larger quantities, holds inventory, and resells in smaller lots.",
        },
        {
          term: "Minimart",
          definition:
            "A compact organized grocery format focused on local proximity and frequent shopping missions.",
        },
        {
          term: "Quick-commerce",
          definition:
            "Digitally ordered retail designed around rapid local fulfillment.",
        },
        {
          term: "Omnichannel",
          definition:
            "Coordinating multiple customer and shopper routes rather than treating each as an isolated business.",
        },
      ],
      recap: [
        "Wholesale, convenience, digital, and foodservice solve different distribution jobs.",
        "WinCommerce’s 3,733 stores are a corporate/Vietnam footprint as of September 2024.",
        "Row 25 does not verify packaged-food e-commerce share or per-channel margins.",
      ],
      deepDive: {
        title: "Why pack architecture changes by channel",
        body: "An immediate convenience mission may reward a small single-serve pack, while digital delivery may favor multipacks or bundles. The principle is sound, but row 25 supplies no channel-specific pack elasticity or margin values.",
      },
      body: (
        <>
          <p>
            Channel design should trace who holds stock, who takes the order,
            who fulfills it, who serves the shopper, and who owns the data.
            Labels such as “digital” hide these economically distinct jobs.
          </p>
          <EvidenceNote sourceIds={["pf-m03-s07", "pf-m03-s08"]}>
            The evidence supports the WinCommerce store count and modern-grocery
            structure. It does not support a packaged-food e-commerce share or a
            digital profitability claim.
          </EvidenceNote>
        </>
      ),
    }),
    chapter({
      id: "pf-m03-l05-c03",
      number: "3.5.3",
      title: "Distribution Economics and Commercial Execution",
      hook: "A listing creates the right to compete; in-stock product, the correct shelf, and productive promotion create the sale.",
      objective:
        "Connect coverage, service cost, working capital, trade terms, availability, promotion, and sell-through to channel economics.",
      narrative: [
        {
          label: "Core idea",
          text: "Distribution economics balance reach against the cost and risk of service. GT can deliver breadth but adds distributor layers and credit exposure; MT can deliver scale and data but adds listing costs, negotiated trade terms, and concentrated buyer power.",
        },
        {
          label: "How it works",
          text: "Commercial execution moves from sell-in to sell-through: select outlets and assortment, secure availability, win visibility, activate promotion, replenish, and review results. Inventory pushed into a channel is not the same as shopper demand.",
        },
        {
          label: "Global example",
          text: "The general commercial mechanism applies broadly: manufacturers need route-to-market capacity for reach and trade marketing for conversion. Row 25 does not provide a global distributor-margin benchmark.",
          citations: [S.modernGrocery],
        },
        {
          label: "Vietnam example",
          text: "With nearly 90% of modern-channel value held by seven players, modern-grocery buyer power is concentrated. Manufacturers still need deep GT breadth, so the winning model is dual capability rather than an all-or-nothing channel switch.",
          citations: [S.modernGrocery],
        },
        {
          label: "MT lens",
          text: "Use a scorecard that distinguishes numeric distribution, on-shelf availability, rate of sale, trade-spend effectiveness, returns, and receivables. Never celebrate shipment volume without checking sell-through and cash.",
        },
      ],
      visualKind: "packaged-food-m3-35-3",
      visual: {
        title: "From sell-in to sell-through",
        subtitle: "Commercial execution is a closed loop",
        ariaLabel:
          "Cycle from channel strategy to listing, availability, visibility, promotion, sell-through, replenishment, and review",
        type: "execution-loop",
        steps: [
          {
            id: "strategy",
            label: "Choose channel & outlet",
            question: "Where does the target shopper buy?",
          },
          {
            id: "terms",
            label: "Agree assortment & terms",
            question: "Does expected contribution justify service cost?",
          },
          {
            id: "availability",
            label: "Deliver & stay in stock",
            question: "Is the SKU physically available?",
          },
          {
            id: "visibility",
            label: "Win shelf & visibility",
            question: "Can the shopper notice and understand it?",
          },
          {
            id: "activation",
            label: "Activate",
            question: "Does promotion create incremental sell-through?",
          },
          {
            id: "review",
            label: "Measure & replenish",
            question: "What sold, returned, and converted to cash?",
          },
        ],
        sourceIds: ["pf-m03-s08"],
        caveat:
          "No verified Vietnam channel-margin percentages are available in row 25.",
      },
      globalExample: {
        title: "Reach without execution is incomplete",
        body: "A broad route-to-market creates availability opportunities, but shelf placement, promotion, and replenishment determine sell-through. The lesson uses a qualitative operating model because no global economics benchmark is sourced.",
        sourceIds: ["pf-m03-s08"],
      },
      vietnamExample: {
        title: "Dual capability under retailer consolidation",
        body: "Vietnam requires GT distributor breadth and MT key-account strength. Nearly 90% concentration within modern-channel value makes each major account strategically important.",
        sourceIds: ["pf-m03-s08"],
      },
      keyTerms: [
        {
          term: "Sell-in",
          definition:
            "Product shipped or sold by the manufacturer into a distributor or retailer.",
        },
        {
          term: "Sell-through",
          definition:
            "Product purchased through the channel by the next customer or shopper.",
        },
        {
          term: "Trade spend",
          definition:
            "Commercial investment used for listings, terms, promotions, displays, or channel programs.",
        },
        {
          term: "Rate of sale",
          definition:
            "The speed at which a SKU sells through a store or distribution point.",
        },
        {
          term: "Route-to-market",
          definition:
            "The operating design that moves product, information, and cash between manufacturer and market.",
        },
      ],
      recap: [
        "GT trades service complexity and credit risk for breadth.",
        "MT trades concentrated buyer power and commercial terms for scale and data.",
        "Execution must connect sell-in, availability, visibility, sell-through, and cash.",
      ],
      deepDive: {
        title: "Why “more distribution” can destroy value",
        body: "An outlet can add nominal reach but lose money if order size is too small, service is too costly, trade support is excessive, or product returns. Row 25 offers no break-even threshold, so the lesson teaches the decision logic rather than a fabricated cutoff.",
      },
      body: (
        <>
          <p>
            Route-to-market is an economic system, not a delivery diagram.
            Product, information, incentives, credit, and cash move through it
            at different speeds.
          </p>
          <EvidenceNote sourceIds={["pf-m03-s08"]}>
            The nearly 90% statistic describes the share of modern-channel value
            held by the top seven players. It does not establish retailer or
            distributor margins.
          </EvidenceNote>
        </>
      ),
    }),
  ],
  quiz: [
    ...pairedQuiz({
      id: "pf-m03-l05-q01",
      prompt: "What best characterizes general trade?",
      options: [
        "Fragmented independent outlets commonly served through distributors and wholesalers",
        "Only online marketplaces",
        "A single national key account",
        "Manufacturer-owned factories",
      ],
      correctIndex: 0,
      explanation:
        "GT is defined by fragmented independent retail and an intermediary-heavy service model.",
      takeaway: "Channel classification begins with outlet structure.",
    }),
    ...pairedQuiz({
      id: "pf-m03-l05-q02",
      prompt: "What best characterizes modern trade?",
      options: [
        "Organized chains managed through key-account practices",
        "Only wet-market stalls",
        "Agricultural suppliers",
        "Contract manufacturing",
      ],
      correctIndex: 0,
      explanation:
        "Modern trade includes supermarkets, hypermarkets, minimarts, and convenience chains.",
      takeaway:
        "Modern trade concentrates commercial decisions in organized accounts.",
    }),
    ...pairedQuiz({
      id: "pf-m03-l05-q03",
      prompt: "What does the nearly 90% Vietnam statistic mean?",
      options: [
        "Top-seven players’ share of modern-channel value",
        "Modern trade’s share of all grocery",
        "WinCommerce’s share of all retail",
        "Packaged food sold online",
      ],
      correctIndex: 0,
      explanation:
        "The denominator is modern-channel value, not total grocery.",
      takeaway: "Always inspect the denominator.",
    }),
    ...pairedQuiz({
      id: "pf-m03-l05-q04",
      prompt: "What role does a wholesaler commonly perform?",
      options: [
        "Hold inventory, break bulk, and resell to smaller outlets",
        "Set food-safety law",
        "Manufacture every SKU",
        "Audit corporate margins",
      ],
      correctIndex: 0,
      explanation:
        "Wholesale bridges manufacturer-scale shipments and smaller retailer orders.",
      takeaway: "Intermediaries exist because they perform economic jobs.",
    }),
    ...pairedQuiz({
      id: "pf-m03-l05-q05",
      prompt: "How should the 3,733-store figure be described?",
      options: [
        "WinCommerce’s reported store count as of September 2024",
        "All modern stores in Vietnam",
        "All WinCommerce stores in 2025",
        "Vietnam’s convenience market share",
      ],
      correctIndex: 0,
      explanation:
        "It is a dated corporate/Vietnam footprint, not a market total.",
      takeaway: "Carry owner, geography, and date with a store count.",
    }),
    ...pairedQuiz({
      id: "pf-m03-l05-q06",
      prompt: "Which claim is not supported by row 25?",
      options: [
        "A precise packaged-food e-commerce share in Vietnam",
        "WinCommerce operated 3,733 stores in September 2024",
        "The top seven held nearly 90% of modern-channel value",
        "Traditional channels still dominated overall",
      ],
      correctIndex: 0,
      explanation:
        "The research explicitly flags packaged-food e-commerce share as a gap.",
      takeaway: "Qualitative channel growth does not prove a precise share.",
    }),
    ...pairedQuiz({
      id: "pf-m03-l05-q07",
      prompt: "What is the difference between sell-in and sell-through?",
      options: [
        "Sell-in enters the channel; sell-through reflects downstream purchase",
        "They are always identical",
        "Sell-in is digital only",
        "Sell-through is factory production",
      ],
      correctIndex: 0,
      explanation: "Shipment into a channel does not establish shopper demand.",
      takeaway: "Measure downstream movement, not just upstream shipment.",
    }),
    ...pairedQuiz({
      id: "pf-m03-l05-q08",
      prompt: "Why can modern trade increase buyer power?",
      options: [
        "Purchasing is concentrated in fewer large accounts",
        "Every store negotiates independently",
        "It removes trade terms",
        "It eliminates data",
      ],
      correctIndex: 0,
      explanation:
        "Consolidation allows major accounts to influence listings, terms, and promotion.",
      takeaway: "Retail concentration changes negotiation economics.",
    }),
    ...pairedQuiz({
      id: "pf-m03-l05-q09",
      prompt: "What is the strongest Vietnam route-to-market conclusion?",
      options: [
        "Build both GT breadth and MT key-account capability",
        "Exit GT immediately",
        "Serve only one modern chain",
        "Assume digital replaces physical retail",
      ],
      correctIndex: 0,
      explanation:
        "Traditional channels remain important while modern grocery consolidates and scales.",
      takeaway: "Vietnam requires dual channel capability.",
    }),
    ...pairedQuiz({
      id: "pf-m03-l05-q10",
      prompt:
        "Which metric best guards against celebrating unproductive distribution?",
      options: [
        "Sell-through and rate of sale alongside availability and cash",
        "Shipments alone",
        "Outlet count alone",
        "List price alone",
      ],
      correctIndex: 0,
      explanation:
        "Productive distribution converts availability into downstream demand and cash.",
      takeaway: "Coverage must be productive, not merely numeric.",
    }),
  ],
  takeaways: [
    "GT delivers fragmented reach through distributors; MT delivers organized scale through key accounts.",
    "Nearly 90% is concentration within Vietnam modern-channel value, not modern trade’s total-market share.",
    "Wholesale, convenience, digital, and foodservice perform different jobs and carry different service requirements.",
    "WinCommerce’s 3,733 stores are a dated corporate footprint, not a market total.",
    "Commercial excellence links distribution, availability, visibility, sell-through, and cash.",
  ],
} satisfies PackagedFoodCardData;

export default PACKAGED_FOOD_M3_LESSON5;
