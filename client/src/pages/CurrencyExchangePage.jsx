import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../lib/api.js';
import { useApiData } from '../lib/useApiData.js';
import { formatUpdatedAt } from '../lib/format.js';
import { FALLBACK_RATES } from '../data/fallbackData.js';
import Award from '../assets/images/award.png';
import Global from '../assets/images/global.png';
import Notebook from '../assets/images/notebook.png';
import Wired from '../assets/images/Group.png';
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
import CleanUpOne from '../assets/images/clean-up1.png';
import CleanUpTwo from '../assets/images/clean-up2.png';
import CleanUpThree from '../assets/images/clean-up3.png';
import Increase from '../assets/images/increase.png';
import Wonder from '../assets/images/wonder.png';
import Payout from '../assets/images/polarish.png';
import BuyBack from '../assets/images/polarish1.png';
import CardBalance from '../assets/images/polarish3.png';
import Valuation from '../assets/images/polarish4.png';
import {
  BUYING_BENEFITS,
  DOCUMENT_REQUIREMENTS,
  SELLING_BENEFITS,
} from '../data/siteContent.js';

/*
 * Flag artwork, keyed on currency code.
 *
 * This map is the board: only these six codes from the design are quoted, and
 * they are quoted in this order. Anything else the feed publishes is left off.
 * To add a currency, drop its flag into assets and add it here — the artwork
 * and its place in the running order come together.
 */
const CURRENCY_FLAGS = { AED, AUD, CHF, EUR, GBP, USD };
const BOARD_ORDER = Object.keys(CURRENCY_FLAGS);

const HIGHLIGHTS = [
  { image: Award, label: 'Excellent Rates' },
  { image: Global, label: 'Over 30 Currencies' },
  { image: Notebook, label: 'Convenient Multi-currency Card' },
  { image: Wired, label: 'Reliable Customer Service' },
];

/* Icons follow the same order as the benefit copy in siteContent.js. */
const BUYING_ICONS = [BookWord, BookWordN, BookWordNT, BookWordNL];
const SELLING_ICONS = [Payout, BuyBack, CardBalance, Valuation];

/*
 * The three cards that close the page. Each one carries its own clean-up
 * artwork, so the cards no longer borrow icons from the highlights row or the
 * converter — a change to one of those does not quietly change a card here.
 */
const PROMO_CARDS = [
  {
    image: CleanUpOne,
    title: 'Personalized Currency Exchange Solutions at Your Doorstep',
    to: '/contact',
  },
  {
    image: CleanUpTwo,
    title: 'Stay Informed with Real-Time Exchange Rates for Over 30 Currencies',
    to: '/currency-exchange',
  },
  {
    image: CleanUpThree,
    title: 'Simplify Your Travels with a Single Card for Multiple Currencies',
    to: '/services',
  },
];

/* Amounts are shown the way a rate board shows them: two decimals, thousands grouped. */
const inrFormatter = new Intl.NumberFormat('en-IN', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

function formatAmount(value) {
  return inrFormatter.format(Number.isFinite(value) ? value : 0);
}

/*
 * The API and the fallback data both name the columns `buyRate` and `sellRate`.
 * Older payloads used `buy` / `sell`, so accept either and always hand back a
 * number.
 */
function rateValue(rate, side) {
  const raw = side === 'buy' ? (rate?.buyRate ?? rate?.buy) : (rate?.sellRate ?? rate?.sell);
  const parsed = Number(raw);
  return Number.isFinite(parsed) ? parsed : 0;
}

function isBoardCurrency(rate) {
  return BOARD_ORDER.includes(rate.code);
}

/*
 * Only board currencies are quoted, and only when they carry a rate on at
 * least one side — a currency with nothing on either side is not quotable, so
 * it is left off rather than printed as 0.00. An empty result means the feed
 * has not published yet, so fall back to the seeded figures. The fallback is
 * filtered too, so an extra code there cannot reach the board either.
 */
function prepareRates(rates, fallback) {
  const source = Array.isArray(rates) ? rates : [];
  const quotable = source.filter(
    (rate) =>
      isBoardCurrency(rate) && (rateValue(rate, 'buy') > 0 || rateValue(rate, 'sell') > 0),
  );

  return (quotable.length ? quotable : fallback.filter(isBoardCurrency)).sort(
    (a, b) => BOARD_ORDER.indexOf(a.code) - BOARD_ORDER.indexOf(b.code),
  );
}

/* ------------------------------------------------------------------ */
/* Section backdrop                                                    */
/* ------------------------------------------------------------------ */

/*
 * The faint chart artwork that washes across a whole section in the design.
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

/*
 * Every quoted currency has local artwork, so the flag slot is a fixed box
 * that clips its image. That keeps the flag column aligned and stops the code
 * and name beside it from ever being painted over.
 */
function CurrencyCell({ code, name }) {
  return (
    <div className="flex min-w-0 items-center gap-3">
      <span
        aria-hidden="true"
        className="flex h-6 w-8 shrink-0 items-center justify-center overflow-hidden rounded-sm bg-brand-50 ring-1 ring-inset ring-brand-100"
      >
        <img src={CURRENCY_FLAGS[code]} alt="" className="h-full w-full object-cover" />
      </span>

      <span className="min-w-0">
        <span className="block text-sm font-bold leading-tight text-ink">{code}</span>
        <span className="block truncate text-xs leading-tight text-ink-muted">{name}</span>
      </span>
    </div>
  );
}

function RateTable({ title, rates, isLoading }) {
  return (
    <div className="flex h-full flex-col rounded-2xl bg-white p-4 shadow-card sm:p-6">
      <h2 className="text-center text-lg font-bold text-brand-700 sm:text-xl">{title}</h2>

      <table className="mt-5 w-full table-fixed border-collapse text-left">
        <caption className="sr-only">
          {title}. Buy and sell rates in Indian rupees for one unit of each currency.
        </caption>

        <colgroup>
          <col className="w-1/2" />
          <col className="w-1/4" />
          <col className="w-1/4" />
        </colgroup>

        <thead>
          <tr className="bg-brand-600 text-white">
            <th
              scope="col"
              className="rounded-l-md px-3 py-2.5 text-xs font-semibold sm:px-4 sm:text-sm"
            >
              Currency
            </th>
            <th
              scope="col"
              className="px-2 py-2.5 text-right text-xs font-semibold sm:px-4 sm:text-sm"
            >
              Buy
            </th>
            <th
              scope="col"
              className="rounded-r-md px-2 py-2.5 text-right text-xs font-semibold sm:px-4 sm:text-sm"
            >
              Sell
            </th>
          </tr>
        </thead>

        <tbody>
          {isLoading
            ? Array.from({ length: BOARD_ORDER.length }, (_, index) => (
                <tr key={index} className="border-b border-brand-50 last:border-0">
                  <td className="px-3 py-3 sm:px-4" colSpan={3}>
                    <div className="h-6 w-full animate-pulse rounded bg-brand-50" />
                    <span className="sr-only">Loading rates</span>
                  </td>
                </tr>
              ))
            : rates.map((rate) => (
                <tr key={rate.code} className="border-b border-brand-50 last:border-0">
                  <td className="px-3 py-2.5 sm:px-4">
                    <CurrencyCell code={rate.code} name={rate.name} />
                  </td>

                  <td className="px-2 py-2.5 text-right text-sm font-semibold tabular-nums text-ink sm:px-4">
                    {formatAmount(rateValue(rate, 'buy'))}
                  </td>
                  <td className="px-2 py-2.5 text-right text-sm font-semibold tabular-nums text-ink sm:px-4">
                    {formatAmount(rateValue(rate, 'sell'))}
                  </td>
                </tr>
              ))}
        </tbody>
      </table>
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

const MODES = [
  { value: 'buy', label: 'Buy Forex' },
  { value: 'sell', label: 'Sell Forex' },
];

const fieldClass =
  'w-full rounded-md border border-brand-100 bg-white px-3 py-2.5 text-sm text-ink outline-none transition-colors focus:border-brand-600 focus:ring-2 focus:ring-brand-600/20';

function ConverterCard({ counterRates, cardRates }) {
  const [mode, setMode] = useState('buy');
  const [productType, setProductType] = useState('currency');
  const [currencyCode, setCurrencyCode] = useState('USD');
  const [amount, setAmount] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [acceptsPolicy, setAcceptsPolicy] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const rates = productType === 'travel_card' ? cardRates : counterRates;

  /* Travel cards do not always carry every counter currency, so fall back to
     the first available code instead of leaving the select on a dead value. */
  useEffect(() => {
    if (rates.length && !rates.some((rate) => rate.code === currencyCode)) {
      setCurrencyCode(rates[0].code);
    }
  }, [rates, currencyCode]);

  const selectedRate = useMemo(
    () => rates.find((rate) => rate.code === currencyCode) ?? rates[0],
    [rates, currencyCode],
  );

  const appliedRate = rateValue(selectedRate, mode);

  const inrValue = useMemo(() => {
    const parsedAmount = Number.parseFloat(amount);
    if (!Number.isFinite(parsedAmount) || parsedAmount < 0) return 0;
    return parsedAmount * appliedRate;
  }, [amount, appliedRate]);

  const isValidMobile = /^[6-9]\d{9}$/.test(mobile.replace(/\D/g, ''));
  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
  const hasAmount = Number.parseFloat(amount) > 0;
  const canSubmit = hasAmount && isValidMobile && isValidEmail && acceptsPolicy;

  function handleSubmit() {
    if (!canSubmit) return;

    // Wire this to the quote endpoint once the backend route is live.
    console.log({ mode, productType, currencyCode, amount, mobile, email });
    setIsSubmitted(true);
  }

  return (
    <div className="rounded-2xl bg-white p-5 shadow-card sm:p-6">
      {/* Buy / sell toggle */}
      <div
        role="tablist"
        aria-label="Quote type"
        className="grid grid-cols-2 overflow-hidden rounded-lg border border-brand-100"
      >
        {MODES.map((tab) => (
          <button
            key={tab.value}
            type="button"
            role="tab"
            aria-selected={mode === tab.value}
            onClick={() => setMode(tab.value)}
            className={`py-2.5 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand-600 ${
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
            className={`mt-1.5 ${fieldClass}`}
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
            className={`mt-1.5 ${fieldClass}`}
          >
            {rates.map((rate) => (
              <option key={rate.code} value={rate.code}>
                {rate.name} ({rate.code})
              </option>
            ))}
          </select>
        </div>

        {/* Amount in / amount out. Stacks on very narrow phones. */}
        <div className="grid gap-3 min-[380px]:grid-cols-2">
          <div className="rounded-md border border-brand-100 px-3 py-2 focus-within:border-brand-600">
            <label htmlFor="amount" className="block text-[11px] text-ink-muted">
              {currencyCode}
            </label>
            <input
              id="amount"
              type="number"
              inputMode="decimal"
              min="0"
              step="0.01"
              placeholder="0.00"
              value={amount}
              onChange={(event) => setAmount(event.target.value)}
              className="w-full border-0 p-0 text-base font-semibold text-ink outline-none"
            />
          </div>

          <div className="rounded-md border border-brand-100 bg-brand-50/50 px-3 py-2">
            <span className="block text-[11px] text-ink-muted">INR</span>
            <p aria-live="polite" className="text-base font-semibold tabular-nums text-brand-700">
              &#8377; {formatAmount(inrValue)}
            </p>
          </div>
        </div>

        {selectedRate ? (
          <p className="text-[11px] text-ink-muted">
            1 {selectedRate.code} = &#8377; {formatAmount(appliedRate)} &middot;{' '}
            {mode === 'buy' ? 'you buy from us' : 'you sell to us'}
          </p>
        ) : null}
      </div>

      {/* Contact details */}
      <div className="mt-6 border-t border-brand-100 pt-5">
        <p className="text-xs font-semibold text-ink-muted">Your Details</p>

        <div className="mt-3 space-y-3">
          <input
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="Mobile Number"
            value={mobile}
            onChange={(event) => setMobile(event.target.value)}
            aria-label="Mobile number"
            className={fieldClass}
          />
          <input
            type="email"
            autoComplete="email"
            placeholder="Email Address"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            aria-label="Email address"
            className={fieldClass}
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
          className="mt-4 w-full rounded-md bg-brand-600 py-3 text-sm font-semibold text-white transition-opacity hover:bg-brand-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Get Quote
        </button>

        <p aria-live="polite" className="mt-2 min-h-[1rem] text-center text-[11px] text-brand-700">
          {isSubmitted ? 'Quote request sent. Our team will call you shortly.' : ''}
        </p>

        <div className="mt-2 flex flex-wrap justify-center gap-x-5 gap-y-1 text-[11px] text-ink-muted">
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

/*
 * Icon left, copy right. The list is `w-fit` and centred, so all four rows
 * share one left edge instead of each centring itself.
 */
function BenefitRow({ image, text }) {
  return (
    <li className="flex items-center gap-5">
      <img
        src={image}
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="h-14 w-14 shrink-0 object-contain"
      />
      <span className="max-w-[16rem] text-sm leading-snug sm:max-w-xs sm:text-base">{text}</span>
    </li>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function CurrencyExchangePage() {
  const { data: counterData, isLoading: isLoadingCounter } = useApiData(
    () => api.getRates('currency'),
    { rates: FALLBACK_RATES.currency, updatedAt: null },
  );

  const { data: cardData, isLoading: isLoadingCard } = useApiData(
    () => api.getRates('travel_card'),
    { rates: FALLBACK_RATES.travel_card, updatedAt: null },
  );

  const counterRates = useMemo(
    () => prepareRates(counterData.rates, FALLBACK_RATES.currency),
    [counterData.rates],
  );

  const cardRates = useMemo(
    () => prepareRates(cardData.rates, FALLBACK_RATES.travel_card),
    [cardData.rates],
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
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-brand-50 via-brand-50/85 to-transparent sm:via-brand-50/60"
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

            <p className="mt-5 max-w-prose text-sm leading-relaxed text-ink-muted sm:text-base">
              At Hmax Money Exchange Pvt Ltd we offer a number of flexible and convenient
              foreign currency exchange solutions, at great rates. Our currency exchange caters
              for everyone from individuals to corporates for their travel needs, and to
              Reserve Bank of India (RBI) authorised Authorised Dealer Category II (ADII)
              entities and banks for their day-to-day foreign exchange requirements.
            </p>
          </div>
        </div>
      </section>

      {/* Highlights — two up on phones, four across from large screens */}
      <section className="py-10 sm:py-12">
        <div className="container-page grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
          {HIGHLIGHTS.map((highlight) => (
            <div
              key={highlight.label}
              className="flex h-full flex-col items-center justify-start gap-4 rounded-xl border border-brand-200 bg-white px-4 py-7 text-center sm:px-5 sm:py-8"
            >
              <img
                src={highlight.image}
                alt=""
                aria-hidden="true"
                loading="lazy"
                className="h-12 w-12 object-contain sm:h-14 sm:w-14"
              />
              <p className="text-xs font-semibold leading-snug text-brand-700 sm:text-sm">
                {highlight.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Rate tables — a matched pair, so both cards stretch to the same height */}
      <section className="bg-brand-50/70 py-12 sm:py-14">
        <div className="container-page grid items-stretch gap-5 lg:grid-cols-2 lg:gap-6">
          <RateTable
            title="Latest Currency Exchange Rates"
            rates={counterRates}
            isLoading={isLoadingCounter}
          />
          <RateTable
            title="Latest Travel Card Rates"
            rates={cardRates}
            isLoading={isLoadingCard}
          />
        </div>

        <div className="container-page mt-5 flex flex-col gap-2 text-center text-xs text-brand-700 sm:flex-row sm:items-center sm:justify-between sm:text-left">
          <p>
            {counterData.updatedAt
              ? `Last updated rates at ${formatUpdatedAt(counterData.updatedAt)}`
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
              <ConverterCard counterRates={counterRates} cardRates={cardRates} />
            </div>

            <div className="order-first flex justify-center lg:order-none">
              <img
                src={MobileCurrency}
                alt="Currency exchange on a mobile phone"
                className="w-full max-w-xs object-contain sm:max-w-sm lg:max-w-md"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Buying forex */}
      <section className="relative overflow-hidden py-14 sm:py-16">
        <SectionBackdrop className="opacity-[0.09]" />

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

          <ul className="mx-auto mt-8 w-fit space-y-4">
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
        <SectionBackdrop className="opacity-[0.09]" />

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
            What We Offer in Selling Forex:
          </h3>

          <ul className="mx-auto mt-8 w-fit space-y-4">
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
        <SectionBackdrop className="opacity-[0.09]" />

        <div className="container-page relative space-y-4">
          {DOCUMENT_REQUIREMENTS.map((requirement) => (
            <div
              key={requirement.title}
              className="rounded-lg border border-brand-200 bg-white/70 px-5 py-5 text-center sm:px-8 sm:py-6"
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

      {/*
        Promo cards — the artwork is the card's scene and the copy sits low over
        it, so the illustration reads at the top instead of being cropped behind
        the words.
      */}
      <section className="py-12 sm:py-14">
        <div className="container-page grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PROMO_CARDS.map((card) => (
            <Link
              key={card.title}
              to={card.to}
              className="group relative flex min-h-[260px] flex-col justify-end overflow-hidden rounded-lg border border-brand-200 bg-white px-6 pb-8 pt-32 text-center transition-colors hover:border-brand-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
            >
              <img
                src={card.image}
                alt=""
                aria-hidden="true"
                loading="lazy"
                draggable="false"
                className="pointer-events-none absolute inset-x-0 top-0 h-full w-full select-none object-contain object-top p-5 opacity-30"
              />

              <h3 className="relative text-sm font-bold leading-snug text-brand-700 sm:text-base">
                {card.title}
              </h3>

              <span
                aria-hidden="true"
                className="relative mt-4 text-2xl font-bold text-brand-600 transition-transform group-hover:translate-x-1"
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