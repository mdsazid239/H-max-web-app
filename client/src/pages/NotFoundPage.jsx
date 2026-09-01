import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <section className="container-page flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <p className="font-display text-5xl font-extrabold text-brand-600">404</p>

      <h1 className="mt-4 text-2xl font-bold sm:text-3xl">This page has moved or never existed</h1>

      <p className="mt-3 max-w-md text-sm text-ink-muted">
        Check the address, or head back to the home page to find live rates, branches and
        contact details.
      </p>

      <Link to="/" className="btn-primary mt-8">
        Back to home
      </Link>
    </section>
  );
}
