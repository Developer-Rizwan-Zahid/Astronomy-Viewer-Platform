"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Bot, User, Loader2, Sparkles } from "lucide-react";
import api from "@/lib/axios";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Load history from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("astro_chat_history");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setMessages(parsed.map((m: any) => ({ ...m, timestamp: new Date(m.timestamp) })));
      } catch (e) {
        console.error("Failed to parse chat history");
      }
    } else {
        // Initial welcome message
        setMessages([
            {
                id: "welcome",
                text: "Greetings, stargazer! I am your AI cosmic guide. How can I assist your exploration today?",
                sender: "bot",
                timestamp: new Date()
            }
        ]);
    }
  }, []);

  // Save history to localStorage
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem("astro_chat_history", JSON.stringify(messages));
    }
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  };

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await api.post("/AI/chat", { message: input });
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: res.data.response,
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'm having trouble connecting to the deep space network. Please try again later.",
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[200]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20, transformOrigin: "bottom right" }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="mb-4 w-[380px] md:w-[420px] h-[550px] bg-[#0B0F19]/90 backdrop-blur-2xl border border-white/10 rounded-[32px] shadow-2xl flex flex-col overflow-hidden relative"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/5 bg-gradient-to-r from-[#1E3A8A]/40 to-[#9333EA]/20 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-blue-500/20 flex items-center justify-center border border-blue-500/30">
                  <Bot className="h-6 w-6 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-white font-bold tracking-tight">AI Assistant</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse" />
                    <span className="text-[10px] text-zinc-400 font-medium uppercase tracking-widest">Deep Space Node: Online</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/10 rounded-xl transition-colors text-zinc-400 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Messages Area */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide"
            >
              {messages.map((msg) => (
                <div 
                  key={msg.id}
                  className={cn(
                    "flex items-end gap-3",
                    msg.sender === "user" ? "flex-row-reverse" : "flex-row"
                  )}
                >
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center shrink-0 border",
                    msg.sender === "user" ? "bg-blue-600 border-blue-400" : "bg-zinc-800 border-zinc-700"
                  )}>
                    {msg.sender === "user" ? <User className="h-4 w-4 text-white" /> : <Bot className="h-4 w-4 text-white" />}
                  </div>
                  <div className={cn(
                    "max-w-[75%] p-4 rounded-[22px]",
                    msg.sender === "user" 
                      ? "bg-blue-600/90 text-white rounded-br-none" 
                      : "bg-white/5 text-zinc-200 border border-white/5 rounded-bl-none"
                  )}>
                    <p className="text-sm leading-relaxed">{msg.text}</p>
                    <span className="text-[9px] opacity-40 mt-1.5 block">
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex items-end gap-3">
                  <div className="w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center">
                    <Bot className="h-4 w-4 text-white" />
                  </div>
                  <div className="bg-white/5 text-zinc-200 border border-white/5 p-4 rounded-[22px] rounded-bl-none flex gap-1">
                    <span className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce" />
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <form 
              onSubmit={handleSend}
              className="p-6 border-t border-white/5 bg-black/40 backdrop-blur-md"
            >
              <div className="relative group">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about galaxies, stars..."
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-blue-500/50 transition-all group-hover:border-white/20"
                />
                <button 
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="absolute right-2 top-2 h-10 w-10 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:hover:bg-blue-600 flex items-center justify-center transition-all text-white shadow-lg shadow-blue-900/40"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 rounded-full bg-gradient-to-br from-[#3B82F6] to-[#9333EA] flex items-center justify-center text-white shadow-[0_0_50px_rgba(59,130,246,0.5)] border border-white/20 relative group"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <X className="h-7 w-7" />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              className="relative"
            >
              <MessageSquare className="h-7 w-7" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#22C55E] rounded-full border-2 border-[#3B82F6]" />
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Subtle glow effect */}
        <div className="absolute inset-0 rounded-full bg-blue-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
      </motion.button>
    </div>
  );
}
