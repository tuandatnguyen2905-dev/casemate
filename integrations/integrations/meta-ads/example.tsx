/**
 * Meta Ads example — reference for Space apps.
 * Referencing window.__workspaceDb causes the WorkspaceDB SDK (and its auth
 * token) to be injected at compile time. The marketing endpoints are
 * workspace-scoped and require the X-Workspace-DB-Token header — do not add
 * any npm imports for an SDK.
 *
 * This dashboard reads insights for a campaign and lets the operator pause or
 * resume it. The app stores its own campaign list in a WorkspaceDB table
 * ('campaigns'); the marketing endpoints are stateless.
 */
import { useState } from 'react';

export default function MetaAdsDashboard() {
  const { data: campaigns, loading, refresh } = useWorkspaceDB('campaigns', {
    shared: true,
    orderBy: { column: 'created_at', direction: 'desc' },
    limit: 50,
  });

  const [insights, setInsights] = useState<Record<string, any>>({});
  const [busy, setBusy] = useState<string | null>(null);

  const ctx = () => {
    const ws = (window as any).__workspaceDb;
    return {
      base: `/api/workspaces/${ws.workspaceId}/marketing`,
      headers: { 'Content-Type': 'application/json', 'X-Workspace-DB-Token': ws.token },
    };
  };

  const loadInsights = async (metaCampaignId: string) => {
    const { base, headers } = ctx();
    const qs = new URLSearchParams({ level: 'campaign', objectId: metaCampaignId, datePreset: 'last_30d' });
    const res = await fetch(`${base}/ads/insights?${qs}`, { headers });
    const data = await res.json();
    setInsights((prev) => ({ ...prev, [metaCampaignId]: data.insights }));
  };

  const setStatus = async (metaCampaignId: string, status: 'ACTIVE' | 'PAUSED') => {
    setBusy(metaCampaignId);
    try {
      const { base, headers } = ctx();
      await fetch(`${base}/ads/object-status`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ level: 'campaign', objectId: metaCampaignId, status }),
      });
      refresh();
    } finally {
      setBusy(null);
    }
  };

  if (loading) return <div className="p-4">Loading campaigns...</div>;

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-bold">Ad Campaigns ({campaigns.length})</h2>
      <div className="space-y-3">
        {campaigns.map((c: any) => (
          <div key={c.id} className="border rounded p-4 space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-medium">{c.name}</span>
                <span className="ml-2 text-gray-500 text-sm">{c.meta_campaign_id}</span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => loadInsights(c.meta_campaign_id)}
                  className="px-3 py-1 text-sm border rounded hover:bg-gray-50"
                >
                  Insights
                </button>
                <button
                  disabled={busy === c.meta_campaign_id}
                  onClick={() => setStatus(c.meta_campaign_id, 'PAUSED')}
                  className="px-3 py-1 text-sm border rounded hover:bg-gray-50 disabled:opacity-50"
                >
                  Pause
                </button>
                <button
                  disabled={busy === c.meta_campaign_id}
                  onClick={() => setStatus(c.meta_campaign_id, 'ACTIVE')}
                  className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                >
                  Resume
                </button>
              </div>
            </div>
            {insights[c.meta_campaign_id] && (
              <pre className="text-xs bg-gray-50 p-2 rounded overflow-auto">
                {JSON.stringify(insights[c.meta_campaign_id], null, 2)}
              </pre>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
