import { useState } from 'react';
import { api } from '../lib/api.js';
import { useApiData } from '../lib/useApiData.js';
import { FALLBACK_BRANCHES } from '../data/fallbackData.js';
import FormStatus from '../components/common/FormStatus.jsx';
import SmartMan from '../assets/images/smart-man.png';
const EMPTY_FORM = {
  name: '',
  email: '',
  phone: '',
  message: '',
};

function MailIcon({ className = '' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

function PhoneIcon({ className = '' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92Z" />
    </svg>
  );
}

function LocationIcon({ className = '' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function ChevronRightIcon({ className = '' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="m9 6 6 6-6 6" />
    </svg>
  );
}

export default function ContactPage() {
  const [form, setForm] = useState(EMPTY_FORM);
  const [status, setStatus] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Get branch data
  const { data: branches = [] } = useApiData(
    () => api.getBranches().then((result) => result.branches),
    FALLBACK_BRANCHES,
  );

  // Update form fields
  const updateField = (field, value) => {
    // Phone number: digits only, capped at 10
    if (field === 'phone') {
      value = value.replace(/\D/g, '').slice(0, 10);
    }

    setForm((current) => ({
      ...current,
      [field]: value,
    }));

    // Remove field error while typing
    if (fieldErrors[field]) {
      setFieldErrors((current) => ({
        ...current,
        [field]: '',
      }));
    }
  };

  // Submit contact form
  const handleSubmit = async (event) => {
    event.preventDefault();

    setStatus(null);
    setFieldErrors({});

    // Phone number must be exactly 10 digits
    if (form.phone.length !== 10) {
      setFieldErrors({ phone: 'must be exactly 10 digits' });
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await api.submitContactMessage(form);

      setStatus({
        type: 'success',
        message: result.message,
      });

      setForm(EMPTY_FORM);
    } catch (error) {
      setStatus({
        type: 'error',
        message: error.message || 'Something went wrong. Please try again.',
      });

      setFieldErrors(error.details ?? {});
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main>
      <section className="relative h-[230px] w-full overflow-hidden sm:h-[280px] lg:h-[320px]">
        {/* Background Image */}
        <img
          src={SmartMan}
          alt="Reliable Support and Trusted Service"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-white/20" />

        {/* Hero Content */}
        <div className="relative z-10 flex h-full items-center">
          <div className="container-page">
            <h1 className="max-w-xl text-3xl font-extrabold leading-[0.95] text-[#0755a0] sm:text-4xl lg:text-5xl">
              Reliable Support.
              <br />
              Trusted Service.
            </h1>
          </div>
        </div>
      </section>
      <section className="py-16 sm:py-20">
        <div className="container-page grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="text-2xl font-bold text-ink sm:text-3xl">
              Contact us
            </h2>

            <p className="mt-3 text-sm leading-relaxed text-ink-muted">
              Have a question or need assistance? Send us a message and our
              team will get back to you.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5" noValidate>
              {/* Name */}
              <div>
                <label htmlFor="contact-name" className="field-label">
                  Name
                </label>

                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  value={form.name}
                  onChange={(event) => updateField('name', event.target.value)}
                  aria-invalid={Boolean(fieldErrors.name)}
                  className="field-input"
                  placeholder="Enter your name"
                />

                {fieldErrors.name && (
                  <p className="mt-1 text-xs text-red-600">
                    Name {fieldErrors.name}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="contact-email" className="field-label">
                  Email
                </label>

                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={form.email}
                  onChange={(event) => updateField('email', event.target.value)}
                  aria-invalid={Boolean(fieldErrors.email)}
                  className="field-input"
                  placeholder="Enter your email"
                />

                {fieldErrors.email && (
                  <p className="mt-1 text-xs text-red-600">
                    Email {fieldErrors.email}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="contact-phone" className="field-label">
                  Phone number
                </label>

                <input
                  id="contact-phone"
                  name="phone"
                  type="tel"
                  required
                  inputMode="numeric"
                  pattern="[0-9]{10}"
                  maxLength={10}
                  autoComplete="tel"
                  value={form.phone}
                  onChange={(event) => updateField('phone', event.target.value)}
                  aria-invalid={Boolean(fieldErrors.phone)}
                  className="field-input"
                  placeholder="Enter your 10-digit phone number"
                />

                {fieldErrors.phone && (
                  <p className="mt-1 text-xs text-red-600">
                    Phone number {fieldErrors.phone}
                  </p>
                )}
              </div>

              {/* Message */}
              <div>
                <label htmlFor="contact-message" className="field-label">
                  Message
                </label>

                <textarea
                  id="contact-message"
                  name="message"
                  rows={5}
                  required
                  value={form.message}
                  onChange={(event) => updateField('message', event.target.value)}
                  aria-invalid={Boolean(fieldErrors.message)}
                  className="field-input resize-y"
                  placeholder="Type your message..."
                />

                {fieldErrors.message && (
                  <p className="mt-1 text-xs text-red-600">
                    Message {fieldErrors.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? 'Sending...' : 'Send message'}
              </button>

              {/* Form Status */}
              <FormStatus type={status?.type} message={status?.message} />
            </form>
          </div>

          {/* =====================================================
              BRANCH DETAILS
              Each branch renders: a mail/phone icon header, the
              email + phone numbers, then a location block with an
              address and a "Get directions" link.
          ===================================================== */}
          <div className="space-y-8">
            {branches.map((branch) => (
              <div
                key={branch.label}
                className="space-y-5 border-b border-brand-100 pb-8 last:border-0"
              >
                {/* Contact icons + details */}
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <MailIcon className="h-5 w-5 text-brand-600" />
                    <p className="mt-2 text-sm font-semibold text-brand-600">
                      Email
                    </p>

                    <div className="mt-1 space-y-1">
                      {(branch.emails ?? [branch.email]).filter(Boolean).map((email) => (
                        <a
                          key={email}
                          href={`mailto:${email}`}
                          className="block break-all text-sm text-ink-muted underline transition hover:text-brand-600"
                        >
                          {email}
                        </a>
                      ))}
                    </div>
                  </div>

                  <div>
                    <PhoneIcon className="h-5 w-5 text-brand-600" />
                    <p className="mt-2 text-sm font-semibold text-brand-600">
                      Phone
                    </p>

                    <div className="mt-1 space-y-1">
                      {branch.phones?.map((phone) => (
                        <a
                          key={phone}
                          href={`tel:${phone}`}
                          className="block text-sm text-ink-muted transition hover:text-brand-600"
                        >
                          {phone}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Location + address */}
                <div className="flex gap-3">
                  <LocationIcon className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" />

                  <div>
                    <h3 className="text-base font-bold text-brand-600">
                      {branch.label}
                    </h3>

                    <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                      HMAX Money Exchange Pvt Ltd
                      <br />
                      {branch.address}
                      <br />
                      {branch.city} – {branch.pincode}
                    </p>

                    {branch.mapUrl && (
                      <a
                        href={branch.mapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 inline-flex items-center text-sm font-semibold text-brand-600 transition hover:text-brand-700"
                      >
                        Get directions
                        <ChevronRightIcon className="ml-1 h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
            {branches.length === 0 && (
              <div className="rounded-lg border border-brand-100 p-6">
                <p className="text-sm text-ink-muted">
                  Branch information is currently unavailable.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}