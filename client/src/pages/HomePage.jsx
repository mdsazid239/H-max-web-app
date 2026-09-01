import HeroSection from '../components/home/HeroSection.jsx';
import StatsBar from '../components/home/StatsBar.jsx';
import ServicesSection from '../components/home/ServicesSection.jsx';
import LiveRatesSection from '../components/home/LiveRatesSection.jsx';
import TrustSection from '../components/home/TrustSection.jsx';
import BranchCta from '../components/home/BranchCta.jsx';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsBar />
      <ServicesSection />
      <LiveRatesSection />
      <TrustSection />
      <BranchCta />
    </>
  );
}
