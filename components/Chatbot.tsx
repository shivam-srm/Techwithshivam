"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, Sparkles, User, Rocket } from 'lucide-react';

interface Message {
    id: number;
    text: string;
    sender: 'bot' | 'user';
}

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputValue, setInputValue] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    // Initial Greeting
    useEffect(() => {
        if (isOpen && messages.length === 0) {
            const hour = new Date().getHours();
            let greeting = "Hello there!";
            if (hour < 12) greeting = "Good morning!";
            else if (hour < 18) greeting = "Good afternoon!";
            else greeting = "Good evening!";

            setIsTyping(true);
            setTimeout(() => {
                setMessages([{
                    id: 1,
                    text: `${greeting} I'm Odin Co-pilot. Ready for blast off? 🚀`,
                    sender: 'bot'
                }]);
                setIsTyping(false);
            }, 1000);
        }
    }, [isOpen]);

    const handleSendMessage = (text: string = inputValue) => {
        if (!text.trim()) return;

        // User Message
        const tempUserMsg: Message = { id: Date.now(), text: text, sender: 'user' };
        setMessages(prev => [...prev, tempUserMsg]);
        setInputValue("");
        setIsTyping(true);

        // Simulated Bot Response
        setTimeout(() => {
            const botResponse = getBotResponse(text);
            const tempBotMsg: Message = { id: Date.now() + 1, text: botResponse, sender: 'bot' };
            setMessages(prev => [...prev, tempBotMsg]);
            setIsTyping(false);
        }, 1500); // Longer delay for "thinking" feel
    };

    const getBotResponse = (input: string): string => {
        const lowerInput = input.toLowerCase();

        // Greetings
        if (lowerInput.includes("hello") || lowerInput.includes("hi") || lowerInput.includes("hey"))
            return "Greetings, space traveler! 🌌 Ready to explore?";

        // About / Identity
        if (lowerInput.includes("who are you") || lowerInput.includes("what are you"))
            return "I am Odin, a virtual co-pilot assigned to guide you through Shivam's portfolio. 🛡️";
        if (lowerInput.includes("who is shivam") || lowerInput.includes("about shivam"))
            return "Shivam is a visionary developer who blends code with creativity. He specializes in building immersive 3D web experiences using Next.js and WebGL.";

        // Skills & Tech
        if (lowerInput.includes("skills") || lowerInput.includes("stack") || lowerInput.includes("technologies"))
            return "Shivam's tech arsenal is vast! 🛠️ Core: React, Next.js, TypeScript. \nStyling: Tailwind CSS, Framer Motion. \n3D: Three.js, React Three Fiber. \nBackend: Node.js, Vercel.";
        if (lowerInput.includes("react") || lowerInput.includes("next"))
            return "React and Next.js are his bread and butter! He uses them to build lightning-fast, SEO-friendly apps (like this one).";
        if (lowerInput.includes("three") || lowerInput.includes("3d"))
            return "He loves the third dimension! Using Three.js and R3F to bring websites to life is his specialty.";

        // Experience & Availability
        if (lowerInput.includes("experience") || lowerInput.includes("history"))
            return "He has built numerous premium websites, ranging from e-commerce platforms to interactive portfolios. Check the 'Work' section for concrete examples! 🏆";
        if (lowerInput.includes("hire") || lowerInput.includes("available") || lowerInput.includes("freelance"))
            return "Yes! Shivam is currently open to new opportunities and freelance missions. 🚀 Contact him to discuss your project.";

        // Contact & Socials
        if (lowerInput.includes("contact") || lowerInput.includes("email") || lowerInput.includes("reach"))
            return "Transmitting coordinates... 📡 \n📧 Email: shivamrai83170@gmail.com \n📸 Instagram: @shivam.raiii \n💼 LinkedIn: Shivam Rai \n💻 GitHub: shivam-srm \n\nOr use the contact form at the bottom!";

        if (lowerInput.includes("github") || lowerInput.includes("linkedin") || lowerInput.includes("instagram") || lowerInput.includes("social"))
            return "You can find him across the galaxy: \n📸 Instagram: instagram.com/shivam.raiii \n💼 LinkedIn: linkedin.com/in/shivam-rai-a32b69252 \n💻 GitHub: github.com/shivam-srm";

        // Navigation
        if (lowerInput.includes("project") || lowerInput.includes("work") || lowerInput.includes("portfolio"))
            return "Engaging warp drive to 'Work' section! 🛸 (Scroll down to see the magic).";

        // Interactive Fun Mode 
        if (lowerInput.includes("joke")) {
            const jokes = [
                "Why do Java developers wear glasses? Because they don't C#! 🤓",
                "Why did the developer go broke? Because he used up all his cache! 💸",
                "Why did the functions stop calling each other? Because they had constant arguments. 😡",
                "What is a programmer's favorite hangout place? Foo Bar. 🍻",
                "Why do programmers prefer dark mode? Because light attracts bugs! 🐛",
                "A SQL query walks into a bar, walks up to two tables and asks... 'Can I join you?' 😆"
            ];
            return jokes[Math.floor(Math.random() * jokes.length)];
        }

        if (lowerInput.includes("magic"))
            return "✨ abracadabra! ✨ \n(Did you know? This entire website is rendered in real-time. That's the real magic!)";

        if (lowerInput.includes("quote") || lowerInput.includes("inspire")) {
            const quotes = [
                "\"The only way to do great work is to love what you do.\" - Steve Jobs",
                "\"Code is like humor. When you have to explain it, it’s bad.\" - Cory House",
                "\"First, solve the problem. Then, write the code.\" - John Johnson",
                "\"Simplicity is the soul of efficiency.\" - Austin Freeman"
            ];
            return quotes[Math.floor(Math.random() * quotes.length)];
        }

        if (lowerInput.includes("meaning of life"))
            return "42. And clean code. 🌱";

        // Fallback
        return "I'm still calibrating my sensors on that topic. 🤖 Try asking about 'Skills', 'Projects', 'Contact', or say 'Tell me a joke'!";
    };

    const suggestedQuestions = ["Skills?", "Hire Shivam?", "Tell me a joke", "Contact info"];

    return (
        <div className="fixed bottom-5 right-5 z-[5000] font-outfit">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5, y: 100, x: 100 }}
                        animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
                        exit={{ opacity: 0, scale: 0.5, y: 100, x: 100 }}
                        transition={{ type: "spring", damping: 20, stiffness: 100 }}
                        className="mb-4 w-[350px] h-[500px] bg-black/80 backdrop-blur-xl border border-purple-500/30 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
                    >
                        {/* Header */}
                        <div className="p-4 bg-gradient-to-r from-purple-900 via-indigo-900 to-black flex items-center justify-between border-b border-white/10">
                            <div className="flex items-center gap-2">
                                <div className="p-2 bg-purple-500/20 rounded-full border border-purple-500/50">
                                    <Bot size={20} className="text-purple-300" />
                                </div>
                                <div>
                                    <h3 className="text-white font-bold text-sm tracking-wide">Odin Co-pilot</h3>
                                    <div className="flex items-center gap-1">
                                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                                        <p className="text-[10px] text-purple-200 uppercase tracking-wider">Online</p>
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-1 hover:bg-white/10 rounded-full transition-colors text-white/70 hover:text-white"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-purple-900/50 scrollbar-track-transparent">
                            {messages.map((msg) => (
                                <motion.div
                                    initial={{ opacity: 0, x: msg.sender === 'user' ? 20 : -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    key={msg.id}
                                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`max-w-[85%] p-3 rounded-2xl text-sm shadow-md ${msg.sender === 'user'
                                            ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-br-none'
                                            : 'bg-white/5 text-gray-200 rounded-bl-none border border-white/10 backdrop-blur-md'
                                            }`}
                                    >
                                        {msg.text}
                                    </div>
                                </motion.div>
                            ))}

                            {/* Typing Indicator */}
                            {isTyping && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="flex justify-start"
                                >
                                    <div className="bg-white/5 p-3 rounded-2xl rounded-bl-none border border-white/10 flex gap-1 items-center">
                                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
                                    </div>
                                </motion.div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Suggested Chips */}
                        <div className="px-4 py-2 flex gap-2 overflow-x-auto scrollbar-none pb-3">
                            {suggestedQuestions.map((q, i) => (
                                <button
                                    key={i}
                                    onClick={() => handleSendMessage(q)}
                                    className="whitespace-nowrap px-3 py-1.5 bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 hover:border-purple-500/50 rounded-lg text-xs text-purple-200 transition-all duration-300"
                                >
                                    {q}
                                </button>
                            ))}
                        </div>

                        {/* Input Area */}
                        <div className="p-4 border-t border-white/10 flex gap-2 bg-black/20">
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                                placeholder="Type a message..."
                                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white placeholder-white/30 focus:outline-none focus:border-purple-500/50 transition-colors"
                            />
                            <button
                                onClick={() => handleSendMessage()}
                                disabled={!inputValue.trim()}
                                className="p-2 bg-purple-600 hover:bg-purple-500 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl text-white transition-colors shadow-lg shadow-purple-600/20"
                            >
                                <Send size={18} />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Toggle Button */}
            <motion.button
                whileHover={{ scale: 1.1, rotate: isOpen ? 90 : 15 }} // Slight tilt on hover, spin on open
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(!isOpen)}
                className={`ml-auto w-16 h-16 rounded-full flex items-center justify-center shadow-2xl border border-white/20 relative group transition-all duration-500 ${isOpen
                    ? 'bg-red-500/80 rotate-90'
                    : 'bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600'
                    }`}
            >
                {/* Glow Effect */}
                {!isOpen && (
                    <div className="absolute inset-0 rounded-full bg-purple-500 blur-md opacity-50 animate-pulse"></div>
                )}

                <div className="relative z-10 text-white">
                    {isOpen ? (
                        <X size={28} />
                    ) : (
                        <div className="group-hover:-translate-y-1 transition-transform duration-300">
                            <Rocket size={28} className={isOpen ? "" : "fill-white/20"} />
                            {/* Rocket thrust particles (simple CSS) */}
                            <div className="absolute left-1/2 -translate-x-1/2 top-full mt-1 w-1 h-3 bg-orange-500 blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        </div>
                    )}
                </div>
            </motion.button>
        </div>
    );
};

export default Chatbot;
