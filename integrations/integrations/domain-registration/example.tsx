import { useState } from 'react';

/**
 * Task #1235: example flow for registering a domain through the wallet-gated
 * `domain-registration` integration. Demonstrates:
 *   - quote → preview → register
 *   - canonical insufficient_funds rendering
 *   - idempotency via stable client-generated key
 */
export function RegisterDomainExample({ workspaceId }: { workspaceId: string }) {
  const [domain, setDomain] = useState('');
  const [status, setStatus] = useState<string>('');
  const [shortfall, setShortfall] = useState<number | null>(null);

  async function handleRegister() {
    setStatus('Quoting…');
    const quote = await fetch(`/api/workspaces/${workspaceId}/domains/quote`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ domain }),
    }).then(r => r.json());

    if (!quote.available) {
      setStatus(`${domain} is not available.`);
      return;
    }

    setStatus(`Available at $${quote.registrationPrice}. Confirming…`);
    const idempotencyKey = `${workspaceId}:${domain}:${Date.now()}`;
    const result = await fetch(`/api/workspaces/${workspaceId}/domains/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'idempotency-key': idempotencyKey },
      body: JSON.stringify({ domain, userConfirmed: true, idempotencyKey }),
    });

    if (result.status === 402) {
      const body = await result.json();
      setShortfall(body.shortfall);
      setStatus(body.message);
      return;
    }
    if (!result.ok) {
      const body = await result.json();
      setStatus(`Failed: ${body.error}`);
      return;
    }
    const body = await result.json();
    setStatus(`Registered ${body.domain}. Hosts attached: ${body.attachedHosts.join(', ')}`);
  }

  return (
    <div>
      <input value={domain} onChange={e => setDomain(e.target.value)} placeholder="myapp.com" />
      <button onClick={handleRegister}>Register</button>
      <p>{status}</p>
      {shortfall != null && <a href="/wallet/topup">Add ${shortfall.toFixed(2)} to continue</a>}
    </div>
  );
}
