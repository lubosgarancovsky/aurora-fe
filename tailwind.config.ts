import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        default: {
          DEFAULT: "hsl(var(--default) / <alpha-value>)",
          900: "hsl(var(--default-900) / <alpha-value>)",
          800: "hsl(var(--default-800) / <alpha-value>)",
          700: "hsl(var(--default-700) / <alpha-value>)",
          600: "hsl(var(--default-600) / <alpha-value>)"
        },
        foreground: {
          DEFAULT: "hsl(var(--foreground) / <alpha-value>)",
          light: "hsl(var(--foreground-light) / <alpha-value>)",
          dark: "hsl(var(--foreground-dark) / <alpha-value>)"
        },
        primary: {
          DEFAULT: "hsl(var(--primary) / <alpha-value>)",
          light: "hsl(var(--primary-light) / <alpha-value>)"
        },
        danger: {
          DEFAULT: "hsl(var(--danger) / <alpha-value>)",
          light: "hsl(var(--danger-light) / <alpha-value>)"
        },
        success: {
          DEFAULT: "hsl(var(--success) / <alpha-value>)",
          light: "hsl(var(--success-light) / <alpha-value>)"
        },
        border: "hsl(var(--border) / <alpha-value>)"
      }
    }
  },
  plugins: []
};
export default config;
