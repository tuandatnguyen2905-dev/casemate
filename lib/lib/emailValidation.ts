// Front-door email-format validation, shared by every surface that captures
// a user-typed email into the CRM/relationships system (EmailGate, Settings,
// PaywallGate). A malformed email must never reach /api/space/:spaceId/register
// — invalid submissions are rejected inline before any contact/lead record is
// written or an OTP is sent.
//
// FORMAT-ONLY by design: this does not guarantee the mailbox exists. The
// existing OTP step stays the real deliverability check — a well-formed but
// fake address simply never receives the code. Do not add external
// mailbox-verification calls here.
//
// Accepts: local part + "@" + domain with at least one dot and an alphabetic
// TLD of 2+ letters (e.g. "an.nguyen@gmail.com"). Leading/trailing whitespace
// is trimmed before checking, so a whitespace-padded valid email passes.
// Rejects: no "@" ("abc"), empty domain ("abc@"), domain without a dot
// ("abc@gmail", "test@gmial"), empty local part ("@gmail.com"), spaces inside
// ("a b@gmail.com"), and multiple "@" signs.
const EMAIL_FORMAT_REGEX =
  /^[A-Za-z0-9!#$%&'*+/=?^_`{|}~.-]+@[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?(?:\.[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?)*\.[A-Za-z]{2,}$/;

export function isValidEmailFormat(rawEmail: string): boolean {
  const email = (rawEmail || '').trim();
  if (!email || email.length > 254) return false;
  const localPart = email.split('@')[0];
  if (!localPart || localPart.length > 64) return false;
  return EMAIL_FORMAT_REGEX.test(email);
}

// Gentle inline retry copy (English UI per the language-switch brief).
export const INVALID_EMAIL_MESSAGE =
  'That email doesn\u2019t look right — please double-check it.';
