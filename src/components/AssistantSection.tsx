import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Bot, User, Sparkles } from "lucide-react";
import TextReveal from "./TextReveal";
import MagneticButton from "./MagneticButton";

type Message = { role: "user" | "assistant"; content: string };

const INITIAL_MESSAGES: Message[] = [
  {
    role: "assistant",
    content:
      "¡Hola! 👋 Soy el asistente virtual de Creators Hub Club. ¿En qué puedo ayudarte? Puedo contarte sobre nuestro estudio, membresías, marketplace o agendar una visita.",
  },
];

const QUICK_REPLIES = [
  "¿Qué es Creators Hub Club?",
  "¿Cómo puedo agendar una visita?",
  "¿Qué membresías ofrecen?",
];

const AUTO_RESPONSES: Record<string, string> = {
  "¿Qué es Creators Hub Club?":
    "Creators Hub Club es un ecosistema híbrido físico y digital en Barcelona que conecta creadores de contenido, marcas y emprendedores. Combinamos un estudio profesional, tienda física con TikTok Shop, marketplace digital y una comunidad de creadores. ¡Todo en un solo lugar! 🚀",
  "¿Cómo puedo agendar una visita?":
    "¡Genial que quieras visitarnos! Estamos en Calle Provençals 65, Sant Martí, 08019 Barcelona. Puedes agendar tu visita directamente en la sección de contacto más abajo, o escribirnos para coordinar un horario. 📍",
  "¿Qué membresías ofrecen?":
    "Tenemos tres niveles: 🥉 **Creators** (comunidad, eventos, descuentos), 🥈 **Creators Pro** (horas de estudio, formación, marketplace) y 🥇 **Creators Elite** (estrategia personalizada, producción premium, eventos privados). ¡Cada nivel está diseñado para impulsar tu crecimiento!",
};

const msgVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: [0.215, 0.61, 0.355, 1] } },
};

const AssistantSection = () => {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const handleSend = (text?: string) => {
    const msg = text || input.trim();
    if (!msg) return;

    setMessages((prev) => [...prev, { role: "user", content: msg }]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const response =
        AUTO_RESPONSES[msg] ||
        "¡Gracias por tu mensaje! Nuestro equipo se pondrá en contacto contigo pronto. Mientras tanto, puedes agendar una visita en la sección de contacto. 😊";
      setMessages((prev) => [...prev, { role: "assistant", content: response }]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <section className="py-24 md:py-32 border-t border-border relative overflow-hidden" id="asistente">
      {/* Floating bg orb */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary/[0.04] blur-[120px]"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 text-primary font-heading text-xs tracking-[0.2em] uppercase mb-3"
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Sparkles className="w-3 h-3" />
            Asistente Virtual
          </motion.div>
          <TextReveal className="font-heading text-3xl md:text-5xl font-bold mb-4 block" as="h2">
            Pregúntanos lo que necesites
          </TextReveal>
          <motion.p
            className="text-muted-foreground max-w-xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            Nuestro asistente de IA está listo para resolver tus dudas sobre el ecosistema.
          </motion.p>
        </motion.div>

        <motion.div
          className="max-w-2xl mx-auto bg-card border border-border rounded-2xl overflow-hidden glow-green relative"
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.215, 0.61, 0.355, 1] }}
        >
          {/* Animated border glow */}
          <motion.div
            className="absolute -inset-px rounded-2xl pointer-events-none"
            style={{
              background: "linear-gradient(135deg, hsl(160 72% 50% / 0.2), transparent, hsl(160 72% 50% / 0.1))",
            }}
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 3, repeat: Infinity }}
          />

          {/* Header */}
          <div className="flex items-center gap-3 px-6 py-4 border-b border-border relative">
            <motion.div
              className="w-3 h-3 rounded-full bg-primary"
              animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="font-heading text-sm font-semibold">CHC Assistant</span>
            <span className="text-muted-foreground text-xs ml-auto">Online</span>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="h-80 overflow-y-auto px-6 py-4 space-y-4">
            <AnimatePresence>
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  className={`flex gap-3 ${msg.role === "user" ? "justify-end" : ""}`}
                  variants={msgVariants}
                  initial="hidden"
                  animate="visible"
                  layout
                >
                  {msg.role === "assistant" && (
                    <motion.div
                      className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 400, damping: 15 }}
                    >
                      <Bot className="w-4 h-4 text-primary" />
                    </motion.div>
                  )}
                  <div
                    className={`max-w-[80%] rounded-xl px-4 py-3 text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-secondary-foreground"
                    }`}
                  >
                    {msg.content}
                  </div>
                  {msg.role === "user" && (
                    <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                      <User className="w-4 h-4 text-muted-foreground" />
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
            {isTyping && (
              <motion.div
                className="flex gap-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-primary" />
                </div>
                <div className="bg-secondary rounded-xl px-4 py-3 text-sm">
                  <span className="flex gap-1">
                    <motion.span className="w-2 h-2 bg-muted-foreground rounded-full" animate={{ y: [0, -6, 0] }} transition={{ duration: 0.5, repeat: Infinity, delay: 0 }} />
                    <motion.span className="w-2 h-2 bg-muted-foreground rounded-full" animate={{ y: [0, -6, 0] }} transition={{ duration: 0.5, repeat: Infinity, delay: 0.15 }} />
                    <motion.span className="w-2 h-2 bg-muted-foreground rounded-full" animate={{ y: [0, -6, 0] }} transition={{ duration: 0.5, repeat: Infinity, delay: 0.3 }} />
                  </span>
                </div>
              </motion.div>
            )}
          </div>

          {/* Quick replies */}
          <div className="px-6 pb-3 flex flex-wrap gap-2">
            <AnimatePresence>
              {messages.length <= 1 &&
                QUICK_REPLIES.map((reply, i) => (
                  <motion.button
                    key={reply}
                    onClick={() => handleSend(reply)}
                    className="text-xs px-3 py-1.5 rounded-full border border-primary/30 text-primary hover:bg-primary/10 transition-colors"
                    initial={{ opacity: 0, scale: 0.8, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    whileHover={{ scale: 1.05, borderColor: "hsl(160 72% 50% / 0.6)" }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {reply}
                  </motion.button>
                ))}
            </AnimatePresence>
          </div>

          {/* Input */}
          <div className="px-4 pb-4">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Escribe tu mensaje..."
                className="flex-1 bg-secondary text-foreground rounded-lg px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary transition-shadow duration-300"
              />
              <MagneticButton
                onClick={() => handleSend()}
                strength={0.3}
                className="bg-primary text-primary-foreground rounded-lg px-4 py-3 hover:brightness-110 transition-all"
              >
                <Send className="w-4 h-4" />
              </MagneticButton>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AssistantSection;
