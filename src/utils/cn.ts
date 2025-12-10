// utils/cn.ts 终极懒人版（0 思考，0 报错）
'use client';
import {ClassValue, clsx} from "clsx";
import {twMerge} from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
    // 服务端永远返回空字符串或基础类，客户端再覆盖
    // if (typeof window !== "undefined") {
    //     return "";
    // }
    return twMerge(clsx(inputs));
};