import type { IndustryPack } from '../../core/types';
import { interp, packMetric, ref, verifiedWithCaveat } from '../define';

export const PAYMENTS_PACK: IndustryPack = {
  packId: 'payments',
  label: 'Payments & Fintech',
  metrics: [
    packMetric({
      metricId: 'total-payment-volume', name: 'Total Payment Volume', acronym: 'TPV', category: 'growth',
      relatedMetricIds: ['take-rate', 'transaction-loss-rate', 'merchant-discount-rate', 'gross-merchandise-value'],
      definition: 'The value of payments, net of payment reversals, successfully completed on a payments platform in the period.',
      businessMeaning: 'The scale measure of a payments business: revenue, take rate and loss rates are all read against it.',
      unit: 'currency', frequency: 'quarterly',
      reportingScope: 'Payments platform or product line; state whether partner-enabled and gateway-only transactions are included.',
      variants: ['PayPal counts payments enabled through a partner solution and excludes gateway-exclusive transactions.', 'OPay reports gross transaction value (GTV), which also includes loan amounts and transactions that generate no revenue.'],
      interpretation: interp(
        'More value flowing through the platform: more users, more payments or larger payments.',
        'Fewer or smaller payments, or more reversals.',
        ['Volume can grow through low-margin payment types, so revenue may grow more slowly than TPV.', 'TPV is a volume measure, not revenue.'],
        ['Active users and merchants', 'Payment frequency', 'Average payment value', 'Payment-method mix'],
        ['Track platform scale and merchant growth.', 'Provide the base for take rate and loss rates.'],
        ['Treating TPV as revenue.', 'Comparing TPV across providers with different inclusion rules (partner-enabled, gateway-only, loans).'],
      ),
      example: {
        scenario: 'A wallet operator reviews one quarter.',
        inputs: { paymentTransactions: 2000000, averagePaymentValue: 45 },
        assumptions: ['Successful payments only, with the average value net of reversals.', 'Values in CU.'],
        steps: ['TPV = 2,000,000 × 45 = 90,000,000 CU'],
        output: 90000000,
        interpretation: 'The platform completed 90 million CU of payments; take rate and loss rates are measured against this base.',
      },
      evidence: verifiedWithCaveat([
        ref('sec-paypal-10k-fy2025', 'Key performance metrics', 'TPV is the value of payments, net of payment reversals, successfully completed on the payments platform or enabled via a partner payment solution, not including gateway-exclusive transactions.'),
      ], 'One payments company’s own definition; no accounting standard defines TPV.', [
        'Company-defined operating metric: PayPal nets reversals, includes partner-enabled payments and excludes gateway-exclusive transactions; other providers define volume differently.',
        'The formula (transactions × average value per payment) is an identity for the same set of payments; use reported TPV where it is available.',
      ]),
      simulator: { drivers: ['Active users', 'Payment frequency', 'Average payment value'], scenarioAssumptions: ['Reversals netted'], relationships: ['Platform revenue = TPV × Take rate', 'Transaction loss rate = Transaction losses ÷ TPV'] },
      suggestedApplication: 'Payments and wallet growth cases.',
    }),
    packMetric({
      metricId: 'transaction-loss-rate', name: 'Transaction Loss Rate', category: 'risk-quality',
      relatedMetricIds: ['total-payment-volume', 'take-rate', 'payment-success-rate'],
      definition: 'Transaction losses (fraud, disputes and similar losses borne by the platform) divided by total payment volume.',
      businessMeaning: 'Shows how much of each unit of payment volume is lost to fraud and disputes; it comes straight off the platform’s margin.',
      unit: 'percent', frequency: 'quarterly',
      reportingScope: 'Payments platform; the numerator is company-defined (PayPal reports transaction losses and credit losses separately).',
      variants: ['Often called fraud loss rate or chargeback loss rate; the losses included differ by company (fraud only versus all transaction losses).'],
      interpretation: interp(
        'More payment volume is being lost to fraud, disputes or similar events.',
        'Fewer losses per unit of volume.',
        ['Tighter fraud controls can lower the loss rate while also lowering payment success and sales.', 'Small rates apply to very large volumes, so absolute losses can still be large.'],
        ['Fraud attack patterns', 'Fraud-screening rules', 'Payment mix (card-not-present versus in person)', 'Dispute and protection policies'],
        ['Set fraud-control limits and risk appetite.', 'Price merchant fees for risk.'],
        ['Comparing rates with different loss definitions.', 'Reading a low rate as proof of strong controls when volume is dominated by low-risk payments.'],
      ),
      example: {
        scenario: 'A payments platform reviews one quarter.',
        inputs: { transactionLosses: 90000, totalPaymentVolume: 90000000 },
        assumptions: ['Losses as the platform defines them; same period and scope as the volume.', 'Values in CU.'],
        steps: ['Loss rate = 90,000 ÷ 90,000,000 = 0.10%'],
        output: 0.001,
        interpretation: 'One CU of every 1,000 CU processed was lost to transaction losses.',
      },
      evidence: verifiedWithCaveat([
        ref('sec-paypal-10k-fy2025', 'MD&A — Transaction and credit losses', 'Transaction loss rate is transaction losses divided by TPV; credit losses are reported separately.'),
      ], 'One payments company’s own definition; the loss scope is company-specific.', [
        'Company-defined: PayPal divides transaction losses by TPV and reports credit losses separately; other providers include different loss types.',
        'The rate is very small by construction, so state it to two decimals or in basis points.',
      ]),
      suggestedApplication: 'Payments risk and fraud-control cases.',
    }),
    packMetric({
      metricId: 'merchant-discount-rate', name: 'Merchant Discount Rate', acronym: 'MDR', category: 'commercial-effectiveness',
      relatedMetricIds: ['take-rate', 'total-payment-volume', 'average-transaction-value'],
      definition: 'The charge recovered by the acquirer from the merchant, levied as a discount to the transaction amount, expressed as a percentage of the payment value processed.',
      businessMeaning: 'The price merchants pay to accept electronic payments; it funds the card issuer, the network and the acquirer.',
      unit: 'percent', frequency: 'monthly',
      reportingScope: 'Acquirer, payment method or merchant segment; MDR is a charge to the merchant, not the provider’s net revenue.',
      variants: ['Charges differ by channel (online versus in-person payments) and by merchant segment.'],
      interpretation: interp(
        'Merchants pay more to accept payments.',
        'Cheaper acceptance for merchants and less revenue to share among issuer, network and acquirer.',
        ['MDR is shared between issuer, acquirer and network, so a high MDR does not mean high acquirer profit.', 'Regulators can cap the charge for specific payment modes.'],
        ['Payment method and channel', 'Merchant size and risk', 'Interchange and network fees', 'Regulation'],
        ['Price merchant contracts.', 'Negotiate with issuers and networks.'],
        ['Confusing MDR (gross charge to the merchant) with take rate (the provider’s net revenue).', 'Comparing MDRs across payment modes subject to different caps.'],
      ),
      example: {
        scenario: 'An acquirer reviews card acceptance for a merchant segment.',
        inputs: { discountFees: 1350000, paymentValueProcessed: 90000000 },
        assumptions: ['Fees and payment value cover the same merchants, modes and period.', 'Values in CU.'],
        steps: ['MDR = 1,350,000 ÷ 90,000,000 = 1.5%'],
        output: 0.015,
        interpretation: 'Merchants paid 1.5 CU in discount fees for every 100 CU of payments accepted.',
      },
      evidence: verifiedWithCaveat([
        ref('rbi-charges-payment-systems-2022', 'Paragraph 6.3 and Section 7', 'The MDR is the charge recovered by the acquirer from the final recipient of money (the merchant), levied as a discount to the transaction amount and usually recovered at settlement; the paper states MDR caps as percentages of transaction value and notes online payments are usually charged more than in-person payments.'),
      ], 'Regulator definition from an Indian discussion paper; the concept is used internationally but rules differ.', [
        'Reserve Bank of India definition: MDR rules, caps and covered payment modes differ by jurisdiction.',
        'MDR is the gross charge to the merchant. Take rate measures the provider’s net revenue and is lower once interchange and scheme costs are paid out.',
      ], 'Reserve Bank of India payment-system charges'),
      suggestedApplication: 'Payments pricing and merchant-acquiring cases.',
    }),
  ],
  links: [
    { metricId: 'total-payment-volume', curriculumIds: ['banking-fintech'], priority: 'core', relatedModule: 'M03', interpretation: 'Scale of a payments business; revenue follows TPV × take rate, so growth in TPV alone is not growth in revenue.' },
    { metricId: 'transaction-loss-rate', curriculumIds: ['banking-fintech'], priority: 'core', relatedModule: 'M03', interpretation: 'Fraud and dispute losses relative to volume; trade it off against payment success and conversion.' },
    { metricId: 'merchant-discount-rate', curriculumIds: ['banking-fintech'], priority: 'supporting', relatedModule: 'M03', interpretation: 'Gross price of acceptance to merchants; compare with take rate to see how much the provider keeps.' },
  ],
  missingHighPriority: [],
};
