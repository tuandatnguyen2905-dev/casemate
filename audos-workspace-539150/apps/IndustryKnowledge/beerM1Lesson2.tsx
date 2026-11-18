import { Arrow, Box, DeepDive, Frame, INK, MUTED, NAVY, RED, SvgWrap, Timeline, Txt, chapter, cite, quiz } from './beerM1Core';
import type { BeerLessonBundle } from './beerM1Core';

const LESSON = '1.2 Industry History & Development';

function CraftToIndustryVisual() {
  return (
    <Frame title="From local craft to global industry" subtitle="Three stages made the same drink more repeatable, shippable and brandable." takeaway="Science made drinks repeatable and scale made them brands. Today’s contest is about consistency, reach and brand, not about inventing the drink." note="Stage contents follow the Module 01 research record. Exact origins and dates of individual drinks were not researched and are not claimed.">
      <SvgWrap w={720} h={492} label="Three-stage ladder from local craft to science to scale and brands">
        <Box x={0} y={250} w={232} h={130} title="1. Local craft" body={['Fermented drinks date back millennia', 'Local inputs, variable batches']} size={12.5} />
        <Box x={244} y={150} w={232} h={230} tone="navy" title="2. Science and technology" body={['1830: continuous still', '1860s: pasteurisation', '1883: pure lager yeast', 'Refrigeration for year-round brewing', 'Unlocked: control and consistency']} size={12.5} />
        <Box x={488} y={50} w={232} h={330} tone="red" title="3. Scale and brands" body={['Late 20th and 21st centuries', 'Hundreds of local brands rolled into a few global groups', 'Distribution and procurement scale become the moat', 'Craft brewing grows as a counter-trend', 'Unlocked: global brands and reach']} size={12.5} />
        <Arrow x1={116} y1={244} x2={116} y2={206} dashed />
        <Arrow x1={360} y1={144} x2={360} y2={106} red dashed />
        <Txt x={0} y={20} text="Each step up made the drink more repeatable and more shippable." size={13} weight={700} fill={NAVY} />
        <Box x={0} y={400} w={720} h={80} tone="tint" center title="Vietnam’s path through the same stages" body="rượu craft, then French-colonial breweries, state ownership, equitisation and listing, and foreign investment" size={12.5} />
      </SvgWrap>
    </Frame>
  );
}

function TechTimelineVisual() {
  return (
    <Frame title="Technology milestones that built the industry" subtitle="Each discovery removed a limit on quality, volume or shelf life." takeaway="Technology shifted the contest from “can you make it?” to “can you make it identically, cheaply and everywhere?”" note="Dates follow the Module 01 research record; primary sources for each milestone were not re-fetched. The refrigeration milestone is undated in the record. Intermalt figures: Food & Drink Digital, 2020.">
      <Timeline label="Timeline of technology milestones from 1830 to 2020" events={[
        { when: '1830', title: 'Continuous column still', detail: 'Aeneas Coffey’s still distils spirit in one uninterrupted process, making consistent, scalable spirit production possible.' },
        { when: '1860s', title: 'Fermentation science and pasteurisation', detail: 'Louis Pasteur’s work on fermentation and pasteurisation stabilised beer.' },
        { when: '1883', title: 'Pure lager yeast', detail: 'Emil Christian Hansen at Carlsberg isolates pure lager yeast, standardising lager, today’s dominant beer style.', tone: 'red' },
        { when: 'Date not stated', title: 'Refrigeration', detail: 'Cold storage enables year-round brewing.' },
        { when: '2020', title: 'Local malting in Vietnam', detail: 'The US$70 million Intermalt plant in Cai Mep, with 110,000 tonnes of capacity, malts imported Australian barley for Heineken Vietnam, Carlsberg and local brewers.', tone: 'outline' },
      ]} />
    </Frame>
  );
}

function Stack({ y, parts }: { y: number; parts: Array<{ label: string; value: number; fill: string; text: string }> }) {
  let x = 0;
  return (
    <g>
      {parts.map((part) => {
        const width = (part.value / 100) * 720;
        const node = (
          <g key={part.label}>
            <rect x={x} y={y} width={width} height={54} fill={part.fill} stroke="#ffffff" strokeWidth={2} />
            <Txt x={x + width / 2} y={y + 33} text={part.text} size={16} weight={800} fill="#ffffff" anchor="middle" />
            <Txt x={x + width / 2} y={y + 76} text={part.label} size={12} fill={INK} anchor="middle" max={Math.max(8, Math.floor(width / 6.6))} lh={1.25} />
          </g>
        );
        x += width;
        return node;
      })}
    </g>
  );
}

function ConsolidationVisual() {
  return (
    <Frame title="Scale and niche: how consolidation shows up" subtitle="Global brewing is concentrated at the top while craft occupies a smaller niche." takeaway="Beer rewards scale in procurement and distribution, so a few groups dominate, and craft grows in the gaps rather than replacing them." note="Top-40 output and the top-4 share are BarthHaas 2022 data via trade press. The “other three” and “other 36” segments are derived by subtraction. US shares are 2025 (Choices Magazine). Different markets and years, so compare shape, not numbers.">
      <SvgWrap w={720} h={372} label="Stacked bars showing top-40 brewer concentration and the US craft share">
        <Txt x={0} y={16} text="Top-40 brewing groups: share of ~1.67 billion hl output, 2022 (top four groups ≈ 60%)" size={13.5} weight={800} fill={NAVY} />
        <Stack y={30} parts={[
          { label: 'AB InBev, ~518 million hl', value: 31, fill: RED, text: '~31%' },
          { label: 'Heineken, China Resources Snow and Carlsberg combined (derived)', value: 29, fill: NAVY, text: '~29%' },
          { label: 'The other 36 groups (derived)', value: 40, fill: '#94a3b8', text: '~40%' },
        ]} />
        <Txt x={0} y={196} text="United States beer sales structure, 2025" size={13.5} weight={800} fill={NAVY} />
        <Stack y={210} parts={[
          { label: 'Craft', value: 12, fill: RED, text: '12%' },
          { label: 'Large domestic non-craft', value: 68, fill: NAVY, text: '68%' },
          { label: 'Imports', value: 20, fill: '#94a3b8', text: '20%' },
        ]} />
        <Txt x={0} y={340} text="Read both bars the same way: a large scale tier plus a smaller niche tier." size={12.5} fill={MUTED} />
      </SvgWrap>
    </Frame>
  );
}

function VietnamTimelineVisual() {
  return (
    <Frame title="Vietnam’s beer industry: ownership timeline" subtitle="From colonial breweries to a mix of foreign-controlled and state-linked players." takeaway="Ownership history explains today’s market: a ThaiBev-controlled Sabeco, Heineken’s joint venture and state-linked Habeco behave differently." note="Exact dates of equitisation and HOSE listing, and the dates Heineken and Carlsberg entered, were not verified in the research and are not stated. Founding years of the colonial breweries vary by source and are omitted.">
      <Timeline label="Timeline of Vietnam’s beer industry from the colonial era to 2025" events={[
        { when: 'French colonial era', title: 'Brewing arrives', detail: 'The Hommel brewery in Hanoi becomes the root of Habeco; the Saigon brewery (BGI) becomes the root of Sabeco.' },
        { when: 'After reunification', title: 'State-owned giants', detail: 'Both heritage brewers run as large state-owned enterprises.' },
        { when: 'Mid-2010s', title: 'Equitisation and listing', detail: 'Reform moves the heritage brands toward joint-stock ownership and listing on the Ho Chi Minh Stock Exchange (HOSE).', tone: 'outline' },
        { when: 'December 2017', title: 'ThaiBev buys Sabeco control', detail: 'ThaiBev acquires 53.59% of Sabeco from the Ministry of Industry and Trade for US$4.78 billion, through the Viet Beverage vehicle.', tone: 'red' },
        { when: 'Alongside', title: 'International brewers build local production', detail: 'Heineken, through a joint venture, and Carlsberg build major local production, creating today’s mix of foreign-controlled and state-linked players.' },
        { when: 'January 2020', title: 'Drink-driving rule enforced', detail: 'Decree 100/2019 enforcement begins, starting a structural shift of volume from on-trade toward home.' },
        { when: 'June 2025', title: 'Excise path set', detail: 'The National Assembly approves Law No. 66/2025/QH15, taking beer SCT from 65% toward 90% by 2031, as reported.' },
      ]} />
    </Frame>
  );
}

const deck = [
  chapter({
    title: 'From Ancient Fermentation to Modern Alcoholic Beverages', chapterTitle: LESSON, readingTime: '5',
    objective: 'Explain how alcoholic drinks moved from natural fermentation and local craft to a commercial industry with standardised products.',
    mateIntro: 'Long before brand logos or breweries with tanks the size of houses, people noticed that a sweet liquid left alone turned into something that changed the mood at the table. That happy accident is the root of this entire industry.',
    keyInsight: 'Fermentation is among humanity’s oldest food technologies, and for millennia alcoholic drinks were local, seasonal and variable. The modern industry began when science and scale made the same drink repeatable, safe and shippable.',
    narrative: [
      { label: 'What it is', text: 'Fermented beverages date back millennia. Early drinks were local, made from whatever grain, grape or fruit a community grew, and they varied from batch to batch. The industry’s history is the story of turning that craft into a repeatable commercial product.' },
      { label: 'How it works', text: 'Three shifts mark the move. Fermentation became something producers could understand and control. Distillation added a second route to alcohol by concentrating strength. Then 19th- and 20th-century science and scale turned local craft into standardised brands that could be shipped and sold at volume.' },
      { label: 'Global example', text: 'The industry’s modern family tree still follows those roots. Beer and wine remain fermentation products, spirits remain distillation products, and the WCO trade codes still list traditional drinks such as cider, perry, mead and sake together as other fermented beverages (HS 2206).' },
      { label: 'Vietnam example', text: 'Vietnam’s older tradition is rượu, a spirit distilled from locally grown rice. Modern beer arrived later with French-colonial breweries, covered in the next chapters. Rượu is still classified as distilled spirits (HS 2208) or as a fermented drink (HS 2206), depending on process, so the older craft sits inside today’s trade system.' },
      { label: 'Why it matters', text: 'The craft-to-industry shift explains why today’s winners compete on consistency, brand and distribution rather than on inventing a new kind of drink.' },
    ],
    visualKind: 'beer-m1-12-1-craft-to-industry', visualHeading: 'Three stages from craft to industry', visualIntro: 'Read the staircase from left to right to see what each stage added.',
    imageAlt: 'Three-stage ladder from local craft to science and technology to scale and brands',
    keyTerms: [{ term: 'Fermentation', definition: 'Yeast converting sugar into alcohol and carbon dioxide.' }, { term: 'Distillation', definition: 'Concentrating alcohol by heating a fermented liquid and capturing the vapour.' }, { term: 'Craft production', definition: 'Small-batch, local production that varies from batch to batch.' }, { term: 'Standardisation', definition: 'Making every unit of a product match so that a brand tastes the same everywhere.' }],
    recap: ['Fermented drinks date back millennia and began as local craft.', 'Science and scale in the 19th and 20th centuries made drinks repeatable.', 'The modern trade codes still reflect the old fermentation and distillation roots.', 'In Vietnam, rượu is the older craft inside a modern trade system.'],
    chapterRecap: 'The industry is the story of turning local craft into a repeatable, shippable product.',
    deepDiveTitle: 'Why craft and industry are not opposites',
    body: <DeepDive paragraphs={['Craft did not disappear when industry arrived. Local, variable drinks still exist, and some are still sold under their own trade codes. What changed is that a second kind of producer appeared, one that could make a million identical bottles and move them across a country.', 'That second producer needed knowledge, which is the next chapter’s subject, and capital, which explains the consolidation in the chapter after. Together these three ideas tell the whole history in miniature.', 'Vietnam makes a good test case. A village still and a modern brewery coexist in the same country, and the same trade system must classify both.']} caveat="The research record states only that fermented beverages date back millennia. Specific origins, dates and regions for individual drinks were not researched, so none are claimed here." />,
    sources: cite('s9', 'rec'),
  }),
  chapter({
    title: 'How Brewing, Distillation, and Technology Evolved', chapterTitle: LESSON, readingTime: '5',
    objective: 'Link four technology milestones, the continuous still, pasteurisation, pure lager yeast and refrigeration, to what each made possible for brewers and distillers.',
    mateIntro: 'A brewer in the early 1800s could lose a whole batch to spoilage and never know why. Within a few decades three discoveries and one machine changed that, and they shaped the lager in your glass today.',
    keyInsight: 'Four technologies turned drink-making from art into engineering: the continuous still (1830) made spirit consistent, pasteurisation (1860s) stabilised beer, pure lager yeast (1883) standardised the world’s dominant beer style, and refrigeration enabled year-round brewing.',
    narrative: [
      { label: 'What it is', text: 'Technological evolution here means the tools and discoveries that let producers control quality, volume and shelf life, from yeast science to column stills to cold storage.' },
      { label: 'How it works', text: 'Aeneas Coffey’s continuous column still (1830) distilled spirit in one uninterrupted process instead of batch by batch. Louis Pasteur’s work on fermentation and pasteurisation in the 1860s stabilised beer. In 1883 Emil Christian Hansen at Carlsberg isolated pure lager yeast, standardising lager. Refrigeration then enabled year-round brewing.' },
      { label: 'Global example', text: 'Carlsberg’s yeast work shows science becoming a competitive asset. One isolated strain let a brewery make the same lager again and again, and consistency is still what a global beer brand sells. Proprietary yeast strains and recipes are still counted among the hard-to-copy advantages of large brewers.' },
      { label: 'Vietnam example', text: 'Vietnam’s brewers inherit these technologies at industrial scale. Heineken’s Vung Tau brewery produces about 1.1 billion litres a year, the largest in Southeast Asia, and plants run to ISO 22000, HACCP and Vietnam’s QCVN technical regulations. In 2020 the US$70 million Intermalt plant in Cai Mep brought malting onshore with 110,000 tonnes of capacity.' },
      { label: 'Why it matters', text: 'Technology moved the contest from whether you can make a drink to whether you can make it identically, cheaply and everywhere. That is exactly where scale and brand pay off.' },
    ],
    visualKind: 'beer-m1-12-2-tech-timeline', visualHeading: 'Five milestones, one logic', visualIntro: 'Follow the timeline and ask of each step: what limit did it remove?',
    imageAlt: 'Timeline of technology milestones from the continuous still to local malting in Vietnam',
    keyTerms: [{ term: 'Pasteurisation', definition: 'Heat treatment that stabilises a drink so it keeps longer.' }, { term: 'Lager yeast', definition: 'The yeast behind lager, today’s dominant beer style.' }, { term: 'Column still', definition: 'A continuous still that distils spirit without stopping between batches.' }, { term: 'Malting', definition: 'Steeping, germinating and kilning barley into malt, the main brewing ingredient.' }],
    recap: ['The 1830 continuous still made consistent spirit possible at scale.', 'Pasteurisation (1860s) stabilised beer.', 'Pure lager yeast (1883) standardised lager.', 'Technology made consistency, not invention, the competitive prize.'],
    chapterRecap: 'Each milestone removed a limit on quality, volume or shelf life.',
    deepDiveTitle: 'From discovery to industrial advantage',
    body: <DeepDive paragraphs={['Discoveries alone do not make an industry. The advantage came when firms embedded them in process: a standard yeast strain, a stable product, a still that never stops. That is how knowledge becomes cost, quality and reach.', 'Quality control now runs as a continuing discipline. Plants work to food-safety systems such as ISO 22000 and HACCP, with batch testing of water, raw materials and finished product, because brewing consistency across millions of identical units is the core craft.', 'The same logic reaches Vietnam through capital. Large modern breweries and a local malting plant show technology arriving as capacity and supply-chain investment rather than as invention.']} caveat="Milestone dates follow the Module 01 research record; the primary source for each was not re-fetched, and the refrigeration milestone is undated in the record. Vung Tau output is a vendor figure (Astute Analytica, 2024). ISO 22000, HACCP and QCVN references come from the Module 02 research record." />,
    sources: cite('rec', 's6', 's11'),
  }),
  chapter({
    title: 'The Rise of Global Alcoholic Beverage Companies', chapterTitle: LESSON, readingTime: '5',
    objective: 'Explain why brewing and spirits consolidated into a few global groups, and why craft emerged as a counter-trend.',
    mateIntro: 'Walk into a bar almost anywhere in the world and a handful of the same parent companies stand behind dozens of local-looking labels. How did that happen?',
    keyInsight: 'Distribution reach and procurement scale are the core moats in beer, so mega-mergers rolled hundreds of local brands into a few global groups, while craft brewing grew as a counter-trend.',
    narrative: [
      { label: 'What it is', text: 'From the late 20th century the industry consolidated. Global brewers rolled up hundreds of local brands, and the modern giants AB InBev, Heineken, Carlsberg, Asahi and Molson Coors emerged through mega-mergers. In spirits, Diageo and Pernod Ricard became the two global brand houses.' },
      { label: 'How it works', text: 'Scale pays in beer because it lowers procurement cost and widens distribution reach, two assets that are hard to copy, and acquisitions buy both at once. Because beer is heavy and cheap to make, a global brewer stays a federation of local breweries: the group owns the portfolio and the buying power, while brewing happens in each market. Craft brewers grew in the gaps, since small scale needs less capital, but they struggle to replicate national distribution.' },
      { label: 'Global example', text: 'The BarthHaas ranking of 2022 output shows the result. The world’s 40 largest brewing groups produced about 1.67 billion hectolitres, up 4.3%, and the top four, AB InBev, Heineken, China Resources Snow Breweries and Carlsberg, accounted for about 60% of it, with AB InBev alone at about 518 million hectolitres, roughly 31%. In the United States, craft held about 12% of beer sales in 2025 against 68% for large domestic non-craft and 20% for imports.' },
      { label: 'Vietnam example', text: 'Vietnam is the local face of global consolidation. Its market now mixes foreign-controlled scale operators, Heineken’s joint venture, ThaiBev’s Sabeco and Carlsberg, with state-linked Habeco. The next chapter traces how that ownership map was built.' },
      { label: 'Why it matters', text: 'Global groups win on scale and distribution rather than on inventing new drinks. That explains why the same few names appear near the top of almost every market.' },
    ],
    visualKind: 'beer-m1-12-3-consolidation', visualHeading: 'Scale at the top, niche at the edge', visualIntro: 'Compare the concentration of global brewing with the structure of one large market that has a craft niche.',
    imageAlt: 'Stacked bars of top-40 brewer concentration and the United States craft share',
    keyTerms: [{ term: 'Consolidation', definition: 'Mergers and acquisitions that leave fewer, larger companies in an industry.' }, { term: 'Economies of scale', definition: 'Lower unit cost as procurement and production volumes grow.' }, { term: 'Brand house', definition: 'A company that owns and builds a portfolio of brands, such as a spirits group.' }, { term: 'Craft brewing', definition: 'Small-scale, independent brewing that competes on distinctiveness.' }],
    recap: ['Distribution and procurement scale drove consolidation in beer.', 'The top four groups produce about 60% of top-40 output (2022).', 'A global brewer is a federation of local breweries.', 'Craft grows as a niche beside scale players.'],
    chapterRecap: 'Scale pays in beer, so a few groups lead and craft fills the gaps.',
    deepDiveTitle: 'What mergers buy',
    body: <DeepDive paragraphs={['A merger buys two assets that take decades to build: a distribution network and a procurement relationship. Brands matter too, but the network and the buying power are the hard-to-copy parts, and they are why the global order is stable.', 'Spirits followed a different logic. Because spirits are high in value for their volume and mature for years, brand houses such as Diageo and Pernod Ricard compete on brand prestige and aged stock rather than on local plants.', 'Craft is a counter-trend, not a reversal. It shows that small scale can win on distinctiveness, but the United States data show that most volume still sits with scale players.']} caveat="The BarthHaas figures come from trade press; the primary PDF could not be read. Exact deal values for global mega-mergers, such as the AB InBev and SABMiller combination, were not verified and are described qualitatively only. The top-4 and craft figures describe different years and markets." />,
    sources: cite('s20', 's12', 's5', 'rec'),
  }),
  chapter({
    title: 'The Development of Vietnam’s Alcoholic Beverage Industry', chapterTitle: LESSON, readingTime: '6',
    objective: 'Trace Vietnam’s brewing industry from French-colonial breweries through state ownership, equitisation and foreign investment to today’s ownership map.',
    mateIntro: 'Two of Vietnam’s best-known beer names began as colonial breweries, were run by the State for decades and now sit under very different owners. Their path explains the market you see today.',
    keyInsight: 'Vietnam’s beer industry moved from French-colonial breweries to state-owned giants, then through equitisation and listing to foreign control, capped by ThaiBev’s US$4.78 billion purchase of 53.59% of Sabeco in December 2017.',
    narrative: [
      { label: 'What it is', text: 'Brewing was introduced in the French colonial era. The Hommel brewery in Hanoi became the root of Habeco, and the Saigon brewery, BGI, became the root of Sabeco. After reunification both ran as large state-owned enterprises.' },
      { label: 'How it works', text: 'Reform then opened ownership. Equitisation and listing on the Ho Chi Minh Stock Exchange in the mid-2010s began moving heritage brands toward investors with capital and brand expertise. International brewers Heineken and Carlsberg entered and built major local production, so the market became a mix of foreign-controlled scale players and state-linked heritage brands.' },
      { label: 'Global example', text: 'The pattern mirrors global consolidation: ThaiBev was buying distribution reach and scale, just as global groups do in other markets. Heineken took a different route into Vietnam, operating through a joint venture, Vietnam Brewery, rather than buying a local champion outright.' },
      { label: 'Vietnam example', text: 'In December 2017 Thailand’s ThaiBev acquired 53.59% of Sabeco from the Ministry of Industry and Trade for US$4.78 billion, through a vehicle called Viet Beverage, a structure reported as working within the 49% foreign ownership cap that applied then. Since then the industry has faced new shocks: drink-driving enforcement from January 2020 and an excise path to 90% agreed in June 2025.' },
      { label: 'Why it matters', text: 'Ownership explains behaviour. A ThaiBev-controlled Sabeco, Heineken’s joint venture and state-linked Habeco have different capital access, cultures and priorities, which is why they compete differently today.' },
    ],
    visualKind: 'beer-m1-12-4-vn-timeline', visualHeading: 'Seven steps from colonial breweries to today', visualIntro: 'Follow the ownership story and note where capital and regulation changed the direction.',
    imageAlt: 'Timeline of Vietnam beer industry ownership from the colonial era to 2025',
    keyTerms: [{ term: 'Equitisation', definition: 'Converting a state-owned enterprise into a joint-stock company with private shareholders.' }, { term: 'HOSE', definition: 'The Ho Chi Minh Stock Exchange, where heritage brewers were listed.' }, { term: 'State-owned enterprise', definition: 'A company owned and controlled by the government.' }, { term: 'Joint venture', definition: 'A business owned together by two or more partners, such as Heineken’s Vietnam Brewery.' }],
    recap: ['Habeco and Sabeco trace back to French-colonial breweries.', 'Both ran as state-owned enterprises before reform.', 'ThaiBev bought 53.59% of Sabeco for US$4.78 billion in December 2017.', 'Ownership shapes how each player competes.'],
    chapterRecap: 'Vietnam’s market is a mix of foreign-controlled and state-linked players because of how reform and investment unfolded.',
    deepDiveTitle: 'Ownership as the key to the market map',
    body: <DeepDive paragraphs={['Reading the market map without the ownership story is like reading a map without its borders. Sabeco and Habeco share colonial roots but sit in different hands, with different access to capital and different strategic freedom.', 'The 2017 transaction is the defining event: the largest domestic brewer moved from state control to a foreign-led structure. The use of a dedicated vehicle shows how investors worked within the foreign-ownership rules of the time, as reported.', 'Later chapters add the regulatory events. They matter here because they arrived after ownership had already changed, so the firms met them with very different balance sheets.']} caveat="Exact dates of Sabeco and Habeco equitisation and HOSE listing were not verified against primary filings, and the dates Heineken and Carlsberg entered are not stated in the research, so none are given. Founding years of the colonial breweries vary by source and are omitted. The 49% cap detail is as reported in trade press." />,
    sources: cite('s5', 's4', 's3', 's6', 'rec'),
  }),
];

const quizItems = quiz('beer-12', [
  { c: '1', o: 'Describe the craft-to-industry shift', q: 'Which statement best describes the early history of alcoholic drinks?', a: 'Fermented drinks date back millennia and were local and variable before science and scale standardised them', w: ['They were invented in the 19th century by brewing companies', 'They have always been made in standardised factories', 'They began with distillation, and fermentation was added later'], e: 'The research record says fermented beverages date back millennia; standardisation came with 19th- and 20th-century science and scale.' },
  { c: '1', o: 'Read trade codes as history', q: 'Which drinks does HS 2206 group together as other fermented beverages?', a: 'Cider, perry, mead and sake', w: ['Beer made from malt', 'Spirits and liqueurs', 'Undenatured ethyl alcohol'], e: 'HS 2206 covers fermented drinks not listed elsewhere, such as cider, perry, mead and sake.' },
  { c: '2', o: 'Link technology to capability', q: 'What did Aeneas Coffey’s continuous still make possible in 1830?', a: 'Consistent, scalable spirit distillation', w: ['Year-round brewing', 'Heat stabilisation of beer', 'Standardised lager yeast'], e: 'The continuous column still distilled spirit in one uninterrupted process, which made consistent production at scale possible.' },
  { c: '2', o: 'Identify the lager milestone', q: 'Who isolated pure lager yeast at Carlsberg in 1883?', a: 'Emil Christian Hansen', w: ['Louis Pasteur', 'Aeneas Coffey', 'Gerard Heineken'], e: 'Hansen’s pure lager yeast standardised lager, which is today’s dominant beer style.' },
  { c: '2', o: 'Explain pasteurisation’s role', q: 'Why did Pasteur’s work in the 1860s matter to brewers?', a: 'It helped stabilise beer', w: ['It created the lager style', 'It introduced the column still', 'It made refrigeration possible'], e: 'Pasteur’s work on fermentation and pasteurisation stabilised beer, which made it more reliable to brew and ship.' },
  { c: '3', o: 'Quantify concentration', q: 'About what share of the top-40 brewers’ 2022 output did the top four groups account for?', a: 'About 60%', w: ['About 20%', 'About 35%', 'About 85%'], e: 'BarthHaas data reported by trade press put the top four, AB InBev, Heineken, China Resources Snow Breweries and Carlsberg, at about 60%.' },
  { c: '3', o: 'Explain why scale pays in beer', q: 'Which pair of assets makes scale especially valuable in beer?', a: 'Procurement scale and distribution reach', w: ['Exclusive access to barley farms', 'Higher alcohol content', 'Exemption from excise tax'], e: 'Procurement scale lowers cost and distribution reach delivers availability, and both are hard to copy.' },
  { c: '4', o: 'Trace Vietnam’s brewery roots', q: 'Which colonial-era brewery became the root of Habeco?', a: 'The Hommel brewery in Hanoi', w: ['The Saigon brewery (BGI)', 'The Vung Tau brewery', 'The Intermalt plant'], e: 'The Hommel brewery in Hanoi is the root of Habeco; the Saigon brewery BGI is the root of Sabeco.' },
  { c: '4', o: 'Recall the defining ownership event', q: 'What did ThaiBev acquire in December 2017?', a: '53.59% of Sabeco for US$4.78 billion', w: ['49% of Habeco for US$478 million', '100% of Heineken Vietnam', 'A majority of Carlsberg Vietnam'], e: 'ThaiBev acquired a 53.59% controlling stake in Sabeco from the Ministry of Industry and Trade for US$4.78 billion.' },
  { c: '4', o: 'Connect the deal to ownership rules', q: 'How was the 2017 Sabeco deal structured, as reported?', a: 'Through the Viet Beverage vehicle, given the then 49% foreign ownership cap', w: ['As an unlisted private sale with no ownership limits', 'As 49 separate small purchases', 'As a donation to the State'], e: 'Reports describe a dedicated vehicle used to work within the foreign-ownership cap that applied at the time.' },
]);

export const LESSON_1_2: BeerLessonBundle = {
  deck,
  quiz: quizItems,
  takeaways: {
    learned: 'You can trace alcoholic drinks from ancient fermentation to a commercial industry, link key technologies to what they unlocked, explain consolidation into global groups and follow Vietnam’s ownership story.',
    keyTakeaways: ['Fermented drinks are ancient; science and scale made them repeatable.', 'Four technologies made consistency the competitive prize.', 'Scale in procurement and distribution explains the dominance of a few global groups.', 'Vietnam’s ownership map comes from colonial roots, state control, reform and foreign investment.'],
    businessImplications: 'Ownership history explains today’s organisation: ThaiBev-controlled Sabeco, Heineken’s joint venture and state-linked Habeco each have distinct cultures and access to capital.',
    remember: 'Technology created consistency, scale created groups, and reform created Vietnam’s ownership map.',
    nextLesson: 'Global Market Overview',
  },
  visuals: {
    'beer-m1-12-1-craft-to-industry': CraftToIndustryVisual,
    'beer-m1-12-2-tech-timeline': TechTimelineVisual,
    'beer-m1-12-3-consolidation': ConsolidationVisual,
    'beer-m1-12-4-vn-timeline': VietnamTimelineVisual,
  },
};
