// Casemate — rubric-aware program scoring for the fit-assessment pipeline
// (job-fit v2, per data/job-fit-model-review.md).
//
// WHY THIS FILE EXISTS: registered server hooks execute ONLY from the
// platform's server-functions registry — a workspace file is never a hook,
// and hook management endpoints are 401-walled to build agents. So this
// module is the SOURCE OF TRUTH that Otto deploys from, exactly like
// lib/authAccount.ts (AUTH_HOOK_TEMPLATE → the registered casemate-auth-v1
// hook). Nothing here runs in the browser; the snippet below is sandbox-
// compatible JavaScript for the hook runtime (globals: db, platform, respond
// — see integrations/server-functions/docs.md). It has NO imports.
//
// WHAT IT CHANGES (deploy target: the registered fit-assessment hook that
// backs the agent's run_fit_assessment tool and writes assessment_results):
//
//   1. After the current free-form matching computes `direction` (with its
//      ranked programs) and the per-program `program_guides`, the hook calls
//      applyRubricScoringV2(...). For every program in direction.programs
//      that has an ACTIVE rubric row in the program_fit_rubrics table
//      (newest active version per program_id wins), the LLM re-scores that
//      program CRITERION BY CRITERION against the CV + gap answers.
//   2. Every criterion scored above 'chua_dat' MUST carry a VERBATIM quote
//      from the CV / gap answers. Quotes are verified server-side
//      (whitespace-normalized substring check); a level whose quote fails
//      verification is DOWNGRADED one level and the quote dropped — the
//      model can never claim unevidenced strength.
//   3. The program's match_percent becomes the share of rubric criteria met
//      (dat/noi_bat or score >= 60). This keeps the displayed requirement
//      status and ratio consistent: zero blocking gaps always equals 100%.
//      The full per-criterion breakdown is
//      attached to the program's guide as `rubric_breakdown`, which the
//      'How to get there' panel renders (per-criterion level + evidence +
//      what to improve), and each criterion's `improve` line feeds the gaps
//      list so the personal plan maps 1:1 to the rubric.
//   4. FALLBACK (no regression): a program with no active rubric — or any
//      per-program LLM/JSON failure — keeps its existing free-form score
//      untouched. The scoring_note says which method applied.
//
// RUBRIC LIFECYCLE (enforced by convention + the table's docs):
//   - Drafts are seeded at runtime by the app (lib/programFitRubrics.ts,
//     ensureProgramFitRubricSeeds) with verified=false, version=1.
//   - The founder reviews and locks a rubric by setting verified=true.
//   - A verified row is NEVER overwritten: changes = INSERT a new row with
//     version+1. active=false retires a version.
//
// INTEGRATION STEPS FOR OTTO (server-functions registry):
//   1. Paste the snippet below into the registered fit-assessment hook,
//      above its main handler body.
//   2. Where the hook has finished building `direction` (programs ranked,
//      guides built) and has `cvText` (the raw CV text the candidate
//      submitted / the parsed profile serialized) and `gapAnswersText`
//      (the gap answers serialized as 'question: answer' lines), add:
//
//        var rubricOutcome = await applyRubricScoringV2(
//          direction, programGuides, cvText, gapAnswersText);
//        if (rubricOutcome.applied.length > 0) {
//          scoringNote = rubricOutcome.scoringNote + ' ' + scoringNote;
//        }
//
//      ...BEFORE the result is saved to assessment_results and returned.
//      (program_guides entries gain `rubric_breakdown`; direction.programs
//      entries gain rubric-derived match_percent + appended cv_evidence.)
//   3. Raise the hook's metadata.timeout if needed — rubric scoring adds up
//      to 6 parallel platform.generateText calls (top-5 slate + pinned
//      target), each bounded by maxTokens 2500.
//   4. Verify: run one assessment; confirm (a) rubric-backed programs carry
//      result_json.program_guides[i].rubric_breakdown, (b) their
//      match_percent equals the breakdown's weighted_match_percent, (c) a
//      program without an active rubric still scores via the old path.
//
// After editing this template, bump RUBRIC_SCORING_HOOK_VERSION so the
// deployed hook and this source can be compared at a glance.

export const RUBRIC_SCORING_HOOK_VERSION = 'rubric-fit-v2';

export const RUBRIC_SCORING_HOOK_SNIPPET = `
// === Casemate rubric-based program scoring (rubric-fit-v2) ==================
// Source of truth: lib/rubricScoringHook.ts in the workspace. Do not edit the
// deployed copy without updating that file.

var RUBRIC_LEVELS_V2 = ['chua_dat', 'dat', 'noi_bat'];
var RUBRIC_LEVEL_BANDS_V2 = {
  chua_dat: { min: 0, max: 45, mid: 30 },
  dat: { min: 50, max: 80, mid: 65 },
  noi_bat: { min: 85, max: 100, mid: 92 }
};

function rubricNameKeyV2(value) {
  return String(value || '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
}

function rubricParseJsonV2(value) {
  if (typeof value !== 'string') return value;
  try { return JSON.parse(value); } catch (e) { return null; }
}

// Newest ACTIVE rubric per program_id; verified beats draft at equal version.
async function loadActiveRubricsV2() {
  var result = await db.query('program_fit_rubrics', { limit: 500 });
  var rows = (result && result.rows) || [];
  var byProgram = {};
  for (var i = 0; i < rows.length; i++) {
    var row = rows[i];
    if (row.active === false) continue;
    var criteria = rubricParseJsonV2(row.criteria_json);
    if (!Array.isArray(criteria) || criteria.length === 0) continue;
    var version = Number(row.version) || 1;
    var verified = row.verified === true;
    var current = byProgram[row.program_id];
    if (
      !current ||
      version > current.version ||
      (version === current.version && verified && !current.verified) ||
      (version === current.version && verified === current.verified && Number(row.id) > current.row_id)
    ) {
      byProgram[row.program_id] = {
        row_id: Number(row.id) || 0,
        program_id: String(row.program_id),
        program_name: String(row.program_name || row.program_id),
        version: version,
        verified: verified,
        criteria: criteria,
        ideal_profile_text: String(row.ideal_profile_text || ''),
        example_admit_profile: row.example_admit_profile ? String(row.example_admit_profile) : null
      };
    }
  }
  return byProgram;
}

// Verbatim-evidence check: whitespace-normalized, case-insensitive substring.
function rubricNormalizeQuoteV2(value) {
  return String(value || '').toLowerCase().replace(/\\s+/g, ' ').trim();
}
function rubricQuoteAppearsV2(quote, normalizedSource) {
  var q = rubricNormalizeQuoteV2(quote);
  return q.length >= 8 && normalizedSource.indexOf(q) !== -1;
}

function rubricClampScoreV2(level, score) {
  var band = RUBRIC_LEVEL_BANDS_V2[level];
  var n = Number(score);
  if (!isFinite(n)) return band.mid;
  return Math.max(band.min, Math.min(band.max, Math.round(n)));
}

function rubricWeightedPercentV2(criteria) {
  if (!Array.isArray(criteria) || criteria.length === 0) return 0;
  var met = 0;
  for (var i = 0; i < criteria.length; i++) {
    if (
      criteria[i].level === 'dat' ||
      criteria[i].level === 'noi_bat' ||
      Number(criteria[i].score || 0) >= 60
    ) met += 1;
  }
  return Math.max(0, Math.min(100, Math.round((met / criteria.length) * 100)));
}

function buildRubricScoringPromptV2(rubric, programName, cvText, gapAnswersText) {
  var criteriaLines = rubric.criteria.map(function (c) {
    return '- id: ' + c.id + ' | ' + c.label_en + ' | weight ' + c.weight + '%\\n' +
      '  chua_dat: ' + c.levels.chua_dat + '\\n' +
      '  dat: ' + c.levels.dat + '\\n' +
      '  noi_bat: ' + c.levels.noi_bat;
  }).join('\\n');
  var idealBlock = rubric.ideal_profile_text
    ? '\\nIDEAL CANDIDATE PROFILE (HyRe reference):\\n' + rubric.ideal_profile_text + '\\n'
    : '';
  var admitBlock = rubric.example_admit_profile
    ? '\\nSUCCESSFUL CANDIDATE PROFILE (anonymized, founder-provided):\\n' + rubric.example_admit_profile + '\\n'
    : '';
  return 'Score the candidate against the fixed rubric for the program "' + programName + '".\\n' +
    'RUBRIC (' + rubric.criteria.length + ' criteria, total weight 100):\\n' + criteriaLines + '\\n' +
    idealBlock + admitBlock +
    '\\nCANDIDATE CV:\\n---\\n' + cvText + '\\n---\\n' +
    '\\nSUPPLEMENTARY ANSWERS (gap answers):\\n---\\n' + (gapAnswersText || '(none)') + '\\n---\\n' +
    '\\nMANDATORY REQUIREMENTS:\\n' +
    '1. Score EVERY criterion at one level: chua_dat | dat | noi_bat, following the rubric level descriptions exactly. Do not invent new criteria.\\n' +
    '2. score must be an integer within the selected level band: chua_dat 0-45, dat 50-80, noi_bat 85-100.\\n' +
    '3. evidence must be a VERBATIM short quote from the CV or supplementary answers (copy every character exactly, in any source language). A dat/noi_bat level MUST have evidence. If the source contains no evidence, score chua_dat and set evidence to null. NEVER invent or paraphrase evidence.\\n' +
    '4. improve must be one specific English sentence describing an action the candidate can take within 1-6 months to reach the next level. It may be null for noi_bat.\\n' +
    '5. Return ONLY one JSON array with no markdown. Each item: {"id": "<criterion id>", "level": "chua_dat|dat|noi_bat", "score": <int>, "evidence": <string|null>, "improve": <string|null>}.';
}

var RUBRIC_SYSTEM_PROMPT_V2 = 'You are a rigorous recruitment assessor evaluating a candidate against a fixed rubric. Use only facts from the CV and supplementary answers; every piece of evidence must be a verbatim quote. Respond with plain JSON only and no explanation outside the JSON.';

function rubricExtractJsonArrayV2(text) {
  var raw = String(text || '');
  var start = raw.indexOf('[');
  var end = raw.lastIndexOf(']');
  if (start === -1 || end === -1 || end <= start) return null;
  try { return JSON.parse(raw.slice(start, end + 1)); } catch (e) { return null; }
}

// Score ONE program against its rubric. Returns a rubric_breakdown object or
// null (null = caller keeps the free-form score — the no-regression fallback).
async function scoreProgramAgainstRubricV2(rubric, programName, cvText, gapAnswersText) {
  try {
    var generated = await platform.generateText({
      userPrompt: buildRubricScoringPromptV2(rubric, programName, cvText, gapAnswersText),
      systemPrompt: RUBRIC_SYSTEM_PROMPT_V2,
      model: 'gpt-4o-mini',
      maxTokens: 2500
    });
    var scoredList = rubricExtractJsonArrayV2(generated && generated.text);
    if (!Array.isArray(scoredList)) return null;
    var byId = {};
    for (var i = 0; i < scoredList.length; i++) {
      if (scoredList[i] && scoredList[i].id) byId[String(scoredList[i].id)] = scoredList[i];
    }
    var normalizedSource = rubricNormalizeQuoteV2(String(cvText || '') + ' ' + String(gapAnswersText || ''));
    var criteria = [];
    for (var j = 0; j < rubric.criteria.length; j++) {
      var c = rubric.criteria[j];
      var s = byId[String(c.id)] || {};
      var level = RUBRIC_LEVELS_V2.indexOf(s.level) !== -1 ? s.level : 'chua_dat';
      var evidence = typeof s.evidence === 'string' && s.evidence.trim() ? s.evidence.trim() : null;
      var evidenceVerified = evidence ? rubricQuoteAppearsV2(evidence, normalizedSource) : false;
      // HARD RULE: a level above chua_dat without a VERIFIED verbatim quote is
      // downgraded one level — unevidenced strength never survives.
      if (level === 'noi_bat' && !evidenceVerified) level = 'dat';
      if (level === 'dat' && !evidenceVerified) level = 'chua_dat';
      if (!evidenceVerified) evidence = null;
      criteria.push({
        id: String(c.id),
        label_vi: String(c.label_vi || c.id),
        label_en: String(c.label_en || c.id),
        weight: Math.max(0, Math.min(100, Number(c.weight) || 0)),
        level: level,
        score: rubricClampScoreV2(level, s.score),
        evidence: evidence,
        evidence_verified: evidenceVerified,
        improve: typeof s.improve === 'string' && s.improve.trim() ? s.improve.trim() : null
      });
    }
    if (criteria.length === 0) return null;
    return {
      program_id: rubric.program_id,
      rubric_version: rubric.version,
      rubric_verified: rubric.verified,
      criteria: criteria,
      weighted_match_percent: rubricWeightedPercentV2(criteria)
    };
  } catch (e) {
    console.log('rubric scoring failed for ' + rubric.program_id + ': ' + (e && e.message));
    return null;
  }
}

// Main entry — call AFTER free-form matching built direction + programGuides,
// BEFORE saving. Mutates both in place; returns { applied, scoringNote }.
async function applyRubricScoringV2(direction, programGuides, cvText, gapAnswersText) {
  var applied = [];
  try {
    var programs = (direction && Array.isArray(direction.programs)) ? direction.programs : [];
    if (programs.length === 0) return { applied: applied, scoringNote: '' };
    var rubricsById = await loadActiveRubricsV2();
    var rubricIds = Object.keys(rubricsById);
    if (rubricIds.length === 0) return { applied: applied, scoringNote: '' };

    // Resolve each ranked program to its rubric by id when the matcher kept
    // one, else by normalized program/company name.
    var byNameKey = {};
    for (var r = 0; r < rubricIds.length; r++) {
      var rub = rubricsById[rubricIds[r]];
      byNameKey[rubricNameKeyV2(rub.program_name)] = rub;
      var parts = String(rub.program_name).split(' \u2014 ');
      for (var p = 0; p < parts.length; p++) byNameKey[rubricNameKeyV2(parts[p])] = rub;
    }
    var jobs = [];
    for (var i = 0; i < programs.length; i++) {
      (function (entry) {
        var rubric =
          (entry.program_id && rubricsById[entry.program_id]) ||
          byNameKey[rubricNameKeyV2(entry.program || '')] ||
          byNameKey[rubricNameKeyV2(entry.company || '')] ||
          null;
        if (!rubric) return; // no active rubric -> keep free-form score
        jobs.push(
          scoreProgramAgainstRubricV2(rubric, entry.program || entry.company, cvText, gapAnswersText).then(function (breakdown) {
            if (!breakdown) return; // scoring failed -> keep free-form score
            entry.match_percent = breakdown.weighted_match_percent;
            // Surface the verified quotes on the card too.
            var quotes = [];
            for (var q = 0; q < breakdown.criteria.length; q++) {
              if (breakdown.criteria[q].evidence) quotes.push(breakdown.criteria[q].evidence);
            }
            if (quotes.length > 0) entry.cv_evidence = quotes.slice(0, 4);
            // Attach the breakdown to this program's guide (match by name).
            var wantedProgram = rubricNameKeyV2(entry.program || '');
            var wantedCompany = rubricNameKeyV2(entry.company || '');
            var guides = Array.isArray(programGuides) ? programGuides : [];
            for (var g = 0; g < guides.length; g++) {
              var guide = guides[g];
              if (!guide) continue;
              var gp = rubricNameKeyV2(guide.program || '');
              var gc = rubricNameKeyV2(guide.company || '');
              if ((wantedProgram && gp === wantedProgram) || (wantedCompany && gc === wantedCompany)) {
                guide.rubric_breakdown = breakdown;
                guide.match_percent = breakdown.weighted_match_percent;
                // Rubric improve lines lead the gaps list -> the personal plan
                // maps 1:1 to the rubric.
                var improves = [];
                for (var m = 0; m < breakdown.criteria.length; m++) {
                  var crit = breakdown.criteria[m];
                  if (crit.level !== 'noi_bat' && crit.improve) {
                    improves.push((crit.label_en || crit.label_vi) + ': ' + crit.improve);
                  }
                }
                if (improves.length > 0) {
                  var oldGaps = Array.isArray(guide.gaps) ? guide.gaps : [];
                  guide.gaps = improves.concat(oldGaps).slice(0, 6);
                }
                break;
              }
            }
            applied.push(breakdown.program_id);
          })
        );
      })(programs[i]);
    }
    await Promise.all(jobs);
  } catch (e) {
    console.log('applyRubricScoringV2 failed: ' + (e && e.message));
  }
  var note = '';
  if (applied.length > 0) {
    note = 'For ' + applied.length + ' programs with an ideal-candidate rubric (founder-verified or a draft awaiting approval), match percentage equals the number of criteria rated met or standout divided by the total number of criteria. With no blocking gaps, the result is always 100%. Every score includes verbatim evidence from the CV. Programs without a rubric continue using the existing formula.';
  }
  return { applied: applied, scoringNote: note };
}
// === end rubric-fit-v2 ======================================================
`;
