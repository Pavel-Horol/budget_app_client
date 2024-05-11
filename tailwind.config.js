/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.html',
    './src/**/*.js',
    './src/**/*.jsx',
    './src/**/*.tsx',
    './src/**/*.ts',
  ],
  theme: {
      container: {
        padding: '2rem',
        center: true
      },
      extend: {
        fontFamily: {
            roboto: ['Roboto', 'sans-serif'],
        }
      },
  },
  plugins: [
      require('@tailwindcss/forms')
  ],
}

