import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX, Heart, MessageCircle, Send, Bookmark, X, MoreHorizontal } from "lucide-react";
import studioOnair from "@/assets/studio-onair.png";
import spaceFront from "@/assets/space-front.jpg";
import spaceCowork from "@/assets/space-cowork.jpg";
import creatorsReel from "@/assets/creators-reel.mp4";
import creatorsLogo from "@/assets/creators-logo-white.png";
import TextReveal from "./TextReveal";

/* ── Instagram Reels Modal ── */
const ReelsModal = ({ onClose }: { onClose: () => void }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [liked, setLiked] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const update = () => setProgress((v.currentTime / v.duration) * 100 || 0);
    v.addEventListener("timeupdate", update);
    return () => v.removeEventListener("timeupdate", update);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      {/* Phone frame */}
      <motion.div
        className="relative w-[340px] md:w-[380px] h-[680px] md:h-[760px] bg-black rounded-[3rem] border-[3px] border-neutral-700 shadow-2xl overflow-hidden flex flex-col"
        initial={{ scale: 0.7, y: 60 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.7, y: 60 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 bg-black rounded-b-2xl z-30" />

        {/* Status bar */}
        <div className="relative z-20 flex items-center justify-between px-6 pt-2 pb-1 text-[10px] text-white/70 font-medium">
          <span>9:41</span>
          <div className="flex items-center gap-1">
            <div className="w-4 h-2.5 border border-white/50 rounded-sm relative">
              <div className="absolute inset-[1px] right-[2px] bg-white/70 rounded-[1px]" />
            </div>
          </div>
        </div>

        {/* Top bar: Reels + camera */}
        <div className="relative z-20 flex items-center justify-between px-4 py-2">
          <span className="text-white font-semibold text-base">Reels</span>
          <button onClick={onClose} className="text-white/80 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Video */}
        <div className="flex-1 relative">
          <video
            ref={videoRef}
            src={creatorsReel}
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            loop
            playsInline
            muted={isMuted}
          />

          {/* Progress bar */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-white/20 z-20">
            <motion.div className="h-full bg-white" style={{ width: `${progress}%` }} />
          </div>

          {/* Right side actions (Instagram style) */}
          <div className="absolute right-3 bottom-20 flex flex-col items-center gap-5 z-20">
            <button onClick={() => setLiked(!liked)} className="flex flex-col items-center gap-1">
              <Heart className={`w-7 h-7 ${liked ? "fill-red-500 text-red-500" : "text-white"} transition-colors`} />
              <span className="text-white text-[10px]">2.4k</span>
            </button>
            <button className="flex flex-col items-center gap-1">
              <MessageCircle className="w-7 h-7 text-white" />
              <span className="text-white text-[10px]">128</span>
            </button>
            <button className="flex flex-col items-center gap-1">
              <Send className="w-7 h-7 text-white" />
              <span className="text-white text-[10px]">Share</span>
            </button>
            <button>
              <Bookmark className="w-7 h-7 text-white" />
            </button>
            <button>
              <MoreHorizontal className="w-7 h-7 text-white" />
            </button>
            {/* Profile pic */}
            <div className="w-8 h-8 rounded-lg border-2 border-white overflow-hidden bg-primary flex items-center justify-center">
              <img src={creatorsLogo} alt="Creators" className="w-6 h-auto" />
            </div>
          </div>

          {/* Bottom info (Instagram style) */}
          <div className="absolute bottom-3 left-3 right-14 z-20">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-full bg-primary/80 flex items-center justify-center overflow-hidden">
                <img src={creatorsLogo} alt="Creators" className="w-5 h-auto" />
              </div>
              <span className="text-white text-sm font-semibold">creatorshubclub</span>
              <span className="text-white/50 text-xs">• Seguir</span>
            </div>
            <p className="text-white text-xs leading-relaxed">
              Nuestro espacio en Barcelona 🎬✨ Estudio, showroom, coworking y más.
              <span className="text-white/50"> #CreatorsHubClub #Barcelona #ContentCreator</span>
            </p>
            <div className="flex items-center gap-2 mt-2">
              <div className="flex items-center gap-1.5 bg-white/10 rounded-full px-2.5 py-1">
                <div className="w-3 h-3 rounded-full bg-white/60 animate-pulse" />
                <span className="text-white/70 text-[10px]">Original Audio</span>
              </div>
            </div>
          </div>

          {/* Mute toggle */}
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
          >
            <AnimatePresence>
              {isMuted && (
                <motion.div
                  className="w-12 h-12 rounded-full bg-black/50 flex items-center justify-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                >
                  <VolumeX className="w-5 h-5 text-white" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>

        {/* Bottom nav bar (Instagram style) */}
        <div className="relative z-20 flex items-center justify-around py-2 pb-4 bg-black border-t border-white/10">
          {["🏠", "🔍", "➕", "🎬", "👤"].map((icon, i) => (
            <span key={i} className={`text-lg ${i === 3 ? "opacity-100" : "opacity-40"}`}>{icon}</span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

/* ── Video Thumbnail ── */
const VideoPlayer = ({ onOpenReel }: { onOpenReel: () => void }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <motion.div
      className="relative rounded-2xl overflow-hidden aspect-[9/16] max-h-[70vh] md:max-h-[80vh] w-full cursor-pointer group"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      onClick={onOpenReel}
    >
      <video
        ref={videoRef}
        src={creatorsReel}
        className="w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
      />

      <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-background/20 pointer-events-none" />

      {/* Play overlay on hover */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
          <Play className="w-7 h-7 text-white ml-1" />
        </div>
      </div>

      {/* Reel badge */}
      <motion.div
        className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 bg-background/40 backdrop-blur-md rounded-full border border-border/20"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8 }}
      >
        <motion.div
          className="w-2 h-2 rounded-full bg-primary"
          animate={{ scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        <span className="text-[10px] font-heading tracking-widest uppercase text-foreground/80">Reel</span>
      </motion.div>

      <div className="absolute bottom-4 left-4 right-4 z-10">
        <span className="inline-block px-3 py-1 bg-primary/20 backdrop-blur-md text-primary text-xs font-heading font-medium rounded-full border border-primary/20 mb-2">
          📍 Barcelona
        </span>
        <p className="text-foreground font-heading text-sm font-semibold">Toca para ver el reel completo</p>
      </div>
    </motion.div>
  );
};

const SpaceShowcase = () => {
  const [reelOpen, setReelOpen] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y2 = useTransform(scrollYProgress, [0, 1], [60, -40]);
  const y3 = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section ref={sectionRef} className="py-12 md:py-24 overflow-hidden" id="espacio">
      <div className="container mx-auto px-6">
        {/* Heading */}
        <div className="flex items-end justify-between mb-10 md:mb-16">
          <div>
            <motion.p
              className="text-primary font-heading text-xs tracking-[0.3em] uppercase mb-2"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <motion.span
                className="inline-block w-6 h-px bg-primary mr-2 align-middle"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                style={{ transformOrigin: "left" }}
              />
              Nuestro Espacio
            </motion.p>
            <TextReveal className="font-heading text-3xl md:text-5xl lg:text-6xl font-bold leading-[0.95] block" as="h2">
              Donde nace el contenido
            </TextReveal>
          </div>
          <motion.p
            className="text-muted-foreground text-sm max-w-xs hidden md:block text-right leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            Un espacio diseñado para crear, grabar, vender y conectar.
            Todo bajo un mismo techo en Barcelona.
          </motion.p>
        </div>

        {/* Main layout: vertical reel + right content stack */}
        <div className="grid grid-cols-12 gap-4 md:gap-6 mb-6">
          {/* Reel video — 9:16 vertical */}
          <div className="col-span-12 md:col-span-4 lg:col-span-3 flex justify-center">
            <VideoPlayer />
          </div>

          {/* Right content — stacked images + info */}
          <div className="col-span-12 md:col-span-8 lg:col-span-9 grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
            {/* Studio ON AIR */}
            <motion.div
              className="relative rounded-2xl overflow-hidden aspect-[16/10]"
              style={{ y: y2 }}
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.15, ease: [0.215, 0.61, 0.355, 1] }}
            >
              <motion.img
                src={studioOnair}
                alt="Estudio ON AIR"
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.6 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
              <div className="absolute bottom-5 left-5">
                <span className="inline-block px-3 py-1 bg-primary/20 backdrop-blur-sm text-primary text-xs font-heading font-medium rounded-full border border-primary/20">
                  Creators Studio
                </span>
              </div>
            </motion.div>

            {/* Cowork */}
            <motion.div
              className="relative rounded-2xl overflow-hidden aspect-[16/10]"
              style={{ y: y3 }}
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.25, ease: [0.215, 0.61, 0.355, 1] }}
            >
              <motion.img
                src={spaceCowork}
                alt="Zona de coworking"
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.6 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
              <div className="absolute bottom-5 left-5">
                <span className="inline-block px-3 py-1 bg-primary/20 backdrop-blur-sm text-primary text-xs font-heading font-medium rounded-full border border-primary/20">
                  Coworking
                </span>
              </div>
            </motion.div>

            {/* Info block */}
            <motion.div
              className="bg-card border border-border rounded-2xl p-6 md:p-8 flex flex-col justify-center relative overflow-hidden group"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.35 }}
              whileHover={{ borderColor: "hsl(162 100% 35% / 0.3)" }}
            >
              <div className="absolute inset-0 bg-radial-green opacity-0 group-hover:opacity-50 transition-opacity duration-700" />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-3">
                  <motion.div
                    className="w-2 h-2 rounded-full bg-primary"
                    animate={{ scale: [1, 1.5, 1], opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <span className="text-primary font-heading text-xs tracking-widest uppercase">En construcción</span>
                </div>
                <TextReveal className="text-foreground font-heading text-xl font-semibold mb-2 block" as="p">
                  Abrimos pronto
                </TextReveal>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Estudio profesional de podcast, sets para grabación, showroom de productos y zona de networking.
                </p>
              </div>
            </motion.div>

            {/* Entrance */}
            <motion.div
              className="relative rounded-2xl overflow-hidden aspect-[16/10]"
              style={{ y: y3 }}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.img
                src={spaceFront}
                alt="Fachada interior"
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.6 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5">
                <span className="inline-block px-3 py-1 bg-primary/20 backdrop-blur-sm text-primary text-xs font-heading font-medium rounded-full border border-primary/20">
                  Conexiones
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpaceShowcase;
