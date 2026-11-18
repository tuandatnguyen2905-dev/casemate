import { C4DeepDive, citeC4, c4Chapter, c4Quiz } from './coffeeM4Core';
import type { CoffeeM4LessonBundle } from './coffeeM4Core';

const LESSON = '2. Key Industry Players';

const deck = [
  c4Chapter({
    title: 'Highlands Coffee and Trung Nguyên', chapterTitle: LESSON, readingTime: '7',
    objective: 'Compare the models of Highlands Coffee and Trung Nguyên and explain what each uses as its main source of advantage.',
    mateIntro: 'One brand won by being on every street. The other won by turning Vietnamese coffee itself into a brand story.',
    keyInsight: 'Local heritage can be a source of competitive advantage, but brands must translate it into a relevant customer experience. Scale, cultural identity, and a consistent product proposition are complementary strategic assets when supported by strong execution.',
    statTiles: [
      { value: '5', label: 'Key activities of the two brands', subtitle: 'Highlands, Legend, E-Coffee, portfolio, network', description: 'Highlands Coffee, Trung Nguyên Legend, Trung Nguyên E-Coffee, product portfolio development and network expansion.' },
      { value: '985 vs ~106', label: 'Highlands stores and Trung Nguyên Legend stores around end-2025', subtitle: 'The Viet Media and VietnamBiz', description: 'Legend’s count includes one store in Cambodia and one in Thailand.' },
      { value: 'VND 1,097B', label: 'Highlands’ reported EBITDA for 2025', subtitle: 'Agro.gov.vn, reporting the chain’s results', description: 'Reported as the largest among Vietnamese beverage chains.' },
    ],
    statsNote: 'The first tile is a count from this lesson. Store counts are tied to the dates in each source, and no public financial results for Trung Nguyên were found.',
    narrative: [
      { label: 'What it is', text: 'Highlands Coffee and Trung Nguyên represent two influential Vietnamese coffee business models. Highlands Coffee emphasizes an accessible, standardized café experience supported by a broad store network, while Trung Nguyên combines Vietnamese coffee heritage with a more differentiated brand proposition centered on coffee culture, expertise, and premium experiences.' },
      { label: 'Why it is happening', text: 'Their competitive strengths differ. Highlands benefits from scale and everyday accessibility, while Trung Nguyên leverages established coffee associations and multiple retail concepts, including Trung Nguyên Legend and E-Coffee. These formats target different customer occasions and price expectations.' },
      { label: 'Real-world example', text: 'Highlands competes through a broad store network, familiar Vietnamese coffee products, standardized operations and accessible café formats. Trung Nguyên Legend builds a distinctive position around Vietnamese coffee culture, premium experiences and brand storytelling, while E-Coffee uses a more accessible, partnership-oriented format to extend reach. Both combine traditional coffee with modern beverages and complementary food, and both use location selection, brand recognition and standardized processes to reach customers across markets.' },
      { label: 'Vietnam example', text: 'Highlands ran 985 stores at the end of 2025, with revenue up nearly 16%, EBITDA reported at about VND 1.1 trillion and same-store sales up over 8%, and opened its 1,000th outlet in June 2026. At the end of September 2025 it had 928 outlets, 800 company-owned and 128 franchised, and Jollibee Foods holds 60% of the company that owns the operator; it also opened a VND 500 billion roastery and Vietnam’s first drive-through in 2025. BBC reporting describes Highlands as starting as a luxury chain before cutting prices. Trung Nguyên opened cafés in clusters of three in 1998 to advertise its brand, lists about 106 Legend stores plus 17 Coffee World stores, runs about 30 stores in China and 9 in the United States, and has concentrated on exports, while E-Coffee runs roughly 800 franchise stores with a zero-fee policy and formats from about four square metres. One VietnamBiz article describes Highlands as expanding mainly through franchising, but parent-group counts show about 14% of stores franchised, so that description is not supported.' },
      { label: 'Business impact', text: 'Highlands Coffee and Trung Nguyên demonstrate how local brands can compete through different combinations of scale, accessibility, cultural identity, and format diversification. Their positioning depends on matching these strengths to specific customer segments.' },
    ],
    visualKind: 'coffee-m4-21-local', visualHeading: 'Two local models side by side',
    visualIntro: 'Compare Highlands and Trung Nguyên on proposition, formats, network focus and evidence of results.',
    imageAlt: 'Casemate comparison of Highlands Coffee and Trung Nguyên business models',
    keyTerms: [
      { term: 'Standardised operations', definition: 'Common recipes, training and processes applied across all stores.' },
      { term: 'Heritage brand', definition: 'A brand built on a long-standing cultural association, here Vietnamese coffee.' },
      { term: 'Company-owned store', definition: 'A store owned and run by the brand owner rather than a franchisee.' },
      { term: 'Drive-through', definition: 'A service lane where customers order and collect from a vehicle.' },
    ],
    recap: [
      'Highlands competes on scale, accessibility and standard operations.',
      'Trung Nguyên competes on coffee heritage, premium Legend stores and E-Coffee reach.',
      'Highlands is mostly company-owned; E-Coffee is franchise-led.',
      'Heritage and scale work only with strong execution.',
    ],
    chapterRecap: 'Highlands Coffee and Trung Nguyên demonstrate how local brands can compete through different combinations of scale, accessibility, cultural identity, and format diversification. Their positioning depends on matching these strengths to specific customer segments.',
    deepDiveTitle: 'Why the same market can support a mass brand and a heritage brand',
    body: <C4DeepDive paragraphs={[
      'A mass brand sells convenience: the same dependable drink close to where customers live and work. A heritage brand sells meaning: a reason to value Vietnamese coffee itself, at a higher price or in a special setting.',
      'Each needs different capabilities. The mass brand needs site selection, standard processes and supply scale; the heritage brand needs authenticity, product depth and a store that carries the story.' ]} evidence="Highlands counts and results are from The Viet Media, VietData reporting Jollibee Foods Corporation, Agro.gov.vn and The Investor; its roastery and drive-through are from VietnamBiz; Trung Nguyên counts are from VietnamBiz reading the company website and E-Coffee terms from VIR and The Investor; the 1998 cluster strategy is from a Columbia Business School case; the franchise description is from a VietnamBiz article read as a search excerpt. The contrast between mass and heritage models is our own framing." />,
    sources: citeC4('vietmediaSplit', 'vietdataHighlands', 'agroMilano', 'highlandsRoastery', 'vietnambizShakeout', 'columbiaTrungNguyen', 'virNewModels', 'investorEcoffee', 'bbcStarbucks', 'vietnambizHighlandsPhucLong'),
  }),
  c4Chapter({
    title: 'Phúc Long, Katinat, and The Coffee House', chapterTitle: LESSON, readingTime: '7',
    objective: 'Contrast the trajectories of Phúc Long, Katinat and The Coffee House and read store-count figures with care.',
    mateIntro: 'Three brands started with strong images. One kept growing, one grew with a very distinctive look, and one had to shrink.',
    keyInsight: 'A strong brand and attractive store concept do not guarantee sustainable growth. Store productivity, repeat purchasing, cost discipline, and the ability to adapt to customer expectations are essential to maintaining a competitive position.',
    statTiles: [
      { value: '5', label: 'Key activities of the three brands', subtitle: 'Brand approaches to portfolio optimization', description: 'Phúc Long, Katinat, The Coffee House, menu and brand differentiation, and portfolio optimization.' },
      { value: '237 (+79)', label: 'Phúc Long stores at end-2025 and net additions in the year', subtitle: 'The Viet Media and DNSE', description: 'About 50% growth, counting WinMart kiosks; another count gives nearly 200 outside WinMart.' },
      { value: '93 to 48', label: 'The Coffee House stores at Golden Gate takeover and later', subtitle: 'VietnamBiz', description: 'The same article also says over 80, so treat counts as snapshots.' },
    ],
    statsNote: 'The first tile is a count from this lesson. Store counts differ by date and by whether kiosks are included: The Coffee House is also reported at 94 at end-2024 and 78 at end-2025 by other sources.',
    narrative: [
      { label: 'What it is', text: 'Phúc Long, Katinat, and The Coffee House illustrate different approaches to competition in Vietnam’s modern beverage market. Phúc Long combines tea and coffee within a recognizable retail concept, Katinat has expanded through visually distinctive cafés and contemporary beverage positioning, while The Coffee House has faced significant restructuring and store-network contraction.' },
      { label: 'Why it is happening', text: 'Reported store counts illustrate how differently these brands have performed. A 2025 industry review reported continued expansion among Phúc Long and Katinat, while The Coffee House reduced its footprint substantially. Such figures vary by reporting date and source, so they should be treated as snapshots rather than permanent rankings.' },
      { label: 'Real-world example', text: 'Phúc Long combines tea-led differentiation with coffee and complementary food; Katinat uses distinctive store design, contemporary branding and product innovation to attract urban consumers; and The Coffee House shows the challenge of keeping a large café network when store performance and the operating model need restructuring. All three develop signature products, recognisable packaging and consistent brand experiences, and review store performance, locations and formats to improve commercial viability.' },
      { label: 'Vietnam example', text: 'Phúc Long, 85% owned by Masan, added 79 stores to reach 237, using WinMart kiosks, and reported 2025 revenue of nearly VND 1,900 billion, net profit of VND 195 billion above a 10% margin and daily revenue of VND 22.8 million per store; in the second quarter of 2026 revenue rose 26.9% and daily revenue per standard store reached VND 26.2 million, with 220 standalone outlets. Its Unicorn format balances milk tea, coffee, fruit tea and ice-blended drinks, and cakes, ice cream and yoghurt are described as key growth drivers. Katinat went from 93 stores in January 2025 to 114, does not franchise, targets 120 in 2026, and commentators say its best-sellers are milk tea and fruit tea and that a check-in-led model may be hard to sustain beyond three to four years. The Coffee House peaked near 150 stores, was bought by Golden Gate in January 2025 for a provisional VND 270 billion, and later reports give 48, over 80 or 78 stores.' },
      { label: 'Business impact', text: 'These brands highlight the importance of differentiation and execution. Expansion is sustainable only when the concept continues to attract customers and generate sufficient returns across individual outlets.' },
    ],
    visualKind: 'coffee-m4-22-brands', visualHeading: 'Three brands, three trajectories',
    visualIntro: 'Compare each brand’s approach and its reported store-count snapshot.',
    imageAlt: 'Casemate table comparing Phúc Long, Katinat and The Coffee House approaches and store counts',
    keyTerms: [
      { term: 'Kiosk', definition: 'A small counter-style outlet, such as those inside WinMart supermarkets.' },
      { term: 'Store-count snapshot', definition: 'A number tied to a particular date and definition, not a permanent ranking.' },
      { term: 'Restructuring', definition: 'Reorganising a business, often by closing weak outlets and changing the model.' },
      { term: 'Check-in trend', definition: 'Customers visiting a place for photos and social sharing.' },
    ],
    recap: [
      'Phúc Long grew by combining tea heritage, food and supermarket kiosks.',
      'Katinat grew through distinctive, company-run stores.',
      'The Coffee House shrank and was sold to Golden Gate.',
      'Store counts are snapshots that differ by date and source.',
    ],
    chapterRecap: 'These brands highlight the importance of differentiation and execution. Expansion is sustainable only when the concept continues to attract customers and generate sufficient returns across individual outlets.',
    deepDiveTitle: 'Why three different counts for one chain are a signal, not a mistake',
    body: <C4DeepDive paragraphs={[
      'A count can differ because of the date, because kiosks are included or not, or because franchised or closing stores are treated differently. For The Coffee House, VietnamBiz alone gives 48 and over 80 in different paragraphs, and another site gives 78.',
      'The sensible approach is to state the source and date for every count, flag conflicts and use the direction of change, not a single number, to judge a chain.' ]} evidence="Phúc Long counts are from The Viet Media, DNSE summarising Q&Me and VietnamBiz; results are from Vietnam.vn reporting Masan and The Investor; Masan’s 85% stake is from a VietnamBiz article read as a search excerpt; Katinat details are from Vinalink and Sapo commentary read as excerpts; The Coffee House facts are from VietnamBiz, Vietstock and VIR. The Golden Gate price is provisional as reported." />,
    sources: citeC4('vietmediaSplit', 'dnseChains', 'vietnambizShakeout', 'phucLongResults', 'investorLargerPlayers', 'vietnambizHighlandsPhucLong', 'katinatProfile', 'katinatNoFranchise', 'vietstockDrinks', 'virNewModels'),
  }),
  c4Chapter({
    title: 'International Brands and Broader Foodservice Competitors', chapterTitle: LESSON, readingTime: '6',
    objective: 'Define the competitive set by consumption occasion and place Starbucks and adjacent formats within it.',
    mateIntro: 'A morning coffee can be bought at a café, a fast-food counter, a bakery or a convenience store. The customer does not care which category the seller belongs to.',
    keyInsight: 'The relevant competitive set depends on the customer occasion, not merely the product category. Coffeehouses must compete against any alternative that satisfies the same need for refreshment, convenience, social interaction, or a meal.',
    statTiles: [
      { value: '6', label: 'Key competitor types', subtitle: 'Starbucks to cross-category competition', description: 'Starbucks, quick-service restaurants, bakery cafés, convenience stores, independent specialty cafés and cross-category competition.' },
      { value: '150', label: 'Starbucks stores in Vietnam around end-2025', subtitle: 'The Viet Media and VietnamBiz', description: 'The third-largest chain by store count in Vietnam, according to VietnamBiz.' },
      { value: '500–600', label: 'Starbucks stores in Thailand', subtitle: 'VietnamBiz', description: 'Vietnam’s count is about a quarter of Thailand’s.' },
    ],
    statsNote: 'The first tile is a count from this lesson. Starbucks is also reported at 127, 139 and 147 stores by other trackers at other dates, and no Vietnam data on convenience-store or fast-food coffee sales was found.',
    narrative: [
      { label: 'What it is', text: 'International brands such as Starbucks compete through premium positioning, global brand recognition, product customization, and standardized service. Meanwhile, quick-service restaurant operators, bakery chains, convenience stores, and local restaurants compete for overlapping consumption occasions, including breakfast, snacks, coffee breaks, meals, and social gatherings.' },
      { label: 'Why it is happening', text: 'Competition therefore extends beyond businesses that define themselves as coffee chains. Consumers may substitute a café visit with a fast-food breakfast, a convenience-store drink, a bakery purchase, or a beverage ordered for delivery.' },
      { label: 'Real-world example', text: 'Starbucks competes through premium brand associations, customization, store experience and a standardized international proposition. Quick-service restaurants offer coffee, breakfast, snacks and meals with efficient systems; bakery cafés combine drinks with pastries and light meals; convenience stores provide accessible drinks and packaged food; and independent specialty cafés differentiate through craft, local identity and personalised service. Across categories they compete for the same budget, location, daypart and digital order.' },
      { label: 'Vietnam example', text: 'VietnamBiz reports Starbucks growing from 125 stores in January 2025 to about 150 by year-end, while other trackers give 104 to 127 and 119 to 139 for parts of the year, so counts depend on date. It opened five stores in the Mekong Delta in mid-2025, planned a university store, is led by a Vietnamese chief executive and has added salt coffee, coconut coffee and matcha, a change from its earlier reluctance to localise. Momentum Works reports Starbucks at over 2,000 stores in Southeast Asia, and a 2023 BBC article put a medium drink near VND 90,000. Milano Coffee, reported at about 2,500 outlets mostly through agents, is a very different kind of competitor, and Mixue-style tea chains sell cups from VND 25,000 down to 8,000 in promotions. No Vietnam data on convenience-store or quick-service coffee sales was found.' },
      { label: 'Business impact', text: 'Coffeehouse competition includes both direct café rivals and adjacent foodservice formats. Competitive analysis should focus on the alternatives customers actually consider for each consumption occasion.' },
    ],
    visualKind: 'coffee-m4-23-adjacent', visualHeading: 'Who competes for the same occasion',
    visualIntro: 'See six kinds of competitor around the customer occasion and what each competes on.',
    imageAlt: 'Casemate map of international and adjacent foodservice competitors around the customer occasion',
    keyTerms: [
      { term: 'Consumption occasion', definition: 'The situation in which a product is bought and used.' },
      { term: 'Substitution', definition: 'Choosing a different product that meets the same need.' },
      { term: 'Localisation', definition: 'Adapting products and operations to local tastes and habits.' },
      { term: 'Daypart', definition: 'A part of the day such as morning, lunch or evening.' },
    ],
    recap: [
      'International brands compete on premium positioning and standard service.',
      'Fast food, bakeries and convenience stores compete for the same occasions.',
      'The competitive set depends on the occasion, not the category.',
      'Starbucks counts differ by tracker and date.',
    ],
    chapterRecap: 'Coffeehouse competition includes both direct café rivals and adjacent foodservice formats. Competitive analysis should focus on the alternatives customers actually consider for each consumption occasion.',
    deepDiveTitle: 'How to build a competitor list from the occasion up',
    body: <C4DeepDive paragraphs={[
      'Start with the occasion, for example a quick weekday breakfast. List every option a customer could use, from a fast-food counter to a convenience-store drink, then ask which can match the time, price and place.',
      'The resulting list is often different from the list of coffee chains, and it can show that the closest rival is not the one the industry watches most closely.' ]} evidence="Starbucks counts are from VietnamBiz, The Viet Media, DNSE and Vietstock; its localisation and Mekong Delta openings are from VietnamBiz; regional counts are from VietnamPlus reporting Momentum Works; the price point is from the BBC in 2023; Milano is from Agro.gov.vn; Mixue prices are from The Viet Media. The method is our own illustration and no Vietnam data on adjacent formats was found." />,
    sources: citeC4('vietnambizShakeout', 'vietmediaSplit', 'dnseChains', 'vietstockRepositioning', 'vietnamplusRegional', 'bbcStarbucks', 'agroMilano'),
  }),
];

const quiz = c4Quiz('coffee-m4-l2', [
  { chapter: '1', objective: 'Contrast the two brands', question: 'What is the main source of advantage for Highlands Coffee, compared with Trung Nguyên?', application: 'A student asks how the two differ. What is the contrast?', correct: 'Highlands uses scale and everyday accessibility; Trung Nguyên uses coffee heritage and differentiated formats', wrong: ['Highlands uses only exports', 'Trung Nguyên has more stores in Vietnam', 'Both rely on franchising only'], explanation: 'Different mixes of scale and identity. Review Chapter 1.' },
  { chapter: '1', objective: 'Recall the ownership mix', question: 'At end-September 2025, how many of Highlands’ 928 outlets were franchised?', application: 'A source calls Highlands franchise-led. What do the counts show?', correct: '128, so most stores were company-owned', wrong: ['800', '928', 'None'], explanation: 'About 14% were franchised. Review Chapter 1.' },
  { chapter: '1', objective: 'Describe E-Coffee', question: 'What does Trung Nguyên’s E-Coffee offer?', application: 'A founder wants a low-cost format. What does E-Coffee provide?', correct: 'An accessible, partnership-oriented format with a zero-fee policy and small footprints', wrong: ['A premium flagship only', 'A delivery-only app', 'A tea factory'], explanation: 'It extends reach at lower entry cost. Review Chapter 1.' },
  { chapter: '2', objective: 'State the sustainability rule', question: 'What do a strong brand and an attractive store concept guarantee?', application: 'A chain expands on image alone. What is missing?', correct: 'Neither guarantees sustainable growth; productivity, repeat purchase and cost discipline are essential', wrong: ['Guaranteed growth', 'Guaranteed profit', 'Guaranteed loyalty'], explanation: 'Execution decides. Review Chapter 2.' },
  { chapter: '2', objective: 'Recall Phúc Long growth', question: 'How many stores did Phúc Long add in 2025, according to The Viet Media?', application: 'An analyst checks growth. What was added?', correct: '79, reaching 237', wrong: ['7', '790', '2'], explanation: 'Counts include WinMart kiosks. Review Chapter 2.' },
  { chapter: '2', objective: 'Note Katinat’s model', question: 'How does Katinat run its stores?', application: 'A founder asks if Katinat franchises. What is reported?', correct: 'It does not franchise and operates its stores directly', wrong: ['All stores are franchised', 'Only kiosks are operated directly', 'It has no stores'], explanation: 'Company-run for consistency. Review Chapter 2.' },
  { chapter: '2', objective: 'Handle conflicting counts', question: 'Why are The Coffee House store counts treated as snapshots?', application: 'Sources give 48, over 80 and 78. What should an analyst do?', correct: 'Counts differ by date and source, so each should be tied to its source and conflicts flagged', wrong: ['Choose the largest silently', 'Average them', 'Ignore the brand'], explanation: 'Snapshots, not rankings. Review Chapter 2.' },
  { chapter: '3', objective: 'State the competitive set rule', question: 'What decides the relevant competitive set?', application: 'A café lists only coffee chains as rivals. What is missing?', correct: 'The customer occasion, not merely the product category', wrong: ['The company’s legal name', 'The size of the logo', 'The number of employees'], explanation: 'Substitutes serve the same need. Review Chapter 3.' },
  { chapter: '3', objective: 'Recall Starbucks’ scale', question: 'Roughly how many Starbucks stores did Vietnam have around end-2025?', application: 'An analyst sizes the international premium player. What is the count?', correct: 'About 150', wrong: ['About 15', 'About 1,500', 'About 15,000'], explanation: 'Other trackers give lower counts at other dates. Review Chapter 3.' },
  { chapter: '3', objective: 'Note an evidence gap', question: 'What did the research find on convenience-store and quick-service coffee sales in Vietnam?', application: 'A deck quotes their market share. Is there a source?', correct: 'No public Vietnam data was found', wrong: ['They hold 50% of the market', 'They have no coffee sales', 'They are banned'], explanation: 'Gaps are stated explicitly. Review Chapter 3.' },
]);

export const LESSON_C4_2: CoffeeM4LessonBundle = {
  deck,
  quiz,
  takeaways: {
    learned: 'You can compare the main Vietnamese and international coffee brands and define a competitive set by occasion.',
    keyTakeaways: [
      'Highlands competes on scale and accessibility; Trung Nguyên on heritage and format diversity.',
      'Brand and store concept do not guarantee growth; store returns do.',
      'Phúc Long and Katinat grew while The Coffee House shrank.',
      'The competitive set depends on the occasion, not the category.',
      'Store counts are dated snapshots that differ by source.',
    ],
    businessImplications: 'Benchmark rivals by occasion, check dates and definitions on every count and judge brands by outlet returns.',
    remember: 'A brand is judged by what each store earns, not by how many it opens.',
    nextLesson: 'Competitor Benchmarking',
  },
};
