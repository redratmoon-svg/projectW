/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Amber primary ramp
        primary: {
          DEFAULT: '#ffc174',
          50: '#fff8eb',
          100: '#ffeccb',
          200: '#ffd99a',
          300: '#ffc174',
          400: '#f59e0b',
          500: '#d97706',
          600: '#b45309',
          700: '#92400e',
        },
        // Navy surface ramps
        navy: {
          50: '#d4e4fa',
          100: '#9bb3d4',
          200: '#5e7aa3',
          300: '#3b4459',
          400: '#273647',
          500: '#1c2b3c',
          600: '#122131',
          700: '#0d1c2d',
          800: '#051424',
          900: '#010f1f',
        },
        // Cool accent (tertiary)
        accent: {
          DEFAULT: '#c4cce6',
          100: '#e0e5f5',
          200: '#c4cce6',
          300: '#a9b1ca',
          400: '#7e88ad',
          500: '#5b678d',
        },
        // Secondary (warm pink)
        secondary: {
          DEFAULT: '#ffb2b9',
          100: '#ffdadc',
          200: '#ffb2b9',
          300: '#ff97a3',
          400: '#f87171',
        },
        success: '#4ade80',
        warning: '#fbbf24',
        error: '#f87171',
      },
      fontFamily: {
        sans: ['Geist', 'system-ui', 'sans-serif'],
        display: ['Geist', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-lg': ['48px', { lineHeight: '56px', letterSpacing: '-0.02em', fontWeight: '600' }],
        'headline-lg': ['32px', { lineHeight: '40px', letterSpacing: '-0.01em', fontWeight: '600' }],
        'headline-lg-mobile': ['28px', { lineHeight: '36px', fontWeight: '600' }],
        'body-md': ['16px', { lineHeight: '24px', fontWeight: '400' }],
        'label-sm': ['13px', { lineHeight: '16px', letterSpacing: '0.05em', fontWeight: '500' }],
      },
      spacing: {
        'stack-gap': '12px',
        'section-margin': '48px',
        gutter: '16px',
        'container-padding': '24px',
        unit: '8px',
      },
      borderRadius: {
        DEFAULT: '1rem',
        lg: '2rem',
        xl: '3rem',
      },
      keyframes: {
        'bar-idle': {
          '0%, 100%': { transform: 'scaleY(0.35)', opacity: '0.4' },
          '50%': { transform: 'scaleY(0.6)', opacity: '0.7' },
        },
        'bar-active': {
          '0%, 100%': { transform: 'scaleY(0.5)', opacity: '0.6' },
          '50%': { transform: 'scaleY(1)', opacity: '1' },
        },
        'ripple-pulse': {
          '0%': { transform: 'scale(0.8)', opacity: '0.5' },
          '100%': { transform: 'scale(2.4)', opacity: '0' },
        },
        'fade-slide-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'bar-idle': 'bar-idle 2.4s ease-in-out infinite',
        'bar-active': 'bar-active 0.7s ease-in-out infinite',
        'ripple-pulse': 'ripple-pulse 1.2s ease-out forwards',
        'fade-slide-up': 'fade-slide-up 0.6s ease-out forwards',
      },
    },
  },
  plugins: [],
};
