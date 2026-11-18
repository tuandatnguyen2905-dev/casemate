# AUD-11 chapter authoring: Audit & Assurance and Healthcare Products Module 3

Date: 18 Nov 2026 · Mode: **Draft only, not published** · App: Domain Knowledge (`apps/IndustryKnowledge`) · Scope: 35 chapters named in the AUD-11 spec (22 Audit & Assurance, 13 Healthcare Products).

## 1. What changed

| File | Change |
|---|---|
| `auditAssuranceCore.tsx`, `healthcareProductsCore.tsx` | Detail type gains optional `intro`, `sources` and `definitions`. `standardize*Lessons` passes them through (`sources: detail?.sources ?? <legacy sources>`). `terms()` prefers a chapter's own definition over the global table and the placeholder. `mateIntro` uses `intro` when present. 35 new title-keyed entries added to `AUDIT_DETAILS` / `HEALTHCARE_DETAILS`. |
| `auditAssuranceM3/M4/M5VisualSpecs.ts`, `healthcareProductsM3VisualSpecs.ts` | Per-position visuals rewritten only where they paraphrased the wrong legacy item (listed below). Visual keys, titles and layouts' schema are unchanged. |

Unchanged on purpose: every lesson, module and chapter title; `legacyIndex`, `legacyIndexes`, `legacyCompletionIndex`; `*_LEGACY_TARGETS`; question IDs and Knowledge Check topics; persistence keys, scores and progress; the existing title-keyed overrides (Audit 3.2 ch06, 3.4 ch10-12; Healthcare 1.x/3.4/5.x); chapters not in the 35. No Module 2 text was reused (REV-P0-10, REV-P0-09 untouched).

## 2. Per chapter: what was written and from which sources

All text is conceptual and qualitative. No new statistic, fee, date or citation was introduced. The only dates are the ones already in the curriculum's own source notes (ISQM 1, ISQM 2, ISA 220 (Revised) from 15 Dec 2022; ISSA 5000 from 15 Dec 2026; Law 91/2025/QH15 from 1 Jan 2026; Law 19/2023/QH15 from 1 Jul 2024). Vietnamese bodies are not named, because the cited sources do not name them; each chapter tells the learner to verify roles in current official text. Sources are `AUDIT_SOURCES` / `HEALTHCARE_PRODUCT_SOURCES` ids.

### Audit & Assurance

| Ch | Title | Now explains | Sources cited |
|---|---|---|---|
| 3.2 ch04 | Financial Audit and Other Assurance Services Segmented | Segments by assurance level, subject matter, user: audit, review, other assurance (ISAE 3000), AUP (ISRS 4400); statutory vs voluntary changes who requires, not what it is | iaasbHandbook, otherEngagements, aups, vnAuditLaw, vnStandards |
| 3.2 ch05 | Review, AUP and Advisory | Assurance level, report output and reliance of each; AUP is not a lighter audit; advisory limited by independence | aups, otherEngagements, iesba, iaasbHandbook, vnStandards |
| 3.3 ch07 | Who Purchases or Requires Audit | Statutory vs voluntary demand, lender/parent requests, appointing party vs intended user | iaasbHandbook, otherEngagements, vnAuditLaw, vnStandards |
| 3.3 ch08 | Public-Interest, Private, Group, Voluntary Needs | Who relies, extra independence/oversight, group coordination (ISA 600), engagement-terms scope; no thresholds stated | iesba, isa600, iaasbHandbook, vnAuditLaw, vnStandards |
| 3.3 ch09 | Governance, Regulators, Users Evaluate Audit | Committee communications, regulatory inspection and remediation, users judging via the report | iaasbQuality, iesba, iaasbHandbook, vnAuditLaw, vnStandards |
| 3.5 ch13 | Staffing, Leverage, Chargeable Hours | Team hierarchy, leverage, supervision, chargeable time, rework (qualitative illustration, no figures) | iaasbQuality, technology, vnAuditLaw, vnStandards |
| 3.5 ch14 | Utilization, Billing Rates, Realization | Simplified revenue relation and where each ratio misleads; no figures | iaasbQuality, iesba, vnAuditLaw, vnStandards |
| 3.5 ch15 | Quality Indicators vs Financial KPIs | Why AQIs and KPIs answer different questions and must be reported separately | iaasbQuality, iesba, vnAuditLaw, vnStandards |
| 3.6 ch16 | Ecosystem participants | Preparer, governance, users, firms, standard setters (IAASB, IESBA), oversight bodies, technology providers | iaasbHandbook, iesba, technology, vnAuditLaw, vnStandards |
| 3.6 ch18 | Regulators, Professional Bodies, Technology Providers | How each shapes delivery; tool validation; data protection; accountability stays with the firm | iaasbQuality, iesba, technology, vnAuditLaw, vnStandards, vnData |
| 4.2 ch04 | Major Global Audit Network Types | Global, mid-tier, association; network firm and requirement under ISQM 1 / IESBA; group coordination | iaasbQuality, iesba, isa600, iaasbHandbook, vnAuditLaw |
| 4.2 ch05 | Big Four, Mid-Tier, Specialist, Local | Categories of positioning, not a quality ranking; engagement fit as the test; no firm named | iaasbHandbook, iaasbQuality, iesba, vnAuditLaw |
| 4.2 ch06 | Firms and Institutions in Vietnam's Audit Market | Three firm kinds; Law 67/2011/QH12 and Circular 214/2012/TT-BTC as framework; adoption not assumed | vnAuditLaw, vnStandards, iaasbHandbook, iesba, iaasbQuality |
| 4.4 ch10 | Independence, Expertise, Skepticism | Why each protects the conclusion and how failure shows | iesba, iaasbHandbook, iaasbQuality, vnAuditLaw, vnStandards |
| 4.4 ch11 | Methodology, Evidence, Quality Management | Risk-based method (ISA 315), evidence and documentation, ISQM 1 monitoring/remediation (uses the 4.2 legacy quality item's own wording) | iaasbQuality, iaasbHandbook, isa315, vnAuditLaw, vnStandards |
| 4.4 ch12 | Talent, Technology, Client Governance and Growth | Three drivers must grow together; acceptance, concentration, fee pressure; growth outpacing quality | iaasbQuality, technology, iesba, vnAuditLaw, vnData |
| 5.1 ch01 | Corporate Reporting and Stakeholder Expectations | Wider reporting vs what can be assured; preconditions (criteria, data, practitioners); ISSA 5000 timing | issa5000, otherEngagements, iaasbHandbook, vnAuditLaw, vnStandards |
| 5.1 ch02 | Audit Quality and Transparency | User reliance, ISQM/ISA 220 quality management, transparency, inspection and remediation | iaasbQuality, iaasbHandbook, iesba, vnAuditLaw, vnStandards |
| 5.2 ch06 | Role of AI in Audit Judgment | What AI can support; what stays with the team; automation bias, overreliance, verification | technology, iaasbHandbook, iaasbQuality, vnData |
| 5.3 ch08 | Shared Delivery and Specialist Models | Shared centres and specialists add capacity, not accountability (ISA 220, ISA 600); supervision, independence, data | iaasbQuality, isa600, iesba, technology, vnData |
| 5.3 ch09 | Expanding Assurance Capabilities | Standard, competence, methodology, quality system, acceptance and independence as readiness conditions | otherEngagements, issa5000, iaasbQuality, iesba, technology |
| 5.4 ch12 | Cybersecurity, Data, Technology Assurance | IT general/application controls, third-party risk, data integrity, cyber assurance bounded by scope (the legacy item moved here from 5.2 ch06) | otherEngagements, technology, vnData, vnStandards |

### Healthcare Products & Nutrition

| Ch | Title | Now explains | Sources cited |
|---|---|---|---|
| 3.1 ch01 | How Companies Make Money | Product sales, manufacturing contract, wholesale margin, licensing, service fee; responsibility follows the revenue model | whoReg, whoGmp, vnPharmacy, vnFoodLaw, vnConsumer |
| 3.1 ch03 | Importer, Distributor, Private-Label, Integrated | What each model splits off; quality agreement; legal responsibility to be allocated | whoTrace, whoGmp, vnPharmacy, vnFoodLaw, vnDecree15, vnConsumer |
| 3.2 ch04 | Segmenting Supplements and Consumer Health | Commercial segments vs legal classification; Codex scope (food supplements, special dietary use excluded) | codexSupp, fdaClaims, vnFoodLaw, vnDecree15, vnPharmacy |
| 3.2 ch05 | General, Specialized, Medical Nutrition | Intended use and user; controls rise toward medical use | codexSupp, vnFoodLaw, vnDecree15, vnPharmacy |
| 3.2 ch06 | Formulation, Evidence, Classification, Positioning | Four decisions made together; product-specific evidence; reformulation example | fdaClaims, codexSupp, vnFoodLaw, vnDecree15, vnPharmacy |
| 3.3 ch07 | Who Purchases | Consumer, family, trade, professional influence, institutional; buyer is not the user | whoTrace, vnPharmacy, vnFoodLaw, vnConsumer, vnData |
| 3.3 ch08 | Consumer, Family, Life-Stage, Specialized Needs | Needs define target populations; evidence valid only for its population | fdaClaims, codexSupp, vnFoodLaw, vnDecree15, vnConsumer |
| 3.3 ch09 | Retail, Pharmacy, Professional, Institutional Buyers | What each buyer needs from a supplier; contract duties (custody, traceability, recalls) | whoTrace, vnPharmacy, vnFoodLaw, vnConsumer, vnData |
| 3.5 ch13 | Pharmacy, Retail, Distributor, Institutional Channels | How each reaches customers; channel terms, returns, expiry, working capital; no figures | whoTrace, vnPharmacy, vnFoodLaw, vnConsumer |
| 3.5 ch14 | E-Commerce and Direct-to-Consumer | Marketplace vs direct: who owns the customer, who bears cost, consumer and data duties | vnConsumer, vnData, vnFoodLaw, vnPharmacy, vnDecree15 |
| 3.6 ch16 | Ecosystem participants | Brand owner, manufacturer, supplier, channels, professionals, regulator, laboratory, consumer | whoReg, whoGmp, whoPv, whoTrace, vnPharmacy, vnFoodLaw |
| 3.6 ch17 | Collaboration | Hand-offs and feedback flows; quality agreement, traceability (WHO: complement, not substitute), post-market monitoring | whoPv, whoTrace, whoGmp, vnPharmacy, vnFoodLaw, vnDecree15 |
| 3.6 ch18 | Regulators, Laboratories, Consumers, Communities | Four forces confer or remove value; market access | whoReg, whoGmp, vnPharmacy, vnFoodLaw, vnConsumer |

Key terms: for every chapter above, the first five dimensions (the ones the reader shows) now have definitions written from that chapter's own text, replacing the "A core ... concept related to ..." placeholder.

## 3. Visual specs changed (only where they paraphrased the wrong item)

- Audit M3: positions 4, 5, 7, 8, 9, 13, 14, 15, 16, 18. Position 13 now carries the team-hierarchy visual that previously sat at position 7; position 14 keeps its formula but drops the client-segment and conflict drivers that came from the portfolio item.
- Audit M4: positions 4, 5, 6, 10, 11, 12. Position 11 now carries the quality-management cycle that previously sat at position 4.
- Audit M5: positions 1, 2, 6, 8, 9, 12. Position 12 now carries the digital-assurance taxonomy that previously sat at position 6.
- Healthcare M3: positions 1, 4, 5, 6, 7, 8, 9, 14, 16, 17, 18, plus the takeaway line of position 3. Positions 2 and 13 already matched their titles and were left as is.

## 4. Tradeoff: learners who already completed these chapters

Progress is credited by lesson and chapter position (legacy index and title-derived IDs), which were not changed. A learner who completed any of the 35 chapters stays credited, but the text they completed has been replaced with different content. They will not be prompted to re-read it, and any card they earned stays earned. Learners mid-way through a lesson will see the new text on their next visit. If the founder wants completed learners to re-read, that needs a separate progress decision (Sprint 03G territory) and was not done.

## 5. Not changed, still open

- **Practice gating stays closed.** `chapterIntegrity.ts` still lists these chapters as class C, so their cards and activities remain withheld (fail-closed). Re-classify, re-review the mapped cards against the new text and add passing ones to `VALIDATED_CARD_IDS`, then run `chapterIntegrity.test.ts` and `professionalAudit.test.ts`.
- **Knowledge Check stems.** Topics in the module files (`auditAssuranceModule03-05.tsx`, `healthcareProductsModule03.tsx`) were not touched, because how in-progress and stored attempts reference stems was not verified. The stems for the affected lessons still name the legacy topics (for example Audit 3.3 "team leverage", Healthcare 3.3 "import and distribution roles"). Question IDs are positional and would not change if the topics are updated later.
- **Existing 3.4 overrides** (Audit 3.4 ch10-12, Healthcare 3.4 ch10-12) still inherit the legacy item's sources through the old code path. They can be corrected by adding a `sources` field to those entries.
- **Other chapters in the same lessons** (for example Audit 3.6 ch17, 4.2 chapters not listed, 5.4 ch11) were not rewritten; their placeholder key terms remain.
- **Verification.** No build, type check, suite or browser run was possible from this session. Checked by inspection: all 35 entry keys match the canonical titles exactly, all source ids exist in the registries, the first five dimensions of every entry have a definition, no duplicate keys, and every write used `expected_version`. First thing to run: `tsc --noEmit` and the Domain Knowledge suites on the Draft tree, then the Preview checks below.
- **Not published.** Nothing was published and no database table was touched.

## 6. Preview checks

Open each lesson in the Draft Preview: Audit 3.2, 3.3, 3.5, 3.6, 4.2, 4.4, 5.1, 5.2, 5.3, 5.4 and Healthcare 3.1, 3.2, 3.3, 3.5, 3.6. For each chapter confirm that the opening line, the five narrative sections, the five key terms, the visual and the sources list all match the title, and that no chapter shows another chapter's text.
