import { C2DeepDive, citeC2, c2Chapter, c2Quiz } from './coffeeM2Core';
import type { CoffeeM2LessonBundle } from './coffeeM2Core';

const LESSON = '2. Upstream Activities';

const deck = [
  c2Chapter({
    title: 'Agricultural Sourcing and Ingredient Procurement', chapterTitle: LESSON, readingTime: '7',
    objective: 'Explain how sourcing decisions shape quality, cost and brand and why procurement is more than buying at the lowest price.',
    mateIntro: 'Every menu starts with a purchase order. What a café buys, from whom and at what price sets what it can sell.',
    keyInsight: 'Procurement is both a cost-management function and a source of differentiation. The objective is not simply to purchase at the lowest price, but to secure consistent quality, reliable availability, and appropriate cost across the menu.',
    statTiles: [
      { value: '6', label: 'Key sourcing activities', subtitle: 'Supplier selection to demand-based purchasing', description: 'Supplier selection, coffee sourcing, food ingredient procurement, packaging procurement, supplier diversification and demand-based purchasing.' },
      { value: '31.7M bags', label: 'Vietnam’s coffee production in marketing year 2025/26', subtitle: 'USDA estimate, of which 30.5M bags Robusta', description: 'Produced on about 630,200 hectares of Robusta.' },
      { value: '1.3M bags', label: 'Vietnam’s coffee imports in marketing year 2025/26', subtitle: 'USDA estimate', description: 'Imports continue to feed processors even in a producing country.' },
    ],
    statsNote: 'The first tile is a count from this lesson; the production and import figures are US government estimates of green-bean equivalent bags, and export value is shown in the chart as reported by the coffee association.',
    narrative: [
      { label: 'What it is', text: 'Upstream activities begin with securing the raw materials and consumables needed to produce food and beverages. Core inputs include coffee beans, tea leaves, milk, plant-based alternatives, sugar, syrups, fruits, bakery ingredients, meat, vegetables, cooking oils, and packaging materials.' },
      { label: 'Why it is happening', text: 'Sourcing decisions influence product quality, flavor consistency, cost structure, supplier reliability, and brand positioning. Businesses may purchase through importers, domestic processors, specialist roasters, wholesalers, or direct relationships with producers, depending on scale and product requirements.' },
      { label: 'Real-world example', text: 'A buyer assesses suppliers on price, specifications, food safety, certifications, capacity, delivery reliability and payment terms; picks bean origins, varieties, processing methods and grades to fit a flavour profile and price point; sources fresh produce, dairy, bakery, proteins and sauces to match the menu; chooses cups, lids, containers and delivery packaging on cost, usability and brand; keeps alternative sources for critical items; and orders in line with forecast sales, shelf life and storage space.' },
      { label: 'Vietnam example', text: 'USDA estimates Vietnam’s 2025/26 coffee production at 31.7 million bags, 30.5 million of them Robusta and only 1.2 million Arabica, while imports of 1.3 million bags were led by Laos (45%), Indonesia, Brazil and Uganda in the first half. Prices moved sharply: the average local price reached about VND 118,000 a kilogram in 2024/25, up 125%, and exports rose from about US$4.2 billion in 2023 to about US$9 billion in 2025 on prices. Phúc Long reduces one sourcing risk for tea by owning two tea hills in Thái Nguyên and Bảo Lộc, a company statement.' },
      { label: 'Business impact', text: 'Upstream sourcing determines the quality, cost, and reliability of the ingredients entering the value chain. Effective procurement balances supplier performance, food safety, availability, and product differentiation.' },
    ],
    visualKind: 'coffee-m2-21-sourcing', visualHeading: 'Vietnam coffee exports, 2023 to 2025',
    visualIntro: 'See how the value of Vietnam’s coffee exports rose over three years, mainly on price.',
    imageAlt: 'Casemate bar chart of Vietnam coffee export value in 2023, 2024 and 2025',
    keyTerms: [
      { term: 'Procurement', definition: 'Buying inputs from suppliers on agreed terms.' },
      { term: 'Specification', definition: 'A written description of the quality and features required of an input.' },
      { term: 'Supplier diversification', definition: 'Keeping alternative sources for critical inputs.' },
      { term: 'Green-bean equivalent', definition: 'A way of counting coffee in all forms as if it were unroasted beans.' },
    ],
    recap: [
      'Core inputs include coffee, tea, milk, sweeteners, produce, bakery items and packaging.',
      'Sourcing shapes quality, flavour, cost, reliability and positioning.',
      'The aim is consistent quality and availability at an appropriate cost, not the lowest price.',
      'Buy in line with forecast sales, shelf life and storage.',
    ],
    chapterRecap: 'Upstream sourcing determines the quality, cost, and reliability of the ingredients entering the value chain. Effective procurement balances supplier performance, food safety, availability, and product differentiation.',
    deepDiveTitle: 'Why the cheapest bean is not always the cheapest cup',
    body: <C2DeepDive paragraphs={[
      'A cheaper bean that tastes different from batch to batch forces staff to adjust recipes, causes complaints and wastes product. The extra cost may exceed the saving.',
      'Buyers therefore set a specification and a price range together, and track how each supplier performs against both.' ]} evidence="The six activities are described in the supplied material. Production, consumption and import figures are USDA estimates; price figures are from USDA and the coffee association (VICOFA) as reported by Tuoi Tre; customs-based export value is US$8.92 billion per VietnamNet; Phúc Long details are company statements." />,
    sources: citeC2('usdaCoffeeAnnual', 'usdaCoffeeSemi', 'vicofaExport2025', 'vietnamnetExport', 'phucLongTea'),
  }),
  c2Chapter({
    title: 'Processing, Manufacturing, and Product Development', chapterTitle: LESSON, readingTime: '7',
    objective: 'Show how processing and product development turn ingredients into menu items that can be delivered consistently.',
    mateIntro: 'A new drink is only a good idea if every store can make it the same way, at the right cost, in the time customers will wait.',
    keyInsight: 'Product innovation creates value only when it can be delivered consistently and economically. A successful menu item must satisfy customer expectations while fitting the retailer’s sourcing capabilities, equipment, staff skills, and store workflow.',
    statTiles: [
      { value: '6', label: 'Key processing and development activities', subtitle: 'Roasting to product testing', description: 'Coffee roasting and blending, central kitchen production, menu research and development, standardized specifications, supplier-led innovation and product testing.' },
      { value: 'US$1.78B', label: 'Vietnam’s processed coffee exports in 2025', subtitle: 'Customs data via VietnamNet, up 50.4%', description: 'A record, reflecting investment in roasting and processing.' },
      { value: '10,000 → 75,000 t', label: 'Highlands’ Cái Mép roastery capacity, initial and planned', subtitle: 'Company statement as reported by the press', description: 'About VND 500 billion invested, planned capacity as operations mature.' },
    ],
    statsNote: 'The first tile is a count from this lesson; processed-export value is customs-based and the roastery figures are company statements of initial and planned capacity, not current output.',
    narrative: [
      { label: 'What it is', text: 'Ingredients may undergo processing before reaching a retail outlet. Coffee beans can be cleaned, graded, roasted, blended, and packaged; tea, dairy, syrups, bakery products, and sauces may also be processed by specialist manufacturers. Some operators centralize selected production activities, while others prepare most products within individual stores.' },
      { label: 'Why it is happening', text: 'Product development translates brand positioning and customer preferences into commercially viable menu offerings. It requires balancing flavor, ingredient availability, preparation time, food safety, price, and the ability to reproduce the product consistently across outlets.' },
      { label: 'Real-world example', text: 'A chain develops roast profiles and blends for consistent flavour and price; a central kitchen prepares sauces, dough, desserts or fillings for stores; teams test recipes, ingredient combinations, portions and presentation; documents ingredient weights, steps and storage rules; works with roasters or manufacturers on new products; and tests taste, preparation time, shelf life, safety, cost and sales potential before rollout.' },
      { label: 'Vietnam example', text: 'Highlands Coffee opened its VND 500 billion, 24,000 sq m Cái Mép roastery in April 2025 with German Probat roasting technology, an initial capacity of about 10,000 tonnes a year and a planned 75,000, and describes food-safety systems including FSSC 22000, ISO 22000 and HACCP, a company claim. Phúc Long runs tea and coffee processing plants in Binh Duong and sells packaged tea and coffee through supermarkets. Vietnam’s processed coffee exports reached a record US$1.78 billion in 2025, up 50.4%, and USDA reports processors importing more beans when local prices were high.' },
      { label: 'Business impact', text: 'Processing and product development convert raw ingredients into differentiated, usable inputs and retail-ready offerings. Standardized specifications and practical store execution are essential for scaling menu innovation.' },
    ],
    visualKind: 'coffee-m2-22-processing', visualHeading: 'Six activities from ingredient to menu item',
    visualIntro: 'See six activities that turn ingredients into a menu item and what each ensures.',
    imageAlt: 'Casemate tree mind map of six processing and product development activities',
    keyTerms: [
      { term: 'Roast profile', definition: 'The time and temperature pattern used to roast a coffee.' },
      { term: 'Central kitchen', definition: 'A facility that prepares items for several stores.' },
      { term: 'Standardised specification', definition: 'A fixed description of weights, steps and standards for a product.' },
      { term: 'Semi-finished item', definition: 'A partly prepared item finished in the store.' },
    ],
    recap: [
      'Ingredients may be processed before they reach the store.',
      'Operators may centralise some production or prepare in store.',
      'Product development must balance flavour, cost, speed, safety and repeatability.',
      'Scaling needs standard specifications and workable store execution.',
    ],
    chapterRecap: 'Processing and product development convert raw ingredients into differentiated, usable inputs and retail-ready offerings. Standardized specifications and practical store execution are essential for scaling menu innovation.',
    deepDiveTitle: 'Why a new drink must pass the store workflow test',
    body: <C2DeepDive paragraphs={[
      'A drink that needs a rare syrup, two extra steps and a special cup may taste excellent in a test kitchen but slow every queue and raise waste in a busy store.',
      'Testing preparation time, shelf life and cost in a few stores first shows whether the item can be made the same way thousands of times.' ]} evidence="The six activities are described in the supplied material. Roastery details are from Viet Nam News and the Vietnam Investment Review; the food-safety systems are a Highlands company statement; processed-export figures are from VietnamNet; Phúc Long details are company statements; import behaviour is from USDA." />,
    sources: citeC2('highlandsRoastery', 'highlandsPlant2023', 'virDrinksChains', 'vietnamnetExport', 'phucLongAbout', 'usdaCoffeeSemi'),
  }),
  c2Chapter({
    title: 'Supplier Relationships, Equipment, and Upstream Risk', chapterTitle: LESSON, readingTime: '8',
    objective: 'Identify the main upstream risks and the practices that make supply resilient.',
    mateIntro: 'Prices swing, rules change and machines break. Resilient operators plan for each before it happens.',
    keyInsight: 'Supply resilience depends on more than keeping multiple suppliers on a list. Retailers need qualified alternatives, clear specifications, supplier performance monitoring, and contingency plans for critical ingredients and equipment.',
    statTiles: [
      { value: '6', label: 'Key supply resilience activities', subtitle: 'Supplier management to contract management', description: 'Supplier relationship management, equipment procurement, preventive maintenance, risk monitoring, contingency planning and contract management.' },
      { value: '+125%', label: 'Rise in the average local coffee price in 2024/25', subtitle: 'USDA, to about VND 118,000 a kilogram', description: 'A price swing that tests every buyer’s plans.' },
      { value: '30 Dec 2026', label: 'Date the EU deforestation rules apply to large and medium operators', subtitle: 'European Commission', description: 'Micro and small operators follow on 30 June 2027.' },
    ],
    statsNote: 'The first tile is a count from this lesson; the price rise is a USDA estimate of the average local price and the EU date is the current published application date, which has been postponed before and should be checked.',
    narrative: [
      { label: 'What it is', text: 'The upstream network includes not only ingredients but also the equipment, maintenance, utilities, and specialist services required for foodservice operations. Espresso machines, grinders, ovens, refrigerators, freezers, water filtration systems, and kitchen ventilation can affect product quality, operating capacity, and food safety.' },
      { label: 'Why it is happening', text: 'Supply risks arise from weather conditions, agricultural price volatility, import dependence, exchange-rate movements, transport disruptions, supplier concentration, and changes in product specifications. Equipment failures and shortages of critical consumables can also interrupt service.' },
      { label: 'Real-world example', text: 'A buyer reviews delivery accuracy, defect rates, consistency, responsiveness and terms; picks machines for capacity, reliability, energy use, maintenance needs and staff skill; schedules cleaning, inspection, calibration, servicing and replacement; tracks commodity prices, lead times, seasonal shortages, import restrictions and supplier finances; qualifies substitute ingredients and suppliers without lowering standards; and agrees specifications, service levels, delivery windows, warranties and quality responsibilities in contracts.' },
      { label: 'Vietnam example', text: 'USDA reports that the average local coffee price rose 125% to about VND 118,000 a kilogram in 2024/25 and that global prices are watched daily, and eleven-month export prices rose about 41% for Robusta and 91% for Arabica. Cafés responded in different ways: some raised drink prices by 10–20%, while one shop held prices and added menu variety. The EU, which took 47.2% of Vietnam’s coffee export volume in 2024–25, now applies its deforestation regulation to large and medium operators from 30 December 2026 and to micro and small ones from 30 June 2027, with soluble coffee added from 30 December 2027, and a European Forest Institute check examines whether Vietnam’s sector can provide the traceability data. The sources reviewed give no Vietnam-specific data on equipment failure or maintenance, so none is stated.' },
      { label: 'Business impact', text: 'Upstream resilience protects service continuity and product consistency. Strong supplier relationships, equipment reliability, and risk planning reduce the likelihood that external disruptions will affect store operations.' },
    ],
    visualKind: 'coffee-m2-23-risk', visualHeading: 'Upstream risks by likelihood and impact',
    visualIntro: 'Place six upstream risks on a matrix of how likely they are and how much they affect service.',
    imageAlt: 'Casemate matrix of six upstream risks by likelihood and impact on service and cost',
    keyTerms: [
      { term: 'Supplier concentration', definition: 'Dependence on a small number of suppliers.' },
      { term: 'Preventive maintenance', definition: 'Scheduled servicing that prevents breakdowns.' },
      { term: 'Contingency plan', definition: 'A prepared response to a disruption.' },
      { term: 'Deforestation-free due diligence', definition: 'Evidence that a product was not grown on recently deforested land.' },
    ],
    recap: [
      'Upstream includes equipment, maintenance, utilities and specialist services.',
      'Risks include weather, price swings, imports, exchange rates, transport and concentration.',
      'Resilience needs qualified alternatives, specifications, monitoring and contingency plans.',
      'Strong supplier and equipment management protects service.',
    ],
    chapterRecap: 'Upstream resilience protects service continuity and product consistency. Strong supplier relationships, equipment reliability, and risk planning reduce the likelihood that external disruptions will affect store operations.',
    deepDiveTitle: 'What a qualified alternative supplier actually means',
    body: <C2DeepDive paragraphs={[
      'A name on a list is not a backup. A qualified alternative has already passed quality and safety checks, has agreed specifications and has delivered a trial order.',
      'Without that preparation, switching in an emergency can mean changed flavour, rushed approvals or delays, which is the risk resilience is supposed to remove.' ]} evidence="The six activities are described in the supplied material. Price figures are from USDA and customs data reported by VOV; cafe price responses are from a VTV report; EU dates are from the European Commission page and the sector check from the European Forest Institute; the export share is from the Ministry of Agriculture and Environment." />,
    sources: citeC2('usdaCoffeeSemi', 'vovCoffeePrices', 'vtvCoffeePrices', 'eudrCommission', 'efiEudrVietnam', 'maeCropYear'),
  }),
];

const quiz = c2Quiz('coffee-m2-l2', [
  { chapter: '1', objective: 'State the aim of procurement', question: 'What is the objective of procurement?', application: 'A buyer always picks the cheapest offer. What is missing?', correct: 'To secure consistent quality, reliable availability and appropriate cost across the menu', wrong: ['To buy the cheapest item always', 'To buy the largest volume', 'To avoid all suppliers'], explanation: 'It is cost and differentiation. Review Chapter 1.' },
  { chapter: '1', objective: 'List sourcing channels', question: 'Which channels may businesses buy through?', application: 'A chain compares buying routes. What are the options?', correct: 'Importers, domestic processors, specialist roasters, wholesalers or direct producer relationships', wrong: ['Only retailers', 'Only customers', 'Only advertisers'], explanation: 'It depends on scale. Review Chapter 1.' },
  { chapter: '1', objective: 'Apply demand-based purchasing', question: 'What should order quantities align with?', application: 'A store keeps overbuying milk. What should it match?', correct: 'Forecast sales, shelf life and storage capacity', wrong: ['The largest discount', 'Last year’s menu', 'Random estimates'], explanation: 'Match demand. Review Chapter 1.' },
  { chapter: '1', objective: 'Recall the price change', question: 'By how much did USDA report the average local coffee price rose in 2024/25?', application: 'A student describes the price swing. What is the figure?', correct: '125%', wrong: ['12.5%', '1,250%', '5%'], explanation: 'A very large rise. Review Chapter 1.' },
  { chapter: '2', objective: 'State when innovation creates value', question: 'When does product innovation create value?', application: 'A new drink is tasty but hard to make. What is the problem?', correct: 'Only when it can be delivered consistently and economically', wrong: ['Whenever it is new', 'Whenever it is expensive', 'Whenever it is rare'], explanation: 'Delivery matters. Review Chapter 2.' },
  { chapter: '2', objective: 'Describe central production', question: 'What does a central kitchen do?', application: 'A chain prepares sauces and dough in one place. What is that?', correct: 'Prepares sauces, dough, desserts or semi-finished items for distribution to stores', wrong: ['Serves customers', 'Grows beans', 'Collects reviews'], explanation: 'It centralises preparation. Review Chapter 2.' },
  { chapter: '2', objective: 'List test criteria', question: 'What should product testing evaluate before rollout?', application: 'A new item is nearly ready. What should be checked?', correct: 'Taste, preparation time, shelf life, food safety, cost and sales potential', wrong: ['Only colour', 'Only name', 'Only packaging colour'], explanation: 'All of these matter. Review Chapter 2.' },
  { chapter: '3', objective: 'State what resilience needs', question: 'What does supply resilience depend on?', application: 'A buyer has several names on a list. Is that enough?', correct: 'Qualified alternatives, clear specifications, supplier monitoring and contingency plans', wrong: ['Only a longer list', 'Only the lowest price', 'Only advance payment'], explanation: 'A list is not resilience. Review Chapter 3.' },
  { chapter: '3', objective: 'Name an upstream risk', question: 'Which is an upstream supply risk named in the chapter?', application: 'A buyer maps risks. Which belongs?', correct: 'Agricultural price volatility', wrong: ['Staff birthdays', 'Logo changes', 'Store colour'], explanation: 'Prices swing. Review Chapter 3.' },
  { chapter: '3', objective: 'Recall the EU date', question: 'From when do the EU deforestation rules apply to large and medium operators?', application: 'An exporter plans compliance. What is the current date?', correct: '30 December 2026', wrong: ['30 December 2020', '1 January 2030', '30 June 2020'], explanation: 'Check for updates. Review Chapter 3.' },
]);

export const LESSON_C2_2: CoffeeM2LessonBundle = {
  deck,
  quiz,
  takeaways: {
    learned: 'You can explain how sourcing, processing and supplier management shape quality, cost and resilience in coffeehouse and foodservice retail.',
    keyTakeaways: [
      'Procurement is a cost function and a source of differentiation.',
      'Buy for consistent quality and availability, not only low price.',
      'Product innovation counts only if it can be delivered consistently.',
      'Resilience needs qualified alternatives, specifications and contingency plans.',
      'Price swings and EU rules are live upstream risks for coffee.',
    ],
    businessImplications: 'Set specifications with price ranges, test new products in store workflows and qualify backups before a disruption.',
    remember: 'A backup you have not tested is not a backup.',
    nextLesson: 'Distribution, Logistics & Inventory',
  },
};
