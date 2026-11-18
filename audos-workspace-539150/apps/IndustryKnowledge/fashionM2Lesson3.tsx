import { F2DeepDive, citeF2, f2Chapter, f2Quiz } from './fashionM2Core';
import type { FashionM2LessonBundle } from './fashionM2Core';

const LESSON = '3. Midstream Activities';

const deck = [
  f2Chapter({
    title: 'Product Design, Development and Manufacturing', chapterTitle: LESSON, readingTime: '7',
    objective: 'Follow a product from concept through prototyping into volume production, and explain what each stage decides about cost, quality and timing.',
    mateIntro: 'A good factory cannot rescue a bad specification. Most of what determines whether a product works commercially is settled between the first sketch and the approved sample.',
    keyInsight: 'Manufacturing efficiency alone does not guarantee competitive advantage. Companies must also coordinate design, product performance, quality, production flexibility, and speed to market to ensure that products satisfy consumer needs and brand expectations.',
    statTiles: [
      { value: '7', label: 'Midstream stages', subtitle: 'Design through batch strategy', description: 'Each one closes options the next stage cannot reopen.' },
      { value: 'OEM / ODM', label: 'Two outsourcing models', description: 'OEMs build to buyer specification; ODMs may also contribute design and development.' },
      { value: 'Batch size', label: 'The markdown dial', description: 'Large batches cut unit cost; small batches cut the risk of unsold stock.' },
    ],
    statsNote: 'Counts describe the production framework used in this lesson, not measured cycle times, yields or unit costs.',
    narrative: [
      { label: 'What it is', text: 'Midstream activities convert materials and product concepts into finished goods that meet customer requirements. This stage typically includes product design, technical specification, prototyping, production planning, manufacturing and coordination with suppliers.' },
      { label: 'Why it is happening', text: 'Although upstream and midstream boundaries vary across business models, product development and production are central to transforming material inputs into commercially viable products. Designers develop collections for a target customer, season and brand position, while technical teams create samples, evaluate fit and functionality, test materials and refine specifications before mass production.' },
      { label: 'Real-world example', text: 'Sports products may require performance testing, ergonomic design, durability evaluation and specialised material engineering. Apparel production then involves fabric cutting, sewing and finishing, while footwear manufacturing involves component preparation, assembly, bonding and finishing — each with its own consistency challenge at volume.' },
      { label: 'Vietnam example', text: 'Vietnamese factories have moved from simple cut-make-trim work toward more complex products and, in some cases, development support. That progression matters commercially: a supplier that can read a technical specification, propose a construction and manage its own material procurement earns a different margin from one that only sews to instruction.' },
      { label: 'Business impact', text: 'Brands may outsource production to Original Equipment Manufacturers (OEMs), which manufacture to buyer specifications, while Original Design Manufacturers (ODMs) may also contribute design and development depending on the arrangement. Production planning schedules machinery, labour, materials and capacity against order volumes and lead times, and batch strategy decides whether the business is optimising unit cost or protecting itself against unsold product.' },
    ],
    visualKind: 'fashion-m2-31-manufacturing', visualHeading: 'From concept to finished unit',
    visualIntro: 'Follow each production stage and note the decision it locks in for everything that comes after.',
    imageAlt: 'Casemate table of design, development, engineering and manufacturing stages in fashion retail',
    keyTerms: [
      { term: 'OEM', definition: 'Original Equipment Manufacturer — a factory producing goods to a buyer’s own specification and design.' },
      { term: 'ODM', definition: 'Original Design Manufacturer — a supplier that also contributes product design and development, not only production.' },
      { term: 'Prototyping', definition: 'Making and assessing samples to evaluate fit, function and materials before committing to volume production.' },
      { term: 'Speed to market', definition: 'The elapsed time from design decision to sellable stock on a shelf or a site.' },
    ],
    recap: [
      'Design, specification, prototyping, planning and production form one connected stage.',
      'Technical categories need performance, ergonomic and durability evaluation.',
      'OEM and ODM arrangements differ in who owns product development.',
      'Batch size trades unit-cost efficiency against the risk of unsold product.',
    ],
    chapterRecap: 'Product development and manufacturing determine how efficiently companies translate product ideas into finished goods. Coordinating design specifications, technical capabilities, production capacity and delivery requirements supports both product quality and commercial performance.',
    deepDiveTitle: 'Where the cost is really decided',
    body: <F2DeepDive paragraphs={[
      'By the time a style reaches the production line, most of its cost is already fixed. The fabric, the construction, the number of panels, the trims and the finishing operations were all chosen during development, and each one carries a labour minute and a material metre. A factory can improve efficiency against that specification but it cannot change the specification, which is why cost reduction programmes that start on the production floor usually deliver less than expected.',
      'The same stage decides flexibility. A product engineered around a single supplier’s proprietary component cannot be moved; one built from widely available materials can. Teams that treat development as a purely creative stage give away both the cost and the optionality that later stages would have needed.',
    ]} evidence="The research material describes the production stages qualitatively and supplies no measured cycle times, defect rates or unit costs, so none are stated here." />,
    sources: citeF2('iloSectors', 'betterWork', 'bofStateOfFashion'),
  }),
  f2Chapter({
    title: 'Quality Control, Packaging, Warehousing and Logistics', chapterTitle: LESSON, readingTime: '7',
    objective: 'Explain how inspection, packaging, warehousing, freight and returns handling turn finished goods into inventory a retailer can actually sell.',
    mateIntro: 'A finished garment is not yet sellable stock. Between the factory and the shelf sit inspection, packing, a warehouse record and a freight decision — and every one of them can quietly consume the margin.',
    keyInsight: 'Quality assurance and logistics influence customer satisfaction, delivery reliability, and total operating costs. Defects, packaging damage, inaccurate inventory records, and inefficient transportation can reduce margins and weaken brand reputation.',
    statTiles: [
      { value: '7', label: 'Activities in this stage', subtitle: 'Inspection through reverse logistics', description: 'Each one can turn a profitable order into a loss-making one.' },
      { value: '4', label: 'Freight modes', subtitle: 'Road, sea, air, multimodal', description: 'Chosen against cost, urgency, product requirement and destination.' },
      { value: 'Returns', label: 'The hidden cost line', description: 'Returned goods are inspected, restocked, repaired, discounted or recycled by condition.' },
    ],
    statsNote: 'Counts describe the quality and logistics framework used in this lesson; the research material supplies no measured defect, damage or return rates.',
    narrative: [
      { label: 'What it is', text: 'After or during production, products undergo inspection, testing, finishing, packaging and preparation for distribution. Finished goods may then be stored at factories, distribution centres, third-party logistics facilities or retailer warehouses before being transported to stores or customers.' },
      { label: 'Why it is happening', text: 'These activities protect product quality while ensuring the right products reach the right destinations in suitable quantities within required time frames. Products are checked for dimensions, stitching, material defects, colour consistency, finishing, durability and compliance with agreed specifications.' },
      { label: 'Real-world example', text: 'Category-specific testing goes further: running shoes may require cushioning and durability tests, while outdoor apparel may be assessed for relevant weather resistance or performance characteristics. Packaging and labelling then add protection, size information, barcodes and any required regulatory documentation.' },
      { label: 'Vietnam example', text: 'For export-oriented Vietnamese production, this stage is where cost advantage is most often lost. Port handling, inland transport and documentation sit between a competitive factory price and a landed cost in the destination market, and a missed sailing can convert a planned sea shipment into air freight that erases the price advantage entirely.' },
      { label: 'Business impact', text: 'Warehouse management receives, records, stores, picks, packs and dispatches inventory, with barcode systems and warehouse software improving stock accuracy. Retailers then allocate products across stores, regional warehouses and online fulfilment centres according to expected demand, and process returns by inspecting, restocking, repairing, discounting or recycling them according to condition and policy.' },
    ],
    visualKind: 'fashion-m2-32-logistics', visualHeading: 'Turning finished goods into sellable inventory',
    visualIntro: 'Set each activity against the specific commercial cost of getting it wrong.',
    imageAlt: 'Casemate table of quality inspection, packaging, warehousing, freight and reverse logistics',
    keyTerms: [
      { term: 'Inventory allocation', definition: 'Deciding how finished stock is divided between stores, regional warehouses and online fulfilment centres.' },
      { term: 'Reverse logistics', definition: 'The handling of returned product — inspection, restocking, repair, discounting or recycling according to condition.' },
      { term: 'Multimodal transport', definition: 'Moving goods using more than one mode, such as sea plus road, under a combined arrangement.' },
      { term: 'Stock accuracy', definition: 'How closely recorded inventory matches physical inventory; poor accuracy makes availability unsellable.' },
    ],
    recap: [
      'Inspection covers dimensions, stitching, defects, colour, finishing and durability.',
      'Performance categories need their own tests before a claim can be made.',
      'Warehouse records decide whether available stock can actually be sold.',
      'Returns are a cost line, not an afterthought, and are processed by condition.',
    ],
    chapterRecap: 'Quality control, packaging, warehousing and logistics help convert manufactured products into retail-ready inventory. Reliable processes at this stage reduce defects, improve stock visibility and support consistent product availability.',
    deepDiveTitle: 'The margin that disappears after the sale',
    body: <F2DeepDive paragraphs={[
      'Returns are the clearest example of cost that appears after the revenue has been recognised. A returned garment reverses the sale, then adds a carriage charge, an inspection, a repack and often a markdown, because by the time it is back in stock the season has moved. On a low-value basket the handling alone can exceed the original gross margin, which is why return rate belongs in channel economics rather than in customer service reporting.',
      'Stock accuracy carries a similar hidden cost. Inventory that the system believes exists but cannot be found is worse than inventory that is simply absent: it is promised to a customer, picked, failed and refunded, consuming service time and goodwill on a sale that was never possible. The warehouse record is therefore a commercial asset, not an administrative one.',
    ]} evidence="The research material describes these activities and their consequences qualitatively, and supplies no measured defect, damage, return or stock-accuracy figures, so none are claimed here." />,
    sources: citeF2('worldBankLpi', 'unctadMaritime', 'deloitteRetail'),
  }),
];

const quiz = f2Quiz('fashion-m2-l3', [
  { chapter: '1', objective: 'Define midstream activities', question: 'What do midstream activities convert?', application: 'A review covers only sewing operations. What else sits in this stage?', correct: 'Materials and product concepts into finished goods meeting customer requirements', wrong: ['Finished goods into retail store displays', 'Customer feedback into marketing campaigns', 'Export documentation into customs clearance'], explanation: 'Midstream covers design, specification, prototyping, planning, manufacturing and supplier coordination. Review Chapter 1.' },
  { chapter: '1', objective: 'Explain why efficiency is not enough', question: 'Why does manufacturing efficiency alone not guarantee competitive advantage?', application: 'A factory is highly efficient but its products sell poorly. What was not coordinated?', correct: 'Design, performance, quality, flexibility and speed to market must be coordinated too', wrong: ['Efficiency always guarantees advantage', 'Only unit labour cost matters commercially', 'Only factory certification affects the outcome'], explanation: 'Companies must coordinate design, performance, quality, production flexibility and speed to market. Review Chapter 1.' },
  { chapter: '1', objective: 'Describe prototyping', question: 'What happens during product development and prototyping?', application: 'A brand goes straight from sketch to bulk production. What did it skip?', correct: 'Samples are made, fit and functionality evaluated, materials tested and specifications refined', wrong: ['Stores are fitted out and staff recruited', 'Marketing campaigns are filmed and launched', 'Customs paperwork is prepared and filed'], explanation: 'Technical teams create samples, evaluate fit and functionality, test materials and refine specifications before mass production. Review Chapter 1.' },
  { chapter: '1', objective: 'Distinguish OEM from ODM', question: 'How does an ODM arrangement differ from an OEM arrangement?', application: 'A supplier proposes its own construction and materials. Which model is that?', correct: 'An ODM may also contribute product design and development, not only production', wrong: ['An ODM only assembles to buyer instruction', 'An OEM always owns the retail brand', 'They are two names for the same arrangement'], explanation: 'OEMs manufacture to buyer specification; ODMs may also contribute design and development. Review Chapter 1.' },
  { chapter: '1', objective: 'Assess batch strategy', question: 'What trade-off does batch size involve?', application: 'A retailer wants to test demand before committing. Which approach fits?', correct: 'Large batches improve unit-cost efficiency; small batches reduce the risk of unsold product', wrong: ['Large batches always reduce total cost', 'Small batches always reduce unit cost', 'Batch size has no commercial consequence'], explanation: 'Large batches may improve unit-cost efficiency, whereas smaller batches help test demand and reduce unsold stock risk. Review Chapter 1.' },
  { chapter: '2', objective: 'Identify what inspection covers', question: 'What do quality inspections check?', application: 'An inspection report covers colour only. What else should it cover?', correct: 'Dimensions, stitching, material defects, colour consistency, finishing, durability and specification compliance', wrong: ['Only the retail price label', 'Only the shipping carton dimensions', 'Only the advertising claims made'], explanation: 'Products are checked for dimensions, stitching, defects, colour, finishing, durability and compliance with agreed specifications. Review Chapter 2.' },
  { chapter: '2', objective: 'Apply category-specific testing', question: 'What additional testing may performance categories require?', application: 'A running shoe is approved on appearance alone. What test is missing?', correct: 'Cushioning and durability testing, or weather resistance for outdoor apparel', wrong: ['Only a visual check of stitching', 'Only barcode and label verification', 'Only carton drop testing'], explanation: 'Running shoes may require cushioning and durability tests and outdoor apparel weather-resistance assessment. Review Chapter 2.' },
  { chapter: '2', objective: 'Explain warehouse management', question: 'What does warehouse management cover?', application: 'The system shows stock the store cannot find. Which activity failed?', correct: 'Receiving, recording, storing, picking, packing and preparing shipments', wrong: ['Designing the next seasonal collection', 'Negotiating supplier payment terms', 'Setting the national advertising budget'], explanation: 'Inventory is received, recorded, stored, picked, packed and prepared for shipment, with barcodes and software improving accuracy. Review Chapter 2.' },
  { chapter: '2', objective: 'Explain inventory allocation', question: 'How do retailers allocate finished inventory?', application: 'Stock sits in one warehouse while stores sell out. What was not done?', correct: 'Across stores, regional warehouses and online fulfilment centres according to expected demand', wrong: ['Equally across every location regardless of demand', 'Entirely to the single largest store', 'Only to export markets'], explanation: 'Retailers distribute products among stores, regional warehouses and online fulfilment centres according to expected demand. Review Chapter 2.' },
  { chapter: '2', objective: 'Describe reverse logistics', question: 'How are returned products handled?', application: 'A returned jacket arrives in sellable condition late in the season. What are the options?', correct: 'Inspected, then restocked, repaired, discounted, recycled or otherwise processed by condition', wrong: ['Always destroyed on receipt', 'Always restocked at full price', 'Always returned to the original factory'], explanation: 'Returned products may be inspected, restocked, repaired, discounted, recycled or otherwise processed according to condition and policy. Review Chapter 2.' },
]);

export const LESSON_2_3: FashionM2LessonBundle = {
  deck,
  quiz,
  takeaways: {
    learned: 'You can follow a product from design through prototyping into volume production, and explain how inspection, packaging, warehousing, freight and returns turn finished goods into sellable inventory.',
    keyTakeaways: [
      'Most of a product’s cost and flexibility is fixed during development, not on the line.',
      'OEM and ODM arrangements differ in who owns product development.',
      'Batch size is the dial between unit-cost efficiency and markdown risk.',
      'Stock accuracy decides whether recorded availability can actually be sold.',
      'Returns reverse revenue and then add handling cost on top.',
    ],
    businessImplications: 'Cost programmes that begin on the production floor under-deliver, because the specification set during development already fixed the labour minutes and material metres the factory has to work with.',
    remember: 'A finished garment is not sellable stock until the record, the pack and the freight are right.',
    nextLesson: 'Downstream Activities',
  },
};
