import type { RetailSectorContent } from './retailSectorTypes';

export const RETAIL_PHARMACY_CONTENT: RetailSectorContent = {
  modules: {
    'How the Industry Works': 'Understand what pharmacy retail covers — medicines, supplements, and health products — and how healthcare access, retail operations, and regulation interact.',
    'How Value Moves Through the Industry': 'Follow the journey from manufacturer and importer through distributors and cold chain to the pharmacy counter and the patient.',
    'How Companies Make Money': 'Explore how pharmacy chains earn: prescription versus over-the-counter mix, supplements, private label, and store-level economics.',
    'Who Competes—and Why They Win': 'Understand how modern pharmacy chains, independent pharmacies, hospital dispensaries, and online sellers compete on trust, range, and access.',
    'What Is Changing Next': 'Explore how chain consolidation, digital health, and tightening regulation are reshaping pharmacy retail in Vietnam.',
  },
  lessons: {
    'm1-scope': {
      description: 'Learn what pharmacy retail is, which products and formats it covers, and where it ends and the wider pharmaceutical industry begins.',
      takeaways: [
        'Pharmacy retail combines a commercial model with a public-health duty, so safe, lawful, and appropriate supply of medicines matters as much as sales.',
        'The assortment spans prescription and over-the-counter medicines, supplements, devices, personal care, and specialised health products, each with different rules, storage needs, and economics.',
        'Formats range from independents to chains, hospital-linked, and online-enabled models, and pharmacy retail must be analysed apart from manufacturing, wholesale, and healthcare delivery.',
      ],
    },
    'm1-history': {
      description: 'Follow how pharmacy retail moved from independent community pharmacies to regulated, chain-led, and increasingly digital retail.',
      takeaways: [
        'Independent community pharmacies built the industry on local access and personal service, and they remain relevant where trust and proximity matter.',
        'Regulation and chain expansion changed competition toward licensing, qualified staff, network scale, standard systems, and supply reliability.',
        'Vietnam is shifting from fragmented independents toward organised chains and digital services, but the shift is gradual and uneven across chains.',
      ],
    },
    'm1-global': {
      description: 'Explore how pharmacy retail is structured worldwide, who the major operators are, and what drives and pressures the industry.',
      takeaways: [
        'There is no single global pharmacy model: structure depends on healthcare regulation, reimbursement, ownership rules, and local delivery systems.',
        'Global operators differ in scope, so comparisons must separate pharmacy retail revenue from insurance, care delivery, wholesale, and other businesses.',
        'Ageing and chronic disease create structural demand, but category mix, digital limits, cost pressure, and local rules decide how much becomes pharmacy revenue.',
      ],
    },
    'm1-vietnam': {
      description: 'See how Vietnam\u2019s pharmacy market is sized, structured, regulated, and moving online, and how consumers and suppliers shape it.',
      takeaways: [
        'Vietnam combines tens of thousands of independent pharmacies with a fast-growing chain segment led by Long Chau, alongside Pharmacity, An Khang, and Trung Son Pharma.',
        'Market-size estimates depend on definitions, and store counts depend on dates, so figures from different sources should not be combined.',
        'Since 1 July 2025, eligible OTC medicines may be sold online under the amended Law on Pharmacy, while prescription medicines generally may not.',
      ],
    },
    'm1-drivers': {
      description: 'Understand how ageing, spending, urbanisation, regulation, supply, technology, competition, and public trust move pharmacy retail.',
      takeaways: [
        'An ageing population and chronic disease expand long-term demand, but the opportunity depends on access, affordability, reliable supply, and appropriate service.',
        'Regulation, supply-chain reliability, and data protection are both obligations and competitive capabilities, since they decide what a pharmacy may sell and how it earns trust.',
        'Consolidation favours scale and operating capability, yet sustainable advantage needs store productivity, financial discipline, and trust earned through consistent safety practice.',
      ],
    },

    'm2-overview': {
      description: 'See the stages, participants, flows, and controls that connect manufacturers and importers to the pharmacy counter and the patient.',
      takeaways: [
        'The chain runs manufacturing, regulatory authorisation, importation and wholesale, retail procurement, pharmacy operations, and customer follow-up, and value comes from coordinating all of them.',
        'Product, information, and financial flows must stay aligned and traceable, because batch, expiry, and authorised supply routes affect patient safety.',
        'Compliance is a cross-chain requirement, so a weak control at any stage can disrupt supply and expose downstream retailers.',
      ],
    },
    'm2-sourcing': {
      description: 'Follow the upstream activities that decide what pharmacies can sell: research, manufacturing quality, authorisation, procurement, wholesale, and supplier risk.',
      takeaways: [
        'Manufacturing quality and authorisation decide which products can lawfully reach the market, and retail checks complement but cannot replace them.',
        'Procurement and wholesale balance price against reliability, legitimacy, and the risk of shortages or overstock.',
        'Vietnam imports most active ingredients, mainly from China and India, so supplier resilience and risk planning are strategic capabilities.',
      ],
    },
    'm2-logistics': {
      description: 'Understand how warehouses, delivery, inventory, cold chain, data systems, and quality checks keep pharmacy stock safe and available.',
      takeaways: [
        'Warehouse efficiency lowers handling cost and errors, and delivery frequency, order size, and product needs must be balanced against transport cost.',
        'Inventory aims for the right products in the right amounts, balancing availability against working capital and expiry exposure.',
        'Special handling is product-specific, and accurate data and shared quality duties decide whether midstream systems actually help.',
      ],
    },
    'm2-stores': {
      description: 'Follow the downstream activities: store operations, dispensing, OTC sales, consultation, pricing, digital services, and post-sale safety.',
      takeaways: [
        'The store is where upstream capabilities become visible to customers, so reliable daily operations and records matter.',
        'Dispensing quality depends on checks, documentation, and professional judgement, and e-prescription rules now link sales to a national system.',
        'OTC sales, consultation, pricing, and digital ordering must follow category-specific rules, scope limits, and privacy duties.',
      ],
    },
    'm2-customer': {
      title: 'Inputs, Outputs & Value Creation',
      subtitle: 'Resources, Results, and Value Capture',
      description: 'Map the inputs a pharmacy combines, the processes that turn them into service, and how value and trust are created and measured.',
      takeaways: [
        'A pharmacy needs people, premises, capital, systems, suppliers, and compliance capabilities as well as stock, and weakness in any one can disrupt it.',
        'Value comes from both products and intangible outputs such as access, accuracy, and confidence, and sales growth alone does not prove it.',
        'Sustainable profit balances commercial efficiency with availability, service quality, and compliance, and is tracked with a balanced set of indicators.',
      ],
    },
    'm2-value': {
      title: 'Global vs. Local Value Chain',
      subtitle: 'Sourcing Reach, Resilience, and Vietnam',
      description: 'Compare global pharmaceutical networks with Vietnam\u2019s local chain, and see where import dependence, regulation, and distribution shape supply.',
      takeaways: [
        'Global sourcing broadens access but adds exposure, and Vietnam combines domestic manufacturing with heavy imports of products and ingredients.',
        'Supply risk should be judged product by product, and international availability does not equal local authorisation.',
        'Local distribution and adapting global standards to Vietnamese rules turn international supply into reliable local access.',
      ],
    },

    'm3-models': {
      description: 'Compare independents and chains, franchise, partnership and specialty models, and omnichannel models, and the trade-offs each makes between scale, flexibility, compliance, and service.',
      takeaways: [
        'The core distinction is local flexibility versus operational scale, and both independents and chains must keep professional standards and comply with the rules.',
        'Franchise, partnership, and specialty models differentiate a pharmacy without relying only on store count, but never remove licensing or professional accountability.',
        'Omnichannel models connect digital convenience with reliable stores and safe dispensing, and online scope in Vietnam is limited to eligible OTC medicines.',
      ],
    },
    'm3-assortment': {
      title: 'Products, Services & Segmentation',
      subtitle: 'Medicines, Healthcare Products, and Services',
      description: 'Map prescription and OTC medicines, consumer healthcare products, and the professional services that shape a pharmacy offer.',
      takeaways: [
        'Medicine retail balances commercial availability with responsible dispensing, and prescription and OTC medicines need different controls and guidance.',
        'Supplements, devices, and personal care broaden revenue and convenience but add inventory, information, and claims complexity.',
        'Professional services distinguish pharmacy from ordinary retail, and trust grows when guidance is accurate and kept within professional scope.',
      ],
    },
    'm3-segments': {
      description: 'Understand chronic-care customers, families and caregivers, and price-sensitive, convenience-oriented, and digitally engaged customers, and what each needs.',
      takeaways: [
        'Chronic-care customers value continuity and reliability, but repeat purchase is not guaranteed loyalty.',
        'Families, caregivers, and preventive-care customers want suitable products and clear information, not fear-based or exaggerated promotion.',
        'Convenience combines price, location, speed, availability, and confidence, and customer preferences overlap across the purchasing journey.',
      ],
    },
    'm3-revenue': {
      description: 'See how pharmacies earn from a product mix, which cost blocks shape profit, and how inventory and unit economics decide returns.',
      takeaways: [
        'Revenue growth is not gross-profit growth: product mix, procurement terms, and the cost of each sale decide sustainable performance.',
        'Total cost to serve, including procurement, labour, occupancy, technology, and compliance, matters more than purchase price alone.',
        'Inventory productivity and store-level unit economics decide whether expansion creates value, since gross margins shrink to low single-digit net margins.',
      ],
    },
    'm3-store-economics': {
      title: 'Distribution & Sales Channels',
      subtitle: 'How Products Reach Customers',
      description: 'Follow how physical stores, digital channels, and warehouses and last-mile delivery get products to pharmacy customers.',
      takeaways: [
        'Physical stores stay central because of access and professional help, but each outlet needs local demand and cost discipline.',
        'Digital channels add value by improving the journey, but they do not remove the rules for medicine sales, including limits on online scope.',
        'Fast delivery has limited value unless products arrive intact, traceable, and handled under the required conditions.',
      ],
    },
    'm3-ecosystem': {
      description: 'Identify the regulators, manufacturers, distributors, professionals, technology and logistics partners, and consumers around pharmacy retail.',
      takeaways: [
        'Upstream partners affect quality, traceability, delivery reliability, and compliance, not just availability.',
        'Pharmacy connects product access with responsible professional support, and sales targets must not override dispensing or clinical judgement.',
        'Technology, payment, and logistics partners improve efficiency but cannot take over the pharmacy\u2019s own responsibility for compliance and data protection.',
      ],
    },

    'm4-structure': {
      description: 'See how fragmented and consolidating pharmacy retail is, what customers choose pharmacies on, and which barriers shape entry and rivalry.',
      takeaways: [
        'Chains are growing quickly but are still only about 5% of roughly 50,000 outlets by count, so the market is both consolidating and highly fragmented.',
        'Pharmacies compete on price, availability, access, professional service, range, reputation, convenience and retention, so a balanced proposition beats discounts alone.',
        'Barriers include licensing, qualified staff, capital, supplier access and compliance, but entering the market is not the same as earning a profit once inside.',
      ],
    },
    'm4-players': {
      description: 'Meet Long Ch\u00e2u, Pharmacity, An Khang, and the regional chains and independents that compete beyond the largest chains.',
      takeaways: [
        'Long Ch\u00e2u leads on scale, but its advantage depends on combining expansion with store productivity, reliable supply, and trusted services.',
        'Pharmacity and An Khang show that profitable growth matters more than expansion for its own sake, and store optimisation can beat maximising outlets.',
        'Regional chains compete on focus and independents on local access and relationships, so strength depends on local density, supply, trust and execution.',
      ],
    },
    'm4-benchmarking': {
      description: 'Compare chains on network and coverage, assortment, price and experience, and financial and digital performance, using like-for-like data.',
      takeaways: [
        'Store count shows reach, but fair benchmarking also compares geographic coverage and productivity, using one reporting date for every chain.',
        'The strongest proposition combines availability, credible value and dependable service, since promotions attract customers but experience builds trust.',
        'Sales per store and margins show whether market position becomes profit, and figures should be compared within one source, year and currency.',
      ],
    },
    'm4-success': {
      description: 'Identify the supply, people and operating capabilities that decide who wins in pharmacy retail.',
      takeaways: [
        'Supply-chain performance is a core competitive capability, covering legitimate sourcing, availability, expiry management, quality, and supplier review.',
        'Professional capability and customer trust are slow to copy, and become a lasting advantage when supported by qualified staff and consistent standards.',
        'The ability to scale separates a successful chain from a network that outgrows its operating capabilities, so systems come before faster expansion.',
      ],
    },
    'm4-swot': {
      description: 'Summarise the industry SWOT, the main strategic challenges, and the priorities and measures that respond to them.',
      takeaways: [
        'Demand growth is an opportunity, not a guarantee of profitability, so success depends on turning growth into sustainable performance.',
        'The main strategic challenge is balancing growth with operational control, since profit, stock, staff, compliance and trust interact and compound.',
        'Future competition rewards execution quality over market presence, so every priority needs a measure that shows the model works consistently and profitably.',
      ],
    },

    'm5-consumer': {
      description: 'See how preventive health, ageing and chronic disease, and demand for convenience and trusted advice are changing pharmacy demand.',
      takeaways: [
        'Preventive health widens pharmacy demand, but long-term growth depends on consumer trust and responsible recommendations, not product sales alone.',
        'Ageing and chronic disease create recurring needs that reward reliable replenishment, continuity of service, and medication-use support.',
        'Convenience and personalisation work best when combined with credible professional advice, consent, and sound data safeguards.',
      ],
    },
    'm5-technology': {
      description: 'Explore digital pharmacy platforms, data and AI for inventory, and connected digital health services in Vietnam.',
      takeaways: [
        'Since 1 July 2025 eligible non-prescription medicines may be sold online, while prescription medicines remain prohibited apart from a narrow emergency exception.',
        'Analytics and AI create value when they improve forecasting, stock control, and execution, and they depend on accurate data and privacy safeguards.',
        'Connected services such as e-prescriptions and digital identity need authorisation, secure interoperability, and clear professional responsibilities.',
      ],
    },
    'm5-channel': {
      description: 'Follow modern chain expansion, omnichannel fulfilment, and how independents, chains, and digital platforms compete.',
      takeaways: [
        'Modern chains are turning a fragmented market into an organised network, and the next stage depends on store productivity and financial sustainability.',
        'Omnichannel growth is most valuable when digital services improve physical stores, backed by accurate stock, reliable fulfilment, and compliant handling.',
        'Independents, national chains, regional chains, and digital platforms can coexist, so advantage comes from matching the model to local demand and capability.',
      ],
    },
    'm5-regulatory': {
      description: 'Understand how the 2025 pharmacy rules, quality and traceability duties, and responsible operations shape the industry.',
      takeaways: [
        'Regulatory monitoring is an ongoing responsibility, and changing rules must become practical controls for products, online sales, records, and staff.',
        'Trust depends on the integrity of the whole supply chain, so traceability, verified sourcing, storage, and fast response to quality concerns are essential.',
        'The most practical sustainability gains come from operational discipline such as forecasting, stock rotation, and appropriate waste handling.',
      ],
    },
    'm5-outlook': {
      description: 'Assess growth potential, digital and service opportunities, and the long-term priorities that fit different pharmacy models.',
      takeaways: [
        'The market has structural growth potential, but growth is not guaranteed for every retailer, and the best opportunities pair demand with sustainable store economics.',
        'The greatest digital opportunity is to integrate technology with operations and professional service, with every investment tied to a measurable outcome.',
        'A sustainable strategy needs a clear market position and the capability to deliver it, because not every trend is worth following.',
      ],
    },
  },
};
