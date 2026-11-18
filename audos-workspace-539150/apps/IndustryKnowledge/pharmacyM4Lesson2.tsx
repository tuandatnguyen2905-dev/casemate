import { P4DeepDive, citeP4, p4Chapter, p4Quiz } from './pharmacyM4Core';
import type { PharmacyM4LessonBundle } from './pharmacyM4Core';

const LESSON = '2. Key Industry Players';

const deck = [
  p4Chapter({
    title: 'Long Châu', chapterTitle: LESSON, readingTime: '6',
    objective: 'Describe Long Châu’s competitive position and why store productivity matters as much as store count.',
    mateIntro: 'Long Châu is the chain every competitor measures itself against. Its size is clear; what keeps that size valuable is how well each store performs.',
    keyInsight: 'Long Châu’s competitive advantage is not simply the number of stores it operates. Its strategic challenge is to combine network expansion with consistent store productivity, reliable supply, and trusted pharmacy services.',
    statTiles: [
      { value: '7', label: 'Key Long Châu activities', subtitle: 'Network expansion to expansion risk management', description: 'Network expansion, assortment, centralised operations, brand and customer experience, digital integration, store productivity management and expansion risk management.' },
      { value: '2,417', label: 'Long Châu pharmacies at end-2025', subtitle: '474 opened in 2025, plus about 223–233 vaccination centres', description: 'Company-reported network as published by a broker and the press.' },
      { value: '~VND 1.2B', label: 'Average monthly revenue per Long Châu pharmacy in 2025', subtitle: 'Company-reported average', description: 'Compared with about VND 550 million at An Khang by the press.' },
    ],
    statsNote: 'The first tile is a count from this lesson; the store figures and averages are company-reported and described by brokers and the press, and the vaccination-centre count is reported as 223 or 233 depending on the source.',
    narrative: [
      { label: 'What it is', text: 'Long Châu is a major modern pharmacy chain in Vietnam, operating under FPT Retail. Its position is tied to a broad store network, medicine availability, centralised operations and the backing of a larger retail group. Its fast expansion makes it a reference point for organised pharmacy retail, and it competes through geographic coverage, assortment, customer service and scale, but a large network creates reach only if each outlet sells enough to cover staff, rent, stock and other costs.' },
      { label: 'Why it is happening', text: 'Customers value reliable stock and consistent service, and a large network with central buying and systems can deliver both across many neighbourhoods. But growth only pays when new stores reach adequate sales, so productivity per store is what sustains expansion.' },
      { label: 'Real-world example', text: 'The chain opens outlets across regions for access; keeps a broad range of medicines and healthcare products; uses coordinated procurement, inventory systems and procedures; builds a recognisable proposition around accessibility, availability and pharmacy services; uses digital channels for discovery, communication and eligible transactions; evaluates sales per store, gross profit, expenses and new-store results; and avoids relying on store-count growth without checking local demand and payback.' },
      { label: 'Vietnam example', text: 'Long Châu ended 2025 with 2,417 pharmacies after opening 474 in the year, with revenue of VND 34,501 billion, up 36%, and about two-thirds of FPT Retail’s revenue. Vietcap counted 2,191 pharmacies at end-June 2025 and said it held more than half of chain stores by May 2025, with average sales of VND 1.2 billion per store per month, and a 2023 Vietcap comparison put its monthly sales per store at about US$43,000 against about US$18,000 at Pharmacity and US$16,000 at An Khang. FPT Retail says it serves about 33 million customers.' },
      { label: 'Business impact', text: 'Long Châu represents the scale-driven modern pharmacy chain model in Vietnam. Its expansion provides a benchmark for competitors, but continued leadership depends on converting geographic reach into sustainable profitability and consistent customer service.' },
    ],
    visualKind: 'pharmacy-m4-21-longchau', visualHeading: 'Seven building blocks of Long Châu’s position',
    visualIntro: 'See seven building blocks on two sides of the centre and the test each must pass.',
    imageAlt: 'Casemate sides mind map of seven building blocks of Long Chau’s competitive position',
    keyTerms: [
      { term: 'Network expansion', definition: 'Opening more outlets to widen coverage.' },
      { term: 'Centralised operations', definition: 'Running procurement, inventory and procedures through a common system.' },
      { term: 'Sales per store', definition: 'The average revenue an outlet earns in a period.' },
      { term: 'Payback period', definition: 'The time a new store takes to recover its investment.' },
    ],
    recap: [
      'Long Châu is a leading modern chain operating under FPT Retail.',
      'It competes on coverage, assortment, service and scale.',
      'Reach creates value only if each outlet is productive.',
      'Expansion should be judged on local demand and payback.',
    ],
    chapterRecap: 'Long Châu represents the scale-driven modern pharmacy chain model in Vietnam. Its expansion provides a benchmark for competitors, but continued leadership depends on converting geographic reach into sustainable profitability and consistent customer service.',
    deepDiveTitle: 'Why a leader still watches same-store sales',
    body: <P4DeepDive paragraphs={[
      'A chain can grow total revenue simply by adding stores. Sales per existing store show whether customers actually prefer the offer, and falling averages warn that new stores are cannibalising old ones or opening in weaker sites.',
      'That is why analysts compare sales per store and new-store payback along with store counts.' ]} evidence="The seven activities are described qualitatively in the supplied material. Store counts and revenue are from a broker report, a Vietnamese newspaper report of FPT Retail’s results and Vietcap research; sales per store are company-reported or broker figures, and the 2023 comparison is from an investor presentation." />,
    sources: citeP4('fptRetail2025', 'frtReport2026', 'vietcapFrt', 'vietcapRace', 'vietcapVad2024'),
  }),
  p4Chapter({
    title: 'Pharmacity and An Khang', chapterTitle: LESSON, readingTime: '6',
    objective: 'Explain what the contrasting paths of Pharmacity and An Khang show about profitable growth.',
    mateIntro: 'Two big chains grew fast, then shrank, then took different paths. Their stories show that store count is not the same as strength.',
    keyInsight: 'The experience of Pharmacity and An Khang highlights the importance of profitable growth rather than expansion for its own sake. Store optimization, better productivity, and disciplined investment can be more valuable than maximizing the number of outlets.',
    statTiles: [
      { value: '7', label: 'Key strategic activities', subtitle: 'Network optimisation to operational restructuring', description: 'Network optimisation, store productivity, cost control, procurement improvement, customer proposition, investment discipline and operational restructuring.' },
      { value: '1,040', label: 'Pharmacity stores at end-2025', subtitle: 'SHS research via the press', description: 'Up from fewer than 900 at end-2024, with more than 1,100 reported in 2026.' },
      { value: '382', label: 'An Khang stores at end-2025', subtitle: 'After falling to 326 at end-2024', description: 'A smaller network, still loss-making in 2025.' },
    ],
    statsNote: 'The first tile is a count from this lesson; the store counts are press, broker and company reports at different dates, and Pharmacity’s counts differ by source (938, 991, 1,040 and over 1,100).',
    narrative: [
      { label: 'What it is', text: 'Pharmacity and An Khang are two other prominent chains whose development has differed from Long Châu’s. Pharmacity built a large network early in modern pharmacy expansion, while An Khang benefited from its link to the retailer Mobile World Investment Corporation. Both have struggled to turn store coverage into sustainable financial results, and research has documented restructuring and network reductions at both when expansion costs and store economics put pressure on performance. A large network does not guarantee profit unless sales per outlet, cost control and inventory use are right.' },
      { label: 'Why it is happening', text: 'Opening stores adds rent, staff and stock before sales arrive. If sales per store lag, the extra cost outweighs the extra reach, which forces closures and resets until the model pays.' },
      { label: 'Real-world example', text: 'A chain reviews locations and closes, moves or restructures outlets that miss commercial or strategic targets; lifts sales, conversion, relevance of range and availability at existing sites; matches rent, staff, logistics and overhead to real demand; improves supplier terms and stock planning while keeping quality; clarifies its differentiation through convenience, range, service and trust; compares expected returns of new stores with their costs; and aligns management processes and resources with its current scale.' },
      { label: 'Vietnam example', text: 'Pharmacity had more than 1,100 stores in September 2022, fewer than 900 by end-2024, and over 1,100 again in 2026, reported profit from the fourth quarter of 2025 and growth of over 35% in revenue and over 20% in same-store sales in the first quarter of 2026, and now targets 2,000 to 2,300 stores by 2030 instead of its earlier 5,000 by 2025. An Khang had about 527 stores in 2023, 326 at end-2024 and 382 at end-2025; it lost VND 112.96 billion in 2025, for accumulated losses of VND 1,115.3 billion, and withdrew from Hanoi.' },
      { label: 'Business impact', text: 'Pharmacity and An Khang illustrate the challenges of building a competitive pharmacy chain in a capital-intensive and operationally demanding market. Their long-term competitiveness depends on improving store economics, controlling costs, and developing a customer proposition that can be delivered consistently.' },
    ],
    visualKind: 'pharmacy-m4-22-pharmacity', visualHeading: 'Two chains, two growth paths',
    visualIntro: 'Compare Pharmacity and An Khang across backing, network path, profit signal, priority and lesson.',
    imageAlt: 'Casemate comparison of Pharmacity and An Khang growth paths',
    keyTerms: [
      { term: 'Network optimisation', definition: 'Closing, moving or restructuring stores to improve overall results.' },
      { term: 'Same-store sales', definition: 'Sales growth from stores open in both periods compared.' },
      { term: 'Accumulated loss', definition: 'The total of losses over several years.' },
      { term: 'Investment discipline', definition: 'Weighing expected returns against cost and risk before opening stores.' },
    ],
    recap: [
      'Pharmacity built a large network early; An Khang is backed by a retail group.',
      'Both struggled to turn coverage into profit.',
      'Restructuring and network reductions followed.',
      'Store economics matter more than store count.',
    ],
    chapterRecap: 'Pharmacity and An Khang illustrate the challenges of building a competitive pharmacy chain in a capital-intensive and operationally demanding market. Their long-term competitiveness depends on improving store economics, controlling costs, and developing a customer proposition that can be delivered consistently.',
    deepDiveTitle: 'What a restructuring can and cannot fix',
    body: <P4DeepDive paragraphs={[
      'Closing weak stores and renegotiating terms can improve average sales and cut losses quickly. It cannot create customer preference or a stronger proposition by itself.',
      'The recovery then depends on whether the remaining stores offer something customers choose over rivals, and on opening new stores only where payback is realistic.' ]} evidence="The seven activities are described qualitatively in the supplied material. Pharmacity figures are from a company press release, The Investor and CafeF; An Khang figures are from Vietcap and Vietnamese financial news; sources differ on store counts and dates." />,
    sources: citeP4('pharmacityPress', 'investorPharmacity', 'cafefPharmacity', 'shsPharmacy', 'vietcapRace', 'anKhang2025'),
  }),
  p4Chapter({
    title: 'Other Competitors and Independent Pharmacy Networks', chapterTitle: LESSON, readingTime: '6',
    objective: 'Describe the regional chains and independents that compete beyond the three largest chains.',
    mateIntro: 'Behind the big three are regional chains, small groups and tens of thousands of independent pharmacies, each strong in its own area.',
    keyInsight: 'The market contains several layers of competition. National chains compete through scale, regional chains through focused coverage, and independent pharmacies through local access and customer relationships.',
    statTiles: [
      { value: '7', label: 'Key competitor activities', subtitle: 'Trung Sơn to competitive monitoring', description: 'Trung Sơn Pharma, independents, smaller chains, regional specialisation, local service differentiation, partnerships and acquisitions, and competitive monitoring.' },
      { value: '230+', label: 'Trung Sơn Pharma pharmacies in the south', subtitle: 'Press report', description: 'The largest chain in the Mekong Delta by the press account.' },
      { value: '126 / 64', label: 'Guardian and Medicare pharmacies in 2025', subtitle: 'Q&Me survey', description: 'Smaller organised chains with limited networks.' },
    ],
    statsNote: 'The first tile is a count from this lesson; the store counts are press and survey figures, and sources differ for some chains, for example Phano at 14 in the Q&Me survey and 37 in a March 2025 press report.',
    narrative: [
      { label: 'What it is', text: 'Vietnam’s competitive landscape extends beyond the largest national chains. Regional operators such as Trung Sơn Pharma, smaller organised groups and independent community pharmacies add coverage and competition, and may be strong in a region, in local relationships or in a specialised segment even with smaller networks. Independents stay important because they serve neighbourhood demand, while regional chains can build scale in selected areas without competing nationwide, so strength depends on local density, supplier access, customer trust and execution as well as national store count.' },
      { label: 'Why it is happening', text: 'Medicine is a local purchase, and understanding a region’s demand, suppliers and rivals lets smaller players hold their ground. Focused chains also avoid the heavy cost of nationwide expansion.' },
      { label: 'Real-world example', text: 'Trung Sơn Pharma builds on regional expertise and focused expansion, with outside investment; independents compete through convenient sites, relationships and knowledge of local buying; smaller chains use shared brand, procurement and procedures over a limited network; operators concentrate where they understand demand and suppliers; local stores differentiate with dependable stock, responsive service and sound guidance; partnerships or acquisitions may speed expansion where viable and legal; and operators track local openings, closures, availability and feedback.' },
      { label: 'Vietnam example', text: 'Trung Sơn Pharma had more than 230 pharmacies across the Mekong Delta and Ho Chi Minh City in 2025, after Korea’s Dongwha bought 51% in 2023 for about US$30 million, and opened a pharmacy and convenience-store model with GS25. Press reports of Vietdata figures show its 2023 revenue fell about 7% and it made a net loss of nearly VND 60 billion. Q&Me counted 126 Guardian, 64 Medicare and 12 Matsumoto Kiyoshi stores in 2025, and Vietcap says about 95% of more than 50,000 pharmacies are traditional.' },
      { label: 'Business impact', text: 'Regional operators and independent pharmacies remain important components of Vietnam’s pharmacy retail market. Their competitive position depends on local knowledge, service quality, and operational discipline, while organized chains continue to intensify competition through scale and standardized systems.' },
    ],
    visualKind: 'pharmacy-m4-23-others', visualHeading: 'Seven kinds of other competitor',
    visualIntro: 'See seven kinds of other competitor as cards and what each wins through.',
    imageAlt: 'Casemate cards showing seven kinds of other competitor in Vietnam pharmacy retail',
    keyTerms: [
      { term: 'Regional chain', definition: 'A chain concentrated in one part of the country.' },
      { term: 'Local density', definition: 'How many stores a chain has within a given local area.' },
      { term: 'Regional specialisation', definition: 'Concentrating expansion where the operator understands demand and suppliers.' },
      { term: 'Competitive monitoring', definition: 'Tracking rivals’ openings, closures, availability and feedback.' },
    ],
    recap: [
      'Regional and smaller operators add competition beyond the national chains.',
      'Independents serve neighbourhood demand and keep customers through relationships.',
      'Regional chains can build scale without going national.',
      'Strength depends on local density, supply, trust and execution.',
    ],
    chapterRecap: 'Regional operators and independent pharmacies remain important components of Vietnam’s pharmacy retail market. Their competitive position depends on local knowledge, service quality, and operational discipline, while organized chains continue to intensify competition through scale and standardized systems.',
    deepDiveTitle: 'Why local monitoring beats looking only at national rivals',
    body: <P4DeepDive paragraphs={[
      'A new chain store opening two streets away matters more to a local pharmacy than a national chain’s total store count. Tracking nearby openings, closings, stock and prices shows real threats and openings.',
      'A simple monthly checklist of local rivals and customer feedback lets small operators respond quickly with service or range changes.' ]} evidence="The seven activities are described qualitatively in the supplied material. Store counts are from a Q&Me survey reproduction, a VnExpress report, Vietnamese business press reports of Vietdata figures and Vietcap research; sources differ for some chains." />,
    sources: citeP4('vnexpressGs25', 'pharmacyPlayers', 'qmeSeries', 'vietcapTraditional', 'shsPharmacy'),
  }),
];

const quiz = p4Quiz('pharmacy-m4-l2', [
  { chapter: '1', objective: 'State Long Châu’s real advantage', question: 'What is Long Châu’s competitive advantage not simply?', application: 'A competitor copies its store count. Will that match it?', correct: 'The number of stores it operates; it also depends on productivity, reliable supply and trusted services', wrong: ['Only its logo', 'Only its prices', 'Only its opening hours'], explanation: 'Scale must be productive. Review Chapter 1.' },
  { chapter: '1', objective: 'Recall the group link', question: 'Which retail group operates Long Châu?', application: 'An analyst traces the chain’s owner. Which group is it?', correct: 'FPT Retail', wrong: ['Mobile World Investment Corporation', 'Masan', 'Dongwha'], explanation: 'Long Châu operates under FPT Retail. Review Chapter 1.' },
  { chapter: '1', objective: 'Explain store productivity', question: 'Why is sales per store important when assessing a large network?', application: 'A chain has many stores but low sales per store. What does it show?', correct: 'Reach creates value only if each outlet sells enough to cover staff, rent, stock and other costs', wrong: ['Store count is all that matters', 'Low sales are fine', 'Rent does not matter'], explanation: 'Productivity sustains expansion. Review Chapter 1.' },
  { chapter: '1', objective: 'Manage expansion risk', question: 'What should Long Châu avoid when expanding?', application: 'Leadership plans many new stores. What risk must it manage?', correct: 'Relying on store-count growth without assessing local demand and payback periods', wrong: ['Checking local demand', 'Measuring payback', 'Tracking store results'], explanation: 'Discipline is needed. Review Chapter 1.' },
  { chapter: '2', objective: 'State the lesson of Pharmacity and An Khang', question: 'What do Pharmacity and An Khang highlight?', application: 'Two chains opened many stores but lost money. What does it show?', correct: 'The importance of profitable growth rather than expansion for its own sake', wrong: ['That store count guarantees profit', 'That chains cannot work', 'That price is irrelevant'], explanation: 'Profit matters more than size. Review Chapter 2.' },
  { chapter: '2', objective: 'Describe network optimisation', question: 'What does network optimisation involve?', application: 'A chain reviews its weakest stores. What may it do?', correct: 'Closing, relocating or restructuring outlets that do not meet commercial or strategic requirements', wrong: ['Opening stores everywhere', 'Ignoring store results', 'Raising prices on all products'], explanation: 'It prunes weak sites. Review Chapter 2.' },
  { chapter: '2', objective: 'Recall the revised Pharmacity target', question: 'What store target does Pharmacity now state for 2030?', application: 'A report cites Pharmacity’s growth plan. What is it?', correct: '2,000 to 2,300 stores, well below its earlier ambition of 5,000 by 2025', wrong: ['5,000 stores by 2025', 'Fewer than 500 stores', 'No target'], explanation: 'It shifted from growth at all costs. Review Chapter 2.' },
  { chapter: '3', objective: 'State the competitive layers', question: 'What are the layers of competition in the market?', application: 'An analyst focuses only on national chains. What is missing?', correct: 'National chains compete on scale, regional chains on focused coverage and independents on local access and relationships', wrong: ['Only national chains compete', 'Only independents compete', 'Regional chains do not exist'], explanation: 'The market has several layers. Review Chapter 3.' },
  { chapter: '3', objective: 'Recall Trung Sơn’s investor', question: 'Which foreign investor bought 51% of Trung Sơn Pharma in 2023?', application: 'A report discusses outside investment in a regional chain. Who invested?', correct: 'Dongwha of Korea', wrong: ['Walgreens', 'FPT Retail', 'Masan'], explanation: 'Investment helped regional growth. Review Chapter 3.' },
  { chapter: '3', objective: 'Explain local monitoring', question: 'What should small operators track?', application: 'An independent wants to respond to rivals. What should it watch?', correct: 'Local openings, closures, product availability and customer feedback', wrong: ['Only national store counts', 'Only advertising spend', 'Nothing'], explanation: 'Local signals matter most. Review Chapter 3.' },
]);

export const LESSON_P4_2: PharmacyM4LessonBundle = {
  deck,
  quiz,
  takeaways: {
    learned: 'You can describe Long Châu’s scale-driven model, the contrasting paths of Pharmacity and An Khang, and the roles of regional chains and independent pharmacies.',
    keyTakeaways: [
      'Long Châu’s advantage combines expansion with store productivity and trusted service.',
      'Reach creates value only if each store is productive.',
      'Pharmacity and An Khang show that store count is not strength.',
      'Regional chains compete on focus; independents on local access and trust.',
      'Strength depends on local density, supply access and execution.',
    ],
    businessImplications: 'Benchmark competitors on productivity as well as size, expand only where payback is realistic and watch local rivals as closely as national ones.',
    remember: 'Profitable growth beats the biggest network.',
    nextLesson: 'Competitor Benchmarking',
  },
};
