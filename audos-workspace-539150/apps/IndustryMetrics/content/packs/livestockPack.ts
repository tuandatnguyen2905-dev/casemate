import type { IndustryPack } from '../../core/types';
import { interp, packMetric, ref, verifiedWithCaveat } from '../define';

const CATTLE_SOURCE_NOTE = 'Definitions were read in cattle-feedlot sources; other species and production systems may define the metric on different bases.';
const DEADS = 'State whether dead animals are included (deads-in) or excluded (deads-out).';

export const LIVESTOCK_PACK: IndustryPack = {
  packId: 'livestock',
  label: 'Livestock & Animal Feed',
  metrics: [
    packMetric({
      metricId: 'mortality-rate', name: 'Mortality Rate (Death Loss)', category: 'risk-quality',
      relatedMetricIds: ['feed-conversion-ratio', 'average-daily-gain', 'cost-of-gain'],
      definition: 'Animals that died as a percentage of the animals placed (received) for the same group and period.',
      businessMeaning: 'Each death loses the animal’s purchase cost and the feed and care already invested in it, and lowers the output the farm can sell.',
      unit: 'percent', frequency: 'per-period',
      reportingScope: 'Pen, batch or flock from placement to sale; state whether the rate is cumulative over the cycle or per month.',
      variants: ['Some operations divide deaths by average inventory rather than by animals placed.'],
      interpretation: interp(
        'More animals are being lost: disease, stress, housing or handling problems.',
        'Fewer losses: healthier animals and better husbandry.',
        ['The cause and timing of deaths matter more than the headline rate.', 'A low rate on a small batch can be luck rather than control.'],
        ['Animal health and biosecurity', 'Housing and stocking density', 'Nutrition', 'Handling and transport stress'],
        ['Set health-programme and biosecurity targets.', 'Judge farm and contract-grower performance.'],
        ['Mixing cumulative cycle mortality with monthly rates.', 'Comparing species or production stages.'],
      ),
      example: {
        scenario: 'A batch of 1,200 pigs is placed for fattening.',
        inputs: { animalsDied: 30, animalsPlaced: 1200 },
        assumptions: ['Deaths counted from placement to sale.', 'Same batch for numerator and denominator.'],
        steps: ['Mortality = 30 ÷ 1,200 = 2.5%'],
        output: 0.025,
        interpretation: 'One animal in 40 did not reach sale.',
      },
      evidence: verifiedWithCaveat([
        ref('uf-irsik-2006-feedlot-health', 'Methods — percent mortality', 'Percent mortality or death loss for a pen is the number of cattle that died divided by the total number of cattle received for that pen.'),
      ], 'Definition confirmed in a peer-reviewed feedlot-cattle study.', [
        CATTLE_SOURCE_NOTE + ' Poultry, pig and aquaculture operations may define mortality on flock or average-inventory bases, which were not read.',
        'State whether the rate is cumulative over the production cycle or per period.',
      ]),
      suggestedApplication: 'Livestock health and farm-performance cases.',
    }),
    packMetric({
      metricId: 'average-daily-gain', name: 'Average Daily Gain', acronym: 'ADG', category: 'operational-efficiency',
      relatedMetricIds: ['feed-conversion-ratio', 'cost-of-gain', 'mortality-rate'],
      definition: 'Weight gained per animal divided by the number of days in the feeding period.',
      businessMeaning: 'Shows how fast animals grow; faster gain shortens the time to market weight and spreads fixed costs over more output.',
      unit: 'kg-per-day', frequency: 'per-period',
      reportingScope: 'Animal, pen or batch; the same weighing basis (for example shrink-adjusted) at the start and end.',
      interpretation: interp(
        'Faster growth.',
        'Slower growth: health, nutrition or environment constraints.',
        ['Faster gain can come with poorer feed conversion; read ADG with FCR and cost of gain.', 'Gain rates differ across the production cycle.'],
        ['Genetics', 'Ration quality and intake', 'Health', 'Housing and climate'],
        ['Plan days to market and placement schedules.', 'Benchmark pens, farms and rations.'],
        ['Comparing deads-in and deads-out figures.', 'Mixing growth stages or species.'],
      ),
      example: {
        scenario: 'A 400-animal batch is weighed at placement and sale.',
        inputs: { finalWeight: 105, initialWeight: 30, daysOnFeed: 100 },
        assumptions: ['Average live weights on the same scale basis.', 'Days between the two weighings.'],
        steps: ['Gain per animal = 105 − 30 = 75 kg', 'ADG = 75 ÷ 100 = 0.75 kg per day'],
        output: 0.75,
        interpretation: 'Each animal gained about three-quarters of a kilogram a day.',
      },
      evidence: verifiedWithCaveat([
        ref('ndsu-as1161-feedlot-terms', 'Glossary — ADG', 'Average daily gain is the amount of gain divided by the number of days in the feeding period.'),
      ], 'Extension glossary definition for feedlot cattle; the arithmetic is general.', [
        CATTLE_SOURCE_NOTE,
        DEADS,
        'State whether weights are shrink-adjusted.',
      ]),
      suggestedApplication: 'Livestock productivity and feed-formulation cases.',
    }),
    packMetric({
      metricId: 'cost-of-gain', name: 'Cost of Gain', category: 'financial-performance',
      relatedMetricIds: ['feed-conversion-ratio', 'average-daily-gain', 'cost-per-tonne'],
      definition: 'Total feeding and rearing costs divided by total liveweight gain.',
      businessMeaning: 'The cost of producing each tonne of liveweight; compare it with the value of the weight gained to see whether feeding adds margin.',
      unit: 'currency-per-tonne', frequency: 'per-period',
      reportingScope: 'Pen, batch or farm; state which costs are included. Per tonne of gain (1 CU per kg = 1,000 CU per tonne).',
      variants: ['Feed-only cost of gain is a narrower variant.'],
      interpretation: interp(
        'Each tonne of weight gained costs more.',
        'Cheaper gain, from better feed conversion, lower feed prices or fewer losses.',
        ['A low cost of gain can still lose money if the purchase price of the animal is high.', 'Death loss raises cost of gain when included.'],
        ['Feed price', 'Feed conversion', 'Average daily gain', 'Mortality and health costs'],
        ['Ration and supplier decisions.', 'Contract-grower payment design.'],
        ['Mixing cost scopes between farms.', 'Comparing deads-in and deads-out figures.'],
      ),
      example: {
        scenario: 'The 400-animal batch gains 75 kg each (30 tonnes in total).',
        inputs: { totalFeedingCost: 540000, totalGain: 30 },
        assumptions: ['Costs include feed and the other costs the producer counts.', 'Total gain = 400 × 75 kg = 30,000 kg = 30 tonnes.'],
        steps: ['Cost of gain = 540,000 ÷ 30 = 18,000 CU per tonne (18 CU per kg)'],
        output: 18000,
        interpretation: 'Each kilogram of weight gained cost 18 CU to produce.',
      },
      evidence: verifiedWithCaveat([
        ref('ndsu-as1161-feedlot-terms', 'Glossary — Cost of Gain', 'Total of all feedlot-related costs (feed, yardage, processing, medicine, interest and death loss) divided by total gain during the feeding period; can be calculated deads-in or deads-out.'),
        ref('uf-irsik-2006-feedlot-health', 'Methods — cost of gain', 'Cost of gain is calculated by dividing the total cost for a pen while on feed by the total pounds of gain for that pen, with death loss included (deads-in) or excluded.'),
      ], 'Definition confirmed in an extension glossary and a peer-reviewed feedlot study.', [
        CATTLE_SOURCE_NOTE,
        'The cost scope (feed, yardage, processing, medicine, interest, death loss) must be stated; feed-only figures are not comparable.',
        DEADS,
      ]),
      suggestedApplication: 'Livestock and animal-feed profitability cases.',
    }),
    packMetric({
      metricId: 'dressing-percentage', name: 'Dressing Percentage (Carcass Yield)', category: 'operational-efficiency',
      relatedMetricIds: ['cost-of-gain', 'average-daily-gain', 'mortality-rate'],
      definition: 'Carcass weight as a percentage of final live weight.',
      businessMeaning: 'Links the live weight a farm produces to the carcass weight a processor sells.',
      unit: 'percent', frequency: 'per-period',
      reportingScope: 'Lot, species and slaughter plant; the live-weight basis (farm scale, plant scale, shrink-adjusted) must be stated.',
      interpretation: interp(
        'More saleable carcass per unit of live weight.',
        'More weight lost as hide, offal, gut fill and trim.',
        ['Live weight depends on feed and water fill and on shrink, so the same animals can show different percentages on different weighing bases.'],
        ['Species and breed', 'Fill and shrink before slaughter', 'Fatness and muscling'],
        ['Price live-weight versus carcass-weight contracts.', 'Manage processor yield.'],
        ['Applying one species’ yield to another.', 'Mixing shrink-adjusted and unadjusted live weights.'],
      ),
      example: {
        scenario: 'A processor reviews a lot of finished cattle.',
        inputs: { carcassWeight: 330, liveWeight: 540 },
        assumptions: ['Average weights per animal in kg.', 'Live weight at the plant, before slaughter.'],
        steps: ['Dressing percentage = 330 ÷ 540 = 61.1%'],
        output: 0.6111111,
        interpretation: 'About 61 kg of every 100 kg of live weight became carcass.',
      },
      evidence: verifiedWithCaveat([
        ref('ndsu-as1161-feedlot-terms', 'Glossary — Dressing Percent', 'Carcass weight divided by final live weight, times 100; live weights may be adjusted for shrink at the feedyard, local scale or plant.'),
      ], 'Extension glossary definition for slaughter cattle.', [
        'Defined in the source for slaughter cattle; other species (for example poultry or pigs) use their own yield conventions, which were not read.',
        'State the live-weight basis (shrink-adjusted, farm scale or plant scale).',
      ]),
      suggestedApplication: 'Livestock processing and value-chain cases.',
    }),
  ],
  links: [
    { metricId: 'mortality-rate', curriculumIds: ['agri-livestock'], priority: 'core', relatedModule: 'M02', interpretation: 'Death loss wastes purchase, feed and care already invested; track by batch and stage.' },
    { metricId: 'average-daily-gain', curriculumIds: ['agri-livestock'], priority: 'core', relatedModule: 'M02', interpretation: 'Growth speed sets days to market; read with feed conversion and cost of gain.' },
    { metricId: 'cost-of-gain', curriculumIds: ['agri-livestock'], priority: 'core', relatedModule: 'M03', interpretation: 'Cost per tonne of liveweight produced; the link between feed price, feed conversion and farm margin.' },
    { metricId: 'dressing-percentage', curriculumIds: ['agri-livestock'], priority: 'supporting', relatedModule: 'M03', interpretation: 'Carcass yield connects farm output to processor output.' },
  ],
  missingHighPriority: [],
};
