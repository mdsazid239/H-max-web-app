// import { formatRupees } from "../../lib/format.js";
// import AED from "../../assets/images/AED.png";
// import AUD from "../../assets/images/AUD.png";
// import CHF from "../../assets/images/CHF.png";
// import EUR from "../../assets/images/EUR.png";
// import GBP from "../../assets/images/GBP.png";
// import USD from "../../assets/images/USD.png";

// const FLAG_ICONS = {
//   AED,
//   AUD,
//   CHF,
//   EUR,
//   GBP,
//   USD,
// };

// export default function RatesTable({ rates, isLoading = false }) {
//   if (isLoading) {
//     return (
//       <div className="space-y-2 py-4" aria-hidden="true">
//         {[0, 1, 2, 3, 4, 5].map((row) => (
//           <div key={row} className="h-11 animate-pulse rounded bg-brand-50" />
//         ))}
//       </div>
//     );
//   }

//   return (
//     <div className="overflow-x-auto">
//       <table className="w-full min-w-[420px] border-collapse text-sm">
//         <thead>
//           <tr className="border-b border-brand-100 text-left">
//             <th
//               scope="col"
//               className="py-3 pr-4 font-semibold text-ink-muted"
//             >
//               Currency
//             </th>

//             <th
//               scope="col"
//               className="py-3 pr-4 font-semibold text-ink-muted"
//             >
//               We Buy
//             </th>

//             <th
//               scope="col"
//               className="py-3 font-semibold text-ink-muted"
//             >
//               We Sell
//             </th>
//           </tr>
//         </thead>

//         <tbody>
//           {rates.map((rate) => (
//             <tr
//               key={rate.code}
//               className="border-b border-brand-50 last:border-0"
//             >
//               <th
//                 scope="row"
//                 className="py-3 pr-4 text-left font-normal"
//               >
//                 <span className="flex items-center gap-3">
                  
//                   {/* Flag Image */}
//                   <img
//                     src={FLAG_ICONS[rate.code]}
//                     alt={`${rate.code} flag`}
//                     className="h-6 w-9 object-cover"
//                   />

//                   <span>
//                     <span className="block font-semibold text-brand-700">
//                       {rate.code}
//                     </span>

//                     <span className="block text-xs text-ink-muted">
//                       {rate.name}
//                     </span>
//                   </span>
//                 </span>
//               </th>

//               <td className="py-3 pr-4 font-semibold text-brand-600">
//                 {formatRupees(rate.buyRate)}
//               </td>

//               <td className="py-3 font-semibold text-sell">
//                 {formatRupees(rate.sellRate)}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }


import { formatRupees } from "../../lib/format.js";

import AED from "../../assets/images/AED.png";
import AUD from "../../assets/images/AUD.png";
import CHF from "../../assets/images/CHF.png";
import EUR from "../../assets/images/EUR.png";
import GBP from "../../assets/images/GBP.png";
import USD from "../../assets/images/USD.png";
import map from "../../assets/images/map-w.png";

const FLAG_ICONS = {
  AED,
  AUD,
  CHF,
  EUR,
  GBP,
  USD,
};

export default function RatesTable({ rates, isLoading = false }) {
  if (isLoading) {
    return (
      <div className="space-y-2 py-4" aria-hidden="true">
        {[0, 1, 2, 3, 4, 5].map((row) => (
          <div
            key={row}
            className="h-11 animate-pulse rounded bg-brand-50"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-center">
      {/* LEFT - Rates Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[420px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-brand-100 text-left">
              <th
                scope="col"
                className="py-3 pr-4 font-semibold text-ink-muted"
              >
                Currency
              </th>

              <th
                scope="col"
                className="py-3 pr-4 font-semibold text-ink-muted"
              >
                We Buy
              </th>

              <th
                scope="col"
                className="py-3 font-semibold text-ink-muted"
              >
                We Sell
              </th>
            </tr>
          </thead>

          <tbody>
            {rates.map((rate) => (
              <tr
                key={rate.code}
                className="border-b border-brand-50 last:border-0"
              >
                <th
                  scope="row"
                  className="py-3 pr-4 text-left font-normal"
                >
                  <span className="flex items-center gap-3">
                    {/* Flag */}
                    <img
                      src={FLAG_ICONS[rate.code]}
                      alt={`${rate.code} flag`}
                      className="h-6 w-9 object-cover"
                    />

                    <span>
                      <span className="block font-semibold text-brand-700">
                        {rate.code}
                      </span>

                      <span className="block text-xs text-ink-muted">
                        {rate.name}
                      </span>
                    </span>
                  </span>
                </th>

                <td className="py-3 pr-4 font-semibold text-brand-600">
                  {formatRupees(rate.buyRate)}
                </td>

                <td className="py-3 font-semibold text-sell">
                  {formatRupees(rate.sellRate)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* RIGHT - Map */}
      <div className="hidden lg:flex items-center justify-center">
        <img
          src={map}
          alt="World map"
          className="w-full max-w-[500px] object-contain"
        />
      </div>
    </div>
  );
}