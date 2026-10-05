import { useEffect, useState } from "react";
import { motion } from "framer-motion";
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
} from "lucide-react";
import { WA_LINK, HERO_VIDEO } from "@/lib/constants";
import { Reveal, Stagger, Item, itemVariants, RosePhoto } from "./Motion";

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
  const onHero = !scrolled && !open;

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 60);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

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
            style={{ color: onHero ? "#fff" : "var(--text-primary)" }}
          >
            ROSE SANTOS
          </span>
          <span
            className="text-[10px] font-light tracking-[0.18em] transition-colors duration-500 sm:text-[11px]"
            style={{ color: onHero ? "rgba(255,255,255,0.75)" : "var(--text-muted)" }}
          >
            Professora • Pedagoga
          </span>
        </a>

        <nav className="hidden gap-7 lg:flex" aria-label="Principal">
          {links.map(([l, h]) => (
            <a
              key={h}
              href={h}
              className={`nav-link ${onHero ? "nav-link-light" : ""}`}
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
            className={`${onHero ? "btn-hero" : "btn-sage"} !hidden !min-h-[40px] !px-5 !text-sm lg:!inline-flex`}
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
            className="flex h-10 w-10 items-center justify-center rounded-full lg:hidden"
            style={{
              border: onHero
                ? "1px solid rgba(255,255,255,0.35)"
                : "1px solid var(--border-subtle)",
              background: onHero
                ? "rgba(255,255,255,0.12)"
                : "rgba(143,175,139,0.1)",
              color: onHero ? "#fff" : "var(--text-primary)",
            }}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
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
            boxShadow: "0 8px 32px rgba(44,44,42,0.10)",
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
                (e.currentTarget.style.background = "rgba(143,175,139,0.08)")
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
            className="btn-sage mt-2 w-full"
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

export function Hero() {
  const specs = [
    "Português",
    "Alfabetização",
    "Reforço Escolar",
    "Acompanhamento Pedagógico",
  ];
  return (
    <section
      id="inicio"
      className="relative isolate flex min-h-[100svh] items-end overflow-hidden pb-9 pt-[calc(76px+10svh)] sm:pb-14 lg:h-[100svh] lg:min-h-[620px] lg:items-center lg:pb-6 lg:pt-[88px] perspective-container"
      style={{ background: "var(--hero-deep)" }}
    >
      {/* Mídia de fundo: foto (ou vídeo, se HERO_VIDEO estiver preenchido) */}
      <motion.div 
        className="hero-photo absolute inset-y-0 right-0 w-full lg:w-[62%]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        {HERO_VIDEO ? (
          <video
            className="h-full w-full object-cover object-[50%_20%] lg:object-[50%_28%]"
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
            position="object-[50%_16%] sm:object-[50%_22%] lg:object-[50%_28%]"
            priority={true}
          />
        )}
      </motion.div>

      {/* Degradês: leitura do texto no mobile/tablet e do menu no topo */}
      <div
        className="absolute inset-0 lg:hidden"
        aria-hidden
        style={{
          background:
            "linear-gradient(to top, rgba(27,42,31,0.98) 0%, rgba(27,42,31,0.95) 45%, rgba(27,42,31,0.4) 65%, rgba(27,42,31,0) 80%)",
        }}
      />
      <div
        className="absolute inset-x-0 top-0 h-32 lg:h-40"
        aria-hidden
        style={{
          background:
            "linear-gradient(to bottom, rgba(27,42,31,0.8), rgba(27,42,31,0))",
        }}
      />

      <div className="container-site w-full relative z-10 flex min-h-[100dvh] flex-col justify-end pb-12 pt-32 sm:block sm:min-h-0 sm:pb-0">
        <motion.div 
          className="max-w-[560px] lg:max-w-[580px]"
          style={{ transformStyle: "preserve-3d" }}
        >
          <motion.span
            {...fade(0.1)}
            className="glass-premium hover-3d inline-block rounded-full px-5 py-2 text-xs font-medium tracking-wide shadow-xl"
            style={{ color: "#fff" }}
          >
            Aulas particulares · Online · Presencial
          </motion.span>

          <motion.h1
            {...fade(0.2, 40)}
            className="hero-title mt-4 sm:mt-5 lg:mt-7"
            style={{ color: "#fff", textShadow: "0 10px 30px rgba(0,0,0,0.5)" }}
          >
            Aprender pode ser mais fácil quando encontramos o{" "}
            <span className="gold-italic-hero">caminho certo.</span>
          </motion.h1>

          <motion.p
            {...fade(0.35)}
            className="mt-4 max-w-[520px] text-[15px] font-light leading-relaxed sm:mt-5 sm:text-[18px] lg:mt-7"
            style={{ color: "rgba(255,255,255,0.95)" }}
          >
            Acompanhamento escolar personalizado,
            respeitando o ritmo e as potencialidades de cada aluno.
          </motion.p>

          <motion.p
            {...fade(0.45, 0)}
            className="mt-6 hidden flex-wrap gap-x-3 gap-y-2 text-[14px] sm:flex"
            style={{ color: "rgba(255,255,255,0.85)" }}
          >
            {specs.map((s, i) => (
              <span key={s} className="flex items-center gap-2">
                {i > 0 && <span style={{ color: "var(--sage-light)" }}>•</span>}
                {s}
              </span>
            ))}
          </motion.p>

          <motion.div
            {...fade(0.55)}
            className="mt-8 flex flex-col items-start gap-4 sm:flex-row lg:mt-10"
          >
            <a
              href={WA_LINK}
              target="_blank"
              rel="noreferrer"
              className="btn-hero w-full sm:w-auto"
            >
              <MessageCircle size={20} /> Fale comigo pelo WhatsApp
            </a>
            <a href="#sobre" className="btn-ghost-light hidden w-full sm:w-auto sm:inline-flex">
              Conheça meu trabalho
            </a>
          </motion.div>

          <motion.p
            {...fade(0.7, 0)}
            className="hero-tagline mt-8 text-[15px] font-light italic"
            style={{ color: "rgba(255,255,255,0.75)" }}
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
                "linear-gradient(to bottom, transparent, var(--sage))",
            }}
            aria-hidden
          />
          <div
            className="absolute -left-3 -top-3 h-full w-full rounded-[24px] sm:-left-4 sm:-top-4"
            style={{ border: "1px solid rgba(143,175,139,0.5)" }}
            aria-hidden
          />
          <div
            className="relative aspect-[4/5] overflow-hidden rounded-[24px]"
            style={{ boxShadow: "0 8px 32px rgba(44,44,42,0.10)" }}
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
          <Item variants={itemVariants} className="label-sm" style={{ color: "var(--sage-dark)" }}>
            Sobre mim
          </Item>
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
                Sou professora, licenciada em Letras – Português e Pedagogia,
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
                que facilite a aprendizagem de cada aluno.
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
    Icon: BookOpen,
    title: "Língua Portuguesa",
    desc: "Leitura, escrita, interpretação de textos, gramática e produção textual.",
  },
  {
    Icon: PenLine,
    title: "Alfabetização",
    desc: "Apoio individualizado no desenvolvimento da leitura e da escrita, respeitando o ritmo de aprendizagem.",
  },
  {
    Icon: NotebookText,
    title: "Reforço Escolar",
    desc: "Auxílio nos conteúdos estudados na escola, tarefas, trabalhos e preparação para avaliações.",
  },
  {
    Icon: RouteIcon,
    title: "Acompanhamento Pedagógico",
    desc: "Organização dos estudos e desenvolvimento de estratégias que favoreçam a autonomia e a aprendizagem.",
  },
  {
    Icon: Sparkles,
    title: "Apoio às Dificuldades de Aprendizagem",
    desc: "Um olhar individualizado para compreender necessidades pedagógicas e buscar estratégias adequadas para cada aluno.",
  },
];

export function Services() {
  return (
    <section id="aulas" className="section-y" style={{ background: "var(--bg-base)" }}>
      <div className="container-site">
        <Reveal className="text-center md:text-left">
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="label-sm inline-block mb-3"
            style={{ color: "var(--sage-dark)" }}
          >
            O que ofereço
          </motion.span>
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
                boxShadow: "0 2px 20px rgba(44,44,42,0.06)",
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
                  background: "linear-gradient(135deg, rgba(143,175,139,0.2) 0%, rgba(107,143,102,0.15) 100%)",
                  boxShadow: "0 4px 12px rgba(143,175,139,0.2)",
                }}
              >
                <Icon size={24} style={{ color: "var(--sage-dark)" }} />
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
                style={{ background: "var(--sage)" }}
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
      style={{ background: "var(--bg-sage-section)" }}
    >
      <div className="container-site">
        <Reveal>
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="label-sm inline-block mb-3"
            style={{ color: "var(--sage-dark)" }}
          >
            Metodologia
          </motion.span>
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
                  border: "1px solid rgba(143,175,139,0.25)",
                  boxShadow: "0 4px 24px rgba(44,44,42,0.06), inset 0 1px 0 rgba(255,255,255,0.7)",
                }}
              >
                {/* Número grande decorativo — dourado sutil */}
                <span
                  className="absolute -right-2 -top-6 font-serif font-light italic select-none pointer-events-none"
                  style={{ fontSize: "9rem", color: "rgba(201,168,76,0.10)", lineHeight: 1 }}
                  aria-hidden
                >
                  {i + 1}
                </span>
                {/* Número pequeno visível — dourado */}
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
  "Desenvolvimento da autonomia",
  "Organização da rotina de estudos",
  "Mais confiança para participar das aulas",
];

export function Differentials() {
  return (
    <section className="section-y" style={{ background: "var(--bg-base)" }}>
      <div className="container-site grid gap-12 md:grid-cols-2 md:gap-20 items-center">
        <Reveal x={-30} y={0}>
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="label-sm inline-block mb-3"
            style={{ color: "var(--sage-dark)" }}
          >
            Diferenciais
          </motion.span>
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
                e.currentTarget.style.borderColor = "rgba(143,175,139,0.35)";
                e.currentTarget.style.boxShadow = "0 4px 20px rgba(143,175,139,0.12)";
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
                  background: "linear-gradient(135deg, rgba(143,175,139,0.25), rgba(107,143,102,0.15))",
                  boxShadow: "0 0 12px rgba(143,175,139,0.3)",
                }}
              >
                <CircleCheck size={18} style={{ color: "var(--sage-dark)", flexShrink: 0 }} />
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
  "Licenciatura em Letras – Português",
  "Licenciatura em Pedagogia",
  "Pós-graduação em Metodologia de Ensino",
  "Pós-graduação em Neuropsicopedagogia",
  "Pós-graduação em Educação Especial e Inclusiva",
  "Pós-graduação em Gestão de Equipes e Lideranças",
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
        style={{ color: "var(--sage-dark)" }}
        initial={{ opacity: 0, x: -10 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {title}
      </motion.p>
      <Stagger gap={0.09} className="mt-5 grid gap-4 md:grid-cols-2">
        {items.map((t, idx) => (
          <motion.div
            key={t}
            variants={{
              hidden: { opacity: 0, y: 30, scale: 0.97 },
              visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
            }}
            whileHover={{ y: -5, scale: 1.015, transition: { duration: 0.25 } }}
            className="flex items-center gap-4 rounded-2xl px-6 py-5"
            style={{
              border: "1px solid var(--border-warm)",
              background: "var(--bg-base)",
              boxShadow: "0 2px 12px rgba(44,44,42,0.04)",
              transition: "box-shadow 0.3s",
              cursor: "default",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = "0 8px 28px rgba(143,175,139,0.15)";
              e.currentTarget.style.borderColor = "rgba(143,175,139,0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "0 2px 12px rgba(44,44,42,0.04)";
              e.currentTarget.style.borderColor = "var(--border-warm)";
            }}
          >
            <motion.div
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
              style={{
                background: "linear-gradient(135deg, rgba(143,175,139,0.18) 0%, rgba(107,143,102,0.1) 100%)",
              }}
              whileHover={{ rotate: 8, scale: 1.1 }}
              transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
            >
              <Icon size={22} style={{ color: "var(--sage-dark)" }} />
            </motion.div>
            <span className="text-[15px] font-medium leading-snug" style={{ color: "var(--text-primary)" }}>
              {t}
            </span>
          </motion.div>
        ))}
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
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="label-sm inline-block mb-3"
            style={{ color: "var(--sage-dark)" }}
          >
            Formação
          </motion.span>
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
export function Testimonials() {
  return (
    <section className="section-y" style={{ background: "var(--bg-base)" }}>
      <Reveal className="container-site text-center">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="label-sm inline-block mb-3"
          style={{ color: "var(--sage-dark)" }}
        >
          Depoimentos
        </motion.span>
        <h2 className="display-md" style={{ color: "var(--text-primary)" }}>
          O que pais e alunos <span className="gold-italic">dizem</span>
        </h2>
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-col items-center gap-5 rounded-3xl p-14 relative overflow-hidden"
          style={{
            background: "var(--bg-cream)",
            border: "1px dashed rgba(143,175,139,0.4)",
            boxShadow: "0 4px 32px rgba(44,44,42,0.04)",
          }}
        >
          <motion.div
            animate={{ y: [0, -8, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <MessageSquareQuote size={40} style={{ color: "var(--sage)" }} />
          </motion.div>
          <p className="text-base font-light italic max-w-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
            Os depoimentos de pais e alunos serão apresentados aqui em breve.
          </p>
        </motion.div>
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
        style={{ background: "radial-gradient(circle, rgba(143,175,139,0.35) 0%, transparent 70%)" }}
        aria-hidden
      />
      <motion.div
        animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute -right-24 -bottom-24 h-80 w-80 rounded-full blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(107,143,102,0.3) 0%, transparent 70%)" }}
        aria-hidden
      />
      <motion.div
        animate={{ x: [0, 30, 0], y: [0, -20, 0], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute left-1/3 top-1/4 h-64 w-64 rounded-full blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(181,204,175,0.2) 0%, transparent 70%)" }}
        aria-hidden
      />

      <Stagger gap={0.12} className="container-site max-w-[720px] text-center relative z-10">
        <Item variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } }}>
          <motion.span
            className="glass-premium inline-block rounded-full px-5 py-2 text-[13px] font-medium mb-6"
            style={{ color: "rgba(181,204,175,0.95)" }}
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
              Professora · Pedagoga · Especialista em Aprendizagem
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
              <Phone size={16} style={{ color: "var(--sage-light)" }} />
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
              <Mail size={16} style={{ color: "var(--sage-light)" }} />
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
        background: "linear-gradient(135deg, var(--sage) 0%, var(--sage-dark) 100%)",
        color: "var(--text-on-sage)",
        boxShadow: "0 6px 28px rgba(143,175,139,0.6), 0 2px 8px rgba(0,0,0,0.1)",
        pointerEvents: show ? "auto" : "none",
      }}
    >
      {/* Anel de pulso */}
      {show && (
        <motion.span
          className="absolute inset-0 rounded-full"
          style={{ border: "2px solid var(--sage-light)" }}
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
