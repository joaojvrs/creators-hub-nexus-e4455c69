import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Send, Bot, User } from "lucide-react";

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

    const userMsg: Message = { role: "user", content: msg };
    setMessages((prev) => [...prev, userMsg]);
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
    <section className="py-24 md:py-32 border-t border-border" id="asistente">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-primary font-heading text-sm tracking-[0.2em] uppercase mb-3">
            Asistente Virtual
          </p>
          <h2 className="font-heading text-3xl md:text-5xl font-bold mb-4">
            Pregúntanos lo que necesites
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Nuestro asistente de IA está listo para resolver tus dudas sobre el ecosistema.
          </p>
        </motion.div>

        <motion.div
          className="max-w-2xl mx-auto bg-card border border-border rounded-2xl overflow-hidden glow-green"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Header */}
          <div className="flex items-center gap-3 px-6 py-4 border-b border-border">
            <div className="w-3 h-3 rounded-full bg-primary animate-pulse-glow" />
            <span className="font-heading text-sm font-semibold">CHC Assistant</span>
            <span className="text-muted-foreground text-xs ml-auto">Online</span>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="h-80 overflow-y-auto px-6 py-4 space-y-4">
            {messages.map((msg, i) => (
              <div key={i} className={`flex gap-3 ${msg.role === "user" ? "justify-end" : ""}`}>
                {msg.role === "assistant" && (
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-primary" />
                  </div>
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
              </div>
            ))}
            {isTyping && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-primary" />
                </div>
                <div className="bg-secondary rounded-xl px-4 py-3 text-sm">
                  <span className="flex gap-1">
                    <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Quick replies */}
          <div className="px-6 pb-3 flex flex-wrap gap-2">
            {messages.length <= 1 &&
              QUICK_REPLIES.map((reply) => (
                <button
                  key={reply}
                  onClick={() => handleSend(reply)}
                  className="text-xs px-3 py-1.5 rounded-full border border-primary/30 text-primary hover:bg-primary/10 transition-colors"
                >
                  {reply}
                </button>
              ))}
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
                className="flex-1 bg-secondary text-foreground rounded-lg px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <button
                type="submit"
                className="bg-primary text-primary-foreground rounded-lg px-4 hover:brightness-110 transition-all"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AssistantSection;
