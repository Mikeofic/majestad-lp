/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-50': '#fef7ee',
        'primary-100': '#fdedd3',
        'primary-200': '#fbd7a5',
        'primary-300': '#f8ba6d',
        'primary-400': '#f59332',
        'primary-500': '#f2750a',
        'primary-600': '#e35a00',
        'primary-700': '#bc4302',
        'primary-800': '#953408',
        'primary-900': '#782c09',
        'secondary-50': '#f8fafc',
        'secondary-100': '#f1f5f9',
        'secondary-200': '#e2e8f0',
        'secondary-300': '#cbd5e1',
        'secondary-400': '#94a3b8',
        'secondary-500': '#64748b',
        'secondary-600': '#475569',
        'secondary-700': '#334155',
        'secondary-800': '#1e293b',
        'secondary-900': '#0f172a',
      },
      fontFamily: {
        'sans': ['Inter', 'ui-sans-serif', 'system-ui'],
        'serif': ['Playfair Display', 'ui-serif', 'Georgia'],
      }
    },
  },
  plugins: [],
}