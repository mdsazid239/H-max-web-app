import PageHero from '../components/common/PageHero.jsx';
import SectionHeading from '../components/common/SectionHeading.jsx';
import {
  ABOUT_OFFERINGS,
  BUYING_BENEFITS,
  CORE_VALUES,
} from '../data/siteContent.js';

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="Your Trusted Forex Partner Since 2016"
        subtitle="Building trust and transparency with every transaction."
        variant="dark"
      />

      {/* Who we are */}
      <section className="py-16 sm:py-20">
        <div className="container-page grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div className="flex aspect-[4/3] items-center justify-center rounded-2xl bg-gradient-to-br from-brand-50 to-brand-100">
            <span aria-hidden="true" className="text-7xl">
              🛡️
            </span>
          </div>

          <div>
            <h2 className="text-3xl font-bold sm:text-4xl">Who we are</h2>
            <p className="mt-3 font-semibold text-brand-600">
              HMAX — Your Trusted Forex Partner
            </p>

            <p className="mt-5 text-sm leading-relaxed text-ink-muted sm:text-base">
              Founded in 2016, Hmax Money Exchange Pvt. Ltd. has become one of the leading
              foreign exchange service providers in India for both commercial and travel needs.
              With a diverse client base of businesses and individuals, we are committed to
              offering value for money and efficient, transparent services within the foreign
              exchange market.
            </p>

            <p className="mt-4 text-sm leading-relaxed text-ink-muted sm:text-base">
              At Hmax, we don&rsquo;t just exchange currency — we build trust with every
              transaction.
            </p>
          </div>
        </div>
      </section>

      {/* What we offer */}
      <section className="pb-16 sm:pb-20">
        <div className="container-page">
          <SectionHeading
            title="What we offer"
            description="A comprehensive range of forex solutions designed to meet every need."
          />

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {ABOUT_OFFERINGS.map((offering) => (
              <article key={offering.title} className="rounded-xl bg-brand-50 p-6">
                <h3 className="text-lg font-bold">{offering.title}</h3>
                <div className="my-4 h-px w-12 bg-brand-300" />
                <p className="text-sm leading-relaxed text-ink-muted">{offering.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Why choose us */}
      <section className="pb-16 sm:pb-20">
        <div className="container-page">
          <SectionHeading title="Why choose Hmax for buying forex?" />

          <ul className="mx-auto mt-10 max-w-2xl space-y-5">
            {BUYING_BENEFITS.map((benefit) => (
              <li key={benefit.text} className="flex items-center gap-4">
                <span
                  aria-hidden="true"
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-xl"
                >
                  {benefit.icon}
                </span>
                <span className="text-sm text-ink sm:text-base">{benefit.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Approach, purpose and values */}
      <section className="bg-brand-50/60 py-16 sm:py-20">
        <div className="container-page">
          <div className="grid gap-6 lg:grid-cols-2">
            <article className="rounded-xl bg-white p-7 shadow-card">
              <h2 className="text-2xl font-bold">Our approach</h2>
              <p className="mt-4 text-sm leading-relaxed text-ink-muted">
                At Hmax, we pride ourselves on maintaining top-quality security standards. Our
                experienced executives ensure that every transaction — whether currency
                exchange, remittance, or travel card — is handled effectively, economically, and
                with complete transparency.
              </p>
            </article>

            <article className="rounded-xl bg-white p-7 shadow-card">
              <h2 className="text-2xl font-bold">Core purpose</h2>
              <p className="mt-4 text-sm leading-relaxed text-ink-muted">
                We are dedicated to increasing the value of money by providing real-time foreign
                exchange across a wide range of currencies. By simplifying global financial
                transactions, we aim to contribute to the growth of both our clients and the
                country&rsquo;s economy.
              </p>
            </article>
          </div>

          <div className="mt-6 rounded-xl bg-white p-7 shadow-card">
            <h2 className="text-2xl font-bold">Our core values</h2>

            <ul className="mt-6 space-y-4">
              {CORE_VALUES.map((value) => (
                <li key={value.title} className="flex gap-3 text-sm sm:text-base">
                  <span aria-hidden="true" className="text-brand-500">
                    ◆
                  </span>
                  <span>
                    <strong className="font-semibold text-brand-700">{value.title}:</strong>{' '}
                    <span className="text-ink-muted">{value.detail}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
