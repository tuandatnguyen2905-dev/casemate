export const FIT_RESTORE_TIMEOUT_MS = 3000;
export const FIT_RESTORE_CACHE_TTL_MS = 7 * 24 * 60 * 60 * 1000;

export const FIT_ASSESSMENT_RESTORE_COLUMNS = ['id', 'result_json', 'recommended_subroles'] as const;
export const FIT_ROADMAP_RESTORE_COLUMNS = [
  'fit_result_reference',
  'target_program_id',
  'target_program',
  'target_company',
  'target_function',
  'recruitment_cycle',
  'window_label',
] as const;

export type FitRestoreSnapshot = {
  target: Record<string, unknown>;
  selectedFunction: string;
  fitAnalysis: Record<string, unknown>;
  assessmentResultId: number;
  stage: 5 | 6;
};

type CachedFitRestore = {
  savedAt: number;
  snapshot: FitRestoreSnapshot;
};

export function fitRestoreCacheKey(email: string): string {
  return `casemate-fit-restore-v1:${encodeURIComponent(email.trim().toLowerCase())}`;
}

export function encodeFitRestoreCache(snapshot: FitRestoreSnapshot, now = Date.now()): string {
  return JSON.stringify({ savedAt: now, snapshot } satisfies CachedFitRestore);
}

export function parseFitRestoreCache(raw: string | null, now = Date.now()): FitRestoreSnapshot | null {
  if (!raw) return null;
  try {
    const cached = JSON.parse(raw) as Partial<CachedFitRestore>;
    const snapshot = cached.snapshot as Partial<FitRestoreSnapshot> | undefined;
    if (
      !Number.isFinite(cached.savedAt)
      || now - Number(cached.savedAt) > FIT_RESTORE_CACHE_TTL_MS
      || now < Number(cached.savedAt)
      || !snapshot
      || !snapshot.target
      || typeof snapshot.target !== 'object'
      || !snapshot.fitAnalysis
      || typeof snapshot.fitAnalysis !== 'object'
      || !Number.isFinite(Number(snapshot.assessmentResultId))
      || (snapshot.stage !== 5 && snapshot.stage !== 6)
    ) return null;
    return {
      target: snapshot.target as Record<string, unknown>,
      selectedFunction: String(snapshot.selectedFunction || ''),
      fitAnalysis: snapshot.fitAnalysis as Record<string, unknown>,
      assessmentResultId: Number(snapshot.assessmentResultId),
      stage: snapshot.stage,
    };
  } catch {
    return null;
  }
}

export function didFitRestoreTimeout(startedAt: number, now: number): boolean {
  return now - startedAt >= FIT_RESTORE_TIMEOUT_MS;
}

type RectLike = { left: number; top: number; right?: number; bottom: number; width: number; height?: number };

export function getTourPopoverPosition(
  targetRect: RectLike | null,
  viewportWidth: number,
  viewportHeight: number,
  popoverWidth: number,
): { x: number; y: number; transform: string } {
  const x = targetRect
    ? Math.max(12, Math.min(viewportWidth - popoverWidth - 12, targetRect.left + targetRect.width / 2 - popoverWidth / 2))
    : 12;
  const y = targetRect
    ? (targetRect.top > viewportHeight * 0.65
      ? Math.max(12, targetRect.top - 320)
      : Math.max(72, targetRect.bottom + 12))
    : 88;
  return { x, y, transform: `translate3d(${Math.round(x)}px, ${Math.round(y)}px, 0)` };
}

export function tourMotionSettings(reducedMotion: boolean): { scrollBehavior: ScrollBehavior; transitionMs: number } {
  return reducedMotion
    ? { scrollBehavior: 'auto', transitionMs: 0 }
    : { scrollBehavior: 'smooth', transitionMs: 300 };
}
