import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
} from "lucide-react";

// ─── CONFIGURAÇÃO DO CLOUDINARY ──────────────────────────────
export const CLOUDINARY_CLOUD_NAME = "t1ngbr3s";

function getVideoUrl(publicId: string) {
  return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/video/upload/q_auto,f_auto/${publicId}`;
}

function getPosterUrl(publicId: string) {
  return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/video/upload/so_0,q_auto,f_jpg/${publicId}.jpg`;
}

// ─── LISTA DE DEPOIMENTOS ────────────────────────────────────
export const testimonialsData = [
  {
    id: 1,
    name: "Giovanna",
    role: "Aluna do 5° ano",
    publicId: "VID-20261006-WA0023",
    quote: "Aprendi a gostar de ler e escrever.",
  },
  {
    id: 2,
    name: "Heitor",
    role: "Aluno 5° ano",
    publicId: "VID-20261006-WA0027",
    quote: "As aulas me deram muita confiança.",
  },
  {
    id: 3,
    name: "Thaila",
    role: "Aluno do 5° ano",
    publicId: "VID-20261006-WA0026",
    quote: "Evolução visível a cada semana.",
  },
  {
    id: 4,
    name: "Lucas",
    role: "Aluno do 6° ano",
    publicId: "VID-20261006-WA0030",
    quote: "Excelente profissional e muito dedicada.",
  },
  {
    id: 5,
    name: "Larissa",
    role: "Aluna do 6° ano",
    publicId: "VID-20261006-WA0028",
    quote: "A melhor professora que já tive!",
  },
  {
    id: 6,
    name: "Rafaella",
    role: "Aluna do 5° ano",
    publicId: "VID-20261006-WA0029",
    quote: "Recomendo de olhos fechados.",
  },
  {
    id: 7,
    name: "Benício",
    role: "Aluno do 4° ano",
    publicId: "VID-20261006-WA0024",
    quote: "Gratidão eterna pelo cuidado e carinho.",
  },
  {
    id: 8,
    name: "Enzo",
    role: "Aluno 5° ano",
    publicId: "VID-20261006-WA0025",
    quote: "Um divisor de águas no aprendizado dele.",
  },
    {
    id: 9,
    name: "Paulinho",
    role: "Aluno 5° ano",
    publicId: "VID-20261006-WA0051",
    quote: "Aprendi muito e passei a acreditar mais em mim.",
  },
];

// ─── VARIANTES DE ANIMAÇÃO DO SLIDE ─────────────────────────
const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 380 : -380,
    opacity: 0,
    scale: 0.94,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 380 : -380,
    opacity: 0,
    scale: 0.94,
  }),
};

const swipeConfidenceThreshold = 8000;
const swipePower = (offset: number, velocity: number) =>
  Math.abs(offset) * velocity;

// ─── COMPONENTE PRINCIPAL DO CARROSSEL ──────────────────────
export function TestimonialsCarousel() {
  const [[page, direction], setPage] = useState([0, 0]);
  const [isMuted, setIsMuted] = useState(false);
  const videoRefs = useRef<Map<number, HTMLVideoElement>>(new Map());
  const carouselRef = useRef<HTMLDivElement>(null);

  const total = testimonialsData.length;
  const activeIndex = ((page % total) + total) % total;

  const paginate = useCallback(
    (newDirection: number) => {
      // Pausa o vídeo atual antes de trocar de slide
      const currentVideo = videoRefs.current.get(activeIndex);
      if (currentVideo) {
        currentVideo.pause();
      }
      setPage(([prevPage]) => [prevPage + newDirection, newDirection]);
    },
    [activeIndex]
  );

  const goTo = useCallback(
    (index: number) => {
      const currentVideo = videoRefs.current.get(activeIndex);
      if (currentVideo) currentVideo.pause();
      const dir = index > activeIndex ? 1 : -1;
      setPage([index, dir]);
    },
    [activeIndex]
  );

  // Navegação por teclado
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!carouselRef.current) return;
      const rect = carouselRef.current.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;
      if (!inView || total <= 1) return;

      if (e.key === "ArrowLeft") {
        e.preventDefault();
        paginate(-1);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        paginate(1);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [paginate, total]);

  const registerVideoRef = (index: number, el: HTMLVideoElement | null) => {
    if (el) {
      videoRefs.current.set(index, el);
    } else {
      videoRefs.current.delete(index);
    }
  };

  if (total === 0) return null;

  const activeTestimonial = testimonialsData[activeIndex];

  return (
    <div
      ref={carouselRef}
      className="relative mx-auto flex w-full max-w-[900px] flex-col items-center justify-center"
      aria-label="Carrossel de depoimentos em vídeo"
    >
      {/* ── Área do vídeo ── */}
      <div className="relative flex w-full items-center justify-center gap-4 md:gap-6">
        {/* Botão Anterior (Desktop) */}
        {total > 1 && (
          <button
            onClick={() => paginate(-1)}
            aria-label="Depoimento anterior"
            className="z-20 hidden h-11 w-11 shrink-0 items-center justify-center rounded-full shadow-md transition-all hover:scale-105 active:scale-95 md:flex"
            style={{
              background: "var(--bg-base)",
              border: "1px solid rgba(178,58,72,0.25)",
              color: "var(--brand-dark)",
              boxShadow: "0 4px 16px rgba(43,36,38,0.10)",
            }}
          >
            <ChevronLeft size={22} />
          </button>
        )}

        <div className="flex flex-col items-center w-full max-w-[300px] sm:max-w-[320px]">
          {/* Container do vídeo (aspect 9:16) */}
          <div
            className="relative w-full overflow-hidden rounded-[28px] shadow-2xl"
            style={{
              aspectRatio: "9/16",
              background: "#1a0a0d",
              border: "3px solid rgba(255,255,255,0.55)",
              boxShadow: "0 24px 64px rgba(43,36,38,0.22), 0 4px 16px rgba(178,58,72,0.12)",
            }}
          >
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={page}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 280, damping: 30 },
                  opacity: { duration: 0.25 },
                  scale: { duration: 0.3 },
                }}
                drag={total > 1 ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={(_, { offset, velocity }) => {
                  const swipe = swipePower(offset.x, velocity.x);
                  if (swipe < -swipeConfidenceThreshold) paginate(1);
                  else if (swipe > swipeConfidenceThreshold) paginate(-1);
                }}
                className="absolute inset-0"
                style={{ touchAction: "pan-y" }}
              >
                <CustomVideoPlayer
                  key={activeTestimonial.publicId}
                  testimonial={activeTestimonial}
                  isActive={true}
                  isMuted={isMuted}
                  setIsMuted={setIsMuted}
                  registerRef={(el: HTMLVideoElement | null) =>
                    registerVideoRef(activeIndex, el)
                  }
                  onEnded={() => {
                    // Mantém pausado, mostra replay
                  }}
                />
              </motion.div>
            </AnimatePresence>
            
            {/* Indicador de posição (Desktop) — canto superior direito */}
            {total > 1 && (
              <div
                className="pointer-events-none absolute right-3 top-3 z-30 hidden rounded-full px-3 py-1 text-xs font-medium text-white md:block"
                style={{
                  background: "rgba(0,0,0,0.5)",
                  backdropFilter: "blur(6px)",
                  WebkitBackdropFilter: "blur(6px)",
                }}
                aria-live="polite"
                aria-label={`Depoimento ${activeIndex + 1} de ${total}`}
              >
                {activeIndex + 1} / {total}
              </div>
            )}
          </div>

          {/* Dots indicadores super minimalistas (Mobile) IMEDIATAMENTE ABAIXO DO VÍDEO */}
          {total > 1 && (
            <div className="mt-4 flex w-full justify-center gap-1.5 md:hidden">
              {testimonialsData.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className="rounded-full transition-all duration-300"
                  style={{
                    height: "4px",
                    width: i === activeIndex ? "16px" : "4px",
                    background: i === activeIndex ? "var(--brand)" : "rgba(178,58,72,0.2)",
                  }}
                  aria-label={`Depoimento ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Botão Próximo (Desktop) */}
        {total > 1 && (
          <button
            onClick={() => paginate(1)}
            aria-label="Próximo depoimento"
            className="z-20 hidden h-11 w-11 shrink-0 items-center justify-center rounded-full shadow-md transition-all hover:scale-105 active:scale-95 md:flex"
            style={{
              background: "var(--bg-base)",
              border: "1px solid rgba(178,58,72,0.25)",
              color: "var(--brand-dark)",
              boxShadow: "0 4px 16px rgba(43,36,38,0.10)",
            }}
          >
            <ChevronRight size={22} />
          </button>
        )}
      </div>

      {/* ── Informações abaixo do vídeo ── */}
      <div className="mt-6 flex w-full max-w-[480px] flex-col items-center text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center"
          >
            <h3
              className="font-serif text-xl font-medium"
              style={{ color: "var(--text-primary)" }}
            >
              {activeTestimonial.name}
            </h3>
            <p
              className="mt-1 text-[12px] font-light tracking-[0.15em] uppercase"
              style={{ color: "var(--gold-dark)" }}
            >
              {activeTestimonial.role}
            </p>
            <div
              className="my-4 h-px w-10 rounded-full"
              style={{ background: "rgba(178,58,72,0.25)" }}
              aria-hidden
            />
            <p
              className="text-[15px] font-light italic leading-relaxed"
              style={{ color: "var(--text-secondary)" }}
            >
              "{activeTestimonial.quote}"
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Indicador de dots para Desktop (os mesmos, minimalistas) */}
        {total > 1 && (
          <div className="mt-8 hidden w-full justify-center gap-1.5 md:flex">
            {testimonialsData.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className="rounded-full transition-all duration-300"
                style={{
                  height: "4px",
                  width: i === activeIndex ? "16px" : "4px",
                  background: i === activeIndex ? "var(--brand)" : "rgba(178,58,72,0.2)",
                }}
                aria-label={`Depoimento ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── PLAYER DE VÍDEO CUSTOMIZADO ─────────────────────────────
interface CustomVideoPlayerProps {
  testimonial: (typeof testimonialsData)[number];
  isActive: boolean;
  isMuted: boolean;
  setIsMuted: (v: boolean) => void;
  registerRef: (el: HTMLVideoElement | null) => void;
  onEnded: () => void;
}

function CustomVideoPlayer({
  testimonial,
  isActive,
  isMuted,
  setIsMuted,
  registerRef,
  onEnded,
}: CustomVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasEnded, setHasEnded] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const controlsTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const videoUrl = getVideoUrl(testimonial.publicId);
  const posterUrl = getPosterUrl(testimonial.publicId);

  // Monitorar mudanças no fullscreen para adaptar o object-fit
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  useEffect(() => {
    registerRef(videoRef.current);
    return () => registerRef(null);
  }, [registerRef]);

  useEffect(() => {
    if (!isActive && videoRef.current && !videoRef.current.paused) {
      videoRef.current.pause();
    }
  }, [isActive]);

  const resetControlsTimeout = useCallback(() => {
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) setShowControls(false);
    }, 2800);
  }, [isPlaying]);

  const togglePlay = useCallback(
    (e?: React.MouseEvent | React.KeyboardEvent) => {
      e?.stopPropagation();
      if (!videoRef.current) return;

      if (hasEnded) {
        videoRef.current.currentTime = 0;
        setHasEnded(false);
        setProgress(0);
        videoRef.current.play();
        return;
      }

      if (videoRef.current.paused) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    },
    [hasEnded]
  );

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMuted(!isMuted);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    setCurrentTime(videoRef.current.currentTime);
    const d = videoRef.current.duration;
    if (d && !isNaN(d)) {
      setProgress((videoRef.current.currentTime / d) * 100);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) setDuration(videoRef.current.duration);
  };

  const handleVideoEnd = () => {
    setIsPlaying(false);
    setHasEnded(true);
    setShowControls(true);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    onEnded();
  };

  const formatTime = (t: number) => {
    if (isNaN(t) || !isFinite(t)) return "0:00";
    const m = Math.floor(t / 60);
    const s = Math.floor(t % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    const val = parseFloat(e.target.value);
    if (videoRef.current && duration) {
      videoRef.current.currentTime = (val / 100) * duration;
      setProgress(val);
    }
  };

  const toggleFullScreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!document.fullscreenElement && containerRef.current) {
      containerRef.current.requestFullscreen().catch(() => {});
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  };

  const handleMouseMove = () => {
    setShowControls(true);
    if (isPlaying) resetControlsTimeout();
  };

  useEffect(() => {
    if (!isPlaying) {
      setShowControls(true);
      if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    }
    return () => {
      if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    };
  }, [isPlaying]);

  return (
    <div
      ref={containerRef}
      className="relative flex h-full w-full items-center justify-center overflow-hidden bg-black"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { if (isPlaying) setShowControls(false); }}
      onClick={togglePlay}
      onKeyDown={(e) => {
        if (e.key === " " || e.key === "Enter") {
          e.preventDefault();
          togglePlay(e);
        }
      }}
      tabIndex={0}
      role="region"
      aria-label={`Vídeo de depoimento de ${testimonial.name}`}
      style={{ cursor: "pointer" }}
    >
      <video
        ref={videoRef}
        src={videoUrl}
        poster={posterUrl}
        // object-contain in fullscreen to keep 9:16 aspect ratio correctly, object-cover outside
        className={`h-full w-full ${isFullscreen ? "object-contain" : "object-cover"}`}
        preload="metadata"
        playsInline
        muted={isMuted}
        onPlay={() => { setIsPlaying(true); setHasEnded(false); }}
        onPause={() => setIsPlaying(false)}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleVideoEnd}
        aria-label={`Depoimento de ${testimonial.name}`}
      />

      <AnimatePresence>
        {(!isPlaying) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="pointer-events-none absolute inset-0 flex items-center justify-center"
            style={{ background: "rgba(0,0,0,0.32)", backdropFilter: "blur(2px)", WebkitBackdropFilter: "blur(2px)" }}
          >
            <div
              className="flex h-[72px] w-[72px] items-center justify-center rounded-full shadow-xl"
              style={{
                background: "rgba(255,255,255,0.18)",
                border: "1.5px solid rgba(255,255,255,0.45)",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
              }}
            >
              {hasEnded ? (
                <RotateCcw size={28} className="text-white" />
              ) : (
                <Play size={30} className="ml-1 text-white" fill="white" />
              )}
            </div>
            {hasEnded && (
              <span
                className="absolute bottom-36 text-xs font-medium tracking-wide text-white/80"
                style={{ textShadow: "0 1px 4px rgba(0,0,0,0.5)" }}
              >
                Assistir novamente
              </span>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        animate={{ opacity: showControls ? 1 : 0, y: showControls ? 0 : 12 }}
        transition={{ duration: 0.28 }}
        className="absolute bottom-0 left-0 right-0 z-20 flex flex-col justify-end px-4 pb-5 pt-20"
        style={{
          background: "linear-gradient(to top, rgba(0,0,0,0.90) 0%, rgba(0,0,0,0.0) 100%)",
          pointerEvents: showControls ? "auto" : "none",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="group/progress relative flex h-5 w-full cursor-pointer items-center">
          <input
            type="range"
            min="0"
            max="100"
            step="0.1"
            value={isNaN(progress) ? 0 : progress}
            onChange={handleSeek}
            onClick={(e) => e.stopPropagation()}
            className="absolute inset-0 z-10 w-full cursor-pointer opacity-0"
            aria-label="Progresso do vídeo"
          />
          <div className="h-1 w-full overflow-hidden rounded-full bg-white/30 transition-all duration-200 group-hover/progress:h-1.5">
            <div
              className="h-full rounded-full transition-[width]"
              style={{
                width: `${progress}%`,
                background: "linear-gradient(to right, rgba(227,163,169,0.9), #fff)",
              }}
            />
          </div>
        </div>

        <div className="mt-2.5 flex items-center justify-between text-white">
          <div className="flex items-center gap-3.5">
            <button
              onClick={togglePlay}
              aria-label={hasEnded ? "Assistir novamente" : isPlaying ? "Pausar vídeo" : "Reproduzir vídeo"}
              className="flex h-8 w-8 items-center justify-center rounded-full transition-transform hover:scale-110 active:scale-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white/70"
            >
              {hasEnded ? (
                <RotateCcw size={17} />
              ) : isPlaying ? (
                <Pause size={18} fill="white" />
              ) : (
                <Play size={18} fill="white" className="ml-0.5" />
              )}
            </button>

            <button
              onClick={toggleMute}
              aria-label={isMuted ? "Ativar som" : "Silenciar vídeo"}
              className="flex h-8 w-8 items-center justify-center rounded-full transition-transform hover:scale-110 active:scale-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white/70"
            >
              {isMuted ? <VolumeX size={17} /> : <Volume2 size={17} />}
            </button>

            <span className="select-none text-[11px] font-medium tabular-nums opacity-85 drop-shadow">
              {formatTime(currentTime)}&thinsp;/&thinsp;{formatTime(duration)}
            </span>
          </div>

          <button
            onClick={toggleFullScreen}
            aria-label="Tela cheia"
            className="flex h-8 w-8 items-center justify-center rounded-full transition-transform hover:scale-110 active:scale-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white/70"
          >
            <Maximize size={16} />
          </button>
        </div>
      </motion.div>
    </div>
  );
}
