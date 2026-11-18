import type { PackagedFoodCardData } from "./packagedFoodM3Core";
import {
  chapter,
  citePfM3,
  EvidenceNote,
  pairedQuiz,
} from "./packagedFoodM3Core";

const S = {
  mondelezResults: citePfM3("pf-m03-s01"),
  codex: citePfM3("pf-m03-s03"),
  hsReference: citePfM3("pf-m03-s04"),
  modernGrocery: citePfM3("pf-m03-s08"),
} as const;

export const PACKAGED_FOOD_M3_LESSON6 = {
  id: "pf-m03-l06",
  moduleId: "pf-m03",
  lessonNumber: "3.6",
  title:
    "Industry Ecosystem & Stakeholders—(1) Mapping the Packaged Food Ecosystem (2) Commercial Relationships Across Suppliers and Channels (3) Regulators, Industry Associations, and Strategic Partnerships",
  shortTitle: "Industry Ecosystem & Stakeholders",
  objective:
    "Map the stakeholders around a packaged-food brand, explain how value and risk move through their relationships, and identify the regulatory and partnership interfaces an MT must manage.",
  sources: ["pf-m03-s01", "pf-m03-s03", "pf-m03-s04", "pf-m03-s08"],
  chapters: [
    chapter({
      id: "pf-m03-l06-c01",
      number: "3.6.1",
      title: "Mapping the Packaged Food Ecosystem",
      hook: "The brand on the pack is only the visible center of a system spanning farms, processors, packaging, logistics, shelves, standards, and shoppers.",
      objective:
        "Identify upstream, core, downstream, and enabling stakeholders and distinguish the risks each carries.",
      narrative: [
        {
          label: "Core idea",
          text: "The ecosystem runs from agricultural producers through ingredient and packaging suppliers to food manufacturers and brand owners, then through distributors, wholesalers, retailers, foodservice, and ultimately consumers.",
        },
        {
          label: "How it works",
          text: "Value, product, information, standards, risk, and cash move in different directions. Farmers and processors face climate and commodity risk; manufacturers carry product, brand, and compliance risk; distributors carry inventory and credit risk; retailers control access to the shelf.",
        },
        {
          label: "Global example",
          text: "Chocolate links cocoa growers and processors to manufacturers such as Mondelez, then to global routes to market. Mondelez reported approximately 90% of cocoa sourced through Cocoa Life and approximately 96% recyclable packaging in 2024—company metrics, not industry-wide rates.",
          citations: [S.mondelezResults],
        },
        {
          label: "Vietnam example",
          text: "In Vietnam, manufacturers must connect upstream inputs and packaging to fragmented traditional retail and concentrated modern grocery. The top seven modern-grocery players held nearly 90% of modern-channel value in 2024, concentrating one downstream interface.",
          citations: [S.modernGrocery],
        },
        {
          label: "MT lens",
          text: "Map both dependency and power. Ask what each stakeholder supplies, what risk it absorbs, what information it owns, and how easily it can be replaced.",
        },
      ],
      visualKind: "packaged-food-m3-36-1",
      visual: {
        title: "The packaged-food ecosystem map",
        subtitle: "Stakeholders surround the physical value chain",
        ariaLabel:
          "Ecosystem map from agricultural suppliers to consumers, surrounded by regulators, standards bodies, associations, finance, and sustainability partners",
        type: "ecosystem-map",
        lanes: [
          {
            id: "upstream",
            label: "Upstream",
            nodes: [
              "Agricultural producers",
              "Ingredient processors",
              "Packaging suppliers",
            ],
            risks: ["climate", "commodity price", "traceability"],
          },
          {
            id: "core",
            label: "Core",
            nodes: ["Food processors", "Brand owners", "Co-manufacturers"],
            risks: ["quality", "brand", "compliance", "capacity"],
          },
          {
            id: "downstream",
            label: "Downstream",
            nodes: [
              "Distributors",
              "Wholesalers",
              "Retailers",
              "Foodservice",
              "Consumers",
            ],
            risks: ["inventory", "credit", "availability", "sell-through"],
          },
        ],
        orbit: [
          "Regulators",
          "Standards bodies",
          "Industry associations",
          "Logistics providers",
          "Sustainability partners",
        ],
        sourceIds: ["pf-m03-s01", "pf-m03-s03", "pf-m03-s08"],
      },
      globalExample: {
        title: "Cocoa and packaging commitments at Mondelez",
        body: "Mondelez reported approximately 90% of cocoa through Cocoa Life and approximately 96% recyclable packaging in 2024. These indicate company sourcing and packaging progress, not category-wide performance.",
        sourceIds: ["pf-m03-s01"],
      },
      vietnamExample: {
        title: "A concentrated modern-retail interface",
        body: "Nearly 90% of modern-channel value sat with the top seven modern-grocery players in 2024. This increases the strategic importance of retailer relationships while traditional channels remain relevant.",
        sourceIds: ["pf-m03-s08"],
      },
      keyTerms: [
        {
          term: "Ecosystem",
          definition:
            "The connected organizations and institutions that create, govern, move, sell, and consume a product.",
        },
        {
          term: "Stakeholder",
          definition:
            "A party that affects, or is affected by, the company’s decisions and outcomes.",
        },
        {
          term: "Traceability",
          definition:
            "The ability to follow a material or product through relevant stages of sourcing and supply.",
        },
        {
          term: "Shelf power",
          definition:
            "A retailer’s influence over listing, placement, promotion, and access to shoppers.",
        },
      ],
      recap: [
        "The ecosystem extends beyond the manufacturer in both directions.",
        "Each stakeholder performs a job and carries a different risk.",
        "Company sustainability metrics must not be generalized into industry rates.",
      ],
      deepDive: {
        title: "Why the map is not a straight line",
        body: "Manufacturers may buy through processors rather than farms, retailers may source through distributors, and standards affect every stage. The map is a network of contracts and influence, not one universal chain.",
      },
      body: (
        <>
          <p>
            A useful ecosystem map labels flows separately: physical product
            moves downstream, cash mostly moves upstream, and standards,
            forecasts, risk, and data move in both directions.
          </p>
          <EvidenceNote sourceIds={["pf-m03-s01", "pf-m03-s08"]}>
            The 90% Cocoa Life, 96% recyclable-packaging, and nearly 90%
            modern-channel concentration figures have different denominators and
            scopes. They must not be combined.
          </EvidenceNote>
        </>
      ),
    }),
    chapter({
      id: "pf-m03-l06-c02",
      number: "3.6.2",
      title: "Commercial Relationships Across Suppliers and Channels",
      hook: "A manufacturer can negotiate hard with a supplier today and still depend on that supplier’s resilience tomorrow.",
      objective:
        "Explain how commercial terms, information, risk allocation, and power shape supplier, distributor, and retailer relationships.",
      narrative: [
        {
          label: "Core idea",
          text: "Commercial relationships allocate value and risk. Suppliers provide inputs and assurance; manufacturers provide demand and specifications; distributors provide reach and working capital; retailers provide shopper access and data.",
        },
        {
          label: "How it works",
          text: "Contracts and operating routines cover specifications, price, volume, quality, service, inventory, credit, promotions, traceability, and recovery from disruption. The cheapest quoted input is not necessarily the lowest total-risk option.",
        },
        {
          label: "Global example",
          text: "Cocoa scarcity can strengthen upstream pricing power, while a program such as Cocoa Life illustrates a longer-term manufacturer–sourcing relationship built around supply and sustainability. Row 25 gives the company sourcing percentage but no supplier-contract terms.",
          citations: [S.mondelezResults],
        },
        {
          label: "Vietnam example",
          text: "Modern-grocery consolidation increases downstream buyer power: nearly 90% of modern-channel value was held by seven players in 2024. Manufacturers also depend on distributors and wholesalers to reach fragmented traditional outlets.",
          citations: [S.modernGrocery],
        },
        {
          label: "MT lens",
          text: "Negotiate total value, not just unit price. Include service, quality, innovation, inventory, cash, data, compliance, and resilience in the relationship scorecard.",
        },
      ],
      visualKind: "packaged-food-m3-36-2",
      visual: {
        title: "Value and risk at each interface",
        subtitle: "Every relationship exchanges more than product and money",
        ariaLabel:
          "Interface map showing exchanges between suppliers, manufacturers, distributors, retailers, and consumers",
        type: "relationship-map",
        interfaces: [
          {
            id: "supplier-manufacturer",
            parties: ["Supplier", "Manufacturer"],
            supplierProvides: ["input", "quality", "traceability", "capacity"],
            manufacturerProvides: [
              "forecast",
              "specification",
              "demand",
              "cash",
            ],
            risks: ["commodity", "climate", "quality", "continuity"],
          },
          {
            id: "manufacturer-distributor",
            parties: ["Manufacturer", "Distributor"],
            supplierProvides: ["brand", "product", "commercial support"],
            manufacturerProvides: [
              "coverage",
              "inventory",
              "credit",
              "field data",
            ],
            risks: ["working capital", "returns", "execution"],
          },
          {
            id: "manufacturer-retailer",
            parties: ["Manufacturer", "Retailer / key account"],
            supplierProvides: ["assortment", "supply", "promotion"],
            manufacturerProvides: [
              "listing",
              "shelf",
              "shopper access",
              "data",
            ],
            risks: ["trade terms", "availability", "buyer concentration"],
          },
        ],
        sourceIds: ["pf-m03-s01", "pf-m03-s08"],
        caveat:
          "The research supports mechanisms and concentration, not confidential contract terms or margin splits.",
      },
      globalExample: {
        title: "Cocoa Life as a sourcing relationship",
        body: "Approximately 90% of Mondelez cocoa was reported as sourced through Cocoa Life in 2024. The source supports the company metric, but not a claim about supplier pricing, farmer income, or industry adoption.",
        sourceIds: ["pf-m03-s01"],
      },
      vietnamExample: {
        title: "Power at both downstream routes",
        body: "Manufacturers need distributor reach in GT and key-account strength in concentrated MT. The top-seven statistic applies only to modern-channel value.",
        sourceIds: ["pf-m03-s08"],
      },
      keyTerms: [
        {
          term: "Total cost of ownership",
          definition:
            "The purchase price plus costs and risks of quality, logistics, inventory, failure, and service.",
        },
        {
          term: "Working capital",
          definition:
            "Cash tied up in inventory and receivables, offset by payment terms and payables.",
        },
        {
          term: "Supplier assurance",
          definition:
            "Processes used to verify capability, quality, compliance, and continuity.",
        },
        {
          term: "Buyer power",
          definition:
            "A customer’s ability to influence price, terms, access, and supplier behavior.",
        },
      ],
      recap: [
        "Commercial relationships allocate service, information, value, and risk.",
        "Cocoa scarcity and retailer concentration can shift bargaining power.",
        "No confidential contract terms or channel margin splits are verified in row 25.",
      ],
      deepDive: {
        title: "Why resilience can justify a higher quoted price",
        body: "A supplier with stronger traceability, quality control, capacity, or recovery planning may reduce expected disruption cost. The concept is valid, but row 25 does not quantify a resilience premium.",
      },
      body: (
        <>
          <p>
            Supplier and channel relationships should be managed as operating
            systems. A contract sets expectations; forecasts, quality reviews,
            joint plans, and issue resolution determine actual performance.
          </p>
          <EvidenceNote sourceIds={["pf-m03-s01", "pf-m03-s08"]}>
            The source set contains company sourcing and market-concentration
            evidence, but no verified supplier, distributor, or retailer margin
            percentages.
          </EvidenceNote>
        </>
      ),
    }),
    chapter({
      id: "pf-m03-l06-c03",
      number: "3.6.3",
      title: "Regulators, Industry Associations, and Strategic Partnerships",
      hook: "A product can be commercially attractive and still fail if its safety, label, classification, sourcing, or claims do not meet the relevant rules.",
      objective:
        "Differentiate binding national regulation, international standards, trade classification, collective industry representation, and voluntary strategic partnerships.",
      narrative: [
        {
          label: "Core idea",
          text: "Regulators enforce applicable law; standards bodies develop reference frameworks; customs classifications organize traded goods; associations coordinate common interests; partnerships can address sourcing, capability, innovation, and sustainability.",
        },
        {
          label: "How it works",
          text: "Codex provides international food standards, guidelines, and codes of practice. HS headings classify goods for trade. In Vietnam, the Law on Food Safety (2010), Ministry of Health, and Vietnam Food Administration form part of the domestic compliance landscape described in row 25.",
        },
        {
          label: "Global example",
          text: "Codex has operated as the joint FAO/WHO food-standards programme since 1963. The row’s HS reference describes Chapters 17, 18, and 19, but it is a third-party reference—not an official WCO publication.",
          citations: [S.codex, S.hsReference],
        },
        {
          label: "Vietnam example",
          text: "Vietnam’s food-safety framework and VFA interface matter for domestic compliance, while modern-retail concentration raises the value of compliant, scalable retailer partnerships. Row 25 does not verify a named Vietnamese confectionery association or its membership.",
          citations: [S.modernGrocery],
        },
        {
          label: "MT lens",
          text: "Classify the institution before using it: law, regulator, international standard, trade nomenclature, association, or voluntary program. Their authority and business implications are not interchangeable.",
        },
      ],
      visualKind: "packaged-food-m3-36-3",
      visual: {
        title: "Who sets rules, references, and collective action?",
        subtitle: "Authority differs across ecosystem institutions",
        ariaLabel:
          "Governance stack comparing national regulation, Codex standards, HS classification, associations, and strategic partnerships",
        type: "governance-stack",
        layers: [
          {
            id: "national",
            label: "Binding domestic framework",
            examples: [
              "Vietnam Law on Food Safety (2010)",
              "Ministry of Health / Vietnam Food Administration",
            ],
            role: "Domestic legal compliance and administration",
          },
          {
            id: "codex",
            label: "International standards reference",
            examples: ["Codex Alimentarius — joint FAO/WHO programme"],
            role: "Food standards, guidelines, and codes of practice",
          },
          {
            id: "hs",
            label: "Trade classification",
            examples: ["HS 17 sugar confectionery", "18 cocoa", "19 bakery"],
            role: "Product nomenclature used in customs and trade",
          },
          {
            id: "associations",
            label: "Industry associations",
            examples: ["Collective representation", "Technical coordination"],
            role: "Coordinate common interests; exact Vietnam body not verified",
          },
          {
            id: "partnerships",
            label: "Strategic partnerships / programs",
            examples: ["Cocoa Life", "Supplier and retailer collaboration"],
            role: "Capability, supply resilience, innovation, or sustainability",
          },
        ],
        sourceIds: ["pf-m03-s01", "pf-m03-s03", "pf-m03-s04", "pf-m03-s08"],
        caveat:
          "pf-m03-s04 is a third-party HS reference and is not an official WCO source.",
      },
      globalExample: {
        title: "Codex and HS serve different purposes",
        body: "Codex is the joint FAO/WHO food-standards programme established in 1963. HS headings classify traded products; the source used here is a third-party reference and should not be described as an official WCO publication.",
        sourceIds: ["pf-m03-s03", "pf-m03-s04"],
      },
      vietnamExample: {
        title: "Domestic compliance plus commercial partnership",
        body: "The Law on Food Safety (2010) and MOH/VFA sit in the domestic compliance landscape. Retail partnerships matter commercially, but the source set does not identify a verified Vietnamese confectionery association.",
        sourceIds: ["pf-m03-s08"],
      },
      keyTerms: [
        {
          term: "Codex Alimentarius",
          definition:
            "The joint FAO/WHO programme for international food standards, guidelines, and codes of practice.",
        },
        {
          term: "Harmonized System (HS)",
          definition:
            "The international nomenclature used to classify traded goods; the lesson’s detailed reference is third-party.",
        },
        {
          term: "Industry association",
          definition:
            "A membership body that can coordinate technical work and represent shared industry interests.",
        },
        {
          term: "Strategic partnership",
          definition:
            "A structured relationship formed to achieve outcomes such as supply resilience, innovation, market access, or sustainability.",
        },
        {
          term: "Regulatory compliance",
          definition:
            "Meeting the binding legal and administrative requirements applicable to a product and operation.",
        },
      ],
      recap: [
        "Regulation, standards, classification, associations, and partnerships have different authority.",
        "Codex dates to 1963; the HS detail here comes from a third-party reference.",
        "Do not invent a Vietnam association name or unverified EUDR dates from this research row.",
      ],
      deepDive: {
        title: "What the evidence does not establish",
        body: "Row 25 flags the exact EUDR dates and thresholds, and Vietnamese confectionery-association membership, as research gaps. Those details should be added only from primary legal or association sources.",
      },
      body: (
        <>
          <p>
            Governance analysis starts by asking whether an instrument is
            binding, advisory, classificatory, collective, or voluntary. That
            determines who owns the response and what happens if the company
            fails to act.
          </p>
          <EvidenceNote sourceIds={["pf-m03-s03"]}>
            Codex is an authoritative FAO/WHO standards programme and is not
            itself Vietnam’s domestic food regulator.
          </EvidenceNote>
          <EvidenceNote sourceIds={["pf-m03-s04"]}>
            The HS chapter descriptions are taken from a third-party reference.
            Cite an official customs/WCO source for legal publication.
          </EvidenceNote>
        </>
      ),
    }),
  ],
  quiz: [
    ...pairedQuiz({
      id: "pf-m03-l06-q01",
      prompt:
        "Which sequence best maps the physical packaged-food value chain?",
      options: [
        "Agricultural/ingredient/packaging suppliers → manufacturer → distributors/retailers → consumer",
        "Consumer → regulator → factory only",
        "Retailer → farm → association",
        "Brand owner → tax authority → ingredient only",
      ],
      correctIndex: 0,
      explanation:
        "The ecosystem extends from upstream inputs through core processing to downstream market access.",
      takeaway: "Map the physical chain before adding enabling institutions.",
    }),
    ...pairedQuiz({
      id: "pf-m03-l06-q02",
      prompt: "Which risk is most associated with distributors in this lesson?",
      options: [
        "Inventory and credit risk",
        "Writing Codex standards",
        "Agricultural climate risk only",
        "Setting national law",
      ],
      correctIndex: 0,
      explanation:
        "Distributors commonly hold stock, extend credit, and manage field execution.",
      takeaway: "Stakeholders earn value by performing jobs and bearing risks.",
    }),
    ...pairedQuiz({
      id: "pf-m03-l06-q03",
      prompt: "How should Mondelez’s ~90% Cocoa Life figure be described?",
      options: [
        "A 2024 company/global sourcing metric",
        "The global cocoa industry’s certified share",
        "Vietnam’s cocoa production share",
        "A retailer concentration measure",
      ],
      correctIndex: 0,
      explanation:
        "It is a corporate sourcing metric and cannot be generalized to the industry.",
      takeaway: "Keep company sustainability metrics in scope.",
    }),
    ...pairedQuiz({
      id: "pf-m03-l06-q04",
      prompt: "What does the ~96% figure refer to?",
      options: [
        "Mondelez recyclable-packaging share in 2024",
        "Vietnam modern-trade share",
        "Global recycled content",
        "Supplier compliance across the industry",
      ],
      correctIndex: 0,
      explanation:
        "The research reports a company/global recyclable-packaging metric.",
      takeaway:
        "Recyclable packaging is not the same as recycled content or recycling rate.",
    }),
    ...pairedQuiz({
      id: "pf-m03-l06-q05",
      prompt: "Why can the lowest quoted supplier price be misleading?",
      options: [
        "Quality, logistics, continuity, inventory, and compliance also create cost and risk",
        "Quoted price never affects economics",
        "All suppliers have identical service",
        "Contracts eliminate disruption",
      ],
      correctIndex: 0,
      explanation:
        "Total cost of ownership includes consequences beyond purchase price.",
      takeaway: "Negotiate total value and risk, not unit price alone.",
    }),
    ...pairedQuiz({
      id: "pf-m03-l06-q06",
      prompt: "What does modern-grocery concentration change most directly?",
      options: [
        "Downstream buyer power and key-account importance",
        "Codex’s authority",
        "The definition of cocoa",
        "The year the Food Safety Law was passed",
      ],
      correctIndex: 0,
      explanation:
        "A small number of large accounts can exert more influence over access and terms.",
      takeaway: "Concentration shifts bargaining power.",
    }),
    ...pairedQuiz({
      id: "pf-m03-l06-q07",
      prompt: "What is Codex Alimentarius?",
      options: [
        "The joint FAO/WHO food-standards programme",
        "A Vietnam supermarket",
        "A cocoa supplier",
        "A private-label manufacturer",
      ],
      correctIndex: 0,
      explanation:
        "Codex develops international food standards, guidelines, and codes of practice.",
      takeaway: "Codex is a standards programme, not a retailer or company.",
    }),
    ...pairedQuiz({
      id: "pf-m03-l06-q08",
      prompt: "What evidence caveat applies to the lesson’s HS reference?",
      options: [
        "It is a third-party reference, not an official WCO publication",
        "HS does not classify food",
        "It is a retailer report",
        "It is an audited company filing",
      ],
      correctIndex: 0,
      explanation:
        "Row 25 explicitly labels pf-m03-s04 as a third-party HS reference.",
      takeaway: "Do not upgrade a secondary reference into an official source.",
    }),
    ...pairedQuiz({
      id: "pf-m03-l06-q09",
      prompt: "Which claim should not be added from row 25 alone?",
      options: [
        "A named Vietnamese confectionery association and its membership",
        "Codex has operated since 1963",
        "Mondelez reported ~90% cocoa through Cocoa Life",
        "Top-seven players held nearly 90% of modern-channel value",
      ],
      correctIndex: 0,
      explanation:
        "The research explicitly lists Vietnam association identity and membership as a gap.",
      takeaway: "Represent evidence gaps directly.",
    }),
    ...pairedQuiz({
      id: "pf-m03-l06-q10",
      prompt: "What distinguishes a strategic partnership from a regulator?",
      options: [
        "A partnership is a structured collaborative relationship; a regulator administers binding authority",
        "There is no difference",
        "A regulator is always voluntary",
        "A partnership writes national law",
      ],
      correctIndex: 0,
      explanation:
        "Institutions differ in authority, purpose, and consequences.",
      takeaway: "Classify the institution before assigning responsibility.",
    }),
  ],
  takeaways: [
    "Map upstream, core, downstream, and enabling stakeholders—and the flows between them.",
    "Each commercial interface exchanges product, information, value, service, and risk.",
    "Cocoa scarcity and retailer consolidation can concentrate power at opposite ends of the chain.",
    "Codex, HS classification, Vietnam regulation, associations, and partnerships have different authority.",
    "Preserve the evidence gaps: no named Vietnam confectionery association, contract margins, or exact EUDR dates are verified in row 25.",
  ],
} satisfies PackagedFoodCardData;

export default PACKAGED_FOOD_M3_LESSON6;
