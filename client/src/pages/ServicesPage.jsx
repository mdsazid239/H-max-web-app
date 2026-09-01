import { Link } from 'react-router-dom';
import { SERVICE_BANNERS } from '../data/siteContent.js';

/**
 * Full-bleed banners, one per service.
 * The gradients stand in for the photography in the design — drop the
 * final images into client/public/images and swap the background here.
 */
const BANNER_BACKGROUNDS = [
  'from-brand-800 via-brand-600 to-brand-400',
  'from-slate-800 via-slate-600 to-slate-400',
  'from-brand-900 via-brand-800 to-brand-600',
];

export default function ServicesPage() {
  return (
    <div>
      {SERVICE_BANNERS.map((banner, index) => (
        <Link
          key={banner.title}
          to={banner.to}
          className={`group relative flex min-h-[260px] items-center justify-center bg-gradient-to-br px-6 py-20 text-center sm:min-h-[320px] lg:min-h-[380px] ${
            BANNER_BACKGROUNDS[index % BANNER_BACKGROUNDS.length]
          }`}
        >
          <div className="absolute inset-0 bg-black/25" aria-hidden="true" />

          <div className="relative">
            <h2 className="text-3xl font-extrabold uppercase tracking-wide text-white sm:text-4xl lg:text-5xl">
              {banner.title}
            </h2>

            <p className="mx-auto mt-4 max-w-md text-sm text-white/85 sm:text-base">
              {banner.description}
            </p>

            <span className="mt-6 inline-block text-sm font-semibold text-white underline-offset-4 group-hover:underline">
              View details
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
