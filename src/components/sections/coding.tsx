"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { dsaStats, githubStats, techStack } from "@/data/portfolio-data";
import SectionHeading from "@/components/ui/section-heading";
import GlassCard from "@/components/ui/glass-card";
import AnimatedCounter from "@/components/ui/animated-counter";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import {
  RiTrophyLine,
  RiFireLine,
  RiExternalLinkLine,
  RiTerminalBoxLine,
  RiGithubLine,
  RiGitCommitLine,
  RiStarLine,
  RiGitPullRequestLine,
  RiFileList3Line,
} from "react-icons/ri";

type TabId = "dsa" | "github" | "skills";

const TABS: { id: TabId; label: string }[] = [
  { id: "dsa", label: "DSA & Competitive Programming" },
  { id: "github", label: "GitHub" },
  { id: "skills", label: "Tech Stack" },
];

export default function CodingSection() {
  const [activeTab, setActiveTab] = useState<TabId>("dsa");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const getHeatmapColor = (level: number) => {
    switch (level) {
      case 0: return "bg-zinc-900";
      case 1: return "bg-emerald-950/40";
      case 2: return "bg-emerald-900/60";
      case 3: return "bg-emerald-700/80";
      case 4: return "bg-emerald-500";
      default: return "bg-zinc-900";
    }
  };

  return (
    <section id="coding" className="py-32 relative overflow-hidden">
      {/* Background radial accent */}
      <div className="absolute top-1/4 right-0 w-[350px] h-[350px] bg-amber-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="section-container">
        <SectionHeading
          title="Coding Profile"
          subtitle="Competitive programming stats, GitHub contributions, and technical toolkit."
        />

        {/* Tab Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="px-5 py-2.5 rounded-full border text-xs sm:text-sm font-medium transition-all duration-300"
              style={{
                background: activeTab === tab.id ? "var(--gradient-primary)" : "var(--bg-card)",
                borderColor: activeTab === tab.id ? "transparent" : "var(--border-primary)",
                color: activeTab === tab.id ? "white" : "var(--text-secondary)",
                boxShadow: activeTab === tab.id ? "0 0 20px var(--accent-glow)" : "none",
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* DSA Tab */}
        {activeTab === "dsa" && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              {/* Left: Solved Stats */}
              <div className="lg:col-span-5 flex flex-col gap-6">
                <GlassCard className="flex-1 flex flex-col justify-between" glow={true}>
                  <div>
                    <span className="text-xs font-mono uppercase tracking-[0.2em] text-indigo-400">Total Solved</span>
                    <div className="flex items-baseline gap-2 mt-2">
                      <AnimatedCounter target={dsaStats.totalSolved} className="text-5xl font-bold tracking-tight" />
                      <span className="text-sm font-mono text-zinc-500">/ 3000+</span>
                    </div>
                  </div>

                  {/* Progress Bars */}
                  <div className="space-y-4 mt-8">
                    {[
                      { label: "Easy", ...dsaStats.easy },
                      { label: "Medium", ...dsaStats.medium },
                      { label: "Hard", ...dsaStats.hard },
                    ].map((tier) => (
                      <div key={tier.label}>
                        <div className="flex justify-between text-xs font-semibold mb-1.5">
                          <span className="flex items-center gap-1.5" style={{ color: tier.color }}>
                            <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: tier.color }} />
                            {tier.label}
                          </span>
                          <span style={{ color: "var(--text-secondary)" }}>
                            {tier.solved} <span className="text-[10px] text-zinc-500">/ {tier.total}</span>
                          </span>
                        </div>
                        <div className="w-full bg-zinc-900 h-2 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${(tier.solved / tier.total) * 100}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="h-full rounded-full"
                            style={{ backgroundColor: tier.color }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </GlassCard>

                {/* Quick Metrics */}
                <div className="grid grid-cols-2 gap-4">
                  <GlassCard className="p-4 flex flex-col justify-between">
                    <div className="flex items-center gap-2 mb-2">
                      <RiTrophyLine className="text-amber-500" size={18} />
                      <span className="text-[10px] uppercase font-semibold tracking-wider" style={{ color: "var(--text-muted)" }}>Contest Rating</span>
                    </div>
                    <div className="flex items-baseline gap-1">
                      <AnimatedCounter target={dsaStats.contestRating} className="text-2xl font-bold font-mono" />
                      <span className="text-[10px] text-green-400 font-mono">Top 8%</span>
                    </div>
                  </GlassCard>

                  <GlassCard className="p-4 flex flex-col justify-between">
                    <div className="flex items-center gap-2 mb-2">
                      <RiFireLine className="text-orange-500" size={18} />
                      <span className="text-[10px] uppercase font-semibold tracking-wider" style={{ color: "var(--text-muted)" }}>Max Streak</span>
                    </div>
                    <div className="flex items-baseline gap-1">
                      <AnimatedCounter target={dsaStats.streakDays} className="text-2xl font-bold font-mono" suffix=" Days" />
                    </div>
                  </GlassCard>
                </div>
              </div>

              {/* Right: Chart + Profiles */}
              <div className="lg:col-span-7 flex flex-col gap-6">
                <GlassCard className="flex-1 flex flex-col">
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <h3 className="text-sm font-semibold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>Contest Progress</h3>
                      <span className="text-xl font-bold font-mono" style={{ color: "var(--text-primary)" }}>Rating History</span>
                    </div>
                    <div className="text-xs px-2.5 py-1 rounded-full glass border" style={{ borderColor: "var(--border-primary)", color: "var(--text-secondary)" }}>
                      Peak: {dsaStats.contestRating}
                    </div>
                  </div>

                  <div className="flex-1 min-h-[220px]">
                    {mounted && (
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={dsaStats.ratingHistory} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                          <XAxis dataKey="contest" stroke="#71717a" fontSize={10} tickLine={false} />
                          <YAxis stroke="#71717a" fontSize={10} domain={[1400, 1800]} tickLine={false} />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: "#09090b",
                              borderColor: "#27272a",
                              borderRadius: "8px",
                              fontSize: "12px",
                            }}
                          />
                          <Line
                            type="monotone"
                            dataKey="rating"
                            stroke="#6366f1"
                            strokeWidth={2.5}
                            dot={{ r: 4, stroke: "#6366f1", strokeWidth: 2, fill: "#09090b" }}
                            activeDot={{ r: 6 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    )}
                  </div>
                </GlassCard>

                {/* Coding Profiles */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {dsaStats.profiles.map((prof) => (
                    <a
                      key={prof.platform}
                      href={prof.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-4 rounded-xl glass border border-transparent hover:border-indigo-500/50 hover:bg-zinc-900/50 transition-all duration-300 group"
                      style={{ borderColor: "var(--border-primary)" }}
                    >
                      <div className="flex items-center gap-2">
                        <RiTerminalBoxLine className="text-indigo-400" size={18} />
                        <div>
                          <h4 className="text-xs font-semibold" style={{ color: "var(--text-primary)" }}>{prof.platform}</h4>
                          <span className="text-[10px]" style={{ color: "var(--text-muted)" }}>{prof.handle}</span>
                        </div>
                      </div>
                      <RiExternalLinkLine size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: "var(--text-muted)" }} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* GitHub Tab */}
        {activeTab === "github" && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-8"
          >
            {/* Top counters */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: "Total Contributions", val: githubStats.totalContributions, icon: <RiFileList3Line size={16} /> },
                { label: "Merged PRs", val: githubStats.totalPRs, icon: <RiGitPullRequestLine size={16} /> },
                { label: "Total Stars", val: githubStats.totalStars, icon: <RiStarLine size={16} /> },
                { label: "Repositories", val: githubStats.totalRepos, icon: <RiGitCommitLine size={16} /> },
              ].map((m, i) => (
                <GlassCard key={i} className="p-4 flex flex-col justify-between h-[100px]" glow={true}>
                  <div className="flex justify-between items-center text-zinc-500">
                    <span className="text-[10px] uppercase font-bold tracking-wider">{m.label}</span>
                    {m.icon}
                  </div>
                  <AnimatedCounter target={m.val} className="text-2xl font-bold font-mono text-indigo-400 mt-2" />
                </GlassCard>
              ))}
            </div>

            {/* Top Repos */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {githubStats.topRepos.map((repo) => (
                <GlassCard key={repo.name} className="p-5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <RiGithubLine size={16} className="text-indigo-400" />
                      <h4 className="text-sm font-bold text-zinc-200">{repo.name}</h4>
                    </div>
                    <p className="text-xs text-zinc-400 leading-relaxed">{repo.description}</p>
                  </div>
                  <div className="flex items-center gap-4 mt-4 pt-3 border-t border-zinc-900 text-[10px] font-mono text-zinc-500">
                    <span className="flex items-center gap-1"><RiStarLine size={12} /> {repo.stars}</span>
                    <span>{repo.language}</span>
                    <span>{repo.forks} forks</span>
                  </div>
                </GlassCard>
              ))}
            </div>

            {/* Heatmap */}
            <GlassCard className="p-6">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                  <RiFileList3Line size={18} className="text-zinc-400" />
                  <span className="text-xs font-semibold font-mono text-zinc-300">Contribution Grid</span>
                </div>
                <span className="text-xs font-semibold text-zinc-500">{githubStats.totalContributions} last year</span>
              </div>

              <div className="overflow-x-auto pb-2 scrollbar-thin">
                <div className="flex gap-[3px] min-w-[620px]">
                  {githubStats.contributionData.map((week, wIdx) => (
                    <div key={wIdx} className="flex flex-col gap-[3px]">
                      {week.map((dayVal, dIdx) => (
                        <div
                          key={dIdx}
                          className={`h-2.5 w-2.5 rounded-sm transition-all hover:scale-125 ${getHeatmapColor(dayVal)}`}
                        />
                      ))}
                    </div>
                  ))}
                </div>
                <div className="flex justify-end gap-1.5 mt-4 text-[9px] text-zinc-500 items-center">
                  <span>Less</span>
                  <span className="h-2 w-2 rounded-sm bg-zinc-900" />
                  <span className="h-2 w-2 rounded-sm bg-emerald-950/40" />
                  <span className="h-2 w-2 rounded-sm bg-emerald-900/60" />
                  <span className="h-2 w-2 rounded-sm bg-emerald-700/80" />
                  <span className="h-2 w-2 rounded-sm bg-emerald-500" />
                  <span>More</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-zinc-900 flex justify-center">
                <a
                  href={`https://github.com/${githubStats.username}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl glass border hover:bg-zinc-800/40 text-xs font-semibold text-zinc-400 hover:text-zinc-300 transition-all"
                  style={{ borderColor: "var(--border-primary)" }}
                >
                  <RiGithubLine size={16} /> View Full GitHub Profile
                </a>
              </div>
            </GlassCard>
          </motion.div>
        )}

        {/* Skills Tab */}
        {activeTab === "skills" && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5">
              {techStack.map((tech, idx) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.04, duration: 0.4 }}
                >
                  <GlassCard className="flex flex-col items-center justify-center text-center p-5 h-[140px] relative overflow-hidden group">
                    {/* Skill color bar */}
                    <div
                      className="absolute inset-x-0 bottom-0 h-1"
                      style={{ background: tech.color, opacity: 0.4 }}
                    />

                    {/* Icon */}
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center mb-3 transition-all duration-300 group-hover:scale-110"
                      style={{
                        background: `${tech.color}15`,
                        border: `1px solid ${tech.color}40`,
                        color: tech.color,
                      }}
                    >
                      <span className="text-lg font-bold font-mono">
                        {tech.name.substring(0, 2)}
                      </span>
                    </div>

                    <h4 className="text-xs font-semibold tracking-wide" style={{ color: "var(--text-primary)" }}>
                      {tech.name}
                    </h4>
                    <span className="text-[10px] font-mono mt-1" style={{ color: tech.color }}>{tech.level}%</span>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
