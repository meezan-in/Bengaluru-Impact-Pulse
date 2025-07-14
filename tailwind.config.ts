import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				'invoice-discounting': 'hsl(var(--invoice-discounting))',
				'asset-leasing': 'hsl(var(--asset-leasing))'
			},
			boxShadow: {
				'soft': 'var(--shadow-soft)',
				'medium': 'var(--shadow-medium)',
				'lifted': 'var(--shadow-lifted)',
				'dramatic': 'var(--shadow-dramatic)',
				'glow': 'var(--shadow-glow)',
				'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)'
			},
			backgroundImage: {
				'gradient-hero': 'var(--gradient-hero)',
				'gradient-card': 'var(--gradient-card)',
				'gradient-primary': 'var(--gradient-primary)',
				'gradient-secondary': 'var(--gradient-secondary)',
				'noise': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.02'/%3E%3C/svg%3E\")"
			},
			backdropBlur: {
				'glass': '12px'
			},
			fontFamily: {
				'inter': ['Inter', 'system-ui', 'sans-serif']
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'stagger-fade-up': {
					'0%': {
						opacity: '0',
						transform: 'translateY(20px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'marker-pulse': {
					'0%': {
						transform: 'scale(1)'
					},
					'50%': {
						transform: 'scale(1.3)'
					},
					'100%': {
						transform: 'scale(1)'
					}
				},
				'shimmer': {
					'0%': {
						'background-position': '-200px 0'
					},
					'100%': {
						'background-position': 'calc(200px + 100%) 0'
					}
				},
				'float': {
					'0%, 100%': {
						transform: 'translateY(0px)'
					},
					'50%': {
						transform: 'translateY(-10px)'
					}
				},
				'glow': {
					'0%': {
						'box-shadow': '0 0 5px hsl(var(--primary))'
					},
					'100%': {
						'box-shadow': '0 0 20px hsl(var(--primary)), 0 0 30px hsl(var(--primary))'
					}
				},
				'text-shimmer': {
					'0%': {
						'background-position': '0% 50%'
					},
					'50%': {
						'background-position': '100% 50%'
					},
					'100%': {
						'background-position': '0% 50%'
					}
				},
				'magnetic': {
					'0%': {
						transform: 'translate(0, 0)'
					},
					'100%': {
						transform: 'translate(var(--mouse-x, 0), var(--mouse-y, 0))'
					}
				},
				'slide-up': {
					'0%': {
						opacity: '0',
						transform: 'translateY(30px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'scale-in': {
					'0%': {
						opacity: '0',
						transform: 'scale(0.9)'
					},
					'100%': {
						opacity: '1',
						transform: 'scale(1)'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'stagger-fade-up': 'stagger-fade-up 0.6s ease-out forwards',
				'marker-pulse': 'marker-pulse 0.6s ease-in-out 2',
				'shimmer': 'shimmer 2s linear infinite',
				'float': 'float 6s ease-in-out infinite',
				'float-delayed': 'float 6s ease-in-out infinite 2s',
				'glow': 'glow 2s ease-in-out infinite alternate',
				'text-shimmer': 'text-shimmer 2.5s ease-in-out infinite',
				'magnetic': 'magnetic 0.3s ease-out',
				'slide-up': 'slide-up 0.6s ease-out',
				'scale-in': 'scale-in 0.4s ease-out'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
