import { formatRupees } from '../../lib/format.js';

/**
 * Buy / sell table used on the home page and the currency exchange page.
 * On phones the table scrolls sideways rather than squashing the columns.
 */
export default function RatesTable({ rates, isLoading = false }) {
  if (isLoading) {
    return (
      <div className="space-y-2 py-4" aria-hidden="true">
        {[0, 1, 2, 3, 4, 5].map((row) => (
          <div key={row} className="h-11 animate-pulse rounded bg-brand-50" />
        ))}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[420px] border-collapse text-sm">
        <thead>
          <tr className="border-b border-brand-100 text-left">
            <th scope="col" className="py-3 pr-4 font-semibold text-ink-muted">
              Currency
            </th>
            <th scope="col" className="py-3 pr-4 font-semibold text-ink-muted">
              We Buy
            </th>
            <th scope="col" className="py-3 font-semibold text-ink-muted">
              We Sell
            </th>
          </tr>
        </thead>

        <tbody>
          {rates.map((rate) => (
            <tr key={rate.code} className="border-b border-brand-50 last:border-0">
              <th scope="row" className="py-3 pr-4 text-left font-normal">
                <span className="flex items-center gap-3">
                  <span aria-hidden="true" className="text-lg">
                    {rate.flagEmoji}
                  </span>

                  <span>
                    <span className="block font-semibold text-brand-700">{rate.code}</span>
                    <span className="block text-xs text-ink-muted">{rate.name}</span>
                  </span>
                </span>
              </th>

              <td className="py-3 pr-4 font-semibold text-brand-600">
                {formatRupees(rate.buyRate)}
              </td>

              <td className="py-3 font-semibold text-sell">{formatRupees(rate.sellRate)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
