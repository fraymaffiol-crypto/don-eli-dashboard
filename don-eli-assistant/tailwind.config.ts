import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'cafe-intenso': '#4B2C20',
        'crema-don-eli': '#F5E6D3',
        'dorado-premium': '#C59D5F',
        'hueso': '#FFFFFF',
        'gris-carbon': '#333333',
      },
    },
  },
  plugins: [],
};
export default config;