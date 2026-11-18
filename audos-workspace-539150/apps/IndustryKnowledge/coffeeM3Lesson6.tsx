import { C3DeepDive, citeC3, c3Chapter, c3Quiz } from './coffeeM3Core';
import type { CoffeeM3LessonBundle } from './coffeeM3Core';

const LESSON = '6. Industry Ecosystem & Stakeholders';

const deck = [
  c3Chapter({
    title: 'Supply-Side Partners and Business Enablers', chapterTitle: LESSON, readingTime: '6',
    objective: 'Name the supply-side partners behind a coffeehouse chain and explain what each adds and what dependence it creates.',
    mateIntro: 'Behind every counter sits a network of growers, roasters, equipment makers, cold-storage firms and software providers.',
    keyInsight: 'A coffeehouse business sits inside a supply ecosystem of growers, roasters, ingredient suppliers, equipment and packaging makers, logistics providers and technology vendors. Each partner adds a capability the operator does not have to build, and each creates a dependence that must be managed.',
    statTiles: [
      { value: '6', label: 'Supply-side partner groups', subtitle: 'Growers to technology vendors', description: 'Growers and exporters, roasters, tea and ingredient suppliers, equipment and packaging makers, cold-chain logistics and technology vendors.' },
      { value: '10,000 to 75,000 t', label: 'Highlands roastery initial capacity and potential capacity a year', subtitle: 'Vietnam Investment Review and Viet Nam News', description: 'A chain that invests in its own roasting supply.' },
      { value: '~64%', label: 'Share of cold-storage capacity held by 19 storage operators', subtitle: 'FiinGroup', description: 'Cold-chain capacity is concentrated among a few operators.' },
    ],
    statsNote: 'The first tile is a count from this lesson. The capacity figures are company or press statements, and cold-chain estimates differ by scope, with FiinGroup giving US$202 million for 2024 and another source about US$850 million for 2025.',
    narrative: [
      { label: 'What it is', text: 'Supply-side partners provide the inputs and services a coffeehouse needs: beans, roasted coffee, tea, milk and ingredients, machines, packaging, cold storage and transport, and the software that runs ordering, payments and loyalty.' },
      { label: 'Why it is happening', text: 'Few operators can do everything themselves. Partners bring scale, skills and equipment, but a chain that depends on one roaster, one distributor or one app vendor is exposed if that partner fails or raises prices.' },
      { label: 'Real-world example', text: 'A chain buys beans from exporters, roasts at its own plant, sources syrups and cups from specialist suppliers, stores milk in a cold-chain provider’s warehouse and runs orders on a vendor’s app. Each link can add value or add risk.' },
      { label: 'Vietnam example', text: 'USDA reports Vietnam produced about 31.7 million bags of coffee in 2025/26, used 4.9 million domestically and imported 1.3 million. Highlands opened a VND 500 billion roastery near Cái Mép in April 2025 with initial capacity of about 10,000 tonnes and potential for 75,000, and Phúc Long says it sources tea from two hills it owns. FiinGroup reports that 19 storage operators hold about 64% of cold-storage capacity, and technology vendors such as Zalo Mini App and loyalty platform builders supply the digital layer, as in the vendor case studies in this module.' },
      { label: 'Business impact', text: 'Supply-side partners shape cost, quality, resilience and speed to market. Chains that choose and manage them well gain an advantage; those that treat them as interchangeable are exposed to shocks.' },
    ],
    visualKind: 'coffee-m3-61-supply', visualHeading: 'Six supply-side partner groups',
    visualIntro: 'See the six groups behind a chain and what each provides.',
    imageAlt: 'Casemate tree of six supply-side partner groups for coffeehouse chains',
    keyTerms: [
      { term: 'Ecosystem', definition: 'The network of businesses and institutions around an industry.' },
      { term: 'Roaster', definition: 'A business that roasts green coffee beans for sale or use in cafes.' },
      { term: 'Cold chain', definition: 'Storage and transport that keep goods at controlled temperatures.' },
      { term: 'Supplier dependence', definition: 'Reliance on a limited number of suppliers for an essential input.' },
    ],
    recap: [
      'Growers, roasters, ingredient and equipment suppliers, logistics and technology vendors support a chain.',
      'Partners add capability and create dependence.',
      'Some chains invest in their own roasting capacity.',
      'Cold storage is concentrated among a few operators.',
    ],
    chapterRecap: 'Supply-side partners extend what a chain can do. The strongest chains choose partners for capability, keep alternatives for critical inputs and invest directly where dependence is too costly.',
    deepDiveTitle: 'When to own a partner’s job and when to rent it',
    body: <C3DeepDive paragraphs={[
      'Owning a roastery gives control over quality and cost but ties up capital and requires volume to fill it. Buying from a roaster keeps capital light but depends on that roaster’s service.',
      'The decision turns on volume, how critical the input is and whether the capability is a source of advantage. It is not one-size-fits-all.' ]} evidence="Coffee supply data are from USDA; roastery details are from Viet Nam News, Vietnam Investment Review and a Highlands announcement; Phúc Long tea sourcing is a company claim; cold-storage figures are from FiinGroup and a second source, which differ by scope; vendor case studies are labelled in this module. The own-or-rent reasoning is our own." />,
    sources: citeC3('usdaCoffeeAnnual', 'highlandsRoastery', 'virDrinksChains', 'highlandsPlant2023', 'phucLongTea', 'fiinColdChain', 'vietnamBriefingLogistics', 'highlandsZalo'),
  }),
  c3Chapter({
    title: 'Demand-Side Stakeholders and Channel Intermediaries', chapterTitle: LESSON, readingTime: '6',
    objective: 'Identify the demand-side stakeholders and intermediaries a coffeehouse depends on to reach customers.',
    mateIntro: 'Customers are not the only demand-side players. Platforms, landlords, retail partners and marketing channels all stand between a brand and its sales.',
    keyInsight: 'Demand-side stakeholders and channel intermediaries control access to customers. Delivery platforms, landlords, retail partners and digital marketing channels each take a share of value or set the terms of access, so a coffeehouse must manage them as carefully as its suppliers.',
    statTiles: [
      { value: '6', label: 'Demand-side stakeholder groups', subtitle: 'Customers to marketing partners', description: 'Consumers, delivery platforms, landlords, retail partners, marketing channels and payment providers.' },
      { value: '96%', label: 'Combined share of Vietnam online food delivery value held by ShopeeFood and GrabFood in 2025', subtitle: 'Momentum Works via VnExpress', description: 'A near-duopoly of intermediaries.' },
      { value: '20–30%', label: 'Reported commission on a delivery order', subtitle: 'Tuoi Tre, excluding advertising', description: 'The price of access to platform customers.' },
    ],
    statsNote: 'The first tile is a count from this lesson. Delivery shares cover completed app orders for all food, and no public data on rents, payment-provider fees or corporate customers for Vietnamese coffeehouses was found.',
    narrative: [
      { label: 'What it is', text: 'Demand-side stakeholders are the groups that shape the demand a coffeehouse can reach: consumers themselves, delivery platforms, landlords that control sites, retail partners that host counters, marketing channels and payment providers.' },
      { label: 'Why it is happening', text: 'A brand does not control every route to the customer. Platforms own discovery for delivery, landlords decide who gets prime sites, and retail partners decide whether a kiosk gets space, so each acts as a gatekeeper with its own interests.' },
      { label: 'Real-world example', text: 'A chain pays rent to a mall landlord for a prime unit, pays a commission to an app for delivery orders, and pays a supermarket group for space to run a kiosk. All three give access to customers and all three take a share of the result.' },
      { label: 'Vietnam example', text: 'ShopeeFood and GrabFood each held 48% of Vietnam’s US$2.1 billion online food delivery in 2025 and beFood held 4%, with restaurants reporting commissions of 20–30% per order excluding advertising. Phúc Long, bought by Masan in 2022, runs kiosks in WinMart supermarkets and Masan plans to integrate its loyalty programme with the group’s retail ecosystem. Marketing and messaging channels such as Zalo Mini App serve as vendor-reported channels to reach customers. No public data was found on rent levels, payment-provider fees or corporate customer accounts for Vietnamese coffeehouses.' },
      { label: 'Business impact', text: 'Gatekeepers affect margin, location quality and customer data. Operators that diversify access routes, negotiate terms and build direct relationships are less exposed to a single intermediary.' },
    ],
    visualKind: 'coffee-m3-62-demand', visualHeading: 'Who holds Vietnam’s delivery demand',
    visualIntro: 'Compare platform shares of Vietnam’s online food delivery in 2025.',
    imageAlt: 'Casemate bar chart of Vietnam online food delivery share by platform in 2025',
    keyTerms: [
      { term: 'Gatekeeper', definition: 'A business that controls access to customers or sites and sets terms for others.' },
      { term: 'Intermediary', definition: 'A business that stands between a producer and a customer and takes a share of value.' },
      { term: 'Landlord', definition: 'The owner of a site who leases it to an operator for rent.' },
      { term: 'Retail partner', definition: 'A retailer that hosts another brand’s counter or kiosk in its stores.' },
    ],
    recap: [
      'Platforms, landlords and retail partners control access to customers.',
      'Two platforms hold 96% of delivery value.',
      'Each gatekeeper takes a share or sets the terms.',
      'Public data on rents, payment fees and corporate customers was not found.',
    ],
    chapterRecap: 'Reaching customers means dealing with gatekeepers. Operators protect margin by diversifying access routes and building direct relationships.',
    deepDiveTitle: 'How a retail partner can be both landlord and customer source',
    body: <C3DeepDive paragraphs={[
      'A kiosk inside a supermarket gets the supermarket’s traffic, but the supermarket sets the space, the rent and often the rules. The kiosk gains customers it did not have to attract, and pays by dependence.',
      'When the supermarket and the coffee brand share an owner, as Masan does with WinMart and Phúc Long, the relationship can be tighter, with shared loyalty data and promotions.' ]} evidence="Delivery shares are from Momentum Works reported by VnExpress International; commissions are from Tuoi Tre; Phúc Long kiosks in WinMart are from VietnamFinance; Masan’s plan is from a Masan Group interview; the Zalo example is a vendor case study. The reasoning on retail partners is our own." />,
    sources: citeC3('vnexpressDelivery', 'vcciDelivery', 'tuoitreDelivery', 'vietnamfinanceChains', 'masanPhucLong', 'highlandsZalo'),
  }),
  c3Chapter({
    title: 'Regulators, Industry Associations, and Community Stakeholders', chapterTitle: LESSON, readingTime: '7',
    objective: 'Identify the regulators, associations and community stakeholders that shape what a coffeehouse may do and what it costs.',
    mateIntro: 'A coffeehouse needs customers and suppliers, but also licences, invoices, wages and recycling rules. Rules shape cost as much as rent does.',
    keyInsight: 'Regulators, industry associations and community stakeholders set the licence to operate and add compliance cost. Food safety, tax invoicing, wages and packaging rules apply to nearly every outlet, and associations give the industry a voice, so operators must track rule changes and confirm current legal text before planning around a date.',
    statTiles: [
      { value: '6', label: 'Stakeholder and rule groups', subtitle: 'Food safety to community', description: 'Food safety, tax invoicing, labour, packaging, trade association and community stakeholders.' },
      { value: '1 Jan 2024', label: 'Start of packaging recycling duties for producers and importers', subtitle: 'Ministry of Agriculture and Environment portal', description: 'A rule that can affect packaging suppliers and some operators.' },
      { value: '~100', label: 'Members of the Viet Nam Coffee-Cocoa Association', subtitle: 'VICOFA', description: 'A voluntary association of coffee and cocoa businesses.' },
    ],
    statsNote: 'The first tile is a count from this lesson. Whether packaging duties apply to a café’s own cups depends on how the business is classified and has not been verified here, and a secondary source reports that Decree 70 was replaced from 1 July 2026, so check current legal texts.',
    narrative: [
      { label: 'What it is', text: 'Regulators set legal conditions for food safety, tax invoicing, employment and packaging. Industry associations represent businesses to government and to each other. Community stakeholders, such as neighbours, local authorities and customers, shape the social licence to operate.' },
      { label: 'Why it is happening', text: 'Food served to the public must be safe, taxes must be recorded and workers must be paid at least the legal minimum. Packaging waste has become a policy priority, so rules increasingly assign responsibility to producers and importers.' },
      { label: 'Real-world example', text: 'A café must keep premises hygienic, train handlers, issue e-invoices from its point-of-sale system and pay at least the regional minimum wage. It may also join an association for information and representation.' },
      { label: 'Vietnam example', text: 'The consolidated Food Safety Law sets conditions for places that prepare and serve food and drink, and the compliance certificate file includes business registration, a facility description, health confirmation for the owner and handlers and a trained-staff list, with 20 working days to process. Decree 70/2025/ND-CP extended point-of-sale e-invoices to qualifying restaurants from 1 June 2025, and 57.11% of operators in the iPOS.vn survey were concerned about e-invoicing and standardised tax rules. From 1 January 2026 the Region I minimum wage is VND 5.31 million a month. From 1 January 2024 producers and importers of covered packaging face recycling duties, with packaging producers under VND 30 billion of revenue exempt and rates such as 20% for carton paper and 22% for rigid PET. VICOFA describes itself as a voluntary social-professional organisation with nearly 100 members, under a charter approved on 9 October 2025. The EU deforestation regulation applies from 30 December 2026 for large and medium operators and affects coffee exporters rather than cafés directly.' },
      { label: 'Business impact', text: 'Compliance adds cost and management effort, but it also protects customers and the brand. Associations can help operators share information and influence policy, and community goodwill supports sites and licences.' },
    ],
    visualKind: 'coffee-m3-63-community', visualHeading: 'Rules and stakeholders at a glance',
    visualIntro: 'Read the table of rules and stakeholders, what each affects and its status.',
    imageAlt: 'Casemate table of regulators, industry associations and community stakeholders for Vietnam coffeehouses',
    keyTerms: [
      { term: 'Licence to operate', definition: 'The legal and social approval a business needs to trade.' },
      { term: 'E-invoice', definition: 'An invoice created and sent electronically and recorded with the tax authority.' },
      { term: 'EPR', definition: 'Extended producer responsibility: duties on producers for recycling their packaging.' },
      { term: 'Industry association', definition: 'A group of businesses that represents shared interests.' },
    ],
    recap: [
      'Food safety, tax invoicing, minimum wage and packaging rules affect cost.',
      'Associations share information and give the industry a voice.',
      'Dates and decrees change, so confirm current legal text.',
      'Whether packaging duties reach a café’s own cups was not verified.',
    ],
    chapterRecap: 'Rules and associations shape the cost and legitimacy of a coffeehouse. Operators plan best when they track changes, confirm current text and engage with their industry body.',
    deepDiveTitle: 'Why a rule date is not the same as a rule’s effect',
    body: <C3DeepDive paragraphs={[
      'A rule that begins on a given date may be replaced, delayed or applied only to certain businesses. A secondary source reports that Decree 70 was replaced from 1 July 2026, which shows why operators should check the current text rather than rely on a summary.',
      'Scope matters too: packaging duties apply to producers and importers of covered packaging, and whether a café’s own cups fall under them depends on classification that this module has not verified.' ]} evidence="Food safety texts and the certificate procedure are from Thu Vien Phap Luat; Decree 70 is from the Chinhphu.vn government portal with a Bizzi secondary source on its replacement; the e-invoicing concern is from VCCI; wage data are from Vietnam Social Security; packaging rules are from the Ministry portal and a consultancy explainer; VICOFA details are from its charter and organisation page; the EU rule is from the European Commission." />,
    sources: citeC3('foodSafetyLaw', 'foodSafetyCertificate', 'decree70', 'decree70Review', 'vcciFnbEnglish', 'minWageDecree', 'eprScope', 'eprPackaging', 'vicofaCharter', 'vicofaMembers', 'eudrCommission'),
  }),
];

const quiz = c3Quiz('coffee-m3-l6', [
  { chapter: '1', objective: 'State the role of partners', question: 'What do supply-side partners add to a coffeehouse chain?', application: 'A chain buys from a roaster instead of building a plant. What is gained?', correct: 'Capabilities the operator does not have to build, with some dependence', wrong: ['No dependence at all', 'Lower quality always', 'A guaranteed profit'], explanation: 'Partners add capability and risk. Review Chapter 1.' },
  { chapter: '1', objective: 'Recall roastery capacity', question: 'What initial capacity did the Highlands Cái Mép roastery have, according to Vietnam Investment Review?', application: 'An analyst sizes the roastery. What is the starting capacity?', correct: 'About 10,000 tonnes a year, with potential for 75,000', wrong: ['About 10 tonnes', 'About 750 tonnes', 'About 7.5 million tonnes'], explanation: 'It is a company capacity claim. Review Chapter 1.' },
  { chapter: '1', objective: 'Read cold-chain figures', question: 'Why do cold-chain market estimates differ?', application: 'One source says US$202 million and another about US$850 million. Why?', correct: 'They differ in scope and year', wrong: ['One is invented', 'The law changed', 'They measure coffee beans'], explanation: 'Scope matters. Review Chapter 1.' },
  { chapter: '2', objective: 'Define a gatekeeper', question: 'What is a gatekeeper in a demand-side ecosystem?', application: 'A delivery app controls access to customers. What is it called?', correct: 'A business that controls access to customers or sites and sets terms', wrong: ['A guard at the door', 'A coffee grower', 'A tax inspector'], explanation: 'Gatekeepers take a share. Review Chapter 2.' },
  { chapter: '2', objective: 'Recall the delivery shares', question: 'What combined share of Vietnam online food delivery did ShopeeFood and GrabFood hold in 2025?', application: 'An owner assesses platform power. What is the share?', correct: '96%', wrong: ['10%', '48%', '4%'], explanation: 'They held 48% each. Review Chapter 2.' },
  { chapter: '2', objective: 'Note an evidence gap', question: 'What did the research find on rent levels and payment-provider fees for Vietnamese coffeehouses?', application: 'A deck quotes a rent ratio. Is there a public source?', correct: 'No public data was found', wrong: ['Rent is 50% of sales', 'Fees are zero', 'They are set by law'], explanation: 'Evidence gaps are stated. Review Chapter 2.' },
  { chapter: '3', objective: 'State the role of rules', question: 'How do regulators shape a coffeehouse?', application: 'An owner asks why compliance matters. What is the answer?', correct: 'They set the licence to operate and add compliance cost', wrong: ['They set menu prices', 'They choose customers', 'They have no effect'], explanation: 'Rules shape cost and legitimacy. Review Chapter 3.' },
  { chapter: '3', objective: 'Recall the wage rule', question: 'What is the Region I minimum wage from 1 January 2026?', application: 'A manager plans payroll in a Region I city. What is the floor?', correct: 'VND 5.31 million a month', wrong: ['VND 531 a month', 'VND 53 million a month', 'There is no minimum'], explanation: 'It is set by Decree 293/2025. Review Chapter 3.' },
  { chapter: '3', objective: 'Judge rule dates', question: 'Why should operators confirm the current text of rules such as Decree 70?', application: 'A summary says a decree is in force. What should be done?', correct: 'Because rules can be replaced, so a secondary source may be out of date', wrong: ['Rules never change', 'Only lawyers read decrees', 'Summaries are always right'], explanation: 'A secondary source reports a replacement from 1 July 2026. Review Chapter 3.' },
  { chapter: '3', objective: 'Describe VICOFA', question: 'How does VICOFA describe itself?', application: 'A student asks if membership is compulsory. What does the charter say?', correct: 'As a voluntary social-professional organisation', wrong: ['As a government ministry', 'As a retail chain', 'As a tax authority'], explanation: 'Membership is voluntary. Review Chapter 3.' },
]);

export const LESSON_C3_6: CoffeeM3LessonBundle = {
  deck,
  quiz,
  takeaways: {
    learned: 'You can map the supply-side partners, demand-side gatekeepers and rule-makers around a coffeehouse business.',
    keyTakeaways: [
      'Supply-side partners add capability and create dependence.',
      'Platforms, landlords and retail partners are gatekeepers to customers.',
      'Two platforms hold 96% of Vietnam delivery value.',
      'Food safety, invoicing, wage and packaging rules shape cost and the licence to operate.',
      'Confirm current legal text before planning around a date.',
    ],
    businessImplications: 'Manage partners, gatekeepers and regulators as part of the business model, and keep alternatives and compliance checks in place.',
    remember: 'The ecosystem sets the terms of access, supply and compliance.',
    nextLesson: 'Who Competes—and Why They Win',
  },
};
