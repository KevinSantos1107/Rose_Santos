/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: "var(--brand)",
        "brand-light": "var(--brand-light)",
        "brand-dark": "var(--brand-dark)",
        chalk: "var(--chalk)",
        cream: "var(--bg-cream)",
        warm: "var(--bg-warm)",
        "tint-section": "var(--bg-tint-section)",
        ink: "var(--text-primary)",
        "ink-soft": "var(--text-secondary)",
        "ink-muted": "var(--text-muted)",
        "on-brand": "var(--text-on-brand)",
        line: "var(--border-warm)",
        "line-brand": "var(--border-subtle)",
        background: "var(--bg-base)",
      },
      fontFamily: {
        serif: ["Cormorant Garamond", "Georgia", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 2px 16px rgba(43,36,38,0.06)",
        hover: "0 8px 32px rgba(43,36,38,0.10)",
        btn: "0 4px 16px rgba(178,58,72,0.30)",
      },
    },
  },
  plugins: [],
};
