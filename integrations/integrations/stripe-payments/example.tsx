import { useState, useEffect } from 'react';

interface PaymentPlan {
  id: string;
  name: string;
  priceCents: number;
  // Base billing unit. The real cadence is `interval` × `intervalCount`,
  // so don't assume only monthly/annual — see below.
  interval: 'month' | 'year' | 'week' | 'day';
  // Multiplier on `interval`. 1 = monthly/annual, 3 = quarterly,
  // 6 = semiannual (every 6 months), 'week'×2 = every 2 weeks.
  // Stripe caps a cycle at one year (max month×12 or year×1).
  // The PlanSelector below renders "per N months" whenever this is > 1.
  // Example semiannual plan:
  //   { id: 'semi', name: '6-Month Plan', priceCents: 6000,
  //     interval: 'month', intervalCount: 6, effectiveMonthlyRate: 10 }
  intervalCount: number;
  effectiveMonthlyRate: number;
  introPriceCents?: number;
  introInterval?: 'month' | 'year' | 'week' | 'day';
  introIntervalCount?: number;
  introIterations?: number;
  regularPriceCents?: number;
  regularInterval?: 'month' | 'year' | 'week' | 'day';
  regularIntervalCount?: number;
  hasIntroPricing?: boolean;
  trialDays?: number;
}

interface PaymentConfig {
  enabled: boolean;
  mode: 'platform' | 'connect';
  defaultTrialDays: number;
  defaultPriceCents: number;
  defaultInterval: 'month' | 'year' | 'week' | 'day';
  businessName: string;
  plans?: PaymentPlan[];
}

function getPaymentAppId() {
  const runtimeWindow = window as Window & {
    __APP_ID__?: string;
    __SPACE_ID__?: string;
  };
  return runtimeWindow.__APP_ID__ || runtimeWindow.__SPACE_ID__;
}

function getPaymentHeaders() {
  const appId = getPaymentAppId();
  return appId
    ? { 'Content-Type': 'application/json', 'X-App-Id': appId }
    : { 'Content-Type': 'application/json' };
}

const stripePayments = {
  config: null as PaymentConfig | null,

  async loadConfig(): Promise<PaymentConfig | null> {
    if (this.config) return this.config;
    
    try {
      const response = await fetch('/api/space-data/payment-config.json');
      if (response.ok) {
        this.config = await response.json();
      }
    } catch (e) {
      console.warn('Payment config not found');
    }
    return this.config;
  },

  async isEnabled(): Promise<boolean> {
    const config = await this.loadConfig();
    return config?.enabled === true;
  },

  async createSubscription(options: {
    priceCents?: number;
    trialDays?: number;
    interval?: 'month' | 'year' | 'week' | 'day';
    intervalCount?: number;
    priceId?: string;
    promoCode?: string;
    successUrl?: string;
    cancelUrl?: string;
    customerEmail?: string;
    metadata?: Record<string, string>;
    currency?: string;
    introPriceCents?: number;
    introInterval?: string;
    introIntervalCount?: number;
    introIterations?: number;
    regularPriceCents?: number;
    regularInterval?: string;
    regularIntervalCount?: number;
    billingPlanId?: string;
    billingPlanName?: string;
  } = {}) {
    const response = await fetch('/api/payments/subscribe', {
      method: 'POST',
      headers: getPaymentHeaders(),
      body: JSON.stringify({
        priceCents: options.priceCents,
        trialDays: options.trialDays,
        interval: options.interval,
        intervalCount: options.intervalCount,
        priceId: options.priceId,
        promoCode: options.promoCode,
        successUrl: options.successUrl || window.location.origin + '/success?session_id={CHECKOUT_SESSION_ID}',
        cancelUrl: options.cancelUrl || window.location.href,
        customerEmail: options.customerEmail,
        metadata: options.metadata,
        currency: options.currency,
        introPriceCents: options.introPriceCents,
        introInterval: options.introInterval,
        introIntervalCount: options.introIntervalCount,
        introIterations: options.introIterations,
        regularPriceCents: options.regularPriceCents,
        regularInterval: options.regularInterval,
        regularIntervalCount: options.regularIntervalCount,
        billingPlanId: options.billingPlanId,
        billingPlanName: options.billingPlanName,
      })
    });
    return response.json();
  },

  async createSubscriptionFromPlan(plan: PaymentPlan, options: {
    successUrl?: string;
    cancelUrl?: string;
    customerEmail?: string;
    metadata?: Record<string, string>;
    currency?: string;
  } = {}) {
    if (plan.hasIntroPricing) {
      return this.createSubscription({
        introPriceCents: plan.introPriceCents,
        introInterval: plan.introInterval,
        introIntervalCount: plan.introIntervalCount,
        introIterations: plan.introIterations,
        regularPriceCents: plan.regularPriceCents,
        regularInterval: plan.regularInterval,
        regularIntervalCount: plan.regularIntervalCount,
        billingPlanId: plan.id,
        billingPlanName: plan.name,
        ...options,
      });
    }
    return this.createSubscription({
      priceCents: plan.priceCents,
      interval: plan.interval,
      intervalCount: plan.intervalCount,
      trialDays: plan.trialDays ?? 0,
      billingPlanId: plan.id,
      billingPlanName: plan.name,
      ...options,
    });
  },

  async createCheckout(options: {
    amount: number;
    productName?: string;
    productDescription?: string;
    currency?: string;
    successUrl?: string;
    cancelUrl?: string;
    customerEmail?: string;
    metadata?: Record<string, string>;
  }) {
    const response = await fetch('/api/payments/checkout', {
      method: 'POST',
      headers: getPaymentHeaders(),
      body: JSON.stringify({
        amount: options.amount,
        productName: options.productName,
        productDescription: options.productDescription,
        currency: options.currency || 'usd',
        successUrl: options.successUrl || window.location.origin + '/success?session_id={CHECKOUT_SESSION_ID}',
        cancelUrl: options.cancelUrl || window.location.href,
        customerEmail: options.customerEmail,
        metadata: options.metadata
      })
    });
    return response.json();
  },

  async getPaymentStatus(sessionId: string) {
    const response = await fetch(`/api/payments/status/${sessionId}`);
    return response.json();
  },

  redirectToCheckout(checkoutUrl: string) {
    try {
      if (window.top && window.top !== window) {
        window.top.location.href = checkoutUrl;
        return;
      }
    } catch (_) { /* cross-origin iframe — fall back */ }
    window.location.href = checkoutUrl;
  }
};

function SubscribeButton({ 
  email,
  onSuccess 
}: { 
  email?: string;
  onSuccess?: () => void;
}) {
  const [loading, setLoading] = useState(false);
  const [config, setConfig] = useState<PaymentConfig | null>(null);

  useEffect(() => {
    stripePayments.loadConfig().then(setConfig);
  }, []);

  const handleSubscribe = async () => {
    setLoading(true);
    try {
      const { checkoutUrl, success, error } = await stripePayments.createSubscription({
        customerEmail: email,
        successUrl: `${window.location.origin}/welcome?session_id={CHECKOUT_SESSION_ID}`,
        cancelUrl: window.location.href
      });
      
      if (success && checkoutUrl) {
        onSuccess?.();
        stripePayments.redirectToCheckout(checkoutUrl);
      } else {
        console.error('Subscription error:', error);
      }
    } catch (error) {
      console.error('Failed to create subscription:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!config?.enabled) {
    return null;
  }

  const priceFormatted = (config.defaultPriceCents / 100).toFixed(
    config.defaultPriceCents % 100 === 0 ? 0 : 2
  );

  return (
    <div className="text-center">
      <button
        onClick={handleSubscribe}
        disabled={loading}
        className="px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-lg font-semibold rounded-xl hover:from-purple-700 hover:to-indigo-700 disabled:opacity-50 transition-all shadow-lg"
      >
        {loading ? 'Starting...' : `Start ${config.defaultTrialDays}-Day Free Trial`}
      </button>
      <p className="mt-3 text-sm text-gray-500">
        Then ${priceFormatted}/month. Cancel anytime.
      </p>
    </div>
  );
}

function PaymentButton({ 
  amount, 
  productName, 
  productDescription,
  onSuccess,
  onError 
}: {
  amount: number;
  productName: string;
  productDescription?: string;
  onSuccess?: (sessionId: string) => void;
  onError?: (error: Error) => void;
}) {
  const [loading, setLoading] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    stripePayments.isEnabled().then(setEnabled);
  }, []);

  const handlePayment = async () => {
    setLoading(true);
    try {
      const { checkoutUrl, sessionId, success, error } = await stripePayments.createCheckout({
        amount,
        productName,
        productDescription,
        successUrl: `${window.location.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancelUrl: window.location.href
      });
      
      if (success && checkoutUrl) {
        onSuccess?.(sessionId);
        stripePayments.redirectToCheckout(checkoutUrl);
      } else {
        throw new Error(error || 'Checkout failed');
      }
    } catch (error) {
      onError?.(error as Error);
      console.error('Payment failed:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!enabled) {
    return null;
  }

  return (
    <button
      onClick={handlePayment}
      disabled={loading}
      className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-indigo-700 disabled:opacity-50 transition-all"
    >
      {loading ? 'Processing...' : `Pay $${(amount / 100).toFixed(2)}`}
    </button>
  );
}

function PaymentSuccess() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [details, setDetails] = useState<any>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sessionId = params.get('session_id') || params.get('session');
    
    if (sessionId) {
      stripePayments.getPaymentStatus(sessionId)
        .then((data) => {
          setDetails(data);
          setStatus(data.status === 'complete' ? 'success' : 'error');
        })
        .catch(() => setStatus('error'));
    } else {
      setStatus('success');
    }
  }, []);

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      {status === 'success' ? (
        <>
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold mb-2">Payment Successful!</h1>
          <p className="text-gray-600 mb-6">Thank you for your purchase.</p>
          {details?.amountTotal && (
            <p className="text-lg font-medium">
              Amount: ${(details.amountTotal / 100).toFixed(2)} {details.currency?.toUpperCase()}
            </p>
          )}
        </>
      ) : (
        <>
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold mb-2">Payment Failed</h1>
          <p className="text-gray-600">Something went wrong. Please try again.</p>
        </>
      )}
    </div>
  );
}

function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <div className="max-w-4xl mx-auto py-20 px-4 text-center">
        <h1 className="text-5xl font-bold mb-6 text-gray-900">
          Start Your Journey Today
        </h1>
        <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
          Get full access to all features with a free trial. 
          No credit card required to start.
        </p>
        
        <SubscribeButton />

        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="p-6 bg-white rounded-xl shadow-sm">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="font-semibold mb-2">Quick Setup</h3>
            <p className="text-gray-500 text-sm">Get started in minutes with our easy onboarding</p>
          </div>
          
          <div className="p-6 bg-white rounded-xl shadow-sm">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-semibold mb-2">Cancel Anytime</h3>
            <p className="text-gray-500 text-sm">No long-term commitment required</p>
          </div>
          
          <div className="p-6 bg-white rounded-xl shadow-sm">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="font-semibold mb-2">Secure Payments</h3>
            <p className="text-gray-500 text-sm">Powered by Stripe for safe transactions</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function PlanSelector({
  email,
  onSuccess
}: {
  email?: string;
  onSuccess?: () => void;
}) {
  const [loading, setLoading] = useState<string | null>(null);
  const [config, setConfig] = useState<PaymentConfig | null>(null);

  useEffect(() => {
    stripePayments.loadConfig().then(setConfig);
  }, []);

  if (!config?.enabled || !config.plans?.length) {
    return null;
  }

  const handleSelect = async (plan: PaymentPlan) => {
    setLoading(plan.id);
    try {
      const { checkoutUrl, success, error } = await stripePayments.createSubscriptionFromPlan(plan, {
        customerEmail: email,
        successUrl: `${window.location.origin}/welcome?session_id={CHECKOUT_SESSION_ID}`,
        cancelUrl: window.location.href,
      });

      if (success && checkoutUrl) {
        onSuccess?.();
        stripePayments.redirectToCheckout(checkoutUrl);
      } else {
        console.error('Subscription error:', error);
      }
    } catch (error) {
      console.error('Failed to create subscription:', error);
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${config.plans.length}, 1fr)` }}>
      {config.plans.map((plan) => (
        <div key={plan.id} className="border rounded-xl p-6 text-center">
          <h3 className="text-lg font-semibold mb-2">{plan.name}</h3>
          <div className="text-3xl font-bold mb-1">
            ${(plan.priceCents / 100).toFixed(plan.priceCents % 100 === 0 ? 0 : 2)}
          </div>
          <div className="text-sm text-gray-500 mb-1">
            {plan.intervalCount > 1 ? `per ${plan.intervalCount} ${plan.interval}s` : `per ${plan.interval}`}
          </div>
          <div className="text-xs text-gray-400 mb-4">
            ${plan.effectiveMonthlyRate.toFixed(2)}/mo
          </div>
          {plan.hasIntroPricing && plan.regularPriceCents && (
            <div className="text-xs text-gray-500 mb-4">
              Then ${(plan.regularPriceCents / 100).toFixed(0)}/{plan.regularInterval}
            </div>
          )}
          <button
            onClick={() => handleSelect(plan)}
            disabled={loading !== null}
            className="w-full px-4 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-indigo-700 disabled:opacity-50 transition-all"
          >
            {loading === plan.id ? 'Starting...' : 'Get Started'}
          </button>
        </div>
      ))}
    </div>
  );
}

export { SubscribeButton, PaymentButton, PaymentSuccess, LandingPage, PlanSelector, stripePayments };
