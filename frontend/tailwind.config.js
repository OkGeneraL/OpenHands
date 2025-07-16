/** @type {import('tailwindcss').Config} */
import { heroui } from "@heroui/react";
import typography from "@tailwindcss/typography";
export default {
  theme: {
    fontFamily: {
      sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
    },
    extend: {
      colors: {
        primary: "#FFD600", // vibrant yellow accent
        accent: "#7F5AF0", // modern purple accent
        glass: "rgba(36, 39, 46, 0.7)",
        glassLight: "rgba(36, 39, 46, 0.4)",
        base: "#181A20", // deep dark
        "base-secondary": "#23262F", // glassy dark
        "base-gradient": "linear-gradient(135deg, #23262F 0%, #181A20 100%)",
        surface: "#23262F",
        border: "#23262F",
        danger: "#E76A5E",
        success: "#A5E75E",
        basic: "#9099AC",
        tertiary: "#454545",
        "tertiary-light": "#B7BDC2",
        content: "#ECEDEE",
        "content-2": "#F9FBFE",
      },
      boxShadow: {
        glass: "0 4px 32px 0 rgba(31, 38, 135, 0.15)",
        card: "0 2px 8px 0 rgba(0,0,0,0.10)",
        button: "0 1.5px 6px 0 rgba(127,90,240,0.15)",
      },
      backgroundImage: {
        'glass-gradient': 'linear-gradient(135deg, rgba(36,39,46,0.7) 0%, rgba(24,26,32,0.7) 100%)',
        'accent-gradient': 'linear-gradient(90deg, #7F5AF0 0%, #FFD600 100%)',
      },
      borderRadius: {
        xl: '1.25rem',
        '2xl': '2rem',
        '3xl': '2.5rem',
      },
      screens: {
        'xs': '375px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      minHeight: {
        '12': '3rem',
        '16': '4rem',
      },
      minWidth: {
        '12': '3rem',
        '16': '4rem',
      },
    },
  },
  darkMode: "class",
  plugins: [typography],
};
