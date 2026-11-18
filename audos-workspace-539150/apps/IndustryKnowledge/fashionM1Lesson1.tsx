import { F1DeepDive, citeF1, f1Chapter, f1Quiz } from './fashionM1Core';
import type { FashionM1LessonBundle } from './fashionM1Core';

const LESSON = '1. Industry Definition & Scope';

const deck = [
  f1Chapter({
    title: 'Product Categories and Industry Boundaries', chapterTitle: LESSON, readingTime: '7',
    objective: 'Define what Fashion, Sports & Lifestyle Retail covers, distinguish its three segments, and explain where their boundaries overlap.',
    mateIntro: 'People call this one industry, but a running shoe, a handbag and a travel organiser are bought for completely different reasons. Separate the segments first, then look at where they meet.',
    keyInsight: 'The industry comprises three interconnected segments — Fashion, Sports and Lifestyle. They share distribution channels and consumer groups, but differ in purchasing motivation, product requirements and competitive dynamics.',
    statTiles: [
      { value: '3', label: 'Interconnected segments', description: 'Fashion, Sports and Lifestyle share customers but not buying logic.' },
      { value: '4', label: 'Fashion sub-categories', description: 'Clothing, footwear, handbags and accessories.' },
      { value: 'Athleisure', label: 'Where the boundary blurs', description: 'One product now serves athletic and everyday use.' },
    ],
    statsNote: 'Segment counts describe the scope framework used in this lesson, not measured market shares.',
    narrative: [
      { label: 'What it is', text: 'Fashion, Sports & Lifestyle Retail provides products supporting consumers’ clothing needs, physical activities and lifestyle preferences. It combines functional value, aesthetics, product performance and personal identity, and extends beyond apparel into footwear, accessories, sports equipment and lifestyle goods.' },
      { label: 'Why it is happening', text: 'Each segment answers a different question. Fashion answers how a product looks and signals; Sports answers how it performs; Lifestyle answers how it fits a daily routine. Because the same retailer and the same shopper can span all three, the segments share channels without sharing purchase criteria.' },
      { label: 'Real-world example', text: 'Fashion retail covers clothing, footwear, handbags and accessories, judged on design, fit, quality, price, brand image and trend alignment. Sports retail covers sportswear, running and athletic footwear, training equipment and outdoor products, judged on performance, durability, comfort and functionality.' },
      { label: 'Vietnam example', text: 'Lifestyle retail covers travel accessories, personal-use items and products supporting active, convenient living, where design, portability and practicality drive demand. Athleisure and sports-inspired fashion show the boundary dissolving: the product is bought once and used for both training and everyday wear.' },
      { label: 'Business impact', text: 'Scope definition decides which competitors, which margin benchmarks and which growth rates belong in an analysis. Treating the industry as one undifferentiated block hides that a performance claim wins in Sports while a trend claim wins in Fashion.' },
    ],
    visualKind: 'fashion-m1-11-segments', visualHeading: 'Three segments, three buying logics', visualIntro: 'Compare what each segment sells with what the buyer actually weighs — and see where convergence sits.',
    imageAlt: 'Casemate table comparing the fashion, sports and lifestyle retail segments by products and purchase criteria',
    keyTerms: [
      { term: 'Athleisure', definition: 'Sports-inspired clothing designed for both athletic use and everyday wear, sitting across the fashion and sports segments.' },
      { term: 'Category convergence', definition: 'The process by which the boundaries between product categories become less distinct as products start serving multiple purposes.' },
      { term: 'Industry scope', definition: 'The set of product categories and activities counted as part of an industry, which determines which competitors and figures are relevant.' },
      { term: 'Functional versus aesthetic value', definition: 'The split between what a product does and how it looks or signals identity; most products in this industry carry both.' },
    ],
    recap: [
      'The industry covers products meeting functional, aesthetic and lifestyle needs.',
      'Fashion, Sports and Lifestyle differ in purchase motivation and product requirements.',
      'Shared channels and customers do not mean shared competitive dynamics.',
      'Athleisure shows the fashion–sports boundary becoming less distinct.',
    ],
    chapterRecap: 'Understanding the differences and overlaps between the three core segments is the foundation for evaluating demand, competition and positioning.',
    deepDiveTitle: 'Why scope decides the answer',
    body: <F1DeepDive paragraphs={[
      'A boundary question looks academic until it changes a number. If an analyst counts sports equipment inside the industry, the addressable market grows and the competitor set gains specialist outdoor retailers. If they exclude it, the same company suddenly looks like it holds a larger share of a smaller market.',
      'The practical test is the purchase criterion, not the shelf. A running shoe bought for marathon training is a Sports purchase judged on cushioning and durability. The same model bought to wear with jeans is a Fashion purchase judged on silhouette and brand. The product did not change; the segment did.',
    ]} evidence="The research material defines the three segments qualitatively and does not supply measured revenue splits between Fashion, Sports and Lifestyle, so no share figures are stated here." />,
    sources: citeF1('bofStateOfFashion', 'deloitteRetail'),
  }),
  f1Chapter({
    title: 'Target Customers and Retail Channels', chapterTitle: LESSON, readingTime: '7',
    objective: 'Map the customer segments the industry serves and the physical and digital channels retailers use to reach them.',
    mateIntro: 'Knowing who buys is only half the job. The other half is knowing where they want to discover, try and pay — and those are often three different places.',
    keyInsight: 'Customer segmentation and channel selection are closely connected. Retailers need to understand who purchases their products, what motivates those purchases, and where customers prefer to discover, evaluate and buy.',
    statTiles: [
      { value: '8+', label: 'Distinct customer groups', description: 'Men, women, children, Gen Z, Millennials, professionals, fitness and style-led buyers.' },
      { value: '4', label: 'Channel families', description: 'Brand-owned, multi-brand and specialty, e-commerce and social, omnichannel.' },
      { value: '1', label: 'Journey to design for', description: 'Omnichannel means one journey however the customer enters it.' },
    ],
    statsNote: 'Counts describe the segmentation and channel framework used in this lesson, not measured channel shares.',
    narrative: [
      { label: 'What it is', text: 'The industry serves a broad customer base with different demographic characteristics, purchasing power and lifestyle preferences, while distributing through physical stores and digital platforms that each create a different opportunity to influence the purchase.' },
      { label: 'Why it is happening', text: 'Needs differ by age, income, lifestyle and product involvement. A fitness enthusiast and a style-conscious professional may buy the same brand for opposite reasons, so assortment, pricing, communication and channel have to be aligned to a defined segment rather than to the average shopper.' },
      { label: 'Real-world example', text: 'Brand-owned stores let a retailer control product presentation, customer service and the overall experience. Multi-brand retailers provide access to several labels, while specialty stores concentrate on a category such as footwear, sportswear or outdoor equipment.' },
      { label: 'Vietnam example', text: 'Brand websites, online marketplaces, social media and livestream shopping widen accessibility and support digital engagement. Integrating these with physical stores lets a retailer show consistent product information, inventory visibility, purchase options and service.' },
      { label: 'Business impact', text: 'Channel economics differ sharply: owned stores cost rent and staff but return first-party data and experience control, while marketplaces buy reach at the price of margin and customer relationship. The mix should follow the target segment, not channel fashion.' },
    ],
    visualKind: 'fashion-m1-12-channels', visualHeading: 'Customers and the channels that reach them',
    visualIntro: 'Compare what each channel lets a retailer control against where that channel actually earns its place.',
    imageAlt: 'Casemate table comparing brand-owned, multi-brand, digital and omnichannel retail channels',
    keyTerms: [
      { term: 'Customer segmentation', definition: 'Dividing a market into groups with similar needs or shopping behaviour so assortment, price and communication can be matched to them.' },
      { term: 'Specialty retail', definition: 'A store format concentrating on one category such as footwear, sportswear or outdoor equipment rather than carrying a broad range.' },
      { term: 'Social commerce', definition: 'Selling through social platforms, including livestream shopping and creator-led content, where discovery and purchase happen in the same place.' },
      { term: 'Omnichannel retail', definition: 'Integrating physical stores and online platforms so product information, inventory, purchasing options and service stay consistent.' },
    ],
    recap: [
      'Key groups span men, women, children, Gen Z, Millennials, professionals, fitness and style-led buyers.',
      'Brand-owned stores control experience; multi-brand and specialty control choice and depth.',
      'E-commerce and social commerce widen access and support digital engagement.',
      'Omnichannel integration makes information, stock and service consistent across channels.',
    ],
    chapterRecap: 'Effective retailers align product assortment, pricing, communication and channel strategy with the needs and shopping behaviour of their target customers.',
    deepDiveTitle: 'Matching the channel to the mission',
    body: <F1DeepDive paragraphs={[
      'A customer researching a technical running shoe behaves differently from one buying a basic t-shirt. The first wants fit advice, size confidence and often an in-store trial; the second wants the lowest friction and will take a marketplace listing. The same retailer therefore needs different channel strengths for different parts of its own range.',
      'This is why omnichannel is an operating requirement rather than a marketing word. If the website shows stock the store cannot find, or the store quotes a price the app does not honour, the integration has failed in the only place the customer notices.',
    ]} evidence="The research material describes the channel mix qualitatively; it does not provide verified channel-share percentages for this industry, so none are presented." />,
    sources: citeF1('deloitteRetail', 'bofStateOfFashion', 'moitEcommerce'),
  }),
];

const quiz = f1Quiz('fashion-m1-l1', [
  { chapter: '1', objective: 'Define the industry scope', question: 'Which three segments make up Fashion, Sports & Lifestyle Retail?', application: 'A scope note lists only clothing and footwear. What is missing?', correct: 'Fashion, Sports and Lifestyle', wrong: ['Wholesale, logistics and manufacturing', 'Luxury, premium and value only', 'Online, offline and export'], explanation: 'The industry comprises three interconnected segments: Fashion, Sports and Lifestyle. Review Chapter 1.' },
  { chapter: '1', objective: 'Distinguish segment buying logic', question: 'What do Sports retail buyers weigh most heavily?', application: 'A team markets a training shoe purely on seasonal colour. What criterion are they ignoring?', correct: 'Performance, durability, comfort and functionality', wrong: ['Trend alignment above all else', 'Portability for travel use', 'Resale value after one season'], explanation: 'Sports purchases turn on performance, durability, comfort and functionality rather than trend alone. Review Chapter 1.' },
  { chapter: '1', objective: 'Distinguish segment buying logic', question: 'Which criteria define a Fashion retail purchase?', application: 'A buyer must justify a range to the board. Which criteria apply to the fashion lines?', correct: 'Design, fit, quality, price, brand image and trend alignment', wrong: ['Cushioning, grip and breathability', 'Luggage capacity and wheel durability', 'Warranty length and spare-part supply'], explanation: 'Fashion products are evaluated on design, fit, quality, price, brand image and alignment with current trends. Review Chapter 1.' },
  { chapter: '1', objective: 'Explain category convergence', question: 'What does athleisure demonstrate about the industry?', application: 'A product sells to both gym users and commuters. What does that indicate?', correct: 'The boundary between fashion and sports retail is becoming less distinct', wrong: ['Sports retail is replacing fashion retail entirely', 'Lifestyle products have left the industry', 'Performance no longer matters to any buyer'], explanation: 'Athleisure and sports-inspired fashion show products increasingly serving both athletic and everyday purposes. Review Chapter 1.' },
  { chapter: '1', objective: 'Explain why scope matters', question: 'Why does industry scope definition matter before analysis?', application: 'Two analysts report very different market shares for the same retailer. What should you check first?', correct: 'It decides which competitors, benchmarks and growth rates belong in the analysis', wrong: ['It changes the retailer’s actual revenue', 'It determines the store rent payable', 'It sets the manufacturing lead time'], explanation: 'Scope decides the competitor set and the figures that are relevant, so two scopes produce two different shares. Review Chapter 1.' },
  { chapter: '2', objective: 'Connect segmentation to channels', question: 'What is the relationship between customer segmentation and channel selection?', application: 'A retailer picks channels before defining its target customer. What is the risk?', correct: 'They are closely connected: the channel should follow who buys and where they shop', wrong: ['They are independent decisions made separately', 'Channel choice determines the customer segment', 'Segmentation only matters for pricing'], explanation: 'Retailers must understand who purchases, what motivates them, and where they prefer to discover, evaluate and buy. Review Chapter 2.' },
  { chapter: '2', objective: 'Identify what owned stores control', question: 'What do brand-owned physical stores let a retailer control?', application: 'A brand wants full control of how its product is presented. Which channel delivers that?', correct: 'Product presentation, customer service and the overall shopping experience', wrong: ['The lowest possible cost to serve', 'Automatic national coverage', 'Freedom from inventory investment'], explanation: 'Brand-owned stores give control of presentation, service and the whole experience. Review Chapter 2.' },
  { chapter: '2', objective: 'Distinguish retail formats', question: 'How does specialty retail differ from multi-brand retail?', application: 'A store carries only footwear in great depth. How should it be classified?', correct: 'Specialty focuses on one category; multi-brand provides access to several labels', wrong: ['Specialty sells online only; multi-brand sells in store only', 'Specialty is always cheaper than multi-brand', 'They are two names for the same format'], explanation: 'Multi-brand retailers provide access to different labels, while specialty stores focus on a specific category. Review Chapter 2.' },
  { chapter: '2', objective: 'Identify digital channels', question: 'Which channels make up e-commerce and social commerce in this lesson?', application: 'A digital plan covers the brand website only. What else belongs in it?', correct: 'Brand websites, online marketplaces, social media and livestream shopping', wrong: ['Shopping malls and department stores', 'Factory outlets and wholesale depots', 'Print catalogues and mail order'], explanation: 'Brand websites, marketplaces, social media and livestream shopping expand accessibility and digital engagement. Review Chapter 2.' },
  { chapter: '2', objective: 'Explain omnichannel integration', question: 'What does omnichannel integration deliver to the customer?', application: 'A website shows stock the store cannot find. What has failed?', correct: 'Consistent product information, inventory visibility, purchase options and service', wrong: ['A lower retail price in every channel', 'Removal of the need for physical stores', 'Guaranteed next-day delivery everywhere'], explanation: 'Integrating stores and online platforms produces consistent information, stock visibility, buying options and service. Review Chapter 2.' },
]);

export const LESSON_1_1: FashionM1LessonBundle = {
  deck,
  quiz,
  takeaways: {
    learned: 'You can define Fashion, Sports & Lifestyle Retail, separate its three segments by purchase logic, and connect customer segments to the channels that serve them.',
    keyTakeaways: [
      'Three interconnected segments: Fashion, Sports and Lifestyle.',
      'Shared channels and customers do not mean shared purchase criteria.',
      'Athleisure shows the fashion–sports boundary becoming less distinct.',
      'Channel choice should follow the target customer, not channel fashion.',
      'Omnichannel is an operating requirement, visible wherever it fails.',
    ],
    businessImplications: 'Define the industry boundary before sizing anything: scope decides which competitors, margin benchmarks and growth rates are relevant, and a product can change segment without changing design.',
    remember: 'Segment by why the customer buys, then choose where to meet them.',
    nextLesson: 'Industry History & Development',
  },
};
