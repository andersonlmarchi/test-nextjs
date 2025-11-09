export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          lightest: "#8CBFB7",
          light: "#00856E",
          DEFAULT: "#006151",
          dark: "#004A3F",
        },
        secondary: {
          light: "#02E09F",
          DEFAULT: "#01865F",
          dark: "#016F4F",
        },
        gray: {
          light: "#DDDDDD",
          DEFAULT: "#CCCCCC",
          dark: "#BBBBBB",
          darkest: "#333333",
        },
        white: {
          DEFAULT: "#FFFFFF",
          dark: "#F5F5F5",
        },
        alert: {
          infoLightest: "#E8F3FF",
          info: "#0070C0",
          infoDark: "#004B87",
          successLightest: "#E6F9F5",
          success: "#009A6E",
          successDark: "#005F46",
          warningLightest: "#FFF7E6",
          warning: "#F7A600",
          warningDark: "#6C4700",
          dangerLightest: "#FFECEC",
          danger: "#E53935",
          dangerDark: "#B71C1C",
        },
      },
    },
  },
  plugins: [],
};
