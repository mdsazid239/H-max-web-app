import { Link } from 'react-router-dom';
import QuoteForm from './QuoteForm.jsx';

const HERO_BADGES = [
  { icon: '🏛️', title: 'RBI Authorized', detail: 'AD Category II' },
  { icon: '🔒', title: '100% Secure', detail: 'SSL Encrypted' },
  { icon: '⚡', title: 'Same-Day', detail: 'Order Processing' },
];

/** Home page hero: headline on the left, live quote panel on the right. */
export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-white via-brand-50 to-brand-100">
      <div className="container-page grid items-center gap-10 py-14 lg:grid-cols-2 lg:gap-16 lg:py-20">
        <div>
          <h1 className="text-4xl font-extrabold leading-[1.1] sm:text-5xl lg:text-6xl">
            Your Trusted
            <br />
            Forex Partner.
          </h1>

          <p className="mt-4 text-base font-semibold text-brand-600">
            Building trust and transparency with every transaction.
          </p>

          <p className="mt-4 max-w-lg text-sm leading-relaxed text-ink-muted sm:text-base">
            Mumbai&rsquo;s trusted partner for foreign currency exchange, outward remittances,
            and multi-currency travel cards. Transparent rates, zero hidden charges, backed by
            9 years of trust.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <Link to="/currency-exchange" className="btn-primary">
              Explore live rates
            </Link>
            <Link to="/contact" className="btn-outline">
              Talk to an expert
            </Link>
          </div>

          <ul className="mt-8 grid gap-4 sm:grid-cols-3">
            {HERO_BADGES.map((badge) => (
              <li key={badge.title} className="flex items-center gap-2.5">
                <span aria-hidden="true" className="text-lg">
                  {badge.icon}
                </span>
                <span>
                  <span className="block text-xs font-semibold text-brand-700">
                    {badge.title}
                  </span>
                  <span className="block text-[11px] text-ink-muted">{badge.detail}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:justify-self-end lg:pl-6">
          <QuoteForm />
        </div>
      </div>
    </section>
  );
}
