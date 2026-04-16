import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";

interface ThemeToggleProps {
  theme: "light" | "dark";
  toggleTheme: () => void;
}

const ThemeToggle = ({ theme, toggleTheme }: ThemeToggleProps) => {
  return (
    <motion.button
      onClick={toggleTheme}
      className="relative w-9 h-9 rounded-full bg-secondary flex items-center justify-center border border-border hover:bg-muted transition-colors"
      whileTap={{ scale: 0.9 }}
      whileHover={{ scale: 1.05 }}
      aria-label="Cambiar tema"
    >
      <motion.div
        key={theme}
        initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
        animate={{ rotate: 0, opacity: 1, scale: 1 }}
        exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        {theme === "dark" ? (
          <Sun className="w-4 h-4 text-foreground" />
        ) : (
          <Moon className="w-4 h-4 text-foreground" />
        )}
      </motion.div>
    </motion.button>
  );
};

export default ThemeToggle;
