import { C3DeepDive, citeC3, c3Chapter, c3Quiz } from './coffeeM3Core';
import type { CoffeeM3LessonBundle } from './coffeeM3Core';

const LESSON = '1. Industry Business Models';

const deck = [
  c3Chapter({
    title: 'Independent Cafés and Owner-Operated Foodservice Businesses', chapterTitle: LESSON, readingTime: '6',
    objective: 'Describe how independent cafés and owner-operated outlets earn a living and where their model is strong or limited.',
    mateIntro: 'Most places that serve you a coffee are not part of a chain. One owner makes the decisions, takes the risk and often stands behind the counter.',
    keyInsight: 'Independent cafés and owner-operated foodservice businesses compete through local identity, owner control, and flexibility rather than scale. Their strength is responsiveness to a specific neighbourhood or customer group; their limit is weak purchasing power, thin management depth, and dependence on the owner.',
    statTiles: [
      { value: '5', label: 'Features of the independent model', subtitle: 'Control to owner-dependence', description: 'Ownership and control, local identity, supplier relationships, limited scale and owner-dependence.' },
      { value: '91.7%', label: 'Share of 2025 Vietnam F&B revenue earned by independent outlets', subtitle: 'iPOS.vn and Nestlé Professional', description: 'Independents still earn most of the revenue across food and beverage as a whole.' },
      { value: '8.3%', label: 'Share earned by chains of at least 10 branded outlets', subtitle: 'Up from about 7.3% in 2024', description: 'Chains are growing from a small base.' },
    ],
    statsNote: 'The first tile is a count from this lesson. The revenue shares cover all food and beverage outlets, not coffee alone, and come from one industry survey deck.',
    narrative: [
      { label: 'What it is', text: 'An independent café or owner-operated foodservice business is a single outlet or small group run directly by its owner. The owner usually chooses the concept, menu, price, hours, suppliers and staff, and funds the business from personal capital or local finance.' },
      { label: 'Why it is happening', text: 'Low entry barriers, local taste and the ability to adapt quickly keep independents numerous. Their weaknesses are structural: small order volumes give little purchasing power, there is rarely a dedicated finance, training or marketing team, and quality can depend on the owner being present.' },
      { label: 'Real-world example', text: 'A neighbourhood café buys beans from a local roaster, bakes or sources its own pastries, sets prices by walking the street, and builds regular customers by name. When a new competitor opens or costs rise, the owner can change the menu the same day, but there is no head office to absorb a bad quarter.' },
      { label: 'Vietnam example', text: 'An industry survey by iPOS.vn and Nestlé Professional reports that independent outlets earned 91.7% of Vietnam’s 2025 food and beverage revenue, with chains of at least 10 branded outlets at 8.3%, up from about 7.3% in 2024. The same report estimates about 329,500 outlets in 2025, and the Euromonitor foodservice definition includes street stalls alongside cafés and restaurants. Independents face cost pressure: the survey records 2025 consumer prices up 3.31% but housing, electricity and water up 6.08%, and a Ho Chi Minh City café owner reported paying about 60% more for beans than a year earlier and held drink prices while widening the menu.' },
      { label: 'Business impact', text: 'Independent businesses can be highly profitable when the owner’s concept fits local demand, but they carry concentrated risk. Growth depends on whether the owner can build systems that work without constant personal involvement.' },
    ],
    visualKind: 'coffee-m3-11-independent', visualHeading: 'Five features of the independent model',
    visualIntro: 'Read the five features and note which are strengths and which are limits.',
    imageAlt: 'Casemate map of five features of independent cafés and owner-operated foodservice businesses',
    keyTerms: [
      { term: 'Independent café', definition: 'A café owned and run outside a branded chain, usually by its owner.' },
      { term: 'Owner-operated', definition: 'A business in which the owner works in the outlet and makes day-to-day decisions.' },
      { term: 'Purchasing power', definition: 'The ability to win lower prices by buying in large volumes.' },
      { term: 'Key-person risk', definition: 'The risk that a business suffers if one individual is absent or leaves.' },
    ],
    recap: [
      'Independents compete on local identity, control and flexibility.',
      'Small scale limits purchasing power and management depth.',
      'The owner is both the strength and the single point of failure.',
      'In Vietnam independents still earn most F&B revenue, but chains are gaining share.',
    ],
    chapterRecap: 'Independent businesses succeed through proximity, control, and adaptability, but their performance is constrained by scale, purchasing power, and owner capacity. The model works best where local knowledge matters more than standardisation.',
    deepDiveTitle: 'Why a majority of revenue can sit with independents while chains grab the headlines',
    body: <C3DeepDive paragraphs={[
      'Chain announcements, store counts and funding rounds are public, while thousands of independent outlets report nothing. Revenue shares from a survey give a fairer picture of where sales actually happen.',
      'A rise from about 7.3% to 8.3% for chains looks small, but on a market of hundreds of thousands of outlets it means a steady transfer of sales from many small owners to a few systems.' ]} evidence="Revenue shares, outlet counts and inflation are from the iPOS.vn and Nestlé Professional report and press release; the café owner’s bean price is from a VTV report; the Euromonitor definition is from its report summary. The 91.7% and 8.3% shares cover all F&B outlets, not coffee alone." />,
    sources: citeC3('iposReportDeck', 'iposReport2025', 'euromonitorFoodservice', 'vtvCoffeePrices'),
  }),
  c3Chapter({
    title: 'Chain-Owned and Franchise Business Models', chapterTitle: LESSON, readingTime: '7',
    objective: 'Compare company-owned, franchise and agency models and explain who earns what and who carries the risk in each.',
    mateIntro: 'A brand can open a store itself, license it to someone else, or supply agents who run it. The choice decides who invests and who keeps the profit.',
    keyInsight: 'Chain-owned and franchise models trade control against capital and speed. Company-owned stores give the brand owner tight control of quality and the full store profit but demand heavy investment; franchise and agency networks grow faster with less capital but depend on the discipline and economics of outside operators.',
    statTiles: [
      { value: '5', label: 'Models and features compared', subtitle: 'Company-owned to agency supply', description: 'Company-owned, franchise, agency or supply-led, control standards and fee structures.' },
      { value: '716 / 134', label: 'Highlands company-managed and franchised stores at end-2024', subtitle: 'Of 850 stores, as reported from Jollibee Foods', description: 'Even a chain strongly built on company stores uses franchising.' },
      { value: '~2,000', label: 'Milano Coffee outlets in 57 provinces', subtitle: 'Company claim, 2024', description: 'A network built mostly through agents and coffee supply, not company stores.' },
    ],
    statsNote: 'The first tile is a count from this lesson. Store counts differ by source and date: Momentum Works put Milano near 2,500 outlets in 2025, and Milano’s own figure is about 2,000, so read them as claims tied to a date.',
    narrative: [
      { label: 'What it is', text: 'In a chain-owned model the brand owner funds, staffs and operates each outlet. In a franchise model an outside operator pays to use the brand and its systems. In an agency or supply-led model, agents run outlets and buy coffee and materials from the brand owner, which earns on the goods it supplies.' },
      { label: 'Why it is happening', text: 'Company ownership protects consistency but ties up capital and management time in each site. Franchising spreads the capital and local knowledge to operators, but the brand must police standards and keep outlet economics attractive, or franchisees leave.' },
      { label: 'Real-world example', text: 'A brand opening 100 company stores needs the full cost of 100 fit-outs and 100 teams. The same brand franchising 100 stores needs a smaller head office but must audit quality, supply ingredients and keep franchisees profitable enough to renew.' },
      { label: 'Vietnam example', text: 'Highlands Coffee reported 850 Vietnam stores at the end of 2024, of which 716 were company-managed and 134 franchised, and in the third quarter of 2025 it added 109 company-operated and 4 franchised stores, so it grows mainly through its own stores. Milano Coffee says it earns from roasting and supplying coffee to agents rather than taking a share of store sales, with about 2,000 outlets in 57 provinces and a franchise cost from VND 49 million, and describes disputes when agents mix in outside products. Trung Nguyên’s E-Coffee advertises a zero-fee franchise policy. The Coffee House fell from 150 stores at end-2022 to 94 at end-2024 and was bought by Golden Gate, while a preliminary comparison reports Starbucks operating under Maxim Group.' },
      { label: 'Business impact', text: 'Ownership model shapes capital needs, speed of expansion, quality control, and the brand owner’s revenue base. The right choice depends on whether the brand’s advantage lies in the customer experience, which favours control, or in supply and brand reach, which favours partners.' },
    ],
    visualKind: 'coffee-m3-12-ownership', visualHeading: 'Three ownership models compared',
    visualIntro: 'Compare who owns the outlet and how the brand owner earns in each model.',
    imageAlt: 'Casemate table comparing company-owned, franchise and agency models in coffeehouse retail',
    keyTerms: [
      { term: 'Franchise', definition: 'A licence to operate under a brand’s name and systems in return for fees or product purchases.' },
      { term: 'Company-managed store', definition: 'An outlet owned and operated by the brand owner.' },
      { term: 'Agent', definition: 'A local business that runs outlets and buys supplies from the brand owner.' },
      { term: 'Royalty', definition: 'A continuing payment, often a share of sales, from franchisee to brand owner.' },
    ],
    recap: [
      'Company ownership gives control but needs capital.',
      'Franchise and agency models grow faster with outside money.',
      'The brand must keep outlets profitable and standards enforced.',
      'Brand owners may earn from fees, royalties or the goods they supply.',
    ],
    chapterRecap: 'The choice between company ownership and franchising is a choice between control and speed. The strongest networks match the model to what the brand does best and keep outlet economics attractive for every operator.',
    deepDiveTitle: 'How a supply-led network can earn without owning a single store',
    body: <C3DeepDive paragraphs={[
      'If the brand owner roasts the coffee and agents must buy it, every cup sold adds to the owner’s sales even though the outlet belongs to someone else. Growth then depends on getting more agents to sell more coffee.',
      'The weakness is quality: a customer sees only the brand, so an agent who cuts corners or mixes in outside products damages everyone, and the owner has less direct control than in company stores.' ]} evidence="Highlands store mix is from CafeBiz reporting Jollibee Foods Corporation, and its third-quarter 2025 openings are from Kinh te Do thi; Milano figures are the company’s own as reported by CafeF; The Coffee House counts are from Vietnam Investment Review and Vietstock; the Starbucks and Maxim comparison is described as preliminary by VietnamFinance; E-Coffee terms are from The Investor." />,
    sources: citeC3('highlandsModelMix', 'highlandsPhucLongQ3', 'milanoFranchise', 'vietnamplusChains', 'investorEcoffee', 'virNewModels', 'vietstockDrinks', 'vietnamfinanceChains'),
  }),
  c3Chapter({
    title: 'Hybrid, Asset-Light, and Specialized Business Models', chapterTitle: LESSON, readingTime: '7',
    objective: 'Explain how hybrid and asset-light formats reduce capital and what each gives up in return.',
    mateIntro: 'Between a full café and a franchise licence there are many shortcuts: a four-square-metre kiosk, a counter inside a supermarket, a drive-through lane.',
    keyInsight: 'Hybrid and asset-light models lower the capital, space and fixed cost needed to reach customers, but each shifts something to someone else. Brand owners must decide which of control, margin, or the customer relationship they are willing to trade for lower investment and faster reach.',
    statTiles: [
      { value: '6', label: 'Hybrid and specialised models', subtitle: 'Mixed ownership to delivery-only', description: 'Mixed ownership, kiosk, shop-in-shop, drive-through and flagship, roaster-retailer, and delivery-only kitchen.' },
      { value: '4 m²', label: 'Smallest format offered under E-Coffee packages', subtitle: 'The Investor', description: 'Shows how small a coffee outlet can be.' },
      { value: '106 vs ~800', label: 'Trung Nguyên Legend premium stores against E-Coffee franchise stores', subtitle: 'Vietnam Investment Review', description: 'One group runs two very different models at once.' },
    ],
    statsNote: 'The first tile is a count from this lesson. Store counts are as reported by the press at the time of the article, and E-Coffee’s package prices and 3,000-store target are company statements.',
    narrative: [
      { label: 'What it is', text: 'Hybrid models mix ownership types, formats or channels within one brand. Asset-light models reduce the capital a brand owner holds by using partners, small formats or other companies’ space. Specialised models focus on one occasion, product or channel rather than a full café.' },
      { label: 'Why it is happening', text: 'Prime café sites are expensive and slow to open. Kiosks, shop-in-shop counters and delivery-only formats let brands test demand and expand with less fixed cost, while flagship stores and drive-throughs serve particular roles in brand image or access.' },
      { label: 'Real-world example', text: 'A brand may run company-owned flagships in landmark locations, franchised stores in provincial towns, small kiosks in shopping centres and a retail line of bagged coffee, using each format for what it does best.' },
      { label: 'Vietnam example', text: 'Trung Nguyên ran a 106-store Legend premium chain alongside about 800 E-Coffee franchise stores, with E-Coffee offering a zero-fee policy, conversion packages of VND 56–196 million and investment packages of VND 65–245 million, formats from about four square metres and a company target of 3,000 stores. Phúc Long opened kiosks inside WinMart supermarkets, Starbucks Reserve opened at Bitexco in April 2025 as a showcase format, and Highlands opened Vietnam’s first drive-through in 2025. Phúc Long also sells packaged tea and coffee through supermarkets, adding a retail line to its cafés. No public Vietnam data on delivery-only coffee kitchens was found.' },
      { label: 'Business impact', text: 'Hybrid and asset-light models widen reach and cut capital, but they complicate brand control, supply and financial reporting. They work when each format has a clear job and a clear return rather than when brands add formats without a plan.' },
    ],
    visualKind: 'coffee-m3-13-hybrid', visualHeading: 'Six hybrid and specialised models',
    visualIntro: 'See six models and what each trades away to save capital.',
    imageAlt: 'Casemate cards of six hybrid, asset-light and specialised coffeehouse business models',
    keyTerms: [
      { term: 'Asset-light', definition: 'A model that keeps the capital invested in property and equipment low.' },
      { term: 'Shop-in-shop', definition: 'A counter or kiosk placed inside another retailer’s store.' },
      { term: 'Flagship', definition: 'A showcase store built to carry the brand image rather than maximise profit alone.' },
      { term: 'Roaster-retailer', definition: 'A company that roasts coffee and sells it as packaged goods as well as cups.' },
    ],
    recap: [
      'Hybrid models mix ownership, formats and channels in one brand.',
      'Asset-light formats cut capital and fixed cost.',
      'Each shortcut trades away control, margin or the customer relationship.',
      'Each format needs a clear job and a clear return.',
    ],
    chapterRecap: 'Hybrid and asset-light models are tools for faster, cheaper reach, not free growth. Brands that name what each format is for, and what it costs them, build stronger networks than those that copy formats on trend.',
    deepDiveTitle: 'Why one group can run a premium chain and a mass franchise at the same time',
    body: <C3DeepDive paragraphs={[
      'A premium store sells an experience at a high price, while a four-square-metre franchise kiosk sells speed and low entry cost. Customers, rents and staffing differ so much that the two are different businesses under one corporate roof.',
      'The risk is brand blur: if the cheap format weakens the premium image, or the premium store fails to lift the cheap one, the group pays for two models and gets the benefit of neither.' ]} evidence="Store counts and E-Coffee terms are from Vietnam Investment Review and The Investor and are company statements; Phúc Long kiosks in WinMart and the Starbucks Reserve opening are from VietnamFinance and Vietstock; the Highlands drive-through is from VietnamBiz; Phúc Long packaged products are from its company website. No source on delivery-only coffee kitchens in Vietnam was found." />,
    sources: citeC3('virNewModels', 'investorEcoffee', 'vietnamfinanceChains', 'vietstockDrinks', 'vietnambizChains', 'phucLongAbout'),
  }),
];

const quiz = c3Quiz('coffee-m3-l1', [
  { chapter: '1', objective: 'State what independents compete on', question: 'What do independent cafés compete on?', application: 'A new café has no purchasing power. What can it offer instead?', correct: 'Local identity, owner control and flexibility rather than scale', wrong: ['Lowest purchasing cost', 'National advertising', 'A large head office'], explanation: 'Independents win on proximity and adaptability. Review Chapter 1.' },
  { chapter: '1', objective: 'Recall the revenue split', question: 'What share of 2025 Vietnam F&B revenue did independent outlets earn, according to the iPOS.vn survey?', application: 'An investor assumes chains dominate. What does the survey show?', correct: '91.7%', wrong: ['8.3%', '50%', '99.9%'], explanation: 'Chains of at least 10 branded outlets earned 8.3%. Review Chapter 1.' },
  { chapter: '1', objective: 'Name a limit of the model', question: 'What is a key limit of the independent model?', application: 'The owner falls ill. What does the business suffer from?', correct: 'Dependence on the owner and thin management depth', wrong: ['Too much purchasing power', 'Too many head-office staff', 'Excess capital'], explanation: 'Owner-dependence is key-person risk. Review Chapter 1.' },
  { chapter: '2', objective: 'Describe the franchise trade-off', question: 'What does a franchise model trade for faster growth?', application: 'A brand wants 100 stores with little capital. What must it accept?', correct: 'Less direct control, with dependence on outside operators’ discipline and economics', wrong: ['Full store profit', 'No need to protect standards', 'Higher capital needs'], explanation: 'Franchising spreads capital but loosens control. Review Chapter 2.' },
  { chapter: '2', objective: 'Recall the Highlands mix', question: 'How many of Highlands’ 850 stores at end-2024 were company-managed?', application: 'A student calls Highlands a pure franchise. What do the figures show?', correct: '716', wrong: ['134', '850', '109'], explanation: 'The remaining 134 were franchised. Review Chapter 2.' },
  { chapter: '2', objective: 'Explain how Milano earns', question: 'According to Milano Coffee, how does it earn from its network?', application: 'An analyst assumes Milano takes a share of store sales. What does the company say?', correct: 'From roasting and supplying coffee to agents rather than a share of store sales', wrong: ['From owning every store', 'From delivery commissions only', 'From government subsidies'], explanation: 'It is a supply-led network. Review Chapter 2.' },
  { chapter: '2', objective: 'Compare models', question: 'Which model gives the brand owner the full store profit and the full store risk?', application: 'A brand funds and staffs every outlet itself. Which model is it?', correct: 'Company-owned chain', wrong: ['Franchise', 'Agency network', 'Delivery-only kitchen'], explanation: 'It carries both profit and risk. Review Chapter 2.' },
  { chapter: '3', objective: 'State the hybrid trade-off', question: 'What do asset-light models need brand owners to decide?', application: 'A brand adds kiosks. What might it give up?', correct: 'Which of control, margin or the customer relationship to trade for lower investment', wrong: ['Nothing, they are free growth', 'Only the brand name', 'Only the menu'], explanation: 'Every shortcut shifts something. Review Chapter 3.' },
  { chapter: '3', objective: 'Recall a small format', question: 'How small can an E-Coffee format be, according to The Investor?', application: 'A founder wants the lowest entry cost. What size is offered?', correct: 'From about 4 square metres', wrong: ['At least 400 square metres', 'Exactly 100 square metres', 'Only drive-through lanes'], explanation: 'Kiosk formats start small. Review Chapter 3.' },
  { chapter: '3', objective: 'Note an evidence gap', question: 'What did the research find on delivery-only coffee kitchens in Vietnam?', application: 'A report cites their size. Is there a public source?', correct: 'No public Vietnam data was found', wrong: ['They hold 90% of the market', 'They are banned', 'They number 10,000'], explanation: 'Absence of data is stated explicitly. Review Chapter 3.' },
]);

export const LESSON_C3_1: CoffeeM3LessonBundle = {
  deck,
  quiz,
  takeaways: {
    learned: 'You can describe independent, chain-owned, franchise and hybrid coffeehouse models and what each trades away.',
    keyTakeaways: [
      'Independents compete on local identity and flexibility, with limited scale.',
      'Independents still earn most Vietnam F&B revenue, but chains are gaining share.',
      'Company ownership gives control; franchise and agency models give speed with outside capital.',
      'Asset-light formats cut capital but trade away control, margin or the customer relationship.',
      'Match each model to what the brand does best.',
    ],
    businessImplications: 'Choose the ownership model and formats deliberately, and keep every operator’s economics healthy enough to protect quality.',
    remember: 'Every model trades control, capital and speed against each other.',
    nextLesson: 'Products, Services & Segmentation',
  },
};
