import { motion } from "framer-motion";
import { MapPin, Mail, ArrowUpRight } from "lucide-react";

const ContactSection = () => {
  return (
    <section className="py-24 md:py-32 border-t border-border" id="contacto">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-primary font-heading text-sm tracking-[0.2em] uppercase mb-3">
            Visítanos
          </p>
          <h2 className="font-heading text-3xl md:text-5xl font-bold mb-4">
            Ven a conocer el hub
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Nosotros, del Creators Hub Club, desarrollamos este espacio para conectar mentes brillantes.
            Agenda tu visita y conoce nuestra infraestructura.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Map / Location */}
          <motion.div
            className="bg-card border border-border rounded-2xl overflow-hidden"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
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
            <div className="p-6">
              <div className="flex items-start gap-3 mb-4">
                <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-heading font-semibold text-sm">Calle Provençals 65</p>
                  <p className="text-muted-foreground text-sm">Sant Martí, 08019 Barcelona</p>
                </div>
              </div>
              <a
                href="https://maps.app.goo.gl/LRgSWq8RDUb4M93K6"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-primary text-sm font-medium hover:underline"
              >
                Ver en Google Maps <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.form
            className="bg-card border border-border rounded-2xl p-6 space-y-4"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            onSubmit={(e) => e.preventDefault()}
          >
            <h3 className="font-heading font-semibold text-lg mb-2">Agendar Visita</h3>
            <input
              type="text"
              placeholder="Nombre"
              className="w-full bg-secondary text-foreground rounded-lg px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <input
              type="tel"
              placeholder="Teléfono"
              className="w-full bg-secondary text-foreground rounded-lg px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <input
              type="email"
              placeholder="Correo electrónico"
              className="w-full bg-secondary text-foreground rounded-lg px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <textarea
              placeholder="¿Qué te interesa de Creators Hub Club?"
              rows={3}
              className="w-full bg-secondary text-foreground rounded-lg px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary resize-none"
            />
            <button
              type="submit"
              className="w-full bg-primary text-primary-foreground font-heading font-semibold rounded-lg py-3 hover:brightness-110 transition-all glow-green-strong"
            >
              Enviar mensaje
            </button>
            <div className="flex items-center gap-2 text-muted-foreground text-xs">
              <Mail className="w-3 h-3" />
              <span>Te responderemos lo antes posible</span>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
