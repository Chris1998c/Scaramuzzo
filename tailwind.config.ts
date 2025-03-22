/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: "class", // Dark mode basato sulla classe
	content: [
	  "./pages/**/*.{js,ts,jsx,tsx,mdx}",
	  "./components/**/*.{js,ts,jsx,tsx,mdx}",
	  "./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
	  extend: {
		colors: {
		  background: "hsl(var(--background))",
		  foreground: "hsl(var(--foreground))",
		  card: {
			DEFAULT: "hsl(var(--card))",
			foreground: "hsl(var(--card-foreground))",
		  },
		  popover: {
			DEFAULT: "hsl(var(--popover))",
			foreground: "hsl(var(--popover-foreground))",
		  },
		  primary: {
			DEFAULT: "hsl(var(--primary))",
			foreground: "hsl(var(--primary-foreground))",
		  },
		  secondary: {
			DEFAULT: "hsl(var(--secondary))",
			foreground: "hsl(var(--secondary-foreground))",
		  },
		  muted: {
			DEFAULT: "hsl(var(--muted))",
			foreground: "hsl(var(--muted-foreground))",
		  },
		  accent: {
			DEFAULT: "hsl(var(--accent))",
			foreground: "hsl(var(--accent-foreground))",
		  },
		  destructive: {
			DEFAULT: "hsl(var(--destructive))",
			foreground: "hsl(var(--destructive-foreground))",
		  },
		  border: "hsl(var(--border))",
		  input: "hsl(var(--input))",
		  ring: "hsl(var(--ring))",
		  gradient: {
			start: "hsl(var(--gradient-start))",
			end: "hsl(var(--gradient-end))",
		  },
		},
		borderRadius: {
		  xl: "1rem",
		  lg: "var(--radius)",
		  md: "calc(var(--radius) - 2px)",
		  sm: "calc(var(--radius) - 4px)",
		},
		boxShadow: {
		  card: "0px 4px 10px rgba(0, 0, 0, 0.1)",
		  navbar: "0px 2px 8px rgba(0, 0, 0, 0.05)",
		  button: "0px 2px 4px rgba(0, 0, 0, 0.1)",
		},
		fontFamily: {
		  sans: ["Inter", "sans-serif"],
		  serif: ["Merriweather", "serif"],
		},
	  },
	},
	plugins: [
	  require("tailwindcss-animate"), // Animazioni integrate
	  require("@tailwindcss/forms"), // Migliora form e input
	  require("@tailwindcss/typography"), // Migliora il testo
	],
  };
  