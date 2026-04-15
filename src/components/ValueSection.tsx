import { motion } from "framer-motion";

const stats = [
  { value: "250B+", label: "Creator Economy", description: "Mercado global en plena explosión" },
  { value: "3.000€+", label: "Ingresos Mensuales", description: "Potencial por creador activo" },
  { value: "∞", label: "Escalabilidad", description: "Marketplace + comunidad sin límites" },
];

const ValueSection = () => {
  return (
    <section className="py-24 md:py-32 border-t border-border relative overflow-hidden">
      {/* Subtle background accent */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-radial-green opacity-30" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-12 gap-8 md:gap-12 items-start">
          {/* Left text block */}
          <motion.div
            className="col-span-12 md:col-span-5"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-primary font-heading text-xs tracking-[0.3em] uppercase mb-3">
              Oportunidad de Mercado
            </p>
            <h2 className="font-heading text-3xl md:text-5xl font-bold leading-[0.95] mb-6">
              El futuro del<br />
              contenido<br />
              <span className="text-gradient">es ahora</span>
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-sm">
              Ayudamos a creadores a generar contenido que venda. Desde un joven creador 
              hasta un emprendedor — cualquier persona puede generar ingresos con el poder 
              de las redes sociales.
            </p>
          </motion.div>

          {/* Right stats - stacked vertically */}
          <div className="col-span-12 md:col-span-6 md:col-start-7 space-y-6">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                className="flex items-center gap-6 p-6 rounded-2xl bg-card/50 border border-border hover:border-primary/20 transition-all group"
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
              >
                <span className="font-heading text-4xl md:text-5xl font-bold text-gradient min-w-[120px]">
                  {stat.value}
                </span>
                <div>
                  <p className="font-heading font-semibold text-sm mb-0.5">{stat.label}</p>
                  <p className="text-muted-foreground text-xs">{stat.description}</p>
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
