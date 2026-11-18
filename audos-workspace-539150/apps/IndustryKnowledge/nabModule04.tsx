import type { ReactNode } from 'react';
import { selectLessonQuestions } from './dairyQuizCore';
import { VisualView } from './fashionVisualKit';
import { applyChapterVisualText } from './chapterVisualText';
import { NAB_M4_VISUALS } from './nabM4VisualSpecs';

export interface NabModule04Source { title: string; href: string; publisher: string }
export interface NabModule04Narrative { label: 'What it is' | 'How it works' | 'Real-world example' | 'Why it matters'; text: string }
export interface NabModule04CardData {
  title: string; chapterTitle: string; readingTime: string; objective: string; mateIntro: string; keyInsight: string;
  concepts: []; narrative: NabModule04Narrative[]; visualKind: NabModule04VisualKind; visualHeading: string; visualIntro: string;
  statTiles?: Array<{ value?: string; label: string; subtitle?: string; description: string }>;
  keyTerms: Array<{ term: string; definition: string }>; recap: string[]; chapterRecap: string; deepDiveTitle: string; body: ReactNode; sources: NabModule04Source[];
}
export interface NabModule04Question { id: string; question: string; options: Array<{ id: string; text: string }>; correctOptionId: string; explanation: string; moduleId: string; objective: string }
export interface NabModule04Takeaways { learned: string; keyTakeaways: string[]; businessImplications: string; remember: string; nextLesson: string }
interface LessonMeta { title: string; description: string; takeaways: string[] }

const SOURCES = {
  porter: { title: 'How Competitive Forces Shape Strategy', href: 'https://hbr.org/1979/03/how-competitive-forces-shape-strategy', publisher: 'Harvard Business Review' },
  cokeSystem: { title: 'The Coca-Cola System', href: 'https://www.coca-colacompany.com/about-us/coca-cola-system', publisher: 'The Coca-Cola Company' },
  cokeResults: { title: 'Coca-Cola Reports Fourth Quarter and Full Year 2024 Results', href: 'https://investors.coca-colacompany.com/news-events/press-releases/detail/1128/coca-cola-reports-fourth-quarter-and-full-year-2024-results', publisher: 'The Coca-Cola Company' },
  coke10k: { title: '2024 Annual Report (Form 10-K)', href: 'https://investors.coca-colacompany.com/filings-reports/all-sec-filings/content/0000021344-25-000011/ko-20241231.htm', publisher: 'The Coca-Cola Company' },
  pepsi2024: { title: '2024 Annual Report', href: 'https://www.pepsico.com/docs/pepsico-5v9wci20/media/Files/investors/2024-pepsico-annual-report-01.pdf', publisher: 'PepsiCo' },
  pepsiSuntory: { title: 'PepsiCo and Suntory Agree to Form Strategic Beverage Alliance in Vietnam', href: 'https://www.pepsico.com/newsroom/press-releases/2012/pepsico-and-suntory-agree-to-form-strategic-beverage-alliance-in-vietnam', publisher: 'PepsiCo' },
  suntoryPlant: { title: 'Suntory PepsiCo Vietnam begins construction of its sixth plant in Long An', href: 'https://www.suntorypepsico.vn/tin-tuc/suntory-pepsico-viet-nam-khoi-cong-xay-dung-nha-may-thu-6-tai-long-an', publisher: 'Suntory PepsiCo Vietnam' },
  reutersPlant: { title: 'PepsiCo to invest $400 million more in two new plants in Vietnam', href: 'https://www.reuters.com/business/retail-consumer/pepsico-invest-400-mln-more-two-new-plants-vietnam-2024-03-22/', publisher: 'Reuters' },
  redBull: { title: 'Red Bull Company Profile', href: 'https://www.redbull.com/int-en/energydrink/company-profile', publisher: 'Red Bull' },
  monster2024: { title: 'Monster Beverage Reports 2024 Full-Year Financial Results', href: 'https://investors.monsterbevcorp.com/news-releases/news-release-details/monster-beverage-reports-2024-fourth-quarter-and-full-year', publisher: 'Monster Beverage' },
  monster10k: { title: '2024 Annual Report', href: 'https://investors.monsterbevcorp.com/financial-information/annual-reports', publisher: 'Monster Beverage' },
  thp: { title: 'Tan Hiep Phat — 30 years of perseverance and breakthroughs', href: 'https://vir.com.vn/tan-hiep-phat-30-years-of-perseverance-and-breakthroughs-117914.html', publisher: 'Vietnam Investment Review' },
  masan: { title: 'Annual Reports', href: 'https://masanconsumer.com/en/annual-report/', publisher: 'Masan Consumer' },
  urc: { title: 'Annual Reports', href: 'https://www.urc.com.ph/investors/urc-annual-reports', publisher: 'Universal Robina Corporation' },
  pwcSst: { title: 'New Special Sales Tax Law', href: 'https://www.pwc.com/vn/en/publications/2025/250701-new-sst-law.pdf', publisher: 'PwC Vietnam' },
  moduleResearch: { title: 'Module 04 research record (row 15, module04-research-v1)', href: 'https://audos.com/', publisher: 'Casemate WorkspaceDB' },
} satisfies Record<string, NabModule04Source>;

function DeepDive({ paragraphs }: { paragraphs: string[] }) { return <div className="space-y-4">{paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>; }
function chapter(input: Omit<NabModule04CardData, 'concepts'>): NabModule04CardData { return { ...input, concepts: [] }; }

interface VisualData { title: string; subtitle: string; mode: 'flow' | 'table' | 'network' | 'forces' | 'swot'; headers?: string[]; rows: Array<{ label: string; detail: string; value?: string }>; takeaway: string }
interface QuizSeed { chapter: '1' | '2' | '3'; objective: string; question: string; application: string; correct: string; wrong: [string, string, string]; explanation: string }
const optionIds = ['a', 'b', 'c', 'd'];
function pairedQuiz(prefix: string, seeds: QuizSeed[]): NabModule04Question[] {
  const pairs = seeds.map((seed, seedIndex) => [seed.question, seed.application].map((question, pairIndex) => {
    const rotation = (seedIndex + pairIndex) % 4;
    const raw = [seed.correct, ...seed.wrong];
    const rotated = raw.slice(rotation).concat(raw.slice(0, rotation));
    return { id: `${prefix}-${seedIndex + 1}${pairIndex ? 'b' : 'a'}`, question, options: rotated.map((text, index) => ({ id: optionIds[index], text })), correctOptionId: optionIds[rotated.indexOf(seed.correct)], explanation: seed.explanation, moduleId: seed.chapter, objective: seed.objective };
  }) as [NabModule04Question, NabModule04Question]);
  return selectLessonQuestions(pairs, seeds.map((seed) => seed.chapter));
}

const LESSON_41_META: LessonMeta = {
  title: 'Industry Competition Structure',
  description: 'Understand concentration, competitive intensity, Five Forces, entry barriers, substitutes, and market power.',
  takeaways: ['Competition depends on the market boundary and concentration.', 'Five Forces explains pressure on long-run profitability.', 'Brand, distribution, and scale can protect incumbents without eliminating challengers.'],
};

const lesson41 = [
  chapter({
    title: 'Understanding Beverage Market Competition', chapterTitle: 'Industry Competition Structure', readingTime: '6 min',
    objective: 'Explain market structure, concentration, and competitive intensity using clearly defined global and Vietnam market boundaries.',
    mateIntro: 'A global ranking can say one company leads, while a Vietnam shelf shows a different winner. Both can be true if the category, geography, and metric differ.',
    keyInsight: 'Competition can only be understood after defining the market: product category, geography, customer, period, and value-or-volume measure.',
    narrative: [
      { label: 'What it is', text: 'Market structure describes how many meaningful competitors operate, how unequal their positions are, and how easily buyers can switch among alternatives.' },
      { label: 'How it works', text: 'Analysts define the relevant market, compare shares or concentration where reliable evidence exists, and then examine rivalry across price, portfolio, innovation, availability, and marketing.' },
      { label: 'Real-world example', text: 'Globally, Coca-Cola and PepsiCo compete through broad portfolios and beverage systems. In Vietnam, those systems face strong local and regional portfolios from Suntory PepsiCo Vietnam, Tan Hiep Phat, URC, Masan Consumer, Nestlé, and specialist brands. Private-company and category data are not consistently disclosed, so a precise total-market ranking would overstate the evidence.' },
      { label: 'Why it matters', text: 'A strategy built for global carbonated soft drinks may fail in Vietnam ready-to-drink tea, energy, coffee, water, or a specific retail channel.' },
    ],
    visualKind: 'nab-m4-41-1-market-structure', visualHeading: 'Define the market before ranking competitors', visualIntro: 'Use the five filters to prevent false comparisons.',
    keyTerms: [{ term: 'Relevant market', definition: 'The product, geography, customer, and period within which competition is assessed.' }, { term: 'Market concentration', definition: 'The degree to which market activity is held by a small number of firms.' }, { term: 'Competitive intensity', definition: 'The strength and frequency of rivalry affecting price, investment, and returns.' }],
    recap: ['Market definition comes before market share.', 'Global leadership does not imply leadership in every country or category.', 'Value and volume shares answer different questions.', 'When data are weak, use transparent qualitative structure.'],
    chapterRecap: 'Never rank beverage competitors until the product, geography, period, and metric match.',
    deepDiveTitle: 'Reading concentration without false precision',
    body: <DeepDive paragraphs={['Concentration can be measured with the combined share of leading firms or a full index such as HHI, but both require complete, comparable share data. Private-company estimates drawn from different legal entities or retail panels cannot simply be combined.', 'Competition is multidimensional. A market can be concentrated yet highly contested through innovation and promotion, or fragmented yet locally protected by routes, relationships, and category specialization.']} />,
    sources: [SOURCES.porter, SOURCES.cokeSystem, SOURCES.moduleResearch],
  }),
  chapter({
    title: 'The Forces Shaping Competitive Intensity', chapterTitle: 'Industry Competition Structure', readingTime: '7 min',
    objective: 'Apply Porter’s Five Forces to beverage competition and explain the cause-and-effect behind each force.',
    mateIntro: 'A strong brand can still lose profit when packaging costs rise, a retailer demands more support, or consumers switch to café drinks.',
    keyInsight: 'Rivalry is only one pressure: suppliers, buyers, substitutes, and entrants also shape who captures value.',
    narrative: [
      { label: 'What it is', text: 'Porter’s Five Forces examines rivalry, supplier power, buyer power, substitutes, and new entrants to understand pressure on long-run industry returns.' },
      { label: 'How it works', text: 'Each force becomes stronger when participants have credible alternatives or leverage. The assessment must be made for a specific market rather than copied as a universal score.' },
      { label: 'Real-world example', text: 'Vietnam general trade contains many small outlets, while organised chains can negotiate centrally. Commodity-linked packaging can pressure producers, and substitutes range from bottled water to fresh drinks, cafés, and home preparation.' },
      { label: 'Why it matters', text: 'The forces reveal which capability matters: supplier diversification, channel value, brand distinction, lower-cost experimentation, or route-to-market execution.' },
    ],
    visualKind: 'nab-m4-41-2-five-forces', visualHeading: 'Beverage industry competitive forces', visualIntro: 'A qualitative framework whose strength changes by category and channel.',
    keyTerms: [{ term: 'Supplier power', definition: 'The ability of input providers to influence price, quality, terms, or availability.' }, { term: 'Buyer power', definition: 'The ability of customers or channels to demand better economics or service.' }, { term: 'Substitute', definition: 'A different product or behaviour that solves the same underlying need.' }, { term: 'Entry threat', definition: 'The likelihood that new competitors can enter and contest demand.' }],
    recap: ['Five Forces evaluates value capture, not only sales rivalry.', 'Force strength varies by category and channel.', 'Fragmented and consolidated buyers have different leverage.', 'Substitutes compete for the same occasion, not necessarily the same shelf label.'],
    chapterRecap: 'Ask who has alternatives, who bears switching costs, and who controls scarce access.',
    deepDiveTitle: 'Using force ratings responsibly',
    body: <DeepDive paragraphs={['A label such as “high rivalry” is useful only with mechanisms and evidence. Name the behaviour—frequent launches, promotion, cooler competition, low switching cost, or costly shelf access—and the market where it occurs.', 'The forces interact. Strong substitutes can intensify rivalry; consolidated buyers can transfer promotional cost to suppliers; co-packing and e-commerce can lower entry barriers while distribution depth remains hard to replicate.']} />,
    sources: [SOURCES.porter, SOURCES.moduleResearch, SOURCES.pwcSst],
  }),
  chapter({
    title: 'Entry Barriers, Substitutes, and Market Power', chapterTitle: 'Industry Competition Structure', readingTime: '7 min',
    objective: 'Explain how brand loyalty, distribution, scale, switching, and alternative routes influence entry and market power.',
    mateIntro: 'A startup can formulate a drink through a co-packer in months, yet still spend years trying to earn a permanent place in coolers and stores.',
    keyInsight: 'Making a beverage can be easier than building repeat demand and reliable access to the moment of purchase.',
    narrative: [
      { label: 'What it is', text: 'Entry barriers are resources or capabilities a challenger must overcome. Market power is the ability to sustain favourable economics without losing too much demand.' },
      { label: 'How it works', text: 'Scale can spread fixed investments; brands reduce perceived risk; distribution creates access; data and relationships improve execution. Co-packers and digital channels reduce factory and discovery barriers but do not guarantee repeat purchase.' },
      { label: 'Real-world example', text: 'Suntory PepsiCo Vietnam announced more than US$300 million for a sixth plant in Long An with planned capacity up to 800 million litres per year. That scale shows the resources behind national supply, while a niche entrant may avoid such capital by contracting production and targeting a narrow channel.' },
      { label: 'Why it matters', text: 'Entrants should choose where incumbent advantages are weakest; incumbents should renew capabilities rather than mistake historical scale for permanent protection.' },
    ],
    visualKind: 'nab-m4-41-3-barriers-power', visualHeading: 'From easy launch to durable position', visualIntro: 'Compare barriers at production, demand, access, and repeat-purchase stages.',
    statTiles: [{ value: '>$300M', label: 'Planned Long An beverage plant investment', description: 'Suntory PepsiCo Vietnam announcement, 2024.' }, { value: '800M L/year', label: 'Planned capacity', description: 'Company-stated capacity when operational; not current output.' }],
    keyTerms: [{ term: 'Entry barrier', definition: 'A structural or capability hurdle that raises the cost, time, or risk of entry.' }, { term: 'Economies of scale', definition: 'Lower average cost or stronger capability from spreading resources across greater activity.' }, { term: 'Switching cost', definition: 'The financial, practical, or psychological burden of changing supplier or brand.' }, { term: 'Market power', definition: 'The ability to influence terms or sustain economics because alternatives are weaker.' }],
    recap: ['Co-packing can lower the production barrier.', 'Brand and distribution remain difficult to reproduce.', 'Low consumer switching costs keep incumbents under pressure.', 'Scale is useful only when paired with demand and execution.'],
    chapterRecap: 'Durable advantage comes from a reinforcing system of demand, access, operations, and relationships.',
    deepDiveTitle: 'Separating structural and strategic barriers',
    body: <DeepDive paragraphs={['Structural barriers include minimum efficient scale, regulation, and channel economics. Strategic barriers include brand investment, exclusive assets, service routines, and portfolio choices. Analysts should not assume every incumbent advantage is permanent or socially desirable.', 'Substitution should be defined by the job. For refreshment, water and tea may substitute for carbonated drinks; for energy, coffee and sleep behaviour may matter; for a social occasion, a café experience may compete with packaged beverages.']} />,
    sources: [SOURCES.suntoryPlant, SOURCES.reutersPlant, SOURCES.porter],
  }),
];

const VISUALS_41 = {
  'nab-m4-41-1-market-structure': { title: 'Competitive Market Definition', subtitle: 'Five filters before any ranking', mode: 'flow', rows: [{ label: 'Product', detail: 'CSD, water, tea, coffee, energy, total NAB?' }, { label: 'Geography', detail: 'Global, Vietnam, city, or channel?' }, { label: 'Customer', detail: 'Consumer, retailer, or foodservice?' }, { label: 'Period', detail: 'Which year or reporting window?' }, { label: 'Metric', detail: 'Value, volume, revenue, or coverage?' }], takeaway: 'Comparable market shares require the same boundary and metric.' },
  'nab-m4-41-2-five-forces': { title: 'Five Forces in Beverages', subtitle: 'Qualitative pressure points', mode: 'forces', rows: [{ label: 'Rivalry', detail: 'Brands contest occasions, shelves, coolers, price-packs, and attention.' }, { label: 'Suppliers', detail: 'Commodity and capacity exposure can change input economics.' }, { label: 'Buyers', detail: 'Power rises with scale, alternatives, and central negotiation.' }, { label: 'Substitutes', detail: 'Other drinks and behaviours solve the same need.' }, { label: 'Entrants', detail: 'Co-packing lowers plant barriers; demand and reach remain difficult.' }], takeaway: 'The strongest force is market-specific and can change over time.' },
  'nab-m4-41-3-barriers-power': { title: 'The Ladder to Durable Competition', subtitle: 'Launching is not the same as scaling', mode: 'table', headers: ['Stage', 'Challenge', 'Incumbent advantage'], rows: [{ label: 'Make', detail: 'Safe formulation and production', value: 'Approved capacity and know-how' }, { label: 'Create demand', detail: 'Earn awareness and relevance', value: 'Brand memory and portfolio' }, { label: 'Gain access', detail: 'Reach outlets and occasions', value: 'Routes and relationships' }, { label: 'Convert', detail: 'Right pack, price, and condition', value: 'Execution and data' }, { label: 'Repeat', detail: 'Deliver consistent value', value: 'Trust and learning scale' }], takeaway: 'A durable position requires several connected barriers, not one factory.' },
} satisfies Record<string, VisualData>;

const q41 = pairedQuiz('nab-41', [
  { chapter: '1', objective: 'Define the relevant market', question: 'What should be defined before comparing market shares?', application: 'One report covers global CSD value and another Vietnam total-beverage volume. Can their shares be ranked together?', correct: 'Product, geography, period, customer, and metric', wrong: ['Only company name', 'Only package colour', 'Only advertising spend'], explanation: 'A market-share comparison is valid only when boundaries and measures match.' },
  { chapter: '1', objective: 'Interpret concentration', question: 'What does market concentration describe?', application: 'A few firms account for much of a clearly defined category. What characteristic is being observed?', correct: 'How activity is distributed among leading firms', wrong: ['Only consumer satisfaction', 'Only factory utilization', 'Only tax exposure'], explanation: 'Concentration describes the distribution of market activity across competitors.' },
  { chapter: '1', objective: 'Separate global and local positions', question: 'Why can global and Vietnam competitor rankings differ?', application: 'A global leader trails a local portfolio in one Vietnam category. Is this contradictory?', correct: 'Geography, category scope and routes to market differ', wrong: ['A global leader always leads every local category', 'Local brands are excluded from national rankings', 'Rankings differ only because of currency conversion'], explanation: 'Competitive position is specific to the defined market.' },
  { chapter: '2', objective: 'Apply Five Forces', question: 'Which force concerns alternative ways to satisfy the same need?', application: 'A café drink replaces a packaged energy drink during a study occasion. Which force is acting?', correct: 'Threat of substitutes', wrong: ['Supplier power', 'Entry barriers only', 'Internal efficiency'], explanation: 'Substitutes solve the same underlying job through a different product or behaviour.' },
  { chapter: '2', objective: 'Assess buyer power', question: 'When is buyer power usually stronger?', application: 'A national chain negotiates centrally and has many brands to choose from. What does this imply?', correct: 'The buyer has scale and credible alternatives', wrong: ['The buyer has no leverage', 'Supplier power disappears', 'Consumers cannot switch'], explanation: 'Scale, information, and alternatives strengthen buyer leverage.' },
  { chapter: '2', objective: 'Assess supplier power', question: 'What can increase packaging-supplier power?', application: 'Few approved sources can provide a required container during constrained capacity. Which force rises?', correct: 'Scarcity of qualified alternatives', wrong: ['More equivalent suppliers', 'Lower switching difficulty', 'More retail outlets'], explanation: 'Power rises when qualified alternatives are scarce or costly to switch.' },
  { chapter: '2', objective: 'Explain rivalry', question: 'Which behaviour is evidence of rivalry?', application: 'Brands contest cooler space, launch new packs, and run frequent promotions. What does this show?', correct: 'Competitors actively contest demand and access', wrong: ['Consumers face no choice', 'The market has no entry barriers', 'All firms earn equal returns'], explanation: 'Rivalry appears in repeated competition for demand, shelf access, and differentiation.' },
  { chapter: '3', objective: 'Evaluate entry barriers', question: 'Which barrier can co-packing reduce most directly?', application: 'A startup rents an approved line instead of building a plant. Which hurdle falls?', correct: 'Upfront manufacturing investment', wrong: ['Need for consumer demand', 'Need for distribution', 'Need for product quality'], explanation: 'Co-packing reduces plant investment but does not remove demand, access, or quality challenges.' },
  { chapter: '3', objective: 'Explain economies of scale', question: 'What is a valid benefit of scale?', application: 'A larger network spreads fixed systems and uses routes more densely. What may improve?', correct: 'Average cost or capability efficiency', wrong: ['Automatic consumer loyalty', 'Permanent monopoly', 'Zero execution risk'], explanation: 'Scale can spread resources, but it does not guarantee demand or protection.' },
  { chapter: '3', objective: 'Explain market power', question: 'What limits beverage market power when switching costs are low?', application: 'A shopper can easily choose another cold drink. What pressure does this create?', correct: 'Brands must continually earn preference and availability', wrong: ['Incumbents can ignore consumers', 'Retail access becomes irrelevant', 'Prices can rise without consequence'], explanation: 'Low switching cost makes demand responsive to alternatives.' },
]);

const TAKEAWAY_41: NabModule04Takeaways = {
  learned: 'You can define a beverage market, assess concentration, apply Five Forces, and explain how barriers and substitutes shape power.',
  keyTakeaways: ['Market definition comes before competitor ranking.', 'Concentration and rivalry are related but not identical.', 'Five Forces shows pressure from the full competitive system.', 'Co-packing lowers plant barriers, while brand and distribution remain difficult to scale.'],
  businessImplications: 'Companies should invest against the strongest market-specific force rather than copy a generic industry playbook.',
  remember: 'Define the market, identify the force, then explain the mechanism.',
  nextLesson: 'Key Industry Players',
};

const LESSON_42_META: LessonMeta = {
  title: 'Key Industry Players',
  description: 'Meet major global and Vietnam beverage competitors and learn how to interpret competitive position.',
  takeaways: ['Corporate scale and beverage scale are not interchangeable.', 'Vietnam competition includes multinational systems and strong local or regional portfolios.', 'Market position requires a defined category, period, geography, and metric.'],
};

const lesson42 = [
  chapter({
    title: 'Major Global Beverage Companies', chapterTitle: 'Key Industry Players', readingTime: '7 min',
    objective: 'Compare major global beverage companies using consistent corporate scope, beverage exposure, portfolio, geography, and business model.',
    mateIntro: 'PepsiCo can report more corporate revenue than Coca-Cola while the comparison still says little about which beverage brand leads a specific category.',
    keyInsight: 'Company size, beverage sales, brand strength, and category leadership are different measures of competitive position.',
    narrative: [
      { label: 'What it is', text: 'A global competitor landscape groups companies by portfolio, geographic reach, business model, and the beverage categories in which they compete.' },
      { label: 'How it works', text: 'Analysts compare like-for-like metrics and disclose scope. Consolidated revenue can show corporate scale, but diversified food sales, bottling operations, currencies, and fiscal periods can make headline totals misleading.' },
      { label: 'Real-world example', text: 'In 2024 Coca-Cola reported US$47.1 billion consolidated net revenue. PepsiCo reported US$91.854 billion, with beverages representing 42% and convenient foods 58% of its net-revenue mix. Monster reported US$7.49 billion net sales. Red Bull reported 13.969 billion cans and €12.196 billion group turnover for 2025. These are different companies, currencies, scopes, and periods—not a single market-share ranking.' },
      { label: 'Why it matters', text: 'A careful landscape shows strategic differences without converting incomparable corporate figures into a false league table.' },
    ],
    visualKind: 'nab-m4-42-1-global-landscape', visualHeading: 'Global competitor landscape', visualIntro: 'Compare strategic position and business scope; figures retain their original definitions.',
    statTiles: [{ value: '$47.1B', label: 'Coca-Cola 2024 net revenue', description: 'Consolidated company metric.' }, { value: '$91.854B', label: 'PepsiCo 2024 net revenue', description: 'Consolidated food-and-beverage company; beverage mix was 42%.' }, { value: '$7.49B', label: 'Monster 2024 net sales', description: 'Consolidated company metric.' }, { value: '13.969B cans', label: 'Red Bull 2025 volume', description: 'Company-reported worldwide cans sold.' }],
    keyTerms: [{ term: 'Corporate scope', definition: 'The businesses and entities included in a reported company metric.' }, { term: 'Portfolio', definition: 'The collection of categories, brands, products, and formats a company manages.' }, { term: 'Geographic presence', definition: 'The countries or territories where a company sells or operates.' }],
    recap: ['Coca-Cola and PepsiCo differ in business mix and operating structure.', 'PepsiCo corporate revenue includes substantial convenient-food sales.', 'Monster and Red Bull are more concentrated in energy drinks.', 'Corporate revenue does not equal brand revenue or market share.'],
    chapterRecap: 'Compare global players on a common strategic framework, then keep each reported metric in its original scope.',
    deepDiveTitle: 'What the headline figures do—and do not—show',
    body: <DeepDive paragraphs={['Revenue reflects accounting perimeter and business model. Concentrate, finished-goods, food, and bottling activities can produce different revenue intensity even when consumer demand is large.', 'A stronger competitor comparison adds category exposure, route-to-market model, geographic mix, owned versus partner operations, innovation model, and the evidence date.']} />,
    sources: [SOURCES.cokeResults, SOURCES.pepsi2024, SOURCES.monster2024, SOURCES.redBull],
  }),
  chapter({
    title: 'Leading Beverage Players in Vietnam', chapterTitle: 'Key Industry Players', readingTime: '7 min',
    objective: 'Describe the verified portfolios, operating models, and strategic positions of important beverage competitors in Vietnam.',
    mateIntro: 'The same convenience-store cooler can contain global carbonated brands, a Japanese-American joint venture portfolio, Vietnamese teas, Philippine-owned RTD tea, and local coffee.',
    keyInsight: 'Vietnam competition is portfolio-by-portfolio: multinational scale meets local category focus, price architecture, and route knowledge.',
    narrative: [
      { label: 'What it is', text: 'The Vietnam player landscape includes Coca-Cola’s beverage system, Suntory PepsiCo Vietnam, Tan Hiep Phat, URC Vietnam, Masan Consumer, Nestlé, Red Bull, and other category specialists.' },
      { label: 'How it works', text: 'Players overlap selectively. They may compete in carbonated drinks, water, tea, energy, coffee, nutrition, or several categories, using different ownership and production models.' },
      { label: 'Real-world example', text: 'The PepsiCo–Suntory agreement established a Vietnam beverage venture with Suntory at 51% and PepsiCo at 49%, serving as bottler for both. Its 2024 Long An announcement described a sixth plant with planned investment above US$300 million and capacity up to 800 million litres annually.' },
      { label: 'Why it matters', text: 'Competitive threat should be assessed where portfolios, price tiers, channels, and occasions overlap—not from one undifferentiated national ranking.' },
    ],
    visualKind: 'nab-m4-42-2-vietnam-landscape', visualHeading: 'Vietnam competitor landscape', visualIntro: 'A verified qualitative map of portfolios and strategic emphasis.',
    keyTerms: [{ term: 'Joint venture', definition: 'A business owned and governed by two or more parent companies.' }, { term: 'Category specialist', definition: 'A competitor focused on a narrower product category or consumer need.' }, { term: 'Local relevance', definition: 'Fit with local tastes, affordability, occasions, and channels.' }],
    recap: ['SPVB combines Suntory and PepsiCo capabilities in a local venture.', 'Coca-Cola competes through global brands and a local beverage system.', 'THP, URC, and Masan bring focused local or regional portfolios.', 'Competitors overlap differently by category and occasion.'],
    chapterRecap: 'Vietnam has no single competitive map: build one for the category and channel being decided.',
    deepDiveTitle: 'Limits of private-company comparisons',
    body: <DeepDive paragraphs={['Public disclosures are uneven across Vietnam entities. Revenue estimates may refer to different legal entities, years, tax filings, or currencies. Treat them as unusable for a clean ranking unless the basis is reconciled.', 'Portfolio and operating evidence can still support a useful benchmark: named brands, verified ownership, announced capacity, channel focus, and category participation.']} />,
    sources: [SOURCES.pepsiSuntory, SOURCES.suntoryPlant, SOURCES.thp, SOURCES.masan, SOURCES.urc],
  }),
  chapter({
    title: 'Understanding Market Shares and Competitive Positions', chapterTitle: 'Key Industry Players', readingTime: '7 min',
    objective: 'Interpret market share, company revenue, sales volume, portfolio breadth, and geographic coverage without mixing definitions.',
    mateIntro: 'One company can lead by value, another by litres, and a third by outlet coverage. Which one is really ahead?',
    keyInsight: 'Competitive position is multi-dimensional; no single metric answers every strategic question.',
    narrative: [
      { label: 'What it is', text: 'Market share measures a firm or brand’s activity within a defined market, while revenue, volume, distribution, and portfolio metrics describe different dimensions of position.' },
      { label: 'How it works', text: 'Value share captures sales money; volume share captures physical units; revenue follows company accounting; numeric distribution measures outlets carrying a product; weighted distribution considers outlet importance.' },
      { label: 'Real-world example', text: 'A premium energy brand can have lower unit volume but stronger value per unit. A broad mass-market portfolio can lead physical volume, while a focused brand may have higher relevance in one occasion.' },
      { label: 'Why it matters', text: 'Using the wrong metric can reward discounting, hide premium strength, or confuse corporate scale with consumer-market leadership.' },
    ],
    visualKind: 'nab-m4-42-3-position-scorecard', visualHeading: 'Competitive position scorecard', visualIntro: 'Choose the metric that answers the business question.',
    keyTerms: [{ term: 'Value share', definition: 'A company or brand’s sales value divided by total sales value in the defined market.' }, { term: 'Volume share', definition: 'A company or brand’s physical units divided by total units in the defined market.' }, { term: 'Numeric distribution', definition: 'The share of relevant outlets carrying a product.' }, { term: 'Weighted distribution', definition: 'Distribution adjusted for the sales importance of outlets.' }],
    recap: ['Value and volume shares can rank players differently.', 'Company revenue is not a substitute for market share.', 'Distribution measures access, not necessarily sell-out.', 'Portfolio and geographic coverage explain where strength can travel.'],
    chapterRecap: 'Select the metric from the decision, then state the denominator and evidence period.',
    deepDiveTitle: 'A market-share quality checklist',
    body: <DeepDive paragraphs={['For every share, record numerator, denominator, category, geography, channel, period, value or volume basis, source method, and whether the unit is a brand, legal entity, or corporate group.', 'Do not add shares from different panels or infer a missing competitor share from corporate revenue. When reliable comparable data are unavailable, state the gap and use qualitative positioning.']} />,
    sources: [SOURCES.coke10k, SOURCES.pepsi2024, SOURCES.moduleResearch],
  }),
];

const VISUALS_42 = {
  'nab-m4-42-1-global-landscape': { title: 'Global Competitor Landscape', subtitle: 'Different scales, scopes, and strategic centres', mode: 'table', headers: ['Company', 'Portfolio emphasis', 'Comparable caution'], rows: [{ label: 'Coca-Cola', detail: 'Broad non-alcoholic beverage system', value: 'Corporate revenue includes concentrate and finished-goods activities' }, { label: 'PepsiCo', detail: 'Beverages plus large convenient-food business', value: 'Total corporate revenue is not beverage-only' }, { label: 'Red Bull', detail: 'Focused energy-drink brand and marketing system', value: '2025 turnover and cans are company-reported' }, { label: 'Monster', detail: 'Energy-led portfolio and partner distribution', value: 'Net sales differ from market value' }, { label: 'Nestlé', detail: 'Coffee, nutrition, and water exposure within food group', value: 'Group totals extend far beyond packaged NAB' }], takeaway: 'Strategic comparability matters more than one headline number.' },
  'nab-m4-42-2-vietnam-landscape': { title: 'Vietnam Player Landscape', subtitle: 'Portfolio and operating emphasis', mode: 'table', headers: ['Player', 'Verified portfolio signal', 'Competitive emphasis'], rows: [{ label: 'Suntory PepsiCo Vietnam', detail: 'Pepsi, 7UP, Sting, Aquafina, Lipton and Suntory brands', value: 'Broad portfolio and local manufacturing' }, { label: 'Coca-Cola system', detail: 'Coca-Cola, Sprite, Fanta, water and tea brands', value: 'Global brand system and local execution' }, { label: 'Tan Hiep Phat', detail: 'Number 1 and tea-led domestic portfolio', value: 'Integrated local production and route depth' }, { label: 'URC Vietnam', detail: 'C2 and regional consumer portfolio', value: 'RTD tea and value-market participation' }, { label: 'Masan Consumer', detail: 'Wake-Up 247 and Vinacafé-linked coffee portfolio', value: 'RTD coffee and domestic ecosystem' }], takeaway: 'Compare category overlap and route strengths, not unsupported total-market ranks.' },
  'nab-m4-42-3-position-scorecard': { title: 'Competitive Position Scorecard', subtitle: 'One question, one suitable metric', mode: 'table', headers: ['Business question', 'Useful metric', 'Main limitation'], rows: [{ label: 'Who captures the most spending?', detail: 'Value share', value: 'Sensitive to price and category scope' }, { label: 'Who sells the most physical product?', detail: 'Volume share', value: 'Pack and unit definitions must match' }, { label: 'Who is biggest as a company?', detail: 'Reported revenue', value: 'Accounting perimeter may differ' }, { label: 'Who reaches the most outlets?', detail: 'Distribution coverage', value: 'Presence is not sell-out' }, { label: 'Who can contest more occasions?', detail: 'Portfolio and geographic breadth', value: 'Breadth can add complexity' }], takeaway: 'Competitive leadership changes with the question and denominator.' },
} satisfies Record<string, VisualData>;

const q42 = pairedQuiz('nab-42', [
  { chapter: '1', objective: 'Compare global players consistently', question: 'Why is PepsiCo total revenue not directly comparable with beverage-only scale?', application: 'A slide treats PepsiCo’s entire 2024 revenue as beverage sales. What is wrong?', correct: 'PepsiCo reported 58% of revenue from convenient foods', wrong: ['PepsiCo has no beverage business', 'Revenue can never be used', 'Coca-Cola sells only food'], explanation: 'PepsiCo is diversified; its corporate total includes substantial food revenue.' },
  { chapter: '1', objective: 'Interpret corporate metrics', question: 'What did Coca-Cola’s US$47.1 billion figure represent?', application: 'A learner calls it Coca-Cola brand retail sales. How should it be corrected?', correct: '2024 consolidated company net revenue', wrong: ['Global CSD market value', 'One brand’s retail sales', 'Vietnam bottler revenue'], explanation: 'The figure is consolidated company net revenue, not brand retail value or market size.' },
  { chapter: '1', objective: 'Compare focused players', question: 'Which companies in the lesson are most concentrated in energy drinks?', application: 'A benchmark needs focused energy competitors rather than diversified food groups. Which pair fits?', correct: 'Red Bull and Monster', wrong: ['Coca-Cola and Nestlé only', 'PepsiCo and Masan only', 'URC and every retailer'], explanation: 'Red Bull and Monster have energy-led business profiles.' },
  { chapter: '2', objective: 'Describe Vietnam players', question: 'What ownership split established the Suntory–PepsiCo Vietnam venture?', application: 'A student says PepsiCo wholly owns SPVB. What is the correction?', correct: 'Suntory 51% and PepsiCo 49%', wrong: ['PepsiCo 100%', 'Suntory 10% and PepsiCo 90%', 'No parent ownership'], explanation: 'The announced alliance gave Suntory 51% and PepsiCo 49%.' },
  { chapter: '2', objective: 'Describe Vietnam players', question: 'What does SPVB’s Long An announcement evidence most directly?', application: 'A candidate cites the planned 800 million-litre capacity. What capability does it indicate?', correct: 'Planned local manufacturing scale', wrong: ['Verified current market share', 'Current consumer loyalty', 'One brand’s revenue'], explanation: 'The announcement supports a capacity and investment statement, not a market-share claim.' },
  { chapter: '2', objective: 'Compare portfolios', question: 'Why is a single total-market ranking insufficient in Vietnam?', application: 'THP is strong in tea and energy while another player is stronger in CSDs. What should analysis do?', correct: 'Compare by category, occasion, price tier, and channel', wrong: ['Ignore category differences', 'Use global revenue only', 'Assume all portfolios overlap fully'], explanation: 'Competitors overlap selectively across categories and routes.' },
  { chapter: '2', objective: 'Use private-company data responsibly', question: 'What should be done with inconsistent private-company revenue estimates?', application: 'Two sources cover different entities and years. Can they form a ranking?', correct: 'State the gap and avoid precise comparison', wrong: ['Average them without checking', 'Choose the larger number', 'Convert both into market share'], explanation: 'Inconsistent scope and periods prevent a defensible ranking.' },
  { chapter: '3', objective: 'Interpret position metrics', question: 'What does value share measure?', application: 'A premium brand earns more money on fewer units. Which metric may show its strength?', correct: 'Share of sales value in the defined market', wrong: ['Share of physical units only', 'Corporate employee share', 'Factory capacity share'], explanation: 'Value share captures spending, not physical volume.' },
  { chapter: '3', objective: 'Interpret position metrics', question: 'What does numeric distribution measure?', application: 'A product is present in 70 of 100 relevant outlets. Which concept is this?', correct: 'Share of relevant outlets carrying the product', wrong: ['Share of category revenue', 'Share of consumer preference', 'Share of plant capacity'], explanation: 'Numeric distribution measures outlet presence.' },
  { chapter: '3', objective: 'Avoid false rankings', question: 'Which comparison is invalid?', application: 'An analyst ranks a brand’s Vietnam volume share against a global corporation’s revenue. What is the issue?', correct: 'The entities, geography, and metrics do not match', wrong: ['Both are financial statements', 'All shares equal revenue', 'Brands cannot have volume'], explanation: 'Competitive metrics require aligned scope, geography, period, and unit.' },
]);

const TAKEAWAY_42: NabModule04Takeaways = {
  learned: 'You can identify major global and Vietnam players and interpret market-share and scale evidence without mixing incompatible metrics.',
  keyTakeaways: ['Global competitors differ in portfolio and business model.', 'PepsiCo corporate scale includes a large food business.', 'Vietnam competitors overlap differently by category and route.', 'Value, volume, revenue, and distribution measure different positions.'],
  businessImplications: 'Management should benchmark the competitors that contest the same consumer, occasion, channel, and profit pool.',
  remember: 'A company can be large without leading every beverage market.',
  nextLesson: 'Competitor Benchmarking',
};

const LESSON_43_META: LessonMeta = {
  title: 'Competitor Benchmarking',
  description: 'Build fair competitor sets and compare portfolio, positioning, pricing, distribution, and capabilities.',
  takeaways: ['Benchmark competitors that contest the same decision.', 'Use explicit, consistent criteria and evidence periods.', 'Strategic differences matter more than a decorative scorecard.'],
};

const lesson43 = [
  chapter({
    title: 'How to Compare Beverage Competitors', chapterTitle: 'Competitor Benchmarking', readingTime: '6 min',
    objective: 'Select relevant competitors and construct a consistent, evidence-based benchmarking framework.',
    mateIntro: 'Comparing a Vietnam tea brand with PepsiCo’s global corporate revenue creates a table, but not an insight.',
    keyInsight: 'A benchmark is useful only when the competitor set, criteria, evidence period, and scoring rules fit the business decision.',
    narrative: [
      { label: 'What it is', text: 'Competitor benchmarking is a structured comparison of relevant rivals on dimensions that explain customer choice and business performance.' },
      { label: 'How it works', text: 'Define the decision, select direct and adjacent competitors, align geography and period, choose measurable criteria, document sources, and explain rather than merely total the differences.' },
      { label: 'Real-world example', text: 'For a Vietnam energy-drink decision, a useful set may include brands competing for energy occasions and the channels where they meet. Nestlé group revenue or global water presence would not answer that narrow question.' },
      { label: 'Why it matters', text: 'Poor competitor selection creates false gaps and can direct investment toward capabilities that do not influence the target market.' },
    ],
    visualKind: 'nab-m4-43-1-benchmark-process', visualHeading: 'A disciplined benchmarking process', visualIntro: 'Move from decision to evidence before building the matrix.',
    keyTerms: [{ term: 'Benchmark set', definition: 'The competitors selected for a specific comparison.' }, { term: 'Comparison criterion', definition: 'A defined dimension used consistently across competitors.' }, { term: 'Data provenance', definition: 'The source, date, and transformation history behind evidence.' }],
    recap: ['Start with the decision, not the available data.', 'Include direct and relevant adjacent competitors.', 'Align scope and periods before scoring.', 'Document missing evidence rather than filling gaps with assumptions.'],
    chapterRecap: 'A fair benchmark compares the right rivals on the right dimensions for the right decision.',
    deepDiveTitle: 'Designing criteria that explain outcomes',
    body: <DeepDive paragraphs={['Separate outcome metrics—such as growth, share, or profit—from capability drivers such as distribution, brand preference, innovation speed, or cost to serve. Otherwise the table may restate who is winning without explaining why.', 'Weighting can be useful, but weights should reflect the decision and be tested for sensitivity. A small change in subjective weights should not completely reverse the conclusion without discussion.']} />,
    sources: [SOURCES.coke10k, SOURCES.pepsi2024, SOURCES.monster10k],
  }),
  chapter({
    title: 'Brand Positioning, Pricing, and Distribution', chapterTitle: 'Competitor Benchmarking', readingTime: '7 min',
    objective: 'Compare beverage competitors across target, portfolio, positioning, price-pack architecture, and route-to-market choices.',
    mateIntro: 'Two energy drinks can share a cooler while one sells aspiration, another affordability, and a third a familiar local routine.',
    keyInsight: 'Competitive offers are systems: target, promise, pack, price, and availability must reinforce one another.',
    narrative: [
      { label: 'What it is', text: 'Commercial benchmarking compares how competitors choose consumers and occasions, construct portfolios, position benefits, set price-pack ladders, and reach the point of purchase.' },
      { label: 'How it works', text: 'Use observed packs, public brand claims, retailer prices collected in the same period, and verified route evidence. Compare equivalent formats and channels before inferring premium or value position.' },
      { label: 'Real-world example', text: 'SPVB’s broad portfolio can cover CSD, energy, water, and tea occasions. THP’s Number 1 and tea brands bring a focused local portfolio. Monster and Red Bull show how energy specialists can pair distinctive identity with partner distribution.' },
      { label: 'Why it matters', text: 'A brand promise cannot win if its pack is unaffordable for the occasion or its distribution misses the target channel.' },
    ],
    visualKind: 'nab-m4-43-2-commercial-matrix', visualHeading: 'Commercial benchmarking matrix', visualIntro: 'Compare observable choices without inventing prices or scores.',
    keyTerms: [{ term: 'Price tier', definition: 'A relative price position within a comparable category, pack, channel, and period.' }, { term: 'Positioning', definition: 'The intended meaning of an offer relative to alternatives.' }, { term: 'Distribution strategy', definition: 'The channels, partners, service model, and execution used to create availability.' }],
    recap: ['Compare equivalent packs and channels.', 'Positioning should match the target occasion.', 'Portfolio breadth and focus create different advantages.', 'Distribution determines whether the commercial promise is purchasable.'],
    chapterRecap: 'Benchmark the whole offer system, not a slogan or shelf price in isolation.',
    deepDiveTitle: 'How to avoid a misleading price map',
    body: <DeepDive paragraphs={['Record exact pack size, single or multipack, channel, city, date, regular or promotional price, and taxes. A smaller pack may have a lower out-of-pocket price but a higher price per litre.', 'Positioning axes should come from consumer choice or strategy evidence. Do not assign precise map coordinates from intuition and then present them as measured fact.']} />,
    sources: [SOURCES.pepsiSuntory, SOURCES.suntoryPlant, SOURCES.thp, SOURCES.monster10k],
  }),
  chapter({
    title: 'Competitive Strengths and Strategic Differences', chapterTitle: 'Competitor Benchmarking', readingTime: '7 min',
    objective: 'Explain how brand, innovation, operations, pricing, route-to-market, and consumer learning combine into different competitive systems.',
    mateIntro: 'A competitor’s visible product can be copied faster than its supply routines, retailer relationships, data, and accumulated consumer learning.',
    keyInsight: 'Sustainable advantage usually comes from a reinforcing system of capabilities, not one isolated strength.',
    narrative: [
      { label: 'What it is', text: 'A strategic difference is a deliberate configuration of capabilities and choices that produces a distinct outcome or protects a position.' },
      { label: 'How it works', text: 'Brand demand supports distribution investment; distribution generates data and availability; scale can fund innovation; innovation refreshes relevance. Weak links can break the cycle.' },
      { label: 'Real-world example', text: 'Monster’s annual report describes extensive co-packing and Coca-Cola network distribution arrangements, illustrating a focused brand using partner capabilities. SPVB combines a broad portfolio with substantial local manufacturing investment.' },
      { label: 'Why it matters', text: 'Copying one tactic without the supporting system often creates cost without reproducing the competitor’s result.' },
    ],
    visualKind: 'nab-m4-43-3-strategy-systems', visualHeading: 'Competitive systems, not isolated strengths', visualIntro: 'Trace how capabilities reinforce distinct strategic positions.',
    keyTerms: [{ term: 'Capability system', definition: 'A set of activities and resources that reinforce one another.' }, { term: 'Trade-off', definition: 'A choice that improves one position while limiting another.' }, { term: 'Strategic fit', definition: 'Consistency among target, value proposition, activities, and resources.' }],
    recap: ['Brand, route, innovation, and operations can reinforce one another.', 'Partnerships can substitute for ownership when governance is strong.', 'Trade-offs make strategies distinctive.', 'Copying a tactic is not the same as copying a capability system.'],
    chapterRecap: 'Explain why the activities fit together and why a rival cannot easily reproduce the full system.',
    deepDiveTitle: 'From strength list to causal explanation',
    body: <DeepDive paragraphs={['Replace labels such as “strong distribution” with mechanisms: outlet reach, service frequency, cooler execution, order data, distributor economics, and how those capabilities change availability or cost.', 'Test whether the claimed strength is distinctive, relevant to the target market, supported by evidence, and difficult enough to reproduce. A capability can be valuable without being unique.']} />,
    sources: [SOURCES.monster10k, SOURCES.suntoryPlant, SOURCES.cokeSystem],
  }),
];

const VISUALS_43 = {
  'nab-m4-43-1-benchmark-process': { title: 'Competitor Benchmarking Workflow', subtitle: 'Build the comparison from the decision outward', mode: 'flow', rows: [{ label: 'Decision', detail: 'What choice must the benchmark inform?' }, { label: 'Competitor set', detail: 'Who contests the same demand or capability?' }, { label: 'Criteria', detail: 'Which outcomes and drivers matter?' }, { label: 'Evidence', detail: 'Are scope, period, and sources aligned?' }, { label: 'Implication', detail: 'What action follows from the differences?' }], takeaway: 'The best benchmark explains a decision rather than filling a template.' },
  'nab-m4-43-2-commercial-matrix': { title: 'Commercial Benchmarking Matrix', subtitle: 'Observable criteria for a fair comparison', mode: 'table', headers: ['Dimension', 'Evidence to collect', 'Common mistake'], rows: [{ label: 'Target & occasion', detail: 'Consumer, need, consumption moment', value: 'Using age alone' }, { label: 'Portfolio', detail: 'Categories, brands, packs, roles', value: 'Counting SKUs without strategic role' }, { label: 'Positioning', detail: 'Promise and support', value: 'Treating slogans as measured perception' }, { label: 'Price-pack', detail: 'Comparable pack, channel, date', value: 'Mixing promotions and regular price' }, { label: 'Distribution', detail: 'Channels, coverage, service, condition', value: 'Equating presence with sell-out' }], takeaway: 'Commercial choices must be compared on consistent, observable definitions.' },
  'nab-m4-43-3-strategy-systems': { title: 'Capability Systems', subtitle: 'Different routes to competitive advantage', mode: 'network', rows: [{ label: 'Brand-led', detail: 'Meaning and memory create demand', value: 'Requires sustained delivery and investment' }, { label: 'Route-led', detail: 'Availability and service convert demand', value: 'Requires partner economics and execution' }, { label: 'Innovation-led', detail: 'New benefits and formats renew relevance', value: 'Requires learning and launch discipline' }, { label: 'Efficiency-led', detail: 'Operations improve cost and reliability', value: 'Requires scale without excess complexity' }, { label: 'Portfolio-led', detail: 'Multiple offers cover more occasions', value: 'Requires clear roles and prioritisation' }], takeaway: 'Advantage strengthens when capabilities reinforce one another.' },
} satisfies Record<string, VisualData>;

const q43 = pairedQuiz('nab-43', [
  { chapter: '1', objective: 'Build a fair benchmark', question: 'What should determine the competitor set?', application: 'A team benchmarks a Vietnam energy launch. Which rivals belong?', correct: 'Players contesting the same demand, category, or capability', wrong: ['Every global food company', 'Only the largest corporation', 'Only companies with public revenue'], explanation: 'The set should fit the decision and competitive arena.' },
  { chapter: '1', objective: 'Build a fair benchmark', question: 'Why separate outcomes from capabilities?', application: 'A table lists share and growth but no drivers. What is missing?', correct: 'Evidence explaining why performance differs', wrong: ['More decorative scores', 'Fewer sources', 'A single corporate total'], explanation: 'Outcomes show who is ahead; capabilities help explain the result.' },
  { chapter: '1', objective: 'Handle missing data', question: 'How should a missing competitor metric be treated?', application: 'A private company has no comparable figure. What should the analyst do?', correct: 'Mark the gap and avoid invented scoring', wrong: ['Estimate a precise number from intuition', 'Assign the average automatically', 'Remove the competitor silently'], explanation: 'Transparent gaps are safer than false precision.' },
  { chapter: '2', objective: 'Compare pricing fairly', question: 'What is needed for a fair beverage price comparison?', application: 'Two products have different pack sizes and one is promoted. What should be aligned?', correct: 'Pack, channel, date, and promotion status', wrong: ['Only brand colour', 'Only corporate revenue', 'Only country of origin'], explanation: 'Price comparisons require equivalent purchase conditions.' },
  { chapter: '2', objective: 'Compare positioning', question: 'What makes positioning evidence stronger?', application: 'A map is based only on an analyst’s impression. What should support it?', correct: 'Consumer, strategy, product, and communication evidence', wrong: ['More precise-looking coordinates', 'One social post', 'A random global rank'], explanation: 'Positioning should be grounded in observed or researched meaning.' },
  { chapter: '2', objective: 'Compare distribution', question: 'Why is outlet presence not the same as sales strength?', application: 'A product is listed but often out of stock and sells slowly. What does this show?', correct: 'Availability quality and sell-out still matter', wrong: ['Listings guarantee demand', 'Distribution has no value', 'Price never matters'], explanation: 'Presence is only one step toward conversion and repeat.' },
  { chapter: '2', objective: 'Connect the commercial system', question: 'Which elements should reinforce positioning?', application: 'A premium promise uses a discount pack and weak placement. What is misaligned?', correct: 'Target, promise, pack, price, and place', wrong: ['Only factory age', 'Only annual-report format', 'Only tax filing'], explanation: 'Commercial choices should form one coherent offer system.' },
  { chapter: '3', objective: 'Explain capability systems', question: 'What is a capability system?', application: 'Brand demand funds route investment, which improves availability and data. What is this?', correct: 'Reinforcing activities and resources', wrong: ['One isolated product feature', 'A market-share estimate', 'A temporary promotion only'], explanation: 'A capability system consists of activities that strengthen one another.' },
  { chapter: '3', objective: 'Explain partnerships', question: 'Can a partner capability create advantage?', application: 'Monster uses co-packers and distribution partners rather than owning every asset. What matters?', correct: 'Access, fit, governance, and reliable execution', wrong: ['Ownership is always required', 'Contracts remove every risk', 'Partners cannot be strategic'], explanation: 'Well-governed partner capabilities can support a distinctive system.' },
  { chapter: '3', objective: 'Identify strategic trade-offs', question: 'Why do trade-offs matter?', application: 'A focused energy specialist declines unrelated categories. What may this preserve?', correct: 'Clarity and concentrated capability investment', wrong: ['Automatic market monopoly', 'No consumer risk', 'Zero need for distribution'], explanation: 'Trade-offs help sustain a distinctive position and prevent activity conflict.' },
]);

const TAKEAWAY_43: NabModule04Takeaways = {
  learned: 'You can design a fair benchmark and explain commercial and capability differences among beverage competitors.',
  keyTakeaways: ['The decision determines the competitor set.', 'Aligned criteria and provenance protect comparability.', 'Benchmark target, portfolio, positioning, price-pack, and route as a system.', 'Durable differences come from reinforcing capabilities and trade-offs.'],
  businessImplications: 'Benchmarking should identify which capability gap matters and whether copying it fits the company’s strategy.',
  remember: 'Do not score what you cannot define, source, and connect to a decision.',
  nextLesson: 'Key Success Factors',
};

const LESSON_44_META: LessonMeta = {
  title: 'Key Success Factors',
  description: 'Connect brand strength, distribution, scale, innovation, efficiency, and customer understanding to competitive outcomes.',
  takeaways: ['Brand strength must convert into choice and repeat.', 'Reach creates value only with reliable execution and healthy economics.', 'Learning and operating capabilities sustain relevance over time.'],
};

const lesson44 = [
  chapter({
    title: 'Why Brand Strength Matters', chapterTitle: 'Key Success Factors', readingTime: '6 min',
    objective: 'Explain how awareness, associations, preference, trust, availability, and experience build beverage brand equity.',
    mateIntro: 'In a two-second cooler decision, the brand a shopper recognises may enter consideration first—but a disappointing product can still lose the repeat sale.',
    keyInsight: 'Brand strength reduces choice friction, but it remains valuable only when the product and experience repeatedly justify the promise.',
    narrative: [
      { label: 'What it is', text: 'Brand equity is the added response a name and its associations create beyond the physical product alone.' },
      { label: 'How it works', text: 'Awareness earns consideration; relevant meaning creates preference; trust reduces perceived risk; distinctive assets aid recognition; consistent experience supports repeat.' },
      { label: 'Real-world example', text: 'Coca-Cola and Pepsi maintain global brand systems across local bottling and retail execution. Red Bull built a focused identity around the energy category and reported sales in 178 countries in 2025.' },
      { label: 'Why it matters', text: 'Strong brands can improve launch acceptance, retailer confidence, and pricing resilience, but cannot compensate indefinitely for poor availability or delivery.' },
    ],
    visualKind: 'nab-m4-44-1-brand-equity', visualHeading: 'How brand strength becomes business value', visualIntro: 'Trace the sequence from recognition to repeat and commercial outcomes.',
    keyTerms: [{ term: 'Brand equity', definition: 'The incremental value created by brand knowledge and associations.' }, { term: 'Distinctive asset', definition: 'A recognisable brand element such as colour, shape, name, or sound.' }, { term: 'Brand preference', definition: 'A consumer’s tendency to choose one brand over relevant alternatives.' }],
    recap: ['Awareness is the start, not the end, of brand strength.', 'Relevant associations and trust shape preference.', 'Consistent experience supports repeat.', 'Brand value and availability reinforce one another.'],
    chapterRecap: 'Brand strength converts memory into choice only when the operating system delivers the promised experience.',
    deepDiveTitle: 'Measuring brand strength without vanity metrics',
    body: <DeepDive paragraphs={['Track aided and unaided awareness, consideration, preference, penetration, repeat, willingness to pay, and distinctive-asset recognition. Social engagement alone does not establish consumer choice.', 'Separate corporate reputation, individual brand equity, and campaign performance. They can influence one another but are not interchangeable measures.']} />,
    sources: [SOURCES.cokeSystem, SOURCES.redBull, SOURCES.coke10k],
  }),
  chapter({
    title: 'Distribution Reach and Economies of Scale', chapterTitle: 'Key Success Factors', readingTime: '7 min',
    objective: 'Explain how availability, retail execution, route density, manufacturing scale, and utilisation influence competitiveness.',
    mateIntro: 'A brand can be famous nationally and still lose tonight’s sale if the nearest outlet has no cold stock.',
    keyInsight: 'Reach becomes advantage when products are available in the right condition and the network serves demand economically.',
    narrative: [
      { label: 'What it is', text: 'Distribution reach is access to relevant outlets and occasions; scale economics arise when greater activity improves average cost, capability, bargaining, or learning.' },
      { label: 'How it works', text: 'Dense routes, productive plants, shared systems, and larger procurement can spread fixed resources. But too many SKUs, low-utilisation assets, distant stops, or weak partner returns can offset scale.' },
      { label: 'Real-world example', text: 'SPVB’s announced Long An plant—planned above US$300 million and up to 800 million litres annual capacity—illustrates capacity investment. Monster describes using co-packers and Coca-Cola network distributors, showing another route to production and market scale.' },
      { label: 'Why it matters', text: 'Companies should distinguish nominal capacity or outlet count from productive, profitable availability.' },
    ],
    visualKind: 'nab-m4-44-2-scale-reach', visualHeading: 'The reach-and-scale flywheel', visualIntro: 'See how scale creates advantage—and where complexity can break it.',
    statTiles: [{ value: '800M L/year', label: 'SPVB Long An planned capacity', description: 'Company-stated future capacity, not current output.' }, { value: '6th plant', label: 'SPVB Vietnam plant announcement', description: 'Long An groundbreaking announcement, April 2024.' }],
    keyTerms: [{ term: 'Route density', definition: 'The amount of productive demand served within a route area.' }, { term: 'Capacity utilisation', definition: 'Actual output relative to available productive capacity.' }, { term: 'Economies of scale', definition: 'Benefits created when greater activity spreads resources or improves capability.' }, { term: 'Retail execution', definition: 'In-outlet work that delivers stock, visibility, condition, price, and promotion.' }],
    recap: ['Reach must be relevant, not merely broad.', 'Cold, visible, in-stock product converts demand.', 'Scale can improve cost and learning.', 'Complexity and under-utilisation can erase scale benefits.'],
    chapterRecap: 'The winning network combines reach, execution quality, utilisation, route productivity, and partner health.',
    deepDiveTitle: 'Testing whether scale is real',
    body: <DeepDive paragraphs={['Ask whether higher volume improves line utilisation, procurement, route density, forecast accuracy, and technology leverage. Then subtract added complexity, working capital, management layers, and service burden.', 'Outlet count should be paired with on-shelf availability, cold availability where relevant, sales per outlet, service cost, and repeat. A broad but unproductive network is not a moat.']} />,
    sources: [SOURCES.suntoryPlant, SOURCES.reutersPlant, SOURCES.monster10k],
  }),
  chapter({
    title: 'Innovation, Efficiency, and Customer Understanding', chapterTitle: 'Key Success Factors', readingTime: '7 min',
    objective: 'Explain how consumer insight, product development, learning speed, technology, and supply-chain efficiency sustain competitiveness.',
    mateIntro: 'Launching many flavours looks innovative; learning which occasion they solve and scaling the winners is the harder capability.',
    keyInsight: 'Sustained competitiveness comes from a learning system that turns customer evidence into better products and reliable economics.',
    narrative: [
      { label: 'What it is', text: 'An innovation system identifies unmet needs, develops and tests offers, scales evidence-backed winners, and retires weak ideas. Efficiency delivers that portfolio with quality, speed, and disciplined resource use.' },
      { label: 'How it works', text: 'Consumer research defines the job; prototypes test the proposition; operations validate manufacturability; channels test conversion; post-launch data informs expansion or correction.' },
      { label: 'Real-world example', text: 'PepsiCo’s 2024 annual report describes beverage and food innovation across a diversified portfolio, while Monster’s filings highlight demand forecasting, co-packing capacity, and distribution as operating dependencies. Innovation and execution cannot be separated.' },
      { label: 'Why it matters', text: 'A fast launch that cannot be produced, distributed, or repeated profitably is activity—not durable innovation.' },
    ],
    visualKind: 'nab-m4-44-3-learning-system', visualHeading: 'The consumer-to-scale learning system', visualIntro: 'Connect insight, experimentation, operations, launch, and learning.',
    keyTerms: [{ term: 'Consumer insight', definition: 'An evidence-based explanation of behaviour that can guide action.' }, { term: 'Stage gate', definition: 'A decision point that determines whether an innovation advances, changes, or stops.' }, { term: 'Speed to learning', definition: 'How quickly a company produces reliable evidence for a decision.' }, { term: 'Operational efficiency', definition: 'The ability to deliver required output with disciplined resources, quality, and reliability.' }],
    recap: ['Insight should explain a behaviour and guide a choice.', 'Stage gates protect resources from weak ideas.', 'Manufacturing and route constraints belong in innovation design.', 'Speed to learning matters more than launch count alone.'],
    chapterRecap: 'The strongest innovators learn quickly, scale selectively, and execute reliably.',
    deepDiveTitle: 'Balancing speed and evidence',
    body: <DeepDive paragraphs={['Use low-cost tests for proposition and demand before committing scarce line time, packaging inventory, and national distribution. Increase investment as evidence strengthens.', 'Efficiency should not remove productive experimentation. Separate the repeatable core, where standardisation matters, from controlled tests, where learning requires variation.']} />,
    sources: [SOURCES.pepsi2024, SOURCES.monster10k, SOURCES.coke10k],
  }),
];

const VISUALS_44 = {
  'nab-m4-44-1-brand-equity': { title: 'Brand Equity Chain', subtitle: 'From memory to commercial outcome', mode: 'flow', rows: [{ label: 'Awareness', detail: 'Enter consideration quickly' }, { label: 'Meaning', detail: 'Own a relevant benefit or identity' }, { label: 'Preference', detail: 'Win versus available alternatives' }, { label: 'Experience', detail: 'Deliver the promise consistently' }, { label: 'Repeat & value', detail: 'Support loyalty, reach, and resilience' }], takeaway: 'Brand value is earned across memory, choice, delivery, and repeat.' },
  'nab-m4-44-2-scale-reach': { title: 'Reach-and-Scale Flywheel', subtitle: 'Advantage grows when the system stays productive', mode: 'network', rows: [{ label: 'Demand', detail: 'Brand and portfolio create outlet pull', value: 'Supports productive volume' }, { label: 'Reach', detail: 'Routes and partners create access', value: 'Converts demand into sales' }, { label: 'Density', detail: 'More productive activity per asset', value: 'Can improve cost to serve' }, { label: 'Learning', detail: 'More data improves forecasting and execution', value: 'Can raise availability' }, { label: 'Reinvestment', detail: 'Returns fund capacity, people, and technology', value: 'Strengthens the system' }, { label: 'Complexity risk', detail: 'Too many SKUs or low-quality volume', value: 'Can reverse the flywheel' }], takeaway: 'Scale is an outcome of productive demand and execution, not size alone.' },
  'nab-m4-44-3-learning-system': { title: 'Consumer-to-Scale Learning System', subtitle: 'A repeatable innovation capability', mode: 'flow', rows: [{ label: 'Observe', detail: 'Find behaviour and unmet need' }, { label: 'Frame', detail: 'Define the consumer job and hypothesis' }, { label: 'Test', detail: 'Prototype product, pack, price, and message' }, { label: 'Validate', detail: 'Prove production, route, and economics' }, { label: 'Scale & learn', detail: 'Expand selectively and measure repeat' }], takeaway: 'Innovation quality comes from learning and execution, not launch volume.' },
} satisfies Record<string, VisualData>;

const q44 = pairedQuiz('nab-44', [
  { chapter: '1', objective: 'Explain brand equity', question: 'What is brand equity?', application: 'Two identical product concepts receive different responses because one name is trusted. What explains the difference?', correct: 'Added consumer response created by brand knowledge', wrong: ['Factory capacity only', 'Retailer revenue only', 'Package weight only'], explanation: 'Brand equity is the incremental response associated with brand knowledge and associations.' },
  { chapter: '1', objective: 'Explain brand strength', question: 'Why is awareness alone insufficient?', application: 'A famous brand is considered but disappoints in use. What is missing?', correct: 'Relevant preference and consistent experience', wrong: ['More awareness only', 'A larger legal entity', 'More factory depreciation'], explanation: 'Awareness opens consideration; value and delivery support choice and repeat.' },
  { chapter: '1', objective: 'Measure brand strength', question: 'Which measure is closer to choice than social engagement?', application: 'A campaign gets likes but no sales. Which measure should the team examine?', correct: 'Consideration, preference, penetration, or repeat', wrong: ['Post length only', 'Logo file size', 'Factory floor area'], explanation: 'Choice and repeat metrics better connect brand response to behaviour.' },
  { chapter: '2', objective: 'Explain distribution advantage', question: 'When does distribution reach create value?', application: 'A brand is listed widely but often warm and out of stock. Is reach strong?', correct: 'Only when relevant availability and execution are reliable', wrong: ['When the product is listed, even if it is often out of stock', 'Only when the company owns every truck and depot', 'Only when the brand charges the highest shelf price'], explanation: 'Reach requires stock, condition, visibility, and service quality.' },
  { chapter: '2', objective: 'Explain scale economics', question: 'What can route density improve?', application: 'A truck serves more productive stops in the same area. What may fall?', correct: 'Service resource per unit', wrong: ['Consumer awareness automatically', 'Brand switching cost automatically', 'Product quality standards'], explanation: 'Higher density can improve labour and vehicle productivity.' },
  { chapter: '2', objective: 'Evaluate capacity', question: 'Why is announced capacity not current market performance?', application: 'A planned plant can make 800 million litres annually. What does the figure show?', correct: 'Future productive potential under stated conditions', wrong: ['Current sales volume', 'Verified market share', 'Consumer preference'], explanation: 'Capacity is potential output, not actual production or demand.' },
  { chapter: '2', objective: 'Identify diseconomies', question: 'What can erase scale benefits?', application: 'Volume grows through slow SKUs, distant stops, and low utilisation. What is happening?', correct: 'Complexity and service burden offset scale', wrong: ['Scale guarantees efficiency', 'Brand equity becomes zero', 'Revenue cannot grow'], explanation: 'Unproductive complexity can increase average cost despite size.' },
  { chapter: '3', objective: 'Explain consumer insight', question: 'What makes an observation a useful insight?', application: 'Research finds a behaviour and explains the unmet job behind it. What does that enable?', correct: 'A specific product or commercial decision', wrong: ['A generic trend list only', 'Automatic national launch', 'No further testing'], explanation: 'Insight connects evidence to an actionable explanation.' },
  { chapter: '3', objective: 'Evaluate innovation', question: 'Why is launch count a weak innovation metric?', application: 'A company launches many SKUs but few repeat or scale. What is missing?', correct: 'Evidence of consumer value and viable execution', wrong: ['More SKU names', 'Less post-launch data', 'No stage gates'], explanation: 'Innovation quality depends on learning, repeat, scale, and economics.' },
  { chapter: '3', objective: 'Balance speed and rigour', question: 'What is speed to learning?', application: 'A low-cost test quickly answers whether consumers value a concept. What capability is this?', correct: 'Producing reliable decision evidence quickly', wrong: ['Launching nationally immediately', 'Skipping quality validation', 'Maximising factory speed only'], explanation: 'Speed to learning accelerates decisions without abandoning evidence.' },
]);

const TAKEAWAY_44: NabModule04Takeaways = {
  learned: 'You can explain how brand, reach, scale, consumer learning, innovation, and efficiency combine to sustain beverage competitiveness.',
  keyTakeaways: ['Brand strength links awareness, meaning, preference, experience, and repeat.', 'Reach requires reliable in-outlet execution.', 'Scale helps when volume is productive and complexity controlled.', 'Innovation is a learning and execution system.'],
  businessImplications: 'Leaders should invest in connected capabilities and measure the quality of demand, access, learning, and returns—not size or activity alone.',
  remember: 'Success factors create advantage when they reinforce one another.',
  nextLesson: 'SWOT & Strategic Challenges',
};

const LESSON_45_META: LessonMeta = {
  title: 'SWOT & Strategic Challenges',
  description: 'Use evidence-based SWOT, identify competitive risks, and connect them to practical business responses.',
  takeaways: ['SWOT separates internal conditions from external change.', 'Risk analysis needs mechanism, exposure, and evidence.', 'Strategic responses should match the cause rather than the headline.'],
};

const lesson45 = [
  chapter({
    title: 'Understanding the Industry’s SWOT', chapterTitle: 'SWOT & Strategic Challenges', readingTime: '7 min',
    objective: 'Build an evidence-based industry SWOT that distinguishes internal characteristics from external conditions.',
    mateIntro: '“Health-conscious consumers” can be an opportunity for one portfolio and a threat to another. Where does it belong in SWOT?',
    keyInsight: 'SWOT is a structured synthesis, not a fact dump: strengths and weaknesses describe current internal characteristics; opportunities and threats describe external change.',
    narrative: [
      { label: 'What it is', text: 'SWOT organises evidence into internal strengths and weaknesses and external opportunities and threats for a defined industry, company, or decision.' },
      { label: 'How it works', text: 'Define the subject, collect evidence, classify each factor by locus and direction, explain the mechanism, and prioritise by importance and uncertainty.' },
      { label: 'Real-world example', text: 'Broad beverage systems and established routes can be industry strengths. Portfolio and route complexity can be weaknesses. New health-oriented occasions can create opportunities. Tax, input volatility, and substitution can create threats. These are Casemate’s evidence-based synthesis, not official company statements.' },
      { label: 'Why it matters', text: 'A disciplined SWOT connects external change with the capabilities available to respond.' },
    ],
    visualKind: 'nab-m4-45-1-swot-matrix', visualHeading: 'Evidence-based beverage industry SWOT', visualIntro: 'A qualitative synthesis; each item requires market-specific validation.',
    keyTerms: [{ term: 'Strength', definition: 'A favourable internal characteristic or capability of the defined subject.' }, { term: 'Weakness', definition: 'An unfavourable internal limitation or vulnerability.' }, { term: 'Opportunity', definition: 'An external condition that could create value if addressed well.' }, { term: 'Threat', definition: 'An external condition that could reduce value or raise risk.' }],
    recap: ['Define whether the subject is an industry or company.', 'Strengths and weaknesses are internal to that subject.', 'Opportunities and threats arise externally.', 'Prioritise factors with evidence and mechanisms.'],
    chapterRecap: 'A useful SWOT explains why each factor matters and which capability can act on it.',
    deepDiveTitle: 'Avoiding common SWOT errors',
    body: <DeepDive paragraphs={['Do not list the same factor in multiple boxes without explaining the different mechanism. Do not treat a forecast as certainty or a company’s promotional claim as independent evidence.', 'An industry-level strength may not belong to every company. Established distribution infrastructure, for example, benefits incumbents with access more than a new entrant without relationships.']} />,
    sources: [SOURCES.moduleResearch, SOURCES.porter, SOURCES.coke10k, SOURCES.pepsi2024],
  }),
  chapter({
    title: 'Key Competitive Risks and Challenges', chapterTitle: 'SWOT & Strategic Challenges', readingTime: '7 min',
    objective: 'Explain how consumer, regulatory, channel, cost, environmental, and rivalry risks affect beverage strategy.',
    mateIntro: 'A sugar-tax change can alter price, mix, reformulation, retailer negotiations, and consumer choice at the same time.',
    keyInsight: 'A competitive risk matters through its mechanism: what changes, which part of the portfolio is exposed, and how quickly the company can respond.',
    narrative: [
      { label: 'What it is', text: 'Competitive risk is uncertainty that can weaken demand, economics, access, operations, or strategic freedom relative to rivals.' },
      { label: 'How it works', text: 'Teams map the trigger, exposed products or channels, financial and operational transmission, probability, speed, and available mitigations.' },
      { label: 'Real-world example', text: 'Vietnam’s new Special Sales Tax applies to qualifying beverages above 5g sugar per 100ml, with regulated exclusions: 8% from 1 January 2027 and 10% from 1 January 2028. Exposure therefore varies by formulation and portfolio—not all beverages.' },
      { label: 'Why it matters', text: 'Companies with better reformulation, portfolio, pricing, route data, and execution may turn the same external pressure into relative advantage.' },
    ],
    visualKind: 'nab-m4-45-2-risk-map', visualHeading: 'Competitive risk transmission map', visualIntro: 'Trace each trigger through exposure, mechanism, outcome, and response.',
    statTiles: [{ value: '8%', label: 'SST from 1 Jan 2027', description: 'Qualifying beverages above 5g sugar/100ml; exclusions apply.' }, { value: '10%', label: 'SST from 1 Jan 2028', description: 'Next step in Vietnam’s enacted roadmap.' }],
    keyTerms: [{ term: 'Risk exposure', definition: 'The part of a portfolio or system affected by a risk.' }, { term: 'Transmission mechanism', definition: 'The path through which a trigger changes business outcomes.' }, { term: 'Mitigation', definition: 'An action that reduces probability, impact, or recovery time.' }, { term: 'Scenario', definition: 'A coherent possible future used to test decisions.' }],
    recap: ['Tax exposure depends on product scope and formulation.', 'Consumer change can affect categories unevenly.', 'Input, FX, water, and route risks transmit through operations and economics.', 'Rivalry can intensify when growth slows or alternatives expand.'],
    chapterRecap: 'Name the trigger, exposed portfolio, mechanism, time horizon, and mitigation before calling something a strategic risk.',
    deepDiveTitle: 'From risk list to decision',
    body: <DeepDive paragraphs={['Use scenarios rather than one-point forecasts. For each scenario, identify no-regret moves, signposts to monitor, and decisions that should wait for stronger evidence.', 'Regulatory evidence needs the enacted law or credible professional summary. Separate effective date, rate date, threshold, exclusions, and implementation guidance so the entire portfolio is not misclassified.']} />,
    sources: [SOURCES.pwcSst, SOURCES.moduleResearch, SOURCES.monster10k],
  }),
  chapter({
    title: 'Strategic Opportunities and Business Responses', chapterTitle: 'SWOT & Strategic Challenges', readingTime: '7 min',
    objective: 'Match innovation, repositioning, distribution, efficiency, and partnership responses to specific competitive challenges.',
    mateIntro: 'When an external force changes, the first visible response is often a new product—but the winning response may require pricing, routes, partners, and operations too.',
    keyInsight: 'A strategic response works when it addresses the risk mechanism and fits the company’s capabilities and economics.',
    narrative: [
      { label: 'What it is', text: 'A strategic response is a coordinated set of choices designed to capture an opportunity or reduce a threat while protecting long-run position.' },
      { label: 'How it works', text: 'Companies can reformulate or innovate, reposition portfolios, redesign price-packs, expand selected channels, improve productivity, diversify supply, or partner for missing capability.' },
      { label: 'Real-world example', text: 'SPVB’s Long An investment combines future capacity with renewable-energy plans and recycled-plastic packaging ambitions. Monster uses co-packers and distribution agreements to scale without owning every stage. The examples show different responses to scale and capability needs.' },
      { label: 'Why it matters', text: 'Isolated actions can conflict: a lower-sugar launch needs a credible proposition, manufacturable formula, correct price-pack, channel support, and repeat demand.' },
    ],
    visualKind: 'nab-m4-45-3-response-map', visualHeading: 'Challenge-to-response map', visualIntro: 'Connect the mechanism to a coordinated response and measurable signpost.',
    keyTerms: [{ term: 'Repositioning', definition: 'Changing the target meaning or competitive frame of an offer.' }, { term: 'Portfolio shift', definition: 'Reallocating focus across categories, brands, or formats.' }, { term: 'No-regret move', definition: 'An action likely to help across several plausible scenarios.' }, { term: 'Strategic partnership', definition: 'A governed relationship that combines complementary capabilities.' }],
    recap: ['Responses should match the risk mechanism.', 'Portfolio, price-pack, route, and operations must align.', 'Partnerships can accelerate missing capabilities.', 'Signposts and staged investment protect against uncertainty.'],
    chapterRecap: 'Respond as a system: proposition, portfolio, economics, operations, route, and evidence must move together.',
    deepDiveTitle: 'Prioritising responses under uncertainty',
    body: <DeepDive paragraphs={['Rank moves by strategic fit, consumer value, regulatory compliance, economics, capability readiness, speed to evidence, reversibility, and downside risk. Stage commitments where uncertainty is high.', 'Define signposts before acting: reformulation test results, repeat rate, price elasticity, outlet productivity, supply continuity, regulatory guidance, or capacity utilisation.']} />,
    sources: [SOURCES.suntoryPlant, SOURCES.monster10k, SOURCES.pwcSst],
  }),
];

const VISUALS_45 = {
  'nab-m4-45-1-swot-matrix': { title: 'Industry-Level SWOT', subtitle: 'Casemate evidence-based analysis—not company guidance', mode: 'swot', rows: [{ label: 'Strengths', detail: 'Recognised portfolios, established production, routes, and repeat occasions', value: 'Internal / favourable' }, { label: 'Weaknesses', detail: 'Complex routes, packaging exposure, portfolio complexity, uneven data', value: 'Internal / unfavourable' }, { label: 'Opportunities', detail: 'New needs, reformulation, functional occasions, selective digital reach', value: 'External / favourable' }, { label: 'Threats', detail: 'Tax, substitution, input volatility, environmental and competitive pressure', value: 'External / unfavourable' }], takeaway: 'SWOT becomes useful when evidence, locus, mechanism, and priority are explicit.' },
  'nab-m4-45-2-risk-map': { title: 'Risk Transmission Map', subtitle: 'Move from headline to business mechanism', mode: 'flow', rows: [{ label: 'Trigger', detail: 'Policy, consumer, input, climate, channel, or rival move' }, { label: 'Exposure', detail: 'Which product, route, asset, or profit pool?' }, { label: 'Mechanism', detail: 'Price, demand, cost, access, quality, or cash' }, { label: 'Outcome', detail: 'Share, margin, volume, resilience, or trust' }, { label: 'Mitigation', detail: 'Portfolio, price, supply, route, efficiency, or partnership' }], takeaway: 'Risk analysis is actionable only when the transmission path is clear.' },
  'nab-m4-45-3-response-map': { title: 'Challenge-to-Response Matrix', subtitle: 'Illustrative strategic options to validate', mode: 'table', headers: ['Challenge mechanism', 'Coordinated response', 'Signpost'], rows: [{ label: 'Health or tax pressure', detail: 'Reformulate, reposition, adjust portfolio and price-pack', value: 'Trial, repeat, elasticity, compliance' }, { label: 'Weak access', detail: 'Prioritise channels, partners, service, and execution', value: 'Availability and outlet productivity' }, { label: 'Input volatility', detail: 'Design, sourcing, contracts, inventory, productivity', value: 'Landed cost and continuity' }, { label: 'Slow learning', detail: 'Insight, testing, stage gates, post-launch review', value: 'Speed to reliable evidence' }, { label: 'Capability gap', detail: 'Build, buy, or partner with clear governance', value: 'Service, economics, dependency' }], takeaway: 'The response should address the mechanism and define evidence for adaptation.' },
} satisfies Record<string, VisualData>;

const q45 = pairedQuiz('nab-45', [
  { chapter: '1', objective: 'Classify SWOT factors', question: 'What belongs in the strength box of an industry SWOT?', application: 'Established route capabilities already exist within the defined industry. How are they classified?', correct: 'A favourable internal characteristic', wrong: ['An external opportunity', 'An external threat', 'A future forecast only'], explanation: 'Strengths are favourable internal characteristics of the defined subject.' },
  { chapter: '1', objective: 'Classify SWOT factors', question: 'What makes a trend an opportunity rather than a strength?', application: 'New demand for a category is growing outside the company. Which box fits?', correct: 'It is a favourable external condition', wrong: ['It is an owned capability', 'It is automatically a weakness', 'It is confirmed company guidance'], explanation: 'Opportunities arise externally and require a capability to capture them.' },
  { chapter: '1', objective: 'Use SWOT responsibly', question: 'Why should SWOT specify the subject?', application: 'A route network helps incumbents but not every entrant. What does this show?', correct: 'The same factor can differ by company or industry boundary', wrong: ['SWOT has universal boxes', 'Evidence is unnecessary', 'All firms own the same capabilities'], explanation: 'Internal strengths and weaknesses depend on whose position is analysed.' },
  { chapter: '2', objective: 'Analyse risk mechanisms', question: 'What should follow identification of a risk trigger?', application: 'A tax law changes. What should the team identify next?', correct: 'The exposed portfolio and transmission mechanism', wrong: ['A generic threat label only', 'A precise market share guess', 'Every possible response at once'], explanation: 'Exposure and mechanism connect the trigger to business impact.' },
  { chapter: '2', objective: 'Interpret Vietnam SST', question: 'Which statement correctly describes the sugary-drink SST scope?', application: 'A slide applies 8% to every beverage from 2027. How should it change?', correct: 'It applies to qualifying drinks above 5g sugar/100ml, with exclusions', wrong: ['It applies to all water', 'It begins at 10% in 2026', 'It has no product threshold'], explanation: 'The enacted roadmap has a sugar threshold, exclusions, and staged rates.' },
  { chapter: '2', objective: 'Use scenarios', question: 'Why use scenarios for strategic risk?', application: 'Demand and regulatory implementation remain uncertain. What does scenario planning provide?', correct: 'Several coherent futures, signposts, and contingent actions', wrong: ['One guaranteed forecast', 'No need for monitoring', 'Automatic market leadership'], explanation: 'Scenarios help prepare decisions without pretending uncertainty is resolved.' },
  { chapter: '2', objective: 'Prioritise risk', question: 'Which risk description is most actionable?', application: 'Choose between “competition” and a specific route pressure with timing and exposure. Which is better?', correct: 'The one naming trigger, exposure, mechanism, and horizon', wrong: ['The shorter generic label', 'The one with no source', 'The one covering every company equally'], explanation: 'Specific mechanisms make risk measurable and manageable.' },
  { chapter: '3', objective: 'Match response to mechanism', question: 'What is the first test for a strategic response?', application: 'A company launches a product because regulation changed. What should it confirm?', correct: 'The response addresses the actual exposure and mechanism', wrong: ['The response is fashionable', 'A rival used it somewhere', 'It requires the largest budget'], explanation: 'A response should solve the cause, not merely react to the headline.' },
  { chapter: '3', objective: 'Evaluate partnerships', question: 'When can a partnership be a suitable response?', application: 'A company lacks route capability in a target channel. What option may fit?', correct: 'Partner for complementary access with clear governance', wrong: ['Ignore dependency and incentives', 'Assume every partner is equivalent', 'Remove performance metrics'], explanation: 'Partnerships can close capability gaps when fit and governance are strong.' },
  { chapter: '3', objective: 'Stage decisions', question: 'What is a no-regret move?', application: 'A capability improves resilience across several plausible futures. How is it classified?', correct: 'An action likely to help across multiple scenarios', wrong: ['A move with guaranteed profit', 'An irreversible bet on one forecast', 'A response with no evidence'], explanation: 'No-regret moves remain useful across a range of plausible outcomes.' },
]);

const TAKEAWAY_45: NabModule04Takeaways = {
  learned: 'You can build an evidence-based SWOT, trace competitive risks, and match coordinated responses to the underlying mechanisms.',
  keyTakeaways: ['SWOT depends on a clearly defined subject.', 'Risks require trigger, exposure, mechanism, horizon, and mitigation.', 'Vietnam’s sugary-drink tax has a threshold, exclusions, and staged rates.', 'Strategic responses should align portfolio, economics, operations, routes, and evidence.'],
  businessImplications: 'Companies that diagnose mechanisms and stage evidence-backed responses can turn external pressure into relative advantage.',
  remember: 'Do not respond to the headline; respond to the mechanism.',
  nextLesson: 'Module 05 · Trends & Outlook',
};

// NEXT_BATCH
const ALL_LESSONS: LessonMeta[] = [LESSON_41_META, LESSON_42_META, LESSON_43_META, LESSON_44_META, LESSON_45_META];
const ALL_DECKS: Record<string, NabModule04CardData[]> = { [LESSON_41_META.title]: lesson41, [LESSON_42_META.title]: lesson42, [LESSON_43_META.title]: lesson43, [LESSON_44_META.title]: lesson44, [LESSON_45_META.title]: lesson45 };
const ALL_VISUALS = { ...VISUALS_41, ...VISUALS_42, ...VISUALS_43, ...VISUALS_44, ...VISUALS_45 };
const ALL_QUIZZES: Record<string, NabModule04Question[]> = { [LESSON_41_META.title]: q41, [LESSON_42_META.title]: q42, [LESSON_43_META.title]: q43, [LESSON_44_META.title]: q44, [LESSON_45_META.title]: q45 };
const ALL_TAKEAWAYS: Record<string, NabModule04Takeaways> = { [LESSON_41_META.title]: TAKEAWAY_41, [LESSON_42_META.title]: TAKEAWAY_42, [LESSON_43_META.title]: TAKEAWAY_43, [LESSON_44_META.title]: TAKEAWAY_44, [LESSON_45_META.title]: TAKEAWAY_45 };

export const NAB_MODULE04_LESSONS = ALL_LESSONS;
export const NAB_MODULE04_DECKS = ALL_DECKS;
applyChapterVisualText(NAB_MODULE04_DECKS, NAB_M4_VISUALS);
export const NAB_MODULE04_QUIZZES = ALL_QUIZZES;
export const NAB_MODULE04_TAKEAWAYS = ALL_TAKEAWAYS;
export type NabModule04VisualKind = keyof typeof ALL_VISUALS;

function VisualTable({ data }: { data: VisualData }) {
  const headers = data.headers ?? ['Topic', 'Explanation', 'Implication'];
  return <div className="overflow-x-auto rounded-xl border border-slate-200"><table className="w-full min-w-[620px] border-collapse text-left"><thead className="bg-red-600 text-white"><tr>{headers.map((header) => <th key={header} className="px-4 py-3 text-xs font-black">{header}</th>)}</tr></thead><tbody>{data.rows.map((row, index) => <tr key={row.label} className={index % 2 ? 'bg-slate-50' : 'bg-white'}><th className="px-4 py-3 text-xs font-black text-slate-900">{row.label}</th><td className="px-4 py-3 text-xs leading-5 text-slate-600">{row.detail}</td><td className="px-4 py-3 text-xs font-bold leading-5 text-red-600">{row.value ?? '—'}</td></tr>)}</tbody></table></div>;
}
function VisualFlow({ data }: { data: VisualData }) { return <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">{data.rows.map((row, index) => <div key={row.label} className="relative rounded-xl border border-slate-200 bg-white p-4"><span className="text-[10px] font-black uppercase tracking-[0.14em] text-red-600">{String(index + 1).padStart(2, '0')}</span><p className="mt-2 text-sm font-black text-slate-900">{row.label}</p><p className="mt-1 text-xs leading-5 text-slate-500">{row.detail}</p></div>)}</div>; }
function VisualNetwork({ data }: { data: VisualData }) { return <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{data.rows.map((row, index) => <div key={row.label} className={`rounded-xl border p-4 ${index === 0 ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}`}><p className="text-sm font-black text-slate-900">{row.label}</p><p className="mt-1 text-xs leading-5 text-slate-500">{row.detail}</p>{row.value ? <p className="mt-2 text-xs font-bold text-red-600">{row.value}</p> : null}</div>)}</div>; }
function VisualSwot({ data }: { data: VisualData }) { return <div className="grid gap-3 sm:grid-cols-2">{data.rows.map((row, index) => <div key={row.label} className={`rounded-xl border p-4 ${index === 0 || index === 2 ? 'border-red-200 bg-red-50' : 'border-slate-200 bg-slate-50'}`}><div className="flex items-center justify-between gap-3"><p className="text-sm font-black text-slate-900">{row.label}</p><span className="text-[10px] font-bold uppercase tracking-[0.12em] text-red-600">{row.value}</span></div><p className="mt-2 text-xs leading-5 text-slate-600">{row.detail}</p></div>)}</div>; }

export function renderNabModule04Visual(kind: NabModule04VisualKind): ReactNode {
  const visual = NAB_M4_VISUALS[kind];
  return visual ? <VisualView spec={visual.spec} /> : null;
}
