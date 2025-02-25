import React, { useState } from 'react';
import { X, MessageCircle, Send, Loader2 } from 'lucide-react';

const Chatbot = ({mode}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (inputMessage.trim()) {
      setMessages([
        ...messages,
        { text: inputMessage, sender: 'user', timestamp: new Date() }
      ]);
      setInputMessage('');
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        setMessages(prev => [
          ...prev,
          { 
            text: "Thanks for your message! This is a demo response.", 
            sender: 'bot',
            timestamp: new Date()
          }
        ]);
      }, 1500);
    }
  };

  return (
    <>

      <button
        onClick={toggleChat}
        className={`fixed right-8 bottom-6 p-4 bg-black text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 z-10 ${
          isOpen ? 'hidden' : ''
        }`}
      >
        <MessageCircle className="w-6 h-6" />
      </button>


      <div
        className={`fixed right-0 top-0 h-full w-2/5 bg-white/10 backdrop-blur-lg shadow-2xl transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="h-full bg-gradient-to-b from-gray-900/95 to-gray-900/90 text-white">
          <div className="bg-gradient-to-r from-violet-600 to-indigo-600 p-4 flex justify-between items-center">
            <div>
              <h2 className="text-lg font-semibold"></h2>
              <p className="text-xs text-gray-200">We typically reply in a few minutes</p>
            </div>
            <button
              onClick={toggleChat}
              className="text-white hover:text-gray-200 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="h-[calc(100%-8rem)] overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`mb-4 ${
                  message.sender === 'user' ? 'text-right' : 'text-left'
                }`}
              >
                <div
                  className={`inline-block p-3 rounded-2xl max-w-[80%] ${
                    message.sender === 'user'
                      ? 'bg-gradient-to-r from-violet-600 to-indigo-600'
                      : 'bg-gray-700/50 backdrop-blur-sm'
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <p className="text-xs mt-1 opacity-70">
                    {message.timestamp.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex items-center gap-2 text-gray-400 ml-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="text-sm">Typing...</span>
              </div>
            )}
          </div>


          <form 
            onSubmit={handleSendMessage}
            className="absolute bottom-0 left-0 right-0 p-4 bg-gray-900/50 backdrop-blur-lg border-t border-gray-700"
          >
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 p-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all"
              />
              <button
                type="submit"
                className="p-3 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-xl hover:shadow-lg hover:opacity-90 transition-all"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </form>
        </div>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          onClick={toggleChat}
        />
      )}
    </>
  );
};

export default Chatbot;