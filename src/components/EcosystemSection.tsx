import { motion, useScroll, useTransform } from "framer-motion";
import { Camera, ShoppingBag, Globe, Users } from "lucide-react";
import { useRef } from "react";
import TextReveal from "./TextReveal";

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

const lineVariants = {
  hidden: { scaleX: 0 },
  visible: { scaleX: 1, transition: { duration: 0.8, ease: [0.215, 0.61, 0.355, 1] } },
};

const EcosystemSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgX = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section ref={sectionRef} className="py-24 md:py-32 relative overflow-hidden" id="ecosistema">
      {/* Animated background element */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/[0.03] blur-[100px]"
        style={{ x: bgX }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div className="mb-20">
          <motion.p
            className="text-primary font-heading text-xs tracking-[0.3em] uppercase mb-3"
            initial={{ opacity: 0, x: -30 }}
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
            Nuestro Ecosistema
          </motion.p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <TextReveal className="font-heading text-3xl md:text-5xl lg:text-6xl font-bold leading-[0.95] block" as="h2">
                Cuatro pilares, un solo objetivo
              </TextReveal>
            </div>
            <motion.p
              className="text-muted-foreground max-w-sm text-sm leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              Un ecosistema completo de creación, influencia y comercio donde el
              contenido se transforma en ventas.
            </motion.p>
          </div>
        </motion.div>

        {/* Stacked editorial layout */}
        <div className="space-y-0">
          <motion.div
            className="h-px bg-border"
            variants={lineVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            style={{ transformOrigin: "left" }}
          />
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              className="group grid grid-cols-12 gap-4 md:gap-8 py-8 md:py-12 border-b border-border items-center -mx-6 px-6 relative overflow-hidden cursor-default"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.215, 0.61, 0.355, 1] }}
              whileHover={{ backgroundColor: "hsl(0 0% 7% / 0.5)" }}
            >
              {/* Hover glow effect */}
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                style={{
                  background: "radial-gradient(ellipse at var(--mouse-x, 50%) var(--mouse-y, 50%), hsl(160 72% 50% / 0.06), transparent 60%)",
                }}
              />

              {/* Number */}
              <div className="col-span-2 md:col-span-1">
                <motion.span
                  className="font-heading text-2xl md:text-3xl font-bold text-primary/20 group-hover:text-primary/60 transition-colors duration-500"
                  whileHover={{ scale: 1.1 }}
                >
                  {pillar.number}
                </motion.span>
              </div>

              {/* Icon */}
              <div className="col-span-3 md:col-span-1 flex justify-center">
                <motion.div
                  className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-all duration-500"
                  whileHover={{ rotate: 10, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <pillar.icon className="w-5 h-5 text-primary" />
                </motion.div>
              </div>

              {/* Title */}
              <div className="col-span-7 md:col-span-3">
                <h3 className="font-heading text-lg md:text-2xl font-semibold group-hover:text-primary transition-colors duration-500">
                  {pillar.title}
                </h3>
              </div>

              {/* Description */}
              <div className="col-span-12 md:col-span-7">
                <p className="text-muted-foreground text-sm leading-relaxed md:pl-4 group-hover:text-foreground/70 transition-colors duration-500">
                  {pillar.description}
                </p>
              </div>

              {/* Animated arrow on hover */}
              <motion.div
                className="absolute right-6 top-1/2 -translate-y-1/2 text-primary/0 group-hover:text-primary/40 transition-colors duration-500 hidden md:block"
                initial={{ x: -10, opacity: 0 }}
                whileHover={{ x: 0, opacity: 1 }}
              >
                <span className="text-2xl">→</span>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EcosystemSection;
