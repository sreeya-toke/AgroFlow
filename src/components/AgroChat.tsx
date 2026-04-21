import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MessageSquare, 
  Send, 
  Loader2, 
  User, 
  Bot, 
  Sprout, 
  Trash2,
  AlertCircle,
  HelpCircle
} from 'lucide-react';
import { chatWithAgroAI } from '../services/gemini';
import { TranslationStrings } from '../types';

interface Message {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

interface AgroChatProps {
  t: TranslationStrings;
}

export const AgroChat: React.FC<AgroChatProps> = ({ t }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async (text: string = input) => {
    if (!text.trim() || isTyping) return;

    const userMessage: Message = {
      role: 'user',
      text: text.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);
    setError(null);

    try {
      const history = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));

      const aiResponse = await chatWithAgroAI(text, history);
      
      const modelMessage: Message = {
        role: 'model',
        text: aiResponse || 'I apologize, something went wrong in my knowledge base.',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, modelMessage]);
    } catch (err: any) {
      setError('AI Connection Interrupted. Please check your data or try again.');
      console.error(err);
    } finally {
      setIsTyping(false);
    }
  };

  const clearChat = () => {
    setMessages([]);
    setError(null);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)] max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-card backdrop-blur-xl p-6 rounded-t-[3rem] border border-edge shadow-xl flex justify-between items-center relative overflow-hidden">
        <div className="flex items-center gap-4 relative z-10">
          <div className="p-3 bg-primary/10 rounded-2xl text-primary animate-pulse">
            <Sprout className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-text-main tracking-tight uppercase italic flex items-center gap-2">
              {t.chatExpertHero}
              <span className="inline-block w-2 h-2 bg-emerald-500 rounded-full" />
            </h2>
            <p className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em]">{t.chatOnlineStatus}</p>
          </div>
        </div>
        
        <button 
          onClick={clearChat}
          className="p-3 hover:bg-red-500/10 rounded-2xl text-text-muted hover:text-red-500 transition-all active:scale-95"
          title={t.chatClearTooltip}
        >
          <Trash2 className="w-5 h-5" />
        </button>

        <div className="absolute -top-12 -right-12 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-white/30 dark:bg-black/20 backdrop-blur-md border-x border-edge">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-8">
            <div className="w-24 h-24 bg-card rounded-[2.5rem] flex items-center justify-center shadow-2xl border border-edge relative">
              <MessageSquare className="w-10 h-10 text-primary/40" />
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg">
                <HelpCircle className="w-5 h-5" />
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-xl font-black text-text-main uppercase tracking-tight italic">{t.chatWelcome}</h3>
              <p className="text-sm font-medium text-text-muted max-w-sm">
                {t.chatSubtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full max-w-2xl">
              {t.chatStarters.map((q, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(q)}
                  className="p-4 bg-card/50 hover:bg-card rounded-2xl border border-edge text-left text-xs font-bold text-text-main hover:border-primary/30 transition-all hover:shadow-lg active:scale-95"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <>
            {messages.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10, x: m.role === 'user' ? 20 : -20 }}
                animate={{ opacity: 1, y: 0, x: 0 }}
                className={`flex gap-4 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <div className={`w-10 h-10 rounded-2xl flex-shrink-0 flex items-center justify-center shadow-lg border-2 ${
                  m.role === 'user' ? 'bg-text-main text-white border-white/20' : 'bg-card text-primary border-edge'
                }`}>
                  {m.role === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
                </div>
                <div className={`max-w-[80%] p-5 rounded-[2rem] shadow-xl ${
                  m.role === 'user' 
                    ? 'bg-text-main text-white rounded-tr-none' 
                    : 'bg-card text-text-main rounded-tl-none border border-edge'
                }`}>
                  <p className="text-sm leading-relaxed whitespace-pre-wrap font-medium">
                    {m.text}
                  </p>
                  <p className={`text-[9px] font-black uppercase tracking-widest mt-2 opacity-40 ${
                    m.role === 'user' ? 'text-right' : 'text-left'
                  }`}>
                    {m.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </motion.div>
            ))}
            
            {isTyping && (
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-2xl bg-card border border-edge flex items-center justify-center animate-pulse">
                  <Bot className="w-5 h-5 text-primary" />
                </div>
                <div className="bg-card border border-edge p-5 rounded-[2rem] rounded-tl-none shadow-xl flex items-center gap-2">
                  <Loader2 className="w-4 h-4 text-primary animate-spin" />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-text-muted">{t.chatDrafting}</span>
                </div>
              </div>
            )}

            {error && (
              <div className="flex justify-center">
                <div className="bg-red-500/10 border border-red-500/20 px-4 py-2 rounded-full flex items-center gap-2 text-red-500 text-[10px] font-black uppercase tracking-widest">
                  <AlertCircle className="w-3 h-3" />
                  {error}
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Input */}
      <div className="bg-card backdrop-blur-xl p-6 rounded-b-[3rem] border border-edge shadow-xl relative z-10">
        <form 
          onSubmit={(e) => { e.preventDefault(); handleSend(); }}
          className="relative flex items-center gap-4"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isTyping}
            placeholder={t.chatPlaceholder}
            className="flex-1 bg-text-muted/5 border-2 border-edge rounded-[2rem] py-5 px-8 text-text-main placeholder:text-text-muted/40 font-bold focus:outline-none focus:border-primary/50 transition-all text-sm pr-20"
          />
          <button
            type="submit"
            disabled={!input.trim() || isTyping}
            className="h-14 w-14 bg-text-main text-white rounded-full flex items-center justify-center hover:bg-black transition-all active:scale-90 disabled:opacity-50 shadow-xl shadow-black/10 group overflow-hidden relative"
          >
            <AnimatePresence mode="wait">
              {isTyping ? (
                <motion.div
                  key="loading"
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                >
                  <Loader2 className="w-6 h-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="idle"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 20, opacity: 0 }}
                >
                  <Send className="w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </form>
        <p className="text-center mt-4 text-[9px] font-black text-text-muted uppercase tracking-[0.3em] opacity-50">
          Powered by Gemini AI • Farming Expert Protocol 3.1
        </p>
      </div>
    </div>
  );
};
