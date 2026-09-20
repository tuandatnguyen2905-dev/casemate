// Casemate v1.1.1 — founder access to internal-only surfaces from a normal
// customer session.
//
// The "Usage · Founder" dashboard is registered in config.json with
// allowedRoles: ["founder"], which makes it visible in entrepreneur mode
// (App Studio). The founder ALSO uses Casemate on the live site signed in
// like any customer, so the OTP-verified sign-in emails below are treated
// as the founder too — the dashboard then appears in their own sidebar.
//
// This is a visibility convenience for aggregate usage numbers (the
// dashboard renders counts only, never customer emails). Sign-in emails are
// verified with an emailed one-time code since v1.1, so nobody can sign in
// with these addresses without access to that inbox.
//
// To grant another address, add it here (lowercase) — it is also EXCLUDED
// from the usage metrics so founder test visits never inflate retention.
export const FOUNDER_EMAILS = ['benjaminnguyen.work03@gmail.com'];

export function isFounderEmail(email: unknown): boolean {
  return typeof email === 'string' && FOUNDER_EMAILS.includes(email.toLowerCase().trim());
}

// True when the CURRENT device's stored sign-in belongs to a founder email.
// Sessions still pending OTP verification (verified === false) don't count.
export function isFounderEmailSession(spaceId: string): boolean {
  try {
    const stored = localStorage.getItem(`space_session_${spaceId}`);
    if (!stored) return false;
    const session = JSON.parse(stored);
    if (!session || session.verified === false) return false;
    return isFounderEmail(session.email);
  } catch (e) {
    return false;
  }
}
