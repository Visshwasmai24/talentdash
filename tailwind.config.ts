import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      colors: {
        coral: '#FF5A5F',
        'deep-text': '#222222',
        'body-text': '#484848',
        'muted-text': '#717171',
        'border-color': '#EBEBEB',
        'app-bg': '#F7F7F7',
        'success-green': '#008A05',
        'warning-orange': '#FFB400',
        'error-red': '#D93025',
        'data-blue': '#0369A1',
      },
    },
  },
  plugins: [],
};
export default config;
