import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { VolumeX, Heart, MessageCircle, Send, Bookmark, X, MoreHorizontal } from "lucide-react";
import creatorsLogo from "@/assets/creators-logo-white.png";

const REEL_SRC = "/media/creators-reel.mp4";
const REEL_POSTER = "/media/creators-reel-poster.jpg";

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
          <div className="flex items-center gap-1">
            <div className="w-4 h-2.5 border border-white/50 rounded-sm relative">
              <div className="absolute inset-[1px] right-[2px] bg-white/70 rounded-[1px]" />
            </div>
          </div>
        </div>
        <div className="relative z-20 flex items-center justify-between px-4 py-2">
          <span className="text-white font-semibold text-base">Reels</span>
          <button onClick={onClose} className="text-white/80 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="flex-1 relative">
          <video
            ref={videoRef}
            src={REEL_SRC}
            poster={REEL_POSTER}
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            loop
            playsInline
            muted={isMuted}
            preload="auto"
          />
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-white/20 z-20">
            <motion.div className="h-full bg-white" style={{ width: `${progress}%` }} />
          </div>
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
            <button><Bookmark className="w-7 h-7 text-white" /></button>
            <button><MoreHorizontal className="w-7 h-7 text-white" /></button>
            <div className="w-8 h-8 rounded-lg border-2 border-white overflow-hidden bg-primary flex items-center justify-center">
              <img src={creatorsLogo} alt="Creators" className="w-6 h-auto" />
            </div>
          </div>
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
