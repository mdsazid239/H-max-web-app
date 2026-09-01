import { Link } from 'react-router-dom';
export default function BranchCta() {
  return (
    <section className="bg-brand-50 py-16 sm:py-20">
      <div className="container-page text-center">
        <p className="text-xs font-semibold tracking-[0.2em] text-ink-muted">Visit us</p>
        <h2 className="mt-2 text-3xl font-bold sm:text-4xl">We&rsquo;re near you</h2>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-ink-muted sm:text-base">
          Two conveniently located branches in Mumbai Fort and Dombivli, ready to serve you in
          person. Or let us come to you.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Link to="/contact" className="btn-primary">
            Find a branch
          </Link>
          <Link to="/contact" className="btn-outline">
            Send us a message
          </Link>
        </div>
      </div>
    </section>
  );
}
