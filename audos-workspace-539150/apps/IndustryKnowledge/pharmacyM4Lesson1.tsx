import { P4DeepDive, citeP4, p4Chapter, p4Quiz } from './pharmacyM4Core';
import type { PharmacyM4LessonBundle } from './pharmacyM4Core';

const LESSON = '1. Industry Competition Structure';

const deck = [
  p4Chapter({
    title: 'Market Fragmentation and Industry Consolidation', chapterTitle: LESSON, readingTime: '6',
    objective: 'Explain how fragmented independents and growing chains coexist and why consolidation does not remove independents.',
    mateIntro: 'Vietnam has tens of thousands of small pharmacies and a few fast-growing chains. The market is changing shape, but slowly, and not in only one direction.',
    keyInsight: 'The market is shifting toward greater organization, but consolidation does not automatically eliminate independent pharmacies. Scale creates advantages in purchasing, systems, and brand recognition, while local relationships and convenient locations remain important competitive assets.',
    statTiles: [
      { value: '6', label: 'Key structure activities', subtitle: 'Fragmentation to expansion discipline', description: 'Fragmented structure, chain expansion, operational consolidation, pressure on independents, market coverage analysis and expansion discipline.' },
      { value: '~95% / ~5%', label: 'Traditional pharmacies versus modern chains as a share of outlets', subtitle: 'Of more than 50,000 pharmacies, Vietcap', description: 'Shows how small chains still are by outlet count.' },
      { value: '63%', label: 'Share of chain stores outside Ho Chi Minh City and Hanoi in 2025', subtitle: 'About 22% in 2019, calculated from Q&Me counts', description: 'Shows chains moving into provincial markets.' },
    ],
    statsNote: 'The first tile is a count from this lesson; the shares are a broker estimate and a calculation from survey counts reproduced by a report aggregator, and definitions of outlets and chains vary by source.',
    narrative: [
      { label: 'What it is', text: 'Pharmacy retail is traditionally fragmented, with many independent pharmacies alongside organised chains. Independents compete through neighbourhood access, personal relationships and knowledge of local needs, while chains compete through wider store networks, central procurement, standard operations and investment in technology and brand. Vietnam combines a large base of traditional pharmacies with expanding modern chains, which creates room for consolidation as larger operators extend coverage and serve customers who value consistent service and availability, though expansion is limited by store economics, staffing, site competition and compliance.' },
      { label: 'Why it is happening', text: 'Customers increasingly value reliable stock and consistent service, and larger operators can fund systems and stores to provide them. But each new store needs staff, rent and stock, and many neighbourhoods are already well served, so growth meets limits.' },
      { label: 'Real-world example', text: 'Independents serve local communities with limited coverage and small management teams; organised operators open stores to widen access and brand recognition; larger firms centralise procurement, distribution, reporting and training; independents may need better stock, service and digital capability to compete; retailers assess store density, population, healthcare demand and rival locations before entering; and operators judge expansion by store profitability and local demand, not store count alone.' },
      { label: 'Vietnam example', text: 'Q&Me counted 492 chain pharmacy stores in 2019 and 3,457 in 2025, with the share outside Ho Chi Minh City and Hanoi rising from about 22% to about 63%. Vietcap says more than 50,000 pharmacies operate and about 95% are traditional, and estimates modern-pharmacy penetration at about 14% in 2024. KIS counted 3,475 modern pharmacies in the second quarter of 2025 and described the segment as entering a consolidation phase, as store growth no longer matched sales growth.' },
      { label: 'Business impact', text: 'Vietnamese pharmacy retail combines fragmentation with the growth of organized chains. Consolidation can improve operational scale and consistency, but independent pharmacies remain competitive where local access, relationships, and responsive service matter.' },
    ],
    visualKind: 'pharmacy-m4-11-structure', visualHeading: 'Pharmacy chain stores in Vietnam, 2019 to 2025',
    visualIntro: 'See how the number of chain pharmacy stores grew from 2019 to 2025 and how growth has slowed.',
    imageAlt: 'Casemate bar chart of the number of chain pharmacy stores in Vietnam from 2019 to 2025',
    keyTerms: [
      { term: 'Fragmented market', definition: 'A market with many small participants and no dominant player.' },
      { term: 'Consolidation', definition: 'Fewer, larger players holding more of the market.' },
      { term: 'Modern pharmacy penetration', definition: 'The share of the market served by organised chains.' },
      { term: 'Expansion discipline', definition: 'Judging growth by store economics, not store count alone.' },
    ],
    recap: [
      'The market has many independents and a growing set of chains.',
      'Chains expand to widen access and brand recognition.',
      'Scale helps buying, systems and brand; local ties help independents.',
      'Expansion must be judged by store profitability and local demand.',
    ],
    chapterRecap: 'Vietnamese pharmacy retail combines fragmentation with the growth of organized chains. Consolidation can improve operational scale and consistency, but independent pharmacies remain competitive where local access, relationships, and responsive service matter.',
    deepDiveTitle: 'Why a slowing store count can still mean a maturing market',
    body: <P4DeepDive paragraphs={[
      'When store openings grow more slowly than sales, or sales per store stop rising, it may mean the best sites are taken and each new outlet adds less. That is a sign of maturity, not necessarily failure.',
      'At that stage the contest shifts from opening stores to making each store more productive and defending the customer base.' ]} evidence="The six activities are described qualitatively in the supplied material. Store counts are Q&Me survey data reproduced by a report aggregator, the outlet shares and penetration are Vietcap estimates and the consolidation view is a KIS Vietnam broker opinion; sources and definitions differ." />,
    sources: citeP4('qmeSeries', 'vietcapTraditional', 'vietcapFrt', 'kisRetail2q25', 'vietcapVad2024'),
  }),
  p4Chapter({
    title: 'Competitive Dimensions and Basis of Competition', chapterTitle: LESSON, readingTime: '6',
    objective: 'List the dimensions on which pharmacies compete and explain why price alone does not decide customer choice.',
    mateIntro: 'Someone needing medicine at night cares about what is open and in stock. A repeat customer cares about trust. Price matters, but never alone.',
    keyInsight: 'Pharmacy retail is not a price-only competition. Price matters, but product availability, trust, qualified staff, convenient access, and reliable service can be equally important in customer choice.',
    statTiles: [
      { value: '8', label: 'Key competitive dimensions', subtitle: 'Price to customer retention', description: 'Price, availability, accessibility, professional service, assortment, brand reputation, convenience and customer retention.' },
      { value: '~14%', label: 'Modern pharmacy penetration of Vietnam in 2024', subtitle: 'Vietcap estimate', description: 'Most customers still shop at traditional pharmacies.' },
      { value: '~33,000', label: 'People served by one modern pharmacy in Vietnam', subtitle: 'About 4,000 in China, Vietcap 2024', description: 'Shows how much room there is to improve access to organised pharmacies.' },
    ],
    statsNote: 'The first tile is a count from this lesson; the penetration and people-per-store figures are broker estimates from 2024 and are indicative only.',
    narrative: [
      { label: 'What it is', text: 'Pharmacy retailers compete on price, product availability, location, assortment, professional service, customer trust and convenience. These overlap, but their weight differs by customer segment and purchase occasion: someone needing a medicine urgently may put availability and proximity first, while a repeat customer may value reliable service and consistent supply. Competition also differs by category, since prescription medicines carry dispensing requirements and professional responsibility while OTC and non-medicine goods involve more visible price and range comparisons.' },
      { label: 'Why it is happening', text: 'Medicine is a trust purchase, so customers weigh several things at once. Because many customers pay directly, price is a real factor, but a wrong or unavailable product costs more than a small saving.' },
      { label: 'Real-world example', text: 'A pharmacy keeps prices transparent and manages procurement cost within pricing and advertising rules; reduces avoidable stockouts; places outlets near homes, workplaces and healthcare facilities; gives accurate information and dispensing support; offers a relevant range without excess complexity; builds confidence through consistent service; improves hours, speed, digital information and eligible delivery; and encourages repeat visits through dependable service.' },
      { label: 'Vietnam example', text: 'A World Bank study finds about 40% of Vietnam’s current health expenditure is paid out of pocket, which keeps price important. FPT says Long Châu commits to delivery in under two hours and reports a returning-customer rate of about 70%, and Pharmacity says it offers more than 7,000 active products. Vietcap estimates about 33,000 people are served by each modern pharmacy in Vietnam against about 4,000 in China, so access remains a key battleground.' },
      { label: 'Business impact', text: 'Pharmacy competition combines commercial and healthcare-related factors. Retailers need to understand which dimensions matter most to their target customers and differentiate through a balanced proposition rather than relying on discounts alone.' },
    ],
    visualKind: 'pharmacy-m4-12-dimensions', visualHeading: 'Eight dimensions on which pharmacies compete',
    visualIntro: 'See eight competitive dimensions around the basis of competition and what each is won through.',
    imageAlt: 'Casemate orbit mind map of eight dimensions on which pharmacies compete',
    keyTerms: [
      { term: 'Basis of competition', definition: 'The factors on which customers choose between rivals.' },
      { term: 'Availability', definition: 'Having requested products in stock when needed.' },
      { term: 'Geographic accessibility', definition: 'How close and easy to reach a store is.' },
      { term: 'Customer retention', definition: 'Keeping customers returning through dependable service.' },
    ],
    recap: [
      'Pharmacies compete on price, availability, location, range, service, trust and convenience.',
      'The weight of each differs by customer and occasion.',
      'Prescription and OTC categories involve different competitive factors.',
      'Balanced propositions beat discounts alone.',
    ],
    chapterRecap: 'Pharmacy competition combines commercial and healthcare-related factors. Retailers need to understand which dimensions matter most to their target customers and differentiate through a balanced proposition rather than relying on discounts alone.',
    deepDiveTitle: 'Why discounting is a weak long-term weapon in pharmacy',
    body: <P4DeepDive paragraphs={[
      'A rival can match a discount quickly, while service quality, reliable stock and trust take years to build and cannot be copied overnight. Heavy discounting also squeezes margins that are already thin.',
      'Retailers that win on several dimensions at once, such as proximity plus availability plus advice, are harder to displace.' ]} evidence="The eight dimensions are described qualitatively in the supplied material. Spending data are from a World Bank report, delivery and repeat-customer statements are company-group claims in a technology news article, the product count is from a company press release and penetration figures are Vietcap estimates." />,
    sources: citeP4('worldBankOop', 'chungtaTouchpoints', 'pharmacityPress', 'vietcapVad2024', 'vietcapFrt'),
  }),
  p4Chapter({
    title: 'Barriers to Entry and Competitive Intensity', chapterTitle: LESSON, readingTime: '6',
    objective: 'Explain the regulatory, capital, supply and workforce barriers that shape entry and competition in pharmacy retail.',
    mateIntro: 'Opening a pharmacy needs more than a shopfront. It needs a qualified person, lawful supply and the money to keep stock and staff until sales arrive.',
    keyInsight: 'Competitive intensity is shaped by both the ability to enter the market and the ability to operate profitably after entry. Regulatory compliance establishes minimum requirements, while scale, supplier access, workforce capability, and customer trust influence long-term competitiveness.',
    statTiles: [
      { value: '8', label: 'Key entry and survival activities', subtitle: 'Regulation to ongoing compliance', description: 'Regulatory requirements, capital, supplier access, workforce, brand-building, scale challenges, local assessment and ongoing compliance.' },
      { value: '2 years', label: 'Practice experience required for the pharmacist in charge of a pharmacy', subtitle: 'With a pharmacy degree, Law on Pharmacy', description: 'The same experience is required for the person in charge of a chain-organising entity.' },
      { value: '18 months', label: 'Practice experience required for a drug counter’s pharmacist in charge', subtitle: 'University, college or intermediate pharmacy degree', description: 'A lower threshold than for a full pharmacy.' },
    ],
    statsNote: 'The first tile is a count from this lesson; the experience periods are from the consolidated Law on Pharmacy as summarised by a legal database, and the exact conditions should be checked in the current official text.',
    narrative: [
      { label: 'What it is', text: 'Entering pharmacy retail takes more than securing premises and buying products. Businesses must meet pharmaceutical business and professional requirements, set up reliable supply, manage inventory, recruit qualified staff and build trust, which separates pharmacy from many forms of general retail. Barriers vary by model: a single independent needs less capital than a nationwide chain but still needs authorisation, compliant operations and sustainable local demand, while a large chain faces added challenges in network expansion, systems, management capacity, recruitment, logistics and the time new outlets need to become viable.' },
      { label: 'Why it is happening', text: 'Because medicines can harm, the law makes a qualified person responsible for each outlet, and operators must also fund stock and staff before sales cover them. Those costs favour operators who can spread systems and compliance over many stores.' },
      { label: 'Real-world example', text: 'A new operator meets the conditions for operations, staffing, dispensing, storage and documents; funds stock, fit-out, deposits, expenses and technology; sets up eligible suppliers with traceability; recruits and keeps qualified staff; invests in awareness and trust where rivals are established; coordinates procurement, distribution, quality and reporting across stores; assesses existing pharmacies, demand, rent and likely sales before opening; and keeps systems ready for rule changes.' },
      { label: 'Vietnam example', text: 'Under the Law on Pharmacy, each outlet needs a responsible person with a pharmacy practice certificate: a pharmacy needs a university pharmacy degree and two years of practice, and a drug counter needs a pharmacy degree and 18 months. The 2024 amendment, effective 1 July 2025, added conditions for the person in charge of a pharmacy-chain entity, who also needs a degree and two years of practice, while each pharmacy in the chain keeps its own responsible person. Pharmacity’s losses and restructuring show that capital and efficiency barriers also bind large chains.' },
      { label: 'Business impact', text: 'Pharmacy retail has meaningful operational and regulatory entry requirements, while chain expansion creates additional capital and management challenges. Long-term success depends on converting market access into compliant, trusted, and financially sustainable operations.' },
    ],
    visualKind: 'pharmacy-m4-13-barriers', visualHeading: 'Eight barriers to entering and surviving in pharmacy retail',
    visualIntro: 'See eight barriers branching from entry and staying power and what each requires.',
    imageAlt: 'Casemate tree mind map of eight barriers to entering and surviving in pharmacy retail',
    keyTerms: [
      { term: 'Barrier to entry', definition: 'A requirement or cost that makes it harder for new operators to start.' },
      { term: 'Pharmacy practice certificate', definition: 'Professional authorisation for a person to be responsible for a pharmacy.' },
      { term: 'Chain-organising entity', definition: 'The business that organises and manages a pharmacy chain.' },
      { term: 'Local market assessment', definition: 'Checking rivals, demand, rent and likely sales before opening a store.' },
    ],
    recap: [
      'Entry needs authorisation, qualified staff, supply, capital and trust.',
      'Single stores and chains face different barriers.',
      'Regulation sets the minimum; scale, supply, staff and trust decide staying power.',
      'Access to the market must be turned into profitable operation.',
    ],
    chapterRecap: 'Pharmacy retail has meaningful operational and regulatory entry requirements, while chain expansion creates additional capital and management challenges. Long-term success depends on converting market access into compliant, trusted, and financially sustainable operations.',
    deepDiveTitle: 'Why the responsible person is the scarcest input',
    body: <P4DeepDive paragraphs={[
      'Every outlet needs a qualified responsible person, so the number of stores a chain can open is tied to the number of qualified pharmacists it can recruit and keep. Money alone does not remove that limit.',
      'This is why large chains invest in school partnerships, training and career paths, and why staffing plans must come before opening dates.' ]} evidence="The eight activities are described qualitatively in the supplied material. Legal conditions are from the consolidated Law on Pharmacy and a summary of Law 44/2024/QH15 on a legal database, and the Pharmacity restructuring is from The Investor; they are summaries, not legal advice." />,
    sources: citeP4('pharmacyLawConsolidated', 'law44Summary', 'investorPharmacity', 'pensoftPharmacists'),
  }),
];

const quiz = p4Quiz('pharmacy-m4-l1', [
  { chapter: '1', objective: 'State the market direction', question: 'Which statement best describes Vietnam’s pharmacy market structure?', application: 'An analyst says chains are about to replace independents. Is that right?', correct: 'It is shifting toward greater organisation, but consolidation does not automatically eliminate independent pharmacies', wrong: ['Independents have already disappeared', 'Chains cannot grow', 'The market is fully consolidated'], explanation: 'Both coexist. Review Chapter 1.' },
  { chapter: '1', objective: 'List scale advantages', question: 'What advantages does scale create?', application: 'A chain negotiates better terms than a single store. Why?', correct: 'Advantages in purchasing, systems and brand recognition', wrong: ['Freedom from rules', 'Lower staffing needs', 'Guaranteed demand'], explanation: 'Scale helps buying and systems. Review Chapter 1.' },
  { chapter: '1', objective: 'Describe expansion discipline', question: 'What should operators evaluate besides store count?', application: 'A chain opens many stores. What else should it check?', correct: 'Store profitability and local demand', wrong: ['Only the number of signs', 'Only brand awareness', 'Only rivals’ names'], explanation: 'Store count is not success. Review Chapter 1.' },
  { chapter: '1', objective: 'Read growth signals', question: 'What can store growth outpacing sales growth suggest?', application: 'A broker says store growth no longer matches sales growth. What might it mean?', correct: 'That the segment may be entering a consolidation phase where each new store adds less', wrong: ['That demand is unlimited', 'That chains are failing everywhere', 'That regulation has ended'], explanation: 'It can signal maturity. Review Chapter 1.' },
  { chapter: '2', objective: 'State that competition is not price-only', question: 'Is pharmacy retail a price-only competition?', application: 'A pharmacy cuts prices but is often out of stock. What is missing?', correct: 'No, availability, trust, qualified staff, access and reliable service matter as well', wrong: ['Yes, price decides everything', 'Yes, in all categories', 'No, price never matters'], explanation: 'Several dimensions matter. Review Chapter 2.' },
  { chapter: '2', objective: 'Explain category differences', question: 'How does competition differ by product category?', application: 'A retailer applies one tactic to all products. What is the problem?', correct: 'Prescription medicines involve dispensing rules and professional duties, while OTC and non-medicine goods involve more visible price and range comparisons', wrong: ['All categories compete the same way', 'Only prescription medicines have prices', 'Only OTC has rules'], explanation: 'Categories differ. Review Chapter 2.' },
  { chapter: '2', objective: 'Weigh dimensions by occasion', question: 'What may an urgent buyer prioritise?', application: 'A customer needs a medicine at night. What matters most?', correct: 'Availability and proximity', wrong: ['Loyalty points', 'Store decoration', 'Brand slogans'], explanation: 'Occasion changes the weight. Review Chapter 2.' },
  { chapter: '3', objective: 'State what shapes competitive intensity', question: 'What shapes competitive intensity?', application: 'A new entrant can open but struggles later. What explains it?', correct: 'Both the ability to enter and the ability to operate profitably after entry', wrong: ['Only the ability to enter', 'Only advertising', 'Only the number of rivals'], explanation: 'Entry is only the start. Review Chapter 3.' },
  { chapter: '3', objective: 'Recall the practice requirement', question: 'What practice experience does the Law on Pharmacy require for the pharmacist in charge of a pharmacy?', application: 'A pharmacist wants to be responsible for a pharmacy. What is required?', correct: 'A university pharmacy degree and two years of practice experience', wrong: ['No experience', 'Five years in a hospital only', 'Only an intermediate degree'], explanation: 'The law sets this condition. Review Chapter 3.' },
  { chapter: '3', objective: 'Recall the chain rule', question: 'What did the 2024 amendment add for chains?', application: 'A company organises a pharmacy chain. What must it have?', correct: 'A person in charge of the chain-organising entity with the required degree and two years of practice, while each pharmacy keeps its own responsible person', wrong: ['Nothing new', 'Only a marketing manager', 'A single person in charge of every pharmacy'], explanation: 'Article 17a adds this. Review Chapter 3.' },
]);

export const LESSON_P4_1: PharmacyM4LessonBundle = {
  deck,
  quiz,
  takeaways: {
    learned: 'You can describe how fragmented independents and growing chains coexist, the dimensions on which pharmacies compete, and the barriers that shape entry and competitive intensity.',
    keyTakeaways: [
      'The market is becoming more organised, but independents remain competitive.',
      'Scale helps buying, systems and brand; local ties help independents.',
      'Pharmacy competition is not price-only.',
      'Entry needs a qualified responsible person, supply, capital and trust.',
      'Long-term success means turning market access into compliant, profitable operation.',
    ],
    businessImplications: 'Choose a clear basis of competition, judge expansion by store economics, plan staffing before openings and treat compliance as the minimum, not the advantage.',
    remember: 'Getting in is easier than staying profitable.',
    nextLesson: 'Key Industry Players',
  },
};
