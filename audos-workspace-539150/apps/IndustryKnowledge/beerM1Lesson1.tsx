import { Arrow, Box, DeepDive, Frame, SvgWrap, Txt, chapter, cite, quiz, MUTED } from './beerM1Core';
import type { BeerLessonBundle } from './beerM1Core';

const LESSON = '1.1 Industry Definition & Scope';

function EcosystemVisual() {
  return (
    <Frame title="The alcoholic beverages ecosystem" subtitle="Who takes part between the farm and the glass, and where the State sits." takeaway="The State is not a bystander: it taxes, licenses and sets the rules across every step from producer to drinker." note="Footprint figures are trade-body or self-reported (Brewers of Europe 2025; Heineken Vietnam 2020; Sabeco 2023-24), not official statistics.">
      <SvgWrap w={720} h={470} label="Ecosystem map from inputs to producers, distributors, outlets and drinkers, overseen by the State">
        <Box x={0} y={0} w={720} h={66} tone="navy" center title="The State: excise tax, licensing, drink-driving and advertising rules" body="Vietnam: Special Consumption Tax on beer is 65% today. Global: WHO tracks the health impact." size={12.5} />
        <Arrow x1={360} y1={66} x2={360} y2={104} red dashed />
        <Txt x={372} y={92} text="oversees every step" size={12} fill={MUTED} />
        <Box x={0} y={112} w={134} h={170} title="Inputs" body={['Barley, hops, grapes, grains', 'Glass, cans, kegs', 'Maltsters such as Intermalt (Vietnam)']} size={12} />
        <Box x={146} y={112} w={134} h={170} tone="red" title="Producers" body={['Brewers', 'Vintners', 'Distillers']} size={12} />
        <Box x={292} y={112} w={134} h={170} title="Distributors and wholesalers" body={['Carry stock and extend credit', 'Break bulk to reach small outlets']} size={12} />
        <Box x={438} y={112} w={146} h={170} title="On-trade and off-trade" body={['On-trade: bars, restaurants, beer clubs', 'Off-trade: supermarkets, convenience and traditional shops']} size={11.5} />
        <Box x={596} y={112} w={124} h={170} tone="tint" title="Drinkers" body={['Choose by occasion and price', 'Pay excise inside the price']} size={12} />
        <Arrow x1={134} y1={197} x2={146} y2={197} />
        <Arrow x1={280} y1={197} x2={292} y2={197} />
        <Arrow x1={426} y1={197} x2={438} y2={197} />
        <Arrow x1={584} y1={197} x2={596} y2={197} />
        <Box x={0} y={304} w={352} h={112} tone="soft" title="Global footprint" body={['Europe: ~10,000 breweries, ~2 million jobs and ~EUR52 billion of value added (2025)', 'Asia holds 32.6% of global beer consumption (2024)']} size={12} />
        <Box x={368} y={304} w={352} h={112} tone="soft" title="Vietnam footprint" body={['Heineken Vietnam says it supports ~200,000 jobs and ~0.75% of GDP (self-reported, 2020)', 'Sabeco serves 200,000+ shops through 11 trading companies']} size={12} />
        <Txt x={0} y={446} text="Associations coordinate and lobby: The Brewers of Europe; in Vietnam, the Vietnam Beer-Alcohol-Beverage Association (VBA) and VCCI." size={12} fill={MUTED} max={112} />
      </SvgWrap>
    </Frame>
  );
}

function TraitsVisual() {
  const rows = [
    ['The State is a participant', 'Collects excise inside the shelf price, licenses sellers and sets drink-driving and advertising rules.', 'Vietnam: Special Consumption Tax on beer is 65% today. WHO: about 2.6 million alcohol-related deaths in 2019.'],
    ['Beer travels little, spirits travel far', 'Heavy, low-value beer is brewed in each market. High-value, aged spirits are made at an origin and exported.', 'Global: Scotch and cognac are exported worldwide. Vietnam: Vung Tau brews ~1.1 billion litres a year locally.'],
    ['Value sits in brand and aged stock', 'The price gap between a value and a premium drink is mostly brand, packaging and, for spirits, maturation.', 'Scotch must mature 3+ years and cognac X.O. 10+ years (secondary source), tying up stock before any sale.'],
    ['Distribution reach decides sales', 'The trade is fragmented, so being available often decides the purchase.', 'Vietnam: Sabeco reaches 200,000+ shops through 11 trading companies.'],
    ['Demand follows health and rules', 'Moderation, enforcement and tax can move volume faster than taste.', 'Global: 5.7 to 5.5 litres per adult (2010-2019). Vietnam: drink-driving rule enforced from January 2020.'],
  ];
  return (
    <Frame title="Five traits that set alcohol apart" subtitle="Each trait changes how companies compete, with one piece of evidence from the research." takeaway="Alcohol is a branded consumer product and a regulated, taxed one at the same time." note="Maturation minimums come from a retailer blog that matches standard Scotch and cognac rules; primary legal text was not checked. Vung Tau output is a vendor figure (Astute Analytica, 2024).">
      <SvgWrap w={720} h={520} label="Matrix of five traits, what each changes and the evidence">
        <Txt x={4} y={14} text="TRAIT" size={11} weight={800} fill={MUTED} />
        <Txt x={204} y={14} text="WHAT IT CHANGES" size={11} weight={800} fill={MUTED} />
        <Txt x={474} y={14} text="EVIDENCE" size={11} weight={800} fill={MUTED} />
        {rows.map((row, index) => (
          <g key={row[0]}>
            <Box x={0} y={24 + index * 98} w={192} h={90} tone={index === 0 ? 'red' : 'navy'} title={row[0]} size={12.5} titleSize={14} center />
            <Box x={202} y={24 + index * 98} w={262} h={90} body={row[1]} size={12.5} />
            <Box x={474} y={24 + index * 98} w={246} h={90} tone="tint" body={row[2]} size={12} />
          </g>
        ))}
      </SvgWrap>
    </Frame>
  );
}

function BoundariesVisual() {
  return (
    <Frame title="Where the industry begins and ends" subtitle="The chain sets which businesses belong; strength and trade class set which drinks count." takeaway="Check what a statistic counts. Beer-only, all-alcohol and all-alcohol-plus-RTD numbers describe different boundaries." note="HS headings are from the WCO Harmonized System, Chapter 22. Rượu classification depends on process (Module 01 research record).">
      <SvgWrap w={720} h={494} label="Chain boundary and product boundary diagram">
        <Txt x={0} y={14} text="ALONG THE CHAIN: IN SCOPE FROM INPUT PURCHASE TO THE DRINKER" size={11} weight={800} fill={MUTED} />
        <Box x={0} y={26} w={165} h={104} title="Upstream inputs" body="Barley, hops, grapes, grains and packaging" size={12.5} />
        <Box x={185} y={26} w={165} h={104} tone="red" title="Conversion" body="Brewing, fermenting, distilling, maturing, bottling" size={12.5} />
        <Box x={370} y={26} w={165} h={104} title="Distribution" body="Distributors, wholesalers and logistics" size={12.5} />
        <Box x={555} y={26} w={165} h={104} tone="tint" title="Sale and drinking" body="On-trade bars and restaurants; off-trade retail" size={12.5} />
        <Arrow x1={165} y1={78} x2={185} y2={78} />
        <Arrow x1={350} y1={78} x2={370} y2={78} />
        <Arrow x1={535} y1={78} x2={555} y2={78} />
        <Txt x={0} y={172} text="ACROSS PRODUCTS: STRENGTH AND TRADE CLASS" size={11} weight={800} fill={MUTED} />
        <Box x={0} y={184} w={130} h={170} tone="outline" title="Edge: no/low-alcohol" body={['Below ~0.5% ABV', 'A bridge to the non-alcoholic category']} size={12} />
        <Box x={142} y={184} w={130} h={170} title="Beer" body={['HS 2203', '~5% ABV', 'Brewed from malt']} size={12} />
        <Box x={284} y={184} w={130} h={170} title="Wine and vermouth" body={['HS 2204, 2205', '~12% ABV', 'Fresh grapes; flavoured grape wine']} size={12} />
        <Box x={426} y={184} w={130} h={170} title="Spirits and liqueurs" body={['HS 2208', '~40% ABV', 'Below 80% vol']} size={12} />
        <Box x={568} y={184} w={152} h={170} tone="outline" title="Border: neat alcohol" body={['HS 2207', 'Ethyl alcohol at 80% vol or more', 'An industrial input, not a drink']} size={12} />
        <Box x={0} y={372} w={720} h={74} tone="tint" title="Also in scope: other fermented drinks (HS 2206)" body="Cider, perry, mead and sake. Vietnamese rượu can fall under spirits (HS 2208) or fermented drinks (HS 2206), depending on the process." size={12.5} />
        <Txt x={0} y={474} text="Solid outline = in scope. Dashed red outline = edge or border case." size={11.5} fill={MUTED} />
      </SvgWrap>
    </Frame>
  );
}

function ClassificationVisual() {
  return (
    <Frame title="Beer, wine and spirits: one family tree" subtitle="Production method sets strength, trade class and industry structure." takeaway="One extra step, distillation, turns a fermented drink into a spirit and changes strength, stock held and how far the product travels." note="Typical strengths are the WHO standard conversion factors (beer 5%, wine 12%, spirits 40%). Brewer ranking is BarthHaas 2022 via trade press; Vietnam beer share is a vendor estimate (Astute Analytica, 2024).">
      <SvgWrap w={720} h={522} label="Classification tree of beer, wine, other fermented drinks and spirits with industry structure">
        <Box x={200} y={0} w={320} h={64} tone="navy" center title="Alcoholic beverages" body="ethanol above ~0.5% ABV" size={12.5} titleSize={15} />
        <Arrow x1={330} y1={64} x2={230} y2={92} />
        <Arrow x1={390} y1={64} x2={585} y2={92} />
        <Box x={20} y={92} w={420} h={42} tone="red" center title="FERMENTED" />
        <Box x={470} y={92} w={230} h={42} tone="red" center title="FERMENTED, THEN DISTILLED" size={12} />
        <Box x={20} y={152} w={128} h={156} title="Beer" body={['~5% ABV', 'HS 2203', 'Brewed from malted cereals; ferments in about 1-2 weeks']} size={12} />
        <Box x={158} y={152} w={128} h={156} title="Wine" body={['~12% ABV', 'HS 2204; vermouth 2205', 'Fermented grapes or fruit']} size={12} />
        <Box x={296} y={152} w={144} h={156} title="Other fermented" body={['Varies by drink', 'HS 2206', 'Cider, perry, mead, sake']} size={12} />
        <Box x={470} y={152} w={230} h={156} title="Spirits and liqueurs" body={['~40% ABV', 'HS 2208', 'Distilled from a fermented base, then usually matured in oak']} size={12} />
        <Txt x={0} y={334} text="INDUSTRY STRUCTURE" size={11} weight={800} fill={MUTED} />
        <Box x={20} y={344} w={128} h={92} tone="tint" title="Concentrated" body="Top 4 groups ~60% of top-40 output (2022)" size={11.5} />
        <Box x={158} y={344} w={128} h={92} tone="tint" title="Fragmented" body="Millions of estates and négociants" size={11.5} />
        <Box x={296} y={344} w={144} h={92} tone="soft" title="Not profiled" body="Outside the research record" size={11.5} />
        <Box x={470} y={344} w={230} h={92} tone="tint" title="Concentrated" body="Global brand houses such as Diageo and Pernod Ricard, holding aged stock" size={11.5} />
        <Box x={0} y={454} w={720} h={60} tone="navy" center title="Vietnam: beer is ~91% of alcohol consumed; spirits are domestic rượu plus imported whisky and cognac; wine is small and import-reliant" size={12} titleSize={12.5} />
      </SvgWrap>
    </Frame>
  );
}

function ConsumersVisual() {
  return (
    <Frame title="Trade customers and drinkers" subtitle="Producers sell to the trade; drinkers choose by occasion." takeaway="Sell to the trade, build for the drinker: distribution wins the shelf, occasion wins the purchase." note="Vietnam segmentation by age, income or gender was not verified in the research, so occasions are shown qualitatively. WHO figure: 2019.">
      <SvgWrap w={720} h={474} label="Producers, trade customers and drinkers, with three consumption occasions">
        <Box x={0} y={0} w={150} h={86} tone="red" center title="Producers" body="Brewers, vintners, distillers" size={12.5} />
        <Box x={200} y={0} w={270} h={86} tone="navy" center title="Trade customers" body="Distributors, retailers, bars and restaurants buy for resale" size={12.5} />
        <Box x={520} y={0} w={200} h={86} tone="tint" center title="Drinkers" body="Choose by occasion, price and taste" size={12.5} />
        <Arrow x1={150} y1={43} x2={200} y2={43} />
        <Arrow x1={470} y1={43} x2={520} y2={43} />
        <Txt x={0} y={124} text="THREE OCCASIONS DRIVE WHAT THE DRINKER BUYS" size={11} weight={800} fill={MUTED} />
        <Box x={0} y={136} w={232} h={206} title="Social, on-premise" body={['Channel: on-trade (bars, restaurants, clubs)', 'Pull: volume and brand-building', 'Vietnam: quán nhậu and beer-club culture']} size={12.5} />
        <Box x={244} y={136} w={232} h={206} title="Everyday, at home" body={['Channel: off-trade (supermarkets, convenience, traditional shops)', 'Pull: value beer and ready-to-drink', 'Vietnam: occasions moving home since Decree 100']} size={12.5} />
        <Box x={488} y={136} w={232} h={206} title="Special occasions" body={['Channel: both, plus gifting', 'Pull: premium and aged spirits', 'Evidence limit: no verified Vietnam segmentation data']} size={12.5} />
        <Box x={0} y={364} w={720} h={98} tone="tint" title="Moderation overlay" body="WHO: global consumption per adult fell from 5.7 to 5.5 litres of pure alcohol (2010-2019). Price sensitivity pushes some drinkers to trade down, while health-consciousness pushes others toward no/low-alcohol." size={12.5} />
      </SvgWrap>
    </Frame>
  );
}

const deck = [
  chapter({
    title: 'What Is the Alcoholic Beverages Industry?', chapterTitle: LESSON, readingTime: '5',
    objective: 'Define the alcoholic beverages industry, explain what it covers and place it at global and Vietnam scale.',
    mateIntro: 'Raise a glass at a family dinner in Hanoi, a pub in Prague or a rooftop in Ho Chi Minh City and you are touching one of the oldest and most tightly regulated consumer industries. Before we study how it works, let’s agree on what it actually is.',
    keyInsight: 'The alcoholic beverages industry makes, moves and sells drinks with ethanol above roughly 0.5% alcohol by volume, organised around three production methods: brewing beer, fermenting wine and distilling spirits.',
    narrative: [
      { label: 'What it is', text: 'The industry covers every commercially produced drink with ethanol above about 0.5% ABV, plus the businesses that make, distribute and sell it. Three families anchor it: beer, brewed from malted cereals at typically about 5% ABV; wine, fermented from grapes or fruit at about 12%; and spirits, distilled to about 40%.' },
      { label: 'How it works', text: 'A producer turns farm inputs into a branded drink, distributors and outlets get it to the drinker, and the State sits across the whole chain, collecting excise tax and licensing sellers. Because these drinks are taxed, age-restricted and linked to public-health harm, the industry is as much a regulated-product business as a consumer-goods business.' },
      { label: 'Global example', text: 'Kirin Holdings’ annual tracker puts global beer consumption at about 194.12 million kilolitres in 2024, up 0.5% year on year. That is a brewer-compiled estimate, not an official statistic. The World Health Organization offers the official lens: 5.5 litres of pure alcohol per person aged 15 and over in 2019.' },
      { label: 'Vietnam example', text: 'Astute Analytica valued Vietnam’s beer market at about US$7.89 billion in 2024, a commercial estimate rather than official data. Beer is reported to be about 91% of the alcohol Vietnamese adults drink, so “alcoholic beverages” in Vietnam is largely a beer story.' },
      { label: 'Why it matters', text: 'If you cannot draw the boundary, you cannot read a market number, compare two companies or know which rules apply. Size, structure and drivers, the rest of this module, all rest on this definition.' },
    ],
    visualKind: 'beer-m1-11-1-ecosystem', visualHeading: 'The industry as one connected system', visualIntro: 'Follow a drink from inputs to the drinker and see where the State sits in the picture.',
    imageAlt: 'Ecosystem map of the alcoholic beverages industry overseen by the State',
    statTiles: [
      { value: '~0.5% ABV', label: 'Working threshold', description: 'Drinks above this level are treated as alcoholic here; no/low beer sits at the boundary.' },
      { value: '194.12M kL', label: 'Global beer consumption, 2024', description: 'Kirin Holdings tracker, a brewer-compiled industry estimate.' },
      { value: '~US$7.89B', label: 'Vietnam beer market, 2024', description: 'Astute Analytica commercial estimate, not official statistics.' },
    ],
    keyTerms: [{ term: 'ABV', definition: 'Alcohol by volume, the share of a drink that is ethanol.' }, { term: 'Ethanol', definition: 'The alcohol in beer, wine and spirits, produced by fermentation.' }, { term: 'Excise tax', definition: 'A tax on a specific product, collected inside the shelf price of alcohol.' }, { term: 'Pure alcohol', definition: 'A common unit that converts beer, wine and spirits into litres of ethanol for comparison.' }],
    recap: ['The industry covers drinks above ~0.5% ABV and the businesses that make and sell them.', 'Beer, wine and spirits are the three anchor families.', 'The State is part of the chain through tax and licensing.', 'In Vietnam, the industry is largely a beer story (vendor estimate).'],
    chapterRecap: 'Define the boundary first, then read every market number against it.',
    deepDiveTitle: 'What the definition includes, and what the numbers can and cannot tell you',
    body: <DeepDive paragraphs={['The 0.5% ABV line is a working threshold. It separates drinks that behave like alcohol, with excise tax, licensing and age limits, from the non-alcoholic category. Low- and no-alcohol beer sits right at the edge, which is why it appears again in later chapters as a bridge between two industries.', 'The three families differ in how they are made, taxed and sold, but they share a chain: inputs, conversion, distribution, sale. WHO uses standard strengths of 5%, 12% and 40% to express any drink in litres of pure alcohol, which is what makes beer, wine and spirits comparable at all.', 'Be careful with scale figures. The global beer number is a brewer-compiled tracker and the Vietnam value is a vendor estimate. They are useful anchors, not official statistics.']} caveat="The ~0.5% ABV threshold is this module’s working definition; national legal definitions were not compared in the research. The Vietnam market value and the ~91% beer share are Astute Analytica estimates, not statistics-office data." />,
    sources: cite('s1', 's6', 's7', 's8', 's9'),
  }),
  chapter({
    title: 'What Makes This Industry Unique?', chapterTitle: LESSON, readingTime: '5',
    objective: 'Identify five characteristics that set alcoholic beverages apart from other consumer goods and explain how each shapes company strategy.',
    mateIntro: 'A bottle of lager and a bottle of lemonade can sit on the same shelf, yet the companies behind them live by different rules. Alcohol carries a tax bill, a licence and a public-health debate that lemonade does not.',
    keyInsight: 'Five traits define the industry: the State is a core participant, beer is made near the drinker while spirits travel, value sits in brands and aged stock, distribution reach decides sales, and demand follows health and regulation as much as taste.',
    narrative: [
      { label: 'What it is', text: 'Unlike most fast-moving consumer goods, alcohol combines heavy regulation, high taxes, farm-based inputs and a product whose harms are tracked by the World Health Organization. These traits appear across beer, wine and spirits, though not equally.' },
      { label: 'How it works', text: 'Four mechanics follow. Excise tax is collected inside the shelf price, so the State shares in every sale. Beer is heavy, low-value liquid, so brewers build breweries in each market, while high-value spirits that age for years are made at an origin and exported. The price gap between a value drink and a premium one is mostly brand, packaging and maturation. And alcohol is sold business-to-business-to-consumer: regulation tightly limits direct sales to drinkers.' },
      { label: 'Global example', text: 'WHO reports that alcohol caused about 2.6 million deaths in 2019, 4.7% of all deaths, which is why policy pressure on volumes is structural. Spirits show the asset-heavy model: Scotch must mature at least three years and cognac X.O. at least ten, so distillers finance stock long before any sale.' },
      { label: 'Vietnam example', text: 'The State’s role is visible on the Vietnamese shelf price: the Special Consumption Tax on beer is 65% today and, under Law No. 66/2025/QH15 as reported, is set to climb toward 90% by 2031. The 2019 alcohol-harm law also bans driving after any alcohol, a zero-tolerance rule that moved drinking from bars toward home.' },
      { label: 'Why it matters', text: 'These traits explain why alcohol companies focus on distribution, premium mix and managing regulation, not just on taste. They also tell you which numbers to question: a falling volume can hide rising value.' },
    ],
    visualKind: 'beer-m1-11-2-traits', visualHeading: 'Five traits, one evidence point each', visualIntro: 'Read across each row: the trait, what it changes in strategy, and a global or Vietnam proof point.',
    imageAlt: 'Matrix of five traits that make alcoholic beverages unique',
    keyTerms: [{ term: 'Value density', definition: 'How much a product is worth relative to its weight and volume, which decides whether it is worth shipping far.' }, { term: 'B2B2C', definition: 'Business-to-business-to-consumer: producers sell to the trade, which sells to drinkers.' }, { term: 'Maturation', definition: 'Ageing a spirit, usually in oak, for years before sale.' }, { term: 'Special Consumption Tax (SCT)', definition: 'Vietnam’s excise tax on alcohol, collected inside the shelf price.' }],
    recap: ['The State shares in every sale through excise tax and licensing.', 'Beer is brewed locally; aged spirits are exported from an origin.', 'Brand, packaging and maturation explain most price gaps.', 'Health and regulation can move demand faster than taste.'],
    chapterRecap: 'Alcohol is a branded product and a regulated, taxed one at the same time.',
    deepDiveTitle: 'Why these five traits recur across the industry',
    body: <DeepDive paragraphs={['Each trait follows from the product. Ethanol brings health costs, so governments tax and license it. Beer is mostly water and cheap to make but costly to ship, so it is brewed near the drinker, while a spirit that is aged and valuable can be shipped across oceans.', 'Because liquids are similar and the trade is fragmented, brand and availability decide a great deal. That is why distribution breadth, such as Sabeco’s reach into 200,000+ shops, is described as a moat rather than a cost.', 'Finally, demand is not only about taste. The WHO’s decline in per-adult consumption and Vietnam’s drink-driving enforcement both show demand being reshaped from outside the market.']} caveat="The Scotch and cognac maturation minimums come from a retailer blog (illustrative, secondary source); they match standard regulations but primary legal text was not checked. The SCT path to 90% is as reported by AFP; the full statutory schedule was not read from the legal gazette." />,
    sources: cite('s3', 's7', 's8', 's14', 's16', 's23'),
  }),
  chapter({
    title: 'Where Does the Industry Begin and End?', chapterTitle: LESSON, readingTime: '5',
    objective: 'Locate the industry’s boundaries along the chain and at its product edges: what is clearly in scope, what sits at the border and what lies outside.',
    mateIntro: 'Is a barley farmer part of the alcoholic beverages industry? What about a no-alcohol beer, a hard seltzer or a bottle of rượu? Boundaries decide whose revenue gets counted.',
    keyInsight: 'The industry begins where inputs are bought for drink-making and ends where the drinker consumes. Its edges are fuzzy: no/low beer sits at the 0.5% ABV line, ready-to-drink products blur categories, and traditional spirits can fall into two trade classes.',
    narrative: [
      { label: 'What it is', text: 'A boundary has two dimensions. Along the chain: upstream inputs, midstream conversion such as brewing, fermenting and distilling, and downstream distribution and sale. Across products: which drinks count as alcoholic at all.' },
      { label: 'How it works', text: 'Analysts use two tools. The chain view shows which businesses belong. The product view uses the WCO Harmonized System, Chapter 22: 2203 beer from malt, 2204 wine of fresh grapes, 2205 vermouth, 2206 other fermented drinks such as cider, perry, mead and sake, 2207 undenatured ethyl alcohol at 80% or more, and 2208 spirits and liqueurs. Edge cases such as beer below 0.5% ABV are judged by strength and process.' },
      { label: 'Global example', text: 'Ready-to-drink (RTD) products sit across categories. An industry compilation of IWSR and NielsenIQ data reports that about 83% of hard seltzers are malt-based, yet counts RTD plus ready-to-serve drinks as a US$13.9 billion global category, about 12.5% of beverage-alcohol value. In Europe, about 1 in 12 beers sold is already non-alcoholic.' },
      { label: 'Vietnam example', text: 'Vietnamese rice wine, rượu, can fall under distilled spirits (HS 2208) or fermented beverages depending on how it is made, so a “spirits” figure may or may not include it. Vietnam also needs imported barley and hops, which shows how the boundary runs back to farms outside the country.' },
      { label: 'Why it matters', text: 'The boundary changes the number. A beer statistic, an alcoholic beverages statistic and a beverage-alcohol-including-RTD statistic are different things. Always check what is counted before you compare.' },
    ],
    visualKind: 'beer-m1-11-3-boundaries', visualHeading: 'Two boundaries: the chain and the product', visualIntro: 'The top strip shows which businesses belong; the lower strip shows which drinks count and where the edges lie.',
    imageAlt: 'Diagram of the chain boundary and product boundary of the alcoholic beverages industry',
    keyTerms: [{ term: 'Harmonized System (HS)', definition: 'The international product code system used for customs and trade statistics.' }, { term: 'RTD', definition: 'Ready-to-drink: a packaged cocktail, hard seltzer or similar drink sold ready to consume.' }, { term: 'No/low-alcohol', definition: 'Drinks at or below roughly 0.5% ABV that sit at the edge of the industry.' }, { term: 'Neat alcohol', definition: 'Ethyl alcohol at 80% vol or more (HS 2207), an input rather than a finished drink.' }],
    recap: ['The industry spans inputs, conversion, distribution and sale.', 'HS Chapter 22 draws the official product lines.', 'No/low beer and RTDs sit at the edges.', 'Always check what a statistic counts.'],
    chapterRecap: 'Draw the boundary on the chain and on the product before you trust a number.',
    deepDiveTitle: 'Edge cases and why they matter',
    body: <DeepDive paragraphs={['The Harmonized System is built for customs, not for case studies, so it is a starting point. It still gives a shared language: a trade statistic for HS 2203 is beer from malt and nothing else.', 'RTDs show why edges move. A canned cocktail can be spirits-based or malt-based, and the tax and category treatment differ. Analysts often track RTDs separately from beer, wine and spirits for that reason.', 'No/low-alcohol beer is the other moving edge. It is made like beer but sits under the 0.5% line, so it connects this industry to the non-alcoholic beverages category rather than ending at a clean wall.']} caveat="The 83% malt-based share for hard seltzers comes from an OhBEV compilation of IWSR and NielsenIQ data and is US-focused. Which share of Vietnamese rượu production is formal or informal was not verified. ISIC and Vietnamese VSIC activity codes were not matched against a statistics-office source." />,
    sources: cite('s9', 's15', 's19', 'rec'),
  }),
  chapter({
    title: 'Understanding Beer, Wine, and Spirits', chapterTitle: LESSON, readingTime: '6',
    objective: 'Compare beer, wine and spirits by production method, strength, trade classification and industry structure.',
    mateIntro: 'Same molecule, very different businesses. A can of lager, a glass of wine and a shot of whisky all deliver ethanol, but how each is made decides cost, shelf life, regulation and who earns the profit.',
    keyInsight: 'Beer and wine are fermented; spirits are fermented, then distilled and usually matured. That one extra step changes strength (about 5%, 12% and 40% ABV), the stock a company must hold, how far the drink travels and how concentrated the industry is.',
    narrative: [
      { label: 'What it is', text: 'Three pillars separate by production method. Beer is brewed from malted cereals and fermented. Wine is fermented from grapes or fruit. Spirits are distilled from a fermented base to concentrate alcohol to roughly 40% ABV. WHO uses 5%, 12% and 40% as standard strengths to convert any drink into litres of pure alcohol.' },
      { label: 'How it works', text: 'Fermentation turns sugar into alcohol and carbon dioxide; beer ferments over roughly one to two weeks. Spirits add distillation, heating the fermented liquid in pot or column stills, then oak maturation. Ageing is where value and working capital sit: Scotch has a three-year minimum and cognac X.O. at least ten years.' },
      { label: 'Global example', text: 'Structure differs by pillar. The top four brewing groups, AB InBev, Heineken, China Resources Snow Breweries and Carlsberg, produced about 60% of the top-40 brewers’ roughly 1.67 billion hectolitres in 2022. Spirits concentrate around brand houses such as Diageo and Pernod Ricard. Wine is fragmented, with millions of estates and négociants and no dominant global player.' },
      { label: 'Vietnam example', text: 'Vietnam is overwhelmingly a beer market: about 91% of alcohol consumed is beer, per a vendor estimate. Spirits include domestic rượu plus imported whisky and cognac, and wine is a small, import-reliant segment. No verified size for Vietnamese wine or spirits exists in this research, so treat them qualitatively.' },
      { label: 'Why it matters', text: 'The pillar predicts the business model. Beer is a local, distribution-heavy volume business. Spirits are an export-led, aged-inventory brand business. Wine is a fragmented, climate-exposed farm business.' },
    ],
    visualKind: 'beer-m1-11-4-classification', visualHeading: 'A family tree of alcoholic drinks', visualIntro: 'Trace how each branch is made, how it is classified for trade, and how concentrated its industry is.',
    imageAlt: 'Classification tree of beer, wine, other fermented drinks and spirits',
    keyTerms: [{ term: 'Fermentation', definition: 'Yeast converting sugar into alcohol and carbon dioxide.' }, { term: 'Distillation', definition: 'Heating a fermented liquid and capturing the vapour to concentrate alcohol.' }, { term: 'Négociant', definition: 'A wine business that buys grapes or bulk wine and bottles under its own label.' }, { term: 'Working capital', definition: 'Money tied up in stock and receivables before the product is sold.' }],
    recap: ['Beer and wine are fermented; spirits are fermented then distilled.', 'Typical strengths are ~5%, ~12% and ~40% ABV.', 'Beer and spirits are concentrated; wine is fragmented.', 'Vietnam is a beer-led market with imported wine and premium spirits.'],
    chapterRecap: 'The production method sets strength, stock, reach and market structure.',
    deepDiveTitle: 'How the three pillars behave differently',
    body: <DeepDive paragraphs={['Beer is made from water, malted barley, hops and yeast, and packaging is often a bigger cost than the liquid itself. Because it is heavy and cheap to make, its supply chain stays local and scale in procurement and distribution drives advantage, which is why a few global groups dominate.', 'Wine depends on grapes, which are tied to place and weather. The research notes global wine production at roughly 60-year lows in 2024, on extreme weather, which shows how exposed the farm end is to climate.', 'Spirits draw on grains, grapes, molasses, agave or, in Vietnam, rice. Distillation and years of maturation make them high in value for their volume, so they are traded globally rather than brewed locally.']} caveat="The top-4 share is from the BarthHaas 2022 ranking reported by trade press; the primary PDF could not be read. Wine fragmentation and spirits concentration are qualitative statements from the research record, not measured ratios. WHO conversion strengths are standard factors stated from general WHO methodology." />,
    sources: cite('s6', 's9', 's10', 's16', 's20', 'rec'),
  }),
  chapter({
    title: 'Who Are the Industry’s Consumers?', chapterTitle: LESSON, readingTime: '5',
    objective: 'Distinguish the trade customer from the drinker and explain how occasions, channels and moderation shape who buys what.',
    mateIntro: 'A brewer sells to a distributor, a distributor sells to a corner shop and the corner shop sells to you. Which of them is the customer? In this industry the honest answer is all three, and they want different things.',
    keyInsight: 'The industry sells to the trade but builds for the drinker. Occasions, social on-premise, everyday at home and special, explain consumption better than any single demographic, and moderation is reshaping all of them.',
    narrative: [
      { label: 'What it is', text: 'Two customer layers exist. The trade, meaning distributors, retailers, bars and restaurants, buys from producers. The drinker is the end consumer, who chooses by occasion: social drinking in bars and restaurants (on-trade), everyday drinking at home (off-trade) and special occasions such as gifting and celebration.' },
      { label: 'How it works', text: 'Occasion predicts product and price. Social on-trade occasions carry volume and brand-building, at-home occasions favour value beer and ready-to-drink products, and special occasions pull premium or aged spirits. Age, income and gender refine the picture, while price sensitivity and health-consciousness push some drinkers to trade down and others to drink less but better.' },
      { label: 'Global example', text: 'WHO reports about 400 million people living with alcohol-use disorders and about 2.6 million alcohol-attributable deaths in 2019, even as consumption per adult fell from 5.7 to 5.5 litres of pure alcohol between 2010 and 2019. In ready-to-drink, an industry compilation reports about 45% of alcohol buyers in major markets bought an RTD in the past year in 2023.' },
      { label: 'Vietnam example', text: 'Vietnam’s consumer base is young and centred on beer, with adult per-capita pure alcohol estimated at about 8.3 litres, roughly 91% of it beer (vendor estimate). The 2019 alcohol-harm law’s zero-tolerance driving rule has moved occasions from bars toward home. Quantified Vietnamese segmentation by age, income or gender was not verified in this research.' },
      { label: 'Why it matters', text: 'Selling to the trade means winning distribution; building for the drinker means understanding occasions. A company that confuses the two misreads where demand is going.' },
    ],
    visualKind: 'beer-m1-11-5-consumers', visualHeading: 'Who buys, and on which occasion', visualIntro: 'See the two customer layers, then the three occasions that explain most of what drinkers choose.',
    imageAlt: 'Diagram of trade customers, drinkers and three consumption occasions',
    keyTerms: [{ term: 'On-trade', definition: 'Drinks sold for consumption on the premises: bars, restaurants, hotels and beer clubs.' }, { term: 'Off-trade', definition: 'Drinks sold in retail for consumption elsewhere, usually at home.' }, { term: 'Occasion', definition: 'The situation in which a drink is consumed, such as a social night out or a family meal.' }, { term: 'Trade down', definition: 'Switching to a cheaper product when budgets tighten.' }],
    recap: ['The trade buys from producers; drinkers choose by occasion.', 'Occasion predicts product, channel and price.', 'Moderation and price sensitivity are reshaping demand.', 'Vietnam is beer-centred and shifting occasions toward home.'],
    chapterRecap: 'Win the trade with distribution; win the drinker by understanding the occasion.',
    deepDiveTitle: 'Two customers, one product',
    body: <DeepDive paragraphs={['The trade customer cares about margin, availability, credit and support. A distributor extends credit to small outlets and breaks bulk, so its priorities differ from those of the drinker, who cares about taste, price and the moment.', 'Occasions matter because the same person drinks differently across them: a premium spirit for a gift, an everyday beer at home, and a social round at a bar. Companies build portfolios to cover each one.', 'Moderation is the structural counter-current. Global consumption per adult is slowly falling, and Vietnam’s enforcement is changing where people drink, which is why later lessons treat no/low and off-trade growth as consequences of the same forces.']} caveat="The ~45% RTD purchase figure is a marketing-agency compilation of IWSR and NielsenIQ data. Vietnam’s per-capita and beer-share figures are vendor estimates. A primary gender split and age or income segmentation for Vietnam were not sourced." />,
    sources: cite('s6', 's7', 's8', 's19', 's23'),
  }),
];

const quizItems = quiz('beer-11', [
  { c: '1', o: 'Define the industry boundary', q: 'Which strength is used in this module as the working line for an alcoholic drink?', a: 'About 0.5% ABV', w: ['About 5% ABV', 'About 12% ABV', 'About 40% ABV'], e: 'About 0.5% ABV is the working threshold. 5%, 12% and 40% are the typical strengths of beer, wine and spirits.' },
  { c: '1', o: 'Read Vietnam’s market structure', q: 'Roughly what share of the alcohol consumed in Vietnam is beer, according to the vendor estimate in the research?', a: 'About 91%', w: ['About 57%', 'About 75%', 'About 84%'], e: 'Astute Analytica reports beer at about 91% of Vietnamese pure-alcohol intake, which is a commercial estimate, not an official statistic.' },
  { c: '2', o: 'Explain local brewing', q: 'Why do global brewers build breweries inside each market?', a: 'Beer is heavy, low-value liquid that is costly to ship', w: ['Brewing is banned in most export markets', 'Barley cannot be shipped across borders', 'Excise tax is only collected where beer is brewed'], e: 'Beer’s low value density makes long-distance shipping expensive, so a global brewer is effectively a federation of local breweries.' },
  { c: '2', o: 'Explain the State’s role', q: 'Which statement best describes the State’s role in the alcoholic beverages industry?', a: 'It collects excise inside the shelf price, licenses sellers and sets drink-driving and advertising rules', w: ['It owns the brands in every country', 'It sets each producer’s recipe', 'It sells directly to drinkers without distributors'], e: 'The State is a structural participant: tax, licensing and rules can change the industry’s economics quickly.' },
  { c: '3', o: 'Use trade classification', q: 'Under the WCO Harmonized System, which heading covers beer made from malt?', a: 'HS 2203', w: ['HS 2204', 'HS 2206', 'HS 2208'], e: 'HS 2203 is beer from malt; 2204 is wine of fresh grapes, 2206 other fermented drinks and 2208 spirits and liqueurs.' },
  { c: '3', o: 'Spot boundary ambiguity', q: 'Why can a Vietnamese “spirits” statistic be ambiguous?', a: 'Rượu can fall under spirits (HS 2208) or fermented drinks (HS 2206) depending on process', w: ['Rượu is excluded from every trade code', 'HS 2208 covers only wine', 'Vietnam does not make rượu'], e: 'Classification depends on how the drink is made, so check what a statistic counts before comparing.' },
  { c: '4', o: 'Separate spirits from beer and wine', q: 'Which production step distinguishes spirits from beer and wine?', a: 'Distillation after fermentation', w: ['Fermentation', 'Pasteurisation', 'Filtration'], e: 'Spirits are distilled to concentrate alcohol and are usually matured; beer and wine stop at fermentation.' },
  { c: '4', o: 'Compare industry structure', q: 'Which pillar does the research describe as the most fragmented?', a: 'Wine', w: ['Beer', 'Spirits', 'All three equally'], e: 'Wine has millions of estates and négociants with no dominant global player, while beer and spirits are concentrated around a few groups.' },
  { c: '5', o: 'Identify the trade customer', q: 'Who counts as the “trade” customer of a brewer?', a: 'Distributors, retailers, bars and restaurants that buy for resale', w: ['Only the end drinker', 'Government regulators', 'Barley farmers'], e: 'The trade buys from producers and sells on; the drinker is the end consumer who chooses by occasion.' },
  { c: '5', o: 'Match occasion to product', q: 'Which occasion typically pulls premium or aged products?', a: 'Special occasions such as gifting and celebration', w: ['Everyday drinking at home', 'Social on-premise rounds', 'Trade-down purchases'], e: 'Special occasions pull premium or aged spirits, while at-home occasions favour value beer and RTDs.' },
]);

export const LESSON_1_1: BeerLessonBundle = {
  deck,
  quiz: quizItems,
  takeaways: {
    learned: 'You can define the alcoholic beverages industry, explain what makes it distinctive, locate its boundaries, compare beer, wine and spirits, and describe who its consumers are.',
    keyTakeaways: ['The industry covers drinks above ~0.5% ABV and the businesses that make and sell them.', 'The State, local brewing, brand value, distribution reach and moderation make alcohol distinctive.', 'Beer and wine are fermented; spirits are distilled; structure differs by pillar.', 'The trade is the immediate customer; the drinker chooses by occasion.'],
    businessImplications: 'A company’s pillar and channel predict its model: beer rewards distribution and local scale, spirits reward brand and aged stock, and everyone must manage regulation.',
    remember: 'Define the boundary, name the pillar, and say who the customer is before you quote a number.',
    nextLesson: 'Industry History & Development',
  },
  visuals: {
    'beer-m1-11-1-ecosystem': EcosystemVisual,
    'beer-m1-11-2-traits': TraitsVisual,
    'beer-m1-11-3-boundaries': BoundariesVisual,
    'beer-m1-11-4-classification': ClassificationVisual,
    'beer-m1-11-5-consumers': ConsumersVisual,
  },
};

