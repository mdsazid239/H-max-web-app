import { useEffect, useMemo, useState } from 'react';
import { api } from '../../lib/api.js';
import { useApiData } from '../../lib/useApiData.js';
import { formatRupees } from '../../lib/format.js';
import { FALLBACK_CURRENCIES, FALLBACK_RATES } from '../../data/fallbackData.js';
import FormStatus from '../common/FormStatus.jsx';

const EMPTY_FORM = { amount: '', mobile: '', email: '', acceptsPolicy: false };

/**
 * Rate calculator and lead form from the hero panel.
 *
 * The amount is converted in the browser for instant feedback, but the
 * server re-prices the request against the live rate before saving it.
 */
export default function QuoteForm() {
  const [transactionType, setTransactionType] = useState('buy');
  const [productType, setProductType] = useState('currency');
  const [currencyCode, setCurrencyCode] = useState('USD');
  const [form, setForm] = useState(EMPTY_FORM);
  const [status, setStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  // Clear any previous result when the customer changes the inputs.
  useEffect(() => {
    setStatus(null);
  }, [transactionType, productType, currencyCode]);

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus(null);

    if (!form.acceptsPolicy) {
      setStatus({ type: 'error', message: 'Please accept the privacy policy to continue.' });
      return;
    }

    setIsSubmitting(true);

    try {
      const quote = await api.submitQuote({
        transactionType,
        productType,
        currencyCode,
        amount: Number(form.amount),
        mobile: form.mobile,
        email: form.email,
      });

      setStatus({
        type: 'success',
        message: `${quote.message} Your quote: ${formatRupees(quote.inrAmount)} for ${
          quote.amount
        } ${quote.currencyCode}.`,
      });
      setForm(EMPTY_FORM);
    } catch (error) {
      setStatus({ type: 'error', message: error.message });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="w-full rounded-xl border border-brand-100 bg-white p-5 shadow-panel sm:p-6">
      {/* Buy / sell switch */}
      <div className="grid grid-cols-2 gap-1 rounded-lg bg-brand-50 p-1">
        {['buy', 'sell'].map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => setTransactionType(type)}
            aria-pressed={transactionType === type}
            className={`rounded-md py-2 text-sm font-semibold capitalize transition-colors ${
              transactionType === type
                ? 'bg-brand-600 text-white'
                : 'text-ink-muted hover:text-brand-600'
            }`}
          >
            {type} Forex
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="mt-5 space-y-4">
        <div>
          <label htmlFor="product-type" className="field-label">
            Product type
          </label>
          <select
            id="product-type"
            value={productType}
            onChange={(event) => setProductType(event.target.value)}
            className="field-input"
          >
            <option value="currency">Currency rates</option>
            <option value="travel_card">Travel card rates</option>
          </select>
        </div>

        <div>
          <label htmlFor="currency" className="field-label">
            Currency
          </label>
          <select
            id="currency"
            value={currencyCode}
            onChange={(event) => setCurrencyCode(event.target.value)}
            className="field-input"
          >
            {currencies.map((currency) => (
              <option key={currency.code} value={currency.code}>
                {currency.flagEmoji} {currency.name} ({currency.code})
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="amount" className="field-label">
              {currencyCode} amount
            </label>
            <input
              id="amount"
              type="number"
              min="1"
              step="any"
              inputMode="decimal"
              required
              value={form.amount}
              onChange={(event) => updateField('amount', event.target.value)}
              placeholder="0.00"
              className="field-input"
            />
          </div>

          <div>
            <span className="field-label">You pay (INR)</span>
            <output className="field-input block bg-brand-50/60 font-semibold text-brand-700">
              {formatRupees(inrAmount)}
            </output>
          </div>
        </div>

        {selectedRate && (
          <p className="text-xs text-ink-muted">
            Rate: 1 {currencyCode} = {formatRupees(appliedRate)} (
            {transactionType === 'buy' ? 'Buy' : 'Sell'})
          </p>
        )}

        <div className="border-t border-brand-50 pt-4">
          <p className="mb-3 text-xs font-semibold tracking-wide text-ink-muted">Your details</p>

          <div className="space-y-3">
            <div>
              <label htmlFor="quote-mobile" className="sr-only">
                Mobile number
              </label>
              <input
                id="quote-mobile"
                type="tel"
                required
                value={form.mobile}
                onChange={(event) => updateField('mobile', event.target.value)}
                placeholder="Mobile number"
                className="field-input"
              />
            </div>

            <div>
              <label htmlFor="quote-email" className="sr-only">
                Email address
              </label>
              <input
                id="quote-email"
                type="email"
                required
                value={form.email}
                onChange={(event) => updateField('email', event.target.value)}
                placeholder="Email address"
                className="field-input"
              />
            </div>
          </div>
        </div>

        <label className="flex items-start gap-2 text-xs text-ink-muted">
          <input
            type="checkbox"
            checked={form.acceptsPolicy}
            onChange={(event) => updateField('acceptsPolicy', event.target.checked)}
            className="mt-0.5 h-4 w-4 rounded border-brand-200"
          />
          I accept the Privacy Policy
        </label>

        <button type="submit" disabled={isSubmitting} className="btn-primary w-full">
          {isSubmitting ? 'Sending…' : 'Get quote'}
        </button>

        <p className="text-center text-[11px] text-ink-muted">
          No hidden charges · Rate held for 30 mins
        </p>
      </form>

      <FormStatus type={status?.type} message={status?.message} />
    </div>
  );
}
