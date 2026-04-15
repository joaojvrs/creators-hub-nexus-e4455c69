import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import spaceOverview from "@/assets/space-overview.png";
import studioOnair from "@/assets/studio-onair.png";
import spaceFront from "@/assets/space-front.jpg";
import spaceCowork from "@/assets/space-cowork.jpg";
import spaceEntrance from "@/assets/space-entrance.jpg";
import TextReveal from "./TextReveal";

const SpaceShowcase = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const y2 = useTransform(scrollYProgress, [0, 1], [120, -50]);
  const y3 = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const scale1 = useTransform(scrollYProgress, [0, 0.5], [0.92, 1]);
  const scale2 = useTransform(scrollYProgress, [0.1, 0.6], [0.88, 1]);

  return (
    <section ref={sectionRef} className="py-12 md:py-24 overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Editorial heading */}
        <div className="flex items-end justify-between mb-10 md:mb-16">
          <div>
            <motion.p
              className="text-primary font-heading text-xs tracking-[0.3em] uppercase mb-2"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <motion.span
                className="inline-block w-6 h-px bg-primary mr-2 align-middle"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                style={{ transformOrigin: "left" }}
              />
              Nuestro Espacio
            </motion.p>
            <TextReveal className="font-heading text-3xl md:text-5xl lg:text-6xl font-bold leading-[0.95] block" as="h2">
              Donde nace el contenido
            </TextReveal>
          </div>
          <motion.p
            className="text-muted-foreground text-sm max-w-xs hidden md:block text-right leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            Un espacio diseñado para crear, grabar, vender y conectar.
            Todo bajo un mismo techo en Barcelona.
          </motion.p>
        </div>

        {/* Main asymmetric grid */}
        <div className="grid grid-cols-12 gap-4 md:gap-6 mb-6">
          {/* Large image - overview */}
          <motion.div
            className="col-span-12 md:col-span-7 relative rounded-2xl overflow-hidden aspect-[4/3] md:aspect-[16/10]"
            style={{ y: y1, scale: scale1 }}
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.215, 0.61, 0.355, 1] }}
          >
            <motion.img
              src={spaceOverview}
              alt="Vista aérea del espacio Creators Hub Club"
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.6 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
            <motion.div
              className="absolute bottom-6 left-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <span className="inline-block px-3 py-1 bg-primary/20 backdrop-blur-sm text-primary text-xs font-heading font-medium rounded-full border border-primary/20">
                Energía Creativa
              </span>
            </motion.div>
          </motion.div>

          {/* Right column */}
          <div className="col-span-12 md:col-span-5 flex flex-col gap-4 md:gap-6">
            <motion.div
              className="relative rounded-2xl overflow-hidden aspect-[4/3]"
              style={{ y: y2, scale: scale2 }}
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.15, ease: [0.215, 0.61, 0.355, 1] }}
            >
              <motion.img
                src={studioOnair}
                alt="Estudio ON AIR con iluminación verde neón"
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.6 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
              <motion.div
                className="absolute bottom-6 left-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
              >
                <span className="inline-block px-3 py-1 bg-primary/20 backdrop-blur-sm text-primary text-xs font-heading font-medium rounded-full border border-primary/20">
                  Creators Studio
                </span>
              </motion.div>
            </motion.div>

            {/* Info block */}
            <motion.div
              className="bg-card border border-border rounded-2xl p-6 md:p-8 flex-1 flex flex-col justify-center relative overflow-hidden group"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
              whileHover={{ borderColor: "hsl(160 72% 50% / 0.3)" }}
            >
              <div className="absolute inset-0 bg-radial-green opacity-0 group-hover:opacity-50 transition-opacity duration-700" />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-3">
                  <motion.div
                    className="w-2 h-2 rounded-full bg-primary"
                    animate={{ scale: [1, 1.5, 1], opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <span className="text-primary font-heading text-xs tracking-widest uppercase">En construcción</span>
                </div>
                <TextReveal className="text-foreground font-heading text-xl font-semibold mb-2 block" as="p">
                  Abrimos pronto
                </TextReveal>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Estudio profesional de podcast, sets para grabación, showroom de productos y zona de networking.
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Second row — 3 images */}
        <div className="grid grid-cols-12 gap-4 md:gap-6">
          {[
            { src: spaceFront, alt: "Fachada interior con branding Energía Criativa y escaleras", label: "Conexiones" },
            { src: spaceCowork, alt: "Zona de coworking con mesas, café y branding", label: "Coworking" },
            { src: spaceEntrance, alt: "Entrada del hub con luz natural y vegetación", label: "Entrada" },
          ].map((img, i) => (
            <motion.div
              key={img.label}
              className="col-span-12 md:col-span-4 relative rounded-2xl overflow-hidden aspect-[4/3]"
              style={{ y: y3 }}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.6 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5">
                <span className="inline-block px-3 py-1 bg-primary/20 backdrop-blur-sm text-primary text-xs font-heading font-medium rounded-full border border-primary/20">
                  {img.label}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpaceShowcase;
