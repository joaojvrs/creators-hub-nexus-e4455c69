import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import SpaceShowcase from "@/components/SpaceShowcase";
import EcosystemSection from "@/components/EcosystemSection";
import ValueSection from "@/components/ValueSection";
import AssistantSection from "@/components/AssistantSection";
import ContactSection from "@/components/ContactSection";
import FooterSection from "@/components/FooterSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <div id="espacio">
        <SpaceShowcase />
      </div>
      <EcosystemSection />
      <ValueSection />
      <AssistantSection />
      <ContactSection />
      <FooterSection />
    </div>
  );
};

export default Index;
