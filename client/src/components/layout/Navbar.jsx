import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import Logo from '../common/Logo.jsx';
import { NAV_LINKS } from '../../data/siteContent.js';

/**
 * Sticky header. Below the `lg` breakpoint the links collapse into a
 * slide-down menu so the bar stays usable on phones.
 */
export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const linkClasses = ({ isActive }) =>
    `text-sm font-medium transition-colors ${
      isActive ? 'text-brand-600' : 'text-ink hover:text-brand-600'
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-brand-50 bg-white/95 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between gap-4 sm:h-20">
        <Logo />

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Main">
          {NAV_LINKS.map((link) => (
            <NavLink key={link.to} to={link.to} className={linkClasses}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link to="/currency-exchange" className="btn-primary">
            Personal
          </Link>
          <Link to="/contact" className="btn-outline">
            Corporate
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setIsMenuOpen((open) => !open)}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          className="rounded-md p-2 text-brand-700 lg:hidden"
        >
          <span className="sr-only">{isMenuOpen ? 'Close menu' : 'Open menu'}</span>
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
            {isMenuOpen ? (
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {isMenuOpen && (
        <nav id="mobile-menu" className="border-t border-brand-50 bg-white lg:hidden" aria-label="Main">
          <div className="container-page flex flex-col py-4">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `border-b border-brand-50 py-3 text-sm font-medium ${
                    isActive ? 'text-brand-600' : 'text-ink'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}

            <div className="mt-4 flex gap-3">
              <Link to="/currency-exchange" className="btn-primary flex-1">
                Personal
              </Link>
              <Link to="/contact" className="btn-outline flex-1">
                Corporate
              </Link>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
