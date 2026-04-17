import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { Camera, ShoppingBag, Globe, Users, ArrowUpRight } from "lucide-react";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import TextReveal from "./TextReveal";
import tiktokShopLogo from "@/assets/tiktok-shop-logo.png";
import instagramShopLogo from "@/assets/instagram-shop-logo.png";

type Pillar = {
  icon: typeof Camera;
  title: string;
  subtitle: string;
  description: string;
  number: string;
  gradient: string;
  slug: string;
  logos?: { src: string; alt: string }[];
};

const pillars: Pillar[] = [
  {
    icon: Camera,
    title: "Creators Studio",
    subtitle: "Producción",
    description:
      "Estudio audiovisual profesional para podcast, reels, anuncios, streaming y producción de contenido de alta calidad.",
    number: "01",
    gradient: "from-primary/20 to-primary/5",
    slug: "creators-studio",
  },
  {
    icon: ShoppingBag,
    title: "Creators Shop",
    subtitle: "Comercio",
    description:
      "Tienda física conectada a TikTok Shop e Instagram Shop. Showroom de productos virales con demostraciones en vivo.",
    number: "02",
    gradient: "from-primary/15 to-primary/5",
    slug: "creators-shop",
    logos: [
      { src: tiktokShopLogo, alt: "TikTok Shop" },
      { src: instagramShopLogo, alt: "Instagram Shop" },
    ],
  },
  {
    icon: Globe,
    title: "Marketplace",
    subtitle: "Digital",
    description:
      "Plataforma digital con productos propios, afiliación de creadores, dropshipping y suscripción de packs exclusivos.",
    number: "03",
    gradient: "from-primary/20 to-primary/5",
    slug: "marketplace",
  },
  {
    icon: Users,
    title: "Creators Club",
    subtitle: "Comunidad",
    description:
      "Comunidad de membresía con acceso al estudio, formación, networking, oportunidades con marcas y visibilidad.",
    number: "04",
    gradient: "from-primary/15 to-primary/5",
    slug: "creators-club",
  },
];

const PillarCard = ({ pillar, index }: { pillar: Pillar; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(mouseY, [0, 1], [6, -6]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-6, 6]), { stiffness: 200, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  const handleMouseLeave = () => {
    setHovered(false);
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  return (
    <motion.div
      ref={cardRef}
      className="relative group cursor-pointer"
      style={{ perspective: 800 }}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.215, 0.61, 0.355, 1] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="relative h-full rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm p-7 md:p-8 overflow-hidden transition-colors duration-500 group-hover:border-primary/30"
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      >
        {/* Animated gradient bg on hover */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${pillar.gradient} rounded-2xl`}
          initial={{ opacity: 0 }}
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.5 }}
        />

        {/* Shimmer line */}
        <motion.div
          className="absolute top-0 left-0 w-full h-px"
          style={{
            background: "linear-gradient(90deg, transparent, hsl(var(--primary) / 0.5), transparent)",
          }}
          initial={{ x: "-100%" }}
          animate={hovered ? { x: "100%" } : { x: "-100%" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />

        <div className="relative z-10">
          {/* Top row: number + arrow */}
          <div className="flex items-center justify-between mb-8">
            <span className="font-heading text-xs tracking-[0.2em] text-muted-foreground uppercase">
              {pillar.subtitle}
            </span>
            <motion.div
              className="w-8 h-8 rounded-full border border-border/50 flex items-center justify-center text-muted-foreground group-hover:border-primary/50 group-hover:text-primary transition-colors duration-500"
              animate={hovered ? { rotate: 45, scale: 1.1 } : { rotate: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <ArrowUpRight className="w-3.5 h-3.5" />
            </motion.div>
          </div>

          {/* Icon */}
          <motion.div
            className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors duration-500"
            animate={hovered ? { scale: 1.05, y: -2 } : { scale: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <pillar.icon className="w-6 h-6 text-primary" />
          </motion.div>

          {/* Number + Title */}
          <div className="mb-4">
            <motion.span
              className="font-heading text-5xl md:text-6xl font-bold text-primary/[0.08] absolute -right-1 -bottom-2 group-hover:text-primary/[0.15] transition-colors duration-700 select-none"
              animate={hovered ? { scale: 1.1 } : { scale: 1 }}
            >
              {pillar.number}
            </motion.span>
            <h3 className="font-heading text-xl md:text-2xl font-bold group-hover:text-primary transition-colors duration-500">
              {pillar.title}
            </h3>
          </div>

          {/* Description */}
          <p className="text-muted-foreground text-sm leading-relaxed group-hover:text-foreground/70 transition-colors duration-500 relative z-10">
            {pillar.description}
          </p>

          {/* Partner badges */}
          {pillar.logos && pillar.logos.length > 0 && (
            <div className="flex items-center gap-2 mt-5 pt-4 border-t border-border/30 relative z-10 flex-wrap">
              <span className="text-[10px] tracking-wider uppercase text-muted-foreground/60 font-heading">Powered by</span>
              {pillar.logos.map((logo) => (
                <motion.span
                  key={logo.alt}
                  className="text-[11px] font-heading font-semibold text-foreground/80 px-2.5 py-1 rounded-md bg-foreground/5 border border-foreground/10 group-hover:border-primary/20 group-hover:text-primary transition-colors duration-500"
                  whileHover={{ scale: 1.05, y: -1 }}
                >
                  {logo.alt}
                </motion.span>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

const EcosystemSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgX = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section ref={sectionRef} className="py-24 md:py-36 relative overflow-hidden" id="ecosistema">
      {/* Background orb */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-primary/[0.03] blur-[120px]"
        style={{ x: bgX }}
      />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div className="mb-16 md:mb-20">
          <motion.p
            className="text-primary font-heading text-xs tracking-[0.3em] uppercase mb-4"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.span
              className="inline-block w-6 h-px bg-primary mr-3 align-middle"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              style={{ transformOrigin: "left" }}
            />
            Nuestro Ecosistema
          </motion.p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div className="max-w-2xl">
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

        {/* Pillar Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {pillars.map((pillar, i) => (
            <PillarCard key={pillar.title} pillar={pillar} index={i} />
          ))}
        </div>

        {/* Bottom connector line */}
        <motion.div
          className="mt-16 flex items-center justify-center gap-3"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
        >
          <motion.div
            className="h-px flex-1 max-w-[120px] bg-gradient-to-r from-transparent to-primary/30"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.9 }}
            style={{ transformOrigin: "left" }}
          />
          <span className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground font-heading">
            Todo conectado
          </span>
          <motion.div
            className="h-px flex-1 max-w-[120px] bg-gradient-to-l from-transparent to-primary/30"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.9 }}
            style={{ transformOrigin: "right" }}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default EcosystemSection;
