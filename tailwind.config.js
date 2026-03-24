import formsPlugin from '@tailwindcss/forms';
import containerQueriesPlugin from '@tailwindcss/container-queries';

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "on-primary-fixed-variant": "#862200",
        "on-primary": "#ffffff",
        "surface-bright": "#fcf9f8",
        "on-error-container": "#93000a",
        "secondary": "#5c5f61",
        "on-secondary": "#ffffff",
        "on-primary-container": "#541200",
        "on-secondary-container": "#626567",
        "surface-container-high": "#ebe7e7",
        "error": "#ba1a1a",
        "surface-container-low": "#f6f3f2",
        "on-secondary-fixed": "#191c1e",
        "on-primary-fixed": "#3b0900",
        "error-container": "#ffdad6",
        "primary-container": "#ff5722",
        "on-tertiary": "#ffffff",
        "background": "#fcf9f8",
        "on-tertiary-fixed-variant": "#005312",
        "secondary-fixed-dim": "#c5c7c9",
        "on-tertiary-container": "#003207",
        "surface-container": "#f0edec",
        "inverse-surface": "#313030",
        "on-secondary-fixed-variant": "#444749",
        "on-surface": "#1c1b1b",
        "inverse-primary": "#ffb5a0",
        "surface-dim": "#dcd9d9",
        "tertiary-fixed-dim": "#88d982",
        "outline-variant": "#e4beb4",
        "surface": "#fcf9f8",
        "on-error": "#ffffff",
        "secondary-fixed": "#e1e3e5",
        "on-tertiary-fixed": "#002204",
        "primary": "#b02f00",
        "on-surface-variant": "#5b4039",
        "surface-variant": "#e5e2e1",
        "outline": "#907067",
        "tertiary": "#1b6d24",
        "primary-fixed-dim": "#ffb5a0",
        "surface-container-lowest": "#ffffff",
        "primary-fixed": "#ffdbd1",
        "inverse-on-surface": "#f3f0ef",
        "secondary-container": "#e1e3e5",
        "tertiary-container": "#53a252",
        "surface-tint": "#b02f00",
        "surface-container-highest": "#e5e2e1",
        "on-background": "#1c1b1b",
        "tertiary-fixed": "#a3f69c"
      },
      fontFamily: {
        "headline": ["Inter", "sans-serif"],
        "body": ["Public Sans", "sans-serif"],
        "label": ["Inter", "sans-serif"]
      },
      borderRadius: {"DEFAULT": "0.25rem", "lg": "0.5rem", "xl": "1.5rem", "full": "9999px"},
    },
  },
  plugins: [
    formsPlugin,
    containerQueriesPlugin
  ],
}
