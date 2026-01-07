/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        'master': '2fr 4fr',
      },
      colors: {
        'bushido-red': '#c33827',
        'glass-white': 'rgba(255, 255, 255, 0.1)',
        'glass-black': 'rgba(0, 0, 0, 0.2)',
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["[data-theme=light]"],
          primary: "#c33827",
          "primary-focus": "#a12d1f",
          "base-100": "#ffffff",
          "base-200": "#f8fafc",
          "base-300": "#f1f5f9",
        },
        dark: {
          ...require("daisyui/src/theming/themes")["[data-theme=dark]"],
          primary: "#c33827",
          "base-100": "#0f172a",
          "base-200": "#1e293b",
          "base-300": "#334155",
        },
      },
      "cyberpunk",
      "retro",
    ],
  },
}

