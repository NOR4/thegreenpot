/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        pixel: ['"VT323"', 'monospace'],
        retro: ['"Press Start 2P"', 'cursive'],
      },
      boxShadow: {
        hard: '4px 4px 0px 0px #000000',
      },
      colors: {
        parchment: '#eec39a',
        'gray-retro': '#f4f4f4',
        'purple-retro': '#46007c',
        // Overwriting or ensuring basics
        black: '#000000',
      },
      // Using extend to add to existing colors, but user requested specific palette.
      // Primary Action Green (Gameboy)
      // Custom extend for specific needs
    },
  },
  plugins: [],
}
