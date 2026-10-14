import { useCallback, useEffect, useRef, useState } from 'react';
import { CheckCircle2, ExternalLink, Loader2, QrCode, RefreshCw, TriangleAlert, X } from 'lucide-react';
import QRCode from 'https://esm.sh/qrcode@1.5.4';
import { checkCasematePayosPayment, CasematePayosOrder, startCasematePayosPayment } from '../lib/casemateCheckout';
import { formatVnd, PricingPlan } from '../lib/pricing';

type PaymentState = 'idle' | 'loading' | 'pending' | 'paid' | 'cancelled' | 'error';

interface PayosQrPaymentProps {
  sessionId: string;
  userEmail: string;
  disabled?: boolean;
  source: string;
  buyerName: string;
  plan: PricingPlan;
  triggerLabel?: string;
  triggerDescription?: string;
  onSuccess?: () => void | Promise<void>;
  onSwitchToCard?: () => void;
}

function qrImageSource(value: string) {
  if (/^(data:image\/|https:\/\/)/i.test(value)) return Promise.resolve(value);
  return QRCode.toDataURL(value, {
    width: 320,
    margin: 2,
    errorCorrectionLevel: 'M',
    color: { dark: '#111827', light: '#FFFFFF' },
  });
}

export default function PayosQrPayment({ sessionId, userEmail, disabled, source, buyerName, plan, triggerLabel, triggerDescription, onSuccess, onSwitchToCard }: PayosQrPaymentProps) {
  const selectedPlan = plan;
  const [open, setOpen] = useState(false);
  const [state, setState] = useState<PaymentState>('idle');
  const [order, setOrder] = useState<CasematePayosOrder | null>(null);
  const [qrImage, setQrImage] = useState('');
  const [error, setError] = useState('');
  const successHandled = useRef(false);

  const createPayment = useCallback(async () => {
    setState('loading');
    setError('');
    setOrder(null);
    setQrImage('');
    successHandled.current = false;
    try {
      const nextOrder = await startCasematePayosPayment(sessionId, userEmail, selectedPlan.id, buyerName);
      const image = await qrImageSource(nextOrder.qrCode || nextOrder.checkoutUrl);
      setOrder(nextOrder);
      setQrImage(image);
      setState('pending');
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'Không thể tạo mã QR PayOS lúc này. Vui lòng thử lại.');
      setState('error');
    }
  }, [buyerName, selectedPlan.id, sessionId, userEmail]);

  const showPayment = () => {
    setOpen(true);
    void createPayment();
  };

  useEffect(() => {
    if (!open || state !== 'pending' || !order?.orderCode) return;
    let cancelled = false;
    let checking = false;
    const checkStatus = async () => {
      if (checking || cancelled) return;
      checking = true;
      try {
        const result = await checkCasematePayosPayment(sessionId, userEmail, order.orderCode);
        if (cancelled) return;
        if (result.status === 'paid') {
          setState('paid');
          if (!successHandled.current) {
            successHandled.current = true;
            await new Promise((resolve) => window.setTimeout(resolve, 1200));
            await onSuccess?.();
          }
        } else if (result.status === 'cancelled') {
          setState('cancelled');
        }
      } catch (reason) {
        if (!cancelled) setError(reason instanceof Error ? reason.message : 'Chưa thể kiểm tra trạng thái thanh toán.');
      } finally {
        checking = false;
      }
    };
    void checkStatus();
    const timer = window.setInterval(() => void checkStatus(), 3000);
    const timeout = window.setTimeout(() => {
      cancelled = true;
      window.clearInterval(timer);
      setError('Payment was not confirmed within 10 minutes. Create a new QR code to try again.');
      setState('error');
    }, 10 * 60 * 1000);
    return () => {
      cancelled = true;
      window.clearInterval(timer);
      window.clearTimeout(timeout);
    };
  }, [onSuccess, open, order?.orderCode, sessionId, state, userEmail]);

  return (
    <>
      <button
        type="button"
        onClick={showPayment}
        disabled={disabled || !sessionId || !userEmail}
        data-payment-source={source}
        className={triggerDescription
          ? 'flex min-h-[76px] w-full items-center gap-3 rounded-2xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-4 text-left transition hover:border-[var(--space-brand-primary-500)] hover:bg-[var(--space-surface-accent-soft)] disabled:cursor-not-allowed disabled:opacity-50'
          : 'flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-[var(--space-brand-primary-500)] bg-[var(--space-surface-card)] px-4 py-3 text-sm font-bold text-[var(--space-text-brand)] transition-colors hover:bg-[var(--space-surface-accent-soft)] disabled:cursor-not-allowed disabled:opacity-50'}
      >
        {triggerDescription ? (
          <>
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--space-surface-accent-soft)]"><QrCode className="h-5 w-5 text-[var(--space-text-brand)]" /></span>
            <span className="min-w-0 flex-1"><span className="block text-sm font-extrabold text-[var(--space-text-primary)]">{triggerLabel || 'Quét mã QR (PayOS)'}</span><span className="mt-0.5 block text-xs text-[var(--space-text-secondary)]">{triggerDescription}</span></span>
          </>
        ) : (
          <><QrCode className="h-4 w-4" />{triggerLabel || 'QR Code / Chuyển khoản ngân hàng'}</>
        )}
      </button>

      {open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[color-mix(in_srgb,var(--space-neutral-950)_55%,transparent)] p-4 backdrop-blur-sm" role="presentation">
          <section role="dialog" aria-modal="true" aria-labelledby="payos-title" className="relative max-h-[92vh] w-full max-w-md overflow-y-auto rounded-3xl border border-[var(--space-border-default)] bg-[var(--space-surface-card)] p-5 shadow-2xl sm:p-6">
            <button type="button" onClick={() => setOpen(false)} aria-label="Close PayOS payment" className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full text-[var(--space-text-muted)] hover:bg-[var(--space-surface-muted)]"><X className="h-4 w-4" /></button>
            <div className="pr-10">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--space-text-brand)]">Thanh toán bảo mật qua PayOS</p>
              <h2 id="payos-title" className="mt-1 text-xl font-extrabold text-[var(--space-text-primary)]">Casemate Pro · {selectedPlan.title}</h2>
              <p className="mt-1 text-sm text-[var(--space-text-secondary)]">{formatVnd(order?.amount || selectedPlan.vnd)} · {order?.days || selectedPlan.days} ngày Pro</p>
            </div>

            {state === 'loading' && (
              <div className="flex min-h-72 flex-col items-center justify-center text-center">
                <Loader2 className="h-8 w-8 animate-spin text-[var(--space-text-brand)]" />
                <p className="mt-3 text-sm font-semibold text-[var(--space-text-primary)]">Đang tạo mã QR PayOS…</p>
              </div>
            )}

            {state === 'pending' && order && (
              <div className="mt-5 text-center">
                <div className="mx-auto w-fit rounded-2xl border border-[var(--space-border-default)] bg-white p-3 shadow-sm">
                  {qrImage ? <img src={qrImage} alt={`PayOS QR code for order ${order.orderCode}`} className="h-64 w-64 max-w-full" /> : <Loader2 className="m-24 h-8 w-8 animate-spin text-[var(--space-text-brand)]" />}
                </div>
                <p className="mt-4 font-bold text-[var(--space-text-primary)]">Scan with MB Bank, VCB, Techcombank, or any Vietnamese banking app</p>
                <p className="mt-1 text-sm text-[var(--space-text-secondary)]">Open your banking app, scan the QR code, and confirm the transfer.</p>
                <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-[color-mix(in_srgb,var(--space-semantic-warning-500)_12%,transparent)] px-3 py-1.5 text-xs font-bold text-[var(--space-text-primary)]"><Loader2 className="h-3.5 w-3.5 animate-spin text-[var(--space-semantic-warning)]" />Waiting for payment…</div>
                <p className="mt-3 text-xs text-[var(--space-text-muted)]">Mã đơn: {order.orderCode}</p>
                {error && <p className="mt-3 text-xs font-semibold text-[var(--space-semantic-warning)]">{error} Casemate vẫn sẽ tiếp tục kiểm tra.</p>}
                {order.checkoutUrl && <a href={order.checkoutUrl} target="_blank" rel="noreferrer" className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-xl bg-[var(--space-brand-primary-600)] px-4 py-3 text-sm font-bold text-[var(--space-text-on-primary)]">Open in banking app <ExternalLink className="h-3.5 w-3.5" /></a>}
              </div>
            )}

            {state === 'paid' && (
              <div className="flex min-h-72 flex-col items-center justify-center text-center">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[color-mix(in_srgb,var(--space-semantic-success-500)_12%,transparent)]"><CheckCircle2 className="h-8 w-8 text-[var(--space-semantic-success)]" /></span>
                <h3 className="mt-4 text-xl font-extrabold text-[var(--space-text-primary)]">Thanh toán thành công</h3>
                <p className="mt-2 text-sm leading-6 text-[var(--space-text-secondary)]">Casemate Pro đã được kích hoạt. Bạn có thể quay lại ứng dụng ngay.</p>
                <button type="button" onClick={() => setOpen(false)} className="mt-5 min-h-11 rounded-xl bg-[var(--space-brand-primary-600)] px-5 py-3 text-sm font-bold text-[var(--space-text-on-primary)]">Quay lại Casemate</button>
              </div>
            )}

            {(state === 'cancelled' || state === 'error') && (
              <div className="flex min-h-72 flex-col items-center justify-center text-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[color-mix(in_srgb,var(--space-semantic-warning-500)_12%,transparent)]"><TriangleAlert className="h-7 w-7 text-[var(--space-semantic-warning)]" /></span>
                <h3 className="mt-4 text-lg font-extrabold text-[var(--space-text-primary)]">{state === 'cancelled' ? 'Thanh toán đã bị huỷ' : 'PayOS QR needs another try'}</h3>
                <p className="mt-2 text-sm leading-6 text-[var(--space-text-secondary)]">{error || 'Chưa có khoản thanh toán nào được ghi nhận. Bạn có thể tạo mã QR mới hoặc chuyển sang thanh toán bằng thẻ.'}</p>
                <div className="mt-5 grid w-full gap-2 sm:grid-cols-2">
                  <button type="button" onClick={() => void createPayment()} className="flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[var(--space-brand-primary-600)] px-4 py-3 text-sm font-bold text-[var(--space-text-on-primary)]"><RefreshCw className="h-4 w-4" />Thử lại</button>
                  <button type="button" onClick={() => { setOpen(false); onSwitchToCard?.(); }} className="min-h-11 rounded-xl border border-[var(--space-border-default)] px-4 py-3 text-sm font-bold text-[var(--space-text-secondary)]">Thanh toán bằng thẻ</button>
                </div>
              </div>
            )}
          </section>
        </div>
      )}
    </>
  );
}
