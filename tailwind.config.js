/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "rgb(var(--color-background) / <alpha-value>)",
        surface: "rgb(var(--color-surface) / <alpha-value>)",
        "surface-muted": "rgb(var(--color-surface-muted) / <alpha-value>)",
        border: "rgb(var(--color-border) / <alpha-value>)",
        marsala: {
          50: "rgb(var(--color-accent-50) / <alpha-value>)",
          100: "rgb(var(--color-accent-100) / <alpha-value>)",
          500: "rgb(var(--color-accent) / <alpha-value>)",
          600: "rgb(var(--color-accent-strong) / <alpha-value>)",
          700: "rgb(var(--color-accent-deep) / <alpha-value>)",
        },
        rose: {
          50: "rgb(var(--color-accent-50) / <alpha-value>)",
          100: "rgb(var(--color-accent-100) / <alpha-value>)",
          300: "rgb(var(--color-accent-soft) / <alpha-value>)",
          400: "rgb(var(--color-accent-muted) / <alpha-value>)",
          500: "rgb(var(--color-accent) / <alpha-value>)",
        },
        sage: {
          100: "rgb(var(--color-green-100) / <alpha-value>)",
          400: "rgb(var(--color-green-400) / <alpha-value>)",
          500: "rgb(var(--color-green) / <alpha-value>)",
          600: "rgb(var(--color-green-strong) / <alpha-value>)",
        },
        navy: {
          800: "#1A2536",
          900: "#0F172A",
        },
        champagne: {
          100: "#FDFBF7",
          400: "#E5D3B3",
          500: "#D4AF37",
        },
        charcoal: "rgb(var(--color-charcoal) / <alpha-value>)",
      },
      fontFamily: {
        serif: ["var(--font-serif)"],
        sans: ["var(--font-sans)"],
      },
      boxShadow: {
        subtle: "0 2px 10px rgba(0, 0, 0, 0.03)",
        card: "0 4px 20px -2px rgba(139, 38, 62, 0.05)",
        floating: "0 12px 32px -4px rgba(30, 41, 59, 0.08)",
      },
    },
  },
  plugins: [],
};
