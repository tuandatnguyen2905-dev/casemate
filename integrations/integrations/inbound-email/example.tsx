import { useState, useEffect } from 'react';

const workspaceId = 'workspace-123';

function InboundEmailApp() {
  const [hookStatus, setHookStatus] = useState<'loading' | 'active' | 'inactive'>('loading');
  const [emails, setEmails] = useState([]);
  const [autoReply, setAutoReply] = useState(true);
  const [replyTemplate, setReplyTemplate] = useState(
    'Thanks for reaching out! We received your email and will respond within 24 hours.'
  );

  useEffect(() => {
    checkHookStatus();
  }, []);

  const checkHookStatus = async () => {
    const response = await fetch(`/api/workspaces/${workspaceId}/hooks`);
    const hooks = await response.json();
    const emailHook = hooks.find((h: any) => h.name === 'inbound-email');
    setHookStatus(emailHook?.enabled ? 'active' : 'inactive');
  };

  const setupInboundEmail = async () => {
    const hookCode = `
const { from, subject, bodyPlain } = request.body;
console.log('Email from ' + from + ': ' + subject);
console.log('Body: ' + bodyPlain);
respond(200, { received: true, from, subject });
    `.trim();

    await fetch(`/api/workspaces/${workspaceId}/hooks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'inbound-email',
        description: 'Process incoming support emails',
        code: hookCode,
        secret: 'mailgun-' + Date.now(),
      }),
    });
    setHookStatus('active');
  };

  return (
    <div className="p-4 space-y-6">
      <div>
        <h2 className="text-lg font-bold mb-2">Inbound Email Setup</h2>
        <div className="border p-4 rounded">
          <div className="flex items-center justify-between mb-4">
            <span>Inbound Email Hook Status:</span>
            <span className={`px-2 py-1 rounded text-sm ${
              hookStatus === 'active' ? 'bg-green-100 text-green-800' :
              hookStatus === 'inactive' ? 'bg-red-100 text-red-800' :
              'bg-gray-100 text-gray-600'
            }`}>
              {hookStatus === 'loading' ? 'Checking...' : hookStatus}
            </span>
          </div>
          {hookStatus === 'inactive' && (
            <button onClick={setupInboundEmail} className="px-4 py-2 bg-blue-600 text-white rounded">
              Setup Inbound Email Hook
            </button>
          )}
          {hookStatus === 'active' && (
            <div className="text-sm text-gray-600">
              <p>Webhook URL:</p>
              <code className="block bg-gray-100 p-2 rounded mt-1">
                /api/workspaces/{workspaceId}/hooks/inbound-email/execute
              </code>
              <p className="mt-2">Configure this URL in your Mailgun inbound routes.</p>
            </div>
          )}
        </div>
      </div>

      <div>
        <h2 className="text-lg font-bold mb-2">Auto-Reply Settings</h2>
        <label className="flex items-center gap-2 mb-2">
          <input
            type="checkbox"
            checked={autoReply}
            onChange={(e) => setAutoReply(e.target.checked)}
          />
          Enable auto-reply to incoming emails
        </label>
        {autoReply && (
          <textarea
            value={replyTemplate}
            onChange={(e) => setReplyTemplate(e.target.value)}
            className="w-full p-2 border rounded"
            rows={4}
          />
        )}
      </div>
    </div>
  );
}

export default InboundEmailApp;
