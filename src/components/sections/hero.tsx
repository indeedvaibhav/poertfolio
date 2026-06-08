"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { personalInfo } from "@/data/portfolio-data";
import MagneticButton from "@/components/ui/magnetic-button";
import ScrollIndicator from "@/components/ui/scroll-indicator";
import ParticleNetwork from "@/components/three/particle-network";
import FloatingCode from "@/components/three/floating-code";

const IDENTITY_PILLARS = [
  "B.Tech CSE",
  "Software Developer",
  "Smart Parking System",
  "Competitive Programmer",
  "State-Level Basketball",
  "School Captain",
];

export default function HeroSection() {
  const [currentText, setCurrentText] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const roles = personalInfo.roles;
    const typingSpeed = isDeleting ? 40 : 100;
    const currentWord = roles[roleIndex];

    const timer = setTimeout(() => {
      if (!isDeleting && charIndex < currentWord.length) {
        // Typing
        setCurrentText((prev) => prev + currentWord[charIndex]);
        setCharIndex((prev) => prev + 1);
      } else if (isDeleting && charIndex > 0) {
        // Deleting
        setCurrentText((prev) => prev.slice(0, -1));
        setCharIndex((prev) => prev - 1);
      } else if (!isDeleting && charIndex === currentWord.length) {
        // Pause before deleting
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && charIndex === 0) {
        // Switch to next word
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % roles.length);
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, roleIndex]);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-16"
      style={{ background: "var(--bg-primary)" }}
    >
      {/* Background Interactive Canvases */}
      <ParticleNetwork />
      <FloatingCode />

      {/* Hero Content */}
      <div className="section-container relative z-10 text-center flex flex-col items-center justify-center">
        {/* Futuristic Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="px-4 py-1.5 rounded-full border glass flex items-center gap-2 mb-6"
          style={{ borderColor: "var(--border-primary)" }}
        >
          <span className="h-2 w-2 rounded-full bg-indigo-500 animate-pulse" />
          <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em]" style={{ color: "var(--text-secondary)" }}>
            Available for SDE Roles & Internships
          </span>
        </motion.div>

        {/* Large Heading — reduced from text-9xl to text-8xl max */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl sm:text-7xl md:text-8xl font-extrabold tracking-tight"
          style={{ fontFamily: "var(--font-display)" }}
        >
          <span className="gradient-text glow-text">{personalInfo.name}</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="text-lg sm:text-xl md:text-2xl font-medium mt-4 max-w-2xl"
          style={{ color: "var(--text-primary)" }}
        >
          {personalInfo.tagline}
        </motion.p>

        {/* Typing Animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="h-10 mt-3 flex items-center justify-center text-md sm:text-lg font-mono"
          style={{ color: "var(--accent-primary)" }}
        >
          <span>{currentText}</span>
          <span className="ml-1 animate-blink text-indigo-400">|</span>
        </motion.div>

        {/* Identity Pillars — the 30-second recruiter scan */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.3, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 flex flex-wrap items-center justify-center gap-2.5 max-w-xl"
        >
          {IDENTITY_PILLARS.map((pillar, i) => (
            <span
              key={pillar}
              className="text-[10px] sm:text-xs px-3 py-1.5 rounded-full border font-medium tracking-wide"
              style={{
                borderColor: "var(--border-hover)",
                color: "var(--text-secondary)",
                background: "var(--bg-card)",
              }}
            >
              {pillar}
            </span>
          ))}
        </motion.div>

        {/* Action Buttons — reduced from 3 to 2 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full px-6"
        >
          <MagneticButton
            variant="primary"
            onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
          >
            View Projects
          </MagneticButton>
          <MagneticButton
            variant="secondary"
            href={personalInfo.resumeUrl}
          >
            Download Resume
          </MagneticButton>
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <ScrollIndicator />
    </section>
  );
}
