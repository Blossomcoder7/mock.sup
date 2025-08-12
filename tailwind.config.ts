/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "mw-black": "#000000",
        "mw-white": "#F4F5F5",
        "mw-beige": "#EAE5E3",
        "mw-green-dark": "#053333",
        // "mw-green-light": "#B8D432",
        "mw-green-light": "#fc5f2b",
        "mw-violet": "#BFB1D7",
        "mw-blue": "#94CDD9",
        "mw-gray-light": "#D4D6D3",
        "mw-gray-dark": "#919191",
      },
      fontFamily: {
        sans: ['"Inter Tight"', "sans-serif"],
      },
      fontSize: {
        // Headings
        h1: ["3.5rem", { lineHeight: "1" }], // 100px
        "h1-m": ["2.5rem", { lineHeight: "1.2" }], // 40px
        h2: ["4rem", { lineHeight: "1.2" }], // 64px
        "h2-m": ["2.25rem", { lineHeight: "1.2" }], // 36px
        h3: ["2.5rem", { lineHeight: "1.2" }], // 40px
        "h3-m": ["2rem", { lineHeight: "1.2" }], // 32px
        h4: ["2rem", { lineHeight: "1.2" }], // 32px
        "h4-m": ["1.5rem", { lineHeight: "1.2" }], // 24px
        h5: ["1.5rem", { lineHeight: "1.2" }], // 24px
        "h5-m": ["1.25rem", { lineHeight: "1.2" }], // 20px
        h6: ["1.25rem", { lineHeight: "1.2" }], // 20px
        "h6-m": ["1.125rem", { lineHeight: "1.2" }], // 18px
        // Taglines
        "tagline-lg": ["2.5rem", { lineHeight: "1.5" }], // 40px
        "tagline-md": ["2rem", { lineHeight: "1.5" }], // 32px
        "tagline-sm": ["1.5rem", { lineHeight: "1.5" }], // 24px
        "tagline-xs": ["1rem", { lineHeight: "1.5" }], // 16px
        "tagline-xxs": ["0.875rem", { lineHeight: "1.5" }], // 14px
        // Body text
        "mw-text-lg": ["1.25rem", { lineHeight: "1.5" }],
        "mw-text-md": ["1rem", { lineHeight: "1.5" }],
        "mw-text-base": ["0.875rem", { lineHeight: "1.5" }],
        "mw-text-sm": ["0.75rem", { lineHeight: "1.5" }],
        "mw-text-xs": ["0.625rem", { lineHeight: "1.5" }],
      },
      screens: {
        mobile: "480px",
        "3xl": "1600px",
        "4xl": "2000px",
        "5xl": "2400px",
      },
    },
  },
  plugins: [],
};
