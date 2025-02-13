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
      },
    }
  },
  plugins: [],
};

export default config;
