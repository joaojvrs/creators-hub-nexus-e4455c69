import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useRef } from "react";
import studioImg from "@/assets/studio-onair.png";
import creatorsLogo from "@/assets/creators-logo-white.png";
import MagneticButton from "./MagneticButton";

const CreatorsLogo = () => {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(mouseY, [0, 1], [12, -12]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-12, 12]), { stiffness: 150, damping: 20 });
  const glowX = useSpring(useTransform(mouseX, [0, 1], [0, 100]), { stiffness: 200, damping: 30 });
  const glowY = useSpring(useTransform(mouseY, [0, 1], [0, 100]), { stiffness: 200, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      className="mb-8 select-none cursor-default relative"
      style={{ perspective: 1000 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="relative inline-block"
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      >
        {/* Main logo */}
        <motion.img
          src={creatorsLogo}
          alt="Creators Hub Club"
          className="h-16 md:h-24 lg:h-32 w-auto relative z-10"
          initial={{ scale: 0.6, opacity: 0, filter: "blur(20px)" }}
          animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.2, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* Dynamic glow that follows cursor */}
        <motion.div
          className="absolute inset-0 z-0 rounded-xl pointer-events-none"
          style={{
            background: useTransform(
              [glowX, glowY],
              ([x, y]) => `radial-gradient(circle at ${x}% ${y}%, hsl(162 100% 35% / 0.25) 0%, transparent 60%)`
            ),
            filter: "blur(30px)",
            transform: "translateZ(-10px) scale(1.5)",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
        />

        {/* Shimmer sweep repeating */}
        <motion.div
          className="absolute inset-0 pointer-events-none z-20"
          style={{
            background: "linear-gradient(90deg, transparent 0%, hsl(162 100% 50% / 0.15) 45%, hsl(162 100% 70% / 0.25) 50%, hsl(162 100% 50% / 0.15) 55%, transparent 100%)",
          }}
          initial={{ x: "-100%" }}
          animate={{ x: ["−100%", "200%"] }}
          transition={{ duration: 2, delay: 0.8, ease: "easeInOut", repeat: Infinity, repeatDelay: 4 }}
        />

        {/* Subtle floating shadow underneath */}
        <motion.div
          className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-6 bg-primary/10 blur-xl rounded-full z-0 pointer-events-none"
          animate={{ scaleX: [0.8, 1.1, 0.8], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
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
