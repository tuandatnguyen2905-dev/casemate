# Wave 2 coverage manifest

Status: Draft. Nothing published. Scope: 39 implemented curricula (41 minus `banking-commercial` and
`banking-consumer-finance`; the 3 Coming Soon entries are excluded). Data version of this table: `manifest.ts`.

| Group | Curriculum | Status |
| --- | --- | --- |
| Professional & Business Services | Audit & Assurance (`professional-audit`) | Blocked by Source or Review Hold (eligible subset validated) |
| 38 others | see `manifest.ts` | Not Started |

## Audit & Assurance (`professional-audit`)

Source-integrity pass, 2026-11-08. Every chapter was re-read as displayed by the live reader and classified in
`professionalAudit/chapterIntegrity.ts`. Only `PROFESSIONAL_AUDIT_ELIGIBLE_*` may be registered; nothing is registered yet.

| Field | Value |
| --- | --- |
| Total lessons / chapters | 27 / 90 (24/18/18/15/15) |
| Chapter classes | A Fully Aligned 19 · B Partially Aligned 32 · C Misaligned 37 · D Restricted/Unverifiable 2 |
| Flashcards | 148 authored; 91 eligible (validated, A/B chapters only) in 22 decks; 57 excluded with reasons |
| Match & Sort | 11 authored; 0 eligible (all excluded: answer-leaking hints, overlapping categories, a list graded as stages, or a C chapter) |
| Review holds | REV-P0-10 (Module 02, Global vs. Local Value Chain, ch 3) = D; Module 01 Vietnam Market Overview ch 4 = D (unverifiable legal-status claims) |
| Tests executed | `chapterIntegrity.test.ts` 9/9, `professionalAudit.test.ts` 13/13, `validators.test.ts` 17/17, live module graph, byte-verified source |
| Content-owner remediation | `reports/audit-assurance-source-integrity-2026-11-08.md` |

### Classes and eligible cards by lesson (chapter classes in order · eligible/authored cards)

- M01: 1.1 (ABAAC · 9/12) · 1.2 (ABCC · 4/4) · 1.3 (ACCAC · 3/4) · 1.4 (ABCDB · 2/3) · 1.5 (CBCBB · 0/3)
- M02: 2.1 (ABB · 3/4) · 2.2 (BBA · 6/7) · 2.3 (ABB · 7/10) · 2.4 (BAB · 5/8) · 2.5 (CBB · 2/4) · 2.6 (BBD · 2/4)
- M03: 3.1 (CBC · 2/4) · 3.2 (CCA · 2/8) · 3.3 (CCC · 0/4) · 3.4 (AAA · 9/11) · 3.5 (CCC · 0/4) · 3.6 (CBC · 3/3)
- M04: 4.1 (BCB · 3/3) · 4.2 (CCC · 0/5) · 4.3 (BBC · 6/7) · 4.4 (CCC · 0/4) · 4.5 (BBC · 2/4)
- M05: 5.1 (CCB · 4/5) · 5.2 (ABC · 7/10) · 5.3 (ACC · 4/4) · 5.4 (BAC · 5/5) · 5.5 (BBA · 1/4)

### Source defects (curriculum, not edited; corrections need content-owner approval)

1. Canonical chapter titles are laid over each lesson's (usually single) source item, so most non-authored chapters repeat
   the lesson text with a "focuses specifically on <word>" suffix. 37 chapters show a different topic than their title (C);
   32 only partly answer it (B).
2. Ten lessons show another lesson's material: 3.2, 3.3, 3.5, 3.6, 4.2 and 4.4 (4.2/4.4 look swapped), 5.1, 5.2 and 5.4
   (cybersecurity and sustainability swapped between 5.2 ch 3 and 5.4 ch 3), 5.3.
3. Placeholder key-term definitions ("A core Audit and Assurance concept related to …") appear across most chapters;
   several generic taxonomy visuals relabel the source item to fit the title.
4. Some visuals carry legal/effective-date claims the text does not (e.g. lesson 2.6 ch 1–2, lesson 4.4 ch 1).

No chapter was renamed to make content look aligned, and no card was rewritten to fit a title. Card and activity IDs are unchanged;
excluded items stay in the source files for traceability (`EXCLUDED_CARDS`, `EXCLUDED_ACTIVITIES`).

## Not started (38 curricula) and continuation point

Not started, in the suggested order: 2A Non-Alcoholic Beverages, Beer & Alcoholic Beverages, Packaged Food & Confectionery,
Dairy; 2B Payments & Fintech, Life Insurance, Management & Technology Consulting, Project & Construction Advisory;
2C all seven; 2D all thirteen; 2E all ten.

The Wave 2A curricula were skipped, not attempted: their lesson text is stored in module files of roughly 100 to 800 KB each
(Non-Alcoholic Beverages about 440 KB, Beer about 800 KB, Packaged Food about 740 KB, Dairy about 360 KB), against about 75 KB for Audit, so each costs several
times as much to read. Audit was chosen first because it could be completed and checked end to end.

**Next curriculum:** Payments & Fintech (`banking-fintech`), then Life Insurance (`banking-insurance`), Management & Technology Consulting
(`professional-consulting`) and Project & Construction Advisory (`professional-advisory`; Module 05 has one held chapter). Their files have the same
shape as Audit (a `Core` file plus five small module files), so the same title/content mismatch check should be run on each first.
Unfinished scope: all lessons of those curricula.
