/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg:            'var(--bg)',
        'bg-alt':      'var(--bg-alt)',
        'bg-card':     'var(--bg-card)',
        navy:          'var(--navy)',
        'body-text':   'var(--body)',
        muted:         'var(--muted)',
        blue:          'var(--blue)',
        'blue-deep':   'var(--blue-deep)',
        purple:        'var(--purple)',
        'purple-deep': 'var(--purple-deep)',
        border:        'var(--border)',
      },
      fontFamily: {
        heading:  ['Syne', 'sans-serif'],
        body:     ['PP Neue Montreal', 'Inter', 'sans-serif'],
        mondwest: ['PP Mondwest', 'Georgia', 'serif'],
      },
      backgroundImage: {
        'gradient-brand': 'linear-gradient(135deg, #0099FF, #7B3CE8)',
        'gradient-soft':  'linear-gradient(135deg, rgba(0,153,255,0.08), rgba(123,60,232,0.08))',
      },
      boxShadow: {
        'glow-blue':   '0 0 60px rgba(0,153,255,0.25)',
        'glow-purple': '0 0 60px rgba(123,60,232,0.20)',
        card:          '0 4px 24px rgba(13,13,43,0.07)',
        'card-hover':  '0 12px 40px rgba(13,13,43,0.13)',
      },
    },
  },
  plugins: [],
};

