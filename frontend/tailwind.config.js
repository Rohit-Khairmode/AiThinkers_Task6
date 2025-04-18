const config = {
  important: true, //this will make every tailwind class important
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // App Router files
    "./components/**/*.{js,ts,jsx,tsx}", // Reusable components
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
