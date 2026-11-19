# AUD-11 source review: 35 authored chapters and 19 legacy overrides

Date: 19 Nov 2026 · Mode: **Draft only, not published** · App: Domain Knowledge (`apps/IndustryKnowledge`) · Follows `domain-knowledge-aud-11-chapter-authoring-2026-11-18.md` and `domain-knowledge-aud-11-integration-delta-2026-11-18.md` (section 2 item 11).

## 1. Result in brief

- **35 chapters reviewed against the cited documents.** 28 supported, 7 partly supported, 0 unsupported. Each partly supported chapter had one statement (or one key-term definition) that said more than, or something different from, its source. Those sentences were corrected inside the existing `AUDIT_DETAILS` / `HEALTHCARE_DETAILS` entries. No title, ID, legacy index, Knowledge Check topic or assessment was changed.
- **One flashcard excerpt changed** (Healthcare `hp33-need-defines-target-population`, same ID) because it quoted a corrected sentence. Every other card excerpt on the affected chapters is still verbatim.
- **19 legacy overrides:** a `sources` field was added to 18. One was left without one: Healthcare 1.3 "How Are Healthcare and Nutrition Markets Measured?" (no cited source supports market-measurement text). Of the six 3.4 overrides, Audit 3.4 ch10–12 now cite the IESBA Code / IAASB quality-management sources, which support their fee, commercial-pressure and quality-indicator statements; Healthcare 3.4 ch10–12 have their sources **set to empty** with the note in section 5.
- **Nothing was run.** No build, type check, test suite or browser check was possible from this session.

## 2. How the review was done

Each cited registry source was downloaded and searched for the statement it is cited for. Where the registry URL is a landing page, the standard it hosts was opened instead:

| Source id | Document actually read |
|---|---|
| `iaasbHandbook` | IAASB 2023–2024 Handbook Vol. I (ISQM 1/2, ISA 200–720, ISA 600 (Revised), Glossary). Vol. III (ISRE 2400, ISAE 3000, ISRS 4400 (Revised)) used for the review and AUP standards. |
| `otherEngagements`, `aups` | IAASB pages plus the standards' text in Handbook Vol. III |
| `isa315`, `isa600`, `iaasbQuality` | IAASB pages plus the standards' text in Handbook Vol. I |
| `issa5000` | ISSA 5000 PDF (para 15 effective date) |
| `iesba` | IESBA page plus the 2025 IESBA Handbook Vol. 1 (the Code) |
| `technology` | IAASB technology page, Technology Position Statement, and Technology Quality Management Guide 1 (linked from the page) |
| `whoGmp` | WHO GMP compendium, 10th ed. (full PDF) |
| `whoTrace`, `codexSupp`, `fdaClaims`, `whoReg`, `whoPv` | the cited document or page itself |
| `vnData`, `vnConsumer`, `vnFoodLaw` | full-text PDFs from the Official Gazette (Law 91/2025 Art. 38; Law 19/2023 Art. 79; consolidated Food Safety Law 61/VBHN-VPQH) |
| `vnAuditLaw`, `vnStandards`, `vnPharmacy` | **Could not be opened.** vbpl.vn returned HTTP 403 / an empty script page to every request. |
| `vnDecree15` | **Could not be opened.** vfa.gov.vn timed out repeatedly. |

Standard applied: a statement is *supported* when the cited document says it or plainly entails it. General business definitions (for example chargeable hours, utilization), clearly labelled hypothetical examples and the chapter's own analytical conclusions are not attributed to a source and were not treated as unsupported; they are noted where relevant. Statements that rest only on the four unopenable Vietnamese texts restate the registry notes and tell the learner to verify; they are recorded as "not verifiable from here", not as supported.

## 3. Per-chapter record

### Audit & Assurance

| Ch | Status | Evidence / unsupported sentence |
|---|---|---|
| 3.2 ch04 | Supported | ISA 200 (reasonable assurance); ISRE 2400 (limited assurance); ISAE 3000 page; ISRS 4400 (Revised) para 6 ("not an audit, review or other assurance engagement"). |
| 3.2 ch05 | **Partly supported** | Unsupported: "Agreed-upon procedures under ISRS 4400 (Revised) are performed for the parties who specified them…" and the key term "Specified procedures performed for specified parties…". ISRS 4400 (Revised) paras 4, 13(a), 13(g) and A10: procedures are agreed between the practitioner and the engaging party (and, if relevant, other parties), and intended users can include parties who did not agree them. **Fixed.** Rest supported: para 4 (users "draw their own conclusions"), ISAE 3000 / ISRE 2400 (limited assurance, procedures limited compared with reasonable assurance), IESBA Section 600. |
| 3.3 ch07 | Supported | ISA 200 (purpose for intended users), ISA 210, ISA 260. Vietnam statutory scope: Law 67/2011 not verifiable from here. |
| 3.3 ch08 | **Partly supported** | Unsupported term in key term "Group audit": "where the group engagement team directs and evaluates component work under ISA 600 (Revised)". ISA 600 (Revised) para 14(h) defines the *group auditor*; the term "group engagement team" no longer appears in the Handbook. **Fixed** to "group auditor". PIE statements supported (IESBA sections with "Audit Clients that are Public Interest Entities" provisions). |
| 3.3 ch09 | Supported | ISQM 1 para 34(e) (communication with those charged with governance of listed entities), Glossary "External inspections", ISQM 1 monitoring and remediation. |
| 3.5 ch13 | Supported | ISQM 1 / ISA 220 resources, direction, supervision and review; Guide 1 on human involvement with tools. Leverage and chargeable-hours definitions are general terms, not sourced. |
| 3.5 ch14 | Supported | IESBA 330.3 A2 and Section 410 (fees). Ratio definitions are the curriculum's own, identical to the core glossary. |
| 3.5 ch15 | **Partly supported** | Unsupported clause: "…monitor and remediate, which needs quality evidence that is not mixed into commercial targets." ISQM 1 para 28(a)(iv) requires the importance of quality to be reflected in the firm's "financial and operational priorities"; it says nothing about mixing evidence into targets. **Fixed** to that wording. Quality indicators: ISQM 1 application material on communication ("engagement quality indicators"). |
| 3.6 ch16 | Supported | IESBA network definition (separate legal entities), IAASB/IESBA roles, technology page. |
| 3.6 ch18 | Supported | Guide 1: evaluating a tool before deployment, evaluating outputs, confidentiality. Law 91/2025 effective 1 Jan 2026 (Art. 38). |
| 4.2 ch04 | **Partly supported** | Unsupported term in the example: "the group engagement team must still evaluate component auditors' work under ISA 600 (Revised)". **Fixed** to "group auditor". Rest supported: ISQM 1 paras 48–52 (network requirements), IESBA R400.51 and network definition, ISA 600 (Revised) A30 (network requirements can support the group auditor's direction and supervision). |
| 4.2 ch05 | Supported | No source-specific claim beyond engagement fit; "Big Four" is a market label. |
| 4.2 ch06 | Supported (Vietnam part not verifiable) | Law 67/2011 and Circular 214/2012 not openable; text restates registry notes and directs verification. |
| 4.4 ch10 | Supported | IESBA 120.15 A1 (independence of mind and in appearance), ISA 200 (skepticism), ISA 250/580 (written representations "do not provide sufficient appropriate audit evidence on their own"). |
| 4.4 ch11 | Supported | ISA 315 (Revised 2019) page; ISQM 1; IAASB QM page ("proactive monitoring… timely and effective remediation"). |
| 4.4 ch12 | Supported | ISQM 1, Guide 1, IESBA Section 410, Law 91/2025. |
| 5.1 ch01 | Supported | ISSA 5000 para 15 (periods beginning on or after 15 Dec 2026; earlier application permitted); ISAE 3000 page. |
| 5.1 ch02 | Supported | IAASB QM page (effective 15 Dec 2022); ISQM 1 application material on transparency reports and quality indicators. |
| 5.2 ch06 | Supported | Guide 1 ("automation bias", outputs that "appear plausible", evaluating and challenging outputs). |
| 5.3 ch08 | Supported | ISA 220 (Revised) para 13; ISA 600 (Revised) para 16; ISQM 1 A20–A21 (service delivery centres); IESBA. |
| 5.3 ch09 | Supported | ISAE 3000 page, ISSA 5000 para 15, ISQM 1 scope (other assurance engagements). |
| 5.4 ch12 | Supported, with a gap | The IT general / application control sentence rests on ISA 315 content, which this chapter does not cite (`vnStandards`, cited, could not be opened). Recommend adding `isa315` to its sources; not changed here. |

### Healthcare Products & Nutrition

| Ch | Status | Evidence / unsupported sentence |
|---|---|---|
| 3.1 ch01 | Supported | WHO GMP: "The contract giver is ultimately responsible for ensuring that processes are in place to assure the control of outsourced activities." |
| 3.1 ch03 | Supported | WHO GMP contract / technical quality agreement ("clearly establish the duties of each party"); WHO traceability paper. |
| 3.2 ch04 | **Partly supported** | Unsupported key term "Dietary supplement": "Codex guidelines treat vitamin and mineral supplements as foods". CXG 55-2005 §1.3: the guidelines apply only in jurisdictions where these products are regulated as foods. **Fixed.** The scope sentence on Codex is supported (§1.3, §1.4). |
| 3.2 ch05 | Supported | CXG 55 §1.4 (foods for special dietary uses not covered). Food Safety Law Art. 2(23) lists medical-nutrition food inside its functional-food category, consistent with "classify under Vietnamese rules". The medical-nutrition definition itself is general (Decree 15 not openable). |
| 3.2 ch06 | Supported | FDA Ch. VI Q45 ("have substantiation that such statement is truthful and not misleading"); Food Safety Law Art. 14 (scientific documentation for declared functional effects). |
| 3.3 ch07 | Supported | Law 19/2023 (Art. 79, effective 1 Jul 2024); Law 91/2025. |
| 3.3 ch08 | **Partly supported** | Unsupported insight: "A need defines a target population, and evidence is valid only for the population it was gathered on." No cited source says evidence is valid *only* for its population; CXG 55 §3.2.2 refers only to "varying degrees of sensitivity of different consumer groups". **Fixed** to "evidence gathered on one population does not automatically apply to another", which matches the chapter's own key-term definition. |
| 3.3 ch09 | Supported | WHO traceability paper; Law 19/2023; Law 91/2025. |
| 3.5 ch13 | Supported (Vietnam part not verifiable) | Channel economics are general; Pharmacy Law not openable. |
| 3.5 ch14 | Supported | Law 19/2023 (digital-platform and remote-transaction provisions; Art. 79); Law 91/2025 (Art. 38). |
| 3.6 ch16 | Supported | WHO regulatory-systems page (products "legally authorized, safe and perform as claimed"); WHO GMP (quality-control laboratories); WHO pharmacovigilance page. |
| 3.6 ch17 | Supported in substance | The paper says traceability systems "assist regulators to respond" and that "active surveillance and monitoring should be established to ensure that the appropriate regulatory responses take place". "Complement, not a substitute" is the curriculum's paraphrase, not WHO's wording; it is a fair summary, so the sentence and card `hp36-traceability-complements-regulation` were left unchanged. |
| 3.6 ch18 | Supported | WHO regulatory-systems page; WHO GMP; Law 19/2023. |

## 4. Text changes and flashcard re-check

| File | Change |
|---|---|
| `auditAssuranceCore.tsx` | 3.2 ch05 AUP sentence and key term; 3.3 ch08 key term "Group audit"; 4.2 ch04 example; 3.5 ch15 ISQM sentence (section 3). |
| `healthcareProductsCore.tsx` | 3.2 ch04 key term "Dietary supplement"; 3.3 ch08 insight. |
| `auditAssuranceM3VisualSpecs.ts` | Position 5 intro and AUP row: "specified users" → "the engaging party and other intended users", to match the corrected chapter. |
| `healthcareProductsM3VisualSpecs.ts` | Position 8 heading aligned with the corrected 3.3 ch08 insight. |
| `flashcards/decks/healthcareProductsM03.ts` | `hp33-need-defines-target-population`: `back` and `refs` updated to the new displayed sentence. **ID unchanged**: the card still teaches that evidence is population-specific, so this was treated as a wording correction, not a new card. |

Flashcard check, chapter by chapter: Audit 3.2 ch05 card `pa32-agreed-upon-procedures-no-assurance` quotes "no opinion or assurance conclusion is expressed, and users draw their own conclusions", and that fragment is preserved verbatim in the corrected sentence. No Audit 3.3 ch08, 3.5 ch15 or 4.2 ch04 card quotes a changed sentence. No Healthcare 3.2 ch04 card quotes the changed definition. Pins (`expansionPinsHealthcareProducts.ts`) hold IDs only and needed no change.

## 5. Legacy overrides: sources decided

"Inherited" is what each override showed before this change, through the legacy item that `standardize*Lessons` maps to its position.

### Audit & Assurance (10)

| Override | Inherited | Now | Why |
|---|---|---|---|
| 1.1 Where Does Audit Begin and End? | otherEngagements, aups, isa600, vnAuditLaw, vnStandards | iaasbHandbook, vnAuditLaw, vnStandards | ISA 200 (reasonable not absolute; management responsibility) and ISA 610 (internal audit function) carry the text; ISAE 3000, ISRS 4400 and ISA 600 do not. |
| 2.2 Materiality and Performance Materiality | iesba, iaasbHandbook, vnAuditLaw, vnStandards | iaasbHandbook, vnStandards | ISA 320 para 9 defines performance materiality; IESBA and the Law do not address it. |
| 2.3 Risks of Material Misstatement | isa315, iaasbHandbook, vnStandards | same, now explicit | All three support it. |
| 2.3 Sampling, Evidence and Documentation | iaasbQuality, iaasbHandbook, vnStandards | iaasbHandbook, vnStandards | ISA 500, 505, 530 and 230; the QM page does not cover sampling or evidence. |
| 2.4 Audit Opinions and Other Report Elements | iaasbHandbook, vnAuditLaw, vnStandards | same, now explicit | ISA 700/705/706/570; the Vietnam line points to the legal framework. |
| 3.2 Financial Reporting Areas | iaasbQuality, iesba, vnAuditLaw, vnStandards | iaasbHandbook, vnStandards | ISA 240 para 27 (revenue presumption), ISA 501, ISA 540, ISA 550, ISA 570. |
| 2.6 International Standards and Vietnam-Adopted Requirements | isa600, iesba, vnAuditLaw, vnStandards, vnData | iaasbHandbook, iesba, vnAuditLaw, vnStandards | ISA/ISQM, IESBA Code and the two Vietnamese instruments; ISA 600 and the data law are not what the text discusses. |
| 3.4 ch10 Audit Engagements Generate Revenue | technology, iaasbQuality, vnData, vnStandards | iesba | IESBA Section 410 and 330.3 A2 support the fee and "do not treat fee or margin as quality evidence" statements. The fee arithmetic is hypothetical and unsourced. |
| 3.4 ch11 Audit Delivery Costs and Profitability | same as ch10 | iaasbQuality, iesba | ISQM 1 para 28(a)(iv) and IESBA 330.3 A2 support "commercial pressure must not override required evidence, supervision, independence or review". The cost list is illustrative and unsourced. |
| 3.4 ch12 KPIs | same as ch10 | iaasbQuality | ISQM 1 application material names engagement quality indicators and monitoring results. The financial KPI definitions are unsourced. |

### Healthcare Products & Nutrition (9)

| Override | Inherited | Now | Why |
|---|---|---|---|
| 1.1 Where Does the Industry Begin and End? | codexSupp, fdaClaims, vnFoodLaw, vnPharmacy | codexSupp, vnFoodLaw, vnPharmacy | Codex scope plus the food and pharmacy laws carry the boundary; the FDA guide is not needed. |
| 1.1 Product Categories and Regulatory Classifications | codexSupp, fdaClaims, vnFoodLaw, vnPharmacy | same, now explicit | FDA Ch. VI covers the nutrient-content / health / structure-function claim types. |
| 1.3 Healthcare and Nutrition Markets Measured | whoReg, codexSupp, whoGmp | **unchanged (no field added)** | No registry source supports market-measurement statements; a market-data source is needed. |
| 2.2 Product-Specific Evidence and Claims | codexSupp, whoGmp, vnFoodLaw, vnDecree15 | fdaClaims, vnFoodLaw, vnDecree15 | FDA Q45 (substantiation) and Food Safety Law Art. 14 support the claim statements; Decree 15 kept on its registry scope (not openable). The science statements (association vs causation) remain unsourced. |
| 2.3 Quality Systems, Testing and Batch Release | fdaClaims, whoReg, vnPharmacy, vnFoodLaw, vnDecree15 | whoGmp, vnPharmacy, vnFoodLaw, vnDecree15 | WHO GMP covers specifications, QC testing, deviations and batch release; the FDA claims guide does not. |
| 3.4 ch10 Businesses Generate Revenue | whoTrace, vnPharmacy, vnFoodLaw, vnData, vnConsumer | **[] (empty)** | No registry source supports revenue streams or the hypothetical contribution. |
| 3.4 ch11 Product, Quality and Commercial Costs | same as ch10 | **[] (empty)** | No source supports the cost build-up or channel arithmetic. WHO GMP shows that testing, QC and documentation are required activities, but not their cost; it was not added. |
| 3.4 ch12 KPIs | same as ch10 | **[] (empty)** | No source supports DIO, expiry-loss or repeat-purchase KPI text. |
| 5.4 Classification, Labeling and Claims Rules | whoTrace, whoGmp, vnPharmacy, vnFoodLaw | codexSupp, fdaClaims, vnFoodLaw, vnDecree15, vnPharmacy | Claim types (FDA), food-regulated scope (Codex) and the Vietnamese food, decree and pharmacy texts; traceability and GMP sources do not address classification or claims. |

**Note on the empty Healthcare 3.4 sources.** These three chapters now show no sources and a "0 Evidence sources" tile instead of channel and data-protection sources that do not support them. A suitable replacement would be a published, scoped source on consumer-health channel economics or a management-accounting reference for contribution and inventory KPIs; none exists in `HEALTHCARE_PRODUCT_SOURCES`. If an empty list is not acceptable on the live app, add such a source to the registry and cite it here.

## 6. Not done, still open

- **Vietnamese texts not verified:** Law 67/2011/QH12, Circular 214/2012/TT-BTC, Pharmacy Law 105/2016/QH13 and Decree 15/2018/ND-CP could not be opened from this environment. Statements resting on them restate the registry notes and direct verification; a reader with access to vbpl.vn / vfa.gov.vn should check them.
- **Recommended, not applied:** add `isa315` to Audit 5.4 ch12 sources (section 3).
- **Unchanged by instruction:** Knowledge Check topics and all assessments; `chapterIntegrity.ts` classes; the generic-answer quiz defect noted in the delta report.
- **Tests not run.** First to run on the Draft tree: `tsc --noEmit`, `practiceReview/__tests__/renderedGrounding.test.ts` (checks card excerpts against displayed text), `flashcards/__tests__/decks.test.ts`, `professionalAudit.test.ts`.
- **Not published.**
