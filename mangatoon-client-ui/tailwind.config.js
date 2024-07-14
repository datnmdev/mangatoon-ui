import { height } from '@mui/system';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,jsx}'],
  theme: {
    extend: {
      animation: {
        dropdown: 'dropdown 0.3s ease-out forwards' 
      }
    },
    screens: {
      'sm': '0px',
      'md': '768px',
      'xl': '1280px',
    },
  },
  plugins: [],
}

