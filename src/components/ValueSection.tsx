import { motion } from "framer-motion";
import { TrendingUp, Zap, Target } from "lucide-react";

const stats = [
  { icon: TrendingUp, label: "Creator Economy", value: "250B+", sub: "Mercado global en crecimiento" },
  { icon: Zap, label: "Social Commerce", value: "TikTok Shop", sub: "Transformando las ventas digitales" },
  { icon: Target, label: "UGC Marketing", value: "3.000€+", sub: "Ingresos potenciales por creador" },
];

const ValueSection = () => {
  return (
    <section className="py-24 md:py-32 border-t border-border">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-primary font-heading text-sm tracking-[0.2em] uppercase mb-3">
            Oportunidad de Mercado
          </p>
          <h2 className="font-heading text-3xl md:text-5xl font-bold mb-4">
            El futuro del contenido es ahora
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Ayudamos a creadores a generar contenido que venda. Desde un joven creador hasta un emprendedor — 
            cualquier persona puede generar ingresos con el poder de las redes sociales.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="text-center p-8 rounded-2xl bg-card border border-border"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <stat.icon className="w-8 h-8 text-primary mx-auto mb-4" />
              <p className="font-heading text-3xl font-bold text-gradient mb-1">
                {stat.value}
              </p>
              <p className="font-heading font-semibold mb-1">{stat.label}</p>
              <p className="text-muted-foreground text-sm">{stat.sub}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValueSection;
