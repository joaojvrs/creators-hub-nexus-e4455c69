import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useRef } from "react";
import studioImg from "@/assets/studio-onair.png";
import MagneticButton from "./MagneticButton";

const PillO = ({ color = "bg-primary", delay = 0 }: { color?: string; delay?: number }) => (
  <motion.span
    className={`inline-flex items-center justify-center w-[0.65em] h-[0.75em] ${color} rounded-[0.2em] align-baseline relative -top-[0.02em] mx-[0.02em]`}
    initial={{ scale: 0, rotateY: -180 }}
    animate={{ scale: 1, rotateY: 0 }}
    transition={{ duration: 0.8, delay, type: "spring", stiffness: 200, damping: 15 }}
    whileHover={{
      scale: 1.1,
      rotate: [0, -5, 5, 0],
      transition: { duration: 0.4 },
    }}
  >
    <span className="block w-[0.35em] h-[0.42em] bg-background rounded-[0.12em]" />
  </motion.span>
);

const CreatorsLogo = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(mouseY, [0, 1], [8, -8]), { stiffness: 100, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-8, 8]), { stiffness: 100, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  return (
    <motion.div
      ref={containerRef}
      className="mb-8 cursor-default select-none"
      style={{ perspective: 1200 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}>
        {/* CREATORS with pill O */}
        <div className="overflow-hidden relative">
          <motion.div
            className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.05] block"
            initial={{ y: "110%", rotateX: -80 }}
            animate={{ y: "0%", rotateX: 0 }}
            transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <span>CREAT</span>
            <PillO color="bg-primary" delay={0.4} />
            <span>RS</span>
          </motion.div>
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "linear-gradient(90deg, transparent 0%, hsl(162 100% 35% / 0.15) 50%, transparent 100%)" }}
            initial={{ x: "-100%" }}
            animate={{ x: "200%" }}
            transition={{ duration: 1.5, delay: 0.7, ease: "easeInOut" }}
          />
        </div>

        {/* HUB CLUB */}
        <div className="overflow-hidden relative">
          <motion.div
            className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.05] block text-gradient"
            initial={{ y: "110%", rotateX: -80 }}
            animate={{ y: "0%", rotateX: 0 }}
            transition={{ duration: 1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            HUB CLUB
          </motion.div>
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "linear-gradient(90deg, transparent 0%, hsl(162 100% 35% / 0.15) 50%, transparent 100%)" }}
            initial={{ x: "-100%" }}
            animate={{ x: "200%" }}
            transition={{ duration: 1.5, delay: 0.85, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

const FloatingParticle = ({ delay }: { delay: number }) => {
  const x = Math.random() * 100;
  const duration = 4 + Math.random() * 4;

  return (
    <motion.div
      className="absolute w-1 h-1 rounded-full bg-primary/40"
      style={{ left: `${x}%`, bottom: 0 }}
      animate={{
        y: [0, -400 - Math.random() * 300],
        opacity: [0, 0.8, 0],
        scale: [0, 1, 0.5],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeOut",
      }}
    />
  );
};

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

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
        {Array.from({ length: 12 }).map((_, i) => (
          <FloatingParticle key={i} delay={i * 0.6} />
        ))}
      </div>

      <motion.div className="relative z-10 container mx-auto px-6" style={{ y: contentY }}>
        <div className="max-w-3xl">
          <motion.p
            className="text-primary font-heading text-xs md:text-sm tracking-[0.4em] uppercase mb-6 font-medium flex items-center gap-3"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.span
              className="inline-block w-8 h-px bg-primary"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              style={{ transformOrigin: "left" }}
            />
            Barcelona — Calle Provençals 65
          </motion.p>

          {/* Logo Title */}
          <CreatorsLogo />

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
              className="inline-flex items-center justify-center px-7 py-3.5 bg-primary text-primary-foreground font-heading font-semibold text-sm rounded-full glow-green-strong hover:brightness-110 transition-all duration-300"
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
        transition={{ duration: 1.5, delay: 1.2 }}
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
