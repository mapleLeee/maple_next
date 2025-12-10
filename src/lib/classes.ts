'use client';
// lib/classes.ts   ← 所有 Tailwind 常量都扔这里
import {cn} from "@/utils/cn";

export const lizibeijing = cn("fixed inset-0 -z-10 bg-gradient-to-br dark:from-purple-950/50 dark:via-black dark:to-cyan-950/50 from-purple-50/60 via-white to-cyan-50/60");

export const yuzhou = cn("font-black bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400");

export const maplelee = cn( "text-7xl md:text-9xl font-black bg-clip-text text-transparent bg-gradient-to-r dark:from-purple-400 dark:via-pink-400 dark:to-cyan-400 from-purple-600 via-pink-600 to-cyan-600 mb-8 leading-tight");

export const maplelee1 = cn(  "px-6 py-3 rounded-2xl bg-gradient-to-r from-purple-600/20 to-cyan-600/20 backdrop-blur-xl border border-white/20 shadow-2xl cursor-pointer");

export const skillclass = cn(  "font-bold text-lg bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400");

export const card = cn(
    "group relative overflow-hidden rounded-3xl backdrop-blur-xl",
    "border border-white/10 shadow-2xl transition-all duration-700",
    "hover:-translate-y-8"
);

export const cardImage = cn(
    "w-full h-96 object-cover group-hover:scale-110 transition-transform duration-1000"
);

export const button = cn(
    "px-8 py-4 rounded-2xl font-bold text-lg",
    "bg-gradient-to-r from-purple-600 to-cyan-600",
    "hover:scale-105 active:scale-95 transition-all"
);

export const glow = cn(
    "absolute inset-0 bg-gradient-to-br from-purple-600/20 to-cyan-600/20",
    "opacity-0 group-hover:opacity-100 transition-opacity duration-700"
);