import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import MagneticButton from "./MagneticButton";
import creatorsLogo from "@/assets/creators-logo-white.png";

const links = [
  { label: "Espacio", href: "#espacio" },
  { label: "Ecosistema", href: "#ecosistema" },
  { label: "Asistente", href: "#asistente" },
  { label: "Contacto", href: "#contacto" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border/50"
          : "bg-transparent"
      }`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
    >
      <div className="container mx-auto px-6 flex items-center justify-between h-16">
        <MagneticButton href="#" strength={0.2} className="flex items-center">
          <img src={creatorsLogo} alt="Creators Hub Club" className="h-5 md:h-6 w-auto" />
        </MagneticButton>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link, i) => (
            <motion.div
              key={link.href}
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.08 }}
            >
              <MagneticButton
                href={link.href}
                strength={0.25}
                className="text-muted-foreground text-xs tracking-widest uppercase font-heading hover:text-primary transition-colors"
              >
                {link.label}
              </MagneticButton>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
        >
          <MagneticButton
            href="#contacto"
            strength={0.3}
            className="hidden md:inline-flex items-center px-5 py-2 bg-primary text-primary-foreground font-heading font-semibold text-xs rounded-full hover:brightness-110 transition-all hover:shadow-[0_0_30px_hsl(160_72%_50%/0.3)]"
          >
            Reservar
          </MagneticButton>
        </motion.div>

        {/* Mobile toggle */}
        <motion.button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-foreground"
          whileTap={{ scale: 0.9, rotate: 90 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </motion.button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="md:hidden bg-background/95 backdrop-blur-xl border-b border-border"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.215, 0.61, 0.355, 1] }}
          >
            <div className="container mx-auto px-6 py-6 flex flex-col gap-4">
              {links.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-foreground font-heading text-sm py-2 border-b border-border/30"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href="#contacto"
                onClick={() => setMenuOpen(false)}
                className="inline-flex items-center justify-center px-5 py-3 bg-primary text-primary-foreground font-heading font-semibold text-sm rounded-full mt-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Reservar Visita
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
