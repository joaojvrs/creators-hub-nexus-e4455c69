import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Sparkles } from "lucide-react";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import MagneticButton from "@/components/MagneticButton";
import TextReveal from "@/components/TextReveal";
import { getPillarBySlug, pillars } from "@/data/pillars";

const PillarDetail = () => {
  const { slug } = useParams();
  const pillar = getPillarBySlug(slug ?? "");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    if (pillar) document.title = `${pillar.title} — Creators Hub Club`;
  }, [pillar]);

  if (!pillar) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-6 pt-40 pb-32 text-center">
          <h1 className="font-heading text-4xl font-bold mb-4">Pilar no encontrado</h1>
          <Link to="/#ecosistema" className="text-primary underline">
            Volver al ecosistema
          </Link>
        </div>
        <FooterSection />
      </div>
    );
  }

  const Icon = pillar.icon;
  const otherPillars = pillars.filter((p) => p.slug !== pillar.slug);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-36 pb-20 md:pt-44 md:pb-28 overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-primary/[0.05] blur-[140px]"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="container mx-auto px-6 relative z-10">
          <Link
            to="/#ecosistema"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-10"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al ecosistema
          </Link>

          <div className="grid lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-8">
              <motion.p
                className="text-primary font-heading text-xs tracking-[0.3em] uppercase mb-5 flex items-center gap-3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <span className="inline-block w-6 h-px bg-primary" />
                Pilar {pillar.number} · {pillar.subtitle}
              </motion.p>

              <TextReveal
                as="h1"
                className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold leading-[0.95] block mb-6"
              >
                {pillar.title}
              </TextReveal>

              <motion.p
                className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
              >
                {pillar.tagline}
              </motion.p>
            </div>

            <motion.div
              className="lg:col-span-4 flex lg:justify-end"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              <div className="w-28 h-28 md:w-32 md:h-32 rounded-3xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                <Icon className="w-12 h-12 md:w-14 md:h-14 text-primary" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Description */}
      <section className="py-16 md:py-24 border-t border-border/50">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-12 gap-10">
            <div className="md:col-span-4">
              <p className="text-primary font-heading text-xs tracking-[0.3em] uppercase">
                <span className="inline-block w-6 h-px bg-primary mr-3 align-middle" />
                Sobre el pilar
              </p>
            </div>
            <div className="md:col-span-8 space-y-5">
              {pillar.longDescription.map((p, i) => (
                <motion.p
                  key={i}
                  className="text-base md:text-lg text-foreground/80 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                >
                  {p}
                </motion.p>
              ))}

              {pillar.partners && (
                <div className="flex items-center gap-3 pt-4 flex-wrap">
                  <span className="text-[10px] tracking-wider uppercase text-muted-foreground/60 font-heading">
                    Powered by
                  </span>
                  {pillar.partners.map((p) => (
                    <span
                      key={p}
                      className="text-xs font-heading font-semibold text-foreground/80 px-3 py-1.5 rounded-md bg-foreground/5 border border-foreground/10"
                    >
                      {p}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 border-t border-border/50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-3 gap-6">
            {pillar.stats.map((s, i) => (
              <motion.div
                key={s.label}
                className="text-center md:text-left"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="font-heading text-4xl md:text-6xl font-bold text-primary mb-2">{s.value}</div>
                <div className="text-xs md:text-sm text-muted-foreground tracking-wider uppercase">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 md:py-28 border-t border-border/50">
        <div className="container mx-auto px-6">
          <div className="mb-12">
            <p className="text-primary font-heading text-xs tracking-[0.3em] uppercase mb-4">
              <span className="inline-block w-6 h-px bg-primary mr-3 align-middle" />
              Lo que ofrecemos
            </p>
            <TextReveal as="h2" className="font-heading text-3xl md:text-5xl font-bold leading-tight block max-w-2xl">
              Características destacadas
            </TextReveal>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {pillar.features.map((f, i) => (
              <motion.div
                key={f.title}
                className="group relative rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm p-7 hover:border-primary/30 transition-colors duration-500"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                  <Sparkles className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-heading text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                  {f.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{f.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 md:py-28 border-t border-border/50 bg-card/30">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-12 gap-10">
            <div className="md:col-span-5">
              <p className="text-primary font-heading text-xs tracking-[0.3em] uppercase mb-4">
                <span className="inline-block w-6 h-px bg-primary mr-3 align-middle" />
                Servicios incluidos
              </p>
              <TextReveal as="h2" className="font-heading text-3xl md:text-4xl font-bold leading-tight block">
                Todo lo que necesitas en un solo lugar
              </TextReveal>
            </div>
            <div className="md:col-span-7">
              <ul className="grid sm:grid-cols-2 gap-3">
                {pillar.services.map((s, i) => (
                  <motion.li
                    key={s}
                    className="flex items-start gap-3 text-sm md:text-base text-foreground/85"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                  >
                    <span className="mt-1 w-5 h-5 rounded-full bg-primary/15 flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 text-primary" />
                    </span>
                    {s}
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 border-t border-border/50">
        <div className="container mx-auto px-6 text-center">
          <TextReveal as="h2" className="font-heading text-3xl md:text-5xl font-bold leading-tight block mb-6">
            ¿Listo para formar parte?
          </TextReveal>
          <p className="text-muted-foreground max-w-xl mx-auto mb-10">
            Reserva una visita o contáctanos para descubrir cómo {pillar.title} puede impulsar tu proyecto.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <MagneticButton
              href="/#contacto"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-heading font-semibold px-7 py-3.5 rounded-full hover:bg-primary/90 transition-colors"
            >
              Reservar visita <ArrowRight className="w-4 h-4" />
            </MagneticButton>
            <Link
              to="/#ecosistema"
              className="inline-flex items-center gap-2 border border-border hover:border-primary/50 text-foreground font-heading font-semibold px-7 py-3.5 rounded-full transition-colors"
            >
              Ver otros pilares
            </Link>
          </div>
        </div>
      </section>

      {/* Other pillars */}
      <section className="py-16 md:py-20 border-t border-border/50">
        <div className="container mx-auto px-6">
          <p className="text-primary font-heading text-xs tracking-[0.3em] uppercase mb-8">
            <span className="inline-block w-6 h-px bg-primary mr-3 align-middle" />
            Explora los otros pilares
          </p>
          <div className="grid md:grid-cols-3 gap-5">
            {otherPillars.map((p) => {
              const PIcon = p.icon;
              return (
                <Link
                  key={p.slug}
                  to={`/pilar/${p.slug}`}
                  className="group rounded-2xl border border-border/50 bg-card/50 p-6 hover:border-primary/30 transition-colors"
                >
                  <div className="flex items-center justify-between mb-5">
                    <span className="font-heading text-xs tracking-[0.2em] uppercase text-muted-foreground">
                      {p.subtitle}
                    </span>
                    <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </div>
                  <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <PIcon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-heading text-lg font-bold group-hover:text-primary transition-colors">
                    {p.title}
                  </h3>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <FooterSection />
    </div>
  );
};

export default PillarDetail;
