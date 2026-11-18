import type { IndustryPack } from '../../core/types';
import { interp, packMetric, ref, verifiedWithCaveat } from '../define';

export const PLATFORMS_ADDITIONS_PACK: IndustryPack = {
  packId: 'platforms-additions',
  label: 'Telecommunications, Social Platforms and PropTech additions',
  metrics: [
    packMetric({
      metricId: 'subscriber-growth', name: 'Subscriber Growth', category: 'growth',
      relatedMetricIds: ['revenue-growth', 'arpu', 'churn-rate'],
      definition: 'Percentage change in subscribers between the start and the end of a period.',
      businessMeaning: 'Shows whether the customer base is expanding; revenue growth is subscriber growth combined with the change in revenue per user.',
      unit: 'percent', frequency: 'quarterly',
      reportingScope: 'Operator, product or segment; use one subscriber definition at both dates.',
      variants: ['Net additions (end minus start) is the absolute counterpart.', 'Gross additions and churn explain the net change.'],
      interpretation: interp(
        'The base is expanding faster: more gross additions or lower churn.',
        'Slowing or shrinking base.',
        ['Growth bought with low-ARPU plans can lift subscribers faster than revenue.', 'A loose subscriber definition (for example inactive or promotional lines) inflates counts.'],
        ['Gross additions', 'Churn', 'Market penetration', 'Competition and pricing'],
        ['Set net-addition targets and track share of industry net additions.', 'Split revenue growth into subscribers and ARPU.'],
        ['Changing the subscriber definition between periods.', 'Reading net additions without churn.'],
      ),
      example: {
        scenario: 'A mobile operator compares subscriber counts at the start and end of the year.',
        inputs: { subscribersEnd: 4200000, subscribersStart: 4000000 },
        assumptions: ['One subscriber definition at both dates.'],
        steps: ['Net additions = 4,200,000 − 4,000,000 = 200,000', 'Growth = 200,000 ÷ 4,000,000 = 5%'],
        output: 0.05,
        interpretation: 'The base grew 5%; check ARPU and churn to see whether revenue grew as fast.',
      },
      evidence: verifiedWithCaveat([
        ref('openstax-prealgebra-2e', '6.2 — How To Find Percent Increase', 'Percent increase = (new amount − original amount) ÷ original amount.'),
      ], 'The percent-change arithmetic is verified; what counts as a subscriber follows the operator’s own definition.', [
        'Subscriber definitions are operator-specific (for example active, revenue-generating or SIM-based) and can change over time; compare growth only on a constant definition.',
        'The arithmetic is the general percent-change formula; no telecom standard defining “subscriber growth” was read.',
      ]),
      simulator: { drivers: ['Gross additions', 'Churn'], scenarioAssumptions: ['Constant subscriber definition'], relationships: ['Revenue = Average subscribers × ARPU'] },
      suggestedApplication: 'Telecom growth and market-share cases.',
    }),
  ],
  links: [
    { metricId: 'subscriber-growth', curriculumIds: ['tech-telecom'], priority: 'core', relatedModule: 'M04', interpretation: 'Net subscriber growth drives service revenue together with ARPU; read it with churn and the operator’s subscriber definition.' },
    { metricId: 'customer-retention-rate', curriculumIds: ['tech-social'], priority: 'supporting', relatedModule: 'M03', interpretation: 'User retention (share of existing users still active); non-contractual, so define the activity window and read it with DAU/MAU.' },
    { metricId: 'click-through-rate', curriculumIds: ['tech-social'], priority: 'supporting', relatedModule: 'M03', interpretation: 'Advertising engagement on platforms that sell ads; creative and targeting quality.' },
    { metricId: 'gross-merchandise-value', curriculumIds: ['realestate-proptech'], priority: 'supporting', relatedModule: 'M03', interpretation: 'Applies only to transactional platforms: value of sales or rentals facilitated, not listing activity; state the treatment of cancellations.' },
    { metricId: 'monthly-recurring-revenue', curriculumIds: ['realestate-proptech'], priority: 'supporting', relatedModule: 'M03', interpretation: 'Recurring revenue from agent and landlord subscriptions or property-management software.' },
    { metricId: 'net-revenue-retention', curriculumIds: ['realestate-proptech'], priority: 'supporting', relatedModule: 'M03', interpretation: 'Whether subscribed agents and landlords expand or shrink spend over a year.' },
    { metricId: 'customer-lifetime-value', curriculumIds: ['realestate-proptech'], priority: 'supporting', relatedModule: 'M03', interpretation: 'Subscription-model lifetime value; transactional marketplaces need a repeat-use assumption.' },
  ],
  missingHighPriority: [],
};
