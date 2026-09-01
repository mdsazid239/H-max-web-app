import { api } from '../lib/api.js';
import { useApiData } from '../lib/useApiData.js';
import { formatDate } from '../lib/format.js';
import { FALLBACK_NEWS } from '../data/fallbackData.js';
import SectionHeading from '../components/common/SectionHeading.jsx';

/** One news card. The featured article spans the full width. */
function NewsCard({ article, isWide }) {
  return (
    <article
      className={`group relative flex min-h-[260px] flex-col justify-end overflow-hidden rounded-xl bg-gradient-to-br from-brand-800 to-brand-500 p-7 text-white ${
        isWide ? 'lg:col-span-2 lg:min-h-[300px]' : ''
      }`}
    >
      <div className="absolute inset-0 bg-black/25" aria-hidden="true" />

      <div className="relative">
        <p className="text-xs font-semibold tracking-wide text-brand-100">{article.category}</p>

        <h3 className="mt-3 max-w-lg text-xl font-bold leading-snug text-white sm:text-2xl">
          {article.title}
        </h3>

        {article.excerpt && (
          <p className="mt-3 max-w-lg text-sm leading-relaxed text-white/85">
            {article.excerpt}
          </p>
        )}

        <div className="mt-5 flex items-center gap-4">
          <button type="button" className="btn bg-white/95 text-brand-700 hover:bg-white">
            Read more
          </button>
          <time className="text-xs text-white/75" dateTime={article.publishedAt}>
            {formatDate(article.publishedAt)}
          </time>
        </div>
      </div>
    </article>
  );
}

export default function NewsPage() {
  const { data: articles, isLoading } = useApiData(
    () => api.getNews().then((result) => result.articles),
    FALLBACK_NEWS,
  );

  return (
    <>
      <section className="bg-gradient-to-r from-brand-50 via-brand-100 to-white">
        <div className="container-page py-16 sm:py-20">
          <h1 className="text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
            Global reach.
            <br />
            Trusted exchange.
          </h1>

          <p className="mt-4 max-w-lg text-sm leading-relaxed text-ink-muted sm:text-base">
            Connecting you to the world with secure, transparent and reliable forex services.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="container-page">
          <SectionHeading
            title="Latest news"
            description="Stay up to date with the latest news and events from Hmax Money Exchange Pvt Ltd."
          />

          {isLoading ? (
            <div className="mt-12 grid gap-6 lg:grid-cols-2" aria-hidden="true">
              {[0, 1, 2].map((card) => (
                <div key={card} className="h-64 animate-pulse rounded-xl bg-brand-50" />
              ))}
            </div>
          ) : (
            <div className="mt-12 grid gap-6 lg:grid-cols-2">
              {articles.map((article) => (
                <NewsCard key={article.slug} article={article} isWide={article.isFeatured} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
