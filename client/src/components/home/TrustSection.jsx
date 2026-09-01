import SectionHeading from '../common/SectionHeading.jsx';
import { TRUST_BADGES, TRUST_VALUES } from '../../data/siteContent.js';
export default function TrustSection() {
  return (
    <section className="py-16 sm:py-20">
      <div className="container-page">
        <SectionHeading
          eyebrow="Our promise"
          title="A partner you can trust"
          description="Since 2016, HMAX has built its reputation on six foundational values that guide every transaction."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {TRUST_VALUES.map((value) => (
            <article key={value.title} className="rounded-xl bg-brand-600 p-6 text-white">
              <h3 className="text-base font-bold text-white">{value.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-brand-100">{value.description}</p>
            </article>
          ))}
        </div>

        <div className="mt-6 grid gap-px overflow-hidden rounded-xl bg-brand-800 sm:grid-cols-2 lg:grid-cols-5">
          {TRUST_BADGES.map((badge) => (
            <div key={badge.title} className="bg-brand-700 px-5 py-5 text-center">
              <p className="text-sm font-bold text-white">{badge.title}</p>
              <p className="mt-1 text-xs text-brand-200">{badge.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
