'use client';

import {Noto_Serif_SC} from "next/font/google";
import "./globals.css";
import ThemeToggle from "./components/ThemeToggle";


const noto = Noto_Serif_SC({
    subsets: ["latin"],
})

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="zh-CN" suppressHydrationWarning>
        {/* 不再强制 className="dark"，交给按钮控制 */}
        <body className={`${noto.className} bg-black text-white overflow-x-hiQdden`}>
        {children}
        <ThemeToggle /> {/* 全局悬浮按钮 */}
        </body>
        </html>
    );
}