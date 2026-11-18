// @ts-nocheck
/* ==========================================================================
   CERTIFICATION LEVEL SCALE  (cert-level-scale-v1)
   Single source of truth for how the level / score written next to a
   certificate on a CV changes its contribution to the fit score.

   This block is copied VERBATIM into every runtime that scores or parses
   certificates (casemate-function-fit-v1, casemate-matching-engine-v1
   and lib/certLevelScale.ts).
   When you edit a table below, edit all copies - the block between the
   BEGIN / END markers is identical everywhere.

   HOW TO EDIT
   - Weights are absolute 0-100 points for ONE certificate and replace the
     tier-based score (Tier 1 = 100, Tier 2 = 70, Tier 3 = 40) for scaled
     certificates when a level IS detected.
   - When the certificate is recognised but no level can be read, the weight is
     min(tier score, defaultWeight): conservative, never above today's score.
   - Certificates that match no scale keep the tier score untouched.
   ========================================================================== */
/* BEGIN CERT_LEVEL_SCALE */
var CertLevelScale = (function () {
  var VERSION = 'cert-level-scale-v1';

  // ---- 1. CEFR -> weight (shared by every language test) ------------------
  var CEFR_ORDER = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
  var CEFR_WEIGHT = { A1: 15, A2: 30, B1: 45, B2: 65, C1: 85, C2: 100 };
  var LANGUAGE_DEFAULT_WEIGHT = 55; // test named but no score/level readable

  // ---- 2. Score -> CEFR conversion tables ---------------------------------
  // Each row is [minimum score (inclusive), CEFR]; rows go from highest to lowest.
  // Sources: IELTS/TOEFL/TOEIC (ETS & IELTS partners' published CEFR mappings),
  // VSTEP (MOET Circular 01/2014: 4.0-5.5 B1, 6.0-8.0 B2, 8.5-10 C1),
  // PTE Academic (Pearson GSE/CEFR chart), Duolingo English Test (published
  // CEFR chart), Cambridge English Scale (also used by Linguaskill).
  var SCORE_TABLES = {
    ielts: [[8.5, 'C2'], [7, 'C1'], [5.5, 'B2'], [4, 'B1'], [3, 'A2'], [0, 'A1']], // < 4.0 = A2 or lower
    toeic: [[945, 'C1'], [785, 'B2'], [550, 'B1'], [225, 'A2'], [0, 'A1']], // Listening & Reading, 10-990
    toeflIbt: [[114, 'C2'], [95, 'C1'], [72, 'B2'], [42, 'B1'], [0, 'A2']], // 0-120
    toeflItp: [[627, 'C1'], [543, 'B2'], [460, 'B1'], [337, 'A2'], [0, 'A1']], // 310-677
    vstep: [[8.5, 'C1'], [6, 'B2'], [4, 'B1'], [0, 'A2']], // 0-10
    pte: [[85, 'C2'], [76, 'C1'], [59, 'B2'], [43, 'B1'], [30, 'A2'], [0, 'A1']], // 10-90
    duolingo: [[145, 'C2'], [120, 'C1'], [90, 'B2'], [60, 'B1'], [30, 'A2'], [0, 'A1']], // 10-160
    cambridgeScale: [[200, 'C2'], [180, 'C1'], [160, 'B2'], [140, 'B1'], [120, 'A2'], [0, 'A1']] // 80-230
  };
  // Level-number tests (level on the CV -> CEFR).
  var LEVEL_TABLES = {
    jlpt: { 5: 'A1', 4: 'A2', 3: 'B1', 2: 'B2', 1: 'C1' }, // N5..N1
    hsk: { 1: 'A1', 2: 'A2', 3: 'B1', 4: 'B2', 5: 'C1', 6: 'C2', 7: 'C2', 8: 'C2', 9: 'C2' },
    topik: { 1: 'A1', 2: 'A2', 3: 'B1', 4: 'B2', 5: 'C1', 6: 'C2' },
    tocfl: { 1: 'A1', 2: 'A2', 3: 'B1', 4: 'B2', 5: 'C1', 6: 'C2' },
    vstepLevel: { 1: 'A1', 2: 'A2', 3: 'B1', 4: 'B2', 5: 'C1', 6: 'C2' } // "bac 4/6"
  };
  var CAMBRIDGE_NAMED = [
    [/\b(?:cpe|c2 proficiency)\b/i, 'C2'], [/\b(?:cae|c1 advanced)\b/i, 'C1'],
    [/\b(?:fce|b2 first)\b/i, 'B2'], [/\b(?:pet|b1 preliminary)\b/i, 'B1'], [/\b(?:ket|a2 key)\b/i, 'A2']
  ];

  // ---- 3. Stage scales (professional certificates) ------------------------
  // CFA: only passed levels contribute a stage weight.
  var CFA_WEIGHT = {
    1: { passed: 45 },
    2: { passed: 65 },
    3: { passed: 90 },
    charterholder: 100
  };
  var CFA_DEFAULT_WEIGHT = 40; // "CFA" with no level (= today's Tier 3 score)
  // ACCA by papers passed (13 exams in total) and named stages.
  var ACCA_WEIGHT = { student: 35, applied_knowledge: 40, applied_skills: 55, affiliate: 75, strategic: 85, member: 100 };
  var ACCA_DEFAULT_WEIGHT = 40;
  // Generic progress stages for CPA, FRM, PMP, CMA, CIA, CAIA, CAMS, CIMA, ICAEW ACA / CFAB ...
  var STAGE_WEIGHT = { partial: 60, certified: 100 };
  var STAGE_DEFAULT_WEIGHT = 40;

  var SUGGESTIONS = {
    cfa: ['Level I Passed', 'Level II Passed', 'Level III Passed', 'Charterholder'],
    acca: ['Student', 'Applied Knowledge', '4 papers passed', 'Applied Skills', 'Affiliate', 'Strategic Professional', 'Member'],
    stage: ['Part I passed', '2/4 sections passed', 'Certified']
  };

  function clean(v) { return v == null ? '' : String(v).trim(); }
  function strip(v) { return clean(v).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\u0111/g, 'd'); }
  function num(v) { var n = parseFloat(String(v).replace(',', '.')); return isFinite(n) ? n : null; }
  function lookup(table, value) {
    for (var i = 0; i < table.length; i += 1) if (value >= table[i][0]) return table[i][1];
    return table[table.length - 1][1];
  }
  function cefrIn(text) {
    var m = /(?:^|[^a-z0-9])([abc][12])(?![a-z0-9])/i.exec(clean(text));
    return m ? m[1].toUpperCase() : null;
  }
  // Numbers in `text` (keyword removed) within [min,max]; `step` forces e.g. IELTS half-bands.
  function numberIn(text, min, max, opts) {
    var re = (opts && opts.re) || /(\d+(?:[.,]\d+)?)/g;
    var m;
    var t = clean(text);
    while ((m = re.exec(t))) {
      var raw = m[1];
      var v = num(raw);
      if (v == null || v < min || v > max) continue;
      if (opts && opts.half && Math.abs(v * 2 - Math.round(v * 2)) > 1e-9) continue;
      if (opts && opts.digits && String(raw).replace(/[.,].*$/, '').length < opts.digits) continue;
      if (opts && opts.multipleOf && v % opts.multipleOf !== 0) continue;
      return { value: v, text: String(raw).replace(',', '.') };
    }
    return null;
  }
  function firstOf(sources, fn) {
    for (var i = 0; i < sources.length; i += 1) {
      if (!clean(sources[i])) continue;
      var r = fn(sources[i]);
      if (r) return r;
    }
    return null;
  }
  function language(cefr, scoreText, stageText) {
    return { cefr: cefr, score: scoreText || '', stage: stageText || '', weight: CEFR_WEIGHT[cefr], label: cefr };
  }

  // ---- 4. Scales -----------------------------------------------------------
  // `test` runs on the certificate NAME. `read(sources)` receives [score, level, name]
  // (what the user typed first, the CV text last) and returns null when no level can be read.
  function readEnglish(sources, extract) {
    for (var i = 0; i < sources.length; i += 1) {
      var t = clean(sources[i]);
      if (!t) continue;
      var r = extract(t);
      if (r) return r;
      var c = cefrIn(t);
      if (c) return language(c, '', c);
    }
    return null;
  }
  var NOT_AFTER_LETTER = '(?:^|[^\\d.,a-z])';

  var SCALES = [
    { id: 'ielts', label: 'IELTS', kind: 'english', test: /\bielts\b/i, defaultWeight: LANGUAGE_DEFAULT_WEIGHT,
      suggestions: ['4.0', '5.0', '5.5', '6.0', '6.5', '7.0', '7.5', '8.0', '8.5', '9.0'],
      read: function (s) {
        return readEnglish(s, function (t) {
          var n = numberIn(t.replace(/ielts|academic|general|overall|band/ig, ' '), 1, 9, { half: true, re: new RegExp(NOT_AFTER_LETTER + '(\\d(?:[.,]\\d)?)(?![\\d.,]*\\d)', 'gi') });
          return n ? language(lookup(SCORE_TABLES.ielts, n.value), n.text) : null;
        });
      } },
    { id: 'toeic', label: 'TOEIC', kind: 'english', test: /\btoeic\b/i, defaultWeight: LANGUAGE_DEFAULT_WEIGHT,
      suggestions: ['500', '650', '750', '800', '900', '950'],
      read: function (s) {
        var speakingWriting = /speaking|writing|\bs\s*&\s*w\b|\bsw\b/i.test(s.join(' '));
        return readEnglish(s, function (t) {
          if (speakingWriting) return null; // different score scale: only an explicit CEFR level counts
          var n = numberIn(t.replace(/toeic|l\s*&\s*r|\blr\b|listening|reading/ig, ' '), 100, 990, { re: new RegExp(NOT_AFTER_LETTER + '(\\d{3})(?!\\d)', 'gi'), multipleOf: 5 });
          return n ? language(lookup(SCORE_TABLES.toeic, n.value), n.text) : null;
        });
      } },
    { id: 'toefl', label: 'TOEFL', kind: 'english', test: /\btoefl\b/i, defaultWeight: LANGUAGE_DEFAULT_WEIGHT,
      suggestions: ['70', '80', '90', '100', '110'],
      read: function (s) {
        return readEnglish(s, function (t) {
          var n = numberIn(t.replace(/toefl|ibt|itp/ig, ' '), 0, 677, { re: new RegExp(NOT_AFTER_LETTER + '(\\d{2,3})(?!\\d)', 'gi') });
          if (!n) return null;
          if (n.value >= 310) return language(lookup(SCORE_TABLES.toeflItp, n.value), n.text);
          if (n.value <= 120) return language(lookup(SCORE_TABLES.toeflIbt, n.value), n.text);
          return null;
        });
      } },
    { id: 'vstep', label: 'VSTEP', kind: 'english', test: /\bvstep\b/i, defaultWeight: LANGUAGE_DEFAULT_WEIGHT,
      suggestions: ['4.0', '5.0', '6.0', '7.0', '8.0', '8.5', '9.0'],
      read: function (s) {
        return readEnglish(s, function (t) {
          var lvl = /\b([1-6])\s*\/\s*6\b/.exec(t);
          if (lvl) return language(LEVEL_TABLES.vstepLevel[lvl[1]], '', lvl[1] + '/6');
          var n = numberIn(t.replace(/vstep/ig, ' '), 0, 10, { re: new RegExp(NOT_AFTER_LETTER + '(\\d{1,2}(?:[.,]\\d)?)(?![\\d.,]*\\d)', 'gi') });
          return n ? language(lookup(SCORE_TABLES.vstep, n.value), n.text) : null;
        });
      } },
    { id: 'pte', label: 'PTE Academic', kind: 'english', test: /\bpte\b/i, defaultWeight: LANGUAGE_DEFAULT_WEIGHT,
      suggestions: ['50', '58', '65', '73', '79', '85'],
      read: function (s) {
        return readEnglish(s, function (t) {
          var n = numberIn(t.replace(/pte|academic/ig, ' '), 10, 90, { re: new RegExp(NOT_AFTER_LETTER + '(\\d{2})(?!\\d)', 'gi') });
          return n ? language(lookup(SCORE_TABLES.pte, n.value), n.text) : null;
        });
      } },
    { id: 'duolingo', label: 'Duolingo English Test', kind: 'english', test: /\bduolingo\b/i, defaultWeight: LANGUAGE_DEFAULT_WEIGHT,
      suggestions: ['85', '100', '115', '125', '135', '150'],
      read: function (s) {
        return readEnglish(s, function (t) {
          var n = numberIn(t.replace(/duolingo|english|test|\bdet\b/ig, ' '), 10, 160, { re: new RegExp(NOT_AFTER_LETTER + '(\\d{2,3})(?!\\d)', 'gi') });
          return n ? language(lookup(SCORE_TABLES.duolingo, n.value), n.text) : null;
        });
      } },
    { id: 'cambridge', label: 'Cambridge / Linguaskill / Aptis', kind: 'english', test: /\b(?:cambridge|linguaskill|aptis|cpe|cae|fce|ket)\b|c2 proficiency|c1 advanced|b2 first|b1 preliminary|a2 key/i, defaultWeight: LANGUAGE_DEFAULT_WEIGHT,
      suggestions: ['B1', 'B2', 'C1', 'C2', '160', '180', '200'],
      read: function (s) {
        return readEnglish(s, function (t) {
          var n = numberIn(t, 80, 230, { re: new RegExp(NOT_AFTER_LETTER + '(\\d{3})(?!\\d)', 'gi') });
          if (n) return language(lookup(SCORE_TABLES.cambridgeScale, n.value), n.text);
          for (var i = 0; i < CAMBRIDGE_NAMED.length; i += 1) if (CAMBRIDGE_NAMED[i][0].test(t)) return language(CAMBRIDGE_NAMED[i][1], '', CAMBRIDGE_NAMED[i][1]);
          return null;
        });
      } },
    { id: 'jlpt', label: 'JLPT', kind: 'language', test: /\bjlpt\b|\bnat-?test\b|\bj-?test\b/i, defaultWeight: LANGUAGE_DEFAULT_WEIGHT,
      suggestions: ['N5', 'N4', 'N3', 'N2', 'N1'],
      read: function (s) {
        var hit = firstOf(s, function (t) { var m = /(?:^|[^a-z0-9])n\s?([1-5])(?![0-9])/i.exec(t); return m ? { v: m[1] } : null; });
        return hit ? language(LEVEL_TABLES.jlpt[hit.v], '', 'N' + hit.v) : null;
      } },
    { id: 'hsk', label: 'HSK', kind: 'language', test: /\bhsk\b/i, defaultWeight: LANGUAGE_DEFAULT_WEIGHT,
      suggestions: ['HSK 3', 'HSK 4', 'HSK 5', 'HSK 6'],
      read: function (s) {
        var hit = firstOf(s, function (t) { var m = /(?:hsk|level|cap|c\u1ea5p)\s*[-:.]?\s*([1-9])(?![0-9])/i.exec(t); return m ? { v: m[1] } : null; });
        return hit ? language(LEVEL_TABLES.hsk[hit.v], '', 'HSK ' + hit.v) : null;
      } },
    { id: 'topik', label: 'TOPIK', kind: 'language', test: /\btopik\b/i, defaultWeight: LANGUAGE_DEFAULT_WEIGHT,
      suggestions: ['Level 3', 'Level 4', 'Level 5', 'Level 6'],
      read: function (s) {
        var hit = firstOf(s, function (t) {
          var m = /(?:level|cap|c\u1ea5p|grade)\s*([1-6])(?![0-9])/i.exec(t) || /topik\s*(?:ii|i)?\s*[-:,(]?\s*([1-6])(?![0-9])/i.exec(t.replace(/topik\s*(?:ii|i)\b/ig, 'topik '));
          return m ? { v: m[1] } : null;
        });
        return hit ? language(LEVEL_TABLES.topik[hit.v], '', 'Level ' + hit.v) : null;
      } },
    { id: 'tocfl', label: 'TOCFL', kind: 'language', test: /\btocfl\b/i, defaultWeight: LANGUAGE_DEFAULT_WEIGHT,
      suggestions: ['Level 3', 'Level 4', 'Level 5', 'Level 6'],
      read: function (s) {
        var hit = firstOf(s, function (t) { var m = /(?:level|cap|c\u1ea5p)\s*([1-6])(?![0-9])/i.exec(t); return m ? { v: m[1] } : null; });
        return hit ? language(LEVEL_TABLES.tocfl[hit.v], '', 'Level ' + hit.v) : null;
      } },
    { id: 'cefr-language', label: 'DELF / DALF / Goethe / DELE', kind: 'language', test: /\b(?:delf|dalf|goethe|dele)\b/i, defaultWeight: LANGUAGE_DEFAULT_WEIGHT,
      suggestions: ['A2', 'B1', 'B2', 'C1', 'C2'],
      read: function (s) { var c = firstOf(s, cefrIn); return c ? language(c, '', c) : null; } },

    // ---- CFA: Level I / II / III x Candidate / Passed, then Charterholder
    { id: 'cfa', label: 'CFA', kind: 'stage', test: /\bcfa\b(?!\s*(?:institute\s+)?(?:investment foundations|esg))(?!.*(?:investment foundations|esg investing))/i, defaultWeight: CFA_DEFAULT_WEIGHT, suggestions: SUGGESTIONS.cfa,
      read: function (s) {
        var all = strip(s.join(' '));
        if (/charterholder|charter\s*holder|da nhan charter/.test(all)) return { cefr: null, score: '', stage: 'Charterholder', weight: CFA_WEIGHT.charterholder, label: 'CFA Charterholder' };
        var PASSED = /\b(?:pass(?:ed)?|clear(?:ed)?|complete(?:d)?)\b|\bda\s+(?:do|dau)\b|vuot qua|hoan thanh/;
        var statusOf = function (t) { var x = strip(t); return PASSED.test(x) ? 'passed' : null; };
        var globalStatus = null;
        for (var i = 0; i < s.length && !globalStatus; i += 1) if (clean(s[i])) globalStatus = statusOf(s[i]);
        var levels = null;
        for (var j = 0; j < s.length && !levels; j += 1) {
          if (!clean(s[j])) continue;
          var found = [];
          strip(s[j]).split(/[,;&\/+]|\band\b/).forEach(function (segment) {
            var m = /(?:level|lvl|cap|\bl)\s*[-:.]?\s*(iii|ii|i|[1-3])(?![a-z0-9])/.exec(segment) || /\bcfa\s*[-:.]?\s*(iii|ii|i|[1-3])(?![a-z0-9])/.exec(segment);
            if (m) { var v = m[1]; found.push({ n: v === 'iii' || v === '3' ? 3 : v === 'ii' || v === '2' ? 2 : 1, status: statusOf(segment) }); }
          });
          if (found.length) levels = found;
        }
        if (!levels) return null;
        var top = levels.reduce(function (best, item) { return !best || item.n > best.n ? item : best; }, null);
        var status = top.status || globalStatus;
        if (status !== 'passed') return null;
        var stage = 'Level ' + (top.n === 3 ? 'III' : top.n === 2 ? 'II' : 'I') + ' Passed';
        return { cefr: null, score: '', stage: stage, weight: CFA_WEIGHT[top.n].passed, label: 'CFA ' + stage };
      } },

    // ---- ACCA: papers passed / named stage
    { id: 'acca', label: 'ACCA', kind: 'stage', test: /\b(?:acca|fcca|macca)\b(?!.*(?:dipifr|diploma in ifrs))/i, defaultWeight: ACCA_DEFAULT_WEIGHT, suggestions: SUGGESTIONS.acca,
      read: function (s) {
        var all = strip(s.join(' '));
        if (/\b(?:fcca|macca|member|fellow|qualified|fully qualified|thanh vien)\b|\b13\s*(?:\/\s*13|papers?|exams?)\b/.test(all)) return { cefr: null, score: '', stage: 'Member', weight: ACCA_WEIGHT.member, label: 'ACCA Member' };
        var papers = firstOf(s, function (t) {
          var m = /(\d{1,2})\s*(?:\/\s*13\s*)?(?:papers?|exams?|mon)\b/i.exec(strip(t)) || /\b(\d{1,2})\s*\/\s*13\b/.exec(t);
          return m && Number(m[1]) <= 13 ? { n: Number(m[1]) } : null;
        });
        if (/affiliate/.test(all)) return { cefr: null, score: '', stage: 'Affiliate', weight: ACCA_WEIGHT.affiliate, label: 'ACCA Affiliate' };
        if (papers) {
          var n = papers.n;
          var w = n >= 13 ? ACCA_WEIGHT.member : n >= 10 ? ACCA_WEIGHT.strategic : n >= 9 ? ACCA_WEIGHT.affiliate : n >= 4 ? ACCA_WEIGHT.applied_skills : n >= 1 ? ACCA_WEIGHT.applied_knowledge : ACCA_WEIGHT.student;
          return { cefr: null, score: '', stage: n + ' papers passed', weight: w, label: 'ACCA - ' + n + ' papers passed' };
        }
        if (/strategic professional|\bsbl\b|\bsbr\b/.test(all)) return { cefr: null, score: '', stage: 'Strategic Professional', weight: ACCA_WEIGHT.strategic, label: 'ACCA Strategic Professional' };
        if (/applied skills/.test(all)) return { cefr: null, score: '', stage: 'Applied Skills', weight: ACCA_WEIGHT.applied_skills, label: 'ACCA Applied Skills' };
        if (/applied knowledge/.test(all)) return { cefr: null, score: '', stage: 'Applied Knowledge', weight: ACCA_WEIGHT.applied_knowledge, label: 'ACCA Applied Knowledge' };
        if (/\b(?:student|dang hoc|ung vien)\b/.test(all)) return { cefr: null, score: '', stage: 'Student', weight: ACCA_WEIGHT.student, label: 'ACCA Student' };
        return null;
      } },

    // ---- Generic professional-stage certificates
    { id: 'pro-stage', label: 'Professional certificate (CPA, FRM, PMP, CMA, CIA, CAIA, CAMS, CIMA, ICAEW/CFAB)', kind: 'stage',
      test: /\bcpa\b|certified public accountant|\bfrm\b|financial risk manager|\bpmp\b|project management professional|\bcma\b|certified management accountant|\bcia\b|certified internal auditor|\bcaia\b|\bcams\b|\bcima\b|\bcgma\b|\bicaew\b|\bcfab\b|\baca\b/i,
      defaultWeight: STAGE_DEFAULT_WEIGHT, suggestions: SUGGESTIONS.stage,
      read: function (s) {
        var cleaned = s.map(function (t) {
          return strip(t).replace(/certified (?:public accountant|management accountant|internal auditor|financial planner)/g, ' ')
            .replace(/chartered (?:institute of management accountants|global management accountant|financial analyst)/g, ' ')
            .replace(/institute of chartered accountants in england and wales/g, ' ');
        });
        var fraction = firstOf(cleaned, function (t) {
          var m = /\b(\d{1,2})\s*(?:\/|of)\s*(\d{1,2})\b/.exec(t);
          return m && Number(m[2]) >= 2 && Number(m[2]) <= 20 && Number(m[1]) <= Number(m[2]) ? { x: Number(m[1]), y: Number(m[2]) } : null;
        });
        var certified = firstOf(cleaned, function (t) { return /\b(?:certified|licensed|licenced|qualified|charter(?:ed)?|holder|member|fellow|passed all|all (?:parts|sections|levels|exams|papers)|completed|awarded|obtained)\b|da (?:co|dat|duoc cap)/.test(t) ? { v: 1 } : null; });
        var partial = firstOf(cleaned, function (t) { return /\b(?:part|level|section|paper|stage|exam)s?\s*(?:[ivx]+|\d+)?\s*(?:passed|cleared)\b|\bpassed\s*(?:part|level|section|stage|exam|paper)s?\b/.test(t) ? { v: 1 } : null; });
        if (fraction) {
          if (fraction.x >= fraction.y) return { cefr: null, score: '', stage: 'Certified', weight: STAGE_WEIGHT.certified, label: 'All parts passed / certified' };
          var w = Math.max(40, Math.min(90, 30 + Math.round(60 * fraction.x / fraction.y)));
          return { cefr: null, score: '', stage: fraction.x + '/' + fraction.y + ' passed', weight: w, label: fraction.x + '/' + fraction.y + ' parts passed' };
        }
        if (certified) return { cefr: null, score: '', stage: 'Certified', weight: STAGE_WEIGHT.certified, label: 'Certified' };
        if (partial) return { cefr: null, score: '', stage: 'Part passed', weight: STAGE_WEIGHT.partial, label: 'Part passed' };
        return null;
      } }
  ];

  function findScale(name) {
    var n = clean(name);
    if (/\bgoogle project management\b.*\bcertificate\b/i.test(n)) return null;
    for (var i = 0; i < SCALES.length; i += 1) if (SCALES[i].test.test(n)) return SCALES[i];
    return null;
  }

  // entry: "IELTS 7.5" or { name, score?, level? }.
  // Returns the detected level plus the weight that replaces the tier score.
  function resolve(entry) {
    var isObj = entry && typeof entry === 'object';
    var name = clean(isObj ? (entry.name || entry.nameRaw || entry.nameNormalized) : entry);
    var rawName = clean(isObj && entry.nameRaw ? entry.nameRaw : '');
    var scoreText = clean(isObj ? entry.score : '');
    var levelText = clean(isObj ? entry.level : '');
    var out = { name: name, scaleId: null, scaleLabel: '', kind: '', score: scoreText, stage: levelText, cefr: null, levelLabel: '', weight: null, detected: false, defaulted: false, summary: name, suggestions: [] };
    var scale = findScale(name) || (rawName ? findScale(rawName) : null);
    if (!scale) return out;
    out.scaleId = scale.id;
    out.scaleLabel = scale.label;
    out.kind = scale.kind;
    out.suggestions = scale.suggestions || [];
    var sources = [scoreText, levelText, name];
    if (rawName && rawName !== name) sources.push(rawName);
    var read = scale.read(sources);
    if (read) {
      out.detected = true;
      out.score = read.score || '';
      out.stage = read.stage || '';
      out.cefr = read.cefr || null;
      out.levelLabel = read.label;
      out.weight = read.weight;
      var shown = out.score && name.indexOf(out.score) < 0 ? name + ' ' + out.score : name;
      out.summary = shown + ' \u2192 ' + (read.cefr && read.label !== read.cefr ? read.cefr : read.label);
      if (scale.kind === 'stage') out.summary = shown + ' \u2192 ' + (read.stage || read.label);
    } else {
      out.defaulted = true;
      out.weight = scale.defaultWeight;
      out.summary = name + ' \u2192 level not detected (conservative default applied)';
    }
    return out;
  }

  // Weight for one certificate: the level scale when the certificate has one, else the tier score.
  function weightFor(entry, tierScore) {
    var r = resolve(entry);
    if (!r.scaleId) return { score: tierScore, scaled: false, resolved: r };
    if (r.detected) return { score: r.weight, scaled: true, resolved: r };
    return { score: Math.min(tierScore, r.weight), scaled: true, resolved: r };
  }

  function cefrFor(entry) { return resolve(entry).cefr; }

  return { VERSION: VERSION, CEFR_ORDER: CEFR_ORDER, CEFR_WEIGHT: CEFR_WEIGHT, SCALES: SCALES, resolve: resolve, weightFor: weightFor, cefrFor: cefrFor };
})();
/* END CERT_LEVEL_SCALE */

export { CertLevelScale };

export type CertificationDetail = { name: string; score?: string; level?: string };
export type CertResolution = {
  name: string;
  scaleId: string | null;
  scaleLabel: string;
  kind: string;
  score: string;
  stage: string;
  cefr: string | null;
  levelLabel: string;
  weight: number | null;
  detected: boolean;
  defaulted: boolean;
  summary: string;
  suggestions: string[];
};

const certKey = (value: unknown) => String(value || '').trim().toLocaleLowerCase('vi');

export function resolveCertification(entry: unknown): CertResolution {
  return CertLevelScale.resolve(entry) as CertResolution;
}

// The certificate chips collapse language families ("JLPT N2" -> "JLPT"); the level lives in the details.
export function canonicalCertificationLabel(name: string): string {
  const value = String(name || '').trim();
  if (/^JLPT\b/i.test(value)) return 'JLPT';
  if (/^HSK\b/i.test(value)) return 'HSK';
  if (/^CFA\b/i.test(value)) return 'CFA';
  return value;
}

// Build the editable level list from everything the CV parser returned (strings or typed rows).
// Levels the user already confirmed (`saved`) always win over re-detection.
export function detailsFromSources(sources: unknown[], labelOf: (item: unknown) => string, saved?: unknown): CertificationDetail[] {
  const out = new Map<string, CertificationDetail>();
  const confirmed = new Set<string>();
  (Array.isArray(saved) ? saved : []).forEach((item: any) => {
    const name = String(item?.name || '').trim();
    const score = String(item?.score || '').trim();
    const level = String(item?.level || '').trim();
    if (!name || (!score && !level) || /\bcandidate\b/i.test(`${score} ${level}`)) return;
    out.set(certKey(name), { name, score, level });
    confirmed.add(certKey(name));
  });
  (Array.isArray(sources) ? sources : []).forEach((item: any) => {
    const label = String(labelOf(item) || '').trim();
    if (!label || label === '[object Object]' || confirmed.has(certKey(label)) || out.has(certKey(label))) return;
    const typed = item && typeof item === 'object' ? item : null;
    const resolved = CertLevelScale.resolve({
      name: label,
      nameRaw: typed ? typed.nameRaw : typeof item === 'string' ? item : '',
      score: typed ? typed.score : '',
      level: typed ? typed.level : '',
    }) as CertResolution;
    if (!resolved.scaleId || !resolved.detected) return;
    out.set(certKey(label), { name: label, score: resolved.score, level: resolved.stage });
  });
  return Array.from(out.values());
}

export function certificationInputValue(detail?: CertificationDetail | null): string {
  return String(detail?.score || detail?.level || '').trim();
}

// One text box edits the score or the level: numbers are scores, anything else is a level / stage.
export function applyCertificationInput(name: string, value: string, details: CertificationDetail[]): CertificationDetail[] {
  const rest = (details || []).filter((item) => certKey(item.name) !== certKey(name));
  const text = String(value || '').trim();
  if (!text || /\bcandidate\b/i.test(text)) return rest;
  const scaleId = (CertLevelScale.resolve({ name }) as CertResolution).scaleId;
  if (scaleId === 'acca' && /^\d{1,2}$/.test(text)) return [...rest, { name, score: '', level: `${text} papers passed` }];
  return [...rest, /^[\d.,\s]+$/.test(text) ? { name, score: text, level: '' } : { name, score: '', level: text }];
}

// parsed_cv.certifications mirrors the confirmed chips so the scoring hook sees the user's corrections.
export function toParsedCertifications(names: string[], details: CertificationDetail[]): Array<{ name: string; score: string; level: string }> {
  const byName = new Map((details || []).map((item) => [certKey(item.name), item] as const));
  return (names || []).filter(Boolean).map((name) => {
    const detail = byName.get(certKey(name));
    return { name, score: String(detail?.score || ''), level: String(detail?.level || '') };
  });
}

export type CertificationIssuer = { name: string; issuer: string };

// Issuers live beside the score/level details, which drop a certificate as soon as its level is cleared.
// Pass `names` to keep only certificates that are still selected.
export function issuersFromSaved(saved: unknown, names?: string[]): CertificationIssuer[] {
  const wanted = names ? new Set(names.map(certKey)) : null;
  const out = new Map<string, CertificationIssuer>();
  (Array.isArray(saved) ? saved : []).forEach((item: any) => {
    const name = String(item?.name || '').trim();
    const issuer = String(item?.issuer || '').trim();
    if (name && issuer && (!wanted || wanted.has(certKey(name)))) out.set(certKey(name), { name, issuer });
  });
  return Array.from(out.values());
}

export function certificationIssuerValue(name: string, issuers?: CertificationIssuer[] | null): string {
  return String((issuers || []).find((item) => certKey(item.name) === certKey(name))?.issuer || '');
}

export function applyCertificationIssuer(name: string, value: string, issuers: CertificationIssuer[]): CertificationIssuer[] {
  const rest = (issuers || []).filter((item) => certKey(item.name) !== certKey(name));
  return String(value || '').trim() ? [...rest, { name, issuer: value }] : rest;
}
