import { useState } from "react";
import MessageBubble from "../components/chat/MessageBubble";
import TypingIndicator from "../components/chat/TypingIndicator";
import ChatInput from "../components/chat/ChatInput";
import { sendMessage } from "../services/ChatApi";

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
        <div className="flex flex-col h-full bg-slate-950">

            {/* Header */}
            <div className="border-b border-slate-800 p-6">
                <h1 className="text-3xl font-bold text-white">
                    🤖 AI Executive Assistant
                </h1>

                <p className="text-slate-400 mt-2">
                    Your AI-powered Virtual COO for business insights.
                </p>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-6">
                {messages.map((message, index) => (
                    <MessageBubble key={index} message={message} />
                ))}

                {typing && <TypingIndicator />}
            </div>

            {/* Chat Input */}
            <ChatInput onSend={handleSend} />
        </div>
    );
}