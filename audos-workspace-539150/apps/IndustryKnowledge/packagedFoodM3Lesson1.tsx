import type { PackagedFoodCardData } from "./packagedFoodM3Core";
import {
  chapter,
  citePfM3,
  pairedQuiz,
  EvidenceNote,
} from "./packagedFoodM3Core";

const S02 = citePfM3("pf-m03-s02");
const S05 = citePfM3("pf-m03-s05");
const S06 = citePfM3("pf-m03-s06");
const S07 = citePfM3("pf-m03-s07");
const S09 = citePfM3("pf-m03-s09");
const S10 = citePfM3("pf-m03-s10");

export const PACKAGED_FOOD_M3_LESSON1 = {
  id: "3.1",
  title:
    "3.1 Industry Business Models—(1) Who Owns, Produces, and Sells Packaged Foods? (2) Branded Manufacturers, Private Labels, and Contract Production (3) How Different Business Models Generate Profit",
  chapters: [
    chapter({
      id: "3.1.1",
      title: "(1) Who Owns, Produces, and Sells Packaged Foods?",
      hook: "An Oreo can pass through a brand owner, a factory, a distributor, and a retailer before a consumer opens the pack. Which participant actually owns the business advantage?",
      objective:
        "Map ownership, production, and selling roles; distinguish integrated manufacturers from specialists; and explain why most packaged-food sales are B2B2C.",
      narrative: [
        {
          label: "Frame",
          text: "A business model specifies what the company owns, what work it performs, what it sells, and who pays it. Brand ownership, manufacturing assets, and route-to-market can sit in one company or be split among several.",
        },
        {
          label: "Mechanism",
          text: "Most packaged-food flows are B2B2C: a manufacturer invoices a distributor or retailer, while the final consumer creates demand. The company may own the brand and factory, specialize in one category, or buy reach through acquisition.",
        },
        {
          label: "Global lens",
          text: "Mondelez is an integrated branded FMCG manufacturer spanning brands such as Cadbury, Milka, Oreo, Toblerone, and Ritz. Its FY2024 net revenue was US$36.441 billion; this is a company financial result, not an industry benchmark.",
        },
        {
          label: "Vietnam lens",
          text: "Orion Food Vina manufactures locally in Binh Duong and Bac Ninh, while Masan Consumer owns Vietnamese FMCG brands and a broad commercial system. Mondelez used acquisition to enter at scale by buying 80% of Kinh Do’s confectionery operation in 2014.",
        },
        {
          label: "MT lens",
          text: "The model predicts the work: integrated FMCG companies emphasize Sales, Trade Marketing, Supply Chain, and Brand; specialists concentrate expertise; acquisition adds integration and channel-management work.",
        },
      ],
      globalExample: {
        title: "Mondelez: brand, production, and route-to-market at scale",
        detail:
          "FY2024 net revenue was US$36,441 million. The figure is a corporate result compiled from 10-K data and should not be presented as the size of the global packaged-food market.",
        sources: [S10],
      },
      vietnamExample: {
        title: "Buying an operating platform, not only a product name",
        detail:
          "Mondelez agreed to pay VND7,846 billion for 80% of Kinh Do’s confectionery business in 2014. The transaction gave it established production and distribution reach; Kido subsequently pivoted toward cooking oil and ice cream.",
        sources: [S06],
      },
      visualKind: "packaged-food-m3-31-1",
      visual: {
        title: "Who owns what in a packaged-food system?",
        subtitle:
          "Asset ownership determines control, risk, and the dominant capabilities",
        ariaLabel:
          "A four-stage map from inputs through manufacturer and trade to consumer, with ownership roles marked.",
        readingGuide:
          "Read left to right, then compare the integrated and specialist paths.",
        columns: [
          {
            heading: "Inputs",
            items: ["Ingredients", "Packaging", "Supplier contracts"],
          },
          {
            heading: "Manufacturer",
            items: ["Brand IP", "Factory", "Portfolio", "Quality control"],
          },
          {
            heading: "Trade",
            items: ["Distributor", "Retailer", "Shelf and promotion"],
          },
          {
            heading: "Consumer",
            items: ["Demand", "Repeat purchase", "Occasion"],
          },
        ],
        callout:
          "B2B invoice flow and consumer demand flow point in opposite directions.",
        sourceIds: ["pf-m03-s06", "pf-m03-s10"],
      },
      keyTerms: [
        {
          term: "B2B2C",
          definition:
            "A manufacturer sells to a distributor or retailer, which then sells to the final consumer.",
        },
        {
          term: "Vertically integrated",
          definition:
            "A company controls multiple stages, such as sourcing, manufacturing, brand ownership, and distribution.",
        },
        {
          term: "Specialist operator",
          definition:
            "A company focused on a narrower category or capability rather than a broad portfolio.",
        },
        {
          term: "Route-to-market",
          definition:
            "The channel and operating system used to place products with trade customers and shoppers.",
        },
      ],
      recap: [
        "Separate ownership of the brand, ownership of the factory, and ownership of the customer relationship.",
        "Most packaged-food manufacturers sell through the trade even though consumer demand drives the system.",
        "Integration, specialization, and acquisition create different capability priorities.",
      ],
      deepDive: {
        title: "Why the 2014 Kinh Do deal changed the model",
        text: "The reported consideration—VND7,846 billion for 80%—was not a generic industry valuation benchmark. It was a company-specific transaction that let Mondelez acquire an operating platform and let Kido redeploy capital into other categories.",
        sources: [S06],
      },
      supportingSourceIds: ["pf-m03-s06", "pf-m03-s10"],
      body: (
        <>
          <p>
            Start with four questions: Who owns the consumer-facing brand? Who
            owns or controls the recipe and quality system? Who operates the
            factory? Who manages distributors and retailers? One company can
            answer all four, but it does not have to.
          </p>
          <p>
            Integrated branded manufacturers combine intangible assets with
            physical execution. Specialists narrow the portfolio. An acquisition
            can change the map immediately by transferring a factory, brands,
            commercial relationships, or all three.
          </p>
          <EvidenceNote
            title="Company financials are not market benchmarks"
            sources={[S10]}
          >
            Mondelez’s US$36.441 billion FY2024 net revenue describes one
            corporation. It does not establish a standard revenue level or
            margin for another packaged-food business.
          </EvidenceNote>
          <EvidenceNote title="Vietnam transaction evidence" sources={[S06]}>
            The VND7,846 billion figure is the reported 2014 consideration for
            80% of Kinh Do’s confectionery operation. Use it to illustrate M&A
            as a route to scale, not to infer a current valuation multiple.
          </EvidenceNote>
        </>
      ),
    }),
    chapter({
      id: "3.1.2",
      title:
        "(2) Branded Manufacturers, Private Labels, and Contract Production",
      hook: "Two biscuits can leave the same type of production line, yet one earns for a consumer brand and the other earns for a retailer. Their economics are not the same.",
      objective:
        "Contrast branded manufacturing, retailer private label, contract production, and vertically integrated local production without inventing margin benchmarks.",
      narrative: [
        {
          label: "Frame",
          text: "A branded manufacturer monetizes brand equity and demand creation. A private-label supplier makes a retailer-owned proposition. A contract manufacturer sells production capability to another company.",
        },
        {
          label: "Mechanism",
          text: "Brand owners fund innovation, marketing, and trade activation but can price for differentiation. Contract and private-label producers compete more directly on specification, reliability, capacity, and cost; row 25 provides no verified processing-margin benchmark.",
        },
        {
          label: "Global lens",
          text: "Mondelez and Nestlé illustrate branded scale. Nestlé reported CHF91.354 billion in total group sales for 2024 and mid-single-digit confectionery growth led by KitKat; the sales figure covers the whole group, not confectionery alone.",
        },
        {
          label: "Vietnam lens",
          text: "Orion illustrates deep localization: reporting cited roughly 21 South Korean employees among about 3,600 staff and said the company held prices flat from 2018 despite an approximately 70% ingredient-cost rise.",
        },
        {
          label: "MT lens",
          text: "Ask where the company’s defensible capability sits. Brand-led firms need consumer insight and activation; contract producers need operational excellence and account management; localized producers need procurement and factory discipline.",
        },
      ],
      globalExample: {
        title: "Nestlé’s branded scale",
        detail:
          "Nestlé reported CHF91.354 billion in total 2024 group sales. Its confectionery category grew mid-single-digit, led by KitKat. Keep the group sales denominator separate from the category growth statement.",
        sources: [S02],
      },
      vietnamExample: {
        title: "Orion localizes the operating model",
        detail:
          "Secondary reporting describes a highly localized workforce and says Orion maintained Vietnamese prices from 2018 while absorbing an approximately 70% ingredient-cost increase. This is a company case, not a sector margin benchmark.",
        sources: [S05],
      },
      visualKind: "packaged-food-m3-31-2",
      visual: {
        title: "Three ways to monetize a food factory",
        subtitle:
          "The owner of demand differs across branded, private-label, and contract models",
        ariaLabel:
          "Comparison matrix for branded manufacturer, private-label supplier, and contract producer.",
        readingGuide:
          "Compare the owner of the brand first, then the basis of competition and primary risk.",
        rows: [
          {
            model: "Branded manufacturer",
            brandOwner: "Manufacturer",
            winsOn: "Consumer demand + distribution",
            primaryRisk: "Brand, innovation, input costs",
          },
          {
            model: "Private-label supplier",
            brandOwner: "Retailer",
            winsOn: "Specification + cost + service",
            primaryRisk: "Retailer concentration, utilization",
          },
          {
            model: "Contract producer",
            brandOwner: "Client brand",
            winsOn: "Reliability + capacity + quality",
            primaryRisk: "Contract renewal, utilization",
          },
        ],
        caveat:
          "Row 25 contains no verified private-label penetration or processing-margin percentage for Vietnam.",
        sourceIds: ["pf-m03-s02", "pf-m03-s05"],
      },
      keyTerms: [
        {
          term: "Branded manufacturer",
          definition:
            "A producer that owns and invests in the consumer-facing brand.",
        },
        {
          term: "Private label",
          definition:
            "A product sold under a retailer-owned brand, typically made internally or by a supplier.",
        },
        {
          term: "Contract manufacturing",
          definition:
            "Producing to another company’s specification without owning the consumer brand.",
        },
        {
          term: "Capacity utilization",
          definition:
            "The share of available production capacity being used; an important driver when the factory itself is the service sold.",
        },
      ],
      recap: [
        "Brand ownership and factory ownership can be separated.",
        "Branded and contract models compete on different capabilities.",
        "Do not attach an unsourced margin percentage to private-label or contract production.",
      ],
      deepDive: {
        title: "Localization is more than local staffing",
        text: "Orion’s reported workforce localization and price hold indicate a wider operating system: local manufacturing, procurement choices, and cost control. The approximately 70% input-cost increase is company reporting in a secondary source, not evidence that every Vietnamese producer faced the same increase.",
        sources: [S05],
      },
      supportingSourceIds: ["pf-m03-s02", "pf-m03-s05"],
      body: (
        <>
          <p>
            The fastest diagnostic is to ask, “Who owns shopper demand?” A
            branded manufacturer owns the name and invests to make shoppers
            request it. A retailer owns demand for its private label. A contract
            producer owns neither consumer relationship; it sells manufacturing
            performance.
          </p>
          <p>
            This distinction changes the scorecard. Brand teams watch
            penetration, price, and positioning. Contract producers watch
            quality, delivery, yield, and line utilization. Both must be safe
            and efficient, but their commercial levers differ.
          </p>
          <EvidenceNote
            title="Scope the Nestlé number correctly"
            sources={[S02]}
          >
            CHF91.354 billion is Nestlé’s total 2024 group sales, not
            confectionery revenue. The source separately describes confectionery
            as growing mid-single-digit, led by KitKat.
          </EvidenceNote>
          <EvidenceNote title="No private-label share supplied" sources={[S05]}>
            The research register explicitly lists Vietnam private-label
            penetration and contract-manufacturing margin benchmarks as gaps.
            They should remain unquantified.
          </EvidenceNote>
        </>
      ),
    }),
    chapter({
      id: "3.1.3",
      title: "(3) How Different Business Models Generate Profit",
      hook: "Revenue is not the same as profit: a famous brand, a well-loaded factory, and a localized supply chain convert sales into earnings in different ways.",
      objective:
        "Trace the profit logic of brand ownership, contract production, vertical integration, and M&A while keeping company results separate from benchmarks.",
      narrative: [
        {
          label: "Frame",
          text: "Profit follows the scarce capability: brand-led firms monetize willingness to pay and repeat purchase; production-led firms monetize reliable throughput; integrated firms combine demand control with procurement and operating leverage.",
        },
        {
          label: "Mechanism",
          text: "Mix, scale procurement, distribution productivity, factory utilization, and localization can widen the gap between revenue and cost. Commodity inflation can reverse that benefit, so resilience matters as much as headline growth.",
        },
        {
          label: "Global lens",
          text: "Orion group reported record FY2024 consolidated operating profit of KRW543.6 billion, up 10.4%, with China and Vietnam among the growth drivers. This is a company financial outcome, not a normal industry margin.",
        },
        {
          label: "Vietnam lens",
          text: "Masan Consumer reported Q3 2024 revenue of VND7.987 trillion and a 46.8% gross profit margin, while its convenience-food business grew 11% year on year. These are quarterly company results via business press, not Vietnam sector averages.",
        },
        {
          label: "MT lens",
          text: "Build a profit bridge: volume × realized price gives revenue; subtract ingredients, packaging, conversion, logistics, trade spend, and brand investment. Then identify which line the business model can structurally improve.",
        },
      ],
      globalExample: {
        title: "Orion’s operating result",
        detail:
          "FY2024 consolidated operating profit reached KRW543.6 billion, up 10.4%, according to business-press reporting of company results. It demonstrates an outcome, not a transferable profit rate.",
        sources: [S09],
      },
      vietnamExample: {
        title: "Masan Consumer’s premium-mix result",
        detail:
          "Q3 2024 gross profit margin was 46.8% on VND7.987 trillion revenue; convenience food grew 11% year on year. The figures are company-reported quarterly results, not category benchmarks.",
        sources: [S07],
      },
      visualKind: "packaged-food-m3-31-3",
      visual: {
        title: "Business-model profit engine",
        subtitle:
          "Different models pull different levers after the same revenue equation",
        ariaLabel:
          "A profit bridge from volume and realized price through major cost blocks to operating profit.",
        readingGuide:
          "Start at revenue, follow the cost bridge, and use the colored model levers to identify structural advantages.",
        bridge: [
          "Units sold",
          "× realized price",
          "= net revenue",
          "− ingredients and packaging",
          "− conversion and logistics",
          "− trade and brand investment",
          "= operating result",
        ],
        modelLevers: [
          "Brand owner: mix, pricing, repeat demand",
          "Contract producer: utilization, yield, service",
          "Integrated producer: procurement, localization, coordination",
          "Acquirer: purchased reach and scale, less integration cost",
        ],
        sourceIds: ["pf-m03-s07", "pf-m03-s09"],
      },
      keyTerms: [
        {
          term: "Price-pack architecture",
          definition:
            "A structured range of pack sizes and price points designed for different shoppers and occasions.",
        },
        {
          term: "Mix",
          definition:
            "The composition of sales across products, packs, tiers, and channels.",
        },
        {
          term: "Operating leverage",
          definition:
            "The effect of spreading fixed operating costs across greater or more valuable output.",
        },
        {
          term: "Gross profit margin",
          definition:
            "Gross profit divided by revenue; a company-period measure unless a clearly defined benchmark is supplied.",
        },
      ],
      recap: [
        "Map every model to its controllable profit levers.",
        "Company revenue, growth, gross margin, and operating profit are not industry norms.",
        "Localization and premium mix can improve resilience, while commodity exposure can offset those gains.",
      ],
      deepDive: {
        title: "A disciplined comparison",
        text: "Orion’s KRW543.6 billion is consolidated operating profit for FY2024. Masan’s 46.8% is a Q3 2024 gross margin. The measures, periods, scopes, and companies differ, so they cannot be ranked as if they were like-for-like margins.",
        sources: [S07, S09],
      },
      supportingSourceIds: ["pf-m03-s07", "pf-m03-s09"],
      body: (
        <>
          <p>
            Every model starts with units sold and realized price, but the
            reason a shopper pays and the reason costs stay controlled differ. A
            brand owner earns from differentiation. A contract manufacturer
            earns from service and asset productivity. An integrated producer
            can coordinate sourcing, production, and market execution.
          </p>
          <p>
            Avoid treating a successful company’s result as a benchmark.
            Instead, use it as evidence of a mechanism, then test whether the
            same mechanism exists in the company being analyzed.
          </p>
          <EvidenceNote title="Corporate/global result" sources={[S09]}>
            Orion’s KRW543.6 billion FY2024 consolidated operating profit and
            10.4% growth are group results reported via business press.
          </EvidenceNote>
          <EvidenceNote title="Corporate/Vietnam result" sources={[S07]}>
            Masan Consumer’s VND7.987 trillion Q3 revenue, 46.8% gross margin,
            and 11% convenience-food growth are company-period figures. They are
            not packaged-food market averages.
          </EvidenceNote>
        </>
      ),
    }),
  ],
  quiz: pairedQuiz([
    {
      id: "pf-m03-31-q01",
      concept: "B2B2C",
      question:
        "A biscuit maker invoices a distributor, which supplies stores where shoppers buy the product. Which model best describes the flow?",
      options: ["Pure B2C", "B2B2C", "Peer-to-peer", "Franchising"],
      correctIndex: 1,
      explanation:
        "The manufacturer sells to a business intermediary before the final consumer buys.",
      transferQuestion:
        "Which team most directly manages the manufacturer’s immediate paying customer in this flow?",
      transferOptions: [
        "Key Account or Sales",
        "Consumer research only",
        "R&D only",
        "Internal audit only",
      ],
      transferCorrectIndex: 0,
      transferExplanation:
        "Sales manages trade customers, while Brand and Insights build consumer demand.",
      takeaway:
        "Separate the trade customer from the consumer who ultimately creates demand.",
    },
    {
      id: "pf-m03-31-q02",
      concept: "Ownership map",
      question:
        "Which question best distinguishes a branded manufacturer from a contract producer?",
      options: [
        "Who owns the consumer-facing brand?",
        "Is the food packaged?",
        "Does the factory use electricity?",
        "Does the product have ingredients?",
      ],
      correctIndex: 0,
      explanation:
        "Brand ownership changes who controls demand creation and pricing architecture.",
      transferQuestion:
        "A factory makes snacks to a client’s specification under the client’s name. What is the factory primarily selling?",
      transferOptions: [
        "Brand equity",
        "Manufacturing capability",
        "Retail shelf space",
        "Consumer media",
      ],
      transferCorrectIndex: 1,
      transferExplanation:
        "The factory supplies capacity, quality, and reliability rather than the consumer brand.",
      takeaway:
        "Brand ownership and production ownership are separate analytical dimensions.",
    },
    {
      id: "pf-m03-31-q03",
      concept: "Private label",
      question:
        "Who owns the consumer proposition in a retailer private-label model?",
      options: [
        "The retailer",
        "Every ingredient supplier",
        "The shopper",
        "The logistics carrier",
      ],
      correctIndex: 0,
      explanation:
        "Private label is sold under a retailer-owned brand, even when a supplier manufactures it.",
      transferQuestion:
        "Which capability is most central to a private-label supplier?",
      transferOptions: [
        "Celebrity ownership",
        "Specification, cost, quality, and service",
        "Owning every retail store",
        "Avoiding utilization measurement",
      ],
      transferCorrectIndex: 1,
      transferExplanation:
        "The supplier competes for retailer business through operational delivery.",
      takeaway: "Private-label suppliers make for retailer-owned demand.",
    },
    {
      id: "pf-m03-31-q04",
      concept: "M&A as a model lever",
      question:
        "What did Mondelez’s reported 2014 purchase of 80% of Kinh Do’s confectionery business illustrate?",
      options: [
        "Buying immediate production and distribution scale",
        "A Vietnam industry margin benchmark",
        "Eliminating all intermediaries",
        "A contract-manufacturing fee",
      ],
      correctIndex: 0,
      explanation:
        "The transaction illustrates acquisition as a way to obtain an operating platform.",
      transferQuestion: "Which statement is methodologically sound?",
      transferOptions: [
        "The VND7,846bn consideration is a current sector valuation rule",
        "The deal is company-specific evidence of M&A as a route to scale",
        "Every acquisition creates the same value",
        "The figure measures annual market revenue",
      ],
      transferCorrectIndex: 1,
      transferExplanation:
        "A transaction value is specific to its date, assets, and terms.",
      takeaway:
        "Use transaction evidence to explain strategy, not invent a universal valuation benchmark.",
    },
    {
      id: "pf-m03-31-q05",
      concept: "Localization",
      question:
        "What business-model advantage does the Orion Vietnam case primarily illustrate?",
      options: [
        "Localization can improve cost control and resilience",
        "All inputs become free",
        "Retailers cease to matter",
        "Commodity risk disappears permanently",
      ],
      correctIndex: 0,
      explanation:
        "Local staffing, production, and sourcing choices can strengthen operating control.",
      transferQuestion:
        "How should the reported approximately 70% ingredient-cost increase be used?",
      transferOptions: [
        "As an industry-wide benchmark",
        "As a company case reported in a secondary source",
        "As a private-label margin",
        "As a consumer survey",
      ],
      transferCorrectIndex: 1,
      transferExplanation:
        "The evidence concerns Orion and should not be generalized to every producer.",
      takeaway: "Scope company evidence to the company and period reported.",
    },
    {
      id: "pf-m03-31-q06",
      concept: "Financial scope",
      question:
        "Nestlé’s CHF91.354bn reported sales for 2024 refer to what scope?",
      options: [
        "Total group sales",
        "Vietnam confectionery only",
        "KitKat sales only",
        "Global private-label sales",
      ],
      correctIndex: 0,
      explanation:
        "The source reports Nestlé total group sales and separately describes confectionery growth.",
      transferQuestion: "Which claim would overstate the evidence?",
      transferOptions: [
        "Nestlé reported CHF91.354bn total group sales",
        "Confectionery grew mid-single-digit led by KitKat",
        "CHF91.354bn was confectionery-category revenue",
        "The figures describe corporate performance",
      ],
      transferCorrectIndex: 2,
      transferExplanation:
        "The research does not identify the full group figure as confectionery revenue.",
      takeaway:
        "Keep group denominators separate from category growth statements.",
    },
    {
      id: "pf-m03-31-q07",
      concept: "Profit levers",
      question:
        "Which lever is most characteristic of a contract manufacturer?",
      options: [
        "Capacity utilization",
        "Brand fame alone",
        "Retail ownership",
        "Consumer population size alone",
      ],
      correctIndex: 0,
      explanation:
        "A production-led service model depends on reliable, efficient use of factory capacity.",
      transferQuestion:
        "Which lever is more characteristic of a branded manufacturer?",
      transferOptions: [
        "Mix and pricing",
        "Ignoring demand",
        "Avoiding innovation",
        "Removing quality controls",
      ],
      transferCorrectIndex: 0,
      transferExplanation:
        "Brand differentiation supports portfolio mix and realized price.",
      takeaway:
        "The scarce capability determines the model’s primary profit lever.",
    },
    {
      id: "pf-m03-31-q08",
      concept: "Comparability",
      question:
        "Why should Orion’s operating profit and Masan Consumer’s gross margin not be directly ranked?",
      options: [
        "They differ in metric, period, scope, and company",
        "Percentages can never be used",
        "Vietnam has no packaged food",
        "Operating profit always equals revenue",
      ],
      correctIndex: 0,
      explanation:
        "One is a consolidated annual amount and the other a quarterly gross-margin percentage.",
      transferQuestion:
        "What is the first step in a sound financial comparison?",
      transferOptions: [
        "Align definition, period, and scope",
        "Choose the larger-looking number",
        "Remove source labels",
        "Assume every company has the same portfolio",
      ],
      transferCorrectIndex: 0,
      transferExplanation:
        "Comparable definitions and periods are prerequisites for interpretation.",
      takeaway:
        "Never compare unlike corporate measures as if they were a common benchmark.",
    },
    {
      id: "pf-m03-31-q09",
      concept: "Integrated model",
      question:
        "Which set of activities most clearly indicates vertical integration?",
      options: [
        "Sourcing, manufacturing, brand ownership, and distribution control",
        "One social-media post",
        "A single retailer invoice",
        "Buying office furniture",
      ],
      correctIndex: 0,
      explanation:
        "Vertical integration means controlling multiple linked stages of the value chain.",
      transferQuestion: "What is a plausible benefit of integration?",
      transferOptions: [
        "Coordination across procurement, production, and market execution",
        "Guaranteed immunity from commodity prices",
        "No need for retailers",
        "Automatic category leadership",
      ],
      transferCorrectIndex: 0,
      transferExplanation:
        "Integration can coordinate decisions but does not remove market or execution risk.",
      takeaway:
        "Integration creates coordination options, not guaranteed success.",
    },
    {
      id: "pf-m03-31-q10",
      concept: "Evidence discipline",
      question: "Row 25 provides no verified figure for which item?",
      options: [
        "Vietnam contract-manufacturing processing margins",
        "Masan Consumer Q3 2024 gross margin",
        "Mondelez FY2024 revenue",
        "Orion FY2024 operating profit",
      ],
      correctIndex: 0,
      explanation:
        "Contract-production margin benchmarks are explicitly listed as a research gap.",
      transferQuestion:
        "What should a lesson do when a desired benchmark is absent?",
      transferOptions: [
        "Keep the comparison qualitative and disclose the gap",
        "Invent a plausible percentage",
        "Borrow an unrelated number",
        "Present a company result as the benchmark",
      ],
      transferCorrectIndex: 0,
      transferExplanation:
        "Transparent qualitative analysis is stronger than fabricated precision.",
      takeaway:
        "An acknowledged evidence gap is not permission to invent a statistic.",
    },
  ]),
  takeaways: [
    "Map brand, factory, and route-to-market ownership separately.",
    "Most manufacturers serve the trade while building demand with consumers.",
    "Private-label and contract producers sell operational performance rather than consumer brand ownership.",
    "Integrated producers can coordinate sourcing, production, and distribution.",
    "M&A can buy scale and reach but creates integration work.",
    "Localization can strengthen cost control without eliminating commodity exposure.",
    "Brand-led and production-led models have different scorecards.",
    "Build profit from volume, realized price, and explicit cost blocks.",
    "Keep company financials separate from industry benchmarks.",
    "Leave unsourced private-label shares and processing margins unquantified.",
  ],
} satisfies PackagedFoodCardData;
