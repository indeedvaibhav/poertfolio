"use client";

import { useState, useRef, useEffect } from "react";
import GlassCard from "@/components/ui/glass-card";
import { techStack, projects, dsaStats, personalInfo } from "@/data/portfolio-data";

interface HistoryItem {
  command: string;
  output: string | React.ReactNode;
}

export default function DeveloperTerminal() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<HistoryItem[]>([
    { command: "system_init", output: "Developer shell ready. Type 'help' to see commands." },
  ]);
  const consoleEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    consoleEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleCommand = (cmdText: string) => {
    const trimmed = cmdText.trim().toLowerCase();
    if (!trimmed) return;

    let response: string | React.ReactNode = "";

    switch (trimmed) {
      case "help":
        response = `Available commands:
  help      - List commands
  skills    - Programming languages and tools
  projects  - Products built
  parking   - Flagship project details
  leetcode  - DSA stats
  resume    - Download resume
  contact   - Connection channels
  clear     - Reset terminal`;
        break;

      case "clear":
        setHistory([]);
        setInput("");
        return;

      case "skills":
        response = (
          <div className="space-y-1">
            <p>Core technologies:</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-1 pl-4 text-indigo-400">
              {techStack.map(t => (
                <p key={t.name}>• {t.name} ({t.level}%)</p>
              ))}
            </div>
          </div>
        );
        break;

      case "projects":
        response = (
          <div className="space-y-2">
            {projects.map(p => (
              <div key={p.id} className="border-l border-indigo-500 pl-3 py-0.5">
                <p className="font-bold text-zinc-300">{p.title} - {p.subtitle}</p>
                <p className="text-zinc-500 text-xs">{p.description}</p>
                <p className="text-indigo-400 text-[10px] mt-0.5">Stack: {p.techStack.join(", ")}</p>
              </div>
            ))}
          </div>
        );
        break;

      case "parking":
        response = `Product: Smart Parking Management System
Status: Active Live Simulation
Sensors: 24 active nodes
Stack: Spring Boot + React + MongoDB + WebSocket
View it in the Projects section above.`;
        break;

      case "github":
        response = `GitHub (indeedvaibhav):
  Contributions: 1,247
  Repositories: 32
  Pull Requests: 156
  Stars: 85`;
        break;

      case "leetcode":
        response = `LeetCode (Indeedvaibhav):
  Solved: ${dsaStats.totalSolved} problems
  Rating: ${dsaStats.contestRating} (top 8%)
  Streak: ${dsaStats.streakDays} days`;
        break;

      case "resume":
        response = (
          <div>
            <a href={personalInfo.resumeUrl} target="_blank" rel="noopener noreferrer" className="text-indigo-400 underline hover:text-indigo-300">
              Download Resume →
            </a>
          </div>
        );
        break;

      case "contact":
        response = `Email: ${personalInfo.email}
LinkedIn: ${personalInfo.linkedin}
GitHub: ${personalInfo.github}`;
        break;

      default:
        response = `Command '${trimmed}' not found. Type 'help' for options.`;
        break;
    }

    setHistory((prev) => [...prev, { command: cmdText, output: response }]);
    setInput("");
  };

  return (
    <section id="terminal" className="py-20 relative overflow-hidden">
      <div className="section-container">
        {/* Compact inline heading — not a SectionHeading, keeps it feeling optional */}
        <div className="text-center mb-8">
          <span className="text-xs font-mono uppercase tracking-[0.2em]" style={{ color: "var(--text-muted)" }}>
            Interactive Terminal
          </span>
        </div>

        <GlassCard className="max-w-3xl mx-auto p-0 border-zinc-800 shadow-2xl rounded-2xl overflow-hidden" tilt={false}>
          {/* Terminal Window Header Bar */}
          <div className="px-4 py-2.5 bg-zinc-950/80 border-b border-zinc-900 flex justify-between items-center">
            <div className="flex gap-1.5">
              <span className="h-3 w-3 rounded-full bg-red-500/20 border border-red-500/40" />
              <span className="h-3 w-3 rounded-full bg-yellow-500/20 border border-yellow-500/40" />
              <span className="h-3 w-3 rounded-full bg-green-500/20 border border-green-500/40" />
            </div>
            <span className="text-[10px] font-mono text-zinc-500">guest@vaibhav: ~</span>
            <div className="w-12" />
          </div>

          {/* Terminal body — reduced height */}
          <div className="p-5 bg-black/90 font-mono text-xs text-zinc-300 min-h-[200px] max-h-[300px] overflow-y-auto space-y-3 scrollbar-thin">
            {history.map((h, i) => (
              <div key={i} className="space-y-1">
                {h.command !== "system_init" && (
                  <div className="flex gap-2 text-zinc-500 font-bold">
                    <span>$</span>
                    <span>{h.command}</span>
                  </div>
                )}
                <div className="whitespace-pre-wrap leading-relaxed text-zinc-400 pl-4">
                  {h.output}
                </div>
              </div>
            ))}
            <div ref={consoleEndRef} />
          </div>

          {/* Terminal Input Line */}
          <div className="px-5 py-3 bg-zinc-950/60 border-t border-zinc-900 flex gap-2 items-center">
            <span className="font-mono text-indigo-400 font-bold">$</span>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleCommand(input)}
              placeholder="Type a command..."
              className="flex-1 bg-transparent font-mono text-xs text-zinc-100 focus:outline-none placeholder:text-zinc-700"
            />
          </div>
        </GlassCard>
      </div>
    </section>
  );
}
