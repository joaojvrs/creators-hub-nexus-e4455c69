import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import studioImg from "@/assets/studio-onair.png";
import MagneticButton from "./MagneticButton";
import TextReveal from "./TextReveal";

const HeroSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const imgOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-end overflow-hidden pb-16 md:pb-24">
      {/* Full-bleed background image with zoom on scroll */}
      <motion.div className="absolute inset-0" style={{ scale: imgScale, opacity: imgOpacity }}>
        <img
          src={studioImg}
          alt="Creators Hub Club Studio"
          className="w-full h-full object-cover"
          width={1920}
          height={1080}
        />
      </motion.div>
      
      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/20" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/60 to-transparent" />
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-background/80 to-transparent z-10" />

      {/* Animated grain texture overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
      }} />

      <motion.div className="relative z-10 container mx-auto px-6" style={{ y: contentY }}>
        <div className="max-w-3xl">
          <motion.p
            className="text-primary font-heading text-xs md:text-sm tracking-[0.4em] uppercase mb-4 font-medium"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
          >
            <motion.span
              className="inline-block w-8 h-px bg-primary mr-3 align-middle"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              style={{ transformOrigin: "left" }}
            />
            Barcelona — Calle Provençals 65
          </motion.p>

          <div className="mb-6">
            <div className="overflow-hidden">
              <TextReveal className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.9] block text-foreground" as="span" delay={0.1}>
                CREATORS
              </TextReveal>
            </div>
            <div className="overflow-hidden">
              <TextReveal className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.9] block text-gradient" as="span" delay={0.25}>
                HUB
              </TextReveal>
            </div>
            <div className="overflow-hidden">
              <TextReveal className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.9] block text-foreground" as="span" delay={0.4}>
                CLUB
              </TextReveal>
            </div>
          </div>

          <motion.div
            className="flex items-center gap-4 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
          >
            <motion.div
              className="h-px w-16 bg-primary/60"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              style={{ transformOrigin: "left" }}
            />
            <p className="text-muted-foreground text-base md:text-lg font-body max-w-md">
              El ecosistema donde el contenido se convierte en ventas y comunidad.
            </p>
          </motion.div>

          <motion.div
            className="flex flex-wrap gap-3"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            <MagneticButton
              href="#contacto"
              strength={0.4}
              className="inline-flex items-center justify-center px-7 py-3.5 bg-primary text-primary-foreground font-heading font-semibold text-sm rounded-full glow-green-strong hover:brightness-110 transition-all duration-300 hover:shadow-[0_0_50px_hsl(160_72%_50%/0.4)]"
            >
              Agendar Visita
            </MagneticButton>
            <MagneticButton
              href="#asistente"
              strength={0.4}
              className="inline-flex items-center justify-center px-7 py-3.5 border border-glow text-primary font-heading font-semibold text-sm rounded-full hover:bg-primary/10 transition-all duration-300"
            >
              Hablar con IA
            </MagneticButton>
          </motion.div>
        </div>
      </motion.div>

      {/* Side accent line */}
      <motion.div
        className="absolute right-8 top-1/4 bottom-1/4 w-px bg-gradient-to-b from-transparent via-primary/30 to-transparent hidden lg:block"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.5, delay: 1.2, ease: [0.215, 0.61, 0.355, 1] }}
      />

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex items-start justify-center p-2">
            <motion.div
              className="w-1.5 h-1.5 bg-primary rounded-full"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
