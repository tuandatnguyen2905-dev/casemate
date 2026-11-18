import type { PackagedFoodCardData } from "./packagedFoodM3Core";
import {
  chapter,
  citePfM3,
  EvidenceNote,
  pairedQuiz,
} from "./packagedFoodM3Core";

const S = {
  mondelezResults: citePfM3("pf-m03-s01"),
  orionVietnam: citePfM3("pf-m03-s05"),
  masanResults: citePfM3("pf-m03-s07"),
  marginRatios: citePfM3("pf-m03-s10"),
} as const;

export const PACKAGED_FOOD_M3_LESSON4 = {
  id: "pf-m03-l04",
  moduleId: "pf-m03",
  lessonNumber: "3.4",
  title:
    "Revenue Streams & Cost Structure—(1) How Packaged Food Companies Earn Revenue (2) Ingredients, Manufacturing, Packaging, and Distribution Costs (3) Margins, Pricing, and Profitability Drivers",
  shortTitle: "Revenue Streams & Cost Structure",
  objective:
    "Explain how packaged-food companies turn price, volume, mix, and route-to-market choices into revenue and profit without confusing company results with industry benchmarks.",
  sources: ["pf-m03-s01", "pf-m03-s05", "pf-m03-s07", "pf-m03-s10"],
  chapters: [
    chapter({
      id: "pf-m03-l04-c01",
      number: "3.4.1",
      title: "How Packaged Food Companies Earn Revenue",
      hook: "A chocolate bar, a family biscuit pack, and a Tết gift box may share a factory, but they do not create revenue in the same way.",
      objective:
        "Decompose revenue into volume, realized price, product/channel mix, and secondary streams, then connect each lever to commercial execution.",
      narrative: [
        {
          label: "Core idea",
          text: "The main engine is branded SKU sales: units sold multiplied by the realized net price. List price alone is not revenue; pack size, promotions, discounts, returns, and channel terms affect what the manufacturer realizes.",
        },
        {
          label: "How it works",
          text: "Revenue can grow through more units, a higher realized price, or a richer mix of categories, pack formats, and channels. Secondary streams include exports, B2B or foodservice supply, and seasonal ranges such as gift boxes and mooncakes.",
        },
        {
          label: "Global example",
          text: "Mondelez reported FY2024 net revenues of US$36,441 million. Treat that as one company’s global result—not the size of the packaged-food industry. Its FY2024 chocolate revenue growth of 7.4% illustrates category growth, not a market-wide growth rate.",
          citations: [S.mondelezResults, S.marginRatios],
        },
        {
          label: "Vietnam example",
          text: "Vietnam adds pronounced seasonal and price-pack choices: affordable everyday packs can protect reach, while Tết and Mid-Autumn ranges can lift mix. Orion’s decision to hold prices flat from 2018 despite a reported ingredient-cost surge shows that management may prioritize volume and availability over an immediate price increase.",
          citations: [S.orionVietnam],
        },
        {
          label: "MT lens",
          text: "When diagnosing a sales result, separate volume, price, mix, and channel. “Revenue increased” is not enough: ask whether shoppers bought more, paid more, traded up, or shifted into a different channel or occasion.",
        },
      ],
      visualKind: "packaged-food-m3-34-1",
      visual: {
        title: "The packaged-food revenue bridge",
        subtitle: "Four questions explain most top-line movement",
        ariaLabel:
          "Flow from volume and realized price through mix and secondary revenue streams to net revenue",
        type: "driver-tree",
        nodes: [
          {
            id: "volume",
            label: "Volume",
            detail: "Units × pack size; distribution and availability matter",
          },
          {
            id: "price",
            label: "Realized price",
            detail: "List price less promotions, discounts, and trade terms",
          },
          {
            id: "mix",
            label: "Mix",
            detail: "Category, tier, pack, occasion, and channel",
          },
          {
            id: "secondary",
            label: "Secondary streams",
            detail: "Exports, B2B/foodservice, seasonal ranges",
          },
          {
            id: "revenue",
            label: "Net revenue",
            detail: "Company result; never substitute for market size",
          },
        ],
        sourceIds: ["pf-m03-s01", "pf-m03-s05", "pf-m03-s10"],
      },
      globalExample: {
        title: "Mondelez: company revenue and category growth",
        body: "FY2024 net revenue was US$36,441 million; chocolate revenue grew 7.4%. Both are corporate measures and should remain separate from industry growth or market-share claims.",
        sourceIds: ["pf-m03-s01", "pf-m03-s10"],
      },
      vietnamExample: {
        title: "Orion: price restraint as a volume choice",
        body: "VnExpress reported that Orion held prices flat from 2018 while absorbing an approximately 70% ingredient-cost rise. The source does not provide a SKU-level revenue bridge or audited margin effect.",
        sourceIds: ["pf-m03-s05"],
      },
      keyTerms: [
        {
          term: "Realized price",
          definition:
            "Revenue per unit after promotions, discounts, and commercial terms—not simply shelf or list price.",
        },
        {
          term: "Mix",
          definition:
            "The composition of sales across categories, price tiers, packs, occasions, and channels.",
        },
        {
          term: "Price-pack architecture",
          definition:
            "A portfolio of pack sizes and price points designed for different budgets and occasions.",
        },
        {
          term: "B2B/foodservice",
          definition:
            "Sales of bulk product or ingredients to businesses such as bakeries, cafés, and caterers.",
        },
      ],
      recap: [
        "Core revenue is volume × realized price, shaped by mix.",
        "Exports, B2B/foodservice, and seasonal ranges are secondary streams.",
        "Company revenue and category growth are not industry market-size measures.",
      ],
      deepDive: {
        title: "Why a price increase may not raise revenue as expected",
        body: "A higher shelf price can lift realized price, but it can also reduce units, alter pack choice, or trigger heavier promotion. The commercial question is the net effect on revenue and gross profit, not the price action in isolation.",
      },
      body: (
        <>
          <p>
            Start with a simple identity: net revenue reflects volume and
            realized price. Then add mix, because selling a different category,
            tier, pack, or channel changes average revenue even when total units
            do not.
          </p>
          <EvidenceNote sourceIds={["pf-m03-s01", "pf-m03-s10"]}>
            Mondelez figures here are corporate/global results. They are not an
            industry benchmark or a Vietnam market estimate.
          </EvidenceNote>
          <p>
            For an interview case, build a bridge in this order: volume,
            realized price, category and pack mix, channel mix, then secondary
            streams.
          </p>
        </>
      ),
    }),
    chapter({
      id: "pf-m03-l04-c02",
      number: "3.4.2",
      title: "Ingredients, Manufacturing, Packaging, and Distribution Costs",
      hook: "Two snacks with the same shelf price can have very different exposure to cocoa, flour, oil, packaging, energy, and delivery.",
      objective:
        "Map the cost stack by category and identify where commodity, conversion, packaging, and route-to-market risk enters.",
      narrative: [
        {
          label: "Core idea",
          text: "Ingredients are the pivotal variable cost, but the relevant basket changes by product: cocoa for chocolate; sugar, wheat/flour, dairy, and edible or palm oil for biscuits and candy; potatoes, corn, and frying oil for savory snacks.",
        },
        {
          label: "How it works",
          text: "After ingredients, the cost stack includes packaging, manufacturing labor and overhead, energy, warehousing, transport, distributor economics, marketing, and trade spending. Gross margin and operating margin capture different layers of this stack.",
        },
        {
          label: "Global example",
          text: "Record cocoa inflation was identified as a major pressure on Mondelez’s 2025 outlook. The evidence shows direction and company impact; it does not provide a verified percentage breakdown of cocoa, packaging, energy, or logistics costs.",
          citations: [S.mondelezResults, S.marginRatios],
        },
        {
          label: "Vietnam example",
          text: "Orion’s localization is a cost-control mechanism: local supply and local manufacturing can reduce import, foreign-exchange, and logistics exposure. The reported approximately 70% ingredient-cost surge is a company case, not an industry inflation rate.",
          citations: [S.orionVietnam],
        },
        {
          label: "MT lens",
          text: "Ask which cost is structurally important for the specific category. A cocoa response for biscuits or a flour response for chocolate is too generic; category economics come first.",
        },
      ],
      visualKind: "packaged-food-m3-34-2",
      visual: {
        title: "Category-sensitive cost stack",
        subtitle: "Do not apply one recipe economics model to every product",
        ariaLabel:
          "Layered cost stack showing category-specific ingredients followed by packaging, conversion, distribution, and commercial costs",
        type: "stack",
        layers: [
          {
            id: "ingredients",
            label: "Ingredients",
            detail:
              "Chocolate: cocoa; biscuits/candy: sugar, flour, dairy, oils; savory snacks: potato, corn, frying oil",
          },
          {
            id: "packaging",
            label: "Packaging",
            detail: "Flexible film, cartons, foil, and presentation packs",
          },
          {
            id: "conversion",
            label: "Manufacturing & energy",
            detail: "Labor, plant overhead, processing, quality, utilities",
          },
          {
            id: "route",
            label: "Logistics & distribution",
            detail: "Warehousing, transport, distributor and channel servicing",
          },
          {
            id: "commercial",
            label: "Commercial investment",
            detail: "Brand marketing, promotions, and trade spending",
          },
        ],
        sourceIds: ["pf-m03-s01", "pf-m03-s05"],
        caveat:
          "The research does not verify itemized percentage shares for these layers.",
      },
      globalExample: {
        title: "Cocoa exposure is category-specific",
        body: "Mondelez linked record cocoa inflation to its difficult 2025 outlook. This is evidence about a cocoa-exposed branded manufacturer, not a universal packaged-food cost rate.",
        sourceIds: ["pf-m03-s01", "pf-m03-s10"],
      },
      vietnamExample: {
        title: "Localization can change the cost equation",
        body: "Orion’s Vietnam case links localization and price restraint under cost pressure. The source reports an approximately 70% ingredient-cost rise but does not disclose an audited itemized cost stack.",
        sourceIds: ["pf-m03-s05"],
      },
      keyTerms: [
        {
          term: "Variable cost",
          definition:
            "A cost that generally changes with production volume, such as ingredients and much packaging.",
        },
        {
          term: "Conversion cost",
          definition:
            "The labor, energy, and factory overhead required to turn ingredients into finished goods.",
        },
        {
          term: "Commodity exposure",
          definition:
            "Sensitivity of costs to market prices for inputs such as cocoa, sugar, wheat, dairy, or oils.",
        },
        {
          term: "Localization",
          definition:
            "Using local sourcing and manufacturing to improve control, responsiveness, or cost resilience.",
        },
      ],
      recap: [
        "Ingredient exposure differs materially by category.",
        "Packaging, conversion, logistics, distribution, and commercial investment sit above ingredient cost.",
        "No verified itemized cost percentages are available in this research set.",
      ],
      deepDive: {
        title: "Gross margin is not the whole P&L",
        body: "Ingredient, packaging, and factory effects typically appear before gross profit, while selling, marketing, and corporate costs affect operating profit. Reporting definitions differ, so analysts should reconcile the company statement before comparing margins.",
      },
      body: (
        <>
          <p>
            Cost analysis starts with the recipe and pack, then follows the
            product through the plant and route to market. That sequence
            prevents a generic “raw materials went up” answer.
          </p>
          <EvidenceNote sourceIds={["pf-m03-s01", "pf-m03-s05"]}>
            Row 25 does not contain a primary-verified itemized confectionery
            cost breakdown. The visual is a qualitative stack, not a percentage
            allocation.
          </EvidenceNote>
        </>
      ),
    }),
    chapter({
      id: "pf-m03-l04-c03",
      number: "3.4.3",
      title: "Margins, Pricing, and Profitability Drivers",
      hook: "A premium brand can grow sales and still lose margin when commodity inflation outruns price, mix, and productivity.",
      objective:
        "Distinguish gross, operating, and net margin; evaluate pricing, premiumization, procurement, productivity, and localization as profit levers.",
      narrative: [
        {
          label: "Core idea",
          text: "Gross margin shows what remains after the company’s reported cost of goods; operating margin then reflects operating expenses; net margin includes financing, tax, and other below-operating effects. Definitions must be checked before comparison.",
        },
        {
          label: "How it works",
          text: "Profitability improves when realized price and favorable mix outrun input inflation, or when procurement, manufacturing, logistics, and distribution become more productive. Volume growth helps only if incremental contribution exceeds the costs required to generate it.",
        },
        {
          label: "Global example",
          text: "The secondary ratio compilation reports Mondelez gross margin at 39.12% for FY2024 and 28.38% for FY2025, with operating margin moving from 17.41% to 9.21% and net margin from 12.65% to 6.36%. These company ratios require primary 10-K reconfirmation before publication.",
          citations: [S.marginRatios],
        },
        {
          label: "Vietnam example",
          text: "Masan Consumer reported a 46.8% Q3 2024 gross profit margin alongside premiumization in convenience food and seasonings. It is a corporate/Vietnam quarterly result for a broader FMCG portfolio—not a confectionery-industry benchmark and not directly like-for-like with Mondelez.",
          citations: [S.masanResults],
        },
        {
          label: "MT lens",
          text: "A strong answer names the margin level, period, company scope, portfolio differences, and source quality before drawing a conclusion. Never present a corporate gross margin as “the industry margin.”",
        },
      ],
      visualKind: "packaged-food-m3-34-3",
      visual: {
        title: "Profitability is a bridge, not a single percentage",
        subtitle: "Separate company results, periods, and portfolio exposure",
        ariaLabel:
          "Profit bridge from revenue through cost of goods, operating expenses, and below-operating items",
        type: "waterfall",
        stages: [
          { id: "revenue", label: "Net revenue", direction: "start" },
          {
            id: "cogs",
            label: "Cost of goods",
            direction: "down",
            drivers: ["ingredients", "packaging", "conversion"],
          },
          { id: "gross", label: "Gross profit", direction: "subtotal" },
          {
            id: "opex",
            label: "Operating expenses",
            direction: "down",
            drivers: ["selling", "marketing", "administration"],
          },
          { id: "operating", label: "Operating profit", direction: "subtotal" },
          {
            id: "below",
            label: "Interest, tax & other",
            direction: "down",
          },
          { id: "net", label: "Net profit", direction: "total" },
        ],
        callouts: [
          {
            label: "Corporate/Global — Mondelez",
            value: "FY2024 gross margin 39.12%; FY2025 28.38%",
            sourceId: "pf-m03-s10",
            caveat: "Secondary ratios derived from filings; reconfirm in 10-K.",
          },
          {
            label: "Corporate/Vietnam — Masan Consumer",
            value: "Q3 2024 gross profit margin 46.8%",
            sourceId: "pf-m03-s07",
            caveat: "Quarterly broader-FMCG result; not an industry benchmark.",
          },
        ],
        sourceIds: ["pf-m03-s07", "pf-m03-s10"],
      },
      globalExample: {
        title: "Mondelez: cocoa-driven company margin compression",
        body: "The research’s secondary compilation gives FY2024/FY2025 gross, operating, and net margin ratios and attributes the pressure to cocoa inflation. Use these only with the stated source caveat.",
        sourceIds: ["pf-m03-s01", "pf-m03-s10"],
      },
      vietnamExample: {
        title: "Masan Consumer: premium mix in a broader portfolio",
        body: "A 46.8% Q3 2024 gross profit margin was reported alongside premiumization. Portfolio and period differences prevent a clean benchmark comparison with a global chocolate-heavy manufacturer.",
        sourceIds: ["pf-m03-s07"],
      },
      keyTerms: [
        {
          term: "Gross margin",
          definition:
            "Gross profit divided by revenue under the company’s reporting definitions.",
        },
        {
          term: "Operating margin",
          definition:
            "Operating profit divided by revenue after operating expenses.",
        },
        {
          term: "Net margin",
          definition:
            "Net income divided by revenue after operating and below-operating items.",
        },
        {
          term: "Premiumization",
          definition:
            "Growing value by shifting sales toward higher-priced or higher-value products and occasions.",
        },
        {
          term: "Margin benchmark",
          definition:
            "A comparable reference set; a single company result is not an industry benchmark.",
        },
      ],
      recap: [
        "Name the margin level before discussing profitability.",
        "Price, mix, procurement, productivity, and localization can offset—but do not automatically overcome—input inflation.",
        "Mondelez and Masan figures are separate corporate observations with different periods, portfolios, and evidence quality.",
      ],
      deepDive: {
        title: "Why the beverage comparator needs care",
        body: "The research lists Coca-Cola FY2024 gross margin at 61.06% and PepsiCo at 54.55% as corporate/global comparators from the same secondary compilation. They are not packaged-food industry averages; portfolio and accounting differences limit inference.",
      },
      body: (
        <>
          <p>
            Compare margin movements within one company before comparing across
            companies. Then test whether ingredient exposure, price realization,
            mix, productivity, and accounting scope explain the movement.
          </p>
          <EvidenceNote sourceIds={["pf-m03-s10"]}>
            The Mondelez ratios and beverage comparators come from a secondary
            analytics source derived from 10-K filings. Row 25 instructs
            reconfirmation against the primary filings before publication.
          </EvidenceNote>
          <EvidenceNote sourceIds={["pf-m03-s07"]}>
            Masan Consumer’s 46.8% is a Q3 2024 corporate gross profit margin
            for its broader portfolio. It is not a Vietnam confectionery
            benchmark.
          </EvidenceNote>
        </>
      ),
    }),
  ],
  quiz: [
    ...pairedQuiz({
      id: "pf-m03-l04-q01",
      prompt: "What is the best starting decomposition of branded-SKU revenue?",
      options: [
        "Units sold × realized net price, then analyze mix",
        "Market share × gross margin",
        "Factory output × list price only",
        "Advertising spend × distribution points",
      ],
      correctIndex: 0,
      explanation:
        "Realized price reflects commercial deductions, while mix explains category, pack, occasion, and channel changes.",
      takeaway: "Start with volume, realized price, and mix.",
    }),
    ...pairedQuiz({
      id: "pf-m03-l04-q02",
      prompt: "Which is a secondary revenue stream identified in the research?",
      options: [
        "Export or foodservice/B2B supply",
        "Depreciation expense",
        "Accounts payable",
        "Factory energy consumption",
      ],
      correctIndex: 0,
      explanation:
        "Exports, foodservice/B2B, and seasonal ranges supplement branded trade sales.",
      takeaway:
        "Revenue streams are not the same as cost or balance-sheet lines.",
    }),
    ...pairedQuiz({
      id: "pf-m03-l04-q03",
      prompt:
        "Which ingredient exposure is most directly associated with chocolate?",
      options: ["Cocoa", "Potato", "Corn only", "Packaging film"],
      correctIndex: 0,
      explanation:
        "Cocoa is the central commodity exposure for chocolate; other categories have different baskets.",
      takeaway: "Diagnose cost by category, not by a generic snack template.",
    }),
    ...pairedQuiz({
      id: "pf-m03-l04-q04",
      prompt: "What does the reported ~70% Orion figure represent?",
      options: [
        "An approximate company ingredient-cost surge absorbed while prices were held flat",
        "Vietnam confectionery gross margin",
        "Orion market share",
        "An industry-wide logistics cost",
      ],
      correctIndex: 0,
      explanation:
        "The secondary source describes Orion’s company experience; it is not an industry rate.",
      takeaway: "Keep company cases separate from market benchmarks.",
    }),
    ...pairedQuiz({
      id: "pf-m03-l04-q05",
      prompt: "Which statement about the cost-stack visual is accurate?",
      options: [
        "It is qualitative because row 25 has no verified itemized cost percentages",
        "It proves packaging is exactly 20% of sales",
        "It gives a universal cost allocation for all snacks",
        "It excludes route-to-market costs",
      ],
      correctIndex: 0,
      explanation:
        "The research explicitly identifies itemized cost percentages as a gap.",
      takeaway:
        "Do not convert qualitative ordering into invented percentages.",
    }),
    ...pairedQuiz({
      id: "pf-m03-l04-q06",
      prompt: "What does gross margin measure most directly?",
      options: [
        "Gross profit as a share of revenue under the company’s definitions",
        "Net income before tax as a share of assets",
        "Market size less distribution",
        "Revenue growth plus volume growth",
      ],
      correctIndex: 0,
      explanation: "Gross margin is distinct from operating and net margins.",
      takeaway: "Always name the margin level.",
    }),
    ...pairedQuiz({
      id: "pf-m03-l04-q07",
      prompt: "How should the Mondelez FY2025 28.38% figure be presented?",
      options: [
        "As a secondary-derived corporate/global gross margin requiring primary reconfirmation",
        "As the global confectionery industry margin",
        "As Mondelez Vietnam’s audited margin",
        "As a retailer margin benchmark",
      ],
      correctIndex: 0,
      explanation:
        "Row 25 flags the ratio source and asks for 10-K reconfirmation.",
      takeaway: "Carry source quality and scope with every statistic.",
    }),
    ...pairedQuiz({
      id: "pf-m03-l04-q08",
      prompt:
        "Why is Masan Consumer’s 46.8% not directly comparable to Mondelez?",
      options: [
        "It is a quarterly Vietnam corporate result for a broader FMCG portfolio",
        "It is a market-share estimate",
        "It measures units rather than profit",
        "It excludes all convenience food",
      ],
      correctIndex: 0,
      explanation: "Period, geography, portfolio, and reporting scope differ.",
      takeaway: "Comparison requires matched scope, period, and portfolio.",
    }),
    ...pairedQuiz({
      id: "pf-m03-l04-q09",
      prompt:
        "Which combination can defend profitability during input inflation?",
      options: [
        "Realized pricing, favorable mix, procurement, productivity, and localization",
        "Volume growth regardless of contribution",
        "A higher list price with no demand analysis",
        "Treating every category as cocoa-exposed",
      ],
      correctIndex: 0,
      explanation:
        "Profit defense is multi-lever and must account for demand and category economics.",
      takeaway: "Price is one lever, not the whole answer.",
    }),
    ...pairedQuiz({
      id: "pf-m03-l04-q10",
      prompt:
        "What is the safest use of Coca-Cola and PepsiCo gross margins here?",
      options: [
        "Corporate comparators with portfolio/accounting caveats",
        "Packaged-food industry averages",
        "Vietnam channel-margin benchmarks",
        "Evidence of Orion’s cost structure",
      ],
      correctIndex: 0,
      explanation:
        "The research labels them corporate/global benchmarks from a secondary ratio compilation.",
      takeaway: "A comparator is not an industry average.",
    }),
  ],
  takeaways: [
    "Revenue analysis starts with volume, realized price, and mix.",
    "Ingredient exposure differs by category; no universal cost recipe exists.",
    "Gross, operating, and net margin answer different questions.",
    "Do not invent itemized cost shares or turn corporate results into industry benchmarks.",
    "In interviews, pair every number with company, geography, period, metric, and source caveat.",
  ],
} satisfies PackagedFoodCardData;

export default PACKAGED_FOOD_M3_LESSON4;
