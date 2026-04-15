import { useRef, useState, useCallback, forwardRef } from "react";
import { motion } from "framer-motion";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  strength?: number;
  type?: "button" | "submit";
}

const MagneticButton = forwardRef<HTMLElement, MagneticButtonProps>(
  ({ children, className = "", href, onClick, strength = 0.3, type }, _forwardedRef) => {
    const ref = useRef<HTMLElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouse = useCallback(
      (e: React.MouseEvent) => {
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) * strength;
        const y = (e.clientY - rect.top - rect.height / 2) * strength;
        setPosition({ x, y });
      },
      [strength]
    );

    const handleLeave = () => setPosition({ x: 0, y: 0 });

    const springConfig = { type: "spring" as const, stiffness: 250, damping: 15, mass: 0.5 };

    if (href) {
      return (
        <motion.a
          ref={ref as React.RefObject<HTMLAnchorElement>}
          href={href}
          onMouseMove={handleMouse}
          onMouseLeave={handleLeave}
          animate={{ x: position.x, y: position.y }}
          transition={springConfig}
          className={className}
        >
          {children}
        </motion.a>
      );
    }

    return (
      <motion.button
        ref={ref as React.RefObject<HTMLButtonElement>}
        onClick={onClick}
        type={type || "button"}
        onMouseMove={handleMouse}
        onMouseLeave={handleLeave}
        animate={{ x: position.x, y: position.y }}
        transition={springConfig}
        className={className}
      >
        {children}
      </motion.button>
    );
  }
);

MagneticButton.displayName = "MagneticButton";

export default MagneticButton;
