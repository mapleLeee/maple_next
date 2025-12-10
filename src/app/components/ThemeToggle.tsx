"use client";

/// 主题切换按钮
import {useEffect, useState} from "react";
import {motion} from "framer-motion";
import {Moon, Sun} from "lucide-react";

export default function ThemeToggle() {
    const [isDark, setIsDark] = useState(true);

    useEffect(() => {
        // 读取本地或系统偏好
        if (localStorage.theme === "light" ||
            (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: light)").matches)) {
            setIsDark(false);
            console.log("走这里-------白天")
        } else {
            setIsDark(true);
            console.log("走这里-------黑夜")

        }
    }, []);

    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add("dark");
            localStorage.theme = "dark";
            console.log("走这里-------dark")
        } else {
            document.documentElement.classList.remove("dark");

            localStorage.theme = "light";
            console.log("走这里-------light")
        }
    }, [isDark]);

    return (
        <motion.button
            aria-label="切换主题"
            className="fixed top-8 right-8 z-50 w-14 h-14 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300 shadow-2xl"
            whileTap={{scale: 0.9}}
            onClick={() => setIsDark(!isDark)}
        >
            <motion.div
                key={isDark ? "moon" : "sun"}
                initial={{rotate: isDark ? -90 : 90, opacity: 0}}
                animate={{rotate: 0, opacity: 1}}
                exit={{rotate: isDark ? 90 : -90, opacity: 0}}
                transition={{duration: 0.4, ease: "easeInOut"}}
            >
                {isDark ? (
                    <Moon className="w-7 h-7 text-purple-300"/>
                ) : (
                    <Sun className="w-7 h-7 text-yellow-400"/>
                )}
            </motion.div>

            {/* 涟漪效果 */}
            <span className="absolute inset-0 rounded-full bg-white/30 scale-0 animate-ping"/>
        </motion.button>
    );
}