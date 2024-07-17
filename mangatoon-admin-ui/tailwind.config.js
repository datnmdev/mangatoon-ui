/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,jsx}'],
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        }
      },
      animation: {
        dropdown: 'dropdown 0.3s ease-out forwards',
        fadeIn: 'fadeIn 1s ease-in forwards'
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

