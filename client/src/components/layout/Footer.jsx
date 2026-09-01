import { Link } from 'react-router-dom';
import Logo from '../common/Logo.jsx';
import { COMPANY, FOOTER_COLUMNS } from '../../data/siteContent.js';

const BRANCH_ADDRESSES = [
  '280 Shahid Bhagat Singh Road, Fort, Mumbai – 400001',
  'Shop No.3, Guru Prasad Building, Dombivli East, Mumbai – 421201',
];

export default function Footer() {
  return (
    <footer className="border-t border-brand-50 bg-white">
      <div className="container-page grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-muted">
            {COMPANY.blurb}
          </p>
        </div>

        {FOOTER_COLUMNS.map((column) => (
          <div key={column.title}>
            <h3 className="text-sm font-bold tracking-wide text-brand-600">{column.title}</h3>

            <ul className="mt-4 space-y-2.5">
              {column.links.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-sm text-ink-muted transition-colors hover:text-brand-600"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <h3 className="text-sm font-bold tracking-wide text-brand-600">Contact</h3>

          <ul className="mt-4 space-y-3 text-sm text-ink-muted">
            {BRANCH_ADDRESSES.map((address) => (
              <li key={address} className="flex gap-2">
                <span aria-hidden="true">📍</span>
                <span className="leading-relaxed">{address}</span>
              </li>
            ))}

            <li className="flex gap-2">
              <span aria-hidden="true">📞</span>
              <span>
                {COMPANY.primaryPhones.map((phone, index) => (
                  <span key={phone}>
                    {index > 0 && ' · '}
                    <a href={`tel:${phone}`} className="hover:text-brand-600">
                      {phone}
                    </a>
                  </span>
                ))}
              </span>
            </li>

            <li className="flex gap-2">
              <span aria-hidden="true">📧</span>
              <a href={`mailto:${COMPANY.primaryEmail}`} className="underline hover:text-brand-600">
                {COMPANY.primaryEmail}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-brand-50">
        <div className="container-page flex flex-col gap-3 py-5 text-xs text-ink-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {COMPANY.name}. All Rights Reserved. Regulated by
            Reserve Bank of India.
          </p>

          <div className="flex gap-6">
            <Link to="/terms" className="hover:text-brand-600">
              Terms of Use
            </Link>
            <Link to="/privacy" className="hover:text-brand-600">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
