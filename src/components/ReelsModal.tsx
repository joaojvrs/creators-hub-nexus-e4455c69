import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { VolumeX, Volume2, Heart, MessageCircle, Send, Bookmark, X, MoreHorizontal, ChevronUp } from "lucide-react";
import creatorsLogo from "@/assets/creators-logo-white.png";

const REELS = [
  {
    src: "/media/creators-reel.mp4",
    poster: "/media/creators-reel-poster.jpg",
    caption: "Nuestro espacio en Barcelona 🎬✨ Estudio, showroom, coworking y más.",
    tags: "#CreatorsHubClub #Barcelona #ContentCreator",
    likes: "2.4k",
    comments: "128",
  },
  {
    src: "/media/creators-reel-2.mp4",
    poster: "/media/creators-reel-2-poster.jpg",
    caption: "Donde las ideas se convierten en contenido real 🚀",
    tags: "#Creators #RRSS #BCN",
    likes: "1.8k",
    comments: "92",
  },
];

const ReelItem = ({
  reel,
  isActive,
  isMuted,
  onToggleMute,
}: {
  reel: typeof REELS[number];
  isActive: boolean;
  isMuted: boolean;
  onToggleMute: () => void;
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [liked, setLiked] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (isActive) {
      v.currentTime = 0;
      v.play().catch(() => {});
    } else {
      v.pause();
    }
  }, [isActive]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const update = () => setProgress((v.currentTime / v.duration) * 100 || 0);
    v.addEventListener("timeupdate", update);
    return () => v.removeEventListener("timeupdate", update);
  }, []);

  return (
    <div className="relative w-full h-full shrink-0">
      <video
        ref={videoRef}
        src={reel.src}
        poster={reel.poster}
        className="absolute inset-0 w-full h-full object-cover"
        loop
        playsInline
        muted={isMuted}
        preload="auto"
      />
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-white/20 z-20">
        <div className="h-full bg-white transition-[width] duration-150" style={{ width: `${progress}%` }} />
      </div>

      <div className="absolute right-3 bottom-24 flex flex-col items-center gap-5 z-20">
        <button onClick={() => setLiked(!liked)} className="flex flex-col items-center gap-1">
          <Heart className={`w-7 h-7 ${liked ? "fill-red-500 text-red-500" : "text-white"} transition-colors`} />
          <span className="text-white text-[10px]">{reel.likes}</span>
        </button>
        <button className="flex flex-col items-center gap-1">
          <MessageCircle className="w-7 h-7 text-white" />
          <span className="text-white text-[10px]">{reel.comments}</span>
        </button>
        <button className="flex flex-col items-center gap-1">
          <Send className="w-7 h-7 text-white" />
          <span className="text-white text-[10px]">Share</span>
        </button>
        <button><Bookmark className="w-7 h-7 text-white" /></button>
        <button><MoreHorizontal className="w-7 h-7 text-white" /></button>
        <div className="w-8 h-8 rounded-lg border-2 border-white overflow-hidden bg-primary flex items-center justify-center">
          <img src={creatorsLogo} alt="Creators" className="w-6 h-auto" />
        </div>
      </div>

      <div className="absolute bottom-6 left-3 right-14 z-20">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 rounded-full bg-primary/80 flex items-center justify-center overflow-hidden">
            <img src={creatorsLogo} alt="Creators" className="w-5 h-auto" />
          </div>
          <span className="text-white text-sm font-semibold">creatorshubclub</span>
          <span className="text-white/50 text-xs">• Seguir</span>
        </div>
        <p className="text-white text-xs leading-relaxed">
          {reel.caption}
          <span className="text-white/50"> {reel.tags}</span>
        </p>
      </div>

      <button
        onClick={(e) => { e.stopPropagation(); onToggleMute(); }}
        className="absolute top-16 right-3 z-20 w-9 h-9 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center"
      >
        {isMuted ? <VolumeX className="w-4 h-4 text-white" /> : <Volume2 className="w-4 h-4 text-white" />}
      </button>
    </div>
  );
};

const ReelsModal = ({ onClose }: { onClose: () => void }) => {
  const [isMuted, setIsMuted] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.y < -60 && activeIdx < REELS.length - 1) setActiveIdx(activeIdx + 1);
    else if (info.offset.y > 60 && activeIdx > 0) setActiveIdx(activeIdx - 1);
  };

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="relative w-[340px] md:w-[380px] h-[680px] md:h-[760px] bg-black rounded-[3rem] border-[3px] border-neutral-700 shadow-2xl overflow-hidden flex flex-col"
        initial={{ scale: 0.7, y: 60 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.7, y: 60 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 bg-black rounded-b-2xl z-30" />
        <div className="relative z-20 flex items-center justify-between px-6 pt-2 pb-1 text-[10px] text-white/70 font-medium">
          <span>9:41</span>
          <div className="w-4 h-2.5 border border-white/50 rounded-sm relative">
            <div className="absolute inset-[1px] right-[2px] bg-white/70 rounded-[1px]" />
          </div>
        </div>
        <div className="relative z-20 flex items-center justify-between px-4 py-2">
          <span className="text-white font-semibold text-base">Reels</span>
          <button onClick={onClose} className="text-white/80 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div ref={containerRef} className="flex-1 relative overflow-hidden">
          <motion.div
            className="absolute inset-0 w-full h-full"
            animate={{ y: `-${activeIdx * 100}%` }}
            transition={{ type: "spring", damping: 32, stiffness: 260, mass: 0.8 }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={0.18}
            onDragEnd={handleDragEnd}
          >
            {REELS.map((reel, i) => (
              <div key={i} className="absolute left-0 right-0 h-full" style={{ top: `${i * 100}%` }}>
                <ReelItem
                  reel={reel}
                  isActive={i === activeIdx}
                  isMuted={isMuted}
                  onToggleMute={() => setIsMuted(!isMuted)}
                />
              </div>
            ))}
          </motion.div>

          {/* Right-side dots indicator */}
          <div className="absolute right-1.5 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-1.5 pointer-events-none">
            {REELS.map((_, i) => (
              <div
                key={i}
                className={`w-1 rounded-full transition-all ${i === activeIdx ? "bg-white h-6" : "bg-white/40 h-2"}`}
              />
            ))}
          </div>

          {/* Next reel CTA */}
          {activeIdx < REELS.length - 1 && (
            <motion.button
              onClick={() => setActiveIdx(activeIdx + 1)}
              className="absolute bottom-3 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-1 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className="text-white text-[10px] font-medium tracking-wide flex items-center gap-1">
                <ChevronUp className="w-3 h-3" /> Desliza para el siguiente reel
              </span>
            </motion.button>
          )}
          {activeIdx > 0 && (
            <button
              onClick={() => setActiveIdx(activeIdx - 1)}
              className="absolute top-14 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white text-[10px]"
            >
              <ChevronUp className="w-3 h-3 rotate-180" /> Reel anterior
            </button>
          )}
        </div>

        <div className="relative z-20 flex items-center justify-around py-2 pb-4 bg-black border-t border-white/10">
          {["🏠", "🔍", "➕", "🎬", "👤"].map((icon, i) => (
            <span key={i} className={`text-lg ${i === 3 ? "opacity-100" : "opacity-40"}`}>{icon}</span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ReelsModal;
