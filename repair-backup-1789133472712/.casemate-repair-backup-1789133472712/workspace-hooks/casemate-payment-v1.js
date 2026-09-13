const body = request.body || {};
const sessionId = String(request.headers['x-session-id'] || request.headers['X-Session-Id'] || body.sessionId || '');
const checkoutSessionId = String(body.checkoutSessionId || body.checkout_session_id || '');
const requestedPlanId = String(body.planId || body.plan_id || '');
const SPACE_ID = 'workspace-539150';
const WORKSPACE_ID = 'c6ce26d1-7466-4b72-962d-b7bf7a471c88';
const PLANS = {
  first_month_5: { amounts: { usd: 500, vnd: 105000 }, days: 30, mode: 'subscription', amountVnd: 105000, canonicalId: 'first_month_5' },
  monthly_8: { amounts: { usd: 800, vnd: 168000 }, days: 30, mode: 'subscription', amountVnd: 168000, canonicalId: 'monthly_8' },
  six_month_30: { amounts: { usd: 3000, vnd: 630000 }, days: 180, mode: 'subscription', amountVnd: 630000, canonicalId: 'six_month_30' },
};
const PLAN_ALIASES = {
  price_monthly_promo: 'first_month_5',
  promo_monthly: 'first_month_5',
  'promo-monthly': 'first_month_5',
  price_monthly: 'monthly_8',
  monthly: 'monthly_8',
  price_6month: 'six_month_30',
  price_six_month: 'six_month_30',
  six_month: 'six_month_30',
  'six-month': 'six_month_30',
};
function resolvePlan(value) {
  const incoming = String(value || '').trim();
  return PLANS[PLAN_ALIASES[incoming] || incoming] || null;
}
function normalizeBillingPlanId(value) {
  const plan = resolvePlan(value);
  return plan ? plan.canonicalId : null;
}

function normalizeEmail(value) {
  const email = String(value || '').trim().toLowerCase();
  return email.indexOf('@') > 0 ? email : '';
}
function orderCode(value) {
  let hash = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return Math.abs(hash || 1);
}
async function jsonFetch(url, options) {
  const response = await fetch(url, options);
  let payload = {};
  try { payload = await response.json(); } catch (error) { payload = {}; }
  return { ok: response.ok, status: response.status, body: payload };
}
async function verifiedSessionEmail(fallbackEmail) {
  const otp = await jsonFetch('https://audos.com/api/auth/otp/space/check-session?workspaceId=' + encodeURIComponent(WORKSPACE_ID) + '&sessionUuid=' + encodeURIComponent(sessionId));
  if (otp.ok && otp.body.verified) return normalizeEmail(otp.body.email);
  const legacy = await jsonFetch('https://audos.com/api/space/' + SPACE_ID + '/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: fallbackEmail, sessionId: sessionId }),
  });
  const returnedSession = String(legacy.body.workspaceSessionId || legacy.body.sessionId || '');
  return legacy.ok && returnedSession === sessionId ? normalizeEmail(fallbackEmail) : '';
}
async function applyConfirmedEntitlement(planId, plan, expiresAt) {
  const existingResult = await db.query('pro_subscriptions', { where: { user_id: sessionId }, limit: 1 });
  const existing = existingResult.rows && existingResult.rows[0] ? existingResult.rows[0] : null;
  const nowIso = new Date().toISOString();
  const record = {
    user_id: sessionId,
    activated_at: existing && existing.activated_at ? existing.activated_at : nowIso,
    expires_at: expiresAt,
    payment_method: 'native',
    order_code: orderCode(checkoutSessionId),
    session_id: sessionId,
    updated_at: nowIso,
    last_payment_code: checkoutSessionId,
    plan: planId,
    amount_vnd: plan.amountVnd,
  };
  if (existing) await db.update('pro_subscriptions', { id: existing.id }, record);
  else await db.insert('pro_subscriptions', record);
}

if (String(body.action || '') !== 'confirm_checkout') {
  respond(400, { success: false, code: 'unknown_action', error: 'Unknown payment action.' });
} else if (!sessionId || !checkoutSessionId || !requestedPlanId) {
  respond(400, { success: false, code: 'missing_identity', error: 'A signed-in session, checkout session, and plan are required.' });
} else {
  try {
    const priorResult = await db.query('payment_confirmations', { where: { checkout_session_id: checkoutSessionId }, limit: 1 });
    const prior = priorResult.rows && priorResult.rows[0] ? priorResult.rows[0] : null;
    if (prior) {
      if (String(prior.user_id || '') !== sessionId) {
        respond(403, { success: false, code: 'payment_identity_mismatch', error: 'This payment does not belong to the signed-in account.' });
      } else {
        const priorPlan = resolvePlan(prior.plan);
        if (!priorPlan) {
          respond(200, { success: false, code: 'payment_plan_unavailable', error: 'Please choose one of the current Casemate Pro options.' });
        } else {
          await applyConfirmedEntitlement(priorPlan.canonicalId, priorPlan, new Date(prior.entitlement_expires_at).toISOString());
          respond(200, { success: true, alreadyConfirmed: true, planId: priorPlan.canonicalId, expiresAt: prior.entitlement_expires_at });
        }
      }
    } else {
      const statusResult = await jsonFetch('https://audos.com/api/payments/status/' + encodeURIComponent(checkoutSessionId), {
        headers: { 'X-App-Id': SPACE_ID },
      });
      const payment = statusResult.body || {};
      const paymentStatus = String(payment.paymentStatus || payment.payment_status || '').toLowerCase();
      const paid = statusResult.ok && String(payment.status || '').toLowerCase() === 'complete' && (!paymentStatus || paymentStatus === 'paid');
      if (!paid) {
        respond(409, { success: false, code: 'payment_pending', error: 'Payment is still being confirmed. Please try again in a moment.' });
      } else {
        const paymentEmail = normalizeEmail(payment.customerEmail || payment.customer_email);
        const verifiedEmail = await verifiedSessionEmail(paymentEmail);
        if (!paymentEmail || !verifiedEmail || paymentEmail !== verifiedEmail) {
          respond(403, { success: false, code: 'payment_identity_mismatch', error: 'This payment does not belong to the signed-in account.' });
        } else {
          const amount = Number(payment.amountTotal || payment.amount_total || 0);
          const currency = String(payment.currency || '').toLowerCase();
          const mode = String(payment.mode || '').toLowerCase();
          const plan = resolvePlan(requestedPlanId);
          const paymentMetadata = payment.metadata || {};
          const metadataPlan = String(paymentMetadata.planId || paymentMetadata.billingPlanId || '');
          const normalizedMetadataPlan = normalizeBillingPlanId(metadataPlan);
          const expectedAmount = plan && plan.amounts ? Number(plan.amounts[currency]) : NaN;
          if (!plan || !Number.isFinite(expectedAmount) || amount !== expectedAmount || mode !== plan.mode || (metadataPlan && normalizedMetadataPlan !== plan.canonicalId)) {
            respond(400, { success: false, code: 'payment_plan_mismatch', error: 'The completed payment does not match a current Casemate Pro plan.' });
          } else {
            const currentResult = await db.query('pro_subscriptions', { where: { user_id: sessionId }, limit: 1 });
            const current = currentResult.rows && currentResult.rows[0] ? currentResult.rows[0] : null;
            const now = Date.now();
            const currentExpiry = current ? Date.parse(current.expires_at || '') : NaN;
            const startsAt = Number.isFinite(currentExpiry) && currentExpiry > now ? currentExpiry : now;
            const expiresAt = new Date(startsAt + plan.days * 86400000).toISOString();
            await db.insert('payment_confirmations', {
              checkout_session_id: checkoutSessionId,
              user_id: sessionId,
              plan: plan.canonicalId,
              amount_cents: amount,
              currency: currency,
              confirmed_at: new Date(now).toISOString(),
              entitlement_expires_at: expiresAt,
              session_id: sessionId,
            });
            await applyConfirmedEntitlement(plan.canonicalId, plan, expiresAt);
            respond(200, { success: true, planId: plan.canonicalId, expiresAt: expiresAt, email: verifiedEmail });
          }
        }
      }
    }
  } catch (error) {
    console.error('Casemate payment confirmation failed', error);
    respond(503, { success: false, code: 'payment_confirmation_unavailable', error: 'Payment confirmation is temporarily unavailable. Please try again.' });
  }
}