import LenisProvider     from './components/providers/LenisProvider';
import Hero              from './components/sections/Hero';
import MarqueeSection    from './components/sections/MarqueeSection';
import TestimonialSection from './components/sections/TestimonialSection';
import PricingSection    from './components/sections/Pricing';
import TestimonialCarousel from './components/sections/TestimonialCarousel';
import ProjectsSection   from './components/sections/ProjectsSection';
import PartnerSection    from './components/sections/PartnerSection';
import Footer            from './components/ui/Footer';
import CopyrightBar      from './components/ui/CopyrightBar';
import BottomNav         from './components/ui/BottomNav';

export default function App() {
  return (
    <LenisProvider>
      <Hero />
      <MarqueeSection />
      <TestimonialSection />
      <PricingSection />
      <TestimonialCarousel />
      <ProjectsSection />
      <PartnerSection />
      <Footer />
      <CopyrightBar />
      {/* Fixed floating pill — always visible */}
      <BottomNav />
    </LenisProvider>
  );
}
