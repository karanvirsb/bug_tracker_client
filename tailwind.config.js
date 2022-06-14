/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        screens: {
            xl: { max: "2000px" },
            lg: { max: "1176px" },
            md: { max: "768px" },
            sm: { max: "480px" },
            xs: { max: "250px" },
        },
        extend: {
            colors: {
                "main-color": "#403F3F",
                "secondary-color": "#C97878",
            },
        },
    },
    plugins: [],
};
