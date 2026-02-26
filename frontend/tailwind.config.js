/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                quantum: {
                    cyan: "#00f3ff",
                    violet: "#9d00ff",
                    bg: "#050505",
                }
            }
        },
    },
    plugins: [],
}
