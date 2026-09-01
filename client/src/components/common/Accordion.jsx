import { useState } from 'react';

/**
 * Question list where one answer is open at a time — the FAQ pattern from
 * the design. Built on real buttons so it works with a keyboard.
 */
export default function Accordion({ items }) {
  const [openIndex, setOpenIndex] = useState(0);

  if (items.length === 0) {
    return (
      <p className="py-8 text-sm text-ink-muted">
        No questions in this section yet. Call us on 7710033233 and we will answer directly.
      </p>
    );
  }

  return (
    <div className="divide-y divide-brand-100">
      {items.map((item, index) => {
        const isOpen = index === openIndex;

        return (
          <div key={item.question}>
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? -1 : index)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 py-5 text-left"
            >
              <span className="text-sm font-medium text-brand-700 sm:text-base">
                {item.question}
              </span>

              <svg
                viewBox="0 0 20 20"
                aria-hidden="true"
                className={`h-4 w-4 shrink-0 fill-brand-600 transition-transform ${
                  isOpen ? 'rotate-180' : ''
                }`}
              >
                <path d="M5 7l5 6 5-6z" />
              </svg>
            </button>

            {isOpen && (
              <p className="pb-5 pr-8 text-sm leading-relaxed text-ink-muted">
                {item.answer}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
