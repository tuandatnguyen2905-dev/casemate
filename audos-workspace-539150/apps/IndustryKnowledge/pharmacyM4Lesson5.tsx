import { P4DeepDive, citeP4, p4Chapter, p4Quiz } from './pharmacyM4Core';
import type { PharmacyM4LessonBundle } from './pharmacyM4Core';

const LESSON = '5. SWOT & Strategic Challenges';

const deck = [
  p4Chapter({
    title: 'SWOT Analysis of Vietnam’s Pharmacy Retail Industry', chapterTitle: LESSON, readingTime: '6',
    objective: 'Summarise the industry’s strengths, weaknesses, opportunities and threats, and match them to each business model.',
    mateIntro: 'A SWOT puts the whole lesson on one page. Its value is in the choices it forces, not in the list itself.',
    keyInsight: 'Demand growth is an opportunity, not a guarantee of profitability, so success depends on turning growth into sustainable performance.',
    statTiles: [
      { value: '6', label: 'Parts of the SWOT view', subtitle: 'Strengths to SWOT application', description: 'Strengths, weaknesses, opportunities, threats, strategic assessment by business model and application to growth investment.' },
      { value: '~14%', label: 'Estimated share of modern pharmacies in 2024', subtitle: 'Vietcap estimate', description: 'The rest is mainly traditional independent outlets.' },
      { value: '3,475', label: 'Modern pharmacies in the second quarter of 2025', subtitle: 'KIS Vietnam count', description: 'Described by the broker as entering a consolidation phase.' },
    ],
    statsNote: 'The first tile is a count of parts from this lesson; the modern-pharmacy share is a broker estimate and the 3,475 count is a different publisher’s count from the 3,457 Q&Me figure, so do not mix them.',
    narrative: [
      { label: 'What it is', text: 'A SWOT analysis sorts the industry’s internal and external factors into strengths, weaknesses, opportunities and threats. Strengths include essential and recurring demand, the pharmacist’s role and the potential to standardise. Weaknesses include a fragmented market, uneven capabilities, inventory complexity and thin technology budgets for small operators. Opportunities include modern network growth, better systems, convenient services and stronger quality controls. Threats include price competition, rising costs, supply disruption, rule changes, staffing pressure and unprofitable expansion.' },
      { label: 'Why it is happening', text: 'Health spending, ageing and chronic disease create steady demand, while a fragmented base and heavy regulation mean capability gaps and compliance burdens. Growth in demand therefore does not reach every operator equally.' },
      { label: 'Real-world example', text: 'A chain assesses where its strengths in scale, supply systems and data meet opportunities in underserved areas, and where weaknesses in staffing or store economics meet threats from price competition, then matches its growth investment to the capabilities it really has.' },
      { label: 'Vietnam example', text: 'Vietcap estimates modern pharmacies at about 14% of the market in 2024 and says about 95% of more than 50,000 outlets are traditional; KIS counted 3,475 modern pharmacies in the second quarter of 2025. The World Bank reports that pharmaceuticals were about 75% of out-of-pocket health spending in 2022, and VietnamPlus reports 14.2 million people aged 60 and over in 2024, which supports demand. Threats show in An Khang’s accumulated losses of VND 1,115.3 billion and in the 2024 amendments to the Law on Pharmacy, which tightened conditions for chains and online sales.' },
      { label: 'Business impact', text: 'The SWOT shows that demand is not the constraint; execution is. Chains need scale and efficiency, independents need local relationships and discipline, and each should invest where its real advantage lies.' },
    ],
    visualKind: 'pharmacy-m4-51-swot', visualHeading: 'SWOT of Vietnam’s pharmacy retail industry',
    visualIntro: 'Read the four SWOT cards, then the assessment by business model and the application to investment.',
    imageAlt: 'Casemate cards summarising the SWOT of Vietnam pharmacy retail',
    keyTerms: [
      { term: 'SWOT analysis', definition: 'A summary of strengths, weaknesses, opportunities and threats.' },
      { term: 'Modern pharmacy', definition: 'A pharmacy in an organised chain, as opposed to a traditional independent outlet.' },
      { term: 'Consolidation', definition: 'The market becoming more concentrated as larger operators grow.' },
      { term: 'Out-of-pocket spending', definition: 'Health costs paid directly by households.' },
    ],
    recap: [
      'Strengths centre on essential, recurring demand and professional credibility.',
      'Weaknesses are fragmentation, uneven capability and inventory complexity.',
      'Opportunities come from modern networks, systems and quality.',
      'Threats include price competition, cost, supply, rules and unprofitable growth.',
    ],
    chapterRecap: 'The SWOT shows that demand is not the constraint; execution is. Chains need scale and efficiency, independents need local relationships and discipline, and each should invest where its real advantage lies.',
    deepDiveTitle: 'How to use a SWOT to decide, not just describe',
    body: <P4DeepDive paragraphs={[
      'A list of factors is only the first step. The useful step is pairing them: which strength can capture which opportunity, and which weakness leaves the business exposed to which threat.',
      'The pairs that matter most become priorities, and the others are monitored. Without that choice, a SWOT stays a description.' ]} evidence="The SWOT items are described qualitatively in the supplied material. The modern share is a Vietcap estimate; the 3,475 count is from a KIS Vietnam review; out-of-pocket and ageing figures are from the World Bank and VietnamPlus; An Khang figures are from Vietnamese financial news." />,
    sources: citeP4('vietcapFrt', 'vietcapTraditional', 'kisRetail2q25', 'worldBankOop', 'vnplusAging', 'anKhang2025', 'law44Summary'),
  }),
  p4Chapter({
    title: 'Major Strategic Challenges for Pharmacy Retailers', chapterTitle: LESSON, readingTime: '7',
    objective: 'Identify the main strategic challenges and explain how they interact.',
    mateIntro: 'Each challenge looks manageable alone. The difficulty is that growth, cash, staff, rules and price pressure all pull on the same business at once.',
    keyInsight: 'The main strategic challenge is balancing growth with operational control, expanding capabilities at a pace that keeps operations safe, compliant and sustainable.',
    statTiles: [
      { value: '8', label: 'Strategic challenges', subtitle: 'Profitability to customer trust', description: 'Profitability versus expansion, inventory and working capital, workforce, regulatory compliance, price competition, supply-chain resilience, digital transformation and customer trust.' },
      { value: 'VND 1,115.3B', label: 'An Khang accumulated losses by end-2025', subtitle: 'Press report', description: 'After a loss of VND 112.96 billion in 2025.' },
      { value: '5,000 → 2,000–2,300', label: 'Pharmacity store goal: earlier ambition versus 2030 target', subtitle: 'The Investor', description: 'A shift from growth at all costs to selective expansion.' },
    ],
    statsNote: 'The first tile is a count of challenges from this lesson; the other tiles are press-reported figures, with Pharmacity’s earlier 5,000-store ambition dated to 2025 and its revised target to 2030.',
    narrative: [
      { label: 'What it is', text: 'Pharmacy retailers face eight linked challenges. New outlets must earn enough to cover operating expenses. Inventory must balance availability with holding cost and expiry. Qualified staff are hard to recruit and keep. Procedures, documents, staffing and dispensing must stay aligned with the rules. Price competition must offer value without damaging financial health. Supply chains face supplier concentration, shortages, delays and quality concerns. Digital systems must be integrated with privacy and security rules. And customer trust is lost quickly through unsupported claims or sales-first practices.' },
      { label: 'Why it is happening', text: 'Challenges compound. A chain that opens too fast strains staff, stock and compliance together, and weak profit then limits the cash it needs to fix them.' },
      { label: 'Real-world example', text: 'A chain with fast expansion sees new stores below plan, stock rising to keep availability, staff turnover affecting service and a compliance finding at one outlet, and must decide which problem to fix first while competitors cut prices.' },
      { label: 'Vietnam example', text: 'An Khang lost VND 112.96 billion in 2025 and has accumulated losses of VND 1,115.3 billion; Pharmacity went from over 1,100 stores to under 900 and back, and cut its 2030 target to 2,000–2,300 stores from 5,000 by 2025. Circular 11/2025 and Circular 30/2025 raised documentation and recall duties, the 2025 data protection law covers health information, and the 2024 pharmacy law amendments restrict online sales of certain medicines. Globally, Walgreens planned to close about 1,200 stores over three years, a reminder that scale does not guarantee success.' },
      { label: 'Business impact', text: 'The challenges are interdependent, so managing them one by one is not enough. Leaders need a view of how growth pace, cash, people, rules and trust interact, and should slow expansion when control weakens.' },
    ],
    visualKind: 'pharmacy-m4-52-challenges', visualHeading: 'Eight strategic challenges',
    visualIntro: 'See eight challenges on two sides of the centre and the risk each creates.',
    imageAlt: 'Casemate sides mind map of eight strategic challenges for pharmacy retailers',
    keyTerms: [
      { term: 'Working capital', definition: 'Cash tied up in stock and other short-term items.' },
      { term: 'Supplier concentration', definition: 'Dependence on a small number of suppliers.' },
      { term: 'Margin erosion', definition: 'A gradual fall in profit margin, often from price competition.' },
      { term: 'Operational control', definition: 'Keeping processes, stock, staff and compliance under management oversight.' },
    ],
    recap: [
      'Eight challenges interact and compound.',
      'Growth must be balanced with operational control.',
      'Price competition can erode margin if unmanaged.',
      'Trust is lost quickly through sales-first practices.',
    ],
    chapterRecap: 'The challenges are interdependent, so managing them one by one is not enough. Leaders need a view of how growth pace, cash, people, rules and trust interact, and should slow expansion when control weakens.',
    deepDiveTitle: 'Why growth should slow when control weakens',
    body: <P4DeepDive paragraphs={[
      'A chain can watch early warning signs such as rising stockouts, expiry write-offs, staff turnover and audit findings. If several rise together, it is a sign that expansion is outrunning control.',
      'Slowing openings at that point is a decision to protect existing stores. Chains that kept expanding through such signals are those that later closed stores or restructured.' ]} evidence="The eight challenges are described qualitatively in the supplied material. An Khang figures are from Vietnamese financial news; Pharmacity figures are from The Investor and a company press release; legal items are from official texts and law-firm and Drug Administration summaries; the Walgreens plan is from a credit analysis summary." />,
    sources: citeP4('anKhang2025', 'investorPharmacity', 'pharmacityPress', 'circular11', 'circular30', 'pdplLaw', 'law44Summary', 'walgreensCredit'),
  }),
  p4Chapter({
    title: 'Strategic Responses and Future Competitive Priorities', chapterTitle: LESSON, readingTime: '7',
    objective: 'Set out the strategic priorities that respond to the challenges and show how to measure them.',
    mateIntro: 'A priority without a measure is only an intention. Each response here comes with a way to tell whether it is working.',
    keyInsight: 'Future competition rewards execution quality over market presence, so retailers must prove their model delivers a clear proposition consistently and profitably.',
    statTiles: [
      { value: '9', label: 'Strategic priorities', subtitle: 'Core operations to strategic outcomes', description: 'Strengthen core operations, focus on store productivity, differentiate the proposition, develop workforce capability, use data, expand selectively, integrate digital services, strengthen risk management and measure strategic outcomes.' },
      { value: '2,000–2,300', label: 'Pharmacity stores targeted by 2030', subtitle: 'Company plan reported by The Investor', description: 'A selective path compared with the earlier 5,000-store ambition.' },
      { value: '+500', label: 'Stores Pharmacity plans over three years', subtitle: 'CafeF report', description: 'Tied to new store cohorts reaching break-even.' },
    ],
    statsNote: 'The first tile is a count of priorities from this lesson; the Pharmacity figures are plans reported by the press and may change.',
    narrative: [
      { label: 'What it is', text: 'Strategic responses turn the challenges into priorities. Retailers strengthen core operations through stock accuracy, replenishment, supplier management and cost control; focus on each outlet’s sales, profit and local demand; differentiate through range, service, convenience or professional support; train and retain staff; apply data to forecasting and assortment; expand only where demand and economics are realistic; integrate eligible digital services with stock visibility and controls; monitor rules, suppliers, quality and financial exposure; and track profit, inventory productivity, satisfaction, availability and compliance together.' },
      { label: 'Why it is happening', text: 'As the market consolidates, simply having stores no longer sets a chain apart. Customers, investors and regulators look at whether a model works store by store and whether it is run safely.' },
      { label: 'Real-world example', text: 'A chain sets a scorecard with stockout and expiry rates, sales and profit per store, satisfaction, training and turnover, forecast accuracy, payback of new stores, order fulfilment rate and audit findings, and reviews it with the board each quarter.' },
      { label: 'Vietnam example', text: 'Pharmacity reports profit from the fourth quarter of 2025, same-store sales growth above 20% in the first quarter of 2026 and a plan for 500 more stores in three years toward 2,000 to 2,300 by 2030, with new cohorts expected to break even. An Khang describes store quality, break-even and slower expansion as priorities. Long Châu pairs growth with store productivity, automated warehouse replenishment and eligible digital services, while Circular 11/2025 and the 2025 data protection law set the controls those digital services must meet.' },
      { label: 'Business impact', text: 'The winners will be the retailers that can show, with measures, that their model works consistently and profitably. Store count will matter less than productivity, availability, compliance and trust.' },
    ],
    visualKind: 'pharmacy-m4-53-responses', visualHeading: 'Nine priorities and how to measure them',
    visualIntro: 'Read nine priorities with what to do and how to measure each.',
    imageAlt: 'Casemate table of nine strategic priorities for pharmacy retailers and how to measure them',
    keyTerms: [
      { term: 'Balanced scorecard', definition: 'A set of measures covering profit, customers, operations and people.' },
      { term: 'Selective expansion', definition: 'Opening stores only where demand and economics are realistic.' },
      { term: 'Forecast accuracy', definition: 'How closely forecast demand matches actual sales.' },
      { term: 'Order fulfilment rate', definition: 'The share of orders delivered complete and on time.' },
    ],
    recap: [
      'Nine priorities respond to the eight challenges.',
      'Each priority needs a measure.',
      'Selective expansion beats store count.',
      'Execution quality decides future competition.',
    ],
    chapterRecap: 'The winners will be the retailers that can show, with measures, that their model works consistently and profitably. Store count will matter less than productivity, availability, compliance and trust.',
    deepDiveTitle: 'Why measures turn priorities into management',
    body: <P4DeepDive paragraphs={[
      'A priority such as “use data effectively” is vague until it is tied to forecast accuracy, and “expand selectively” is vague until it is tied to the payback of each new cohort.',
      'Reviewing a small set of measures regularly lets leaders see which priorities are working and which need more resources or a different approach.' ]} evidence="The nine priorities and their measures are described in the supplied material and presented here as a management framework. Pharmacity figures are from a company press release, The Investor and CafeF; An Khang and Long Châu items are from Vietnamese financial news and group statements." />,
    sources: citeP4('pharmacityPress', 'investorPharmacity', 'cafefPharmacity', 'anKhang2025', 'longChauWms', 'circular11', 'pdplLaw'),
  }),
];

const quiz = p4Quiz('pharmacy-m4-l5', [
  { chapter: '1', objective: 'Interpret demand growth', question: 'What does demand growth guarantee for pharmacy retailers?', application: 'A chain assumes rising demand means rising profit. What is wrong?', correct: 'Nothing; it is an opportunity, and success depends on turning growth into sustainable performance', wrong: ['Automatic profit', 'No competition', 'Lower costs'], explanation: 'Execution decides profit. Review Chapter 1.' },
  { chapter: '1', objective: 'Name a weakness', question: 'Which is a weakness of the industry in the SWOT?', application: 'A small independent has little to spend on technology. Which weakness is that?', correct: 'Fragmentation and thin technology budgets for small operators', wrong: ['Essential demand', 'Pharmacists’ role', 'Recurring purchases'], explanation: 'Small operators have capability gaps. Review Chapter 1.' },
  { chapter: '1', objective: 'Match strategy to model', question: 'What should chains and independents each emphasise?', application: 'A planner links SWOT results to business models. What is the match?', correct: 'Chains: scale and efficiency; independents: local relationships and discipline', wrong: ['Chains: relationships only; independents: scale only', 'Both: price only', 'Neither needs a strategy'], explanation: 'Fit to model matters. Review Chapter 1.' },
  { chapter: '1', objective: 'Handle two counts', question: 'How should the 3,475 KIS count and the 3,457 Q&Me count be treated?', application: 'A report cites both. What should you do?', correct: 'Treat them as different publishers’ counts and do not mix them', wrong: ['Add them', 'Average them', 'Ignore the sources'], explanation: 'Sources define counts differently. Review Chapter 1.' },
  { chapter: '2', objective: 'State the main challenge', question: 'What is the main strategic challenge for pharmacy retailers?', application: 'A chain grows fast. What must it balance?', correct: 'Balancing growth with operational control', wrong: ['Maximising store count', 'Avoiding all regulation', 'Removing pharmacists'], explanation: 'Growth must stay safe and compliant. Review Chapter 2.' },
  { chapter: '2', objective: 'Explain challenge interaction', question: 'Why are the eight challenges hard to manage one by one?', application: 'A chain fixes stock but ignores staffing. What happens?', correct: 'They interact and compound', wrong: ['They are independent', 'They never overlap', 'Only one matters'], explanation: 'Challenges compound. Review Chapter 2.' },
  { chapter: '2', objective: 'Recall the Pharmacity target change', question: 'How did Pharmacity’s store target change?', application: 'A report compares its goals. What shifted?', correct: 'From 5,000 by 2025 to 2,000–2,300 by 2030', wrong: ['From 2,000 to 5,000', 'No change', 'To zero'], explanation: 'It moved to selective growth. Review Chapter 2.' },
  { chapter: '3', objective: 'State what future competition rewards', question: 'What does future competition reward most?', application: 'Two chains have the same store count. What will separate them?', correct: 'Execution quality over market presence', wrong: ['Store count alone', 'Advertising alone', 'Luck'], explanation: 'Models must work. Review Chapter 3.' },
  { chapter: '3', objective: 'Pair a priority with a measure', question: 'Which measure fits “expand selectively”?', application: 'A board wants to know if openings are worthwhile. What should it track?', correct: 'Payback of new stores', wrong: ['Number of logos', 'Staff birthdays', 'Website visits only'], explanation: 'Selective expansion is judged by payback. Review Chapter 3.' },
  { chapter: '3', objective: 'Explain why measures matter', question: 'Why attach a measure to each strategic priority?', application: 'A plan lists priorities without numbers. What is missing?', correct: 'It lets leaders see which priorities are working', wrong: ['It removes the need for strategy', 'It replaces staff', 'It guarantees profit'], explanation: 'A priority without a measure is an intention. Review Chapter 3.' },
]);

export const LESSON_P4_5: PharmacyM4LessonBundle = {
  deck,
  quiz,
  takeaways: {
    learned: 'You can summarise the industry’s SWOT, name the main strategic challenges and explain the priorities and measures that respond to them.',
    keyTakeaways: [
      'Demand growth is an opportunity, not a guarantee of profit.',
      'Chains need scale and efficiency; independents need local relationships and discipline.',
      'The main challenge is balancing growth with operational control.',
      'Challenges interact, so growth should slow when control weakens.',
      'Future competition rewards execution quality over market presence.',
    ],
    businessImplications: 'Match growth to real capability, tie every priority to a measure and expand only where economics and control allow.',
    remember: 'Execution beats presence.',
    nextLesson: 'What Is Changing Next',
  },
};
