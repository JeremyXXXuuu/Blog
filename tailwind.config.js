/** @type {import('tailwindcss').Config} */
module.exports = {
  /*Use * to match anything except slashes and hidden files
Use ** to match zero or more directories
Use comma separate values between {} to match against a list of options */
  content: [    
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
      // Or if using `src` directory:
      "./src/**/*.{js,ts,jsx,tsx,mdx}",],
  theme: {
    extend: {},
  },
  plugins: [],
};
