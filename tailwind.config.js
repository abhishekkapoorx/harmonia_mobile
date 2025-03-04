/** @type {import('tailwindcss').Config} */
module.exports = {
    // NOTE: Update this to include the paths to all of your component files.
    content: ["./app/**/*.{js,jsx,ts,tsx}"],
    presets: [require("nativewind/preset")],
    theme: {
        extend: {
            colors: {
                c1: "#F7CBCA",
                c2: "#DDD3D3",
                c3: "#F1F7F7",
                c4: "#D5E5E5",
                c5: "#BBD8D6",
                c6: "#5D6B6B",
                grayD: "#2A2A2A",
                grayL: "#CCCCCC"
            },
            fontFamily: {
                questrial: ["questrial", "sans-serif"],
                anonymousPro: ["anonymousPro", "monospace"],
            }
        },
    },
    plugins: [],
}