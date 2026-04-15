import { motion } from "framer-motion";
import MagneticButton from "./MagneticButton";

const FooterSection = () => {
  return (
    <footer className="border-t border-border py-12 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          className="flex flex-col md:flex-row items-center justify-between gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }}>
            <p className="font-heading font-bold text-lg">
              CREATORS <span className="text-gradient">HUB</span> CLUB
            </p>
            <p className="text-muted-foreground text-sm mt-1">
              Crea. Influye. Vende. — Barcelona, España
            </p>
          </motion.div>

          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            {[
              { label: "Ecosistema", href: "#ecosistema" },
              { label: "Asistente", href: "#asistente" },
              { label: "Contacto", href: "#contacto" },
            ].map((link) => (
              <MagneticButton
                key={link.href}
                href={link.href}
                strength={0.3}
                className="hover:text-primary transition-colors duration-300"
              >
                {link.label}
              </MagneticButton>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="mt-8 pt-6 border-t border-border text-center text-muted-foreground text-xs"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          © {new Date().getFullYear()} Creators Hub Club. Todos los derechos reservados.
        </motion.div>
      </div>
    </footer>
  );
};

export default FooterSection;
