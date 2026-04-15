import HeroSection from "@/components/HeroSection";
import EcosystemSection from "@/components/EcosystemSection";
import ValueSection from "@/components/ValueSection";
import AssistantSection from "@/components/AssistantSection";
import ContactSection from "@/components/ContactSection";
import FooterSection from "@/components/FooterSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <EcosystemSection />
      <ValueSection />
      <AssistantSection />
      <ContactSection />
      <FooterSection />
    </div>
  );
};

export default Index;
