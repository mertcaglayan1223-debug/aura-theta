/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sanctuary: {
          50: '#FAF9F6',
          100: '#F5F3ED',
          200: '#EBE6DC',
          300: '#DDD5C4',
          400: '#C7BAA2',
          500: '#AD9D80',
          600: '#8E7F63',
          700: '#6E624C',
          800: '#4D4435',
          900: '#2A251D',
          950: '#14120E',
        },
        champagne: {
          50: '#FCF9EE',
          100: '#FAF3DD',
          200: '#F2E4B4',
          300: '#E7CE86',
          400: '#DDB658',
          500: '#D4AF37', // primary champagne gold
          600: '#B89225',
          700: '#926F1D',
          800: '#6C5019',
          900: '#443212',
        },
        sage: {
          50: '#F4F6F4',
          100: '#E5EAE5',
          200: '#CCD7CC',
          300: '#A9BFA9',
          400: '#8FA68F',
          500: '#7A8B7B', // primary grounding sage
          600: '#5F7060',
          700: '#485549',
          800: '#343E35',
          900: '#212822',
        },
        ethereal: {
          50: '#F7F6FA',
          100: '#EEEBF4',
          200: '#DCD6E8',
          300: '#C3B9D6',
          400: '#A797C2',
          500: '#8F7BAE',
          600: '#735F92',
          700: '#584970',
          800: '#3F3450',
          900: '#282133',
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glow-gold': '0 0 35px -5px rgba(212, 175, 55, 0.25)',
        'glow-sage': '0 0 35px -5px rgba(122, 139, 123, 0.3)',
        'glow-ethereal': '0 0 45px -5px rgba(143, 123, 174, 0.25)',
        'subtle-elevated': '0 20px 40px -15px rgba(42, 37, 29, 0.06)',
        'inner-light': 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.8)',
      },
      animation: {
        'float-slow': 'float 8s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 4s ease-in-out infinite',
        'spin-very-slow': 'spin 40s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-12px) rotate(1deg)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '0.9', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.02)' },
        }
      }
    },
  },
  plugins: [],
}
