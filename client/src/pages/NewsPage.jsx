// import { api } from '../lib/api.js';
// import { useApiData } from '../lib/useApiData.js';
// import { formatDate } from '../lib/format.js';
// import { FALLBACK_NEWS } from '../data/fallbackData.js';
// import SectionHeading from '../components/common/SectionHeading.jsx';
// import wanda from '../assets/images/background.png';
// import Indik from '../assets/images/eroup.png';
// import lidra from '../assets/images/reserve-bank.png';
// import walka from '../assets/images/flight-t.png';
// import Readable from '../assets/images/readable.png';
// /** One news card. The featured article spans the full width. */
// function NewsCard({ article, isWide }) {
//   return (
//     <article
//       className={`group relative flex min-h-[260px] flex-col justify-end overflow-hidden rounded-xl bg-gradient-to-br from-brand-800 to-brand-500 p-7 text-white ${
//         isWide ? 'lg:col-span-2 lg:min-h-[300px]' : ''
//       }`}
//     >
//       <div className="absolute inset-0 bg-black/25" aria-hidden="true" />

//       <div className="relative">
//         <p className="text-xs font-semibold tracking-wide text-brand-100">{article.category}</p>

//         <h3 className="mt-3 max-w-lg text-xl font-bold leading-snug text-white sm:text-2xl">
//           {article.title}
//         </h3>

//         {article.excerpt && (
//           <p className="mt-3 max-w-lg text-sm leading-relaxed text-white/85">
//             {article.excerpt}
//           </p>
//         )}

//         <div className="mt-5 flex items-center gap-4">
//           <button type="button" className="btn bg-white/95 text-brand-700 hover:bg-white">
//             Read more
//           </button>
//           <time className="text-xs text-white/75" dateTime={article.publishedAt}>
//             {formatDate(article.publishedAt)}
//           </time>
//         </div>
//       </div>
//     </article>
//   );
// }

// export default function NewsPage() {
//   const { data: articles, isLoading } = useApiData(
//     () => api.getNews().then((result) => result.articles),
//     FALLBACK_NEWS,
//   );

//   return (
//     <>
//       <section className="bg-gradient-to-r from-brand-50 via-brand-100 to-white">
//         <div className="container-page py-16 sm:py-20">
//           <h1 className="text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
//             Global reach.
//             <br />
//             Trusted exchange.
//           </h1>

//           <p className="mt-4 max-w-lg text-sm leading-relaxed text-ink-muted sm:text-base">
//             Connecting you to the world with secure, transparent and reliable forex services.
//           </p>
//         </div>
//       </section>

//       <section className="py-16 sm:py-20">
//         <div className="container-page">
//           <SectionHeading
//             title="Latest news"
//             description="Stay up to date with the latest news and events from Hmax Money Exchange Pvt Ltd."
//           />

//           {isLoading ? (
//             <div className="mt-12 grid gap-6 lg:grid-cols-2" aria-hidden="true">
//               {[0, 1, 2].map((card) => (
//                 <div key={card} className="h-64 animate-pulse rounded-xl bg-brand-50" />
//               ))}
//             </div>
//           ) : (
//             <div className="mt-12 grid gap-6 lg:grid-cols-2">
//               {articles.map((article) => (
//                 <NewsCard key={article.slug} article={article} isWide={article.isFeatured} />
//               ))}
//             </div>
//           )}
//         </div>
//       </section>
//     </>
//   );
// }


import { api } from "../lib/api.js";
import { useApiData } from "../lib/useApiData.js";
import { formatDate } from "../lib/format.js";
import { FALLBACK_NEWS } from "../data/fallbackData.js";
import backgroundImage from "../assets/images/background.png";
import eroupImage from "../assets/images/eroup.png";
import reserveBankImage from "../assets/images/reserve-bank.png";
import FlightT from "../assets/images/fight-t.png";

const NEWS_IMAGES = [
  eroupImage,
  reserveBankImage,
  FlightT,
];

function NewsIcon() {
  return (
    <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-[#EAF3FF]">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#0875E1"
        strokeWidth="1.8"
        className="h-6 w-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 3.5h9.5L19 7v13.5H6V3.5Z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 3.5V7h4"
        />
        <path
          strokeLinecap="round"
          d="M9 10h6M9 13h6M9 16h4"
        />
      </svg>
    </div>
  );
}

function NewsCard({ article, index }) {
  const image = article.image || NEWS_IMAGES[index % NEWS_IMAGES.length];
  // Determine if it should be full width (either explicitly featured or the first item)
  const isFeatured = index === 0 || article.isFeatured;

  return (
    <article
      className={`group relative overflow-hidden rounded-md border border-gray-200 bg-cover bg-center bg-no-repeat ${
        isFeatured
          ? "sm:col-span-2 h-[280px] sm:h-[300px]"
          : "h-[300px] sm:h-[320px]"
      }`}
      style={{
        backgroundImage: `url(${image})`,
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-[#001B3D]/45 transition duration-300 group-hover:bg-[#001B3D]/55" />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-between px-5 py-5 text-center">
        {/* Category */}
        <p className={`font-semibold text-white ${isFeatured ? "text-lg sm:text-xl" : "text-base sm:text-lg"}`}>
          {article.category}
        </p>

        {/* Middle Content */}
        <div className="flex flex-col items-center">
          <h3
            className={`max-w-[700px] font-normal leading-tight text-white ${
              isFeatured
                ? "text-lg sm:text-xl"
                : "text-base sm:text-lg"
            }`}
          >
            {article.title}
          </h3>

          {article.excerpt && (
            <p className="mt-2 max-w-[650px] text-xs leading-relaxed text-white/90 sm:text-sm">
              {article.excerpt}
            </p>
          )}
        </div>

        {/* Bottom */}
        <div className="flex flex-col items-center gap-2">
          <button
            type="button"
            className="rounded-sm bg-[#0069D9] px-4 py-2 text-[10px] font-semibold text-white transition hover:bg-[#0056B3]"
          >
            Read More
          </button>

          {article.publishedAt && (
            <time
              dateTime={article.publishedAt}
              className="hidden text-[10px] text-white/80"
            >
              {formatDate(article.publishedAt)}
            </time>
          )}
        </div>
      </div>
    </article>
  );
}

export default function NewsPage() {
  const { data: articles, isLoading } = useApiData(
    () => api.getNews().then((result) => result.articles),
    FALLBACK_NEWS
  );

  return (
    <main className="bg-white">
      {/* ================= HERO ================= */}
      <section
        className="relative min-h-[230px] overflow-hidden bg-cover bg-center bg-no-repeat sm:min-h-[320px] lg:min-h-[420px]"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      >
        <div className="container-page relative z-10 flex min-h-[230px] items-center sm:min-h-[320px] lg:min-h-[420px]">
          <div className="max-w-[420px]">
            <h1 className="text-3xl font-extrabold leading-[0.95] text-[#0753A6] sm:text-4xl lg:text-5xl">
              Global Reach.
              <br />
              Trusted Exchange.
            </h1>

            <p className="mt-4 max-w-[390px] text-xs leading-relaxed text-black sm:text-sm">
              Connecting you to the world with secure, transparent and
              reliable forex services.
            </p>
          </div>
        </div>
      </section>

      {/* ================= LATEST NEWS ================= */}
      <section className="px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
        <div className="mx-auto max-w-[1180px]">
          {/* Heading */}
          <div className="text-center">
            <NewsIcon />

            <h2 className="mt-4 text-2xl font-semibold text-[#0061C9] sm:text-3xl">
              Latest News
            </h2>

            <p className="mx-auto mt-2 max-w-[650px] text-xs leading-relaxed text-gray-700 sm:text-sm">
              Stay up to date with the latest news and events from Hmax Money
              Exchange Pvt Ltd.
            </p>
          </div>

          {isLoading && (
            <div className="mt-9 grid gap-3 sm:grid-cols-2">
              <div className="h-[280px] animate-pulse rounded-md bg-gray-200 sm:col-span-2" />
              <div className="h-[300px] animate-pulse rounded-md bg-gray-200" />
              <div className="h-[300px] animate-pulse rounded-md bg-gray-200" />
            </div>
          )}

          {!isLoading && articles?.length > 0 && (
            <div className="mx-auto mt-9 grid max-w-[1150px] gap-3 sm:grid-cols-2">
              {articles.map((article, index) => (
                <NewsCard
                  key={article.slug || index}
                  article={article}
                  index={index}
                />
              ))}
            </div>
          )}
          {!isLoading && (!articles || articles.length === 0) && (
            <div className="mx-auto mt-9 max-w-[600px] rounded-md bg-[#F3F8FD] px-6 py-10 text-center">
              <p className="text-sm text-gray-500">
                No news articles available at the moment.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}


