import React, { useEffect, useRef, useState } from 'react';
import { ArrowLeft, Moon, Sun, MessageCircle, Send } from 'lucide-react';
import MessageBubble from './MessageBubble';
import { callPersonaAI } from '../api';

export default function ChatWindow({ personaKey, persona = {}, onBack, darkMode, setDarkMode }) {
  console.log(persona);
  
  const [messages, setMessages] = useState(() => [{
    sender: 'ai',
    text: persona?.welcomeMsg || 'Namaste! Aaj main kaise help kar sakta hoon?',
    persona: personaKey,
    timestamp: new Date(),
  }]);
  
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const endRef = useRef(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMsg = { sender: 'user', text: input.trim(), timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);

    const query = input.trim();
    setInput('');
    setIsTyping(true);

    try {
      const res = await callPersonaAI(query, personaKey);
      setMessages(prev => [
        ...prev,
        { sender: 'ai', text: res || 'Koi response nahi mila.', persona: personaKey, timestamp: new Date() }
      ]);
    } catch (e) {
      console.error('AI Error:', e);
      setMessages(prev => [
        ...prev,
        { sender: 'ai', text: '⚠️ Technical error. Thodi der baad try karo!', persona: personaKey, timestamp: new Date() }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} flex flex-col transition-all duration-500`}>
      
      {/* Header */}
      <div className={`bg-gradient-to-r ${persona?.gradient || 'from-gray-500 to-gray-700'} shadow-2xl relative overflow-hidden`}>
        <div className="absolute inset-0 bg-black opacity-10" />
        <div className="max-w-6xl mx-auto px-6 py-8 relative z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <button onClick={onBack} className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-all duration-200 group">
                <ArrowLeft className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
              </button>
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center animate-pulse">
                {persona?.image && (
                  <img 
                    src={persona.image} 
                    alt={persona.name || 'AI Assistant'} 
                    className="w-12 h-12 rounded-full object-cover"
                  />
                )}
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">{persona?.name || 'AI Assistant'}</h1>
                <p className="text-white text-opacity-90 text-lg">{persona?.subtitle || 'Yahaan help ke liye!'}</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button onClick={() => setDarkMode(!darkMode)} className="p-3 bg-white bg-opacity-20 text-white rounded-xl hover:bg-opacity-30 transition-all duration-200">
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <div className="flex items-center space-x-2 bg-white bg-opacity-20 px-4 py-2 rounded-xl">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                <span className="text-white text-sm font-medium">Online</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Body */}
      <div className="flex-1 max-w-6xl mx-auto w-full p-6 flex flex-col">
        <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-2xl shadow-xl border mb-6 overflow-hidden transition-all duration-500`}>
          <div className="h-[500px] overflow-y-auto p-6 space-y-6 scrollbar-thin">
            {messages.map((m, i) => (
              <MessageBubble key={i} message={m} persona={persona} darkMode={darkMode} />
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="mr-12">
                  <div className={`bg-gradient-to-r ${persona?.gradient || 'from-gray-500 to-gray-700'} text-white px-6 py-4 rounded-3xl shadow-lg max-w-xs`}>
                    <div className="flex items-center space-x-2 mb-2">
                      {persona?.image && (
                        <img 
                          src={persona.image} 
                          alt={persona.name || 'AI'} 
                          className="w-4 h-4 rounded-full object-cover"
                        />
                      )}
                      <span className="text-sm opacity-90">{persona?.name || 'AI'} typing...</span>
                    </div>
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 bg-white rounded-full animate-bounce" />
                      <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                      <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={endRef} />
          </div>
        </div>

        {/* Input Box */}
        <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-2xl shadow-xl border p-6 transition-all duration-500`}>
          <div className="flex items-end space-x-4">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-3">
                <MessageCircle className={`w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'} font-medium`}>
                  React, Tailwind ya animations ke baare mein poocho...
                </span>
              </div>
              <textarea
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder="Apna sawal yahaan likho..."
                className={`${darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-gray-50 border-gray-300 text-gray-800 placeholder-gray-500'} w-full p-4 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none`}
                rows="3"
                disabled={isTyping}
              />
            </div>
            <button
              onClick={handleSend}
              disabled={!input.trim() || isTyping}
              className={`p-4 bg-gradient-to-r ${persona?.gradient || 'from-gray-500 to-gray-700'} text-white rounded-xl hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center group`}
            >
              <Send className="w-6 h-6 group-hover:scale-110 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}