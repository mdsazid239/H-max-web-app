import { useState } from "react";
import BackgroundN from "../assets/images/background1.png";
import RightW from "../assets/images/right.png";
import Watch from "../assets/images/watch.png";
import Transparent from "../assets/images/transparent.png";
import NickBand from "../assets/images/nickband.png";
import BookWord from "../assets/images/book-word.png";
import BookWordN from "../assets/images/book-word1.png";
import BookWordNT from "../assets/images/book-word2.png";
import BookWordNL from "../assets/images/book-word3.png";
import AED from "../assets/images/AED.png";
import AUD from "../assets/images/AUD.png";
import CHF from "../assets/images/CHF.png";
import EUR from "../assets/images/EUR.png";
import GBP from "../assets/images/GBP.png";
import USD from "../assets/images/USD.png";
const BLUE = "#0054a6";
const features = [
  {
    title: "Safe & Secure",
    description: "RBI & FEMA compliant transactions",
    image: RightW,
  },
  {
    title: "Fast & Reliable",
    description: "Quick processing for timely transfers",
    image: Watch,
  },
  {
    title: "Transparent",
    description: "Clear rates with no hidden charges",
    image: Transparent,
  },
  {
    title: "Expert Support",
    description: "Assistance at every step of your journey",
    image: NickBand,
  },
];

const examples = [
  {
    title: "Education",
    description:
      "One simple way to pay for your studies, stay and student life abroad.",
    image: BookWord,
  },
  {
    title: "Medical Treatment",
    description: "For medical treatments and operations abroad",
    image: BookWordN,
  },
  {
    title: "Gift",
    description: "Remit gifts to your loved ones",
    image: BookWordNT,
  },
  {
    title: "Family Support & Maintainance",
    description: "Support family members for their needs",
    image: BookWordNL,
  },
];

const advantages = [
  {
    title: "Convenience:",
    description:
      "Transfer funds from India to overseas at ease without visiting personally.",
    icon: "shield",
  },
  {
    title: "Security:",
    description:
      "Secure transactions are guaranteed by authorized dealers, safeguarding your money details.",
    icon: "lock",
  },
  {
    title: "Regulatory Compliance:",
    description:
      "Compliance with RBI and FEMA regulations guarantees legal and hassle-free transfers.",
    icon: "document",
  },
  {
    title: "Transparency:",
    description:
      "Transparent fee arrangements and exchange rates facilitate a clear understanding of the cost incurred.",
    icon: "eye",
  },
  {
    title: "Speed:",
    description: "Quick processing time ensures timely transfers.",
    icon: "bolt",
  },
  {
    title: "24/7 Support:",
    description: "We're here to assist you.",
    icon: "headset",
  },
];

const rates = [
  { code: "AED", name: "UAE Dirham", rate: "26.1", flag: AED },
  { code: "AUD", name: "Australian Dollar", rate: "65.8", flag: AUD },
  { code: "CHF", name: "Swiss Franc", rate: "117.52", flag: CHF },
  { code: "EUR", name: "Euro", rate: "108.47", flag: EUR },
  { code: "GBP", name: "Pound Sterling", rate: "125.56", flag: GBP },
  { code: "USD", name: "US Dollar", rate: "95.14", flag: USD },
];

/* How many rupees one unit of each currency is worth. INR is the base,
   so every conversion goes through INR. Replace this with the API
   response once the rates endpoint is live. */
const inrPerUnit = rates.reduce((all, currency) => {
  all[currency.code] = Number(currency.rate);
  return all;
}, { INR: 1 });

const currencyCodes = Object.keys(inrPerUnit);

/* Advantage icons kept as inline SVG so the card sizing stays consistent.
   Swap in PNGs later if the design team sends them. */
function AdvantageIcon({ name }) {
  const common = {
    className: "h-10 w-10",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: BLUE,
    strokeWidth: 1.4,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };

  if (name === "shield") {
    return (
      <svg {...common}>
        <path d="M12 3l7 3v5.5c0 4.4-3 8-7 9.5-4-1.5-7-5.1-7-9.5V6l7-3z" />
      </svg>
    );
  }

  if (name === "lock") {
    return (
      <svg {...common}>
        <rect x="4" y="10" width="16" height="11" rx="2" />
        <path d="M8 10V7a4 4 0 018 0v3" />
        <path d="M12 14v3" />
      </svg>
    );
  }

  if (name === "document") {
    return (
      <svg {...common}>
        <path d="M13 3H7a2 2 0 00-2 2v14a2 2 0 002 2h6" />
        <path d="M13 3l5 5v4" />
        <path d="M9 9h3M9 13h5M9 17h4" />
        <circle cx="17.5" cy="17.5" r="3.5" />
        <path d="M16 17.5l1.1 1.1 1.9-2" />
      </svg>
    );
  }

  if (name === "eye") {
    return (
      <svg {...common}>
        <path d="M2 12s3.6-6 10-6 10 6 10 6-3.6 6-10 6-10-6-10-6z" />
        <circle cx="12" cy="12" r="2.5" />
      </svg>
    );
  }

  if (name === "bolt") {
    return (
      <svg {...common}>
        <path d="M13 2L5 13h6l-1 9 8-11h-6l1-9z" />
      </svg>
    );
  }

  return (
    <svg {...common}>
      <path d="M4 14v-2a8 8 0 0116 0v2" />
      <rect x="2.5" y="13.5" width="4" height="6" rx="1.5" />
      <rect x="17.5" y="13.5" width="4" height="6" rx="1.5" />
      <path d="M19.5 19.5v.5a3 3 0 01-3 3H13" />
    </svg>
  );
}

function SectionTitle({ children }) {
  return (
    <h2 className="text-center text-[22px] font-bold leading-snug text-[#0054a6] md:text-[30px]">
      {children}
    </h2>
  );
}

function formatMoney(value) {
  return new Intl.NumberFormat("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

function CurrencyConverter() {
  const [amount, setAmount] = useState("");
  const [from, setFrom] = useState("INR");
  const [to, setTo] = useState("USD");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  // Any change to the inputs clears the old result so a stale number
  // is never left on screen next to new values.
  function update(setter) {
    return (event) => {
      setter(event.target.value);
      setResult(null);
      setError("");
    };
  }

  function calculate() {
    const value = Number(amount);

    if (!amount || Number.isNaN(value) || value <= 0) {
      setResult(null);
      setError("Enter an amount greater than zero.");
      return;
    }

    if (from === to) {
      setResult(null);
      setError("Choose two different currencies.");
      return;
    }

    setError("");
    setResult({
      value,
      converted: (value * inrPerUnit[from]) / inrPerUnit[to],
    });
  }

  function swap() {
    setFrom(to);
    setTo(from);
    setResult(null);
    setError("");
  }

  return (
    <section className="px-5 pb-16 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <SectionTitle>Outward Remittances Currency Converter</SectionTitle>

        <p className="mx-auto mt-4 max-w-2xl text-center text-[12px] leading-5 text-[#333]">
          Our free Hmax Money Exchange Pvt Ltd Currency Converter makes it easy
          to see how much you can save with our latest rates.
        </p>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          <div>
            <label
              htmlFor="amount"
              className="mb-2 block text-[12px] text-[#111]"
            >
              Amount
            </label>

            <input
              id="amount"
              type="number"
              min="0"
              inputMode="decimal"
              value={amount}
              onChange={update(setAmount)}
              onKeyDown={(event) => event.key === "Enter" && calculate()}
              placeholder="Amount"
              className="h-11 w-full rounded border border-[#bcd6ef] bg-transparent px-3 text-xs outline-none focus:border-[#0054a6] focus:ring-1 focus:ring-[#0054a6]"
            />
          </div>

          <div>
            <label htmlFor="from" className="mb-2 block text-[12px] text-[#111]">
              From:
            </label>

            <select
              id="from"
              value={from}
              onChange={update(setFrom)}
              className="h-11 w-full rounded border border-[#bcd6ef] bg-transparent px-3 text-xs outline-none focus:border-[#0054a6]"
            >
              {currencyCodes.map((code) => (
                <option key={code} value={code}>
                  {code}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="to" className="mb-2 block text-[12px] text-[#111]">
              To:
            </label>

            <select
              id="to"
              value={to}
              onChange={update(setTo)}
              className="h-11 w-full rounded border border-[#bcd6ef] bg-transparent px-3 text-xs outline-none focus:border-[#0054a6]"
            >
              {currencyCodes.map((code) => (
                <option key={code} value={code}>
                  {code}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={calculate}
            className="rounded bg-[#0054a6] px-7 py-2.5 text-[11px] font-medium text-white transition hover:bg-[#003b7a]"
          >
            Calculate
          </button>

          <button
            type="button"
            onClick={swap}
            className="rounded border border-[#0054a6] px-5 py-2.5 text-[11px] font-medium text-[#0054a6] transition hover:bg-[#eaf3fc]"
          >
            Swap currencies
          </button>
        </div>

        {error && <p className="mt-4 text-[11px] text-red-600">{error}</p>}

        {result && (
          <div className="mt-6 rounded-md border border-[#bcd6ef] bg-[#f4f9fd] px-6 py-5">
            <p className="text-[15px] font-semibold text-[#0054a6]">
              {formatMoney(result.value)} {from} = {formatMoney(result.converted)}{" "}
              {to}
            </p>

            <p className="mt-2 text-[10px] text-gray-500">
              1 {from} = {formatMoney(inrPerUnit[from] / inrPerUnit[to])} {to} ·
              Indicative rate, subject to change.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

function OutwardRemittance() {
  return (
    <main className="bg-white text-[#111]">
      {/* Hero */}
      <section
        className="bg-white bg-cover bg-center"
        style={{ backgroundImage: `url(${BackgroundN})` }}
      >
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-5 py-16 md:grid-cols-2 md:py-24 lg:px-8 lg:py-28">
          <div>
            <h1 className="text-[38px] font-bold leading-[1.05] text-[#0054a6] sm:text-5xl md:text-[52px]">
              Outward
              <br />
              Remittances
            </h1>

            <p className="mt-4 max-w-sm text-xs leading-6 text-[#0054a6] md:text-[13px]">
              Send money abroad for education, travel, medical care, family
              support and more.
            </p>
          </div>
        </div>
      </section>

      {/* Feature strip */}
      <section className="px-5 lg:px-8">
        <div className="mx-auto -mt-10 grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-lg border border-[#0054a6] bg-white px-5 py-8 text-center"
            >
              <img
                src={feature.image}
                alt=""
                className="mx-auto mb-5 h-12 w-12 object-contain"
              />

              <h3 className="text-[13px] font-semibold text-[#0054a6]">
                {feature.title}
              </h3>

              <p className="mx-auto mt-2 max-w-[180px] text-[11px] leading-5 text-[#0054a6]">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Cost */}
      <section className="px-5 py-14 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <SectionTitle>The Cost of Outward Remittance</SectionTitle>

          <p className="mt-6 text-[12px] leading-6 text-[#333] md:text-[13px]">
            Outward remittance costs may include transfer fees, exchange-rate
            margins and applicable taxes such as TCS. It may apply on LRS
            remittances above ₹10 lakh in a financial year, subject to the
            purpose of remittance and prevailing regulations. Hmax Forex,
            through its authorised channel partners, offers transparent charges
            and competitive exchange rates to help you plan your transfer with
            clarity.
          </p>
        </div>
      </section>

      {/* How to use */}
      <section className="px-5 pb-14 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <SectionTitle>How to Use an Outward Remittance</SectionTitle>

          <p className="mt-6 text-[12px] leading-6 text-[#333] md:text-[13px]">
            Start by submitting your valid ID proof, PAN card, beneficiary
            details and the purpose of remittance, such as education, travel or
            medical expenses. Hmax Forex, through its authorised channel
            partners, assists with currency exchange and transfer formalities.
            Once the transfer is processed, you receive a reference number to
            track its status. Please ensure all information and documents are
            accurate to avoid delays.
          </p>
        </div>
      </section>

      {/* Examples */}
      <section className="px-5 pb-14 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <SectionTitle>Examples of Outward Remittance</SectionTitle>

          <div className="mx-auto mt-10 max-w-lg space-y-7">
            {examples.map((example) => (
              <div key={example.title} className="flex items-start gap-5">
                <img
                  src={example.image}
                  alt=""
                  className="h-12 w-12 shrink-0 object-contain"
                />

                <div>
                  <h3 className="text-[13px] font-semibold text-[#111]">
                    {example.title}
                  </h3>

                  <p className="mt-1 text-[12px] leading-5 text-[#444]">
                    {example.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Advantages */}
      <section className="bg-[#f4f9fd] px-5 py-16 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <SectionTitle>
            What are the advantages of availing Outward
            <br className="hidden sm:block" /> Remittance?
          </SectionTitle>

          <p className="mt-4 text-center text-[12px] text-[#333]">
            Availing outward remittance services has the following advantages:
          </p>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {advantages.map((advantage) => (
              <div
                key={advantage.title}
                className="rounded-lg bg-white px-7 py-10 text-center shadow-[0_2px_14px_rgba(0,84,166,0.08)]"
              >
                <div className="mb-6 flex justify-center">
                  <AdvantageIcon name={advantage.icon} />
                </div>

                <h3 className="text-[13px] font-semibold text-[#0054a6]">
                  {advantage.title}
                </h3>

                <p className="mx-auto mt-3 max-w-[230px] text-[11px] leading-5 text-[#3f6fa8]">
                  {advantage.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Rates */}
      <section className="px-5 py-16 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-center text-base font-bold text-[#0054a6] md:text-lg">
            Latest Outward Remittances Rates
          </h2>

          <div className="mt-6 overflow-hidden rounded-sm border border-[#dce9f6]">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#0054a6] text-left text-[11px] font-normal text-white">
                  <th className="px-4 py-2 font-medium">Currency</th>
                  <th className="px-4 py-2 font-medium">Rate</th>
                </tr>
              </thead>

              <tbody>
                {rates.map((currency) => (
                  <tr
                    key={currency.code}
                    className="border-b border-[#e6eef7] last:border-0"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={currency.flag}
                          alt=""
                          className="h-4 w-6 shrink-0 object-cover"
                        />

                        <div>
                          <p className="text-[11px] font-semibold text-[#0054a6]">
                            {currency.code}
                          </p>

                          <p className="text-[9px] text-gray-500">
                            {currency.name}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-3 text-[11px] text-[#0054a6]">
                      {currency.rate}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 flex flex-col gap-2 text-[10px] text-[#0054a6] sm:flex-row sm:items-center sm:justify-between">
            <p>Last updated rates at 24 Jun 2026, 10:30 AM</p>
            <p>1FX = Displayed INR</p>
            <p>Rates are indicative and subject to change.</p>
          </div>
        </div>
      </section>

      {/* Currency converter */}
      <CurrencyConverter />

    </main>
  );
}

export default OutwardRemittance;