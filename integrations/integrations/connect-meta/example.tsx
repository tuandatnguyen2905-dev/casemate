/**
 * Connect Meta example — reference for Space apps.
 * Referencing window.__workspaceDb causes the WorkspaceDB SDK (and its auth
 * token) to be injected at compile time. The connect endpoints are
 * workspace-scoped and require the X-Workspace-DB-Token header — do not add
 * any npm imports for an SDK.
 *
 * Standalone "Connect Meta" — connect a Meta (Facebook/Instagram) account,
 * read its page / Instagram / ad accounts, and disconnect. Connect-only:
 * no campaign launch, no publishing, no wallet charges.
 */
import { useEffect, useState } from 'react';

export default function ConnectMetaButton() {
  const [conn, setConn] = useState<any>({ connected: false });
  const [busy, setBusy] = useState(false);

  const ctx = () => {
    const ws = (window as any).__workspaceDb;
    return {
      base: `/api/workspaces/${ws.workspaceId}/marketing`,
      headers: { 'Content-Type': 'application/json', 'X-Workspace-DB-Token': ws.token },
    };
  };

  const refresh = async () => {
    const { base, headers } = ctx();
    const res = await fetch(`${base}/connect/status`, { headers });
    setConn(await res.json());
  };

  useEffect(() => {
    refresh();
  }, []);

  const connect = async () => {
    setBusy(true);
    try {
      const { base, headers } = ctx();
      const { authUrl } = await fetch(`${base}/connect/init`, {
        method: 'POST',
        headers,
        body: JSON.stringify({}), // all scopes by default
      }).then((r) => r.json());
      const popup = window.open(authUrl, 'meta-connect', 'width=600,height=800');
      const timer = setInterval(async () => {
        const res = await fetch(`${base}/connect/status`, { headers });
        const s = await res.json();
        if (s.connected) {
          clearInterval(timer);
          popup?.close();
          setConn(s);
          setBusy(false);
        }
      }, 2000);
    } catch {
      setBusy(false);
    }
  };

  const disconnect = async () => {
    const { base, headers } = ctx();
    await fetch(`${base}/connect/disconnect`, { method: 'POST', headers });
    refresh();
  };

  if (!conn.connected) {
    return (
      <div className="p-4">
        <button
          onClick={connect}
          disabled={busy}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {busy ? 'Connecting…' : 'Connect your Meta account'}
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-2">
      <p className="font-medium">Meta connected ✓</p>
      {conn.page && <p className="text-sm">Page: {conn.page.name}</p>}
      {conn.instagram && <p className="text-sm">Instagram: @{conn.instagram.username}</p>}
      <p className="text-sm">
        Ad accounts: {(conn.adAccountIds || []).join(', ') || 'none'}
      </p>
      <button onClick={disconnect} className="px-3 py-1 border rounded hover:bg-gray-50">
        Disconnect
      </button>
    </div>
  );
}
