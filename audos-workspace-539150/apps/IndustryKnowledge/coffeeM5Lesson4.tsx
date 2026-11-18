import { C5DeepDive, citeC5, c5Chapter, c5Quiz } from './coffeeM5Core';
import type { CoffeeM5LessonBundle } from './coffeeM5Core';

const LESSON = '4. Regulatory & Sustainability Trends';

const deck = [
  c5Chapter({
    title: 'Food Safety, Traceability, and Regulatory Compliance', chapterTitle: LESSON, readingTime: '6',
    objective: 'Explain why food safety and compliance become operating systems as a coffeehouse network grows.',
    mateIntro: 'One café can get by on the owner’s habits. Fifty need written procedures, checked suppliers and records anyone can audit.',
    keyInsight: 'Compliance is a foundation for trust and scalability. Standardized procedures and documented supplier controls become especially important as businesses expand their networks and diversify their menus.',
    statTiles: [
      { value: '4', label: 'Key compliance activities', subtitle: 'Procedures to compliance monitoring', description: 'Food safety procedures, supplier verification, staff training and compliance monitoring.' },
      { value: '20 working days', label: 'Processing time stated for a food safety compliance certificate file', subtitle: 'Thu Vien Phap Luat', description: 'The file includes registration, facility description, health confirmations and a trained-staff list.' },
      { value: '57.11%', label: 'Share of operators concerned about e-invoicing and standardised tax rules', subtitle: 'iPOS.vn survey via VCCI', description: 'Compliance cost is a live concern.' },
    ],
    statsNote: 'The first tile is a count from this lesson. Requirements vary by activity and facility, a secondary source reports that Decree 70 was replaced from 1 July 2026 so current texts should be checked, and no public data on café inspections or incidents was found.',
    narrative: [
      { label: 'What it is', text: 'Foodservice operators must maintain appropriate controls over food safety, hygiene, ingredient handling, storage, preparation, and product traceability. Requirements may differ according to the business activity, product category, facility, and applicable Vietnamese regulations.' },
      { label: 'Why it is happening', text: 'As brands scale across locations and suppliers, compliance becomes an operational system rather than a one-time administrative task. Weak controls can expose businesses to product contamination, inconsistent quality, reputational damage, and interruptions to operations.' },
      { label: 'Real-world example', text: 'Operators document requirements for receiving, storage temperatures, preparation, sanitation and equipment maintenance; review supplier qualifications, ingredient specifications, certificates and traceability documents; train staff on hygiene, allergen handling, cleaning schedules and incident escalation; and run routine internal inspections, keep records and update procedures when requirements change.' },
      { label: 'Vietnam example', text: 'The consolidated Law on Food Safety sets conditions for premises that prepare and serve food and drink, covering water, waste, storage, hygiene and the health and training of handlers, and the compliance-certificate file includes business registration, a facility description, health confirmation and a trained-staff list, with 20 working days to process. Decree 70/2025/ND-CP extended point-of-sale e-invoices to qualifying restaurants from 1 June 2025, a secondary source reports it was replaced from 1 July 2026, and 57.11% of operators in the iPOS.vn survey were concerned about e-invoicing and tax rules. Highlands states that its roastery holds FSSC 22000, ISO 22000 and HACCP systems, which is a company claim, and Milano says disputes arise when agents mix in outside products. EU deforestation rules apply from 30 December 2026 to large and medium operators and affect coffee exporters rather than cafés directly. No public data on café inspections or incidents was found.' },
      { label: 'Business impact', text: 'Food safety and regulatory compliance protect consumers while supporting brand credibility and operational consistency. Operators should integrate compliance into daily workflows and supplier management rather than treating it as a separate administrative function.' },
    ],
    visualKind: 'coffee-m5-41-foodsafety', visualHeading: 'Four controls that make food safety a system',
    visualIntro: 'Follow the four controls and what each covers.',
    imageAlt: 'Casemate step diagram of four food safety and compliance controls for coffeehouses',
    keyTerms: [
      { term: 'Traceability', definition: 'The ability to follow an ingredient or product back to its source and forward to where it was used.' },
      { term: 'HACCP', definition: 'A system that identifies and controls hazards at critical points in food handling.' },
      { term: 'Supplier verification', definition: 'Checking that a supplier meets quality, safety and documentation requirements.' },
      { term: 'E-invoice', definition: 'An invoice issued electronically and recorded with the tax authority.' },
    ],
    recap: [
      'Controls cover hygiene, storage, preparation and traceability.',
      'Compliance becomes an operating system as networks scale.',
      'Documented supplier controls matter more as menus diversify.',
      'Integrate compliance into daily work, not a separate task.',
    ],
    chapterRecap: 'Food safety and regulatory compliance protect consumers while supporting brand credibility and operational consistency. Operators should integrate compliance into daily workflows and supplier management rather than treating it as a separate administrative function.',
    deepDiveTitle: 'Why check a rule’s current text before building a process on it',
    body: <C5DeepDive paragraphs={[
      'Rules change: Decree 70/2025 on invoices began in June 2025 and a secondary source reports it was replaced from July 2026. A process built on a summary can be out of date within a year.',
      'The practical habit is to keep a short compliance register that names each rule, its source, its date and the person who checks it, so changes reach the store procedures.' ]} evidence="Food safety conditions and the certificate file are from Thu Vien Phap Luat; Decree 70 is from the Chinhphu.vn portal with a Bizzi secondary source on its replacement; the survey figure is from VCCI; roastery certifications are a Highlands announcement; the Milano comment is from CafeF; EU dates are from the European Commission. The register suggestion is our own." />,
    sources: citeC5('foodSafetyLaw', 'foodSafetyCertificate', 'decree70', 'decree70Review', 'vcciFnbEnglish', 'highlandsPlant2023', 'milanoFranchise', 'eudrCommission'),
  }),
  c5Chapter({
    title: 'Sustainable Packaging, Waste Reduction, and Resource Efficiency', chapterTitle: LESSON, readingTime: '7',
    objective: 'Explain how credible, measurable sustainability initiatives differ from broad claims and what Vietnamese coffeehouses are doing.',
    mateIntro: 'Paper bags, reusable cups and recycled packaging sound simple. What counts is whether they cut waste at a cost the business can sustain.',
    keyInsight: 'The most credible sustainability initiatives connect measurable environmental improvements with operational feasibility. Broad claims without evidence can weaken consumer trust and create greenwashing risks.',
    statTiles: [
      { value: '4', label: 'Key sustainability activities', subtitle: 'Packaging to supplier engagement', description: 'Packaging optimization, food-waste management, resource efficiency and supplier engagement.' },
      { value: '30 billion', label: 'Nylon bags used in Vietnam each year, 80% discarded after one use', subtitle: 'Environmental economics association, 2023, via Greenstyle', description: 'The wider waste context for packaging fees and reuse schemes.' },
      { value: 'VND 500', label: 'Starbucks charge per paper bag from 26 December 2024', subtitle: 'Greenstyle and CafeF', description: 'A small fee meant to change behaviour.' },
    ],
    statsNote: 'The first tile is a count from this lesson. The nylon-bag figure is an association estimate, the reusable-cup offers are company or bank promotions whose current terms were not checked, and no public Vietnam data on coffeehouse food waste or store energy use was found.',
    narrative: [
      { label: 'What it is', text: 'Sustainability is becoming a potential source of differentiation in consumer foodservice, particularly through packaging, responsible sourcing, food-waste reduction, and resource efficiency. Euromonitor identifies sustainability as an emerging competitive differentiator in Vietnam’s foodservice market.' },
      { label: 'Why it is happening', text: 'For operators, sustainability must also be evaluated through practical operating considerations. Alternative packaging, reusable-cup programs, and new waste-management systems can create benefits, but their performance depends on cost, customer adoption, hygiene, collection infrastructure, and the actual environmental impact of the materials used.' },
      { label: 'Real-world example', text: 'Operators reduce unnecessary packaging and test recyclable, reusable or lower-impact alternatives suited to the local waste system; use demand forecasting, stock rotation, portion control and end-of-day monitoring to cut unsold products; track water, electricity, refrigeration and equipment efficiency at store level; and review suppliers’ sourcing, packaging specifications and waste-reduction opportunities.' },
      { label: 'Vietnam example', text: 'Starbucks has charged VND 500 per paper bag since 26 December 2024, offers VND 10,000 off and 2 bonus Stars for a reusable cup and has partnered on tree planting; Highlands has given VND 8,000 off for a personal cup, reported at one outlet as applying on Mondays; and Passio offers VND 10,000 off a Size L drink to customers who bring a bottle and pay with VPBank through 31 December 2026. From 1 January 2024 producers and importers of covered packaging face recycling duties, with producers under VND 30 billion of revenue exempt and rates such as 20% for carton paper and 22% for rigid PET; whether this reaches a café’s own cups depends on classification and was not verified. The Euromonitor point comes from its summary page only. No public data on coffeehouse food waste or store energy use was found.' },
      { label: 'Business impact', text: 'Sustainability can improve resource efficiency and strengthen brand differentiation when initiatives are credible and measurable. Businesses should evaluate both environmental outcomes and total operating costs before rolling out solutions across their networks.' },
    ],
    visualKind: 'coffee-m5-42-sustainability', visualHeading: 'Four sustainability actions, illustratively placed',
    visualIntro: 'Place four actions by ease of rollout and likely environmental benefit, and read the caution.',
    imageAlt: 'Casemate matrix of four sustainability actions by ease of rollout and likely benefit',
    keyTerms: [
      { term: 'Greenwashing', definition: 'Making environmental claims that are not supported by evidence.' },
      { term: 'EPR', definition: 'Extended producer responsibility: duties on producers and importers to recycle covered packaging.' },
      { term: 'Reusable cup', definition: 'A cup customers bring or return and use many times.' },
      { term: 'Resource efficiency', definition: 'Using less water, energy and material for the same output.' },
    ],
    recap: [
      'Packaging, sourcing, waste and resource use can differentiate brands.',
      'Benefits depend on cost, adoption, hygiene and collection systems.',
      'Measurable results make initiatives credible.',
      'Unsupported claims risk greenwashing.',
    ],
    chapterRecap: 'Sustainability can improve resource efficiency and strengthen brand differentiation when initiatives are credible and measurable. Businesses should evaluate both environmental outcomes and total operating costs before rolling out solutions across their networks.',
    deepDiveTitle: 'Why a reward can beat a fee, and why both need a measure',
    body: <C5DeepDive paragraphs={[
      'Starbucks charges a small fee for paper bags while Highlands rewards customers who bring a cup. Press commentary notes that a reward changes behaviour through a benefit while a fee changes it through a cost, and that fees land better when the money goes to a visible cause.',
      'Either needs a measure: bags avoided, cups reused or waste removed per store. Without one, the initiative is a claim, not a result.' ]} evidence="Bag fee and cup discount details are from Greenstyle, CafeF and VNBizNews commentary read as excerpts; Starbucks’ reusable-cup incentive is a company post; the Passio offer is a VPBank promotion page; packaging rules are from the Ministry portal and a consultancy explainer; Euromonitor is cited from its summary page only. The reward-versus-fee comparison is press commentary and the measurement point is our own." />,
    sources: citeC5('greenstyleReusable', 'starbucksByoc', 'vpbankPassio', 'eprPackaging', 'eprScope', 'euromonitorFoodservice'),
  }),
  c5Chapter({
    title: 'Responsible Marketing, Consumer Data, and Corporate Governance', chapterTitle: LESSON, readingTime: '7',
    objective: 'Explain how marketing, data use and partner oversight create trust or risk as a coffeehouse network grows.',
    mateIntro: 'Every promotion, loyalty sign-up and franchise agreement is a promise. Governance is how a business keeps those promises as it grows.',
    keyInsight: 'Trust is an operational asset that must be protected across marketing, data use, and partner relationships. Responsible practices can reduce compliance exposure while supporting customer loyalty.',
    statTiles: [
      { value: '4', label: 'Key responsibility activities', subtitle: 'Promotions to partner oversight', description: 'Transparent promotions, data governance, responsible product claims and partner oversight.' },
      { value: 'VND 30–50M', label: 'Fine for processing personal data without valid consent, or with no consent log', subtitle: 'Decree 330/2026/ND-CP', description: 'Rises to VND 50–70 million for continuing after a request to stop or treating silence as consent.' },
      { value: 'VND 3B', label: 'Maximum administrative fine for most other violations', subtitle: 'Law 91/2025/QH15', description: 'Cross-border transfer fines can reach 5% of prior-year revenue.' },
    ],
    statsNote: 'The first tile is a count from this lesson. Fines are legal maxima or ranges, not typical outcomes; micro-enterprises and small businesses have partial exemptions from some articles of Law 91/2025 unless they handle sensitive or large-scale data, and no Vietnam coffeehouse enforcement cases were found.',
    narrative: [
      { label: 'What it is', text: 'Digital engagement and personalized marketing create responsibilities around transparency, consumer privacy, advertising claims, and the handling of customer information. Loyalty programs and ordering platforms may collect data that can improve customer experiences, but unclear consent practices or excessive data collection can undermine trust.' },
      { label: 'Why it is happening', text: 'Governance also becomes more important as operators franchise, expand to multiple locations, or work with delivery platforms and marketing partners. Clear standards for promotions, pricing, product claims, data access, and franchise oversight help protect brand consistency and reduce avoidable risks.' },
      { label: 'Real-world example', text: 'Operators communicate discount conditions, eligibility, expiry dates and limitations clearly; limit data collection to legitimate business needs, manage access and explain privacy practices; make sure health, nutrition, origin and sustainability statements are accurate and supported; and set operating standards for franchisees, delivery partners, suppliers and external marketing agencies.' },
      { label: 'Vietnam example', text: 'Law 91/2025/QH15 took effect on 1 January 2026 and requires clear, specific, verifiable consent, with silence and default consent not allowed and consent records kept; Decree 330/2026/ND-CP sets fines of VND 30–50 million for processing without valid consent, using default consent or keeping no consent log, and VND 50–70 million for continuing after a request to stop. Highlands’ and Phúc Long’s loyalty programmes and Zalo campaigns collect customer data, so these rules apply to their consent flows. Milano says it earns from supplying agents and describes disputes when agents mix in outside products, and E-Coffee runs a zero-fee franchise, which shows why partner oversight matters. No Vietnam coffeehouse data on promotion complaints, claim enforcement or data-law cases was found.' },
      { label: 'Business impact', text: 'Responsible marketing and governance help protect consumer trust as the industry becomes more digitally connected and operationally complex. Businesses should build compliance and accountability into customer-facing systems and partner relationships.' },
    ],
    visualKind: 'coffee-m5-43-governance', visualHeading: 'Four responsibilities and the evidence',
    visualIntro: 'Read each responsibility, what it requires and the Vietnam evidence.',
    imageAlt: 'Casemate table of four responsible marketing and governance responsibilities for coffeehouses',
    keyTerms: [
      { term: 'Consent log', definition: 'A record of when and how a customer agreed to a use of their data.' },
      { term: 'Data governance', definition: 'Rules for what data is collected, who can access it and how long it is kept.' },
      { term: 'Product claim', definition: 'A statement about a product’s health, nutrition, origin or sustainability.' },
      { term: 'Franchise oversight', definition: 'Standards and checks that keep franchisees consistent with the brand.' },
    ],
    recap: [
      'Trust must be protected across marketing, data use and partners.',
      'Unclear consent or excessive data collection undermines trust.',
      'Governance grows in importance with franchising and partners.',
      'Responsible practice cuts compliance exposure and supports loyalty.',
    ],
    chapterRecap: 'Responsible marketing and governance help protect consumer trust as the industry becomes more digitally connected and operationally complex. Businesses should build compliance and accountability into customer-facing systems and partner relationships.',
    deepDiveTitle: 'Why a consent log is a business asset as well as a legal duty',
    body: <C5DeepDive paragraphs={[
      'A record of who agreed to what lets a chain prove compliance, honour a request to stop and target offers only to customers who opted in. Without it, a loyalty database can become a liability.',
      'Because the controller bears the burden of proving consent, a simple, well-kept log is cheaper than a dispute.' ]} evidence="Law 91/2025/QH15 and its penalties are from the Official Gazette, a LexData summary and the Chinhphu.vn text of Decree 330/2026/ND-CP; Milano and E-Coffee details are from CafeF and The Investor; loyalty programmes are from company announcements and vendor case studies. The consent-log point is our own reading of the legal summary." />,
    sources: citeC5('pdplLaw', 'pdplConsent', 'decree330', 'milanoFranchise', 'investorEcoffee', 'highlandsApp', 'phucLongRewards'),
  }),
];

const quiz = c5Quiz('coffee-m5-l4', [
  { chapter: '1', objective: 'State the compliance insight', question: 'What is compliance, according to the chapter?', application: 'A founder treats food safety as paperwork. What is the better view?', correct: 'A foundation for trust and scalability', wrong: ['A one-time administrative task', 'A marketing tool', 'An optional extra'], explanation: 'It becomes an operating system. Review Chapter 1.' },
  { chapter: '1', objective: 'Recall the certificate timing', question: 'How long does the stated processing time for a food safety compliance certificate file run?', application: 'An owner plans an opening date. What timing should they allow?', correct: '20 working days', wrong: ['1 day', '20 months', '2 years'], explanation: 'The file also needs health confirmations and a trained-staff list. Review Chapter 1.' },
  { chapter: '1', objective: 'Handle changing rules', question: 'Why should operators check the current text of Decree 70/2025?', application: 'A summary says the decree is in force. What should be done?', correct: 'A secondary source reports it was replaced from 1 July 2026, so current text must be checked', wrong: ['Rules never change', 'Only lawyers read decrees', 'Summaries are always right'], explanation: 'Check dates and texts. Review Chapter 1.' },
  { chapter: '2', objective: 'State the sustainability insight', question: 'What makes a sustainability initiative credible?', application: 'A brand announces a green pledge with no data. What is missing?', correct: 'Measurable environmental improvement linked to operational feasibility', wrong: ['A bold slogan', 'The lowest cost only', 'A new logo'], explanation: 'Unsupported claims risk greenwashing. Review Chapter 2.' },
  { chapter: '2', objective: 'Recall the bag fee', question: 'What does Starbucks charge per paper bag since 26 December 2024?', application: 'A customer asks about the fee. What is it?', correct: 'VND 500', wrong: ['VND 50', 'VND 50,000', 'Nothing'], explanation: 'It is a small behavioural fee. Review Chapter 2.' },
  { chapter: '2', objective: 'Describe the EPR caveat', question: 'What was not verified about packaging recycling duties in this chapter?', application: 'A café asks if EPR applies to its cups. What is the answer?', correct: 'Whether the duties reach a café’s own cups, which depends on classification', wrong: ['That EPR exists', 'The start date of 1 January 2024', 'That cups exist'], explanation: 'Do not assume scope. Review Chapter 2.' },
  { chapter: '2', objective: 'Compare incentives', question: 'What do the Starbucks bag fee and the Highlands cup discount show?', application: 'A chain chooses between a fee and a reward. What is the difference?', correct: 'A fee changes behaviour through a cost and a reward through a benefit', wrong: ['Both are identical', 'Both are banned', 'Neither changes behaviour'], explanation: 'Press commentary notes the difference. Review Chapter 2.' },
  { chapter: '3', objective: 'State the trust insight', question: 'What kind of asset is trust, according to the chapter?', application: 'A chain buys customer data without clear consent. What risk does it run?', correct: 'An operational asset that must be protected across marketing, data use and partners', wrong: ['A purely legal term', 'A marketing slogan', 'A tax category'], explanation: 'Responsible practice cuts exposure. Review Chapter 3.' },
  { chapter: '3', objective: 'Recall the data law date', question: 'When did Law 91/2025/QH15 take effect?', application: 'A loyalty team checks its consent forms. Which date applies?', correct: '1 January 2026', wrong: ['1 January 2015', '30 June 2020', '4 July 2030'], explanation: 'Consent must be recorded. Review Chapter 3.' },
  { chapter: '3', objective: 'Recall the fine range', question: 'What fine range does Decree 330/2026/ND-CP set for processing without valid consent?', application: 'A manager estimates risk. What range applies?', correct: 'VND 30–50 million', wrong: ['VND 300–500', 'VND 3–5 billion', 'No fine'], explanation: 'Continuing after a stop request is VND 50–70 million. Review Chapter 3.' },
]);

export const LESSON_C5_4: CoffeeM5LessonBundle = {
  deck,
  quiz,
  takeaways: {
    learned: 'You can explain how food safety, sustainability and data governance are changing what Vietnamese coffeehouses must do and how to judge each initiative.',
    keyTakeaways: [
      'Compliance is a foundation for trust and must scale with the network.',
      'Check the current text of rules such as Decree 70 before building processes on them.',
      'Credible sustainability needs measurable results and operational feasibility.',
      'Law 91/2025 and Decree 330/2026 make consent records and clear consent essential.',
      'Evidence on café waste, energy use and enforcement cases in Vietnam is missing.',
    ],
    businessImplications: 'Build compliance, measured sustainability and consent management into daily operations and partner contracts.',
    remember: 'Trust is built by systems, not statements.',
    nextLesson: 'Growth Outlook & Strategic Opportunities',
  },
};
