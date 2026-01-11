/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'bg-body': '#050505',
        'bg-sidebar': 'rgba(8, 8, 10, 0.95)',
        'text-main': '#ffffff',
        'text-muted': '#999',
        'accent': '#45caff',
        'accent-glow': 'rgba(6, 36, 59, 0.6)',
        'discord': '#5865F2',
        'red-accent': '#ff2a2a',
        'gold-base': '#FFD700',
        'gold-glow': 'rgba(255, 215, 0, 0.8)',
        'plat-base': '#E5E4E2',
        'plat-glow': 'rgba(229, 228, 226, 0.8)',
        'bronze-base': '#CD7F32',
        'bronze-glow': 'rgba(205, 127, 50, 0.8)',
      },
      fontFamily: {
        'minecraft': ['"Press Start 2P"', 'cursive'],
        'inter': ['Inter', 'sans-serif'],
      },
      animation: {
        'pulse-title': 'pulseTitle 3s infinite ease-in-out',
        'float-idle': 'floatIdle 5s ease-in-out infinite',
        'spin-aura': 'spinAura 4s linear infinite',
        'pulse-aura': 'pulseAura 3s infinite alternate',
        'pulse-rays': 'pulseRays 5s infinite ease-in-out',
        'slide-down': 'slideDown 1s cubic-bezier(0.2, 0.8, 0.2, 1)',
        'fade-in': 'fadeIn 0.5s',
        'avatar-zoom': 'avatarZoomIn 0.8s cubic-bezier(0.25, 1, 0.5, 1) forwards',
        'hud-slide': 'hudSlideIn 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'name-fade': 'nameFadeIn 0.8s cubic-bezier(0.25, 1, 0.5, 1) forwards',
        'tier-s-glow': 'tierSGlow 2s infinite alternate',
        'tier-a-glow': 'tierAGlow 3s infinite alternate',
        'tier-b-glow': 'tierBGlow 3s infinite alternate',
      },
      backdropBlur: {
        'xs': '2px',
      }
    },
  },
  plugins: [],
}
