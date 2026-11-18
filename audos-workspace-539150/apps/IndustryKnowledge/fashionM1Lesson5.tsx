import { F1DeepDive, citeF1, f1Chapter, f1Quiz } from './fashionM1Core';
import type { FashionM1LessonBundle } from './fashionM1Core';

const LESSON = '5. Industry Drivers & External Factors';

const deck = [
  f1Chapter({
    title: 'Economic, Political, Social and Competitive Factors', chapterTitle: LESSON, readingTime: '7',
    objective: 'Map the four external force groups acting on retail demand and cost, and connect each one to a commercial consequence.',
    mateIntro: 'External forces hit this industry from two sides at once: they move what customers can spend, and they move what it costs to serve them. A plan that only models demand is half a plan.',
    keyInsight: 'Retailers must respond to both demand-side changes and external operating pressures. Decisions about pricing, assortment, sourcing and positioning should account for purchasing power, regulatory requirements and competitive intensity together.',
    statTiles: [
      { value: '4', label: 'External force groups', subtitle: 'Economic, political, social, competitive', description: 'Each lands in a different line of the P&L.' },
      { value: 'Gen Z', label: 'Plus Millennials', subtitle: 'Identity, trends, health, convenience', description: 'Preferences differ by individual; price sensitivity still applies.' },
      { value: '6', label: 'Competing sources of supply', subtitle: 'From global brands to counterfeits', description: 'Promotional intensity caps the realised price.' },
    ],
    statsNote: 'Counts describe the external-factor framework used in this lesson, not measured market data.',
    narrative: [
      { label: 'What it is', text: 'Fashion, Sports & Lifestyle Retail is influenced by macroeconomic conditions, public policy, social trends and competitive behaviour. These factors affect consumer demand, operating costs, sourcing decisions, product availability and the ability to sustain profitable growth.' },
      { label: 'Why it is happening', text: 'Disposable income, inflation, exchange rates, rental costs and logistics expenses move consumer spending and retailer margin at the same time. Higher operating costs squeeze profitability whenever price increases cannot be passed through to customers.' },
      { label: 'Real-world example', text: 'Trade policies, tariffs, rules of origin, consumer protection, intellectual property, advertising requirements and e-commerce regulation all affect sourcing, distribution and market entry. Gen Z and Millennials may weight personal identity, social media trends, convenience, health, fitness and brand image, though preferences differ across individuals.' },
      { label: 'Vietnam example', text: 'Increasing interest in physical activity and versatile clothing supports sportswear, athleisure and multi-occasion products. International brands, domestic labels, fast-fashion retailers, unbranded products, counterfeit goods and frequent promotional campaigns all compete for the same consumer spending.' },
      { label: 'Business impact', text: 'Retailers must balance revenue growth, competitive pricing, product differentiation, discounting and profitability. Promotional intensity in this industry means the realised price, not the ticket price, determines whether a season worked.' },
    ],
    visualKind: 'fashion-m1-51-forces', visualHeading: 'Four external forces on retail performance',
    visualIntro: 'Trace each force from what it moves in the market to where it lands commercially.',
    imageAlt: 'Casemate table of economic, political, social and competitive forces on fashion retail',
    keyTerms: [
      { term: 'Rules of origin', definition: 'Trade rules determining a product’s country of origin, which affects tariffs and preferential market access.' },
      { term: 'Realised price', definition: 'The price actually achieved after discounts and promotions, as distinct from the ticket price.' },
      { term: 'Price pass-through', definition: 'The share of a cost increase a retailer can recover through higher retail prices without losing volume.' },
      { term: 'Competitive intensity', definition: 'How hard rivals compete for the same spending, expressed here through promotional depth and frequency.' },
    ],
    recap: [
      'Income, inflation, exchange rates, rent and logistics move both demand and margin.',
      'Trade, IP, advertising and e-commerce rules shape sourcing and market entry.',
      'Gen Z and Millennial preferences matter, but price sensitivity remains relevant.',
      'Global brands, local labels, fast fashion, unbranded and counterfeit goods all compete.',
    ],
    chapterRecap: 'Economic conditions, regulation, social preferences and competition shape both consumer demand and retail performance, and belong in pricing, sourcing, positioning and risk decisions.',
    deepDiveTitle: 'When cost rises and price cannot follow',
    body: <F1DeepDive paragraphs={[
      'The hardest commercial situation in this industry is a simultaneous squeeze: rent, freight and wages rise while competitive promotion prevents a price increase. Margin absorbs the whole gap. This is why cost structure and competitive intensity have to be assessed together rather than in separate sections of a plan.',
      'Counterfeit and unbranded goods play a particular role here. They do not just take volume; they anchor what a segment of consumers believes the product should cost. A brand competing in that space is arguing against a reference price it did not set, which is a positioning problem rather than a pricing one.',
    ]} evidence="The research material describes these factors qualitatively and does not supply measured elasticities, tariff rates or counterfeit share figures, so none are stated." />,
    sources: citeF1('worldBankVietnam', 'wtoTextiles', 'unctadTrade'),
  }),
  f1Chapter({
    title: 'Technology, Environmental Pressures and Strategic Responses', chapterTitle: LESSON, readingTime: '7',
    objective: 'Assess how digital tools and sustainability expectations change retail strategy, and identify what each initiative needs before it creates value.',
    mateIntro: 'Technology and sustainability are both presented as automatic wins. Neither is. Each needs investment, skills, data and measurement before it changes a number you care about.',
    keyInsight: 'Technology and sustainability can support differentiation and operational improvement, but their business value depends on implementation quality, investment cost, reliable data and measurable outcomes.',
    statTiles: [
      { value: 'AI', label: 'Forecasting and allocation', subtitle: 'Sales history, preference, seasonality', description: 'Value only lands when the output reaches a decision.' },
      { value: '4R', label: 'Circular retail levers', subtitle: 'Repair, resale, reuse, take-back', description: 'Viability depends on collection, cost and participation.' },
      { value: '4', label: 'Implementation constraints', subtitle: 'Investment, skills, suppliers, measurement', description: 'The common reason initiatives stall after launch.' },
    ],
    statsNote: 'Counts describe the framework used in this lesson; the research material supplies no measured return figures for these initiatives.',
    narrative: [
      { label: 'What it is', text: 'Technological development and growing environmental expectations are changing how products are designed, marketed, sold and managed across their life cycles. Digital tools support commercial decision-making, while sustainability concerns push retailers to review materials, sourcing practices and product disposal.' },
      { label: 'Why it is happening', text: 'AI can analyse sales histories, customer preferences and seasonal patterns to support demand forecasting, assortment planning and inventory allocation. Customer data supports personalised recommendations, audience segmentation and campaign evaluation, with privacy, consent and appropriate handling remaining important.' },
      { label: 'Real-world example', text: 'Digital payment systems, livestream shopping and social commerce create additional sales opportunities and shorten the path from discovery to purchase. Integrating store inventory, online orders, customer information and fulfilment improves availability and convenience.' },
      { label: 'Vietnam example', text: 'Pressure to reduce fashion waste, improve material selection, increase recycling and extend product life encourages companies to examine environmental impacts. Better supplier information and traceability help monitor sourcing practices, and repair, resale, reuse and take-back initiatives may extend product life cycles.' },
      { label: 'Business impact', text: 'Advanced technology and sustainability initiatives may require substantial investment, specialised skills, supplier coordination and reliable performance measurement. Circular models in particular depend on collection systems, operating costs and customer participation to be commercially viable.' },
    ],
    visualKind: 'fashion-m1-52-tech', visualHeading: 'Technology and sustainability: value depends on delivery',
    visualIntro: 'Set each opportunity against the condition it must satisfy before it produces real value.',
    imageAlt: 'Casemate table pairing retail technology and sustainability initiatives with their preconditions',
    keyTerms: [
      { term: 'Demand forecasting', definition: 'Estimating future demand from sales history, customer preference and seasonality to guide buying and allocation.' },
      { term: 'Supply chain transparency', definition: 'Supplier information and traceability that let a retailer monitor sourcing practices and communicate product information.' },
      { term: 'Circular retail model', definition: 'Repair, resale, reuse and take-back programmes that extend product life cycles rather than ending at the first sale.' },
      { term: 'Measurable outcome', definition: 'A defined, trackable result used to judge whether a technology or sustainability initiative actually delivered.' },
    ],
    recap: [
      'AI supports forecasting, assortment planning and inventory allocation.',
      'Personalisation depends on consent, privacy and appropriate data handling.',
      'Sustainability pressure targets waste, materials, recycling and product life.',
      'Circular models need collection systems, acceptable cost and customer participation.',
    ],
    chapterRecap: 'Retailers can use digital tools to improve engagement and efficiency while pursuing credible sustainability initiatives supported by measurable results.',
    deepDiveTitle: 'Judging an initiative before it is funded',
    body: <F1DeepDive paragraphs={[
      'A useful test for any initiative in this chapter is to name the decision it will change. Demand forecasting changes how much is bought and where it is allocated. Traceability changes which suppliers are retained. Resale changes what happens to returned and end-of-life stock. If no decision changes, the initiative is reporting, not capability.',
      'Sustainability claims face the sharper version of this test, because they are now scrutinised externally. A material or recycling statement that cannot be evidenced is a reputational liability rather than a differentiator, which is why measurement has to be designed in at the start rather than assembled afterwards.',
    ]} evidence="The research material stresses that value depends on implementation quality, investment cost, reliable data and measurable outcomes, and supplies no return-on-investment figures." />,
    sources: citeF1('emfFashion', 'iloGarment', 'bofStateOfFashion'),
  }),
];

const quiz = f1Quiz('fashion-m1-l5', [
  { chapter: '1', objective: 'Identify economic factors', question: 'Which economic factors influence both consumer spending and retailer margin?', application: 'Rent and freight rise while demand softens. Which factor group is at work?', correct: 'Disposable income, inflation, exchange rates, rental costs and logistics expenses', wrong: ['Only advertising spend and media rates', 'Only store opening hours and staffing rotas', 'Only packaging design and labelling'], explanation: 'These economic factors move consumer spending and retailer margins together. Review Chapter 1.' },
  { chapter: '1', objective: 'Identify political and legal factors', question: 'Which regulatory areas affect sourcing, distribution and market entry?', application: 'A compliance review covers advertising only. What else applies?', correct: 'Trade policy, tariffs, rules of origin, IP, consumer protection and e-commerce rules', wrong: ['Only employment contracts and payroll', 'Only building permits and fire safety', 'Only corporate income tax filing'], explanation: 'Trade, tariffs, origin rules, IP, consumer protection, advertising and e-commerce rules all apply. Review Chapter 1.' },
  { chapter: '1', objective: 'Read social factors carefully', question: 'What caveat applies to Gen Z and Millennial preferences?', application: 'A plan assumes every young consumer is price-insensitive. What is the correction?', correct: 'Preferences differ across individuals and price sensitivity remains relevant', wrong: ['All young consumers behave identically', 'Price never affects these segments', 'Brand image is irrelevant to them'], explanation: 'Preferences differ across individuals, and price sensitivity remains relevant. Review Chapter 1.' },
  { chapter: '1', objective: 'Identify competitive sources', question: 'Which sources of supply compete for the same consumer spending?', application: 'A competitor set lists international brands only. What is missing?', correct: 'Domestic labels, fast fashion, unbranded products and counterfeit goods as well', wrong: ['Only other international brands', 'Only wholesale distributors', 'Only overseas export buyers'], explanation: 'International brands, domestic labels, fast fashion, unbranded and counterfeit goods all compete. Review Chapter 1.' },
  { chapter: '1', objective: 'Explain the margin squeeze', question: 'What happens when operating costs rise but prices cannot be increased?', application: 'Freight and rent rise while promotion prevents a price increase. What absorbs the gap?', correct: 'Profitability comes under pressure because the cost cannot be passed on', wrong: ['Consumer demand automatically rises', 'Suppliers absorb the full increase', 'Regulation caps the operating cost'], explanation: 'Higher operating costs pressure profitability when price increases cannot be passed to customers. Review Chapter 1.' },
  { chapter: '2', objective: 'Identify AI applications', question: 'What can AI support in fashion and sports retail?', application: 'A retailer wants better buying accuracy. Which capability applies?', correct: 'Demand forecasting, assortment planning and inventory allocation', wrong: ['Automatic store lease negotiation', 'Guaranteed removal of all markdown', 'Elimination of supplier lead times'], explanation: 'AI can analyse sales history, preference and seasonality to support forecasting, planning and allocation. Review Chapter 2.' },
  { chapter: '2', objective: 'Identify personalisation constraints', question: 'What remains an important consideration when using customer data?', application: 'A personalisation programme launches without a consent review. What was skipped?', correct: 'Data privacy, consent and appropriate data handling', wrong: ['The colour of the recommendation widget', 'The number of products in the catalogue', 'The size of the marketing team'], explanation: 'Privacy, consent and appropriate data handling remain important considerations. Review Chapter 2.' },
  { chapter: '2', objective: 'Identify sustainability pressures', question: 'What does environmental pressure encourage retailers to examine?', application: 'An ESG review covers packaging only. What else belongs in scope?', correct: 'Fashion waste, material selection, recycling and product life cycles', wrong: ['Only store lighting and signage', 'Only staff uniform design', 'Only advertising frequency'], explanation: 'Pressure targets waste reduction, material selection, recycling and extended product life. Review Chapter 2.' },
  { chapter: '2', objective: 'Assess circular models', question: 'What determines whether circular retail models are commercially viable?', application: 'A resale programme launches and loses money. What should be examined?', correct: 'Collection systems, operating costs and customer participation', wrong: ['The number of press releases issued', 'The size of the sustainability team', 'The age of the brand'], explanation: 'Repair, resale, reuse and take-back viability depends on collection, cost and participation. Review Chapter 2.' },
  { chapter: '2', objective: 'Evaluate initiatives critically', question: 'What do advanced technology and sustainability initiatives typically require?', application: 'A board approves a programme without defining how success is measured. What is missing?', correct: 'Substantial investment, specialised skills, supplier coordination and reliable measurement', wrong: ['Only a vendor contract', 'Only a public commitment', 'Only a new reporting dashboard'], explanation: 'These initiatives require investment, skills, supplier coordination and reliable performance measurement. Review Chapter 2.' },
]);

export const LESSON_1_5: FashionM1LessonBundle = {
  deck,
  quiz,
  takeaways: {
    learned: 'You can map the economic, political, social and competitive forces acting on retail performance, and judge technology and sustainability initiatives on their preconditions rather than their promise.',
    keyTakeaways: [
      'External forces move demand and operating cost at the same time.',
      'Trade, IP, advertising and e-commerce rules shape sourcing and entry.',
      'Promotional intensity means realised price, not ticket price, decides the season.',
      'AI value lands only when its output reaches a real decision.',
      'Circular models need collection, cost control and customer participation.',
    ],
    businessImplications: 'Assess cost structure and competitive intensity together: when rent, freight and wages rise while promotion blocks a price increase, margin absorbs the entire gap.',
    remember: 'For any initiative, name the decision it will change — or it is reporting, not capability.',
    nextLesson: 'Value Chain Overview (Module 02)',
  },
};
