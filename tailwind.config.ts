import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        bounceHigher: {
          '0%, 50%, 100%': { transform: 'translateY(0)' },
          '25%': { transform: 'translateY(-0.35rem)' }, // Adjust the value here for higher bounce
          // '100%': { transform: 'translateY(0)' }, // Adjust the value here for a smoother bounce
        },
      },
      animation: {
        bounceHigher: 'bounceHigher 0.85s infinite',
      },
    },
  },
  plugins: [],
};
export default config;
