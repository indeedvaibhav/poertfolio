"use client";

import { motion } from "framer-motion";
import { aboutData, experiences } from "@/data/portfolio-data";
import SectionHeading from "@/components/ui/section-heading";
import GlassCard from "@/components/ui/glass-card";
import { RiGraduationCapLine, RiLightbulbLine, RiBookOpenLine, RiBriefcaseLine, RiAwardLine } from "react-icons/ri";

const TIMELINE = [
  { year: "2022", title: "Began B.Tech CSE", desc: "Started Computer Science journey. Discovered coding algorithms and OOP." },
  { year: "2023", title: "Web Dev & Open Source", desc: "Built dynamic web interfaces. Started contributing to community repos." },
  { year: "2024", title: "Flagship Project", desc: "Built the Smart Parking System — a full-stack IoT SaaS platform with real-time telemetry." },
  { year: "2025", title: "Advanced Backend & IoT", desc: "Optimized enterprise-level APIs. Built IoT real-time monitoring streams." },
];

export default function AboutSection() {
  return (
    <section id="about" className="py-32 relative overflow-hidden">
      {/* Background radial accent */}
      <div className="absolute top-1/4 right-0 w-[300px] h-[300px] bg-purple-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="section-container">
        <SectionHeading title="About Me" subtitle="Background, education, experience, and the journey so far." />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Intro + Education + Interests */}
          <div className="lg:col-span-7 space-y-6">
            {/* Intro Card */}
            <GlassCard glow={true}>
              <div className="flex items-center gap-3 mb-4">
                <RiBookOpenLine size={22} className="text-indigo-400" />
                <h3 className="text-lg font-semibold" style={{ fontFamily: "var(--font-display)" }}>My Story</h3>
              </div>
              <p className="leading-relaxed text-sm" style={{ color: "var(--text-secondary)" }}>
                {aboutData.intro}
              </p>

              {/* Education inline */}
              <div className="mt-6 pt-5 border-t border-zinc-800">
                <div className="flex items-center gap-2 mb-3">
                  <RiGraduationCapLine size={18} className="text-indigo-400" />
                  <span className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Education</span>
                </div>
                <h4 className="text-sm font-semibold">{aboutData.education.degree}</h4>
                <p className="text-xs mt-1" style={{ color: "var(--text-secondary)" }}>{aboutData.education.university}</p>
                <div className="flex gap-6 mt-3 text-xs">
                  <span style={{ color: "var(--text-muted)" }}>Year: <span className="font-mono text-indigo-400">{aboutData.education.year}</span></span>
                  <span style={{ color: "var(--text-muted)" }}>Graduation: <span className="font-mono text-indigo-400">{aboutData.education.expectedGraduation}</span></span>
                </div>
              </div>
            </GlassCard>

            {/* Interests */}
            <GlassCard>
              <div className="flex items-center gap-3 mb-4">
                <RiLightbulbLine size={22} className="text-indigo-400" />
                <h3 className="text-lg font-semibold" style={{ fontFamily: "var(--font-display)" }}>Interests</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {aboutData.interests.map((interest, i) => (
                  <span
                    key={i}
                    className="text-xs px-2.5 py-1.5 rounded-lg border bg-zinc-950/40 border-zinc-800 hover:border-indigo-500/40 transition-colors"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </GlassCard>

            {/* Experience — merged from ExperienceTimeline */}
            {experiences.length > 0 && (
              <GlassCard>
                <div className="flex items-center gap-3 mb-5">
                  <RiBriefcaseLine size={22} className="text-indigo-400" />
                  <h3 className="text-lg font-semibold" style={{ fontFamily: "var(--font-display)" }}>Experience</h3>
                </div>
                <div className="space-y-5">
                  {experiences.map((exp) => (
                    <div key={exp.id} className="relative pl-5 border-l-2 border-zinc-800">
                      <div className="absolute -left-[7px] top-1 h-3 w-3 rounded-full border-2 border-indigo-500 bg-zinc-950" />
                      <span className="text-[10px] font-mono text-indigo-400 font-semibold">{exp.duration}</span>
                      <h4 className="text-sm font-bold mt-0.5" style={{ color: "var(--text-primary)" }}>{exp.title}</h4>
                      <span className="text-xs text-zinc-400 font-semibold">{exp.organization}</span>
                      <p className="text-xs mt-2 leading-relaxed" style={{ color: "var(--text-secondary)" }}>{exp.description}</p>
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {exp.skills.map((s) => (
                          <span key={s} className="text-[9px] px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-500 font-mono">{s}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </GlassCard>
            )}
          </div>

          {/* Right Column: Timeline (merged from Journey) */}
          <div className="lg:col-span-5">
            <GlassCard className="relative overflow-hidden">
              <h3 className="text-lg font-semibold mb-8" style={{ fontFamily: "var(--font-display)" }}>Milestones</h3>

              <div className="relative pl-6 space-y-8 border-l-2 border-zinc-800">
                {TIMELINE.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className="relative"
                  >
                    {/* Circle Dot */}
                    <div className="absolute -left-[31px] top-1 h-4 w-4 rounded-full border-2 border-indigo-500 bg-zinc-950 flex items-center justify-center">
                      <div className="h-1.5 w-1.5 rounded-full bg-indigo-500 animate-ping" />
                    </div>

                    <span className="text-xs font-mono text-indigo-400 font-semibold">{item.year}</span>
                    <h4 className="text-sm font-semibold mt-1" style={{ color: "var(--text-primary)" }}>{item.title}</h4>
                    <p className="text-xs mt-1 leading-relaxed" style={{ color: "var(--text-secondary)" }}>{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  );
}
