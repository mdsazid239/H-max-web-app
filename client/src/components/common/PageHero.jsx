/**
 * Wide banner at the top of the inner pages (About, News, FAQs, Contact).
 * `children` can hold an illustration that sits on the right on large screens.
 */
export default function PageHero({ title, subtitle, variant = 'light' }) {
  const isDark = variant === 'dark';

  return (
    <section
      className={
        isDark
          ? 'bg-gradient-to-r from-brand-900 via-brand-800 to-brand-600 text-white'
          : 'bg-gradient-to-r from-brand-50 via-brand-100 to-white'
      }
    >
      <div className="container-page py-16 sm:py-20 lg:py-24">
        <h1
          className={`max-w-3xl text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl ${
            isDark ? 'text-white' : 'text-brand-700'
          }`}
        >
          {title}
        </h1>

        {subtitle && (
          <p
            className={`mt-4 max-w-xl text-sm leading-relaxed sm:text-base ${
              isDark ? 'text-brand-100' : 'text-ink-muted'
            }`}
          >
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
