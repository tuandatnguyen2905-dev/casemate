import { F2DeepDive, citeF2, f2Chapter, f2Quiz } from './fashionM2Core';
import type { FashionM2LessonBundle } from './fashionM2Core';

const LESSON = '4. Downstream Activities';

const deck = [
  f2Chapter({
    title: 'Distribution Channels and Retail Formats', chapterTitle: LESSON, readingTime: '7',
    objective: 'Compare the channels a brand can use to reach consumers and explain what each one gives up in exchange for reach.',
    mateIntro: 'Every channel in this industry sells you one of two things: reach or control. You can buy either, you can pay for both, but you cannot get both for free.',
    keyInsight: 'Downstream competitiveness depends on selecting and coordinating channels that fit the target customer, product category, price positioning, and expected shopping experience. Wider distribution can increase reach, while more direct channels may provide greater control over pricing, presentation, and customer relationships.',
    statTiles: [
      { value: '5', label: 'Channel types', subtitle: 'Wholesale to social commerce', description: 'Each reaches a different customer in a different way.' },
      { value: 'Reach', label: 'What wholesale buys', subtitle: 'Control is what it costs', description: 'Price, presentation and customer data pass to the partner.' },
      { value: 'Data', label: 'What direct channels keep', description: 'Owned channels retain the customer relationship and first-party information.' },
    ],
    statsNote: 'Counts describe the channel framework used in this lesson, not measured channel shares or margins.',
    narrative: [
      { label: 'What it is', text: 'Downstream activities connect finished products with end consumers through distribution, merchandising, retail sales, marketing and order fulfilment. Companies may sell directly to customers, work with distributors and wholesale partners, or combine multiple channels to reach different market segments.' },
      { label: 'Why it is happening', text: 'Channel decisions affect market coverage, distribution costs, customer access, control over brand presentation and the availability of consumer data. Those four consequences move in different directions, which is why no single channel is correct for a whole portfolio.' },
      { label: 'Real-world example', text: 'Wholesale distribution sells to distributors, department stores and specialty retailers that subsequently sell to consumers. Brand-owned retail allows control of merchandising, store design, customer service and brand experience. Multi-brand retail lets consumers compare products across price points and categories, which helps discovery but places a brand directly beside its substitutes.' },
      { label: 'Vietnam example', text: 'In Vietnam, brand websites and malls sit alongside marketplaces and a notably active social commerce layer, where creator content and livestreaming connect discovery and purchase in the same session. A brand that treats social commerce as marketing rather than a distribution channel tends to under-resource the inventory and service behind it.' },
      { label: 'Business impact', text: 'E-commerce supports digital discovery, comparison, ordering and payment through brand sites and marketplaces, while social commerce integrates purchasing into content. Each added channel widens coverage and adds coordination complexity, so the mix has to be chosen against the target customer and price position rather than assembled by default.' },
    ],
    visualKind: 'fashion-m2-41-channels', visualHeading: 'Reach on one side, control on the other',
    visualIntro: 'Compare how each channel reaches the customer with what the retailer gives up to use it.',
    imageAlt: 'Casemate table comparing wholesale, brand-owned, multi-brand, e-commerce and social commerce channels',
    keyTerms: [
      { term: 'Wholesale distribution', definition: 'Selling to distributors, department stores or specialty retailers that then sell on to consumers.' },
      { term: 'Direct-to-consumer', definition: 'Selling through a brand’s own stores or website rather than through a retail partner.' },
      { term: 'Channel conflict', definition: 'Tension created when a brand’s own channel competes on price or availability with its retail partners.' },
      { term: 'First-party data', definition: 'Customer information a company collects from its own channels, rather than buying or inferring it.' },
    ],
    recap: [
      'Wholesale buys coverage and gives up price, presentation and customer data.',
      'Brand-owned retail buys control and takes on rent, staffing and inventory.',
      'Multi-brand retail aids comparison but places a brand beside its substitutes.',
      'E-commerce and social commerce extend reach and add coordination complexity.',
    ],
    chapterRecap: 'Distribution and retail operations determine how effectively finished products reach consumers. A well-designed channel strategy balances market coverage, brand control, operational cost and the ability to engage the intended customer segments.',
    deepDiveTitle: 'Why the channel mix is a portfolio decision',
    body: <F2DeepDive paragraphs={[
      'The same brand can legitimately want opposite things from different parts of its range. A core replenishment line benefits from the widest possible distribution, because availability is most of the purchase decision and the product does not need explaining. A technical or premium line usually does not, because it needs demonstration, fit advice and a controlled price, all of which erode in a marketplace listing beside a discounted substitute.',
      'This is also where channel conflict starts. A brand that sells the same style directly at full price and through a partner that discounts it has not expanded distribution so much as created an internal competitor. The resolution is usually assortment architecture rather than price policing: different products, exclusivities or pack sizes per channel, so the channels are not bidding against each other for the same unit.',
    ]} evidence="The research material describes the channels and their trade-offs qualitatively and supplies no verified channel-share or channel-margin percentages, so none are presented here." />,
    sources: citeF2('deloitteRetail', 'moitTrade', 'vietnamBriefing'),
  }),
  f2Chapter({
    title: 'Merchandising, Customer Acquisition and Channel Economics', chapterTitle: LESSON, readingTime: '7',
    objective: 'Explain how assortment, promotion, marketing and fulfilment costs combine to decide whether a channel is actually profitable.',
    mateIntro: 'An order is not a profit. Strip out the commission, the shipping, the acquisition cost and the one that comes back, and some perfectly busy channels turn out to be losing money per basket.',
    keyInsight: 'Channel profitability is decided after commissions, retailer margins, rent, fulfilment costs, customer acquisition expenses and return rates — not at the point the order is placed. Merchandising and promotional decisions then determine the realised price that this economics is calculated on.',
    statTiles: [
      { value: '6', label: 'Economic levers', subtitle: 'Assortment to return rate', description: 'Each one moves contribution rather than headline revenue.' },
      { value: 'Realised', label: 'The price that counts', subtitle: 'Not the ticket price', description: 'Promotional depth decides what the business actually collects.' },
      { value: 'Per basket', label: 'How to judge a channel', description: 'Contribution after commission, fulfilment, acquisition and returns.' },
    ],
    statsNote: 'Counts describe the channel economics framework used in this lesson; the research material supplies no measured commission, acquisition cost or return-rate figures.',
    narrative: [
      { label: 'What it is', text: 'Merchandising and assortment planning determine product range, sizes, colours, price points, seasonal allocations and promotional priorities. Marketing and customer acquisition — advertising, public relations, influencer partnerships, loyalty programmes and promotional campaigns — then create awareness and stimulate purchase.' },
      { label: 'Why it is happening', text: 'These two sets of decisions set the revenue line, but they also set the cost line. A broader range raises the chance of serving a customer and raises the stock that may not sell; a deeper promotion raises conversion and lowers the price actually collected on every unit, including the ones that would have sold anyway.' },
      { label: 'Real-world example', text: 'Companies evaluate commissions, retailer margins, rent, fulfilment costs, customer acquisition expenses and return rates when assessing channel profitability. The same product can therefore be profitable in one channel and loss-making in another without its cost of goods changing at all.' },
      { label: 'Vietnam example', text: 'In a market where promotional campaigns are frequent and marketplace competition is dense, the gap between ticket price and realised price can be the decisive number in a Vietnamese retailer’s plan. A margin calculated on list price, before campaign discounting and platform commission, will systematically overstate what the season delivers.' },
      { label: 'Business impact', text: 'Judging a channel on revenue or order volume hides the cost of serving it. The defensible measure is contribution per basket after partner margin, fulfilment, acquisition cost and returns, which is the only view that explains why a growing channel can reduce total profit.' },
    ],
    visualKind: 'fashion-m2-42-economics', visualHeading: 'What decides whether a channel actually pays',
    visualIntro: 'Trace each commercial lever from what it controls to where it lands in the P&L.',
    imageAlt: 'Casemate table linking merchandising and acquisition levers to their effect on retail profitability',
    keyTerms: [
      { term: 'Assortment planning', definition: 'Deciding range, sizes, colours, price points and seasonal allocation for a channel or store group.' },
      { term: 'Realised price', definition: 'The price actually collected after discounts and promotions, as distinct from the ticket price.' },
      { term: 'Customer acquisition cost', definition: 'The marketing spend required to win one order or one new customer in a given channel.' },
      { term: 'Contribution per basket', definition: 'What a typical order leaves behind after partner margin, fulfilment, acquisition cost and returns.' },
    ],
    recap: [
      'Assortment decisions set both the chance of a sale and the risk of residual stock.',
      'Promotional depth decides realised price, which is what margin is actually earned on.',
      'Channel economics include commission, rent, fulfilment, acquisition and returns.',
      'A growing channel can still reduce total profit if its contribution is negative.',
    ],
    chapterRecap: 'Merchandising, marketing and channel economics decide whether distribution converts into profit. Assessing commissions, fulfilment, acquisition cost and returns together shows which channels genuinely contribute and which only add volume.',
    deepDiveTitle: 'The order that costs money to win',
    body: <F2DeepDive paragraphs={[
      'Take a low-value basket sold through a marketplace with free delivery and free returns. The platform takes a commission, the outbound parcel has a cost, a share of those orders come back and consume a second carriage leg plus handling, and the traffic that produced the order was partly paid for. On a product with a normal retail margin, those four deductions can exceed the gross profit. The business is busy and the channel is growing, and each additional order makes the position slightly worse.',
      'The practical response is not usually to abandon the channel but to change what is sold through it: a higher minimum basket, less return-prone categories, better size guidance to cut the wrong-size return, or a delivery charge below a threshold. Each of those is a merchandising decision rather than a pricing one, which is why assortment and channel economics have to be planned in the same room.',
    ]} evidence="The research material lists the cost elements of channel economics qualitatively and supplies no measured commission rates, acquisition costs or return rates, so the example above is illustrative rather than a quoted figure." />,
    sources: citeF2('deloitteRetail', 'bofStateOfFashion', 'gsoRetail'),
  }),
];

const quiz = f2Quiz('fashion-m2-l4', [
  { chapter: '1', objective: 'Define downstream activities', question: 'What do downstream activities connect?', application: 'A plan ends when stock leaves the warehouse. What is it missing?', correct: 'Finished products with end consumers through distribution, merchandising, sales, marketing and fulfilment', wrong: ['Raw materials with manufacturing facilities', 'Designers with material suppliers', 'Factories with freight forwarders only'], explanation: 'Downstream activities connect finished products with consumers through distribution, merchandising, retail sales, marketing and order fulfilment. Review Chapter 1.' },
  { chapter: '1', objective: 'Identify what channel choice affects', question: 'What do channel decisions affect?', application: 'A brand adds a marketplace and loses sight of its customers. What did it trade?', correct: 'Market coverage, distribution cost, customer access, brand control and data availability', wrong: ['Only the cost of goods sold', 'Only the factory lead time', 'Only the packaging specification'], explanation: 'Channel decisions affect coverage, distribution costs, customer access, control over presentation and availability of consumer data. Review Chapter 1.' },
  { chapter: '1', objective: 'Characterise wholesale', question: 'How does wholesale distribution reach consumers?', application: 'A brand sells to department stores. How does the product reach the shopper?', correct: 'Through distributors and retailers that subsequently sell to consumers', wrong: ['Directly from the brand’s own stores', 'Only through the brand’s own website', 'Only through creator livestreams'], explanation: 'Brands sell to distributors, department stores and specialty retailers that subsequently sell to consumers. Review Chapter 1.' },
  { chapter: '1', objective: 'Compare reach and control', question: 'What is the trade-off between wider distribution and direct channels?', application: 'A brand wants control of price and presentation. Which route delivers it?', correct: 'Wider distribution increases reach; direct channels increase control over pricing, presentation and relationships', wrong: ['Wider distribution increases control over pricing', 'Direct channels always reach more customers', 'Both options deliver identical control and reach'], explanation: 'Wider distribution can increase reach, while more direct channels may provide greater control over pricing, presentation and customer relationships. Review Chapter 1.' },
  { chapter: '1', objective: 'Describe social commerce', question: 'What does social commerce combine?', application: 'A shopper watches a livestream and buys without leaving the app. What is that?', correct: 'Social content, creator recommendations and livestreaming with integrated purchasing', wrong: ['Wholesale ordering with trade credit terms', 'In-store signage with print catalogues', 'Factory outlets with clearance pricing'], explanation: 'Social commerce connects content, creator recommendations and livestreaming with integrated purchasing functions. Review Chapter 1.' },
  { chapter: '2', objective: 'Identify merchandising decisions', question: 'What does merchandising and assortment planning determine?', application: 'A buyer must set the range for a new season. Which decisions apply?', correct: 'Product range, sizes, colours, price points, seasonal allocations and promotional priorities', wrong: ['Factory machinery and labour schedules', 'Freight mode and port of departure', 'Supplier payment terms and credit limits'], explanation: 'Retailers determine product range, sizes, colours, price points, seasonal allocations and promotional priorities. Review Chapter 2.' },
  { chapter: '2', objective: 'Identify channel cost elements', question: 'Which costs are weighed when assessing channel profitability?', application: 'A channel grows fast but total profit falls. What should be examined?', correct: 'Commissions, retailer margins, rent, fulfilment costs, acquisition expenses and return rates', wrong: ['Only the cost of goods sold', 'Only the cost of store fixtures', 'Only the cost of product photography'], explanation: 'Companies evaluate commissions, retailer margins, rent, fulfilment, acquisition expense and return rates when assessing channel profitability. Review Chapter 2.' },
  { chapter: '2', objective: 'Apply realised price', question: 'Why is realised price more useful than ticket price?', application: 'A margin is calculated on list price before campaign discounts. What is the error?', correct: 'It reflects what the business actually collects after discounts and promotions', wrong: ['It is always higher than the ticket price', 'It excludes the cost of goods sold', 'It applies only to wholesale orders'], explanation: 'Promotional depth decides the realised price, which is what margin is actually earned on. Review Chapter 2.' },
  { chapter: '2', objective: 'Identify acquisition levers', question: 'Which activities support customer acquisition?', application: 'A brand needs awareness for a new range. Which levers apply?', correct: 'Advertising, public relations, influencer partnerships, loyalty programmes and promotional campaigns', wrong: ['Supplier audits and factory certification', 'Warehouse racking and barcode scanning', 'Customs documentation and duty filing'], explanation: 'Advertising, PR, influencer partnerships, loyalty programmes and promotional campaigns create awareness and stimulate purchase. Review Chapter 2.' },
  { chapter: '2', objective: 'Judge a channel correctly', question: 'How should a channel be judged commercially?', application: 'A channel reports record order volume. What does that not tell you?', correct: 'On contribution per basket after partner margin, fulfilment, acquisition cost and returns', wrong: ['On total order volume alone', 'On the number of products listed', 'On the size of its social following'], explanation: 'Judging a channel on revenue or order volume hides the cost of serving it; contribution after all channel costs is the defensible measure. Review Chapter 2.' },
]);

export const LESSON_2_4: FashionM2LessonBundle = {
  deck,
  quiz,
  takeaways: {
    learned: 'You can compare the channels available to a fashion, sports and lifestyle business and judge each one on contribution rather than on reach or order volume.',
    keyTakeaways: [
      'Every channel sells either reach or control; paying for both is a deliberate investment.',
      'Multi-brand retail aids comparison and places a brand beside its substitutes.',
      'Assortment decisions set both the chance of a sale and the residual stock risk.',
      'Promotional depth, not the ticket price, decides the margin actually earned.',
      'A growing channel can reduce total profit when contribution per basket is negative.',
    ],
    businessImplications: 'Plan assortment and channel economics together: the usual fix for an unprofitable channel is changing what is sold through it — basket size, category mix, size guidance — rather than repricing the whole range.',
    remember: 'An order is not a profit until commission, fulfilment, acquisition and returns are taken out.',
    nextLesson: 'Customer Experience & After-Sales',
  },
};
