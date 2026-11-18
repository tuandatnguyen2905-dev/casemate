import { Arrow, Box, DeepDive, DivBars, Frame, HBars, MUTED, SvgWrap, Txt, VCols, chapter, cite, quiz } from './beerM1Core';
import type { BeerLessonBundle } from './beerM1Core';

const LESSON = '1.3 Global Market Overview';
const CAPTION = 'mb-2 text-[11px] font-bold uppercase tracking-[0.12em] text-slate-500';

function EvidenceTiersVisual() {
  return (
    <Frame title="Reading a global market number" subtitle="Three evidence tiers, plus the gaps this research could not close." takeaway="Label every number with its tier, year, unit and geography, and say plainly when a headline figure is unverified." note="The US$748-800 billion range for global beer value comes from commercial sources only and is not used anywhere in this module.">
      <SvgWrap w={720} h={396} label="Three evidence tiers and the figures that remain unverified">
        <Txt x={0} y={14} text="THREE EVIDENCE TIERS, MOST COMPARABLE FIRST" size={11} weight={800} fill={MUTED} />
        <Box x={0} y={24} w={440} h={112} tone="navy" title="Tier 1: official and institutional" body={['WHO: 5.5 litres of pure alcohol per adult (2019)', 'OIV: wine production, consumption and trade (2024-25)', 'WCO: Harmonized System trade codes']} size={12.5} />
        <Box x={0} y={148} w={440} h={112} tone="tint" title="Tier 2: industry trackers" body={['Kirin Holdings: 194.12 million kL of beer (2024)', 'BarthHaas: top-40 brewing groups (2022)', 'IWSR forecasts; Brewers of Europe trade data']} size={12.5} />
        <Box x={0} y={272} w={440} h={112} tone="soft" title="Tier 3: commercial vendor estimates" body={['Astute Analytica: Vietnam beer value, beer share and per-capita intake', 'OhBEV: a compilation of IWSR and NielsenIQ RTD data']} size={12.5} />
        <Box x={460} y={24} w={260} h={360} tone="outline" title="Not verified in this research" body={['Global beer value in US dollars: vendor estimates range roughly US$748-800 billion for 2024', 'Global spirits market size, in volume or value', 'Vietnam statistics-office production and consumption data', 'Primary OIV, BarthHaas and Brewers of Europe reports, read through secondary reporting']} size={12.5} />
      </SvgWrap>
    </Frame>
  );
}

function GrowthVisual() {
  return (
    <Frame title="Is the world drinking more?" subtitle="Litres, money and per-person intake point in slightly different directions." takeaway="Volume is flat to falling while value edges up: people are drinking a little less and spending a little more per litre." note="Different years and sources: beer 2024 (Kirin, brewer-compiled), IWSR 2024, wine 2025 (OIV via ESM Magazine), per-adult pure alcohol 2010 and 2019 (WHO). Compare direction, not magnitude.">
      <p className={CAPTION}>Year-on-year change</p>
      <DivBars label="Year-on-year change in global beer, beverage alcohol and wine measures" rows={[
        { label: 'Global beer consumption, 2024', value: 0.5, text: '+0.5%', sub: 'Kirin Holdings tracker (brewer-compiled estimate)' },
        { label: 'All beverage alcohol, volume, 2024', value: -1, text: '-1%', sub: 'IWSR, reported by Drinks International' },
        { label: 'All beverage alcohol, value, 2024', value: 1, text: '+1%', sub: 'IWSR: slightly less drunk, slightly more spent' },
        { label: 'Global wine consumption, 2025', value: -2.7, text: '-2.7%', sub: 'OIV via ESM Magazine' },
        { label: 'Global wine production, 2025', value: 0.6, text: '+0.6%', sub: 'OIV: a small rebound after a roughly 60-year low in 2024' },
      ]} />
      <p className={`${CAPTION} mt-6`}>Litres of pure alcohol per person aged 15 and over, world (WHO)</p>
      <div className="max-w-[460px]">
        <VCols label="WHO global alcohol per adult in 2010 and 2019" w={420} h={270} max={6.5} rows={[
          { label: '2010', value: 5.7, text: '5.7 L', tone: 'slate', sub: 'Starting point' },
          { label: '2019', value: 5.5, text: '5.5 L', tone: 'red', sub: 'Down 0.2 litres' },
        ]} />
      </div>
    </Frame>
  );
}

function PillarsVisual() {
  return (
    <Frame title="Beer, wine and spirits at global scale" subtitle="Converted to one unit, the pillars differ enormously in volume and in what we can verify." takeaway="Beer is volume-led, wine is supply-constrained and spirits are value-led. Compare them only after converting units and naming the year." note="1 kilolitre = 10 hectolitres, so 194.12 million kL = about 1,941 million hl. Beer is 2024 (Kirin) and wine is 2025 (OIV via ESM Magazine), so the roughly 9x ratio is indicative only. No global spirits volume or value was verified.">
      <HBars label="Beer consumption compared with wine production and consumption in million hectolitres" max={2000} labelW={250} rowH={62} rows={[
        { label: 'Beer consumption, 2024', value: 1941, text: '~1,941M hl', tone: 'navy', sub: 'Kirin: 194.12 million kL, converted to hectolitres' },
        { label: 'Wine production, 2025', value: 227, text: '227M hl', tone: 'slate', sub: 'OIV: +0.6% on 2024' },
        { label: 'Wine consumption, 2025', value: 208, text: '208M hl', tone: 'red', sub: 'OIV: -2.7% on 2024' },
      ]} />
      <div className="mt-5">
        <SvgWrap w={720} h={206} label="Three pillar summary cards">
          <Box x={0} y={0} w={232} h={200} title="Beer: volume-led" body={['Largest category by volume', '194.12M kL, +0.5% (2024)', 'Brewed locally; a few groups lead']} size={12.5} />
          <Box x={244} y={0} w={232} h={200} title="Wine: supply-constrained" body={['Production 225.8M hl in 2024, a ~60-year low', '227M hl in 2025; consumption 208M hl', 'Fragmented, climate-exposed farm base']} size={12.5} />
          <Box x={488} y={0} w={232} h={200} tone="tint" title="Spirits: value-led" body={['Smaller volume, high value per litre', 'Diageo FY2026 net sales US$19.6B; Pernod Ricard FY2025 EUR10.96B', 'No verified global volume or value']} size={12.5} />
        </SvgWrap>
      </div>
    </Frame>
  );
}

function MarketsVisual() {
  return (
    <Frame title="Where beer grows and where it plateaus" subtitle="Growth in 2024 sits in emerging markets; the largest market is already shrinking." takeaway="Rank markets three ways, by total litres, by growth and by litres per person, because each ranking tells a different story." note="Kirin Holdings 2024 tracker (brewer-compiled). WHO figures are pure alcohol across all drinks, 2019, and are not comparable with beer-only litres per person. Vietnam rank and share are vendor estimates (Astute Analytica); the 29th place comes from state media with no metric stated.">
      <p className={CAPTION}>Beer consumption change, 2024 versus 2023</p>
      <DivBars label="Beer consumption change in India, Russia, Thailand, the world and China in 2024" rows={[
        { label: 'India', value: 14.6, text: '+14.6%', sub: 'Largest growth among the markets cited' },
        { label: 'Russia', value: 9, text: '+9.0%' },
        { label: 'Thailand', value: 5.8, text: '+5.8%' },
        { label: 'World', value: 0.5, text: '+0.5%', sub: 'About 194.12 million kL in total' },
        { label: 'China', value: -3.7, text: '-3.7%', sub: 'Still the largest consumer for the 22nd year: a mature plateau' },
      ]} />
      <div className="mt-5">
        <SvgWrap w={720} h={176} label="Three ways to rank beer markets">
          <Box x={0} y={0} w={232} h={170} title="By total volume" body={['Asia: 32.6% of beer consumption, top region for the 17th year', 'China: largest country for 22 years']} size={12} />
          <Box x={244} y={0} w={232} h={170} title="Per person" body={['Czech Republic: 148.8 litres of beer per person (2024)', 'WHO pure alcohol per adult, 2019: Europe 9.2 L, Americas 7.5 L, world 5.5 L']} size={12} />
          <Box x={488} y={0} w={232} h={170} tone="tint" title="Vietnam" body={['About 9th by volume, ~2.2% of world volume, 3rd in Asia (vendor)', 'State media: 29th worldwide, metric not stated']} size={12} />
        </SvgWrap>
      </div>
    </Frame>
  );
}

function TradeFlowsVisual() {
  const rows: Array<[string, string, string, string, string]> = [
    ['Beer', 'Inputs trade globally', 'Barley, malt, hops and aluminium cross borders', 'Brewed in each market', 'Sold locally by a group or licensee'],
    ['Wine', 'Made at origin', 'Grapes grown and bottled in a producing region', 'Exported as finished wine', '~94.8M hl worth ~EUR33.8B in 2025'],
    ['Spirits', 'Made and matured at origin', 'Distilled, then aged for years', 'Exported worldwide', 'High value per litre justifies long shipping'],
  ];
  const dynamics = [
    ['Premiumisation', 'Value per litre rises: Heineken® +9% in 2024 on +1.6% beer volume'],
    ['Moderation', 'Volume falls in mature markets: EU beer production -2.9%, consumption -3.2% (2025)'],
    ['Climate', 'Wine supply hit: 2024 output a ~60-year low on extreme weather'],
    ['Regional shift', 'Pernod Ricard FY2025: China -21%, India +6%; IWSR sees India leading growth'],
  ];
  return (
    <Frame title="What crosses borders, and what is changing" subtitle="Trade follows value density, and four forces are reshaping the flows." takeaway="Spirits and wine travel as finished goods, beer travels as inputs and brands, and premiumisation, moderation, climate and regional growth are rewriting the map." note="OIV trade and production figures were read via ESM Magazine. Pernod Ricard (year to June 2025) and Diageo (year to June 2026) have different windows and currencies. Beer trade volumes by country were not verified.">
      <SvgWrap w={720} h={462} label="Trade flows for beer, wine and spirits and four market dynamics">
        {rows.map((row, index) => (
          <g key={row[0]}>
            <Box x={0} y={index * 96} w={104} h={86} tone={index === 0 ? 'navy' : index === 1 ? 'red' : 'navy'} center title={row[0]} titleSize={15} />
            <Box x={122} y={index * 96} w={174} h={86} title={row[1]} body={row[2]} size={11.5} />
            <Box x={322} y={index * 96} w={174} h={86} tone="soft" title={row[3]} size={12.5} />
            <Box x={522} y={index * 96} w={198} h={86} tone="tint" body={row[4]} size={12} />
            <Arrow x1={104} y1={index * 96 + 43} x2={122} y2={index * 96 + 43} />
            <Arrow x1={296} y1={index * 96 + 43} x2={322} y2={index * 96 + 43} />
            <Arrow x1={496} y1={index * 96 + 43} x2={522} y2={index * 96 + 43} />
          </g>
        ))}
        <Txt x={0} y={314} text="FOUR FORCES RESHAPING FLOWS" size={11} weight={800} fill={MUTED} />
        {dynamics.map((item, index) => <Box key={item[0]} x={index * 181} y={326} w={172} h={128} tone={index === 0 ? 'red' : 'light'} title={item[0]} body={item[1]} size={11.5} />)}
      </SvgWrap>
    </Frame>
  );
}

const deck = [
  chapter({
    title: 'Understanding the Global Alcoholic Beverages Market', chapterTitle: LESSON, readingTime: '5',
    objective: 'Explain how to read a global market number: volume versus value, official versus commercial sources, and why some headline figures are left out.',
    mateIntro: 'Ask three analysts for the size of the global alcohol market and you may get three different answers, each defensible. Before we look at any chart, let’s learn to read the numbers behind it.',
    keyInsight: 'A global market figure is only as good as its definition and its source. Volume and value are different measures, official statistics and commercial estimates differ in reliability, and some headline numbers are simply not verified.',
    narrative: [
      { label: 'What it is', text: 'The global alcoholic beverages market is the combined consumption and sales of beer, wine and spirits worldwide. It can be measured as volume (litres or hectolitres), as value (currency) or as intake per person (litres of pure alcohol), and each measure tells a different story.' },
      { label: 'How it works', text: 'Analysts lean on three tiers of evidence. Official and institutional data, such as WHO consumption statistics and OIV wine data, are the most comparable. Industry trackers, such as Kirin’s beer survey and IWSR forecasts, are useful but compiled by interested parties. Commercial market-research estimates are vendor numbers that can diverge widely. Good analysis labels the tier, year, unit and geography every time.' },
      { label: 'Global example', text: 'Global beer value shows why. Vendor estimates for 2024 range from roughly US$748 billion to US$800 billion, all from commercial sources, so this module does not quote a single global beer value. No authoritative global spirits market size was verified either. What can be anchored: 194.12 million kilolitres of beer in 2024 (Kirin), 5.5 litres of pure alcohol per adult in 2019 (WHO), and OIV’s figures for wine.' },
      { label: 'Vietnam example', text: 'Vietnam needs the same caution. The US$7.89 billion market value, the 91% beer share and the 8.3-litre per-capita figure all come from one vendor, Astute Analytica. No figures from Vietnam’s General Statistics Office were verified, so every Vietnamese market number here carries a vendor-estimate label.' },
      { label: 'Why it matters', text: 'Reading numbers by tier and unit protects you from false precision. Saying “about 194 million kilolitres, per a brewer-compiled tracker, in 2024” is stronger than quoting a bare headline.' },
    ],
    visualKind: 'beer-m1-13-1-evidence-tiers', visualHeading: 'Three tiers of evidence', visualIntro: 'See which sources are most comparable, and which headline numbers this module deliberately leaves out.',
    imageAlt: 'Diagram of three evidence tiers and unverified global market figures',
    keyTerms: [{ term: 'Volume versus value', definition: 'Litres or hectolitres sold, versus the money those sales generate.' }, { term: 'Per-capita consumption', definition: 'Average intake per person, here measured in litres of pure alcohol for adults aged 15 and over.' }, { term: 'Vendor estimate', definition: 'A market size or forecast published by a commercial research firm, not an official statistic.' }, { term: 'Official statistic', definition: 'Data produced by an institution such as WHO or the OIV under a defined method.' }],
    recap: ['Volume, value and per-person intake measure different things.', 'Official, tracker and vendor evidence differ in reliability.', 'Unverified headline figures are left out rather than guessed.', 'Always state tier, year, unit and geography.'],
    chapterRecap: 'A good number comes with a tier, a year, a unit and a geography.',
    deepDiveTitle: 'How the module chooses which numbers to show',
    body: <DeepDive paragraphs={['The module prefers official figures when they exist, such as WHO per-adult consumption and OIV wine data. It uses industry trackers for beer because there is no official global beer series, and it flags them as brewer-compiled.', 'Vendor estimates appear only where nothing better exists, mainly for Vietnam, and always with a label. Where vendors disagree widely, as with global beer value, the figure is dropped.', 'This is also a useful habit for any case or interview: name the source type before the number, and say what the number cannot tell you.']} caveat="The US$748-800 billion range for global beer value is reported in the research record as commercial-only and unverified. OIV figures were read through ESM Magazine; the primary OIV report was not fetched. IWSR and Distilled Spirits Council data on spirits were not fetched." />,
    sources: cite('s1', 's6', 's7', 's8', 's10', 's25', 'rec'),
  }),
  chapter({
    title: 'Global Market Size and Growth', chapterTitle: LESSON, readingTime: '5',
    objective: 'Describe the direction of the global market in volume, value and consumption per person, and separate growth in value from growth in litres.',
    mateIntro: 'Is the world drinking more? The honest answer has three parts: slightly more beer in total, noticeably less alcohol per person over time, and a little more money spent per litre.',
    keyInsight: 'Global volume is flat to slightly down while value edges up. Beer rose 0.5% in 2024, beverage-alcohol volume fell about 1% while value rose about 1%, and WHO per-adult intake slipped from 5.7 to 5.5 litres of pure alcohol between 2010 and 2019.',
    narrative: [
      { label: 'What it is', text: 'Market size and growth describe how much is consumed or sold and how fast that is changing. For alcohol, the same year can be up in total beer litres, down in total volume across all alcohol and up in value.' },
      { label: 'How it works', text: 'Three forces explain the mix. Population and income growth in emerging regions add litres. Moderation and health policy in mature markets remove them. Premiumisation, selling fewer but pricier units, lifts value even when volume is flat. IWSR’s first 10-year forecast expects about US$34 billion of value growth across key markets by 2034, led by India, then Brazil and Mexico.' },
      { label: 'Global example', text: 'In 2024 global beer consumption was about 194.12 million kilolitres, up 0.5%, according to Kirin. IWSR reports that global beverage-alcohol volume fell about 1% and value rose about 1% in the same year. WHO’s official series puts consumption per person aged 15 and over at 5.5 litres of pure alcohol in 2019, down from 5.7 in 2010. Wine tells a similar story: OIV reports 2025 consumption of about 208 million hectolitres, down 2.7%.' },
      { label: 'Vietnam example', text: 'Vietnam sits on the growth side of the picture. Astute Analytica values its beer market at US$7.89 billion in 2024 and projects US$14.85 billion by 2033, about 7.27% a year. That is a single-vendor forecast made before the full effect of the 2027 to 2031 excise increases, so treat it as an optimistic scenario rather than a consensus.' },
      { label: 'Why it matters', text: 'Growth in litres, growth in value and growth per person are different questions. Strategy follows the one that is actually moving: value in mature markets, and volume plus mix in emerging ones.' },
    ],
    visualKind: 'beer-m1-13-2-growth-signals', visualHeading: 'Litres, money and intake per person', visualIntro: 'Compare the direction of each measure, then see the long-run WHO trend.',
    imageAlt: 'Charts of year-on-year change in global beer, alcohol and wine measures and WHO per-adult intake',
    keyTerms: [{ term: 'CAGR', definition: 'Compound annual growth rate: the steady yearly rate that links a start value to an end value.' }, { term: 'Premiumisation', definition: 'Selling fewer but more expensive units to grow value even when volume is flat.' }, { term: 'Pure alcohol per capita', definition: 'Litres of ethanol consumed per person per year, which makes beer, wine and spirits comparable.' }, { term: 'Moderation', definition: 'The long-run tendency to drink less per person, driven by health and policy.' }],
    recap: ['Beer volume rose 0.5% in 2024 while all-alcohol volume fell about 1%.', 'Value rose about 1%: drinkers traded up.', 'WHO per-adult intake fell from 5.7 to 5.5 litres (2010 to 2019).', 'Forecasts such as IWSR’s US$34 billion are value growth across key markets, not a total.'],
    chapterRecap: 'Flat litres and rising value is the shape of a maturing market.',
    deepDiveTitle: 'Reading growth without overstating it',
    body: <DeepDive paragraphs={['The numbers in this chapter come from different years and sources, so the lesson is about direction. Each one points the same way: litres are flat to down, value is slightly up, and intake per person has drifted lower for a decade.', 'Premiumisation is the bridge between those facts. If drinkers choose fewer, better drinks, litres can fall while sales value holds or grows, which is why companies talk about defending value rather than volume.', 'Forecasts need extra care. IWSR’s US$34 billion is cumulative value growth in key markets over ten years, with India leading. It is not the size of the market and it is not a Vietnam number.']} caveat="IWSR’s figure is value growth across key markets, not total global growth, and its per-market breakdown was not fetched. Kirin’s tracker is brewer-compiled. The Vietnam forecast is a single-vendor projection and all multi-year projections predate the full 2027 to 2031 excise escalation." />,
    sources: cite('s1', 's8', 's10', 's25', 's6'),
  }),
  chapter({
    title: 'Global Beer, Wine, and Spirits Consumption', chapterTitle: LESSON, readingTime: '6',
    objective: 'Compare beer, wine and spirits at global scale, including how each is measured, how each is trending and what the research cannot yet say about spirits.',
    mateIntro: 'Beer, wine and spirits are measured in different units by different bodies, so lining them up takes care. Let’s put them side by side without pretending they are more comparable than they are.',
    keyInsight: 'Beer is the largest category by volume, about 194 million kilolitres or roughly 1,941 million hectolitres in 2024. Wine is far smaller, about 208 million hectolitres consumed in 2025, and falling. Spirits are smaller by volume but high in value per litre, and no global spirits figure was verified.',
    narrative: [
      { label: 'What it is', text: 'Each pillar has its own measurement tradition. Beer is tracked in kilolitres by brewer-compiled trackers. Wine is tracked in hectolitres by the OIV, the intergovernmental body behind the annual wine report. Spirits are more often followed through value and brand-house results, while WHO converts all three into litres of pure alcohol.' },
      { label: 'How it works', text: 'Convert to a common unit before comparing. One kilolitre is ten hectolitres, so 194.12 million kilolitres of beer is about 1,941 million hectolitres, roughly nine times the 208 million hectolitres of wine consumed. The years and sources differ, so the ratio is indicative only. Spirits reverse the logic: small volume but high value per litre, with whisky, cognac and tequila driving premiumisation.' },
      { label: 'Global example', text: 'OIV reports global wine production of about 225.8 million hectolitres in 2024, roughly a 60-year low, and about 227 million in 2025, up 0.6%, while consumption fell to about 208 million, down 2.7%. In spirits, Diageo’s FY2026 net sales were US$19,643 million and Pernod Ricard’s FY2025 net sales were €10,959 million. Those are different fiscal years and currencies, so they are not additive. Ready-to-drink is an adjacent growth category: IWSR forecasts about 12% volume growth from 2022 to 2027, to roughly US$40 billion.' },
      { label: 'Vietnam example', text: 'The pillars are very uneven in Vietnam. Beer is about 91% of alcohol consumed, a vendor estimate. Spirits include domestic rượu and imported whisky and cognac, and wine is a small, import-reliant segment. The same vendor ranks Vietnam about 9th in the world for beer consumption, at roughly 2.2% of global volume.' },
      { label: 'Why it matters', text: 'The pillars grow, shrink and earn money differently. Someone who can say beer is volume-led, wine is supply-constrained and spirits are value-led has understood the global structure.' },
    ],
    visualKind: 'beer-m1-13-3-pillars', visualHeading: 'Three pillars, one unit', visualIntro: 'The bars put beer and wine on the same hectolitre scale; the cards show what each pillar is driven by.',
    imageAlt: 'Bar chart of beer versus wine volume with summary cards for beer, wine and spirits',
    statTiles: [
      { value: '~1,941M hl', label: 'Beer consumed, 2024', description: 'Kirin: 194.12 million kL converted to hectolitres.' },
      { value: '208M hl', label: 'Wine consumed, 2025', description: 'OIV, down 2.7% on 2024.' },
    ],
    keyTerms: [{ term: 'Kilolitre and hectolitre', definition: 'Units of volume: 1 kilolitre equals 10 hectolitres, or 1,000 litres.' }, { term: 'Value density', definition: 'Worth per litre or kilogram, which is high for spirits and low for beer.' }, { term: 'OIV', definition: 'The International Organisation of Vine and Wine, the body behind the annual wine report.' }, { term: 'RTD', definition: 'Ready-to-drink: packaged cocktails, hard seltzers and similar drinks.' }],
    recap: ['Beer is the largest category by volume.', 'Wine is far smaller by volume and consumption is falling.', 'Spirits are value-led and no global spirits figure was verified.', 'Convert units and name the year before comparing pillars.'],
    chapterRecap: 'Beer is volume-led, wine is supply-constrained and spirits are value-led.',
    deepDiveTitle: 'Why the pillars cannot simply be added together',
    body: <DeepDive paragraphs={['Adding litres of beer to litres of wine hides what matters. A litre of beer and a litre of aged spirit differ enormously in price, tax and margin, which is why WHO converts to pure alcohol for health analysis while industry analysts talk about value.', 'The wine figures show a supply story as well as a demand story. Production at a roughly 60-year low in 2024, attributed to extreme weather, means falling consumption is partly a matter of fewer bottles to buy.', 'Brand-house results give a window into spirits: Diageo and Pernod Ricard both reported organic declines of about 2% to 3%, though their fiscal years end in June of different years.']} caveat="Beer is 2024 (Kirin, brewer-compiled) and wine is 2025 (OIV via ESM Magazine; the primary report was not fetched), so the roughly 9x ratio is indicative only. Global spirits volume and value were not verified; IWSR and Distilled Spirits Council data were not fetched. The RTD forecast is an IWSR figure reported by a marketing agency." />,
    sources: cite('s1', 's10', 's17', 's18', 's19', 's6'),
  }),
  chapter({
    title: 'Major Production and Consumption Markets', chapterTitle: LESSON, readingTime: '5',
    objective: 'Identify where beer is mostly consumed, which markets are growing or shrinking, and why rankings by total volume and by intake per person differ.',
    mateIntro: 'Which country drinks the most beer? It depends on whether you count total litres or litres per person, and the answer changes the story completely.',
    keyInsight: 'Asia is the largest beer region at 32.6% of 2024 consumption and China the largest country for 22 straight years, yet the Czech Republic leads per person at 148.8 litres and Europe leads on pure alcohol per adult. Growth is moving to India, Russia and Thailand while China plateaus.',
    narrative: [
      { label: 'What it is', text: 'Major markets can be ranked by total consumption, by growth and by consumption per person, and the three rankings differ. For beer, production follows consumption closely because beer is brewed near the drinker.' },
      { label: 'How it works', text: 'Total volume rewards population, so China and India lead because they are large. Per-person intake rewards habit: the Czech Republic tops beer at 148.8 litres, and WHO’s per-adult pure alcohol is highest in Europe at 9.2 litres and the Americas at 7.5 litres in 2019. Growth rewards momentum: in 2024 India grew 14.6%, Russia 9.0% and Thailand 5.8%, while China, the biggest market, fell 3.7%.' },
      { label: 'Global example', text: 'Kirin’s 2024 tracker shows Asia at 32.6% of global beer consumption, the 17th consecutive year as the top region, and China as the largest consuming country for the 22nd year even as its volume fell. Europe is a production base: about 10,000 breweries supporting roughly 2 million jobs and €52 billion of value added, yet EU beer production fell 2.9% and consumption 3.2% in 2025.' },
      { label: 'Vietnam example', text: 'Vietnam punches above its size. A vendor ranks it about 9th in the world for beer consumption, at roughly 2.2% of global volume and 3rd in Asia after China and Japan, with consumption above 3.8 million kilolitres. A Vietnamese state-media report ranks the country 2nd in Southeast Asia and 29th worldwide for alcohol consumption; because the metric is not stated, do not compare it directly with the volume rank.' },
      { label: 'Why it matters', text: 'Where growth is moving decides where global brewers invest. That is why Asia, and Vietnam within it, attracts plants and talent even while mature markets decline.' },
    ],
    visualKind: 'beer-m1-13-4-markets', visualHeading: 'Growth, size and intensity', visualIntro: 'The bars show who grew in 2024; the cards show three different ways to rank the same markets.',
    imageAlt: 'Bar chart of 2024 beer consumption change by market and three ranking methods',
    keyTerms: [{ term: 'Mature market', definition: 'A market where demand is high and growth has levelled off or turned negative.' }, { term: 'Emerging market', definition: 'A market where rising incomes and population are still lifting consumption.' }, { term: 'Per-capita intake', definition: 'Consumption divided by population, which favours small high-intensity markets.' }, { term: 'Region share', definition: 'A region’s portion of global consumption, such as Asia’s 32.6% of beer.' }],
    recap: ['Asia holds 32.6% of beer consumption; China is the largest country.', 'India, Russia and Thailand grew in 2024 while China fell 3.7%.', 'The Czech Republic leads per person; Europe leads on pure alcohol per adult.', 'Vietnam ranks about 9th by volume on a vendor estimate.'],
    chapterRecap: 'Rank markets by size, growth and intensity, and never mix the three.',
    deepDiveTitle: 'Why rankings disagree',
    body: <DeepDive paragraphs={['A big country with moderate habits and a small country with heavy ones can both top a ranking, depending on the denominator. Total volume divides by nothing; per-person divides by population. That is why China and the Czech Republic can both be called number one.', 'Growth adds a third lens. The 2024 data show the largest market contracting while mid-sized markets expand quickly, which is a classic mature-versus-emerging pattern and the reason investment follows growth rather than size.', 'Production deserves a note. Because beer is heavy and brewed near the drinker, consumption maps are a good proxy for production maps, but country-level production rankings were not verified in this research.']} caveat="Kirin’s tracker is brewer-compiled. WHO figures measure pure alcohol across all drinks in 2019 and are not comparable with beer-only litres per person. Vietnam’s rank and share are vendor estimates; the 29th-place ranking is from state media with no stated metric. Country rankings for wine and spirits were not verified." />,
    sources: cite('s1', 's8', 's15', 's6', 's23'),
  }),
  chapter({
    title: 'International Trade and Market Dynamics', chapterTitle: LESSON, readingTime: '6',
    objective: 'Explain what crosses borders in each pillar and how premiumisation, moderation, climate and regional growth are reshaping the global market.',
    mateIntro: 'A bottle of Scotch can cross three oceans before it reaches a glass. A pint of lager mostly cannot. What crosses borders, and what is changing, shows how the global market really works.',
    keyInsight: 'Trade follows value density: spirits and wine travel as finished goods, while beer travels mostly as inputs and brands brewed locally. Four dynamics are reshaping flows: premiumisation, moderation, climate pressure on wine supply and a shift of growth toward developing markets.',
    narrative: [
      { label: 'What it is', text: 'International trade in alcohol is recorded through Harmonized System codes: 2203 for beer, 2204 for wine and 2208 for spirits. What crosses borders differs by pillar. Finished wine and spirits travel widely, while beer is brewed in each market from globally traded inputs such as barley, malt, hops and aluminium.' },
      { label: 'How it works', text: 'Value density decides. High-value spirits aged at an origin, and wine from a growing region, justify long-distance shipping; heavy, low-value beer does not. Four dynamics then reshape the flows. Premiumisation lifts value per litre, moderation shrinks volume in mature markets, climate shocks cut wine supply, and growth moves toward developing markets such as India.' },
      { label: 'Global example', text: 'OIV reports world wine exports of about 94.8 million hectolitres worth about €33.8 billion in 2025, with export value down 6.7%, and vineyard area down to roughly 7.0 million hectares. Among spirits houses, Pernod Ricard’s FY2025 organic sales fell 3.0%, with China down 21% and India up 6%, while Diageo’s FY2026 organic net sales fell 2.0%. Global brand houses feel the same regional rotation.' },
      { label: 'Vietnam example', text: 'Vietnam sits on the import side upstream and for premium categories. It grows essentially no malting barley or hops, imports barley and malts it locally, and imports wine and premium spirits, while Sabeco exports beer to about 30 countries. The full Vietnam trade picture is the subject of Lesson 1.4.' },
      { label: 'Why it matters', text: 'Trade patterns show where a company is exposed: spirits to tariffs and export markets, wine to climate and trade flows, and beer to commodity inputs and local regulation.' },
    ],
    visualKind: 'beer-m1-13-5-trade-flows', visualHeading: 'Three trade models and four forces', visualIntro: 'Read each row left to right to see what crosses borders, then scan the four forces below.',
    imageAlt: 'Trade flow rows for beer, wine and spirits with four market dynamics',
    keyTerms: [{ term: 'Harmonized System', definition: 'The international code system for classifying traded goods, such as HS 2203 beer.' }, { term: 'Value density', definition: 'Value per unit of weight or volume, which decides whether long-distance shipping pays.' }, { term: 'Organic growth', definition: 'Sales growth excluding currency effects and acquisitions or disposals.' }, { term: 'Export value', definition: 'The money earned by goods sold abroad in a period.' }],
    recap: ['Spirits and wine trade as finished goods; beer trades as inputs and brands.', 'World wine exports were about €33.8 billion in 2025, down 6.7%.', 'Premiumisation, moderation, climate and regional shift reshape the market.', 'Pernod Ricard saw China down 21% and India up 6% in FY2025.'],
    chapterRecap: 'Follow value density to see what travels, then follow growth to see where it is going.',
    deepDiveTitle: 'Reading company results as market signals',
    body: <DeepDive paragraphs={['Company results are useful market signals when read carefully. Pernod Ricard reported FY2025 net sales of €10,959 million, down 3.0% organically, with China down 21% and India up 6%. Diageo reported FY2026 net sales of US$19,643 million, down 2.0% organically.', 'Those two companies report in different currencies and for different twelve-month windows, so they cannot be added or ranked against each other. They can, however, be used to show that the same forces, softer volumes and a regional shift toward India, affect leading brand houses.', 'Beer trade deserves a final note. A global beer brand is a promise of recipe and quality, delivered by local breweries, so its international footprint appears in licences, ownership and inputs more than in shipping containers.']} caveat="OIV trade and production figures were read via ESM Magazine; the primary OIV report was not fetched. Company figures come from results reproduced by a broker and a newswire. Beer trade volumes by country were not verified, and Vietnam import and export volumes were not pulled from UN Comtrade." />,
    sources: cite('s9', 's10', 's17', 's18', 's25', 's11'),
  }),
];

const quizItems = quiz('beer-13', [
  { c: '1', o: 'Rank evidence reliability', q: 'Which type of source does this module treat as the most comparable for global alcohol data?', a: 'Official and institutional sources such as WHO and OIV', w: ['Vendor press releases', 'Marketing-agency compilations', 'Company advertisements'], e: 'Official bodies use defined methods, so their series are the most comparable. Trackers and vendor estimates need labelling.' },
  { c: '1', o: 'Explain an omitted headline figure', q: 'Why does the module not quote a single global beer market value?', a: 'Vendor estimates diverge widely and none is primary-verified', w: ['Beer value is a state secret', 'WHO prohibits publishing it', 'Global beer value equals global wine value'], e: 'Commercial estimates for 2024 range roughly from US$748 billion to US$800 billion, so the figure is left out rather than guessed.' },
  { c: '2', o: 'Read the WHO trend', q: 'According to WHO, what happened to global alcohol consumption per adult between 2010 and 2019?', a: 'It declined from 5.7 to 5.5 litres of pure alcohol', w: ['It rose from 5.5 to 5.7 litres', 'It stayed at 6.2 litres', 'It doubled'], e: 'WHO’s official series shows a slight decline, which is a structural headwind for volume.' },
  { c: '2', o: 'Interpret a forecast correctly', q: 'Why is IWSR’s US$34 billion by 2034 figure easy to misread?', a: 'It is value growth across key markets, not the size of the whole market', w: ['It is the total global market size', 'It forecasts a decline in value', 'It covers only wine'], e: 'The figure is cumulative value growth in key markets over ten years, led by India, not a market size.' },
  { c: '3', o: 'Convert units', q: 'How many hectolitres are in one kilolitre?', a: '10', w: ['1', '100', '1,000'], e: 'A kilolitre is 1,000 litres and a hectolitre is 100 litres, so one kilolitre equals ten hectolitres.' },
  { c: '3', o: 'Characterise spirits correctly', q: 'Which statement about spirits is supported by the research?', a: 'Spirits are smaller by volume but high in value per litre, and no global spirits size was verified', w: ['Spirits are the largest category by volume', 'The global spirits market is worth US$800 billion', 'Spirits consumption has risen every year since 2010'], e: 'The research notes spirits’ high value density and explicitly lists global spirits market size as unverified.' },
  { c: '4', o: 'Identify the largest beer market', q: 'Which country was the largest beer consumer by total volume for the 22nd consecutive year in 2024?', a: 'China', w: ['India', 'Czech Republic', 'Russia'], e: 'China led by total volume, although its 2024 volume fell 3.7%, a mature-market plateau.' },
  { c: '4', o: 'Explain ranking differences', q: 'Why can the Czech Republic lead beer consumption per person without leading in total volume?', a: 'Per-person rankings divide by population, so a small high-intensity market can top them', w: ['The Czech Republic brews more beer than China', 'WHO excludes China from its data', 'Per-person rankings count only wine'], e: 'Total volume rewards population while per-person intake rewards habit, so the two rankings differ.' },
  { c: '5', o: 'Read world wine trade', q: 'What did OIV report for world wine export value in 2025?', a: 'About €33.8 billion, down 6.7%', w: ['About €338 billion, up 6.7%', 'About US$33.8 billion, up 6.7%', 'About €3.38 billion, down 6.7%'], e: 'OIV reported about 94.8 million hectolitres exported, worth about €33.8 billion, with value down 6.7%.' },
  { c: '5', o: 'Read a regional signal', q: 'What regional pattern did Pernod Ricard report for FY2025?', a: 'China down 21% while India grew 6%', w: ['China up 21% while India fell 6%', 'Both China and India flat', 'Both China and India up strongly'], e: 'Pernod Ricard’s FY2025 results show China down 21% and India up 6%, an example of growth rotating toward developing markets.' },
]);

export const LESSON_1_3: BeerLessonBundle = {
  deck,
  quiz: quizItems,
  takeaways: {
    learned: 'You can read a global market number by tier, year and unit, describe the direction of volume, value and intake, compare beer, wine and spirits, rank major markets three ways and explain what crosses borders.',
    keyTakeaways: ['Always label a number with its tier, year, unit and geography.', 'Volume is flat to down while value edges up, and intake per adult has slipped.', 'Beer is volume-led, wine is supply-constrained and spirits are value-led.', 'Growth is rotating toward India, Russia, Thailand and other developing markets.'],
    businessImplications: 'Global groups defend value rather than volume, invest where growth is moving, and manage exposure to commodity inputs, climate and trade.',
    remember: 'Name the source type before the number, and say what the number cannot tell you.',
    nextLesson: 'Vietnam Market Overview',
  },
  visuals: {
    'beer-m1-13-1-evidence-tiers': EvidenceTiersVisual,
    'beer-m1-13-2-growth-signals': GrowthVisual,
    'beer-m1-13-3-pillars': PillarsVisual,
    'beer-m1-13-4-markets': MarketsVisual,
    'beer-m1-13-5-trade-flows': TradeFlowsVisual,
  },
};
