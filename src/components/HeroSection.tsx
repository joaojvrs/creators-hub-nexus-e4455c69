import { motion } from "framer-motion";
import studioImg from "@/assets/studio-onair.png";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-end overflow-hidden pb-16 md:pb-24">
      {/* Full-bleed background image */}
      <div className="absolute inset-0">
        <img
          src={studioImg}
          alt="Creators Hub Club Studio"
          className="w-full h-full object-cover"
          width={1920}
          height={1080}
        />
        {/* Heavy gradient overlay from bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/60 to-transparent" />
      </div>

      {/* Top fade for nav */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-background/80 to-transparent z-10" />

      <div className="relative z-10 container mx-auto px-6">
        <div className="max-w-3xl">
          <motion.p
            className="text-primary font-heading text-xs md:text-sm tracking-[0.4em] uppercase mb-4 font-medium"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            Barcelona — Calle Provençals 65
          </motion.p>

          <motion.h1
            className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.9] mb-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: "easeOut" }}
          >
            <span className="block text-foreground">CREATORS</span>
            <span className="block text-gradient">HUB</span>
            <span className="block text-foreground">CLUB</span>
          </motion.h1>

          <motion.div
            className="flex items-center gap-4 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="h-px w-16 bg-primary/60" />
            <p className="text-muted-foreground text-base md:text-lg font-body max-w-md">
              El ecosistema donde el contenido se convierte en ventas y comunidad.
              Estudio, marketplace y club de creadores.
            </p>
          </motion.div>

          <motion.div
            className="flex flex-wrap gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
          >
            <a
              href="#contacto"
              className="inline-flex items-center justify-center px-7 py-3.5 bg-primary text-primary-foreground font-heading font-semibold text-sm rounded-full glow-green-strong hover:brightness-110 transition-all duration-300"
            >
              Agendar Visita
            </a>
            <a
              href="#asistente"
              className="inline-flex items-center justify-center px-7 py-3.5 border border-glow text-primary font-heading font-semibold text-sm rounded-full hover:bg-primary/10 transition-all duration-300"
            >
              Hablar con IA
            </a>
          </motion.div>
        </div>
      </div>

      {/* Side accent line */}
      <motion.div
        className="absolute right-8 top-1/4 bottom-1/4 w-px bg-gradient-to-b from-transparent via-primary/30 to-transparent hidden lg:block"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.2, delay: 0.8 }}
      />
    </section>
  );
};

export default HeroSection;
