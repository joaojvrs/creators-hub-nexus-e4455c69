import { motion } from "framer-motion";
import { Camera, ShoppingBag, Globe, Users } from "lucide-react";

const pillars = [
  {
    icon: Camera,
    title: "Creators Studio",
    description:
      "Estudio audiovisual profesional para podcast, reels, anuncios, streaming y producción de contenido de alta calidad.",
    number: "01",
  },
  {
    icon: ShoppingBag,
    title: "Creators Shop",
    description:
      "Tienda física conectada a TikTok Shop e Instagram Shop. Showroom de productos virales con demostraciones en vivo.",
    number: "02",
  },
  {
    icon: Globe,
    title: "Marketplace",
    description:
      "Plataforma digital con productos propios, afiliación de creadores, dropshipping y suscripción de packs exclusivos.",
    number: "03",
  },
  {
    icon: Users,
    title: "Creators Club",
    description:
      "Comunidad de membresía con acceso al estudio, formación, networking, oportunidades con marcas y visibilidad.",
    number: "04",
  },
];

const EcosystemSection = () => {
  return (
    <section className="py-24 md:py-32 relative" id="ecosistema">
      <div className="container mx-auto px-6">
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-primary font-heading text-xs tracking-[0.3em] uppercase mb-3">
            Nuestro Ecosistema
          </p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2 className="font-heading text-3xl md:text-5xl lg:text-6xl font-bold leading-[0.95] max-w-lg">
              Cuatro pilares,<br />
              <span className="text-gradient">un solo objetivo</span>
            </h2>
            <p className="text-muted-foreground max-w-sm text-sm leading-relaxed">
              Un ecosistema completo de creación, influencia y comercio donde el
              contenido se transforma en ventas.
            </p>
          </div>
        </motion.div>

        {/* Stacked editorial layout instead of grid */}
        <div className="space-y-0 border-t border-border">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              className="group grid grid-cols-12 gap-4 md:gap-8 py-8 md:py-12 border-b border-border items-center hover:bg-card/50 transition-colors duration-500 -mx-6 px-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              {/* Number */}
              <div className="col-span-2 md:col-span-1">
                <span className="font-heading text-2xl md:text-3xl font-bold text-primary/30 group-hover:text-primary/60 transition-colors">
                  {pillar.number}
                </span>
              </div>

              {/* Icon */}
              <div className="col-span-3 md:col-span-1 flex justify-center">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 group-hover:glow-green transition-all duration-500">
                  <pillar.icon className="w-5 h-5 text-primary" />
                </div>
              </div>

              {/* Title */}
              <div className="col-span-7 md:col-span-3">
                <h3 className="font-heading text-lg md:text-2xl font-semibold group-hover:text-primary transition-colors">
                  {pillar.title}
                </h3>
              </div>

              {/* Description */}
              <div className="col-span-12 md:col-span-7">
                <p className="text-muted-foreground text-sm leading-relaxed md:pl-4">
                  {pillar.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EcosystemSection;
