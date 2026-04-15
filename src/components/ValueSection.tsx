import { motion } from "framer-motion";
import TextReveal from "./TextReveal";
import AnimatedCounter from "./AnimatedCounter";

const stats = [
  { value: "250B+", label: "Creator Economy", description: "Mercado global en plena explosión" },
  { value: "3.000€+", label: "Ingresos Mensuales", description: "Potencial por creador activo" },
  { value: "500B", label: "Proyección 2030", description: "Crecimiento imparable del sector" },
];

const ValueSection = () => {
  return (
    <section className="py-24 md:py-32 border-t border-border relative overflow-hidden">
      {/* Animated bg blobs */}
      <motion.div
        className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-primary/[0.04] blur-[120px]"
        animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-primary/[0.03] blur-[100px]"
        animate={{ x: [0, -20, 0], y: [0, 30, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-12 gap-8 md:gap-12 items-start">
          {/* Left text block */}
          <motion.div
            className="col-span-12 md:col-span-5"
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
              className="text-muted-foreground text-sm leading-relaxed max-w-sm"
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

          {/* Right stats */}
          <div className="col-span-12 md:col-span-6 md:col-start-7 space-y-6">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                className="group flex items-center gap-6 p-6 rounded-2xl bg-card/50 border border-border hover:border-primary/30 transition-all duration-500 relative overflow-hidden"
                initial={{ opacity: 0, x: 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15, ease: [0.215, 0.61, 0.355, 1] }}
                whileHover={{ x: -5 }}
              >
                {/* Hover glow */}
                <div className="absolute inset-0 bg-radial-green opacity-0 group-hover:opacity-40 transition-opacity duration-700 pointer-events-none" />
                <div className="relative z-10 flex items-center gap-6 w-full">
                  <AnimatedCounter
                    target={stat.value}
                    className="font-heading text-4xl md:text-5xl font-bold text-gradient min-w-[120px]"
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
      </div>
    </section>
  );
};

export default ValueSection;
