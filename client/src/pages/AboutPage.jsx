import PageHero from "../components/common/PageHero.jsx";

import {
  ABOUT_OFFERINGS,
  BUYING_BENEFITS,
  CORE_VALUES,
} from "../data/siteContent.js";

// ============================================================
// IMAGES
// ============================================================

// Who We Are
import rightImg from "../assets/images/right-img.png";

// What We Offer
import paisaImage from "../assets/images/paisa.png";
import passportImage from "../assets/images/passport.png";
import rightWaysImage from "../assets/images/right-ways.png";

// Why Choose HMAX
import homeIcon from "../assets/images/home.png";
import paperRightIcon from "../assets/images/paper-right.png";
import lockMoneyIcon from "../assets/images/lock-money.png";
import laptopFingerIcon from "../assets/images/laptop-finger.png";

// Core Values - Right Side Images
import peopleImage from "../assets/images/pepole-pepole.png";
import rightWaysCoreImage from "../assets/images/rightways.png";
import clampImage from "../assets/images/clamp.png";
import bulbImage from "../assets/images/blube.png";
import nepalFlagImage from "../assets/images/nepalflag.png";

// ============================================================
// IMAGE ARRAYS
// ============================================================

const OFFER_IMAGES = [
  paisaImage,
  passportImage,
  rightWaysImage,
];

const BENEFIT_ICONS = [
  homeIcon,
  paperRightIcon,
  lockMoneyIcon,
  laptopFingerIcon,
];

const CORE_VALUE_IMAGES = [
  peopleImage,
  rightWaysCoreImage,
  clampImage,
  bulbImage,
  nepalFlagImage,
];

// ============================================================
// ABOUT PAGE
// ============================================================

export default function AboutPage() {
  return (
    <main className="w-full overflow-hidden bg-white text-black">

      {/* ======================================================
          HERO
      ====================================================== */}

      <PageHero
        title="Your Trusted Forex Partner Since 2016"
        subtitle="Building trust and transparency with every transaction."
        variant="dark"
      />

      {/* ======================================================
          WHO WE ARE
      ====================================================== */}

      <section className="w-full bg-white py-12 sm:py-16 lg:py-20">
        <div className="mx-auto w-full max-w-[1180px] px-5 sm:px-8 lg:px-10">

          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">

            {/* IMAGE */}
            <div className="flex w-full justify-center lg:justify-start">
              <div className="w-full max-w-[470px]">
                <img
                  src={rightImg}
                  alt="HMAX secure foreign exchange services"
                  className="block h-auto w-full object-contain"
                />
              </div>
            </div>

            {/* CONTENT */}
            <div className="w-full">

              <h2 className="text-[30px] font-bold leading-tight text-[#0057ad] sm:text-[36px] lg:text-[40px]">
                Who We Are
              </h2>

              <h3 className="mt-3 text-[17px] font-semibold leading-snug text-black sm:text-[19px]">
                HMAX - Your Trusted Forex Partner
              </h3>

              <div className="mt-5 space-y-5 text-[13px] leading-[1.9] text-[#222] sm:text-[14px]">

                <p>
                  Founded in 2016, Hmax Money Exchange Pvt. Ltd. has become
                  one of the leading foreign exchange service providers in
                  India for both commercial and travel needs. With a diverse
                  client base of businesses and individuals, we are committed
                  to offering value for money and efficient, transparent
                  services within the foreign exchange market.
                </p>

                <p>
                  At Hmax, we don&rsquo;t just exchange currency&mdash;we
                  build trust with every transaction.
                </p>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ======================================================
          WHAT WE OFFER
      ====================================================== */}

      <section className="w-full bg-white py-6 sm:py-8">
        <div className="mx-auto w-full max-w-[1050px] px-3 sm:px-5">

          {/* HEADING */}
          <div className="mx-auto max-w-[700px] text-center">

            <h2 className="text-[22px] font-bold leading-tight text-[#0057ad] sm:text-[30px]">
              What We Offer
            </h2>

            <p className="mt-1.5 text-[10px] leading-[1.5] text-[#222] sm:mt-2 sm:text-[12px]">
              We provide a comprehensive range of forex solutions designed
              to meet every need:
            </p>

          </div>

          {/* OFFER CARDS */}
          <div className="mt-4 grid grid-cols-1 gap-3 sm:mt-5 md:grid-cols-3">

            {ABOUT_OFFERINGS.map((offering, index) => (
              <article
                key={offering.title}
                className="overflow-hidden rounded-[4px] bg-[#eaf2fb] p-[5px]"
              >

                {/* IMAGE */}
                <div className="h-[120px] w-full overflow-hidden rounded-[3px] bg-[#dce9f7] sm:h-[135px]">
                  <img
                    src={OFFER_IMAGES[index]}
                    alt={offering.title}
                    className="block h-full w-full object-cover"
                  />
                </div>

                {/* CONTENT */}
                <div className="px-[2px] pb-3 pt-1.5">

                  <h3 className="text-[11px] font-semibold leading-[1.15] text-[#0057ad] sm:text-[13px]">
                    {offering.title}
                  </h3>

                  <div className="my-1.5 h-[1px] w-[35px] bg-[#0057ad]" />

                  <p className="text-[8px] leading-[1.45] text-[#111] sm:text-[10px]">
                    {offering.description}
                  </p>

                </div>

              </article>
            ))}

          </div>
        </div>
      </section>

      {/* ======================================================
          WHY CHOOSE HMAX
      ====================================================== */}

      <section className="w-full bg-white pb-14 sm:pb-16 lg:pb-20">
        <div className="mx-auto w-full max-w-[900px] px-5 sm:px-8">

          <h2 className="text-center text-[25px] font-bold leading-tight text-[#0057ad] sm:text-[30px]">
            Why Choose Hmax for Buying Forex?
          </h2>

          <div className="mx-auto mt-8 max-w-[530px] space-y-6 sm:mt-10 sm:space-y-7">

            {BUYING_BENEFITS.map((benefit, index) => (
              <div
                key={benefit.text}
                className="flex items-center gap-5 sm:gap-6"
              >

                {/* ICON */}
                <div className="flex h-[48px] w-[48px] shrink-0 items-center justify-center sm:h-[52px] sm:w-[52px]">
                  <img
                    src={BENEFIT_ICONS[index]}
                    alt=""
                    aria-hidden="true"
                    className="h-full w-full object-contain"
                  />
                </div>

                {/* TEXT */}
                <p className="text-[12px] leading-[1.6] text-black sm:text-[14px]">
                  {benefit.text}
                </p>

              </div>
            ))}

          </div>
        </div>
      </section>

      {/* ======================================================
          OUR APPROACH + CORE PURPOSE
      ====================================================== */}

      <section className="w-full bg-[#f1f8fc] py-10 sm:py-14 lg:py-16">
        <div className="mx-auto w-full max-w-[1180px] px-5 sm:px-8 lg:px-10">

          {/* APPROACH + PURPOSE */}
          <div className="grid grid-cols-1 gap-7 md:grid-cols-2 md:gap-8">

            {/* OUR APPROACH */}
            <div>

              <h2 className="mb-4 text-[25px] font-bold leading-tight text-[#0057ad] sm:text-[30px]">
                Our Approach
              </h2>

              <div className="min-h-[155px] rounded-[5px] bg-white p-6 shadow-sm sm:p-7">

                <p className="text-[11px] leading-[1.9] text-black sm:text-[12px]">
                  At Hmax, we pride ourselves on maintaining top-quality
                  security standards. Our experienced executives ensure that
                  every transaction whether currency exchange, remittance,
                  or travel card is handled effectively, economically, and
                  with complete transparency.
                </p>

              </div>

            </div>

            {/* CORE PURPOSE */}
            <div>

              <h2 className="mb-4 text-[25px] font-bold leading-tight text-[#0057ad] sm:text-[30px]">
                Core Purpose
              </h2>

              <div className="min-h-[155px] rounded-[5px] bg-white p-6 shadow-sm sm:p-7">

                <p className="text-[11px] leading-[1.9] text-black sm:text-[12px]">
                  We are dedicated to increasing the value of money by
                  providing real-time foreign exchange across a wide range
                  of currencies. By simplifying global financial
                  transactions, we aim to contribute to the growth of both
                  our clients and the country&rsquo;s economy.
                </p>

              </div>

            </div>

          </div>

          {/* ==================================================
              CORE VALUES
          ================================================== */}

          <div className="mt-10 sm:mt-12">

            <h2 className="mb-5 text-[25px] font-bold leading-tight text-[#0057ad] sm:text-[30px]">
              Our Core Values
            </h2>

            {/* CORE VALUES CONTAINER */}
            <div className="grid overflow-hidden rounded-[5px] bg-white shadow-sm md:grid-cols-[1.4fr_0.8fr]">

              {/* LEFT - VALUES */}
              <div className="px-6 py-6 sm:px-8 sm:py-7">

                <ul className="space-y-5">

                  {CORE_VALUES.map((value, index) => (
                    <li
                      key={value.title}
                      className="flex items-center gap-3"
                    >

                      {/* ICON */}
                      <div className="flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-full bg-[#f1f7fc]">

                        {CORE_VALUE_IMAGES[index] && (
                          <img
                            src={CORE_VALUE_IMAGES[index]}
                            alt=""
                            aria-hidden="true"
                            className="h-[22px] w-[22px] object-contain"
                          />
                        )}

                      </div>

                      {/* TEXT */}
                      <p className="text-[11px] leading-[1.7] text-black sm:text-[12px]">

                        <strong className="font-bold">
                          {value.title}:
                        </strong>{" "}

                        {value.detail}

                      </p>

                    </li>
                  ))}

                </ul>

              </div>
            </div>

          </div>

        </div>
      </section>

    </main>
  );
}