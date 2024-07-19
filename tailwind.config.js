/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './layout/*.liquid',
    './sections/*.liquid',
    './snipets/*.liquid',
    './templates/*.liquid',
    './templates/customers/*.liquid',
  ],
  theme: {
    extend: {
      fontFamily: {
        helvetica: ['helvetica', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

