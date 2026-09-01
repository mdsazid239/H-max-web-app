import { HOME_STATS } from '../../data/siteContent.js';
export default function StatsBar() {
  return (
    <section className="border-y border-brand-100 bg-brand-50/70">
      <div className="container-page grid grid-cols-2 gap-6 py-8 sm:grid-cols-4 sm:divide-x sm:divide-brand-200">
        {HOME_STATS.map((stat) => (
          <div key={stat.label} className="text-center">
            <p className="font-display text-2xl font-extrabold text-brand-600 sm:text-3xl">
              {stat.value}
            </p>
            <p className="mt-1 text-xs text-ink-muted sm:text-sm">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
