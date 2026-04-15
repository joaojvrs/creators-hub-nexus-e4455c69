import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import SpaceShowcase from "@/components/SpaceShowcase";
import EcosystemSection from "@/components/EcosystemSection";
import ValueSection from "@/components/ValueSection";
import ContactSection from "@/components/ContactSection";
import FloatingChat from "@/components/FloatingChat";
import FooterSection from "@/components/FooterSection";
import useSmoothScroll from "@/hooks/useSmoothScroll";

const Index = () => {
  useSmoothScroll();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <div id="espacio">
        <SpaceShowcase />
      </div>
      <EcosystemSection />
      <ValueSection />
      <ContactSection />
      <FooterSection />
    </div>
  );
};

export default Index;
