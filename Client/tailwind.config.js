module.exports = {
  content: ["./src/**/*.{html,js}", "./public/index.html"],
  theme: {
    extend: {
      listStyleType: {
        square: "square",
      },
      screens: {
        md: { max: "767px" },
      },
      width: {
        main: "1220px",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },

      colors: {
        main: "#ee3131",
      },
      flex: {
        2: "2 2 0%",
        3: "3 3 0%",
        4: "4 4 0%",
        5: "5 5 0%",
        6: "6 6 0%",
        7: "7 7 0%",
        8: "8 8 0%",
      },
      gridTemplateRows: {
        10: "repeat(10, minmax(0, 1fr))",
      },
      backgroundColor: {
        main: "#ee3131",
        overlay: "rgba(0,0,0,0.7)",
      },
      keyframes: {
        "slide-top": {
          "0%": {
            "-webkit-transform": "translateY(40px);",
            transform: " translateY(40px);",
          },
          "100%": {
            "-webkit-transform": "translateY(0);",
            transform: " translateY(0);",
          },
        },
        "slide-top-sm": {
          "0%": {
            "-webkit-transform": "translateY(8x);",
            transform: " translateY(8px);",
          },
          "100%": {
            "-webkit-transform": "translateY(0);",
            transform: " translateY(0);",
          },
        },
        "slide-bottom": {
          "0%": {
            "-webkit-transform": "translateY(0);",
            transform: "translateY(0);",
          },
          "100%": {
            "-webkit-transform": " translateY(10px)",
            transform: " translateY(10px)",
          },
        },
        "slide-left": {
          "0%": {
            "-webkit-transform": "translateX(100px);",
            transform: "translateX(100px);",
          },
          "100%": {
            "-webkit-transform": " translateX(0)",
            transform: " translateX(0)",
          },
        },
        "slide-right": {
          "0%": {
            "-webkit-transform": "translateX(-100px);",
            transform: "translateX(-100px);",
          },
          "100%": {
            "-webkit-transform": " translateX(0)",
            transform: " translateX(0)",
          },
        },
      },
      animation: {
        "slide-top":
          "slide-top 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;",
        "slide-top-sm": "slide-top-sm 0.2s linear both;",
        "slide-bottom":
          "slide-bottom 0.85s cubic-bezier(0.250, 0.460, 0.450, 0.940) both",
        "slide-left":
          "slide-left 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both",
        "slide-right":
          "slide-right 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both",
      },
    },
  },
  plugins: [
    require("@tailwindcss/line-clamp"),
    require("@tailwindcss/forms")({
      strategy: "class",
      strategy: "base",
    }),
  ],
};
