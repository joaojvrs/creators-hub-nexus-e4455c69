import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect, lazy, Suspense } from "react";
import { Play, Volume2, VolumeX } from "lucide-react";
import studioOnair from "@/assets/studio-onair.webp";
import spaceMeeting from "@/assets/space-meeting.webp";
import spaceFront from "@/assets/space-studio.jpg";
import spaceCowork from "@/assets/space-coworking.jpg";
import TextReveal from "./TextReveal";

const ReelsModal = lazy(() => import("./ReelsModal"));

const REEL_SRC = "/media/creators-reel.mp4";
const REEL_POSTER = "/media/creators-reel-poster.jpg";

/* ── Video Thumbnail ── */
const VideoPlayer = ({ onOpenReel, paused }: { onOpenReel: () => void; paused: boolean }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (paused) v.pause();
    else v.play().catch(() => {});
  }, [paused]);

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    setMuted((m) => !m);
    if (videoRef.current) videoRef.current.muted = !videoRef.current.muted;
  };

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
        src={REEL_SRC}
        poster={REEL_POSTER}
        className="w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-background/20 pointer-events-none" />

      <button
        onClick={toggleMute}
        className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-background/40 backdrop-blur-md flex items-center justify-center border border-border/20 hover:bg-background/60 transition-colors"
      >
        {muted ? <VolumeX className="w-4 h-4 text-foreground/80" /> : <Volume2 className="w-4 h-4 text-foreground/80" />}
      </button>

      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
          <Play className="w-7 h-7 text-white ml-1" />
        </div>
      </div>

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
    <>
      <AnimatePresence>
        {reelOpen && (
          <Suspense fallback={null}>
            <ReelsModal onClose={() => setReelOpen(false)} />
          </Suspense>
        )}
      </AnimatePresence>
    <section ref={sectionRef} className="py-12 md:py-24 overflow-hidden" id="espacio">
      <div className="container mx-auto px-6">
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

        <div className="grid grid-cols-12 gap-4 md:gap-6 mb-6">
          <div className="col-span-12 md:col-span-4 lg:col-span-3 flex justify-center">
            <VideoPlayer onOpenReel={() => setReelOpen(true)} paused={reelOpen} />
          </div>

          <div className="col-span-12 md:col-span-8 lg:col-span-9 grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
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
                loading="lazy"
                decoding="async"
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
                loading="lazy"
                decoding="async"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.6 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
              <div className="absolute bottom-5 left-5">
                <span className="inline-block px-3 py-1 bg-primary/20 backdrop-blur-sm text-primary text-xs font-heading font-medium rounded-full border border-primary/20">
                  Espacio
                </span>
              </div>
            </motion.div>

            <motion.div
              className="relative rounded-2xl overflow-hidden aspect-[16/10]"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.35 }}
            >
              <motion.img
                src={spaceMeeting}
                alt="Sala de reuniones"
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.6 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
              <div className="absolute bottom-5 left-5">
                <span className="inline-block px-3 py-1 bg-primary/20 backdrop-blur-sm text-primary text-xs font-heading font-medium rounded-full border border-primary/20">
                  Meeting Room
                </span>
              </div>
            </motion.div>

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
                alt="Creators Studio"
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.6 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5">
                <span className="inline-block px-3 py-1 bg-primary/20 backdrop-blur-sm text-primary text-xs font-heading font-medium rounded-full border border-primary/20">
                  Studio
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
    </>
  );
};

export default SpaceShowcase;
