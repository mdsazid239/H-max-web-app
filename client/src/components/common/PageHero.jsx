
import heroImage from "../../assets/images/cash-money.png";

export default function PageHero({
  title,
  subtitle,
}) {
  return (
    <section
      className="relative flex min-h-[260px] w-full items-center overflow-hidden sm:min-h-[300px] lg:min-h-[340px]"
      style={{
        backgroundImage: `url(${heroImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="container-page relative z-10 w-full py-16 text-center sm:py-20 lg:py-24">
        <h1 className="mx-auto max-w-4xl text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-5xl">
          {title}
        </h1>

        {subtitle && (
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-white sm:text-base">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}