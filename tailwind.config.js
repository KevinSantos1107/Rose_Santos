/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        sage: "var(--sage)",
        "sage-light": "var(--sage-light)",
        "sage-dark": "var(--sage-dark)",
        olive: "var(--olive)",
        cream: "var(--bg-cream)",
        warm: "var(--bg-warm)",
        "sage-section": "var(--bg-sage-section)",
        ink: "var(--text-primary)",
        "ink-soft": "var(--text-secondary)",
        "ink-muted": "var(--text-muted)",
        "on-sage": "var(--text-on-sage)",
        line: "var(--border-warm)",
        "line-sage": "var(--border-subtle)",
        background: "var(--bg-base)",
      },
      fontFamily: {
        serif: ["Cormorant Garamond", "Georgia", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 2px 16px rgba(44,44,42,0.06)",
        hover: "0 8px 32px rgba(44,44,42,0.10)",
        btn: "0 4px 16px rgba(143,175,139,0.30)",
      },
    },
  },
  plugins: [],
};
