// import { Link } from "react-router-dom";
// import QuoteForm from "./QuoteForm.jsx";
// import heroBackground from "../../assets/images/image-3.png";
// const HERO_BADGES = [
//   {
//     icon: "🏛️",
//     title: "RBI Authorized",
//     detail: "AD Category II",
//   },
//   {
//     icon: "🔒",
//     title: "100% Secure",
//     detail: "SSL Encrypted",
//   },
//   {
//     icon: "⚡",
//     title: "Same-Day",
//     detail: "Order Processing",
//   },
// ];

// export default function HeroSection() {
//   return (
//     <section
//       className="relative min-h-[650px] overflow-hidden bg-cover bg-center bg-no-repeat"
//       style={{
//         backgroundImage: `url(${heroBackground})`,
//       }}
//     >
//       {/* Light overlay */}
//       <div className="absolute inset-0 bg-white/20" />

//       <div className="container-page relative z-10 grid items-center gap-10 py-14 lg:grid-cols-2 lg:gap-16 lg:py-20">
        
//         {/* Left Content */}
//         <div>
//           <h1 className="text-4xl font-extrabold leading-[1.1] sm:text-5xl lg:text-6xl">
//             Your Trusted
//             <br />
//             Forex Partner.
//           </h1>

//           <p className="mt-4 text-base font-semibold text-brand-600">
//             Building trust and transparency with every transaction.
//           </p>

//           <p className="mt-4 max-w-lg text-sm leading-relaxed text-ink-muted sm:text-base">
//             Mumbai&rsquo;s trusted partner for foreign currency exchange,
//             outward remittances, and multi-currency travel cards.
//             Transparent rates, zero hidden charges, backed by 9 years of trust.
//           </p>

//           {/* CTA Buttons */}
//           <div className="mt-7 flex flex-wrap gap-3">
//             <Link to="/currency-exchange" className="btn-primary">
//               Explore Live Rates
//             </Link>

//             <Link to="/contact" className="btn-outline">
//               Talk to an Expert
//             </Link>
//           </div>

//           {/* Trust Badges */}
//           <ul className="mt-8 grid gap-4 sm:grid-cols-3">
//             {HERO_BADGES.map(({ icon, title, detail }) => (
//               <li key={title} className="flex items-center gap-2.5">
//                 <span aria-hidden="true" className="text-lg">
//                   {icon}
//                 </span>

//                 <span>
//                   <span className="block text-xs font-semibold text-brand-700">
//                     {title}
//                   </span>

//                   <span className="block text-[11px] text-ink-muted">
//                     {detail}
//                   </span>
//                 </span>
//               </li>
//             ))}
//           </ul>
//         </div>

//         {/* Right Quote Form */}
//         <div className="lg:justify-self-end lg:pl-6">
//           <QuoteForm />
//         </div>
//       </div>
//     </section>
//   );
// }

import { Link } from "react-router-dom";
import QuoteForm from "./QuoteForm.jsx";
import heroBackground from "../../assets/images/Background.png";

/* Swap these for the artwork you want; all three exist in assets/images. */
import RbiIcon from "../../assets/images/home.png";
import SecureIcon from "../../assets/images/lock.png";
import SameDayIcon from "../../assets/images/watch.png";

const HERO_BADGES = [
  {
    image: RbiIcon,
    title: "RBI Authorized",
    detail: "AD Category II",
  },
  {
    image: SecureIcon,
    title: "100% Secure",
    detail: "SSL Encrypted",
  },
  {
    image: SameDayIcon,
    title: "Same-Day",
    detail: "Order Processing",
  },
];

export default function HeroSection() {
  return (
    <section
      className="relative overflow-hidden bg-brand-50 bg-cover bg-center bg-no-repeat lg:min-h-[650px]"
      style={{ backgroundImage: `url(${heroBackground})` }}
    >
      {/* Keeps the copy readable over the artwork on small screens too. */}
      <div className="absolute inset-0 bg-white/70 lg:bg-white/20" />

      <div className="container-page relative z-10 grid items-center gap-10 py-12 sm:py-14 lg:grid-cols-2 lg:gap-16 lg:py-20">
        {/* Left content */}
        <div>
          <h1 className="text-3xl font-extrabold leading-[1.1] text-brand-700 sm:text-4xl lg:text-6xl">
            Your Trusted
            <br />
            Forex Partner.
          </h1>

          <p className="mt-4 text-sm font-semibold text-brand-600 sm:text-base">
            Building trust and transparency with every transaction.
          </p>

          <p className="mt-4 max-w-lg text-sm leading-relaxed text-ink-muted sm:text-base">
            Mumbai&rsquo;s trusted partner for foreign currency exchange, outward remittances,
            and multi-currency travel cards. Transparent rates, zero hidden charges, backed by
            9 years of trust.
          </p>

          {/* Calls to action */}
          <div className="mt-7 flex flex-wrap gap-3">
            <Link to="/currency-exchange" className="btn-primary">
              Explore Live Rates
            </Link>

            <Link to="/contact" className="btn-outline">
              Talk to an Expert
            </Link>
          </div>

          {/* Trust badges */}
          <ul className="mt-8 grid gap-4 sm:grid-cols-3">
            {HERO_BADGES.map(({ image, title, detail }) => (
              <li key={title} className="flex items-center gap-2.5">
                <img
                  src={image}
                  alt=""
                  aria-hidden="true"
                  className="h-7 w-7 shrink-0 object-contain"
                />

                <span>
                  <span className="block text-xs font-semibold text-brand-700">{title}</span>
                  <span className="block text-[11px] text-ink-muted">{detail}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right quote form */}
        <div className="w-full lg:justify-self-end lg:pl-6">
          <QuoteForm />
        </div>
      </div>
    </section>
  );
}