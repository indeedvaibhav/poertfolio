"use client";

import { motion } from "framer-motion";
import { leadershipData } from "@/data/portfolio-data";
import SectionHeading from "@/components/ui/section-heading";
import GlassCard from "@/components/ui/glass-card";
import {
  RiShieldStarLine,
  RiTeamLine,
  RiBasketballLine,
  RiMedalLine,
} from "react-icons/ri";

export default function LeadershipSection() {
  return (
    <section id="leadership" className="py-32 relative overflow-hidden">
      {/* Background radial accent */}
      <div className="absolute top-1/4 right-0 w-[350px] h-[350px] bg-amber-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="section-container">
        <SectionHeading
          title="Student Athlete & Leader"
          subtitle="Leadership positions, competitive sports, and the discipline that shapes how I build software."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-5xl mx-auto">
          {/* Left Column: Leadership Positions */}
          <div className="lg:col-span-7 space-y-6">
            {leadershipData.positions.map((pos, index) => (
              <motion.div
                key={pos.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <GlassCard className="p-6">
                  <div className="flex items-start gap-4">
                    <span className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex-shrink-0">
                      {index === 0 ? <RiShieldStarLine size={22} /> : <RiTeamLine size={22} />}
                    </span>
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-2">
                        <h3 className="text-lg font-bold" style={{ fontFamily: "var(--font-display)", color: "var(--text-primary)" }}>
                          {pos.title}
                        </h3>
                        <span className="text-[10px] font-mono text-zinc-500">{pos.duration}</span>
                      </div>
                      <span className="text-xs font-semibold text-indigo-400 block mb-3">{pos.organization}</span>
                      <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                        {pos.description}
                      </p>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}

            {/* Athletic Profile */}
            {leadershipData.athletics.map((ath, index) => (
              <motion.div
                key={ath.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <GlassCard className="p-6" glow={true}>
                  <div className="flex items-start gap-4">
                    <span className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex-shrink-0">
                      <RiBasketballLine size={22} />
                    </span>
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-2">
                        <h3 className="text-lg font-bold" style={{ fontFamily: "var(--font-display)", color: "var(--text-primary)" }}>
                          {ath.title}
                        </h3>
                        <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-semibold">
                          {ath.level}
                        </span>
                      </div>
                      <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                        {ath.description}
                      </p>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>

          {/* Right Column: Qualities & Mindset */}
          <div className="lg:col-span-5">
            <GlassCard className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <RiMedalLine size={20} className="text-amber-400" />
                <h3 className="text-lg font-bold" style={{ fontFamily: "var(--font-display)" }}>What Competition Taught Me</h3>
              </div>

              <p className="text-sm leading-relaxed mb-8" style={{ color: "var(--text-secondary)" }}>
                Leading teams and competing at state level taught me that great outcomes come from disciplined preparation, clear communication, and the ability to perform under pressure — the same qualities I bring to every engineering project.
              </p>

              {/* Qualities Grid */}
              <div className="grid grid-cols-2 gap-3">
                {leadershipData.qualities.map((quality, idx) => (
                  <motion.div
                    key={quality}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.06, duration: 0.3 }}
                    className="flex items-center gap-2.5 p-3 rounded-xl bg-zinc-950/40 border border-zinc-800 hover:border-amber-500/30 transition-colors"
                  >
                    <span className="h-2 w-2 rounded-full bg-amber-500/60 flex-shrink-0" />
                    <span className="text-xs font-semibold" style={{ color: "var(--text-primary)" }}>
                      {quality}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* Summary stat */}
              <div className="mt-8 pt-6 border-t border-zinc-900">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <span className="text-2xl font-bold font-mono text-amber-400">2000+</span>
                    <span className="text-[10px] text-zinc-500 block mt-1 uppercase tracking-wider">Students Led</span>
                  </div>
                  <div>
                    <span className="text-2xl font-bold font-mono text-indigo-400">State</span>
                    <span className="text-[10px] text-zinc-500 block mt-1 uppercase tracking-wider">Competition Level</span>
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  );
}
