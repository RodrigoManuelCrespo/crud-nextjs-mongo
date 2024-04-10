import { nextui } from "@nextui-org/react";

/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [
    nextui({
      prefix: "nextui", // prefix for themes variables
      addCommonColors: false, // override common colors (e.g. "blue", "green", "pink").
      defaultTheme: "light", // default theme from the themes object
      defaultExtendTheme: "light", // default theme to extend on custom themes
      layout: {}, // common layout tokens (applied to all themes)
      themes: {
        light: {
          layout: {}, // light theme layout tokens
          colors: {}, // light theme colors
        },
        dark: {
          layout: {}, // dark theme layout tokens
          colors: {
            background: "#1F1D2B",
            foreground: "#ECEDEE", // or 50 to 900 DEFAULT
            content1: {
              foreground: "#ffffff",
              DEFAULT: "#242837",
            },
            primary: {
              //... 50 to 900
              foreground: "#ffffff",
              DEFAULT: "#FB7E22",
            },
            secondary: {
              //... 50 to 900
              foreground: "#7A0061",
              DEFAULT: "#1F1D2B",
            },
          },
        },
        // ... custom themes
      },
    }),
  ],
}
