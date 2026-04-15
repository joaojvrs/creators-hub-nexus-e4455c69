import { motion } from "framer-motion";
import { MapPin, Mail, ArrowUpRight } from "lucide-react";
import TextReveal from "./TextReveal";
import MagneticButton from "./MagneticButton";

const ContactSection = () => {
  return (
    <section className="py-24 md:py-32 border-t border-border relative overflow-hidden" id="contacto">
      {/* Floating orb */}
      <motion.div
        className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-primary/[0.03] blur-[100px]"
        animate={{ y: [0, -30, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.p
            className="text-primary font-heading text-xs tracking-[0.3em] uppercase mb-3"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Visítanos
          </motion.p>
          <TextReveal className="font-heading text-3xl md:text-5xl font-bold mb-4 block" as="h2">
            Ven a conocer el hub
          </TextReveal>
          <motion.p
            className="text-muted-foreground max-w-xl mx-auto"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            Nosotros, del Creators Hub Club, desarrollamos este espacio para conectar mentes brillantes.
            Agenda tu visita y conoce nuestra infraestructura.
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Map / Location */}
          <motion.div
            className="bg-card border border-border rounded-2xl overflow-hidden group"
            initial={{ opacity: 0, x: -50, rotateY: 5 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
            whileHover={{ borderColor: "hsl(160 72% 50% / 0.3)" }}
          >
            <div className="relative overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2993.1!2d2.1989!3d41.4036!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12a4a33b0d7b0001%3A0x1!2sCalle%20Proven%C3%A7als%2065%2C%20Barcelona!5e0!3m2!1ses!2ses!4v1"
                width="100%"
                height="250"
                style={{ border: 0, filter: "invert(90%) hue-rotate(180deg)" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Creators Hub Club location"
              />
            </div>
            <div className="p-6">
              <div className="flex items-start gap-3 mb-4">
                <motion.div whileHover={{ scale: 1.2, rotate: 15 }} transition={{ type: "spring" }}>
                  <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                </motion.div>
                <div>
                  <p className="font-heading font-semibold text-sm">Calle Provençals 65</p>
                  <p className="text-muted-foreground text-sm">Sant Martí, 08019 Barcelona</p>
                </div>
              </div>
              <MagneticButton
                href="https://maps.app.goo.gl/LRgSWq8RDUb4M93K6"
                strength={0.3}
                className="inline-flex items-center gap-1 text-primary text-sm font-medium hover:underline"
              >
                Ver en Google Maps <ArrowUpRight className="w-4 h-4" />
              </MagneticButton>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.form
            className="bg-card border border-border rounded-2xl p-6 space-y-4 relative overflow-hidden group"
            initial={{ opacity: 0, x: 50, rotateY: -5 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
            onSubmit={(e) => e.preventDefault()}
            whileHover={{ borderColor: "hsl(160 72% 50% / 0.3)" }}
          >
            <div className="absolute inset-0 bg-radial-green opacity-0 group-hover:opacity-30 transition-opacity duration-700 pointer-events-none" />
            <div className="relative z-10 space-y-4">
              <h3 className="font-heading font-semibold text-lg mb-2">Agendar Visita</h3>
              {["Nombre", "Teléfono", "Correo electrónico"].map((ph, i) => (
                <motion.input
                  key={ph}
                  type={ph === "Teléfono" ? "tel" : ph === "Correo electrónico" ? "email" : "text"}
                  placeholder={ph}
                  className="w-full bg-secondary text-foreground rounded-lg px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary transition-all duration-300"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.08 }}
                  whileFocus={{ scale: 1.01 }}
                />
              ))}
              <motion.textarea
                placeholder="¿Qué te interesa de Creators Hub Club?"
                rows={3}
                className="w-full bg-secondary text-foreground rounded-lg px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary resize-none transition-all duration-300"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.54 }}
              />
              <MagneticButton
                className="w-full bg-primary text-primary-foreground font-heading font-semibold rounded-lg py-3 hover:brightness-110 transition-all glow-green-strong hover:shadow-[0_0_50px_hsl(160_72%_50%/0.4)]"
                strength={0.2}
              >
                Enviar mensaje
              </MagneticButton>
              <div className="flex items-center gap-2 text-muted-foreground text-xs">
                <Mail className="w-3 h-3" />
                <span>Te responderemos lo antes posible</span>
              </div>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
