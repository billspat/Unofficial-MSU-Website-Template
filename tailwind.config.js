/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html",
    "./src/**/*.{html,js,css}",
    "./dist/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        msu: {
          green: "#18453B",
          dark: "#0F2D26",
          kelly: "#008244",
          light: "#F8F9FA",
          card: "#FFFFFF",
          border: "#E2E8F0",
          charcoal: "#1E293B",
          muted: "#475569"
        }
      },
      fontFamily: {
        sans: ["Montserrat", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
        serif: ["Merriweather", "Georgia", "Cambria", "Times New Roman", "Times", "serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "monospace"]
      }
    },
  },
  plugins: [
    require("daisyui")
  ],
  daisyui: {
    themes: [
      {
        msu: {
          "primary": "#18453B",            /* MSU Spartan Green (Pantone 567 C) */
          "primary-content": "#FFFFFF",
          "secondary": "#0F2D26",          /* MSU Deep Forest Green */
          "secondary-content": "#FFFFFF",
          "accent": "#008244",             /* MSU Kelly Green / Active Accent */
          "accent-content": "#FFFFFF",
          "neutral": "#1E293B",            /* Slate Charcoal for body and dark elements */
          "neutral-content": "#FFFFFF",
          "base-100": "#FFFFFF",           /* Pure white surface */
          "base-200": "#F8F9FA",           /* Off-white / light slate background */
          "base-300": "#E2E8F0",           /* Subtle border & divider */
          "base-content": "#1E293B",       /* High contrast body text (WCAG AAA >= 12:1) */
          "info": "#0284C7",
          "info-content": "#FFFFFF",
          "success": "#15803D",
          "success-content": "#FFFFFF",
          "warning": "#B45309",            /* High-contrast amber */
          "warning-content": "#FFFFFF",
          "error": "#B91C1C",              /* High-contrast red */
          "error-content": "#FFFFFF",
          "--rounded-box": "0.5rem",
          "--rounded-btn": "0.375rem",
          "--rounded-badge": "0.375rem",
          "--animation-btn": "0.2s",
          "--animation-input": "0.2s",
          "--btn-focus-scale": "0.98",
          "--border-btn": "1px",
          "--tab-border": "2px",
          "--tab-radius": "0.375rem"
        }
      }
    ],
    darkTheme: false,
    base: true,
    styled: true,
    utils: true,
    prefix: "",
    logs: false,
    themeRoot: ":root"
  }
};
