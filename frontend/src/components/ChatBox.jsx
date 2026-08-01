import { useState, useRef, useEffect } from 'react';
import { FiSend, FiCpu, FiUser } from 'react-icons/fi';
import { sendChatMessage } from '../services/api';

export default function ChatBox() {
  const [messages, setMessages] = useState([
    { role: 'ai', content: 'Hello! I am your AI Executive Supervisor. You can ask me about finance, HR, sales, product, or overall company operations. How can I assist you today?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    
    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setLoading(true);

    try {
      const res = await sendChatMessage(userMsg);
      setMessages(prev => [...prev, { role: 'ai', content: res.response }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'ai', content: 'Error: Could not connect to AI services.' }]);
    } finally {
      setLoading(false);
    }
  };

  const suggestions = [
    "What is our current profit?",
    "How is employee satisfaction?",
    "Generate a weekly summary report"
  ];

  return (
    <div className="flex flex-col h-full bg-white rounded-2xl shadow-sm border border-gray-100 glass overflow-hidden">
      <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center">
          <FiCpu className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-800">AI Assistant</h3>
          <p className="text-xs text-brand-600 font-medium">Multi-Agent System Active</p>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}>
            <div className={`flex gap-3 max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${msg.role === 'user' ? 'bg-blue-500 text-white' : 'bg-brand-500 text-white'}`}>
                {msg.role === 'user' ? <FiUser className="w-4 h-4" /> : <FiCpu className="w-4 h-4" />}
              </div>
              <div className={`p-3 rounded-2xl text-sm whitespace-pre-wrap ${msg.role === 'user' ? 'bg-blue-500 text-white rounded-tr-none' : 'bg-gray-100 text-gray-800 rounded-tl-none'}`}>
                {msg.content}
              </div>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start animate-fade-in">
            <div className="flex gap-3 max-w-[80%]">
              <div className="w-8 h-8 rounded-full flex-shrink-0 bg-brand-500 text-white flex items-center justify-center">
                <FiCpu className="w-4 h-4" />
              </div>
              <div className="p-3 rounded-2xl bg-gray-100 rounded-tl-none flex items-center gap-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t border-gray-100 bg-white">
        {messages.length < 3 && (
          <div className="flex gap-2 overflow-x-auto pb-3 mb-2 scrollbar-hide">
            {suggestions.map(sug => (
              <button 
                key={sug}
                onClick={() => setInput(sug)}
                className="whitespace-nowrap px-3 py-1.5 bg-gray-50 hover:bg-brand-50 hover:text-brand-700 text-gray-600 text-xs rounded-full transition-colors border border-gray-200"
              >
                {sug}
              </button>
            ))}
          </div>
        )}
        <div className="flex gap-2">
          <input 
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask your AI supervisor..."
            className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim() || loading}
            className="w-11 h-11 bg-brand-500 hover:bg-brand-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-xl flex items-center justify-center transition-colors shadow-sm"
          >
            <FiSend />
          </button>
        </div>
      </div>
    </div>
  );
}
