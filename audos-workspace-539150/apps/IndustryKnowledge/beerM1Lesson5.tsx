import { Arrow, Box, DeepDive, Frame, MUTED, NAVY, SvgWrap, Timeline, Txt, VCols, chapter, cite, quiz } from './beerM1Core';
import type { BeerLessonBundle } from './beerM1Core';

const LESSON = '1.5 Industry Drivers & External Factors';

function EconomicVisual() {
  return (
    <Frame title="Economic drivers: four forces on value and volume" subtitle="Income, price, input cost and channel spending pull the market in different directions." takeaway="Economic growth does not translate one-for-one into beer volume: tax, input inflation and consumer confidence decide how much demand reaches producers." note="The 2023 company changes are reported by Asia Brewers Network from company and secondary sources. They are nine-month or volume measures, not a total-market index." ribbon={['Economic']}>
      <SvgWrap w={720} h={440} label="Economic driver framework linking household income, price, input costs and channel spending to alcohol demand">
        <Box x={250} y={0} w={220} h={82} tone="navy" center title="Alcohol demand" body="volume × price × mix" size={13} />
        <Box x={0} y={122} w={160} h={156} title="Income and jobs" body={['Rising disposable income expands occasions', 'Weak confidence triggers trade-down or fewer occasions']} size={12} />
        <Box x={186} y={122} w={160} h={156} tone="tint" title="Shelf price" body={['Excise and inflation raise the bill', 'Elasticity decides how much volume falls']} size={12} />
        <Box x={374} y={122} w={160} h={156} title="Input costs and FX" body={['Imported barley, hops and aluminium', 'Exchange rates and commodities squeeze margin']} size={12} />
        <Box x={560} y={122} w={160} h={156} tone="tint" title="Channel spending" body={['On-trade is discretionary and social', 'At-home purchases can be more price-sensitive']} size={12} />
        <Arrow x1={80} y1={122} x2={280} y2={82} />
        <Arrow x1={266} y1={122} x2={330} y2={82} />
        <Arrow x1={454} y1={122} x2={390} y2={82} />
        <Arrow x1={640} y1={122} x2={440} y2={82} />
        <Txt x={0} y={312} text="VIETNAM STRESS TEST: NINE MONTHS OF 2023" size={11} weight={800} fill={MUTED} />
        <Box x={0} y={324} w={232} h={104} tone="red" center title="Sabeco" body="Revenue -12%; profit -26%" size={12.5} />
        <Box x={244} y={324} w={232} h={104} center title="Habeco" body="Revenue -6.3%; profit -39%" size={12.5} />
        <Box x={488} y={324} w={232} h={104} tone="navy" center title="Vietnam Brewery" body="Volume -16.5%" size={12.5} />
      </SvgWrap>
    </Frame>
  );
}

function RegulationVisual() {
  return (
    <Frame title="Vietnam regulation: a known path with uncertain demand effects" subtitle="Drink-driving enforcement changed occasions; enacted excise increases change future price economics." takeaway="Regulation works through behaviour and price: enforcement moves occasions, while excise raises shelf price and forces a portfolio and margin response." note="Law No. 66/2025/QH15 schedule is reported by AFP: beer and strong liquor at 65% in the 2025 baseline, then +5 percentage points yearly from 2027 to 90% in 2031. Primary gazette text was not read." ribbon={['Political', 'Legal']}>
      <Timeline label="Vietnam alcohol regulation timeline from 2019 to 2031" events={[
        { when: '2019', title: 'Alcohol-harm law and zero-alcohol driving rule', detail: 'The policy foundation is set; enforcement begins from January 2020.' },
        { when: 'Jan 2020', title: 'Decree 100 enforcement', detail: 'Strict drink-driving enforcement shocks on-trade occasions and encourages drinking closer to home.', tone: 'red' },
        { when: '2024-2025', title: 'Decree 168 raises the penalty environment', detail: 'News reporting describes materially higher road-traffic penalties from 2025; exact provisions were not read from primary text.' },
        { when: 'Jun 2025', title: 'Law No. 66/2025/QH15 approved', detail: 'National Assembly approves the new Special Consumption Tax path.' },
        { when: '2027', title: 'Beer and strong-liquor SCT begins stepping up', detail: 'Reported path: 70%, then five percentage points per year.', tone: 'outline' },
        { when: '2031', title: 'Beer and strong-liquor SCT reaches 90%', detail: 'Up from the reported 65% baseline in 2025.', tone: 'red' },
      ]} />
      <div className="mt-4">
        <SvgWrap w={720} h={160} label="Business response chain to alcohol regulation">
          <Box x={0} y={0} w={160} h={150} title="Rule changes" body={['Driving enforcement', 'Excise schedule', 'Advertising and licensing']} size={12} />
          <Box x={186} y={0} w={160} h={150} tone="tint" title="Consumer response" body={['Fewer on-trade trips', 'Higher shelf price', 'At-home or no/low options']} size={12} />
          <Box x={374} y={0} w={160} h={150} title="Company response" body={['Pricing and pack sizes', 'Portfolio and channel shift', 'Compliance controls']} size={12} />
          <Box x={560} y={0} w={160} h={150} tone="navy" title="Outcome" body={['Volume, mix and margin change', 'Effect not quantified in research']} size={12} />
          <Arrow x1={160} y1={75} x2={186} y2={75} red />
          <Arrow x1={346} y1={75} x2={374} y2={75} red />
          <Arrow x1={534} y1={75} x2={560} y2={75} red />
        </SvgWrap>
      </div>
    </Frame>
  );
}

function SocialVisual() {
  return (
    <Frame title="Social attitudes: moderation changes the occasion" subtitle="Health evidence and drink-driving norms can reduce intake or move it to a different channel." takeaway="The social shift is not simply “people stop drinking”: some drink less, some trade up, some choose no/low and some move occasions home." note="WHO figures cover the world and 2019 outcomes; they do not measure Vietnam behaviour. Vietnam channel movement is directional because no current on-/off-trade split was verified." ribbon={['Social']}>
      <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
        <VCols label="WHO global pure alcohol per adult in 2010 and 2019" w={390} h={286} max={6.3} rows={[
          { label: '2010', value: 5.7, text: '5.7 L', tone: 'slate', sub: 'Global, age 15+' },
          { label: '2019', value: 5.5, text: '5.5 L', tone: 'red', sub: 'Global, age 15+' },
        ]} />
        <SvgWrap w={720} h={286} label="Four social responses to moderation and enforcement">
          <Box x={0} y={0} w={344} h={124} tone="navy" title="Drink less" body="WHO global per-adult intake fell by 0.2 litres of pure alcohol from 2010 to 2019." size={12.5} />
          <Box x={376} y={0} w={344} h={124} title="Drink differently" body="Premiumisation seeks more value per occasion even when total litres soften." size={12.5} />
          <Box x={0} y={150} w={344} h={124} title="Choose no/low" body="No-alcohol beer keeps the ritual while removing ethanol; Heineken 0.0 volume rose 10% in 2024." size={12.5} />
          <Box x={376} y={150} w={344} h={124} tone="tint" title="Move the occasion" body="Vietnam’s strict drink-driving enforcement pushes some social volume from bars and quán nhậu toward home." size={12.5} />
        </SvgWrap>
      </div>
      <p className="mt-4 rounded-xl bg-slate-50 p-4 text-sm leading-6 text-slate-700"><span className="font-black" style={{ color: NAVY }}>Health context: </span>WHO attributes about 2.6 million deaths worldwide to alcohol in 2019 and estimates about 400 million people live with alcohol-use disorders.</p>
    </Frame>
  );
}

function TechnologyVisual() {
  return (
    <Frame title="Technology: innovate around the constraint" subtitle="Production, product and channel tools help firms respond to moderation, cost and fragmented distribution." takeaway="The most useful innovation solves an external constraint: remove alcohol, improve consistency, lower resource use or reach the right outlet with better information." note="Heineken 0.0 growth is a company-reported global figure for 2024. E-commerce, digital trade marketing and production tools are qualitative themes; no Vietnam adoption rates were verified." ribbon={['Technological']}>
      <SvgWrap w={720} h={454} label="Technology loop across production, product, route to market and data">
        <Box x={250} y={0} w={220} h={82} tone="navy" center title="Constraint" body="moderation, cost, compliance, reach" size={12.5} />
        <Box x={0} y={120} w={206} h={152} title="Production technology" body={['Yeast and process control', 'Quality systems and sensors', 'Water and energy efficiency']} size={12} />
        <Box x={256} y={120} w={206} h={152} tone="red" title="Product technology" body={['No/low-alcohol brewing', 'Flavour retention after alcohol removal', 'New formats and packs']} size={12} />
        <Box x={514} y={120} w={206} h={152} title="Route-to-market technology" body={['E-commerce and quick-commerce', 'Digital trade marketing', 'Outlet-level execution data']} size={12} />
        <Arrow x1={300} y1={82} x2={130} y2={120} />
        <Arrow x1={360} y1={82} x2={360} y2={120} red />
        <Arrow x1={420} y1={82} x2={617} y2={120} />
        <Box x={0} y={302} w={720} h={82} tone="tint" center title="Measured global example" body="Heineken 0.0 volume grew 10% in 2024, while Heineken brand volume grew 9% and total beer volume 1.6%." size={12.5} />
        <Box x={0} y={400} w={720} h={46} tone="outline" center title="Vietnam evidence gap: adoption rates and plant-efficiency gains were not verified." size={12} titleSize={12.5} />
      </SvgWrap>
    </Frame>
  );
}

function EnvironmentVisual() {
  return (
    <Frame title="Environmental pressures across the drink lifecycle" subtitle="Agriculture, brewing, packaging and logistics each carry a different exposure." takeaway="Sustainability is operational, not decorative: climate hits farm supply, water and energy run the plant, and packaging determines much of the material footprint." note="OIV reports 2024 global wine production at about 225.8 million hl, a roughly 60-year low linked in the research to extreme weather. No verified Vietnam water-use, energy-use or recycling-rate figures were available." ribbon={['Environmental']}>
      <SvgWrap w={720} h={486} label="Alcohol lifecycle showing environmental pressure and business response from farm to post-consumer packaging">
        <Txt x={0} y={14} text="LIFECYCLE PRESSURE" size={11} weight={800} fill={MUTED} />
        <Box x={0} y={26} w={160} h={170} title="1. Farm" body={['Climate and crop yield', 'Barley, hops, grapes and rice', 'Wine output exposed to extreme weather']} size={12} />
        <Box x={186} y={26} w={160} h={170} title="2. Plant" body={['Water treatment', 'Heat, cooling and refrigeration', 'Wastewater and spent grain']} size={12} />
        <Box x={374} y={26} w={160} h={170} title="3. Package" body={['Glass, aluminium, PET and kegs', 'Material and transport weight', 'Reuse and recycling pressure']} size={12} />
        <Box x={560} y={26} w={160} h={170} title="4. Market" body={['Heavy beer moves locally', 'Wine and spirits travel farther', 'Return and recovery systems']} size={12} />
        <Arrow x1={160} y1={111} x2={186} y2={111} />
        <Arrow x1={346} y1={111} x2={374} y2={111} />
        <Arrow x1={534} y1={111} x2={560} y2={111} />
        <Txt x={0} y={236} text="OPERATIONAL RESPONSE" size={11} weight={800} fill={MUTED} />
        <Box x={0} y={248} w={220} h={150} tone="tint" title="Reduce" body={['Less water and energy per hectolitre', 'Lighter packaging', 'Shorter beer logistics']} size={12} />
        <Box x={250} y={248} w={220} h={150} tone="navy" title="Recover" body={['Spent grain to animal feed', 'Recovered carbon dioxide', 'Reusable bottles and kegs']} size={12} />
        <Box x={500} y={248} w={220} h={150} tone="tint" title="Resilience" body={['Diversify agricultural supply', 'Manage climate and commodity risk', 'Invest in local conversion']} size={12} />
        <Box x={0} y={416} w={720} h={60} tone="red" center title="Evidence discipline" body="Do not quote a sustainability saving without a year, unit, geography and verified source." size={12.5} />
      </SvgWrap>
    </Frame>
  );
}

const deck = [
  chapter({
    title: 'Economic Drivers of Alcoholic Beverage Demand', chapterTitle: LESSON, readingTime: '5',
    objective: 'Explain how income, price, input costs and channel spending shape alcohol volume, value and company profit.',
    mateIntro: 'A growing economy can lift beer occasions, yet the brewer can still report falling profit. The missing links are price, tax, input costs and where consumers choose to drink.',
    keyInsight: 'Demand rises with income and occasions but falls with weak confidence and higher prices; imported-input inflation and foreign exchange can squeeze profit even before volume changes.',
    narrative: [
      { label: 'What it is', text: 'Economic drivers are the household and company conditions that determine how much alcohol is bought, at what price and with what margin. Income and jobs support demand; inflation, tax and weak confidence restrain it.' },
      { label: 'How it works', text: 'Four channels matter. Disposable income changes the number and quality of occasions. Shelf price reflects excise and producer pricing. Imported barley, hops, aluminium and equipment expose local brewers to commodities and exchange rates. On-trade occasions are discretionary, so they can weaken faster than at-home purchases.' },
      { label: 'Global example', text: 'IWSR’s industry forecast expects value growth to rotate toward developing markets, with India leading and Brazil and Mexico following. The mechanism is rising income and legal-age consumers, offset by moderation in mature markets.' },
      { label: 'Vietnam example', text: 'The 2023 downturn shows the interaction. In the first nine months Sabeco revenue fell about 12% and profit 26%; Habeco revenue fell 6.3% and profit 39%; Vietnam Brewery volume fell 16.5%. Trade reporting attributes pressure to enforcement, raw-material costs and weaker consumer spending.' },
      { label: 'Why it matters', text: 'A top-line volume story can miss margin risk. Companies must manage price, pack, channel and cost together rather than assume economic growth guarantees profit.' },
    ],
    visualKind: 'beer-m1-15-1-economic', visualHeading: 'Four economic channels and a Vietnam stress test', visualIntro: 'Trace each driver into demand, then see how three companies moved during the 2023 downturn.', imageAlt: 'Economic driver framework and 2023 Vietnam brewer performance cards',
    keyTerms: [{ term: 'Disposable income', definition: 'Household income left after taxes and essential spending.' }, { term: 'Price elasticity', definition: 'How strongly purchase volume changes when price changes.' }, { term: 'Foreign-exchange exposure', definition: 'The effect of currency movements on imported input cost.' }, { term: 'Trade down', definition: 'Switching to a cheaper product, pack or occasion.' }],
    recap: ['Income supports occasions; weak confidence reduces or cheapens them.', 'Excise and inflation work through shelf price.', 'Imported inputs create commodity and currency exposure.', 'The 2023 downturn hit revenue, volume and profit differently.'],
    chapterRecap: 'Demand reaches the brewer only after household budgets, price, input cost and channel choice interact.',
    deepDiveTitle: 'Why profit can fall faster than revenue',
    body: <DeepDive paragraphs={['A brewer has fixed costs in plants, people and distribution. When volume falls, those costs are spread over fewer litres, so profit can drop faster than revenue.', 'At the same time, imported inputs may become more expensive. Raising price protects margin but can reduce demand, especially in value-sensitive channels.', 'Premiumisation is one answer: earn more per litre. It works only if consumers still see enough value in the brand to accept the price.']} caveat="The company changes cover different measures and are reported through trade press. They should not be summed into a market decline." />,
    sources: cite('s4', 's11', 's25', 's6'),
  }),
  chapter({
    title: 'Regulation, Taxation, and Industry Compliance', chapterTitle: LESSON, readingTime: '6',
    objective: 'Trace Vietnam’s drink-driving and excise changes and explain how rules translate into occasions, shelf prices, portfolio decisions and compliance work.',
    mateIntro: 'In Vietnam, a regulation can move more beer volume than a new flavour. One rule changes whether a consumer drives to a quán nhậu; another changes the price of every bottle on the shelf.',
    keyInsight: 'Vietnam’s strongest external swing factors are strict drink-driving enforcement from January 2020 and an enacted excise path reported to raise beer and strong-liquor SCT from a 65% baseline to 90% by 2031.',
    narrative: [
      { label: 'What it is', text: 'Alcohol regulation covers who may sell and buy, how products are marketed, whether a drinker may drive and how much excise is collected. Compliance turns those rules into company controls.' },
      { label: 'How it works', text: 'Drink-driving enforcement changes behaviour and channel: some social occasions move closer to home. Excise sits inside the shelf price, so a higher rate can be absorbed in margin, passed to consumers or offset through mix and pack changes. Compliance teams must update pricing, labels, promotions, distributor guidance and reporting.' },
      { label: 'Global example', text: 'WHO’s estimate of 2.6 million alcohol-attributable deaths in 2019 explains why health regulation is structural rather than temporary. Governments use tax, availability and drink-driving rules to reduce harm.' },
      { label: 'Vietnam example', text: 'Decree 100 enforcement began in January 2020. Law No. 66/2025/QH15 was approved in June 2025; AFP reporting describes beer and strong-liquor SCT at 65% in the 2025 baseline, moving to 70% in 2027 and rising five percentage points a year to 90% in 2031. Decree 168/2024 also raised the traffic-penalty environment from 2025, according to news reporting.' },
      { label: 'Why it matters', text: 'The schedule makes regulatory risk partly planable. Companies can model price and portfolio responses, but demand elasticity and channel migration remain uncertain.' },
    ],
    visualKind: 'beer-m1-15-2-regulation', visualHeading: 'From rule to business outcome', visualIntro: 'Follow the timeline, then read how each rule travels through consumers and company decisions.', imageAlt: 'Vietnam alcohol regulation timeline and business response chain',
    keyTerms: [{ term: 'Special Consumption Tax', definition: 'Vietnam’s excise tax on selected products, including beer and spirits.' }, { term: 'Compliance', definition: 'Processes that make company activity follow law and regulation.' }, { term: 'Zero-tolerance driving rule', definition: 'A rule that does not permit alcohol in a driver’s system.' }, { term: 'Percentage point', definition: 'The arithmetic difference between percentages, such as 65% to 70% being five points.' }],
    recap: ['Drink-driving enforcement changes occasions and channels.', 'Excise works through shelf price, volume, mix and margin.', 'The reported enacted path reaches 90% in 2031.', 'Exact demand impact was not verified.'],
    chapterRecap: 'Regulation changes both the occasion and the economics of every unit sold.',
    deepDiveTitle: 'What is known and what still needs scenario analysis',
    body: <DeepDive paragraphs={['The tax schedule provides dates and rates, but it does not reveal how consumers will react. That response depends on income, competitor pricing, pack size and the availability of no/low or informal alternatives.', 'The safest planning approach is a scenario tree: pass through the tax, absorb some of it, or change mix, then test the likely volume and margin effect of each.', 'Compliance is broader than tax. Sales teams need clear rules for promotions and outlets, while marketing must work inside advertising and harm-prevention constraints.']} caveat="The statutory schedule is taken from AFP reporting; the primary legal-gazette text was not read. Exact Decree 168 penalty provisions were not verified. No price-elasticity estimate was available." />,
    sources: cite('s2', 's3', 's7', 's23', 's24'),
  }),
  chapter({
    title: 'Social Attitudes and Changing Consumption Behavior', chapterTitle: LESSON, readingTime: '5',
    objective: 'Explain how moderation, health awareness, premiumisation, no/low alcohol and occasion migration can occur at the same time.',
    mateIntro: '“People are drinking less” sounds simple. In practice, one person drinks fewer times, another buys a better bottle and a third keeps the ritual with no alcohol. The market moves through all three choices.',
    keyInsight: 'Moderation changes amount, mix and place: global pure-alcohol intake per adult fell from 5.7 litres in 2010 to 5.5 in 2019, while premium, no/low and at-home occasions gained strategic importance.',
    narrative: [
      { label: 'What it is', text: 'Social attitudes are shared beliefs about health, responsibility and the role of drinking in everyday life. They shape whether people drink, what they choose and where the occasion happens.' },
      { label: 'How it works', text: 'Four responses can coexist. Some people drink less. Some drink fewer but more premium servings. Some choose no/low alcohol. Some move social drinking from bars to home when driving risk rises. The same consumer may do all four across different occasions.' },
      { label: 'Global example', text: 'WHO reports global consumption per person aged 15 and over falling from 5.7 to 5.5 litres of pure alcohol between 2010 and 2019. It also estimates about 400 million people live with alcohol-use disorders, keeping health pressure high. Heineken 0.0 volume rose 10% globally in 2024, a company-reported example of no/low momentum.' },
      { label: 'Vietnam example', text: 'Quán nhậu and beer clubs remain important social occasions, but strict drink-driving enforcement raises the cost and risk of travelling home. Research describes a directional shift toward off-trade and at-home drinking; no current channel split was verified.' },
      { label: 'Why it matters', text: 'Portfolios and channels must cover different responses. A brewer needs mainstream value, premium choice, no/low options and at-home availability rather than one broad “moderation” strategy.' },
    ],
    visualKind: 'beer-m1-15-3-social', visualHeading: 'Four responses to one social shift', visualIntro: 'Start with the WHO trend, then see how behaviour can change in four distinct ways.', imageAlt: 'WHO moderation chart and four social behaviour responses',
    keyTerms: [{ term: 'Moderation', definition: 'Reducing alcohol intake, frequency or strength.' }, { term: 'Premiumisation', definition: 'Moving to a higher-priced product or mix, often while volume stays flat or falls.' }, { term: 'No/low alcohol', definition: 'Products designed to keep flavour or ritual with little or no ethanol.' }, { term: 'Occasion migration', definition: 'A shift in where or how consumption happens, such as from a bar to home.' }],
    recap: ['Global per-adult intake declined between 2010 and 2019.', 'Moderation affects amount, mix and place.', 'No/low and premiumisation can grow while volume softens.', 'Vietnam’s at-home shift is directional, not quantified here.'],
    chapterRecap: 'Social change fragments the occasion rather than moving every consumer in one direction.',
    deepDiveTitle: 'Why moderation is a portfolio question',
    body: <DeepDive paragraphs={['A single consumer can buy premium spirit as a gift, drink value beer at home and choose no-alcohol beer before driving. Segmenting only by age or income misses that movement.', 'The strategic unit is the occasion: who is present, where it happens, whether driving follows and how much the consumer wants to spend.', 'That is why a company can report premium and no/low growth at the same time. Both respond to a wish for more control, one through quality and one through alcohol content.']} caveat="The Heineken 0.0 figure is company-reported global volume growth, not a Vietnam market statistic. Vietnam channel migration was not quantified." />,
    sources: cite('s7', 's8', 's13', 's15', 's23'),
  }),
  chapter({
    title: 'Technology and Production Innovation', chapterTitle: LESSON, readingTime: '5',
    objective: 'Classify innovation into production, product and route-to-market tools and connect each to a specific industry constraint.',
    mateIntro: 'The best brewing technology is not always a shinier tank. Sometimes it is a process that removes alcohol without removing taste, or data that tells a sales team which shop is out of stock.',
    keyInsight: 'Innovation creates value when it answers a constraint: production tools improve consistency and resource use, no/low technology answers moderation, and digital tools improve reach across fragmented outlets.',
    narrative: [
      { label: 'What it is', text: 'Technology innovation spans the plant, the product and the route to market. It includes process control and quality systems, alcohol-removal and flavour-retention methods, packaging formats, e-commerce and outlet data.' },
      { label: 'How it works', text: 'Plant technology reduces variation, waste, water and energy. Product technology creates a drink that meets a new need, such as no/low beer. Route-to-market tools help a brewer plan inventory, promotions and visits across thousands of outlets.' },
      { label: 'Global example', text: 'Heineken reported Heineken 0.0 volume up 10% in 2024, ahead of its 1.6% total beer-volume growth. The figures do not prove the technology caused demand, but they show that a technology-enabled product can grow faster than the base portfolio.' },
      { label: 'Vietnam example', text: 'Vietnam’s scale plants operate with modern quality systems, while Sabeco’s reach into more than 200,000 shops creates a clear use case for digital execution and demand data. The research did not verify adoption rates or efficiency gains at Vietnamese plants.' },
      { label: 'Why it matters', text: 'Innovation should be judged by the constraint it removes and the measurable outcome it changes, not by novelty alone.' },
    ],
    visualKind: 'beer-m1-15-4-technology', visualHeading: 'Three technology arenas', visualIntro: 'Connect each tool to the constraint it solves, then read the measured global no/low example.', imageAlt: 'Technology framework across production, product and route to market',
    keyTerms: [{ term: 'Process control', definition: 'Sensors, standards and feedback that keep production within a desired range.' }, { term: 'Alcohol removal', definition: 'Technology that reduces ethanol after or during brewing while preserving flavour.' }, { term: 'Digital trade marketing', definition: 'Using data and digital tools to plan and measure promotions at outlets.' }, { term: 'Quick-commerce', definition: 'Very fast local delivery ordered through a digital platform.' }],
    recap: ['Technology acts in the plant, product and route to market.', 'No/low beer is a technology-enabled response to moderation.', 'Outlet data matters in a fragmented trade.', 'Vietnam adoption and efficiency gains were not quantified.'],
    chapterRecap: 'Name the constraint, then judge the innovation by the outcome it changes.',
    deepDiveTitle: 'From invention to operating advantage',
    body: <DeepDive paragraphs={['A process tool becomes an advantage only when it improves yield, consistency, safety or resource use at scale. A pilot with no operating metric is still an experiment.', 'Product innovation follows the same rule. No/low beer must deliver taste and an occasion, not merely a technical alcohol reading.', 'Digital distribution matters because physical reach is still the moat. Data helps a salesperson choose the right visit and stock level; it does not replace the outlet relationship.']} caveat="No plant-level water, energy, yield or digital-adoption metrics for Vietnam were primary-verified. The no/low growth figure is company-reported." />,
    sources: cite('s13', 's14', 's15', 'rec'),
  }),
  chapter({
    title: 'Environmental and Sustainability Pressures', chapterTitle: LESSON, readingTime: '6',
    objective: 'Trace environmental exposure from agricultural inputs through brewing, packaging and logistics and identify operational responses without inventing unverified savings.',
    mateIntro: 'Every drink begins with a crop and water, then leaves the plant in a package. Climate, heat, refrigeration, glass and aluminium make sustainability a supply and operations question before it becomes a marketing claim.',
    keyInsight: 'Environmental pressure runs across the lifecycle: climate affects crops, plants use water and energy, packaging drives material and transport load, and heavy beer rewards local production and recovery systems.',
    narrative: [
      { label: 'What it is', text: 'Sustainability in alcohol covers agricultural resilience, water and energy, emissions, packaging, waste and post-consumer recovery. Each pillar has a different hotspot.' },
      { label: 'How it works', text: 'Beer plants heat, cool and clean large liquid volumes; packaging adds glass, aluminium, PET and transport weight. Wine depends directly on climate-sensitive grapes. Spirits add years of storage. Responses include efficiency, lighter or reusable packs, spent-grain recovery, carbon-dioxide recovery and more resilient sourcing.' },
      { label: 'Global example', text: 'OIV reports global wine production of about 225.8 million hectolitres in 2024, roughly a 60-year low, with extreme weather cited in the research. That shows environmental pressure arriving first as supply volatility.' },
      { label: 'Vietnam example', text: 'Vietnam’s breweries depend on water, refrigeration and imported barley and hops. Intermalt localises malting and can shorten one link, but the upstream remains exposed to foreign crops, climate and freight. The research did not verify Vietnam plant water intensity or recycling rates.' },
      { label: 'Why it matters', text: 'Environmental performance affects cost, continuity and licence to operate. The strongest claim is an operational metric with a year, unit and boundary, not a general promise.' },
    ],
    visualKind: 'beer-m1-15-5-environment', visualHeading: 'Lifecycle pressure and response', visualIntro: 'Follow the drink from farm to market, then compare reduce, recover and resilience actions.', imageAlt: 'Alcohol lifecycle environmental pressure and operational response framework',
    keyTerms: [{ term: 'Water intensity', definition: 'Water used per unit of output, often litres of water per hectolitre of beer.' }, { term: 'Packaging footprint', definition: 'Material, energy and transport impacts associated with a bottle, can, keg or carton.' }, { term: 'By-product recovery', definition: 'Turning outputs such as spent grain or carbon dioxide into useful inputs or products.' }, { term: 'Supply resilience', definition: 'The ability to continue operating through climate, commodity and logistics shocks.' }],
    recap: ['Climate affects crops and wine supply.', 'Plants use water, heat, cooling and cleaning.', 'Packaging is a major material and transport issue.', 'Use verified operational metrics before claiming improvement.'],
    chapterRecap: 'Environmental pressure is a cost and continuity issue across the whole lifecycle.',
    deepDiveTitle: 'What a credible sustainability claim looks like',
    body: <DeepDive paragraphs={['A credible claim defines the baseline year, the unit of output, the operating boundary and the source. “Water use fell to X litres per hectolitre in a named plant” is testable; “water positive” without a boundary is not.', 'Circular actions also need boundaries. Selling spent grain as animal feed avoids waste, but the avoided impact depends on what it replaces. Reusable bottles save material only if return rates and cleaning are accounted for.', 'This module therefore teaches the pressure and response without inventing savings. Later analysis should add plant-level metrics when audited or primary data become available.']} caveat="No verified Vietnam brewery water-intensity, energy-intensity, packaging-recycling or emissions series was available. OIV data were read through trade-press reporting of the annual release." />,
    sources: cite('s10', 's11', 's12', 's15', 'rec'),
  }),
];

const quizItems = quiz('beer-15', [
  { c: '1', o: 'Explain profit pressure', q: 'Why can brewer profit fall faster than revenue when volume weakens?', a: 'Fixed costs are spread over fewer litres while imported input costs may remain high', w: ['Excise automatically disappears', 'All packaging becomes free', 'Market share is guaranteed'], e: 'Operating leverage and input inflation can amplify the profit effect of a revenue decline.' },
  { c: '1', o: 'Read the 2023 stress test', q: 'Which 2023 measure in the research fell 16.5%?', a: 'Vietnam Brewery volume', w: ['Global beer consumption', 'Sabeco factory count', 'Vietnam wine exports'], e: 'Trade reporting put Vietnam Brewery volume down 16.5% in the period cited.' },
  { c: '2', o: 'Recall the excise path', q: 'What beer and strong-liquor SCT rate does the reported enacted path reach in 2031?', a: '90%', w: ['65%', '70%', '100%'], e: 'AFP reporting on Law No. 66/2025/QH15 describes a rise from the 65% baseline to 90% by 2031.' },
  { c: '2', o: 'Explain channel impact', q: 'What was the immediate strategic effect of stricter drink-driving enforcement?', a: 'It discouraged some on-trade occasions and encouraged a shift toward home', w: ['It removed all excise tax', 'It made beer cheaper to import', 'It increased legal driving limits'], e: 'Enforcement changes the cost and risk of travelling after social drinking, so occasions can move.' },
  { c: '3', o: 'Read the moderation trend', q: 'What happened to global pure-alcohol consumption per adult from 2010 to 2019, according to WHO?', a: 'It fell from 5.7 to 5.5 litres', w: ['It rose from 5.5 to 5.7 litres', 'It stayed at 9.2 litres', 'It doubled'], e: 'WHO reports a small but meaningful decline over the period.' },
  { c: '3', o: 'Interpret social change', q: 'Which statement best captures moderation?', a: 'People may drink less, trade up, choose no/low or move the occasion', w: ['Every consumer stops drinking at once', 'Only premium spirits grow', 'Channel choice never changes'], e: 'Moderation fragments behaviour across amount, mix and place.' },
  { c: '4', o: 'Classify innovation', q: 'Which is a route-to-market technology?', a: 'Outlet-level execution data for inventory and promotions', w: ['Pure lager yeast', 'Oak maturation', 'Growing barley'], e: 'Route-to-market tools improve decisions across distributors and outlets.' },
  { c: '4', o: 'Judge innovation', q: 'What is the best first question for evaluating a new technology?', a: 'Which constraint does it remove and which outcome changes?', w: ['Is it the newest idea?', 'Does it use the most screens?', 'Can it avoid measurement?'], e: 'Innovation creates operating value only when it changes a relevant outcome.' },
  { c: '5', o: 'Locate environmental exposure', q: 'Which category is especially exposed to climate through its farm input?', a: 'Wine through grapes', w: ['Beer through bar codes', 'Spirits through retail shelves', 'All drinks only after sale'], e: 'OIV’s low global wine output illustrates the direct link from weather to grape supply.' },
  { c: '5', o: 'Recognise a credible claim', q: 'Which evidence makes a sustainability claim most credible?', a: 'A named baseline year, unit, boundary and verified source', w: ['A general promise with no metric', 'A decorative green label', 'An estimate with no geography'], e: 'Operational claims need a measurable and reproducible boundary.' },
]);

export const LESSON_1_5: BeerLessonBundle = {
  deck,
  quiz: quizItems,
  takeaways: {
    learned: 'You can explain the economic, regulatory, social, technological and environmental forces that reshape alcoholic beverages and connect each force to volume, value, channel, portfolio and operations.',
    keyTakeaways: ['Income helps demand, but price, cost and confidence decide how much reaches profit.', 'Vietnam’s drink-driving and excise rules are major structural swing factors.', 'Moderation changes amount, mix and place rather than moving everyone identically.', 'Technology creates value when it removes a production, product or distribution constraint.', 'Environmental pressure runs from crops and water through packaging and logistics.'],
    businessImplications: 'The winning response is cross-functional: finance models price and tax, commercial teams move channels and packs, innovation develops no/low products, operations improve efficiency and compliance keeps every response inside the rules.',
    remember: 'Use the PESTEL lens, then trace each external force through consumer behaviour to company economics.',
    nextLesson: 'Module 02 — Industry Value Chain',
  },
  visuals: {
    'beer-m1-15-1-economic': EconomicVisual,
    'beer-m1-15-2-regulation': RegulationVisual,
    'beer-m1-15-3-social': SocialVisual,
    'beer-m1-15-4-technology': TechnologyVisual,
    'beer-m1-15-5-environment': EnvironmentVisual,
  },
};
