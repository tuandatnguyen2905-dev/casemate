export type RecruitmentWindowTone = 'success' | 'warning' | 'muted';

export type ManualProgramStatus = 'open' | 'opening_soon' | 'closed';

const MANUAL_STATUS_KEYS: Record<string, ManualProgramStatus> = {
  open: 'open',
  'open now': 'open',
  active: 'open',
  mo: 'open',
  'dang mo': 'open',
  'da mo': 'open',
  'opening soon': 'opening_soon',
  soon: 'opening_soon',
  'sap mo': 'opening_soon',
  closed: 'closed',
  close: 'closed',
  inactive: 'closed',
  dong: 'closed',
  'da dong': 'closed',
};

// The founder types this value by hand in programs.display_status, so case,
// Vietnamese accents, spaces, '_' and '-' are ignored. Anything else (including
// 'auto' and an empty cell) means the status follows the program's dates.
export function normalizeManualProgramStatus(value: unknown): ManualProgramStatus | null {
  const key = String(value ?? '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/gi, 'd')
    .toLowerCase()
    .replace(/[\s_-]+/g, ' ')
    .trim();
  return MANUAL_STATUS_KEYS[key] || null;
}

export type RecruitmentWindowInfo = {
  published: boolean;
  statusLabel: 'Open Now' | 'Opening Soon' | 'Expected' | 'Upcoming' | 'Closed' | 'Not published';
  cycleLabel: string;
  detailLabel: string;
  openLabel: string;
  closeLabel: string | null;
  tone: RecruitmentWindowTone;
  manualStatus: ManualProgramStatus | null;
};

export const MAY_BE_OPEN_LABEL = 'May be open';

// Users are only told that a program may be open; open/close dates and cycles
// are deliberately never shown to them.
export function programAvailabilityLabel(info: RecruitmentWindowInfo): string {
  return info.statusLabel === 'Open Now' || info.statusLabel === 'Opening Soon' ? MAY_BE_OPEN_LABEL : '';
}

type DatePart = { day: number; month: number; label: string };

function dateParts(value?: string | string[] | null): DatePart[] {
  if (!value) return [];
  let values = Array.isArray(value) ? value : [value];
  if (!Array.isArray(value) && value.trim().startsWith('[')) {
    try {
      const parsed = JSON.parse(value);
      if (Array.isArray(parsed)) values = parsed.map(String);
    } catch {
      values = [value];
    }
  }
  return values.flatMap((item) => {
    const match = String(item).trim().match(/^(\d{1,2})\/(\d{1,2})$/);
    if (!match) return [];
    const day = Number(match[1]);
    const month = Number(match[2]);
    const candidate = new Date(Date.UTC(2024, month - 1, day));
    if (candidate.getUTCDate() !== day || candidate.getUTCMonth() !== month - 1) return [];
    return [{ day, month, label: `${String(day).padStart(2, '0')}/${String(month).padStart(2, '0')}` }];
  });
}

function annualDay(date: DatePart) {
  return Math.round((Date.UTC(2024, date.month - 1, date.day) - Date.UTC(2024, 0, 1)) / 86400000);
}

function withYear(date: DatePart, year: number) {
  return `${date.label}/${year}`;
}

export function getProgramRecruitmentWindow(
  openDate?: string | string[] | null,
  closeDate?: string | string[] | null,
  now = new Date(),
  manualStatus?: unknown,
): RecruitmentWindowInfo {
  const info = dateRecruitmentWindow(openDate, closeDate, now);
  const manual = normalizeManualProgramStatus(manualStatus);
  if (!manual) return info;
  if (manual === 'open') {
    if (info.statusLabel === 'Open Now') return { ...info, manualStatus: manual };
    return {
      ...info,
      manualStatus: manual,
      statusLabel: 'Open Now',
      tone: 'success',
      cycleLabel: 'Applications open now',
      detailLabel: 'Applications open now · Close date not published',
      openLabel: 'Applications open now',
      closeLabel: null,
    };
  }
  if (manual === 'opening_soon') {
    const datesPointAhead = info.published && ['Opening Soon', 'Expected', 'Upcoming'].includes(info.statusLabel);
    if (datesPointAhead) return { ...info, manualStatus: manual, statusLabel: 'Opening Soon', tone: 'warning' };
    return {
      ...info,
      manualStatus: manual,
      statusLabel: 'Opening Soon',
      tone: 'warning',
      cycleLabel: 'Opening soon',
      detailLabel: 'Opening soon · Dates not published yet',
      openLabel: 'Opening soon',
      closeLabel: null,
    };
  }
  if (info.published) return { ...info, manualStatus: manual, statusLabel: 'Closed', tone: 'muted' };
  return {
    ...info,
    manualStatus: manual,
    statusLabel: 'Closed',
    tone: 'muted',
    cycleLabel: 'Applications closed',
    detailLabel: 'Applications closed',
    openLabel: 'Applications closed',
  };
}

function dateRecruitmentWindow(
  openDate: string | string[] | null | undefined,
  closeDate: string | string[] | null | undefined,
  now: Date,
): RecruitmentWindowInfo {
  const opens = dateParts(openDate);
  if (!opens.length) {
    return {
      published: false,
      statusLabel: 'Not published',
      cycleLabel: 'Not published',
      detailLabel: 'Application dates not published',
      openLabel: 'Application dates not published',
      closeLabel: null,
      tone: 'muted',
      manualStatus: null,
    };
  }

  const close = dateParts(closeDate)[0] || null;
  const today = annualDay({ day: now.getDate(), month: now.getMonth() + 1, label: '' });
  const closeDay = close ? annualDay(close) : null;
  const yearDays = 366;
  const openDays = opens.map((open) => ({ open, day: annualDay(open) }));
  const active = openDays.find(({ day }) => {
    if (closeDay == null) return today >= day;
    return closeDay >= day ? today >= day && today <= closeDay : today >= day || today <= closeDay;
  });
  const next = openDays
    .map((item) => ({ ...item, delta: (item.day - today + yearDays) % yearDays }))
    .filter((item) => item.delta > 0)
    .sort((a, b) => a.delta - b.delta)[0] || openDays[0];
  const firstOpenDay = openDays[0].day;
  const windowHasClosed = closeDay != null && (
    closeDay >= firstOpenDay
      ? today > closeDay
      : today > closeDay && today < firstOpenDay
  );

  let statusLabel: RecruitmentWindowInfo['statusLabel'];
  let tone: RecruitmentWindowTone;
  if (active) {
    statusLabel = 'Open Now';
    tone = 'success';
  } else if (next.delta > 0 && next.delta <= 15) {
    statusLabel = 'Opening Soon';
    tone = 'warning';
  } else if (next.delta > 0 && next.delta <= 90) {
    statusLabel = 'Expected';
    tone = 'muted';
  } else if (windowHasClosed) {
    statusLabel = 'Closed';
    tone = 'muted';
  } else {
    statusLabel = 'Upcoming';
    tone = 'warning';
  }

  const cycleOpen = active?.open || (statusLabel === 'Closed' ? opens[0] : next.open);
  const cycleOpenDay = annualDay(cycleOpen);
  const wrapsYear = closeDay != null && closeDay < cycleOpenDay;
  const currentYear = now.getFullYear();
  let openYear = currentYear;
  if (statusLabel === 'Closed' && wrapsYear) openYear = currentYear - 1;
  else if (statusLabel !== 'Closed' && !active && cycleOpenDay < today) openYear = currentYear + 1;
  else if (active && wrapsYear && today <= (closeDay ?? -1)) openYear = currentYear - 1;
  const closeYear = wrapsYear ? openYear + 1 : openYear;
  const openLabel = `Opens ${withYear(cycleOpen, openYear)}`;
  const closeLabel = close ? `Closes ${withYear(close, closeYear)}` : null;
  const cycleLabel = closeLabel
    ? `${withYear(cycleOpen, openYear)} – ${withYear(close, closeYear)}`
    : `${withYear(cycleOpen, openYear)} – close date not published`;

  return {
    published: true,
    statusLabel,
    cycleLabel,
    detailLabel: closeLabel ? `${openLabel} · ${closeLabel}` : `${openLabel} · Close date not published`,
    openLabel,
    closeLabel,
    tone,
    manualStatus: null,
  };
}
