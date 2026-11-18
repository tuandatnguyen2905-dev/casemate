import type { ProductClusterId } from './industryProductClusters';

export type IndustryPeerBenchmark = {
  version: number;
  reference_level: 'industry_product';
  target_cluster: ProductClusterId | string;
  target_cluster_label_vi: string;
  peer_count: number;
  limited_data: boolean;
  candidate_has_cluster_experience: boolean;
  similarity_percent: number | null;
  percentile: number | null;
  strengths_vs_peers: string[];
  gaps_vs_peers: string[];
  summary_vi: string;
};

export type PeerBenchmarkPrivacy = {
  opted_in: boolean;
  opted_out: boolean;
  admit_claimed: boolean;
  admit_verified: boolean;
};

export type PeerBenchmarkPayload = {
  target_company: string;
  target_industry: string;
  target_sector?: string;
  cv_profile: Record<string, unknown>;
  ocp_scores?: Record<string, number>;
  mbti_type?: string;
  analysis?: Record<string, unknown> | null;
  assessment_session_id?: string;
  contribute?: boolean;
};

const PEER_HOOK = '/api/hooks/execute/workspace-539150/casemate-industry-peer-v1';

async function callPeerHook(sessionId: string | null | undefined, action: string, body: Record<string, unknown> = {}) {
  if (!sessionId) return null;
  try {
    const response = await fetch(`${PEER_HOOK}?action=${encodeURIComponent(action)}`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json', 'X-Session-Id': sessionId },
      body: JSON.stringify(body),
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok || data.success === false) return null;
    return data as Record<string, any>;
  } catch {
    return null;
  }
}

export async function fetchIndustryPeerBenchmark(
  sessionId: string | null | undefined,
  payload: PeerBenchmarkPayload,
): Promise<IndustryPeerBenchmark | null> {
  const data = await callPeerHook(sessionId, 'compare', payload);
  return data?.peer_benchmark ? data.peer_benchmark as IndustryPeerBenchmark : null;
}

export async function fetchPeerBenchmarkPrivacy(sessionId: string | null | undefined): Promise<PeerBenchmarkPrivacy | null> {
  const data = await callPeerHook(sessionId, 'privacy_status');
  return data?.privacy ? data.privacy as PeerBenchmarkPrivacy : null;
}

export async function setPeerBenchmarkPrivacy(sessionId: string | null | undefined, optIn: boolean): Promise<PeerBenchmarkPrivacy | null> {
  const data = await callPeerHook(sessionId, 'set_privacy', { opt_in: optIn });
  return data?.privacy ? data.privacy as PeerBenchmarkPrivacy : null;
}

export async function confirmPeerBenchmarkOutcome(sessionId: string | null | undefined, outcomeLabel: string): Promise<PeerBenchmarkPrivacy | null> {
  const data = await callPeerHook(sessionId, 'confirm_outcome', { outcome_label: outcomeLabel.trim() });
  return data?.privacy ? data.privacy as PeerBenchmarkPrivacy : null;
}
