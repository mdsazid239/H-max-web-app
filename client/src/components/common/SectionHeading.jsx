/**
 * Centred section title used across the site, with an optional small
 * label above it and a supporting line below.
 */
export default function SectionHeading({ eyebrow, title, description, className = '' }) {
  return (
    <div className={`mx-auto max-w-2xl text-center ${className}`}>
      {eyebrow && (
        <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-ink-muted">
          {eyebrow}
        </p>
      )}

      <h2 className="text-3xl font-bold leading-tight sm:text-4xl">{title}</h2>

      {description && (
        <p className="mt-4 text-sm leading-relaxed text-ink-muted sm:text-base">
          {description}
        </p>
      )}
    </div>
  );
}
