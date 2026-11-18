import { F2DeepDive, citeF2, f2Chapter, f2Quiz } from './fashionM2Core';
import type { FashionM2LessonBundle } from './fashionM2Core';

const LESSON = '5. Customer Experience & After-Sales';

const deck = [
  f2Chapter({
    title: 'Omnichannel Retail, Personalisation and Order Fulfilment', chapterTitle: LESSON, readingTime: '7',
    objective: 'Explain what omnichannel retail requires operationally and why consistency across touchpoints is a delivery problem rather than a marketing one.',
    mateIntro: 'Customers do not shop in channels; they shop in one journey that happens to cross several screens and a shop floor. The retailer’s job is to make sure the journey does not notice the joins.',
    keyInsight: 'As consumers move between stores, websites, marketplaces and social platforms, consistency across these interactions becomes increasingly important. Omnichannel integration is an operating requirement, and it only becomes visible to the customer at the point where it fails.',
    statTiles: [
      { value: '4', label: 'Capabilities to integrate', subtitle: 'Journey, personalisation, fulfilment, product data', description: 'Each depends on shared information rather than on more channels.' },
      { value: '1', label: 'Journey to design for', description: 'Browse, inspect, buy, collect or deliver — one continuous experience.' },
      { value: 'Consent', label: 'The limit on personalisation', description: 'Customer data requires privacy, consent and appropriate handling.' },
    ],
    statsNote: 'Counts describe the customer experience framework used in this lesson, not measured conversion or satisfaction figures.',
    narrative: [
      { label: 'What it is', text: 'Customer-facing value creation continues beyond the initial transaction. Retailers manage product information, purchasing convenience, delivery, customer support, exchanges, returns and loyalty-building activities across physical and digital touchpoints.' },
      { label: 'Why it is happening', text: 'Customers may browse online, inspect products in stores, purchase through an app, and then choose home delivery or store collection, depending on retailer capabilities. Because the customer treats these as one decision, any inconsistency in price, stock or product information reads as a failure rather than as a channel difference.' },
      { label: 'Real-world example', text: 'Personalised shopping uses customer data and recommendation tools to present relevant products, sizes, promotions and styling suggestions. Order fulfilment then coordinates order confirmation, inventory availability, picking, packing, shipping and delivery notifications — the operational chain that decides whether the promise made at checkout is kept.' },
      { label: 'Vietnam example', text: 'With a dense mix of brand sites, marketplaces and social commerce in Vietnam, the same product is frequently visible to one shopper at several prices on the same day. Keeping price, stock and product information consistent across those surfaces is therefore less a presentation question than a data-governance one.' },
      { label: 'Business impact', text: 'Fit for purpose personalisation improves relevance, but it depends on data quality, consent and appropriate handling. Where inventory records are inaccurate or product data differs between surfaces, personalisation simply recommends things the business cannot reliably supply, which damages trust faster than no recommendation at all.' },
    ],
    visualKind: 'fashion-m2-51-omnichannel', visualHeading: 'One journey, however the customer enters it',
    visualIntro: 'Set what the customer experiences against what has to be true behind the scenes for it to work.',
    imageAlt: 'Casemate table of omnichannel journey, personalisation, fulfilment and product information requirements',
    keyTerms: [
      { term: 'Omnichannel integration', definition: 'Connecting stores and digital platforms so product information, inventory, purchase options and service stay consistent.' },
      { term: 'Click and collect', definition: 'Buying through a digital channel and collecting the order from a physical store.' },
      { term: 'Single source of truth', definition: 'One authoritative record for product, price or stock data that every channel reads from.' },
      { term: 'Order management system', definition: 'The system that routes an order to the right stock location and tracks it through to delivery.' },
    ],
    recap: [
      'The customer experiences one journey, not a set of separate channels.',
      'Omnichannel depends on a shared view of stock, price and the order.',
      'Personalisation requires consent, privacy and appropriate data handling.',
      'Inaccurate inventory turns a recommendation engine into a broken promise.',
    ],
    chapterRecap: 'Omnichannel retail extends value creation beyond the transaction. Consistent product information, reliable fulfilment and appropriate use of customer data are what make a multi-touchpoint journey feel like a single experience.',
    deepDiveTitle: 'Where integration is actually visible',
    body: <F2DeepDive paragraphs={[
      'Customers never see an integration working; they only see it failing. A website showing stock the store cannot find, an app price the till will not honour, a collection order that nobody picked — each of these is a single data problem experienced as a service failure. That asymmetry is why omnichannel spending is hard to justify on uplift and easy to justify on avoided failure.',
      'It also changes where the work sits. The customer-facing fix is usually trivial once the underlying record is right, and impossible while it is wrong. Teams that start with the interface and leave inventory accuracy, product data and order routing for later end up with a convincing journey that cannot be honoured in the warehouse.',
    ]} evidence="The research material describes omnichannel capabilities and their requirements qualitatively, and supplies no measured conversion, satisfaction or fulfilment-accuracy figures, so none are claimed here." />,
    sources: citeF2('deloitteRetail', 'bofStateOfFashion', 'moitTrade'),
  }),
  f2Chapter({
    title: 'Returns, After-Sales Service and Loyalty', chapterTitle: LESSON, readingTime: '7',
    objective: 'Assess returns, support, loyalty and customer feedback as both a cost to manage and a source of competitive differentiation.',
    mateIntro: 'Two jackets at the same price and the same specification compete on something, and it is usually what happens after the box is opened.',
    keyInsight: 'Customer experience is an important source of differentiation because products with similar prices or features may compete on convenience, service reliability, trust, and emotional connection with the brand. Effective post-purchase support can also strengthen repeat purchasing and customer retention.',
    statTiles: [
      { value: '5', label: 'Post-purchase services', subtitle: 'Returns to CRM', description: 'Each one carries both a cost and a retention effect.' },
      { value: 'Two-sided', label: 'The returns problem', description: 'Easy returns reduce friction; high return rates create real logistics cost.' },
      { value: 'Feedback', label: 'The free research channel', description: 'Reviews, complaints and return reasons feed the next product decision.' },
    ],
    statsNote: 'Counts describe the after-sales framework used in this lesson; the research material supplies no measured return rates or retention figures.',
    narrative: [
      { label: 'What it is', text: 'Clear return procedures and efficient processing can reduce customer friction, although high return rates can create substantial logistics and inventory costs. After-sales support may assist with sizing, product care, warranty claims, repairs, footwear issues or other product-related enquiries.' },
      { label: 'Why it is happening', text: 'In categories where fit and feel cannot be judged on a screen, a proportion of returns is structural rather than a service failure. The commercial question is therefore not how to eliminate returns but which returns are avoidable — the wrong size that better guidance would have prevented — and which are the cost of selling at distance.' },
      { label: 'Real-world example', text: 'Membership programmes, purchase histories, personalised communications and relevant rewards can encourage repeat purchases. Customer Relationship Management (CRM) systems help organise customer information and coordinate communications, while requiring appropriate data protection and access controls.' },
      { label: 'Vietnam example', text: 'Where much discovery happens through creators and livestreams, after-sales handling is also reputation management: a sizing problem resolved privately stays private, and one left unresolved appears in the comments under the next livestream. The service function and the acquisition function are closer together than the org chart suggests.' },
      { label: 'Business impact', text: 'Reviews, complaints, return reasons and service interactions provide information for improving product design, quality and retail operations. Coded consistently, return reasons are the cheapest product research a retailer has; left uncoded, they are only a cost line.' },
    ],
    visualKind: 'fashion-m2-52-aftersales', visualHeading: 'Where similar products separate',
    visualIntro: 'Read each post-purchase service against the commercial consequence it carries.',
    imageAlt: 'Casemate table of returns, after-sales support, loyalty, feedback and CRM in retail',
    keyTerms: [
      { term: 'Return rate', definition: 'The share of orders sent back, which drives both customer satisfaction and reverse logistics cost.' },
      { term: 'After-sales support', definition: 'Help with sizing, product care, warranty, repair and other post-purchase product issues.' },
      { term: 'Retention', definition: 'The proportion of customers who buy again, usually achieved at lower cost than new acquisition.' },
      { term: 'CRM', definition: 'Customer Relationship Management — systems organising customer records and coordinating communication under data protection controls.' },
    ],
    recap: [
      'Easy returns cut friction; high return rates create real logistics and inventory cost.',
      'After-sales covers sizing, care, warranty, repair and product enquiries.',
      'Loyalty programmes and purchase history support repeat purchase at lower cost.',
      'Return reasons and reviews are product research when they are coded consistently.',
    ],
    chapterRecap: 'Customer experience and after-sales services extend the value chain beyond product delivery. Retailers that provide reliable service and consistent cross-channel experiences can improve customer satisfaction, strengthen loyalty, and gain useful feedback for future product decisions.',
    deepDiveTitle: 'Treating returns as information, not only as cost',
    body: <F2DeepDive paragraphs={[
      'Every return arrives with a reason attached, and that reason is the most specific product feedback a retailer will ever receive: it names a style, a size, a colour and a failure. A retailer that records those reasons in a consistent, analysable form can see which size curve is wrong, which fabric disappoints against its photograph, and which description over-promises. One that records them as a single category called returns has paid the full cost and collected none of the information.',
      'The same argument applies to complaints and reviews. They are unsolicited, specific and free, and they arrive before the next buy is committed. The practical test for a service function is therefore whether anything it learns ever changes a product decision — if not, it is absorbing cost and generating goodwill but nothing cumulative.',
    ]} evidence="The research material describes after-sales services and their trade-offs qualitatively, and supplies no measured return rates, retention rates or service-cost figures, so none are claimed here." />,
    sources: citeF2('emfFashion', 'deloitteRetail', 'vietnamBriefing'),
  }),
];

const quiz = f2Quiz('fashion-m2-l5', [
  { chapter: '1', objective: 'Explain continued value creation', question: 'Where does customer-facing value creation continue after the transaction?', application: 'A retailer measures success at checkout only. What is it ignoring?', correct: 'Product information, convenience, delivery, support, exchanges, returns and loyalty activity', wrong: ['Only the advertising campaign that drove the sale', 'Only the factory production schedule', 'Only the supplier payment terms'], explanation: 'Retailers manage information, convenience, delivery, support, exchanges, returns and loyalty across physical and digital touchpoints. Review Chapter 1.' },
  { chapter: '1', objective: 'Describe the omnichannel journey', question: 'What does an omnichannel journey allow a customer to do?', application: 'A shopper browses online, tries in store and buys in the app. What is that?', correct: 'Browse online, inspect in store, purchase in an app and choose delivery or collection', wrong: ['Use one channel only for the whole purchase', 'Buy only in physical stores', 'Buy only through marketplaces'], explanation: 'Customers may browse online, inspect in store, purchase through an app, and choose delivery or store collection. Review Chapter 1.' },
  { chapter: '1', objective: 'Identify personalisation inputs', question: 'What does personalised shopping use to present relevant options?', application: 'A retailer wants to suggest the right size and styling. What does it need?', correct: 'Customer data and recommendation tools', wrong: ['Factory capacity reports', 'Freight booking schedules', 'Supplier compliance certificates'], explanation: 'Customer data and recommendation tools help present relevant products, sizes, promotions and styling suggestions. Review Chapter 1.' },
  { chapter: '1', objective: 'Describe order fulfilment', question: 'What does order fulfilment coordinate?', application: 'A customer is charged but never notified or shipped. What broke?', correct: 'Order confirmation, inventory availability, picking, packing, shipping and delivery notifications', wrong: ['Collection design and seasonal trend research', 'Material testing and sample approval', 'Store lease negotiation and fit-out'], explanation: 'Retailers coordinate confirmation, availability, picking, packing, shipping and delivery notifications. Review Chapter 1.' },
  { chapter: '1', objective: 'Locate the integration failure', question: 'When does omnichannel integration become visible to the customer?', application: 'The site shows stock the store cannot find. What has happened?', correct: 'At the point where it fails, such as inconsistent stock or price', wrong: ['Whenever it is working correctly', 'Only during promotional campaigns', 'Only in physical stores'], explanation: 'Consistency is the point of integration, and it only becomes visible to the customer at the moment it fails. Review Chapter 1.' },
  { chapter: '2', objective: 'Explain the returns trade-off', question: 'What is the trade-off in making returns easy?', application: 'A retailer removes all return friction and logistics cost climbs. Was that predictable?', correct: 'Lower customer friction, but high return rates create substantial logistics and inventory cost', wrong: ['Lower friction with no cost consequence', 'Higher friction and lower cost in every case', 'No effect on either friction or cost'], explanation: 'Clear procedures reduce friction, although high return rates create substantial logistics and inventory costs. Review Chapter 2.' },
  { chapter: '2', objective: 'Identify after-sales scope', question: 'What does after-sales support typically cover?', application: 'A customer needs help with a warranty claim and product care. Which function handles it?', correct: 'Sizing, product care, warranty claims, repairs and product-related enquiries', wrong: ['Supplier negotiation and purchase ordering', 'Warehouse racking and stock counting', 'Media buying and campaign planning'], explanation: 'After-sales support may assist with sizing, product care, warranty claims, repairs and other product enquiries. Review Chapter 2.' },
  { chapter: '2', objective: 'Explain loyalty mechanics', question: 'What encourages repeat purchase according to this lesson?', application: 'A retailer wants more second purchases. Which levers apply?', correct: 'Membership programmes, purchase histories, personalised communications and relevant rewards', wrong: ['Deeper discounting on every first order', 'Wider wholesale distribution', 'Longer factory lead times'], explanation: 'Membership programmes, purchase histories, personalised communications and relevant rewards encourage repeat purchases. Review Chapter 2.' },
  { chapter: '2', objective: 'Use customer feedback', question: 'What can reviews, complaints and return reasons improve?', application: 'A size curve keeps generating returns. What should that feedback change?', correct: 'Product design, quality and retail operations', wrong: ['Only the tone of marketing copy', 'Only the choice of freight provider', 'Only the store opening hours'], explanation: 'Reviews, complaints, return reasons and service interactions inform improvements to product design, quality and retail operations. Review Chapter 2.' },
  { chapter: '2', objective: 'Apply CRM responsibly', question: 'What does a CRM system require alongside organised customer records?', application: 'A team gives every employee full access to customer records. What is missing?', correct: 'Appropriate data protection and access controls', wrong: ['A larger marketing budget', 'More product photography', 'Longer warranty periods'], explanation: 'CRM systems help organise customer information while requiring appropriate data protection and access controls. Review Chapter 2.' },
]);

export const LESSON_2_5: FashionM2LessonBundle = {
  deck,
  quiz,
  takeaways: {
    learned: 'You can explain what omnichannel retail requires operationally, and assess returns, after-sales support and loyalty as both a cost to control and a source of differentiation.',
    keyTakeaways: [
      'The customer experiences one journey; channels are an internal distinction.',
      'Integration is only visible to the customer at the moment it fails.',
      'Personalisation depends on consent, privacy and data a business can supply against.',
      'Easy returns reduce friction while high return rates carry real cost.',
      'Coded return reasons are the cheapest product research available.',
    ],
    businessImplications: 'Fix the underlying record before the interface: inventory accuracy, product data and order routing determine whether a well-designed journey can actually be honoured in the warehouse.',
    remember: 'Similar products at similar prices separate on what happens after the box is opened.',
    nextLesson: 'Inputs, Outputs & Value Creation',
  },
};
