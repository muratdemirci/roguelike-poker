/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        xxs: "360px",
        xs: "480px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
      keyframes: {
        fadeInOut: {
          "0%": { opacity: 0, transform: "translateY(-10px)" },
          "10%": { opacity: 1, transform: "translateY(0)" },
          "90%": { opacity: 1 },
          "100%": { opacity: 0 },
        },
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        scoreUp: {
          "0%": { opacity: 1, transform: "translateY(0)" },
          "100%": { opacity: 0, transform: "translateY(-20px)" },
        },
        cardDeal: {
          "0%": {
            opacity: 0,
            transform: "translateY(50px) scale(0.85) rotate(5deg)",
          },
          "60%": {
            opacity: 1,
            transform: "translateY(-15px) scale(0.9) rotate(-3deg)",
          },
          "80%": { transform: "translateY(-5px) scale(0.85) rotate(1deg)" },
          "100%": { transform: "translateY(0) scale(0.85) rotate(0deg)" },
        },
        cardEntrance: {
          "0%": {
            opacity: 0,
            transform: "translateX(30px) scale(0.85) rotate(5deg)",
          },
          "60%": {
            opacity: 1,
            transform: "translateX(-10px) scale(0.85) rotate(-2deg)",
          },
          "100%": { transform: "translateX(0) scale(0.85) rotate(0deg)" },
        },
        deckShuffle: {
          "0%": { transform: "translateY(0) rotate(0deg)" },
          "25%": { transform: "translateY(-5px) rotate(-5deg)" },
          "50%": { transform: "translateY(0) rotate(5deg)" },
          "75%": { transform: "translateY(-3px) rotate(-3deg)" },
          "100%": { transform: "translateY(0) rotate(0deg)" },
        },
        blink: {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0 },
        },
        cardHover: {
          "0%": {
            transform: "translateY(0) scale(1) rotate(0deg)",
            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
          },
          "100%": {
            transform: "translateY(-8px) scale(1.05) rotate(-1deg)",
            boxShadow: "0 12px 20px rgba(0, 0, 0, 0.4)",
          },
        },
        cardSelect: {
          "0%": {
            transform: "translateY(0) rotate(0deg) scale(1)",
            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
          },
          "30%": {
            transform: "translateY(-25px) rotate(-5deg) scale(1.08)",
            boxShadow:
              "0 0 15px rgba(255, 215, 0, 0.7), 0 5px 10px rgba(0, 0, 0, 0.3)",
          },
          "45%": {
            transform: "translateY(-18px) rotate(3deg) scale(1.06)",
            boxShadow:
              "0 0 15px rgba(255, 215, 0, 0.7), 0 5px 10px rgba(0, 0, 0, 0.3)",
          },
          "60%": {
            transform: "translateY(-22px) rotate(-2deg) scale(1.05)",
            boxShadow:
              "0 0 15px rgba(255, 215, 0, 0.7), 0 5px 10px rgba(0, 0, 0, 0.3)",
          },
          "75%": {
            transform: "translateY(-20px) rotate(1deg) scale(1.04)",
            boxShadow:
              "0 0 15px rgba(255, 215, 0, 0.7), 0 5px 10px rgba(0, 0, 0, 0.3)",
          },
          "100%": {
            transform: "translateY(-20px) rotate(0deg) scale(1.03)",
            boxShadow:
              "0 0 15px rgba(255, 215, 0, 0.7), 0 5px 10px rgba(0, 0, 0, 0.3)",
          },
        },
        cardDeselect: {
          "0%": {
            transform: "translateY(-20px) rotate(0deg) scale(1.03)",
            boxShadow:
              "0 0 15px rgba(255, 215, 0, 0.7), 0 5px 10px rgba(0, 0, 0, 0.3)",
          },
          "30%": {
            transform: "translateY(-5px) rotate(2deg) scale(1.02)",
            boxShadow:
              "0 0 10px rgba(255, 215, 0, 0.5), 0 5px 8px rgba(0, 0, 0, 0.3)",
          },
          "60%": {
            transform: "translateY(5px) rotate(-1deg) scale(1.01)",
            boxShadow:
              "0 0 5px rgba(255, 215, 0, 0.3), 0 4px 6px rgba(0, 0, 0, 0.2)",
          },
          "80%": {
            transform: "translateY(2px) rotate(0deg) scale(1)",
            boxShadow: "0 3px 5px rgba(0, 0, 0, 0.2)",
          },
          "100%": {
            transform: "translateY(0) rotate(0deg) scale(1)",
            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
          },
        },
        cardGlow: {
          "0%": {
            boxShadow:
              "0 0 5px rgba(255, 215, 0, 0.5), 0 5px 10px rgba(0, 0, 0, 0.3)",
          },
          "50%": {
            boxShadow:
              "0 0 20px rgba(255, 215, 0, 0.8), 0 5px 15px rgba(0, 0, 0, 0.3)",
          },
          "100%": {
            boxShadow:
              "0 0 5px rgba(255, 215, 0, 0.5), 0 5px 10px rgba(0, 0, 0, 0.3)",
          },
        },
        cardFloat: {
          "0%": { transform: "translateY(0) rotate(0deg)" },
          "25%": { transform: "translateY(-3px) rotate(-0.5deg)" },
          "50%": { transform: "translateY(-5px) rotate(0.5deg)" },
          "75%": { transform: "translateY(-3px) rotate(-0.3deg)" },
          "100%": { transform: "translateY(0) rotate(0deg)" },
        },
        spinSlow: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      animation: {
        fadeInOut: "fadeInOut 2s ease-in-out",
        fadeIn: "fadeIn 0.5s ease-in-out",
        scoreUp: "scoreUp 1s ease-out forwards",
        cardDeal:
          "cardDeal 0.7s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards",
        cardEntrance:
          "cardEntrance 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards",
        deckShuffle: "deckShuffle 0.8s ease-in-out",
        blink: "blink 0.8s step-end infinite",
        cardHover: "cardHover 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
        cardHoverOut:
          "cardHover 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) reverse forwards",
        cardSelect:
          "cardSelect 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
        cardDeselect:
          "cardDeselect 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
        cardGlow: "cardGlow 2s ease-in-out infinite",
        cardFloat: "cardFloat 3s ease-in-out infinite",
        "spin-slow": "spinSlow 5s linear infinite",
      },
    },
  },
  plugins: [],
};
