/** @type {import('tailwindcss').Config} */
module.exports = {
  /*Use * to match anything except slashes and hidden files
Use ** to match zero or more directories
Use comma separate values between {} to match against a list of options */
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
