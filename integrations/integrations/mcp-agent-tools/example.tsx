// MCP Agent Tools — register a tool the customer-facing agent can call.
//
// This admin-style panel reads the per-workspace customer-tools registry,
// lets you append a sample "add_to_catalog" MCP tool, and writes it back.
// Once saved, the workspace agent gains that tool on its next conversation
// and can add items to the shared catalog on a visitor's behalf.

import { useCallback, useEffect, useState } from "react";

const WORKSPACE_ID = (window as any).__WORKSPACE_ID__;

interface ToolParameter {
  type: "string" | "number" | "boolean";
  description?: string;
  required?: boolean;
  default?: any;
  enum?: string[];
}

interface CustomerToolDefinition {
  name: string;
  description: string;
  parameters: Record<string, ToolParameter>;
  action: {
    type: "api_call";
    method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
    endpoint: string;
    bodyMapping?: Record<string, string>;
  };
}

interface CustomerToolsRegistry {
  version: number;
  tools: CustomerToolDefinition[];
}

// A sample MCP tool: lets the agent add an item to the shared catalog
// (the same table the Collection app reads with { shared: true }).
//
// Session/auth handoff: when the agent calls this tool the platform forwards
// the visitor's session as X-Session-Id and injects workspaceId. A session-
// aware endpoint would stamp session_id (visitor-private); this endpoint writes
// a SHARED row (session_id = NULL), so the Collection app surfaces it via
// { shared: true }. See docs.md → "Session & auth context handoff".
const SAMPLE_TOOL: CustomerToolDefinition = {
  name: "add_to_catalog",
  description:
    "Add an item to the shared catalog when the visitor asks to save or share something with everyone.",
  parameters: {
    name: { type: "string", required: true, description: "Item name" },
    description: { type: "string", required: false, description: "Optional details" },
  },
  action: {
    type: "api_call",
    method: "POST",
    endpoint: `/api/hooks/execute/${WORKSPACE_ID}/add-to-catalog`,
    bodyMapping: { name: "name", description: "description" },
  },
};

export default function McpAgentToolsPanel() {
  const [registry, setRegistry] = useState<CustomerToolsRegistry>({ version: 1, tools: [] });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/workspace-settings/${WORKSPACE_ID}/customer-tools`);
      if (res.status === 404) {
        setRegistry({ version: 1, tools: [] });
      } else if (res.ok) {
        const data = await res.json();
        if (data?.registry?.tools) setRegistry(data.registry);
      } else {
        throw new Error(`Failed to load registry (${res.status})`);
      }
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const addSampleTool = async () => {
    setSaving(true);
    setError(null);
    setStatus(null);
    try {
      // Read-modify-write: keep existing tools, replace any with the same name.
      const others = registry.tools.filter((t) => t.name !== SAMPLE_TOOL.name);
      const next: CustomerToolsRegistry = {
        version: registry.version || 1,
        tools: [...others, SAMPLE_TOOL],
      };
      // GET/PUT asymmetry: the GET returns { registry: ... }, but the PUT
      // expects { value: ... } — sending { registry } is rejected with a 400.
      const res = await fetch(`/api/workspace-settings/${WORKSPACE_ID}/customer-tools`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ value: next }),
      });
      if (!res.ok) throw new Error(`Failed to save registry (${res.status})`);
      setRegistry(next);
      setStatus("Saved. The agent will see this tool on its next conversation.");
    } catch (e: any) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{ padding: 24, fontFamily: "Inter, system-ui, sans-serif" }}>
      <h2 style={{ margin: 0, fontSize: 18 }}>MCP Agent Tools</h2>
      <p style={{ color: "#6b7280", fontSize: 14 }}>
        Tools registered here are callable by this workspace's customer-facing agent.
      </p>

      {loading ? (
        <p style={{ color: "#6b7280" }}>Loading registry…</p>
      ) : error ? (
        <p style={{ color: "#dc2626" }}>Error: {error}</p>
      ) : (
        <>
          <div style={{ margin: "16px 0" }}>
            <strong>Registered tools ({registry.tools.length}):</strong>
            {registry.tools.length === 0 ? (
              <p style={{ color: "#6b7280", fontSize: 14 }}>None yet.</p>
            ) : (
              <ul style={{ fontSize: 14 }}>
                {registry.tools.map((t) => (
                  <li key={t.name}>
                    <code>{t.name}</code> — {t.description}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <button
            onClick={addSampleTool}
            disabled={saving}
            style={{
              padding: "8px 14px",
              borderRadius: 8,
              border: "none",
              background: "#0284c7",
              color: "#fff",
              fontSize: 14,
              cursor: saving ? "default" : "pointer",
              opacity: saving ? 0.6 : 1,
            }}
          >
            {saving ? "Saving…" : 'Register "add_to_catalog" tool'}
          </button>
          {status && <p style={{ color: "#16a34a", fontSize: 14 }}>{status}</p>}
        </>
      )}
    </div>
  );
}
