import { Link } from 'react-router-dom';
import SectionHeading from '../common/SectionHeading.jsx';
import { HOME_SERVICES } from '../../data/siteContent.js';

/** Three service cards on the deep blue band. */
export default function ServicesSection() {
  return (
    <section className="py-16 sm:py-20">
      <div className="container-page">
        <SectionHeading
          eyebrow="What we offer"
          title="Forex solutions designed for you"
          description="Whether you are a student heading abroad, a business making international payments, or a family sending money home, we have the right service for you."
        />
      </div>

      <div className="mt-12 bg-brand-600 py-12">
        <div className="container-page grid gap-6 md:grid-cols-3">
          {HOME_SERVICES.map((service) => (
            <article
              key={service.title}
              className="flex flex-col rounded-xl bg-white p-6 shadow-card"
            >
              <span
                aria-hidden="true"
                className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-lg bg-brand-50 text-xl"
              >
                {service.icon}
              </span>

              <p className="text-[11px] font-semibold tracking-wide text-ink-muted">
                {service.eyebrow}
              </p>

              <h3 className="mt-1 text-lg font-bold">{service.title}</h3>

              <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                {service.description}
              </p>

              <ul className="mt-4 space-y-2 text-sm text-ink-muted">
                {service.points.map((point) => (
                  <li key={point} className="flex gap-2">
                    <span aria-hidden="true" className="text-brand-500">
                      ✓
                    </span>
                    {point}
                  </li>
                ))}
              </ul>

              <Link
                to={service.to}
                className="mt-6 inline-block text-sm font-semibold text-brand-600 hover:text-brand-700"
              >
                {service.linkLabel} →
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
