import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "#050505",
                foreground: "#ffffff",
                accent: {
                    DEFAULT: "#ff4d5a",
                    secondary: "#00ffd0"
                }
            },
            fontFamily: {
                sans: ["var(--font-inter)"],
                heading: ["var(--font-outfit)"],
            },
        },
    },
    plugins: [],
};
export default config;
