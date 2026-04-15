import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

interface CounterProps {
  target: string;
  className?: string;
}

const AnimatedCounter = ({ target, className = "" }: CounterProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [display, setDisplay] = useState("0");

  // Parse numeric part
  const numericMatch = target.match(/[\d.,]+/);
  const prefix = target.slice(0, target.indexOf(numericMatch?.[0] || ""));
  const suffix = target.slice((numericMatch?.index || 0) + (numericMatch?.[0]?.length || 0));
  const numericStr = numericMatch?.[0]?.replace(/\./g, "").replace(",", ".") || "0";
  const numericTarget = parseFloat(numericStr);
  const hasDecimal = target.includes(",");
  const hasDot = target.includes(".");

  useEffect(() => {
    if (!isInView) return;
    if (!numericMatch) {
      setDisplay(target);
      return;
    }

    const duration = 2000;
    const steps = 60;
    const increment = numericTarget / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      // Ease out quad
      const progress = 1 - Math.pow(1 - step / steps, 3);
      current = numericTarget * progress;

      if (step >= steps) {
        current = numericTarget;
        clearInterval(timer);
      }

      let formatted: string;
      if (current >= 1000 && hasDot) {
        formatted = Math.round(current).toLocaleString("es-ES");
      } else if (hasDecimal) {
        formatted = current.toFixed(1).replace(".", ",");
      } else {
        formatted = Math.round(current).toString();
      }

      setDisplay(`${prefix}${formatted}${suffix}`);
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <motion.span
      ref={ref}
      className={className}
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.215, 0.61, 0.355, 1] }}
    >
      {isInView ? display : "0"}
    </motion.span>
  );
};

export default AnimatedCounter;
