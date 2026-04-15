import { motion } from "framer-motion";

interface TextRevealProps {
  children: string;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  once?: boolean;
}

const TextReveal = ({ children, className = "", delay = 0, as: Tag = "span", once = true }: TextRevealProps) => {
  const words = children.split(" ");

  return (
    <Tag className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.3em] align-bottom">
          <motion.span
            className="inline-block"
            initial={{ y: "100%" }}
            whileInView={{ y: "0%" }}
            viewport={{ once }}
            transition={{
              duration: 0.6,
              delay: delay + i * 0.04,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
};

export default TextReveal;
