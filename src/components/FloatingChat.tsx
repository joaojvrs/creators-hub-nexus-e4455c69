import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Bot, User, X, MessageCircle } from "lucide-react";

type Message = { role: "user" | "assistant"; content: string };
type ChatUser = { name: string; email: string };

const INITIAL_MESSAGES: Message[] = [
  {
    role: "assistant",
    content:
      "¡Hola! 👋 Soy el asistente virtual de Creators Hub Club. ¿En qué puedo ayudarte?",
  },
];

const QUICK_REPLIES = [
  "¿Qué es Creators Hub Club?",
  "¿Cómo puedo agendar una visita?",
  "¿Qué membresías ofrecen?",
];

const AUTO_RESPONSES: Record<string, string> = {
  "¿Qué es Creators Hub Club?":
    "Creators Hub Club es un ecosistema híbrido físico y digital en Barcelona que conecta creadores de contenido, marcas y emprendedores. Combinamos un estudio profesional, tienda física con TikTok Shop, marketplace digital y una comunidad de creadores. 🚀",
  "¿Cómo puedo agendar una visita?":
    "¡Genial que quieras visitarnos! Estamos en Calle Provençals 65, Sant Martí, 08019 Barcelona. Puedes agendar tu visita directamente en la sección de contacto, o escribirnos para coordinar un horario. 📍",
  "¿Qué membresías ofrecen?":
    "Tenemos tres niveles: 🥉 Creators (comunidad, eventos, descuentos), 🥈 Creators Pro (horas de estudio, formación, marketplace) y 🥇 Creators Elite (estrategia personalizada, producción premium, eventos privados). ¡Cada nivel está diseñado para impulsar tu crecimiento!",
};

const FloatingChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [chatUser, setChatUser] = useState<ChatUser | null>(null);
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [loginName, setLoginName] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isTyping]);

  useEffect(() => {
    const open = () => setIsOpen(true);
    window.addEventListener("open-ai-chat", open);
    return () => window.removeEventListener("open-ai-chat", open);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginName.trim() || !loginEmail.trim()) return;
    setChatUser({ name: loginName.trim(), email: loginEmail.trim() });
  };

  const handleSend = (text?: string) => {
    const msg = text || input.trim();
    if (!msg) return;

    setMessages((prev) => [...prev, { role: "user", content: msg }]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const response =
        AUTO_RESPONSES[msg] ||
        "¡Gracias por tu mensaje! Nuestro equipo se pondrá en contacto contigo pronto. 😊";
      setMessages((prev) => [...prev, { role: "assistant", content: response }]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <>
      {/* Floating Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-shadow"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <MessageCircle className="w-6 h-6" />
            {/* Pulse ring */}
            <motion.span
              className="absolute inset-0 rounded-full border-2 border-primary"
              animate={{ scale: [1, 1.5], opacity: [0.6, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-2rem)] bg-card border border-border rounded-2xl shadow-2xl shadow-black/10 dark:shadow-black/30 overflow-hidden flex flex-col"
            style={{ height: "min(520px, calc(100vh - 4rem))" }}
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.9 }}
            transition={{ duration: 0.35, ease: [0.215, 0.61, 0.355, 1] }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-5 py-3.5 border-b border-border bg-card relative shrink-0">
              <motion.div
                className="w-2.5 h-2.5 rounded-full bg-primary"
                animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="font-heading text-sm font-semibold">CHC Assistant</span>
              <span className="text-muted-foreground text-xs">Online</span>
              <button
                onClick={() => setIsOpen(false)}
                className="ml-auto w-7 h-7 rounded-full hover:bg-secondary flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>

            {!chatUser ? (
              /* Login Form */
              <div className="flex-1 flex items-center justify-center p-6">
                <motion.form
                  onSubmit={handleLogin}
                  className="w-full space-y-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                >
                  <div className="text-center mb-6">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                      <Bot className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-heading text-base font-semibold">¡Bienvenido!</h3>
                    <p className="text-muted-foreground text-xs mt-1">
                      Ingresa tus datos para comenzar a chatear
                    </p>
                  </div>
                  <input
                    type="text"
                    value={loginName}
                    onChange={(e) => setLoginName(e.target.value)}
                    placeholder="Tu nombre"
                    required
                    className="w-full bg-secondary text-foreground rounded-lg px-4 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary transition-shadow"
                  />
                  <input
                    type="email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="Tu email"
                    required
                    className="w-full bg-secondary text-foreground rounded-lg px-4 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary transition-shadow"
                  />
                  <button
                    type="submit"
                    className="w-full bg-primary text-primary-foreground rounded-lg px-4 py-2.5 text-sm font-semibold hover:brightness-110 transition-all"
                  >
                    Comenzar chat
                  </button>
                </motion.form>
              </div>
            ) : (
              /* Chat Area */
              <>
                <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
                  <AnimatePresence>
                    {messages.map((msg, i) => (
                      <motion.div
                        key={i}
                        className={`flex gap-2.5 ${msg.role === "user" ? "justify-end" : ""}`}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        {msg.role === "assistant" && (
                          <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                            <Bot className="w-3.5 h-3.5 text-primary" />
                          </div>
                        )}
                        <div
                          className={`max-w-[80%] rounded-xl px-3.5 py-2.5 text-[13px] leading-relaxed ${
                            msg.role === "user"
                              ? "bg-primary text-primary-foreground"
                              : "bg-secondary text-secondary-foreground"
                          }`}
                        >
                          {msg.content}
                        </div>
                        {msg.role === "user" && (
                          <div className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center shrink-0 mt-0.5">
                            <User className="w-3.5 h-3.5 text-muted-foreground" />
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  {isTyping && (
                    <motion.div className="flex gap-2.5" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <Bot className="w-3.5 h-3.5 text-primary" />
                      </div>
                      <div className="bg-secondary rounded-xl px-3.5 py-2.5">
                        <span className="flex gap-1">
                          <motion.span className="w-1.5 h-1.5 bg-muted-foreground rounded-full" animate={{ y: [0, -5, 0] }} transition={{ duration: 0.5, repeat: Infinity, delay: 0 }} />
                          <motion.span className="w-1.5 h-1.5 bg-muted-foreground rounded-full" animate={{ y: [0, -5, 0] }} transition={{ duration: 0.5, repeat: Infinity, delay: 0.15 }} />
                          <motion.span className="w-1.5 h-1.5 bg-muted-foreground rounded-full" animate={{ y: [0, -5, 0] }} transition={{ duration: 0.5, repeat: Infinity, delay: 0.3 }} />
                        </span>
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Quick replies */}
                {messages.length <= 1 && (
                  <div className="px-5 pb-2 flex flex-wrap gap-1.5 shrink-0">
                    {QUICK_REPLIES.map((reply) => (
                      <button
                        key={reply}
                        onClick={() => handleSend(reply)}
                        className="text-[11px] px-2.5 py-1 rounded-full border border-primary/30 text-primary hover:bg-primary/10 transition-colors"
                      >
                        {reply}
                      </button>
                    ))}
                  </div>
                )}

                {/* Input */}
                <div className="px-4 pb-4 pt-2 shrink-0">
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
                      className="flex-1 bg-secondary text-foreground rounded-lg px-3.5 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary transition-shadow"
                    />
                    <button
                      type="submit"
                      className="bg-primary text-primary-foreground rounded-lg px-3.5 py-2.5 hover:brightness-110 transition-all"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </form>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingChat;
