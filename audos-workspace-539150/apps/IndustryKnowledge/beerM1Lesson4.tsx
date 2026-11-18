import { Arrow, Box, DeepDive, Donut, Frame, HBars, MUTED, NAVY, RED, SvgWrap, Txt, chapter, cite, quiz } from './beerM1Core';
import type { BeerLessonBundle } from './beerM1Core';

const LESSON = '1.4 Vietnam Market Overview';

function VietnamGlanceVisual() {
  return (
    <Frame title="Vietnam beer market: scale with an evidence label" subtitle="The available market anchors are useful, but they all come from one commercial estimate." takeaway="Vietnam is a large beer market, but treat the 2024 value, rank and forecast as a vendor scenario rather than official statistics." note="All four market anchors are Astute Analytica commercial estimates reported in 2025. No General Statistics Office series was verified in the research.">
      <SvgWrap w={720} h={420} label="Vietnam beer market dashboard showing 2024 value, consumption, rank and commercial forecast">
        <Box x={0} y={0} w={232} h={150} tone="navy" center title="US$7.89B" body={['Vietnam beer market value', '2024', 'Commercial estimate']} size={12.5} titleSize={22} />
        <Box x={244} y={0} w={232} h={150} tone="red" center title=">3.8M kL" body={['Annual beer consumption', '2024', 'Commercial estimate']} size={12.5} titleSize={22} />
        <Box x={488} y={0} w={232} h={150} center title="~9th" body={['Global rank by beer volume', '2024', '~2.2% of world volume']} size={12.5} titleSize={22} />
        <Arrow x1={116} y1={174} x2={116} y2={214} dashed />
        <Arrow x1={360} y1={174} x2={360} y2={214} dashed />
        <Arrow x1={604} y1={174} x2={604} y2={214} dashed />
        <Box x={0} y={224} w={720} h={116} tone="tint" title="Vendor forecast, not an official baseline" body={['US$14.85 billion market value in 2033', 'Implied CAGR: about 7.27% from 2024', 'Published before the full 2027-2031 excise escalation, so use it as an optimistic scenario']} size={13} />
        <Box x={0} y={356} w={720} h={58} tone="outline" center title="Evidence rule: say the year, unit, geography and source tier before the number." size={12.5} titleSize={13} />
      </SvgWrap>
    </Frame>
  );
}

function VietnamConsumptionVisual() {
  return (
    <Frame title="Vietnam is a beer-led alcohol market" subtitle="A single vendor estimate shows the mix; wine and spirits remain unquantified in the verified research." takeaway="Beer sets the local volume story, while wine and spirits require qualitative treatment until comparable segment data exist." note="The 91% share and 8.3 litres per adult are Astute Analytica estimates for 2024, not official statistics. The 9% remainder is derived and combines wine, spirits and other drinks.">
      <Donut label="Vendor-estimated share of alcohol consumed in Vietnam in 2024" centerTop="91%" centerBottom="beer share" parts={[
        { label: 'Beer', value: 91, color: NAVY, note: 'Vendor-estimated share of alcohol consumed' },
        { label: 'Wine, spirits and other', value: 9, color: RED, note: 'Derived remainder; segment split not verified' },
      ]} />
      <SvgWrap w={720} h={190} label="Consumption context cards for beer, spirits and wine in Vietnam">
        <Box x={0} y={0} w={232} h={180} tone="navy" title="Beer" body={['Above 3.8 million kL consumed (2024 vendor estimate)', 'Social on-trade heritage; occasions shifting toward home after stricter drink-driving enforcement']} size={12} />
        <Box x={244} y={0} w={232} h={180} title="Spirits" body={['Domestic rượu plus imported whisky and cognac', 'No verified national segment volume or value in the research']} size={12} />
        <Box x={488} y={0} w={232} h={180} tone="tint" title="Wine" body={['Small and import-reliant', 'No verified national segment volume or value in the research']} size={12} />
      </SvgWrap>
    </Frame>
  );
}

function GeographyVisual() {
  return (
    <Frame title="A local production network with imported inputs" subtitle="Beer is brewed near drinkers, while barley and hops enter through a globally exposed upstream." takeaway="Vietnam localises brewing and distribution, not the whole supply chain: geography lowers delivery cost while imported inputs preserve global exposure." note="Capacity figures are Astute Analytica commercial estimates for 2024. Intermalt investment and capacity are from trade press in 2020. No province-by-province output series was verified.">
      <SvgWrap w={720} h={492} label="Vietnam beer production shown as northern, central and southern geographic bands connected to imported inputs">
        <Box x={0} y={0} w={720} h={74} tone="outline" title="Imported upstream" body="Barley and hops come from abroad; Intermalt at Cai Mep localises malting with US$70M investment and 110,000 tonnes of capacity (2020)." size={12.5} />
        <Arrow x1={360} y1={74} x2={360} y2={108} red />
        <Box x={0} y={116} w={220} h={220} title="North" body={['Habeco / Bia Hà Nội', '>800M litres annual output (2024 vendor estimate)', 'Heritage, state-linked producer', 'No verified northern market share']} size={12} />
        <Box x={250} y={116} w={220} h={220} tone="tint" title="Central" body={['Carlsberg / Huda', 'Research describes a strong central-region position', 'No verified plant-level output or regional share']} size={12} />
        <Box x={500} y={116} w={220} h={220} tone="navy" title="South and nationwide" body={['Heineken Vung Tau: ~1.1B L/year', 'Sabeco: 26 factories, >2.2B L capacity nationwide', 'Both are commercial estimates for 2024']} size={12} />
        <Arrow x1={110} y1={352} x2={110} y2={382} />
        <Arrow x1={360} y1={352} x2={360} y2={382} />
        <Arrow x1={610} y1={352} x2={610} y2={382} />
        <Box x={0} y={390} w={720} h={90} tone="red" center title="Fragmented outlets pull production close to demand" body="Sabeco reports reaching 200,000+ shops through 11 trading companies; local brewing avoids shipping heavy, low-value liquid over long distances." size={12.5} />
      </SvgWrap>
    </Frame>
  );
}

function PlayersVisual() {
  return (
    <Frame title="Four players, four ownership and route-to-market positions" subtitle="Capacity is only one dimension; ownership, brands and geographic reach explain how firms compete." takeaway="Vietnam is an oligopoly in beer, but the leading firms are not interchangeable: control, regional strength and distribution shape strategy." note="Capacity/output figures are 2024 vendor estimates and are not like-for-like: Sabeco is group capacity, Vung Tau is one brewery, and Habeco is annual production. No current primary-verified market shares were available.">
      <HBars label="Selected Vietnam beer production or capacity anchors in billion litres" max={2.4} labelW={226} rows={[
        { label: 'Sabeco group capacity', value: 2.2, text: '>2.2B L', tone: 'red', sub: '26 factories; ThaiBev-controlled; group capacity, 2024 vendor estimate' },
        { label: 'Heineken Vung Tau output', value: 1.1, text: '~1.1B L', tone: 'navy', sub: 'One brewery; Vietnam Brewery joint venture, 2024 vendor estimate' },
        { label: 'Habeco annual production', value: 0.8, text: '>0.8B L', tone: 'slate', sub: 'State-linked heritage brewer, 2024 vendor estimate' },
      ]} />
      <SvgWrap w={720} h={218} label="Strategic comparison of Sabeco, Heineken Vietnam, Habeco and Carlsberg Vietnam">
        <Box x={0} y={0} w={172} h={208} tone="red" title="Sabeco" body={['ThaiBev-controlled since Dec 2017', 'Bia Saigon, 333', 'Nationwide factory and trading network']} size={11.5} />
        <Box x={182} y={0} w={172} h={208} tone="navy" title="Heineken Vietnam" body={['Vietnam Brewery JV', 'Heineken, Tiger', 'Six breweries reported; Vung Tau scale anchor']} size={11.5} />
        <Box x={364} y={0} w={172} h={208} title="Habeco" body={['State-linked', 'Bia Hà Nội', 'Northern heritage position']} size={11.5} />
        <Box x={546} y={0} w={174} h={208} tone="tint" title="Carlsberg Vietnam" body={['International brewer', 'Huda', 'Strong central-region position in the research']} size={11.5} />
      </SvgWrap>
    </Frame>
  );
}

function VietnamTradeVisual() {
  return (
    <Frame title="Vietnam's alcoholic-beverage trade model" subtitle="Inputs and premium drinks come in; most beer is brewed locally; selected beer brands go out." takeaway="Vietnam is locally strong in beer production but internationally exposed through raw materials, premium imports and a smaller beer-export edge." note="Sabeco's roughly 30 export countries are company-reported via Voice of Vietnam. No verified national import or export values or volumes were available, so arrows are qualitative and not proportional.">
      <SvgWrap w={720} h={456} label="Vietnam trade flow diagram for imported inputs, local production and exports">
        <Box x={0} y={0} w={212} h={156} tone="outline" title="Imports into Vietnam" body={['Barley and hops for beer', 'Wine under HS 2204/2205', 'Premium spirits under HS 2208', 'No verified national trade values']} size={12} />
        <Box x={254} y={0} w={212} h={156} tone="navy" title="Local conversion" body={['Intermalt turns imported barley into malt', 'Breweries make heavy beer near demand', 'Domestic rượu uses local rice']} size={12} />
        <Box x={508} y={0} w={212} h={156} tone="red" title="Exports from Vietnam" body={['Sabeco reports exports to about 30 countries', 'No verified national beer volume or value', 'Wine and spirits export scale not established']} size={12} />
        <Arrow x1={212} y1={78} x2={254} y2={78} red />
        <Arrow x1={466} y1={78} x2={508} y2={78} red />
        <Txt x={0} y={196} text="WHY THE FLOWS DIFFER" size={11} weight={800} fill={MUTED} />
        <Box x={0} y={208} w={232} h={182} title="Beer" body={['Heavy and low value per litre', 'Inputs and brand know-how can travel', 'Finished beer is mostly brewed near the drinker']} size={12} />
        <Box x={244} y={208} w={232} h={182} title="Wine" body={['Origin and grapes matter', 'Vietnam is import-reliant', 'Use HS 2204/2205 to define the trade boundary']} size={12} />
        <Box x={488} y={208} w={232} h={182} tone="tint" title="Spirits" body={['High value per litre justifies shipping', 'Imported whisky and cognac complement domestic rượu', 'Use HS 2208 for spirits and liqueurs']} size={12} />
        <Txt x={0} y={430} text="Do not infer a trade balance: the research did not verify country-level values or volumes." size={12.5} weight={700} fill={NAVY} />
      </SvgWrap>
    </Frame>
  );
}

const deck = [
  chapter({
    title: "Vietnam's Alcoholic Beverages Market at a Glance", chapterTitle: LESSON, readingTime: '5',
    objective: 'Describe Vietnam beer-market scale while distinguishing commercial estimates from official statistics and forecasts from observed data.',
    mateIntro: 'Vietnam appears near the top of many beer rankings, yet the most repeated market figures all trace back to the same commercial report. The first skill is not memorising them. It is labelling them correctly.',
    keyInsight: 'Vietnam is a major beer market, but its headline numbers are commercial estimates: about US$7.89 billion and more than 3.8 million kilolitres in 2024, around ninth globally, with a US$14.85 billion 2033 forecast.',
    narrative: [
      { label: 'What it is', text: 'A market-at-a-glance view combines value, volume, rank and direction. For Vietnam, the available anchors describe beer rather than the whole alcoholic-beverages market because beer dominates local consumption and wine and spirits are not separately quantified in the verified research.' },
      { label: 'How it works', text: 'Start with observed estimates, then separate the forecast. Astute Analytica puts 2024 beer-market value at about US$7.89 billion, annual consumption above 3.8 million kilolitres and Vietnam at roughly ninth globally by volume, about 2.2% of the world total. It then forecasts US$14.85 billion in 2033, a 7.27% compound annual growth rate.' },
      { label: 'Global example', text: 'Kirin estimates global beer consumption at 194.12 million kilolitres in 2024. Vietnam’s above-3.8-million figure would therefore place it at roughly 2% of world volume, directionally consistent with the vendor’s 2.2% share, though the two trackers use different methods.' },
      { label: 'Vietnam example', text: 'The forecast was published before the full effect of Vietnam’s excise path from 2027 to 2031. It is therefore an optimistic commercial scenario, not an official government baseline or a consensus forecast.' },
      { label: 'Why it matters', text: 'Good market context is transparent about evidence. A candidate should say “commercial estimate for 2024” and “vendor forecast to 2033,” not present either as an official fact.' },
    ],
    visualKind: 'beer-m1-14-1-glance', visualHeading: 'Four anchors, one evidence warning', visualIntro: 'Read the observed 2024 estimates first, then the separate forecast panel.', imageAlt: 'Vietnam beer market dashboard with value, volume, rank and forecast',
    statTiles: [
      { value: 'US$7.89B', label: 'Beer market value, Vietnam, 2024', description: 'Astute Analytica commercial estimate, not official statistics.' },
      { value: '>3.8M kL', label: 'Beer consumption, Vietnam, 2024', description: 'Commercial estimate from the same vendor.' },
      { value: 'US$14.85B', label: 'Forecast value, Vietnam, 2033', description: 'Single-vendor projection published before full excise escalation.' },
    ],
    keyTerms: [{ term: 'Observed estimate', definition: 'A modelled figure for a period that has already occurred.' }, { term: 'Forecast', definition: 'A projection for a future period based on assumptions.' }, { term: 'Source tier', definition: 'The reliability category of evidence: official, industry tracker or commercial vendor.' }, { term: 'CAGR', definition: 'Compound annual growth rate connecting a starting value with a future value.' }],
    recap: ['The available headline figures describe beer, not all alcohol.', 'Value is estimated at US$7.89B and volume above 3.8M kL in 2024.', 'Vietnam ranks roughly ninth by volume on a vendor estimate.', 'The 2033 figure is a commercial forecast, not an official baseline.'],
    chapterRecap: 'Vietnam is large; the evidence label must travel with every headline number.',
    deepDiveTitle: 'Why one vendor cannot become an official baseline',
    body: <DeepDive paragraphs={['A market-research vendor can fill a useful gap when official data are unavailable, but its model and paid dataset are not visible here. That limits reproducibility.', 'Cross-checking against the global tracker suggests the scale is plausible, but it does not turn the estimate into an official statistic. Different trackers may define beer volume, calendar year and informal consumption differently.', 'The safest decision rule is simple: use the figures for orientation, label them on every use and avoid false precision.']} caveat="No primary General Statistics Office market-value, production or consumption series was verified. The global and Vietnam trackers may use different definitions." />,
    sources: cite('s6', 's1'),
  }),
  chapter({
    title: 'Beer, Wine, and Spirits Consumption in Vietnam', chapterTitle: LESSON, readingTime: '5',
    objective: 'Explain Vietnam’s beer-led consumption mix and state what the available evidence can and cannot quantify for wine and spirits.',
    mateIntro: 'If the global industry has three pillars, Vietnam is a very uneven stool. Beer carries almost all the visible weight; wine and spirits matter, but the research cannot size them cleanly.',
    keyInsight: 'A commercial estimate assigns beer about 91% of alcohol consumed in Vietnam and adult intake of about 8.3 litres of pure alcohol in 2024; verified segment sizes for wine and spirits are absent.',
    narrative: [
      { label: 'What it is', text: 'Consumption can be described by beverage volume or by litres of pure alcohol. The latter adjusts for strength and lets a 5% beer, 12% wine and 40% spirit be compared.' },
      { label: 'How it works', text: 'The available vendor estimate puts adult intake at about 8.3 litres of pure alcohol in 2024, with beer responsible for about 91%. The derived 9% remainder combines spirits, wine and other drinks; the research does not split it reliably.' },
      { label: 'Global example', text: 'WHO reports 5.5 litres of pure alcohol per person aged 15 and over worldwide in 2019. The Vietnam vendor number uses a different source and year, so it should not be presented as a direct official comparison.' },
      { label: 'Vietnam example', text: 'Beer covers mass social and at-home occasions. Spirits include domestic rice-based rượu and imported whisky and cognac. Wine is small and import-reliant. Stricter drink-driving enforcement has encouraged some occasions to move from bars and restaurants toward home.' },
      { label: 'Why it matters', text: 'Beer-led consumption explains why regulation, distribution and local production dominate the market story, while imported wine and spirits follow a smaller premium model.' },
    ],
    visualKind: 'beer-m1-14-2-consumption', visualHeading: 'The 91% beer estimate, with its limits', visualIntro: 'Use the donut for mix, then read what is and is not known about each pillar.', imageAlt: 'Donut and cards showing Vietnam as a beer-led alcohol market',
    keyTerms: [{ term: 'Pure alcohol', definition: 'Litres of ethanol after adjusting for the strength of each drink.' }, { term: 'Consumption mix', definition: 'How total alcohol intake divides among beer, wine, spirits and other drinks.' }, { term: 'Rượu', definition: 'Vietnamese rice drink that may be fermented or distilled depending on process.' }, { term: 'Derived remainder', definition: 'A figure calculated by subtraction, here 100% minus the vendor-estimated beer share.' }],
    recap: ['Beer carries about 91% of intake on a vendor estimate.', 'Adult intake is estimated at about 8.3 litres of pure alcohol in 2024.', 'Wine and spirits segment sizes were not verified.', 'Global WHO and Vietnam vendor figures are not directly comparable.'],
    chapterRecap: 'Beer dominates the measured market; treat the other pillars qualitatively until better data exist.',
    deepDiveTitle: 'Why a beer share does not size wine and spirits',
    body: <DeepDive paragraphs={['The 91% figure is a share of alcohol consumed, not a share of retail value. A small volume of premium spirit can generate much more money per litre than beer.', 'The remaining 9% is not automatically spirits. It includes wine, spirits and other beverages, and the research does not provide a validated split.', 'This distinction matters commercially: beer drives factories and distribution breadth, while a much smaller imported-spirit category can still support premium brand roles.']} caveat="The 91% share and 8.3-litre figure are commercial estimates. No official Vietnam beverage split was verified." />,
    sources: cite('s6', 's7', 's8', 's23'),
  }),
  chapter({
    title: 'Domestic Production and Geographic Structure', chapterTitle: LESSON, readingTime: '6',
    objective: 'Map Vietnam’s beer production into northern, central and southern positions and explain why local brewing still depends on imported inputs.',
    mateIntro: 'Beer is mostly water, which makes shipping it across a continent expensive. Vietnam’s answer is a network of breweries close to demand, fed by barley and hops that often travelled much farther than the finished bottle.',
    keyInsight: 'Vietnam localises beer production across regions but imports key inputs: Habeco anchors the north, Carlsberg/Huda the centre, Heineken and Sabeco major southern and nationwide capacity, while Intermalt processes imported barley at Cai Mep.',
    narrative: [
      { label: 'What it is', text: 'Geographic structure means where plants, brands and distribution strength sit. It matters in beer because heavy, low-value liquid is cheaper to brew near the drinker than to ship over long distances.' },
      { label: 'How it works', text: 'The research describes a northern Habeco heritage position, a central Carlsberg/Huda strength and major southern capacity around Heineken’s Vung Tau brewery and Sabeco’s network. Sabeco operates about 26 factories nationwide with more than 2.2 billion litres of capacity; Habeco produces more than 800 million litres; Vung Tau produces about 1.1 billion litres a year. These are vendor estimates and not like-for-like measures.' },
      { label: 'Global example', text: 'Global brewers operate as federations of local breweries. Brands and procurement scale travel; most finished beer does not. Imported barley, hops and packaging expose even a local brewery to world prices and foreign exchange.' },
      { label: 'Vietnam example', text: 'Intermalt’s US$70 million Cai Mep plant, reported in 2020 with 110,000 tonnes of capacity, processes imported Australian barley for Heineken Vietnam, Carlsberg and local brewers. It localises one conversion step without making the upstream domestic.' },
      { label: 'Why it matters', text: 'Production geography predicts logistics cost, local hiring and regional brand power. Import dependence predicts exposure to commodities, exchange rates and climate.' },
    ],
    visualKind: 'beer-m1-14-3-geography', visualHeading: 'Three regions, one imported upstream', visualIntro: 'Follow inputs into Vietnam, then compare the northern, central and southern production positions.', imageAlt: 'Regional production diagram for Vietnam beer and imported inputs',
    keyTerms: [{ term: 'Local production', definition: 'Making finished beer inside the market where it will be sold.' }, { term: 'Import dependence', definition: 'Reliance on foreign suppliers for critical inputs such as barley and hops.' }, { term: 'Malting', definition: 'Turning barley into malt through steeping, germination and kilning.' }, { term: 'Capacity versus output', definition: 'Maximum possible production versus what a plant actually makes in a period.' }],
    recap: ['Beer is brewed near demand because it is heavy and low in value density.', 'Habeco, Huda, Heineken and Sabeco occupy different regional positions.', 'The available capacity numbers are vendor estimates and are not like-for-like.', 'Intermalt localises malting but uses imported barley.'],
    chapterRecap: 'Vietnam’s beer is locally brewed on a globally exposed input base.',
    deepDiveTitle: 'What geography reveals about cost and power',
    body: <DeepDive paragraphs={['A brewery is a logistics asset as much as a factory. It places water-heavy finished product near outlets and lets reusable packaging and kegs circulate within a region.', 'Regional heritage adds brand power. Bia Hà Nội and Huda are not simply liquids; they carry place-based recognition that a national competitor must work to dislodge.', 'The input side moves differently. Barley and hops can be shipped economically as concentrated raw materials, so procurement remains global even when brewing is local.']} caveat="No official province-level output, utilisation rate or regional market share was verified. Sabeco, Habeco and Vung Tau figures describe different measures." />,
    sources: cite('s6', 's11', 's14'),
  }),
  chapter({
    title: 'Key Market Participants and Industry Structure', chapterTitle: LESSON, readingTime: '6',
    objective: 'Compare Sabeco, Heineken Vietnam, Habeco and Carlsberg Vietnam by ownership, scale, brands and geographic position without implying an unverified market share.',
    mateIntro: 'Four brewers can sell similar lager and still behave like very different organisations. Ownership decides access to capital, scale decides cost, and regional heritage decides where a brand starts with an advantage.',
    keyInsight: 'Vietnam beer is an oligopoly led by foreign-controlled and state-linked players: ThaiBev-controlled Sabeco, Heineken’s joint venture, state-linked Habeco and Carlsberg Vietnam, each with a distinct route to market.',
    narrative: [
      { label: 'What it is', text: 'An oligopoly is a market led by a small number of large firms. Vietnam’s beer market fits that structure qualitatively, although the research did not verify current market shares from primary sources.' },
      { label: 'How it works', text: 'Sabeco combines nationwide scale, 26 factories and brands such as Bia Saigon and 333. Heineken Vietnam operates through the Vietnam Brewery joint venture with Heineken and Tiger. Habeco is state-linked and rooted in Bia Hà Nội. Carlsberg Vietnam and Huda are described as strong in the central region. Distribution reach, ownership and regional identity separate them.' },
      { label: 'Global example', text: 'The structure mirrors global beer: a few groups gain procurement and distribution scale, then operate local breweries and local-looking brand portfolios in each market.' },
      { label: 'Vietnam example', text: 'ThaiBev’s December 2017 purchase of 53.59% of Sabeco for US$4.78 billion changed control of the largest domestic brewer. Sabeco reports a network of 200,000+ shops through 11 trading companies, showing why route-to-market is a strategic asset.' },
      { label: 'Why it matters', text: 'A capacity chart alone cannot explain competition. Ownership affects capital and culture; distribution affects availability; regional heritage affects consumer pull.' },
    ],
    visualKind: 'beer-m1-14-4-players', visualHeading: 'Scale plus strategic position', visualIntro: 'Read the bars as scale anchors, not market shares, then compare ownership and route to market.', imageAlt: 'Capacity bars and strategic comparison of four Vietnam beer players',
    keyTerms: [{ term: 'Oligopoly', definition: 'A market led by a small number of large competitors.' }, { term: 'Joint venture', definition: 'A company owned together by two or more partners.' }, { term: 'Route to market', definition: 'The distributors, trading companies and outlets that move a product to drinkers.' }, { term: 'Market share', definition: 'A company’s portion of market sales or volume; not verified here for current Vietnam beer.' }],
    recap: ['Four scale players lead the market qualitatively.', 'Their ownership structures differ.', 'Capacity figures are not market shares and are not like-for-like.', 'Distribution and regional heritage shape competition.'],
    chapterRecap: 'Vietnam beer is concentrated, but each leader wins through a different combination of control, scale and place.',
    deepDiveTitle: 'Why ownership changes the competitive map',
    body: <DeepDive paragraphs={['A foreign-controlled group can connect Vietnam to global procurement, brands and capital. A joint venture must align partners. A state-linked company may face a different pace of decision-making and capital allocation.', 'The 2017 Sabeco transaction matters because control, not just cash, moved. ThaiBev acquired the ability to shape portfolio, investment and distribution at national scale.', 'Market-share numbers often circulate in secondary reports, but this module omits them because no current primary series was verified. The qualitative oligopoly conclusion is still supported by the scale and footprint of the four firms.']} caveat="No current primary-verified market-share table was available. Capacity and ownership establish structure but do not calculate share." />,
    sources: cite('s5', 's6', 's14', 's20'),
  }),
  chapter({
    title: "Vietnam's Alcoholic Beverage Trade", chapterTitle: LESSON, readingTime: '5',
    objective: 'Explain what Vietnam imports, localises and exports across beer, wine and spirits, while recognising the absence of verified national trade totals.',
    mateIntro: 'The beer on a Hanoi table may be brewed in Vietnam from Australian barley, under a European brand, by a joint venture. Trade is not only the finished bottle crossing a border.',
    keyInsight: 'Vietnam imports beer inputs and premium wine and spirits, localises brewing and malting, and exports selected beer brands; verified national trade values and volumes were not available.',
    narrative: [
      { label: 'What it is', text: 'Trade includes raw materials, intermediate goods and finished drinks. HS 2203 covers beer, 2204 and 2205 wine and vermouth, 2206 other fermented drinks, and 2208 spirits and liqueurs.' },
      { label: 'How it works', text: 'Barley and hops travel into Vietnam because compact inputs are cheaper to ship than water-heavy beer. Intermalt turns imported barley into malt locally. Wine and premium spirits arrive as finished, origin-linked products. Beer is mostly brewed locally, with selected domestic brands exported.' },
      { label: 'Global example', text: 'This follows the global rule: wine and spirits can travel as finished goods because origin and value per litre justify freight, while beer tends to travel as brand rights, know-how and inputs.' },
      { label: 'Vietnam example', text: 'Sabeco reports exports to about 30 countries. That proves an export footprint, not a national trade balance. The research did not verify Vietnam’s beer export volume, wine import value or spirits import value from customs or UN Comtrade.' },
      { label: 'Why it matters', text: 'Trade exposure differs by pillar. Brewers watch commodity prices and foreign exchange; wine and spirits importers also watch tariffs, customs classification and premium demand.' },
    ],
    visualKind: 'beer-m1-14-5-trade', visualHeading: 'What comes in, what stays local, what goes out', visualIntro: 'Follow the arrows, then compare why beer, wine and spirits move differently.', imageAlt: 'Vietnam alcoholic beverage import, local conversion and export flow',
    keyTerms: [{ term: 'Import', definition: 'A good brought into Vietnam from another country.' }, { term: 'Export', definition: 'A good produced or distributed from Vietnam and sold abroad.' }, { term: 'Trade balance', definition: 'Exports minus imports; not calculated here because verified totals are absent.' }, { term: 'HS code', definition: 'The Harmonized System classification used to identify goods in customs data.' }],
    recap: ['Vietnam imports barley, hops, wine and premium spirits.', 'Malting and brewing are localised.', 'Sabeco reports exports to about 30 countries.', 'No national trade balance can be inferred from the available evidence.'],
    chapterRecap: 'Vietnam’s beer is local in the plant and global in its inputs, ownership and selected exports.',
    deepDiveTitle: 'Why trade data need product codes',
    body: <DeepDive paragraphs={['A headline such as “alcohol imports” can hide very different products. HS 2204 wine and HS 2208 spirits have different values, duties and consumer occasions, so they should be analysed separately.', 'The beer chain also spans more than HS 2203. Barley, malt, hops, cans and machinery cross borders before any beer exists, which is why a locally brewed product remains exposed to global trade.', 'Without customs values and volumes, the correct conclusion is directional: import-dependent upstream, local brewing and a demonstrated but unquantified export edge.']} caveat="Vietnam customs and UN Comtrade totals were not pulled in the research. The about-30-country figure is company-reported and does not state export value or volume." />,
    sources: cite('s9', 's11', 's14', 's10'),
  }),
];

const quizItems = quiz('beer-14', [
  { c: '1', o: 'Label evidence correctly', q: 'How should the US$7.89 billion Vietnam beer-market value for 2024 be described?', a: 'A commercial market-research estimate, not an official statistic', w: ['An audited General Statistics Office figure', 'A WHO health statistic', 'A customs export value'], e: 'The figure comes from Astute Analytica and must keep its commercial-estimate label.' },
  { c: '1', o: 'Separate forecast from observation', q: 'What is the US$14.85 billion figure in the research?', a: 'A vendor forecast for Vietnam beer-market value in 2033', w: ['Observed 2024 revenue of Sabeco', 'Official 2025 alcohol-market value', 'Vietnam beer exports in 2033'], e: 'It is a single-vendor forecast, not observed sales or an official baseline.' },
  { c: '2', o: 'Read the consumption mix', q: 'What share of alcohol consumed in Vietnam does the vendor estimate assign to beer?', a: 'About 91%', w: ['About 32.6%', 'About 60%', 'About 9%'], e: 'Beer is estimated at about 91%, making Vietnam a beer-led market.' },
  { c: '2', o: 'Recognise a data gap', q: 'What can the remaining 9% after the beer estimate tell us?', a: 'Only the combined remainder; the wine and spirits split was not verified', w: ['It is all imported whisky', 'It is all wine', 'It proves spirits lead market value'], e: 'The remainder combines several categories and cannot be split from the verified evidence.' },
  { c: '3', o: 'Distinguish capacity and output', q: 'Why should the Sabeco, Vung Tau and Habeco figures not be ranked as exact market shares?', a: 'They mix group capacity, one-brewery output and company production', w: ['They are all tax rates', 'They cover only wine', 'They are measured in different currencies'], e: 'The measures are not like-for-like and none directly measures sales share.' },
  { c: '3', o: 'Explain upstream exposure', q: 'What does the Intermalt plant localise in Vietnam?', a: 'Malting imported barley', w: ['Growing all domestic hops', 'Distilling imported whisky', 'Producing wine grapes'], e: 'Intermalt processes imported barley into malt, localising conversion rather than the farm input.' },
  { c: '4', o: 'Connect ownership to a player', q: 'Which brewer became ThaiBev-controlled after the December 2017 transaction?', a: 'Sabeco', w: ['Habeco', 'Heineken Vietnam', 'Carlsberg Vietnam'], e: 'ThaiBev acquired 53.59% of Sabeco for US$4.78 billion.' },
  { c: '4', o: 'Interpret structure', q: 'Which evidence best shows Sabeco’s route-to-market reach?', a: 'More than 200,000 shops through 11 trading companies', w: ['A single brewery in Vung Tau', 'A wine vineyard in Europe', 'A global WHO consumption figure'], e: 'Outlet reach and trading companies describe downstream distribution power.' },
  { c: '5', o: 'Explain beer trade', q: 'Why is most beer brewed near the drinker?', a: 'Finished beer is heavy and low in value per litre relative to shipping cost', w: ['Beer inputs cannot cross borders', 'HS 2203 bans beer exports', 'Beer has no shelf life'], e: 'Inputs and brands travel more efficiently than shipping large volumes of water-heavy finished beer.' },
  { c: '5', o: 'Avoid an unsupported inference', q: 'What does Sabeco’s export footprint of about 30 countries establish?', a: 'An export presence, but not Vietnam’s national trade balance', w: ['Vietnam is a net exporter of all alcohol', 'Beer exports exceed imports by 30%', 'Wine imports are zero'], e: 'The company footprint does not provide national values or volumes.' },
]);

export const LESSON_1_4: BeerLessonBundle = {
  deck,
  quiz: quizItems,
  takeaways: {
    learned: 'You can describe Vietnam’s beer-led market with correct evidence labels, explain consumption mix, map production geography, compare the four scale players and describe the trade model without inventing missing totals.',
    keyTakeaways: ['Headline Vietnam market figures are commercial estimates, not official statistics.', 'Beer carries about 91% of alcohol intake on the available vendor estimate.', 'Vietnam brews locally across regions but imports key inputs.', 'The market is concentrated among players with different ownership and regional positions.', 'Trade is import-dependent upstream, local in brewing and selectively export-facing.'],
    businessImplications: 'The strongest local strategies combine regional production, deep distribution and careful management of imported-input, regulatory and ownership exposure.',
    remember: 'Label the estimate, separate capacity from share, and never infer a trade balance from a company footprint.',
    nextLesson: 'Industry Drivers & External Factors',
  },
  visuals: {
    'beer-m1-14-1-glance': VietnamGlanceVisual,
    'beer-m1-14-2-consumption': VietnamConsumptionVisual,
    'beer-m1-14-3-geography': GeographyVisual,
    'beer-m1-14-4-players': PlayersVisual,
    'beer-m1-14-5-trade': VietnamTradeVisual,
  },
};
