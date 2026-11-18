/** Public policy text served at /api/space-data/public/casemate/fit-data-use-policy.txt */
export const FIT_DATA_USE_POLICY_PUBLIC_PATH = '/api/space-data/public/casemate/fit-data-use-policy.txt';

const DIALOG_ID = 'fit-data-use-policy-dialog';

// The public file only resolves to this space when the request carries X-App-Id, which a
// plain new-tab link cannot send, so the policy is fetched and shown in an in-page dialog.
export function openFitDataUsePolicy() {
  if (typeof document === 'undefined') return;
  document.getElementById(DIALOG_ID)?.remove();
  const appId = (window as any).__APP_ID__ || (window as any).__SPACE_ID__ || 'workspace-539150';

  const overlay = document.createElement('div');
  overlay.id = DIALOG_ID;
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-label', 'How we use your data');
  overlay.style.cssText = 'position:fixed;inset:0;z-index:10000;display:flex;align-items:center;justify-content:center;padding:16px;background:rgba(15,23,42,0.55);';

  const panel = document.createElement('div');
  panel.style.cssText = 'width:100%;max-width:640px;max-height:85vh;display:flex;flex-direction:column;overflow:hidden;border-radius:16px;background:var(--space-surface-card,#ffffff);color:var(--space-text-primary,#111827);box-shadow:0 20px 50px rgba(0,0,0,0.25);font-family:inherit;';

  const header = document.createElement('div');
  header.style.cssText = 'display:flex;align-items:center;justify-content:space-between;gap:12px;padding:16px 20px;border-bottom:1px solid var(--space-border-default,#e5e7eb);';
  const title = document.createElement('p');
  title.textContent = 'How we use your data';
  title.style.cssText = 'margin:0;font-size:16px;font-weight:800;';
  const closeButton = document.createElement('button');
  closeButton.type = 'button';
  closeButton.textContent = 'Close';
  closeButton.style.cssText = 'border:1px solid var(--space-border-default,#e5e7eb);border-radius:10px;background:transparent;color:inherit;padding:6px 12px;font-size:13px;font-weight:700;cursor:pointer;';
  header.append(title, closeButton);

  const body = document.createElement('div');
  body.textContent = 'Loading…';
  body.style.cssText = 'overflow-y:auto;padding:16px 20px 20px;white-space:pre-wrap;font-size:14px;line-height:1.6;color:var(--space-text-secondary,#374151);';

  panel.append(header, body);
  overlay.append(panel);

  const close = () => {
    overlay.remove();
    document.removeEventListener('keydown', onKeyDown);
  };
  const onKeyDown = (event: KeyboardEvent) => { if (event.key === 'Escape') close(); };
  closeButton.addEventListener('click', close);
  overlay.addEventListener('click', (event) => { if (event.target === overlay) close(); });
  document.addEventListener('keydown', onKeyDown);
  document.body.append(overlay);
  closeButton.focus();

  fetch(FIT_DATA_USE_POLICY_PUBLIC_PATH, { headers: { 'X-App-Id': String(appId) } })
    .then((response) => (response.ok ? response.text() : Promise.reject(new Error(`HTTP ${response.status}`))))
    .then((text) => { body.textContent = text.trim(); })
    .catch(() => { body.textContent = 'The policy could not be loaded right now. Please try again, or email support@casemateaud.com for a copy.'; });
}
