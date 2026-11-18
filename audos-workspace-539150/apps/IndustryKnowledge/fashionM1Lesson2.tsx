import { F1DeepDive, citeF1, f1Chapter, f1Quiz } from './fashionM1Core';
import type { FashionM1LessonBundle } from './fashionM1Core';

const LESSON = '2. Industry History & Development';

const deck = [
  f1Chapter({
    title: 'From Traditional Retail to Globalised Brands', chapterTitle: LESSON, readingTime: '7',
    objective: 'Trace how production methods, international trade and brand management moved the industry from local craft to globalised, brand-led retail.',
    mateIntro: 'Clothing was once made down the road and judged on how long it lasted. Four shifts turned it into a global, brand-led business — and each shift changed what competition rewarded.',
    keyInsight: 'Industrialisation and globalisation transformed retail competition by increasing production capacity, expanding product availability, and making brands more important in differentiating products across markets.',
    statTiles: [
      { value: '4', label: 'Development eras', description: 'Traditional, industrial, globalised, then fast fashion.' },
      { value: 'Brand', label: 'The new differentiator', description: 'Once availability was solved, identity decided the winner.' },
      { value: 'Speed', label: 'Fast-fashion advantage', description: 'Short cycles and frequent launches became competitive tools.' },
    ],
    statsNote: 'Era counts describe the development framework used in this lesson, not dated market statistics.',
    narrative: [
      { label: 'What it is', text: 'The industry moved from locally produced goods and traditional distribution toward large-scale manufacturing, international sourcing and standardised retail networks. Each stage changed both the cost of making product and the basis on which retailers competed.' },
      { label: 'Why it is happening', text: 'Mass production and expanding retail networks solved availability. Once most retailers could put product on a shelf, availability stopped being a differentiator and design, pricing, quality, brand image and distribution reach took over.' },
      { label: 'Real-world example', text: 'In traditional retail, clothing, footwear and personal goods were produced by local artisans or small manufacturers and sold through markets and local shops, with consumers emphasising durability, price and practical functionality. Specialty stores, department stores and shopping malls later created the space for brands to build recognisable identities.' },
      { label: 'Vietnam example', text: 'International sourcing and manufacturing networks let retailers reach larger markets and manage production costs across geographically distributed supply chains. Fast fashion then compressed development cycles so retailers could respond quickly to changing trends through frequent launches and broad assortments.' },
      { label: 'Business impact', text: 'Manufacturing efficiency, supply chain coordination and brand differentiation became the three foundations of modern retail competition. A retailer strong in only one of them is exposed on the other two.' },
    ],
    visualKind: 'fashion-m1-21-eras', visualHeading: 'From local craft to global brands',
    visualIntro: 'Compare how product was made and sold in each era with what competition actually rewarded at the time.',
    imageAlt: 'Casemate table comparing traditional, industrial, globalised and fast-fashion retail eras',
    keyTerms: [
      { term: 'Fast fashion', definition: 'A model built on short product development cycles, frequent launches and broad assortments so a retailer can respond quickly to changing trends.' },
      { term: 'International sourcing', definition: 'Buying production capacity and materials across several countries to access capability and manage cost.' },
      { term: 'Brand differentiation', definition: 'Competing through design, pricing, quality, brand image and distribution reach rather than basic product functionality.' },
      { term: 'Standardised retail network', definition: 'A chain of stores operating to a common format, assortment and service model across many locations.' },
    ],
    recap: [
      'Traditional retail emphasised durability, price and practical functionality.',
      'Industrialisation solved availability and created room for brand identity.',
      'Globalised sourcing expanded reach and managed production cost.',
      'Fast fashion made speed of trend response a competitive tool.',
    ],
    chapterRecap: 'The shift to globalised, brand-led retail expanded scale and complexity, making manufacturing efficiency, supply chain coordination and brand differentiation essential foundations.',
    deepDiveTitle: 'What each era stopped rewarding',
    body: <F1DeepDive paragraphs={[
      'Every transition in this industry removed an advantage as well as creating one. Industrial production removed scarcity as a selling point, which is why brand identity had to be invented as a substitute. Global sourcing removed local manufacturing cost as a moat, which pushed competition toward design and speed.',
      'Fast fashion is the clearest case. By shortening the design-to-shelf cycle, it converted forecasting accuracy from the central skill into a partially recoverable one — a retailer that can react in season no longer has to be right nine months ahead. That shifted the hard problem from prediction to supply chain responsiveness.',
    ]} evidence="The research material describes these eras qualitatively and does not supply dated milestones or production volumes, so no specific years or tonnages are stated." />,
    sources: citeF1('wtoTextiles', 'iloGarment', 'deloitteRetail'),
  }),
  f1Chapter({
    title: 'Digital Retail and Omnichannel Development', chapterTitle: LESSON, readingTime: '7',
    objective: 'Explain how e-commerce, social commerce, data and AI changed discovery and purchase while physical stores retained trial and service roles.',
    mateIntro: 'Digital did not replace the store. It took over discovery and comparison, and left the store holding the two things a screen still cannot do — trying product on, and sorting out problems.',
    keyInsight: 'The industry is moving toward a connected retail model in which digital platforms, physical stores, customer data and lifestyle experiences operate together rather than as separate channels.',
    statTiles: [
      { value: '2020', label: 'Lifestyle-led inflection', description: 'Attention to fitness, comfort and versatile clothing grew from this point.' },
      { value: '4', label: 'Digital capabilities', description: 'E-commerce, social commerce, omnichannel integration and AI personalisation.' },
      { value: 'Data', label: 'The new dependency', description: 'AI value depends on data quality, implementation and customer acceptance.' },
    ],
    statsNote: 'The 2020 reference marks a qualitative shift described in the research material, not a measured figure.',
    narrative: [
      { label: 'What it is', text: 'Digital technology changed how consumers discover, evaluate and purchase fashion, sports and lifestyle products. E-commerce, social media, digital marketing and customer data created new routes to discovery and direct engagement, while physical stores continued to carry product trial and service delivery.' },
      { label: 'Why it is happening', text: 'Online shopping lets consumers compare products, prices, reviews and brands without visiting a store, so the point of decision moved earlier in the journey. Retailers therefore had to influence the customer before they ever reached a shelf.' },
      { label: 'Real-world example', text: 'KOLs, KOCs, livestreams and user-generated content now shape product discovery, brand awareness and purchasing decisions. Retailers coordinate online and offline inventory, promotions, payment systems and customer service to make the journey consistent.' },
      { label: 'Vietnam example', text: 'Since 2020, growing attention to fitness, comfort and versatile clothing has supported interest in athleisure and sports-inspired everyday apparel. Retailers can apply AI to recommendations, demand forecasting, segmentation and inventory planning, with effectiveness depending on data quality, implementation and customer acceptance.' },
      { label: 'Business impact', text: 'Data became a decision-making asset rather than a reporting by-product. Retailers that pair digital convenience with a genuinely useful store experience improve engagement and operational coordination at the same time.' },
    ],
    visualKind: 'fashion-m1-22-digital', visualHeading: 'The connected retail model',
    visualIntro: 'Compare what each digital capability changes with the condition it depends on to actually work.',
    imageAlt: 'Casemate table comparing e-commerce, social commerce, omnichannel and AI personalisation in retail',
    keyTerms: [
      { term: 'KOL and KOC', definition: 'Key Opinion Leader and Key Opinion Consumer — creators whose recommendations influence product discovery and purchase.' },
      { term: 'Livestream shopping', definition: 'Selling through a live video broadcast where products are demonstrated and bought in the same session.' },
      { term: 'User-generated content', definition: 'Reviews, photos and videos created by customers rather than the brand, which influence awareness and trust.' },
      { term: 'Personalisation', definition: 'Using customer data to tailor product recommendations and communication to an individual or segment.' },
    ],
    recap: [
      'E-commerce let consumers compare product, price, reviews and brands before any store visit.',
      'Social commerce and creators moved discovery onto social platforms.',
      'Omnichannel coordinates inventory, promotions, payment and service.',
      'AI supports recommendations, forecasting, segmentation and inventory planning.',
    ],
    chapterRecap: 'Digitalisation expanded customer access and strengthened the role of data; retailers combining digital convenience with effective store experiences improve engagement and coordination.',
    deepDiveTitle: 'Where digital value actually comes from',
    body: <F1DeepDive paragraphs={[
      'The commercial gain from digital is rarely the sale itself — marketplaces often take margin, and delivery plus returns can erase it on a low-value basket. The durable gain is knowing who the customer is, what they looked at and what they sent back, because that information improves the next buy, the next allocation and the next campaign.',
      'This is why AI claims in retail need a specific test. A recommendation engine trained on thin or inconsistent data will confidently recommend the wrong product, and a forecast nobody acts on changes nothing. The question is not whether the model exists but whether its output reaches a decision.',
    ]} evidence="The research material notes that AI effectiveness depends on data quality, implementation and customer acceptance, and does not supply measured uplift figures, so none are claimed." />,
    sources: citeF1('bofStateOfFashion', 'deloitteRetail'),
  }),
];

const quiz = f1Quiz('fashion-m1-l2', [
  { chapter: '1', objective: 'Explain what industrialisation changed', question: 'What did industrialisation and globalisation change about retail competition?', application: 'Availability is no longer a differentiator in a market. What became the basis of competition?', correct: 'Brands became more important in differentiating products across markets', wrong: ['Durability became the only purchase criterion', 'Local artisans regained pricing power', 'Retail networks stopped expanding'], explanation: 'Greater capacity and availability pushed competition toward brand differentiation. Review Chapter 1.' },
  { chapter: '1', objective: 'Characterise traditional retail', question: 'What did consumers emphasise in the traditional retail era?', application: 'A historical case describes buyers choosing on trend and brand image. Why is that wrong for this era?', correct: 'Durability, price and practical functionality', wrong: ['Trend alignment and brand image', 'Livestream convenience and reviews', 'Loyalty points and member pricing'], explanation: 'Traditional retail buyers emphasised durability, price and practical functionality. Review Chapter 1.' },
  { chapter: '1', objective: 'Identify what globalisation enabled', question: 'What did international sourcing and manufacturing networks allow retailers to do?', application: 'A retailer spreads production across several countries. What is it pursuing?', correct: 'Reach larger markets and manage production costs across distributed supply chains', wrong: ['Eliminate all logistics and trade risk', 'Avoid brand investment entirely', 'Guarantee identical demand in every market'], explanation: 'Distributed sourcing expanded market reach and helped manage production cost. Review Chapter 1.' },
  { chapter: '1', objective: 'Define fast fashion', question: 'What defines the fast-fashion model?', application: 'A retailer launches new ranges continuously rather than twice a year. Which model is that?', correct: 'Shorter development cycles with frequent launches and broad assortments', wrong: ['Long lead times with a single annual collection', 'Made-to-order production for each customer', 'Wholesale-only distribution with no retail stores'], explanation: 'Fast fashion compresses development cycles so retailers can respond quickly to changing trends. Review Chapter 1.' },
  { chapter: '1', objective: 'Identify the modern foundations', question: 'Which three capabilities became the foundations of modern retail competition?', application: 'A retailer has strong brand but weak sourcing. What is it missing?', correct: 'Manufacturing efficiency, supply chain coordination and brand differentiation', wrong: ['Local craft, market stalls and word of mouth', 'Tariff exemption, subsidy and price control', 'Franchising, licensing and wholesale only'], explanation: 'The transition made manufacturing efficiency, supply chain coordination and brand differentiation essential. Review Chapter 1.' },
  { chapter: '2', objective: 'Describe the connected retail model', question: 'What does the connected retail model combine?', application: 'A retailer runs its website and stores as separate businesses. What does the lesson recommend?', correct: 'Digital platforms, physical stores, customer data and lifestyle experiences operating together', wrong: ['Online channels replacing stores completely', 'Stores operating independently of all digital data', 'Wholesale replacing both retail channels'], explanation: 'The industry is moving toward platforms, stores, data and experiences working together rather than separately. Review Chapter 2.' },
  { chapter: '2', objective: 'Explain what e-commerce changed', question: 'What does e-commerce let consumers do before visiting a store?', application: 'A shopper arrives already knowing the price at three competitors. What enabled that?', correct: 'Compare products, prices, reviews and brands without a store visit', wrong: ['Try the product on at home for free', 'Negotiate wholesale terms directly', 'Access factory production schedules'], explanation: 'Online shopping allows comparison of products, prices, reviews and brands without visiting a store. Review Chapter 2.' },
  { chapter: '2', objective: 'Identify social commerce drivers', question: 'Which influences shape discovery in social commerce?', application: 'A brand wants to reach buyers where discovery now happens. Which levers apply?', correct: 'KOLs, KOCs, livestreams and user-generated content', wrong: ['Printed catalogues and direct mail', 'Trade shows and wholesale fairs', 'In-store signage only'], explanation: 'KOLs, KOCs, livestreams and user-generated content influence discovery, awareness and purchase. Review Chapter 2.' },
  { chapter: '2', objective: 'Identify the 2020 lifestyle shift', question: 'What consumer shift has grown since 2020 according to this lesson?', application: 'Demand for versatile everyday apparel rises. Which shift does that reflect?', correct: 'Growing attention to fitness, comfort and versatile clothing', wrong: ['A return to formal tailoring only', 'Declining interest in online shopping', 'A move away from branded product entirely'], explanation: 'Since 2020, attention to fitness, comfort and versatile clothing has supported athleisure interest. Review Chapter 2.' },
  { chapter: '2', objective: 'Evaluate AI claims critically', question: 'What determines whether AI delivers value in retail?', application: 'A retailer deploys a recommendation engine and sees no improvement. What should it examine?', correct: 'Data quality, implementation and customer acceptance', wrong: ['The size of the model alone', 'The number of dashboards produced', 'The vendor’s market reputation'], explanation: 'AI effectiveness depends on data quality, implementation and customer acceptance. Review Chapter 2.' },
]);

export const LESSON_1_2: FashionM1LessonBundle = {
  deck,
  quiz,
  takeaways: {
    learned: 'You can trace the industry from local craft through industrialisation and globalisation to fast fashion, and explain how digital and omnichannel reshaped discovery and purchase.',
    keyTakeaways: [
      'Each era removed an advantage as well as creating one.',
      'Once availability was solved, brand identity became the differentiator.',
      'Fast fashion shifted the hard problem from forecasting to responsiveness.',
      'Digital moved discovery earlier; stores kept trial and service.',
      'AI value depends on data quality, implementation and acceptance.',
    ],
    businessImplications: 'Manufacturing efficiency, supply chain coordination and brand differentiation now have to work together; strength in one of the three leaves a retailer exposed on the other two.',
    remember: 'The industry changed whenever a new capability stopped being scarce.',
    nextLesson: 'Global Market Landscape',
  },
};
