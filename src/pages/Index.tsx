import { lazy, Suspense } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import useSmoothScroll from "@/hooks/useSmoothScroll";

const SpaceShowcase = lazy(() => import("@/components/SpaceShowcase"));
const EcosystemSection = lazy(() => import("@/components/EcosystemSection"));
const ValueSection = lazy(() => import("@/components/ValueSection"));
const BlogSection = lazy(() => import("@/components/BlogSection"));
const ContactSection = lazy(() => import("@/components/ContactSection"));
const FloatingChat = lazy(() => import("@/components/FloatingChat"));
const FooterSection = lazy(() => import("@/components/FooterSection"));

const SectionFallback = () => <div className="min-h-[40vh]" />;

const Index = () => {
  useSmoothScroll();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <Suspense fallback={<SectionFallback />}>
        <div id="espacio">
          <SpaceShowcase />
        </div>
        <EcosystemSection />
        <ValueSection />
        <BlogSection />
        <ContactSection />
        <FooterSection />
        <FloatingChat />
      </Suspense>
    </div>
  );
};

export default Index;
