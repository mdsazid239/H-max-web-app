import { useState } from "react";
import { api } from "../lib/api.js";
import { useApiData } from "../lib/useApiData.js";
import { FALLBACK_FAQS } from "../data/fallbackData.js";
import { FAQ_TABS } from "../data/siteContent.js";
import Accordion from "../components/common/Accordion.jsx";
import What from "../assets/images/what-q.png";
import WhatQ1 from "../assets/images/what-q1.png";
export default function FaqPage() {
  const [activeTab, setActiveTab] = useState("general");
  const { data: faqs, isLoading } = useApiData(
    () => api.getFaqs(activeTab).then((result) => result.faqs),
    FALLBACK_FAQS.filter((faq) => faq.category === activeTab),
    [activeTab]
  );
  return (
    <main className="w-full bg-white">
      <section
        className="
          relative
          flex
          min-h-[220px]
          items-center
          bg-cover
          bg-center
          bg-no-repeat
          sm:min-h-[260px]
          lg:min-h-[300px]
        "
        style={{ backgroundImage: `url(${What})` }}
      >
        <div className="container-page w-full">
          <h1
            className="
              max-w-xl
              text-3xl
              font-extrabold
              leading-tight
              text-brand-700
              sm:text-4xl
              lg:text-5xl
            "
          >
            Your questions.
            <br />
            Expertly answered.
          </h1>
        </div>
      </section>
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="container-page">
          {/* Heading */}
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-brand-700 sm:text-4xl">
              FAQ'S
            </h2>

            <p className="mt-2 text-xs leading-5 text-ink-muted sm:text-sm">
              Get answers to frequently asked questions regarding our services.
            </p>
          </div>
          <div
            role="tablist"
            aria-label="FAQ categories"
            className="
              mx-auto
              mt-8
              flex
              w-full
              max-w-[370px]
              overflow-hidden
              border
              border-gray-400
              sm:mt-10
            "
          >
            {FAQ_TABS.map((tab) => {
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    flex-1
                    border-r
                    border-gray-400
                    px-2
                    py-2.5
                    text-[10px]
                    font-semibold
                    transition-colors
                    last:border-r-0
                    sm:px-4
                    sm:py-3
                    sm:text-xs
                    ${
                      isActive
                        ? "bg-brand-600 text-white"
                        : "bg-white text-gray-700 hover:bg-brand-50"
                    }
                  `}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Image + FAQ Accordion */}
          <div
            className="
              mt-8
              grid
              grid-cols-1
              gap-4
              lg:grid-cols-2
              lg:items-stretch
              lg:gap-6
            "
          >
            {/* Image */}
            <div className="w-full overflow-hidden">
              <img
                src={WhatQ1}
                alt="Frequently asked questions"
                loading="lazy"
                className="
                  block
                  h-[240px]
                  w-full
                  object-cover
                  object-center
                  sm:h-[320px]
                  lg:h-full
                  lg:min-h-[400px]
                "
              />
            </div>
            <div className="w-full">
              {isLoading ? (
                <div
                  className="space-y-2"
                  aria-label="Loading frequently asked questions"
                >
                  {[...Array(5)].map((_, index) => (
                    <div
                      key={index}
                      className="
                        h-11
                        animate-pulse
                        border-b
                        border-brand-200
                        bg-brand-50
                      "
                    />
                  ))}
                </div>
              ) : (
                <Accordion items={faqs ?? []} />
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}