import { height } from '@mui/system';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,jsx}'],
  theme: {
    extend: {
      keyframes:{
        '0%': {
          height: '0',
          opacity: '0'
        },
        '100%': {
          height: '100%',
          opacity: '1'
        }
      },
      animation: {
        dropDown: 'dropDown 2s ease-out forwards' 
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

