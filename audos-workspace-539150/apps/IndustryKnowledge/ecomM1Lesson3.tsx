import { EcomDeepDive, citeEcom, ecomChapter, ecomQuiz } from './ecomM1Core';
import type { EcomM1LessonBundle } from './ecomM1Core';

const LESSON = 'Global Market Overview';

const deck = [
  ecomChapter({
    title: 'Global Market Size, Growth and Development', chapterTitle: LESSON, readingTime: '7',
    objective: 'Read the global e-commerce estimate with its definition attached, and explain what now drives growth in mature markets.',
    mateIntro: 'There is one big number in this chapter. Before you use it, note what it leaves out — travel and event tickets among other things — because that caveat is what makes it usable.',
    keyInsight: 'Global e-commerce continues to expand, but the market is becoming more mature in established economies. Growth increasingly depends on improving conversion, customer retention, operational efficiency, and penetration in emerging markets rather than relying exclusively on first-time online adoption.',
    statTiles: [
      { value: 'US$6.419T', label: 'Global retail e-commerce sales forecast for 2025', subtitle: 'EMARKETER, February 2025 commercial forecast', description: 'Published 22 May 2025; this is a forecast, not an official statistic or GMV measure.' },
      { value: '20.5%', label: 'Share of worldwide retail sales', subtitle: 'EMARKETER, same forecast', description: 'The share that the forecast assigns to retail e-commerce in 2025.' },
      { value: '5', label: 'Measurement layers to keep apart', description: 'Total digital activity, GMV, all digitally ordered trade, retail e-commerce sales and platform revenue.' },
    ],
    statsNote: 'The two figures are a commercial forecast from one publisher, not an official statistic, and they are not comparable with gross merchandise value or with national e-commerce estimates built on different coverage.',
    narrative: [
      { label: 'What it is', text: 'Global e-commerce has become a major component of retail and business-to-business trade. Its expansion is supported by internet access, smartphone adoption, digital payments, improvements in delivery infrastructure and the growing use of online platforms by businesses and consumers.' },
      { label: 'Why it is happening', text: 'Market size estimates vary depending on whether they measure online retail sales, all digitally ordered business transactions, or the broader value of marketplace activity. EMARKETER’s February 2025 commercial forecast, published on 22 May 2025, put worldwide retail e-commerce sales at US$6.419 trillion in 2025, or 20.5% of total global retail sales. It is a forecast built from research-firm and government data, historical trends, retailer revenues, consumer buying trends and macroeconomic conditions.' },
      { label: 'Real-world example', text: 'Consumers increasingly purchase electronics, fashion, beauty products and household goods online, while businesses use online procurement platforms and digital ordering systems to streamline purchasing. Expanding internet access, urbanisation and digital payment adoption continue to support new customer acquisition in emerging markets.' },
      { label: 'Vietnam example', text: 'Vietnam sits on the emerging-market side of that split, where first-time adoption still contributes meaningfully to growth. That is a different commercial problem from a mature market, and it is why the Vietnam figures in Lesson 4 are read against their own national baseline rather than against the global average.' },
      { label: 'Business impact', text: 'Cross-border transactions let businesses reach international customers without relying exclusively on physical distribution, and marketplaces keep expanding selection and transaction volume. But in established economies the easy gains from first-time adoption are largely taken, so growth now has to come from conversion, retention, efficiency and category expansion.' },
    ],
    visualKind: 'ecom-m1-31-global', visualHeading: 'Five ways to measure the same industry',
    visualIntro: 'Read the measurement layers from widest to narrowest, and see where the global figure actually sits.',
    imageAlt: 'Casemate cluster mind map of five e-commerce measurement layers from total digital activity to platform revenue',
    keyTerms: [
      { term: 'Retail e-commerce sales', definition: 'The value of retail products and services ordered online, on a definition that typically excludes travel and event tickets.' },
      { term: 'Penetration rate', definition: 'E-commerce expressed as a share of total retail; it moves with both the numerator and the denominator.' },
      { term: 'Market maturity', definition: 'The stage at which most potential buyers already shop online, so growth must come from frequency, basket and efficiency.' },
      { term: 'Conversion', definition: 'The share of visitors who complete a purchase; the main growth lever once new-customer acquisition slows.' },
    ],
    recap: [
      'EMARKETER’s commercial forecast put retail e-commerce sales at US$6.419 trillion for 2025.',
      'That is roughly 20.5% of worldwide retail on the same forecast.',
      'The measure excludes categories such as travel and event tickets.',
      'In mature markets growth comes from conversion, retention and efficiency.',
    ],
    chapterRecap: 'Global e-commerce has achieved substantial scale and continues to gain importance in retail and business transactions. Future growth will depend on market maturity, category expansion, customer economics and the ability to operate efficiently at scale.',
    deepDiveTitle: 'What a penetration rate hides',
    body: <EcomDeepDive paragraphs={[
      'A share such as 20.5% is a ratio, and ratios move for two reasons. E-commerce can grow, or total retail can shrink. A penetration figure that jumps in a weak year may be telling you more about depressed store sales than about online strength, which is why the share and the absolute value should always be read together.',
      'The exclusions matter just as much. This measure leaves out travel and event tickets, which are large online categories in their own right. A business selling experiences rather than goods is not inside this number at all, so sizing its market from the headline figure would overstate the opportunity it can actually address.',
    ]} evidence="EMARKETER’s February 2025 commercial forecast, published 22 May 2025, states US$6.419 trillion and 20.5%. The publication explains that its methodology combines research-firm and government data, historical trends, retailer revenues, consumer buying trends and macroeconomic conditions. The analysis of what a penetration ratio can hide is our own." />,
    sources: citeEcom('emarketerForecast', 'unctadMeasuring'),
  }),
  ecomChapter({
    title: 'Major Markets, Platforms and Competitive Structure', chapterTitle: LESSON, readingTime: '7',
    objective: 'Map the platform archetypes competing globally and explain why regional competitive structures differ.',
    mateIntro: 'The same business model does not travel well. What wins in a market with dense cities and card payment can fail in one built on cash, motorbikes and livestreams.',
    keyInsight: 'Global e-commerce competition is increasingly ecosystem-based. Companies compete not only on product prices and assortment but also on traffic acquisition, fulfilment, payments, advertising, seller services, personalization, and customer trust.',
    statTiles: [
      { value: '6', label: 'Platform archetypes', subtitle: 'Global marketplace to specialised platform', description: 'Each competes on a different combination of scale, content, control and curation.' },
      { value: '2', label: 'Markets singled out as central', subtitle: 'China and the United States', description: 'With Southeast Asia, India and Latin America named as expansion opportunities.' },
      { value: '7', label: 'Dimensions of ecosystem competition', description: 'Traffic, fulfilment, payments, advertising, seller services, personalisation and trust.' },
    ],
    statsNote: 'The tiles count the archetypes, markets and competitive dimensions named in the brief. No market shares, platform revenues or regional sizes are supplied, so none are quoted.',
    narrative: [
      { label: 'What it is', text: 'The global e-commerce landscape combines large general-purpose marketplaces, regional platforms, direct-to-consumer brands, social commerce services and specialised digital marketplaces. China and the United States are particularly important markets, while Southeast Asia, India, Latin America and other emerging economies offer opportunities for further expansion.' },
      { label: 'Why it is happening', text: 'Competition varies across regions because of differences in consumer behaviour, payment infrastructure, logistics, regulation and local retail structures. Some markets are dominated by large platforms with extensive logistics and advertising ecosystems, while others feature a more fragmented combination of marketplaces, independent retailers and social commerce channels.' },
      { label: 'Real-world example', text: 'Amazon operates a broad marketplace with supporting fulfilment and seller services. Alibaba and JD.com represent different approaches to marketplace commerce, owned retail operations and logistics. Shopee and Lazada serve multiple Southeast Asian markets, and TikTok Shop combines content discovery, creator influence and in-app shopping.' },
      { label: 'Vietnam example', text: 'Vietnam illustrates the fragmented pattern: regional marketplaces, a strong social commerce layer, domestic retailers and brand-owned stores all compete for the same shopper, and no single ecosystem carries the whole journey. Lesson 4 looks at how that shapes a Vietnamese seller’s channel decision.' },
      { label: 'Business impact', text: 'Direct-to-consumer brands use their own stores to control customer relationships, presentation and first-party data, while specialised marketplaces compete through curated selection and specialist knowledge. Across all of them, advantage comes from the quality of the surrounding ecosystem rather than from the marketplace interface alone.' },
    ],
    visualKind: 'ecom-m1-32-platforms', visualHeading: 'Six platform archetypes competing globally',
    visualIntro: 'Compare each archetype with the examples named in the brief and the basis on which it competes.',
    imageAlt: 'Casemate split mind map of global e-commerce platform archetypes and how each competes',
    keyTerms: [
      { term: 'Ecosystem competition', definition: 'Competing on the combined strength of traffic, fulfilment, payments, advertising and trust rather than on one feature.' },
      { term: 'Regional platform', definition: 'A marketplace operating across several neighbouring markets, adapted to local payment and logistics conditions.' },
      { term: 'First-party data', definition: 'Customer information a business collects from its own channels, which direct-to-consumer brands retain and marketplace sellers usually do not.' },
      { term: 'Curation', definition: 'Deliberately restricting and selecting assortment, the main way a specialised marketplace competes with a general one.' },
    ],
    recap: [
      'Global marketplaces, regional platforms, D2C brands, social commerce and specialists all compete.',
      'China and the United States are central; emerging markets offer expansion.',
      'Regional structures differ by behaviour, payment, logistics, regulation and retail.',
      'Advantage comes from the ecosystem, not the interface.',
    ],
    chapterRecap: 'Global competition includes both international platforms and regionally specialised players. Competitive advantage increasingly depends on the quality of the overall commerce ecosystem rather than on the marketplace interface alone.',
    deepDiveTitle: 'Why platform models do not transplant',
    body: <EcomDeepDive paragraphs={[
      'A model built where card payment is universal, addresses are standardised and parcel networks are dense makes assumptions that silently fail elsewhere. Cash on delivery changes working capital and the return rate. Informal addressing changes last-mile cost. A population that discovers products in short video rather than search changes what a seller must produce before it can sell anything at all.',
      'This is why a global platform entering a new market usually has to rebuild the parts that look least glamorous — payment acceptance, delivery coverage, dispute handling — while a local competitor that already solved them can be far smaller and still win. Scale helps, but only where the local conditions let it apply.',
    ]} evidence="The archetypes, named platforms and the reasons regional competition differs are from the supplied brief, which gives no market shares or platform revenues. The analysis of why models fail to transplant is our own." />,
    sources: citeEcom('econSea', 'unctadDigitalEconomy'),
  }),
  ecomChapter({
    title: 'Global Industry Trends and Structural Changes', chapterTitle: LESSON, readingTime: '7',
    objective: 'Identify the structural changes reshaping global e-commerce and explain why they raise costs as well as creating opportunity.',
    mateIntro: 'Every one of these trends is sold as growth. Each one also adds a cost — attention gets dearer, delivery promises get harder, and someone has to pay for both.',
    keyInsight: 'The next stage of e-commerce development will be shaped by the integration of commerce, content, data, and fulfilment. Platforms and merchants must balance growth with sustainable margins, trusted transactions, and differentiated customer experiences.',
    statTiles: [
      { value: '6', label: 'Structural changes', subtitle: 'AI shopping to profitability management', description: 'Each creates an opportunity and a matching cost pressure.' },
      { value: 'Rising', label: 'Customer acquisition cost', description: 'Competition for consumer attention is increasing as channels multiply.' },
      { value: 'Margin', label: 'The new discipline', description: 'Contribution margin, promotional spend, advertising efficiency and lifetime value.' },
    ],
    statsNote: 'The tiles summarise the trends described in this lesson. The brief supplies no measured acquisition costs, margin levels or adoption rates, so none are stated.',
    narrative: [
      { label: 'What it is', text: 'The global industry is moving from rapid channel expansion toward more sophisticated competition involving customer experience, operational efficiency and profitability. Established players are investing in logistics, advertising, recommendation systems, seller tools and technology to increase transaction frequency and improve the economics of each order.' },
      { label: 'Why it is happening', text: 'At the same time, social commerce, cross-border selling, AI-enabled personalisation and omnichannel retail are reshaping how customers discover and purchase products. These developments create new growth opportunities but also increase competition for consumer attention, raise customer acquisition costs and intensify expectations for delivery speed and service quality.' },
      { label: 'Real-world example', text: 'Conversational search, recommendation systems and shopping assistants help customers find suitable products; livestreams and creator communities connect demonstration with purchase; and marketplace infrastructure lets merchants reach international customers. Fulfilment work focuses on inventory placement, order routing, delivery reliability and reverse logistics.' },
      { label: 'Vietnam example', text: 'In Vietnam these pressures arrive together rather than in sequence: a merchant may be managing marketplace listings, livestream selling and cross-border competition in the same quarter, with promotional intensity setting the price it can realise. That combination makes margin discipline a current problem rather than a later one.' },
      { label: 'Business impact', text: 'Profitability management — contribution margin, promotional expenditure, advertising efficiency and customer lifetime value — is becoming the dividing line. As growth moderates in mature markets, companies that integrate customer experience, data, fulfilment and financial discipline are better positioned than those still buying volume.' },
    ],
    visualKind: 'ecom-m1-33-trends', visualHeading: 'Six structural changes reshaping the industry',
    visualIntro: 'Read each change alongside the cost pressure it brings with it.',
    imageAlt: 'Casemate staircase mind map of six structural changes in global e-commerce and their cost pressures',
    keyTerms: [
      { term: 'Customer acquisition cost', definition: 'The marketing spend required to win one order or customer; it rises as competition for attention increases.' },
      { term: 'Customer lifetime value', definition: 'The total contribution expected from a customer over the whole relationship, which justifies acquisition spend.' },
      { term: 'Contribution margin', definition: 'What a sale leaves after the variable costs of serving it, including fulfilment, payment fees and returns.' },
      { term: 'Order routing', definition: 'Deciding which stock location fulfils an order, a main lever on delivery speed and cost.' },
    ],
    recap: [
      'Competition is moving from channel expansion to experience, efficiency and profit.',
      'AI, social, cross-border and omnichannel create opportunity and raise costs.',
      'Attention is scarcer, so acquisition costs rise and delivery expectations harden.',
      'Margin, promotional spend, advertising efficiency and lifetime value now decide outcomes.',
    ],
    chapterRecap: 'Global e-commerce is becoming more technology-intensive and operationally sophisticated. Companies that integrate customer experience, data, fulfilment and financial discipline will be better positioned to compete as growth moderates in mature markets.',
    deepDiveTitle: 'Growth that costs more than it earns',
    body: <EcomDeepDive paragraphs={[
      'When adoption was the constraint, buying volume made sense: a customer won cheaply today would keep buying for years. As markets mature that logic weakens. Attention costs more, discounting is needed to convert it, and delivery promises that were once a differentiator become the minimum. The same order can therefore be won at a price that never returns a profit.',
      'The discipline that follows is unglamorous but decisive. Judge a channel or campaign on contribution after fulfilment, payment fees, returns and acquisition cost, and judge the customer on whether they come back. A business that cannot state those two numbers is not managing growth; it is funding it.',
    ]} evidence="The six structural changes, the pressure on acquisition cost and delivery expectations, and the shift toward profitability management are from the supplied brief, which gives no measured costs or margins. The argument about judging growth on contribution and repeat purchase is our own." />,
    sources: citeEcom('unctadDer', 'emarketerForecast', 'wtoEcommerce'),
  }),
];

const quiz = ecomQuiz('ecom-m1-l3', [
  { chapter: '1', objective: 'Recall the global estimate', question: 'What were global retail e-commerce sales forecast to reach in 2025?', application: 'A deck cites US$642 billion for global retail e-commerce. What is the correction?', correct: 'US$6.419 trillion', wrong: ['About US$642 billion', 'About US$64.2 trillion', 'About US$31 billion'], explanation: 'EMARKETER’s February 2025 commercial forecast, published 22 May 2025, states US$6.419 trillion. Review Chapter 1.' },
  { chapter: '1', objective: 'Recall the penetration share', question: 'What share of worldwide retail sales did that forecast assign to e-commerce?', application: 'An analyst needs the 2025 penetration figure. Which applies?', correct: 'Around 20.5%', wrong: ['Around 2.05%', 'Around 50%', 'Around 80%'], explanation: 'The same forecast puts retail e-commerce at around 20.5% of worldwide retail sales. Review Chapter 1.' },
  { chapter: '1', objective: 'Read the definition', question: 'What does the global retail e-commerce measure exclude?', application: 'A travel business sizes its market from this figure. What is wrong?', correct: 'Several categories including travel and event tickets', wrong: ['All electronics and fashion sales', 'All business-to-business transactions only', 'All sales outside North America'], explanation: 'The measure covers retail products and services ordered online and excludes travel and event tickets among other categories. Review Chapter 1.' },
  { chapter: '1', objective: 'Explain mature-market growth', question: 'Where does growth increasingly come from in established economies?', application: 'A mature market has few new online shoppers left. What should the plan target?', correct: 'Conversion, customer retention, operational efficiency and emerging-market penetration', wrong: ['First-time online adoption alone', 'Opening more physical stores only', 'Raising prices across the catalogue'], explanation: 'Growth depends less on first-time adoption as markets mature. Review Chapter 1.' },
  { chapter: '2', objective: 'Identify the central markets', question: 'Which markets does the brief identify as particularly important?', application: 'A global plan covers Europe only. Which markets are named as central?', correct: 'China and the United States', wrong: ['Brazil and South Africa', 'Japan and Australia', 'Germany and France'], explanation: 'China and the United States are named as particularly important, with emerging economies offering expansion. Review Chapter 2.' },
  { chapter: '2', objective: 'Explain regional variation', question: 'Why does competition vary across regions?', application: 'A model that worked at home fails abroad. What explains it?', correct: 'Differences in consumer behaviour, payment infrastructure, logistics, regulation and local retail structures', wrong: ['Differences in currency symbols only', 'Differences in website colour schemes', 'Differences in corporate tax rates only'], explanation: 'These structural differences shape how competition works in each region. Review Chapter 2.' },
  { chapter: '2', objective: 'Describe ecosystem competition', question: 'On what do companies compete beyond price and assortment?', application: 'A platform matches rivals on price and still loses share. What else matters?', correct: 'Traffic acquisition, fulfilment, payments, advertising, seller services, personalisation and trust', wrong: ['Only the speed of the homepage', 'Only the number of product photographs', 'Only the size of the head office'], explanation: 'Competition is increasingly ecosystem-based. Review Chapter 2.' },
  { chapter: '3', objective: 'Identify the next stage', question: 'What will shape the next stage of e-commerce development?', application: 'A plan focuses on adding channels only. What is it missing?', correct: 'The integration of commerce, content, data and fulfilment', wrong: ['A return to catalogue retailing', 'The removal of all digital payment', 'The end of marketplace platforms'], explanation: 'The next stage is shaped by integrating commerce, content, data and fulfilment. Review Chapter 3.' },
  { chapter: '3', objective: 'Recognise the cost side of trends', question: 'What do social commerce, cross-border selling and AI personalisation also create?', application: 'A retailer adds new channels and margin falls. Was that foreseeable?', correct: 'More competition for attention, higher acquisition costs and harder delivery expectations', wrong: ['Automatically lower operating costs', 'Guaranteed improvement in margin', 'An end to promotional discounting'], explanation: 'These developments create opportunity but also raise cost and expectation. Review Chapter 3.' },
  { chapter: '3', objective: 'Apply profitability discipline', question: 'Which measures belong to profitability management in this lesson?', application: 'A board reviews a channel on order volume alone. What should it add?', correct: 'Contribution margin, promotional expenditure, advertising efficiency and customer lifetime value', wrong: ['Total page views and app downloads', 'Number of products listed', 'Headcount in the marketing team'], explanation: 'These are the measures named for managing profitability as growth moderates. Review Chapter 3.' },
]);

export const LESSON_ECOM_3: EcomM1LessonBundle = {
  deck,
  quiz,
  takeaways: {
    learned: 'You can quote the global e-commerce estimate with its definition, map the platform archetypes competing worldwide, and name the structural changes now reshaping the industry.',
    keyTakeaways: [
      'EMARKETER’s commercial forecast put retail e-commerce at US$6.419 trillion in 2025, or 20.5% of total global retail sales.',
      'That measure excludes travel and event tickets, so it does not size every online business.',
      'Regional competition differs by behaviour, payment, logistics, regulation and retail structure.',
      'Advantage is ecosystem-based rather than interface-based.',
      'Each structural trend brings a matching cost in attention, service or complexity.',
    ],
    businessImplications: 'Read a penetration share and an absolute value together, because the ratio can move when store sales fall rather than when online sales rise — and judge new channels on contribution after fulfilment, fees, returns and acquisition cost.',
    remember: 'A market size is only usable with its definition attached.',
    nextLesson: 'Vietnam Market Overview',
  },
};
