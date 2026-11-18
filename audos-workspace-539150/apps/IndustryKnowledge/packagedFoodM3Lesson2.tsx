import type { PackagedFoodCardData } from "./packagedFoodM3Core";
import {
  chapter,
  citePfM3,
  pairedQuiz,
  EvidenceNote,
} from "./packagedFoodM3Core";

const S01 = citePfM3("pf-m03-s01");
const S04 = citePfM3("pf-m03-s04");
const S05 = citePfM3("pf-m03-s05");
const S07 = citePfM3("pf-m03-s07");

export const PACKAGED_FOOD_M3_LESSON2 = {
  id: "3.2",
  title:
    "3.2 Products, Services & Segmentation—(1) Understanding Packaged Food and Confectionery Categories (2) Mass-Market, Premium, and Product Segmentation (3) How Product Portfolios and Positioning Shape Pricing",
  chapters: [
    chapter({
      id: "3.2.1",
      title: "(1) Understanding Packaged Food and Confectionery Categories",
      hook: "Chocolate, biscuits, candy, and savory snacks may share a shelf, but the commodity that threatens one category’s economics may barely affect another.",
      objective:
        "Classify the major product families and explain how recipe, occasion, and input exposure create different category economics.",
      narrative: [
        {
          label: "Frame",
          text: "Useful segmentation begins with product families: biscuits and bakery, chocolate confectionery, sugar confectionery, and savory snacks. “Snacks” alone is too broad for commercial analysis.",
        },
        {
          label: "Mechanism",
          text: "The recipe determines cost exposure and operating logic. Cocoa matters most to chocolate; wheat, sugar, and edible oil matter to biscuits; sugar and glucose systems matter to candy; potato, corn, and frying oil matter to savory snacks.",
        },
        {
          label: "Global lens",
          text: "The Harmonized System distinguishes sugar confectionery without cocoa under heading 1704, chocolate and cocoa-containing preparations under 1806, and biscuits and other bakery products under 1905. The cited page is a third-party HS reference, not an official WCO publication.",
        },
        {
          label: "Vietnam lens",
          text: "Vietnam’s shelf includes global and local portfolios: Oreo and Ritz biscuits, Cadbury and KitKat chocolate, Bibica and Hai Ha confectionery, and Orion products such as ChocoPie, Custas, and Marine Boy.",
        },
        {
          label: "MT lens",
          text: "Before recommending price, promotion, or sourcing action, identify the family, recipe exposure, pack format, shelf location, and consumption occasion.",
        },
      ],
      globalExample: {
        title: "A classification that prevents category confusion",
        detail:
          "HS headings 1704, 1806, and 1905 provide a practical distinction among non-cocoa sugar confectionery, cocoa-containing chocolate preparations, and biscuits/bakery. The source is explicitly a third-party reference.",
        sources: [S04],
      },
      vietnamExample: {
        title: "Orion’s multi-family portfolio",
        detail:
          "Orion participates across pie/cake, biscuit/cake, and savory-snack occasions through ChocoPie, Custas, and Marine Boy. Secondary reporting estimated ChocoPie at about 66% of Vietnam’s “pie” segment in 2022; this is a narrow segment estimate, not total confectionery share.",
        sources: [S05],
      },
      visualKind: "packaged-food-m3-32-1",
      visual: {
        title: "Four families, four economic exposures",
        subtitle: "Classify the recipe before diagnosing price or profit",
        ariaLabel:
          "Four category cards showing classification, examples, primary input exposure, and typical occasion.",
        readingGuide:
          "Scan each row from family to input exposure; do not infer that one commodity drives all snacks.",
        families: [
          {
            family: "Biscuits and bakery",
            hsReference: "1905",
            exposure: "Wheat/flour, sugar, edible oil",
            occasion: "Everyday snack, sharing",
          },
          {
            family: "Chocolate confectionery",
            hsReference: "1806",
            exposure: "Cocoa, sugar, dairy",
            occasion: "Indulgence, gifting, impulse",
          },
          {
            family: "Sugar confectionery",
            hsReference: "1704",
            exposure: "Sugar, glucose systems",
            occasion: "Low-ticket impulse",
          },
          {
            family: "Savory snacks",
            hsReference: "Category-specific",
            exposure: "Potato/corn, frying oil, seasoning",
            occasion: "Snacking, sharing",
          },
        ],
        caveat:
          "HS references are from a third-party classification site; savory snacks are not assigned a single heading in row 25.",
        sourceIds: ["pf-m03-s04", "pf-m03-s05"],
      },
      keyTerms: [
        {
          term: "Product family",
          definition:
            "A group of products with related recipes, occasions, and operating economics.",
        },
        {
          term: "HS heading",
          definition:
            "A Harmonized System trade-classification heading; the cited lesson reference is third-party.",
        },
        {
          term: "Commodity exposure",
          definition:
            "The degree to which changes in a key input affect product cost.",
        },
        {
          term: "Impulse product",
          definition:
            "A product frequently bought with limited planning, making availability and visibility important.",
        },
      ],
      recap: [
        "Do not treat all confectionery and snacks as one economic category.",
        "Recipe inputs explain why categories react differently to commodity shocks.",
        "A narrow segment share cannot be restated as a total-market share.",
      ],
      deepDive: {
        title: "What the 66% estimate does—and does not—say",
        text: "The reported Nielsen estimate concerns Orion ChocoPie’s share of Vietnam’s “pie” segment in 2022. It supports leadership in that defined segment; it does not establish a 66% share of confectionery, chocolate, snacks, or packaged food.",
        sources: [S05],
      },
      supportingSourceIds: ["pf-m03-s04", "pf-m03-s05"],
      body: (
        <>
          <p>
            Category labels are analytical tools, not shelf decoration.
            Classification clarifies which inputs matter, which products are
            substitutes, and which occasions and price points are relevant.
          </p>
          <p>
            The same cocoa-price shock that directly affects a chocolate recipe
            does not create the same cost bridge for a wheat-based biscuit or
            potato snack. Portfolio decisions therefore begin with family-level
            economics.
          </p>
          <EvidenceNote title="Classification source caveat" sources={[S04]}>
            The heading descriptions are standard HS nomenclature, but the cited
            findhs.codes page is a third-party reference and must not be
            described as an official WCO publication.
          </EvidenceNote>
          <EvidenceNote title="Narrow commercial estimate" sources={[S05]}>
            The approximately 66% figure is a 2022 estimate for the Vietnamese
            “pie” segment cited by VnExpress from Nielsen. Preserve the segment,
            geography, year, and secondary-source qualifier.
          </EvidenceNote>
        </>
      ),
    }),
    chapter({
      id: "3.2.2",
      title: "(2) Mass-Market, Premium, and Product Segmentation",
      hook: "A small premium pack and a large value pack can target different shoppers even when both sit under the same master brand.",
      objective:
        "Segment products by price tier, pack, occasion, and need; define premiumisation as a mix-and-value strategy rather than a synonym for price increases.",
      narrative: [
        {
          label: "Frame",
          text: "Within each family, portfolios span value, mainstream, premium, and sometimes super-premium tiers. Segmentation also uses pack size, channel, occasion, and consumer need.",
        },
        {
          label: "Mechanism",
          text: "Premiumisation grows value by shifting mix toward stronger propositions—brand, recipe, format, and packaging—rather than relying only on greater physical volume.",
        },
        {
          label: "Global lens",
          text: "Mondelez reported 7.4% chocolate revenue growth in FY2024 amid severe cocoa inflation, supported by brands including Cadbury, Milka, and Toblerone. This is corporate category growth, not global market growth.",
        },
        {
          label: "Vietnam lens",
          text: "Masan Consumer reported 11% year-on-year growth in Convenience Food in Q3 2024 while describing a premiumisation strategy. Vietnam still has a broad mainstream, price-sensitive base.",
        },
        {
          label: "MT lens",
          text: "A useful segment must change an action: which pack to list, what benefit to communicate, what price point to protect, or which channel and occasion to prioritize.",
        },
      ],
      globalExample: {
        title: "Premium brands during a cost shock",
        detail:
          "Mondelez’s chocolate revenue grew 7.4% in FY2024. The audited company result shows brand and pricing strength during cocoa inflation, but does not reveal volume, market share, or category-wide growth by itself.",
        sources: [S01],
      },
      vietnamExample: {
        title: "Premiumisation in a broader FMCG portfolio",
        detail:
          "Masan Consumer’s Convenience Food business grew 11% year on year in Q3 2024 alongside a stated premiumisation strategy. This is a corporate/Vietnam result, not an industry forecast.",
        sources: [S07],
      },
      visualKind: "packaged-food-m3-32-2",
      visual: {
        title: "Segmentation cube",
        subtitle: "Tier is only one axis of a commercially useful segment",
        ariaLabel:
          "A three-axis cube showing price tier, occasion, and pack or channel variables.",
        readingGuide:
          "Build a segment by choosing one value from each axis, then state the action it changes.",
        axes: [
          {
            name: "Tier",
            values: ["Value", "Mainstream", "Premium", "Super-premium"],
          },
          {
            name: "Occasion",
            values: ["Impulse", "Everyday", "Sharing", "Gifting"],
          },
          {
            name: "Format",
            values: ["Single serve", "Multipack", "Family pack", "Gift box"],
          },
        ],
        test: "If two segments lead to identical product, price, and channel actions, the segmentation is not yet useful.",
        sourceIds: ["pf-m03-s01", "pf-m03-s07"],
      },
      keyTerms: [
        {
          term: "Mass market",
          definition:
            "A broad value or mainstream proposition designed for reach, affordability, and volume.",
        },
        {
          term: "Premium",
          definition:
            "A differentiated proposition that supports a higher willingness to pay through brand, product, format, or experience.",
        },
        {
          term: "Premiumisation",
          definition:
            "Growing sales value through a richer product and price mix, not merely greater volume.",
        },
        {
          term: "Price tier",
          definition:
            "A relative position in the category’s price architecture, interpreted with pack size and proposition.",
        },
      ],
      recap: [
        "Tier, occasion, format, channel, and need can all define a segment.",
        "Premiumisation is a mix strategy, not proof that consumers accept any price increase.",
        "Corporate growth rates should not be relabeled as market growth.",
      ],
      deepDive: {
        title: "Why unit price alone misclassifies products",
        text: "A smaller premium pack can have a low absolute ticket but a high price per unit of weight; a large family pack can cost more at checkout but offer better value per unit. Price tier therefore requires pack and proposition context.",
        sources: [S01, S07],
      },
      supportingSourceIds: ["pf-m03-s01", "pf-m03-s07"],
      body: (
        <>
          <p>
            Segmentation should explain a choice. “Young consumers” is too broad
            if it does not change format, benefit, channel, or message.
            “Mainstream single-serve snack for an on-the-go occasion” is more
            actionable.
          </p>
          <p>
            Premiumisation is strongest when consumers perceive additional value
            through taste, brand, recipe, packaging, or suitability for an
            occasion. Raising price without strengthening the proposition is not
            the same strategy.
          </p>
          <EvidenceNote title="Corporate/global evidence" sources={[S01]}>
            The 7.4% figure is Mondelez FY2024 chocolate revenue growth. It is
            not a global chocolate-market growth rate and does not, by itself,
            identify the split between price, mix, and volume.
          </EvidenceNote>
          <EvidenceNote title="Corporate/Vietnam evidence" sources={[S07]}>
            The 11% figure is Masan Consumer Convenience Food growth in Q3 2024.
            It supports a company premiumisation case but is not a
            confectionery-sector statistic.
          </EvidenceNote>
        </>
      ),
    }),
    chapter({
      id: "3.2.3",
      title: "(3) How Product Portfolios and Positioning Shape Pricing",
      hook: "The role of a low-ticket pack is not always to maximize margin; it may recruit shoppers whom a premium line can later retain and trade up.",
      objective:
        "Explain how portfolio roles, price-pack architecture, positioning, and commodity exposure jointly shape realized pricing.",
      narrative: [
        {
          label: "Frame",
          text: "A portfolio is a system of products, not a list. Each SKU should have a role: recruit, provide an everyday core, serve an occasion, trade shoppers up, or defend a price point.",
        },
        {
          label: "Mechanism",
          text: "Price-pack architecture links pack size, absolute ticket, price per unit, tier, and channel. Positioning supplies the reason to pay; portfolio breadth lets a company retain shoppers as budgets and occasions change.",
        },
        {
          label: "Global lens",
          text: "Mondelez spans mainstream biscuit brands such as Oreo and Ritz and premium chocolate propositions such as Toblerone. Portfolio breadth can diversify category exposure, though it does not eliminate input risk.",
        },
        {
          label: "Vietnam lens",
          text: "Vietnam’s estimated confectionery consumption was about 2 kg per person per year versus roughly 3 kg globally in 2022, according to secondary reporting of industry data. This commercial estimate suggests headroom but is not an official consumption benchmark.",
        },
        {
          label: "MT lens",
          text: "When reviewing an SKU, ask what job it does, what it risks cannibalizing, what occasion and channel it serves, and whether its price gap is supported by a visible benefit.",
        },
      ],
      globalExample: {
        title: "Portfolio roles across categories and tiers",
        detail:
          "Mondelez’s named brands illustrate breadth across biscuits and chocolate. Its reported 7.4% FY2024 chocolate revenue growth is a company result; the lesson uses it as evidence of portfolio and positioning execution, not a benchmark margin.",
        sources: [S01],
      },
      vietnamExample: {
        title: "Headroom with a mainstream base",
        detail:
          "Secondary reporting placed Vietnam at about 2 kg of confectionery per person per year versus roughly 3 kg globally in 2022. Treat both numbers as commercial/industry estimates via VnExpress, not official GSO data.",
        sources: [S05],
      },
      visualKind: "packaged-food-m3-32-3",
      visual: {
        title: "Portfolio ladder and pricing roles",
        subtitle:
          "A coherent ladder offers a reason to enter, stay, and trade up",
        ariaLabel:
          "A four-rung portfolio ladder from access pack to premium gift proposition, with each rung’s commercial role.",
        readingGuide:
          "Move upward by proposition and willingness to pay, not by pack size alone.",
        rungs: [
          {
            name: "Access",
            role: "Recruit and preserve affordability",
            pricingQuestion: "Is the absolute ticket accessible?",
          },
          {
            name: "Core",
            role: "Drive repeat purchase and distribution",
            pricingQuestion: "Is the everyday value clear?",
          },
          {
            name: "Premium",
            role: "Trade up through differentiated benefit",
            pricingQuestion: "Is the price gap justified?",
          },
          {
            name: "Occasion / gift",
            role: "Capture higher willingness to pay",
            pricingQuestion: "Do format and presentation fit the occasion?",
          },
        ],
        footer:
          "Portfolio breadth also spreads, but does not remove, category-specific input exposure.",
        sourceIds: ["pf-m03-s01", "pf-m03-s05"],
      },
      keyTerms: [
        {
          term: "Price-pack architecture",
          definition:
            "The deliberate structure of pack sizes, ticket prices, and price-per-unit relationships across a range.",
        },
        {
          term: "Positioning",
          definition:
            "The distinctive meaning and benefit a product is intended to own for a target shopper or occasion.",
        },
        {
          term: "Portfolio role",
          definition:
            "The commercial job assigned to an SKU, such as recruitment, core volume, trade-up, or gifting.",
        },
        {
          term: "Cannibalization",
          definition:
            "Sales gained by one SKU at the expense of another SKU in the same company’s portfolio.",
        },
      ],
      recap: [
        "Every SKU needs a defined role in the portfolio.",
        "Absolute price, pack size, and price per unit answer different questions.",
        "A premium price needs a credible product, brand, format, or occasion benefit.",
      ],
      deepDive: {
        title: "Interpreting Vietnam consumption headroom",
        text: "The reported 2 kg versus 3 kg comparison can support a hypothesis that consumption may grow. It cannot prove how fast, which family will gain, or whether growth will be volume, price, or mix. Those questions require additional evidence.",
        sources: [S05],
      },
      supportingSourceIds: ["pf-m03-s01", "pf-m03-s05"],
      body: (
        <>
          <p>
            A portfolio ladder gives consumers a next-best choice when their
            budget or occasion changes. An access pack protects reach, a core
            line drives repeat purchase, and a premium or gifting line captures
            greater willingness to pay.
          </p>
          <p>
            Positioning makes the ladder believable. Without a visible
            difference in product, brand, format, or occasion fit, a higher
            price can look arbitrary and encourage trade-down.
          </p>
          <EvidenceNote title="Portfolio evidence" sources={[S01]}>
            Mondelez’s FY2024 chocolate growth and named portfolio are corporate
            evidence. They do not establish a universal premium price gap or an
            industry growth benchmark.
          </EvidenceNote>
          <EvidenceNote
            title="Commercial estimate, not official benchmark"
            sources={[S05]}
          >
            The approximately 2 kg Vietnam and 3 kg global per-capita figures
            are 2022 industry estimates reported by VnExpress. Keep the
            approximation, source type, geography, and year visible.
          </EvidenceNote>
        </>
      ),
    }),
  ],
  quiz: pairedQuiz([
    {
      id: "pf-m03-32-q01",
      concept: "Category economics",
      question:
        "Which input exposure most directly differentiates chocolate from biscuits?",
      options: [
        "Cocoa versus wheat/flour",
        "Store lighting versus rent",
        "Music versus color",
        "Weather versus packaging",
      ],
      correctIndex: 0,
      explanation:
        "Chocolate is cocoa-exposed, while biscuits depend more on wheat/flour, sugar, and edible oil.",
      transferQuestion:
        "A cocoa-price shock should first trigger the closest review of which family?",
      transferOptions: [
        "Chocolate confectionery",
        "Savory potato snacks",
        "Plain wheat biscuits only",
        "Every food category equally",
      ],
      transferCorrectIndex: 0,
      transferExplanation:
        "Cocoa is a direct recipe input for chocolate confectionery.",
      takeaway: "Classify the recipe before diagnosing commodity exposure.",
    },
    {
      id: "pf-m03-32-q02",
      concept: "HS classification",
      question:
        "Which heading in the lesson covers chocolate and cocoa-containing food preparations?",
      options: ["1704", "1806", "1905", "None of these"],
      correctIndex: 1,
      explanation:
        "The third-party HS reference identifies heading 1806 for chocolate and cocoa preparations.",
      transferQuestion: "How should the cited findhs.codes page be described?",
      transferOptions: [
        "Official WCO publication",
        "Third-party HS reference",
        "Consumer survey",
        "Company annual report",
      ],
      transferCorrectIndex: 1,
      transferExplanation:
        "Row 25 explicitly warns that it is not an official WCO publication.",
      takeaway: "Use the classification while preserving the source caveat.",
    },
    {
      id: "pf-m03-32-q03",
      concept: "Segment scope",
      question:
        "Orion ChocoPie’s reported approximately 66% share refers to which scope?",
      options: [
        "Vietnam’s pie segment in 2022",
        "All global packaged food",
        "All Vietnam confectionery",
        "All chocolate in Asia",
      ],
      correctIndex: 0,
      explanation:
        "The estimate is narrow: one named product in Vietnam’s “pie” segment.",
      transferQuestion: "Which restatement is invalid?",
      transferOptions: [
        "ChocoPie was reported as a pie-segment leader",
        "Orion had 66% of all Vietnamese confectionery",
        "The figure was attributed to Nielsen via VnExpress",
        "The estimate dates to 2022",
      ],
      transferCorrectIndex: 1,
      transferExplanation:
        "A pie-segment estimate cannot be expanded to the whole confectionery market.",
      takeaway: "Preserve the denominator of every market-share claim.",
    },
    {
      id: "pf-m03-32-q04",
      concept: "Premiumisation",
      question: "Which definition best captures premiumisation?",
      options: [
        "Growing value through richer mix and differentiated propositions",
        "Increasing physical volume only",
        "Raising every price without changing value",
        "Removing all mainstream products",
      ],
      correctIndex: 0,
      explanation:
        "Premiumisation combines positioning, product, format, and mix to increase value.",
      transferQuestion: "Which action is the clearest premiumisation move?",
      transferOptions: [
        "Introduce a differentiated gifting format with stronger presentation",
        "Hide a price increase",
        "Delete product benefits",
        "Ignore the target occasion",
      ],
      transferCorrectIndex: 0,
      transferExplanation:
        "The gifting format adds occasion-specific value that can support trade-up.",
      takeaway: "Premiumisation requires perceived value, not price alone.",
    },
    {
      id: "pf-m03-32-q05",
      concept: "Corporate versus market growth",
      question: "What does Mondelez’s 7.4% FY2024 figure measure?",
      options: [
        "Company chocolate revenue growth",
        "Global chocolate-market growth",
        "Vietnam inflation",
        "A profit margin",
      ],
      correctIndex: 0,
      explanation: "It is a corporate category revenue-growth result.",
      transferQuestion: "What cannot be inferred from that figure alone?",
      transferOptions: [
        "The split among price, mix, and volume",
        "That it concerns FY2024",
        "That it concerns Mondelez",
        "That the source reports chocolate revenue growth",
      ],
      transferCorrectIndex: 0,
      transferExplanation:
        "Revenue growth alone does not isolate the contributing effects.",
      takeaway:
        "Do not relabel a company growth result as market growth or volume growth.",
    },
    {
      id: "pf-m03-32-q06",
      concept: "Actionable segmentation",
      question: "Which segment description is most actionable?",
      options: [
        "Mainstream single-serve snack for an on-the-go occasion",
        "People who eat",
        "Everyone under every condition",
        "Products with packaging",
      ],
      correctIndex: 0,
      explanation:
        "It connects tier, format, and occasion to product and channel choices.",
      transferQuestion: "What is the best test of a segmentation?",
      transferOptions: [
        "It changes a product, price, message, or channel action",
        "It has the longest name",
        "It includes every consumer",
        "It avoids measurable choices",
      ],
      transferCorrectIndex: 0,
      transferExplanation:
        "Commercially useful segments lead to different decisions.",
      takeaway: "A segment matters only when it changes an action.",
    },
    {
      id: "pf-m03-32-q07",
      concept: "Price-pack architecture",
      question:
        "Why is checkout price alone insufficient to assign a price tier?",
      options: [
        "Pack size and price per unit also matter",
        "Prices never matter",
        "All packs contain equal amounts",
        "Premium always means the largest pack",
      ],
      correctIndex: 0,
      explanation:
        "A small premium pack may have a low ticket but a high unit price.",
      transferQuestion: "Which pair should be reviewed together?",
      transferOptions: [
        "Absolute ticket and price per unit",
        "Logo color and office rent only",
        "Employee count and weather only",
        "Factory age and music only",
      ],
      transferCorrectIndex: 0,
      transferExplanation:
        "Together they reveal accessibility and relative price position.",
      takeaway:
        "Interpret price through pack size, unit economics, and proposition.",
    },
    {
      id: "pf-m03-32-q08",
      concept: "Portfolio role",
      question: "What is a likely role of an access pack?",
      options: [
        "Recruit shoppers and preserve affordability",
        "Maximize gift presentation",
        "Eliminate the core range",
        "Guarantee the highest unit margin",
      ],
      correctIndex: 0,
      explanation:
        "Access packs lower the absolute ticket and support recruitment or reach.",
      transferQuestion:
        "What should be checked before adding a similar new SKU?",
      transferOptions: [
        "Its role and cannibalization risk",
        "Only whether its name is longer",
        "Whether it duplicates every existing feature",
        "Whether evidence can be ignored",
      ],
      transferCorrectIndex: 0,
      transferExplanation:
        "A new SKU should add a clear job rather than only shift internal sales.",
      takeaway: "Manage portfolios by role, not SKU count.",
    },
    {
      id: "pf-m03-32-q09",
      concept: "Consumption estimate",
      question:
        "How should Vietnam’s reported roughly 2 kg per-capita confectionery consumption be labeled?",
      options: [
        "A 2022 commercial/industry estimate via secondary reporting",
        "An official current GSO benchmark",
        "A corporate profit margin",
        "A legal limit",
      ],
      correctIndex: 0,
      explanation:
        "Row 25 explicitly identifies this as an estimate rather than official statistics.",
      transferQuestion:
        "What does the 2 kg versus roughly 3 kg global comparison support?",
      transferOptions: [
        "A hypothesis of consumption headroom",
        "A guaranteed growth rate",
        "A specific premium share",
        "A fixed price increase",
      ],
      transferCorrectIndex: 0,
      transferExplanation:
        "The comparison suggests room to grow but does not forecast the path.",
      takeaway:
        "Use commercial estimates as directional evidence, not deterministic forecasts.",
    },
    {
      id: "pf-m03-32-q10",
      concept: "Portfolio risk",
      question: "How can portfolio breadth affect commodity risk?",
      options: [
        "It can spread exposure across categories but cannot eliminate it",
        "It permanently removes every input cost",
        "It makes classification unnecessary",
        "It guarantees premium growth",
      ],
      correctIndex: 0,
      explanation:
        "Different families have different input exposures, creating diversification but not immunity.",
      transferQuestion:
        "A chocolate-heavy portfolio adds biscuits. What should management still do?",
      transferOptions: [
        "Track cocoa and the new category’s wheat, sugar, and oil exposures",
        "Stop monitoring inputs",
        "Assume every product has identical costs",
        "Treat revenue as profit",
      ],
      transferCorrectIndex: 0,
      transferExplanation:
        "Diversification adds exposures as it reduces concentration.",
      takeaway:
        "Portfolio breadth redistributes risk; it does not erase cost drivers.",
    },
  ]),
  takeaways: [
    "Separate biscuits, chocolate, sugar confectionery, and savory snacks.",
    "Recipe inputs determine category-specific commodity exposure.",
    "Preserve the exact denominator and year of every share estimate.",
    "Treat the HS citation as a third-party reference, not an official WCO source.",
    "Segment by tier, occasion, format, channel, and need.",
    "Define premiumisation as richer value and mix, not price alone.",
    "Keep corporate growth separate from market growth.",
    "Evaluate absolute ticket and unit price together.",
    "Assign every SKU a portfolio role and test cannibalization.",
    "Use consumption estimates directionally and retain their commercial-source label.",
  ],
} satisfies PackagedFoodCardData;
