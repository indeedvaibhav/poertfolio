"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RiSearchLine, RiKeyboardLine, RiTerminalLine } from "react-icons/ri";

const ACTIONS = [
  { id: "hero", title: "Go to Home / Intro", category: "Navigation", shortcut: "G H" },
  { id: "about", title: "Go to About Me", category: "Navigation", shortcut: "G A" },
  { id: "projects", title: "Go to Projects Section", category: "Navigation", shortcut: "G P" },
  { id: "coding", title: "Go to Coding Profile & DSA", category: "Navigation", shortcut: "G C" },
  { id: "leadership", title: "Go to Leadership & Sports", category: "Navigation", shortcut: "G L" },
  { id: "contact", title: "Go to Contact Channels", category: "Navigation", shortcut: "G M" },
  { id: "theme", title: "Toggle Theme (Light / Dark)", category: "Settings", shortcut: "T T" },
  { id: "resume", title: "Download Resume (PDF)", category: "Actions", shortcut: "D R" },
];

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setSearch("");
      setSelectedIndex(0);
      document.body.style.overflow = "hidden";
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const filtered = ACTIONS.filter((action) =>
    action.title.toLowerCase().includes(search.toLowerCase()) ||
    action.category.toLowerCase().includes(search.toLowerCase())
  );

  const triggerAction = (actionId: string) => {
    setIsOpen(false);
    if (actionId === "theme") {
      const current = document.documentElement.getAttribute("data-theme");
      const next = current === "light" ? "dark" : "light";
      document.documentElement.setAttribute("data-theme", next);
    } else if (actionId === "resume") {
      window.open("#", "_blank");
    } else {
      const el = document.getElementById(actionId);
      el?.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (scrollContainerRef.current) {
      const activeEl = scrollContainerRef.current.children[selectedIndex] as HTMLElement;
      if (activeEl) {
        activeEl.scrollIntoView({ block: "nearest" });
      }
    }
  }, [selectedIndex]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % filtered.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filtered.length) % filtered.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filtered[selectedIndex]) {
        triggerAction(filtered[selectedIndex].id);
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/70 backdrop-blur-md"
          />

          {/* Dialog Body */}
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -15, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-xl rounded-2xl glass border border-zinc-800 shadow-2xl overflow-hidden"
          >
            {/* Input Wrapper */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-zinc-800">
              <RiSearchLine className="text-zinc-500 flex-shrink-0" size={18} />
              <input
                ref={inputRef}
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setSelectedIndex(0);
                }}
                onKeyDown={handleKeyDown}
                placeholder="Search command palette..."
                className="w-full bg-transparent border-none outline-none font-sans text-sm text-zinc-100 placeholder:text-zinc-500"
              />
              <span className="text-[10px] font-mono border border-zinc-800 px-1.5 py-0.5 rounded text-zinc-500">
                ESC
              </span>
            </div>

            {/* List */}
            <div
              ref={scrollContainerRef}
              className="max-h-[300px] overflow-y-auto p-2 space-y-0.5 scrollbar-thin"
            >
              {filtered.map((action, idx) => {
                const isActive = idx === selectedIndex;
                return (
                  <button
                    key={action.id}
                    onClick={() => triggerAction(action.id)}
                    className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-left text-xs font-semibold font-sans transition-all duration-150 ${
                      isActive
                        ? "bg-zinc-800/60 text-white border-l-2 border-indigo-500 pl-2.5"
                        : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/40"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {action.category === "Navigation" ? (
                        <RiTerminalLine className={isActive ? "text-indigo-400" : "text-zinc-500"} size={16} />
                      ) : (
                        <RiKeyboardLine className={isActive ? "text-indigo-400" : "text-zinc-500"} size={16} />
                      )}
                      <div>
                        <span>{action.title}</span>
                        <span className="text-[9px] font-normal font-sans text-zinc-500 block">
                          {action.category}
                        </span>
                      </div>
                    </div>
                    <span className="text-[9px] font-mono bg-zinc-900 border border-zinc-800 px-2 py-0.5 rounded text-zinc-500">
                      {action.shortcut}
                    </span>
                  </button>
                );
              })}

              {filtered.length === 0 && (
                <div className="py-8 text-center text-xs font-mono text-zinc-500">
                  No actions found for "{search}"
                </div>
              )}
            </div>

            {/* Hint Footer */}
            <div className="px-4 py-2 bg-zinc-950/40 border-t border-zinc-900 flex justify-between items-center text-[10px] font-mono text-zinc-500">
              <span className="flex items-center gap-1">
                <span>↑↓</span> to navigate
              </span>
              <span className="flex items-center gap-1">
                <span>⏎</span> to select
              </span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
