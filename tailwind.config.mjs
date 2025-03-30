import typographyPlugin from '@tailwindcss/typography';
import formsPlugin from '@tailwindcss/forms';
import animatePlugin from 'tailwindcss-animate';

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
  	extend: {
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			primary: {
  				light: '#6366F1',
  				DEFAULT: '#4F46E5',
  				dark: '#4338CA',
  				foreground: '#FFFFFF'
  			},
  			secondary: {
  				light: '#F3F4F6',
  				DEFAULT: '#E5E7EB',
  				dark: '#D1D5DB',
  				foreground: '#111827'
  			},
  			accent: {
  				light: '#FEF3C7',
  				DEFAULT: '#FDE68A',
  				dark: '#FCD34D',
  				foreground: '#92400E'
  			},
  			neutral: {
  				50: '#FAFAFA',
  				100: '#F4F4F5',
  				200: '#E4E4E7',
  				300: '#D4D4D8',
  				400: '#A1A1AA',
  				500: '#71717A',
  				600: '#52525B',
  				700: '#3F3F46',
  				800: '#27272A',
  				900: '#18181B',
  			},
  			success: {
  				light: '#DCFCE7',
  				DEFAULT: '#22C55E',
  				dark: '#16A34A'
  			},
  			warning: {
  				light: '#FEF3C7',
  				DEFAULT: '#F59E0B',
  				dark: '#D97706'
  			},
  			error: {
  				light: '#FEE2E2',
  				DEFAULT: '#EF4444',
  				dark: '#DC2626'
  			},
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))',
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		borderRadius: {
  			'lg': '1rem',
  			'xl': '1.25rem',
  			'2xl': '1.5rem',
  		},
  		boxShadow: {
  			'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
  			'strong': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  		},
  		typography: {
  			DEFAULT: {
  				css: {
  					maxWidth: 'none',
  					color: 'hsl(var(--foreground))',
  					h1: {
  						color: 'hsl(var(--foreground))',
  						fontWeight: '700'
  					},
  					h2: {
  						color: 'hsl(var(--foreground))',
  						fontWeight: '600'
  					},
  					'ul > li': {
  						paddingLeft: '1.5em'
  					},
  					'ul > li::before': {
  						backgroundColor: 'hsl(var(--foreground))'
  					}
  				}
  			}
  		},
  		fontFamily: {
  			sans: ['var(--font-poppins)', 'system-ui', 'sans-serif'],
  			display: ['var(--font-poppins)', 'system-ui', 'sans-serif'],
  		},
  		animation: {
  			'fade-up': 'fadeUp 0.5s ease-out',
  			'fade-down': 'fadeDown 0.5s ease-out',
  			'scale-up': 'scaleUp 0.2s ease-out',
  			'float': 'float 6s ease-in-out infinite',
  		},
  		keyframes: {
  			fadeUp: {
  				'0%': { opacity: '0', transform: 'translateY(10px)' },
  				'100%': { opacity: '1', transform: 'translateY(0)' },
  			},
  			fadeDown: {
  				'0%': { opacity: '0', transform: 'translateY(-10px)' },
  				'100%': { opacity: '1', transform: 'translateY(0)' },
  			},
  			scaleUp: {
  				'0%': { transform: 'scale(0.95)' },
  				'100%': { transform: 'scale(1)' },
  			},
  			float: {
  				'0%, 100%': { transform: 'translateY(0)' },
  				'50%': { transform: 'translateY(-20px)' },
  			},
  		},
  		backdropBlur: {
  			xs: '2px',
  		},
  		backgroundImage: {
  			'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
  		},
  	}
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('tailwindcss-animate'),
  ],
} 