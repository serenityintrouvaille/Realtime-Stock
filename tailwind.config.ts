import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        dark: '#0f0f0f',
        glass: 'rgba(255, 255, 255, 0.1)',
      },
    },
  },
  plugins: [],
};

export default config;
