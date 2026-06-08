"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RiRobotLine, RiCloseLine, RiSendPlane2Line, RiMessage3Line } from "react-icons/ri";
import { projects, techStack, dsaStats, aboutData } from "@/data/portfolio-data";

interface Message {
  sender: "user" | "bot";
  text: string;
}

const SUGGESTIONS = [
  { text: "Tell me about your projects", type: "projects" },
  { text: "What is your tech stack?", type: "skills" },
  { text: "What is your coding background?", type: "coding" },
  { text: "Do you play sports?", type: "sports" },
];

export default function AiWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { sender: "bot", text: "Hi! I'm Vaibhav's AI assistant. Ask me anything about his work, achievements, or coding toolkit!" },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = (text: string, type?: string) => {
    if (!text.trim()) return;

    setMessages((prev) => [...prev, { sender: "user", text }]);
    setInputValue("");
    setIsTyping(true);

    setTimeout(() => {
      let reply = "I'm not sure about that. Try asking about my projects, tech stack, or sports!";

      const query = type || text.toLowerCase();

      if (query.includes("project") || query === "projects") {
        reply = `Vaibhav has built several impressive projects. The top ones are:
1. **${projects[0].title}**: ${projects[0].summary} (Stack: ${projects[0].techStack.slice(0, 3).join(", ")})
2. **${projects[1].title}**: ${projects[1].summary} (Stack: ${projects[1].techStack.slice(0, 3).join(", ")})
3. **${projects[2].title}**: ${projects[2].summary} (Stack: ${projects[2].techStack.slice(0, 3).join(", ")})`;
      } else if (query.includes("stack") || query.includes("skill") || query === "skills") {
        const topSkills = techStack.slice(0, 4).map((s) => s.name).join(", ");
        reply = `Vaibhav's core technologies include: ${topSkills}, and more. His top skill is Java (${techStack.find(s => s.name === "Java")?.level}%) and React.js (${techStack.find(s => s.name === "React.js")?.level}%).`;
      } else if (query.includes("code") || query.includes("coding") || query.includes("leetcode") || query.includes("dsa") || query === "coding") {
        reply = `Vaibhav is highly active in DSA. He has solved **${dsaStats.totalSolved}+ problems** across LeetCode, Codeforces, and GeeksforGeeks, with a peak contest rating of **${dsaStats.contestRating}** (top 8% on LeetCode) and a max streak of **${dsaStats.streakDays} days**!`;
      } else if (query.includes("sport") || query.includes("basketball") || query === "sports") {
        reply = `Yes! Vaibhav is a state-level basketball athlete. He plays as a shooting guard/forward, and athletics has taught him self-discipline, teamwork, and high-performance execution.`;
      } else if (query.includes("about") || query.includes("bio") || query.includes("who are you")) {
        reply = aboutData.intro;
      }

      setMessages((prev) => [...prev, { sender: "bot", text: reply }]);
      setIsTyping(false);
    }, 800);
  };

  return (
    <>
      {/* Floating Toggle Icon */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white flex items-center justify-center cursor-pointer shadow-lg hover:shadow-indigo-500/20 transition-all border border-indigo-400/20"
        aria-label="Toggle AI assistant"
      >
        <RiMessage3Line size={20} />
        <span className="absolute top-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-zinc-950 animate-ping" />
      </motion.button>

      {/* Chat Box Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.94 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-22 right-6 z-50 w-[350px] sm:w-[380px] h-[500px] rounded-2xl glass border border-zinc-800 shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="px-4 py-3 bg-zinc-950/80 border-b border-zinc-900 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <RiRobotLine className="text-indigo-400" size={18} />
                <div>
                  <h4 className="text-xs font-bold text-zinc-100">Vaibhav's Assistant</h4>
                  <span className="text-[9px] text-green-400 font-semibold flex items-center gap-1">
                    <span className="h-1.5 w-1.5 bg-green-500 rounded-full animate-pulse" /> Online
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-lg text-zinc-400 hover:text-white transition-colors hover:bg-zinc-900"
              >
                <RiCloseLine size={18} />
              </button>
            </div>

            {/* Message History */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin bg-black/40">
              {messages.map((m, idx) => (
                <div
                  key={idx}
                  className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed ${
                      m.sender === "user"
                        ? "bg-indigo-600 text-white rounded-tr-none font-medium"
                        : "bg-zinc-900/90 text-zinc-300 rounded-tl-none border border-zinc-800"
                    }`}
                    style={{ whiteSpace: "pre-wrap" }}
                  >
                    {m.text}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-zinc-900/90 rounded-2xl rounded-tl-none border border-zinc-800 px-4 py-3 text-xs text-zinc-500 flex gap-1 items-center">
                    <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" />
                    <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggestions Chips */}
            {messages.length === 1 && (
              <div className="p-3 bg-zinc-950/20 border-t border-zinc-900 flex flex-wrap gap-1.5">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s.type}
                    onClick={() => handleSend(s.text, s.type)}
                    className="text-[10px] px-2.5 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-indigo-400 hover:border-indigo-500/30 transition-all text-left"
                  >
                    {s.text}
                  </button>
                ))}
              </div>
            )}

            {/* Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend(inputValue);
              }}
              className="p-3 bg-zinc-950/60 border-t border-zinc-900 flex gap-2"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask a question..."
                className="flex-1 bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-zinc-200 focus:outline-none focus:border-indigo-500/50"
              />
              <button
                type="submit"
                disabled={!inputValue.trim()}
                className="w-8 h-8 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:bg-zinc-800 disabled:text-zinc-600 text-white flex items-center justify-center cursor-pointer transition-colors"
              >
                <RiSendPlane2Line size={14} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
