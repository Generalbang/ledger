/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg:            '#0f0e0d',
        surface:       '#1a1917',
        surface2:      '#222120',
        border:        '#2e2c2a',
        gold:          '#c9a84c',
        'gold-dim':    '#8a6e2f',
        'gold-bright': '#e8c46a',
        text:          '#e8e4df',
        'text-dim':    '#7a7570',
        'text-mid':    '#b0a99f',
        red:           '#c0474a',
        'red-dim':     '#7a2f31',
        green:         '#4a8c6a',
        'green-bright':'#6db88a',
        blue:          '#4a6e9e',
        purple:        '#7a5c9e',
        orange:        '#c07840',
        teal:          '#3a8c80',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        mono:  ['"IBM Plex Mono"', 'monospace'],
        sans:  ['"IBM Plex Sans"', 'sans-serif'],
      },
      gridTemplateColumns: {
        'chart': '1fr 380px',
      },
    },
  },
  plugins: [],
}
