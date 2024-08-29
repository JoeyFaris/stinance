/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3B82F6',    // Blue
        secondary: '#10B981',  // Green
        accent: '#F59E0B',     // Yellow
        neutral: '#6B7280',    // Gray
        danger: '#EF4444',     // Red
        background: '#F3F4F6', // Light Gray
      },
    },
  },
  plugins: [],
}
