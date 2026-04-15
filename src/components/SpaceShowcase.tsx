import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import spaceOverview from "@/assets/space-overview.png";
import studioOnair from "@/assets/studio-onair.png";

const SpaceShowcase = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const y2 = useTransform(scrollYProgress, [0, 1], [100, -40]);

  return (
    <section ref={sectionRef} className="py-12 md:py-24 overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Editorial heading */}
        <motion.div
          className="flex items-end justify-between mb-10 md:mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div>
            <p className="text-primary font-heading text-xs tracking-[0.3em] uppercase mb-2">
              Nuestro Espacio
            </p>
            <h2 className="font-heading text-3xl md:text-5xl lg:text-6xl font-bold leading-[0.95]">
              Donde nace<br />
              <span className="text-gradient">el contenido</span>
            </h2>
          </div>
          <p className="text-muted-foreground text-sm max-w-xs hidden md:block text-right leading-relaxed">
            Un espacio diseñado para crear, grabar, vender y conectar.
            Todo bajo un mismo techo en Barcelona.
          </p>
        </motion.div>

        {/* Asymmetric image grid with parallax */}
        <div className="grid grid-cols-12 gap-4 md:gap-6">
          {/* Large image - spans 7 cols */}
          <motion.div
            className="col-span-12 md:col-span-7 relative rounded-2xl overflow-hidden aspect-[4/3] md:aspect-[16/10]"
            style={{ y: y1 }}
          >
            <img
              src={spaceOverview}
              alt="Vista aérea del espacio Creators Hub Club con zona de trabajo, vegetación y branding"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
            <div className="absolute bottom-6 left-6">
              <span className="inline-block px-3 py-1 bg-primary/20 backdrop-blur-sm text-primary text-xs font-heading font-medium rounded-full border border-primary/20">
                Energía Creativa
              </span>
            </div>
          </motion.div>

          {/* Right column - smaller image + text block */}
          <div className="col-span-12 md:col-span-5 flex flex-col gap-4 md:gap-6">
            <motion.div
              className="relative rounded-2xl overflow-hidden aspect-[4/3]"
              style={{ y: y2 }}
            >
              <img
                src={studioOnair}
                alt="Estudio de podcast ON AIR con iluminación verde neón y equipamiento profesional"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
              <div className="absolute bottom-6 left-6">
                <span className="inline-block px-3 py-1 bg-primary/20 backdrop-blur-sm text-primary text-xs font-heading font-medium rounded-full border border-primary/20">
                  Creators Studio
                </span>
              </div>
            </motion.div>

            {/* Info block */}
            <motion.div
              className="bg-card border border-border rounded-2xl p-6 md:p-8 flex-1 flex flex-col justify-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse-glow" />
                <span className="text-primary font-heading text-xs tracking-widest uppercase">En construcción</span>
              </div>
              <p className="text-foreground font-heading text-xl font-semibold mb-2">
                Abrimos pronto
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Estudio profesional de podcast, sets para grabación, showroom de productos y zona de networking.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpaceShowcase;
