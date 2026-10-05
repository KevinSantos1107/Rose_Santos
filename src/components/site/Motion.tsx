import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const ease = [0.25, 0.46, 0.45, 0.94] as const;

export const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
};

export function Reveal({
  children,
  className,
  x = 0,
  y = 32,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  x?: number;
  y?: number;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-10px" }}
      transition={{ duration: 0.7, ease, delay }}
    >
      {children}
    </motion.div>
  );
}

export function Stagger({
  children,
  className,
  gap = 0.1,
}: {
  children: ReactNode;
  className?: string;
  gap?: number;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10px" }}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: gap, delayChildren: 0.1 },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export const Item = motion.div;

export function RosePhoto({
  alt,
  className = "",
  position = "object-top",
  srcBase = "/rose-santos",
  priority = false,
}: {
  alt: string;
  className?: string;
  position?: string;
  srcBase?: string;
  priority?: boolean;
}) {
  return (
    <picture className={`block h-full w-full ${className}`}>
      <source srcSet={`${srcBase}.webp`} type="image/webp" />
      <img
        src={`${srcBase}.jpg`}
        alt={alt}
        className={`h-full w-full object-cover ${position}`}
        loading={priority ? "eager" : "lazy"}
        decoding={priority ? "sync" : "async"}
      />
    </picture>
  );
}
