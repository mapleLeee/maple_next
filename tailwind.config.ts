// tailwind.config.ts
import type {Config} from "tailwindcss";

const config: Config = {
    darkMode: 'class',
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./pages/**/*.{js,ts,jsx,tsx}"
    ],
    theme: {},
    plugins: [],
    // 正确写法：用 blocklist 替代 safelist
    // blocklist: [
    //     // 让 Tailwind 永远别再报 “from-purple-950/50 和 from-purple-50/60 太像了”
    //     "from-purple-950/50",
    //     "from-purple-50/60",
    //     "from-purple-50/90",
    //     "to-cyan-950/50",
    //     "to-cyan-50/60",
    // ],
};

export default config;