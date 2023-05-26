module.exports = {
  content: [
    "./app/**/*.{ts,tsx,jsx,js}",
    "./node_modules/flowbite-react/**/*.js",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("flowbite/plugin")],
};
