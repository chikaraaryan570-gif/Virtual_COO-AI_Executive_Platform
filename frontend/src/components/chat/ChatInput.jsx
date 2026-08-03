import { useState, useRef, useEffect } from "react";
import { Send, Paperclip, Mic } from "lucide-react";
import toast from "react-hot-toast";

export default function ChatInput({ onSend }) {
    const [message, setMessage] = useState("");
    const [isListening, setIsListening] = useState(false);
    const fileInputRef = useRef(null);
    const recognitionRef = useRef(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            if (SpeechRecognition) {
                const recognition = new SpeechRecognition();
                recognition.continuous = false;
                recognition.interimResults = false;

                recognition.onstart = () => {
                    setIsListening(true);
                    toast("Listening...", { icon: '🎙️', duration: 2000, id: 'mic-toast' });
                };

                recognition.onresult = (event) => {
                    const transcript = event.results[0][0].transcript;
                    setMessage(prev => prev + (prev ? " " : "") + transcript);
                };

                recognition.onerror = (event) => {
                    console.error("Speech recognition error", event.error);
                    if (event.error !== 'aborted') {
                        toast.error("Microphone error. Please try again.", { id: 'mic-error' });
                    }
                    setIsListening(false);
                };

                recognition.onend = () => {
                    setIsListening(false);
                };

                recognitionRef.current = recognition;
            }
        }
    }, []);

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

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            toast.success(`Attached file: ${e.target.files[0].name}`);
            e.target.value = null;
        }
    };

    const handleMicClick = () => {
        if (!recognitionRef.current) {
            toast.error("Speech recognition is not supported in this browser.");
            return;
        }

        if (isListening) {
            recognitionRef.current.stop();
        } else {
            try {
                recognitionRef.current.start();
            } catch (e) {
                console.error(e);
            }
        }
    };

    return (
        <div className="border-t border-slate-800 bg-slate-950 p-5">
            <div className="flex items-end gap-3 bg-slate-900 border border-slate-700 rounded-2xl px-4 py-3">

                <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handleFileChange} 
                    className="hidden" 
                />
                
                <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="text-slate-400 hover:text-white transition"
                    title="Attach file"
                >
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

                <button 
                    onClick={handleMicClick}
                    className={`${isListening ? "text-red-500 animate-pulse" : "text-slate-400 hover:text-white"} transition`}
                    title="Voice input"
                >
                    <Mic size={20} />
                </button>

                <button
                    onClick={handleSend}
                    className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl p-2 transition"
                    title="Send message"
                >
                    <Send size={18} />
                </button>

            </div>
        </div>
    );
}