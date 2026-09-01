import { Link } from 'react-router-dom';

/**
 * Wordmark used in the header and footer.
 * Replace the SVG bird with the supplied brand asset when it is available.
 */
export default function Logo({ className = '' }) {
  return (
    <Link to="/" className={`inline-flex items-center gap-2 ${className}`}>
      <svg
        viewBox="0 0 40 28"
        className="h-7 w-9 shrink-0 text-brand-500"
        aria-hidden="true"
        fill="currentColor"
      >
        <path d="M2 14 18 4l-3 8 12-6-4 9 13-7-15 15-2-5-8 5 3-7z" />
      </svg>

      <span className="leading-none">
        <span className="block font-display text-2xl font-extrabold tracking-tight text-brand-700">
          Hm<span className="text-brand-500">A</span>X
        </span>
        <span className="mt-0.5 block text-[9px] font-medium tracking-wide text-ink-muted">
          Your Money Changer
        </span>
      </span>

      <span className="sr-only">HMAX Money Exchange — home</span>
    </Link>
  );
}
