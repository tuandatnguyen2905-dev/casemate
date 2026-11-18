# Industry Metrics Library — Coverage Manifest

Status: draft, standalone, not integrated, not published. Updated 2026-11-08 after the verification review (verify pending metrics, correct formula oversimplifications, fill priority gaps).

How these numbers were produced: the TypeScript project could not be executed in the environment used for this review (it only had read/write access to the workspace files and no runnable copy). The counts below were derived from the saved source by an independent script that starts from the previous generated manifest and applies every status change, new metric and new link made in this review. They have not been confirmed by running `buildCoverageManifest()`. Run `npx tsx apps/IndustryMetrics/tests/runTests.ts` to regenerate and cross-check; the tests assert the same partition (verified + pending + rejected = authored) and the learner-visibility rule.

Catalog source: `reports/domain-knowledge-catalog-reconciliation-2026-10-31.md` and `reports/domain-knowledge-assessment-inventory-2026-11-05.json` (11 groups, 44 sub-industries, 41 implemented curricula, 3 Coming Soon: fmcg-beauty, fmcg-household, fmcg-tobacco; no metrics are associated with Coming Soon entries).

## Baseline reconciliation

| Measure | Founder-reported baseline | Saved source at the start of this review | After this review |
|---|---:|---:|---:|
| Unique metrics authored | 119 | 119 | 132 |
| Source-verified (Verified + Verified with caveat) | 40 | 71 | 97 |
| Pending verification | 79 | 48 | 35 |
| Rejected | — | — | 0 |
| Worked examples | 119 | 119 | 132 |
| Industry associations (authored metric × curriculum) | — | 384 | 403 |

The founder baseline of 40 verified / 79 pending was already out of date: an earlier run had verified 31 more metrics before this review started (71 verified / 48 pending in the saved files). The 17 passing tests / 7,726 checks quoted in the baseline could not be re-confirmed here; see the test section of the final report.

## Library totals

| Measure | Count |
|---|---:|
| Unique metrics authored | 132 |
| Shared cross-industry metrics (defined once) | 28 |
| Industry-pack metrics | 104 (13 packs) |
| Registered formulas | 132 |
| Independent formula checks | 155 (15 expect an error) |
| Verified | 34 |
| Verified with caveat | 63 |
| Pending verification | 35 |
| Rejected | 0 |
| Learner-ready (verified or caveated, and formula-tested) | 97 |
| Hypothetical worked examples | 132 |
| Evidence sources in the registry | 67 (37 earlier + 30 added in this review) |

Statuses: **Verified** = definition, formula and industry context supported by a source read in full and the example tested. **Verified with caveat** = correct under stated assumptions, standards or company definitions; the caveats are displayed to learners. **Pending verification** = no authoritative source confirmed; hidden from learners. **Rejected** = incorrect, inappropriate or contradicted; hidden from learners. No metric was rejected: nothing found was contradicted by a source. Only Verified and properly caveated Verified with caveat metrics are learner-visible.

Category label fix: Customer Churn Rate moved from Risk & Quality to Commercial Effectiveness so it sits with Customer Retention Rate.

## Review outcome (2026-11-08)

### Promoted from Pending (13)

| Metric | New status | Sources read |
|---|---|---|
| `cagr` | Verified with caveat | Ameriprise Exhibit 10.11 (CAGR formula written out for a 3-year EPS period) |
| `labor-cost-ratio` | Verified with caveat | Red Robin 10-K (labor as % of restaurant revenue) |
| `store-contribution-margin` | Verified with caveat | Tailored Brands S-1/A (4-Wall Store Contribution Margin = contribution ÷ store sales); Red Robin 10-K |
| `dau-mau-ratio` | Verified with caveat | Beachbody S-1/A; OPay F-1/A; Snap 10-K (DAU definition) |
| `cost-per-mille` | Verified | OpenStax Principles of Marketing 14.3 (CPM = cost ÷ impressions × 1,000) |
| `defect-rate` | Verified with caveat | NIST/SEMATECH e-Handbook 6.3.3.2 (fraction nonconforming/defective) |
| `vehicle-load-factor` | Verified with caveat | ACEA/McKinnon weight-based loading factor; Eurostat load capacity (formula also corrected to be explicitly weight-based) |
| `cost-per-tonne` | Verified with caveat | OpenStax managerial accounting (unit cost); NDSU cost of gain |
| `feed-conversion-ratio` | Verified with caveat | FAO glossary; USDA NAL thesaurus; University of Florida feedlot study |
| `post-harvest-loss-rate` | Verified with caveat | FAO SDG 12.3.1a (food loss percentage = loss ÷ production; scope metadata) |
| `physical-occupancy-rate` | Verified with caveat | Equity Residential 10-K (Physical Occupancy) |
| `development-margin` | Verified with caveat | Prologis 10-K (value creation ÷ total expected investment) |
| `utilization-rate` | Verified with caveat | Huron, FTI and CRA 10-Ks |

### Re-verified with a first-hand source

Hotel occupancy, ADR and RevPAR previously rested on a workspace note because the STR page refused automated access. Marriott’s FY2025 Form 10-K now confirms all three definitions (Item 7, Performance Measures); they remain Verified.

### Reclassified from Verified to Verified with caveat (38)

These were source-verified, but the source definition is company-, jurisdiction- or method-specific, or differs from the library formula. They stay learner-visible and now display explicit caveats (see `content/reviewLog.ts`): asset-yield, cost-of-funds, cost-to-income-ratio, cost-of-risk, loan-to-deposit-ratio, casa-ratio, capital-adequacy-ratio, npl-ratio, portfolio-yield, collection-rate, risk-adjusted-margin, persistency-ratio, return-on-assets, return-on-equity, annual-recurring-revenue, monthly-recurring-revenue, net-revenue-retention, gross-revenue-retention, customer-lifetime-value, ltv-to-cac, cac-payback-months, customer-acquisition-cost, gross-merchandise-value, take-rate, arpu, churn-rate, customer-retention-rate, scrap-rate, throughput-rate, shrinkage-rate, same-store-sales-growth, weighted-distribution, sales-per-sqm, average-transaction-value, days-inventory-outstanding, ebitda-margin, capacity-utilization, market-share.

### Still Pending (35) with recorded reasons

Each carries a review record (reason, what was searched, next step) in `content/reviewLog.ts`, shown in the Explorer in review mode. “Searched” = a source search or read was performed in this review; “carried” = the earlier build note was retained and the metric was not re-researched.

| Metric | Review | Reason |
|---|---|---|
| `approval-rate` | carried | HMDA defines denial rate, not approval rate |
| `payment-success-rate` | carried | no regulator or filing definition found earlier |
| `numeric-distribution` | searched | no filing contains the phrase; Haleon defines weighted distribution only |
| `trade-spend-ratio` | carried | IFRS 15 treatment not read |
| `sell-out-to-sell-in-ratio` | carried | no source located |
| `units-per-transaction` | searched | Chico’s and Urban Outfitters use the term without defining it |
| `gmroi` | searched | only definition read nets accounts payable against inventory |
| `sell-through-rate` | searched | used without definition in retail filings |
| `rule-of-40` | searched | heuristic; 3 filings, none defines it |
| `contribution-per-order` | searched | no filing contains the phrase |
| `payer-conversion-rate` | carried | gaming filings define payer counts, not the ratio |
| `capex-intensity` | searched | 9 operator annual reports read; none defines capital intensity as a metric |
| `unplanned-downtime-rate` | carried | NIST/ISO 22400-2 restatement has no such ratio |
| `cost-per-shipment` | searched | no filing contains “cost per piece” |
| `order-fill-rate` | searched | 3 filings use the phrase, not read for a definition |
| `warehouse-space-utilization` | carried | no source located |
| `inventory-record-accuracy` | searched | no filing contains the phrase |
| `first-attempt-delivery-rate` | searched | no filing contains the phrase |
| `contribution-per-delivery` | carried | no source located |
| `gross-margin-per-hectare` | carried | no source located |
| `break-even-price` | searched | only feedlot-cattle breakeven found (NDSU) |
| `break-even-yield` | searched | no crop definition found |
| `trading-margin-per-tonne` | carried | no source located |
| `gross-rental-yield` | searched | no filing contains “gross rental yield” |
| `goppar` | searched | USALI is a paid standard; filings give no definition |
| `food-cost-percentage` | searched | 7 restaurant 10-Ks: no food-only food-cost percentage |
| `prime-cost-percentage` | searched | no “prime cost” in 7 restaurant 10-Ks |
| `table-turnover` | searched | 9 filings mention table turns, not read |
| `revpash` | searched | no filing contains the phrase; Cornell literature not read |
| `expiry-write-off-rate` | carried | no source located |
| `realization-rate` | searched | only a medical-billing hit; not professional services |
| `revenue-per-fte` | carried | no source located |
| `project-margin` | carried | no source located |
| `cost-per-engagement` | carried | no source located |
| `on-time-delivery` | carried | “on time” is contract-specific; no source located |

### Rejected

None. No source contradicted a library definition; the formula defects found were corrected instead (see the final report, Formula QA).

## Priority-pack verification status

| Pack | Metric id | Status |
|---|---|---|
| Banking & Financial Services | `cost-of-risk` | Verified with caveat |
| Banking & Financial Services | `loan-to-deposit-ratio` | Verified with caveat |
| Banking & Financial Services | `casa-ratio` | Verified with caveat |
| Banking & Financial Services | `approval-rate` | Pending |
| Banking & Financial Services | `portfolio-yield` | Verified with caveat |
| Banking & Financial Services | `collection-rate` | Verified with caveat |
| Banking & Financial Services | `risk-adjusted-margin` | Verified with caveat |
| Banking & Financial Services | `payment-success-rate` | Pending |
| Banking & Financial Services | `persistency-ratio` | Verified with caveat |
| FMCG / Retail | `net-sales` | Verified |
| FMCG / Retail | `numeric-distribution` | Pending |
| FMCG / Retail | `weighted-distribution` | Verified with caveat |
| FMCG / Retail | `trade-spend-ratio` | Pending |
| FMCG / Retail | `same-store-sales-growth` | Verified with caveat |
| FMCG / Retail | `sales-per-sqm` | Verified with caveat |
| FMCG / Retail | `shrinkage-rate` | Verified with caveat |
| FMCG / Retail | `gmroi` | Pending |
| FMCG / Retail | `sell-through-rate` | Pending |
| FMCG / Retail | `average-transaction-value` | Verified with caveat |
| FMCG / Retail | `conversion-rate` | Verified |
| FMCG / Retail | `market-share` | Verified with caveat |
| Technology | `monthly-recurring-revenue` | Verified with caveat |
| Technology | `gross-revenue-retention` | Verified with caveat |
| Technology | `churn-rate` | Verified with caveat |
| Technology | `customer-acquisition-cost` | Verified with caveat |
| Technology | `customer-lifetime-value` | Verified with caveat |
| Technology | `ltv-to-cac` | Verified with caveat |
| Technology | `cac-payback-months` | Verified with caveat |
| Technology | `gross-merchandise-value` | Verified with caveat |
| Technology | `take-rate` | Verified with caveat |
| Technology | `arpu` | Verified with caveat |
| Manufacturing | `scrap-rate` | Verified with caveat |
| Manufacturing | `defect-rate` | Verified with caveat |
| Manufacturing | `unit-production-cost` | Verified |
| Manufacturing | `unplanned-downtime-rate` | Pending |
| Manufacturing | `throughput-rate` | Verified with caveat |

29 of 36 priority metrics are verified (with or without caveat); 7 remain pending.

## Per curriculum

| Curriculum id | Sub-industry | Identified | Authored | Source-verified | Formula-tested | Ready for learners | Pending verification | Worked examples | Missing high-priority metrics |
|---|---|---:|---:|---:|---:|---:|---:|---:|---|
| `fmcg-dairy` | Dairy | 14 | 12 | 9 | 12 | 9 | 3 | 12 | Price/mix contribution; Out-of-stock rate |
| `fmcg-packaged-food` | Packaged Food & Confectionery | 14 | 12 | 9 | 12 | 9 | 3 | 12 | Price/mix contribution; A&P spend ratio |
| `fmcg-beverages-na` | Non-Alcoholic Beverages | 13 | 11 | 8 | 11 | 8 | 3 | 11 | Price/mix contribution; Cooler (visi-cooler) placement productivity |
| `fmcg-beverages-alc` | Beer & Alcoholic Beverages | 13 | 11 | 8 | 11 | 8 | 3 | 11 | Price/mix contribution; Excise as % of net sales |
| `retail-fashion` | Fashion, Sports & Lifestyle Retail | 15 | 13 | 10 | 13 | 10 | 3 | 13 | Markdown rate; Full-price sell-through |
| `retail-grocery` | Grocery & General Merchandise Retail | 14 | 12 | 10 | 12 | 10 | 2 | 12 | Fresh waste rate; On-shelf availability |
| `retail-pharmacy` | Pharmacy Retail | 15 | 13 | 11 | 13 | 11 | 2 | 13 | Prescription versus OTC sales mix; Expiry write-off rate |
| `retail-coffee` | Coffeehouse & Foodservice Retail | 12 | 10 | 9 | 10 | 9 | 1 | 10 | Transactions per store per day; Food attach rate |
| `banking-commercial` | Commercial Banking | 15 | 12 | 12 | 12 | 12 | 0 | 12 | Liquidity Coverage Ratio; CET1 ratio; Fee income ratio |
| `banking-consumer-finance` | Consumer Finance | 15 | 12 | 11 | 12 | 11 | 1 | 12 | Roll rate (DPD bucket migration); First-payment default rate; Vintage loss curve |
| `banking-insurance` | Life Insurance | 10 | 9 | 9 | 9 | 9 | 0 | 9 | Claims ratio |
| `banking-fintech` | Payments & Fintech | 12 | 10 | 9 | 10 | 9 | 1 | 10 | Monthly active users; Chargeback rate |
| `tech-enterprise-sw` | Enterprise Software & IT Services | 15 | 13 | 12 | 13 | 12 | 1 | 13 | IT services utilisation and billable rate; Remaining performance obligations (RPO) |
| `tech-ecommerce` | E-Commerce & Digital Marketplaces | 12 | 10 | 9 | 10 | 9 | 1 | 10 | Repeat purchase rate; Fulfilment cost per order |
| `tech-gaming` | Gaming & Digital Entertainment | 11 | 8 | 7 | 8 | 7 | 1 | 8 | Day-1/Day-7 retention; ARPPU; ARPDAU |
| `tech-electronics` | Consumer Electronics & Semiconductors | 8 | 6 | 6 | 6 | 6 | 0 | 6 | Book-to-bill ratio; R&D intensity |
| `tech-telecom` | Telecommunications & Connectivity | 9 | 6 | 5 | 6 | 5 | 1 | 6 | Data usage per subscriber; Network utilisation; Network availability |
| `tech-adtech` | Digital Marketing & AdTech | 9 | 7 | 7 | 7 | 7 | 0 | 7 | Fill rate; Viewability rate |
| `tech-social` | Social & Communication Platforms | 9 | 7 | 7 | 7 | 7 | 0 | 7 | Time spent per user; Ad load |
| `mfg-electronics` | Consumer Electronics & Appliances | 15 | 13 | 11 | 13 | 11 | 2 | 13 | Line changeover time; Cost of poor quality |
| `mfg-machinery` | Machinery & Power Tools | 16 | 14 | 12 | 14 | 12 | 2 | 14 | Order backlog / book-to-bill; Warranty cost ratio |
| `mfg-electrical` | Electrical & Energy Equipment | 17 | 15 | 14 | 15 | 14 | 1 | 15 | Order backlog / book-to-bill; Warranty cost ratio |
| `mfg-textiles` | Textiles & Apparel Manufacturing | 14 | 12 | 11 | 12 | 11 | 1 | 12 | Standard-minute value (SMV) efficiency; Labour productivity per operator |
| `mfg-building` | Building Materials & Coatings | 13 | 11 | 10 | 11 | 10 | 1 | 11 | Energy (kcal or kWh) per tonne; Clinker factor |
| `mfg-packaging` | Packaging, Labels & Industrial Materials | 16 | 14 | 12 | 14 | 12 | 2 | 14 | Material yield (net to gross); Changeover time |
| `logistics-freight` | Freight Forwarding & Ocean Logistics | 9 | 6 | 4 | 6 | 4 | 2 | 6 | TEU volume; Net revenue per TEU; Schedule reliability |
| `logistics-contract` | Contract Logistics & Warehousing | 9 | 7 | 2 | 7 | 2 | 5 | 7 | Units picked per labour hour; Dock-to-stock time |
| `logistics-express` | Express & Last-Mile Delivery | 9 | 6 | 2 | 6 | 2 | 4 | 6 | Stops per route hour; Parcels per stop; Cash-on-delivery refusal rate |
| `logistics-distribution` | Distribution & Market Expansion Services | 9 | 7 | 4 | 7 | 4 | 3 | 7 | Cost to serve per outlet; Strike rate (orders per visit) |
| `agri-livestock` | Livestock & Animal Feed | 10 | 9 | 9 | 9 | 9 | 0 | 9 | Poultry and pig mortality and carcass-yield conventions |
| `agri-commodities` | Agricultural Commodities & Trading | 8 | 6 | 5 | 6 | 5 | 1 | 6 | Basis (local price minus futures); Hedge ratio |
| `agri-crop` | Crop Production & Agricultural Processing | 10 | 8 | 5 | 8 | 5 | 3 | 8 | Input productivity (output per unit of fertiliser or water); Processing recovery rate |
| `realestate-development` | Property Development & Investment | 10 | 8 | 8 | 8 | 8 | 0 | 8 | Pre-sales / absorption rate; Project cash-flow peak funding |
| `realestate-advisory` | Property Advisory & Management | 11 | 8 | 7 | 8 | 7 | 1 | 8 | Economic occupancy; Weighted average lease expiry (WALE); Fee revenue per transaction |
| `realestate-proptech` | Property Technology & Marketplaces | 11 | 9 | 8 | 9 | 8 | 1 | 9 | Active listings; Lead-to-transaction rate |
| `hospitality-hotels` | Hotels & Resorts | 10 | 8 | 7 | 8 | 7 | 1 | 8 | TRevPAR (total revenue per available room); Channel cost (commission) ratio |
| `hospitality-restaurants` | Restaurant Chains | 12 | 10 | 6 | 10 | 6 | 4 | 10 | Delivery contribution per order; Covers per labour hour |
| `healthcare-products` | Healthcare Products & Nutrition | 13 | 10 | 7 | 10 | 7 | 3 | 10 | OTIF (on time in full); Product recall rate; Prescription-channel share |
| `professional-audit` | Audit & Assurance | 12 | 10 | 6 | 10 | 6 | 4 | 10 | Lock-up days (WIP + debtors); Audit quality inspection findings |
| `professional-consulting` | Management & Technology Consulting | 11 | 9 | 6 | 9 | 6 | 3 | 9 | Leverage ratio (staff per partner); Sales pipeline coverage |
| `professional-advisory` | Project & Construction Advisory | 11 | 9 | 5 | 9 | 5 | 4 | 9 | Project cost variance; Schedule variance |
| **Total (associations)** | | **491** | **403** | **329** | **403** | **329** | **74** | **403** | |

Per-curriculum counts are associations, so a shared metric (for example Gross Margin) counts once for every curriculum it is linked to. “Source-verified” includes Verified with caveat.

Sub-industries improved in this review (authored metrics): Life Insurance 4 → 9, Payments & Fintech 7 → 10, Telecommunications 5 → 6, Social & Communication Platforms 5 → 7, Livestock & Animal Feed 5 → 9, Property Technology 5 → 9. Thinner packs improved through newly verified metrics (learner-ready counts): Freight Forwarding 3 → 4, Contract Logistics 1 → 2, Express & Last-Mile 1 → 2, Restaurant Chains 4 → 6, Audit & Assurance 4 → 6, Management Consulting 4 → 6, Project & Construction Advisory 3 → 5.

## Per metric

| Metric id | Name | Category | Shared | Status | Curricula linked | Sources |
|---|---|---|---|---|---:|---|
| `revenue-growth` | Revenue Growth | growth | yes | Verified | 23 | openstax-prealgebra-2e |
| `cagr` | Compound Annual Growth Rate (CAGR) | growth | yes | Verified with caveat | 12 | sec-ameriprise-ex1011-2021 |
| `gross-margin` | Gross Margin | financial-performance | yes | Verified | 23 | openstax-finance-2e |
| `ebitda-margin` | EBITDA Margin | financial-performance | yes | Verified with caveat | 2 | sec-nongaap-cdi |
| `net-profit-margin` | Net Profit Margin | financial-performance | yes | Verified | 5 | openstax-finance-2e |
| `contribution-margin-ratio` | Contribution Margin Ratio | financial-performance | yes | Verified | 8 | openstax-managerial-accounting |
| `break-even-units` | Break-Even Volume | financial-performance | yes | Verified | 4 | openstax-managerial-accounting |
| `inventory-turnover` | Inventory Turnover | operational-efficiency | yes | Verified | 18 | openstax-finance-2e |
| `days-inventory-outstanding` | Days Inventory Outstanding (DIO) | operational-efficiency | yes | Verified with caveat | 4 | openstax-finance-2e |
| `days-sales-outstanding` | Days Sales Outstanding (DSO) | risk-quality | yes | Verified | 7 | openstax-finance-2e |
| `cash-conversion-cycle` | Cash Conversion Cycle (CCC) | operational-efficiency | yes | Verified | 4 | openstax-finance-2e |
| `return-on-assets` | Return on Assets (ROA) | financial-performance | yes | Verified with caveat | 4 | openstax-finance-2e, imf-fsi-2019, fdic-qbp-notes-2026q2 |
| `return-on-equity` | Return on Equity (ROE) | financial-performance | yes | Verified with caveat | 4 | openstax-finance-2e, imf-fsi-2019, fdic-qbp-notes-2026q2 |
| `capacity-utilization` | Capacity Utilization | operational-efficiency | yes | Verified with caveat | 8 | frb-g17-about |
| `customer-acquisition-cost` | Customer Acquisition Cost (CAC) | commercial-effectiveness | yes | Verified with caveat | 6 | sec-thorne-s1a-2021 |
| `customer-retention-rate` | Customer Retention Rate | commercial-effectiveness | yes | Verified with caveat | 5 | sec-thorne-s1a-2021 |
| `market-share` | Market Share | commercial-effectiveness | yes | Verified with caveat | 5 | doj-ftc-merger-guidelines-2023 |
| `net-present-value` | Net Present Value (NPV) | financial-performance | yes | Verified | 4 | openstax-finance-2e |
| `internal-rate-of-return` | Internal Rate of Return (IRR) | financial-performance | yes | Verified | 4 | openstax-finance-2e |
| `average-transaction-value` | Average Transaction Value (ATV) | commercial-effectiveness | yes | Verified with caveat | 6 | sec-home-depot-10k-fy2024 |
| `conversion-rate` | Conversion Rate | commercial-effectiveness | yes | Verified | 6 | openstax-marketing |
| `take-rate` | Take Rate | industry-specific | yes | Verified with caveat | 5 | sec-etsy-10k-fy2025 |
| `labor-cost-ratio` | Labour Cost Ratio | operational-efficiency | yes | Verified with caveat | 7 | sec-redrobin-10k-fy2025 |
| `on-time-delivery` | On-Time Delivery Rate (OTD) | risk-quality | yes | Pending | 8 | — |
| `churn-rate` | Customer Churn Rate | commercial-effectiveness | yes | Verified with caveat | 5 | sec-thorne-s1a-2021, sec-tmobile-10k-fy2025 |
| `arpu` | Average Revenue per User (ARPU) | commercial-effectiveness | yes | Verified with caveat | 4 | sec-tmobile-10k-fy2025, sec-snap-10k-fy2025, sec-pinterest-10k-fy2025 |
| `same-store-sales-growth` | Same-Store Sales Growth (SSSG) | growth | yes | Verified with caveat | 5 | sec-home-depot-10k-fy2024 |
| `store-contribution-margin` | Store (Outlet) Contribution Margin | financial-performance | yes | Verified with caveat | 5 | sec-tailored-brands-s1a-2026, sec-redrobin-10k-fy2025 |
| `net-interest-margin` | Net Interest Margin (NIM) | financial-performance |  | Verified | 1 | fdic-qbp-notes-2026q2 |
| `asset-yield` | Yield on Earning Assets | financial-performance |  | Verified with caveat | 1 | fdic-qbp-notes-2026q2 |
| `cost-of-funds` | Cost of Funds (Cost of Funding Earning Assets) | financial-performance |  | Verified with caveat | 2 | fdic-qbp-notes-2026q2 |
| `cost-to-income-ratio` | Cost-to-Income Ratio (CIR) | operational-efficiency |  | Verified with caveat | 1 | imf-fsi-2019, fdic-qbp-notes-2026q2 |
| `npl-ratio` | Nonperforming Loan Ratio (NPL ratio) | risk-quality |  | Verified with caveat | 2 | imf-datahelp-npl, imf-fsi-2019 |
| `npl-coverage-ratio` | NPL Coverage Ratio | risk-quality |  | Verified | 1 | imf-cef-fsi-webinar-2022 |
| `cost-of-risk` | Cost of Risk | risk-quality |  | Verified with caveat | 2 | eba-risk-dashboard-q4-2023 |
| `loan-to-deposit-ratio` | Loan-to-Deposit Ratio (LDR) | risk-quality |  | Verified with caveat | 1 | eba-risk-dashboard-q4-2023 |
| `casa-ratio` | CASA Ratio | industry-specific |  | Verified with caveat | 1 | rbi-casa-pr-2022 |
| `capital-adequacy-ratio` | Capital Adequacy Ratio (CAR) | risk-quality |  | Verified with caveat | 1 | imf-fsi-2019 |
| `net-charge-off-rate` | Net Charge-Off Rate | risk-quality |  | Verified | 1 | frb-chargeoff-about |
| `delinquency-rate` | Delinquency Rate | risk-quality |  | Verified | 1 | frb-chargeoff-about |
| `approval-rate` | Approval Rate | commercial-effectiveness |  | Pending | 1 | — |
| `portfolio-yield` | Portfolio Yield | financial-performance |  | Verified with caveat | 1 | sec-oportun-10k-fy2025 |
| `collection-rate` | Collection Rate | risk-quality |  | Verified with caveat | 1 | cgap-op3-1999 |
| `risk-adjusted-margin` | Risk-Adjusted Margin | industry-specific |  | Verified with caveat | 1 | sec-oportun-8k-q3-2026 |
| `payment-success-rate` | Payment Success Rate | risk-quality |  | Pending | 1 | — |
| `persistency-ratio` | 13th-Month Persistency | industry-specific |  | Verified with caveat | 1 | irdai-aaar-persistency |
| `volume-growth` | Volume Growth | growth |  | Verified | 5 | openstax-prealgebra-2e |
| `net-sales` | Net Sales (Gross-to-Net) | financial-performance |  | Verified | 4 | openstax-financial-accounting |
| `numeric-distribution` | Numeric Distribution | commercial-effectiveness |  | Pending | 6 | — |
| `weighted-distribution` | Weighted Distribution | commercial-effectiveness |  | Verified with caveat | 4 | sec-haleon-f1-2022 |
| `trade-spend-ratio` | Trade Spend Ratio | commercial-effectiveness |  | Pending | 4 | — |
| `sell-out-to-sell-in-ratio` | Sell-Out to Sell-In Ratio | industry-specific |  | Pending | 4 | — |
| `sales-per-sqm` | Sales per Square Metre | operational-efficiency |  | Verified with caveat | 3 | sec-home-depot-10k-fy2024 |
| `units-per-transaction` | Units per Transaction (UPT) | commercial-effectiveness |  | Pending | 3 | — |
| `shrinkage-rate` | Shrinkage Rate | risk-quality |  | Verified with caveat | 3 | sec-kohls-10k-fy2017 |
| `gmroi` | Gross Margin Return on Inventory Investment (GMROI) | financial-performance |  | Pending | 3 | — |
| `sell-through-rate` | Sell-Through Rate | operational-efficiency |  | Pending | 1 | — |
| `annual-recurring-revenue` | Annual Recurring Revenue (ARR) | growth |  | Verified with caveat | 2 | sec-sprout-q1-2024 |
| `monthly-recurring-revenue` | Monthly Recurring Revenue (MRR) | growth |  | Verified with caveat | 2 | sec-vertex-10k-fy2025 |
| `net-revenue-retention` | Net Revenue Retention (NRR) | growth |  | Verified with caveat | 2 | sec-sprout-q1-2024, sec-domo-q4-fy24 |
| `gross-revenue-retention` | Gross Revenue Retention (GRR) | risk-quality |  | Verified with caveat | 1 | sec-vertex-10k-fy2025 |
| `customer-lifetime-value` | Customer Lifetime Value (LTV) | commercial-effectiveness |  | Verified with caveat | 2 | sec-thorne-s1a-2021 |
| `ltv-to-cac` | LTV to CAC Ratio | commercial-effectiveness |  | Verified with caveat | 1 | sec-thorne-s1a-2021 |
| `cac-payback-months` | CAC Payback Period | commercial-effectiveness |  | Verified with caveat | 1 | sec-klaviyo-s1a-2023 |
| `rule-of-40` | Rule of 40 | industry-specific |  | Pending | 1 | — |
| `gross-merchandise-value` | Gross Merchandise Value (GMV) | growth |  | Verified with caveat | 2 | sec-ebay-10k-fy2025, sec-etsy-10k-fy2025 |
| `contribution-per-order` | Contribution per Order | financial-performance |  | Pending | 1 | — |
| `dau-mau-ratio` | DAU/MAU (Stickiness) | commercial-effectiveness |  | Verified with caveat | 2 | sec-beachbody-s1a-2024, sec-opay-f1a-2026, sec-snap-10k-fy2025 |
| `payer-conversion-rate` | Payer Conversion Rate | commercial-effectiveness |  | Pending | 1 | — |
| `capex-intensity` | Capex Intensity | industry-specific |  | Pending | 1 | — |
| `click-through-rate` | Click-Through Rate (CTR) | commercial-effectiveness |  | Verified | 2 | openstax-information-systems |
| `cost-per-mille` | Cost per Thousand Impressions (CPM) | commercial-effectiveness |  | Verified | 2 | openstax-marketing |
| `return-on-ad-spend` | Return on Ad Spend (ROAS) | commercial-effectiveness |  | Verified | 1 | openstax-marketing |
| `oee` | Overall Equipment Effectiveness (OEE) | operational-efficiency |  | Verified | 5 | oee-com-calculating |
| `availability` | Availability (OEE) | operational-efficiency |  | Verified | 5 | oee-com-calculating |
| `performance-efficiency` | Performance (OEE) | operational-efficiency |  | Verified | 5 | oee-com-calculating |
| `quality-rate` | Quality Rate (First-Pass Yield) | risk-quality |  | Verified | 7 | oee-com-calculating |
| `scrap-rate` | Scrap Rate | risk-quality |  | Verified with caveat | 3 | nist-kang-2016-kpi |
| `defect-rate` | Defect Rate | risk-quality |  | Verified with caveat | 3 | nist-handbook-p-chart |
| `unit-production-cost` | Unit Production Cost | operational-efficiency |  | Verified | 6 | openstax-managerial-accounting-costing |
| `unplanned-downtime-rate` | Unplanned Downtime Rate | operational-efficiency |  | Pending | 6 | — |
| `throughput-rate` | Throughput Rate | operational-efficiency |  | Verified with caveat | 5 | nist-kang-2016-kpi |
| `cost-per-shipment` | Cost per Shipment (Order or Parcel) | operational-efficiency |  | Pending | 3 | — |
| `order-fill-rate` | Order Fill Rate | risk-quality |  | Pending | 2 | — |
| `warehouse-space-utilization` | Warehouse Space Utilization | operational-efficiency |  | Pending | 1 | — |
| `inventory-record-accuracy` | Inventory Record Accuracy | risk-quality |  | Pending | 1 | — |
| `vehicle-load-factor` | Vehicle (Transport) Load Factor | operational-efficiency |  | Verified with caveat | 2 | acea-mckinnon-2010, eurostat-load-capacity |
| `first-attempt-delivery-rate` | First-Attempt Delivery Success Rate | risk-quality |  | Pending | 1 | — |
| `contribution-per-delivery` | Contribution per Delivery | financial-performance |  | Pending | 1 | — |
| `crop-yield` | Crop Yield | operational-efficiency |  | Verified | 1 | fao-crop-yield-glossary |
| `cost-per-tonne` | Production Cost per Tonne | operational-efficiency |  | Verified with caveat | 2 | openstax-managerial-accounting-costing, ndsu-as1161-feedlot-terms |
| `gross-margin-per-hectare` | Gross Margin per Hectare | financial-performance |  | Pending | 1 | — |
| `break-even-price` | Break-Even Price | risk-quality |  | Pending | 1 | — |
| `break-even-yield` | Break-Even Yield | risk-quality |  | Pending | 1 | — |
| `feed-conversion-ratio` | Feed Conversion Ratio (FCR) | industry-specific |  | Verified with caveat | 1 | fao-livestock-glossary-i3460e01, usda-nal-feed-conversion, uf-irsik-2006-feedlot-health |
| `post-harvest-loss-rate` | Post-Harvest Loss Rate | risk-quality |  | Verified with caveat | 2 | fao-eu-platform-flp-2023, fao-sdg-1231-metadata |
| `trading-margin-per-tonne` | Trading Margin per Tonne | financial-performance |  | Pending | 1 | — |
| `net-operating-income` | Net Operating Income (NOI) | financial-performance |  | Verified | 2 | occ-cre-handbook-v2 |
| `capitalization-rate` | Capitalization Rate (Cap rate) | financial-performance |  | Verified | 2 | occ-cre-handbook-v2 |
| `debt-service-coverage-ratio` | Debt Service Coverage Ratio (DSCR) | risk-quality |  | Verified | 2 | occ-cre-handbook-v2 |
| `loan-to-value` | Loan-to-Value Ratio (LTV (property)) | risk-quality |  | Verified | 2 | occ-cre-handbook-v2 |
| `debt-yield` | Debt Yield | risk-quality |  | Verified | 1 | occ-cre-handbook-v2 |
| `physical-occupancy-rate` | Occupancy Rate (Property) | operational-efficiency |  | Verified with caveat | 1 | sec-eqr-10k-fy2025 |
| `gross-rental-yield` | Gross Rental Yield | financial-performance |  | Pending | 2 | — |
| `development-margin` | Development Margin (Profit on Cost) | financial-performance |  | Verified with caveat | 1 | sec-prologis-10k-fy2025 |
| `hotel-occupancy-rate` | Occupancy Rate (Hotel) | operational-efficiency |  | Verified | 1 | ws-hotel-str-note, sec-marriott-10k-fy2025 |
| `average-daily-rate` | Average Daily Rate (ADR) | commercial-effectiveness |  | Verified | 1 | ws-hotel-str-note, sec-marriott-10k-fy2025 |
| `revpar` | Revenue per Available Room (RevPAR) | financial-performance |  | Verified | 1 | ws-hotel-str-note, sec-marriott-10k-fy2025 |
| `goppar` | Gross Operating Profit per Available Room (GOPPAR) | financial-performance |  | Pending | 1 | — |
| `food-cost-percentage` | Food Cost Percentage | operational-efficiency |  | Pending | 1 | — |
| `prime-cost-percentage` | Prime Cost Percentage | operational-efficiency |  | Pending | 2 | — |
| `table-turnover` | Table Turnover | operational-efficiency |  | Pending | 1 | — |
| `revpash` | Revenue per Available Seat-Hour (RevPASH) | financial-performance |  | Pending | 1 | — |
| `expiry-write-off-rate` | Expiry Write-Off Rate | risk-quality |  | Pending | 1 | — |
| `utilization-rate` | Utilization Rate (Billable) | operational-efficiency |  | Verified with caveat | 4 | sec-huron-10k-fy2025, sec-fti-10k-fy2025, sec-cra-10k-fy2025 |
| `realization-rate` | Realization Rate | commercial-effectiveness |  | Pending | 3 | — |
| `revenue-per-fte` | Revenue per FTE | operational-efficiency |  | Pending | 3 | — |
| `project-margin` | Project (Engagement) Margin | financial-performance |  | Pending | 3 | — |
| `cost-per-engagement` | Cost per Engagement | operational-efficiency |  | Pending | 2 | — |
| `annual-premium-equivalent` | Annual Premium Equivalent (APE) | industry-specific |  | Verified with caveat | 1 | prudential-glossary, ifrs-essentials-insurance-2017, generali-glossary |
| `vnb-margin` | Value of New Business Margin (VNB margin) | financial-performance |  | Verified with caveat | 1 | prudential-glossary |
| `value-of-new-business` | Value of New Business (VNB) | financial-performance |  | Verified with caveat | 1 | soa-embedded-value-2009, generali-glossary, ifrs-essentials-insurance-2017 |
| `embedded-value` | Embedded Value (EV) | financial-performance |  | Verified with caveat | 1 | soa-embedded-value-2009 |
| `solvency-ratio` | Solvency Ratio (Solvency II SCR coverage) | risk-quality |  | Verified with caveat | 1 | ivass-solvency-ii-guide-2016, eiopa-solvency-ii-art101 |
| `total-payment-volume` | Total Payment Volume (TPV) | growth |  | Verified with caveat | 1 | sec-paypal-10k-fy2025 |
| `transaction-loss-rate` | Transaction Loss Rate | risk-quality |  | Verified with caveat | 1 | sec-paypal-10k-fy2025 |
| `merchant-discount-rate` | Merchant Discount Rate (MDR) | commercial-effectiveness |  | Verified with caveat | 1 | rbi-charges-payment-systems-2022 |
| `subscriber-growth` | Subscriber Growth | growth |  | Verified with caveat | 1 | openstax-prealgebra-2e |
| `mortality-rate` | Mortality Rate (Death Loss) | risk-quality |  | Verified with caveat | 1 | uf-irsik-2006-feedlot-health |
| `average-daily-gain` | Average Daily Gain (ADG) | operational-efficiency |  | Verified with caveat | 1 | ndsu-as1161-feedlot-terms |
| `cost-of-gain` | Cost of Gain | financial-performance |  | Verified with caveat | 1 | ndsu-as1161-feedlot-terms, uf-irsik-2006-feedlot-health |
| `dressing-percentage` | Dressing Percentage (Carcass Yield) | operational-efficiency |  | Verified with caveat | 1 | ndsu-as1161-feedlot-terms |

All 132 metrics have a registered formula, an independent check and a hypothetical worked example that recalculates; learner visibility additionally requires a verified status.

## Remaining coverage gaps (priority industries)

- **Life Insurance**: claims ratio not authored (definition not read). Combined ratio is a non-life measure and is intentionally not linked. Solvency ratio covers the EU Solvency II concept only; other regimes are not modelled. VNB and embedded value need an actuarial model; the library computes only the arithmetic.
- **Payments & Fintech**: transaction success rate (payment success rate) stays pending; monthly active users and chargeback rate not authored; contribution margin and net revenue for payments were not authored (no source).
- **Telecommunications**: capex intensity stays pending; network utilisation, network availability and data usage per subscriber not authored.
- **Social & Communication Platforms**: DAU/MAU, ARPU, retention, CPM (advertising yield) and CTR now verified; time spent per user and ad load not authored.
- **Livestock & Animal Feed**: definitions come from cattle-feedlot sources; poultry and pig conventions were not read.
- **PropTech**: active listings and lead-to-transaction rate not authored; gross rental yield stays pending.
- **Logistics, Restaurants, Professional Services**: only vehicle load factor, labour cost ratio, store contribution margin and utilization rate could be verified; the other metrics in these packs remain pending for lack of an authoritative source.
- **Vietnamese market figures**: none are included anywhere; regulatory thresholds are deliberately omitted.

## Evidence sources

The full registry (67 entries with URL, access date and scope) is `core/sources.ts`. Sources added in this review (all opened and read on 2026-11-08):

- `sec-marriott-10k-fy2025` — Marriott International FY2025 10-K
- `sec-huron-10k-fy2025` — Huron Consulting FY2025 10-K
- `sec-fti-10k-fy2025` — FTI Consulting FY2025 10-K
- `sec-cra-10k-fy2025` — CRA International FY2025 10-K
- `sec-snap-10k-fy2025` — Snap FY2025 10-K
- `sec-pinterest-10k-fy2025` — Pinterest FY2025 10-K
- `sec-beachbody-s1a-2024` — Beachbody S-1/A (2024)
- `sec-opay-f1a-2026` — OPay F-1/A (2026)
- `nist-handbook-p-chart` — NIST/SEMATECH e-Handbook 6.3.3.2
- `fao-livestock-glossary-i3460e01` — FAO livestock report glossary (i3460e01)
- `usda-nal-feed-conversion` — USDA NAL Agricultural Thesaurus: feed conversion
- `uf-irsik-2006-feedlot-health` — Irsik et al. 2006, feedlot cattle health and performance
- `ndsu-as1161-feedlot-terms` — NDSU Extension AS1161 feedlot terminology
- `fao-sdg-1231-metadata` — FAO SDG 12.3.1 metadata
- `fao-eu-platform-flp-2023` — FAO Statistics Division, Food Loss Index design (2023)
- `acea-mckinnon-2010` — McKinnon, European freight transport statistics (ACEA, 2010)
- `eurostat-load-capacity` — Eurostat glossary: load capacity
- `sec-eqr-10k-fy2025` — Equity Residential FY2025 10-K
- `sec-prologis-10k-fy2025` — Prologis FY2025 10-K
- `sec-ameriprise-ex1011-2021` — Ameriprise Exhibit 10.11 (FY2021 10-K)
- `sec-redrobin-10k-fy2025` — Red Robin FY2025 10-K
- `sec-tailored-brands-s1a-2026` — Tailored Brands S-1/A (2026)
- `prudential-glossary` — Prudential plc glossary
- `ifrs-essentials-insurance-2017` — IFRS Foundation, The Essentials: insurance jargon (2017)
- `generali-glossary` — Generali definitions and glossary
- `soa-embedded-value-2009` — SOA, Embedded Value: Practice and Theory (2009)
- `ivass-solvency-ii-guide-2016` — IVASS Solvency II simplified guide (2016)
- `eiopa-solvency-ii-art101` — Solvency II Directive Article 101 (EIOPA rulebook)
- `sec-paypal-10k-fy2025` — PayPal FY2025 10-K
- `rbi-charges-payment-systems-2022` — RBI Discussion Paper on Charges in Payment Systems (2022)
