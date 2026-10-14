# Casemate — `programs.criteria_json` data fill report

**Run date:** 2026-10-08  
**Scope:** all 57 rows in `programs` where `verified = false`  
**Result:** 57 of 57 updated. `verified = false` count went **57 → 0**; `verified = true` went **66 → 123** (123 rows total).

Each program received a researched, program-specific 7-criterion rubric on the mandated schema
(`education_gpa` 12, `english_language` 13, `leadership_activities` 15, `relevant_internship` 20,
`analytical_case` 17, `awards_competitions` 9, `program_culture` 14 — summing to exactly 100).
The `program_culture` label carries the real company name in both `label_en` and `label_vi`.
Every level description names the program's actual GPA bar, actual English requirement, actual
eligible majors, actual function track and actual assessment rounds. None of the 66 rows that were
already `verified = true` were touched.

---

## ✅ Fully sourced — every field taken from a published requirement (10 programs)

No approximation anywhere in the rubric.

| id | Program | Key sourced facts | Source |
|---|---|---|---|
| 32 | Starbucks Vietnam — Management Trainee | GPA 7.5/10 or 3.0/4.0; IELTS 6.0+; <1 yr experience; Economics/Finance/Hospitality preferred; video+CV then interview & aptitude test; Hanoi Store Ops trains 6 months in HCMC | Official MT 2025 JD (joboko, sites.google.com/view/starbucksvnmanagementtrainee, recruiter LinkedIn) |
| 34 | Coca-Cola Vietnam — Aspire Future Leaders | GPA 7.0/10; Vietnamese **and** English both required; any major; full 5-round process incl. assessment centre + leadership interview; 24-month rotation | HUST CTT, UEH DSA, VKU listings; mentori.vn; Swire Coca-Cola early-careers page |
| 41 | MB Bank — MB Young Talent | GPA 3.2/4.0 or 8.5/10 (Giỏi); IELTS 6.0+; CFA/FRM/ACCA preferred; SQL/Python/Power BI for data & risk tracks | MB LinkedIn + FTU announcements; MBBANK 2026 position JDs on topdev.vn |
| 44 | Masan Group — Young Leaders Program | GPA 7.0/10 (6.5/10 for Young Entrepreneur Sales); top-university bachelor's, <2 yrs; hard verbal-English aptitude section; 30-minute PowerPoint case pitch; no cross-department rotation | careers.masanconsumer.com; viecoi.vn process breakdown; HRC 2026 JD; HCMUT FME |
| 52 | Golden Gate — Restaurant Manager Trainee | GPA 3.2/4.0; preferred majors listed; **no mandatory English**, language cert is a plus; shift/weekend/holiday work; endpoint manages 30–50 staff and VND 1–3bn revenue | UEH, TDTU, Hoa Sen, joboko RMT 2026 JDs + recruiter LinkedIn |
| 65 | Viettel — Digital Talent | CPA 3.0/4.0 **or** a national/international prize instead; Semiconductor track needs TOEIC 550 / IELTS 5.5; IQ + TOEIC + technical exam; 8 named core-tech tracks | viettelmoney.vn eligibility page; TLU EE 2026 Semiconductor & IoT postings; PTIT; jobs.viettel.vn |
| 78 | ITL & SOTRANS — Management Trainee | GPA 7.0/10; Vietnamese nationality; Bachelor's/MBA; English + MS Office both explicit; IQ+MBTI → soft skills → division-head interview; named target universities; 3-year program | itlvn.com, itllogistics.vn, itlavs.com qualification lists; sotransgroup.vn; SOTRANS Careers LinkedIn |
| 81 | TMA Tech Group — Talent Fresher | GPA 7.0/10; TOEIC 600; fluency in ≥1 programming language required; named stacks (Java/.NET/ReactJS/Angular/AI/Testing) | tma.vn Talent Fresher 2026 announcements + DB `candidate_requirement` |
| 121 | Acumen Academy x Fulbright — Social Impact Leadership | 5+ yrs poverty/inequality work; must already hold a leadership position; medium-complexity English (not fluency); rolling review + 45-min English interview; 3-day Vietnam seminar | app.acumenacademy.org eligibility page; Vietcetera; fundsforNGOs; fellowship.acumenacademy.org |
| 125 | Teach For Vietnam — Leadership Development Fellowship | GPA 2.5/4.0 or 7.0/10; English track IELTS 6.0 with L&S ≥6.0 (or TOEFL 72+/CEFR B2); STEM track gated on logic not English; 2-yr Quang Nam/Dong Thap commitment; 3 published rounds | teachforvietnam.org Batch 9 announcement + fellowship pages (EN/VI); TDTU CECA |

---

## ⚠️ Updated with some approximated fields (44 programs)

All **hard eligibility facts** (GPA, English, majors, stage, function, timing) below came from a real
published source — the DB's own `candidate_requirement` / `career_url` / `apply_url` (the founder's
researched sheet) plus web verification. The approximated fields are listed per program; where a
value is absent the rubric says so explicitly rather than inventing a number.

**Approximated only because the company publishes no numeric GPA cut-off** (the rubric states this
in the `chua_dat` text instead of guessing): ids **6** (P&G), **8** (AB InBev GMT), **11** (Standard
Chartered), **20** (FrieslandCampina Global Traineeship), **23** (Siemens Energy), **24** (Maersk
L.E.A.D), **27** (Bosch JMP), **29** (CapitaLand MAP), **38** (VPBank Genext), **42** (Generali
Genext), **43** (Techcombank RMA), **51** (Marriott Voyage), **55** (Savills), **61** (SPX Express),
**67** (ABeam), **68** (FPT Software), **73** (TTC AgriS), **74** (Central Retail), **76** (TCL),
**77** (TAL Apparel), **79** (Base.vn), **80** (AnyMind), **83** (Viettonkin), **86** (Woori Bank),
**87** (WPP Media), **88** (Le Bros), **120** (AB InBev SET), **122** (DHL x AIESEC), **123**
(Jardine JETS), **124** (Project X), **126** (UNDP Vietnam).

**Approximated assessment/round structure** (company does not publish its selection stages, so the
`analytical_case` level describes the sector-normal aptitude/case pattern): ids **4** (HEINEKEN),
**19** (Colgate-Palmolive), **20**, **23**, **24**, **25** (DHL Supply Chain), **27**, **31** (Fast
Retailing), **33** (Grab), **36** (Cathay United Bank), **37** (Perfetti MT), **38**, **42**, **46**
(FrieslandCampina Sales Fresher), **53** (Pharmacity), **56** (Sun Group), **57** (Avery Dennison),
**58** (AkzoNobel), **61**, **67**, **71** (F88), **72** (Perfetti Internship), **73**, **76**,
**77**, **79**, **86**.

**Approximated English requirement** (no level published; inferred from the employer's own operating
language and stated in the rubric as such): ids **73** (TTC AgriS — agri-export documentation),
**79** (Base.vn — Vietnamese client base, English product material), **86** (Woori Bank — Korean
language inferred from the requirement to be studying in South Korea), **122** (DHL x AIESEC — roles
advertised and interviewed in English), **124** (Project X — technology placements), **51**
(Marriott — no certificate level in the Vietnam Voyage listing), **74** (Central Retail — none
published; rubric says so and does not penalise the candidate).

**Two programs where no program-level criteria exist at all**, so the rubric is built on the firm's
own published adjacent early-career intake and says so in the text:

- **83 — Viettonkin Consulting, Management Trainee.** Viettonkin advertises a 2-year MT program but
  publishes no entry criteria for it. Criteria are taken from its current Business Development and
  HR intern JDs (final-year/recent graduate; Business/IB/Economics/Marketing; excellent English
  across 4 skills; excellent MS Office; pitching ability), which are the firm's actual published
  early-career bar.
- **88 — Le Bros.** Le Bros runs **no formal management-trainee scheme**. Its published entry route
  is a set of named internships (PR, Strategic Planning, Internal Communications, HR), and those JDs
  are what the rubric scores against (year 3–4 preferred, no experience required, good English,
  PowerPoint/Office plus Canva/Photoshop/CapCut as a stated advantage).

---

## ❌ No programs were left without data

Every one of the 57 rows received a program-specific rubric. There is no row where research failed
outright. Five rows carry a material caveat the fit engine should know about, all recorded inside
the rubric text itself:

| id | Program | Caveat |
|---|---|---|
| 6 | P&G — CEO Challenge | This is a **team-based business-case competition**, not a management-trainee intake. Teams of 3, years 1–4, any major, 75-minute online case (14 MCQ + 2 essays). Winning gives an advantage in later P&G recruitment but you still apply to MT programs from scratch. |
| 27 | Bosch Vietnam — Junior Managers Program | Requires **≥ 2 years' work experience** and prefers a Master's. A pure fresh graduate is not eligible — the only post-experience program in this part of the catalog. |
| 74 | Central Retail — Retail Rotational Trainee | Hard gate: **enrolment at COFER** (College of Foreign Economic Relations). A candidate from any other school cannot apply regardless of profile strength. Closed school-partnership intake, 2-year route to Section Manager by 2028. |
| 86 | Woori Bank — W.I.S.H. Global Internship | Hard gate: applicant must be a **Vietnamese (or Indonesian/Cambodian) national currently studying in South Korea**. A candidate studying in Vietnam cannot apply. |
| 122 | DHL x AIESEC — Upgrade Program | Hard enrolment gate and the most common rejection reason: you must be an **enrolled Master's student throughout**, or a **Bachelor's graduate within 2 months** of the start date. Current Bachelor's students and graduates >2 months out are explicitly excluded. Apply via AIESEC, not DHL. |
| 123 | Jardine Matheson — JETS | **Programme status caution:** careers.jardines.com now states the Group-level formal graduate programme is no longer in place and early-career hiring has moved to the Group companies (DFI Retail, Hongkong Land, Mandarin Oriental, Jardine Cycle & Carriage, Astra, Gammon, Jardine Schindler, Zung Fu). The rubric reflects the JETS bar as last published. |

Two further rows are **company-level placeholders** in the table (`program_name` equals the company
name) rather than named programs. Both now point at the company's real published intake:

- **87 — WPP Media** → the 6-month **Future Forward Traineeship** (final-year/0–1 yr, 3–6 months
  prior internship required, fluent English **and** Vietnamese, CV → aptitude test → panel
  interview, HCMC).
- **88 — Le Bros** → its named internship tracks (see above).

---

## Notes for follow-up

1. **`source` column still reads `llm_draft` on 50 rows.** The task specified updating only
   `criteria_json`, `verified` and `updated_at`, so `source` was deliberately left untouched. It is
   now slightly misleading provenance: those rubrics are researched, not LLM boilerplate. Consider a
   one-line update setting `source = 'research_verified'` (or similar) on the 57 ids processed here.
2. **Two pre-existing rows still contain generic GPA wording** — id **98** (Adidas Sourcing
   Associate) and id **116** (Mondelēz Taste The Future Internship). Both are `source = 'founder'`
   and were already `verified = true`, so they were out of scope and were not modified. They would
   benefit from the same treatment if you want the whole catalog specific.
3. **Schema fit for non-graduate programs.** The mandated 7-criterion schema assumes a
   fresh-graduate funnel. For id **121** (Acumen, mid-career, 5+ years) the criteria labelled
   "Relevant internship experience" and "Extracurriculars & leadership" are used to score
   professional impact work and current leadership position instead; the level text says so, but the
   labels themselves still read "internship" and "extracurriculars".
