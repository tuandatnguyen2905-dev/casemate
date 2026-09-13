// Casemate multi-method authentication (auth-v4).
//
// ONE module owns everything about the sign-in methods:
//
//   1. Email — OTP-ONLY (the original flow, restored in auth-v4). The gate
//      registers the email via POST /api/space/:spaceId/register and verifies
//      mailbox ownership with the platform's emailed 4-digit one-time code
//      (/api/auth/otp/space/*) — this hook is NOT involved in email sign-in.
//      There is NO password field anywhere: password sign-up/sign-in/reset
//      were removed in auth-v4. The WorkspaceDB `auth_accounts` table keeps
//      its password columns untouched (never dropped — zero data loss), but
//      they are no longer used for auth; every email account, including ones
//      that once set a password, signs in with the emailed code and lands in
//      the same CRM contact + session, because email is the account key.
//   2. Google — the browser starts an OAuth 2.0 authorization-code + PKCE flow
//      with the FIXED production callback /auth/callback/google. The code goes
//      to the server hook, which exchanges it using GOOGLE_CLIENT_SECRET,
//      verifies audience + email with tokeninfo/userinfo, then mints a session.
//      The browser never receives the client secret or asserts an email.
//   3. Facebook — the browser starts an OAuth 2.0 authorization-code flow with
//      the FIXED production callback /auth/facebook/callback and permissions
//      email + public_profile. The hook exchanges the code using
//      FACEBOOK_APP_SECRET, debug-checks the resulting user token against
//      FACEBOOK_APP_ID, reads the profile server-side, and only then creates a
//      session. Provider secrets are referenced only through
//      {{secrets.GOOGLE_CLIENT_SECRET}} / {{secrets.FACEBOOK_APP_SECRET}} in
//      the registered hook and are never shipped in the browser bundle.
//   4. Phone + SMS OTP — the same server hook talks to Twilio Verify through
//      the platform secrets proxy. The founder stores two workspace secrets
//      (via Otto / the Integrations panel — never in code):
//        TWILIO_VERIFY_SERVICE_SID  — Verify service SID (VAxxxxxxxx...),
//                                     allowed host: verify.twilio.com
//        TWILIO_BASIC_AUTH          — base64("ACCOUNT_SID:AUTH_TOKEN"),
//                                     allowed host: verify.twilio.com
//
// GRACEFUL DEGRADATION: every method that is not yet configured renders as a
// disabled "Coming soon" state in components/EmailGate.tsx — nothing crashes.
// Email OTP never depends on this hook at all (it talks to the platform OTP
// endpoints directly), so nobody is ever locked out. Social sign-in has
// NO unverified fallback by design: if the hook cannot verify the provider
// token, the button reports that plainly instead of trusting the browser.
//
// After a credential change here (Google/Facebook IDs), republish the space.
// After editing AUTH_HOOK_TEMPLATE, bump AUTH_HOOK_VERSION — the installer
// re-deploys the hook (preserving the existing pepper) the next time the
// founder opens the Usage · Founder dashboard.

import { CASEMATE_WORKSPACE_ID } from './proAccess';

export const AUTH_HOOK_NAME = 'casemate-auth-v1';
export const AUTH_HOOK_VERSION = 'auth-v9-google-oauth-diagnostics';

// ---------------------------------------------------------------------------
// Founder-supplied PUBLIC identifiers (safe to ship in the browser bundle).
// Empty string = that provider renders as "Coming soon" in the login modal.
// ---------------------------------------------------------------------------

/** Google OAuth 2.0 Web client ID. The production console entry must include
 *  Authorized JavaScript origin https://app.casemateaud.com and Authorized
 *  redirect URI https://app.casemateaud.com/auth/callback/google exactly. */
export const GOOGLE_CLIENT_ID = '855020017524-1db929ih3adclk6uo39elq19fns8mlsc.apps.googleusercontent.com';

/** Facebook App ID, e.g. "1234567890123456". Public by design — the FB JS SDK
 *  needs it in the browser, and it is not a credential.
 *
 *  Facebook Developer Console setup:
 *    · Settings → Basic → App Domains: casemateaud.com
 *    · Facebook Login → Settings → Valid OAuth Redirect URIs:
 *      https://app.casemateaud.com/auth/facebook/callback
 *    · App Mode: Live, with Advanced Access for public_profile + email, or
 *      only app admins/developers/testers can sign in. */
export const FACEBOOK_APP_ID = '1597875601848173';

// Production OAuth callbacks. Keep these exact values in sync with the Google
// and Facebook developer consoles — neither flow derives its callback from the
// current page, so preview/localhost origins can never leak into redirect_uri.
export const GOOGLE_OAUTH_REDIRECT_URI = 'https://app.casemateaud.com/auth/callback/google';
export const FACEBOOK_OAUTH_REDIRECT_URI = 'https://app.casemateaud.com/auth/facebook/callback';

export function isGoogleLoginConfigured(): boolean {
  return GOOGLE_CLIENT_ID.trim().length > 0;
}
export function isFacebookLoginConfigured(): boolean {
  return FACEBOOK_APP_ID.trim().length > 0;
}

// ---------------------------------------------------------------------------
// Phone-number helpers (default country: Vietnam +84)
// ---------------------------------------------------------------------------

export const DEFAULT_PHONE_COUNTRY = '+84';

export const PHONE_COUNTRY_CODES: Array<{ code: string; label: string }> = [
  { code: '+84', label: '🇻🇳 +84' },
  { code: '+1', label: '🇺🇸 +1' },
  { code: '+44', label: '🇬🇧 +44' },
  { code: '+61', label: '🇦🇺 +61' },
  { code: '+65', label: '🇸🇬 +65' },
  { code: '+66', label: '🇹🇭 +66' },
  { code: '+81', label: '🇯🇵 +81' },
  { code: '+82', label: '🇰🇷 +82' },
  { code: '+852', label: '🇭🇰 +852' },
  { code: '+86', label: '🇨🇳 +86' },
  { code: '+91', label: '🇮🇳 +91' },
  { code: '+33', label: '🇫🇷 +33' },
  { code: '+49', label: '🇩🇪 +49' },
];

/**
 * Compose an E.164 number from the selected country code and the national
 * number the user typed. Strips spaces/dashes and a leading trunk 0
 * (090 123 4567 with +84 → +84901234567). Returns null when implausible.
 */
export function composeE164(countryCode: string, nationalNumber: string): string | null {
  const digits = nationalNumber.replace(/\D/g, '').replace(/^0+/, '');
  if (digits.length < 6 || digits.length > 14) return null;
  const cc = countryCode.replace(/[^\d+]/g, '');
  if (!cc.startsWith('+') || cc.length < 2) return null;
  return cc + digits;
}

// ---------------------------------------------------------------------------
// Auth hook client — every call is a plain POST to the hook execute URL
// (public by design; hook MANAGEMENT stays 401-walled to visitors).
// ---------------------------------------------------------------------------

const AUTH_HOOK_EXECUTE_URL = `/api/workspaces/${CASEMATE_WORKSPACE_ID}/hooks/${AUTH_HOOK_NAME}/execute`;
const AUTH_HOOK_TIMEOUT_MS = 8000;

export interface AuthActionResult {
  success: boolean;
  code?: string;
  error?: string;
  workspaceSessionId?: string;
  email?: string;
  phone?: string;
  phoneMasked?: string;
  isReturningUser?: boolean;
  displayName?: string | null;
  sent?: boolean;
  attemptsRemaining?: number;
  passwordAuth?: boolean;
  smsAuth?: boolean;
  googleAuth?: boolean;
  facebookAuth?: boolean;
  provider?: 'google' | 'facebook';
}

async function callAuthHook(payload: Record<string, unknown>): Promise<AuthActionResult> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), AUTH_HOOK_TIMEOUT_MS);
  try {
    const response = await fetch(AUTH_HOOK_EXECUTE_URL, {
      method: 'POST',
      cache: 'no-store',
      signal: controller.signal,
      headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-cache' },
      body: JSON.stringify(payload),
    });
    if (response.status === 404 || response.status === 403) {
      // Hook not deployed (or disabled) yet — the graceful-degradation state.
      return {
        success: false,
        code: 'service_unavailable',
        error: 'This sign-in method is not activated yet. Please use another method for now.',
      };
    }
    const data = await response.json().catch(() => null);
    if (!data || typeof data !== 'object') {
      return {
        success: false,
        code: 'auth_error',
        error: 'Unexpected response from the sign-in service. Please try again.',
      };
    }
    return data as AuthActionResult;
  } catch (error) {
    const timedOut = error instanceof DOMException && error.name === 'AbortError';
    return {
      success: false,
      code: timedOut ? 'auth_timeout' : 'network_error',
      error: timedOut
        ? 'Sign-in took too long. Please start again or use email.'
        : 'Connection error. Please check your internet connection and try again.',
    };
  } finally {
    clearTimeout(timeout);
  }
}

export interface AuthServiceStatus {
  /** The casemate-auth-v1 hook answered at all. */
  available: boolean;
  /** Legacy flag — password auth was removed in auth-v4, so this is always
   *  false from the v4 hook. Kept only so cached status payloads still parse. */
  passwordAuth: boolean;
  /** Twilio Verify secrets are configured — phone OTP is live. */
  smsAuth: boolean;
  /** The hook can verify Google tokens (its baked-in client ID is set). */
  googleAuth: boolean;
  /** FACEBOOK_APP_SECRET is stored, so the hook can verify Facebook tokens. */
  facebookAuth: boolean;
}

const STATUS_CACHE_KEY = 'casemate_auth_status_v2';
const STATUS_CACHE_TTL_MS = 10 * 60 * 1000;
let statusPromise: Promise<AuthServiceStatus> | null = null;

function readCachedStatus(): AuthServiceStatus | null {
  try {
    const raw = localStorage.getItem(STATUS_CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') return null;
    if (Date.now() - Number(parsed.at || 0) > STATUS_CACHE_TTL_MS) return null;
    return {
      available: !!parsed.available,
      passwordAuth: !!parsed.passwordAuth,
      smsAuth: !!parsed.smsAuth,
      googleAuth: !!parsed.googleAuth,
      facebookAuth: !!parsed.facebookAuth,
    };
  } catch {
    return null;
  }
}

function writeCachedStatus(status: AuthServiceStatus) {
  try {
    localStorage.setItem(STATUS_CACHE_KEY, JSON.stringify({ ...status, at: Date.now() }));
  } catch {
    /* storage unavailable — no cache */
  }
}

/**
 * Which auth methods are live right now. Cached (memory + localStorage, 10
 * min) so the login modal opens instantly on repeat visits. Fail-safe: when
 * the hook is missing/unreachable the result disables password + SMS and the
 * gate falls back to the original email-code flow.
 */
export function fetchAuthServiceStatus(force = false): Promise<AuthServiceStatus> {
  if (!force) {
    const cached = readCachedStatus();
    if (cached) return Promise.resolve(cached);
    if (statusPromise) return statusPromise;
  }
  statusPromise = (async () => {
    const result = await callAuthHook({ action: 'status' });
    const status: AuthServiceStatus = result.success
      ? {
          available: true,
          passwordAuth: result.passwordAuth !== false,
          smsAuth: !!result.smsAuth,
          googleAuth: !!result.googleAuth,
          facebookAuth: !!result.facebookAuth,
        }
      : { available: false, passwordAuth: false, smsAuth: false, googleAuth: false, facebookAuth: false };
    if (result.success) writeCachedStatus(status);
    return status;
  })().catch(() => {
    statusPromise = null;
    return { available: false, passwordAuth: false, smsAuth: false, googleAuth: false, facebookAuth: false };
  });
  return statusPromise;
}

interface AuthClientContext {
  visitorId?: string | null;
  attribution?: Record<string, string | null> | null;
  marketingConsent?: boolean;
}

// Password sign-up/sign-in/reset client calls were removed in auth-v4 —
// email authentication is OTP-only again (handled directly by EmailGate via
// the platform /register + /api/auth/otp/space endpoints, not this hook).

export function smsSendOtp(phone: string): Promise<AuthActionResult> {
  return callAuthHook({ action: 'sms_send', phone });
}

export function smsVerifyOtp(
  phone: string,
  code: string,
  context: AuthClientContext = {},
): Promise<AuthActionResult> {
  return callAuthHook({
    action: 'sms_verify',
    phone,
    code,
    visitorId: context.visitorId || undefined,
  });
}

// ---------------------------------------------------------------------------
// Social sign-in (Google Identity Services / Facebook JS SDK).
//
// The browser's ONLY job is to open the provider's popup and collect the token
// it hands back. It never decides who the customer is and never sends an email
// address to /register: the raw token goes to the casemate-auth-v1 hook, which
// asks the provider whose token it is and whether it was issued to THIS app
// before any session exists. There is deliberately no unverified fallback — if
// the hook cannot verify, the caller gets an error, not a session.
// ---------------------------------------------------------------------------

/** Profile a provider vouched for, as resolved SERVER-SIDE by the hook. */
export interface SocialProfile {
  email: string;
  name?: string;
  provider: 'google' | 'facebook';
}

/** Raw grant collected in the browser. Proves nothing on its own — only the
 *  hook's verification against the provider does. */
export interface SocialTokenGrant {
  provider: 'google' | 'facebook';
  accessToken: string;
  /** Present only when the provider also issued an OIDC ID token. */
  idToken?: string;
}

interface StoredOAuthAttempt {
  provider: 'google' | 'facebook';
  state: string;
  returnTo: string;
  codeVerifier?: string;
  prompt?: 'none' | 'select_account';
  createdAt?: number;
}

const OAUTH_ATTEMPT_KEY = 'casemate_social_oauth_attempt_v1';
const OAUTH_ATTEMPT_TTL_MS = 10 * 60 * 1000;

/**
 * OAuth callbacks happen after a full cross-site navigation. Keep the
 * short-lived attempt in three same-origin stores so browser privacy modes or
 * session bootstrap code cannot strand the callback without its state/PKCE
 * verifier. The cookie is host-only, Secure, SameSite=Lax and expires with the
 * attempt; it is not an authentication session.
 */
function writeOAuthAttempt(attempt: StoredOAuthAttempt): void {
  const serialized = JSON.stringify(attempt);
  let storageWritten = false;
  try {
    localStorage.setItem(OAUTH_ATTEMPT_KEY, serialized);
    storageWritten = true;
  } catch {
    /* localStorage unavailable — sessionStorage + cookie remain */
  }
  try {
    sessionStorage.setItem(OAUTH_ATTEMPT_KEY, serialized);
    storageWritten = true;
  } catch {
    /* sessionStorage unavailable — localStorage + cookie remain */
  }
  document.cookie = `${OAUTH_ATTEMPT_KEY}=${encodeURIComponent(serialized)}; Path=/; Max-Age=${Math.floor(
    OAUTH_ATTEMPT_TTL_MS / 1000,
  )}; SameSite=Lax; Secure`;
  const cookieWritten = document.cookie
    .split(';')
    .some((part) => part.trim().startsWith(`${OAUTH_ATTEMPT_KEY}=`));
  if (!storageWritten && !cookieWritten) {
    throw new Error('Your browser blocked the sign-in session. Allow site storage and try again.');
  }
}

function readOAuthAttempt(
  expectedProvider?: 'google' | 'facebook',
  expectedState?: string,
): StoredOAuthAttempt | null {
  const candidates: Array<string | null> = [];
  try {
    candidates.push(localStorage.getItem(OAUTH_ATTEMPT_KEY));
  } catch {
    candidates.push(null);
  }
  try {
    candidates.push(sessionStorage.getItem(OAUTH_ATTEMPT_KEY));
  } catch {
    candidates.push(null);
  }
  const cookiePrefix = `${OAUTH_ATTEMPT_KEY}=`;
  const cookieValue = document.cookie
    .split(';')
    .map((part) => part.trim())
    .find((part) => part.startsWith(cookiePrefix));
  if (cookieValue) {
    try {
      candidates.push(decodeURIComponent(cookieValue.slice(cookiePrefix.length)));
    } catch {
      /* malformed cookie — ignore it */
    }
  }

  for (const candidate of candidates) {
    if (!candidate) continue;
    try {
      const parsed = JSON.parse(candidate) as StoredOAuthAttempt;
      if (
        parsed &&
        (parsed.provider === 'google' || parsed.provider === 'facebook') &&
        typeof parsed.state === 'string' &&
        typeof parsed.returnTo === 'string'
      ) {
        // Privacy tools can leave one storage mechanism stale while another
        // contains the callback's current state. Try every redundant copy and
        // select the one that actually belongs to this callback.
        if (expectedProvider && parsed.provider !== expectedProvider) continue;
        if (expectedState && parsed.state !== expectedState) continue;
        return parsed;
      }
    } catch {
      /* malformed storage entry — try the next redundant copy */
    }
  }
  return null;
}

function clearOAuthAttempt(): void {
  try {
    localStorage.removeItem(OAUTH_ATTEMPT_KEY);
  } catch {}
  try {
    sessionStorage.removeItem(OAUTH_ATTEMPT_KEY);
  } catch {}
  document.cookie = `${OAUTH_ATTEMPT_KEY}=; Path=/; Max-Age=0; SameSite=Lax; Secure`;
}

function randomUrlToken(bytes = 32): string {
  const values = new Uint8Array(bytes);
  crypto.getRandomValues(values);
  let binary = '';
  values.forEach((value) => {
    binary += String.fromCharCode(value);
  });
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

async function pkceChallenge(verifier: string): Promise<string> {
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(verifier));
  let binary = '';
  new Uint8Array(digest).forEach((value) => {
    binary += String.fromCharCode(value);
  });
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

function oauthRedirectUri(provider: 'google' | 'facebook'): string {
  return provider === 'google' ? GOOGLE_OAUTH_REDIRECT_URI : FACEBOOK_OAUTH_REDIRECT_URI;
}

/** Start an OAuth 2.0 authorization-code flow using fixed production callback
 * URIs. Provider secrets stay server-side in the auth hook. Google also uses
 * PKCE, so a stolen authorization code cannot be exchanged without this tab's
 * verifier. */
export async function beginSocialOAuth(
  provider: 'google' | 'facebook',
  returnTo = window.location.origin + '/',
  googlePrompt: 'none' | 'select_account' = 'select_account',
): Promise<void> {
  if (provider === 'google' ? !isGoogleLoginConfigured() : !isFacebookLoginConfigured()) {
    throw new Error(`${provider === 'google' ? 'Google' : 'Facebook'} sign-in is not activated yet.`);
  }

  const state = randomUrlToken(24);
  const codeVerifier = provider === 'google' ? randomUrlToken(48) : undefined;
  const attempt: StoredOAuthAttempt = {
    provider,
    state,
    returnTo,
    codeVerifier,
    prompt: provider === 'google' ? googlePrompt : undefined,
    createdAt: Date.now(),
  };

  // Persist before leaving the origin. This throws if every durable write is
  // blocked, preventing an OAuth redirect that could never be validated.
  writeOAuthAttempt(attempt);

  const redirectUri = oauthRedirectUri(provider);
  let authUrl: URL;
  if (provider === 'google') {
    authUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth');
    authUrl.searchParams.set('client_id', GOOGLE_CLIENT_ID);
    authUrl.searchParams.set('redirect_uri', redirectUri);
    authUrl.searchParams.set('response_type', 'code');
    authUrl.searchParams.set('scope', 'openid email profile');
    authUrl.searchParams.set('prompt', googlePrompt);
    authUrl.searchParams.set('state', state);
    authUrl.searchParams.set('code_challenge', await pkceChallenge(codeVerifier as string));
    authUrl.searchParams.set('code_challenge_method', 'S256');
  } else {
    authUrl = new URL('https://www.facebook.com/dialog/oauth');
    authUrl.searchParams.set('client_id', FACEBOOK_APP_ID);
    authUrl.searchParams.set('redirect_uri', redirectUri);
    authUrl.searchParams.set('response_type', 'code');
    authUrl.searchParams.set('scope', 'email,public_profile');
    authUrl.searchParams.set('state', state);
  }
  window.location.assign(authUrl.toString());
}

/** Finish the provider callback by sending only the short-lived code to the
 * server hook. The hook exchanges it with the provider secret, verifies the
 * returned identity, creates/finds the CRM user, and returns the canonical
 * workspace session. */
export async function completeSocialOAuthCallback(provider: 'google' | 'facebook'): Promise<{
  result: AuthActionResult;
  returnTo: string;
  wasSilentAttempt?: boolean;
}> {
  const fallbackReturnTo = window.location.origin + '/';
  const params = new URLSearchParams(window.location.search);
  const state = params.get('state') || '';
  const attempt = readOAuthAttempt(provider, state);
  const wasSilentAttempt =
    provider === 'google' &&
    (params.get('prompt') === 'none' || attempt?.prompt === 'none');
  const attemptExpired =
    typeof attempt?.createdAt !== 'number' ||
    Date.now() - attempt.createdAt > OAUTH_ATTEMPT_TTL_MS ||
    attempt.createdAt > Date.now() + 60 * 1000;
  if (!attempt || attemptExpired || !state || state !== attempt.state) {
    // Clear only an unusable attempt. A valid attempt remains available until
    // all callback inputs pass validation, so an access-gate remount cannot
    // consume it before the provider code is sent to the server.
    clearOAuthAttempt();
    return {
      result: { success: false, code: 'oauth_state_invalid', error: 'That sign-in session expired. Please start again.' },
      returnTo: attempt?.returnTo || fallbackReturnTo,
      wasSilentAttempt,
    };
  }
  const providerErrorCode = (params.get('error') || '').trim().toLowerCase();
  const providerErrorDescription = params.get('error_description') || providerErrorCode;
  if (providerErrorDescription) {
    clearOAuthAttempt();
    return {
      result: {
        success: false,
        code: providerErrorCode || 'social_cancelled',
        error: providerErrorDescription,
      },
      returnTo: attempt.returnTo,
      wasSilentAttempt,
    };
  }
  const code = params.get('code') || '';
  if (!code) {
    clearOAuthAttempt();
    return {
      result: { success: false, code: 'oauth_code_missing', error: 'The sign-in provider did not return a code. Please try again.' },
      returnTo: attempt.returnTo,
      wasSilentAttempt,
    };
  }

  // Consume only after provider, state, TTL and code all validate. From this
  // point a refresh must start a new provider flow rather than replaying code.
  clearOAuthAttempt();
  const result = await callAuthHook({
    action: 'oauth_callback',
    provider,
    code,
    redirectUri: oauthRedirectUri(provider),
    codeVerifier: attempt.codeVerifier,
  });
  return { result, returnTo: attempt.returnTo, wasSilentAttempt };
}

const scriptPromises: Record<string, Promise<void>> = {};

function loadExternalScript(src: string): Promise<void> {
  if (!scriptPromises[src]) {
    scriptPromises[src] = new Promise<void>((resolve, reject) => {
      const existing = document.querySelector(`script[src="${src}"]`);
      if (existing && (existing as any).__loaded) {
        resolve();
        return;
      }
      const script = document.createElement('script');
      script.src = src;
      script.async = true;
      script.defer = true;
      script.onload = () => {
        (script as any).__loaded = true;
        resolve();
      };
      script.onerror = () => {
        delete scriptPromises[src];
        reject(new Error('Could not load the sign-in provider. Check your connection (or ad blocker) and try again.'));
      };
      document.head.appendChild(script);
    });
  }
  return scriptPromises[src];
}

/**
 * GIS OAuth2 token popup — collects the access token and nothing else. The
 * popup's origin must be listed under Authorized JavaScript origins in the
 * Google Cloud console.
 */
export async function googleRequestToken(): Promise<SocialTokenGrant> {
  await loadExternalScript('https://accounts.google.com/gsi/client');
  const google = (window as any).google;
  if (!google?.accounts?.oauth2) {
    throw new Error('Google sign-in could not initialize. Please try again.');
  }
  return new Promise<SocialTokenGrant>((resolve, reject) => {
    let settled = false;
    const finishError = (message: string) => {
      if (!settled) {
        settled = true;
        reject(new Error(message));
      }
    };
    try {
      const tokenClient = google.accounts.oauth2.initTokenClient({
        client_id: GOOGLE_CLIENT_ID,
        scope: 'openid email profile',
        callback: (tokenResponse: any) => {
          if (settled) return;
          if (!tokenResponse || tokenResponse.error || !tokenResponse.access_token) {
            finishError('Google sign-in was cancelled or failed. Please try again.');
            return;
          }
          settled = true;
          resolve({
            provider: 'google',
            accessToken: String(tokenResponse.access_token),
            idToken: typeof tokenResponse.id_token === 'string' ? tokenResponse.id_token : undefined,
          });
        },
        error_callback: (err: any) => {
          finishError(
            err?.type === 'popup_closed'
              ? 'The Google sign-in window was closed before finishing.'
              : 'Google sign-in failed to open. Please allow popups and try again.',
          );
        },
      });
      tokenClient.requestAccessToken();
    } catch {
      finishError('Google sign-in could not start. Please try again.');
    }
  });
}

/**
 * "Continue with Google" — opens the popup, then hands the access token to the
 * casemate-auth-v1 hook. The hook confirms with Google that the token belongs
 * to this workspace's OAuth client and that the email is verified, and returns
 * the session. Never resolves an identity in the browser.
 */
export async function googleSignIn(context: AuthClientContext = {}): Promise<AuthActionResult> {
  if (!isGoogleLoginConfigured()) {
    return { success: false, code: 'social_unavailable', error: 'Google sign-in is not activated yet.' };
  }
  let grant: SocialTokenGrant;
  try {
    grant = await googleRequestToken();
  } catch (error) {
    return {
      success: false,
      code: 'social_cancelled',
      error: error instanceof Error ? error.message : 'Google sign-in was cancelled. Please try again.',
    };
  }
  return callAuthHook({
    action: 'google_signin',
    accessToken: grant.accessToken,
    idToken: grant.idToken,
    visitorId: context.visitorId || undefined,
    attribution: context.attribution || undefined,
    marketingConsent: context.marketingConsent,
  });
}

/**
 * FB JS SDK login popup — collects the user access token and nothing else. The
 * site domain must be registered in the Facebook app settings and the app must
 * be in Live mode for the public.
 */
export async function facebookRequestToken(): Promise<SocialTokenGrant> {
  await loadExternalScript('https://connect.facebook.net/en_US/sdk.js');
  const FB = (window as any).FB;
  if (!FB) {
    throw new Error('Facebook sign-in could not initialize (the SDK may be blocked by an ad blocker).');
  }
  const w = window as any;
  if (!w.__casemateFbInitialized) {
    FB.init({ appId: FACEBOOK_APP_ID, cookie: false, xfbml: false, version: 'v25.0' });
    w.__casemateFbInitialized = true;
  }
  return new Promise<SocialTokenGrant>((resolve, reject) => {
    FB.login(
      (loginResponse: any) => {
        const token = loginResponse?.authResponse?.accessToken;
        if (!token) {
          reject(new Error('Facebook sign-in was cancelled.'));
          return;
        }
        resolve({ provider: 'facebook', accessToken: String(token) });
      },
      { scope: 'public_profile,email' },
    );
  });
}

/**
 * "Continue with Facebook" — opens the popup, then hands the access token to
 * the casemate-auth-v1 hook. The hook debug-checks the token against the app
 * secret (stored as the FACEBOOK_APP_SECRET workspace secret, never here) and
 * reads the profile server-side before any session exists.
 */
export async function facebookSignIn(context: AuthClientContext = {}): Promise<AuthActionResult> {
  if (!isFacebookLoginConfigured()) {
    return { success: false, code: 'social_unavailable', error: 'Facebook sign-in is not activated yet.' };
  }
  let grant: SocialTokenGrant;
  try {
    grant = await facebookRequestToken();
  } catch (error) {
    return {
      success: false,
      code: 'social_cancelled',
      error: error instanceof Error ? error.message : 'Facebook sign-in was cancelled. Please try again.',
    };
  }
  return callAuthHook({
    action: 'facebook_signin',
    accessToken: grant.accessToken,
    visitorId: context.visitorId || undefined,
    attribution: context.attribution || undefined,
    marketingConsent: context.marketingConsent,
  });
}

// ---------------------------------------------------------------------------
// Server-hook source + idempotent installer (founder-authenticated sessions
// only — mirrors ensureCasemateAccessHook in lib/proAccess.ts). The pepper is
// generated ONCE at first deploy and preserved on every re-deploy; it exists
// only inside the registered hook code.
// ---------------------------------------------------------------------------

const AUTH_HOOK_DESCRIPTION =
  'Casemate sign-in service (auth-v9-google-oauth-diagnostics): email sign-in is OTP-ONLY and handled by the platform ' +
  '/api/auth/otp/space endpoints, NOT this hook (password sign-in was removed; auth_accounts keeps its ' +
  'password columns untouched for zero data loss, but they are no longer used for auth). This hook serves: ' +
  'phone OTP via Twilio Verify through the platform secrets proxy (TWILIO_VERIFY_SERVICE_SID + ' +
  'TWILIO_BASIC_AUTH, host verify.twilio.com), and SERVER-VERIFIED Google/Facebook sign-in — the browser ' +
  'sends only a provider token or the OAuth authorization code (action oauth_callback, serving the ' +
  '/auth/callback/google and /auth/facebook/callback redirect flows; code exchange uses ' +
  'GOOGLE_CLIENT_SECRET / FACEBOOK_APP_SECRET via the secrets proxy), and the hook confirms identity with ' +
  'Google (tokeninfo audience must equal the workspace OAuth client, email must be verified) or Facebook ' +
  '(debug_token app_id must equal the workspace app, host graph.facebook.com) before any session exists. ' +
  'Sessions are created with POST /api/space/workspace-539150/register so every method lands in the same ' +
  'CRM + session model. Source of truth: lib/authAccount.ts (' + AUTH_HOOK_VERSION + ') — edit THERE and ' +
  'let the installer re-deploy. NOTE: the AUTH_PEPPER value in this code is a deploy-time secret; it keys ' +
  'the identifier digests in auth_accounts, so changing it orphans existing rows — the installer preserves it.';

const AUTH_HOOK_TEMPLATE = String.raw`
// ============================================================================
// Casemate multi-method auth service (casemate-auth-v1 / auth-v9-google-oauth-diagnostics).
// Deployed and versioned from lib/authAccount.ts (ensureCasemateAuthHook) —
// edit the source THERE, never in the hook registry directly.
//
// Actions (POST body.action):
//   status                  -> which methods are live (smsAuth, googleAuth,
//                              facebookAuth; passwordAuth is always false —
//                              password sign-in was removed in auth-v4 and
//                              email uses the platform OTP flow instead)
//   sms_send                -> { phone }  (E.164; Twilio Verify via secrets proxy)
//   sms_verify              -> { phone, code }  (auto signs in / signs up)
//   google_signin           -> { accessToken, idToken?, visitorId?, attribution?, marketingConsent? }
//   facebook_signin         -> { accessToken, visitorId?, attribution?, marketingConsent? }
//   oauth_callback          -> { provider, code, redirectUri, codeVerifier? }
//                              (production authorization-code callback)
//
// SOCIAL SIGN-IN IS SERVER-VERIFIED. The caller sends only the provider token;
// the email is read from the provider's own answer, never from the request
// body, so a crafted request cannot mint a session for an address it does not
// own. Google: tokeninfo must report this workspace's client ID as the
// audience and a verified email. Facebook: debug_token (authenticated with the
// app secret via the secrets proxy) must report is_valid and our app_id, and
// the profile is read server-side for that exact user_id.
//
// Every response is HTTP 200 with { success, code?, error?, ... } so clients
// parse one shape. Secrets used (platform BYOK, never readable here):
//   TWILIO_VERIFY_SERVICE_SID  (allow-listed host: verify.twilio.com)
//   TWILIO_BASIC_AUTH          (base64 of "ACCOUNT_SID:AUTH_TOKEN", same host)
//   GOOGLE_CLIENT_SECRET       (allow-listed host: oauth2.googleapis.com)
//   FACEBOOK_APP_SECRET        (allow-listed host: graph.facebook.com) — these
//                              hooks are the ONLY place they are ever used.
// AUTH_PEPPER is injected at deploy time by the installer and exists ONLY in
// this registered hook code — never in the published bundle or the database.
// ============================================================================
var AUTH_PEPPER = '__PEPPER__';
var AUTH_VERSION = '__AUTH_HOOK_VERSION__';
var AUTH_TABLE = 'auth_accounts';
var AUTH_API_BASE = 'https://audos.com';
var AUTH_SPACE_ID = 'workspace-539150';

// Public provider identifiers, baked in by the installer from the constants in
// lib/authAccount.ts. They are the trust anchors for token verification, so
// they are NEVER read from the request body.
var GOOGLE_CLIENT_ID = '__GOOGLE_CLIENT_ID__';
var FACEBOOK_APP_ID = '__FACEBOOK_APP_ID__';
var GOOGLE_TOKENINFO_URL = 'https://oauth2.googleapis.com/tokeninfo';
var GOOGLE_TOKEN_URL = 'https://oauth2.googleapis.com/token';
var GOOGLE_USERINFO_URL = 'https://www.googleapis.com/oauth2/v3/userinfo';
var FACEBOOK_GRAPH_BASE = 'https://graph.facebook.com/v25.0';
var GOOGLE_REDIRECT_URI = 'https://app.casemateaud.com/auth/callback/google';
var FACEBOOK_REDIRECT_URI = 'https://app.casemateaud.com/auth/facebook/callback';
var FACEBOOK_UNCONFIGURED = 'Facebook sign-in is not activated yet. Please use another sign-in method for now.';
var SOCIAL_CLOCK_SKEW_MS = 60 * 1000;
var AUTH_FETCH_TIMEOUT_MS = 3500;
var AUTH_DB_TIMEOUT_MS = 2000;
var AUTH_CALLBACK_TIMEOUT_MS = 7000;

function withAuthTimeout(label, promise, timeoutMs) {
  var timer = null;
  return Promise.race([
    promise,
    new Promise(function (_, reject) {
      timer = setTimeout(function () { reject(new Error(label + ' timed out')); }, timeoutMs);
    }),
  ]).finally(function () {
    if (timer) clearTimeout(timer);
  });
}

// ---- Pure-JS SHA-256 over a UTF-8 string -> lowercase hex (sandbox has no crypto module)
function utf8Bytes(str) {
  var bytes = [];
  for (var i = 0; i < str.length; i++) {
    var code = str.charCodeAt(i);
    if (code >= 0xd800 && code <= 0xdbff && i + 1 < str.length) {
      var lo = str.charCodeAt(i + 1);
      if (lo >= 0xdc00 && lo <= 0xdfff) {
        code = 0x10000 + ((code - 0xd800) << 10) + (lo - 0xdc00);
        i++;
      }
    }
    if (code < 0x80) {
      bytes.push(code);
    } else if (code < 0x800) {
      bytes.push(0xc0 | (code >> 6), 0x80 | (code & 0x3f));
    } else if (code < 0x10000) {
      bytes.push(0xe0 | (code >> 12), 0x80 | ((code >> 6) & 0x3f), 0x80 | (code & 0x3f));
    } else {
      bytes.push(0xf0 | (code >> 18), 0x80 | ((code >> 12) & 0x3f), 0x80 | ((code >> 6) & 0x3f), 0x80 | (code & 0x3f));
    }
  }
  return bytes;
}
var SHA256_K = [
  0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
  0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
  0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
  0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
  0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
  0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
  0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
  0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2
];
function sha256Hex(input) {
  var bytes = utf8Bytes(String(input));
  var bitLen = bytes.length * 8;
  bytes.push(0x80);
  while (bytes.length % 64 !== 56) bytes.push(0);
  var hi = Math.floor(bitLen / 0x100000000);
  var lo = bitLen >>> 0;
  bytes.push((hi >>> 24) & 0xff, (hi >>> 16) & 0xff, (hi >>> 8) & 0xff, hi & 0xff);
  bytes.push((lo >>> 24) & 0xff, (lo >>> 16) & 0xff, (lo >>> 8) & 0xff, lo & 0xff);
  var h0 = 0x6a09e667, h1 = 0xbb67ae85, h2 = 0x3c6ef372, h3 = 0xa54ff53a;
  var h4 = 0x510e527f, h5 = 0x9b05688c, h6 = 0x1f83d9ab, h7 = 0x5be0cd19;
  var w = new Array(64);
  for (var off = 0; off < bytes.length; off += 64) {
    for (var t = 0; t < 16; t++) {
      w[t] = ((bytes[off + t * 4] << 24) | (bytes[off + t * 4 + 1] << 16) | (bytes[off + t * 4 + 2] << 8) | bytes[off + t * 4 + 3]) >>> 0;
    }
    for (t = 16; t < 64; t++) {
      var s0 = (((w[t - 15] >>> 7) | (w[t - 15] << 25)) ^ ((w[t - 15] >>> 18) | (w[t - 15] << 14)) ^ (w[t - 15] >>> 3)) >>> 0;
      var s1 = (((w[t - 2] >>> 17) | (w[t - 2] << 15)) ^ ((w[t - 2] >>> 19) | (w[t - 2] << 13)) ^ (w[t - 2] >>> 10)) >>> 0;
      w[t] = (w[t - 16] + s0 + w[t - 7] + s1) >>> 0;
    }
    var a = h0, b = h1, c = h2, d = h3, e = h4, f = h5, g = h6, hh = h7;
    for (t = 0; t < 64; t++) {
      var S1 = (((e >>> 6) | (e << 26)) ^ ((e >>> 11) | (e << 21)) ^ ((e >>> 25) | (e << 7))) >>> 0;
      var ch = ((e & f) ^ (~e & g)) >>> 0;
      var temp1 = (hh + S1 + ch + SHA256_K[t] + w[t]) >>> 0;
      var S0 = (((a >>> 2) | (a << 30)) ^ ((a >>> 13) | (a << 19)) ^ ((a >>> 22) | (a << 10))) >>> 0;
      var maj = ((a & b) ^ (a & c) ^ (b & c)) >>> 0;
      var temp2 = (S0 + maj) >>> 0;
      hh = g; g = f; f = e; e = (d + temp1) >>> 0;
      d = c; c = b; b = a; a = (temp1 + temp2) >>> 0;
    }
    h0 = (h0 + a) >>> 0; h1 = (h1 + b) >>> 0; h2 = (h2 + c) >>> 0; h3 = (h3 + d) >>> 0;
    h4 = (h4 + e) >>> 0; h5 = (h5 + f) >>> 0; h6 = (h6 + g) >>> 0; h7 = (h7 + hh) >>> 0;
  }
  function hex8(n) { var s = n.toString(16); while (s.length < 8) s = '0' + s; return s; }
  return hex8(h0) + hex8(h1) + hex8(h2) + hex8(h3) + hex8(h4) + hex8(h5) + hex8(h6) + hex8(h7);
}

// ---- Identifier digests (peppered) ------------------------------------------
// Password/reset-code hashing was removed in auth-v4. The peppered identifier
// digest below remains the lookup key for EXISTING auth_accounts rows, so the
// pepper MUST be preserved across redeploys (the installer does exactly that).
function digestIdentifier(kind, value) { return sha256Hex(AUTH_PEPPER + '|id|' + kind + '|' + value); }

// ---- Normalization & masking -------------------------------------------------
function normEmail(raw) {
  var email = String(raw || '').trim().toLowerCase();
  if (email.length < 5 || email.length > 254) return '';
  var at = email.indexOf('@');
  if (at < 1 || at !== email.lastIndexOf('@')) return '';
  var domain = email.slice(at + 1);
  if (domain.indexOf('.') < 1 || /\s/.test(email)) return '';
  return email;
}
function normPhone(raw) {
  var p = String(raw || '').replace(/[\s().-]/g, '');
  if (p.slice(0, 2) === '00') p = '+' + p.slice(2);
  if (p.charAt(0) !== '+') return '';
  var digits = p.slice(1);
  if (!/^[0-9]{7,15}$/.test(digits)) return '';
  return '+' + digits;
}
function maskEmail(email) {
  var at = email.indexOf('@');
  return email.charAt(0) + '\u2022\u2022\u2022@' + email.slice(at + 1);
}
function maskPhone(phone) {
  return phone.slice(0, 3) + '\u2022\u2022\u2022\u2022\u2022\u2022' + phone.slice(-3);
}

// ---- Platform helpers ---------------------------------------------------------
async function authFetchJson(url, options, label) {
  var controller = new AbortController();
  var timer = setTimeout(function () { controller.abort(); }, AUTH_FETCH_TIMEOUT_MS);
  try {
    var fetchOptions = Object.assign({}, options || {}, { signal: controller.signal });
    var response = await fetch(url, fetchOptions);
    var payload = null;
    try { payload = await response.json(); } catch (e) { payload = null; }
    return { ok: response.ok, status: response.status, body: payload || {} };
  } catch (error) {
    var timedOut = error && error.name === 'AbortError';
    throw new Error((label || 'Authentication request') + (timedOut ? ' timed out' : ' failed'));
  } finally {
    clearTimeout(timer);
  }
}
async function findAccount(digest) {
  var result = await withAuthTimeout(
    'Account lookup',
    db.query(AUTH_TABLE, { where: { identifier_digest: digest }, limit: 1 }),
    AUTH_DB_TIMEOUT_MS,
  );
  return (result && result.rows && result.rows[0]) || null;
}
async function registerPlatformSession(email, extras) {
  var payload = { email: email, workspaceId: workspaceId };
  if (extras && extras.visitorId) payload.visitorId = extras.visitorId;
  if (extras && extras.attribution) payload.attribution = extras.attribution;
  if (extras && typeof extras.marketingConsent === 'boolean') payload.marketingConsent = extras.marketingConsent;
  payload.metadata = { authMethod: (extras && extras.method) || 'password' };
  var result = await authFetchJson(AUTH_API_BASE + '/api/space/' + AUTH_SPACE_ID + '/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  }, 'Session creation');
  if (!result.ok || !result.body.workspaceSessionId) {
    throw new Error('Could not create your session (register ' + result.status + ').');
  }
  return result.body;
}

// ---- Twilio Verify via the platform secrets proxy (keys never touch this code)
async function twilioVerifyStart(phone) {
  return await platform.secretsProxy({
    method: 'POST',
    url: 'https://verify.twilio.com/v2/Services/{{secrets.TWILIO_VERIFY_SERVICE_SID}}/Verifications',
    headers: { Authorization: 'Basic {{secrets.TWILIO_BASIC_AUTH}}' },
    form: { To: phone, Channel: 'sms' },
  });
}
async function twilioVerifyCheck(phone, code) {
  return await platform.secretsProxy({
    method: 'POST',
    url: 'https://verify.twilio.com/v2/Services/{{secrets.TWILIO_VERIFY_SERVICE_SID}}/VerificationCheck',
    headers: { Authorization: 'Basic {{secrets.TWILIO_BASIC_AUTH}}' },
    form: { To: phone, Code: code },
  });
}
async function twilioConfigured() {
  try {
    var result = await platform.secretsProxy({
      method: 'GET',
      url: 'https://verify.twilio.com/v2/Services/{{secrets.TWILIO_VERIFY_SERVICE_SID}}',
      headers: { Authorization: 'Basic {{secrets.TWILIO_BASIC_AUTH}}' },
    });
    return !!result && result.status === 200;
  } catch (error) {
    return false;
  }
}

// ---- Social token verification -------------------------------------------------
// Everything that decides WHO a social caller is happens here, against the
// provider, before any session is created. The request body contributes only
// the opaque token; the email always comes back from the provider.

function socialFailure(code, message) {
  return { ok: false, code: code, error: message };
}

function isTruthyFlag(value) {
  return value === true || String(value) === 'true' || String(value) === '1';
}

async function verifyGoogleIdentity(payload) {
  var idToken = String((payload && payload.idToken) || '');
  var accessToken = String((payload && payload.accessToken) || '');
  if (!idToken && !accessToken) {
    return socialFailure('google_no_token', 'Google did not return a sign-in token. Please try again.');
  }

  var info = null;
  if (idToken) {
    try {
      var idResult = await authFetchJson(GOOGLE_TOKENINFO_URL + '?id_token=' + encodeURIComponent(idToken), { method: 'GET' }, 'Google ID token validation');
      if (idResult.ok && idResult.body && (idResult.body.aud || idResult.body.azp)) info = idResult.body;
    } catch (error) {
      console.error('[casemate-auth] Google ID token validation failed: ' + (error && error.message ? error.message : String(error)));
    }
  }
  if (!info && accessToken) {
    try {
      var atResult = await authFetchJson(GOOGLE_TOKENINFO_URL + '?access_token=' + encodeURIComponent(accessToken), { method: 'GET' }, 'Google access token validation');
      if (atResult.ok && atResult.body && (atResult.body.aud || atResult.body.azp)) info = atResult.body;
    } catch (error) {
      console.error('[casemate-auth] Google access token validation failed: ' + (error && error.message ? error.message : String(error)));
    }
  }
  if (!info) {
    return socialFailure('google_token_invalid', 'Google could not confirm that sign-in. Please try again.');
  }

  // The audience is the whole point of this check: a token minted for someone
  // else's OAuth client must never open a Casemate session.
  var audience = String(info.aud || info.azp || '');
  if (audience !== GOOGLE_CLIENT_ID) {
    console.error('[casemate-auth] google audience mismatch: ' + audience);
    return socialFailure('google_token_invalid', 'That Google sign-in was not issued for Casemate. Please try again.');
  }
  var googleExp = Number(info.exp || 0);
  if (googleExp && googleExp * 1000 < Date.now() - SOCIAL_CLOCK_SKEW_MS) {
    return socialFailure('google_token_expired', 'That Google sign-in expired. Please try again.');
  }

  var email = normEmail(info.email);
  var verified = isTruthyFlag(info.email_verified);
  var name = '';
  if (accessToken) {
    try {
      var profile = await authFetchJson(GOOGLE_USERINFO_URL, {
        method: 'GET',
        headers: { Authorization: 'Bearer ' + accessToken },
      }, 'Google profile lookup');
      if (profile.ok && profile.body && profile.body.sub) {
        if (!email) email = normEmail(profile.body.email);
        if (!verified) verified = isTruthyFlag(profile.body.email_verified);
        name = String(profile.body.name || '');
      }
    } catch (error) {
      // tokeninfo already supplied the security-critical audience and verified
      // email. A slow optional profile-name request must not reject the login.
      console.error('[casemate-auth] optional Google profile lookup failed: ' + (error && error.message ? error.message : String(error)));
    }
  }
  if (!email) {
    return socialFailure('google_no_email', 'Google did not share an email address for this account.');
  }
  if (!verified) {
    return socialFailure('google_email_unverified', 'Google has not verified the email on that account. Please use another sign-in method.');
  }
  return { ok: true, email: email, name: name, providerUserId: String(info.sub || '') };
}

// Every Facebook call that needs the app secret goes through the secrets proxy
// as an app access token ("APP_ID|APP_SECRET"). The plaintext secret never
// enters this code, the bundle, or the logs.
async function facebookAppRequest(url, query) {
  var params = {};
  for (var key in query) {
    if (Object.prototype.hasOwnProperty.call(query, key)) params[key] = query[key];
  }
  params.access_token = FACEBOOK_APP_ID + '|{{secrets.FACEBOOK_APP_SECRET}}';
  return await platform.secretsProxy({ method: 'GET', url: url, query: params });
}

async function googleConfigured() {
  try {
    // A deliberately invalid authorization code verifies secret substitution,
    // host permission and connectivity without creating a provider session.
    // Google should answer invalid_grant when the client credentials are usable.
    var result = await platform.secretsProxy({
      method: 'POST',
      url: GOOGLE_TOKEN_URL,
      form: {
        code: 'casemate_configuration_probe',
        client_id: GOOGLE_CLIENT_ID,
        client_secret: '{{secrets.GOOGLE_CLIENT_SECRET}}',
        redirect_uri: GOOGLE_REDIRECT_URI,
        grant_type: 'authorization_code',
        code_verifier: 'casemate_configuration_probe',
      },
    });
    if (!result || result.ok !== true) {
      console.error('[casemate-auth] google credential proxy unavailable: ' + JSON.stringify(result || null));
      return false;
    }
    var googleError = result.body && result.body.error ? String(result.body.error) : '';
    if (googleError === 'invalid_client' || googleError === 'unauthorized_client') {
      console.error('[casemate-auth] google credential rejected (' + result.status + '): ' + googleError);
      return false;
    }
    return result.status > 0;
  } catch (error) {
    console.error('[casemate-auth] google credential check failed: ' + (error && error.message ? error.message : String(error)));
    return false;
  }
}

async function facebookConfigured() {
  try {
    var result = await platform.secretsProxy({
      method: 'GET',
      url: FACEBOOK_GRAPH_BASE + '/oauth/access_token',
      query: {
        client_id: FACEBOOK_APP_ID,
        client_secret: '{{secrets.FACEBOOK_APP_SECRET}}',
        grant_type: 'client_credentials',
      },
    });
    if (!result || result.ok !== true) {
      console.error('[casemate-auth] facebook credential proxy unavailable: ' + String(result && result.code || 'no_result'));
      return false;
    }
    if (result.status !== 200 || !result.body || !result.body.access_token) {
      var upstream = result.body && result.body.error ? result.body.error : {};
      console.error('[casemate-auth] facebook credential rejected (' + result.status + '): ' + String(upstream.type || upstream.code || 'unknown'));
      return false;
    }
    return true;
  } catch (error) {
    console.error('[casemate-auth] facebook credential check failed: ' + (error && error.message ? error.message : String(error)));
    return false;
  }
}

async function verifyFacebookIdentity(payload) {
  var userToken = String((payload && payload.accessToken) || '');
  if (!userToken) {
    return socialFailure('facebook_no_token', 'Facebook did not return a sign-in token. Please try again.');
  }

  var debugResult = null;
  try {
    debugResult = await facebookAppRequest(FACEBOOK_GRAPH_BASE + '/debug_token', { input_token: userToken });
  } catch (error) {
    console.error('[casemate-auth] facebook debug_token proxy error: ' + (error && error.message ? error.message : String(error)));
    return socialFailure('facebook_not_configured', FACEBOOK_UNCONFIGURED);
  }
  var debugData = debugResult && debugResult.body && debugResult.body.data ? debugResult.body.data : null;
  if (!debugData) {
    var upstream = debugResult && debugResult.body && debugResult.body.error ? debugResult.body.error : null;
    if (!upstream) {
      // No Graph-level error means the proxy itself refused (secret missing,
      // disabled, or host not allow-listed) — report it as not activated.
      console.error('[casemate-auth] facebook debug_token unavailable (status ' + (debugResult ? debugResult.status : 'none') + ')');
      return socialFailure('facebook_not_configured', FACEBOOK_UNCONFIGURED);
    }
    console.error('[casemate-auth] facebook debug_token rejected: ' + String(upstream.message || upstream.type || ''));
    return socialFailure('facebook_token_invalid', 'Facebook could not confirm that sign-in. Please try again.');
  }
  if (debugData.is_valid !== true) {
    return socialFailure('facebook_token_invalid', 'That Facebook sign-in is no longer valid. Please try again.');
  }
  if (String(debugData.app_id || '') !== FACEBOOK_APP_ID) {
    console.error('[casemate-auth] facebook app_id mismatch: ' + String(debugData.app_id || ''));
    return socialFailure('facebook_token_invalid', 'That Facebook sign-in was not issued for Casemate. Please try again.');
  }
  var fbExpires = Number(debugData.expires_at || 0);
  if (fbExpires && fbExpires * 1000 < Date.now() - SOCIAL_CLOCK_SKEW_MS) {
    return socialFailure('facebook_token_expired', 'That Facebook sign-in expired. Please try again.');
  }
  var userId = String(debugData.user_id || '');
  if (!userId) {
    return socialFailure('facebook_token_invalid', 'Facebook did not identify that account. Please try again.');
  }

  var email = '';
  var name = '';
  var profileResult = null;
  try {
    profileResult = await facebookAppRequest(FACEBOOK_GRAPH_BASE + '/' + encodeURIComponent(userId), { fields: 'name,email' });
  } catch (error) {
    profileResult = null;
  }
  if (profileResult && profileResult.body && !profileResult.body.error) {
    email = normEmail(profileResult.body.email);
    name = String(profileResult.body.name || '');
  }
  if (!email) {
    // Fallback read with the caller's own token. Safe because debug_token has
    // already proved (using the app secret) that this token belongs to our app
    // and to user_id — an answer for any other id is discarded.
    var meResult = await authFetchJson(
      FACEBOOK_GRAPH_BASE + '/me?fields=name,email&access_token=' + encodeURIComponent(userToken),
      { method: 'GET' },
    );
    if (meResult.ok && meResult.body && String(meResult.body.id || '') === userId) {
      email = normEmail(meResult.body.email);
      if (!name) name = String(meResult.body.name || '');
    }
  }
  if (!email) {
    return socialFailure(
      'facebook_no_email',
      'Facebook did not share an email for this account (it may use phone-only login). Please use another sign-in method.',
    );
  }
  return { ok: true, email: email, name: name, providerUserId: userId };
}

// ---- Request handling ----------------------------------------------------------
var body = request.body || {};
var action = String(body.action || (request.query && request.query.action) || 'status');

var responded = false;
function ok(payload) {
  var out = payload || {};
  out.success = true;
  responded = true;
  respond(200, out);
}
function fail(code, message, extra) {
  var out = extra || {};
  out.success = false;
  out.code = code;
  out.error = message;
  responded = true;
  respond(200, out);
}

// Password sign-up/sign-in/reset handlers were removed in auth-v4 — email is
// OTP-only again via the platform /api/auth/otp/space endpoints. Existing
// auth_accounts rows and their password columns are left untouched (zero data
// loss); those accounts now sign in with the emailed code to the same account.

async function handleSmsSend() {
  var phone = normPhone(body.phone);
  if (!phone) return fail('invalid_phone', 'Please enter a valid phone number, including the country code.');
  var result;
  try {
    result = await twilioVerifyStart(phone);
  } catch (error) {
    console.error('[casemate-auth] sms_send proxy error: ' + (error && error.message ? error.message : String(error)));
    return fail('sms_not_configured', 'Phone sign-in is not activated yet. Please use another sign-in method for now.');
  }
  if (!result || result.status === 401 || result.status === 404) {
    return fail('sms_not_configured', 'Phone sign-in is not activated yet. Please use another sign-in method for now.');
  }
  if (result.status === 429) {
    return fail('sms_rate_limited', 'Too many codes were requested for this number. Please wait a few minutes and try again.');
  }
  if (result.status >= 400 || !result.body || result.body.status !== 'pending') {
    var detail = result && result.body && result.body.message ? String(result.body.message) : '';
    console.error('[casemate-auth] sms_send failed (' + (result ? result.status : 'no response') + '): ' + detail);
    return fail('sms_failed', 'We could not text that number. Double-check it and try again.');
  }
  ok({ sent: true, phoneMasked: maskPhone(phone) });
}

async function handleSmsVerify() {
  var phone = normPhone(body.phone);
  var code = String(body.code || '').replace(/[^0-9]/g, '');
  if (!phone) return fail('invalid_phone', 'Please enter a valid phone number, including the country code.');
  if (code.length < 4 || code.length > 10) return fail('sms_bad_code', 'Please enter the code we texted you.');
  var result;
  try {
    result = await twilioVerifyCheck(phone, code);
  } catch (error) {
    console.error('[casemate-auth] sms_verify proxy error: ' + (error && error.message ? error.message : String(error)));
    return fail('sms_not_configured', 'Phone sign-in is not activated yet. Please use another sign-in method for now.');
  }
  if (!result || result.status >= 400 || !result.body || result.body.status !== 'approved') {
    return fail('sms_bad_code', 'That code is incorrect or has expired. Try again or request a new code.');
  }
  var digest = digestIdentifier('phone', phone);
  var row = await findAccount(digest);
  // Sessions and the CRM are email-keyed, so phone-only members get a stable,
  // deterministic, undeliverable address derived from their number. Their REAL
  // phone number is attached to the CRM contact below.
  var synthEmail = 'phone.' + phone.slice(1) + '@casemate.invalid';
  var registration;
  try {
    registration = await registerPlatformSession(synthEmail, { visitorId: body.visitorId, method: 'phone' });
  } catch (error) {
    synthEmail = 'phone.' + phone.slice(1) + '@casemate-members.example.com';
    registration = await registerPlatformSession(synthEmail, { visitorId: body.visitorId, method: 'phone' });
  }
  var now = new Date().toISOString();
  if (row) {
    await db.update(AUTH_TABLE, { id: row.id }, { last_login_at: now });
  } else {
    await db.insert(AUTH_TABLE, {
      identifier_digest: digest,
      identifier_masked: maskPhone(phone),
      auth_type: 'phone',
      failed_attempts: 0,
      reset_attempts: 0,
      last_login_at: now,
    });
  }
  try {
    await platform.createContact({
      email: synthEmail,
      phone: phone,
      name: 'Casemate member ' + maskPhone(phone),
      tags: ['phone-signup'],
    });
  } catch (error) {
    console.error('[casemate-auth] createContact (phone) failed: ' + (error && error.message ? error.message : String(error)));
  }
  ok({
    workspaceSessionId: registration.workspaceSessionId,
    email: synthEmail,
    phone: phone,
    phoneMasked: maskPhone(phone),
    isReturningUser: !!row,
  });
}

async function finishVerifiedSocialSignin(provider, verified) {
  if (!verified.ok) return fail(verified.code, verified.error);

  // From here on the email is the provider's answer, not the caller's claim.
  var email = verified.email;
  var digest = digestIdentifier('email', email);
  var row;
  try {
    row = await findAccount(digest);
  } catch (error) {
    console.error('[casemate-auth] account lookup failed: ' + (error && error.message ? error.message : String(error)));
    return fail('account_lookup_failed', 'We verified your Google account but could not load your Casemate account. Please try again.');
  }

  // /register is the canonical user create-or-lookup operation. It runs before
  // the callback returns, so a brand-new Google email always has a CRM user and
  // workspace session before any client-side entitlement/status check begins.
  var registration;
  try {
    registration = await registerPlatformSession(email, {
      visitorId: body.visitorId,
      attribution: body.attribution,
      marketingConsent: body.marketingConsent,
      method: provider,
    });
  } catch (error) {
    console.error('[casemate-auth] session creation failed: ' + (error && error.message ? error.message : String(error)));
    return fail('session_create_failed', 'Your Google account was verified, but Casemate could not create a session. Please try again.');
  }

  var now = new Date().toISOString();
  var accountPersisted = true;
  try {
    if (row) {
      await withAuthTimeout('Account update', db.update(AUTH_TABLE, { id: row.id }, {
        display_name: verified.name || row.display_name || null,
        failed_attempts: 0,
        locked_until: null,
        last_login_at: now,
      }), AUTH_DB_TIMEOUT_MS);
    } else {
      try {
        await withAuthTimeout('Account creation', db.insert(AUTH_TABLE, {
          identifier_digest: digest,
          identifier_masked: maskEmail(email),
          auth_type: provider,
          display_name: verified.name || null,
          failed_attempts: 0,
          reset_attempts: 0,
          last_login_at: now,
        }), AUTH_DB_TIMEOUT_MS);
      } catch (insertError) {
        // Two callbacks for the same new account can race the unique digest.
        // Re-read and update the winner instead of rejecting an otherwise valid login.
        var racedRow = await findAccount(digest);
        if (!racedRow) throw insertError;
        row = racedRow;
        await withAuthTimeout('Account race update', db.update(AUTH_TABLE, { id: racedRow.id }, {
          display_name: verified.name || racedRow.display_name || null,
          last_login_at: now,
        }), AUTH_DB_TIMEOUT_MS);
      }
    }
  } catch (error) {
    // The canonical CRM user + session already exist. Do not strand the user on
    // the callback page because the secondary auth-method audit row was slow.
    accountPersisted = false;
    console.error('[casemate-auth] account persistence failed after session creation: ' + (error && error.message ? error.message : String(error)));
  }

  ok({
    workspaceSessionId: registration.workspaceSessionId,
    email: email,
    provider: provider,
    displayName: verified.name || null,
    isReturningUser: !!row || !!registration.isReturningUser,
    accountPersisted: accountPersisted,
  });
}

async function handleSocialSignin(provider) {
  var verified = provider === 'google'
    ? await verifyGoogleIdentity(body)
    : await verifyFacebookIdentity(body);
  return await finishVerifiedSocialSignin(provider, verified);
}

function logOAuthExchangeFailure(label, exchange) {
  var safe = exchange;
  try {
    safe = JSON.parse(JSON.stringify(exchange || null, function (key, value) {
      return key === 'access_token' || key === 'refresh_token' || key === 'id_token'
        ? '[redacted]'
        : value;
    }));
  } catch (error) {}
  console.error('[casemate-auth] ' + label + ': ' + JSON.stringify(safe));
}

async function handleOAuthCallback() {
  var provider = String(body.provider || '');
  var code = String(body.code || '');
  var redirectUri = String(body.redirectUri || '');
  if (provider !== 'google' && provider !== 'facebook') {
    return fail('oauth_provider_invalid', 'Unknown sign-in provider.');
  }
  var expectedRedirect = provider === 'google' ? GOOGLE_REDIRECT_URI : FACEBOOK_REDIRECT_URI;
  if (redirectUri !== expectedRedirect) {
    return fail('oauth_redirect_invalid', 'The sign-in callback did not match Casemate. Please start again.');
  }
  if (!code) return fail('oauth_code_missing', 'The sign-in provider did not return a code. Please try again.');
  if (provider === 'google' && !String(body.codeVerifier || '')) {
    return fail('oauth_pkce_missing', 'The Google sign-in session expired before verification. Please start again.');
  }

  var exchange;
  try {
    if (provider === 'google') {
      exchange = await withAuthTimeout('Google code exchange', platform.secretsProxy({
        method: 'POST',
        url: GOOGLE_TOKEN_URL,
        form: {
          code: code,
          client_id: GOOGLE_CLIENT_ID,
          client_secret: '{{secrets.GOOGLE_CLIENT_SECRET}}',
          redirect_uri: GOOGLE_REDIRECT_URI,
          grant_type: 'authorization_code',
          code_verifier: String(body.codeVerifier || ''),
        },
      }), AUTH_FETCH_TIMEOUT_MS);
    } else {
      exchange = await withAuthTimeout('Facebook code exchange', platform.secretsProxy({
        method: 'GET',
        url: FACEBOOK_GRAPH_BASE + '/oauth/access_token',
        query: {
          client_id: FACEBOOK_APP_ID,
          client_secret: '{{secrets.FACEBOOK_APP_SECRET}}',
          redirect_uri: FACEBOOK_REDIRECT_URI,
          code: code,
        },
      }), AUTH_FETCH_TIMEOUT_MS);
    }
  } catch (error) {
    console.error('[casemate-auth] oauth code exchange failed: ' + (error && error.message ? error.message : String(error)));
    return fail('oauth_exchange_unavailable', 'This sign-in provider is temporarily unavailable. Please try again or use email.');
  }
  if (!exchange || exchange.ok !== true) {
    logOAuthExchangeFailure('oauth proxy failed', exchange);
    var proxyCode = String(exchange && exchange.code || 'no_result');
    if (proxyCode === 'unknown_secret' || proxyCode === 'no_allowed_hosts' || proxyCode === 'host_not_allowed') {
      return fail('oauth_configuration_unavailable', 'Google sign-in is not configured on the server yet. Please use email for now.');
    }
    return fail('oauth_exchange_unavailable', 'The sign-in provider is temporarily unavailable. Please try again or use email.');
  }
  if (exchange.status >= 400 || !exchange.body || !exchange.body.access_token) {
    logOAuthExchangeFailure('oauth exchange rejected', exchange);
    return fail('oauth_exchange_failed', 'The sign-in code could not be verified. Please start sign-in again.');
  }

  var verified;
  try {
    verified = provider === 'google'
      ? await verifyGoogleIdentity({ accessToken: exchange.body.access_token, idToken: exchange.body.id_token })
      : await verifyFacebookIdentity({ accessToken: exchange.body.access_token });
  } catch (error) {
    console.error('[casemate-auth] oauth identity validation failed: ' + (error && error.message ? error.message : String(error)));
    return fail('oauth_identity_unavailable', 'Your provider responded, but identity verification could not finish. Please try again.');
  }
  return await finishVerifiedSocialSignin(provider, verified);
}

async function authMain() {
  if (action === 'status') {
    var sms = await twilioConfigured();
    var google = GOOGLE_CLIENT_ID.length > 0 && await googleConfigured();
    var facebook = await facebookConfigured();
    return ok({
      version: AUTH_VERSION,
      // Password sign-in was removed in auth-v4 — email is OTP-only again.
      // Older cached bundles read this flag and fall back to the OTP email form.
      passwordAuth: false,
      smsAuth: sms,
      googleAuth: google,
      facebookAuth: FACEBOOK_APP_ID.length > 0 && facebook,
    });
  }
  if (action === 'sms_send') return await handleSmsSend();
  if (action === 'sms_verify') return await handleSmsVerify();
  if (action === 'google_signin') return await handleSocialSignin('google');
  if (action === 'facebook_signin') return await handleSocialSignin('facebook');
  if (action === 'oauth_callback') {
    try {
      return await withAuthTimeout('OAuth callback', handleOAuthCallback(), AUTH_CALLBACK_TIMEOUT_MS);
    } catch (error) {
      console.error('[casemate-auth] oauth callback timed out: ' + (error && error.message ? error.message : String(error)));
      return fail('oauth_callback_timeout', 'Google sign-in took too long. Please start again or use email.');
    }
  }
  return fail('unknown_action', 'Unknown auth action: ' + action);
}

try {
  await authMain();
} catch (error) {
  console.error('[casemate-auth] ' + (error && error.message ? error.message : String(error)));
  if (!responded) {
    respond(200, { success: false, code: 'auth_error', error: 'The sign-in service hit a snag. Please try again in a moment.' });
  }
}
`;

/** Build deployable hook code with the deploy-time pepper and the public
 *  provider identifiers baked in. The identifiers are the trust anchors for
 *  token verification, so they come from here rather than from the request. */
export function buildAuthHookCode(pepper: string): string {
  return AUTH_HOOK_TEMPLATE.replace("'__PEPPER__'", "'" + pepper + "'")
    .replace("'__AUTH_HOOK_VERSION__'", "'" + AUTH_HOOK_VERSION + "'")
    .replace("'__GOOGLE_CLIENT_ID__'", "'" + GOOGLE_CLIENT_ID + "'")
    .replace("'__FACEBOOK_APP_ID__'", "'" + FACEBOOK_APP_ID + "'");
}

function generatePepper(): string {
  try {
    const bytes = new Uint8Array(32);
    crypto.getRandomValues(bytes);
    return Array.from(bytes)
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');
  } catch {
    let out = '';
    for (let i = 0; i < 64; i++) out += '0123456789abcdef'[Math.floor(Math.random() * 16)];
    return out;
  }
}

function extractPepper(code: string): string | null {
  const match = /var AUTH_PEPPER = '([0-9a-f]{32,128})';/.exec(String(code || ''));
  return match ? match[1] : null;
}

let ensureAuthHookPromise: Promise<void> | null = null;

/**
 * Idempotent installer for the casemate-auth-v1 hook. ONLY works from a
 * founder-authenticated session (hook management deliberately 401s for
 * visitors — same contract as ensureCasemateAccessHook). Called from the
 * founder-only Usage dashboard on load; a customer session never calls this.
 *
 * Re-deploys preserve the existing pepper so stored password digests stay
 * valid. If the existing code has no readable pepper (foreign/corrupt code),
 * a fresh pepper is generated — existing passwords would then need a reset.
 */
export function ensureCasemateAuthHook(): Promise<void> {
  if (ensureAuthHookPromise) return ensureAuthHookPromise;

  ensureAuthHookPromise = (async () => {
    const listResponse = await fetch(`/api/workspaces/${CASEMATE_WORKSPACE_ID}/hooks`);
    if (!listResponse.ok) {
      throw new Error('Sign-in service deployment needs a founder session. Please refresh and try again.');
    }
    const listPayload = await listResponse.json();
    const hooks = Array.isArray(listPayload) ? listPayload : listPayload.hooks || [];
    const existing = hooks.find((hook: any) => hook.name === AUTH_HOOK_NAME);

    if (!existing) {
      const code = buildAuthHookCode(generatePepper());
      const createResponse = await fetch(`/api/workspaces/${CASEMATE_WORKSPACE_ID}/hooks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: AUTH_HOOK_NAME,
          description: AUTH_HOOK_DESCRIPTION,
          code,
          language: 'javascript',
          enabled: true,
        }),
      });
      if (!createResponse.ok) throw new Error('Could not activate the sign-in service. Please try again.');
      return;
    }

    const preservedPepper = extractPepper(existing.code) || generatePepper();
    const expectedCode = buildAuthHookCode(preservedPepper);
    if (
      existing.code !== expectedCode ||
      existing.description !== AUTH_HOOK_DESCRIPTION ||
      existing.enabled !== true
    ) {
      const updateResponse = await fetch(`/api/workspaces/${CASEMATE_WORKSPACE_ID}/hooks/${existing.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          description: AUTH_HOOK_DESCRIPTION,
          code: expectedCode,
          enabled: true,
        }),
      });
      if (!updateResponse.ok) throw new Error('Could not update the sign-in service. Please try again.');
    }
  })().catch((error) => {
    ensureAuthHookPromise = null;
    throw error;
  });

  return ensureAuthHookPromise;
}
