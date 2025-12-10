"use client";

import {useState} from "react";

interface Message {
    id: string;       // 用时间戳或其他唯一值
    content: string;  // 消息内容
    sender: 'you' | 'ai'; // 可选，区分发送者
}

export default function ChatPage() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);

    // 一次性创建唯一 ID
    const newId = () => crypto.randomUUID();


    async function sendMessage() {
        console.log("用户输入----", input);
        if (!input.trim()) return;

        const userText = input;
        setInput("");

        // 先加入用户消息
        setMessages((prev) => [
            ...prev,
            {id: newId(), content: userText, sender: "you"}
        ]);

        setLoading(true);
        try {
            const res = await fetch("http://127.0.0.1:8000/ai/chat", {
                method: "POST",
                body: JSON.stringify({message: userText}),
                headers: {"Content-Type": "application/json"},
            });

            const data = await res.json();

            // 加入 AI 回复
            setMessages((prev) => [
                ...prev,
                {id: newId(), content: data.message, sender: "ai"}
            ]);
        } catch (e) {
            setMessages((prev) => [
                ...prev,
                {id: newId(), content: "伺服器連線錯誤。", sender: "ai"}
            ]);
        }


        setLoading(false);
    }

    return (
        <div className="flex flex-col h-screen ">
            {/* 聊天记录 */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-100">

                {messages.length === 0 ? (
                    <p style={{color: '#888'}}>请输入消息开始聊天...</p>
                ) : (
                    messages.map(msg => (
                        <p key={msg.id} style={{color: msg.sender === 'ai' ? 'blue' : 'black'}}>
                            {msg.content}
                        </p>
                    ))
                )}


                {loading && (
                    <div className="mr-auto bg-white shadow p-3 rounded-lg text-gray-400">
                        正在思考……
                    </div>
                )}
            </div>

            {/* 输入框 */}
            <div className="p-4 bg-white flex gap-2 border-t text-black">
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="輸入訊息…"
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                    className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button
                    onClick={sendMessage}
                    disabled={loading}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50"
                >
                    發送
                </button>
            </div>
        </div>
    );
}
