import { useState } from 'react';
import { api } from '../lib/api.js';
import { useApiData } from '../lib/useApiData.js';
import { FALLBACK_FAQS } from '../data/fallbackData.js';
import { FAQ_TABS } from '../data/siteContent.js';
import Accordion from '../components/common/Accordion.jsx';

export default function FaqPage() {
  const [activeTab, setActiveTab] = useState('general');

  const { data: faqs, isLoading } = useApiData(
    () => api.getFaqs(activeTab).then((result) => result.faqs),
    FALLBACK_FAQS.filter((faq) => faq.category === activeTab),
    [activeTab],
  );

  return (
    <>
      <section className="bg-gradient-to-r from-brand-50 via-brand-100 to-white">
        <div className="container-page py-16 sm:py-20">
          <h1 className="text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
            Your questions.
            <br />
            Expertly answered.
          </h1>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold">FAQs</h2>
            <p className="mt-3 text-sm text-ink-muted sm:text-base">
              Answers to the questions we are asked most often about our services.
            </p>
          </div>

          {/* Category tabs — stacked on phones, inline from small screens up */}
          <div
            role="tablist"
            className="mx-auto mt-10 flex max-w-2xl flex-col overflow-hidden rounded-lg border border-brand-200 sm:flex-row"
          >
            {FAQ_TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={activeTab === tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 border-b border-brand-200 px-4 py-3 text-sm font-semibold transition-colors last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0 ${
                  activeTab === tab.id
                    ? 'bg-brand-600 text-white'
                    : 'bg-white text-brand-700 hover:bg-brand-50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:items-start">
            <div className="hidden aspect-[4/3] items-center justify-center rounded-xl bg-gradient-to-br from-brand-100 to-brand-300 lg:flex">
              <span aria-hidden="true" className="text-7xl text-white">
                ?
              </span>
            </div>

            <div>
              {isLoading ? (
                <div className="space-y-3" aria-hidden="true">
                  {[0, 1, 2, 3].map((row) => (
                    <div key={row} className="h-14 animate-pulse rounded bg-brand-50" />
                  ))}
                </div>
              ) : (
                <Accordion items={faqs} />
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
