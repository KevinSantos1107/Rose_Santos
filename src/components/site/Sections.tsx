import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  PenLine,
  NotebookText,
  Route as RouteIcon,
  Sparkles,
  CircleCheck,
  GraduationCap,
  BookMarked,
  MessageSquareQuote,
  MessageCircle,
  Phone,
  Mail,
  Menu,
  X,
  Monitor,
  MapPin,
  Maximize,
  ChevronLeft,
  ChevronRight,
  Play
} from "lucide-react";
import { WA_LINK, HERO_VIDEO } from "../../lib/constants";
import { Reveal, Stagger, Item, itemVariants, RosePhoto } from "./Motion";
import { TestimonialsCarousel } from "./TestimonialsCarousel";

const links = [
  ["Início", "#inicio"],
  ["Sobre", "#sobre"],
  ["Aulas", "#aulas"],
  ["Metodologia", "#metodologia"],
  ["Formação", "#formacao"],
  ["Contato", "#contato"],
] as const;

/* ─── HEADER ──────────────────────────────────────────────── */
export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    setIsDesktop(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 60);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  const onHero = !scrolled && !open;
  const isWhite = onHero;

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className={`mx-auto flex max-w-[1100px] items-center justify-between rounded-2xl px-4 py-3 transition-all duration-500 sm:px-6 ${
          scrolled || open ? "nav-glass" : "border border-transparent"
        }`}
      >
        <a href="#inicio" className="flex flex-col leading-tight">
          <span
            className="font-serif text-[20px] font-medium tracking-wide transition-colors duration-500 sm:text-[22px]"
            style={{ 
              color: isWhite ? "#fff" : "var(--text-primary)",
              textShadow: isWhite ? "0 2px 12px rgba(0,0,0,0.4)" : "none"
            }}
          >
            ROSE SANTOS
          </span>
          <span
            className="text-[10px] font-light tracking-[0.18em] transition-colors duration-500 sm:text-[11px]"
            style={{ 
              color: isWhite ? "rgba(255,255,255,0.85)" : "var(--text-muted)",
              textShadow: isWhite ? "0 2px 8px rgba(0,0,0,0.4)" : "none"
            }}
          >
            Professora • Pedagoga
          </span>
        </a>

        <nav className="hidden gap-7 lg:flex" aria-label="Principal">
          {links.map(([l, h]) => (
            <a
              key={h}
              href={h}
              className={`nav-link ${isWhite ? "nav-link-light" : ""}`}
            >
              {l}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2.5">
          <motion.a
            href={WA_LINK}
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
            className={`${isWhite ? "btn-hero" : "btn-brand"} !hidden !min-h-[40px] !px-5 !text-sm lg:!inline-flex`}
          >
            Fale comigo
          </motion.a>
          <motion.button
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92, rotate: 90 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            className="flex h-10 w-10 items-center justify-center lg:hidden"
            style={{
              background: "transparent",
              border: "none",
              color: isWhite ? "#fff" : "var(--text-primary)",
              filter: isWhite ? "drop-shadow(0 2px 8px rgba(0,0,0,0.3))" : "none"
            }}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
      </motion.div>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -8, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-2 max-w-[1100px] rounded-2xl p-3 shadow-hover lg:hidden"
          style={{
            border: "1px solid var(--border-subtle)",
            background: "var(--bg-base)",
            boxShadow: "0 8px 32px rgba(43,36,38,0.10)",
          }}
        >
          {links.map(([l, h]) => (
            <a
              key={h}
              href={h}
              onClick={() => setOpen(false)}
              className="block rounded-xl px-4 py-3 text-[15px] transition-colors"
              style={{ color: "var(--text-primary)" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "rgba(178,58,72,0.08)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "transparent")
              }
            >
              {l}
            </a>
          ))}
          <a
            href={WA_LINK}
            target="_blank"
            rel="noreferrer"
            className="btn-brand mt-2 w-full"
          >
            <MessageCircle size={18} /> Fale comigo pelo WhatsApp
          </a>
        </motion.div>
      )}
    </header>
  );
}

/* ─── HERO ────────────────────────────────────────────────── */
const fade = (delay: number, y = 20) => ({
  initial: { opacity: 0, y, rotateX: 10, z: -50 },
  animate: { opacity: 1, y: 0, rotateX: 0, z: 0 },
  transition: {
    duration: 1.2,
    delay,
    ease: [0.16, 1, 0.3, 1] as const,
  },
});

/* Mobile-optimised stagger: lighter animation (opacity + translateY only) */
const fadeMobile = (delay: number, y = 12) => ({
  initial: { opacity: 0, y },
  animate: { opacity: 1, y: 0 },
  transition: {
    duration: 0.7,
    delay,
    ease: [0.22, 1, 0.36, 1] as const,
  },
});

export function Hero() {
  const subjects = [
    { label: "Acompanhamento Completo e Personalizado", Icon: BookOpen },
  ];

  // Trava a altura do hero no valor capturado no mount para evitar
  // o "reajuste" causado pelo browser chrome aparecer/sumir no mobile.
  const [heroH, setHeroH] = useState<number | null>(null);
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    setHeroH(window.innerHeight);
    const mq = window.matchMedia("(min-width: 1024px)");
    setIsDesktop(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  /* Choose animation helper based on viewport */
  const f = isDesktop ? fade : fadeMobile;

  return (
    <section
      id="inicio"
      className="hero-section relative isolate flex overflow-hidden perspective-container"
      style={{
        background: "var(--hero-deep)",
        minHeight: heroH ? `${heroH}px` : "100svh",
      }}
    >
      {/* Mídia de fundo: foto (ou vídeo, se HERO_VIDEO estiver preenchido) */}
      <motion.div
        className="hero-photo absolute inset-0 lg:inset-y-0 lg:right-0 lg:left-auto lg:w-[62%]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        {HERO_VIDEO ? (
          <video
            className="hero-bg-media"
            src={HERO_VIDEO}
            poster="/rose-santos.jpg"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-label="Rose Santos, professora e pedagoga"
          />
        ) : (
          <RosePhoto
            alt="Rose Santos, professora e pedagoga, sorrindo à mesa de estudos"
            position="hero-bg-media-pos"
            priority={true}
          />
        )}
      </motion.div>

      {/* === OVERLAY MOBILE: gradiente suave só na parte inferior === */}
      <div className="hero-overlay-mobile lg:hidden" aria-hidden />

      {/* === OVERLAYS DESKTOP === */}
      <div
        className="absolute inset-y-0 left-0 hidden lg:block"
        aria-hidden
        style={{
          width: "42%",
          background: "linear-gradient(to right, rgba(42,18,22,1) 0%, rgba(42,18,22,1) 75%, rgba(42,18,22,0) 100%)",
        }}
      />

      {/* ── CONTEÚDO MOBILE (<1024px) ── */}
      <div className="hero-content-mobile relative z-10 flex w-full flex-col justify-end lg:hidden">
        <div className="hero-content-inner">
          <motion.h1
            {...f(0.15)}
            className="hero-title-mobile"
          >
            Aprender fica mais fácil com o{" "}
            <em className="gold-italic-hero">caminho certo.</em>
          </motion.h1>

          <motion.p
            {...f(0.23)}
            className="hero-subtitle-mobile"
          >
            Aulas particulares de Português e Alfabetização, online ou presencial.
          </motion.p>

          <motion.a
            {...f(0.31)}
            href={WA_LINK}
            target="_blank"
            rel="noreferrer"
            className="hero-cta-primary"
          >
            <MessageCircle size={20} strokeWidth={2} aria-hidden />
            Falar no WhatsApp
          </motion.a>

          <motion.a
            {...f(0.39)}
            href="#sobre"
            className="hero-cta-secondary"
          >
            Conheça meu trabalho ↓
          </motion.a>

          <motion.p
            {...f(0.47)}
            className="hero-microcopy"
          >
            Mais confiança para aprender. Mais segurança para avançar.
          </motion.p>
        </div>
      </div>

      {/* ── CONTEÚDO DESKTOP (≥1024px — preservado) ── */}
      <div className="container-site w-full relative z-10 hidden h-full flex-col justify-end pb-[max(1rem,env(safe-area-inset-bottom))] lg:flex lg:items-start lg:justify-center lg:pb-6 lg:pt-[88px]">
        <motion.div
          className="max-w-[580px]"
          style={{ transformStyle: "preserve-3d" }}
        >
          <motion.h1
            {...fade(0.2, 40)}
            className="hero-title lg:mt-[40px]"
            style={{ color: "#fff", textShadow: "0 4px 20px rgba(0,0,0,0.6)" }}
          >
            Aprender pode ser mais fácil quando encontramos o{" "}
            <span className="gold-italic-hero">caminho certo.</span>
          </motion.h1>

          <motion.p
            {...fade(0.35)}
            className="mt-5 max-w-[520px] text-[19px] font-light leading-relaxed"
            style={{ color: "rgba(255,255,255,0.95)" }}
          >
            Educação transformadora,
            respeitando o ritmo e as potencialidades de cada aluno.
          </motion.p>

          {/* Tópicos: chips + modalidade (apenas desktop) */}
          <div className="mt-7">
            <ul className="flex flex-wrap gap-2.5">
              {subjects.map(({ label, Icon }, i) => (
                <motion.li
                  key={label}
                  {...fade(0.42 + i * 0.07, 12)}
                  className="hero-chip"
                >
                  <Icon size={14} strokeWidth={1.8} aria-hidden />
                  {label}
                </motion.li>
              ))}
            </ul>

            <motion.div
              {...fade(0.66, 12)}
              className="hero-modality mt-3"
            >
              <span className="hero-modality__title">Aulas particulares</span>
              <span className="hero-modality__divider" aria-hidden />
              <span className="hero-modality__mode">
                <Monitor strokeWidth={1.8} aria-hidden /> Online
              </span>
              <span className="hero-modality__mode">
                <MapPin strokeWidth={1.8} aria-hidden /> Presencial
              </span>
            </motion.div>
          </div>

          <motion.div
            {...fade(0.8)}
            className="mt-8 flex flex-row items-center gap-4"
          >
            <a
              href={WA_LINK}
              target="_blank"
              rel="noreferrer"
              className="btn-hero"
            >
              <MessageCircle size={20} /> Fale comigo pelo WhatsApp
            </a>
            <a href="#sobre" className="btn-ghost-light inline-flex">
              Conheça meu trabalho
            </a>
          </motion.div>

          <motion.p
            {...fade(0.95, 0)}
            className="hero-tagline mt-10 text-[15.5px] font-light italic"
            style={{ color: "rgba(255,255,255,0.7)" }}
          >
            Mais confiança para aprender. Mais segurança para avançar.
          </motion.p>
        </motion.div>
      </div>

      {/* Selo (apenas desktop) com Glassmorphism e efeito Flutuante */}
      <motion.div
        {...fade(0.9, 0)}
        animate={{ y: [0, -10, 0] }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="glass-premium absolute bottom-12 right-[max(32px,5vw)] hidden rounded-2xl px-6 py-4 text-sm font-medium shadow-2xl lg:block"
        style={{ color: "#fff", transformStyle: "preserve-3d" }}
      >
        Pedagoga · Especialista em Aprendizagem
      </motion.div>
    </section>
  );
}

/* ─── ABOUT ───────────────────────────────────────────────── */
export function About() {
  return (
    <section id="sobre" className="section-y" style={{ background: "var(--bg-cream)" }}>
      <div className="container-site grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
        {/* Coluna foto */}
        <Reveal
          x={-30}
          y={0}
          className="relative order-first mx-auto w-full max-w-[320px] sm:max-w-[380px] lg:max-w-none"
        >
          <div
            className="absolute -top-14 left-1/2 h-14 w-px -translate-x-1/2 lg:left-10 lg:translate-x-0"
            style={{
              background:
                "linear-gradient(to bottom, transparent, var(--brand))",
            }}
            aria-hidden
          />
          <div
            className="absolute -left-3 -top-3 h-full w-full rounded-[24px] sm:-left-4 sm:-top-4"
            style={{ border: "1px solid rgba(178,58,72,0.5)" }}
            aria-hidden
          />
          <div
            className="relative aspect-[4/5] overflow-hidden rounded-[24px]"
            style={{ boxShadow: "0 8px 32px rgba(43,36,38,0.10)" }}
          >
            <RosePhoto alt="Rose Santos em atendimento pedagógico" srcBase="/rose-sobre" position="object-[50%_30%]" />
          </div>

          {/* Card de citação sobreposto */}
          <motion.figure
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="glass-float relative z-10 -mt-14 ml-4 mr-2 rounded-2xl p-5 sm:ml-8 lg:-mr-10 lg:ml-16"
          >
            <blockquote
              className="font-serif text-base italic leading-snug sm:text-lg"
              style={{ color: "var(--text-primary)" }}
            >
              Cada aluno tem seu próprio jeito de aprender.
            </blockquote>
            <figcaption
              className="mt-2 text-[11px] font-light tracking-[0.14em] uppercase"
              style={{ color: "var(--text-muted)" }}
            >
              Rose Santos
            </figcaption>
          </motion.figure>
        </Reveal>

        {/* Coluna texto */}
        <Stagger>

          <Item variants={itemVariants}>
            <h2 className="display-lg mt-3" style={{ color: "var(--text-primary)" }}>
              Olá, eu sou{" "}
              <span className="gold-italic">Rose Santos!</span>
            </h2>
          </Item>

          <div
            className="mt-6 space-y-4 text-base font-light leading-[1.7]"
            style={{ color: "var(--text-secondary)" }}
          >
            <Item variants={itemVariants}>
              <p>
                Sou professora, licenciada em Letras/Português e Pedagogia,
                apaixonada pela educação e por ajudar cada aluno a desenvolver
                seu potencial, respeitando seu ritmo, suas dificuldades e sua
                forma particular de aprender.
              </p>
            </Item>
            <Item variants={itemVariants}>
              <p>
                Sou pós-graduada em Metodologia de Ensino, Neuropsicopedagogia,
                Educação Especial e Inclusiva, além de Gestão de Equipes e
                Lideranças.
              </p>
            </Item>
            <Item variants={itemVariants}>
              <p>
                Buscando sempre novas maneiras de tornar o aprendizado mais
                significativo, participei também dos cursos MADE – Muito Além de
                Ensinar e TecnoAlfa – Pedagogia sem Fronteiras.
              </p>
            </Item>
            <Item variants={itemVariants}>
              <p>
                Acredito que ensinar vai muito além de transmitir conteúdos. É
                preciso acolher, compreender as dificuldades, estimular a
                confiança e encontrar o{" "}
                <em style={{ color: "var(--gold)", fontStyle: "italic" }}>caminho</em>{" "}
                que facilita a aprendizagem de cada aluno.
              </p>
            </Item>
          </div>

          <Item variants={itemVariants}>
            <blockquote
              className="mt-7 pl-5 font-serif text-xl italic"
              style={{
                borderLeft: "3px solid var(--gold)",
                color: "var(--text-primary)",
              }}
            >
              Cada aluno tem seu próprio jeito de aprender. Meu propósito é
              ajudá-lo a{" "}
              <span style={{ color: "var(--gold-dark)", fontWeight: 500 }}>
                descobrir esse caminho.
              </span>
            </blockquote>
          </Item>
        </Stagger>
      </div>
    </section>
  );
}

/* ─── SERVICES ────────────────────────────────────────────── */
const services = [
  {
    Icon: NotebookText,
    title: "Desenvolvimento Escolar",
    desc: "Auxílio nos conteúdos estudados na escola, tarefas, trabalhos e preparação para avaliações.",
  },
  {
    Icon: RouteIcon,
    title: "Acompanhamento Pedagógico",
    desc: "Organização dos estudos e desenvolvimento de estratégias que favoreçam a autonomia e a aprendizagem.",
  },
  {
    Icon: Sparkles,
    title: "Jornada de Aprendizagem",
    desc: "Um olhar individualizado para compreender necessidades pedagógicas e buscar estratégias adequadas para cada aluno.",
  },
];

export function Services() {
  return (
    <section id="aulas" className="section-y" style={{ background: "var(--bg-base)" }}>
      <div className="container-site">
        <Reveal className="text-center md:text-left">
          <h2 className="display-lg" style={{ color: "var(--text-primary)" }}>
            Como posso <span className="gold-italic">ajudar?</span>
          </h2>
          <p className="body-lg mt-3" style={{ color: "var(--text-secondary)" }}>
            Um acompanhamento pensado para as necessidades de cada aluno.
          </p>
        </Reveal>

        <Stagger className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-6" gap={0.1}>
          {services.map(({ Icon, title, desc }, idx) => (
            <motion.div
              key={title}
              variants={{
                hidden: { opacity: 0, y: 50, scale: 0.95 },
                visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
              }}
              whileHover={{
                y: -10,
                scale: 1.02,
                rotateX: 3,
                rotateY: -3,
                transition: { duration: 0.3, ease: "easeOut" },
              }}
              whileTap={{ scale: 0.96, transition: { duration: 0.1 } }}
              className={`group rounded-3xl p-7 cursor-default lg:col-span-2 ${
                idx === 3 ? "lg:col-start-2" : ""
              }`}
              style={{
                border: "1px solid var(--border-warm)",
                background: "var(--bg-base)",
                boxShadow: "0 2px 20px rgba(43,36,38,0.06)",
                transformStyle: "preserve-3d",
                perspective: "800px",
                willChange: "transform",
              }}
            >
              <motion.div
                whileHover={{ rotate: 10, scale: 1.15 }}
                transition={{ duration: 0.35, type: "spring", stiffness: 300 }}
                className="flex h-12 w-12 items-center justify-center rounded-2xl"
                style={{
                  background: "linear-gradient(135deg, rgba(178,58,72,0.2) 0%, rgba(140,43,56,0.15) 100%)",
                  boxShadow: "0 4px 12px rgba(178,58,72,0.2)",
                }}
              >
                <Icon size={24} style={{ color: "var(--brand-dark)" }} />
              </motion.div>
              <h3
                className="mt-5 font-serif text-xl font-medium"
                style={{ color: "var(--text-primary)" }}
              >
                {title}
              </h3>
              <p
                className="mt-2 text-[15px] font-light leading-relaxed"
                style={{ color: "var(--text-secondary)" }}
              >
                {desc}
              </p>
              {/* Linha de hover animada */}
              <motion.div
                className="mt-5 h-0.5 w-0 rounded-full"
                style={{ background: "var(--brand)" }}
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              />
            </motion.div>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

/* ─── METHODOLOGY ─────────────────────────────────────────── */
const pillars = [
  [
    "Atenção individualizada",
    "Um olhar atento para compreender as necessidades de cada aluno.",
  ],
  [
    "Respeito ao ritmo",
    "Cada aluno possui seu próprio tempo e sua própria maneira de aprender.",
  ],
  [
    "Autonomia",
    "Mais do que resolver uma atividade, o objetivo é desenvolver segurança para aprender.",
  ],
];

export function Methodology() {
  return (
    <section
      id="metodologia"
      className="section-y"
      style={{ background: "var(--bg-tint-section)" }}
    >
      <div className="container-site">
        <Reveal>

          <h2
            className="display-lg max-w-[600px]"
            style={{ color: "var(--text-primary)" }}
          >
            Cada aluno é <span className="gold-italic">único.</span>{" "}
            Por isso, cada aprendizagem também é.
          </h2>
          <p
            className="body-lg mt-6 max-w-[560px]"
            style={{ color: "var(--text-secondary)" }}
          >
            As aulas são planejadas considerando as necessidades, dificuldades e
            potencialidades de cada aluno. O objetivo não é simplesmente ajudar
            a terminar uma tarefa ou decorar uma matéria, mas fazer com que o
            aluno compreenda o conteúdo, desenvolva confiança e conquiste
            progressivamente mais autonomia para estudar.
          </p>
        </Reveal>

        <Stagger
          gap={0.18}
          className="mt-14 grid gap-6 md:grid-cols-3"
        >
          {pillars.map(([t, d], i) => {
            const num = String(i + 1).padStart(2, "0");
            return (
              <motion.div
                key={t}
                variants={{
                  hidden: { opacity: 0, y: 40, scale: 0.96 },
                  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
                }}
                whileHover={{ y: -6, scale: 1.02, transition: { duration: 0.3 } }}
                whileTap={{ scale: 0.98, transition: { duration: 0.2 } }}
                className="rounded-3xl p-8 relative overflow-hidden"
                style={{
                  background: "rgba(255,255,255,0.55)",
                  backdropFilter: "blur(10px)",
                  WebkitBackdropFilter: "blur(10px)",
                  border: "1px solid rgba(178,58,72,0.25)",
                  boxShadow: "0 4px 24px rgba(43,36,38,0.06), inset 0 1px 0 rgba(255,255,255,0.7)",
                }}
              >
                {/* Número visível principal — dourado */}
                <span
                  className="font-serif text-5xl font-light italic"
                  style={{ color: "var(--gold)", opacity: 0.85 }}
                  aria-hidden
                >
                  {num}
                </span>
                <h3
                  className="mt-4 text-[16px] font-semibold tracking-wide"
                  style={{ color: "var(--text-primary)" }}
                >
                  {t}
                </h3>
                <p
                  className="mt-2 text-[15px] font-light leading-relaxed"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {d}
                </p>
              </motion.div>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}

/* ─── DIFFERENTIALS ───────────────────────────────────────── */
const diffs = [
  "Atendimento personalizado",
  "Respeito ao ritmo de aprendizagem",
  "Identificação das principais dificuldades",
  "Fortalecimento da leitura e da escrita",
  "Foco em Fatos",
  "Desenvolvimento da autonomia",
  "Mais confiança para participar das aulas",
];

export function Differentials() {
  return (
    <section className="section-y" style={{ background: "var(--bg-base)" }}>
      <div className="container-site grid gap-12 md:grid-cols-2 md:gap-20 items-center">
        <Reveal x={-30} y={0}>
          <h2
            className="display-lg max-w-[420px]"
            style={{ color: "var(--text-primary)" }}
          >
            Quando o aluno recebe a atenção certa, aprender ganha um novo{" "}
            <span className="gold-italic">significado.</span>
          </h2>
          <p className="mt-5 font-light italic text-lg" style={{ color: "var(--gold-dark)" }}>
            Mais do que melhorar as notas: aprender a aprender.
          </p>
        </Reveal>

        <Stagger gap={0.07} className="flex flex-col gap-3">
          {diffs.map((d, idx) => (
            <motion.div
              key={d}
              variants={{
                hidden: { opacity: 0, x: 30 },
                visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
              }}
              whileHover={{ x: 6, transition: { duration: 0.25 } }}
              whileTap={{ scale: 0.98, x: 2, transition: { duration: 0.1 } }}
              className="flex items-center gap-4 rounded-2xl px-5 py-4 cursor-default"
              style={{
                background: "var(--bg-cream)",
                border: "1px solid transparent",
                transition: "border-color 0.3s, box-shadow 0.3s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(178,58,72,0.35)";
                e.currentTarget.style.boxShadow = "0 4px 20px rgba(178,58,72,0.12)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "transparent";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <motion.div
                initial={{ scale: 0, rotate: -90 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + idx * 0.07, duration: 0.4, type: "spring", stiffness: 250 }}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
                style={{
                  background: "linear-gradient(135deg, rgba(178,58,72,0.25), rgba(140,43,56,0.15))",
                  boxShadow: "0 0 12px rgba(178,58,72,0.3)",
                }}
              >
                <CircleCheck size={18} style={{ color: "var(--brand-dark)", flexShrink: 0 }} />
              </motion.div>
              <span className="text-[15px] font-medium" style={{ color: "var(--text-primary)" }}>
                {d}
              </span>
            </motion.div>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

/* ─── EDUCATION ───────────────────────────────────────────── */
const degrees = [
  "Licenciatura em Letras/Português",
  "Licenciatura em Pedagogia",
  "Pós-graduação em Neuropsicopedagogia, Educação Especial e Inclusiva",
  
];
const courses = [
  "MADE – Muito Além de Ensinar",
  "TecnoAlfa – Pedagogia sem Fronteiras",
];

function EduGroup({
  title,
  items,
  Icon,
}: {
  title: string;
  items: string[];
  Icon: typeof GraduationCap;
}) {
  return (
    <div className="mt-14">
      <motion.p
        className="label-sm"
        style={{ color: "var(--brand-dark)" }}
        initial={{ opacity: 0, x: -10 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {title}
      </motion.p>
      <Stagger gap={0.09} className="mt-5 grid gap-4 md:grid-cols-2">
        {items.map((t, idx) => {
          const isLastOdd = items.length % 2 === 1 && idx === items.length - 1;
          return (
          <motion.div
            key={t}
            variants={{
              hidden: { opacity: 0, y: 30, scale: 0.97 },
              visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
            }}
            whileHover={{ y: -5, scale: 1.015, transition: { duration: 0.25 } }}
            className={`flex items-center gap-4 rounded-2xl px-6 py-5${isLastOdd ? " md:col-span-2 md:justify-center" : ""}`}
            style={{
              border: "1px solid var(--border-warm)",
              background: "var(--bg-base)",
              boxShadow: "0 2px 12px rgba(43,36,38,0.04)",
              transition: "box-shadow 0.3s",
              cursor: "default",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = "0 8px 28px rgba(178,58,72,0.15)";
              e.currentTarget.style.borderColor = "rgba(178,58,72,0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "0 2px 12px rgba(43,36,38,0.04)";
              e.currentTarget.style.borderColor = "var(--border-warm)";
            }}
          >
            <motion.div
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
              style={{
                background: "linear-gradient(135deg, rgba(178,58,72,0.18) 0%, rgba(140,43,56,0.1) 100%)",
              }}
              whileHover={{ rotate: 8, scale: 1.1 }}
              transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
            >
              <Icon size={22} style={{ color: "var(--brand-dark)" }} />
            </motion.div>
            <span className="text-[15px] font-medium leading-snug" style={{ color: "var(--text-primary)" }}>
              {t}
            </span>
          </motion.div>
          );
        })}
      </Stagger>
    </div>
  );
}

export function Education() {
  return (
    <section
      id="formacao"
      className="section-y"
      style={{ background: "var(--bg-cream)" }}
    >
      <div className="container-site">
        <Reveal>
          <h2 className="display-lg" style={{ color: "var(--text-primary)" }}>
            Formação e aperfeiçoamento <span className="gold-italic">contínuo</span>
          </h2>
          <p className="body-lg mt-3" style={{ color: "var(--text-secondary)" }}>
            Conhecimento para ampliar o olhar sobre diferentes caminhos da
            aprendizagem.
          </p>
        </Reveal>
        <EduGroup title="Formação Acadêmica" items={degrees} Icon={GraduationCap} />
        <EduGroup title="Cursos Complementares" items={courses} Icon={BookMarked} />
      </div>
    </section>
  );
}

/* ─── TESTIMONIALS ────────────────────────────────────────── */
const parentMessages = [
  {
    id: 1,
    name: "Laurielle",
    relation: "Mãe da Thaila e do Benício",
    images: [
      "/depoimento-laurielle-1.webp",
      "/depoimento-laurielle-2.webp",
      "/depoimento-laurielle-3.webp",
    ],
    highlight: "Você não é apenas a professora de reforço. Você se tornou parte da nossa família.",
  },
];

function MessageGallery() {
  const [lightbox, setLightbox] = useState<{ msgIdx: number; imgIdx: number } | null>(null);

  const currentMessage = lightbox !== null ? parentMessages[lightbox.msgIdx] : null;

  return (
    <>
      <div className="mx-auto mt-10 grid w-full max-w-[900px] gap-8">
        {parentMessages.map((msg, msgIdx) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Card do depoimento */}
            <div
              className="overflow-hidden rounded-3xl"
              style={{
                background: "var(--bg-cream)",
                border: "1px solid var(--border-warm)",
                boxShadow: "0 4px 24px rgba(43,36,38,0.06)",
              }}
            >
              {/* Cabeçalho com nome */}
              <div className="flex items-center gap-3 px-6 pt-6 pb-2">
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
                  style={{
                    background: "linear-gradient(135deg, rgba(178,58,72,0.2) 0%, rgba(140,43,56,0.12) 100%)",
                  }}
                >
                  <MessageSquareQuote size={18} style={{ color: "var(--brand-dark)" }} />
                </div>
                <div className="text-left">
                  <p className="text-[15px] font-semibold" style={{ color: "var(--text-primary)" }}>
                    {msg.name}
                  </p>
                  <p className="text-[12px] font-light tracking-wide" style={{ color: "var(--text-muted)" }}>
                    {msg.relation}
                  </p>
                </div>
              </div>

              {/* Citação destaque */}
              <p
                className="px-6 py-4 font-serif text-[15px] italic leading-relaxed"
                style={{ color: "var(--text-secondary)" }}
              >
                "{msg.highlight}"
              </p>

              {/* Grid de prints */}
              <div className="flex gap-3 px-6 pb-6 overflow-x-auto scrollbar-hide">
                {msg.images.map((src, imgIdx) => (
                  <motion.button
                    key={imgIdx}
                    onClick={() => setLightbox({ msgIdx, imgIdx })}
                    whileHover={{ y: -4, scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ duration: 0.25 }}
                    className="group relative shrink-0 overflow-hidden rounded-2xl"
                    style={{
                      width: "180px",
                      aspectRatio: "9/16",
                      border: "2px solid rgba(178,58,72,0.15)",
                      boxShadow: "0 4px 16px rgba(43,36,38,0.08)",
                      cursor: "pointer",
                    }}
                    aria-label={`Ver mensagem ${imgIdx + 1} de ${msg.name}`}
                  >
                    <img
                      src={src}
                      alt={`Mensagem de ${msg.name} - parte ${imgIdx + 1}`}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                    {/* Overlay sutil no hover */}
                    <div
                      className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      style={{ background: "rgba(42,18,22,0.25)" }}
                    >
                      <div
                        className="flex h-10 w-10 items-center justify-center rounded-full"
                        style={{
                          background: "rgba(255,255,255,0.2)",
                          backdropFilter: "blur(8px)",
                          WebkitBackdropFilter: "blur(8px)",
                          border: "1px solid rgba(255,255,255,0.35)",
                        }}
                      >
                        <Maximize size={16} className="text-white" />
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightbox !== null && currentMessage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
            style={{
              background: "rgba(0,0,0,0.85)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
            }}
            onClick={() => setLightbox(null)}
          >
            {/* Botão fechar */}
            <button
              onClick={() => setLightbox(null)}
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full text-white transition-transform hover:scale-110"
              style={{
                background: "rgba(255,255,255,0.15)",
                border: "1px solid rgba(255,255,255,0.2)",
              }}
              aria-label="Fechar"
            >
              <X size={20} />
            </button>

            {/* Navegação */}
            <div
              className="relative flex items-center gap-4"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Seta anterior */}
              {currentMessage.images.length > 1 && (
                <button
                  onClick={() =>
                    setLightbox({
                      msgIdx: lightbox.msgIdx,
                      imgIdx: (lightbox.imgIdx - 1 + currentMessage.images.length) % currentMessage.images.length,
                    })
                  }
                  className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-full text-white transition-transform hover:scale-110 md:flex"
                  style={{
                    background: "rgba(255,255,255,0.12)",
                    border: "1px solid rgba(255,255,255,0.2)",
                  }}
                  aria-label="Imagem anterior"
                >
                  <ChevronLeft size={22} />
                </button>
              )}

              {/* Imagem */}
              <AnimatePresence mode="wait">
                <motion.img
                  key={lightbox.imgIdx}
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ duration: 0.25 }}
                  src={currentMessage.images[lightbox.imgIdx]}
                  alt={`Mensagem de ${currentMessage.name} - parte ${lightbox.imgIdx + 1}`}
                  className="max-h-[85vh] w-auto rounded-2xl object-contain"
                  style={{
                    maxWidth: "min(90vw, 420px)",
                    boxShadow: "0 24px 80px rgba(0,0,0,0.5)",
                  }}
                />
              </AnimatePresence>

              {/* Seta próxima */}
              {currentMessage.images.length > 1 && (
                <button
                  onClick={() =>
                    setLightbox({
                      msgIdx: lightbox.msgIdx,
                      imgIdx: (lightbox.imgIdx + 1) % currentMessage.images.length,
                    })
                  }
                  className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-full text-white transition-transform hover:scale-110 md:flex"
                  style={{
                    background: "rgba(255,255,255,0.12)",
                    border: "1px solid rgba(255,255,255,0.2)",
                  }}
                  aria-label="Próxima imagem"
                >
                  <ChevronRight size={22} />
                </button>
              )}
            </div>

            {/* Indicador + info na parte inferior */}
            <div className="absolute bottom-6 left-0 right-0 flex flex-col items-center gap-2">
              <p className="text-sm font-medium text-white/80">
                {currentMessage.name} · {lightbox.imgIdx + 1}/{currentMessage.images.length}
              </p>
              {/* Dots mobile */}
              {currentMessage.images.length > 1 && (
                <div className="flex gap-1.5 md:hidden">
                  {currentMessage.images.map((_, i) => (
                    <button
                      key={i}
                      onClick={(e) => {
                        e.stopPropagation();
                        setLightbox({ msgIdx: lightbox.msgIdx, imgIdx: i });
                      }}
                      className="rounded-full transition-all duration-300"
                      style={{
                        height: "4px",
                        width: i === lightbox.imgIdx ? "16px" : "4px",
                        background: i === lightbox.imgIdx ? "var(--brand-light)" : "rgba(255,255,255,0.3)",
                      }}
                      aria-label={`Imagem ${i + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export function Testimonials() {
  const [activeTab, setActiveTab] = useState<"videos" | "messages">("videos");

  return (
    <section className="section-y" style={{ background: "var(--bg-base)" }}>
      <Reveal className="container-site text-center">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="label-sm inline-block mb-3"
          style={{ color: "var(--brand-dark)" }}
        >
          Depoimentos
        </motion.span>
        <h2 className="display-md mb-10" style={{ color: "var(--text-primary)" }}>
          O que pais e alunos <span className="gold-italic">dizem</span>
        </h2>

        {/* ── Tabs ── */}
        <div className="mx-auto mb-10 flex w-fit rounded-2xl p-1.5" style={{
          background: "var(--bg-cream)",
          border: "1px solid var(--border-warm)",
        }}>
          {([
            { key: "videos" as const, label: "Vídeos dos Alunos", Icon: Play },
            { key: "messages" as const, label: "Mensagens dos Pais", Icon: MessageSquareQuote },
          ]).map(({ key, label, Icon }) => (
            <motion.button
              key={key}
              onClick={() => setActiveTab(key)}
              whileTap={{ scale: 0.97 }}
              className="relative flex items-center gap-2 rounded-xl px-5 py-2.5 text-[13px] font-medium tracking-wide transition-colors duration-300 sm:text-[14px]"
              style={{
                color: activeTab === key ? "var(--text-on-brand)" : "var(--text-secondary)",
                background: activeTab === key ? "var(--brand)" : "transparent",
                boxShadow: activeTab === key ? "0 4px 16px rgba(178,58,72,0.25)" : "none",
              }}
            >
              <Icon size={15} strokeWidth={activeTab === key ? 2.2 : 1.8} />
              <span className="hidden sm:inline">{label}</span>
              <span className="sm:hidden">{key === "videos" ? "Vídeos" : "Mensagens"}</span>
            </motion.button>
          ))}
        </div>

        {/* ── Conteúdo das Tabs ── */}
        <AnimatePresence mode="wait">
          {activeTab === "videos" ? (
            <motion.div
              key="videos"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <TestimonialsCarousel />
            </motion.div>
          ) : (
            <motion.div
              key="messages"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <MessageGallery />
            </motion.div>
          )}
        </AnimatePresence>
      </Reveal>
    </section>
  );
}

/* ─── CTA FINAL ───────────────────────────────────────────── */
export function CtaFinal() {
  return (
    <section
      id="contato"
      className="relative py-28 md:py-40 overflow-hidden"
      style={{ background: "var(--hero-deep)" }}
    >
      {/* Orbes animados de fundo */}
      <motion.div
        animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -left-32 -top-32 h-96 w-96 rounded-full blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(178,58,72,0.35) 0%, transparent 70%)" }}
        aria-hidden
      />
      <motion.div
        animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute -right-24 -bottom-24 h-80 w-80 rounded-full blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(140,43,56,0.3) 0%, transparent 70%)" }}
        aria-hidden
      />
      <motion.div
        animate={{ x: [0, 30, 0], y: [0, -20, 0], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute left-1/3 top-1/4 h-64 w-64 rounded-full blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(227,163,169,0.2) 0%, transparent 70%)" }}
        aria-hidden
      />

      <Stagger gap={0.12} className="container-site max-w-[720px] text-center relative z-10">
        <Item variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } }}>
          <motion.span
            className="glass-premium inline-block rounded-full px-5 py-2 text-[13px] font-medium mb-6"
            style={{ color: "rgba(227,163,169,0.95)" }}
          >
            Vamos conversar?
          </motion.span>
        </Item>

        <Item variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } } }}>
          <h2 className="display-lg" style={{ color: "#fff", textShadow: "0 10px 40px rgba(0,0,0,0.4)" }}>
            Seu filho está encontrando dificuldades nos{" "}
            <span className="gold-italic-hero">estudos?</span>
          </h2>
        </Item>

        <Item variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } }}>
          <p
            className="body-lg mt-6"
            style={{ color: "rgba(255,255,255,0.85)" }}
          >
            Às vezes, o que falta não é capacidade. É uma explicação diferente,
            mais atenção e uma estratégia adequada à maneira como ele aprende.
            Vamos conversar e entender como um acompanhamento personalizado pode
            ajudá-lo.
          </p>
        </Item>

        <Item variants={{ hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: [0.34, 1.56, 0.64, 1] } } }}>
          <div className="mt-10 flex justify-center">
            <motion.a
              href={WA_LINK}
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.06, y: -4 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
              className="btn-premium relative overflow-hidden"
              style={{ fontSize: "1.05rem", padding: "0 2.4rem", minHeight: "58px" }}
            >
              {/* Efeito de brilho que passa */}
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.2) 50%, transparent 100%)",
                  x: "-100%",
                }}
                animate={{ x: ["−100%", "200%"] }}
                transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 1.5, ease: "linear" }}
              />
              <MessageCircle size={20} /> Fale comigo pelo WhatsApp
            </motion.a>
          </div>
        </Item>

        <Item variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.8, delay: 0.2 } } }}>
          <div className="mt-12">
            <p className="font-serif text-lg" style={{ color: "var(--gold-light)" }}>
              Rose Santos
            </p>
            <p className="mt-1 text-[13px] font-light" style={{ color: "rgba(255,255,255,0.55)" }}>
              Aulas Particulares · Reforço Escolar · Acompanhamento Pedagógico
            </p>
            <div
              className="mx-auto mt-8 h-px w-24"
              style={{ background: "var(--gold-glow)" }}
            />
            <p
              className="mt-8 font-serif text-lg font-light italic"
              style={{ color: "rgba(255,255,255,0.75)" }}
            >
              Aprender. Compreender. Desenvolver. <span style={{ color: "var(--gold-light)" }}>Conquistar.</span>
            </p>
          </div>
        </Item>
      </Stagger>
    </section>
  );
}

/* ─── FOOTER ──────────────────────────────────────────────── */
export function Footer() {
  return (
    <footer className="py-12" style={{ background: "var(--text-primary)" }}>
      <div className="container-site">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-serif text-xl font-medium" style={{ color: "var(--gold)" }}>
              ROSE SANTOS
            </p>
            <p
              className="mt-1 text-[13px] font-light"
              style={{ color: "rgba(255,255,255,0.50)" }}
            >
              Professora · Pedagoga · Especialista em Aprendizagem · Educação Transformadora
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <a
              href={WA_LINK}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 text-sm transition-colors"
              style={{ color: "rgba(255,255,255,0.70)" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "rgba(255,255,255,1)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "rgba(255,255,255,0.70)")
              }
            >
              <Phone size={16} style={{ color: "var(--brand-light)" }} />
              +55 31 98671-8808
            </a>
            <a
              href="mailto:falandocomrose07@gmail.com"
              className="flex items-center gap-3 text-sm transition-colors"
              style={{ color: "rgba(255,255,255,0.70)" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "rgba(255,255,255,1)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "rgba(255,255,255,0.70)")
              }
            >
              <Mail size={16} style={{ color: "var(--brand-light)" }} />
              falandocomrose07@gmail.com
            </a>
          </div>
        </div>
        <div
          className="my-6 h-px"
          style={{ background: "rgba(255,255,255,0.08)" }}
        />
        <p
          className="text-center text-xs font-light"
          style={{ color: "rgba(255,255,255,0.30)" }}
        >
          © {new Date().getFullYear()} Rose Santos. Todos os direitos
          reservados.
        </p>
      </div>
    </footer>
  );
}

/* ─── WHATSAPP FLOAT ──────────────────────────────────────── */
export function WhatsAppFloat() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const on = () => setShow(window.scrollY > window.innerHeight * 0.6);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <motion.a
      href={WA_LINK}
      target="_blank"
      rel="noreferrer"
      aria-label="Conversar pelo WhatsApp"
      initial={false}
      animate={
        show
          ? { opacity: 1, scale: 1, y: 0 }
          : { opacity: 0, scale: 0.7, y: 30 }
      }
      transition={{ duration: 0.5, type: "spring", stiffness: 300, damping: 20 }}
      whileHover={{ scale: 1.1, y: -4 }}
      whileTap={{ scale: 0.92 }}
      tabIndex={show ? 0 : -1}
      className="fixed bottom-6 right-6 z-[9999] flex h-14 w-14 items-center justify-center rounded-full md:h-auto md:w-auto md:gap-2 md:px-5 md:py-3.5"
      style={{
        background: "linear-gradient(135deg, var(--brand) 0%, var(--brand-dark) 100%)",
        color: "var(--text-on-brand)",
        boxShadow: "0 6px 28px rgba(178,58,72,0.6), 0 2px 8px rgba(0,0,0,0.1)",
        pointerEvents: show ? "auto" : "none",
      }}
    >
      {/* Anel de pulso */}
      {show && (
        <motion.span
          className="absolute inset-0 rounded-full"
          style={{ border: "2px solid var(--brand-light)" }}
          animate={{ scale: [1, 1.5, 1.8], opacity: [0.6, 0.3, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
          aria-hidden
        />
      )}
      <MessageCircle size={22} />
      <span className="hidden text-sm font-semibold md:inline">WhatsApp</span>
    </motion.a>
  );
}
