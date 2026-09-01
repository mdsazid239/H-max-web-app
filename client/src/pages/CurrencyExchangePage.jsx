import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../lib/api.js';
import { useApiData } from '../lib/useApiData.js';
import { formatUpdatedAt } from '../lib/format.js';
import { FALLBACK_RATES } from '../data/fallbackData.js';
import Award from '../assets/images/award.png';
import Global from '../assets/images/global.png';
import Notebook from '../assets/images/notebook.png';
import wired from '../assets/images/Group.png';
import AED from '../assets/images/AED.png';
import AUD from '../assets/images/AUD.png';
import CHF from '../assets/images/CHF.png';
import EUR from '../assets/images/EUR.png';
import GBP from '../assets/images/GBP.png';
import USD from '../assets/images/USD.png';
import MobileCurrency from '../assets/images/mobile-currency.png';
import BookWord from '../assets/images/book-word.png';
import BookWordN from '../assets/images/book-word1.png';
import BookWordNT from '../assets/images/book-word2.png';
import BookWordNL from '../assets/images/book-word3.png';
import Atm from '../assets/images/atm-card.png';
import AtmN from '../assets/images/atm-card1.png';
import Bulding from '../assets/images/bullinding.png';
import Increase from '../assets/images/increase.png';
import Wonder from '../assets/images/wonder.png';
import {
  BUYING_BENEFITS,
  DOCUMENT_REQUIREMENTS,
  SELLING_BENEFITS,
} from '../data/siteContent.js';

/* Flag artwork for the rate tables and the converter, keyed on currency code. */
const CURRENCY_FLAGS = { AED, AUD, CHF, EUR, GBP, USD };

const HIGHLIGHTS = [
  { image: Award, label: 'Excellent Rates' },
  { image: Global, label: 'Over 30 Currencies' },
  { image: Notebook, label: 'Convenient Multi-currency Card' },
  { image: wired, label: 'Reliable Customer Service' },
];

/* Icons follow the same order as the benefit copy in siteContent.js. */
const BUYING_ICONS = [BookWord, BookWordN, BookWordNT, BookWordNL];
const SELLING_ICONS = [Atm, AtmN, Bulding, Increase];

const PROMO_CARDS = [
  {
    image: MobileCurrency,
    title: 'Personalized Currency Exchange Solutions at Your Doorstep',
    to: '/contact',
  },
  {
    image: Global,
    title: 'Stay Informed with Real-Time Exchange Rates for Over 30 Currencies',
    to: '/currency-exchange',
  },
  {
    image: AtmN,
    title: 'Simplify Your Travels with a Single Card for Multiple Currencies',
    to: '/services',
  },
];

/* ------------------------------------------------------------------ */
/* Section backdrop                                                    */
/* ------------------------------------------------------------------ */

/*
 * The faint chart artwork that washes across a whole section in the design.
 * It fills the section rather than sitting in one corner, so `object-cover`
 * plus `inset-0` is the default and each caller only sets its opacity.
 *
 * Decoration only: hidden from screen readers and ignores pointer events.
 * The parent section must be `relative overflow-hidden`, and the content
 * inside it needs `relative` so it paints on top.
 */
function SectionBackdrop({ className }) {
  return (
    <img
      src={Increase}
      alt=""
      aria-hidden="true"
      loading="lazy"
      draggable="false"
      className={`pointer-events-none absolute inset-0 h-full w-full select-none object-cover ${className}`}
    />
  );
}

/* ------------------------------------------------------------------ */
/* Rate table                                                          */
/* ------------------------------------------------------------------ */

function RateTable({ title, rates, isLoading }) {
  return (
    <div className="rounded-2xl bg-white p-4 shadow-card sm:p-6">
      <h2 className="text-center text-lg font-bold text-brand-700 sm:text-xl">{title}</h2>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[300px] border-collapse text-left">
          <thead>
            <tr className="bg-brand-600 text-white">
              <th className="rounded-l-md px-3 py-2.5 text-xs font-semibold sm:px-4 sm:text-sm">
                Currency
              </th>
              <th className="px-3 py-2.5 text-right text-xs font-semibold sm:px-4 sm:text-sm">
                Buy
              </th>
              <th className="rounded-r-md px-3 py-2.5 text-right text-xs font-semibold sm:px-4 sm:text-sm">
                Sell
              </th>
            </tr>
          </thead>

          <tbody>
            {isLoading
              ? Array.from({ length: 6 }, (_, index) => (
                  <tr key={index} className="border-b border-brand-50 last:border-0">
                    <td className="px-3 py-3.5 sm:px-4" colSpan={3}>
                      <div className="h-5 w-full animate-pulse rounded bg-brand-50" />
                    </td>
                  </tr>
                ))
              : rates.map((rate) => (
                  <tr key={rate.code} className="border-b border-brand-50 last:border-0">
                    <td className="px-3 py-3 sm:px-4">
                      <div className="flex items-center gap-3">
                        {CURRENCY_FLAGS[rate.code] ? (
                          <img
                            src={CURRENCY_FLAGS[rate.code]}
                            alt=""
                            aria-hidden="true"
                            className="h-6 w-8 shrink-0 rounded-sm object-cover"
                          />
                        ) : null}

                        <span className="leading-tight">
                          <span className="block text-sm font-bold text-brand-700">
                            {rate.code}
                          </span>
                          <span className="block text-[11px] text-ink-muted">{rate.name}</span>
                        </span>
                      </div>
                    </td>

                    <td className="px-3 py-3 text-right text-sm font-semibold text-ink sm:px-4">
                      {rate.buy}
                    </td>
                    <td className="px-3 py-3 text-right text-sm font-semibold text-ink sm:px-4">
                      {rate.sell}
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Converter card (matches the form in the approved design)            */
/* ------------------------------------------------------------------ */

const PRODUCT_TYPES = [
  { value: 'currency', label: 'Currency Rates' },
  { value: 'travel_card', label: 'Travel Card' },
];

function ConverterCard({ counterRates, cardRates }) {
  const [mode, setMode] = useState('buy');
  const [productType, setProductType] = useState('currency');
  const [currencyCode, setCurrencyCode] = useState('USD');
  const [amount, setAmount] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [acceptsPolicy, setAcceptsPolicy] = useState(false);

  const rates = productType === 'travel_card' ? cardRates : counterRates;

  const selectedRate = useMemo(
    () => rates.find((rate) => rate.code === currencyCode) ?? rates[0],
    [rates, currencyCode],
  );

  const inrValue = useMemo(() => {
    const parsedAmount = Number.parseFloat(amount);
    if (!selectedRate || Number.isNaN(parsedAmount)) return 0;

    const rate = mode === 'buy' ? selectedRate.buy : selectedRate.sell;
    return parsedAmount * Number(rate);
  }, [amount, mode, selectedRate]);

  const canSubmit = Boolean(amount) && Boolean(mobile) && Boolean(email) && acceptsPolicy;

  function handleSubmit() {
    // Wire this to the quote endpoint once the backend route is live.
    console.log({ mode, productType, currencyCode, amount, mobile, email });
  }

  return (
    <div className="rounded-2xl bg-white p-5 shadow-card sm:p-6">
      {/* Buy / sell toggle */}
      <div className="grid grid-cols-2 overflow-hidden rounded-lg border border-brand-100">
        {[
          { value: 'buy', label: 'Buy Forex' },
          { value: 'sell', label: 'Sell Forex' },
        ].map((tab) => (
          <button
            key={tab.value}
            type="button"
            onClick={() => setMode(tab.value)}
            className={`py-2.5 text-sm font-semibold transition-colors ${
              mode === tab.value ? 'bg-brand-600 text-white' : 'bg-white text-ink-muted'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="mt-5 space-y-4">
        <div>
          <label htmlFor="product-type" className="text-xs font-semibold text-ink-muted">
            Product Type
          </label>
          <select
            id="product-type"
            value={productType}
            onChange={(event) => setProductType(event.target.value)}
            className="mt-1.5 w-full rounded-md border border-brand-100 bg-white px-3 py-2.5 text-sm outline-none focus:border-brand-600"
          >
            {PRODUCT_TYPES.map((product) => (
              <option key={product.value} value={product.value}>
                {product.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="currency" className="text-xs font-semibold text-ink-muted">
            Currency
          </label>
          <select
            id="currency"
            value={currencyCode}
            onChange={(event) => setCurrencyCode(event.target.value)}
            className="mt-1.5 w-full rounded-md border border-brand-100 bg-white px-3 py-2.5 text-sm outline-none focus:border-brand-600"
          >
            {rates.map((rate) => (
              <option key={rate.code} value={rate.code}>
                {rate.name} ({rate.code})
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-md border border-brand-100 px-3 py-2">
            <span className="text-[11px] text-ink-muted">{currencyCode}</span>
            <input
              type="number"
              inputMode="decimal"
              min="0"
              placeholder="0.00"
              value={amount}
              onChange={(event) => setAmount(event.target.value)}
              aria-label={`Amount in ${currencyCode}`}
              className="w-full border-0 p-0 text-base font-semibold outline-none"
            />
          </div>

          <div className="rounded-md border border-brand-100 bg-brand-50/50 px-3 py-2">
            <span className="text-[11px] text-ink-muted">INR</span>
            <p className="text-base font-semibold text-brand-700">
              ₹ {inrValue.toFixed(2)}
            </p>
          </div>
        </div>
      </div>

      {/* Contact details */}
      <div className="mt-6 border-t border-brand-100 pt-5">
        <p className="text-xs font-semibold text-ink-muted">Your Details</p>

        <div className="mt-3 space-y-3">
          <input
            type="tel"
            placeholder="Mobile Number"
            value={mobile}
            onChange={(event) => setMobile(event.target.value)}
            aria-label="Mobile number"
            className="w-full rounded-md border border-brand-100 px-3 py-2.5 text-sm outline-none focus:border-brand-600"
          />
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            aria-label="Email address"
            className="w-full rounded-md border border-brand-100 px-3 py-2.5 text-sm outline-none focus:border-brand-600"
          />
        </div>

        <label className="mt-3 flex items-start gap-2 text-xs text-ink-muted">
          <input
            type="checkbox"
            checked={acceptsPolicy}
            onChange={(event) => setAcceptsPolicy(event.target.checked)}
            className="mt-0.5 h-4 w-4 shrink-0 accent-brand-600"
          />
          <span>
            I accept the{' '}
            <Link to="/privacy-policy" className="font-semibold text-brand-600 underline">
              Privacy Policy
            </Link>
          </span>
        </label>

        <button
          type="button"
          onClick={handleSubmit}
          disabled={!canSubmit}
          className="mt-4 w-full rounded-md bg-brand-600 py-3 text-sm font-semibold text-white transition-opacity disabled:opacity-50"
        >
          Get Quote
        </button>

        <div className="mt-3 flex flex-wrap justify-center gap-x-5 gap-y-1 text-[11px] text-ink-muted">
          <span>No hidden charges</span>
          <span>Rate held for 30 mins</span>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Benefit row                                                         */
/* ------------------------------------------------------------------ */

function BenefitRow({ image, text }) {
  return (
    <li className="flex items-center gap-4 sm:gap-6">
      <img
        src={image}
        alt=""
        aria-hidden="true"
        className="h-12 w-12 shrink-0 object-contain sm:h-14 sm:w-14"
      />
      <span className="text-sm leading-relaxed sm:text-base">{text}</span>
    </li>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function CurrencyExchangePage() {
  const { data: counterRates, isLoading: isLoadingCounter } = useApiData(
    () => api.getRates('currency'),
    { rates: FALLBACK_RATES.currency, updatedAt: null },
  );

  const { data: cardRates, isLoading: isLoadingCard } = useApiData(
    () => api.getRates('travel_card'),
    { rates: FALLBACK_RATES.travel_card, updatedAt: null },
  );

  return (
    <>
      {/*
        Hero — the wonder artwork is the panel's own background, so it fills the
        whole section. `object-right` keeps the globe and candlesticks on the
        right as the viewport narrows, and the scrim below keeps the headline
        readable where the artwork gets busy.
      */}
      <section className="relative overflow-hidden bg-brand-50">
        <img
          src={Wonder}
          alt=""
          aria-hidden="true"
          draggable="false"
          className="pointer-events-none absolute inset-0 h-full w-full select-none object-cover object-right"
        />

        {/* Left-to-right fade so the copy always sits on a calm background. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-brand-50 via-brand-50/85 to-transparent sm:via-brand-50/60 sm:to-transparent"
        />

        <div className="container-page relative py-14 sm:py-20 lg:py-24">
          <div className="max-w-xl">
            <h1 className="text-3xl font-extrabold leading-tight text-brand-700 sm:text-4xl lg:text-[2.75rem]">
              For all your
              <br />
              Currency Exchange
              <br />
              needs
            </h1>

            <p className="mt-5 text-sm leading-relaxed text-ink-muted sm:text-base">
              At Hmax Money Exchange Pvt Ltd we offer a number of flexible and convenient
              foreign currency exchange solutions, at great rates. Our currency exchange caters
              for everyone from individuals to corporates for their travel needs, and to
              Reserve Bank of India (RBI) authorised Authorised Dealer Category II (ADII)
              entities and banks for their day-to-day foreign exchange requirements.
            </p>
          </div>
        </div>
      </section>

      {/* Highlights — four cards in a row */}
      <section className="py-10 sm:py-12">
        <div className="container-page grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
          {HIGHLIGHTS.map((highlight) => (
            <div
              key={highlight.label}
              className="flex flex-col items-center justify-start gap-4 rounded-xl border border-brand-200 bg-white px-4 py-7 text-center sm:px-5 sm:py-8"
            >
              <img
                src={highlight.image}
                alt=""
                aria-hidden="true"
                className="h-12 w-12 object-contain sm:h-14 sm:w-14"
              />
              <p className="text-xs font-semibold leading-snug text-brand-700 sm:text-sm">
                {highlight.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Rate tables */}
      <section className="bg-brand-50/70 py-12 sm:py-14">
        <div className="container-page grid gap-5 lg:grid-cols-2 lg:gap-6">
          <RateTable
            title="Latest Currency Exchange Rates"
            rates={counterRates.rates}
            isLoading={isLoadingCounter}
          />
          <RateTable
            title="Latest Travel Card Rates"
            rates={cardRates.rates}
            isLoading={isLoadingCard}
          />
        </div>

        <div className="container-page mt-5 flex flex-col gap-2 text-center text-xs text-brand-700 sm:flex-row sm:items-center sm:justify-between sm:text-left">
          <p>
            {counterRates.updatedAt
              ? `Last updated rates at ${formatUpdatedAt(counterRates.updatedAt)}`
              : 'Rates refreshed through the day'}
          </p>
          <p>1 FX = Displayed INR</p>
          <p>Rates are indicative and subject to change.</p>
        </div>
      </section>

      {/* Converter — form on the left, illustration on the right */}
      <section className="bg-brand-50/40 py-14 sm:py-16">
        <div className="container-page">
          <h2 className="text-center text-2xl font-bold text-brand-700 sm:text-3xl">
            Currency Exchange Currency Converter
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-ink-muted">
            Our free currency converter makes it easy to see how much you can save with our
            latest rates.
          </p>

          <div className="mt-10 grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
            <div className="mx-auto w-full max-w-md lg:mx-0">
              <ConverterCard counterRates={counterRates.rates} cardRates={cardRates.rates} />
            </div>

            <div className="flex justify-center">
              <img
                src={MobileCurrency}
                alt="Currency exchange on a mobile phone"
                className="w-full max-w-sm object-contain sm:max-w-md"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Buying forex */}
      <section className="relative overflow-hidden py-14 sm:py-16">
        <SectionBackdrop className="opacity-[0.07]" />

        <div className="container-page relative">
          <h2 className="text-center text-2xl font-bold text-brand-700 sm:text-3xl">
            Plan Ahead with Easy Forex Buying
          </h2>

          <p className="mx-auto mt-5 max-w-4xl text-center text-sm leading-relaxed text-ink-muted sm:text-base">
            Going overseas? Plan your trip better with Hmax&rsquo;s Buy Forex facility. Whatever
            your destination &mdash; the U.S., Europe, or the UAE &mdash; you can buy foreign
            exchange simply and at reasonable prices. Escape last-minute airport purchases and
            volatile rates by locking in your money early with us. From the comfort of your
            home, with doorstep delivery and easy booking, acquiring forex has never been
            easier.
          </p>

          <h3 className="mt-12 text-center text-xl font-bold text-brand-700 sm:text-2xl">
            Why Choose Hmax for Buying Forex?
          </h3>

          <ul className="mx-auto mt-8 max-w-lg space-y-6">
            {BUYING_BENEFITS.map((benefit, index) => (
              <BenefitRow
                key={benefit.text}
                image={BUYING_ICONS[index % BUYING_ICONS.length]}
                text={benefit.text}
              />
            ))}
          </ul>
        </div>
      </section>

      {/* Selling forex */}
      <section className="relative overflow-hidden pb-14 sm:pb-16">
        <SectionBackdrop className="opacity-[0.07]" />

        <div className="container-page relative">
          <h2 className="text-center text-2xl font-bold text-brand-700 sm:text-3xl">
            Sell Foreign Currency at Attractive Rates
          </h2>

          <p className="mx-auto mt-5 max-w-4xl text-center text-sm leading-relaxed text-ink-muted sm:text-base">
            Recently back from your travels with unused dollars, euros, or dirhams? Don&rsquo;t
            keep your currency idle. With Hmax you can sell forex instantly and at extremely
            competitive rates, with instant valuation and payout. Whether it is cash or a forex
            card balance, our exchange service is designed for convenience and transparency.
          </p>

          <h3 className="mt-12 text-center text-xl font-bold text-brand-700 sm:text-2xl">
            What We Offer in Selling Forex
          </h3>

          <ul className="mx-auto mt-8 max-w-lg space-y-6">
            {SELLING_BENEFITS.map((benefit, index) => (
              <BenefitRow
                key={benefit.text}
                image={SELLING_ICONS[index % SELLING_ICONS.length]}
                text={benefit.text}
              />
            ))}
          </ul>
        </div>
      </section>

      {/* Document requirements */}
      <section className="relative overflow-hidden bg-brand-50/70 py-12 sm:py-14">
        <SectionBackdrop className="opacity-[0.07]" />

        <div className="container-page relative space-y-4">
          {DOCUMENT_REQUIREMENTS.map((requirement) => (
            <div
              key={requirement.title}
              className="rounded-lg border border-brand-200 px-5 py-5 text-center sm:px-8 sm:py-6"
            >
              <h3 className="text-base font-bold text-brand-700 sm:text-lg">
                {requirement.title}
              </h3>
              <p className="mt-2 text-sm text-ink-muted">{requirement.detail}</p>
            </div>
          ))}

          <p className="pt-2 text-center text-sm text-ink-muted">
            If you are a corporate customer and would like to find out more about our foreign
            exchange services,{' '}
            <Link to="/contact" className="font-semibold text-brand-600 underline">
              please contact your nearest branch
            </Link>
            .
          </p>
        </div>
      </section>

      {/* Promo cards — artwork sits behind the copy as a washed card background */}
      <section className="py-12 sm:py-14">
        <div className="container-page grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PROMO_CARDS.map((card) => (
            <Link
              key={card.title}
              to={card.to}
              className="group relative flex min-h-[240px] flex-col items-center justify-center overflow-hidden rounded-lg border border-brand-200 bg-white px-6 py-8 text-center transition-colors hover:border-brand-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
            >
              <img
                src={card.image}
                alt=""
                aria-hidden="true"
                loading="lazy"
                draggable="false"
                className="pointer-events-none absolute inset-0 h-full w-full select-none object-cover opacity-25"
              />

              <h3 className="relative text-sm font-bold leading-snug text-brand-700 sm:text-base">
                {card.title}
              </h3>

              <span
                aria-hidden="true"
                className="relative mt-5 text-2xl font-bold text-brand-600 transition-transform group-hover:translate-x-1"
              >
                &rarr;
              </span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}