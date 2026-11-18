import { useState, useEffect, useCallback, useMemo } from 'react';
import { Route, Users, TrendingDown, Layers, Target, AlertTriangle, ArrowRightLeft, Info } from 'lucide-react';
import {
  PageHeader, Grid, Stack, Card, StatCard, DataTable, Badge, EmptyState, Button,
} from 'dashboard-blocks';
import {
  ResponsiveContainer, LineChart, Line, BarChart as RBarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, Cell,
} from 'recharts';

interface TemplateProps { workspaceId: string; }

// ---- Journey stage model (event_role -> ordered funnel stage) ----
const STAGES = [
  { rank: 1, key: 'open',        label: 'Mở feature',      short: 'Vào feature',    desc: 'Người dùng mở / bước vào feature.',                            color: '#ec8c22' },
  { rank: 2, key: 'step',        label: 'Thao tác bước',   short: 'Thao tác',       desc: 'Thực hiện các thao tác trung gian (chọn, mở, điền...).',       color: '#9b6ba8' },
  { rank: 3, key: 'core_action', label: 'Hành động chính', short: 'Hành động chính', desc: 'Thực hiện hành động giá trị cốt lõi của feature (nộp bài, học thẻ...).', color: '#0d69b3' },
  { rank: 4, key: 'activation',  label: 'Kích hoạt',       short: 'Kích hoạt',      desc: 'Chạm mốc nhận giá trị sâu hơn (hiện chủ yếu ở Fit Assessment).', color: '#2e9bd6' },
  { rank: 5, key: 'retention',   label: 'Quay lại',        short: 'Quay lại',       desc: 'Tạo ra kết quả lâu dài / quay lại dùng tiếp.',                 color: '#009f50' },
];
const STAGE_BY_RANK: Record<number, typeof STAGES[number]> = STAGES.reduce((a, s) => { a[s.rank] = s; return a; }, {} as any);
const roleStage = (role: string) => STAGES.find(s => s.key === role);

// ---- Only the five features requested ----
const ALLOWED_FEATURES = ['fit', 'drill_library', 'case_pool', 'aptitude', 'domain'];
const FEATURE_LABELS: Record<string, string> = {
  fit: 'Fit Assessment',
  drill_library: 'Case Drill',
  case_pool: 'Case Pool',
  aptitude: 'Aptitude Test',
  domain: 'Domain Knowledge',
};
const featureLabel = (f: string) => FEATURE_LABELS[f] || f;

// Distinct colors for the per-feature lines
const FEATURE_COLORS: Record<string, string> = {
  fit: '#0d69b3',
  drill_library: '#009f50',
  case_pool: '#ec8c22',
  aptitude: '#9b6ba8',
  domain: '#2e9bd6',
};

// ---- Plain-language names for each tracked event (no raw field names in the UI) ----
const EVENT_LABELS: Record<string, string> = {
  // Fit Assessment
  fit_started: 'Bắt đầu Fit Assessment',
  tour_started: 'Bắt đầu hướng dẫn (tour)',
  tour_step_viewed: 'Xem một bước hướng dẫn',
  fit_cv_uploaded: 'Tải CV lên',
  fit_step_completed: 'Hoàn thành một bước đánh giá',
  fit_cv_reviewed: 'Xem lại CV đã phân tích',
  fit_function_viewed: 'Xem kết quả Function-fit',
  tour_completed: 'Hoàn thành hướng dẫn',
  fit_activation: 'Kích hoạt Fit',
  fit_program_selected: 'Chọn chương trình mục tiêu',
  fit_roadmap_created: 'Tạo lộ trình ôn luyện (roadmap)',
  help_reopened: 'Mở lại trợ giúp',
  track_select: 'Chọn hướng (track)',
  fit_assessment_cv_parsed: 'Hệ thống phân tích CV',
  fit_assessment_profile_confirmed: 'Xác nhận hồ sơ',
  function_fit_calculated: 'Tính độ phù hợp chức năng',
  tour_skipped: 'Bỏ qua hướng dẫn',
  function_programs_filtered: 'Lọc chương trình theo chức năng',
  fit_assessment_manual_cv_started: 'Nhập CV thủ công',
  fit_assessment_saved_cv_reused: 'Dùng lại CV đã lưu',
  fit_assessment_returned_to_first_step: 'Quay lại bước đầu',
  target_fit_recalculated_after_cv_edit: 'Tính lại độ phù hợp sau khi sửa CV',
  fit_assessment_cv_upload_start_over: 'Tải lại CV từ đầu',
  fit_cv_upload_attempted: 'Thử tải CV lên',
  step_error: 'Lỗi ở một bước',
  // Case Drill
  drill_library_opened: 'Mở thư viện Case Drill',
  drill_skill_selected: 'Chọn kỹ năng luyện',
  drill_question_opened: 'Mở câu hỏi luyện',
  drill_answer_submitted: 'Nộp đáp án bài luyện',
  drill_explanation_viewed: 'Xem lời giải',
  drill_next_question: 'Làm câu hỏi tiếp theo',
  // Case Pool
  case_submitted: 'Nộp bài Case',
  case_graded: 'Bài Case được chấm điểm',
  // Aptitude Test
  aptitude_submitted: 'Nộp bài test năng lực',
  aptitude_timed_out: 'Hết giờ làm bài',
  // Domain Knowledge
  domain_opened: 'Mở Domain Knowledge',
  domain_path_selected: 'Chọn lộ trình ngành',
  domain_subcategory_opened: 'Mở nhóm chủ đề',
  domain_mode_started: 'Bắt đầu chế độ học',
  domain_card_learned: 'Học xong một thẻ kiến thức',
  domain_paywall_blocked: 'Bị chặn bởi paywall',
  // Generic
  step_view: 'Xem một bước',
  step_complete: 'Hoàn thành một bước',
};
const eventLabel = (e: string) => EVENT_LABELS[e] || e;

// ---- What each tracked step is FOR (so we can decide which to merge) ----
// "merge" = ứng viên nên gộp (generic/diagnostic/trùng ý nghĩa với bước khác).
const EVENT_PURPOSE: Record<string, { use: string; merge?: boolean }> = {
  // Fit Assessment
  fit_started: { use: 'Đo lượng người vào Fit Assessment (điểm khởi đầu của phễu).' },
  tour_started: { use: 'Bắt đầu tour onboarding — đo người xem hướng dẫn.', merge: true },
  tour_step_viewed: { use: 'Xem từng bước của tour hướng dẫn (nhiều lượt/người).', merge: true },
  fit_cv_uploaded: { use: 'Tải CV lên để hệ thống phân tích — đầu vào của đánh giá.' },
  fit_step_completed: { use: 'Hoàn thành một bước bất kỳ trong flow đánh giá (gộp nhiều bước nhỏ).' },
  fit_cv_reviewed: { use: 'Xem lại CV đã được phân tích.' },
  fit_roadmap_created: { use: 'Tạo lộ trình ôn luyện từ kết quả — kết quả giá trị lâu dài.' },
  fit_function_viewed: { use: 'Xem kết quả độ phù hợp theo chức năng (function-fit).' },
  tour_completed: { use: 'Hoàn thành tour hướng dẫn.', merge: true },
  fit_program_selected: { use: 'Chọn chương trình mục tiêu — hành động cốt lõi của Fit.' },
  fit_activation: { use: 'Cờ kích hoạt tổng của Fit (ít dùng, 5 người).', merge: true },
  help_reopened: { use: 'Mở lại trợ giúp (hành vi phụ).', merge: true },
  track_select: { use: 'Chọn hướng/track.', merge: true },
  fit_assessment_cv_parsed: { use: 'Sự kiện HỆ THỐNG parse CV (không phải thao tác người dùng).', merge: true },
  fit_assessment_profile_confirmed: { use: 'Xác nhận hồ sơ sau khi parse CV.', merge: true },
  function_fit_calculated: { use: 'Sự kiện HỆ THỐNG tính function-fit.', merge: true },
  tour_skipped: { use: 'Bỏ qua tour hướng dẫn.', merge: true },
  function_programs_filtered: { use: 'Lọc danh sách chương trình theo chức năng.', merge: true },
  fit_assessment_manual_cv_started: { use: 'Nhập CV thủ công thay vì upload file.', merge: true },
  fit_assessment_saved_cv_reused: { use: 'Dùng lại CV đã lưu trước đó.', merge: true },
  fit_assessment_returned_to_first_step: { use: 'Quay lại bước đầu của flow.', merge: true },
  target_fit_recalculated_after_cv_edit: { use: 'Tính lại độ phù hợp sau khi sửa CV.', merge: true },
  fit_cv_upload_attempted: { use: 'Thử tải CV (có thể thất bại) — chẩn đoán.', merge: true },
  fit_assessment_cv_upload_start_over: { use: 'Tải lại CV từ đầu.', merge: true },
  // Case Drill
  drill_library_opened: { use: 'Mở thư viện Case Drill — điểm vào feature.' },
  drill_skill_selected: { use: 'Chọn kỹ năng muốn luyện.' },
  drill_question_opened: { use: 'Mở một câu hỏi luyện tập.' },
  drill_answer_submitted: { use: 'Nộp đáp án — hành động cốt lõi của Case Drill.' },
  drill_explanation_viewed: { use: 'Xem lời giải sau khi nộp (hiện gắn vai trò chẩn đoán).', merge: true },
  drill_next_question: { use: 'Chuyển sang câu hỏi tiếp theo — tín hiệu quay lại.' },
  // Case Pool
  case_submitted: { use: 'Nộp bài Case để được chấm.' },
  case_graded: { use: 'Bài Case được chấm điểm — hành động cốt lõi của Case Pool.' },
  // Aptitude Test
  aptitude_submitted: { use: 'Nộp bài test năng lực — hành động cốt lõi của Aptitude.' },
  aptitude_timed_out: { use: 'Hết giờ làm bài (chẩn đoán).', merge: true },
  // Domain Knowledge
  domain_opened: { use: 'Mở Domain Knowledge — điểm vào feature.' },
  domain_path_selected: { use: 'Chọn lộ trình/ngành muốn học.' },
  domain_subcategory_opened: { use: 'Mở một nhóm chủ đề con.' },
  domain_mode_started: { use: 'Bắt đầu một chế độ học.', merge: true },
  domain_card_learned: { use: 'Học xong một thẻ kiến thức — hành động cốt lõi của Domain.' },
  domain_paywall_blocked: { use: 'Bị chặn bởi paywall (chẩn đoán).', merge: true },
  // Generic (xuất hiện ở NHIỀU feature → gây nhiễu, nên gộp/bỏ)
  step_view: { use: 'Sự kiện CHUNG “xem một bước”, dùng ở nhiều feature — dễ gây nhiễu phễu.', merge: true },
  step_complete: { use: 'Sự kiện CHUNG “hoàn thành một bước”, dùng ở nhiều feature.', merge: true },
  step_error: { use: 'Sự kiện CHUNG báo lỗi ở một bước (chẩn đoán).', merge: true },
};
const eventPurpose = (e: string) => EVENT_PURPOSE[e]?.use || '—';
const isMergeCandidate = (e: string) => !!EVENT_PURPOSE[e]?.merge;

// Short label for cramped x-axis ticks (full name stays in tooltip + table)
const shortLabel = (full: string) => (full.length > 18 ? full.slice(0, 17) + '…' : full);
// Role color (diagnostic / supplementary steps get a neutral gray)
const roleColor = (role: string) => roleStage(role)?.color || '#9ca3af';
const roleLabel = (role: string) => roleStage(role)?.label || 'Phụ trợ';

// ---- SQL (reused filters) ----
// Exclude the founder/internal test accounts from every query, and keep only the 5 features.
const FILTER =
  "user_id IS NOT NULL " +
  "AND feature_name IN ('fit','drill_library','case_pool','aptitude','domain') " +
  "AND user_id NOT IN (" +
  "'email:nguyenphianh38@gmail.com','email:anhntk.fiis@gmail.com','email:huumanh.forwork@gmail.com'," +
  "'email:anhduytran5454@gmail.com','email:minhtriet0509@gmail.com','email:benjaminnguyen.work03@gmail.com'," +
  "'email:tuandatnguyen2905@gmail.com')";

const SQL_FURTHEST =
  "WITH base AS (SELECT * FROM feature_events WHERE " + FILTER + "), " +
  "staged AS (SELECT feature_name, user_id, CASE event_role " +
  "WHEN 'open' THEN 1 WHEN 'step' THEN 2 WHEN 'core_action' THEN 3 WHEN 'activation' THEN 4 WHEN 'retention' THEN 5 ELSE 0 END AS rank " +
  "FROM base), " +
  "peruser AS (SELECT feature_name, user_id, max(rank) AS furthest FROM staged WHERE rank > 0 GROUP BY feature_name, user_id) " +
  "SELECT feature_name, furthest, count(*) AS users FROM peruser GROUP BY feature_name, furthest ORDER BY feature_name, furthest";

const SQL_EVENTS =
  "SELECT feature_name, event_role, event_name, count(*) AS events, count(DISTINCT user_id) AS users " +
  "FROM feature_events WHERE " + FILTER + " GROUP BY feature_name, event_role, event_name ORDER BY feature_name, users DESC";

const SQL_CONVERSION =
  "WITH base AS (SELECT * FROM feature_events WHERE " + FILTER + "), " +
  "fit_users AS (SELECT DISTINCT user_id FROM base WHERE feature_name = 'fit'), " +
  "tot AS (SELECT count(*) AS fit_total FROM fit_users) " +
  "SELECT b.feature_name, count(DISTINCT b.user_id) AS converted, max(tot.fit_total) AS fit_total " +
  "FROM base b JOIN fit_users f ON b.user_id = f.user_id CROSS JOIN tot " +
  "WHERE b.feature_name <> 'fit' GROUP BY b.feature_name ORDER BY converted DESC";

export function CustomerJourneyDashboard({ workspaceId }: TemplateProps) {
  const [furthest, setFurthest] = useState<any[]>([]);
  const [events, setEvents] = useState<any[]>([]);
  const [conversion, setConversion] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState<string[]>([]);
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null);
  const [lineMode, setLineMode] = useState<'pct' | 'count'>('pct');

  const runSql = useCallback((query: string) => {
    return fetch(`/api/workspaces/${workspaceId}/db/sql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${(window as any).__DASHBOARD_AUTH_TOKEN__ || ''}`,
      },
      body: JSON.stringify({ query, limit: 500 }),
    }).then(r => {
      if (!r.ok) return r.text().then(t => Promise.reject(new Error(t || r.status)));
      return r.json();
    });
  }, [workspaceId]);

  useEffect(() => {
    setLoading(true);
    setErrors([]);
    Promise.allSettled([runSql(SQL_FURTHEST), runSql(SQL_EVENTS), runSql(SQL_CONVERSION)])
      .then(([f, e, c]) => {
        const errs: string[] = [];
        if (f.status === 'fulfilled') setFurthest(f.value.rows || []);
        else errs.push(`furthest stage: ${f.reason?.message || f.reason}`);
        if (e.status === 'fulfilled') setEvents(e.value.rows || []);
        else errs.push(`event detail: ${e.reason?.message || e.reason}`);
        if (c.status === 'fulfilled') setConversion(c.value.rows || []);
        else errs.push(`conversion: ${c.reason?.message || c.reason}`);
        setErrors(errs);
        setLoading(false);
      });
  }, [runSql]);

  // ---- Per-feature journey breakdown (furthest stage reached per user) ----
  const perFeature = useMemo(() => {
    const map: Record<string, { feature: string; total: number; stages: Record<number, number> }> = {};
    furthest.forEach(r => {
      const f = r.feature_name;
      const rank = Number(r.furthest);
      const u = Number(r.users);
      if (!map[f]) map[f] = { feature: f, total: 0, stages: {} };
      map[f].stages[rank] = (map[f].stages[rank] || 0) + u;
      map[f].total += u;
    });
    return Object.values(map).map(m => {
      const reachedCore = (m.stages[3] || 0) + (m.stages[4] || 0) + (m.stages[5] || 0);
      const earlyDrop = (m.stages[1] || 0) + (m.stages[2] || 0);
      let domRank = 1, domUsers = -1;
      Object.entries(m.stages).forEach(([rk, u]) => {
        if (u > domUsers) { domUsers = u; domRank = Number(rk); }
      });
      return {
        feature: m.feature,
        label: featureLabel(m.feature),
        total: m.total,
        stages: m.stages,
        reachedCore,
        reachedCorePct: m.total ? Math.round((reachedCore / m.total) * 100) : 0,
        earlyDrop,
        earlyDropPct: m.total ? Math.round((earlyDrop / m.total) * 100) : 0,
        domRank,
        domUsers,
      };
    }).sort((a, b) => b.total - a.total);
  }, [furthest]);

  const rankedFeatures = perFeature; // all 5 are "real" features
  const topFeature = rankedFeatures[0];
  const biggestDrop = useMemo(
    () => [...rankedFeatures].sort((a, b) => b.earlyDrop - a.earlyDrop)[0],
    [rankedFeatures],
  );
  const bestProgression = useMemo(
    () => [...rankedFeatures].filter(f => f.total >= 10).sort((a, b) => b.reachedCorePct - a.reachedCorePct)[0],
    [rankedFeatures],
  );

  // ---- Step-level funnel per feature: every individual tracked action in a feature ----
  // For each feature, list ALL tracked events ordered by reach (unique users desc) so the
  // line reads as a funnel — the point where the line drops is where users stop.
  const stepFunnelByFeature = useMemo(() => {
    const map: Record<string, any[]> = {};
    events.forEach(e => {
      const f = e.feature_name;
      if (!ALLOWED_FEATURES.includes(f)) return;
      if (!map[f]) map[f] = [];
      map[f].push({
        event_name: e.event_name,
        role: e.event_role,
        full: eventLabel(e.event_name),
        users: Number(e.users),
        events: Number(e.events),
      });
    });
    Object.keys(map).forEach(f => {
      map[f].sort((a, b) => b.users - a.users);
      const base = map[f][0]?.users || 1;
      map[f] = map[f].map((s, i) => ({
        ...s,
        idx: i + 1,
        short: shortLabel(s.full),
        color: roleColor(s.role),
        stageLabel: roleLabel(s.role),
        pct: Math.round((s.users / base) * 1000) / 10,
      }));
    });
    return map;
  }, [events]);

  // "Where users are" ranking data
  const whereData = useMemo(() => rankedFeatures.map(f => ({ label: f.label, users: f.total })), [rankedFeatures]);

  // ---- Conversion from Fit Assessment to the other features ----
  const conversionData = useMemo(() => {
    const fitTotal = conversion.length ? Number(conversion[0].fit_total) : 0;
    const order = ['drill_library', 'case_pool', 'aptitude', 'domain'];
    return order
      .map(fn => {
        const row = conversion.find(c => c.feature_name === fn);
        const converted = row ? Number(row.converted) : 0;
        return {
          feature: fn,
          label: featureLabel(fn),
          converted,
          fitTotal,
          pct: fitTotal ? Math.round((converted / fitTotal) * 1000) / 10 : 0,
        };
      })
      .sort((a, b) => b.converted - a.converted);
  }, [conversion]);
  const fitTotal = conversionData[0]?.fitTotal || 0;

  useEffect(() => {
    if (!selectedFeature && topFeature) setSelectedFeature(topFeature.feature);
  }, [topFeature, selectedFeature]);

  const selectedEvents = useMemo(() => {
    if (!selectedFeature) return [];
    return events
      .filter(e => e.feature_name === selectedFeature)
      .map(e => ({
        ...e,
        users: Number(e.users),
        events: Number(e.events),
        label: eventLabel(e.event_name),
        stageRank: roleStage(e.event_role)?.rank ?? 99,
      }))
      .sort((a, b) => (a.stageRank - b.stageRank) || (b.users - a.users));
  }, [events, selectedFeature]);

  const selectedMeta = useMemo(
    () => perFeature.find(f => f.feature === selectedFeature),
    [perFeature, selectedFeature],
  );

  const selectedSteps = useMemo(
    () => (selectedFeature ? (stepFunnelByFeature[selectedFeature] || []) : []),
    [stepFunnelByFeature, selectedFeature],
  );

  // ---- Full catalog of tracked steps, grouped by feature (for merge planning) ----
  const catalog = useMemo(() => {
    const map: Record<string, any[]> = {};
    events.forEach(e => {
      const f = e.feature_name;
      if (!ALLOWED_FEATURES.includes(f)) return;
      if (!map[f]) map[f] = [];
      map[f].push({
        event_name: e.event_name,
        role: e.event_role,
        label: eventLabel(e.event_name),
        purpose: eventPurpose(e.event_name),
        merge: isMergeCandidate(e.event_name),
        users: Number(e.users),
        events: Number(e.events),
      });
    });
    Object.keys(map).forEach(f => map[f].sort((a, b) => b.users - a.users));
    return ALLOWED_FEATURES.filter(f => map[f]).map(f => ({
      feature: f,
      label: featureLabel(f),
      rows: map[f],
    }));
  }, [events]);

  const totalTrackedEvents = useMemo(
    () => catalog.reduce((n, c) => n + c.rows.length, 0),
    [catalog],
  );
  const mergeCandidateCount = useMemo(
    () => catalog.reduce((n, c) => n + c.rows.filter((r: any) => r.merge).length, 0),
    [catalog],
  );

  return (
    <div
      style={{
        // Widen the dashboard to use the empty side margins WITHOUT going full-bleed.
        // Symmetric negative margins expand the block centered on its own parent
        // container (not the viewport), so nothing gets clipped on the left.
        // When the parent is already wide, the margins collapse to ~0 (no effect).
        marginLeft: 'calc((100% - min(1400px, 94vw)) / 2)',
        marginRight: 'calc((100% - min(1400px, 94vw)) / 2)',
        boxSizing: 'border-box',
      }}
    >
    <Stack gap="lg">
      <PageHeader
        title="Customer Journey by Feature"
        subtitle="Fit Assessment · Case Drill · Case Pool · Aptitude Test · Domain Knowledge — người dùng tập trung ở đâu, đi sâu đến bước nào, và chuyển đổi từ Fit sang feature khác ra sao"
        icon={<Route className="w-5 h-5" />}
      />

      {errors.length > 0 && (
        <div className="rounded-md border border-red-300 bg-red-50 p-3 text-sm text-red-800">
          <div className="font-semibold mb-1">Một số truy vấn gặp lỗi:</div>
          <ul className="list-disc ml-5">{errors.map((e, i) => <li key={i}>{e}</li>)}</ul>
        </div>
      )}

      <div className="rounded-md border border-blue-200 bg-blue-50 px-3 py-2 text-xs text-blue-800">
        Đã loại 7 tài khoản nội bộ/test khỏi toàn bộ số liệu; chỉ gồm 5 feature: Fit Assessment, Case Drill, Case Pool, Aptitude Test, Domain Knowledge.
      </div>

      {/* ---- Headline ---- */}
      <Grid cols={4}>
        <StatCard
          title="Feature đang phân tích"
          value={loading ? '' : rankedFeatures.length}
          subtitle="Fit · Drill · Pool · Aptitude · Domain"
          icon={<Layers className="w-4 h-4" />}
          loading={loading}
        />
        <StatCard
          title="Feature nhiều người dùng nhất"
          value={loading ? '' : (topFeature ? topFeature.label : '—')}
          subtitle={topFeature ? `${topFeature.total} người dùng` : ''}
          icon={<Users className="w-4 h-4" />}
          loading={loading}
        />
        <StatCard
          title="Drop-off nhiều nhất"
          value={loading ? '' : (biggestDrop ? biggestDrop.label : '—')}
          subtitle={biggestDrop ? `${biggestDrop.earlyDrop} người dừng trước Hành động chính (${biggestDrop.earlyDropPct}%)` : ''}
          icon={<TrendingDown className="w-4 h-4" />}
          loading={loading}
        />
        <StatCard
          title="Đi sâu tốt nhất"
          value={loading ? '' : (bestProgression ? bestProgression.label : '—')}
          subtitle={bestProgression ? `${bestProgression.reachedCorePct}% chạm Core+` : ''}
          icon={<Target className="w-4 h-4" />}
          loading={loading}
        />
      </Grid>

      {/* ---- Where users are + stage legend ---- */}
      <Grid cols={2}>
        <Card title="Người dùng đang nằm ở feature nào nhiều nhất">
          {loading ? (
            <div className="h-[260px] animate-pulse bg-gray-100 rounded" />
          ) : whereData.length === 0 ? (
            <EmptyState title="Chưa có dữ liệu feature" />
          ) : (
            <ResponsiveContainer width="100%" height={Math.max(220, whereData.length * 44)}>
              <RBarChart data={whereData} layout="vertical" margin={{ left: 20, right: 24 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" allowDecimals={false} />
                <YAxis type="category" dataKey="label" width={130} tick={{ fontSize: 12 }} />
                <Tooltip formatter={(v: any) => [`${v} người dùng`, 'Người dùng']} />
                <Bar dataKey="users" fill="#0d69b3" radius={[0, 4, 4, 0]} label={{ position: 'right', fontSize: 12 }}>
                  {whereData.map((_, i) => <Cell key={i} fill={i === 0 ? '#0d69b3' : '#2e9bd6'} />)}
                </Bar>
              </RBarChart>
            </ResponsiveContainer>
          )}
        </Card>

        <Card title="Mô hình hành trình (journey stages)">
          <Stack gap="sm">
            <p className="text-sm text-gray-600">
              Mỗi feature chia thành các bước theo thứ tự. "Bước dừng" của một người là bước
              <strong> xa nhất</strong> họ đạt tới trong feature đó.
            </p>
            <div className="flex flex-col gap-2">
              {STAGES.map((s, i) => (
                <div key={s.key} className="flex items-start gap-3">
                  <span className="inline-block w-5 text-xs text-gray-400 text-right pt-0.5">{i + 1}</span>
                  <span className="inline-block w-3 h-3 rounded-sm mt-1" style={{ background: s.color }} />
                  <div>
                    <span className="text-sm font-medium">{s.label}</span>
                    <span className="text-xs text-gray-500 ml-1">— {s.desc}</span>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-400 mt-1">
              Sự kiện vai trò "chẩn đoán/phụ trợ" (diagnostic) không tính vào bước dừng.
            </p>
          </Stack>
        </Card>
      </Grid>

      {/* ---- "Chạm Core+" explanation ---- */}
      <Card title="“Chạm Core+” nghĩa là gì? Có phải là Activation không?">
        <div className="flex items-start gap-3">
          <Info className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
          <div className="text-sm text-gray-700 space-y-2">
            <p>
              <strong>Chạm Core+ = đạt tối thiểu bước “Hành động chính” (Core action) trở lên</strong> — tức gộp cả
              ba bước cuối: <em>Hành động chính + Kích hoạt + Quay lại</em>. Đây là nhóm người dùng đã thực sự
              <strong> làm hành động giá trị</strong> của feature (ví dụ: nộp đáp án Case Drill, học xong thẻ Domain,
              nộp &amp; được chấm bài Case Pool, nộp bài Aptitude).
            </p>
            <p>
              <strong>Không, Core+ không phải là Activation.</strong> “Activation” (Kích hoạt) là một bước
              <em> riêng và sâu hơn</em> nằm <em>bên trong</em> nhóm Core+ (bước 4/5). Trong dữ liệu hiện tại,
              Activation gần như chỉ xuất hiện ở <strong>Fit Assessment</strong> (xem kết quả Function-fit, hoàn thành
              hướng dẫn); 4 feature còn lại đi theo chuỗi Mở → Thao tác → <strong>Hành động chính</strong> → (Quay lại),
              nên với chúng “chạm Core+” chính là đã làm hành động chính.
            </p>
            <p className="text-gray-500">
              Tóm lại: Core+ rộng hơn Activation. Mọi người đạt Activation đều thuộc Core+, nhưng người chỉ làm
              Hành động chính (chưa Activation) vẫn được tính là Core+.
            </p>
          </div>
        </div>
      </Card>

      {/* ---- FULL CATALOG of tracked steps (for merge planning) ---- */}
      <Card
        title="Toàn bộ các bước đang được record & mục đích của từng bước"
        actions={
          <div className="flex gap-2">
            <Badge variant="info">{totalTrackedEvents} sự kiện</Badge>
            <Badge variant="warning">{mergeCandidateCount} nên gộp/bỏ</Badge>
          </div>
        }
      >
        {loading ? (
          <div className="h-[300px] animate-pulse bg-gray-100 rounded" />
        ) : catalog.length === 0 ? (
          <EmptyState title="Chưa có dữ liệu sự kiện" />
        ) : (
          <Stack gap="md">
            <p className="text-sm text-gray-600">
              Đây là <strong>tất cả {totalTrackedEvents} sự kiện</strong> hệ thống đang ghi lại trên 5 feature, nhóm theo feature và
              sắp xếp từ nhiều người dùng → ít. Cột <strong>“Giai đoạn hiện tại”</strong> là cách chúng đang được xếp vào phễu.
              Hàng có nhãn <Badge variant="warning">Nên gộp/bỏ</Badge> là ứng viên để gộp lại — gồm sự kiện <em>hệ thống/chẩn đoán</em>
              (không phải thao tác người dùng) và sự kiện <em>chung</em> (<code>step_view</code>, <code>step_complete</code>, <code>step_error</code>)
              bị dùng trùng ở nhiều feature nên tạo ra nhiều nhánh journey khác nhau.
            </p>
            {catalog.map(group => (
              <div key={group.feature}>
                <div className="flex items-center gap-2 mb-1">
                  <span className="inline-block w-3 h-3 rounded-sm" style={{ background: FEATURE_COLORS[group.feature] }} />
                  <h4 className="text-sm font-semibold text-gray-800">{group.label}</h4>
                  <span className="text-xs text-gray-400">({group.rows.length} sự kiện)</span>
                </div>
                <DataTable
                  data={group.rows}
                  columns={[
                    {
                      key: 'role', header: 'Giai đoạn hiện tại', render: (v: string) => {
                        const st = roleStage(v);
                        return st ? (
                          <div className="flex items-center gap-2">
                            <span className="inline-block w-3 h-3 rounded-sm" style={{ background: st.color }} />
                            <span className="text-sm">{st.label}</span>
                          </div>
                        ) : <Badge variant="default">Phụ trợ / chẩn đoán</Badge>;
                      },
                    },
                    { key: 'label', header: 'Hành động (đã dịch)', render: (v: string) => <span className="text-sm font-medium">{v}</span> },
                    { key: 'event_name', header: 'Tên sự kiện (raw)', render: (v: string) => <code className="text-xs text-gray-500">{v}</code> },
                    { key: 'purpose', header: 'Dùng để làm gì', render: (v: string) => <span className="text-xs text-gray-600">{v}</span> },
                    { key: 'users', header: 'Người', sortable: true, width: '70px' },
                    { key: 'events', header: 'Lượt', sortable: true, width: '70px' },
                    {
                      key: 'merge', header: 'Đề xuất', render: (v: boolean) => (
                        v ? <Badge variant="warning">Nên gộp/bỏ</Badge> : <Badge variant="success">Giữ</Badge>
                      ),
                    },
                  ]}
                />
              </div>
            ))}
          </Stack>
        )}
      </Card>

      {/* ---- Step-level LINE chart: every tracked action within the selected feature ---- */}
      <Card
        title={`Từng bước nhỏ trong feature: ${selectedMeta ? selectedMeta.label : '—'}`}
        actions={
          <div className="flex gap-1 flex-wrap items-center">
            {rankedFeatures.map(f => (
              <Button
                key={f.feature}
                size="sm"
                variant={f.feature === selectedFeature ? 'primary' : 'secondary'}
                onClick={() => setSelectedFeature(f.feature)}
              >
                {f.label}
              </Button>
            ))}
            <span className="w-px h-5 bg-gray-200 mx-1" />
            <Button size="sm" variant={lineMode === 'pct' ? 'primary' : 'secondary'} onClick={() => setLineMode('pct')}>% còn lại</Button>
            <Button size="sm" variant={lineMode === 'count' ? 'primary' : 'secondary'} onClick={() => setLineMode('count')}>Số người</Button>
          </div>
        }
      >
        {loading ? (
          <div className="h-[380px] animate-pulse bg-gray-100 rounded" />
        ) : selectedSteps.length === 0 ? (
          <EmptyState title="Chọn một feature để xem từng bước" />
        ) : (
          <>
            <p className="text-sm text-gray-600 mb-1">
              Mỗi điểm trên đường là <strong>một hành động nhỏ đang được tracking</strong> trong feature này.
              Trục dọc = số người dùng {lineMode === 'pct' ? '(theo % so với bước được nhiều người chạm nhất = 100%)' : '(số người thực)'} đã thực hiện hành động đó.
              Các bước xếp từ <strong>nhiều người → ít người</strong>, nên chỗ đường <strong>dốc xuống mạnh</strong> chính là nơi người dùng rơi rụng.
            </p>
            <p className="text-xs text-gray-500 mb-3">
              Màu của mỗi điểm = bước đó thuộc giai đoạn nào trong hành trình:
              {STAGES.map(s => (
                <span key={s.key} className="inline-flex items-center gap-1 ml-2">
                  <span className="inline-block w-2.5 h-2.5 rounded-sm" style={{ background: s.color }} />{s.label}
                </span>
              ))}
              <span className="inline-flex items-center gap-1 ml-2">
                <span className="inline-block w-2.5 h-2.5 rounded-sm" style={{ background: '#9ca3af' }} />Phụ trợ
              </span>
            </p>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={selectedSteps} margin={{ left: 10, right: 28, top: 8, bottom: 110 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="short"
                  tick={{ fontSize: 11 }}
                  interval={0}
                  angle={-35}
                  textAnchor="end"
                  height={110}
                />
                <YAxis
                  allowDecimals={false}
                  tick={{ fontSize: 12 }}
                  domain={lineMode === 'pct' ? [0, 100] : undefined}
                  tickFormatter={(v: any) => (lineMode === 'pct' ? `${v}%` : `${v}`)}
                />
                <Tooltip
                  content={({ active, payload }: any) => {
                    if (!active || !payload || !payload.length) return null;
                    const d = payload[0].payload;
                    return (
                      <div className="bg-white border border-gray-200 rounded shadow-sm px-3 py-2 text-xs">
                        <div className="font-semibold text-gray-800 mb-1">{d.full}</div>
                        <div className="flex items-center gap-1 text-gray-600 mb-1">
                          <span className="inline-block w-2.5 h-2.5 rounded-sm" style={{ background: d.color }} />
                          Giai đoạn: {d.stageLabel}
                        </div>
                        <div className="text-gray-700">{d.users} người dùng · {d.events} lượt</div>
                        <div className="text-gray-400">{d.pct}% so với bước đông nhất</div>
                      </div>
                    );
                  }}
                />
                <Line
                  type="monotone"
                  dataKey={lineMode === 'pct' ? 'pct' : 'users'}
                  stroke={FEATURE_COLORS[selectedFeature || ''] || '#0d69b3'}
                  strokeWidth={2}
                  dot={(props: any) => {
                    const { cx, cy, payload } = props;
                    return <circle key={payload.event_name} cx={cx} cy={cy} r={4.5} fill={payload.color} stroke="#fff" strokeWidth={1.5} />;
                  }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
            <p className="text-xs text-gray-400 mt-2">
              Gợi ý: đưa chuột vào từng điểm để xem tên hành động đầy đủ, giai đoạn, số người và số lượt. Bảng “Chi tiết các bước” bên dưới liệt kê đầy đủ không rút gọn.
            </p>
          </>
        )}
      </Card>

      {/* ---- Conversion from Fit Assessment to other features ---- */}
      <Card
        title="Chuyển đổi từ Fit Assessment sang feature khác"
        actions={<Badge variant="info">{fitTotal} người dùng Fit</Badge>}
      >
        {loading ? (
          <div className="h-[220px] animate-pulse bg-gray-100 rounded" />
        ) : conversionData.length === 0 ? (
          <EmptyState icon={<ArrowRightLeft className="w-6 h-6" />} title="Chưa có dữ liệu chuyển đổi" />
        ) : (
          <>
            <p className="text-sm text-gray-600 mb-3">
              Trong <strong>{fitTotal}</strong> người đã dùng Fit Assessment, tỉ lệ cũng dùng từng feature khác.
              (Fit là cửa ngõ đông nhất; đây là mức “lan tỏa” từ Fit sang các feature luyện tập.)
            </p>
            <ResponsiveContainer width="100%" height={Math.max(180, conversionData.length * 46)}>
              <RBarChart data={conversionData} layout="vertical" margin={{ left: 20, right: 40 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" domain={[0, 100]} tickFormatter={(v: any) => `${v}%`} tick={{ fontSize: 12 }} />
                <YAxis type="category" dataKey="label" width={130} tick={{ fontSize: 12 }} />
                <Tooltip
                  formatter={(v: any, _n: any, p: any) => [`${v}%  (${p?.payload?.converted}/${fitTotal} người)`, 'Chuyển đổi']}
                />
                <Bar dataKey="pct" fill="#009f50" radius={[0, 4, 4, 0]}
                  label={{ position: 'right', formatter: (v: any) => `${v}%`, fontSize: 12 }}>
                  {conversionData.map((_, i) => <Cell key={i} fill={i === 0 ? '#009f50' : '#2e9bd6'} />)}
                </Bar>
              </RBarChart>
            </ResponsiveContainer>
            <div className="mt-2 flex flex-wrap gap-2">
              {conversionData.map(c => (
                <span key={c.feature} className="text-xs text-gray-600 border rounded px-2 py-1">
                  Fit → <strong>{c.label}</strong>: {c.converted}/{fitTotal} ({c.pct}%)
                </span>
              ))}
            </div>
          </>
        )}
      </Card>

      {/* ---- Drop-off table ---- */}
      <DataTable
        title="Bảng phân tích drop-off theo feature"
        data={rankedFeatures}
        loading={loading}
        emptyMessage="Chưa có dữ liệu feature"
        onRowClick={(row) => setSelectedFeature(row.feature)}
        columns={[
          { key: 'label', header: 'Feature', sortable: true },
          { key: 'total', header: 'Người dùng', sortable: true, render: (v) => <span className="font-semibold">{v}</span> },
          {
            key: 'domRank', header: 'Bước dừng phổ biến nhất', render: (v, row) => {
              const st = STAGE_BY_RANK[v];
              return st ? (
                <div className="flex items-center gap-2">
                  <span className="inline-block w-3 h-3 rounded-sm" style={{ background: st.color }} />
                  <span>{st.label}</span>
                  <span className="text-xs text-gray-500">({row.domUsers} người)</span>
                </div>
              ) : '—';
            },
          },
          {
            key: 'reachedCorePct', header: 'Chạm Core+', sortable: true, render: (v, row) => (
              <Badge variant={v >= 60 ? 'success' : v >= 30 ? 'warning' : 'error'}>
                {v}% ({row.reachedCore})
              </Badge>
            ),
          },
          {
            key: 'earlyDropPct', header: 'Rời sớm (Mở/Thao tác)', sortable: true, render: (v, row) => (
              <Badge variant={v >= 60 ? 'error' : v >= 35 ? 'warning' : 'default'}>
                {v}% ({row.earlyDrop})
              </Badge>
            ),
          },
        ]}
      />

      {/* ---- Per-feature event detail (translated event names) ---- */}
      <Card
        title={`Chi tiết các bước trong feature: ${selectedMeta ? selectedMeta.label : '—'}`}
        actions={
          <div className="flex gap-1 flex-wrap">
            {rankedFeatures.map(f => (
              <Button
                key={f.feature}
                size="sm"
                variant={f.feature === selectedFeature ? 'primary' : 'secondary'}
                onClick={() => setSelectedFeature(f.feature)}
              >
                {f.label}
              </Button>
            ))}
          </div>
        }
      >
        {loading ? (
          <div className="h-[200px] animate-pulse bg-gray-100 rounded" />
        ) : selectedEvents.length === 0 ? (
          <EmptyState icon={<AlertTriangle className="w-6 h-6" />} title="Chọn một feature để xem chi tiết" />
        ) : (
          <DataTable
            data={selectedEvents}
            columns={[
              {
                key: 'event_role', header: 'Bước', render: (v) => {
                  const st = roleStage(v);
                  return st ? (
                    <div className="flex items-center gap-2">
                      <span className="inline-block w-3 h-3 rounded-sm" style={{ background: st.color }} />
                      <span className="text-sm">{st.label}</span>
                    </div>
                  ) : <Badge variant="default">Phụ trợ</Badge>;
                },
              },
              { key: 'label', header: 'Hành động của người dùng', sortable: true, render: (v) => <span className="text-sm">{v}</span> },
              { key: 'users', header: 'Người dùng', sortable: true },
              { key: 'events', header: 'Lượt', sortable: true },
            ]}
          />
        )}
      </Card>
    </Stack>
    </div>
  );
}

export default CustomerJourneyDashboard;
