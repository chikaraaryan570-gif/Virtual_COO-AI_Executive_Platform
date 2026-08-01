import { motion } from "framer-motion";

export default function TypingIndicator() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start mb-4"
        >
            <div className="bg-slate-800 rounded-2xl rounded-bl-sm px-5 py-4 shadow-lg">
                <div className="flex gap-2">
                    <motion.div
                        className="w-2 h-2 rounded-full bg-slate-300"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ repeat: Infinity, duration: 0.6 }}
                    />
                    <motion.div
                        className="w-2 h-2 rounded-full bg-slate-300"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ repeat: Infinity, duration: 0.6, delay: 0.15 }}
                    />
                    <motion.div
                        className="w-2 h-2 rounded-full bg-slate-300"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ repeat: Infinity, duration: 0.6, delay: 0.3 }}
                    />
                </div>
            </div>
        </motion.div>
    );
}