import { motion } from "framer-motion";
import { Heart, ThumbsUp, Star, Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type Reaction = {
  id: number;
  left: number;
  delay: number;
  duration: number;
  icon: "heart" | "thumb" | "star" | "sparkle" | "number";
  value?: string;
  size: number;
  drift: number;
};

const ICONS = {
  heart: Heart,
  thumb: ThumbsUp,
  star: Star,
  sparkle: Sparkles,
};

const NUMBERS = ["+1", "+12", "+27", "+99", "+5", "+42", "+8"];

const FloatingReactions = () => {
  const [reactions, setReactions] = useState<Reaction[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;
    const obs = new IntersectionObserver(
      (entries) => setIsVisible(entries[0]?.isIntersecting ?? false),
      { threshold: 0.05 }
    );
    obs.observe(containerRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    let id = 0;
    const types: Reaction["icon"][] = ["heart", "thumb", "star", "sparkle", "heart", "number", "heart"];

    const spawn = () => {
      if (document.hidden) return;
      const icon = types[Math.floor(Math.random() * types.length)];
      const r: Reaction = {
        id: id++,
        left: 10 + Math.random() * 75,
        delay: 0,
        duration: 3.5 + Math.random() * 2,
        icon,
        value: icon === "number" ? NUMBERS[Math.floor(Math.random() * NUMBERS.length)] : undefined,
        size: 18 + Math.random() * 16,
        drift: (Math.random() - 0.5) * 60,
      };
      setReactions((prev) => [...prev.slice(-6), r]);
    };

    for (let i = 0; i < 3; i++) setTimeout(spawn, i * 500);
    const interval = setInterval(spawn, 1600);
    return () => clearInterval(interval);
  }, [isVisible]);

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none overflow-hidden z-20">
      {reactions.map((r) => {
        const Icon = r.icon !== "number" ? ICONS[r.icon] : null;
        return (
          <motion.div
            key={r.id}
            className="absolute bottom-0"
            style={{ left: `${r.left}%` }}
            initial={{ y: 0, x: 0, opacity: 0, scale: 0.4 }}
            animate={{
              y: -380,
              x: r.drift,
              opacity: [0, 1, 1, 0],
              scale: [0.4, 1.1, 1, 0.8],
            }}
            transition={{
              duration: r.duration,
              ease: "easeOut",
              times: [0, 0.15, 0.7, 1],
            }}
          >
            {Icon ? (
              <div
                className="flex items-center justify-center rounded-full bg-background/90 border border-primary/30 shadow-lg shadow-primary/20"
                style={{ width: r.size + 16, height: r.size + 16 }}
              >
                <Icon
                  className="text-primary"
                  style={{ width: r.size, height: r.size }}
                  fill={r.icon === "heart" ? "currentColor" : "none"}
                />
              </div>
            ) : (
              <div className="px-3 py-1 rounded-full bg-primary text-primary-foreground font-heading font-bold text-sm shadow-lg shadow-primary/30">
                {r.value}
              </div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
};

export default FloatingReactions;
