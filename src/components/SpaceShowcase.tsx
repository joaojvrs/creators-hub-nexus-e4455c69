import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import studioOnair from "@/assets/studio-onair.png";
import spaceFront from "@/assets/space-front.jpg";
import spaceCowork from "@/assets/space-cowork.jpg";
import spaceEntrance from "@/assets/space-entrance.jpg";
import creatorsReel from "@/assets/creators-reel.mp4";
import TextReveal from "./TextReveal";

const VideoPlayer = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) videoRef.current.pause();
    else videoRef.current.play();
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <motion.div
      className="relative rounded-2xl overflow-hidden aspect-[9/16] max-h-[70vh] md:max-h-[80vh] w-full"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
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

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-background/20 pointer-events-none" />

      {/* Live indicator */}
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

      {/* Controls */}
      <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between z-10">
        <div>
          <span className="inline-block px-3 py-1 bg-primary/20 backdrop-blur-md text-primary text-xs font-heading font-medium rounded-full border border-primary/20 mb-2">
            📍 Barcelona
          </span>
          <p className="text-foreground font-heading text-sm font-semibold">Nuestro espacio</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={toggleMute}
            className="w-9 h-9 rounded-full bg-background/40 backdrop-blur-md border border-border/30 flex items-center justify-center text-foreground/80 hover:text-primary hover:border-primary/30 transition-all duration-300"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
          <button
            onClick={togglePlay}
            className="w-9 h-9 rounded-full bg-primary/20 backdrop-blur-md border border-primary/30 flex items-center justify-center text-primary hover:bg-primary/30 transition-all duration-300"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const SpaceShowcase = () => {
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
