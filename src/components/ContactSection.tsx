import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Mail,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Clock,
  CalendarDays,
  Check,
  User,
  Phone,
  ArrowRight,
} from "lucide-react";
import TextReveal from "./TextReveal";
import MagneticButton from "./MagneticButton";

// ── Helpers ──────────────────────────────────────────────
const DAYS_ES = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];
const MONTHS_ES = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
];

const TIME_SLOTS = [
  "10:00", "11:00", "12:00", "13:00", "15:00", "16:00", "17:00", "18:00",
];

// Simulated unavailable dates (weekends + some random)
const isAvailable = (date: Date) => {
  const day = date.getDay();
  if (day === 0 || day === 6) return false; // weekends
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (date < today) return false;
  // Simulate some random unavailable days
  const seed = date.getDate() * (date.getMonth() + 1);
  if (seed % 7 === 0) return false;
  return true;
};

const isSameDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

const isToday = (date: Date) => isSameDay(date, new Date());

// ── Types ────────────────────────────────────────────────
type Step = "calendar" | "time" | "info" | "confirmed";

// ── Calendar Grid ────────────────────────────────────────
const CalendarGrid = ({
  month,
  year,
  selectedDate,
  onSelect,
  onPrev,
  onNext,
}: {
  month: number;
  year: number;
  selectedDate: Date | null;
  onSelect: (d: Date) => void;
  onPrev: () => void;
  onNext: () => void;
}) => {
  const days = useMemo(() => {
    const firstDay = new Date(year, month, 1);
    // Monday-based: 0=Mon, 6=Sun
    let startDay = firstDay.getDay() - 1;
    if (startDay < 0) startDay = 6;

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const cells: (Date | null)[] = [];

    for (let i = 0; i < startDay; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d));
    // Pad to full rows
    while (cells.length % 7 !== 0) cells.push(null);

    return cells;
  }, [month, year]);

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onPrev}
          className="w-9 h-9 rounded-full border border-border hover:border-primary/50 flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <motion.h4
          key={`${month}-${year}`}
          className="font-heading text-base font-semibold"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
        >
          {MONTHS_ES[month]} {year}
        </motion.h4>
        <button
          onClick={onNext}
          className="w-9 h-9 rounded-full border border-border hover:border-primary/50 flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Day labels */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {DAYS_ES.map((d) => (
          <div key={d} className="text-center text-[10px] tracking-wider uppercase text-muted-foreground font-heading py-1">
            {d}
          </div>
        ))}
      </div>

      {/* Day cells */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((date, i) => {
          if (!date) return <div key={`empty-${i}`} />;

          const available = isAvailable(date);
          const selected = selectedDate && isSameDay(date, selectedDate);
          const today = isToday(date);

          return (
            <motion.button
              key={date.toISOString()}
              onClick={() => available && onSelect(date)}
              disabled={!available}
              className={`
                relative w-full aspect-square rounded-xl text-sm font-medium transition-all duration-300 flex items-center justify-center
                ${selected
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30"
                  : available
                    ? "hover:bg-primary/10 text-foreground hover:text-primary"
                    : "text-muted-foreground/30 cursor-not-allowed"
                }
                ${today && !selected ? "ring-1 ring-primary/40" : ""}
              `}
              whileHover={available ? { scale: 1.1 } : undefined}
              whileTap={available ? { scale: 0.95 } : undefined}
            >
              {date.getDate()}
              {today && (
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary" />
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

// ── Time Slot Picker ─────────────────────────────────────
const TimeSlotPicker = ({
  selectedTime,
  onSelect,
}: {
  selectedTime: string | null;
  onSelect: (t: string) => void;
}) => (
  <div className="grid grid-cols-2 gap-2">
    {TIME_SLOTS.map((slot, i) => {
      const selected = selectedTime === slot;
      // Simulate some slots being taken
      const taken = (i === 2 || i === 5);

      return (
        <motion.button
          key={slot}
          onClick={() => !taken && onSelect(slot)}
          disabled={taken}
          className={`
            relative rounded-xl py-3 px-4 text-sm font-medium transition-all duration-300 flex items-center gap-2.5
            ${selected
              ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
              : taken
                ? "bg-secondary/50 text-muted-foreground/30 cursor-not-allowed line-through"
                : "bg-secondary hover:bg-primary/10 text-foreground hover:text-primary border border-transparent hover:border-primary/20"
            }
          `}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.04 }}
          whileHover={!taken ? { scale: 1.03 } : undefined}
          whileTap={!taken ? { scale: 0.97 } : undefined}
        >
          <Clock className="w-3.5 h-3.5" />
          {slot}
          {taken && <span className="text-[10px] ml-auto">Ocupado</span>}
        </motion.button>
      );
    })}
  </div>
);

// ── Main Component ───────────────────────────────────────
const ContactSection = () => {
  const [step, setStep] = useState<Step>("calendar");
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((y) => y - 1);
    } else setCurrentMonth((m) => m - 1);
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((y) => y + 1);
    } else setCurrentMonth((m) => m + 1);
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setSelectedTime(null);
    setStep("time");
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setStep("info");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    setStep("confirmed");
  };

  const reset = () => {
    setStep("calendar");
    setSelectedDate(null);
    setSelectedTime(null);
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  const stepIndicators = [
    { key: "calendar", label: "Fecha", icon: CalendarDays },
    { key: "time", label: "Hora", icon: Clock },
    { key: "info", label: "Datos", icon: User },
  ];

  return (
    <section className="py-24 md:py-36 border-t border-border relative overflow-hidden" id="contacto">
      {/* Background */}
      <motion.div
        className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-primary/[0.03] blur-[120px]"
        animate={{ y: [0, -30, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.p
            className="text-primary font-heading text-xs tracking-[0.3em] uppercase mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Agenda tu Visita
          </motion.p>
          <TextReveal className="font-heading text-3xl md:text-5xl font-bold mb-4 block" as="h2">
            Ven a conocer el hub
          </TextReveal>
          <motion.p
            className="text-muted-foreground max-w-xl mx-auto text-sm"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            Selecciona una fecha y hora para visitar nuestro espacio. Te recibiremos personalmente.
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-5 gap-6 max-w-5xl mx-auto">
          {/* Left: Map Card */}
          <motion.div
            className="md:col-span-2 bg-card border border-border rounded-2xl overflow-hidden"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="relative overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2993.1!2d2.1989!3d41.4036!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12a4a33b0d7b0001%3A0x1!2sCalle%20Proven%C3%A7als%2065%2C%20Barcelona!5e0!3m2!1ses!2ses!4v1"
                width="100%"
                height="200"
                style={{ border: 0, filter: "invert(90%) hue-rotate(180deg)" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Creators Hub Club location"
              />
            </div>
            <div className="p-5 space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <div>
                  <p className="font-heading font-semibold text-sm">Calle Provençals 65</p>
                  <p className="text-muted-foreground text-xs">Sant Martí, 08019 Barcelona</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-primary shrink-0" />
                <div>
                  <p className="text-sm">Lun - Vie: 10:00 - 19:00</p>
                  <p className="text-muted-foreground text-xs">Fines de semana cerrado</p>
                </div>
              </div>
              <MagneticButton
                href="https://maps.app.goo.gl/LRgSWq8RDUb4M93K6"
                strength={0.3}
                className="inline-flex items-center gap-1 text-primary text-xs font-medium hover:underline"
              >
                Ver en Google Maps <ArrowUpRight className="w-3 h-3" />
              </MagneticButton>
            </div>
          </motion.div>

          {/* Right: Booking Card */}
          <motion.div
            className="md:col-span-3 bg-card border border-border rounded-2xl p-6 md:p-8 relative overflow-hidden"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            {/* Subtle glow */}
            <motion.div
              className="absolute -inset-px rounded-2xl pointer-events-none"
              style={{
                background: "linear-gradient(135deg, hsl(160 72% 50% / 0.1), transparent, hsl(160 72% 50% / 0.05))",
              }}
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 4, repeat: Infinity }}
            />

            {/* Step indicators */}
            {step !== "confirmed" && (
              <div className="flex items-center gap-2 mb-8 relative z-10">
                {stepIndicators.map((s, i) => {
                  const active = s.key === step;
                  const done =
                    (s.key === "calendar" && (step === "time" || step === "info")) ||
                    (s.key === "time" && step === "info");
                  const Icon = s.icon;

                  return (
                    <div key={s.key} className="flex items-center gap-2">
                      {i > 0 && (
                        <motion.div
                          className="w-8 h-px"
                          style={{ backgroundColor: done ? "hsl(160 72% 50% / 0.5)" : "hsl(0 0% 20%)" }}
                          animate={{ scaleX: done ? 1 : 0.3 }}
                          transition={{ duration: 0.4 }}
                        />
                      )}
                      <motion.button
                        onClick={() => {
                          if (s.key === "calendar") setStep("calendar");
                          if (s.key === "time" && selectedDate) setStep("time");
                        }}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-heading tracking-wider uppercase transition-all duration-300 ${
                          active
                            ? "bg-primary/15 text-primary border border-primary/30"
                            : done
                              ? "text-primary/60 border border-primary/20"
                              : "text-muted-foreground border border-border"
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {done ? <Check className="w-3 h-3" /> : <Icon className="w-3 h-3" />}
                        <span className="hidden sm:inline">{s.label}</span>
                      </motion.button>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Step Content */}
            <div className="relative z-10 min-h-[340px]">
              <AnimatePresence mode="wait">
                {step === "calendar" && (
                  <motion.div
                    key="calendar"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.3 }}
                  >
                    <CalendarGrid
                      month={currentMonth}
                      year={currentYear}
                      selectedDate={selectedDate}
                      onSelect={handleDateSelect}
                      onPrev={prevMonth}
                      onNext={nextMonth}
                    />
                  </motion.div>
                )}

                {step === "time" && selectedDate && (
                  <motion.div
                    key="time"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="mb-5">
                      <button
                        onClick={() => setStep("calendar")}
                        className="text-xs text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 mb-3"
                      >
                        <ChevronLeft className="w-3 h-3" /> Cambiar fecha
                      </button>
                      <h4 className="font-heading text-lg font-semibold">
                        {selectedDate.getDate()} de {MONTHS_ES[selectedDate.getMonth()]}
                      </h4>
                      <p className="text-muted-foreground text-xs mt-1">Selecciona un horario disponible</p>
                    </div>
                    <TimeSlotPicker selectedTime={selectedTime} onSelect={handleTimeSelect} />
                  </motion.div>
                )}

                {step === "info" && (
                  <motion.div
                    key="info"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="mb-5">
                      <button
                        onClick={() => setStep("time")}
                        className="text-xs text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 mb-3"
                      >
                        <ChevronLeft className="w-3 h-3" /> Cambiar hora
                      </button>

                      {/* Selected summary */}
                      <div className="flex items-center gap-3 mb-5 p-3 rounded-xl bg-primary/5 border border-primary/10">
                        <CalendarDays className="w-4 h-4 text-primary" />
                        <span className="text-sm">
                          {selectedDate?.getDate()} de {MONTHS_ES[selectedDate?.getMonth() ?? 0]}, {currentYear}
                        </span>
                        <span className="text-muted-foreground">·</span>
                        <Clock className="w-4 h-4 text-primary" />
                        <span className="text-sm font-medium">{selectedTime}</span>
                      </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-3">
                      <div className="grid grid-cols-2 gap-3">
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                          <input
                            type="text"
                            placeholder="Nombre *"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                            className="w-full bg-secondary text-foreground rounded-xl pl-9 pr-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary transition-all"
                          />
                        </div>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                          <input
                            type="tel"
                            placeholder="Teléfono"
                            value={formData.phone}
                            onChange={(e) => setFormData((p) => ({ ...p, phone: e.target.value }))}
                            className="w-full bg-secondary text-foreground rounded-xl pl-9 pr-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary transition-all"
                          />
                        </div>
                      </div>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                        <input
                          type="email"
                          placeholder="Email *"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                          className="w-full bg-secondary text-foreground rounded-xl pl-9 pr-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary transition-all"
                        />
                      </div>
                      <textarea
                        placeholder="¿Qué te interesa de Creators Hub Club?"
                        rows={2}
                        value={formData.message}
                        onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))}
                        className="w-full bg-secondary text-foreground rounded-xl px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary resize-none transition-all"
                      />
                      <MagneticButton
                        className="w-full bg-primary text-primary-foreground font-heading font-semibold rounded-xl py-3 hover:brightness-110 transition-all flex items-center justify-center gap-2"
                        strength={0.2}
                        onClick={() => handleSubmit({ preventDefault: () => {} } as React.FormEvent)}
                      >
                        Confirmar Visita <ArrowRight className="w-4 h-4" />
                      </MagneticButton>
                    </form>
                  </motion.div>
                )}

                {step === "confirmed" && (
                  <motion.div
                    key="confirmed"
                    className="flex flex-col items-center justify-center h-full min-h-[340px] text-center"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, ease: [0.215, 0.61, 0.355, 1] }}
                  >
                    <motion.div
                      className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-6"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 15, delay: 0.2 }}
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.5, type: "spring" }}
                      >
                        <Check className="w-7 h-7 text-primary" />
                      </motion.div>
                    </motion.div>
                    <h4 className="font-heading text-xl font-bold mb-2">¡Visita Agendada!</h4>
                    <p className="text-muted-foreground text-sm mb-1">
                      {selectedDate?.getDate()} de {MONTHS_ES[selectedDate?.getMonth() ?? 0]}, {currentYear} a las {selectedTime}
                    </p>
                    <p className="text-muted-foreground text-xs mb-6">
                      Te enviaremos un correo de confirmación a <span className="text-primary">{formData.email}</span>
                    </p>
                    <button
                      onClick={reset}
                      className="text-xs text-muted-foreground hover:text-primary transition-colors underline underline-offset-4"
                    >
                      Agendar otra visita
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
