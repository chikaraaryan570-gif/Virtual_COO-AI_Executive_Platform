import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";

export default function MessageBubble({ message }) {
    const isUser = message.role === "user";

    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}
        >
            <div
                className={`max-w-[75%] rounded-2xl px-5 py-4 shadow-lg
        ${isUser
                        ? "bg-blue-600 text-white rounded-br-sm"
                        : "bg-slate-800 text-slate-100 rounded-bl-sm"
                    }`}
            >
                <ReactMarkdown>{message.content}</ReactMarkdown>

                <div
                    className={`mt-2 text-xs ${isUser ? "text-blue-100" : "text-slate-400"
                        }`}
                >
                    {message.time}
                </div>
            </div>
        </motion.div>
    );
}