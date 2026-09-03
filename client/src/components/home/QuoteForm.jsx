import { useEffect, useMemo, useState } from 'react';
import { api } from '../../lib/api.js';
import { useApiData } from '../../lib/useApiData.js';
import { formatRupees } from '../../lib/format.js';
import { FALLBACK_CURRENCIES, FALLBACK_RATES } from '../../data/fallbackData.js';
import FormStatus from '../common/FormStatus.jsx';
const EMPTY_FORM = { amount: '', mobile: '', email: '', acceptsPolicy: false };
function generateCaptcha() {
  const a = Math.floor(Math.random() * 9) + 1;
  const b = Math.floor(Math.random() * 9) + 1;
  return { a, b, answer: a + b };
}
function normaliseMobile(raw) {
  let digits = String(raw).replace(/\D/g, '');
  if (digits.length > 10 && digits.startsWith('91')) digits = digits.slice(2);
  if (digits.length > 10 && digits.startsWith('0')) digits = digits.slice(1);
  return digits.slice(0, 10);
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim());
}

const LABEL = 'mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-brand-600';
const FIELD =
  'w-full rounded-lg border bg-white px-3 py-2.5 text-sm text-ink placeholder:text-ink-muted focus:outline-none focus:ring-2';
const FIELD_OK = 'border-brand-100 focus:border-brand-600 focus:ring-brand-600/20';
const FIELD_ERR = 'border-red-300 focus:border-red-500 focus:ring-red-500/20';

function fieldClass(hasError, extra = '') {
  return `${FIELD} ${hasError ? FIELD_ERR : FIELD_OK} ${extra}`.trim();
}

function FieldError({ children }) {
  if (!children) return null;
  return <p className="mt-1 text-xs text-red-600">{children}</p>;
}

export default function QuoteForm() {
  const [transactionType, setTransactionType] = useState('buy');
  const [productType, setProductType] = useState('currency');
  const [currencyCode, setCurrencyCode] = useState('USD');
  const [form, setForm] = useState(EMPTY_FORM);
  const [captcha, setCaptcha] = useState(generateCaptcha);
  const [captchaInput, setCaptchaInput] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState(null);

  const { data: currencies } = useApiData(
    () => api.getCurrencies().then((result) => result.currencies),
    FALLBACK_CURRENCIES,
  );

  const { data: rates } = useApiData(
    () => api.getRates(productType).then((result) => result.rates),
    FALLBACK_RATES[productType],
    [productType],
  );

  const selectedRate = useMemo(
    () => rates.find((rate) => rate.code === currencyCode) ?? null,
    [rates, currencyCode],
  );

  const appliedRate = selectedRate
    ? transactionType === 'buy'
      ? selectedRate.buyRate
      : selectedRate.sellRate
    : 0;

  const inrAmount = Number(form.amount || 0) * appliedRate;

  useEffect(() => {
    setStatus(null);
  }, [transactionType, productType, currencyCode]);

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setStatus(null);
  }

  function validate() {
    const next = {};
    const amount = Number(form.amount);

    if (!form.amount.trim()) next.amount = 'Enter an amount.';
    else if (!Number.isFinite(amount) || amount <= 0) next.amount = 'Amount must be more than zero.';

    if (form.mobile.length !== 10) next.mobile = 'Enter a 10-digit mobile number.';

    if (!form.email.trim()) next.email = 'Enter your email address.';
    else if (!isValidEmail(form.email)) next.email = 'That email address looks incomplete.';

    if (Number(captchaInput) !== captcha.answer) next.captcha = 'That answer is not right.';

    if (!form.acceptsPolicy) next.acceptsPolicy = 'Please accept the privacy policy to continue.';

    return next;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus(null);

    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setIsSubmitting(true);
    try {
      const quote = await api.submitQuote({
        transactionType,
        productType,
        currencyCode,
        amount: Number(form.amount),
        mobile: form.mobile,
        email: form.email.trim(),
      });

      setStatus({
        type: 'success',
        message: `${quote.message} Your quote: ${formatRupees(quote.inrAmount)} for ${quote.amount} ${quote.currencyCode}.`,
      });
      setForm(EMPTY_FORM);
      setCaptcha(generateCaptcha());
      setCaptchaInput('');
    } catch (error) {
      setStatus({
        type: 'error',
        message: error.message || 'Could not send your request. Try again.',
      });
      setCaptcha(generateCaptcha());
      setCaptchaInput('');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-md rounded-2xl border border-brand-100 bg-white p-5 shadow-panel sm:p-6">
      {/* Buy / Sell switch */}
      <div className="grid grid-cols-2 gap-1 rounded-xl bg-brand-50 p-1">
        {['buy', 'sell'].map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => setTransactionType(type)}
            aria-pressed={transactionType === type}
            className={`rounded-lg py-2.5 text-sm font-semibold capitalize transition-colors ${
              transactionType === type
                ? 'bg-brand-600 text-white shadow-sm'
                : 'text-ink-muted hover:text-brand-600'
            }`}
          >
            {type} Forex
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} noValidate className="mt-5 space-y-4">
        <div>
          <label htmlFor="product-type" className={LABEL}>
            Product type
          </label>
          <select
            id="product-type"
            value={productType}
            onChange={(event) => setProductType(event.target.value)}
            className={fieldClass(false)}
          >
            <option value="currency">Currency rates</option>
            <option value="travel_card">Travel card rates</option>
          </select>
        </div>

        <div>
          <label htmlFor="currency" className={LABEL}>
            Currency
          </label>
          <select
            id="currency"
            value={currencyCode}
            onChange={(event) => setCurrencyCode(event.target.value)}
            className={fieldClass(false)}
          >
            {currencies.map((currency) => (
              <option key={currency.code} value={currency.code}>
                {currency.flagEmoji} {currency.name} ({currency.code})
              </option>
            ))}
          </select>
        </div>

        {/* Amount pair — side by side at every width, as in the design */}
        <div>
          <div className="grid grid-cols-2 gap-3">
            <div className="relative">
              <label htmlFor="amount" className="sr-only">
                {currencyCode} amount
              </label>
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-xs font-semibold uppercase text-ink-muted">
                {currencyCode}
              </span>
              <input
                id="amount"
                type="text"
                inputMode="decimal"
                autoComplete="off"
                value={form.amount}
                onChange={(event) =>
                  updateField('amount', event.target.value.replace(/[^0-9.]/g, ''))
                }
                placeholder="0.00"
                aria-invalid={Boolean(errors.amount)}
                className={fieldClass(errors.amount, 'pl-14')}
              />
            </div>

            <div className="relative">
              <span className="sr-only">You pay in rupees</span>
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-ink-muted">
                ₹
              </span>
              <output className="block w-full rounded-lg border border-brand-100 bg-brand-50/60 py-2.5 pl-9 pr-3 text-sm font-semibold text-brand-700">
                {formatRupees(inrAmount)}
              </output>
            </div>
          </div>
          <FieldError>{errors.amount}</FieldError>
        </div>

        {selectedRate && (
          <p className="text-center text-xs text-ink-muted">
            Rate: 1 {currencyCode} = {formatRupees(appliedRate)} (
            {transactionType === 'buy' ? 'Buy' : 'Sell'})
          </p>
        )}

        {/* Labelled divider */}
        <div className="relative py-1 text-center">
          <span aria-hidden="true" className="absolute inset-x-0 top-1/2 h-px bg-brand-100" />
          <span className="relative bg-white px-3 text-xs text-ink-muted">Your details</span>
        </div>

        <div className="space-y-3">
          <div>
            <label htmlFor="quote-mobile" className="sr-only">
              Mobile number
            </label>
            <input
              id="quote-mobile"
              type="tel"
              inputMode="numeric"
              autoComplete="tel"
              value={form.mobile}
              onChange={(event) => updateField('mobile', normaliseMobile(event.target.value))}
              placeholder="Mobile number"
              aria-invalid={Boolean(errors.mobile)}
              className={fieldClass(errors.mobile)}
            />
            <FieldError>{errors.mobile}</FieldError>
          </div>

          <div>
            <label htmlFor="quote-email" className="sr-only">
              Email address
            </label>
            <input
              id="quote-email"
              type="email"
              autoComplete="email"
              value={form.email}
              onChange={(event) => updateField('email', event.target.value)}
              placeholder="Email address"
              aria-invalid={Boolean(errors.email)}
              className={fieldClass(errors.email)}
            />
            <FieldError>{errors.email}</FieldError>
          </div>

          {/* Math check — lightweight bot-block, no external service or keys */}
          <div>
            <label htmlFor="captcha" className="sr-only">
              What is {captcha.a} + {captcha.b}?
            </label>
            <input
              id="captcha"
              type="text"
              inputMode="numeric"
              autoComplete="off"
              value={captchaInput}
              onChange={(event) => {
                setCaptchaInput(event.target.value.replace(/\D/g, ''));
                setErrors((current) => ({ ...current, captcha: undefined }));
              }}
              placeholder={`Quick check: what is ${captcha.a} + ${captcha.b}?`}
              aria-invalid={Boolean(errors.captcha)}
              className={fieldClass(errors.captcha)}
            />
            <FieldError>{errors.captcha}</FieldError>
          </div>
        </div>

        <div>
          <label className="flex items-start gap-2 text-xs text-ink-muted">
            <input
              type="checkbox"
              checked={form.acceptsPolicy}
              onChange={(event) => updateField('acceptsPolicy', event.target.checked)}
              className="mt-0.5 h-4 w-4 shrink-0 rounded border-brand-200 text-brand-600 focus:ring-brand-600"
            />
            <span>
              I accept the{' '}
              <a href="/privacy-policy" className="font-medium text-brand-600 underline">
                Privacy Policy
              </a>
            </span>
          </label>
          <FieldError>{errors.acceptsPolicy}</FieldError>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-lg bg-brand-600 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? 'Sending…' : 'Get quote'}
        </button>

        <p className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-[11px] text-ink-muted">
          <span className="text-emerald-600">✓ No hidden charges</span>
          <span aria-hidden="true">·</span>
          <span className="text-emerald-600">✓ Rate held for 30 mins</span>
        </p>
      </form>

      <FormStatus type={status?.type} message={status?.message} />
    </div>
  );
}