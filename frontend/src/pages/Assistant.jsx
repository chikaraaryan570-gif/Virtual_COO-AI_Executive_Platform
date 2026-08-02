import { useState } from "react";
import MessageBubble from "../components/chat/MessageBubble";
import TypingIndicator from "../components/chat/TypingIndicator";
import ChatInput from "../components/chat/ChatInput";
import { sendMessage } from "../services/ChatApi";
import { motion } from "framer-motion";

export default function Assistant() {
    const [typing, setTyping] = useState(false);

    const [messages, setMessages] = useState([
        {
            role: "assistant",
            content:
                "👋 Hello! I'm your **AI Executive Assistant**.\n\nI can help you analyze company performance, finance, HR, sales, operations, and business strategy.\n\nHow can I help you today?",
            time: new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
            }),
        },
    ]);

    const handleSend = async (text) => {
        if (!text.trim()) return;

        // User Message
        const userMessage = {
            role: "user",
            content: text,
            time: new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
            }),
        };

        setMessages((prev) => [...prev, userMessage]);

        // Show Typing Animation
        setTyping(true);

        try {
            // Call Backend
            const result = await sendMessage(text);

            // Hide Typing
            setTyping(false);

            // AI Message
            const aiMessage = {
                role: "assistant",
                content:
                    result.response ||
                    "Sorry, I couldn't generate a response at the moment.",
                time: new Date().toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                }),
            };

            setMessages((prev) => [...prev, aiMessage]);
        } catch (error) {
            console.error(error);

            setTyping(false);

            const errorMessage = {
                role: "assistant",
                content:
                    "❌ Unable to connect to the backend server.\n\nPlease check whether FastAPI is running.",
                time: new Date().toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                }),
            };

            setMessages((prev) => [...prev, errorMessage]);
        }
    };

    return (
        <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col h-full bg-transparent"
        >
            <div className="glass-panel border border-white/5 bg-white/[0.01] rounded-2xl flex flex-col flex-1 overflow-hidden">
                {/* Header */}
                <div className="border-b border-white/5 p-6 bg-slate-950/20">
                    <h1 className="text-3xl font-black text-white flex items-center gap-3 drop-shadow-[0_2px_8px_rgba(6,182,212,0.3)]">
                        <span>🤖</span>
                        <span>AI Executive Assistant</span>
                    </h1>

                    <p className="text-slate-400 mt-2 text-sm">
                        Your AI-powered Virtual COO for cosmic business insights.
                    </p>
                </div>

                {/* Chat Area */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-thin">
                    {messages.map((message, index) => (
                        <MessageBubble key={index} message={message} />
                    ))}

                    {typing && <TypingIndicator />}
                </div>

                {/* Chat Input */}
                <div className="p-4 bg-slate-950/20 border-t border-white/5">
                    <ChatInput onSend={handleSend} />
                </div>
            </div>
        </motion.div>
    );
}