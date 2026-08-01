import { useState } from "react";
import { Send, Paperclip, Mic } from "lucide-react";

export default function ChatInput({ onSend }) {
    const [message, setMessage] = useState("");

    const handleSend = () => {
        if (!message.trim()) return;

        onSend(message);
        setMessage("");
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="border-t border-slate-800 bg-slate-950 p-5">
            <div className="flex items-end gap-3 bg-slate-900 border border-slate-700 rounded-2xl px-4 py-3">

                <button className="text-slate-400 hover:text-white transition">
                    <Paperclip size={20} />
                </button>

                <textarea
                    rows={1}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask your AI Executive anything..."
                    className="flex-1 bg-transparent resize-none outline-none text-white placeholder:text-slate-500"
                />

                <button className="text-slate-400 hover:text-white transition">
                    <Mic size={20} />
                </button>

                <button
                    onClick={handleSend}
                    className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl p-2 transition"
                >
                    <Send size={18} />
                </button>

            </div>
        </div>
    );
}