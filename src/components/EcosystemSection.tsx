import { motion } from "framer-motion";
import { Camera, ShoppingBag, Globe, Users } from "lucide-react";

const pillars = [
  {
    icon: Camera,
    title: "Creators Studio",
    description:
      "Estudio audiovisual profesional para podcast, reels, anuncios, streaming y producción de contenido de alta calidad.",
  },
  {
    icon: ShoppingBag,
    title: "Creators Shop",
    description:
      "Tienda física conectada a TikTok Shop e Instagram Shop. Showroom de productos virales con demostraciones en vivo.",
  },
  {
    icon: Globe,
    title: "Marketplace",
    description:
      "Plataforma digital con productos propios, afiliación de creadores, dropshipping y suscripción de packs exclusivos.",
  },
  {
    icon: Users,
    title: "Creators Club",
    description:
      "Comunidad de membresía con acceso al estudio, formación, networking, oportunidades con marcas y visibilidad.",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.15, ease: "easeOut" },
  }),
};

const EcosystemSection = () => {
  return (
    <section className="py-24 md:py-32 relative" id="ecosistema">
      <div className="absolute inset-0 bg-radial-green opacity-50" />
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-primary font-heading text-sm tracking-[0.2em] uppercase mb-3">
            Nuestro Ecosistema
          </p>
          <h2 className="font-heading text-3xl md:text-5xl font-bold mb-4">
            Cuatro pilares, un solo objetivo
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Un ecosistema completo de creación, influencia y comercio donde el
            contenido se transforma en ventas.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              className="group bg-card border border-border rounded-xl p-6 hover:border-primary/40 transition-all duration-500 hover:glow-green"
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={cardVariants}
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                <pillar.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-heading text-lg font-semibold mb-2">
                {pillar.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {pillar.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EcosystemSection;
