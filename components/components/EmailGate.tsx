import { useState, useEffect, useRef } from 'react';
import {
  ArrowRight,
  X,
  Sparkles,
  BookOpen,
  Compass,
  Loader2,
  ChevronLeft,
  Smartphone,
  Layers,
  Rocket,
  MousePointerClick,
  Check,
  FileText,
  Target,
  Map,
  GraduationCap,
  Briefcase,
  TrendingUp,
  LineChart,
  Users,
  Award,
} from 'lucide-react';
import { useSpaceRuntime } from '../SpaceRuntimeContext';
import type { DesktopThemeTokens } from '../types';
import { isValidEmailFormat, INVALID_EMAIL_MESSAGE } from '../lib/emailValidation';
import BrandSplash from './BrandSplash';
import BrandLogoMark from './BrandLogoMark';
import {
  AuthServiceStatus,
  beginSocialOAuth,
  completeSocialOAuthCallback,
  composeE164,
  DEFAULT_PHONE_COUNTRY,
  fetchAuthServiceStatus,
  isFacebookLoginConfigured,
  isGoogleLoginConfigured,
  PHONE_COUNTRY_CODES,
  smsSendOtp,
  smsVerifyOtp,
} from '../lib/authAccount';

// Version marker for auto-upgrade detection
// Increment this when making breaking changes that stale copies need
// v120: every explicit Google button click forces interactive account selection.
// v119: Google and Facebook sign-in buttons are active again after the OAuth fixes.
// v118: Google and Facebook sign-in are disabled with a Coming soon state.
// v117: silent Google OAuth failures retry interactively with prompt=select_account.
export const EMAIL_GATE_VERSION = 120; // v115: production OAuth callback persists the verified session redundantly before redirecting, preventing browser storage failures from stranding the user. v110: email sign-in reverted to OTP-only — password fields, sign-up tabs and the reset flow are removed; Google & Facebook remain on the server-verified OAuth callback flow. v109: Google/Facebook use production OAuth authorization-code callbacks with fixed redirect URIs and server-side code exchange; Facebook is active whenever its App ID is configured. v108: social sign-in is server-verified — Google/Facebook send provider tokens to casemate-auth-v1 before a session exists. v107: multi-method sign-in — email+password, Google/Facebook OAuth, and phone/SMS OTP

type ParsedResponseBody = { data: unknown; rawText: string };

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

// Parses a fetch Response body safely so a 5xx HTML page (proxy timeout,
// memory-crash restart, etc.) does not throw inside `response.json()` and
// get swallowed into the generic "Connection error" copy. Always returns
// an object instead of throwing — callers inspect `response.ok` themselves.
async function parseResponseBody(response: Response): Promise<ParsedResponseBody> {
  let rawText = '';
  try {
    rawText = await response.text();
  } catch {
    return { data: null, rawText: '' };
  }

  if (!rawText) {
    return { data: null, rawText: '' };
  }

  try {
    return { data: JSON.parse(rawText) as unknown, rawText };
  } catch {
    return { data: null, rawText };
  }
}

// Pick the most informative error message we can show to the user given
// what came back over the wire. Server-provided `error` always wins; for
// unparseable / non-JSON responses we expose the HTTP status so the bug
// is debuggable instead of being hidden behind "Connection error".
function describeResponseFailure(
  response: Response,
  body: unknown,
  rawText: string,
  fallback: string,
): string {
  if (isRecord(body)) {
    const errField = body.error;
    if (typeof errField === 'string' && errField.trim()) return errField;
    const msgField = body.message;
    if (typeof msgField === 'string' && msgField.trim()) return msgField;
  }

  const status = response.status;
  if (status === 429) return 'Too many requests. Please wait a moment and try again.';
  if (status === 502 || status === 503 || status === 504) {
    return 'The server is temporarily unavailable. Please try again in a moment.';
  }
  if (status >= 500) return `Server error (${status}). Please try again.`;
  if (status === 404) return 'This space could not be found. Please contact support.';
  if (status === 403) return 'This email is not authorized to access this space.';
  if (status === 400 && rawText) {
    // Sometimes the server returns a plain text 400; surface a trimmed copy
    const snippet = rawText.trim().slice(0, 140);
    if (snippet) return snippet;
  }

  return fallback;
}

// Snapshot of the JSON envelope returned by /api/space/:spaceId/register.
// All fields are optional because the server has historically added/removed
// keys; the client narrows individually before use.
interface SpaceRegisterResponseBody {
  success?: boolean;
  workspaceSessionId?: string;
  contactId?: string;
  email?: string;
  isReturningUser?: boolean;
  firstName?: string | null;
  lastName?: string | null;
  phone?: string | null;
  visitorId?: string | null;
  workspaceId?: string;
  metadata?: Record<string, unknown>;
}

// Snapshot of the JSON envelope returned by /api/auth/otp/space/{send,verify}.
interface OtpResponseBody {
  success?: boolean;
  resendCooldown?: number;
  attemptsRemaining?: number;
  expiresIn?: number;
}

interface EmailGateProps {
  spaceId: string;
  branding?: {
    name?: string;
    tagline?: string;
    logoUrl?: string;
    heroVideoUrl?: string;
    colors?: Record<string, any>;
    palette?: Record<string, any>;
  };
  themeTokens?: DesktopThemeTokens;
}

type GateStep = 'loading' | 'email' | 'code' | 'complete';

// Views inside the login modal: the main screen (email OTP + social + phone)
// and the SMS code entry step.
type PanelView = 'main' | 'phoneCode';

// Derive a usable color set from a single hex primary color
function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const clean = hex.replace('#', '');
  if (clean.length !== 3 && clean.length !== 6) return null;
  const normalized =
    clean.length === 3
      ? clean.split('').map((char) => char + char).join('')
      : clean;
  return {
    r: parseInt(normalized.substring(0, 2), 16),
    g: parseInt(normalized.substring(2, 4), 16),
    b: parseInt(normalized.substring(4, 6), 16),
  };
}

function colorWithAlpha(hex: string, alpha: number): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;
  return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`;
}

function normalizeHexColor(value: unknown): string | undefined {
  if (typeof value !== 'string') return undefined;
  const trimmed = value.trim();
  const match = trimmed.match(/^#?([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/);
  return match ? `#${match[1]}` : undefined;
}

function readableTextColor(hex: string): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return '#ffffff';
  const luminance = (0.2126 * rgb.r + 0.7152 * rgb.g + 0.0722 * rgb.b) / 255;
  return luminance > 0.58 ? '#111827' : '#ffffff';
}

export default function EmailGate({
  spaceId,
  branding,
  themeTokens,
}: EmailGateProps) {
  const { setSessionId } = useSpaceRuntime();
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [step, setStep] = useState<GateStep>('loading');
  const [otpEnabled, setOtpEnabled] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [pendingSessionId, setPendingSessionId] = useState<string | null>(null);
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [entered, setEntered] = useState(false);
  const [navOverLight, setNavOverLight] = useState(false);

  // Multi-method auth state (v110 — email OTP + Google/Facebook + phone)
  const [panelView, setPanelView] = useState<PanelView>('main');
  const [phoneCountry, setPhoneCountry] = useState(DEFAULT_PHONE_COUNTRY);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneCode, setPhoneCode] = useState('');
  const [phoneMasked, setPhoneMasked] = useState('');
  const [authNotice, setAuthNotice] = useState('');
  const [socialLoading, setSocialLoading] = useState<'google' | 'facebook' | null>(null);
  const [authStatus, setAuthStatus] = useState<AuthServiceStatus | null>(null);
  const socialCallbackStartedRef = useRef(false);

  // Get workspaceId from window context
  const workspaceId = (window as any).__WORKSPACE_ID__ || null;
  const gdprEnabled = !!(window as any).__GDPR_ENABLED__;
  // Template previews (genesis-space*) aren’t tied to a workspace, so the
  // normal email/OTP registration can’t complete — always offer guest entry
  // there. Cloned workspaces (workspace-N) keep the flag-gated behavior.
  const isTemplatePreview = spaceId === 'genesis-space' || spaceId.startsWith('genesis-space-');
  const guestModeEnabled = !!(window as any).__GUEST_MODE_ENABLED__ || isTemplatePreview;
  const rawSocialProviders = (window as any).__SOCIAL_PROVIDERS__;
  const socialProviders: string[] = Array.isArray(rawSocialProviders) ? rawSocialProviders : [];

  useEffect(() => {
    storeAttribution();
    // OAuth callbacks have no workspace session yet. Complete provider state,
    // code exchange and session creation before any existing-session or access
    // check can redirect/remount the gate.
    const isOAuthCallback = /^\/auth\/(?:(?:callback\/(?:google))|(?:(?:facebook)\/callback))\/?$/.test(
      window.location.pathname,
    );
    if (!isOAuthCallback) checkExistingSession();
  }, [spaceId]);

  // Pre-fill email from localStorage when loaded inside the onboarding walkthrough
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('walkthrough') === 'true') {
      const storedEmail = localStorage.getItem('user_email');
      if (storedEmail) setEmail(storedEmail);
    }
  }, []);

  // Resend cooldown timer
  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  // Which auth methods are live: phone/SMS needs the casemate-auth-v1 hook
  // (deployed from the founder-only Usage dashboard), Google/Facebook need
  // their public IDs in lib/authAccount.ts. Checked when the login modal
  // first opens; the lib caches the answer for 10 minutes.
  useEffect(() => {
    if (!loginOpen || authStatus) return;
    let cancelled = false;
    fetchAuthServiceStatus().then((status) => {
      if (!cancelled) setAuthStatus(status);
    });
    return () => {
      cancelled = true;
    };
  }, [loginOpen, authStatus]);

  // Landing hero entrance animation (client-only; defaults visible if JS is slow)
  useEffect(() => {
    const t = setTimeout(() => setEntered(true), 60);
    return () => clearTimeout(t);
  }, []);

  // Adaptive floating header: the bar never paints a box of its own — only its
  // ink flips, white while it sits over the dark hero and brand red / near-black
  // once a light section is underneath it. The landing page scrolls inside
  // `.eg-root` (not the window), so the listener attaches to that container.
  // Re-runs on step change since eg-root only exists on the main landing screen.
  useEffect(() => {
    const root = document.querySelector('.eg-root') as HTMLElement | null;
    if (!root) return;
    // Flip near the bar’s vertical midpoint so the ink changes exactly as the
    // dark/light boundary passes behind it.
    const FLIP_AT = 40;
    const sync = () => {
      const hero = document.getElementById('hero');
      if (!hero) {
        setNavOverLight(root.scrollTop > FLIP_AT);
        return;
      }
      const heroBottom = hero.getBoundingClientRect().bottom - root.getBoundingClientRect().top;
      setNavOverLight(heroBottom <= FLIP_AT);
    };
    root.addEventListener('scroll', sync, { passive: true });
    window.addEventListener('resize', sync);
    sync();
    return () => {
      root.removeEventListener('scroll', sync);
      window.removeEventListener('resize', sync);
    };
  }, [step]);

  const checkExistingSession = async () => {
    // `?as=visitor` preview: never adopt a stored session — skip straight to the
    // logged-out email form instead of jumping to the empty 'complete' state.
    const forceVisitor = typeof window !== 'undefined' && (window as any).__AUDOS_FORCE_VISITOR__ === true;
    const sessionKey = `space_session_${spaceId}`;
    const existingSession = forceVisitor ? null : localStorage.getItem(sessionKey);

    if (existingSession) {
      try {
        const session = JSON.parse(existingSession);
        const effectiveSessionId = session.workspaceSessionId || session.id;

        if (effectiveSessionId) {
          // Sessions created by Google / Facebook / phone sign-in were
          // verified by their own method (provider OAuth or SMS code)
          // rather than the email-OTP flow —
          // adopt them directly instead of bouncing the returning user back
          // through the emailed-code gate.
          if (
            session.verified === true &&
            typeof session.authMethod === 'string' &&
            session.authMethod.length > 0
          ) {
            setSessionId(effectiveSessionId);
            setStep('complete');
            return;
          }
          if (workspaceId) {
            try {
              const configRes = await fetch(`/api/auth/otp/space/config/${workspaceId}`);
              const configData = await configRes.json();
              const otpConfig = configData.config || configData;

              if (otpConfig.enabled) {
                setOtpEnabled(true);
                const checkRes = await fetch(`/api/auth/otp/space/check-session?workspaceId=${workspaceId}&sessionUuid=${encodeURIComponent(effectiveSessionId)}`, {
                  credentials: 'include'
                });
                const checkData = await checkRes.json();

                if (checkData.verified) {
                  setSessionId(effectiveSessionId);
                  setStep('complete');
                  return;
                } else {
                  // v1.1: a session exists on this device but was never
                  // OTP-verified (legacy email-only sign-in, or an expired /
                  // signed-out device). Prefill the saved email so the
                  // returning user only confirms it and enters the emailed
                  // code instead of retyping their address — same email,
                  // same account, history preserved.
                  if (typeof session.email === 'string' && session.email.includes('@')) {
                    setEmail(session.email);
                  }
                  setStep('email');
                  return;
                }
              }
            } catch (e) {
              console.log('[EmailGate] OTP config check failed, using simple mode');
            }
          }

          setSessionId(effectiveSessionId);
          setStep('complete');
          return;
        }
      } catch (e) {
        console.error('Failed to parse session:', e);
      }
    }

    if (workspaceId) {
      try {
        const configRes = await fetch(`/api/auth/otp/space/config/${workspaceId}`);
        const configData = await configRes.json();
        const otpConfig = configData.config || configData;
        setOtpEnabled(otpConfig.enabled || false);
      } catch (e) {
        setOtpEnabled(false);
      }
    }

    setStep('email');
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Format validation at the front door: a malformed email must never
    // reach /register (the CRM/lead capture) or trigger an OTP send. The
    // user retries inline; the OTP step remains the real deliverability
    // check for well-formed addresses.
    if (!isValidEmailFormat(email)) {
      setError(INVALID_EMAIL_MESSAGE);
      return;
    }

    setError('');
    setLoading(true);

    try {
      const normalizedEmail = email.toLowerCase().trim();

      if (otpEnabled && workspaceId) {
        const attribution = getAttribution();
        const visitorId = getVisitorId();
        const sessionId = `csess_${Date.now()}_${Math.random().toString(36).substring(2, 10)}`;

        const registerRes = await fetch(`/api/space/${spaceId}/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: normalizedEmail,
            sessionId,
            visitorId,
            attribution,
            metadata: {},
            workspaceId,
            marketingConsent,
          }),
        });

        const { data: registerResult, rawText: registerRawText } =
          await parseResponseBody(registerRes);

        if (!registerRes.ok) {
          console.error('[EmailGate] register failed', {
            status: registerRes.status,
            body: registerResult ?? registerRawText.slice(0, 200),
          });
          setError(
            describeResponseFailure(
              registerRes,
              registerResult,
              registerRawText,
              'Failed to create session. Please try again.',
            ),
          );
          setLoading(false);
          return;
        }

        if (!isRecord(registerResult)) {
          console.error('[EmailGate] register returned an unparseable body', {
            status: registerRes.status,
            rawText: registerRawText.slice(0, 200),
          });
          setError('The server returned an unexpected response. Please try again.');
          setLoading(false);
          return;
        }

        const registerBody = registerResult as SpaceRegisterResponseBody;
        const wsSessionId = registerBody.workspaceSessionId;
        setPendingSessionId(wsSessionId);

        if (typeof (window as any).fbq === 'function' && (window as any).__META_PIXEL_ID__) {
          (window as any).fbq('init', (window as any).__META_PIXEL_ID__, { em: normalizedEmail.toLowerCase().trim() });
        }
        fireLeadEventWithRetry(normalizedEmail);

        const sessionKey = `space_session_${spaceId}`;
        const pendingSession = {
          id: wsSessionId,
          workspaceSessionId: wsSessionId,
          email: normalizedEmail,
          contactId: registerResult.contactId || null,
          timestamp: Date.now(),
          verified: registerResult.isReturningUser === false,
          isReturningUser: !!registerResult.isReturningUser,
          metadata: registerResult.metadata || {},
        };
        localStorage.setItem(sessionKey, JSON.stringify(pendingSession));

        if (registerResult.isReturningUser === false) {
          try {
            window.dispatchEvent(new CustomEvent('audos:session-established', {
              detail: { workspaceSessionId: wsSessionId, email: normalizedEmail },
            }));
          } catch (e) {}

          setSessionId(wsSessionId);
          completeGateEntry();
          setLoading(false);
          return;
        }

        const response = await fetch('/api/auth/otp/space/send', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ email: normalizedEmail, workspaceId, sessionUuid: wsSessionId }),
        });

        const { data: otpResult, rawText: otpRawText } = await parseResponseBody(response);

        if (!response.ok) {
          console.error('[EmailGate] otp send failed', {
            status: response.status,
            body: otpResult ?? otpRawText.slice(0, 200),
          });
          setError(
            describeResponseFailure(
              response,
              otpResult,
              otpRawText,
              'Failed to send code. Please try again.',
            ),
          );
          setLoading(false);
          return;
        }

        const otpBody: OtpResponseBody = isRecord(otpResult) ? otpResult : {};
        setResendCooldown(otpBody.resendCooldown ?? 60);
        setStep('code');
      } else {
        await registerSession();
      }
    } catch (err) {
      console.error('[EmailGate] Network error in handleEmailSubmit:', err);
      setError('Connection error. Please check your internet connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCodeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (code.length !== 4) {
      setError('Please enter the 4-digit code');
      return;
    }

    setError('');
    setLoading(true);

    try {
      if (!pendingSessionId) {
        setError('Session expired. Please start over.');
        setStep('email');
        setLoading(false);
        return;
      }

      const normalizedEmail = email.toLowerCase().trim();
      const response = await fetch('/api/auth/otp/space/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email: normalizedEmail, code, workspaceId, sessionUuid: pendingSessionId }),
      });

      const { data: verifyResult, rawText: verifyRawText } = await parseResponseBody(response);
      const verifyBody: OtpResponseBody = isRecord(verifyResult) ? verifyResult : {};

      if (!response.ok || !verifyBody.success) {
        console.error('[EmailGate] otp verify failed', {
          status: response.status,
          body: verifyResult ?? verifyRawText.slice(0, 200),
        });
        if (typeof verifyBody.attemptsRemaining === 'number') {
          setError(`Invalid code. ${verifyBody.attemptsRemaining} attempts remaining.`);
        } else {
          setError(
            describeResponseFailure(
              response,
              verifyResult,
              verifyRawText,
              'Invalid code. Please try again.',
            ),
          );
        }
        setLoading(false);
        return;
      }

      await completeVerifiedSession();
    } catch (err) {
      console.error('[EmailGate] Network error in handleCodeSubmit:', err);
      setError('Connection error. Please check your internet connection and try again.');
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (resendCooldown > 0 || !pendingSessionId) return;

    setLoading(true);
    setError('');

    try {
      const normalizedEmail = email.toLowerCase().trim();
      const response = await fetch('/api/auth/otp/space/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email: normalizedEmail, workspaceId, sessionUuid: pendingSessionId }),
      });

      const { data: resendResult, rawText: resendRawText } = await parseResponseBody(response);

      if (response.ok) {
        const resendBody: OtpResponseBody = isRecord(resendResult) ? resendResult : {};
        setResendCooldown(resendBody.resendCooldown ?? 60);
        setCode('');
      } else {
        console.error('[EmailGate] otp resend failed', {
          status: response.status,
          body: resendResult ?? resendRawText.slice(0, 200),
        });
        setError(
          describeResponseFailure(
            response,
            resendResult,
            resendRawText,
            'Failed to resend code. Please try again.',
          ),
        );
      }
    } catch (err) {
      console.error('[EmailGate] Network error in handleResendCode:', err);
      setError('Connection error. Please check your internet connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  const completeVerifiedSession = async () => {
    const sessionKey = `space_session_${spaceId}`;
    const normalizedEmail = email.toLowerCase().trim();
    let verifiedMetadata: Record<string, unknown> = {};
    try {
      const existingSession = localStorage.getItem(sessionKey);
      if (existingSession) {
        const parsed = JSON.parse(existingSession);
        if (parsed.metadata) verifiedMetadata = parsed.metadata;
      }
    } catch {}
    const session = {
      id: pendingSessionId,
      workspaceSessionId: pendingSessionId,
      email: normalizedEmail,
      timestamp: Date.now(),
      verified: true,
      isReturningUser: true,
      metadata: verifiedMetadata,
    };
    localStorage.setItem(sessionKey, JSON.stringify(session));

    try {
      window.dispatchEvent(new CustomEvent('audos:session-established', {
        detail: {
          workspaceSessionId: pendingSessionId,
          email: normalizedEmail,
        }
      }));
    } catch (e) {}

    setSessionId(pendingSessionId!);
    completeGateEntry();
    setLoading(false);
  };

  const registerSession = async () => {
    const normalizedEmail = email.toLowerCase().trim();

    // Template previews have no workspace, so the server-side register can
    // never succeed ("Could not resolve workspace from space."). Create a
    // local preview session with the entered email instead.
    if (isTemplatePreview) {
      const previewId = `guest_${Date.now()}_${Math.random().toString(36).substring(2, 10)}`;
      const previewSession = {
        id: previewId,
        workspaceSessionId: previewId,
        email: normalizedEmail,
        isGuest: true,
        timestamp: Date.now(),
        verified: true,
        metadata: {},
      };
      localStorage.setItem(`space_session_${spaceId}`, JSON.stringify(previewSession));
      try {
        window.dispatchEvent(new CustomEvent('audos:session-established', {
          detail: { workspaceSessionId: previewId, email: normalizedEmail, isGuest: true },
        }));
      } catch (e) {}
      setSessionId(previewId);
      completeGateEntry();
      setLoading(false);
      return;
    }

    const attribution = getAttribution();
    const visitorId = getVisitorId();
    const sessionId = `csess_${Date.now()}_${Math.random().toString(36).substring(2, 10)}`;

    const response = await fetch(`/api/space/${spaceId}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: normalizedEmail,
        sessionId,
        visitorId,
        attribution,
        metadata: {},
        workspaceId,
        marketingConsent,
      }),
    });

    const { data: registerResult, rawText: registerRawText } = await parseResponseBody(response);

    if (!response.ok) {
      console.error('[EmailGate] registerSession failed', {
        status: response.status,
        body: registerResult ?? registerRawText.slice(0, 200),
      });
      setError(
        describeResponseFailure(
          response,
          registerResult,
          registerRawText,
          'Registration failed. Please try again.',
        ),
      );
      setLoading(false);
      return;
    }

    if (!isRecord(registerResult)) {
      console.error('[EmailGate] registerSession returned an unparseable body', {
        status: response.status,
        rawText: registerRawText.slice(0, 200),
      });
      setError('The server returned an unexpected response. Please try again.');
      setLoading(false);
      return;
    }

    const registerBody = registerResult as SpaceRegisterResponseBody;
    const effectiveSessionId =
      registerBody.workspaceSessionId ||
      `anon_${Date.now()}_${Math.random().toString(36).substring(2, 10)}`;

    const sessionKey = `space_session_${spaceId}`;
    const session = {
      id: effectiveSessionId,
      workspaceSessionId: registerBody.workspaceSessionId || effectiveSessionId,
      email: normalizedEmail,
      contactId: registerBody.contactId || null,
      timestamp: Date.now(),
      isReturningUser: !!registerBody.isReturningUser,
      metadata: registerBody.metadata || {},
    };
    localStorage.setItem(sessionKey, JSON.stringify(session));

    try {
      window.dispatchEvent(new CustomEvent('audos:session-established', {
        detail: {
          workspaceSessionId: registerBody.workspaceSessionId,
          email: normalizedEmail,
        }
      }));
    } catch (e) {}

    if (typeof (window as any).fbq === 'function' && (window as any).__META_PIXEL_ID__) {
      (window as any).fbq('init', (window as any).__META_PIXEL_ID__, { em: normalizedEmail.toLowerCase().trim() });
    }
    fireLeadEventWithRetry(normalizedEmail);

    setSessionId(effectiveSessionId);
    completeGateEntry();
    setLoading(false);
  };

  const handleGuestMode = async () => {
    setError('');
    setLoading(true);

    try {
      const guestId = `guest_${Date.now()}_${Math.random().toString(36).substring(2, 10)}`;
      const sessionKey = `space_session_${spaceId}`;
      const guestSession = {
        id: guestId,
        workspaceSessionId: guestId,
        email: null,
        isGuest: true,
        timestamp: Date.now(),
        verified: true,
        metadata: {},
      };
      localStorage.setItem(sessionKey, JSON.stringify(guestSession));

      try {
        window.dispatchEvent(new CustomEvent('audos:session-established', {
          detail: { workspaceSessionId: guestId, isGuest: true },
        }));
      } catch (e) {}

      setSessionId(guestId);
      completeGateEntry();
    } catch (err) {
      setError('Could not continue as guest. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // `?as=visitor` preview forces the signed-out view even after a real
  // sign-in: the gate would render nothing and the visitor would land on the
  // blank-screen lock instead of the space. The session write is real (only
  // reads are shadowed under the forced-visitor preview), so drop the
  // as=visitor param and reload — the fresh session is adopted and the
  // signed-in space opens.
  const completeGateEntry = () => {
    try {
      if (typeof window !== 'undefined' && (window as any).__AUDOS_FORCE_VISITOR__ === true) {
        const url = new URL(window.location.href);
        url.searchParams.delete('as');
        window.location.replace(url.toString());
        return;
      }
    } catch (e) {}
    setStep('complete');
  };

  const handleSocialLogin = (provider: string) => {
    // Keep configured Google/Facebook buttons on Casemate’s explicit OAuth
    // flow. The legacy platform route may optimistically add prompt=none;
    // starting here with select_account prevents a silent failure from
    // stranding the visitor before the callback fallback can run.
    if (provider === 'google' || provider === 'facebook') {
      if (socialLoading || loading) return;
      setError('');
      setSocialLoading(provider);
      let socialReturnTo = window.location.href;
      try {
        const url = new URL(window.location.href);
        url.searchParams.delete('as');
        socialReturnTo = url.toString();
      } catch (e) {}
      void beginSocialOAuth(provider, socialReturnTo, 'select_account').catch((error) => {
        setError(
          error instanceof Error
            ? error.message
            : `${provider === 'google' ? 'Google' : 'Facebook'} sign-in could not start. Please try again.`,
        );
        setSocialLoading(null);
      });
      return;
    }

    // Preserve platform-managed providers this workspace may enable later.
    let socialReturnTo = window.location.href;
    try {
      const url = new URL(window.location.href);
      url.searchParams.delete('as');
      socialReturnTo = url.toString();
    } catch (e) {}
    const returnUrl = encodeURIComponent(socialReturnTo);
    const url = workspaceId
      ? `/api/auth/social/${provider}?workspaceId=${workspaceId}&spaceId=${spaceId}&returnUrl=${returnUrl}`
      : `/api/auth/social/${provider}?spaceId=${spaceId}&returnUrl=${returnUrl}`;
    window.location.href = url;
  };

  // ---- Multi-method auth (v107) -------------------------------------------

  /** Store the session for ANY successful method exactly like the classic
   *  email flow does, fire the same lead events, and enter the space. */
  const adoptAuthSession = (
    wsSessionId: string,
    emailValue: string | null,
    method: 'google' | 'facebook' | 'phone',
    extra: { phone?: string | null; phoneMasked?: string | null; isReturningUser?: boolean } = {},
  ) => {
    const sessionKey = `space_session_${spaceId}`;
    const session = {
      id: wsSessionId,
      workspaceSessionId: wsSessionId,
      email: emailValue,
      phone: extra.phone || null,
      phoneMasked: extra.phoneMasked || null,
      timestamp: Date.now(),
      verified: true,
      authMethod: method,
      isReturningUser: !!extra.isReturningUser,
      metadata: {},
    };
    const serializedSession = JSON.stringify(session);
    let persisted = false;
    try {
      localStorage.setItem(sessionKey, serializedSession);
      persisted = true;
    } catch (storageError) {
      console.warn('[EmailGate] localStorage unavailable while adopting OAuth session', storageError);
    }
    try {
      // SpaceRuntime reads this canonical fallback on the redirected document.
      sessionStorage.setItem('space_session_id', wsSessionId);
      sessionStorage.setItem(sessionKey, serializedSession);
      persisted = true;
    } catch (storageError) {
      console.warn('[EmailGate] sessionStorage unavailable while adopting OAuth session', storageError);
    }
    try {
      window.dispatchEvent(new CustomEvent('audos:session-established', {
        detail: { workspaceSessionId: wsSessionId, email: emailValue, authMethod: method },
      }));
    } catch (e) {}
    if (!persisted) {
      console.warn('[EmailGate] OAuth session could not be persisted; keeping the mounted session active');
    }
    if (emailValue) {
      if (typeof (window as any).fbq === 'function' && (window as any).__META_PIXEL_ID__) {
        (window as any).fbq('init', (window as any).__META_PIXEL_ID__, { em: emailValue });
      }
      fireLeadEventWithRetry(emailValue);
    }
    setSessionId(wsSessionId);
    completeGateEntry();
    return persisted;
  };

  // Finish the fixed Google and Facebook production callbacks exactly once.
  // The browser never receives a provider secret: it sends the short-lived code
  // to casemate-auth-v1, which exchanges and verifies it server-side, then
  // returns the same canonical workspace session every other login method uses.
  // Entitlement checks begin only after adoptAuthSession installs that verified
  // workspace session; callback paths skip the existing-session check above.
  useEffect(() => {
    const match = /^\/auth\/(?:(?:callback\/(google))|(?:(facebook)\/callback))\/?$/.exec(window.location.pathname);
    if (!match || socialCallbackStartedRef.current) return;
    socialCallbackStartedRef.current = true;
    const provider = (match[1] || match[2]) as 'google' | 'facebook';
    setPanelView('main');
    setLoginOpen(true);
    setError('');
    setSocialLoading(provider);

    let callbackSettled = false;
    const safetyTimer = window.setTimeout(() => {
      if (callbackSettled) return;
      console.error('[EmailGate] OAuth callback exceeded two seconds; force-clearing the loading screen.');
      setSocialLoading(null);
      setLoading(false);
      setStep('email');
      setError('Sign-in is taking longer than expected. You can retry or use email while it finishes.');
    }, 2000);

    void completeSocialOAuthCallback(provider)
      .then(async ({ result, returnTo, wasSilentAttempt }) => {
        let safeReturnTo = '/';
        try {
          const parsed = new URL(returnTo, window.location.origin);
          if (parsed.origin === window.location.origin) {
            safeReturnTo = parsed.pathname + parsed.search + parsed.hash;
          }
        } catch (e) {}
        if (result.success && result.workspaceSessionId) {
          // Persist and publish the session to the mounted runtime first, then
          // perform a real navigation back to the saved app route. A history
          // rewrite alone leaves the OAuth callback’s already-mounted gate in
          // charge of transitioning to the shell; if that render is missed,
          // the customer sits on the callback document with no app content.
          const sessionPersisted = adoptAuthSession(result.workspaceSessionId, result.email || null, provider, {
            isReturningUser: !!result.isReturningUser,
          });
          if (sessionPersisted) {
            window.location.replace(safeReturnTo);
          } else {
            // Keep the in-memory verified session alive instead of navigating
            // into a fresh document that cannot recover it.
            window.history.replaceState({}, '', safeReturnTo);
          }
          return;
        }
        const failureSignal = `${result.code || ''} ${result.error || ''}`.toLowerCase();
        const silentGoogleFailure =
          provider === 'google' &&
          wasSilentAttempt === true &&
          [
            'login_required',
            'interaction_required',
            'consent_required',
            'account_selection_required',
            'access_denied',
            'permission_denied',
            'user_denied',
            'invalid_grant',
            'oauth_state_invalid',
          ].some((code) => failureSignal.includes(code));

        console.error('[EmailGate] OAuth callback returned a failure.', {
          provider,
          code: result.code || result.error || 'unknown',
          wasSilentAttempt: !!wasSilentAttempt,
        });

        if (silentGoogleFailure) {
          // Release every loading state before navigating. If browser storage or
          // navigation rejects the retry, the normal login form remains usable.
          callbackSettled = true;
          window.clearTimeout(safetyTimer);
          setSocialLoading(null);
          setLoading(false);
          setStep('email');
          setError('');
          try {
            const interactiveReturnTo = new URL(safeReturnTo, window.location.origin).toString();
            await beginSocialOAuth('google', interactiveReturnTo, 'select_account');
          } catch (error) {
            setError(
              error instanceof Error
                ? error.message
                : 'Google sign-in could not restart. Please try again or use email.',
            );
          }
          return;
        }

        window.history.replaceState({}, '', safeReturnTo);
        setStep('email');
        setError(
          result.error ||
            (provider === 'google'
              ? 'Google sign-in failed. Please start again.'
              : 'Facebook sign-in failed. Please start again.'),
        );
      })
      .catch((error) => {
        console.error('[EmailGate] OAuth callback could not complete.', error);
        window.history.replaceState({}, '', '/');
        setStep('email');
        setError('Sign-in could not be completed. Please start again or use email.');
      })
      .finally(() => {
        callbackSettled = true;
        window.clearTimeout(safetyTimer);
        setLoading(false);
        setSocialLoading(null);
      });
    return () => {
      callbackSettled = true;
      window.clearTimeout(safetyTimer);
    };
    // The callback is intentionally consumed once for this page load.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /** Start the provider’s production authorization-code flow. The redirect URI
   *  is fixed in lib/authAccount.ts and cannot fall back to localhost or the
   *  current preview origin. */
  const runSocialSignIn = async (provider: 'google' | 'facebook') => {
    if (socialLoading || loading) return;
    if (provider === 'google' ? !isGoogleLoginConfigured() : !isFacebookLoginConfigured()) return;
    setError('');
    setAuthNotice('');
    setSocialLoading(provider);
    try {
      const current = new URL(window.location.href);
      current.searchParams.delete('as');
      // An explicit button click must always be interactive. Keep this argument
      // explicit even though the helper also defaults to select_account, so a
      // future helper default cannot reintroduce prompt=none here.
      await beginSocialOAuth(provider, current.toString(), 'select_account');
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : `${provider === 'google' ? 'Google' : 'Facebook'} sign-in could not start. Please try again.`,
      );
      setSocialLoading(null);
    }
  };

  const handleGoogleLogin = () => {
    void runSocialSignIn('google');
  };

  const handleFacebookLogin = () => {
    void runSocialSignIn('facebook');
  };

  // Password sign-in/sign-up and the emailed password-reset flow were removed
  // in v110 — email authentication is the original OTP-only flow again
  // (handleEmailSubmit → /register → emailed 4-digit code → handleCodeSubmit).

  const handlePhoneSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    const fullPhone = composeE164(phoneCountry, phoneNumber);
    if (!fullPhone) {
      setError('Please enter a valid phone number.');
      return;
    }
    setError('');
    setAuthNotice('');
    setLoading(true);
    try {
      const result = await smsSendOtp(fullPhone);
      if (result.success) {
        setPhoneMasked(result.phoneMasked || fullPhone);
        setPhoneCode('');
        setAuthNotice(`We texted a code to ${result.phoneMasked || fullPhone}.`);
        setPanelView('phoneCode');
      } else if (result.code === 'sms_not_configured' || result.code === 'service_unavailable') {
        setError('Phone sign-in is coming soon — please use another method for now.');
      } else {
        setError(result.error || 'Could not send the code. Please double-check the number and try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handlePhoneVerify = async (e?: React.FormEvent) => {
    e?.preventDefault();
    const fullPhone = composeE164(phoneCountry, phoneNumber);
    if (!fullPhone) {
      setError('Please re-enter your phone number.');
      setPanelView('main');
      return;
    }
    const cleanCode = phoneCode.replace(/\D/g, '');
    if (cleanCode.length < 4) {
      setError('Please enter the code we texted you.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const result = await smsVerifyOtp(fullPhone, cleanCode, { visitorId: getVisitorId() });
      if (result.success && result.workspaceSessionId) {
        adoptAuthSession(result.workspaceSessionId, result.email || null, 'phone', {
          phone: result.phone || fullPhone,
          phoneMasked: result.phoneMasked || phoneMasked,
          isReturningUser: !!result.isReturningUser,
        });
        return;
      }
      setError(result.error || 'That code did not work. Please try again or request a new one.');
    } finally {
      setLoading(false);
    }
  };

  function getVisitorId(): string {
    const key = 'audos_visitor_id';
    let id = localStorage.getItem(key);
    if (!id) {
      id = `v_${Math.random().toString(36).substring(2)}_${Date.now()}`;
      localStorage.setItem(key, id);
    }
    return id;
  }

  function getAttrCookie(): Record<string, string> | null {
    try {
      const raw = localStorage.getItem('audos_attribution');
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }

  function setAttrCookie(jsonStr: string) {
    const ATTR_COOKIE_NAME = 'audos_attr';
    const MULTI_LEVEL_TLDS = ['co.uk','co.za','co.in','co.jp','co.kr','co.nz','com.au','com.br','com.cn','com.mx','com.sg','com.hk','com.tw','com.ar','com.co','com.eg','com.my','com.ng','com.pe','com.ph','com.pk','com.tr','com.ua','com.vn','org.uk','org.au','net.au','net.uk','ac.uk','gov.uk','gov.au','edu.au','ne.jp','or.jp'];
    const hostname = window.location.hostname;
    const platformDomains = [
      'replit.dev', 'replit.app', 'repl.co',
      'github.io', 'herokuapp.com', 'netlify.app', 'vercel.app',
      'pages.dev', 'workers.dev', 'web.app', 'firebaseapp.com',
      'azurewebsites.net', 'cloudfront.net', 'amazonaws.com',
      'ngrok.io', 'ngrok.app', 'railway.app', 'render.com',
      'fly.dev', 'deno.dev', 'glitch.me'
    ];
    const isLocalhost = hostname === 'localhost' || hostname === '127.0.0.1' || hostname.endsWith('.localhost');
    const isIP = /^\d+\.\d+\.\d+\.\d+$/.test(hostname);
    let isPlatform = false;
    for (let i = 0; i < platformDomains.length; i++) {
      if (hostname.endsWith('.' + platformDomains[i]) || hostname === platformDomains[i]) {
        isPlatform = true;
        break;
      }
    }
    let domainPart = '';
    if (!isLocalhost && !isIP && !isPlatform) {
      const parts = hostname.split('.');
      const lastTwo = parts.slice(-2).join('.');
      if (MULTI_LEVEL_TLDS.indexOf(lastTwo) !== -1 && parts.length >= 3) {
        domainPart = '; domain=.' + parts.slice(-3).join('.');
      } else if (parts.length >= 2) {
        domainPart = '; domain=.' + parts.slice(-2).join('.');
      }
    }
    const isSecure = window.location.protocol === 'https:';
    const secureFlag = isSecure ? '; Secure' : '';
    document.cookie = ATTR_COOKIE_NAME + '=' + encodeURIComponent(jsonStr) + '; max-age=86400; path=/' + domainPart + '; SameSite=Lax' + secureFlag;
  }

  function storeAttribution() {
    const params = new URLSearchParams(window.location.search);
    const hasUtm = params.has('utm_source') || params.has('utm_medium') || params.has('utm_campaign') || params.has('fbclid') || params.has('gclid') || params.has('ref');
    if (!hasUtm) return;

    const attr: Record<string, string> = { capturedAt: Date.now().toString() };
    ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'fbclid', 'gclid', 'ref'].forEach(p => {
      const v = params.get(p);
      if (v) attr[p === 'ref' ? 'referrer' : p.replace('utm_', 'utm').replace('_', '')] = v;
    });
    if (document.referrer) attr.httpReferrer = document.referrer;

    try {
      localStorage.setItem('audos_attribution', JSON.stringify(attr));
    } catch {}

    const cookieAttr: Record<string, string> = { capturedAt: new Date().toISOString() };
    ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'fbclid', 'gclid', 'ref'].forEach(p => {
      const v = params.get(p);
      if (v) cookieAttr[p] = v;
    });
    if (document.referrer) cookieAttr.httpReferrer = document.referrer;
    try {
      setAttrCookie(JSON.stringify(cookieAttr));
      console.log('[EmailGate] Attribution stored in cookie:', cookieAttr);
    } catch {}
  }

  async function fireLeadEventWithRetry(emailAddr: string, attempt = 0) {
    const normalizedEmail = emailAddr.toLowerCase().trim();
    // Task #1480: stable conversion id used for both client-side rdt('track','Lead', …)
    // and server-side Reddit CAPI so they dedupe.
    const conversionId = `lead_${spaceId}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

    const tryFireFbq = (): boolean => {
      if (typeof (window as any).fbq === 'function') {
        (window as any).fbq('track', 'Lead', {
          content_name: 'Email Capture',
          content_category: 'space',
        }, {
          em: normalizedEmail
        });
        console.log('[EmailGate] Meta Pixel Lead event fired for:', emailAddr);
        return true;
      }
      return false;
    };

    if (!tryFireFbq()) {
      console.log('[EmailGate] fbq not ready, will retry with exponential backoff...');
      const maxRetries = 5;
      const delays = [100, 200, 400, 800, 1600];

      const retryWithBackoff = (retryAttempt: number) => {
        if (retryAttempt >= maxRetries) {
          console.warn('[EmailGate] Failed to fire Lead event - fbq never loaded after 5 retries');
          return;
        }
        setTimeout(() => {
          if (tryFireFbq()) {
            console.log(`[EmailGate] Lead event fired after ${retryAttempt + 1} retries`);
          } else {
            retryWithBackoff(retryAttempt + 1);
          }
        }, delays[retryAttempt]);
      };

      retryWithBackoff(0);
    }

    // Task #1480: Reddit Pixel Lead (parallel to Meta). We call window.rdt
    // directly — the queue stub installed by the injected PageVisit snippet
    // (Task #1456, already live) handles late pixel.js loads, so we don’t
    // need the exponential-backoff retry the Meta path uses. Re-running
    // rdt('init', …, { email, externalId }) propagates advanced matching for
    // the subsequent Lead event (Reddit "Step 3: Set up match keys").
    try {
      const rdt = (window as any).rdt;
      const pixelId = (window as any).__REDDIT_PIXEL_ID__;
      if (typeof rdt === 'function') {
        if (pixelId) {
          rdt('init', pixelId, { email: normalizedEmail, externalId: getVisitorId() });
        }
        rdt('track', 'Lead', { conversionId });
        console.log('[EmailGate] Reddit Pixel Lead event fired (conversionId=' + conversionId + ')');
      }
    } catch (e) {
      console.warn('[EmailGate] Reddit Pixel Lead failed:', e);
    }

    if (!workspaceId) return;
    try {
      await fetch(`/api/space/${spaceId}/track`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          eventType: 'lead',
          sessionId: `lead_${Date.now()}`,
          visitorId: getVisitorId(),
          // Task #1480: include conversionId so server-side Reddit CAPI dedupes
          // with the client-side rdt('track','Lead',…) fired above.
          conversionId,
          metadata: { email: emailAddr, conversionId, ...getAttribution() },
          workspaceId,
        }),
      });
    } catch {
      if (attempt < 2) setTimeout(() => fireLeadEventWithRetry(emailAddr, attempt + 1), 2000);
    }
  }

  const getAttribution = () => {
    const params = new URLSearchParams(window.location.search);

    const urlAttribution: Record<string, string | null> = {};
    if (params.get('utm_source')) urlAttribution.utmSource = params.get('utm_source');
    if (params.get('utm_medium')) urlAttribution.utmMedium = params.get('utm_medium');
    if (params.get('utm_campaign')) urlAttribution.utmCampaign = params.get('utm_campaign');
    if (params.get('utm_content')) urlAttribution.utmContent = params.get('utm_content');
    if (params.get('utm_term')) urlAttribution.utmTerm = params.get('utm_term');
    if (params.get('fbclid')) urlAttribution.fbclid = params.get('fbclid');
    if (params.get('gclid')) urlAttribution.gclid = params.get('gclid');
    if (params.get('ref')) urlAttribution.referrer = params.get('ref');
    if (document.referrer) urlAttribution.httpReferrer = document.referrer;

    const storedAttr = getAttrCookie();

    const merged: Record<string, string | null> = {};
    if (storedAttr) {
      for (const [key, value] of Object.entries(storedAttr)) {
        if (value && key !== 'capturedAt') merged[key] = value;
      }
    }
    for (const [key, value] of Object.entries(urlAttribution)) {
      if (value) merged[key] = value;
    }

    return Object.keys(merged).length > 0 ? merged : null;
  };

  const runtimeConfig = (window as any).__SPACE_CONFIG__;
  const runtimeDesktop = runtimeConfig?.desktop || {};
  const runtimeThemeTokens = runtimeDesktop?.themeTokens || {};
  const runtimeBranding = runtimeDesktop?.branding || {};
  // Founder-selected typography flows through themeTokens.typography (kickoff →
  // compiled __SPACE_CONFIG__). Derive the body/heading font stacks here so the
  // landing renders the chosen fonts instead of a hard-coded system-ui.
  const typography =
    themeTokens?.typography || runtimeThemeTokens?.typography || {};
  const bodyFontStack = typography.bodyFont
    ? `"${typography.bodyFont}", system-ui, -apple-system, sans-serif`
    : 'system-ui, -apple-system, sans-serif';
  const headingFontStack = typography.headingFont
    ? `"${typography.headingFont}", system-ui, -apple-system, sans-serif`
    : bodyFontStack;
  // Kickoff stores the manually selected color in palette.primary. Shell accent
  // is derived from palette.highlight and is only a fallback for older spaces.
  const selectedAccentColor = normalizeHexColor(
    themeTokens?.shell?.accentColor ||
      runtimeThemeTokens?.shell?.accentColor ||
      runtimeDesktop?.theme?.accentColor,
  );
  const palette =
    themeTokens?.palette ||
    runtimeThemeTokens?.palette ||
    branding?.palette ||
    runtimeBranding?.palette ||
    branding?.colors ||
    runtimeBranding?.colors ||
    {};
  const palettePrimary = normalizeHexColor(palette?.primary);
  const primaryColor = palettePrimary || selectedAccentColor || '#1e293b';
  const highlightColor = normalizeHexColor(palette?.highlight || palette?.secondary) || primaryColor;
  const contrastColor = palette?.contrast || '#ffffff';
  const brandName = branding?.name || 'Welcome';
  const tagline = branding?.tagline || 'Get started today.';
  const bgLight = palette?.surfaces?.page || colorWithAlpha(primaryColor, 0.04);
  const bgMedium = palette?.surfaces?.accentSoft || colorWithAlpha(primaryColor, 0.08);
  const borderColor = palette?.surfaces?.border || colorWithAlpha(primaryColor, 0.15);
  const panelColor = themeTokens?.shell?.panelBackground || palette?.surfaces?.panel || '#ffffff';
  const panelStrongColor =
    themeTokens?.shell?.panelStrongBackground || palette?.surfaces?.panelStrong || '#ffffff';
  const pageBackground = themeTokens?.shell?.pageBackground || palette?.surfaces?.page || '#ffffff';
  const sectionBackground = palette?.surfaces?.muted || '#f9fafb';
  const gateGradient =
    themeTokens?.shell?.gateBackground ||
    `linear-gradient(180deg, ${
      palette?.surfaces?.gradientFrom || bgLight
    } 0%, ${
      palette?.surfaces?.gradientVia || '#ffffff'
    } 55%, ${
      palette?.surfaces?.gradientTo || '#ffffff'
    } 100%)`;
  const textPrimary = palette?.text?.brand || primaryColor;
  const textMuted = palette?.text?.secondary || colorWithAlpha(primaryColor, 0.55);
  const textSubtle = palette?.text?.muted || colorWithAlpha(primaryColor, 0.35);
  const dangerColor = palette?.semantic?.danger || 'var(--space-semantic-danger)';
  const successColor = palette?.semantic?.success || 'var(--space-semantic-success)';
  const warningColor = palette?.semantic?.warning || 'var(--space-semantic-warning)';
  const selectedAccentOverridesPalette = !palettePrimary && !!selectedAccentColor;
  const onPrimary = selectedAccentOverridesPalette
    ? readableTextColor(primaryColor)
    : palette?.text?.onPrimary || readableTextColor(primaryColor);
  const onHighlight = selectedAccentOverridesPalette
    ? readableTextColor(highlightColor)
    : palette?.text?.onHighlight || onPrimary;
  // Vibrant hero gradient built from the workspace palette (never hardcoded
  // brand hex) so every generated space gets its own energetic look.
  const heroGradient = `linear-gradient(135deg, ${primaryColor} 0%, ${highlightColor} 55%, ${contrastColor} 115%)`;
  const brandGradient = `linear-gradient(135deg, ${primaryColor} 0%, ${highlightColor} 100%)`;
  // Hero copy + CTAs sit on the gradient/video, so they stay white over a
  // dark scrim. The scrim deepens for light primaries so text stays legible
  // regardless of the workspace palette (contrast may resolve to white).
  const primaryRgb = hexToRgb(primaryColor);
  const primaryIsLight = primaryRgb
    ? (0.2126 * primaryRgb.r + 0.7152 * primaryRgb.g + 0.0722 * primaryRgb.b) / 255 > 0.62
    : false;
  // Slightly deeper than before: the founder’s hero image has bright light
  // streaks on the left, exactly where the headline sits.
  const heroScrim = `linear-gradient(105deg, rgba(0,0,0,${primaryIsLight ? 0.72 : 0.64}) 0%, rgba(0,0,0,${primaryIsLight ? 0.52 : 0.38}) 48%, rgba(0,0,0,0.06) 88%)`;
  const heroVideoUrl =
    branding?.heroVideoUrl ||
    runtimeBranding.heroVideoUrl ||
    (window as any).__WORKSPACE_HERO_VIDEO_URL__ ||
    '';
  const heroHasVideo = typeof heroVideoUrl === 'string' && heroVideoUrl.trim().length > 0;
  // Static hero image — the founder-provided banner (abstract red/amber light
  // streaks on near-black; on-brand with #cc0000). It is already a compressed
  // progressive JPEG (~124KB), rendered eagerly (above the fold) inside a
  // fixed-height section so there is no layout shift while it loads, and no
  // autoplay video anywhere on the page.
  const heroImageUrl =
    'https://storage.googleapis.com/audos-images/attachments/c6ce26d1-7466-4b72-962d-b7bf7a471c88/ecab7c38-412d-461b-85f3-782c76d1a3e9.jfif';
  // Near-black ink for section headings (consultancy-grade hierarchy): the
  // brand red stays an accent (rules, icons, CTAs) instead of coloring whole
  // headlines.
  const headingInk = normalizeHexColor(palette?.text?.primary) || '#111827';
  const loginPanelId = 'email-gate-login-panel';

  const openLogin = () => {
    setPanelView('main');
    setError('');
    setAuthNotice('');
    setLoginOpen(true);
    setTimeout(() => {
      const input = document.querySelector<HTMLInputElement>('[data-testid="input-email"]');
      input?.focus();
    }, 0);
  };

  // Bain-style top navigation: in-page section links. The landing scrolls
  // inside `.eg-root` (not the window), so scrollIntoView targets the section
  // directly instead of relying on URL-fragment navigation.
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Adaptive navbar ink. The mark is drawn as a vector outline rather than as an
  // image, so it is exactly white over the dark hero and exactly near-black once a
  // light section has scrolled under the bar — and in both states the only thing
  // painted is the outline itself. All nav text uses the same high-contrast ink.
  const lightNavInk = '#111827';
  const navInk = navOverLight ? lightNavInk : '#ffffff';
  const navLinkInk = navOverLight ? lightNavInk : '#ffffff';

  // Centralized brand mark: the outline on its own, in one flat colour, with no
  // chip, plate or rounded square behind it — so it reads as the mark wherever
  // it is dropped instead of as a coloured tile. `blockColor` picks the ink:
  // brand red on light surfaces, white on dark ones.
  const BrandMark = ({
    size = 40,
    blockColor,
  }: { size?: number; blockColor?: string }) => (
    <BrandLogoMark size={size} color={blockColor || primaryColor} title={brandName} />
  );

  // Decorative side rails that fill the wide page margins on desktop (xl+):
  // a hairline with a few on-brand outline icons, tinted with the brand red
  // at low opacity. Pure inline SVG (lucide) — zero network weight — and
  // aria-hidden + pointer-events-none so they never affect interaction,
  // accessibility, or load performance.
  const EdgeRail = ({ icons, side }: { icons: any[]; side: 'left' | 'right' }) => (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-y-0 hidden flex-col items-center justify-center gap-10 xl:flex"
      style={side === 'left' ? { left: 36, width: 48 } : { right: 36, width: 48 }}
    >
      <span style={{ width: 1, flexGrow: 1, maxHeight: 96, backgroundColor: colorWithAlpha(primaryColor, 0.18) }} />
      {icons.map((Icon, i) => (
        <span
          key={i}
          className="flex h-11 w-11 items-center justify-center rounded-full"
          style={{
            border: `1px solid ${colorWithAlpha(primaryColor, 0.18)}`,
            backgroundColor: colorWithAlpha(primaryColor, 0.05),
            color: colorWithAlpha(primaryColor, 0.5),
          }}
        >
          <Icon size={19} strokeWidth={1.6} />
        </span>
      ))}
      <span style={{ width: 1, flexGrow: 1, maxHeight: 96, backgroundColor: colorWithAlpha(primaryColor, 0.18) }} />
    </div>
  );

  // Legacy single-method panel (pre-v107), kept unreferenced for easy
  // rollback — the live modal renders renderLoginPanel(true) defined below.
  const LegacyLoginPanelV106 = ({ compact = false }: { compact?: boolean }) => (
    <div
      id={loginPanelId}
      className={compact ? '' : 'rounded-3xl p-6 sm:p-8'}
      style={compact ? undefined : {
        backgroundColor: panelColor,
        boxShadow: `0 24px 48px ${colorWithAlpha(primaryColor, 0.14)}, 0 2px 6px ${colorWithAlpha(primaryColor, 0.06)}`,
        border: `1px solid ${borderColor}`,
      }}
    >
      {!compact && (
        <div className="mb-5 text-center">
          <div
            className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl"
            style={{ background: brandGradient, color: onPrimary }}
          >
            <Sparkles size={22} strokeWidth={2.4} />
          </div>
          <p className="text-base font-extrabold" style={{ color: textPrimary }}>
            Meet Mate
          </p>
          <p className="mt-1 text-sm" style={{ color: textMuted }}>
            Enter your email and your free fit assessment starts right away.
          </p>
        </div>
      )}

      <form onSubmit={handleEmailSubmit} className="space-y-4">
        <div>
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError('');
            }}
            placeholder="Enter your email"
            className="w-full px-4 py-4 text-base rounded-2xl focus:outline-none transition-all"
            style={{
              backgroundColor: sectionBackground,
              border: `2px solid ${error ? '#DC2626' : borderColor}`,
              color: textPrimary,
            }}
            disabled={loading}
            required
            autoFocus={loginOpen}
            data-testid="input-email"
          />
          {error && (
            <p className="mt-2 text-xs" style={{ color: dangerColor }} data-testid="text-error">
              {error}
            </p>
          )}
        </div>

        {gdprEnabled && (
          <div
            className="space-y-2 rounded-lg px-3 py-2 text-xs"
            style={{
              backgroundColor: bgLight,
              color: textMuted,
            }}
          >
            <p>
              By entering your email, you agree to our{' '}
              <a href="https://www.casemateaud.com/privacy" className="font-medium underline" style={{ color: textPrimary }}>
                Privacy Policy
              </a>.
            </p>
            <label className="flex items-start gap-2">
              <input
                type="checkbox"
                checked={marketingConsent}
                onChange={(e) => setMarketingConsent(e.target.checked)}
                className="mt-0.5 h-3.5 w-3.5 rounded"
                style={{ borderColor, accentColor: primaryColor }}
              />
              <span>I want to receive marketing emails and updates (optional)</span>
            </label>
          </div>
        )}

        <button
          type="submit"
          onMouseDown={(event) => event.preventDefault()}
          disabled={loading || !email}
          className="w-full py-4 rounded-2xl font-bold text-base transition-all flex items-center justify-center gap-2 hover:scale-[1.02]"
          style={{
            backgroundColor: loading || !email
              ? colorWithAlpha(primaryColor, 0.35)
              : primaryColor,
            color: loading || !email ? colorWithAlpha(onPrimary, 0.45) : onPrimary,
            cursor: loading || !email ? 'not-allowed' : 'pointer',
            boxShadow: loading || !email ? 'none' : `0 10px 24px ${colorWithAlpha(primaryColor, 0.34)}`,
          }}
          data-testid="button-continue"
        >
          {loading ? 'Just a moment...' : 'Start talking with Mate'}
          {!loading && <ArrowRight size={18} strokeWidth={2.6} />}
        </button>
      </form>

      <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 mt-5 text-xs font-medium" style={{ color: textSubtle }}>
        <span className="inline-flex items-center gap-1"><Check size={13} strokeWidth={3} />Free to start</span>
        <span className="inline-flex items-center gap-1"><Check size={13} strokeWidth={3} />No credit card</span>
        <span className="inline-flex items-center gap-1"><Check size={13} strokeWidth={3} />No passwords</span>
        <span className="inline-flex items-center gap-1"><Check size={13} strokeWidth={3} />Instant access</span>
      </div>

      {socialProviders.length > 0 && (
        <div className="mt-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex-1 h-px" style={{ backgroundColor: borderColor }} />
            <span className="text-xs font-medium" style={{ color: textSubtle }}>or continue with</span>
            <div className="flex-1 h-px" style={{ backgroundColor: borderColor }} />
          </div>
          <div className={`grid gap-2 ${socialProviders.length === 1 ? 'grid-cols-1' : 'grid-cols-2'}`}>
            {socialProviders.map((provider) => (
              <button
                key={provider}
                type="button"
                onClick={() => handleSocialLogin(provider)}
                disabled={loading}
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-2xl text-sm font-bold transition-all hover:-translate-y-0.5"
                style={{
                  backgroundColor: panelColor,
                  border: `2px solid ${borderColor}`,
                  color: textPrimary,
                  cursor: loading ? 'not-allowed' : 'pointer',
                }}
              >
                <span className="capitalize">{provider}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {guestModeEnabled && (
        <div className="mt-4 text-center">
          <button
            type="button"
            onClick={handleGuestMode}
            disabled={loading}
            className="text-sm font-semibold transition-colors hover:opacity-70"
            style={{ color: textMuted, cursor: loading ? 'not-allowed' : 'pointer' }}
            data-testid="button-guest-mode"
          >
            Continue as guest
          </button>
        </div>
      )}
    </div>
  );

  // The v107 login panel is rendered via plain function calls (NOT a nested
  // component) so typing in its inputs never remounts the subtree.
  // Public provider IDs control button availability. Secret verification
  // happens during the server-side callback exchange; the restored social
  // buttons start the existing provider authorization-code flows directly.
  const smsAuthLive = !!authStatus?.smsAuth;

  const fieldStyle = (hasError = false) => ({
    backgroundColor: sectionBackground,
    border: `2px solid ${hasError ? dangerColor : borderColor}`,
    color: textPrimary,
  });

  const renderComingSoonPill = () => (
    <span
      className="rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide"
      style={{ backgroundColor: bgMedium, color: textMuted }}
    >
      Coming soon
    </span>
  );

  const renderDivider = (label: string) => (
    <div className="my-4 flex items-center gap-3">
      <div className="h-px flex-1" style={{ backgroundColor: borderColor }} />
      <span className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: textSubtle }}>
        {label}
      </span>
      <div className="h-px flex-1" style={{ backgroundColor: borderColor }} />
    </div>
  );

  const renderGoogleMark = () => (
    <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
    </svg>
  );

  const renderFacebookMark = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#1877F2"
        d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047v-2.66c0-3.026 1.792-4.697 4.533-4.697 1.313 0 2.686.236 2.686.236v2.971H15.83c-1.491 0-1.956.93-1.956 1.886v2.264h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"
      />
    </svg>
  );

  const socialButtonsBusy = socialLoading !== null || loading;
  const socialButtonStyle = {
    backgroundColor: panelColor,
    border: `2px solid ${borderColor}`,
    color: textPrimary,
    cursor: socialButtonsBusy ? 'not-allowed' : 'pointer',
    opacity: socialButtonsBusy ? 0.7 : 1,
  };

  const renderMainView = () => (
    <>
      {/* 1+2 — social sign-in */}
      <div className="space-y-2">
        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={socialButtonsBusy}
          className="flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition-all hover:-translate-y-0.5 disabled:hover:translate-y-0"
          style={socialButtonStyle}
          data-testid="button-google-login"
        >
          {socialLoading === 'google' ? <Loader2 size={18} className="animate-spin" aria-hidden="true" /> : renderGoogleMark()}
          <span>{socialLoading === 'google' ? 'Connecting...' : 'Continue with Google'}</span>
        </button>
        <button
          type="button"
          onClick={handleFacebookLogin}
          disabled={socialButtonsBusy}
          className="flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition-all hover:-translate-y-0.5 disabled:hover:translate-y-0"
          style={socialButtonStyle}
          data-testid="button-facebook-login"
        >
          {socialLoading === 'facebook' ? <Loader2 size={18} className="animate-spin" aria-hidden="true" /> : renderFacebookMark()}
          <span>{socialLoading === 'facebook' ? 'Connecting...' : 'Continue with Facebook'}</span>
        </button>
      </div>

      {renderDivider('or')}

      {/* 3 — email: the original OTP-only flow (4-digit emailed code, no password) */}
      {(
        <form onSubmit={handleEmailSubmit} className="space-y-3">
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError('');
            }}
            placeholder="Enter your email"
            className="w-full rounded-xl px-4 py-3 text-sm transition-all focus:outline-none"
            style={fieldStyle(!!error)}
            disabled={loading}
            required
            autoFocus={loginOpen}
            data-testid="input-email"
          />
          <p className="text-xs" style={{ color: textSubtle }}>
            We’ll email you a 4-digit code — no password needed.
          </p>
          {error && (
            <p className="text-xs" style={{ color: dangerColor }} data-testid="text-error">
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={loading || !email}
            className="flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold transition-all hover:scale-[1.02] sm:text-base"
            style={{
              backgroundColor: loading || !email ? colorWithAlpha(primaryColor, 0.35) : primaryColor,
              color: loading || !email ? colorWithAlpha(onPrimary, 0.45) : onPrimary,
              cursor: loading || !email ? 'not-allowed' : 'pointer',
              boxShadow: loading || !email ? 'none' : `0 10px 24px ${colorWithAlpha(primaryColor, 0.34)}`,
            }}
            data-testid="button-continue"
          >
            {loading ? 'Just a moment...' : 'Start talking with Mate'}
            {!loading && <ArrowRight size={18} strokeWidth={2.6} />}
          </button>
        </form>
      )}

      {renderDivider('or')}

      {/* 4 — phone + SMS code */}
      <div>
        <div className="mb-2 flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold" style={{ color: textPrimary }}>
            <Smartphone size={14} />
            Phone number
          </span>
          {!smsAuthLive && renderComingSoonPill()}
        </div>
        <form onSubmit={handlePhoneSend} className="flex flex-col gap-2 sm:flex-row sm:items-stretch">
          <select
            value={phoneCountry}
            onChange={(e) => setPhoneCountry(e.target.value)}
            disabled={!smsAuthLive || loading}
            className="rounded-2xl px-2 py-3 text-sm font-semibold focus:outline-none"
            style={{ ...fieldStyle(false), opacity: smsAuthLive ? 1 : 0.6 }}
            aria-label="Country code"
            data-testid="select-phone-country"
          >
            {PHONE_COUNTRY_CODES.map((country) => (
              <option key={country.code} value={country.code}>
                {country.label}
              </option>
            ))}
          </select>
          <input
            type="tel"
            inputMode="tel"
            value={phoneNumber}
            onChange={(e) => {
              setPhoneNumber(e.target.value.replace(/[^0-9\s]/g, ''));
              setError('');
            }}
            placeholder="90 123 4567"
            disabled={!smsAuthLive || loading}
            className="w-full min-w-0 flex-1 rounded-2xl px-3 py-3 text-base transition-all focus:outline-none"
            style={{ ...fieldStyle(false), opacity: smsAuthLive ? 1 : 0.6 }}
            data-testid="input-phone"
          />
          <button
            type="submit"
            disabled={!smsAuthLive || loading || !phoneNumber.trim()}
            className="w-full whitespace-nowrap rounded-xl px-4 py-3 text-sm font-bold transition-all sm:w-auto"
            style={{
              backgroundColor:
                !smsAuthLive || loading || !phoneNumber.trim() ? colorWithAlpha(primaryColor, 0.25) : primaryColor,
              color: !smsAuthLive || loading || !phoneNumber.trim() ? colorWithAlpha(onPrimary, 0.5) : onPrimary,
              cursor: !smsAuthLive || loading || !phoneNumber.trim() ? 'not-allowed' : 'pointer',
            }}
            data-testid="button-send-otp"
          >
            Send code
          </button>
        </form>
      </div>

      {gdprEnabled && (
        <div
          className="mt-4 space-y-2 rounded-lg px-3 py-2 text-xs"
          style={{
            backgroundColor: bgLight,
            color: textMuted,
          }}
        >
          <p>
            By signing in, you agree to our{' '}
            <a href="https://www.casemateaud.com/privacy" className="font-medium underline" style={{ color: textPrimary }}>
              Privacy Policy
            </a>.
          </p>
          <label className="flex items-start gap-2">
            <input
              type="checkbox"
              checked={marketingConsent}
              onChange={(e) => setMarketingConsent(e.target.checked)}
              className="mt-0.5 h-3.5 w-3.5 rounded"
              style={{ borderColor, accentColor: primaryColor }}
            />
            <span>I want to receive marketing emails and updates (optional)</span>
          </label>
        </div>
      )}

      <div className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs font-medium" style={{ color: textSubtle }}>
        <span className="inline-flex items-center gap-1"><Check size={13} strokeWidth={3} />Free to start</span>
        <span className="inline-flex items-center gap-1"><Check size={13} strokeWidth={3} />No credit card</span>
        <span className="inline-flex items-center gap-1"><Check size={13} strokeWidth={3} />Instant access</span>
      </div>

      {guestModeEnabled && (
        <div className="mt-3 text-center">
          <button
            type="button"
            onClick={handleGuestMode}
            disabled={loading}
            className="text-sm font-semibold transition-colors hover:opacity-70"
            style={{ color: textMuted, cursor: loading ? 'not-allowed' : 'pointer' }}
            data-testid="button-guest-mode"
          >
            Continue as guest
          </button>
        </div>
      )}
    </>
  );

  const renderBackButton = (label = 'All sign-in options') => (
    <button
      type="button"
      onClick={() => {
        setPanelView('main');
        setError('');
        setAuthNotice('');
      }}
      className="mb-3 inline-flex items-center gap-1 text-xs font-semibold transition-opacity hover:opacity-70"
      style={{ color: textMuted }}
      data-testid="button-back-to-methods"
    >
      <ChevronLeft size={14} />
      {label}
    </button>
  );

  const renderPhoneCodeView = () => (
    <div>
      {renderBackButton()}
      <p className="text-base font-extrabold" style={{ color: textPrimary }}>
        Enter the code we texted you
      </p>
      <p className="mt-1 text-sm" style={{ color: textMuted }}>
        Sent to <span className="font-semibold" style={{ color: textPrimary }}>{phoneMasked || 'your phone'}</span>
      </p>
      <form onSubmit={handlePhoneVerify} className="mt-4 space-y-3">
        <input
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={8}
          value={phoneCode}
          onChange={(e) => {
            setPhoneCode(e.target.value.replace(/\D/g, ''));
            setError('');
          }}
          placeholder="000000"
          className="w-full rounded-2xl px-4 py-3.5 text-center font-mono text-xl tracking-[0.35em] transition-all focus:outline-none sm:text-2xl sm:tracking-[0.4em]"
          style={fieldStyle(!!error)}
          disabled={loading}
          autoFocus
          data-testid="input-phone-code"
        />
        {error && (
          <p className="text-xs" style={{ color: dangerColor }} data-testid="text-error">
            {error}
          </p>
        )}
        <button
          type="submit"
          disabled={loading || phoneCode.length < 4}
          className="flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold transition-all hover:scale-[1.02] sm:text-base"
          style={{
            backgroundColor: loading || phoneCode.length < 4 ? colorWithAlpha(primaryColor, 0.3) : primaryColor,
            color: onPrimary,
            cursor: loading || phoneCode.length < 4 ? 'not-allowed' : 'pointer',
          }}
          data-testid="button-verify-phone"
        >
          {loading ? 'Verifying...' : 'Verify & continue'}
          {!loading && <ArrowRight size={18} strokeWidth={2.6} />}
        </button>
        <div className="text-center">
          <button
            type="button"
            onClick={() => handlePhoneSend()}
            disabled={loading}
            className="text-xs font-semibold transition-opacity hover:opacity-70"
            style={{ color: textMuted }}
          >
            Resend code
          </button>
        </div>
      </form>
    </div>
  );

  const renderLoginPanel = (compact = false) => (
    <div
      id={loginPanelId}
      className={compact ? '' : 'rounded-3xl p-6 sm:p-8'}
      style={compact ? undefined : {
        backgroundColor: panelColor,
        boxShadow: `0 24px 48px ${colorWithAlpha(primaryColor, 0.14)}, 0 2px 6px ${colorWithAlpha(primaryColor, 0.06)}`,
        border: `1px solid ${borderColor}`,
      }}
    >
      {!compact && panelView === 'main' && (
        <div className="mb-5 text-center">
          <div
            className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl"
            style={{ background: brandGradient, color: onPrimary }}
          >
            <Sparkles size={22} strokeWidth={2.4} />
          </div>
          <p className="text-base font-extrabold" style={{ color: textPrimary }}>
            Meet Mate
          </p>
          <p className="mt-1 text-sm" style={{ color: textMuted }}>
            Sign in your way and your free fit assessment starts right away.
          </p>
        </div>
      )}

      {panelView === 'phoneCode' ? renderPhoneCodeView() : renderMainView()}
    </div>
  );

  // Checking for a saved session, then handing a verified one to the shell.
  // Both are waits rather than screens, and they are what the customer sits
  // through on a cold open: draw the brand mark for them instead of nothing,
  // which is also what lets the pre-hydration splash hand over to an identical
  // splash rather than to a blank page.
  if (step === 'loading' || step === 'complete') {
    return <BrandSplash />;
  }

  // OTP Code verification screen
  if (step === 'code') {
    return (
      <div
        className="min-h-screen flex flex-col overflow-y-auto"
        style={{ fontFamily: bodyFontStack, background: gateGradient }}
      >
        <div className="flex-1 flex items-center justify-center px-6 py-12">
          <div className="w-full max-w-sm">
            <div className="text-center mb-10">
              <div className="flex justify-center mb-4">
                <BrandMark size={56} />
              </div>
              <h1 className="text-lg font-extrabold tracking-tight sm:text-2xl" style={{ color: textPrimary, fontFamily: headingFontStack }}>
                Check your inbox
              </h1>
              <p className="mt-2 text-sm" style={{ color: textMuted }}>
                We sent a 4-digit code to<br />
                <span className="font-medium" style={{ color: textPrimary }}>{email}</span>
              </p>
              <p className="mt-3 text-xs" style={{ color: textSubtle }}>
                can’t find it? Check your spam or junk folder.
              </p>
            </div>

            <form onSubmit={handleCodeSubmit} className="space-y-5">
              <div>
                <input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={4}
                  value={code}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, '');
                    setCode(val);
                    setError('');
                  }}
                  placeholder="0000"
                  className="w-full rounded-xl px-4 py-3 text-center font-mono text-xl tracking-[0.35em] transition-all focus:outline-none sm:text-2xl sm:tracking-[0.5em]"
                  style={{
                    backgroundColor: panelColor,
                    border: `2px solid ${error ? '#DC2626' : borderColor}`,
                    color: textPrimary,
                  }}
                  disabled={loading}
                  autoFocus
                  data-testid="input-code"
                />
                {error && (
                  <p className="mt-2 text-xs" style={{ color: dangerColor }} data-testid="text-error">
                    {error}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading || code.length !== 4}
                className="w-full py-3.5 rounded-2xl font-bold text-base transition-all flex items-center justify-center gap-2 hover:scale-[1.02]"
                style={{
                  backgroundColor: loading || code.length !== 4 ? colorWithAlpha(primaryColor, 0.3) : primaryColor,
                  color: onPrimary,
                  cursor: loading || code.length !== 4 ? 'not-allowed' : 'pointer',
                  boxShadow: loading || code.length !== 4 ? 'none' : `0 10px 24px ${colorWithAlpha(primaryColor, 0.34)}`,
                }}
                data-testid="button-verify"
              >
                {loading ? 'Verifying...' : 'Verify Code'}
                {!loading && <ArrowRight size={18} strokeWidth={2.6} />}
              </button>
            </form>

            <div className="text-center mt-6 space-x-4">
              <button
                onClick={handleResendCode}
                disabled={resendCooldown > 0 || loading}
                className="text-sm transition-colors"
                style={{ color: resendCooldown > 0 ? textSubtle : textPrimary }}
              >
                {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : 'Resend code'}
              </button>
              <span style={{ color: textSubtle }}>|</span>
              <button
                onClick={() => { setStep('email'); setCode(''); setError(''); }}
                className="text-sm transition-colors"
                style={{ color: textMuted }}
              >
                Change email
              </button>
            </div>
          </div>
        </div>

        <div className="pb-8 text-center">
          <p className="text-xs" style={{ color: textSubtle }}>
            Your data is private and secure
          </p>
        </div>
      </div>
    );
  }

  // Main email entry screen - landing page first, native login panel on CTA.
  return (
    <>
      {/*
        WYSIWYG kickoff: the founder-chosen landing look replaces ONLY the shell
        region between the START/END markers below. Everything outside it — the
        auth hooks/handlers above, and the login modal + renderLoginPanel() after END —
        is fixed platform infrastructure and is never LLM-regenerated, so
        sign-in / OTP / registration is guaranteed intact after a variant ships.
        A generated shell may use in-scope brand vars (primaryColor, brandName,
        heroVideoUrl, heroHasVideo, openLogin, BrandMark, colorWithAlpha, the
        lucide icons, …) but must not fetch, register, or duplicate auth.
        See server/services/kickoff-email-gate-variants.service.ts.
      */}
      {/* AUDOS:LANDING_SHELL:START */}
    <div className="eg-root h-screen overflow-x-hidden overflow-y-auto" style={{ height: '100dvh', WebkitOverflowScrolling: 'touch', fontFamily: bodyFontStack, backgroundColor: pageBackground }}>
  {/* Adaptive navbar: it never paints a bar of its own. It floats over whatever
      section is underneath (the negative margin pulls the hero up behind it) and
      only swaps its ink — white over the dark hero, near-black ink once a light
      section has scrolled under it. Over light sections the page
      tone (not white) sits behind the links at low strength so content passing
      underneath stays readable without reading as a bar. */}
  <nav
    className="sticky top-0 z-50 w-full"
    style={{
      marginBottom: '-81px',
      backgroundColor: navOverLight ? colorWithAlpha(pageBackground, 0.94) : 'transparent',
      backdropFilter: navOverLight ? 'saturate(140%) blur(10px)' : 'none',
      WebkitBackdropFilter: navOverLight ? 'saturate(140%) blur(10px)' : 'none',
      // A transparent 1px edge in both states keeps the bar exactly 81px tall
      // (the negative margin above depends on it) without ever showing a border.
      borderBottom: '1px solid transparent',
      boxShadow: 'none',
      transition: 'background-color 0.35s ease, backdrop-filter 0.35s ease',
    }}
  >
    <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:gap-6 sm:px-6 sm:py-5">
      <div className="flex items-center gap-3">
        <BrandLogoMark size={30} style={{ color: navInk, transition: 'color 0.35s ease' }} />
        <span className="max-w-[45vw] truncate text-sm sm:max-w-none sm:text-base" style={{ fontFamily: headingFontStack, color: navInk, fontWeight: 700, letterSpacing: '-0.01em', transition: 'color 0.35s ease' }}>{brandName}</span>
      </div>
      <div className="hidden items-center gap-9 md:flex" aria-label="Page sections">
        {[
          { label: 'Programs open', id: 'programs-open' },
          { label: 'How it works', id: 'how-it-works' },
          { label: 'Pricing', id: 'pricing' },
        ].map((link) => (
          <button key={link.id} type="button" onClick={() => scrollToSection(link.id)} className="text-sm hover:opacity-60" style={{ color: navLinkInk, fontWeight: 600, transition: 'color 0.35s ease, opacity 0.2s ease' }}>
            {link.label}
          </button>
        ))}
      </div>
      <button onClick={openLogin} className="shrink-0 rounded-xl bg-[#cc0000] px-3.5 py-2 text-xs hover:-translate-y-0.5 hover:bg-[#b91c1c] sm:rounded-full sm:px-5 sm:py-2.5 sm:text-sm" style={{ color: '#ffffff', fontWeight: 700, transition: 'background-color 0.35s ease, transform 0.2s ease' }}>
        Start free
      </button>
    </div>
  </nav>

  <section id="hero" className="relative flex items-center overflow-hidden" style={{ minHeight: '100svh', backgroundColor: '#0f172a' }}>
    <img
      src={heroImageUrl}
      alt=""
      decoding="async"
      fetchPriority="high"
      className="absolute inset-0 h-full w-full object-cover"
    />
    <div aria-hidden="true" data-audos-hero-scrim="1" className="absolute inset-0" style={{ background: heroScrim, pointerEvents: 'none' }} />
    <div aria-hidden="true" className="absolute inset-x-0 top-0 h-32" style={{ background: 'linear-gradient(180deg, rgba(2,6,23,0.55) 0%, rgba(2,6,23,0) 100%)', pointerEvents: 'none' }} />
    <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-40" style={{ background: 'linear-gradient(180deg, rgba(2,6,23,0) 0%, rgba(2,6,23,0.4) 100%)', pointerEvents: 'none' }} />
    <div className="relative z-10 mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 md:py-28">
      <div className={`max-w-2xl transition-all duration-700 ${entered ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'}`}>
        <div className="flex items-center gap-3">
          <span aria-hidden="true" style={{ width: 44, height: 3, backgroundColor: primaryColor, flexShrink: 0 }} />
          <span className="break-words text-[11px] uppercase leading-snug sm:text-xs" style={{ color: 'rgba(255,255,255,0.88)', letterSpacing: '0.16em', fontWeight: 700 }}>For Vietnamese Economics &amp; STEM students targeting MT &amp; consulting</span>
        </div>
        <h1 className="mt-7 text-lg leading-snug sm:text-6xl md:text-7xl" style={{ fontFamily: headingFontStack, color: '#ffffff', fontWeight: 700, letterSpacing: '-0.035em', lineHeight: 1.05 }}>
          Prep for MT and consulting rounds — starting with FMCG
        </h1>
        <p className="mt-7 max-w-2xl text-sm font-light leading-relaxed sm:text-lg" style={{ color: 'rgba(255,255,255,0.9)' }}>
          Drop your CV and answer a few multiple-choice questions — free. Mate maps your industry and function fit, matches you to Vietnamese Management Trainee and consulting programs with timelines and round-by-round detail, then unlocks Domain Knowledge that breaks FMCG into six sub-industries with research-backed cards, Vietnam examples, and flip-side quizzes.
        </p>
        <div className="mt-10 flex flex-col items-start gap-5 sm:flex-row sm:items-center">
          <button data-testid="button-open-login" onClick={openLogin} className="group inline-flex w-full items-center justify-center gap-2 rounded-2xl px-6 py-3 text-sm transition-transform hover:-translate-y-0.5 sm:w-auto sm:whitespace-nowrap sm:rounded-full sm:px-8 sm:py-4 sm:text-base" style={{ backgroundColor: primaryColor, color: onPrimary, fontWeight: 700, boxShadow: '0 20px 50px -12px rgba(0,0,0,0.55)' }}>
            Start your free fit assessment
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </button>
          <p className="text-xs font-medium leading-snug sm:text-sm" style={{ color: 'rgba(255,255,255,0.85)' }}>
            Built for 3rd- and final-year Economics and STEM students preparing for Management Trainee and consulting roles in Vietnam.
          </p>
        </div>
      </div>
    </div>
  </section>

  <section id="programs-open" className="relative" aria-labelledby="programs-open-title">
    <EdgeRail side="left" icons={[Compass, GraduationCap]} />
    <EdgeRail side="right" icons={[Briefcase, TrendingUp]} />
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-28 md:py-32">
      <div className="mx-auto max-w-3xl text-center">
        <div className="flex flex-col items-center gap-4">
          <span aria-hidden="true" style={{ width: 44, height: 3, backgroundColor: primaryColor }} />
          <span className="text-xs uppercase" style={{ color: primaryColor, letterSpacing: '0.24em', fontWeight: 700 }}>Applications Open</span>
        </div>
        <h2 id="programs-open-title" className="mt-4 text-lg font-light leading-snug sm:mt-6 sm:text-5xl" style={{ fontFamily: headingFontStack, color: headingInk, letterSpacing: '-0.025em' }}>
          MT programs now accepting applications.
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-base font-light leading-relaxed" style={{ color: textMuted }}>
          don’t miss your chance to apply. Check your fit with Mate and submit before the deadline.
        </p>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          {
            name: 'Techcombank Future Gen',
            status: 'Applications Open',
            deadline: '30 September 2026',
            href: 'https://tuyendung.techcombankjobs.com/techcombank-future-gen',
            badgeColor: primaryColor,
          },
          {
            name: 'Maersk SEED Internship 2026',
            status: 'Applications Open',
            deadline: '31 August 2026',
            href: 'https://maersk.wd3.myworkdayjobs.com/Maersk_Careers/job/Vietnam-H-Ch-Minh-Ho-Chi-Minh-City-71100/Maersk-SEED-Internship-2026---Second-Intake_R191542?source=LinkedIn',
            badgeColor: primaryColor,
          },
          {
            name: 'Central Retail Management Associate',
            status: 'Applications Open',
            deadline: '24/08/2026',
            href: 'https://centralretail.talent.vn/job/vietnam-management-associate-program-2026-10949',
            badgeColor: primaryColor,
          },
          {
            name: 'Sea Global Management Associate Program',
            status: 'Applications Open',
            deadline: '31/10/2026',
            href: 'https://seagmap.sea.com/',
            badgeColor: primaryColor,
          },
        ].map((program) => (
          <article key={program.name} className="flex h-full flex-col rounded-2xl p-5 sm:p-6" style={{ backgroundColor: panelColor, border: `1px solid ${borderColor}`, borderTop: `4px solid ${primaryColor}`, boxShadow: `0 24px 50px -34px ${colorWithAlpha(primaryColor, 0.5)}` }}>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <h3
                className="max-w-sm text-base sm:text-lg"
                style={{
                  fontFamily: headingFontStack,
                  color: headingInk,
                  fontWeight: 700,
                  letterSpacing: '-0.015em',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }}
              >
                {program.name}
              </h3>
              <span className="inline-flex items-center rounded-full px-2.5 py-1 text-[11px]" style={{ backgroundColor: colorWithAlpha(program.badgeColor, 0.11), color: program.badgeColor, border: `1px solid ${colorWithAlpha(program.badgeColor, 0.24)}`, fontWeight: 800 }}>
                {program.status}
              </span>
            </div>
            <p className="mt-7 text-xs uppercase" style={{ color: textSubtle, letterSpacing: '0.14em', fontWeight: 700 }}>Deadline</p>
            <p className="mt-2 inline-flex self-start rounded-full px-2.5 py-1.5 text-xs" style={{ backgroundColor: colorWithAlpha(primaryColor, 0.1), color: primaryColor, border: `1px solid ${colorWithAlpha(primaryColor, 0.24)}`, fontWeight: 800 }}>Apply by: {program.deadline}</p>
            <a
              href={program.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full px-4 py-3 text-sm transition-all hover:-translate-y-0.5 sm:mt-auto sm:w-auto sm:self-start"
              style={{ backgroundColor: primaryColor, color: onPrimary, fontWeight: 700, boxShadow: `0 14px 30px -14px ${colorWithAlpha(primaryColor, 0.58)}` }}
              aria-label={`Apply Now — ${program.name} (opens in a new tab)`}
            >
              Apply Now
              <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />
            </a>
          </article>
        ))}
      </div>
    </div>
  </section>

  {/* Pricing — matching is free; Casemate Pro offers three native-checkout plans for the training layer. */}
  <section id="pricing" className="relative">
    <EdgeRail side="left" icons={[Layers, BookOpen]} />
    <EdgeRail side="right" icons={[Target, LineChart]} />
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-28">
    <div className="mx-auto max-w-2xl text-center">
      <div className="flex flex-col items-center gap-4">
        <span aria-hidden="true" style={{ width: 44, height: 3, backgroundColor: primaryColor }} />
        <span className="text-xs uppercase" style={{ color: textSubtle, letterSpacing: '0.24em', fontWeight: 700 }}>Pricing</span>
      </div>
      <h2 className="mx-auto mt-4 max-w-2xl text-lg font-light leading-snug sm:mt-6 sm:text-4xl" style={{ fontFamily: headingFontStack, color: headingInk, letterSpacing: '-0.02em' }}>
        Direction is free. Training is Casemate Pro.
      </h2>
      <p className="mx-auto mt-6 max-w-lg text-base font-light leading-relaxed" style={{ color: textMuted }}>
        Your fit assessment, MT and consulting program matches, timelines, and round-by-round detail cost nothing. When it’s time to train, three Pro options unlock case practice, drills, and FMCG Domain Knowledge — six sub-industries with visual cards, Vietnam examples, and gamified quizzes.
      </p>
    </div>

    <div className="mx-auto mt-16 grid max-w-4xl gap-6 md:grid-cols-2">
      <div className="flex h-full flex-col rounded-2xl p-5 sm:p-8 md:p-10" style={{ backgroundColor: panelColor, border: `1px solid ${borderColor}` }}>
        <p className="text-xs uppercase" style={{ color: textSubtle, letterSpacing: '0.2em', fontWeight: 700 }}>Fit &amp; direction</p>
        <div className="mt-5 flex items-baseline gap-2">
          <span className="text-2xl sm:text-5xl" style={{ fontFamily: headingFontStack, color: headingInk, fontWeight: 300, letterSpacing: '-0.03em' }}>Free</span>
        </div>
        <p className="mt-3 text-sm font-light leading-relaxed" style={{ color: textMuted }}>
          Everything you need to point your profile in the right direction — before you spend anything at all.
        </p>
        <ul className="mt-8 flex-1 space-y-3.5">
          {[
            'CV-based fit assessment with Mate',
            'Industry fit and function fit',
            'Matched Vietnamese MT & consulting programs, each with a match percentage',
            'Application timelines and round-by-round detail across 20 founder-verified programs',
            'Personal prep plan for the next 1–2 years',
          ].map((f, i) => (
            <li key={i} className="flex items-start gap-3 text-sm font-light leading-relaxed" style={{ color: textMuted }}>
              <Check size={16} strokeWidth={2.6} color={primaryColor} style={{ flexShrink: 0, marginTop: 2 }} />
              {f}
            </li>
          ))}
        </ul>
        <button onClick={openLogin} className="mt-10 w-full rounded-full py-3.5 text-sm transition-all hover:-translate-y-0.5" style={{ backgroundColor: 'transparent', border: `2px solid ${primaryColor}`, color: primaryColor, fontWeight: 700 }}>
          Start your free assessment
        </button>
      </div>

      <div className="relative flex h-full flex-col rounded-2xl p-10" style={{ backgroundColor: panelColor, border: `1px solid ${colorWithAlpha(primaryColor, 0.35)}`, borderTop: `4px solid ${primaryColor}`, boxShadow: `0 30px 60px -30px ${colorWithAlpha(primaryColor, 0.3)}` }}>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-xs uppercase" style={{ color: primaryColor, letterSpacing: '0.2em', fontWeight: 700 }}>Casemate Pro</p>
          <span className="rounded-full px-3 py-1 text-[11px] uppercase" style={{ backgroundColor: colorWithAlpha(primaryColor, 0.08), color: primaryColor, fontWeight: 700, letterSpacing: '0.08em' }}>When you’re ready to train</span>
        </div>
        <div className="mt-5 flex items-baseline gap-2">
          <span className="text-2xl sm:text-5xl" style={{ fontFamily: headingFontStack, color: headingInk, fontWeight: 300, letterSpacing: '-0.03em' }}>From $5</span>
          <span className="text-base font-light" style={{ color: textMuted }}>first month</span>
        </div>
        <p className="mt-3 text-sm font-light leading-relaxed" style={{ color: textMuted }}>
          Everything in Free, plus the full training layer for the rounds themselves. Cancel anytime.
        </p>
        <ul className="mt-8 flex-1 space-y-5">
          {[
            { icon: Layers, title: 'Case Pool', body: 'Full case practice, end to end — data visualized as charts the way they appear in real MT and consulting rounds.' },
            { icon: Target, title: 'Case Drill', body: 'Micro-drills across structures, math, market sizing, charts, and creativity — each answer graded with a score and exactly what to improve next.' },
            { icon: BookOpen, title: 'Domain Knowledge', body: 'Deep industry knowledge across FMCG, Banking, Tech, Retail, and more — organized by topic with cards, quizzes, and real industry insights.' },
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-4">
              <span className="flex h-10 w-10 items-center justify-center rounded-full" style={{ backgroundColor: colorWithAlpha(primaryColor, 0.08), flexShrink: 0 }}>
                <item.icon size={18} color={primaryColor} strokeWidth={1.8} />
              </span>
              <span>
                <span className="block text-sm" style={{ color: headingInk, fontWeight: 600 }}>{item.title}</span>
                <span className="mt-1 block text-sm font-light leading-relaxed" style={{ color: textMuted }}>{item.body}</span>
              </span>
            </li>
          ))}
        </ul>
        <button onClick={openLogin} className="mt-10 w-full rounded-full py-3.5 text-sm transition-all hover:-translate-y-0.5" style={{ backgroundColor: primaryColor, color: onPrimary, fontWeight: 700, boxShadow: `0 14px 30px -12px ${colorWithAlpha(primaryColor, 0.55)}` }}>
          Get Pro Plan
        </button>
      </div>
    </div>

    <p className="mx-auto mt-10 max-w-lg text-center text-sm font-light" style={{ color: textSubtle }}>
      $5 for the first month, $8 monthly, or $30 for 6 months. Match for free and choose Pro when you’re ready to train.
    </p>
    </div>
  </section>

  {/*
    Testimonials / social proof.
    PLACEHOLDER TESTIMONIALS — the quotes below are illustrative placeholders,
    NOT real students. The UI labels each card "Illustrative example" and the
    section subline says real quotes are coming, so nothing reads as fake
    social proof. Replace each entry with a real quote (with the student’s
    permission) and restore real attribution before treating this as genuine.
  */}
  <section className="relative">
    <EdgeRail side="left" icons={[Users, Sparkles]} />
    <EdgeRail side="right" icons={[Award, TrendingUp]} />
    <div className="mx-auto max-w-6xl px-6 pb-32">
    <div className="mx-auto max-w-2xl text-center">
      <div className="flex flex-col items-center gap-4">
        <span aria-hidden="true" style={{ width: 44, height: 3, backgroundColor: primaryColor }} />
        <span className="text-xs uppercase" style={{ color: textSubtle, letterSpacing: '0.24em', fontWeight: 700 }}>What students say</span>
      </div>
      <h2 className="mt-6 text-lg font-light leading-snug sm:text-3xl md:text-4xl" style={{ fontFamily: headingFontStack, color: headingInk, letterSpacing: '-0.02em' }}>
        Direction changes everything.
      </h2>
      <p className="mx-auto mt-5 max-w-md text-sm font-light leading-relaxed" style={{ color: textSubtle }}>
        Illustrative examples of the moments Mate is built for — real student quotes will take their place as our first users complete their assessments.
      </p>
    </div>
    <div className="mt-16 grid gap-6 md:grid-cols-3">
      {[
        // PLACEHOLDER — swap for real student quotes (with permission) and
        // restore real name/detail attribution when they exist.
        { quote: 'I spent 6 months building the wrong profile before I found Casemate — now I know exactly which function to target.', name: 'Illustrative example', detail: 'A 3rd-year student choosing a function' },
        { quote: 'I thought FMCG was just one bucket. Domain Knowledge broke it into dairy, beverages, snacks, and more — with Vietnam company examples and quizzes on the back of each card. I finally know which sub-industry to talk about in interviews.', name: 'Illustrative example', detail: 'A final-year Economics student prepping for FMCG MT rounds' },
        { quote: 'The prep plan alone was worth it. I finally know what to do this year instead of panicking when applications open.', name: 'Illustrative example', detail: 'A 3rd-year student building a prep plan' },
      ].map((t, i) => (
        <figure key={i} className="flex h-full flex-col rounded-2xl p-8" style={{ backgroundColor: panelColor, border: `1px solid ${borderColor}` }}>
          <span aria-hidden="true" style={{ fontFamily: headingFontStack, fontWeight: 300, fontSize: '2.5rem', lineHeight: 1, color: colorWithAlpha(primaryColor, 0.25) }}>“</span>
          <blockquote className="mt-2 flex-1 text-base font-light leading-relaxed" style={{ color: headingInk }}>
            {t.quote}
          </blockquote>
          <figcaption className="mt-6 pt-5" style={{ borderTop: `1px solid ${colorWithAlpha(borderColor, 0.8)}` }}>
            <p className="text-sm" style={{ color: headingInk, fontWeight: 600 }}>{t.name}</p>
            <p className="mt-0.5 text-xs font-light" style={{ color: textMuted }}>{t.detail}</p>
          </figcaption>
        </figure>
      ))}
    </div>
    </div>
  </section>

  <section id="how-it-works" className="relative" style={{ backgroundColor: sectionBackground, borderTop: `1px solid ${colorWithAlpha(borderColor, 0.5)}` }}>
    <EdgeRail side="left" icons={[FileText, MousePointerClick]} />
    <EdgeRail side="right" icons={[Target, Map]} />
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-2xl text-center">
        <div className="flex flex-col items-center gap-4">
          <span aria-hidden="true" style={{ width: 44, height: 3, backgroundColor: primaryColor }} />
          <span className="text-xs uppercase" style={{ color: textSubtle, letterSpacing: '0.24em', fontWeight: 700 }}>How it works</span>
        </div>
        <h2 className="mx-auto mt-4 max-w-2xl text-lg font-light leading-snug sm:mt-6 sm:text-4xl" style={{ fontFamily: headingFontStack, color: headingInk, letterSpacing: '-0.02em' }}>
          A short conversation. A clear direction.
        </h2>
        <p className="mx-auto mt-6 max-w-lg text-base font-light leading-relaxed" style={{ color: textMuted }}>
          Four steps from CV to direction — free, with no essays and no guesswork. Answer by clicking, not writing, and your result is saved so you can come back anytime.
        </p>
      </div>

      <div className="mt-16 grid gap-3 md:grid-cols-4 md:gap-6">
        {[
          { icon: FileText, title: 'Share your CV', desc: 'Upload a file, paste the text, or drop in a link — Google Docs, a Google Drive PDF, or any public PDF. Mate reads it in seconds.', highlight: false },
          { icon: MousePointerClick, title: 'Answer quick questions', desc: 'A handful of multiple-choice questions to fill the gaps and learn what excites you.', highlight: false },
          { icon: Target, title: 'See where you fit', desc: 'Industry fit, function fit, and matched Vietnamese MT and consulting programs — each with a match percentage.', highlight: false },
          { icon: Map, title: 'Get your prep plan', desc: 'Application timelines and round-by-round detail for every matched program, plus a personal prep plan for the next 1–2 years.', highlight: true },
        ].map((s, i) => (
          <div key={i} className="relative">
            <div
              className="flex h-full flex-col rounded-2xl p-7 text-left"
              style={
                s.highlight
                  ? { background: brandGradient, boxShadow: '0 30px 60px -30px rgba(0,0,0,0.35)' }
                  : { backgroundColor: panelColor, border: `1px solid ${borderColor}` }
              }
            >
              <div className="flex items-start justify-between">
                <span
                  style={{
                    fontFamily: headingFontStack,
                    fontWeight: 300,
                    fontSize: '2.5rem',
                    lineHeight: 1,
                    letterSpacing: '-0.02em',
                    color: s.highlight ? onPrimary : primaryColor,
                  }}
                >
                  0{i + 1}
                </span>
                <div
                  className="flex h-11 w-11 items-center justify-center rounded-full"
                  style={{ backgroundColor: s.highlight ? colorWithAlpha(onPrimary, 0.16) : colorWithAlpha(primaryColor, 0.1) }}
                >
                  <s.icon size={20} color={s.highlight ? onPrimary : primaryColor} />
                </div>
              </div>
              <h3 className="mt-6 text-lg" style={{ fontFamily: headingFontStack, color: s.highlight ? onPrimary : headingInk, fontWeight: 600 }}>
                {s.title}
              </h3>
              <p className="mt-2 text-sm font-light leading-relaxed" style={{ color: s.highlight ? onPrimary : textMuted }}>
                {s.desc}
              </p>
            </div>
            {i < 3 && (
              <>
                <div
                  className="absolute top-1/2 z-10 hidden md:flex"
                  style={{ right: '-21px', transform: 'translateY(-50%)' }}
                  aria-hidden="true"
                >
                  <ArrowRight size={18} color={textSubtle} />
                </div>
                <div className="flex justify-center py-1 md:hidden" aria-hidden="true">
                  <ArrowRight size={18} color={textSubtle} className="rotate-90" />
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  </section>

  <section className="relative" style={{ borderTop: `1px solid ${colorWithAlpha(borderColor, 0.5)}` }}>
    <EdgeRail side="left" icons={[Compass, Rocket]} />
    <EdgeRail side="right" icons={[Award, TrendingUp]} />
    <div className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 sm:py-32 md:py-36">
      <div className="flex flex-col items-center gap-4">
        <span aria-hidden="true" style={{ width: 44, height: 3, backgroundColor: primaryColor }} />
        <span className="text-xs uppercase" style={{ color: textSubtle, letterSpacing: '0.24em', fontWeight: 700 }}>Get started</span>
      </div>
      <h2 className="mx-auto mt-6 max-w-2xl text-lg font-light leading-snug sm:mt-8 sm:text-5xl" style={{ fontFamily: headingFontStack, color: headingInk, letterSpacing: '-0.03em' }}>
        Start with direction.
      </h2>
      <p className="mx-auto mt-6 max-w-md text-base font-light" style={{ color: textMuted }}>
        A few minutes with Mate takes you from “I don’t know where to start” to a grounded direction and prep plan — matched against 20 founder-verified MT and consulting programs, not guesses. Matching is free, and your result is saved. New accounts receive a 7-day free trial. When you’re ready to continue training, Casemate Pro unlocks Case Pool, Case Drill, and Domain Knowledge with plans at $5 for the first month, $8 monthly, or $30 for 6 months.
      </p>
      <div className="mt-12 flex justify-center">
        <button onClick={openLogin} className="group inline-flex items-center gap-2 rounded-full px-9 py-4 text-base transition-transform hover:-translate-y-0.5 sm:whitespace-nowrap" style={{ backgroundColor: primaryColor, color: onPrimary, fontWeight: 700, boxShadow: `0 20px 50px -18px ${colorWithAlpha(primaryColor, 0.6)}` }}>
          Start your free fit assessment
          <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  </section>

  <footer style={{ borderTop: `1px solid ${colorWithAlpha(borderColor, 0.6)}`, backgroundColor: pageBackground }}>
    <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 py-12 sm:flex-row">
      <div className="flex items-center gap-3">
        <BrandMark size={24} />
        <span style={{ fontFamily: headingFontStack, color: headingInk, fontWeight: 700 }}>{brandName}</span>
      </div>
      <p className="text-sm font-light" style={{ color: textSubtle }}>Domain depth for Vietnamese MT &amp; consulting prep.</p>
      <button onClick={openLogin} className="text-sm transition-opacity hover:opacity-70" style={{ color: primaryColor, fontWeight: 600 }}>Get started</button>
    </div>
  </footer>
</div>
      {/* AUDOS:LANDING_SHELL:END */}

      {loginOpen && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center overflow-y-auto px-0 py-0 backdrop-blur-sm sm:items-center sm:px-4 sm:py-8"
          style={{ backgroundColor: colorWithAlpha(contrastColor, 0.6) }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="email-gate-login-title"
          onClick={(event) => {
            if (event.target === event.currentTarget && !loading) {
              setLoginOpen(false);
            }
          }}
        >
          <div
            className="relative max-h-[min(92dvh,720px)] w-full max-w-md overflow-hidden overflow-y-auto rounded-t-2xl [overflow-anchor:none] sm:rounded-2xl"
            style={{ backgroundColor: panelStrongColor, boxShadow: '0 30px 70px rgba(0,0,0,0.35)' }}
          >
            <button
              type="button"
              onClick={() => setLoginOpen(false)}
              disabled={loading}
              aria-label="Close login"
              className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:opacity-80 sm:top-5 sm:h-9 sm:w-9"
              style={{ backgroundColor: bgLight, color: textPrimary }}
            >
              <X size={18} strokeWidth={2.6} />
            </button>
            <div className="p-4 sm:p-8">
              <h2 id="email-gate-login-title" className="mb-1 pr-10 text-lg font-extrabold sm:text-2xl" style={{ color: textPrimary }}>
                Welcome to {brandName}
              </h2>
              {panelView === 'main' && (
                <p className="mb-4 text-xs leading-snug sm:text-sm" style={{ color: textMuted }}>
                  Enter your email and you’ll be talking with Mate in seconds — your free MT &amp; consulting fit assessment starts right away.
                </p>
              )}
              {renderLoginPanel(true)}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
