export type McqChoice = 'A' | 'B' | 'C' | 'D';

export type SoftSkillQuestion = {
  item_id: string;
  item_type: string;
  module?: string;
  skill_or_trait_id?: string;
  question: string;
  option_A?: string;
  option_B?: string;
  option_C?: string;
  option_D?: string;
  score_A?: number;
  score_B?: number;
  score_C?: number;
  score_D?: number;
  note?: string;
  max_score?: number;
};

const BANK_URL = '/api/space-data/public/casemate/softSkillV2.json';

/** Modules covered elsewhere (OCP / Target Motivation) or removed to shorten the session. */
const SKIPPED_FIT_MODULES = new Set([
  'Work-Style (forced choice)',
  'Personality (paired)',
  'Motivation & Preference',
]);

/** Situational items kept for discovery + validation (evenly sampled when the bank is larger). */
const MAX_SITUATIONAL_ITEMS = 12;

let cachedBank: SoftSkillQuestion[] | null = null;

export function softSkillModuleLabel(item: SoftSkillQuestion): string {
  return String(item.module || item.item_type || '').trim();
}

export function selectCoreSoftSkillBank(bank: SoftSkillQuestion[]): SoftSkillQuestion[] {
  const situational = bank.filter(
    (item) => softSkillModuleLabel(item) === 'Situational Judgement' && !SKIPPED_FIT_MODULES.has(softSkillModuleLabel(item)),
  );

  const pickedSituational: SoftSkillQuestion[] = [];
  if (situational.length <= MAX_SITUATIONAL_ITEMS) {
    pickedSituational.push(...situational);
  } else {
    const step = situational.length / MAX_SITUATIONAL_ITEMS;
    for (let i = 0; pickedSituational.length < MAX_SITUATIONAL_ITEMS; i++) {
      const index = Math.min(situational.length - 1, Math.floor(i * step));
      const item = situational[index];
      if (item && !pickedSituational.includes(item)) pickedSituational.push(item);
    }
  }

  return pickedSituational;
}

export async function fetchSoftSkillQuestionBank(): Promise<SoftSkillQuestion[]> {
  if (cachedBank?.length) return cachedBank;
  const appId = (typeof window !== 'undefined' && ((window as any).__APP_ID__ || (window as any).__SPACE_ID__)) || 'workspace-539150';
  const response = await fetch(BANK_URL, { headers: { 'X-App-Id': String(appId) } });
  if (!response.ok) throw new Error('Casemate could not load the soft-skill question bank.');
  const data = await response.json();
  const bank = Array.isArray(data?.Question_Bank) ? data.Question_Bank : [];
  cachedBank = bank;
  return bank;
}

export async function fetchCoreSoftSkillQuestionBank(): Promise<SoftSkillQuestion[]> {
  const bank = await fetchSoftSkillQuestionBank();
  return selectCoreSoftSkillBank(bank);
}

// The bank puts the strongest answer under B on almost every scenario, so each
// scenario is shown in a fixed shuffled order while answers stay stored under
// the bank's own letters. casemate-matching-engine-v1 repeats this function to
// read the on-screen position of an answer; keep both copies identical.
const SJT_DISPLAY_SALT = 'casemate-sjt-244';
export function sjtDisplayOrder(itemId: string): McqChoice[] {
  let h = 2166136261;
  const seed = `${SJT_DISPLAY_SALT}:${itemId}`;
  for (let i = 0; i < seed.length; i++) h = Math.imul(h ^ seed.charCodeAt(i), 16777619) >>> 0;
  const order: McqChoice[] = ['A', 'B', 'C', 'D'];
  for (let i = order.length - 1; i > 0; i--) {
    h = Math.imul(h ^ (h >>> 15), 2246822507) >>> 0;
    h = Math.imul(h ^ (h >>> 13), 3266489909) >>> 0;
    const j = h % (i + 1);
    [order[i], order[j]] = [order[j], order[i]];
  }
  return order;
}

export function softSkillMcqComplete(answers: Record<string, McqChoice>, bank: SoftSkillQuestion[]): boolean {
  if (!bank.length) return false;
  return bank.every((item) => answers[item.item_id] === 'A' || answers[item.item_id] === 'B' || answers[item.item_id] === 'C' || answers[item.item_id] === 'D');
}

export function scorePreviewForChoice(item: SoftSkillQuestion, choice: McqChoice): number | null {
  const key = `score_${choice}` as 'score_A' | 'score_B' | 'score_C' | 'score_D';
  const raw = item[key];
  return typeof raw === 'number' && Number.isFinite(raw) ? raw : null;
}
