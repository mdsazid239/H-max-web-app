import { Link } from 'react-router-dom';
import { api } from '../lib/api.js';
import { useApiData } from '../lib/useApiData.js';
import { formatUpdatedAt } from '../lib/format.js';
import { FALLBACK_RATES } from '../data/fallbackData.js';
import RatesTable from '../components/common/RatesTable.jsx';
import SectionHeading from '../components/common/SectionHeading.jsx';
import QuoteForm from '../components/home/QuoteForm.jsx';
import {
  BUYING_BENEFITS,
  DOCUMENT_REQUIREMENTS,
  SELLING_BENEFITS,
} from '../data/siteContent.js';

const HIGHLIGHTS = [
  { icon: '⭐', label: 'Excellent rates' },
  { icon: '🌍', label: 'Over 30 currencies' },
  { icon: '💳', label: 'Convenient multi-currency card' },
  { icon: '🎧', label: 'Reliable customer service' },
];

const PROMO_CARDS = [
  { title: 'Personalized currency exchange solutions at your doorstep', to: '/contact' },
  { title: 'Stay informed with real-time exchange rates for over 30 currencies', to: '/currency-exchange' },
  { title: 'Simplify your travels with a single card for multiple currencies', to: '/services' },
];

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
      {/* Hero */}
      <section className="bg-gradient-to-r from-brand-50 via-brand-100 to-white">
        <div className="container-page py-16 sm:py-20">
          <h1 className="max-w-xl text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
            For all your currency exchange needs
          </h1>

          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-ink-muted sm:text-base">
            At Hmax Money Exchange Pvt Ltd we offer a number of flexible and convenient foreign
            currency exchange solutions, at great rates. Our currency exchange caters for
            everyone — from individuals and corporates travelling abroad, to RBI Authorised
            Dealer Category II entities and banks meeting their day-to-day foreign exchange
            requirements.
          </p>
        </div>
      </section>

      {/* Highlights */}
      <section className="py-10">
        <div className="container-page grid grid-cols-2 gap-4 lg:grid-cols-4">
          {HIGHLIGHTS.map((highlight) => (
            <div
              key={highlight.label}
              className="flex flex-col items-center gap-3 rounded-xl border border-brand-100 px-4 py-7 text-center"
            >
              <span aria-hidden="true" className="text-2xl">
                {highlight.icon}
              </span>
              <p className="text-xs font-semibold text-brand-700 sm:text-sm">
                {highlight.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Both rate tables side by side */}
      <section className="bg-brand-50/60 py-14">
        <div className="container-page grid gap-6 lg:grid-cols-2">
          <div className="rounded-xl bg-white p-6 shadow-card">
            <h2 className="text-xl font-bold">Latest currency exchange rates</h2>
            <div className="mt-4">
              <RatesTable rates={counterRates.rates} isLoading={isLoadingCounter} />
            </div>
          </div>

          <div className="rounded-xl bg-white p-6 shadow-card">
            <h2 className="text-xl font-bold">Latest travel card rates</h2>
            <div className="mt-4">
              <RatesTable rates={cardRates.rates} isLoading={isLoadingCard} />
            </div>
          </div>
        </div>

        <div className="container-page mt-5 flex flex-col gap-2 text-xs text-ink-muted sm:flex-row sm:justify-between">
          <p>
            {counterRates.updatedAt
              ? `Last updated at ${formatUpdatedAt(counterRates.updatedAt)}`
              : 'Rates refreshed through the day'}
          </p>
          <p>1 FX = displayed INR</p>
          <p>Rates are indicative and subject to change.</p>
        </div>
      </section>

      {/* Converter */}
      <section className="py-16 sm:py-20">
        <div className="container-page">
          <SectionHeading
            title="Currency converter"
            description="See how much you can save at our latest rates, then send yourself the quote."
          />

          <div className="mx-auto mt-10 max-w-md">
            <QuoteForm />
          </div>
        </div>
      </section>

      {/* Buying forex */}
      <section className="pb-16">
        <div className="container-page">
          <h2 className="text-center text-2xl font-bold sm:text-3xl">
            Plan ahead with easy forex buying
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-sm leading-relaxed text-ink-muted">
            Going overseas? Plan your trip better with Hmax&rsquo;s buy forex facility. Whatever
            your destination — the U.S., Europe, or the UAE — you can buy foreign exchange
            simply and at reasonable prices. Escape last-minute airport purchases and volatile
            rates by locking in your money early with us. From the comfort of your home, with
            doorstep delivery and easy booking, acquiring forex has never been easier.
          </p>

          <h3 className="mt-12 text-center text-xl font-bold sm:text-2xl">
            Why choose Hmax for buying forex?
          </h3>

          <ul className="mx-auto mt-8 max-w-2xl space-y-5">
            {BUYING_BENEFITS.map((benefit) => (
              <li key={benefit.text} className="flex items-center gap-4">
                <span
                  aria-hidden="true"
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-xl"
                >
                  {benefit.icon}
                </span>
                <span className="text-sm sm:text-base">{benefit.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Selling forex */}
      <section className="pb-16">
        <div className="container-page">
          <h2 className="text-center text-2xl font-bold sm:text-3xl">
            Sell foreign currency at attractive rates
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-sm leading-relaxed text-ink-muted">
            Recently back from your travels with unused dollars, euros, or dirhams? Don&rsquo;t
            keep your currency idle. With Hmax you can sell forex instantly and at extremely
            competitive rates, with instant valuation and payout. Whether it is cash or a forex
            card balance, our exchange service is designed for convenience and transparency.
          </p>

          <h3 className="mt-12 text-center text-xl font-bold sm:text-2xl">
            What we offer in selling forex
          </h3>

          <ul className="mx-auto mt-8 max-w-2xl space-y-5">
            {SELLING_BENEFITS.map((benefit) => (
              <li key={benefit.text} className="flex items-center gap-4">
                <span
                  aria-hidden="true"
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-xl"
                >
                  {benefit.icon}
                </span>
                <span className="text-sm sm:text-base">{benefit.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Documents */}
      <section className="bg-brand-50/60 py-14">
        <div className="container-page space-y-4">
          {DOCUMENT_REQUIREMENTS.map((requirement) => (
            <div
              key={requirement.title}
              className="rounded-lg border border-brand-200 bg-white px-6 py-5 text-center"
            >
              <h3 className="text-base font-bold">{requirement.title}</h3>
              <p className="mt-2 text-sm text-ink-muted">{requirement.detail}</p>
            </div>
          ))}

          <p className="pt-2 text-center text-sm text-ink-muted">
            Are you a corporate customer? For more on our foreign exchange services,{' '}
            <Link to="/contact" className="font-semibold text-brand-600 underline">
              contact your nearest branch
            </Link>
            .
          </p>
        </div>
      </section>

      {/* Promo cards */}
      <section className="py-14">
        <div className="container-page grid gap-5 md:grid-cols-3">
          {PROMO_CARDS.map((card) => (
            <Link
              key={card.title}
              to={card.to}
              className="rounded-xl border border-brand-100 bg-white p-6 transition-colors hover:border-brand-300"
            >
              <div className="mb-6 flex h-24 items-center justify-center rounded-lg bg-brand-50 text-3xl">
                <span aria-hidden="true">💠</span>
              </div>

              <h3 className="text-base font-bold leading-snug">{card.title}</h3>
              <span className="mt-3 inline-block text-sm font-semibold text-brand-600">→</span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
