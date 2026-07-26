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
        background: "#FAF8F5",
        surface: "#FFFFFF",
        "surface-muted": "#F4F0EA",
        border: "#E6DFD5",
        marsala: {
          50: "#fdf2f4",
          100: "#fbe5e9",
          500: "#8B263E",
          600: "#761f33",
          700: "#5e1828",
        },
        rose: {
          50: "#fff5f7",
          100: "#fde8ed",
          300: "#C48B9F",
          400: "#B8758D",
          500: "#A35C74",
        },
        sage: {
          100: "#eaf0eb",
          400: "#889F8F",
          500: "#5B7065",
          600: "#495a51",
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
        charcoal: "#1E293B",
      },
      fontFamily: {
        serif: ["Playfair Display", "Georgia", "serif"],
        sans: ["Plus Jakarta Sans", "Inter", "sans-serif"],
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
