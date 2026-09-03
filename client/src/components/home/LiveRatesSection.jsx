import { useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../lib/api.js';
import { useApiData } from '../../lib/useApiData.js';
import { formatUpdatedAt } from '../../lib/format.js';
import { FALLBACK_RATES } from '../../data/fallbackData.js';
import RatesTable from '../common/RatesTable.jsx';
import map from '../../assets/images/map-w.png';
const TABS = [
  { id: 'currency', label: 'Currency rates' },
  { id: 'travel_card', label: 'Travel card rates' },
];
export default function LiveRatesSection() {
  const [rateType, setRateType] = useState('currency');
  const { data, isLoading } = useApiData(
    () => api.getRates(rateType),
    { rates: FALLBACK_RATES[rateType], updatedAt: null },
    [rateType],
  );
  return (
    <section className="bg-brand-50/50 py-16 sm:py-20">
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] text-ink-muted">
              Today&rsquo;s rates
            </p>
            <h2 className="mt-2 text-3xl font-bold sm:text-4xl">Live exchange rates</h2>
          </div>
          {data.updatedAt && (
            <p className="text-xs text-ink-muted">
              Updated: {formatUpdatedAt(data.updatedAt)}
            </p>
          )}
        </div>
        <div className="mt-8 rounded-xl border border-brand-100 bg-white p-5 shadow-card sm:p-7">
          <div className="mb-6 flex gap-6 border-b border-brand-100" role="tablist">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                id={`rates-tab-${tab.id}`}
                aria-selected={rateType === tab.id}
                aria-controls="rates-panel"
                onClick={() => setRateType(tab.id)}
                className={`-mb-px border-b-2 pb-3 text-sm font-medium transition-colors ${
                  rateType === tab.id
                    ? 'border-brand-600 text-brand-600'
                    : 'border-transparent text-ink-muted hover:text-brand-600'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div
            id="rates-panel"
            role="tabpanel"
            aria-labelledby={`rates-tab-${rateType}`}
            className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-center"
          >
            <RatesTable rates={data.rates} isLoading={isLoading} />
            <div className="flex flex-col items-center gap-6">
              <img
                src={map}
                alt=""
                className="hidden w-full max-w-[440px] object-contain lg:block"
              />
              <Link to="/currency-exchange" className="btn-outline lg:self-end">
                View all currencies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

