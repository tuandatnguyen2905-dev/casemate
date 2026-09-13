/**
 * AgentChatView — per-space agent UI.
 *
 * THIS FILE IS THE PER-SPACE AGENT APPEARANCE. Edit it to restyle the agent
 * element (colors, spacing, copy, layout, message bubbles, header card,
 * suggestion chips, empty state, input bar, etc.). Your edits PERSIST across
 * recompiles.
 *
 * The runtime hook `useAgentChatRuntime` and the `AgentChat.tsx` shell are
 * platform-managed and force-overwritten on each compile — do not put any
 * logic / state / fetch / effect work in here. This view is purely
 * presentational; it consumes the runtime and renders.
 */
import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import {
  Bot,
  Send,
  Loader2,
  Paperclip,
  X,
  FileImage,
  File,
  XCircle,
  FileUp,
  Sparkles,
  Info,
  Minus,
  Building2,
  Target,
  CheckCircle2,
  Check,
  BarChart3,
  CalendarClock,
  ClipboardList,
  FileText,
  Lock,
  Plus,
  Radar,
  Trash2,
  Award,
  ExternalLink,
  Map as MapIcon,
  Camera as CameraHint,
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import type { Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { tw } from '../lib/colors';
import { showViewportToast } from './ViewportToast';
import { findProgramTimeline, deadlineStatus, roundStepsFor } from '../lib/programTimelines';
import { findProgramRewards } from '../lib/programRewards';
import { generateAndSaveRoadmap, ROADMAP_APP_ID } from '../lib/prepRoadmap';
import {
  ensureProgramFitRubricSeeds,
  findActiveRubricForProgram,
  findDraftRubric,
  resolveRubricProgramId,
  normalizeRubricBreakdown,
  RUBRIC_LEVEL_LABELS_VI,
} from '../lib/programFitRubrics';
import type { RubricLevelId } from '../lib/programFitRubrics';
import {
  findCompetitiveScore,
  getQuadrantLabel,
  tierLabelVI,
  competitiveBarColor,
  competitiveTextColor,
  sortProgramsByAppetite,
  scoreCompetitiveAppetite,
  APPETITE_QUESTIONS,
  APPETITE_SUMMARY_VI,
  APPETITE_LABELS_VI,
} from '../lib/competitiveScores';
import type { CompetitiveAppetite, AppetitePayload } from '../lib/competitiveScores';
import { CompetitiveAppetiteSection } from './CompetitiveAppetiteSection';
import {
  computeCultureCompatibility as computeIntelCultureCompatibility,
  findCompanyIntel,
  intelAgeDays,
  intelConfidenceLabel,
  intelDifficultyLabel,
  parseIntelRows,
} from '../lib/companyIntelligence';
import type { CompanyIntelRecord } from '../lib/companyIntelligence';
import {
  CASE_TYPE_CATALOG,
  INDUSTRY_CASE_TYPE_RULES,
  FUNCTION_CASE_TYPE_RULES,
  GENERAL_CASE_TYPE_RECS,
} from '../apps/CaseDrillLog/caseTypeCatalog';
import {
  CultureFitSection,
  CultureFitQuestionGroups,
  OCP_ITEMS,
  MBTI_ITEMS,
  MBTI_TYPES,
  companiesFromDbRows,
  computePreferences,
  rankCompanies,
  scoreMbti,
} from './CultureFitSection';
import type { CompanyProfile, CorporatePayload, MbtiPayload } from './CultureFitSection';
import type { AgentChatRuntime, ChatMessage } from './useAgentChatRuntime';

interface AgentChatViewProps {
  runtime: AgentChatRuntime;
}

// Convert an internal runtime action (a tool/function name or a progress
// string) into a friendly, candidate-safe status line. Anything unrecognized
// returns null and the indicator falls back to a generic thinking state —
// raw tool names, function names, or internal mechanics must never appear
// in the customer-facing chat.
function humanizeWorkingStatus(action?: string): string | null {
  if (!action) return null;
  const a = action.toLowerCase();
  // Explicit tool-name mappings first (fit assessment + the Case Pool /
  // Case Drill practice engines + Domain Knowledge), then the generic
  // keyword fallbacks.
  if (/grade_practice_case/.test(a)) return 'Grading your answer against the rubric…';
  if (/generate_practice_case/.test(a)) return 'Building your practice case…';
  if (/grade_micro_drill/.test(a)) return 'Checking your drill answer…';
  if (/generate_micro_drill/.test(a)) return 'Setting up your timed drill…';
  if (/get_industry_article/.test(a)) return 'Writing up that article — fresh sources, give me ~30 seconds…';
  if (/list_industry_articles/.test(a)) return 'Opening the article library…';
  if (/get_industry_brief/.test(a)) return 'Researching your industry — fresh sources, give me ~30 seconds…';
  if (/list_industries/.test(a)) return 'Pulling up your matched industries…';
  if (/run_fit_assessment/.test(a)) return 'Scoring all 20 verified programs — your results card lands here in seconds…';
  if (/get_gap_questions/.test(a)) return 'Preparing your quick questions…';
  if (/analyze_cv/.test(a)) return 'Reading your CV — tap through the questions in the floating window while I work…';
  if (/get_assessment_result|get_drill_log_summary/.test(a)) return 'Loading your saved direction…';
  if (/save_assessment_result/.test(a)) return 'Saving your direction…';
  if (/(pdf|docx|attachment|cv|resume|upload)/.test(a)) return 'Reading your CV…';
  if (/(write|edit|create|save|task|todo|plan)/.test(a)) return 'Building your direction…';
  if (/(glob|grep|search|query|find|match|program|web|fetch|browse)/.test(a)) return 'Matching programs…';
  if (/(read|view|ls|list|file|open)/.test(a)) return 'Analyzing your background…';
  return null;
}

// Rotating reassurance lines so a longer wait never looks frozen — shown
// under the status pill once a turn passes ~8 seconds.
const WORKING_REASSURANCE = [
  'Still on it — this takes seconds, not minutes.',
  'Almost there — crunching the last pieces…',
  'Hang tight — your result lands in one message.',
];

function WorkingIndicator({
  lastAction,
  agentLabel = 'Agent',
  thinkingText,
}: {
  lastAction?: string;
  agentLabel?: string;
  thinkingText?: string | null;
}) {
  const status =
    humanizeWorkingStatus(lastAction) || thinkingText || `${agentLabel} is thinking…`;
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const startedAt = Date.now();
    const timer = setInterval(() => setElapsed(Math.floor((Date.now() - startedAt) / 1000)), 1000);
    return () => clearInterval(timer);
  }, []);

  const reassurance =
    elapsed >= 8 ? WORKING_REASSURANCE[Math.floor(elapsed / 8 - 1) % WORKING_REASSURANCE.length] : null;

  return (
    <div className="flex flex-col items-center justify-center gap-1.5 py-2 mr-8">
      <div className="flex items-center gap-2 px-3 py-1.5 bg-[var(--space-surface-muted)] rounded-full">
        <Loader2 className="h-4 w-4 animate-spin text-[var(--space-text-muted)]" />
        <span className="text-xs font-medium text-[var(--space-text-secondary)]">{status}</span>
        {elapsed >= 3 && (
          <span className="text-[10px] tabular-nums text-[var(--space-text-muted)]">{elapsed}s</span>
        )}
      </div>
      <div className="h-1 w-44 overflow-hidden rounded-full bg-[var(--space-surface-muted)]">
        <div className="h-full w-full animate-pulse rounded-full bg-[var(--space-brand-highlight)]" />
      </div>
      {reassurance && (
        <p className="text-[10px] text-[var(--space-text-muted)]">{reassurance}</p>
      )}
    </div>
  );
}

// react-markdown strips its internal `node` prop from the rest spread when
// destructured, which keeps it from leaking onto DOM elements.
const SAFE_MARKDOWN_PROTOCOLS = /^(subscribe|app|https?|mailto|tel|ircs?|xmpp):/i;

const markdownUrlTransform = (value: string): string => {
  if (typeof value === 'string' && SAFE_MARKDOWN_PROTOCOLS.test(value)) {
    return value;
  }

  const colon = value.indexOf(':');
  const slash = value.indexOf('/');
  const question = value.indexOf('?');
  const hash = value.indexOf('#');

  if (
    colon === -1 ||
    (slash !== -1 && colon > slash) ||
    (question !== -1 && colon > question) ||
    (hash !== -1 && colon > hash)
  ) {
    return value;
  }

  return '';
};

const markdownComponents: Components = {
  p({ node: _node, children, ...props }) {
    return (
      <p className="my-2 text-sm sm:text-base" {...props}>
        {children}
      </p>
    );
  },
  ul({ node: _node, children, ...props }) {
    return (
      <ul
        className="my-3 pl-5 space-y-1"
        style={{ listStyleType: 'disc', listStylePosition: 'outside' }}
        {...props}
      >
        {children}
      </ul>
    );
  },
  ol({ node: _node, children, ...props }) {
    return (
      <ol
        className="my-3 pl-5 space-y-1"
        style={{ listStyleType: 'decimal', listStylePosition: 'outside' }}
        {...props}
      >
        {children}
      </ol>
    );
  },
  li({ node: _node, children, ...props }) {
    return (
      <li className="ml-0 text-sm sm:text-base" style={{ display: 'list-item' }} {...props}>
        {children}
      </li>
    );
  },
  table({ node: _node, children, ...props }) {
    return (
      <div className="overflow-x-auto my-3">
        <table
          className="min-w-full border-collapse border border-[var(--space-border-strong)] text-sm"
          {...props}
        >
          {children}
        </table>
      </div>
    );
  },
  thead({ node: _node, children, ...props }) {
    return (
      <thead className="bg-[var(--space-surface-muted)]" {...props}>
        {children}
      </thead>
    );
  },
  tbody({ node: _node, children, ...props }) {
    return <tbody {...props}>{children}</tbody>;
  },
  tr({ node: _node, children, ...props }) {
    return (
      <tr className="border-b border-[var(--space-border-default)]" {...props}>
        {children}
      </tr>
    );
  },
  th({ node: _node, children, ...props }) {
    return (
      <th
        className="border border-[var(--space-border-strong)] px-3 py-2 text-left font-semibold"
        {...props}
      >
        {children}
      </th>
    );
  },
  td({ node: _node, children, ...props }) {
    return (
      <td className="border border-[var(--space-border-strong)] px-3 py-2" {...props}>
        {children}
      </td>
    );
  },
  code({ node: _node, children, className, ...props }) {
    const isBlock = typeof className === 'string' && className.includes('language-');
    if (isBlock) {
      return (
        <code className={`${className ?? ''} break-all`} {...props}>
          {children}
        </code>
      );
    }
    return (
      <code
        className="bg-[var(--space-neutral-800)] text-[var(--space-neutral-100)] px-1.5 py-0.5 rounded text-sm break-all"
        {...props}
      >
        {children}
      </code>
    );
  },
  pre({ node: _node, children, ...props }) {
    return (
      <pre
        className="bg-[var(--space-neutral-800)] text-[var(--space-neutral-100)] rounded-lg p-3 my-2 overflow-x-auto max-w-full"
        style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}
        {...props}
      >
        {children}
      </pre>
    );
  },
  a({ node: _node, href, children }) {
    if (typeof href === 'string' && href.startsWith('app://')) {
      const appId = href.replace('app://', '');
      return (
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('[AgentChat] Button click - opening app:', appId);
            window.dispatchEvent(new CustomEvent('openApp', { detail: { appId } }));
          }}
          className={`inline-flex items-center gap-1 px-3 py-1 ${tw.button.primary} rounded-lg transition-colors text-xs font-medium mx-1`}
          data-testid={`link-app-${appId}`}
        >
          {children}
        </button>
      );
    }
    if (typeof href === 'string' && href.startsWith('subscribe://')) {
      return (
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            window.dispatchEvent(new CustomEvent('openApp', { detail: { appId: 'settings' } }));
          }}
          className="text-[var(--space-text-brand)] hover:underline break-all bg-transparent border-none p-0 font-inherit text-left"
          data-testid="link-subscribe-plans"
        >
          {children}
        </button>
      );
    }
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        title={href}
        className="text-[var(--space-text-brand)] hover:underline break-all"
      >
        {children}
      </a>
    );
  },
};

/* ============================================================================
 * Casemate fit-assessment message widgets
 *
 * The Mate agent emits two structured fenced blocks that this view upgrades
 * into interactive UI:
 *   ```options   — assessment quick-picks → tappable chips (multiple choice only;
 *                  legacy `freetext:` lines are ignored — no type-in field)
 *   ```questions — the FULL gap-fill question set (JSON array) → one
 *                  tap-to-answer form (single- and multi-select bars, optional
 *                  questions, options that reveal a typed field), submitted in
 *                  a single interaction
 *   ```cvprofile — the parsed CV profile (JSON) → editable right-side preview
 *                  panel so the candidate corrects the parse before matching
 *   ```direction — final assessment JSON → structured results card
 * ==========================================================================*/

// Assessment output must never surface raw HTML tag soup. If a message
// arrives containing significant HTML, convert the common tags to markdown
// and strip the rest so ReactMarkdown renders clean formatted output.
function htmlToMarkdown(text: string): string {
  if (!/<\/?(h[1-6]|p|ul|ol|li|br|strong|b|em|i|div|span|table|tr|td|th)\b[^>]*>/i.test(text)) {
    return text;
  }
  let t = text;
  t = t.replace(/<br\s*\/?>/gi, '\n');
  t = t.replace(/<h([1-6])[^>]*>([\s\S]*?)<\/h\1>/gi, (_m, lvl, inner) => '\n' + '#'.repeat(Number(lvl)) + ' ' + String(inner).trim() + '\n');
  t = t.replace(/<(strong|b)[^>]*>([\s\S]*?)<\/\1>/gi, '**$2**');
  t = t.replace(/<(em|i)[^>]*>([\s\S]*?)<\/\1>/gi, '*$2*');
  t = t.replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, (_m, inner) => '\n- ' + String(inner).trim());
  t = t.replace(/<\/?(ul|ol)[^>]*>/gi, '\n');
  t = t.replace(/<\/p>/gi, '\n\n');
  t = t.replace(/<p[^>]*>/gi, '');
  t = t.replace(/<[^>]+>/g, '');
  t = t.replace(/&nbsp;/gi, ' ').replace(/&amp;/gi, '&').replace(/&lt;/gi, '<').replace(/&gt;/gi, '>').replace(/&quot;/gi, '"').replace(/&#39;/gi, "'");
  return t.replace(/\n{3,}/g, '\n\n').trim();
}

// Assistant content occasionally arrives as a raw JSON event payload (e.g. a
// history row the runtime couldn't reduce to text, or a stray structured
// message). Reduce it to its natural-language text only; return '' when
// nothing readable can be extracted so the caller hides the message entirely.
// The candidate must never see raw JSON, tool names, or event structures.
function extractReadableAssistantText(content: string): string {
  const trimmed = content.trim();
  if (!trimmed.startsWith('[') && !trimmed.startsWith('{')) return content;

  let parsed: any;
  try {
    parsed = JSON.parse(trimmed);
  } catch (e) {
    return content; // Plain text that merely starts with a bracket
  }

  const events: any[] = Array.isArray(parsed) ? parsed : [parsed];
  const joinOf = (type: string, pick: (e: any) => any): string =>
    events
      .filter((e) => e && typeof e === 'object' && e.type === type)
      .map(pick)
      .filter((t): t is string => typeof t === 'string' && t.length > 0)
      .join('');

  const chunkText = joinOf('text_chunk', (e) => e.data?.text);
  if (chunkText.trim()) return chunkText.trim();

  const deltaText = joinOf('content_block_delta', (e) => e.data?.delta?.text);
  if (deltaText.trim()) return deltaText.trim();

  for (const type of ['assistant', 'message']) {
    const ev = events.find(
      (e) => e && typeof e === 'object' && e.type === type && Array.isArray(e.data?.content),
    );
    if (ev) {
      const t = ev.data.content
        .filter((c: any) => c && c.type === 'text' && typeof c.text === 'string')
        .map((c: any) => c.text)
        .join('');
      if (t.trim()) return t.trim();
    }
  }

  // Direct MessageContent[] shape: [{type:'text', text}, {type:'tool_use'…}]
  const directText = joinOf('text', (e) => e.text);
  if (directText.trim()) return directText.trim();

  const resultEv = events.find(
    (e) =>
      e &&
      typeof e === 'object' &&
      e.type === 'result' &&
      (typeof e.data?.response === 'string' || typeof e.data?.result === 'string'),
  );
  if (resultEv) {
    const t = resultEv.data.response ?? resultEv.data.result;
    if (typeof t === 'string' && t.trim()) return t.trim();
  }

  return '';
}

// The visible text an assistant message would render, across both content
// shapes. Empty string means the turn is pure agent mechanics (tool calls,
// unextractable payloads) and the whole bubble gets hidden.
function assistantRenderableText(msg: ChatMessage): string {
  if (typeof msg.content === 'string') return extractReadableAssistantText(msg.content).trim();
  if (!Array.isArray(msg.content)) return '';
  return msg.content
    .filter((chunk) => chunk.type === 'text' && typeof chunk.text === 'string')
    .map((chunk) => chunk.text || '')
    .join('')
    .trim();
}

interface OptionsBlock {
  options: string[];
}

function extractOptionsBlock(text: string): { body: string; block: OptionsBlock | null } {
  const match = text.match(/```options\s*\n([\s\S]*?)```\s*$/);
  if (!match || match.index === undefined) return { body: text, block: null };
  // The assessment is multiple choice only: legacy `freetext:` lines from older
  // transcripts are dropped so no type-in field is ever rendered.
  const options = match[1]
    .split('\n')
    .map((l) => l.trim())
    .filter((l) => l && !/^freetext\s*:/i.test(l));
  if (options.length === 0) return { body: text, block: null };
  return { body: text.slice(0, match.index).trim(), block: { options } };
}

interface GapQuestion {
  id: string;
  label?: string;
  question: string;
  options: string[];
  /** Candidate can tap and keep SEVERAL option bars selected at once. */
  multi?: boolean;
  /** Question may be skipped without blocking submit. */
  optional?: boolean;
  /** Option text → placeholder: selecting that option reveals a typed field. */
  inputs?: Record<string, string>;
}

// The UI language is English (language-switch brief): legacy question sets —
// including the ones the get_gap_questions hook still returns — carry trailing
// Legacy parenthetical hints from the previous localized questionnaire.
// Strip any trailing parenthetical that contains Vietnamese characters so every
// question and option renders in English, and so the fixed client set and the
// live hook set normalize to IDENTICAL strings (answers survive the swap).
const VIETNAMESE_HINT_CHAR = /[\u0102\u0103\u0110\u0111\u0128\u0129\u0168\u0169\u01A0\u01A1\u01AF\u01B0\u1EA0-\u1EF9\u00C0\u00C1\u00C3\u00C8\u00CC\u00CD\u00D2\u00D3\u00D5\u00D9\u00DA\u00DD\u00E0\u00E1\u00E3\u00E8\u00EC\u00ED\u00F2\u00F3\u00F5\u00F9\u00FA\u00FD\u00C2\u00CA\u00D4\u00E2\u00EA\u00F4]/;
function stripVietnameseParenthetical(text: string): string {
  let out = String(text || '');
  for (;;) {
    const next = out.replace(/\s*\(([^()]*)\)\s*$/, (match, inner) =>
      VIETNAMESE_HINT_CHAR.test(inner) ? '' : match,
    );
    if (next === out) break;
    out = next;
  }
  return out.trim();
}

// The fit-assessment scoring hook still emits a few Vietnamese fragments in
// its saved results (function_match_label, recommended_function name/reason,
// and bilingual function aliases inside prose). Until the hook itself is
// updated, translate the known patterns client-side so the card renders fully
// in English. Unknown strings pass through untouched.
function stripVietnameseAlias(name: string): string {
  const parts = String(name || '').split(' / ');
  const kept = parts.filter((part) => !VIETNAMESE_HINT_CHAR.test(part));
  return (kept.length > 0 ? kept.join(' / ') : String(name || '')).trim();
}

function stripVietnameseAliasesInText(text: string): string {
  // Removes Vietnamese aliases appended after an English function name,
  // e.g. "your matched function (Finance)".
  const separator = ' / ';
  const raw = String(text || '');
  if (raw.indexOf(separator) < 0 || !VIETNAMESE_HINT_CHAR.test(raw)) return raw;
  return raw.replace(/ \/ ([^()/,;.—]*)/g, (match, alias) =>
    VIETNAMESE_HINT_CHAR.test(alias) ? '' : match,
  );
}

function translateFunctionMatchLabel(label: string): string {
  if (!VIETNAMESE_HINT_CHAR.test(label)) return label;
  const track = label.match(/track\s+(.+?)(?:\s+—.*)?$/i);
  if (label.trim().startsWith('✅') && track) {
    return `✅ Opens the ${stripVietnameseAlias(track[1])} track`;
  }
  if (label.trim().startsWith('⚠') && track) {
    return `⚠️ ${stripVietnameseAlias(track[1])} track not listed — confirm on the careers page`;
  }
  if (label.trim().startsWith('—')) return '— No verified track data yet';
  return label;
}

function translateRecommendedFunctionReason(
  reason: string | undefined,
  source: string | undefined,
  mbtiType: string | undefined,
): string | undefined {
  if (!reason || !VIETNAMESE_HINT_CHAR.test(reason)) return reason;
  const mbtiSuffix = mbtiType ? ` ${mbtiType}` : '';
  if (source === 'mbti_and_preference') {
    return `Determined from your MBTI type${mbtiSuffix} combined with the function you picked in the questionnaire — both sources point to the same function.`;
  }
  if (source && source.indexOf('mbti') >= 0) {
    return `Mapped from your MBTI type${mbtiSuffix} — refine it any time by updating your function preference.`;
  }
  if (source && source.indexOf('preference') >= 0) {
    return 'Based on the function you picked yourself in the questionnaire.';
  }
  return 'Computed from your questionnaire answers.';
}

// Normalize a raw questions array (from a ```questions block OR from a live
// assessment_flow_events row) into the GapQuestion contract. `multi`,
// `optional`, and `inputs` are part of the question contract (see the
// get_gap_questions tool) and MUST survive parsing — dropping them silently
// turns every question single-select.
function normalizeGapQuestionList(list: any): GapQuestion[] {
  if (!Array.isArray(list)) return [];
  return list
    .filter((q) => q && typeof q.question === 'string' && Array.isArray(q.options) && q.options.length >= 2)
    .map((q, i) => {
      const inputs: Record<string, string> = {};
      if (q.inputs && typeof q.inputs === 'object' && !Array.isArray(q.inputs)) {
        for (const key of Object.keys(q.inputs)) {
          if (typeof q.inputs[key] === 'string') inputs[key] = q.inputs[key];
        }
      }
      return {
        id: typeof q.id === 'string' ? q.id : `q${i + 1}`,
        label: typeof q.label === 'string' ? q.label : undefined,
        question: stripVietnameseParenthetical(q.question),
        options: q.options.map((o: any) => stripVietnameseParenthetical(String(o))),
        multi: q.multi === true || /select all|all that apply|choose all/i.test(String(q.question)),
        optional: q.optional === true,
        inputs: Object.keys(inputs).length > 0 ? inputs : undefined,
      };
    });
}

// Stable content signature for a question set — used to pair the live
// DB-rendered form with the same set when it (later) arrives as a
// ```questions block, so the candidate only ever sees ONE form per run.
function questionsSignature(questions: GapQuestion[] | null | undefined): string {
  return (questions || []).map((q) => q.id).join('|');
}

function extractQuestionsBlock(text: string): { body: string; questions: GapQuestion[] | null } {
  const match = text.match(/```questions\s*\n([\s\S]*?)```/);
  if (!match || match.index === undefined) return { body: text, questions: null };
  try {
    const parsed = JSON.parse(match[1]);
    const questions = normalizeGapQuestionList(Array.isArray(parsed) ? parsed : parsed?.questions);
    if (questions.length === 0) return { body: text, questions: null };
    return {
      body: (text.slice(0, match.index) + text.slice(match.index + match[0].length)).trim(),
      questions,
    };
  } catch (e) {
    return { body: text, questions: null };
  }
}

// One escape-hatch option ("None of these…", "Not sure yet…") can't combine
// meaningfully with real picks on a multi-select question, so selecting it
// clears the rest — and picking a real option clears it.
function isExclusiveOption(option: string): boolean {
  return /^(none of these|not sure|no preference|honestly not sure|prefer not to say)/i.test(option.trim());
}

// UX fix #1 (real-user feedback): program names in the MCQ popup must not
// display year numbers ("Unilever Management Trainee 2025" reads as stale /
// noisy). DISPLAY-ONLY: the underlying option string — and therefore the
// stored answer and the server-side program matching — keeps the year.
// Handles "… 2026", "… FY26 (Internship)", "… 2026 (Internship)" etc.
function stripProgramYears(label: string): string {
  return label
    .replace(/\s*\bFY\s?\d{2,4}\b/gi, '')
    .replace(/\s*\b20\d{2}\b/g, '')
    .replace(/\(\s*\)/g, '')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

// Year-free display label for the dream-program question; every other
// question renders its options verbatim.
function displayOptionLabel(q: GapQuestion, option: string): string {
  return q.id === 'target_program' ? stripProgramYears(option) : option;
}

// The full gap-fill set as one form. Questions marked `multi: true` accept
// SEVERAL selections (tap a bar again to deselect); options listed in
// `inputs` reveal a typed field when selected (e.g. "Already graduated" →
// type the year); `optional: true` questions never block the submit. One
// submit button sends everything in a single message, formatted exactly the
// way the scoring engine expects: multi answers joined with "; ", typed
// values as "Option — value", skipped optional questions as "(skipped)".
function QuestionsForm({
  questions,
  interactive,
  canSubmit = true,
  sending = false,
  pendingNote,
  pendingButtonLabel,
  prefilledAnswers,
  submitLabel,
  extraSections,
  onProgress,
  onSubmit,
}: {
  questions: GapQuestion[];
  interactive: boolean;
  /** Tapping can stay live while Mate is still finishing its turn — this only gates the final Send. */
  canSubmit?: boolean;
  /**
   * True while the just-submitted answers are still in flight ("sending").
   * Keeps the Send button visible but greyed out + non-clickable with the
   * label "Sending…" so a second tap is impossible; the button leaves the
   * sending state the moment the response lands.
   */
  sending?: boolean;
  /** Footer note shown while everything is answered but Send is still gated (parallel flow: CV analysis in flight). */
  pendingNote?: string;
  /** Send-button label while gated (defaults to 'One moment…'). */
  pendingButtonLabel?: string;
  /**
   * Answers already known from elsewhere (e.g. industry interests derived
   * from the industry pre-filter). Those questions are HIDDEN from the form
   * but count as answered and are still included in the submitted message,
   * so the scoring engine always sees the full answer set.
   */
  prefilledAnswers?: Record<string, string>;
  /** Overrides the Send button label (default 'Send my answers'). */
  submitLabel?: string;
  /**
   * v1.3.1 unified questionnaire: optional extra sections (the corporate-fit
   * + MBTI groups) rendered AFTER the required questions and BEFORE the
   * single submit row, so the whole questionnaire ends in ONE “Send my
   * answers” action. Never gates the submit — the groups are skippable.
   */
  extraSections?: ReactNode;
  /** Reports tap progress upward (e.g. for the floating popup's pill badge). */
  onProgress?: (answered: number, total: number) => void;
  onSubmit: (message: string, answers: Record<string, string>) => void;
}) {
  const [selected, setSelected] = useState<Record<string, string[]>>({});
  const [typed, setTyped] = useState<Record<string, Record<string, string>>>({});
  const [submitted, setSubmitted] = useState(false);
  const locked = !interactive || submitted;
  // UX: right after Send is tapped the button must not stay active-looking
  // (or vanish without feedback) while the submission is processing — it
  // stays visible, greyed out, and reads "Sending…" until the response
  // arrives.
  const showSendingState = submitted && sending;

  const prefilled = prefilledAnswers || {};
  const visibleQuestions = questions.filter((q) => !prefilled[q.id]);

  const picksFor = (qid: string) => selected[qid] || [];
  const typedFor = (qid: string, option: string) => (typed[qid] && typed[qid][option]) || '';

  const toggleOption = (q: GapQuestion, option: string) => {
    if (locked) return;
    setSelected((prev) => {
      const current = prev[q.id] || [];
      const has = current.indexOf(option) >= 0;
      let next: string[];
      if (q.multi) {
        if (has) {
          next = current.filter((o) => o !== option);
        } else if (isExclusiveOption(option)) {
          next = [option];
        } else {
          next = current.filter((o) => !isExclusiveOption(o)).concat(option);
        }
      } else {
        next = has ? [] : [option];
      }
      return { ...prev, [q.id]: next };
    });
  };

  // A question is complete when at least one bar is selected AND every
  // selected bar that reveals a typed field has a value (e.g. the graduation
  // year for "Already graduated").
  const isComplete = (q: GapQuestion) => {
    if (prefilled[q.id]) return true;
    const picks = picksFor(q.id);
    if (picks.length === 0) return false;
    return picks.every((o) => !(q.inputs && q.inputs[o]) || typedFor(q.id, o).trim().length > 0);
  };

  const answeredCount = visibleQuestions.filter(isComplete).length;
  const allAnswered = questions.filter((q) => !q.optional).every(isComplete);
  const visibleTotal = visibleQuestions.length;
  useEffect(() => {
    if (onProgress) onProgress(answeredCount, visibleTotal);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [answeredCount, visibleTotal]);

  const answerFor = (q: GapQuestion) => {
    if (prefilled[q.id]) return prefilled[q.id];
    const picks = picksFor(q.id)
      .slice()
      .sort((x, y) => q.options.indexOf(x) - q.options.indexOf(y));
    if (picks.length === 0) return '(skipped)';
    return picks
      .map((o) => {
        const t = q.inputs && q.inputs[o] ? typedFor(q.id, o).trim() : '';
        return t ? `${o} — ${t}` : o;
      })
      .join('; ');
  };

  const handleSubmit = () => {
    if (!allAnswered || locked || !canSubmit) return;
    const lines = questions.map((q, i) => `${i + 1}. ${q.label || q.question}: ${answerFor(q)}`);
    const answers: Record<string, string> = {};
    questions.forEach((q) => {
      answers[q.id] = answerFor(q);
    });
    setSubmitted(true);
    onSubmit('Here are my answers:\n' + lines.join('\n'), answers);
  };

  return (
    <div className="mt-3 space-y-3">
      <DismissibleHint storageKey="casemate-hint-questions-v1">
        Everything here is tap-to-answer — no typing needed. Some questions let you pick several
        (“select all that apply”), optional ones can be skipped, and a few options open a small
        typed field. Your picks directly shape which programs rank for you, so answer honestly.
      </DismissibleHint>
      {visibleQuestions.map((q, qi) => {
        const picks = picksFor(q.id);
        return (
          <div
            key={q.id}
            className="rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] px-4 py-3.5"
          >
            <p className="text-sm font-semibold text-[var(--space-text-primary)]">
              <span className="mr-1.5 text-[var(--space-text-muted)]">{qi + 1}.</span>
              {q.question}
            </p>
            {(q.multi || q.optional) && (
              <p className="mt-1 text-[11px] font-medium text-[var(--space-text-accent)]">
                {q.multi && q.optional
                  ? 'Select all that apply · optional'
                  : q.multi
                    ? 'Select all that apply — tap again to deselect'
                    : 'Optional — skip if you have no preference'}
              </p>
            )}
            <div className="mt-2.5 space-y-1.5">
              {q.options.map((option) => {
                const isSelected = picks.indexOf(option) >= 0;
                const placeholder = q.inputs ? q.inputs[option] : undefined;
                return (
                  <div key={option}>
                    <button
                      type="button"
                      disabled={locked}
                      onClick={() => toggleOption(q, option)}
                      className={`flex w-full items-center gap-2.5 rounded-xl border px-3.5 py-2.5 text-left text-sm transition ${
                        isSelected
                          ? 'border-[var(--space-brand-primary-600)] bg-[var(--space-surface-accent-soft)] font-medium text-[var(--space-text-primary)] shadow-sm'
                          : locked
                            ? 'cursor-default border-[var(--space-border-default)] bg-[var(--space-surface-muted)] text-[var(--space-text-muted)]'
                            : 'border-[var(--space-border-default)] bg-[var(--space-surface-card)] text-[var(--space-text-secondary)] hover:border-[var(--space-brand-primary-500)] hover:bg-[var(--space-surface-accent-soft)]'
                      }`}
                      data-testid={`question-option-${q.id}-${option.slice(0, 16)}`}
                    >
                      <span
                        className={`flex h-[18px] w-[18px] flex-shrink-0 items-center justify-center border ${
                          q.multi ? 'rounded-[5px]' : 'rounded-full'
                        } ${
                          isSelected
                            ? 'border-[var(--space-brand-primary-600)] bg-[var(--space-brand-primary-600)] text-[var(--space-text-on-primary)]'
                            : 'border-[var(--space-border-strong)] bg-[var(--space-surface-card)]'
                        }`}
                      >
                        {isSelected && <Check className="h-3 w-3" />}
                      </span>
                      <span className="min-w-0 flex-1">{displayOptionLabel(q, option)}</span>
                    </button>
                    {isSelected && placeholder && (
                      <input
                        type="text"
                        value={typedFor(q.id, option)}
                        onChange={(e) =>
                          setTyped((prev) => ({
                            ...prev,
                            [q.id]: { ...(prev[q.id] || {}), [option]: e.target.value },
                          }))
                        }
                        placeholder={placeholder}
                        disabled={locked}
                        className="mt-1.5 w-full rounded-lg border border-[var(--space-brand-primary-200)] bg-[var(--space-surface-card)] px-3 py-2 text-sm text-[var(--space-text-primary)] placeholder:text-[var(--space-text-muted)] focus:border-[var(--space-brand-primary-500)] focus:outline-none"
                        data-testid={`question-input-${q.id}-${option.slice(0, 16)}`}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
      {extraSections}
      {(!locked || showSendingState) && (
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs text-[var(--space-text-muted)]">
            {showSendingState
              ? 'Sending your answers…'
              : allAnswered && !canSubmit
                ? pendingNote || 'All answered — Send unlocks the moment Mate finishes writing…'
                : `${answeredCount} of ${visibleQuestions.length} answered`}
          </p>
          <button
            type="button"
            disabled={showSendingState || !allAnswered || !canSubmit}
            onClick={handleSubmit}
            className={`rounded-full px-5 py-2 text-sm font-semibold transition ${tw.button.primary} disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50`}
            data-testid="button-submit-answers"
          >
            {showSendingState
              ? 'Sending…'
              : allAnswered && !canSubmit
                ? pendingButtonLabel || 'One moment…'
                : submitLabel || 'Send my answers'}
          </button>
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Guided flow (v0.6): dismissible in-context hints + the 3-step indicator.
// One fixed path: Step 1 add your CV → Step 2 quick questions → Step 3 your
// fit + programs. Hints are short, dismissible, and remembered per device.
// ---------------------------------------------------------------------------

function DismissibleHint({ storageKey, children }: { storageKey: string; children: ReactNode }) {
  const [dismissed, setDismissed] = useState<boolean>(() => {
    try {
      return !!localStorage.getItem(storageKey);
    } catch (e) {
      return false;
    }
  });
  if (dismissed) return null;
  return (
    <div
      className="flex items-start gap-2 rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-muted)] px-3 py-2"
      role="note"
    >
      <Info className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-[var(--space-text-accent)]" />
      <p className="min-w-0 flex-1 text-xs leading-5 text-[var(--space-text-secondary)]">{children}</p>
      <button
        type="button"
        aria-label="Dismiss hint"
        onClick={() => {
          setDismissed(true);
          try {
            localStorage.setItem(storageKey, String(Date.now()));
          } catch (e) {
            // Private mode — dismissal lasts for this page load only.
          }
        }}
        className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full text-[var(--space-text-muted)] transition hover:bg-[var(--space-surface-card)] hover:text-[var(--space-text-primary)]"
        data-testid={`button-dismiss-hint-${storageKey}`}
      >
        <X className="h-3 w-3" />
      </button>
    </div>
  );
}

const ASSESSMENT_STEP_HINTS: Record<number, { key: string; text: string }> = {
  1: {
    key: 'casemate-hint-step1-v1',
    text: 'Start with your CV — upload a PDF/Word file, paste the text, or paste a public CV link (Google Docs / Drive). Mate reads it so you never re-type your background. No CV yet? Just say so and Mate asks a few quick taps instead.',
  },
  2: {
    key: 'casemate-hint-step2-v1',
    text: 'Your CV shows what you\u2019ve done — these quick taps tell Mate what you want (interests, work style, your own timeline). Answer in the floating question window — it stays put while you check the side panel and fix anything Mate mis-read.',
  },
  3: {
    key: 'casemate-hint-step3-v1',
    text: 'Mate is scoring all 20 founder-verified programs against your profile — your results card lands right here in seconds.',
  },
  4: {
    key: 'casemate-hint-step4-v1',
    text: 'Your full analysis is right below — Your Direction and your profile-improvement tips (Result Card) in one card. Match % is directional guidance from founder-verified data — not admission odds. Tap any program on the card for a personal “how to get there” plan.',
  },
};

function AssessmentStepBar({ step }: { step: 1 | 2 | 3 | 4 }) {
  const steps = [
    { n: 1 as const, label: 'Add your CV' },
    { n: 2 as const, label: 'Quick questions' },
    { n: 3 as const, label: 'Your fit + programs' },
  ];
  const hint = ASSESSMENT_STEP_HINTS[step];
  return (
    <div
      className="rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] px-3.5 py-2.5 shadow-sm"
      data-testid="assessment-step-bar"
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex min-w-0 flex-1 items-center gap-1.5">
          {steps.map((s, i) => {
            const done = step > s.n;
            const active = step === s.n;
            return (
              <div key={s.n} className="flex min-w-0 items-center gap-1.5">
                {i > 0 && (
                  <div
                    className={`h-px w-3 flex-shrink-0 sm:w-6 ${
                      done || active ? 'bg-[var(--space-brand-primary-500)]' : 'bg-[var(--space-border-strong)]'
                    }`}
                  />
                )}
                <span
                  className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${
                    done
                      ? 'bg-[var(--space-brand-primary-600)] text-[var(--space-text-on-primary)]'
                      : active
                        ? 'border-2 border-[var(--space-brand-primary-600)] bg-[var(--space-surface-card)] text-[var(--space-text-brand)]'
                        : 'border border-[var(--space-border-strong)] bg-[var(--space-surface-muted)] text-[var(--space-text-muted)]'
                  }`}
                >
                  {done ? <Check className="h-3 w-3" /> : s.n}
                </span>
                <span
                  className={`truncate text-xs ${
                    active
                      ? 'font-semibold text-[var(--space-text-primary)]'
                      : done
                        ? 'font-medium text-[var(--space-text-secondary)]'
                        : 'text-[var(--space-text-muted)]'
                  }`}
                >
                  {s.label}
                </span>
              </div>
            );
          })}
        </div>
        <span className="flex-shrink-0 text-[10px] font-semibold uppercase tracking-wide text-[var(--space-text-muted)]">
          {step > 3 ? 'Done ✓' : `Step ${step} of 3`}
        </span>
      </div>
      {hint && (
        <div className="mt-2">
          <DismissibleHint storageKey={hint.key}>{hint.text}</DismissibleHint>
        </div>
      )}
    </div>
  );
}

// Parse helpers for live WorkspaceDB rows (json columns may arrive as strings).
function parseJsonish(value: any): any {
  if (value == null) return null;
  if (typeof value === 'object') return value;
  try {
    return JSON.parse(String(value));
  } catch (e) {
    return null;
  }
}

function parseTimestampMs(value: any): number {
  const t = Date.parse(String(value || ''));
  return Number.isFinite(t) ? t : 0;
}

// --- v1.3 identity (same convention as Desktop.tsx usage_events and
// CultureFitSection): stored MCQ answers are keyed per USER so they follow
// the v1.1 account across devices — 'email:<normalized sign-in email>' when
// signed in, else 'device:<visitor id>'.
function readMcqSignInEmail(): string | null {
  try {
    const w = window as any;
    const candidates: string[] = [];
    const sid = w.__APP_ID__ || w.__SPACE_ID__;
    if (typeof sid === 'string' && sid) candidates.push(`space_session_${sid}`);
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.indexOf('space_session_') === 0 && candidates.indexOf(key) < 0) {
        candidates.push(key);
      }
    }
    for (const key of candidates) {
      const stored = localStorage.getItem(key);
      if (!stored) continue;
      try {
        const parsed = JSON.parse(stored);
        if (parsed && typeof parsed.email === 'string' && parsed.email.includes('@')) {
          return parsed.email.toLowerCase().trim();
        }
      } catch (e) {
        // Not JSON — skip.
      }
    }
  } catch (e) {
    // Storage unavailable — fall back to the device key.
  }
  return null;
}

function readMcqVisitorId(): string {
  try {
    const match = document.cookie.match(/(?:^|;\s*)audos_vid=([^;]+)/);
    if (match && match[1]) return match[1];
  } catch (e) {
    // No cookie access.
  }
  // Same fallback key as CultureFitSection so the device identity is one and
  // the same across features.
  try {
    const KEY = 'casemate-culture-device-id';
    let id = localStorage.getItem(KEY);
    if (!id) {
      id = 'local-' + Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
      localStorage.setItem(KEY, id);
    }
    return id;
  } catch (e) {
    return 'anonymous';
  }
}

function readMcqIdentity(): { userKey: string; email: string | null } {
  const email = readMcqSignInEmail();
  if (email) return { userKey: `email:${email}`, email };
  return { userKey: `device:${readMcqVisitorId()}`, email: null };
}

interface DirectionEntry {
  name: string;
  reason?: string;
}

interface DirectionProgram {
  company: string;
  program: string;
  industry?: string;
  match_percent: number;
  why?: string;
  timeline?: string;
  details_status?: string;
  is_target?: boolean;
  competitiveness?: number;
  // v0.6 scoring-engine fields: what KIND of program this is and whether its
  // (estimated) application window is open now, upcoming, or unverified.
  program_type_label?: string;
  availability?: string;
  availability_status?: string;
  // v0.7 scoring-engine fields: explicit rank in the curated top-5 slate
  // (1 = best match) and a 2-3 sentence profile-grounded fit explanation.
  rank?: number;
  fit_reason?: string;
  // v1.4 scoring-engine fields: a candidate-named target is PINNED above the
  // ranked list (pinned: true, no rank) with an optional honest note (e.g.
  // outside their chosen sector), and every entry quotes the specific resume
  // signals that drove its score.
  pinned?: boolean;
  target_note?: string;
  cv_evidence?: string[];
  // v1.2: verified round-by-round selection process from the founder dataset
  // (only rendered when verified — "details coming soon" boilerplate is skipped).
  rounds?: string;
  // v1.6: does this program verifiably open the candidate's matched function
  // (MBTI × stated preference)? 'open' | 'not_listed' | 'unknown', plus the
  // ready-to-render indicator label straight from the scoring engine.
  function_match_status?: 'open' | 'not_listed' | 'unknown';
  function_match_label?: string;
}

interface DirectionTimelineStep {
  period: string;
  focus: string;
}

interface DirectionData {
  headline?: string;
  industry_fit: DirectionEntry[];
  function_fit: DirectionEntry[];
  programs: DirectionProgram[];
  // Concrete prep target: integer number of practice cases to complete before
  // the top program's estimated application window.
  required_case_count?: number;
  // The candidate's own stated target timeline (e.g. "Within 6 months") —
  // the roadmap is paced to it.
  candidate_timeline?: string;
  // v1.6: the candidate's recommended function — MBTI × stated preference —
  // shown prominently on the card ("Your best-fit function").
  recommended_function?: {
    name: string;
    reason?: string;
    mbti_type?: string;
    source?: string;
  };
  profile_priorities: string[];
  prep_timeline: DirectionTimelineStep[];
}

function normalizePrograms(value: any): DirectionProgram[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => {
      if (!item || typeof item !== 'object') return null;
      const company = typeof item.company === 'string' ? item.company : '';
      const program = typeof item.program === 'string' ? item.program : '';
      if (!company && !program) return null;
      const pct = Number(item.match_percent);
      return {
        company: company || program,
        program,
        industry: typeof item.industry === 'string' ? item.industry : undefined,
        match_percent: Number.isFinite(pct) ? Math.max(0, Math.min(100, Math.round(pct))) : 0,
        why: typeof item.why === 'string' ? stripVietnameseAliasesInText(item.why) : undefined,
        timeline: typeof item.timeline === 'string' ? item.timeline : undefined,
        details_status: typeof item.details_status === 'string' ? item.details_status : undefined,
        is_target: item.is_target === true,
        competitiveness: Number.isFinite(Number(item.competitiveness)) ? Number(item.competitiveness) : undefined,
        program_type_label: typeof item.program_type_label === 'string' ? item.program_type_label : undefined,
        availability: typeof item.availability === 'string' ? item.availability : undefined,
        availability_status: typeof item.availability_status === 'string' ? item.availability_status : undefined,
        rank: Number.isFinite(Number(item.rank)) && Number(item.rank) > 0 ? Math.round(Number(item.rank)) : undefined,
        fit_reason: typeof item.fit_reason === 'string' ? stripVietnameseAliasesInText(item.fit_reason) : undefined,
        rounds: typeof item.rounds === 'string' ? item.rounds : undefined,
        pinned: item.pinned === true,
        target_note: typeof item.target_note === 'string' ? stripVietnameseAliasesInText(item.target_note) : undefined,
        cv_evidence: Array.isArray(item.cv_evidence)
          ? item.cv_evidence
              .filter((v: any) => typeof v === 'string')
              .map((v: string) => stripVietnameseAliasesInText(v))
              .slice(0, 4)
          : undefined,
        function_match_status:
          item.function_match_status === 'open' ||
          item.function_match_status === 'not_listed' ||
          item.function_match_status === 'unknown'
            ? item.function_match_status
            : undefined,
        function_match_label:
          typeof item.function_match_label === 'string'
            ? translateFunctionMatchLabel(item.function_match_label)
            : undefined,
      };
    })
    .filter(Boolean) as DirectionProgram[];
}

function normalizePrepTimeline(value: any): DirectionTimelineStep[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => {
      if (typeof item === 'string') return { period: '', focus: item };
      if (item && typeof item === 'object') {
        const period = typeof item.period === 'string' ? item.period : '';
        const focus = typeof item.focus === 'string' ? item.focus : '';
        if (period || focus) return { period, focus };
      }
      return null;
    })
    .filter(Boolean) as DirectionTimelineStep[];
}

function normalizeRequiredCaseCount(value: any): number | undefined {
  const n = Number(value);
  if (!Number.isFinite(n)) return undefined;
  const count = Math.round(n);
  return count > 0 ? count : undefined;
}

function normalizeDirectionEntries(value: any): DirectionEntry[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => {
      if (typeof item === 'string') return { name: item };
      if (item && typeof item === 'object' && typeof item.name === 'string') {
        return { name: item.name, reason: typeof item.reason === 'string' ? item.reason : undefined };
      }
      return null;
    })
    .filter(Boolean) as DirectionEntry[];
}

// Normalize a raw direction object (from a ```direction block OR straight
// from a saved assessment_results row) into DirectionData. Returns null when
// there is no renderable content.
function normalizeDirectionData(parsed: any): DirectionData | null {
  if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return null;
  const direction: DirectionData = {
    headline: typeof parsed.headline === 'string' ? parsed.headline : undefined,
    industry_fit: normalizeDirectionEntries(parsed.industry_fit),
    function_fit: normalizeDirectionEntries(parsed.function_fit),
    programs: normalizePrograms(parsed.programs),
    required_case_count: normalizeRequiredCaseCount(parsed.required_case_count),
    candidate_timeline:
      typeof parsed.candidate_timeline === 'string'
        ? parsed.candidate_timeline
        : parsed.candidate_timeline &&
            typeof parsed.candidate_timeline === 'object' &&
            typeof parsed.candidate_timeline.target === 'string'
          ? parsed.candidate_timeline.target
          : undefined,
    recommended_function:
      parsed.recommended_function &&
      typeof parsed.recommended_function === 'object' &&
      typeof parsed.recommended_function.name === 'string'
        ? {
            name: stripVietnameseAlias(parsed.recommended_function.name),
            reason: translateRecommendedFunctionReason(
              typeof parsed.recommended_function.reason === 'string'
                ? parsed.recommended_function.reason
                : undefined,
              typeof parsed.recommended_function.source === 'string'
                ? parsed.recommended_function.source
                : undefined,
              typeof parsed.recommended_function.mbti_type === 'string'
                ? parsed.recommended_function.mbti_type
                : undefined,
            ),
            mbti_type:
              typeof parsed.recommended_function.mbti_type === 'string'
                ? parsed.recommended_function.mbti_type
                : undefined,
            source:
              typeof parsed.recommended_function.source === 'string'
                ? parsed.recommended_function.source
                : undefined,
          }
        : undefined,
    profile_priorities: Array.isArray(parsed.profile_priorities)
      ? parsed.profile_priorities.map((p: any) => String(p))
      : [],
    prep_timeline: normalizePrepTimeline(parsed.prep_timeline),
  };
  const hasContent =
    !!direction.headline ||
    direction.industry_fit.length > 0 ||
    direction.function_fit.length > 0 ||
    direction.programs.length > 0 ||
    direction.profile_priorities.length > 0 ||
    direction.prep_timeline.length > 0;
  return hasContent ? direction : null;
}

// Stable content signature for a direction — used to avoid rendering the same
// result twice when it exists both as a saved row and as a ```direction block
// in the transcript (older clients / fallback path). Keyed to the ranked
// program slate (companies + match %) instead of the headline wording, so a
// re-emitted block with a paraphrased headline can never slip past the dedupe
// and put a second copy of the result on screen (founder-reported duplicate).
function directionSignature(direction: DirectionData | null | undefined): string {
  if (!direction) return '';
  const programKey = direction.programs
    .slice(0, 5)
    .map(
      (p) =>
        String(p.company || '').trim().toLowerCase() +
        '~' +
        String(p.program || '').trim().toLowerCase() +
        ':' +
        p.match_percent,
    )
    .join(',');
  if (programKey) return 'programs|' + programKey;
  // Directions with no program list (rare / legacy) fall back to text identity.
  return [
    'text',
    direction.headline || '',
    direction.profile_priorities.length,
    direction.prep_timeline.length,
  ].join('|');
}

function extractDirectionBlock(text: string): {
  before: string;
  direction: DirectionData | null;
  after: string;
} {
  const match = text.match(/```direction\s*\n([\s\S]*?)```/);
  if (!match || match.index === undefined) return { before: text, direction: null, after: '' };
  try {
    const direction = normalizeDirectionData(JSON.parse(match[1]));
    if (!direction) return { before: text, direction: null, after: '' };
    return {
      before: text.slice(0, match.index).trim(),
      direction,
      after: text.slice(match.index + match[0].length).trim(),
    };
  } catch (e) {
    return { before: text, direction: null, after: '' };
  }
}

// While the agent is still streaming a structured block, hide the raw fence
// and show a small "preparing…" indicator instead of half-rendered JSON.
function cutStreamingBlocks(text: string): { text: string; pendingLabel: string | null } {
  const candidates = [
    { idx: text.indexOf('```options'), label: 'Preparing quick answers…' },
    { idx: text.indexOf('```questions'), label: 'Preparing your questions…' },
    { idx: text.indexOf('```cvprofile'), label: 'Preparing your CV preview…' },
    { idx: text.indexOf('```direction'), label: 'Putting your direction together…' },
  ].filter((c) => c.idx >= 0);
  if (candidates.length === 0) return { text, pendingLabel: null };
  const first = candidates.sort((a, b) => a.idx - b.idx)[0];
  return { text: text.slice(0, first.idx).trimEnd(), pendingLabel: first.label };
}

/* ----------------------------------------------------------------------------
 * Clickable certificate names (learn-more chips).
 *
 * Certificate recommendations in priorities / gaps / action steps name real,
 * widely recognized certificates. This small library makes each name
 * CLICKABLE: tapping opens a compact learn-more popover (what it is, who it's
 * for, where to get it) with an outbound link. The list is intentionally
 * tight — only certificates the scoring engine actually recommends.
 * --------------------------------------------------------------------------*/
type CertificateScope = 'finance' | 'marketing' | 'operations' | 'data-tech' | 'sales' | 'hr' | 'project-consulting' | 'english';

type CertificateDefinition = {
  match: RegExp;
  name: string;
  what: string;
  who: string;
  url: string;
  source: string;
  scopes: CertificateScope[];
};

const CERT_LIBRARY: CertificateDefinition[] = [
  { match: /CFA Level 1|CFA L1|\bCFA\b/i, name: 'CFA Level 1', what: 'The first level of the Chartered Financial Analyst program — the global standard credential for investment and financial analysis.', who: 'Finance-track candidates (banking, FP&A, investment).', url: 'https://www.cfainstitute.org/programs/cfa-program', source: 'cfainstitute.org', scopes: ['finance'] },
  { match: /\bFMVA\b/i, name: 'FMVA', what: 'Financial Modeling & Valuation Analyst — a hands-on Excel financial-modeling certificate by CFI, faster to earn than CFA.', who: 'Finance / FP&A candidates who want a practical modeling credential.', url: 'https://corporatefinanceinstitute.com/certifications/fmva-certification-program/', source: 'corporatefinanceinstitute.com', scopes: ['finance'] },
  { match: /\bACCA\b/i, name: 'ACCA', what: 'The Association of Chartered Certified Accountants qualification — a global accounting credential recognized by every Big-4 firm.', who: 'Accounting / audit / finance candidates, especially Big-4 aimed.', url: 'https://www.accaglobal.com/gb/en/qualifications/glance/acca/overview.html', source: 'accaglobal.com', scopes: ['finance'] },
  { match: /\bCPA\b/i, name: 'CPA', what: 'A professional accountancy qualification focused on financial reporting, assurance, regulation, and business practice.', who: 'Accounting, audit, and finance candidates.', url: 'https://www.aicpa-cima.com/certifications/article/learn-what-to-study-for-the-cpa-exam', source: 'aicpa-cima.com', scopes: ['finance'] },
  { match: /\bFRM\b/i, name: 'FRM', what: 'Financial Risk Manager — a globally recognized credential for financial-risk analysis and management.', who: 'Banking, risk, treasury, and investment candidates.', url: 'https://www.garp.org/frm', source: 'garp.org', scopes: ['finance'] },
  { match: /\bIELTS\b/i, name: 'IELTS', what: 'The International English Language Testing System — widely recognized evidence of English proficiency.', who: 'Candidates whose strongly matched verified program calls for English proficiency and who lack current proof.', url: 'https://ielts.org', source: 'ielts.org', scopes: ['english'] },
  { match: /\bTOEIC\b/i, name: 'TOEIC', what: 'The Test of English for International Communication — a workplace-English credential widely used by Vietnamese employers.', who: 'Candidates whose strongly matched verified program calls for English proficiency and who lack current proof.', url: 'https://www.ets.org/toeic.html', source: 'ets.org', scopes: ['english'] },
  { match: /Google Digital Marketing( & | and )E-?commerce( Professional)? (Certificate|certificate)/i, name: 'Google Digital Marketing & E-commerce Professional Certificate', what: 'A beginner-friendly professional certificate covering campaigns, analytics, and e-commerce fundamentals.', who: 'Marketing, Brand, and Digital Marketing candidates.', url: 'https://www.coursera.org/professional-certificates/google-digital-marketing-ecommerce', source: 'coursera.org', scopes: ['marketing'] },
  { match: /Google Analytics Certification|Google Analytics certificate/i, name: 'Google Analytics Certification', what: 'Google’s credential for using Analytics to understand customer journeys and campaign performance.', who: 'Marketing, e-commerce, and consumer-insights candidates.', url: 'https://skillshop.withgoogle.com/', source: 'skillshop.withgoogle.com', scopes: ['marketing'] },
  { match: /Meta Blueprint/i, name: 'Meta Blueprint', what: 'Meta’s official certification path for Facebook and Instagram advertising.', who: 'Digital and performance-marketing candidates.', url: 'https://www.facebook.com/business/learn/certification', source: 'facebook.com/business', scopes: ['marketing'] },
  { match: /ASCM\/?APICS CPIM|APICS CPIM|\bCPIM\b/i, name: 'ASCM/APICS CPIM', what: 'Certified in Planning and Inventory Management — a recognized credential for production, inventory, and operations planning.', who: 'Supply Chain, Manufacturing, and Operations candidates.', url: 'https://www.ascm.org/learning-development/certifications-credentials/cpim/', source: 'ascm.org', scopes: ['operations'] },
  { match: /ASCM\/?APICS CSCP|APICS CSCP|\bCSCP\b/i, name: 'ASCM/APICS CSCP', what: 'Certified Supply Chain Professional — a recognized end-to-end supply-chain credential.', who: 'Supply Chain, Logistics, and Procurement candidates.', url: 'https://www.ascm.org/learning-development/certifications-credentials/cscp/', source: 'ascm.org', scopes: ['operations'] },
  { match: /Lean Six Sigma(?: Yellow Belt)?|Six Sigma/i, name: 'Lean Six Sigma', what: 'A process-improvement credential focused on reducing defects, waste, and variation.', who: 'Operations, Supply Chain, Quality, and process-improvement candidates.', url: 'https://www.sixsigmacouncil.org/six-sigma-yellow-belt-certification/', source: 'sixsigmacouncil.org', scopes: ['operations', 'project-consulting'] },
  { match: /Google Data Analytics( Professional)? (Certificate|certificate)/i, name: 'Google Data Analytics Professional Certificate', what: 'A hands-on professional certificate covering spreadsheets, SQL, dashboards, and practical analysis.', who: 'Data, Analytics, and Business Intelligence candidates.', url: 'https://www.coursera.org/professional-certificates/google-data-analytics', source: 'coursera.org', scopes: ['data-tech'] },
  { match: /Microsoft Power BI Data Analyst Associate|PL-300/i, name: 'Microsoft Power BI Data Analyst Associate', what: 'Microsoft’s credential for preparing, modeling, visualizing, and analyzing data in Power BI.', who: 'Data, Analytics, and Business Intelligence candidates.', url: 'https://learn.microsoft.com/credentials/certifications/power-bi-data-analyst-associate/', source: 'learn.microsoft.com', scopes: ['data-tech'] },
  { match: /IBM Data Science( Professional)? (Certificate|certificate)/i, name: 'IBM Data Science Professional Certificate', what: 'A practical data-science certificate covering Python, SQL, analysis, visualization, and machine learning.', who: 'Data, Analytics, and Technology candidates.', url: 'https://www.coursera.org/professional-certificates/ibm-data-science', source: 'coursera.org', scopes: ['data-tech'] },
  { match: /Python Institute PCEP|\bPCEP\b/i, name: 'Python Institute PCEP', what: 'An entry-level Python credential covering core programming concepts and syntax.', who: 'Data and Technology candidates building verified Python fundamentals.', url: 'https://pythoninstitute.org/pcep', source: 'pythoninstitute.org', scopes: ['data-tech'] },
  { match: /HubSpot Sales Software Certification/i, name: 'HubSpot Sales Software Certification', what: 'A practical credential for CRM workflows, prospecting, pipeline management, and sales reporting.', who: 'Sales, Commercial, Customer Development, and CRM candidates.', url: 'https://academy.hubspot.com/courses/hubspot-sales-software', source: 'academy.hubspot.com', scopes: ['sales'] },
  { match: /\bSHRM-CP\b/i, name: 'SHRM-CP', what: 'A recognized HR credential covering behavioral and technical competencies for people practice.', who: 'Human Resources, People, and Talent candidates.', url: 'https://www.shrm.org/credentials/certification/shrm-cp', source: 'shrm.org', scopes: ['hr'] },
  { match: /CIPD Foundation Certificate(?: in People Practice)?/i, name: 'CIPD Foundation Certificate in People Practice', what: 'A foundation qualification covering core people-practice and organizational skills.', who: 'Human Resources, People, and Talent candidates.', url: 'https://www.cipd.org/en/learning/qualifications/foundation/', source: 'cipd.org', scopes: ['hr'] },
  { match: /\bCAPM\b/i, name: 'CAPM', what: 'Certified Associate in Project Management — an entry credential for project planning, delivery, and governance.', who: 'Project Management and consulting-delivery candidates.', url: 'https://www.pmi.org/certifications/certified-associate-capm', source: 'pmi.org', scopes: ['project-consulting'] },
  { match: /L['’]?Oréal Brandstorm|Brandstorm/i, name: 'L’Oréal Brandstorm', what: 'L’Oréal’s global innovation competition for students — a verified plus for the SEEDZ program and a strong beauty/FMCG signal.', who: 'Students aiming at Marketing, Brand, Beauty, or consumer-innovation paths.', url: 'https://brandstorm.loreal.com', source: 'brandstorm.loreal.com', scopes: ['marketing'] },
];

const CERTIFICATE_SCOPE_PATTERNS: Record<Exclude<CertificateScope, 'english'>, RegExp> = {
  finance: /financ|account|bank|invest|audit|tax|treasur|risk|fintech|insurance/i,
  marketing: /market|brand|consumer insight|digital marketing|e-?commerce/i,
  operations: /supply|operat|logisti|manufactur|procure|quality|process improvement/i,
  'data-tech': /data|analytic|tech|software|engineer|business intelligence|\bbi\b/i,
  sales: /sale|commercial|customer development|business development|\bcrm\b|trade marketing|retail/i,
  hr: /human resources|\bhr\b|people|talent/i,
  'project-consulting': /project management|consult|delivery/i,
};

function matchedCertificateScopeName(direction: DirectionData, scope: Exclude<CertificateScope, 'english'>): string | null {
  const entry = [...(direction.function_fit || []), ...(direction.industry_fit || [])]
    .find((item) => CERTIFICATE_SCOPE_PATTERNS[scope].test(String(item.name || '')));
  return entry ? String(entry.name) : null;
}

function scopeCertificateRecommendations(items: string[], direction: DirectionData): string[] {
  return items.reduce<string[]>((kept, rawItem) => {
    const item = String(rawItem || '');
    const mentioned = CERT_LIBRARY.filter((cert) => cert.match.test(item));
    if (mentioned.length === 0) {
      kept.push(item);
      return kept;
    }

    const traces: string[] = [];
    const relevant = mentioned.every((cert) => cert.scopes.some((scope) => {
      if (scope === 'english') {
        return /verified (program|requirement)|program.+English proficiency|English proficiency.+program/i.test(item);
      }
      const matchedName = matchedCertificateScopeName(direction, scope);
      if (matchedName) traces.push(matchedName);
      return Boolean(matchedName);
    }));

    // Fail closed: a certificate with no selected/matched function, industry,
    // or explicit verified-program trace is omitted from the rendered result.
    if (!relevant) return kept;
    const uniqueTraces = Array.from(new Set(traces));
    if (uniqueTraces.length > 0 && !uniqueTraces.some((trace) => item.toLowerCase().includes(trace.toLowerCase()))) {
      kept.push(`${item} — relevant to your selected/matched ${uniqueTraces[0]} direction.`);
    } else {
      kept.push(item);
    }
    return kept;
  }, []);
}

function CertChip({ cert, label }: { cert: (typeof CERT_LIBRARY)[number]; label: string }) {
  const [open, setOpen] = useState(false);
  return (
    <span className="relative inline">
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setOpen((v) => !v);
        }}
        onBlur={() => setTimeout(() => setOpen(false), 200)}
        className="inline-flex items-baseline gap-0.5 rounded font-semibold text-[var(--space-text-brand)] underline decoration-dotted underline-offset-2 hover:text-[var(--space-brand-primary-700)]"
        title={`Learn more about ${cert.name}`}
        data-testid={`cert-chip-${cert.name.slice(0, 16)}`}
      >
        {label}
        <Award className="h-3 w-3 self-center" />
      </button>
      {open && (
        <span className="absolute left-0 top-full z-50 mt-1 block w-64 rounded-xl border border-[var(--space-border-strong)] bg-[var(--space-surface-card)] p-3 text-left shadow-lg">
          <span className="block text-xs font-bold text-[var(--space-text-primary)]">{cert.name}</span>
          <span className="mt-1 block text-[11px] font-normal leading-4 text-[var(--space-text-secondary)]">{cert.what}</span>
          <span className="mt-1.5 block text-[10px] font-bold uppercase tracking-wider text-[var(--space-text-muted)]">Who it's for</span>
          <span className="block text-[11px] font-normal leading-4 text-[var(--space-text-secondary)]">{cert.who}</span>
          <a
            href={cert.url}
            target="_blank"
            rel="noreferrer"
            className="mt-1.5 inline-flex items-center gap-1 text-[11px] font-semibold text-[var(--space-text-brand)] underline"
            onMouseDown={(e) => e.preventDefault()}
          >
            Get it at {cert.source} <ExternalLink className="h-3 w-3" />
          </a>
        </span>
      )}
    </span>
  );
}

// Renders plain text with every known certificate name turned into a
// clickable learn-more chip. Non-matching text passes through untouched.
function TextWithCertLinks({ text }: { text: string }) {
  const segments: Array<string | { cert: (typeof CERT_LIBRARY)[number]; label: string }> = [];
  let rest = String(text || '');
  let guard = 0;
  while (rest && guard < 12) {
    guard += 1;
    let earliest: { idx: number; len: number; cert: (typeof CERT_LIBRARY)[number] } | null = null;
    for (const cert of CERT_LIBRARY) {
      const m = rest.match(cert.match);
      if (m && m.index !== undefined && (earliest === null || m.index < earliest.idx)) {
        earliest = { idx: m.index, len: m[0].length, cert };
      }
    }
    if (!earliest) break;
    if (earliest.idx > 0) segments.push(rest.slice(0, earliest.idx));
    segments.push({ cert: earliest.cert, label: rest.slice(earliest.idx, earliest.idx + earliest.len) });
    rest = rest.slice(earliest.idx + earliest.len);
  }
  if (rest) segments.push(rest);
  if (segments.length === 1 && typeof segments[0] === 'string') return <>{text}</>;
  return (
    <>
      {segments.map((seg, i) =>
        typeof seg === 'string' ? <span key={i}>{seg}</span> : <CertChip key={i} cert={seg.cert} label={seg.label} />,
      )}
    </>
  );
}

// v1.3 inline culture fit: map a matched program's company name to a
// founder-verified culture profile (Unilever / Maersk / Techcombank).
// Name-based containment on the slug and display name — program rows carry
// e.g. "Unilever Vietnam". No match = no culture data (never fabricated).
function findCultureCompany(programCompany: string, companies: CompanyProfile[]): CompanyProfile | null {
  const name = String(programCompany || '').toLowerCase();
  if (!name) return null;
  return (
    companies.find(
      (c) => name.indexOf(c.slug.toLowerCase()) >= 0 || name.indexOf(c.company.toLowerCase()) >= 0,
    ) || null
  );
}

// What DirectionCard needs to render culture/job fit INLINE per program: the
// user's saved corporate-fit + MBTI payloads (null = not answered yet) and
// the founder-verified company profiles.
interface CultureFitInline {
  corporate: CorporatePayload | null;
  mbti: MbtiPayload | null;
  companies: CompanyProfile[];
}

function DirectionCard({
  data,
  onOpenProgram,
  cultureFit,
  appetite,
  intel,
}: {
  data: DirectionData;
  onOpenProgram?: (program: DirectionProgram) => void;
  /** v1.3: when provided, each program row shows its culture-fit state inline plus a compact MBTI read. */
  cultureFit?: CultureFitInline;
  /**
   * Competitive appetite from the questionnaire’s “Competitive ambition” section —
   * tunes the display ORDER of the ranked programs and shows the summary
   * banner. Null/absent (legacy results) = original order, no banner.
   */
  appetite?: CompetitiveAppetite | null;
  /**
   * Social-listening company intelligence (newest company_intelligence record
   * per company). Optional — programs without a record render exactly as
   * before (graceful fallback), and the intel never changes the match %.
   */
  intel?: CompanyIntelRecord[];
}) {
  const scopedProfilePriorities = scopeCertificateRecommendations(data.profile_priorities, data);
  // Section 2 ("Result Card" — profile-improvement advice) only renders when
  // the direction actually carries advice content.
  const hasResultCardSection =
    (typeof data.required_case_count === 'number' && data.required_case_count > 0) ||
    scopedProfilePriorities.length > 0 ||
    data.prep_timeline.length > 0;
  // Top-5 slate: new assessments return at most 5 ranked, qualifying programs;
  // older saved results may still carry the full 20-program list, so cap the
  // display at the 5 best-ranked.
  const basePrograms = data.programs.slice(0, 5);
  // Competitive-appetite reorder (applied AFTER fit scoring + sector
  // filtering, display-only — the fit % itself is untouched): pinned targets
  // stay on top; the ranked programs re-sort by fit DESC with the
  // appetite-specific competitive-score tie-break
  // (lib/competitiveScores.sortProgramsByAppetite). Programs with no
  // competitive score (N/A) keep their original position. No appetite
  // recorded (legacy results) → order preserved exactly as returned.
  const isPinnedProgram = (p: DirectionProgram) =>
    p.pinned === true || (p.is_target === true && p.rank == null);
  const displayPrograms = appetite
    ? [
        ...basePrograms.filter(isPinnedProgram),
        ...sortProgramsByAppetite(
          basePrograms.filter((p) => !isPinnedProgram(p)),
          appetite,
          (p) => Number(p.match_percent) || 0,
          (p) => {
            const resolved = findCompetitiveScore(p.company, p.program);
            return resolved ? resolved.score : null;
          },
        ),
      ]
    : basePrograms;

  return (
    <div className="my-3 overflow-hidden rounded-2xl border border-[var(--space-border-strong)] bg-[var(--space-surface-card)] shadow-sm">
      <div className="border-b border-[var(--space-border-default)] bg-[var(--space-surface-accent-soft)] px-5 py-4">
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--space-text-accent)]">
          Your analysis
        </p>
        {data.headline && (
          <h3 className="mt-1 text-lg font-bold leading-snug text-[var(--space-text-primary)]">{data.headline}</h3>
        )}
        {data.candidate_timeline && (
          <p className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-[var(--space-surface-card)] px-2.5 py-1 text-[11px] font-semibold text-[var(--space-text-accent)]">
            <CalendarClock className="h-3 w-3" />
            Built around your target: {data.candidate_timeline}
          </p>
        )}
      </div>
      <div className="px-5 pt-3">
        <DismissibleHint storageKey="casemate-hint-results-v1">
          How to read this: match % compares your profile and stated interests against each
          program’s founder-verified criteria — directional guidance, not admission odds. Tap any
          program for your personal “how to get there” plan. Fields reading “details coming soon”
          aren’t verified yet — they are never guessed.
        </DismissibleHint>
      </div>
      {/* Unified analysis output (merged Result Card + Your Direction fix):
          ONE card, TWO identically styled sections, both generated by the SAME
          run_fit_assessment pass and rendered together. Section 1 owns the
          matches (recommended function, industry/function fit, ranked programs
          with match % and function availability); Section 2 owns the
          profile-improvement advice (prep target, priorities, prep timeline).
          No data point repeats across the two sections. */}
      <div
        className="mt-3 border-y border-[var(--space-border-default)] bg-[var(--space-surface-muted)] px-5 py-2.5"
        data-testid="section-your-direction"
      >
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--space-text-accent)]">
          1 · Your Direction
        </p>
        <p className="mt-0.5 text-[11px] leading-4 text-[var(--space-text-secondary)]">
          Your best-fit function, your industry fit, and your top programs ranked for you (match %).
        </p>
      </div>
      <div className="space-y-4 px-5 py-4">
        {/* v1.6: the recommended function (MBTI × stated preference) leads the
            direction section — "Your best-fit function" — with an honest
            source note straight from the scoring engine. */}
        {data.recommended_function && data.recommended_function.name && (
          <div
            className="rounded-xl border border-[var(--space-brand-primary-200)] bg-[var(--space-surface-card)] px-3.5 py-2.5"
            data-testid="direction-recommended-function"
          >
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--space-text-muted)]">
              Your best-fit function
            </p>
            <p className="mt-1 flex flex-wrap items-center gap-2 text-sm font-bold text-[var(--space-text-primary)]">
              {data.recommended_function.name}
              {data.recommended_function.mbti_type && (
                <span className="rounded-md bg-[var(--space-brand-primary-600)] px-1.5 py-0.5 text-[10px] font-bold tracking-widest text-[var(--space-text-on-primary)]">
                  MBTI {data.recommended_function.mbti_type}
                </span>
              )}
            </p>
            {data.recommended_function.reason && (
              <p className="mt-1 text-[11px] leading-4 text-[var(--space-text-secondary)]">
                {data.recommended_function.reason}
              </p>
            )}
          </div>
        )}
        {data.industry_fit.length > 0 && (
          <div>
            <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[var(--space-text-muted)]">
              <Building2 className="h-3.5 w-3.5" /> Industry fit
            </p>
            <div className="mt-2 space-y-2">
              {data.industry_fit.map((item, i) => (
                <div key={i} className="rounded-xl bg-[var(--space-surface-muted)] px-3.5 py-2.5">
                  {/* UX fix #7: the explanatory note under each fit label was
                      removed — it added clutter without value. The label (and
                      any match data elsewhere on the card) stays intact. */}
                  <p className="text-sm font-semibold text-[var(--space-text-primary)]">{item.name}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        {data.function_fit.length > 0 && (
          <div>
            <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[var(--space-text-muted)]">
              <Target className="h-3.5 w-3.5" /> Function fit
            </p>
            <div className="mt-2 space-y-2">
              {data.function_fit.map((item, i) => (
                <div key={i} className="rounded-xl bg-[var(--space-surface-muted)] px-3.5 py-2.5">
                  {/* UX fix #7: the explanatory note under each fit label was
                      removed — it added clutter without value. The label (and
                      any match data elsewhere on the card) stays intact. */}
                  <p className="text-sm font-semibold text-[var(--space-text-primary)]">{item.name}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        {/* Competitive-appetite summary banner — one personalized line above
            the program list explaining how the results are ordered. */}
        {appetite && displayPrograms.length > 0 && (
          <div
            className="rounded-xl border border-[var(--space-brand-primary-200)] bg-[var(--space-surface-accent-soft)] px-3.5 py-2.5"
            data-testid="direction-appetite-banner"
          >
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--space-text-muted)]">
              Competitive ambition: {APPETITE_LABELS_VI[appetite]}
            </p>
            <p className="mt-1 text-xs leading-5 text-[var(--space-text-secondary)]">
              {APPETITE_SUMMARY_VI[appetite]}
            </p>
          </div>
        )}
        {displayPrograms.length > 0 && (
          <div>
            <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[var(--space-text-muted)]">
              <BarChart3 className="h-3.5 w-3.5" />
              {(() => {
                const pinnedCount = displayPrograms.filter((p) => p.pinned === true || (p.is_target === true && p.rank == null)).length;
                const rankedCount = displayPrograms.length - pinnedCount;
                if (pinnedCount > 0) {
                  return rankedCount > 0
                    ? `Your target + your top ${rankedCount} best fit${rankedCount === 1 ? '' : 's'}`
                    : 'Your target program';
                }
                return displayPrograms.length > 1 ? `Your top ${displayPrograms.length} programs — ranked for you` : 'Your best-fit program';
              })()}
            </p>
            {displayPrograms.length > 1 && (
              <p className="mt-1 text-[11px] leading-4 text-[var(--space-text-secondary)]">
                #1 is your strongest match — each one comes with why it made your list.
              </p>
            )}
            {onOpenProgram && (
              <p className="mt-1 text-[11px] leading-4 text-[var(--space-text-accent)]">
                Tap any program for your personal “how to get there” plan — why it fits, gaps to close, and action steps.
              </p>
            )}
            <div className="mt-2 space-y-2.5">
              {displayPrograms.map((item, i) => {
                // v1.4: a pinned target (no rank) sits ABOVE the ranked list —
                // it shows a target chip instead of a rank number and never
                // takes the “Best match” badge; the ranked rows number from #1.
                const isPinnedTarget = item.pinned === true || (item.is_target === true && item.rank == null);
                const pinnedBefore = displayPrograms
                  .slice(0, i)
                  .filter((p) => p.pinned === true || (p.is_target === true && p.rank == null)).length;
                // With an appetite reorder active the engine's stored rank
                // numbers may no longer match the display order — number by
                // position instead so #1…#5 always read top-to-bottom.
                const rankNumber = appetite
                  ? i + 1 - pinnedBefore
                  : item.rank != null
                    ? item.rank
                    : i + 1 - pinnedBefore;
                const isBest = !isPinnedTarget && !item.is_target && rankNumber === 1;
                // Program deadline countdown — computed at RENDER TIME from the
                // founder-verified timeline record (lib/programTimelines), so
                // "X days left" refreshes with today's date. Dates are never
                // inferred client-side: no verified close date → honest fallback.
                const timelineRecord = findProgramTimeline(item.company, item.program);
                const deadline = deadlineStatus(timelineRecord);
                // v1.3 inline culture fit for this row — only companies with
                // a founder-verified OCP profile ever get a %.
                const cultureCompany = cultureFit
                  ? findCultureCompany(item.company, cultureFit.companies)
                  : null;
                const cultureResult =
                  cultureCompany && cultureFit && cultureFit.corporate
                    ? (cultureFit.corporate.results || []).find((r) => r.slug === cultureCompany.slug) || null
                    : null;
                // v1.8 (VN-evidence display weighting): verified rewards &
                // development-path facts for this program, mirrored from the
                // founder dataset (lib/programRewards). Null fields render an
                // honest "being verified" line — never an invented figure.
                const rewardsInfo = findProgramRewards(item.company, item.program);
                // Competitive Score (0–100): how hard this program is to get
                // into — looked up by program name from the single config in
                // lib/competitiveScores.ts (never hardcoded elsewhere). A
                // program with no entry honestly reads N/A and never joins
                // the appetite reorder. The score never changes the fit %.
                // Community intel (social-listening pipeline): the newest
                // company_intelligence record for this program's company —
                // null = the pipeline hasn't covered it yet, so nothing
                // renders and behavior is exactly the pre-intel card.
                const intelRecord = findCompanyIntel(item.company, intel);
                const intelCompat = computeIntelCultureCompatibility(
                  intelRecord,
                  cultureFit && cultureFit.mbti ? cultureFit.mbti.type : null,
                  cultureFit && cultureFit.corporate ? cultureFit.corporate.preferences : null,
                );
                const competitive = findCompetitiveScore(item.company, item.program);
                const competitiveColor = competitive ? competitiveBarColor(competitive.score) : '#9CA3AF';
                const competitiveLabelColor = competitive ? competitiveTextColor(competitive.score) : '#6B7280';
                const quadrant = competitive ? getQuadrantLabel(item.match_percent, competitive.score) : null;
                const quadrantStyle = !quadrant
                  ? undefined
                  : quadrant.label === 'Sweet Spot'
                    ? { backgroundColor: '#DCFCE7', color: '#166534' }
                    : quadrant.label === 'Stretch Target'
                      ? { backgroundColor: '#FFEDD5', color: '#9A3412' }
                      : quadrant.label === 'Reconsider'
                        ? { backgroundColor: '#FEF9C3', color: '#854D0E' }
                        : { backgroundColor: '#FEE2E2', color: '#B91C1C' };
                const cardInner = (
                  <>
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex min-w-0 items-start gap-2.5">
                        <span
                          className={`mt-0.5 flex h-5 min-w-[1.75rem] flex-shrink-0 items-center justify-center rounded-full px-1 text-[10px] font-bold ${
                            isPinnedTarget
                              ? 'bg-[var(--space-brand-highlight-600)] text-[var(--space-text-on-highlight)]'
                              : rankNumber === 1
                                ? 'bg-[var(--space-brand-primary-600)] text-[var(--space-text-on-primary)]'
                                : 'bg-[var(--space-surface-card)] text-[var(--space-text-muted)]'
                          }`}
                        >
                          {isPinnedTarget ? <Target className="h-3 w-3" /> : <>#{rankNumber}</>}
                        </span>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-[var(--space-text-primary)]">{item.company}</p>
                          {item.program && (
                            <p className="text-xs text-[var(--space-text-secondary)]">{item.program}</p>
                          )}
                          {(item.is_target || isBest || item.program_type_label || item.details_status === 'coming_soon') && (
                            <div className="mt-1 flex flex-wrap gap-1">
                              {item.is_target && (
                                <span className="rounded-full bg-[var(--space-brand-highlight-600)] px-2 py-0.5 text-[10px] font-bold text-[var(--space-text-on-highlight)]">Your target</span>
                              )}
                              {isBest && (
                                <span className="rounded-full bg-[var(--space-brand-primary-600)] px-2 py-0.5 text-[10px] font-bold text-[var(--space-text-on-primary)]">Best match</span>
                              )}
                              {item.program_type_label && (
                                <span className="rounded-full border border-[var(--space-border-strong)] bg-[var(--space-surface-card)] px-2 py-0.5 text-[10px] font-semibold text-[var(--space-text-secondary)]">{item.program_type_label}</span>
                              )}
                              {item.details_status === 'coming_soon' && (
                                <span className="rounded-full bg-[var(--space-surface-card)] px-2 py-0.5 text-[10px] font-medium text-[var(--space-text-muted)]">Details coming soon</span>
                              )}
                            </div>
                          )}
                          {item.target_note && (
                            <p
                              className="mt-1.5 rounded-md border border-[color-mix(in_srgb,var(--space-semantic-warning)_45%,transparent)] bg-[color-mix(in_srgb,var(--space-semantic-warning)_8%,transparent)] px-2 py-1.5 text-[11px] leading-4 text-[var(--space-text-secondary)]"
                              data-testid={`program-target-note-${i}`}
                            >
                              {item.target_note}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-shrink-0 flex-col items-end gap-1">
                        <span className="rounded-full bg-[var(--space-brand-primary-600)] px-2.5 py-1 text-xs font-bold text-[var(--space-text-on-primary)]">
                          {item.match_percent}% match
                        </span>
                        {/* v1.8: supporting badge, deliberately quieter than
                            the match % pill — culture is the differentiator,
                            not the headline reason (VN evidence review). */}
                        {cultureResult && (
                          <span
                            className="rounded-full border border-[var(--space-border-default)] bg-[var(--space-surface-card)] px-2.5 py-1 text-[11px] font-semibold text-[var(--space-text-secondary)]"
                            data-testid={`program-culture-pill-${i}`}
                          >
                            Culture fit {cultureResult.fit}%
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-[var(--space-brand-primary-100)]">
                      <div
                        className="h-full rounded-full bg-[var(--space-brand-primary-600)]"
                        style={{ width: `${item.match_percent}%` }}
                      />
                    </div>
                    {/* Competitive Score — how hard this program is to get
                        into (0–100). Scores live in lib/competitiveScores.ts;
                        a program with no entry honestly reads N/A. */}
                    <div className="mt-2.5" data-testid={`program-competitive-${i}`}>
                      <div className="flex flex-wrap items-center justify-between gap-x-2 gap-y-1">
                        <p className="text-[11px] font-semibold leading-4 text-[var(--space-text-secondary)]" title="Competitive Score">
                          Competition Level
                          <span className="ml-1 font-normal text-[var(--space-text-muted)]">(Competitive Score)</span>
                        </p>
                        {competitive ? (
                          <p className="flex items-center gap-1.5">
                            <span className="text-[11px] font-bold text-[var(--space-text-primary)]">{competitive.score}/100</span>
                            <span
                              className="rounded-full px-2 py-0.5 text-[10px] font-bold"
                              style={{ backgroundColor: `${competitiveColor}26`, color: competitiveLabelColor }}
                              data-testid={`program-competitive-tier-${i}`}
                            >
                              {tierLabelVI(competitive.tier)}
                            </span>
                          </p>
                        ) : (
                          <p className="flex items-center gap-1.5">
                            <span className="text-[11px] font-bold text-[var(--space-text-muted)]">N/A</span>
                            <span
                              className="rounded-full bg-[var(--space-surface-card)] px-2 py-0.5 text-[10px] font-semibold text-[var(--space-text-muted)]"
                              data-testid={`program-competitive-tier-${i}`}
                            >
                              No Data Yet
                            </span>
                          </p>
                        )}
                      </div>
                      <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-[var(--space-border-default)]">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: competitive ? `${Math.max(0, Math.min(100, competitive.score))}%` : '0%',
                            backgroundColor: competitiveColor,
                          }}
                        />
                      </div>
                    </div>
                    {/* Quadrant read — fit × competition in one highlighted line. */}
                    {quadrant && quadrantStyle && (
                      <p
                        className="mt-2 rounded-lg px-2.5 py-1.5 text-[11px] font-semibold leading-4"
                        style={quadrantStyle}
                        data-testid={`program-quadrant-${i}`}
                      >
                        {quadrant.emoji} {quadrant.label} — {quadrant.description}
                      </p>
                    )}
                    {/* Days-remaining line: countdown off a concrete verified
                        close date; "Applications closed" when it has passed; the
                        record's estimated window text when only a month-level
                        estimate is verified; "Check dates on the website" when the
                        record carries no deadline data at all. */}
                    <p
                      className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[11px] leading-4"
                      data-testid={`program-deadline-${i}`}
                    >
                      {deadline.kind === 'countdown' ? (
                        <>
                          <span className="font-bold text-[var(--space-semantic-success)]">{deadline.label}</span>
                          <span className="text-[var(--space-text-muted)]">| Closes: {deadline.closeDateLabel}</span>
                        </>
                      ) : deadline.kind === 'closed' ? (
                        <span className="font-semibold text-[var(--space-text-muted)] line-through">Applications closed</span>
                      ) : deadline.kind === 'estimated' ? (
                        <span className="font-medium text-[var(--space-text-secondary)]">{deadline.label || deadline.closeText || deadline.openText}</span>
                      ) : (
                        <span className="font-medium text-[var(--space-text-muted)]">Check dates on the website</span>
                      )}
                    </p>
                    {item.availability && (
                      <p
                        className={`mt-2 flex items-start gap-1.5 text-[11px] font-medium leading-4 ${
                          item.availability_status === 'open_now_estimated'
                            ? 'text-[var(--space-semantic-success)]'
                            : item.availability_status === 'closing_estimated'
                              ? 'text-[var(--space-semantic-warning)]'
                              : 'text-[var(--space-text-secondary)]'
                        }`}
                        data-testid="program-availability"
                      >
                        <span
                          className={`mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full ${
                            item.availability_status === 'open_now_estimated'
                              ? 'bg-[var(--space-semantic-success)]'
                              : item.availability_status === 'closing_estimated'
                                ? 'bg-[var(--space-semantic-warning)]'
                                : 'bg-[var(--space-border-strong)]'
                          }`}
                        />
                        <span>{item.availability}</span>
                      </p>
                    )}
                    {/* v1.6: does this program verifiably open the candidate's
                        matched function? ✅ open / ⚠️ not listed (needs confirmation)
                        / — no verified track data. Straight from the scoring
                        engine — never computed or invented client-side. */}
                    {item.function_match_label && (
                      <p
                        className={`mt-2 flex items-start gap-1.5 text-[11px] font-medium leading-4 ${
                          item.function_match_status === 'open'
                            ? 'text-[var(--space-semantic-success)]'
                            : item.function_match_status === 'not_listed'
                              ? 'text-[var(--space-semantic-warning)]'
                              : 'text-[var(--space-text-muted)]'
                        }`}
                        data-testid={`program-function-match-${i}`}
                      >
                        <span>{item.function_match_label}</span>
                      </p>
                    )}
                    {(item.fit_reason || item.why) && (
                      <p className="mt-2 text-xs leading-5 text-[var(--space-text-secondary)]" data-testid={`program-fit-reason-${i}`}>
                        {item.fit_reason || item.why}
                      </p>
                    )}
                    {/* v1.4: the specific resume signals that drove this score,
                        quoted straight from the scoring engine — the proof that
                        the ranking is grounded in THIS candidate's CV. */}
                    {Array.isArray(item.cv_evidence) && item.cv_evidence.length > 0 && (
                      <div className="mt-2 rounded-lg bg-[var(--space-surface-card)] px-2.5 py-2" data-testid={`program-cv-evidence-${i}`}>
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--space-text-muted)]">From your CV</p>
                        <ul className="mt-1 space-y-1">
                          {item.cv_evidence.slice(0, 4).map((line, j) => (
                            <li key={j} className="flex items-start gap-1.5 text-[11px] leading-4 text-[var(--space-text-secondary)]">
                              <FileText className="mt-0.5 h-3 w-3 flex-shrink-0 text-[var(--space-text-brand)]" />
                              <span>{line}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {/* v1.8: compensation and development path LEAD this detail
                        block — per the corporate-fit model review (Hanoi 2022:
                        compensation 14.6% and career development 14.2% outrank
                        culture 10.6% for application intention), the culture
                        fit renders INSIDE it as a supporting 'Culture fit'
                        signal, never the headline reason. Rewards facts come
                        only from the founder-verified dataset
                        (lib/programRewards); an unverified field honestly
                        reads "being verified" — never an invented figure.
                        Culture states are unchanged: a real % + why for the 3
                        founder-verified companies, an honest “not filled in”
                        when the group was skipped, and a graceful no-data
                        state everywhere else — never a fabricated number. */}
                    {cultureFit && (
                      <div
                        className="mt-2 rounded-lg border border-[var(--space-border-default)] bg-[var(--space-surface-card)] px-2.5 py-2"
                        data-testid={`program-rewards-culture-${i}`}
                      >
                        <p className="flex flex-wrap items-center gap-1 text-[11px] font-semibold text-[var(--space-text-primary)]">
                          <Award className="h-3 w-3 text-[var(--space-text-brand)]" />
                          Compensation & Development Path
                          <span className="font-normal text-[var(--space-text-muted)]">(rewards & development path)</span>
                        </p>
                        <p className="mt-1 text-[11px] leading-4 text-[var(--space-text-secondary)]" data-testid={`program-development-path-${i}`}>
                          <span className="font-semibold text-[var(--space-text-primary)]">Development path:</span>{' '}
                          {rewardsInfo && rewardsInfo.developmentPath
                            ? rewardsInfo.developmentPath
                            : 'being verified — check the development track on the official program page.'}
                        </p>
                        <p className="mt-0.5 text-[11px] leading-4 text-[var(--space-text-secondary)]" data-testid={`program-compensation-${i}`}>
                          <span className="font-semibold text-[var(--space-text-primary)]">Compensation (pay & benefits):</span>{' '}
                          {rewardsInfo && rewardsInfo.compensation
                            ? rewardsInfo.compensation
                            : 'being verified by the Casemate team — never guessed; check the official program page.'}
                        </p>
                        {cultureCompany ? (
                          cultureResult ? (
                            <div
                              className="mt-1.5 border-t border-[var(--space-border-default)] pt-1.5"
                              data-testid={`program-culture-fit-${i}`}
                            >
                              <p className="flex flex-wrap items-center gap-1.5 text-[11px] leading-4 text-[var(--space-text-secondary)]">
                                <span className="rounded-full border border-[var(--space-brand-primary-200)] bg-[var(--space-surface-accent-soft)] px-2 py-0.5 font-bold text-[var(--space-text-brand)]">
                                  Culture fit {cultureResult.fit}% — {cultureResult.company}
                                </span>
                                <span>a supporting signal next to compensation and development — not the headline reason.</span>
                              </p>
                              <p className="mt-1 text-[11px] leading-4 text-[var(--space-text-secondary)]">{cultureResult.why}</p>
                              {cultureResult.note && (
                                <p
                                  className="mt-1.5 rounded-md border border-[color-mix(in_srgb,var(--space-semantic-warning)_45%,transparent)] bg-[color-mix(in_srgb,var(--space-semantic-warning)_8%,transparent)] px-2 py-1.5 text-[11px] leading-4 text-[var(--space-text-secondary)]"
                                  data-testid={`program-culture-note-${i}`}
                                >
                                  {cultureResult.note}
                                </p>
                              )}
                            </div>
                          ) : (
                            <p className="mt-1.5 border-t border-[var(--space-border-default)] pt-1.5 text-[11px] leading-4 text-[var(--space-text-muted)]" data-testid={`program-culture-unanswered-${i}`}>
                              Culture fit — {cultureCompany.company}: not filled in — answer the optional culture questions to see your % here.
                            </p>
                          )
                        ) : (
                          <p className="mt-1.5 border-t border-[var(--space-border-default)] pt-1.5 text-[11px] leading-4 text-[var(--space-text-muted)]" data-testid={`program-culture-nodata-${i}`}>
                            Culture fit: no verified culture data for this company yet — the Casemate team verifies each company one by one.
                          </p>
                        )}
                      </div>
                    )}
                    {/* Community intel — auto-gathered by the social-listening
                        pipeline (ITviec / Glassdoor / JobStreet / public
                        Facebook & LinkedIn / annual reports & press),
                        AI-filtered with credibility scoring. Display-only
                        guidance: it never changes the match %. */}
                    {intelRecord && (
                      <div
                        className="mt-2 rounded-lg border border-[var(--space-border-default)] bg-[var(--space-surface-card)] px-2.5 py-2"
                        data-testid={`program-intel-${i}`}
                      >
                        <p className="flex flex-wrap items-center justify-between gap-2 text-[11px] font-semibold text-[var(--space-text-primary)]">
                          <span className="flex items-center gap-1">
                            <Radar className="h-3 w-3 text-[var(--space-text-brand)]" />
                            Community intel — {intelRecord.company_name}
                          </span>
                          <span
                            className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                              intelRecord.confidence_level === 'high'
                                ? 'bg-[color-mix(in_srgb,var(--space-semantic-success)_12%,transparent)] text-[var(--space-semantic-success)]'
                                : intelRecord.confidence_level === 'medium'
                                  ? 'bg-[var(--space-surface-accent-soft)] text-[var(--space-text-brand)]'
                                  : 'bg-[color-mix(in_srgb,var(--space-semantic-warning)_12%,transparent)] text-[var(--space-text-secondary)]'
                            }`}
                            data-testid={`program-intel-confidence-${i}`}
                          >
                            {intelConfidenceLabel(intelRecord.confidence_level)}
                          </span>
                        </p>
                        {(intelRecord.competitive_rate.difficulty_score != null ||
                          intelRecord.competitive_rate.pass_rate_estimate !== 'unknown') && (
                          <p className="mt-1.5 text-[11px] leading-4 text-[var(--space-text-secondary)]" data-testid={`program-intel-difficulty-${i}`}>
                            <span className="font-semibold text-[var(--space-text-primary)]">Difficulty to get in:</span>{' '}
                            {intelRecord.competitive_rate.difficulty_score != null
                              ? `${Math.round(intelRecord.competitive_rate.difficulty_score)}/10 · ${intelDifficultyLabel(intelRecord.competitive_rate.difficulty_score)}`
                              : intelDifficultyLabel(null)}
                            {intelRecord.competitive_rate.pass_rate_estimate !== 'unknown' && (
                              <> · est. pass rate {intelRecord.competitive_rate.pass_rate_estimate}</>
                            )}
                            {intelRecord.competitive_rate.profile_bar !== 'unknown' && (
                              <span className="block text-[var(--space-text-muted)]">
                                Profile bar seen in community stories: {intelRecord.competitive_rate.profile_bar}
                              </span>
                            )}
                          </p>
                        )}
                        {intelCompat && (
                          <div className="mt-1.5" data-testid={`program-intel-culture-${i}`}>
                            <p className="text-[11px] leading-4 text-[var(--space-text-secondary)]">
                              <span className="font-semibold text-[var(--space-text-primary)]">Culture compatibility:</span>{' '}
                              {intelCompat.percent}%{' '}
                              <span className="text-[var(--space-text-muted)]">
                                (your{' '}
                                {intelCompat.basis === 'mbti+workstyle'
                                  ? 'MBTI + work-style answers'
                                  : intelCompat.basis === 'mbti'
                                    ? 'MBTI'
                                    : 'work-style answers'}{' '}
                                × scraped culture signals)
                              </span>
                            </p>
                            {intelCompat.notes.length > 0 && (
                              <ul className="mt-1 space-y-0.5">
                                {intelCompat.notes.map((note, j) => (
                                  <li key={j} className="text-[11px] leading-4 text-[var(--space-text-muted)]">
                                    · {note}
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        )}
                        {intelRecord.company_challenges.length > 0 && (
                          <div className="mt-1.5" data-testid={`program-intel-challenges-${i}`}>
                            <p className="text-[11px] font-semibold leading-4 text-[var(--space-text-primary)]">
                              What {intelRecord.company_name} is working on right now:
                            </p>
                            <ul className="mt-0.5 space-y-0.5">
                              {intelRecord.company_challenges.slice(0, 3).map((challenge, j) => (
                                <li key={j} className="text-[11px] leading-4 text-[var(--space-text-secondary)]">
                                  · {challenge.challenge}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        <p className="mt-1.5 text-[10px] leading-4 text-[var(--space-text-muted)]">
                          Auto-gathered from public reviews, community posts &amp; press
                          {intelAgeDays(intelRecord) != null ? ` · updated ${intelAgeDays(intelRecord)}d ago` : ''} · guidance
                          only — never changes your match %.
                        </p>
                      </div>
                    )}
                    {item.timeline && !/details coming soon/i.test(item.timeline) && (
                      <p className="mt-1.5 flex items-start gap-1.5 text-[11px] leading-4 text-[var(--space-text-muted)]">
                        <CalendarClock className="mt-0.5 h-3 w-3 flex-shrink-0" />
                        <span>{item.timeline}</span>
                      </p>
                    )}
                    {item.rounds && !/details coming soon/i.test(item.rounds) && (
                      <p className="mt-1.5 flex items-start gap-1.5 text-[11px] leading-4 text-[var(--space-text-muted)]" data-testid={`program-rounds-${i}`}>
                        <ClipboardList className="mt-0.5 h-3 w-3 flex-shrink-0" />
                        <span>Selection rounds: {item.rounds}</span>
                      </p>
                    )}
                    {onOpenProgram && (
                      <p className="mt-2 text-[11px] font-semibold text-[var(--space-text-brand)]">How to get there →</p>
                    )}
                  </>
                );
                const cardClass = `rounded-xl border px-3.5 py-3 ${
                  isBest || item.is_target
                    ? 'border-[var(--space-brand-primary-200)] bg-[var(--space-surface-accent-soft)]'
                    : 'border-[var(--space-border-default)] bg-[var(--space-surface-muted)]'
                }${deadline.kind === 'closed' ? ' opacity-60' : ''}`;
                return onOpenProgram ? (
                  <button
                    key={i}
                    type="button"
                    onClick={() => onOpenProgram(item)}
                    className={`${cardClass} block w-full text-left transition hover:border-[var(--space-brand-primary-500)]`}
                    data-testid={`direction-program-${i}`}
                  >
                    {cardInner}
                  </button>
                ) : (
                  <div key={i} className={cardClass}>
                    {cardInner}
                  </div>
                );
              })}
            </div>
          </div>
        )}
        {/* v1.3: compact PURE MBTI job-fit read — the 4-letter type + how it
            tends to show up at work. Never a “you can't do X” verdict (locked
            founder decision, v1.2) — and an honest “not filled in” when the group
            was skipped. */}
        {cultureFit && (
          <div data-testid="direction-mbti-read">
            <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[var(--space-text-muted)]">
              <Sparkles className="h-3.5 w-3.5" /> Your working style (MBTI)
            </p>
            {cultureFit.mbti ? (
              <div className="mt-2 rounded-xl bg-[var(--space-surface-muted)] px-3.5 py-3">
                <p className="flex items-center gap-2">
                  <span className="rounded-lg bg-[var(--space-brand-primary-600)] px-2 py-0.5 text-sm font-bold tracking-widest text-[var(--space-text-on-primary)]">
                    {cultureFit.mbti.type}
                  </span>
                  {MBTI_TYPES[cultureFit.mbti.type] && (
                    <span className="text-sm font-semibold text-[var(--space-text-primary)]">
                      {MBTI_TYPES[cultureFit.mbti.type].nickname}
                    </span>
                  )}
                </p>
                {MBTI_TYPES[cultureFit.mbti.type] && (
                  <p className="mt-1.5 text-xs leading-5 text-[var(--space-text-secondary)]">
                    {MBTI_TYPES[cultureFit.mbti.type].summary}
                  </p>
                )}
                <p className="mt-1.5 text-[11px] leading-4 text-[var(--space-text-muted)]">
                  MBTI is a SELF-DISCOVERY tool for your working style — never a verdict that “you can’t
                  do job X”. Your MBTI is also combined with the function you picked to determine
                  “Your best-fit function” above. See the “Explore more” section below for details.
                </p>
              </div>
            ) : (
              <p className="mt-2 text-xs leading-5 text-[var(--space-text-muted)]" data-testid="direction-mbti-unanswered">
                Not filled in — the MBTI question group is optional; you can do it any time in the
                “Explore more” section below. Filling it in helps Casemate pinpoint “Your best-fit
                function” more accurately — but it is never required for your direction result.
              </p>
            )}
          </div>
        )}
      </div>
      {/* Section 2 — the "Result Card": profile-improvement advice computed in
          the SAME analysis pass, styled identically to Section 1. */}
      {hasResultCardSection && (
        <div
          className="border-y border-[var(--space-border-default)] bg-[var(--space-surface-muted)] px-5 py-2.5"
          data-testid="section-result-card"
        >
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--space-text-accent)]">
            2 · Result Card — Improving your profile
          </p>
          <p className="mt-0.5 text-[11px] leading-4 text-[var(--space-text-secondary)]">
            Suggestions to upgrade your profile for the programs above: case practice targets, what to do
            before applying, and your prep timeline.
          </p>
        </div>
      )}
      <div className={hasResultCardSection ? 'space-y-4 px-5 py-4' : 'hidden'}>
        {typeof data.required_case_count === 'number' && data.required_case_count > 0 && (
          <div>
            <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[var(--space-text-muted)]">
              <ClipboardList className="h-3.5 w-3.5" /> Your prep target
            </p>
            <div className="mt-2 flex items-center gap-3 rounded-xl bg-[var(--space-surface-accent-soft)] px-3.5 py-3">
              <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-[var(--space-brand-highlight-600)] text-sm font-bold text-[var(--space-text-on-highlight)]">
                {data.required_case_count}
              </span>
              <p className="text-sm leading-5 text-[var(--space-text-primary)]">
                <span className="font-semibold">
                  {data.required_case_count} practice case{data.required_case_count === 1 ? '' : 's'}
                </span>{' '}
                to complete before{' '}
                {data.programs.length > 0
                  ? `the ${data.programs[0].program || data.programs[0].company} application window (estimated)`
                  : 'your top program\u2019s estimated application window'}
              </p>
            </div>
          </div>
        )}
        {scopedProfilePriorities.length > 0 && (
          <div>
            <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[var(--space-text-muted)]">
              <CheckCircle2 className="h-3.5 w-3.5" /> Work on these before you apply
            </p>
            <ol className="mt-2 space-y-1.5">
              {scopedProfilePriorities.map((priority, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-[var(--space-text-secondary)]">
                  <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[var(--space-brand-primary)] text-[10px] font-bold text-[var(--space-text-on-primary)]">
                    {i + 1}
                  </span>
                  <span className="leading-5"><TextWithCertLinks text={priority} /></span>
                </li>
              ))}
            </ol>
          </div>
        )}
        {data.prep_timeline.length > 0 && (
          <div>
            <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[var(--space-text-muted)]">
              <CalendarClock className="h-3.5 w-3.5" /> Your prep timeline
            </p>
            <div className="mt-2">
              {data.prep_timeline.map((step, i) => (
                <div key={i} className="relative flex gap-3 pb-3 last:pb-0">
                  <div className="flex flex-col items-center">
                    <span className="mt-1 h-2.5 w-2.5 flex-shrink-0 rounded-full bg-[var(--space-brand-highlight-600)]" />
                    {i < data.prep_timeline.length - 1 && (
                      <span className="w-px flex-1 bg-[var(--space-border-strong)]" />
                    )}
                  </div>
                  <div className="min-w-0 pb-1">
                    {step.period && (
                      <p className="text-xs font-semibold text-[var(--space-text-primary)]">{step.period}</p>
                    )}
                    <p className="mt-0.5 text-xs leading-5 text-[var(--space-text-secondary)]">{step.focus}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="border-t border-[var(--space-border-default)] bg-[var(--space-surface-muted)] px-5 py-2.5">
        <p className="flex items-center gap-1.5 text-[11px] leading-4 text-[var(--space-text-muted)]" data-testid="screenshot-tip">
          <CameraHint className="h-3.5 w-3.5 flex-shrink-0" />
          <span>Tip: screenshot this card to save your results. It's also saved here and waiting whenever you come back.</span>
        </p>
      </div>
    </div>
  );
}

/* ============================================================================
 * Program "how to get there" guide panel
 *
 * Every program in the direction card is clickable. Tapping one opens this
 * right-side panel: "You want to get into X — here's how", with why the
 * program fits (or doesn't fully fit) THIS candidate, the specific gaps to
 * close, and a concrete action plan. The personalized guide is computed by
 * the scoring engine and saved server-side inside the assessment result
 * (result_json.program_guides) — the panel reads it from WorkspaceDB; for
 * older saved results it falls back to the data already on the card.
 * ==========================================================================*/

interface ProgramGuide {
  company: string;
  program: string;
  match_percent?: number;
  details_status?: string;
  is_target?: boolean;
  why?: string;
  gaps?: string[];
  steps?: string[];
  timeline?: string | null;
  rounds?: string | null;
  eligibility?: string | null;
  functions?: string[] | null;
  functions_note?: string | null;
  duration?: string | null;
  competitiveness?: number | null;
  program_type_label?: string | null;
  availability?: string | null;
  availability_status?: string | null;
  selection_style?: string | null;
  // rubric-fit-v1: per-criterion scoring breakdown attached by the scoring
  // hook when this program has an active ideal-candidate rubric — rendered
  // as the "Match score breakdown" section of this panel.
  rubric_breakdown?: unknown;
}

function programKey(value: string): string {
  return String(value || '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
}

// Level chips for the rubric breakdown. Tints use color-mix — never a /NN
// opacity modifier on a CSS variable (Tailwind silently drops those).
const RUBRIC_LEVEL_CHIP_CLASSES: Record<RubricLevelId, string> = {
  noi_bat:
    'bg-[color-mix(in_srgb,var(--space-semantic-success)_14%,transparent)] text-[var(--space-semantic-success)]',
  dat: 'bg-[color-mix(in_srgb,var(--space-brand-primary-500)_14%,transparent)] text-[var(--space-text-brand)]',
  chua_dat: 'border border-[var(--space-border-strong)] bg-[var(--space-surface-card)] text-[var(--space-text-muted)]',
};

/* ----------------------------------------------------------------------------
 * Function-level fit + program-specific drill recommendations.
 *
 * Deterministic, client-side derivations from data we already trust: the
 * candidate's ranked function_fit (scoring engine) and the program's VERIFIED
 * function list (founder dataset, via program_guides). Nothing here invents
 * unverified program facts — where a program's functions aren't verified the
 * UI says "details coming soon", and case-type suggestions are explicitly
 * framed as Mate's practice recommendation, not official selection rounds.
 * --------------------------------------------------------------------------*/

const FUNCTION_CAPABILITY_HINTS: Array<{ match: RegExp; hint: string }> = [
  { match: /financ|account|audit|treasur|invest/i, hint: 'valuation, financial-statement literacy, and Excel-modelling evidence through relevant coursework or a project' },
  { match: /market|brand|consumer|insight/i, hint: 'brand-plan thinking, consumer insight, and campaign results — a marketing case competition or a brand/trade internship closes this' },
  { match: /sale|commercial|trade|customer development|business development/i, hint: 'channel economics and target-owning evidence — a sales or trade-marketing internship closes this' },
  { match: /supply|operat|logisti|manufactur|procure/i, hint: 'process-improvement and planning exposure through an operations internship or measurable process project' },
  { match: /tech|digital|data|analytic|engineer|\bit\b/i, hint: 'SQL/analytics fluency plus one shipped digital or data project' },
  { match: /\bhr\b|human|people|talent/i, hint: 'stakeholder management and organizational judgment — a people-facing leadership role closes this' },
  { match: /r&d|research|product develop/i, hint: 'technical depth translated into consumer value — a product or research project closes this' },
];

function capabilityHint(functionName: string): string {
  const hit = FUNCTION_CAPABILITY_HINTS.find((entry) => entry.match.test(functionName));
  return hit ? hit.hint : 'broad business fundamentals — steady case drills plus a relevant internship close this';
}

function functionTokens(value: string): string[] {
  return String(value || '')
    .toLowerCase()
    .split(/[^a-z&]+/)
    .filter((token) => token.length > 2 && token !== 'and' && token !== 'the');
}

function functionsOverlap(a: string, b: string): boolean {
  const ta = functionTokens(a);
  const tb = functionTokens(b);
  return ta.some((token) => tb.some((other) => other.indexOf(token) === 0 || token.indexOf(other) === 0));
}

function deriveFunctionFit(
  candidateFunctions: DirectionEntry[],
  programFunctions: string[],
): { best: string | null; bestReason: string | null; develop: string[] } {
  let best: string | null = null;
  let bestReason: string | null = null;
  for (const candidate of candidateFunctions) {
    const hit = programFunctions.find((fn) => functionsOverlap(candidate.name, fn));
    if (hit) {
      best = hit;
      bestReason = candidate.reason || null;
      break;
    }
  }
  const develop = programFunctions.filter((fn) => fn !== best).slice(0, 3);
  return { best, bestReason, develop };
}

// Labels come from the shared Casemate case-type catalog
// (apps/CaseDrillLog/caseTypeCatalog.ts) so this guide and the Case Pool
// app always agree on the available case types.
const DRILL_CASE_TYPE_LABELS: Record<string, string> = CASE_TYPE_CATALOG.reduce(
  (labels, option) => {
    labels[option.id] = option.label;
    return labels;
  },
  {} as Record<string, string>,
);

interface DrillTypeRec {
  id: string;
  why: string;
}

// Program-specific drill recommendations (v0.7): the case types come from
// the shared industry/function-to-case-type mapping in
// apps/CaseDrillLog/caseTypeCatalog.ts — the same mapping that personalizes
// the Case Pool menu — matched against the program's OWN context (company,
// program, industry, verified functions), so an EY/Deloitte guide recommends
// financial-analysis and due-diligence drills while a Techcombank guide
// recommends credit assessment. Every pick carries a one-line WHY, the first
// pick cites the program's verified rounds where we have them, and the
// candidate's top matched function boosts its own signature case type so
// mixed-function candidates see a union weighted toward their fit.
function recommendCaseTypes(program: DirectionProgram, guide: ProgramGuide, direction: DirectionData): DrillTypeRec[] {
  const programContext = [
    program.company,
    program.program,
    program.industry || '',
    Array.isArray(guide.functions) ? guide.functions.join(' ') : '',
  ]
    .join(' ')
    .toLowerCase();
  const rounds = String(guide.rounds || '');
  const roundsVerified = guide.details_status !== 'coming_soon' && rounds && !/coming soon/i.test(rounds);
  const assessmentCentre = roundsVerified && /discovery center|career camp|assessment center/i.test(rounds);
  const roundNote = assessmentCentre
    ? ' Its verified assessment-centre round works in live group business exercises.'
    : roundsVerified
      ? ' Its verified rounds include tests and interviews that lean on structured business thinking.'
      : ' Rounds not yet verified — this is how programs in this world typically screen.';

  // Match the program itself first; if nothing matches, fall back to the
  // candidate's own top matched industry, then to the universal screens.
  const directionIndustry = (direction.industry_fit[0] && direction.industry_fit[0].name) || '';
  const industryRule =
    INDUSTRY_CASE_TYPE_RULES.find((rule) => rule.match.test(programContext)) ||
    (directionIndustry ? INDUSTRY_CASE_TYPE_RULES.find((rule) => rule.match.test(directionIndustry)) : undefined);
  let picks: DrillTypeRec[] = (industryRule ? industryRule.caseTypes : GENERAL_CASE_TYPE_RECS)
    .slice(0, 3)
    .map((rec) => ({ id: rec.id, why: rec.why }));
  if (picks.length > 0) picks[0] = { id: picks[0].id, why: picks[0].why + roundNote };

  // Weight toward the candidate's top matched function: its signature case
  // type takes the second slot when the industry picks missed it.
  const topFunction = (direction.function_fit[0] && direction.function_fit[0].name) || '';
  const functionRule = topFunction ? FUNCTION_CASE_TYPE_RULES.find((rule) => rule.match.test(topFunction)) : undefined;
  if (functionRule) {
    const boost = functionRule.caseTypes.find((rec) => !picks.some((pick) => pick.id === rec.id));
    if (boost && picks.length >= 2) {
      picks = [picks[0], { id: boost.id, why: boost.why }, picks[1]];
    } else if (boost) {
      picks.push({ id: boost.id, why: boost.why });
    }
  }
  return picks.slice(0, 3);
}

function ProgramGuidePanel({
  program,
  direction,
  onClose,
  isRowInConversation,
}: {
  program: DirectionProgram;
  direction: DirectionData;
  onClose: () => void;
  // v1.5 per-conversation isolation: restricts the saved-results scan to the
  // conversation that opened this panel. Absent = legacy behavior.
  isRowInConversation?: (id: unknown) => boolean;
}) {
  // Same platform-provided WorkspaceDB hook the apps use — reads are scoped
  // to this visitor's session, so we only ever see their own saved results.
  const { data: assessmentRows, loading: guideLoading } = (window as any).useWorkspaceDB('assessment_results', {
    orderBy: { column: 'created_at', direction: 'desc' },
    limit: 10,
  }) as { data: Array<{ result_json?: unknown }>; loading: boolean };

  // Rubric layer (rubric-fit-v1): active ideal-candidate rubrics are shared
  // rows — newest active version per program wins. Opening the panel also
  // opportunistically seeds DRAFT rubrics for programs that have none yet
  // (never touches existing rows, so founder-locked rubrics are safe).
  const { data: rubricRows } = (window as any).useWorkspaceDB('program_fit_rubrics', {
    orderBy: { column: 'id', direction: 'desc' },
    limit: 200,
    shared: true,
  }) as { data: any[] };
  useEffect(() => {
    ensureProgramFitRubricSeeds();
  }, []);

  const guide: ProgramGuide = useMemo(() => {
    const wantedProgram = programKey(program.program || program.company);
    const wantedCompany = programKey(program.company);
    // v1.5: only search results belonging to the conversation that opened
    // this panel — another conversation's guide for the same program is a
    // different candidate run.
    const scopedRows = (assessmentRows || []).filter(
      (row) => !isRowInConversation || isRowInConversation((row as any).id),
    );
    for (const row of scopedRows) {
      let parsed: any = row?.result_json;
      if (typeof parsed === 'string') {
        try {
          parsed = JSON.parse(parsed);
        } catch (e) {
          parsed = null;
        }
      }
      const guides = parsed?.program_guides;
      if (!Array.isArray(guides)) continue;
      const hit = guides.find(
        (g: any) =>
          g &&
          (programKey(String(g.program || '')) === wantedProgram ||
            (wantedCompany && programKey(String(g.company || '')) === wantedCompany)),
      );
      if (hit) return hit as ProgramGuide;
    }
    // Fallback for results saved before per-program guides existed: build a
    // useful plan from the card data + the direction's own priorities.
    return {
      company: program.company,
      program: program.program,
      match_percent: program.match_percent,
      details_status: program.details_status,
      is_target: program.is_target,
      why: program.why,
      gaps: (direction.profile_priorities || []).slice(0, 4),
      steps: [
        program.timeline
          ? 'Anchor your calendar to its window — ' + program.timeline
          : 'Watch ' + program.company + '\u2019s careers page — this program\u2019s window is still being verified (details coming soon)',
        direction.required_case_count
          ? 'Complete your ' + direction.required_case_count + '-case practice target in the Case Pool room'
          : 'Drill practice cases weekly in the Case Pool room',
        'Rewrite your CV for this program with metric-led bullets — one number per bullet',
      ],
      timeline: program.timeline || null,
    };
  }, [assessmentRows, program, direction, isRowInConversation]);

  const whyPoints = String(guide.why || program.why || '')
    .replace(/\.\s*$/, '')
    .split('; ')
    .map((s) => s.trim())
    .filter(Boolean)
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1));

  // Facts are CONSISTENT across every program (v0.6): where a field is not
  // yet founder-verified it explicitly reads "Details coming soon" — the same
  // placeholder for all programs, never a missing row for some and a detail
  // view for others.
  const comingSoon = guide.details_status === 'coming_soon' || program.details_status === 'coming_soon';
  const factOr = (value: unknown, soonText: string) =>
    value ? String(value) : comingSoon ? soonText : '';
  const facts: Array<{ label: string; value: string }> = [];
  const availabilityText = guide.availability || program.availability;
  if (availabilityText) facts.push({ label: 'Application status', value: String(availabilityText) });
  // Program timeline (application window + selection rounds) renders as its
  // own visual section fed by the founder-verified record
  // (lib/programTimelines) — the old "Application window" / "Selection
  // rounds" facts rows (and their "coming soon" boilerplate) moved there.
  const timelineRecord = findProgramTimeline(program.company, program.program || program.company);
  const deadline = deadlineStatus(timelineRecord);
  const roundSteps = roundStepsFor(timelineRecord, guide.rounds || program.rounds);
  // Window prose from the saved result stays usable when it is real verified
  // data — the "coming soon" placeholder is never treated as data.
  const timelineProse = String(guide.timeline || program.timeline || '');
  const timelineProseReal = timelineProse && !/coming soon/i.test(timelineProse) ? timelineProse : '';
  const hasWindowData = deadline.kind !== 'unknown' || !!timelineProseReal;
  if (guide.selection_style) facts.push({ label: 'Selection style', value: String(guide.selection_style) });
  const eligibilityFact = factOr(guide.eligibility, 'Details coming soon — eligibility criteria haven’t been founder-verified yet.');
  if (eligibilityFact) facts.push({ label: 'Eligibility', value: eligibilityFact });
  if (guide.duration) facts.push({ label: 'Program length', value: String(guide.duration) });
  if (guide.competitiveness != null) facts.push({ label: 'Competitiveness', value: guide.competitiveness + '/5 — priced into your match score' });

  const matchPercent = Math.max(0, Math.min(100, Math.round(Number(guide.match_percent ?? program.match_percent) || 0)));
  const sectionLabel = 'text-[11px] font-semibold uppercase tracking-wider text-[var(--space-text-muted)]';

  // Rubric data for this program: the saved per-criterion breakdown when the
  // scoring hook produced one, else the active rubric (or the bundled draft)
  // as a read-only reference of what the score will measure.
  const rubricBreakdown = useMemo(() => normalizeRubricBreakdown(guide.rubric_breakdown), [guide]);
  const activeRubric = useMemo(
    () => findActiveRubricForProgram(rubricRows || [], program.company, program.program || program.company),
    [rubricRows, program],
  );
  const referenceRubric = useMemo(() => {
    if (activeRubric) return activeRubric;
    const programId = resolveRubricProgramId(program.company, program.program || program.company);
    return programId ? findDraftRubric(programId) : null;
  }, [activeRubric, program]);
  const referenceVerified = activeRubric ? activeRubric.verified : false;

  // Function-level fit (task: per-program best-fit function + functions to
  // develop) and program-specific case-type recommendations.
  const verifiedFunctions = Array.isArray(guide.functions) ? guide.functions.filter(Boolean).map(String) : [];
  const functionFit = deriveFunctionFit(direction.function_fit || [], verifiedFunctions);
  const drillTypes = recommendCaseTypes(program, guide, direction);
  const scopedGuideGaps = scopeCertificateRecommendations(Array.isArray(guide.gaps) ? guide.gaps.map(String) : [], direction);
  const scopedGuideSteps = scopeCertificateRecommendations(Array.isArray(guide.steps) ? guide.steps.map(String) : [], direction);

  // "Generate My Roadmap": builds a personalized week-by-week prep plan
  // toward THIS program's application window (lib/prepRoadmap), saves it to
  // the prep_roadmaps table keyed to the account identity, and opens the
  // persistent My Roadmap dock app showing the saved plan.
  const [roadmapGenerating, setRoadmapGenerating] = useState(false);
  const [roadmapError, setRoadmapError] = useState<string | null>(null);
  const generateRoadmap = async () => {
    if (roadmapGenerating) return;
    setRoadmapGenerating(true);
    setRoadmapError(null);
    try {
      await generateAndSaveRoadmap({
        targetProgram: program.program || program.company,
        targetCompany: program.company,
        matchPercent: guide.match_percent ?? program.match_percent,
      });
      window.dispatchEvent(new CustomEvent('openApp', { detail: { appId: ROADMAP_APP_ID } }));
      onClose();
    } catch (e) {
      setRoadmapError('Roadmap generation didn\u2019t go through \u2014 please try again in a moment.');
    } finally {
      setRoadmapGenerating(false);
    }
  };

  const startProgramDrill = () => {
    try {
      localStorage.setItem(
        'casemate-drill-preset',
        JSON.stringify({
          program: program.program || program.company,
          company: program.company,
          caseType: drillTypes[0].id,
          caseTypes: drillTypes.map((t) => t.id),
          ts: Date.now(),
        }),
      );
    } catch (e) {
      // Private mode — the drill still opens, just without the preset.
    }
    window.dispatchEvent(new CustomEvent('openApp', { detail: { appId: 'case-drill-log' } }));
    onClose();
  };

  return (
    <section
      className="z-40 flex flex-col min-h-0 overflow-hidden border-[var(--space-border-default)] bg-[var(--space-surface-card)] max-md:fixed max-md:inset-0 md:w-[clamp(360px,42vw,680px)] md:flex-shrink-0 md:border-l"
      data-testid="program-guide-panel"
    >
      <div className="flex flex-shrink-0 items-center gap-2.5 border-b border-[var(--space-border-default)] bg-[var(--space-surface-accent-soft)] px-4 py-3">
        <Target className="h-4 w-4 flex-shrink-0 text-[var(--space-text-brand)]" />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-[var(--space-text-primary)]">How to get there</p>
          <p className="truncate text-[11px] text-[var(--space-text-secondary)]">{program.program || program.company}</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg text-[var(--space-text-muted)] transition hover:bg-[var(--space-surface-muted)] hover:text-[var(--space-text-primary)]"
          title="Close program guide"
          data-testid="button-close-program-guide"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="flex-1 space-y-4 overflow-y-auto px-4 py-4">
        <div>
          <h3 className="text-lg font-bold leading-snug text-[var(--space-text-primary)]">
            You want to get into {program.program || program.company} — here’s how.
          </h3>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-[var(--space-brand-primary-600)] px-2.5 py-1 text-xs font-bold text-[var(--space-text-on-primary)]">
              {matchPercent}% match
            </span>
            {guide.is_target && (
              <span className="rounded-full bg-[var(--space-brand-highlight-600)] px-2 py-0.5 text-[10px] font-bold text-[var(--space-text-on-highlight)]">Your target</span>
            )}
            {(guide.program_type_label || program.program_type_label) && (
              <span className="rounded-full border border-[var(--space-border-strong)] bg-[var(--space-surface-card)] px-2 py-0.5 text-[10px] font-semibold text-[var(--space-text-secondary)]">
                {guide.program_type_label || program.program_type_label}
              </span>
            )}
            {guide.details_status === 'coming_soon' && (
              <span className="rounded-full bg-[var(--space-surface-muted)] px-2 py-0.5 text-[10px] font-medium text-[var(--space-text-muted)]">Details coming soon</span>
            )}
            {guideLoading && <Loader2 className="h-3.5 w-3.5 animate-spin text-[var(--space-text-muted)]" />}
          </div>
          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-[var(--space-brand-primary-100)]">
            <div className="h-full rounded-full bg-[var(--space-brand-primary-600)]" style={{ width: `${matchPercent}%` }} />
          </div>
        </div>

        {whyPoints.length > 0 && (
          <div>
            <p className={sectionLabel}>Why this fits you — and where it doesn’t yet</p>
            <ul className="mt-2 space-y-1.5">
              {whyPoints.map((point, i) => (
                <li key={i} className="flex items-start gap-2 text-xs leading-5 text-[var(--space-text-secondary)]">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--space-brand-primary-500)]" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Rubric breakdown (rubric-fit-v1): per-criterion level + verbatim CV
            evidence + what to improve — the personal plan maps 1:1 to these
            rubric gaps. Falls back to a read-only rubric reference for results
            saved before rubric scoring existed. */}
        {rubricBreakdown ? (
          <div data-testid="program-rubric-breakdown">
            <p className={sectionLabel}>Match score breakdown — ideal-candidate rubric</p>
            <p className="mt-1 text-[11px] leading-4 text-[var(--space-text-muted)]">
              {rubricBreakdown.rubric_verified
                ? 'Scored against this program’s founder-verified rubric: your match % is the weighted sum of the criteria below, each backed by a quote from your own CV.'
                : 'Scored against this program’s rubric (draft — awaiting founder verification): your match % is the weighted sum of the criteria below, each backed by a quote from your own CV.'}
            </p>
            <div className="mt-2 space-y-2">
              {rubricBreakdown.criteria.map((crit) => (
                <div
                  key={crit.id}
                  className="rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-muted)] px-3 py-2.5"
                  data-testid={`program-rubric-criterion-${crit.id}`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <p className="min-w-0 text-xs font-semibold text-[var(--space-text-primary)]">
                      {crit.label_vi || crit.label_en || crit.id}
                      <span className="ml-1.5 text-[10px] font-medium text-[var(--space-text-muted)]">{crit.weight}%</span>
                    </p>
                    <span
                      className={`flex-shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold ${RUBRIC_LEVEL_CHIP_CLASSES[crit.level]}`}
                    >
                      {RUBRIC_LEVEL_LABELS_VI[crit.level]}
                    </span>
                  </div>
                  {crit.evidence ? (
                    <p className="mt-1 text-[11px] italic leading-4 text-[var(--space-text-secondary)]">“{crit.evidence}”</p>
                  ) : (
                    <p className="mt-1 text-[11px] leading-4 text-[var(--space-text-muted)]">No evidence for this criterion in your CV yet.</p>
                  )}
                  {crit.improve && crit.level !== 'noi_bat' && (
                    <p className="mt-1 text-[11px] leading-4 text-[var(--space-text-secondary)]">
                      <span className="font-semibold text-[var(--space-text-brand)]">To improve:</span> {crit.improve}
                    </p>
                  )}
                </div>
              ))}
            </div>
            <p className="mt-1.5 text-[10px] leading-4 text-[var(--space-text-muted)]">
              Weighted sum of the criteria above = {rubricBreakdown.weighted_match_percent}% match.
            </p>
          </div>
        ) : referenceRubric ? (
          <div data-testid="program-rubric-reference">
            <p className={sectionLabel}>What this program’s rubric measures</p>
            <p className="mt-1 text-[11px] leading-4 text-[var(--space-text-muted)]">
              {referenceVerified
                ? 'This program has a founder-verified ideal-candidate rubric — new assessments score your CV criterion by criterion against it.'
                : 'This program has a draft ideal-candidate rubric (awaiting founder verification) — new assessments score your CV criterion by criterion against it.'}{' '}
              Retake the assessment to see your per-criterion breakdown here.
            </p>
            <div className="mt-2 space-y-1.5">
              {referenceRubric.criteria.map((crit) => (
                <div
                  key={crit.id}
                  className="flex items-center justify-between gap-2 rounded-xl bg-[var(--space-surface-muted)] px-3 py-2"
                >
                  <p className="min-w-0 text-xs font-medium text-[var(--space-text-secondary)]">{crit.label_vi}</p>
                  <span className="flex-shrink-0 text-[10px] font-bold text-[var(--space-text-brand)]">{crit.weight}%</span>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        <div>
          <p className={sectionLabel}>Function fit inside this program</p>
          {verifiedFunctions.length > 0 ? (
            <div className="mt-2 space-y-2">
              {functionFit.best ? (
                <div className="rounded-xl border border-[var(--space-brand-primary-200)] bg-[var(--space-surface-accent-soft)] px-3 py-2.5" data-testid="program-best-fit-function">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--space-text-brand)]">Best-fit function</p>
                  <p className="mt-0.5 text-sm font-semibold text-[var(--space-text-primary)]">{functionFit.best}</p>
                  <p className="mt-1 text-xs leading-5 text-[var(--space-text-secondary)]">
                    {functionFit.bestReason || 'This track lines up most directly with the strengths in your profile.'}
                  </p>
                </div>
              ) : (
                <div className="rounded-xl bg-[var(--space-surface-muted)] px-3 py-2.5">
                  <p className="text-xs leading-5 text-[var(--space-text-secondary)]">
                    None of this program’s tracks map directly onto your strongest functions yet — treat each track below as one to develop, or ask Mate which is closest for you.
                  </p>
                </div>
              )}
              {functionFit.develop.length > 0 && (
                <div className="rounded-xl bg-[var(--space-surface-muted)] px-3 py-2.5" data-testid="program-functions-to-develop">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--space-text-muted)]">Functions to develop</p>
                  <ul className="mt-1.5 space-y-1.5">
                    {functionFit.develop.map((fn) => (
                      <li key={fn} className="text-xs leading-5 text-[var(--space-text-secondary)]">
                        <span className="font-semibold text-[var(--space-text-primary)]">{fn}</span> — to be competitive here, build {capabilityHint(fn)}.
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {guide.functions_note && (
                <p className="text-[10px] leading-4 text-[var(--space-text-muted)]">{guide.functions_note}</p>
              )}
            </div>
          ) : (
            <p className="mt-2 rounded-xl bg-[var(--space-surface-muted)] px-3 py-2.5 text-xs leading-5 text-[var(--space-text-secondary)]">
              This program’s function tracks are still being verified — details coming soon. Your strongest function overall is{' '}
              <span className="font-semibold text-[var(--space-text-primary)]">
                {(direction.function_fit[0] && direction.function_fit[0].name) || 'still being mapped'}
              </span>
              ; ask Mate how it maps to this program once the tracks are confirmed.
            </p>
          )}
        </div>

        <div>
          <p className={sectionLabel}>Case types to drill for this program</p>
          <p className="mt-1 text-[11px] leading-4 text-[var(--space-text-muted)]">
            Matched to what this program’s selection process actually tests — Mate’s practice recommendation, not an official exam list.
          </p>
          <div className="mt-2 space-y-1.5">
            {drillTypes.map((rec, i) => (
              <div
                key={rec.id}
                className={`rounded-xl border px-3 py-2 ${
                  i === 0
                    ? 'border-[var(--space-brand-primary-200)] bg-[var(--space-surface-accent-soft)]'
                    : 'border-[var(--space-border-default)] bg-[var(--space-surface-muted)]'
                }`}
                data-testid={`program-drill-type-${rec.id}`}
              >
                <p className="text-xs font-semibold text-[var(--space-text-primary)]">
                  {DRILL_CASE_TYPE_LABELS[rec.id] || rec.id}
                  {i === 0 ? ' · start here' : ''}
                </p>
                <p className="mt-0.5 text-[11px] leading-4 text-[var(--space-text-secondary)]">{rec.why}</p>
              </div>
            ))}
          </div>
        </div>

        {scopedGuideGaps.length > 0 && (
          <div>
            <p className={sectionLabel}>Gaps to close</p>
            <ol className="mt-2 space-y-1.5">
              {scopedGuideGaps.map((gap, i) => (
                <li key={i} className="flex items-start gap-2 text-xs leading-5 text-[var(--space-text-secondary)]">
                  <span className="mt-0.5 flex min-h-[18px] min-w-[18px] flex-shrink-0 items-center justify-center rounded-full bg-[var(--space-surface-accent-soft)] text-[10px] font-bold text-[var(--space-text-brand)]">
                    {i + 1}
                  </span>
                  <span><TextWithCertLinks text={gap} /></span>
                </li>
              ))}
            </ol>
          </div>
        )}

        {scopedGuideSteps.length > 0 && (
          <div>
            <p className={sectionLabel}>Your action plan</p>
            <ol className="mt-2 space-y-1.5">
              {scopedGuideSteps.map((step, i) => (
                <li key={i} className="flex items-start gap-2 text-xs leading-5 text-[var(--space-text-secondary)]">
                  <span className="mt-0.5 flex min-h-[18px] min-w-[18px] flex-shrink-0 items-center justify-center rounded-full bg-[var(--space-brand-primary)] text-[10px] font-bold text-[var(--space-text-on-primary)]">
                    {i + 1}
                  </span>
                  <span><TextWithCertLinks text={step} /></span>
                </li>
              ))}
            </ol>
          </div>
        )}

        {/* Program timeline — application window + selection rounds straight
            from the founder-verified record. "Coming soon" never appears
            here: where the record genuinely has no timeline data the
            candidate gets the honest website fallback instead. */}
        <div data-testid="program-timeline-section">
          <p className={sectionLabel}>Program timeline</p>
          {hasWindowData || roundSteps.length > 0 ? (
            <div className="mt-2 space-y-2">
              {hasWindowData && (
                <div className="rounded-xl bg-[var(--space-surface-muted)] px-3 py-2.5" data-testid="program-application-window">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--space-text-muted)]">Application window</p>
                  {deadline.kind === 'countdown' || deadline.kind === 'closed' ? (
                    <>
                      <p className="mt-0.5 text-xs font-semibold leading-5 text-[var(--space-text-primary)]">
                        {deadline.openDateLabel ? `Opens: ${deadline.openDateLabel} — ` : ''}Closes: {deadline.closeDateLabel}
                      </p>
                      {deadline.kind === 'countdown' ? (
                        <p className="mt-0.5 text-xs font-bold text-[var(--space-semantic-success)]">{deadline.label}</p>
                      ) : (
                        <p className="mt-0.5 text-xs font-bold text-[var(--space-text-muted)] line-through">Applications closed</p>
                      )}
                    </>
                  ) : deadline.kind === 'estimated' ? (
                    <>
                      {deadline.openText && (
                        <p className="mt-0.5 text-xs leading-5 text-[var(--space-text-secondary)]">{deadline.openText}</p>
                      )}
                      {deadline.closeText && (
                        <p className="mt-0.5 text-xs leading-5 text-[var(--space-text-secondary)]">{deadline.closeText}</p>
                      )}
                    </>
                  ) : (
                    <p className="mt-0.5 text-xs leading-5 text-[var(--space-text-secondary)]">{timelineProseReal}</p>
                  )}
                </div>
              )}
              {roundSteps.length > 0 && (
                <div className="rounded-xl bg-[var(--space-surface-muted)] px-3 py-2.5" data-testid="program-rounds-timeline">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--space-text-muted)]">Selection rounds</p>
                  <ol className="mt-2">
                    {roundSteps.map((step, i) => (
                      <li key={i} className="relative flex gap-2.5 pb-3 last:pb-0">
                        {i < roundSteps.length - 1 && (
                          <span className="absolute bottom-0 left-[9px] top-5 w-px bg-[var(--space-brand-primary-200)]" aria-hidden="true" />
                        )}
                        <span className="mt-0.5 flex h-[18px] min-w-[18px] flex-shrink-0 items-center justify-center rounded-full bg-[var(--space-brand-primary-600)] text-[10px] font-bold text-[var(--space-text-on-primary)]">
                          {i + 1}
                        </span>
                        <div className="min-w-0">
                          <p className="text-xs font-semibold leading-5 text-[var(--space-text-primary)]">{step.name}</p>
                          {step.period && (
                            <p className="text-[11px] leading-4 text-[var(--space-text-muted)]">{step.period}</p>
                          )}
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              )}
            </div>
          ) : timelineRecord && timelineRecord.programUrl ? (
            <p className="mt-2 rounded-xl bg-[var(--space-surface-muted)] px-3 py-2.5 text-xs leading-5 text-[var(--space-text-secondary)]" data-testid="program-timeline-fallback">
              No verified timeline data for this program yet —{' '}
              <a
                href={timelineRecord.programUrl}
                target="_blank"
                rel="noreferrer"
                className="font-semibold text-[var(--space-text-brand)] underline"
              >
                see the program website
              </a>
              .
            </p>
          ) : (
            <p className="mt-2 rounded-xl bg-[var(--space-surface-muted)] px-3 py-2.5 text-xs leading-5 text-[var(--space-text-secondary)]" data-testid="program-timeline-fallback">
              No verified timeline data for this program yet — check the program website ({program.company}'s careers page).
            </p>
          )}
        </div>

        {/* Generate My Roadmap — turns this guide into a personalized
            week-by-week prep plan saved to the My Roadmap dock app. */}
        <div
          className="rounded-2xl border border-[var(--space-brand-primary-200)] bg-[var(--space-surface-accent-soft)] p-4"
          data-testid="roadmap-cta-section"
        >
          <p className="flex items-center gap-1.5 text-sm font-bold text-[var(--space-text-primary)]">
            <MapIcon className="h-4 w-4 shrink-0 text-[var(--space-text-brand)]" />
            Turn this into a week-by-week plan
          </p>
          <p className="mt-1 text-xs leading-5 text-[var(--space-text-secondary)]">
            Mate builds your personalized prep roadmap toward {program.program || program.company} — weekly Case
            Pool, Case Drill, and Aptitude Test targets paced to its application window and your practice so far —
            and saves it to <span className="font-semibold text-[var(--space-text-primary)]">My Roadmap</span> in
            the dock so you can track progress anytime.
          </p>
          {roadmapError && (
            <p className="mt-2 text-xs font-semibold text-[var(--space-semantic-danger)]">{roadmapError}</p>
          )}
          <button
            type="button"
            onClick={generateRoadmap}
            disabled={roadmapGenerating}
            className={`mt-3 w-full rounded-xl px-4 py-2.5 text-sm font-semibold ${tw.button.primary} disabled:opacity-60`}
            data-testid="button-generate-roadmap"
          >
            {roadmapGenerating ? (
              <span className="inline-flex items-center justify-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Building your roadmap…
              </span>
            ) : (
              'Generate My Roadmap'
            )}
          </button>
        </div>

        {facts.length > 0 && (
          <div>
            <p className={sectionLabel}>Program facts — verified where we have them</p>
            <div className="mt-2 space-y-2">
              {facts.map(({ label, value }) => (
                <div key={label} className="rounded-xl bg-[var(--space-surface-muted)] px-3 py-2.5">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--space-text-muted)]">{label}</p>
                  <p className="mt-0.5 text-xs leading-5 text-[var(--space-text-secondary)]">{value}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <p className="text-[10px] leading-4 text-[var(--space-text-muted)]">
          Match scores are directional estimates from the founder-verified dataset — never admission odds. Where details read “coming soon” they haven’t been verified yet; always confirm dates on the company’s careers page.
        </p>
      </div>

      <div className="flex-shrink-0 border-t border-[var(--space-border-default)] bg-[var(--space-surface-card)] px-4 py-3">
        <button
          type="button"
          onClick={startProgramDrill}
          className={`w-full rounded-xl px-4 py-2.5 text-sm font-semibold ${tw.button.primary}`}
          data-testid="button-program-guide-drill"
        >
          Start Case Pool for this program
        </button>
        <p className="mt-1.5 text-center text-[10px] leading-tight text-[var(--space-text-muted)]">
          Opens the practice room preset to {DRILL_CASE_TYPE_LABELS[drillTypes[0].id] || 'the most relevant case type'} for{' '}
          {program.program || program.company} — and your guide stays saved with your direction.
        </p>
      </div>
    </section>
  );
}

/* ============================================================================
 * Editable CV preview panel
 *
 * When Mate parses a CV it emits a ```cvprofile fenced block. This panel opens
 * on the RIGHT side of the chat (same footprint as the side app panel the
 * Case Pool app opens in) and lets the candidate correct any wrongly-parsed
 * field BEFORE the direction is generated. On confirm, the corrected profile
 * is sent back to Mate and becomes the profile the fit logic runs on — so a
 * bad parse never produces a wrong recommendation.
 * ==========================================================================*/

interface CvInternship {
  organization: string;
  role: string;
  sector: string;
  duration: string;
  description: string;
}

interface CvProfileData {
  name: string;
  major: string;
  graduation_year: string;
  year_of_study: string;
  gpa: string;
  internship_history: CvInternship[];
  activities: string[];
  skills: string[];
  english_certificates: string[];
  standout_points: string[];
}

const CV_PROFILE_CONFIRM_PREFIX = 'CONFIRMED CV PROFILE';

// Wide (md+) viewports render the CV preview panel BESIDE the chat column,
// so auto-opening it never covers the intake form; narrow viewports render
// it as a full-screen overlay, so mid-questions we surface an in-form
// "review & edit" card instead of auto-opening.
function isWideViewport(): boolean {
  try {
    return typeof window !== 'undefined' && window.matchMedia('(min-width: 768px)').matches;
  } catch (e) {
    return false;
  }
}

// What the multiple-choice gap-fill captured, parsed back from the
// candidate's submitted answers: raw answers by question id, which CV panel
// fields are now LOCKED (the tap-to-answer form is their source of truth),
// the values auto-derived for those fields, and a read-only summary of the
// preference answers (target industry, function, timeline, ...).
interface McCapture {
  answers: Record<string, string>;
  locked: Record<string, boolean>;
  derived: { gpa?: string; graduation_year?: string; year_of_study?: string; english_certificate?: string };
  summary: Array<{ label: string; value: string }>;
}

function normalizeCvProfile(parsed: any): CvProfileData | null {
  if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return null;
  const str = (v: any) => (v == null ? '' : String(v));
  const list = (v: any) => (Array.isArray(v) ? v.map((x: any) => String(x)).filter(Boolean) : []);
  const internships: CvInternship[] = Array.isArray(parsed.internship_history)
    ? parsed.internship_history
        .filter((i: any) => i && typeof i === 'object')
        .map((i: any) => ({
          organization: str(i.organization),
          role: str(i.role),
          sector: str(i.sector),
          duration: str(i.duration),
          description: str(i.description),
        }))
    : [];
  return {
    name: str(parsed.name),
    major: str(parsed.major),
    graduation_year: str(parsed.graduation_year),
    year_of_study: str(parsed.year_of_study),
    gpa: str(parsed.gpa),
    internship_history: internships,
    activities: list(parsed.activities),
    skills: list(parsed.skills),
    english_certificates: list(parsed.english_certificates),
    standout_points: list(parsed.standout_points),
  };
}

function extractCvProfileBlock(text: string): {
  body: string;
  profile: CvProfileData | null;
  raw: string | null;
} {
  const match = text.match(/```cvprofile\s*\n([\s\S]*?)```/);
  if (!match || match.index === undefined) return { body: text, profile: null, raw: null };
  const stripped = (text.slice(0, match.index) + text.slice(match.index + match[0].length)).trim();
  try {
    const profile = normalizeCvProfile(JSON.parse(match[1]));
    if (!profile) return { body: stripped, profile: null, raw: null };
    return { body: stripped, profile, raw: match[1].trim() };
  } catch (e) {
    return { body: stripped, profile: null, raw: null };
  }
}

function linesToList(value: string): string[] {
  return value
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean);
}

function CvPreviewPanel({
  open,
  raw,
  profile,
  busy,
  sent,
  mcCapture,
  replacing,
  replaceStalled,
  onSend,
  onClose,
}: {
  open: boolean;
  raw: string;
  profile: CvProfileData;
  busy: boolean;
  sent: boolean;
  mcCapture?: McCapture | null;
  /** v1.2: a NEW resume is being analyzed to replace the one shown here. */
  replacing?: boolean;
  /** v1.2: the replacement analysis stalled — show a graceful error, no spinner. */
  replaceStalled?: boolean;
  onSend: (correctedJson: string) => void;
  onClose: () => void;
}) {
  const [draft, setDraft] = useState<CvProfileData>(profile);
  const [activitiesText, setActivitiesText] = useState(profile.activities.join('\n'));
  const [skillsText, setSkillsText] = useState(profile.skills.join('\n'));
  const [certsText, setCertsText] = useState(profile.english_certificates.join('\n'));
  const [standoutText, setStandoutText] = useState(profile.standout_points.join('\n'));
  const [dirty, setDirty] = useState(false);

  // Auto-update from the multiple-choice gap-fill: answers the candidate
  // already tapped flow straight into the matching CV fields (no re-entry),
  // and those fields lock read-only — the tap-to-answer form is their source
  // of truth. Everything MC didn't cover stays editable.
  const appliedCaptureRef = useRef('');
  useEffect(() => {
    if (!mcCapture) return;
    const signature = JSON.stringify(mcCapture.derived);
    if (appliedCaptureRef.current === signature) return;
    appliedCaptureRef.current = signature;
    const d = mcCapture.derived;
    setDraft((prev) => ({
      ...prev,
      gpa: d.gpa !== undefined ? d.gpa : prev.gpa,
      graduation_year: d.graduation_year !== undefined ? d.graduation_year : prev.graduation_year,
      year_of_study: d.year_of_study !== undefined ? d.year_of_study : prev.year_of_study,
    }));
    if (d.english_certificate) {
      const cert = d.english_certificate;
      setCertsText((prev) =>
        prev.toLowerCase().indexOf(cert.toLowerCase().slice(0, 12)) >= 0 ? prev : prev ? prev + '\n' + cert : cert,
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mcCapture]);

  const isLocked = (key: string) => !!(mcCapture && mcCapture.locked[key]);
  const lockTag = (
    <span className="ml-1 inline-flex items-center gap-0.5 text-[10px] font-medium normal-case tracking-normal text-[var(--space-text-accent)]">
      <Lock className="h-2.5 w-2.5" /> from your answers
    </span>
  );

  const patch = (fields: Partial<CvProfileData>) => {
    setDraft((prev) => ({ ...prev, ...fields }));
    setDirty(true);
  };

  const patchInternship = (index: number, fields: Partial<CvInternship>) => {
    setDraft((prev) => ({
      ...prev,
      internship_history: prev.internship_history.map((item, i) =>
        i === index ? { ...item, ...fields } : item,
      ),
    }));
    setDirty(true);
  };

  const handleSend = () => {
    if (busy) return;
    // Merge the edits over the ORIGINAL parse so fields the panel doesn't
    // surface (inferred_interests, cities_mentioned, …) survive untouched.
    let base: Record<string, any> = {};
    try {
      base = JSON.parse(raw);
    } catch (e) {
      base = {};
    }
    const corrected = {
      ...base,
      name: draft.name.trim() || null,
      major: draft.major.trim() || null,
      graduation_year: draft.graduation_year.trim() || null,
      year_of_study: draft.year_of_study.trim() || null,
      gpa: draft.gpa.trim() || null,
      internship_history: draft.internship_history
        .filter((item) => item.organization.trim() || item.role.trim() || item.description.trim())
        .map((item) => ({
          organization: item.organization.trim(),
          role: item.role.trim(),
          sector: item.sector.trim(),
          duration: item.duration.trim() || null,
          description: item.description.trim() || null,
        })),
      activities: linesToList(activitiesText),
      skills: linesToList(skillsText),
      english_certificates: linesToList(certsText),
      standout_points: linesToList(standoutText),
    };
    setDirty(false);
    onSend(JSON.stringify(corrected, null, 2));
  };

  const fieldClass =
    'w-full rounded-lg border border-[var(--space-border-default)] bg-[var(--space-surface-card)] px-2.5 py-1.5 text-sm text-[var(--space-text-primary)] placeholder:text-[var(--space-text-muted)] focus:border-[var(--space-brand-primary-500)] focus:outline-none';
  const labelClass = 'text-[11px] font-semibold uppercase tracking-wider text-[var(--space-text-muted)]';

  return (
    <section
      className="z-40 flex flex-col min-h-0 overflow-hidden border-[var(--space-border-default)] bg-[var(--space-surface-card)] max-md:fixed max-md:inset-0 md:w-[clamp(360px,42vw,680px)] md:flex-shrink-0 md:border-l"
      style={{ display: open ? undefined : 'none' }}
      data-testid="cv-preview-panel"
    >
      <div className="flex flex-shrink-0 items-center gap-2.5 border-b border-[var(--space-border-default)] bg-[var(--space-surface-accent-soft)] px-4 py-3">
        <FileText className="h-4 w-4 flex-shrink-0 text-[var(--space-text-brand)]" />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-[var(--space-text-primary)]">Your CV — as Mate read it</p>
          <p className="truncate text-[11px] text-[var(--space-text-secondary)]">Fix anything below before your direction is built</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg text-[var(--space-text-muted)] transition hover:bg-[var(--space-surface-muted)] hover:text-[var(--space-text-primary)]"
          title="Close CV preview"
          data-testid="button-close-cv-preview"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="flex-1 space-y-4 overflow-y-auto px-4 py-4">
        {/* v1.2: replacement-in-progress indicator — ABOVE the resume info so
            the candidate sees the old resume is being swapped out. It clears
            the moment the new parse renders (this panel re-keys on it). */}
        {replacing && (
          <div
            className="flex items-start gap-2.5 rounded-xl border border-[var(--space-brand-primary-200)] bg-[var(--space-surface-accent-soft)] px-3.5 py-3"
            role="status"
            aria-live="polite"
            data-testid="cv-replacing-indicator"
          >
            <Loader2 className="mt-0.5 h-5 w-5 flex-shrink-0 animate-spin text-[var(--space-text-brand)]" />
            <div className="min-w-0">
              <p className="text-sm font-semibold text-[var(--space-text-brand)]">Replacing this resume…</p>
              <p className="mt-0.5 text-[11px] leading-4 text-[var(--space-text-secondary)]">
                Mate is reading your NEW CV now — everything below still shows your previous resume and swaps over
                the moment the new analysis is ready.
              </p>
            </div>
          </div>
        )}
        {!replacing && replaceStalled && (
          <div
            className="rounded-xl border border-[var(--space-border-strong)] bg-[var(--space-surface-muted)] px-3.5 py-3"
            data-testid="cv-replace-stalled"
          >
            <p className="text-sm font-semibold text-[var(--space-semantic-danger)]">
              Your new CV couldn’t be read
            </p>
            <p className="mt-0.5 text-[11px] leading-4 text-[var(--space-text-secondary)]">
              The details below still show your PREVIOUS resume. Resend the new CV in the chat (upload, paste, or
              link) — or tap “Try analyzing my CV again” under the questions — and this panel updates the moment
              it’s read. Nothing was replaced or invented.
            </p>
          </div>
        )}
        <p className="text-xs leading-5 text-[var(--space-text-secondary)]">
          Mate matches you on what's below — not the raw file. Correct anything that was mis-read, then confirm.
        </p>

        {mcCapture && mcCapture.summary.length > 0 && (
          <div className="rounded-xl border border-[var(--space-brand-primary-200)] bg-[var(--space-surface-accent-soft)] p-3" data-testid="cv-mc-summary">
            <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-[var(--space-text-accent)]">
              <Lock className="h-3 w-3" /> Locked from your quick answers
            </p>
            <p className="mt-1 text-[11px] leading-4 text-[var(--space-text-secondary)]">
              These came straight from your tap-to-answer questions — they update automatically and can't be overwritten here. Ask Mate to redo the questions if something changed.
            </p>
            <div className="mt-2 space-y-1">
              {mcCapture.summary.map(({ label, value }) => (
                <div key={label} className="flex gap-2 text-xs leading-5">
                  <span className="w-32 flex-shrink-0 font-medium text-[var(--space-text-muted)]">{label}</span>
                  <span className="min-w-0 text-[var(--space-text-secondary)]">{value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 gap-2.5">
          <div className="col-span-2">
            <p className={labelClass}>Name</p>
            <input
              className={`${fieldClass} mt-1`}
              value={draft.name}
              onChange={(e) => patch({ name: e.target.value })}
              placeholder="Your name"
              data-testid="cv-field-name"
            />
          </div>
          <div className="col-span-2">
            <p className={labelClass}>Major & university</p>
            <input
              className={`${fieldClass} mt-1`}
              value={draft.major}
              onChange={(e) => patch({ major: e.target.value })}
              placeholder="e.g. International Business, Foreign Trade University"
              data-testid="cv-field-major"
            />
          </div>
          <div>
            <p className={labelClass}>Year of study{isLocked('year_of_study') && lockTag}</p>
            <input
              className={`${fieldClass} mt-1 ${isLocked('year_of_study') ? 'cursor-not-allowed bg-[var(--space-surface-muted)] text-[var(--space-text-muted)]' : ''}`}
              value={draft.year_of_study}
              onChange={(e) => patch({ year_of_study: e.target.value })}
              placeholder="e.g. final year"
              disabled={isLocked('year_of_study')}
              title={isLocked('year_of_study') ? 'Captured from your quick answers — locked' : undefined}
            />
          </div>
          <div>
            <p className={labelClass}>Graduation year{isLocked('graduation_year') && lockTag}</p>
            <input
              className={`${fieldClass} mt-1 ${isLocked('graduation_year') ? 'cursor-not-allowed bg-[var(--space-surface-muted)] text-[var(--space-text-muted)]' : ''}`}
              value={draft.graduation_year}
              onChange={(e) => patch({ graduation_year: e.target.value })}
              placeholder="e.g. 2027"
              disabled={isLocked('graduation_year')}
              title={isLocked('graduation_year') ? 'Captured from your quick answers — locked' : undefined}
            />
          </div>
          <div className="col-span-2">
            <p className={labelClass}>GPA{isLocked('gpa') && lockTag}</p>
            <input
              className={`${fieldClass} mt-1 ${isLocked('gpa') ? 'cursor-not-allowed bg-[var(--space-surface-muted)] text-[var(--space-text-muted)]' : ''}`}
              value={draft.gpa}
              onChange={(e) => patch({ gpa: e.target.value })}
              placeholder="e.g. 3.4/4.0 or 7.8/10"
              data-testid="cv-field-gpa"
              disabled={isLocked('gpa')}
              title={isLocked('gpa') ? 'Captured from your quick answers — locked' : undefined}
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <p className={labelClass}>Internships & experience</p>
            <button
              type="button"
              onClick={() => {
                setDraft((prev) => ({
                  ...prev,
                  internship_history: prev.internship_history.concat({
                    organization: '',
                    role: '',
                    sector: '',
                    duration: '',
                    description: '',
                  }),
                }));
                setDirty(true);
              }}
              className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-[11px] font-medium text-[var(--space-text-brand)] transition hover:bg-[var(--space-surface-accent-soft)]"
              data-testid="button-add-internship"
            >
              <Plus className="h-3 w-3" /> Add
            </button>
          </div>
          <div className="mt-1.5 space-y-2">
            {draft.internship_history.length === 0 && (
              <p className="rounded-lg bg-[var(--space-surface-muted)] px-3 py-2 text-xs text-[var(--space-text-muted)]">
                No internships found on your CV — add one if that's wrong.
              </p>
            )}
            {draft.internship_history.map((intern, i) => (
              <div key={i} className="space-y-1.5 rounded-xl border border-[var(--space-border-default)] bg-[var(--space-surface-muted)] p-2.5">
                <div className="flex items-center gap-1.5">
                  <input
                    className={fieldClass}
                    value={intern.organization}
                    onChange={(e) => patchInternship(i, { organization: e.target.value })}
                    placeholder="Organization"
                    data-testid={`cv-intern-org-${i}`}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setDraft((prev) => ({
                        ...prev,
                        internship_history: prev.internship_history.filter((_, j) => j !== i),
                      }));
                      setDirty(true);
                    }}
                    className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg text-[var(--space-text-muted)] transition hover:bg-[var(--space-surface-card)] hover:text-[var(--space-semantic-danger)]"
                    title="Remove this entry"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
                <input
                  className={fieldClass}
                  value={intern.role}
                  onChange={(e) => patchInternship(i, { role: e.target.value })}
                  placeholder="Role"
                />
                <div className="flex gap-1.5">
                  <input
                    className={fieldClass}
                    value={intern.sector}
                    onChange={(e) => patchInternship(i, { sector: e.target.value })}
                    placeholder="Sector (e.g. FMCG)"
                  />
                  <input
                    className={fieldClass}
                    value={intern.duration}
                    onChange={(e) => patchInternship(i, { duration: e.target.value })}
                    placeholder="Duration"
                  />
                </div>
                <div>
                  <p className="mb-1 mt-0.5 text-[10px] font-semibold uppercase tracking-wider text-[var(--space-text-muted)]">
                    Job description
                  </p>
                  <textarea
                    className={`${fieldClass} min-h-[72px] resize-y leading-5`}
                    rows={3}
                    value={intern.description}
                    onChange={(e) => patchInternship(i, { description: e.target.value })}
                    placeholder="Brief description of key responsibilities, achievements, or skills used…"
                    data-testid={`cv-intern-description-${i}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <p className={labelClass}>
            Activities, competitions & leadership <span className="font-normal normal-case">(one per line)</span>
          </p>
          <textarea
            className={`${fieldClass} mt-1 resize-y`}
            rows={3}
            value={activitiesText}
            onChange={(e) => {
              setActivitiesText(e.target.value);
              setDirty(true);
            }}
            placeholder={'e.g. Marketing club vice-president\nCase competition finalist'}
            data-testid="cv-field-activities"
          />
        </div>
        <div>
          <p className={labelClass}>
            Skills <span className="font-normal normal-case">(one per line)</span>
          </p>
          <textarea
            className={`${fieldClass} mt-1 resize-y`}
            rows={3}
            value={skillsText}
            onChange={(e) => {
              setSkillsText(e.target.value);
              setDirty(true);
            }}
            placeholder={'e.g. Excel\nSQL'}
          />
        </div>
        <div>
          <p className={labelClass}>
            English certificates <span className="font-normal normal-case">(one per line)</span>
            {isLocked('english_certificates') && lockTag}
          </p>
          <textarea
            className={`${fieldClass} mt-1 resize-y ${isLocked('english_certificates') ? 'cursor-not-allowed bg-[var(--space-surface-muted)] text-[var(--space-text-muted)]' : ''}`}
            rows={2}
            value={certsText}
            onChange={(e) => {
              setCertsText(e.target.value);
              setDirty(true);
            }}
            placeholder="e.g. IELTS 7.0"
            disabled={isLocked('english_certificates')}
            title={isLocked('english_certificates') ? 'Captured from your quick answers — locked' : undefined}
          />
        </div>
        <div>
          <p className={labelClass}>
            Strongest points <span className="font-normal normal-case">(one per line)</span>
          </p>
          <textarea
            className={`${fieldClass} mt-1 resize-y`}
            rows={3}
            value={standoutText}
            onChange={(e) => {
              setStandoutText(e.target.value);
              setDirty(true);
            }}
            placeholder="The 2-4 things that most differentiate you"
          />
        </div>
      </div>

      <div className="flex-shrink-0 border-t border-[var(--space-border-default)] bg-[var(--space-surface-card)] px-4 py-3">
        <p className="mb-2 rounded-lg bg-[var(--space-surface-accent-soft)] px-3 py-2 text-[11px] leading-4 text-[var(--space-text-accent)]" data-testid="cv-accuracy-note">
          Please re-read the details above and make sure they accurately reflect your experience before continuing — your entire direction is built from exactly what’s here.
        </p>
        {sent && !dirty ? (
          <div className="space-y-2.5">
            <p className="flex items-center justify-center gap-1.5 text-xs font-medium text-[var(--space-semantic-success)]">
              <CheckCircle2 className="h-4 w-4" /> Confirmed — Mate is using these details
            </p>
            <button
              type="button"
              onClick={onClose}
              disabled={busy}
              className={`w-full rounded-xl px-4 py-2.5 text-sm font-semibold ${tw.button.primary} disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50`}
              data-testid="button-continue-to-questions"
            >
              {busy ? 'Sending…' : 'Next — answer questions'}
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={handleSend}
            disabled={busy}
            className={`w-full rounded-xl px-4 py-2.5 text-sm font-semibold ${tw.button.primary} disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50`}
            data-testid="button-confirm-cv-profile"
          >
            {busy
              ? 'Sending…'
              : sent
                ? 'Send my corrections again'
                : dirty
                  ? 'Save corrections & continue'
                  : 'Looks right — continue'}
          </button>
        )}
        <p className="mt-1.5 text-center text-[10px] leading-tight text-[var(--space-text-muted)]">
          Your confirmed details are what the program matching runs on.
        </p>
      </div>
    </section>
  );
}

// Best-effort client-side DOCX text extraction: a .docx is a ZIP whose main
// content lives in word/document.xml. We locate that entry via the central
// directory, inflate it with the browser's DecompressionStream, and strip the
// XML down to plain text. Returns null on any failure (caller falls back to
// asking the candidate to paste their CV text).
async function extractDocxText(file: File): Promise<string | null> {
  try {
    const DecompressionStreamCtor = (globalThis as any).DecompressionStream;
    const buf = new Uint8Array(await file.arrayBuffer());
    const view = new DataView(buf.buffer);
    let eocd = -1;
    const scanFloor = Math.max(0, buf.length - 22 - 65536);
    for (let i = buf.length - 22; i >= scanFloor; i--) {
      if (view.getUint32(i, true) === 0x06054b50) {
        eocd = i;
        break;
      }
    }
    if (eocd < 0) return null;
    const entryCount = view.getUint16(eocd + 10, true);
    let offset = view.getUint32(eocd + 16, true);
    for (let i = 0; i < entryCount; i++) {
      if (view.getUint32(offset, true) !== 0x02014b50) return null;
      const compMethod = view.getUint16(offset + 10, true);
      const compSize = view.getUint32(offset + 20, true);
      const nameLen = view.getUint16(offset + 28, true);
      const extraLen = view.getUint16(offset + 30, true);
      const commentLen = view.getUint16(offset + 32, true);
      const localOffset = view.getUint32(offset + 42, true);
      const name = new TextDecoder().decode(buf.subarray(offset + 46, offset + 46 + nameLen));
      if (name === 'word/document.xml') {
        const lNameLen = view.getUint16(localOffset + 26, true);
        const lExtraLen = view.getUint16(localOffset + 28, true);
        const dataStart = localOffset + 30 + lNameLen + lExtraLen;
        const data = buf.subarray(dataStart, dataStart + compSize);
        let xmlBytes: Uint8Array;
        if (compMethod === 0) {
          xmlBytes = data;
        } else if (compMethod === 8 && typeof DecompressionStreamCtor === 'function') {
          const stream = new Blob([data]).stream().pipeThrough(new DecompressionStreamCtor('deflate-raw'));
          xmlBytes = new Uint8Array(await new Response(stream).arrayBuffer());
        } else {
          return null;
        }
        const xml = new TextDecoder().decode(xmlBytes);
        const text = xml
          .replace(/<w:p[ >]/g, '\n<w:p ')
          .replace(/<w:tab[^>]*\/>/g, '\t')
          .replace(/<[^>]+>/g, '')
          .replace(/&amp;/g, '&')
          .replace(/&lt;/g, '<')
          .replace(/&gt;/g, '>')
          .replace(/&quot;/g, '"')
          .replace(/&apos;/g, "'")
          .replace(/&#(\d+);/g, (_m, n) => String.fromCharCode(Number(n)))
          .replace(/\n{3,}/g, '\n\n')
          .trim();
        return text || null;
      }
      offset += 46 + nameLen + extraLen + commentLen;
    }
    return null;
  } catch (e) {
    return null;
  }
}

// localStorage flag that marks the first-visit onboarding nudge as dismissed.
// Once set (by tapping dismiss or by sending a first message) the nudge never
// appears again in that browser.
// v2: the original key was written for EVERY visitor by the auto-greeting
// dismiss bug (see hasUserMessages), so it no longer reflects a real
// dismissal. Bumping the key lets genuinely-new-to-the-tip visitors see it.
const ONBOARDING_TIP_DISMISSED_KEY = 'casemate-onboarding-dismissed-v2';

// ---------------------------------------------------------------------------
// Parallel CV+MCQ intake (v1.0 perceived-speed fix)
// ---------------------------------------------------------------------------
// The standard gap-fill questions, mirrored VERBATIM from the
// get_gap_questions hook's FIXED set (v6 — richer post-resume set: adds
// industry_curiosity, team_role, and the optional dealbreakers question for
// deeper industry-fit / function-fit signals) so the tap-to-answer form
// renders the INSTANT a CV is submitted, while analyze_cv runs in the
// background.
// When the hook's flow event lands, the authoritative set (these 12 + up to 2
// CV-gap extras appended at the end) swaps in, in place — identical ids and
// option strings mean every already-tapped answer survives the swap. If the
// hook's fixed set changes, mirror the change here.
const PARALLEL_INTAKE_QUESTIONS: GapQuestion[] = normalizeGapQuestionList([
  {
    id: 'industry_interest',
    label: 'Industries you like',
    question: 'Which of these worlds would you enjoy working in day to day? Tap all that sound good.',
    multi: true,
    options: [
      'Consumer goods (FMCG) — food, drinks, beauty, household brands people buy every day',
      'Retail & operations — supermarkets, stores, supply chains',
      'Finance & banking — money, markets, careful analysis',
      'Tech & e-commerce — apps, platforms, digital products',
      'Consulting & professional services — a new business problem every month',
      'Healthcare, logistics & telecom — the essential services behind daily life',
      'Nothing jumps out yet',
    ],
  },
  {
    id: 'fmcg_subvertical',
    label: 'FMCG products',
    question: 'If consumer goods (FMCG) appeals to you: which product worlds do you actually like? FMCG is not one thing — loving snacks doesn’t mean loving shampoo. Tap all that fit, or skip if FMCG isn’t your thing.',
    multi: true,
    optional: true,
    options: [
      'Food & dairy',
      'Beverages — soft drinks, beer, coffee',
      'Beauty & personal care',
      'Household & home care',
      'Health & nutrition products',
      'I like FMCG in general — any product world',
    ],
  },
  {
    id: 'industry_curiosity',
    label: 'What you follow',
    question: 'Outside class, which of these do you catch yourself reading or watching about for fun? What you already follow is often the truest industry signal. Tap all that fit.',
    multi: true,
    options: [
      'New brands, ads & consumer trends — why people buy what they buy',
      'How stores, apps & deliveries work behind the scenes',
      'Money, investing & the economy',
      'New apps, AI & tech products',
      'Business strategy stories — why companies win or fail',
      'Health, food & lifestyle',
      'None of these yet, honestly',
    ],
  },
  {
    id: 'function_interest',
    label: 'Kinds of work',
    question: 'Which kinds of work sound interesting to you? Tap all that apply — your results will only recommend functions you pick here.',
    multi: true,
    options: [
      'Marketing / Brand — campaigns, content, understanding customers',
      'Sales / Commercial — targets, customers, growing revenue',
      'Finance — budgets, analysis, investment',
      'Supply Chain & Operations — planning, logistics, making things run',
      'People / HR — hiring, culture, developing people',
      'Data & Digital — numbers, dashboards, digital tools',
      'Not sure yet — that’s exactly why I’m here',
    ],
  },
  {
    id: 'work_style',
    label: 'Work style',
    question: 'Which kind of problem sounds most fun to work on?',
    options: [
      'A clear goal where I build the plan and execute it',
      'A messy problem I have to structure from scratch',
      'Making something that already works better, step by step',
      'Winning people over — pitching, persuading, negotiating',
      'Depends entirely on the topic',
    ],
  },
  {
    id: 'team_role',
    label: 'Team role',
    question: 'In a group project, which role do you naturally end up taking?',
    options: [
      'The organizer — I split the work, set deadlines, and keep everyone moving',
      'The analyst — I own the numbers, the data, and the spreadsheet',
      'The presenter — I pitch, persuade, and handle the Q&A',
      'The idea person — I bring the creative angles and the story',
      'The finisher — I quietly make sure everything actually gets done well',
      'Depends on the team',
    ],
  },
  {
    id: 'environment',
    label: 'Environment',
    question: 'Where do you do your best work?',
    options: [
      'Fast-paced and competitive — I like the pressure',
      'Structured, with clear mentors and feedback',
      'A small team where I own a lot from day one',
      'Client-facing, with lots of variety and travel',
      'Not sure yet',
    ],
  },
  {
    id: 'dealbreakers',
    label: 'Rather avoid',
    question: 'Be honest — anything you’d rather AVOID in your first job? Your matches will steer around these. Tap all that apply, or skip if nothing bothers you.',
    multi: true,
    optional: true,
    options: [
      'Chasing sales targets & cold outreach',
      'Working with numbers & spreadsheets all day',
      'Frequent travel or being based far from home',
      'Factory, warehouse or field-visit days',
      'High-pressure deadlines & long hours',
      'None of these — I’m open to anything',
    ],
  },
  {
    id: 'mt_vs_consulting',
    label: 'MT vs consulting',
    question: 'Two classic paths after graduation — which sounds more like you?',
    options: [
      'Management Trainee (MT) — rotate through departments inside one big company',
      "Consulting — solve a different client's problem every few months",
      'Both sound good',
      "Honestly not sure — that's why I'm here",
    ],
  },
  {
    id: 'target_timeline',
    label: 'Your timeline',
    question: 'When do you want to send your applications (or land a role)?',
    options: [
      'Within 3 months — I want to move now',
      'Within 6 months',
      'Within a year',
      '1–2 years from now — I’m building my profile first',
      'No fixed timeline yet',
    ],
  },
  {
    id: 'relocation',
    label: 'Location',
    question: 'Where do you want to start your career? Tap all that work for you.',
    multi: true,
    options: ['Ho Chi Minh City', 'Hanoi', 'Da Nang', 'Anywhere in Vietnam', 'Open to going abroad'],
  },
  {
    id: 'target_program',
    label: 'Dream program',
    question: 'Already have one dream program in mind? Pick it (or type it) and your direction will put it front and centre — or just skip this.',
    optional: true,
    options: [
      'Unilever Future Leaders Programme (UFLP)',
      "L'Oréal SEEDZ",
      'Suntory PepsiCo Management Trainee',
      'Carlsberg Asia Graduate Trainee Programme 2026',
      'Central Retail Management Associate 2026',
      'AB InBev Dreamship Internship 2026',
      'Home Credit Home Racer 2026',
      'Shopee & Monee (SeaMoney) Global Development Program',
      'Nestlé #SparkTheNext Leaders MT 2026',
      'MoMo Talent 2026',
      'Techcombank Future Gen 2027',
      'Viettel Future Changemakers',
      'UOB Vietnam Management Associate',
      'Prudential The Strivers 2025',
      'Expeditors Management Trainee',
      'PropertyGuru Prodi-G Internship 2025',
      'P&G LEAD GEN 2026 (Internship)',
      'Deloitte Passport FY26 (Internship)',
      'EY Tax Services Internship 2027',
      'Abbott Internship Program 2025',
      'Another program — I’ll type it',
      'No preference / not sure yet',
    ],
    inputs: {
      'Another program — I’ll type it': 'Type the program name — e.g. "Carlsberg management trainee"',
    },
  },
]);

// The optional industry pre-filter — one chip per industry world behind the
// 20 verified programs. Labels resolve server-side inside run_fit_assessment
// (industry_filter param); skipping means all programs compete as before.
const INDUSTRY_FILTER_OPTIONS = [
  'FMCG — Cosmetics & Personal Care',
  'FMCG — Food & Beverage',
  'Retail',
  'Banking',
  'Consumer Finance & Fintech',
  'E-commerce & Digital Platforms',
  'Telecom & Technology',
  'Insurance',
  'Logistics & Supply Chain',
  'PropTech & Real Estate',
  'Consulting & Big 4',
  'Healthcare & Nutrition',
];

// Industries picked in the pre-filter ARE the candidate's industry interests
// — asking the "Industries you like" question again right below the filter
// reads as a duplicate (user feedback). Each filter label maps to the
// industry_interest option string(s) the scoring engine expects, so the
// question can be answered FOR the candidate and hidden from the form. The
// strings must stay identical to PARALLEL_INTAKE_QUESTIONS.
const INDUSTRY_FILTER_TO_INTEREST: Record<string, string[]> = {
  // v1.4: FMCG is split into two sector chips (cosmetics/personal care vs
  // food & beverage) so the server-side sector HARD-FILTER can keep e.g.
  // L'Oréal/Unilever while dropping Suntory PepsiCo — and vice versa. The
  // legacy whole-FMCG key stays for stored pending answers.
  'FMCG — Cosmetics & Personal Care': ['Consumer goods (FMCG) — food, drinks, beauty, household brands people buy every day'],
  'FMCG — Food & Beverage': ['Consumer goods (FMCG) — food, drinks, beauty, household brands people buy every day'],
  'FMCG & Consumer Goods': ['Consumer goods (FMCG) — food, drinks, beauty, household brands people buy every day'],
  Retail: ['Retail & operations — supermarkets, stores, supply chains'],
  Banking: ['Finance & banking — money, markets, careful analysis'],
  'Consumer Finance & Fintech': [
    'Finance & banking — money, markets, careful analysis',
    'Tech & e-commerce — apps, platforms, digital products',
  ],
  'E-commerce & Digital Platforms': ['Tech & e-commerce — apps, platforms, digital products'],
  'Telecom & Technology': [
    'Tech & e-commerce — apps, platforms, digital products',
    'Healthcare, logistics & telecom — the essential services behind daily life',
  ],
  Insurance: ['Finance & banking — money, markets, careful analysis'],
  'Logistics & Supply Chain': ['Healthcare, logistics & telecom — the essential services behind daily life'],
  'PropTech & Real Estate': ['Tech & e-commerce — apps, platforms, digital products'],
  'Consulting & Big 4': ['Consulting & professional services — a new business problem every month'],
  'Healthcare & Nutrition': ['Healthcare, logistics & telecom — the essential services behind daily life'],
};

function IndustryFilterCard({
  value,
  onChange,
  locked,
}: {
  /** null = untouched (matches everything), [] = explicitly skipped, else the chosen industries. */
  value: string[] | null;
  onChange: (next: string[] | null) => void;
  locked: boolean;
}) {
  const chosen = value || [];
  const skipped = value !== null && chosen.length === 0;
  const toggle = (label: string) => {
    if (locked) return;
    const has = chosen.indexOf(label) >= 0;
    onChange(has ? chosen.filter((l) => l !== label) : chosen.concat(label));
  };
  return (
    <div
      className="rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] px-4 py-3.5"
      data-testid="industry-filter-card"
    >
      <p className="text-sm font-semibold text-[var(--space-text-primary)]">
        Already know the industry you want?{' '}
        <span className="font-normal text-[var(--space-text-secondary)]">Filter to get faster results.</span>
      </p>
      <p className="mt-1 text-[11px] font-medium text-[var(--space-text-accent)]">
        Optional — not sure? Skip this. Figuring out your industry is exactly what we’re here for.
      </p>
      {!skipped && (
        <div className="mt-2.5 flex flex-wrap gap-1.5">
          {INDUSTRY_FILTER_OPTIONS.map((label) => {
            const isSelected = chosen.indexOf(label) >= 0;
            return (
              <button
                key={label}
                type="button"
                disabled={locked}
                onClick={() => toggle(label)}
                className={`inline-flex items-center gap-1 rounded-full border px-3 py-1.5 text-xs font-medium transition ${
                  isSelected
                    ? 'border-[var(--space-brand-primary-600)] bg-[var(--space-surface-accent-soft)] text-[var(--space-text-brand)]'
                    : locked
                      ? 'cursor-default border-[var(--space-border-default)] bg-[var(--space-surface-muted)] text-[var(--space-text-muted)]'
                      : 'border-[var(--space-border-default)] bg-[var(--space-surface-card)] text-[var(--space-text-secondary)] hover:border-[var(--space-brand-primary-500)] hover:bg-[var(--space-surface-accent-soft)]'
                }`}
                data-testid={`industry-filter-${label.slice(0, 18)}`}
              >
                {isSelected && <Check className="h-3 w-3" />}
                {label}
              </button>
            );
          })}
        </div>
      )}
      <div className="mt-2.5 flex flex-wrap items-center justify-between gap-2">
        <p className="text-xs text-[var(--space-text-muted)]">
          {chosen.length > 0
            ? `Matching only: ${chosen.join(' · ')} — and the “Industries you like” question is answered for you below, so you won’t be asked twice.`
            : skipped
              ? 'No filter — matching across all 20 verified programs.'
              : 'Pick one or more, or skip in one tap.'}
        </p>
        {!locked && (
          <button
            type="button"
            onClick={() => onChange(skipped ? null : [])}
            className="rounded-full border border-[var(--space-border-default)] bg-[var(--space-surface-card)] px-3 py-1.5 text-xs font-semibold text-[var(--space-text-brand)] transition hover:border-[var(--space-border-strong)] hover:bg-[var(--space-surface-accent-soft)]"
            data-testid="button-industry-filter-skip"
          >
            {skipped
              ? 'Changed my mind — pick industries'
              : chosen.length > 0
                ? 'Clear — show me everything'
                : 'Not sure yet — show me everything'}
          </button>
        )}
      </div>
    </div>
  );
}

// A user message "looks like a CV submission" when it carries a PDF
// attachment, starts with the Upload-CV phrasing, is a long paste, or is
// essentially just a document link — mirroring what Mate treats as CV intake.
const CV_LINK_PATTERN = /docs\.google\.com\/document|drive\.google\.com\/|dropbox\.com\/|\.pdf(\b|$)/i;
function looksLikeCvSubmission(m: ChatMessage): boolean {
  if (m.role !== 'user') return false;
  const attachments = Array.isArray((m as any).attachments) ? (m as any).attachments : [];
  const hasPdf = attachments.some(
    (a: any) =>
      String((a && a.contentType) || '').toLowerCase().indexOf('pdf') >= 0 ||
      /\.pdf$/i.test(String((a && a.originalName) || '')),
  );
  const t = typeof m.content === 'string' ? m.content : '';
  if (t.startsWith('[SYSTEM:') || t.startsWith('Here are my answers') || t.startsWith(CV_PROFILE_CONFIRM_PREFIX)) {
    return false;
  }
  if (hasPdf) return true;
  const trimmed = t.trim();
  if (/^here'?s my cv/i.test(trimmed)) return true;
  if (trimmed.length > 600) return true;
  const urlMatch = trimmed.match(/https?:\/\/[^\s<>"')]+/);
  if (urlMatch && trimmed.replace(urlMatch[0], '').trim().length < 200 && CV_LINK_PATTERN.test(urlMatch[0])) {
    return true;
  }
  return false;
}

export default function AgentChatView({ runtime }: AgentChatViewProps) {
  const {
    messages,
    streamingContent,
    isStreaming,
    loading,
    lastAction,
    isLoadingHistory,
    hasLoadedHistory,
    input,
    setInput,
    pendingAttachments,
    isUploadingAttachment,
    isDraggingOver,
    messagesEndRef,
    textareaRef,
    fileInputRef,
    dropZoneRef,
    abortStream,
    sendMessage,
    sendMessageWithContent,
    removeAttachment,
    handleFileSelect,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handlePaste,
    handleKeyDown,
    greetingPrompt,
    isConfigLoaded,
    greetingSent,
    welcomeInjectedSource,
    isBeaconSpace,
    agentLabel,
    thinkingText,
    beaconIntake,
    beaconStarterPrompts,
    starterPrompts,
    shortcutPrefix,
  } = runtime;

  // Only count REAL visitor messages. The runtime auto-sends the greeting
  // prompt as a hidden '[SYSTEM: …]' message with role 'user'
  // (greetingAutoSend), which used to flip this to true on first load — that
  // instantly dismissed the first-visit onboarding tip (and wrote its
  // localStorage flag), so brand-new visitors never saw it, and it also hid
  // the starter-prompt chips.
  const hasUserMessages = messages.some(
    (message) =>
      message.role === 'user' &&
      !(typeof message.content === 'string' && message.content.startsWith('[SYSTEM:')),
  );
  const shouldShowBeaconIntake = isBeaconSpace && !!beaconIntake && !hasUserMessages;

  // Which thread this view is rendering. The platform-managed AgentChat shell
  // doesn't forward its threadId prop, so the Desktop shell (which keys
  // AgentChat by thread) publishes the active id on window before render.
  // Secondary threads start CLEAN — the runtime never auto-greets there — so
  // the view must not wait for a greeting on them, and the saved-assessment
  // card stays in the primary conversation. Defaults to primary when the
  // global is absent (older shells), preserving previous behavior.
  const [activeThreadId] = useState<string>(() => {
    try {
      const t = (window as any).__audosActiveThreadId;
      return typeof t === 'string' && t ? t : 'main';
    } catch (e) {
      return 'main';
    }
  });
  const isPrimaryThread = activeThreadId === 'main';
  const composerPlaceholder = pendingAttachments.length > 0
    ? isBeaconSpace
      ? 'Add any context about these files...'
      : 'Add a message about the files...'
    : isBeaconSpace
      ? shouldShowBeaconIntake
        ? 'We can keep building from your starter plan, or you can tell me what changed...'
        : "Tell me what happened, or what you're worried about..."
      : `Paste your CV or a CV link (Google Docs, Drive, or PDF), or ask ${agentLabel} anything...`;

  const visibleMessages = messages.filter(
    (m) => !(m.role === 'user' && typeof m.content === 'string' && m.content.startsWith('[SYSTEM:')),
  );

  // --- Casemate CV intake + structured-block state --------------------------
  const cvFileInputRef = useRef<HTMLInputElement>(null);
  const [cvBusy, setCvBusy] = useState(false);
  const [cvNotice, setCvNotice] = useState<string | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // --- v1.5 per-conversation state scoping ----------------------------------
  // Root cause of the founder-reported "New conversation still shows the old
  // CV / direction" bug: the assessment stores (assessment_flow_events,
  // assessment_results, pending_mcq_answers, culture_fit_results) are scoped
  // per SESSION / ACCOUNT, not per conversation, so every thread rendered the
  // same newest rows. Rows are now mapped to the conversation that produced
  // them via the conversation_state_claims table: this view claims each row
  // the moment it lands during THIS conversation's own run, and every read
  // below filters to the active conversation. Rows WITHOUT a claim (all
  // pre-v1.5 data) belong to the primary conversation, so nothing existing is
  // lost — it just never leaks into a NEW conversation again.
  const identity = useMemo(readMcqIdentity, []);
  const claimsDb = (window as any).useWorkspaceDB('conversation_state_claims', {
    shared: true,
    filters: [{ column: 'user_key', operator: 'eq', value: identity.userKey }],
    orderBy: { column: 'id', direction: 'desc' },
    limit: 400,
  }) as { data: any[] | null; loading: boolean; refresh?: () => void };
  // Local claims cover the current page view instantly (and keep the scoping
  // working even if the server write fails); the DB rows make the mapping
  // durable across reloads, thread switches, and devices.
  const [localClaims, setLocalClaims] = useState<Record<string, string>>({});
  const claimOwnerByRow = useMemo(() => {
    const map: Record<string, string> = {};
    const rows = Array.isArray(claimsDb.data) ? claimsDb.data : [];
    // Rows arrive newest-first; walk oldest-first so the newest claim wins.
    for (let i = rows.length - 1; i >= 0; i--) {
      const r = rows[i];
      if (r && r.table_name && r.row_id != null && r.thread_id) {
        map[String(r.table_name) + ':' + Number(r.row_id)] = String(r.thread_id);
      }
    }
    Object.keys(localClaims).forEach((k) => {
      map[k] = localClaims[k];
    });
    return map;
  }, [claimsDb.data, localClaims]);
  // Which conversation a row belongs to — unclaimed rows fall back to the
  // primary conversation (legacy behavior for pre-v1.5 data).
  const rowConversation = (table: string, id: unknown) =>
    claimOwnerByRow[table + ':' + Number(id)] || 'main';
  const rowBelongsHere = (table: string) => (r: any) =>
    !!r && rowConversation(table, r.id) === activeThreadId;
  // Claims must have loaded once before session-scoped rows are trusted —
  // otherwise the primary conversation could briefly show rows that belong
  // to a sibling conversation.
  const claimsSettledRef = useRef(false);
  if (!claimsDb.loading || Array.isArray(claimsDb.data)) claimsSettledRef.current = true;
  const claimsSettled = claimsSettledRef.current;
  const claimRowForConversation = (table: string, id: number | null | undefined) => {
    if (id == null || !Number.isFinite(Number(id))) return;
    const key = table + ':' + Number(id);
    // Never re-claim, and never steal a row already owned by another
    // conversation.
    if (claimOwnerByRow[key]) return;
    setLocalClaims((prev) => (prev[key] ? prev : { ...prev, [key]: activeThreadId }));
    try {
      const db = (window as any).__workspaceDb;
      if (!db?.token) return;
      void db
        .from('conversation_state_claims')
        .insert({
          table_name: table,
          row_id: Number(id),
          thread_id: activeThreadId,
          user_key: identity.userKey,
        })
        .catch(() => {});
    } catch (e) {
      // The local claim still scopes this page view.
    }
  };

  // --- Live assessment flow (v0.6 speed fix) --------------------------------
  // The assessment engine saves each stage to WorkspaceDB the moment it runs
  // (analyze_cv → assessment_flow_events kind=cv_profile, get_gap_questions →
  // kind=gap_questions, run_fit_assessment → assessment_results). Rendering
  // straight from those rows means the candidate sees the CV panel, the
  // tap-to-answer form, and the full results card in SECONDS — instead of
  // waiting minutes for Mate to re-type multi-KB JSON blocks token by token
  // (the measured root cause of the 7–8 minute waits). Reads are scoped to
  // this visitor's session by the platform hook, same as ProgramGuidePanel.
  // Limits are sized so that after the v1.5 per-conversation filter there
  // are still enough rows left for the ACTIVE conversation even when sibling
  // conversations produced newer rows in the same session.
  const flowDb = (window as any).useWorkspaceDB('assessment_flow_events', {
    orderBy: { column: 'id', direction: 'desc' },
    limit: 30,
  }) as { data: any[] | null; loading: boolean; refresh?: () => void };
  const liveResultsDb = (window as any).useWorkspaceDB('assessment_results', {
    orderBy: { column: 'created_at', direction: 'desc' },
    limit: 10,
  }) as { data: any[] | null; loading: boolean; refresh?: () => void };

  // Poll while Mate's turn is in flight so rows render the moment they land;
  // one trailing refresh catches anything saved right at the end of a turn.
  const liveRefreshRef = useRef<() => void>(() => {});
  liveRefreshRef.current = () => {
    try {
      flowDb.refresh?.();
      liveResultsDb.refresh?.();
    } catch (e) {
      // Transient — the next poll retries.
    }
  };
  useEffect(() => {
    if (!loading) return;
    const timer = setInterval(() => liveRefreshRef.current(), 2000);
    return () => {
      clearInterval(timer);
      setTimeout(() => liveRefreshRef.current(), 900);
    };
  }, [loading]);

  const flowRowsAll = Array.isArray(flowDb.data) ? flowDb.data : [];
  const liveResultRowsAll = Array.isArray(liveResultsDb.data) ? liveResultsDb.data : [];
  // v1.5: only rows belonging to THIS conversation ever render here.
  const flowRows = claimsSettled ? flowRowsAll.filter(rowBelongsHere('assessment_flow_events')) : [];
  const liveResultRows = claimsSettled
    ? liveResultRowsAll.filter(rowBelongsHere('assessment_results'))
    : [];
  const newestCvRow = flowRows.find((r: any) => r && r.kind === 'cv_profile') || null;
  const newestQuestionsRow = flowRows.find((r: any) => r && r.kind === 'gap_questions') || null;
  const newestResultRow = liveResultRows[0] || null;

  // A run is "in flight" when assessment activity (CV parse / questions) is
  // newer than the last saved result — so a retake never shows the previous
  // run's card, and a returning visitor's old flow rows never re-open forms.
  const newestFlowAt = flowRows.length > 0 ? parseTimestampMs(flowRows[0].created_at) : 0;
  const newestResultAt = newestResultRow ? parseTimestampMs(newestResultRow.created_at) : 0;
  const runInProgress = newestFlowAt > newestResultAt;

  // v1.5: claim rows produced by THIS conversation's own turns the moment
  // they land. Baseline = the newest ids that existed when this view
  // mounted; anything newer that appears after this conversation has run a
  // turn was produced here (rows are only ever created by the visitor's own
  // active turn in this tab).
  // The baseline (and the "this conversation has run a turn" flag) survive
  // remounts within the tab via sessionStorage. Without this, a remount
  // mid-run (thread switch, opening/closing an app) recomputed the baseline
  // ABOVE rows this conversation had already produced — those rows were then
  // never claimed, fell back to the primary conversation, and this
  // conversation's own result card never appeared until a SECOND full run
  // (founder-reported: "Your Direction only shows after I submit the CV
  // again"). Persisting the first baseline keeps every row of the FIRST run
  // claimable, so the unified result renders on the first “Analyze”.
  const claimStateStorageKey =
    'casemate-claim-baseline-v1:' + identity.userKey + ':' + activeThreadId;
  const claimBaselineRef = useRef<{ flow: number; result: number } | null>(null);
  const conversationHasRunRef = useRef(false);
  if (claimBaselineRef.current == null) {
    try {
      const raw = sessionStorage.getItem(claimStateStorageKey);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (
          parsed &&
          Number.isFinite(Number(parsed.flow)) &&
          Number.isFinite(Number(parsed.result))
        ) {
          claimBaselineRef.current = { flow: Number(parsed.flow), result: Number(parsed.result) };
          if (parsed.hasRun) conversationHasRunRef.current = true;
        }
      }
    } catch (e) {
      // Private mode — the in-memory baseline still covers this mount.
    }
  }
  const persistClaimState = () => {
    try {
      const base = claimBaselineRef.current;
      if (!base) return;
      sessionStorage.setItem(
        claimStateStorageKey,
        JSON.stringify({ flow: base.flow, result: base.result, hasRun: conversationHasRunRef.current }),
      );
    } catch (e) {
      // Private mode — nothing to persist.
    }
  };
  if (loading && !conversationHasRunRef.current) {
    conversationHasRunRef.current = true;
    persistClaimState();
  }
  useEffect(() => {
    const maxId = (rows: any[]) =>
      rows.reduce((m: number, r: any) => Math.max(m, Number(r && r.id) || 0), 0);
    if (claimBaselineRef.current == null) {
      if (flowDb.loading || liveResultsDb.loading || !claimsSettled) return;
      claimBaselineRef.current = { flow: maxId(flowRowsAll), result: maxId(liveResultRowsAll) };
      persistClaimState();
      return;
    }
    if (!conversationHasRunRef.current) return;
    const base = claimBaselineRef.current;
    flowRowsAll.forEach((r: any) => {
      const id = Number(r && r.id);
      if (id > base.flow) claimRowForConversation('assessment_flow_events', id);
    });
    liveResultRowsAll.forEach((r: any) => {
      const id = Number(r && r.id);
      if (id > base.result) claimRowForConversation('assessment_results', id);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [claimsSettled, flowDb.data, liveResultsDb.data, loading]);

  const newestQuestionsRowId = newestQuestionsRow ? Number(newestQuestionsRow.id) : null;
  const liveQuestions = useMemo(() => {
    const parsed = normalizeGapQuestionList(parseJsonish(newestQuestionsRow && newestQuestionsRow.payload_json));
    return parsed.length > 0 ? parsed : null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newestQuestionsRowId]);
  const liveQuestionsSig = questionsSignature(liveQuestions);

  const newestResultRowId = newestResultRow ? Number(newestResultRow.id) : null;
  const liveDirection = useMemo(
    () => normalizeDirectionData(parseJsonish(newestResultRow && newestResultRow.result_json)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [newestResultRowId],
  );
  const liveDirectionSig = directionSignature(liveDirection);

  // What the transcript already renders as fenced blocks — the dedupe side of
  // the live rendering (older clients and fallback paths still emit blocks).
  const transcriptScan = useMemo(() => {
    const questionSigs: string[] = [];
    const directionSigs: string[] = [];
    const cvProfileSigs: string[] = [];
    messages.forEach((m) => {
      if (m.role !== 'assistant') return;
      const t = assistantRenderableText(m);
      if (!t) return;
      if (t.indexOf('```questions') >= 0) {
        const ext = extractQuestionsBlock(t);
        if (ext.questions) questionSigs.push(questionsSignature(ext.questions));
      }
      if (t.indexOf('```direction') >= 0) {
        const ext = extractDirectionBlock(t);
        if (ext.direction) directionSigs.push(directionSignature(ext.direction));
      }
      if (t.indexOf('```cvprofile') >= 0) {
        const ext = extractCvProfileBlock(t);
        if (ext.profile) cvProfileSigs.push(JSON.stringify(ext.profile));
      }
    });
    return { questionSigs, directionSigs, cvProfileSigs };
  }, [messages]);

  // Answers submitted from the live form carry a set marker so the flow state
  // survives reloads and retakes without comparing clocks.
  const liveAnswersMarker = newestQuestionsRowId != null ? `(set #${newestQuestionsRowId})` : null;
  const liveFormAnswered =
    !!liveAnswersMarker &&
    visibleMessages.some(
      (m) =>
        m.role === 'user' &&
        typeof m.content === 'string' &&
        m.content.startsWith('Here are my answers') &&
        m.content.indexOf(liveAnswersMarker) >= 0,
    );

  // Show the live tap-to-answer form while this run's question set has not
  // (yet) been rendered as a ```questions block by the transcript.
  const showLiveQuestionsForm =
    !!liveQuestions && runInProgress && transcriptScan.questionSigs.indexOf(liveQuestionsSig) < 0;

  // The live results card is renderable when the newest saved direction is
  // not already in the transcript as a ```direction block and no newer run is
  // in flight. Since v1.5 the rows above are already filtered to THIS
  // conversation (conversation_state_claims), so the OLD conversation's
  // result can no longer surface here; the showLiveDirectionCard gate below
  // stays as defense in depth.
  const liveDirectionRenderable =
    !!liveDirection &&
    !runInProgress &&
    transcriptScan.directionSigs.indexOf(liveDirectionSig) < 0;

  // A fresh result that landed during THIS page view — drives the completed
  // state of the step indicator.
  const [freshResultSeen, setFreshResultSeen] = useState(false);
  const prevResultIdRef = useRef<number | null | undefined>(undefined);
  useEffect(() => {
    // Wait for the claims map too — before it settles the filtered row set is
    // empty, and initializing the baseline from that would mis-flag the first
    // claimed row as "fresh" on every load.
    if (liveResultsDb.loading || !claimsSettled) return;
    if (prevResultIdRef.current === undefined) {
      prevResultIdRef.current = newestResultRowId;
      return;
    }
    if (newestResultRowId != null && newestResultRowId !== prevResultIdRef.current) {
      prevResultIdRef.current = newestResultRowId;
      setFreshResultSeen(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newestResultRowId, liveResultsDb.loading, claimsSettled]);

  // Editable CV preview panel (right side). When Mate emits a ```cvprofile
  // block after parsing a CV, the panel opens with the parsed fields so the
  // candidate can correct them before the direction is generated. (Declared
  // here, ahead of the parallel-intake block, because the intake snapshot
  // records which parse the panel was showing when a replacement CV arrived.)
  const [cvPreview, setCvPreview] = useState<{ raw: string; profile: CvProfileData } | null>(null);
  const [cvPreviewOpen, setCvPreviewOpen] = useState(false);
  const [cvPreviewSent, setCvPreviewSent] = useState(false);
  const seenCvProfileRef = useRef<string | null>(null);
  // Content signature of the profile currently in the panel — pairs the live
  // flow-event parse with the same parse when it (later) arrives as a
  // ```cvprofile block, so the panel (and any edits in it) is never reset.
  const cvPreviewSigRef = useRef<string>('');
  // UX fix #4: one "review & adjust your resume" toast per DISTINCT parse —
  // shown when the CV section (re)appears, never on plain re-renders.
  const cvEditToastSigRef = useRef<string>('');
  // UX fix #2: armed by "Save & continue" on the CV panel when the quick
  // answers are already stored — the combined analysis then fires by itself
  // the moment Mate finishes reading the corrected CV.
  const autoAnalysisArmedRef = useRef(false);

  // Program "how to get there" guide panel (right side) — opened by tapping
  // any program in a direction card.
  const [programGuide, setProgramGuide] = useState<{ program: DirectionProgram; direction: DirectionData } | null>(null);

  // --- Parallel CV+MCQ intake (v1.0 perceived-speed fix) --------------------
  // The instant a candidate submits their CV, the standard question form (and
  // the optional industry pre-filter) renders below while analyze_cv runs in
  // the background — no staring at a spinner. When get_gap_questions saves its
  // flow event, the authoritative set swaps in IN PLACE (fixed questions keep
  // their order; CV-gap extras append at the end) and tapped answers survive.
  // ONE combined Send fires only after BOTH the analysis is done AND the
  // questions are answered. The state is sticky, so a failed analysis never
  // wipes the candidate's taps — it resets only for a newer CV submission and
  // clears when this run's result lands.
  const lastCvSubmissionIdx = useMemo(() => {
    let idx = -1;
    visibleMessages.forEach((m, i) => {
      if (looksLikeCvSubmission(m)) idx = i;
    });
    return idx;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages]);
  const lastAnswersIdx = useMemo(() => {
    let idx = -1;
    visibleMessages.forEach((m, i) => {
      if (m.role === 'user' && typeof m.content === 'string' && m.content.startsWith('Here are my answers')) idx = i;
    });
    return idx;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages]);

  const [parallelIntake, setParallelIntake] = useState<{
    cvIdx: number;
    resultIdAtStart: number | null;
    // Signature of the parse the CV panel was showing when this intake
    // started — non-empty means an OLDER resume is on screen being REPLACED
    // (drives the replacement spinner in the CV side panel, v1.2).
    prevParseSig: string;
  } | null>(null);
  // null = untouched (matches everything), [] = explicitly skipped, else the chosen industries.
  const [industryFilter, setIndustryFilter] = useState<string[] | null>(null);

  // --- v1.3: MCQ popup, decoupled from CV analysis --------------------------
  // Real-user friction fix: the questions and the CV info used to share ONE
  // scroll column, so a replacement CV force-scrolled the questions away.
  // The questions now live in a floating popup (rendered OUTSIDE the scroll
  // container — see the JSX near the end), and “Send my answers” STORES the
  // answers per user in WorkspaceDB as pending input WITHOUT running the
  // analysis. The final combined analysis (final CV + stored answers) fires
  // later through the existing submit path via handleCombinedSubmit.
  // (identity is declared with the v1.5 conversation-scoping block above.)
  const pendingAnswersDb = (window as any).useWorkspaceDB('pending_mcq_answers', {
    shared: true,
    filters: [{ column: 'user_key', operator: 'eq', value: identity.userKey }],
    orderBy: { column: 'id', direction: 'desc' },
    limit: 10,
  }) as { data: any[] | null; loading: boolean; refresh?: () => void };
  const [savedAnswersLocal, setSavedAnswersLocal] = useState<{
    rowId: number | null;
    message: string;
    industryFilter: string[] | null;
    resultIdAtSave: number | null;
    error: boolean;
  } | null>(null);
  const [answersSaving, setAnswersSaving] = useState(false);
  const [combinedSubmitted, setCombinedSubmitted] = useState(false);
  // A pending answer row is marked submitted ONLY after a new result lands.
  // Marking it at button-click time lost the only durable copy when CV reading
  // or scoring failed and the candidate reloaded before retrying.
  const analysisAnswersRef = useRef<{ rowId: number | null; resultIdAtStart: number | null } | null>(null);
  // Order-agnostic intake: inline notice shown under the "Analyze" button
  // when the candidate clicks it while one of the two inputs (MCQ answers /
  // resume) is still missing — never a silent failure, never consumed answers.
  const [analyzeNotice, setAnalyzeNotice] = useState<string | null>(null);
  const [mcqMinimized, setMcqMinimized] = useState(false);
  const [mcqProgress, setMcqProgress] = useState<{ answered: number; total: number }>({ answered: 0, total: 0 });
  // “Answer again” support: bumping the epoch remounts the popup form empty,
  // and the redo timestamp suppresses pending rows saved before it.
  const [mcqFormEpoch, setMcqFormEpoch] = useState(0);
  const [answersRedoAfterMs, setAnswersRedoAfterMs] = useState(0);

  // --- v1.3.1 unified questionnaire: the culture-fit (OCP) + MBTI groups
  // live INSIDE the floating popup as Part 2 & 3 ---------------------------
  // Their taps are held here so they survive popup minimize/close, CV
  // replacement, and the form's redo remounts. Completed groups are computed
  // and persisted (the same culture_fit_results rows the v1.2 section
  // writes) the moment “Send my answers” fires; the direction card then
  // renders culture/job fit INLINE per matched program.
  const [ocpAnswers, setOcpAnswers] = useState<Record<string, number>>({});
  const [mbtiAnswers, setMbtiAnswers] = useState<Record<string, 'A' | 'B'>>({});
  const [localCorporatePayload, setLocalCorporatePayload] = useState<CorporatePayload | null>(null);
  const [localMbtiPayload, setLocalMbtiPayload] = useState<MbtiPayload | null>(null);
  // Part 4 — competitive ambition: 6 skippable MCQs.
  // Taps live here (same contract as the culture groups); the computed mode
  // persists as a culture_fit_results row (kind='appetite') on send.
  const [appetiteAnswers, setAppetiteAnswers] = useState<Record<string, number>>({});
  const [appetiteSkipped, setAppetiteSkipped] = useState(false);
  const [localAppetitePayload, setLocalAppetitePayload] = useState<AppetitePayload | null>(null);
  const cultureResultsDb = (window as any).useWorkspaceDB('culture_fit_results', {
    shared: true,
    filters: [{ column: 'user_key', operator: 'eq', value: identity.userKey }],
    orderBy: { column: 'id', direction: 'desc' },
    limit: 20,
  }) as { data: any[] | null; loading: boolean; refresh?: () => void };
  const cultureCompaniesDb = (window as any).useWorkspaceDB('culture_company_profiles', {
    shared: true,
    orderBy: { column: 'id', direction: 'desc' },
    limit: 30,
  }) as { data: any[] | null; loading: boolean; refresh?: () => void };
  const cultureCompanies = useMemo(
    () => companiesFromDbRows(cultureCompaniesDb.data),
    [cultureCompaniesDb.data],
  );
  // Community intel (social-listening pipeline): newest company_intelligence
  // row per company, shared read — the Direction card shows difficulty-to-
  // get-in, culture compatibility, and company challenges where a record
  // exists. Missing rows / an unpopulated table degrade to [] and nothing
  // renders (current behavior preserved).
  const companyIntelDb = (window as any).useWorkspaceDB('company_intelligence', {
    shared: true,
    orderBy: { column: 'id', direction: 'desc' },
    limit: 120,
  }) as { data: any[] | null; loading: boolean; refresh?: () => void };
  const companyIntelRecords = useMemo(() => parseIntelRows(companyIntelDb.data), [companyIntelDb.data]);
  // v1.5: saved culture-fit payloads are scoped to the conversation that
  // produced them — the old conversation's inline culture % never carries
  // into a new one (legacy unclaimed rows stay with the primary conversation).
  const savedCorporatePayload = useMemo<CorporatePayload | null>(() => {
    const rows = Array.isArray(cultureResultsDb.data) ? cultureResultsDb.data : [];
    const row = rows.find(
      (r: any) =>
        r && r.kind === 'corporate' && rowConversation('culture_fit_results', r.id) === activeThreadId,
    );
    const payload = row ? parseJsonish(row.payload_json) : null;
    return payload && Array.isArray(payload.results) && payload.results.length > 0 ? payload : null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cultureResultsDb.data, claimOwnerByRow, activeThreadId]);
  const savedMbtiPayload = useMemo<MbtiPayload | null>(() => {
    const rows = Array.isArray(cultureResultsDb.data) ? cultureResultsDb.data : [];
    const row = rows.find(
      (r: any) =>
        r && r.kind === 'mbti' && rowConversation('culture_fit_results', r.id) === activeThreadId,
    );
    const payload = row ? parseJsonish(row.payload_json) : null;
    return payload && typeof payload.type === 'string' && payload.type.length === 4 ? payload : null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cultureResultsDb.data, claimOwnerByRow, activeThreadId]);
  // The saved competitive-appetite payload — same storage + conversation
  // scoping as the culture payloads above.
  const savedAppetitePayload = useMemo<AppetitePayload | null>(() => {
    const rows = Array.isArray(cultureResultsDb.data) ? cultureResultsDb.data : [];
    const row = rows.find(
      (r: any) =>
        r && r.kind === 'appetite' && rowConversation('culture_fit_results', r.id) === activeThreadId,
    );
    const payload = row ? parseJsonish(row.payload_json) : null;
    return payload &&
      (payload.mode === 'ambitious' || payload.mode === 'balanced' || payload.mode === 'pragmatic')
      ? payload
      : null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cultureResultsDb.data, claimOwnerByRow, activeThreadId]);
  // What the direction card renders inline — a fresh local save wins so the
  // numbers appear the moment the result lands, before any read-back.
  const cultureFitInline = useMemo(
    () => ({
      corporate: localCorporatePayload || savedCorporatePayload,
      mbti: localMbtiPayload || savedMbtiPayload,
      companies: cultureCompanies,
    }),
    [localCorporatePayload, savedCorporatePayload, localMbtiPayload, savedMbtiPayload, cultureCompanies],
  );
  // Competitive appetite the direction card reorders/captions with — a fresh
  // local save wins so the banner appears the moment the result lands.
  const appetitePayloadInline = localAppetitePayload || savedAppetitePayload;
  const appetiteInline: CompetitiveAppetite | null = appetitePayloadInline ? appetitePayloadInline.mode : null;

  // The active stored answers: the local save from this page view wins;
  // otherwise the newest server-side pending row that is newer than the
  // user's newest result (so a finished run never resurrects old answers).
  const pendingAnswerRows = Array.isArray(pendingAnswersDb.data) ? pendingAnswersDb.data : [];
  // v1.5: pending answers are also scoped to the conversation that stored
  // them — answers saved in an older conversation never prefill (or get
  // silently submitted by) a new one.
  const newestPendingAnswersRow =
    (claimsSettled &&
      pendingAnswerRows.find(
        (r: any) =>
          r &&
          rowConversation('pending_mcq_answers', r.id) === activeThreadId &&
          String(r.status || 'pending') === 'pending' &&
          typeof r.answers_message === 'string' &&
          r.answers_message.startsWith('Here are my answers') &&
          parseTimestampMs(r.created_at) > newestResultAt &&
          parseTimestampMs(r.created_at) > answersRedoAfterMs,
      )) ||
    null;
  const storedAnswersFilterRaw = newestPendingAnswersRow
    ? parseJsonish(newestPendingAnswersRow.industry_filter)
    : null;
  const storedAnswers: { rowId: number | null; message: string; industryFilter: string[] | null } | null =
    savedAnswersLocal
      ? savedAnswersLocal
      : newestPendingAnswersRow
        ? {
            rowId: Number(newestPendingAnswersRow.id),
            message: String(newestPendingAnswersRow.answers_message),
            industryFilter: Array.isArray(storedAnswersFilterRaw) ? storedAnswersFilterRaw.map(String) : null,
          }
        : null;
  const answersStored = !!storedAnswers;

  // Activate only when the CV message was sent in THIS page session (Mate's
  // turn is in flight) — stale history on a reload never re-opens an old form
  // (the live flow-event path already covers reloads mid-run).
  useEffect(() => {
    if (!loading || liveResultsDb.loading) return;
    if (lastCvSubmissionIdx < 0 || lastCvSubmissionIdx <= lastAnswersIdx) return;
    if (parallelIntake && parallelIntake.cvIdx >= lastCvSubmissionIdx) return;
    setParallelIntake({
      cvIdx: lastCvSubmissionIdx,
      resultIdAtStart: newestResultRowId,
      prevParseSig: cvPreviewSigRef.current,
    });
    setIndustryFilter(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, lastCvSubmissionIdx, lastAnswersIdx, parallelIntake, newestResultRowId, liveResultsDb.loading]);

  // This run's result landed → the intake is done; the direction card takes over.
  useEffect(() => {
    if (!parallelIntake) return;
    if (newestResultRowId != null && newestResultRowId !== parallelIntake.resultIdAtStart) {
      setParallelIntake(null);
    }
  }, [parallelIntake, newestResultRowId]);

  // A landed result consumes the saved answers. Until that result exists the
  // row remains pending, so a failed CV read / analysis can be retried even
  // after reload without asking the candidate to answer everything again.
  useEffect(() => {
    const submitted = analysisAnswersRef.current;
    if (
      submitted &&
      newestResultRowId != null &&
      newestResultRowId !== submitted.resultIdAtStart
    ) {
      if (submitted.rowId != null) {
        try {
          const db = (window as any).__workspaceDb;
          if (db?.token) {
            void db.from('pending_mcq_answers').update(submitted.rowId, { status: 'submitted' }).catch(() => {});
          }
        } catch (e) {}
      }
      analysisAnswersRef.current = null;
    }
    if (
      savedAnswersLocal &&
      newestResultRowId != null &&
      newestResultRowId !== savedAnswersLocal.resultIdAtSave
    ) {
      setSavedAnswersLocal(null);
    }
  }, [savedAnswersLocal, newestResultRowId]);

  // Re-arm the combined-submit button when the turn it started has ended
  // (covers a failed turn — the user can simply hit “Analyze” again).
  useEffect(() => {
    if (!loading) setCombinedSubmitted(false);
  }, [loading]);

  // If the fallback fenced ```questions block was emitted after this CV (live
  // save failed), the transcript form owns the run — never show two forms.
  const questionsBlockAfterCv = useMemo(() => {
    if (!parallelIntake) return false;
    return visibleMessages.some(
      (m, i) => i > parallelIntake.cvIdx && m.role === 'assistant' && assistantRenderableText(m).indexOf('```questions') >= 0,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [parallelIntake, messages]);

  const parallelAnswered = !!parallelIntake && lastAnswersIdx > parallelIntake.cvIdx;
  // The live question set is authoritative for THIS run only once it is newer
  // than this run's CV parse — a retake briefly surfaces the PREVIOUS run's
  // question row, which must never swap in.
  const intakeCvRowId = newestCvRow ? Number(newestCvRow.id) : null;
  const parallelLiveQuestions =
    liveQuestions &&
    runInProgress &&
    newestQuestionsRowId != null &&
    (intakeCvRowId == null || newestQuestionsRowId > intakeCvRowId)
      ? liveQuestions
      : null;
  const parallelQuestions = parallelLiveQuestions || PARALLEL_INTAKE_QUESTIONS;
  // Order-agnostic fix (founder-reported: MCQ-first candidates were forced to
  // re-fill the questions): "Mate has read the CV" must NOT depend on the
  // question set landing AFTER the CV parse. When the candidate answered the
  // MCQ first, their gap_questions row predates analyze_cv's cv_profile row,
  // so parallelLiveQuestions (which requires questions NEWER than the parse)
  // stayed null forever — locking the "Analyze" button and showing a false
  // "couldn't read your CV" error. The CV counts as read the moment THIS
  // intake's parse is on screen: a cvPreview exists and it is not the
  // pre-replacement parse recorded when the intake started (prevParseSig).
  const cvParsedForIntake =
    !!cvPreview &&
    !(
      !!parallelIntake &&
      parallelIntake.prevParseSig !== '' &&
      cvPreviewSigRef.current === parallelIntake.prevParseSig
    );
  const parallelReadyToSend =
    (!!parallelLiveQuestions || cvParsedForIntake) && !loading && !streamingContent;
  const showParallelIntake = !!parallelIntake && !questionsBlockAfterCv;
  const parallelFilling = showParallelIntake && !parallelAnswered;
  const parallelAnalysisStalled =
    parallelFilling && !loading && !streamingContent && !parallelLiveQuestions && !cvParsedForIntake;

  // Explain the failure in terms of what the candidate actually sent. The
  // previous generic message hid link-permission and PDF-read failures, leaving
  // people with no next step even though their MCQ answers were safely stored.
  const stalledCvMessage = parallelIntake ? visibleMessages[parallelIntake.cvIdx] : null;
  const stalledCvText =
    stalledCvMessage && typeof stalledCvMessage.content === 'string' ? stalledCvMessage.content : '';
  const stalledCvAttachments = stalledCvMessage?.attachments || [];
  const stalledAssistantText = parallelIntake
    ? visibleMessages
        .slice(parallelIntake.cvIdx + 1)
        .filter((message) => message.role === 'assistant')
        .map((message) => assistantRenderableText(message))
        .join(' ')
        .toLowerCase()
    : '';
  const stalledFromGoogleLink = /https?:\/\/(docs|drive)\.google\.com/i.test(stalledCvText);
  const stalledFromCanva = /https?:\/\/[^\s]*canva\.com/i.test(stalledCvText);
  const stalledFromLink = /https?:\/\//i.test(stalledCvText);
  const stalledFromPdf =
    stalledCvAttachments.some(
      (attachment: any) =>
        attachment?.contentType === 'application/pdf' || /\.pdf$/i.test(String(attachment?.originalName || '')),
    ) || /\bpdf\b/i.test(stalledCvText);
  const cvFailureGuidance =
    stalledFromGoogleLink || /gdoc_access_denied|drive_access_denied|anyone with the link/i.test(stalledAssistantText)
      ? 'We couldn’t access this Google document. Set sharing to “Anyone with the link” (Viewer), then retry — or paste your CV text instead. Your answers are safe.'
      : stalledFromCanva || /canva_link_unreadable/i.test(stalledAssistantText)
        ? 'Canva viewer links can’t be read directly. In Canva choose Share → Download → PDF, then upload that PDF — or paste your CV text. Your answers are safe.'
        : stalledFromPdf || /pdf_link_unreadable/i.test(stalledAssistantText)
          ? 'We couldn’t read this PDF. Upload it once more, or paste the CV text instead. Your saved answers will stay here for the retry.'
          : stalledFromLink || /link_unreadable/i.test(stalledAssistantText)
            ? 'We couldn’t access this link. Make it publicly viewable, then retry — or paste your CV text instead. Your answers are safe.'
            : 'Mate couldn’t finish reading that CV. Retry once, or paste the CV text directly; your saved answers will not be lost.';
  const cvRetryPrompt =
    'Retry the CV I sent above now. Call analyze_cv on that exact CV or link. If it fails, return the specific error_code and actionable guidance (sharing permission, PDF re-upload, or paste text); do not give a generic error and do not ask me to repeat my saved quick-question answers.';

  // v1.3: the floating MCQ popup is MOUNTED (state preserved) for the whole
  // intake — minimizing or closing it only hides it, so taps always survive.
  // It auto-opens once when an intake starts.
  const mcqPopupMounted =
    !isBeaconSpace && ((showParallelIntake && !parallelAnswered) || (showLiveQuestionsForm && !!liveQuestions));
  const mcqPopupWasMountedRef = useRef(false);
  useEffect(() => {
    if (mcqPopupMounted && !mcqPopupWasMountedRef.current) setMcqMinimized(false);
    mcqPopupWasMountedRef.current = mcqPopupMounted;
  }, [mcqPopupMounted]);
  // The combined submit unlocks once Mate has read the (latest) CV — for the
  // parallel intake that means this run's authoritative question set landed —
  // and no turn is in flight. Mirrors the old inline form's Send gating.
  const combinedSubmitReady = showParallelIntake ? parallelReadyToSend : !loading && !streamingContent;

  // v1.2 fix (real-user report: a fit assessment run inside a "New
  // conversation" ended in a thin text answer with NO results card): the card
  // renders in the PRIMARY thread as before, and in a secondary thread ONLY
  // when the run actually happened there — a fresh result landed during this
  // page view, or this thread's own transcript contains the CV submission
  // that produced it. A brand-new empty conversation still never resurrects
  // an old result card.
  const showLiveDirectionCard =
    liveDirectionRenderable && (isPrimaryThread || freshResultSeen || lastCvSubmissionIdx >= 0);

  // v1.2 culture-fit layer: the OPTIONAL corporate-fit + MBTI step renders
  // right under the direction card — wherever a completed direction is
  // visible and no newer run is in flight. Transcript-rendered direction
  // blocks (legacy / fallback saves) count too, so those candidates also get
  // the optional step. Skipping or dismissing it never touches the core
  // assessment flow.
  const showCultureFitSection =
    !runInProgress &&
    ((showLiveDirectionCard && !!liveDirection) ||
      (isPrimaryThread && transcriptScan.directionSigs.length > 0));

  // v1.2: resume-REPLACEMENT feedback. While a new CV is being analyzed and
  // the side panel still shows the PREVIOUS resume's details, an explicit
  // "replacing" spinner sits above that info; it clears the instant the new
  // parse swaps in. If the analysis stalls, the panel shows a graceful error
  // instead — never a stuck spinner, never a hallucinated result.
  const panelShowsPreviousParse =
    !!parallelIntake &&
    parallelIntake.prevParseSig !== '' &&
    !!cvPreview &&
    cvPreviewSigRef.current === parallelIntake.prevParseSig;
  const cvReplacing = panelShowsPreviousParse && showParallelIntake && (loading || !!streamingContent);
  const cvReplaceStalled = panelShowsPreviousParse && parallelAnalysisStalled;

  // Make sure the panel (where the replacement spinner lives) is actually
  // visible when a replacement starts — wide viewports only; on narrow
  // screens the panel is a full-screen overlay that would cover the chat.
  const cvReplacingRef = useRef(false);
  useEffect(() => {
    if (cvReplacing && !cvReplacingRef.current && isWideViewport()) {
      setProgramGuide(null);
      setCvPreviewOpen(true);
    }
    cvReplacingRef.current = cvReplacing;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cvReplacing]);

  // v1.3: “Send my answers” STORES the answers (WorkspaceDB, keyed per user)
  // as pending input — analysis does NOT run yet, so the candidate can keep
  // editing / replacing their CV afterwards. Even if the server save fails,
  // the answers are kept in local state and the combined submit still works —
  // taps are never lost.
  const handleAnswersSave = async (message: string, answers: Record<string, string>) => {
    const filterVal = industryFilter;
    setAnswersSaving(true);
    let rowId: number | null = null;
    let failed = false;
    try {
      const db = (window as any).__workspaceDb;
      if (!db?.token) throw new Error('workspace db credentials unavailable');
      const res = await db.from('pending_mcq_answers').insert({
        user_key: identity.userKey,
        email: identity.email,
        question_set_id: newestQuestionsRowId,
        answers_json: JSON.stringify(answers || {}),
        answers_message: message,
        industry_filter: filterVal == null ? null : JSON.stringify(filterVal),
        status: 'pending',
      });
      const inserted = res && ((Array.isArray(res.data) ? res.data[0] : res.data) || res.row || res);
      rowId =
        inserted && inserted.id != null && Number.isFinite(Number(inserted.id)) ? Number(inserted.id) : null;
      // v1.5: bind the stored answers to THIS conversation.
      if (rowId != null) claimRowForConversation('pending_mcq_answers', rowId);
    } catch (e) {
      failed = true;
    }
    setSavedAnswersLocal({
      rowId,
      message,
      industryFilter: filterVal,
      resultIdAtSave: newestResultRowId,
      error: failed,
    });
    // UX fix #3: save confirmations are viewport bottom-right toasts (the
    // in-popup saved-state card still shows the full detail).
    if (!failed) showViewportToast('Saved your answers ✓');
    // v1.3.1 unified questionnaire: a COMPLETED optional group is computed
    // and persisted right now (same culture_fit_results rows the v1.2
    // section writes), so the result card can show culture fit / MBTI
    // inline. Partial or untouched groups are simply skipped — free matching
    // never depends on them. Persistence is fire-and-forget: local state
    // already renders the numbers for this page view even if it fails.
    const ocpComplete = OCP_ITEMS.every((i) => typeof ocpAnswers[i.id] === 'number');
    const mbtiComplete = MBTI_ITEMS.every((i) => mbtiAnswers[i.id] === 'A' || mbtiAnswers[i.id] === 'B');
    let corporatePayload: CorporatePayload | null = null;
    let mbtiPayload: MbtiPayload | null = null;
    if (ocpComplete) {
      const preferences = computePreferences(ocpAnswers);
      corporatePayload = {
        version: 2, // v2 = 9-axis preference vector (adds work_life_balance)
        answers: { ...ocpAnswers },
        preferences,
        results: rankCompanies(preferences, cultureCompanies),
        computed_at: new Date().toISOString(),
      };
      setLocalCorporatePayload(corporatePayload);
    }
    if (mbtiComplete) {
      const scored = scoreMbti(mbtiAnswers);
      mbtiPayload = {
        version: 1,
        answers: { ...mbtiAnswers },
        counts: scored.counts,
        type: scored.type,
        computed_at: new Date().toISOString(),
      };
      setLocalMbtiPayload(mbtiPayload);
    }
    // Part 4 — competitive appetite: ALWAYS computed on send. Fully answered
    // → total 0–12 → pragmatic / balanced / ambitious; skipped or incomplete
    // → the 'balanced' default (per the locked product rule).
    const appetiteComplete =
      !appetiteSkipped &&
      APPETITE_QUESTIONS.every((q) => typeof appetiteAnswers[q.id] === 'number');
    const appetiteTotal = appetiteComplete
      ? APPETITE_QUESTIONS.reduce((sum, q) => sum + (Number(appetiteAnswers[q.id]) || 0), 0)
      : 0;
    const appetitePayload: AppetitePayload = {
      version: 1,
      answers: appetiteComplete ? { ...appetiteAnswers } : {},
      total: appetiteTotal,
      mode: appetiteComplete ? scoreCompetitiveAppetite(appetiteTotal) : 'balanced',
      skipped: !appetiteComplete,
      computed_at: new Date().toISOString(),
    };
    setLocalAppetitePayload(appetitePayload);
    if (corporatePayload || mbtiPayload || appetitePayload) {
      void (async () => {
        try {
          const cdb = (window as any).__workspaceDb;
          if (!cdb?.token) return;
          // v1.5: claim each saved culture row for THIS conversation so its
          // inline numbers never leak into a sibling conversation.
          const claimCultureRow = (res: any) => {
            const row = res && ((Array.isArray(res.data) ? res.data[0] : res.data) || res.row || res);
            if (row && row.id != null && Number.isFinite(Number(row.id))) {
              claimRowForConversation('culture_fit_results', Number(row.id));
            }
          };
          if (corporatePayload) {
            claimCultureRow(
              await cdb.from('culture_fit_results').insert({
                user_key: identity.userKey,
                email: identity.email,
                kind: 'corporate',
                payload_json: corporatePayload,
                mbti_type: null,
              }),
            );
          }
          if (mbtiPayload) {
            claimCultureRow(
              await cdb.from('culture_fit_results').insert({
                user_key: identity.userKey,
                email: identity.email,
                kind: 'mbti',
                payload_json: mbtiPayload,
                mbti_type: mbtiPayload.type,
              }),
            );
          }
          claimCultureRow(
            await cdb.from('culture_fit_results').insert({
              user_key: identity.userKey,
              email: identity.email,
              kind: 'appetite',
              payload_json: appetitePayload,
              mbti_type: null,
            }),
          );
          try {
            cultureResultsDb.refresh?.();
          } catch (e) {
            // Next natural refresh picks it up.
          }
        } catch (e) {
          // Local state keeps the inline numbers for this page view.
        }
      })();
    }
    setAnswersSaving(false);
    // The candidate's next job is their CV — tuck the popup into its pill.
    setMcqMinimized(true);
    try {
      pendingAnswersDb.refresh?.();
    } catch (e) {
      // Next natural refresh picks it up.
    }
  };

  const handleAnswersRedo = () => {
    setSavedAnswersLocal(null);
    setAnswersRedoAfterMs(Date.now());
    setMcqFormEpoch((n) => n + 1);
    setCombinedSubmitted(false);
    setMcqMinimized(false);
    // v1.3.1: the optional culture groups redo together with the required
    // set — already-saved culture results stay valid until a new send
    // supersedes them.
    setOcpAnswers({});
    setMbtiAnswers({});
    setAppetiteAnswers({});
    setAppetiteSkipped(false);
  };

  // Order-agnostic intake: the resume side is "present" when any CV signal
  // exists in THIS conversation — a parse on screen, a cv_profile flow row
  // (claim-scoped, v1.5), or a CV submission in this thread's transcript.
  const resumePresent = !!cvPreview || !!newestCvRow || lastCvSubmissionIdx >= 0;
  // The "missing input" notice clears itself the moment the missing input
  // shows up (e.g. the candidate sends their CV after seeing it).
  useEffect(() => {
    if (resumePresent) setAnalyzeNotice(null);
  }, [resumePresent]);

  // v1.3 combined submit — the EXISTING analysis path, just fired later: the
  // stored answers go out in the exact v1.0 message format (set marker +
  // industry-filter line added at send time), so Mate analyses the FINAL CV
  // together with them. The analysis logic itself is untouched.
  const handleCombinedSubmit = () => {
    if (!combinedSubmitReady || combinedSubmitted) return;
    // Partial-state guard (order-agnostic intake): never silently fail — and
    // NEVER consume the saved answers — when one of the two inputs is still
    // missing. Say exactly what's missing instead; both inputs stay saved.
    if (!storedAnswers) {
      setAnalyzeNotice(
        'You haven’t answered the questions yet — open the “Quick questions” window and tap “Send my answers” first.',
      );
      return;
    }
    if (!resumePresent) {
      setAnalyzeNotice(
        'No resume yet — send your CV in the chat (upload a file, paste the text, or paste a CV link), then tap “Analyze” again. Your answers are safe.',
      );
      return;
    }
    setAnalyzeNotice(null);
    const marker = newestQuestionsRowId != null ? `(set #${newestQuestionsRowId})` : null;
    const withMarker = marker
      ? storedAnswers.message.replace('Here are my answers:', `Here are my answers ${marker}:`)
      : storedAnswers.message;
    const f = storedAnswers.industryFilter;
    const filterLine =
      f && f.length > 0
        ? `\nIndustry filter: ${f.join('; ')}`
        : '\nIndustry filter: (none — match across all 20 programs)';
    setCombinedSubmitted(true);
    analysisAnswersRef.current = {
      rowId: storedAnswers.rowId,
      resultIdAtStart: newestResultRowId,
    };
    void sendMessageWithContent(withMarker + filterLine, []);
  };

  // Dedupe (user feedback): when the candidate picks industries in the
  // pre-filter, the "Industries you like" question is the same question again
  // — derive its answer from the filter and hide it (plus hide the FMCG
  // product-worlds follow-up when FMCG isn't among the picks). Skipping the
  // filter keeps both questions — exactly the not-sure-yet audience they
  // exist for.
  const parallelPrefilledAnswers = useMemo(() => {
    if (!industryFilter || industryFilter.length === 0) return undefined;
    const opts: string[] = [];
    industryFilter.forEach((label) => {
      (INDUSTRY_FILTER_TO_INTEREST[label] || []).forEach((opt) => {
        if (opts.indexOf(opt) < 0) opts.push(opt);
      });
    });
    if (opts.length === 0) return undefined;
    const interestQ = parallelQuestions.find((q) => q.id === 'industry_interest');
    const ordered = interestQ
      ? opts.slice().sort((x, y) => interestQ.options.indexOf(x) - interestQ.options.indexOf(y))
      : opts;
    const result: Record<string, string> = { industry_interest: ordered.join('; ') };
    // v1.4 split-FMCG chips: each FMCG sector chip also answers the FMCG
    // product-worlds question for the candidate (cosmetics → beauty &
    // personal care; F&B → food & dairy + beverages), so the scoring engine
    // sees consistent sub-vertical preferences. The legacy whole-FMCG chip
    // keeps the question visible; no FMCG chip at all skips it.
    const fmcgSubOpts: string[] = [];
    if (industryFilter.indexOf('FMCG — Cosmetics & Personal Care') >= 0) {
      fmcgSubOpts.push('Beauty & personal care');
    }
    if (industryFilter.indexOf('FMCG — Food & Beverage') >= 0) {
      fmcgSubOpts.push('Food & dairy', 'Beverages — soft drinks, beer, coffee');
    }
    if (fmcgSubOpts.length > 0) result.fmcg_subvertical = fmcgSubOpts.join('; ');
    else if (industryFilter.indexOf('FMCG & Consumer Goods') < 0) result.fmcg_subvertical = '(skipped)';
    return result;
  }, [industryFilter, parallelQuestions]);

  // --- First-visit onboarding nudge ----------------------------------------
  // A small, non-blocking "here's how this works" card shown ONCE to
  // first-time visitors, positioned right above the composer / CV input.
  // Dismissing it writes a localStorage flag so it never appears again.
  const [onboardingTipVisible, setOnboardingTipVisible] = useState(false);
  const dismissOnboardingTip = () => {
    setOnboardingTipVisible(false);
    try {
      localStorage.setItem(ONBOARDING_TIP_DISMISSED_KEY, String(Date.now()));
    } catch (e) {
      // Private mode — dismissal lasts for this page load only.
    }
  };
  useEffect(() => {
    try {
      if (localStorage.getItem(ONBOARDING_TIP_DISMISSED_KEY)) return;
    } catch (e) {
      // Private mode — still show the nudge once for this page load.
    }
    setOnboardingTipVisible(true);
  }, []);
  // Sending a first message means the candidate has started the flow — count
  // that as "seen the ropes" so returning users never get the nudge again.
  useEffect(() => {
    if (onboardingTipVisible && hasUserMessages) dismissOnboardingTip();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onboardingTipVisible, hasUserMessages]);

  useEffect(() => {
    let latest: { raw: string; profile: CvProfileData } | null = null;
    let latestIdx = -1;
    let lastDirectionIdx = -1;
    visibleMessages.forEach((m, i) => {
      if (m.role !== 'assistant') return;
      const t = assistantRenderableText(m);
      if (!t) return;
      if (t.indexOf('```direction') >= 0) lastDirectionIdx = i;
      if (t.indexOf('```cvprofile') >= 0) {
        const ext = extractCvProfileBlock(t);
        if (ext.profile && ext.raw) {
          latest = { raw: ext.raw, profile: ext.profile };
          latestIdx = i;
        }
      }
    });
    if (latest && latest.raw !== seenCvProfileRef.current) {
      seenCvProfileRef.current = latest.raw;
      // The live flow event (assessment_flow_events) usually opens this panel
      // seconds earlier — when the block carries the SAME parse, keep the
      // panel (and any candidate edits in it) instead of resetting it.
      const latestSig = JSON.stringify((latest as { profile: CvProfileData }).profile);
      if (latestSig === cvPreviewSigRef.current) return;
      cvPreviewSigRef.current = latestSig;
      setCvPreview(latest);
      setCvPreviewSent(false);
      // UX fix #4: tell the customer the parsed resume is editable — once per
      // distinct parse, at the viewport bottom-right.
      if (cvEditToastSigRef.current !== latestSig) {
        cvEditToastSigRef.current = latestSig;
        showViewportToast('Review and adjust your resume if needed', { tone: 'info' });
      }
      // Auto-open only while the assessment is still in flight — once a
      // direction has been delivered after this parse, don't pop the panel.
      // v1.1 fix (founder report: the CV-edit step disappeared in the v1.0
      // parallel flow): on wide viewports the panel opens BESIDE the chat and
      // never covers the intake form, so auto-open even mid-questions; narrow
      // viewports keep the in-form "review & edit" card instead.
      if (latestIdx > lastDirectionIdx && (!parallelFilling || isWideViewport())) {
        setProgramGuide(null);
        setCvPreviewOpen(true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages]);

  // Live path: open the editable CV panel from the flow event the moment
  // analyze_cv saves it — no waiting for the ```cvprofile block to stream.
  const newestCvRowId = newestCvRow ? Number(newestCvRow.id) : null;
  useEffect(() => {
    if (newestCvRowId == null || !runInProgress) return;
    const payload = parseJsonish(newestCvRow && newestCvRow.payload_json);
    const profile = normalizeCvProfile(payload);
    if (!profile) return;
    const sig = JSON.stringify(profile);
    if (sig === cvPreviewSigRef.current) return;
    // If the transcript already rendered this same parse as a block (e.g.
    // after a reload), the block path owns it.
    if (transcriptScan.cvProfileSigs.indexOf(sig) >= 0) return;
    cvPreviewSigRef.current = sig;
    setCvPreview({ raw: JSON.stringify(payload, null, 2), profile });
    setCvPreviewSent(false);
    // UX fix #4: same once-per-parse "review & adjust" toast as the
    // transcript path — whichever path renders the parse first shows it.
    if (cvEditToastSigRef.current !== sig) {
      cvEditToastSigRef.current = sig;
      showViewportToast('Review and adjust your resume if needed', { tone: 'info' });
    }
    // v1.1 fix (founder report: the CV-edit step disappeared in the v1.0
    // parallel flow): on wide viewports the panel renders BESIDE the chat and
    // never covers the intake form, so auto-open it the moment the parse
    // lands — the candidate sees and can correct their scanned CV again
    // before the direction is built. On narrow viewports (full-screen
    // overlay) the prominent "review & edit" card inside the intake form
    // opens it on demand instead.
    if (!parallelFilling || isWideViewport()) {
      setProgramGuide(null);
      setCvPreviewOpen(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newestCvRowId, runInProgress, transcriptScan]);

  // Parse the candidate's submitted gap-fill answers back into
  // {question id → answer} so the CV panel can auto-update and lock the
  // fields the multiple-choice questions already captured.
  const mcCapture = useMemo<McCapture | null>(() => {
    let questions: GapQuestion[] | null = null;
    let answerMsg: ChatMessage | undefined;
    // Live path first: answers submitted from the DB-rendered form carry the
    // question-set marker, so they pair with the live question set directly.
    if (liveQuestions && liveAnswersMarker) {
      answerMsg = visibleMessages.find(
        (m) =>
          m.role === 'user' &&
          typeof m.content === 'string' &&
          m.content.startsWith('Here are my answers') &&
          m.content.indexOf(liveAnswersMarker) >= 0,
      );
      if (answerMsg) questions = liveQuestions;
    }
    if (!questions) {
      // Block path (fallback / older transcripts): the last ```questions
      // block plus the first answers message after it.
      let qIdx = -1;
      visibleMessages.forEach((m, i) => {
        if (m.role !== 'assistant') return;
        const t = assistantRenderableText(m);
        if (t.indexOf('```questions') < 0) return;
        const ext = extractQuestionsBlock(t);
        if (ext.questions) {
          qIdx = i;
          questions = ext.questions;
        }
      });
      if (qIdx < 0 || !questions) return null;
      answerMsg = visibleMessages.find(
        (m, i) =>
          i > qIdx && m.role === 'user' && typeof m.content === 'string' && m.content.startsWith('Here are my answers'),
      );
    }
    if (!answerMsg || typeof answerMsg.content !== 'string' || !questions) return null;

    const qs = questions as GapQuestion[];
    const answers: Record<string, string> = {};
    answerMsg.content.split('\n').forEach((line) => {
      const numbered = line.match(/^\s*(\d+)\.\s*(.*)$/);
      if (!numbered) return;
      const q = qs[parseInt(numbered[1], 10) - 1];
      if (!q) return;
      const rest = numbered[2];
      const expectedPrefix = (q.label || q.question) + ': ';
      const value = rest.startsWith(expectedPrefix)
        ? rest.slice(expectedPrefix.length)
        : rest.indexOf(': ') >= 0
          ? rest.slice(rest.indexOf(': ') + 2)
          : rest;
      const trimmed = value.trim();
      if (trimmed && trimmed !== '(skipped)') answers[q.id] = trimmed;
    });
    if (Object.keys(answers).length === 0) return null;

    // Typed follow-up values arrive as "Option — value" — take the value.
    const typedTail = (v: string) => {
      const parts = v.split(' \u2014 ');
      return parts.length > 1 ? parts[parts.length - 1].trim() : '';
    };

    const locked: Record<string, boolean> = {};
    const derived: McCapture['derived'] = {};
    const gpaAnswer = answers.gpa_band;
    if (gpaAnswer && !/prefer not/i.test(gpaAnswer)) {
      locked.gpa = true;
      derived.gpa = typedTail(gpaAnswer) || gpaAnswer;
    }
    const gradAnswer = answers.grad_status;
    if (gradAnswer) {
      locked.graduation_year = true;
      locked.year_of_study = true;
      const year = (gradAnswer.match(/20\d\d/) || [])[0];
      if (year) derived.graduation_year = year;
      if (/graduated/i.test(gradAnswer)) derived.year_of_study = 'Graduated';
      else if (/^other/i.test(gradAnswer)) derived.year_of_study = typedTail(gradAnswer) || gradAnswer;
      else derived.year_of_study = gradAnswer.split(' \u2014 ')[0];
    }
    const englishAnswer = answers.english_level;
    if (englishAnswer && !/prefer not/i.test(englishAnswer)) {
      locked.english_certificates = true;
      derived.english_certificate = englishAnswer;
    }

    const SUMMARY_LABELS: Array<[string, string]> = [
      ['industry_interest', 'Target industry'],
      ['fmcg_subvertical', 'FMCG products'],
      ['industry_curiosity', 'Follows for fun'],
      ['function_interest', 'Function preference'],
      ['team_role', 'Team role'],
      ['mt_vs_consulting', 'MT vs consulting'],
      ['target_timeline', 'Target timeline'],
      ['relocation', 'Location'],
      ['target_program', 'Target program'],
      ['internship_status', 'Internships'],
      ['work_style', 'Work style'],
      ['environment', 'Environment'],
      ['dealbreakers', 'Wants to avoid'],
    ];
    const summary = SUMMARY_LABELS.filter(([id]) => answers[id]).map(([id, label]) => ({ label, value: answers[id] }));
    return { answers, locked, derived, summary };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages, liveQuestions, liveAnswersMarker]);

  const handleCvPreviewSend = (correctedJson: string) => {
    setCvPreviewSent(true);
    // UX fix #2 + #3: confirm the save instantly with a viewport bottom-right
    // toast — no more wondering whether "Save and continue" did anything…
    showViewportToast('Saved your resume ✓');
    // …and when the quick-question answers are already stored, arm the
    // auto-run: the combined analysis (final CV + stored answers) fires by
    // itself right after Mate reads this correction, so the "thinking"
    // indicator the customer sees actually leads into the real analysis.
    autoAnalysisArmedRef.current = !!storedAnswers && !combinedSubmitted;
    void sendMessageWithContent(
      CV_PROFILE_CONFIRM_PREFIX +
        ' — I reviewed my parsed CV in the side panel. Use exactly these corrected details as my profile for the assessment (do not re-run analyze_cv):\n\n```json\n' +
        correctedJson +
        '\n```',
      [],
    );
  };

  // UX fix #2 (Option A): "Save and continue" on the CV panel auto-triggers
  // the analysis. The combined submit needs Mate to have finished reading the
  // corrected CV (combinedSubmitReady), so this effect fires it the moment
  // that gate opens — the customer never has to find the separate "Analyze"
  // button after saving their resume. Disarmed when no stored answers
  // exist yet (the questions still have to be answered first — the saved
  // toast above covers that path).
  useEffect(() => {
    if (!autoAnalysisArmedRef.current) return;
    if (combinedSubmitted || !storedAnswers) {
      autoAnalysisArmedRef.current = false;
      return;
    }
    if (combinedSubmitReady) {
      autoAnalysisArmedRef.current = false;
      handleCombinedSubmit();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [combinedSubmitted, combinedSubmitReady, storedAnswers, loading, streamingContent]);

  // UX guarantee: the conversation always follows the newest message. The
  // end-marker div sits directly inside the scroll container (for the
  // runtime's own scroll effect) and this effect covers it explicitly too.
  useEffect(() => {
    const el = scrollContainerRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, streamingContent, loading]);

  // Enter sends the message; Shift+Enter inserts a newline. Cmd/Ctrl+Enter
  // still works via the runtime's handler.
  const handleComposerKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey && !(e.nativeEvent as any)?.isComposing) {
      e.preventDefault();
      if (!loading && (input.trim() || pendingAttachments.length > 0)) {
        sendMessage();
      }
      return;
    }
    handleKeyDown(e);
  };

  let lastAssistantIdx = -1;
  visibleMessages.forEach((m, i) => {
    if (m.role === 'assistant' && assistantRenderableText(m)) lastAssistantIdx = i;
  });

  // "Result renders exactly once" guard (founder-reported duplicate): when
  // the SAME direction (by content signature) appears as a ```direction block
  // in MORE than one assistant message (e.g. a re-emitted fallback block),
  // only the LAST occurrence renders the card — earlier occurrences keep
  // their prose and drop the duplicate card.
  const lastDirectionBlockIdxBySig: Record<string, number> = {};
  visibleMessages.forEach((m, i) => {
    if (m.role !== 'assistant') return;
    const t = assistantRenderableText(m);
    if (!t || t.indexOf('```direction') < 0) return;
    const ext = extractDirectionBlock(t);
    if (ext.direction) lastDirectionBlockIdxBySig[directionSignature(ext.direction)] = i;
  });

  // The gap-fill questions form must stay tappable even when a later turn
  // lands after it (e.g. the candidate confirms the CV preview panel first,
  // and Mate replies) — otherwise the customer is told to "tap through the
  // questions" while every bar is locked. It stays interactive while it is
  // the LATEST questions block and no answers message has been sent after it.
  let lastQuestionsIdx = -1;
  visibleMessages.forEach((m, i) => {
    if (m.role === 'assistant' && assistantRenderableText(m).indexOf('```questions') >= 0) {
      lastQuestionsIdx = i;
    }
  });
  const questionsAnswered =
    (lastQuestionsIdx >= 0 &&
      visibleMessages.some(
        (m, i) =>
          i > lastQuestionsIdx &&
          m.role === 'user' &&
          typeof m.content === 'string' &&
          m.content.startsWith('Here are my answers'),
      )) ||
    liveFormAnswered;

  // --- Guided 3-step flow state (v0.6) ---------------------------------------
  // One fixed path: Step 1 add your CV → Step 2 quick questions → Step 3 your
  // fit + programs. Derived from the live flow rows plus the transcript, so it
  // survives reloads. The bar shows for candidates who have not finished a run
  // (or are re-running); returning visitors with a saved direction and no
  // active run don't need it.
  const anyAnswersMessage = visibleMessages.some(
    (m) => m.role === 'user' && typeof m.content === 'string' && m.content.startsWith('Here are my answers'),
  );
  const scoringSignal = typeof lastAction === 'string' && /run_fit_assessment/i.test(lastAction);
  const profileSignal = (!!newestCvRow && runInProgress) || transcriptScan.cvProfileSigs.length > 0;
  const questionsSignal = (!!liveQuestions && runInProgress) || lastQuestionsIdx >= 0 || showParallelIntake;
  const answersSignal = (runInProgress && (liveFormAnswered || anyAnswersMessage)) || scoringSignal;
  const assessmentStep: 1 | 2 | 3 | 4 =
    freshResultSeen && !runInProgress
      ? 4
      : answersSignal
        ? 3
        : questionsSignal || profileSignal
          ? 2
          : 1;
  // The live-flow poller refreshes flowDb/liveResultsDb every ~2s while
  // Mate's turn is in flight, and each refresh briefly flips `.loading` back
  // to true. Gating the step bar on the RAW loading flags made it unmount and
  // remount on every poll — a constant blink right while the candidate was
  // tapping through the quick questions (user-reported). Latch each source as
  // "settled" once its FIRST load completes instead: background refreshes
  // never hide the bar again, so it stays fixed at the top without flashing.
  const flowSettledRef = useRef(false);
  if (!flowDb.loading || Array.isArray(flowDb.data)) flowSettledRef.current = true;
  const liveResultsSettledRef = useRef(false);
  if (!liveResultsDb.loading || Array.isArray(liveResultsDb.data)) liveResultsSettledRef.current = true;

  const showStepBar =
    !isBeaconSpace &&
    hasLoadedHistory &&
    isConfigLoaded &&
    flowSettledRef.current &&
    liveResultsSettledRef.current &&
    claimsSettled &&
    // showParallelIntake is plain state (no polling dependency), so during
    // the parallel CV+MCQ intake the bar is guaranteed steady.
    (freshResultSeen || runInProgress || !newestResultRow || showParallelIntake);

  const streamingCut = streamingContent ? cutStreamingBlocks(streamingContent) : null;

  // Reads any CV file the candidate gives us (picker, drag-drop, or paste).
  // Word handling (user feedback): .docx is parsed client-side; legacy .doc
  // cannot be parsed in the browser, so we say exactly that — with the
  // export-as-PDF instruction — instead of failing silently. Every notice
  // names the REAL file format so nothing is ever mislabeled.
  const ingestCvFile = async (file: File) => {
    setCvNotice(null);
    const lower = file.name.toLowerCase();
    const isPdf = file.type === 'application/pdf' || lower.endsWith('.pdf');
    const isDocx =
      lower.endsWith('.docx') ||
      file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
    const isLegacyDoc = !isDocx && (lower.endsWith('.doc') || file.type === 'application/msword');

    // PDFs ride the existing attachment pipeline — Mate reads them natively.
    if (isPdf) {
      await handleFileSelect({ target: { files: [file] } } as any);
      setInput(input && input.trim() ? input : "Here's my CV — please take a look.");
      setCvNotice(`PDF attached (${file.name}) — hit send and ${agentLabel} will read it.`);
      return;
    }

    if (isLegacyDoc) {
      setCvNotice(
        `“${file.name}” is an old-format Word file (.doc), which isn't supported yet — please export it as PDF (File → Save As → PDF) and re-upload, or paste your CV text straight into the chat.`,
      );
      return;
    }

    // DOCX / TXT: extract the text client-side and send it as the message.
    setCvBusy(true);
    try {
      let text: string | null = null;
      if (isDocx) {
        text = await extractDocxText(file);
      } else if (lower.endsWith('.txt') || file.type.startsWith('text/')) {
        text = (await file.text()).trim() || null;
      } else {
        setCvNotice(
          `“${file.name}” isn't a format ${agentLabel} can read yet — upload a PDF, Word (.docx), or text file, or paste your CV text straight into the chat.`,
        );
        return;
      }
      if (text && text.length >= 40) {
        void sendMessageWithContent(
          `Here's my CV (from the ${isDocx ? 'Word file' : 'text file'} “${file.name}”):\n\n${text.slice(0, 14000)}`,
          [],
        );
      } else if (isDocx) {
        setCvNotice(
          `Couldn't read the Word file “${file.name}” — please export it as PDF (File → Save As → PDF) and re-upload, or paste your CV text straight into the chat.`,
        );
      } else {
        setCvNotice("Couldn't read that file — paste your CV text straight into the chat instead.");
      }
    } catch (err) {
      setCvNotice(
        `Couldn't read “${file.name}” — please export it as PDF and re-upload, or paste your CV text straight into the chat.`,
      );
    } finally {
      setCvBusy(false);
    }
  };

  const handleCvFileChange = async (e: { target: HTMLInputElement }) => {
    const file = e.target.files && e.target.files[0];
    if (cvFileInputRef.current) cvFileInputRef.current.value = '';
    if (!file || loading || cvBusy) return;
    await ingestCvFile(file);
  };

  // Word files dropped or pasted into the composer route through the CV
  // reader above instead of being silently ignored by the image/PDF
  // attachment pipeline (user feedback: Word uploads looked broken).
  const isWordFile = (f: File) => {
    const l = f.name.toLowerCase();
    return (
      l.endsWith('.docx') ||
      l.endsWith('.doc') ||
      f.type === 'application/msword' ||
      f.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    );
  };
  const handleComposerDrop = async (e: React.DragEvent) => {
    const files = Array.from(e.dataTransfer?.files || []);
    const word = files.find(isWordFile);
    // The runtime handler uploads images/PDFs and resets the drag state;
    // Word files are additionally routed through the CV reader.
    await handleDrop(e);
    if (word && !loading && !cvBusy) await ingestCvFile(word);
  };
  const handleComposerPaste = async (e: React.ClipboardEvent) => {
    const items = e.clipboardData?.items;
    if (items) {
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (item.kind === 'file') {
          const file = item.getAsFile();
          if (file && isWordFile(file)) {
            e.preventDefault();
            if (!loading && !cvBusy) await ingestCvFile(file);
            return;
          }
        }
      }
    }
    await handlePaste(e);
  };

  const renderMarkdownBlock = (text: string) => (
    <div className="prose prose-sm max-w-none text-sm sm:prose-base sm:text-base">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={markdownComponents}
        urlTransform={markdownUrlTransform}
      >
        {htmlToMarkdown(text)}
      </ReactMarkdown>
    </div>
  );

  const renderStringContent = (content: string, role: string, idx: number) => {
    if (role === 'user') {
      // Long pastes (usually the CV) collapse so the transcript stays readable.
      if (content.length > 700) {
        const isCvConfirm = content.startsWith(CV_PROFILE_CONFIRM_PREFIX);
        return (
          <details className="text-sm">
            <summary className="cursor-pointer font-medium text-[var(--space-text-secondary)]">
              {isCvConfirm
                ? 'Your corrected CV details — tap to view'
                : content.startsWith('Here are my answers')
                  ? 'Your answers — tap to view'
                  : `Your CV (${content.length.toLocaleString()} characters) — tap to view`}
            </summary>
            <pre className="mt-2 max-h-64 overflow-y-auto whitespace-pre-wrap rounded-lg bg-[var(--space-surface-muted)] p-3 text-xs text-[var(--space-text-secondary)]">
              {content}
            </pre>
          </details>
        );
      }
      return renderMarkdownBlock(content);
    }

    // Assistant text goes through the readability filter first: raw JSON
    // event payloads are reduced to natural-language text (or hidden).
    const readable = extractReadableAssistantText(content);
    if (!readable.trim()) return null;

    const dir = extractDirectionBlock(readable);
    if (dir.direction) {
      const directionData = dir.direction;
      // Duplicate guard: if this same direction renders again in a LATER
      // message, keep only this message's prose here — the card itself shows
      // exactly once, in its last position.
      const dirSig = directionSignature(directionData);
      if (
        lastDirectionBlockIdxBySig[dirSig] !== undefined &&
        lastDirectionBlockIdxBySig[dirSig] !== idx
      ) {
        const remainder = [dir.before, dir.after].filter(Boolean).join('\n\n');
        return remainder ? renderMarkdownBlock(remainder) : null;
      }
      return (
        <div>
          {dir.before && renderMarkdownBlock(dir.before)}
          <DirectionCard
            data={directionData}
            cultureFit={cultureFitInline}
            appetite={appetiteInline}
            intel={companyIntelRecords}
            onOpenProgram={(program) => {
              setCvPreviewOpen(false);
              setProgramGuide({ program, direction: directionData });
            }}
          />
          {dir.after && renderMarkdownBlock(dir.after)}
        </div>
      );
    }

    const cvExtract = extractCvProfileBlock(readable);
    const cvMarker =
      cvExtract.profile && cvExtract.raw ? (
        <button
          type="button"
          onClick={() => {
            if (!cvPreview || cvPreview.raw !== cvExtract.raw) {
              setCvPreview({ raw: cvExtract.raw as string, profile: cvExtract.profile as CvProfileData });
            }
            setProgramGuide(null);
            setCvPreviewOpen(true);
          }}
          className="mt-2 flex w-full items-center gap-2.5 rounded-xl border border-[var(--space-brand-primary-200)] bg-[var(--space-surface-accent-soft)] px-3.5 py-2.5 text-left transition hover:border-[var(--space-brand-primary-500)]"
          data-testid="button-open-cv-preview"
        >
          <FileText className="h-4 w-4 flex-shrink-0 text-[var(--space-text-brand)]" />
          <span className="text-sm font-medium text-[var(--space-text-brand)]">
            Your parsed CV is ready — review & correct it in the side panel
          </span>
        </button>
      ) : null;

    const q = extractQuestionsBlock(cvExtract.profile ? cvExtract.body : readable);
    if (q.questions) {
      // This run's question set is already rendered as the live DB-driven form
      // below (with the candidate's taps in it) — never show the same form
      // twice, and never re-open an already-answered live set.
      if (
        liveQuestions &&
        questionsSignature(q.questions) === liveQuestionsSig &&
        (showLiveQuestionsForm || liveFormAnswered)
      ) {
        if (!q.body && !cvMarker) return null;
        return (
          <div>
            {q.body && renderMarkdownBlock(q.body)}
            {cvMarker}
          </div>
        );
      }
      const interactive =
        idx === lastQuestionsIdx && !questionsAnswered && !loading && !streamingContent;
      return (
        <div>
          {q.body && renderMarkdownBlock(q.body)}
          {cvMarker}
          <QuestionsForm
            questions={q.questions}
            interactive={interactive}
            sending={loading || !!streamingContent}
            onSubmit={(message) => {
              void sendMessageWithContent(message, []);
            }}
          />
        </div>
      );
    }

    if (cvMarker) {
      return (
        <div>
          {cvExtract.body && renderMarkdownBlock(cvExtract.body)}
          {cvMarker}
        </div>
      );
    }

    const { body, block } = extractOptionsBlock(readable);
    if (!block) return renderMarkdownBlock(readable);

    const interactive = idx === lastAssistantIdx && !loading && !streamingContent;
    return (
      <div>
        {body && renderMarkdownBlock(body)}
        <div className="mt-3">
          <div className="flex flex-wrap gap-2">
            {block.options.map((option) => (
              <button
                key={option}
                type="button"
                disabled={!interactive}
                onClick={() => {
                  if (interactive) void sendMessageWithContent(option, []);
                }}
                className={
                  interactive
                    ? 'rounded-full border border-[var(--space-brand-primary-200)] bg-[var(--space-surface-card)] px-4 py-2 text-sm font-medium text-[var(--space-text-brand)] shadow-sm transition hover:border-[var(--space-brand-primary-500)] hover:bg-[var(--space-surface-accent-soft)]'
                    : 'cursor-default rounded-full border border-[var(--space-border-default)] bg-[var(--space-surface-muted)] px-4 py-2 text-sm text-[var(--space-text-muted)]'
                }
                data-testid={`option-chip-${option.slice(0, 24)}`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const isPending =
    isLoadingHistory ||
    !isConfigLoaded ||
    // The auto-greeting only ever fires on the PRIMARY thread — a fresh
    // secondary thread must not wait for it. (It used to: every "New
    // conversation" sat on the loading skeleton forever, which made the
    // feature look broken — user-reported.)
    (isPrimaryThread && !!greetingPrompt && !greetingSent) ||
    (greetingSent && !welcomeInjectedSource);

  const showPendingPlaceholder =
    visibleMessages.length === 0 &&
    !loading &&
    !streamingContent &&
    !shouldShowBeaconIntake &&
    isPending;

  const showEmptyStateWelcome =
    !isLoadingHistory &&
    hasLoadedHistory &&
    isConfigLoaded &&
    visibleMessages.length === 0 &&
    !greetingSent &&
    !greetingPrompt &&
    !shouldShowBeaconIntake;

  // Conversation-starter chips must be visible in the INITIAL state even when a
  // welcome assistant message has been injected (config.agent.welcomeMessage),
  // which makes visibleMessages non-empty and turns showEmptyStateWelcome off.
  // Gate on "no user messages yet" instead so the starters stay clickable until
  // the visitor sends their first message.
  const showStarterPromptsBelowWelcome =
    !isBeaconSpace &&
    !showEmptyStateWelcome &&
    !isLoadingHistory &&
    hasLoadedHistory &&
    isConfigLoaded &&
    !hasUserMessages &&
    !shouldShowBeaconIntake &&
    !loading &&
    !streamingContent &&
    starterPrompts.length > 0;

  const isHomeView =
    !isBeaconSpace &&
    !hasUserMessages &&
    hasLoadedHistory &&
    !isLoadingHistory &&
    isConfigLoaded &&
    !loading &&
    !streamingContent &&
    !shouldShowBeaconIntake &&
    !isPending;

  const firstAssistantMessage = visibleMessages.find((m) => m.role === 'assistant');
  const homeWelcomeText =
    typeof firstAssistantMessage?.content === 'string' && firstAssistantMessage.content.length <= 260
      ? firstAssistantMessage.content
      : '';

  // First-visit onboarding card — compact, dismissible, bilingual (VI/EN).
  // Rendered above the composer so it sits next to the CV input where the
  // flow starts. Never blocks anything; hidden once history shows the
  // candidate has already sent a message.
  const onboardingTipElement =
    onboardingTipVisible && !isBeaconSpace && hasLoadedHistory && !hasUserMessages ? (
      <div
        className="relative rounded-2xl border border-[var(--space-brand-highlight-200)] bg-[var(--space-surface-accent-soft)] px-4 py-3.5 shadow-sm"
        role="note"
        data-testid="onboarding-tip"
      >
        <button
          type="button"
          onClick={dismissOnboardingTip}
          className="absolute right-2.5 top-2.5 flex h-6 w-6 items-center justify-center rounded-full text-[var(--space-text-muted)] transition hover:bg-[var(--space-surface-card)] hover:text-[var(--space-text-primary)]"
          aria-label="Dismiss onboarding tip"
          data-testid="button-dismiss-onboarding"
        >
          <X className="h-3.5 w-3.5" />
        </button>
        <p className="flex items-center gap-1.5 pr-7 text-sm font-semibold text-[var(--space-text-primary)]">
          <Sparkles className="h-4 w-4 flex-shrink-0 text-[var(--space-brand-highlight-600)]" />
          First time at Casemate? Here’s how to start
        </p>
        <ol className="mt-2.5 space-y-1.5">
          {[
            ['Send your CV', 'upload it, paste the text, or drop a CV link'],
            ['Tap through a few quick questions', 'quick multiple-choice, no typing'],
            ['Get your direction', 'industry & function fit, matched programs, prep roadmap'],
          ].map(([vi, en], i) => (
            <li key={vi} className="flex items-start gap-2.5 text-sm leading-5 text-[var(--space-text-secondary)]">
              <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[var(--space-brand-highlight-600)] text-[11px] font-bold text-[var(--space-text-on-highlight)]">
                {i + 1}
              </span>
              <span>
                <span className="font-medium text-[var(--space-text-primary)]">{vi}</span>
                <span className="text-[var(--space-text-muted)]"> — {en}</span>
              </span>
            </li>
          ))}
        </ol>
        <button
          type="button"
          onClick={dismissOnboardingTip}
          className="mt-3 rounded-full bg-[var(--space-brand-highlight-600)] px-4 py-1.5 text-xs font-semibold text-[var(--space-text-on-highlight)] shadow-sm transition hover:bg-[var(--space-brand-highlight-700)]"
          data-testid="button-got-it-onboarding"
        >
          Let’s go!
        </button>
      </div>
    ) : null;

  const composerElement = (
    <>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileSelect}
          accept="image/*,application/pdf"
          multiple
          className="hidden"
          data-testid="input-file-attachment"
        />
        <input
          type="file"
          ref={cvFileInputRef}
          onChange={handleCvFileChange}
          accept=".pdf,.docx,.doc,.txt,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/msword,text/plain"
          className="hidden"
          data-testid="input-cv-upload"
        />

        <div
          ref={dropZoneRef}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleComposerDrop}
          className={`rounded-2xl border transition-all overflow-hidden shadow-[0_8px_28px_rgba(0,0,0,0.08),0_1px_3px_rgba(0,0,0,0.05)] focus-within:shadow-[0_10px_34px_rgba(0,0,0,0.11),0_1px_3px_rgba(0,0,0,0.05)] ${
            isDraggingOver
              ? 'border-[var(--space-brand-primary-500)] bg-[var(--space-surface-accent-soft)]'
              : 'border-[var(--space-border-default)] bg-[var(--space-surface-card)]'
          }`}
        >
          {isDraggingOver && (
            <div className="flex items-center justify-center py-3 px-4 bg-[var(--space-surface-accent-soft)] border-b border-[var(--space-border-default)]">
              <FileImage className="w-4 h-4 text-[var(--space-text-brand)] mr-2" />
              <span className="text-sm text-[var(--space-text-brand)] font-medium">Drop files here</span>
            </div>
          )}

          {pendingAttachments.length > 0 && (
            <div className="flex flex-wrap gap-2 px-3 pt-2">
              {pendingAttachments.map((attachment) => (
                <div
                  key={attachment.id}
                  className="relative flex items-center gap-1 px-2 py-1 bg-[var(--space-surface-card)] rounded-lg text-xs border border-[var(--space-border-default)]"
                  data-testid={`attachment-preview-${attachment.id}`}
                >
                  {attachment.contentType.startsWith('image/') ? (
                    <FileImage className="w-3 h-3 text-[var(--space-text-brand)]" />
                  ) : (
                    <File className="w-3 h-3 text-[var(--space-text-muted)]" />
                  )}
                  <span className="max-w-[100px] truncate text-[var(--space-text-secondary)]">
                    {attachment.originalName}
                  </span>
                  <button
                    onClick={() => removeAttachment(attachment.id)}
                    className="ml-1 text-[var(--space-text-muted)] hover:text-[var(--space-semantic-danger)]"
                    data-testid={`button-remove-attachment-${attachment.id}`}
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {cvNotice && (
            <div className="px-3 pt-2">
              <p className="text-xs font-medium text-[var(--space-text-accent)]">{cvNotice}</p>
            </div>
          )}

          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleComposerKeyDown}
            onPaste={handleComposerPaste}
            placeholder={composerPlaceholder}
            className="w-full resize-none border-0 bg-transparent px-4 py-3 text-base leading-5 focus:outline-none focus:ring-0"
            rows={1}
            disabled={loading}
            data-testid="textarea-instruction"
          />

          <div className="flex items-center justify-between px-2 pb-1">
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={loading || isUploadingAttachment || pendingAttachments.length >= 5}
                className="h-8 w-8 flex items-center justify-center rounded-xl hover:bg-[var(--space-surface-muted)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                data-testid="button-attach-file"
                title="Attach files (images, PDFs)"
              >
                {isUploadingAttachment ? (
                  <Loader2 className="w-4 h-4 animate-spin text-[var(--space-text-muted)]" />
                ) : (
                  <Paperclip className="w-4 h-4 text-[var(--space-text-muted)]" />
                )}
              </button>
              <button
                type="button"
                onClick={() => cvFileInputRef.current?.click()}
                disabled={loading || cvBusy || isUploadingAttachment}
                className="flex items-center gap-1.5 rounded-full border border-[var(--space-border-default)] bg-[var(--space-surface-card)] px-3 py-1.5 text-xs font-medium text-[var(--space-text-brand)] transition hover:border-[var(--space-border-strong)] hover:bg-[var(--space-surface-accent-soft)] disabled:cursor-not-allowed disabled:opacity-50"
                data-testid="button-upload-cv"
                title="Upload your CV (PDF, Word .docx, or TXT — old .doc files: export as PDF first)"
              >
                {cvBusy ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <FileUp className="w-3.5 h-3.5" />
                )}
                Upload CV
              </button>
            </div>

            <button
              onClick={loading ? abortStream : sendMessage}
              disabled={(!input.trim() && pendingAttachments.length === 0) && !loading}
              className={`h-8 w-8 flex items-center justify-center rounded-xl transition-colors ${
                loading
                  ? 'bg-[var(--space-semantic-danger-500)] hover:bg-[var(--space-semantic-danger-600)] text-[var(--space-text-on-primary)]'
                  : `${tw.button.primary} disabled:opacity-50 disabled:cursor-not-allowed`
              }`}
              data-testid="button-send-message"
            >
              {loading ? <XCircle className="w-4 h-4" /> : <Send className="w-4 h-4" />}
            </button>
          </div>
        </div>
    </>
  );

  // --- v1.3 shared MCQ cards (the inline transcript anchor and the floating
  // popup both render them) ---------------------------------------------------
  const openMcqPopupCard = (
    <button
      type="button"
      onClick={() => setMcqMinimized(false)}
      disabled={answersSaving}
      className={`mt-3 flex w-full items-start gap-2.5 rounded-xl border px-3.5 py-3 text-left transition ${
        answersSaving
          ? 'pointer-events-none cursor-not-allowed border-[var(--space-border-default)] bg-[var(--space-surface-muted)] opacity-60'
          : 'border-[var(--space-brand-primary-200)] bg-[var(--space-surface-accent-soft)] hover:border-[var(--space-brand-primary-500)]'
      }`}
      data-testid="button-open-mcq-popup"
    >
      {answersSaving ? (
        <Loader2 className="mt-0.5 h-4 w-4 flex-shrink-0 animate-spin text-[var(--space-text-muted)]" />
      ) : (
        <ClipboardList className="mt-0.5 h-4 w-4 flex-shrink-0 text-[var(--space-text-brand)]" />
      )}
      <span className="min-w-0">
        <span
          className={`block text-sm font-semibold ${
            answersSaving ? 'text-[var(--space-text-muted)]' : 'text-[var(--space-text-brand)]'
          }`}
        >
          {answersSaving
            ? 'Sending…'
            : `Answer the questions in the floating window${
                mcqProgress.total > 0 ? ` — ${mcqProgress.answered}/${mcqProgress.total} answered` : ''
              }`}
        </span>
        <span className="mt-0.5 block text-xs text-[var(--space-text-secondary)]">
          One window, three groups: quick questions about you + two optional groups (company culture fit,
          MBTI). It floats above the chat, so new CV info never scrolls it away — tap here any time to
          bring it back.
        </span>
      </span>
    </button>
  );

  const mcqSavedStateCard = (
    <div
      className="rounded-xl border border-[var(--space-semantic-success-100)] bg-[var(--space-surface-card)] px-3.5 py-3"
      data-testid="mcq-saved-state"
    >
      <p className="flex items-center gap-1.5 text-sm font-semibold text-[var(--space-text-primary)]">
        <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-[var(--space-semantic-success)]" />
        Your answers are saved
      </p>
      <p className="mt-1 text-xs leading-5 text-[var(--space-text-secondary)]">
        Saved separately, not analyzed yet — you can keep editing / reviewing your CV behind this window.
        When you tap “Analyze”, Mate analyzes your final CV together with these answers.
      </p>
      {(localCorporatePayload || localMbtiPayload) && (
        <p className="mt-1.5 flex flex-wrap gap-1.5">
          {localCorporatePayload && (
            <span className="rounded-full bg-[var(--space-semantic-success-50)] px-2 py-0.5 text-[11px] font-semibold text-[var(--space-semantic-success-700)]">
              Culture fit: saved ✓
            </span>
          )}
          {localMbtiPayload && (
            <span className="rounded-full bg-[var(--space-semantic-success-50)] px-2 py-0.5 text-[11px] font-semibold text-[var(--space-semantic-success-700)]">
              MBTI {localMbtiPayload.type}: saved ✓
            </span>
          )}
        </p>
      )}
      {!!storedAnswers && (
        <details className="mt-2 text-xs">
          <summary className="cursor-pointer font-medium text-[var(--space-text-secondary)]">
            Review saved answers
          </summary>
          <pre className="mt-1.5 max-h-40 overflow-y-auto whitespace-pre-wrap rounded-lg bg-[var(--space-surface-muted)] p-2.5 text-[11px] text-[var(--space-text-secondary)]">
            {storedAnswers.message}
          </pre>
        </details>
      )}
      {!!savedAnswersLocal && savedAnswersLocal.error && (
        <p className="mt-2 text-[11px] font-medium text-[var(--space-semantic-danger)]">
          Could not save to the server — your answers are kept on this device and will be sent along when
          you tap “Analyze”.
        </p>
      )}
      <div className="mt-2.5 flex flex-wrap items-center gap-2">
        <button
          type="button"
          disabled={!combinedSubmitReady || combinedSubmitted}
          onClick={handleCombinedSubmit}
          className={`rounded-full px-5 py-2 text-sm font-semibold transition ${tw.button.primary} disabled:cursor-not-allowed disabled:opacity-50`}
          data-testid="button-run-analysis"
        >
          {combinedSubmitted
            ? 'Sending…'
            : combinedSubmitReady
              ? 'Analyze CV + answers'
              : loading || streamingContent
                ? 'Mate is reading your CV…'
                : 'Waiting for your CV to be read…'}
        </button>
        <button
          type="button"
          onClick={handleAnswersRedo}
          className="rounded-full border border-[var(--space-border-default)] bg-[var(--space-surface-card)] px-3 py-1.5 text-xs font-semibold text-[var(--space-text-brand)] transition hover:border-[var(--space-border-strong)] hover:bg-[var(--space-surface-accent-soft)]"
          data-testid="button-redo-answers"
        >
          Answer again
        </button>
      </div>
      {analyzeNotice && (
        <p
          className="mt-2 text-[11px] font-medium text-[var(--space-semantic-danger)]"
          data-testid="analyze-missing-input-notice"
        >
          {analyzeNotice}
        </p>
      )}
      {!combinedSubmitReady && !combinedSubmitted && (
        <p className="mt-1.5 text-[11px] text-[var(--space-text-muted)]">
          The analyze button unlocks the moment Mate finishes reading your CV — your answers are not lost.
        </p>
      )}
    </div>
  );

  return (
    <div className="h-full flex overflow-hidden">
    <div
      className={`relative h-full flex-1 min-w-0 flex flex-col ${
        isBeaconSpace
          ? 'bg-gradient-to-br from-[var(--space-surface-gradient-from)] via-[var(--space-surface-gradient-via)] to-[var(--space-surface-gradient-to)]'
          : 'bg-[var(--space-surface-card)]'
      }`}
    >
      {isHomeView ? (
        /* Home view — centered greeting + composer, like a fresh assistant session */
        <div className="flex-1 overflow-y-auto flex flex-col">
          <div className="mx-auto my-auto w-full max-w-2xl px-4 py-6 sm:px-10 sm:py-10" data-testid="home-view">
            <div className="text-center mb-8">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--space-surface-accent-soft)] shadow-sm">
                <Bot className="h-6 w-6 text-[var(--space-text-brand)]" />
              </div>
              <h1 className="text-lg font-semibold text-[var(--space-text-primary)] sm:text-2xl">Let's find your direction</h1>
              {homeWelcomeText && (
                <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[var(--space-text-secondary)]">{homeWelcomeText}</p>
              )}
            </div>
            {showStepBar && (
              <div className="mb-4">
                <AssessmentStepBar step={assessmentStep} />
              </div>
            )}
            {onboardingTipElement && <div className="mb-4">{onboardingTipElement}</div>}
            {composerElement}
            <p className="mt-3 text-center text-xs text-[var(--space-text-muted)]">
              Drop in your CV to start — tap “Upload CV”, paste the text, or paste a CV link: Google Docs, a Google Drive PDF (set to “Anyone with the link can view”), or any public PDF URL.
            </p>
            {starterPrompts.length > 0 && (
              <div className="mt-6 flex flex-wrap justify-center gap-2">
                {starterPrompts.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => { void sendMessageWithContent(prompt, []); }}
                    className="rounded-full border border-[var(--space-border-default)] bg-[var(--space-surface-card)] px-4 py-2 text-sm font-medium text-[var(--space-text-primary)] shadow-sm transition hover:border-[var(--space-border-strong)] hover:bg-[var(--space-surface-accent-soft)]"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      ) : (
      <>
      <div ref={scrollContainerRef} className="flex-1 overflow-auto">
        <div className="mx-auto w-full max-w-3xl space-y-4 px-4 py-4 sm:px-10 sm:py-6">
        {/* Guided 3-step indicator — pinned above the conversation so a
            first-timer always knows the one path: CV → questions → results. */}
        {showStepBar && (
          <div className="sticky top-0 z-10 -mx-2 bg-[var(--space-surface-card)] px-2 pb-1">
            <AssessmentStepBar step={assessmentStep} />
          </div>
        )}
        {/* Pending-init placeholder so the user never sees a blank chat */}
        {showPendingPlaceholder && (
          /* Instant on-brand skeleton — perceived performance: the very first
             paint shows Mate's space taking shape, never a bare spinner. */
          <div className="mr-8 space-y-3" aria-busy="true" data-testid="chat-loading-skeleton">
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-[var(--space-surface-accent-soft)]">
                <Bot className="h-5 w-5 text-[var(--space-text-brand)]" />
              </div>
              <div className="flex-1 rounded-lg bg-[var(--space-surface-panel)] p-3">
                <p className="text-sm font-medium text-[var(--space-text-primary)]">{agentLabel}</p>
                <div className="mt-2 animate-pulse space-y-2">
                  <div className="h-3 w-3/4 rounded bg-[var(--space-surface-muted)]" />
                  <div className="h-3 w-full rounded bg-[var(--space-surface-muted)]" />
                  <div className="h-3 w-1/2 rounded bg-[var(--space-surface-muted)]" />
                </div>
                <p className="mt-2.5 flex items-center gap-1.5 text-xs text-[var(--space-text-muted)]">
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  {agentLabel} is getting your space ready — one moment…
                </p>
              </div>
            </div>
          </div>
        )}

        {!isLoadingHistory && hasLoadedHistory && shouldShowBeaconIntake && beaconIntake && (
          <div className="px-4">
            <div className="mx-auto max-w-2xl overflow-hidden rounded-3xl border border-[var(--space-semantic-success-100)] bg-[var(--space-surface-card)] shadow-sm">
              <div className="border-b border-[var(--space-semantic-success-100)] bg-gradient-to-r from-[var(--space-semantic-success-50)] via-[var(--space-surface-card)] to-[var(--space-surface-accent-soft)] px-6 py-5">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--space-semantic-success-700)]">
                  Your Beacon starting point
                </p>
                <h2 className="mt-2 text-lg font-semibold text-[var(--space-text-primary)] sm:text-xl">
                  {beaconIntake.headline}
                </h2>
                <p className="mt-2 text-sm leading-6 text-[var(--space-text-secondary)]">{beaconIntake.reflection}</p>
              </div>

              <div className="space-y-5 px-6 py-5">
                <div className="rounded-2xl border border-[var(--space-semantic-success-100)] bg-[var(--space-semantic-success-50)] px-4 py-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--space-semantic-success-700)]">
                    Today's anchor
                  </p>
                  <p className="mt-2 text-sm leading-6 text-[var(--space-text-secondary)]">{beaconIntake.anchor}</p>
                </div>

                <div>
                  <p className="text-sm font-semibold text-[var(--space-text-primary)]">Good next steps</p>
                  <div className="mt-3 space-y-2">
                    {beaconIntake.nextSteps.map((step) => (
                      <div
                        key={step}
                        className="flex items-start gap-3 rounded-2xl bg-[var(--space-surface-muted)] px-4 py-3 text-sm text-[var(--space-text-secondary)]"
                      >
                        <div className="mt-0.5 h-2 w-2 rounded-full bg-[var(--space-semantic-success-600)]" />
                        <span>{step}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-sm font-semibold text-[var(--space-text-primary)]">Continue from here</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {beaconIntake.starterPrompts.map((prompt) => (
                      <button
                        key={prompt}
                        type="button"
                        onClick={() => {
                          void sendMessageWithContent(prompt, []);
                        }}
                        className="rounded-full border border-[var(--space-semantic-success-100)] bg-[var(--space-surface-card)] px-4 py-2 text-sm font-medium text-[var(--space-semantic-success-700)] shadow-sm transition hover:border-[var(--space-semantic-success-500)] hover:bg-[var(--space-semantic-success-50)]"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Welcome message - only shown when confirmed no history exists */}
        {showEmptyStateWelcome ? (
          <div className="mt-8 px-4">
            {isBeaconSpace ? (
              <div className="mx-auto max-w-xl rounded-3xl border border-[var(--space-semantic-success-100)] bg-gradient-to-b from-[var(--space-semantic-success-50)] via-[var(--space-surface-card)] to-[var(--space-surface-card)] px-6 py-8 text-center shadow-sm">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--space-semantic-success-700)] text-[var(--space-text-on-primary)] shadow-sm">
                  <Bot className="h-6 w-6" />
                </div>
                <h2 className="text-lg font-semibold text-[var(--space-text-primary)] sm:text-xl">Start with the hard part</h2>
                <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[var(--space-text-secondary)]">
                  Tell Beacon what happened, what conversation you are dreading, or what you need help saying next.
                </p>
                <div className="mt-5 flex flex-wrap justify-center gap-2">
                  {beaconStarterPrompts.map((prompt) => (
                    <button
                      key={prompt}
                      type="button"
                      onClick={() => {
                        void sendMessageWithContent(prompt, []);
                      }}
                      className="rounded-full border border-[var(--space-semantic-success-100)] bg-[var(--space-surface-card)] px-4 py-2 text-sm font-medium text-[var(--space-semantic-success-700)] shadow-sm transition hover:border-[var(--space-semantic-success-500)] hover:bg-[var(--space-semantic-success-50)]"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center text-[var(--space-text-secondary)]">
                <Bot className="w-12 h-12 mx-auto mb-3 text-[var(--space-text-muted)]" />
                <h2 className="text-lg font-semibold text-[var(--space-text-primary)]">Meet {agentLabel} — your direction finder</h2>
                <p className="mx-auto mt-1 max-w-sm text-sm">
                  Drop in your CV — upload it, paste the text, or share a CV link (Google Docs, a Google Drive PDF, or any public PDF URL) — and {agentLabel} reads it, fills the gaps with a few quick taps, and hands you a full direction: industry fit, function fit, your top 5 best-fit programs (ranked from 20 verified Vietnamese MT and consulting options, with match scores and why each one fits you), and a personal prep plan.
                </p>
                {starterPrompts.length > 0 && (
                  <div className="mt-5 flex flex-wrap justify-center gap-2">
                    {starterPrompts.map((prompt) => (
                      <button
                        key={prompt}
                        type="button"
                        onClick={() => {
                          void sendMessageWithContent(prompt, []);
                        }}
                        className="rounded-full border border-[var(--space-border-default)] bg-[var(--space-surface-card)] px-4 py-2 text-sm font-medium text-[var(--space-text-primary)] shadow-sm transition hover:border-[var(--space-border-strong)] hover:bg-[var(--space-surface-accent-soft)]"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          visibleMessages.length > 0 &&
          visibleMessages.map((msg, idx) => {
            // Assistant turns with no natural-language text (pure tool
            // activity or unextractable payloads) are skipped entirely — the
            // candidate never sees agent mechanics or empty bubbles.
            if (msg.role === 'assistant' && !assistantRenderableText(msg)) {
              return null;
            }
            return (
            <div key={idx}>
              <div
                className={`p-3 rounded-lg overflow-hidden min-w-0 ${
                  msg.role === 'user' ? `${tw.message.user} ml-8` : `${tw.message.assistant} mr-8`
                }`}
              >
                <p className="text-sm font-medium mb-1">
                  {msg.role === 'assistant'
                    ? isBeaconSpace
                      ? 'Beacon'
                      : agentLabel
                    : 'You'}
                </p>

                {msg.role === 'user' && msg.attachments && msg.attachments.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-2">
                    {msg.attachments.map((att) => (
                      <div
                        key={att.id}
                        className="flex items-center gap-1 px-2 py-1 bg-[var(--space-surface-card)] rounded text-xs"
                      >
                        {att.contentType.startsWith('image/') ? (
                          <FileImage className="w-3 h-3 text-[var(--space-text-brand)]" />
                        ) : (
                          <File className="w-3 h-3 text-[var(--space-text-muted)]" />
                        )}
                        <span className="max-w-[100px] truncate">{att.originalName}</span>
                      </div>
                    ))}
                  </div>
                )}

                {typeof msg.content === 'string' || msg.content == null ? (
                  renderStringContent(
                    typeof msg.content === 'string' ? msg.content : '',
                    msg.role,
                    idx,
                  )
                ) : (
                  // Structured content: render only the natural-language text
                  // chunks. Tool-use chunks (names, inputs, JSON) are internal
                  // mechanics and are never shown to the candidate.
                  renderStringContent(
                    (Array.isArray(msg.content) ? msg.content : [])
                      .filter((chunk) => chunk.type === 'text' && typeof chunk.text === 'string')
                      .map((chunk) => chunk.text || '')
                      .join(''),
                    msg.role,
                    idx,
                  )
                )}
              </div>
            </div>
            );
          })
        )}

        {/* --- Live assessment flow (v0.6 speed): rendered straight from
            WorkspaceDB the moment the engine saves each stage — no waiting
            for Mate to re-type JSON in chat. --- */}
        {runInProgress && !parallelFilling && !!cvPreview && transcriptScan.cvProfileSigs.indexOf(JSON.stringify(cvPreview.profile)) < 0 && (
          <div className="mr-8">
            <button
              type="button"
              onClick={() => {
                setProgramGuide(null);
                setCvPreviewOpen(true);
              }}
              className="flex w-full items-center gap-2.5 rounded-xl border border-[var(--space-brand-primary-200)] bg-[var(--space-surface-accent-soft)] px-3.5 py-2.5 text-left transition hover:border-[var(--space-brand-primary-500)]"
              data-testid="button-open-live-cv-preview"
            >
              <FileText className="h-4 w-4 flex-shrink-0 text-[var(--space-text-brand)]" />
              <span className="text-sm font-medium text-[var(--space-text-brand)]">
                Your parsed CV is ready — review & correct it in the side panel
              </span>
            </button>
          </div>
        )}

        {showParallelIntake ? (
          /* Parallel CV+MCQ intake (v1.3): the quick questions live in the
             FLOATING POPUP above the chat (never scroll-jacked by new CV
             content); this card anchors the flow in the transcript — CV
             review, popup re-open, the saved-answers state, and the combined
             “Analyze” trigger that fires the existing analysis path. */
          <div
            className={`${tw.message.assistant} mr-8 p-3 rounded-lg overflow-hidden min-w-0`}
            data-testid="parallel-intake-form"
          >
            <p className="text-sm font-medium mb-1">{agentLabel}</p>
            <p className="text-sm text-[var(--space-text-secondary)]">
              {!parallelFilling
                ? 'Your answers are in — building your direction:'
                : answersStored
                  ? 'Your answers are saved — you can keep editing or replacing your CV right here. When you’re happy, tap “Analyze” below.'
                  : 'While I read your CV, let’s use the wait: answer the quick questions in the floating window — it always floats on top, so sending a new CV never scrolls the questions away.'}
            </p>
            {/* v1.1: the editable-CV step, restored as an unmissable card the
                moment the parse lands — opens the same side panel as before
                (auto-opened alongside the chat on wide viewports). */}
            {parallelFilling && !!cvPreview && (
              <button
                type="button"
                onClick={() => {
                  setProgramGuide(null);
                  setCvPreviewOpen(true);
                }}
                className="mt-3 flex w-full items-start gap-2.5 rounded-xl border border-[var(--space-brand-primary-200)] bg-[var(--space-surface-accent-soft)] px-3.5 py-3 text-left transition hover:border-[var(--space-brand-primary-500)]"
                data-testid="button-parallel-cv-review"
              >
                <FileText className="mt-0.5 h-4 w-4 flex-shrink-0 text-[var(--space-text-brand)]" />
                <span className="min-w-0">
                  <span className="block text-sm font-semibold text-[var(--space-text-brand)]">
                    Your CV is scanned{cvPreview.profile.name ? ` — ${cvPreview.profile.name}` : ''} — review &amp; edit it
                  </span>
                  <span className="mt-0.5 block text-xs text-[var(--space-text-secondary)]">
                    Check what Mate read and fix anything before your direction is built — your question answers here are kept.
                  </span>
                </span>
              </button>
            )}
            {parallelFilling && !answersStored && openMcqPopupCard}
            {parallelFilling && answersStored && <div className="mt-3">{mcqSavedStateCard}</div>}
            {parallelAnalysisStalled && (
              <div className="mt-2" data-testid="parallel-intake-stalled">
                <p className="text-xs font-medium text-[var(--space-semantic-danger)]">
                  {cvFailureGuidance}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    void sendMessageWithContent(cvRetryPrompt, []);
                  }}
                  className="mt-1.5 rounded-full border border-[var(--space-border-default)] bg-[var(--space-surface-card)] px-3 py-1.5 text-xs font-semibold text-[var(--space-text-brand)] transition hover:border-[var(--space-brand-primary-500)] hover:bg-[var(--space-surface-accent-soft)]"
                  data-testid="button-retry-cv-analysis"
                >
                  Retry reading my CV
                </button>
                <p className="mt-1 text-[11px] text-[var(--space-text-muted)]">
                  Or simply resend the CV itself (upload, paste, or link) — a new CV always restarts the analysis.
                </p>
              </div>
            )}
          </div>
        ) : showLiveQuestionsForm && liveQuestions ? (
          <div
            className={`${tw.message.assistant} mr-8 p-3 rounded-lg overflow-hidden min-w-0`}
            data-testid="live-questions-form"
          >
            <p className="text-sm font-medium mb-1">{agentLabel}</p>
            <p className="text-sm text-[var(--space-text-secondary)]">
              {answersStored
                ? 'Your answers are saved — edit your CV freely, then tap “Analyze” when you’re ready:'
                : 'A few quick taps to fill in what your CV can’t tell me — answer in the floating window while I wrap up:'}
            </p>
            {answersStored ? <div className="mt-3">{mcqSavedStateCard}</div> : openMcqPopupCard}
          </div>
        ) : null}

        {showLiveDirectionCard && liveDirection && (
          <div
            className={`${tw.message.assistant} mr-8 p-3 rounded-lg overflow-hidden min-w-0`}
            data-testid="live-direction-card"
          >
            <p className="text-sm font-medium mb-1">{agentLabel}</p>
            <DirectionCard
              data={liveDirection}
              cultureFit={cultureFitInline}
              appetite={appetiteInline}
              intel={companyIntelRecords}
              onOpenProgram={(program) => {
                setCvPreviewOpen(false);
                setProgramGuide({ program, direction: liveDirection });
              }}
            />
          </div>
        )}

        {showCultureFitSection && (
          <div className="mr-8 min-w-0" data-testid="culture-fit-wrapper">
            <CultureFitSection
              canSend={!loading && !streamingContent}
              onAskMate={(message) => {
                void sendMessageWithContent(message, []);
              }}
            />
          </div>
        )}

        {showStarterPromptsBelowWelcome && (
          <div className="px-4 -mt-1">
            <p className="mb-2 text-xs font-medium text-[var(--space-text-muted)]">
              Try one of these to get started:
            </p>
            <div className="flex flex-wrap gap-2">
              {starterPrompts.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => {
                    void sendMessageWithContent(prompt, []);
                  }}
                  className="rounded-full border border-[var(--space-border-default)] bg-[var(--space-surface-card)] px-4 py-2 text-sm font-medium text-[var(--space-text-primary)] shadow-sm transition hover:border-[var(--space-border-strong)] hover:bg-[var(--space-surface-accent-soft)]"
                  data-testid={`starter-prompt-${prompt.slice(0, 24)}`}
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        )}

        {loading && !streamingContent && (
          <WorkingIndicator lastAction={lastAction} agentLabel={agentLabel} thinkingText={thinkingText} />
        )}

        {streamingContent && (
          <div
            className={`${isBeaconSpace ? 'bg-[var(--space-surface-card)] border border-[var(--space-semantic-success-100)] shadow-sm' : 'bg-[var(--space-surface-panel)]'} mr-8 p-3 rounded-lg overflow-hidden min-w-0`}
          >
            <p className="text-sm font-medium mb-1">{agentLabel}</p>
            <div className="prose prose-sm max-w-none text-sm sm:prose-base sm:text-base">
              {streamingCut && streamingCut.text && (
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={markdownComponents}
                  urlTransform={markdownUrlTransform}
                >
                  {htmlToMarkdown(streamingCut.text)}
                </ReactMarkdown>
              )}
              {streamingCut && streamingCut.pendingLabel ? (
                <div className="mt-2 flex items-center gap-2 text-xs text-[var(--space-text-muted)]">
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  {streamingCut.pendingLabel}
                </div>
              ) : (
                isStreaming && (
                  <span className="inline-block w-0.5 h-4 ml-1 bg-[var(--space-text-primary)] animate-pulse" />
                )
              )}
            </div>
          </div>
        )}
        </div>
        <div ref={messagesEndRef} />
      </div>

      {/* Input area — floating composer, detached from the bottom edge */}
      <div className="px-4 sm:px-8 pb-5 pt-2">
        <div className="mx-auto w-full max-w-3xl">
        {onboardingTipElement && <div className="mb-2.5">{onboardingTipElement}</div>}
        {composerElement}

        <p className="text-[10px] text-[var(--space-text-muted)] mt-1.5 text-center leading-tight">
          Enter to send · Shift+Enter for a new line
        </p>
        </div>
      </div>
      </>
      )}

      {/* --- v1.3 floating MCQ popup -------------------------------------
          The quick questions live HERE, outside the chat scroll column, so
          new CV content below can never scroll-jack them. Mounted (state
          preserved) for the whole intake; minimizing / closing only hides
          it. No backdrop — the chat behind stays fully interactive, so the
          candidate can keep submitting / replacing / reviewing their CV. */}
      {mcqPopupMounted && (
        <>
          <div
            className={`absolute inset-x-2 bottom-32 z-30 sm:inset-x-auto sm:right-6 sm:w-[min(540px,calc(100%_-_3rem))] lg:w-[min(640px,calc(100%_-_3rem))] ${
              mcqMinimized ? 'hidden' : ''
            }`}
            data-testid="mcq-popup"
          >
            {/* v1.3.1 (founder request): a noticeably LARGER window — wider
                column and taller scroll area so the unified questionnaire is
                comfortable to read — still a floating overlay with no
                backdrop, so the CV flow behind stays fully usable. */}
            <div className="flex max-h-[min(76vh,780px)] flex-col overflow-hidden rounded-2xl border border-[var(--space-border-strong)] bg-[var(--space-surface-card)] shadow-2xl">
              <div className="flex items-center justify-between gap-2 border-b border-[var(--space-border-default)] bg-[var(--space-surface-muted)] px-3.5 py-2.5">
                <p className="flex min-w-0 items-center gap-1.5 text-sm font-semibold text-[var(--space-text-primary)]">
                  <ClipboardList className="h-4 w-4 flex-shrink-0 text-[var(--space-text-brand)]" />
                  <span className="truncate">Quick questions</span>
                  {answersStored ? (
                    <span className="flex-shrink-0 rounded-full bg-[var(--space-semantic-success-50)] px-2 py-0.5 text-[11px] font-semibold text-[var(--space-semantic-success-700)]">
                      Saved ✓
                    </span>
                  ) : (
                    mcqProgress.total > 0 && (
                      <span className="flex-shrink-0 rounded-full bg-[var(--space-surface-accent-soft)] px-2 py-0.5 text-[11px] font-semibold text-[var(--space-text-brand)]">
                        {mcqProgress.answered}/{mcqProgress.total}
                      </span>
                    )
                  )}
                </p>
                <div className="flex flex-shrink-0 items-center gap-1">
                  <button
                    type="button"
                    onClick={() => setMcqMinimized(true)}
                    title="Minimize — reopen any time, your answers are kept"
                    aria-label="Minimize questions window"
                    className="flex h-7 w-7 items-center justify-center rounded-lg text-[var(--space-text-muted)] transition hover:bg-[var(--space-surface-card)] hover:text-[var(--space-text-primary)]"
                    data-testid="button-minimize-mcq"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setMcqMinimized(true)}
                    title="Close — your answers are kept; reopen from the floating button"
                    aria-label="Close questions window"
                    className="flex h-7 w-7 items-center justify-center rounded-lg text-[var(--space-text-muted)] transition hover:bg-[var(--space-surface-card)] hover:text-[var(--space-text-primary)]"
                    data-testid="button-close-mcq"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <p className="border-b border-[var(--space-border-default)] px-4 py-2 text-[11px] leading-4 text-[var(--space-text-muted)] sm:px-5">
                This window always floats on top — you can send / replace / edit your CV in the chat behind
                it; your answers here are never lost. Parts 2–4 (company culture, MBTI, competitive
                ambition) are optional — skip them and you still get your full free result.
              </p>
              <div className="min-h-0 flex-1 overflow-y-auto px-4 pb-4 pt-0.5 sm:px-5">
                {answersStored ? (
                  <div className="mt-3">{mcqSavedStateCard}</div>
                ) : (
                  <>
                    {showParallelIntake && (
                      <div className="mt-3">
                        <IndustryFilterCard
                          value={industryFilter}
                          onChange={setIndustryFilter}
                          locked={parallelAnswered || answersSaving}
                        />
                      </div>
                    )}
                    {/* v1.3.1: ONE unified questionnaire — Part 1 (required
                        quick questions), then the optional Part 2 (corporate
                        fit) + Part 3 (MBTI) groups, all ending in the single
                        “Send my answers” action. */}
                    <div className="mt-4 flex items-center gap-2 px-1">
                      <span className="rounded-full bg-[var(--space-brand-primary-600)] px-2 py-0.5 text-[10px] font-bold text-[var(--space-text-on-primary)]">
                        Part 1
                      </span>
                      <p className="text-xs font-semibold uppercase tracking-wide text-[var(--space-text-secondary)]">
                        About you &amp; your interests
                      </p>
                    </div>
                    <QuestionsForm
                      key={`mcq-popup-form-${mcqFormEpoch}`}
                      questions={showParallelIntake ? parallelQuestions : liveQuestions || PARALLEL_INTAKE_QUESTIONS}
                      interactive={!parallelAnswered && !liveFormAnswered}
                      canSubmit={!answersSaving}
                      sending={answersSaving}
                      pendingNote="Sending your answers…"
                      pendingButtonLabel="Sending…"
                      submitLabel="Send my answers"
                      prefilledAnswers={showParallelIntake ? parallelPrefilledAnswers : undefined}
                      onProgress={(answered, total) => setMcqProgress({ answered, total })}
                      extraSections={
                        <div className="space-y-3">
                          <CultureFitQuestionGroups
                            ocpAnswers={ocpAnswers}
                            onOcpAnswer={(id, value) => setOcpAnswers((prev) => ({ ...prev, [id]: value }))}
                            mbtiAnswers={mbtiAnswers}
                            onMbtiAnswer={(id, choice) => setMbtiAnswers((prev) => ({ ...prev, [id]: choice }))}
                            locked={answersSaving || parallelAnswered || liveFormAnswered}
                          />
                          {/* Part 4 — competitive ambition:
                              6 skippable MCQs deciding whether high- or
                              low-competition programs surface first. */}
                          <CompetitiveAppetiteSection
                            answers={appetiteAnswers}
                            onAnswer={(id, value) => {
                              setAppetiteSkipped(false);
                              setAppetiteAnswers((prev) => ({ ...prev, [id]: value }));
                            }}
                            skipped={appetiteSkipped}
                            onToggleSkip={() => setAppetiteSkipped((v) => !v)}
                            locked={answersSaving || parallelAnswered || liveFormAnswered}
                          />
                        </div>
                      }
                      onSubmit={(message, answers) => {
                        void handleAnswersSave(message, answers);
                      }}
                    />
                  </>
                )}
              </div>
            </div>
          </div>
          {mcqMinimized && (
            <button
              type="button"
              onClick={() => setMcqMinimized(false)}
              disabled={answersSaving}
              className={`absolute bottom-32 right-4 z-30 flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-semibold shadow-lg transition ${
                answersSaving
                  ? 'pointer-events-none cursor-not-allowed border-[var(--space-border-default)] bg-[var(--space-surface-muted)] text-[var(--space-text-muted)] opacity-60'
                  : 'border-[var(--space-brand-primary-200)] bg-[var(--space-surface-card)] text-[var(--space-text-brand)] hover:border-[var(--space-brand-primary-500)] hover:bg-[var(--space-surface-accent-soft)]'
              }`}
              data-testid="button-reopen-mcq"
            >
              {answersSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <ClipboardList className="h-4 w-4" />}
              {answersSaving
                ? 'Sending…'
                : answersStored
                  ? 'Questions: saved ✓'
                  : `Quick questions${mcqProgress.total > 0 ? ` · ${mcqProgress.answered}/${mcqProgress.total}` : ''}`}
            </button>
          )}
        </>
      )}
    </div>

    {/* Editable CV preview — right-side panel, same footprint as the side
        app panel. Kept mounted while a parse exists so edits survive
        closing/reopening; full-screen overlay on narrow viewports. */}
    {cvPreview && (
      <CvPreviewPanel
        key={cvPreview.raw}
        open={cvPreviewOpen && !programGuide}
        raw={cvPreview.raw}
        profile={cvPreview.profile}
        busy={loading}
        sent={cvPreviewSent}
        mcCapture={mcCapture}
        replacing={cvReplacing}
        replaceStalled={cvReplaceStalled}
        onSend={handleCvPreviewSend}
        onClose={() => setCvPreviewOpen(false)}
      />
    )}

    {/* Program "how to get there" guide — right-side panel opened by tapping
        a program in the direction card. */}
    {programGuide && (
      <ProgramGuidePanel
        key={(programGuide.program.program || programGuide.program.company) + '-' + programGuide.program.match_percent}
        program={programGuide.program}
        direction={programGuide.direction}
        onClose={() => setProgramGuide(null)}
        isRowInConversation={(id) => rowConversation('assessment_results', id) === activeThreadId}
      />
    )}
    </div>
  );
}
