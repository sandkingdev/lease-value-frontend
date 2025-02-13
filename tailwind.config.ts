import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        'light-green': '#33b379',
        'custom-dark-1': '#3a3a3a',
        'title-color': '#3a739b',
        'label-warning-color': '#ff0000',
        'custom-color-1': '#BF6900',
        'custom-color-2': '#40E0D0',
        'custom-color-3': '#C10000',
      },
    }
  },
  plugins: [],
};

export default config;
