/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
        colors: {
          "primary": "var(--primary)",
          "secondary": "var(--secondary)",
          "accent-1": "var(--accent-1)",
          "accent-2": "var(--accent-2)",
          "accent-3": "var(--accent-3)",
        }
      }
  },
  plugins: [],
}