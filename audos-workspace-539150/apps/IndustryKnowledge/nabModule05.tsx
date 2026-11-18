import type { ReactNode } from 'react';
import { selectLessonQuestions } from './dairyQuizCore';
import { VisualView } from './fashionVisualKit';
import { NAB_M5_VISUALS } from './nabM5VisualSpecs';
import { applyChapterVisualText } from './chapterVisualText';

export interface NabModule05Source { title: string; href: string; publisher: string }
export interface NabModule05Narrative { label: 'What is changing' | 'Why it is happening' | 'Real-world example' | 'Business impact'; text: string }
export interface NabModule05CardData {
  title: string; chapterTitle: string; readingTime: string; objective: string; mateIntro: string; keyInsight: string;
  concepts: []; narrative: NabModule05Narrative[]; visualKind: NabModule05VisualKind; visualHeading: string; visualIntro: string;
  statTiles?: Array<{ value?: string; label: string; subtitle?: string; description: string }>;
  keyTerms: Array<{ term: string; definition: string }>; recap: string[]; chapterRecap: string; deepDiveTitle: string; body: ReactNode; sources: NabModule05Source[];
}
export interface NabModule05Question { id: string; question: string; options: Array<{ id: string; text: string }>; correctOptionId: string; explanation: string; moduleId: string; objective: string }
export interface NabModule05Takeaways { learned: string; keyTakeaways: string[]; businessImplications: string; remember: string; nextLesson: string }
interface LessonMeta { title: string; description: string; takeaways: string[] }

const SOURCES = {
  eyWellness: { title: 'Wellness trends shaping the future of beverages', href: 'https://www.ey.com/en_us/industries/consumer-products/wellness-trends-shaping-the-future-of-beverages', publisher: 'EY' },
  eySurvey: { title: 'EY Consumer Beverage Survey', href: 'https://www.ey.com/en_us/newsroom/2026/03/ey-consumer-beverage-survey', publisher: 'EY' },
  gvrGlobal: { title: 'Non-Alcoholic Beverages Market Size Report, 2026–2033', href: 'https://www.grandviewresearch.com/industry-analysis/nonalcoholic-beverage-market', publisher: 'Grand View Research' },
  gvrDrinks: { title: 'Non-Alcoholic Drinks Market Size and Outlook, 2030', href: 'https://www.grandviewresearch.com/industry-analysis/non-alcoholic-drinks-market', publisher: 'Grand View Research' },
  whoTaxes: { title: 'Global report on the use of sugar-sweetened beverage taxes, 2025', href: 'https://www.who.int/publications/i/item/9789240118942', publisher: 'World Health Organization' },
  pwcSst: { title: 'New Special Sales Tax Law', href: 'https://www.pwc.com/vn/en/publications/2025/250701-new-sst-law.pdf', publisher: 'PwC Vietnam' },
  kpmgEpr: { title: 'Key Amendments to Vietnam’s Environment Protection Regulations on EPR', href: 'https://kpmg.com/vn/en/insights/2025/02/key-amendments-to-vietnam-environment-protection-regulations.html', publisher: 'KPMG Vietnam' },
  eprDecree: { title: 'Decree 110/2026/ND-CP on producer and importer recycling responsibility', href: 'https://congbao.chinhphu.vn/van-ban/nghi-dinh-so-110-2026-nd-cp-469301.htm', publisher: 'Vietnam Government Gazette' },
  cokeResults: { title: 'Coca-Cola Reports Fourth Quarter and Full Year 2024 Results', href: 'https://investors.coca-colacompany.com/news-events/press-releases/detail/1128/coca-cola-reports-fourth-quarter-and-full-year-2024-results', publisher: 'The Coca-Cola Company' },
  pepsi2024: { title: '2024 Annual Report', href: 'https://www.pepsico.com/docs/pepsico-5v9wci20/media/Files/investors/2024-pepsico-annual-report-01.pdf', publisher: 'PepsiCo' },
  monster10k: { title: '2024 Annual Report', href: 'https://investors.monsterbevcorp.com/financial-information/annual-reports', publisher: 'Monster Beverage' },
  suntoryPlant: { title: 'Suntory PepsiCo Vietnam begins construction of its sixth plant in Long An', href: 'https://www.suntorypepsico.vn/tin-tuc/suntory-pepsico-viet-nam-khoi-cong-xay-dung-nha-may-thu-6-tai-long-an', publisher: 'Suntory PepsiCo Vietnam' },
  thp: { title: 'Tan Hiep Phat — 30 years of perseverance and breakthroughs', href: 'https://vir.com.vn/tan-hiep-phat-30-years-of-perseverance-and-breakthroughs-117914.html', publisher: 'Vietnam Investment Review' },
  masan: { title: 'Annual Reports', href: 'https://masanconsumer.com/en/annual-report/', publisher: 'Masan Consumer' },
  moduleResearch: { title: 'Module 05 research record (row 16, module05-research-v1)', href: 'https://audos.com/', publisher: 'Casemate WorkspaceDB' },
} satisfies Record<string, NabModule05Source>;

function DeepDive({ paragraphs }: { paragraphs: string[] }) { return <div className="space-y-4">{paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>; }
function chapter(input: Omit<NabModule05CardData, 'concepts'>): NabModule05CardData { return { ...input, concepts: [] }; }
interface VisualData { title: string; subtitle: string; mode: 'flow' | 'table' | 'network' | 'timeline' | 'matrix'; headers?: string[]; rows: Array<{ label: string; detail: string; value?: string }>; takeaway: string }
interface QuizSeed { chapter: '1' | '2' | '3'; objective: string; question: string; application: string; correct: string; wrong: [string, string, string]; explanation: string }
const optionIds = ['a', 'b', 'c', 'd'];
function pairedQuiz(prefix: string, seeds: QuizSeed[]): NabModule05Question[] {
  const pairs = seeds.map((seed, seedIndex) => [seed.question, seed.application].map((question, pairIndex) => {
    const rotation = (seedIndex + pairIndex) % 4; const raw = [seed.correct, ...seed.wrong]; const rotated = raw.slice(rotation).concat(raw.slice(0, rotation));
    return { id: `${prefix}-${seedIndex + 1}${pairIndex ? 'b' : 'a'}`, question, options: rotated.map((text, index) => ({ id: optionIds[index], text })), correctOptionId: optionIds[rotated.indexOf(seed.correct)], explanation: seed.explanation, moduleId: seed.chapter, objective: seed.objective };
  }) as [NabModule05Question, NabModule05Question]);
  return selectLessonQuestions(pairs, seeds.map((seed) => seed.chapter));
}

const LESSON_51_META: LessonMeta = {
  title: 'Consumer Trends',
  description: 'Understand changing lifestyles, wellness expectations, occasions, affordability, and Vietnam consumer contexts.',
  takeaways: ['Consumers increasingly balance wellness, identity, convenience, and price.', 'Health expectations differ by generation and occasion.', 'Vietnam trends require local evidence rather than imported global assumptions.'],
};

const lesson51 = [
  chapter({
    title: 'How Beverage Consumers Are Changing', chapterTitle: 'Consumer Trends', readingTime: '6 min',
    objective: 'Explain how demographics, lifestyles, digital discovery, purchasing behaviour, and occasions are changing beverage choice.',
    mateIntro: 'The same consumer may choose hydration during a commute, focus while studying, and a social non-alcoholic option at night.',
    keyInsight: 'Consumer change is not one trend: needs, occasions, channels, identity, and budgets are shifting together.',
    narrative: [
      { label: 'What is changing', text: 'Beverage demand is fragmenting across more occasions and benefit expectations, while digital discovery and convenience influence which products enter consideration.' },
      { label: 'Why it is happening', text: 'Urban routines, mobile commerce, flexible work and study patterns, smaller households, wellness interest, and broader product availability create more specific consumption jobs.' },
      { label: 'Real-world example', text: 'EY’s 2026 survey of 2,512 adults in the United States and Brazil found growing health-led choice and digital discovery. The evidence is useful as an international signal, but it is not a Vietnam estimate.' },
      { label: 'Business impact', text: 'Companies need occasion-based portfolios and channel plans rather than one product or message for a broad age group.' },
    ],
    visualKind: 'nab-m5-51-1-trend-map', visualHeading: 'Consumer trend map', visualIntro: 'Connect the forces changing need, choice, purchase, and repeat.',
    keyTerms: [{ term: 'Consumption occasion', definition: 'The context in which a beverage is chosen and used.' }, { term: 'Digital discovery', definition: 'Finding products through digital retail, social, search, apps, or recommendations.' }, { term: 'Need state', definition: 'The functional or emotional job a consumer wants fulfilled.' }],
    recap: ['One person can express several beverage needs in one day.', 'Digital discovery affects consideration, not just checkout.', 'Convenience and affordability still shape conversion.', 'International surveys must retain their geography and method.'],
    chapterRecap: 'Track the consumer journey by occasion: need, discovery, access, choice, experience, and repeat.',
    deepDiveTitle: 'Separating durable shifts from short-lived signals',
    body: <DeepDive paragraphs={['A durable trend appears across several periods or datasets and changes repeat behaviour, category structure, or operating investment. A viral flavour or campaign may be a short-lived signal.', 'Use cohort, occasion, channel, and repeat data together. Self-reported intention can identify hypotheses, but observed purchase and repeat provide stronger commercial evidence.']} />,
    sources: [SOURCES.eySurvey, SOURCES.eyWellness],
  }),
  chapter({
    title: 'The Rise of Health and Wellness', chapterTitle: 'Consumer Trends', readingTime: '7 min',
    objective: 'Explain how sugar reduction, functional benefits, ingredient transparency, and perceived wellness influence beverage portfolios.',
    mateIntro: 'A drink can remove sugar, add a functional ingredient, and still fail if consumers do not understand or trust the benefit.',
    keyInsight: 'Wellness demand combines formulation, credible evidence, transparent communication, taste, and affordability.',
    narrative: [
      { label: 'What is changing', text: 'Consumers increasingly examine sugar, calories, ingredients, and benefits beyond hydration, while functional beverages move into more everyday occasions.' },
      { label: 'Why it is happening', text: 'Health awareness, policy attention, ageing and active lifestyles, and wider access to product information raise expectations for what beverages should contain and communicate.' },
      { label: 'Real-world example', text: 'In EY’s US sample, 58% reported paying attention to beverage ingredients and 66% reported choosing lower-sugar or lower-calorie options. These 2025 survey results describe US respondents, not global or Vietnam prevalence.' },
      { label: 'Business impact', text: 'Brands must validate claims, manage taste and cost trade-offs, and avoid treating one wellness definition as universal.' },
    ],
    visualKind: 'nab-m5-51-2-wellness-system', visualHeading: 'The wellness proposition system', visualIntro: 'A credible offer needs more than an ingredient name.',
    statTiles: [{ value: '58%', label: 'US respondents checking ingredients', description: 'EY survey fielded Nov–Dec 2025; US adults.' }, { value: '66%', label: 'US respondents choosing lower sugar/calorie', description: 'EY survey fielded Nov–Dec 2025; self-reported behaviour.' }],
    keyTerms: [{ term: 'Functional beverage', definition: 'A beverage positioned to provide a benefit beyond basic hydration or nutrition.' }, { term: 'Reformulation', definition: 'Changing ingredients or composition to alter nutrition, taste, cost, or compliance.' }, { term: 'Ingredient transparency', definition: 'Clear, understandable disclosure of ingredients and relevant claims.' }],
    recap: ['Wellness is becoming a broader choice criterion.', 'Lower sugar and functional benefits solve different needs.', 'Claims require credible support and clear scope.', 'Taste, price, and availability remain decisive.'],
    chapterRecap: 'A wellness product wins when the benefit is meaningful, credible, enjoyable, accessible, and correctly communicated.',
    deepDiveTitle: 'Avoiding health-washing',
    body: <DeepDive paragraphs={['Separate regulated claims, evidence-backed functional statements, and general lifestyle language. The required proof and consumer risk differ.', 'A product with one highlighted ingredient is not automatically healthier overall. Teams should review complete formulation, serving size, evidence, labelling rules, and how consumers actually use it.']} />,
    sources: [SOURCES.eyWellness, SOURCES.eySurvey, SOURCES.whoTaxes],
  }),
  chapter({
    title: 'Emerging Consumption Behaviors in Vietnam', chapterTitle: 'Consumer Trends', readingTime: '7 min',
    objective: 'Apply affordability, convenience, urbanisation, health, generation, and channel lenses to evolving Vietnam beverage demand.',
    mateIntro: 'A trend visible in a central-city convenience store may look very different in a family shop where out-of-pocket price and ambient storage dominate.',
    keyInsight: 'Vietnam consumer change is layered: premiumisation and wellness can grow while affordability and traditional retail remain essential.',
    narrative: [
      { label: 'What is changing', text: 'Urban convenience, digital discovery, modern retail, ready-to-drink formats, and wellness interest are expanding choice, while value-focused demand remains substantial.' },
      { label: 'Why it is happening', text: 'Income, city tier, age, household structure, work and study routines, channel access, climate, and infrastructure shape adoption differently across Vietnam.' },
      { label: 'Real-world example', text: 'Masan Consumer’s public reporting describes investment in digitising and expanding general-trade coverage, illustrating how consumer change and traditional retail modernisation can occur together.' },
      { label: 'Business impact', text: 'Companies should test local segments and occasions rather than applying US or regional survey percentages directly to Vietnam.' },
    ],
    visualKind: 'nab-m5-51-3-vietnam-occasions', visualHeading: 'Vietnam consumption-occasion matrix', visualIntro: 'A qualitative hypothesis map to validate with local evidence.',
    keyTerms: [{ term: 'Premiumisation', definition: 'Movement toward offers with higher perceived value and often higher price.' }, { term: 'Affordability', definition: 'Whether the immediate out-of-pocket cost fits the buyer’s budget.' }, { term: 'City tier', definition: 'A practical grouping of locations by scale, development, and commercial characteristics.' }],
    recap: ['Vietnam contains several consumer and channel realities.', 'Premium and value demand can grow simultaneously.', 'Convenience depends on local infrastructure and retail formats.', 'Global trends need local validation before investment.'],
    chapterRecap: 'Localise the trend by consumer, occasion, city tier, channel, pack, and price—not by nationality alone.',
    deepDiveTitle: 'Building a Vietnam evidence plan',
    body: <DeepDive paragraphs={['Combine retailer sell-out, outlet audits, household or consumer panels, qualitative research, digital search or social signals, and controlled market tests. Record city, channel, age, income proxy, and occasion.', 'Do not convert an urban convenience-store observation into a national claim. State evidence gaps where current Vietnam estimates use incompatible categories or commercial methodologies.']} />,
    sources: [SOURCES.masan, SOURCES.moduleResearch],
  }),
];

const VISUALS_51 = {
  'nab-m5-51-1-trend-map': { title: 'Consumer Trend Map', subtitle: 'How change travels from life to purchase', mode: 'flow', rows: [{ label: 'Life context', detail: 'Work, study, mobility, household, social routine' }, { label: 'Need', detail: 'Refresh, focus, wellness, comfort, connection' }, { label: 'Discovery', detail: 'Store, search, social, app, recommendation' }, { label: 'Choice', detail: 'Taste, trust, price, pack, access' }, { label: 'Repeat', detail: 'Experience, habit, availability, value' }], takeaway: 'A trend becomes commercial when it changes repeated choice.' },
  'nab-m5-51-2-wellness-system': { title: 'Wellness Proposition System', subtitle: 'Five conditions for credible consumer value', mode: 'network', rows: [{ label: 'Need', detail: 'A benefit consumers actually value' }, { label: 'Formulation', detail: 'Ingredients and serving that can deliver it' }, { label: 'Evidence', detail: 'Support appropriate to the claim' }, { label: 'Communication', detail: 'Clear, compliant, understandable language' }, { label: 'Experience', detail: 'Taste, convenience, price, and repeat' }], takeaway: 'An ingredient is not a proposition until the whole system works.' },
  'nab-m5-51-3-vietnam-occasions': { title: 'Vietnam Occasion Matrix', subtitle: 'Qualitative hypotheses—not measured segment sizes', mode: 'table', headers: ['Context', 'Emerging need', 'Business question'], rows: [{ label: 'Urban on-the-go', detail: 'Portability and fast access', value: 'Which chilled single serve and channel?' }, { label: 'Study and work', detail: 'Focus, energy, convenience', value: 'Which benefit, timing, and trust?' }, { label: 'Household meal', detail: 'Sharing, familiarity, value', value: 'Which pack and out-of-pocket price?' }, { label: 'Active wellness', detail: 'Hydration or functional benefit', value: 'Which evidence and repeat?' }, { label: 'Tiered retail', detail: 'Different access and storage realities', value: 'Ambient, cold, GT, MT, or digital?' }], takeaway: 'Validate each occasion locally before sizing the opportunity.' },
} satisfies Record<string, VisualData>;

const q51 = pairedQuiz('nab-51', [
  { chapter: '1', objective: 'Explain consumer change', question: 'Why is age alone a weak beverage trend segment?', application: 'Two students choose different drinks for exercise and late study. What explains the difference?', correct: 'Occasion and need state can differ within one age group', wrong: ['Age determines every purchase', 'Channels never matter', 'One product serves every moment'], explanation: 'Occasion, need, access, and budget can vary within a demographic group.' },
  { chapter: '1', objective: 'Interpret survey evidence', question: 'What geography do the cited 58% and 66% EY figures describe?', application: 'A slide labels those percentages as Vietnam data. What is the correction?', correct: 'United States respondents', wrong: ['Vietnam respondents', 'Every global market', 'ASEAN retailers'], explanation: 'The overall survey covered US and Brazil adults, but the cited 58% and 66% figures are specifically from the US sample.' },
  { chapter: '1', objective: 'Distinguish trends and signals', question: 'What makes a consumer trend more durable?', application: 'A behaviour appears across periods and changes repeat purchases. How should it be viewed?', correct: 'As stronger evidence of a structural shift', wrong: ['As a viral signal only', 'As a guaranteed forecast', 'As irrelevant to operations'], explanation: 'Persistence and repeated behaviour provide stronger trend evidence.' },
  { chapter: '2', objective: 'Explain wellness demand', question: 'What must accompany a functional ingredient?', application: 'A label names an ingredient but consumers do not understand the benefit. What is missing?', correct: 'Relevant benefit, evidence, communication, and experience', wrong: ['A larger font only', 'A global revenue figure', 'More factory capacity'], explanation: 'A credible proposition combines need, formulation, proof, clarity, and usability.' },
  { chapter: '2', objective: 'Interpret wellness statistics', question: 'What did the 66% EY figure describe?', application: 'A learner calls it global market share. How should it be labelled?', correct: 'US respondents self-reporting lower-sugar or lower-calorie choices', wrong: ['Vietnam beverage volume share', 'Global functional-drink revenue', 'A company sales result'], explanation: 'It is a US survey response from fieldwork conducted in November–December 2025, not a global market metric.' },
  { chapter: '2', objective: 'Evaluate claims', question: 'Why can one highlighted ingredient be misleading?', application: 'A product promotes one benefit but has an unclear overall formulation. What should be reviewed?', correct: 'The full product, serving, evidence, and claim context', wrong: ['Only package colour', 'Only the ingredient name', 'Only corporate size'], explanation: 'Health interpretation requires the complete formulation and evidence context.' },
  { chapter: '2', objective: 'Explain reformulation', question: 'What is reformulation?', application: 'A company changes sweetener and serving composition while protecting taste. What is this?', correct: 'Changing product composition for a defined objective', wrong: ['Changing only advertising media', 'Opening a new store', 'Reporting market share'], explanation: 'Reformulation changes ingredients or composition to affect product outcomes.' },
  { chapter: '3', objective: 'Apply Vietnam context', question: 'Why can premiumisation and affordability coexist?', application: 'Urban consumers trade up while many buyers protect out-of-pocket spend. What does this show?', correct: 'Different segments and occasions move differently', wrong: ['Only one national trend can exist', 'All consumers have identical income', 'Premium products replace value products immediately'], explanation: 'A market can contain simultaneous premium and value dynamics.' },
  { chapter: '3', objective: 'Localise evidence', question: 'What should accompany a Vietnam trend claim?', application: 'An observation comes from one central-city store. Can it be national?', correct: 'The city, channel, segment, period and evidence behind it', wrong: ['Sales from one flagship store, taken as national proof', 'The endorsement of a global brand that follows the trend', 'A count of social-media posts with no period or source'], explanation: 'Local context and method determine whether a trend can be generalized.' },
  { chapter: '3', objective: 'Connect channels and trends', question: 'What does general-trade digitisation illustrate?', application: 'A company modernises service to traditional outlets. Is this modern versus traditional replacement?', correct: 'Channels can evolve without one immediately replacing another', wrong: ['Traditional trade must disappear', 'Digital tools only work in e-commerce', 'Consumer trends never affect routes'], explanation: 'Technology can change how established channels operate.' },
]);

const TAKEAWAY_51: NabModule05Takeaways = {
  learned: 'You can interpret changing beverage consumers, wellness demand, and Vietnam-specific consumption behaviour without overextending evidence.',
  keyTakeaways: ['Consumer change is occasion- and context-specific.', 'Wellness combines formulation, evidence, trust, taste, and price.', 'Survey percentages must retain geography and methodology.', 'Vietnam needs local segmentation by city, channel, occasion, and affordability.'],
  businessImplications: 'Companies should build evidence-led occasion portfolios and test how global signals translate into local repeat demand.',
  remember: 'A trend matters when it changes repeated choice and business decisions.',
  nextLesson: 'Technology & Innovation Trends',
};

const LESSON_52_META: LessonMeta = {
  title: 'Technology & Innovation Trends',
  description: 'Explore product evolution, smart manufacturing, AI, analytics, and digital operating systems.',
  takeaways: ['Innovation links consumer value with technical feasibility.', 'Smart manufacturing improves visibility and control, not certainty.', 'AI decisions require data quality, governance, and human accountability.'],
};

const lesson52 = [
  chapter({
    title: 'How Beverage Products Are Evolving', chapterTitle: 'Technology & Innovation Trends', readingTime: '7 min',
    objective: 'Explain how ingredients, formulations, benefits, sensory design, packaging, and development methods are changing beverage products.',
    mateIntro: 'A new functional drink must win on evidence, taste, shelf life, packaging, cost, and repeat—not just novelty.',
    keyInsight: 'Product innovation is a system that translates a consumer job into a safe, credible, manufacturable, and repeatable offer.',
    narrative: [
      { label: 'What is changing', text: 'Portfolios are expanding through lower-sugar formulations, functional benefits, new textures and flavours, portion choices, and packaging designed for different occasions.' },
      { label: 'Why it is happening', text: 'Wellness expectations, regulation, ingredient science, packaging capability, and faster consumer feedback increase both opportunity and product complexity.' },
      { label: 'Real-world example', text: 'Coca-Cola and PepsiCo describe portfolio innovation and zero-sugar choices in company reporting, while Vietnam producers use aseptic processing to support ambient-stable tea and other drinks without relying on a chilled route.' },
      { label: 'Business impact', text: 'Companies need disciplined testing across benefit, sensory performance, claims, shelf life, line compatibility, price, and channel fit.' },
    ],
    visualKind: 'nab-m5-52-1-innovation-landscape', visualHeading: 'Beverage innovation landscape', visualIntro: 'Map innovation across formula, experience, package, and business model.',
    keyTerms: [{ term: 'Sensory profile', definition: 'The taste, aroma, texture, appearance, and aftertaste experienced by consumers.' }, { term: 'Shelf life', definition: 'The period a product remains safe and meets defined quality specifications.' }, { term: 'Claim substantiation', definition: 'Evidence demonstrating that a product claim is accurate and permitted.' }],
    recap: ['Innovation begins with a consumer job.', 'Functional claims require appropriate evidence.', 'Taste and repeat remain essential.', 'Packaging and manufacturing constraints belong in product design.'],
    chapterRecap: 'A new ingredient becomes innovation only when the complete offer works for consumers and operations.',
    deepDiveTitle: 'The product-development evidence ladder',
    body: <DeepDive paragraphs={['Move from concept evidence to laboratory stability, sensory testing, pilot production, shelf-life validation, regulatory review, channel test, repeat behaviour, and scaled economics.', 'A fast process should shorten the time between learning cycles, not remove food-safety, quality, or claim controls.']} />,
    sources: [SOURCES.cokeResults, SOURCES.pepsi2024, SOURCES.thp],
  }),
  chapter({
    title: 'Technology Transforming Beverage Manufacturing', chapterTitle: 'Technology & Innovation Trends', readingTime: '7 min',
    objective: 'Explain how automation, sensors, process control, machine vision, packaging technology, and predictive maintenance can improve manufacturing.',
    mateIntro: 'A faster filling line creates value only if quality, changeovers, waste, maintenance, and downstream demand remain under control.',
    keyInsight: 'Smart manufacturing turns process data into earlier, more consistent decisions; it does not remove operating discipline.',
    narrative: [
      { label: 'What is changing', text: 'Plants are adding connected sensors, automated control, machine-vision inspection, digital work instructions, traceability, and condition-based maintenance.' },
      { label: 'Why it is happening', text: 'Higher line speeds, more SKUs, tighter quality expectations, resource pressure, and downtime costs create demand for better visibility and control.' },
      { label: 'Real-world example', text: 'Tan Hiep Phat’s documented aseptic-line investment shows how process technology can support ambient-stable products and route reach. SPVB’s planned Long An facility describes renewable-energy and advanced production ambitions, but planned features should not be reported as completed outcomes.' },
      { label: 'Business impact', text: 'Technology value depends on reliable data, trained operators, maintenance routines, cyber controls, compatible equipment, and measured improvement.' },
    ],
    visualKind: 'nab-m5-52-2-smart-factory', visualHeading: 'Smart beverage manufacturing loop', visualIntro: 'Connect sensing, analysis, control, verification, and learning.',
    keyTerms: [{ term: 'Process control', definition: 'Monitoring and adjusting process variables to keep output within specification.' }, { term: 'Machine vision', definition: 'Camera-based inspection supported by software or models.' }, { term: 'Predictive maintenance', definition: 'Using condition data to estimate and prevent likely equipment failure.' }, { term: 'Traceability', definition: 'The ability to follow materials and product through defined stages and records.' }],
    recap: ['Automation standardises repeatable work.', 'Sensors and vision can detect drift earlier.', 'Predictive maintenance supports planned intervention.', 'People, data, and governance determine realised value.'],
    chapterRecap: 'Smart factories improve decisions when digital signals are connected to accountable operating action.',
    deepDiveTitle: 'Building a manufacturing technology business case',
    body: <DeepDive paragraphs={['Define the baseline: downtime, defects, giveaway, energy, water, labour, changeover, and service impact. Estimate achievable improvement and include integration, training, maintenance, cyber, and lifecycle costs.', 'Pilot on a process with measurable pain and sufficient data. Scale only after confirming technical accuracy, operator adoption, financial value, and resilience under abnormal conditions.']} />,
    sources: [SOURCES.thp, SOURCES.suntoryPlant, SOURCES.monster10k],
  }),
  chapter({
    title: 'AI, Data, and Digital Transformation', chapterTitle: 'Technology & Innovation Trends', readingTime: '7 min',
    objective: 'Explain how AI, analytics, forecasting, digital marketing, and supply-chain systems influence beverage decisions and risks.',
    mateIntro: 'A demand model can produce a precise forecast and still be wrong if promotions, stockouts, or channel shifts are missing from the data.',
    keyInsight: 'AI creates value through a decision workflow—good data, a clear action, accountable users, monitoring, and safe fallback.',
    narrative: [
      { label: 'What is changing', text: 'Beverage companies are applying analytics and AI to demand sensing, assortment, media, consumer service, quality inspection, maintenance, routing, and supply planning.' },
      { label: 'Why it is happening', text: 'More granular transaction and operational data, stronger computing tools, and channel complexity create both the need and the ability to improve decisions.' },
      { label: 'Real-world example', text: 'Masan Consumer’s public reports describe a more digitised general-trade operating model. Global company filings also identify forecasting, digital commerce, and supply planning as material capabilities and risks.' },
      { label: 'Business impact', text: 'Leaders must manage privacy, bias, explainability, security, model drift, vendor dependency, and human accountability alongside productivity.' },
    ],
    visualKind: 'nab-m5-52-3-digital-framework', visualHeading: 'Digital transformation decision framework', visualIntro: 'Follow data from business question to monitored action.',
    keyTerms: [{ term: 'Demand sensing', definition: 'Using recent signals to update a near-term view of demand.' }, { term: 'Model drift', definition: 'Performance deterioration when data or relationships change over time.' }, { term: 'Human-in-the-loop', definition: 'A workflow in which people review, govern, or override model-supported decisions.' }, { term: 'Data governance', definition: 'Policies and accountability for data quality, access, security, and use.' }],
    recap: ['Start with a decision, not a technology label.', 'Forecasts depend on complete and timely signals.', 'Human accountability remains essential.', 'Monitor model performance and business outcomes separately.'],
    chapterRecap: 'Digital transformation succeeds when trusted data changes a real decision safely and measurably.',
    deepDiveTitle: 'Choosing high-value AI use cases',
    body: <DeepDive paragraphs={['Prioritise frequent decisions with measurable outcomes, sufficient data, meaningful economic stakes, and a practical route from prediction to action. A technically accurate model with no operating owner creates little value.', 'Test against a baseline and monitor service, cost, bias, failure modes, and adoption. Maintain manual fallback for safety- or continuity-critical workflows.']} />,
    sources: [SOURCES.masan, SOURCES.pepsi2024, SOURCES.monster10k],
  }),
];

const VISUALS_52 = {
  'nab-m5-52-1-innovation-landscape': { title: 'Beverage Innovation Landscape', subtitle: 'Four connected design layers', mode: 'table', headers: ['Layer', 'Innovation choices', 'Validation question'], rows: [{ label: 'Benefit', detail: 'Hydration, energy, wellness, enjoyment', value: 'Is the job meaningful and supportable?' }, { label: 'Formula', detail: 'Sugar, ingredients, flavour, texture', value: 'Is it safe, stable, credible, and liked?' }, { label: 'Package', detail: 'Format, portion, barrier, convenience', value: 'Does it protect product and fit the occasion?' }, { label: 'System', detail: 'Plant, route, price, claim, data', value: 'Can it scale and repeat economically?' }], takeaway: 'Product innovation succeeds across the complete offer system.' },
  'nab-m5-52-2-smart-factory': { title: 'Smart Manufacturing Loop', subtitle: 'From process signal to controlled improvement', mode: 'flow', rows: [{ label: 'Sense', detail: 'Capture process and equipment conditions' }, { label: 'Detect', detail: 'Identify drift, defect, or failure risk' }, { label: 'Decide', detail: 'Recommend or automate defined action' }, { label: 'Verify', detail: 'Confirm quality, safety, and outcome' }, { label: 'Learn', detail: 'Update standards, maintenance, and models' }], takeaway: 'Technology creates value when signals produce verified operating action.' },
  'nab-m5-52-3-digital-framework': { title: 'AI and Data Decision Framework', subtitle: 'A governed path from question to value', mode: 'flow', rows: [{ label: 'Decision', detail: 'Define owner, action, and outcome' }, { label: 'Data', detail: 'Check quality, rights, timeliness, bias' }, { label: 'Model', detail: 'Build, test, explain, and stress' }, { label: 'Workflow', detail: 'Integrate people, systems, and fallback' }, { label: 'Monitor', detail: 'Track model and business performance' }], takeaway: 'AI is one component of an accountable decision system.' },
} satisfies Record<string, VisualData>;

const q52 = pairedQuiz('nab-52', [
  { chapter: '1', objective: 'Explain product innovation', question: 'When does a functional ingredient become a viable innovation?', application: 'A concept has novelty but weak taste and no claim evidence. Is it ready?', correct: 'When benefit, evidence, sensory experience, feasibility, and economics work', wrong: ['When the ingredient is fashionable', 'When a competitor mentions it', 'When packaging looks premium'], explanation: 'Innovation must work as a complete consumer and operating proposition.' },
  { chapter: '1', objective: 'Validate product development', question: 'What should follow a promising concept test?', application: 'Consumers like an idea. What evidence is needed before scale?', correct: 'Formula, safety, stability, sensory, claim, line, route, and repeat validation', wrong: ['National launch immediately', 'Only social likes', 'Only corporate revenue'], explanation: 'Concept appeal is one step in a broader evidence ladder.' },
  { chapter: '1', objective: 'Connect packaging and product', question: 'Why is packaging part of product innovation?', application: 'A formula degrades in the selected container. What was missed?', correct: 'The package protects quality and shapes occasion and logistics', wrong: ['Packaging is only decoration', 'The formula controls every channel', 'Shelf life never matters'], explanation: 'Package choice affects protection, convenience, production, distribution, and perception.' },
  { chapter: '2', objective: 'Explain smart manufacturing', question: 'What is the role of process control?', application: 'Sensors show temperature drifting beyond limits. What should the system support?', correct: 'Adjustment to keep output within specification', wrong: ['A new market forecast', 'A social campaign', 'A retailer listing'], explanation: 'Process control monitors and adjusts variables to protect output.' },
  { chapter: '2', objective: 'Explain predictive maintenance', question: 'What distinguishes predictive maintenance?', application: 'Condition data indicates likely bearing failure before breakdown. What approach is this?', correct: 'Intervening based on evidence of future failure risk', wrong: ['Repairing only after failure', 'Replacing equipment every day', 'Ignoring condition data'], explanation: 'Predictive maintenance uses condition evidence to plan intervention.' },
  { chapter: '2', objective: 'Evaluate technology plans', question: 'Why is a planned smart factory feature not a completed result?', application: 'A company announces renewable energy for a future plant. How should it be labelled?', correct: 'As a stated plan pending delivery and verification', wrong: ['As achieved historical performance', 'As national industry data', 'As consumer preference'], explanation: 'Targets and planned features must remain distinct from verified outcomes.' },
  { chapter: '2', objective: 'Build technology cases', question: 'What belongs in an automation business case?', application: 'A proposal lists labour savings but omits integration and maintenance. What is missing?', correct: 'Full lifecycle cost, risks, baseline, and measurable outcomes', wrong: ['Only vendor claims', 'Only equipment speed', 'Only market size'], explanation: 'A credible case includes total cost, adoption, reliability, and verified benefit.' },
  { chapter: '3', objective: 'Explain AI value', question: 'What should an AI project start with?', application: 'A team buys a model before defining an action. What should come first?', correct: 'A business decision, owner, action, and outcome', wrong: ['The largest model available', 'A generic trend forecast', 'More dashboards'], explanation: 'Technology should support a defined decision and accountable action.' },
  { chapter: '3', objective: 'Interpret forecasts', question: 'Why can demand data be misleading?', application: 'Sales fell because products were out of stock. What may a model incorrectly infer?', correct: 'That underlying consumer demand fell', wrong: ['That stockouts increase supply', 'That data never need context', 'That every forecast is correct'], explanation: 'Observed sales can be constrained by availability and other missing variables.' },
  { chapter: '3', objective: 'Govern AI systems', question: 'What is model drift?', application: 'A routing model worsens after channel behaviour changes. What happened?', correct: 'The data relationships changed and model performance deteriorated', wrong: ['The factory added capacity', 'A claim became regulated', 'The package size increased'], explanation: 'Models must be monitored as conditions and data evolve.' },
]);

const TAKEAWAY_52: NabModule05Takeaways = {
  learned: 'You can explain product evolution, smart manufacturing, and governed AI as connected innovation and operating systems.',
  keyTakeaways: ['Product innovation joins consumer value, evidence, formulation, package, and scale.', 'Smart manufacturing links sensing to verified action.', 'Planned technology is not completed performance.', 'AI needs a decision owner, trusted data, workflow, monitoring, and fallback.'],
  businessImplications: 'Companies should invest in technology where measurable learning, reliability, service, or economics justify lifecycle cost and risk.',
  remember: 'Start with the job and decision; technology follows.',
  nextLesson: 'Market & Channel Trends',
};

const LESSON_53_META: LessonMeta = {
  title: 'Market & Channel Trends',
  description: 'Understand emerging categories, evolving sales channels, omnichannel distribution, and future supply-chain design.',
  takeaways: ['Category growth should be defined by need, scope, and evidence.', 'Channels are converging but retain different economics.', 'Future distribution links inventory, data, fulfilment, and partner incentives.'],
};

const lesson53 = [
  chapter({
    title: 'Emerging Beverage Market Segments', chapterTitle: 'Market & Channel Trends', readingTime: '7 min',
    objective: 'Evaluate emerging beverage categories using consumer need, evidence quality, market definition, and commercial viability.',
    mateIntro: 'A category can grow quickly from a tiny base and still remain smaller than a mature category growing slowly.',
    keyInsight: 'Growth rate, market size, consumer relevance, and business attractiveness are different questions.',
    narrative: [
      { label: 'What is changing', text: 'Functional hydration, lower-sugar choices, RTD tea and coffee, premium water, energy variants, and benefit-led formats are broadening the non-alcoholic portfolio.' },
      { label: 'Why it is happening', text: 'Consumers seek more specific benefits and occasions, while ingredient, packaging, retail, and digital discovery systems make niche propositions easier to test.' },
      { label: 'Real-world example', text: 'Grand View Research’s 2026 edition defines a global NAB market including CSD, bottled water, RTD tea and coffee, functional beverages, juices, dairy-based beverages, and others. Its category forecasts should not be mixed with reports using narrower “drinks” or RTD definitions.' },
      { label: 'Business impact', text: 'Companies should assess addressable demand, repeat, margin, route fit, regulatory exposure, and operational complexity—not chase a high CAGR alone.' },
    ],
    visualKind: 'nab-m5-53-1-category-landscape', visualHeading: 'Emerging category landscape', visualIntro: 'Compare consumer jobs and validation questions rather than fabricated growth scores.',
    keyTerms: [{ term: 'Category diversification', definition: 'Expansion into additional product categories or need states.' }, { term: 'Growth rate', definition: 'The pace of change in a defined metric over a stated period.' }, { term: 'Base effect', definition: 'A high percentage change caused partly by starting from a small level.' }],
    recap: ['High growth does not guarantee large value.', 'Category definitions vary across reports.', 'Repeat and unit economics matter after trial.', 'Portfolio fit and complexity shape attractiveness.'],
    chapterRecap: 'Evaluate emerging categories by consumer job, evidence, base size, repeat, economics, and capability fit.',
    deepDiveTitle: 'Reading category forecasts without being misled',
    body: <DeepDive paragraphs={['Record the report edition, category inclusions, geography, currency, base year, forecast period, nominal or real values, and CAGR. Two credible forecasts can differ because their definitions differ.', 'Build scenarios around adoption, repeat, price, regulation, and route capacity instead of treating a single CAGR as a promised outcome.']} />,
    sources: [SOURCES.gvrGlobal, SOURCES.gvrDrinks, SOURCES.eyWellness],
  }),
  chapter({
    title: 'How Beverage Sales Channels Are Evolving', chapterTitle: 'Market & Channel Trends', readingTime: '7 min',
    objective: 'Explain how general trade, modern trade, convenience, foodservice, e-commerce, and D2C are evolving and interacting.',
    mateIntro: 'A shopper may discover a drink on social media, order through an app, and receive it from a nearby supermarket—all in one transaction.',
    keyInsight: 'Channels increasingly share the customer journey, but each still has distinct service work, data, costs, and strategic roles.',
    narrative: [
      { label: 'What is changing', text: 'Digital discovery, retailer media, convenience formats, quick commerce, and more data-enabled general trade are adding touchpoints around established physical channels.' },
      { label: 'Why it is happening', text: 'Mobile behaviour, urban convenience, retailer investment, delivery networks, and demand for faster feedback make the journey less linear.' },
      { label: 'Real-world example', text: 'Masan Consumer describes digitising and expanding general-trade service rather than simply replacing independent outlets. This shows that “digital” can improve an existing channel as well as create an online storefront.' },
      { label: 'Business impact', text: 'Brands need channel roles, consistent price-pack logic, attribution rules, and partner governance to avoid conflict and double counting.' },
    ],
    visualKind: 'nab-m5-53-2-channel-evolution', visualHeading: 'Channel evolution diagram', visualIntro: 'See how discovery, purchase, fulfilment, and experience can cross channels.',
    keyTerms: [{ term: 'Omnichannel', definition: 'Coordinated customer and operating experiences across multiple channels.' }, { term: 'Retail media', definition: 'Advertising and data products offered by retailers around their audiences and transactions.' }, { term: 'D2C', definition: 'Direct sale from brand to consumer.' }, { term: 'Channel conflict', definition: 'Tension caused when channel choices undermine partner economics or positioning.' }],
    recap: ['Physical and digital touchpoints can share one journey.', 'General trade can become more data-enabled.', 'D2C suits selected propositions rather than every unit.', 'Attribution and partner economics need clear rules.'],
    chapterRecap: 'Channel evolution is coordination, not a simple online-versus-offline replacement story.',
    deepDiveTitle: 'Defining channel metrics in a hybrid journey',
    body: <DeepDive paragraphs={['Decide whether a sale is classified by discovery source, order source, seller of record, fulfilment point, or delivery method. The same transaction can appear in several systems.', 'Compare acquisition cost, conversion, basket, margin, fulfilment, returns, data value, repeat, and incremental sales. Avoid crediting digital activity for demand that simply moved from another owned channel.']} />,
    sources: [SOURCES.masan, SOURCES.pepsi2024, SOURCES.moduleResearch],
  }),
  chapter({
    title: 'The Future of Beverage Distribution and Supply Chains', chapterTitle: 'Market & Channel Trends', readingTime: '7 min',
    objective: 'Explain how shared inventory visibility, forecasting, route optimisation, resilience, and omnichannel fulfilment may reshape beverage distribution.',
    mateIntro: 'The future route may start with one demand signal but choose among a distributor, store, dark store, warehouse, or direct shipment.',
    keyInsight: 'Future distribution advantage comes from coordinating inventory, information, service, and partner economics across routes.',
    narrative: [
      { label: 'What is changing', text: 'Companies are improving order visibility, demand sensing, route planning, traceability, inventory positioning, and digital collaboration with distributors and retailers.' },
      { label: 'Why it is happening', text: 'More channels, faster service expectations, volatile inputs, fragmented outlets, and working-capital pressure increase coordination needs.' },
      { label: 'Real-world example', text: 'Monster’s filings describe dependence on co-packers and distribution partners across markets, while Vietnam portfolios combine direct, distributor, modern-retail, and digital routes. Future design must account for those partner boundaries.' },
      { label: 'Business impact', text: 'Optimisation should balance availability, cost, cash, emissions, resilience, and fair partner returns rather than maximise one route metric.' },
    ],
    visualKind: 'nab-m5-53-3-future-distribution', visualHeading: 'Future distribution ecosystem', visualIntro: 'Coordinate demand signals, inventory, fulfilment choices, delivery, and learning.',
    keyTerms: [{ term: 'Inventory visibility', definition: 'A timely view of stock location, status, and availability across the network.' }, { term: 'Route optimisation', definition: 'Planning delivery routes against service, capacity, distance, and cost constraints.' }, { term: 'Resilience', definition: 'The ability to prepare for, absorb, recover from, and adapt to disruption.' }],
    recap: ['Visibility enables better allocation and promises.', 'Optimisation must include service and partner constraints.', 'Multiple fulfilment points increase coordination complexity.', 'Resilience may require deliberate redundancy.'],
    chapterRecap: 'The future network is an information and relationship system as much as a physical one.',
    deepDiveTitle: 'Avoiding local optimisation',
    body: <DeepDive paragraphs={['A full truck can look efficient while creating excess inventory. Low warehouse stock can improve cash while causing store stockouts. Use end-to-end measures that connect service, inventory, transport, waste, cash, and sell-out.', 'Resilience choices—alternative suppliers, co-packers, routes, or safety stock—carry cost. Compare that cost with the impact and recovery time of plausible disruptions.']} />,
    sources: [SOURCES.monster10k, SOURCES.pepsi2024, SOURCES.masan],
  }),
];

const VISUALS_53 = {
  'nab-m5-53-1-category-landscape': { title: 'Emerging Category Landscape', subtitle: 'Consumer jobs and evidence questions', mode: 'table', headers: ['Category direction', 'Consumer job', 'Validation question'], rows: [{ label: 'Functional hydration', detail: 'Hydration plus a specific benefit', value: 'Evidence, taste, repeat, price?' }, { label: 'Lower-sugar refreshment', detail: 'Familiar occasion with changed formulation', value: 'Taste retention and switching?' }, { label: 'RTD tea & coffee', detail: 'Portable routine and energy', value: 'Occasion, cold/ambient, channel?' }, { label: 'Premium water', detail: 'Experience, provenance, identity', value: 'Willingness to pay and route?' }, { label: 'Focused energy', detail: 'Performance, work, study, gaming', value: 'Need, safety, trust, frequency?' }], takeaway: 'Category opportunity begins with a repeatable consumer job.' },
  'nab-m5-53-2-channel-evolution': { title: 'Channel Evolution', subtitle: 'One journey can cross several systems', mode: 'flow', rows: [{ label: 'Discover', detail: 'Outlet, social, search, retail media' }, { label: 'Evaluate', detail: 'Content, reviews, shelf, price, availability' }, { label: 'Order', detail: 'Store, marketplace, app, brand, foodservice' }, { label: 'Fulfil', detail: 'Outlet, distributor, warehouse, nearby inventory' }, { label: 'Repeat', detail: 'Experience, loyalty, recommendation, replenishment' }], takeaway: 'Define each channel’s role across the whole journey.' },
  'nab-m5-53-3-future-distribution': { title: 'Future Distribution Ecosystem', subtitle: 'A coordinated demand-to-delivery loop', mode: 'flow', rows: [{ label: 'Demand signals', detail: 'Orders, sell-out, forecasts, events' }, { label: 'Inventory view', detail: 'Stock, capacity, age, location' }, { label: 'Fulfilment choice', detail: 'Route, partner, node, service promise' }, { label: 'Delivery & execution', detail: 'Transport, outlet, condition, proof' }, { label: 'Learning', detail: 'Service, cost, cash, waste, repeat' }], takeaway: 'Shared visibility supports better network trade-offs.' },
} satisfies Record<string, VisualData>;

const q53 = pairedQuiz('nab-53', [
  { chapter: '1', objective: 'Evaluate emerging categories', question: 'Why can a high-growth category still be small?', application: 'A niche doubles from a tiny base. What should analysis consider?', correct: 'The starting base and absolute market value', wrong: ['Only the percentage growth', 'Only social attention', 'Only one brand launch'], explanation: 'Percentage growth must be interpreted alongside base size and value.' },
  { chapter: '1', objective: 'Compare forecasts', question: 'Why should two NAB forecasts not be averaged automatically?', application: 'One includes dairy drinks and another covers only RTD beverages. What is the issue?', correct: 'Their market definitions differ', wrong: ['Forecasts always have the same scope', 'Currencies never matter', 'Base years are irrelevant'], explanation: 'Different inclusions, periods, and methods produce incompatible estimates.' },
  { chapter: '1', objective: 'Assess opportunities', question: 'What should follow an attractive category forecast?', application: 'A report shows high CAGR. What must a company test next?', correct: 'Repeat demand, economics, route, regulation, and capability fit', wrong: ['Launch nationally without testing', 'Ignore base size', 'Assume every consumer wants it'], explanation: 'Forecast growth does not establish company-level viability.' },
  { chapter: '2', objective: 'Explain channel evolution', question: 'What is omnichannel?', application: 'A shopper discovers online, orders in an app, and receives from a store. What does this illustrate?', correct: 'Coordinated experiences across multiple channels', wrong: ['Only brand-owned e-commerce', 'Only general trade', 'One isolated retailer'], explanation: 'Omnichannel connects touchpoints and operations across channels.' },
  { chapter: '2', objective: 'Interpret digital change', question: 'Can general trade become more digital?', application: 'A supplier digitises orders and service for independent stores. What does this show?', correct: 'Digital tools can modernise an existing physical channel', wrong: ['Digital means only D2C', 'Independent stores must close', 'Data cannot support routes'], explanation: 'Digital capability can improve established channel operations.' },
  { chapter: '2', objective: 'Avoid channel double counting', question: 'Why define seller of record or order source?', application: 'An app order fulfilled by a supermarket appears twice. What risk exists?', correct: 'The same sale may be counted in two channels', wrong: ['The beverage changes formula', 'The retailer becomes a manufacturer', 'The transaction has no revenue'], explanation: 'Hybrid journeys require a consistent classification rule.' },
  { chapter: '2', objective: 'Manage channel conflict', question: 'What can create channel conflict?', application: 'A brand undercuts distributor partners through D2C pricing. What may result?', correct: 'Partner economics and trust may weaken', wrong: ['Every channel benefits automatically', 'Consumer needs disappear', 'Supply becomes unlimited'], explanation: 'Price and assortment choices can undermine existing partners.' },
  { chapter: '3', objective: 'Explain inventory visibility', question: 'What does inventory visibility enable?', application: 'A team sees stock and age across warehouses and stores. What can improve?', correct: 'Allocation, service promises, and waste control', wrong: ['Guaranteed demand', 'Automatic brand equity', 'No need for planning'], explanation: 'Visibility supports better choices but does not eliminate uncertainty.' },
  { chapter: '3', objective: 'Avoid local optimisation', question: 'Why can a full truck be a poor outcome?', application: 'It delivers more than outlets can sell. What is the system effect?', correct: 'Excess inventory and working capital can outweigh transport efficiency', wrong: ['Full trucks are always optimal', 'Sell-out becomes irrelevant', 'Waste cannot occur'], explanation: 'End-to-end economics matter more than one asset metric.' },
  { chapter: '3', objective: 'Design resilience', question: 'Why might redundancy be deliberate?', application: 'A company qualifies a second co-packer despite added cost. What benefit can it create?', correct: 'Faster recovery from disruption', wrong: ['Guaranteed lowest unit cost', 'No need for quality control', 'Permanent demand growth'], explanation: 'Resilience can justify alternative capacity or routes when disruption impact is material.' },
]);

const TAKEAWAY_53: NabModule05Takeaways = {
  learned: 'You can evaluate emerging categories, evolving channels, and future distribution without mixing definitions or optimising one metric in isolation.',
  keyTakeaways: ['Category growth needs base-size and scope context.', 'Channel journeys increasingly cross physical and digital systems.', 'Digital tools can modernise general trade.', 'Future networks balance service, cost, cash, waste, resilience, and partner value.'],
  businessImplications: 'Companies should assign each category and channel a clear role, then coordinate data and operations across the network.',
  remember: 'Follow the consumer journey and the physical product—both matter.',
  nextLesson: 'Regulatory & Sustainability Trends',
};

const LESSON_54_META: LessonMeta = {
  title: 'Regulatory & Sustainability Trends',
  description: 'Distinguish enacted rules, effective dates, packaging EPR, water pressure, ESG claims, and compliance responses.',
  takeaways: ['Regulatory status, scope, and dates must be explicit.', 'Circular packaging requires design and recovery systems.', 'ESG targets are commitments until outcomes are measured.'],
};

const lesson54 = [
  chapter({
    title: 'The Changing Regulatory Environment', chapterTitle: 'Regulatory & Sustainability Trends', readingTime: '8 min',
    objective: 'Distinguish enacted laws, effective dates, implementation guidance, proposals, and business implications for beverage portfolios.',
    mateIntro: 'A tax can be enacted in one year, take legal effect in another, and apply its first non-zero beverage rate later still.',
    keyInsight: 'Regulatory analysis must separate status, scope, threshold, exclusions, rate date, tax point, and guidance.',
    narrative: [
      { label: 'What is changing', text: 'Governments are increasing attention to sugar, food safety, labels, marketing, packaging, and environmental responsibility across beverage markets.' },
      { label: 'Why it is happening', text: 'Public-health goals, consumer information, waste, resource pressure, and enforcement capability shape different policy designs.' },
      { label: 'Real-world example', text: 'Vietnam’s new Special Sales Tax law takes effect on 1 January 2026. Qualifying beverages above 5g sugar per 100ml, subject to regulated exclusions, face 8% from 1 January 2027 and 10% from 1 January 2028. PwC notes the enacted roadmap; implementation details should be checked against current guidance.' },
      { label: 'Business impact', text: 'Companies may need reformulation, portfolio, pricing, labelling, systems, and channel changes, with enough lead time for validation and inventory transition.' },
    ],
    visualKind: 'nab-m5-54-1-regulatory-timeline', visualHeading: 'Vietnam sugary-beverage tax timeline', visualIntro: 'Separate enactment, legal effect, and rate dates.',
    statTiles: [{ value: '1 Jan 2026', label: 'Law effective', description: 'New SST law enters effect.' }, { value: '8%', label: 'Rate from 1 Jan 2027', description: 'Qualifying beverages; threshold and exclusions apply.' }, { value: '10%', label: 'Rate from 1 Jan 2028', description: 'Next step in the enacted roadmap.' }],
    keyTerms: [{ term: 'Enacted law', definition: 'A law formally approved through the required legislative process.' }, { term: 'Effective date', definition: 'The date a legal instrument enters into force.' }, { term: 'Implementation guidance', definition: 'Rules or instructions explaining how obligations are applied in practice.' }, { term: 'Tax scope', definition: 'The products, transactions, or entities to which a tax applies.' }],
    recap: ['Enactment, effect, and rate dates can differ.', 'The Vietnam rule has a sugar threshold and exclusions.', 'Global tax designs are not interchangeable.', 'Product and data changes need regulatory lead time.'],
    chapterRecap: 'Read the legal timeline and product scope before modelling any portfolio impact.',
    deepDiveTitle: 'Global context without false equivalence',
    body: <DeepDive paragraphs={['WHO’s report published 13 January 2026 assessed policy data through July 2024 and found national excise taxes on at least one SSB in 116 countries. That count describes policy coverage, not identical rates or product scope.', 'For each jurisdiction, verify primary law, implementing rules, definitions, tax base, threshold, exclusions, effective dates, filing obligations, and subsequent amendments.']} />,
    sources: [SOURCES.pwcSst, SOURCES.whoTaxes],
  }),
  chapter({
    title: 'Sustainable Packaging and Water Management', chapterTitle: 'Regulatory & Sustainability Trends', readingTime: '7 min',
    objective: 'Explain circular packaging, Vietnam EPR, recyclability, recycled content, collection, and water stewardship as system challenges.',
    mateIntro: 'A technically recyclable bottle creates little circular value if it is not collected, sorted, processed, and used again.',
    keyInsight: 'Sustainable packaging and water outcomes depend on connected systems, not a material or target in isolation.',
    narrative: [
      { label: 'What is changing', text: 'Packaging regulation, producer responsibility, recycled-content ambitions, lightweighting, refill concepts, and water stewardship are shaping product and supply decisions.' },
      { label: 'Why it is happening', text: 'Waste leakage, resource costs, climate pressure, community expectations, and regulation expose the limits of a linear make-use-discard model.' },
      { label: 'Real-world example', text: 'Vietnam’s packaging recycling obligations generally began on 1 January 2024 under the earlier framework. Decree 110/2026/ND-CP, effective 25 May 2026, now details producer and importer responsibilities for covered products and packaging. Current implementation must be checked against that decree and its guidance.' },
      { label: 'Business impact', text: 'Design teams must consider collection reality, sorting, recycler capability, food-contact requirements, material value, cost, reporting, and unintended trade-offs.' },
    ],
    visualKind: 'nab-m5-54-2-circular-packaging', visualHeading: 'Circular packaging framework', visualIntro: 'Follow design, use, collection, sorting, recycling, and reintegration.',
    keyTerms: [{ term: 'EPR', definition: 'Extended Producer Responsibility: obligations assigned to producers or importers for defined post-consumer outcomes.' }, { term: 'Recyclability', definition: 'The practical ability of packaging to be collected, sorted, and recycled at scale in a defined system.' }, { term: 'Recycled content', definition: 'Material recovered from waste and used in new packaging or products.' }, { term: 'Water stewardship', definition: 'Responsible management of water use and shared basin impacts.' }],
    recap: ['Recyclable design is only one circularity step.', 'Vietnam packaging EPR is an operating obligation, not a future slogan.', 'Recycled content needs quality and supply systems.', 'Water risk is local to facilities and basins.'],
    chapterRecap: 'Measure the whole recovery and water system, not one package attribute or factory ratio alone.',
    deepDiveTitle: 'Avoiding sustainability burden shifting',
    body: <DeepDive paragraphs={['A lighter pack may reduce material but change barrier performance or recovery value. A material switch may reduce one footprint while raising transport, food waste, or collection difficulty. Use lifecycle thinking and local recovery evidence.', 'Water metrics should distinguish withdrawal, consumption, discharge quality, source stress, seasonality, and community impact. A global average can hide a high-risk basin.']} />,
    sources: [SOURCES.kpmgEpr, SOURCES.eprDecree, SOURCES.suntoryPlant, SOURCES.thp],
  }),
  chapter({
    title: 'How Beverage Companies Respond to ESG and Compliance', chapterTitle: 'Regulatory & Sustainability Trends', readingTime: '7 min',
    objective: 'Explain how governance, responsible sourcing, traceability, targets, controls, assurance, and transparent reporting support compliance and ESG response.',
    mateIntro: 'A packaging target is a promise; procurement specifications, data, recovery partners, controls, and verified outcomes determine whether it becomes performance.',
    keyInsight: 'ESG credibility comes from governance and measured delivery, not ambition language alone.',
    narrative: [
      { label: 'What is changing', text: 'Companies are embedding environmental and social requirements into product design, sourcing, supplier management, operations, data, compliance, and public reporting.' },
      { label: 'Why it is happening', text: 'Regulators, investors, customers, communities, employees, and supply risks increasingly require evidence of responsible performance.' },
      { label: 'Real-world example', text: 'SPVB’s Long An announcement includes future renewable-energy and recycled-plastic packaging intentions. These are stated plans for a developing facility, not completed national outcomes. Company targets should be tracked against defined baselines and reporting periods.' },
      { label: 'Business impact', text: 'Companies need accountable owners, controls, supplier evidence, traceability, data definitions, escalation, and assurance proportionate to the claim and risk.' },
    ],
    visualKind: 'nab-m5-54-3-esg-value-chain', visualHeading: 'Sustainability value-chain controls', visualIntro: 'Connect commitment, operating control, evidence, and reporting.',
    keyTerms: [{ term: 'Traceability', definition: 'The ability to follow materials, products, or claims through records and stages.' }, { term: 'Assurance', definition: 'Independent or controlled evaluation of information against defined criteria.' }, { term: 'Baseline', definition: 'The starting period or value used to measure change.' }, { term: 'Greenwashing', definition: 'Misleading presentation of environmental performance or benefit.' }],
    recap: ['Targets need scope, baseline, deadline, and owner.', 'Compliance belongs in daily processes and data.', 'Supplier evidence supports sourcing claims.', 'Plans and achievements must remain distinct.'],
    chapterRecap: 'Credible ESG turns commitments into controlled action, traceable evidence, and transparent outcomes.',
    deepDiveTitle: 'A claim-governance checklist',
    body: <DeepDive paragraphs={['Define the claim, reporting boundary, metric, baseline, methodology, accountable owner, data source, control, approval, limitations, and update cadence. Align public language with the strength of evidence.', 'Track absolute and intensity measures where relevant. Intensity can improve while total impact rises, so both may be needed to understand performance.']} />,
    sources: [SOURCES.suntoryPlant, SOURCES.pepsi2024, SOURCES.cokeResults, SOURCES.kpmgEpr],
  }),
];

const VISUALS_54 = {
  'nab-m5-54-1-regulatory-timeline': { title: 'Vietnam Sugary-Beverage SST Timeline', subtitle: 'Enacted law, effective date, and staged rates', mode: 'timeline', rows: [{ label: '14 Jun 2025', detail: 'National Assembly approves new SST law', value: 'Enacted' }, { label: '1 Jan 2026', detail: 'Law enters into effect', value: 'Legal effect' }, { label: '1 Jan 2027', detail: '8% for qualifying drinks above threshold', value: 'First stated beverage rate' }, { label: '1 Jan 2028', detail: '10% for qualifying drinks above threshold', value: 'Next rate step' }], takeaway: 'Model the correct product scope and rate date.' },
  'nab-m5-54-2-circular-packaging': { title: 'Circular Packaging Framework', subtitle: 'Material value depends on the complete loop', mode: 'flow', rows: [{ label: 'Design', detail: 'Protect product with recoverable choices' }, { label: 'Use', detail: 'Deliver safe, convenient consumer value' }, { label: 'Collect', detail: 'Create accessible recovery pathways' }, { label: 'Sort & recycle', detail: 'Produce usable secondary material' }, { label: 'Reintegrate', detail: 'Use material under quality requirements' }], takeaway: 'Circularity fails when any link in the recovery loop is missing.' },
  'nab-m5-54-3-esg-value-chain': { title: 'ESG and Compliance Control Chain', subtitle: 'From commitment to credible outcome', mode: 'flow', rows: [{ label: 'Commitment', detail: 'Scope, baseline, target, deadline' }, { label: 'Ownership', detail: 'Accountable teams and governance' }, { label: 'Controls', detail: 'Specifications, suppliers, process, escalation' }, { label: 'Evidence', detail: 'Traceable data and verification' }, { label: 'Report & improve', detail: 'Transparent result, limitation, corrective action' }], takeaway: 'Credibility comes from controlled delivery and evidence.' },
} satisfies Record<string, VisualData>;

const q54 = pairedQuiz('nab-54', [
  { chapter: '1', objective: 'Interpret regulatory timelines', question: 'Why distinguish enactment from the rate date?', application: 'A law is approved in 2025 but the first beverage rate starts in 2027. What should a timeline show?', correct: 'Each legal milestone and its separate business implication', wrong: ['Only the approval date', 'Only the highest future rate', 'Treat all dates as identical'], explanation: 'Approval, legal effect, and rate application can occur on different dates.' },
  { chapter: '1', objective: 'Interpret Vietnam SST', question: 'What is the first stated Vietnam rate for qualifying sugary beverages?', application: 'A model applies 10% from 2026. What is the correction?', correct: '8% from 1 January 2027', wrong: ['10% from 1 January 2026', '8% from June 2025', 'No threshold or exclusions'], explanation: 'The enacted roadmap applies 8% from 2027 and 10% from 2028 to qualifying scope.' },
  { chapter: '1', objective: 'Use global policy evidence', question: 'What did WHO’s 116-country figure describe?', application: 'A slide calls it countries with identical sugar taxes in 2026. What is wrong?', correct: 'Countries with national excise on at least one SSB as of July 2024', wrong: ['Countries with identical rates', 'Vietnam provinces', 'Companies reformulating products'], explanation: 'WHO assessed varied policy designs using data through July 2024.' },
  { chapter: '2', objective: 'Explain circular packaging', question: 'Why is technical recyclability insufficient?', application: 'A package can be recycled in a laboratory but is not collected locally. Is it circular?', correct: 'Collection, sorting, processing and end markets are also required', wrong: ['A recyclable design guarantees that the pack will be recycled', 'Only glass packaging counts towards recycling targets', 'Recyclable materials always cost more than virgin materials'], explanation: 'Practical circularity depends on the whole recovery system.' },
  { chapter: '2', objective: 'Interpret EPR status', question: 'When did Vietnam packaging recycling responsibility generally begin?', application: 'A brief says packaging EPR is only a future proposal. What is the correction?', correct: 'Generally 1 January 2024, with later implementation amendments', wrong: ['Only after 2030', 'It remains only a discussion', 'It began with the 2027 sugar tax'], explanation: 'Packaging obligations generally began in 2024; Decree 110/2026, effective 25 May 2026, now details the current framework.' },
  { chapter: '2', objective: 'Explain water stewardship', question: 'Why is factory water intensity not enough?', application: 'A site improves litres per case but operates in a stressed basin. What else matters?', correct: 'Absolute use, source stress, seasonality, discharge, and community impact', wrong: ['Only global company average', 'Only package colour', 'Only revenue growth'], explanation: 'Water impact is local and multidimensional.' },
  { chapter: '2', objective: 'Avoid burden shifting', question: 'What should precede a packaging material switch?', application: 'A team focuses on material weight only. What should it add?', correct: 'Lifecycle and local recovery-system analysis', wrong: ['A slogan only', 'One supplier quote only', 'No product-protection test'], explanation: 'Changes can shift impact across production, transport, waste, and recovery.' },
  { chapter: '3', objective: 'Evaluate ESG targets', question: 'When is a company target an achieved outcome?', application: 'A future facility announces renewable-energy intent. Can it be reported as completed?', correct: 'Only after delivery is measured against the defined target', wrong: ['Immediately at announcement', 'Whenever a press release exists', 'Without a baseline'], explanation: 'Plans and measured achievements must remain distinct.' },
  { chapter: '3', objective: 'Govern sustainability claims', question: 'What makes an ESG claim credible?', application: 'A claim has no boundary, method, or owner. What is missing?', correct: 'Scope, baseline, method, controls, evidence, and accountability', wrong: ['More aspirational wording', 'A larger logo', 'Only a future date'], explanation: 'Credible claims need definitions, governance, and traceable evidence.' },
  { chapter: '3', objective: 'Interpret intensity metrics', question: 'Why pair absolute and intensity measures?', application: 'Impact per unit falls while total production rises. What can happen?', correct: 'Total impact may still increase', wrong: ['Absolute impact must fall', 'Intensity never matters', 'Production has no effect'], explanation: 'Intensity and total impact answer different questions.' },
]);

const TAKEAWAY_54: NabModule05Takeaways = {
  learned: 'You can read regulatory timelines, explain circular packaging and water systems, and assess ESG responses without confusing plans with outcomes.',
  keyTakeaways: ['Regulatory status, scope, dates, and guidance must be separated.', 'WHO tax counts describe varied policies, not one global design.', 'Vietnam packaging EPR is an active operating obligation.', 'Credible ESG links targets to controls, evidence, and transparent reporting.'],
  businessImplications: 'Companies need cross-functional regulatory and sustainability systems that connect product, operations, supply, data, finance, and communication.',
  remember: 'Scope the rule; map the system; verify the outcome.',
  nextLesson: 'Growth Outlook & Strategic Opportunities',
};

const LESSON_55_META: LessonMeta = {
  title: 'Growth Outlook & Strategic Opportunities',
  description: 'Interpret market forecasts, identify opportunity spaces, and balance growth options against uncertainty and risk.',
  takeaways: ['Forecasts are conditional estimates with defined scope.', 'Opportunity combines consumer value, evidence, economics, and capability fit.', 'Staged investment protects learning under uncertainty.'],
};

const lesson55 = [
  chapter({
    title: 'Where Is the Beverage Industry Heading?', chapterTitle: 'Growth Outlook & Strategic Opportunities', readingTime: '8 min',
    objective: 'Interpret global and Vietnam beverage outlooks while separating historical data, estimates, forecasts, drivers, and uncertainty.',
    mateIntro: 'Two reputable market reports can project different futures because they define “non-alcoholic beverages” differently.',
    keyInsight: 'A forecast is a conditional model of a defined market—not a guaranteed outcome or a company sales plan.',
    narrative: [
      { label: 'What is changing', text: 'Published outlooks generally expect continued global NAB growth, supported by population, income, convenience, wellness, portfolio expansion, pricing, and channel development, with maturity differing by category and geography.' },
      { label: 'Why it is happening', text: 'Growth combines volume, price, mix, formalisation, category adoption, and channel access. Regulation, affordability, inputs, competition, and execution can change the path.' },
      { label: 'Real-world example', text: 'Grand View Research’s 2026 edition estimates a global market of US$1,391.4 billion in 2025, US$1,488.6 billion in 2026, and forecasts US$2,551.1 billion by 2033, an 8.0% CAGR for 2026–2033. Its definition includes CSD, water, RTD tea and coffee, functional, juice, dairy-based, and other beverages. This commercial forecast is one scenario, not certainty.' },
      { label: 'Business impact', text: 'Strategy should use multiple scenarios and local leading indicators rather than convert one global CAGR into a Vietnam or company target.' },
    ],
    visualKind: 'nab-m5-55-1-growth-outlook', visualHeading: 'Qualified global growth outlook', visualIntro: 'One published forecast with its exact scope and uncertainty.',
    statTiles: [{ value: '$1,391.4B', label: '2025 global market estimate', description: 'Grand View Research 2026 edition; stated category scope.' }, { value: '$2,551.1B', label: '2033 global forecast', description: 'Forecast, not guaranteed outcome.' }, { value: '8.0%', label: 'Forecast CAGR, 2026–2033', description: 'Nominal revenue forecast in the report’s defined market.' }],
    keyTerms: [{ term: 'Forecast', definition: 'A conditional estimate of future outcomes based on assumptions and a method.' }, { term: 'CAGR', definition: 'The constant annual rate linking a start value and end value over a period.' }, { term: 'Scenario', definition: 'A coherent possible future used to test strategy.' }, { term: 'Market definition', definition: 'The included products, geography, channels, customers, and measurement basis.' }],
    recap: ['Forecast scope must be recorded.', 'CAGR smooths a path and hides annual variation.', 'Global forecasts are not Vietnam forecasts.', 'Drivers and uncertainty should accompany the headline.'],
    chapterRecap: 'Use forecasts to structure scenarios and questions—not to manufacture certainty.',
    deepDiveTitle: 'Reconciling different market reports',
    body: <DeepDive paragraphs={['Build a reconciliation table for inclusions, geography, currency, nominal or real values, historical base, forecast horizon, data sources, and methodology. Do not average incompatible estimates.', 'For Vietnam, where public comparable forecasts vary materially, use qualified external scenarios plus local sell-out, price, distribution, household, regulatory, and capacity indicators.']} />,
    sources: [SOURCES.gvrGlobal, SOURCES.gvrDrinks],
  }),
  chapter({
    title: 'Emerging Opportunities in Beverage Categories', chapterTitle: 'Growth Outlook & Strategic Opportunities', readingTime: '7 min',
    objective: 'Identify category and customer opportunities using unmet need, evidence, repeat, economics, regulation, and capability fit.',
    mateIntro: 'A fast-growing format is not automatically an opportunity for a company whose brand, line, route, or economics cannot support it.',
    keyInsight: 'An opportunity exists where an unmet job, attractive economics, credible evidence, and company capability overlap.',
    narrative: [
      { label: 'What is changing', text: 'Opportunity spaces are emerging around lower-sugar refreshment, functional hydration, RTD routines, ambient-stable formats, premium experiences, targeted affordability, and digitally enabled service.' },
      { label: 'Why it is happening', text: 'Consumer needs are fragmenting while regulation, ingredient science, packaging, data, and channel systems alter what is possible and valuable.' },
      { label: 'Real-world example', text: 'Vietnam’s channel and infrastructure diversity creates different opportunities: ambient-stable formats can support reach where cold service is difficult, while urban convenience can support chilled or premium propositions. These are strategic hypotheses to validate, not measured segment shares.' },
      { label: 'Business impact', text: 'Companies should rank spaces by need strength, evidence, repeat, margin, capital, route, compliance, and right-to-win before funding scale.' },
    ],
    visualKind: 'nab-m5-55-2-opportunity-matrix', visualHeading: 'Opportunity matrix', visualIntro: 'Prioritise evidence and company fit—not trend excitement alone.',
    keyTerms: [{ term: 'Opportunity space', definition: 'A defined combination of consumer need, market context, and possible offer.' }, { term: 'Right to win', definition: 'Capabilities or assets that make a company credible and advantaged in an opportunity.' }, { term: 'Option value', definition: 'The value of preserving a future choice while uncertainty resolves.' }],
    recap: ['Start from an unmet or changing consumer job.', 'Validate repeat and economics, not trial alone.', 'Route and regulation shape the addressable opportunity.', 'Stage investment when evidence is incomplete.'],
    chapterRecap: 'The best opportunity is not always the fastest-growing category; it is the space the company can serve distinctively and profitably.',
    deepDiveTitle: 'From trend to investable opportunity',
    body: <DeepDive paragraphs={['Write a hypothesis with target, occasion, problem, proposed value, alternatives, expected behaviour, unit economics, route, evidence, and kill criteria. Design the cheapest test that can disprove it.', 'Preserve option value through pilots, flexible capacity, partnerships, or regional launches when demand, regulation, or technology is uncertain.']} />,
    sources: [SOURCES.eyWellness, SOURCES.gvrGlobal, SOURCES.suntoryPlant, SOURCES.thp],
  }),
  chapter({
    title: 'Strategic Opportunities and Risks for Businesses', chapterTitle: 'Growth Outlook & Strategic Opportunities', readingTime: '8 min',
    objective: 'Build a balanced response across portfolio, market expansion, channels, partnerships, operations, regulation, and risk.',
    mateIntro: 'Growth can destroy value when a launch adds complexity, channel conflict, regulatory exposure, and working capital faster than repeat demand.',
    keyInsight: 'Strategic opportunity is risk-adjusted: growth, capability, investment, resilience, and evidence must be considered together.',
    narrative: [
      { label: 'What is changing', text: 'Companies face simultaneous portfolio opportunity, channel expansion, technology investment, regulatory transition, resource pressure, and competitive response.' },
      { label: 'Why it is happening', text: 'The industry is becoming more segmented, data-rich, regulated, and operationally interconnected while consumer switching remains easy.' },
      { label: 'Real-world example', text: 'A lower-sugar Vietnam launch can address consumer and tax trends, but success still depends on taste, evidence, line readiness, price-pack, channel execution, and competitor reaction. A partnership may accelerate a missing capability while creating dependency.' },
      { label: 'Business impact', text: 'Leaders should choose no-regret moves, staged bets, explicit signposts, and contingency plans rather than one irreversible forecast-driven plan.' },
    ],
    visualKind: 'nab-m5-55-3-risk-opportunity', visualHeading: 'Strategic risk–opportunity framework', visualIntro: 'Connect each growth path to evidence, capability, downside, and response.',
    keyTerms: [{ term: 'Risk-adjusted opportunity', definition: 'Potential value considered together with uncertainty, investment, downside, and resilience.' }, { term: 'Signpost', definition: 'An observable indicator used to update a scenario or decision.' }, { term: 'No-regret move', definition: 'An action likely to help across several plausible futures.' }, { term: 'Staged investment', definition: 'Commitment made in steps as evidence and capability improve.' }],
    recap: ['Growth quality matters more than headline volume.', 'Portfolio and channel choices create system effects.', 'Partnerships add capability and dependency.', 'Scenarios, signposts, and stages support adaptation.'],
    chapterRecap: 'Pursue growth with a learning plan, capability plan, downside plan, and clear evidence gates.',
    deepDiveTitle: 'A strategic opportunity scorecard',
    body: <DeepDive paragraphs={['Assess consumer value, market evidence, strategic fit, differentiation, unit economics, capital, working capital, route, operational readiness, regulation, sustainability, partner dependence, reversibility, and downside.', 'Review assumptions at pre-defined gates. Stop, adapt, or scale based on evidence rather than sunk cost or forecast prestige.']} />,
    sources: [SOURCES.pwcSst, SOURCES.kpmgEpr, SOURCES.pepsi2024, SOURCES.monster10k],
  }),
];

const VISUALS_55 = {
  'nab-m5-55-1-growth-outlook': { title: 'Global NAB Forecast — One Published Scenario', subtitle: 'Grand View Research 2026 edition; nominal USD revenue and stated scope', mode: 'timeline', rows: [{ label: '2025', detail: 'Base-year market estimate; report historical data end in 2024', value: 'US$1,391.4B' }, { label: '2026', detail: 'Report estimate', value: 'US$1,488.6B' }, { label: '2026–2033', detail: 'Forecast compound annual growth rate', value: '8.0% CAGR' }, { label: '2033', detail: 'Forecast endpoint, not guaranteed outcome', value: 'US$2,551.1B' }], takeaway: 'Treat the forecast as a defined scenario and test its assumptions.' },
  'nab-m5-55-2-opportunity-matrix': { title: 'Opportunity Prioritisation Matrix', subtitle: 'Evidence strength × company right to win', mode: 'matrix', rows: [{ label: 'Scale now', detail: 'Strong evidence and strong capability fit', value: 'Fund with disciplined gates' }, { label: 'Build capability', detail: 'Strong evidence, weak current fit', value: 'Partner, acquire, or develop' }, { label: 'Run options', detail: 'Early evidence, strong fit', value: 'Pilot and preserve flexibility' }, { label: 'Watch or stop', detail: 'Weak evidence and weak fit', value: 'Avoid trend-driven commitment' }], takeaway: 'Opportunity priority depends on evidence and right to win.' },
  'nab-m5-55-3-risk-opportunity': { title: 'Strategic Risk–Opportunity Framework', subtitle: 'Design the response and its evidence gate', mode: 'table', headers: ['Growth path', 'Opportunity', 'Key risk / response'], rows: [{ label: 'Portfolio shift', detail: 'New needs and lower-sugar options', value: 'Taste, claim, complexity → staged tests' }, { label: 'Channel expansion', detail: 'More occasions and consumer access', value: 'Conflict, cost → clear channel roles' }, { label: 'Market expansion', detail: 'New geography or city tier', value: 'Local fit → regional evidence' }, { label: 'Technology', detail: 'Learning, service, productivity', value: 'Data, adoption → governed pilots' }, { label: 'Partnership', detail: 'Faster access to missing capability', value: 'Dependency → rights and contingencies' }], takeaway: 'Every opportunity needs a downside and learning plan.' },
} satisfies Record<string, VisualData>;

const q55 = pairedQuiz('nab-55', [
  { chapter: '1', objective: 'Interpret forecasts', question: 'What does a market forecast represent?', application: 'A report projects 2033 revenue. Should a company treat it as guaranteed sales?', correct: 'A conditional estimate that depends on its scope and assumptions', wrong: ['The sales growth every firm in the market will receive', 'A measured result once the CAGR has been calculated', 'A target that companies in the market are required to meet'], explanation: 'Forecasts support scenarios but do not guarantee market or company outcomes.' },
  { chapter: '1', objective: 'Interpret CAGR', question: 'What does CAGR do?', application: 'Annual growth varies, but a report states 8.0% CAGR. What does that mean?', correct: 'It expresses a smoothed constant rate between start and end values', wrong: ['Every year grows exactly 8.0%', 'It is historical market share', 'It removes base effects'], explanation: 'CAGR is a smoothing calculation, not an annual path prediction.' },
  { chapter: '1', objective: 'Scope forecast evidence', question: 'Why can the cited global forecast not be used as a Vietnam target?', application: 'A planner applies global 8.0% directly to Vietnam sales. What is wrong?', correct: 'Geography, category scope, competition, and company position differ', wrong: ['Global data always equal local sales', 'Vietnam has no beverages', 'CAGR is a currency'], explanation: 'A global market scenario does not determine a local company outcome.' },
  { chapter: '2', objective: 'Identify opportunities', question: 'What turns a trend into an opportunity?', application: 'Interest is rising, but no repeat or viable route is proven. Is it investable?', correct: 'Only after need, evidence, economics, and capability fit align', wrong: ['Rising social-media attention for the category in major cities', 'A high category CAGR, even without repeat purchase evidence', 'The launch of a similar product by a competitor'], explanation: 'Opportunity requires more than trend visibility.' },
  { chapter: '2', objective: 'Assess right to win', question: 'What is a right to win?', application: 'A company has trusted brand, suitable line, and strong route for a need. What does this indicate?', correct: 'Credible capabilities supporting advantage in the opportunity', wrong: ['A guaranteed monopoly', 'A forecast value', 'A tax exemption'], explanation: 'Right to win describes relevant capabilities, not guaranteed success.' },
  { chapter: '2', objective: 'Use option value', question: 'How can a company preserve option value?', application: 'Demand is uncertain but the company wants to learn. Which move fits?', correct: 'Run a reversible pilot or partnership before full commitment', wrong: ['Build maximum capacity immediately', 'Ignore evidence gates', 'Commit nationally from one interview'], explanation: 'Flexible, staged actions preserve future choices while evidence develops.' },
  { chapter: '2', objective: 'Evaluate category fit', question: 'Why may the fastest-growing category be a poor choice?', application: 'A company lacks route, brand permission, and technical capability. What is the implication?', correct: 'Growth may not translate into attractive company economics', wrong: ['Market growth guarantees profit', 'Capability never matters', 'Competition disappears'], explanation: 'Company value depends on fit, differentiation, execution, and economics.' },
  { chapter: '3', objective: 'Balance growth and risk', question: 'What is a risk-adjusted opportunity?', application: 'A plan compares upside with capital, uncertainty, downside, and resilience. What is it doing?', correct: 'Evaluating potential value together with risk and capability', wrong: ['Ignoring downside', 'Using only market size', 'Treating a forecast as fact'], explanation: 'Risk-adjusted analysis considers both value and uncertainty.' },
  { chapter: '3', objective: 'Use signposts', question: 'What is a strategic signpost?', application: 'Repeat rate and regulatory guidance determine whether to scale. What are they?', correct: 'Observable indicators used to update a decision', wrong: ['Guaranteed outcomes', 'Decorative metrics', 'Historical costs only'], explanation: 'Signposts trigger review as evidence changes.' },
  { chapter: '3', objective: 'Stage investment', question: 'Why use evidence gates?', application: 'A pilot misses repeat and economics thresholds. What should happen?', correct: 'Stop, adapt, or delay before larger commitment', wrong: ['Scale because money was already spent', 'Ignore the thresholds', 'Remove all measurement'], explanation: 'Gates prevent sunk cost and optimism from replacing evidence.' },
]);

const TAKEAWAY_55: NabModule05Takeaways = {
  learned: 'You can interpret beverage forecasts, evaluate emerging opportunities, and design risk-adjusted strategic responses under uncertainty.',
  keyTakeaways: ['Forecasts require exact scope, period, currency, and assumptions.', 'CAGR is a smoothed scenario, not a guaranteed annual path.', 'Opportunity combines need, evidence, economics, and right to win.', 'Staged bets, signposts, and no-regret moves support adaptation.'],
  businessImplications: 'Companies should convert outlooks into monitored scenarios and invest progressively as consumer, operating, regulatory, and financial evidence strengthens.',
  remember: 'Use the forecast to ask better questions—not to claim certainty.',
  nextLesson: 'NAB curriculum complete · Back to module list',
};

// NEXT_BATCH
const ALL_LESSONS: LessonMeta[] = [LESSON_51_META, LESSON_52_META, LESSON_53_META, LESSON_54_META, LESSON_55_META];
const ALL_DECKS: Record<string, NabModule05CardData[]> = { [LESSON_51_META.title]: lesson51, [LESSON_52_META.title]: lesson52, [LESSON_53_META.title]: lesson53, [LESSON_54_META.title]: lesson54, [LESSON_55_META.title]: lesson55 };
const ALL_VISUALS = { ...VISUALS_51, ...VISUALS_52, ...VISUALS_53, ...VISUALS_54, ...VISUALS_55 };
const ALL_QUIZZES: Record<string, NabModule05Question[]> = { [LESSON_51_META.title]: q51, [LESSON_52_META.title]: q52, [LESSON_53_META.title]: q53, [LESSON_54_META.title]: q54, [LESSON_55_META.title]: q55 };
const ALL_TAKEAWAYS: Record<string, NabModule05Takeaways> = { [LESSON_51_META.title]: TAKEAWAY_51, [LESSON_52_META.title]: TAKEAWAY_52, [LESSON_53_META.title]: TAKEAWAY_53, [LESSON_54_META.title]: TAKEAWAY_54, [LESSON_55_META.title]: TAKEAWAY_55 };
export const NAB_MODULE05_LESSONS = ALL_LESSONS;
export const NAB_MODULE05_DECKS = ALL_DECKS;
applyChapterVisualText(NAB_MODULE05_DECKS, NAB_M5_VISUALS);
export const NAB_MODULE05_QUIZZES = ALL_QUIZZES;
export const NAB_MODULE05_TAKEAWAYS = ALL_TAKEAWAYS;
export type NabModule05VisualKind = keyof typeof ALL_VISUALS;

function VisualTable({ data }: { data: VisualData }) { const headers = data.headers ?? ['Topic', 'Explanation', 'Implication']; return <div className="overflow-x-auto rounded-xl border border-slate-200"><table className="w-full min-w-[620px] border-collapse text-left"><thead className="bg-red-600 text-white"><tr>{headers.map((header) => <th key={header} className="px-4 py-3 text-xs font-black">{header}</th>)}</tr></thead><tbody>{data.rows.map((row, index) => <tr key={row.label} className={index % 2 ? 'bg-slate-50' : 'bg-white'}><th className="px-4 py-3 text-xs font-black text-slate-900">{row.label}</th><td className="px-4 py-3 text-xs leading-5 text-slate-600">{row.detail}</td><td className="px-4 py-3 text-xs font-bold leading-5 text-red-600">{row.value ?? '—'}</td></tr>)}</tbody></table></div>; }
function VisualFlow({ data }: { data: VisualData }) { return <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">{data.rows.map((row, index) => <div key={row.label} className="rounded-xl border border-slate-200 bg-white p-4"><span className="text-[10px] font-black uppercase tracking-[0.14em] text-red-600">{String(index + 1).padStart(2, '0')}</span><p className="mt-2 text-sm font-black text-slate-900">{row.label}</p><p className="mt-1 text-xs leading-5 text-slate-500">{row.detail}</p></div>)}</div>; }
function VisualNetwork({ data }: { data: VisualData }) { return <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{data.rows.map((row, index) => <div key={row.label} className={`rounded-xl border p-4 ${index === 0 ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}`}><p className="text-sm font-black text-slate-900">{row.label}</p><p className="mt-1 text-xs leading-5 text-slate-500">{row.detail}</p>{row.value ? <p className="mt-2 text-xs font-bold text-red-600">{row.value}</p> : null}</div>)}</div>; }
function VisualTimeline({ data }: { data: VisualData }) { return <div className="relative space-y-3 pl-7"><span className="absolute bottom-3 left-2.5 top-3 w-0.5 bg-red-100" aria-hidden />{data.rows.map((row) => <div key={row.label} className="relative rounded-xl border border-slate-200 bg-white p-4"><span className="absolute -left-[23px] top-5 h-3 w-3 rounded-full bg-red-600 ring-4 ring-white" aria-hidden /><div className="flex flex-wrap items-center justify-between gap-2"><p className="text-sm font-black text-slate-900">{row.label}</p>{row.value ? <span className="rounded-full bg-red-50 px-2 py-1 text-[10px] font-bold text-red-600">{row.value}</span> : null}</div><p className="mt-1 text-xs leading-5 text-slate-500">{row.detail}</p></div>)}</div>; }
function VisualMatrix({ data }: { data: VisualData }) { return <div className="grid gap-3 sm:grid-cols-2">{data.rows.map((row, index) => <div key={row.label} className={`rounded-xl border p-4 ${index === 0 ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}`}><p className="text-sm font-black text-slate-900">{row.label}</p><p className="mt-1 text-xs leading-5 text-slate-500">{row.detail}</p>{row.value ? <p className="mt-3 border-t border-slate-200 pt-2 text-xs font-bold text-red-600">{row.value}</p> : null}</div>)}</div>; }
export function renderNabModule05Visual(kind: NabModule05VisualKind): ReactNode { const v = NAB_M5_VISUALS[kind]; return v ? <VisualView spec={v.spec} /> : null; }
