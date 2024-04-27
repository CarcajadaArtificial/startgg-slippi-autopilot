import { type Config } from "tailwindcss";

export default {
  content: [
    "{routes,islands,components}/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        lighter: '#EADFD2',
        light: '#93A18C',
        base: '#435B66',
        dark: '#2D4356',
        darker: '#0F2533',
      }
    }
  }
} satisfies Config;
