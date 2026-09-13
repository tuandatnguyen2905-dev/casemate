/**
 * Social Publishing example — reference for Space apps.
 * Referencing window.__workspaceDb causes the WorkspaceDB SDK (and its auth
 * token) to be injected at compile time. The marketing endpoints are
 * workspace-scoped and require the X-Workspace-DB-Token header — do not add
 * any npm imports for an SDK.
 *
 * Connect-then-post: connect LinkedIn (pick an org page) in-app, then publish.
 * The same shape works for Instagram via the Meta connect flow
 * (connect/init with scope content_publishing). The marketing endpoints are
 * stateless — record your own post history in a WorkspaceDB table.
 */
import { useEffect, useState } from 'react';

export default function SocialConnectAndPost() {
  const [li, setLi] = useState<any>({ connected: false, organization: null });
  const [orgs, setOrgs] = useState<any[]>([]);
  const [content, setContent] = useState('');
  const [status, setStatus] = useState('');
  const [busy, setBusy] = useState(false);

  const ctx = () => {
    const ws = (window as any).__workspaceDb;
    return {
      base: `/api/workspaces/${ws.workspaceId}/marketing`,
      headers: { 'Content-Type': 'application/json', 'X-Workspace-DB-Token': ws.token },
      db: ws,
    };
  };

  const refresh = async () => {
    const { base, headers } = ctx();
    const res = await fetch(`${base}/connect/linkedin/status`, { headers });
    setLi(await res.json());
  };

  useEffect(() => {
    refresh();
  }, []);

  const connectLinkedIn = async () => {
    setBusy(true);
    try {
      const { base, headers } = ctx();
      const { authUrl } = await fetch(`${base}/connect/linkedin/init`, {
        method: 'POST',
        headers,
      }).then((r) => r.json());
      const popup = window.open(authUrl, 'li-connect', 'width=600,height=800');
      const timer = setInterval(async () => {
        const res = await fetch(`${base}/connect/linkedin/status`, { headers });
        const s = await res.json();
        if (s.connected) {
          clearInterval(timer);
          popup?.close();
          setLi(s);
          const orgRes = await fetch(`${base}/connect/linkedin/organizations`, { headers });
          const r = await orgRes.json();
          setOrgs(r.organizations || []);
          setBusy(false);
        }
      }, 2000);
    } catch {
      setBusy(false);
    }
  };

  const pickOrg = async (o: any) => {
    const { base, headers } = ctx();
    await fetch(`${base}/connect/linkedin/select-organization`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        organizationalTarget: o.organizationalTarget || o.urn,
        organizationId: o.id,
        name: o.name,
      }),
    });
    refresh();
  };

  const post = async () => {
    const { base, headers, db } = ctx();
    const r = await fetch(`${base}/posts/linkedin`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ content }),
    }).then((res) => res.json());
    if (r.success) {
      await db.from('social_posts').insert({
        platform: 'linkedin',
        content,
        external_id: r.postId || null,
      });
      setStatus('Published!');
      setContent('');
    } else {
      setStatus(`Error: ${r.error || 'failed'}`);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 space-y-3">
      <h2 className="text-xl font-bold">LinkedIn Composer</h2>

      {!li.connected ? (
        <button
          onClick={connectLinkedIn}
          disabled={busy}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {busy ? 'Connecting…' : 'Connect LinkedIn'}
        </button>
      ) : !li.organization ? (
        <div className="space-y-1">
          <p className="text-sm">Pick a LinkedIn page to post as:</p>
          {orgs.map((o) => (
            <button
              key={o.id || o.urn}
              onClick={() => pickOrg(o)}
              className="block w-full text-left px-3 py-1 border rounded hover:bg-gray-50"
            >
              {o.name}
            </button>
          ))}
        </div>
      ) : (
        <>
          <p className="text-xs text-gray-500">Posting as {li.organization.name}</p>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={4}
            className="w-full p-2 border rounded"
            placeholder="Post text"
          />
          <button
            onClick={post}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Post to LinkedIn
          </button>
          {status && <p className="text-sm text-gray-600">{status}</p>}
        </>
      )}
    </div>
  );
}
