import React, { useState, useEffect, useRef } from 'react';
import { X, MessageCircle, Send, Loader2 } from 'lucide-react';

const Chatbot = ({ mode, groqApiKey }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [typingText, setTypingText] = useState('');
  const messagesEndRef = useRef(null);

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typingText]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const callGroqAPI = async (userMessage) => {
    try {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${groqApiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: [
            ...messages.map(msg => ({
              role: msg.sender === 'user' ? 'user' : 'assistant',
              content: msg.text
            })),
            { role: 'user', content: userMessage }
          ],
          temperature: 0.7,
          max_tokens: 1024
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || 'Failed to get response from Groq API');
      }

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error('Error calling Groq API:', error);
      return `Sorry, there was an error: ${error.message}`;
    }
  };

  // Simulate typing animation for the bot response
  const simulateTyping = async (text) => {
    setIsTyping(true);
    setTypingText('');
    
    // Split the text into smaller chunks to simulate natural typing
    const words = text.split(' ');
    let currentText = '';
    
    for (let i = 0; i < words.length; i++) {
      // Add the word to the current text
      currentText += (i > 0 ? ' ' : '') + words[i];
      setTypingText(currentText);
      
      // Random delay between words (faster for short words, slower for longer ones)
      const delay = Math.max(50, Math.min(150, words[i].length * 20));
      await new Promise(resolve => setTimeout(resolve, delay));
    }
    
    // Add a small delay at the end to make it feel more natural
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Add the completed message to the messages array
    setMessages(prevMessages => [
      ...prevMessages,
      { 
        text: text, 
        sender: 'bot',
        timestamp: new Date()
      }
    ]);
    
    // Clear the typing indicator
    setTypingText('');
    setIsTyping(false);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (inputMessage.trim()) {
      // Add user message to chat
      const userMsg = { text: inputMessage, sender: 'user', timestamp: new Date() };
      setMessages(prevMessages => [...prevMessages, userMsg]);
      setInputMessage('');
      setIsTyping(true);

      try {
        // Call Groq API
        const botResponse = await callGroqAPI(inputMessage);
        
        // Use the typing animation instead of immediately adding the message
        await simulateTyping(botResponse);
      } catch (error) {
        // Handle errors with typing animation too
        await simulateTyping("Sorry, I couldn't process your request. Please try again.");
      }
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
              <h2 className="text-lg font-semibold">Ancient.AI</h2>
              <p className="text-xs text-gray-200">Credit Groq </p>
            </div>
            <button
              onClick={toggleChat}
              className="text-white hover:text-gray-200 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="h-[calc(100%-8rem)] overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
            {messages.length === 0 && (
              <div className="text-center py-8 text-gray-400">
                <p>Start a conversation with Ancient.AI</p>
              </div>
            )}
            
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
            
            {typingText && (
              <div className="mb-4 text-left">
                <div className="inline-block p-3 rounded-2xl max-w-[80%] bg-gray-700/50 backdrop-blur-sm">
                  <p className="text-sm">{typingText}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <span className="w-1 h-1 bg-gray-400 rounded-full animate-pulse" style={{animationDelay: '0ms'}}></span>
                    <span className="w-1 h-1 bg-gray-400 rounded-full animate-pulse" style={{animationDelay: '300ms'}}></span>
                    <span className="w-1 h-1 bg-gray-400 rounded-full animate-pulse" style={{animationDelay: '600ms'}}></span>
                  </div>
                </div>
              </div>
            )}
            
            {isTyping && !typingText && (
              <div className="flex items-center gap-2 text-gray-400 ml-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="text-sm">Typing...</span>
              </div>
            )}
            
            <div ref={messagesEndRef} />
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
                disabled={isTyping}
              />
              <button
                type="submit"
                disabled={isTyping || !inputMessage.trim()}
                className={`p-3 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-xl transition-all ${
                  isTyping || !inputMessage.trim() ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg hover:opacity-90'
                }`}
              >
                {isTyping ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
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