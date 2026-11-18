// Verified Real-World Case Studies for Consumer Finance and Payments & Fintech chapters, rendered with the same
// block as Commercial Banking (BankingCaseStudyBlock). Cases are looked up by `${module}|${chapter title}`, so
// chapters without a case keep their original body and sources exactly. Facts in context, action and outcome come
// from the cited source and are labelled company-reported; calculations are labelled as calculated here, and the
// takeaway is analysis, never a reported fact. Checked against the sources on 2026-11-17.

import type { ReactNode } from 'react';
import { BankingCaseStudyBlock } from './commercialBankingCore';
import type { BankingCaseStudy } from './commercialBankingCore';
import type { FashionM2Source } from './fashionM2Core';

const source = (title: string, href: string, publisher: string, note: string): FashionM2Source => ({ title, href, publisher, note });

const SOURCES = {
  vpbAnnualReport24: source('VPBank Annual Report 2024', 'https://www.vpbank.com.vn/-/media/vpbank-latest/5nha-dau-tu/bao-cao-thuong-nien/2024/vpbank-bctn-2024-eng-1.pdf', 'VPBank', 'Official annual report, 2025: FE CREDIT 2024 disbursements, revenue and profit before tax; consolidated NPL ratio 4.48% at end-2023 and 3.52% at end-2024; transfer of a 49% stake in FE CREDIT to SMBC Consumer Finance.'),
  adyenH22024: source('Adyen publishes H2 2024 financial results', 'https://www.adyen.com/press-and-media/adyen-publishes-h2-2024-financial-results', 'Adyen', 'Company press release, 13 February 2025; figures are unaudited and net revenue is a non-IFRS measure.'),
  napasHome: source('NAPAS English home page', 'https://en.napas.com.vn/', 'NAPAS', 'Operator’s own website, read on 17 November 2026; the network figures on the page are undated.'),
} satisfies Record<string, FashionM2Source>;

export const CONSUMER_FINANCE_CASES: Record<string, BankingCaseStudy> = {
  '1|Who Participates in Vietnam Consumer Finance?': {
    bank: 'FE CREDIT (VPBank group)',
    title: 'A consumer-finance company rebuilt inside a bank group',
    context: 'FE CREDIT is the consumer-finance subsidiary of VPBank. In its Annual Report 2024, VPBank names itself and SMBC Consumer Finance (a subsidiary of SMBC Group) as FE CREDIT’s two parent shareholders, and says it completed the transfer of a 49% stake to SMBC Consumer Finance in 2021 at a valuation of US$2.8 billion.',
    problem: 'A consumer lender that grows fast on unsecured credit can accumulate delinquent loans, and its results then feed through to the group that owns it. VPBank’s report treats 2023 and 2024 as a restructuring period for FE CREDIT.',
    action: 'VPBank reports that FE CREDIT optimised its business model, improved its risk-control framework and completed a digital transformation model, working under a group operating model with its two parents. It made two-wheeler loans a strategic product for 2024, with packages whose interest rates start at 0% a year and credit limits of up to VND100 million, and its card business achieved PCI DSS 4.0 Level 1 certification.',
    mechanism: 'Tighter risk control and collections aim to lower delinquency, and a smaller credit-loss charge lets a growing loan book show a profit. The passages checked give FE CREDIT’s own NPL trend only in words and give no stand-alone NPL ratio, so the link between restructuring and results is a mechanism, not a measured effect.',
    outcome: '2024, company-reported: FE CREDIT disbursed more than VND43 trillion, 40% above 2023; credit to customers rose 10.3% to above VND62 trillion; total revenue was VND15,842 billion, up 19.3%; profit before tax was VND512 billion after three consecutive profitable quarters; and 1.88 million new accounts or customers were added. VPBank’s consolidated NPL ratio fell from 4.48% at end-2023 to 3.52% at end-2024, which the bank attributes to FE CREDIT’s recovery together with stronger asset quality at the bank itself. The passages checked do not state FE CREDIT’s 2023 result.',
    takeaway: 'Disbursement, outstanding credit, revenue and profit are different measures and moved by different amounts. Profit after restructuring shows the loss cycle turning, not that unsecured lending has become low-risk: 40% more disbursement adds loans whose losses appear later. A subsidiary’s credit quality also moves the group’s consolidated NPL ratio. Hypothetical KPIs: delinquency by monthly cohort, cost of risk against revenue, early-arrears rate by sales channel and the share of revenue spent on promotions.',
    sources: [SOURCES.vpbAnnualReport24],
    verifiedAt: '17 November 2026',
  },
};

export const PAYMENTS_FINTECH_CASES: Record<string, BankingCaseStudy> = {
  '3|Which KPIs Drive Payment and Fintech Profitability?': {
    bank: 'Adyen',
    title: 'Processed volume grew faster than net revenue',
    context: 'Adyen is an Amsterdam-listed payments company that describes itself as a financial technology platform offering end-to-end payments, data-driven insights and financial products in a single global solution (press release, 13 February 2025).',
    problem: 'A payments company can process a very large value while keeping only a small slice of it as revenue. Treating volume as revenue overstates the business, and volume growth alone hides what happens to retained revenue.',
    action: 'Adyen reports processed volume and net revenue as separate lines, next to point-of-sale volume, EBITDA and free-cash-flow conversion, and states volume growth both in total and excluding a single large-volume customer.',
    mechanism: 'Net revenue, which Adyen labels a non-IFRS measure, is what the company retains from the volume it processes. The ratio between the two moves with customer mix, pricing and volume that carries little revenue, so the same volume can support quite different revenue.',
    outcome: 'Full-year 2024, company-reported and unaudited: processed volume EUR1,285.9 billion, up 33% (27% excluding a single large-volume customer); net revenue EUR1,996.1 million, up 23%; point-of-sale volume EUR232.7 billion, up 46%; EBITDA EUR992.3 million, a 50% margin against 46% in 2023. Calculated here from the two reported figures, not stated in the release: net revenue was about 0.155% of processed volume, roughly 15.5 basis points.',
    takeaway: 'Volume and revenue are different KPIs: in 2024 volume grew about ten percentage points faster than net revenue. One explanation to test, not stated by the company in this release, is that large customers or newer volume carry less revenue per transaction. Compare take rate, net revenue per transaction and contribution margin on the same definitions, and check whether a reported figure is gross or net before ranking providers. Hypothetical KPIs: net revenue per transaction, take rate by customer cohort, payment success rate and retained revenue after processing cost.',
    sources: [SOURCES.adyenH22024],
    verifiedAt: '17 November 2026',
  },
  "1|How Does Vietnam's Payment Infrastructure Operate?": {
    bank: 'NAPAS (National Payment Corporation of Vietnam)',
    title: 'One shared switch instead of many bilateral links',
    context: 'NAPAS describes itself as the operator of a financial switching system for retail payments in Vietnam. Its stated mission is to be the most trusted retail payment network for governments, banks, payment intermediaries, customers and partners.',
    problem: 'In general, without a shared switch every bank, wallet and merchant acquirer would need its own link to every other participant so that an account or card at one institution could pay or receive money at another.',
    action: 'NAPAS says it operates a switching system connecting ATMs and POS or mPOS devices, and offers services to banks and payment intermediaries, including FastFund 247 for immediate transfers by card or bank account, FastFund 247 with VietQR for transfers made by scanning a QR code, QR code payment, bill payment and e-wallet cash-in and cash-out.',
    mechanism: 'Each participant connects once to the switch, which routes the instruction to the other institution, instead of building a separate link to each. The chapter’s distinction still applies: the switch routes transaction messages, while the money moves under each institution’s own settlement arrangements, which the page does not describe.',
    outcome: 'NAPAS website, read on 17 November 2026, company-reported and undated on the page: the switching system connects more than 20,600 ATMs and nearly 741,000 payment acceptance devices (POS/mPOS) and serves more than 80 million customers from 68 member organisations, including banks and financial companies. The page gives no transaction volumes, values or market share, so none are claimed.',
    takeaway: 'A shared switch is infrastructure with network effects: its value rises with the number of connected institutions and devices. Device and customer counts measure reach, not transaction volume, revenue or settlement, so they cannot be read as market share or profit. Hypothetical KPIs: transaction success rate by service, availability at peak load, dispute and reconciliation turnaround, and the share of volume carried by QR transfers against cards.',
    sources: [SOURCES.napasHome],
    verifiedAt: '17 November 2026',
  },
};

export const withCaseStudy = (study: BankingCaseStudy | undefined, deepDive: ReactNode): ReactNode =>
  study ? (
    <div className="space-y-4">
      {deepDive}
      <BankingCaseStudyBlock study={study} />
    </div>
  ) : deepDive;

export const withCaseSources = (sources: FashionM2Source[], study: BankingCaseStudy | undefined): FashionM2Source[] =>
  study ? [...sources, ...study.sources.filter((extra) => !sources.some((base) => base.href === extra.href))] : sources;
