import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import TextReveal from "./TextReveal";
import AnimatedCounter from "./AnimatedCounter";
import creatorPhone from "@/assets/creator-phone.jpg";

const stats = [
  { value: "250B+", label: "Creator Economy", description: "Mercado global en plena explosión" },
  { value: "3.000€+", label: "Ingresos Mensuales", description: "Potencial por creador activo" },
  { value: "500B", label: "Proyección 2030", description: "Crecimiento imparable del sector" },
];

const ValueSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const imgY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const imgScale = useTransform(scrollYProgress, [0, 0.5], [0.9, 1]);

  return (
    <section ref={sectionRef} className="py-24 md:py-32 border-t border-border relative overflow-hidden">
      {/* Animated bg blobs */}
      <motion.div
        className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-primary/[0.04] blur-[120px]"
        animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-12 gap-8 md:gap-12 items-center">
          {/* Left — text + stats */}
          <div className="col-span-12 md:col-span-6 order-2 md:order-1">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <motion.p
                className="text-primary font-heading text-xs tracking-[0.3em] uppercase mb-3"
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
                Oportunidad de Mercado
              </motion.p>
              <TextReveal className="font-heading text-3xl md:text-5xl font-bold leading-[0.95] mb-6 block" as="h2">
                El futuro del contenido es ahora
              </TextReveal>
              <motion.p
                className="text-muted-foreground text-sm leading-relaxed max-w-sm mb-10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.3 }}
              >
                Ayudamos a creadores a generar contenido que venda. Desde un joven creador 
                hasta un emprendedor — cualquier persona puede generar ingresos con el poder 
                de las redes sociales.
              </motion.p>
            </motion.div>

            {/* Stats */}
            <div className="space-y-5">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  className="group flex items-center gap-6 p-5 rounded-2xl bg-card/50 border border-border hover:border-primary/30 transition-all duration-500 relative overflow-hidden"
                  initial={{ opacity: 0, x: -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ x: 5 }}
                >
                  <div className="absolute inset-0 bg-radial-green opacity-0 group-hover:opacity-40 transition-opacity duration-700 pointer-events-none" />
                  <div className="relative z-10 flex items-center gap-6 w-full">
                    <AnimatedCounter
                      target={stat.value}
                      className="font-heading text-3xl md:text-4xl font-bold text-gradient min-w-[100px]"
                    />
                    <div>
                      <p className="font-heading font-semibold text-sm mb-0.5">{stat.label}</p>
                      <p className="text-muted-foreground text-xs">{stat.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right — image */}
          <motion.div
            className="col-span-12 md:col-span-5 md:col-start-8 order-1 md:order-2 relative rounded-2xl overflow-hidden aspect-[3/4]"
            style={{ y: imgY, scale: imgScale }}
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.img
              src={creatorPhone}
              alt="Creadora de contenido sonriendo mientras usa su teléfono"
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.04 }}
              transition={{ duration: 0.6 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/50 via-transparent to-transparent" />
            <motion.div
              className="absolute bottom-6 left-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <span className="inline-block px-3 py-1 bg-primary/20 backdrop-blur-sm text-primary text-xs font-heading font-medium rounded-full border border-primary/20">
                Crea · Influye · Vende
              </span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ValueSection;
