/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'bg-body': '#050505',
        'bg-sidebar': 'rgba(8, 8, 10, 0.95)',
        'text-main': '#ffffff',
        'text-muted': '#999',
        'accent': '#45caff',
        'discord': '#5865F2',
        'red-accent': '#ff2a2a',
      },
      fontFamily: {
        'minecraft': ['"Press Start 2P"', 'cursive'],
        'inter': ['Inter', 'sans-serif'],
      },
      animation: {
        'pulse-title': 'pulseTitle 3s infinite ease-in-out',
        'float-idle': 'floatIdle 5s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}
