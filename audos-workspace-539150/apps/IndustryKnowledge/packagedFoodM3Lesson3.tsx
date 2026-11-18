import type { PackagedFoodCardData } from "./packagedFoodM3Core";
import {
  chapter,
  citePfM3,
  pairedQuiz,
  EvidenceNote,
} from "./packagedFoodM3Core";

const S05 = citePfM3("pf-m03-s05");
const S07 = citePfM3("pf-m03-s07");

export const PACKAGED_FOOD_M3_LESSON3 = {
  id: "3.3",
  title:
    "3.3 Customer Segments & Needs—(1) Who Are the Customers and Consumers? (2) Consumption Occasions and Purchase Drivers (3) How Vietnamese Consumer Preferences Are Changing",
  chapters: [
    chapter({
      id: "3.3.1",
      title: "(1) Who Are the Customers and Consumers?",
      hook: "The person who pays the manufacturer is often not the person who eats the product—and the shopper who chooses it may be a third person.",
      objective:
        "Distinguish trade customer, shopper, consumer, and eater, then connect each role to the commercial and brand decisions it influences.",
      narrative: [
        {
          label: "Frame",
          text: "The trade customer buys from the manufacturer; the shopper chooses and pays at retail; the consumer uses the product; and the eater may be the shopper, a child, a family member, or a gift recipient.",
        },
        {
          label: "Mechanism",
          text: "Sales teams create availability with distributors and retailers. Brand and Insights create relevance for shoppers and consumers. Packaging must satisfy both the trade’s handling needs and the consumer’s need for recognition, information, and appeal.",
        },
        {
          label: "Global lens",
          text: "Packaged-food companies generally operate B2B2C: trade customers control listings, shelf space, and promotions, while consumer preference and repeat purchase create long-run demand.",
        },
        {
          label: "Vietnam lens",
          text: "WinMart reported that Vietnamese-made goods represented more than 90% of its offer in 2024. This describes one retailer’s assortment and signals local-brand presence; it is not a consumer-preference survey or a national sales share.",
        },
        {
          label: "MT lens",
          text: "State whose problem you are solving. A key-account plan targets the retailer, a pack redesign may target the shopper, and a taste reformulation targets the eater—even when all three affect one SKU.",
        },
      ],
      globalExample: {
        title: "One product, several decision makers",
        detail:
          "A family pack may be listed by a retailer buyer, selected by a parent, consumed by several family members, and evaluated by each eater. The business must win the shelf and the household.",
        sources: [S07],
      },
      vietnamExample: {
        title: "Local products on a modern-trade shelf",
        detail:
          "Company reporting via business press said Vietnamese goods made up more than 90% of WinMart’s offer in 2024. The statistic concerns assortment at WinMart—not national demand, sales, or loyalty.",
        sources: [S07],
      },
      visualKind: "packaged-food-m3-33-1",
      visual: {
        title: "The four-role customer map",
        subtitle: "The buyer, chooser, user, and eater can be different people",
        ariaLabel:
          "A role map connecting trade customer, shopper, consumer, and eater to the decisions each makes.",
        readingGuide:
          "Follow the product from listing to selection to use, and name the role at each decision.",
        roles: [
          {
            role: "Trade customer",
            decision: "List, stock, display, promote",
            servedBy: "Sales / Key Account / Trade Marketing",
          },
          {
            role: "Shopper",
            decision: "Choose and pay",
            servedBy: "Shopper Marketing / Brand / Revenue Growth",
          },
          {
            role: "Consumer",
            decision: "Use and evaluate",
            servedBy: "Brand / Insights / Innovation",
          },
          {
            role: "Eater",
            decision: "Taste, enjoy, reject, request again",
            servedBy: "R&D / Sensory / Brand",
          },
        ],
        caution:
          "Do not interpret retailer assortment share as national consumer preference.",
        sourceIds: ["pf-m03-s07"],
      },
      keyTerms: [
        {
          term: "Trade customer",
          definition:
            "The distributor or retailer that buys directly or indirectly from the manufacturer.",
        },
        {
          term: "Shopper",
          definition:
            "The person who selects and pays for the product at the point of purchase.",
        },
        {
          term: "Consumer",
          definition: "The person or household that uses the product.",
        },
        {
          term: "Eater",
          definition:
            "The person who actually consumes the food and experiences its taste and texture.",
        },
      ],
      recap: [
        "The trade customer, shopper, consumer, and eater can be different actors.",
        "Sales wins availability; Brand, Insights, and Innovation win relevance and repeat.",
        "A retailer assortment statistic is not automatically a consumer-demand statistic.",
      ],
      deepDive: {
        title: "Reading the WinMart statistic correctly",
        text: "“More than 90% of the offer” describes the share of Vietnamese-made goods in WinMart’s assortment. It can illustrate local-product presence in modern trade, but it does not measure unit sales, value sales, preference, loyalty, or the whole Vietnamese grocery market.",
        sources: [S07],
      },
      supportingSourceIds: ["pf-m03-s07"],
      body: (
        <>
          <p>
            Customer language becomes precise when each role is tied to a
            decision. Retail buyers decide whether the product reaches the
            shelf. Shoppers decide whether it enters the basket. Consumers and
            eaters determine whether the experience earns repeat purchase.
          </p>
          <p>
            The roles may collapse into one person for an impulse snack or
            separate across a household and gift recipient. Segment design and
            research should reflect the actual decision chain.
          </p>
          <EvidenceNote title="Retailer assortment evidence" sources={[S07]}>
            The more-than-90% figure is company reporting about Vietnamese goods
            in WinMart’s offer. It should not be rewritten as a national market
            share or a measured consumer preference.
          </EvidenceNote>
        </>
      ),
    }),
    chapter({
      id: "3.3.2",
      title: "(2) Consumption Occasions and Purchase Drivers",
      hook: "The same consumer can choose a low-ticket candy at checkout, a family pack for home, and a premium box for Tết—because the occasion changes the job.",
      objective:
        "Use consumption occasions to connect product format, price, placement, and purchase drivers without inventing seasonal shares.",
      narrative: [
        {
          label: "Frame",
          text: "The core occasions are everyday snacking, on-the-go convenience, impulse purchase, in-home sharing, and gifting. Occasion often predicts the winning pack and price better than demographics alone.",
        },
        {
          label: "Mechanism",
          text: "Taste and indulgence create desire; convenience and availability convert it; affordability controls access; packaging signals suitability; promotion can trigger choice when several brands are acceptable.",
        },
        {
          label: "Global lens",
          text: "Impulse favors visible single serves and low absolute tickets, sharing favors resealable or family formats, and gifting favors presentation and a proposition suitable for the recipient.",
        },
        {
          label: "Vietnam lens",
          text: "Tết gift boxes and Mid-Autumn products make gifting strategically important, while everyday shoppers remain price sensitive. Row 25 contains no verified percentage for the share of annual sales in these seasonal peaks.",
        },
        {
          label: "MT lens",
          text: "Write an occasion brief as “who, when, where, need, product, and price.” Then align the pack, shelf, message, and availability plan to that job.",
        },
      ],
      globalExample: {
        title: "The occasion changes the commercial system",
        detail:
          "A checkout item needs visibility and an accessible ticket; an in-home sharing pack needs value and format suitability; a gift needs presentation and recipient relevance. No single format wins every job.",
        sources: [S05],
      },
      vietnamExample: {
        title: "Gifting and everyday demand coexist",
        detail:
          "Tết and Mid-Autumn create high-value gifting occasions, while the wider market includes everyday value and mainstream purchases. The source supports the occasions qualitatively; it does not provide a seasonal sales-share statistic.",
        sources: [S05],
      },
      visualKind: "packaged-food-m3-33-2",
      visual: {
        title: "Occasion-to-offer decision map",
        subtitle:
          "Start with the job, then design the pack and route to purchase",
        ariaLabel:
          "A matrix linking five consumption occasions to needs, likely formats, and purchase drivers.",
        readingGuide:
          "Read across one occasion and test whether every commercial choice supports the same job.",
        occasions: [
          {
            occasion: "Everyday snack",
            need: "Taste + routine",
            format: "Core single or multipack",
            driver: "Availability + familiar brand",
          },
          {
            occasion: "On the go",
            need: "Convenience",
            format: "Portable single serve",
            driver: "Ease + accessible ticket",
          },
          {
            occasion: "Impulse",
            need: "Immediate reward",
            format: "Visible small pack",
            driver: "Placement + promotion + appetite",
          },
          {
            occasion: "In-home sharing",
            need: "Family or social use",
            format: "Larger or resealable pack",
            driver: "Value + broad appeal",
          },
          {
            occasion: "Gifting",
            need: "Social meaning",
            format: "Gift box or seasonal design",
            driver: "Presentation + brand + recipient fit",
          },
        ],
        evidenceGap:
          "No primary-verified Tết or Mid-Autumn share of annual confectionery sales is supplied in row 25.",
        sourceIds: ["pf-m03-s05"],
      },
      keyTerms: [
        {
          term: "Consumption occasion",
          definition:
            "The situation and job for which a product is selected and used.",
        },
        {
          term: "Purchase driver",
          definition:
            "A factor that changes choice, such as taste, availability, affordability, convenience, brand, packaging, or promotion.",
        },
        {
          term: "Impulse purchase",
          definition:
            "A purchase made with little advance planning, often triggered by visibility and immediate desire.",
        },
        {
          term: "Gifting",
          definition:
            "An occasion in which the buyer selects for a recipient and social meaning affects product and presentation.",
        },
      ],
      recap: [
        "Occasion often predicts format and price better than demographics alone.",
        "Availability can convert preference into purchase, especially for impulse products.",
        "Do not invent a percentage for seasonal gifting demand.",
      ],
      deepDive: {
        title: "Why gifting is not merely a premium tier",
        text: "A gift must work for a buyer and recipient in a social setting. Premium cues may help, but suitability, presentation, trust, and cultural timing define the occasion. A premium everyday bar and a Tết gift box therefore perform different jobs.",
        sources: [S05],
      },
      supportingSourceIds: ["pf-m03-s05"],
      body: (
        <>
          <p>
            Occasion segmentation captures behavior that static demographics
            miss. The same person can trade down for a routine snack and trade
            up for a visible social occasion without contradiction.
          </p>
          <p>
            Purchase drivers work as a system. Strong taste cannot generate a
            sale if the pack is unavailable; good distribution cannot sustain
            repeat if the experience disappoints; premium presentation may be
            wasted when the occasion demands a low ticket.
          </p>
          <EvidenceNote
            title="Qualitative seasonality evidence"
            sources={[S05]}
          >
            The source supports Tết and Mid-Autumn as important Vietnamese
            gifting contexts. Row 25 explicitly lists the share of annual sales
            in those peaks as a research gap, so the lesson gives no percentage.
          </EvidenceNote>
        </>
      ),
    }),
    chapter({
      id: "3.3.3",
      title: "(3) How Vietnamese Consumer Preferences Are Changing",
      hook: "Vietnamese demand is not moving in one direction: shoppers seek affordability and local relevance while some occasions support convenience, wellness, and premium trade-up.",
      objective:
        "Explain the simultaneous forces shaping Vietnamese preferences and interpret local market signals with appropriate evidence caveats.",
      narrative: [
        {
          label: "Frame",
          text: "Vietnam combines a young, urbanizing consumer base with strong local-taste affinity, gifting culture, price sensitivity, and growing interest in convenience, premium experiences, and health and wellness.",
        },
        {
          label: "Mechanism",
          text: "Income, urban lifestyles, modern retail, and brand innovation can enable trade-up, while household budgets preserve demand for accessible packs and local propositions. These are simultaneous segments, not a single linear shift.",
        },
        {
          label: "Global lens",
          text: "Across packaged food, health and wellness encourages portion control and “better-for-you” renovation, while indulgence remains central. The portfolio response is often choice rather than replacing indulgence entirely.",
        },
        {
          label: "Vietnam lens",
          text: "Secondary reporting cited about 2 kg per-capita confectionery consumption versus roughly 3 kg globally in 2022 and forecast a VND66 trillion Vietnam confectionery market by 2025. Both are commercial estimates, not official statistics.",
        },
        {
          label: "MT lens",
          text: "Translate trends into testable hypotheses: which segment, occasion, channel, pack, and benefit should change? Validate with current consumer and sales evidence before scaling.",
        },
      ],
      globalExample: {
        title: "Choice expands instead of moving uniformly",
        detail:
          "Wellness, portion control, indulgence, affordability, and premium gifting can coexist. A portfolio can serve several needs rather than assuming every consumer moves to the same tier.",
        sources: [S05, S07],
      },
      vietnamExample: {
        title: "Directional evidence of headroom and scale",
        detail:
          "VnExpress, citing industry data, reported approximately 2 kg per person in 2022 versus roughly 3 kg globally and a VND66 trillion 2025 market forecast. These are secondary commercial estimates and should remain labeled as such.",
        sources: [S05],
      },
      visualKind: "packaged-food-m3-33-3",
      visual: {
        title: "Vietnam preference tensions",
        subtitle:
          "Growth comes from serving coexisting needs, not assuming one average shopper",
        ariaLabel:
          "A tension map showing affordability and premium trade-up, local taste and global brands, indulgence and wellness, routine and gifting.",
        readingGuide:
          "Read each pair as simultaneous demand spaces that a portfolio may serve.",
        tensions: [
          {
            left: "Affordability",
            right: "Premium trade-up",
            implication:
              "Protect access packs and build credible premium benefits",
          },
          {
            left: "Local taste",
            right: "Global brand cues",
            implication: "Adapt propositions without erasing brand meaning",
          },
          {
            left: "Indulgence",
            right: "Health and wellness",
            implication: "Offer choice, portion control, and renovation",
          },
          {
            left: "Everyday routine",
            right: "Seasonal gifting",
            implication: "Plan distinct formats and activation calendars",
          },
        ],
        evidenceLabels: [
          "2 kg/person/year: 2022 commercial estimate",
          "≈3 kg global comparator: commercial estimate",
          "VND66tn: 2025 industry forecast via secondary reporting",
          ">90% local goods in WinMart offer: retailer assortment claim",
        ],
        sourceIds: ["pf-m03-s05", "pf-m03-s07"],
      },
      keyTerms: [
        {
          term: "Local-taste affinity",
          definition:
            "Preference for flavors, textures, formats, and brands perceived as relevant to local habits.",
        },
        {
          term: "Health and wellness",
          definition:
            "A need space including portion control, reduced sugar, and “better-for-you” propositions.",
        },
        {
          term: "Trade-up",
          definition:
            "Choosing a more differentiated or higher-priced proposition for a need or occasion.",
        },
        {
          term: "Commercial estimate",
          definition:
            "A market figure produced or reported by industry sources rather than an official statistical benchmark.",
        },
      ],
      recap: [
        "Affordability, premiumisation, local relevance, and wellness can grow at the same time.",
        "Market forecasts and per-capita estimates are directional, not guarantees.",
        "Translate a trend into a specific, testable commercial hypothesis.",
      ],
      deepDive: {
        title: "Three evidence traps",
        text: "Do not convert a 2025 market forecast into an actual result; do not convert a retailer’s assortment composition into preference or sales share; and do not convert a per-capita gap into a guaranteed growth rate.",
        sources: [S05, S07],
      },
      supportingSourceIds: ["pf-m03-s05", "pf-m03-s07"],
      body: (
        <>
          <p>
            “The Vietnamese consumer” is not one segment. An urban convenience
            shopper, a value-seeking family buyer, a health-conscious consumer,
            and a Tết gift buyer may require different products—and can even be
            the same person in different moments.
          </p>
          <p>
            Trends become useful when converted into choices. For example,
            wellness can suggest portion control or renovation; convenience can
            suggest portable formats; local relevance can shape flavor; gifting
            can shape presentation and timing.
          </p>
          <EvidenceNote title="Commercial estimates" sources={[S05]}>
            The approximately 2 kg Vietnam and 3 kg global per-capita figures
            refer to 2022. VND66 trillion is a 2025 market forecast reported via
            VnExpress with Nielsen attribution. None is an official GSO actual.
          </EvidenceNote>
          <EvidenceNote title="Company assortment signal" sources={[S07]}>
            Vietnamese goods representing more than 90% of WinMart’s offer is a
            retailer assortment claim. It may motivate a local-relevance
            hypothesis but does not prove national consumer preference.
          </EvidenceNote>
        </>
      ),
    }),
  ],
  quiz: pairedQuiz([
    {
      id: "pf-m03-33-q01",
      concept: "Customer roles",
      question:
        "Who is the manufacturer’s immediate customer in a typical B2B2C flow?",
      options: [
        "Distributor or retailer",
        "Only the eater",
        "Only the gift recipient",
        "A commodity exchange",
      ],
      correctIndex: 0,
      explanation:
        "The trade customer buys from the manufacturer and resells toward the final consumer.",
      transferQuestion:
        "A parent buys biscuits for children. Who is the shopper?",
      transferOptions: [
        "The parent",
        "Only the children",
        "The retailer buyer",
        "The factory manager",
      ],
      transferCorrectIndex: 0,
      transferExplanation:
        "The shopper selects and pays, while the children are eaters.",
      takeaway:
        "Name the trade customer, shopper, consumer, and eater separately.",
    },
    {
      id: "pf-m03-33-q02",
      concept: "Functional ownership",
      question: "Which team most directly manages retailer listings and terms?",
      options: [
        "Sales or Key Account",
        "Sensory R&D only",
        "Payroll only",
        "Facilities only",
      ],
      correctIndex: 0,
      explanation:
        "Sales and Key Account teams serve trade customers and manage commercial execution.",
      transferQuestion:
        "Which team is most directly concerned with eater taste response?",
      transferOptions: [
        "R&D and Consumer Insights",
        "Treasury only",
        "Warehouse security only",
        "Tax only",
      ],
      transferCorrectIndex: 0,
      transferExplanation:
        "Taste and sensory experience sit with product and consumer-learning functions.",
      takeaway: "The role being served determines the function and metric.",
    },
    {
      id: "pf-m03-33-q03",
      concept: "Assortment evidence",
      question: "What does WinMart’s reported “more than 90%” figure describe?",
      options: [
        "Vietnamese goods in its offer",
        "National consumer preference",
        "Vietnam confectionery sales share",
        "Repeat-purchase rate",
      ],
      correctIndex: 0,
      explanation:
        "The company-reported statistic concerns retailer assortment.",
      transferQuestion: "Which use of the figure is sound?",
      transferOptions: [
        "A signal of strong local-product presence on one retailer’s shelves",
        "Proof that over 90% of all consumers prefer local brands",
        "A national market-share benchmark",
        "A confectionery-only loyalty measure",
      ],
      transferCorrectIndex: 0,
      transferExplanation:
        "The interpretation preserves retailer and assortment scope.",
      takeaway:
        "Assortment, sales, preference, and loyalty are different measures.",
    },
    {
      id: "pf-m03-33-q04",
      concept: "Occasion segmentation",
      question:
        "Which factor best explains why one consumer buys both value candy and a premium gift box?",
      options: [
        "Different occasions",
        "Logical inconsistency",
        "Identical product jobs",
        "No price sensitivity",
      ],
      correctIndex: 0,
      explanation:
        "Routine impulse and gifting create different needs and willingness to pay.",
      transferQuestion: "Which format best fits in-home sharing?",
      transferOptions: [
        "Larger or resealable pack",
        "Unprotected single piece only",
        "Industrial bulk ingredient",
        "No pack information",
      ],
      transferCorrectIndex: 0,
      transferExplanation:
        "A sharing format should support several users and the in-home context.",
      takeaway:
        "The same person can occupy different need states across occasions.",
    },
    {
      id: "pf-m03-33-q05",
      concept: "Impulse drivers",
      question:
        "Which combination most directly supports an impulse confectionery purchase?",
      options: [
        "Visibility, availability, and accessible ticket",
        "A hidden shelf and stockout",
        "Long preparation and no display",
        "Only annual corporate revenue",
      ],
      correctIndex: 0,
      explanation:
        "Impulse conversion depends on seeing, finding, and affording the product in the moment.",
      transferQuestion:
        "A preferred brand is absent at checkout. What is the immediate commercial failure?",
      transferOptions: [
        "Availability",
        "Taste formulation",
        "Annual reporting",
        "Factory ownership",
      ],
      transferCorrectIndex: 0,
      transferExplanation:
        "Preference cannot convert when the product is unavailable.",
      takeaway: "Trade execution converts brand preference into purchase.",
    },
    {
      id: "pf-m03-33-q06",
      concept: "Gifting",
      question:
        "What makes gifting distinct from an everyday premium purchase?",
      options: [
        "A recipient and social meaning shape the choice",
        "The buyer never considers packaging",
        "Price is always irrelevant",
        "Taste can never matter",
      ],
      correctIndex: 0,
      explanation:
        "Gifting must satisfy buyer, recipient, presentation, and occasion.",
      transferQuestion:
        "What seasonal sales-share figure does row 25 support for Tết and Mid-Autumn?",
      transferOptions: [
        "No verified percentage",
        "Exactly 50%",
        "Exactly 90%",
        "Exactly 7%",
      ],
      transferCorrectIndex: 0,
      transferExplanation:
        "Seasonal share is explicitly listed as a research gap.",
      takeaway:
        "Teach the gifting mechanism without fabricating seasonal shares.",
    },
    {
      id: "pf-m03-33-q07",
      concept: "Preference tensions",
      question:
        "Which statement best describes change in Vietnamese preferences?",
      options: [
        "Affordability and premium trade-up can coexist",
        "Every shopper is moving to one identical tier",
        "Local relevance no longer matters",
        "Indulgence has disappeared",
      ],
      correctIndex: 0,
      explanation:
        "Different segments and occasions support simultaneous value and premium demand.",
      transferQuestion: "What is the strongest portfolio response?",
      transferOptions: [
        "Serve distinct needs with clear propositions",
        "Assume one average consumer",
        "Remove every accessible pack",
        "Use one occasion for all products",
      ],
      transferCorrectIndex: 0,
      transferExplanation:
        "A portfolio can address coexisting need states without treating them as contradictory.",
      takeaway: "Consumer change is multidirectional and segment-specific.",
    },
    {
      id: "pf-m03-33-q08",
      concept: "Per-capita estimate",
      question:
        "How should the reported Vietnam figure of about 2 kg per person per year be treated?",
      options: [
        "A 2022 commercial estimate via secondary reporting",
        "A guaranteed 2026 result",
        "An official nutritional recommendation",
        "A company gross margin",
      ],
      correctIndex: 0,
      explanation:
        "The source reports an industry estimate and comparison, not official statistics.",
      transferQuestion:
        "What can the gap versus roughly 3 kg globally support?",
      transferOptions: [
        "A headroom hypothesis",
        "A guaranteed category growth rate",
        "A precise premium share",
        "A legal requirement",
      ],
      transferCorrectIndex: 0,
      transferExplanation:
        "The comparison is directional and does not predict the growth path.",
      takeaway: "Headroom is a hypothesis, not a forecast.",
    },
    {
      id: "pf-m03-33-q09",
      concept: "Forecast discipline",
      question: "What is the VND66tn figure in the research?",
      options: [
        "A 2025 Vietnam confectionery market forecast via secondary reporting",
        "An audited actual for 2025",
        "WinMart revenue",
        "A consumer income threshold",
      ],
      correctIndex: 0,
      explanation:
        "The research labels it a commercial/industry forecast attributed through VnExpress.",
      transferQuestion: "Which phrasing preserves the evidence?",
      transferOptions: [
        "The market was forecast to reach VND66tn in 2025",
        "Official data proved VND66tn of actual sales",
        "Every company earned VND66tn",
        "The forecast guarantees future growth",
      ],
      transferCorrectIndex: 0,
      transferExplanation:
        "The wording keeps forecast status, market scope, and date.",
      takeaway: "Never rewrite a forecast as an actual result.",
    },
    {
      id: "pf-m03-33-q10",
      concept: "Trend activation",
      question:
        "What is the best next step after identifying a wellness trend?",
      options: [
        "Form a segment-specific hypothesis and test product, pack, and sales evidence",
        "Assume every consumer wants the same reformulation",
        "Invent a market share",
        "Remove indulgent products immediately",
      ],
      correctIndex: 0,
      explanation:
        "A broad trend becomes actionable only through a specific, validated proposition.",
      transferQuestion: "Which question makes a trend commercially testable?",
      transferOptions: [
        "Which segment, occasion, benefit, pack, and channel should change?",
        "Can all evidence labels be removed?",
        "Can one average shopper represent everyone?",
        "Can forecasts replace consumer research?",
      ],
      transferCorrectIndex: 0,
      transferExplanation:
        "The question translates a trend into observable choices and outcomes.",
      takeaway:
        "Convert trends into explicit hypotheses before scaling investment.",
    },
  ]),
  takeaways: [
    "Separate trade customer, shopper, consumer, and eater.",
    "Match each role to the function and decision that serves it.",
    "Do not turn retailer assortment into preference or sales share.",
    "Use occasion to explain changes in format and willingness to pay.",
    "Availability is a purchase driver, especially for impulse products.",
    "Treat gifting as a social job, not only a premium tier.",
    "Leave unsourced Tết and Mid-Autumn sales shares unquantified.",
    "Recognize that affordability, premiumisation, local taste, and wellness coexist.",
    "Label per-capita figures and market forecasts as commercial estimates.",
    "Turn broad trends into segment-specific, testable hypotheses.",
  ],
} satisfies PackagedFoodCardData;
