import { useState, useEffect } from 'react';

const workspaceId = 'workspace-123';

function ServerFunctionsApp() {
  const [hooks, setHooks] = useState([]);
  const [hookName, setHookName] = useState('');
  const [hookCode, setHookCode] = useState('respond(200, { hello: "world" });');
  const [testResult, setTestResult] = useState(null);

  useEffect(() => {
    loadHooks();
  }, []);

  const loadHooks = async () => {
    const response = await fetch(`/api/workspaces/${workspaceId}/hooks`);
    const data = await response.json();
    setHooks(data);
  };

  const createHook = async () => {
    await fetch(`/api/workspaces/${workspaceId}/hooks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: hookName,
        code: hookCode,
        language: 'javascript',
        enabled: true,
      }),
    });
    setHookName('');
    loadHooks();
  };

  const executeHook = async (name: string) => {
    const response = await fetch(
      `/api/workspaces/${workspaceId}/hooks/${name}/execute`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ test: true }),
      }
    );
    const result = await response.json();
    setTestResult(result);
  };

  const deleteHook = async (hookId: string) => {
    await fetch(`/api/workspaces/${workspaceId}/hooks/${hookId}`, {
      method: 'DELETE',
    });
    loadHooks();
  };

  const toggleHook = async (hookId: string, enabled: boolean) => {
    await fetch(`/api/workspaces/${workspaceId}/hooks/${hookId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ enabled: !enabled }),
    });
    loadHooks();
  };

  return (
    <div className="p-4 space-y-6">
      <div>
        <h2 className="text-lg font-bold mb-2">Create Server Function</h2>
        <div className="space-y-2">
          <input
            value={hookName}
            onChange={(e) => setHookName(e.target.value)}
            placeholder="Function name (e.g., process-webhook)"
            className="w-full p-2 border rounded"
          />
          <textarea
            value={hookCode}
            onChange={(e) => setHookCode(e.target.value)}
            placeholder="JavaScript code..."
            className="w-full p-2 border rounded font-mono text-sm"
            rows={6}
          />
          <button onClick={createHook} className="px-4 py-2 bg-blue-600 text-white rounded">
            Create Hook
          </button>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-bold mb-2">Server Functions</h2>
        {hooks.map((hook: any) => (
          <div key={hook.id} className="border p-3 rounded mb-2 flex items-center justify-between">
            <div>
              <span className="font-mono font-bold">{hook.name}</span>
              <span className={`ml-2 text-xs px-2 py-0.5 rounded ${hook.enabled ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {hook.enabled ? 'Active' : 'Disabled'}
              </span>
              <div className="text-sm text-gray-500 mt-1">
                Runs: {hook.executionCount} | Last: {hook.lastExecutedAt || 'Never'}
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => executeHook(hook.name)} className="px-3 py-1 bg-green-600 text-white rounded text-sm">
                Test
              </button>
              <button onClick={() => toggleHook(hook.id, hook.enabled)} className="px-3 py-1 bg-yellow-600 text-white rounded text-sm">
                {hook.enabled ? 'Disable' : 'Enable'}
              </button>
              <button onClick={() => deleteHook(hook.id)} className="px-3 py-1 bg-red-600 text-white rounded text-sm">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {testResult && (
        <div>
          <h2 className="text-lg font-bold mb-2">Test Result</h2>
          <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
            {JSON.stringify(testResult, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}

export default ServerFunctionsApp;
