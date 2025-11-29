import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage, ChatRole } from '../types';
import { sendMessageToCoach } from '../services/geminiService';

export const GrindCoach: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: '1', role: ChatRole.MODEL, text: "Hoot! I'm your Grind Coach. Need tips on maximizing your XP or gems? Ask away! (I promise I won't kidnap your family today)" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: ChatRole.USER,
      text: input
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    const response = await sendMessageToCoach(userMsg.text);

    const modelMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: ChatRole.MODEL,
      text: response
    };

    setMessages(prev => [...prev, modelMsg]);
    setLoading(false);
  };

  return (
    <div className="bg-gray-900 border-2 border-green-500 rounded-2xl h-[600px] flex flex-col shadow-2xl relative overflow-hidden">
      
      {/* Header */}
      <div className="bg-green-600 p-4 flex items-center gap-3 shadow-md z-10">
        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center border-2 border-green-800">
           <i className="fas fa-crow text-green-600 text-xl"></i>
        </div>
        <div>
          <h3 className="font-bold text-white text-lg">Grind Coach AI</h3>
          <p className="text-green-100 text-xs">Powered by Gemini 2.5</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex ${msg.role === ChatRole.USER ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-[80%] p-3 rounded-2xl ${
                msg.role === ChatRole.USER 
                  ? 'bg-blue-600 text-white rounded-br-none' 
                  : 'bg-gray-700 text-gray-100 rounded-bl-none border border-gray-600'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
             <div className="bg-gray-700 text-gray-300 p-3 rounded-2xl rounded-bl-none border border-gray-600 flex gap-2 items-center">
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-75"></span>
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></span>
             </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 bg-gray-800 border-t border-gray-700">
        <div className="flex gap-2">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask about optimized grinding strategies..."
            className="flex-1 bg-gray-900 text-white border border-gray-600 rounded-xl px-4 py-3 focus:outline-none focus:border-green-500"
          />
          <button 
            onClick={handleSend}
            disabled={loading}
            className="bg-green-500 hover:bg-green-400 text-green-900 font-bold px-6 py-3 rounded-xl feather-button feather-button-green disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <i className="fas fa-paper-plane"></i>
          </button>
        </div>
      </div>
    </div>
  );
};