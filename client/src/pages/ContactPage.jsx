import { useState } from 'react';
import { api } from '../lib/api.js';
import { useApiData } from '../lib/useApiData.js';
import { FALLBACK_BRANCHES } from '../data/fallbackData.js';
import FormStatus from '../components/common/FormStatus.jsx';

const EMPTY_FORM = { name: '', email: '', phone: '', message: '' };

export default function ContactPage() {
  const [form, setForm] = useState(EMPTY_FORM);
  const [status, setStatus] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: branches } = useApiData(
    () => api.getBranches().then((result) => result.branches),
    FALLBACK_BRANCHES,
  );

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus(null);
    setFieldErrors({});
    setIsSubmitting(true);

    try {
      const result = await api.submitContactMessage(form);
      setStatus({ type: 'success', message: result.message });
      setForm(EMPTY_FORM);
    } catch (error) {
      setStatus({ type: 'error', message: error.message });
      setFieldErrors(error.details ?? {});
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <section className="bg-gradient-to-r from-brand-50 via-brand-100 to-white">
        <div className="container-page py-16 sm:py-20">
          <h1 className="text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
            Reliable support.
            <br />
            Trusted service.
          </h1>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="container-page grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Message form */}
          <div>
            <h2 className="text-2xl font-bold text-ink sm:text-3xl">Contact us</h2>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5" noValidate>
              <div>
                <label htmlFor="contact-name" className="field-label">
                  Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  value={form.name}
                  onChange={(event) => updateField('name', event.target.value)}
                  aria-invalid={Boolean(fieldErrors.name)}
                  className="field-input"
                />
                {fieldErrors.name && (
                  <p className="mt-1 text-xs text-red-600">Name {fieldErrors.name}</p>
                )}
              </div>

              <div>
                <label htmlFor="contact-email" className="field-label">
                  Email
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(event) => updateField('email', event.target.value)}
                  aria-invalid={Boolean(fieldErrors.email)}
                  className="field-input"
                />
                {fieldErrors.email && (
                  <p className="mt-1 text-xs text-red-600">Email {fieldErrors.email}</p>
                )}
              </div>

              <div>
                <label htmlFor="contact-phone" className="field-label">
                  Phone number
                </label>
                <input
                  id="contact-phone"
                  type="tel"
                  required
                  value={form.phone}
                  onChange={(event) => updateField('phone', event.target.value)}
                  aria-invalid={Boolean(fieldErrors.phone)}
                  className="field-input"
                />
                {fieldErrors.phone && (
                  <p className="mt-1 text-xs text-red-600">Phone number {fieldErrors.phone}</p>
                )}
              </div>

              <div>
                <label htmlFor="contact-message" className="field-label">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  rows="5"
                  required
                  value={form.message}
                  onChange={(event) => updateField('message', event.target.value)}
                  placeholder="Type your message…"
                  aria-invalid={Boolean(fieldErrors.message)}
                  className="field-input resize-y"
                />
                {fieldErrors.message && (
                  <p className="mt-1 text-xs text-red-600">Message {fieldErrors.message}</p>
                )}
              </div>

              <button type="submit" disabled={isSubmitting} className="btn-primary">
                {isSubmitting ? 'Sending…' : 'Send message'}
              </button>

              <FormStatus type={status?.type} message={status?.message} />
            </form>
          </div>

          {/* Branch details */}
          <div className="space-y-8">
            {branches.map((branch) => (
              <div key={branch.label} className="border-b border-brand-100 pb-8 last:border-0">
                <h3 className="flex items-center gap-2 text-lg font-bold">
                  <span aria-hidden="true">📍</span>
                  {branch.label}
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                  HMAX Money Exchange Pvt Ltd
                  <br />
                  {branch.address}
                  <br />
                  {branch.city} – {branch.pincode}
                </p>

                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <div>
                    <p className="text-sm font-semibold text-brand-600">Email</p>
                    <a
                      href={`mailto:${branch.email}`}
                      className="mt-1 block text-sm text-ink-muted underline hover:text-brand-600"
                    >
                      {branch.email}
                    </a>
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-brand-600">Phone</p>
                    {branch.phones.map((phone) => (
                      <a
                        key={phone}
                        href={`tel:${phone}`}
                        className="mt-1 block text-sm text-ink-muted hover:text-brand-600"
                      >
                        {phone}
                      </a>
                    ))}
                  </div>
                </div>

                {branch.mapUrl && (
                  <a
                    href={branch.mapUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 inline-block text-sm font-semibold text-brand-600 hover:text-brand-700"
                  >
                    Get directions →
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
