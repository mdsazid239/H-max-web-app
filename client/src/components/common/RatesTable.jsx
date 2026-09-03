import { formatRupees } from '../../lib/format.js';
import AED from '../../assets/images/AED.png';
import AUD from '../../assets/images/AUD.png';
import CHF from '../../assets/images/CHF.png';
import EUR from '../../assets/images/EUR.png';
import GBP from '../../assets/images/GBP.png';
import USD from '../../assets/images/USD.png';
const FLAG_ICONS = {
  AED,
  AUD,
  CHF,
  EUR,
  GBP,
  USD,
};

/** Rate rows only - the section around it owns the layout. */
export default function RatesTable({ rates = [], isLoading = false }) {
  if (isLoading) {
    return (
      <div className="space-y-2" aria-hidden="true">
        {[0, 1, 2, 3, 4, 5].map((row) => (
          <div key={row} className="h-[58px] animate-pulse rounded-md bg-brand-50" />
        ))}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[420px] border-separate border-spacing-y-2 text-sm">
        <thead>
          <tr>
            <th scope="col" className="w-1/2 pb-1 text-left">
              <span className="sr-only">Currency</span>
            </th>

            <th
              scope="col"
              className="w-1/4 pb-1 text-left text-xs font-bold uppercase tracking-wider text-brand-600"
            >
              We buy
            </th>

            <th
              scope="col"
              className="w-1/4 pb-1 text-left text-xs font-bold uppercase tracking-wider text-brand-600"
            >
              We sell
            </th>
          </tr>
        </thead>

        <tbody>
          {rates.map((rate) => (
            <tr key={rate.code} className="bg-brand-600 text-white">
              <th scope="row" className="rounded-l-md py-3 pl-4 pr-4 text-left font-normal">
                <span className="flex items-center gap-3">
                  <img
                    src={FLAG_ICONS[rate.code]}
                    alt=""
                    className="h-5 w-7 shrink-0 rounded-[2px] object-cover"
                  />

                  <span>
                    <span className="block font-semibold leading-tight">{rate.code}</span>

                    <span className="block text-[11px] leading-tight text-white/70">
                      {rate.name}
                    </span>
                  </span>
                </span>
              </th>

              <td className="py-3 pr-4 font-semibold text-buy">
                {formatRupees(rate.buyRate)}
              </td>

              <td className="rounded-r-md py-3 pr-4 font-semibold text-sell">
                {formatRupees(rate.sellRate)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}