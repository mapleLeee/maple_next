"use client";

import {motion, useScroll, useTransform} from "framer-motion";
import {useEffect, useRef, useState} from "react";
import {ExternalLink, Mail, X} from "lucide-react";
import {SiGithub} from "react-icons/si";
import {lizibeijing, maplelee, maplelee1, skillclass, yuzhou} from "@/lib/classes";


interface LenisType {
    raf: (time: number) => void;
}

declare global {
    interface Window {
        Lenis?: new () => LenisType;
    }
}


export default function Home() {
    const container = useRef<HTMLDivElement>(null);
    const {scrollYProgress} = useScroll({
        target: container,
        offset: ["start start", "end end"],
    });


    // 永远调用 Hook，不依赖 mounted
    const x = useTransform(scrollYProgress, [0, 1], [0, -200]);
    const scale = useTransform(scrollYProgress, [0, 0.6], [1.4, 0.8]);
    const opacity = useTransform(scrollYProgress, [0, 0.4, 0.8, 1], [0.3, 1, 1, 0.6]);

    // 鼠标跟随光斑
    const [mousePosition, setMousePosition] = useState({x: 0, y: 0});
    // 鼠标位置（光斑 + 粒子尾巴）
    const [cursorTrail, setCursorTrail] = useState<Array<{ x: number; y: number }>>([]);


    useEffect(() => {
        const handle = (e: MouseEvent) => {
            setMousePosition({x: e.clientX, y: e.clientY});

            // 粒子尾巴
            setCursorTrail((prev) => {
                const newTrail = [...prev, {x: e.clientX, y: e.clientY}];
                return newTrail.slice(-18);
            });
        };
        window.addEventListener("mousemove", handle);
        return () => window.removeEventListener("mousemove", handle);
    }, []);

    // Lenis 平滑滚动
    useEffect(() => {

        if (!window.Lenis) return;
        const lenis = new window.Lenis();
        const raf = (time: number) => {
            lenis.raf(time);
            requestAnimationFrame(raf);
        };
        requestAnimationFrame(raf);
    }, []);


    const skills = [
        "React", "Next.js 14", "TypeScript", "Three.js", "WebGL", "Rust", "Go",
        "AI Agent", "ex-Tencent", "ex-BYTEDANCE", "SIG GRAPH", "300w DAU", "WebRTC", "tRPC", "Prisma"
    ];
    const projects = [
        {
            title: "AI 設計平台 Dashboard",
            desc: "React + Three.js + Go，後端自研 AI 模型，DAU 30w+",
            img: "/project1.jpg",
            link: "https://example.com",
        },
        {
            title: "某獨角獸金融風控中台",
            desc: "Next.js 14 + tRPC + Prisma，性能跑分 99，負責全棧架構",
            img: "/project2.jpg",
            link: "https://example.com",
        },
        {
            title: "3D 數字真人直播系統",
            desc: "WebGL + WebRTC + UE5 時時渲染，延遲 < 300ms",
            img: "/project3.jpg",
            link: "https://example.com",
        },
        {
            title: "企業級 Design System",
            desc: "300+ 組件，Storybook + Radix + Tailwind，20+ 團隊使用",
            img: "/project4.jpg",
            link: "https://example.com",
        },
    ];

    return (
        <>
            {/* 粒子背景 - 暗黑 & 白天都极致好看 */}
            <div id="particles" className={lizibeijing}/>

            {/* 终极无敌鼠标光斑 — 黑白模式都丝滑 */}
            <div className="pointer-events-none fixed inset-0 -z-10">
                <div
                    className="absolute h-[700px] w-[700px] rounded-full blur-[120px]"
                    style={{
                        // 关键！用 transform 而不是 left/top，避免 hydration 不一致
                        transform: `translate(${mousePosition.x - 350}px, ${mousePosition.y - 350}px)`,
                        background: "radial-gradient(circle, var(--spotlight-color), transparent 70%)",
                        // 初始完全透明，客户端 mount 后再淡入（彻底杜绝闪烁和 hydration 报错）
                        opacity: mousePosition.x === 0 && mousePosition.y === 0 ? 0 : 1,
                        transition: "transform 0.4s ease-out, opacity 1s ease-out",
                    }}
                />
            </div>

            {/* 粒子尾巴 */}
            {cursorTrail.map((pos, i) => (
                <motion.div
                    key={i}
                    className="pointer-events-none fixed w-2 h-2 rounded-full bg-purple-400/70 blur-sm z-50"
                    initial={{scale: 0, opacity: 0.8}}
                    animate={{scale: 1, opacity: 0}}
                    exit={{opacity: 0}}
                    transition={{duration: 0.8}}
                    style={{left: pos.x - 4, top: pos.y - 4}}
                />
            ))}

            <div ref={container} className="relative min-h-screen">

                {/* Hero 主视觉 */}
                <section className="min-h-screen flex items-center justify-center relative px-6 ">
                    <div className="text-center z-10 max-w-7xl">
                        <motion.h1
                            initial={{opacity: 0, y: 60}}
                            animate={{opacity: 1, y: 0}}
                            transition={{duration: 1.2, ease: "easeOut"}}
                            className={maplelee}
                        >
                            Maple Lee
                        </motion.h1>

                        <motion.p
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            transition={{delay: 0.6, duration: 1.5}}
                            className="text-4xl md:text-6xl font-light mb-12"
                        >
                            <span className={yuzhou}>用最先進的AI—打造程式宇宙</span>
                        </motion.p>

                        {/* 3D 翻转技能标签 */}
                        <div className="flex flex-wrap justify-center gap-5 mt-20 max-w-5xl mx-auto">
                            {skills.map((skill, i) => (
                                <motion.div
                                    key={skill}
                                    initial={{opacity: 0, rotateX: -90}}
                                    whileInView={{opacity: 1, rotateX: 0}}
                                    transition={{delay: i * 0.08, duration: 0.6}}
                                    whileHover={{scale: 1.2, rotateY: 180, z: 100}}
                                    className={maplelee1}
                                    style={{transformStyle: "preserve-3d"}}
                                >
                                    <span className={skillclass}>{skill}</span>
                                </motion.div>
                            ))}
                        </div>

                        {/* 社交图标 */}
                        <div className="flex gap-8 justify-center mt-20">
                            {[
                                {href: "mailto:your@email.com", icon: Mail},
                                {href: "https://github.com/yourname", icon: SiGithub},
                                {href: "https://twitter.com/yourname", icon: X},
                            ].map(({href, icon: Icon}) => (
                                <a
                                    key={href}
                                    href={href}
                                    className="p-5 rounded-3xl backdrop-blur-xl border dark:bg-white/10 dark:border-white/20 dark:hover:bg-white/20 bg-white/60 border-gray-200/60 hover:bg-white/90 transition-all duration-500 shadow-2xl hover:shadow-purple-500/25"
                                >
                                    <Icon className="w-8 h-8"/>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/*<div className="w-20 h-30 bg-amber-500 dark:bg-white "> </div>*/}

                    {/* 向下箭头 */}
                    {/*<motion.div*/}
                    {/*    animate={{y: [0, 10, 0]}}*/}
                    {/*    transition={{repeat: Infinity, duration: 2}}*/}
                    {/*    className="absolute bottom-10 left-1/2 -translate-x-1/2 "*/}
                    {/*>*/}
                    {/*    <div*/}
                    {/*        className="w-8 h-12 rounded-full border-2 border-black dark:border-red-500  flex justify-center"*/}
                    {/*    >*/}

                    {/*    </div>*/}
                    {/*</motion.div>*/}
                </section>

                {/* 巨型视差标题 */}
                <div className="relative h-screen flex items-center justify-center overflow-hidden">
                    <motion.div
                        className="text-9xl md:text-[14rem] font-black tracking-tighter bg-clip-text text-transparent pointer-events-none select-none"
                        style={{
                            backgroundImage: "linear-gradient(90deg, #a855f7, #ec4899, #06b6d4, #a855f7)",
                            WebkitBackgroundClip: "text",
                            backgroundClip: "text",
                            backgroundSize: "200%",
                            backgroundPosition: "0% 50%",
                            x,
                            scale,
                            opacity,
                        }}
                    >
                        WORKS
                    </motion.div>
                </div>

                {/* Works */}
                <section className="py-32 px-6 max-w-7xl mx-auto">
                    {/* Selected Works 标题 */}
                    {/* <motion.h2 className="text-5xl md:text-7xl font-bold text-center mb-20 bg-clip-text text-transparent bg-gradient-to-r*/}
                    {/*dark:from-cyan-400 dark:via-purple-500 dark:to-pink-500*/}
                    {/*from-purple-700 via-pink-600 to-cyan-600">*/}
                    {/*     Selected Works*/}
                    {/* </motion.h2>*/}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {projects.map((project, i) => (
                            <motion.a
                                key={i}
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                initial={{opacity: 0, y: 60}}
                                whileInView={{opacity: 1, y: 0}}
                                transition={{delay: i * 0.15}}
                                viewport={{once: true}}
                                whileHover={{y: -20}}
                                className="group relative overflow-hidden rounded-3xl dark:bg-white/5 bg-white/70 backdrop-blur-xl dark:border-white/10 border border-gray-200/50 shadow-xl dark:shadow-2xl transition-all duration-500"
                                style={{transform: "perspective(1200px)"}}
                                onMouseMove={(e) => {
                                    const card = e.currentTarget;
                                    const rect = card.getBoundingClientRect();
                                    const x = e.clientX - rect.left;
                                    const y = e.clientY - rect.top;
                                    const cx = rect.width / 2;
                                    const cy = rect.height / 2;
                                    const rx = (y - cy) / 12;
                                    const ry = (cx - x) / 12;
                                    card.style.transform = `perspective(1200px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-20px)`;
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = "perspective(1200px) rotateX(0) rotateY(0) translateY(0)";
                                }}
                            >
                                {/* hover 发光层 */}
                                <div
                                    className="absolute inset-0 bg-gradient-to-br dark:from-purple-600/20 dark:to-cyan-600/20 from-purple-400/20 to-cyan-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700"/>

                                <div className="relative h-96 overflow-hidden">
                                    <div
                                        className="absolute inset-0 dark:bg-gradient-to-t dark:from-black/70 from-black/40 z-10"/>
                                    <img
                                        src={project.img || `https://images.unsplash.com/photo-16${i}00000000+${i}?auto=format&fit=crop&w=1200&q=80`}
                                        alt={project.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                                    />
                                </div>

                                <div className="relative p-8">
                                    <h3 className="text-3xl font-bold mb-3 dark:text-white text-gray-900">
                                        {project.title}
                                    </h3>
                                    <p className="dark:text-gray-300 text-gray-700 text-2xl leading-relaxed">
                                        {project.desc}
                                    </p>
                                    <div
                                        className="flex items-center gap-2 mt-6 dark:text-cyan-400 text-purple-600 font-medium">
                                        <span className="text-xl">查看项目</span>
                                        <ExternalLink className="w-5 h-5 group-hover:translate-x-2 transition"/>
                                    </div>
                                </div>
                            </motion.a>
                        ))}
                    </div>
                </section>

                <footer className="py-20 text-center dark:text-gray-200 text-gray-600">
                    <p className="text-xl">© 2025 Maple Lee · 做點酷的東西</p>
                </footer>
            </div>
        </>
    );
}
