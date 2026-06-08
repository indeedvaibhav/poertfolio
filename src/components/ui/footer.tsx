"use client";

import { motion } from "framer-motion";
import { RiGithubLine, RiLinkedinBoxLine, RiMailLine, RiArrowUpLine } from "react-icons/ri";
import { personalInfo } from "@/data/portfolio-data";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-zinc-900 bg-black/60 backdrop-blur-md py-12">
      <div className="section-container flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left Side: Brand & Credit */}
        <div className="text-center md:text-left">
          <p className="text-sm font-semibold tracking-wider text-white uppercase font-display">
            Vaibhav
          </p>
          <p className="text-xs text-zinc-500 mt-1">
            © {new Date().getFullYear()} Vaibhav. All rights reserved.
          </p>
        </div>

        {/* Middle Side: Social Connections */}
        <div className="flex items-center gap-4">
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 rounded-lg border border-zinc-800 flex items-center justify-center text-zinc-500 hover:text-white hover:border-zinc-700 transition-all cursor-pointer"
            aria-label="GitHub"
          >
            <RiGithubLine size={16} />
          </a>
          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 rounded-lg border border-zinc-800 flex items-center justify-center text-zinc-500 hover:text-white hover:border-zinc-700 transition-all cursor-pointer"
            aria-label="LinkedIn"
          >
            <RiLinkedinBoxLine size={16} />
          </a>
          <a
            href={`mailto:${personalInfo.email}`}
            className="w-8 h-8 rounded-lg border border-zinc-800 flex items-center justify-center text-zinc-500 hover:text-white hover:border-zinc-700 transition-all cursor-pointer"
            aria-label="Email"
          >
            <RiMailLine size={16} />
          </a>
        </div>

        {/* Right Side: Back to Top */}
        <motion.button
          onClick={scrollToTop}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 text-xs font-mono text-zinc-500 hover:text-indigo-400 cursor-pointer"
          aria-label="Scroll to top"
        >
          <span>Back to Top</span>
          <span className="w-7 h-7 rounded-lg border border-zinc-800 flex items-center justify-center">
            <RiArrowUpLine size={14} />
          </span>
        </motion.button>
      </div>
    </footer>
  );
}
