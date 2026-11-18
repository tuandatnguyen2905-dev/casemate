export type InternationalExposureSignal = 'worked_abroad' | 'business_travel' | 'international_partners' | 'studied_abroad';

export type InternationalExposure = {
  signals: InternationalExposureSignal[];
  labels: string[];
  summary: string;
};

const SIGNAL_LABELS: Record<InternationalExposureSignal, string> = {
  worked_abroad: 'work experience abroad',
  business_travel: 'overseas business travel',
  international_partners: 'work with international partners or cross-border teams',
  studied_abroad: 'study-abroad or international exchange experience',
};

function textOf(value: unknown): string {
  if (Array.isArray(value)) return value.map(textOf).join(' ');
  if (value && typeof value === 'object') return Object.values(value as Record<string, unknown>).map(textOf).join(' ');
  return String(value || '');
}

export function detectInternationalExposure(profile: any): InternationalExposure {
  const experiences = Array.isArray(profile?.experiences) ? profile.experiences : [];
  const education = Array.isArray(profile?.education) ? profile.education : [];
  const activities = Array.isArray(profile?.extracurricular_activities) ? profile.extracurricular_activities : [];
  const rawText = textOf([
    experiences,
    education,
    activities,
    profile?.parsed_cv?.raw_cv_text,
    profile?.raw_cv_text,
    profile?.standout_points,
    profile?.cities_mentioned,
  ]).toLowerCase().replace(/\s+/g, ' ');

  const signals: InternationalExposureSignal[] = [];
  if (/\b(worked|working|based|interned|assignment|secondment|relocated)\b.{0,45}\b(abroad|overseas|outside vietnam|foreign country|singapore|thailand|malaysia|indonesia|japan|korea|china|australia|europe|united states|usa|uk)\b|làm việc (?:tại )?nước ngoài|lam viec (?:tai )?nuoc ngoai/i.test(rawText)) signals.push('worked_abroad');
  if (/\b(business trip|business travel|travelled for work|traveled for work|overseas trip|onsite visit|client visit abroad|regional travel)\b|đi công tác|di cong tac|công tác nước ngoài|cong tac nuoc ngoai/i.test(rawText)) signals.push('business_travel');
  if (/\b(international|foreign|overseas|cross-border|cross market|regional|global|apac|asean)\b.{0,55}\b(client|customer|partner|vendor|supplier|stakeholder|team|project|campaign|market)\b|\b(client|customer|partner|vendor|supplier|stakeholder|team|project|campaign)\b.{0,55}\b(international|foreign|overseas|cross-border|regional|global|apac|asean)\b|đối tác nước ngoài|doi tac nuoc ngoai|khách hàng quốc tế|khach hang quoc te|nhóm quốc tế|nhom quoc te/i.test(rawText)) signals.push('international_partners');
  if (/\b(study abroad|studied abroad|exchange student|exchange semester|semester abroad|overseas study|international exchange|erasmus)\b|du học|du hoc|trao đổi quốc tế|trao doi quoc te/i.test(rawText)) signals.push('studied_abroad');

  const uniqueSignals = Array.from(new Set(signals));
  const labels = uniqueSignals.map((signal) => SIGNAL_LABELS[signal]);
  const summary = labels.length
    ? `Your CV shows ${labels.join(', ')}.`
    : 'No international exposure is explicitly confirmed in the current CV.';
  return { signals: uniqueSignals, labels, summary };
}
